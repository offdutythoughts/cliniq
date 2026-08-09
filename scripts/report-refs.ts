// Citation-coverage report for disease pages.
//
// Not a lint — nothing here fails the build. Disease content cites its sources
// inline as "(Ettinger Ch 314)" / "(Gelatt 6th edn Ch 25)" / "(AAHA 2023)", and
// src/app/screens/diseaseReferences.tsx turns those markers into AMA superscripts
// plus the numbered References list at the foot of the page. A page with NO
// inline marker therefore renders no References block at all — the citation
// machinery is fine, the page simply never told it anything.
//
// This report answers "which pages are those, and how big is the gap":
//
//   npm run report:refs                    summary + per-area breakdown
//   npm run report:refs -- --list          also list every uncited page
//   npm run report:refs -- --partial       list pages cited in some fields only
//
// Uses hasCitation() from the renderer, so the report can never disagree with
// what actually appears on screen.

import { DB } from '../src/data/db'
import { hasCitation } from '../src/app/screens/diseaseReferences'
import { ratchet, setBaseline } from './lib/ratchet'

// Every field the disease section stack renders (mirrors lint-disease-sections).
const FIELDS = [
  'etiology', 'risk', 'path', 'signs', 'conf', 'supp',
  'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'pearl', 'breed', 'age', 'sex', 'ddx',
] as const

const listAll = process.argv.includes('--list')
const listPartial = process.argv.includes('--partial')

type Row = { id: string; name: string; cited: number; populated: number }
const none: Row[] = []
const partial: Row[] = []
const full: Row[] = []

for (const r of DB.disease_page) {
  let cited = 0
  let populated = 0
  for (const f of FIELDS) {
    const v = (r as Record<string, unknown>)[f]
    if (typeof v !== 'string' || !v.trim()) continue
    populated++
    if (hasCitation(v)) cited++
  }
  const row: Row = { id: r.id, name: r.name, cited, populated }
  if (cited === 0) none.push(row)
  else if (cited < populated) partial.push(row)
  else full.push(row)
}

const total = DB.disease_page.length
const pct = (n: number) => `${((n / total) * 100).toFixed(0)}%`

console.log()
console.log(`Disease-page citation coverage — ${total} pages`)
console.log(`  no citation anywhere  ${String(none.length).padStart(4)}  ${pct(none.length)}   → renders NO References block`)
console.log(`  some fields cited     ${String(partial.length).padStart(4)}  ${pct(partial.length)}`)
console.log(`  every field cited     ${String(full.length).padStart(4)}  ${pct(full.length)}`)

// Group the uncited pages by id prefix so the gap maps onto clinical areas.
const byArea = new Map<string, number>()
for (const r of none) {
  const area = r.id.split('-').slice(0, 2).join('-')
  byArea.set(area, (byArea.get(area) ?? 0) + 1)
}
console.log('\nUncited pages by area:')
for (const [area, n] of [...byArea].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${area.padEnd(12)} ${String(n).padStart(3)}`)
}

if (listAll) {
  console.log('\nUncited pages:')
  for (const r of none) console.log(`  ${r.id.padEnd(24)} ${r.name}`)
} else {
  console.log('\n  (re-run with --list to name them, --partial for the partially cited)')
}

if (listPartial) {
  console.log('\nPartially cited pages (cited fields / populated fields):')
  for (const r of [...partial].sort((a, b) => a.cited / a.populated - b.cited / b.populated)) {
    console.log(`  ${String(r.cited).padStart(2)}/${String(r.populated).padEnd(2)}  ${r.id.padEnd(24)} ${r.name}`)
  }
}

// ── Ratchet ───────────────────────────────────────────────────────────────────
// Coverage improved from 198 uncited to 166 in one sitting, and nothing stopped it
// sliding back — a new page ships uncited and no one notices. The count is now a
// high-water mark: adding an uncited page fails, and citing pages prompts you to
// lock the gain in. Same mechanism as lint:deadcontent.
if (process.argv.includes('--write')) {
  setBaseline('uncited-disease-pages', none.length)
  console.log(`\nbaseline written: uncited-disease-pages = ${none.length}`)
} else {
  const r = ratchet('uncited-disease-pages', none.length, 'disease pages carry no citation')
  console.log(`\n${r.ok ? 'ℹ' : '✗'} ${r.message}`)
  if (!r.ok) process.exit(1)
}
console.log()
