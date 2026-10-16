import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import {
  internalQuery,
  mutation,
  query,
  type QueryCtx,
} from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { toMarkdown } from "./feedbackFormat";

// Beta feedback: readers report what is wrong on the page they are looking at,
// and the people listed in FEEDBACK_ADMINS triage it at /feedback.
//
// Who can read the inbox is an env var, not a column on `users`, so granting or
// revoking it is `npx convex env set FEEDBACK_ADMINS "a@x.com,b@y.com"` — no
// migration and nothing a client can write to.

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

function adminEmails(): Set<string> {
  return new Set(
    (process.env.FEEDBACK_ADMINS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

async function currentAdmin(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) return null;
  const user = await ctx.db.get(userId);
  const email = user?.email?.toLowerCase();
  if (!email || !adminEmails().has(email)) return null;
  return user;
}

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
