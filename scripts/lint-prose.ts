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
// The rule applies to EVERY page. The 26-page pre-rule backlog that shipped with
// this lint has been worked through — there is no exemption list, and one should
// not be reintroduced: a page whose box is over the cap has content that belongs
// in a fork, a table or a step's subItems.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

const MAX_LEG_SUB = 60
const MAX_LEG_ITEM = 60
const MAX_WORDS = 45

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s: string) => (strip(s) ? strip(s).split(' ').length : 0)

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks) {
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
    if (b.kind === 'callout' || b.kind === 'infoBox' || b.kind === 'banner') {
      const n = words(String(b.html ?? ''))
      if (n > MAX_WORDS) {
        fail(`[${pageId}] ${b.kind} is ${n} words (max ${MAX_WORDS}) — turn the discriminators into a fork, a comparison table or step subItems, and keep the box for what is left.`)
      }
    }
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

if (errors > 0) {
  console.error(`\n${errors} prose issue(s) found. Flow pages differentiate with forks, tables and bullets — not paragraphs.`)
  process.exit(1)
} else {
  console.log(`✓ Flow pages differentiate with forks/tables/bullets, not prose (${Object.keys(FLOWS).length} pages checked, no exemptions).`)
}
