// Splits a clinical "pearl" string into discrete bullet points.
//
// An explicit `|` separator means the pearl was authored as bullets already —
// those win untouched. Otherwise we split on sentence boundaries, guarding
// against abbreviations ("e.g.", "vs.") and decimals ("0.5") so a clinical
// phrase is never cut in half. A new sentence must begin with a capital,
// digit, or a leading clinical symbol — never a lowercase letter, which would
// signal a genus abbreviation ("B. burgdorferi") or a mid-sentence period.

const ABBREV = new Set([
  'e.g', 'i.e', 'eg', 'ie', 'vs', 'etc', 'approx', 'cf', 'fig', 'no',
  'ca', 'dr', 'mr', 'mrs', 'ms', 'st', 'viz', 'incl', 'esp', 'sp', 'spp', 'al',
])

const SENTENCE_BREAK = /([.!?])\s+(?=[A-Z0-9±→↑↓⚠✓✗])/g

export function splitPearl(text: string): string[] {
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
