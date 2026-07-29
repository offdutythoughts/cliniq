'use client'
// Lesion sub-type detail — React port of renderSubTypeDetail (cliniqApp.ts).
// The richest leaf: optional EMERGENCY banner, tags, protocol card, then cards
// following the same section order as a disease page — Etiology (with @-link
// bullets), Signalment, Pathophysiology, Clinical Signs, Diagnostic Investigation
// (or a fallback test list), Treatment, Monitoring, Prognosis, Differential
// Diagnosis, Notes, and a disease-page card.
//
// Sub-types that ARE a single disease set directDis + dis and redirect to the
// disease page instead of duplicating its content here (see scripts/lint-lesions.ts).
// The cards below are for genuine *category* sub-types — fluid classes, oedema
// types, parasite umbrellas — which have no 1:1 disease page to redirect to.

import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { UrgTag, SpTag } from './tags'
import { DiseasePageView } from './DiseasePageView'
import { NavCard, Card, Bul, str } from './markup'
import { TAG_ROW, BODY_TEXT, DOT, BULLET, PAGE_TITLE } from './styles'

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
  const signalment = str(l.signalment)
  const monitor = str(l.monitor)
  const prog = str(l.prog)
  // `signs` is legacy plain prose on most lesions; authored category pages use
  // pipe-markup so the sign list renders as bullets like every other card.
  const signsIsPiped = str(l.signs).includes('|')

  const dxTests = new Set<string>()
  diffs.forEach(d => {
    if (d.minDx) d.minDx.split(',').forEach(t => dxTests.add(t.trim()))
    const add = str(d.addDx)
    if (add) add.split(',').forEach(t => { if (t.trim()) dxTests.add(t.trim()) })
  })

  return (
    <>
      <div style={PAGE_TITLE}>{l.sub}</div>
      <div style={TAG_ROW}><UrgTag urg={l.urg} /><SpTag sp={l.sp} /><span className="tag tag-sp-all">{l.cat}</span></div>
      {isEM && <div className="em-alert">🚨 EMERGENCY — initiate stabilisation before full diagnostic workup</div>}

      {proto && (
        <NavCard title={`⚡ Protocol: ${proto}`} sub="Tap to open step-by-step protocol" onClick={() => nav.navigate({ kind: 'protocol', id: proto })} style={{ marginBottom: 14 }} />
      )}

      {(etiology || diffs.length > 0) && (
        <Card title="Etiology">
          {etiology
            ? <Bul text={etiology} />
            : diffs.map(d => <div key={d.id} style={BULLET}><span style={DOT}>•</span>{d.name}</div>)}
        </Card>
      )}

      {signalment && <Card title="Signalment"><Bul text={signalment} /></Card>}

      {patho && (
        <Card title="Pathophysiology">
          <Bul text={patho} />
        </Card>
      )}

      <Card title="Clinical Signs">
        {signsIsPiped ? <Bul text={str(l.signs)} /> : <div style={BODY_TEXT}>{l.signs}</div>}
      </Card>

      {(diag || dxTests.size > 0) && (
        <Card title="Diagnostic Investigation">
          {diag && <Bul text={diag} allowDash={false} />}
          {!diag && dxTests.size > 0 && (
            <div>{[...dxTests].map((t, i) => <div key={i} style={BULLET}><span style={DOT}>•</span>{t}</div>)}</div>
          )}
        </Card>
      )}

      {treat && <Card title="Treatment"><Bul text={treat} /></Card>}
      {monitor && <Card title="Monitoring"><Bul text={monitor} /></Card>}
      {prog && <Card title="Prognosis"><Bul text={prog} /></Card>}
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
