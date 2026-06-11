// ── Pale Mucous Membranes flowchart (data) ──────────────────────────────────
// Migration of the inline renderPaleGumsFlow + renderPaleFlowRegen /
// renderPaleFlowNonRegen / renderPaleFlowPreRegen / renderPaleFlowShock /
// renderPaleFlowCardiac functions (src/lib/cliniqApp.ts) to the FlowPage model.
//
// The entry page's branch is bespoke: a 3fr/2fr split with `insp`/`mixed`
// pattern-class column headers and horizontal endpoint grids inside each
// column (not the vertical-stack `branch`/`endpoints` blocks), plus two
// reference boxes (one tinted-red, one `--card`/`--border` neutral) that don't
// map cleanly to typed blocks → kept as `html`. The five sub-flow cause grids
// are category columns → `categoryGrid`. The Regen / Pre-Regen pearl boxes →
// `callout`.

import type { FlowPage } from '../flowTypes'

// ── Entry ───────────────────────────────────────────────────────────────────
const paleGumsEntry: FlowPage = {
  id: 'pale-mm',
  title: 'Pale Mucous Membranes',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🩸 PALE MUCOUS MEMBRANES' },
    {
      kind: 'node',
      variant: 'step',
      text: 'IDENTIFY LESION CATEGORY',
      sub: 'CHECK PCV · TS · CRT · Heart rate',
    },
    {
      // Bespoke 3fr/2fr branch with insp/mixed pattern-class headers and
      // horizontal endpoint grids → not reproducible with branch/endpoints.
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:10px;width:100%;">

      <!-- ANAEMIA branch -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node insp" style="width:100%;font-size:11px;font-weight:700;">Anaemia<div class="fn-sub" style="font-weight:400;">Low PCV · check reticulocytes + smear</div></div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;width:100%;">
          <div class="flow-endpoint" style="background:rgba(16,185,129,0.1);border:1.5px solid rgba(16,185,129,0.4);color:var(--tone-green-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('pale-mm-regen')">
            Regenerative anaemia ⚠️
          </div>
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('pale-mm-non-regen')">
            Non-regenerative anaemia
          </div>
          <div class="flow-endpoint" style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.35);color:var(--tone-warning-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('pale-mm-pre-regen')">
            Pre-regenerative anaemia (&lt;3–5 days)
          </div>
        </div>
      </div>

      <!-- POOR PERFUSION branch -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node mixed" style="width:100%;font-size:11px;font-weight:700;">Poor perfusion<div class="fn-sub" style="font-weight:400;">Normal PCV · prolonged CRT · weak pulses</div></div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%;">
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('pale-mm-shock')">
            Hypovolaemic / distributive / cardiogenic shock ⚠️
          </div>
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('pale-mm-cardiac')">
            Acute cardiac failure / pericardial effusion ⚠️
          </div>
        </div>
      </div>

    </div>`,
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 12,
      title: '⚠️ Transfusion thresholds',
      html:
        '<div style="font-size:11px;color:var(--tone-danger-fg);line-height:1.65;">' +
        '<strong>Dog:</strong> PCV &lt;20% · <strong>Cat:</strong> PCV &lt;15%' +
        '</div>',
    },
    {
      // Neutral box uses --card/--border/--gray2/--gray, not a tone rgba → html.
      kind: 'html',
      html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:12px;">
    <div style="font-size:11px;font-weight:600;color:var(--gray2);margin-bottom:4px;">💡 PCV/TS quick guide</div>
    <div style="font-size:11px;color:var(--gray);line-height:1.65;">
      <strong style="color:var(--white);">Low PCV + Normal TS</strong> = haemolysis<br>
      <strong style="color:var(--white);">Low PCV + Low TS</strong> = haemorrhage (TS drop takes hours)<br>
      <strong style="color:var(--white);">Normal PCV + Pale</strong> = poor perfusion / shock
    </div>
  </div>`,
    },
    { kind: 'disclaimer' },
  ],
}

// ── Regenerative anaemia ─────────────────────────────────────────────────────
const paleGumsRegen: FlowPage = {
  id: 'pale-mm-regen',
  title: 'Pale MM — Regenerative Anaemia',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'green', text: '🩸 PALE MM — REGENERATIVE ANAEMIA' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Active bone marrow response — reticulocytosis present',
      sub: 'Reticulocytes >60,000/µL (dog) / >50,000/µL (cat) · macrocytosis · polychromasia',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        { cat: 'Immune-mediated', tiles: [{ label: 'IMHA', link: { to: 'disease', id: 'DIS-BD-IMHA' } }] },
        { cat: 'Inflammatory', tiles: [{ label: 'Babesia / Mycoplasma / Haemobartonella' }] },
        { cat: 'Toxic', tiles: [{ label: 'Zinc · Allium · Paracetamol' }] },
        { cat: 'Vascular', tiles: [{ label: 'Acute haemorrhage' }] },
        { cat: 'Trauma', tiles: [{ label: 'Traumatic haemorrhage' }] },
        { cat: 'Anomalous', tiles: [{ label: 'PK def / PFK def' }] },
      ],
    },
    {
      kind: 'callout',
      tone: 'green',
      gap: 10,
      html: '<strong style="color:var(--tone-green-fg);">Pearl:</strong> Low PCV + normal TS = haemolysis; Low PCV + low TS = haemorrhage',
    },
    { kind: 'disclaimer' },
  ],
}

// ── Non-regenerative anaemia ─────────────────────────────────────────────────
const paleGumsNonRegen: FlowPage = {
  id: 'pale-mm-non-regen',
  title: 'Pale MM — Non-Regenerative Anaemia',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '🩸 PALE MM — NON-REGENERATIVE ANAEMIA' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Bone marrow failure to respond — reticulocytes absent or low',
      sub: 'Normocytic normochromic · reticulocytes <60,000/µL · bone marrow aspirate often required',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        {
          cat: 'Metabolic / Endocrine', tiles: [
            { label: 'CKD (↓ EPO)' },
            { label: 'Hypothyroidism' },
            { label: 'Hypoadrenocorticism' },
          ],
        },
        { cat: 'Inflammatory', tiles: [{ label: 'Anaemia of chronic disease' }] },
        { cat: 'Immune-mediated', tiles: [{ label: 'PRCA / immune-mediated' }] },
        { cat: 'Mass', tiles: [{ label: 'BM infiltration' }] },
        { cat: 'Toxic', tiles: [{ label: 'Drug / oestrogen aplasia' }] },
        { cat: 'Anomalous', tiles: [{ label: 'Aplastic anaemia' }] },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── Pre-regenerative anaemia ─────────────────────────────────────────────────
const paleGumsPreRegen: FlowPage = {
  id: 'pale-mm-pre-regen',
  title: 'Pale MM — Pre-Regenerative Anaemia',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: '🩸 PALE MM — PRE-REGENERATIVE ANAEMIA (<3–5 days)' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Acute onset — reticulocyte response not yet detectable',
      sub: 'Reticulocyte response takes 3–5 days (dog) / 4–7 days (cat) · repeat CBC at 5–7 days to reassess',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        { cat: 'Immune-mediated', tiles: [{ label: 'Acute IMHA (early)', link: { to: 'disease', id: 'DIS-BD-IMHA' } }] },
        { cat: 'Vascular', tiles: [{ label: 'Acute haemorrhage (early)' }] },
        { cat: 'Inflammatory', tiles: [{ label: 'Acute infectious haemolysis' }] },
        { cat: 'Toxic', tiles: [{ label: 'Acute toxic haemolysis' }] },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 10,
      html: '<strong style="color:var(--tone-warning-fg);">Key point:</strong> Any cause of regenerative anaemia may appear non-regenerative in the first 3–5 days. Always repeat CBC at 5–7 days before concluding non-regenerative.',
    },
    { kind: 'disclaimer' },
  ],
}

// ── Shock / poor perfusion ───────────────────────────────────────────────────
const paleGumsShock: FlowPage = {
  id: 'pale-mm-shock',
  title: 'Pale MM — Shock / Poor Perfusion',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚠️ PALE MM — SHOCK / POOR PERFUSION' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Normal PCV · prolonged CRT · weak rapid pulses · cold extremities',
      sub: 'Emergency — IV access immediately · crystalloid bolus 10–20 mL/kg over 15 min · reassess',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        { cat: 'Vascular', tiles: [{ label: 'Hypovolaemic shock' }] },
        { cat: 'Inflammatory', tiles: [{ label: 'Distributive / septic shock' }] },
        { cat: 'Trauma', tiles: [{ label: 'Traumatic shock' }] },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── Cardiac failure ──────────────────────────────────────────────────────────
const paleGumsCardiac: FlowPage = {
  id: 'pale-mm-cardiac',
  title: 'Pale MM — Cardiac Failure',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚠️ PALE MM — CARDIAC FAILURE' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Reduced cardiac output → poor peripheral perfusion',
      sub: 'Normal PCV · muffled heart sounds · arrhythmia · coughing / respiratory distress',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        { cat: 'Degenerative', tiles: [{ label: 'DCM (dog)' }, { label: 'HCM (cat)' }] },
        { cat: 'Vascular', tiles: [{ label: 'Pericardial effusion / tamponade' }] },
        { cat: 'Anomalous', tiles: [{ label: 'Congenital defects' }] },
        { cat: 'Mass', tiles: [{ label: 'Cardiac neoplasia' }] },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

export const paleGumsFlows: FlowPage[] = [
  paleGumsEntry,
  paleGumsRegen,
  paleGumsNonRegen,
  paleGumsPreRegen,
  paleGumsShock,
  paleGumsCardiac,
]
