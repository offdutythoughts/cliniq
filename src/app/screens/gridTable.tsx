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
import { styleStringToObject as s, SCROLL_X } from './style'
import { type Nav, Raw } from './flowHelpers'

const ST_SECTION_LABEL = s('grid-column:1/-1;padding:4px 0 2px;font-size:8px;font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),.08);margin-top:2px;')
const ST_ROW_DIVIDER   = s('grid-column:1/-1;height:1px;background:rgba(var(--slate-muted),.2);')
const STICKY_COL = 'position:sticky;left:0;z-index:1;background:var(--navy);'

function Cell({ c, header, sticky, onNav }: { c: TableCell; header?: boolean; sticky?: boolean; onNav: Nav }) {
  const text = typeof c === 'string' ? c : c.text
  const tone = typeof c !== 'string' ? c.tone : undefined
  const dim = typeof c !== 'string' && c.dim
  const color = dim ? 'color:rgba(var(--slate-muted),0.55);' : tone ? `color:${HUE[tone].color};` : ''
  const head = header
    ? tone
      ? `font-weight:700;padding-bottom:4px;border-bottom:2px solid ${HUE[tone].color};white-space:nowrap;${color}`
      : 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(var(--slate-muted),.25);'
    : color
  return <div style={s(`${head}${sticky ? STICKY_COL : ''}`)}><Raw html={text} onNav={onNav} /></div>
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
  const grid = (
    <div style={s(`display:grid;grid-template-columns:${cols};gap:${dividers ? 9 : 3}px 6px;font-size:${fontSize ?? '9.5px'};line-height:1.4;${minWidth ? `min-width:${minWidth}px;` : ''}`)}>
      {headers.map((h, i) => <Cell key={`h${i}`} c={h} header sticky={stickyFirstCol && i === 0} onNav={onNav} />)}
      {rows.map((row, ri) =>
        Array.isArray(row)
          ? (
            <Fragment key={ri}>
              {row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} sticky={stickyFirstCol && ci === 0} onNav={onNav} />)}
              {dividers && ri !== lastIdx && <div style={ST_ROW_DIVIDER} />}
            </Fragment>
          )
          : <div key={`s${ri}`} style={ST_SECTION_LABEL}>{row.section}</div>
      )}
    </div>
  )
  return scroll ? <div style={s(SCROLL_X)}>{grid}</div> : grid
}
