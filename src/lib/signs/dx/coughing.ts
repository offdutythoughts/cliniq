// ── Coughing — diagnostic approach (data) ───────────────────────────────────
// Migration of the inline renderDxCoughing{History,Exam,Dx} HTML (in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

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

      { kind: 'step', text: '🐾 STEP 1 — SPECIES RULE', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.5fr 1.55fr',
        dividers: true,
        headers: ['Species', { text: 'Rule', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Cat</strong>', { text: '<strong>Cats do NOT cough from cardiac disease</strong> — a coughing cat almost always has airway / lung disease (feline asthma / bronchitis top of list)', tone: 'teal' }],
          ['<strong>🐕 Dog</strong>', { text: 'Both cardiac and respiratory causes are common', tone: 'teal' }],
        ],
      },

      ...stepTable(2, 'RISK / EXPOSURE / SIGNALMENT', {
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Risk / signalment', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Recent boarding / kennels / dog park, incomplete vaccination</strong>', { text: 'CIRD (kennel cough)', tone: 'teal' }],
          ['<strong>Toy / small breed, chronic goose-honk</strong>', { text: 'Tracheal collapse', tone: 'teal' }],
          ['<strong>Young, outdoor, slug / snail access</strong>', { text: '<em>Angiostrongylus</em> (lungworm)', tone: 'teal' }],
          ['<strong>Older dog, weight loss</strong>', { text: 'Pulmonary or mediastinal neoplasia', tone: 'teal' }],
          ['<strong>Exercise intolerance, syncope with cough</strong>', { text: 'Cardiac disease / pulmonary hypertension', tone: 'teal' }],
        ],
      }, '🌍'),

      ...stepTable(3, 'CONCURRENT SIGNS NARROW THE DIFFERENTIAL', {
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Concurrent sign', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Exercise intolerance / syncope with cough</strong>', { text: 'Pulmonary hypertension or severe cardiac disease — check for right-sided signs (ascites, jugular distension)', tone: 'teal' }],
          ['<strong>Pink frothy fluid</strong>', { text: 'Pulmonary oedema — <strong>stabilise before diagnostics</strong>', tone: 'danger' }],
          ['<strong>Young outdoor dog + haemoptysis</strong>', { text: 'Lungworm — <em>Angiostrongylus</em> / <em>Crenosoma</em>', tone: 'teal' }],
          ['<strong>Weight loss + any cough</strong>', { text: 'Neoplasia until proven otherwise', tone: 'teal' }],
          ['<strong>Regurgitation after cough</strong>', { text: 'Megaoesophagus / hiatal hernia — post-cough pooling', tone: 'teal' }],
        ],
      }, '🔍'),
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
      ...stepTable(1, 'OBSERVE BEFORE TOUCHING', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Observe', { text: 'What it means', tone: 'teal' }],
        rows: [
          ['<strong>Rate · effort · posture · cyanosis</strong>', { text: 'A cyanotic patient is an emergency — <strong>stabilise first</strong>, before any further examination', tone: 'danger' }],
          ['<strong>Inspiratory stridor</strong>', { text: 'Upper airway obstruction — laryngeal · tracheal · nasopharyngeal', tone: 'teal' }],
          ['<strong>Expiratory effort / push</strong>', { text: 'Lower airway / dynamic collapse — bronchitis · asthma · intrathoracic collapse', tone: 'teal' }],
          ['<strong>Paradoxical abdominal movement</strong>', { text: 'Diaphragmatic dysfunction or severe respiratory distress', tone: 'teal' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'AUSCULTATION', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Listen', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Tracheal auscultation</strong>', { text: 'Referred upper airway sound loud over trachea vs lung fields = upper vs lower airway origin', tone: 'teal' }],
          ['<strong>Dynamic tracheal collapse</strong>', { text: 'Induced by gentle tracheal palpation; confirmed on fluoroscopy (dynamic study)', tone: 'teal' }],
          ['<strong>Lung fields</strong>', { text: 'Crackles (oedema · pneumonia · fibrosis) · wheezes (bronchoconstriction — asthma · bronchitis · collapse) · dull ventrally (effusion · mass · consolidation)', tone: 'teal' }],
          ['<strong>Heart</strong>', { text: 'Grade + location + radiation of murmur · gallop rhythm · arrhythmia. A cough with a normal heart and no murmur makes cardiogenic cough unlikely', tone: 'teal' }],
          ['<strong>Upper airway</strong>', { text: 'Stertor / stridor → nasopharyngeal or laryngeal disease', tone: 'teal' }],
        ],
      }, '👂'),

      ...stepTable(3, 'SUPPORTING FINDINGS', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pyrexia</strong>', { text: 'Pneumonia / infectious', tone: 'teal' }],
          ['<strong>Weight loss / cachexia</strong>', { text: 'Neoplasia · chronic disease', tone: 'teal' }],
          ['<strong>Jugular distension</strong>', { text: 'Right heart failure · cranial mediastinal mass', tone: 'teal' }],
          ['<strong>Ascites</strong>', { text: 'Right-sided cardiac failure · hypoproteinaemia', tone: 'teal' }],
          ['<strong>Peripheral oedema</strong>', { text: 'Hypoproteinaemia · severe cardiac disease', tone: 'teal' }],
          ['<strong>Lymphadenopathy</strong>', { text: 'Neoplasia · fungal · infectious disease', tone: 'teal' }],
          ['<strong>Pulse quality</strong>', { text: 'Weak / thready → poor cardiac output · bounding → early sepsis or patent ductus', tone: 'teal' }],
        ],
      }, '🔍'),

      ...stepTable(4, 'SPECIES-SPECIFIC CLUES', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Species finding', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Coughing cat</strong>', { text: 'Almost never cardiac — a coughing cat = airway / lung disease', tone: 'teal' }],
          ['<strong>🐱 Diaphragmatic breathing at rest</strong>', { text: 'Pleural effusion — effusive FIP · chylothorax · cardiac (HCM effusion)', tone: 'teal' }],
          ['<strong>🐱 Expiratory push</strong>', { text: 'Bronchoconstriction — asthma / bronchitis', tone: 'teal' }],
          ['<strong>🐕 General</strong>', { text: 'Both cardiac and respiratory common. A cough with no murmur and no cardiomegaly on CXR → almost never cardiac', tone: 'teal' }],
          ['<strong>🐕 Cavalier, grade ≥3/6 MVD + enlarged LA</strong>', { text: 'Cardiogenic cough likely', tone: 'teal' }],
          ['<strong>🐕 Toy breed, honk on leash</strong>', { text: 'Tracheal collapse', tone: 'teal' }],
        ],
      }, '🐾'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Coughing — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'SPECIES RULE FIRST: CATS DO NOT COUGH FROM CARDIAC DISEASE' },
      {
        kind: 'gridTable',
        cols: '0.5fr 1.55fr',
        dividers: true,
        headers: ['Species', { text: 'Key rule', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Cat</strong>', { text: 'A coughing cat → primary respiratory cause (asthma / bronchitis is #1). Cardiac disease in cats causes dyspnoea and pleural effusion, <strong>not cough</strong>', tone: 'teal' }],
          ['<strong>🐕 Dog</strong>', { text: 'Both cardiac and respiratory causes are common', tone: 'teal' }],
        ],
      },

      ...stepTable(1, 'MINIMUM DATABASE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>CBC + biochemistry</strong>`, { text: 'Leukocytosis / left shift (pneumonia · pyothorax) · eosinophilia (eosinophilic bronchopneumopathy · parasites · heartworm) · anaemia (chronic lung disease)', tone: 'teal' }],
          [`${numBadge(2)}<strong>Blood pressure</strong>`, { text: 'Hypertensive pulmonary disease', tone: 'teal' }],
          [`${numBadge(3)}<strong>🐱 FIV / FeLV</strong>`, { text: 'If status not known', tone: 'teal' }],
          [`${numBadge(4)}<strong>Faecal Baermann</strong>`, { text: 'Lungworm larvae (<em>Angiostrongylus</em>, <em>Crenosoma</em>) — young outdoor dogs', tone: 'teal' }],
        ],
      }, '🧪'),

      ...stepTable(2, 'THORACIC RADIOGRAPHS — 3 VIEWS (lateral L + lateral R + DV/VD)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['<strong>Bronchial pattern</strong>', { text: 'Bronchitis · asthma · collapse', tone: 'teal' }],
          ['<strong>Alveolar / interstitial pattern</strong>', { text: 'Pneumonia · oedema · neoplasia', tone: 'teal' }],
          ['<strong>Vascular pattern</strong>', { text: 'Heartworm · PTE', tone: 'teal' }],
          ['<strong>Pleural effusion · masses</strong>', { text: 'Effusion · primary or metastatic mass', tone: 'teal' }],
          ['<strong>Tracheal diameter</strong>', { text: 'Collapse — best seen on the inspiratory lateral', tone: 'teal' }],
          ['<strong>Cardiac size + LA enlargement</strong>', { text: 'Caudal displacement of trachea · carinal angle &gt;70°', tone: 'teal' }],
        ],
      }, '📊'),
      { kind: 'note', html: `The single most important diagnostic test for coughing.` },

      ...stepTable(3, 'NT-proBNP (DOG) — CARDIAC vs RESPIRATORY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Result', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>🐕 &lt;900 pmol/L</strong>', { text: 'Effectively excludes left-sided cardiac failure in a coughing dog', tone: 'teal' }],
          ['<strong>🐕 &gt;1500–1800 pmol/L</strong> with a significant murmur', { text: 'Proceed to echocardiography', tone: 'teal' }],
          ['<strong>🐱 &gt;100–200 pmol/L</strong>', { text: 'Suggests cardiac disease (HCM)', tone: 'teal' }],
          ['<strong>When to use it</strong>', { text: 'When clinical signs and CXR are ambiguous — "is this cardiac oedema or pneumonia?"', tone: 'teal' }],
        ],
      }, '🩸'),

      ...stepTable(4, 'BRONCHOSCOPY / BAL / TRACHEAL WASH', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Indicated when</strong>', { text: 'CXR abnormal without a clear diagnosis · chronic cough unresponsive to empirical therapy · suspected eosinophilic bronchopneumopathy · fungal / parasitic bronchitis · neoplastic airway disease', tone: 'teal' }],
          ['<strong>BAL cytology</strong>', { text: 'Eosinophils → EBP / feline asthma / parasites · neutrophils → bacterial (submit C&amp;S) or chronic bronchitis · macrophages dominant → chronic disease', tone: 'teal' }],
          ['<strong>PCR</strong>', { text: 'CIRD agents (<em>B. bronchiseptica</em> · CIV · CAV-2) on tracheal wash if kennels exposure', tone: 'teal' }],
        ],
      }, '🔬'),

      ...stepTable(5, 'ECHOCARDIOGRAPHY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Indicated for</strong>', { text: 'Significant murmur + CXR cardiomegaly · suspected pulmonary hypertension (paradoxical septal motion · RA/RV dilation · tricuspid regurgitation jet &gt;3 m/s) · unexplained right-sided signs', tone: 'teal' }],
          ['<strong>🐕 LA:Ao &gt;1.6</strong>', { text: 'Confirms LA enlargement consistent with cardiogenic cough in MMVD', tone: 'teal' }],
          ['<strong>🐱 Cats</strong>', { text: 'Always echo before concluding asthma — HCM may cause cough indirectly via pleural effusion', tone: 'teal' }],
        ],
      }, '❤️'),
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
