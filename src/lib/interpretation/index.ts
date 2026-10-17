// ── Interpretation tab content ──────────────────────────────────────────────
// Bloodwork interpretation: one page per abnormal finding, in the same section
// order as a disease page. CBC (Ettinger Ch 57–59 + Bisiaux 2026) and serum
// biochemistry (Sharkey & Radin, *Manual of Veterinary Clinical Chemistry*,
// Ch 2–7, plus Ettinger Ch 28/66–69 where the manual is thin). Physical-exam
// findings (BP, heart rate, temperature…) live in the Clinical / Diagnostic tabs
// as signs, not here. Treatment doses are Ettinger's — verify against a current
// formulary before use.
//
// Plain text only — no authored HTML, so nothing here goes through RichText.
// `related` holds DIS-/PROT- ids; interpretation.test.ts fails on a dead one.
// Reference intervals are analyser-specific: thresholds here are the textbook's
// and every card says "below/above the RI" rather than inventing one.

export interface InterpSection {
  heading: string
  items: string[]
}

/** One bloodwork finding, laid out like a disease page: each optional field is
 *  one section of the shared ClinicalSections stack (Etiology → Pathophysiology
 *  → Diagnostic Investigation → Treatment → Monitoring → Pearls). */
export interface InterpEntry {
  id: string
  title: string
  /** One line under the title — the definition or the threshold. */
  sub: string
  /** Label → value rows, shown as a "Definition & Thresholds" card. */
  thresholds?: [string, string][]
  /** Causes, grouped by mechanism — rendered as `#Header` groups. */
  etiology: InterpSection[]
  path?: string[]
  /** What to do next to find the cause. */
  dx?: string[]
  tx1?: string[]
  tx2?: string[]
  monitor?: string[]
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
        etiology: [
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
        dx: [
          'Classify the pattern first: anaemia (regenerative?), leukogram (inflammatory, stress, leukopenic), platelets',
          'Narrow with signalment, history and exam — the pattern alone rarely names the disease',
          'Review a blood smear whenever morphology, atypical cells or an implausible count could change the call',
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
        etiology: [
          { heading: 'Regenerative — haemorrhage', items: ['Low total protein (albumin + globulin)', 'External chronic loss → iron deficiency (microcytic hypochromic)'] },
          { heading: 'Regenerative — haemolysis', items: ['Normal / high protein, ↑ bilirubin', 'IMHA — spherocytes, autoagglutination', 'Oxidant — Heinz bodies, eccentrocytes (onion, zinc, paracetamol in cats)', 'Infectious — Babesia, Mycoplasma haemofelis (cat)', 'Fragmentation — schistocytes (DIC, vasculitis, HSA)', 'Intravascular → haemoglobinaemia + haemoglobinuria'] },
          { heading: 'Non-regenerative', items: ['Normocytic normochromic, mild — inflammation, CKD, endocrine (hypothyroid, hypoadrenocorticism), neoplasia', 'Normocytic, severe — precursor-targeted IMHA, FeLV, leukaemia, marrow aplasia', 'Microcytic hypochromic — iron deficiency, portosystemic shunt', 'Macrocytic — FeLV (cat), poodle macrocytosis'] },
        ],
        path: [
          'Blood loss or destruction (regenerative) vs reduced production (non-regenerative)',
          'The marrow needs 3–5 days to respond — earlier, any anaemia looks non-regenerative',
        ],
        dx: [
          'How acute? Under 3–5 days = pre-regenerative',
          'Regenerative? Absolute reticulocyte count above the RI (± marked polychromasia)',
          'Smear — spherocytes, agglutination, Heinz bodies, schistocytes, parasites',
          'Total protein — low with haemorrhage, normal / high with haemolysis',
          'Then targeted tests: saline agglutination / Coombs, vector-borne PCR, imaging for bleeding, marrow aspirate if non-regenerative and unexplained',
        ],
        tx1: [
          'Transfuse for clinical signs (tachycardia, weakness) or roughly PCV <20% (dog) / <15% (cat)',
          'Blood-type every cat before any transfusion',
          'Treat the cause — stop the bleeding, immunosuppress IMHA, treat infection',
        ],
        monitor: [
          'PCV / TS daily while unstable',
          'Reticulocyte count to confirm a regenerative response',
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
        etiology: [
          { heading: 'Relative', items: ['Dehydration — total protein also high', 'Splenic contraction (excitement) — transient'] },
          { heading: 'Absolute — appropriate (hypoxic)', items: ['Right-to-left shunt (reverse PDA, tetralogy)', 'Chronic respiratory disease', 'High altitude'] },
          { heading: 'Absolute — inappropriate', items: ['Renal tumour or other renal disease (EPO)', 'Other paraneoplastic EPO'] },
          { heading: 'Primary', items: ['Polycythaemia vera — diagnosis of exclusion'] },
        ],
        dx: [
          'Repeat once rehydrated — relative erythrocytosis resolves',
          'SpO₂ / arterial blood gas for hypoxaemia',
          'Echocardiography (bubble study) for right-to-left shunt',
          'Renal ultrasound ± EPO concentration',
        ],
        tx1: [
          'Phlebotomy for hyperviscosity signs — with crystalloid replacement',
          'Treat the hypoxic or renal cause',
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
        etiology: [
          { heading: 'Stress (glucocorticoid)', items: ['Mature neutrophilia', 'Lymphopenia', 'Eosinopenia', '± Monocytosis (dog)', 'Cats: lymphopenia is the most consistent change · monocytosis often absent, even with sustained steroid exposure', 'Causes — illness, pain, HAC, steroid therapy'] },
          { heading: 'Excitement (catecholamine)', items: ['Mild mature neutrophilia + lymphocytosis', 'Mostly young cats · transient (minutes)', 'Should not exceed 2× the upper RI or show a left shift'] },
          { heading: 'Inflammatory', items: ['Neutrophilia with left shift (bands)', 'Toxic change — Döhle bodies, basophilic foamy cytoplasm', 'Degenerative left shift (bands > mature, or neutropenia + bands) = overwhelming demand, worse prognosis'] },
        ],
        dx: [
          'Read the absolute counts, not percentages',
          'Check the smear for bands and toxic change before calling it stress',
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
        etiology: [
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
        etiology: [
          { heading: 'Physiological', items: ['Glucocorticoid (stress, HAC, steroids)', 'Catecholamine (fear, exercise)'] },
          { heading: 'Inflammatory', items: ['Infection — bacterial, fungal, protozoal', 'Necrosis — haemolysis, ischaemia, burns, neoplasia', 'Sterile — pancreatitis, FIP, immune-mediated disease (IMHA, IMPA)'] },
          { heading: 'Severe (>50 × 10⁹/L)', items: ['Infection — 34–58% of cases (pyometra, abscess, pyothorax, Hepatozoon, Babesia)', 'Immune-mediated — 11–32% (IMHA)', 'Neoplasia — 14–23% (incl. paraneoplastic, leukaemia)', 'Tissue necrosis — 10–18%'] },
        ],
        dx: [
          'Left shift or toxic change → look for a septic focus (imaging, effusion, urine culture)',
          'Mature neutrophilia with lymphopenia and eosinopenia → stress — interpret with the patient',
          'Very high counts (>50 × 10⁹/L) → pyometra, abscess, IMHA, neoplasia',
        ],
        src: ETT('58'),
      },
      {
        id: 'neutropenia',
        title: 'Neutropenia',
        sub: 'Mild 1.5–3 · moderate 0.5–1.5 · severe <0.5 × 10⁹/L',
        etiology: [
          { heading: 'Consumption', items: ['Overwhelming inflammation — sepsis, peritonitis, parvovirus enteritis', 'Immune-mediated destruction'] },
          { heading: 'Reduced production', items: ['Infection — parvovirus (dog), FeLV / FIV, panleukopenia (cat), Ehrlichia', 'Drugs — chemotherapy, chloramphenicol, azathioprine, phenobarbital, methimazole, sulfonamides', 'Oestrogen toxicosis', 'Marrow disease — myelophthisis, leukaemia, myelofibrosis'] },
          { heading: 'Other', items: ['Cyclic haematopoiesis (grey Collie)', 'Chronic idiopathic neutropenia (cat) — mild, healthy, retrovirus-negative'] },
        ],
        dx: [
          'Repeat with a smear — confirm and look for left shift / toxic change',
          'Parvovirus antigen (dog) · FeLV / FIV (cat) · vector-borne PCR',
          'Drug history',
          'Persistent unexplained neutropenia → bone marrow aspirate',
        ],
        tx1: [
          'Febrile and severely neutropenic (<0.5 × 10⁹/L) = emergency — IV broad-spectrum bactericidal antibiotics',
          'Stop marrow-suppressive drugs',
          'Treat the cause (parvovirus supportive care, immunosuppression for immune-mediated neutropenia)',
        ],
        monitor: [
          'Neutrophil count and temperature daily while <1.0 × 10⁹/L',
        ],
        pearls: ['<0.5 × 10⁹/L carries a real risk of sepsis — treat a febrile patient as an emergency'],
        related: ['DIS-IMNP'],
        src: ETT('58'),
      },
      {
        id: 'other-leukocytes',
        title: 'Lymphocytes, eosinophils, monocytes',
        sub: 'The other lines of the differential',
        etiology: [
          { heading: 'Lymphocytosis', items: ['Excitement (cat)', 'Chronic antigenic stimulation — ehrlichiosis, Babesia, fungal', 'Hypoadrenocorticism', 'Recent vaccination', 'Lymphoma (leukaemic) / lymphoid leukaemia'] },
          { heading: 'Lymphopenia', items: ['Stress / steroids / HAC', 'Lymph loss — chylothorax, PLE / lymphangiectasia', 'Acute viral infection, endotoxaemia', 'Immunosuppressive drugs'] },
          { heading: 'Eosinophilia', items: ['Parasites — fleas, heartworm, lungworm, GI', 'Hypersensitivity — atopy, feline asthma', 'Eosinophilic diseases (gastroenteritis, bronchopneumopathy, panosteitis)', 'Paraneoplastic — mast cell tumour, lymphoma', 'Hypoadrenocorticism', 'Hypereosinophilic syndrome (cat)'] },
          { heading: 'Monocytosis', items: ['Inflammation (acute or chronic), necrosis', 'Glucocorticoid (dog)', 'Immune-mediated neutropenia', 'Monocytic leukaemia'] },
        ],
        dx: [
          'Eosinophilia → faecal exam, heartworm test, flea control trial, skin and airway cytology',
          'Lymphocytosis with atypical cells or persistent >2–3× RI → flow cytometry / clonality (PARR)',
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
        etiology: [
          { heading: 'Pseudo', items: ['Clumping (especially cats) — check the feathered edge', 'CKCS and other breeds — inherited macrothrombocytopenia, no bleeding'] },
          { heading: 'Destruction', items: ['Primary ITP', 'Secondary immune — infection, neoplasia, drugs, vaccination'] },
          { heading: 'Consumption / sequestration', items: ['DIC', 'Vasculitis', 'Splenic disease — HSA, lymphoma, torsion', 'Severe haemorrhage'] },
          { heading: 'Reduced production', items: ['Infection — Ehrlichia, Anaplasma, FeLV / FIV, parvovirus', 'Drugs — chemotherapy, oestrogens, sulfonamides, methimazole', 'Marrow infiltration — leukaemia, lymphoma, myeloma'] },
          { heading: 'Dilutional', items: ['Massive transfusion (>1 blood volume / 24 h)'] },
        ],
        path: [
          'Destruction, consumption, sequestration, reduced production — or a pseudo-count from clumping',
        ],
        dx: [
          'Smear estimate and feathered edge for clumps before anything else',
          'PT / aPTT, D-dimers — DIC',
          'Vector-borne serology / PCR',
          'Imaging for neoplasia, splenic disease',
          'Bone marrow aspirate if production failure is suspected',
        ],
        tx1: [
          'Treat the cause · stop suspect drugs',
          'Primary ITP: immunosuppression is the cornerstone',
          'Add doxycycline while vector-borne screening is pending, depending on geography',
        ],
        tx2: [
          'Platelet transfusion only for life-threatening bleeding (CNS, lung) or surgery — transfused platelets are destroyed rapidly in ITP',
        ],
        monitor: [
          'Platelet count every 1–3 days until rising',
        ],
        pearls: ['Petechiae / mucosal bleeding with a normal count → platelet function or vWD (BMBT)'],
        related: ['DIS-BD-TCP', 'DIS-BD-EHRL', 'DIS-BD-ICT', 'DIS-BD-TPATH'],
        src: ETT('29, 59'),
      },
      {
        id: 'thrombocytosis',
        title: 'Thrombocytosis',
        sub: 'Platelets above the RI',
        etiology: [
          { heading: 'Reactive (common)', items: ['Iron deficiency / chronic blood loss', 'Inflammation, infection', 'Neoplasia', 'Tissue necrosis', 'Steroids / HAC · post-splenectomy'] },
          { heading: 'Primary', items: ['Essential thrombocythaemia — rare, usually >900 × 10⁹/L'] },
        ],
        dx: [
          'Look for iron deficiency (microcytosis, low iron) and chronic blood loss',
          'Repeat after the inflammatory process resolves',
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
        etiology: [
          { heading: 'Hepatocellular damage', items: ['↑ ALT (± AST) — leakage enzymes', 'Toxins, drugs, hepatitis, hypoxia, neoplasia, lipidosis'] },
          { heading: 'Cholestasis / induction', items: ['↑ ALP, GGT (± bilirubin)', 'Biliary obstruction, cholangitis, mucocele, pancreatitis'] },
          { heading: 'Extrahepatic causes — rule out first', items: ['Corticosteroids (dog): ALP, GGT, ALT, AST', 'Anticonvulsants (phenobarbital): ALT, ALP, GGT', 'Hyperadrenocorticism: ALP ≫ ALT, GGT', 'Hyperthyroidism (cat): ALP, ALT', 'Diabetes mellitus, hypothyroidism (dog): ALP', 'Hypoxia / hypotension: ALT, ALP, AST', 'Muscle damage: AST, ALT if severe — check CK', 'Bone growth / remodelling: bone ALP (young dogs, osteosarcoma)', 'Enteritis, pancreatitis, sepsis'] },
          { heading: 'Decreased function', items: ['↑ bile acids, ↑ ammonia, ↑ bilirubin', '↓ albumin, ↓ urea, ↓ cholesterol, ↓ glucose', 'Prolonged PT / aPTT'] },
        ],
        path: [
          'ALT / AST leak from damaged hepatocytes',
          'ALP / GGT are induced by cholestasis, steroids and anticonvulsants',
          'None of them measures liver function',
        ],
        dx: [
          'Rule out the extrahepatic causes above first — drugs, endocrine disease, hypoxia',
          'Function: pre- and post-prandial bile acids, ammonia',
          'Abdominal ultrasound',
          'Coagulation profile before any biopsy',
          'FNA cytology or biopsy for a specific diagnosis',
        ],
        tx1: [
          'Treat the cause · stop hepatotoxic drugs',
          'Specific therapy follows the biopsy diagnosis',
        ],
        monitor: [
          'Recheck enzymes in 2–4 weeks · a fall can mean recovery OR loss of hepatocytes',
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
        etiology: [
          { heading: 'Pre-hepatic (haemolysis)', items: ['Anaemia (usually regenerative) — check PCV first', 'IMHA, Mycoplasma, Babesia, Heinz body anaemia, hypophosphataemia'] },
          { heading: 'Hepatic', items: ['Marked ↑ ALT / AST, abnormal function tests', 'Hepatitis, leptospirosis, FIP, toxins (xylitol, sago palm, Amanita), drugs, lipidosis', 'Sepsis in cats — usually mild'] },
          { heading: 'Post-hepatic', items: ['Marked ↑ ALP / GGT, ↑ cholesterol', 'Mucocele, cholelithiasis, pancreatitis, neoplasia, duodenal FB', 'Complete obstruction → acholic faeces'] },
        ],
        dx: [
          'PCV first — anaemic = probably pre-hepatic',
          'Liver enzymes and bile acids — hepatic',
          'Ultrasound for biliary obstruction — post-hepatic',
          'Urine: bilirubinuria is normal in small amounts in male dogs, never in cats',
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
        etiology: [
          { heading: 'Pre-renal', items: ['Dehydration, hypovolaemia, haemorrhage', 'Low cardiac output, shock, sepsis', 'Hypoadrenocorticism (USG can be low — Na loss washes out the medulla)'] },
          { heading: 'Renal', items: ['AKI — toxins (ethylene glycol, lilies in cats, NSAIDs), leptospirosis, pyelonephritis, ischaemia', 'CKD'] },
          { heading: 'Post-renal', items: ['Urethral / bilateral ureteral obstruction', 'Uroabdomen', 'Partial obstruction can still pass small volumes'] },
          { heading: 'Urea alone ↑', items: ['High-protein meal', 'GI haemorrhage', 'Catabolism, fever, steroids'] },
          { heading: 'Urea ↓', items: ['Liver failure / PSS', 'Low-protein diet', 'Polyuria (diuresis)'] },
          { heading: 'Creatinine ↓ / unreliable', items: ['Low muscle mass — creatinine underestimates loss of function in thin patients'] },
        ],
        path: [
          'Urea and creatinine rise when GFR falls — before renal, renal, or after the kidney',
        ],
        dx: [
          'USG on a sample taken BEFORE fluids',
          'Urinalysis + sediment, UPC, urine culture',
          'Palpate the bladder · imaging for obstruction or uroabdomen',
          'Electrolytes — hyperkalaemia with obstruction, AKI or hypoadrenocorticism',
          'Stable chronic disease → IRIS stage with creatinine + SDMA, then UPC and BP',
        ],
        tx1: [
          'Pre-renal: correct the volume deficit',
          'Post-renal: relieve the obstruction or divert the urine',
          'Renal: IV fluids, stop nephrotoxins, treat the cause (leptospirosis, pyelonephritis, ethylene glycol)',
        ],
        monitor: [
          'Creatinine, electrolytes, body weight and urine output daily while on IV fluids',
          'Weight gain >10% = fluid overload (Ettinger Ch 120)',
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
        etiology: [
          { heading: '↑ Albumin', items: ['Dehydration only — the liver does not over-produce albumin'] },
          { heading: '↓ Albumin, globulin normal / high', items: ['Glomerular loss (PLN) — check UPC', 'Liver failure', 'Negative acute-phase response (inflammation)', 'Chronic starvation'] },
          { heading: '↓ Albumin AND ↓ globulin (panhypoproteinaemia)', items: ['Haemorrhage', 'Protein-losing enteropathy', 'Exudative skin loss (burns)', 'Third-space loss (effusions)', 'Haemodilution (fluids)'] },
          { heading: '↑ Globulin', items: ['Dehydration (with ↑ albumin)', 'Polyclonal — chronic inflammation / infection, FIP, ehrlichiosis, leishmaniosis', 'Monoclonal — multiple myeloma, lymphoma (rarely Ehrlichia, FIP, Leishmania) — confirm with electrophoresis'] },
          { heading: '↓ Globulin', items: ['Blood loss, PLE (with ↓ albumin)', 'Failure of passive transfer (neonates)', 'Congenital immunodeficiency (rare)'] },
        ],
        dx: [
          'UPC — glomerular loss',
          'Bile acids — liver failure',
          'Faecal / GI work-up, cobalamin — protein-losing enteropathy',
          'Serum protein electrophoresis for marked hyperglobulinaemia',
          'Vector-borne and FIP testing for polyclonal gammopathy',
        ],
        tx2: [
          'Plasma for albumin replacement: ~22.5 mL/kg raises albumin by about 0.5 g/dL (Ettinger Ch 120)',
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
        etiology: [
          { heading: 'Hypoglycaemia — artefact first', items: ['Serum not separated within 30 min (cells consume glucose — worse with ↑ WBC / platelets)', 'Use fluoride tubes if delay unavoidable'] },
          { heading: 'Hypoglycaemia — true', items: ['Sepsis', 'Insulinoma (β-cell tumour)', 'Non-islet tumours — large hepatic / intra-abdominal (IGF-II)', 'Hepatic insufficiency / PSS', 'Juvenile (toy breeds), starvation', 'Hypoadrenocorticism', 'Insulin overdose, xylitol (dog)'] },
          { heading: 'Hyperglycaemia', items: ['Post-prandial (mild)', 'Stress (cats — can mimic diabetes and cause glucosuria)', 'Diabetes mellitus', 'Glucocorticoids, dextrose-containing fluids', 'HAC, acromegaly, hyperthyroidism', 'Drugs — α2-agonists (xylazine, dexmedetomidine)', 'Head trauma'] },
        ],
        dx: [
          'Repeat on a fresh, promptly separated sample',
          'Hypoglycaemia: insulin:glucose pair while hypoglycaemic, bile acids, imaging for a mass, blood culture',
          'Hyperglycaemia: fructosamine, urinalysis for glucose and ketones',
        ],
        tx1: [
          'Clinical hypoglycaemia: dextrose 0.25–0.5 g/kg IV (Ettinger Ch 125) — e.g. 50% dextrose 0.5–1 mL/kg diluted 1:3 — then a 2.5–5% dextrose CRI',
          'Feed as soon as it is safe',
          'Diabetic ketoacidosis → see the DKA protocol',
        ],
        monitor: [
          'Glucose every 1–2 h after a hypoglycaemic crisis',
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
        etiology: [
          { heading: '↑ Cholesterol', items: ['Post-prandial', 'Hypothyroidism, diabetes mellitus, HAC', 'Cholestasis', 'Pancreatitis', 'Nephrotic syndrome (PLN)', 'Drugs — steroids'] },
          { heading: '↓ Cholesterol (uncommon)', items: ['PLE / lymphangiectasia', 'Liver failure / PSS', 'Hypoadrenocorticism', 'Malnutrition'] },
          { heading: '↑ Triglycerides', items: ['Post-prandial (commonest)', 'Same endocrine / pancreatic causes as cholesterol', 'Idiopathic (Miniature Schnauzer)'] },
        ],
        dx: [
          'Repeat after a 12-hour fast',
          'Total T4 / TSH, glucose, HAC testing, UPC',
        ],
        pearls: ['Only triglycerides make serum milky — lipaemia interferes with many other assays'],
        src: SHARKEY('3'),
      },
      {
        id: 'amylase-lipase',
        title: 'Amylase & lipase',
        sub: 'Neither is sensitive or specific — use species-specific PLI',
        etiology: [
          { heading: 'Increased', items: ['Pancreatitis', '↓ GFR — up to 2–3× upper RI with no pancreatic disease', 'Dexamethasone (lipase)', 'Intestinal or hepatic disease'] },
        ],
        dx: [
          'Spec cPL / fPL',
          'Abdominal ultrasound',
          'Interpret against creatinine — reduced GFR raises both',
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
        etiology: [
          { heading: 'Hypernatraemia', items: ['Pure water loss — no access, hypodipsia, diabetes insipidus, panting', 'Hypotonic fluid loss — vomiting, diarrhoea, osmotic diuresis (DM), post-obstructive', 'Sodium gain — salt toxicosis (play dough), hypertonic saline, hyperaldosteronism'] },
          { heading: 'Hyponatraemia', items: ['Hypovolaemic — GI loss, hypoadrenocorticism, third-spacing (uroabdomen, effusions)', 'Hypervolaemic — CHF, liver failure, nephrotic syndrome, advanced CKD', 'Normovolaemic — SIADH, psychogenic polydipsia, diuretics', 'Pseudo — severe lipaemia / hyperproteinaemia (indirect ISE)', 'Dilutional — hyperglycaemia (correct Na for glucose)'] },
          { heading: 'Chloride', items: ['Proportional to Na → treat as a sodium (water) problem', 'Corrected Cl = Cl × (mid-RI Na ÷ patient Na)', 'Corrected hypochloraemia — gastric vomiting (pyloric obstruction) → metabolic alkalosis, loop diuretics', 'Corrected hyperchloraemia — normal-AG metabolic acidosis: diarrhoea, RTA, 0.9% NaCl', 'Potassium bromide reads as chloride on some analysers'] },
        ],
        path: [
          'Sodium concentration reflects water balance more than total body sodium',
        ],
        dx: [
          'Assess hydration and volume status first — it sorts the causes',
          'Correct sodium for glucose, check lipaemia',
          'Urine sodium, USG',
          'ACTH stimulation test when hyponatraemia comes with hyperkalaemia',
        ],
        tx1: [
          'Treat the cause and the volume status',
          'Hyponatraemia: correct no faster than 8–12 mmol/L per 24 h (Ettinger Ch 296)',
          'Chronic hypernatraemia: lower slowly — rapid correction causes cerebral oedema (Ettinger Ch 67)',
        ],
        monitor: [
          'Sodium every 2–6 h while correcting (Ettinger Ch 296)',
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
        etiology: [
          { heading: 'Hyperkalaemia', items: ['↓ Excretion — urethral obstruction, uroabdomen, oliguric AKI, hypoadrenocorticism', 'Shift — acidosis (inorganic), DKA, tissue necrosis / tumour lysis, reperfusion', 'Iatrogenic — K-containing fluids, ACE inhibitors, spironolactone, trilostane, NSAIDs', 'GI — trichuriasis, salmonellosis (pseudo-Addison)', 'Pseudo — haemolysis in Akita / Shiba, marked thrombocytosis or leukocytosis, EDTA contamination'] },
          { heading: 'Hypokalaemia', items: ['Loss — vomiting, diarrhoea, CKD (cats), post-obstructive diuresis, loop diuretics, hyperaldosteronism', 'Reduced intake — anorexia, K-poor fluids', 'Shift — insulin + glucose (DKA treatment), alkalaemia, β-agonists', 'Burmese hypokalaemic periodic paralysis', 'Hypomagnesaemia makes it refractory'] },
        ],
        dx: [
          'ECG for hyperkalaemia',
          'Rule out pseudohyperkalaemia — haemolysis (Akita, Shiba), thrombocytosis',
          'Palpate the bladder, creatinine, ACTH stimulation test',
          'Hypokalaemia: FEK — >6% means renal loss',
        ],
        tx1: [
          'Hyperkalaemia: 10% calcium gluconate 0.5–1 mL/kg IV to effect with ECG — protects the heart for ~20–30 min, does not lower K⁺',
          'Then regular insulin 0.5 U/kg IV + 1–2 g dextrose per unit, and remove the cause (Ettinger Ch 300)',
          'Hypokalaemia: add KCl to fluids by serum K⁺ — never exceed 0.5 mEq/kg/h (Ettinger Ch 120)',
        ],
        tx2: [
          'Correct magnesium in refractory hypokalaemia',
        ],
        monitor: [
          'K⁺ every 2–6 h while correcting · glucose after insulin',
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
        etiology: [
          { heading: '↓ HCO₃ (metabolic acidosis)', items: ['High AG — lactate, ketones (DKA), uraemic acids, ethylene glycol, salicylate', 'Normal AG (hyperchloraemic) — diarrhoea, RTA, 0.9% NaCl'] },
          { heading: '↑ HCO₃ (metabolic alkalosis)', items: ['H⁺ loss — gastric vomiting / pyloric obstruction', 'Loop / thiazide diuretics', 'Bicarbonate administration'] },
          { heading: '↑ AG', items: ['Endogenous acids — lactate, ketones, uraemia', 'Exogenous — ethylene glycol, salicylate', 'Hyperalbuminaemia (dehydration)'] },
          { heading: '↓ AG', items: ['Hypoalbuminaemia', 'Cationic gammopathy (myeloma)', 'Bromide therapy'] },
        ],
        dx: [
          'Blood gas for respiratory component and pH',
          'Lactate, ketones, creatinine, ethylene glycol test for a high anion gap',
        ],
        tx1: [
          'Treat the cause — fluids for lactic acidosis, insulin for DKA',
          'Bicarbonate is not a stand-alone treatment for hyperkalaemia (Ettinger Ch 300)',
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
        etiology: [
          { heading: '↑ Ca, normal / ↓ P', items: ['Hypercalcaemia of malignancy (PTHrP) — lymphoma, anal sac adenocarcinoma, SCC, myeloma', 'Primary hyperparathyroidism (↑ PTH)', 'Idiopathic hypercalcaemia (cat)'] },
          { heading: '↑ Ca, ↑ P', items: ['Kidney disease (cause or consequence)', 'Vitamin D toxicosis — rodenticides, calcipotriol cream, plants', 'Hypoadrenocorticism (usually mild, ionised Ca often normal)', 'Young growing dogs (bone growth)', 'Granulomatous disease (rare)'] },
          { heading: '↓ Ca, normal P', items: ['Hypoalbuminaemia — total only, ionised usually normal', 'Eclampsia / lactation', 'Acute pancreatitis', 'EDTA contamination (dramatic artefact)', 'Drugs — anticonvulsants, chelators'] },
          { heading: '↓ Ca, ↑ P', items: ['Kidney disease (renal secondary hyperparathyroidism)', 'Ethylene glycol (oxalate chelation)', 'Primary hypoparathyroidism', 'Tumour lysis'] },
          { heading: '↑ P, normal Ca', items: ['↓ GFR', 'Young animals (normal)', 'Haemolysis, tissue damage, tumour lysis', 'Hyperthyroidism (cat)'] },
          { heading: '↓ P', items: ['Insulin therapy / refeeding (DKA, lipidosis) — can cause haemolysis', 'Hyperparathyroidism, HHM', 'Malabsorption / anorexia'] },
        ],
        path: [
          'PTH, PTHrP and vitamin D set calcium · the kidney sets phosphorus',
        ],
        dx: [
          'Ionised calcium on a fresh sample',
          'PTH + PTHrP (± vitamin D metabolites) together',
          'Thoracic radiographs, abdominal ultrasound, lymph-node and rectal exam (anal sac) for occult neoplasia',
          'Creatinine and USG — kidney as cause or consequence',
        ],
        tx1: [
          'Hypercalcaemia: 0.9% NaCl 5–10 mL/kg/h, then furosemide 2 mg/kg once rehydrated (Ettinger Ch 283)',
          'Bisphosphonate: pamidronate 1.3–2 mg/kg IV in 150 mL saline over 2 h',
          'No steroids before lymphoma is ruled out — they mask the diagnosis',
        ],
        tx2: [
          'Salmon calcitonin 4 IU/kg IV for emergencies — short-lived',
          'Clinical hypocalcaemia: 10% calcium gluconate slowly IV to effect, with ECG monitoring',
        ],
        monitor: [
          'Ionised calcium daily during treatment',
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
        etiology: [
          { heading: '↓ Mg', items: ['Hypoproteinaemia (total only)', 'GI loss — PLE, chronic diarrhoea, pancreatitis', 'Renal loss — DKA, diuretics, post-obstructive diuresis, aminoglycosides', 'Shift — insulin, catecholamines, refeeding'] },
          { heading: '↑ Mg', items: ['↓ GFR — renal failure, urinary obstruction', 'Iatrogenic — Mg-containing fluids, antacids, cathartics'] },
        ],
        tx1: [
          'Correct it before chasing refractory hypokalaemia or hypocalcaemia',
        ],
        pearls: ['Low Mg makes hypokalaemia and hypocalcaemia refractory until it is corrected'],
        src: `${SHARKEY('6')} · ${ETT('68')}`,
      },
    ],
  },
]

/** Entry lookup for the `interp` view — URL decode, notes keys, the detail page. */
export const INTERP_BY_ID = new Map(BLOODWORK.flatMap(g => g.entries).map(e => [e.id, e]))

/** Full AMA strings for the sources footer — copied from references/CITATIONS.md. */
export const INTERP_SOURCES = [
  'Côté E, Ettinger SJ, Feldman EC, eds. Ettinger\'s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024.',
  'Sharkey LC, Radin MJ. Manual of Veterinary Clinical Chemistry: A Case Study Approach. Teton NewMedia; 2010.',
  'Bisiaux T, da Costa JM, Martins RC, Barroso TG. Complete blood count interpretation in dogs and cats and its analytical compatibility with Vis-NIR point-of-care hematology: a systematic literature review with narrative synthesis. Vet J. 2026;320:106914. doi:10.1016/j.tvjl.2026.106914',
]
