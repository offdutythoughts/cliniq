'use client'
// Protocol step-by-step view — React port of renderProtoDetail (cliniqApp.ts).
// Output mirrors the legacy markup byte-for-pixel: .em-alert header, .stitle,
// .proto-step rows (num + action/note/branch/flag), trailing disclaimer. Step
// fields use Bul (with warn=true) when they contain '|', else plain text.

import { Fragment } from 'react'
import { DB } from '../../data/db'
import { styleStringToObject as s } from './style'
import { Bul } from './markup'
import { NotFound } from './NotFound'

const NOTE_BOX = s('display:flex;align-items:flex-start;gap:5px;')
const NOTE_ICON = s('flex-shrink:0;')
const NOTE_BODY = s('flex:1;')

/** A step field: Bul (with warn markers) when pipe-delimited, else plain text. */
function Field({ text }: { text: string }) {
  return text.includes('|') ? <Bul text={text} warn /> : <>{text}</>
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
