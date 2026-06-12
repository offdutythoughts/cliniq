'use client'
// Reusable step renderer for protocol pages.
// Handles all three action formats (plain sentence, #headline|bullets,
// multi-section #H1|…|#H2|…) and the collapsible detail card.

import { useState } from 'react'
import type { ProtocolStep as StepData } from '../../data/db'
import { styleStringToObject as s } from './style'
import { Bul } from './markup'

const NOTE_BOX = s('display:flex;align-items:flex-start;gap:5px;')
const NOTE_ICON = s('flex-shrink:0;')
const NOTE_BODY = s('flex:1;')

/** Renders pipe-delimited text as a Bul list; plain text as-is. */
export function Field({ text }: { text: string }) {
  return text.includes('|') ? <Bul text={text} warn /> : <>{text}</>
}

/**
 * Renders the action field consistently regardless of format:
 * - Plain sentence  → bold white headline only
 * - `#Headline|…`  → bold white headline + sub-bullet block below
 * - `#H1|…|#H2|…`  → first #segment as headline, rest as Bul
 */
export function ActionField({ text }: { text: string }) {
  if (!text.startsWith('#')) {
    return <div className="step-action"><Field text={text} /></div>
  }
  const segments = text.split('|')
  const headline = segments[0].slice(1).trim()
  const rest = segments.slice(1).join('|')
  return (
    <>
      <div className="step-action">{headline}</div>
      {rest && <div className="step-sub"><Bul text={rest} warn /></div>}
    </>
  )
}

/** Collapsible card containing doses, note, and branch. */
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

/** Full step row: number badge + action + optional collapsible detail + flag. */
export function ProtocolStep({ step }: { step: StepData }) {
  const hasDetail = step.doses || step.note || step.branch
  return (
    <div className="proto-step">
      <div className="step-num">{step.n}</div>
      <div className="step-body">
        <ActionField text={step.action} />
        {hasDetail && <StepDetail doses={step.doses} note={step.note} branch={step.branch} />}
        {step.flag && <div className="step-flag"><Field text={step.flag} /></div>}
      </div>
    </div>
  )
}
