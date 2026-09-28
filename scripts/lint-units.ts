// Canonical units for analytes where the right unit is not a matter of taste.
//
// Two pages gave canine cobalamin as "<200 ng/mL". It is ng/L — a thousandfold
// error, sitting behind a textbook citation, contradicting a third page that had
// the same analyte right. DIS-RESP-PTE gave D-dimer in ng/dL where the
// literature and the rest of the app use ng/mL.
//
// Both were found by hand while citing papers, which does not scale and is not
// repeatable. This asserts the unit instead.
//
// Only analytes with ONE defensible unit belong here. Glucose, lactate, albumin,
// calcium and cortisol are all legitimately written in both SI and conventional
// units in this file, and are deliberately absent — a lint that fires on those
// would be noise, and noise is how a real failure gets scrolled past.

import { DB } from '../src/data/db'

const CANONICAL: { analyte: string; match: RegExp; unit: string; why: string }[] = [
  {
    analyte: 'cobalamin',
    match: /cobalamin|vitamin\s*B\s*12/i,
    unit: 'ng/L',
    why: 'serum cobalamin reference interval is ~244-959 ng/L; ng/mL is 1000x off',
  },
  {
    analyte: 'D-dimer',
    match: /D-dimer/i,
    unit: 'ng/mL',
    why: 'canine D-dimer cut-offs are reported in ng/mL (Epstein 2013 used 250 ng/mL)',
  },
]

/** Units that would be wrong for the analytes above, so a hit is unambiguous. */
const WRONG = /(?:ng\/mL|ng\/L|ng\/dL|µg\/L|ug\/L|µg\/dL|pg\/mL)/

const FIELDS = [
  'topAlert', 'synonyms', 'breed', 'age', 'sex', 'etiology', 'path', 'signs',
  'severe', 'conf', 'supp', 'tx1', 'tx2', 'monitor', 'prog', 'pearl', 'ddx',
] as const

const fail: string[] = []
let checked = 0

for (const row of DB.disease_page as unknown as Record<string, unknown>[]) {
  for (const f of FIELDS) {
    const text = row[f]
    if (typeof text !== 'string') continue
    for (const bullet of text.split('|')) {
      for (const { analyte, match, unit, why } of CANONICAL) {
        if (!match.test(bullet)) continue
        // Any number carrying a concentration unit counts, with or without a
        // comparator: the first version of this required < or >, and missed
        // "at a 250 ng/mL cut-off" — which is exactly how the corrected D-dimer
        // bullet is phrased. Doses are written "250 µg", never "250 µg/L", so
        // dropping the comparator does not start matching doses.
        for (const m of bullet.matchAll(new RegExp(`[0-9][0-9.,–-]*\\s?(${WRONG.source})`, 'g'))) {
          checked++
          if (m[1] !== unit) {
            fail.push(
              `${String(row.id)}.${f}: ${analyte} given as "${m[0]}" — should be ${unit}.` +
              `\n      ${why}` +
              `\n      "${bullet.trim().slice(0, 110)}"`,
            )
          }
        }
      }
    }
  }
}

if (fail.length) {
  console.error(`✗ ${fail.length} analyte unit error(s):`)
  for (const f of fail) console.error(`  • ${f}`)
  process.exit(1)
}
console.log(`✓ Analyte units canonical (${checked} measurement(s) checked across ${CANONICAL.length} analyte(s)).`)
