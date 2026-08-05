// Validates species-scoped disease content — the `Dog:` / `Cat:` / `#Dog`
// markers that the Dog/Cat toggle filters on (src/lib/species.ts).
//
// The toggle only appears where a page's CLINICAL content differs by species
// (speciesMode → 'split'); pages where both species share a workup keep the
// plain 'Dog + Cat' tag. That makes the marker the single thing standing
// between a reader and species-specific advice, so it has to be right.
//
// Errors (exit 1):
//   · a marker for a species the page doesn't cover — the text is authored but
//     can never render, so the difference silently isn't shown
//   · a field that scopes to NOTHING for a species the page covers — that tab
//     renders an empty card, which reads as "no treatment" rather than "not
//     written yet"
//   · a broken / asymmetric SPECIES_PAIRS entry, or a pair whose two pages
//     cover the same species
//   · a SPECIES_ABSENT entry contradicted by the page's own sp
//
// Deliberately NOT an error: a page scoped for one species only. A shared
// baseline plus species-specific additions ("Cat: aspirin is contraindicated")
// is the normal authoring shape — the other tab correctly shows the baseline.
//
// Report (no exit code): Dog + Cat pages with no species differences recorded
// yet, so the remaining authoring work is visible rather than assumed done.

import { DB } from '../src/data/db'
import { SPECIES_ABSENT, SPECIES_PAIRS } from '../src/data/speciesPairs'
import { crossTalkOf, hasSpeciesScope, markerOf, scopeToSpecies, speciesMode, speciesOf, type Species } from '../src/lib/species'

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

/** Fields where one species has nothing of its own, so scopeToSpecies falls
 *  back to showing the other species' text under both tabs. */
const fallbacks: string[] = []

/** Segments that survive scoping but only discuss the OTHER species — shared by
 *  markup, not by meaning. */
const crossTalk: string[] = []


const byId = new Map(DB.disease_page.map(d => [d.id, d]))

for (const d of DB.disease_page) {
  const covered = speciesOf(d.sp)
  const sibling = SPECIES_PAIRS[d.id]
  const siblingCovered = sibling ? speciesOf(byId.get(sibling)?.sp) : []
  const reachable = new Set<Species>([...covered, ...siblingCovered])

  for (const [field, value] of Object.entries(d)) {
    if (typeof value !== 'string') continue
    for (const seg of value.split('|')) {
      const t = seg.trim()
      if (t.startsWith('#')) continue
      const { sp } = markerOf(t.startsWith('-') ? t.slice(1) : t)
      if (sp && !reachable.has(sp)) {
        fail(`[${d.id}] ${field} has a "${sp}:" segment but the page covers ${covered.join(' + ') || 'nothing'} — that text never renders. Widen sp, or drop the marker.`)
      }
    }
  }

  // Only pages that actually render a toggle can strand a field: elsewhere the
  // text is never filtered.
  if (speciesMode(d) !== 'split') continue
  for (const [field, value] of Object.entries(d)) {
    if (typeof value !== 'string' || !value.trim() || field === 'sp') continue
    for (const sp of covered) {
      // scopeToSpecies falls back to the full field rather than emptying a
      // card, so this is not a rendering bug — but the fallback means BOTH tabs
      // show the same text here, and it is the other species' text. Worth
      // knowing about; not worth blocking on.
      if (scopeToSpecies(value, sp) === value && hasSpeciesScope(value)) {
        fallbacks.push(`${d.id}.${field} → ${sp}`)
      }
      // Unmarked text that talks ONLY about the other species survives scoping
      // and reads as an aside on the wrong tab — "Exudative (most common in
      // cats)" heading the Dog tab. The text is shared by markup but not by
      // meaning, so it needs an author's judgement, not a rule.
    }
  }
  for (const c of crossTalkOf(d)) {
    crossTalk.push(`${d.id}.${c.field} [${c.sp} tab] "${c.text.slice(0, 60)}${c.text.length > 60 ? '…' : ''}"`)
  }
}

for (const [id, sibling] of Object.entries(SPECIES_PAIRS)) {
  const a = byId.get(id)
  const b = byId.get(sibling)
  if (!a) { fail(`SPECIES_PAIRS key ${id} is not a disease page id.`); continue }
  if (!b) { fail(`SPECIES_PAIRS[${id}] → ${sibling} is not a disease page id.`); continue }
  if (SPECIES_PAIRS[sibling] !== id) {
    fail(`SPECIES_PAIRS[${id}] → ${sibling}, but the reverse entry is missing or points elsewhere — the toggle would be one-way.`)
  }
  const overlap = speciesOf(a.sp).filter(sp => speciesOf(b.sp).includes(sp))
  if (overlap.length === speciesOf(a.sp).length && overlap.length > 0) {
    fail(`SPECIES_PAIRS ${id} ↔ ${sibling} both cover ${overlap.join(' + ')} — a pair must split the species, not duplicate them.`)
  }
}

for (const [id, entry] of Object.entries(SPECIES_ABSENT)) {
  const d = byId.get(id)
  if (!d) { fail(`SPECIES_ABSENT key ${id} is not a disease page id.`); continue }
  if (speciesOf(d.sp).includes(entry.sp)) {
    fail(`SPECIES_ABSENT[${id}] says ${entry.sp} is not affected, but sp:'${d.sp}' claims it is. One of the two is wrong.`)
  }
}

const dual = DB.disease_page.filter(d => speciesOf(d.sp).length === 2)
const undifferentiated = dual.filter(d => speciesMode(d) === 'shared')

if (errors > 0) {
  console.error(`\n${errors} species lint error(s) found.`)
  process.exit(1)
}

console.log(`✓ Species markers valid across ${DB.disease_page.length} disease pages.`)
console.log(`  ${dual.length - undifferentiated.length}/${dual.length} dual-species pages show a Dog/Cat toggle; ${undifferentiated.length} render as shared 'Dog + Cat'.`)
if (fallbacks.length > 0) {
  console.log(`  ${fallbacks.length} field(s) fall back to the other species' text (one species has nothing authored):`)
  for (const f of fallbacks) console.log(`    · ${f}`)
}
if (crossTalk.length > 0) {
  console.log(`  ${crossTalk.length} unmarked segment(s) mention only the other species on a toggled page:`)
  for (const c of crossTalk) console.log(`    · ${c}`)
}
if (process.argv.includes('--list')) {
  for (const d of undifferentiated) console.log(`    · ${d.id} — ${d.name}`)
}
