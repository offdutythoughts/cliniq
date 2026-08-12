// Validates that a flow page DIFFERENTIATES rather than narrates.
//
// A clinical-sign flow is read in the ten minutes between a consult and a
// decision. The reader is matching what is in front of them against the page, so
// every discriminator has to be a thing they can SEE, on its own line, in a box
// whose colour tells them which arm it belongs to. A paragraph cannot do that: it
// hides four findings inside one sentence, and the reader has to disassemble it
// before they can use it.
//
// RULE — the differentiating content of a flow page is a fork, a comparison
// table or bullets; NOT prose.
//
//   CHECK 1 — a `fork` leg's criteria go in `subItems`, one finding per bullet.
//             `sub` is for a leg whose criterion is a single short phrase
//             ("True PU/PD"); past MAX_LEG_SUB chars it is a paragraph wearing a
//             caption's clothes. Bullets themselves cap at MAX_LEG_ITEM so a
//             bullet cannot quietly become a sentence.
//
//   CHECK 2 — a prose box (`callout` / `infoBox` / `banner`) caps at MAX_WORDS
//             words. Over that, the box is carrying the page's differentiation
//             and should BE the differentiation: a fork over the findings (see
//             dysphagia's swallowing-vs-vomiting split), a comparison table (see
//             vestibular's peripheral/central/bilateral), or the step node's
//             `subItems`. Prose boxes are for the one warning or the one pearl
//             that has nowhere else to live.
//
// LEGACY_PROSE is the pre-rule backlog, biggest first — pages whose long callout
// predates this lint. It is a to-do list, not an exemption: fix a page and delete
// its row. Do not add rows.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

const MAX_LEG_SUB = 60
const MAX_LEG_ITEM = 60
const MAX_WORDS = 45

// pageId → the number of words that box carried when the rule landed. Keyed by
// page because a page's prose boxes are rewritten together.
const LEGACY_PROSE = new Set<string>([
  'ataxia', 'wet-eye', 'pupd-sec-pu', 'abnormal-pupil', 'red-eye-orbit', 'fever',
  'pupd-prim-pd', 'red-eye', 'vestibular', 'tremors', 'anisocoria-horners-localise',
  'oedema', 'anisocoria-mydriasis-localise', 'gi-parasites', 'melena', 'pupd-prim-pu',
  'anorexia', 'pupd', 'haematuria-pseudo', 'myelopathy', 'pollakiuria-localise',
  'polyphagia', 'heart-murmur', 'weight-loss', 'constipation', 'red-eye-bleed',
])

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s: string) => (strip(s) ? strip(s).split(' ').length : 0)

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks as any[]) {
    if (b.kind === 'fork') {
      for (const leg of b.legs ?? []) {
        const label = String(leg.label ?? '')
        if (typeof leg.sub === 'string' && leg.sub.length > MAX_LEG_SUB) {
          fail(`[${pageId}] fork leg "${label}" — sub is ${leg.sub.length} chars (max ${MAX_LEG_SUB}); the findings that pick this arm go in subItems, one per bullet.`)
        }
        for (const it of (leg.subItems ?? []) as string[]) {
          if (it.length > MAX_LEG_ITEM) {
            fail(`[${pageId}] fork leg "${label}" — subItems bullet is ${it.length} chars (max ${MAX_LEG_ITEM}): "${it.slice(0, 50)}…"; one finding per bullet.`)
          }
        }
        checkBlocks(pageId, leg.blocks ?? [])
      }
    }
    if ((b.kind === 'callout' || b.kind === 'infoBox' || b.kind === 'banner') && !LEGACY_PROSE.has(pageId)) {
      const n = words(String(b.html ?? ''))
      if (n > MAX_WORDS) {
        fail(`[${pageId}] ${b.kind} is ${n} words (max ${MAX_WORDS}) — turn the discriminators into a fork, a comparison table or step subItems, and keep the box for what is left.`)
      }
    }
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

// A page that has been rewritten should not keep its legacy row: it would then
// silently re-license prose the next time someone edits that page.
for (const id of LEGACY_PROSE) {
  const page = FLOWS[id]
  if (!page) { fail(`[${id}] listed in LEGACY_PROSE but no such flow page — delete the row.`); continue }
  const over = (page.blocks as any[]).some(b =>
    (b.kind === 'callout' || b.kind === 'infoBox' || b.kind === 'banner') && words(String(b.html ?? '')) > MAX_WORDS)
  if (!over) fail(`[${id}] no longer has an over-length prose box — delete its LEGACY_PROSE row so the rule applies to this page again.`)
}

if (errors > 0) {
  console.error(`\n${errors} prose issue(s) found. Flow pages differentiate with forks, tables and bullets — not paragraphs.`)
  process.exit(1)
} else {
  console.log(`✓ Flow pages differentiate with forks/tables/bullets, not prose (${Object.keys(FLOWS).length} pages checked; ${LEGACY_PROSE.size} on the legacy backlog).`)
}
