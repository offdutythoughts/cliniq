// ── Bleeding / Petechiae / Ecchymoses — diagnostic approach (data) ──────────
// Migration of bleedingDx{History,Exam,Dx}Html (legacy HTML consts in
// ../bleeding.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { numBadge } from './shared/dxHelpers'

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
      { kind: 'step', text: '📋 STEP 1 — ONSET + PROGRESSION', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Peracute</strong><br>hours`, { text: 'Trauma · splenic / hepatic mass rupture (HSA, hepatocellular ca) · severe coagulopathy (rodenticide overdose, snake envenomation) · heatstroke-induced DIC', tone: 'teal' }],
          [`${numBadge(2)}<strong>Acute</strong><br>days`, { text: 'IMTP onset · rodenticide intoxication · acute sepsis with DIC · IMHA-related secondary DIC · acute liver failure', tone: 'teal' }],
          [`${numBadge(3)}<strong>Subacute</strong><br>weeks`, { text: 'Tick-borne disease (Ehrlichia · Anaplasma · Babesia — anaemia + thrombocytopenia ± neuro) · chronic hepatic disease · occult neoplasia with DIC · intermittent IMTP relapse', tone: 'teal' }],
          [`${numBadge(4)}<strong>Chronic / lifelong</strong>`, { text: 'Inherited coagulopathies (haemophilia A — factor VIII; haemophilia B — factor IX; vWD types I–III) · thrombocytopathies (Glanzmann, Scott syndrome) · heritable vasculopathies', tone: 'teal' }],
          [`${numBadge(5)}<strong>Episodic recurrent from puppyhood</strong>`, { text: 'Inherited factor deficiency or vWD — ask about bleeding from the umbilicus, deciduous tooth eruption, neutering surgery', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '💊 STEP 2 — DRUG / TOXIN / EXPOSURE HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Exposure', { text: 'Detail / effect', tone: 'teal' }],
        rows: [
          ['<strong>Anticoagulants / rodenticides</strong>', { text: 'Warfarin · brodifacoum · bromadiolone · difenacoum (2nd-generation — last weeks). Bait colour turquoise / pink / green — variable', tone: 'teal' }],
          ['<strong>Antiplatelet drugs</strong>', { text: 'Aspirin · clopidogrel · NSAIDs (carprofen, meloxicam — at supratherapeutic doses)', tone: 'teal' }],
          ['<strong>Cytotoxic chemotherapy</strong>', { text: 'Vincristine · doxorubicin → thrombocytopenia', tone: 'teal' }],
          ['<strong>Snake / spider envenomation</strong>', { text: 'Rattlesnake (combined primary + secondary defect) · Australian elapids (procoagulant + neurotoxic) · brown recluse / Latrodectus', tone: 'teal' }],
          ['<strong>Paracetamol</strong> — 🐱 especially', { text: 'Heinz-body haemolytic anaemia → haemoglobinuria (<strong>not</strong> true bleeding)', tone: 'teal' }],
          ['<strong>Heparin / dabigatran / rivaroxaban</strong>', { text: 'Deliberate or accidental', tone: 'teal' }],
          ['<strong>Plant toxins</strong>', { text: 'Mouldy sweet clover hay (Melilotus — dicoumarol; primarily a livestock toxicity, anecdotally reported in dogs) · bracken (thrombocytopenia in livestock) · foxglove (cardiac)', tone: 'teal' }],
          ['<strong>Heat / environmental</strong>', { text: 'Heatstroke → DIC', tone: 'teal' }],
          ['<strong>Recent vaccinations</strong>', { text: 'Rare association with immune-mediated thrombocytopenia', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🩺 STEP 3 — SYSTEMIC / FAMILY / BREEDING HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Family / breed history',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Breed', { text: 'Inherited defect', tone: 'teal' }],
        rows: [
          ['Doberman · Sheltie · Golden Retriever · Scottish Terrier', { text: '<strong>vWD</strong> — Doberman type I; Scottie type III is most severe', tone: 'teal' }],
          ['German Shepherd', { text: '<strong>Haemophilia A</strong> (factor VIII)', tone: 'teal' }],
          ['Boxer · Cairn Terrier', { text: 'Factor VIII or factor IX', tone: 'teal' }],
          ['Otterhound', { text: 'Glanzmann thrombasthenia', tone: 'teal' }],
          ['Beagle', { text: 'Factor VII deficiency — usually asymptomatic', tone: 'teal' }],
          ['GSD (familial cutaneous vasculopathy) · Jack Russell · Greyhound · Scottish Terrier · Saint Bernard · Shar-Pei', { text: 'Breed-predisposed <strong>cutaneous vasculitis</strong>', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Acquired / systemic history',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Concurrent illness</strong><br>sepsis · neoplasia · IMHA · severe pancreatitis · parvoviral enteritis', { text: '<strong>DIC</strong> risk', tone: 'teal' }],
          ['<strong>Older intact male dog with feminisation</strong><br>symmetrical alopecia · gynaecomastia · bilateral pendulous abdomen', { text: '<strong>Sertoli cell tumour</strong> hyperestrogenism → bone marrow suppression → thrombocytopenia + non-regenerative anaemia + bleeding', tone: 'teal' }],
          ['<strong>Travel + tick exposure</strong>', { text: 'Ehrlichia / Anaplasma / Babesia / Rickettsia → thrombocytopenia + immune-mediated bleeding', tone: 'teal' }],
          ['<strong>Geographic</strong>', { text: 'Leishmania (Mediterranean / imported) · Crotalus envenomation · brown recluse spider', tone: 'teal' }],
          ['<strong>Jaundice + bleeding</strong>', { text: 'Hepatic failure — factors II, VII, IX, X and fibrinogen are all hepatically produced', tone: 'teal' }],
          ['<strong>Uraemia + bleeding</strong>', { text: 'Uraemic platelet dysfunction → primary haemostatic defect despite normal counts', tone: 'teal' }],
          ['<strong>Previous transfusion / blood products</strong>', { text: 'Alloimmunisation · post-transfusion purpura (rare)', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🐾 STEP 4 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Cocker Spaniel', 'Poodle', 'Old English Sheepdog', 'Lhasa Apso', 'Maltese'], tone: 'danger', html: 'idiopathic IMTP.' },
          { breeds: ['Doberman'], tone: 'warning', html: 'vWD type I (mild–moderate). Pre-op testing is essential before any surgery.' },
          { breeds: ['Scottish Terrier', 'Shetland'], tone: 'green', html: 'vWD type III — the most severe form; spontaneous bleeding.' },
          { breeds: ['German Shepherd'], tone: 'violet', html: 'haemophilia A (factor VIII, X-linked).' },
          { breeds: ['German Shepherd', 'Golden Retriever', 'Labrador', 'Pointer'], tone: 'danger', html: 'splenic / hepatic HSA in the middle-aged–older large breed → acute haemoperitoneum + collapse + pale gums.' },
          { breeds: ['Cocker Spaniel', 'Springer'], tone: 'info', html: 'familial vasculopathy (idiopathic cutaneous vasculitis).' },
          { breeds: ['Greyhound'], tone: 'danger', html: 'post-operative fibrinolysis tendency (aminocaproic acid prophylaxis).' },
          { breeds: ['Cavalier King Charles Spaniel'], tone: 'green', html: 'macrothrombocytopenia — mild and asymptomatic; beware misinterpreting the low count.' },
          { breeds: ['Norfolk Terrier', 'Otterhound'], tone: 'violet', html: 'Glanzmann thrombasthenia.' },
          { breeds: ['Sighthound', 'Greyhound'], tone: 'warning', html: 'CRGV / "Alabama rot" — skin ulcers + AKI + thrombocytopenia.' },
          { breeds: ['Older intact male'], group: 'signalment', tone: 'warning', html: 'Sertoli cell tumour with hyperestrogenism → bone marrow suppression → pancytopenia + bleeding.' },
        ],
        cat: [
          { breeds: ['Birman'], tone: 'info', html: 'reported hereditary factor XII deficiency (asymptomatic — prolonged aPTT found incidentally).' },
          { breeds: ['Domestic Shorthair'], tone: 'green', html: 'young to middle-aged with epistaxis + petechiae → tick-borne disease (endemic areas), FIP-associated vasculitis, idiopathic IMTP (less common than in the dog).' },
          { breeds: ['FeLV / FIV positive'], group: 'signalment', tone: 'violet', html: 'bone marrow suppression → thrombocytopenia + anaemia + bleeding tendency.' },
          { breeds: ['Sepsis, pancreatitis, severe pyrexia'], group: 'signalment', tone: 'warning', html: 'DIC.' },
          { breeds: ['Mycoplasma haemofelis'], group: 'signalment', tone: 'danger', html: 'with concurrent infection → haemolytic anaemia + thrombocytopenia.' },
          { breeds: ['Outdoor cat, envenomation history'], group: 'signalment', tone: 'danger', html: 'snake / spider bite — combined primary + secondary defect.' },
          { breeds: ['On long-term anticoagulant'], group: 'signalment', tone: 'warning', html: 'iatrogenic — clopidogrel for cardiomyopathy / ATE prevention.' },
        ],
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
      { kind: 'step', text: '🩺 STEP 1 — FROM A DISTANCE', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Observe', { text: 'What it means', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Mentation + perfusion</strong>`, { text: 'Collapsed · tachycardic · weak pulses → <strong>haemorrhagic shock</strong> (cavity bleed, severe envenomation)', tone: 'danger' }],
          [`${numBadge(2)}<strong>Mucous membranes</strong>`, { text: 'Pale (blood loss) · petechiae (thrombocytopenia, vasculitis) · icteric (concurrent haemolysis / hepatic failure)', tone: 'teal' }],
          [`${numBadge(3)}<strong>Abdominal distension</strong>`, { text: 'Haemoperitoneum — HSA rupture · rodenticide · hepatic mass', tone: 'teal' }],
          [`${numBadge(4)}<strong>Dyspnoea</strong>`, { text: 'Haemothorax (cavity bleed) — restrictive breathing pattern', tone: 'teal' }],
          [`${numBadge(5)}<strong>Lameness / joint swelling</strong>`, { text: 'Haemarthrosis (factor deficiency)', tone: 'teal' }],
          [`${numBadge(6)}<strong>Skin lesions</strong>`, { text: 'Petechiae (ventrum · sclera · oral mucosa · pinnae) · ecchymoses · vasculitis ulcers · alopecia of Sertoli hyperestrogenism', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '👋 STEP 2 — FOCUSED EXAM', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Petechiae location</strong>', { text: 'Ventral abdomen · axilla · oral mucosa (especially upper canine pillar) · conjunctiva · pinnae · sclera · pads. Quantify — few / scattered / generalised', tone: 'teal' }],
          ['<strong>Ecchymoses</strong>', { text: 'Mild bruising at venepuncture sites · ascending from injection sites · spontaneous large bruises = severe', tone: 'teal' }],
          ['<strong>Mucous membrane bleeding</strong>', { text: 'Gingival ooze · epistaxis (especially Doberman vWD) · retinal haemorrhage · oral haemorrhage post-meal', tone: 'teal' }],
          ['<strong>Abdominal palpation</strong>', { text: 'Pain · fluid wave · masses (splenic / hepatic — <strong>do not palpate a suspected mass aggressively</strong>) · bladder for haematuria', tone: 'teal' }],
          ['<strong>Thoracic auscultation + percussion</strong>', { text: 'Muffled sounds + dyspnoea = haemothorax', tone: 'teal' }],
          ['<strong>Lymphadenopathy</strong>', { text: 'Lymphoma · ehrlichiosis · leishmaniasis', tone: 'teal' }],
          ['<strong>Joint palpation</strong>', { text: 'Haemarthrosis (warm, swollen, painful — factor deficiency) · polyarthritis (vasculitis, SLE)', tone: 'teal' }],
          ['<strong>Testicular palpation</strong> (intact male)', { text: 'Sertoli cell tumour — asymmetric firm mass + feminisation', tone: 'teal' }],
          ['<strong>Rectal exam</strong>', { text: 'Melena (upper GI bleed) · haematochezia (lower GI) · prostatic disease · anal sac mass', tone: 'teal' }],
          ['<strong>Spinal palpation</strong>', { text: 'Vertebral haemorrhage · spinal IVDD with subarachnoid bleed', tone: 'teal' }],
          ['<strong>Skin / coat</strong>', { text: 'Vasculitis lesions (ulcers · ear-tip necrosis · footpad ulcers — pinnae especially) · bilaterally symmetrical alopecia of hyperestrogenism · Cushingoid changes (HAC predisposes to PTE not bleeding, but iatrogenic steroid use predisposes to GI ulcer / haemorrhage)', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🔍 STEP 3 — PATTERN RECOGNITION', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '1fr 1.2fr',
        dividers: true,
        headers: ['Finding', { text: 'Most likely', tone: 'teal' }],
        rows: [
          ['Generalised petechiae + ecchymoses + mucosal bleeds + platelet count &lt;30 ×10⁹/L', { text: 'IMTP (primary or 2°)', tone: 'danger' }],
          ['Doberman or Sheltie with epistaxis + prolonged BMBT + normal platelet count', { text: 'von Willebrand disease', tone: 'warning' }],
          ['Acute haemoperitoneum + collapse + pale gums + older large breed dog', { text: 'Splenic / hepatic HSA rupture', tone: 'danger' }],
          ['Haemothorax + cough / dyspnoea + history of access to bait', { text: 'Anticoagulant rodenticide', tone: 'danger' }],
          ['Haemarthrosis + young male dog + family history', { text: 'Haemophilia A / B (X-linked)', tone: 'violet' }],
          ['Petechiae + cavity bleed + sepsis / neoplasia / pancreatitis / IMHA', { text: 'DIC', tone: 'danger' }],
          ['Intact male dog + feminisation + bilateral alopecia + pancytopenia', { text: 'Sertoli cell tumour with hyperestrogenism', tone: 'danger' }],
          ['Ear-tip / footpad necrosis + crusting + cutaneous ulcers', { text: 'Cutaneous vasculitis', tone: 'violet' }],
          ['Bleeding + acute renal failure + skin ulcers + sighthound', { text: 'CRGV / "Alabama rot"', tone: 'danger' }],
          ['Concurrent anaemia + thrombocytopenia + tick exposure', { text: 'Tick-borne — Ehrlichia · Anaplasma · Babesia', tone: 'green' }],
          ['Jaundice + ascites + bleeding', { text: 'Hepatic failure', tone: 'danger' }],
          ['🐱 FIP / lymphoma / cytauxzoon + thromboembolic signs (acute hindlimb paresis, pulmonary signs) — minimal external bleeding', { text: 'Feline DIC (thrombotic phenotype) — grave', tone: 'info' }],
          ['🐱 Birman / Siamese / DSH with isolated aPTT prolongation pre-op, no bleeding', { text: 'Factor XII deficiency — clinically silent', tone: 'info' }],
          ['Mediterranean / African origin cat with regenerative anaemia + FeLV positive', { text: 'Babesia felis', tone: 'info' }],
        ],
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Bleeding — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>ABC + shock assessment</strong>`, { text: 'IV access (avoid jugular if coagulopathy suspected — use peripheral) · oxygen · IV crystalloid bolus · transfuse (whole blood, packed RBC, plasma) if life-threatening haemorrhage', tone: 'danger' }],
          [`${numBadge(2)}<strong>Blood sampling order matters</strong>`, { text: 'Minimise venepuncture sites · small-gauge needles · pressure for ≥5 min. Send CBC · biochem · coag profile (PT, aPTT) · blood smear ± buccal mucosal bleeding time (BMBT) if cooperative', tone: 'teal' }],
          [`${numBadge(3)}<strong>Empirical therapy while awaiting results</strong>`, { text: 'Vitamin K1 5 mg/kg <strong>SC</strong> (NOT IV — anaphylaxis) for any suspected rodenticide · fresh frozen plasma if active cavity bleeding and PT/aPTT severely prolonged', tone: 'teal' }],
          [`${numBadge(4)}<strong>Avoid</strong>`, { text: 'Intramuscular injections and cystocentesis in any patient with suspected coagulopathy', tone: 'danger' }],
          [`${numBadge(5)}<strong>Type and cross-match</strong> before transfusion`, { text: '🐱 typing is <strong>mandatory</strong> — Type B cats carry strong naturally-occurring anti-A antibodies and react severely (potentially fatally) to Type A blood; Type A cats have weak anti-B (mild reaction); Type AB cats have neither antibody and are universal recipients', tone: 'danger' }],
        ],
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
      { kind: 'step', text: '🔬 STEP 3 — ADVANCED / SPECIALIST TESTS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Test', { text: 'Indication / what it shows', tone: 'teal' }],
        rows: [
          ['<strong>vWF antigen + collagen-binding activity</strong><br>referral lab', { text: 'Screen Doberman · Sheltie · Scottie · Golden Retriever pre-operatively; differentiates type I, II, III', tone: 'teal' }],
          ['<strong>Specific factor assays</strong>', { text: 'VIII · IX · XI · XII (haemophilia and intrinsic deficiencies) · factor VII (Beagle) · fibrinogen (afibrinogenaemia)', tone: 'teal' }],
          ['<strong>Platelet function testing</strong>', { text: 'PFA-100 closure time · multiplate aggregometry · flow cytometry (Glanzmann, Scott syndrome)', tone: 'teal' }],
          ['<strong>TEG / ROTEM</strong>', { text: 'Global haemostasis — useful in DIC · hepatic failure · hyperfibrinolysis (Greyhound post-op bleeding)', tone: 'teal' }],
          ['<strong>PIVKAs</strong>', { text: 'Highly sensitive screen for vitamin K antagonism — positive within hours', tone: 'teal' }],
          ['<strong>Snake / spider venom antigen detection</strong>', { text: 'Where commercially available (Australia, US)', tone: 'teal' }],
          ['<strong>Bone marrow aspirate + core biopsy</strong>', { text: 'Persistent unexplained pancytopenia · refractory ITP · suspected myelodysplasia, leukaemia, myelophthisis', tone: 'teal' }],
          ['<strong>Tick-borne disease workup</strong>', { text: '4Dx (Ehrlichia canis / ewingii · Anaplasma phagocytophilum / platys · Borrelia · heartworm) + Babesia PCR + region-specific (Leishmania ELISA · RMSF · leptospirosis)', tone: 'teal' }],
          ['<strong>Abdominal + thoracic imaging</strong>', { text: 'HSA / hepatic mass · mediastinal mass · retroperitoneal haemorrhage · splenic / hepatic rupture', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '💉 STEP 4 — TREATMENT POINTERS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Diagnosis', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Anticoagulant rodenticide</strong>', { text: 'Vitamin K1 PO 3–5 mg/kg divided BID × 28 d (2nd-generation; 14 d for 1st generation) · FFP / PCC if active bleeding · recheck PT 72 h after last dose', tone: 'teal' }],
          ['<strong>IMTP</strong>', { text: 'Prednisolone 2 mg/kg/day + adjunct (mycophenolate 10–20 mg/kg BID · cyclosporine · vincristine 0.02 mg/kg IV one-off · azathioprine — 🐕 only). Severe / refractory: IVIg, splenectomy (rare). Doxycycline if any tick exposure pending serology. Avoid IM injections + strict cage rest. Transfuse platelets only if life-threatening haemorrhage and concentrate available', tone: 'teal' }],
          ['<strong>IMHA</strong>', { text: 'Prednisolone 2 mg/kg/day + adjunct (mycophenolate · azathioprine · cyclosporine). Anti-thrombotic: clopidogrel + low-dose aspirin (PTE prophylaxis). Type and cross-match before any transfusion', tone: 'teal' }],
          ['<strong>vWD</strong>', { text: 'Cryoprecipitate or fresh frozen plasma · desmopressin (DDAVP) 1 µg/kg SC 30 min pre-op (releases stored vWF — works in Type I, <strong>not</strong> III) · avoid platelet inhibitors', tone: 'teal' }],
          ['<strong>Haemophilia A / B</strong>', { text: 'Fresh frozen plasma (FVIII or FIX) · recombinant factor concentrate where available · cage rest · avoid IM · lifelong management of bleeding episodes', tone: 'teal' }],
          ['<strong>DIC</strong>', { text: 'Treat the underlying cause aggressively. FFP for clotting factor replacement · cryoprecipitate if hypofibrinogenaemic · heparin controversial. Goals: maintain perfusion, treat the cause, support coagulation', tone: 'teal' }],
          ['<strong>Splenic / hepatic HSA rupture</strong>', { text: 'Stabilise + emergency splenectomy / partial hepatectomy · staging (thoracic CT · abdominal US · cardiac echo for right atrial HSA) · doxorubicin-based chemotherapy post-op — median survival 6–8 months even with multimodal therapy', tone: 'teal' }],
          ['<strong>Sertoli cell tumour</strong>', { text: 'Castration — resolves hyperestrogenism over 4–8 weeks. Pre-op bone marrow protection: transfusion support, antibiotic prophylaxis. Prognosis good if treated before irreversible marrow aplasia', tone: 'teal' }],
          ['<strong>Cutaneous vasculitis</strong>', { text: 'Identify and treat trigger (drug · infection · immune-mediated · neoplasia). Pentoxifylline 15–25 mg/kg BID + ω-3 fatty acids · immunosuppression for severe / progressive disease', tone: 'teal' }],
          ['<strong>Hepatic failure-related bleeding</strong>', { text: 'Vitamin K1 (some response if factor synthesis still possible) · FFP for active bleeding · correct hypoglycaemia and electrolytes · manage hepatic encephalopathy (lactulose)', tone: 'teal' }],
          ['<strong>Greyhound post-operative bleeding</strong>', { text: 'Aminocaproic acid 15 mg/kg PO TID × 5 days post-op as prophylaxis', tone: 'teal' }],
          ['<strong>Snake envenomation</strong>', { text: 'Antivenom (region-specific) · supportive care · FFP for cascade defect · monitor renal function (myoglobinuria, AKI)', tone: 'teal' }],
        ],
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
