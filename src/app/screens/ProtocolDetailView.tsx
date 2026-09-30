'use client'
// Protocol page — fetches the protocol row and renders each step.
// All step rendering logic lives in ProtocolStep.tsx.
//
// Protocols carry the higher evidential bar of the two page types: an ACVIM
// consensus statement or equivalent society guideline, not a textbook or a
// single cohort. Steps render citations already, because ProtocolStep uses the
// shared Bul/markup renderer — but a superscript is only useful if the numbered
// source is visible, so the numbering context and the References block are wired
// here exactly as they are on a disease page.

import { DB } from '../../data/db'
import { NotFound } from './NotFound'
import { ProtocolStep } from './ProtocolStep'
import { buildDiseaseCitations, CitationContext } from './diseaseReferences'
import { References } from './referencesBlock'

/** Every field of every step that can carry a citation marker, in render order. */
function citableFields(p: { steps: { action: string; doses?: string; note?: string; branch?: string; flag?: string }[] }): string[] {
  const out: string[] = []
  for (const step of p.steps) {
    out.push(step.action, step.doses ?? '', step.note ?? '', step.branch ?? '', step.flag ?? '')
  }
  return out.filter(Boolean)
}

export function ProtocolDetailView({ id }: { id: string }) {
  const p = DB.protocols.find(x => x.id === id)
  if (!p) return <NotFound />
  const { numberOf, entries } = buildDiseaseCitations([p.trigger, ...citableFields(p)])
  return (
    <CitationContext.Provider value={numberOf}>
      <div className="em-alert">🚨 {p.trigger}</div>
      {p.steps.map((step, i) => <ProtocolStep key={i} step={step} />)}
      <References entries={entries} />
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
    </CitationContext.Provider>
  )
}
