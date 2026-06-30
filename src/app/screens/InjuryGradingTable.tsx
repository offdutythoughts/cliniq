// Static spinal-injury grading table — React port of injuryGradingTable
// (cliniqApp.ts). Included in the Clinical Signs card when a disease sets
// showGradingTable. Row 5 carries <strong> emphasis, rendered as real <strong>.

import { Fragment } from 'react'
import { styleStringToObject as s } from './style'

const T3 = 'var(--tone-warning-fg)'   // grade 3 / thoracolumbar column — dark amber on light, bright on dark
const C1 = 'var(--tone-green-fg)'     // cervical column — dark green on light, bright on dark

const WRAP_LABEL = s('font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;margin-top:8px;')
const SCROLL = s('overflow-x:auto;width:100%;margin-bottom:8px;')
const TABLE = s('width:100%;border-collapse:collapse;font-size:8.5px;min-width:360px;')
const TH_GRADE = s('padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:center;width:28px;')
const TH_DESC = s('padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:left;min-width:120px;')
const th = (color: string) => s(`padding:5px 5px;font-size:8.5px;font-weight:700;color:${color};border-bottom:1.5px solid ${color};text-align:center;white-space:nowrap;`)
const ROW_ALT = s('background:var(--card);')
const tdGrade = (color: string) => s(`padding:5px 5px;text-align:center;font-weight:700;color:${color};border-bottom:1px solid rgba(148,163,184,0.1);`)
const tdCell = (color: string) => s(`padding:5px 5px;font-size:8.5px;color:${color};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;`)

type Row = { g: number; gc: string; desc: React.ReactNode; tl: React.ReactNode; tlc?: string; cerv: React.ReactNode; cervc?: string; alt: boolean }

const ROWS: Row[] = [
  { g: 1, gc: 'var(--white)', desc: 'Pain only; neurologically intact', tl: 'Spinal pain; normal neurologic function', cerv: 'Spinal pain; normal neurologic function', alt: false },
  { g: 2, gc: 'var(--white)', desc: 'Ambulatory paresis; CP deficits ± ataxia', tl: 'Ambulatory paraparesis + HL ataxia', cerv: 'Ambulatory tetraparesis + tetra-ataxia', alt: true },
  { g: 3, gc: T3, desc: 'Non-ambulatory paresis; voluntary movement present', tl: 'Non-ambulatory paraparesis', tlc: T3, cerv: 'Non-ambulatory tetraparesis', cervc: T3, alt: false },
  { g: 4, gc: 'var(--hl-orange)', desc: 'Paralysis; DPP intact', tl: 'Paraplegia; intact pain perception', tlc: 'var(--hl-orange)', cerv: 'Tetraplegia; normal ventilation', cervc: 'var(--hl-orange)', alt: true },
  { g: 5, gc: 'var(--tone-danger-fg)', desc: <>Paralysis; DPP <strong>absent</strong></>, tl: <>Paraplegia; <strong>absent</strong> DPP in HLs + tail</>, tlc: 'var(--tone-danger-fg)', cerv: <>Tetraplegia; <strong>hypoventilation</strong></>, cervc: 'var(--tone-danger-fg)', alt: false },
]

export function InjuryGradingTable() {
  return (
    <Fragment>
      <div style={WRAP_LABEL}>Injury Grading</div>
      <div style={SCROLL}>
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={TH_GRADE}>Grade</th>
              <th style={TH_DESC}>Description</th>
              <th style={th(T3)}>Thoracolumbar</th>
              <th style={th(C1)}>Cervical</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.g} style={r.alt ? ROW_ALT : undefined}>
                <td style={tdGrade(r.gc)}>{r.g}</td>
                <td style={tdCell(r.gc)}>{r.desc}</td>
                <td style={tdCell(r.tlc ?? 'var(--gray)')}>{r.tl}</td>
                <td style={tdCell(r.cervc ?? 'var(--gray)')}>{r.cerv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}
