// ── Dyspnoea — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxDyspnoea{History,Exam,Dx}() (legacy inline-HTML render
// functions in ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

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

      { kind: 'step', text: '📋 STEP 1 — KEY HISTORY, BOTH SPECIES', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Onset + duration',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Peracute</strong><br>min–hours', { text: 'Pleural effusion · pneumothorax · 🐱 ATE · acute cardiac decompensation · 🐕 PTE', tone: 'teal' }],
          ['<strong>Subacute</strong><br>days', { text: 'Pneumonia · progressive effusion · cardiac decompensation', tone: 'teal' }],
          ['<strong>Chronic + waxing/waning</strong>', { text: '🐱 asthma · 🐕 tracheal / airway collapse · neoplasia', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Cough character',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Character', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Soft, productive</strong>', { text: 'Alveolar / interstitial disease — pneumonia · oedema (both species)', tone: 'teal' }],
          ['<strong>🐕 Goose-honking</strong>', { text: 'Cervical tracheal collapse — worsens with excitement · lead pulling · eating', tone: 'teal' }],
          ['<strong>🐕 Harsh hacking</strong>', { text: 'Laryngeal · tracheal · bronchial disease', tone: 'teal' }],
          ['<strong>🐱 Dry, paroxysmal, expiratory</strong>', { text: 'Feline asthma / bronchitis', tone: 'teal' }],
          ['<strong>Caveat</strong>', { text: 'Owners often confuse coughing with retching — confirm by description', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Prior episodes & response to treatment',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Episodic</strong>', { text: 'Asthma; recurrent decompensation → HCM', tone: 'teal' }],
          ['<strong>🐕 Episodic with exertion / heat</strong>', { text: 'Tracheal collapse; exertional syncope → pulmonary hypertension', tone: 'teal' }],
          ['<strong>Bronchodilators + steroids helped</strong>', { text: 'Lower airway disease (both species)', tone: 'teal' }],
          ['<strong>Diuretics helped</strong>', { text: 'CHF (both species)', tone: 'teal' }],
          ['<strong>🐕 Better at rest, worse on exercise</strong>', { text: 'Tracheal collapse · cardiac disease', tone: 'teal' }],
        ],
      },

      ...stepTable(2, '🐕 DOG-SPECIFIC HISTORY', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Vocalization changes</strong>', { text: 'Hoarse bark, change in bark character → laryngeal disease (paralysis · collapse · mass)', tone: 'teal' }],
          ['<strong>Syncope / collapse</strong>', { text: 'Exertional or at rest → <strong>pulmonary hypertension</strong> (key indicator) · severe cardiac disease · tracheal collapse', tone: 'danger' }],
          ['<strong>Vomiting / regurgitation before respiratory signs</strong>', { text: 'Aspiration pneumonia; laryngeal paralysis → aspiration risk', tone: 'teal' }],
          ['<strong>Exercise intolerance</strong>', { text: 'Often misattributed to ageing — may reflect early CHF · pulmonary hypertension · chronic airway disease', tone: 'teal' }],
          ['<strong>Comorbidities increasing PTE risk</strong>', { text: 'IMHA · hyperadrenocorticism · PLN · pancreatitis · heartworm · neoplasia · diabetes mellitus · protein-losing enteropathy · pregnancy', tone: 'teal' }],
          ['<strong>Exposure history</strong>', { text: 'Boarding / shelter / dog park → infectious CIRDC (Bordetella · canine influenza · Mycoplasma)', tone: 'teal' }],
          ['<strong>Heartworm prevention</strong>', { text: 'Endemic region + no prophylaxis → consider HW disease', tone: 'teal' }],
          ['<strong>Travel history</strong>', { text: 'Histoplasma / Blastomyces (midwest / SE USA · Great Lakes) · Coccidioides (SW USA / Mexico) · <em>Angiostrongylus vasorum</em> (UK / Europe)', tone: 'teal' }],
        ],
      }, '🐕'),

      ...stepTable(3, '🐱 CAT-SPECIFIC HISTORY', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Sudden hindlimb paralysis + pain + respiratory distress</strong>', { text: '<strong>ATE</strong> — HCM emergency', tone: 'danger' }],
          ['<strong>Weight loss + anorexia</strong>', { text: 'Neoplasia · chronic disease · hyperthyroidism', tone: 'teal' }],
          ['<strong>Nasal discharge + sneezing</strong>', { text: 'URTI — herpesvirus · calicivirus', tone: 'teal' }],
          ['<strong>Outdoor / hunting</strong>', { text: 'Pyothorax (grass awn FB) · lungworm (<em>Aelurostrongylus</em>) · trauma → pneumothorax', tone: 'teal' }],
          ['<strong>Multi-cat / shelter</strong>', { text: 'Viral URTI · FIP · secondary bacterial infections', tone: 'teal' }],
          ['<strong>Drug history</strong>', { text: 'NSAIDs → renal compromise · corticosteroids → immunosuppression · recent anaesthesia → aspiration', tone: 'teal' }],
        ],
      }, '🐱'),

      { kind: 'step', text: '🐾 STEP 4 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Bulldog', 'French Bulldog', 'Pug', 'Boston Terrier', 'Shih Tzu'], tone: 'warning', html: 'brachycephalic — BOAS · secondary lower airway disease · post-obstructive NCPE.' },
          { breeds: ['Labrador', 'Golden Retriever', 'Great Dane', 'Irish Wolfhound'], tone: 'green', html: 'large / giant breed — laryngeal paralysis (GOLPP) · DCM.' },
          { breeds: ['Yorkshire Terrier', 'Chihuahua', 'Pomeranian', 'Toy Poodle', 'Maltese'], tone: 'danger', html: 'toy / small breed — tracheal collapse · MMVD.' },
          { breeds: ['Cavalier King Charles Spaniel', 'Dachshund'], tone: 'violet', html: 'MMVD, early onset.' },
          { breeds: ['Dobermann', 'Irish Wolfhound', 'Great Dane'], tone: 'violet', html: 'DCM → CHF.' },
          { breeds: ['Husky', 'Malamute'], tone: 'warning', html: 'eosinophilic bronchopneumopathy.' },
          { breeds: ['Cocker Spaniel'], tone: 'danger', html: 'bronchiectasis · PLN → PTE risk.' },
        ],
        cat: [
          { breeds: ['Maine Coon', 'Ragdoll', 'British Shorthair', 'Persian'], tone: 'violet', html: 'HCM — high risk, and can present young.' },
          { breeds: ['Young cat (1–5 yr)'], group: 'signalment', tone: 'green', html: 'feline asthma · viral URTI · pyothorax (outdoor) · lymphoma.' },
          { breeds: ['Middle-aged–older cat'], group: 'signalment', tone: 'warning', html: 'HCM · pleural neoplasia · cranial mediastinal mass · hyperthyroidism.' },
          { breeds: ['Male cat'], group: 'signalment', tone: 'danger', html: 'HCM more common (especially Maine Coon).' },
          { breeds: ['Outdoor / hunting cat'], group: 'signalment', tone: 'info', html: 'pyothorax · lungworm · trauma.' },
          { breeds: ['FIV / FeLV positive'], group: 'signalment', tone: 'warning', html: 'secondary infections · lymphoma · FIP.' },
        ],
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
      { kind: 'step', text: '🩺 STEP 1 — OBSERVE BEFORE YOU TOUCH', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Observe', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Posture</strong>', { text: 'Head / neck extended + elbows abducted = <strong>orthopnoea</strong> — severe dyspnoea, cannot lie down', tone: 'danger' }],
          ['<strong>Respiratory rate</strong>', { text: 'Count from a distance — &gt;40/min at rest (🐕 or 🐱) = clinically significant', tone: 'teal' }],
          ['<strong>Abdominal effort</strong>', { text: 'Paradoxical chest / abdominal movement → pleural disease or chest wall pathology', tone: 'teal' }],
          ['<strong>🐱 Open-mouth breathing</strong>', { text: '<strong>SEVERE</strong> — cats are obligate nasal breathers', tone: 'danger' }],
          ['<strong>🐕 Positional preference</strong>', { text: 'Standing / sitting rather than lying (orthopnoea) = CHF · pleural effusion · severe dyspnoea', tone: 'teal' }],
          ['<strong>Audible sounds from a distance</strong>', { text: 'Stertor → nasopharyngeal · stridor → laryngeal / cervical tracheal · 🐕 goose-honk → intrathoracic tracheal or bronchial collapse', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `<strong>Minimise stress — especially cats.</strong> Observe from a distance first, with supplemental O₂.` },
      {
        kind: 'gridTable',
        label: 'Vital signs',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Parameter', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>HR</strong>', { text: 'Tachycardia = most common; bradycardia + hypothermia = severe decompensation', tone: 'teal' }],
          ['<strong>MM colour</strong>', { text: 'Cyanosis → severe hypoxaemia · pale → anaemia / shock. <strong>Normal MMs do NOT exclude significant hypoxaemia</strong>', tone: 'teal' }],
          ['<strong>SpO₂</strong>', { text: '&lt;95% = clinically significant · &lt;90% = severe → start O₂ immediately', tone: 'danger' }],
          ['<strong>🐕 Temperature</strong>', { text: 'Fever → pneumonia · ARDS. Upper airway obstruction (BOAS · laryngeal paralysis) → <strong>hyperthermia</strong> from impaired evaporative cooling — treat urgently', tone: 'danger' }],
          ['<strong>🐱 Temperature</strong>', { text: 'Fever → pyothorax · pneumonia. Hypothermia + bradycardia → decompensated HCM', tone: 'teal' }],
          ['<strong>🐕 Pulse quality + rhythm</strong>', { text: 'Weak / rapid → shock; irregular pulse with deficits → atrial fibrillation (DCM · advanced MMVD)', tone: 'teal' }],
          ['<strong>🐕 Jugular distension</strong>', { text: 'Right-sided CHF · pulmonary hypertension · pericardial effusion', tone: 'teal' }],
        ],
      },

      ...stepTable(2, 'AUSCULTATION + SOUND LOCALISATION', {
        cols: '1fr 1fr',
        dividers: true,
        headers: ['Finding', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['Muffled sounds ventrally', { text: 'Pleural effusion — bilateral common in 🐱', tone: 'warning' }],
          ['Muffled sounds dorsally', { text: 'Pneumothorax — air rises dorsally', tone: 'warning' }],
          ['Crackles (inspiratory)', { text: 'Pulmonary oedema · pneumonia · fibrosis', tone: 'danger' }],
          ['Wheeze / expiratory effort', { text: '🐱 asthma · 🐕 bronchitis / collapse', tone: 'green' }],
          ['Goose-honk (expiratory)', { text: '🐕 intrathoracic tracheal / bronchial collapse', tone: 'info' }],
          ['Stridor (inspiratory)', { text: '🐕 laryngeal paralysis / collapse / BOAS · cervical tracheal', tone: 'info' }],
          ['Stertor (snoring)', { text: '🐕 BOAS · pharyngeal disease · 🐱 NP polyp · URTI', tone: 'info' }],
          ['Murmur (L apex systolic)', { text: '🐕 MMVD · 🐱 HCM — grade ≠ severity', tone: 'violet' }],
          ['Absence of murmur', { text: 'Makes CHF less likely — but <strong>not</strong> excluded in 🐕 DCM or 🐱 HCM', tone: 'warning' }],
          ['Gallop rhythm (S3 / S4)', { text: 'Decompensated cardiac — significant in both species', tone: 'danger' }],
          ['Atrial fibrillation', { text: '🐕 DCM or advanced MMVD — increased CHF risk', tone: 'danger' }],
        ],
      }, '🔊'),

      { kind: 'step', text: '🐕 STEP 3 — DOG-SPECIFIC EXAM FINDINGS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Tracheal palpation</strong>', { text: 'Gentle palpation → easy cough elicitation = tracheal sensitivity (tracheitis · bronchitis). Lateral cervical compression → induces goose-honk = cervical tracheal collapse', tone: 'info' }],
          ['<strong>BOAS assessment</strong>', { text: 'Stenotic nares visible externally; palpate larynx for mass or deformity', tone: 'info' }],
          ['<strong>Laryngeal / upper airway evaluation</strong>', { text: 'Change in bark → laryngeal paralysis. Exam under sedation to visualise arytenoid abductor function — <strong>must observe under light sedation only; deep anaesthesia masks paralysis</strong>', tone: 'danger' }],
          ['<strong>Stridor character</strong>', { text: 'Inspiratory = laryngeal / cervical tracheal · biphasic = severe bilateral obstruction', tone: 'info' }],
          ['<strong>Nasal airflow</strong>', { text: 'Cotton ball or glass slide beneath the nostrils — observe symmetry. Unilateral reduction → FB · neoplasia · mass; bilateral reduction → bilateral disease · NP stenosis · BOAS', tone: 'info' }],
          ['<strong>Abdominal assessment</strong>', { text: 'Distension + fluid wave → ascites (right-sided CHF · portal hypertension · peritoneal effusion) · hepatomegaly → right CHF · hepatic disease · organomegaly or abdominal mass → primary disease with pulmonary metastasis, or functional compression limiting diaphragm excursion', tone: 'info' }],
        ],
      },

      { kind: 'step', text: '🐱 STEP 4 — CAT-SPECIFIC EXAM FINDINGS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Cranial mediastinal compressibility</strong>', { text: '<strong>Non-compressible</strong> → cranial mediastinal mass (lymphoma · thymoma · carcinoma) until proven otherwise. Compressible (normal) rules out a significant cranial mass', tone: 'violet' }],
          ['<strong>Limb assessment</strong>', { text: 'Cold, painful, cyanotic hindlimbs → <strong>ATE</strong> — femoral pulse absent or weakened; muscle rigidity / paralysis → ATE emergency. Also check the radial pulse', tone: 'danger' }],
          ['<strong>Percussion</strong>', { text: 'Dullness ventrally → pleural effusion (often bilateral in cats) · hyper-resonance → pneumothorax', tone: 'green' }],
          ['<strong>Neck + nasal exam</strong>', { text: 'Ipsilateral Horner\'s + stertor → nasopharyngeal polyp (young cat). Nasal discharge: mucopurulent → URTI or fungal · serous → viral', tone: 'warning' }],
        ],
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Dyspnoea — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>O₂ immediately</strong>', { text: 'Flow-by (250–300 mL/kg/min) or O₂ cage (FiO₂ 40–60%); a loose mask is preferred over bare tubing. 40–60% is adequate for most — SpO₂ persistently ≤90% → escalate to high-flow O₂ or mechanical ventilation', tone: 'danger' }],
          ['<strong>Minimal restraint</strong>', { text: 'Do <strong>NOT</strong> force lateral recumbency for CXR if severely dyspnoeic', tone: 'danger' }],
          ['<strong>Sternal positioning</strong>', { text: 'Preferred for both dogs and cats — maximises ventilation', tone: 'teal' }],
          ['<strong>Pleural effusion clinically likely</strong>', { text: '<strong>Thoracocentesis before radiograph</strong>', tone: 'danger' }],
          ['<strong>Light sedation</strong>', { text: 'If extreme stress prevents management — butorphanol 0.2–0.4 mg/kg IM ± acepromazine (avoid in shock / severe cardiac disease)', tone: 'teal' }],
          ['<strong>🐕 Upper airway obstruction</strong>', { text: 'BOAS / laryngeal paralysis — nebulised epinephrine (0.05 mg/kg in 5 mL saline q6h ×24 h) · cool environment · <strong>treat hyperthermia urgently</strong>', tone: 'danger' }],
          ['<strong>🐕 Transtracheal O₂</strong>', { text: '14–16 gauge catheter, 3rd–5th tracheal ring, 50 mL/kg/min — bypasses upper airway obstruction; achieves FiO₂ ~80%', tone: 'teal' }],
        ],
      },

      ...stepTable(2, 'POINT-OF-CARE ULTRASOUND (POCUS / TFAST)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Absent glide sign</strong>', { text: 'Pneumothorax — reverse sliding sign also appreciated; B-lines rule out PTX in that region', tone: 'teal' }],
          ['<strong>Pleural effusion</strong>', { text: 'Anechoic fluid between parietal and visceral pleura', tone: 'teal' }],
          ['<strong>B-lines ≥3 / window</strong>', { text: 'Interstitial fluid → oedema. Diffuse B-lines = cardiogenic · focal / patchy = pneumonia · contusion', tone: 'teal' }],
          ['<strong>LA enlargement</strong> (🐕 LA:Ao &gt;2:1 · 🐱 LA:Ao &gt;1.5:1)', { text: 'Strongly supports CHF when combined with B-lines', tone: 'teal' }],
          ['<strong>Pericardial effusion</strong>', { text: '🐕 left atrial rupture in severe MMVD → hyperechoic thrombus in the pericardial space', tone: 'teal' }],
          ['<strong>Shred sign</strong>', { text: 'Irregular pleural-lung interface → consolidation with aeration (pneumonia)', tone: 'teal' }],
          ['<strong>Tissue sign</strong>', { text: 'Liver-like lung parenchyma → severe pneumonia · atelectasis · lung lobe torsion', tone: 'teal' }],
          ['<strong>🐕 Wedge sign</strong>', { text: 'Subpleural triangular consolidation in a hypercoagulable patient (caudodorsal / perihilar) → PTE', tone: 'teal' }],
          ['<strong>🐕 CVC distension</strong>', { text: 'Decreased respiratory collapsibility → pulmonary hypertension or right CHF', tone: 'teal' }],
          ['<strong>🐕 Heartworms</strong>', { text: 'Double-lined structures in the pulmonary artery / right heart → caval syndrome', tone: 'teal' }],
        ],
      }, '🔍'),
      { kind: 'note', html: `First bedside test — &lt;2 min, minimal stress (sternal positioning). ⚠️ POCUS rules <em>in</em> pleural disease and oedema — it does <strong>not</strong> exclude parenchymal or airway disease. A normal POCUS does not mean normal lungs.` },

      { kind: 'step', text: '📟 STEP 3 — PULSE OXIMETRY + S/F RATIO', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'SpO₂ interpretation (standard conditions)',
        cols: '1fr 1.2fr 1.2fr',
        dividers: true,
        headers: ['SpO₂', '~PaO₂ (mmHg)', { text: 'Action', tone: 'teal' }],
        rows: [
          ['95–100%', '≥80', { text: 'Normal', tone: 'green' }],
          ['90–94%', '60–70', { text: 'Hypoxaemia — supplement O₂', tone: 'warning' }],
          ['&lt;90%', '&lt;60', { text: 'Severe — escalate immediately', tone: 'danger' }],
          ['&lt;65%', '&lt;30', { text: 'Life-threatening', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'S/F ratio (SpO₂:FiO₂) — quantifies oxygenation efficiency independent of supplemental O₂',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Room air (FiO₂ = 0.21)</strong>', { text: 'S/F = SpO₂ ÷ 0.21 — e.g. SpO₂ 95% → S/F = 452', tone: 'teal' }],
          ['<strong>Thresholds</strong>', { text: 'S/F ≥400 = normal · 316–399 = mild · 151–315 = moderate lung injury (ARDS risk) · ≤150 = ARDS', tone: 'teal' }],
          ['<strong>🚫 Inaccurate when</strong>', { text: 'Poor perfusion · vasoconstriction · dark pigment · motion · dyshaemoglobin (smoke / CO)', tone: 'danger' }],
          ['<strong>Quality check</strong>', { text: 'The waveform must match the heart rate — a mismatched waveform means an erroneous reading', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '📊 STEP 4 — THORACIC RADIOGRAPHS (when stabilised)', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: '🐕 Trachea + airway assessment — 3 views as stability allows (R lateral + L lateral + DV; DV less stressful than VD)',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Tracheal diameter ≥30% change between phases</strong>', { text: 'Tracheal collapse — <strong>paired inspiratory + expiratory views are essential</strong> (sensitivity as low as 45% with a single view; normal dogs show up to 24% change)', tone: 'info' }],
          ['<strong>Axial tracheal collapse</strong>', { text: 'Increased DV tracheal dimension — may mimic an intraluminal FB; CT to differentiate', tone: 'info' }],
          ['<strong>Bronchiectasis</strong>', { text: 'Bronchi visible peripherally lacking normal tapering — "tram lines" and "donuts"', tone: 'info' }],
          ['<strong>Both L and R lateral views</strong>', { text: 'Increase sensitivity for bronchial collapse (ipsilateral visualisation)', tone: 'info' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Both species — CXR patterns',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Pattern', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['<strong>Alveolar</strong>', { text: '🐕 perihilar = CHF (MMVD) · ventral distribution = CHF (DCM) or aspiration · caudodorsal = NCPE. 🐱 patchy = CHF · pneumonia', tone: 'teal' }],
          ['<strong>Cranioventral alveolar</strong>', { text: 'Aspiration pneumonia (both species)', tone: 'teal' }],
          ['<strong>Bronchial ("tram lines / donuts")</strong>', { text: '🐱 asthma + hyperinflation + air trapping · 🐕🐱 chronic bronchitis', tone: 'teal' }],
          ['<strong>Interstitial (hazy)</strong>', { text: 'Early oedema · interstitial pneumonia · fibrosis', tone: 'teal' }],
          ['<strong>Reticular</strong>', { text: '🐕 fungal disease · pulmonary fibrosis · neoplasia', tone: 'teal' }],
          ['<strong>Miliary (1–3 mm nodules)</strong>', { text: '🐕 Histoplasma · Blastomyces · metastatic neoplasia', tone: 'teal' }],
          ['<strong>Nodular / mass</strong>', { text: 'Fungal · metastasis · primary lung tumour', tone: 'teal' }],
          ['<strong>Pleural effusion</strong>', { text: 'Blunted costophrenic angles · retracted lung margins — post-tap CXR for full assessment', tone: 'teal' }],
          ['<strong>Pneumothorax</strong>', { text: 'Radiolucent zone · no lung markings to the chest wall · heart elevated dorsally on lateral', tone: 'teal' }],
          ['<strong>🐱 Cranial mediastinal opacity</strong>', { text: 'Mass — lymphoma · thymoma · carcinoma', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: '🐕 Objective cardiac measures',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Measure', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>VHS &gt;11.5</strong>', { text: 'Cardiomegaly — breed-specific norms for Yorkshire · Pomeranian · Pug · Boston Terrier', tone: 'info' }],
          ['<strong>VLAS ≥2.3–2.5 × 4th thoracic vertebra</strong>', { text: 'LA enlargement — a better CHF predictor than VHS', tone: 'info' }],
          ['<strong>Pulmonary venous distension</strong> (cranial + caudal lobar veins)', { text: 'Cardiogenic — <strong>not</strong> seen with NCPE', tone: 'info' }],
          ['<strong>DCM</strong>', { text: 'Ventral alveolar distribution · peribronchial cuffing · dilated CVC · dilated cardiac silhouette', tone: 'info' }],
        ],
      },

      { kind: 'step', text: '🩸 STEP 5 — BLOODWORK (CBC · BIOCHEMISTRY · URINALYSIS)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Leukocytosis + left shift</strong>', { text: 'Infection / inflammation — pneumonia · pyothorax · ARDS trigger', tone: 'teal' }],
          ['<strong>Eosinophilia</strong>', { text: 'Parasitic (lungworm · heartworm) · allergic (EBP · asthma). <strong>A normal count does not exclude</strong> — both species', tone: 'teal' }],
          ['<strong>Anaemia</strong> (PCV &lt;20% 🐕 / &lt;12–15% 🐱)', { text: 'Compensatory tachypnoea — check reticulocytes', tone: 'teal' }],
          ['<strong>🐕 Polycythaemia (PCV &gt;65%)</strong>', { text: 'Right-to-left shunt; mild (55–65%) = chronic hypoxaemia', tone: 'teal' }],
          ['<strong>Leukopenia</strong>', { text: 'Parvovirus · sepsis · overwhelming infection', tone: 'teal' }],
          ['<strong>🐕 Azotaemia</strong>', { text: 'Uraemic pneumonitis risk; check for PLN (PTE risk) and endocrinopathies (hyperadrenocorticism → PTE)', tone: 'teal' }],
          ['<strong>🐱 Serum T4 — ALL cats</strong>', { text: 'Hyperthyroidism — cardiac changes · tachypnoea · weight loss', tone: 'teal' }],
          ['<strong>Hypoalbuminaemia (&lt;15 g/L)</strong>', { text: 'Non-cardiogenic effusion · protein-losing disease · reduced oncotic pressure', tone: 'teal' }],
          ['<strong>🐕 Proteinuria (UPC &gt;0.5)</strong>', { text: 'PLN → PTE risk; also screen renal function (USG · creatinine)', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Cardiac biomarkers',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Biomarker', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>🐕 NT-proBNP</strong>', { text: '&lt;900 pmol/L = L-CHF unlikely (primary respiratory disease more likely) · 900–1800 pmol/L = equivocal (correlate with exam + imaging) · &gt;1800 pmol/L = L-CHF likely. Elevated in renal disease · sepsis · pulmonary hypertension. Healthy Labradors may reach 2100 pmol/L', tone: 'teal' }],
          ['<strong>🐱 NT-proBNP</strong>', { text: '&gt;100 pmol/L = elevated · &gt;265 pmol/L = high specificity for CHF. A normal result does <strong>not</strong> fully exclude cardiac disease', tone: 'teal' }],
          ['<strong>🐕 cTnI</strong>', { text: 'Marker of myocardial injury — <strong>not specific for CHF</strong>; elevated in myocarditis · arrhythmias · cardiomyopathy · systemic disease (sepsis · heatstroke). Less useful than NT-proBNP for distinguishing CHF from primary respiratory disease', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🧪 STEP 6 — ARTERIAL BLOOD GAS (when available)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Domain', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Oxygenation</strong>', { text: 'Hypoxaemia PaO₂ &lt;80 mmHg · severe &lt;60 mmHg. Always interpret relative to FiO₂ — ideal PaO₂ = 4–5 × FiO₂ (room air FiO₂ 21% → PaO₂ 84–105 mmHg)', tone: 'teal' }],
          ['<strong>P/F ratio (PaO₂:FiO₂)</strong>', { text: '≥400 = normal · 301–399 = mild · 101–300 = moderate (ARDS risk) · ≤100 = severe ARDS', tone: 'teal' }],
          ['<strong>Ventilation</strong>', { text: 'Hypercapnia PaCO₂ &gt;45 mmHg = hypoventilation; venous PvCO₂ &gt;50 mmHg also suggestive. Causes: upper airway obstruction · severe pleural disease · bronchoconstriction · neuromuscular disease · respiratory fatigue · obesity hypoventilation', tone: 'teal' }],
          ['<strong>🐕 PaCO₂–ETCO₂ gradient &gt;5 mmHg</strong>', { text: 'Increased dead space — PTE · low cardiac output · hypovolaemia', tone: 'teal' }],
          ['<strong>Acid-base</strong>', { text: 'Metabolic acidosis → Kussmaul breathing (deep, laboured, rapid) = compensatory CO₂ elimination. Respiratory acidosis + metabolic alkalosis → chronic upper airway obstruction with bicarbonate retention', tone: 'teal' }],
        ],
      },

      ...stepTable(7, 'ECHOCARDIOGRAPHY', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Diagnosis', { text: 'Echo findings', tone: 'teal' }],
        rows: [
          ['<strong>🐕 MMVD</strong>', { text: 'LA enlargement (LA:Ao &gt;2.0) · mitral valve thickening / prolapse · eccentric LV hypertrophy', tone: 'teal' }],
          ['<strong>🐕 DCM</strong>', { text: 'Dilated LV · reduced systolic function (FS &lt;25%) · LA enlargement · AF common', tone: 'teal' }],
          ['<strong>🐕 Pulmonary hypertension</strong>', { text: 'TR jet velocity &gt;2.8 m/s · RV hypertrophy or dilatation · CVC distension', tone: 'teal' }],
          ['<strong>🐕 Ruptured chordae tendineae</strong>', { text: 'Acute MMVD crisis — minimal LA enlargement but severe regurgitation; <strong>CXR underestimates severity</strong>', tone: 'danger' }],
          ['<strong>🐕 Equivocal cases</strong>', { text: 'Differentiate CHF from NCPE — e.g. concurrent tracheal collapse + MMVD', tone: 'teal' }],
          ['<strong>🐱 HCM</strong>', { text: 'LV free wall or IVS &gt;6 mm in diastole (Maine Coon &gt;7.5 mm)', tone: 'teal' }],
          ['<strong>🐱 LA:Ao &gt;1.5</strong>', { text: 'Significant LA enlargement → CHF risk high', tone: 'teal' }],
          ['<strong>🐱 SAM of the mitral valve</strong>', { text: 'Dynamic LVOTO. <strong>Always echo before starting cardiac medications</strong>', tone: 'teal' }],
        ],
      }, '🫀'),

      ...stepTable(8, 'PLEURAL FLUID ANALYSIS (post-thoracocentesis)', {
        cols: '1.2fr 1fr 1.1fr',
        dividers: true,
        headers: ['Fluid type', 'TP / Cells', { text: 'Key causes', tone: 'teal' }],
        rows: [
          ['Pure transudate', '&lt;25 g/L · &lt;1000/μL', { text: 'Hypoalbuminaemia · right CHF', tone: 'teal' }],
          ['Modified transudate', '25–35 g/L · mixed', { text: '🐕 MMVD / DCM · 🐱 HCM · neoplasia · chylothorax', tone: 'warning' }],
          ['Exudate', '&gt;30 g/L · ↑↑ cells', { text: 'Pyothorax · 🐱 FIP · neoplasia', tone: 'danger' }],
          ['Chylous', 'Milky · lymphocytes · TG &gt; serum', { text: 'Lymphoma · cardiac · idiopathic', tone: 'green' }],
          ['Haemorrhagic', 'PCV measurable · no clot', { text: 'Trauma · neoplasia (HSA) · coagulopathy', tone: 'teal' }],
        ],
      }, '💧'),
      { kind: 'note', html: `Always send cytology. Degenerate neutrophils + intracellular bacteria = <strong>pyothorax</strong> → culture + sensitivity essential. Post-tap CXR for full parenchymal assessment.` },

      { kind: 'step', text: '🔬 STEP 9 — AIRWAY SAMPLING + ADDITIONAL BY SUSPICION', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'BAL / transtracheal wash — cell differential + culture + susceptibility',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Cytology', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Eosinophils &gt;17%</strong>', { text: '🐱 asthma · 🐕 EBP or parasitic. Mast cells = allergic', tone: 'teal' }],
          ['<strong>Neutrophilic (septic / non-septic)</strong>', { text: 'Bacterial infection · chronic bronchitis', tone: 'teal' }],
          ['<strong>Granulomatous</strong>', { text: '🐕 fungal — Histoplasma · Blastomyces', tone: 'teal' }],
          ['<strong>🐕 Sample choice</strong>', { text: 'BAL preferred over TTW for culture in suspected bacterial pneumonia', tone: 'teal' }],
          ['<strong>🐕 Tracheobronchoscopy</strong>', { text: 'Gold standard for tracheal / bronchial collapse grade — required before stent planning', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Targeted tests by suspicion',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Indication / detail', tone: 'teal' }],
        rows: [
          ['<strong>🐕 Heartworm Ag test</strong>', { text: 'Endemic region + cough + prominent pulmonary vasculature + eosinophilia + right cardiomegaly (adult female HW — highly sensitive and specific). Also suspect in caval syndrome — hepatomegaly · ascites · haemoglobinuria', tone: 'warning' }],
          ['<strong>🐕 Respiratory PCR panel</strong>', { text: 'Young dog + recent kennel / shelter + CIRDC signs → Bordetella · Mycoplasma · canine influenza · CDV · coronavirus · <em>Streptococcus zooepidemicus</em>. <strong>Obtain before antimicrobial therapy</strong>', tone: 'green' }],
          ['<strong>🐕🐱 Faecal + Baermann</strong>', { text: 'Cough + eosinophilia + bronchial CXR + endemic region. 🐕 <em>Oslerus osleri</em> · <em>Angiostrongylus vasorum</em> (UK / Europe — check coagulation) · <em>Paragonimus kellicotti</em> (NA) · <em>Eucoleus aerophilus</em>. 🐱 <em>Aelurostrongylus abstrusus</em>', tone: 'info' }],
          ['<strong>🐕 Fungal testing (endemic regions)</strong>', { text: '<em>Histoplasma</em> (OH/MS valleys · midwest / SE USA): urine antigen ELISA preferred · cytology BAL / rectal scraping (2–5 μm oval yeasts in macrophages). <em>Blastomyces</em> (midwest / SE USA · Great Lakes · Canada): urine antigen ELISA (cross-reacts with Histoplasma) · cytology (large 8–20 μm yeast, broad-based budding). <em>Coccidioides</em> (SW USA · Mexico · CA): AGID serology (IgM early · IgG established)', tone: 'danger' }],
          ['<strong>🐕 Fluoroscopy</strong>', { text: 'Real-time tracheal assessment without GA — dynamic tracheal collapse · tracheal kinking · cervical lung herniation. <strong>Cannot assess bronchial collapse</strong> (use bronchoscopy). Preferred when GA is high-risk', tone: 'violet' }],
          ['<strong>🐕🐱 Thoracic CT</strong>', { text: 'When standard diagnostics are non-diagnostic. Best for interstitial / vascular / nodular disease; <strong>CT pulmonary angiography = gold standard for PTE</strong>. More sensitive than CXR for pulmonary nodules. Requires GA + breath-hold technique', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🔑 KEY BRANCH DECISIONS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['If', { text: 'Then', tone: 'teal' }],
        rows: [
          ['<strong>Pleural effusion on POCUS</strong>', { text: 'Thoracocentesis (diagnostic + therapeutic) → fluid cytology + culture', tone: 'teal' }],
          ['<strong>B-lines + LA enlargement on POCUS</strong>', { text: 'NT-proBNP + echo → cardiogenic oedema → furosemide', tone: 'teal' }],
          ['<strong>🐕 Murmur + equivocal POCUS / CXR</strong>', { text: '<strong>Diuretic trial</strong> — furosemide 2 mg/kg; CHF improves within 30 min IV / 2 h IM; primary respiratory disease will not respond. No response after 1–2 doses → do not continue', tone: 'teal' }],
          ['<strong>🐕 Goose-honk + toy breed</strong>', { text: 'Tracheal collapse → fluoroscopy or bronchoscopy → medical (weight loss · cough suppressants · bronchodilators) vs stenting', tone: 'teal' }],
          ['<strong>🐕 Stridor + large breed + change in bark</strong>', { text: 'Laryngeal paralysis → exam under light sedation (arytenoid mobility) → surgery (unilateral tieback) + aspiration precautions', tone: 'teal' }],
          ['<strong>🐕 Brachycephalic + inspiratory distress</strong>', { text: 'BOAS → airway exam / CT → rhinoplasty + staphylectomy · nebulised epinephrine for acute oedema · cool environment · treat hyperthermia', tone: 'teal' }],
          ['<strong>🐱 Bronchial pattern + hyperinflation on CXR</strong>', { text: 'Asthma → terbutaline / salbutamol + corticosteroid', tone: 'teal' }],
          ['<strong>Cranioventral alveolar consolidation</strong>', { text: 'Aspiration pneumonia → BAL culture → ampicillin-sulbactam IV (first-line)', tone: 'teal' }],
          ['<strong>🐕 Acute dyspnoea + normal / near-normal CXR + hypercoagulable disease</strong>', { text: 'PTE → D-dimers + CT angiography + anticoagulation', tone: 'teal' }],
          ['<strong>🐕 Miliary / reticular CXR + endemic region</strong>', { text: 'Fungal → urine antigen testing. <strong>Do NOT start empiric antifungal without testing</strong>', tone: 'danger' }],
          ['<strong>🐱 Non-compressible cranial mediastinum</strong>', { text: 'Mass (lymphoma / thymoma) → POCUS-guided FNA cytology', tone: 'teal' }],
        ],
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
