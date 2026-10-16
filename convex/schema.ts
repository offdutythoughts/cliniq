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
  // One row per text mark a reader has drawn on a content page. Marks are
  // stored per-row rather than as an array on a page document so a single
  // add/remove is one small write, and so a heavily annotated page can never
  // approach the 1MB document limit.
  //
  // `start`/`end` are character offsets into the concatenated visible text of
  // the rendered page (see src/lib/annotations/dom.ts); `text` is the marked
  // string itself, kept so a mark can be re-anchored after the clinical
  // content is edited and the offsets shift. `clientId` is minted on the
  // device, which is what makes the offline replay queue idempotent — the same
  // add can be sent twice without drawing the mark twice.
  annotations: defineTable({
    userId: v.id("users"),
    clientId: v.string(),
    pageKey: v.string(),
    pageTitle: v.string(),
    kind: v.union(
      v.literal("highlight"),
      v.literal("underline"),
      v.literal("strike"),
    ),
    /** Which of that kind's colours the mark is drawn in — a token, not a
     *  colour value. The values live in globals.css so the two themes can
     *  differ; storing one here would freeze a reader's marks to whichever
     *  theme they happened to be using. */
    colour: v.string(),
    start: v.number(),
    end: v.number(),
    text: v.string(),
    createdAt: v.number(),
  })
    .index("by_user_and_page", ["userId", "pageKey"])
    .index("by_user_and_client", ["userId", "clientId"]),
  // One row per piece of beta feedback, sent from the 💬 button in the app's
  // top bar (src/components/FeedbackSheet.tsx). `pageKey` is the same key notes
  // and annotations use, so a report can be grouped by page and opened straight
  // from the inbox at /feedback. The reporter's email and the page title are
  // snapshotted at send time: the inbox must stay readable after an account is
  // deleted or a page is renamed.
  feedback: defineTable({
    userId: v.id("users"),
    userEmail: v.optional(v.string()),
    pageKey: v.string(),
    pageTitle: v.string(),
    /** Where the reporter was, e.g. "/app/disease/DIS-REN-CKD?sp=cat". */
    path: v.string(),
    category: v.union(
      v.literal("wrong"),
      v.literal("missing"),
      v.literal("bug"),
      v.literal("idea"),
    ),
    message: v.string(),
    /** Text the reporter had selected on the page when they opened the sheet. */
    quote: v.optional(v.string()),
    species: v.optional(v.string()),
    viewport: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    /** Git SHA of the build that was on screen, when Vercel exposes one. */
    appVersion: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("triaged"),
      v.literal("fixed"),
      v.literal("wontfix"),
    ),
    /** Triage note from whoever handled it — what was changed, or why not. */
    resolution: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_user", ["userId"]),
  // One row per user once they've seen the onboarding welcome/tour. Server-side
  // (rather than localStorage) so the "new user only" popup stays dismissed
  // across re-logins and devices — mobile Safari evicts localStorage, which made
  // the welcome sheet reappear at every login.
  onboarding: defineTable({
    userId: v.id("users"),
    seenAt: v.number(),
  }).index("by_user", ["userId"]),
  // Who can open the feedback inbox at /feedback — lowercased emails, set from
  // the CLI with `feedback:setAdmins` (see convex/feedback.ts for why this is a
  // table rather than an env var).
  feedbackAdmins: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
  // One row per (user, hint) once a one-off coachmark has been dismissed — e.g.
  // the "this 💬 is for feedback" callout. Server-side for the same reason as
  // `onboarding`: mobile Safari evicts localStorage, and a hint that keeps
  // coming back is worse than none.
  hints: defineTable({
    userId: v.id("users"),
    hint: v.literal("feedbackButton"),
    seenAt: v.number(),
  }).index("by_user_and_hint", ["userId", "hint"]),
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
