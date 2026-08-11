'use client'
// Lesion quick-detail — tags, the route on to the diagnosis (disease page, or
// the protocol itself when there is no disease page — see protocolCards.tsx),
// key signs, optional notes, then the differentials list.

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { Bul, str } from './markup'
import { DiseasePageCard, ProtocolCards, protocolsForLesion } from './protocolCards'
import { UrgTag, SpTag, ZooTag } from './tags'
import { TAG_ROW } from './styles'

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
              <div className="diff-name">{d.name}</div>
              <div className="diff-feat">{d.feat}</div>
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
