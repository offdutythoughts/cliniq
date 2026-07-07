// Two-step phenylephrine localisation table for Horner's syndrome — a React
// port of the identical grid in the abnormal-pupil dx Exam tab
// (src/lib/signs/dx/abnormalPupil.ts, "Pharmacological localisation"). Embedded
// in the disease page's Diagnostic Investigation card via the
// {{PHEN_LOCALISE_TABLE}} marker in the Horner's `conf` field, so the disease
// page and the dx tab show the exact same format. Same 2-column grid, 9.5px
// cells, order-colour coding, and footnote as the dx source.

import { Fragment } from 'react'
import { styleStringToObject as s } from './style'

const HEAD = s('font-weight:700;font-size:var(--fs-body);color:var(--white);margin-top:8px;margin-bottom:4px;')
const GRID = s('display:grid;grid-template-columns:1fr 1.1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;')
const TH = s('font-weight:600;')
const FOOT = s('font-size:9.5px;opacity:.75;line-height:1.5;')

const respStyle = (color?: string) => (color ? s(`color:${color};`) : undefined)

type Row = { label: string; resp: string; respColor?: string }
const ROWS: Row[] = [
  { label: 'Step 1 — 1% phenylephrine, both eyes', resp: 'Time to dilation of the affected pupil' },
  { label: '3rd order (postganglionic — denervation hypersensitivity)', resp: 'Dilates in ≤ 20 min with 1% (normal eye does not)', respColor: 'var(--tone-green-fg)' },
  { label: 'Step 2 — if no 1% response → switch to 10% phenylephrine', resp: 'Time to bilateral dilation' },
  { label: '2nd order (preganglionic)', resp: '10% dilates both pupils in 20–40 min', respColor: 'var(--tone-warning-fg)' },
  { label: '1st order (central)', resp: '10% > 40 min (slow / minimal)', respColor: 'var(--tone-danger-fg)' },
]

export function PhenylephrineLocaliseTable() {
  return (
    <Fragment>
      <div style={HEAD}>Pharmacological localisation — two-step phenylephrine protocol:</div>
      <div style={GRID}>
        <div style={TH}>Step / Order</div><div style={TH}>Expected response</div>
        {ROWS.map((r, i) => (
          <Fragment key={i}>
            <div>{r.label}</div>
            <div style={respStyle(r.respColor)}>{r.resp}</div>
          </Fragment>
        ))}
      </div>
      <div style={FOOT}>
        Apply identical drop to contralateral eye and time both — interpret only the time
        difference, not absolute values. Note: if Horner&apos;s has been present &gt;3 weeks,
        postganglionic axonal degeneration can still develop hypersensitivity in 2nd-order
        lesions, blurring the test. Always document concurrent neurological exam.
      </div>
    </Fragment>
  )
}
