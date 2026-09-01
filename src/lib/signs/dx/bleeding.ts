// ── Bleeding / Petechiae / Ecchymoses — diagnostic approach (data) ──────────
// Migration of bleedingDx{History,Exam,Dx}Html (legacy HTML consts in
// ../bleeding.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const bleedingDx: DxApproach = {
  title: 'Bleeding / Petechiae / Ecchymoses',
  tabs: {

  history: {
    title: 'History: Bleeding',
    blocks: [
      { kind: 'branch', text: 'CHARACTERISE THE BLEEDING PATTERN' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">🧱 Primary haemostasis pattern</strong><br>
      Petechiae · ecchymoses<br>
      Mucosal bleeds: gums, epistaxis, GI, haematuria<br>
      Prolonged surface bleeding from minor wounds<br>
      <span style="opacity:.75;">→ Platelets, vWF, vessels</span>`,
          },
          {
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">🔗 Secondary haemostasis pattern</strong><br>
      Cavity bleeds (haemothorax, haemoperitoneum, haemarthrosis)<br>
      Deep haematomas after minor trauma<br>
      Delayed bleeding after surgery<br>
      <span style="opacity:.75;">→ Coagulation factors / cascade</span>`,
          },
        ],
      },
      { kind: 'step', text: '📋 ONSET + PROGRESSION' },
      {
        kind: 'check',
        html: `<strong>Peracute (hours):</strong> trauma, splenic / hepatic mass rupture (HSA, hepatocellular ca), severe coagulopathy (rodenticide overdose, snake envenomation), heatstroke-induced DIC.<br>
    <strong>Acute (days):</strong> IMTP onset, rodenticide intoxication, acute sepsis with DIC, IMHA-related secondary DIC, acute liver failure.<br>
    <strong>Subacute (weeks):</strong> tick-borne disease (Ehrlichia, Anaplasma, Babesia — anaemia + thrombocytopenia + ± neuro), chronic hepatic disease, occult neoplasia with DIC, intermittent IMTP relapse.<br>
    <strong>Chronic / lifelong:</strong> inherited coagulopathies (haemophilia A — factor VIII; haemophilia B — factor IX; vWD types I–III), thrombocytopathies (Glanzmann, Scott syndrome), heritable vasculopathies.<br><br>
    <strong>Episodic recurrent bleeding from puppyhood</strong> → inherited factor deficiency or vWD — type history of bleeding from umbilicus, deciduous tooth eruption, neutering surgery.`,
      },
      { kind: 'step', text: '💊 DRUG / TOXIN / EXPOSURE HISTORY' },
      {
        kind: 'check',
        html: `<strong>Anticoagulants / rodenticides:</strong> warfarin, brodifacoum, bromadiolone, difenacoum (2nd-generation — last weeks). Bait colour: turquoise, pink, green — variable.<br>
    <strong>Antiplatelet drugs:</strong> aspirin, clopidogrel, NSAIDs (carprofen, meloxicam — at supratherapeutic doses).<br>
    <strong>Cytotoxic chemotherapy:</strong> vincristine, doxorubicin → thrombocytopenia.<br>
    <strong>Snake / spider envenomation:</strong> rattlesnake (combined primary + secondary defect), Australian elapids (procoagulant + neurotoxic), brown recluse / Latrodectus.<br>
    <strong>Acetaminophen / paracetamol (cat especially):</strong> Heinz-body haemolytic anaemia → haemoglobinuria (NOT true bleeding).<br>
    <strong>Heparin / dabigatran / rivaroxaban:</strong> deliberate or accidental.<br>
    <strong>Plant toxins:</strong> moldy sweet clover hay (Melilotus — dicoumarol; primarily a livestock toxicity but anecdotally reported in dogs), bracken (thrombocytopenia in livestock), foxglove (cardiac).<br>
    <strong>Heat / environmental:</strong> heatstroke → DIC.<br>
    <strong>Recent vaccinations:</strong> rare association with immune-mediated thrombocytopenia.`,
      },
      { kind: 'step', text: '🩺 SYSTEMIC / FAMILY / BREEDING HISTORY' },
      {
        kind: 'check',
        html: `<strong>Family / breed history:</strong>
    <div style="margin-left:8px;">
      • Doberman, Sheltie, Golden Retriever, Scottish Terrier → vWD (Doberman type I; Scottie type III is most severe)<br>
      • German Shepherd → haemophilia A (factor VIII)<br>
      • Boxer, Cairn Terrier → factor VIII or factor IX<br>
      • Otterhound → Glanzmann thrombasthenia<br>
      • Beagle → factor VII deficiency (usually asymptomatic)<br>
      • Breed-predisposed cutaneous vasculitis: GSD (familial cutaneous vasculopathy), Jack Russell, Greyhound, Scottish Terrier, Saint Bernard, Shar-Pei
    </div>
    <strong>Concurrent illness:</strong> sepsis, neoplasia, IMHA, severe pancreatitis, parvoviral enteritis → DIC risk.<br>
    <strong>Hyperestrogenism in older intact male dog</strong> (Sertoli cell tumour): symmetrical alopecia + gynaecomastia + bilateral pendulous abdomen + bone marrow suppression → thrombocytopenia + non-regenerative anaemia + bleeding.<br>
    <strong>Travel + tick exposure:</strong> Ehrlichia / Anaplasma / Babesia / Rickettsia → thrombocytopenia + immune-mediated bleeding.<br>
    <strong>Geographic:</strong> Leishmania (Mediterranean / imported), Crotalus envenomation, brown recluse spider.<br>
    <strong>Concurrent jaundice + bleeding:</strong> hepatic failure (factors II, VII, IX, X, fibrinogen all hepatically produced).<br>
    <strong>Concurrent uraemia + bleeding:</strong> uraemic platelet dysfunction → primary haemostatic defect despite normal counts.<br>
    <strong>Previous transfusion / blood products:</strong> alloimmunisation, post-transfusion purpura (rare).`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:var(--tone-danger-fg);">Cocker Spaniel, Poodle, OES, Lhasa Apso, Maltese</strong><br>→ Idiopathic IMTP.<br><br>
        <strong style="color:var(--tone-warning-fg);">Doberman</strong> → vWD type I (mild–moderate). Pre-op test essential before any surgery.<br><br>
        <strong style="color:var(--tone-green-fg);">Scottish Terrier, Shetland</strong> → vWD type III (most severe; spontaneous bleeding).<br><br>
        <strong style="color:var(--tone-violet-fg);">GSD</strong> → haemophilia A (factor VIII, X-linked).<br><br>
        <strong style="color:var(--tone-danger-fg);">Splenic / hepatic HSA in middle-aged–older large breed</strong> (GSD, Goldie, Lab, Pointer) → acute haemoperitoneum + collapse + pale gums.<br><br>
        <strong style="color:var(--tone-warning-fg);">Older intact male</strong> → Sertoli cell tumour with hyperestrogenism → bone marrow suppression → pancytopenia + bleeding.<br><br>
        <strong style="color:var(--tone-info-fg);">Cocker, Springer</strong> → familial vasculopathy (idiopathic cutaneous vasculitis).<br><br>
        <strong style="color:var(--tone-danger-fg);">Greyhound</strong> → post-operative fibrinolysis tendency (aminocaproic acid prophylaxis).<br><br>
        <strong style="color:var(--tone-green-fg);">Cavalier King Charles Spaniel</strong> → macrothrombocytopenia (mild, asymptomatic — beware misinterpretation).<br><br>
        <strong style="color:var(--tone-violet-fg);">Norfolk Terrier, Otterhound</strong> → Glanzmann thrombasthenia.<br><br>
        <strong style="color:var(--tone-warning-fg);">Sighthound, Greyhound</strong> → CRGV / "Alabama rot" — skin ulcers + AKI + thrombocytopenia.
      </div>
      <div>
        <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:var(--tone-violet-fg);">FeLV / FIV positive</strong><br>→ Bone marrow suppression → thrombocytopenia + anaemia + bleeding tendency.<br><br>
        <strong style="color:var(--tone-warning-fg);">Cat with sepsis, pancreatitis, severe pyrexia</strong><br>→ DIC.<br><br>
        <strong style="color:var(--tone-danger-fg);">Mycoplasma haemofelis + concurrent infection</strong><br>→ Haemolytic anaemia + thrombocytopenia.<br><br>
        <strong style="color:var(--tone-green-fg);">DSH young to middle-aged cat with epistaxis + petechiae</strong><br>→ Tick-borne (in endemic areas), FIP-associated vasculitis, idiopathic IMTP (less common than dog).<br><br>
        <strong style="color:var(--tone-info-fg);">Birman</strong> → reported hereditary deficiency of factor XII (asymptomatic — prolonged aPTT incidentally).<br><br>
        <strong style="color:var(--tone-danger-fg);">Outdoor cat with envenomation history</strong><br>→ Snake / spider bite — combined primary + secondary defect.<br><br>
        <strong style="color:var(--tone-warning-fg);">Cat on long-term anticoagulant for cardiomyopathy</strong><br>→ Iatrogenic — clopidogrel + ATE prevention complications.
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        html: `Acute collapse + pale gums + abdominal distension = haemoperitoneum (HSA rupture, anticoagulant rodenticide) · Petechiae + epistaxis + haematuria = IMTP / DIC · Acute bleeding + concurrent sepsis / neoplasia / IMHA / pancreatitis = DIC · Older intact male + feminisation + bleeding = Sertoli cell tumour · Bleeding in any breed with breed-known coagulopathy = test pre-operatively!`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Bleeding',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — FROM A DISTANCE' },
      {
        kind: 'check',
        html: `• <strong>Mentation + perfusion</strong>: collapsed, tachycardic, weak pulses → haemorrhagic shock (cavity bleed, severe envenomation).<br>
    • <strong>Mucous membranes</strong>: pale (blood loss), petechiae (thrombocytopenia, vasculitis), icteric (concurrent haemolysis / hepatic failure).<br>
    • <strong>Abdominal distension</strong>: haemoperitoneum (HSA rupture, rodenticide, hepatic mass).<br>
    • <strong>Dyspnoea</strong>: haemothorax (cavity bleed) — restrictive breathing pattern.<br>
    • <strong>Lameness / joint swelling</strong>: haemarthrosis (factor deficiency).<br>
    • <strong>Skin lesions</strong>: petechiae (ventrum, sclera, oral mucosa, pinnae), ecchymoses, vasculitis ulcers, alopecia of Sertoli hyperestrogenism.`,
      },
      { kind: 'step', text: '👋 STEP 2 — FOCUSED EXAM' },
      {
        kind: 'check',
        html: `<strong>Petechiae location:</strong> ventral abdomen, axilla, oral mucosa (especially upper canine pillar), conjunctiva, pinnae, scleral, pads. Quantify (few, scattered, generalised).<br>
    <strong>Ecchymoses:</strong> mild bruising at venepuncture sites; ascending from injection sites; spontaneous large bruises = severe.<br>
    <strong>Mucous membrane bleeding:</strong> gingival ooze, epistaxis (especially Doberman vWD), retinal haemorrhage, oral haemorrhage post-meal.<br>
    <strong>Abdominal palpation</strong>: pain, fluid wave, masses (splenic / hepatic — caution: do not aggressively palpate a suspected mass), bladder for haematuria.<br>
    <strong>Thoracic auscultation + percussion</strong>: muffled sounds + dyspnoea = haemothorax.<br>
    <strong>Lymphadenopathy</strong>: lymphoma, ehrlichiosis, leishmaniasis.<br>
    <strong>Joint palpation</strong>: haemarthrosis (warm, swollen, painful — factor deficiency); polyarthritis (vasculitis, SLE).<br>
    <strong>Testicular palpation (intact male)</strong>: Sertoli cell tumour (asymmetric, firm mass + feminisation).<br>
    <strong>Rectal exam</strong>: melena (upper GI bleed), haematochezia (lower GI), prostatic disease, anal sac mass.<br>
    <strong>Spinal palpation</strong>: vertebral haemorrhage / spinal IVDD with subarachnoid bleed.<br>
    <strong>Skin / coat</strong>: vasculitis lesions (ulcers, ear-tip necrosis, footpad ulcers — pinnae especially), alopecia of hyperestrogenism (bilaterally symmetrical), Cushingoid changes (HAC predisposes to PTE not bleeding, but iatrogenic steroid use predisposes to GI ulcer / haemorrhage).`,
      },
      { kind: 'step', text: '🔍 STEP 3 — PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Generalised petechiae + ecchymoses + mucosal bleeds + platelet count &lt;30 ×10⁹/L</div><div style="color:var(--tone-danger-title);">IMTP (primary or 2°)</div>
      <div>Doberman or Sheltie with epistaxis + prolonged BMBT + normal platelet count</div><div style="color:var(--tone-warning-fg);">von Willebrand disease</div>
      <div>Acute haemoperitoneum + collapse + pale gums + older large breed dog</div><div style="color:var(--tone-danger-title);">Splenic / hepatic HSA rupture</div>
      <div>Haemothorax + cough / dyspnoea + history of access to bait</div><div style="color:var(--tone-danger-fg);">Anticoagulant rodenticide</div>
      <div>Haemarthrosis + young male dog + family history</div><div style="color:var(--tone-violet-fg);">Haemophilia A / B (X-linked)</div>
      <div>Petechiae + cavity bleed + sepsis / neoplasia / pancreatitis / IMHA</div><div style="color:var(--tone-danger-title);">DIC</div>
      <div>Intact male dog + feminisation + bilateral alopecia + pancytopenia</div><div style="color:var(--tone-danger-fg);">Sertoli cell tumour with hyperestrogenism</div>
      <div>Ear-tip / footpad necrosis + crusting + cutaneous ulcers</div><div style="color:var(--tone-violet-fg);">Cutaneous vasculitis</div>
      <div>Bleeding + acute renal failure + skin ulcers + sighthound</div><div style="color:var(--tone-danger-fg);">CRGV / "Alabama rot"</div>
      <div>Concurrent anaemia + thrombocytopenia + tick exposure</div><div style="color:var(--tone-green-fg);">Tick-borne (Ehrlichia, Anaplasma, Babesia)</div>
      <div>Jaundice + ascites + bleeding</div><div style="color:var(--tone-danger-fg);">Hepatic failure</div>
      <div>🐱 Cat with FIP / lymphoma / cytauxzoon and thromboembolic signs (acute hindlimb paresis, pulmonary signs) — minimal external bleeding</div><div style="color:var(--tone-indigo-fg);">Feline DIC (thrombotic phenotype) — grave</div>
      <div>🐱 Birman / Siamese / DSH with isolated aPTT prolongation pre-op, no bleeding</div><div style="color:var(--tone-indigo-fg);">Factor XII deficiency — clinically silent</div>
      <div>Mediterranean / African origin cat with regenerative anaemia + FeLV positive</div><div style="color:var(--tone-indigo-fg);">Babesia felis</div>
    </div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Bleeding — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST' },
      {
        kind: 'check',
        html: `1. <strong>ABC + shock assessment</strong>: IV access (avoid jugular if coagulopathy suspected — use peripheral), oxygen, IV crystalloid bolus, transfuse (whole blood, packed RBC, plasma) if life-threatening haemorrhage.<br>
    2. <strong>Blood sampling order matters</strong>: minimise venepuncture sites; use small-gauge needles; apply pressure for ≥ 5 min. Send: CBC, biochem, coag profile (PT, aPTT), blood smear, ± buccal mucosal bleeding time (BMBT) if cooperative.<br>
    3. <strong>Empirical therapy while awaiting results</strong>: vitamin K1 5 mg/kg SC (NOT IV — anaphylaxis) for any suspected rodenticide; fresh frozen plasma if active cavity bleeding and PT/aPTT severely prolonged.<br>
    4. <strong>Avoid intramuscular injections</strong> and cystocentesis in any patient with suspected coagulopathy.<br>
    5. <strong>Type and cross-match</strong> before transfusion. Cats: type before transfusion is mandatory — Type B cats carry strong naturally-occurring anti-A antibodies and react severely (potentially fatal) to Type A blood. Type A cats have weak anti-B (mild reaction). Type AB cats have no anti-A or anti-B antibodies and are universal recipients.`,
      },
      { kind: 'step', text: 'STEP 2 — TIER 1 LABORATORY EVALUATION' },
      {
        kind: 'html',
        html: `<div style="padding:10px 12px;background:var(--check-bg,rgba(148,163,184,0.07));border:1px solid rgba(148,163,184,0.18);border-radius:10px;display:flex;flex-direction:column;gap:12px;">
  <div>
    <div style="font-size:10px;font-weight:700;color:var(--white);margin-bottom:6px;">🔬 Complete Blood Count + Manual Smear</div>
    <table style="width:100%;border-collapse:collapse;font-size:9px;">
      <thead>
        <tr style="border-bottom:1.5px solid rgba(148,163,184,0.3);">
          <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;width:38%;">Parameter</th>
          <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;">Interpretation</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
          <td style="padding:4px 6px;color:var(--white);font-weight:600;">Platelet count</td>
          <td style="padding:4px 6px;color:var(--gray);">Automated counts can be falsely low (clumping) — verify by smear (1 plt/HPF ≈ 15 ×10⁹/L). Normal &gt;200 ×10⁹/L · &lt;50 ×10⁹/L = spontaneous bleed risk · &lt;10 ×10⁹/L = life-threatening</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
          <td style="padding:4px 6px;color:var(--white);font-weight:600;">Anaemia</td>
          <td style="padding:4px 6px;color:var(--gray);">Regenerative (haemolysis, blood loss) vs non-regenerative (BM suppression). Reticulocytes: &gt;60–80 ×10⁹/L (cat) / &gt;60 ×10⁹/L (dog) = regenerative</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
          <td style="padding:4px 6px;color:var(--white);font-weight:600;">RBC morphology</td>
          <td style="padding:4px 6px;color:var(--gray);">Spherocytes → IMHA · Schistocytes → DIC, vasculopathy · Heinz bodies → oxidative injury · Nucleated RBCs → BM stress / lead</td>
        </tr>
        <tr>
          <td style="padding:4px 6px;color:var(--white);font-weight:600;">Leukogram</td>
          <td style="padding:4px 6px;color:var(--gray);">Leucocytosis → stress / inflammation / sepsis / DIC · Left shift → sepsis · Lymphocytosis → Ehrlichia</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <div style="font-size:10px;font-weight:700;color:var(--white);margin-bottom:6px;">🧪 Coagulation Profile</div>
    <table style="width:100%;border-collapse:collapse;font-size:9px;">
      <thead>
        <tr style="border-bottom:1.5px solid rgba(148,163,184,0.3);">
          <th style="padding:4px 6px;text-align:left;color:var(--tone-warning-fg);font-weight:700;width:14%;">Test</th>
          <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;width:42%;">Pathway (factors measured)</th>
          <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;">Key point</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
          <td style="padding:4px 6px;color:var(--tone-warning-fg);font-weight:700;">PT</td>
          <td style="padding:4px 6px;color:var(--gray);">Extrinsic + common: VII, X, V, II, fibrinogen</td>
          <td style="padding:4px 6px;color:var(--gray);">Prolongs first with vit K antagonists (VII shortest half-life)</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
          <td style="padding:4px 6px;color:var(--tone-indigo-fg);font-weight:700;">aPTT</td>
          <td style="padding:4px 6px;color:var(--gray);">Intrinsic + common: XII, XI, IX, VIII, X, V, II, fibrinogen</td>
          <td style="padding:4px 6px;color:var(--gray);">Haemophilia A (VIII), B (IX), XII deficiency; intrinsic defects</td>
        </tr>
        <tr>
          <td style="padding:4px 6px;color:var(--gray);font-weight:700;">ACT</td>
          <td style="padding:4px 6px;color:var(--gray);">Bedside aPTT surrogate</td>
          <td style="padding:4px 6px;color:var(--gray);">Less sensitive than lab aPTT; useful point-of-care screen</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="font-size:9px;color:var(--gray);"><strong style="color:var(--white);">Biochemistry + urinalysis:</strong> hepatic panel (factors made in liver) · renal (uraemia → platelet dysfunction) · albumin (PLN) · electrolytes (snake envenomation) · CK (rhabdomyolysis) · Blood smear photos — share with referral pathologist if findings unclear.</div>
</div>`,
      },
      {
        kind: 'html',
        html: `<div style="margin-top:8px;padding:10px 12px;background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.22);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:var(--tone-indigo-fg);margin-bottom:6px;">📊 Coag Pattern Interpretation + Workup</div>
  <table style="width:100%;border-collapse:collapse;font-size:9px;">
    <thead>
      <tr style="border-bottom:1.5px solid rgba(148,163,184,0.3);">
        <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;width:22%;">Pattern</th>
        <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;width:34%;">Likely diagnoses</th>
        <th style="padding:4px 6px;text-align:left;color:var(--gray);font-weight:700;">Next test · Empirical Rx</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:var(--tone-danger-fg);font-weight:700;">Plt ↓ &lt;50k</span><br><span style="color:var(--gray);font-size:8px;">PT + aPTT normal</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:var(--tone-danger-fg);">IMTP</span> — primary or secondary (SLE, neoplasia)<br><span style="color:var(--tone-danger-fg);">Tick-borne</span> — Ehrlichia, Anaplasma, Babesia, Rickettsia<br><span style="color:var(--tone-danger-fg);">Evans syndrome</span> — IMHA + IMTP concurrent<br><span style="color:var(--tone-danger-fg);">BM suppression</span> — neoplasia, drugs, oestrogen</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">4Dx tick panel · Coombs / saline agglutination · ANA · abdominal imaging · bone marrow aspirate + core if unexplained · drug review<br><span style="color:var(--tone-danger-fg);font-weight:600;">Prednisolone 2 mg/kg/day</span> + doxycycline 5–10 mg/kg BID pending serology · IMTP confirmed by exclusion + response</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:var(--tone-warning-fg);font-weight:700;">PT ↑ only</span><br><span style="color:var(--gray);font-size:8px;">aPTT normal</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:var(--tone-warning-fg);">Anticoagulant rodenticide</span> — early (factor VII depletes first)<br><span style="color:var(--tone-warning-fg);">Factor VII deficiency</span> — congenital; Beagle, Malamute<br><span style="color:var(--tone-warning-fg);">Early hepatic disease</span> — FVII shortest hepatic half-life</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">PIVKAs (more sensitive than PT for rodenticide) · factor VII assay · bile acids<br><span style="color:var(--tone-warning-fg);font-weight:600;">Vit K1 2.5–5 mg/kg SC</span> empirically; recheck PT 48–72 h after last dose</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:var(--tone-indigo-fg);font-weight:700;">aPTT ↑ only</span><br><span style="color:var(--gray);font-size:8px;">PT normal</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:var(--tone-violet-fg);">Haemophilia A</span> — factor VIII; X-linked; males<br><span style="color:var(--tone-violet-fg);">Haemophilia B</span> — factor IX; Cairn terrier<br><span style="color:var(--tone-violet-fg);">Factor XII deficiency</span> — cats; non-bleeding phenotype</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">Specific factor assays (VIII, IX, XI, XII) · mixing studies (correction = factor deficiency; no correction = inhibitor)<br><span style="color:var(--tone-violet-fg);font-weight:600;">FFP</span> if active bleeding · cage rest · avoid IM injections</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:var(--tone-danger-fg);font-weight:700;">PT ↑ + aPTT ↑</span><br><span style="color:var(--gray);font-size:8px;">Both prolonged</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:var(--tone-danger-fg);">Rodenticide (advanced)</span> — multiple factors depleted<br><span style="color:var(--tone-danger-fg);">Hepatic failure</span> — check ALT · bilirubin · albumin<br><span style="color:var(--tone-danger-fg);">DIC</span> — thrombocytopenia concurrent; &gt;3/5 DIC criteria = overt<br><span style="color:var(--tone-danger-fg);">Multi-factor deficiency</span> — congenital; rare</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">Fibrinogen · D-dimer / FDPs · antithrombin · bile acids + ammonia · mixing studies<br><span style="color:var(--tone-danger-fg);font-weight:600;">Vit K1 SC urgently</span> · FFP if active cavity bleed · treat underlying cause (DIC) · cryoprecipitate if hypofibrinogenaemic</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(148,163,184,0.1);">
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:var(--tone-green-fg);font-weight:700;">Plt + coags normal</span><br><span style="color:var(--gray);font-size:8px;">BMBT ↑ · mucosal bleed</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:var(--tone-green-fg);">von Willebrand disease</span> — Doberman, Sheltie, Scottie<br><span style="color:var(--tone-green-fg);">Thrombocytopathia</span> — uraemia, hyperglobulinaemia, NSAIDs<br><span style="color:var(--tone-green-fg);">Glanzmann / Scott syndrome</span> — rare; referral</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">vWF antigen assay · PFA-100 closure time · platelet aggregometry (referral) · renal panel · drug review<br><span style="color:var(--tone-green-fg);font-weight:600;">Cryoprecipitate or FFP</span> · DDAVP 1 µg/kg SC 30 min pre-op (type I vWD only) · avoid platelet inhibitors</td>
      </tr>
      <tr>
        <td style="padding:5px 6px;vertical-align:top;"><span style="color:#94A3B8;font-weight:700;">All normal</span><br><span style="color:var(--gray);font-size:8px;">Coags + Plt intact</span></td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);"><span style="color:#94A3B8;">Vascular rupture / trauma</span> — HSA · surgical · arterial<br><span style="color:#94A3B8;">Factor XIII deficiency</span> — clot unstable in 5M urea; not measured by PT/aPTT</td>
        <td style="padding:5px 6px;vertical-align:top;color:var(--gray);">Imaging (US / CT) for mass / haemoabdomen · clot solubility test (5M urea) · BMBT<br><span style="color:#94A3B8;font-weight:600;">Surgical haemostasis</span> · cryoprecipitate if FXIII suspected</td>
      </tr>
    </tbody>
  </table>
</div>`,
      },
      { kind: 'step', text: 'STEP 3 — ADVANCED / SPECIALIST TESTS' },
      {
        kind: 'check',
        html: `<strong>vWF antigen + collagen-binding activity</strong> (referral lab): screen Doberman, Sheltie, Scottie, Golden Retriever pre-operatively; type I, II, III differentiation.<br>
    <strong>Specific factor assays</strong> — VIII, IX, XI, XII (for haemophilia and intrinsic deficiencies); factor VII (Beagle); fibrinogen (afibrinogenaemia).<br>
    <strong>Platelet function testing</strong>: PFA-100 closure time, multiplate aggregometry, flow cytometry (Glanzmann, Scott syndrome).<br>
    <strong>Thromboelastography (TEG)</strong> / rotational thromboelastometry (ROTEM): global haemostasis — useful in DIC, hepatic failure, hyperfibrinolysis (Greyhound post-op bleeding).<br>
    <strong>PIVKAs</strong>: highly sensitive screening test for vitamin K antagonism — positive within hours.<br>
    <strong>Snake / spider venom antigen detection</strong>: where commercially available (Australia, US).<br>
    <strong>Bone marrow aspirate + core biopsy</strong>: persistent unexplained pancytopenia, ITP refractory, suspected myelodysplasia, leukaemia, myelophthisis.<br>
    <strong>Tick-borne disease workup</strong>: 4Dx (Ehrlichia canis / ewingii, Anaplasma phagocytophilum / platys, Borrelia, heartworm) + Babesia PCR + region-specific (Leishmania ELISA, RMSF, leptospirosis).<br>
    <strong>Abdominal + thoracic imaging</strong>: HSA / hepatic mass, mediastinal mass, retroperitoneal haemorrhage, splenic / hepatic rupture.`,
      },
      { kind: 'step', text: 'STEP 4 — TREATMENT POINTERS' },
      {
        kind: 'check',
        html: `<strong>Anticoagulant rodenticide:</strong> Vitamin K1 PO 3–5 mg/kg divided BID × 28 d (2nd-generation; 14 d for 1st generation). FFP / PCC if active bleeding. Recheck PT 72 h after last dose.<br>
    <strong>IMTP:</strong> Prednisolone 2 mg/kg/day + adjunct (mycophenolate 10–20 mg/kg BID, cyclosporine, vincristine 0.02 mg/kg IV one-off, azathioprine — dog only). Severe / refractory: IVIg, splenectomy (rare). Doxycycline if any tick exposure pending serology. Avoid IM injections + strict cage rest. Transfuse platelets only if life-threatening haemorrhage and concentrate available.<br>
    <strong>IMHA:</strong> Prednisolone 2 mg/kg/day + adjunct (mycophenolate, azathioprine, cyclosporine). Anti-thrombotic: clopidogrel + low-dose aspirin (PTE prophylaxis). Type and cross-match before any transfusion.<br>
    <strong>vWD:</strong> Cryoprecipitate or fresh frozen plasma; desmopressin (DDAVP) 1 µg/kg SC 30 min pre-op (releases stored vWF — works in Type I, NOT III); avoid platelet inhibitors.<br>
    <strong>Haemophilia A / B:</strong> Fresh frozen plasma (FVIII or FIX); recombinant factor concentrate where available; cage rest; avoid IM; lifelong management of bleeding episodes.<br>
    <strong>DIC:</strong> Treat the underlying cause aggressively. FFP for clotting factor replacement; cryoprecipitate if hypofibrinogenaemic; heparin controversial. Goals: maintain perfusion, treat the cause, support coagulation.<br>
    <strong>Splenic / hepatic HSA rupture:</strong> Stabilise + emergency splenectomy / partial hepatectomy; staging (thoracic CT, abdominal US, cardiac echo for right atrial HSA); chemotherapy (doxorubicin-based protocols) post-op — median survival 6–8 months even with multimodal therapy.<br>
    <strong>Sertoli cell tumour:</strong> Castration (resolves hyperestrogenism over 4–8 weeks). Pre-op bone marrow protection: transfusion support, antibiotic prophylaxis. Prognosis good if treated before irreversible marrow aplasia.<br>
    <strong>Cutaneous vasculitis:</strong> Identify and treat trigger (drug, infection, immune-mediated, neoplasia). Pentoxifylline 15–25 mg/kg BID + ω-3 fatty acids; immunosuppression for severe / progressive disease.<br>
    <strong>Hepatic failure-related bleeding:</strong> Vitamin K1 (some response if factor synthesis still possible); FFP for active bleeding; correct hypoglycaemia and electrolytes; manage hepatic encephalopathy (lactulose).<br>
    <strong>Greyhound post-operative bleeding:</strong> aminocaproic acid 15 mg/kg PO TID × 5 days post-op as prophylaxis.<br>
    <strong>Snake envenomation:</strong> antivenom (region-specific); supportive care; FFP for cascade defect; monitor renal function (myoglobinuria, AKI).`,
      },
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
          { label: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' } },
          { label: 'Vitamin K deficiency (broad)', link: { to: 'disease', id: 'DIS-BD-VITK' } },
          { label: 'Immune-mediated thrombocytopenia', link: { to: 'disease', id: 'DIS-BD-IMTP' } },
          { label: 'Thrombocytopenia (broad)', link: { to: 'disease', id: 'DIS-BD-TCP' } },
          { label: 'Thrombocytopathia', link: { to: 'disease', id: 'DIS-BD-TPATH' } },
          { label: 'Thrombocytosis', link: { to: 'disease', id: 'DIS-BD-TCS' } },
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
      {
        kind: 'html',
        html: `<div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:11px;font-weight:700;color:var(--tone-danger-fg);margin-bottom:6px;">⚡ EMERGENCY PROTOCOLS</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;">
    <div onclick="renderProtoDetail('PROT-BLEED-IMTP')" style="cursor:pointer;color:var(--tone-danger-fg);">→ IMTP / severe thrombocytopenia</div>
    <div onclick="renderProtoDetail('PROT-BLEED-HEMABD')" style="cursor:pointer;color:var(--tone-danger-fg);">→ Acute haemoabdomen (HSA / rodenticide)</div>
    <div onclick="renderProtoDetail('PROT-BLEED-DIC')" style="cursor:pointer;color:var(--tone-danger-fg);">→ DIC — diagnosis &amp; supportive care</div>
    <div onclick="renderProtoDetail('PROT-BLEED-SNAKE')" style="cursor:pointer;color:var(--tone-danger-fg);">→ Snake envenomation</div>
    <div onclick="renderProtoDetail('PROT-TOX-ACRM')" style="cursor:pointer;color:var(--tone-danger-fg);">→ Anticoagulant rodenticide (existing)</div>
  </div>
</div>`,
      },
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Always count platelets manually on smear — automated counts mislead with clumping.<br>
  • PT prolongs first in rodenticide (factor VII shortest half-life); empirical vit K1 SC is safe to give while awaiting confirmation.<br>
  • In Doberman with epistaxis or pre-surgical patient, screen vWF antigen — don't wait for the surgical bleed.<br>
  • Use small-gauge needles, peripheral veins, and prolonged pressure for any bleeding patient.<br>
  • Vitamin K1 IV causes anaphylaxis — give SC at multiple sites.<br>
  • Cat blood typing is mandatory before any transfusion (Type B cats have strong naturally-occurring anti-A antibodies → severe, potentially fatal haemolytic reaction to Type A blood; Type AB cats are universal recipients).<br>
  • Always image for splenic / hepatic mass in any acute haemoperitoneum — HSA, hepatocellular carcinoma, less commonly HSA-like vascular lesions.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
