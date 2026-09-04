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
// ORIENTATION: one row per ataxia TYPE, matching the three choice tiles
// directly above it, so the reader picks a tile and reads across. (The
// transposed layout — one row per exam finding, types as columns — tested
// worse: it forces a column-scan to answer the question the box is titled
// with.) Gait / head / tremor / mentation are kept as separate lines inside
// the hallmark cell rather than as their own columns, so no fact is lost.
//
// NOT shared with the dx tab's "CLASSIFY ATAXIA TYPE" table: that one answers a
// different question (type → which imaging and which tests), so it is a
// workup table that happens to share a column header, not a second copy of
// these discriminators.

import type { TableCell, TableRow } from './flowTypes'

/** Type + paresis size to their content; the hallmark column takes the rest. */
export const ATAXIA_COLS = '0.52fr 0.8fr 1.75fr 0.7fr'

export const ATAXIA_HEADERS: TableCell[] = [
  'Type',
  'Paresis / CP deficits',
  'Hallmark',
  'Localises to',
]

export const ATAXIA_ROWS: TableRow[] = [
  [
    { text: 'Cerebellar', tone: 'info' },
    { text: '✗ NONE — the cerebellum <em>coordinates</em> movement, it does not initiate it' },
    {
      text:
        'Hypermetria (dysmetria) · wide-based stance<br>' +
        'Intention tremor · truncal sway<br>' +
        'Mentation normal',
    },
    { text: 'Cerebellum' },
  ],
  [
    { text: 'Vestibular', tone: 'warning' },
    { text: '± only if CENTRAL' },
    {
      text:
        'Asymmetric — falls, leans, rolls or circles tightly <strong>to one side</strong><br>' +
        'Head tilt · nystagmus until proven otherwise — fast phase beats <strong>away</strong> from the lesion if peripheral, either way if central<br>' +
        'Mentation ± ↓ if central',
    },
    { text: 'Inner ear, or brainstem / cerebellum' },
  ],
  [
    { text: 'Proprioceptive', tone: 'danger' },
    { text: '✓ ALWAYS — weakness <strong>and</strong> incoordination together' },
    {
      text:
        'Knuckling · crossing over · scuffing toes · delayed CP placing<br>' +
        'Mentation normal',
    },
    { text: 'Spinal cord' },
  ],
]
