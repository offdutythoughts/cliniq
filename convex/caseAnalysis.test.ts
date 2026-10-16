import { describe, it, expect } from 'vitest'
import { cleanProblemList } from './caseAnalysis'

describe('cleanProblemList', () => {
  const keywords = ['seizure', 'stiff gait', 'hypocalcemia', 'hyperphosphatemia', 'elevated CK', 'oedema']

  it('keeps terms the model did not copy verbatim, in the keyword\'s own spelling', () => {
    const p = cleanProblemList({
      key: ['Seizures', 'stiff-gait', 'hypocalcaemia (1.0 mmol/L)', 'edema'],
      secondary: [{ term: 'elevated CK', explainedBy: 'seizures' }],
      patterns: [{ name: 'low Ca, high P', terms: ['hypocalcaemia', 'hyperphosphataemia'] }],
    }, keywords)
    expect(p.key).toEqual(['seizure', 'stiff gait', 'hypocalcemia', 'oedema'])
    expect(p.secondary).toEqual([{ term: 'elevated CK', explainedBy: 'seizures' }])
    expect(p.patterns).toEqual([{ name: 'low Ca, high P', terms: ['hypocalcemia', 'hyperphosphatemia'] }])
  })

  it('still drops a term that is not an extracted keyword', () => {
    const p = cleanProblemList({ key: ['hypoglycemia', 'seizure'], secondary: [], patterns: [] }, keywords)
    expect(p.key).toEqual(['seizure'])
  })

  it('drops a pattern left with fewer than two known components', () => {
    const p = cleanProblemList({ key: [], secondary: [], patterns: [{ name: 'x', terms: ['hypocalcemia', 'azotemia'] }] }, keywords)
    expect(p.patterns).toEqual([])
  })
})

describe('applySecondaryRules', () => {
  const kws = ['seizures', 'stiff gait', 'hypocalcemia', 'hyperphosphatemia', 'elevated CK', 'stress leukogram', 'hyperglycemia']

  it('demotes CK after seizures, a stress leukogram and lone hyperglycaemia whatever the model said', () => {
    // The live run that lost the case: no secondary findings at all.
    const p = cleanProblemList({ key: kws, secondary: [], patterns: [{ name: 'p', terms: ['hypocalcemia', 'hyperphosphatemia'] }] }, kws)
    expect(p.key).toEqual(['seizures', 'stiff gait', 'hypocalcemia', 'hyperphosphatemia'])
    expect(p.secondary).toEqual([
      { term: 'elevated CK', explainedBy: 'seizures' },
      { term: 'stress leukogram', explainedBy: 'stress' },
      { term: 'hyperglycemia', explainedBy: 'stress' },
    ])
  })

  it('keeps the model\'s own explanation when it already marked one secondary', () => {
    const p = cleanProblemList({ key: [], secondary: [{ term: 'elevated CK', explainedBy: 'tetany' }], patterns: [] }, kws)
    expect(p.secondary.find(s => s.term === 'elevated CK')).toEqual({ term: 'elevated CK', explainedBy: 'tetany' })
  })

  it('leaves CK alone without seizures or tremor', () => {
    const k = ['muscle pain', 'elevated CK', 'pigmenturia']
    expect(cleanProblemList({ key: k, secondary: [], patterns: [] }, k).key).toContain('elevated CK')
  })

  it('demotes every raised-glucose wording, but never low glucose', () => {
    for (const g of ['elevated blood glucose', 'increased glucose', 'raised glucose', 'glucose 6.1 mmol/L',
      'high-normal glucose', 'elevated BG', 'hyperglycaemia']) {
      const k = ['seizures', g]
      expect(cleanProblemList({ key: k, secondary: [], patterns: [] }, k).key).toEqual(['seizures'])
    }
    for (const g of ['hypoglycemia', 'low glucose', 'low blood glucose', 'decreased glucose', 'glucosuria']) {
      const k = ['seizures', g]
      expect(cleanProblemList({ key: k, secondary: [], patterns: [] }, k).key).toContain(g)
    }
  })

  it('leaves hyperglycaemia alone alongside glucosuria or PU/PD', () => {
    for (const ctx of ['glucosuria', 'PU/PD', 'polyuria']) {
      const k = ['hyperglycemia', ctx]
      expect(cleanProblemList({ key: k, secondary: [], patterns: [] }, k).key).toContain('hyperglycemia')
    }
  })

  it('never demotes a term the model put in a pattern', () => {
    const k = ['seizures', 'elevated CK', 'myoglobinuria']
    const p = cleanProblemList({ key: k, secondary: [], patterns: [{ name: 'rhabdo', terms: ['elevated CK', 'myoglobinuria'] }] }, k)
    expect(p.secondary).toEqual([])
  })
})
