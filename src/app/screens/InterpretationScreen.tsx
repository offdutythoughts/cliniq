'use client'
// ── Interpretation tab ──────────────────────────────────────────────────────
// "I have an abnormal number — what does it mean?" Two segments: physical
// findings (BP, HR, temperature, respiration, membranes) and bloodwork (CBC +
// biochemistry). Each finding is a collapsed card; opening it shows the
// thresholds, the mechanism-grouped causes, pearls, and links to the disease
// pages it most often leads to. Content: src/lib/interpretation.

import { useState } from 'react'
import { PHYSICAL, BLOODWORK, INTERP_SOURCES, type InterpEntry, type InterpGroup } from '../../lib/interpretation'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { Tappable } from './Tappable'
import './InterpretationScreen.css'

type Segment = 'physical' | 'bloodwork'

const SEGMENTS: [Segment, string][] = [
  ['physical', 'Physical findings'],
  ['bloodwork', 'Bloodwork'],
]

const diseaseName = new Map(DB.disease_page.map(d => [d.id, d.name]))

function EntryCard({ e }: { e: InterpEntry }) {
  const nav = useNav()
  const [open, setOpen] = useState(false)
  const bodyId = `ip-body-${e.id}`
  return (
    <div className="ip-card" data-open={open || undefined}>
      <button type="button" className="ip-head" aria-expanded={open} aria-controls={bodyId}
        onClick={() => setOpen(o => !o)}>
        <span className="ip-head-text">
          <span className="ip-title">{e.title}</span>
          <span className="ip-sub">{e.sub}</span>
        </span>
        <span className="ip-chev" aria-hidden>›</span>
      </button>
      {open && (
        <div className="ip-body" id={bodyId}>
          {e.thresholds && (
            <dl className="ip-thr">
              {e.thresholds.map(([k, v]) => (
                <div key={k} className="ip-thr-row"><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          )}
          {e.sections.map(s => (
            <div key={s.heading} className="ip-sec">
              <div className="ip-sec-h">{s.heading}</div>
              <ul className="ip-list">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
          {e.pearls && (
            <div className="ip-pearls">
              <div className="ip-sec-h">Pearls</div>
              <ul className="ip-list">{e.pearls.map(p => <li key={p}>{p}</li>)}</ul>
            </div>
          )}
          {e.related && (
            <div className="ip-related">
              {e.related.map(id => (
                <Tappable key={id} className="ip-link" onTap={() => nav.navigate({ kind: 'disease', id })}>
                  {diseaseName.get(id) ?? id} ›
                </Tappable>
              ))}
            </div>
          )}
          <div className="ip-src">{e.src}</div>
        </div>
      )}
    </div>
  )
}

function Groups({ groups }: { groups: InterpGroup[] }) {
  return (
    <>
      {groups.map(g => (
        <section key={g.title} className="ip-group">
          <div className="stitle"><span aria-hidden>{g.icon}</span> {g.title}</div>
          {g.entries.map(e => <EntryCard key={e.id} e={e} />)}
        </section>
      ))}
    </>
  )
}

export function InterpretationScreen() {
  const [seg, setSeg] = useState<Segment>('physical')
  return (
    <>
      <div className="ip-seg" role="group" aria-label="Interpretation section">
        {SEGMENTS.map(([id, label]) => (
          <button key={id} type="button" className="ip-seg-btn" aria-pressed={seg === id} onClick={() => setSeg(id)}>
            {label}
          </button>
        ))}
      </div>
      <p className="ip-note">
        {seg === 'physical'
          ? 'Vital-sign and exam findings — thresholds, causes by mechanism, and what to check next.'
          : 'CBC and biochemistry — interpret against your own analyser’s reference intervals, alongside history, exam and urinalysis.'}
      </p>
      <Groups groups={seg === 'physical' ? PHYSICAL : BLOODWORK} />
      <div className="ip-sources">
        <div className="ip-sec-h">Sources</div>
        {INTERP_SOURCES.map(s => <p key={s}>{s}</p>)}
      </div>
      <div className="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment. Always verify clinical decisions independently.</div>
    </>
  )
}
