import { describe, it, expect } from 'vitest'
import { PHYSICAL, BLOODWORK } from '.'
import { DB } from '../../data/db'
import { TABS, TAB_ORDER } from '../../app/nav/view'

const entries = [...PHYSICAL, ...BLOODWORK].flatMap(g => g.entries)

describe('interpretation content', () => {
  it('links only to disease pages that exist', () => {
    const ids = new Set(DB.disease_page.map(d => d.id))
    const dead = entries.flatMap(e => (e.related ?? []).filter(id => !ids.has(id)).map(id => `${e.id} → ${id}`))
    expect(dead).toEqual([])
  })

  it('has unique entry ids (they key the cards)', () => {
    const ids = entries.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry carries a source', () => {
    expect(entries.filter(e => !e.src.trim()).map(e => e.id)).toEqual([])
  })
})

describe('bottom-nav order', () => {
  it('shows every tab exactly once, Interpretation between Disease and Mix & Match', () => {
    expect([...TAB_ORDER].sort()).toEqual(TABS.map((_, i) => i))
    const labels = TAB_ORDER.map(i => TABS[i].label)
    expect(labels.indexOf('Interpretation')).toBe(labels.indexOf('Disease') + 1)
    expect(labels.indexOf('Mix & Match')).toBe(labels.indexOf('Interpretation') + 1)
  })
})
