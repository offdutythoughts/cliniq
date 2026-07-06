import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

// Keep at most this many snapshots per user+page.
const HISTORY_CAP = 20;
// During an active editing session (one debounced save every ~500ms) don't
// snapshot on every save — the first snapshot in this window preserves the
// pre-session content, which is what recovery needs.
const HISTORY_MIN_GAP_MS = 5 * 60 * 1000;

// Snapshot the current content of a note before it is overwritten or deleted.
// `force` bypasses the min-gap throttle (used before deletes, where the
// content is about to disappear entirely).
async function snapshotNote(
  ctx: MutationCtx,
  note: Doc<"notes">,
  force: boolean,
) {
  if (!note.html.trim()) return;
  const recent = await ctx.db
    .query("noteHistory")
    .withIndex("by_user_and_page", (q) =>
      q.eq("userId", note.userId).eq("pageKey", note.pageKey),
    )
    .order("desc")
    .take(HISTORY_CAP + 5);
  const newest = recent[0];
  if (!force && newest && Date.now() - newest.savedAt < HISTORY_MIN_GAP_MS) {
    return;
  }
  if (newest && newest.html === note.html) return;
  await ctx.db.insert("noteHistory", {
    userId: note.userId,
    pageKey: note.pageKey,
    pageTitle: note.pageTitle,
    html: note.html,
    savedAt: Date.now(),
  });
  // Evict the oldest snapshots beyond the cap ("recent" is newest-first).
  for (const old of recent.slice(HISTORY_CAP - 1)) {
    await ctx.db.delete(old._id);
  }
}

export const get = query({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    // `authenticated` lets the client tell "no note exists" apart from
    // "signed out" — the latter must fall back to the local offline copy.
    if (!userId) return { authenticated: false as const, note: null };
    const note = await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .unique();
    if (!note) return { authenticated: true as const, note: null };
    return {
      authenticated: true as const,
      note: { html: note.html, updatedAt: note.updatedAt },
      // Legacy top-level fields so clients built before the offline-notes
      // change keep working during a rolling deploy; drop after release.
      html: note.html,
      updatedAt: note.updatedAt,
    };
  },
});

export const upsert = mutation({
  args: {
    pageKey: v.string(),
    pageTitle: v.string(),
    html: v.string(),
    // Client edit timestamp, used for offline sync: an edit made offline
    // must not overwrite a newer edit that reached the server from another
    // device. When provided it also becomes the stored updatedAt, so
    // comparisons stay within one device's clock for normal editing.
    editedAt: v.optional(v.number()),
  },
  handler: async (ctx, { pageKey, pageTitle, html, editedAt }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const existing = await ctx.db
      .query("notes")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .unique();
    // Cap client timestamps slightly above server time so a badly wrong
    // clock can't lock out all future edits.
    const now =
      editedAt === undefined
        ? Date.now()
        : Math.min(editedAt, Date.now() + 60_000);
    if (existing && editedAt !== undefined && existing.updatedAt > now) {
      return { applied: false, updatedAt: existing.updatedAt };
    }
    if (existing) {
      if (existing.html !== html) await snapshotNote(ctx, existing, false);
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
    return { applied: true, updatedAt: now };
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
    if (existing) {
      await snapshotNote(ctx, existing, true);
      await ctx.db.delete(existing._id);
    }
  },
});

// Recovery path for a cleared or clobbered note: newest-first snapshots.
export const history = query({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const rows = await ctx.db
      .query("noteHistory")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .order("desc")
      .take(HISTORY_CAP);
    return rows.map((r) => ({ html: r.html, savedAt: r.savedAt }));
  },
});
