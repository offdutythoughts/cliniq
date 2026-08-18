// Validates `choices` sublabels across every flow page.
//
// A `choices` item that links to ANOTHER FLOW PAGE is a branch decision: the
// reader picks it based on what is in front of them RIGHT NOW. Its sublabel is
// therefore the DISCRIMINATOR — the history, exam or test finding that makes
// this arm the right one ("Every other joint normal on palpation", "Regulated
// rise — shivers, seeks warmth, responds to NSAIDs").
//
// It is NOT a preview of the destination page. A sublabel that lists the lesion
// categories or named causes waiting on the other side ("Impacted faeces ·
// foreign material · intraluminal mass · stricture", "screen INFECTIOUS ·
// IMMUNE-MEDIATED · NEOPLASTIC") duplicates the tap-through page, ages
// independently of it, and asks the reader to choose between answers instead of
// between findings. This mirrors CHECK 3 in lint-tiles (linked tiles must be
// name-only) one level up the tree.
//
// DETECTION — for each flow-linked choice, every label the destination page
// renders (category names, tile labels, choice/endpoint labels, branch headers,
// card titles) is compared against the sublabel. A destination label counts as
// echoed when its significant words (≥5 chars, so "joint"/"fever" count but
// "of"/"the" don't) all appear in the sublabel — capped at 2, so a multi-word
// label needs two hits and a one-word label needs its single word.
//
// KEPT_SUBLABEL lists reviewed sublabels whose overlap is a genuine clinical
// discriminator that happens to share vocabulary with a destination tile (a
// named trigger, a named test result), keyed `pageId::label`.
//
// NO EMOJI — a separation box carries the differential's NAME and nothing else.
// The emoji that used to lead these labels ("😣 Increased production", "🔵 Dry /
// Unproductive") was decoration: the box already carries its arm's colour through
// `tone`/`variant`, so the glyph restated the tone at best and, on the sign pages,
// mimed the sign at worst. Applies to EVERY choice, linked or not. Mirrors the
// chip rule in lint-chips (Rule 1).
//
// SCOPE — only choices linking to another FLOW page are checked automatically,
// because only then can the destination's labels be read. The same rule applies
// to choices that open a lesion tab or disease page (coughing, sneezing), but
// those destinations live outside FLOWS, so they are reviewed by hand.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block, FlowPage } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

const strip = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim()
const EMOJI = /\p{Extended_Pictographic}/u
const sigWords = (s: string) => strip(s).toLowerCase().match(/[a-zà-ÿ]{5,}/g) ?? []

// Reviewed discriminators: the overlap is the finding itself, not a preview of
// the destination's contents.
const KEPT_SUBLABEL = new Set<string>([
  // The trigger IS the discriminator for reflex syncope; the destination happens
  // to name a "tussive / situational" tile using the same words.
  'syncope::REFLEX / NON-CARDIAC',
  // "normal SaO2 / distal extremities" is the bedside test result that selects
  // this arm; it also appears in a peripheral-cyanosis tile downstream.
  'cyanosis::METHAEMOGLOBIN / PERIPHERAL',
])

/** Every label the destination page puts in front of the reader. */
function destLabels(page: FlowPage): string[] {
  const out: string[] = []
  const walk = (blocks: Block[]) => {
    for (const b of blocks as any[]) {
      if (b.kind === 'choices' || b.kind === 'endpoints') for (const it of b.items ?? []) out.push(String(it.label ?? ''))
      if (b.kind === 'categoryGrid' || b.kind === 'categoryColumns') {
        for (const col of b.columns ?? []) { out.push(String(col.cat ?? '')); for (const t of col.tiles ?? []) out.push(String(t.label ?? '')) }
      }
      if (b.kind === 'cardSection') for (const c of b.cards ?? []) out.push(String(c.title ?? ''))
      if (b.kind === 'cardGrid') for (const t of b.tiles ?? []) out.push(String(t.loc ?? ''))
      if (b.kind === 'branch') for (const col of b.columns ?? []) { out.push(String(col.header ?? '')); walk(col.blocks ?? []) }
      if (b.kind === 'fork') for (const leg of b.legs ?? []) walk(leg.blocks ?? [])
    }
  }
  walk(page.blocks)
  return out.filter(Boolean)
}

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks as any[]) {
    if (b.kind === 'choices') {
      for (const it of b.items ?? []) {
        const label = strip(String(it.label ?? ''))
        if (EMOJI.test(label)) {
          fail(`[${pageId}] choice "${label}" leads with an emoji — a separation box is name-only; the arm's colour already comes from tone/variant.`)
        }
        if (it.link?.to !== 'flow' || !it.sublabel) continue
        if (KEPT_SUBLABEL.has(`${pageId}::${label}`)) continue
        const dest = FLOWS[it.link.id]
        if (!dest) continue
        const subWords = new Set(sigWords(it.sublabel))
        const echoed = destLabels(dest).filter(l => {
          const lw = [...new Set(sigWords(l))]
          if (lw.length === 0) return false
          return lw.filter(w => subWords.has(w)).length >= Math.min(2, lw.length)
        })
        if (echoed.length > 0) {
          fail(`[${pageId}] choice "${label}" → ${it.link.id} — sublabel previews the destination page (echoes ${echoed.slice(0, 3).map(e => `"${strip(e)}"`).join(', ')}); make it the discriminator that selects this arm.`)
        }
      }
    }
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
    if (b.kind === 'fork') for (const leg of b.legs ?? []) checkBlocks(pageId, leg.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

if (errors > 0) {
  console.error(`\n${errors} choice issue(s) found. A separation box is name-only, and a branch choice's sublabel is the finding that selects it — not a list of what the next page contains.`)
  process.exit(1)
} else {
  console.log(`✓ All choice labels are emoji-free and every flow-linked sublabel is a discriminator, not a destination preview (${Object.keys(FLOWS).length} flow pages checked).`)
}
