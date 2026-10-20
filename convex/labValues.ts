// ── Case Triage: lab values read from the notes, not from the model's words ──
// Pure module — no Convex imports — shared by the extraction action and the
// screen. The model turns "elevated glucose 6.1 mmol/L", "BG 6.1" and
// "hyperglycaemia" into whatever keyword it likes, and the tiering used to
// key off that wording alone. The number is the same however it is phrased,
// so the notes are read for the number itself and graded against a sourced
// cutoff.
//
// Only analytes with a sourced decision threshold are graded. A generic
// reference interval would not do: intervals differ by laboratory, and the
// Airedale notes call 6.1 mmol/L "elevated" where many canine intervals stop
// above it.
//
//   Glucose: the renal threshold for glucosuria, below which hyperglycaemia
//   cannot cause the glucosuria and PU/PD of diabetes, and the stress range.
//   Dog >9.4–10 mmol/L, cat >14.4–17.2 mmol/L (Ettinger 9th edn, Ch 61); a
//   healthy cat's stress hyperglycaemia rarely exceeds ~15 mmol/L (Ch 292).
//   The ALIVE criteria (Ch 61) need ≥11 mmol/L with classic signs (dog), or
//   ≥15 mmol/L plus glycated protein or glucosuria (cat), for diabetes.
//
//   Calcium: hypocalcaemia typically needs total Ca <1.75 mmol/L (<7 mg/dL)
//   or ionised Ca <0.8 mmol/L before it causes signs (Ettinger 9th edn,
//   Ch 284). Those sit below every reference interval, so a value under them
//   is hypocalcaemia on any lab's range. A milder low is left to the model.
//   Phosphate is not graded: the notes carry no sourced cutoff for it.

export type LabSpecies = 'dog' | 'cat' | 'all'

export type LabReading = {
  analyte: 'glucose' | 'calcium'
  /** In mmol/L, converted if the notes gave mg/dL. */
  value: number
  /** The text the value was read from, as written. */
  source: string
  /** Glucose — 'stress-range': below the species' renal threshold, on its
   *  own not a diabetic picture; 'diabetic-range': at or above it; 'low':
   *  hypoglycaemia. Calcium — only ever 'low' (readings above the cutoff are
   *  not reported). */
  grade: 'low' | 'stress-range' | 'diabetic-range'
  /** One line for the reader, e.g. "below the dog renal threshold (10 mmol/L)". */
  note: string
}

/** mmol/L. Dog: upper end of 9.4–10; cat: lower end of 14.4–17.2, which is
 *  also the ~15 mmol/L ceiling of feline stress hyperglycaemia. Species
 *  unknown takes the dog figure, the lower of the two, so it never calls a
 *  diabetic-range value stress. */
export const GLUCOSE_RENAL_THRESHOLD: Record<LabSpecies, number> = { dog: 10, cat: 14.4, all: 10 }
/** Below this a glucose is hypoglycaemia — a key finding, never stress. */
const HYPOGLYCAEMIA_BELOW = 3.3
const MGDL_PER_MMOL = 18

// The analyte name, then up to ~30 characters of anything but a digit or line
// break ("glucose (fasting):", "BG was", "elevated glucose of"), then the
// number and an optional unit. "glucosuria" and "glucose curve" are excluded by
// the word boundary and the lookahead.
const GLUCOSE_RX =
  /\b(?:blood\s+glucose|glucose|glu|bg|blood\s+sugar)\b(?!\s*(?:uria|curve))[^\d\n]{0,30}?(\d+(?:[.,]\d+)?)\s*(mmol\s*\/\s*l|mg\s*\/\s*dl)?/gi

export function readGlucose(text: string, species: LabSpecies): LabReading[] {
  const out: LabReading[] = []
  for (const m of text.matchAll(GLUCOSE_RX)) {
    const raw = Number(m[1].replace(',', '.'))
    if (!Number.isFinite(raw) || raw <= 0) continue
    const unit = (m[2] ?? '').replace(/\s/g, '').toLowerCase()
    // No unit: a canine/feline glucose in mmol/L is under ~40; in mg/dL over it.
    const mgdl = unit === 'mg/dl' || (!unit && raw >= 40)
    const value = Math.round((mgdl ? raw / MGDL_PER_MMOL : raw) * 10) / 10
    const threshold = GLUCOSE_RENAL_THRESHOLD[species]
    const who = species === 'all' ? 'dog' : species
    const grade: LabReading['grade'] =
      value < HYPOGLYCAEMIA_BELOW ? 'low' : value < threshold ? 'stress-range' : 'diabetic-range'
    const note = grade === 'low' ? `below ${HYPOGLYCAEMIA_BELOW} mmol/L — hypoglycaemia`
      : grade === 'stress-range' ? `below the ${who} renal threshold (${threshold} mmol/L) — stress range`
      : `at or above the ${who} renal threshold (${threshold} mmol/L)`
    out.push({ analyte: 'glucose', value, source: m[0].trim(), grade, note })
  }
  return out
}

/** Below these, calcium is low on any reference interval (Ch 284). */
export const CALCIUM_LOW_BELOW = { total: 1.75, ionised: 0.8 } as const
const MGDL_PER_MMOL_CA = 4.008

// "Ca" alone is only read with its number right beside it ("Ca 1.0",
// "Ca++: 1.0"), so "SCC/ca of the digit 2" is not a calcium. Drug and salt
// names are excluded, and so is a dose ("calcium gluconate 10%", "mg/kg").
const CALCIUM_RX =
  /\b(total\s+calcium|tca|ioni[sz]ed\s+calcium|ica|calcium|hypocalca?emia|ca)\b(\+*)(?!\s*(?:gluconate|carbonate|chloride|oxalate|channel|acetate|borogluconate))([^\d\n]{0,30}?)(\d+(?:[.,]\d+)?)\s*(mmol\s*\/\s*l|mg\s*\/\s*dl|mg\s*\/\s*kg|%|mg\b|ml\b)?/gi

export function readCalcium(text: string): LabReading[] {
  const out: LabReading[] = []
  for (const m of text.matchAll(CALCIUM_RX)) {
    const name = m[1].toLowerCase().replace(/\s/g, '')
    if (name === 'ca' && m[3].length > 4) continue
    const unit = (m[5] ?? '').replace(/\s/g, '').toLowerCase()
    if (unit && unit !== 'mmol/l' && unit !== 'mg/dl') continue // a dose, not a level
    const raw = Number(m[4].replace(',', '.'))
    if (!Number.isFinite(raw) || raw <= 0) continue
    // No unit: mmol/L calcium runs ~0.5–4, mg/dL ~2–16. Under 2 is mmol/L,
    // over 5 is mg/dL, and 2–5 could be either, so it is not read.
    if (!unit && raw >= 2 && raw <= 5) continue
    const mgdl = unit === 'mg/dl' || (!unit && raw > 5)
    const value = Math.round((mgdl ? raw / MGDL_PER_MMOL_CA : raw) * 100) / 100
    // A plain "calcium"/"Ca" on a biochemistry panel is total calcium; an
    // ionised value is always labelled as one.
    const ionised = /^(ionis|ioniz|ica)/.test(name)
    const cutoff = ionised ? CALCIUM_LOW_BELOW.ionised : CALCIUM_LOW_BELOW.total
    if (value >= cutoff) continue
    const kind = ionised ? 'ionised' : 'total'
    out.push({
      analyte: 'calcium',
      value,
      source: m[0].trim(),
      grade: 'low',
      note: `below ${cutoff} mmol/L ${kind} calcium — hypocalcaemia at the level that typically causes signs`,
    })
  }
  return out
}

/** Every graded lab value the notes state. */
export function readLabs(text: string, species: LabSpecies): LabReading[] {
  return [...readGlucose(text, species), ...readCalcium(text)]
}

/** The keyword a graded value stands for, when the model did not extract one
 *  for it. Values written bare ("calcium 1.0 mmol/L", no "low") were read by
 *  the model on some runs and not others, and the case lost its key problem. */
export const LAB_KEYWORD: Partial<Record<LabReading['analyte'], { term: string; already: RegExp }>> = {
  calcium: { term: 'hypocalcemia', already: /hypocalc|\blow (total |ionised |ionized )?ca(lcium)?\b/i },
}

/** `diagKeywords` plus a keyword for each graded value that has none. */
export function withLabKeywords(diagKeywords: string[], signKeywords: string[], labs: LabReading[]): string[] {
  const all = [...signKeywords, ...diagKeywords]
  const added = new Set<string>()
  for (const l of labs) {
    const k = LAB_KEYWORD[l.analyte]
    if (k && l.grade === 'low' && !all.some(t => k.already.test(t))) added.add(k.term)
  }
  return [...diagKeywords, ...added]
}

/** The highest glucose the notes give, or null. A case with several readings
 *  is graded by its worst — one diabetic-range value is enough to keep
 *  diabetes in play. */
export function peakGlucose(labs: LabReading[]): LabReading | null {
  const g = labs.filter(l => l.analyte === 'glucose' && l.grade !== 'low')
  return g.length === 0 ? null : g.reduce((a, b) => (b.value > a.value ? b : a))
}
