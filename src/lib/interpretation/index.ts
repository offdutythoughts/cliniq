// ── Interpretation tab content ──────────────────────────────────────────────
// Quick-reference interpretation of an abnormal finding: what counts as
// abnormal, the mechanism-grouped causes, and the pearls that stop a common
// misread. Two halves, matching the tab's two segments:
//
//   • PHYSICAL — vital-sign and exam findings (BP, HR, pulse, temperature,
//     respiration, mucous membranes). Sourced from Ettinger 9th edn, Section II
//     differential chapters + Ch 91/96/121/130 — `references/ettinger9-notes.md`.
//   • BLOODWORK — CBC (Ettinger Ch 57–59) and serum biochemistry (Sharkey &
//     Radin, *Manual of Veterinary Clinical Chemistry*, Ch 2–7, plus Ettinger
//     Ch 28/66–68 where the manual is thin).
//
// Plain text only — no authored HTML, so nothing here goes through RichText.
// `related` holds DIS-/PROT- ids; interpretation.test.ts fails on a dead one.
// Reference intervals are analyser-specific: thresholds here are the textbook's
// and every card says "below/above the RI" rather than inventing one.

export interface InterpSection {
  heading: string
  items: string[]
}

export interface InterpEntry {
  id: string
  title: string
  /** One line under the title — the definition or the threshold. */
  sub: string
  /** Label → value rows, shown as a small table before the causes. */
  thresholds?: [string, string][]
  sections: InterpSection[]
  pearls?: string[]
  related?: string[]
  /** Short-form source, AMA strings live in references/CITATIONS.md. */
  src: string
}

export interface InterpGroup {
  title: string
  icon: string
  entries: InterpEntry[]
}

const ETT = (ch: string) => `Ettinger 9th edn, Ch ${ch}`
const SHARKEY = (ch: string) => `Sharkey & Radin 2010, Ch ${ch}`
// Systematic review (PRISMA 2020, 49 studies, 2015–Jan 2026) of CBC-only
// interpretation; open access, CC BY. Table 2 → the pattern card, Table 1 →
// the ratio card. Two of its authors develop the VetPAT Vis-NIR analyser — the
// review discloses this, and the point-of-care pearl says so.
const BISIAUX = 'Bisiaux et al., Vet J 2026 (systematic review, 49 studies)'

// ── Physical findings ───────────────────────────────────────────────────────

export const PHYSICAL: InterpGroup[] = [
  {
    title: 'Cardiovascular',
    icon: '🫀',
    entries: [
      {
        id: 'hypotension',
        title: 'Hypotension',
        sub: 'Systolic arterial pressure (SAP) <90 mmHg',
        thresholds: [
          ['Hypotensive', 'SAP <90 mmHg'],
          ['Severe (Doppler)', 'Dog SAP <80 mmHg · Cat SAP <60 mmHg'],
          ['Septic shock target', 'MAP ≥65 mmHg'],
        ],
        sections: [
          { heading: 'Hypovolaemic', items: ['Haemorrhage', 'Severe vomiting / diarrhoea', 'Polyuria', 'Burns', 'Third-spacing'] },
          { heading: 'Distributive (vasodilatory)', items: ['Sepsis / SIRS', 'Anaphylaxis', 'Hypoadrenocorticism', 'Neurogenic', 'Drugs / toxins — anaesthetics, sedatives, vasodilators'] },
          { heading: 'Cardiogenic', items: ['DCM', 'End-stage MMVD', 'Feline cardiomyopathies', 'Myocarditis', 'Brady- or tachyarrhythmias'] },
          { heading: 'Obstructive', items: ['Cardiac tamponade', 'GDV', 'Thromboembolic disease'] },
          { heading: 'Metabolic', items: ['Hypoglycaemia', 'Severe hypoxaemia / anaemia', 'CO or methaemoglobin toxicosis'] },
        ],
        pearls: [
          'Dogs in shock are tachycardic · cats can be tachycardic OR bradycardic',
          'Vasodilatory shock gives hyperaemic membranes, rapid CRT and bounding pulses — not pallor',
          'Lactate >2 mmol/L = hypoperfusion · >4 mmol/L carries high mortality risk',
          'Hypotension persisting after the volume deficit is corrected → vasopressor / inotrope',
          'Unexplained hypotension with hyponatraemia / hyperkalaemia → ACTH stimulation test',
        ],
        related: ['DIS-SHOCK-HYPOVOL', 'DIS-SHOCK-SEPTIC', 'DIS-SEC-HYPO'],
        src: `${ETT('17, 119, 121')}`,
      },
      {
        id: 'hypertension',
        title: 'Hypertension',
        sub: 'SAP ≥160 mmHg (ACVIM 2018 consensus)',
        thresholds: [
          ['Normotensive', '<140 mmHg — minimal TOD risk'],
          ['Prehypertensive', '140–159 mmHg — low TOD risk'],
          ['Hypertensive', '160–179 mmHg — moderate TOD risk'],
          ['Severely hypertensive', '≥180 mmHg — high TOD risk'],
        ],
        sections: [
          { heading: 'Situational', items: ['"White-coat" / stress hypertension — the commonest confounder'] },
          { heading: 'Secondary (most cases)', items: ['CKD', 'Glomerulonephropathy', 'Hyperthyroidism (cat)', 'Hyperadrenocorticism', 'Phaeochromocytoma', 'Diabetes mellitus', 'Hypothyroidism', 'Acromegaly', 'Polycythaemia', 'Overhydration (iatrogenic fluids)'] },
          { heading: 'Idiopathic', items: ['Primary / essential hypertension — rare, a diagnosis of exclusion'] },
          { heading: 'Target-organ damage (TOD)', items: ['Eye — retinal haemorrhage, oedema, detachment', 'Brain — encephalopathy, seizures, ataxia, stupor', 'Kidney — proteinuria, CKD progression', 'Heart — LV hypertrophy, gallop'] },
        ],
        pearls: [
          'Acclimatise 5–10 min · discard the first reading · average 5–7 consistent readings (<20% variation)',
          'Cuff width 30–40% of limb or tail circumference',
          'Without TOD, confirm on ≥2 separate occasions before treating',
          'Doppler gives SAP only — classification is by SAP',
          'Neurological signs can appear at lower pressures (~170 mmHg) when hypertension develops quickly',
        ],
        related: ['DIS-VASC-HYPERT', 'DIS-SEC-CKD', 'DIS-ENDO-HYPERTHY', 'DIS-ENDO-PHEO'],
        src: `${ETT('14, 35, 91')}`,
      },
      {
        id: 'bradycardia',
        title: 'Bradycardia',
        sub: 'Heart rate below the species range',
        thresholds: [
          ['Dog (adult)', '70–160 bpm · giant breeds 60–140 · toy 80–180'],
          ['Puppy', 'up to 220 bpm'],
          ['Cat', '140–240 bpm in hospital · 100–120 at home'],
        ],
        sections: [
          { heading: 'Physiological', items: ['Athletic / large dog at rest', 'Sleep', 'High vagal tone · respiratory sinus arrhythmia (normal in dogs)'] },
          { heading: 'Vagal', items: ['Brachycephalic airway disease', 'GI or respiratory disease', 'Situational — cough, vomiting, micturition, defecation', 'Raised ICP — Cushing reflex (hypertension + reflex bradycardia)'] },
          { heading: 'Metabolic', items: ['Hyperkalaemia — hypoadrenocorticism, urethral obstruction, AKI, uroabdomen', 'Hypothermia (atropine-unresponsive)', 'Hypothyroidism'] },
          { heading: 'Drugs / toxins', items: ['α2-agonists', 'Opioids', 'β-blockers', 'Calcium-channel blockers', 'Digoxin'] },
          { heading: 'Conduction disease', items: ['Sinus arrest / sick sinus syndrome', 'High-grade or complete AV block', 'Atrial standstill'] },
        ],
        pearls: [
          'A bradycardic sick cat is in decompensated shock or hyperkalaemic until proven otherwise',
          'Hyperkalaemia ECG: tall T waves → small / absent P waves → wide QRS → arrest',
          'Run an ECG whenever bradycardia, a dysrhythmia or pulse deficits accompany a weak pulse',
        ],
        related: ['DIS-CARD-ARRHYTHMIA', 'DIS-SEC-HYPO', 'DIS-URO-URETHRAL-OBS'],
        src: `${ETT('23, 25, 39, 40, 68, 96, 121, 130')}`,
      },
      {
        id: 'tachycardia',
        title: 'Tachycardia',
        sub: 'Heart rate above the species range',
        thresholds: [
          ['Dog (adult)', '70–160 bpm · giant breeds 60–140 · toy 80–180'],
          ['Cat', '140–240 bpm in hospital · 100–120 at home'],
        ],
        sections: [
          { heading: 'Sympathetic / physiological', items: ['Excitement, fear, stress', 'Pain', 'Exercise'] },
          { heading: 'Compensatory', items: ['Hypovolaemia / shock', 'Anaemia', 'Hypoxaemia', 'Fever / hyperthermia', 'Congestive heart failure'] },
          { heading: 'Endocrine', items: ['Hyperthyroidism', 'Phaeochromocytoma'] },
          { heading: 'Drugs / toxins', items: ['Anticholinergics (atropine)', 'Catecholamines / β-agonists', 'Methylxanthines (chocolate, caffeine)', 'Stimulants'] },
          { heading: 'Tachyarrhythmia', items: ['Supraventricular tachycardia', 'Atrial fibrillation', 'Ventricular tachycardia'] },
        ],
        pearls: [
          'Pulse deficits (heart rate > pulse rate) → premature beats → ECG',
          'Very fast rates shorten filling time and weaken the pulse',
          'Tachycardia is the expected shock response in dogs',
        ],
        related: ['DIS-CARD-ARRHYTHMIA', 'DIS-SHOCK-HYPOVOL', 'DIS-ENDO-HYPERTHY'],
        src: `${ETT('25, 39, 96, 121')}`,
      },
      {
        id: 'pulse',
        title: 'Pulse quality',
        sub: 'Strength reflects pulse pressure (SAP − DAP), not absolute BP',
        sections: [
          { heading: 'Weak — reduced preload', items: ['Haemorrhage', 'Volume depletion (vomiting, diarrhoea, anorexia)', 'Pericardial effusion', 'Tachycardia'] },
          { heading: 'Weak — reduced contractility', items: ['DCM', 'Sepsis', 'Anaesthetics'] },
          { heading: 'Weak — hard to palpate', items: ['Obesity', 'Thick coat', 'Raised intrathoracic pressure'] },
          { heading: 'Bounding / hyperkinetic', items: ['Anaemia', 'Hyperthyroidism', 'Fever / early vasodilatory shock', 'PDA (diastolic run-off)', 'Aortic insufficiency', 'Bradycardia (long filling time)'] },
          { heading: 'Named patterns', items: ['Pulsus paradoxus — falls on inspiration · cardiac tamponade', 'Pulsus alternans — alternating strength · myocardial failure (DCM)', 'Pulsus parvus et tardus — weak and late · severe subaortic stenosis', 'Pulse deficits — premature beats'] },
        ],
        related: ['DIS-CARD-DCM'],
        src: ETT('39'),
      },
    ],
  },
  {
    title: 'Temperature',
    icon: '🌡️',
    entries: [
      {
        id: 'hyperthermia',
        title: 'Fever vs hyperthermia',
        sub: 'Rectal temperature >39.2 °C (102.5 °F)',
        thresholds: [
          ['Normal', '38.0–39.2 °C (100.5–102.5 °F)'],
          ['Consult-room stress', 'up to 39.7 °C (103.5 °F) in healthy animals'],
          ['Heatstroke', '>40 °C + neurological signs + organ dysfunction'],
          ['Life-threatening', '>41.1 °C (106 °F) — cool immediately'],
        ],
        sections: [
          { heading: 'Fever (raised set point)', items: ['Infection — bacterial, viral, fungal, protozoal, rickettsial', 'Immune-mediated disease (IMPA, IMHA, SLE)', 'Neoplasia', 'Tissue necrosis / sterile inflammation (pancreatitis)', 'Drugs'] },
          { heading: 'Hyperthermia (normal set point)', items: ['Hot environment', 'Exercise — esp. obese or airway-compromised dogs', 'Seizures', 'Hypermetabolic states — hyperthyroidism, hypocalcaemic tetany', 'Drugs — opioids (cats), ketamine, SSRIs', 'Toxins — stimulants, metaldehyde', 'Malignant hyperthermia'] },
        ],
        pearls: [
          'The fevered animal does NOT try to cool itself · the hyperthermic one pants, vasodilates and seeks cool surfaces',
          'Fever rarely exceeds 41.1 °C — temperatures above this point to hyperthermia',
          'Cool with tepid water + fan, never ice · stop at 39.5–39.7 °C',
          'Normal temperature does not exclude heatstroke if cooled before arrival',
          'Feeling the nose is unreliable (sensitivity 29%)',
        ],
        related: ['DIS-ENV-HEAT'],
        src: ETT('16, 130'),
      },
      {
        id: 'hypothermia',
        title: 'Hypothermia',
        sub: 'Core temperature <37.2 °C (99 °F)',
        sections: [
          { heading: 'Primary (accidental)', items: ['Cold exposure, wet coat', 'Neonates and small patients'] },
          { heading: 'Secondary', items: ['Anaesthesia / sedation — the commonest cause', 'Decompensated shock', 'Sepsis (especially cats)', 'Trauma', 'Hypothyroidism / myxoedema', 'CNS disease affecting thermoregulation'] },
          { heading: 'Consequences', items: ['Bradycardia unresponsive to atropine', 'Vasodilation, ↓ SVR', 'Cold diuresis → hypovolaemia', 'Coagulopathy (missed if the sample is warmed)', 'VF / asystole when profound'] },
        ],
        pearls: [
          'Rectal–interdigital gradient >4 °C is a shock marker in dogs',
          'Warm passively if mild, actively (forced air) if moderate–severe',
        ],
        related: ['DIS-SHOCK-SEPTIC'],
        src: ETT('119, 121, 130'),
      },
    ],
  },
  {
    title: 'Respiratory & perfusion',
    icon: '🫁',
    entries: [
      {
        id: 'tachypnoea',
        title: 'Tachypnoea / respiratory distress',
        sub: 'Resting respiratory rate >30 /min (persistently >35 = abnormal)',
        thresholds: [
          ['Hypoxaemia', 'PaO₂ <80 mmHg or SpO₂ <95%'],
          ['Severe hypoxaemia', 'PaO₂ <60 mmHg or SpO₂ <90%'],
          ['Hypercapnia', 'PaCO₂ >50 mmHg'],
        ],
        sections: [
          { heading: 'Inspiratory / noisy', items: ['Upper airway obstruction — BOAS, laryngeal paralysis, nasopharyngeal polyp, extrathoracic tracheal collapse'] },
          { heading: 'Expiratory / mixed', items: ['Small-airway disease — feline asthma, chronic bronchitis, bronchopneumonia'] },
          { heading: 'Rapid shallow (restrictive)', items: ['Pulmonary parenchymal disease — pneumonia, oedema, haemorrhage, neoplasia', 'Pleural space disease — effusion, pneumothorax (paradoxical movement)'] },
          { heading: 'Non-respiratory', items: ['Pain, anxiety, panting (dog)', 'Hyperthermia', 'Metabolic acidosis', 'Anaemia', 'Shock'] },
        ],
        pearls: [
          'Panting is rapid shallow open-mouth breathing WITHOUT distress',
          'Open-mouth breathing in a cat is an emergency',
          'Stabilise (O₂, minimal handling) before imaging',
        ],
        related: ['DIS-RESP-PHTN'],
        src: ETT('37'),
      },
      {
        id: 'mucous-membranes',
        title: 'Mucous membranes & CRT',
        sub: 'Normal: pink, moist, CRT 1–2 s',
        sections: [
          { heading: 'Pale', items: ['Anaemia (visible at HCT ≲25%)', 'Vasoconstriction — hypovolaemic or cardiogenic shock', 'Severe brady- or tachyarrhythmia', 'Cardiac tamponade'] },
          { heading: 'Hyperaemic / brick red', items: ['Vasodilatory (septic, anaphylactic) shock', 'Hyperthermia', 'Polycythaemia'] },
          { heading: 'Cyanotic', items: ['Severe hypoxaemia — V/Q mismatch (commonest), hypoventilation, right-to-left shunt', 'Peripheral — ATE, vasoconstriction'] },
          { heading: 'Icteric', items: ['Bilirubin >2.5 mg/dL (>43 µmol/L) — see Bilirubin under Bloodwork'] },
          { heading: 'Brown / muddy', items: ['Methaemoglobinaemia — paracetamol (cats), nitrites'] },
          { heading: 'CRT', items: ['>2 s — poor perfusion, dehydration, vasoconstriction', '<1 s — hyperdynamic (early sepsis, hyperthermia)'] },
        ],
        pearls: [
          'Anaemic animals may not look cyanotic even when critically hypoxaemic',
          'In acute haemorrhage the PCV stays normal for hours — pallor + weak pulse matter more',
          'Pale only in the hind end → aortic thromboembolism or reverse-PDA',
        ],
        related: ['DIS-BD-IMHA', 'DIS-SHOCK-HYPOVOL'],
        src: ETT('25, 26, 27, 28, 121'),
      },
    ],
  },
]

// ── Bloodwork ───────────────────────────────────────────────────────────────

export const BLOODWORK: InterpGroup[] = [
  {
    title: 'CBC — reading the pattern',
    icon: '🧩',
    entries: [
      {
        id: 'cbc-patterns',
        title: 'CBC pattern → differentials',
        sub: 'A pattern tells you the TYPE of disturbance — history and exam narrow it to a disease',
        sections: [
          { heading: 'Non-regenerative anaemia', items: [
            'With thrombocytopenia ± leukopenia — canine ehrlichiosis',
            'With monocytosis — canine leishmaniosis',
            'Feline leishmaniosis, feline histoplasmosis',
            'Macrocytic — FIV / FeLV (progressive)',
            'With neutrophilia + PU/PD, hypertension — feline CKD',
            'With circulating blasts + organomegaly — canine AML',
            'Microcytic hypochromic — canine portosystemic shunt',
          ] },
          { heading: 'Regenerative anaemia', items: [
            'With macroplatelets, thrombocytopenia — canine babesiosis',
            'With GI signs, footpad dermatitis — canine ancylostomiasis (hookworm)',
            'With leukocytosis, monocytosis, thrombocytopenia — feline haemoplasmosis',
          ] },
          { heading: 'Inflammatory leukogram (neutrophilia ± left shift, monocytosis, mild non-regenerative anaemia)', items: [
            'Canine pyometra',
            'Chronic inflammatory enteropathy',
            'Canine mammary tumour (± microcytic hypochromic anaemia)',
            'Canine multicentric lymphoma (± eosinopenia)',
            'Canine oropharyngeal tumours',
            'Canine ovarian tumour (± pancytopenia)',
            'Feline pancreatitis (± haemoconcentration)',
            'FIP (± lymphopenia)',
            'Feline mammary carcinoma',
            'Feline ATE (± lymphopenia, thrombocytopenia)',
          ] },
          { heading: 'Stress leukogram (neutrophilia, lymphopenia, eosinopenia, monocytosis)', items: [
            'Canine hyperadrenocorticism (± thrombocytosis, erythrocytosis)',
            'Canine MMVD (± thrombocytosis)',
          ] },
          { heading: 'Leukopenia (multilineage)', items: [
            'Canine parvovirus — with thrombocytopenia, anaemia',
            'Feline panleukopenia',
          ] },
          { heading: 'Isolated thrombocytopenia', items: ['Canine ITP (± anaemia from bleeding)'] },
        ],
        pearls: [
          'The same pattern is shared by very different diseases — the review found few distinct patterns across 49 studies',
          'Feline evidence is thin (14 of 49 studies) — do not extrapolate canine patterns to cats',
          'Abnormal morphology, atypical cells or a count that does not fit the patient → read the smear',
        ],
        related: ['DIS-BD-EHRL', 'DIS-INFECT-LEISHM', 'DIS-INFECT-FELV', 'DIS-SEC-CKD', 'DIS-NEO-LEUK', 'DIS-HEP-PSS', 'DIS-BD-BABS', 'DIS-INFECT-HMYCO', 'DIS-REPRO-PYO', 'DIS-GI-IBD', 'DIS-NEO-LSA', 'DIS-GI-PANCAT', 'DIS-INFECT-FIP', 'DIS-CARD-ATE', 'DIS-PUPD-HAC', 'DIS-CARD-MVD', 'DIS-GI-PARVO', 'DIS-GI-FPV', 'DIS-BD-TCP'],
        src: BISIAUX,
      },
    ],
  },
  {
    title: 'CBC — red cells',
    icon: '🩸',
    entries: [
      {
        id: 'anaemia',
        title: 'Anaemia',
        sub: 'PCV / HCT / Hb below the RI — first decide: regenerative or not?',
        sections: [
          { heading: 'Approach', items: ['1. How acute? Regeneration takes 3–5 days — earlier is "pre-regenerative"', '2. Regenerative? Absolute reticulocyte count above the RI (± marked polychromasia)', '3. Is the cause on the smear? (spherocytes, Heinz bodies, schistocytes, parasites)', '4. Then targeted tests'] },
          { heading: 'Regenerative — haemorrhage', items: ['Low total protein (albumin + globulin)', 'External chronic loss → iron deficiency (microcytic hypochromic)'] },
          { heading: 'Regenerative — haemolysis', items: ['Normal / high protein, ↑ bilirubin', 'IMHA — spherocytes, autoagglutination', 'Oxidant — Heinz bodies, eccentrocytes (onion, zinc, paracetamol in cats)', 'Infectious — Babesia, Mycoplasma haemofelis (cat)', 'Fragmentation — schistocytes (DIC, vasculitis, HSA)', 'Intravascular → haemoglobinaemia + haemoglobinuria'] },
          { heading: 'Non-regenerative', items: ['Normocytic normochromic, mild — inflammation, CKD, endocrine (hypothyroid, hypoadrenocorticism), neoplasia', 'Normocytic, severe — precursor-targeted IMHA, FeLV, leukaemia, marrow aplasia', 'Microcytic hypochromic — iron deficiency, portosystemic shunt', 'Macrocytic — FeLV (cat), poodle macrocytosis'] },
        ],
        pearls: [
          'Greyhounds run high — an HCT of 45% can be anaemia in this breed',
          'Pancytopenia or unexplained severe non-regenerative anaemia → bone marrow aspirate',
        ],
        related: ['DIS-BD-IMHA', 'DIS-BD-NRA', 'DIS-BD-BABS', 'DIS-INFECT-HMYCO'],
        src: ETT('57'),
      },
      {
        id: 'erythrocytosis',
        title: 'Erythrocytosis (↑ PCV)',
        sub: 'PCV / HCT above the RI',
        sections: [
          { heading: 'Relative', items: ['Dehydration — total protein also high', 'Splenic contraction (excitement) — transient'] },
          { heading: 'Absolute — appropriate (hypoxic)', items: ['Right-to-left shunt (reverse PDA, tetralogy)', 'Chronic respiratory disease', 'High altitude'] },
          { heading: 'Absolute — inappropriate', items: ['Renal tumour or other renal disease (EPO)', 'Other paraneoplastic EPO'] },
          { heading: 'Primary', items: ['Polycythaemia vera — diagnosis of exclusion'] },
        ],
        pearls: ['Rule out dehydration → check PaO₂ / SpO₂ → image kidneys → then consider PV'],
        related: ['DIS-BD-PV'],
        src: ETT('57'),
      },
    ],
  },
  {
    title: 'CBC — white cells',
    icon: '🦠',
    entries: [
      {
        id: 'leukogram-patterns',
        title: 'Leukogram patterns',
        sub: 'Read the whole differential, not one line',
        sections: [
          { heading: 'Stress (glucocorticoid)', items: ['Mature neutrophilia', 'Lymphopenia', 'Eosinopenia', '± Monocytosis (dog)', 'Cats: lymphopenia is the most consistent change · monocytosis often absent, even with sustained steroid exposure', 'Causes — illness, pain, HAC, steroid therapy'] },
          { heading: 'Excitement (catecholamine)', items: ['Mild mature neutrophilia + lymphocytosis', 'Mostly young cats · transient (minutes)', 'Should not exceed 2× the upper RI or show a left shift'] },
          { heading: 'Inflammatory', items: ['Neutrophilia with left shift (bands)', 'Toxic change — Döhle bodies, basophilic foamy cytoplasm', 'Degenerative left shift (bands > mature, or neutropenia + bands) = overwhelming demand, worse prognosis'] },
        ],
        pearls: [
          'A normal lymphocyte count in a very sick animal should make you think of hypoadrenocorticism',
        ],
        related: ['DIS-SEC-HYPO'],
        src: `${ETT('58')} · ${BISIAUX}`,
      },
      {
        id: 'cbc-ratios',
        title: 'CBC-derived ratios (NLR, PLR, SII)',
        sub: 'Sensitive but non-specific markers of systemic inflammation or stress — not diagnostic',
        sections: [
          { heading: 'Indices', items: ['NLR — neutrophil : lymphocyte', 'MLR — monocyte : lymphocyte', 'PNR / PLR — platelet : neutrophil, platelet : lymphocyte', 'SII — systemic immune-inflammation index (platelets × neutrophils ÷ lymphocytes)'] },
          { heading: 'What raises them besides disease', items: ['Endogenous or exogenous glucocorticoids', 'Catecholamines from handling and restraint', 'Recent surgery, pregnancy, old age', 'Neoplasia, endocrinopathy'] },
          { heading: 'Reported cut-offs — one study each, cut-off derived from its own data, NOT validated', items: [
            'Canine pyometra — NLR >5.85 (AUC 0.96 · Se 85 / Sp 100%) · MLR >0.41 (AUC 0.93) — vs healthy dogs',
            'Canine parvovirus — RDW >12.4% (AUC 0.93 · Se 86 / Sp 93%) · PLR >175 (AUC 0.88) — vs healthy dogs',
            'Canine ovarian tumour — PLR ≥168.2 (AUC 0.93 · Se 90 / Sp 95.5%) — vs healthy dogs',
            'Canine MMVD — NLR >3.73 (AUC 0.83 · Se 61 / Sp 93%) — vs healthy dogs',
            'Canine HAC — NLR >4.23 (AUC 0.70 · Se 67 / Sp 66%) — vs dogs with non-adrenal illness',
            'Feline pancreatitis (rule-out screen) — WBC ≥18, bands ≥0.27, eosinophils ≤0.3 × 10⁹/L (AUC 0.83 · Se 92 / Sp 58%) — vs lethargic, anorectic cats',
            'Feline ATE — NLR >2.51 (AUC 1.00) in 25 affected vs 10 healthy cats · large-platelet count ≤74 × 10⁹/L (AUC 0.84) vs HCM cats without ATE',
          ] },
        ],
        pearls: [
          'A raised NLR or SII says the patient is inflamed or stressed — not why',
          'Cut-offs are analyser- and population-specific: all 10 qualifying studies were at high risk of bias, and 7 of 10 compared sick animals with healthy ones, which overstates discrimination',
          'MLR is the least robust — monocyte counts carry a 4× larger allowable analytical error than neutrophils or lymphocytes',
          'Use a ratio to track a response you already suspect, not to choose between differentials',
          'Point-of-care Vis-NIR haematology (developer-group studies): agrees for red-cell values and total WBC, NOT yet for the differential or platelets — so no ratios from it',
        ],
        related: ['DIS-REPRO-PYO', 'DIS-GI-PARVO', 'DIS-CARD-MVD', 'DIS-PUPD-HAC', 'DIS-GI-PANCAT', 'DIS-CARD-ATE'],
        src: BISIAUX,
      },
      {
        id: 'neutrophilia',
        title: 'Neutrophilia',
        sub: 'Neutrophils above the RI · severe >35 × 10⁹/L',
        sections: [
          { heading: 'Physiological', items: ['Glucocorticoid (stress, HAC, steroids)', 'Catecholamine (fear, exercise)'] },
          { heading: 'Inflammatory', items: ['Infection — bacterial, fungal, protozoal', 'Necrosis — haemolysis, ischaemia, burns, neoplasia', 'Sterile — pancreatitis, FIP, immune-mediated disease (IMHA, IMPA)'] },
          { heading: 'Severe (>50 × 10⁹/L)', items: ['Infection — 34–58% of cases (pyometra, abscess, pyothorax, Hepatozoon, Babesia)', 'Immune-mediated — 11–32% (IMHA)', 'Neoplasia — 14–23% (incl. paraneoplastic, leukaemia)', 'Tissue necrosis — 10–18%'] },
        ],
        src: ETT('58'),
      },
      {
        id: 'neutropenia',
        title: 'Neutropenia',
        sub: 'Mild 1.5–3 · moderate 0.5–1.5 · severe <0.5 × 10⁹/L',
        sections: [
          { heading: 'Consumption', items: ['Overwhelming inflammation — sepsis, peritonitis, parvovirus enteritis', 'Immune-mediated destruction'] },
          { heading: 'Reduced production', items: ['Infection — parvovirus (dog), FeLV / FIV, panleukopenia (cat), Ehrlichia', 'Drugs — chemotherapy, chloramphenicol, azathioprine, phenobarbital, methimazole, sulfonamides', 'Oestrogen toxicosis', 'Marrow disease — myelophthisis, leukaemia, myelofibrosis'] },
          { heading: 'Other', items: ['Cyclic haematopoiesis (grey Collie)', 'Chronic idiopathic neutropenia (cat) — mild, healthy, retrovirus-negative'] },
        ],
        pearls: ['<0.5 × 10⁹/L carries a real risk of sepsis — treat a febrile patient as an emergency'],
        related: ['DIS-IMNP'],
        src: ETT('58'),
      },
      {
        id: 'other-leukocytes',
        title: 'Lymphocytes, eosinophils, monocytes',
        sub: 'The other lines of the differential',
        sections: [
          { heading: 'Lymphocytosis', items: ['Excitement (cat)', 'Chronic antigenic stimulation — ehrlichiosis, Babesia, fungal', 'Hypoadrenocorticism', 'Recent vaccination', 'Lymphoma (leukaemic) / lymphoid leukaemia'] },
          { heading: 'Lymphopenia', items: ['Stress / steroids / HAC', 'Lymph loss — chylothorax, PLE / lymphangiectasia', 'Acute viral infection, endotoxaemia', 'Immunosuppressive drugs'] },
          { heading: 'Eosinophilia', items: ['Parasites — fleas, heartworm, lungworm, GI', 'Hypersensitivity — atopy, feline asthma', 'Eosinophilic diseases (gastroenteritis, bronchopneumopathy, panosteitis)', 'Paraneoplastic — mast cell tumour, lymphoma', 'Hypoadrenocorticism', 'Hypereosinophilic syndrome (cat)'] },
          { heading: 'Monocytosis', items: ['Inflammation (acute or chronic), necrosis', 'Glucocorticoid (dog)', 'Immune-mediated neutropenia', 'Monocytic leukaemia'] },
        ],
        src: ETT('58'),
      },
    ],
  },
  {
    title: 'CBC — platelets',
    icon: '🧫',
    entries: [
      {
        id: 'thrombocytopenia',
        title: 'Thrombocytopenia',
        sub: 'Platelets below the RI — always confirm on a smear',
        thresholds: [
          ['Spontaneous bleeding', 'rarely from thrombocytopenia alone above 30 × 10⁹/L'],
          ['Primary ITP', 'usually <50 × 10⁹/L, often <20'],
          ['Smear estimate', 'mean platelets / oil field (10 fields) × 15 × 10⁹/L'],
        ],
        sections: [
          { heading: 'Pseudo', items: ['Clumping (especially cats) — check the feathered edge', 'CKCS and other breeds — inherited macrothrombocytopenia, no bleeding'] },
          { heading: 'Destruction', items: ['Primary ITP', 'Secondary immune — infection, neoplasia, drugs, vaccination'] },
          { heading: 'Consumption / sequestration', items: ['DIC', 'Vasculitis', 'Splenic disease — HSA, lymphoma, torsion', 'Severe haemorrhage'] },
          { heading: 'Reduced production', items: ['Infection — Ehrlichia, Anaplasma, FeLV / FIV, parvovirus', 'Drugs — chemotherapy, oestrogens, sulfonamides, methimazole', 'Marrow infiltration — leukaemia, lymphoma, myeloma'] },
          { heading: 'Dilutional', items: ['Massive transfusion (>1 blood volume / 24 h)'] },
        ],
        pearls: ['Petechiae / mucosal bleeding with a normal count → platelet function or vWD (BMBT)'],
        related: ['DIS-BD-TCP', 'DIS-BD-EHRL', 'DIS-BD-ICT', 'DIS-BD-TPATH'],
        src: ETT('29, 59'),
      },
      {
        id: 'thrombocytosis',
        title: 'Thrombocytosis',
        sub: 'Platelets above the RI',
        sections: [
          { heading: 'Reactive (common)', items: ['Iron deficiency / chronic blood loss', 'Inflammation, infection', 'Neoplasia', 'Tissue necrosis', 'Steroids / HAC · post-splenectomy'] },
          { heading: 'Primary', items: ['Essential thrombocythaemia — rare, usually >900 × 10⁹/L'] },
        ],
        related: ['DIS-BD-TCS'],
        src: ETT('59'),
      },
    ],
  },
  {
    title: 'Biochemistry — liver',
    icon: '🟤',
    entries: [
      {
        id: 'liver-enzymes',
        title: 'Liver enzymes (ALT, AST, ALP, GGT)',
        sub: 'Sensitive but NOT specific for liver disease — and NOT a function test',
        sections: [
          { heading: 'Hepatocellular damage', items: ['↑ ALT (± AST) — leakage enzymes', 'Toxins, drugs, hepatitis, hypoxia, neoplasia, lipidosis'] },
          { heading: 'Cholestasis / induction', items: ['↑ ALP, GGT (± bilirubin)', 'Biliary obstruction, cholangitis, mucocele, pancreatitis'] },
          { heading: 'Extrahepatic causes — rule out first', items: ['Corticosteroids (dog): ALP, GGT, ALT, AST', 'Anticonvulsants (phenobarbital): ALT, ALP, GGT', 'Hyperadrenocorticism: ALP ≫ ALT, GGT', 'Hyperthyroidism (cat): ALP, ALT', 'Diabetes mellitus, hypothyroidism (dog): ALP', 'Hypoxia / hypotension: ALT, ALP, AST', 'Muscle damage: AST, ALT if severe — check CK', 'Bone growth / remodelling: bone ALP (young dogs, osteosarcoma)', 'Enteritis, pancreatitis, sepsis'] },
          { heading: 'Decreased function', items: ['↑ bile acids, ↑ ammonia, ↑ bilirubin', '↓ albumin, ↓ urea, ↓ cholesterol, ↓ glucose', 'Prolonged PT / aPTT'] },
        ],
        pearls: [
          'Cat ALP has a short half-life and little induction — any increase is significant',
          'Feline hepatic lipidosis: marked ↑ ALP with normal GGT',
          'End-stage / cirrhotic livers can have normal enzymes — use bile acids',
          'Enzymes below the RI are not significant',
          'Check coagulation before biopsy',
        ],
        related: ['DIS-HEP-CHRONHEP', 'DIS-HEP-CHOLANGITIS', 'DIS-HEP-LIPIDOSIS', 'DIS-HEP-PSS', 'DIS-PUPD-HAC'],
        src: `${SHARKEY('2')} · ${ETT('28')}`,
      },
      {
        id: 'bilirubin',
        title: 'Bilirubin',
        sub: 'Visible jaundice above ~2.5 mg/dL (43 µmol/L)',
        sections: [
          { heading: 'Pre-hepatic (haemolysis)', items: ['Anaemia (usually regenerative) — check PCV first', 'IMHA, Mycoplasma, Babesia, Heinz body anaemia, hypophosphataemia'] },
          { heading: 'Hepatic', items: ['Marked ↑ ALT / AST, abnormal function tests', 'Hepatitis, leptospirosis, FIP, toxins (xylitol, sago palm, Amanita), drugs, lipidosis', 'Sepsis in cats — usually mild'] },
          { heading: 'Post-hepatic', items: ['Marked ↑ ALP / GGT, ↑ cholesterol', 'Mucocele, cholelithiasis, pancreatitis, neoplasia, duodenal FB', 'Complete obstruction → acholic faeces'] },
        ],
        pearls: ['HCT <30% with reticulocytes >60 × 10⁹/L → probably haemolytic'],
        related: ['DIS-BD-IMHA', 'DIS-HEP-LIPIDOSIS'],
        src: ETT('28'),
      },
    ],
  },
  {
    title: 'Biochemistry — kidney',
    icon: '🫘',
    entries: [
      {
        id: 'azotaemia',
        title: 'Azotaemia (↑ urea / creatinine)',
        sub: 'Interpret only alongside a pre-treatment urine specific gravity',
        thresholds: [
          ['Pre-renal', 'USG dog >1.030 · cat >1.035'],
          ['Renal', 'USG dog 1.007–1.030 · cat 1.007–1.035'],
          ['Isosthenuria', '1.008–1.012'],
        ],
        sections: [
          { heading: 'Pre-renal', items: ['Dehydration, hypovolaemia, haemorrhage', 'Low cardiac output, shock, sepsis', 'Hypoadrenocorticism (USG can be low — Na loss washes out the medulla)'] },
          { heading: 'Renal', items: ['AKI — toxins (ethylene glycol, lilies in cats, NSAIDs), leptospirosis, pyelonephritis, ischaemia', 'CKD'] },
          { heading: 'Post-renal', items: ['Urethral / bilateral ureteral obstruction', 'Uroabdomen', 'Partial obstruction can still pass small volumes'] },
          { heading: 'Urea alone ↑', items: ['High-protein meal', 'GI haemorrhage', 'Catabolism, fever, steroids'] },
          { heading: 'Urea ↓', items: ['Liver failure / PSS', 'Low-protein diet', 'Polyuria (diuresis)'] },
          { heading: 'Creatinine ↓ / unreliable', items: ['Low muscle mass — creatinine underestimates loss of function in thin patients'] },
        ],
        pearls: [
          '~75% of nephrons are lost before azotaemia appears',
          'The relationship is not linear: doubled creatinine = ≥ half the GFR lost',
          'Azotaemia magnitude does not separate acute from chronic',
          'Glucosuria, hypercalcaemia, PU/PD endocrinopathies and diuretics reduce USG without renal disease',
          'Stage stable CKD with IRIS (creatinine + SDMA, then UPC and BP)',
        ],
        related: ['DIS-SEC-AKI', 'DIS-SEC-CKD', 'DIS-URO-URETHRAL-OBS', 'DIS-SEC-HYPO'],
        src: `${SHARKEY('5')} · ${ETT('66')}`,
      },
    ],
  },
  {
    title: 'Biochemistry — proteins',
    icon: '🥚',
    entries: [
      {
        id: 'proteins',
        title: 'Albumin & globulin',
        sub: 'Production − loss, modified by hydration — read each fraction separately',
        sections: [
          { heading: '↑ Albumin', items: ['Dehydration only — the liver does not over-produce albumin'] },
          { heading: '↓ Albumin, globulin normal / high', items: ['Glomerular loss (PLN) — check UPC', 'Liver failure', 'Negative acute-phase response (inflammation)', 'Chronic starvation'] },
          { heading: '↓ Albumin AND ↓ globulin (panhypoproteinaemia)', items: ['Haemorrhage', 'Protein-losing enteropathy', 'Exudative skin loss (burns)', 'Third-space loss (effusions)', 'Haemodilution (fluids)'] },
          { heading: '↑ Globulin', items: ['Dehydration (with ↑ albumin)', 'Polyclonal — chronic inflammation / infection, FIP, ehrlichiosis, leishmaniosis', 'Monoclonal — multiple myeloma, lymphoma (rarely Ehrlichia, FIP, Leishmania) — confirm with electrophoresis'] },
          { heading: '↓ Globulin', items: ['Blood loss, PLE (with ↓ albumin)', 'Failure of passive transfer (neonates)', 'Congenital immunodeficiency (rare)'] },
        ],
        pearls: [
          'Refractometer total solids ≠ analyser total protein — lipaemia, glucose and urea all raise TS',
          'Low albumin lowers total calcium and total magnesium without changing the ionised fraction',
        ],
        src: SHARKEY('4'),
      },
    ],
  },
  {
    title: 'Biochemistry — glucose, lipids, pancreas',
    icon: '🍬',
    entries: [
      {
        id: 'glucose',
        title: 'Glucose',
        sub: 'Hyper- or hypoglycaemia',
        sections: [
          { heading: 'Hypoglycaemia — artefact first', items: ['Serum not separated within 30 min (cells consume glucose — worse with ↑ WBC / platelets)', 'Use fluoride tubes if delay unavoidable'] },
          { heading: 'Hypoglycaemia — true', items: ['Sepsis', 'Insulinoma (β-cell tumour)', 'Non-islet tumours — large hepatic / intra-abdominal (IGF-II)', 'Hepatic insufficiency / PSS', 'Juvenile (toy breeds), starvation', 'Hypoadrenocorticism', 'Insulin overdose, xylitol (dog)'] },
          { heading: 'Hyperglycaemia', items: ['Post-prandial (mild)', 'Stress (cats — can mimic diabetes and cause glucosuria)', 'Diabetes mellitus', 'Glucocorticoids, dextrose-containing fluids', 'HAC, acromegaly, hyperthyroidism', 'Drugs — α2-agonists (xylazine, dexmedetomidine)', 'Head trauma'] },
        ],
        pearls: [
          'Distinguish stress from diabetes with fructosamine and persistent glucosuria',
          'Portable glucometers read slightly low, most at high concentrations',
        ],
        related: ['DIS-MET-HYPOGLY', 'DIS-NEO-INSULINOMA', 'DIS-ENDO-DM'],
        src: SHARKEY('3'),
      },
      {
        id: 'lipids',
        title: 'Cholesterol & triglycerides',
        sub: 'Hyperlipidaemia — rule out a post-prandial sample first',
        sections: [
          { heading: '↑ Cholesterol', items: ['Post-prandial', 'Hypothyroidism, diabetes mellitus, HAC', 'Cholestasis', 'Pancreatitis', 'Nephrotic syndrome (PLN)', 'Drugs — steroids'] },
          { heading: '↓ Cholesterol (uncommon)', items: ['PLE / lymphangiectasia', 'Liver failure / PSS', 'Hypoadrenocorticism', 'Malnutrition'] },
          { heading: '↑ Triglycerides', items: ['Post-prandial (commonest)', 'Same endocrine / pancreatic causes as cholesterol', 'Idiopathic (Miniature Schnauzer)'] },
        ],
        pearls: ['Only triglycerides make serum milky — lipaemia interferes with many other assays'],
        src: SHARKEY('3'),
      },
      {
        id: 'amylase-lipase',
        title: 'Amylase & lipase',
        sub: 'Neither is sensitive or specific — use species-specific PLI',
        sections: [
          { heading: 'Increased', items: ['Pancreatitis', '↓ GFR — up to 2–3× upper RI with no pancreatic disease', 'Dexamethasone (lipase)', 'Intestinal or hepatic disease'] },
        ],
        pearls: [
          'Magnitude does not track histological severity',
          'Total amylase / lipase are poor tests in cats',
          'Values below the RI do NOT mean EPI — use TLI',
        ],
        related: ['DIS-SEC-PAN-DOG', 'DIS-GI-PANCAT'],
        src: SHARKEY('3'),
      },
    ],
  },
  {
    title: 'Biochemistry — electrolytes & acid–base',
    icon: '⚡',
    entries: [
      {
        id: 'sodium-chloride',
        title: 'Sodium & chloride',
        sub: 'Sodium is a statement about WATER balance',
        sections: [
          { heading: 'Hypernatraemia', items: ['Pure water loss — no access, hypodipsia, diabetes insipidus, panting', 'Hypotonic fluid loss — vomiting, diarrhoea, osmotic diuresis (DM), post-obstructive', 'Sodium gain — salt toxicosis (play dough), hypertonic saline, hyperaldosteronism'] },
          { heading: 'Hyponatraemia', items: ['Hypovolaemic — GI loss, hypoadrenocorticism, third-spacing (uroabdomen, effusions)', 'Hypervolaemic — CHF, liver failure, nephrotic syndrome, advanced CKD', 'Normovolaemic — SIADH, psychogenic polydipsia, diuretics', 'Pseudo — severe lipaemia / hyperproteinaemia (indirect ISE)', 'Dilutional — hyperglycaemia (correct Na for glucose)'] },
          { heading: 'Chloride', items: ['Proportional to Na → treat as a sodium (water) problem', 'Corrected Cl = Cl × (mid-RI Na ÷ patient Na)', 'Corrected hypochloraemia — gastric vomiting (pyloric obstruction) → metabolic alkalosis, loop diuretics', 'Corrected hyperchloraemia — normal-AG metabolic acidosis: diarrhoea, RTA, 0.9% NaCl', 'Potassium bromide reads as chloride on some analysers'] },
        ],
        pearls: ['Na:K ≤24 makes hypoadrenocorticism likely — but GI disease, effusions and AKI also lower it, so confirm with an ACTH stimulation test'],
        related: ['DIS-SEC-HYPO'],
        src: `${SHARKEY('7')} · ${ETT('67, 296')}`,
      },
      {
        id: 'potassium',
        title: 'Potassium',
        sub: 'RI ≈ 4.0–5.5 mmol/L — serum K is a poor index of body stores',
        thresholds: [
          ['Hypokalaemia', 'mild 3.0–4.0 · moderate 2.5–3.0 · severe <2.5 mmol/L'],
          ['Signs (hypo)', 'cats <3.5 · dogs <2.5 mmol/L'],
          ['Hyperkalaemia signs', 'usually >7.5–8.0 mmol/L'],
        ],
        sections: [
          { heading: 'Hyperkalaemia', items: ['↓ Excretion — urethral obstruction, uroabdomen, oliguric AKI, hypoadrenocorticism', 'Shift — acidosis (inorganic), DKA, tissue necrosis / tumour lysis, reperfusion', 'Iatrogenic — K-containing fluids, ACE inhibitors, spironolactone, trilostane, NSAIDs', 'GI — trichuriasis, salmonellosis (pseudo-Addison)', 'Pseudo — haemolysis in Akita / Shiba, marked thrombocytosis or leukocytosis, EDTA contamination'] },
          { heading: 'Hypokalaemia', items: ['Loss — vomiting, diarrhoea, CKD (cats), post-obstructive diuresis, loop diuretics, hyperaldosteronism', 'Reduced intake — anorexia, K-poor fluids', 'Shift — insulin + glucose (DKA treatment), alkalaemia, β-agonists', 'Burmese hypokalaemic periodic paralysis', 'Hypomagnesaemia makes it refractory'] },
        ],
        pearls: [
          'Hyperkalaemia: bradycardia, tall T, small / absent P, wide QRS — treat the heart first',
          'Hypokalaemia in cats: cervical ventroflexion, weakness, ↑ CK',
        ],
        related: ['DIS-SEC-HYPO', 'DIS-URO-URETHRAL-OBS', 'DIS-MET-HYPOK', 'DIS-NEU-HYPOKMYO'],
        src: `${SHARKEY('7')} · ${ETT('68')}`,
      },
      {
        id: 'bicarbonate-ag',
        title: 'Bicarbonate & anion gap',
        sub: 'AG = (Na + K) − (Cl + HCO₃)',
        sections: [
          { heading: '↓ HCO₃ (metabolic acidosis)', items: ['High AG — lactate, ketones (DKA), uraemic acids, ethylene glycol, salicylate', 'Normal AG (hyperchloraemic) — diarrhoea, RTA, 0.9% NaCl'] },
          { heading: '↑ HCO₃ (metabolic alkalosis)', items: ['H⁺ loss — gastric vomiting / pyloric obstruction', 'Loop / thiazide diuretics', 'Bicarbonate administration'] },
          { heading: '↑ AG', items: ['Endogenous acids — lactate, ketones, uraemia', 'Exogenous — ethylene glycol, salicylate', 'Hyperalbuminaemia (dehydration)'] },
          { heading: '↓ AG', items: ['Hypoalbuminaemia', 'Cationic gammopathy (myeloma)', 'Bromide therapy'] },
        ],
        pearls: [
          'Cl and HCO₃ normally move in opposite directions — if they do not, suspect a mixed disorder',
          'Respiratory disorders need a blood gas',
        ],
        related: ['DIS-ENDO-DM'],
        src: SHARKEY('7'),
      },
    ],
  },
  {
    title: 'Biochemistry — calcium, phosphorus, magnesium',
    icon: '🦴',
    entries: [
      {
        id: 'calcium-phosphorus',
        title: 'Calcium & phosphorus',
        sub: 'Read the pair together — the combination narrows the cause',
        sections: [
          { heading: '↑ Ca, normal / ↓ P', items: ['Hypercalcaemia of malignancy (PTHrP) — lymphoma, anal sac adenocarcinoma, SCC, myeloma', 'Primary hyperparathyroidism (↑ PTH)', 'Idiopathic hypercalcaemia (cat)'] },
          { heading: '↑ Ca, ↑ P', items: ['Kidney disease (cause or consequence)', 'Vitamin D toxicosis — rodenticides, calcipotriol cream, plants', 'Hypoadrenocorticism (usually mild, ionised Ca often normal)', 'Young growing dogs (bone growth)', 'Granulomatous disease (rare)'] },
          { heading: '↓ Ca, normal P', items: ['Hypoalbuminaemia — total only, ionised usually normal', 'Eclampsia / lactation', 'Acute pancreatitis', 'EDTA contamination (dramatic artefact)', 'Drugs — anticonvulsants, chelators'] },
          { heading: '↓ Ca, ↑ P', items: ['Kidney disease (renal secondary hyperparathyroidism)', 'Ethylene glycol (oxalate chelation)', 'Primary hypoparathyroidism', 'Tumour lysis'] },
          { heading: '↑ P, normal Ca', items: ['↓ GFR', 'Young animals (normal)', 'Haemolysis, tissue damage, tumour lysis', 'Hyperthyroidism (cat)'] },
          { heading: '↓ P', items: ['Insulin therapy / refeeding (DKA, lipidosis) — can cause haemolysis', 'Hyperparathyroidism, HHM', 'Malabsorption / anorexia'] },
        ],
        pearls: [
          'Confirm unexpected calcium on a fresh sample and measure ionised Ca before an expensive work-up',
          'Ionised Ca + PTH + PTHrP separates the main hypercalcaemia causes',
        ],
        related: ['DIS-ENDO-HCALC', 'DIS-ENDO-PHPT', 'DIS-ENDO-HYPOPTH', 'DIS-SEC-CKD'],
        src: `${SHARKEY('6')} · ${ETT('69')}`,
      },
      {
        id: 'magnesium',
        title: 'Magnesium',
        sub: 'Commonest electrolyte disorder in critically ill pets',
        sections: [
          { heading: '↓ Mg', items: ['Hypoproteinaemia (total only)', 'GI loss — PLE, chronic diarrhoea, pancreatitis', 'Renal loss — DKA, diuretics, post-obstructive diuresis, aminoglycosides', 'Shift — insulin, catecholamines, refeeding'] },
          { heading: '↑ Mg', items: ['↓ GFR — renal failure, urinary obstruction', 'Iatrogenic — Mg-containing fluids, antacids, cathartics'] },
        ],
        pearls: ['Low Mg makes hypokalaemia and hypocalcaemia refractory until it is corrected'],
        src: `${SHARKEY('6')} · ${ETT('68')}`,
      },
    ],
  },
]

/** Full AMA strings for the sources footer — copied from references/CITATIONS.md. */
export const INTERP_SOURCES = [
  'Côté E, Ettinger SJ, Feldman EC, eds. Ettinger\'s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024.',
  'Sharkey LC, Radin MJ. Manual of Veterinary Clinical Chemistry: A Case Study Approach. Teton NewMedia; 2010.',
  'Bisiaux T, da Costa JM, Martins RC, Barroso TG. Complete blood count interpretation in dogs and cats and its analytical compatibility with Vis-NIR point-of-care hematology: a systematic literature review with narrative synthesis. Vet J. 2026;320:106914. doi:10.1016/j.tvjl.2026.106914',
]
