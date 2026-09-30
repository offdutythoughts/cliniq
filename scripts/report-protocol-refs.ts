// Rule 5 coverage for protocols, and it is a DIFFERENT test from report-refs.
//
// A protocol tells someone what to do in an emergency, so per CLAUDE.md its
// backing has to be a body's agreed position rather than one group's case series:
// an ACVIM consensus statement, an equivalent society guideline (RECOVER,
// CURATIVE, AAHA, AAFP, ISFM, ACVECC, AHS, IRIS, WSAVA, ISCAID), or failing those
// a systematic review or meta-analysis.
//
// Two consequences that make this script necessary rather than a variant of
// report-refs:
//
//   1. `isPaper` is the WRONG test here. A society guideline published only on the
//      web — the IRIS grading scheme, the AHS heartworm guidelines — has no DOI
//      and no volume, so report-refs would not count it as a paper. For a protocol
//      it is fully compliant. Rule 5 accepts guidelines; Rule 4 wants papers.
//   2. A peer-reviewed PAPER can be non-compliant here. A single cohort is a paper
//      but not a body's position, and a textbook chapter is neither. PROT-TOX-METALD
//      citing only the VETgirl toxicology eBook is the worked example.
//
// Where no consensus exists for a protocol, Rule 5 says the protocol must SAY SO
// rather than quietly resting on something weaker. That disclosure counts as
// compliant, and is detected by the sentence the protocol carries.

import { DB } from '../src/data/db'
import { buildDiseaseCitations } from '../src/app/screens/diseaseReferences'
import { ratchet, setBaseline } from './lib/ratchet'

type Step = { action: string; doses?: string; note?: string; branch?: string; flag?: string }

/** Rule 5's accepted tiers, as they appear in a reference string. */
const CONSENSUS = /consensus|guideline|RECOVER|\bIRIS\b|\bACVIM\b|\bAAHA\b|\bAAFP\b|\bISFM\b|\bACVECC\b|\bAHS\b|\bWSAVA\b|ISCAID|CURATIVE|American Heartworm Society|systematic review|meta-analys/i

/** The disclosure Rule 5 requires when no consensus exists.
 *
 *  Deliberately narrow: it must open with "no ... consensus" and reach an explicit
 *  verb, so ordinary hedging ("evidence is limited", "practice varies") does not
 *  satisfy it. The gap allows the naming of what was searched for — "no published
 *  consensus statement or society guideline covers …" — which the first version of
 *  this pattern rejected because it demanded the verb immediately after
 *  "statement". Bending the sentence to fit the regex would have been the wrong
 *  way round. */
const NO_CONSENSUS_DISCLOSURE = /\bno (?:published |known )?consensus\b[^.|]{0,80}?\b(?:exists|covers|is available|has been published|addresses)/i

function fieldsOf(p: { trigger: string; steps: Step[] }): string[] {
  const out = [p.trigger]
  for (const st of p.steps) out.push(st.action, st.doses ?? '', st.note ?? '', st.branch ?? '', st.flag ?? '')
  return out.filter(Boolean)
}

const compliant: string[] = []
const disclosed: string[] = []
const weakOnly: { id: string; ids: string[] }[] = []
const uncited: string[] = []

for (const p of DB.protocols) {
  const fields = fieldsOf(p as unknown as { trigger: string; steps: Step[] })
  const { entries } = buildDiseaseCitations(fields)
  const text = fields.join(' ')
  if (entries.some(e => CONSENSUS.test(e.text))) { compliant.push(p.id); continue }
  if (NO_CONSENSUS_DISCLOSURE.test(text)) { disclosed.push(p.id); continue }
  if (entries.length) { weakOnly.push({ id: p.id, ids: entries.map(e => e.id) }); continue }
  uncited.push(p.id)
}

const total = DB.protocols.length
const short = uncited.length + weakOnly.length
const pct = (n: number) => `${Math.round((n / total) * 100)}%`

console.log(`Protocols: ${total}`)
console.log(`  consensus or guideline cited  ${String(compliant.length).padStart(3)}  ${pct(compliant.length)}`)
console.log(`  no consensus, and says so     ${String(disclosed.length).padStart(3)}  ${pct(disclosed.length)}`)
console.log(`  cites only a weaker source    ${String(weakOnly.length).padStart(3)}  ${pct(weakOnly.length)}  → NOT Rule 5 compliant`)
console.log(`  no citation at all            ${String(uncited.length).padStart(3)}  ${pct(uncited.length)}`)

if (process.argv.includes('--list')) {
  if (weakOnly.length) {
    console.log('\nweaker source only — a textbook or a single cohort is not a body position:')
    for (const w of weakOnly) console.log(`  ${w.id.padEnd(24)} ${w.ids.join(', ')}`)
  }
  if (uncited.length) {
    console.log('\nno citation at all:')
    for (const id of uncited) console.log(`  ${id}`)
  }
}

if (process.argv.includes('--set-baseline')) {
  setBaseline('protocols-without-consensus', short)
  console.log(`\nbaseline set: protocols-without-consensus = ${short}`)
  process.exit(0)
}

const r = ratchet('protocols-without-consensus', short, 'protocols lack a consensus-grade source')
console.log(`\n${r.ok ? 'ℹ' : '✗'} ${r.message}`)
process.exit(r.ok ? 0 : 1)
