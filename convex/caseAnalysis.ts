// ── Case Triage: NLP case-notes analysis ─────────────────────────────────────
// Two public actions behind the "Case Triage" screen. Neither one ranks
// differentials itself — that stays the deterministic searchDiseases() engine
// (src/lib/search/diseaseSearch.ts) running client-side, same as Mix & Match.
// The model's job is narrower and bounded on both ends:
//
//   extractSignals   free-text case notes → the structured SearchInputs shape
//                     searchDiseases() already expects (species/breed/age/sex/
//                     sign & diagnostic keywords), plus a problem list sorting
//                     those keywords into key / supporting / secondary
//                     findings and lab patterns, which the search weights.
//   synthesizeCase    the case text + the top-N disease rows the deterministic
//                     engine actually matched → the one feature that sets
//                     each match apart from the others, a short list of
//                     YES/NO history questions (each tagged with the
//                     differentials either answer favours), and a
//                     prioritized diagnostics list — grounded in the given
//                     rows' own authored `signs`/`conf`/`supp` fields, not
//                     invented from scratch.
//
// Uses Groq (free tier, OpenAI-compatible chat API) via plain `fetch` — no
// SDK, no "use node" needed. Requires GROQ_API_KEY as a Convex env var
// (`npx convex env set GROQ_API_KEY ...`, from console.groq.com), not read
// from .env.local (that only configures the Next.js side).
//
// Groq's API has no native JSON-schema enforcement (unlike Gemini's
// responseSchema) — `response_format: json_object` only guarantees valid
// JSON, not a particular shape. Each prompt below spells out the exact shape
// as a literal example instead, and every field is still defensively
// re-validated/clamped after parsing (enum membership, array length, dropping
// any diseaseId the model didn't actually get handed) before it's trusted.

import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { readLabs, withLabKeywords, type LabReading } from "./labValues";
import { cleanProblemList, INTERPRETATION_HEADING, type ProblemList } from "./problemList";

// The problem-list logic lives in problemList.ts (pure, loadable outside
// Convex); re-exported so existing imports keep working.
export { applySecondaryRules, cleanProblemList, INTERPRETATION_HEADING, type ProblemList } from "./problemList";

const MODEL = "openai/gpt-oss-120b";
const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const SYSTEM_PROMPT =
  "You are a JSON API. Respond with ONLY a single valid JSON object matching the shape the user describes — no prose, no markdown code fences, no commentary before or after it.";

// Bounds on what we'll send, independent of the model's own output limits —
// these cap OUR request size (and therefore cost/latency), not the model's.
// Keep in sync with CaseTriageScreen.tsx's own MAX_CANDIDATES — that one picks
// how many of searchDiseases()'s results actually get sent here (now reserving
// part of the list for breadth across categories via diverseDifferentials(),
// not just a pure top-N), this one is just the hard cap on what the request
// will accept.
// Leaves room for the abbreviation key CaseTriageScreen appends to the notes.
const MAX_CASE_TEXT = 6000;
const MAX_CANDIDATES = 12;
const MAX_FIELD = 600;

// 503 ("service unavailable") is the one failure mode worth a same-request
// retry — a couple of short backoffs cover a transient blip without masking a
// real problem (a bad key, a rate limit) behind a retry loop, since those come
// back as 4xx and are never retried here.
const RETRY_DELAYS_MS = [800, 2000];

async function callGroq(prompt: string): Promise<unknown> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new ConvexError(
      "Case Triage isn't configured yet — GROQ_API_KEY is not set on this Convex deployment.",
    );
  }

  let res: Response;
  let lastBody = "";
  for (let attempt = 0; ; attempt++) {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        // gpt-oss is a reasoning model — its thinking tokens can otherwise
        // leak into (or in place of) the JSON content, which is what Groq's
        // own "Failed to validate JSON" 400 turned out to be. `hidden` drops
        // the reasoning channel entirely; we only want the final JSON.
        reasoning_format: "hidden",
        // Hidden reasoning still spends the completion budget — with no cap
        // and default effort it could exhaust it before the JSON finished
        // (Groq 400 "max completion tokens reached").
        reasoning_effort: "low",
        max_completion_tokens: 8192,
        temperature: 0.2,
      }),
    });
    if (res.ok || res.status !== 503 || attempt >= RETRY_DELAYS_MS.length) break;
    lastBody = await res.text().catch(() => "");
    await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
  }
  if (!res.ok) {
    const body = (await res.text().catch(() => "")) || lastBody;
    throw new ConvexError(`Case Triage model call failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new ConvexError("Case Triage model returned no content.");
  try {
    return JSON.parse(text);
  } catch {
    throw new ConvexError("Case Triage model returned malformed JSON.");
  }
}

async function requireUser(ctx: { auth: Parameters<typeof getAuthUserId>[0]["auth"] }) {
  const userId = await getAuthUserId(ctx as never);
  if (!userId) throw new ConvexError("Sign in required.");
}

const clampStr = (v: unknown, max = MAX_FIELD): string =>
  typeof v === "string" ? v.slice(0, max) : "";
const clampArr = (v: unknown, max = 12): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max) : [];

// ── extractSignals ────────────────────────────────────────────────────────────

const SPECIES_VALUES = ["all", "dog", "cat"] as const;
const AGE_VALUES = ["neonate", "young", "middleaged", "geriatric"] as const;
const SEX_VALUES = ["male", "female"] as const;
const NEUTER_VALUES = ["intact", "neutered"] as const;

export type ExtractedSignals = {
  species: "all" | "dog" | "cat";
  breedQuery: string;
  ageCategory?: "neonate" | "young" | "middleaged" | "geriatric";
  sex?: "male" | "female";
  neuter?: "intact" | "neutered";
  signKeywords: string[];
  diagKeywords: string[];
  caseSummary: string;
  /** Abbreviations in the notes the model couldn't confidently read — the
   *  screen asks the author for their full form. Absent from older backends. */
  unknownAbbreviations?: string[];
  /** The case's problem list. Absent from older backends — the search then
   *  weights every keyword alike. */
  problemList?: ProblemList;
  /** Lab values read from the notes themselves and graded (labValues.ts) —
   *  shown so the reader sees which number the tiering used. Absent from
   *  older backends. */
  labs?: LabReading[];
};

// Shared by both prompts: how to read the key CaseTriageScreen appends from
// its glossary (src/lib/caseTriage/vetAbbreviations.ts) and the author's own
// full forms.
const ABBREVIATION_RULES = `ABBREVIATIONS. The notes are written in veterinary shorthand. If they end with an "[Abbreviation key]" section, that key is not part of the case — it says what each abbreviation in the notes means. Read every abbreviation by it. Where an entry lists several senses joined by OR, choose the one the surrounding context supports (e.g. "FS" beside a signalment is female spayed, beside an eye exam it is fluorescein stain). An entry marked "(per the author)" is the author's own definition and always wins. Never treat an abbreviation you cannot read as a clinical finding — a guessed expansion becomes a false keyword.`;

const INTERPRETATION_RULES = `CLINICIAN'S INTERPRETATION. If the notes contain a "${INTERPRETATION_HEADING}" section, it is the attending clinician's own reading of the results, and it overrides yours when you sort the problem list. A finding they call mild, borderline, stress-related, artefactual, expected, insignificant or explained by another problem goes in "secondary" (with "explainedBy" taken from what they wrote), never "key". A finding they call the main, significant or most important abnormality goes in "key". Extract keywords from that section exactly as from the rest of the notes, but never let it add a finding the results do not contain.`;

function extractPrompt(caseText: string): string {
  return `You are extracting structured search parameters from free-text veterinary case notes, for a deterministic differential-diagnosis search engine. You are NOT diagnosing the case — only extracting what is already stated.

Case notes:
"""
${caseText}
"""

Extract:
- species: "dog", "cat", or "all" if unclear.
- breedQuery: the breed verbatim if stated, else "".
- ageCategory: one of "neonate", "young", "middleaged", "geriatric" — omit the key entirely if not stated.
- sex: one of "male", "female" — omit the key entirely if not stated.
- neuter: one of "intact", "neutered" — omit the key entirely if not stated.
- signKeywords: short, canonical clinical sign terms (e.g. "vomiting", "weight loss", "PU/PD") — one concept per entry, prefer standard clinical terminology over the owner's exact phrasing. Include every sign actually present, not just the ones driving the acute complaint — a chronic, stable or "well controlled" condition (e.g. a cough that is managed on medication) is still a real finding and can still point to a relevant differential, so keep it.
- Also fold into signKeywords/diagKeywords any epidemiological or risk-factor fact the notes state or directly imply (never invented): vaccination/deworming/parasite-prevention status ("unvaccinated", "no heartworm prevention", "no flea/tick prevention" — "not up to date with prophylactics" implies ALL of these unless the notes specify otherwise), travel or residence history relevant to endemic disease ("endemic region", "travel history"), toxin/rodenticide/foreign-body access ("rodenticide access", "toxin exposure"), and population/contact history (unvaccinated littermates, shelter/kennel/dog-park contact). Phrase each as the short generic clinical term a vet would write on a differential list (as in the examples above), not a restatement of the owner's sentence — that is what lets the matching engine connect it to the relevant disease pages.
- Keep the sign the notes describe; never swap it for a neighbouring one. Weakness, ataxia, lameness, paresis and stiffness are DIFFERENT signs with different differentials: a "stiff", "stilted" or "rigid" gait is "stiff gait" (add "stiff hindlimb gait" too if the notes name the limbs), never "weakness" or "gait abnormality". Prefer the plain term a disease page would use: "seizures" (not "convulsive episodes"), "lethargy", "stiff gait".
- When a sign's QUALITY is stated, not just its presence (a cough described as dry/non-productive vs. productive; diarrhoea as watery vs. bloody; pain as acute vs. chronic), extract BOTH the generic term AND the qualified term as separate signKeywords (e.g. a dry cough → ["cough", "dry cough"]) — the qualifier picks out a clinically different, narrower set of differentials than the generic sign alone, and dropping it to just the generic term loses that distinction.
- Pattern-recognize a bleeding diathesis: if the notes report TWO OR MORE of hematochezia/melena, hematemesis, epistaxis, petechiae/ecchymoses, hemoptysis, or hematuria occurring together, add "coagulopathy" as an additional signKeyword alongside the individual signs — a vet seeing that combination would reflexively consider a clotting disorder (and order a coagulation panel) even before any single sign points there, and the matching engine only surfaces that family of differentials (and the coagulation panel their own confirmatory tests call for) when "coagulopathy" is actually present as a keyword.
- diagKeywords: diagnostic/lab findings already reported in the notes (e.g. "elevated ALP", "anemia"). Empty array if none were mentioned.
- caseSummary: one plain sentence paraphrasing the case's acute presenting complaint.

- unknownAbbreviations: every abbreviation or acronym in the notes (outside the abbreviation key) that the key does not define AND that you cannot read with confidence as standard veterinary shorthand — exactly as written. Empty array if none. Leave such abbreviations out of signKeywords/diagKeywords rather than guessing.

- problemList: sort the keywords you extracted the way a clinician writes a problem list before thinking of causes. Every term below must be copied EXACTLY from signKeywords or diagKeywords; a keyword you put in neither "key" nor "secondary" counts as a supporting finding.
  - key: the problems the diagnosis has to explain — the presenting complaints, plus any lab or exam finding that is clearly abnormal AND specific (it narrows the causes to a short list). Weigh magnitude: a value just outside the reference range is rarely key.
  - secondary: findings most likely a CONSEQUENCE of a key problem, or a nonspecific stress change, rather than a clue to its cause — e.g. a mildly elevated CK after seizures or tremors, a stress leukogram, mild hyperglycaemia in a stressed or seizuring dog, a mild ALT rise after seizures. For each give "explainedBy": the key problem (or "stress") that accounts for it. Only list a finding here when that explanation is the likeliest reading; when unsure, leave it as supporting.
  - patterns: findings that mean more together than apart, which a clinician reads as one problem — e.g. hypocalcaemia with hyperphosphataemia, hyponatraemia with hyperkalaemia, azotaemia with isosthenuria, regenerative anaemia with spherocytosis. "name" is the pattern as a clinician would say it; "terms" are its two or more component keywords. Only patterns whose every component is actually in the case.

${INTERPRETATION_RULES}

${ABBREVIATION_RULES}

Do not invent anything not present in or directly implied by the text.

Respond with ONLY a JSON object of exactly this shape (omit ageCategory/sex/neuter keys if unknown, don't include them as null):
{"species":"dog","breedQuery":"Cavalier King Charles Spaniel","ageCategory":"geriatric","sex":"male","neuter":"neutered","signKeywords":["exercise intolerance","cough"],"diagKeywords":[],"caseSummary":"...","unknownAbbreviations":[],"problemList":{"key":["exercise intolerance","cough"],"secondary":[],"patterns":[]}}`;
}

export const extractSignals = action({
  args: { caseText: v.string() },
  handler: async (ctx, args): Promise<ExtractedSignals> => {
    await requireUser(ctx);
    const caseText = args.caseText.trim().slice(0, MAX_CASE_TEXT);
    if (!caseText) throw new ConvexError("Case notes are empty.");

    const raw = (await callGroq(extractPrompt(caseText))) as Record<string, unknown>;

    const species = SPECIES_VALUES.includes(raw.species as never) ? (raw.species as ExtractedSignals["species"]) : "all";
    const ageCategory = AGE_VALUES.includes(raw.ageCategory as never) ? (raw.ageCategory as ExtractedSignals["ageCategory"]) : undefined;
    const sex = SEX_VALUES.includes(raw.sex as never) ? (raw.sex as ExtractedSignals["sex"]) : undefined;
    const neuter = NEUTER_VALUES.includes(raw.neuter as never) ? (raw.neuter as ExtractedSignals["neuter"]) : undefined;

    const signKeywords = clampArr(raw.signKeywords);
    const labs = readLabs(caseText, species);
    const diagKeywords = withLabKeywords(clampArr(raw.diagKeywords), signKeywords, labs);
    return {
      species,
      breedQuery: clampStr(raw.breedQuery, 80),
      ageCategory,
      sex,
      neuter,
      signKeywords,
      diagKeywords,
      caseSummary: clampStr(raw.caseSummary, 300),
      unknownAbbreviations: clampArr(raw.unknownAbbreviations, 20).map((a) => a.slice(0, 24)),
      problemList: cleanProblemList(raw.problemList, [...signKeywords, ...diagKeywords], signKeywords, labs),
      labs,
    };
  },
});

// ── synthesizeCase ────────────────────────────────────────────────────────────

export type SynthesisCandidate = {
  diseaseId: string;
  name: string;
  category: string;
  signs: string;
  conf: string;
  supp: string;
  matchedTerms: string[];
  score: number;
};

/** One YES/NO history question. `yes`/`no` are the diseaseIds that answer
 *  makes MORE likely — what lets each fork leg narrow the differential list. */
export type HistoryQuestion = { question: string; yes: string[]; no: string[] };

/** One row of the swimlane chart: the finding at each workup stage that points
 *  to this differential and away from the others ("" = that stage doesn't
 *  separate it). Rows sharing a finding use identical wording so the chart can
 *  merge them into one box. */
export type LaneRow = { diseaseId: string; history: string; exam: string; minDb: string; confirm: string };

export type CaseSynthesis = {
  /** `rationale` is the differential's key DISCRIMINATOR against the other
   *  candidates (e.g. "petechiae/ecchymoses"), not a restatement of the
   *  case signs every candidate shares. Field name kept for compatibility. */
  rationales: { diseaseId: string; rationale: string }[];
  /** Plain strings come from a backend deployed before HistoryQuestion. */
  historyQuestions: (HistoryQuestion | string)[];
  diagnostics: { label: string; tier: "minimum" | "confirmatory"; diseaseIds: string[] }[];
  /** Absent from backends deployed before the swimlane chart. */
  lanes?: LaneRow[];
};

function synthesisPrompt(caseText: string, candidates: SynthesisCandidate[]): string {
  const rows = candidates
    .map(
      (c, i) =>
        `${i + 1}. diseaseId=${c.diseaseId} name="${c.name}" category=${c.category} matchedTerms=${c.matchedTerms.join(", ") || "(none)"}\n   signs: ${c.signs || "(none on file)"}\n   confirmatory dx: ${c.conf || "(none on file)"}\n   supportive dx: ${c.supp || "(none on file)"}`,
    )
    .join("\n");

  return `You are given a veterinary case description and a list of candidate differentials a deterministic matching engine already ranked from this clinic's own disease database. Do NOT reorder, add, or remove differentials — use exactly the diseaseIds given.

Case notes:
"""
${caseText}
"""

${ABBREVIATION_RULES}

Candidate differentials (already ranked most → least likely):
${rows}

This list was deliberately chosen for breadth as well as likelihood: alongside the highest-scoring reading of the case it includes a plausible candidate from other aetiology categories (toxic, infectious, parasitic, metabolic…) even where that candidate matched on commoner, less specific signs. Treat every diseaseId given as equally worth working up — do not write any differential's discriminator, question or diagnostics as an afterthought because it scored lower or because another candidate's organ system seems the obvious reading.

DISCRIMINATORS. For EACH differential above (by its exact diseaseId), give its single key DISCRIMINATOR: the one clinical sign, exam finding, lab finding, OR epidemiological/history risk factor (max 8 words) that separates it from the OTHER differentials in this list — e.g. "petechiae/ecchymoses; prolonged PT" for anticoagulant rodenticide toxicosis among GI causes of haematochezia, or "unvaccinated; endemic-region travel" for an infectious/parasitic candidate (heartworm, leptospirosis, parvovirus…) sitting among otherwise structural or metabolic differentials — for those, the history/exposure fact IS the discriminator, because the clinical signs alone overlap the others. Never restate a sign the case already shows or that the other differentials share (hematochezia, lethargy, inappetence when every candidate has them) — that separates nothing. Ground it in the "signs"/"confirmatory dx"/"supportive dx" fields given, or in a risk factor actually stated in the case notes; never invent a fact. No sentence, no "matches the case" — just the feature.

HISTORY QUESTIONS. Then propose 3-6 YES/NO history questions that narrow THESE differentials. For each, list the diseaseIds a YES makes more likely ("yes") and the diseaseIds a NO makes more likely ("no"); every question must move at least one differential, and a diseaseId never appears on both sides.
- Order them from MOST GENERAL to most specific. The first question should be the broadest split — systemic/concurrent signs that separate whole aetiology categories (e.g. fever → infectious; vomiting → GI involvement; watery vs bloody diarrhoea) — before exposure-specific questions about one disease.
- Always consider, where they would separate any of these differentials: population history (large litter, littermates or other in-contact animals affected, shelter/breeder/pet-store origin, kennel or dog-park contact) and travel history (travel to or origin from a region endemic for a candidate disease).
- Also consider vaccination/deworming status, toxin access, and recent medications where relevant.

Then propose a prioritized diagnostics list drawn ONLY from the "confirmatory dx"/"supportive dx" fields given above, deduplicated across differentials, each tagged tier "minimum" (first-line/inexpensive) or "confirmatory" (definitive), and tagged with the exact diseaseId(s) (from the list above) it helps confirm or rule out — this is what groups diagnostics under the right category in the flowchart, so it must be accurate, not a guess.

LANES. Finally, for EACH differential, lay out the workup the way a swimlane diagnostic algorithm does (history → physical exam → minimum database → confirmatory test → diagnosis). For each stage give the ONE finding (max 8 words) at that stage that points to this differential and away from the others in the list, or "" if that stage doesn't separate it:
- "history": a short question, e.g. "Rodenticide access?", "Unvaccinated; littermates affected?", "Travel to endemic region?".
- "exam": a physical exam finding, e.g. "Petechiae, ecchymoses?", "Fever?".
- "minDb": a CBC/biochemistry/urinalysis/fecal finding, e.g. "Prolonged PT", "Leukopenia/neutropenia", "Azotaemia, isosthenuria".
- "confirm": the definitive test, drawn ONLY from the "confirmatory dx"/"supportive dx" fields given.
When the same finding points to several differentials (e.g. fever for every infectious cause), write it with IDENTICAL wording on each of them — the chart merges identical adjacent findings into one box. Never use a sign every candidate shares.

Respond with ONLY a JSON object of exactly this shape:
{"lanes":[{"diseaseId":"DIS-EXAMPLE","history":"...","exam":"...","minDb":"...","confirm":"..."}],"rationales":[{"diseaseId":"DIS-EXAMPLE","rationale":"..."}],"historyQuestions":[{"question":"...","yes":["DIS-EXAMPLE"],"no":[]}],"diagnostics":[{"label":"...","tier":"minimum","diseaseIds":["DIS-EXAMPLE"]}]}`;
}

export const synthesizeCase = action({
  args: {
    caseText: v.string(),
    candidates: v.array(
      v.object({
        diseaseId: v.string(),
        name: v.string(),
        category: v.string(),
        signs: v.string(),
        conf: v.string(),
        supp: v.string(),
        matchedTerms: v.array(v.string()),
        score: v.number(),
      }),
    ),
  },
  handler: async (ctx, args): Promise<CaseSynthesis> => {
    await requireUser(ctx);
    const caseText = args.caseText.trim().slice(0, MAX_CASE_TEXT);
    if (!caseText) throw new ConvexError("Case notes are empty.");
    const candidates = args.candidates.slice(0, MAX_CANDIDATES).map((c) => ({
      ...c,
      name: clampStr(c.name, 120),
      signs: clampStr(c.signs),
      conf: clampStr(c.conf),
      supp: clampStr(c.supp),
      matchedTerms: clampArr(c.matchedTerms, 10),
    }));
    if (candidates.length === 0) {
      return { rationales: [], historyQuestions: [], diagnostics: [], lanes: [] };
    }

    const raw = (await callGroq(synthesisPrompt(caseText, candidates))) as Record<string, unknown>;
    const validIds = new Set(candidates.map((c) => c.diseaseId));

    const rationales = (Array.isArray(raw.rationales) ? raw.rationales : [])
      .filter((r): r is { diseaseId: string; rationale: string } =>
        !!r && typeof r === "object" && validIds.has((r as Record<string, unknown>).diseaseId as string),
      )
      .map((r) => ({ diseaseId: r.diseaseId, rationale: clampStr(r.rationale, 120) }));

    const historyQuestions = (Array.isArray(raw.historyQuestions) ? raw.historyQuestions : [])
      .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
      .map((q) => {
        const yes = clampArr(q.yes, MAX_CANDIDATES).filter((id) => validIds.has(id));
        const yesSet = new Set(yes);
        const no = clampArr(q.no, MAX_CANDIDATES).filter((id) => validIds.has(id) && !yesSet.has(id));
        return { question: clampStr(q.question, 200), yes: [...yesSet], no: [...new Set(no)] };
      })
      .filter((q) => q.question.length > 0 && q.yes.length + q.no.length > 0)
      .slice(0, 6);

    const diagnostics = (Array.isArray(raw.diagnostics) ? raw.diagnostics : [])
      .filter((d): d is Record<string, unknown> => !!d && typeof d === "object")
      .map((d) => ({
        label: clampStr(d.label, 120),
        tier: d.tier === "confirmatory" ? ("confirmatory" as const) : ("minimum" as const),
        diseaseIds: clampArr(d.diseaseIds, MAX_CANDIDATES).filter((id) => validIds.has(id)),
      }))
      .filter((d) => d.label.length > 0 && d.diseaseIds.length > 0)
      .slice(0, 16);

    const seen = new Set<string>();
    const lanes = (Array.isArray(raw.lanes) ? raw.lanes : [])
      .filter((r): r is Record<string, unknown> => !!r && typeof r === "object")
      .filter((r) => {
        const id = r.diseaseId as string;
        if (!validIds.has(id) || seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((r) => ({
        diseaseId: r.diseaseId as string,
        history: clampStr(r.history, 100),
        exam: clampStr(r.exam, 100),
        minDb: clampStr(r.minDb, 100),
        confirm: clampStr(r.confirm, 100),
      }));

    return {
      lanes,
      rationales,
      // Plain strings: frontends built before HistoryQuestion call string
      // methods on each entry, and prod's frontend ships separately.
      historyQuestions: historyQuestions.map((q) => q.question),
      diagnostics,
    };
  },
});
