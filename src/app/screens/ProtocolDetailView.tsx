'use client'
// Protocol page — fetches the protocol row and renders each step.
// All step rendering logic lives in ProtocolStep.tsx.

import { DB } from '../../data/db'
import { NotFound } from './NotFound'
import { ProtocolStep } from './ProtocolStep'

export function ProtocolDetailView({ id }: { id: string }) {
  const p = DB.protocols.find(x => x.id === id)
  if (!p) return <NotFound />
  return (
    <>
      <div className="em-alert">🚨 {p.priority} — {p.trigger}</div>
      {p.steps.map((step, i) => <ProtocolStep key={i} step={step} />)}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
    </>
  )
}
