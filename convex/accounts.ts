import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

// ── Deleting an account ──────────────────────────────────────────────────────
//
// Every table that references a user, emptied in one transaction. Convex
// mutations are transactional, so this either removes the whole account or
// leaves it untouched — there is no half-deleted state to clean up after.
//
// Order matters. Rows are removed children-first: verification codes belong to
// an authAccount, refresh tokens belong to an authSession, and both outlive the
// row they point at if the parent goes first. The `users` row is deleted last,
// so a failure part-way leaves the account still findable rather than orphaning
// everything that pointed at it.
//
// This is `internalMutation`: it is not part of the app's API and cannot be
// called from a browser. Run it deliberately:
//
//   npx convex run accounts:deleteAccount --deployment <name> '{"userId":"..."}'
//
// Deleting an account does NOT stop the address signing up again. That is the
// intended behaviour for a deletion request — the person can come back — and it
// is why `authAccounts` must go too: leaving that row behind keeps the address
// claimed, so a later sign-up fails as "account already exists" while nothing
// is visible in `users`.

/** Look an account up by address, so an operator need not know the id. */
export const findByEmail = internalQuery({
  args: { email: v.string() },
  returns: v.union(
    v.null(),
    v.object({
      userId: v.id("users"),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
    }),
  ),
  handler: async (ctx, { email }) => {
    // Addresses are stored lower-cased (see the `profile` normaliser in
    // ./auth.ts), so match that here rather than trusting the caller's casing.
    const normalised = email.trim().toLowerCase();
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", normalised))
      .unique();
    if (user === null) return null;
    return {
      userId: user._id,
      email: user.email,
      emailVerificationTime: user.emailVerificationTime,
    };
  },
});

export const deleteAccount = internalMutation({
  args: { userId: v.id("users") },
  returns: v.object({
    deleted: v.boolean(),
    email: v.optional(v.string()),
    authAccounts: v.number(),
    authVerificationCodes: v.number(),
    authSessions: v.number(),
    authRefreshTokens: v.number(),
    passkeys: v.number(),
    webauthnChallenges: v.number(),
    notes: v.number(),
    noteHistory: v.number(),
    onboarding: v.number(),
    subscriptions: v.number(),
  }),
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    const counts = {
      authAccounts: 0,
      authVerificationCodes: 0,
      authSessions: 0,
      authRefreshTokens: 0,
      passkeys: 0,
      webauthnChallenges: 0,
      notes: 0,
      noteHistory: 0,
      onboarding: 0,
      subscriptions: 0,
    };

    // A missing user is reported, not thrown: re-running after a partial manual
    // cleanup should be a no-op rather than an error.
    if (user === null) return { deleted: false, email: undefined, ...counts };

    // Auth accounts, and the verification codes hanging off each one.
    const authAccounts = await ctx.db
      .query("authAccounts")
      .withIndex("userIdAndProvider", (q) => q.eq("userId", userId))
      .collect();
    for (const account of authAccounts) {
      const codes = await ctx.db
        .query("authVerificationCodes")
        .withIndex("accountId", (q) => q.eq("accountId", account._id))
        .collect();
      for (const code of codes) {
        await ctx.db.delete(code._id);
        counts.authVerificationCodes++;
      }
      await ctx.db.delete(account._id);
      counts.authAccounts++;
    }

    // Sessions, and the refresh tokens hanging off each one. Refresh tokens
    // reference the session, not the user, so they are only reachable this way.
    const sessions = await ctx.db
      .query("authSessions")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .collect();
    for (const session of sessions) {
      const tokens = await ctx.db
        .query("authRefreshTokens")
        .withIndex("sessionId", (q) => q.eq("sessionId", session._id))
        .collect();
      for (const token of tokens) {
        await ctx.db.delete(token._id);
        counts.authRefreshTokens++;
      }
      await ctx.db.delete(session._id);
      counts.authSessions++;
    }

    // The remaining tables all index userId first, so each is a prefix scan.
    // Written out rather than routed through a shared helper: a generic one
    // needs `any` to satisfy the per-index types, and `any` is the last thing
    // this function should contain.
    for (const row of await ctx.db
      .query("passkeys")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect()) {
      await ctx.db.delete(row._id);
      counts.passkeys++;
    }

    for (const row of await ctx.db
      .query("onboarding")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect()) {
      await ctx.db.delete(row._id);
      counts.onboarding++;
    }

    for (const row of await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect()) {
      await ctx.db.delete(row._id);
      counts.subscriptions++;
    }

    // by_user_and_page is [userId, pageKey]; the userId prefix is enough.
    for (const row of await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) => q.eq("userId", userId))
      .collect()) {
      await ctx.db.delete(row._id);
      counts.notes++;
    }

    for (const row of await ctx.db
      .query("noteHistory")
      .withIndex("by_user_and_page", (q) => q.eq("userId", userId))
      .collect()) {
      await ctx.db.delete(row._id);
      counts.noteHistory++;
    }

    // webauthnChallenges is the one table with no index on userId — it is keyed
    // by challenge, because that is how it is read. It holds only unredeemed
    // challenges with a five-minute TTL, so it is small and a scan is cheap. If
    // it ever grows, add an index rather than making this loop bigger.
    const challenges = await ctx.db
      .query("webauthnChallenges")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    for (const challenge of challenges) {
      await ctx.db.delete(challenge._id);
      counts.webauthnChallenges++;
    }

    const email = user.email;
    await ctx.db.delete(userId);
    return { deleted: true, email, ...counts };
  },
});
