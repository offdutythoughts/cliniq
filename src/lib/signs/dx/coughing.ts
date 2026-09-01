// ── Coughing — diagnostic approach (data) ───────────────────────────────────
// Migration of the inline renderDxCoughing{History,Exam,Dx} HTML (in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepPair } from './shared/dxHelpers'

export const coughingDx: DxApproach = {
  title: 'Coughing',
  tabs: {

  history: {
    title: 'History: Coughing',
    blocks: [
      { kind: 'branch', text: 'COUGH CHARACTER + SPECIES = THE TWO KEY HISTORY AXES' },
      {
        kind: 'gridTable',
        cols: '0.28fr 0.34fr 0.38fr',
        dividers: true,
        headers: ['Cough character', 'Pattern / species clues', { text: 'Differential & next step', tone: 'teal' }],
        rows: [
          ['<strong>Dry / honking</strong>', 'Toy breed, worse with excitement/leash', { text: '<strong>Tracheal collapse</strong><br>Fluoroscopy / tracheal radiograph', tone: 'teal' }],
          ['<strong>Dry / harsh, productive on excitement</strong>', 'Dog with grade ≥3/6 murmur + nocturnal cough', { text: '<strong>Cardiogenic (LA enlargement)</strong><br>CXR + echo + NT-proBNP', tone: 'teal' }],
          ['<strong>Paroxysmal + terminal wheeze</strong>', 'Cat → never assume cardiac', { text: '<strong>Feline asthma / bronchitis</strong><br>BAL cytology ± bronchodilator trial', tone: 'teal' }],
          ['<strong>Moist / productive</strong>', 'Pyrexia + crackles', { text: '<strong>Pneumonia</strong><br>CXR + BAL culture', tone: 'teal' }],
          ['<strong>Acute &lt;2 wk + recent boarding</strong>', 'Dog, incomplete vaccine', { text: '<strong>CIRD</strong><br>Tracheal swab / PCR', tone: 'teal' }],
          ['<strong>Chronic &gt;2 months</strong>', 'Old dog, weight loss', { text: '<strong>Neoplasia / chronic bronchitis</strong><br>CXR 3-view', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🐾 SPECIES RULE' },
      {
        kind: 'check',
        html: `<strong>Cats do NOT cough from cardiac disease</strong> — a coughing cat almost always has airway/lung disease (feline asthma/bronchitis top of list). In dogs, both cardiac and respiratory causes are common.`,
      },
      { kind: 'step', text: '🌍 RISK / EXPOSURE / SIGNALMENT' },
      {
        kind: 'check',
        html: `<strong>Recent boarding/kennels/dog park, incomplete vaccination</strong> → CIRD (kennel cough).<br>
      <strong>Toy/small breed, chronic goose-honk</strong> → tracheal collapse.<br>
      <strong>Young, outdoor, slug/snail access</strong> → Angiostrongylus (lungworm).<br>
      <strong>Older dog, weight loss</strong> → pulmonary or mediastinal neoplasia.<br>
      <strong>Exercise intolerance, syncope with cough</strong> → cardiac disease / pulmonary hypertension.`,
      },
      { kind: 'step', text: '🔍 CONCURRENT SIGNS NARROW THE DIFFERENTIAL' },
      {
        kind: 'check',
        html: `Exercise intolerance / syncope with cough → pulmonary hypertension or severe cardiac disease — check for right-sided signs (ascites, jugular distension). Pink frothy fluid → pulmonary oedema — stabilise before diagnostics. Young outdoor dog + haemoptysis → lungworm (<em>Angiostrongylus</em>/<em>Crenosoma</em>). Weight loss + any cough → neoplasia until proven otherwise. Regurgitation after cough → megaoesophagus / hiatal hernia (post-cough pooling).`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> A coughing dog that becomes dyspnoeic at rest or has pink frothy fluid may be in pulmonary oedema — stabilise (O₂, furosemide) before stressful diagnostics.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Coughing',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — OBSERVE BEFORE TOUCHING' },
      {
        kind: 'check',
        html: `Respiratory rate and effort, posture, cyanosis — a cyanotic patient is an emergency, stabilise first before any further examination.<br>
      <strong>Respiratory pattern:</strong> Inspiratory stridor = upper airway obstruction (laryngeal, tracheal, nasopharyngeal). Expiratory effort / push = lower airway / dynamic collapse (bronchitis, asthma, intrathoracic collapse). Paradoxical abdominal movement = diaphragmatic dysfunction or severe respiratory distress.`,
      },
      { kind: 'step', text: '👂 STEP 2 — AUSCULTATION' },
      {
        kind: 'check',
        html: `<strong>Tracheal auscultation:</strong> referred upper airway sound loud over trachea vs lung fields = upper vs lower airway origin.<br>
      <strong>Dynamic tracheal collapse:</strong> induced by gentle tracheal palpation; confirmed on fluoroscopy (dynamic study).<br>
      <strong>Lung fields:</strong> crackles (oedema, pneumonia, fibrosis); wheezes (bronchoconstriction — asthma, bronchitis, collapse); dull ventrally (effusion, mass, consolidation).<br>
      <strong>Heart:</strong> grade + location + radiation of murmur; gallop rhythm; arrhythmia. A cough with a normal heart and no murmur makes cardiogenic cough unlikely.<br>
      <strong>Upper airway:</strong> stertor/stridor → nasopharyngeal/laryngeal disease.`,
      },
      { kind: 'step', text: '🔍 STEP 3 — SUPPORTING FINDINGS' },
      {
        kind: 'check',
        html: `Pyrexia → pneumonia/infectious. Weight loss/cachexia → neoplasia/chronic disease. Jugular distension → right heart failure or cranial mediastinal mass. Ascites → right-sided cardiac failure or hypoproteinaemia. Peripheral oedema → hypoproteinaemia or severe cardiac disease. Lymphadenopathy → neoplasia, fungal, or infectious disease. Pulse quality (weak/thready → poor cardiac output; bounding → early sepsis or patent ductus).`,
      },
      { kind: 'step', text: '🐾 STEP 4 — SPECIES-SPECIFIC CLUES' },
      {
        kind: 'check',
        html: `🐱 <strong>CATS:</strong> Almost never cough from cardiac disease — a coughing cat = airway/lung disease. Diaphragmatic breathing at rest → pleural effusion (effusive FIP, chylothorax, cardiac — HCM effusion). Expiratory push → bronchoconstriction (asthma/bronchitis).<br>
      🐕 <strong>DOGS:</strong> Both cardiac and respiratory common. A cough with no murmur, no cardiomegaly on CXR → almost never cardiac. Breed-specific: Cavalier with grade ≥3/6 MVD + enlarged LA → cardiogenic cough likely. Toy breed with honk on leash → tracheal collapse.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Coughing — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'SPECIES RULE FIRST: CATS DO NOT COUGH FROM CARDIAC DISEASE' },
      {
        kind: 'check',
        html: `<strong>Key species rule:</strong> If a cat is coughing → primary respiratory cause (asthma/bronchitis is #1). Cardiac disease in cats causes dyspnoea and pleural effusion, not cough. In dogs, both cardiac and respiratory causes are common.`,
      },
      ...stepPair(1, 'MINIMUM DATABASE', `<strong>CBC + biochemistry:</strong> leukocytosis/left shift (pneumonia, pyothorax); eosinophilia (eosinophilic bronchopneumopathy, parasites, heartworm); anaemia (chronic lung disease).<br>
      <strong>Blood pressure:</strong> hypertensive pulmonary disease.<br>
      🐱 FIV/FeLV if not known.<br>
      <strong>Faecal Baermann:</strong> lungworm larvae (<em>Angiostrongylus</em>, <em>Crenosoma</em>) — young outdoor dogs.`),
      ...stepPair(2, 'THORACIC RADIOGRAPHS — 3 VIEWS (lateral L + lateral R + DV/VD)', `The single most important diagnostic test for coughing.<br>
      <strong>Assess:</strong> bronchial pattern (bronchitis, asthma, collapse); alveolar/interstitial pattern (pneumonia, oedema, neoplasia); vascular pattern (heartworm, PTE); pleural effusion; masses; tracheal diameter (collapse best seen on inspiratory lateral); cardiac size and LA enlargement (caudal displacement of trachea, carinal angle &gt;70°).`),
      ...stepPair(3, 'NT-proBNP (DOG) — CARDIAC vs RESPIRATORY', `Serum NT-proBNP: &lt;900 pmol/L effectively excludes left-sided cardiac failure in a coughing dog. &gt;1500–1800 pmol/L with a significant murmur → proceed to echocardiography.<br>
      <strong>In cats:</strong> NT-proBNP &gt;100–200 pmol/L suggests cardiac disease (HCM).<br>
      Useful when clinical signs and CXR are ambiguous — "is this cardiac oedema or pneumonia?"`),
      ...stepPair(4, 'BRONCHOSCOPY / BAL / TRACHEAL WASH', `<strong>Indicated when:</strong> CXR abnormal without clear diagnosis; chronic cough unresponsive to empirical therapy; suspected eosinophilic bronchopneumopathy; fungal/parasitic bronchitis; neoplastic airway disease.<br>
      <strong>BAL cytology:</strong> eosinophils → EBP/feline asthma/parasites; neutrophils → bacterial (submit C&amp;S) or chronic bronchitis; macrophages dominant → chronic disease.<br>
      PCR for CIRD agents (<em>B. bronchiseptica</em>, CIV, CAV-2) on tracheal wash if kennels exposure.`),
      ...stepPair(5, 'ECHOCARDIOGRAPHY', `<strong>Indicated for:</strong> significant murmur + CXR cardiomegaly; suspected pulmonary hypertension (paradoxical septal motion, RA/RV dilation, tricuspid regurgitation jet &gt;3 m/s); unexplained right-sided signs.<br>
      LA:Ao &gt;1.6 (dog) confirms LA enlargement consistent with cardiogenic cough in MMVD.<br>
      <strong>Cats:</strong> always echo before concluding asthma — HCM may cause cough indirectly via pleural effusion.`),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'ESCALATION TRIGGERS',
        gap: 10,
        html: `Dyspnoea + cyanosis at rest = stabilise first (O₂ ± cage rest) before any radiographs.<br>
      Pink frothy fluid or SpO₂ &lt;92% = pulmonary oedema emergency — furosemide 2–4 mg/kg IV.<br>
      Muffled heart sounds + respiratory distress + dull percussion = pleural effusion → thoracocentesis first.<br>
      Haemoptysis + weight loss = neoplasia / coagulopathy — do not delay imaging.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ Clinical pearls:</strong> Cats do not cough from cardiac disease. NT-proBNP is the first-line test when murmur + respiratory signs overlap. Tracheal pinch should be done gently and is not specific — easily induced in any inflamed airway. Always take 3-view CXR (right lateral + left lateral + DV) for complete evaluation.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
