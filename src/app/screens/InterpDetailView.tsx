'use client'
// One cell type (or analyte) per page, its findings as tabs — the Dx pages'
// `.dx-tabs` strip, switched in place with router.replace. Each finding is laid
// out as a disease page: lead line, a thresholds card,
// then the SAME ClinicalSections stack disease pages use (Etiology →
// Pathophysiology → Diagnostic Investigation → Treatment → Monitoring → pearls),
// related disease pages, and sources. Content: src/lib/interpretation.

import { INTERP_BY_ID, INTERP_SOURCES } from '../../lib/interpretation'
import { Bul, Card } from './markup'
import { ClinicalSections } from './diseaseSections'
import { buildDiseaseCitations, CitationContext } from './diseaseReferences'
import { References } from './referencesBlock'
import { NotFound } from './NotFound'
import { useNav } from '../nav/NavContext'
import { PAGE_TITLE } from './styles'
import './InterpretationScreen.css'

/** Pipe-markup — the format every ClinicalSections field already speaks. */
const pipe = (items?: string[]) => (items ?? []).join('|')

export function InterpDetailView({ id }: { id: string }) {
  const router = useNav()
  const hit = INTERP_BY_ID.get(id)
  if (!hit) return <NotFound what="Interpretation page" />
  const { page, part: e } = hit

  const etiology = e.etiology.map(s => `#${s.heading}|${s.items.join('|')}`).join('|')
  const content = {
    etiology,
    path: pipe(e.path),
    conf: pipe(e.dx),
    tx1: pipe(e.tx1),
    tx2: pipe(e.tx2),
    monitor: pipe(e.monitor),
    pearl: pipe(e.pearls),
  }
  // Same AMA numbering as a disease page: inline "(Ettinger Ch N)" → [n].
  const { numberOf, entries } = buildDiseaseCitations([
    content.etiology, content.path, content.conf, content.tx1, content.tx2, content.monitor, content.pearl,
  ])

  return (
    <CitationContext.Provider value={numberOf}>
      <div style={PAGE_TITLE}>{page.title}</div>
      {page.parts.length > 1 && (
        <div className="dx-tabs">
          {page.parts.map(p => (
            <button
              key={p.id}
              type="button"
              className="dx-tab"
              aria-current={p.id === e.id ? 'page' : undefined}
              onClick={() => router.replace({ kind: 'interp', id: p.id })}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}
      <p className="ip-lead">{e.sub}</p>

      {e.thresholds && (
        <Card title="Definition & Thresholds">
          <dl className="ip-thr">
            {e.thresholds.map(([k, v]) => (
              <div key={k} className="ip-thr-row"><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </Card>
      )}

      <ClinicalSections content={content} />

      {e.related && e.related.length > 0 && (
        <Card title="Related Disease Pages">
          <Bul text={e.related.map(r => `@${r}`).join('|')} />
        </Card>
      )}

      <References entries={entries} />
      <Card title="Sources">
        <p className="ip-src">{e.src}</p>
        <div className="ip-sources">
          {INTERP_SOURCES.map(s => <p key={s}>{s}</p>)}
        </div>
      </Card>
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </CitationContext.Provider>
  )
}
