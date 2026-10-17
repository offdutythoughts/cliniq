'use client'
// ── Interpretation tab ──────────────────────────────────────────────────────
// Bloodwork only: CBC and biochemistry findings, grouped, each opening its own
// disease-page-style detail (InterpDetailView). Physical-exam findings live in
// the Clinical / Diagnostic tabs as signs. Content: src/lib/interpretation.

import { BLOODWORK } from '../../lib/interpretation'
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
      {BLOODWORK.map(g => (
        <section key={g.title} className="ip-group">
          <div className="stitle"><span aria-hidden>{g.icon}</span> {g.title}</div>
          {g.entries.map(e => (
            <NavCard key={e.id} title={e.title} sub={e.sub} onClick={() => nav.navigate({ kind: 'interp', id: e.id })} />
          ))}
        </section>
      ))}
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.</div>
    </>
  )
}
