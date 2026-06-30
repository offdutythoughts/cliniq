// ── Dyspnoea — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxDyspnoea{History,Exam,Dx}() (legacy inline-HTML render
// functions in ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const dyspnoeaDx: DxApproach = {
  title: 'Dyspnoea',
  // Hand-authored nav alternated classes by position (middle tab always `alt`)
  // with opacity-only active state — match it byte-for-byte.
  navVariant: 'alt',
  tabs: {

  history: {
    title: 'History: Dyspnoea',
    blocks: [
      { kind: 'branch', text: 'DYSPNOEA vs TACHYPNOEA' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">😮‍💨 Dyspnoea</strong><br>
        Increased respiratory <strong>effort</strong><br>
        Visible abdominal effort<br>
        Orthopnoea · open-mouth breathing<br>
        <span style="opacity:.75;">Structural / obstructive / space-occupying</span>`,
          },
          {
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">💨 Tachypnoea</strong><br>
        Increased respiratory <strong>rate</strong> only<br>
        Effort may be minimal<br>
        Non-resp: pain, fever, anxiety, anaemia, shock, acidosis<br>
        <span style="opacity:.75;">Does not always = respiratory disease</span>`,
          },
        ],
      },
      { kind: 'step', text: '📋 KEY HISTORY — BOTH SPECIES' },
      {
        kind: 'check',
        html: `<strong>Onset + duration:</strong><br>
      • Peracute (min–hours): pleural effusion, pneumothorax, 🐱 ATE, acute cardiac decompensation, 🐕 PTE<br>
      • Subacute (days): pneumonia, progressive effusion, cardiac decompensation<br>
      • Chronic + waxing/waning: 🐱 asthma, 🐕 tracheal collapse / airway collapse, neoplasia<br><br>
      <strong>Cough character:</strong><br>
      • Soft, productive: alveolar/interstitial disease (pneumonia, oedema) — both species<br>
      • Canine — Goose-honking: cervical tracheal collapse (worsens with excitement, lead pulling, eating) · Harsh hacking: laryngeal, tracheal, or bronchial disease<br>
      • Feline — Dry, paroxysmal, expiratory: feline asthma/bronchitis<br>
      • Owners often confuse coughing with retching — confirm by description<br><br>
      <strong>Prior episodes?</strong><br>
      • Feline — Episodic → asthma; recurrent decompensation → HCM<br>
      • Canine — Episodic with exertion/heat → tracheal collapse; exertional syncope → pulmonary hypertension<br><br>
      <strong>Response to previous treatment?</strong><br>
      • Bronchodilators + steroids → lower airway disease (both species)<br>
      • Diuretics → CHF (both species)<br>
      • 🐕 Improvement at rest, worse on exercise → tracheal collapse / cardiac disease`,
      },
      { kind: 'step', alt: true, text: '🐕 DOG-SPECIFIC HISTORY' },
      {
        kind: 'check',
        html: `<strong>Vocalization changes:</strong> Hoarse bark, change in bark character → laryngeal disease (laryngeal paralysis, collapse, mass)<br>
      <strong>Syncope / collapse:</strong> Exertional or at rest → 🐕 pulmonary hypertension (key indicator), severe cardiac disease, tracheal collapse<br>
      <strong>Vomiting / regurgitation:</strong> Prior to respiratory signs → aspiration pneumonia; laryngeal paralysis → aspiration risk<br>
      <strong>Exercise intolerance:</strong> Often misattributed to ageing — may reflect early CHF, pulmonary hypertension, or chronic airway disease<br>
      <strong>Comorbidities increasing PTE risk:</strong> IMHA, hyperadrenocorticism, PLN, pancreatitis, heartworm, neoplasia, diabetes mellitus, protein-losing enteropathy, pregnancy<br>
      <strong>Exposure history:</strong> Boarding/shelter/dog park → infectious CIRDC (Bordetella, canine influenza, Mycoplasma)<br>
      <strong>Heartworm prevention:</strong> Endemic region + no prophylaxis → consider HW disease<br>
      <strong>Travel history:</strong> Histoplasma / Blastomyces (midwest/SE USA, Great Lakes), Coccidioides (SW USA/Mexico), Angiostrongylus vasorum (UK/Europe)`,
      },
      { kind: 'step', alt: true, text: '🐱 CAT-SPECIFIC HISTORY' },
      {
        kind: 'check',
        html: `<strong>Concurrent signs:</strong><br>
      • Sudden hindlimb paralysis + pain + respiratory distress → ATE (HCM emergency)<br>
      • Weight loss + anorexia → neoplasia, chronic disease, hyperthyroidism<br>
      • Nasal discharge + sneezing → URTI (herpesvirus, calicivirus)<br><br>
      <strong>Environment:</strong><br>
      • Outdoor/hunting → pyothorax (grass awn FB), lungworm (<em>Aelurostrongylus</em>), trauma → pneumothorax<br>
      • Multi-cat / shelter → viral URTI, FIP, secondary bacterial infections<br>
      <strong>Drug history:</strong> NSAIDs → renal compromise; corticosteroids → immunosuppression; recent anaesthesia → aspiration`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
        <div>
          <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
          <strong style="color:var(--tone-warning-fg);">Brachycephalic</strong> (Bulldog, French Bulldog, Pug, Boston, Shih Tzu)<br>→ BOAS · secondary lower airway disease · post-obstructive NCPE<br><br>
          <strong style="color:var(--tone-green-fg);">Large/Giant breeds</strong> (Labrador, Golden, Great Dane, Irish Wolfhound)<br>→ Laryngeal paralysis (GOLPP) · DCM<br><br>
          <strong style="color:var(--tone-danger-fg);">Toy/Small breeds</strong> (Yorkshire, Chihuahua, Pomeranian, Toy Poodle, Maltese)<br>→ Tracheal collapse · MMVD<br><br>
          <strong style="color:var(--tone-violet-fg);">CKCS, Dachshund</strong> → MMVD (early onset)<br><br>
          <strong style="color:var(--tone-violet-fg);">Dobermann, Irish Wolfhound, Great Dane</strong> → DCM → CHF<br><br>
          <strong style="color:var(--tone-warning-fg);">Husky, Malamute</strong> → Eosinophilic bronchopneumopathy<br><br>
          <strong style="color:var(--tone-danger-fg);">Cocker Spaniel</strong> → Bronchiectasis · PLN → PTE risk
        </div>
        <div>
          <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
          <strong style="color:var(--tone-violet-fg);">Maine Coon, Ragdoll, BSH, Persian</strong><br>→ HCM (high risk; can present young)<br><br>
          <strong style="color:var(--tone-green-fg);">Young cat (1–5 yr)</strong><br>→ Feline asthma · viral URTI · pyothorax (outdoor) · lymphoma<br><br>
          <strong style="color:var(--tone-warning-fg);">Middle-aged–older cat</strong><br>→ HCM · pleural neoplasia · cranial mediastinal mass · hyperthyroidism<br><br>
          <strong style="color:var(--tone-danger-fg);">Male cat</strong><br>→ HCM more common (esp Maine Coon)<br><br>
          <strong style="color:var(--tone-info-fg);">Outdoor/hunting cat</strong><br>→ Pyothorax · lungworm · trauma<br><br>
          <strong style="color:var(--tone-warning-fg);">FIV/FeLV positive</strong><br>→ Secondary infections · lymphoma · FIP
        </div>
      </div>`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        html: `<strong>Both:</strong> Open-mouth breathing · Cyanosis · Orthopnoea (cannot lie down) · Rapid deterioration despite O₂<br>
      <strong>Feline:</strong> Open-mouth breathing = SEVERE (obligate nasal breather) · Cold paralysed hindlimbs + resp distress = ATE<br>
      <strong>Canine:</strong> Exertional syncope → pulmonary hypertension · Goose-honk + cyanosis → severe collapse · Haemoptysis → PTE/coagulopathy/HW`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Dyspnoea',
    blocks: [
      { kind: 'step', text: '🩺 OBSERVE BEFORE YOU TOUCH' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-danger-title);">Minimise stress — especially cats.</strong> Observe from distance first with supplemental O₂:<br>
      • <strong>Posture:</strong> Head/neck extended + elbows abducted = orthopnoea (severe dyspnoea; cannot lie down)<br>
      • <strong>Respiratory rate:</strong> Count from distance; &gt;40/min at rest (dog or cat) = clinically significant<br>
      • <strong>Abdominal effort:</strong> Paradoxical chest/abdominal movement → pleural disease or chest wall pathology<br>
      • <strong>🐱 Open-mouth breathing:</strong> = SEVERE — cats are obligate nasal breathers<br>
      • <strong>🐕 Positional preference:</strong> Standing/sitting rather than lying (orthopnoea) = CHF, pleural effusion, severe dyspnoea<br>
      • <strong>Audible sounds from distance:</strong> Stertor → nasopharyngeal; stridor → laryngeal/cervical tracheal; 🐕 goose-honk → intrathoracic tracheal/bronchial collapse`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Vital Signs</strong><br>
      • <strong>HR:</strong> Tachycardia = most common; bradycardia + hypothermia = severe decompensation<br>
      • <strong>MM colour:</strong> Cyanosis → severe hypoxaemia; pale → anaemia/shock; normal MMs do NOT exclude significant hypoxaemia<br>
      • <strong>SpO₂:</strong> &lt;95% = clinically significant; &lt;90% = severe → start O₂ immediately<br>
      • <strong>Temperature (canine):</strong> Fever → pneumonia, ARDS; upper airway obstruction (BOAS, laryngeal paralysis) → <strong>hyperthermia</strong> (impaired evaporative cooling via panting) — treat urgently<br>
      • <strong>Temperature (feline):</strong> Fever → pyothorax, pneumonia; hypothermia + bradycardia → decompensated HCM<br>
      • <strong>Canine — Pulse quality + rhythm:</strong> Weak/rapid → shock; irregular pulse with deficits → atrial fibrillation (DCM, advanced MMVD)<br>
      • <strong>Canine — Jugular distension:</strong> → Right-sided CHF, pulmonary hypertension, pericardial effusion`,
      },
      { kind: 'step', alt: true, text: '🔊 AUSCULTATION + SOUND LOCALISATION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 8px;font-size:10px;line-height:1.45;">
        <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
        <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Suggests</div>
        <div>Muffled sounds ventrally</div><div style="color:var(--tone-warning-fg);">Pleural effusion (bilateral common in 🐱)</div>
        <div>Muffled sounds dorsally</div><div style="color:var(--tone-warning-fg);">Pneumothorax (air rises dorsally)</div>
        <div>Crackles (inspiratory)</div><div style="color:var(--tone-danger-fg);">Pulmonary oedema, pneumonia, fibrosis</div>
        <div>Wheeze / expiratory effort</div><div style="color:var(--tone-green-fg);">🐱 Asthma · 🐕 Bronchitis/collapse</div>
        <div>Goose-honk (expiratory)</div><div style="color:var(--tone-info-fg);">🐕 Intrathoracic tracheal/bronchial collapse</div>
        <div>Stridor (inspiratory)</div><div style="color:var(--tone-info-fg);">🐕 Laryngeal paralysis/collapse/BOAS · cervical tracheal</div>
        <div>Stertor (snoring)</div><div style="color:var(--tone-info-fg);">🐕 BOAS, pharyngeal disease · 🐱 NP polyp, URTI</div>
        <div>Murmur (L apex systolic)</div><div style="color:var(--tone-violet-fg);">🐕 MMVD · 🐱 HCM — grade ≠ severity</div>
        <div>Absence of murmur</div><div style="color:var(--tone-warning-fg);">Makes CHF less likely — but NOT excluded in 🐕 DCM or 🐱 HCM</div>
        <div>Gallop rhythm (S3/S4)</div><div style="color:var(--tone-danger-title);">Decompensated cardiac — significant in both species</div>
        <div>Atrial fibrillation</div><div style="color:var(--tone-danger-title);">🐕 DCM or advanced MMVD — increased CHF risk</div>
      </div>`,
      },
      { kind: 'step', alt: true, text: '🐕 DOG-SPECIFIC EXAM FINDINGS' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-info-fg);">Tracheal palpation:</strong><br>
      • Gentle palpation → easy cough elicitation = tracheal sensitivity (tracheitis, bronchitis)<br>
      • Lateral cervical compression → induces goose-honk = cervical tracheal collapse<br>
      • 🐕 BOAS: stenotic nares visible externally; palpate larynx for mass or deformity<br><br>
      <strong style="color:var(--tone-info-fg);">Laryngeal/upper airway evaluation:</strong><br>
      • Change in bark → laryngeal paralysis; exam under sedation to visualise arytenoid abductor function (MUST observe under light sedation only — deep anaesthesia masks paralysis)<br>
      • Stridor character: inspiratory = laryngeal/cervical tracheal; biphasic = severe bilateral obstruction<br><br>
      <strong style="color:var(--tone-info-fg);">Nasal airflow:</strong><br>
      • Cotton ball or glass slide beneath nostrils — observe symmetry<br>
      • Unilateral reduced airflow → FB, neoplasia, mass; bilateral reduced → bilateral disease, NP stenosis, BOAS<br><br>
      <strong style="color:var(--tone-info-fg);">Abdominal assessment:</strong><br>
      • Distension + fluid wave → ascites (right-sided CHF, portal hypertension, peritoneal effusion)<br>
      • Hepatomegaly → right CHF, hepatic disease<br>
      • Organomegaly / abdominal mass → primary disease with pulmonary metastasis or functional compression limiting diaphragm excursion`,
      },
      { kind: 'step', alt: true, text: '🐱 CAT-SPECIFIC EXAM FINDINGS' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-violet-fg);">Cranial mediastinal compressibility:</strong><br>
      • <strong>Non-compressible</strong> → cranial mediastinal mass (lymphoma, thymoma, carcinoma) until proven otherwise<br>
      • Compressible (normal): rules out significant cranial mass<br><br>
      <strong style="color:var(--tone-danger-fg);">Limb assessment:</strong><br>
      • Cold, painful, cyanotic hindlimbs → ATE — femoral pulse absent/weakened<br>
      • Muscle rigidity / paralysis → ATE emergency; also check radial pulse<br><br>
      <strong style="color:var(--tone-green-fg);">Percussion:</strong><br>
      • Dullness ventrally → pleural effusion (often bilateral in cats)<br>
      • Hyper-resonance → pneumothorax<br><br>
      <strong style="color:var(--tone-warning-fg);">Neck + nasal exam:</strong><br>
      • Ipsilateral Horner's + stertor → nasopharyngeal polyp (young cat)<br>
      • Nasal discharge: mucopurulent → URTI, fungal; serous → viral`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Dyspnoea — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST' },
      {
        kind: 'check',
        html: `• <strong>O₂ immediately:</strong> Flow-by (250–300 mL/kg/min) or O₂ cage (FiO₂ 40–60%); loose mask preferred over bare tubing<br>
      • O₂ 40–60% adequate for most; SpO₂ persistently ≤90% → escalate to high-flow O₂ or mechanical ventilation<br>
      • <strong>Minimal restraint</strong> — do NOT force lateral recumbency for CXR if severely dyspnoeic<br>
      • <strong>Sternal positioning</strong> — preferred for both dogs and cats; maximises ventilation<br>
      • If pleural effusion clinically likely → <strong>thoracocentesis before radiograph</strong><br>
      • Light sedation if extreme stress prevents management: butorphanol 0.2–0.4 mg/kg IM ± acepromazine (avoid in shock/severe cardiac disease)<br>
      • 🐕 BOAS / laryngeal paralysis / upper airway obstruction: nebulised epinephrine (0.05 mg/kg in 5 mL saline q6h ×24h); cool environment; treat hyperthermia urgently<br>
      • 🐕 Transtracheal O₂ (14–16 gauge catheter, 3rd–5th tracheal ring, 50 mL/kg/min): bypasses upper airway obstruction; achieves FiO₂ ~80%`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — POINT-OF-CARE ULTRASOUND (POCUS / TFAST)' },
      {
        kind: 'check',
        html: `<strong>First bedside test — &lt;2 min, minimal stress (sternal positioning):</strong><br>
      • <strong>Absent glide sign:</strong> Pneumothorax; reverse sliding sign also appreciated; B-lines rule out PTX in that region<br>
      • <strong>Pleural effusion:</strong> Anechoic fluid between parietal + visceral pleura<br>
      • <strong>B-lines ≥3/window:</strong> Interstitial fluid → oedema; diffuse B-lines = cardiogenic; focal/patchy = pneumonia, contusion<br>
      • <strong>LA enlargement (🐕 LA:Ao &gt;2:1 · 🐱 LA:Ao &gt;1.5:1):</strong> Strongly supports CHF when combined with B-lines<br>
      • <strong>Pericardial effusion:</strong> 🐕 Left atrial rupture in severe MMVD → hyperechoic thrombus in pericardial space<br>
      • <strong>Shred sign:</strong> Irregular pleural-lung interface → consolidation with aeration (pneumonia)<br>
      • <strong>Tissue sign:</strong> Liver-like lung parenchyma → severe pneumonia, atelectasis, lung lobe torsion<br>
      • <strong>🐕 Wedge sign:</strong> Subpleural triangular consolidation — in hypercoagulable patient (caudodorsal/perihilar) → PTE<br>
      • <strong>🐕 CVC distension</strong> (decreased respiratory collapsibility) → pulmonary hypertension or right CHF<br>
      • <strong>🐕 Heartworms:</strong> Double-lined structures in pulmonary artery/right heart → caval syndrome<br>
      <span style="font-size:10px;opacity:.75;">⚠️ POCUS rules in pleural disease and oedema — does NOT exclude parenchymal or airway disease. Normal POCUS does not = normal lungs.</span>`,
      },
      { kind: 'step', alt: true, text: 'STEP 3 — PULSE OXIMETRY + S/F RATIO' },
      {
        kind: 'check',
        html: `<strong>SpO₂ interpretation (standard conditions):</strong><br>
      <div style="display:grid;grid-template-columns:1fr 1.2fr 1.2fr;gap:3px 6px;font-size:9px;margin:4px 0;">
        <div style="font-weight:600;">SpO₂</div><div style="font-weight:600;">~PaO₂ (mmHg)</div><div style="font-weight:600;">Action</div>
        <div>95–100%</div><div>≥80</div><div style="color:var(--tone-green-fg);">Normal</div>
        <div>90–94%</div><div>60–70</div><div style="color:var(--tone-warning-fg);">Hypoxaemia — supplement O₂</div>
        <div>&lt;90%</div><div>&lt;60</div><div style="color:var(--tone-danger-title);">Severe — escalate immediately</div>
        <div>&lt;65%</div><div>&lt;30</div><div style="color:#EF4444;font-weight:700;">Life-threatening</div>
      </div>
      <strong>S/F ratio (SpO₂:FiO₂):</strong> Quantifies oxygenation efficiency independent of supplemental O₂<br>
      • Room air (FiO₂ = 0.21): S/F = SpO₂ ÷ 0.21 (e.g. SpO₂ 95% → S/F = 452)<br>
      • S/F ≥400 = normal · 316–399 = mild · 151–315 = moderate lung injury (ARDS risk) · ≤150 = ARDS<br>
      • 🚫 Inaccurate: poor perfusion, vasoconstriction, dark pigment, motion, dyshemoglobin (smoke/CO)<br>
      • Waveform must match heart rate — mismatched waveform = erroneous reading`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — THORACIC RADIOGRAPHS (when stabilised)' },
      {
        kind: 'check',
        html: `<strong>3 views (as allowed by stability):</strong> R lateral + L lateral + DV; DV less stressful than VD if unstable<br><br>
      <strong style="color:var(--tone-info-fg);">🐕 Trachea + airway assessment:</strong><br>
      • Tracheal diameter ≥30% change between phases = tracheal collapse (paired insp + exp views essential — sensitivity as low as 45% with single view; normal dogs show up to 24% change)<br>
      • Axial tracheal collapse: increased DV tracheal dimension (may mimic intraluminal FB; CT to differentiate)<br>
      • Bronchiectasis: bronchi visible peripherally lacking normal tapering ("tram lines" and "donuts")<br>
      • Both L and R lateral views increase sensitivity for bronchial collapse (ipsilateral visualisation)<br><br>
      <strong style="color:var(--hl-lime);">Both species — CXR patterns:</strong><br>
      • <strong>Alveolar:</strong> 🐕 Perihilar = CHF (MMVD); ventral distribution = CHF (DCM) or aspiration; caudodorsal = NCPE · 🐱 Patchy = CHF, pneumonia<br>
      • <strong>Cranioventral alveolar:</strong> Aspiration pneumonia (both species)<br>
      • <strong>Bronchial ("tram lines/donuts"):</strong> 🐱 Asthma + hyperinflation + air trapping · 🐕🐱 Chronic bronchitis<br>
      • <strong>Interstitial (hazy):</strong> Early oedema, interstitial pneumonia, fibrosis<br>
      • <strong>Reticular:</strong> 🐕 Fungal disease, pulmonary fibrosis, neoplasia<br>
      • <strong>Miliary (1–3 mm nodules):</strong> 🐕 Histoplasma, Blastomyces, metastatic neoplasia<br>
      • <strong>Nodular/mass:</strong> Fungal, metastasis, primary lung tumour<br>
      • <strong>Pleural effusion:</strong> Blunted costophrenic angles, retracted lung margins; post-tap CXR for full assessment<br>
      • <strong>Pneumothorax:</strong> Radiolucent zone, no lung markings to chest wall; heart elevated dorsally on lateral<br>
      • <strong>🐱 Cranial mediastinal opacity:</strong> Mass (lymphoma, thymoma, carcinoma)<br><br>
      <strong style="color:var(--tone-info-fg);">🐕 Objective cardiac measures:</strong><br>
      • <strong>VHS &gt;11.5:</strong> Cardiomegaly (breed-specific norms: Yorkshire, Pomeranian, Pug, Boston Terrier)<br>
      • <strong>VLAS ≥2.3–2.5 × 4th thoracic vertebra:</strong> LA enlargement — better CHF predictor than VHS<br>
      • Pulmonary venous distension (cranial + caudal lobar veins) = cardiogenic — NOT seen with NCPE<br>
      • 🐕 DCM: ventral alveolar distribution; peribronchial cuffing; dilated CVC; dilated cardiac silhouette`,
      },
      { kind: 'step', alt: true, text: 'STEP 5 — BLOODWORK (CBC · BIOCHEMISTRY · URINALYSIS)' },
      {
        kind: 'check',
        html: `<strong>CBC:</strong><br>
      • Leukocytosis + left shift → infection/inflammation (pneumonia, pyothorax, ARDS trigger)<br>
      • Eosinophilia → parasitic (lungworm, heartworm), allergic (EBP, asthma); normal count does NOT exclude — both species<br>
      • Anaemia (PCV &lt;20% dog / &lt;12–15% cat) → compensatory tachypnoea; check reticulocytes<br>
      • Polycythaemia (PCV &gt;65%) → right-to-left shunt; mild (55–65%) = chronic hypoxaemia — canine<br>
      • Leukopenia → parvovirus, sepsis, overwhelming infection<br><br>
      <strong>Serum biochemistry:</strong><br>
      • Azotaemia → uremic pneumonitis risk; check for PLN (PTE risk); endocrinopathies (hyperadrenocorticism → PTE) — canine<br>
      • Serum T4 (ALL cats) → hyperthyroidism: cardiac changes, tachypnoea, weight loss<br>
      • Hypoalbuminaemia (&lt;15 g/L) → non-cardiogenic effusion, protein-losing disease, reduced oncotic pressure<br><br>
      <strong>Urinalysis:</strong><br>
      • Proteinuria (UPC &gt;0.5) → PLN → PTE risk; also screen renal function (USG, creatinine) — canine<br><br>
      <strong>Cardiac biomarkers:</strong><br>
      • <strong>NT-proBNP (canine):</strong> &lt;900 pmol/L = L-CHF unlikely (primary resp disease more likely); 900–1800 pmol/L = equivocal (correlate with exam + imaging); &gt;1800 pmol/L = L-CHF likely. Elevated in renal disease, sepsis, pulmonary hypertension. Healthy Labradors may have NT-proBNP up to 2100 pmol/L.<br>
      • <strong>NT-proBNP (feline):</strong> &gt;100 pmol/L = elevated; &gt;265 pmol/L = high specificity for CHF. Normal does NOT fully exclude cardiac disease.<br>
      • <strong>cTnI (canine):</strong> Marker of myocardial injury — NOT specific for CHF; elevated in myocarditis, arrhythmias, cardiomyopathy, systemic disease (sepsis, heatstroke). Less useful than NT-proBNP for distinguishing CHF from primary respiratory disease.`,
      },
      { kind: 'step', alt: true, text: 'STEP 6 — ARTERIAL BLOOD GAS (when available)' },
      {
        kind: 'check',
        html: `<strong>Oxygenation:</strong><br>
      • Hypoxaemia: PaO₂ &lt;80 mmHg; severe: PaO₂ &lt;60 mmHg<br>
      • Always interpret relative to FiO₂: ideal PaO₂ = 4–5 × FiO₂ (room air FiO₂ 21% → PaO₂ should be 84–105 mmHg)<br>
      • <strong>P/F ratio (PaO₂:FiO₂):</strong> ≥400 = normal · 301–399 = mild · 101–300 = moderate (ARDS risk) · ≤100 = severe ARDS<br><br>
      <strong>Ventilation:</strong><br>
      • Hypercapnia PaCO₂ &gt;45 mmHg = hypoventilation; venous PvCO₂ &gt;50 mmHg also suggestive<br>
      • Causes: upper airway obstruction, severe pleural disease, bronchoconstriction, neuromuscular disease, respiratory fatigue, obesity hypoventilation<br>
      • 🐕 PaCO₂–ETCO₂ gradient &gt;5 mmHg → dead space ↑ (PTE, low cardiac output, hypovolaemia)<br><br>
      <strong>Acid-base:</strong><br>
      • Metabolic acidosis → Kussmaul breathing (deep, laboured, rapid tachypnoea) = compensatory CO₂ elimination<br>
      • Respiratory acidosis + metabolic alkalosis → chronic upper airway obstruction with bicarbonate retention`,
      },
      { kind: 'step', alt: true, text: 'STEP 7 — ECHOCARDIOGRAPHY' },
      {
        kind: 'check',
        html: `<strong>🐕 Dog:</strong><br>
      • MMVD: LA enlargement (LA:Ao &gt;2.0); mitral valve thickening/prolapse; eccentric LV hypertrophy<br>
      • DCM: dilated LV, reduced systolic function (FS &lt;25%); LA enlargement; AF common<br>
      • Pulmonary hypertension: TR jet velocity &gt;2.8 m/s; RV hypertrophy/dilatation; CVC distension<br>
      • Ruptured chordae tendineae: acute MMVD crisis — minimal LA enlargement but severe regurgitation; CXR underestimates severity<br>
      • 🐕 Differentiate CHF from NCPE in equivocal cases (concurrent tracheal collapse + MMVD)<br><br>
      <strong>🐱 Cat:</strong><br>
      • HCM: LV free wall or IVS &gt;6 mm diastole (Maine Coon &gt;7.5 mm)<br>
      • LA:Ao ratio &gt;1.5 → significant LA enlargement → CHF risk high<br>
      • SAM of mitral valve → dynamic LVOTO<br>
      • Always perform before starting cardiac medications`,
      },
      { kind: 'step', alt: true, text: 'STEP 8 — PLEURAL FLUID ANALYSIS (post-thoracocentesis)' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1.2fr 1fr 1.1fr;gap:4px 6px;font-size:9px;line-height:1.4;">
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Fluid type</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">TP / Cells</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Key causes</div>
        <div>Pure transudate</div><div>&lt;25g/L · &lt;1000/μL</div><div>Hypoalbuminaemia, right CHF</div>
        <div>Modified transudate</div><div>25–35g/L · mixed</div><div style="color:var(--tone-warning-fg);">🐕 MMVD/DCM · 🐱 HCM · neoplasia · chylothorax</div>
        <div>Exudate</div><div>&gt;30g/L · ↑↑ cells</div><div style="color:var(--tone-danger-fg);">Pyothorax · 🐱 FIP · neoplasia</div>
        <div>Chylous</div><div>Milky · lymphocytes · TG &gt; serum</div><div style="color:var(--tone-green-fg);">Lymphoma · cardiac · idiopathic</div>
        <div>Haemorrhagic</div><div>PCV measurable · no clot</div><div>Trauma · neoplasia (HSA) · coagulopathy</div>
      </div>
      <div style="margin-top:6px;font-size:10px;opacity:.8;">Always send cytology. Degenerate neutrophils + intracellular bacteria = pyothorax → culture + sensitivity essential. Post-tap CXR for full parenchymal assessment.</div>`,
      },
      { kind: 'step', alt: true, text: 'STEP 9 — AIRWAY SAMPLING + ADDITIONAL BY SUSPICION' },
      {
        kind: 'check',
        html: `<strong>BAL / Transtracheal wash:</strong> Cell differential + culture + susceptibility<br>
      • Eosinophils &gt;17% → 🐱 asthma / 🐕 EBP or parasitic; mast cells = allergic<br>
      • Neutrophilic (septic/non-septic) → bacterial infection, chronic bronchitis<br>
      • Granulomatous → 🐕 fungal (Histoplasma, Blastomyces)<br>
      • 🐕 BAL preferred over TTW for culture in suspected bacterial pneumonia<br>
      • 🐕 Tracheobronchoscopy: gold standard for tracheal/bronchial collapse grade; required before stent planning<br><br>
      <strong style="color:var(--tone-warning-fg);">🐕 Heartworm Ag test:</strong> Endemic region + cough + prominent pulmonary vasculature + eosinophilia + right cardiomegaly → Ag test (adult female HW, highly sensitive/specific). Also suspect in caval syndrome (hepatomegaly, ascites, haemoglobinuria).<br><br>
      <strong style="color:var(--tone-green-fg);">🐕 Respiratory PCR panel:</strong> Young dog + recent kennel/shelter + CIRDC signs → Bordetella, Mycoplasma, canine influenza, CDV, coronavirus, <em>Streptococcus zooepidemicus</em>. Obtain before antimicrobial therapy.<br><br>
      <strong style="color:var(--tone-info-fg);">🐕🐱 Fecal + Baermann:</strong> Cough + eosinophilia + bronchial CXR + endemic region<br>
      • 🐕 Oslerus osleri, Angiostrongylus vasorum (UK/Europe; check coagulation), Paragonimus kellicotti (NA), Eucoleus aerophilus<br>
      • 🐱 Aelurostrongylus abstrusus<br><br>
      <strong style="color:var(--tone-danger-fg);">🐕 Fungal testing (endemic regions):</strong><br>
      • Histoplasma (OH/MS valleys, midwest/SE USA): urine antigen ELISA (preferred); cytology BAL/rectal scraping (2–5 μm oval yeasts in macrophages)<br>
      • Blastomyces (midwest/SE USA, Great Lakes, Canada): urine antigen ELISA (cross-reacts with Histoplasma); cytology (large 8–20 μm yeast, broad-based budding)<br>
      • Coccidioides (SW USA, Mexico, CA): AGID serology (IgM = early; IgG = established)<br><br>
      <strong style="color:var(--tone-violet-fg);">🐕 Fluoroscopy:</strong> Real-time tracheal assessment without GA; dynamic tracheal collapse, tracheal kinking, cervical lung herniation. Cannot assess bronchial collapse (use bronchoscopy). Preferred when GA is high-risk.<br><br>
      <strong>🐕🐱 Thoracic CT:</strong> When standard diagnostics non-diagnostic. Best for interstitial/vascular/nodular disease; CT pulmonary angiography = gold standard for PTE. More sensitive than CXR for pulmonary nodules. Requires GA + breath-hold technique.`,
      },
      { kind: 'step', text: '🔑 KEY BRANCH DECISIONS' },
      {
        kind: 'check',
        html: `• <strong>Pleural effusion on POCUS</strong> → thoracocentesis (diagnostic + therapeutic) → fluid cytology + culture<br>
      • <strong>B-lines + LA enlargement on POCUS</strong> → NT-proBNP + echo → cardiogenic oedema → furosemide<br>
      • <strong>🐕 Diuretic trial:</strong> Dog with murmur + equivocal POCUS/CXR → furosemide 2 mg/kg; CHF improves within 30 min IV / 2h IM; primary respiratory disease will not respond. No response after 1–2 doses → do not continue<br>
      • <strong>🐕 Goose-honk + toy breed</strong> → tracheal collapse → fluoroscopy or bronchoscopy → medical (weight loss, cough suppressants, bronchodilators) vs stenting<br>
      • <strong>🐕 Stridor + large breed + change in bark</strong> → laryngeal paralysis → exam under light sedation (arytenoid mobility) → surgery (unilateral tieback) + aspiration precautions<br>
      • <strong>🐕 Brachycephalic + inspiratory distress</strong> → BOAS → airway exam/CT → rhinoplasty + staphylectomy; nebulised epinephrine for acute oedema; cool environment; treat hyperthermia<br>
      • <strong>🐱 Bronchial pattern + hyperinflation (cat CXR)</strong> → asthma → terbutaline/salbutamol + corticosteroid<br>
      • <strong>Cranioventral alveolar consolidation</strong> → aspiration pneumonia → BAL culture → ampicillin-sulbactam IV (first-line)<br>
      • <strong>🐕 Acute dyspnoea + normal/near-normal CXR + hypercoagulable disease</strong> → PTE → D-dimers + CT angiography + anticoagulation<br>
      • <strong>🐕 Miliary/reticular CXR + endemic region</strong> → fungal → urine antigen testing (do NOT start empiric antifungal without testing)<br>
      • <strong>🐱 Non-compressible cranial mediastinum</strong> → mass (lymphoma/thymoma) → POCUS-guided FNA cytology`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS — IMMEDIATE ACTION',
        html: `🐕🐱 Open-mouth breathing · Cyanosis (SpO₂ &lt;90%) · Orthopnoea — cannot lie down · Rapid deterioration despite O₂<br>
      🐱 ATE (cold limbs + paralysis + resp distress) · Non-compressible cranial mediastinum<br>
      🐕 Exertional syncope (→ pulmonary hypertension) · Goose-honk + cyanosis (→ severe tracheal collapse) · Haemoptysis (→ PTE/coagulopathy/HW) · Hyperthermia + upper airway obstruction (BOAS/laryngeal paralysis)`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
