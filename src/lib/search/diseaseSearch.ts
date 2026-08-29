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
  ['blood in stool', 'melena', 'melaena', 'hematochezia', 'haematochezia', 'bloody stool', 'bloody diarrhea', 'bloody diarrhoea', 'rectal bleeding'],
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
    synonymMap.set(term.toLowerCase(), group.map(t => t.toLowerCase()))
  }
}

/** Expand a keyword to include all its synonyms (including itself). */
function expandKeyword(kw: string): string[] {
  const k = kw.toLowerCase()
  return synonymMap.get(k) ?? [k]
}

// ── Text matching helper ──────────────────────────────────────────────────────

function fieldText(d: DiseaseRow, ...keys: string[]): string {
  return keys.map(k => (d[k] as string | undefined) ?? '').join(' ').toLowerCase()
}

function keywordHits(text: string, keywords: string[]): string[] {
  const matched: string[] = []
  for (const kw of keywords) {
    if (kw.length < 2) continue
    const expanded = expandKeyword(kw)
    if (expanded.some(term => text.includes(term))) matched.push(kw)
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

// ── Public API ────────────────────────────────────────────────────────────────

export interface SearchCategory {
  name: string
  items: DiseaseResult[]
}

export function searchDiseases(inputs: SearchInputs): SearchCategory[] {
  const { species, breedQuery, ageCategory, sex, neuter, signKeywords, diagKeywords } = inputs

  const hasSignalment = breedQuery.trim() || ageCategory || sex || neuter
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
