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
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

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
// Same haemolysis differential as the paleGums regenerative-anaemia page →
// authored as a typed `categoryColumns` (was a broken `html` grid that crammed
// 5 categories into repeat(3,1fr) and pointed clickable chips at the wrong
// lesion detail `LES-PM-REGEN`). Chips now link to their own disease pages;
// multi-disease chips use `links`; causes with no page are `terminal` (muted).
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
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        { cat: 'Immune-mediated', tiles: [{ label: 'IMHA', link: { to: 'disease', id: 'DIS-BD-IMHA' } }] },
        { cat: 'Inflammatory', tiles: [
          { label: 'Babesiosis', link: { to: 'disease', id: 'DIS-BD-BABS' } },
          { label: 'Haemotropic Mycoplasma', link: { to: 'disease', id: 'DIS-INFECT-HMYCO' } },
        ] },
        { cat: 'Toxic', tiles: [
          { label: 'Zinc toxicosis', link: { to: 'disease', id: 'DIS-TOX-ZN' } },
          { label: 'Allium toxicosis', link: { to: 'disease', id: 'DIS-TOX-ALLIUM' } },
          { label: 'Paracetamol toxicosis', link: { to: 'disease', id: 'DIS-TOX-APAP' } },
        ] },
        { cat: 'Vascular', tiles: [{ label: 'Body cavity haemorrhage', terminal: true }] },
        { cat: 'Anomalous', tiles: [
          { label: 'PK deficiency', terminal: true },
          { label: 'Neonatal isoerythrolysis', terminal: true },
        ] },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── 3. Hepatic ──────────────────────────────────────────────────────────────
// Each chip links to its own disease page (was all pointing at the single
// generic `LOC-JD-HEP` lesion list). Immune-mediated hepatitis, copper
// hepatopathy and end-stage cirrhosis all resolve to the Chronic Hepatitis
// page (DIS-HEP-CHRONHEP explicitly bundles copper-associated + chronic-active).
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
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Inflammatory', tiles: [
            { label: 'Cholangitis / cholangiohepatitis', link: { to: 'disease', id: 'DIS-HEP-CHOLANGITIS' } },
            { label: 'Chronic / immune-mediated hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Leptospirosis', link: { to: 'disease', id: 'DIS-INFECT-LEPTO' } },
          ],
        },
        {
          cat: 'Metabolic / Endocrine', tiles: [
            { label: 'Hepatic lipidosis', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
            { label: 'Steroid / vacuolar hepatopathy', link: { to: 'disease', id: 'DIS-HEP-VACUOLAR' } },
            { label: 'Copper hepatopathy', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
          ],
        },
        {
          cat: 'Mass', tiles: [
            { label: 'HCC / biliary carcinoma', link: { to: 'disease', id: 'DIS-HEP-NEO' } },
            { label: 'Metastasis / lymphoma', link: { to: 'disease', id: 'DIS-HEP-NEO' } },
          ],
        },
        {
          cat: 'Degenerative', tiles: [
            { label: 'Cirrhosis / end-stage fibrosis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
          ],
        },
        {
          cat: 'Toxic', tiles: [
            { label: 'Drug hepatotoxicity', link: { to: 'disease', id: 'DIS-HEP-TOXIC' } },
          ],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── 4. Post-hepatic (biliary obstruction) ───────────────────────────────────
// Each chip links to its own disease page where one exists (was all pointing at
// the single generic `LOC-JD-POSTHEP` lesion list). Pancreatitis fans out to the
// dog + cat pages via `links`. Causes with no dedicated page (pancreatic /
// duodenal neoplasia, bile-duct rupture, choledochal cyst) are `terminal`
// (tinted but muted). The legacy 'Toxic → Cholecalciferol' entry is dropped:
// cholecalciferol causes hypercalcaemic renal injury, not biliary obstruction.
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
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Degenerative', tiles: [
            { label: 'Biliary mucocele ⚠️', link: { to: 'disease', id: 'DIS-HEP-MUCOCELE' } },
            { label: 'Cholelithiasis', link: { to: 'disease', id: 'DIS-HEP-CHOLELITH' } },
          ],
        },
        {
          cat: 'Inflammatory', tiles: [
            { label: 'Pancreatitis', links: [
              { label: 'Acute pancreatitis (dog)', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
              { label: 'Feline pancreatitis', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            ] },
            { label: 'Ascending cholangitis', link: { to: 'disease', id: 'DIS-HEP-CHOLANGITIS' } },
          ],
        },
        {
          cat: 'Mass', tiles: [
            { label: 'Biliary / GB carcinoma', link: { to: 'disease', id: 'DIS-HEP-NEO' } },
            { label: 'Pancreatic adenocarcinoma', terminal: true },
            { label: 'Duodenal neoplasia', terminal: true },
          ],
        },
        {
          cat: 'Trauma', tiles: [
            { label: 'Bile duct rupture ⚠️', terminal: true },
          ],
        },
        {
          cat: 'Anomalous', tiles: [
            { label: 'Choledochal cyst', terminal: true },
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
