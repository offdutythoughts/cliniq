// Flow-page traversal helpers for the content lints.
//
// `eachBlock` itself now lives in src/lib/signs/blockWalk.ts, beside the types it
// walks, because the link-integrity test in src/ needs the same traversal — it
// had its own copy, blind to `fork` legs and `speciesChooser` panels. Re-exported
// here so every existing `from './lib/walk'` import keeps working, and so
// lint-walk.ts has one file to check.

import type { Block } from '../../src/lib/signs/flowTypes'
import { eachBlock } from '../../src/lib/signs/blockWalk'
import { FLOWS } from '../../src/lib/signs/flows/index'

export { eachBlock }

/** Every block on every registered flow page, tagged with its page id. */
export function* eachPageBlock(): Generator<{ pageId: string; block: Block }> {
  for (const [pageId, page] of Object.entries(FLOWS)) {
    for (const block of eachBlock(page.blocks)) yield { pageId, block }
  }
}

/** Every category tile across every flow, with the column and page it sits in —
 *  the shape `lint-tiles` and `lint-cats` both want. */
export function* eachTile(): Generator<{
  pageId: string
  kind: 'categoryGrid' | 'categoryColumns'
  cat: string
  tile: { label: string; sublabel?: string; link?: unknown; links?: unknown[]; terminal?: boolean }
}> {
  for (const { pageId, block } of eachPageBlock()) {
    if (block.kind !== 'categoryGrid' && block.kind !== 'categoryColumns') continue
    for (const col of block.columns) {
      for (const tile of col.tiles) yield { pageId, kind: block.kind, cat: col.cat, tile }
    }
  }
}

export const pageCount = () => Object.keys(FLOWS).length
