// ── Case Triage: the problem list — pure, shared ───────────────────────────
// How the extracted findings are sorted into key / secondary / patterns, and
// the deterministic rules applied on top of the model's sort. No Convex
// imports, so the screen, the tests and scripts/eval-case-wording.ts load it
// directly; caseAnalysis.ts re-exports it.

import { LAB_KEYWORD, peakGlucose, type LabReading } from "./labValues";

const clampStr = (v: unknown, max: number): string => (typeof v === "string" ? v.slice(0, max) : "");
const clampArr = (v: unknown, max: number): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max) : [];

/** How a clinician ranks the extracted findings before thinking of causes.
 *  Every term here is one of the extracted sign/diag keywords, verbatim; any
 *  keyword in neither `key` nor `secondary` is a supporting finding. */
export type ProblemList = {
  /** The problems the diagnosis has to explain: the presenting complaints and
   *  any specific, clearly abnormal finding. */
  key: string[];
  /** Findings most likely a CONSEQUENCE of a key problem or a nonspecific
   *  stress change (CK after seizures, stress leukogram, stress
   *  hyperglycaemia) — `explainedBy` says which. */
  secondary: { term: string; explainedBy: string }[];
  /** Findings that mean more together than apart (hypocalcaemia with
   *  hyperphosphataemia). `terms` are keywords; a page matching all of them
   *  scores a bonus. */
  patterns: { name: string; terms: string[] }[];
};

// The screen's optional "Blood interpretation" box arrives as this labelled
// section (INTERPRETATION_HEADING, also used by CaseTriageScreen).
export const INTERPRETATION_HEADING = "[Clinician's interpretation of the bloods]";

/** Matching key for a problem-list term against the extracted keywords. The
 *  model does not always copy a keyword verbatim — "seizures" for "seizure",
 *  "hypocalcaemia" for "hypocalcemia", "hypocalcemia (1.0 mmol/L)" — and a term
 *  that fails to match is dropped, so enough misses silently turn the search
 *  back into flat weighting. Folds case, separators, a trailing value in
 *  brackets, UK/US -ae-/-oe- spelling and a plural -s on each word. */
function termKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/ae/g, "e")
    .replace(/oe/g, "e")
    .replace(/[\s\-/,]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => (w.length > 3 ? w.replace(/s$/, "") : w))
    .join(" ");
}

/** Keeps only problem-list terms that are extracted keywords (see termKey),
 *  rewritten to the keyword's own spelling, so the search can look them up. A
 *  term in `key` wins over the same term in `secondary`. With no usable key
 *  problems, the presenting signs (`signKeywords`) stand in: an empty key list
 *  switches off the search's key-problem filters, and a run that came back
 *  that way listed diabetes on lethargy and a borderline glucose alone. */
export function cleanProblemList(
  raw: unknown, keywords: string[], signKeywords: string[] = [], labs: LabReading[] = [],
): ProblemList {
  const byKey = new Map(keywords.map((k) => [termKey(k), k]));
  const known = (t: unknown) => (typeof t === "string" ? byKey.get(termKey(t)) : undefined);
  const p = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  let key = [...new Set((Array.isArray(p.key) ? p.key : []).map(known).filter((t): t is string => !!t))];
  if (key.length === 0) key = [...new Set(signKeywords)];
  const keySet = new Set(key);

  const seen = new Set<string>();
  const secondary = (Array.isArray(p.secondary) ? p.secondary : [])
    .filter((s): s is Record<string, unknown> => !!s && typeof s === "object")
    .map((s) => ({ term: known(s.term), explainedBy: clampStr(s.explainedBy, 80) }))
    .filter((s): s is { term: string; explainedBy: string } => {
      if (!s.term || keySet.has(s.term) || seen.has(s.term)) return false;
      seen.add(s.term);
      return true;
    });

  const patterns = (Array.isArray(p.patterns) ? p.patterns : [])
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
    .map((x) => ({
      name: clampStr(x.name, 80),
      terms: [...new Set(clampArr(x.terms, 6).map(known).filter((t): t is string => !!t))],
    }))
    .filter((x) => x.name.length > 0 && x.terms.length >= 2)
    .slice(0, 6);

  return applySecondaryRules(applyKeyRules({ key, secondary, patterns }, keywords, labs), keywords, labs);
}

// ── Deterministic key findings ──
// The other direction. The wording eval (scripts/eval-case-wording.ts) caught
// live runs on the Airedale case, written in shorthand or US spelling, filing
// hypocalcaemia and hyperphosphataemia as "secondary ← stress" or
// "← seizures", with no pattern — and hypoparathyroidism fell to 2nd and 4th.
// Seizures and stress do not lower calcium; low calcium causes seizures.

/** Pairs a clinician reads as one problem. Added whenever both halves were
 *  extracted, whatever the model did with them: the prompt names these very
 *  examples, and the model still left them out on some wordings. */
const PATTERN_RULES: { name: string; parts: [RegExp, RegExp] }[] = [
  { name: "hypocalcaemia with hyperphosphataemia", parts: [/hypocalc|\blow (total |ionised |ionized )?ca(lcium)?\b/i, /hyperphos|\b(high|elevated|increased) (inorganic )?phos/i] },
  { name: "hyponatraemia with hyperkalaemia", parts: [/hyponatr|\blow (na|sodium)\b/i, /hyperkal|\b(high|elevated|increased) (k|potassium)\b/i] },
];

/** Findings that cause the presenting signs rather than follow from them.
 *  The model may still file one as secondary for a real reason — low total
 *  calcium from hypoalbuminaemia — so only the explanations that cannot be
 *  right are overruled: stress, or a seizure-like sign. */
const NEVER_FROM_STRESS = /hypocalc|\blow (total |ionised |ionized )?ca(lcium)?\b|hypoglyc|\blow (blood )?(glucose|sugar)\b|hyperammon/i;
const STRESS_OR_SEIZURE = (why: string) => !why.trim() || /stress/i.test(why) || SEIZURE_LIKE.test(why);

export function applyKeyRules(list: ProblemList, keywords: string[], labs: LabReading[] = []): ProblemList {
  // Only overrule a wrong explanation; a specific one ("hypoalbuminaemia")
  // keeps its finding secondary and out of any pattern.
  const wrong = (x: { term: string; explainedBy: string }) => STRESS_OR_SEIZURE(x.explainedBy);
  const explained = new Set(list.secondary.filter((x) => !wrong(x)).map((x) => x.term));
  const patterns = [...list.patterns];
  for (const rule of PATTERN_RULES) {
    const a = keywords.find((k) => rule.parts[0].test(k));
    const b = keywords.find((k) => rule.parts[1].test(k));
    if (!a || !b || explained.has(a) || explained.has(b)) continue;
    if (patterns.some((p) => p.terms.includes(a) && p.terms.includes(b))) continue;
    patterns.push({ name: rule.name, terms: [a, b] });
  }
  const inPattern = new Set(patterns.flatMap((p) => p.terms));
  const promote = (x: { term: string; explainedBy: string }) =>
    inPattern.has(x.term) || (NEVER_FROM_STRESS.test(x.term) && wrong(x));
  const key = [...list.key];
  for (const x of list.secondary) if (promote(x) && !key.includes(x.term)) key.push(x.term);
  // A calcium below the level that causes signs (labValues.ts) is a problem
  // to explain, even where the model left it as merely supporting — or never
  // extracted it, and the keyword was added from the value.
  if (labs.some((l) => l.analyte === "calcium" && l.grade === "low")) {
    for (const k of keywords) {
      if (!LAB_KEYWORD.calcium!.already.test(k) || key.includes(k) || list.secondary.some((x) => x.term === k)) continue;
      key.push(k);
    }
  }
  return { key, secondary: list.secondary.filter((x) => !promote(x)), patterns };
}

// ── Deterministic secondary findings ──
// The model marks these secondary on some runs and not others, and the
// ranking swings with it: on the reference case (FN Airedale, seizures,
// hypocalcaemia + hyperphosphataemia, CK 590) one live run left CK at full
// weight and rhabdomyolysis outranked hypoparathyroidism. Each rule is a
// finding that is almost always a consequence rather than a clue in the
// context given, so it is demoted whatever the model said — unless the model
// made it part of a pattern, which is a deliberate reading worth keeping.
const SEIZURE_LIKE = /seizur|convuls|status epilepticus|tremor|fasciculat|tetan|muscle spasm|cramp/i;
const DIABETIC_CONTEXT = /glucosuri|glycosuri|ketonuri|ketonemi|ketonaemi|ketoacid|fructosamine|polyuri|polydips|pu\s*\/?\s*pd/i;
// Glucose in the urine or ketones: with these, even a modest glucose is worth
// a diabetic work-up. PU/PD alone is not on this list once a value is known —
// below the renal threshold there is no glucosuria to cause it.
const GLUCOSURIC_CONTEXT = /glucosuri|glycosuri|ketonuri|ketonemi|ketonaemi|ketoacid|fructosamine/i;
const SECONDARY_RULES: { finding: RegExp; explainedBy: (kws: string[], labs: LabReading[]) => string | null }[] = [
  // Seizures and tremor raise CK by themselves.
  {
    finding: /\b(ck|cpk|creatine kinase|creatinine kinase)\b/i,
    explainedBy: (kws) => kws.find((k) => SEIZURE_LIKE.test(k)) ?? null,
  },
  // A stress leukogram is a stress leukogram.
  { finding: /stress leuk/i, explainedBy: () => "stress" },
  // Hyperglycaemia without glucosuria, ketones or PU/PD is read as stress.
  // Any raised-glucose wording: live runs on the Airedale case wrote
  // "elevated blood glucose", "increased glucose" and "glucose 6.1 mmol/L",
  // each slipped past a narrower pattern, stayed key and put diabetes on the
  // chart. Low glucose is a real key finding and never matches.
  {
    // When the notes give the number, the number decides: a value at or above
    // the species' renal threshold is never written off as stress (a dog at
    // 25 mmol/L used to be, on wording alone), and one below it is stress
    // unless glucose or ketones are in the urine (see labValues.ts).
    finding: /hyperglyc|^(?!.*\b(hypo|low|decreased?|reduced)\b).*\b(glucose|bg|blood sugar)\b/i,
    explainedBy: (kws, labs) => {
      const peak = peakGlucose(labs);
      if (!peak) return kws.some((k) => DIABETIC_CONTEXT.test(k)) ? null : "stress";
      if (peak.grade === "diabetic-range" || kws.some((k) => GLUCOSURIC_CONTEXT.test(k))) return null;
      return `stress (${peak.value} mmol/L, ${peak.note.replace(/ — .*$/, "")})`;
    },
  },
];

export function applySecondaryRules(list: ProblemList, keywords: string[], labs: LabReading[] = []): ProblemList {
  const inPattern = new Set(list.patterns.flatMap((p) => p.terms));
  const demoted = new Map<string, string>();
  for (const kw of keywords) {
    if (inPattern.has(kw)) continue;
    for (const rule of SECONDARY_RULES) {
      if (!rule.finding.test(kw)) continue;
      const why = rule.explainedBy(keywords, labs);
      if (why) demoted.set(kw, why);
      break;
    }
  }
  if (demoted.size === 0) return list;
  const already = new Set(list.secondary.map((s) => s.term));
  return {
    key: list.key.filter((t) => !demoted.has(t)),
    secondary: [
      ...list.secondary,
      ...[...demoted].filter(([t]) => !already.has(t)).map(([term, explainedBy]) => ({ term, explainedBy })),
    ],
    patterns: list.patterns,
  };
}
