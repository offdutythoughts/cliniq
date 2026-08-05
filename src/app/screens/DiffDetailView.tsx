'use client'
// Differential detail — React port of renderDiffDetail (cliniqApp.ts).

import { DB } from '../../data/db'
import { spOf } from '../../lib/species'
import { useNav } from '../nav/NavContext'
import { NavCard, str } from './markup'
import { SpTag } from './tags'
import { TAG_ROW } from './styles'

export function DiffDetailView({ id }: { id: string }) {
  const nav = useNav()
  const d = DB.differentials.find(x => x.id === id)
  if (!d) return null
  const disId = str(d.dis)
  const dis = disId ? DB.disease_page.find(x => x.id === disId) : null
  return (
    <>
      <div style={TAG_ROW}><SpTag sp={d.sp} /></div>
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
          {/* A species-specific differential opens its disease page on that
              species — "usually feline hyperthyroidism" should not land the
              reader on the canine half of the page. */}
          <NavCard
            title={`📋 ${dis.name}`}
            sub="Open full disease page"
            onClick={() => nav.navigate({ kind: 'disease', id: dis.id, ...spOf(d.sp) })}
          />
        </>
      )}
    </>
  )
}
