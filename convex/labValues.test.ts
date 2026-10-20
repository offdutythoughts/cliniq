import { describe, it, expect } from 'vitest'
import { readCalcium, readGlucose, withLabKeywords } from './labValues'
import { cleanProblemList } from './caseAnalysis'

describe('readGlucose', () => {
  it('reads the value however the notes word it', () => {
    // Each of these reached the extraction as a different keyword.
    for (const text of [
      'elevated glucose 6.1mmol/l',
      'Glucose: 6.1 mmol/L (H)',
      'BG 6.1',
      'blood glucose was 6.1 mmol / L',
      'glu 6,1',
      'mild hyperglycaemia (blood sugar 110 mg/dL)',
    ]) {
      const [g] = readGlucose(text, 'dog')
      expect(g, text).toBeDefined()
      expect(g.value, text).toBeCloseTo(6.1, 0)
      expect(g.grade, text).toBe('stress-range')
    }
  })

  it('converts mg/dL, and reads a unitless value over 40 as mg/dL', () => {
    expect(readGlucose('glucose 450 mg/dl', 'dog')[0].value).toBe(25)
    expect(readGlucose('BG 450', 'dog')[0].value).toBe(25)
  })

  it('grades against the species renal threshold', () => {
    expect(readGlucose('glucose 12 mmol/L', 'dog')[0].grade).toBe('diabetic-range')
    expect(readGlucose('glucose 12 mmol/L', 'cat')[0].grade).toBe('stress-range')
    expect(readGlucose('glucose 12 mmol/L', 'all')[0].grade).toBe('diabetic-range')
    expect(readGlucose('glucose 2.1 mmol/L', 'dog')[0].grade).toBe('low')
  })

  it('ignores glucosuria and words with no number', () => {
    expect(readGlucose('glucosuria 3+', 'dog')).toEqual([])
    expect(readGlucose('glucose curve planned', 'dog')).toEqual([])
    expect(readGlucose('elevated glucose\nCK 590', 'dog')).toEqual([])
  })
})

describe('the glucose secondary rule, with a value', () => {
  const kws = ['seizures', 'hypocalcemia', 'hyperglycemia']
  const list = { key: kws, secondary: [], patterns: [] }

  it('reads a stress-range value as stress even beside PU/PD', () => {
    const k = [...kws, 'PU/PD']
    const p = cleanProblemList({ ...list, key: k }, k, [], readGlucose('glucose 6.1 mmol/L', 'dog'))
    expect(p.key).not.toContain('hyperglycemia')
    expect(p.secondary.find(x => x.term === 'hyperglycemia')?.explainedBy).toMatch(/^stress \(6\.1 mmol\/L/)
  })

  it('never writes off a diabetic-range value as stress', () => {
    // Without the value this used to be demoted on wording alone.
    const p = cleanProblemList(list, kws, [], readGlucose('glucose 25 mmol/L', 'dog'))
    expect(p.key).toContain('hyperglycemia')
  })

  it('keeps a stress-range value key when there is glucosuria', () => {
    const k = [...kws, 'glucosuria']
    const p = cleanProblemList({ ...list, key: k }, k, [], readGlucose('glucose 8 mmol/L', 'dog'))
    expect(p.key).toContain('hyperglycemia')
  })

  it('falls back to the wording rule when the notes give no number', () => {
    expect(cleanProblemList(list, kws).key).not.toContain('hyperglycemia')
    const k = [...kws, 'PU/PD']
    expect(cleanProblemList({ ...list, key: k }, k).key).toContain('hyperglycemia')
  })
})

describe('applyKeyRules — the defining findings stay key', () => {
  const kws = ['seizures', 'stiff hindlimb gait', 'hypocalcemia', 'hyperphosphatemia', 'elevated CK', 'stress leukogram']

  it('promotes hypocalcaemia the model called secondary to seizures or stress, and adds the pattern', () => {
    // Live run, shorthand version of the Airedale notes.
    const p = cleanProblemList({
      key: ['seizures', 'stiff hindlimb gait'],
      secondary: [
        { term: 'hypocalcemia', explainedBy: 'stress' },
        { term: 'hyperphosphatemia', explainedBy: 'stress' },
        { term: 'elevated CK', explainedBy: 'seizures' },
      ],
      patterns: [],
    }, kws)
    expect(p.key).toEqual(expect.arrayContaining(['hypocalcemia', 'hyperphosphatemia']))
    expect(p.secondary.map(x => x.term)).toEqual(['elevated CK', 'stress leukogram'])
    expect(p.patterns).toEqual([{ name: 'hypocalcaemia with hyperphosphataemia', terms: ['hypocalcemia', 'hyperphosphatemia'] }])
  })

  it('reads the pair however it is worded', () => {
    const k = ['seizures', 'low calcium', 'elevated phosphorus']
    const p = cleanProblemList({ key: ['seizures'], secondary: [], patterns: [] }, k)
    expect(p.patterns[0]?.terms).toEqual(['low calcium', 'elevated phosphorus'])
  })

  it('does not add a pattern that is already there, or one missing a half', () => {
    const pat = [{ name: 'Ca/P', terms: ['hypocalcemia', 'hyperphosphatemia'] }]
    expect(cleanProblemList({ key: kws, secondary: [], patterns: pat }, kws).patterns).toEqual(pat)
    expect(cleanProblemList({ key: ['seizures'], secondary: [], patterns: [] }, ['seizures', 'hyperphosphatemia']).patterns).toEqual([])
  })
})

describe('applyKeyRules — a specific explanation stands', () => {
  it('leaves low calcium secondary to hypoalbuminaemia, with no pattern', () => {
    const k = ['vomiting', 'hypoalbuminemia', 'hypocalcemia', 'hyperphosphatemia']
    const p = cleanProblemList({
      key: ['vomiting', 'hypoalbuminemia', 'hyperphosphatemia'],
      secondary: [{ term: 'hypocalcemia', explainedBy: 'hypoalbuminemia' }],
      patterns: [],
    }, k)
    expect(p.secondary).toEqual([{ term: 'hypocalcemia', explainedBy: 'hypoalbuminemia' }])
    expect(p.patterns).toEqual([])
  })
})

describe('readCalcium', () => {
  it('reads a low calcium however it is written', () => {
    for (const text of [
      'calcium 1.0 mmol/L',
      'Ca 1.0',
      'Ca++: 1.0 mmol/l',
      'hypocalcemia 1.0mmol/l',
      'total calcium 4.0 mg/dL (low)',
      'tCa 1.2',
      'iCa 0.6 mmol/L',
    ]) {
      const [c] = readCalcium(text)
      expect(c, text).toBeDefined()
      expect(c.grade, text).toBe('low')
    }
  })

  it('reports nothing above the cutoff, or for an ionised value above 0.8', () => {
    expect(readCalcium('calcium 2.4 mmol/L')).toEqual([])
    expect(readCalcium('total calcium 9.8 mg/dL')).toEqual([])
    expect(readCalcium('ionised calcium 1.0 mmol/L')).toEqual([])
  })

  it('does not read a dose, a salt, a unitless 2–5, or a distant "ca"', () => {
    expect(readCalcium('calcium gluconate 10% 1 mL/kg')).toEqual([])
    expect(readCalcium('calcium carbonate 25 mg/kg PO')).toEqual([])
    expect(readCalcium('Ca 3.0')).toEqual([])
    expect(readCalcium('SCC/ca of the digit, 1.0 cm')).toEqual([])
  })
})

describe('calcium keyword backfill', () => {
  const sign = ['seizures', 'stiff hindlimb gait']
  const labs = readCalcium('calcium 1.0 mmol/L, phosphorus 1.8 mmol/L')

  it('adds hypocalcemia when the model extracted no calcium keyword, and makes it key', () => {
    const diag = withLabKeywords(['elevated CK'], sign, labs)
    expect(diag).toContain('hypocalcemia')
    const p = cleanProblemList({ key: sign, secondary: [], patterns: [] }, [...sign, ...diag], sign, labs)
    expect(p.key).toContain('hypocalcemia')
  })

  it('adds nothing when the model already wrote it in any form', () => {
    expect(withLabKeywords(['low calcium'], sign, labs)).toEqual(['low calcium'])
  })

  it('forms the Ca/P pattern when the model did extract high phosphate', () => {
    const diag = withLabKeywords(['hyperphosphatemia'], sign, labs)
    const p = cleanProblemList({ key: sign, secondary: [], patterns: [] }, [...sign, ...diag], sign, labs)
    expect(p.patterns[0]?.terms).toEqual(['hypocalcemia', 'hyperphosphatemia'])
  })
})
