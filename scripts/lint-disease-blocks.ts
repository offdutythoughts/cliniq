// Validates pipe-markup clinical text across the DB (disease pages + lesions).
// Catches the "bare header" anti-pattern: a `#Header` segment with no bullet
// beneath it, which renders as a stacked green line ("wall of green") instead
// of readable body text — e.g. a Prognosis card authored as `#a|#b|#c`.
//
// Uses the SAME parser the renderer uses (src/app/screens/blocks.ts), so this
// lint can never disagree with what actually appears on screen.

import { DB } from '../src/data/db'
import { parseBlocks, bareHeaderIndices } from '../src/app/screens/blocks'

// String fields on disease/lesion rows that are rendered through <Bul>/<Body>.
const RENDERED_FIELDS = [
  'etiology', 'risk', 'path', 'signs', 'conf', 'supp',
  'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'breed', 'age',
] as const

let errors = 0
function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

let checked = 0
const rows: { id: string; row: Record<string, unknown> }[] = [
  ...DB.disease_page.map(r => ({ id: r.id, row: r as Record<string, unknown> })),
  ...DB.lesion_type.map(r => ({ id: r.id, row: r as Record<string, unknown> })),
]

for (const { id, row } of rows) {
  for (const field of RENDERED_FIELDS) {
    const val = row[field]
    if (typeof val !== 'string' || !val.includes('|')) continue
    checked++
    const blocks = parseBlocks(val)
    const bare = bareHeaderIndices(blocks)
    for (const i of bare) {
      const label = blocks[i].text.slice(0, 60)
      fail(`[${id}] ${field}: bare header "#${label}" — has no bullet beneath it (use a plain bullet, or add content under the header)`)
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} bare-header error(s) across ${rows.length} rows.`)
  process.exit(1)
} else {
  console.log(`✓ No bare headers found (${checked} rendered fields across ${rows.length} rows checked).`)
}
