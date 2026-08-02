import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  notes: defineTable({
    userId: v.id("users"),
    pageKey: v.string(),
    pageTitle: v.string(),
    html: v.string(),
    updatedAt: v.number(),
  }).index("by_user_and_page", ["userId", "pageKey"]),
  // Point-in-time snapshots of note content, written before overwrites and
  // deletes so user notes are always recoverable (capped per user+page).
  noteHistory: defineTable({
    userId: v.id("users"),
    pageKey: v.string(),
    pageTitle: v.string(),
    html: v.string(),
    savedAt: v.number(),
  }).index("by_user_and_page", ["userId", "pageKey"]),
  // One row per user once they've seen the onboarding welcome/tour. Server-side
  // (rather than localStorage) so the "new user only" popup stays dismissed
  // across re-logins and devices — mobile Safari evicts localStorage, which made
  // the welcome sheet reappear at every login.
  onboarding: defineTable({
    userId: v.id("users"),
    seenAt: v.number(),
  }).index("by_user", ["userId"]),
  // One row per user: the entitlement that unlocks the clinical app. A verified
  // account with no active row here can sign in but only sees the paywall.
  // Stripe is not wired up yet — the `stripe*` fields are the seams a checkout
  // session + webhook will fill in, so no schema change is needed then.
  subscriptions: defineTable({
    userId: v.id("users"),
    plan: v.union(v.literal("monthly"), v.literal("annual")),
    status: v.union(
      v.literal("trialing"),
      v.literal("active"),
      v.literal("past_due"),
      v.literal("canceled"),
      v.literal("incomplete"),
    ),
    trialEndsAt: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_subscription", ["stripeSubscriptionId"]),
});
