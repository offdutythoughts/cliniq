// ── Neurological localisation table (shared data) ───────────────────────────
// One source for the spinal-cord localisation grid, used by BOTH the Clinical
// flow page (`flows/myelopathy` → `kind:'table'`) and the Diagnostic exam tab
// (`dx/myelopathy` → `kind:'gridTable'`). They render through the same
// GridTable component, so sharing the rows keeps the two pages identical
// instead of letting them drift into two differently-coloured tables.

import type { TableCell, TableRow } from './flowTypes'

// Inline state colouring: deficient / reduced / absent findings read red,
// increased / spastic findings read green. Whole-cell states use the cell
// `tone`; these spans colour a single token in a mixed cell.
const red = (t: string) => `<span style="color:var(--tone-danger-fg)">${t}</span>`
const grn = (t: string) => `<span style="color:var(--tone-green-fg)">${t}</span>`

/** Label column sizes to its content; the five segment columns share the rest. */
export const NEURO_LOC_COLS = 'auto repeat(5, 1fr)'
export const NEURO_LOC_MIN_WIDTH = 560

export const NEURO_LOC_HEADERS: TableCell[] = [
  'Finding',
  { text: 'C1–C5', tone: 'green' },
  { text: 'C6–T2', tone: 'indigo' },
  { text: 'T3–L3', tone: 'warning' },
  { text: 'L4–S3', tone: 'violet' },
  { text: 'S2–Ca5', tone: 'purple' },
]

export const NEURO_LOC_ROWS: TableRow[] = [
  { section: 'General & Gait' },
  ['Pain location', 'Cervical low head · stiff neck', 'Caudal cervical / thoracic inlet', 'Thoracolumbar kyphosis', 'Lumbosacral pain', 'Lumbosacral / perineal pain'],
  ['Gait', 'Tetraparesis (all 4 limbs)', 'Tetraparesis (FL worse)', 'HL paraparesis', 'Paraparesis / monoparesis (HL)', 'Paraparesis (HL + tail)'],
  { section: 'CP & Muscle Tone' },
  ['Forelimb CP', { text: 'Deficient', tone: 'danger' }, { text: 'Deficient', tone: 'danger' }, 'Normal', 'Normal', 'Normal'],
  ['Hindlimb CP', { text: 'Deficient', tone: 'danger' }, { text: 'Deficient', tone: 'danger' }, { text: 'Deficient', tone: 'danger' }, { text: 'Deficient', tone: 'danger' }, { text: 'Deficient', tone: 'danger' }],
  ['FL tone', { text: 'UMN spastic / ↑', tone: 'green' }, { text: 'LMN flaccid · atrophy', tone: 'danger' }, 'Normal', 'Normal', 'Normal'],
  ['HL tone', { text: 'UMN spastic / ↑', tone: 'green' }, { text: 'UMN spastic / ↑', tone: 'green' }, { text: 'UMN spastic / ↑', tone: 'green' }, { text: 'LMN flaccid / ↓', tone: 'danger' }, { text: 'LMN flaccid / ↓', tone: 'danger' }],
  { section: 'Spinal Reflexes' },
  ['Biceps (C6–C8)', `${grn('↑')} / Normal`, { text: '↓ / Absent', tone: 'danger' }, 'Normal', 'Normal', 'Normal'],
  ['Triceps (C7–T1)', `${grn('↑')} / Normal`, { text: '↓ / Absent', tone: 'danger' }, 'Normal', 'Normal', 'Normal'],
  ['FL withdrawal', `${grn('↑')} / Normal`, { text: '↓ / Absent', tone: 'danger' }, 'Normal', 'Normal', 'Normal'],
  ['Patellar (L3–L4)', `${grn('↑')} / Normal`, `${grn('↑')} / Normal`, `${grn('↑')} / Normal`, { text: '↓ / Absent', tone: 'danger' }, 'Normal'],
  ['HL withdrawal', `${grn('↑')} / Normal`, `${grn('↑')} / Normal`, `${grn('↑')} / Normal`, { text: '↓ / Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }],
  ['Perineal / anal', 'Normal', 'Normal', 'Normal', { text: '↓ / Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }],
  { section: 'Special Tests' },
  ['Cutaneous trunci', 'Present bilateral', `${red('↓/absent')} if C8–T1`, `${red('Absent')} caudal (cutoff ≈1–2 segs)`, 'Normal', 'Normal'],
  ["Horner's", 'Normal', 'Present (T1–T3)', 'Normal', 'Normal', 'Normal'],
  ['Schiff-Sherrington', 'Normal', 'Normal', '± FL ext · HL paralysis (severe)', 'Normal', 'Normal'],
  ['Bladder', `UMN ${grn('spastic')} · large`, `UMN ${grn('spastic')}`, `UMN ${grn('spastic')} · reflexic`, `LMN ${red('flaccid')} · easy`, `LMN ${red('flaccid')} · easy`],
  ['Tail tone', 'Normal', 'Normal', 'Normal', { text: '↓ reduced', tone: 'danger' }, { text: 'Flaccid', tone: 'danger' }],
]
