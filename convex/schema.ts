import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  // One row per registered passkey (see convex/passkeys.ts). A passkey is a
  // public key the authenticator — Face ID, Touch ID, Windows Hello, a security
  // key — signs challenges with; nothing secret is stored here, so a leak of
  // this table cannot be used to sign in as anyone.
  passkeys: defineTable({
    userId: v.id("users"),
    /** Base64url credential ID, as the browser reports it. Unique per key. */
    credentialId: v.string(),
    /** Base64url COSE public key returned at registration. */
    publicKey: v.string(),
    /** Authenticator signature counter, for cloned-authenticator detection. */
    counter: v.number(),
    /** "usb", "internal", "hybrid", … — hints the browser gives the next prompt. */
    transports: v.optional(v.array(v.string())),
    /** "singleDevice" | "multiDevice" — whether the key syncs across devices. */
    deviceType: v.string(),
    /** Whether the authenticator says the key is backed up to a keychain. */
    backedUp: v.boolean(),
    /** What the user sees in the list, e.g. "iPhone" or "MacBook Pro". */
    label: v.string(),
    createdAt: v.number(),
    lastUsedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_credential", ["credentialId"]),
  // Short-lived WebAuthn challenges. A challenge is issued, signed by the
  // authenticator, then deleted as it is redeemed — storing them server-side is
  // what stops a captured signature being replayed.
  webauthnChallenges: defineTable({
    challenge: v.string(),
    kind: v.union(v.literal("registration"), v.literal("authentication")),
    /** Set for registration: the signed-in user the new passkey belongs to. */
    userId: v.optional(v.id("users")),
    expiresAt: v.number(),
  }).index("by_challenge", ["challenge"]),
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
