// Structural integrity of the citation resolver.
//
// `report-refs` counts HOW MANY pages carry a citation. This checks that the
// citations we do have still point at the right paper, which is a different and
// quieter failure. Nothing here looks at coverage.
//
// Four things go wrong as the reference list grows, and all four are silent —
// the page renders, the tests pass, and the superscript points somewhere wrong:
//
//   1. A marker stops resolving. `parseSources` returns nothing, <Cite> falls
//      back to printing the raw "(Author 2015)", and the reader sees plumbing.
//   2. An author gains a second paper. `/^Smith/` matched one work; now it
//      matches both markers and prints whichever branch is written first. The
//      fix is a *_BY_YEAR map — but the map only helps if every marker in
//      db.ts uses a year the map actually knows. A marker with an unmapped year
//      silently yields NO citation.
//   3. One surname is a prefix of another (Reeve/Reeves, Ng/Nguyen, Ku/Kubo).
//      Whichever branch is tested first wins, so the shorter name can swallow
//      the longer one's marker and attach a completely unrelated paper.
//   4. The same paper is added twice under different ids, so one page renders it
//      as two numbered references.
//
// Every one of those was found by hand at least once while the disease pages
// were being cited. Hand-checking does not scale past a few hundred references,
// so it runs here instead.

import { parseSources, splitCitations } from '../src/app/screens/diseaseReferences'
import { DB } from '../src/data/db'
import * as fs from 'node:fs'
import * as path from 'node:path'

const REF_SRC = path.join(__dirname, '..', 'src', 'app', 'screens', 'diseaseReferences.tsx')
const DB_SRC = path.join(__dirname, '..', 'src', 'data', 'db.ts')

/** Fields that render citations. Kept in step with report-refs. */
const FIELDS = [
  'topAlert', 'synonyms', 'breed', 'age', 'sex', 'etiology', 'path', 'signs',
  'severe', 'conf', 'supp', 'tx1', 'tx2', 'monitor', 'prog', 'pearl', 'ddx',
] as const

/** Parentheticals that START with a source name but are NOT citations — they are
 *  prose, and must keep printing as written. Each is here because the text reads
 *  wrong without it, not because resolving it is hard:
 *
 *    (Scott)      — Scott syndrome, a platelet procoagulant defect, on
 *                   DIS-BD-TPATH. Before `Scott` was year-keyed this resolved to
 *                   a phenobarbital marrow paper and put a superscript on a
 *                   disease name. Keep it unresolved.
 *    (AAHA/AAFP)  — "PPI if indicated (AAHA/AAFP)" is a qualifier naming the
 *                   bodies that prefer it, not a reference to a guideline.
 *    (Librela)    — a drug brand. Matches because `Li` is a source name.
 *
 *  Anything NOT on this list that fails to resolve is a bug. */
const PROSE_QUALIFIERS = new Set(['Scott', 'AAHA/AAFP', 'Librela'])

const fail: string[] = []
const note: string[] = []

const refSrc = fs.readFileSync(REF_SRC, 'utf8')
const dbSrc = fs.readFileSync(DB_SRC, 'utf8')
/** Comment prose contains apostrophes and example markers; stripping line
 *  comments keeps them out of the name and map parsing below. */
const refCode = refSrc.replace(/^\s*\/\/.*$/gm, '')

const pageFields = (r: Record<string, unknown>): string[] =>
  FIELDS.map(f => (typeof r[f] === 'string' ? (r[f] as string) : '')).filter(Boolean)

// ── 1. Every citation-shaped marker resolves ─────────────────────────────────
const unresolved = new Map<string, string[]>()
for (const r of DB.disease_page) {
  for (const field of pageFields(r as unknown as Record<string, unknown>)) {
    for (const seg of splitCitations(field)) {
      if (!seg.raw || (seg.citeIds ?? []).length > 0) continue
      const inner = seg.raw.trim().replace(/^\s*\(|\)\s*$/g, '')
      if (PROSE_QUALIFIERS.has(inner)) continue
      if (!unresolved.has(inner)) unresolved.set(inner, [])
      unresolved.get(inner)!.push(r.id)
    }
  }
}
for (const [marker, pages] of unresolved) {
  fail.push(
    `marker "(${marker})" resolves to nothing and will print raw — on ${pages.length} page(s): ${pages.slice(0, 4).join(', ')}` +
    `\n      Add a resolver branch, correct the year, or list it in PROSE_QUALIFIERS if it is prose.`,
  )
}

// ── 2. Year-keyed authors: db.ts never uses an unmapped year ─────────────────
/** Brace-balanced so the `{ id, text }` values inside a map do not end it early. */
function mapBody(from: number): string {
  let depth = 0
  for (let i = from; i < refCode.length; i++) {
    if (refCode[i] === '{') depth++
    else if (refCode[i] === '}' && --depth === 0) return refCode.slice(from, i)
  }
  return ''
}
const yearKeyed: { name: string; mapped: string[] }[] = []
for (const m of refCode.matchAll(/const ([A-Z_0-9]+)_BY_YEAR[^=]*=\s*\{/g)) {
  const open = m.index! + m[0].length - 1
  const mapped = [...mapBody(open).matchAll(/'(\d{4})'\s*:/g)].map(x => x[1])
  // ACVIM and ONEILL are spelled differently in markers than in the const name.
  const display =
    m[1] === 'ONEILL' ? 'O’Neill' : m[1] === 'ACVIM' ? 'ACVIM'
    : m[1].charAt(0) + m[1].slice(1).toLowerCase()
  yearKeyed.push({ name: display, mapped })

  const used = new Set(
    [...dbSrc.matchAll(new RegExp(`\\(${display}\\s+((?:19|20)\\d{2})`, 'g'))].map(x => x[1]),
  )
  const orphan = [...used].filter(y => !mapped.includes(y))
  if (orphan.length) {
    fail.push(
      `${display} is year-keyed but db.ts uses unmapped year(s) ${orphan.join(', ')} — those markers yield NO citation.` +
      `\n      Add them to ${m[1]}_BY_YEAR, or fix the year in the marker.`,
    )
  }
}

// ── 3. Prefix pairs resolve correctly in BOTH directions ─────────────────────
const namesM = refCode.match(/const SOURCE_NAMES = \[([\s\S]*?)\] as const/)
if (!namesM) fail.push('could not parse SOURCE_NAMES — this lint cannot check prefix pairs')
const names = namesM
  ? [...new Set([...namesM[1].matchAll(/'([^']{2,})'/g)].map(x => x[1]))].filter(n => /^[A-ZÀ-Þ]/.test(n))
  : []

const yearsUsed = (n: string): string[] =>
  [...new Set([...dbSrc.matchAll(new RegExp(`\\(${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+((?:19|20)\\d{2})`, 'g'))].map(x => x[1]))]

const pairs = [...new Set(
  names.flatMap(a => names.filter(b => b !== a && b.startsWith(a)).map(b => `${a} ${b}`)),
)]
for (const p of pairs) {
  const [shortN, longN] = p.split(' ')
  const idsFor = (n: string) =>
    new Set(yearsUsed(n).flatMap(y => parseSources(`${n} ${y}`).map(s => s.id)))
  const shortIds = idsFor(shortN)
  const longIds = idsFor(longN)

  // Failure mode A: the marker resolves to nothing and prints raw.
  for (const n of [longN, shortN]) {
    for (const y of yearsUsed(n)) {
      if (!parseSources(`${n} ${y}`).length) {
        fail.push(
          `prefix pair '${shortN}' \u2282 '${longN}': "${n} ${y}" resolves to nothing.` +
          `\n      Order the longer name's branch FIRST in parseSources, or guard the shorter with \\b.`,
        )
      }
    }
  }

  // Failure mode B \u2014 the quiet one, and the reason this check exists. The
  // shorter branch is tested first and carries no \b, so it MATCHES the longer
  // surname and returns its own unrelated paper. Nothing looks broken: the
  // marker resolves, the superscript renders, the reference list is well formed,
  // and the page cites the wrong study. An empty-result check cannot see it.
  // The signature is the two names landing on the same reference id.
  const shared = [...longIds].filter(id => shortIds.has(id))
  if (shared.length) {
    fail.push(
      `prefix pair '${shortN}' \u2282 '${longN}': both resolve to ${shared.join(', ')} \u2014 '${shortN}' is swallowing '${longN}' and citing the WRONG paper.` +
      `\n      Guard the shorter name (/^${shortN}\\b/), or order '${longN}' first.`,
    )
  }
}

note.push(`${pairs.length} prefix pair(s) checked, ${yearKeyed.length} year-keyed author(s) checked`)

// ── 4. One paper, one reference id — and one text per id ─────────────────────
const byDoi = new Map<string, Set<string>>()
const byId = new Map<string, Set<string>>()
for (const r of DB.disease_page) {
  for (const e of buildEntries(r as unknown as Record<string, unknown>)) {
    if (!byId.has(e.id)) byId.set(e.id, new Set())
    byId.get(e.id)!.add(e.text)
    const d = e.text.match(/doi:(\S+)/)?.[1]?.replace(/[.,]$/, '').toLowerCase()
    if (!d) continue
    if (!byDoi.has(d)) byDoi.set(d, new Set())
    byDoi.get(d)!.add(e.id)
  }
}
function buildEntries(r: Record<string, unknown>): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = []
  for (const field of pageFields(r)) {
    for (const seg of splitCitations(field)) {
      if (!seg.raw) continue
      out.push(...parseSources(seg.raw.trim().replace(/^\s*\(|\)\s*$/g, '')))
    }
  }
  return out
}
for (const [doi, ids] of byDoi) {
  if (ids.size > 1) {
    fail.push(
      `one DOI under ${ids.size} reference ids (${[...ids].join(', ')}): ${doi}` +
      `\n      A page citing both renders the same paper twice. Merge them.`,
    )
  }
}
for (const [id, texts] of byId) {
  if (texts.size > 1) {
    fail.push(`reference id '${id}' has ${texts.size} different reference strings — pick one`)
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
if (fail.length) {
  console.error(`✗ ${fail.length} citation-resolver integrity problem(s):`)
  for (const f of fail) console.error(`  • ${f}`)
  process.exit(1)
}
console.log(`✓ Citation resolver is internally consistent (${note.join('; ')}).`)
