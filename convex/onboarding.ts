import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

// Has the signed-in user already seen the onboarding welcome sheet / tour?
// `authenticated` lets the client tell "signed out / still resolving" apart
// from "signed in and genuinely new" so it never flashes the popup before auth
// settles.
export const status = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { authenticated: false as const, seen: false };
    const row = await ctx.db
      .query("onboarding")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    return { authenticated: true as const, seen: row !== null };
  },
});

// Idempotently record that the current user has seen onboarding.
export const markSeen = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    const existing = await ctx.db
      .query("onboarding")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!existing) {
      await ctx.db.insert("onboarding", { userId, seenAt: Date.now() });
    }
  },
});
