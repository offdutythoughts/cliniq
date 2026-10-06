// Efficacy claims that are neither sourced nor hedged.
//
// The standing rule on this project is that a clinical claim is either backed by
// a peer-reviewed paper, or — where the evidence is contested, single-centre or
// small — written so the reader can see that: "some clinicians reported…",
// "in 17 dogs…", or an explicit percentage.
//
// What this catches is the third case: a bare superlative. "Excellent results",
// "treatment of choice", "curative", "definitive" with nothing behind them read
// as settled fact, and a clinician cannot tell whether that reflects a trial, a
// textbook sentence, or somebody's impression. Several such lines in this file
// turned out to be the latter.
//
// It deliberately does NOT fire when the bullet already carries a citation, a
// hedge, or a number — any of the three makes the claim's basis legible, which
// is the whole point. It is ratcheted, because the backlog is real and large.

import { DB } from '../src/data/db'
import { hasCitation } from '../src/app/screens/diseaseReferences'
import { ratchet } from './lib/ratchet'
import { lint } from './lib/lint'

const { fail, note, done } = lint('unhedged-claims')

/** Fields where an efficacy or certainty claim is actually a clinical
 *  recommendation. `etiology`, `path` and `signs` describe disease rather than
 *  recommending anything, so they are out of scope. */
const FIELDS = ['conf', 'supp', 'tx1', 'tx2', 'monitor', 'prog', 'pearl'] as const

/** Unhedged assertions of efficacy or certainty. Each needs a source, a hedge or
 *  a number — not because the claim is wrong, but because the reader cannot
 *  weigh it otherwise. */
const CLAIMS: { pattern: RegExp; why: string }[] = [
  { pattern: /\bexcellent (?:results?|outcomes?|prognosis|success)\b/i, why: 'superlative outcome claim' },
  { pattern: /\btreatment of choice\b/i, why: 'asserts primacy over alternatives' },
  { pattern: /\b(?:is|are) curative\b|\bpotentially curative\b|\bdefinitive (?:treatment|therapy|cure)\b/i, why: 'cure claim' },
  { pattern: /\b(?:significantly|markedly) (?:improves?|increases?|reduces?|extends?|prolongs?)\b/i, why: 'claims a significant effect' },
  { pattern: /\bmost effective\b|\bsuperior to\b|\bbest outcomes?\b/i, why: 'comparative efficacy claim' },
  { pattern: /\breliably (?:resolves?|controls?|prevents?|corrects?)\b/i, why: 'reliability claim' },
  { pattern: /\bguarantee/i, why: 'absolute' },
]

// Two patterns were tried and REMOVED, because a noisy lint is how a real
// failure gets scrolled past:
//
//   /\balways\b/  — 84 hits, nearly all clinical imperatives ("always confirm a
//     low automated count on a smear", "always image BEFORE biopsy"). Those are
//     safety instructions, not efficacy claims, and they need no citation. It
//     also caught the opposite of a claim: "not always present" is a hedge.
//
//   bare /\bdefinitive\b/ — 48 hits, overwhelmingly "definitive" about a
//     DIAGNOSTIC test ("biopsy + histopathology (definitive)"), which is a
//     statement about what confirms a diagnosis rather than about efficacy.
//     Narrowed to "definitive treatment/therapy/cure".

/** Any of these makes the basis of the claim legible, so the lint stands down.
 *  A number counts: "62% good outcome (10/16 dogs)" is self-evidencing even
 *  without a marker, because the reader can see what it rests on. */
const HEDGED = /\bsome (?:clinicians|authors|centres|centers)\b|\breported\b|\bmay\b|\bcan\b|\bappears?\b|\bsuggests?\b|\bin \d+ (?:dogs|cats|animals|patients)\b/i
const NUMERIC = /\d+\s*%|\b\d+\s*(?:of|\/)\s*\d+\b|\bn\s*=\s*\d+/

/** A NEGATED claim is the opposite of the problem. "No evidence that combination
 *  therapy is superior", "do NOT guarantee unaffected offspring" and "no
 *  pharmacological treatment reliably prevents episodes" are all careful writing,
 *  and firing on them would train the reader to ignore this lint. */
const NEGATED = /\b(?:no|not|NOT|never|without|declined|rather than)\b/

/** "Superior to MRI for bony integrity", "FLAIR is superior to T2W" and
 *  "inferior to CT" compare what an imaging test can RESOLVE. That is a technical
 *  capability, not a treatment-efficacy claim, and needs no outcome evidence. */
const MODALITY = /\b(?:MRI|CT|radiograph|radiography|ultrasonograph|ultrasound|FLAIR|T1W|T2W|STIR|sequence|cytology|histopath)/i

const offenders: string[] = []
let bullets = 0

for (const row of DB.disease_page as unknown as Record<string, unknown>[]) {
  for (const f of FIELDS) {
    const value = row[f]
    if (typeof value !== 'string' || !value) continue
    for (const raw of value.split('|')) {
      const text = raw.trim()
      if (!text || text.startsWith('#')) continue
      bullets++
      if (hasCitation(text) || HEDGED.test(text) || NUMERIC.test(text)) continue
      if (NEGATED.test(text) || MODALITY.test(text)) continue
      for (const { pattern, why } of CLAIMS) {
        if (pattern.test(text)) {
          offenders.push(`[${String(row.id)}] ${f} — ${why}\n      ${text.slice(0, 120)}`)
          break
        }
      }
    }
  }
}

const r = ratchet('unhedged-claims', offenders.length, 'unhedged efficacy claim(s)')
if (!r.ok) {
  fail(r.message)
  for (const o of offenders.slice(0, 25)) note(`  ${o}`)
  if (offenders.length > 25) note(`  …and ${offenders.length - 25} more.`)
} else {
  note(r.message)
  note(`  (${bullets} clinical bullets scanned across ${FIELDS.length} fields.)`)
}
done(
  `No unhedged efficacy claims beyond the baseline (${bullets} clinical bullets scanned).`,
  'Give the claim a citation, a hedge ("some clinicians reported…"), or a number.',
)
