'use client'
// ── GridTable: the shared CSS-grid comparison table ──────────────────────────
// The compact, left-aligned, column-toned table used by flow `kind:'table'`
// blocks (peripheral vs central vs bilateral, injury grading, …) and by dx
// `kind:'gridTable'` blocks. Extracted from FlowPageView's TableBlock so both
// view families render the same table — a grid of plain cells (no <table>
// borders or cell padding), each cell coloured by its `tone`.

import { Fragment, useState } from 'react'
import type { TableCell, TableRow } from '../../lib/signs/flowTypes'
import { HUE } from '../../lib/signs/tone'
import { styleStringToObject as s } from './style'
import { type Nav, Raw } from './flowHelpers'
import { Caret } from './patternList'

const ST_SECTION_LABEL = s('grid-column:1/-1;padding:4px 0 2px;font-size:var(--fs-chip-sub);font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),.08);margin-top:2px;')
const ST_ROW_DIVIDER   = s('grid-column:1/-1;height:1px;background:rgba(var(--slate-muted),.2);')
// A section label may carry a `tone` when the band itself is the finding (the
// pupil-sign tables label bands "Drugs → mydriasis" instead of repeating a
// per-row pupil cell), in which case it takes that hue instead of --gray2.
// Section labels span the full width, so they have no pinned cell above them —
// the text itself pins instead, keeping the band label in the frozen column.
const ST_SECTION_STICKY = s('position:sticky;left:0;display:inline-block;')

// `collapsibleSections` reuses PatternList's `.pat-*` summary chrome (globals.css)
// and its caret, so a folded table band and a folded pattern band are the same
// control wherever the reader meets one.
const ST_STACK = s('display:flex;flex-direction:column;gap:9px;width:100%;')
const ST_DETAILS_BODY = s('padding:7px 0 2px;')

// Pinned first column, for `stickyFirstCol`. The cells paint an opaque
// background behind themselves so the other columns slide under, plus shadow
// copies of it across the 6px column gap and the row gaps above/below (`v` =
// half a row gap, so consecutive rows meet) — the cell backgrounds alone leave
// those gaps transparent, and scrolling glyphs show through the slivers. Every
// copy stops at the gap, never over the next column, and nothing marks the
// pinned edge — no rule, no shadow; the columns just slide under.
// `--sticky-col-bg` is whatever the table sits on: the page background unless a
// caller sets it (a boxed table passes the panel tint composited over the page —
// otherwise the frozen column reads as a paler strip).
const stickyCol = (rowGap: number) => {
  const bg = 'var(--sticky-col-bg,var(--navy))'
  const v = Math.ceil(rowGap / 2)
  const cover = [`6px 0 0 ${bg}`, `0 ${v}px 0 ${bg}`, `0 -${v}px 0 ${bg}`, `6px ${v}px 0 ${bg}`, `6px -${v}px 0 ${bg}`]
  return `position:sticky;left:0;z-index:1;background:${bg};box-shadow:${cover.join(',')};`
}

function Cell({ c, header, sticky, onNav }: { c: TableCell; header?: boolean; sticky?: string; onNav: Nav }) {
  const text = typeof c === 'string' ? c : c.text
  const tone = typeof c !== 'string' ? c.tone : undefined
  const dim = typeof c !== 'string' && c.dim
  const color = dim ? 'color:rgba(var(--slate-muted),0.55);' : tone ? `color:${HUE[tone].color};` : ''
  const head = header
    ? tone
      ? `font-weight:700;padding-bottom:4px;border-bottom:2px solid ${HUE[tone].color};white-space:nowrap;${color}`
      : 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(var(--slate-muted),.25);'
    : color
  return <div style={s(`${head}${sticky ?? ''}`)}><Raw html={text} onNav={onNav} /></div>
}

type SectionRow = Extract<TableRow, { section: string }>
const isSection = (r: TableRow): r is SectionRow => !Array.isArray(r)

// The data rows of one band, as direct grid children (so the cells land in the
// parent grid's columns, not in a wrapper of their own).
function DataRows({ rows, dividers, pinned, onNav }: {
  rows: TableCell[][]; dividers?: boolean; pinned?: string; onNav: Nav
}) {
  const lastIdx = rows.length - 1
  return (
    <>
      {rows.map((row, ri) => (
        <Fragment key={ri}>
          {row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} sticky={ci === 0 ? pinned : undefined} onNav={onNav} />)}
          {dividers && ri !== lastIdx && <div style={ST_ROW_DIVIDER} />}
        </Fragment>
      ))}
    </>
  )
}

// One collapsible band. Native <details> keeps keyboard and screen-reader
// behaviour for free; `display:flex` on the summary suppresses the disclosure
// marker and onToggle drives our own ▸/▾. The band's rows get their own grid
// with the table's `cols`, so columns still line up with the header above.
function TableSection({ label, tone, rows, gridStyle, dividers, pinned, open: initial, onNav }: {
  label: string
  tone?: SectionRow['tone']
  rows: TableCell[][]
  gridStyle: React.CSSProperties
  dividers?: boolean
  pinned?: string
  open: boolean
  onNav: Nav
}) {
  const [open, setOpen] = useState(initial)
  return (
    <details open={initial} onToggle={e => setOpen((e.currentTarget as HTMLDetailsElement).open)} style={s('width:100%;')}>
      <summary className="pat-sec-sum" style={tone ? { color: HUE[tone].color } : undefined}
        aria-label={`${label} — ${rows.length} row${rows.length === 1 ? '' : 's'}`}>
        <Caret open={open} />
        {label}
        <span className="pat-count" aria-hidden="true">{rows.length}</span>
      </summary>
      <div style={ST_DETAILS_BODY}>
        <div style={gridStyle}>
          <DataRows rows={rows} dividers={dividers} pinned={pinned} onNav={onNav} />
        </div>
      </div>
    </details>
  )
}

export type GridTableProps = {
  cols: string
  headers: TableCell[]
  rows: TableRow[]
  /** Row gap + a soft full-width divider between data rows (spaced bands). */
  dividers?: boolean
  /** Pin the first column while the rest scrolls sideways (needs `scroll`). */
  stickyFirstCol?: boolean
  scroll?: boolean
  minWidth?: number
  /** Body font size; defaults to the 9.5px flow-table scale. */
  fontSize?: string
  /** Fold each `section` band into a <details> — a long lookup table (a dozen
   *  signalments across two species) arrives as a short menu of bands and the
   *  reader opens the one matching the patient. Ignored without sections. */
  collapsibleSections?: boolean
  onNav: Nav
}

export function GridTable({ cols, headers, rows, dividers, stickyFirstCol, scroll, minWidth, fontSize, collapsibleSections, onNav }: GridTableProps) {
  const lastIdx = rows.length - 1
  const rowGap = dividers ? 7 : 3
  const pinned = stickyFirstCol ? stickyCol(rowGap) : undefined
  const gridStyle = s(`display:grid;grid-template-columns:${cols};gap:${rowGap}px 6px;font-size:${fontSize ?? '9.5px'};line-height:1.4;${minWidth ? `min-width:${minWidth}px;` : ''}`)

  // Folded: header (plus any rows before the first section) in one grid, then
  // one <details> per band.
  if (collapsibleSections && rows.some(isSection)) {
    const lead: TableCell[][] = []
    const bands: { label: string; tone?: SectionRow['tone']; rows: TableCell[][] }[] = []
    for (const r of rows) {
      if (isSection(r)) bands.push({ label: r.section, tone: r.tone, rows: [] })
      else (bands.length ? bands[bands.length - 1].rows : lead).push(r)
    }
    const folded = (
      <div style={ST_STACK}>
        <div style={gridStyle}>
          {headers.map((h, i) => <Cell key={`h${i}`} c={h} header sticky={i === 0 ? pinned : undefined} onNav={onNav} />)}
          {lead.length > 0 && <DataRows rows={lead} dividers={dividers} pinned={pinned} onNav={onNav} />}
        </div>
        {bands.map((b, i) => (
          <TableSection key={i} label={b.label} tone={b.tone} rows={b.rows} gridStyle={gridStyle}
            dividers={dividers} pinned={pinned} open={false} onNav={onNav} />
        ))}
      </div>
    )
    return scroll ? <div className="scroll-x">{folded}</div> : folded
  }

  const grid = (
    <div style={gridStyle}>
      {headers.map((h, i) => <Cell key={`h${i}`} c={h} header sticky={i === 0 ? pinned : undefined} onNav={onNav} />)}
      {rows.map((row, ri) =>
        Array.isArray(row)
          ? (
            <Fragment key={ri}>
              {row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} sticky={ci === 0 ? pinned : undefined} onNav={onNav} />)}
              {dividers && ri !== lastIdx && <div style={ST_ROW_DIVIDER} />}
            </Fragment>
          )
          : (
            <div key={`s${ri}`} style={row.tone ? { ...ST_SECTION_LABEL, color: HUE[row.tone].color } : ST_SECTION_LABEL}>
              {stickyFirstCol ? <span style={ST_SECTION_STICKY}>{row.section}</span> : row.section}
            </div>
          )
      )}
    </div>
  )
  return scroll ? <div className="scroll-x">{grid}</div> : grid
}
