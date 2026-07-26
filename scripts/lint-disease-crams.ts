// Worklist + guardrail for "crammed" clinical bullets: a single bullet that
// crams multiple distinct concepts behind a semicolon, instead of splitting
// them into separate bullets / drug-class headers (the PSS treatment pattern —
// see DIS-HEP-PSS). Crammed prose is hard to scan at the point of care.
//
// Uses the SAME parser the renderer uses (src/app/screens/blocks.ts), so a
// "bullet" here is exactly what renders as a bullet on screen.
//
// This is primarily a WORKLIST generator (report, exit 0): it finds the fields
// worth categorising so we never hand-scan 328 pages. Pass --strict to make it
// a hard gate (exit 1 on any finding) once a field has been cleaned.
//
//   npx tsx scripts/lint-disease-crams.ts                 # all target fields
//   npx tsx scripts/lint-disease-crams.ts --field=tx1     # one field
//   npx tsx scripts/lint-disease-crams.ts --only=high     # high-confidence only
//   npx tsx scripts/lint-disease-crams.ts --full          # untruncated bullets
//   npx tsx scripts/lint-disease-crams.ts --strict        # exit 1 if any found

import { DB } from '../src/data/db'
import { parseBlocks, type Block } from '../src/app/screens/blocks'

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

let lastField = ''
for (const f of findings) {
  if (f.field !== lastField) { console.log(`\n=== ${f.field} ===`); lastField = f.field }
  const tag = f.conf === 'high' ? 'HIGH' : 'low '
  const pss = f.headers === 0 ? ' [PSS-style: no headers]' : ''
  const body = full ? f.text : f.text.slice(0, 100)
  console.log(`  ${tag} [${f.id}]${pss}\n       ${body}`)
}

const byField = TARGET_FIELDS.map(f => {
  const n = findings.filter(x => x.field === f).length
  return n ? `${f}=${n}` : null
}).filter(Boolean).join('  ')
const high = findings.filter(f => f.conf === 'high').length
console.log(`\n${findings.length} crammed bullet(s) (${high} high-confidence).  ${byField}`)

if (strict && findings.length > 0) process.exit(1)
