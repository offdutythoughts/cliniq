// Coverage report for the render-time clinical grouper (src/app/screens/clinicalGrouping.ts).
//
// Not a lint — nothing here fails the build. It answers the only question that
// matters when you tune the lexicon: across all 331 disease pages, which
// `signs` / `supp` fields now render grouped, which stay flat and why, and what
// vocabulary the classifier is still missing.
//
//   npm run report:groups            summary + skip reasons
//   npm run report:groups -- --misses  also list every unclassified item
//   npm run report:groups -- --show DIS-PUPD-HAC   grouping for one page

import { DB } from '../src/data/db'
import {
  groupItems, groupingSkipReason, splitItems, classifyItem,
  type GroupKind, type SkipReason,
} from '../src/app/screens/clinicalGrouping'

const FIELDS: { field: 'signs' | 'supp'; kind: GroupKind; title: string }[] = [
  { field: 'signs', kind: 'signs', title: 'Clinical Signs' },
  { field: 'supp', kind: 'diagnostics', title: 'Supportive Diagnostics' },
]

const args = process.argv.slice(2)
const showId = args.includes('--show') ? args[args.indexOf('--show') + 1] : null
const listMisses = args.includes('--misses')
const str = (v: unknown): string => (typeof v === 'string' ? v : '')

if (showId) {
  const page = DB.disease_page.find(p => p.id === showId)
  if (!page) {
    console.error(`No disease page with id ${showId}`)
    process.exit(1)
  }
  console.log(`\n${page.name}  (${page.id})`)
  for (const { field, kind, title } of FIELDS) {
    const text = str(page[field])
    console.log(`\n── ${title} ──`)
    if (!text) { console.log('  (empty)'); continue }
    const skip = groupingSkipReason(text, kind)
    if (skip) { console.log(`  renders FLAT — ${skip}`); continue }
    const { pinned, groups } = groupItems(text, kind)
    for (const item of pinned) console.log(`  ! ${item.replace(/\|/g, ' / ')}`)
    for (const group of groups) {
      console.log(`  ▸ ${group.label}`)
      for (const item of group.items) console.log(`      • ${item.replace(/\|/g, ' / ')}`)
    }
  }
  process.exit(0)
}

for (const { field, kind, title } of FIELDS) {
  const skips = new Map<SkipReason, string[]>()
  const misses: { id: string; item: string }[] = []
  let grouped = 0
  let empty = 0
  let totalGroups = 0

  for (const page of DB.disease_page) {
    const text = str(page[field])
    if (!text) { empty++; continue }
    const reason = groupingSkipReason(text, kind)
    if (reason) {
      const bucket = skips.get(reason)
      if (bucket) bucket.push(page.id)
      else skips.set(reason, [page.id])
      // A flat page's unmatched vocabulary is the most useful signal of all —
      // these are the terms that would tip it into grouping.
      if (reason === 'low-coverage') {
        for (const item of splitItems(text, kind)) {
          if (classifyItem(item, kind) === null) misses.push({ id: page.id, item: item.split('|')[0] })
        }
      }
      continue
    }
    grouped++
    totalGroups += groupItems(text, kind).groups.length
  }

  const populated = DB.disease_page.length - empty
  const pct = populated ? Math.round((grouped / populated) * 100) : 0
  console.log(`\n=== ${title} (${field}) ===`)
  console.log(`  ${grouped}/${populated} populated pages render grouped (${pct}%)  ·  ${empty} empty`)
  if (grouped) console.log(`  average ${(totalGroups / grouped).toFixed(1)} groups per grouped page`)
  for (const [reason, ids] of [...skips].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  flat — ${reason.padEnd(15)} ${String(ids.length).padStart(3)}   e.g. ${ids.slice(0, 4).join(', ')}`)
  }
  if (misses.length) {
    console.log(`\n  unclassified items on low-coverage pages: ${misses.length}`)
    if (listMisses) for (const m of misses) console.log(`    ${m.id.padEnd(22)} ${m.item}`)
    else console.log('    (re-run with --misses to list them)')
  }
}
console.log()
