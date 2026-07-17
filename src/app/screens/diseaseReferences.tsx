import type { DiseaseRow, LesionRow } from '../../data/db'

export interface DiseaseReference {
  id: 'ettinger-2024' | 'gelatt-2021'
  text: string
}

export const ETTINGER_REFERENCE: DiseaseReference = {
  id: 'ettinger-2024',
  text: 'Ettinger, S.J., Feldman, E.C. and Côté, E. (eds.) (2024) Ettinger’s Textbook of Veterinary Internal Medicine. 9th edn. Elsevier.',
}

export const GELATT_REFERENCE: DiseaseReference = {
  id: 'gelatt-2021',
  text: 'Gelatt, K.N., Ben-Shlomo, G., Gilger, B.C., Hendrix, D.V.H., Kern, T.J. and Plummer, C.E. (eds.) (2021) Veterinary Ophthalmology. 6th edn. Wiley-Blackwell.',
}

const OPHTHALMIC_LOCATION_PREFIXES = ['LOC-RE-', 'LOC-AP-', 'LOC-BL-', 'LOC-WE-']

/** Convert legacy source shorthand into an author-date citation for display. */
export function formatHarvardCitations(text: string): string {
  return text
    .replace(/Ettinger(?: 9e)? Ch(?:apter)?\s+(\d+)/gi, 'Ettinger, Feldman and Côté, 2024, Ch. $1')
    .replace(/Ettinger 9e/gi, 'Ettinger, Feldman and Côté, 2024')
}

/** Return the bibliography entries applicable to a disease page. */
export function referencesForDisease(params: {
  disease: DiseaseRow
  lesions: LesionRow[]
}): DiseaseReference[] {
  const isOphthalmic = params.lesions.some(lesion => {
    return lesion.dis === params.disease.id
      && OPHTHALMIC_LOCATION_PREFIXES.some(prefix => lesion.loc.startsWith(prefix))
  })

  return isOphthalmic
    ? [ETTINGER_REFERENCE, GELATT_REFERENCE]
    : [ETTINGER_REFERENCE]
}
