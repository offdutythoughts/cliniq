// ── Vestibular localisation table (shared data) ─────────────────────────────
// One source for the peripheral / central / bilateral comparison grid, used by
// BOTH the Clinical flow page (`flows/vestibular` → `kind:'table'`) and the
// Diagnostic exam tab (`dx/vestibular` → `kind:'gridTable'`). Same reason as
// ./neuroLocalisation: they render through the same GridTable component, and
// hand-maintaining two copies had already let them drift — the dx copy had
// gained a nystagmus-rate row the flow copy lacked, while the flow copy's
// head-tilt cell named the flocculonodular lobe and the dx copy did not. The
// rows below are the union of the two, so nothing was dropped in the merge.

import type { TableCell, TableRow } from './flowTypes'

/** Label column sizes to its content; the three arms share the rest. */
export const VEST_LOC_COLS = '1fr 1.4fr 1.4fr 1.4fr'

export const VEST_LOC_HEADERS: TableCell[] = [
  '',
  { text: 'Peripheral', tone: 'green' },
  { text: 'Central', tone: 'danger' },
  { text: 'Bilateral', tone: 'warning' },
]

export const VEST_LOC_ROWS: TableRow[] = [
  [
    'Mentation',
    { text: 'Alert / normal', tone: 'green' },
    { text: 'Often depressed / obtunded', tone: 'danger' },
    { text: 'Alert / normal', tone: 'warning' },
  ],
  [
    'Nystagmus type',
    { text: 'Horizontal or rotary only', tone: 'green' },
    { text: 'Any type incl. vertical', tone: 'danger' },
    { text: 'Absent', tone: 'warning' },
  ],
  [
    'Nystagmus direction',
    { text: '<strong>Fixed</strong> — does not change with head position', tone: 'green' },
    { text: 'May be <strong>direction-changing</strong> or disconjugate', tone: 'danger' },
    { text: '—', tone: 'warning' },
  ],
  [
    'Nystagmus <strong>fast phase</strong>',
    { text: 'Beats <strong>AWAY from the lesion</strong> — slow phase drifts toward it, with the head tilt; sides the lesion', tone: 'green' },
    { text: 'May beat <strong>toward OR away</strong> — cannot be used to side the lesion', tone: 'danger' },
    { text: '—', tone: 'warning' },
  ],
  [
    'Nystagmus rate',
    { text: '&gt;66 beats/min — 95% specific, 85% sensitive for peripheral', tone: 'green' },
    { text: 'Usually slower; rate not discriminating', tone: 'danger' },
    { text: '—', tone: 'warning' },
  ],
  [
    'CP deficits <em>(most reliable localiser)</em>',
    { text: '✗ ABSENT', tone: 'green' },
    { text: '✓ PRESENT', tone: 'danger' },
    { text: 'Variable', tone: 'warning' },
  ],
  [
    'Head tilt',
    { text: 'Present (toward lesion)', tone: 'green' },
    { text: 'Toward lesion, OR paradoxical — <strong>away</strong> = cerebellar (flocculonodular lobe)', tone: 'danger' },
    { text: '✗ ABSENT', tone: 'warning' },
  ],
  [
    'Other CN deficits',
    { text: "± Horner's · ± CN VII only", tone: 'green' },
    { text: 'Multiple CN V–XII', tone: 'danger' },
    { text: 'Bilateral ventrolateral strabismus', tone: 'warning' },
  ],
  [
    'VOR',
    { text: 'Intact', tone: 'green' },
    { text: 'May be impaired', tone: 'danger' },
    { text: 'Absent bilaterally', tone: 'warning' },
  ],
  [
    'Gait',
    { text: 'Rolling/falling toward lesion; ataxic', tone: 'green' },
    { text: 'Ataxia ± hemiparesis', tone: 'danger' },
    { text: 'Wide-based; side-to-side sway; crouching', tone: 'warning' },
  ],
]
