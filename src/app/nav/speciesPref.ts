'use client'
// Which species a disease page opens on.
//
// Precedence, highest first:
//   1. the View's own `sp` — the link that got here knew the answer (a
//      `sp:'Cat'` differential, a flow chip, the toggle itself)
//   2. the page's sole species — a Cat-only page never opens on Dog
//   3. the reader's last pick — carries a cat-practice reader across pages
//      reached from search or the disease index, where nothing else knows
//   4. Dog
//
// Rule 1 above rule 3 is what keeps "usually feline hyperthyroidism" opening on
// Cat even for a reader who last looked at a dog, and vice versa for Cushing's.

import { soleSpecies, speciesOf, type Species } from '../../lib/species'

// Module-level rather than React state: the preference has to survive
// unmount/remount as the reader navigates between pages, but it is deliberately
// not persisted — it is a within-session convenience, not a setting.
let lastPick: Species | null = null

export function rememberSpecies(sp: Species): void {
  lastPick = sp
}

/** Reset — used by tests to stop one case leaking into the next. */
export function forgetSpecies(): void {
  lastPick = null
}

export function resolveSpecies(viewSp: Species | undefined, pageSp: string | undefined): Species {
  if (viewSp) return viewSp
  const sole = soleSpecies(pageSp)
  if (sole) return sole
  if (lastPick && speciesOf(pageSp).includes(lastPick)) return lastPick
  return 'Dog'
}
