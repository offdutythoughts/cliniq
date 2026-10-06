// ── Case Triage: NLP case-notes analysis ─────────────────────────────────────
// Two public actions behind the "Case Triage" screen. Neither one ranks
// differentials itself — that stays the deterministic searchDiseases() engine
// (src/lib/search/diseaseSearch.ts) running client-side, same as Mix & Match.
// The model's job is narrower and bounded on both ends:
//
//   extractSignals   free-text case notes → the structured SearchInputs shape
//                     searchDiseases() already expects (species/breed/age/sex/
//                     sign & diagnostic keywords).
//   synthesizeCase    the case text + the top-N disease rows the deterministic
//                     engine actually matched → a rationale per match, a short
//                     list of discriminating history questions, and a
//                     prioritized diagnostics list — grounded in the given
//                     rows' own authored `signs`/`conf`/`supp` fields, not
//                     invented from scratch.
//
// Uses Gemini (free tier) via plain `fetch` — no SDK, no "use node" needed.
// Requires GEMINI_API_KEY as a Convex env var (`npx convex env set
// GEMINI_API_KEY ...`), not read from .env.local (that only configures the
// Next.js side).

import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";

const MODEL = "gemini-3.8-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Bounds on what we'll send, independent of the model's own output limits —
// these cap OUR request size (and therefore cost/latency), not the model's.
const MAX_CASE_TEXT = 4000;
const MAX_CANDIDATES = 8;
const MAX_FIELD = 600;

// Gemini's 503 ("high demand... usually temporary") is the one failure mode
// worth a same-request retry — a couple of short backoffs cover the spikes
// without masking a real problem (a bad key, a malformed schema) behind a
// retry loop, since those come back as 4xx and are never retried here.
const RETRY_DELAYS_MS = [800, 2000];

async function callGemini(prompt: string, schema: Record<string, unknown>): Promise<unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ConvexError(
      "Case Triage isn't configured yet — GEMINI_API_KEY is not set on this Convex deployment.",
    );
  }

  let res: Response;
  let lastBody = "";
  for (let attempt = 0; ; attempt++) {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
          temperature: 0.2,
        },
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
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
};

const EXTRACT_SCHEMA = {
  type: "OBJECT",
  properties: {
    species: { type: "STRING", enum: SPECIES_VALUES as unknown as string[] },
    breedQuery: { type: "STRING" },
    ageCategory: { type: "STRING", enum: AGE_VALUES as unknown as string[] },
    sex: { type: "STRING", enum: SEX_VALUES as unknown as string[] },
    neuter: { type: "STRING", enum: NEUTER_VALUES as unknown as string[] },
    signKeywords: { type: "ARRAY", items: { type: "STRING" } },
    diagKeywords: { type: "ARRAY", items: { type: "STRING" } },
    caseSummary: { type: "STRING" },
  },
  required: ["species", "breedQuery", "signKeywords", "diagKeywords", "caseSummary"],
};

function extractPrompt(caseText: string): string {
  return `You are extracting structured search parameters from free-text veterinary case notes, for a deterministic differential-diagnosis search engine. You are NOT diagnosing the case — only extracting what is already stated.

Case notes:
"""
${caseText}
"""

Extract:
- species: "dog", "cat", or "all" if unclear.
- breedQuery: the breed verbatim if stated, else "".
- ageCategory, sex, neuter: only if the notes state them; omit otherwise.
- signKeywords: short, canonical clinical sign terms (e.g. "vomiting", "weight loss", "PU/PD") — one concept per entry, prefer standard clinical terminology over the owner's exact phrasing. Only signs actually present in the notes.
- diagKeywords: diagnostic/lab findings already reported in the notes (e.g. "elevated ALP", "anemia"). Empty array if none were mentioned.
- caseSummary: one plain sentence paraphrasing the case.

Do not invent anything not present in the text.`;
}

export const extractSignals = action({
  args: { caseText: v.string() },
  handler: async (ctx, args): Promise<ExtractedSignals> => {
    await requireUser(ctx);
    const caseText = args.caseText.trim().slice(0, MAX_CASE_TEXT);
    if (!caseText) throw new ConvexError("Case notes are empty.");

    const raw = (await callGemini(extractPrompt(caseText), EXTRACT_SCHEMA)) as Record<string, unknown>;

    const species = SPECIES_VALUES.includes(raw.species as never) ? (raw.species as ExtractedSignals["species"]) : "all";
    const ageCategory = AGE_VALUES.includes(raw.ageCategory as never) ? (raw.ageCategory as ExtractedSignals["ageCategory"]) : undefined;
    const sex = SEX_VALUES.includes(raw.sex as never) ? (raw.sex as ExtractedSignals["sex"]) : undefined;
    const neuter = NEUTER_VALUES.includes(raw.neuter as never) ? (raw.neuter as ExtractedSignals["neuter"]) : undefined;

    return {
      species,
      breedQuery: clampStr(raw.breedQuery, 80),
      ageCategory,
      sex,
      neuter,
      signKeywords: clampArr(raw.signKeywords),
      diagKeywords: clampArr(raw.diagKeywords),
      caseSummary: clampStr(raw.caseSummary, 300),
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

export type CaseSynthesis = {
  rationales: { diseaseId: string; rationale: string }[];
  historyQuestions: string[];
  diagnostics: { label: string; tier: "minimum" | "confirmatory"; note?: string }[];
};

const SYNTHESIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    rationales: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: { diseaseId: { type: "STRING" }, rationale: { type: "STRING" } },
        required: ["diseaseId", "rationale"],
      },
    },
    historyQuestions: { type: "ARRAY", items: { type: "STRING" } },
    diagnostics: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          label: { type: "STRING" },
          tier: { type: "STRING", enum: ["minimum", "confirmatory"] },
          note: { type: "STRING" },
        },
        required: ["label", "tier"],
      },
    },
  },
  required: ["rationales", "historyQuestions", "diagnostics"],
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

Candidate differentials (already ranked most → least likely):
${rows}

For EACH differential above (by its exact diseaseId), write one sentence tying specific details from the case notes to why it fits (or partially fits) — ground it only in the "signs"/"confirmatory dx"/"supportive dx" fields given and the case text. Never invent a fact not present in either.

Then propose 3-6 ADDITIONAL history questions that would help discriminate between these specific top differentials — each should plausibly separate at least two of them, not a generic question.

Then propose a prioritized diagnostics list drawn ONLY from the "confirmatory dx"/"supportive dx" fields given above, deduplicated across differentials, each tagged tier "minimum" (first-line/inexpensive) or "confirmatory" (definitive), with a short note on which differential(s) it helps confirm or rule out.`;
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
      return { rationales: [], historyQuestions: [], diagnostics: [] };
    }

    const raw = (await callGemini(synthesisPrompt(caseText, candidates), SYNTHESIS_SCHEMA)) as Record<
      string,
      unknown
    >;
    const validIds = new Set(candidates.map((c) => c.diseaseId));

    const rationales = (Array.isArray(raw.rationales) ? raw.rationales : [])
      .filter((r): r is { diseaseId: string; rationale: string } =>
        !!r && typeof r === "object" && validIds.has((r as Record<string, unknown>).diseaseId as string),
      )
      .map((r) => ({ diseaseId: r.diseaseId, rationale: clampStr(r.rationale, 300) }));

    const diagnostics = (Array.isArray(raw.diagnostics) ? raw.diagnostics : [])
      .filter((d): d is Record<string, unknown> => !!d && typeof d === "object")
      .map((d) => ({
        label: clampStr(d.label, 120),
        tier: d.tier === "confirmatory" ? ("confirmatory" as const) : ("minimum" as const),
        note: d.note ? clampStr(d.note, 200) : undefined,
      }))
      .filter((d) => d.label.length > 0)
      .slice(0, 16);

    return {
      rationales,
      historyQuestions: clampArr(raw.historyQuestions, 6).map((q) => clampStr(q, 200)),
      diagnostics,
    };
  },
});
