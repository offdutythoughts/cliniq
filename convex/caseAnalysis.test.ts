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
