'use client'
// Lesion sub-type detail — React port of renderSubTypeDetail (cliniqApp.ts).
// The richest leaf: optional EMERGENCY banner, tags, protocol card, then cards
// for Etiology (with @-link bullets), Clinical Signs, Pathophysiology, Diagnostic
// Investigation (or a fallback test list), Treatment, Differential Diagnosis,
// Notes, and a disease-page card. directDis sub-types redirect to the disease.

import { Fragment, type ReactNode } from 'react'
import { DB } from '../../data/db'
import { useNav, type Nav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { UrgTag, SpTag } from './tags'
import { DiseasePageView } from './DiseasePageView'
import { NavCard, Card, str } from './markup'

const TAG_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')
const ETI_NAME = s('font-size:12px;color:var(--white);line-height:1.6;')
const ETI_BOX = s('margin-top:10px;padding-top:10px;border-top:1px solid var(--border);')
const VAL_GRAY = s('font-size:12px;color:var(--gray);line-height:1.6;')
const NOTE_VAL = s('font-size:11px;color:var(--gray);line-height:1.6;')
const HEADER = s('font-size:10px;font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;')
const SUB = s('display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:14px;margin-bottom:1px;')
const SUB_DASH = s('flex-shrink:0;opacity:.5;')
const BULLET_MB = s('display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;')
const BULLET = s('display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;')
const DOT = s('color:var(--teal-light);flex-shrink:0;')
const LINK = s('color:var(--teal-light);text-decoration:underline;cursor:pointer;')


/** Etiology bullet inner: a whole `@DIS-…:label` segment → disease link, else text. */
function etiInner(inner: string, nav: Nav): ReactNode {
  if (inner.startsWith('@')) {
    const ci = inner.indexOf(':')
    const did = ci > 0 ? inner.slice(1, ci) : inner.slice(1)
    const lbl = ci > 0 ? inner.slice(ci + 1) : did
    return <span style={LINK} role="button" onClick={() => nav.navigate({ kind: 'disease', id: did })}>{lbl}</span>
  }
  return inner
}

/** Etiology pipe-markup: #→header, -→sub (with @-link), else bullet (with @-link). */
function Etiology({ text, nav }: { text: string; nav: Nav }) {
  return (
    <>
      {text.split('|').map((seg, i) => {
        const t = seg.trim()
        if (t.startsWith('#')) return <div key={i} style={HEADER}>▸ {t.slice(1).trim()}</div>
        const isInd = t.startsWith('-')
        const inner = isInd ? t.slice(1).trim() : t
        if (isInd) return <div key={i} style={SUB}><span style={SUB_DASH}>–</span>{etiInner(inner, nav)}</div>
        return <div key={i} style={BULLET}><span style={DOT}>•</span>{etiInner(inner, nav)}</div>
      })}
    </>
  )
}

/** Generic section markup: #→header; '-'→sub (when allowDash); else bullet (mb). */
function Section({ text, allowDash }: { text: string; allowDash: boolean }) {
  return (
    <>
      {text.split('|').map((seg, i) => {
        const t = seg.trim()
        if (t.startsWith('#')) return <div key={i} style={HEADER}>▸ {t.slice(1).trim()}</div>
        if (allowDash && t.startsWith('-')) return <div key={i} style={SUB}><span style={SUB_DASH}>–</span>{t.slice(1).trim()}</div>
        return <div key={i} style={BULLET_MB}><span style={DOT}>•</span>{t}</div>
      })}
    </>
  )
}

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
              ? <Etiology text={etiology} nav={nav} />
              : diffs.map(d => <div key={d.id} style={BULLET}><span style={DOT}>•</span>{d.name}</div>)}
          </div>
        )}
      </Card>

      <Card title="Clinical Signs">
        <div style={VAL_GRAY}>{l.signs}</div>
      </Card>

      {patho && (
        <Card title="Pathophysiology">
          {patho.split('|').map((p, i) => <div key={i} style={BULLET_MB}><span style={DOT}>•</span>{p.trim()}</div>)}
        </Card>
      )}

      {(diag || dxTests.size > 0) && (
        <Card title="Diagnostic Investigation">
          {diag && <Section text={diag} allowDash={false} />}
          {!diag && dxTests.size > 0 && (
            <div>{[...dxTests].map((t, i) => <div key={i} style={BULLET_MB}><span style={DOT}>•</span>{t}</div>)}</div>
          )}
        </Card>
      )}

      {treat && <Card title="General Treatment"><Section text={treat} allowDash /></Card>}
      {ddx && <Card title="Differential Diagnosis"><Section text={ddx} allowDash /></Card>}

      {note && (
        <Card title="Notes"><div style={NOTE_VAL}>{note}</div></Card>
      )}

      {dis && (
        <NavCard title="📋 Disease Page" sub="Tap to view full disease profile" onClick={() => nav.navigate({ kind: 'disease', id: dis })} style={{ marginBottom: 14 }} />
      )}
    </>
  )
}
