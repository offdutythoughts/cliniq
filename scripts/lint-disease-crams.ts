// Worklist + guardrail for "crammed" clinical bullets: a single bullet that
// crams multiple distinct concepts behind a semicolon, instead of splitting
// them into separate bullets / drug-class headers (the PSS treatment pattern —
// see DIS-HEP-PSS). Crammed prose is hard to scan at the point of care.
//
// Uses the SAME parser the renderer uses (src/app/screens/blocks.ts), so a
// "bullet" here is exactly what renders as a bullet on screen.
//
// Two modes, because this is both a worklist and a gate.
//
// WORKLIST (default, exit 0): prints every finding, so a cleanup pass has
// something to work from and we never hand-scan 328 pages.
//
// RATCHET (--ci, what `lint:content` runs): prints one summary line and fails
// only when the count RISES above scripts/baselines.json (see lib/ratchet.ts).
// The backlog is ~1000 bullets — too large to gate on outright, and printing it
// on every CI run would bury the other nineteen lints. Ratcheting is what stops
// it growing while it is worked down. --strict remains the eventual end state:
// a hard gate, once a field is actually clean.
//
//   npx tsx scripts/lint-disease-crams.ts                 # all target fields
//   npx tsx scripts/lint-disease-crams.ts --field=tx1     # one field
//   npx tsx scripts/lint-disease-crams.ts --only=high     # high-confidence only
//   npx tsx scripts/lint-disease-crams.ts --full          # untruncated bullets
//   npx tsx scripts/lint-disease-crams.ts --ci            # ratchet (one line)
//   npx tsx scripts/lint-disease-crams.ts --write         # seed/lower the mark
//   npx tsx scripts/lint-disease-crams.ts --strict        # exit 1 if any found

import { DB } from '../src/data/db'
import { parseBlocks, type Block } from '../src/app/screens/blocks'
import { ratchet, setBaseline } from './lib/ratchet'

// Fields carrying scannable list content where cramming hurts most. Ordered by
// clinical priority (treatment first) — drives report order.
const TARGET_FIELDS = ['tx1', 'tx2', 'signs', 'conf', 'supp'] as const
type Field = (typeof TARGET_FIELDS)[number]

const SEMI = /;\s+\S/                                  // a semicolon that joins clauses
const DOSE = /\b(mg\/kg|µg\/kg|mcg\/kg|U\/kg|mL\/kg|g\/kg|mg\/cat|IV|IM|SC|PO|CRI|q\d|BID|SID|TID)\b/i
// A leading "Label:" or staging tag ("B1:", "Stage 2 =", "Type I") signals a
// definition whose internal semicolons are clause separators, not a list.
const DEFINITIONAL = /^([A-Z][A-Za-z0-9 /()-]{0,28}:|B\d|Stage\s|Type\s+[IVX])/

/** Blank out parenthesised spans so a semicolon INSIDE a dose/qualifier
 *  parenthetical ("methadone (opioids preferred; avoid NSAIDs)") is not read
 *  as a top-level list separator. Length preserved; only ( ) content masked. */
function maskParens(s: string): string {
  let depth = 0
  let out = ''
  for (const ch of s) {
    if (ch === '(') { depth++; out += ch; continue }
    if (ch === ')') { depth = Math.max(0, depth - 1); out += ch; continue }
    out += depth > 0 && ch !== ' ' ? '·' : ch
  }
  return out
}

type Confidence = 'high' | 'low'
interface Finding {
  id: string; name: string; field: Field; conf: Confidence
  headers: number; text: string
}

/** Classify a crammed bullet. High = clearly an enumeration that should be
 *  separate bullets (dose/route on both sides of a `;`, or 2+ semicolons).
 *  Low = a single semicolon inside what looks like one definition. */
function classify(text: string): Confidence | null {
  const masked = maskParens(text)                           // ignore in-paren semicolons
  if (!SEMI.test(masked)) return null
  const parts = masked.split(';')
  const semis = parts.length - 1
  if (semis >= 2) return 'high'
  const [a, b] = parts
  if (DOSE.test(a) && DOSE.test(b)) return 'high'          // drug/step enumeration
  if (DEFINITIONAL.test(masked.trim())) return 'low'        // labelled definition
  return 'high'
}

const args = process.argv.slice(2)
const only = args.find(a => a.startsWith('--field='))?.slice(8) as Field | undefined
const conf = args.find(a => a.startsWith('--only='))?.slice(7) as Confidence | undefined
const full = args.includes('--full')
const strict = args.includes('--strict')
const ci = args.includes('--ci')
const write = args.includes('--write')

const findings: Finding[] = []
for (const r of DB.disease_page as unknown as (Record<string, unknown> & { id: string; name: string })[]) {
  for (const field of TARGET_FIELDS) {
    if (only && field !== only) continue
    const val = r[field]
    if (typeof val !== 'string' || !val.includes('|')) continue
    const blocks = parseBlocks(val)
    const headers = blocks.filter((b: Block) => b.kind === 'header').length
    for (const b of blocks) {
      if (b.kind !== 'bullet' && b.kind !== 'sub') continue
      const c = classify(b.text)
      if (!c) continue
      if (conf && c !== conf) continue
      findings.push({ id: r.id, name: r.name, field, conf: c, headers, text: b.text })
    }
  }
}

// PSS-style first (0 headers in the field), then high before low confidence.
const fieldOrder = (f: Field) => TARGET_FIELDS.indexOf(f)
findings.sort((x, y) =>
  fieldOrder(x.field) - fieldOrder(y.field) ||
  (x.headers === 0 ? 0 : 1) - (y.headers === 0 ? 0 : 1) ||
  (x.conf === 'high' ? 0 : 1) - (y.conf === 'high' ? 0 : 1) ||
  x.id.localeCompare(y.id))

// The full listing is the worklist. In --ci it is suppressed unless the ratchet
// has actually broken — a thousand known findings on every green run is noise
// nobody reads, which is how a warning-only lint stops being read at all.
const listFindings = () => {
  let lastField = ''
  for (const f of findings) {
    if (f.field !== lastField) { console.log(`\n=== ${f.field} ===`); lastField = f.field }
    const tag = f.conf === 'high' ? 'HIGH' : 'low '
    const pss = f.headers === 0 ? ' [PSS-style: no headers]' : ''
    const body = full ? f.text : f.text.slice(0, 100)
    console.log(`  ${tag} [${f.id}]${pss}\n       ${body}`)
  }
}

const byField = TARGET_FIELDS.map(f => {
  const n = findings.filter(x => x.field === f).length
  return n ? `${f}=${n}` : null
}).filter(Boolean).join('  ')
const high = findings.filter(f => f.conf === 'high').length
const tally = `${findings.length} crammed bullet(s) (${high} high-confidence).  ${byField}`

if (write) {
  setBaseline('crammed-bullets', findings.length)
  console.log(`baseline written: crammed-bullets = ${findings.length}`)
  process.exit(0)
}

if (!ci) {
  listFindings()
  console.log(`\n${tally}`)
  if (strict && findings.length > 0) process.exit(1)
  process.exit(0)
}

// --ci: ratchet on the total. A narrowing filter (--field / --only) would
// compare a subset against a whole-corpus mark, so refuse rather than mislead.
if (only || conf) {
  console.error('✗ lint-crams: --ci cannot be combined with --field/--only (the baseline covers all fields).')
  process.exit(1)
}
const r = ratchet('crammed-bullets', findings.length, 'crammed clinical bullet(s)')
if (!r.ok) listFindings()
console.log(`${r.ok ? 'ℹ' : '✗'} ${r.message}`)
console.log(`  (${byField} — a bullet cramming concepts behind ';' should be split; see DIS-HEP-PSS.)`)
if (!r.ok) process.exit(1)
