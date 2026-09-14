// Guards the shared block traversal against the failure that created it.
//
// src/lib/signs/blockWalk.ts exists because seven lints each hand-rolled the recursion over a
// flow page's block tree and quietly disagreed about which nesting kinds to
// descend into — so content inside the kinds an author forgot was never checked
// by that lint at all. Adopting walk.ts fixed the seven. It did NOT fix the
// thing that caused it: walk.ts's own header asks the next person to remember
// to add a case, and a comment asking to be remembered is the same mechanism
// that failed the first time.
//
// So: derive the set of block kinds that CAN nest from flowTypes.ts, derive the
// set walk.ts actually descends into, and fail if the first is not covered by
// the second. Adding a nesting block kind now breaks this lint by construction,
// with a message naming the kind.
//
// A "nesting carrier" is a type that (transitively) holds child Blocks or child
// category columns: Column and ForkLeg hold `blocks`, SpeciesPanel holds
// `columns`. A block kind nests iff its declaration references one of them.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lint } from './lib/lint'

const { fail, done } = lint('walk-coverage')

const TYPES = readFileSync(join(__dirname, '../src/lib/signs/flowTypes.ts'), 'utf8')
const WALK = readFileSync(join(__dirname, '../src/lib/signs/blockWalk.ts'), 'utf8')

// ── 1. Which container types carry children? ────────────────────────────────
// Derived, not listed: any exported type whose body declares `blocks[?]: Block[]`
// or `columns[?]: CatColumn[]`.
const CARRIERS = new Set<string>()
for (const m of TYPES.matchAll(/export type (\w+)\s*=\s*([\s\S]*?)(?=\nexport |\n\/\*\*|$)/g)) {
  const [, name, body] = m
  if (/\b(blocks\??:\s*Block\[\]|columns\??:\s*CatColumn\[\])/.test(body)) CARRIERS.add(name)
}
if (CARRIERS.size === 0) {
  fail('found no container types in flowTypes.ts — this lint\'s parser has gone stale, fix it rather than deleting it.')
}

// ── 2. Which block kinds reference a carrier? ───────────────────────────────
// Each block type declares its own `kind: '…'` literal, so the kind and the
// carrier reference are in the same declaration body.
const nesting = new Map<string, string>() // kind → the carrier it holds
for (const m of TYPES.matchAll(/export type (\w+Block)\s*=\s*([\s\S]*?)(?=\nexport |\n\/\*\*|$)/g)) {
  const [, , body] = m
  const kind = body.match(/kind:\s*'([^']+)'/)?.[1]
  if (!kind) continue
  for (const carrier of CARRIERS) {
    // Word-boundary match so `Column` does not match inside `CategoryColumn`.
    if (new RegExp(`\\b${carrier}\\b`).test(body)) { nesting.set(kind, carrier); break }
  }
}

// ── 3. Which kinds does eachBlock actually descend into? ────────────────────
const handled = new Set([...WALK.matchAll(/case '([^']+)':/g)].map(m => m[1]))

for (const [kind, carrier] of nesting) {
  if (!handled.has(kind)) {
    fail(`block kind '${kind}' nests children (via ${carrier}) but src/lib/signs/blockWalk.ts has no case for it — `
      + `every lint using eachBlock() is silently skipping everything inside it. Add a case to eachBlock().`)
  }
}

// The reverse direction is a weaker signal (walk may handle a kind whose carrier
// this parser cannot see), so report it rather than failing.
for (const kind of handled) {
  if (!nesting.has(kind)) {
    console.log(`  ℹ src/lib/signs/blockWalk.ts descends into '${kind}', which this lint does not see as a nesting kind — harmless, but check the parser if unexpected.`)
  }
}

done(`src/lib/signs/blockWalk.ts covers all ${nesting.size} nesting block kind(s) (${[...nesting.keys()].join(', ')}).`,
  'A nesting kind missing from eachBlock() makes every content lint blind inside it.')
