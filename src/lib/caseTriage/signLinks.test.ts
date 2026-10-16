import { describe, it, expect } from 'vitest'
import { signLink } from './signLinks'

describe('signLink', () => {
  it('links the Airedale case problems that have a flowchart, and only those', () => {
    expect(signLink('seizures').flowId).toBe('seizures')
    expect(signLink('lethargy').flowId).toBeNull()
    expect(signLink('stiff hindlimb gait').flowId).toBeNull()
    expect(signLink('gait abnormality').flowId).toBeNull()
  })

  it('folds plurals, -ing and UK spelling', () => {
    expect(signLink('seizure').flowId).toBe('seizures')
    expect(signLink('cough').flowId).toBe('coughing')
    expect(signLink('diarrhea').flowId).toBe('diarrhoea')
    expect(signLink('generalised seizures').flowId).toBe('seizures')
  })

  it('takes an abbreviation the sign lists verbatim', () => {
    expect(signLink('PU/PD').flowId).toBe('pupd')
  })

  it('never links a lab finding through a broad keyword', () => {
    expect(signLink('hypocalcemia').flowId).toBeNull()
    expect(signLink('elevated CK').flowId).toBeNull()
  })
})
