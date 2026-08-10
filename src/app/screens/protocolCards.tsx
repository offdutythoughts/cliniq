'use client'
// ── Where a protocol is reached from ─────────────────────────────────────────
//
// THE RULE: a protocol is reached through the page for the DIAGNOSIS it treats.
//
//   lesion category  →  disease page  →  protocol
//
// A lesion category ("Metaldehyde", "Cardiac tamponade", "Exudate") names a
// diagnosis, so it links to that diagnosis's page. The disease page then carries
// its protocols as the first cards on the page, above the clinical sections.
// Never category → protocol: that hands the reader the treatment steps with no
// aetiology, signalment, confirmation or prognosis, and makes the same condition
// behave differently depending on which flow reached it.
//
// This module is the single place that answers "which protocols does this page
// own?", so the answer cannot drift between the disease page, a lesion sub-type
// leaf and a lesion quick-detail. Three lints hold the shape:
//   · lint-tiles CHECK 6  — no category tile links straight to a protocol
//   · lint-schema         — `protos` ids resolve; no @PROT- token inside a ddx
//   · lint-lesions        — a lesion with a disease page declares no protocol
//
// Adding a protocol to a disease page is one edit: `protos:'PROT-…'` on the row
// in db.ts (pipe-separate several). Nothing else needs touching.

import { DB } from '../../data/db'
import type { DiseaseRow, LesionRow, ProtocolRow } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { NavCard, str } from './markup'

/** A protocol named in `ddx` is a DIFFERENTIAL's protocol, not this page's —
 *  hoisting it into the top card told the reader to open the metaldehyde
 *  protocol from the hypomyelination page. Differentials link out via the ddx
 *  list instead. */
const NOT_OWN_PROTOCOL = new Set(['ddx'])

/** Ids in declaration order, de-duplicated, filtered to protocols that exist. */
function resolve(ids: Iterable<string>): ProtocolRow[] {
  const wanted = new Set(ids)
  return DB.protocols.filter(protocol => wanted.has(protocol.id))
}

/** The protocols a DISEASE page owns:
 *  1. `protos:'PROT-A|PROT-B'` — the authoritative declaration.
 *  2. an `@PROT-…` token in the page's prose (except `ddx`) — the older
 *     convention, kept so pages that predate `protos` keep their cards.
 *  A lesion sub-type used to be a third source (its `proto` was inherited by the
 *  disease it redirects to). Those 26 declarations were moved onto the disease
 *  rows, so the diagnosis now declares its own protocols and the lesion layer
 *  no longer has an opinion. */
export function protocolsForDisease(disease: DiseaseRow): ProtocolRow[] {
  const ids = new Set<string>()
  if (typeof disease.protos === 'string') {
    for (const id of disease.protos.split('|')) if (id.trim()) ids.add(id.trim())
  }
  for (const [field, value] of Object.entries(disease)) {
    if (typeof value !== 'string' || NOT_OWN_PROTOCOL.has(field)) continue
    for (const match of value.matchAll(/@(PROT-[A-Z0-9-]+)/g)) ids.add(match[1])
  }
  return resolve(ids)
}

/** The protocols a LESION page owns — which is none whenever the lesion has a
 *  disease page, because that page owns them (and already inherits `proto` via
 *  protocolsForDisease). A lesion WITHOUT one is a genuine leaf: a fluid class,
 *  an oedema type, a shock category that no single disease page covers, so its
 *  protocol card is the only route to the steps and stays. */
export function protocolsForLesion(lesion: LesionRow): ProtocolRow[] {
  if (str(lesion.dis)) return []
  const proto = str(lesion.proto)
  return proto ? resolve([proto]) : []
}

/** The protocol card stack. Always rendered directly above a page's clinical
 *  sections — "at the top of the page" is the half of the rule a reader sees. */
export function ProtocolCards({ protocols, emergency = false }: {
  protocols: ProtocolRow[]
  emergency?: boolean
}) {
  const nav = useNav()
  return (
    <>
      {protocols.map(protocol => (
        <NavCard
          key={protocol.id}
          title={`${emergency ? '🚨 Emergency' : '⚡'} protocol: ${protocol.name}`}
          sub="Open step-by-step protocol"
          onClick={() => nav.navigate({ kind: 'protocol', id: protocol.id })}
          style={{ marginBottom: 14 }}
        />
      ))}
    </>
  )
}

/** The other half of the rule, from the lesion side: the route on to the
 *  diagnosis. It sits at the TOP of a lesion page — the reader who needs the
 *  protocol has to pass through the disease page to reach it, so burying this
 *  at the foot of the page put the longest scroll in front of the most urgent
 *  reader. */
export function DiseasePageCard({ id }: { id: string }) {
  const nav = useNav()
  const disease = DB.disease_page.find(d => d.id === id)
  if (!disease) return null
  const protocols = protocolsForDisease(disease)
  return (
    <NavCard
      title={`📋 Disease page: ${disease.name}`}
      sub={protocols.length
        ? 'Full disease profile — and the protocol, at the top of the page'
        : 'Tap to view the full disease profile'}
      onClick={() => nav.navigate({ kind: 'disease', id })}
      style={{ marginBottom: 14 }}
    />
  )
}
