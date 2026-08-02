import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// ── Subscription entitlement ─────────────────────────────────────────────────
//
// Signing up (email + password + verified email) creates the login. Access to
// the clinical app is a separate entitlement, held in the `subscriptions` table,
// so a verified user with no active subscription lands on the paywall instead of
// the app (see src/components/SubscriptionGate.tsx).
//
// Stripe is not connected yet. When it is, a checkout session + webhook should
// write/refresh the row here — set `status`, `currentPeriodEnd`,
// `stripeCustomerId` and `stripeSubscriptionId` — and every gate keeps working
// unchanged, because they all read `isEntitled` below.

export const TRIAL_DAYS = 14;

const planValidator = v.union(v.literal("monthly"), v.literal("annual"));

/** Does this subscription row currently unlock the app? */
function isEntitled(sub: Doc<"subscriptions">, now: number): boolean {
  switch (sub.status) {
    case "trialing":
      return (sub.trialEndsAt ?? 0) > now;
    case "active":
      // Stripe keeps `currentPeriodEnd` in the future while a sub renews; a
      // missing value (manually granted access) is treated as open-ended.
      return sub.currentPeriodEnd === undefined || sub.currentPeriodEnd > now;
    case "past_due":
      // Grace period: Stripe retries a failed payment for days before giving
      // up, and locking a vet out mid-consult over a card expiry is worse than
      // a few extra days of access. A "canceled" row ends access immediately.
      return true;
    case "canceled":
    case "incomplete":
      return false;
  }
}

/**
 * What the client needs to decide between "show the app", "show the paywall"
 * and "send them to sign in".
 */
export const status = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { signedIn: false, entitled: false, subscription: null };
    }
    const sub = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    const now = Date.now();
    return {
      signedIn: true,
      entitled: sub !== null && isEntitled(sub, now),
      subscription:
        sub === null
          ? null
          : {
              plan: sub.plan,
              status: sub.status,
              trialEndsAt: sub.trialEndsAt,
              currentPeriodEnd: sub.currentPeriodEnd,
              cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
            },
    };
  },
});

/**
 * Start the free trial on the chosen plan — the pre-Stripe way to complete a
 * sign-up. Idempotent: an already-entitled user just gets their existing row,
 * and a spent trial is refused rather than silently renewed.
 */
export const startTrial = mutation({
  args: { plan: planValidator },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in");

    const now = Date.now();
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing !== null) {
      if (isEntitled(existing, now)) {
        // Already has access — allow a plan switch, nothing else.
        if (existing.plan !== args.plan) {
          await ctx.db.patch(existing._id, { plan: args.plan, updatedAt: now });
        }
        return { ok: true as const, alreadyActive: true as const };
      }
      if (existing.trialEndsAt !== undefined) {
        return { ok: false as const, reason: "trial_used" as const };
      }
      await ctx.db.patch(existing._id, {
        plan: args.plan,
        status: "trialing",
        trialEndsAt: now + TRIAL_DAYS * 24 * 60 * 60 * 1000,
        updatedAt: now,
      });
      return { ok: true as const, alreadyActive: false as const };
    }

    await ctx.db.insert("subscriptions", {
      userId,
      plan: args.plan,
      status: "trialing",
      trialEndsAt: now + TRIAL_DAYS * 24 * 60 * 60 * 1000,
      createdAt: now,
      updatedAt: now,
    });
    return { ok: true as const, alreadyActive: false as const };
  },
});
