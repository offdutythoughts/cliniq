import { describe, it, expect } from 'vitest'
import { splitPearl } from './pearlSplit'
import { DB } from '../../data/db'

const strip = (s: string) => s.replace(/[\s|]+/g, '')

const pearls = DB.disease_page
  .map(d => (typeof d.pearl === 'string' ? d.pearl : ''))
  .filter(Boolean)

describe('splitPearl', () => {
  it('honours explicit pipe separators', () => {
    expect(splitPearl('a|b|c')).toEqual(['a', 'b', 'c'])
  })

  it('does not split abbreviations or decimals', () => {
    expect(splitPearl('Give 0.5 mg/kg. Repeat once.')).toEqual(['Give 0.5 mg/kg.', 'Repeat once.'])
    expect(splitPearl('Rare, e.g. Addison. Check.')).toEqual(['Rare, e.g. Addison.', 'Check.'])
    expect(splitPearl('Dogs vs. Cats differ. True.')).toEqual(['Dogs vs. Cats differ.', 'True.'])
    expect(splitPearl('B. burgdorferi is the agent. Treat.')).toEqual(['B. burgdorferi is the agent.', 'Treat.'])
  })

  it('loses no characters when splitting real pearls', () => {
    for (const p of pearls) {
      const joined = splitPearl(p).join('')
      expect(strip(joined), `text mismatch for: ${p.slice(0, 60)}…`).toBe(strip(p))
    }
  })

  it('never mid-sentence-splits (no split-created segment starts lowercase)', () => {
    // The first segment reflects the source text (a pearl may itself start
    // lowercase, e.g. "cTLI/fTLI …"). Any *later* segment was created by a
    // split, so a lowercase start there would mean a phrase was cut in half.
    const bad: string[] = []
    for (const p of pearls) {
      splitPearl(p).slice(1).forEach(seg => {
        if (/^[a-z]/.test(seg)) bad.push(seg.slice(0, 70))
      })
    }
    expect(bad, `bad splits:\n${bad.join('\n')}`).toEqual([])
  })

  it('never produces a trivially short segment', () => {
    const bad: string[] = []
    for (const p of pearls) {
      for (const seg of splitPearl(p)) {
        if (seg.length < 3) bad.push(`${seg} :: ${p.slice(0, 50)}`)
      }
    }
    expect(bad, `short segments:\n${bad.join('\n')}`).toEqual([])
  })
})
