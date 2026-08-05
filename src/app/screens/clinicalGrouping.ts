// Auto-categorises clinical prose into labelled groups AT RENDER TIME.
//
// Two long fields on every disease page read as an undifferentiated wall of
// text: `signs` (a run-on list of clinical signs) and `supp` (supportive
// diagnostics, a run-on list of tests). Both are far easier to scan grouped —
// signs by body system, diagnostics by test modality.
//
// Doing that by hand would mean re-authoring 200+ rows in db.ts, so this module
// derives the grouping from the text itself: split the field into items,
// classify each item against a keyword lexicon, and emit the SAME pipe-markup
// (`#Header|item|item`) an author would have written by hand. The renderer is
// unchanged — <Bul> already knows how to draw `#` headers.
//
// Authored grouping always wins: a field that already contains `#` headers is
// returned untouched. The classifier is deliberately conservative — when it
// can't confidently place enough of the items it returns null and the caller
// falls back to the flat rendering, so a page is never grouped misleadingly.
//
// To extend: add terms to the lexicons below and re-run `npm run report:groups`,
// which prints coverage across the whole DB plus the items nothing matched.

import { splitPearl } from './pearlSplit'

export type GroupKind = 'signs' | 'diagnostics'

/** A term carries weight 3 when listed in `strong` (it names the category
 *  outright — "urinalysis", "radiographs") and weight 1 in `terms` (merely
 *  suggestive — "cortisol", "culture"). Highest total score claims the item,
 *  ties broken by the order groups are declared in. */
interface GroupDef {
  label: string
  strong?: string[]
  terms: string[]
}

const STRONG_WEIGHT = 3

// ─── Diagnostics: grouped by test modality ────────────────────────────────
// Ordered least- to most-invasive, which is also the order a workup runs in.
const DIAGNOSTIC_GROUPS: GroupDef[] = [
  {
    label: 'Bloods',
    strong: [
      'haematology', 'hematology', 'biochemistry', 'biochemical', 'CBC', 'complete blood count',
      'blood gas', 'blood smear', 'blood culture', 'blood type', 'crossmatch', 'serum',
      'coagulation', 'chemistry panel', 'renal panel', 'liver panel', 'thyroid panel',
    ],
    terms: [
      'PCV', 'TS', 'packed cell volume', 'lactate', 'electrolytes', 'PT', 'aPTT', 'D-dimer',
      'fibrinogen', 'platelet count', 'reticulocyte', 'haematocrit', 'buffy coat',
      'T4', 'fT4', 'TSH', 'cortisol', 'ACTH', 'insulin', 'fructosamine', 'SDMA', 'creatinine',
      'urea', 'bile acids', 'ammonia', 'cPLI', 'fPLI', 'cPL', 'fPL', 'cTLI', 'TLI',
      'B12', 'cobalamin', 'folate', 'triglycerides', 'cholesterol', 'NT-proBNP', 'proBNP',
      'troponin', 'creatine kinase', 'CK', 'ALT', 'ALP', 'AST', 'GGT', 'bilirubin', 'albumin',
      'globulin', 'glucose', 'ionised calcium', 'ionized calcium', 'calcium', 'phosphate',
      'potassium', 'sodium', 'magnesium', 'PTH', 'progesterone', 'ketones',
      'serology', 'titre', 'titer', 'antibody', 'FeLV', 'FIV', 'SNAP', '4Dx',
      'leucogram', 'leukogram', 'anaemia', 'azotaemia', 'acid-base', 'acid base',
      'thrombocytopenia', 'ATIII', 'endocrine testing', 'thyroid testing', 'blood profile',
    ],
  },
  {
    label: 'Urine',
    strong: ['urinalysis', 'urine', 'USG', 'urine specific gravity', 'UPC', 'urinary'],
    terms: ['sediment', 'protein:creatinine', 'cystocentesis', 'proteinuria', 'glucosuria', 'ketonuria'],
  },
  {
    label: 'Imaging',
    strong: [
      'radiograph', 'radiographs', 'radiography', 'x-ray', 'CXR', 'ultrasound', 'ultrasonography',
      'echocardiography', 'echocardiogram', 'CT', 'computed tomography', 'MRI', 'magnetic resonance',
      'fluoroscopy', 'scintigraphy', 'myelography', 'imaging', 'AFAST', 'TFAST', 'POCUS',
    ],
    terms: ['echo', 'barium', 'contrast study', 'oesophagram', 'esophagram', 'swallow study', 'radiology'],
  },
  {
    label: 'Sampling & cytology',
    strong: [
      // "aspirate" only — bare "aspiration" would claim "aspiration pneumonia",
      // which is a radiographic finding, not a sampling technique.
      'cytology', 'biopsy', 'histopathology', 'histology', 'FNA', 'fine-needle', 'fine needle',
      'aspirate', 'CSF', 'cerebrospinal', 'fluid analysis', 'effusion analysis',
      'abdominocentesis', 'thoracocentesis', 'arthrocentesis', 'bronchoalveolar', 'BAL',
      'tracheal wash', 'endoscopy', 'gastroscopy', 'colonoscopy', 'rhinoscopy', 'bronchoscopy',
      'bone marrow',
    ],
    terms: [
      'culture', 'sensitivity', 'susceptibility', 'PCR', 'faecal', 'fecal', 'flotation',
      'Baermann', 'swab', 'skin scrape', 'impression smear', 'smear', 'antigen test', 'ELISA',
      'laparotomy', 'laparoscopy', 'exploratory',
    ],
  },
  {
    label: 'Bedside tests',
    strong: [
      'ECG', 'electrocardiogram', 'Holter', 'blood pressure', 'pulse oximetry', 'capnography',
      'Schirmer', 'STT', 'fluorescein', 'tonometry', 'otoscopy', 'fundic', 'ophthalmoscopy',
      'ophthalmic examination', 'BAER', 'EMG', 'electromyography', 'nerve conduction',
    ],
    terms: [
      'systolic', 'SpO2', 'IOP', 'neurological examination', 'neurologic examination',
      'orthopaedic examination', 'rectal examination', 'otic examination', 'body weight', 'mMGCS',
      'electrodiagnostic', 'neurological grade', 'triage',
    ],
  },
  {
    // Supportive-diagnostics fields routinely carry reasoning steps rather than
    // tests ("rule out X first", "full dietary history") — a category of its own.
    label: 'Rule-outs & history',
    strong: ['dietary history', 'diet history', 'drug history', 'travel history', 'vaccination history', 'dietary trial', 'diet trial'],
    terms: [
      'rule out', 'rule-out', 'exclude', 'excluding', 'screen for', 'investigate',
      'assess for', 'consider', 'differentiate', 'history', 'staging', 'trial',
    ],
  },
]

// ─── Signs: grouped by body system ────────────────────────────────────────
const SIGN_GROUPS: GroupDef[] = [
  {
    label: 'Systemic',
    strong: [
      'lethargy', 'lethargic', 'pyrexia', 'fever', 'hypothermia', 'hyperthermia', 'weight loss',
      'weight gain', 'anorexia', 'anorexic', 'inappetence', 'hyporexia', 'polyphagia',
      'exercise intolerance', 'dehydration', 'cachexia', 'failure to thrive',
    ],
    terms: [
      'depression', 'depressed', 'malaise', 'appetite', 'collapse', 'weakness', 'weak', 'fatigue',
      'poor body condition', 'body condition', 'obesity', 'reduced activity', 'hiding',
      'subclinical', 'unwell', 'shock', 'restlessness',
    ],
  },
  {
    label: 'Cardiovascular',
    strong: [
      'murmur', 'gallop', 'arrhythmia', 'tachycardia', 'bradycardia', 'syncope', 'syncopal',
      'pulse deficit', 'weak pulses', 'femoral pulse', 'jugular distension', 'jugular pulse',
      'pale mucous membranes', 'prolonged CRT', 'capillary refill',
    ],
    terms: ['hypotension', 'hypertension', 'hypoperfusion', 'perfusion', 'pulse quality', 'thrill', 'oedema'],
  },
  {
    label: 'Respiratory',
    strong: [
      'cough', 'coughing', 'dyspnoea', 'dyspnea', 'tachypnoea', 'tachypnea', 'respiratory distress',
      'respiratory effort', 'panting', 'stertor', 'stridor', 'sneezing', 'nasal discharge',
      'wheeze', 'crackles', 'orthopnoea', 'open-mouth breathing', 'cyanosis', 'haemoptysis',
    ],
    terms: ['nasal', 'epistaxis', 'reverse sneez', 'gagging', 'dysphonia', 'bark', 'muffled', 'lung sounds'],
  },
  {
    label: 'Oral & dental',
    strong: [
      'gingivitis', 'gingival', 'gingiva', 'stomatitis', 'periodontal', 'dental', 'calculus',
      'oral mass', 'oral ulceration', 'loose teeth', 'mobile teeth', 'tooth resorption',
    ],
    terms: ['teeth', 'tooth', 'mouth', 'oral', 'halitosis', 'jaw', 'drooling', 'chew'],
  },
  {
    label: 'Gastrointestinal',
    strong: [
      'vomiting', 'vomitus', 'haematemesis', 'hematemesis', 'regurgitation', 'diarrhoea', 'diarrhea',
      'melaena', 'melena', 'haematochezia', 'hematochezia', 'tenesmus', 'constipation', 'obstipation',
      'dyschezia', 'abdominal pain', 'abdominal distension', 'ascites', 'hepatomegaly',
      'ptyalism', 'hypersalivation', 'dysphagia', 'icterus', 'jaundice', 'steatorrhoea', 'steatorrhea',
    ],
    terms: [
      'nausea', 'retching', 'borborygmi', 'flatulence', 'abdomen', 'abdominal',
      'pot-belly', 'pendulous', 'splenomegaly', 'odynophagia', 'faecal incontinence',
      'mucus', 'faeces', 'stool', 'defaecation', 'bowel',
    ],
  },
  {
    label: 'Urogenital',
    strong: [
      'PU/PD', 'polyuria', 'polydipsia', 'dysuria', 'stranguria', 'pollakiuria', 'haematuria',
      'hematuria', 'anuria', 'oliguria', 'urinary incontinence', 'vulvar discharge',
      'preputial discharge', 'dystocia', 'pyometra', 'nocturia', 'hyposthenuria', 'isosthenuria',
    ],
    terms: ['urination', 'urine', 'prostate', 'prostatic', 'testicular', 'mammary', 'infertility', 'oestrus', 'estrus'],
  },
  {
    label: 'Neurological',
    strong: [
      'seizure', 'seizures', 'convulsion', 'ataxia', 'ataxic', 'tremor', 'tremors', 'head tilt',
      'nystagmus', 'circling', 'paresis', 'paralysis', 'tetraparesis', 'paraparesis',
      'proprioceptive', 'obtundation', 'obtunded', 'stupor', 'coma', 'head pressing', 'vestibular',
      'cranial nerve', 'dysmetria', 'opisthotonus', 'knuckling', 'trembling', 'shaking', 'shivering',
    ],
    terms: [
      'mentation', 'behaviour change', 'behavioural', 'behavioral', 'disorientation', 'disorientated',
      'hyperaesthesia', 'neck pain', 'cervical pain', 'spinal pain', 'neurological deficits',
      'narcolepsy', 'twitching', 'ictal', 'pacing', 'confusion', 'myokymia', 'deafness',
    ],
  },
  {
    label: 'Musculoskeletal',
    strong: [
      'lameness', 'muscle wasting', 'muscle atrophy', 'joint swelling', 'joint pain', 'plantigrade',
      'stiffness', 'stiff gait', 'crepitus', 'myalgia',
    ],
    terms: ['reluctance to move', 'shifting leg', 'recumbency', 'recumbent', 'muscle', 'gait', 'swollen joints'],
  },
  {
    label: 'Dermatological',
    strong: [
      'alopecia', 'hair loss', 'pruritus', 'pruritic', 'calcinosis cutis', 'seborrhoea', 'seborrhea',
      'pyoderma', 'dermatitis', 'comedones', 'hyperpigmentation', 'thin skin', 'poor coat',
    ],
    terms: ['crusting', 'scaling', 'erythema', 'excoriation', 'papule', 'pustule', 'otitis', 'coat', 'skin'],
  },
  {
    label: 'Ophthalmic',
    strong: [
      'blepharospasm', 'epiphora', 'ocular discharge', 'conjunctivitis', 'conjunctival',
      'corneal', 'keratitis', 'uveitis', 'mydriasis', 'miosis', 'anisocoria', 'blindness',
      'buphthalmos', 'chemosis', 'hyphaema', 'hyphema', 'cataract', 'glaucoma', 'retinal',
    ],
    terms: ['ocular', 'vision', 'visual', 'third eyelid', 'enophthalmos', 'exophthalmos', 'photophobia', 'pupil'],
  },
  {
    label: 'Bleeding & haematologic',
    strong: [
      'petechiae', 'ecchymoses', 'ecchymosis', 'bruising', 'haematoma', 'hematoma',
      'prolonged bleeding', 'haemorrhage', 'hemorrhage', 'haemoabdomen', 'lymphadenopathy',
    ],
    terms: ['bleeding', 'pallor', 'pale', 'blood loss', 'clotting'],
  },
]

const LEXICON: Record<GroupKind, GroupDef[]> = {
  signs: SIGN_GROUPS,
  diagnostics: DIAGNOSTIC_GROUPS,
}
const OTHER_LABEL: Record<GroupKind, string> = {
  signs: 'Other signs',
  diagnostics: 'Other tests',
}

// ─── Confidence thresholds ────────────────────────────────────────────────
/** Below this many items the field already reads as a short list. */
const MIN_ITEMS = 4
/** Grouping must actually separate the content, not just retitle it. */
const MIN_GROUPS = 2
/** Above this share of unclassified items the lexicon doesn't understand the
 *  page — a half-grouped list is worse than a flat one, so fall back. */
const MAX_OTHER_SHARE = 0.4
/** A list whose every group holds one item is a relabelled list, not a grouping. */
const MIN_ITEMS_IN_LARGEST_GROUP = 2
/** Longest an item may be (words outside parentheses) to read as a list entry
 *  rather than a sentence — used when deciding to split prose on commas. */
const MAX_TERSE_WORDS = 8
/** A comma-separated run needs at least this many parts to be a list. */
const MIN_COMMA_PARTS = 3
/** …and this share of those parts must be vocabulary the lexicon recognises,
 *  which is what distinguishes a list of signs from a descriptive clause. */
const MIN_CLASSIFIED_SHARE = 0.6

// ─── Item splitting ───────────────────────────────────────────────────────

/** Split on `sep`, ignoring separators inside brackets. */
function splitTopLevel(text: string, sep: string): string[] {
  const out: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '(' || c === '[') depth++
    else if (c === ')' || c === ']') depth = Math.max(0, depth - 1)
    else if (c === sep && depth === 0) {
      out.push(text.slice(start, i))
      start = i + 1
    }
  }
  out.push(text.slice(start))
  return out.map(t => t.trim()).filter(Boolean)
}

/** Word count ignoring parenthetical asides — "urine culture (prone to UTI)" is
 *  a two-word list entry, not a six-word sentence. */
function terseLength(text: string): number {
  return text.replace(/\([^)]*\)/g, ' ').trim().split(/\s+/).filter(Boolean).length
}

/** A leading `:`, `→` or `—` (outside brackets) means the commas that follow are
 *  enumerating INSIDE a qualified statement — "Rarely: brainstem involvement →
 *  cranial nerve deficits, dysphagia, vestibular signs". Splitting there strands
 *  each item from the qualifier that scopes it, which changes the clinical
 *  meaning, so such a segment is never broken up. */
const QUALIFIED_LEAD = /[:→—]/

/** One sentence → list entries. Semicolons always separate; commas only when the
 *  parts look like a list rather than one clause — no leading qualifier, all
 *  terse, and mostly recognisable to the lexicon. Those tests are what stop a
 *  descriptive sentence ("Inspiratory stridor — high-pitched, worse with
 *  exertion, heat or excitement") being shredded into meaningless entries. */
function splitClauses(sentence: string, kind: GroupKind): string[] {
  return splitTopLevel(sentence, ';').flatMap(part => {
    const byComma = splitTopLevel(part, ',')
    if (byComma.length < MIN_COMMA_PARTS) return [part]
    if (QUALIFIED_LEAD.test(byComma[0].replace(/\([^)]*\)/g, ' '))) return [part]
    if (!byComma.every(p => terseLength(p) <= MAX_TERSE_WORDS)) return [part]
    const classified = byComma.filter(p => classifyItem(p, kind) !== null).length
    if (classified / byComma.length < MIN_CLASSIFIED_SHARE) return [part]
    return byComma
  })
}

/** Strip the sentence-final period and capitalise, so prose-derived entries read
 *  like authored bullets. Words carrying internal capitals (cTLI, NT-proBNP) are
 *  left alone. */
function tidy(item: string): string {
  const trimmed = item.replace(/\s*\.\s*$/, '').trim()
  const first = trimmed.split(/\s/)[0] ?? ''
  if (!/^[a-z][a-z'-]*$/.test(first)) return trimmed
  return trimmed[0].toUpperCase() + trimmed.slice(1)
}

/** Field text → list entries.
 *
 *  Pipe-markup is already itemised, but its segments are frequently comma-lists
 *  themselves ("Reduced activity, anorexia, hiding, tachypnoea") — those get
 *  split down too, or half the page would land in a single group. A `-sub`
 *  segment stays welded to the bullet it details, so grouping can't orphan it,
 *  and a segment carrying a sub is never split apart from it. Plain prose is
 *  split into sentences and then clauses. */
export function splitItems(text: string, kind: GroupKind): string[] {
  const trimmed = text.trim()
  if (!trimmed) return []
  if (!trimmed.includes('|')) return splitPearl(trimmed).flatMap(s => splitClauses(s, kind)).map(tidy)

  const out: string[] = []
  for (const seg of trimmed.split('|')) {
    const s = seg.trim()
    if (!s) continue
    if (s.startsWith('-') && out.length > 0) { out[out.length - 1] += `|${s}`; continue }
    out.push(s)
  }
  return out.flatMap(item => (item.includes('|') ? [item] : splitClauses(item, kind).map(tidy)))
}

// ─── Classification ───────────────────────────────────────────────────────

function toPattern(term: string): RegExp {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const lead = /^\w/.test(term) ? '\\b' : ''
  const tail = /\w$/.test(term) ? '\\b' : ''
  return new RegExp(`${lead}${escaped}${tail}`, 'i')
}

interface CompiledGroup { label: string; strong: RegExp[]; weak: RegExp[] }
const COMPILED = new Map<GroupKind, CompiledGroup[]>()
function compiled(kind: GroupKind): CompiledGroup[] {
  const cached = COMPILED.get(kind)
  if (cached) return cached
  const built = LEXICON[kind].map(g => ({
    label: g.label,
    strong: (g.strong ?? []).map(toPattern),
    weak: g.terms.map(toPattern),
  }))
  COMPILED.set(kind, built)
  return built
}

/** Best-scoring group label for one item, or null when nothing matched. Only
 *  the item's own text is scored — the leading bullet, never its `-sub` detail,
 *  so an aside can't drag an entry into the wrong system. */
export function classifyItem(item: string, kind: GroupKind): string | null {
  const head = item.split('|')[0]
  let best: { label: string; score: number } | null = null
  for (const group of compiled(kind)) {
    let score = 0
    for (const re of group.strong) if (re.test(head)) score += STRONG_WEIGHT
    for (const re of group.weak) if (re.test(head)) score += 1
    if (score > 0 && (best === null || score > best.score)) best = { label: group.label, score }
  }
  return best?.label ?? null
}

// ─── Grouping ─────────────────────────────────────────────────────────────

export interface Grouped {
  /** Safety warnings, rendered ahead of every header — see PINNED. */
  pinned: string[]
  groups: { label: string; items: string[] }[]
  /** Items no lexicon term matched (they sit in the trailing "Other" group). */
  otherCount: number
  itemCount: number
}

/** An authored ⚠️/🚨 line is a handling warning, not a sign to be filed by body
 *  system. Grouping must never bury one under an "Other signs" header, so these
 *  are lifted out and rendered first, in their authored order. */
const PINNED = /[⚠🚨]/u

/** Group a field's items without applying the confidence thresholds. Exported
 *  for the coverage report; render paths should use `toGroupedMarkup`. */
export function groupItems(text: string, kind: GroupKind): Grouped {
  const all = splitItems(text, kind)
  const pinned = all.filter(item => PINNED.test(item))
  const items = all.filter(item => !PINNED.test(item))
  const buckets = new Map<string, string[]>()
  let otherCount = 0
  for (const item of items) {
    const label = classifyItem(item, kind)
    if (label === null) otherCount++
    const key = label ?? OTHER_LABEL[kind]
    const bucket = buckets.get(key)
    if (bucket) bucket.push(item)
    else buckets.set(key, [item])
  }
  // Canonical lexicon order, "Other" last — so the same systems appear in the
  // same order on every page, regardless of how the source text was written.
  const order = [...LEXICON[kind].map(g => g.label), OTHER_LABEL[kind]]
  const groups = order
    .filter(label => buckets.has(label))
    .map(label => ({ label, items: buckets.get(label) as string[] }))
  return { pinned, groups, otherCount, itemCount: items.length }
}

/** Why a field was left flat — surfaced by the coverage report so the lexicon
 *  can be grown where it actually matters. */
export type SkipReason = 'authored' | 'too-few-items' | 'too-few-groups' | 'low-coverage' | 'all-singletons'

export function groupingSkipReason(text: string, kind: GroupKind): SkipReason | null {
  const trimmed = text.trim()
  if (trimmed.includes('#')) return 'authored'
  const { groups, otherCount, itemCount } = groupItems(trimmed, kind)
  if (itemCount < MIN_ITEMS) return 'too-few-items'
  if (groups.length < MIN_GROUPS) return 'too-few-groups'
  if (otherCount / itemCount > MAX_OTHER_SHARE) return 'low-coverage'
  if (!groups.some(g => g.items.length >= MIN_ITEMS_IN_LARGEST_GROUP)) return 'all-singletons'
  return null
}

/** Field text → pipe-markup with `#Header` groups, or null when the field is
 *  already authored with headers or the classifier isn't confident enough. */
export function toGroupedMarkup(text: string, kind: GroupKind): string | null {
  const trimmed = text.trim()
  if (!trimmed || groupingSkipReason(trimmed, kind) !== null) return null
  const { pinned, groups } = groupItems(trimmed, kind)
  return [...pinned, ...groups.flatMap(g => [`#${g.label}`, ...g.items])].join('|')
}
