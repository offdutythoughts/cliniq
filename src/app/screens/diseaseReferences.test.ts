import { describe, expect, it } from 'vitest'
import { DB } from '../../data/db'
import { parseSources, buildDiseaseCitations, splitCitations, hasCitation } from './diseaseReferences'

describe('splitCitations — AMA punctuation order', () => {
  it('captures a trailing full stop so the marker can follow it', () => {
    const segs = splitCitations('Prognosis is poor (Ettinger Ch 238).')
    expect(segs[0].text).toBe('Prognosis is poor')
    expect(segs[1].citeIds).toEqual(['ettinger-ch238'])
    expect(segs[1].trail).toBe('.')
    // The period is not left dangling in a later plain-text segment.
    expect(segs.slice(2).map(s => s.text).join('')).toBe('')
  })

  it('captures a trailing comma too', () => {
    expect(splitCitations('Poor (Ettinger Ch 238), but treatable')[1].trail).toBe(',')
  })

  it('leaves semicolons and colons alone (AMA keeps the marker before those)', () => {
    expect(splitCitations('Poor (Ettinger Ch 238); see below')[1].trail).toBeUndefined()
    expect(splitCitations('Poor (Ettinger Ch 238): see below')[1].trail).toBeUndefined()
  })

  it('handles a citation with no trailing punctuation', () => {
    expect(splitCitations('Poor (Ettinger Ch 238)')[1].trail).toBeUndefined()
  })

  it('loses no visible characters other than the moved punctuation', () => {
    const src = 'Alpha (Ettinger Ch 238). Beta (AAHA 2023), gamma; delta (Gelatt 6th edn)'
    const rebuilt = splitCitations(src)
      .map(s => (s.citeIds ? (s.raw ?? '') + (s.trail ?? '') : s.text))
      .join('')
    expect(rebuilt).toBe(src)
  })
})

describe('parseSources', () => {
  it('yields one per-chapter Ettinger entry, in order', () => {
    expect(parseSources('Ettinger Ch 127, 311').map(s => s.id))
      .toEqual(['ettinger-ch127', 'ettinger-ch311'])
    expect(parseSources('Ettinger Ch 314')[0].text).toContain(': chap 314.')
  })

  it('treats "Ettinger 9e" (no chapter) as the book-level source', () => {
    expect(parseSources('Ettinger 9e').map(s => s.id)).toEqual(['ettinger'])
  })

  it('treats Gelatt as a single ophthalmology source', () => {
    expect(parseSources('Gelatt 6th edn Table 17.3').map(s => s.id)).toEqual(['gelatt'])
  })

  it('treats ACVIM as the uroliths consensus source', () => {
    expect(parseSources('ACVIM 2016').map(s => s.id)).toEqual(['acvim-uroliths'])
    expect(parseSources('ACVIM 2016')[0].text).toContain('J Vet Intern Med. 2016;30(5):1564-1574')
  })

  it('treats Berent as the SUB journal source', () => {
    expect(parseSources('Berent 2018').map(s => s.id)).toEqual(['berent-sub'])
    expect(parseSources('Berent 2018')[0].text).toContain('J Am Vet Med Assoc. 2018;253(10):1309-1327')
  })

  it('splits a mixed Ettinger + journal parenthetical into separate entries', () => {
    expect(parseSources('Ettinger Ch 306; ACVIM 2016; Berent 2018').map(s => s.id))
      .toEqual(['ettinger-ch306', 'acvim-uroliths', 'berent-sub'])
  })

  it('resolves each feline-HAC primary source to its own entry', () => {
    const cases: [string, string, string][] = [
      ['Cook 2021', 'cook-cushingoid', 'J Feline Med Surg. 2021;23(1):4-16'],
      ['Boland 2017', 'boland-fhac', 'J Feline Med Surg. 2017;19(9):933-947'],
      ['Valentin 2014', 'valentin-fhac', 'J Vet Intern Med. 2014;28(2):481-487'],
      ['Keith 2013', 'keith-trilostane', 'J Vet Intern Med. 2013;27(6):1471-1477'],
      ['Neiger 2004', 'neiger-trilostane', 'J Vet Intern Med. 2004;18(2):160-164'],
      ['Miceli 2022', 'miceli-trilostane', '43 cases (2012-2022)'],
      ['Daley 1993', 'daley-metyrapone', 'J Am Vet Med Assoc. 1993;202(6):956-960'],
      ['Moore 2000', 'moore-metyrapone', 'J Am Vet Med Assoc. 2000;217(5):691-694'],
      ['Duesberg 1995', 'duesberg-adrenalectomy', 'J Am Vet Med Assoc. 1995;207(8):1066-1070'],
      ['Meij 2001', 'meij-hypophysectomy', 'Vet Surg. 2001;30(1):72-86'],
      ['Benchekroun 2012', 'benchekroun-acth', 'J Vet Intern Med. 2012;26(3):575-581'],
      ['Hardy 2023', 'hardy-skin', 'JFMS Open Rep. 2023;9(1)'],
      ['Yayoshi 2022', 'yayoshi-radiation', 'J Vet Med Sci. 2022;84(7):898-904'],
      ['Muschner 2018', 'muschner-remission', 'JFMS Open Rep. 2018;4(1)'],
      ['Lien 2006', 'lien-iatrogenic', 'J Am Anim Hosp Assoc. 2006;42(6):414-423'],
      ['Chirayath 2020', 'chirayath-iatrogenic', 'Vet Dermatol. 2020;31(6):486-488'],
    ]
    for (const [marker, id, fragment] of cases) {
      const [source] = parseSources(marker)
      expect(source.id, marker).toBe(id)
      expect(source.text, marker).toContain(fragment)
    }
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
    expect(entries[0].text).toContain(': chap 314.')
  })

  it('numbers the feline HAC page across its many primary sources, in render order', () => {
    const d = DB.disease_page.find(x => x.id === 'DIS-ENDO-HAC-CAT')!
    const str = (v: unknown): string => (typeof v === 'string' ? v : '')
    const { entries } = buildDiseaseCitations([
      str(d.topAlert), str(d.severe), str(d.etiology), str(d.breed), str(d.age),
      str(d.sex), str(d.risk), str(d.path), str(d.signs), str(d.conf), str(d.supp),
      str(d.tx1), str(d.tx2), str(d.outpatient), str(d.monitor), str(d.prog), str(d.ddx), str(d.pearl),
    ])
    // topAlert cites Hardy first, so it takes number 1; numbering then follows
    // the card order down the page.
    expect(entries[0].id).toBe('hardy-skin')
    expect(entries.map(e => e.n)).toEqual(entries.map((_, i) => i + 1))
    // Every id is distinct — a source cited in several fields is numbered once.
    expect(new Set(entries.map(e => e.id)).size).toBe(entries.length)
    // The multi-source "(Ettinger Ch 294; Boland 2017)" parenthetical resolved both.
    expect(entries.map(e => e.id)).toEqual(expect.arrayContaining(['ettinger-ch294', 'boland-fhac']))
  })

  it('leaves no disease field citing a source that renders as literal text', () => {
    // A source name buried mid-parenthetical ("(CIBDAI / CCECAI, Ettinger Ch 262)")
    // never matches CITE, so it prints raw instead of becoming a superscript.
    const FIELDS = ['topAlert', 'severe', 'etiology', 'breed', 'age', 'sex', 'risk', 'path',
      'signs', 'conf', 'supp', 'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'ddx', 'pearl']
    const names = /Ettinger|Gelatt|AAHA|FECAVA|ACVIM|AHS \d/
    const offenders: string[] = []
    for (const d of DB.disease_page as Record<string, unknown>[]) {
      for (const f of FIELDS) {
        const text = d[f]
        if (typeof text !== 'string') continue
        for (const m of text.matchAll(/\(([^)]+)\)/g)) {
          if (names.test(m[1]) && !hasCitation(m[0])) offenders.push(`${String(d.id)} ${f}: ${m[0]}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
