'use client'
// Differential detail — React port of renderDiffDetail (cliniqApp.ts).

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { NavCard, str } from './markup'
import { SpTag } from './tags'

const SP_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')

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
          <NavCard title={`📋 ${dis.name}`} sub="Open full disease page" onClick={() => nav.navigate({ kind: 'disease', id: dis.id })} />
        </>
      )}
    </>
  )
}
