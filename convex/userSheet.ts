import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import {
  internalAction,
  internalQuery,
  type QueryCtx,
} from "./_generated/server";
import { roleLabel } from "./signupProfile";

// ── Mirroring accounts into a Google Sheet ───────────────────────────────────
//
// Every account is one row in a Google Sheet, keyed by user id. The sheet has
// an Apps Script web app bound to it (scripts/user-sheet.gs) that upserts the
// rows it is POSTed; this module is the sender.
//
//   * New accounts — auth.ts's afterUserCreatedOrUpdated schedules
//     `syncUser`, so a sign-up lands in the sheet within seconds. The same
//     callback fires on email verification, which refreshes that row.
//   * Existing accounts — `backfill` sends every user. It is safe to re-run
//     at any time; rows are upserted, never duplicated:
//
//       npx convex run userSheet:backfill --prod
//
// Needs two env vars on the deployment: USER_SHEET_WEBHOOK_URL (the web app's
// /exec URL) and USER_SHEET_SECRET (the same string the script checks). With
// either missing this is a no-op, so preview and dev deployments are
// unaffected. Sends are scheduled, never inline, so a sheet outage can delay
// a row but cannot fail a sign-up.

type Row = {
  userId: Id<"users">;
  createdAt: number;
  name: string;
  email: string;
  role: string;
  university: string;
  country: string;
  phoneNumber: string;
  emailVerified: boolean;
  plan: string;
};

async function toRow(ctx: QueryCtx, user: Doc<"users">): Promise<Row> {
  const sub = await ctx.db
    .query("subscriptions")
    .withIndex("by_user", (q) => q.eq("userId", user._id))
    .first();
  return {
    userId: user._id,
    createdAt: user._creationTime,
    name: user.name ?? "",
    email: user.email ?? "",
    role: roleLabel(user.role),
    university: user.university ?? "",
    country: user.country ?? "",
    phoneNumber: user.phoneNumber ?? "",
    emailVerified: user.emailVerificationTime !== undefined,
    plan: sub ? `${sub.plan} (${sub.status})` : "",
  };
}

export const rowFor = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    return user ? await toRow(ctx, user) : null;
  },
});

export const allRows = internalQuery({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return await Promise.all(users.map((u) => toRow(ctx, u)));
  },
});

async function send(rows: Row[]): Promise<string> {
  const url = process.env.USER_SHEET_WEBHOOK_URL;
  const secret = process.env.USER_SHEET_SECRET;
  if (!url || !secret) return "skipped: USER_SHEET_WEBHOOK_URL / USER_SHEET_SECRET not set";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, rows }),
  });
  const text = await res.text();
  // Apps Script answers 200 even when doPost rejects, so check the body too.
  if (!res.ok || !text.startsWith("ok")) {
    throw new Error(`User sheet sync failed (${res.status}): ${text.slice(0, 200)}`);
  }
  return text;
}

export const syncUser = internalAction({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const row = await ctx.runQuery(internal.userSheet.rowFor, { userId });
    if (row) await send([row]);
  },
});

export const backfill = internalAction({
  args: {},
  handler: async (ctx): Promise<string> => {
    const rows = await ctx.runQuery(internal.userSheet.allRows, {});
    return await send(rows);
  },
});
