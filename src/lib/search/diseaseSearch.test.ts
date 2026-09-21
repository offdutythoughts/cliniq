import { describe, it, expect } from 'vitest'
import { searchDiseases, topDifferentials, type SearchInputs } from './diseaseSearch'
import { PREVALENCE, prevalenceFactor } from './prevalence'
import { DB } from '../../data/db'

const search = (over: Partial<SearchInputs>) =>
  searchDiseases({ species: 'all', breedQuery: '', signKeywords: [], diagKeywords: [], ...over })

/** Every result, globally ranked. */
const ranked = (over: Partial<SearchInputs>) => topDifferentials(search(over), Infinity)

const rankOf = (id: string, over: Partial<SearchInputs>) =>
  ranked(over).findIndex(r => r.disease.id === id) + 1 // 0 = absent

/** The history that motivated all three fixes: a cat with classic diabetes signs. */
const FELINE_DM: Partial<SearchInputs> = {
  species: 'cat',
  signKeywords: ['pu/pd', 'weight loss', 'uti', 'polyphagia'],
}

describe('whole-term matching', () => {
  it('does not match a keyword inside a longer word', () => {
    // "uti" used to match `calcinosis cutis` on the feline hyperadrenocorticism
    // page, `caution` on ototoxicity, and `routine` on a dozen more — 43 of 389
    // pages matched, only 9 of them meaningfully.
    const hits = ranked({ species: 'cat', signKeywords: ['uti'] })
    expect(hits.length).toBeGreaterThan(0)

    const searched = (d: (typeof DB.disease_page)[number]) =>
      ['signs', 'severe', 'synonyms', 'path', 'etiology']
        .map(k => (d[k] as string | undefined) ?? '').join(' ')

    for (const r of hits) {
      expect(/(^|[^a-z0-9])utis?($|[^a-z0-9])/i.test(searched(r.disease))).toBe(true)
    }
  })

  it('drops pages whose only hit was a substring', () => {
    const names = ranked(FELINE_DM).map(r => r.disease.name as string)
    // Both scored solely via `caution` on "use with extreme caution".
    expect(names).not.toContain('Ototoxicity')
    expect(names).not.toContain('Feline Panleukopenia')
  })

  it('keeps a page whose remaining hit is genuine, but demoted', () => {
    // Bacterial pneumonia really does list weight loss, so it stays on the
    // list — it just loses the phantom `uti` point that had it level with the
    // endocrine differentials.
    const bp = ranked(FELINE_DM).find(r => r.disease.name === 'Bacterial Pneumonia')!
    expect(bp.matchedSignTerms).toEqual(['weight loss'])
    expect(bp.score).toBeLessThan(ranked(FELINE_DM)[0].score / 2)
  })

  it('tolerates separator spelling in a multi-word term', () => {
    const viaSlash = ranked({ species: 'cat', signKeywords: ['pu/pd'] }).length
    expect(ranked({ species: 'cat', signKeywords: ['pu-pd'] }).length).toBe(viaSlash)
    expect(ranked({ species: 'cat', signKeywords: ['pu / pd'] }).length).toBe(viaSlash)
  })

  it('still matches a genuine whole-word abbreviation', () => {
    const ids = ranked({ species: 'cat', signKeywords: ['uti'] }).map(r => r.disease.id)
    expect(ids).toContain('DIS-URO-UTI')
  })
})

describe('IDF weighting', () => {
  it('scores a rare sign above a common one', () => {
    // `polyphagia` appears in 7 cat pages, `weight loss` in 65. Under the old
    // flat +2 per term they were worth exactly the same.
    const rare = ranked({ species: 'cat', signKeywords: ['polyphagia'] })[0]
    const common = ranked({ species: 'cat', signKeywords: ['weight loss'] })[0]
    expect(rare.evidence).toBeGreaterThan(common.evidence)
  })

  it('ranks the disease matching more specific signs higher', () => {
    const r = ranked(FELINE_DM)
    const dm = r.find(x => x.disease.id === 'DIS-ENDO-DM')!
    const generic = r.find(x => x.disease.id === 'DIS-INFECT-LEPTO')!
    expect(dm.evidence).toBeGreaterThan(generic.evidence)
  })
})

describe('prevalence prior', () => {
  it('is neutral for an unrated disease', () => {
    expect(PREVALENCE['DIS-HEP-PSS']).toBeUndefined()
    expect(prevalenceFactor('DIS-HEP-PSS', 'cat')).toBe(1)
  })

  it('takes the most favourable tier when species is not narrowed', () => {
    // Leptospirosis: uncommon in dogs, very rare in cats.
    expect(prevalenceFactor('DIS-INFECT-LEPTO', 'cat')).toBeLessThan(1)
    expect(prevalenceFactor('DIS-INFECT-LEPTO', 'all')).toBe(1)
  })

  it('puts feline diabetes above feline Cushing\'s on the motivating history', () => {
    const r = ranked(FELINE_DM)
    expect(rankOf('DIS-ENDO-DM', FELINE_DM)).toBeLessThan(rankOf('DIS-ENDO-HAC-CAT', FELINE_DM))
    expect(r[0].disease.id).toBe('DIS-ENDO-DM')
  })

  it('reorders but never excludes — the rare disease is still listed', () => {
    // Feline hyperadrenocorticism matches the history just as well as diabetes
    // does; it is demoted, not hidden. Suppressing the zebra that fits is the
    // failure mode that actually matters.
    const hac = ranked(FELINE_DM).find(r => r.disease.id === 'DIS-ENDO-HAC-CAT')
    expect(hac).toBeDefined()
    expect(hac!.evidence).toBeGreaterThan(0)      // the history does fit it
    expect(hac!.prevalence).toBeLessThan(1)       // and it is demoted
    expect(hac!.score).toBeLessThan(hac!.evidence) // by the prior, not by the evidence
  })

  it('lets strong evidence for a rare disease beat weak evidence for a common one', () => {
    // A very-rare disease matching a specific history must still outrank a
    // common disease matching one vague sign.
    const strongRare = ranked({ species: 'cat', signKeywords: ['pu/pd', 'weight loss', 'polyphagia'] })
      .find(r => r.disease.id === 'DIS-ENDO-HAC-CAT')!
    const weakCommon = ranked({ species: 'cat', signKeywords: ['weight loss'] })
      .find(r => r.disease.id === 'DIS-SEC-CKD')!
    expect(strongRare.score).toBeGreaterThan(weakCommon.score)
  })

  it('cannot change how many diseases are returned', () => {
    // Inclusion is decided on evidence, before the prior is applied.
    const withPrior = search(FELINE_DM).reduce((n, g) => n + g.items.length, 0)
    const everyMatch = ranked(FELINE_DM).filter(r => r.evidence > 0).length
    expect(withPrior).toBe(everyMatch)
  })

  it('never produces a negative or zero score for a matched disease', () => {
    for (const r of ranked(FELINE_DM)) expect(r.score).toBeGreaterThan(0)
  })

  it('surfaces the classic older-cat differentials on signalment alone', () => {
    const top = topDifferentials(search({ species: 'cat', ageCategory: 'geriatric' }), 6)
      .map(r => r.disease.id)
    expect(top).toContain('DIS-SEC-CKD')
    expect(top).toContain('DIS-ENDO-HYPERTHY')
    expect(top).toContain('DIS-ENDO-DM')
  })
})

describe('topDifferentials', () => {
  it('ranks globally, across the aetiology groups', () => {
    const groups = search(FELINE_DM)
    const top = topDifferentials(groups, 5)
    expect(top).toHaveLength(5)
    for (let i = 1; i < top.length; i++) {
      expect(top[i - 1].score).toBeGreaterThanOrEqual(top[i].score)
    }
    // The best match outranks the first item of the first-rendered group.
    expect(top[0].score).toBeGreaterThanOrEqual(groups[0].items[0].score)
  })

  it('returns nothing for an empty search', () => {
    expect(topDifferentials(search({}), 5)).toEqual([])
  })
})

describe('input hygiene', () => {
  it('ignores a one-character term', () => {
    expect(search({ species: 'cat', signKeywords: ['a'] })).toEqual([])
  })

  it('returns nothing for a term that matches no page', () => {
    expect(search({ species: 'cat', signKeywords: ['zzzznotasign'] })).toEqual([])
  })
})
