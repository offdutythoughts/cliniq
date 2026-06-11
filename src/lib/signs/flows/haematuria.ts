// ── Haematuria flowchart (data) ─────────────────────────────────────────────
// Migration of haematuriaFlowHtml (src/lib/signs/haematuria.ts) plus the inline
// sub-flow render functions in cliniqApp.ts (renderHaematuriaFlowPseudo /
// TrueSystemic / Initial / Terminal / Uniform / Indep) to the FlowPage model.
// The Dx views (haematuriaDx* / renderDxHaematuria*) are a separate tranche and
// are NOT migrated here.
//
// Several screens use bespoke colour palettes (pink var(--hl-pink) genital columns)
// and custom multi-column location-card grids with endpoint background opacity
// 0.06 that have no equivalent standard block; those are reproduced verbatim
// with `html` blocks (see the FLAGs in the migration report).

import type { FlowPage } from '../flowTypes'

// ── Entry ───────────────────────────────────────────────────────────────────
// The centrifuge step feeds a bespoke 2fr/3fr nested YES/NO split (text labels,
// per-column arrows, four custom-toned stream endpoints) that no standard block
// reproduces, so the split is a single `html` block (it includes its own leading
// arrow). The "DO NOT MISS" box maps to `alert`.
const haematuriaEntry: FlowPage = {
  id: 'haematuria',
  title: 'Haematuria',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🩸 HAEMATURIA' },

    {
      kind: 'node',
      variant: 'step',
      text: 'CENTRIFUGE THE URINE — IS THE SUPERNATANT RED?',
      sub: 'Spin 1500 rpm × 5 min · all three (haemoglobinuria, myoglobinuria, pigment) give dipstick +ve blood · only centrifuge separates them',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

  <div style="display:grid;grid-template-columns:2fr 3fr;gap:8px;width:100%;">

    <!-- YES — pseudo-haematuria -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:9px;font-weight:600;color:var(--tone-warning-fg);letter-spacing:.03em;">YES — red supernatant</div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-endpoint" style="background:rgba(245,158,11,0.12);border:1.5px solid rgba(245,158,11,0.4);font-size:10px;font-weight:700;color:var(--tone-warning-fg);cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('haematuria-pseudo')">
        PSEUDO-HAEMATURIA<br>
        <span style="font-size:9px;font-weight:400;opacity:.8;">Red supernatant after spin ›</span>
      </div>
    </div>

    <!-- NO — true haematuria -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:9px;font-weight:600;color:var(--tone-green-fg);letter-spacing:.03em;">NO — red sediment (true haematuria)</div>
      <div class="flow-arrow-v">↓</div>

      <!-- Q2: systemic signs? -->
      <div class="flow-node sub-step" style="width:100%;font-size:10px;">Concurrent systemic signs?
        <div style="font-weight:400;font-size:9px;margin-top:2px;opacity:.85;">Generalised bleeding · petechiae · severe anaemia · jaundice · pyrexia</div>
      </div>
      <div class="flow-arrow-v">↓</div>

      <div style="display:grid;grid-template-columns:1fr 2fr;gap:5px;width:100%;">

        <!-- Q2 YES → systemic true HU -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
          <div style="font-size:9px;font-weight:600;color:var(--tone-danger-fg);">YES</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('haematuria-true-systemic')">
            ⚡ Systemic<br>cause ›<br>
            <span style="opacity:.7;font-size:8px;">Red sediment · intact RBCs</span>
          </div>
        </div>

        <!-- Q2 NO → localise by stream -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
          <div style="font-size:9px;font-weight:600;color:var(--gray2);">NO — localise</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>

          <!-- Q3: when in stream? -->
          <div class="flow-node sub-step" style="width:100%;font-size:9.5px;">WHEN in the stream?</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;width:100%;">
            <div class="flow-endpoint" style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:var(--tone-green-fg);font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('haematuria-initial')">
              START<br>
              <span style="opacity:.75;">Distal urethra · genital · prostate ›</span>
            </div>
            <div class="flow-endpoint" style="background:rgba(99,102,241,0.08);border:1.5px solid rgba(99,102,241,0.3);color:var(--tone-indigo-fg);font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('haematuria-terminal')">
              END<br>
              <span style="opacity:.75;">Bladder neck · trigone · prostate ›</span>
            </div>
            <div class="flow-endpoint" style="background:rgba(37,99,235,0.08);border:1.5px solid rgba(37,99,235,0.3);color:var(--tone-info-fg);font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('haematuria-uniform')">
              THROUGHOUT<br>
              <span style="opacity:.75;">Bladder body · upper UT ›</span>
            </div>
            <div class="flow-endpoint" style="background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.3);color:var(--tone-violet-fg);font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('haematuria-indep')">
              BETWEEN voids<br>
              <span style="opacity:.75;">Genital · prostate · distal ›</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>`,
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ DO NOT MISS',
      items: [
        '<strong>Urethral obstruction</strong> — male cat (FIC + plug), male dog (urolith) → hyperkalaemia within hours',
        '<strong onclick="renderDiseasePage(\'DIS-BD-ROD\')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide</strong> — haematuria can be the presenting sign before generalised bleed',
        '<strong>Older Scottie / WHWT / Beagle bitch + persistent HU</strong> → TCC (CADET BRAF ~85% sensitive)',
        '<strong>HU + ARF + pyrexia</strong> → leptospirosis (PPE — zoonotic) or septic pyelonephritis',
      ],
    },
  ],
}

// ── Pseudo-haematuria ───────────────────────────────────────────────────────
// Three category columns (Hb / Mb / Pg) with chip stacks, custom palette
// (pigmenturia teal var(--tone-teal-fg), myoglobinuria orange var(--hl-orange)). The chip grid +
// KEY WORKUP box have no standard-block equivalent → reproduced as `html`.
const haematuriaPseudo: FlowPage = {
  id: 'haematuria-pseudo',
  title: 'Haematuria — Pseudo-haematuria',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'warning',
      text: 'PSEUDO-HAEMATURIA — Red supernatant after spin',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'Dipstick +ve · no intact RBCs on sediment · supernatant remains red/brown after centrifuge',
      sub: 'Haemoglobin or myoglobin in filtrate · or non-haem pigment (dipstick −ve)',
    },

    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE', connectAfter: false },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-danger-fg);text-align:center;line-height:1.3;">Haemoglobinuria</div><div style="color:var(--tone-danger-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-BD-IMHA')">IMHA</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-BD-BABS')">Babesia</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-TOX-ZN')">Zinc toxicity</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-TOX-ALLIUM')">Allium (onion / garlic)</div><div style="background:rgba(220,38,38,0.15);border:1.5px solid rgba(220,38,38,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-danger-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-ENV-BURN')">Severe thermal injury</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--hl-orange);text-align:center;line-height:1.3;">Myoglobinuria</div><div style="color:var(--hl-orange);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-orange);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-MUSC-RHAB')">Rhabdomyolysis — trauma</div><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-orange);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-ENV-HEAT')">Heatstroke</div><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-orange);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-MUSC-RHAB')">Envenomation → rhabdomyolysis</div><div style="background:rgba(249,115,22,0.15);border:1.5px solid rgba(249,115,22,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-orange);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDiseasePage('DIS-MUSC-RHAB')">Exertional myopathy</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-teal-fg);text-align:center;line-height:1.3;">Pigmenturia</div><div style="color:var(--tone-teal-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Dietary (beetroot · food dye)</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Drugs (rifampin · phenazopyridine)</div></div>
    </div>

    <div style="margin-top:10px;padding:9px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-indigo-fg);margin-bottom:4px;">🔬 KEY WORKUP</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">Centrifuge urine</strong> — red supernatant + clear sediment confirms pseudo-haematuria<br>
        <strong style="color:var(--white);">Dipstick</strong> — negative for blood rules out Hb/Mb; positive with red supernatant = Hb or Mb<br>
        <strong style="color:var(--white);">CK</strong> — markedly ↑ = myoglobinuria<br>
        <strong style="color:var(--white);">Plasma colour</strong> — pink/red = haemoglobinaemia (intravascular haemolysis)<br>
        <strong style="color:var(--white);">CBC + smear</strong> — spherocytes · agglutination · ↓ PCV → haemolysis screen
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── True haematuria — systemic cause ────────────────────────────────────────
// A stack of four red disease boxes (Anticoagulant rodenticide / IMTP / DIC /
// Leptospirosis) + a MINIMUM DATABASE box, all in a bespoke layout → `html`.
const haematuriaTrueSystemic: FlowPage = {
  id: 'haematuria-true-systemic',
  title: 'Haematuria — Systemic Cause',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'danger',
      text: '🩸 SYSTEMIC CAUSE — Red sediment · intact RBCs',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'Haemostatic failure or systemic disease → RBCs leak into urine throughout the tract',
      sub: 'Dipstick +ve · sediment shows intact RBCs · concurrent mucosal bleeding, petechiae, or ecchymoses common',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:flex;flex-direction:column;gap:6px;width:100%;">

      <div style="padding:8px 10px;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);border-radius:10px;">
        <div style="font-size:10px;font-weight:700;color:var(--tone-danger-fg);margin-bottom:4px;">Anticoagulant rodenticide</div>
        <div style="font-size:9.5px;color:var(--gray);line-height:1.6;">
          PT prolongs first — factor VII has the shortest half-life<br>
          <strong style="color:var(--white);">Tx:</strong> Vit K1 2.5 mg/kg SC now · continue 3–4 weeks (brodifacoum) · confirm with PIVKAs
        </div>
      </div>

      <div style="padding:8px 10px;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);border-radius:10px;">
        <div style="font-size:10px;font-weight:700;color:var(--tone-danger-fg);margin-bottom:4px;">IMTP</div>
        <div style="font-size:9.5px;color:var(--gray);line-height:1.6;">
          Platelet &lt;50 ×10⁹/L · mucosal bleeds (gums, epistaxis) · coags normal<br>
          <strong style="color:var(--white);">Tx:</strong> Prednisolone 2 mg/kg/day + adjunct immunosuppression · strict cage rest
        </div>
      </div>

      <div style="padding:8px 10px;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);border-radius:10px;">
        <div style="font-size:10px;font-weight:700;color:var(--tone-danger-fg);margin-bottom:4px;">DIC</div>
        <div style="font-size:9.5px;color:var(--gray);line-height:1.6;">
          Platelets ↓ + PT ↑ + aPTT ↑ + fibrinogen ↓ + D-dimer ↑<br>
          <strong style="color:var(--white);">Tx:</strong> Treat the underlying cause (sepsis · HSA · IMHA) · FFP if active haemorrhage
        </div>
      </div>

      <div style="padding:8px 10px;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);border-radius:10px;">
        <div style="font-size:10px;font-weight:700;color:var(--tone-danger-fg);margin-bottom:4px;">Leptospirosis</div>
        <div style="font-size:9.5px;color:var(--gray);line-height:1.6;">
          AKI + hepatopathy + pyrexia + haematuria · zoonotic — use PPE<br>
          <strong style="color:var(--white);">Dx:</strong> MAT serology + urine PCR · <strong style="color:var(--white);">Tx:</strong> Penicillin (acute) → doxycycline (carrier phase)
        </div>
      </div>

    </div>

    <div style="margin-top:10px;padding:9px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-indigo-fg);margin-bottom:4px;">🔬 MINIMUM DATABASE — Systemic</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">CBC + smear</strong> — platelets · spherocytes · agglutination · ghost cells<br>
        <strong style="color:var(--white);">PT + aPTT</strong> — rodenticide (PT first) · hepatic failure · DIC<br>
        <strong style="color:var(--white);">Biochemistry</strong> — renal panel · ALT · bilirubin (leptospirosis, DIC)<br>
        <strong style="color:var(--white);">Leptospira MAT / urine PCR</strong> — if AKI + pyrexia
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Initial stream (start of stream) ────────────────────────────────────────
// Three location columns (Distal Urethra / Genital Tract / Prostate) each a
// flow-node header + four flow-endpoint cards (background opacity 0.06, pink
// var(--hl-pink) genital palette) + a teal Pearl box → bespoke layout → `html`.
const haematuriaInitial: FlowPage = {
  id: 'haematuria-initial',
  title: 'Haematuria — Initial Stream',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'green',
      text: '🩸 HAEMATURIA — START OF STREAM',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'SOURCE: DISTAL URETHRA · GENITAL TRACT · PROSTATE',
      sub: 'Blood visible at the beginning of voiding, clears as stream progresses — source is distal to the bladder',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">

      <!-- Distal urethra -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-green-fg);background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.3);">🩻 Distal Urethra</div>
        <div class="flow-endpoint" style="background:rgba(16,185,129,0.06);border:1.5px solid rgba(16,185,129,0.25);color:var(--tone-green-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Urolithiasis</strong><br><span style="opacity:.75;">Urethral stone · stranguria · obstruction risk</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(16,185,129,0.06);border:1.5px solid rgba(16,185,129,0.25);color:var(--tone-green-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>TCC / SCC</strong><br><span style="opacity:.75;">Older dog · palpable mass · CADET BRAF</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(16,185,129,0.06);border:1.5px solid rgba(16,185,129,0.25);color:var(--tone-green-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Granulomatous urethritis</strong><br><span style="opacity:.75;">Bitch · mimics TCC · CADET BRAF negative</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(16,185,129,0.06);border:1.5px solid rgba(16,185,129,0.25);color:var(--tone-green-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Trauma</strong><br><span style="opacity:.75;">Pelvic fracture · catheter injury · retrograde urethrogram</span>
        </div>
      </div>

      <!-- Genital tract -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--hl-pink);background:rgba(236,72,153,0.1);border-color:rgba(236,72,153,0.3);">♀ Genital Tract</div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Oestrus</strong><br><span style="opacity:.75;">Intact bitch · pro-oestrus / oestrus · confirm with timed vaginal cytology</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Vaginitis</strong><br><span style="opacity:.75;">Juvenile or adult · discharge · vaginoscopy</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Vaginal / vulvar tumour</strong><br><span style="opacity:.75;">Leiomyoma (benign intact), TVT, fibrosarcoma</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Subinvolution of placental sites</strong><br><span style="opacity:.75;">Post-whelp bitch · persistent haemorrhagic discharge</span>
        </div>
      </div>

      <!-- Prostate -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">⚙️ Prostate</div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>BPH</strong><br><span style="opacity:.75;">Intact male · symmetric enlargement · drip of clear-bloody fluid</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Bacterial prostatitis</strong><br><span style="opacity:.75;">Pyrexia · painful DRE · E. coli most common</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Prostatic cyst / abscess</strong><br><span style="opacity:.75;">Fluctuant on US · surgical drainage</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Prostatic carcinoma</strong><br><span style="opacity:.75;">Intact OR neutered · asymmetric · fixed · sublumbar LN</span>
        </div>
      </div>
    </div>

    <div style="margin-top:12px;padding:9px 12px;background:rgba(16,185,129,0.07);border:1px solid rgba(16,185,129,0.2);border-radius:10px;font-size:9.5px;color:var(--gray);width:100%;">
      <strong style="color:var(--tone-green-fg);">Pearl:</strong> Blood dripping independently between voids (not associated with urination) also localises to the distal urethra, genital tract, or prostate — same anatomy as initial stream haematuria.
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Terminal stream (end of stream) ─────────────────────────────────────────
// Two location columns (Bladder Neck / Trigone, Proximal Urethra · Prostate)
// with flow-node headers + flow-endpoint cards (multi-line sublabels) → `html`.
const haematuriaTerminal: FlowPage = {
  id: 'haematuria-terminal',
  title: 'Haematuria — Terminal Stream',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'indigo',
      text: '🩸 HAEMATURIA — END OF STREAM',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'SOURCE: BLADDER NECK / TRIGONE · PROXIMAL URETHRA · PROSTATE',
      sub: 'Stream starts clear, blood appears as the bladder empties and contracts — trigone or proximal source',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

      <!-- Bladder neck / trigone -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-indigo-fg);background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);">🫧 Bladder Neck / Trigone</div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Urothelial carcinoma (TCC)</strong><br>
          <span style="opacity:.75;">Trigone is the #1 site · older bitch (Scottie, WHWT, Beagle)<br>CADET BRAF urine PCR ~85% sensitive · sublumbar LN · piroxicam</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Bacterial cystitis</strong><br>
          <span style="opacity:.75;">Pollakiuria + stranguria + HU · E. coli most common<br>Cystocentesis culture — gold standard</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Cystic calculi (trigonal)</strong><br>
          <span style="opacity:.75;">Mobile on US · stone analysis essential<br>Struvite: diet dissolution; oxalate: surgical</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Polypoid cystitis</strong><br>
          <span style="opacity:.75;">Often apical — biopsy essential to exclude TCC</span>
        </div>
      </div>

      <!-- Proximal urethra + prostate -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">🩻 Proximal Urethra · ⚙️ Prostate</div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Urethral TCC</strong><br>
          <span style="opacity:.75;">Extension from bladder trigone · stranguria · stent for obstruction</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Prostatic disease</strong><br>
          <span style="opacity:.75;">BPH · prostatitis · carcinoma<br>Prostatic wash + culture + US</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Feline idiopathic cystitis (FIC)</strong><br>
          <span style="opacity:.75;">Cat &lt;10 yr · sterile · stress-related · self-resolving in 5–10 days<br>Multimodal stress reduction · wet diet · NO antibiotics</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Bladder trauma / rupture</strong><br>
          <span style="opacity:.75;">Post-RTA · abdominal effusion · contrast cystography · repair urgently</span>
        </div>
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Uniform (throughout the stream) ─────────────────────────────────────────
// Entry → step → a sub-step discriminating question → two location columns
// (Upper UT — YES / Bladder Body — NO). The columns are bespoke (flow-node
// headers + flow-endpoint cards) → `html`; the sub-step is a standard node.
const haematuriaUniform: FlowPage = {
  id: 'haematuria-uniform',
  title: 'Haematuria — Throughout Stream',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'info',
      text: '🩸 HAEMATURIA — THROUGHOUT THE STREAM',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'SOURCE: BLADDER BODY · UPPER URINARY TRACT',
      sub: 'Uniform blood mixed throughout — origin is the bladder body itself or proximal to it (kidney or ureter)',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <div class="flow-node sub-step">Is there evidence of upper tract involvement?
      <div style="font-size:9px;font-weight:400;margin-top:3px;opacity:.85;">Renomegaly · renal pain · azotaemia · fever · US pyelectasia</div>
    </div>`,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

      <!-- Upper UT -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">🫘 Upper UT — YES</div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>Pyelonephritis</strong><br>
          <span style="opacity:.75;">Fever · lumbar pain · WBC casts · pyelectasia on US<br>E. coli most common · fluoroquinolone 4–6 wks</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>Renal neoplasia</strong><br>
          <span style="opacity:.75;">Renal cell carcinoma (dog) · lymphoma (cat, bilateral)<br>Asymmetric renal mass · CT staging · weight loss</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>Renal calculi / nephrolithiasis</strong><br>
          <span style="opacity:.75;">Often incidental · haematuria if obstructing · stone analysis</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>Idiopathic renal haematuria</strong><br>
          <span style="opacity:.75;">Young dog · unilateral pulsatile bleed from ureter · cystoscopy + ureteric catheterisation · renal-sparing surgery</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>CRGV / "Alabama rot"</strong><br>
          <span style="opacity:.75;">Skin ulcers + AKI + HU · microangiopathic haemolytic anaemia · high mortality</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
          <strong>Renal / ureteric trauma</strong><br>
          <span style="opacity:.75;">Post-RTA · retroperitoneal haemorrhage · contrast CT gold standard</span>
        </div>
      </div>

      <!-- Bladder body -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-indigo-fg);background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);">🫧 Bladder Body — NO</div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Bacterial cystitis (diffuse)</strong><br>
          <span style="opacity:.75;">Entire mucosa inflamed · uniform HU · cystocentesis culture</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Cystic calculi (body)</strong><br>
          <span style="opacity:.75;">Non-trigonal stones · mobile on US · struvite vs oxalate vs urate</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>FIC (cat)</strong><br>
          <span style="opacity:.75;">Diffuse mucosal haemorrhage · sterile · self-resolving<br>Multimodal stress reduction</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.06);border:1.5px solid rgba(99,102,241,0.25);color:var(--tone-indigo-fg);font-size:9.5px;cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
          <strong>Bladder lymphoma (cat)</strong><br>
          <span style="opacity:.75;">Diffuse wall thickening · sterile urine · FeLV/FIV status · CHOP</span>
        </div>
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Independent of voiding (between voids) ──────────────────────────────────
// Three location columns (Genital / Prostate / Distal Urethra) — note the
// Distal Urethra column here uses a violet var(--tone-violet-fg) palette (not the green of
// the initial-stream page) + a violet Key step box → bespoke layout → `html`.
const haematuriaIndep: FlowPage = {
  id: 'haematuria-indep',
  title: 'Haematuria — Between Voids',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      tone: 'violet',
      text: '🩸 HAEMATURIA — INDEPENDENT OF VOIDING',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'BLOOD DRIPS WITHOUT URINATION',
      sub: 'Source is distal to the bladder — blood collects and drips spontaneously between urination episodes',
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">

      <!-- Genital tract -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--hl-pink);background:rgba(236,72,153,0.1);border-color:rgba(236,72,153,0.3);">♀ Genital</div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Oestrus</strong><br><span style="opacity:.75;">Intact bitch in pro-oestrus · confirm with vaginal cytology</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Vaginal / vulvar tumour</strong><br><span style="opacity:.75;">Leiomyoma · TVT · vaginoscopy + biopsy</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Subinvolution of placental sites</strong><br><span style="opacity:.75;">Post-whelping bitch · haemorrhagic vulvar discharge</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(236,72,153,0.06);border:1.5px solid rgba(236,72,153,0.25);color:var(--hl-pink);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
          <strong>Open pyometra</strong><br><span style="opacity:.75;">Mucopurulent ± bloody discharge · intact bitch · US: uterine distension</span>
        </div>
      </div>

      <!-- Prostate -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">⚙️ Prostate</div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>BPH</strong><br><span style="opacity:.75;">Spontaneous bloody urethral discharge between voids · intact male · finasteride / castration</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Chronic prostatitis</strong><br><span style="opacity:.75;">Recurrent HU between voids · E. coli · prostatic wash + culture</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(37,99,235,0.06);border:1.5px solid rgba(37,99,235,0.25);color:var(--tone-info-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
          <strong>Prostatic carcinoma</strong><br><span style="opacity:.75;">Intact OR neutered · fixed asymmetric mass on DRE · sublumbar LN</span>
        </div>
      </div>

      <!-- Distal urethra -->
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-violet-fg);background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.3);">🩻 Distal Urethra</div>
        <div class="flow-endpoint" style="background:rgba(139,92,246,0.06);border:1.5px solid rgba(139,92,246,0.25);color:var(--tone-violet-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Urethral neoplasia</strong><br><span style="opacity:.75;">TCC / SCC · palpable urethral mass · CADET BRAF</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(139,92,246,0.06);border:1.5px solid rgba(139,92,246,0.25);color:var(--tone-violet-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Urethral prolapse</strong><br><span style="opacity:.75;">Young intact Bulldog / Boxer male · visible red tissue at preputial opening</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(139,92,246,0.06);border:1.5px solid rgba(139,92,246,0.25);color:var(--tone-violet-fg);font-size:9px;cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
          <strong>Granulomatous urethritis</strong><br><span style="opacity:.75;">Bitch · intermittent drip · cystoscopy + biopsy to exclude TCC</span>
        </div>
      </div>
    </div>

    <div style="margin-top:12px;padding:9px 12px;background:rgba(139,92,246,0.07);border:1px solid rgba(139,92,246,0.2);border-radius:10px;font-size:9.5px;color:var(--gray);width:100%;">
      <strong style="color:var(--tone-violet-fg);">Key step:</strong> Observe whether blood is present on the coat/bedding between urination attempts — true independent drip distinguishes from initial stream haematuria. In intact bitches, always check vaginal cytology and progesterone to time oestrus.
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

export const haematuriaFlows: FlowPage[] = [
  haematuriaEntry,
  haematuriaPseudo,
  haematuriaTrueSystemic,
  haematuriaInitial,
  haematuriaTerminal,
  haematuriaUniform,
  haematuriaIndep,
]
