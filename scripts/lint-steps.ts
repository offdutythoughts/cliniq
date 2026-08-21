// Validates the discriminator text under a `step` node.
//
// A step node asks the question that splits the flow; the text under it is the
// criteria that answer it. Those criteria are separate ideas — "TNCC >5 ×10⁹/L
// with >10% neutrophils = inflammatory" and "fever is commoner than lameness"
// are two things to check, not one sentence to read. Past roughly a line and a
// half, a `sub` run-on stops being scannable in the ten minutes the reader has:
// the criteria run together and the reader loses which clause selects which arm.
//
// RULE — a step node's `sub` may hold ONE short discriminator (≤ MAX_SUB chars).
// Anything longer belongs in `subItems`, which renders one bullet per idea.
// `subItems` bullets themselves are capped at MAX_ITEM so a "bullet" can't
// quietly become another paragraph.
//
// Entry nodes are exempt: their `sub` is a one-line recap of the page, not a set
// of criteria (see lint-headers for that rule).

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

const MAX_SUB = 110
const MAX_ITEM = 150

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

function checkBlocks(pageId: string, blocks: Block[]) {
  for (const b of blocks) {
    if (b.kind === 'node' && b.variant === 'step') {
      const text = String(b.text ?? '').trim()
      if (typeof b.sub === 'string' && b.sub.length > MAX_SUB) {
        fail(`[${pageId}] step "${text}" — sub is ${b.sub.length} chars (max ${MAX_SUB}); split the criteria into subItems bullets.`)
      }
      for (const it of (b.subItems ?? []) as string[]) {
        if (it.length > MAX_ITEM) {
          fail(`[${pageId}] step "${text}" — subItems bullet is ${it.length} chars (max ${MAX_ITEM}): "${it.slice(0, 60)}…"; one idea per bullet.`)
        }
      }
    }
    if (b.kind === 'branch') for (const col of b.columns ?? []) checkBlocks(pageId, col.blocks ?? [])
    if (b.kind === 'fork') for (const leg of b.legs ?? []) checkBlocks(pageId, leg.blocks ?? [])
  }
}

for (const [id, page] of Object.entries(FLOWS)) checkBlocks(id, page.blocks)

if (errors > 0) {
  console.error(`\n${errors} step-discriminator issue(s) found. Long criteria go in subItems — one idea per bullet.`)
  process.exit(1)
} else {
  console.log(`✓ All step discriminators are short subs or bulleted subItems (${Object.keys(FLOWS).length} flow pages checked).`)
}
