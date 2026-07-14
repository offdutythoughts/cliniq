import { describe, expect, it } from 'vitest'
import { DB } from '../../data/db'
import { formatHarvardCitations, referencesForDisease } from './diseaseReferences'

describe('formatHarvardCitations', () => {
  it('converts chapter shorthand to Harvard author-date form', () => {
    expect(formatHarvardCitations('Threshold (Ettinger Ch 127).')).toBe(
      'Threshold (Ettinger, Feldman and Côté, 2024, Ch. 127).',
    )
    expect(formatHarvardCitations('Source: Ettinger 9e.')).toBe(
      'Source: Ettinger, Feldman and Côté, 2024.',
    )
  })
})

describe('referencesForDisease', () => {
  it('adds the ophthalmology source to eye disease pages', () => {
    const disease = DB.disease_page.find(row => row.id === 'DIS-EYE-GLAU')
      ?? DB.disease_page.find(row => DB.lesion_type.some(lesion => lesion.dis === row.id && lesion.loc.startsWith('LOC-RE-')))

    expect(disease).toBeDefined()
    expect(referencesForDisease({ disease: disease!, lesions: DB.lesion_type }).map(reference => reference.id))
      .toContain('gelatt-2021')
  })

  it('keeps the general internal-medicine source on every page', () => {
    const disease = DB.disease_page[0]
    expect(referencesForDisease({ disease, lesions: DB.lesion_type }).map(reference => reference.id))
      .toContain('ettinger-2024')
  })
})
