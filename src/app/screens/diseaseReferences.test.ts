import { describe, expect, it } from 'vitest'
import { DB } from '../../data/db'
import { parseSources, buildDiseaseCitations } from './diseaseReferences'

describe('parseSources', () => {
  it('yields one per-chapter Ettinger entry, in order', () => {
    expect(parseSources('Ettinger Ch 127, 311').map(s => s.id))
      .toEqual(['ettinger-ch127', 'ettinger-ch311'])
    expect(parseSources('Ettinger Ch 314')[0].text).toContain('Ch. 314.')
  })

  it('treats "Ettinger 9e" (no chapter) as the book-level source', () => {
    expect(parseSources('Ettinger 9e').map(s => s.id)).toEqual(['ettinger'])
  })

  it('treats Gelatt as a single ophthalmology source', () => {
    expect(parseSources('Gelatt 6th edn Table 17.3').map(s => s.id)).toEqual(['gelatt'])
  })
})

describe('buildDiseaseCitations', () => {
  it('numbers distinct chapters by first appearance across fields', () => {
    const { numberOf, entries } = buildDiseaseCitations([
      'Threshold (Ettinger Ch 127).',
      'More (Ettinger Ch 311, 127).',
      'Also (Ettinger Ch 300).',
    ])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch127', 'ettinger-ch311', 'ettinger-ch300'])
    expect(numberOf.get('ettinger-ch127')).toBe(1)
    expect(numberOf.get('ettinger-ch311')).toBe(2)
    expect(numberOf.get('ettinger-ch300')).toBe(3)
    expect(entries.map(e => e.n)).toEqual([1, 2, 3])
  })

  it('ignores non-source parentheticals', () => {
    const { entries } = buildDiseaseCitations(['Large breeds (as for most cases). (Ettinger Ch 314)'])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch314'])
  })

  it('numbers the real prostatitis page as a single Ettinger chapter', () => {
    const d = DB.disease_page.find(x => x.id === 'DIS-URO-PROSTATITIS')!
    const str = (v: unknown): string => (typeof v === 'string' ? v : '')
    const { entries } = buildDiseaseCitations([
      str(d.topAlert), str(d.severe), str(d.etiology), str(d.breed), str(d.age),
      str(d.sex), str(d.risk), str(d.path), str(d.signs), str(d.conf), str(d.supp),
      str(d.tx1), str(d.tx2), str(d.outpatient), str(d.monitor), str(d.prog), str(d.ddx), str(d.pearl),
    ])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch314'])
    expect(entries[0].text).toContain('Ch. 314.')
  })
})
