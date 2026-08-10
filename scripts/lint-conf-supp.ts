// Validates the conf/supp boundary on disease pages.
//
// THE BOUNDARY (the rule this lint exists to hold):
//   conf  = "Diagnostic Investigation" — the tests that CONFIRM the disease,
//           plus diagnostic criteria, thresholds and pathognomonic findings.
//           If a vet is asking "how do I prove this?", the answer is here.
//   supp  = "Supportive Diagnostics" — screening, staging, severity grading,
//           baseline panels, comorbidity and underlying-cause hunting.
//           If a vet is asking "what else should I run?", the answer is here.
//
// Without a stated boundary, authors hedge by writing the same test into BOTH
// fields — the page then prints it twice, a few lines apart. That is what this
// lint catches: a test stated in conf and again in supp on the SAME page.
// Aspiration pneumonia carried airway sampling, oximetry/ABG and the entire
// underlying-cause hunt in both cards.
//
// Fix by deciding which side owns it (per the boundary above), keeping the
// RICHER wording, and deleting the other copy. Do not "fix" it by rewording
// one copy until the score drops.
//
// Complements lint-disease-sections, which checks that a section EXISTS and is
// in bullet form. This one checks that two sections are not saying the same
// thing.

import { DB } from '../src/data/db'
import { lint } from './lib/lint'

/** Content-word overlap. Deliberately crude: it is a duplication smell
 *  detector, not a semantic comparison. Short/generic segments are skipped
 *  below so the crudeness stays safe. */
const STOP = new Set(
  'the a an and or of to in for with is are be as on at by from that this it its not no if then than can may but do does'.split(' '))
const toks = (s: string): Set<string> => new Set(
  s.toLowerCase().replace(/@[a-z0-9-]+:/gi, ' ').replace(/[^a-z0-9À-ſ ]/g, ' ')
    .split(/\s+/).filter(w => w.length > 3 && !STOP.has(w)))

/** Share of `a`'s content words that also appear in `b`. */
function containment(a: Set<string>, b: Set<string>): number {
  if (!a.size) return 0
  let n = 0
  for (const w of a) if (b.has(w)) n++
  return n / a.size
}

/** Bullets only — headers (`#…`) name a section rather than a test, so two
 *  fields may legitimately share one. */
const bullets = (v: unknown): string[] =>
  (typeof v === 'string' ? v : '').split('|').map(s => s.trim()).filter(s => s && !s.startsWith('#'))

/** Segments this short are generic ("Haematology and biochemistry") and would
 *  collide across unrelated tests. */
const MIN_TOKENS = 4
const THRESHOLD = 0.6

/** Pairs that LOOK duplicated to the tokeniser but are genuinely different
 *  tests. Each entry needs a reason — this list is not a silencer of last
 *  resort, it is documentation of a known limitation of word overlap. */
const ALLOW: { id: string; conf: string; reason: string }[] = [
  {
    id: 'DIS-BD-VWD',
    conf: 'BMBT prolonged',
    reason: 'BMBT (a bedside bleeding-time screen) vs CBC platelet count — different tests that share the words "platelet count"',
  },
]

const l = lint('conf/supp duplication')
let pages = 0
let compared = 0

for (const d of DB.disease_page) {
  const row = d as Record<string, unknown>
  const cs = bullets(row.conf)
  const ss = bullets(row.supp)
  if (!cs.length || !ss.length) continue
  pages++
  for (const c of cs) {
    const ct = toks(c)
    if (ct.size < MIN_TOKENS) continue
    for (const s of ss) {
      const st = toks(s)
      if (st.size < MIN_TOKENS) continue
      compared++
      const score = Math.max(containment(ct, st), containment(st, ct))
      if (score < THRESHOLD) continue
      if (ALLOW.some(a => a.id === d.id && c.startsWith(a.conf))) continue
      l.fail(`[${d.id}] conf and supp state the same test (${score.toFixed(2)} overlap)\n      conf: ${c.slice(0, 110)}\n      supp: ${s.slice(0, 110)}`)
    }
  }
}

l.done(
  `No conf/supp duplication (${compared} bullet pairs across ${pages} disease pages checked).`,
  'Decide which field owns the test (conf = confirms the diagnosis, supp = supports/screens/stages), keep the richer wording there, and delete the other copy.',
)
