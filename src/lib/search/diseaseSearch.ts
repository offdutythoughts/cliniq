// ── Differential search engine ────────────────────────────────────────────────
// Scores disease_page entries directly against free-text signalment,
// clinical sign keywords, and diagnostic keywords.
//
// Breed scoring is specificity-adjusted: a disease that names 1–2 breeds and
// the user's breed matches scores much higher than one listing 10+ generic breeds.

import type { DiseaseRow } from '../../data/db'
import { DB } from '../../data/db'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Species = 'all' | 'dog' | 'cat'
export type AgeCategory = 'neonate' | 'young' | 'middleaged' | 'geriatric'
export type SexFilter = 'male' | 'female' | 'neutered' | 'intact'

export interface SearchInputs {
  species: Species
  breedQuery: string
  ageCategory?: AgeCategory
  sex?: SexFilter
  signKeywords: string[]   // e.g. ['vomiting', 'weight loss', 'PU/PD']
  diagKeywords: string[]   // e.g. ['elevated ALP', 'thrombocytopenia', 'hypoechoic liver']
}

export interface DiseaseResult {
  disease: DiseaseRow
  score: number
  breakdown: {
    breed: number
    age: number
    sex: number
    signs: number
    diag: number
  }
  matchedSignTerms: string[]
  matchedDiagTerms: string[]
  category: string
}

// ── Age keywords (permissive — absent age = match) ────────────────────────────

const AGE_KEYWORDS: Record<AgeCategory, RegExp> = {
  neonate:    /neonate|neonatal|newborn|puppy|kitten|pediatric|paediatric|\bcongenital/i,
  young:      /\byoung(?!\s+to\s+old|\s+adult\s+to\s+old)|juvenile|adolescent|\b[6-9]\s*[-–]?\s*month/i,
  middleaged: /middle[- ]aged|middle\s*age|\bmature\b|\badult\b|\bany\s*age\b|\ball\s*age/i,
  geriatric:  /geriatric|senior|\bolder\b|\bold\b|\baged\b/i,
}

// ── Breed specificity scoring ─────────────────────────────────────────────────
// Counts how many distinct named breeds appear in the field to judge specificity.
// Generic phrases ("large breeds", "any breed", "no predisposition") are not
// counted as named breeds and lower or zero out the score.

// "No breed predisposition" / "all breeds susceptible" → zero score.
// "any breed" as a trailing qualifier (e.g. "Maine Coon, Ragdoll — any breed") does NOT
// disqualify the field — specific breeds are still named before it.
const NO_PRED = /^no\s+(strong\s+)?breed\s+pred|^no\s+breed\s+specific|^any\s+breed|^all\s+breeds/i

function countNamedBreeds(breedField: string): number {
  if (NO_PRED.test(breedField.trim())) return 0
  // Split on commas, semicolons, slashes, em-dashes used as separators
  const parts = breedField.split(/[,;\/]|(?:\s+and\s+)|\s+—\s+/)
  // Filter out generic phrases
  const generic = /large|giant|small|medium|brachycephalic|any|all\s+breed|no\s+pred|chondrodystrophic|sighthound|overrepresented|predisposed|most|highest|common/i
  return parts.filter(p => p.trim().length > 2 && !generic.test(p)).length
}

function breedScore(breedField: string | undefined, query: string): number {
  if (!breedField || !query.trim()) return 0
  const q = query.trim().toLowerCase()
  const field = breedField.toLowerCase()
  if (!field.includes(q)) return 0

  const n = countNamedBreeds(breedField)
  if (n === 0) return 0
  if (n <= 2) return 4   // high specificity — e.g. Maine Coon for HCM
  if (n <= 4) return 2
  if (n <= 7) return 1
  return 0               // 8+ named breeds → not meaningfully predictive
}

// ── Category normalisation (mirrors engine.ts) ───────────────────────────────

const CAT_ORDER = [
  'Inflammatory','Infectious','Immune-mediated','Neoplastic','Vascular',
  'Metabolic','Endocrine','Structural','Degenerative','Neuromuscular',
  'Toxic','Congenital/Inherited','Other',
]

function normCat(raw: string): string {
  const r = (raw ?? '').trim()
  if (/^inflammat/i.test(r)) return 'Inflammatory'
  if (/^infect/i.test(r) || /parasitic|fungal/i.test(r)) return 'Infectious'
  if (/immune|autoimmune/i.test(r)) return 'Immune-mediated'
  if (/neoplas|tumour|tumor|mass|malignan/i.test(r)) return 'Neoplastic'
  if (/vascular|cardiovasc|thromboe/i.test(r)) return 'Vascular'
  if (/metabol/i.test(r)) return 'Metabolic'
  if (/endocrin/i.test(r)) return 'Endocrine'
  if (/struct|conform|obstruct|foreign|hiatal/i.test(r)) return 'Structural'
  if (/degener/i.test(r)) return 'Degenerative'
  if (/neuromusc|neurolog/i.test(r)) return 'Neuromuscular'
  if (/tox/i.test(r)) return 'Toxic'
  if (/congen|inherit/i.test(r)) return 'Congenital/Inherited'
  return 'Other'
}

// Infer category from disease id prefix when no explicit cat field
function inferCat(disease: DiseaseRow): string {
  const id = disease.id
  if (/CARD|HCM|DCM|MVD|ARVC/.test(id)) return 'Vascular'
  if (/NEO|LSA|HSA|MCT|OSA|MEL/.test(id)) return 'Neoplastic'
  if (/INFECT|LEPTO|PARVO|LEISHM|BABESIA|LYME/.test(id)) return 'Infectious'
  if (/IMHA|IMT|IMPA|IBD|MUE|GME/.test(id)) return 'Immune-mediated'
  if (/ENDO|HAC|HYPER|HYPO|DM|DKA|PHEO|PHPT|INSULINOMA/.test(id)) return 'Endocrine'
  if (/NEU|EPILEPSY|IVDD|FCE|VESTIB|WOBBLER/.test(id)) return 'Neuromuscular'
  if (/TOX|METALD|MYCOTOX/.test(id)) return 'Toxic'
  if (/REN|CKD|AKI|PLN/.test(id)) return 'Metabolic'
  if (/GI|GAST|COLITIS|PLE|INTUSS/.test(id)) return 'Structural'
  return 'Other'
}

// ── Text matching helper ──────────────────────────────────────────────────────

function fieldText(d: DiseaseRow, ...keys: string[]): string {
  return keys.map(k => (d[k] as string | undefined) ?? '').join(' ').toLowerCase()
}

function keywordHits(text: string, keywords: string[]): string[] {
  return keywords.filter(kw => kw.length >= 2 && text.includes(kw.toLowerCase()))
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface SearchCategory {
  name: string
  items: DiseaseResult[]
}

export function searchDiseases(inputs: SearchInputs): SearchCategory[] {
  const { species, breedQuery, ageCategory, sex, signKeywords, diagKeywords } = inputs

  const hasSignalment = breedQuery.trim() || ageCategory || sex
  const hasKeywords = signKeywords.length > 0 || diagKeywords.length > 0

  if (!hasSignalment && !hasKeywords) return []

  const results: DiseaseResult[] = []

  for (const d of DB.disease_page) {
    // ── Species filter (hard exclude) ──
    if (species !== 'all') {
      const sp = ((d.sp as string) ?? '').toLowerCase()
      if (species === 'dog' && !sp.includes('dog')) continue
      if (species === 'cat' && !sp.includes('cat')) continue
    }

    // ── Breed ──
    const bScore = breedScore(d.breed as string | undefined, breedQuery)

    // ── Age ──
    let aScore = 0
    if (ageCategory) {
      const ageText = (d.age as string | undefined) ?? ''
      if (!ageText || /any\s*age|all\s*age/i.test(ageText)) {
        aScore = 0 // permissive — don't reward unknown age
      } else if (AGE_KEYWORDS[ageCategory].test(ageText)) {
        aScore = 2
      }
    }

    // ── Sex ──
    let sxScore = 0
    if (sex) {
      const sexText = ((d.sex as string | undefined) ?? '').toLowerCase()
      if (sexText && !/no sex|no\s+strong sex|either sex|any sex/i.test(sexText)) {
        if (sex === 'male' && /male/i.test(sexText)) sxScore = 2
        if (sex === 'female' && /female/i.test(sexText)) sxScore = 2
        if (sex === 'intact' && /intact/i.test(sexText)) sxScore = 2
        if (sex === 'neutered' && /neutered|spayed|castrated/i.test(sexText)) sxScore = 2
      }
    }

    // ── Clinical signs ──
    const signText = fieldText(d, 'signs', 'severe', 'synonyms', 'path', 'etiology')
    const matchedSignTerms = keywordHits(signText, signKeywords)
    const signScore = matchedSignTerms.length * 2

    // ── Diagnostics ──
    const diagText = fieldText(d, 'conf', 'supp')
    const matchedDiagTerms = keywordHits(diagText, diagKeywords)
    const diagScore = matchedDiagTerms.length * 2

    const score = bScore + aScore + sxScore + signScore + diagScore

    // Must have at least one keyword hit if keywords were provided,
    // or at least some signalment match if only signalment provided
    if (hasKeywords && matchedSignTerms.length === 0 && matchedDiagTerms.length === 0) continue
    if (!hasKeywords && score === 0) continue

    const rawCat = (d['cat'] as string | undefined) ?? inferCat(d)
    results.push({
      disease: d,
      score,
      breakdown: { breed: bScore, age: aScore, sex: sxScore, signs: signScore, diag: diagScore },
      matchedSignTerms,
      matchedDiagTerms,
      category: normCat(rawCat),
    })
  }

  results.sort((a, b) => b.score - a.score || (a.disease.name as string).localeCompare(b.disease.name as string))

  const catMap = new Map<string, DiseaseResult[]>()
  for (const r of results) {
    let list = catMap.get(r.category)
    if (!list) { list = []; catMap.set(r.category, list) }
    list.push(r)
  }

  const catOrder = new Map(CAT_ORDER.map((c, i) => [c, i]))
  return [...catMap.entries()]
    .sort(([a], [b]) => (catOrder.get(a) ?? 99) - (catOrder.get(b) ?? 99))
    .map(([name, items]) => ({ name, items }))
}
