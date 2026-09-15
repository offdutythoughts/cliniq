'use client'
// ── PatternList: the "PATTERN RECOGNITION" finding → diagnosis list ──────────
// The two-column version of this (a `gridTable` of `Finding | Most likely`) put
// a dozen `+`-joined findings in a narrow left column, where each one wrapped
// to two lines and the eye had to bridge a gap to its answer. Here one pattern
// is one card: the cues on a `·`-separated line, the diagnosis on its own line
// behind a tone-coloured rail. `section` rows group the cards into collapsible
// <details> — a 13-row list arrives as a four-item menu of presentations, and
// the reader opens the one that matches the patient.

import { Fragment, useState } from 'react'
import type { PatternRow, PatternListRow } from '../../lib/signs/dxTypes'
import { HUE } from '../../lib/signs/tone'
import { styleStringToObject as s } from './style'
import { type Nav, Raw } from './flowHelpers'

const ST_CUES = s('font-size:var(--fs-box);line-height:1.5;color:var(--gray);')
const ST_SEP = s('color:rgba(var(--slate-muted),0.95);padding:0 4px;')
const ST_ARROW = s('opacity:.55;font-weight:400;padding-right:4px;')
const ST_NOTE = s('font-weight:400;font-size:var(--fs-chip-sub);color:rgba(var(--slate-muted),0.9);padding-left:5px;')
const ST_SUMMARY = s('display:flex;align-items:center;gap:7px;cursor:pointer;list-style:none;padding:7px 10px;border-radius:8px;background:rgba(var(--slate-muted),var(--panel-bg-a));font-size:var(--fs-chip-sub);font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--gray);')
const ST_CHEV = s('font-size:var(--fs-chip-sub);opacity:.75;')
const ST_COUNT = s('margin-left:auto;font-weight:600;letter-spacing:0;text-transform:none;opacity:.7;')
const ST_STACK = s('display:flex;flex-direction:column;gap:6px;')
const ST_BODY = s('display:flex;flex-direction:column;gap:6px;padding:6px 0 2px;')
const ST_CAPTION = s('font-size:var(--fs-chip-sub);color:rgba(var(--slate-muted),0.8);letter-spacing:.04em;margin-bottom:8px;')
const ST_LABEL = s('font-size:var(--fs-label);font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')

const isSection = (r: PatternListRow): r is { section: string; open?: boolean } => 'section' in r

// One pattern. The card stays neutral unless `emphasis` is set, so a list of a
// dozen doesn't read as a dozen competing coloured blocks — colour lives in the
// rail and the diagnosis, where it means the same thing it did in the table.
function PatternCard({ r, onNav }: { r: PatternRow; onNav: Nav }) {
  const rgb = r.tone ? HUE[r.tone].rgb : 'var(--slate-muted)'
  const bg = r.emphasis ? rgb : 'var(--slate-muted)'
  return (
    <div style={s(`background:rgba(${bg},var(--panel-bg-a));border-left:3px solid rgba(${rgb},var(--tile-bd-a));border-radius:0 8px 8px 0;padding:7px 10px 8px;`)}>
      <div style={ST_CUES}>
        {r.cues.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && <span style={ST_SEP}>·</span>}
            <Raw html={c} onNav={onNav} />
          </Fragment>
        ))}
      </div>
      <div style={s(`font-size:var(--fs-chip);font-weight:700;line-height:1.4;margin-top:4px;color:${r.tone ? HUE[r.tone].color : 'var(--white)'};`)}>
        <span style={ST_ARROW}>→</span>
        <Raw html={r.dx} onNav={onNav} />
        {r.note && <span style={ST_NOTE}><Raw html={r.note} onNav={onNav} /></span>}
      </div>
    </div>
  )
}

// Native <details> keeps the keyboard and screen-reader behaviour for free;
// `display:flex` on the summary suppresses the disclosure marker, and onToggle
// drives our own ▸/▾ so no [open] CSS rule is needed.
function PatternSection({ label, rows, open: initial, onNav }: {
  label: string; rows: PatternRow[]; open: boolean; onNav: Nav
}) {
  const [open, setOpen] = useState(initial)
  return (
    <details open={initial} onToggle={e => setOpen((e.currentTarget as HTMLDetailsElement).open)} style={s('width:100%;')}>
      <summary style={ST_SUMMARY}>
        <span style={ST_CHEV}>{open ? '▾' : '▸'}</span>
        {label}
        <span style={ST_COUNT}>{rows.length} pattern{rows.length === 1 ? '' : 's'}</span>
      </summary>
      <div style={ST_BODY}>
        {rows.map((r, i) => <PatternCard key={i} r={r} onNav={onNav} />)}
      </div>
    </details>
  )
}

export function PatternList({ rows, label, caption, gap, onNav }: {
  rows: PatternListRow[]
  label?: string
  caption?: string
  gap?: number
  onNav: Nav
}) {
  // Patterns before the first `section` row (or a list with none) render as a
  // plain card stack — a six-row table gains nothing from being folded away.
  const sections: { label: string | null; open: boolean; rows: PatternRow[] }[] = []
  for (const r of rows) {
    if (isSection(r)) sections.push({ label: r.section, open: r.open ?? false, rows: [] })
    else {
      if (!sections.length) sections.push({ label: null, open: true, rows: [] })
      sections[sections.length - 1].rows.push(r)
    }
  }
  const legend = caption ?? 'Finding pattern → most likely'
  return (
    <div style={s(`margin-top:${gap ?? 10}px;width:100%;text-align:left;`)}>
      {label && <div style={ST_LABEL}>{label}</div>}
      {legend && <div style={ST_CAPTION}>{legend}</div>}
      <div style={ST_STACK}>
        {sections.map((sec, i) => sec.label === null
          ? <Fragment key={i}>{sec.rows.map((r, ri) => <PatternCard key={ri} r={r} onNav={onNav} />)}</Fragment>
          : <PatternSection key={i} label={sec.label} rows={sec.rows} open={sec.open} onNav={onNav} />
        )}
      </div>
    </div>
  )
}
