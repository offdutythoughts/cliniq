// ── Case Triage: extraction + problem list → ranked differentials ───────────
// The deterministic half of the pipeline, shared by CaseTriageScreen and the
// wording eval (scripts/eval-case-wording.ts) so the eval measures exactly
// what the screen shows.

import type { ExtractedSignals, ProblemList } from '../../../convex/caseAnalysis'
import {
  searchDiseases, diverseDifferentials, coreDifferentials, type DiseaseResult, type SearchInputs,
} from '../search/diseaseSearch'

// Keep in sync with convex/caseAnalysis.ts's own MAX_CANDIDATES (that one caps
// the request/model side; this one decides how many rows the chart actually
// shows — diverseDifferentials() reserves roughly half these slots for the
// strongest-scoring candidates and the rest for breadth across aetiology
// categories (plus near-tie companions within an already-represented
// category), so a higher cap buys breadth and depth, not just a longer
// top-N. 12 (not 10) gives the near-tie mechanism room without starving the
// single-category breadth pass of its own slots.
export const MAX_CANDIDATES = 12

export function rankCase(extracted: ExtractedSignals, list: ProblemList | null): DiseaseResult[] {
  const inputs: SearchInputs = {
    species: extracted.species,
    breedQuery: extracted.breedQuery,
    ageCategory: extracted.ageCategory,
    sex: extracted.sex,
    neuter: extracted.neuter,
    signKeywords: extracted.signKeywords,
    diagKeywords: extracted.diagKeywords,
    termTiers: list ? {
      key: list.key,
      secondary: list.secondary.map(x => x.term),
      patterns: list.patterns.map(p => p.terms),
    } : undefined,
  }
  return diverseDifferentials(
    searchDiseases(inputs), MAX_CANDIDATES, undefined, undefined,
    coreDifferentials([...(list?.key ?? []), ...(list?.patterns.flatMap(p => p.terms) ?? [])]),
  )
}
