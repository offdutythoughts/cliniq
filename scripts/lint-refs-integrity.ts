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
 *    (Evans syndrome)
 *                 — IMHA with immune thrombocytopenia, on DIS-BD-IMHA. Same trap
 *                   as Scott: it resolved to a metronidazole paper until Evans
 *                   was year-keyed. Caught by a reference-count test, not by a
 *                   reader.
 *    (Golden Retriever most common)
 *                 — a breed note on DIS-NEU-HORNERS. 'Gold' is a source name and
 *                   matched it, hanging a basal-cortisol superscript off a breed.
 *                   Found by check 5 on its first run, not by a reader.
 *    (AAHA/AAFP)  — "PPI if indicated (AAHA/AAFP)" is a qualifier naming the
 *                   bodies that prefer it, not a reference to a guideline.
 *    (Librela)    — a drug brand. Matches because `Li` is a source name.
 *
 *  Anything NOT on this list that fails to resolve is a bug. */
const PROSE_QUALIFIERS = new Set([
  'Scott', 'Evans syndrome', 'AAHA/AAFP', 'Librela', 'Golden Retriever most common',
  // On PROT-ENDO-DKA these name whose preference is being reported — "PZI in dogs
  // (AAHA first-choice)" — rather than pointing at a document. A matched
  // parenthetical is replaced by its superscript, so resolving them would delete
  // the words that carry the meaning.
  'AAHA', 'AAHA first-choice',
])

const fail: string[] = []
const note: string[] = []

const refSrc = fs.readFileSync(REF_SRC, 'utf8')
const dbSrc = fs.readFileSync(DB_SRC, 'utf8')
/** Comment prose contains apostrophes and example markers; stripping line
 *  comments keeps them out of the name and map parsing below. */
const refCode = refSrc.replace(/^\s*\/\/.*$/gm, '')

const pageFields = (r: Record<string, unknown>): string[] =>
  FIELDS.map(f => (typeof r[f] === 'string' ? (r[f] as string) : '')).filter(Boolean)

/** Protocol steps carry markers too, and answer to a HIGHER bar than disease
 *  pages (ACVIM consensus or equivalent), so they need the same guarantees. Until
 *  protocols rendered a References block none of this was reachable, which is
 *  exactly how five unresolved protocol markers went unnoticed. */
const protocolFields = (p: { trigger: string; steps: { action: string; doses?: string; note?: string; branch?: string; flag?: string }[] }): string[] => {
  const out = [p.trigger]
  for (const st of p.steps) out.push(st.action, st.doses ?? '', st.note ?? '', st.branch ?? '', st.flag ?? '')
  return out.filter(Boolean)
}

/** Every citable surface in the DB: disease pages and protocols together. */
const allSurfaces: { id: string; fields: string[] }[] = [
  ...DB.disease_page.map(r => ({ id: String(r.id), fields: pageFields(r as unknown as Record<string, unknown>) })),
  ...DB.protocols.map(p => ({ id: p.id, fields: protocolFields(p) })),
]

// ── 0. Allowlisted prose must actually resolve to nothing ────────────────────
// PROSE_QUALIFIERS says "this parenthetical is prose, ignore it". Every entry is
// there because the author was year-keyed so a bare name yields nothing. If that
// dispatch is ever loosened the phrase silently starts resolving again — and the
// allowlist would then hide the very bug it was created for. So the allowlist
// asserts its own premise rather than trusting it.
for (const phrase of PROSE_QUALIFIERS) {
  const hits = parseSources(phrase)
  if (hits.length) {
    fail.push(
      `"(${phrase})" is allowlisted as prose but now resolves to ${hits.map(h => h.id).join(', ')} —` +
      ` the page is citing a paper for a phrase that is not a citation.` +
      `\n      Restore the year-keyed dispatch (or the \\b guard) that used to make it resolve to nothing.`,
    )
  }
}

// ── 1. Every citation-shaped marker resolves ─────────────────────────────────
const unresolved = new Map<string, string[]>()
for (const surface of allSurfaces) {
  for (const field of surface.fields) {
    for (const seg of splitCitations(field)) {
      if (!seg.raw || (seg.citeIds ?? []).length > 0) continue
      const inner = seg.raw.trim().replace(/^\s*\(|\)\s*$/g, '')
      if (PROSE_QUALIFIERS.has(inner)) continue
      if (!unresolved.has(inner)) unresolved.set(inner, [])
      unresolved.get(inner)!.push(surface.id)
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

// ── 5. A year-less marker must not resolve to a journal paper ────────────────
// The two bugs this catches were both found by hand, one of them twice:
// "(Scott)" on DIS-BD-TPATH is Scott syndrome and "(Evans syndrome)" on
// DIS-BD-IMHA is IMHA with thrombocytopenia. Both are DISEASE NAMES that happen
// to be spelled like an author, both resolved to an unrelated paper, and both
// rendered a confident superscript on a condition. Nothing above sees it: the
// marker resolves, so check 1 is happy, and the author has one paper, so there
// is no year map for check 2 to test.
//
// The signature is narrow and reliable — a parenthetical carrying NO year that
// resolves to something with a DOI or a volume. Textbook markers are year-less
// too ("Ettinger Ch 314", "Gelatt 6th edn Ch 20"), so this only fires on
// journal papers, which is what makes it quiet enough to gate on.
const looksLikePaper = (t: string) => /\bdoi:/.test(t) || /\d{4};\d+/.test(t)
for (const r of DB.disease_page) {
  for (const field of pageFields(r as unknown as Record<string, unknown>)) {
    for (const seg of splitCitations(field)) {
      if (!seg.raw) continue
      const inner = seg.raw.trim().replace(/^\s*\(|\)\s*$/g, '')
      if (PROSE_QUALIFIERS.has(inner) || /\b(?:19|20)\d{2}\b/.test(inner)) continue
      for (const src of parseSources(inner)) {
        if (!looksLikePaper(src.text)) continue
        fail.push(
          `"(${inner})" on ${r.id} carries no year but resolves to the paper ${src.id} —` +
          ` almost certainly a disease name colliding with an author surname.` +
          `\n      Year-key that author so a bare name resolves to nothing, then list the phrase in PROSE_QUALIFIERS.`,
        )
      }
    }
  }
}

// ── 6. Two years for one surname must mean two different papers ──────────────
// When an author gains a second paper, the new branch is easy to add and easy to
// add WITHOUT noticing the old one — `/^Phillips/` then answers for both markers
// and the earlier page silently starts citing the newer study. That is a wrong
// citation, not a missing one, so check 1 cannot see it either.
const yearsByName = new Map<string, Set<string>>()
for (const r of DB.disease_page) {
  for (const field of pageFields(r as unknown as Record<string, unknown>)) {
    for (const seg of splitCitations(field)) {
      if (!seg.raw) continue
      const inner = seg.raw.trim().replace(/^\s*\(|\)\s*$/g, '')
      const m = inner.match(/^(.+?)\s+((?:19|20)\d{2})\b/)
      if (!m) continue
      if (!yearsByName.has(m[1])) yearsByName.set(m[1], new Set())
      yearsByName.get(m[1])!.add(m[2])
    }
  }
}
for (const [name, years] of yearsByName) {
  if (years.size < 2) continue
  const byYear = new Map<string, string>()
  for (const y of years) {
    for (const src of parseSources(`${name} ${y}`)) {
      const prev = byYear.get(src.id)
      if (prev && prev !== y) {
        fail.push(
          `'${name}' is cited for ${prev} and ${y} but both resolve to ${src.id} — one of those pages cites the WRONG paper.` +
          `\n      Add a ${name.toUpperCase().replace(/[^A-Z0-9]/g, '')}_BY_YEAR map and dispatch on the year.`,
        )
      }
      byYear.set(src.id, y)
    }
  }
}

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

// ── 7. No stray control characters in the source ─────────────────────────────
// Twice now, generating these files through a shell heredoc into Python has
// written a control character where an escape was intended: a NUL byte in place
// of a space (which made `grep` treat the file as binary and silently match
// nothing), and 0x08 backspaces in place of `\b` in a year-matching regex.
//
// The backspace case is the nastier one. `tsc` accepts it, the regex is valid,
// the branch is reachable, and it simply never matches — so the author sees a
// marker that resolves to nothing with no indication why. It cost two debugging
// passes before the bytes were dumped. Checking for them is one line.
for (const [label, text] of [['diseaseReferences.tsx', refSrc], ['db.ts', dbSrc]] as const) {
  for (const m of text.matchAll(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g)) {
    const line = text.slice(0, m.index).split('\n').length
    fail.push(
      `${label}:${line} contains a stray control character (0x${m[0].charCodeAt(0).toString(16).padStart(2, '0')}).` +
      `\n      Almost certainly an escape that was consumed a layer too early — \\b became a backspace, or a space became NUL.`,
    )
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
if (fail.length) {
  console.error(`✗ ${fail.length} citation-resolver integrity problem(s):`)
  for (const f of fail) console.error(`  • ${f}`)
  process.exit(1)
}
console.log(`✓ Citation resolver is internally consistent (${note.join('; ')}).`)
