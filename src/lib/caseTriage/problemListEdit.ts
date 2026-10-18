// ── Case Triage: the reader's edits to the problem list ─────────────────────
// The model sorts the extracted findings into key / supporting / secondary, and
// on any one run it can get a finding wrong — however the notes were worded.
// The reader can move a finding between tiers before the search ranks again;
// these are the pure list operations behind that.

import type { ProblemList } from '../../../convex/caseAnalysis'

export type Tier = 'key' | 'supporting' | 'secondary'

/** A finding in neither `key` nor `secondary` is supporting. */
export function tierOf(list: ProblemList, term: string): Tier {
  if (list.key.includes(term)) return 'key'
  if (list.secondary.some(x => x.term === term)) return 'secondary'
  return 'supporting'
}

/** The tier a tap moves a finding to: key → supporting → secondary → key. */
export const NEXT_TIER: Record<Tier, Tier> = { key: 'supporting', supporting: 'secondary', secondary: 'key' }

/** Says who put a finding in `secondary` when the reader did. */
export const READER_EXPLAINED_BY = 'your reading'

export function moveTerm(list: ProblemList, term: string, to: Tier): ProblemList {
  const key = list.key.filter(t => t !== term)
  const secondary = list.secondary.filter(x => x.term !== term)
  if (to === 'key') key.push(term)
  if (to === 'secondary') secondary.push({ term, explainedBy: READER_EXPLAINED_BY })
  // A pattern is one key problem made of its parts. Once a part stops being a
  // problem the reader wants explained, the pattern goes with it.
  const patterns = to === 'key' ? list.patterns : list.patterns.filter(p => !p.terms.includes(term))
  return { key, secondary, patterns }
}

export function removePattern(list: ProblemList, name: string): ProblemList {
  return { ...list, patterns: list.patterns.filter(p => p.name !== name) }
}

/** Same tiers and patterns, in any order — what decides whether the chart on
 *  screen still reflects the list. */
export function sameList(a: ProblemList | null, b: ProblemList | null): boolean {
  if (!a || !b) return a === b
  const set = (xs: string[]) => [...xs].sort().join('\u0000')
  return set(a.key) === set(b.key)
    && set(a.secondary.map(x => x.term)) === set(b.secondary.map(x => x.term))
    && set(a.patterns.map(p => p.name + '\u0001' + set(p.terms))) === set(b.patterns.map(p => p.name + '\u0001' + set(p.terms)))
}
