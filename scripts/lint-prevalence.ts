// Validates the Mix & Match species prevalence prior (src/lib/search/prevalence.ts).
//
// The prior reorders the differential list by how common a disease is within a
// species. It is keyed by disease id and maintained apart from the content, so
// the two can drift: a renamed or deleted disease leaves an entry that silently
// does nothing, and a page whose `sp` narrows to one species leaves a tier for a
// species it can never be searched under.
//
// Errors (exit 1):
//   · an entry whose disease id no longer exists — a dead ranking judgement
//   · a tier for a species the disease page doesn't cover — unreachable, and
//     usually a sign the tier was meant for the paired page (feline vs canine
//     hyperadrenocorticism are separate ids)
//   · a disease covering both species with a tier for only one of them, where
//     the stated tier is non-neutral — the unstated species silently ranks
//     neutral, which is rarely what was meant
//
// Report (no exit code): how much of the corpus carries a judgement at all, and
// which of the most-matched diseases still have none, so the remaining review
// work is visible rather than assumed done.

import { DB } from '../src/data/db'
import { lint } from './lib/lint'
import { PREVALENCE, PREV_FACTOR, type PrevSpecies, type PrevTier } from '../src/lib/search/prevalence'

const { fail, note, done } = lint('prevalence')

const byId = new Map(DB.disease_page.map(d => [d.id, d]))

/** Which species a page's `sp` actually covers — "Dog (rarely Cat)" covers both. */
function coveredSpecies(sp: string): PrevSpecies[] {
  const s = (sp ?? '').toLowerCase()
  const out: PrevSpecies[] = []
  if (s.includes('dog')) out.push('dog')
  if (s.includes('cat')) out.push('cat')
  return out
}

const NEUTRAL: PrevTier = 'uncommon'

for (const [id, entry] of Object.entries(PREVALENCE)) {
  const d = byId.get(id)
  if (!d) {
    fail(`${id} — no such disease page (renamed or deleted?)`)
    continue
  }

  const covered = coveredSpecies(d.sp as string)
  const stated = Object.keys(entry) as PrevSpecies[]

  for (const sp of stated) {
    if (!covered.includes(sp)) {
      fail(`${id} (${d.sp}) — has a ${sp} tier but the page doesn't cover ${sp}`)
    }
  }

  const missing = covered.filter(sp => !stated.includes(sp))
  const nonNeutral = stated.filter(sp => entry[sp] && entry[sp] !== NEUTRAL)
  if (missing.length && nonNeutral.length) {
    fail(
      `${id} (${d.sp}) — ${nonNeutral.map(s => `${s}:${entry[s]}`).join(', ')} ` +
      `but ${missing.join(' and ')} left unstated; state it (\`${NEUTRAL}\` if that is the call)`,
    )
  }
}

// ── Coverage report ──────────────────────────────────────────────────────────
const rated = Object.keys(PREVALENCE).length
const pct = ((rated / DB.disease_page.length) * 100).toFixed(1)
note(`  ${rated} of ${DB.disease_page.length} disease pages carry a prevalence tier (${pct}%).`)

const tally = new Map<PrevTier, number>()
for (const entry of Object.values(PREVALENCE)) {
  for (const tier of Object.values(entry)) tally.set(tier, (tally.get(tier) ?? 0) + 1)
}
const order: PrevTier[] = ['common', 'uncommon', 'rare', 'very-rare']
note(`  tiers: ${order.map(t => `${t} ${tally.get(t) ?? 0} (×${PREV_FACTOR[t]})`).join(' · ')}`)
note('  Everything unrated ranks neutral — unrated is never penalised.')

done(`prevalence table clean — ${rated} rated disease(s)`, 'Fix src/lib/search/prevalence.ts.')
