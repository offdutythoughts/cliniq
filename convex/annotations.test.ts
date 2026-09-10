/// <reference types="vite/client" />
import { convexTest } from "convex-test";
import { describe, expect, test } from "vitest";
import { api } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

const PAGE = "page:dxDyspnoeaHistory";

async function seedUser(t: ReturnType<typeof convexTest>, email: string) {
  return await t.run(async (ctx) => ctx.db.insert("users", { email }));
}

/** convex-auth derives the user id from the identity subject's first segment. */
const asUser = (t: ReturnType<typeof convexTest>, userId: Id<"users">) =>
  t.withIdentity({ subject: `${userId}|session` });

/** A valid `add` payload; pass overrides for whatever the case is about. */
function mark(over: Partial<{
  clientId: string;
  pageKey: string;
  pageTitle: string;
  kind: "highlight" | "underline" | "strike";
  colour: string;
  start: number;
  end: number;
  text: string;
}> = {}) {
  return {
    clientId: "m1",
    pageKey: PAGE,
    pageTitle: "History: Dyspnoea",
    kind: "highlight" as const,
    colour: "yellow",
    start: 114,
    end: 138,
    text: "Visible abdominal effort",
    ...over,
  };
}

describe("annotations", () => {
  test("a signed-out reader gets nothing, and is told so", async () => {
    const t = convexTest(schema, modules);
    const result = await t.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(result).toEqual({ authenticated: false, marks: [] });
  });

  test("a mark survives the round trip", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    expect(await as.query(api.annotations.listByPage, { pageKey: PAGE })).toEqual({
      authenticated: true,
      marks: [
        {
          id: "m1", kind: "highlight", colour: "yellow",
          start: 114, end: 138, text: "Visible abdominal effort",
        },
      ],
    });
  });

  test("replaying a queued add does not draw the mark twice", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    await as.mutation(api.annotations.add, mark());
    const { marks } = await as.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(marks).toHaveLength(1);
  });

  test("an empty range is rejected", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await expect(as.mutation(api.annotations.add, mark({ start: 10, end: 10 }))).rejects.toThrow();
  });

  test("a signed-out client cannot write", async () => {
    const t = convexTest(schema, modules);
    await expect(t.mutation(api.annotations.add, mark())).rejects.toThrow();
    await expect(t.mutation(api.annotations.remove, { clientId: "m1" })).rejects.toThrow();
    await expect(t.mutation(api.annotations.clearPage, { pageKey: PAGE })).rejects.toThrow();
  });

  test("an over-long excerpt is stored truncated", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark({ text: "x".repeat(5000), end: 5114 }));
    const { marks } = await as.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(marks[0].text).toHaveLength(2000);
  });

  test("every offered colour is accepted, and nothing else is", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    const cases: [("highlight" | "underline" | "strike"), string][] = [
      ["highlight", "yellow"], ["highlight", "green"], ["highlight", "blue"],
      ["highlight", "pink"], ["highlight", "orange"],
      ["underline", "teal"], ["underline", "red"], ["underline", "purple"],
      ["strike", "plain"],
    ];
    for (const [i, [kind, colour]] of cases.entries()) {
      await as.mutation(api.annotations.add, mark({ clientId: `c${i}`, kind, colour }));
    }
    const { marks } = await as.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(marks).toHaveLength(cases.length);
  });

  test("a colour the kind does not offer is refused", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    // Real token, wrong kind — the trap a shared palette would fall into.
    await expect(
      as.mutation(api.annotations.add, mark({ kind: "highlight", colour: "teal" })),
    ).rejects.toThrow();
    await expect(
      as.mutation(api.annotations.add, mark({ kind: "underline", colour: "yellow" })),
    ).rejects.toThrow();
    await expect(
      as.mutation(api.annotations.add, mark({ colour: "chartreuse" })),
    ).rejects.toThrow();
    expect((await as.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toEqual([]);
  });

  test("removing a mark erases it, and removing it again is silent", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    await as.mutation(api.annotations.remove, { clientId: "m1" });
    await as.mutation(api.annotations.remove, { clientId: "m1" }); // replayed delete
    const { marks } = await as.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(marks).toEqual([]);
  });

  test("a re-add after a delete carries the new range — how a moved mark syncs", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    await as.mutation(api.annotations.remove, { clientId: "m1" });
    await as.mutation(api.annotations.add, mark({ start: 200, end: 224 }));
    const { marks } = await as.query(api.annotations.listByPage, { pageKey: PAGE });
    expect(marks).toEqual([
      {
        id: "m1", kind: "highlight", colour: "yellow",
        start: 200, end: 224, text: "Visible abdominal effort",
      },
    ]);
  });

  test("clearing a page leaves other pages alone", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    await as.mutation(api.annotations.add, mark({ clientId: "m2", kind: "underline", colour: "red" }));
    await as.mutation(api.annotations.add, mark({ clientId: "m3", pageKey: "disease:DIS-GI-EPI" }));
    await as.mutation(api.annotations.clearPage, { pageKey: PAGE });
    expect((await as.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toEqual([]);
    expect(
      (await as.query(api.annotations.listByPage, { pageKey: "disease:DIS-GI-EPI" })).marks,
    ).toHaveLength(1);
  });

  test("one reader never sees or erases another reader's marks", async () => {
    const t = convexTest(schema, modules);
    const alice = asUser(t, await seedUser(t, "a@x.com"));
    const bob = asUser(t, await seedUser(t, "b@x.com"));
    await alice.mutation(api.annotations.add, mark());
    await bob.mutation(api.annotations.add, mark({ clientId: "m9", kind: "strike", colour: "plain" }));

    expect((await alice.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toEqual([
      {
        id: "m1", kind: "highlight", colour: "yellow",
        start: 114, end: 138, text: "Visible abdominal effort",
      },
    ]);

    // Bob replaying a delete for Alice's id must not touch her row.
    await bob.mutation(api.annotations.remove, { clientId: "m1" });
    expect((await alice.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toHaveLength(1);

    // Nor may a page-wide clear reach across accounts.
    await bob.mutation(api.annotations.clearPage, { pageKey: PAGE });
    expect((await alice.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toHaveLength(1);
  });

  test("the same client id may be reused by two different readers", async () => {
    const t = convexTest(schema, modules);
    const alice = asUser(t, await seedUser(t, "a@x.com"));
    const bob = asUser(t, await seedUser(t, "b@x.com"));
    await alice.mutation(api.annotations.add, mark());
    await bob.mutation(api.annotations.add, mark({ kind: "underline", colour: "teal" }));
    expect((await bob.query(api.annotations.listByPage, { pageKey: PAGE })).marks).toEqual([
      {
        id: "m1", kind: "underline", colour: "teal",
        start: 114, end: 138, text: "Visible abdominal effort",
      },
    ]);
  });

  test("pages lists each annotated page once, with its mark count", async () => {
    const t = convexTest(schema, modules);
    const as = asUser(t, await seedUser(t, "a@x.com"));
    await as.mutation(api.annotations.add, mark());
    await as.mutation(api.annotations.add, mark({ clientId: "m2", kind: "underline", colour: "red" }));
    await as.mutation(api.annotations.add, mark({ clientId: "m3", pageKey: "disease:DIS-GI-EPI" }));
    const pages = await as.query(api.annotations.pages, {});
    expect(pages).toEqual(
      expect.arrayContaining([
        { pageKey: PAGE, pageTitle: "History: Dyspnoea", count: 2 },
        { pageKey: "disease:DIS-GI-EPI", pageTitle: "History: Dyspnoea", count: 1 },
      ]),
    );
    expect(pages).toHaveLength(2);
  });

  test("pages is empty for a signed-out client", async () => {
    const t = convexTest(schema, modules);
    expect(await t.query(api.annotations.pages, {})).toEqual([]);
  });
});
