/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { internal } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

/** A user with one row in every table that references them. */
async function seedFullAccount(t: ReturnType<typeof convexTest>, email: string) {
  return await t.run(async (ctx) => {
    const userId = await ctx.db.insert("users", { email });
    const accountId = await ctx.db.insert("authAccounts", {
      userId,
      provider: "password",
      providerAccountId: email,
      secret: "hash",
    });
    await ctx.db.insert("authVerificationCodes", {
      accountId,
      provider: "email-verification",
      code: `code-${email}`,
      expirationTime: Date.now() + 60_000,
    });
    const sessionId = await ctx.db.insert("authSessions", {
      userId,
      expirationTime: Date.now() + 60_000,
    });
    await ctx.db.insert("authRefreshTokens", {
      sessionId,
      expirationTime: Date.now() + 60_000,
    });
    await ctx.db.insert("passkeys", {
      userId,
      credentialId: `cred-${email}`,
      publicKey: "pk",
      counter: 0,
      deviceType: "singleDevice",
      backedUp: true,
      label: "iPhone",
      createdAt: Date.now(),
    });
    await ctx.db.insert("webauthnChallenges", {
      challenge: `chal-${email}`,
      kind: "registration",
      userId,
      expiresAt: Date.now() + 60_000,
    });
    await ctx.db.insert("notes", {
      userId,
      pageKey: "DIS-CARD-1",
      pageTitle: "Note",
      html: "<p>x</p>",
      updatedAt: Date.now(),
    });
    await ctx.db.insert("noteHistory", {
      userId,
      pageKey: "DIS-CARD-1",
      pageTitle: "Note",
      html: "<p>old</p>",
      savedAt: Date.now(),
    });
    await ctx.db.insert("onboarding", { userId, seenAt: Date.now() });
    await ctx.db.insert("subscriptions", {
      userId,
      plan: "monthly",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return userId;
  });
}

async function tableCounts(t: ReturnType<typeof convexTest>) {
  return await t.run(async (ctx) => ({
    users: (await ctx.db.query("users").collect()).length,
    authAccounts: (await ctx.db.query("authAccounts").collect()).length,
    authVerificationCodes: (await ctx.db.query("authVerificationCodes").collect()).length,
    authSessions: (await ctx.db.query("authSessions").collect()).length,
    authRefreshTokens: (await ctx.db.query("authRefreshTokens").collect()).length,
    passkeys: (await ctx.db.query("passkeys").collect()).length,
    webauthnChallenges: (await ctx.db.query("webauthnChallenges").collect()).length,
    notes: (await ctx.db.query("notes").collect()).length,
    noteHistory: (await ctx.db.query("noteHistory").collect()).length,
    onboarding: (await ctx.db.query("onboarding").collect()).length,
    subscriptions: (await ctx.db.query("subscriptions").collect()).length,
  }));
}

describe("deleteAccount", () => {
  test("removes the user and every row that references them", async () => {
    const t = convexTest(schema, modules);
    const userId = await seedFullAccount(t, "gone@example.com");

    const result = await t.mutation(internal.accounts.deleteAccount, { userId });

    expect(result.deleted).toBe(true);
    expect(result.email).toBe("gone@example.com");
    expect(result).toMatchObject({
      authAccounts: 1,
      authVerificationCodes: 1,
      authSessions: 1,
      authRefreshTokens: 1,
      passkeys: 1,
      webauthnChallenges: 1,
      notes: 1,
      noteHistory: 1,
      onboarding: 1,
      subscriptions: 1,
    });

    const after = await tableCounts(t);
    for (const [table, count] of Object.entries(after)) {
      expect(count, `${table} should be empty`).toBe(0);
    }
  });

  // The one that matters: a cascade that over-reaches is far worse than one
  // that under-reaches, because the rows it takes belong to someone else.
  test("leaves another account untouched", async () => {
    const t = convexTest(schema, modules);
    const doomed = await seedFullAccount(t, "gone@example.com");
    await seedFullAccount(t, "keep@example.com");

    await t.mutation(internal.accounts.deleteAccount, { userId: doomed });

    const after = await tableCounts(t);
    for (const [table, count] of Object.entries(after)) {
      expect(count, `${table} should still hold the survivor's row`).toBe(1);
    }
    const survivor = await t.query(internal.accounts.findByEmail, {
      email: "keep@example.com",
    });
    expect(survivor).not.toBeNull();
  });

  test("is a no-op on an id that no longer exists", async () => {
    const t = convexTest(schema, modules);
    const userId = await seedFullAccount(t, "gone@example.com");
    await t.mutation(internal.accounts.deleteAccount, { userId });

    // Re-running must not throw — a partial manual cleanup should be safe to
    // finish with this.
    const again = await t.mutation(internal.accounts.deleteAccount, { userId });
    expect(again.deleted).toBe(false);
    expect(again.authAccounts).toBe(0);
  });
});

describe("findByEmail", () => {
  test("matches regardless of the casing or spacing given", async () => {
    const t = convexTest(schema, modules);
    const userId = await seedFullAccount(t, "vet@example.com");

    const found = await t.query(internal.accounts.findByEmail, {
      email: "  VET@Example.com ",
    });
    expect(found?.userId).toBe(userId);
  });

  test("returns null for an address with no account", async () => {
    const t = convexTest(schema, modules);
    const found = await t.query(internal.accounts.findByEmail, {
      email: "nobody@example.com",
    });
    expect(found).toBeNull();
  });
});
