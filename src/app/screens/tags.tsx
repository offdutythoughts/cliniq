// Shared urgency / species tag helpers — React ports of urgTag/spTag/urgClass
// (cliniqApp.ts). Same .tag .tag-* classes from globals.css.

import { rareSpecies, speciesOf } from '../../lib/species'

/** Static species chip, for pages that don't offer a species choice.
 *
 *  'Dog (rarely Cat)' keeps its own chip rather than collapsing into
 *  'Dog + Cat': the two say different things about index of suspicion, and the
 *  strays were previously rendered as the flat combined label. */
export function SpTag({ sp }: { sp?: string }) {
  if (!sp) return null
  const covered = speciesOf(sp)
  if (covered.length === 1) {
    const only = covered[0]
    return <span className={only === 'Cat' ? 'tag tag-sp-cat' : 'tag tag-sp-dog'}>{only}</span>
  }
  const rare = rareSpecies(sp)
  if (rare) {
    const main = rare === 'Cat' ? 'Dog' : 'Cat'
    return (
      <span className={main === 'Cat' ? 'tag tag-sp-cat' : 'tag tag-sp-dog'}>
        {main} · rarely {rare.toLowerCase()}
      </span>
    )
  }
  return <span className="tag tag-sp-all">Dog + Cat</span>
}

/** Urgency chips carry no emoji: 🚨 belongs to disease pages (where an emergency
 *  protocol can actually be started) and ⚠️ belongs to zoonosis / isolation only.
 *  Urgency is already carried by the chip's colour and word. */
export function UrgTag({ urg }: { urg?: string }) {
  if (!urg) return null
  const u = urg.toUpperCase()
  if (u === 'EMERGENCY') return <span className="tag tag-em">Emergency</span>
  if (u === 'HIGH') return <span className="tag tag-hi">High</span>
  if (urg === 'Moderate' || urg === 'Moderate–High' || urg === 'Low–Moderate') return <span className="tag tag-mo">Moderate</span>
  return <span className="tag tag-lo">Low</span>
}

/** The one sanctioned use of ⚠️: the patient can infect you, your staff or the
 *  next patient — a zoonosis, or a disease needing isolation / barrier nursing.
 *  Driven by `zoo: true` on the lesion or disease row in db.ts. */
export const ZOO_TITLE = 'Zoonotic or requires isolation — barrier nurse and use PPE'

/** Does a page's own alert text already spell out the infection risk? Used to
 *  avoid stacking the generic banner on top of a specific one. */
export const ZOO_WORDS = /zoonot|isolat|barrier nurs|\bPPE\b|notifiable|contagious/i

export function ZooTag({ zoo }: { zoo?: boolean }) {
  if (!zoo) return null
  return <span className="tag tag-zoo" title={ZOO_TITLE}>⚠️ Zoonotic / isolate</span>
}

/** Extra className for a lesion card by urgency (' em' | ' hi' | ''). */
export function urgClass(urg?: string): string {
  if (!urg) return ''
  const u = urg.toUpperCase()
  if (u === 'EMERGENCY') return ' em'
  if (u === 'HIGH') return ' hi'
  return ''
}
