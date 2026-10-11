'use client'
// ── Case Triage swimlane chart ───────────────────────────────────────────────
// Renders a `LaneChart` (src/lib/caseTriage/buildLanes.ts) as one CSS grid:
// four stage lanes plus the diagnosis column, a header row, then one row per
// differential. Layering, back to front:
//   1. lane stripes — one full-height tinted block per lane column
//   2. row arrows   — a line from the centre of the row's first finding lane
//                     to the diagnosis column, arrowhead at the end
//   3. boxes        — findings (spanning rows when merged) and diagnoses
// Boxes are opaque, so the arrow reads as passing "through" each finding on
// its row, the way the published swimlane figures draw it. The grid needs
// ~5 readable columns, so it scrolls horizontally inside its own container on
// a phone rather than crushing every box to a word per line.

import type { CSSProperties } from 'react'
import { HUE } from '../../lib/signs/tone'
import { LANES, type LaneChart } from '../../lib/caseTriage/buildLanes'
import type { Nav } from './flowHelpers'
import { styleStringToObject as s } from './style'

const COLS = LANES.length + 1
const PAD = 6 // horizontal padding per cell; columns have no gap so arrows run unbroken

const finding = HUE.info
const box = (rgb: string): string =>
  `background:var(--navy);background-image:linear-gradient(rgba(${rgb},var(--tile-bg-a)),rgba(${rgb},var(--tile-bg-a)));`
  + `border:1.5px solid rgba(${rgb},var(--tile-bd-a));border-radius:9px;`

export function CaseLaneChart({ chart, onNav }: { chart: LaneChart; onNav: Nav }) {
  const n = chart.rows.length
  const at = (col: number, row: number, span = 1, colSpan = 1): CSSProperties => ({
    gridColumn: `${col + 1} / span ${colSpan}`,
    gridRow: `${row + 2} / span ${span}`,
  })

  return (
    <div style={s('overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;')}>
      <div
        style={{
          ...s('display:grid;row-gap:10px;min-width:640px;position:relative;'),
          gridTemplateColumns: `repeat(${LANES.length}, minmax(0,1fr)) minmax(0,1.15fr)`,
          gridTemplateRows: `auto repeat(${n}, auto)`,
        }}
      >
        {/* 1 · lane stripes (alternate tint, like the published figures) */}
        {LANES.map((l, i) => (
          <div
            key={`stripe-${l.key}`}
            aria-hidden="true"
            style={{
              gridColumn: `${i + 1}`, gridRow: `1 / ${n + 2}`,
              ...s(`margin:0 2px;border-radius:10px;background:rgba(var(--tone-slate),${i % 2 ? 0.1 : 0.05});`),
            }}
          />
        ))}

        {/* header row — chevrons, reading direction left → right */}
        {[...LANES.map(l => l.label), 'Differential'].map((label, i) => (
          <div key={label} style={{ gridColumn: `${i + 1}`, gridRow: '1', ...s(`padding:0 ${PAD - 4}px;z-index:2;`) }}>
            <div
              style={s(
                'background:var(--gray2);color:var(--navy);font-size:var(--fs-chip);font-weight:800;letter-spacing:.03em;'
                + 'text-align:center;padding:7px 14px;line-height:1.2;'
                + (i < COLS - 1
                  ? 'clip-path:polygon(0 0,calc(100% - 9px) 0,100% 50%,calc(100% - 9px) 100%,0 100%,9px 50%);'
                  : 'clip-path:polygon(0 0,100% 0,100% 100%,0 100%,9px 50%);'),
              )}
            >
              {label}
            </div>
          </div>
        ))}

        {/* 2 · row arrows: centre of first finding lane → diagnosis column */}
        {chart.arrowFrom.map((from, r) => from === null ? null : (
          <div key={`arrow-${r}`} aria-hidden="true" style={{ ...at(from, r, 1, LANES.length - from), ...s('position:relative;z-index:1;') }}>
            <div
              style={{
                ...s('position:absolute;top:50%;right:0;border-top:1.5px solid var(--gray2);opacity:.75;'),
                left: `calc(100% / ${LANES.length - from} / 2)`,
              }}
            />
            <div style={s('position:absolute;top:50%;right:-1px;transform:translateY(-50%);width:0;height:0;border-left:7px solid var(--gray2);border-top:4.5px solid transparent;border-bottom:4.5px solid transparent;opacity:.75;')} />
          </div>
        ))}

        {/* 3a · finding boxes */}
        {LANES.map((l, i) => chart.cells[l.key].map(c => (
          <div
            key={`${l.key}-${c.row}`}
            style={{ ...at(i, c.row, c.span), ...s(`padding:0 ${PAD}px;z-index:2;display:flex;align-items:${c.span > 1 ? 'stretch' : 'center'};`) }}
          >
            <div
              style={s(
                `${box(finding.rgb)}color:${finding.color};width:100%;padding:7px 8px;font-size:var(--fs-box);font-weight:600;`
                + 'line-height:1.35;text-align:center;display:flex;align-items:center;justify-content:center;overflow-wrap:break-word;hyphens:auto;',
              )}
            >
              {c.text}
            </div>
          </div>
        )))}

        {/* 3b · diagnosis boxes */}
        {chart.rows.map((row, r) => {
          const h = HUE[row.tone]
          return (
            <div key={row.id} style={{ ...at(LANES.length, r), ...s(`padding:0 0 0 ${PAD}px;z-index:2;display:flex;align-items:center;`) }}>
              <button
                type="button"
                onClick={() => onNav({ kind: 'disease', id: row.id })}
                style={s(
                  `${box(h.rgb)}border-width:2px;color:${h.color};width:100%;padding:7px 9px;text-align:left;cursor:pointer;font-family:inherit;`,
                )}
              >
                <div style={s('font-size:var(--fs-chip-sub);font-weight:700;letter-spacing:.05em;text-transform:uppercase;opacity:.75;')}>{row.category}</div>
                <div style={s('font-size:var(--fs-subhead);font-weight:700;line-height:1.3;margin-top:1px;')}>{row.name} ›</div>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
