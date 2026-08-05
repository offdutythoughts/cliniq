'use client'
// Dog/Cat segmented control for the disease page. Cat is always the left half
// and Dog the right, on every page — a control whose options reorder by page
// content is one you have to re-read every time.
//
// It renders only where choosing actually changes what you read:
//   · mode 'split'  — one page, clinically different per species → filter here
//   · paired pages  — two pages (feline vs canine hyperthyroidism) → navigate
// Pages where both species share a workup (CKD) keep the plain 'Dog + Cat' tag,
// so the toggle's presence is itself the signal that the species matters.

import { SPECIES, rareSpecies, type Species, type SpeciesMode } from '../../lib/species'
import { SPECIES_ABSENT, SPECIES_PAIRS } from '../../data/speciesPairs'
import { Linkify } from './markup'

export function SpeciesToggle({ current, covered, onSelect }: {
  current: Species
  /** Species reachable from here — this page's own, plus any sibling page's. */
  covered: Species[]
  onSelect: (sp: Species) => void
}) {
  return (
    <div className="sp-toggle" role="group" aria-label="Species">
      {SPECIES.map(sp => (
        <button
          key={sp}
          type="button"
          data-sp={sp}
          data-absent={covered.includes(sp) ? undefined : '1'}
          aria-current={sp === current}
          onClick={() => onSelect(sp)}
        >
          {sp}
        </button>
      ))}
    </div>
  )
}

/** The line under the toggle. Says why the chosen species has no content of its
 *  own, or that it is rare there. Silence would let shared text read as
 *  species-specific advice when it isn't. */
export function SpeciesNote({ id, sp, pageSp, covered, mode }: {
  id: string
  sp: Species
  pageSp: string
  covered: Species[]
  mode: SpeciesMode
}) {
  const absent = SPECIES_ABSENT[id]
  if (absent && absent.sp === sp) {
    return <div className="sp-note">Not reported in {plural(sp)}. <Linkify text={absent.why} /></div>
  }
  if (!covered.includes(sp)) {
    return <div className="sp-note">Written for {plural(other(sp))} — no {sp.toLowerCase()}-specific data recorded yet.</div>
  }
  if (rareSpecies(pageSp) === sp) {
    return <div className="sp-note">Uncommon in {plural(sp)} — reported but far less often than in {plural(other(sp))}.</div>
  }
  // Only meaningful when ONE page covers both species. A single-species page
  // reached via its sibling has nothing to differentiate — the two species live
  // on two pages, which is the point.
  if (mode === 'shared') {
    return <div className="sp-note">Shared content — no dog/cat differences recorded for this page yet.</div>
  }
  return null
}

const other = (sp: Species): Species => (sp === 'Cat' ? 'Dog' : 'Cat')
const plural = (sp: Species): string => (sp === 'Cat' ? 'cats' : 'dogs')

/** The page a species pick lands on: the sibling page when this one doesn't
 *  cover that species, otherwise this page. */
export function pageForSpecies(id: string, sp: Species, ownCovered: Species[]): string {
  if (ownCovered.includes(sp)) return id
  return SPECIES_PAIRS[id] ?? id
}
