'use client'
// ── PatternList: the "PATTERN RECOGNITION" finding → diagnosis list ──────────
// The two-column version of this (a `gridTable` of `Finding | Most likely`) put
// a dozen `+`-joined findings in a narrow left column, where each one wrapped
// to two lines and the eye had to bridge a gap to its answer. Here one pattern
// is one row: the cues on a `·`-separated line, the diagnosis on its own line
// behind a tone-coloured rail. `section` rows group the rows into collapsible
// <details> — a 13-row list arrives as a four-item menu of presentations, and
// the reader opens the one that matches the patient.
//
// Styling: this block shares its pages with `gridTable`, so it shares that
// table's vocabulary — no fills, hairline rules, tone carried by the text —
// rather than boxing every row in its own tinted rounded card, which turned a
// scannable index into a dozen competing tiles. Rows are flush and the rail is
// the only colour, so a section reads as one spine that changes hue per
// pattern. The static/stateful half of the CSS is `.pat-*` in globals.css.

import { Fragment, useState } from 'react'
import type { PatternRow, PatternListRow } from '../../lib/signs/dxTypes'
import { HUE } from '../../lib/signs/tone'
import { styleStringToObject as s } from './style'
import { type Nav, Raw } from './flowHelpers'

const ST_CUES = s('font-size:var(--fs-box);line-height:1.5;color:var(--gray);')
const ST_CUES_EM = s('font-size:var(--fs-box);line-height:1.5;color:var(--white);')
const ST_SEP = s('color:rgba(var(--slate-muted),0.7);padding:0 5px;')
const ST_ARROW = s('opacity:.45;font-weight:400;padding-right:5px;')
const ST_NOTE = s('font-weight:400;font-size:var(--fs-chip-sub);color:rgba(var(--slate-muted),0.9);padding-left:5px;')
const ST_STACK = s('display:flex;flex-direction:column;gap:13px;')
const ST_BODY = s('display:flex;flex-direction:column;padding:1px 0 2px;')
const ST_CAPTION = s('font-size:var(--fs-chip-sub);color:var(--gray2);letter-spacing:.02em;margin-bottom:9px;')
const ST_LABEL = s('font-size:var(--fs-label);font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')

const isSection = (r: PatternListRow): r is { section: string; open?: boolean } => 'section' in r

// A drawn chevron rather than a ▸/▾ glyph swap: (shared with gridTable's
// collapsible sections, which use the same summary chrome.) it rotates instead of
// substituting a different character, so the header doesn't reflow on open and
// the marker matches the weight of the text beside it at any zoom level.
export function Caret({ open }: { open: boolean }) {
  return (
    <svg className={`pat-caret${open ? ' open' : ''}`} width="7" height="7" viewBox="0 0 8 8" aria-hidden="true">
      <path d="M2.4 1 L6 4 L2.4 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// One pattern. Colour appears exactly twice — the rail and the diagnosis — and
// means the same thing in both. `emphasis` (the must-not-miss ones: acute
// glaucoma, lens luxation) carries on ink, not on fill: the rail goes solid and
// a third wider, and the cue line rises from --gray to the page's own text
// colour, so the whole row reads darker than its neighbours. A tint was tried
// here and dropped — a washed band is the card look this block just lost, and
// fading it out across the row only added a soft edge with nothing behind it.
// The rail widens into the padding (10px + 3px = the same 13px text offset as
// 11px + 2px), so an emphasised row doesn't shift its text out of the column.
function PatternCard({ r, onNav }: { r: PatternRow; onNav: Nav }) {
  const rgb = r.tone ? HUE[r.tone].rgb : 'var(--slate-muted)'
  const fg = r.tone ? HUE[r.tone].color : 'var(--white)'
  const rail = r.emphasis ? `3px solid ${fg};padding-left:10px` : `2px solid rgba(${rgb},var(--tile-bd-a))`
  return (
    <div className="pat-row" style={s(`border-left:${rail};`)}>
      <div style={r.emphasis ? ST_CUES_EM : ST_CUES}>
        {r.cues.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && <span style={ST_SEP}>·</span>}
            <Raw html={c} onNav={onNav} />
          </Fragment>
        ))}
      </div>
      {/* The answer is set at the cue size, not below it — it was --fs-chip
          (10.5px) against 11px cues, which left the conclusion smaller than the
          question it answers. Weight and colour carry the emphasis instead.
          The negative text-indent hangs the → in its own gutter, so a diagnosis
          that wraps (they do at 375px) keeps its second line under the first
          rather than flush against the rail where a new cue would start. */}
      <div style={s(`font-size:var(--fs-box);font-weight:${r.emphasis ? 700 : 600};line-height:1.45;margin-top:3px;padding-left:14px;text-indent:-14px;color:${fg};`)}>
        <span style={ST_ARROW}>→</span>
        <Raw html={r.dx} onNav={onNav} />
        {r.note && <span style={ST_NOTE}><Raw html={r.note} onNav={onNav} /></span>}
      </div>
    </div>
  )
}

// Native <details> keeps the keyboard and screen-reader behaviour for free;
// `display:flex` on the summary suppresses the disclosure marker, and onToggle
// drives the caret's rotation so no [open] CSS rule is needed.
function PatternSection({ label, rows, open: initial, onNav }: {
  label: string; rows: PatternRow[]; open: boolean; onNav: Nav
}) {
  const [open, setOpen] = useState(initial)
  const count = `${rows.length} pattern${rows.length === 1 ? '' : 's'}`
  return (
    <details open={initial} onToggle={e => setOpen((e.currentTarget as HTMLDetailsElement).open)} style={s('width:100%;')}>
      <summary className="pat-sec-sum" aria-label={`${label} — ${count}`}>
        <Caret open={open} />
        {label}
        <span className="pat-count" aria-hidden="true">{rows.length}</span>
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
  // plain row stack — a six-row table gains nothing from being folded away.
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
          ? <div key={i} style={ST_BODY}>{sec.rows.map((r, ri) => <PatternCard key={ri} r={r} onNav={onNav} />)}</div>
          : <PatternSection key={i} label={sec.label} rows={sec.rows} open={sec.open} onNav={onNav} />
        )}
      </div>
    </div>
  )
}
