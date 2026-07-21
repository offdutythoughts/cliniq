// ── Jaundice / Icterus flowchart (data) ─────────────────────────────────────
// Sources (inline render…() functions in cliniqApp.ts):
//   renderJaundiceFlow         → entry ('jaundice')
//   renderJaundiceFlowPreHep   → 'jaundice-pre-hep'
//   renderJaundiceFlowHep      → 'jaundice-hep'
//   renderJaundiceFlowPostHep  → 'jaundice-post-hep'
// The 3 sub-flows are CAT_STYLE category grids (the legacy `col()` generator) →
// `categoryGrid`. Hep/Post-hep chips link via goLesionTab → typed `lesion`
// links. Pre-hep's two clickable chips use renderLesionDetail('LES-PM-REGEN'),
// which has NO typed Link kind → that grid is an `html` block (FLAGGED below).
// The entry's branch is bespoke: the left arm ends in one endpoint, the right
// arm ends in a captioned 2-col endpoint sub-grid that the typed `endpoints`
// (vertical stack) cannot reproduce → that terminal is an `html` block.
// Dx views (renderDxJaundice*) are out of scope.

import type { FlowPage } from '../flowTypes'

// ── 1. Entry ────────────────────────────────────────────────────────────────
const jaundiceEntry: FlowPage = {
  id: 'jaundice',
  title: 'Jaundice',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🟡 JAUNDICE / ICTERUS' },
    {
      kind: 'node',
      variant: 'step',
      text: 'DEFINE MECHANISM — Pre-hepatic, Hepatic or Post-hepatic?',
      sub: 'First key question: haematopoietic vs hepatobiliary?',
    },
    { kind: 'node', variant: 'sub-step', text: 'CHECK: Is there significant anaemia?', connectAfter: false },
    {
      // Bespoke 2-col branch: the left arm ends in one full-width endpoint, the
      // right arm ends in a captioned 2-col endpoint sub-grid. Neither the
      // column-header styling (red/amber 0.12/0.35 + fn-sub) nor the captioned
      // sub-grid maps to branch/endpoints → kept as `html` (cf. paleGums entry).
      // The two sub-flow links use renderFlowId(...) directly in onclick.
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <!-- Pre-hepatic branch -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node" style="width:100%;background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:11px;">YES — significant anaemia<div class="fn-sub" style="font-size:9px;opacity:.7">PCV markedly reduced</div></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">PRE-HEPATIC<br>Haemolytic jaundice<br>Bilirubin production overwhelmed</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint pleural" onclick="renderFlowId('jaundice-pre-hep')" style="width:100%;font-size:10px;cursor:pointer;">
          Haemolytic causes →
        </div>
      </div>

      <!-- Hepatic / post-hepatic branch -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node" style="width:100%;background:rgba(217,119,6,0.12);border-color:rgba(217,119,6,0.35);color:var(--amber-text);font-size:11px;">NO / mild anaemia<div class="fn-sub" style="font-size:9px;opacity:.7">Hepatobiliary cause</div></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">HEPATIC or POST-HEPATIC?<br>Ultrasound: dilated bile ducts?</div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <div>
            <div style="font-size:8px;color:var(--amber-text);text-align:center;margin-bottom:2px;">Normal bile ducts</div>
            <div class="flow-endpoint gi-secondary" onclick="renderFlowId('jaundice-hep')" style="font-size:9px;cursor:pointer;">
              Hepatic causes →
            </div>
          </div>
          <div>
            <div style="font-size:8px;color:var(--tone-danger-fg);text-align:center;margin-bottom:2px;">Dilated bile ducts</div>
            <div class="flow-endpoint pleural" onclick="renderFlowId('jaundice-post-hep')" style="font-size:9px;cursor:pointer;">
              Post-hepatic causes →
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:10px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:9px 12px;font-size:10px;color:var(--gray);width:100%;">
      <b style="color:var(--white);">Key point:</b> Bilirubinuria in <b>cats is ALWAYS pathological</b>. Pre-hepatic jaundice ALWAYS has significant anaemia. Distinguish hepatic from post-hepatic using abdominal ultrasound (bile duct dilation).
    </div>`,
    },
  ],
}

// ── 2. Pre-hepatic (haemolytic) ─────────────────────────────────────────────
// Category grid as `html`: the two clickable chips use renderLesionDetail(),
// which has no typed Link kind (see flag in REPORT). Header labels / chip text
// / arrows / colours are transcribed verbatim from the legacy `col()` output.
const jaundicePreHep: FlowPage = {
  id: 'jaundice-pre-hep',
  title: 'Jaundice — Pre-hepatic',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '🟡 JAUNDICE — PRE-HEPATIC (Haemolytic)' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Excess bilirubin from RBC destruction overwhelms hepatic conjugation capacity',
      sub: 'Significant anaemia · regenerative · bilirubinuria · haemoglobinaemia',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY', connectAfter: false },
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(59,130,246,0.15);border:1.5px solid rgba(59,130,246,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-info-fg);text-align:center;line-height:1.3;">Immune-mediated</div><div style="color:var(--tone-info-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(59,130,246,0.15);border:1.5px solid rgba(59,130,246,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-info-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderLesionDetail('LES-PM-REGEN')">IMHA</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-warning-fg);text-align:center;line-height:1.3;">Inflammatory</div><div style="color:var(--tone-warning-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-warning-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderLesionDetail('LES-PM-REGEN')">Babesia / Mycoplasma</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--hl-orange);text-align:center;line-height:1.3;">Toxic</div><div style="color:var(--hl-orange);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-orange);text-align:center;line-height:1.35;">Zinc · Allium · Paracetamol</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-danger-fg);text-align:center;line-height:1.3;">Vascular</div><div style="color:var(--tone-danger-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;">Body cavity haemorrhage</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--hl-pink);text-align:center;line-height:1.3;">Anomalous</div><div style="color:var(--hl-pink);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-pink);text-align:center;line-height:1.35;">PK deficiency · Neonatal isoerythrolysis</div></div>
    </div>`,
    },
    { kind: 'disclaimer' },
  ],
}

// ── 3. Hepatic ──────────────────────────────────────────────────────────────
// CAT_STYLE → tone: I→warning, ME→teal, M→violet, D→slate, Tx→orange.
// All chips link goLesionTab('LOC-JD-HEP','Hepatic') → typed `lesion` links.
const jaundiceHep: FlowPage = {
  id: 'jaundice-hep',
  title: 'Jaundice — Hepatic',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: '🟡 JAUNDICE — HEPATIC' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Hepatocyte dysfunction → impaired bilirubin uptake, conjugation, and/or excretion',
      sub: 'Normal to mildly dilated bile ducts on US · elevated ALT + ALP · ± coagulopathy',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Inflammatory', tiles: [
            { label: 'Acute hepatitis (infectious)', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
            { label: 'Immune-mediated hepatitis', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
            { label: 'Cholangitis / cholangiohepatitis', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
          ],
        },
        {
          cat: 'Metabolic / Endocrine', tiles: [
            { label: 'Hepatic lipidosis', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
            { label: 'Steroid hepatopathy', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
            { label: 'Copper hepatopathy', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
          ],
        },
        {
          cat: 'Mass', tiles: [
            { label: 'HCC / biliary carcinoma', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
            { label: 'Metastasis / lymphoma', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
          ],
        },
        {
          cat: 'Degenerative', tiles: [
            { label: 'Cirrhosis / end-stage fibrosis', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
          ],
        },
        {
          cat: 'Toxic', tiles: [
            { label: 'Drug hepatotoxicity', link: { to: 'lesion', loc: 'LOC-JD-HEP', name: 'Hepatic' } },
          ],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── 4. Post-hepatic (biliary obstruction) ───────────────────────────────────
// CAT_STYLE → tone: D→slate, I→warning, M→violet, Tr→slate, A→(pink→purple,
// FLAGGED), Tx→orange. All chips link
// goLesionTab('LOC-JD-POSTHEP','Post-hepatic (biliary obstruction)').
const jaundicePostHep: FlowPage = {
  id: 'jaundice-post-hep',
  title: 'Jaundice — Post-hepatic',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '🟡 JAUNDICE — POST-HEPATIC (Biliary Obstruction)' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Obstruction to bile flow → conjugated bilirubin reflux into circulation',
      sub: 'Dilated bile ducts on US · marked ALP elevation · bilirubinuria · pale faeces',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Degenerative', tiles: [
            { label: 'Biliary mucocele ⚠️', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
        {
          cat: 'Inflammatory', tiles: [
            { label: 'Pancreatitis', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
            { label: 'Ascending cholangitis', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
        {
          cat: 'Mass', tiles: [
            { label: 'Biliary / GB carcinoma', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
            { label: 'Pancreatic adenocarcinoma', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
            { label: 'Duodenal neoplasia', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
        {
          cat: 'Trauma', tiles: [
            { label: 'Bile duct rupture ⚠️', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
        {
          // FLAG: legacy 'Anomalous' (A) is pink rgba(236,72,153)/var(--hl-pink) — no
          // pink tone exists in the closed Tone enum; 'purple' is the closest.
          cat: 'Anomalous', tiles: [
            { label: 'Choledochal cyst', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
        {
          cat: 'Toxic', tiles: [
            { label: 'Cholecalciferol toxicosis', link: { to: 'lesion', loc: 'LOC-JD-POSTHEP', name: 'Post-hepatic (biliary obstruction)' } },
          ],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

export const jaundiceFlows: FlowPage[] = [
  jaundiceEntry,
  jaundicePreHep,
  jaundiceHep,
  jaundicePostHep,
]
