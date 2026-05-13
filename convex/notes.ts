import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const note = await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .unique();
    if (!note) return null;
    return { html: note.html, updatedAt: note.updatedAt };
  },
});

export const upsert = mutation({
  args: {
    pageKey: v.string(),
    pageTitle: v.string(),
    html: v.string(),
  },
  handler: async (ctx, { pageKey, pageTitle, html }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const existing = await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .unique();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { pageTitle, html, updatedAt: now });
    } else {
      await ctx.db.insert("notes", {
        userId,
        pageKey,
        pageTitle,
        html,
        updatedAt: now,
      });
    }
  },
});

export const remove = mutation({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const existing = await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});
