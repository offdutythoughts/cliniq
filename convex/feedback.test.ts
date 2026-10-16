/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

async function seedUser(t: ReturnType<typeof convexTest>, email: string) {
  return await t.run(async (ctx) => ctx.db.insert("users", { email }));
}

/** Every test's admin list; the mixed case checks that emails are normalised. */
const seedAdmins = (t: ReturnType<typeof convexTest>) =>
  t.mutation(internal.feedback.setAdmins, { emails: [" Admin@Vetic.app", "other@x.com"] });

/** convex-auth derives the user id from the identity subject's first segment. */
const asUser = (t: ReturnType<typeof convexTest>, userId: Id<"users">) =>
  t.withIdentity({ subject: `${userId}|session` });

const report = (over: Partial<{ pageKey: string; message: string; quote: string }> = {}) => ({
  pageKey: "disease:DIS-REN-CKD",
  pageTitle: "Disease · Chronic kidney disease",
  path: "/app/disease/DIS-REN-CKD?sp=cat",
  category: "wrong" as const,
  message: "SDMA cut-off for stage 2 looks wrong",
  ...over,
});

describe("feedback", () => {
  test("an admin added while signed in is let in without re-signing", async () => {
    const t = convexTest(schema, modules);
    const later = await seedUser(t, "late@vetic.app");
    expect(await asUser(t, later).query(api.feedback.canReview, {})).toBe(false);
    await t.mutation(internal.feedback.setAdmins, { emails: ["late@vetic.app"] });
    expect(await asUser(t, later).query(api.feedback.canReview, {})).toBe(true);
    // Replacing the list removes whoever is not on it.
    await t.mutation(internal.feedback.setAdmins, { emails: [] });
    expect(await asUser(t, later).query(api.feedback.canReview, {})).toBe(false);
  });


  test("a signed-in reader files a report; only an admin can read it", async () => {
    const t = convexTest(schema, modules);
    await seedAdmins(t);
    const reader = await seedUser(t, "vet@clinic.com");
    const admin = await seedUser(t, "admin@vetic.app");

    await asUser(t, reader).mutation(api.feedback.submit, report({ quote: "  SDMA  >18 " }));

    expect(await asUser(t, reader).query(api.feedback.inbox, { status: "new" })).toBeNull();
    expect(await asUser(t, reader).query(api.feedback.canReview, {})).toBe(false);
    expect(await asUser(t, admin).query(api.feedback.canReview, {})).toBe(true);

    const rows = await asUser(t, admin).query(api.feedback.inbox, { status: "new" });
    expect(rows).toHaveLength(1);
    expect(rows![0]).toMatchObject({ userEmail: "vet@clinic.com", quote: "SDMA  >18", status: "new" });
    expect(rows![0]).not.toHaveProperty("userId");
  });

  test("signed-out and empty reports are refused", async () => {
    const t = convexTest(schema, modules);
    await seedAdmins(t);
    const reader = await seedUser(t, "vet@clinic.com");
    await expect(t.mutation(api.feedback.submit, report())).rejects.toThrow(/Sign in/);
    await expect(
      asUser(t, reader).mutation(api.feedback.submit, report({ message: "   " })),
    ).rejects.toThrow(/empty/);
  });

  test("triage moves a report between statuses; readers cannot", async () => {
    const t = convexTest(schema, modules);
    await seedAdmins(t);
    const reader = await seedUser(t, "vet@clinic.com");
    const admin = await seedUser(t, "admin@vetic.app");
    await asUser(t, reader).mutation(api.feedback.submit, report());
    const [row] = (await asUser(t, admin).query(api.feedback.inbox, { status: "new" }))!;

    await expect(
      asUser(t, reader).mutation(api.feedback.setStatus, { id: row._id, status: "fixed" }),
    ).rejects.toThrow(/Not allowed/);

    await asUser(t, admin).mutation(api.feedback.setStatus, {
      id: row._id,
      status: "fixed",
      resolution: "Corrected to IRIS 2023",
    });
    expect(await asUser(t, admin).query(api.feedback.counts, {})).toEqual({
      new: 0, triaged: 0, fixed: 1, wontfix: 0,
    });
    const [fixed] = (await asUser(t, admin).query(api.feedback.inbox, { status: "fixed" }))!;
    expect(fixed.resolution).toBe("Corrected to IRIS 2023");
  });

  test("digest groups open reports by page, busiest first", async () => {
    const t = convexTest(schema, modules);
    await seedAdmins(t);
    const reader = await seedUser(t, "vet@clinic.com");
    const me = asUser(t, reader);
    await me.mutation(api.feedback.submit, report({ pageKey: "proto:PROT-CPR", message: "one" }));
    await me.mutation(api.feedback.submit, report({ message: "two" }));
    await me.mutation(api.feedback.submit, report({ message: "three", quote: "a line" }));

    const md = await t.query(internal.feedback.digest, {});
    expect(md.indexOf("disease:DIS-REN-CKD")).toBeLessThan(md.indexOf("proto:PROT-CPR"));
    expect(md).toContain("(2)");
    expect(md).toContain("> a line");
  });

  test("a runaway client is rate-limited", async () => {
    const t = convexTest(schema, modules);
    await seedAdmins(t);
    const reader = await seedUser(t, "vet@clinic.com");
    for (let i = 0; i < 20; i++) {
      await asUser(t, reader).mutation(api.feedback.submit, report({ message: `n${i}` }));
    }
    await expect(
      asUser(t, reader).mutation(api.feedback.submit, report()),
    ).rejects.toThrow(/a lot of feedback/);
  });
});
