// Validates leaf "chips" — the clickable lesion/disease links rendered as `endpoints`
// items (EndpointView in src/app/screens/FlowPageView.tsx) — against the name-only
// authoring convention established on the epistaxis flow.
//
// Convention:
//   1. No decorative emoji. The `icon` field on an endpoints item is banned outright —
//      chips carry the disease/lesion name only. Applies to EVERY chip. (Separation
//      boxes — `choices` items and branch column headers — follow the same name-only
//      rule, enforced one level up in lint-choices; the sole surviving glyph is
//      pollakiuria's "🚨 OBSTRUCTED — emergency", where the siren flags an emergency
//      rather than restating the column's tone.)
//   2. A chip carries the DISEASE NAME and nothing else. The rule is now unconditional —
//      it applies to EVERY chip, linked or not. The earlier version exempted unlinked
//      chips (on the theory that their sublabel was the sole home of that content) and
//      exempted six dense sub-flows wholesale; both exemptions are gone. A drug list, a
//      mechanism, a breed list, a treatment threshold or a lab cut-off appended under a
//      chip is detail the disease page carries — and where there is no disease page, it
//      is still detail a flowchart box is the wrong place for. The reader is matching a
//      NAME against a differential, not reading a paragraph in 8px type.
//
//      The ONLY sublabel worth keeping is a triage qualifier the reader needs to pick
//      between the boxes — ranking ("#1 cause dog", "Most common feline cause") or a
//      species restriction ("🐱 Cats"). See ALLOWED_SUBLABEL.
//
//      There is NO exception list, per-chip or per-page, and one should not be
//      reintroduced. The last holdouts were the three cross-sign referral chips
//      ("Vomiting", "Seizures", "Pollakiuria / Stranguria" — the outcome of a "this is
//      not the sign you are looking at" fork), whose sublabel carried an action to take
//      on arrival. That action belongs on the flow the chip leads to, where the reader
//      arrives to act on it, not in 8px type under a box they are still choosing.
//
//   3. Sentence case — see ACRONYMS below.
//
// A fourth rule has no lint because it needs none: a chip with NO `link` has no disease
// page behind it, so it renders MUTED (dimmed, no pointer, no hover), the same as a
// `terminal` category tile. That is enforced in the renderer (`EndpointView` in
// FlowPageView.tsx), which means it covers every unlinked chip already authored and
// every one added later, with no data change and nothing to keep in step here.
//
// Mirrors lint-flows.ts.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block, Endpoint } from '../src/lib/signs/flowTypes'
// The allowed second line is defined once, for chips, tiles and the lesion-page
// differential rows alike — see that module's header for the rule.
import { isTriageQualifier } from '../src/lib/triageQualifier'


// Rule 3 — sentence case. A chip carries a lesion/disease NAME, written the way it
// reads in a sentence ("Bacterial septic arthritis"), not in block capitals. Mirrors
// lint-tiles CHECK 5; see that file's header for the rationale and the shared
// acronym allow-list convention.
const ACRONYMS = new Set<string>([
  'AGASACA', 'AHDS', 'ARDS', 'ATE', 'BPH', 'CDV', 'CKD', 'CN', 'CRGV', 'DCM', 'DIC', 'DJD',
  'DKA', 'EPI', 'EPO', 'FCE', 'FeLV', 'FIC', 'FIP', 'FIV', 'GDV', 'GI', 'GME', 'HAC', 'HCM',
  'IBD', 'IE', 'IMHA', 'IMPA', 'IMTP', 'ITP', 'IVDD', 'KBr', 'LSA', 'MDR1', 'MMVD', 'MUA',
  'MUO', 'NLE', 'NME', 'OA', 'OCD', 'PDA', 'PLE', 'PLN', 'PRAA', 'PS', 'PSS', 'PTE', 'RA',
  'RMSF', 'SA', 'SAS', 'SaO2', 'SLE', 'SNRIs', 'SRMA', 'SSRIs', 'TCC', 'URI', 'UTI', 'VSD', 'ASD',
])
const isShouting = (label: string) => {
  const rest = label.split(/\s[—–]\s|\s\(/)[0].trim()
    .split(/[\s/·+,]+/)
    .filter(w => w && !ACRONYMS.has(w))
    .join('')
    .replace(/[^A-Za-z]/g, '')
  return rest.length >= 4 && rest.replace(/[^A-Z]/g, '').length / rest.length > 0.6
}

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

/** Depth-first walk over a page's block tree, yielding every endpoints item.
 *  Branches nest (columns[].blocks), so recurse into them. */
function forEachEndpoint(blocks: Block[], visit: (e: Endpoint) => void) {
  for (const b of blocks) {
    if (b.kind === 'endpoints') b.items.forEach(visit)
    else if (b.kind === 'branch') b.columns.forEach(c => forEachEndpoint(c.blocks, visit))
  }
}

let chipCount = 0
for (const [id, page] of Object.entries(FLOWS)) {
  forEachEndpoint(page.blocks, e => {
    chipCount++
    if (e.icon) {
      fail(`[${id}] chip "${e.label}" has icon:"${e.icon}" — chips are name-only; drop the emoji.`)
    }
    // Rule 2 — unconditional: linked or not, a chip is its disease name plus, at most, a
    // ranking / species triage qualifier.
    if (e.sublabel && !isTriageQualifier(e.sublabel)) {
      fail(`[${id}] chip "${e.label}" sublabel "${e.sublabel}" — a chip carries the disease name only; strip it (keep only a ranking or species qualifier, e.g. "#1 cause dog", "🐱 Cats").`)
    }
    // Rule 3: sentence case — block capitals are for acronyms only.
    if (isShouting(e.label)) {
      fail(`[${id}] chip "${e.label}" is in block capitals — write the name in sentence case (acronyms keep their capitals).`)
    }
  })
}

if (errors > 0) {
  console.error(`\n${errors} chip lint error(s) found.`)
  process.exit(1)
} else {
  console.log(`✓ All flow chips pass lint (${chipCount} chips across ${Object.keys(FLOWS).length} pages checked).`)
}
