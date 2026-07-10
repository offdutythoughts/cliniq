// ── Bleeding / Petechiae / Ecchymoses flowchart (data) ──────────────────────
// Migration of bleedingFlowHtml (src/lib/signs/bleeding.ts) + the inline
// sub-flows renderBleedingFlowPrimary / Secondary / DIC / Vasc (cliniqApp.ts)
// to the FlowPage model. Visible text is transcribed byte-identically from the
// legacy source.
//
// Entry id is 'bleeding' (epistaxis links to it). Sub-flow ids:
// 'bleeding-primary' / '-secondary' / '-dic' / '-vasc'.
//
// FLAGGED html escape-hatches (no typed block fits — see REPORT):
//   • entry: the asymmetric 3fr:2fr YES/NO branch tree with nested mini-labels
//   • entry: the 🐕 vs 🐱 dog/cat species-difference matrix
//   • primary: the platelet-mechanism 3-column sub-grid (LOW <50) + the
//     normal-count BMBT branch (asymmetric 3fr:2fr, custom labels)
//   • vasc: the violet col()/chip lesion-distribution grid — its chips call
//     renderLesionDetail('LES-…'), for which there is NO typed Link (the only
//     lesion Link is goLesionTab); kept verbatim in html.

import type { FlowPage } from '../flowTypes'

// ── Entry ────────────────────────────────────────────────────────────────────
const bleedingEntry: FlowPage = {
  id: 'bleeding',
  title: 'Bleeding / Petechiae',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🩸 BLEEDING / PETECHIAE / ECCHYMOSES' },

    {
      kind: 'node',
      variant: 'step',
      text: 'SIGNS OF 3RD SPACE BLEEDING?',
      sub: 'Haemothorax · haemoperitoneum · deep haematoma after minor trauma · delayed post-surgical bleed',
      // The branch tree below is a raw-html escape hatch, so suppress the
      // implicit spine arrow after this step (the html supplies its own).
      connectAfter: false,
    },

    // FLAGGED html: the YES/NO branch tree. The legacy uses an asymmetric
    // 3fr:2fr top grid, nested 1fr:1fr grids with their own arrows, and small
    // colour-coded YES/NO mini-labels — none of which the typed `branch`/
    // `endpoints` blocks (equal columns + column headers) can reproduce
    // faithfully. The branch endpoints route to the data sub-flows via
    // renderFlowId('bleeding-primary' / '-secondary' / '-dic' / '-vasc').
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

  <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;width:100%;">

    <!-- YES branch -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:9px;font-weight:600;color:var(--tone-info-fg);letter-spacing:.03em;">YES — cavity / deep bleed</div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.4);font-size:10px;font-weight:700;color:var(--tone-info-fg);">
        LIKELY SECONDARY<br>
        <span style="font-size:9px;font-weight:400;opacity:.8;">Coag cascade · factor deficiency</span>
      </div>
      <div class="flow-arrow-v">↓</div>

      <!-- Q2a -->
      <div class="flow-node sub-step" style="width:100%;font-size:10px;">Also petechiae / ecchymoses?</div>
      <div class="flow-arrow-v">↓</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%;">

        <!-- Q2a YES → MIXED -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
          <div style="font-size:9px;font-weight:600;color:var(--tone-warning-fg);">YES</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-node" style="width:100%;background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.4);font-size:9.5px;font-weight:700;color:var(--tone-warning-fg);">
            LIKELY MIXED
          </div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-node sub-step" style="width:100%;font-size:9px;">Severe systemic<br>illness present?</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;width:100%;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div style="font-size:8px;font-weight:600;color:var(--tone-danger-fg);">YES</div>
              <div class="flow-arrow-v" style="font-size:10px;">↓</div>
              <div class="flow-endpoint" style="background:rgba(220,38,38,0.12);border:1.5px solid rgba(220,38,38,0.4);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('bleeding-dic')">
                ⚡ DIC<br>
                <span style="opacity:.75;font-size:8px;">Treat urgently ›</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div style="font-size:8px;font-weight:600;color:var(--gray2);">NO</div>
              <div class="flow-arrow-v" style="font-size:10px;">↓</div>
              <div class="flow-endpoint" style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.3);color:var(--tone-warning-fg);font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('bleeding-secondary')">
                Concurrent<br>primary +<br>secondary ›
              </div>
            </div>
          </div>
        </div>

        <!-- Q2a NO → Pure secondary -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
          <div style="font-size:9px;font-weight:600;color:var(--gray2);">NO</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-endpoint" style="background:rgba(37,99,235,0.1);border:1.5px solid rgba(37,99,235,0.35);color:var(--tone-info-fg);font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-secondary')">
            🔗 Pure<br>SECONDARY<br>
            <span style="opacity:.75;font-size:8px;">PT · aPTT ›</span>
          </div>
        </div>

      </div>
    </div>

    <!-- NO branch -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:9px;font-weight:600;color:var(--gray2);">NO cavity / deep bleed</div>
      <div class="flow-arrow-v">↓</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
        <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-primary')">
          🧱 PRIMARY<br>
          <span style="opacity:.75;font-size:8px;">Platelet · vWF ›</span>
        </div>
        <div class="flow-endpoint" style="background:rgba(139,92,246,0.1);border:1.5px solid rgba(139,92,246,0.35);color:var(--tone-violet-fg);font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-vasc')">
          🌐 VASCULO-<br>PATHY<br>
          <span style="opacity:.75;font-size:8px;">Vessel wall ›</span>
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
        { bold: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' }, html: ' — PT prolongs first; Vit K1 SC now, confirm later (acts in 6–12 h — transfuse for active bleeds)' },
        { bold: 'DIC', link: { to: 'disease', id: 'DIS-BD-DIC' }, html: ' — petechiae + cavity bleed + systemic illness → ≥ 3 of 5 abnormal; treat cause urgently. <em>Dogs bleed (haemorrhagic phenotype); cats clot (thrombotic phenotype, ~7 % survival).</em>' },
        '<strong>Haemoperitoneum</strong> (HSA rupture) — collapse + pale gums → emergency surgery',
        { bold: 'IMTP', link: { to: 'disease', id: 'DIS-BD-IMTP' }, html: ' platelet &lt;30 ×10⁹/L — start immunosuppression urgently' },
      ],
    },

    {
      kind: 'speciesCompare',
      dog: [
        'DIC: haemorrhagic; ~78 % survive nonovert · ~38 % survive overt',
        'IMTP: common; primary form predominates; F &gt; M 2:1',
        'Babesia: <em>B. canis</em> (large) → imidocarb; <em>B. gibsoni</em> (small) → atovaquone + azithromycin',
        'Snake envenomation: rapid presentation; pigmenturia common',
        'Inherited coagulopathy: vWD, haemophilia A/B, factor VII (Beagle)',
        'Drug list: azathioprine OK',
        'D-dimer 75–100 % sensitive for DIC',
      ],
      cat: [
        'DIC: <strong>thrombotic phenotype</strong> dominates; bleeding rare; ~7 % survival',
        'IMTP: rare (~3 % of feline thrombocytopenia) — almost always secondary (FeLV/FIV, lymphoma, FIP, Mycoplasma haemofelis)',
        'Babesia: <em>B. felis</em> (Africa); FeLV/FIV co-infection in ~46 %; <strong>primaquine ≤0.5 mg/kg</strong> (toxic ≥1 mg/kg)',
        'Snake envenomation: <strong>delayed</strong> (cats hide); pulmonary pooling of killing fraction; pigmenturia less common',
        'Inherited coagulopathy: <strong>Factor XII (Hageman) deficiency</strong> — most common feline; Birman, Siamese, DSH — <strong>asymptomatic</strong>; isolated prolonged aPTT',
        'Drug list: <strong>NEVER azathioprine</strong> (myelotoxic); methimazole can cause thrombocytopenia',
        'D-dimer ~67 % sens / 56 % spec; <strong>ATIII unreliable</strong>',
      ],
    },

  ],
}

// ── Primary haemostasis ──────────────────────────────────────────────────────
const bleedingPrimary: FlowPage = {
  id: 'bleeding-primary',
  title: 'Bleeding — Primary Haemostasis',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '🧱 PRIMARY HAEMOSTASIS FAILURE' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '<strong>Pattern:</strong> Petechiae · ecchymoses · mucosal haemorrhage (epistaxis, haematuria, gingival bleeding, haematemesis, melaena, haemoptysis) · prolonged surface bleeding from minor wounds<br><strong>Trigger VWD workup if:</strong> unexplained bleeding in young dogs ± trauma OR excessive bleeding after elective surgery (spay/neuter)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CHECK PLATELET COUNT',
      sub: 'This single result divides the branch into two distinct pathways',
      // The asymmetric 3fr:2fr two-pathway grid below is a raw-html escape
      // hatch; suppress the implicit spine arrow (the html supplies its own).
      connectAfter: false,
    },

    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;width:100%;">

      <!-- Thrombocytopenic -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node" style="width:100%;background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.4);font-size:10.5px;font-weight:700;color:var(--tone-danger-fg);text-align:center;">
          LOW &lt; 50 ×10⁹/L<br>
          <span style="font-size:9px;font-weight:400;color:var(--gray);">Thrombocytopenic</span>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;text-align:center;">IDENTIFY MECHANISM</div>
        <div class="flow-arrow-v">↓</div>

        <!-- 3 clickable endpoint cards -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;width:100%;align-items:start;">

          <div class="flow-endpoint" onclick="renderFlowId('bleeding-prod')" style="cursor:pointer;background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">↓ Production</div>
          </div>

          <div class="flow-endpoint" onclick="renderFlowId('bleeding-consump')" style="cursor:pointer;background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">Consumption &amp; Sequestration</div>
          </div>

          <div class="flow-endpoint" onclick="renderFlowId('bleeding-dest')" style="cursor:pointer;background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:var(--tone-danger-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">Destruction</div>
          </div>

        </div>
      </div>

      <!-- Normal count -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node" style="width:100%;background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.4);font-size:10.5px;font-weight:700;color:var(--tone-green-fg);text-align:center;">
          NORMAL COUNT<br>
          <span style="font-size:9px;font-weight:400;color:var(--gray);">Platelet function defect</span>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">BMBT prolonged &gt; 4 min</div>
        <div class="flow-arrow-v">↓</div>

        <div style="display:flex;flex-direction:column;gap:5px;width:100%;">
          <div class="flow-endpoint" onclick="renderFlowId('bleeding-thrombopathia')" style="cursor:pointer;background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:var(--tone-green-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">Thrombopathia</div>
            <div style="font-size:8px;opacity:.5;margin-top:4px;">Tap to explore ›</div>
          </div>
          <div class="flow-endpoint" onclick="renderFlowId('bleeding-vasc')" style="cursor:pointer;background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.3);color:var(--tone-violet-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">Vasculitis</div>
            <div style="font-size:8px;opacity:.5;margin-top:4px;">Tap to explore ›</div>
          </div>
          <div class="flow-endpoint" onclick="renderFlowId('bleeding-immune-plt')" style="cursor:pointer;background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.3);color:var(--tone-warning-fg);font-size:9px;text-align:center;">
            <div style="font-weight:700;">Immune-mediated</div>
            <div style="font-size:8px;opacity:.5;margin-top:4px;">Tap to explore ›</div>
          </div>
        </div>
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Secondary haemostasis ────────────────────────────────────────────────────
const bleedingSecondary: FlowPage = {
  id: 'bleeding-secondary',
  title: 'Bleeding — Secondary Haemostasis',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'info', text: '🔗 SECONDARY HAEMOSTASIS FAILURE' },

    {
      kind: 'node',
      variant: 'step',
      text: 'CHECK PT AND aPTT',
      sub: 'The combination pattern localises the defect in the coagulation cascade',
      connectAfter: false,
    },

    // The legacy draws a connector arrow between the step and the table; the
    // typed `table` is a trailing box (no preceding arrow), so supply it here.
    { kind: 'html', html: '<div class="flow-arrow-v">↓</div>' },

    // PT/aPTT pattern → typed `table`. Two columns (Pattern | Possible causes);
    // the pattern cell stacks a bold coloured label + grey sub on two lines.
    {
      kind: 'table',
      cols: '38% 1fr',
      headers: ['Pattern', 'Possible causes'],
      rows: [
        [
          '<div style="font-weight:700;color:var(--tone-warning-fg);line-height:1.3;">PT ↑ only</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">aPTT normal</div>',
          '<strong style="color:var(--tone-warning-fg);">Anticoagulant rodenticide</strong> — early (factor VII depletes first) · Vit K1 2.5 mg/kg SC<br><strong style="color:var(--tone-warning-fg);">Factor VII deficiency</strong> — congenital; Beagle, Malamute',
        ],
        [
          '<div style="font-weight:700;color:var(--tone-indigo-fg);line-height:1.3;">aPTT ↑ only</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">PT normal</div>',
          '<strong style="color:var(--tone-indigo-fg);">Haemophilia A</strong> — factor VIII deficiency; X-linked; males affected<br><strong style="color:var(--tone-indigo-fg);">Haemophilia B</strong> — factor IX deficiency; Cairn terrier<br><strong style="color:var(--tone-indigo-fg);">Factor XII deficiency</strong> — cats; usually non-bleeding phenotype',
        ],
        [
          '<div style="font-weight:700;color:var(--tone-danger-fg);line-height:1.3;">PT ↑ + aPTT ↑</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">Both prolonged</div>',
          '<strong style="color:var(--tone-danger-fg);">Rodenticide (advanced)</strong> — multiple factors depleted; Vit K1 urgently<br><strong style="color:var(--tone-danger-fg);">Hepatic failure</strong> — reduced factor synthesis; check ALT · bilirubin · albumin<br><strong style="color:var(--tone-danger-fg);">DIC</strong> — thrombocytopenia concurrent → confirm FDPs / D-dimer<br><strong style="color:var(--tone-danger-fg);">Multi-factor deficiency</strong> — congenital; rare; send mixing studies',
        ],
        [
          '<div style="font-weight:700;color:var(--tone-green-fg);line-height:1.3;">PT + aPTT normal</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">Coags intact</div>',
          '<strong style="color:var(--tone-green-fg);">Vascular rupture / trauma</strong> — HSA · surgical complication · arterial<br><strong style="color:var(--tone-green-fg);">Factor XIII deficiency</strong> — not measured by PT/aPTT; clot unstable in 5M urea',
        ],
      ],
    },

    {
      kind: 'callout',
      tone: 'warning',
      gap: 14,
      title: '⚠️ RODENTICIDE PEARL',
      html: 'PT prolongs <strong style="color:var(--white);">before</strong> aPTT — Factor VII has the shortest half-life. Don\'t wait for clinical bleeding. If suspected, treat with Vitamin K1 <strong style="color:var(--white);">2.5 mg/kg SC</strong> (not IV — anaphylaxis risk), continue 3–4 weeks (brodifacoum). Recheck PT 48–72 h after stopping to confirm resolution.',
    },

    { kind: 'disclaimer' },
  ],
}

// ── DIC ──────────────────────────────────────────────────────────────────────
const bleedingDic: FlowPage = {
  id: 'bleeding-dic',
  title: 'Bleeding — DIC',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚡ DIC — DISSEMINATED INTRAVASCULAR COAGULATION' },

    {
      kind: 'callout',
      tone: 'danger',
      center: true,
      title: 'DIC IS ALWAYS SECONDARY TO SEVERE UNDERLYING DISEASE',
      html: 'Finding the trigger is the priority — DIC will not resolve without treating the cause',
    },

    { kind: 'node', variant: 'step', text: 'CLINICAL SIGNS' },

    {
      kind: 'callout',
      tone: 'slate',
      html: '<strong style="color:var(--tone-danger-fg);">🩸 Haemorrhagic</strong><br>• Petechiae / ecchymoses<br>• Epistaxis · haematuria<br>• Melaena<br>• Cavity bleeding (haemoabdomen · haemothorax)<br>• Oozing from venepuncture sites<br><br><strong style="color:var(--tone-purple-fg);">🫀 Systemic / thrombotic</strong><br>• Collapse · profound weakness<br>• Pale / white / grey MMs<br>• Tachycardia · weak pulses<br>• Hypothermia (severe shock)<br>• Acute hindlimb paresis (feline ATE)<br>• Dyspnoea (PTE)',
    },

    { kind: 'node', variant: 'step', text: 'TOP CAUSES' },

    {
      kind: 'callout',
      tone: 'info',
      title: '🐕 Canine',
      html: 'Haemorrhagic phenotype · ~78 % survive non-overt · ~38 % overt',
    },

    {
      kind: 'categoryColumns',
      cols: 3,
      connectAfter: false,
      columns: [
        { cat: 'Neoplastic', tone: 'violet', tiles: [
          { label: 'Haemangiosarcoma (splenic / hepatic)' },
        ]},
        { cat: 'Sepsis / SIRS', tone: 'danger', tiles: [
          { label: 'Sepsis — pyometra · GDV · peritonitis' },
        ]},
        { cat: 'Immune-mediated', tone: 'purple', tiles: [
          { label: 'IMHA' },
        ]},
        { cat: 'Inflammatory', tone: 'warning', tiles: [
          { label: 'Severe pancreatitis' },
        ]},
        { cat: 'Toxic / environmental', tone: 'orange', tiles: [
          { label: 'Snake envenomation' },
          { label: 'Heat stroke' },
        ]},
        { cat: 'Trauma', tone: 'slate', tiles: [
          { label: 'Major trauma' },
        ]},
      ],
    },

    {
      kind: 'callout',
      tone: 'violet',
      gap: 14,
      title: '🐈 Feline',
      html: 'Thrombotic phenotype · minimal external bleeding · ~7 % survival',
    },

    {
      kind: 'categoryColumns',
      cols: 3,
      columns: [
        { cat: 'Infectious', tone: 'teal', tiles: [
          { label: 'FIP' },
          { label: 'Sepsis — pyothorax · urinary sepsis' },
          { label: 'Cytauxzoonosis' },
        ]},
        { cat: 'Neoplastic', tone: 'violet', tiles: [
          { label: 'Lymphoma' },
          { label: 'Neoplasia (various)' },
        ]},
        { cat: 'Inflammatory', tone: 'warning', tiles: [
          { label: 'Severe pancreatitis / triaditis' },
        ]},
        { cat: 'Cardiac', tone: 'indigo', tiles: [
          { label: 'Cardiomyopathy' },
        ]},
      ],
    },

    {
      kind: 'callout',
      tone: 'danger',
      center: true,
      gap: 14,
      title: '⚡ THIS IS AN EMERGENCY',
      html: 'FFP · heparin · serial monitoring · treat the cause',
    },

    {
      kind: 'dxRow',
      items: [
        { label: '⚡ Open DIC Emergency Protocol', link: { to: 'protocol', id: 'PROT-BLEED-DIC' } },
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── Vasculopathy ─────────────────────────────────────────────────────────────
const bleedingVasc: FlowPage = {
  id: 'bleeding-vasc',
  title: 'Bleeding — Vasculopathy',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'violet', text: 'VASCULOPATHY / VASCULITIS' },

    {
      // html needed to preserve <em>normal</em> italic
      kind: 'callout',
      tone: 'violet',
      html: '<strong>Recognise the pattern:</strong> Bleeding from vessel wall disease — platelets and coagulation profile are <em>normal</em>',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CUTANEOUS vs SYSTEMIC INVOLVEMENT?',
      sub: 'Skin / extremity lesions alone vs retinal haemorrhage · hypertension · multi-system illness',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: 'CUTANEOUS',
          tone: 'violet',
          sub: 'Skin · paw pads · ear tips',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'CRGV / ALABAMA ROT', sublabel: '→ AKI in 1–10 days', tone: 'danger', link: { to: 'disease', id: 'DIS-BD-CRGV' } },
                { label: 'CUTANEOUS VASCULITIS', tone: 'violet', link: { to: 'disease', id: 'DIS-BD-VASC' } },
                { label: 'Lhasa Apso vasculopathy', sublabel: 'ear tips', tone: 'neutral' },
              ],
            },
          ],
        },
        {
          header: 'INFECTIOUS',
          tone: 'orange',
          sub: 'Tick-borne · zoonotic · endemic',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'EHRLICHIOSIS', sublabel: 'tick-borne', tone: 'orange', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
                { label: 'RMSF', sublabel: 'tick-borne · petechiae', tone: 'danger', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
                { label: 'LEISHMANIASIS', sublabel: 'endemic regions', tone: 'green', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
                { label: 'LEPTOSPIROSIS', sublabel: 'zoonotic · renal', tone: 'warning', link: { to: 'disease', id: 'DIS-INFECT-LEPTO' } },
                { label: 'FIP', sublabel: 'cats', tone: 'neutral', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
              ],
            },
          ],
        },
        {
          header: 'SYSTEMIC / METABOLIC',
          tone: 'danger',
          sub: 'Retinal · multi-organ · iatrogenic',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'HYPERTENSION', sublabel: 'retinal detachment', tone: 'danger', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
                { label: 'HYPERVISCOSITY', sublabel: 'myeloma · globulinaemia', tone: 'violet', link: { to: 'disease', id: 'DIS-VASC-HYPERVSC' } },
                { label: 'HAC / STEROIDS', sublabel: 'easy bruising', tone: 'warning', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
                { label: 'URAEMIC VASCULOPATHY', sublabel: 'CKD end-stage', tone: 'neutral', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: 'DON\'T MISS — CRGV / ALABAMA ROT',
      items: [
        '<strong>Skin ulcers on distal limbs + AKI developing 1–10 days later</strong> — mortality &gt;80 % once AKI establishes; act at the skin lesion stage',
        'Baseline <strong>creatinine, platelet count, and urinalysis</strong> at first presentation — warn owner to return urgently for vomiting, lethargy, or inappetence within 14 days',
        'UK: hounds, gundogs, pastoral breeds after woodland walks in winter/spring — report cases to Anderson Moores CRGV surveillance',
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── ↓ Production ─────────────────────────────────────────────────────────────
const bleedingProd: FlowPage = {
  id: 'bleeding-prod',
  title: 'Bleeding — ↓ Platelet Production',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '↓ PLATELET PRODUCTION' },
    {
      kind: 'callout',
      tone: 'warning',
      html: '<strong>Key test:</strong> BM aspirate + core biopsy if other cell lines (RBC, WBC) also affected — rules out primary marrow disease vs isolated megakaryocyte suppression',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'Primary Marrow Disease',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Lymphoma', sublabel: 'Marrow infiltration → megakaryocyte suppression', tone: 'danger', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Leukaemia', sublabel: 'Neoplastic cell replacement of marrow', tone: 'danger' },
            { label: 'Multiple myeloma', sublabel: 'Plasma cell neoplasia infiltrating marrow', tone: 'danger', link: { to: 'disease', id: 'DIS-NEO-MM' } },
            { label: 'Immune-mediated aplasia', sublabel: 'Immune destruction of megakaryocytes', tone: 'danger', link: { to: 'disease', id: 'DIS-BD-NRA' } },
            { label: 'Myelofibrosis / myelophthisis', sublabel: 'Replacement of marrow architecture', tone: 'danger', link: { to: 'disease', id: 'DIS-BD-NRA' } },
          ]}],
        },
        {
          header: 'Drug-induced',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Cytotoxic chemotherapy', sublabel: 'Lomustine · cytarabine · melphalan · methotrexate · platinum · doxorubicin · actinomycin D · bleomycin', tone: 'warning' },
            { label: 'Other drugs', sublabel: 'Chloramphenicol · oestrogen', tone: 'warning' },
          ]}],
        },
        {
          header: 'Secondary / Infectious',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'FeLV', sublabel: 'Direct myelosuppression — cats', tone: 'neutral', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
            { label: 'Ehrlichiosis', sublabel: 'Tick-borne; also causes destruction', tone: 'orange', link: { to: 'disease', id: 'DIS-BD-EHRL' } },
            { label: 'Hypothyroidism', sublabel: 'Reduced thrombopoietin sensitivity', tone: 'neutral', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
          ]}],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── Consumption & Sequestration ───────────────────────────────────────────────
const bleedingConsump: FlowPage = {
  id: 'bleeding-consump',
  title: 'Bleeding — Consumption & Sequestration',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: 'CONSUMPTION & SEQUESTRATION' },
    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Mechanism:</strong> Platelets are produced normally but consumed faster than they can be replaced, or pooled in an enlarged spleen',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'Consumption',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Significant haemorrhage', sublabel: 'Platelets lost with bleeding; secondary thrombocytopenia', tone: 'danger' },
            { label: 'Sepsis', sublabel: 'Platelet activation + consumption in microthrombi', tone: 'danger', link: { to: 'protocol', id: 'PROT-SEPSIS' } },
            { label: 'Vasculitis', sublabel: 'Endothelial damage → continuous platelet activation', tone: 'danger' },
            { label: 'DIC', link: { to: 'protocol', id: 'PROT-BLEED-DIC' }, sublabel: 'Early thrombosis → late haemorrhage; PT + aPTT both prolonged', tone: 'danger' },
          ]}],
        },
        {
          header: 'Sequestration',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Splenomegaly', sublabel: 'Up to 90 % of platelet pool can pool in markedly enlarged spleen — counts often 50–100 ×10⁹/L', tone: 'warning' },
          ]}],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 14,
      title: '⚠️ DIC PEARL',
      html: '• Early DIC → thrombosis (cold extremities, organ ischaemia)<br>• Late DIC → haemorrhage (petechiae, oozing from sites)<br>Always check PT + aPTT — both prolonged in established DIC.',
    },
    { kind: 'disclaimer' },
  ],
}

// ── Destruction ───────────────────────────────────────────────────────────────
const bleedingDest: FlowPage = {
  id: 'bleeding-dest',
  title: 'Bleeding — Platelet Destruction',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: 'PLATELET DESTRUCTION' },
    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Mechanism:</strong> Normal or increased megakaryocytes in marrow — platelets are destroyed peripherally faster than production can compensate',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'Immune-mediated (IMTP)',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Primary IMTP', link: { to: 'disease', id: 'DIS-BD-IMTP' }, sublabel: '#1 cause dog · antibodies vs platelet antigens · Cocker · Poodle · OES · Lhasa · Maltese · start immunosuppression urgently if < 30 ×10⁹/L', tone: 'danger' },
            { label: 'Secondary immune-mediated', sublabel: 'Triggered by inflammation · neoplasia · infection', tone: 'warning' },
          ]}],
        },
        {
          header: 'Drug-induced',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Drug-induced thrombocytopenia', sublabel: 'Furosemide · H2 antagonists · cephalosporins · penicillins · TMP-SMX · quinines · phenylbutazone · cardiac medications', tone: 'warning' },
          ]}],
        },
        {
          header: 'Infectious',
          tone: 'orange',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Tick-borne', sublabel: 'Ehrlichiosis · babesiosis · rickettsiosis · anaplasmosis · borreliosis', tone: 'orange' },
            { label: 'Viral', sublabel: 'Distemper · parvovirus · adenovirus · herpesvirus · FeLV · panleukopenia · FIV · FIP', tone: 'neutral' },
            { label: 'Protozoal / fungal', sublabel: 'Leishmaniasis · cytauxzoonosis · histoplasmosis · candidiasis · haemobartonellosis', tone: 'neutral' },
            { label: 'Other', sublabel: 'Dirofilariasis · leptospirosis · septicaemia', tone: 'neutral' },
          ]}],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── Thrombopathia (normal count) ──────────────────────────────────────────────
const bleedingThrombopathia: FlowPage = {
  id: 'bleeding-thrombopathia',
  title: 'Bleeding — Thrombopathia',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'green', text: 'THROMBOPATHIA — PLATELET FUNCTION DEFECT' },
    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Pattern:</strong> Normal platelet count · BMBT prolonged · PT and aPTT normal. Platelets are present but cannot aggregate or adhere normally.',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'Inherited',
          tone: 'green',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'von Willebrand Disease', tone: 'green', link: { to: 'disease', id: 'DIS-BD-VWD' } },
            { label: "Glanzmann's Thrombasthenia", tone: 'green', link: { to: 'disease', id: 'DIS-BD-TPATH' } },
          ]}],
        },
        {
          header: 'Acquired',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Drug-induced', tone: 'warning', link: { to: 'disease', id: 'DIS-BD-TPATH' } },
            { label: 'Uraemia', tone: 'warning', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Dysproteinaemia', tone: 'warning', link: { to: 'disease', id: 'DIS-NEO-MM' } },
            { label: 'Hepatic failure', tone: 'warning', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
          ]}],
        },
      ],
    },
    { kind: 'disclaimer' },
  ],
}

// ── Immune-mediated platelet dysfunction (normal count) ───────────────────────
const bleedingImmunePlt: FlowPage = {
  id: 'bleeding-immune-plt',
  title: 'Bleeding — Immune-mediated (Normal Count)',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: 'IMMUNE-MEDIATED — NORMAL PLATELET COUNT' },
    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Mechanism:</strong> Immune complexes or autoantibodies impair platelet function without sufficient destruction to cause thrombocytopenia — platelet count may be low-normal or borderline.',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'Multi-system immune disease',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Evans Syndrome', sublabel: 'Concurrent IMHA + IMTP — check PCV and platelet count together · Coombs + · respond to immunosuppression', tone: 'warning' },
            { label: 'SLE', sublabel: 'Systemic lupus — ANA positive · polyarthritis · skin lesions · immune complex deposition on vessel walls and platelets', tone: 'warning' },
            { label: 'Antiphospholipid syndrome', sublabel: 'Thrombosis + thrombocytopenia — paradoxical bleeding from thrombocytopenia despite prothrombotic state', tone: 'warning' },
          ]}],
        },
        {
          header: 'Secondary immune activation',
          tone: 'orange',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Infectious trigger', sublabel: 'Ehrlichiosis · FIP · Mycoplasma haemofelis in cats — immune complex deposition → platelet dysfunction', tone: 'orange' },
            { label: 'Neoplasia-associated', sublabel: 'Lymphoma · HSA — tumour antigens trigger immune complex formation', tone: 'orange' },
          ]}],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 14,
      title: 'DIAGNOSTICS',
      html: '<strong style="color:var(--white);">ANA titre</strong> — SLE screen<br><strong style="color:var(--white);">Coombs test</strong> — Evans syndrome<br><strong style="color:var(--white);">Tick-borne titres</strong> — Ehrlichia, Anaplasma, Rickettsia<br><strong style="color:var(--white);">Serum protein electrophoresis</strong> — paraprotein<br><strong style="color:var(--white);">Bone marrow</strong> — if count borderline and cause unclear',
    },
    { kind: 'disclaimer' },
  ],
}

export const bleedingFlows: FlowPage[] = [
  bleedingEntry,
  bleedingPrimary,
  bleedingSecondary,
  bleedingDic,
  bleedingVasc,
  bleedingProd,
  bleedingConsump,
  bleedingDest,
  bleedingThrombopathia,
  bleedingImmunePlt,
]
