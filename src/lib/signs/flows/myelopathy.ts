// ── Acute Myelopathy / Spinal-cord-localisation flowchart (data) ────────────
// Source (inline render…() function in cliniqApp.ts):
//   renderMyelopathyFlow  → entry ('myelopathy')   [+ its helper injuryGradingTable()]
// Dx views (renderDxMyelopathy / …History / …Exam / …Dx) are OUT OF SCOPE.
//
// This page has no sub-flows. The only interactive elements are the four
// lesion-database nav tiles (goLesionTab → 'lesion' links): LOC-MY-CERV,
// LOC-MY-TL, LOC-MY-L4S3, LOC-MY-CONUS.
//
// ⚠️ FLAG — almost the entire body is an `html` escape-hatch block, NOT typed:
//   • The three reference tables (5-region neurological-localisation table,
//     injury-grading table, thoracolumbar recovery-% table) all use per-COLUMN
//     coloured headers (each header its own colour + coloured bottom border),
//     a colspan section-divider row pattern ("General & Gait", "CP & Muscle
//     Tone", "Spinal Reflexes", "Special Tests"), alternating row backgrounds
//     and — critically — a PINK column (#F472B6, S2–Ca5) and a custom-purple
//     column (#C084FC, L4–S3) for which NO `Tone` exists. The typed `table`
//     block renders all headers with one uncoloured style, has no colspan/
//     section-row support, no row-stripe support, and can only colour a cell
//     via a closed-enum `tone` → it would visibly degrade these clinical
//     colour-codings (colour encodes UMN/LMN region — clinically meaningful).
//   • The "Perform head-to-tail neurological examination" step contains a
//     <strong> run and a custom left-aligned style; the typed `node` step
//     esc()apes its text and forces centre alignment → cannot reproduce.
//   • The deep-pain-perception alert box has a 10px title + var(--gray) body
//     text; the typed `callout` uses an 11px title and colours the body in the
//     tone colour → cannot reproduce.
//   • The four nav tiles include the pink/custom-purple colours above.
// To stay byte-identical AND visually indistinguishable, the body is built by
// replicating the legacy HTML generators verbatim (so the rendered string is
// identical to renderMyelopathyFlow's). The four `lesion` links therefore live
// inside the html block and are NOT covered by the automated link-integrity
// test — all four locs (LOC-MY-CERV/-TL/-L4S3/-CONUS) are confirmed present in
// cliniqApp.ts (the lesion registry). New block(s) that would help: see REPORT.

import type { FlowPage } from '../flowTypes'

// ── Legacy table generators (verbatim from cliniqApp.ts) ────────────────────
const th = (txt: string, col: string): string =>
  `<th style="padding:7px 6px;font-size:9px;font-weight:700;color:${col};border-bottom:2px solid ${col};text-align:center;white-space:nowrap;">${txt}</th>`
const td = (txt: string, col?: string): string =>
  `<td style="padding:7px 6px;font-size:9px;color:${col || 'var(--gray)'};text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${txt}</td>`
const tr = (label: string, ...cells: string[]): string =>
  `<tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">${label}</td>${cells.join('')}</tr>`
const C1 = '#6EE7B7'
const C6 = '#A5B4FC'
const T3 = '#FCD34D'
const N = (c?: string): string => td('Normal', c || 'var(--gray)')
const UP = (c?: string): string => td('↑ / Normal', c)
const DOWN = (c?: string): string => td('↓ / Absent', c)

// injuryGradingTable() — verbatim from cliniqApp.ts
function injuryGradingTable(): string {
  const gth = (t: string, c: string): string =>
    `<th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:${c};border-bottom:1.5px solid ${c};text-align:center;white-space:nowrap;">${t}</th>`
  const GT3 = '#FCD34D'
  const GC1 = '#6EE7B7'
  const row = (
    g: number, gc: string, desc: string, tl: string, tlc: string,
    cerv: string, cervc: string, alt: boolean,
  ): string => `
    <tr${alt ? ' style="background:rgba(255,255,255,0.02);"' : ''}>
      <td style="padding:5px 5px;text-align:center;font-weight:700;color:${gc};border-bottom:1px solid rgba(148,163,184,0.1);">${g}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${gc};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${desc}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${tlc || 'var(--gray)'};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${tl}</td>
      <td style="padding:5px 5px;font-size:8.5px;color:${cervc || 'var(--gray)'};border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">${cerv}</td>
    </tr>`
  return `
  <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;margin-top:8px;">Injury Grading</div>
  <div style="overflow-x:auto;width:100%;margin-bottom:8px;">
  <table style="width:100%;border-collapse:collapse;font-size:8.5px;min-width:360px;">
    <thead>
      <tr>
        <th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:center;width:28px;">Grade</th>
        <th style="padding:5px 5px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:left;min-width:120px;">Description</th>
        ${gth('Thoracolumbar', GT3)}
        ${gth('Cervical', GC1)}
      </tr>
    </thead>
    <tbody>
      ${row(1, 'var(--white)', 'Pain only; neurologically intact', 'Spinal pain; normal neurologic function', 'var(--gray)', 'Spinal pain; normal neurologic function', 'var(--gray)', false)}
      ${row(2, 'var(--white)', 'Ambulatory paresis; CP deficits ± ataxia', 'Ambulatory paraparesis + HL ataxia', 'var(--gray)', 'Ambulatory tetraparesis + tetra-ataxia', 'var(--gray)', true)}
      ${row(3, GT3, 'Non-ambulatory paresis; voluntary movement present', 'Non-ambulatory paraparesis', GT3, 'Non-ambulatory tetraparesis', GT3, false)}
      ${row(4, '#FB923C', 'Paralysis; DPP intact', 'Paraplegia; intact pain perception', '#FB923C', 'Tetraplegia; normal ventilation', '#FB923C', true)}
      ${row(5, '#F87171', 'Paralysis; DPP <strong>absent</strong>', 'Paraplegia; <strong>absent</strong> DPP in HLs + tail', '#F87171', 'Tetraplegia; <strong>hypoventilation</strong>', '#F87171', false)}
    </tbody>
  </table>
  </div>`
}

// The full inner body of the legacy .flow-wrap, after the entry node —
// reproduced verbatim from renderMyelopathyFlow (cliniqApp.ts).
const myelopathyBody = `
    <div class="flow-arrow-v">↓</div>
    <div class="flow-node step" style="font-size:10.5px;text-align:left;line-height:1.7;">
      Perform <strong>head-to-tail</strong> neurological examination · compare findings to table below to localise lesion
      <div class="fn-sub" style="font-weight:400;margin-top:3px;">Assess in order: mentation → pain on palpation → gait → postural reactions → spinal reflexes → special tests</div>
    </div>
    <div class="flow-arrow-v">↓</div>

    <!-- Neurological localisation table: all 5 regions -->
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">Neurological Localisation</div>
    <div style="overflow-x:auto;width:100%;">
    <table style="border-collapse:collapse;font-size:8.5px;min-width:560px;">
      <thead>
        <tr>
          <th style="padding:6px 5px;font-size:8.5px;font-weight:700;color:var(--gray);border-bottom:2px solid rgba(148,163,184,0.3);text-align:left;min-width:90px;">Finding</th>
          ${th('C1–C5', C1)}
          ${th('C6–T2', C6)}
          ${th('T3–L3', T3)}
          ${th('L4–S3', '#C084FC')}
          ${th('S2–Ca5', `#F472B6`)}
        </tr>
      </thead>
      <tbody>
        <tr><td colspan="6" style="padding:4px 5px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">General &amp; Gait</td></tr>
        ${tr('Pain', td('Cervical<br>low head · stiff neck', C1), td('Caudal cervical /<br>thoracic inlet', C6), td('Thoracolumbar<br>kyphosis', T3), td('Lumbosacral<br>pain', '#C084FC'), td('Lumbosacral /<br>perineal pain', '#F472B6'))}
        ${tr('Gait', td('Tetraparesis<br>(all 4 limbs)', C1), td('Tetraparesis<br>(FL worse)', C6), td('Paraparesis<br>(HL; FL normal)', T3), td('Paraparesis /<br>monoparesis (HL)', '#C084FC'), td('Paraparesis<br>(HL + tail)', '#F472B6'))}

        <tr><td colspan="6" style="padding:4px 5px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">CP &amp; Muscle Tone</td></tr>
        ${tr('Forelimb CP', td('Deficient', C1), td('Deficient', C6), N(), N(), N())}
        ${tr('Hindlimb CP', td('Deficient', C1), td('Deficient', C6), td('Deficient', T3), td('Deficient', '#C084FC'), td('Deficient', '#F472B6'))}
        ${tr('FL tone', td('UMN<br>spastic / ↑', C1), td('LMN<br>flaccid · atrophy', C6), N(), N(), N())}
        ${tr('HL tone', td('UMN<br>spastic / ↑', C1), td('UMN<br>spastic / ↑', C6), td('UMN<br>spastic / ↑', T3), td('LMN<br>flaccid / ↓', '#C084FC'), td('LMN<br>flaccid / ↓', '#F472B6'))}

        <tr><td colspan="6" style="padding:4px 5px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">Spinal Reflexes</td></tr>
        ${tr('Biceps (C6–C8)', UP(C1), DOWN(C6), N(), N(), N())}
        ${tr('Triceps (C7–T1)', UP(C1), DOWN(C6), N(), N(), N())}
        ${tr('FL withdrawal', UP(C1), DOWN(C6), N(), N(), N())}
        ${tr('Patellar (L3–L4)', UP(C1), UP(C6), UP(T3), DOWN('#C084FC'), N('#F472B6'))}
        ${tr('HL withdrawal', UP(C1), UP(C6), UP(T3), DOWN('#C084FC'), td('Absent', '#F472B6'))}
        ${tr('Perineal / anal', N(C1), N(C6), N(T3), DOWN('#C084FC'), td('Absent', '#F472B6'))}

        <tr><td colspan="6" style="padding:4px 5px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">Special Tests</td></tr>
        ${tr('Cutaneous trunci', td('Present bilateral', C1), td('↓/absent if C8–T1', C6), td('Absent caudal<br>(cutoff ≈1–2 segs)', T3), N(), N())}
        ${tr("Horner's", N(C1), td('Present<br>(T1–T3)', C6), N(T3), N(), N())}
        ${tr('Schiff-Sherrington', N(C1), N(C6), td('± FL ext · HL<br>paralysis (severe)', T3), N(), N())}
        ${tr('Bladder', td('UMN<br>spastic · large', C1), td('UMN<br>spastic', C6), td('UMN<br>spastic · reflexic', T3), td('LMN<br>flaccid · easy', `#C084FC`), td('LMN<br>flaccid · easy', '#F472B6'))}
        ${tr('Tail tone', N(C1), N(C6), N(T3), td('↓ reduced', '#C084FC'), td('Flaccid', '#F472B6'))}
      </tbody>
    </table>
    </div>

    ${injuryGradingTable()}

    <div style="margin-top:10px;padding:9px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ DEEP PAIN PERCEPTION — most important prognostic indicator</div>
      <div style="font-size:9.5px;line-height:1.6;color:var(--gray);">
        Test by applying firm pressure to digit with haemostat (separate from withdrawal — look for conscious response: turning head, vocalisation, behavioural change).<br>
        <strong style="color:var(--white);">DPP absent:</strong> Thoracolumbar &lt;48 h → 50–60% recovery with decompression; &gt;48 h → poor prognosis (myelomalacia risk). Grade 5 IVDE (IVDD type III): 10–13% risk of progressive myelomalacia (fatal).
      </div>
    </div>

    <!-- Recovery % table (TL injuries) -->
    <div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-top:10px;margin-bottom:4px;">Recovery of Function — Thoracolumbar (% ambulatory)</div>
    <div style="overflow-x:auto;width:100%;margin-bottom:8px;">
    <table style="width:100%;border-collapse:collapse;font-size:8.5px;">
      <thead>
        <tr>
          <th style="padding:5px 4px;font-size:8.5px;font-weight:700;color:var(--gray2);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:center;">Grade</th>
          <th style="padding:5px 4px;font-size:8.5px;font-weight:700;color:#FCD34D;border-bottom:1.5px solid rgba(252,211,77,0.4);text-align:center;">IVDE (IVDD type III) Surgical</th>
          <th style="padding:5px 4px;font-size:8.5px;font-weight:700;color:var(--gray);border-bottom:1.5px solid rgba(148,163,184,0.3);text-align:center;">IVDE (IVDD type III) Medical</th>
          <th style="padding:5px 4px;font-size:8.5px;font-weight:700;color:#6EE7B7;border-bottom:1.5px solid rgba(110,231,183,0.4);text-align:center;">ANNPE</th>
          <th style="padding:5px 4px;font-size:8.5px;font-weight:700;color:#A5B4FC;border-bottom:1.5px solid rgba(165,180,252,0.4);text-align:center;">FCE</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="padding:5px 4px;text-align:center;font-weight:700;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);">2</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">95–100%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">75%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">100%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">100%</td></tr>
        <tr style="background:rgba(255,255,255,0.02);"><td style="padding:5px 4px;text-align:center;font-weight:700;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);">3</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">95–100%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">75%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">100%</td><td style="padding:5px 4px;text-align:center;color:#6EE7B7;border-bottom:1px solid rgba(148,163,184,0.1);">100%</td></tr>
        <tr><td style="padding:5px 4px;text-align:center;font-weight:700;color:#FCD34D;border-bottom:1px solid rgba(148,163,184,0.1);">4</td><td style="padding:5px 4px;text-align:center;color:#FCD34D;border-bottom:1px solid rgba(148,163,184,0.1);">&gt;90%</td><td style="padding:5px 4px;text-align:center;color:#FCD34D;border-bottom:1px solid rgba(148,163,184,0.1);">50%</td><td style="padding:5px 4px;text-align:center;color:#FCD34D;border-bottom:1px solid rgba(148,163,184,0.1);">56%*</td><td style="padding:5px 4px;text-align:center;color:#FCD34D;border-bottom:1px solid rgba(148,163,184,0.1);">70%*</td></tr>
        <tr style="background:rgba(255,255,255,0.02);"><td style="padding:5px 4px;text-align:center;font-weight:700;color:#F87171;border-bottom:1px solid rgba(148,163,184,0.1);">5</td><td style="padding:5px 4px;text-align:center;color:#F87171;border-bottom:1px solid rgba(148,163,184,0.1);">58%†</td><td style="padding:5px 4px;text-align:center;color:#F87171;border-bottom:1px solid rgba(148,163,184,0.1);">&lt;10%</td><td style="padding:5px 4px;text-align:center;color:#F87171;border-bottom:1px solid rgba(148,163,184,0.1);">&lt;10%</td><td style="padding:5px 4px;text-align:center;color:#F87171;border-bottom:1px solid rgba(148,163,184,0.1);">10%</td></tr>
      </tbody>
    </table>
    <div style="font-size:8px;color:var(--gray2);line-height:1.5;margin-top:3px;">*Partial urinary/faecal incontinence may persist. †Increases to 69% including recovery without pain perception.</div>
    </div>

    <div class="flow-arrow-v">↓</div>
    <div class="flow-node step" style="font-size:11px;">NAVIGATE TO LESION DATABASE</div>
    <div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
      <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-MY-CERV','Cervical')">Cervical (C1–T2)<div class="fn-sub">Tetraparesis</div></div>
      <div class="flow-node rest" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-MY-TL','Thoracolumbar')">Thoracolumbar (T3–L3)<div class="fn-sub">Paraparesis</div></div>
      <div class="flow-node" style="cursor:pointer;font-size:11px;background:rgba(192,132,252,0.12);border:1.5px solid rgba(192,132,252,0.4);border-radius:10px;padding:10px;text-align:center;color:#C084FC;" onclick="goLesionTab('LOC-MY-L4S3','L4–S3')">L4–S3<div class="fn-sub" style="color:rgba(192,132,252,0.7);">LMN paraparesis</div></div>
      <div class="flow-node" style="cursor:pointer;font-size:11px;background:rgba(244,114,182,0.12);border:1.5px solid rgba(244,114,182,0.4);border-radius:10px;padding:10px;text-align:center;color:#F472B6;" onclick="goLesionTab('LOC-MY-CONUS','S2–Ca5')">S2–Ca5 (conus)<div class="fn-sub" style="color:rgba(244,114,182,0.7);">Cauda equina</div></div>
    </div>
`

const myelopathyEntry: FlowPage = {
  id: 'myelopathy',
  title: 'Acute Myelopathy',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🦴 ACUTE MYELOPATHY — NEUROLOGICAL LOCALISATION' },
    // ⚠️ FLAG: escape-hatch — see header note. Holds the exam step, the three
    // colour-coded reference tables, the deep-pain alert and the four nav tiles
    // (lesion links live here, unvalidated by the link-integrity test).
    { kind: 'html', html: myelopathyBody },
    { kind: 'disclaimer' },
  ],
}

export const myelopathyFlows: FlowPage[] = [myelopathyEntry]
