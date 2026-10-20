'use client'
// ── Interpretation tab ──────────────────────────────────────────────────────
// Bloodwork only: CBC and biochemistry, grouped. Each card is one cell type or
// analyte, opening a disease-page-style detail (InterpDetailView) with its
// findings as tabs. Physical-exam findings live in
// the Clinical / Diagnostic tabs as signs. Content: src/lib/interpretation.

import { INTERP_GROUPS } from '../../lib/interpretation'
import { useNav } from '../nav/NavContext'
import { NavCard } from './markup'
import './InterpretationScreen.css'

export function InterpretationScreen() {
  const nav = useNav()
  return (
    <>
      <p className="ip-note">
        CBC and biochemistry — interpret against your own analyser’s reference intervals, alongside history, exam and urinalysis.
      </p>
      {INTERP_GROUPS.map(g => (
        <section key={g.title} className="ip-group">
          <div className="stitle"><span aria-hidden>{g.icon}</span> {g.title}</div>
          {g.pages.map(p => (
            <NavCard key={p.id} title={p.title} sub={p.sub} onClick={() => nav.navigate({ kind: 'interp', id: p.id })} />
          ))}
        </section>
      ))}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.</div>
    </>
  )
}
