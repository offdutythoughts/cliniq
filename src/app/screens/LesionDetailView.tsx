'use client'
// Lesion quick-detail — React port of renderLesionDetail (cliniqApp.ts): tags,
// key signs, optional notes, optional protocol card, then the differentials list.

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { NavCard, Bul, str } from './markup'
import { UrgTag, SpTag } from './tags'

const TAG_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')

export function LesionDetailView({ id }: { id: string }) {
  const nav = useNav()
  const l = DB.lesion_type.find(x => x.id === id)
  if (!l) return null
  const diffs = DB.differentials.filter(d => d.filter === l.filter).sort((a, b) => a.order - b.order)
  const proto = str(l.proto)
  return (
    <>
      <div style={TAG_ROW}><UrgTag urg={l.urg} /><SpTag sp={l.sp} /><span className="tag tag-sp-all">{l.cat}</span></div>
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
      {proto && (
        <>
          <hr className="sep" />
          <NavCard title={`⚡ Protocol: ${proto}`} sub="Tap to open" onClick={() => nav.navigate({ kind: 'protocol', id: proto })} />
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
