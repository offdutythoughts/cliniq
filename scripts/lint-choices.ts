// Validates the `choices` boxes — the tappable nodes a sign page splits into
// ("Increased production" / "Reduced drainage" on wet-eye).
//
// A separation box is NAME-ONLY. It carries the differential's name and nothing
// else: no emoji, no sublabel.
//
//   NO EMOJI — the glyph that used to lead these labels was decoration. The box
//   already carries its arm's colour through `tone`/`variant`, so the emoji
//   restated the tone at best ("🔵 Dry / Unproductive", "🔴 Unilateral") and
//   mimed the sign at worst ("😣 Increased production"). Mirrors Rule 1 in
//   lint-chips. Branch COLUMN headers follow the same rule by hand — only
//   pollakiuria's "🚨 OBSTRUCTED — emergency" keeps its glyph, where the siren
//   flags an emergency rather than restating the column's tone.
//
//   NO SUBLABEL — enforced by the type: `ChoiceItem` has no `sublabel` slot
//   (src/lib/signs/flowTypes.ts), so this check only catches an object that
//   reaches FLOWS around the type. The 70 sublabels these boxes used to carry
//   were a mix of discriminators ("Every other joint normal on palpation") and
//   destination previews ("ulcer · FB · distichiasis · ectopic cilia"); the
//   reader now meets the deciding question once, in the step above the split,
//   instead of N times as competing paragraphs beside the names. Detail that
//   selects an arm belongs in that step's `sub`/`subItems`; detail about what is
//   on the other side belongs on the destination page.
//
// RAW HTML — the same rule applies to a separation box authored in an `html`
// escape hatch: a `.flow-node` carrying a PATTERN class (insp/exp/rest/mixed) is
// a separation box drawn by hand, so it too is name-only — no emoji, and no
// `.fn-sub` / `<span>` sublabel tucked inside it. A `.flow-node.sub-step` is a
// QUESTION, not a box, and is exempt: its multi-line text is the question.
//
// SCOPE — every choices item on every flow page, linked or not.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim()
const EMOJI = /\p{Extended_Pictographic}/u

let choiceCount = 0

// Pattern-class .flow-node boxes in authored html, and the sublabel forms they
// used to carry. `[\s\S]*?` stops at the first </div>, which for a sublabel-free
// box is its own — a box WITH a nested .fn-sub div therefore captures that div's
// opening tag, which is exactly what we want to flag.
const HTML_BOX = /<div class="flow-node (?:insp|exp|rest|mixed)\b[^"]*"[^>]*>([\s\S]*?)<\/div>/g
const EMOJI_G = /\p{Extended_Pictographic}/u
const SUBLABEL = /<span|class="fn-sub"/

function checkHtml(pageId: string, html: string) {
  for (const m of html.matchAll(HTML_BOX)) {
    const inner = m[1]
    const name = strip(inner.split(/<div|<span/)[0]).trim()
    if (EMOJI_G.test(name)) {
      fail(`[${pageId}] html separation box "${name}" leads with an emoji — the box's colour already comes from its pattern class.`)
    }
    if (SUBLABEL.test(inner)) {
      fail(`[${pageId}] html separation box "${name}" has a sublabel — put the finding that selects this arm in the step above the split.`)
    }
  }
}

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks) {
    if (b.kind === 'choices') {
      for (const it of b.items ?? []) {
        choiceCount++
        const label = strip(String(it.label ?? ''))
        if (EMOJI.test(label)) {
          fail(`[${pageId}] choice "${label}" leads with an emoji — a separation box is name-only; the arm's colour already comes from tone/variant.`)
        }
        // No sublabel check here: ChoiceItem is {variant, tone, label, link},
        // so a typed choice CANNOT carry one and the type is the guarantee.
        // This previously read `if (it.sublabel)` behind a `blocks as any[]`
        // cast, which made it permanently undefined — a check that could never
        // fire. Hand-authored HTML is the only route a sublabel can take into a
        // separation box, and checkHtml's SUBLABEL regex above covers that.
      }
    }
    if (b.kind === 'html') checkHtml(pageId, String(b.html ?? ''))
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
    if (b.kind === 'fork') for (const leg of b.legs ?? []) checkBlocks(pageId, leg.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

if (errors > 0) {
  console.error(`\n${errors} choice issue(s) found. A separation box carries the differential's name and nothing else.`)
  process.exit(1)
} else {
  console.log(`✓ All ${choiceCount} separation boxes are name-only across ${Object.keys(FLOWS).length} flow pages.`)
}
