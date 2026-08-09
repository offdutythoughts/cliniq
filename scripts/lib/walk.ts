// One exhaustive walk over a flow page's block tree.
//
// Seven lints each hand-rolled this recursion, and they disagreed: six recursed
// into `fork` legs, only ONE looked inside a `speciesChooser`. That is not a DRY
// problem, it is a correctness problem — a lint silently skips the block kinds
// its author forgot, so content inside them is never checked. Adding the
// speciesChooser case to lint-tiles surfaced four real authoring gaps that had
// been invisible.
//
// Every nesting block kind is handled here, once. When a new nesting kind is
// added to flowTypes, add it here and all callers pick it up.

import type { Block, CatColumn } from '../../src/lib/signs/flowTypes'
import { FLOWS } from '../../src/lib/signs/flows/index'

/** Every block on a page, depth-first, including those nested inside
 *  `branch` columns, `fork` legs and `speciesChooser` panels. Panels are yielded
 *  as a synthetic `categoryColumns` block so tile checks see them like any other
 *  category grid. */
export function* eachBlock(blocks: Block[]): Generator<Block> {
  for (const b of blocks) {
    yield b
    switch (b.kind) {
      case 'branch':
        for (const col of b.columns) yield* eachBlock(col.blocks)
        break
      case 'fork':
        for (const leg of b.legs) if (leg.blocks) yield* eachBlock(leg.blocks)
        break
      case 'speciesChooser':
        for (const panel of [b.dog, b.cat]) {
          yield { kind: 'categoryColumns', columns: panel.columns as CatColumn[] } as Block
        }
        break
    }
  }
}

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
  tile: { label: string; link?: unknown; links?: unknown[]; terminal?: boolean }
}> {
  for (const { pageId, block } of eachPageBlock()) {
    if (block.kind !== 'categoryGrid' && block.kind !== 'categoryColumns') continue
    for (const col of block.columns) {
      for (const tile of col.tiles) yield { pageId, kind: block.kind, cat: col.cat, tile }
    }
  }
}

export const pageCount = () => Object.keys(FLOWS).length
