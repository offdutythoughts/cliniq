// ── Acute Myelopathy / Spinal-cord-localisation flowchart (data) ────────────
import type { FlowPage } from '../flowTypes'
import { NEURO_LOC_COLS, NEURO_LOC_HEADERS, NEURO_LOC_MIN_WIDTH, NEURO_LOC_ROWS } from '../neuroLocalisation'

const myelopathyEntry: FlowPage = {
  id: 'myelopathy',
  title: 'Acute Myelopathy',
  noCard: true,
  blocks: [
    { kind: 'node', variant: 'entry', text: '🦴 ACUTE MYELOPATHY — NEUROLOGICAL LOCALISATION' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Perform head-to-tail neurological examination',
      sub: 'Assess in order: mentation → pain on palpation → gait → postural reactions → spinal reflexes → special tests',
    },
    {
      kind: 'table',
      scroll: true,
      minWidth: NEURO_LOC_MIN_WIDTH,
      gap: 8,
      title: 'Neurological Localisation',
      cols: NEURO_LOC_COLS,
      headers: NEURO_LOC_HEADERS,
      rows: NEURO_LOC_ROWS,
    },
    {
      kind: 'table',
      scroll: true,
      minWidth: 360,
      gap: 8,
      dividers: true,
      title: 'Injury Grading',
      cols: 'auto auto 1fr 1fr',
      headers: [
        'Grade',
        'Description',
        { text: 'Thoracolumbar', tone: 'warning' },
        { text: 'Cervical', tone: 'green' },
      ],
      rows: [
        ['1', 'Pain only; neurologically intact', 'Spinal pain; normal neurologic function', 'Spinal pain; normal neurologic function'],
        ['2', 'Ambulatory paresis;<br>CP deficits ± ataxia', 'Ambulatory paraparesis + HL ataxia', 'Ambulatory tetraparesis + tetra-ataxia'],
        [{ text: '3', tone: 'warning' }, 'Non-ambulatory paresis;<br>voluntary movement present', 'Non-ambulatory paraparesis', 'Non-ambulatory tetraparesis'],
        [{ text: '4', tone: 'orange' }, 'Paralysis; DPP intact', 'Paraplegia; intact pain perception', 'Tetraplegia; normal ventilation'],
        [{ text: '5', tone: 'danger' }, 'Paralysis; DPP <strong>absent</strong>', 'Paraplegia; <strong>absent</strong> DPP in HLs + tail', 'Tetraplegia; <strong>hypoventilation</strong>'],
      ],
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      connectAfter: false,
      // The box keeps only the TECHNIQUE — what absent DPP means for the patient
      // is prognosis, and lives under the recovery table with the other numbers.
      title: '⚠️ DEEP PAIN PERCEPTION — most important prognostic indicator',
      html: 'Apply firm haemostat pressure to a digit. Withdrawal is a spinal reflex, not perception — look for a <strong>conscious</strong> response: head turn, vocalisation, behavioural change.',
    },
    {
      kind: 'table',
      scroll: true,
      minWidth: 400,
      gap: 8,
      title: 'Recovery of Function — Thoracolumbar (% ambulatory)',
      cols: 'auto 1fr 1fr 1fr 1fr',
      headers: [
        'Grade',
        { text: 'IVDE (IVDD III) Surgical', tone: 'warning' },
        'IVDE (IVDD III) Medical',
        { text: 'ANNPE', tone: 'green' },
        { text: 'FCE', tone: 'indigo' },
      ],
      rows: [
        ['2', '95–100%', '75%', '100%', '100%'],
        ['3', '95–100%', '75%', '100%', '100%'],
        [{ text: '4', tone: 'warning' }, '>90%', '50%', '56%*', '70%*'],
        [{ text: '5', tone: 'danger' }, '58%†', '<10%', '<10%', '10%'],
      ],
      footnote: '*Partial urinary/faecal incontinence may persist. †Increases to 69% including recovery without pain perception. DPP absent, thoracolumbar: 50–60% recover if decompressed within 48 h, poor beyond it; grade 5 IVDE carries a 10–13% risk of progressive (fatal) myelomalacia.',
    },
    { kind: 'node', variant: 'step', text: 'NAVIGATE TO LESION DATABASE' },
    {
      kind: 'categoryGrid',
      columns: [
        { cat: 'Cervical (C1–T2)', tone: 'green', tiles: [{ label: 'Tetraparesis', link: { to: 'lesion', loc: 'LOC-MY-CERV', name: 'Cervical' } }] },
        { cat: 'Thoracolumbar (T3–L3)', tone: 'warning', tiles: [{ label: 'Paraparesis', link: { to: 'lesion', loc: 'LOC-MY-TL', name: 'Thoracolumbar' } }] },
        { cat: 'Lumbosacral (L4–S3)', tone: 'violet', tiles: [{ label: 'LMN paraparesis', link: { to: 'lesion', loc: 'LOC-MY-L4S3', name: 'L4–S3' } }] },
        { cat: 'S2–Ca5 (conus)', tone: 'purple', tiles: [{ label: 'Cauda equina', link: { to: 'lesion', loc: 'LOC-MY-CONUS', name: 'S2–Ca5' } }] },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

export const myelopathyFlows: FlowPage[] = [myelopathyEntry]
