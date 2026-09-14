// Keeps type sizes on the scale, and keeps the floor where it was put.
//
// globals.css declares a typography scale and says of it: "never hardcode a px
// size here". The codebase then carried ~200 hardcoded `font-size:Npx`
// declarations against 15 uses of the scale — including 51 hand-picked sizes
// between 8px and 9.5px, on the flowcharts and the IRIS/injury grading tables a
// vet reads numbers off. Nothing had chosen those sizes; they had accumulated.
//
// CHECK 1 is a hard gate: no font-size literal below the floor, anywhere except
// the token definitions themselves. This is what stops the dense surfaces
// drifting back under 10px one component at a time. Changing the floor is then
// a deliberate edit to four numbers in :root, which is the point.
//
// CHECK 2 is a ratchet (lib/ratchet.ts) on every remaining hardcoded size. The
// rest are 10px and up — legible, but still a size chosen at a call site rather
// than a role chosen from the scale. The count can only fall.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { sourceFiles } from './lib/sources'
import { ratchet, setBaseline } from './lib/ratchet'
import { lint } from './lib/lint'

const { fail, note, done } = lint('typography')
const WRITE = process.argv.includes('--write')

/** Below this, a size has to be a token — so raising the floor is one edit. */
const FLOOR = 10

const CSS = join(__dirname, '../src/app/globals.css')
const SIZE = /font-size:\s*([0-9.]+)px/g

interface Hit { where: string; size: number; line: string }
const hits: Hit[] = []

/** A `--fs-*: Npx` declaration anywhere — :root, or a container-scoped override
 *  (`.step-note { --fs-body: 11px }`, which shrinks embedded markup). */
const TOKEN_DEF = /(--fs-[a-z-]+):\s*([0-9.]+)px/g
/** A line that is ONLY a scale declaration — skipped by the literal scan below,
 *  since there it is the definition rather than a bypass of it. */
function isTokenDefinition(line: string): boolean {
  return /^\s*--fs-[a-z-]+:\s*[0-9.]+px;\s*$/.test(line)
}

/** The scale's own values are held to the floor too.
 *
 *  Exempting them would leave the gate half-built: call sites could not write
 *  8.5px, but a token could be quietly lowered to 8.5px and every call site
 *  would follow it down. The floor is a property of what renders, not of how it
 *  is spelled. --fs-chip-sub is the smallest role on the clinical surface, so it
 *  IS the floor; raising or lowering it is a deliberate one-line design change
 *  that this lint makes visible in review. */
function checkTokenValues(): Map<string, number> {
  const scale = new Map<string, number>()
  readFileSync(CSS, 'utf8').split('\n').forEach((line, i) => {
    // matchAll, not match: the container overrides pack several declarations
    // onto one line, and a per-line check would only ever see the first.
    for (const m of line.matchAll(TOKEN_DEF)) {
      const [, name, px] = m
      if (!scale.has(name)) scale.set(name, Number(px))
      if (Number(px) < FLOOR) {
        fail(`src/app/globals.css:${i + 1} — ${name} is ${px}px, below the ${FLOOR}px floor. `
          + `The scale is what the flowcharts and the IRIS/injury grading tables render at; `
          + `lowering it lowers all of them.`)
      }
    }
  })
  return scale
}

function scan(file: string, label: string) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (isTokenDefinition(line)) return
    for (const m of line.matchAll(SIZE)) {
      hits.push({ where: `${label}:${i + 1}`, size: Number(m[1]), line: line.trim().slice(0, 100) })
    }
  })
}

const scale = checkTokenValues()
scan(CSS, 'src/app/globals.css')
// The clinical surface. The marketing pages under components/site and app/page
// are a separate design system (--v-* tokens, Tailwind text-[…]) and are not in
// scope here.
for (const f of sourceFiles(join(__dirname, '../src/app/screens'))) scan(f, f.replace(/^.*\/src\//, 'src/'))
for (const f of sourceFiles(join(__dirname, '../src/app/search'))) scan(f, f.replace(/^.*\/src\//, 'src/'))

// ── CHECK 1 — the floor ─────────────────────────────────────────────────────
const below = hits.filter(h => h.size < FLOOR)
for (const h of below) {
  fail(`${h.where} — font-size:${h.size}px is below the ${FLOOR}px floor. `
    + `Use a role token (--fs-box / --fs-chip / --fs-chip-sub), or change the floor in :root deliberately.\n`
    + `      ${h.line}`)
}

// ── CHECK 2 — everything else, ratcheted ────────────────────────────────────
const rest = hits.length - below.length

if (WRITE) {
  setBaseline('hardcoded-font-sizes', rest)
  console.log(`baseline written: hardcoded-font-sizes = ${rest}`)
  process.exit(0)
}

const r = ratchet('hardcoded-font-sizes', rest, 'hardcoded font-size(s) at or above the floor')
if (r.ok) {
  note(`ℹ ${r.message}`)
  const byValue = new Map<number, number>()
  for (const h of hits) if (h.size >= FLOOR) byValue.set(h.size, (byValue.get(h.size) ?? 0) + 1)
  note('  ' + [...byValue.entries()].sort((a, b) => a[0] - b[0]).map(([v, n]) => `${v}px×${n}`).join('  '))
} else {
  for (const h of hits.filter(x => x.size >= FLOOR).slice(0, 20)) fail(`${h.where} — font-size:${h.size}px`)
  fail(r.message)
}

note('  scale: ' + [...scale.entries()].map(([n, v]) => `${n.replace('--fs-', '')} ${v}px`).join('  '))

done(`No font-size below the ${FLOOR}px floor across the clinical surface (${hits.length} sizes checked).`,
  'The dense scale lives in :root — --fs-box / --fs-chip / --fs-chip-sub.')
