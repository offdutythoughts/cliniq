// ── Acute Myelopathy / Spinal-cord-localisation flowchart (data) ────────────
import type { FlowPage } from '../flowTypes'

// Inline state colouring for the localisation table: deficient / reduced /
// absent findings read red, increased / spastic findings read green. Whole-cell
// states use the cell `tone`; these spans colour a single token in a mixed cell.
const red = (t: string) => `<span style="color:var(--tone-danger-fg)">${t}</span>`
const grn = (t: string) => `<span style="color:var(--tone-green-fg)">${t}</span>`

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
      minWidth: 560,
      gap: 8,
      title: 'Neurological Localisation',
      cols: 'auto repeat(5, 1fr)',
      headers: [
        'Finding',
        { text: 'C1–C5', tone: 'green' },
        { text: 'C6–T2', tone: 'indigo' },
        { text: 'T3–L3', tone: 'warning' },
        { text: 'L4–S3', tone: 'violet' },
        { text: 'S2–Ca5', tone: 'purple' },
      ],
      rows: [
        { section: 'General & Gait' },
        ['Pain', 'Cervical low head · stiff neck', 'Caudal cervical / thoracic inlet', 'Thoracolumbar kyphosis', 'Lumbosacral pain', 'Lumbosacral / perineal pain'],
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
      ],
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
