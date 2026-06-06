'use client'
// The five bottom-nav home screens — React ports of renderLocalise (tab 0),
// renderLesionHome (tab 1), renderDiseaseHome (tab 2), renderProtoList (tab 3)
// and renderSettings (tab 4). The disease search is now React state + filter
// (no innerHTML); the theme toggle drives a data-theme attribute + state.

import { useState } from 'react'
import type { Tab } from '../../types'
import type { DiseaseRow, ProtocolRow } from '../../data/db'
import { DB } from '../../data/db'
import { SIGNS } from '../../lib/signs/registry'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { SpTag } from './tags'
import { DX_HOME_CARDS } from './diagnosticHomeCards'

const FLEX1 = s('flex:1')
const DISCLAIMER_LONG = 'For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.'
const str = (v: unknown): string => (typeof v === 'string' ? v : '')

// ── Tab 0: Localise ───────────────────────────────────────────────────────────
function LocaliseHome() {
  const nav = useNav()
  const [q, setQ] = useState('')
  const lower = q.toLowerCase()
  const filtered = q
    ? SIGNS.filter(s => s.title.toLowerCase().includes(lower) || s.sub.toLowerCase().includes(lower))
    : SIGNS
  return (
    <>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search clinical signs..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="stitle">Select a clinical sign</div>
      {filtered.length
        ? filtered.map(sign => (
            <div key={sign.flowId} className="card" role="button" onClick={() => nav.navigate({ kind: 'flow', flowId: sign.flowId })}>
              <div className="card-row">
                <div className="card-icon">{sign.icon}</div>
                <div style={FLEX1}><div className="card-title">{sign.title}</div><div className="card-sub">{sign.sub}</div></div>
                <div className="card-arrow">›</div>
              </div>
            </div>
          ))
        : <div className="empty"><p>No results</p></div>}
      <div className="disclaimer">{DISCLAIMER_LONG}</div>
    </>
  )
}

// ── Tab 1: Diagnostic approaches ──────────────────────────────────────────────
function DiagnosticHome() {
  const nav = useNav()
  const [q, setQ] = useState('')
  const lower = q.toLowerCase()
  const filtered = q
    ? DX_HOME_CARDS.filter(c => c.title.toLowerCase().includes(lower) || c.sub.toLowerCase().includes(lower))
    : DX_HOME_CARDS
  return (
    <>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search diagnostic approaches..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="stitle">Diagnostic approaches</div>
      {filtered.length
        ? filtered.map(c => (
            <div key={c.sign} className="card" role="button" onClick={() => nav.navigate({ kind: 'dx', sign: c.sign, tab: 'history' })}>
              <div className="card-row">
                <div className="card-icon">{c.icon}</div>
                <div style={FLEX1}><div className="card-title">{c.title}</div><div className="card-sub">{c.sub}</div></div>
                <div className="card-arrow">›</div>
              </div>
            </div>
          ))
        : <div className="empty"><p>No results</p></div>}
      <div className="disclaimer">{DISCLAIMER_LONG}</div>
    </>
  )
}

// ── Tab 2: Disease pages (search) ─────────────────────────────────────────────
function DiseaseCard({ d }: { d: DiseaseRow }) {
  const nav = useNav()
  return (
    <div className="card" role="button" onClick={() => nav.navigate({ kind: 'disease', id: d.id })}>
      <div className="card-row">
        <div style={FLEX1}>
          <div className="card-title">{d.name}</div>
          <div className="card-sub" style={s('margin-top:3px;')}><SpTag sp={d.sp} /> <span style={s('font-size:11px;color:var(--gray2)')}>{str(d.synonyms)}</span></div>
        </div>
        <div className="card-arrow">›</div>
      </div>
    </div>
  )
}
function DiseaseHome() {
  const [q, setQ] = useState('')
  const lower = q.toLowerCase()
  const filtered = (q
    ? DB.disease_page.filter(d => d.name.toLowerCase().includes(lower) || str(d.synonyms).toLowerCase().includes(lower))
    : DB.disease_page.slice()
  ).sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search disease pages..." id="dis-search" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="stitle">{DB.disease_page.length} disease pages</div>
      <div id="dis-list">
        {filtered.length ? filtered.map(d => <DiseaseCard key={d.id} d={d} />) : <div className="empty"><p>No results</p></div>}
      </div>
    </>
  )
}

// ── Tab 3: Protocols ──────────────────────────────────────────────────────────
const protoIcon = (p: ProtocolRow): string =>
  p.id.startsWith('PROT-TOX') ? '☠️'
    : p.id.startsWith('PROT-SEIZ') || p.id.startsWith('PROT-NEURO') || p.id === 'PROT-ATAXIA' ? '🧠'
      : p.id.startsWith('PROT-EYE') ? '👁️' : '⚡'

function ProtoCard({ p }: { p: ProtocolRow }) {
  const nav = useNav()
  return (
    <div className="card" role="button" onClick={() => nav.navigate({ kind: 'protocol', id: p.id })}>
      <div className="card-row">
        <div style={FLEX1}>
          <div className="card-title">{protoIcon(p)} {p.name}</div>
          <div className="card-sub" style={s('margin-top:3px;')}>
            <span className={`tag ${p.priority === 'IMMEDIATE' ? 'tag-em' : 'tag-hi'}`}>{p.priority}</span>
            <span style={s('font-size:11px;color:var(--gray2);margin-left:6px;')}>{p.sp}</span>
          </div>
        </div>
        <div className="card-arrow">›</div>
      </div>
    </div>
  )
}
function ProtoList() {
  const [q, setQ] = useState('')
  const lower = q.toLowerCase()
  const P = DB.protocols
  const match = (p: ProtocolRow) => !q || p.name.toLowerCase().includes(lower) || p.sp.toLowerCase().includes(lower)
  const emergency = P.filter(p => (p.id === 'PROT-CPR' || p.id === 'PROT-RESP' || p.id === 'PROT-SHOCK' || p.id === 'PROT-THOR') && match(p))
  const neuro = P.filter(p => (p.id.startsWith('PROT-SEIZ') || p.id.startsWith('PROT-NEURO') || p.id === 'PROT-ATAXIA') && match(p))
  const tox = P.filter(p => (p.id === 'PROT-TOX' || p.id.startsWith('PROT-TOX-')) && match(p))
  const eye = P.filter(p => p.id.startsWith('PROT-EYE') && match(p))
  const group = (rows: ProtocolRow[]) => rows.map(p => <ProtoCard key={p.id} p={p} />)
  const total = emergency.length + neuro.length + tox.length + eye.length
  return (
    <>
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search protocols..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      {total === 0
        ? <div className="empty"><p>No results</p></div>
        : <>
            {emergency.length > 0 && <><div className="stitle">Emergency Protocols</div>{group(emergency)}</>}
            {neuro.length > 0 && <><div className="stitle">Neurology</div>{group(neuro)}</>}
            {tox.length > 0 && <><div className="stitle">Toxicology</div>{group(tox)}</>}
            {eye.length > 0 && <><div className="stitle">Ophthalmology</div>{group(eye)}</>}
          </>}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
    </>
  )
}

// ── Tab 4: Settings ───────────────────────────────────────────────────────────
const BTN_BASE = 'padding:7px 18px;border-radius:6px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;'
const BTN_ACTIVE = s(BTN_BASE + 'background:var(--teal);color:#fff;')
const BTN_INACTIVE = s(BTN_BASE + 'background:transparent;color:var(--gray);')

function SettingsHome() {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark')
  const setTheme = (t: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem('cliniq-theme', t) } catch { /* private mode */ }
    setDark(t === 'dark')
  }
  return (
    <div style={s('padding:4px 0 20px;')}>
      <div style={s('font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:16px;')}>Appearance</div>
      <div style={s('background:var(--navy2);border:1px solid var(--border);border-radius:14px;overflow:hidden;')}>
        <div style={s('padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;')}>
          <div>
            <div style={s('font-size:14px;font-weight:500;color:var(--white);')}>Theme</div>
            <div style={s('font-size:12px;color:var(--gray);margin-top:2px;')}>{dark ? 'Dark' : 'Light'} mode active</div>
          </div>
          <div style={s('display:flex;background:var(--navy3);border-radius:8px;padding:3px;gap:2px;flex-shrink:0;')}>
            <button onClick={() => setTheme('light')} style={!dark ? BTN_ACTIVE : BTN_INACTIVE}>☀️ Light</button>
            <button onClick={() => setTheme('dark')} style={dark ? BTN_ACTIVE : BTN_INACTIVE}>🌙 Dark</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TabHome({ tab }: { tab: Tab }) {
  switch (tab) {
    case 0: return <LocaliseHome />
    case 1: return <DiagnosticHome />
    case 2: return <DiseaseHome />
    case 3: return <ProtoList />
    case 4: return <SettingsHome />
  }
}
