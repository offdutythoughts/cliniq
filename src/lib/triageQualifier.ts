// The one definition of what a name-only box is allowed to say beneath the name.
//
// Three surfaces render the same shape — a clinical NAME with a dimmed second
// line and a tap-through — and all three follow the same rule, so the rule lives
// here rather than being spelled three times:
//
//   • flow chips           `endpoints` items      (EndpointView)      — lint-chips
//   • category tiles       categoryGrid/Columns   (CatTile)           — lint-tiles
//   • differential rows    the ranked list on a   (LesionDetailView)  — filtered
//                          lesion page                                  at render
//
// THE RULE: the box carries the name. The detail belongs on the page the box
// opens — a reader scanning a differential is matching a name against a list,
// not reading a paragraph in 8–11px type. The only second line that earns its
// space is one that helps CHOOSE between the boxes and that the destination does
// not give at a glance: a ranking ("#1 cause dog", "Most common feline cause")
// or a species restriction ("🐱 Cats").
//
// ANCHORED ON PURPOSE. The qualifier must BE the whole line, not appear inside
// one. Six differential `feat` fields contain the words "most common" partway
// through a full discriminator sentence — "Fever, painful kidneys, leucocytosis,
// active urine sediment, ± azotaemia. E. coli most common." A substring test
// would wave those through as rankings, which is exactly the prose the rule
// exists to keep out of a box. If a ranking is worth showing, write it as the
// whole line and put the rest on the destination page.

const TRIAGE_QUALIFIER =
  /^(?:#\d+ cause\b.*|.*most common .*cause.*|(?:🐱|🐶)?\s*(?:cats?|dogs?)(?: only)?)$/i

/** True when `text` may stand as the dimmed second line under a name-only box. */
export function isTriageQualifier(text: string | undefined): boolean {
  const t = (text ?? '').trim()
  return t.length > 0 && TRIAGE_QUALIFIER.test(t)
}
