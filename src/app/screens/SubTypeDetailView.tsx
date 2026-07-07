'use client'
// Lesion sub-type detail — React port of renderSubTypeDetail (cliniqApp.ts).
// The richest leaf: optional EMERGENCY banner, tags, protocol card, then cards
// for Etiology (with @-link bullets), Clinical Signs, Pathophysiology, Diagnostic
// Investigation (or a fallback test list), Treatment, Differential Diagnosis,
// Notes, and a disease-page card. directDis sub-types redirect to the disease.

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { UrgTag, SpTag } from './tags'
import { DiseasePageView } from './DiseasePageView'
import { NavCard, Card, Bul, str } from './markup'
import { TAG_ROW, BODY_TEXT, DOT, BULLET } from './styles'

const ETI_NAME = s('font-size:var(--fs-body);color:var(--white);line-height:var(--lh-body);')
const ETI_BOX = s('margin-top:10px;padding-top:10px;border-top:1px solid var(--border);')

export function SubTypeDetailView({ id }: { id: string }) {
  const nav = useNav()
  const l = DB.lesion_type.find(x => x.id === id)
  if (!l) return null
  if (l.directDis && l.dis) return <DiseasePageView id={str(l.dis)} />

  const diffs = DB.differentials.filter(d => d.filter === l.filter).sort((a, b) => a.order - b.order)
  const isEM = l.urg === 'EMERGENCY'
  const proto = str(l.proto)
  const etiology = str(l.etiology)
  const patho = str(l.patho)
  const diag = str(l.diag)
  const treat = str(l.treat)
  const ddx = str(l.ddx)
  const note = str(l.note)
  const dis = str(l.dis)

  const dxTests = new Set<string>()
  diffs.forEach(d => {
    if (d.minDx) d.minDx.split(',').forEach(t => dxTests.add(t.trim()))
    const add = str(d.addDx)
    if (add) add.split(',').forEach(t => { if (t.trim()) dxTests.add(t.trim()) })
  })

  return (
    <>
      {isEM && <div className="em-alert">⚠️ EMERGENCY — initiate stabilisation before full diagnostic workup</div>}
      <div style={TAG_ROW}><UrgTag urg={l.urg} /><SpTag sp={l.sp} /><span className="tag tag-sp-all">{l.cat}</span></div>

      {proto && (
        <NavCard title={`⚡ Protocol: ${proto}`} sub="Tap to open step-by-step protocol" onClick={() => nav.navigate({ kind: 'protocol', id: proto })} style={{ marginBottom: 14 }} />
      )}

      <Card title="Etiology">
        <div style={ETI_NAME}>{l.sub}</div>
        {(etiology || diffs.length > 0) && (
          <div style={ETI_BOX}>
            {etiology
              ? <Bul text={etiology} />
              : diffs.map(d => <div key={d.id} style={BULLET}><span style={DOT}>•</span>{d.name}</div>)}
          </div>
        )}
      </Card>

      <Card title="Clinical Signs">
        <div style={BODY_TEXT}>{l.signs}</div>
      </Card>

      {patho && (
        <Card title="Pathophysiology">
          <Bul text={patho} />
        </Card>
      )}

      {(diag || dxTests.size > 0) && (
        <Card title="Diagnostic Investigation">
          {diag && <Bul text={diag} allowDash={false} />}
          {!diag && dxTests.size > 0 && (
            <div>{[...dxTests].map((t, i) => <div key={i} style={BULLET}><span style={DOT}>•</span>{t}</div>)}</div>
          )}
        </Card>
      )}

      {treat && <Card title="General Treatment"><Bul text={treat} /></Card>}
      {ddx && <Card title="Differential Diagnosis"><Bul text={ddx} /></Card>}

      {note && (
        <Card title="Notes"><div style={BODY_TEXT}>{note}</div></Card>
      )}

      {dis && (
        <NavCard title="📋 Disease Page" sub="Tap to view full disease profile" onClick={() => nav.navigate({ kind: 'disease', id: dis })} style={{ marginBottom: 14 }} />
      )}
    </>
  )
}
