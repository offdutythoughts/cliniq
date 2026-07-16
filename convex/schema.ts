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
});
