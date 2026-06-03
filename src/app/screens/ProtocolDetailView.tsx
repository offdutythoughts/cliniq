'use client'
// Protocol step-by-step view — React port of renderProtoDetail (cliniqApp.ts).
// Output mirrors the legacy markup byte-for-pixel: .em-alert header, .stitle,
// .proto-step rows (num + action/note/branch/flag), trailing disclaimer. Step
// fields are pipe-markup (the legacy `pbul`) when they contain '|', else plain
// text. pbul has no @-link tokens, so no navigation here.

import { Fragment } from 'react'
import { DB } from '../../data/db'
import { styleStringToObject as s } from './style'
import { NotFound } from './NotFound'

const HEADER = s('font-size:10px;font-weight:700;color:var(--teal-light);margin-top:6px;margin-bottom:2px;')
const WARN = s('font-size:11px;font-weight:700;color:#f87171;margin:4px 0 2px;background:rgba(239,68,68,0.12);padding:3px 7px;border-radius:4px;')
const SUB = s('display:flex;align-items:baseline;gap:4px;font-size:11px;color:var(--gray);line-height:1.5;padding-left:12px;margin-bottom:1px;')
const SUB_DASH = s('flex-shrink:0;opacity:.5;')
const BULLET = s('display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;')
const BULLET_DOT = s('color:var(--teal-light);flex-shrink:0;')
const NOTE_BOX = s('display:flex;align-items:flex-start;gap:5px;')
const NOTE_ICON = s('flex-shrink:0;')
const NOTE_BODY = s('flex:1;')

/** Pipe-markup: `#`→header, `!`→warning, `-`→sub-bullet, else bullet. */
function ProtoMarkup({ text }: { text: string }) {
  const segs = text.split('|').map(t => t.trim()).filter(Boolean)
  return (
    <>
      {segs.map((t, i) => {
        if (t.startsWith('#')) return <div key={i} style={HEADER}>▸ {t.slice(1).trim()}</div>
        if (t.startsWith('!')) return <div key={i} style={WARN}>⚠️ {t.slice(1).trim()}</div>
        if (t.startsWith('-')) return <div key={i} style={SUB}><span style={SUB_DASH}>–</span>{t.slice(1).trim()}</div>
        return <div key={i} style={BULLET}><span style={BULLET_DOT}>•</span>{t}</div>
      })}
    </>
  )
}

/** A step field: pipe-markup when it contains '|', else plain (escaped) text. */
function Field({ text }: { text: string }) {
  return text.includes('|') ? <ProtoMarkup text={text} /> : <>{text}</>
}

export function ProtocolDetailView({ id }: { id: string }) {
  const p = DB.protocols.find(x => x.id === id)
  if (!p) return <NotFound />
  return (
    <>
      <div className="em-alert">{p.priority === 'IMMEDIATE' ? '🚨' : '⚡'} {p.priority} — {p.trigger}</div>
      <div className="stitle">Step-by-step</div>
      {p.steps.map((step, i) => (
        <div className="proto-step" key={i}>
          <div className="step-num">{step.n}</div>
          <div className="step-body">
            <div className="step-action"><Field text={step.action} /></div>
            {step.note && (
              <div className="step-note" style={NOTE_BOX}>
                <span style={NOTE_ICON}>💡</span>
                <div style={NOTE_BODY}><Field text={step.note} /></div>
              </div>
            )}
            {step.branch && <div className="step-branch">↳ <Field text={step.branch} /></div>}
            {step.flag && <div className="step-flag"><Field text={step.flag} /></div>}
          </div>
        </div>
      ))}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
    </>
  )
}
