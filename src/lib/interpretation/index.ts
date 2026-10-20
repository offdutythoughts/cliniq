// ── Interpretation tab content ──────────────────────────────────────────────
// Bloodwork interpretation: one page per abnormal finding, in the same section
// order as a disease page. eClinPath (Cornell) is the primary haematology and
// chemistry reference. CBC (eClinPath, Ettinger Ch 57–59, Bisiaux 2026) and serum
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

export interface InterpTable {
  headers: string[]
  rows: string[][]
  /** Unit / footnote under the table. */
  note?: string
}

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
  /** Shown as a table in the "Definition & Thresholds" card — severity
   *  grades as columns where the finding is graded. */
  thresholds?: InterpTable
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

/** One cell type on one page, its findings as in-page tabs (Neutrophils →
 *  Neutrophilia · Neutropenia · Left shift). A bare InterpEntry in a group is a
 *  one-finding page — the biochemistry analytes. */
export interface InterpPage {
  id: string
  title: string
  /** One line on the list card. */
  sub: string
  parts: InterpEntry[]
}

export interface InterpGroup {
  title: string
  icon: string
  entries: (InterpEntry | InterpPage)[]
}

const ETT = (ch: string) => `Ettinger 9th edn, Ch ${ch}`
const SHARKEY = (ch: string) => `Sharkey & Radin 2010, Ch ${ch}`
// Systematic review (PRISMA 2020, 49 studies, 2015–Jan 2026) of CBC-only
// interpretation; open access, CC BY. Table 2 → the pattern card, Table 1 →
// the ratio card. Two of its authors develop the VetPAT Vis-NIR analyser — the
// review discloses this, and the point-of-care pearl says so.
const BISIAUX = 'Bisiaux et al., Vet J 2026 (systematic review, 49 studies)'
// eClinPath (Cornell University) — the primary haematology / chemistry reference
// from 2026-10-18. Paraphrased, never copied (CC licence: educational, not for
// monetary gain); page-level citations in references/CITATIONS.md.
const ECP = (page: string) => `eClinPath (Cornell): ${page}`

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
    ],
  },
  {
    title: 'Red blood cells',
    icon: '🩸',
    entries: [
      {
        id: 'red-cell-mass',
        title: 'Red cell mass',
        sub: 'PCV / HCT below or above the RI',
        parts: [
          {
            id: 'anaemia',
            title: 'Anaemia',
            sub: 'PCV / HCT / Hb below the RI — first decide: regenerative or not?',
            etiology: [
              { heading: 'Regenerative — haemorrhage', items: ['Low total protein (albumin + globulin)', 'External chronic loss → iron deficiency (microcytic hypochromic)'] },
              { heading: 'Regenerative — haemolysis', items: ['Normal / high protein, ↑ bilirubin', 'IMHA — spherocytes, agglutination, ghost cells', 'Oxidant — Heinz bodies, eccentrocytes (onion, zinc, paracetamol in cats)', 'Infectious — Babesia, Mycoplasma haemofelis (cat)', 'Fragmentation — schistocytes, acanthocytes, keratocytes (DIC, vasculitis, HSA)', 'Intravascular → haemoglobinaemia + haemoglobinuria'] },
              { heading: 'Non-regenerative', items: ['Normocytic normochromic, mild — inflammation, CKD, endocrine (hypothyroid, hypoadrenocorticism), neoplasia', 'Normocytic, severe — precursor-targeted IMHA, FeLV, leukaemia, marrow aplasia', 'Microcytic hypochromic — iron deficiency, portosystemic shunt', 'Macrocytic — FeLV (cat), poodle macrocytosis'] },
            ],
            path: [
              'Blood loss or destruction (regenerative) vs reduced production (non-regenerative)',
              'The marrow needs 3–5 days to respond — earlier, any anaemia looks non-regenerative',
            ],
            dx: [
              'How acute? Under 3–5 days = pre-regenerative',
              'Regenerative? Absolute reticulocyte count above the RI (± marked polychromasia)',
              'Absolute reticulocytes (10³/µL) = reticulocyte % × RBC count (10⁶/µL) × 10 (eClinPath)',
              'Corrected reticulocyte % = retic % × (patient HCT ÷ normal HCT; 45 dog, 35 cat) · regenerative if >1% (dog) or >0.4% (cat) (eClinPath)',
              'Cats: count AGGREGATE reticulocytes only — punctate forms persist up to 3 weeks and reflect an older response',
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
              'nRBC, Howell-Jolly bodies and basophilic stippling do NOT prove regeneration on their own — reticulocytes / polychromasia do (eClinPath)',
              'Greyhounds run high — an HCT of 45% can be anaemia in this breed',
              'Pancytopenia or unexplained severe non-regenerative anaemia → bone marrow aspirate',
            ],
            related: ['DIS-BD-IMHA', 'DIS-BD-NRA', 'DIS-BD-BABS', 'DIS-INFECT-HMYCO'],
            src: `${ETT('57')} · ${ECP('Regeneration')}`,
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
        id: 'rbc-morphology',
        title: 'Red cell morphology',
        sub: 'Smear findings — each points to a mechanism',
        parts: [
          {
            id: 'polychromasia',
            title: 'Polychromasia / reticulocytes',
            sub: 'Blue-purple immature RBC — the smear sign of a regenerative marrow',
            etiology: [
              { heading: 'Regenerative anaemia', items: ['Haemorrhage', 'Haemolysis — immune, oxidant, infectious, fragmentation'] },
              { heading: 'Normal', items: ['Low numbers in healthy dogs and cats'] },
            ],
            path: [
              'Polychromatophils are aggregate reticulocytes — RNA-rich young RBC that stain purple on Wright’s stain',
              'Every polychromatophil is a reticulocyte, but punctate reticulocytes look normochromic, so the smear underestimates the count',
            ],
            dx: [
              'Grade mild / moderate / marked, then confirm with an absolute reticulocyte count',
              'Polychromasia with a falling PCV → haemorrhage or haemolysis — check total protein and the smear',
            ],
            pearls: [
              'Dogs mount the strongest response · cats release aggregate reticulocytes only in moderate–severe anaemia',
              'Cat macrocytes without polychromasia can be leftover punctate reticulocytes from a response in the last 3 weeks',
            ],
            related: ['DIS-BD-IMHA'],
            src: ECP('Regeneration; RBC colour changes'),
          },
          {
            id: 'spherocytes',
            title: 'Spherocytes',
            sub: 'Small, dense RBC with no central pallor — membrane bitten off by macrophages',
            etiology: [
              { heading: 'Disease', items: ['Immune-mediated haemolytic anaemia — primary, or secondary to infection or drugs', 'Fragmentation (low numbers)', 'Haemophagocytic syndrome, histiocytic sarcoma', 'Snake envenomation'] },
              { heading: 'Artefact', items: ['Stored (transfused) RBC', 'Feathered edge of the smear — read in the monolayer'] },
            ],
            path: ['Macrophages remove antibody-coated membrane (trogocytosis), leaving a smaller sphere'],
            dx: ['Saline agglutination test', 'Coombs test if no agglutination', 'Look for an underlying trigger — vector-borne disease, drugs, neoplasia'],
            pearls: [
              'Only reliably recognised in dogs — cat RBC have no central pallor',
              'Many spherocytes + regenerative anaemia in a dog = IMHA until proven otherwise',
            ],
            related: ['DIS-BD-IMHA', 'DIS-NEO-HSARC'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'agglutination',
            title: 'Agglutination (vs rouleaux)',
            sub: '3-D grape-like RBC clumps that persist after saline dilution',
            etiology: [
              { heading: 'Agglutination', items: ['Immune-mediated haemolytic anaemia (antibody bridging RBC)', 'Artefact — EDTA-dependent antibodies'] },
              { heading: 'Rouleaux (stacked coins)', items: ['Normal in horses and cats', 'Inflammation — high fibrinogen, polyclonal gammopathy', 'Myeloma, B-cell lymphoma — monoclonal gammopathy'] },
            ],
            dx: [
              'Saline test: 1 drop blood + 4–10 drops saline — rouleaux disperses, agglutination persists',
              'Persistent agglutination is diagnostic of an immune-mediated process — no Coombs needed',
              'Rouleaux → total protein, globulins, protein electrophoresis',
            ],
            related: ['DIS-BD-IMHA'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'heinz-bodies',
            title: 'Heinz bodies',
            sub: 'Refractile nubs of precipitated haemoglobin — oxidant injury',
            etiology: [
              { heading: 'Toxins', items: ['Onion / garlic (Allium)', 'Zinc (coins, nuts, ointments)', 'Naphthalene (mothballs)', 'Skunk musk'] },
              { heading: 'Drugs', items: ['Paracetamol (cats)', 'Propofol', 'Vitamin K1', 'Benzocaine'] },
              { heading: 'Cats — endogenous', items: ['Diabetes mellitus (ketotic)', 'Hyperthyroidism', 'Lymphoma'] },
            ],
            path: [
              'Oxidised haemoglobin precipitates and binds the membrane → rigid cells removed by the spleen or lysed in vessels',
              'Iron oxidation can also cause methaemoglobinaemia (brown blood)',
            ],
            dx: [
              'New methylene blue stain shows small Heinz bodies far better than Wright’s',
              'Look for eccentrocytes and ghost cells alongside',
              'Toxin and drug history · zinc level · radiograph for metallic foreign body',
            ],
            tx1: ['Remove the oxidant (decontaminate, remove the zinc foreign body)', 'Transfuse if severe', 'Paracetamol: N-acetylcysteine — see the toxicosis page'],
            pearls: [
              'Low numbers of small Heinz bodies are normal in cats — feline haemoglobin is very oxidation-prone',
              'Many Heinz bodies in a non-anaemic cat point to diabetes, hyperthyroidism or lymphoma',
            ],
            related: ['DIS-TOX-ALLIUM', 'DIS-TOX-APAP', 'DIS-TOX-ZN'],
            src: ECP('RBC inclusions; quick guide'),
          },
          {
            id: 'eccentrocytes',
            title: 'Eccentrocytes',
            sub: 'Haemoglobin pushed to one side, a clear crescent on the other — oxidant injury',
            etiology: [
              { heading: 'Oxidants', items: ['Onion / garlic', 'Zinc', 'Paracetamol (cats)', 'Vitamin K1, propofol', 'Naphthalene, skunk musk'] },
            ],
            path: ['Oxidant cross-linking fuses opposing membranes; a ruptured eccentrocyte leaves a pyknocyte'],
            dx: ['Same work-up as Heinz bodies — they usually travel together', 'Pyknocytes alongside favour oxidant damage over spherocytes'],
            related: ['DIS-TOX-ALLIUM', 'DIS-TOX-ZN', 'DIS-TOX-APAP'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'ghost-cells',
            title: 'Ghost cells',
            sub: 'Empty RBC membranes — haemoglobin has leaked out',
            etiology: [
              { heading: 'Intravascular haemolysis', items: ['IMHA (dog)', 'Babesia', 'Zinc toxicosis', 'Severe hypophosphataemia (DKA, refeeding)', 'Acute transfusion reaction', 'Clostridial toxins'] },
              { heading: 'Artefact', items: ['Traumatic collection, freezing, old sample, rough smear'] },
            ],
            dx: [
              'Check plasma (pink = haemoglobinaemia) and urine (haemoglobinuria)',
              'Fresh, gently collected repeat sample to exclude artefact',
              'Phosphate · zinc · Babesia PCR · agglutination / Coombs',
            ],
            pearls: ['Ghost cells + pink plasma + haemoglobinuria = intravascular haemolysis — treat as an emergency'],
            related: ['DIS-BD-IMHA', 'DIS-BD-BABS', 'DIS-TOX-ZN'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'schistocytes',
            title: 'Schistocytes (fragments)',
            sub: 'Small irregular RBC fragments — sheared in the circulation',
            etiology: [
              { heading: 'Abnormal vessels / fibrin', items: ['DIC', 'Haemangiosarcoma', 'Vasculitis', 'Heartworm (caval syndrome)'] },
              { heading: 'Other', items: ['Iron deficiency (fragile RBC)', 'Portosystemic shunt', 'Liver disease'] },
            ],
            dx: ['PT / aPTT, D-dimers, platelets — DIC', 'Abdominal ultrasound and echocardiography — haemangiosarcoma', 'Iron panel if microcytic / hypochromic'],
            pearls: ['Schistocytes + acanthocytes + thrombocytopenia in an older large-breed dog → look for haemangiosarcoma'],
            related: ['DIS-BD-DIC', 'DIS-NEO-HSA', 'DIS-HEP-PSS'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'acanthocytes',
            title: 'Acanthocytes',
            sub: 'Irregular, unevenly spiculated "spur" cells',
            etiology: [
              { heading: 'Dog', items: ['Haemangiosarcoma and other cancers', 'Liver disease', 'DIC, vasculitis', 'Iron deficiency'] },
              { heading: 'Cat', items: ['Liver disease'] },
            ],
            path: ['Altered membrane lipid (liver disease) or fragmentation injury'],
            dx: ['Distinguish from echinocytes (evenly spaced spikes, often artefact)', 'Liver panel, abdominal imaging, coagulation'],
            related: ['DIS-NEO-HSA', 'DIS-BD-DIC'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'keratocytes',
            title: 'Keratocytes',
            sub: '"Bite", "helmet" or "blister" cells',
            etiology: [
              { heading: 'Fragmentation', items: ['Same causes as schistocytes and acanthocytes — DIC, HSA, vasculitis, iron deficiency'] },
              { heading: 'Oxidant', items: ['Same causes as eccentrocytes — onion, zinc, paracetamol'] },
            ],
            pearls: ['Low numbers can be seen in healthy cats'],
            related: ['DIS-BD-DIC', 'DIS-NEO-HSA'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'echinocytes',
            title: 'Echinocytes (crenation)',
            sub: 'Evenly spaced short spikes — usually artefact',
            etiology: [
              { heading: 'Artefact (most common)', items: ['Old blood, slow-drying smear, excess EDTA (underfilled tube)'] },
              { heading: 'Disease', items: ['Snake envenomation (rattlesnake, viper)', 'Electrolyte depletion', 'Glomerulonephritis', 'Pyruvate kinase deficiency', 'Burns, bee stings'] },
            ],
            dx: ['Repeat on a fresh, correctly filled sample', 'If present in fresh blood with a bite history → envenomation'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'target-cells',
            title: 'Target cells (codocytes)',
            sub: 'Bull’s-eye RBC — extra membrane relative to haemoglobin (dogs)',
            etiology: [
              { heading: 'Causes', items: ['Regenerative anaemia (polychromatophils spread thin)', 'Iron deficiency (thin hypochromic cells)', 'Liver disease, dyslipidaemia (membrane lipid change)'] },
            ],
            pearls: ['Only recognised in dogs, which have central pallor — low numbers are of little significance'],
            src: ECP('RBC morphology quick guide'),
          },
          {
            id: 'hypochromasia',
            title: 'Hypochromasia (iron deficiency)',
            sub: 'Pale RBC with a thin haemoglobin rim — advanced iron deficiency',
            etiology: [
              { heading: 'Iron deficiency', items: ['Chronic external blood loss — GI ulcer or tumour, NSAIDs / steroids, heavy flea or hookworm burden', 'Nutritional (young animals)'] },
              { heading: 'Impaired haem synthesis', items: ['Chronic lead poisoning', 'Copper deficiency'] },
            ],
            path: ['Not enough iron to make haemoglobin → small, pale cells (microcytic hypochromic); smear changes precede a low MCHC'],
            dx: ['Serum iron, TIBC, ferritin', 'Faecal occult blood · GI imaging / endoscopy · flea and parasite check', 'Look for schistocytes and thrombocytosis, common in iron deficiency'],
            tx1: ['Find and stop the blood loss', 'Iron supplementation'],
            pearls: ['Distinguish from torocytes — a "punched-out" smear artefact with a sharp edge and normal rim', 'Portosystemic shunts cause microcytosis WITHOUT true iron deficiency'],
            related: ['DIS-GI-ULC', 'DIS-HEP-PSS'],
            src: ECP('RBC colour changes'),
          },
          {
            id: 'macrocytes',
            title: 'Macrocytes / high MCV',
            sub: 'Bigger-than-normal RBC',
            etiology: [
              { heading: 'Regeneration', items: ['Young RBC (punctate reticulocytes)'] },
              { heading: 'Breed', items: ['Toy and miniature Poodles (non-anaemic)'] },
              { heading: 'Disease', items: ['FeLV (cat) — macrocytic non-regenerative anaemia', 'Myelodysplasia', 'B12 / folate deficiency', 'Hyperthyroidism (cat)'] },
              { heading: 'Artefact', items: ['Old blood (swelling)', 'Hypernatraemia, hyperglycaemia on some analysers'] },
            ],
            dx: ['Polychromasia present? → regeneration · absent → FeLV test, B12, marrow'],
            related: ['DIS-INFECT-FELV'],
            src: ECP('RBC morphology quick guide; size changes'),
          },
          {
            id: 'howell-jolly',
            title: 'Howell-Jolly bodies',
            sub: 'Single round dark-blue nuclear remnant in an RBC',
            etiology: [
              { heading: 'Causes', items: ['Regenerative anaemia', 'Splenectomy or reduced splenic function', 'Corticosteroids', 'Normal in low numbers in cats and horses', 'Poodle macrocytosis, myelodysplasia'] },
            ],
            pearls: ['Do not mistake for a haemoparasite — Mycoplasma sits on the surface, often in chains or rings'],
            related: ['DIS-SPLEEN'],
            src: ECP('RBC inclusions'),
          },
          {
            id: 'basophilic-stippling',
            title: 'Basophilic stippling',
            sub: 'Fine blue dots of RNA throughout the RBC',
            etiology: [
              { heading: 'Causes', items: ['Regenerative anaemia (more in ruminants, occasionally dogs and cats)', 'Lead poisoning — even without anaemia'] },
            ],
            dx: ['Stippling + many nRBC in a non-anaemic dog → blood lead'],
            pearls: ['Distinguish from siderocytes (fewer, focal grey-blue iron granules; Prussian blue positive)'],
            related: ['DIS-TOX-LEAD'],
            src: ECP('RBC inclusions'),
          },
          {
            id: 'nrbc',
            title: 'Nucleated RBC (nRBC)',
            sub: 'Immature RBC with a nucleus — not a reliable regeneration marker on their own',
            etiology: [
              { heading: 'With regeneration', items: ['Strongly regenerative anaemia (dogs, cats)'] },
              { heading: 'Inappropriate (no reticulocytosis)', items: ['Lead poisoning', 'Splenic disease or splenectomy, haemangiosarcoma', 'Marrow injury or hypoxia — sepsis, heatstroke', 'Leukaemia, myelodysplasia'] },
            ],
            dx: ['Correct the WBC: analysers count nRBC as leukocytes', 'nRBC without polychromasia → think lead, spleen, marrow'],
            pearls: ['Heatstroke: nRBC ≥18/100 WBC predicted death with 91% sensitivity, 88% specificity (Ettinger Ch 130)'],
            related: ['DIS-TOX-LEAD', 'DIS-ENV-HEAT', 'DIS-NEO-HSA'],
            src: `${ECP('Nucleated RBC')} · ${ETT('130')}`,
          },
        ],
      },
    ],
  },
  {
    title: 'White blood cells',
    icon: '🦠',
    entries: [
      {
        id: 'neutrophils',
        title: 'Neutrophils',
        sub: 'High, low, and immature or toxic neutrophils',
        parts: [
          {
            id: 'neutrophilia',
            title: 'Neutrophilia',
            sub: 'Mature (segmented) neutrophils above the RI — absolute count, not %',
            thresholds: {
              headers: ['Species', 'Mild', 'Moderate', 'Marked'],
              rows: [['Dog', '<20', '20–40', '>40'], ['Cat', '<25', '25–40', '>40']],
              note: 'Neutrophils × 10⁹/L, above the RI',
            },
            etiology: [
              { heading: 'Redistribution (marginating → circulating)', items: ['Catecholamine — fear, excitement (cats up to 2–3× because their marginating pool is larger)', 'Corticosteroid — stress, HAC, steroid therapy'] },
              { heading: 'Increased marrow release / production', items: ['Inflammation — infectious or not (trauma, surgery, burns, necrosis)', 'Immune-mediated disease — IMHA, IMPA', 'Paraneoplastic (G-CSF) — lymphoma, other tumours'] },
              { heading: 'Rare', items: ['Leukocyte adhesion deficiency — very high counts, recurrent infections', 'Chronic myeloid leukaemia'] },
            ],
            path: [
              'Neutrophils circulate only 5–15 h · the marrow storage pool is released within hours, increased production takes 3–5 days',
              'Physiological shifts roughly double the count (2–3× in cats) but never produce a left shift or toxic change',
            ],
            dx: [
              'Left shift or toxic change → inflammation — search for a focus (imaging, effusion, urine culture)',
              'Mature neutrophilia + lymphopenia + eosinopenia → stress — interpret with the patient',
              '>40 × 10⁹/L → marrow hyperplasia likely · pyometra, abscess, IMHA, neoplasia',
            ],
            pearls: [
              'High-dose chronic steroids can give a mild left shift (0.3–0.4 × 10⁹/L bands) WITHOUT toxic change (eClinPath)',
              'Hypersegmented neutrophils = prolonged circulation (steroids, chronic inflammation)',
            ],
            related: ['DIS-REPRO-PYO', 'DIS-BD-IMHA'],
            src: `${ECP('Individual WBC')} · ${ETT('58')}`,
          },
          {
            id: 'neutropenia',
            title: 'Neutropenia',
            sub: 'Neutrophils below the RI — absolute count, not %',
            thresholds: {
              headers: ['', 'Mild', 'Moderate', 'Severe'],
              rows: [['Neutrophils', '1.5–3', '0.5–1.5', '<0.5']],
              note: '× 10⁹/L',
            },
            etiology: [
              { heading: 'Consumption — the commonest cause', items: ['Overwhelming inflammation — sepsis, peritonitis, pyometra, parvovirus enteritis', 'Usually with a degenerative left shift and toxic change'] },
              { heading: 'Destruction', items: ['Immune-mediated neutropenia (alone or with SLE)', 'Parvovirus, panleukopenia', 'Drugs, haemophagocytic / histiocytic disease'] },
              { heading: 'Reduced production', items: ['FeLV / FIV, Ehrlichia canis', 'Drugs — chemotherapy, anti-epileptics, methimazole, chloramphenicol, oestrogen', 'Marrow disease — leukaemia, myelophthisis, aplasia, myelofibrosis'] },
              { heading: 'Other', items: ['Endotoxaemia — transient margination for 1–3 h', 'Cyclic haematopoiesis (grey Collies)', 'B12 malabsorption (Border Collie, Giant Schnauzer, Beagle)', 'Idiopathic (cat) — healthy, retrovirus-negative', 'Breed-low counts — Belgian Tervuren, some Australian Shepherds'] },
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
            monitor: ['Neutrophil count and temperature daily while <1.0 × 10⁹/L'],
            pearls: [
              'Neutropenia with toxic change and bands = consumption, not marrow failure',
              'Every cat with unexplained neutropenia gets an FeLV / FIV test (eClinPath)',
            ],
            related: ['DIS-IMNP', 'DIS-GI-PARVO', 'DIS-GI-FPV', 'DIS-INFECT-FELV'],
            src: `${ECP('Individual WBC')} · ${ETT('58')}`,
          },
          {
            id: 'left-shift',
            title: 'Left shift & toxic change',
            sub: 'Immature (band) neutrophils and maturation defects — the signature of inflammatory demand',
            etiology: [
              { heading: 'Left shift', items: ['Inflammation — the commonest cause', 'Leukaemia, marrow recovery (usually not toxic)', 'Paraneoplastic G-CSF', 'Pelger-Huët anomaly — hyposegmented but normal, no toxic change'] },
              { heading: 'Toxic change (in order of appearance)', items: ['Döhle bodies — earliest; but normal in small numbers in cats and an artefact of stored blood', 'Cytoplasmic basophilia', 'Foamy cytoplasmic vacuolation', 'Nuclear immaturity — lighter chromatin', 'Toxic granulation — rare in dogs and cats'] },
            ],
            path: [
              'Toxic change is NOT a toxin effect — it is accelerated maturation under intense cytokine drive',
              'Degenerative left shift: bands outnumber segmented neutrophils, usually with a normal or low count = demand outstripping supply',
            ],
            dx: [
              'Make the smear immediately — Döhle bodies and band-like cells appear in EDTA blood within 4–8 h (eClinPath)',
              'Degenerative left shift → urgent search for sepsis (effusion, pyometra, peritonitis, pneumonia)',
            ],
            pearls: [
              'Severe left shift with NO toxic change → Pelger-Huët, leukaemia, or misidentification',
              'Marked toxic change with no left shift → check for dysplasia or artefact',
              'The more severe the toxic change, the more intense the inflammatory stimulus',
            ],
            related: ['DIS-SHOCK-SEPTIC', 'DIS-GI-SEPTPERIT', 'DIS-REPRO-PYO'],
            src: ECP('Left shift; toxic change'),
          },
        ],
      },
      {
        id: 'lymphocytes',
        title: 'Lymphocytes',
        sub: 'Changes mostly reflect redistribution, not production',
        parts: [
          {
            id: 'lymphocytosis',
            title: 'Lymphocytosis',
            sub: 'Absolute lymphocyte count above the RI',
            thresholds: {
              headers: ['Species', 'Mild', 'Moderate', 'Marked'],
              rows: [['Dog', '<10', '10–30', '>30'], ['Cat', '<10', '10–40', '>40']],
              note: 'Lymphocytes × 10⁹/L',
            },
            etiology: [
              { heading: 'Causes', items: ['Physiological (adrenaline) — young healthy cats especially', 'Youth (<6 months)', 'Hypoadrenocorticism (dog) — up to 30 × 10⁹/L, often with eosinophilia', 'Ehrlichia canis — granular lymphocytes', 'Thymoma', 'Chronic lymphocytic leukaemia — older animal, persistent or rising'] },
            ],
            dx: ['Persistent or rising lymphocytosis in an older animal → flow cytometry ± clonality (PARR)'],
            related: ['DIS-SEC-HYPO', 'DIS-BD-EHRL', 'DIS-NEO-LEUK'],
            src: ECP('Individual WBC'),
          },
          {
            id: 'lymphopenia',
            title: 'Lymphopenia',
            sub: 'Absolute lymphocyte count below the RI',
            etiology: [
              { heading: 'Causes', items: ['Stress / corticosteroids — the commonest cause', 'Acute infection, endotoxaemia', 'Lymph loss — chylothorax, lymphangiectasia / PLE', 'Viral lymphocytolysis, immunodeficiency'] },
            ],
            dx: ['Lymphopenia without stress → look for chyle loss (effusion, low albumin + cholesterol)'],
            pearls: ['A sick dog WITHOUT lymphopenia (mid- to high-normal lymphocytes) → think hypoadrenocorticism (eClinPath)'],
            related: ['DIS-SEC-HYPO', 'DIS-RESP-CHYLO', 'DIS-GI-PLE'],
            src: ECP('Individual WBC'),
          },
        ],
      },
      {
        id: 'monocytes',
        title: 'Monocytes',
        sub: 'Monocytosis — monocytopenia is not significant',
        parts: [
          {
            id: 'monocytosis',
            title: 'Monocytosis',
            sub: 'No marrow storage pool — increases reflect production or redistribution',
            etiology: [
              { heading: 'Common', items: ['Stress / corticosteroids — especially dogs', 'Inflammation — acute or chronic, infectious or not'] },
              { heading: 'Uncommon', items: ['Recovery from marrow injury (after chemotherapy) — can be marked and mimic leukaemia', 'Paraneoplastic (e.g. lymphoma)', 'Immune-mediated neutropenia', 'Monocytic / myelomonocytic leukaemia'] },
            ],
            pearls: ['Monocytopenia has no clinical significance — the RI often reaches zero', 'Bands vs monocytes is a common misread on toxic smears'],
            related: ['DIS-NEO-LEUK'],
            src: ECP('Individual WBC'),
          },
        ],
      },
      {
        id: 'eosinophils',
        title: 'Eosinophils',
        sub: 'Eosinophilia — eosinopenia is hard to document',
        parts: [
          {
            id: 'eosinophilia',
            title: 'Eosinophilia',
            sub: 'Absolute eosinophil count above the RI',
            etiology: [
              { heading: 'Common', items: ['Hypersensitivity — flea allergy, atopy, feline asthma', 'Parasites with a tissue phase — heartworm, lungworm, hookworm, ectoparasites'] },
              { heading: 'Paraneoplastic', items: ['Mast cell tumour', 'T-cell lymphoma', 'Squamous cell carcinoma'] },
              { heading: 'Other', items: ['Hypoadrenocorticism', 'Eosinophilic diseases — gastroenteritis, bronchopneumopathy, panosteitis', 'Hypereosinophilic syndrome (Rottweilers, cats)', 'Eosinophilic leukaemia — rare'] },
            ],
            dx: ['Flea control trial · faecal flotation and Baermann · heartworm antigen', 'Skin, airway or GI cytology / biopsy', 'Fine-needle aspirate any skin mass (mast cell tumour)'],
            pearls: [
              'Eosinopenia = stress / steroids, or acute bacterial sepsis — RI often reaches zero, so hard to document',
              'Most haemoparasites do NOT cause eosinophilia',
            ],
            related: ['DIS-NEO-MCT', 'DIS-RESP-ASTHMA', 'DIS-RESP-LUNGWORM', 'DIS-SEC-HYPO'],
            src: ECP('Individual WBC'),
          },
        ],
      },
      {
        id: 'basophils',
        title: 'Basophils',
        sub: 'Basophilia — basopenia is not significant',
        parts: [
          {
            id: 'basophilia',
            title: 'Basophilia',
            sub: 'Rare — usually travels with eosinophilia',
            etiology: [
              { heading: 'Causes', items: ['Hypersensitivity', 'Heartworm and other parasites', 'Mast cell tumour', 'Essential thrombocythaemia, other myeloproliferative disease'] },
            ],
            pearls: ['Basopenia is not a relevant finding — healthy animals have almost none'],
            related: ['DIS-NEO-MCT'],
            src: `${ECP('Individual WBC')} · ${ETT('58')}`,
          },
        ],
      },
    ],
  },
  {
    title: 'Platelets',
    icon: '🧫',
    entries: [
      {
        id: 'platelets',
        title: 'Platelets',
        sub: 'Low or high platelet count',
        parts: [
          {
            id: 'thrombocytopenia',
            title: 'Thrombocytopenia',
            sub: 'Platelets below the RI — always confirm on a smear',
            thresholds: {
              headers: ['Finding', 'Platelets (× 10⁹/L)'],
              rows: [
                ['Spontaneous bleeding', 'Rare from thrombocytopenia alone above 30'],
                ['Primary ITP', 'Usually <50, often <20'],
                ['Smear estimate', 'Mean platelets per oil field (10 fields) × 15'],
              ],
            },
            etiology: [
              { heading: 'Pseudo', items: ['Clumping (especially cats) — falsely low count AND falsely high MPV', 'CKCS and other breeds — inherited macrothrombocytopenia, no bleeding'] },
              { heading: 'Destruction', items: ['Primary ITP', 'Secondary immune — infection, neoplasia, drugs, vaccination'] },
              { heading: 'Consumption / sequestration', items: ['DIC', 'Vasculitis', 'Splenic disease — HSA, lymphoma, torsion', 'Severe haemorrhage'] },
              { heading: 'Reduced production', items: ['Infection — Ehrlichia, Anaplasma, FeLV / FIV, parvovirus', 'Drugs — chemotherapy, oestrogens, sulfonamides, methimazole', 'Marrow infiltration — leukaemia, lymphoma, myeloma'] },
              { heading: 'Dilutional', items: ['Massive transfusion (>1 blood volume / 24 h)'] },
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
            tx2: ['Platelet transfusion only for life-threatening bleeding (CNS, lung) or surgery — transfused platelets are destroyed rapidly in ITP'],
            monitor: ['Platelet count every 1–3 days until rising'],
            pearls: ['Petechiae / mucosal bleeding with a normal count → platelet function or vWD (BMBT)'],
            related: ['DIS-BD-TCP', 'DIS-BD-IMTP', 'DIS-BD-EHRL', 'DIS-BD-ICT', 'DIS-BD-TPATH', 'DIS-BD-VWD'],
            src: `${ETT('29, 59')} · ${ECP('Platelet changes')}`,
          },
          {
            id: 'thrombocytosis',
            title: 'Thrombocytosis',
            sub: 'Platelets above the RI',
            etiology: [
              { heading: 'Reactive (common)', items: ['Iron deficiency / chronic blood loss', 'Inflammation, infection', 'Neoplasia', 'Tissue necrosis', 'Steroids / HAC · post-splenectomy'] },
              { heading: 'Primary', items: ['Essential thrombocythaemia — rare, usually >900 × 10⁹/L'] },
            ],
            dx: ['Look for iron deficiency (microcytosis, low iron) and chronic blood loss', 'Repeat after the inflammatory process resolves'],
            related: ['DIS-BD-TCS'],
            src: ETT('59'),
          },
        ],
      },
    ],
  },
  {
    title: 'Biochemistry — key patterns',
    icon: '🔑',
    entries: [
      {
        id: 'liver-patterns',
        title: 'Liver enzyme patterns',
        sub: 'Read ALT, ALP, GGT and bilirubin TOGETHER — the combination points to the process',
        thresholds: {
          headers: ['Finding', 'Value'],
          rows: [
            ['ALT rise — mild', '2–3× upper RI'],
            ['ALT rise — moderate', '4–5× upper RI'],
            ['ALT rise — marked', '>10× upper RI'],
            ['ALP in young animals', '2–10× adult values (bone ALP)'],
            ['ALP reaches adult range', '~15 months'],
            ['ALP half-life — dog', '~3 days (liver and steroid isoforms)'],
            ['ALP half-life — cat', '~6 h — so any feline rise matters'],
          ],
        },
        etiology: [
          { heading: '↑ ALP, ALT normal (dog) — think STEROID INDUCTION first', items: [
            'Exogenous corticosteroids — a single depot methylprednisolone dose can keep ALP up for ~3 weeks',
            'Hyperadrenocorticism — moderate to marked (up to 100×), mostly the steroid-induced isoform',
            'Chronic stress from any illness — endogenous cortisol, usually ≤2–3×',
            'Then: bone (young dog, osteosarcoma, hyperparathyroidism) · phenobarbital · Husky benign familial hyperphosphatasaemia · early or localised cholestasis · hepatic neoplasia (ALP can be the only enzyme up) · mammary tumours (mild)',
          ] },
          { heading: '↑ ALT ≫ ALP — primary hepatocellular injury', items: [
            'Chronic hepatitis — ALT rises first (≈7.5× vs ALP 5.5×); an unexplained ALT rise lasting >2 months is an early marker',
            'Toxins, drugs, hypoxia / hypotension, infection',
          ] },
          { heading: '↑ ALP, GGT, bilirubin ≫ ALT — primary cholestasis', items: [
            'Extrahepatic bile duct obstruction — very high ALP, often before jaundice',
            'Gallbladder mucocele, pancreatitis, cholangitis, neoplasia',
            'Retained bile acids then injure hepatocytes → secondary ALT rise',
          ] },
          { heading: '↑ AST > ALT with ↑ CK — muscle, not liver', items: ['Myopathy, trauma, feline ATE', 'Haemolysed sample (cat ALT, AST)'] },
          { heading: 'Cat patterns', items: [
            '↑ ALP, normal GGT, ↑ bilirubin, often ↑ ALT = hepatic lipidosis (ALP rises first, GGT last)',
            '↑ GGT > ALP = cholangitis, pancreatitis, biliary disease',
            'Mild ↑ ALT, AST, ALP with normal GGT and bilirubin = hyperthyroidism',
          ] },
          { heading: 'Normal or low enzymes, abnormal function', items: ['End-stage / cirrhotic liver', 'Portosystemic shunt — ↓ urea, cholesterol, albumin, glucose · ↑ bile acids'] },
        ],
        path: [
          'ALT, AST = leakage enzymes (cell damage) · ALP, GGT = induction enzymes (cholestasis, steroids, anticonvulsants)',
          'Dogs alone have a steroid-induced ALP isoform (C-ALP) — it takes up to ~10 days to appear',
        ],
        dx: [
          'Isolated ↑ ALP in a dog → full drug history (every steroid formulation, phenobarbital), then signs of HAC',
          'HAC suspected (consistent clinical signs) → confirm with a low-dose dexamethasone suppression test — the C-ALP isoform is sensitive but NOT specific (any chronic illness raises it); see Endocrine profiles',
          'Persistent unexplained ↑ ALT → bile acids, ultrasound, then biopsy (copper, chronic hepatitis)',
          'Cholestatic pattern → ultrasound for obstruction or mucocele, cPL / fPL',
          '↑ AST with ↑ CK → muscle source; repeat on a non-haemolysed sample',
        ],
        pearls: [
          'The bigger fold-rise tells you the primary process: leakage ≫ induction = hepatocellular; induction ≫ leakage = cholestasis (eClinPath)',
          'A few dogs with HAC have ↑ GGT with NORMAL ALP — it falls with treatment (eClinPath)',
          'Dogs given phenobarbital: ↑ ALP / ALT may be induction OR real hepatotoxicity — check bile acids',
          'Enzymes below the RI are not significant',
        ],
        related: ['DIS-PUPD-HAC', 'DIS-HEP-CHRONHEP', 'DIS-HEP-LIPIDOSIS', 'DIS-HEP-CHOLANGITIS', 'DIS-ENDO-HYPERTHY', 'DIS-HEP-PSS'],
        src: `${ECP('ALP; ALT; GGT; chemistry quick guide')} · ${ETT('293')}`,
      },
      {
        id: 'endocrine-patterns',
        title: 'Endocrine profiles',
        sub: 'The CBC + chemistry + urine "fingerprint" of the common endocrinopathies — a fingerprint points, a function test confirms',
        etiology: [
          { heading: 'Hyperadrenocorticism (dog)', items: [
            '↑ ALP (often marked) out of proportion to ALT · ± ↑ GGT',
            '↑ Cholesterol / triglycerides · mild hyperglycaemia',
            'Dilute urine (PU/PD) · proteinuria · urinary tract infection',
            'Stress leukogram — neutrophilia, lymphopenia, eosinopenia, monocytosis · ± thrombocytosis, erythrocytosis',
          ] },
          { heading: 'Hypoadrenocorticism (dog)', items: [
            '↓ Na, ↓ Cl, ↑ K — Na:K ≤24 makes it likely, but the classic electrolytes are ABSENT in some dogs (glucocorticoid-only deficiency)',
            'Azotaemia with inappropriately dilute urine — renal sodium loss washes out the medulla, so it mimics renal failure',
            'NO stress leukogram in a sick dog — lymphocytes and eosinophils normal or high',
            'Hypoglycaemia · hypercalcaemia (about one in three) · hypocholesterolaemia and hypoalbuminaemia',
            'GI bleeding — melena, anaemia, hypoproteinaemia',
          ] },
          { heading: 'Hypothyroidism (dog)', items: ['Fasting hypercholesterolaemia (>75% of cases)', 'Mild normocytic, normochromic non-regenerative anaemia', '± ↑ ALP, triglycerides'] },
          { heading: 'Hyperthyroidism (cat)', items: ['Mild ↑ ALT, AST, ALP with NORMAL bilirubin and GGT', 'Mild hyperglycaemia, lymphopenia', '↑ Phosphate', 'Creatinine may be falsely low — the high GFR masks CKD until the cat is euthyroid'] },
          { heading: 'Diabetes mellitus / DKA', items: ['Persistent hyperglycaemia + glucosuria', '↑ ALP / ALT (lipidosis), lipaemia', 'Electrolytes can be normal if the patient is drinking and not vomiting', 'DKA: ketonuria, high anion-gap metabolic acidosis · phosphate and potassium FALL once insulin starts'] },
        ],
        dx: [
          'Hyperadrenocorticism: confirm with a low-dose dexamethasone suppression test (0.01 mg/kg IV; cortisol at 0, 4, 8 h) — it screens AND helps separate pituitary from adrenal disease',
          'LDDST: sensitivity 85–100% but specificity only 44–73% — test only dogs with consistent clinical signs; non-adrenal illness and new or unstable diabetes cause false positives',
          'ACTH stimulation screens only (no pituitary vs adrenal separation) — use it when iatrogenic Cushing’s is suspected',
          'Hypoadrenocorticism: basal cortisol >2 µg/dL (>55 nmol/L) makes it unlikely · confirm with an ACTH stimulation test',
          'Hypothyroidism: total T4 + TSH (± free T4) after non-thyroidal illness has settled',
          'Hyperthyroidism: total T4 · recheck creatinine and USG after treatment',
          'Diabetes: fructosamine separates persistent hyperglycaemia from stress (especially cats)',
        ],
        pearls: [
          'A sick dog with a normal or high lymphocyte count is a classic Addison’s clue',
          'A low Na:K also occurs with GI disease (whipworm, salmonellosis, parvovirus), cavity effusions and uroabdomen — the ACTH stimulation test decides',
          'Raised liver enzymes in a cat WITHOUT hyperbilirubinaemia → test T4 before a liver biopsy',
        ],
        related: ['DIS-PUPD-HAC', 'DIS-SEC-HYPO', 'DIS-ENDO-HYPOTHY', 'DIS-ENDO-HYPERTHY', 'DIS-ENDO-DM', 'DIS-ENDO-DKA'],
        src: `${SHARKEY('2, 3, 5, 7')} · ${ETT('287, 293, 296')} · ${BISIAUX}`,
      },
      {
        id: 'kidney-patterns',
        title: 'Kidney & urinary patterns',
        sub: 'Azotaemia means nothing until it is paired with the urine specific gravity and the electrolytes',
        etiology: [
          { heading: 'Azotaemia + concentrated urine (dog >1.030, cat >1.035)', items: ['Pre-renal — dehydration, hypovolaemia, poor cardiac output'] },
          { heading: 'Azotaemia + isosthenuria', items: [
            'Renal azotaemia — usually',
            'BUT dilute urine without renal failure: hypoadrenocorticism, hypercalcaemia, pyometra (bacterial toxins), diabetes insipidus, medullary washout, liver failure, osmotic diuresis',
            'Hyposthenuria (<1.008) means the tubules are still working',
          ] },
          { heading: 'Azotaemia + hyperkalaemia', items: ['Urethral obstruction', 'Uroabdomen', 'Oliguric / anuric AKI', 'Hypoadrenocorticism'] },
          { heading: 'Uroabdomen fingerprint', items: ['Azotaemia, hyperkalaemia, hyponatraemia, hypochloraemia, hyperphosphataemia, ↑ anion gap', 'Abdominal fluid creatinine ≥2× serum · fluid:blood K⁺ >1.4 (dog) or >1.9 (cat)'] },
          { heading: 'Ethylene glycol fingerprint', items: ['Azotaemia + hypocalcaemia + hyperphosphataemia', 'High anion-gap metabolic acidosis · isosthenuria', '± calcium oxalate crystalluria (not always seen)'] },
          { heading: 'Urea and creatinine disagree', items: ['↑ Urea, normal creatinine — upper GI bleeding, high-protein meal, catabolism, steroids', '↓ Urea AND ↓ creatinine — portosystemic shunt / liver failure, PU/PD, low muscle mass', '↑ Creatinine, normal urea — Greyhound or heavily muscled dog'] },
        ],
        dx: [
          'Take the USG BEFORE fluids — afterwards it cannot classify the azotaemia',
          'Hyperkalaemia + azotaemia → palpate the bladder, AFAST for free fluid, ECG',
          'Free abdominal fluid → fluid creatinine and K⁺ vs serum',
          'Dilute urine + azotaemia in a dog with ↓ Na:K or no stress leukogram → ACTH stimulation test',
          'Hypercalcaemia + azotaemia → correct calcium, then repeat renal values — the azotaemia may be partly reversible',
        ],
        pearls: [
          '~75% of nephrons are lost before azotaemia appears',
          'Azotaemia magnitude does not tell acute from chronic',
          'A hyperthyroid cat’s creatinine overestimates kidney function — reassess once euthyroid',
        ],
        related: ['DIS-SEC-AKI', 'DIS-SEC-CKD', 'DIS-URO-URETHRAL-OBS', 'DIS-SEC-HYPO', 'DIS-ENDO-HCALC', 'DIS-REPRO-PYO'],
        src: `${SHARKEY('5, 6, 7')} · ${ETT('62, 287')}`,
      },
      {
        id: 'electrolyte-patterns',
        title: 'Electrolyte & acid–base patterns',
        sub: 'Combinations of Na, K, Cl, HCO₃ and phosphate that point to a process',
        etiology: [
          { heading: '↓ Cl + ↑ HCO₃ (metabolic alkalosis) ± ↓ K', items: ['Vomiting of gastric contents — pyloric or proximal small-intestinal obstruction (foreign body)', 'The longer the obstruction, the more severe the changes', 'Loop diuretics'] },
          { heading: '↓ Na + ↓ Cl + ↑ K', items: ['Hypoadrenocorticism — classic', 'GI disease — whipworm, salmonellosis, parvovirus, perforated ulcer', 'Cavity effusions — chylothorax, peritonitis, repeated drainage', 'Uroabdomen, renal failure'] },
          { heading: '↓ HCO₃ + ↑ anion gap', items: ['Lactic acidosis (poor perfusion)', 'Uraemic acids', 'Ketoacidosis (DKA)', 'Ethylene glycol'] },
          { heading: '↓ HCO₃ + normal anion gap (↑ Cl)', items: ['Diarrhoea (bicarbonate loss)', 'Renal tubular acidosis', 'Large volumes of 0.9% NaCl'] },
          { heading: '↓ Phosphate + ↓ K + ↓ Mg after feeding starts', items: ['Refeeding syndrome — starved cats, hepatic lipidosis, DKA on insulin', 'Severe hypophosphataemia can cause haemolysis'] },
          { heading: '↑ Na with concentrated urine', items: ['Pure water loss — no access, panting, fever'] },
        ],
        dx: [
          'Hypochloraemic alkalosis → radiographs / ultrasound for an obstructing foreign body',
          '↓ Na + ↑ K → ACTH stimulation test, faecal flotation, AFAST for effusion or uroabdomen',
          'High anion gap → lactate, ketones, creatinine, ethylene glycol test',
          'Re-check phosphate, K and Mg 12–24 h after feeding starts in an at-risk patient',
        ],
        pearls: [
          'Corrected Cl = Cl × (mid-RI Na ÷ patient Na) — a disproportionate Cl change flags an acid–base problem',
          'In a simple disorder Cl and HCO₃ move in opposite directions · if not, suspect a mixed disorder',
        ],
        related: ['DIS-SEC-HYPO', 'DIS-ENDO-DKA', 'DIS-GI-PARVO', 'DIS-HEP-LIPIDOSIS'],
        src: `${SHARKEY('6, 7')} · ${ETT('62, 67')}`,
      },
      {
        id: 'protein-patterns',
        title: 'Protein & liver-function patterns',
        sub: 'Which proteins are low together tells you where they went',
        etiology: [
          { heading: '↓ Albumin, globulin normal or ↑', items: ['Protein-losing nephropathy — selective albumin loss through the glomerulus', 'Liver failure — reduced production', 'Inflammation — albumin is a negative acute-phase protein'] },
          { heading: '↓ Albumin AND ↓ globulin', items: ['Haemorrhage (with anaemia)', 'Protein-losing enteropathy', 'Exudative skin loss — burns, wounds', 'Effusions'] },
          { heading: 'Liver-failure fingerprint', items: ['↓ Glucose + ↓ urea + ↓ albumin + ↓ cholesterol (without starvation)', '± ↑ bilirubin, prolonged PT / aPTT, ammonium urate crystals, dilute urine', 'Enzymes may be normal'] },
          { heading: '↑ Globulin + hypercalcaemia + cytopenias', items: ['Lymphoid malignancy — lymphoma, multiple myeloma'] },
          { heading: '↑ Albumin', items: ['Dehydration only'] },
        ],
        dx: [
          'Low albumin → UPC first, then bile acids, then GI work-up (cobalamin, faecal α1-proteinase inhibitor, endoscopy)',
          'Liver-failure fingerprint → pre- and post-prandial bile acids, ultrasound for a shunt',
          'Hyperglobulinaemia + hypercalcaemia → serum protein electrophoresis, marrow aspirate, imaging',
        ],
        pearls: [
          'Low albumin lowers TOTAL calcium — measure ionised calcium before treating',
          'Panhypoproteinaemia with anaemia = haemorrhage until proven otherwise',
        ],
        related: ['DIS-REN-GN', 'DIS-GI-PLE', 'DIS-HEP-PSS', 'DIS-NEO-LSA'],
        src: SHARKEY('3, 4, 5, 6'),
      },
      {
        id: 'sample-artefacts',
        title: 'Sample artefacts',
        sub: 'Patterns that come from the tube, not the patient — repeat before you treat',
        etiology: [
          { heading: 'EDTA contamination (plasma from a purple top)', items: ['Very high K⁺ (potassium EDTA)', 'Very low calcium and magnesium (chelated)'] },
          { heading: 'Delayed separation', items: ['Low glucose — cells keep consuming it (worse with high WBC or platelet counts)'] },
          { heading: 'Haemolysis', items: ['↑ K⁺ in Akita, Shiba and other high-RBC-potassium breeds', '↑ AST, CK, LDH · ↑ ALT in cats', 'Interferes with many colour-based assays'] },
          { heading: 'Lipaemia', items: ['Falsely low Na and Cl on indirect ion-selective electrodes', 'Interferes with many colour-based assays — repeat after a fast'] },
          { heading: 'Post-mortem or long-delayed sample', items: ['Marked rises in intracellular constituents — K⁺, phosphate, CK, AST'] },
          { heading: 'Other', items: ['Potassium bromide reads as chloride on some analysers', 'Muscle hit at venepuncture → mild ↑ CK'] },
        ],
        dx: ['Repeat on a fresh, correctly collected serum sample (red top or serum-separator tube), separated within 30 min', 'Check the haemolysis and lipaemia indices on the report'],
        pearls: ['Hyperkalaemia + hypocalcaemia in a bright, well patient = EDTA contamination until proven otherwise'],
        src: `${SHARKEY('3, 6, 7')} · ${ECP('chemistry quick guide')}`,
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
          '↑ ALP with normal ALT in a dog → steroid induction first (exogenous or HAC) — see Liver enzyme patterns',
          'Cat ALP has a short half-life and little induction — any increase is significant',
          'Feline hepatic lipidosis: marked ↑ ALP with normal GGT',
          'End-stage / cirrhotic livers can have normal enzymes — use bile acids',
          'Enzymes below the RI are not significant',
          'Check coagulation before biopsy',
        ],
        related: ['DIS-HEP-CHRONHEP', 'DIS-HEP-CHOLANGITIS', 'DIS-HEP-LIPIDOSIS', 'DIS-HEP-PSS', 'DIS-PUPD-HAC'],
        src: `${SHARKEY('2')} · ${ETT('28')} · ${ECP('ALP; ALT; GGT')}`,
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
    title: 'Biochemistry — muscle',
    icon: '💪',
    entries: [
      {
        id: 'ck',
        title: 'Creatine kinase (CK) & AST',
        sub: 'Muscle leakage enzymes — CK rises and falls fast, AST lingers',
        etiology: [
          { heading: 'Artefact / iatrogenic', items: ['Haemolysis', 'Muscle hit during venepuncture', 'IM injections (especially irritant drugs), recent surgery'] },
          { heading: 'Physiological', items: ['Puppies', 'Anorexia in cats', 'Exercise'] },
          { heading: 'Myopathy', items: ['Trauma, prolonged recumbency, seizures', 'Feline aortic thromboembolism', 'Inflammatory myopathy (polymyositis)', 'Inherited muscular dystrophy', 'Hypokalaemic myopathy (cats)', 'Malignant hyperthermia'] },
        ],
        path: ['CK is cytosolic and short-lived — a high CK means ongoing or recent damage · AST stays up longer, so ↑ AST with falling CK = damage that has stopped'],
        dx: ['Compare with ALT / AST: in muscle disease AST > ALT, and CK is high', 'Repeat on a clean, non-haemolysed sample if the patient looks well', 'Potassium (cats) · neuro exam · EMG / muscle biopsy for persistent elevation'],
        pearls: ['Mild ↑ CK in an anorexic cat is common and often not muscle disease'],
        related: ['DIS-CARD-ATE', 'DIS-NEU-HYPOKMYO'],
        src: ECP('Chemistry quick guide — CK, AST'),
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
        thresholds: {
          headers: ['Azotaemia', 'USG — dog', 'USG — cat'],
          rows: [
            ['Pre-renal', '>1.030', '>1.035'],
            ['Renal', '1.007–1.030', '1.007–1.035'],
            ['Isosthenuria', '1.008–1.012', '1.008–1.012'],
          ],
        },
        etiology: [
          { heading: 'Pre-renal', items: ['Dehydration, hypovolaemia, haemorrhage', 'Low cardiac output, shock, sepsis', 'Hypoadrenocorticism (USG can be low — Na loss washes out the medulla)'] },
          { heading: 'Renal', items: ['AKI — toxins (ethylene glycol, lilies in cats, NSAIDs), leptospirosis, pyelonephritis, ischaemia', 'CKD'] },
          { heading: 'Post-renal', items: ['Urethral / bilateral ureteral obstruction', 'Uroabdomen', 'Partial obstruction can still pass small volumes'] },
          { heading: 'Urea alone ↑', items: ['High-protein meal', 'GI haemorrhage', 'Catabolism, fever, steroids'] },
          { heading: 'Urea ↓', items: ['Liver failure / PSS', 'Low-protein diet', 'Polyuria (diuresis)'] },
          { heading: 'Creatinine ↓ / unreliable', items: ['Low muscle mass — creatinine underestimates loss of function in thin patients', 'Portosystemic shunt — low urea AND low creatinine'] },
          { heading: 'Creatinine ↑ without kidney disease', items: ['Greyhounds and heavily muscled dogs', 'Jaffe method interference (ketones, glucose, cephalosporins)'] },
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
        src: `${SHARKEY('5')} · ${ETT('66')} · ${ECP('chemistry quick guide')}`,
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
        thresholds: {
          headers: ['Finding', 'K⁺ (mmol/L)'],
          rows: [
            ['Hypokalaemia — mild', '3.0–4.0'],
            ['Hypokalaemia — moderate', '2.5–3.0'],
            ['Hypokalaemia — severe', '<2.5'],
            ['Hypokalaemia signs — cat', '<3.5'],
            ['Hypokalaemia signs — dog', '<2.5'],
            ['Hyperkalaemia signs', 'Usually >7.5–8.0'],
          ],
        },
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
const asPage = (x: InterpEntry | InterpPage): InterpPage =>
  'parts' in x ? x : { id: x.id, title: x.title, sub: x.sub, parts: [x] }

/** The list the tab renders — every group entry normalised to a page. */
export const INTERP_GROUPS = BLOODWORK.map(g => ({ title: g.title, icon: g.icon, pages: g.entries.map(asPage) }))

/** Every finding, flat. */
export const INTERP_ENTRIES = INTERP_GROUPS.flatMap(g => g.pages.flatMap(p => p.parts))

/** Page id → its first finding, finding id → that finding — so a URL can name
 *  either, and the old one-page-per-finding links still land. */
export const INTERP_BY_ID = new Map<string, { page: InterpPage; part: InterpEntry }>(
  INTERP_GROUPS.flatMap(g => g.pages.flatMap(page => [
    [page.id, { page, part: page.parts[0] }] as const,
    ...page.parts.map(part => [part.id, { page, part }] as const),
  ])),
)

/** Full AMA strings for the sources footer — copied from references/CITATIONS.md. */
export const INTERP_SOURCES = [
  'eClinPath. Cornell University. Accessed October 18, 2026. https://eclinpath.com — page-level citations in references/CITATIONS.md',
  'Côté E, Ettinger SJ, Feldman EC, eds. Ettinger\'s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024.',
  'Sharkey LC, Radin MJ. Manual of Veterinary Clinical Chemistry: A Case Study Approach. Teton NewMedia; 2010.',
  'Bisiaux T, da Costa JM, Martins RC, Barroso TG. Complete blood count interpretation in dogs and cats and its analytical compatibility with Vis-NIR point-of-care hematology: a systematic literature review with narrative synthesis. Vet J. 2026;320:106914. doi:10.1016/j.tvjl.2026.106914',
]
