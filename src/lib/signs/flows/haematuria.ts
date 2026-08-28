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

import { forkHtml, type FlowPage } from '../flowTypes'

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
      subItems: [
        'Spin 1500 rpm × 5 min',
        'Haemoglobinuria, myoglobinuria and pigment all give a dipstick +ve for blood',
        'Only centrifugation separates them',
      ],
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `${forkHtml('2fr 3fr', 8, false)}

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
      ${forkHtml('1fr 2fr', 5, false)}

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
          ${forkHtml(2, 3)}

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
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Urethral obstruction</strong> — male cat (FIC + plug), male dog (urolith) → hyperkalaemia within hours',
        { bold: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' }, html: ' — haematuria can be the presenting sign before generalised bleed' },
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

    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE' },

    // Formerly a raw html block — now typed: categoryColumns (with tone override)
    // eliminates ~20 lines of repeated inline RGBA/flex markup.
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Haemoglobinuria',
          tone: 'danger',
          tiles: [
            { label: 'IMHA', link: { to: 'disease', id: 'DIS-BD-IMHA' } },
            { label: 'Babesia', link: { to: 'disease', id: 'DIS-BD-BABS' } },
            { label: 'Zinc toxicity', link: { to: 'disease', id: 'DIS-TOX-ZN' } },
            { label: 'Allium (onion / garlic)', link: { to: 'disease', id: 'DIS-TOX-ALLIUM' } },
            { label: 'Severe thermal injury', link: { to: 'disease', id: 'DIS-ENV-BURN' } },
          ],
        },
        {
          cat: 'Myoglobinuria',
          tone: 'orange',
          tiles: [
            { label: 'Rhabdomyolysis', link: { to: 'disease', id: 'DIS-MUSC-RHAB' } },
            { label: 'Heatstroke', link: { to: 'disease', id: 'DIS-ENV-HEAT' } },
            { label: 'Envenomation → rhabdomyolysis', link: { to: 'disease', id: 'DIS-MUSC-RHAB' } },
            { label: 'Exertional myopathy', link: { to: 'disease', id: 'DIS-MUSC-RHAB' } },
          ],
        },
        {
          cat: 'Pigmenturia',
          tone: 'teal',
          tiles: [
            { label: 'Dietary (beetroot · food dye)', terminal: true },
            { label: 'Drugs (rifampin · phenazopyridine)', terminal: true },
          ],
        },
      ],
    },
    // Each line was test → what the result means, so it is a table. The old
    // first line (centrifuge → red supernatant) is the page's own header and is
    // not repeated here.
    {
      kind: 'table',
      boxTone: 'indigo',
      gap: 12,
      dividers: true,
      title: '🔬 KEY WORKUP',
      cols: '24% 1fr',
      headers: ['Test', 'What the result means'],
      rows: [
        ['Dipstick (blood)', 'Negative rules out Hb and Mb; positive with a red supernatant = one of the two'],
        ['CK', 'Markedly raised = myoglobinuria'],
        ['Plasma colour', 'Pink or red = haemoglobinaemia, i.e. intravascular haemolysis'],
        ['CBC + smear', 'Spherocytes · agglutination · ↓ PCV → work it up as haemolysis'],
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── True haematuria — systemic cause ────────────────────────────────────────
// Mirrors how epistaxis processes systemic disease: a haemostatic defect hands
// off to the full bleeding work-up rather than re-enumerating causes. The
// primary/secondary split and every cause (rodenticide / IMTP / DIC /
// leptospirosis) lives in the bleeding flowchart, so this page is just the
// intro + a single BLEEDING / PETECHIAE / ECCHYMOSES handoff endpoint + the
// haematuria-specific MINIMUM DATABASE.
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
    },

    // A haemostatic defect hands off to the full bleeding work-up — the
    // primary/secondary haemostasis split and every cause (rodenticide · IMTP ·
    // DIC · leptospirosis) lives there.
    {
      kind: 'endpoints',
      items: [
        { label: 'Bleeding / petechiae / ecchymoses', tone: 'danger', link: { to: 'flow', id: 'bleeding' } },
      ],
    },

    {
      kind: 'infoBox',
      tone: 'indigo',
      icon: '🔬',
      title: 'MINIMUM DATABASE — Systemic',
      html: '<strong style="color:var(--white);">CBC + smear</strong> — platelets · spherocytes · agglutination · ghost cells<br><strong style="color:var(--white);">PT + aPTT</strong> — rodenticide (PT first) · hepatic failure · DIC<br><strong style="color:var(--white);">Biochemistry</strong> — renal panel · ALT · bilirubin (leptospirosis, DIC)<br><strong style="color:var(--white);">Leptospira MAT / urine PCR</strong> — if AKI + pyrexia',
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
      html: `${forkHtml(3, 6)}

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">

      <!-- Distal urethra -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-green-fg);background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
        🩻 Distal Urethra ›
      </div>

      <!-- Genital tract -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--hl-pink);background:rgba(236,72,153,0.1);border-color:rgba(236,72,153,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
        ♀ Genital Tract ›
      </div>

      <!-- Prostate -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
        ⚙️ Prostate ›
      </div>
    </div>

`,
    },
    {
      kind: 'infoBox',
      tone: 'green',
      html: '<strong style="color:var(--tone-green-fg);">Pearl:</strong> Blood dripping independently between voids (not associated with urination) also localises to the distal urethra, genital tract, or prostate — same anatomy as initial stream haematuria.',
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
      html: `${forkHtml(3, 6)}

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">

      <!-- Bladder neck / trigone -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-indigo-fg);background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
        🫧 Bladder Neck / Trigone ›
      </div>

      <!-- Proximal urethra -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
        🩻 Proximal Urethra ›
      </div>

      <!-- Prostate -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
        ⚙️ Prostate ›
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
      html: `${forkHtml(2, 8)}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

      <!-- Upper UT -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-UPPER','Upper urinary tract')">
        🫘 Upper UT — YES ›
      </div>

      <!-- Bladder body -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-indigo-fg);background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-BLADDER','Bladder')">
        🫧 Bladder Body — NO ›
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
      html: `${forkHtml(3, 6)}

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;">

      <!-- Genital tract -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--hl-pink);background:rgba(236,72,153,0.1);border-color:rgba(236,72,153,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-GENIT','Genital tract')">
        ♀ Genital ›
      </div>

      <!-- Prostate -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-info-fg);background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-PROST','Prostate')">
        ⚙️ Prostate ›
      </div>

      <!-- Distal urethra -->
      <div class="flow-node" style="font-size:9.5px;font-weight:700;color:var(--tone-violet-fg);background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.3);cursor:pointer;" onclick="goLesionTab('LOC-HU-URETHRA','Urethra')">
        🩻 Distal Urethra ›
      </div>
    </div>

`,
    },
    {
      kind: 'infoBox',
      tone: 'violet',
      html: '<strong style="color:var(--tone-violet-fg);">Key step:</strong> Observe whether blood is present on the coat/bedding between urination attempts — true independent drip distinguishes from initial stream haematuria. In intact bitches, always check vaginal cytology and progesterone to time oestrus.',
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
