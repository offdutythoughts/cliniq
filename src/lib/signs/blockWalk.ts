// One exhaustive walk over a flow page's block tree.
//
// This lives beside the types it walks, because everything that reads a flow
// page needs it — the content lints in scripts/, and the link-integrity test in
// src/. It started in scripts/lib/walk.ts, where seven lints had each hand-rolled
// the recursion and disagreed about which nesting kinds to descend into. Moving
// it here closed the last copy: flows.test.ts had its own, which descended into
// `branch` but not `fork` legs or `speciesChooser` panels, so 22 links across 5
// pages — 18 of them on the DIC page's species panels — were never checked
// against the database at all.
//
// Every nesting block kind is handled here, once. `scripts/lint-walk.ts` fails
// the build if a new one is added to flowTypes without a case below.

import type { Block, CatColumn } from './flowTypes'

/** Every block on a page, depth-first, including those nested inside `branch`
 *  columns, `fork` legs and `speciesChooser` panels. Panels are yielded as a
 *  synthetic `categoryColumns` block so tile checks see them like any other
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
