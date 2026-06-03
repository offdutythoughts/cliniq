// ── Dyspnoea flowchart (data) ───────────────────────────────────────────────
// Migration of the inline renderDyspFlow (entry) + renderInsp + renderRest
// sub-flows in src/lib/cliniqApp.ts to the FlowPage model. The diagnostic-
// approach views (renderDxDyspnoea*) are out of scope.
//
// The entry's 4-pattern tile grid + 4-arrow row + 4-column sub-branch is a
// single bespoke grid layout that does not map cleanly to choices/branch:
//  - three of the four pattern tiles call sub-flow handlers that DO NOT EXIST
//    anywhere (renderExpFlow / renderRestFlow / renderMixedFlow) — pre-existing
//    broken links, preserved verbatim via the html escape-hatch (see report).
//  - the sub-branch columns have irregular nested 2-col Stertor/Stridor sub-
//    grids with no matching typed block.
// So that middle section is kept as one `html` block (byte-identical markup).
// The Inspiratory tile routes to the data sub-flow via renderFlowId('dyspnoea-insp').
//
// Sub-flows: 'dyspnoea-insp' (reachable via the entry's Inspiratory tile) and
// 'dyspnoea-rest' (NOT reachable from the entry — the Restrictive tile's legacy
// onclick called the non-existent renderRestFlow; preserved as a known-broken
// link). Both are authored in the legacy `.fn` system → 'fn' layout
// (fnHeader + cardGrid + .fn-arrow).

import type { FlowPage } from '../flowTypes'

// ── Entry flowchart (4-pattern split) ───────────────────────────────────────
const dyspnoeaEntry: FlowPage = {
  id: 'dyspnoea',
  title: 'Dyspnoea',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🌬️ DYSPNOEA' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY RESPIRATORY PATTERN', connectAfter: false },

    {
      // Bespoke middle section: leading arrow + 4-pattern tile grid + 4-arrow
      // row + 4-column sub-branch. Three pattern tiles call non-existent
      // handlers (renderExpFlow/renderRestFlow/renderMixedFlow) — preserved
      // verbatim. The endpoint goLesionTab onclicks all resolve.
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <!-- 4 pattern columns -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;">
      <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="renderFlowId('dyspnoea-insp')">🔵 Inspiratory<br><span style="font-size:9px;opacity:.7">tap ↓</span></div>
      <div class="flow-node exp" style="cursor:pointer;font-size:11px;" onclick="renderExpFlow()">🟢 Expiratory<br><span style="font-size:9px;opacity:.7">± wheeze ± cough</span></div>
      <div class="flow-node rest" style="cursor:pointer;font-size:11px;" onclick="renderRestFlow()">🟡 Restrictive<br><span style="font-size:9px;opacity:.7">rapid, shallow · muffled sounds</span></div>
      <div class="flow-node mixed" style="cursor:pointer;font-size:11px;" onclick="renderMixedFlow()">🔴 Mixed<br><span style="font-size:9px;opacity:.7">both phases</span></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;margin-top:3px;">
      <div class="flow-arrow-v">↓</div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-arrow-v">↓</div>
    </div>

    <!-- Inspiratory sub-branch -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;">
      <div>
        <div class="flow-node sub-step" style="font-size:10px;margin-bottom:3px;">Characterise sound</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
          <div>
            <div style="font-size:9px;color:var(--gray2);text-align:center;margin-bottom:2px;">Stertor</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-endpoint nasal" onclick="goLesionTab('LOC-NASAL','Nasal cavity / Nasopharynx')">
              Nasal cavity / Nasopharynx
            </div>
          </div>
          <div>
            <div style="font-size:9px;color:var(--gray2);text-align:center;margin-bottom:2px;">Stridor</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-endpoint larynx" onclick="goLesionTab('LOC-LARYNX','Larynx / Cervical trachea')">
              Larynx / Cervical trachea
            </div>
          </div>
        </div>
      </div>

      <!-- Expiratory -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Body system: Intrathoracic</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint bronchi" onclick="goLesionTab('LOC-BRONCHI','Trachea / Bronchi')">
          Trachea / Bronchi
        </div>
      </div>

      <!-- Restrictive -->
      <div>
        <div class="flow-node sub-step" style="font-size:10px;margin-bottom:3px;">Auscultation</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
          <div>
            <div style="font-size:9px;color:var(--gray2);text-align:center;margin-bottom:2px;">Reduced sounds</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-endpoint pleural" onclick="goLesionTab('LOC-PLEURAL','Pleural cavity')">
              Pleural cavity
            </div>
          </div>
          <div>
            <div style="font-size:9px;color:var(--gray2);text-align:center;margin-bottom:2px;">Normal sounds</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-endpoint mechanic" onclick="goLesionTab('LOC-MECHANIC','Neuromuscular / Chest wall / Diaphragm')">
              Neuromuscular / Chest wall
            </div>
          </div>
        </div>
      </div>

      <!-- Mixed -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Crackles ± wheezes</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint parench" onclick="goLesionTab('LOC-PARENCH','Lung parenchyma')">
          Lung parenchyma
        </div>
      </div>
    </div>`,
    },

    {
      kind: 'banner',
      tone: 'info',
      html: 'Tap the coloured location words to open Diagnostic types',
    },

    {
      // 🐱 Cat-specific differentials: purple box, title + 2x2 grid of tinted
      // sub-cards + footnote. No typed block reproduces a 4-cell tinted-subcard
      // grid (cardSection is a vertical stack with no footnote) → html escape-
      // hatch, matching the redEye CONJUNCTIVAL/EPISCLERAL precedent. FLAGGED.
      kind: 'html',
      html: `<div style="margin-top:14px;padding:10px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
      <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:8px;">🐱 CAT — KEY DIFFERENTIALS BY PATTERN</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
          <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">🟡 Restrictive (rapid, shallow)</div>
          Pleural effusion (CHF/HCM, pyothorax, chylothorax, neoplasia, FIP)<br>
          Cranial mediastinal mass — check compressibility<br>
          Pneumothorax
        </div>
        <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
          <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">🟢 Expiratory / wheeze</div>
          Feline asthma / bronchitis<br>
          Lungworm (<em>Aelurostrongylus</em>)<br>
          Bronchopneumonia
        </div>
        <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
          <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">🔴 Mixed / crackles</div>
          Cardiogenic pulmonary oedema (HCM → LA ↑ → backpressure)<br>
          Pneumonia (bacterial, viral)<br>
          Non-cardiogenic oedema (toxin, trauma)
        </div>
        <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
          <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">🔵 Inspiratory / stertor</div>
          Nasopharyngeal polyp — stertor ± Horner's<br>
          Viral URTI (herpes / calici)<br>
          Nasopharyngeal stenosis
        </div>
      </div>
      <div style="margin-top:7px;font-size:9.5px;line-height:1.6;color:rgba(196,181,253,.8);">
        ⚠️ <strong style="color:#C4B5FD;">Open-mouth breathing in a cat = SEVERE</strong> — cats are obligate nasal breathers. Any open-mouth breathing → immediate O₂ + minimal handling.<br>
        ⚠️ <strong style="color:#C4B5FD;">Pleural effusion in cats is usually bilateral.</strong> Non-compressible cranial mediastinum = mass until proven otherwise.<br>
        ⚠️ <strong style="color:#C4B5FD;">ATE:</strong> Acute limb paresis/pain + cold limbs + respiratory distress → HCM + aortic thromboembolism.
      </div>
    </div>`,
    },

    {
      // Stabilisation reminder: danger-tinted info box, no title.
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      html: '<strong style="color:#F87171;">⚡ EMERGENCY PRIORITY:</strong> O₂ → minimal restraint → POCUS (pleural effusion?) → thoracocentesis if indicated → <em>then</em> radiographs. Do NOT delay thoracocentesis to get CXR in a severely dyspnoeic cat.',
    },
  ],
}

// ── Sub-flow: Inspiratory Dyspnoea (fn layout, from renderInsp) ──────────────
const dyspnoeaInsp: FlowPage = {
  id: 'dyspnoea-insp',
  title: 'Inspiratory',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'insp', text: '🔵 INSPIRATORY DYSPNOEA' },
    { kind: 'fnHeader', variant: 'step', text: 'CHARACTERISE SOUND' },
    {
      kind: 'cardGrid',
      tiles: [
        { anat: 'nasal', sys: 'Sound: Stertor', loc: 'Nasal cavity / Nasopharynx', link: { to: 'lesion', loc: 'LOC-NASAL', name: 'Nasal cavity / Nasopharynx' } },
        { anat: 'larynx', sys: 'Sound: Stridor', loc: 'Larynx / Cervical trachea', link: { to: 'lesion', loc: 'LOC-LARYNX', name: 'Larynx / Cervical trachea' } },
      ],
    },
  ],
}

// ── Sub-flow: Restrictive Pattern (fn layout, from renderRest) ──────────────
// NOTE: not reachable from the entry — the Restrictive tile calls the non-
// existent renderRestFlow. Migrated for completeness (renderRest exists).
const dyspnoeaRest: FlowPage = {
  id: 'dyspnoea-rest',
  title: 'Restrictive',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'rest', text: '🟡 RESTRICTIVE PATTERN — rapid, shallow' },
    { kind: 'fnHeader', variant: 'step', text: 'AUSCULTATION + PERCUSSION' },
    {
      kind: 'cardGrid',
      tiles: [
        { anat: 'pleural', sys: 'Muffled / absent lung sounds', loc: 'Pleural cavity', badge: '⚠️ EMERGENCY', link: { to: 'lesion', loc: 'LOC-PLEURAL', name: 'Pleural cavity' } },
        { anat: 'mechanic', sys: 'Normal lung sounds', loc: 'Neuromuscular / Chest wall', link: { to: 'lesion', loc: 'LOC-MECHANIC', name: 'Neuromuscular / Chest wall / Diaphragm' } },
      ],
    },
  ],
}

export const dyspnoeaFlows: FlowPage[] = [dyspnoeaEntry, dyspnoeaInsp, dyspnoeaRest]
