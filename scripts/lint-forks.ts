// Validates that EVERY split in an authored `html:` block is fed by the shared
// fork connector — the rule the typed renderer already enforces for typed blocks.
//
// Convention: a flowchart that separates into N columns gets ONE connected
// right-angle fork (stem → horizontal bar → a drop into each column), never a
// lone `<div class="flow-arrow-v">↓</div>` pointing into the gap between the
// columns. Typed blocks get it from <ForkLines> (src/app/screens/flowHelpers.tsx);
// the `html:` escape hatches must call `forkHtml(cols, gap[, arrow])`
// (src/lib/signs/flowTypes.ts), whose `cols`/`gap` mirror the split grid's own
// grid-template-columns/gap so the drops land on the column centres.
//
// Flags, per authored html block:
//   1. a `.flow-arrow-v` immediately followed by a multi-column grid — the lone
//      arrow this rule exists to kill;
//   2. a `forkHtml(...)` whose leg count or gap disagrees with the grid it feeds.
//
// Not flagged: an arrow into a single-column/flex stack (a plain step-to-step
// connector), and a row of one arrow PER column (the parallel per-column
// continuations under a category row).

import { FLOWS } from '../src/lib/signs/flows/index'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

/** Track count of a grid-template-columns value: `repeat(N,…)` or a track list. */
function trackCount(template: string): number {
  const rep = template.match(/^\s*repeat\(\s*(\d+)\s*,/)
  if (rep) return Number(rep[1])
  return template.trim().split(/\s+(?![^(]*\))/).length
}

/** The fork markup emitted by forkHtml(), so it can be told apart from a lone arrow. */
const FORK_RE = /<div class="flow-fork" style="--fork-gap:(\d+)px;">.*?<div class="flow-fork-legs" style="grid-template-columns:([^;"]+);">(.*?)<\/div><\/div>/gs
/** A connector (fork or lone arrow) directly followed by a grid — with nothing
 *  but whitespace/comments between, which is what "feeds this split" means. */
const CONNECTED = /(FORK|<div class="flow-arrow-v"[^>]*>[^<]*<\/div>)(?:\s|<!--[^]*?-->)*<div style="display:grid;grid-template-columns:([^;"]+);gap:(\d+)px/g

function checkHtml(id: string, html: string) {
  // Replace each fork with a marker (keeping its params) so CONNECTED can tell
  // "fork feeds this grid" from "lone arrow feeds this grid" — and so the
  // .flow-arrow-v drops INSIDE a fork's legs are never mistaken for lone arrows.
  const forks: { gap: number; cols: string; legs: number }[] = []
  const marked = html.replace(FORK_RE, (_m, gap: string, cols: string, legs: string) => {
    forks.push({ gap: Number(gap), cols, legs: (legs.match(/flow-fork-leg/g) ?? []).length })
    return `FORK${forks.length - 1}@`
  })
  for (const m of marked.matchAll(CONNECTED)) {
    const [, head, cols, gap] = m
    const n = trackCount(cols)
    if (n < 2) continue // not a split — a plain connector into a 1-column grid
    const fork = head.startsWith('FORK') ? forks[Number(head.slice(4, -1))] : null
    if (!fork) {
      fail(`[${id}] lone arrow feeds a ${n}-column split (${cols}) — use \${forkHtml(${
        /^\s*repeat/.test(cols) ? n : `'${cols.trim()}'`}, ${gap})} instead.`)
      continue
    }
    if (fork.legs !== n) fail(`[${id}] forkHtml has ${fork.legs} leg(s) but feeds a ${n}-column split (${cols}).`)
    if (fork.gap !== Number(gap)) fail(`[${id}] forkHtml gap ${fork.gap}px ≠ the split grid's gap ${gap}px (${cols}) — the drops will miss the columns.`)
  }
}

function walk(id: string, blocks: Block[]) {
  for (const b of blocks) {
    if (b.kind === 'html') checkHtml(id, b.html)
    else if (b.kind === 'branch') b.columns.forEach(c => walk(id, c.blocks))
    else if (b.kind === 'fork') b.legs.forEach(l => walk(id, l.blocks ?? []))
  }
}

let pages = 0
for (const [id, page] of Object.entries(FLOWS)) {
  pages++
  walk(id, page.blocks)
}

if (errors > 0) {
  console.error(`\n${errors} fork lint error(s) found.`)
  process.exit(1)
} else {
  console.log(`✓ Every authored split is fed by the shared fork (${pages} flow pages checked).`)
}
