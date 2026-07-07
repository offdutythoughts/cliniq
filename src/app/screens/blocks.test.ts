import { describe, it, expect } from 'vitest'
import { parseBlocks, bareHeaderIndices, hasBareHeader } from './blocks'
import { DB } from '../../data/db'

describe('parseBlocks', () => {
  it('classifies headers, subs and bullets', () => {
    expect(parseBlocks('#Head|-sub|plain')).toEqual([
      { kind: 'header', text: 'Head' },
      { kind: 'sub', text: 'sub' },
      { kind: 'bullet', text: 'plain' },
    ])
  })

  it('only treats ! as a warning when warn is enabled', () => {
    expect(parseBlocks('!danger')[0]).toEqual({ kind: 'bullet', text: '!danger' })
    expect(parseBlocks('!danger', { warn: true })[0]).toEqual({ kind: 'warn', text: 'danger' })
  })
})

describe('bareHeaderIndices', () => {
  it('flags a header with no bullet beneath it', () => {
    expect(hasBareHeader('#a|#b|#c')).toBe(true)
    expect(bareHeaderIndices(parseBlocks('#Group|item|item'))).toEqual([])
    // trailing header, and a header immediately followed by another header
    expect(bareHeaderIndices(parseBlocks('#Group|item|#Trailing'))).toEqual([2])
  })
})

// Guardrail: no rendered field in the DB may contain a bare header (a `#`
// section header with no bullet beneath it), which renders as a "wall of
// green" instead of readable body text. Mirrors scripts/lint-disease-blocks.ts.
describe('DB has no bare headers', () => {
  const RENDERED_FIELDS = [
    'etiology', 'risk', 'path', 'signs', 'conf', 'supp',
    'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'breed', 'age',
  ] as const
  const rows = [...DB.disease_page, ...DB.lesion_type] as Record<string, unknown>[]

  it('every disease/lesion rendered field is free of bare headers', () => {
    const offenders: string[] = []
    for (const row of rows) {
      for (const field of RENDERED_FIELDS) {
        const val = row[field]
        if (typeof val !== 'string' || !val.includes('|')) continue
        for (const i of bareHeaderIndices(parseBlocks(val))) {
          offenders.push(`${row.id as string}.${field}: "#${parseBlocks(val)[i].text.slice(0, 40)}"`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
