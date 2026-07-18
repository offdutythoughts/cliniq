// Validates leaf "chips" — the clickable lesion/disease links rendered as `endpoints`
// items (EndpointView in src/app/screens/FlowPageView.tsx) — against the name-only
// authoring convention established on the epistaxis flow.
//
// Convention:
//   1. No decorative emoji. The `icon` field on an endpoints item is banned outright —
//      chips carry the disease/lesion name only. Applies to EVERY chip. (Branch/node
//      HEADER emojis like "🔵 LOCAL" are a different, kept concern and are not chips.)
//   2. Sublabels are gated on whether the chip is a TAP-THROUGH link:
//        • LINKED chip (has `link`): the reader navigates to a disease/lesion/protocol
//          page that already carries the detail, so a descriptive sublabel is redundant
//          clutter. The only sublabel worth keeping is a "most common cause" triage
//          qualifier — ranking context the destination page does NOT give.
//        • UNLINKED terminal chip (no `link`): there is no destination page, so the
//          sublabel is the ONLY place its clinical content exists (toxin pearls, drug
//          lists, mechanisms). Stripping it would DELETE information — so unlinked chips
//          keep their sublabel and are exempt from Rule 2.
//
// Rule 1 applies everywhere. Rule 2 applies to LINKED chips, EXCEPT on the dense
// differential sub-flows listed in KEPT_SUBLABEL: there the terse linked sublabels are
// load-bearing — some disambiguate several chips that share ONE destination page (e.g.
// four encephalopathy-diffuse chips → DIS-NEU-METABENC), others carry a triage/action
// pearl (IMTP "#1 cause dog · immunosuppress if <30"; DIC "PT + aPTT both prolonged").
// These were reviewed and intentionally kept, not a pending backlog. Mirrors lint-flows.ts.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block, Endpoint } from '../src/lib/signs/flowTypes'

// A sublabel is allowed only if it is a "most common cause" qualifier.
const ALLOWED_SUBLABEL = /most common .*cause/i

// Dense differential sub-flows whose LINKED sublabels were reviewed and intentionally kept
// (disambiguation of same-destination chips / triage pearls — see header). Rule 1 (no
// emoji) still applies to them. Only add a page here after confirming its linked sublabels
// genuinely carry content the destination page does not.
const KEPT_SUBLABEL = new Set<string>([
  'bleeding-consump', 'bleeding-dest', 'bleeding-prod', 'bleeding-vasc',
  'encephalopathy-brainstem', 'encephalopathy-diffuse',
])

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
  const checkSublabel = !KEPT_SUBLABEL.has(id)
  forEachEndpoint(page.blocks, e => {
    chipCount++
    if (e.icon) {
      fail(`[${id}] chip "${e.label}" has icon:"${e.icon}" — chips are name-only; drop the emoji.`)
    }
    // Rule 2 only applies to LINKED chips: an unlinked terminal chip has no destination
    // page, so its sublabel is the sole home of that content — keep it.
    if (checkSublabel && e.link && e.sublabel && !ALLOWED_SUBLABEL.test(e.sublabel)) {
      fail(`[${id}] chip "${e.label}" sublabel "${e.sublabel}" duplicates the tap-through page — strip it (keep only a "most common cause" qualifier).`)
    }
  })
}

if (errors > 0) {
  console.error(`\n${errors} chip lint error(s) found.`)
  process.exit(1)
} else {
  console.log(`✓ All flow chips pass lint (${chipCount} chips across ${Object.keys(FLOWS).length} pages checked).`)
}
