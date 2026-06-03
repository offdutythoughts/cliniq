// ── Bleeding / Petechiae / Ecchymoses flowchart (data) ──────────────────────
// Migration of bleedingFlowHtml (src/lib/signs/bleeding.ts) + the inline
// sub-flows renderBleedingFlowPrimary / Secondary / DIC / Vasc (cliniqApp.ts)
// to the FlowPage model. Visible text is transcribed byte-identically from the
// legacy source — see the parity gate in DATA_MIGRATION.md.
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
      <div style="font-size:9px;font-weight:600;color:#93C5FD;letter-spacing:.03em;">YES — cavity / deep bleed</div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.4);font-size:10px;font-weight:700;color:#93C5FD;">
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
          <div style="font-size:9px;font-weight:600;color:#FCD34D;">YES</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-node" style="width:100%;background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.4);font-size:9.5px;font-weight:700;color:#FCD34D;">
            LIKELY MIXED
          </div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-node sub-step" style="width:100%;font-size:9px;">Severe systemic<br>illness present?</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;width:100%;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div style="font-size:8px;font-weight:600;color:#FCA5A5;">YES</div>
              <div class="flow-arrow-v" style="font-size:10px;">↓</div>
              <div class="flow-endpoint" style="background:rgba(220,38,38,0.12);border:1.5px solid rgba(220,38,38,0.4);color:#FCA5A5;font-size:9px;cursor:pointer;text-align:center;" onclick="renderFlowId('bleeding-dic')">
                ⚡ DIC<br>
                <span style="opacity:.75;font-size:8px;">Treat urgently ›</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div style="font-size:8px;font-weight:600;color:var(--gray2);">NO</div>
              <div class="flow-arrow-v" style="font-size:10px;">↓</div>
              <div class="flow-endpoint" style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.3);color:#FCD34D;font-size:8.5px;cursor:pointer;text-align:center;" onclick="renderFlowId('bleeding-secondary')">
                Concurrent<br>primary +<br>secondary ›
              </div>
            </div>
          </div>
        </div>

        <!-- Q2a NO → Pure secondary -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
          <div style="font-size:9px;font-weight:600;color:var(--gray2);">NO</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-endpoint" style="background:rgba(37,99,235,0.1);border:1.5px solid rgba(37,99,235,0.35);color:#93C5FD;font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-secondary')">
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

      <!-- Q2b -->
      <div class="flow-node sub-step" style="width:100%;font-size:10px;">Petechiae /<br>ecchymoses?</div>
      <div class="flow-arrow-v">↓</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
        <!-- YES → PRIMARY -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
          <div style="font-size:9px;font-weight:600;color:#FCA5A5;">YES</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:#FCA5A5;font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-primary')">
            🧱 PRIMARY<br>
            <span style="opacity:.75;font-size:8px;">Platelet · vWF ›</span>
          </div>
        </div>
        <!-- NO → VASCULOPATHY -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
          <div style="font-size:9px;font-weight:600;color:var(--gray2);">NO</div>
          <div class="flow-arrow-v" style="font-size:11px;">↓</div>
          <div class="flow-endpoint" style="background:rgba(139,92,246,0.1);border:1.5px solid rgba(139,92,246,0.35);color:#C4B5FD;font-size:9px;cursor:pointer;width:100%;text-align:center;" onclick="renderFlowId('bleeding-vasc')">
            🌐 VASCULO-<br>PATHY<br>
            <span style="opacity:.75;font-size:8px;">Vessel wall ›</span>
          </div>
        </div>
      </div>
    </div>

  </div>`,
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT FIRST',
      items: [
        '<strong onclick="renderDiseasePage(\'DIS-BD-ROD\')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide</strong> — PT prolongs first; Vit K1 SC now, confirm later (acts in 6–12 h — transfuse for active bleeds)',
        '<strong onclick="renderDiseasePage(\'DIS-BD-DIC\')" style="cursor:pointer;text-decoration:underline;">DIC</strong> — petechiae + cavity bleed + systemic illness → ≥ 3 of 5 abnormal; treat cause urgently. <em>Dogs bleed (haemorrhagic phenotype); cats clot (thrombotic phenotype, ~7 % survival).</em>',
        '<strong>Haemoperitoneum</strong> (HSA rupture) — collapse + pale gums → emergency surgery',
        '<strong onclick="renderDiseasePage(\'DIS-BD-IMTP\')" style="cursor:pointer;text-decoration:underline;">IMTP</strong> platelet &lt;30 ×10⁹/L — start immunosuppression urgently',
      ],
    },

    // FLAGGED html: the 🐕 vs 🐱 dog/cat species-difference matrix. A typed
    // speciesCompare block exists but is NOT yet rendered (per the task), so
    // this 2-column DOG/CAT grid stays as a raw-html escape hatch. Verbatim.
    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:10px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:100%;">
    <div style="font-size:10px;font-weight:700;color:#A5B4FC;margin-bottom:5px;">🐕 vs 🐱 KEY SPECIES DIFFERENCES</div>
    <div style="font-size:9px;line-height:1.5;color:#C7D2FE;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;">
        <div><strong style="color:#60A5FA;">DOG</strong></div><div><strong style="color:#FB923C;">CAT</strong></div>
        <div>DIC: haemorrhagic; ~78 % survive nonovert · ~38 % survive overt</div><div>DIC: <strong>thrombotic phenotype</strong> dominates; bleeding rare; ~7 % survival</div>
        <div>IMTP: common; primary form predominates; F &gt; M 2:1</div><div>IMTP: rare (~3 % of feline thrombocytopenia) — almost always secondary (FeLV/FIV, lymphoma, FIP, Mycoplasma haemofelis)</div>
        <div>Babesia: <em>B. canis</em> (large) → imidocarb; <em>B. gibsoni</em> (small) → atovaquone + azithromycin</div><div>Babesia: <em>B. felis</em> (Africa); FeLV/FIV co-infection in ~46 %; <strong>primaquine ≤0.5 mg/kg</strong> (toxic ≥1 mg/kg)</div>
        <div>Snake envenomation: rapid presentation; pigmenturia common</div><div>Snake envenomation: <strong>delayed</strong> (cats hide); pulmonary pooling of killing fraction; pigmenturia less common</div>
        <div>Inherited coagulopathy: vWD, haemophilia A/B, factor VII (Beagle)</div><div>Inherited coagulopathy: <strong>Factor XII (Hageman) deficiency</strong> — most common feline; Birman, Siamese, DSH — <strong>asymptomatic</strong>; isolated prolonged aPTT</div>
        <div>Drug list: azathioprine OK</div><div>Drug list: <strong>NEVER azathioprine</strong> (myelotoxic); methimazole can cause thrombocytopenia</div>
        <div>D-dimer 75–100 % sensitive for DIC</div><div>D-dimer ~67 % sens / 56 % spec; <strong>ATIII unreliable</strong></div>
      </div>
    </div>
  </div>`,
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'DIC', link: { to: 'disease', id: 'DIS-BD-DIC' } },
        { label: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' } },
        { label: 'Vitamin K deficiency (broad)', link: { to: 'disease', id: 'DIS-BD-VITK' } },
        { label: 'Immune-mediated thrombocytopenia', link: { to: 'disease', id: 'DIS-BD-IMTP' } },
        { label: 'Thrombocytopenia (broad)', link: { to: 'disease', id: 'DIS-BD-TCP' } },
        { label: 'Thrombocytopathia', link: { to: 'disease', id: 'DIS-BD-TPATH' } },
        { label: 'Infectious cyclic thrombocytopenia', link: { to: 'disease', id: 'DIS-BD-ICT' } },
        { label: 'Ehrlichiosis (CME)', link: { to: 'disease', id: 'DIS-BD-EHRL' } },
        { label: 'Babesiosis', link: { to: 'disease', id: 'DIS-BD-BABS' } },
        { label: 'Immune-mediated haemolytic anaemia', link: { to: 'disease', id: 'DIS-BD-IMHA' } },
        { label: 'von Willebrand disease', link: { to: 'disease', id: 'DIS-BD-VWD' } },
        { label: 'Haemophilia A (FVIII)', link: { to: 'disease', id: 'DIS-BD-HEMA' } },
        { label: 'Haemophilia B (FIX)', link: { to: 'disease', id: 'DIS-BD-HEMB' } },
        { label: 'Haemophilia C (FXI)', link: { to: 'disease', id: 'DIS-BD-HEMC' } },
        { label: 'Factor X deficiency', link: { to: 'disease', id: 'DIS-BD-FX' } },
        { label: 'Factor II deficiency', link: { to: 'disease', id: 'DIS-BD-FII' } },
        { label: 'Factor VII deficiency', link: { to: 'disease', id: 'DIS-BD-FVII' } },
        { label: 'Factor XII deficiency (feline)', link: { to: 'disease', id: 'DIS-BD-FXII' } },
        { label: 'Snake / spider envenomation', link: { to: 'disease', id: 'DIS-BD-ENV' } },
        { label: 'Cutaneous vasculitis', link: { to: 'disease', id: 'DIS-BD-VASC' } },
        { label: 'CRGV / Alabama rot', link: { to: 'disease', id: 'DIS-BD-CRGV' } },
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

    // FLAGGED html: the two-pathway split. LEFT = thrombocytopenic (LOW <50)
    // with a 3-column platelet-mechanism sub-grid (↓ Production / Consumption &
    // Sequestration / Destruction) carrying per-column arrows + labels; RIGHT =
    // normal-count BMBT branch. The asymmetric 3fr:2fr top grid + nested
    // 3-col / mini-label structure has no typed-block equivalent. Verbatim.
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;width:100%;">

      <!-- Thrombocytopenic -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node" style="width:100%;background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.4);font-size:10.5px;font-weight:700;color:#FCA5A5;text-align:center;">
          LOW &lt; 50 ×10⁹/L<br>
          <span style="font-size:9px;font-weight:400;color:var(--gray);">Thrombocytopenic</span>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;text-align:center;">IDENTIFY MECHANISM</div>
        <div class="flow-arrow-v">↓</div>

        <!-- 3-way branch labels -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;width:100%;">
          <div style="font-size:8px;font-weight:700;color:#F87171;text-align:center;">↓ PRODUCTION</div>
          <div style="font-size:8px;font-weight:700;color:#FCA5A5;text-align:center;">CONSUMPTION &amp; SEQUESTRATION</div>
          <div style="font-size:8px;font-weight:700;color:#FCA5A5;text-align:center;">DESTRUCTION</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;width:100%;">
          <div style="font-size:9px;text-align:center;color:#F87171;">↓</div>
          <div style="font-size:9px;text-align:center;color:#FCA5A5;">↓</div>
          <div style="font-size:9px;text-align:center;color:#FCA5A5;">↓</div>
        </div>

        <!-- 3 endpoint columns -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;width:100%;align-items:start;">

          <!-- ↓ Production -->
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:#FCA5A5;font-size:8.5px;">
            <em style="opacity:.85;">Primary:</em><br>
            Neoplasia · immune-mediated · fibrosis · myelophthisis<br><br>
            <em style="opacity:.85;">Drug-induced:</em><br>
            Chloramphenicol · oestrogen · bleomycin · lomustine · cytarabine · melphalan · methotrexate · platinum · doxorubicin · actinomycin D<br><br>
            <em style="opacity:.85;">Secondary:</em><br>
            FeLV · ehrlichiosis · hypothyroidism<br><br>
            <span style="opacity:.6;">→ BM aspirate + core if other cell lines also affected</span>
          </div>

          <!-- Consumption & Sequestration -->
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:#FCA5A5;font-size:8.5px;">
            Significant haemorrhage · splenomegaly · sepsis · vasculitis · DIC<br><br>
            <span style="opacity:.6;">DIC: early thrombosis → late haemorrhage; PT + aPTT both prolonged</span>
          </div>

          <!-- Destruction -->
          <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:#FCA5A5;font-size:8.5px;">
            <em style="opacity:.85;">Drug-induced:</em><br>
            Furosemide · H2 antagonists · cephalosporins · penicillins · TMP-SMX · quinines · phenylbutazone · cardiac medications<br><br>
            <em style="opacity:.85;">Primary (IMTP):</em><br>
            Antibodies vs platelet antigens — #1 cause dog<br>Cocker · Poodle · OES · Lhasa · Maltese<br><br>
            <em style="opacity:.85;">Secondary:</em><br>
            Inflammation · neoplasia<br><br>
            <em style="opacity:.85;">Infectious:</em><br>
            Distemper · parvovirus · adenovirus · herpesvirus · FeLV · panleukopenia · FIV · FIP · ehrlichiosis · babesiosis · haemobartonellosis · rickettsiosis · leishmaniasis · cytauxzoonosis · borreliosis · dirofilariasis · histoplasmosis · candidiasis · leptospirosis · septicaemia
          </div>

        </div>
      </div>

      <!-- Normal count -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div class="flow-node" style="width:100%;background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.4);font-size:10.5px;font-weight:700;color:#6EE7B7;text-align:center;">
          NORMAL COUNT<br>
          <span style="font-size:9px;font-weight:400;color:var(--gray);">Thrombocytopathy / vWD</span>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Check BMBT<br>(buccal mucosal bleed time)</div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node" style="width:100%;background:rgba(245,158,11,0.1);border-color:rgba(245,158,11,0.3);font-size:9.5px;color:var(--amber-text);">
          <strong>BMBT prolonged &gt; 4 min</strong><br>
          <span style="opacity:.8;">Abnormal platelet function, vWD, or vasculitis</span>
        </div>
        <div class="flow-arrow-v">↓</div>

        <div style="display:flex;flex-direction:column;gap:5px;width:100%;">
          <div class="flow-endpoint" style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#6EE7B7;font-size:9px;">
            <strong>von Willebrand Disease</strong><br>
            <span style="opacity:.75;">Dobermann (type I) · Scottie (type III) · Shetland · GSD · cats rarely<br>Send vWF activity assay<br>Pre-op: DDAVP 1 µg/kg SC 30 min before (type I only)</span>
          </div>
          <div class="flow-endpoint" style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#6EE7B7;font-size:9px;">
            <strong>Uraemia</strong><br>
            <span style="opacity:.75;">Acquired platelet dysfunction — reversible with dialysis / desmopressin</span>
          </div>
          <div class="flow-endpoint" style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#6EE7B7;font-size:9px;">
            <strong>Drug-induced</strong><br>
            <span style="opacity:.75;">Aspirin · NSAIDs · clopidogrel</span>
          </div>
          <div class="flow-endpoint" style="background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#6EE7B7;font-size:9px;">
            <strong>Glanzmann's Thrombasthenia</strong><br>
            <span style="opacity:.75;">GRT · Otterhound — breed-linked<br>No platelet aggregation</span>
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
          '<div style="font-weight:700;color:#FCD34D;line-height:1.3;">PT ↑ only</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">aPTT normal</div>',
          '<strong style="color:#FCD34D;">Anticoagulant rodenticide</strong> — early (factor VII depletes first) · Vit K1 2.5 mg/kg SC<br><strong style="color:#FCD34D;">Factor VII deficiency</strong> — congenital; Beagle, Malamute',
        ],
        [
          '<div style="font-weight:700;color:#A5B4FC;line-height:1.3;">aPTT ↑ only</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">PT normal</div>',
          '<strong style="color:#A5B4FC;">Haemophilia A</strong> — factor VIII deficiency; X-linked; males affected<br><strong style="color:#A5B4FC;">Haemophilia B</strong> — factor IX deficiency; Cairn terrier<br><strong style="color:#A5B4FC;">Factor XII deficiency</strong> — cats; usually non-bleeding phenotype',
        ],
        [
          '<div style="font-weight:700;color:#FCA5A5;line-height:1.3;">PT ↑ + aPTT ↑</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">Both prolonged</div>',
          '<strong style="color:#FCA5A5;">Rodenticide (advanced)</strong> — multiple factors depleted; Vit K1 urgently<br><strong style="color:#FCA5A5;">Hepatic failure</strong> — reduced factor synthesis; check ALT · bilirubin · albumin<br><strong style="color:#FCA5A5;">DIC</strong> — thrombocytopenia concurrent → confirm FDPs / D-dimer<br><strong style="color:#FCA5A5;">Multi-factor deficiency</strong> — congenital; rare; send mixing studies',
        ],
        [
          '<div style="font-weight:700;color:#6EE7B7;line-height:1.3;">PT + aPTT normal</div><div style="color:var(--gray);font-size:9px;margin-top:2px;">Coags intact</div>',
          '<strong style="color:#6EE7B7;">Vascular rupture / trauma</strong> — HSA · surgical complication · arterial<br><strong style="color:#6EE7B7;">Factor XIII deficiency</strong> — not measured by PT/aPTT; clot unstable in 5M urea',
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
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚡ DIC — DISSEMINATED INTRAVASCULAR COAGULATION', connectAfter: false },

    // FLAGGED html: the "ALWAYS SECONDARY" banner is a custom 2px-border centred
    // box (font-weight:800), NOT a standard `banner` strip — kept as html so the
    // exact box styling is preserved. Includes its own surrounding arrows.
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="width:100%;padding:11px 13px;background:rgba(220,38,38,0.12);border:2px solid rgba(220,38,38,0.45);border-radius:10px;text-align:center;">
      <div style="font-size:11px;font-weight:800;color:#FCA5A5;letter-spacing:.03em;">DIC IS ALWAYS SECONDARY TO SEVERE UNDERLYING DISEASE</div>
      <div style="font-size:9px;color:var(--gray);margin-top:3px;">Finding the trigger is the priority — DIC will not resolve without treating the cause</div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    { kind: 'node', variant: 'step', text: 'CLINICAL SIGNS', connectAfter: false },

    // Two-column Haemorrhagic | Systemic/thrombotic clinical-signs panel. No
    // typed two-column callout-pair block exists; kept as html (no links).
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <div style="padding:9px 11px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.3);border-radius:9px;">
        <div style="font-size:9.5px;font-weight:700;color:#FCA5A5;margin-bottom:5px;">🩸 Haemorrhagic</div>
        <div style="font-size:9px;color:var(--gray);line-height:1.8;">
          Petechiae / ecchymoses<br>
          Epistaxis · haematuria<br>
          Melaena<br>
          Cavity bleeding (haemoabdomen · haemothorax)<br>
          Oozing from venepuncture sites
        </div>
      </div>
      <div style="padding:9px 11px;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.3);border-radius:9px;">
        <div style="font-size:9.5px;font-weight:700;color:#C4B5FD;margin-bottom:5px;">🫀 Systemic / thrombotic</div>
        <div style="font-size:9px;color:var(--gray);line-height:1.8;">
          Collapse · profound weakness<br>
          Pale / white / grey MMs<br>
          Tachycardia · weak pulses<br>
          Hypothermia (severe shock)<br>
          Acute hindlimb paresis (feline ATE)<br>
          Dyspnoea (PTE)
        </div>
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    { kind: 'node', variant: 'step', text: 'TOP CAUSES', connectAfter: false },

    // Two-column 🐕 Canine | 🐈 Feline causes panel (each with an italic
    // phenotype footer). No typed equivalent; kept as html (no links).
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <div style="padding:9px 11px;background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.3);border-radius:9px;">
        <div style="font-size:9.5px;font-weight:700;color:#93C5FD;margin-bottom:5px;">🐕 Canine</div>
        <div style="font-size:9px;color:var(--gray);line-height:1.8;">
          Haemangiosarcoma (splenic / hepatic)<br>
          Sepsis — pyometra · GDV · peritonitis<br>
          IMHA<br>
          Severe pancreatitis<br>
          Heat stroke<br>
          Snake envenomation<br>
          Major trauma
        </div>
        <div style="font-size:8px;color:var(--gray);opacity:.7;margin-top:5px;font-style:italic;">Haemorrhagic phenotype · ~78 % survive non-overt · ~38 % overt</div>
      </div>
      <div style="padding:9px 11px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.3);border-radius:9px;">
        <div style="font-size:9.5px;font-weight:700;color:#D8B4FE;margin-bottom:5px;">🐈 Feline</div>
        <div style="font-size:9px;color:var(--gray);line-height:1.8;">
          FIP<br>
          Lymphoma<br>
          Sepsis — pyothorax · urinary sepsis<br>
          Cytauxzoonosis<br>
          Severe pancreatitis / triaditis<br>
          Cardiomyopathy<br>
          Neoplasia (various)
        </div>
        <div style="font-size:8px;color:var(--gray);opacity:.7;margin-top:5px;font-style:italic;">Thrombotic phenotype · minimal external bleeding · ~7 % survival</div>
      </div>
    </div>`,
    },

    // Emergency protocol button → renderProtoDetail('PROT-BLEED-DIC'). The
    // legacy is a custom large clickable banner, not a dxRow/diseaseGrid; kept
    // as html with the onclick preserved verbatim.
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <div onclick="renderProtoDetail('PROT-BLEED-DIC')" style="cursor:pointer;width:100%;padding:13px 14px;background:rgba(220,38,38,0.15);border:2px solid rgba(220,38,38,0.5);border-radius:11px;text-align:center;">
      <div style="font-size:12px;font-weight:800;color:#FCA5A5;letter-spacing:.03em;">⚡ THIS IS AN EMERGENCY</div>
      <div style="font-size:10px;color:#FECACA;margin-top:4px;font-weight:600;">→ Open DIC Emergency Protocol</div>
      <div style="font-size:8.5px;color:var(--gray);margin-top:3px;">FFP · heparin · serial monitoring · treat the cause</div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Vasculopathy ─────────────────────────────────────────────────────────────
const bleedingVasc: FlowPage = {
  id: 'bleeding-vasc',
  title: 'Bleeding — Vasculopathy',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'violet', text: '🌐 VASCULOPATHY / VASCULITIS', connectAfter: false },

    // Rendered as html (not a typed step `node`) so the <em>normal</em> italic
    // in the sub-line is preserved — the typed node sub field is text-escaped.
    // Includes the surrounding connector arrows.
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <div class="flow-node step">RECOGNISE THE PATTERN
      <div class="fn-sub" style="font-weight:400;margin-top:3px;">Bleeding from vessel wall disease — platelets and coagulation profile are <em>normal</em></div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    { kind: 'node', variant: 'sub-step', text: 'LESION DISTRIBUTION', connectAfter: false },

    // FLAGGED html: the violet col()/chip lesion-distribution grid (three
    // 2-col rows of self-contained header+↓+chip units). It is NOT a CAT_STYLE
    // categoryColumns grid (uniform violet, custom 1fr:1fr rows), and crucially
    // its chips call renderLesionDetail('LES-…') for which there is NO typed
    // Link (the only lesion Link is goLesionTab → a different handler). The
    // renderDiseasePage chips are also embedded. Kept verbatim with all
    // onclick handlers (renderLesionDetail / renderDiseasePage) preserved.
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

    <div style="display:flex;flex-direction:column;align-items:stretch;gap:0;">
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.35);border-radius:8px;padding:7px 8px;font-size:9px;font-weight:700;color:#C4B5FD;text-align:center;line-height:1.35;">Ear pinna / distal extremity — necrotic ulcers</div>
      <div style="color:#C4B5FD;text-align:center;font-size:11px;line-height:1;padding:3px 0;">↓</div>
      <div style="display:flex;flex-direction:column;gap:3px;"><div onclick="renderLesionDetail('LES-BD-VS-VASC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Cutaneous vasculitis</div><div onclick="renderLesionDetail('LES-BD-VS-CRGV')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">CRGV / Alabama rot</div><div onclick="renderLesionDetail('LES-BD-VS-LH')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Lhasa Apso vasculopathy</div><div onclick="renderDiseasePage('DIS-INFECT-EHRLICH')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Ehrlichiosis</div><div onclick="renderDiseasePage('DIS-INFECT-RMSF')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">RMSF</div></div>
    </div>

    <div style="display:flex;flex-direction:column;align-items:stretch;gap:0;">
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.35);border-radius:8px;padding:7px 8px;font-size:9px;font-weight:700;color:#C4B5FD;text-align:center;line-height:1.35;">Paw pads — ulcers, necrosis, sloughing</div>
      <div style="color:#C4B5FD;text-align:center;font-size:11px;line-height:1;padding:3px 0;">↓</div>
      <div style="display:flex;flex-direction:column;gap:3px;"><div onclick="renderLesionDetail('LES-BD-VS-CRGV')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">CRGV / Alabama rot</div><div onclick="renderLesionDetail('LES-BD-VS-VASC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Cutaneous vasculitis</div><div onclick="renderDiseasePage('DIS-INFECT-EHRLICH')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Ehrlichiosis</div><div onclick="renderDiseasePage('DIS-INFECT-LEISHM')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Leishmaniasis</div></div>
    </div>
    </div>

    <div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

    <div style="display:flex;flex-direction:column;align-items:stretch;gap:0;">
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.35);border-radius:8px;padding:7px 8px;font-size:9px;font-weight:700;color:#C4B5FD;text-align:center;line-height:1.35;">Skin — purpura, necrotic plaques, pitting oedema</div>
      <div style="color:#C4B5FD;text-align:center;font-size:11px;line-height:1;padding:3px 0;">↓</div>
      <div style="display:flex;flex-direction:column;gap:3px;"><div onclick="renderLesionDetail('LES-BD-VS-VASC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Cutaneous vasculitis</div><div onclick="renderDiseasePage('DIS-INFECT-LEPTO')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Leptospirosis</div><div onclick="renderDiseasePage('DIS-INFECT-RMSF')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">RMSF</div><div onclick="renderDiseasePage('DIS-INFECT-EHRLICH')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Ehrlichiosis</div><div onclick="renderDiseasePage('DIS-INFECT-FIP')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">FIP (cat)</div><div onclick="renderDiseasePage('DIS-SEC-CKD')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Uraemic vasculopathy</div><div onclick="renderDiseasePage('DIS-VASC-HYPERVSC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Hyperglobulinaemia</div></div>
    </div>

    <div style="display:flex;flex-direction:column;align-items:stretch;gap:0;">
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.35);border-radius:8px;padding:7px 8px;font-size:9px;font-weight:700;color:#C4B5FD;text-align:center;line-height:1.35;">Retinal haemorrhage / detachment</div>
      <div style="color:#C4B5FD;text-align:center;font-size:11px;line-height:1;padding:3px 0;">↓</div>
      <div style="display:flex;flex-direction:column;gap:3px;"><div onclick="renderDiseasePage('DIS-VASC-HYPERT')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Systemic hypertension</div><div onclick="renderDiseasePage('DIS-VASC-HYPERVSC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Hyperglobulinaemia</div><div onclick="renderDiseasePage('DIS-INFECT-EHRLICH')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">Ehrlichiosis</div></div>
    </div>
    </div>

    <div class="flow-arrow-v">↓</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

    <div style="display:flex;flex-direction:column;align-items:stretch;gap:0;">
      <div style="background:rgba(139,92,246,0.12);border:1.5px solid rgba(139,92,246,0.35);border-radius:8px;padding:7px 8px;font-size:9px;font-weight:700;color:#C4B5FD;text-align:center;line-height:1.35;">Easy bruising at venepuncture / GI haemorrhage</div>
      <div style="color:#C4B5FD;text-align:center;font-size:11px;line-height:1;padding:3px 0;">↓</div>
      <div style="display:flex;flex-direction:column;gap:3px;"><div onclick="renderDiseasePage('DIS-PUPD-HAC')" style="cursor:pointer;background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.35);border-radius:6px;padding:3px 8px;font-size:9px;color:#C4B5FD;text-align:center;">HAC / iatrogenic steroids</div></div>
    </div>
      <div></div>
    </div>`,
    },

    {
      kind: 'callout',
      tone: 'violet',
      gap: 14,
      title: '🔬 DIAGNOSTICS — Vasculopathy',
      html: '<strong style="color:var(--white);">Blood pressure</strong> — mandatory; Doppler or oscillometric<br><strong style="color:var(--white);">Tick-borne titres</strong> — Ehrlichia, Rickettsia, Anaplasma<br><strong style="color:var(--white);">Leptospira MAT</strong> — paired titres; PCR urine if acute<br><strong style="color:var(--white);">Serum protein electrophoresis</strong> — if hyperglobulinaemia<br><strong style="color:var(--white);">Skin biopsy</strong> — deep wedge from leading edge of lesion; neutrophilic / lymphocytic vasculitis pattern confirms<br><strong style="color:var(--white);">CBC + chem + UA</strong> — CKD, inflammatory pattern',
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
]
