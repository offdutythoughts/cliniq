// Keeps the lesion-page colour table honest against the data it colours.
//
// LesionLocView's `CT` maps a lesion row's free-text `cat` to a Tone. Nothing
// connected the two, so the table drifted both ways: it accumulated nine keys
// for categories no row uses any more, and a `cat` with no entry silently falls
// back to slate — a category rendering as "no category" with no error anywhere.
//
// CHECK 1 — every `cat` in db.ts has a CT entry (no silent slate fallback).
// CHECK 2 — no CT entry is dead (nothing maps to a `cat` that no longer exists).
//
// CHECK 3 is a WARNING, not a failure: two spellings of one clinical category
// that resolve to DIFFERENT tones. The reader learns the palette on one page and
// carries it to the next, so "Trauma" in amber and "Traumatic" in red is the
// same category in two colours. Fixing it means recolouring a rendered page, so
// this reports rather than blocks — see the flow-side equivalent in lint-cats,
// which canonicalised 101 labels down to 14 and is where this should end up.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { DB } from '../src/data/db'
import { lint } from './lib/lint'

const { fail, warn, note, done } = lint('lesion-category')

const VIEW = join(__dirname, '../src/app/screens/LesionLocView.tsx')
const src = readFileSync(VIEW, 'utf8')
const table = src.slice(src.indexOf('const CT'), src.indexOf('const DEF_TONE'))
const CT = new Map<string, string>(
  [...table.matchAll(/'([^']+)':\s*'([a-z]+)'/g)].map(m => [m[1], m[2]]),
)
if (CT.size === 0) fail('could not parse the CT table out of LesionLocView.tsx — fix this lint rather than deleting it.')

const used = new Map<string, number>()
for (const l of DB.lesion_type) {
  const c = String(l.cat ?? '')
  if (c) used.set(c, (used.get(c) ?? 0) + 1)
}

// ── CHECK 1 ─────────────────────────────────────────────────────────────────
for (const [cat, n] of used) {
  if (!CT.has(cat)) {
    fail(`lesion cat "${cat}" (${n} row(s)) has no CT entry — it renders slate, i.e. as though it had no category. Add it to CT in LesionLocView.tsx.`)
  }
}

// ── CHECK 2 ─────────────────────────────────────────────────────────────────
for (const cat of CT.keys()) {
  if (!used.has(cat)) {
    fail(`CT entry "${cat}" matches no lesion row — dead colour mapping, remove it.`)
  }
}

// ── CHECK 3 ─────────────────────────────────────────────────────────────────
// Two spellings are "the same category" when they share a substantial prefix and
// differ only by a short suffix: Trauma/Traumatic, Haemolysis/Haemolytic,
// Infection/Infectious. Requiring BOTH remainders to be short is what keeps
// genuinely distinct pairs apart — "Renal failure" and "Renal tubular" share six
// leading characters but differ by a whole word, so they are left alone.
const MIN_PREFIX = 6
const MAX_SUFFIX = 4
const commonPrefix = (a: string, b: string) => {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  return i
}
const sameCategory = (a: string, b: string) => {
  const [x, y] = [a.toLowerCase(), b.toLowerCase()]
  const n = commonPrefix(x, y)
  return n >= MIN_PREFIX && x.length - n <= MAX_SUFFIX && y.length - n <= MAX_SUFFIX
}

const cats = [...used.keys()]
let clashes = 0
for (let i = 0; i < cats.length; i++) {
  for (let j = i + 1; j < cats.length; j++) {
    const [a, b] = [cats[i], cats[j]]
    if (!sameCategory(a, b)) continue
    if (CT.get(a) === CT.get(b)) continue
    clashes++
    warn(`"${a}" (${used.get(a)} row(s)) → ${CT.get(a)}  vs  "${b}" (${used.get(b)} row(s)) → ${CT.get(b)}`
      + ' — one clinical category, two spellings, two colours. Canonicalise the spelling in db.ts.')
  }
}

note(`  ${CT.size} category colours cover ${used.size} distinct cat values across ${DB.lesion_type.length} lesion rows.`)
if (clashes) note(`  ${clashes} colour clash(es) above are reported, not enforced — fixing one recolours a rendered page.`)

done(`Lesion category colours are 1:1 with the data (${CT.size} entries, none dead, none missing).`,
  'A cat with no CT entry renders slate; a CT entry with no cat is dead weight.')
