'use client'
// Lesion quick-detail — tags, the route on to the diagnosis (disease page, or
// the protocol itself when there is no disease page — see protocolCards.tsx),
// key signs, optional notes, then the differentials list.

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { Bul, str } from './markup'
import { DiseasePageCard, ProtocolCards, protocolsForLesion } from './protocolCards'
import { UrgTag, SpTag, ZooTag } from './tags'
import { isTriageQualifier } from '../../lib/triageQualifier'
import { TAG_ROW } from './styles'

const showFeat = (feat: unknown): boolean => isTriageQualifier(str(feat))

export function LesionDetailView({ id }: { id: string }) {
  const nav = useNav()
  const l = DB.lesion_type.find(x => x.id === id)
  if (!l) return null
  const diffs = DB.differentials.filter(d => d.filter === l.filter).sort((a, b) => a.order - b.order)
  const dis = str(l.dis)
  return (
    <>
      <div style={TAG_ROW}><UrgTag urg={l.urg} /><ZooTag zoo={l.zoo === true} /><SpTag sp={l.sp} /><span className="tag tag-sp-all">{l.cat}</span></div>
      {/* Same rule as the sub-type leaf: a lesion with a disease page routes
          there for the protocol; one without carries the protocol itself. */}
      {dis
        ? <DiseasePageCard id={dis} />
        : <ProtocolCards protocols={protocolsForLesion(l)} emergency={l.urg === 'EMERGENCY'} />}
      <div className="detail-label">Key clinical signs</div>
      <div className="detail-val highlight">{l.signs}</div>
      {str(l.etiology) && (
        <>
          <hr className="sep" />
          <div className="detail-label">Etiology</div>
          <Bul text={str(l.etiology)} />
        </>
      )}
      {str(l.diag) && (
        <>
          <hr className="sep" />
          <div className="detail-label">Diagnostics</div>
          <Bul text={str(l.diag)} />
        </>
      )}
      {str(l.treat) && (
        <>
          <hr className="sep" />
          <div className="detail-label">Treatment</div>
          <Bul text={str(l.treat)} />
        </>
      )}
      {str(l.note) && (
        <>
          <hr className="sep" />
          <div className="pearl">{str(l.note)}</div>
        </>
      )}
      <hr className="sep" />
      <div className="stitle">{diffs.length} differential{diffs.length !== 1 ? 's' : ''}</div>
      {diffs.length ? (
        diffs.map((d, i) => (
          <div key={d.id} className="diff-row" role="button" onClick={() => nav.navigate({ kind: 'diff', id: d.id })}>
            <div className="diff-num">{i + 1}</div>
            <div className="diff-body">
              {/* Name-only, same rule as a flow chip: `feat` is the discriminator
                  paragraph, and it is already the headline field of the page this
                  row opens ("Key distinguishing feature" in DiffDetailView), so
                  showing it here duplicates the destination in 11px grey. Only a
                  ranking / species qualifier survives in the list — see
                  lib/triageQualifier. Filtered at render, not deleted from the
                  data, so the detail page keeps it. */}
              <div className="diff-name" style={showFeat(d.feat) ? undefined : { marginBottom: 0 }}>{d.name}</div>
              {showFeat(d.feat) && <div className="diff-feat">{str(d.feat)}</div>}
            </div>
            <div className="diff-arrow">›</div>
          </div>
        ))
      ) : (
        <div className="empty"><p>No differentials listed yet for this lesion type.</p></div>
      )}
    </>
  )
}
