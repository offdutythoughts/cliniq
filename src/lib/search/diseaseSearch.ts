// ── Differential search engine ────────────────────────────────────────────────
// Scores disease_page entries directly against free-text signalment,
// clinical sign keywords, and diagnostic keywords.
//
// Breed scoring is specificity-adjusted: a disease that names 1–2 breeds and
// the user's breed matches scores much higher than one listing 10+ generic breeds.

import type { DiseaseRow } from '../../data/db'
import { DB } from '../../data/db'
import { prevalenceFactor } from './prevalence'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Species = 'all' | 'dog' | 'cat'
export type AgeCategory = 'neonate' | 'young' | 'middleaged' | 'geriatric'
export type SexFilter = 'male' | 'female'
export type NeuterFilter = 'intact' | 'neutered'

export interface SearchInputs {
  species: Species
  breedQuery: string
  ageCategory?: AgeCategory
  sex?: SexFilter
  neuter?: NeuterFilter
  signKeywords: string[]   // e.g. ['vomiting', 'weight loss', 'PU/PD']
  diagKeywords: string[]   // e.g. ['elevated ALP', 'thrombocytopenia', 'hypoechoic liver']
  /** Problem-list tiers over the keywords above (Case Triage's problem list).
   *  `key` terms weigh more, `secondary` terms far less (and cannot put a page
   *  on the list alone), anything else is a supporting finding at normal
   *  weight. Each `patterns` entry is a set of keywords read as one problem:
   *  its terms count as key, and a page matching all of them scores a bonus.
   *  Absent ⇒ every keyword weighs the same, as in Mix & Match. */
  termTiers?: {
    key?: string[]
    secondary?: string[]
    patterns?: string[][]
  }
}

export interface DiseaseResult {
  disease: DiseaseRow
  /** Ranking score: `evidence` scaled by the species prevalence prior. */
  score: number
  /** How well the history fits, before prevalence. Decides inclusion. */
  evidence: number
  /** Species prevalence multiplier applied to `evidence`; 1 = neutral. */
  prevalence: number
  breakdown: {
    breed: number
    age: number
    sex: number
    signs: number
    diag: number
    /** Bonus for matching every component of a problem-list pattern. */
    pattern: number
    /** Share of the key problems this page explains, 0–1 (1 when there is no
     *  problem list). `signs`, `diag` and `pattern` are scaled by
     *  1 − KEY_COVERAGE_PENALTY × (1 − keyCoverage) before they count. */
    keyCoverage: number
  }
  matchedSignTerms: string[]
  matchedDiagTerms: string[]
  category: string
  /** Why this page is unlikely for the patient's sex/neuter status, when it
   *  is possible only in an unusual circumstance (see SEX_ORGAN_RULES). */
  signalmentNote?: string
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
const NO_PRED = /^no\s+(strong\s+|specific\s+)?breed\b|^no\s+breed\s+specific|^any\s+breed|^all\s+breeds/i

// The field is `|`-separated lines, and the references work keeps appending
// cited evidence sentences to it — "In 17 Australian dogs, St Bernard (3),
// Chihuahua, German Shepherd and Jack Russell (2 each) were the commonest
// breeds… (Russell 2006)". Counted as a list, one such sentence pushed
// hypoparathyroidism past 8 "breeds" and zeroed even the Miniature Schnauzer.
// So the count reads the field the way a clinician does: the breed LIST lines,
// not the headers or the evidence appended beneath them.

// An author-year citation — "(Russell 2006)", "(Meurs 2005; Mary 2010)".
// Textbook chapters "(Ettinger Ch 284)" carry no year and tag breed lists.
const AUTHOR_YEAR = /\([^()]*[A-Za-z][^()]*\b(19|20)\d{2}[a-z]?\b[^()]*\)/
// Any citation parenthetical, textbook or paper — dropped before counting.
const CITATION = /\([^)]*\b(Ch|\d{4})\b[^)]*\)/g
// List separators: , ; : · and the em/en dash that introduces a gloss
// ("Labrador Retriever — most commonly affected"), plus sentence breaks.
const ITEM_SPLIT = /[,;:·]|\s+(?:and|&)\s+|\s+[—–]\s+|\.\s+/
// A list item ends where its predicate starts: "Siamese cats predisposed to
// high-grade" names Siamese, "English Cocker Spaniel at higher risk" names a
// breed. Dropping the whole item, as the old generic filter did, lost both.
const PREDICATE = /(?:^|\s+)(?:over-?represented|under-?represented|predispos\w*|reported|reportedly|affected|suffer|prone|occurs?|found|but|at\s+(?:\w+\s+)?risk|may|might|possibly|probably|appears?|is|are|was|were|has|have|had|can|carry|carries|show|shows|in|for|with|\w{4,}ly|—|–)\b.*$/i
// Words that describe a population or label a form rather than name a breed.
const GENERIC_WORDS = /\b(large|giant|small|medium|toy|brachycephalic\w*|dolichocephalic\w*|mesaticephalic\w*|chondrodystrophic|non|sighthounds?|any|all|no|none|most|highest|common\w*|other|many|various|numerous|several|older|old|aged|age|median|middle|more|less|young|juvenile|adult|females?|males?|entire|spayed|neutered|intact|outdoor|indoor|free-roaming|working|hunting|sporting|pure-?bred|pedigree|cattery|crossbreds?|crosses|mixed|obese|overweight|breeds?|rare|uncommon|severe|also|otherwise|often|deep-chested|active|unvaccinated|immunocompromised|kittens|puppies|animals|dogs?|cats?|canine|feline|congenital|acquired|primary|secondary|familial|hereditary|inherited|idiopathic|disease|forms?|syndrome|variants?|mutation|dystrophy|paralysis|torsion|atresia|ectropion|eversion|neoplasia|lymphoma|myeloma|plasmoma|erosive|visceral|cutaneous|tumou?rs?|cases?|series|risk|registrations|described|frequent|status|as\s+per|cause|clusters|siblings|irised|blue|merle|coat)\b/gi
// A parenthesis that is itself a list of names, or that follows a group word,
// names breeds — "Japanese breeds (Akita, Shiba Inu…)", "Small/toy breeds
// overrepresented (Miniature Schnauzer, Yorkshire Terrier, Maltese)". Any
// other parenthesis is a gloss: "Shetland Sheepdog (mucocele)", "boxer
// (boxer: dysfunctional prothrombin, not true deficiency)".
const LIST_PAREN = /\(((?:(?:e\.g\.|esp\.|i\.e\.|incl\.)\s*)?[A-Z][^(),]*(?:,\s*[A-Z][^(),]*)+)\)|\b(breeds?|dogs|cats|types?)\s*\(((?:(?:e\.g\.|esp\.|i\.e\.|incl\.)\s*)?[A-Z][^()]*)\)/g
// Most fields capitalise breed names, so a lower-case item in a capitalised
// list is commentary — "kennel/cattery settings". A few fields are written
// lower-case throughout ("English cocker spaniel, otterhound, and boxer");
// there a lower-case item is a breed. A line is read that way when it has 3+
// lower-case items, or gives itself away with a breed noun left in lower case.
const LOWER_CASE_LIST = 3
const LOWER_CASE_BREED = /\p{Lu}\p{L}*\s+(?:\p{Ll}+\s+)*(spaniel|terrier|retriever|shepherd|setter|pointer|poodle|collie|hound|sheepdog|bulldog|schnauzer|husk(y|ies)|mastiff|pinscher|ridgeback|malamute|vizsla|shorthair|longhair)s?\b/u

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

/** A cited finding or a prose sentence, rather than a list of breeds. A
 *  cited line whose head is just a breed — "Ragdoll — MyBPC3-R820W mutation
 *  (Meurs 2007)" — is a glossed list item and stays. */
function isEvidenceLine(line: string): boolean {
  const unglossed = line.replace(/\([^()]*\)/g, '')
  if (AUTHOR_YEAR.test(line) && words(unglossed.split(/\s+[—–]\s+/)[0]) > 4) return true
  return unglossed.split(/[,;·]/).some(clause => words(clause) > 10)
}

function namedBreedsInLine(line: string): string[] {
  const listed = line
    .replace(/\bSt\.\s+/g, 'St ')   // "St. Bernard" is not a sentence break
    .replace(CITATION, '')
    .replace(/^(also\s+)?(reported|described|seen)\s+in\s+(the\s+)?/i, '')
    .replace(LIST_PAREN, (_, list, group, inner) => list ? `, ${list},` : `${group}, ${inner},`)
    .replace(/\([^()]*\)/g, '')
    // "Labrador Retriever — most commonly affected": a lower-case gloss after
    // a dash is commentary. "Small breeds — Miniature Poodle, Shih Tzu…" is not.
    .replace(/\s+[—–]\s+\p{Ll}.*$/u, '')
    // "Gastric (dogs): Belgian Shepherd…", "Multiple myeloma: no breed
    // predisposition" — a label is not a breed, unless it is one word glossed
    // in lower case: "Greyhounds: severe juvenile periodontitis".
    .replace(/([^:.,;·]{1,40}):([^.]*)/g, (_, label: string, rest: string) =>
      words(label) === 1 && !/\p{Lu}/u.test(rest) ? `${label},${rest}` : `,${rest}`)
  const items = listed
    .split(ITEM_SPLIT)
    .map(item => item
      .replace(/^\s*(e\.g\.|eg|i\.e\.|incl\.|including|esp\.|especially|the)\s+/i, '')
      .replace(PREDICATE, '')
      // "English Bulldog 10.8", "American Cocker Spaniel 69%" — a breed and
      // its figure. A digit inside a word ("A31P Maine Coons") stays, and
      // marks a variant name rather than a breed below.
      .replace(/(^|\s)[~<>≥≤]?\d.*$/, '')
      // Generic words qualify a breed rather than disqualify the item: "toy
      // Poodle" and "Old English Sheepdog" name breeds, "Small breeds" does not.
      .replace(GENERIC_WORDS, ' ')
      .replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '')
      .trim())
    .filter(item => /\p{L}{3}/u.test(item))
  const lowerCase = items.filter(item => !/\p{Lu}/u.test(item))
  const lowerCaseList = lowerCase.length >= LOWER_CASE_LIST || LOWER_CASE_BREED.test(listed)
  return (lowerCaseList ? items : items.filter(item => !lowerCase.includes(item)))
    .flatMap(item => item.split('/'))
    .map(item => item.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '').replace(/\s+/g, ' '))
    .filter(item => /\p{L}{3}/u.test(item) && words(item) <= 4 && !/\d/.test(item))
}

const contentLines = (breedField: string) =>
  breedField.split('|').map(l => l.trim()).filter(l => l && !l.startsWith('#'))

/** The breeds a clinician would read off a `breed` field's list lines, in
 *  order. The first line is the page's own statement and always counts, cited
 *  or not ("Maine Coon — MyBPC3-A31P mutation… (Meurs 2005)"); evidence lines
 *  appended after it support the list rather than add to it. */
export function namedBreeds(breedField: string): string[] {
  if (NO_PRED.test(breedField.trim())) return []
  const breeds = contentLines(breedField)
    .filter((l, i) => i === 0 || !isEvidenceLine(l))
    .flatMap(namedBreedsInLine)
  // "Irish Wolfhound" listed under two forms is still one breed.
  return breeds.filter((b, i) => breeds.findIndex(o => o.toLowerCase() === b.toLowerCase()) === i)
}

export function countNamedBreeds(breedField: string): number {
  const n = namedBreeds(breedField).length
  if (n || NO_PRED.test(breedField.trim())) return n
  // The list names no breed, so whatever breed the field does name is in a
  // cited finding — discospondylitis: "Large-breed purebred dogs predisposed",
  // then French and English Bulldogs at 3.4× and 4.3× (Grapes 2024). Each
  // finding counts as one breed; prose is too irregular to parse further.
  return contentLines(breedField).slice(1).filter(isEvidenceLine).length
}

// ── Breed groups ──────────────────────────────────────────────────────────────
// Many breed fields name a GROUP rather than a breed — "Miniature Schnauzers,
// Poodles, German Shepherd Dogs, Terriers" on hypoparathyroidism — and a plain
// substring test gives "Airedale Terrier" no credit from "Terriers".
//
// A group counts only where it stands BARE in the field: at the start of a list
// item, or after "other"/"several"/"the". "Jack Russell terriers" and "Labrador
// and Golden Retrievers" are specific breeds in the plural and must not hand
// every terrier or retriever the credit. Each group then says which queries
// belong to it — usually the group word itself, plus the colloquial members a
// clinician actually types ("Westie", "Lab", "Greyhound").
//
// A group match is worth half a named-breed match: the predisposition is real
// but spread across the group, so it says less about this one breed.

const BREED_GROUPS: { field: string; query: RegExp }[] = [
  { field: 'terriers?',    query: /\bterriers?\b|\b(westie|yorkie|staff(y|ie)|jrt)\b/ },
  { field: 'retrievers?',  query: /\bretrievers?\b|\blabrador\b|\blab\b/ },
  { field: 'spaniels?',    query: /\bspaniels?\b|\bckcs\b|\bcavalier\b/ },
  { field: 'setters?',     query: /\bsetters?\b/ },
  { field: 'pointers?',    query: /\bpointers?\b/ },
  { field: 'collies?',     query: /\bcollies?\b/ },
  { field: 'schnauzers?',  query: /\bschnauzers?\b/ },
  { field: 'poodles?',     query: /\bpoodles?\b/ },
  { field: 'bulldogs?',    query: /\bbulldogs?\b|\bfrenchie\b/ },
  { field: 'sheepdogs?',   query: /\bsheepdogs?\b|\bsheltie\b/ },
  { field: 'shepherds?',   query: /\bshepherds?\b|\bgsd\b/ },
  { field: 'hounds',       query: /hounds?\b|\bbeagle\b/ },
  { field: 'sighthounds?', query: /\b(greyhound|whippet|saluki|borzoi|deerhound|wolfhound|afghan|sloughi|galgo|lurcher|azawakh)\b/ },
]

const bareGroupRx = (group: string) =>
  new RegExp(`(^|[,;|(:/]\\s*|\\b(other|several|the)\\s+)${group}\\b`, 'i')
const BARE_GROUP_RX = BREED_GROUPS.map(g => ({ bare: bareGroupRx(g.field), query: g.query }))

function matchesBreedGroup(field: string, q: string): boolean {
  return BARE_GROUP_RX.some(g => g.query.test(q) && g.bare.test(field))
}

function breedScore(breedField: string | undefined, query: string): number {
  if (!breedField || !query.trim()) return 0
  const q = query.trim().toLowerCase()
  const field = breedField.toLowerCase()
  const named = field.includes(q)
  if (!named && !matchesBreedGroup(field, q)) return 0

  const n = countNamedBreeds(breedField)
  let s: number
  if (n === 0) s = 0
  else if (n <= 2) s = 4   // high specificity — e.g. Maine Coon for HCM
  else if (n <= 4) s = 2
  else if (n <= 7) s = 1
  else s = 0               // 8+ named breeds → not meaningfully predictive
  return named ? s : s / 2
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

// Explicit overrides for ids the regex heuristics below can't reliably place.
// Mostly DIS-BD-* (blood disorders): that id prefix alone spans nearly every
// aetiology category (inherited factor deficiencies, infectious, immune,
// toxic, vascular, neoplastic), so no single substring rule could bucket it —
// and several of these ids collide with substrings used by OTHER diseases'
// regex rules (e.g. bare `PV` would also match DIS-GI-FPV; bare `ICT` would
// also match DIS-OES-STRICT), so a loose new rule would misfile those too.
// An exact-id map has none of that collision risk and is easy to extend.
// Entries deliberately left OUT (not oversights): DIS-BD-IMHA/IMTP already
// resolve correctly through the existing /IMHA|IMT/ rule below; DIS-BD-TCP/
// TCS/NRA are genuinely multi-causal umbrella pages ('Thrombocytopenia' can
// be immune, infectious, neoplastic or marrow-primary) where 'Other' is the
// honest answer, not a gap.
const ID_CATEGORY_OVERRIDES: Record<string, string> = {
  'DIS-BD-FX': 'Congenital/Inherited',
  'DIS-BD-FII': 'Congenital/Inherited',
  'DIS-BD-FVII': 'Congenital/Inherited',
  'DIS-BD-FXII': 'Congenital/Inherited',
  'DIS-BD-HEMA': 'Congenital/Inherited',
  'DIS-BD-HEMB': 'Congenital/Inherited',
  'DIS-BD-HEMC': 'Congenital/Inherited',
  'DIS-BD-VWD': 'Congenital/Inherited',
  'DIS-BD-TPATH': 'Congenital/Inherited', // predominantly named inherited defects (Glanzmann, Bernard-Soulier, Chediak-Higashi…)
  'DIS-BD-EVANS': 'Immune-mediated', // combined IMHA + ITP
  'DIS-BD-VASC': 'Immune-mediated', // vasculitis — immune-complex reaction pattern, never primary
  'DIS-BD-APS': 'Immune-mediated', // antiphospholipid antibody syndrome
  'DIS-BD-ICT': 'Infectious', // Anaplasma platys (infectious cyclic thrombocytopenia)
  'DIS-BD-BABS': 'Infectious',
  'DIS-BD-EHRL': 'Infectious',
  'DIS-BD-ROD': 'Toxic', // anticoagulant rodenticide toxicosis
  'DIS-BD-ENV': 'Toxic', // snake/spider envenomation
  'DIS-BD-VITK': 'Metabolic', // nutritional/biliary vitamin K deficiency
  'DIS-BD-DIC': 'Vascular',
  'DIS-BD-CRGV': 'Vascular', // Alabama Rot — vascular endothelial injury
  'DIS-BD-VASCLH': 'Vascular',
  'DIS-BD-HYPERCOAG': 'Vascular', // would otherwise false-match the Endocrine /HYPER/ rule below
  'DIS-BD-PV': 'Neoplastic', // polycythaemia vera is a myeloproliferative neoplasm
}

// Infer category from disease id prefix when no explicit cat field
function inferCat(disease: DiseaseRow): string {
  const id = disease.id
  const override = ID_CATEGORY_OVERRIDES[id]
  if (override) return override
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

// ── Synonym expansion ─────────────────────────────────────────────────────────
// Each entry is a group of equivalent terms. Any keyword that matches one term
// in a group is expanded to all terms in that group before text matching.

const SYNONYM_GROUPS: string[][] = [
  // ── Spelling variants (US/UK) ─────────────────────────────────────────────
  ['diarrhea', 'diarrhoea'],
  ['anemia', 'anaemia'],
  ['dyspnea', 'dyspnoea'],
  ['edema', 'oedema'],
  ['esophagus', 'oesophagus'],
  ['feces', 'faeces'],
  ['fecal', 'faecal'],
  ['hematuria', 'haematuria'],
  ['hemorrhage', 'haemorrhage'],
  ['hematemesis', 'haematemesis'],
  ['hematochezia', 'haematochezia'],
  ['hemolytic', 'haemolytic'],
  ['leukemia', 'leukaemia'],
  ['leukocytosis', 'leucocytosis'],
  ['leukopenia', 'leucopenia'],
  ['color', 'colour'],
  ['tumor', 'tumour'],
  ['fiber', 'fibre'],
  ['gray', 'grey'],

  // ── GI signs ─────────────────────────────────────────────────────────────
  ['diarrhea', 'diarrhoea', 'loose stools', 'loose stool', 'soft stool', 'soft stools', 'runny stool', 'watery stool', 'liquid stool'],
  ['vomiting', 'vomit', 'throwing up', 'emesis', 'regurgitation', 'regurgitating'],
  ['blood in stool', 'melena', 'melaena', 'hematochezia', 'haematochezia', 'bloody stool', 'bloody diarrhea', 'bloody diarrhoea', 'haemorrhagic diarrhoea', 'hemorrhagic diarrhea', 'rectal bleeding'],
  ['vomiting blood', 'hematemesis', 'haematemesis', 'bloody vomit'],
  ['not eating', 'anorexia', 'hyporexia', 'inappetence', 'reduced appetite', 'loss of appetite', 'off food'],
  ['straining to defecate', 'tenesmus', 'constipation', 'straining', 'difficulty defecating'],
  ['difficulty swallowing', 'dysphagia', 'trouble swallowing', 'gagging', 'choking'],
  ['bloating', 'distension', 'abdominal distension', 'bloat', 'swollen belly', 'pot belly'],
  ['increased appetite', 'polyphagia', 'excessive hunger', 'ravenous'],
  ['weight loss', 'cachexia', 'muscle wasting', 'losing weight', 'thin', 'emaciation', 'emaciated'],
  ['weight gain', 'obesity', 'overweight'],

  // ── Respiratory signs ─────────────────────────────────────────────────────
  ['difficulty breathing', 'dyspnea', 'dyspnoea', 'respiratory distress', 'laboured breathing', 'labored breathing', 'shortness of breath', 'breathlessness', 'open mouth breathing'],
  ['coughing', 'cough', 'chronic cough', 'productive cough'],
  // Separate from the group above: "dry"/"unproductive" is a clinically
  // meaningful qualifier (airway irritation, cardiac/mediastinal compression,
  // early parasitic disease vs. an exudative/infectious productive cough), so
  // extracting it as its own keyword must still find pages phrased either way.
  // Terms drawn from how disease_page entries actually phrase it (DIS-RESP-
  // TRACOLL's "goose-honk cough", DIS-RESP-CIRD's "harsh/honking cough",
  // DIS-RESP-BRONCHITIS's "often dry/harsh") — "hacking"/"non-productive"
  // alone matched none of the corpus and were silently inert.
  ['dry cough', 'non-productive cough', 'nonproductive cough', 'unproductive cough', 'harsh cough', 'honking cough', 'goose-honk cough', 'goose honk cough'],
  ['noisy breathing', 'stertor', 'stridor', 'snoring', 'stertor/stridor'],
  ['nasal discharge', 'runny nose', 'rhinorrhea', 'rhinorrhoea', 'nasal drip'],
  ['sneezing', 'reverse sneeze', 'reverse sneezing'],

  // ── Cardiovascular / circulatory ──────────────────────────────────────────
  ['fast heart rate', 'tachycardia', 'rapid heart rate', 'racing heart'],
  ['slow heart rate', 'bradycardia', 'low heart rate'],
  ['heart murmur', 'murmur', 'cardiac murmur'],
  ['irregular heartbeat', 'arrhythmia', 'dysrhythmia', 'irregular pulse'],
  ['pale gums', 'pallor', 'pale mucous membranes', 'white gums', 'muddy gums', 'pale mm'],
  ['blue gums', 'cyanosis', 'cyanotic', 'purple gums'],
  ['yellow gums', 'jaundice', 'icterus', 'icteric', 'yellow skin', 'yellow eyes', 'yellow mucous membranes', 'yellowing'],
  ['collapse', 'syncope', 'fainting', 'faint', 'collapsed'],

  // ── Urinary signs ─────────────────────────────────────────────────────────
  ['blood in urine', 'hematuria', 'haematuria', 'bloody urine', 'pink urine', 'red urine'],
  ['excessive urination', 'polyuria', 'frequent urination', 'urinating a lot', 'pu', 'increased urine output'],
  ['excessive thirst', 'polydipsia', 'drinking a lot', 'increased thirst', 'pd', 'pu/pd'],
  ['straining to urinate', 'dysuria', 'stranguria', 'difficulty urinating', 'trouble urinating'],
  ['not urinating', 'anuria', 'oliguria', 'reduced urine', 'no urine'],
  ['urinary incontinence', 'leaking urine', 'incontinence'],

  // ── Neurological signs ────────────────────────────────────────────────────

  // Consciousness / mentation
  ['confusion', 'disorientation', 'disorientated', 'disoriented', 'mental dullness', 'obtunded', 'obtundation', 'dull', 'altered mentation', 'ams', 'altered mental status', 'decreased consciousness', 'depressed mentation', 'dull mentation'],
  ['stupor', 'semi-conscious', 'barely responsive', 'semi conscious'],
  ['coma', 'unconscious', 'loss of consciousness', 'unresponsive', 'comatose'],
  ['dementia', 'cognitive dysfunction', 'cds', 'cognitive decline', 'confusion in old age', 'senility', 'disoriented at night', 'memory loss', 'forgetfulness', 'night time waking', 'vocalising at night', 'vocalizing at night'],

  // Seizures
  ['seizure', 'seizures', 'epilepsy', 'convulsion', 'convulsions', 'fitting', 'fit', 'twitching', 'jerking', 'paddling', 'tonic clonic', 'grand mal', 'absence seizure', 'focal seizure', 'partial seizure', 'cluster seizures', 'status epilepticus', 'post ictal', 'postictal', 'lost consciousness', 'fell over and shook', 'shaking episode'],

  // Episodic / fluctuating
  ['waxing and waning', 'waxing/waning', 'wax and wane', 'episodic', 'intermittent', 'comes and goes', 'fluctuating', 'fluctuates', 'episodic weakness', 'episodic collapse', 'good days and bad days'],

  // Tremors / involuntary movements
  ['tremor', 'tremors', 'trembling', 'shaking', 'intention tremor', 'muscle tremor', 'whole body tremor', 'head tremor', 'intention tremors', 'myoclonus', 'muscle twitching', 'twitching', 'fasciculations', 'spasms', 'muscle spasm', 'rhythmic shaking', 'constant shaking', 'shaker dog', 'generalized tremor syndrome'],

  // Ataxia / incoordination
  ['wobbly', 'ataxia', 'ataxic', 'incoordination', 'incoordinate', 'unsteady', 'stumbling', 'staggering', 'loss of balance', 'hypermetria', 'dysmetria', 'goose stepping', 'cerebellar ataxia', 'vestibular ataxia', 'proprioceptive ataxia', 'drunk walking', 'falls over', 'falling over', 'cant balance', 'balance problems'],

  // Weakness / paresis
  ['weakness', 'paresis', 'weak', 'limb weakness', 'muscle weakness', 'tires easily', 'fatigues quickly', 'exercise intolerance'],
  ['hind limb weakness', 'hindlimb weakness', 'rear limb weakness', 'back leg weakness', 'paraparesis', 'pelvic limb weakness', 'weak back legs', 'wobbly back legs', 'back end weakness', 'weak hindquarters', 'dragging back end'],
  ['front limb weakness', 'forelimb weakness', 'thoracic limb weakness', 'weak front legs', 'monoparesis', 'tetraparesis', 'tetraparesis', 'all limb weakness', 'all four legs weak'],
  ['one sided weakness', 'hemiparesis', 'hemiplegia', 'one side weak', 'weak on one side', 'right side weak', 'left side weak'],

  // Paralysis / plegia
  ['paralysis', 'unable to walk', 'cant walk', 'knuckling', 'knuckling over', 'dragging legs', 'dragging paw'],
  ['hind limb paralysis', 'paraplegia', 'paralysed back legs', 'paralyzed back legs', 'unable to use back legs', 'pelvic limb paralysis', 'back end paralysis'],
  ['tetraplegia', 'all four legs paralysed', 'all four legs paralyzed', 'quadriplegia', 'unable to move legs'],
  ['monoplegia', 'one leg paralysed', 'one leg paralyzed', 'one limb affected'],

  // Vestibular / head tilt / nystagmus
  ['head tilt', 'vestibular', 'leaning', 'rolling', 'falling to one side', 'tilting head', 'head turn'],
  ['nystagmus', 'eye flicking', 'rapid eye movement', 'eyes moving rapidly', 'eye flickering', 'uncontrolled eye movement'],
  ['circling', 'circles', 'walking in circles', 'turning in circles', 'spinning', 'circling one direction'],
  ['peripheral vestibular', 'central vestibular', 'old dog vestibular', 'idiopathic vestibular', 'vestibular episode', 'geriatric vestibular'],

  // Spinal / neck / back pain
  ['neck pain', 'cervical pain', 'cervical hyperesthesia', 'reluctant to lower head', 'stiff neck', 'painful neck', 'crying when touched on neck', 'neck sensitivity', 'yelping when touching neck', 'holds head low'],
  ['back pain', 'spinal pain', 'thoracolumbar pain', 'lumbosacral pain', 'painful spine', 'hyperesthesia', 'allodynia', 'pain on spinal palpation', 'arched back', 'kyphosis', 'hunched back', 'sore back', 'yelping when touched on back', 'sensitive back', 'back sensitivity'],
  ['disc disease', 'ivdd', 'intervertebral disc', 'slipped disc', 'herniated disc', 'disc herniation', 'myelopathy', 'spinal cord compression', 'spinal cord disease', 'degenerative myelopathy', 'dm'],

  // Cranial nerve signs
  ['facial paralysis', 'facial nerve palsy', 'facial asymmetry', 'dropped lip', 'drooping lip', 'ear droop', 'unable to blink', 'lagophthalmos', 'crooked face', 'face drooping'],
  ['jaw drop', 'dropped jaw', 'unable to close mouth', 'trigeminal neuropathy', 'trigeminal neuritis', 'cant close mouth', 'open mouth'],
  ['tongue weakness', 'tongue atrophy', 'difficulty with tongue', 'hypoglossal', 'tongue hanging out'],
  ['laryngeal paralysis', 'laryngeal paresis', 'voice change', 'changed bark', 'hoarse bark', 'weak bark', 'roaring', 'lar par'],
  ['horner syndrome', 'horners syndrome', 'miosis', 'ptosis', 'enophthalmos', 'sunken eye', 'droopy eyelid', 'small pupil', 'third eyelid elevation', 'third eyelid showing horner'],

  // Proprioception
  ['knuckling', 'paw knuckling', 'dragging paw', 'slow placing', 'reduced proprioception', 'proprioceptive deficit', 'proprioception loss', 'upper motor neuron', 'umn signs', 'lower motor neuron', 'lmn signs', 'postural reaction deficit'],

  // Neuropathy
  ['neuropathy', 'neuropathic', 'peripheral neuropathy', 'polyneuropathy', 'nerve damage', 'nerve dysfunction', 'nerve pain', 'neuromuscular disease', 'polyneuritis'],

  // Raised ICP / brain signs
  ['increased intracranial pressure', 'icp', 'raised icp', 'brain swelling', 'papilloedema', 'papilledema', 'bradycardia and hypertension', 'cushing reflex'],
  ['encephalitis', 'brain inflammation', 'meningoencephalitis', 'meningitis', 'encephalopathy', 'hepatic encephalopathy', 'metabolic encephalopathy', 'brain disease'],

  // Blindness
  ['blindness', 'vision loss', 'blind', 'cannot see', 'cant see', 'loss of vision', 'sudden blindness', 'acute vision loss', 'navigating poorly', 'bumping into things', 'bumping into walls', 'visual deficit'],

  // ── Dermatological signs ──────────────────────────────────────────────────
  ['itchy', 'pruritus', 'pruritic', 'itching', 'scratching', 'rubbing'],
  ['hair loss', 'alopecia', 'bald patches', 'losing hair', 'thinning coat'],
  ['skin thickening', 'lichenification', 'hyperkeratosis', 'thickened skin'],
  ['skin redness', 'erythema', 'erythematous', 'red skin', 'inflamed skin'],
  ['lumps', 'nodules', 'mass', 'swelling', 'bumps', 'lump'],
  ['crusting', 'crusts', 'scabs', 'scaling', 'scales', 'flaky skin'],
  ['bruising', 'ecchymosis', 'ecchymoses', 'petechiae', 'bruises', 'purple spots', 'red spots'],

  // ── Musculoskeletal signs ─────────────────────────────────────────────────
  ['limping', 'lameness', 'lame', 'limping', 'favouring leg', 'favoring leg', 'not bearing weight'],
  ['joint swelling', 'arthritis', 'swollen joints', 'painful joints'],
  ['muscle wasting', 'atrophy', 'muscle loss', 'muscle atrophy'],
  ['stiff', 'stiffness', 'reluctant to move', 'difficulty rising', 'trouble getting up'],
  // How case notes phrase an abnormal stiff gait — none of these but the first
  // reached the pages that say "stiff gait" (hypoparathyroidism's tetany among
  // them). Kept apart from bare "stiff" above, which also hits "muscle
  // stiffness" and would credit every myopathy with explaining the gait.
  ['stiff gait', 'stiff hindlimb gait', 'stiff hind limb gait', 'stilted gait', 'stiff hindlimbs',
    'hindlimb stiffness', 'hindlimb gait abnormality', 'hind limb gait abnormality'],

  // ── Ophthalmic signs ─────────────────────────────────────────────────────
  ['red eye', 'conjunctivitis', 'conjunctival hyperemia', 'bloodshot eye', 'inflamed eye'],
  ['cloudy eye', 'opacity', 'cataract', 'corneal opacity', 'white eye', 'hazy eye'],
  ['discharge from eye', 'ocular discharge', 'eye discharge', 'weepy eye', 'watery eye', 'mucoid discharge'],
  ['unequal pupils', 'anisocoria', 'different pupil sizes', 'uneven pupils'],
  ['third eyelid', 'prolapsed nictitans', 'cherry eye', 'nictitating membrane'],

  // ── General / systemic signs ──────────────────────────────────────────────
  ['fever', 'pyrexia', 'high temperature', 'pyrexic', 'febrile', 'hyperthermia'],
  ['low body temperature', 'hypothermia', 'cold', 'temperature low'],
  ['lethargy', 'lethargic', 'tired', 'fatigue', 'exercise intolerance', 'weakness', 'low energy', 'dull'],
  ['fluid in abdomen', 'ascites', 'abdominal effusion', 'belly fluid', 'pot belly'],
  ['fluid in chest', 'pleural effusion', 'chest fluid', 'fluid around lungs'],
  ['nose bleed', 'epistaxis', 'nasal bleeding', 'bleeding from nose'],
  ['lymph node enlargement', 'lymphadenopathy', 'swollen lymph nodes', 'swollen glands'],
  ['liver enlargement', 'hepatomegaly', 'enlarged liver', 'big liver'],
  ['spleen enlargement', 'splenomegaly', 'enlarged spleen'],
  ['kidney failure', 'renal failure', 'renal insufficiency', 'ckd', 'aki', 'renal disease'],

  // ── Blood pressure / electrolytes ────────────────────────────────────────
  ['low blood pressure', 'hypotension', 'hypotensive'],
  ['high blood pressure', 'hypertension', 'hypertensive'],
  ['low potassium', 'hypokalemia', 'hypokalaemia', 'potassium low'],
  ['high potassium', 'hyperkalemia', 'hyperkalaemia', 'potassium high'],
  ['low sodium', 'hyponatremia', 'hyponatraemia', 'sodium low'],
  ['high sodium', 'hypernatremia', 'hypernatraemia', 'sodium high'],
  ['low calcium', 'hypocalcemia', 'hypocalcaemia', 'calcium low'],
  ['high calcium', 'hypercalcemia', 'hypercalcaemia', 'calcium high'],
  ['low blood sugar', 'hypoglycemia', 'hypoglycaemia', 'glucose low', 'low glucose'],
  ['high blood sugar', 'hyperglycemia', 'hyperglycaemia', 'glucose high', 'high glucose'],
  ['low albumin', 'hypoalbuminemia', 'hypoalbuminaemia', 'albumin low'],
  ['low protein', 'hypoproteinemia', 'hypoproteinaemia', 'protein losing'],
  ['low phosphorus', 'hypophosphatemia', 'hypophosphataemia', 'phosphorus low'],
  ['high phosphorus', 'hyperphosphatemia', 'hyperphosphataemia', 'phosphorus high'],

  // ── Haematology ───────────────────────────────────────────────────────────
  ['low red blood cells', 'anemia', 'anaemia', 'low pcv', 'low hematocrit', 'low haematocrit', 'low haemoglobin', 'low hemoglobin'],
  ['low platelets', 'thrombocytopenia', 'platelet low', 'low platelet count'],
  ['high white blood cells', 'leukocytosis', 'leucocytosis', 'wbc high', 'elevated wbc'],
  ['low white blood cells', 'leukopenia', 'leucopenia', 'wbc low', 'neutropenia'],
  ['clotting problem', 'coagulopathy', 'bleeding disorder', 'dic', 'prolonged clotting'],
]

// Build a map: normalised term → all synonyms in its group
const synonymMap = new Map<string, string[]>()
for (const group of SYNONYM_GROUPS) {
  for (const term of group) {
    synonymMap.set(synKey(term), group.map(t => t.toLowerCase()))
  }
}

// Separator spelling must not decide whether a term finds its synonym group.
// termRegex already treats "pu/pd", "pu-pd" and "pu / pd" as the same text, but
// the lookup here was exact, so only the one spelling that happened to be in
// SYNONYM_GROUPS expanded to polyuria/polydipsia — the other two silently
// searched for their own literal string and returned a shorter list.
function synKey(s: string): string {
  return s.toLowerCase().trim().replace(/[\s\-/]+/g, ' ')
}

/** Expand a keyword to include all its synonyms (including itself). */
function expandKeyword(kw: string): string[] {
  return synonymMap.get(synKey(kw)) ?? [kw.toLowerCase()]
}

// ── Text matching helper ──────────────────────────────────────────────────────

// The two input boxes read different halves of a disease page. Named once, so
// the suggestion counts below cannot drift from what the search actually
// matches — a dropdown promising "12 diseases" that then returns 4 is worse
// than no dropdown.
const SIGN_FIELDS = ['signs', 'severe', 'synonyms', 'path', 'etiology'] as const
const DIAG_FIELDS = ['conf', 'supp'] as const

/** Hard species filter — shared by the search and the suggestion counts. */
function coversSpecies(d: DiseaseRow, species: Species): boolean {
  if (species === 'all') return true
  return ((d.sp as string) ?? '').toLowerCase().includes(species)
}

function fieldText(d: DiseaseRow, ...keys: string[]): string {
  return keys.map(k => (d[k] as string | undefined) ?? '').join(' ').toLowerCase()
}

// Whole-term matching. A plain `text.includes(term)` is catastrophic on a short
// clinical abbreviation: "uti" matched `calcinosis cutis`, `caution` and
// `routine` (43 of 389 pages, only 9 of them real), and "pu" matched `puppy`,
// `pupil` and `pulmonary` (214 of 389). Every one of those spurious hits scored
// the same as a genuine one, which is how a phantom "uti" on the feline
// hyperadrenocorticism page outranked diabetes mellitus on a classic DM history.
//
// The term is anchored at both ends against non-alphanumerics, and any run of
// space / hyphen / slash inside it matches any such run in the text, so "pu/pd"
// also matches "pu / pd" and "pu-pd", and "weight loss" matches "weight-loss".
//
// Deliberately NOT a lookbehind: iOS Safari only gained those in 16.4, and this
// is a phone-first app.
const rxCache = new Map<string, RegExp>()
const NEVER = /(?!)/

function termRegex(term: string): RegExp {
  let r = rxCache.get(term)
  if (!r) {
    const body = term
      .split(/[\s\-/]+/)
      .filter(Boolean)
      .map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('[\\s\\-/]+')
    r = body ? new RegExp(`(^|[^a-z0-9])${body}($|[^a-z0-9])`, 'i') : NEVER
    rxCache.set(term, r)
  }
  return r
}

function keywordHits(text: string, keywords: string[]): string[] {
  const matched: string[] = []
  for (const kw of keywords) {
    if (kw.length < 2) continue
    const expanded = expandKeyword(kw)
    if (expanded.some(term => termRegex(term).test(text))) matched.push(kw)
  }
  return matched
}

// ── Sex / neuter keywords ─────────────────────────────────────────────────────
// \bmale\b deliberately does not match "female" (word boundary fails mid-word).

const SEX_KEYWORDS: Record<SexFilter, RegExp> = {
  male:   /\bmales?\b|castrat/i,
  female: /\bfemales?\b|spay|bitch|queen/i,
}

const NEUTER_KEYWORDS: Record<NeuterFilter, RegExp> = {
  intact:   /intact|entire/i,
  neutered: /neuter|spay|castrat|desex/i,
}

// ── Sex-organ plausibility ────────────────────────────────────────────────────
// Sex and neuter status above are only a bonus, so on their own they never stop
// a page the patient cannot have: prostatitis used to rank for a spayed bitch.
// This table is the hard filter, keyed by page id because the `sex` field is
// prose ("Entire (intact) male dogs; extremely rare in cats") and parsing it for
// an exclusion would be one rewording away from silently failing open.
//
// Two strengths, matching how certain the biology is:
//   `requires` — the organ only exists in that sex. Hard exclude otherwise.
//   a note     — possible but needs an unusual circumstance. The page stays on
//                the list (evidence still decides inclusion), its ranking score
//                is cut by NOTE_FACTOR, and the note says why, so the clinician
//                sees a stump pyometra candidate as exactly that.
//
// Calls deliberately NOT made:
//   • Mammary tumours are not excluded for males — male dogs and cats have
//     mammary tissue and do get them, rarely.
//   • Prostatitis and prostatic carcinoma are not touched by castration — the
//     prostate is atrophied, not removed, and carcinoma is MORE common in
//     castrated dogs (Ettinger Ch 314).
//   • Pyometra in a spayed female is a note, not an exclusion: stump pyometra
//     needs an ovarian remnant, and the page describes the entire-female form.
//
// No page exists yet for testicular, ovarian or uterine neoplasia, eclampsia or
// dystocia. When one is added it must be classified here — the guard test in
// diseaseSearch.test.ts fails on any reproductive-organ page missing from this
// table (or from its NO_SEX_RULE allowlist).
export interface SexOrganRule {
  /** The organ exists only in this sex — any other recorded sex is excluded. */
  requires?: SexFilter
  /** The patient is neutered: possible only in an unusual circumstance. */
  neuteredNote?: string
  /** The patient is male: possible but rare. */
  maleNote?: string
}

export const SEX_ORGAN_RULES: Record<string, SexOrganRule> = {
  'DIS-REPRO-PYO': {
    requires: 'female',
    neuteredNote: 'Spayed — only as stump pyometra, which needs an ovarian remnant',
  },
  'DIS-URO-PROSTATITIS': { requires: 'male' },
  'DIS-URO-PROST-NEO': { requires: 'male' },
  'DIS-URO-BPH': {
    requires: 'male',
    neuteredNote: 'Castrated — BPH is androgen-dependent and regresses within 7–14 d of castration',
  },
  'DIS-NEO-MGT': { maleNote: 'Male — mammary tumours occur but are rare' },
}

/** Ranking multiplier for a page that carries a signalment note. */
const NOTE_FACTOR = 0.25

/**
 * `null` when the page is impossible for this signalment; otherwise the
 * caveat (if any) that applies. Unknown sex or neuter status never excludes.
 */
function sexPlausibility(id: string, sex?: SexFilter, neuter?: NeuterFilter): { note?: string } | null {
  const rule = SEX_ORGAN_RULES[id]
  if (!rule) return {}
  if (rule.requires && sex && sex !== rule.requires) return null
  if (neuter === 'neutered' && rule.neuteredNote) return { note: rule.neuteredNote }
  if (sex === 'male' && rule.maleNote) return { note: rule.maleNote }
  return {}
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface SearchCategory {
  name: string
  items: DiseaseResult[]
}

// ── Term suggestions (typeahead) ──────────────────────────────────────────────
//
// The sign box was free text against a vocabulary the reader cannot see, so a
// term the engine knows ("polyphagia") and one it does not ("eating more") look
// identical while typing and differ completely in result. These suggestions are
// drawn from SYNONYM_GROUPS — the terms that actually expand — and each carries
// the number of pages it would match, which is the thing a clinician wants:
// `lethargy` hits 78 of 303 cat pages and `polyphagia` hits 7, and the second is
// worth far more. Free text still works; this only makes the vocabulary visible.

export interface TermSuggestion {
  /** The term added to the query when this row is chosen. */
  term: string
  /** How many disease pages it would match, under the current species filter. */
  count: number
  /** A couple of other terms the same search covers, for the hint line. */
  alsoCovers: string[]
}

/** Flat vocabulary: every synonym term, tagged with the group it belongs to. */
const VOCAB: { term: string; group: number }[] = SYNONYM_GROUPS.flatMap((g, i) =>
  g.map(t => ({ term: t.toLowerCase(), group: i })),
)

// Building the corpus is 389 field joins; the dropdown re-runs on every
// keystroke, so it is cached per species rather than rebuilt each time.
const signCorpusCache = new Map<Species, string[]>()
function signCorpus(species: Species): string[] {
  let c = signCorpusCache.get(species)
  if (!c) {
    c = DB.disease_page.filter(d => coversSpecies(d, species)).map(d => fieldText(d, ...SIGN_FIELDS))
    signCorpusCache.set(species, c)
  }
  return c
}

// Collapses the variants of one word to a single key, so a hint line cannot
// spend both its slots saying the same thing twice: UK/US spelling
// (diarrhoea/diarrhea, dyspnoea/dyspnea) and plural (seizure/seizures).
function spellingKey(t: string): string {
  return t.replace(/ae|oe/g, 'e').replace(/s$/, '')
}

/** Lower sorts first: exact, prefix, word-start, then anywhere. */
function matchRank(term: string, q: string): number {
  if (term === q) return 0
  if (term.startsWith(q)) return 1
  return new RegExp(`[\\s\\-/]${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(term) ? 2 : 3
}

/**
 * Vocabulary terms matching what has been typed so far, best first.
 *
 * One row per synonym group: "polyuria" and "excessive urination" are the same
 * search, so offering both is noise — the row shows whichever spelling the
 * reader was typing toward, and names the rest on its hint line. Terms matching
 * nothing under the current species are dropped rather than shown as zero.
 */
export function suggestSignTerms(
  query: string,
  opts: { species: Species; exclude?: string[]; limit?: number } = { species: 'all' },
): TermSuggestion[] {
  const q = synKey(query)
  if (q.length < 2) return []

  const excluded = new Set((opts.exclude ?? []).map(synKey))
  const limit = opts.limit ?? 8

  const corpus = signCorpus(opts.species)
  /** How many pages carry this exact spelling — used only to break ties. */
  const presence = (t: string) => {
    const r = termRegex(t)
    return corpus.reduce((n, text) => n + (r.test(text) ? 1 : 0), 0)
  }

  // Best row per group. Where several spellings tie on rank, the one the corpus
  // actually uses wins: this content is written in UK spelling, so a query of
  // "di" should offer `diarrhoea` and not the `diarrhea` that shares its group
  // and is one character shorter.
  const best = new Map<number, { term: string; rank: number }>()
  for (const { term, group } of VOCAB) {
    if (!term.includes(q) || excluded.has(synKey(term))) continue
    const rank = matchRank(term, q)
    const cur = best.get(group)
    if (!cur || rank < cur.rank) { best.set(group, { term, rank }); continue }
    if (rank > cur.rank) continue
    const [p, c] = [presence(term), presence(cur.term)]
    if (p > c || (p === c && term.length < cur.term.length)) best.set(group, { term, rank })
  }

  const ordered = [...best.entries()]
    .sort(([, a], [, b]) => a.rank - b.rank || a.term.length - b.term.length || a.term.localeCompare(b.term))

  // A term can sit in two groups — "twitching" is in both the seizure and the
  // tremor group — and one dropdown must not print it twice.
  const shown = new Set<string>()
  const out: TermSuggestion[] = []
  for (const [group, { term }] of ordered) {
    if (out.length >= limit) break
    if (shown.has(term)) continue
    shown.add(term)
    const rx = SYNONYM_GROUPS[group].map(t => termRegex(t))
    const count = corpus.reduce((n, text) => n + (rx.some(r => r.test(text)) ? 1 : 0), 0)
    if (count === 0) continue
    // The hint names other things this search covers, so it must not list
    // near-duplicates of the term itself ("polyuria" → "polyuria/polydipsia")
    // nor the same word twice in two spellings ("dyspnoea" and "dyspnea").
    const seen = new Set([spellingKey(term)])
    const alsoCovers: string[] = []
    for (const raw of SYNONYM_GROUPS[group]) {
      if (alsoCovers.length >= 2) break
      const t = raw.toLowerCase()
      if (t === term || t.includes(term) || term.includes(t)) continue
      const k = spellingKey(t)
      if (seen.has(k)) continue
      seen.add(k)
      alsoCovers.push(t)
    }
    out.push({ term, count, alsoCovers })
  }
  return out
}

/** Smallest weight any matched term can carry — see the IDF note in searchDiseases. */
const IDF_FLOOR = 0.5

// ── Problem-list tiers (see SearchInputs.termTiers) ──
// Multipliers on a term's IDF weight. A key problem is what the diagnosis has
// to explain; a secondary finding is most likely a consequence of one (CK
// after seizures), so it says little about the cause and must not outvote the
// problems — on the motivating case, a mild CK and a 6.1 mmol/L glucose ranked
// rhabdomyolysis and diabetes above the hypocalcaemia + hyperphosphataemia
// that pointed at hypoparathyroidism.
const KEY_WEIGHT = 2
const SECONDARY_WEIGHT = 0.25
/** A page matching every component of a pattern earns this share of those
 *  components' weight again — the combination is the clue, not each part. */
const PATTERN_BONUS = 0.5
/** Share of a page's keyword score lost when it explains NONE of the key
 *  problems; scales linearly to nothing lost when it explains them all. Two
 *  pages can match the same lab pattern (rhabdomyolysis and
 *  hypoparathyroidism both list hypocalcaemia + hyperphosphataemia) — the
 *  one that also explains the stiff gait is the better diagnosis. */
const KEY_COVERAGE_PENALTY = 0.5

const round1 = (n: number) => Math.round(n * 10) / 10

/**
 * The highest-scoring differentials across every category.
 *
 * The grouped view orders by aetiology (CAT_ORDER), so Endocrine renders sixth
 * of ten and the single best match on a classic endocrine history sits below the
 * fold. This flattens the groups back into one globally ranked list for the
 * summary row at the top of the screen.
 */
export function topDifferentials(groups: SearchCategory[], n = 5): DiseaseResult[] {
  return groups
    .flatMap(g => g.items)
    .sort((a, b) => b.score - a.score || (a.disease.name as string).localeCompare(b.disease.name as string))
    .slice(0, n)
}

/**
 * Like `topDifferentials`, but reserves part of the list for breadth across
 * aetiology categories instead of a pure global top-N by score.
 *
 * A pure score cutoff lets one dominant mechanism (e.g. several structural GI
 * causes of haematemesis, all scoring high on the same specific signs) fill
 * every slot and crowd out a real but less-specific-scoring differential from
 * another category — a toxic, infectious or parasitic cause that fits the
 * history just as legitimately but only matches on commoner, lower-weighted
 * terms. Four passes:
 *
 *   1. The top `guaranteedTop` candidates by pure score, regardless of
 *      category — the best-evidenced differentials are never bumped by the
 *      breadth pass, so a well-supported common cause can't be pushed out by
 *      a weakly-matched rare one.
 *   2. A "near-tie companion" for each category a step 1 pick already
 *      landed in: its own next-best, not-yet-picked item, but ONLY if that
 *      item scores within `closeRatio` of the category's best picked score
 *      (one companion per category). Two genuinely close-scoring but
 *      clinically distinct differentials sharing a broad category — e.g. two
 *      different rodenticide classes both filed under "Toxic," each needing
 *      its own confirmatory test — are co-equal evidence, not a winner and a
 *      loser, and the single-seat-per-category rule below would otherwise
 *      silently drop whichever one scored a fraction lower.
 *   3. One further candidate (its own best-scoring, not yet picked) from
 *      every OTHER category that has any match at all, strongest category
 *      first — "expand to the less likely differentials" instead of only the
 *      single most obvious reading of the case.
 *   4. Any slots still unfilled, by pure score among what's left.
 *
 * The final list is re-sorted by score (so `buildCaseLanes`, which derives
 * category display order from each category's best-ranked member, still
 * shows the likeliest category first); diversity changes WHICH candidates are
 * included, not their display order.
 */
export function diverseDifferentials(
  groups: SearchCategory[],
  n = 8,
  guaranteedTop = Math.ceil(n / 2),
  closeRatio = 0.8,
): DiseaseResult[] {
  const byScore = (a: DiseaseResult, b: DiseaseResult) =>
    b.score - a.score || (a.disease.name as string).localeCompare(b.disease.name as string)
  const all = groups.flatMap(g => g.items).sort(byScore)

  const picked: DiseaseResult[] = []
  const pickedIds = new Set<string>()
  const take = (item: DiseaseResult) => { picked.push(item); pickedIds.add(item.disease.id as string) }

  for (const item of all) {
    if (picked.length >= Math.min(guaranteedTop, n)) break
    take(item)
  }

  // Near-tie companions: evaluated against step 1's picks only (not chained
  // through companions already added this pass), then added strongest-first
  // so a tight scramble for the last slot still favours the closest ties.
  const companions = groups
    .map(g => {
      const bestPicked = picked.find(p => p.category === g.name)
      if (!bestPicked) return null
      return g.items.find(it => !pickedIds.has(it.disease.id) && it.score >= bestPicked.score * closeRatio) ?? null
    })
    .filter((c): c is DiseaseResult => c !== null)
    .sort(byScore)
  for (const c of companions) {
    if (picked.length >= n) break
    take(c)
  }

  const representedCats = new Set(picked.map(p => p.category))
  for (const g of [...groups].sort((a, b) => (b.items[0]?.score ?? 0) - (a.items[0]?.score ?? 0))) {
    if (picked.length >= n) break
    if (representedCats.has(g.name)) continue
    const next = g.items.find(it => !pickedIds.has(it.disease.id))
    if (next) { take(next); representedCats.add(g.name) }
  }

  for (const item of all) {
    if (picked.length >= n) break
    if (pickedIds.has(item.disease.id as string)) continue
    take(item)
  }

  return picked.sort(byScore)
}

export function searchDiseases(inputs: SearchInputs): SearchCategory[] {
  const { species, breedQuery, ageCategory, sex, neuter, signKeywords, diagKeywords } = inputs

  const hasSignalment = breedQuery.trim() || ageCategory || sex || neuter
  const hasKeywords = signKeywords.length > 0 || diagKeywords.length > 0

  if (!hasSignalment && !hasKeywords) return []

  // ── Pass 1: species filter, then match every keyword once ──
  // The match result is kept so pass 2 can score without re-running the regexes,
  // and the document frequencies are accumulated on the way through.
  const candidates: {
    d: DiseaseRow
    signHits: string[]
    diagHits: string[]
  }[] = []
  const signDf = new Map<string, number>()
  const diagDf = new Map<string, number>()

  for (const d of DB.disease_page) {
    if (!coversSpecies(d, species)) continue // hard exclude
    if (!sexPlausibility(d.id as string, sex, neuter)) continue // hard exclude

    const signHits = keywordHits(fieldText(d, ...SIGN_FIELDS), signKeywords)
    const diagHits = keywordHits(fieldText(d, ...DIAG_FIELDS), diagKeywords)
    for (const t of signHits) signDf.set(t, (signDf.get(t) ?? 0) + 1)
    for (const t of diagHits) diagDf.set(t, (diagDf.get(t) ?? 0) + 1)
    candidates.push({ d, signHits, diagHits })
  }

  // ── Term weights: inverse document frequency over the filtered corpus ──
  // A flat 2 points per matched term let a disease win by matching MORE terms
  // rather than better ones. Across the 303 cat pages `lethargy` appears in 78
  // and `polyphagia` in 7 — polyphagia is an order of magnitude more
  // discriminating and used to be worth exactly the same. Weighting by log(N/df)
  // makes a common sign cheap and a rare one decisive, and it derives entirely
  // from the corpus, so it needs no authoring on the 389 disease pages.
  //
  // The floor keeps a near-universal sign (df → N, where the raw weight goes to
  // zero or negative) worth a token amount rather than silently free.
  const N = candidates.length
  const idf = (df: number) => Math.max(IDF_FLOOR, Math.log(N / (1 + df)))
  // Problem-list tiers: a pattern's components count as key problems.
  const tierKey = (t: string) => t.trim().toLowerCase()
  const patterns = (inputs.termTiers?.patterns ?? [])
    .map(p => [...new Set(p.map(tierKey))])
    .filter(p => p.length >= 2)
  const keyTerms = new Set([...(inputs.termTiers?.key ?? []).map(tierKey), ...patterns.flat()])
  const secondaryTerms = new Set((inputs.termTiers?.secondary ?? []).map(tierKey).filter(t => !keyTerms.has(t)))
  const patternTerms = new Set(patterns.flat())
  const keyProblemCount = [...keyTerms].filter(t => !patternTerms.has(t)).length + patterns.length
  const tierWeight = (t: string) =>
    keyTerms.has(tierKey(t)) ? KEY_WEIGHT : secondaryTerms.has(tierKey(t)) ? SECONDARY_WEIGHT : 1

  const weigh = (terms: string[], df: Map<string, number>) =>
    terms.reduce((sum, t) => sum + idf(df.get(t) ?? 0) * tierWeight(t), 0)

  const results: DiseaseResult[] = []

  for (const { d, signHits, diagHits } of candidates) {
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

    // ── Sex + neuter status (independent dimensions, 2 points each) ──
    let sxScore = 0
    if (sex || neuter) {
      const sexText = ((d.sex as string | undefined) ?? '').toLowerCase()
      if (sexText && !/no sex|no\s+strong sex|either sex|any sex/i.test(sexText)) {
        if (sex === 'male' && SEX_KEYWORDS.male.test(sexText)) sxScore += 2
        if (sex === 'female' && SEX_KEYWORDS.female.test(sexText)) sxScore += 2
        // strip "unneutered"/"unspayed" so they don't read as neutered
        const neuterText = sexText.replace(/un-?\s*(neutered|spayed|desexed)/g, 'intact')
        if (neuter === 'intact' && NEUTER_KEYWORDS.intact.test(neuterText)) sxScore += 2
        if (neuter === 'neutered' && NEUTER_KEYWORDS.neutered.test(neuterText)) sxScore += 2
      }
    }

    // ── Clinical signs + diagnostics (IDF-weighted) ──
    const matchedSignTerms = signHits
    const signScore = weigh(matchedSignTerms, signDf)
    const matchedDiagTerms = diagHits
    const diagScore = weigh(matchedDiagTerms, diagDf)

    // ── Pattern bonus: every component of a pattern matched on this page ──
    // A component may sit in either keyword list; it is weighed by whichever
    // list(s) it hit in, exactly as above.
    const contribution = new Map<string, number>()
    const addContribution = (terms: string[], df: Map<string, number>) => {
      for (const t of terms) {
        const k = tierKey(t)
        contribution.set(k, (contribution.get(k) ?? 0) + idf(df.get(t) ?? 0) * tierWeight(t))
      }
    }
    addContribution(matchedSignTerms, signDf)
    addContribution(matchedDiagTerms, diagDf)
    let patternScore = 0
    for (const p of patterns) {
      if (p.every(t => contribution.has(t))) {
        patternScore += PATTERN_BONUS * p.reduce((sum, t) => sum + contribution.get(t)!, 0)
      }
    }

    // ── Key-problem coverage: how much of the problem list this page explains ──
    // Each pattern is one problem (partly explained by a partial match); every
    // other key term is one problem.
    const coverage = keyProblemCount === 0 ? 1
      : ([...keyTerms].filter(t => !patternTerms.has(t) && contribution.has(t)).length
        + patterns.reduce((sum, p) => sum + p.filter(t => contribution.has(t)).length / p.length, 0))
        / keyProblemCount
    const coverageFactor = 1 - KEY_COVERAGE_PENALTY * (1 - coverage)

    // How well the history fits, before prevalence is considered at all.
    const evidence = bScore + aScore + sxScore + (signScore + diagScore + patternScore) * coverageFactor

    // Must have at least one keyword hit if keywords were provided,
    // or at least some signalment match if only signalment provided.
    //
    // Both tests read the EVIDENCE score, never the prevalence-adjusted one, so
    // the prior can reorder the differential list but can never shorten it — a
    // rare disease that fits the history is always still on it.
    if (hasKeywords && matchedSignTerms.length === 0 && matchedDiagTerms.length === 0) continue
    if (!hasKeywords && evidence === 0) continue
    // A secondary finding is explained by a key problem, so on its own it
    // nominates nothing — CK after seizures must not list every myopathy.
    if (secondaryTerms.size > 0
      && [...matchedSignTerms, ...matchedDiagTerms].every(t => secondaryTerms.has(tierKey(t)))) continue

    // ── Species prevalence (ranking only) ──
    const prev = prevalenceFactor(d.id as string, species)
    const signalmentNote = sexPlausibility(d.id as string, sex, neuter)?.note
    const score = round1(evidence * prev * (signalmentNote ? NOTE_FACTOR : 1))

    const rawCat = (d['cat'] as string | undefined) ?? inferCat(d)
    results.push({
      disease: d,
      score,
      evidence: round1(evidence),
      prevalence: prev,
      breakdown: {
        breed: bScore,
        age: aScore,
        sex: sxScore,
        signs: round1(signScore),
        diag: round1(diagScore),
        pattern: round1(patternScore),
        keyCoverage: Math.round(coverage * 100) / 100,
      },
      matchedSignTerms,
      matchedDiagTerms,
      category: normCat(rawCat),
      ...(signalmentNote && { signalmentNote }),
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
