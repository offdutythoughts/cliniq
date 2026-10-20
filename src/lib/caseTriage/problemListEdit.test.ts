import { describe, it, expect } from 'vitest'
import { moveTerm, NEXT_TIER, removePattern, sameList, tierOf, READER_EXPLAINED_BY } from './problemListEdit'

const list = {
  key: ['seizures', 'hypocalcemia', 'hyperphosphatemia', 'hyperglycemia'],
  secondary: [{ term: 'elevated CK', explainedBy: 'seizures' }],
  patterns: [{ name: 'low Ca, high P', terms: ['hypocalcemia', 'hyperphosphatemia'] }],
}

describe('problem list edits', () => {
  it('cycles a finding key → supporting → secondary → key', () => {
    let l = list
    const seen: string[] = []
    for (let i = 0; i < 3; i++) {
      l = moveTerm(l, 'hyperglycemia', NEXT_TIER[tierOf(l, 'hyperglycemia')])
      seen.push(tierOf(l, 'hyperglycemia'))
    }
    expect(seen).toEqual(['supporting', 'secondary', 'key'])
  })

  it('marks a finding the reader demoted as their reading', () => {
    const l = moveTerm(list, 'hyperglycemia', 'secondary')
    expect(l.key).not.toContain('hyperglycemia')
    expect(l.secondary).toContainEqual({ term: 'hyperglycemia', explainedBy: READER_EXPLAINED_BY })
  })

  it('drops a pattern once one of its parts leaves key', () => {
    expect(moveTerm(list, 'hypocalcemia', 'supporting').patterns).toEqual([])
    expect(moveTerm(list, 'seizures', 'supporting').patterns).toHaveLength(1)
  })

  it('compares lists by content, not order', () => {
    const shuffled = { ...list, key: [...list.key].reverse() }
    expect(sameList(list, shuffled)).toBe(true)
    expect(sameList(list, moveTerm(list, 'hyperglycemia', 'secondary'))).toBe(false)
    expect(sameList(list, removePattern(list, 'low Ca, high P'))).toBe(false)
  })
})
