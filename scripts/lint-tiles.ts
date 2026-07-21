// Validates category-tile links across every flow page.
//
// A tile inside a `categoryGrid` / `categoryColumns` column must resolve to one
// of three intents:
//   • `link`            — a single destination page
//   • `links` (≥1)      — multiple destinations (sub-bullets)
//   • `terminal: true`  — an intentional leaf note with no page to link to
// A tile with NONE of these is an authoring gap (a forgotten link) — it renders
// greyed + aria-disabled ("No linked page available"). This lint fails on any
// such tile so the greyed state never ships: either wire the disease/flow page
// or mark it `terminal`.

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

type TileLike = { label?: string; link?: unknown; links?: unknown[]; terminal?: boolean }

const isGap = (t: TileLike) =>
  !t.link && !(Array.isArray(t.links) && t.links.length > 0) && t.terminal !== true

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks as any[]) {
    if (b.kind === 'categoryGrid' || b.kind === 'categoryColumns') {
      for (const col of b.columns ?? []) {
        for (const tile of col.tiles ?? []) {
          if (isGap(tile)) {
            const label = String(tile.label ?? '').trim() || '(no label)'
            fail(`[${pageId}] ${b.kind} · ${col.cat} · "${label}" — no link/links/terminal`)
          }
        }
      }
    }
    // Recurse into branch columns (they nest blocks)
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

if (errors > 0) {
  console.error(`\n${errors} category-tile gap(s) found. Link a page or set terminal:true.`)
  process.exit(1)
} else {
  console.log(`✓ All category tiles resolve (link / links / terminal) across ${Object.keys(FLOWS).length} flow pages.`)
}
