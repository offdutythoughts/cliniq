'use client'
// ── GridTable: the shared CSS-grid comparison table ──────────────────────────
// The compact, left-aligned, column-toned table used by flow `kind:'table'`
// blocks (peripheral vs central vs bilateral, injury grading, …) and by dx
// `kind:'gridTable'` blocks. Extracted from FlowPageView's TableBlock so both
// view families render the same table — a grid of plain cells (no <table>
// borders or cell padding), each cell coloured by its `tone`.

import { Fragment } from 'react'
import type { TableCell, TableRow } from '../../lib/signs/flowTypes'
import { HUE } from '../../lib/signs/tone'
import { styleStringToObject as s } from './style'
import { type Nav, Raw } from './flowHelpers'

const ST_SECTION_LABEL = s('grid-column:1/-1;padding:4px 0 2px;font-size:var(--fs-chip-sub);font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),.08);margin-top:2px;')
const ST_ROW_DIVIDER   = s('grid-column:1/-1;height:1px;background:rgba(var(--slate-muted),.2);')
// Section labels span the full width, so they have no pinned cell above them —
// the text itself pins instead, keeping the band label in the frozen column.
const ST_SECTION_STICKY = s('position:sticky;left:0;display:inline-block;')

// Pinned first column, for `stickyFirstCol`. The cells paint an opaque
// background behind themselves so the other columns slide under, plus shadow
// copies of it across the 6px column gap and the row gaps above/below (`v` =
// half a row gap, so consecutive rows meet) — the cell backgrounds alone leave
// those gaps transparent, and scrolling glyphs show through the slivers. Every
// copy stops at the gap, never over the next column. The first (topmost) layer
// is the soft seam the columns disappear under. `--sticky-col-bg` is whatever
// the table sits on: the page background unless a caller sets it (a boxed table
// passes the panel tint composited over the page — otherwise the frozen column
// reads as a paler strip).
const stickyCol = (rowGap: number) => {
  const bg = 'var(--sticky-col-bg,var(--navy))'
  const v = Math.ceil(rowGap / 2)
  const cover = [`6px 0 0 ${bg}`, `0 ${v}px 0 ${bg}`, `0 -${v}px 0 ${bg}`, `6px ${v}px 0 ${bg}`, `6px -${v}px 0 ${bg}`]
  return `position:sticky;left:0;z-index:1;background:${bg};box-shadow:5px 0 5px -5px rgba(var(--slate-muted),.55),${cover.join(',')};`
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
  onNav: Nav
}

export function GridTable({ cols, headers, rows, dividers, stickyFirstCol, scroll, minWidth, fontSize, onNav }: GridTableProps) {
  const lastIdx = rows.length - 1
  const rowGap = dividers ? 9 : 3
  const pinned = stickyFirstCol ? stickyCol(rowGap) : undefined
  const grid = (
    <div style={s(`display:grid;grid-template-columns:${cols};gap:${rowGap}px 6px;font-size:${fontSize ?? '9.5px'};line-height:1.4;${minWidth ? `min-width:${minWidth}px;` : ''}`)}>
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
            <div key={`s${ri}`} style={ST_SECTION_LABEL}>
              {stickyFirstCol ? <span style={ST_SECTION_STICKY}>{row.section}</span> : row.section}
            </div>
          )
      )}
    </div>
  )
  return scroll ? <div className="scroll-x">{grid}</div> : grid
}
