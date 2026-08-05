// ── Species sibling pages ───────────────────────────────────────────────────
// Some conditions are authored as ONE combined `Dog + Cat` page; others as two
// separate species pages, because the disease is different enough that sharing
// a page would be misleading (feline hyperthyroidism is a benign adenomatous
// hyperplasia; canine hyperthyroidism is usually a carcinoma).
//
// This map is what lets the Dog/Cat toggle behave the same either way: on a
// combined page it filters content in place, on a paired page it navigates to
// the sibling. Without it the toggle would dead-end on exactly the conditions
// where the species difference matters most.

import type { Species, SpeciesMode } from '../lib/species'

/** Clinical judgement overriding the derived toggle mode.
 *
 *  speciesMode() measures how much of a page's text is species-specific, which
 *  is a proxy for "is this a different disease per species" — and a proxy can
 *  be wrong. Calcium oxalate urolithiasis reads as divergent because dog and
 *  cat signalment and epidemiology differ, but the diagnostic workup and the
 *  treatment are the same, so a species chooser adds a step and answers
 *  nothing. Nothing is hidden by forcing 'shared': that mode does no filtering.
 *
 *  Use sparingly, and only where a clinician has looked at both tabs. */
export const SPECIES_MODE_OVERRIDE: Readonly<Record<string, SpeciesMode>> = {
  // Same dissolution-is-impossible workup and same management in both species;
  // the differences are epidemiological, not clinical.
  'DIS-URO-UROLITH-OXAL': 'shared',
  // The neurotoxicity — mechanism, risk factors, withdrawal, seizure control —
  // is identical in both species; only the feline retinal ceiling differs, and
  // that caveat reads better inline than behind a tab a dog case never opens.
  'DIS-TOX-FQ': 'shared',
}

/** disease id → the sibling page covering the other species. */
export const SPECIES_PAIRS: Readonly<Record<string, string>> = {
  'DIS-ENDO-HYPERTHY': 'DIS-ENDO-HYPERTHY-DOG',
  'DIS-ENDO-HYPERTHY-DOG': 'DIS-ENDO-HYPERTHY',
  'DIS-PUPD-HAC': 'DIS-ENDO-HAC-CAT',
  'DIS-ENDO-HAC-CAT': 'DIS-PUPD-HAC',
  // NOT paired: DIS-ENDO-HYPOTHY ↔ DIS-ENDO-HYPOTHY-CAT. The combined page
  // already carries full feline content (#Cats sections in etiology, signs,
  // conf and prog), so it splits in place; a pair entry would claim it doesn't
  // cover cats. The two pages overlap — a content merge, not a toggle problem.
  'DIS-SEC-PAN-DOG': 'DIS-GI-PANCAT',
  'DIS-GI-PANCAT': 'DIS-SEC-PAN-DOG',
}

/** Conditions genuinely not reported in one species — the toggle says so
 *  outright rather than showing the other species' content under a tab that
 *  implies it applies. Keep this list short and sourced; "we haven't written it
 *  yet" is NOT the same as "it does not occur" and must not be listed here. */
export const SPECIES_ABSENT: Readonly<Record<string, { sp: Species; why: string }>> = {
  // Parvovirus and panleukopenia are distinct host-restricted parvoviruses with
  // their own pages; neither cross-tabs onto the other.
  'DIS-GI-PARVO': { sp: 'Cat', why: 'Cats get feline panleukopenia (FPV) — see @DIS-GI-FPV' },
  'DIS-GI-FPV': { sp: 'Dog', why: 'Dogs get canine parvovirus enteritis — see @DIS-GI-PARVO' },
}
