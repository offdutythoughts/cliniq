'use client'
// IRIS CKD staging tables for the Chronic Kidney Disease disease page — spliced
// into the Diagnostic Investigation card via the {{IRIS_CKD_TABLE}} marker in
// the DIS-SEC-CKD `conf` field. Three tables highlight what differs across the
// scheme: stage (creatinine + SDMA, dog vs cat), proteinuria substage (UPC),
// and blood-pressure substage. Values per IRIS 2023 (Ettinger Ch 301); SDMA in
// µg/dL per project convention. Styling mirrors <InjuryGradingTable>.

import { Fragment } from 'react'
import { styleStringToObject as s, SCROLL_X } from './style'

const GREEN = 'var(--tone-green-fg)'
const AMBER = 'var(--tone-warning-fg)'
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
const tdStage = (color: string) => s(`padding:8px 5px;font-size:8.5px;font-weight:700;color:${color};border-bottom:1px solid ${BORDER};text-align:left;white-space:nowrap;`)

/** Creatinine cell: mg/dL prominent, µmol/L dimmed on the line below. */
function Cr({ v, u }: { v: string; u: string }) {
  return <>{v}<br /><span style={DIM}>{u}</span></>
}

type StageRow = { stage: string; sev: string; color: string; crDog: [string, string]; crCat: [string, string]; sdmaDog: string; sdmaCat: string }
const STAGES: StageRow[] = [
  { stage: 'Stage I', sev: 'Non-azotaemic', color: GREEN, crDog: ['<1.4', '<125'], crCat: ['<1.6', '<140'], sdmaDog: '<18', sdmaCat: '<18' },
  { stage: 'Stage II', sev: 'Mild', color: 'var(--white)', crDog: ['1.4–2.8', '125–250'], crCat: ['1.6–2.8', '140–250'], sdmaDog: '18–35', sdmaCat: '18–25' },
  { stage: 'Stage III', sev: 'Moderate', color: AMBER, crDog: ['2.9–5.0', '251–440'], crCat: ['2.9–5.0', '251–440'], sdmaDog: '36–54', sdmaCat: '26–38' },
  { stage: 'Stage IV', sev: 'Severe', color: RED, crDog: ['>5.0', '>440'], crCat: ['>5.0', '>440'], sdmaDog: '>54', sdmaCat: '>38' },
]

type UpcRow = { sub: string; dog: string; cat: string }
const UPC: UpcRow[] = [
  { sub: 'Non-proteinuric (NP)', dog: '<0.2', cat: '<0.2' },
  { sub: 'Borderline (BP)', dog: '0.2–0.5', cat: '0.2–0.4' },
  { sub: 'Proteinuric (P)', dog: '>0.5', cat: '>0.4' },
]

type BpRow = { cat: string; sbp: string; risk: string; color: string }
const BP: BpRow[] = [
  { cat: 'Normotensive', sbp: '<140', risk: 'Minimal', color: GREEN },
  { cat: 'Prehypertensive', sbp: '140–159', risk: 'Low', color: 'var(--gray)' },
  { cat: 'Hypertensive', sbp: '160–179', risk: 'Moderate', color: AMBER },
  { cat: 'Severely hypertensive', sbp: '≥180', risk: 'High', color: RED },
]

export function IrisCkdStagingTable() {
  return (
    <Fragment>
      <div style={LABEL}>IRIS CKD Stage</div>
      <div style={SCROLL}>
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={th('left')}>Stage</th>
              <th style={th()}>Creatinine — Dog<br /><span style={DIM}>mg/dL (µmol/L)</span></th>
              <th style={th()}>Creatinine — Cat<br /><span style={DIM}>mg/dL (µmol/L)</span></th>
              <th style={th()}>SDMA — Dog<br /><span style={DIM}>µg/dL</span></th>
              <th style={th()}>SDMA — Cat<br /><span style={DIM}>µg/dL</span></th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map(r => (
              <tr key={r.stage}>
                <td style={tdStage(r.color)}>{r.stage}<br /><span style={DIM}>{r.sev}</span></td>
                <td style={td(r.color)}><Cr v={r.crDog[0]} u={`(${r.crDog[1]})`} /></td>
                <td style={td(r.color)}><Cr v={r.crCat[0]} u={`(${r.crCat[1]})`} /></td>
                <td style={td(r.color)}>{r.sdmaDog}</td>
                <td style={td(r.color)}>{r.sdmaCat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={LABEL}>Proteinuria substage (UPC)</div>
      <div style={SCROLL}>
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={th('left')}>Substage</th>
              <th style={th()}>Dog</th>
              <th style={th()}>Cat</th>
            </tr>
          </thead>
          <tbody>
            {UPC.map(r => (
              <tr key={r.sub}>
                <td style={tdStage('var(--white)')}>{r.sub}</td>
                <td style={td()}>{r.dog}</td>
                <td style={td()}>{r.cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={LABEL}>Blood-pressure substage</div>
      <div style={SCROLL}>
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={th('left')}>Category</th>
              <th style={th()}>Systolic (mmHg)</th>
              <th style={th()}>Target-organ-damage risk</th>
            </tr>
          </thead>
          <tbody>
            {BP.map(r => (
              <tr key={r.cat}>
                <td style={tdStage(r.color)}>{r.cat}</td>
                <td style={td(r.color)}>{r.sbp}</td>
                <td style={td(r.color)}>{r.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={FOOT}>
        Stage on ≥2 fasting, well-hydrated serum creatinine values weeks apart. Reduced muscle
        mass (sarcopenia) lowers creatinine relative to true GFR — SDMA can up-stage these cases.
        (IRIS 2023; Ettinger Ch 301)
      </div>
    </Fragment>
  )
}
