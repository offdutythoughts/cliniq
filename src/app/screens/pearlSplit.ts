// Splits a run of clinical prose into discrete bullet points.
//
// An explicit `|` separator means the field was authored as bullets already —
// those win untouched. Otherwise we split on sentence boundaries, guarding
// against abbreviations ("e.g.", "vs.") and decimals ("0.5") so a clinical
// phrase is never cut in half. A new sentence must begin with a capital,
// digit, or a leading clinical symbol — never a lowercase letter, which would
// signal a genus abbreviation ("B. burgdorferi") or a mid-sentence period.
//
// Used for two things: the clinical-pearls box (`splitPearl`, the original
// caller) and the universal bullet renderer in diseaseSections.tsx, which puts
// EVERY clinical section into bullet form whether or not its author reached for
// a `|`. Both go through the same guards, so a dose string or a genus
// abbreviation is safe wherever it appears.

const ABBREV = new Set([
  'e.g', 'i.e', 'eg', 'ie', 'vs', 'etc', 'approx', 'cf', 'fig', 'no', 'nos',
  'ca', 'dr', 'mr', 'mrs', 'ms', 'st', 'viz', 'incl', 'esp', 'sp', 'spp', 'al',
  // Clinical prose outside pearls carries references and dosing shorthand that
  // a pearl rarely does — "(Ettinger Ch. 71)", "max. 4 doses", "approx. 2 wk".
  'ch', 'vol', 'pp', 'ed', 'edn', 'fig', 'tab', 'ref', 'min', 'max', 'wk',
  'hr', 'hrs', 'yr', 'yrs', 'wt', 'inj', 'susp', 'sol', 'conc',
])

const SENTENCE_BREAK = /([.!?])\s+(?=[A-Z0-9±→↑↓⚠✓✗])/g

/** Split clinical prose into bullet-sized pieces. Explicit `|` markup wins;
 *  otherwise sentence boundaries, guarded as described above. Never returns an
 *  empty array — unsplittable text comes back as a single item. */
export function splitSentences(text: string): string[] {
  const trimmed = text.trim()
  if (trimmed.includes('|')) return trimmed.split('|').map(t => t.trim()).filter(Boolean)

  const out: string[] = []
  let last = 0
  let m: RegExpExecArray | null
  SENTENCE_BREAK.lastIndex = 0
  while ((m = SENTENCE_BREAK.exec(trimmed)) !== null) {
    const end = m.index + 1
    const chunk = trimmed.slice(last, end)
    const lastWord = (chunk.match(/(\S+)$/)?.[1] ?? '').replace(/[.!?]+$/, '').toLowerCase()
    if (ABBREV.has(lastWord)) continue
    out.push(chunk.trim())
    last = end
  }
  const tail = trimmed.slice(last).trim()
  if (tail) out.push(tail)
  return out.length ? out : [trimmed]
}

/** Clinical-pearls box. Same splitter, named for its original caller. */
export const splitPearl = splitSentences
