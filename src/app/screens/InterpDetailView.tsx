'use client'
// One cell type (or analyte) per page, its findings as tabs — the Dx pages'
// `.dx-tabs` strip, switched in place with router.replace. Each finding is laid
// out as a disease page: lead line, a thresholds card,
// then the SAME ClinicalSections stack disease pages use (Etiology →
// Pathophysiology → Diagnostic Investigation → Treatment → Monitoring → pearls),
// related disease pages, and sources. Content: src/lib/interpretation.

import { INTERP_BY_ID, INTERP_SOURCES } from '../../lib/interpretation'
import { Bul, Card, Linkify } from './markup'
import { ClinicalSections } from './diseaseSections'
import { buildDiseaseCitations, CitationContext } from './diseaseReferences'
import { References } from './referencesBlock'
import { NotFound } from './NotFound'
import { useNav } from '../nav/NavContext'
import { PAGE_TITLE } from './styles'
import { GridTable } from './gridTable'
import { bullets } from '../../lib/signs/dx/shared/dxHelpers'
import type { Nav } from './flowHelpers'
import './InterpretationScreen.css'

/** eClinPath-style skim line: a short lead term before " — ", ": ", " → " or " = "
 *  is bolded, so the eye can run down the left edge of a section. Long or
 *  already-emphasised leads are left alone. */
const LEAD = /^([^—→:=*_]{2,48}?)(:| —| →| =) /
export function emphasiseLead(item: string): string {
  if (item.includes('**')) return item
  const m = LEAD.exec(item)
  if (!m || m[1].trim().split(/\s+/).length > 6) return item
  const lead = m[1].trim()
  return m[2] === ':'
    ? `**${lead}:** ${item.slice(m[0].length)}`
    : `**${lead}**${m[2]} ${item.slice(m[0].length)}`
}

/** A table cell may hold several \n-separated lines: in the first column the
 *  first line is the label and the rest a muted qualifier; elsewhere each line
 *  is a bullet with its lead term bolded. In a table with no multi-line cell,
 *  cells render as before. */
const md = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
function tableCell(c: string, col: number, listy: boolean): string {
  const [head, ...rest] = c.split('\n')
  if (col === 0) {
    const sub = rest.length ? `<div style="font-weight:400;opacity:.75;margin-top:2px;">${rest.join('<br>')}</div>` : ''
    return `<strong>${head}</strong>${sub}`
  }
  return listy && c !== '—' ? bullets([head, ...rest].map(l => md(emphasiseLead(l)))) : c
}

/** Pipe-markup — the format every ClinicalSections field already speaks. */
const pipe = (items?: string[]) => (items ?? []).map(emphasiseLead).join('|')

export function InterpDetailView({ id }: { id: string }) {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const hit = INTERP_BY_ID.get(id)
  if (!hit) return <NotFound what="Interpretation page" />
  const { page, part: e } = hit

  const listy = !!e.thresholds?.rows.some(r => r.some(c => c.includes('\n')))
  const etiology = e.etiology.map(s => `#${s.heading}|${pipe(s.items)}`).join('|')
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
      {/* No tabs on a single-part page, so name the finding itself
          ("Basophilia"), not the cell line ("Basophils"). */}
      <div style={PAGE_TITLE}>{page.parts.length > 1 ? page.title : e.title}</div>
      {page.parts.length > 1 && (
        <div className="dx-tabs wrap">
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
      <p className="ip-lead"><Linkify text={e.sub} /></p>

      {e.thresholds && (
        <Card title={e.thresholdsTitle ?? 'Definition & Thresholds'}>
          <GridTable
            cols={e.thresholds.headers.map((_, i) => (i === 0 ? '0.8fr' : '1fr')).join(' ')}
            fontSize="var(--fs-body)"
            dividers
            headers={e.thresholds.headers}
            rows={e.thresholds.rows.map(r => r.map((c, i) => tableCell(c, i, listy)))}
            onNav={onNav}
          />
          {e.thresholds.note && <p className="ip-thr-note">{e.thresholds.note}</p>}
        </Card>
      )}

      <ClinicalSections content={content} />

      {/* The pearls box ends the stack with no bottom margin (a disease page
          stops there); this restores the gap before the cards that follow. */}
      <div className="ip-after">
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
      </div>
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </CitationContext.Provider>
  )
}
