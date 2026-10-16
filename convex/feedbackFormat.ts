// Pure formatting for feedback rows — no server imports, so the /feedback
// inbox page can share it with the `feedback:digest` CLI query.
import type { Doc } from "./_generated/dataModel";

export type FeedbackCategory = Doc<"feedback">["category"];
export type FeedbackStatus = Doc<"feedback">["status"];

export const CATEGORY_LABEL: Record<FeedbackCategory, string> = {
  wrong: "Wrong / unsafe info",
  missing: "Missing content",
  bug: "Bug / layout",
  idea: "Suggestion",
};

export function toMarkdown(
  rows: Pick<
    Doc<"feedback">,
    "pageKey" | "pageTitle" | "path" | "category" | "message" | "quote" | "userEmail" | "species" | "_creationTime"
  >[],
): string {
  if (rows.length === 0) return "No feedback.";
  const byPage = new Map<string, typeof rows>();
  for (const r of rows) {
    const list = byPage.get(r.pageKey) ?? [];
    list.push(r);
    byPage.set(r.pageKey, list);
  }
  // Pages with the most reports first: that is where to start fixing.
  const pages = [...byPage.values()].sort((a, b) => b.length - a.length);
  const out: string[] = [];
  for (const list of pages) {
    const head = list[0];
    out.push(`## ${head.pageTitle || head.pageKey} (${list.length})`);
    out.push(`\`${head.pageKey}\` · ${head.path}`, "");
    for (const r of list) {
      const when = new Date(r._creationTime).toISOString().slice(0, 10);
      const who = [r.userEmail, r.species].filter(Boolean).join(", ");
      out.push(`- **${CATEGORY_LABEL[r.category]}** — ${r.message.replace(/\s*\n\s*/g, " ")} _(${when}${who ? `, ${who}` : ""})_`);
      if (r.quote) out.push(`  > ${r.quote.replace(/\s*\n\s*/g, " ")}`);
    }
    out.push("");
  }
  return out.join("\n").trimEnd();
}
