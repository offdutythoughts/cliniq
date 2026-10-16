/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { expect, test } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

test("the feedback-button tip is seen once per account, idempotently", async () => {
  const t = convexTest(schema, modules);
  const userId = await t.run((ctx) => ctx.db.insert("users", { email: "vet@clinic.com" }));
  const me = t.withIdentity({ subject: `${userId}|session` });

  expect(await t.query(api.onboarding.hintStatus, { hint: "feedbackButton" }))
    .toEqual({ authenticated: false, seen: false });
  expect(await me.query(api.onboarding.hintStatus, { hint: "feedbackButton" }))
    .toEqual({ authenticated: true, seen: false });

  await me.mutation(api.onboarding.markHintSeen, { hint: "feedbackButton" });
  await me.mutation(api.onboarding.markHintSeen, { hint: "feedbackButton" });

  expect(await me.query(api.onboarding.hintStatus, { hint: "feedbackButton" }))
    .toEqual({ authenticated: true, seen: true });
  expect(await t.run((ctx) => ctx.db.query("hints").collect())).toHaveLength(1);
});
