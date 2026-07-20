'use client'
// IRIS AKI grading table for the Acute Kidney Injury disease page — spliced into
// the Diagnostic Investigation card via the {{IRIS_AKI_TABLE}} marker in the
// DIS-SEC-AKI `conf` field. Grade I–V by serum creatinine with severity/clinical
// features. Values per IRIS AKI grading (Ettinger Ch 300, Table 300.1). Styling
// mirrors <InjuryGradingTable> / <IrisCkdStagingTable>.

import { Fragment } from 'react'
import { styleStringToObject as s, SCROLL_X } from './style'

const GREEN = 'var(--tone-green-fg)'
const AMBER = 'var(--tone-warning-fg)'
const ORANGE = 'var(--hl-orange)'
const RED = 'var(--tone-danger-fg)'

const BORDER = 'rgba(var(--slate-muted),0.2)'
const HEAD_BORDER = 'rgba(var(--slate-muted),0.35)'

const LABEL = s('font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;margin-top:10px;')
const SCROLL = s(SCROLL_X + 'margin-bottom:4px;')
const TABLE = s('width:100%;border-collapse:collapse;font-size:8.5px;min-width:340px;')
const FOOT = s('font-size:8.5px;opacity:.75;line-height:1.5;margin-top:2px;')
const DIM = s('opacity:.6;')

const th = (align = 'center') => s(`padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid ${HEAD_BORDER};text-align:${align};white-space:nowrap;`)
const td = (color = 'var(--gray)', align = 'center') => s(`padding:8px 5px;font-size:8.5px;color:${color};border-bottom:1px solid ${BORDER};text-align:${align};line-height:1.4;`)
const tdGrade = (color: string) => s(`padding:8px 5px;font-size:8.5px;font-weight:700;color:${color};border-bottom:1px solid ${BORDER};text-align:left;white-space:nowrap;`)

/** Creatinine cell: mg/dL prominent, µmol/L dimmed on the line below. */
function Cr({ v, u }: { v: string; u: string }) {
  return <>{v}<br /><span style={DIM}>{u}</span></>
}

type Row = { grade: string; color: string; cr: [string, string]; sev: string; note?: string }
const ROWS: Row[] = [
  { grade: 'Grade I', color: GREEN, cr: ['<1.6', '<140'], sev: 'Non-azotaemic', note: '↑Cr ≥0.3 mg/dL (≥26.4 µmol/L) in 48 h, or ≥6 h oligoanuria' },
  { grade: 'Grade II', color: 'var(--white)', cr: ['1.7–2.5', '141–220'], sev: 'Mild' },
  { grade: 'Grade III', color: AMBER, cr: ['2.6–5.0', '221–439'], sev: 'Moderate–severe' },
  { grade: 'Grade IV', color: ORANGE, cr: ['5.1–10', '440–880'], sev: 'Severe' },
  { grade: 'Grade V', color: RED, cr: ['>10', '>880'], sev: 'Severe' },
]

export function IrisAkiGradingTable() {
  return (
    <Fragment>
      <div style={LABEL}>IRIS AKI Grade</div>
      <div style={SCROLL}>
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={th('left')}>Grade</th>
              <th style={th()}>Serum creatinine<br /><span style={DIM}>mg/dL (µmol/L)</span></th>
              <th style={th('left')}>Severity / features</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.grade}>
                <td style={tdGrade(r.color)}>{r.grade}</td>
                <td style={td(r.color)}><Cr v={r.cr[0]} u={`(${r.cr[1]})`} /></td>
                <td style={td(r.color, 'left')}>{r.sev}{r.note && <><br /><span style={DIM}>{r.note}</span></>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={FOOT}>
        Each grade is sub-graded by urine output (non-oligoanuric vs oligoanuric) and need for
        renal replacement therapy. Conversion: mg/dL × 88 ≈ µmol/L. (IRIS AKI grading; Ettinger Ch 300)
      </div>
    </Fragment>
  )
}
