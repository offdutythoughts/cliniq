// Validates that every disease page actually HAS the sections a clinician
// expects to find on it, and that a section carrying more than one idea is
// separated into bullets rather than run together as a paragraph.
//
// The section stack is defined once, in src/app/screens/diseaseSections.tsx.
// This lint checks the data behind it: <ClinicalSections> renders nothing for
// an empty field, so a page missing `prog` silently loses its Prognosis card
// with no error anywhere. That is exactly the failure this catches.
//
// Bullet form is enforced only where it can be checked mechanically. The
// renderer puts every field into bullets — authored `|` markup first, else the
// sentence splitter (src/app/screens/pearlSplit.ts). What it CANNOT do is
// break up a single long sentence, so this lint flags a long field that yields
// only one bullet: that is prose an author has to separate by hand.

import { DB } from '../src/data/db'
import { splitSentences } from '../src/app/screens/pearlSplit'

/** Sections a disease page must have. The renderer drops any that is empty. */
const REQUIRED = [
  ['etiology', 'Etiology'],
  ['path', 'Pathophysiology'],
  ['signs', 'Clinical Signs'],
  ['conf', 'Diagnostic Investigation'],
  ['tx1', 'Treatment'],
  ['prog', 'Prognosis'],
  ['pearl', 'Clinical pearls'],
] as const

/** Every field the section stack renders as bullets — required or not. */
const BULLETED = [
  'etiology', 'risk', 'path', 'signs', 'conf', 'supp',
  'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'ddx', 'pearl',
] as const

/** A field longer than this that still yields one bullet is a wall of prose.
 *  Set above the longest legitimate single-idea causal chain in the DB (the
 *  `→ … → …` pathophysiology one-liners, which read correctly as one bullet). */
const PROSE_LIMIT = 340

let errors = 0
let warnings = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}
function warn(msg: string) {
  console.warn(`  ⚠ ${msg}`)
  warnings++
}

const text = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

for (const d of DB.disease_page) {
  for (const [field, label] of REQUIRED) {
    if (!text(d[field])) fail(`[${d.id}] "${d.name}" has no ${field} — the ${label} section will not render at all.`)
  }
  for (const field of BULLETED) {
    const v = text(d[field])
    if (v.length > PROSE_LIMIT && splitSentences(v).length === 1) {
      warn(`[${d.id}] ${field} is ${v.length} chars in a single bullet — separate the ideas with '|'.`)
    }
  }
}

console.log(
  errors > 0
    ? `\n${errors} disease-section error(s) found${warnings ? `, ${warnings} warning(s)` : ''}.`
    : `✓ All ${DB.disease_page.length} disease pages have every required section${warnings ? ` (${warnings} warning(s))` : ''}.`,
)
if (errors > 0) process.exit(1)
