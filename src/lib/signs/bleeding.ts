// ── BLEEDING / PETECHIAE / ECCHYMOSES — clinical sign + diagnostic approach
// Sources: Maddison et al. — Common Small Animal Diagnoses; Textbook of
// Veterinary Internal Medicine, 8th Ed. (haemostasis chapters); Pocket
// Handbook of Small Animal Medicine.

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const bleedingFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">🩸 BLEEDING / PETECHIAE / ECCHYMOSES</div>
  <div class="flow-arrow-v">↓</div>
  <div class="flow-node step">PATTERN RECOGNITION<br><span style="font-size:10px;color:var(--gray);font-weight:400">Walk down the questions — the pattern of bleeding tells you which limb is broken</span></div>
  <div class="flow-arrow-v">↓</div>

  <!-- Q1 — rule out mixed / DIC first -->
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;width:100%;align-items:stretch;">
    <div class="flow-node step" style="font-size:10.5px;text-align:left;line-height:1.4;">
      <strong>Q1.</strong> Cavity bleed <strong>AND</strong> petechiae <strong>AND</strong> concurrent severe systemic illness (sepsis · IMHA · neoplasia · pancreatitis · heatstroke · envenomation)?
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#FCD34D;padding:0 2px;">YES<br>→</div>
    <div class="flow-node tile urgent" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-BD-MIX','Mixed / consumptive')">⚡ MIXED / DIC<br><span style="font-size:9px;opacity:.7">primary + secondary + fibrinolysis abnormal</span><br><span style="font-size:9px;opacity:.7">⇒ sepsis · neoplasia · IMHA · heatstroke · snake bite</span></div>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;width:100%;gap:4px;margin:4px 0;">
    <span style="font-size:9px;color:var(--gray);font-weight:700;">NO ↓</span>
  </div>

  <!-- Q2 — secondary haemostasis -->
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;width:100%;align-items:stretch;">
    <div class="flow-node step" style="font-size:10.5px;text-align:left;line-height:1.4;">
      <strong>Q2.</strong> Bleeding into 3rd spaces? <span style="opacity:.75;">(haemothorax · haemoperitoneum · haemarthrosis · large haematoma after minor trauma · delayed bleed post-surgery or venepuncture)</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#FCD34D;padding:0 2px;">YES<br>→</div>
    <div class="flow-node tile" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-BD-SEC','Secondary haemostasis')">🔗 SECONDARY HAEMOSTASIS<br><span style="font-size:9px;opacity:.7">coag cascade · factor deficiency</span><br><span style="font-size:9px;opacity:.7">PT ± aPTT prolonged · platelets normal</span><br><span style="font-size:9px;opacity:.7">⇒ rodenticide · hepatic failure · haemophilia A/B</span></div>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;width:100%;gap:4px;margin:4px 0;">
    <span style="font-size:9px;color:var(--gray);font-weight:700;">NO ↓</span>
  </div>

  <!-- Q3 — primary haemostasis -->
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;width:100%;align-items:stretch;">
    <div class="flow-node step" style="font-size:10.5px;text-align:left;line-height:1.4;">
      <strong>Q3.</strong> Petechiae · ecchymoses · mucosal surface bleeding? <span style="opacity:.75;">(ventrum / sclera / gums · epistaxis · melena · haematuria · prolonged ooze from venepuncture or minor wounds)</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#FCD34D;padding:0 2px;">YES<br>→</div>
    <div class="flow-node tile" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-BD-PRIM','Primary haemostasis')">🧱 PRIMARY HAEMOSTASIS<br><span style="font-size:9px;opacity:.7">platelets · vWF · vessel wall</span><br><span style="font-size:9px;opacity:.7">BMBT &gt; 3.5 min · ± platelet count low</span><br><span style="font-size:9px;opacity:.7">⇒ IMTP · vWD · tick-borne · uraemia · drugs</span></div>
  </div>
  <div style="display:flex;align-items:center;justify-content:center;width:100%;gap:4px;margin:4px 0;">
    <span style="font-size:9px;color:var(--gray);font-weight:700;">NO ↓</span>
  </div>

  <!-- Q4 — vasculopathy -->
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;width:100%;align-items:stretch;">
    <div class="flow-node step" style="font-size:10.5px;text-align:left;line-height:1.4;">
      <strong>Q4.</strong> Cutaneous lesions without classic bleeding pattern? <span style="opacity:.75;">(ear-tip / footpad necrosis · pinnal punched-out ulcers · vasculitic skin lesions · ± normal platelets and coag)</span>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#FCD34D;padding:0 2px;">YES<br>→</div>
    <div class="flow-node tile" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-BD-VASC','Vasculopathies')">🌐 VASCULOPATHIES<br><span style="font-size:9px;opacity:.7">vasculitis · uraemia · steroid · Cushing · scurvy</span><br><span style="font-size:9px;opacity:.7">⇒ immune-mediated vasculitis · CRGV · drug · infection</span></div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#F87171;margin-bottom:6px;">⚡ DO NOT MISS — LIFE-THREATENING</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Anticoagulant rodenticide</strong> — peracute cavity bleeding, PT prolongs first; vitamin K1 lifesaving<br>
      • <strong>DIC</strong> — petechiae + cavity bleed + thrombocytopenia + prolonged PT/aPTT + low fibrinogen + ↑ D-dimer; treat underlying cause (sepsis, neoplasia, IMHA, snake bite, heatstroke, pancreatitis)<br>
      • <strong>Splenic / hepatic haemangiosarcoma rupture</strong> — collapse + pale gums + haemoperitoneum; older large breed dog<br>
      • <strong>IMTP</strong> — platelet count typically &lt; 30 ×10⁹/L; start immunosuppression urgently<br>
      • <strong>Severe envenomation</strong> (snake / spider) — combined primary + secondary defect + ± rhabdomyolysis<br>
      • <strong>Acute haemoperitoneum + petechiae + mucosal bleeding</strong> → think DIC, severe rodenticide, hyperestrogenism (Sertoli cell tumour)
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:11px;color:#93C5FD;text-align:center;width:100%;">
    Tap a category to see specific differentials and workup
  </div>
</div>
`;

// ── Tab nav helper ─────────────────────────────────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxBleedingHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxBleedingExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxBleedingDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const bleedingDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">CHARACTERISE THE BLEEDING PATTERN</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c2">
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">🧱 Primary haemostasis pattern</strong><br>
      Petechiae · ecchymoses<br>
      Mucosal bleeds: gums, epistaxis, GI, haematuria<br>
      Prolonged surface bleeding from minor wounds<br>
      <span style="opacity:.75;">→ Platelets, vWF, vessels</span>
    </div>
    <div class="dx-test" style="text-align:left;background:#0D7377;font-size:9px;">
      <strong style="font-size:10px;">🔗 Secondary haemostasis pattern</strong><br>
      Cavity bleeds (haemothorax, haemoperitoneum, haemarthrosis)<br>
      Deep haematomas after minor trauma<br>
      Delayed bleeding after surgery<br>
      <span style="opacity:.75;">→ Coagulation factors / cascade</span>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 ONSET + PROGRESSION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Peracute (hours):</strong> trauma, splenic / hepatic mass rupture (HSA, hepatocellular ca), severe coagulopathy (rodenticide overdose, snake envenomation), heatstroke-induced DIC.<br>
    <strong>Acute (days):</strong> IMTP onset, rodenticide intoxication, acute sepsis with DIC, IMHA-related secondary DIC, acute liver failure.<br>
    <strong>Subacute (weeks):</strong> tick-borne disease (Ehrlichia, Anaplasma, Babesia — anaemia + thrombocytopenia + ± neuro), chronic hepatic disease, occult neoplasia with DIC, intermittent IMTP relapse.<br>
    <strong>Chronic / lifelong:</strong> inherited coagulopathies (haemophilia A — factor VIII; haemophilia B — factor IX; vWD types I–III), thrombocytopathies (Glanzmann, Scott syndrome), heritable vasculopathies.<br><br>
    <strong>Episodic recurrent bleeding from puppyhood</strong> → inherited factor deficiency or vWD — type history of bleeding from umbilicus, deciduous tooth eruption, neutering surgery.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💊 DRUG / TOXIN / EXPOSURE HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Anticoagulants / rodenticides:</strong> warfarin, brodifacoum, bromadiolone, difenacoum (2nd-generation — last weeks). Bait colour: turquoise, pink, green — variable.<br>
    <strong>Antiplatelet drugs:</strong> aspirin, clopidogrel, NSAIDs (carprofen, meloxicam — at supratherapeutic doses).<br>
    <strong>Cytotoxic chemotherapy:</strong> vincristine, doxorubicin → thrombocytopenia.<br>
    <strong>Snake / spider envenomation:</strong> rattlesnake (combined primary + secondary defect), Australian elapids (procoagulant + neurotoxic), brown recluse / Latrodectus.<br>
    <strong>Acetaminophen / paracetamol (cat especially):</strong> Heinz-body haemolytic anaemia → haemoglobinuria (NOT true bleeding).<br>
    <strong>Heparin / dabigatran / rivaroxaban:</strong> deliberate or accidental.<br>
    <strong>Plant toxins:</strong> moldy sweet clover hay (Melilotus — dicoumarol; primarily a livestock toxicity but anecdotally reported in dogs), bracken (thrombocytopenia in livestock), foxglove (cardiac).<br>
    <strong>Heat / environmental:</strong> heatstroke → DIC.<br>
    <strong>Recent vaccinations:</strong> rare association with immune-mediated thrombocytopenia.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 SYSTEMIC / FAMILY / BREEDING HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Family / breed history:</strong>
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
    <strong>Previous transfusion / blood products:</strong> alloimmunisation, post-transfusion purpura (rare).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🐾 SIGNALMENT + BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:#FCA5A5;">Cocker Spaniel, Poodle, OES, Lhasa Apso, Maltese</strong><br>→ Idiopathic IMTP.<br><br>
        <strong style="color:#FCD34D;">Doberman</strong> → vWD type I (mild–moderate). Pre-op test essential before any surgery.<br><br>
        <strong style="color:#6EE7B7;">Scottish Terrier, Shetland</strong> → vWD type III (most severe; spontaneous bleeding).<br><br>
        <strong style="color:#C4B5FD;">GSD</strong> → haemophilia A (factor VIII, X-linked).<br><br>
        <strong style="color:#FCA5A5;">Splenic / hepatic HSA in middle-aged–older large breed</strong> (GSD, Goldie, Lab, Pointer) → acute haemoperitoneum + collapse + pale gums.<br><br>
        <strong style="color:#FCD34D;">Older intact male</strong> → Sertoli cell tumour with hyperestrogenism → bone marrow suppression → pancytopenia + bleeding.<br><br>
        <strong style="color:#93C5FD;">Cocker, Springer</strong> → familial vasculopathy (idiopathic cutaneous vasculitis).<br><br>
        <strong style="color:#FCA5A5;">Greyhound</strong> → post-operative fibrinolysis tendency (aminocaproic acid prophylaxis).<br><br>
        <strong style="color:#6EE7B7;">Cavalier King Charles Spaniel</strong> → macrothrombocytopenia (mild, asymptomatic — beware misinterpretation).<br><br>
        <strong style="color:#C4B5FD;">Norfolk Terrier, Otterhound</strong> → Glanzmann thrombasthenia.<br><br>
        <strong style="color:#FCD34D;">Sighthound, Greyhound</strong> → CRGV / "Alabama rot" — skin ulcers + AKI + thrombocytopenia.
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:#C4B5FD;">FeLV / FIV positive</strong><br>→ Bone marrow suppression → thrombocytopenia + anaemia + bleeding tendency.<br><br>
        <strong style="color:#FCD34D;">Cat with sepsis, pancreatitis, severe pyrexia</strong><br>→ DIC.<br><br>
        <strong style="color:#FCA5A5;">Mycoplasma haemofelis + concurrent infection</strong><br>→ Haemolytic anaemia + thrombocytopenia.<br><br>
        <strong style="color:#6EE7B7;">DSH young to middle-aged cat with epistaxis + petechiae</strong><br>→ Tick-borne (in endemic areas), FIP-associated vasculitis, idiopathic IMTP (less common than dog).<br><br>
        <strong style="color:#93C5FD;">Birman</strong> → reported hereditary deficiency of factor XII (asymptomatic — prolonged aPTT incidentally).<br><br>
        <strong style="color:#FCA5A5;">Outdoor cat with envenomation history</strong><br>→ Snake / spider bite — combined primary + secondary defect.<br><br>
        <strong style="color:#FCD34D;">Cat on long-term anticoagulant for cardiomyopathy</strong><br>→ Iatrogenic — clopidogrel + ATE prevention complications.
      </div>
    </div>
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Acute collapse + pale gums + abdominal distension = haemoperitoneum (HSA rupture, anticoagulant rodenticide) · Petechiae + epistaxis + haematuria = IMTP / DIC · Acute bleeding + concurrent sepsis / neoplasia / IMHA / pancreatitis = DIC · Older intact male + feminisation + bleeding = Sertoli cell tumour · Bleeding in any breed with breed-known coagulopathy = test pre-operatively!
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const bleedingDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 STEP 1 — FROM A DISTANCE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    • <strong>Mentation + perfusion</strong>: collapsed, tachycardic, weak pulses → haemorrhagic shock (cavity bleed, severe envenomation).<br>
    • <strong>Mucous membranes</strong>: pale (blood loss), petechiae (thrombocytopenia, vasculitis), icteric (concurrent haemolysis / hepatic failure).<br>
    • <strong>Abdominal distension</strong>: haemoperitoneum (HSA rupture, rodenticide, hepatic mass).<br>
    • <strong>Dyspnoea</strong>: haemothorax (cavity bleed) — restrictive breathing pattern.<br>
    • <strong>Lameness / joint swelling</strong>: haemarthrosis (factor deficiency).<br>
    • <strong>Skin lesions</strong>: petechiae (ventrum, sclera, oral mucosa, pinnae), ecchymoses, vasculitis ulcers, alopecia of Sertoli hyperestrogenism.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👋 STEP 2 — FOCUSED EXAM</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Petechiae location:</strong> ventral abdomen, axilla, oral mucosa (especially upper canine pillar), conjunctiva, pinnae, scleral, pads. Quantify (few, scattered, generalised).<br>
    <strong>Ecchymoses:</strong> mild bruising at venepuncture sites; ascending from injection sites; spontaneous large bruises = severe.<br>
    <strong>Mucous membrane bleeding:</strong> gingival ooze, epistaxis (especially Doberman vWD), retinal haemorrhage, oral haemorrhage post-meal.<br>
    <strong>Abdominal palpation</strong>: pain, fluid wave, masses (splenic / hepatic — caution: do not aggressively palpate a suspected mass), bladder for haematuria.<br>
    <strong>Thoracic auscultation + percussion</strong>: muffled sounds + dyspnoea = haemothorax.<br>
    <strong>Lymphadenopathy</strong>: lymphoma, ehrlichiosis, leishmaniasis.<br>
    <strong>Joint palpation</strong>: haemarthrosis (warm, swollen, painful — factor deficiency); polyarthritis (vasculitis, SLE).<br>
    <strong>Testicular palpation (intact male)</strong>: Sertoli cell tumour (asymmetric, firm mass + feminisation).<br>
    <strong>Rectal exam</strong>: melena (upper GI bleed), haematochezia (lower GI), prostatic disease, anal sac mass.<br>
    <strong>Spinal palpation</strong>: vertebral haemorrhage / spinal IVDD with subarachnoid bleed.<br>
    <strong>Skin / coat</strong>: vasculitis lesions (ulcers, ear-tip necrosis, footpad ulcers — pinnae especially), alopecia of hyperestrogenism (bilaterally symmetrical), Cushingoid changes (HAC predisposes to PTE not bleeding, but iatrogenic steroid use predisposes to GI ulcer / haemorrhage).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔍 STEP 3 — PATTERN RECOGNITION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Generalised petechiae + ecchymoses + mucosal bleeds + platelet count &lt;30 ×10⁹/L</div><div style="color:#F87171;">IMTP (primary or 2°)</div>
      <div>Doberman or Sheltie with epistaxis + prolonged BMBT + normal platelet count</div><div style="color:#FCD34D;">von Willebrand disease</div>
      <div>Acute haemoperitoneum + collapse + pale gums + older large breed dog</div><div style="color:#F87171;">Splenic / hepatic HSA rupture</div>
      <div>Haemothorax + cough / dyspnoea + history of access to bait</div><div style="color:#FCA5A5;">Anticoagulant rodenticide</div>
      <div>Haemarthrosis + young male dog + family history</div><div style="color:#C4B5FD;">Haemophilia A / B (X-linked)</div>
      <div>Petechiae + cavity bleed + sepsis / neoplasia / pancreatitis / IMHA</div><div style="color:#F87171;">DIC</div>
      <div>Intact male dog + feminisation + bilateral alopecia + pancytopenia</div><div style="color:#FCA5A5;">Sertoli cell tumour with hyperestrogenism</div>
      <div>Ear-tip / footpad necrosis + crusting + cutaneous ulcers</div><div style="color:#C4B5FD;">Cutaneous vasculitis</div>
      <div>Bleeding + acute renal failure + skin ulcers + sighthound</div><div style="color:#FCA5A5;">CRGV / "Alabama rot"</div>
      <div>Concurrent anaemia + thrombocytopenia + tick exposure</div><div style="color:#6EE7B7;">Tick-borne (Ehrlichia, Anaplasma, Babesia)</div>
      <div>Jaundice + ascites + bleeding</div><div style="color:#FCA5A5;">Hepatic failure</div>
    </div>
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const bleedingDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.4);color:#F87171;">⚡ STEP 1 — STABILISE FIRST</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    1. <strong>ABC + shock assessment</strong>: IV access (avoid jugular if coagulopathy suspected — use peripheral), oxygen, IV crystalloid bolus, transfuse (whole blood, packed RBC, plasma) if life-threatening haemorrhage.<br>
    2. <strong>Blood sampling order matters</strong>: minimise venepuncture sites; use small-gauge needles; apply pressure for ≥ 5 min. Send: CBC, biochem, coag profile (PT, aPTT), blood smear, ± buccal mucosal bleeding time (BMBT) if cooperative.<br>
    3. <strong>Empirical therapy while awaiting results</strong>: vitamin K1 5 mg/kg SC (NOT IV — anaphylaxis) for any suspected rodenticide; fresh frozen plasma if active cavity bleeding and PT/aPTT severely prolonged.<br>
    4. <strong>Avoid intramuscular injections</strong> and cystocentesis in any patient with suspected coagulopathy.<br>
    5. <strong>Type and cross-match</strong> before transfusion. Cats: type before transfusion is mandatory — Type B cats carry strong naturally-occurring anti-A antibodies and react severely (potentially fatal) to Type A blood. Type A cats have weak anti-B (mild reaction). Type AB cats have no anti-A or anti-B antibodies and are universal recipients.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — TIER 1 LABORATORY EVALUATION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Complete blood count + manual smear examination</strong>:
    <div style="margin-left:8px;">
      • Platelet count — automated platelet counts can be falsely low (clumping); always verify by smear estimation (1 platelet per HPF ≈ 15 ×10⁹/L; normal &gt; 200 ×10⁹/L; &lt;30–50 ×10⁹/L = spontaneous bleeding risk)<br>
      • Anaemia (regenerative — haemolysis, blood loss; non-regenerative — bone marrow suppression)<br>
      • Spherocytes (IMHA), schistocytes (DIC, vasculopathy), Heinz bodies (oxidative), nucleated RBCs (bone marrow stress / lead)<br>
      • Reticulocyte count — regenerative response &gt; 60–80 ×10⁹/L (cat) / &gt; 60 ×10⁹/L (dog)<br>
      • Leukogram (leucocytosis with stress / inflammation / sepsis / DIC; left shift; lymphocytosis with Ehrlichia)
    </div>
    <strong>Coagulation profile</strong>:
    <div style="margin-left:8px;">
      • <strong>PT</strong> (extrinsic + common: factors VII, X, V, II, fibrinogen) — prolongs first with vit K antagonists (factor VII shortest half-life)<br>
      • <strong>aPTT</strong> (intrinsic + common: XII, XI, IX, VIII, X, V, II, fibrinogen)<br>
      • Combined PT + aPTT prolongation → common pathway, severe deficiency, rodenticide, DIC, hepatic failure<br>
      • PT only prolonged → factor VII (rare; early rodenticide; hepatic disease)<br>
      • aPTT only prolonged → factor VIII (haemophilia A), IX (haemophilia B), XI, XII (XII deficiency asymptomatic)<br>
      • <strong>ACT</strong> (activated clotting time) — bedside aPTT surrogate; less sensitive
    </div>
    <strong>Biochemistry + urinalysis</strong>: hepatic panel (factors made in liver), renal (uraemia → platelet dysfunction), albumin (PLN with bleeding), electrolytes (snake envenomation), CK (rhabdomyolysis).<br>
    <strong>Blood smear photos</strong> — share with referral clinical pathologist if findings unclear.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3 — DECISION BRANCH BASED ON TIER 1</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Severe thrombocytopenia (&lt;50 ×10⁹/L) + petechiae + normal PT/aPTT:</strong>
    <div style="margin-left:8px;">
      • Tick-borne panel (Ehrlichia, Anaplasma, Babesia, Rickettsia — 4Dx test)<br>
      • Coombs / saline agglutination (Evans syndrome — IMHA + IMTP)<br>
      • ANA · imaging for underlying neoplasia<br>
      • Bone marrow aspirate / core if no obvious cause<br>
      • Drug review<br>
      • IMTP often confirmed by exclusion + response to immunosuppression
    </div>
    <strong>PT and/or aPTT prolonged + normal platelet count + cavity bleed:</strong>
    <div style="margin-left:8px;">
      • Vitamin K1 SC empirically; recheck PT 48–72 h<br>
      • PIVKAs (proteins induced by vit K absence) — more sensitive for rodenticide than PT<br>
      • Bile acids + ammonia for hepatic failure<br>
      • Specific factor assays (VIII, IX, XI, XII) for inherited disease<br>
      • Fibrinogen + D-dimer + antithrombin (DIC panel)
    </div>
    <strong>Normal platelet count + normal coag + prolonged BMBT + mucosal bleeding pattern:</strong>
    <div style="margin-left:8px;">
      • vWF antigen (vWD) — predisposed breeds<br>
      • Platelet function: PFA-100 (limited availability), platelet aggregometry (referral)<br>
      • Uraemia / hyperglobulinaemia / drug-induced thrombocytopathia
    </div>
    <strong>Mixed primary + secondary defects + concurrent illness (sepsis, neoplasia, IMHA, pancreatitis):</strong>
    <div style="margin-left:8px;">
      • DIC panel: PT, aPTT, platelet count, fibrinogen, D-dimer, antithrombin<br>
      • &gt; 3 of 5 abnormalities = clinical DIC (overt vs non-overt scoring)<br>
      • Treat the underlying cause; supportive plasma transfusion if active bleeding
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — ADVANCED / SPECIALIST TESTS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>vWF antigen + collagen-binding activity</strong> (referral lab): screen Doberman, Sheltie, Scottie, Golden Retriever pre-operatively; type I, II, III differentiation.<br>
    <strong>Specific factor assays</strong> — VIII, IX, XI, XII (for haemophilia and intrinsic deficiencies); factor VII (Beagle); fibrinogen (afibrinogenaemia).<br>
    <strong>Platelet function testing</strong>: PFA-100 closure time, multiplate aggregometry, flow cytometry (Glanzmann, Scott syndrome).<br>
    <strong>Thromboelastography (TEG)</strong> / rotational thromboelastometry (ROTEM): global haemostasis — useful in DIC, hepatic failure, hyperfibrinolysis (Greyhound post-op bleeding).<br>
    <strong>PIVKAs</strong>: highly sensitive screening test for vitamin K antagonism — positive within hours.<br>
    <strong>Snake / spider venom antigen detection</strong>: where commercially available (Australia, US).<br>
    <strong>Bone marrow aspirate + core biopsy</strong>: persistent unexplained pancytopenia, ITP refractory, suspected myelodysplasia, leukaemia, myelophthisis.<br>
    <strong>Tick-borne disease workup</strong>: 4Dx (Ehrlichia canis / ewingii, Anaplasma phagocytophilum / platys, Borrelia, heartworm) + Babesia PCR + region-specific (Leishmania ELISA, RMSF, leptospirosis).<br>
    <strong>Abdominal + thoracic imaging</strong>: HSA / hepatic mass, mediastinal mass, retroperitoneal haemorrhage, splenic / hepatic rupture.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 5 — TREATMENT POINTERS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Anticoagulant rodenticide:</strong> Vitamin K1 PO 3–5 mg/kg divided BID × 28 d (2nd-generation; 14 d for 1st generation). FFP / PCC if active bleeding. Recheck PT 72 h after last dose.<br>
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
    <strong>Snake envenomation:</strong> antivenom (region-specific); supportive care; FFP for cascade defect; monitor renal function (myoglobinuria, AKI).
  </div>

</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Practical pearls:</strong><br>
  • Always count platelets manually on smear — automated counts mislead with clumping.<br>
  • PT prolongs first in rodenticide (factor VII shortest half-life); empirical vit K1 SC is safe to give while awaiting confirmation.<br>
  • In Doberman with epistaxis or pre-surgical patient, screen vWF antigen — don't wait for the surgical bleed.<br>
  • Use small-gauge needles, peripheral veins, and prolonged pressure for any bleeding patient.<br>
  • Vitamin K1 IV causes anaphylaxis — give SC at multiple sites.<br>
  • Cat blood typing is mandatory before any transfusion (Type B cats have strong naturally-occurring anti-A antibodies → severe, potentially fatal haemolytic reaction to Type A blood; Type AB cats are universal recipients).<br>
  • Always image for splenic / hepatic mass in any acute haemoperitoneum — HSA, hepatocellular carcinoma, less commonly HSA-like vascular lesions.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
