import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
  type QueryCtx,
} from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { toMarkdown } from "./feedbackFormat";

// Beta feedback: readers report what is wrong on the page they are looking at,
// and the people in the `feedbackAdmins` table triage it at /feedback.
//
// The admin list is a table, set from the CLI with the internal `setAdmins`
// below — nothing a client can write to:
//
//   npx convex run --prod feedback:setAdmins '{"emails":["a@x.com","b@y.com"]}'
//
// It was an env var (FEEDBACK_ADMINS) at first. That does not work for a
// reactive query: Convex re-runs a query only when data it read changes, and an
// env var is not data, so a reader already signed in kept the cached "not an
// admin" answer after being added. A table read is tracked like any other.

const category = v.union(
  v.literal("wrong"),
  v.literal("missing"),
  v.literal("bug"),
  v.literal("idea"),
);
const status = v.union(
  v.literal("new"),
  v.literal("triaged"),
  v.literal("fixed"),
  v.literal("wontfix"),
);

const MESSAGE_MAX = 4000;
const QUOTE_MAX = 600;
const SHORT_MAX = 300;
// A reader filing one report per page they disagree with is fine; a stuck
// retry loop or a script is not.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
// The inbox reads at most this many rows per status. Beta volumes are far
// below it; past it, this becomes a paginated query.
const INBOX_CAP = 500;

async function currentAdmin(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) return null;
  const user = await ctx.db.get(userId);
  const email = user?.email?.trim().toLowerCase();
  if (!email) return null;
  const row = await ctx.db
    .query("feedbackAdmins")
    .withIndex("by_email", (q) => q.eq("email", email))
    .unique();
  return row ? user : null;
}

/** Replace the inbox admin list. CLI only (see the top of this file). */
export const setAdmins = internalMutation({
  args: { emails: v.array(v.string()) },
  handler: async (ctx, args) => {
    const wanted = new Set(
      args.emails.map((e) => e.trim().toLowerCase()).filter(Boolean),
    );
    for (const row of await ctx.db.query("feedbackAdmins").take(200)) {
      if (wanted.has(row.email)) wanted.delete(row.email);
      else await ctx.db.delete(row._id);
    }
    for (const email of wanted) {
      await ctx.db.insert("feedbackAdmins", { email });
    }
    return (await ctx.db.query("feedbackAdmins").take(200)).map((r) => r.email);
  },
});

const clip = (s: string | undefined, max: number) =>
  s === undefined ? undefined : s.trim().slice(0, max) || undefined;

export const submit = mutation({
  args: {
    pageKey: v.string(),
    pageTitle: v.string(),
    path: v.string(),
    category,
    message: v.string(),
    quote: v.optional(v.string()),
    species: v.optional(v.string()),
    viewport: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    appVersion: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new ConvexError("Sign in to send feedback.");
    const message = args.message.trim();
    if (!message) throw new ConvexError("Feedback is empty.");
    if (message.length > MESSAGE_MAX) {
      throw new ConvexError(`Keep feedback under ${MESSAGE_MAX} characters.`);
    }

    const recent = await ctx.db
      .query("feedback")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(RATE_MAX);
    const now = Date.now();
    if (
      recent.length === RATE_MAX &&
      now - recent[RATE_MAX - 1]._creationTime < RATE_WINDOW_MS
    ) {
      throw new ConvexError("That's a lot of feedback at once — try again in a few minutes.");
    }

    const user = await ctx.db.get(userId);
    await ctx.db.insert("feedback", {
      userId,
      userEmail: user?.email,
      pageKey: args.pageKey.slice(0, SHORT_MAX),
      pageTitle: args.pageTitle.slice(0, SHORT_MAX),
      path: args.path.slice(0, SHORT_MAX),
      category: args.category,
      message,
      quote: clip(args.quote, QUOTE_MAX),
      species: clip(args.species, 20),
      viewport: clip(args.viewport, 40),
      userAgent: clip(args.userAgent, SHORT_MAX),
      appVersion: clip(args.appVersion, 60),
      status: "new",
      updatedAt: now,
    });
  },
});

/** Whether the signed-in reader can open the inbox — drives the menu link. */
export const canReview = query({
  args: {},
  handler: async (ctx) => (await currentAdmin(ctx)) !== null,
});

/** The inbox: every report in one status, newest first. `null` = not an admin. */
export const inbox = query({
  args: { status },
  handler: async (ctx, args) => {
    if (!(await currentAdmin(ctx))) return null;
    const rows = await ctx.db
      .query("feedback")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .take(INBOX_CAP);
    // The reporter's email is snapshotted on the row; their id stays server-side.
    return rows.map((row) => {
      const { userId, ...rest } = row;
      void userId;
      return rest;
    });
  },
});

/** Per-status counts for the inbox tabs. */
export const counts = query({
  args: {},
  handler: async (ctx) => {
    if (!(await currentAdmin(ctx))) return null;
    const out: Record<Doc<"feedback">["status"], number> = {
      new: 0,
      triaged: 0,
      fixed: 0,
      wontfix: 0,
    };
    for (const s of Object.keys(out) as (keyof typeof out)[]) {
      const rows = await ctx.db
        .query("feedback")
        .withIndex("by_status", (q) => q.eq("status", s))
        .take(INBOX_CAP);
      out[s] = rows.length;
    }
    return out;
  },
});

export const setStatus = mutation({
  args: {
    id: v.id("feedback"),
    status,
    resolution: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!(await currentAdmin(ctx))) throw new ConvexError("Not allowed.");
    const row = await ctx.db.get(args.id);
    if (!row) throw new ConvexError("That report no longer exists.");
    await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.resolution !== undefined
        ? { resolution: clip(args.resolution, MESSAGE_MAX) }
        : {}),
      updatedAt: Date.now(),
    });
  },
});

/**
 * Every open report as Markdown, grouped by page — for reading in a terminal
 * or pasting into an issue or a Claude session:
 *
 *   npx convex run feedback:digest            # dev deployment
 *   npx convex run --prod feedback:digest     # live
 */
export const digest = internalQuery({
  args: { status: v.optional(status) },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("feedback")
      .withIndex("by_status", (q) => q.eq("status", args.status ?? "new"))
      .order("desc")
      .take(INBOX_CAP);
    return toMarkdown(rows);
  },
});
