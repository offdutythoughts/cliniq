// Defects a clinician sees on the page, which no other lint looks for.
//
// All four of these were live in db.ts and none was visible to the test suite,
// the typechecker, or any structural lint:
//
//   1. DIS-BD-ENV rendered "F(ab\'\\)₂" instead of "F(ab')₂" — an over-escaped
//      source string leaking backslashes into clinical text.
//   2. DIS-RESP-PTE used " | " as a cat/dog COLUMN separator in its
//      antithrombotic table. But '|' splits bullets, so every dog dose rendered
//      as its own bullet with no species label — a reader could have taken
//      clopidogrel "1–3 mg/kg" for a cat, which gets a flat 18.75 mg.
//   3. DIS-NEU-TICKPARAL had a '|' inside a parenthetical, so one sentence broke
//      across two bullets and the first ended "(esp".
//   4. DIS-NEU-POLYP had a '#heading' bullet that had swallowed its first list
//      item, plus items carrying leading spaces.
//
// Cases 2–4 share one signature: a bullet that does not begin and end where a
// sentence does. Leading or trailing whitespace on a bullet is the cheapest
// reliable tell, because it means the author was separating columns, not items.

import { DB } from '../src/data/db'

const FIELDS = [
  'topAlert', 'synonyms', 'breed', 'age', 'sex', 'etiology', 'path', 'signs',
  'severe', 'conf', 'supp', 'tx1', 'tx2', 'monitor', 'prog', 'pearl', 'ddx',
] as const

const fail: string[] = []
let bullets = 0

for (const row of DB.disease_page as unknown as Record<string, unknown>[]) {
  const id = String(row.id)
  for (const f of FIELDS) {
    const v = row[f]
    if (typeof v !== 'string') continue

    const at = (what: string, text: string) =>
      fail.push(`${id}.${f}: ${what}\n      ${JSON.stringify(text.slice(0, 110))}`)

    if (/\|\s*\|/.test(v)) at('empty bullet — "||" renders as a blank list item', v)
    if (/^\s*\|/.test(v)) at('leading "|" renders as a blank first bullet', v)
    if (/\|\s*$/.test(v)) at('trailing "|" renders as a blank last bullet', v)

    for (const b of v.split('|')) {
      bullets++

      // Over-escaping. Rendered clinical text has no business containing a backslash.
      if (b.includes('\\')) {
        at('stray backslash in rendered text (over-escaped source)', b)
      }

      // A bullet padded with spaces means '|' was used as a column separator
      // rather than an item separator — see case 2 above.
      if (b !== b.trim() && b.trim() !== '') {
        at('bullet padded with whitespace — is "|" being used as a column separator?', b)
      }

      // Unbalanced parens break the citation regex, so a marker prints raw.
      // "1) Induction: …" style enumeration legitimately has a bare ')', so a
      // bullet that opens with one is allowed its extra close paren.
      const enumerated = /^\s*\d+\)/.test(b)
      const open = (b.match(/\(/g) || []).length
      const close = (b.match(/\)/g) || []).length - (enumerated ? 1 : 0)
      if (open !== close) {
        at(`unbalanced parentheses (${open} open, ${close} close) — a citation marker here would print raw`, b)
      }
    }
  }
}

if (fail.length) {
  console.error(`✗ ${fail.length} rendered-text defect(s):`)
  for (const f of fail) console.error(`  • ${f}`)
  process.exit(1)
}
console.log(`✓ No rendered-text defects (${bullets} bullets across ${DB.disease_page.length} disease pages).`)
