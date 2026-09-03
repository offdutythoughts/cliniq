// ── Ataxia classification table (shared data) ───────────────────────────────
// One source for the cerebellar / vestibular / proprioceptive discriminator
// grid, used by BOTH the Clinical flow page (`flows/ataxia` → `kind:'table'`)
// and the Diagnostic exam tab (`dx/ataxia` → `kind:'gridTable'`). Same reason
// as ./neuroLocalisation and ./vestibularLocalisation.
//
// The three-way split had been authored three times and had already lost a
// fact: the flow page said vestibular paresis was "Only if CENTRAL", the exam
// tab said "± only if central", and the dx-tab classification table omitted
// paresis altogether — the one axis the whole sign turns on. The rows below are
// the union of the flow and exam copies.
//
// NOT shared with the dx tab's "CLASSIFY ATAXIA TYPE" table: that one answers a
// different question (type → which imaging and which tests), so it is a
// workup table that happens to share a column header, not a second copy of
// these discriminators.

import type { TableCell, TableRow } from './flowTypes'

/** Label column sizes to its content; the three types share the rest. */
export const ATAXIA_COLS = '0.55fr 1fr 1fr 1fr'

export const ATAXIA_HEADERS: TableCell[] = [
  '',
  { text: 'Cerebellar', tone: 'info' },
  { text: 'Vestibular', tone: 'warning' },
  { text: 'Proprioceptive', tone: 'danger' },
]

export const ATAXIA_ROWS: TableRow[] = [
  [
    '<strong>Gait</strong>',
    { text: 'Hypermetria (dysmetria) · wide-based stance', tone: 'info' },
    { text: 'Falls, leans, rolls or circles tightly <strong>to one side</strong>', tone: 'warning' },
    { text: 'Knuckling · crossing over · scuffing toes · delayed CP placing', tone: 'danger' },
  ],
  [
    '<strong>Head</strong>',
    { text: '—', dim: true },
    { text: 'Head tilt · nystagmus until proven otherwise — fast phase beats <strong>away</strong> from the lesion if peripheral, either way if central', tone: 'warning' },
    { text: '—', dim: true },
  ],
  [
    '<strong>Tremor</strong>',
    { text: 'Intention tremor · truncal sway', tone: 'info' },
    { text: '—', dim: true },
    { text: '—', dim: true },
  ],
  [
    '<strong>Paresis</strong><br>CP deficits',
    { text: '✗ NONE — the cerebellum <em>coordinates</em> movement, it does not initiate it', tone: 'info' },
    { text: '± only if CENTRAL', tone: 'warning' },
    { text: '✓ ALWAYS — weakness <strong>and</strong> incoordination together', tone: 'danger' },
  ],
  [
    '<strong>Mentation</strong>',
    { text: 'Normal', tone: 'info' },
    { text: '± ↓ if central', tone: 'warning' },
    { text: 'Normal', tone: 'danger' },
  ],
  [
    '<strong>Localises to</strong>',
    { text: 'Cerebellum', tone: 'info' },
    { text: 'Inner ear, or brainstem / cerebellum', tone: 'warning' },
    { text: 'Spinal cord', tone: 'danger' },
  ],
]
