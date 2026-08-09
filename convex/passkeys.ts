import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { getAuthUserId, type ConvexCredentialsConfig } from "@convex-dev/auth/server";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type AuthenticatorTransportFuture,
  type RegistrationResponseJSON,
} from "@simplewebauthn/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";
import {
  action,
  internalMutation,
  internalQuery,
  mutation,
  query,
  type ActionCtx,
} from "./_generated/server";
import { siteUrl } from "./emails";

// ── Passkeys (WebAuthn) ──────────────────────────────────────────────────────
//
// A passkey replaces the password with a key pair held by the device: the
// private half never leaves the authenticator and is released only after Face
// ID, Touch ID, Windows Hello or a device PIN, so "sign in with Face ID" is the
// same flow as "sign in with a passkey" — the biometrics are the authenticator
// unlocking the key, and never reach us.
//
// Two halves live here:
//
//   * registration — `registerOptions` / `registerVerify`, both of which
//     require an existing session. You add a passkey to an account you are
//     already signed in to; there is no way to attach one to someone else's.
//   * authentication — `authenticationOptions`, then the `Passkey` provider at
//     the bottom, which Convex Auth calls from `signIn("passkey", …)` and which
//     mints the session once the signature checks out.
//
// Challenges are stored (`webauthnChallenges`) and deleted as they are
// redeemed. That is what makes a captured signature useless a second time.

const CHALLENGE_TTL_MS = 5 * 60 * 1000;
const RP_NAME = "Vetic";

/**
 * The WebAuthn relying party: passkeys are bound to a domain and the browser
 * refuses to use them anywhere else, which is what makes them unphishable.
 * Derived from SITE_URL so there is one source of truth for "where the app is".
 */
function relyingParty(): { rpID: string; origin: string } {
  const url = new URL(siteUrl());
  return { rpID: url.hostname, origin: url.origin };
}

// ── Registration ─────────────────────────────────────────────────────────────

/**
 * Step 1 of adding a passkey: a challenge plus everything the browser needs to
 * ask the authenticator for a new key. Returned as a JSON string — WebAuthn
 * option objects carry optional fields that Convex's value validation would
 * reject, and the browser needs to decode them anyway.
 */
export const registerOptions = action({
  args: {},
  handler: async (ctx): Promise<string> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Sign in before adding a passkey.");
    }
    const account: { email: string; credentials: { id: string; transports?: string[] }[] } =
      await ctx.runQuery(internal.passkeys.registrationContext, { userId });

    const { rpID } = relyingParty();
    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID,
      userName: account.email,
      userDisplayName: account.email,
      // The user handle the authenticator stores alongside the key. Convex user
      // IDs are opaque strings, so the passkey carries no personal data.
      userID: new TextEncoder().encode(userId),
      attestationType: "none",
      // Offering the keys already registered stops the authenticator creating a
      // second credential for a device the account already has.
      excludeCredentials: account.credentials.map((credential) => ({
        id: credential.id,
        transports: credential.transports as AuthenticatorTransportFuture[] | undefined,
      })),
      authenticatorSelection: {
        // Discoverable ("resident") keys are what let someone sign in without
        // typing an email — the authenticator knows which account it is for.
        residentKey: "required",
        requireResidentKey: true,
        // Demand the biometric/PIN check rather than mere presence: this key is
        // the whole credential, not a second factor.
        userVerification: "required",
      },
      timeout: 120_000,
    });

    await ctx.runMutation(internal.passkeys.storeChallenge, {
      challenge: options.challenge,
      kind: "registration",
      userId,
    });

    return JSON.stringify(options);
  },
});

/**
 * Step 2: check what the authenticator signed and, if it holds up, keep the
 * public key. `label` is what the user will see in their passkey list.
 */
export const registerVerify = action({
  args: { challenge: v.string(), response: v.string(), label: v.optional(v.string()) },
  handler: async (ctx, args): Promise<{ credentialId: string; label: string }> => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Sign in before adding a passkey.");
    }

    const claimed: Doc<"webauthnChallenges"> | null = await ctx.runMutation(
      internal.passkeys.claimChallenge,
      { challenge: args.challenge, kind: "registration" },
    );
    if (claimed === null || claimed.userId !== userId) {
      throw new Error("That passkey request has expired. Please try again.");
    }

    const response = parseJson<RegistrationResponseJSON>(args.response);
    const { rpID, origin } = relyingParty();
    const verification = await verifyRegistrationResponse({
      response,
      expectedChallenge: args.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
    });

    if (!verification.verified) {
      throw new Error("That passkey could not be verified.");
    }

    const { credential, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
    const label = (args.label ?? "").trim().slice(0, 60) || "Passkey";

    await ctx.runMutation(internal.passkeys.insert, {
      userId,
      credentialId: credential.id,
      publicKey: toBase64Url(credential.publicKey),
      counter: credential.counter,
      transports: credential.transports,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      label,
    });

    return { credentialId: credential.id, label };
  },
});

// ── Authentication ───────────────────────────────────────────────────────────

/**
 * The challenge for signing in. No `allowCredentials`: every passkey we issue
 * is discoverable, so the browser offers whichever ones it holds for this
 * domain, and we never have to answer "does this email have an account?" for an
 * anonymous caller.
 */
export const authenticationOptions = action({
  args: {},
  handler: async (ctx): Promise<string> => {
    const { rpID } = relyingParty();
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: "required",
      timeout: 120_000,
    });

    await ctx.runMutation(internal.passkeys.storeChallenge, {
      challenge: options.challenge,
      kind: "authentication",
    });

    return JSON.stringify(options);
  },
});

/**
 * The provider behind `signIn("passkey", { challenge, response })`. Convex Auth
 * calls `authorize` with whatever the client passed; returning a user ID is
 * what creates the session, and throwing rejects the sign-in.
 *
 * The annotation is load-bearing: `authorize` reaches back into this file's own
 * `internal.passkeys.*` references, and TypeScript can't infer a type that
 * depends on itself.
 */
export const Passkey: ConvexCredentialsConfig = ConvexCredentials({
  id: "passkey",
  authorize: async (params, ctx): Promise<{ userId: Id<"users"> }> => {
    const challenge = typeof params.challenge === "string" ? params.challenge : null;
    const rawResponse = typeof params.response === "string" ? params.response : null;
    if (challenge === null || rawResponse === null) {
      throw new Error("Missing `challenge` or `response` param for passkey sign-in");
    }
    const actionCtx = ctx as unknown as ActionCtx;

    const claimed: Doc<"webauthnChallenges"> | null = await actionCtx.runMutation(
      internal.passkeys.claimChallenge,
      { challenge, kind: "authentication" },
    );
    if (claimed === null) {
      throw new Error("That sign-in request has expired. Please try again.");
    }

    const response = parseJson<AuthenticationResponseJSON>(rawResponse);
    const stored: Doc<"passkeys"> | null = await actionCtx.runQuery(
      internal.passkeys.byCredentialId,
      { credentialId: response.id },
    );
    if (stored === null) {
      throw new Error("That passkey isn't registered to a Vetic account.");
    }

    // The authenticator reports which account it signed for — the user ID we
    // stamped into the key at registration, base64url-encoded like every other
    // byte field. Checking it means a discoverable credential can only ever
    // resolve to the account it was made for.
    const userHandle = response.response.userHandle;
    if (userHandle && new TextDecoder().decode(fromBase64Url(userHandle)) !== stored.userId) {
      throw new Error("That passkey isn't registered to a Vetic account.");
    }

    const { rpID, origin } = relyingParty();
    const verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: true,
      credential: {
        id: stored.credentialId,
        publicKey: fromBase64Url(stored.publicKey),
        counter: stored.counter,
        transports: stored.transports as AuthenticatorTransportFuture[] | undefined,
      },
    });

    if (!verification.verified) {
      throw new Error("That passkey could not be verified.");
    }

    await actionCtx.runMutation(internal.passkeys.recordUse, {
      id: stored._id,
      counter: verification.authenticationInfo.newCounter,
    });

    return { userId: stored.userId };
  },
});

// ── Managing your own passkeys ───────────────────────────────────────────────

/** The signed-in user's passkeys, newest first. Never exposes the public key. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    const rows = await ctx.db
      .query("passkeys")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return rows
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((row) => ({
        _id: row._id,
        label: row.label,
        createdAt: row.createdAt,
        lastUsedAt: row.lastUsedAt,
        backedUp: row.backedUp,
        deviceType: row.deviceType,
      }));
  },
});

export const remove = mutation({
  args: { id: v.id("passkeys") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in.");
    const row = await ctx.db.get(args.id);
    // Same error either way: whether an ID exists is not this caller's business.
    if (row === null || row.userId !== userId) throw new Error("Passkey not found.");
    await ctx.db.delete(args.id);
    return null;
  },
});

export const rename = mutation({
  args: { id: v.id("passkeys"), label: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("Not signed in.");
    const row = await ctx.db.get(args.id);
    if (row === null || row.userId !== userId) throw new Error("Passkey not found.");
    const label = args.label.trim().slice(0, 60) || "Passkey";
    await ctx.db.patch(args.id, { label });
    return null;
  },
});

// ── Internals ────────────────────────────────────────────────────────────────

export const registrationContext = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    const credentials = await ctx.db
      .query("passkeys")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    return {
      email: user?.email ?? "Vetic account",
      credentials: credentials.map((c) => ({ id: c.credentialId, transports: c.transports })),
    };
  },
});

export const storeChallenge = internalMutation({
  args: {
    challenge: v.string(),
    kind: v.union(v.literal("registration"), v.literal("authentication")),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    // Opportunistic sweep: challenges are write-once and short-lived, so the
    // table only grows from abandoned prompts. Bounded so one call stays cheap.
    const stale = await ctx.db
      .query("webauthnChallenges")
      .filter((q) => q.lt(q.field("expiresAt"), now))
      .take(20);
    for (const row of stale) {
      await ctx.db.delete(row._id);
    }
    await ctx.db.insert("webauthnChallenges", {
      challenge: args.challenge,
      kind: args.kind,
      userId: args.userId,
      expiresAt: now + CHALLENGE_TTL_MS,
    });
    return null;
  },
});

/**
 * Take a challenge out of the table, returning it only if it was still valid.
 * Deleting as part of the same transaction is what makes it single-use.
 */
export const claimChallenge = internalMutation({
  args: {
    challenge: v.string(),
    kind: v.union(v.literal("registration"), v.literal("authentication")),
  },
  handler: async (ctx, args): Promise<Doc<"webauthnChallenges"> | null> => {
    const row = await ctx.db
      .query("webauthnChallenges")
      .withIndex("by_challenge", (q) => q.eq("challenge", args.challenge))
      .first();
    if (row === null) return null;
    await ctx.db.delete(row._id);
    if (row.kind !== args.kind || row.expiresAt < Date.now()) return null;
    return row;
  },
});

export const byCredentialId = internalQuery({
  args: { credentialId: v.string() },
  handler: async (ctx, args): Promise<Doc<"passkeys"> | null> => {
    return await ctx.db
      .query("passkeys")
      .withIndex("by_credential", (q) => q.eq("credentialId", args.credentialId))
      .first();
  },
});

export const insert = internalMutation({
  args: {
    userId: v.id("users"),
    credentialId: v.string(),
    publicKey: v.string(),
    counter: v.number(),
    transports: v.optional(v.array(v.string())),
    deviceType: v.string(),
    backedUp: v.boolean(),
    label: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("passkeys")
      .withIndex("by_credential", (q) => q.eq("credentialId", args.credentialId))
      .first();
    if (existing !== null) {
      // Re-registering a key the account already has: refresh it rather than
      // leaving two rows that can never both be right.
      if (existing.userId !== args.userId) {
        throw new Error("That passkey is already registered to another account.");
      }
      await ctx.db.patch(existing._id, {
        publicKey: args.publicKey,
        counter: args.counter,
        transports: args.transports,
        deviceType: args.deviceType,
        backedUp: args.backedUp,
        label: args.label,
      });
      return null;
    }
    await ctx.db.insert("passkeys", { ...args, createdAt: Date.now() });
    return null;
  },
});

export const recordUse = internalMutation({
  args: { id: v.id("passkeys"), counter: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { counter: args.counter, lastUsedAt: Date.now() });
    return null;
  },
});

// ── Encoding ─────────────────────────────────────────────────────────────────
//
// Public keys are bytes; Convex documents hold strings. Base64url both ways,
// hand-rolled rather than pulling in @simplewebauthn/server/helpers, which
// drags certificate and metadata-service code into the bundle for two functions.

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function parseJson<T>(raw: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error("Malformed passkey response.");
  }
}
