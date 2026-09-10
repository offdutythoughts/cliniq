import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Upper bound on the marks returned for one page. Far above any realistic
// count — a reader who hits it has highlighted the page many times over.
const PAGE_CAP = 500;
// Guard against a runaway client sending an enormous excerpt: a mark's text is
// only ever a re-anchoring aid, so a long one can be stored truncated.
const MAX_TEXT = 2000;

const kindValidator = v.union(
  v.literal("highlight"),
  v.literal("underline"),
  v.literal("strike"),
);

// The colours each tool offers. Mirrors HIGHLIGHT_COLOURS / UNDERLINE_COLOURS
// in src/lib/annotations/marks.ts — repeated rather than imported because the
// Convex functions and the client bundle do not share a module graph. The
// server is the one that has to hold the line: a mark stored with a colour
// that has no styling behind it would be invisible on every device.
const COLOURS: Record<string, readonly string[]> = {
  highlight: ["yellow", "green", "blue", "pink", "orange"],
  underline: ["teal", "red", "purple"],
  strike: ["plain"],
};

// Every mark on one page, oldest first. Signed-out readers get an empty list
// and fall back to the local copy, exactly as notes do.
export const listByPage = query({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return { authenticated: false as const, marks: [] };
    const rows = await ctx.db
      .query("annotations")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .take(PAGE_CAP);
    return {
      authenticated: true as const,
      marks: rows.map((r) => ({
        id: r.clientId,
        kind: r.kind,
        colour: r.colour,
        start: r.start,
        end: r.end,
        text: r.text,
      })),
    };
  },
});

// Draw one mark. Keyed by the client-minted id, so replaying a queued offline
// add is a no-op rather than a duplicate.
export const add = mutation({
  args: {
    clientId: v.string(),
    pageKey: v.string(),
    pageTitle: v.string(),
    kind: kindValidator,
    colour: v.string(),
    start: v.number(),
    end: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    if (!(args.end > args.start)) throw new ConvexError("Empty mark");
    if (!COLOURS[args.kind].includes(args.colour)) {
      throw new ConvexError(`Unknown ${args.kind} colour: ${args.colour}`);
    }
    const existing = await ctx.db
      .query("annotations")
      .withIndex("by_user_and_client", (q) =>
        q.eq("userId", userId).eq("clientId", args.clientId),
      )
      .unique();
    if (existing) return;
    await ctx.db.insert("annotations", {
      userId,
      clientId: args.clientId,
      pageKey: args.pageKey,
      pageTitle: args.pageTitle,
      kind: args.kind,
      colour: args.colour,
      start: args.start,
      end: args.end,
      text: args.text.slice(0, MAX_TEXT),
      createdAt: Date.now(),
    });
  },
});

// Erase one mark. Silent when it is already gone — a queued offline delete
// may arrive after the same delete succeeded from another device.
export const remove = mutation({
  args: { clientId: v.string() },
  handler: async (ctx, { clientId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const existing = await ctx.db
      .query("annotations")
      .withIndex("by_user_and_client", (q) =>
        q.eq("userId", userId).eq("clientId", clientId),
      )
      .unique();
    if (existing) await ctx.db.delete(existing._id);
  },
});

// Erase every mark on one page — the toolbar's "clear page" action.
export const clearPage = mutation({
  args: { pageKey: v.string() },
  handler: async (ctx, { pageKey }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Not authenticated");
    const rows = await ctx.db
      .query("annotations")
      .withIndex("by_user_and_page", (q) =>
        q.eq("userId", userId).eq("pageKey", pageKey),
      )
      .take(PAGE_CAP);
    for (const row of rows) await ctx.db.delete(row._id);
  },
});

// Every page carrying at least one mark, for a future "my annotations" view
// and for the client's offline reconciliation sweep.
export const pages = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const rows = await ctx.db
      .query("annotations")
      .withIndex("by_user_and_page", (q) => q.eq("userId", userId))
      .take(PAGE_CAP * 4);
    const byPage = new Map<string, { pageKey: string; pageTitle: string; count: number }>();
    for (const r of rows) {
      const seen = byPage.get(r.pageKey);
      if (seen) seen.count += 1;
      else byPage.set(r.pageKey, { pageKey: r.pageKey, pageTitle: r.pageTitle, count: 1 });
    }
    return [...byPage.values()];
  },
});
