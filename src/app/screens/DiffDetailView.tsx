'use client'
// Differential detail — React port of renderDiffDetail (cliniqApp.ts).

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { SpTag } from './tags'

const SP_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')
const str = (v: unknown): string => (typeof v === 'string' ? v : '')

export function DiffDetailView({ id }: { id: string }) {
  const nav = useNav()
  const d = DB.differentials.find(x => x.id === id)
  if (!d) return null
  const disId = str(d.dis)
  const dis = disId ? DB.disease_page.find(x => x.id === disId) : null
  return (
    <>
      <div style={SP_ROW}><SpTag sp={d.sp} /></div>
      <div className="detail-label">Key distinguishing feature</div>
      <div className="detail-val highlight">{d.feat}</div>
      <div className="detail-label">Minimum diagnostics</div>
      <div className="detail-val">{d.minDx}</div>
      {str(d.addDx) && (
        <>
          <div className="detail-label">Additional diagnostics</div>
          <div className="detail-val">{str(d.addDx)}</div>
        </>
      )}
      {dis && (
        <>
          <hr className="sep" />
          <div className="card" role="button" onClick={() => nav.navigate({ kind: 'disease', id: dis.id })}>
            <div className="card-row"><div><div className="card-title">📋 {dis.name}</div><div className="card-sub">Open full disease page</div></div><div className="card-arrow">›</div></div>
          </div>
        </>
      )}
    </>
  )
}
