// ── EPISTAXIS — clinical sign + diagnostic approach
// Sources: Today's Veterinary Practice / Clinician's Brief epistaxis monograph
// (Mullins, retrospective studies Bissett 2007, Strasser & Hawkins); Textbook of
// Veterinary Internal Medicine, 8th Ed. (nasal disease + haemostasis chapters).
//
// Core teaching point: the first fork is LOCAL (intranasal/paranasal) vs SYSTEMIC
// disease. Unilateral vs bilateral does NOT reliably separate them — 52% of dogs
// with systemic disease had unilateral epistaxis in one study.

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const epistaxisFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">👃 EPISTAXIS</div>
  <div class="flow-arrow-v">↓</div>

  <div style="padding:9px 12px;background:rgba(217,119,6,0.10);border:1px solid rgba(217,119,6,0.3);border-radius:10px;font-size:9.5px;color:var(--amber-text);line-height:1.5;width:100%;">
    ⚠️ <strong>Unilateral vs bilateral does NOT reliably separate local from systemic disease</strong> — up to 52% of dogs with systemic disease present with unilateral epistaxis. Use it as a clue, never a rule.
  </div>
  <div class="flow-arrow-v">↓</div>

  <div class="flow-node step">LOCAL (INTRANASAL) vs SYSTEMIC DISEASE?
    <div class="fn-sub" style="font-weight:400;margin-top:3px;">Intranasal disease ≈ 80% of identified canine causes — but rule out systemic bleeding first, it changes everything</div>
  </div>
  <div class="flow-arrow-v">↓</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">

    <!-- LOCAL branch -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div class="flow-node" style="width:100%;background:rgba(13,148,136,0.12);border-color:rgba(13,148,136,0.4);font-size:10px;font-weight:700;color:#5EEAD4;">
        🔵 LOCAL / INTRANASAL
        <div style="font-size:8.5px;font-weight:400;opacity:.85;margin-top:2px;">Chronic nasal signs · sneezing · stertor · mucopurulent discharge · unilateral epiphora · facial pain / deformity · nasal planum depigmentation · ↓ retropulsion · submandibular LN</div>
      </div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-endpoint" style="width:100%;background:rgba(139,92,246,0.10);border:1.5px solid rgba(139,92,246,0.35);color:#DDD6FE;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-NASAL-NEO')">
        🧬 NEOPLASIA<br><span style="opacity:.75;font-size:8px;">Most common local cause (30–66%) ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#A7F3D0;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-NASAL-ASP')">
        🍄 FUNGAL RHINITIS<br><span style="opacity:.75;font-size:8px;">Aspergillus — depigmentation + pain ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(16,185,129,0.08);border:1.5px solid rgba(16,185,129,0.3);color:#A7F3D0;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-NASAL-LPR')">
        🔥 IDIOPATHIC RHINITIS<br><span style="opacity:.75;font-size:8px;">Lymphoplasmacytic — Dx of exclusion ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(249,115,22,0.08);border:1.5px solid rgba(249,115,22,0.3);color:#FED7AA;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-NASAL-FB')">
        🌾 FOREIGN BODY<br><span style="opacity:.75;font-size:8px;">Acute violent sneezing → chronic ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);color:#FCA5A5;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-NASAL-TRAUMA')">
        🤕 TRAUMA<br><span style="opacity:.75;font-size:8px;">Acute onset · RTA · head strike ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(255,255,255,0.04);border:1.5px solid var(--border2);color:var(--gray);font-size:8.5px;cursor:default;text-align:center;">
        🦷 Dental / oronasal disease<br><span style="opacity:.7;">periapical abscess · oronasal fistula</span>
      </div>
    </div>

    <!-- SYSTEMIC branch -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div class="flow-node" style="width:100%;background:rgba(220,38,38,0.12);border-color:rgba(220,38,38,0.4);font-size:10px;font-weight:700;color:#FCA5A5;">
        🩸 SYSTEMIC DISEASE
        <div style="font-size:8.5px;font-weight:400;opacity:.85;margin-top:2px;">Bleeding at other sites · petechiae / ecchymoses · melena · gingival bleed · venepuncture bruising · lethargy · weight loss · hyphema / retinal haemorrhage</div>
      </div>
      <div class="flow-arrow-v">↓</div>
      <div class="flow-node sub-step" style="width:100%;font-size:9.5px;">Bleeding elsewhere → work up as a haemostatic defect</div>
      <div class="flow-endpoint" style="width:100%;background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.35);color:#FCA5A5;font-size:9px;cursor:pointer;text-align:center;" onclick="renderBleedingFlow()">
        🔗 PRIMARY vs SECONDARY HAEMOSTASIS<br><span style="opacity:.75;font-size:8px;">Open full bleeding flowchart ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(220,38,38,0.08);border:1.5px solid rgba(220,38,38,0.3);color:#FCA5A5;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-BD-IMTP')">
        🧱 THROMBOCYTOPENIA / IMTP<br><span style="opacity:.75;font-size:8px;">Commonest systemic cause ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.3);color:#FCD34D;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-BD-TPATH')">
        🩹 THROMBOCYTOPATHIA / vWD<br><span style="opacity:.75;font-size:8px;">Normal count, mucosal bleed ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(37,99,235,0.1);border:1.5px solid rgba(37,99,235,0.35);color:#93C5FD;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-BD-ROD')">
        ☠️ ANTICOAGULANT RODENTICIDE<br><span style="opacity:.75;font-size:8px;">PT prolongs first — give Vit K1 ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.3);color:#C4B5FD;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-INFECT-EHRLICH')">
        🦟 VECTOR-BORNE DISEASE<br><span style="opacity:.75;font-size:8px;">Ehrlichia · Leishmania · Babesia ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(139,92,246,0.08);border:1.5px solid rgba(139,92,246,0.3);color:#C4B5FD;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-VASC-HYPERVSC')">
        🩸 HYPERVISCOSITY<br><span style="opacity:.75;font-size:8px;">Myeloma · hyperglobulinaemia ›</span>
      </div>
      <div class="flow-endpoint" style="width:100%;background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.3);color:#FCD34D;font-size:9px;cursor:pointer;text-align:center;" onclick="renderDiseasePage('DIS-VASC-HYPERT')">
        📈 HYPERTENSION<br><span style="opacity:.75;font-size:8px;">Exacerbates rather than causes ›</span>
      </div>
    </div>

  </div>

  <div style="margin-top:12px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:5px;">⚡ ALWAYS RULE OUT / DON'T MISS</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Severe thrombocytopenia</strong> (platelet &lt;30–50 ×10⁹/L) — confirm on a fresh smear before anything invasive<br>
      • <strong onclick="renderDiseasePage('DIS-BD-ROD')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide</strong> — give Vitamin K1 SC empirically; FFP for active bleeding<br>
      • <strong>Hypovolaemia / anaemia from severe haemorrhage</strong> — rare but needs transfusion + fluid resuscitation, especially before GA for CT/rhinoscopy<br>
      • <strong>Swallowed blood → melena</strong> can falsely suggest a GI/systemic bleed — interpret melena cautiously in epistaxis
    </div>
  </div>

  <div class="dx-row c2" style="margin-top:10px;">
    <div class="dx-test" style="cursor:pointer;font-size:9.5px;" onclick="renderDxEpistaxis()">📋 Full diagnostic approach — History · Exam · Diagnostics ›</div>
    <div class="dx-test" style="cursor:pointer;font-size:9.5px;background:#0D7377;" onclick="renderDxBleeding()">🔗 Bleeding / haemostasis workup ›</div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#5EEAD4;margin-bottom:6px;">📋 DISEASE PAGES</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;">
      <div onclick="renderDiseasePage('DIS-NASAL-NEO')" style="cursor:pointer;color:#99F6E4;">→ Nasal / paranasal neoplasia</div>
      <div onclick="renderDiseasePage('DIS-NASAL-ASP')" style="cursor:pointer;color:#99F6E4;">→ Sinonasal aspergillosis</div>
      <div onclick="renderDiseasePage('DIS-NASAL-LPR')" style="cursor:pointer;color:#99F6E4;">→ Lymphoplasmacytic rhinitis</div>
      <div onclick="renderDiseasePage('DIS-NASAL-FB')" style="cursor:pointer;color:#99F6E4;">→ Nasal foreign body</div>
      <div onclick="renderDiseasePage('DIS-NASAL-TRAUMA')" style="cursor:pointer;color:#99F6E4;">→ Nasal trauma</div>
      <div onclick="renderDiseasePage('DIS-BD-IMTP')" style="cursor:pointer;color:#99F6E4;">→ Immune-mediated thrombocytopenia</div>
      <div onclick="renderDiseasePage('DIS-BD-TPATH')" style="cursor:pointer;color:#99F6E4;">→ Thrombocytopathia / vWD</div>
      <div onclick="renderDiseasePage('DIS-BD-ROD')" style="cursor:pointer;color:#99F6E4;">→ Anticoagulant rodenticide</div>
      <div onclick="renderDiseasePage('DIS-BD-DIC')" style="cursor:pointer;color:#99F6E4;">→ DIC</div>
      <div onclick="renderDiseasePage('DIS-INFECT-EHRLICH')" style="cursor:pointer;color:#99F6E4;">→ Ehrlichiosis</div>
      <div onclick="renderDiseasePage('DIS-INFECT-LEISHM')" style="cursor:pointer;color:#99F6E4;">→ Leishmaniosis</div>
      <div onclick="renderDiseasePage('DIS-VASC-HYPERVSC')" style="cursor:pointer;color:#99F6E4;">→ Hyperviscosity syndrome</div>
      <div onclick="renderDiseasePage('DIS-VASC-HYPERT')" style="cursor:pointer;color:#99F6E4;">→ Systemic hypertension</div>
    </div>
  </div>
</div>
`;

// ── Tab nav helper ─────────────────────────────────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxEpistaxisHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxEpistaxisExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxEpistaxisDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const epistaxisDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">GOAL: LOCALISE vs SYSTEMATISE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c2">
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">🔵 Points to LOCAL (intranasal)</strong><br>
      Chronic nasal signs (esp. neoplasia)<br>
      Sneezing · stertor · mucopurulent discharge<br>
      Unilateral epiphora · facial rubbing / pain<br>
      No history of bleeding elsewhere
    </div>
    <div class="dx-test" style="text-align:left;background:#0D7377;font-size:9px;">
      <strong style="font-size:10px;">🩸 Points to SYSTEMIC</strong><br>
      Bleeding at extra-nasal sites<br>
      Lethargy · inappetence · weight loss<br>
      Historical bleeding tendency<br>
      Rodenticide / drug / tick exposure
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 ONSET, DURATION & TYPE OF NASAL SIGNS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Chronic nasal signs</strong> → favour intranasal disease, particularly <strong>neoplasia</strong>.<br>
    <strong>Acute onset</strong> → favours trauma; foreign body can be acute (violent sneezing) then become chronic.<br>
    <strong>Other nasal-tract signs</strong> (sneezing, stertor, mucopurulent discharge, unilateral epiphora, nasal planum depigmentation, facial rubbing/pain) are more common with intranasal disease.<br>
    <strong>Mucoid / mucopurulent discharge is rare in systemic causes</strong> — its presence shifts you toward local disease.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💊 MEDICATION / TOXIN EXPOSURE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Drugs that increase bleeding tendency:</strong> aspirin / other NSAIDs, clopidogrel, rivaroxaban — ask specifically and consider discontinuing.<br>
    <strong>Topical nasal sprays / inhaled medications</strong> may locally irritate the nasal mucosa.<br>
    <strong>Anticoagulant rodenticide</strong> — assess potential access in any patient with other signs of haemorrhage; treat empirically with Vitamin K1 if suspected.<br>
    <strong>Chemotherapy / oestrogens</strong> → marrow suppression / thrombocytopenia.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 SYSTEMIC & BLEEDING HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Systemic signs</strong> (lethargy, inappetence, weight loss) → more common with systemic causes.<br>
    <strong>Bleeding at other (extra-nasal) sites</strong> → strongly favours systemic disease; most likely with severe thrombocytopenia.<br>
    <strong>Historical bleeding tendency, especially in a young patient</strong> (umbilical, deciduous-tooth, post-neuter or post-surgical bleeding) → inherited coagulopathy / von Willebrand disease.<br>
    <strong>Melena</strong> may simply be swallowed blood — do not over-interpret as a GI/systemic bleed.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🌍 GEOGRAPHIC / LIFESTYLE / BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Tick exposure, preventive history, geographic location & travel</strong> → vector-borne disease risk (ehrlichiosis, leishmaniosis, anaplasmosis, babesiosis, RMSF).<br>
    <strong>Geography</strong> also drives fungal rhinitis risk (e.g. <em>Aspergillus</em>, <em>Cryptococcus</em>).<br>
    <strong>Outdoor / free-roaming</strong> → higher chance of traumatic or infectious cause.<br>
    <strong>Breed dispositions:</strong>
    <div style="margin-left:8px;">
      • Doberman, Pembroke Welsh Corgi, Scottish Terrier, Shetland Sheepdog, Chesapeake Bay Retriever, Pointer → <strong>von Willebrand disease</strong><br>
      • Greater Swiss Mountain Dog → P2Y12 platelet-receptor mutation (thrombocytopathia)<br>
      • Otterhound, Great Pyrenees → Glanzmann thrombasthenia<br>
      • Dolichocephalic breeds (Collie, GSD, Greyhound) → predisposed to nasal neoplasia / aspergillosis
    </div>
    <strong>Concurrent dermatologic disease</strong> was more common in dogs with idiopathic rhinitis.
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS IN THE HISTORY</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Bleeding at multiple sites + lethargy / weight loss = systemic disease until proven otherwise · Young animal with lifelong/recurrent bleeding = inherited coagulopathy — test before any surgery · Possible rodenticide access = empirical Vitamin K1 now · Chronic unilateral nasal signs in an older dolichocephalic dog = neoplasia high on list.
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const epistaxisDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(13,148,136,0.15);border-color:rgba(13,148,136,0.4);color:#5EEAD4;">🩺 A complete PE is imperative — include FUNDIC + RECTAL exam</div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">👃 STEP 1 — CHARACTERISE THE EPISTAXIS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Unilateral or bilateral?</strong> Note it, but it does <strong>not</strong> reliably predict local vs systemic (52% of systemic cases were unilateral).<br>
    <strong>Decreased nasal airflow</strong> may indicate intranasal disease — but any epistaxis can occlude the nostril with clot, so interpret cautiously.<br>
    <strong>Gross abnormalities</strong> of the nose, frontal sinus, or palate deformities are essentially limited to intranasal disease.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔵 STEP 2 — LOCAL (INTRANASAL) SIGNS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Sneezing, stertor, mucopurulent nasal discharge, unilateral epiphora, nasal planum depigmentation, <strong>reduced ocular retropulsion</strong> (retrobulbar extension), facial pain / rubbing.<br>
    <strong>Regional (submandibular) lymphadenopathy</strong> — in one study was seen <em>only</em> with intranasal disease.<br>
    <strong>Dental disease</strong> — assess closely for periodontal disease, periapical infection, palate erosion / oronasal fistula.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩸 STEP 3 — SIGNS OF SYSTEMIC HAEMORRHAGE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Primary haemostatic pattern (mucosal/cutaneous):</strong> petechiae, ecchymoses, gingival haemorrhage, increased bruising at venepuncture sites, melena (caution — may be swallowed blood).<br>
    <strong>Secondary haemostatic pattern:</strong> cavity bleeding (haemoperitoneum, haemothorax, haemarthrosis), haematomas.<br>
    <strong>Generalised lymphadenopathy</strong> → consider lymphoma, ehrlichiosis, leishmaniosis.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👁️ STEP 4 — OPHTHALMIC & NEURO EXAM</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Uveitis</strong> (aqueous flare) → neoplastic / infectious disease (fungal, leishmaniosis).<br>
    <strong>Focal retinal haemorrhage</strong> → vasculitis, vector-borne disease, fungal disease, systemic hypertension, any bleeding diathesis.<br>
    <strong>Hyphema</strong> → systemic bleeding disorder.<br>
    <strong>Retinal detachment</strong> — exudative (ehrlichiosis) or serous (panuveitis: lymphoma, systemic fungal); also classic for hypertension.<br>
    <strong>Neurologic abnormalities</strong> → intracranial extension of nasal disease, or concurrent intracranial bleeding (more common with systemic causes).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔍 STEP 5 — PATTERN RECOGNITION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Chronic unilateral signs + facial deformity + ↓ retropulsion + submandibular LN</div><div style="color:#DDD6FE;">Nasal neoplasia</div>
      <div>Nasal planum depigmentation/ulceration + marked nasal pain + fungal plaques</div><div style="color:#A7F3D0;">Aspergillosis</div>
      <div>Peracute violent sneezing + pawing at nose, outdoor dog</div><div style="color:#FED7AA;">Nasal foreign body</div>
      <div>Petechiae + ecchymoses + multiple-site mucosal bleeding</div><div style="color:#F87171;">Thrombocytopenia / IMTP</div>
      <div>Mucosal bleeding + normal platelet count (predisposed breed)</div><div style="color:#FCD34D;">vWD / thrombocytopathia</div>
      <div>Cavity bleed / haematoma + access to bait</div><div style="color:#93C5FD;">Anticoagulant rodenticide</div>
      <div>Hyperglobulinaemia + hyperviscosity signs (retinal, neuro)</div><div style="color:#C4B5FD;">Myeloma / hyperviscosity</div>
      <div>Retinal haemorrhage + thrombocytopenia + tick exposure</div><div style="color:#C4B5FD;">Vector-borne disease</div>
    </div>
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const epistaxisDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.4);color:#F87171;">⚡ STEP 1 — STABILISE FIRST</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    1. Epistaxis <strong>rarely</strong> is a true emergency — but severe haemorrhage can cause anaemia, hypovolaemia or upper-airway obstruction.<br>
    2. <strong>Transfuse</strong> (whole blood / pRBC) for symptomatic anaemia; <strong>fluid resuscitate</strong> hypovolaemic patients — especially to stabilise before GA for CT / rhinoscopy.<br>
    3. <strong>Plasma transfusion</strong> for severe haemorrhage with suspected factor deficiency / antagonism (haemophilia, rodenticide).<br>
    4. <strong>Protect the airway</strong> — consider intubation if risk of obstruction or aspiration; interventional control is ideally performed on an anaesthetised, intubated patient.<br>
    5. Minimise venepuncture sites, use small-gauge needles and prolonged pressure if a coagulopathy is suspected.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — MINIMUM DATABASE (every significant case)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>CBC + blood smear:</strong>
    <div style="margin-left:8px;">
      • Platelet count — clinical bleeding usually needs <strong>severe</strong> thrombocytopenia (&lt;30–50 ×10⁹/L). Confirm on a fresh smear; manual estimate = mean platelets/100× field × 15 ×10⁹/L. Check the feathered edge for clumping.<br>
      • Anaemia from blood loss is expected to be <strong>regenerative</strong> (reticulocytosis, polychromasia) — but peracute loss may be pre-regenerative.<br>
      • Platelet count does NOT reliably separate local from systemic disease.
    </div>
    <strong>Serum chemistry:</strong> screen for systemic disease (azotaemia, ↑ liver enzymes, hypercalcaemia). <strong>Hyperglobulinaemia</strong> is key — moderate–severe with ehrlichiosis, leishmaniosis, myeloma → follow with protein electrophoresis (mono- vs polyclonal). Rarely <em>cryoglobulinaemia</em>.<br>
    <strong>Urinalysis:</strong> underlying renal disease + haematuria (wider mucosal haemorrhage).<br>
    <strong>Blood pressure (ideally Doppler):</strong> hypertension exacerbates bleeding — measure especially with retinal haemorrhage or neuro signs.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3a — IF LOCAL DISEASE SUSPECTED → IMAGE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>CT is the imaging modality of choice</strong> — cross-sectional, fine bony detail, faster than skull radiographs; image <em>before</em> rhinoscopy/biopsy (blood obscures the scan).<br>
    <strong>Rhinoscopy</strong> is complementary — direct mucosal assessment + biopsy, but cannot assess bony involvement.<br>
    <strong>Radiography</strong> — limited by superimposition; largely superseded by CT. <strong>MRI</strong> — superior soft-tissue / intracranial-extension detail.<br>
    ⚠️ Radiopacity, bony lysis and frontal-sinus involvement occur with BOTH malignant and benign disease (fungal, FB, lymphoplasmacytic) — imaging <strong>cannot</strong> distinguish them; <strong>biopsy / histopathology is required</strong>.<br>
    <strong>Fungal testing</strong> (cytology, fungal plaques on rhinoscopy, serology/PCR) and <strong>parasite testing</strong> as indicated.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3b — IF SYSTEMIC DISEASE SUSPECTED → COAGULATION TIERS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Primary haemostasis</strong> (epistaxis is classically a mucosal/primary-defect bleed):
    <div style="margin-left:8px;">
      • Platelet count + smear estimate (above)<br>
      • Platelet function — BMBT (point-of-care screen; normal dog &lt;3 min), point-of-care analysers, aggregometry, flow cytometry<br>
      • <strong>vWF:Ag</strong> if normal platelet count + mucosal bleeding, esp. predisposed breeds (&gt;70% normal; &lt;50% at risk; &lt;25% severely affected)
    </div>
    <strong>Secondary haemostasis — PT / aPTT:</strong>
    <div style="margin-left:8px;">
      • Both prolonged → common pathway, vitamin K antagonism, liver disease, DIC<br>
      • aPTT only → haemophilia A (VIII), B (IX), C (XI), contact factors<br>
      • PT only → factor VII deficiency or <em>early</em> vitamin K antagonism (shortest half-life)<br>
      • PT/aPTT are normal in primary haemostatic disorders (and were normal in all 35 dogs in one epistaxis series)
    </div>
    <strong>Tertiary haemostasis (fibrinolysis):</strong> D-dimers / FDPs (sensitive, not specific) and <strong>viscoelastic testing (TEG/ROTEM)</strong> for hyperfibrinolysis (DIC, hepatic failure, <em>Angiostrongylus</em>, greyhound post-op bleeding).<br>
    <strong>Infectious / vector-borne testing</strong> (Ehrlichia, Anaplasma, Babesia, Leishmania, RMSF) per geography.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — TREATMENT POINTERS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Emergent local control (stepwise, least → most invasive):</strong> firm compression of the soft nose 5–15 min (use a timer); topical vasoconstrictor — dilute epinephrine 1:10,000 or phenylephrine 1 mg/mL on packing (caution: systemic absorption; avoid in cardiac/hypertensive patients); ice pack on the nasal bridge / chilled-saline flush (anaesthetised, packed); silver-nitrate cautery or electrocautery under visualisation; nasal packing (resorbable e.g. Surgicel/Gelfoam if a bleeding disorder, or non-resorbable); topical/oral <strong>antifibrinolytics</strong> (tranexamic acid, aminocaproic acid); ± Yunnan Baiyao (topical evidence stronger than oral).<br>
    <strong>Refractory:</strong> sphenopalatine artery ligation, endovascular maxillary-artery embolisation, Foley-balloon tamponade, or (last resort) carotid ligation — refer.<br>
    <strong>Targeted by cause:</strong> radiation for nasal tumours; topical clotrimazole ± sinus trephination for aspergillosis; dental extraction / oronasal-fistula repair for periapical disease; endoscopic FB retrieval; maxillofacial repair for trauma; plasmapheresis for hyperviscosity.<br>
    <strong>Systemic disease:</strong> immunosuppression for IMTP; Vitamin K1 ± plasma for rodenticide; antimicrobials for vector-borne disease; antihypertensives for hypertension; discontinue NSAIDs / clopidogrel / rivaroxaban.
  </div>

</div>

<div style="margin-top:10px;padding:10px 12px;background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.25);border-radius:10px;">
  <div style="font-size:11px;font-weight:700;color:#5EEAD4;margin-bottom:6px;">📋 LINKED DISEASE PAGES</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;">
    <div onclick="renderDiseasePage('DIS-NASAL-NEO')" style="cursor:pointer;color:#99F6E4;">→ Nasal / paranasal neoplasia</div>
    <div onclick="renderDiseasePage('DIS-NASAL-ASP')" style="cursor:pointer;color:#99F6E4;">→ Sinonasal aspergillosis</div>
    <div onclick="renderDiseasePage('DIS-NASAL-LPR')" style="cursor:pointer;color:#99F6E4;">→ Lymphoplasmacytic rhinitis</div>
    <div onclick="renderDiseasePage('DIS-NASAL-FB')" style="cursor:pointer;color:#99F6E4;">→ Nasal foreign body</div>
    <div onclick="renderDiseasePage('DIS-NASAL-TRAUMA')" style="cursor:pointer;color:#99F6E4;">→ Nasal trauma</div>
    <div onclick="renderDxBleeding()" style="cursor:pointer;color:#99F6E4;">→ Bleeding / haemostasis workup</div>
    <div onclick="renderDiseasePage('DIS-BD-IMTP')" style="cursor:pointer;color:#99F6E4;">→ Immune-mediated thrombocytopenia</div>
    <div onclick="renderDiseasePage('DIS-BD-ROD')" style="cursor:pointer;color:#99F6E4;">→ Anticoagulant rodenticide</div>
  </div>
</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Practical pearls:</strong><br>
  • Local vs systemic is the first decision — but unilateral vs bilateral won't make it for you.<br>
  • Always run a minimum database (CBC + smear, chemistry, UA, BP) even when disease looks obviously local.<br>
  • Confirm thrombocytopenia on a fresh smear before calling it — clumping falsely lowers analyser counts.<br>
  • Image with CT <em>before</em> rhinoscopy/biopsy, and remember imaging can't distinguish tumour from fungal/inflammatory disease — biopsy.<br>
  • Melena in an epistaxis patient is often swallowed blood, not a second bleed.<br>
  • Mild, single, self-limiting nosebleeds (e.g. after a sneeze or minor knock) may not need a full work-up — reserve that for severe or recurrent epistaxis.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
