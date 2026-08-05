import { describe, expect, it } from 'vitest'
import {
  classifyItem, groupItems, groupingSkipReason, splitItems, toGroupedMarkup,
} from './clinicalGrouping'

// The Cushing's page — the shape that motivated the grouper: a run-on prose
// list of signs, and a run-on prose list of supportive tests.
const HAC_SIGNS = 'PU/PD, polyphagia, pot-belly, truncal alopecia, calcinosis cutis, hepatomegaly, exercise intolerance, panting, muscle wasting, pendulous abdomen.'
const HAC_SUPP = 'Biochemistry (elevated ALP, ALT, cholesterol, fasting glucose), haematology (stress leucogram, eosinopenia), urinalysis (dilute urine, proteinuria, glucosuria), urine culture (prone to UTI), abdominal ultrasound (bilateral adrenomegaly, hepatomegaly).'

describe('splitItems', () => {
  it('splits a prose list on top-level commas', () => {
    expect(splitItems(HAC_SIGNS, 'signs')).toEqual([
      'PU/PD', 'Polyphagia', 'Pot-belly', 'Truncal alopecia', 'Calcinosis cutis',
      'Hepatomegaly', 'Exercise intolerance', 'Panting', 'Muscle wasting', 'Pendulous abdomen',
    ])
  })

  it('ignores commas inside parentheses', () => {
    expect(splitItems(HAC_SUPP, 'diagnostics')).toEqual([
      'Biochemistry (elevated ALP, ALT, cholesterol, fasting glucose)',
      'Haematology (stress leucogram, eosinopenia)',
      'Urinalysis (dilute urine, proteinuria, glucosuria)',
      'Urine culture (prone to UTI)',
      'Abdominal ultrasound (bilateral adrenomegaly, hepatomegaly)',
    ])
  })

  it('splits sentences, then clauses on semicolons', () => {
    expect(splitItems('Vomiting; diarrhoea. Pyrexia; lethargy.', 'signs'))
      .toEqual(['Vomiting', 'Diarrhoea', 'Pyrexia', 'Lethargy'])
  })

  it('splits comma-lists nested inside pipe segments', () => {
    const items = splitItems('Often subclinical|Reduced activity, anorexia, hiding, tachypnoea', 'signs')
    expect(items).toEqual(['Often subclinical', 'Reduced activity', 'Anorexia', 'Hiding', 'Tachypnoea'])
  })

  it('leaves a descriptive clause whole rather than shredding it on commas', () => {
    const clause = 'Inspiratory stridor — high-pitched, worse with exertion, heat or excitement'
    expect(splitItems(clause, 'signs')).toEqual([clause])
  })

  it('keeps a qualified statement whole — its commas enumerate inside the qualifier', () => {
    // Splitting this would file "dysphagia" under Gastrointestinal as a plain
    // sign, dropping the "Rarely: brainstem involvement →" that scopes it.
    const qualified = 'Rarely: brainstem involvement → cranial nerve deficits (CN VII), dysphagia, vestibular signs, nystagmus'
    expect(splitItems(qualified, 'signs')).toEqual([qualified])
  })

  it('still splits a plain list that merely contains a dash inside brackets', () => {
    const text = 'Radiography (lateral view — low threshold), CT, MRI, ultrasound'
    expect(splitItems(text, 'diagnostics')).toHaveLength(4)
  })

  it('keeps a -sub segment welded to the bullet it details', () => {
    const items = splitItems('Vomiting|-often bile-stained|Diarrhoea', 'signs')
    expect(items).toEqual(['Vomiting|-often bile-stained', 'Diarrhoea'])
  })

  it('capitalises prose entries but leaves internally-capitalised terms alone', () => {
    expect(splitItems('cTLI, B12, folate, cobalamin', 'diagnostics'))
      .toEqual(['cTLI', 'B12', 'Folate', 'Cobalamin'])
  })
})

describe('classifyItem', () => {
  it('places signs by body system', () => {
    expect(classifyItem('Truncal alopecia', 'signs')).toBe('Dermatological')
    expect(classifyItem('PU/PD', 'signs')).toBe('Urogenital')
    expect(classifyItem('Panting', 'signs')).toBe('Respiratory')
    expect(classifyItem('Pendulous abdomen', 'signs')).toBe('Gastrointestinal')
  })

  it('places diagnostics by modality', () => {
    expect(classifyItem('Haematology (stress leucogram)', 'diagnostics')).toBe('Bloods')
    expect(classifyItem('Abdominal ultrasound', 'diagnostics')).toBe('Imaging')
    expect(classifyItem('Urine culture (prone to UTI)', 'diagnostics')).toBe('Urine')
  })

  it('lets the strongest signal win when several groups match', () => {
    // "cortisol" and "creatinine" are blood analytes, but the sample is urine.
    expect(classifyItem('Urine cortisol:creatinine ratio', 'diagnostics')).toBe('Urine')
    // Conversely, three blood assays outweigh the one urine test named.
    expect(classifyItem('Biochemistry + haematology + urinalysis', 'diagnostics')).toBe('Bloods')
    // A trailing rule-out never outranks the test that carries it.
    expect(classifyItem('Total T4 — exclude hyperthyroidism', 'diagnostics')).toBe('Bloods')
  })

  it('scores the bullet, not its sub-detail', () => {
    expect(classifyItem('Thoracic radiographs|-exclude pulmonary metastases', 'diagnostics')).toBe('Imaging')
  })

  it('returns null for text it does not recognise', () => {
    expect(classifyItem('Otherwise well systemically', 'signs')).toBeNull()
  })
})

describe('groupItems', () => {
  it('groups the Cushing signs by system, in canonical order', () => {
    const { groups, otherCount } = groupItems(HAC_SIGNS, 'signs')
    expect(otherCount).toBe(0)
    expect(groups.map(g => g.label)).toEqual([
      'Systemic', 'Respiratory', 'Gastrointestinal', 'Urogenital', 'Musculoskeletal', 'Dermatological',
    ])
    expect(groups.find(g => g.label === 'Gastrointestinal')?.items)
      .toEqual(['Pot-belly', 'Hepatomegaly', 'Pendulous abdomen'])
  })

  it('groups the Cushing supportive diagnostics by modality', () => {
    const { groups } = groupItems(HAC_SUPP, 'diagnostics')
    expect(groups.map(g => g.label)).toEqual(['Bloods', 'Urine', 'Imaging'])
    expect(groups[1].items).toHaveLength(2)
  })

  it('lifts a safety warning out of the groups instead of burying it', () => {
    const text = 'Ataxia|Tetraparesis|Cervical hyperaesthesia|Reluctance to move|⚠️ Manipulate the cervical spine with extreme caution'
    const { pinned, groups } = groupItems(text, 'signs')
    expect(pinned).toEqual(['⚠️ Manipulate the cervical spine with extreme caution'])
    expect(groups.flatMap(g => g.items)).not.toContainEqual(expect.stringContaining('⚠️'))
    // …and it renders ahead of the first header.
    expect(toGroupedMarkup(text, 'signs')?.startsWith('⚠️ Manipulate')).toBe(true)
  })

  it('is order-independent — source order does not change the group order', () => {
    const reversed = splitItems(HAC_SIGNS, 'signs').reverse().join('|')
    expect(groupItems(reversed, 'signs').groups.map(g => g.label))
      .toEqual(groupItems(HAC_SIGNS, 'signs').groups.map(g => g.label))
  })
})

describe('toGroupedMarkup', () => {
  it('emits pipe-markup with # headers', () => {
    expect(toGroupedMarkup(HAC_SUPP, 'diagnostics')).toBe(
      '#Bloods|Biochemistry (elevated ALP, ALT, cholesterol, fasting glucose)|Haematology (stress leucogram, eosinopenia)'
      + '|#Urine|Urinalysis (dilute urine, proteinuria, glucosuria)|Urine culture (prone to UTI)'
      + '|#Imaging|Abdominal ultrasound (bilateral adrenomegaly, hepatomegaly)',
    )
  })

  it('never emits a bare header — every group carries at least one item', () => {
    const markup = toGroupedMarkup(HAC_SIGNS, 'signs') as string
    const segments = markup.split('|')
    segments.forEach((seg, i) => {
      if (seg.startsWith('#')) expect(segments[i + 1]?.startsWith('#')).toBe(false)
    })
    expect(segments.at(-1)?.startsWith('#')).toBe(false)
  })

  it('preserves @-links and citation markers inside items', () => {
    const text = 'Vomiting, diarrhoea, melaena, lethargy, pyrexia, ataxia (Ettinger Ch 12), @DIS-GI-IBD:IBD'
    const markup = toGroupedMarkup(text, 'signs') as string
    expect(markup).toContain('(Ettinger Ch 12)')
    expect(markup).toContain('@DIS-GI-IBD:IBD')
  })
})

describe('confidence thresholds', () => {
  it('leaves an authored #-header field untouched', () => {
    const authored = '#Acute|Vomiting|Collapse|#Chronic|Weight loss|Diarrhoea'
    expect(groupingSkipReason(authored, 'signs')).toBe('authored')
    expect(toGroupedMarkup(authored, 'signs')).toBeNull()
  })

  it('leaves a short list flat', () => {
    expect(groupingSkipReason('Vomiting|Diarrhoea|Lethargy', 'signs')).toBe('too-few-items')
  })

  it('leaves a single-system list flat', () => {
    expect(groupingSkipReason('Vomiting|Diarrhoea|Melaena|Haematochezia', 'signs')).toBe('too-few-groups')
  })

  it('falls back when too much of the text is unclassifiable', () => {
    const vague = 'Owners report a vague history|Signs wax and wane|Often found incidentally|Vomiting'
    expect(groupingSkipReason(vague, 'signs')).toBe('low-coverage')
    expect(toGroupedMarkup(vague, 'signs')).toBeNull()
  })

  it('falls back when grouping would only relabel a list one item at a time', () => {
    expect(groupingSkipReason('Vomiting|Panting|Alopecia|Lameness', 'signs')).toBe('all-singletons')
  })

  it('handles empty and whitespace fields', () => {
    expect(toGroupedMarkup('', 'signs')).toBeNull()
    expect(toGroupedMarkup('   ', 'diagnostics')).toBeNull()
    expect(splitItems('', 'signs')).toEqual([])
  })
})
