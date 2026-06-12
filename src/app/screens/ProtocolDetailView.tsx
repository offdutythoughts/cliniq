'use client'
// Protocol step-by-step view.
// Layout per step: action headline → sub-bullets → collapsible detail card (doses/note/branch) → flag

import { useState } from 'react'
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

/**
 * Renders the action field consistently regardless of format:
 * - Plain sentence → bold white headline only
 * - `#Headline|bullet|bullet` → bold white headline + sub-bullet block below
 * - `#H1|bullets|#H2|bullets` (multi-section) → same: first #segment as headline, rest as Bul
 */
function ActionField({ text }: { text: string }) {
  if (!text.startsWith('#')) {
    // Plain sentence — render as-is (may still contain pipes, handled by Field)
    return <div className="step-action"><Field text={text} /></div>
  }
  const segments = text.split('|')
  // First segment is the #-header — strip the # and use as headline
  const headline = segments[0].slice(1).trim()
  const rest = segments.slice(1).join('|')
  return (
    <>
      <div className="step-action">{headline}</div>
      {rest && <div className="step-sub"><Bul text={rest} warn /></div>}
    </>
  )
}

function StepDetail({ doses, note, branch }: { doses?: string; note?: string; branch?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className="step-detail-toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {open ? '▾ Hide detail' : '▸ Show detail'}
      </button>
      {open && (
        <div className="step-detail">
          {doses  && <div className="step-doses"><Field text={doses}  /></div>}
          {note   && <div className="step-note" style={NOTE_BOX}><span style={NOTE_ICON}>💡</span><div style={NOTE_BODY}><Field text={note} /></div></div>}
          {branch && <div className="step-branch">↳ <Field text={branch} /></div>}
        </div>
      )}
    </>
  )
}

export function ProtocolDetailView({ id }: { id: string }) {
  const p = DB.protocols.find(x => x.id === id)
  if (!p) return <NotFound />
  return (
    <>
      <div className="em-alert">{p.priority === 'IMMEDIATE' ? '🚨' : '⚡'} {p.priority} — {p.trigger}</div>
      {p.steps.map((step, i) => {
        const hasDetail = step.doses || step.note || step.branch
        return (
          <div className="proto-step" key={i}>
            <div className="step-num">{step.n}</div>
            <div className="step-body">
              <ActionField text={step.action} />
              {hasDetail && <StepDetail doses={step.doses} note={step.note} branch={step.branch} />}
              {step.flag && <div className="step-flag"><Field text={step.flag} /></div>}
            </div>
          </div>
        )
      })}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
    </>
  )
}
