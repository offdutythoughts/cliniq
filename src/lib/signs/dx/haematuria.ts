// ── Haematuria — diagnostic approach (data) ─────────────────────────────────
// Migration of haematuriaDx{History,Exam,Dx}Html (legacy HTML consts in
// ../haematuria.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, stepPatterns, numBadge, bullets } from './shared/dxHelpers'

export const haematuriaDx: DxApproach = {
  sign: 'haematuria',
  title: 'Haematuria',
  tabs: {

  history: {
    title: 'History: Haematuria',
    blocks: [
      { kind: 'goal', text: 'TRUE HAEMATURIA vs HAEMOGLOBINURIA vs MYOGLOBINURIA vs PIGMENT' },
      { kind: 'note', html: `All three give a positive dipstick for blood. The key bedside discriminator is to <strong>centrifuge the urine</strong>.`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Red sediment + clear supernatant</strong>', { text: '<strong>True haematuria</strong> — RBCs intact', tone: 'teal' }],
          ['<strong>Red supernatant + minimal sediment</strong>', { text: '<strong>Haemoglobinuria</strong> (intravascular haemolysis · recent intense exercise · in-vitro lysis if delayed processing) or <strong>myoglobinuria</strong> (rhabdomyolysis · severe trauma · heatstroke · snake envenomation · capture myopathy)', tone: 'teal' }],
          ['<strong>CBC anaemia + jaundice ± agglutination / spherocytes</strong>', { text: 'IMHA / haemolytic process — see LOC-JD-PREHEP', tone: 'teal' }],
          ['<strong>Severely elevated CK + AST</strong>', { text: 'Myoglobinuria from muscle injury', tone: 'teal' }],
          ['<strong>Pigmenturia from diet or drug</strong><br>beetroot · food dye · rifampin · phenazopyridine', { text: 'Dipstick <strong>negative</strong> for blood', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📋 STEP 1 — STREAM-TIMING + VOIDING HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'When does blood appear in the stream?',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Timing', { text: 'Localises to', tone: 'teal' }],
        rows: [
          ['<strong>Initial</strong> — first jet', { text: bullets(['Urethra (distal)', 'Prepuce', 'Vulva / vagina', 'Prostate']), tone: 'teal' }],
          ['<strong>Terminal</strong> — final jet', { text: bullets(['Bladder trigone / neck', 'Proximal urethra', 'Prostate']), tone: 'teal' }],
          ['<strong>Total / throughout</strong>', { text: 'Bladder body <em>or</em> upper tract — uniform mixing', tone: 'teal' }],
          ['<strong>Independent of voiding</strong> — drips between voids', { text: bullets(['Urethra', 'Prostate (males)', 'Vagina', 'Vulva']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Concurrent LUTS?',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Pattern', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pollakiuria + stranguria + dysuria + small volumes</strong>', { text: bullets(['Bladder / urethra — cystitis', 'Urolith', 'TCC', 'FIC', 'Prostatic disease']), tone: 'teal' }],
          ['<strong>Normal volumes + non-painful</strong>', { text: bullets(['Upper tract (renal haematuria · idiopathic renal haematuria · pyelonephritis is often painless)', 'Genital', 'Systemic / pseudo']), tone: 'teal' }],
          ['<strong>PU/PD + haematuria</strong>', { text: bullets(['Pyelonephritis', 'Renal neoplasia', 'Hypercalcaemia with urolithiasis', 'Hyperadrenocorticism with UTI']), tone: 'teal' }],
          ['<strong>Straining + no urine + abdominal pain + collapse / vomiting</strong>', { text: '<strong>Urethral obstruction</strong> (cat plug · male dog urolith) — emergency', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '💊 STEP 2 — DRUG / TOXIN / TRAUMA HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Exposure', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>Anticoagulant rodenticide</strong><br>warfarin · brodifacoum · bromadiolone', { text: 'Haematuria can be the first sign before generalised bleeding', tone: 'teal' }],
          ['<strong>NSAIDs / corticosteroids</strong>', { text: bullets(['GI ulcer', 'Renal papillary necrosis (rare)']), tone: 'teal' }],
          ['<strong>Cyclophosphamide</strong>', { text: 'Sterile haemorrhagic cystitis — concurrent IMHA / lymphoma chemotherapy', tone: 'teal' }],
          [bullets(['<strong>Heparin</strong>', '<strong>Dabigatran</strong>', '<strong>Rivaroxaban</strong>']), { text: 'Anticoagulation', tone: 'teal' }],
          ['<strong>Onion / garlic / zinc</strong>', { text: 'Heinz body haemolytic anaemia → haemoglobinuria (🐱 very sensitive)', tone: 'teal' }],
          ['<strong>Snake envenomation</strong>', { text: 'Coagulopathy + rhabdomyolysis', tone: 'teal' }],
          ['<strong>Vitamin D rodenticide</strong>', { text: 'Hypercalcaemia → urolithiasis', tone: 'teal' }],
          [bullets(['RTA', 'Falls', 'Kicks'], { lead: '<strong>Trauma</strong>' }), { text: bullets(['Renal contusion / rupture', 'Bladder rupture', 'Urethral tear']), tone: 'teal' }],
          ['<strong>Recent procedures</strong>', { text: bullets(['Cystocentesis (mild traumatic haematuria expected ~24 h)', 'Catheterisation', 'Recent urinary surgery']), tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🩺 STEP 3 — SYSTEMIC HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Concurrent picture', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>PU/PD + haematuria</strong>', { text: bullets(['Hypercalcaemia (lymphoma · anal sac adenocarcinoma · hyperparathyroidism — increases urolithiasis risk)', 'Hyperadrenocorticism (calcium oxalate urolithiasis, UTI)', 'CKD with concurrent UTI']), tone: 'teal' }],
          ['<strong>Weight loss + haematuria + older animal</strong>', { text: 'Urothelial / prostatic / renal neoplasia', tone: 'teal' }],
          ['<strong>Pyrexia + haematuria</strong>', { text: bullets(['Pyelonephritis (often back / lumbar pain)', 'Prostatitis (intact male — testicular swelling possible)', 'Pyometra (intact bitch with vulvar discharge)', 'Septic UTI', 'Leptospirosis']), tone: 'teal' }],
          ['<strong>Concurrent dermatitis / joint pain / mucosal bleeding</strong>', { text: bullets(['Immune-mediated polysystemic disease — IMTP', 'Vasculitis', 'SLE']), tone: 'teal' }],
          ['<strong>Pale gums / collapse / haematuria</strong>', { text: 'Haemolysis vs blood loss + coagulopathy — CBC + smear + PT/aPTT', tone: 'teal' }],
          ['<strong>Recent travel / tick exposure</strong>', { text: bullets(['Ehrlichia', 'Babesia', 'Leishmania → thrombocytopenia + haematuria']), tone: 'teal' }],
          ['<strong>Intact female + anorexia + vulvar discharge ± PU/PD ± vomiting</strong>', { text: '<strong>Pyometra</strong> — urgent surgical / medical management', tone: 'danger' }],
          ['<strong>Intact male + tenesmus + dysuria + dyschezia</strong>', { text: 'Prostatic disease — DRE + ultrasound', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🐾 STEP 4 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Scottish Terrier', 'West Highland White Terrier', 'Beagle', 'Shetland Sheepdog'], tone: 'danger', html: 'older bitch especially → <strong>urothelial carcinoma (TCC)</strong> — persistent haematuria refractory to antibiotics, trigonal location, CADET BRAF positive in ~80% (specificity &gt;99%).' },
          { breeds: ['Dalmatian', 'English Bulldog'], tone: 'violet', html: 'urate uroliths (Dalmatian SLC2A9 mutation; also seen with PSS).' },
          { breeds: ['Miniature Schnauzer', 'Bichon', 'Yorkshire Terrier', 'Lhasa Apso', 'Pug'], tone: 'danger', html: 'calcium oxalate uroliths.' },
          { breeds: ['German Shepherd'], tone: 'warning', html: 'renal cystadenocarcinoma + nodular dermatofibrosis (RCND, autosomal-dominant FLCN mutation).' },
          { breeds: ['Boxer', 'German Shepherd', 'Scottish Terrier'], tone: 'info', html: 'idiopathic renal haematuria reported.' },
          { breeds: ['Sighthound', 'Greyhound'], tone: 'danger', html: 'CRGV / "Alabama rot" — haematuria + skin lesions + AKI.' },
          { breeds: ['Intact male, middle-aged–older'], group: 'signalment', tone: 'warning', html: 'BPH · bacterial prostatitis · prostatic abscess · prostatic adenocarcinoma (also in neutered males).' },
          { breeds: ['Bitch of any age'], group: 'signalment', tone: 'green', html: 'bacterial cystitis is the commonest LUT cause (E. coli predominates). Recurrent → look for underlying disease (HAC, DM, structural anomaly).' },
        ],
        cat: [
          { breeds: ['Young–middle-aged cat with LUTS'], group: 'signalment', tone: 'violet', html: '<strong>feline idiopathic cystitis (FIC)</strong> — commonest cause of LUTS under 10 yr. Stress-related; recurrent episodes.' },
          { breeds: ['LUTS + urolithiasis'], group: 'signalment', tone: 'warning', html: 'struvite (commercial diet — declining) or calcium oxalate (now commoner in some populations).' },
          { breeds: ['Male cat, stranguria + collapse + abdominal pain'], group: 'signalment', tone: 'danger', html: 'urethral obstruction (struvite plug, calcium oxalate, FIC-related) — life-threatening hyperkalaemia.' },
          { breeds: ['Older cat, persistent haematuria'], group: 'signalment', tone: 'green', html: 'bladder TCC / lymphoma (rare in cats) — ultrasound + cytology + CADET BRAF (rarely positive in cats).' },
          { breeds: ['Outdoor cat with anaemia + haemoglobinuria'], group: 'signalment', tone: 'info', html: 'Mycoplasma haemofelis, FeLV, oxidative haemolytic anaemia (onion, garlic, paracetamol — never give to cats), zinc.' },
          { breeds: ['CKD cat with concurrent UTI'], group: 'signalment', tone: 'warning', html: 'often subclinical — found on culture.' },
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        items: [
          `Male cat with stranguria + collapse = urethral obstruction (urgent unblocking + electrolytes)`,
          `Persistent haematuria refractory to antibiotic in older bitch = TCC until proven otherwise`,
          `Haematuria + pale gums + petechiae = coagulopathy or thrombocytopenia`,
          `Intact bitch + vulvar discharge + anorexia = pyometra`,
          `Acute renal failure + haematuria + pyrexia in unvaccinated dog = leptospirosis (zoonotic — PPE)`,
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Haematuria',
    blocks: [
      ...stepTable(1, 'OBSERVE FIRST', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Observe', { text: 'What it means', tone: 'teal' }],
        rows: [
          ['<strong>Hydration + perfusion</strong>', { text: bullets(['Tachycardia', 'Prolonged CRT', 'Weak pulses → shock from obstruction, sepsis or blood loss']), tone: 'danger' }],
          ['<strong>Posture</strong>', { text: bullets(['Hunched, painful → cystitis', 'Urolith', 'Pyelonephritis. Sometimes recumbent in an obstructed cat with hyperkalaemia']), tone: 'teal' }],
          ['<strong>Voiding behaviour</strong>', { text: bullets(['Stranguria', 'Pollakiuria', 'Periuria', 'Dribbling', 'No urine produced']), tone: 'teal' }],
          ['<strong>Discharge</strong>', { text: bullets(['Vulvar (pyometra · vaginitis · neoplasia)', 'Preputial (BPH · prostatic disease)', 'Urethral']), tone: 'teal' }],
          ['<strong>Mucous membranes</strong>', { text: bullets(['Pale (blood loss · haemolysis)', 'Petechiae (thrombocytopenia · vasculitis)', 'Icteric (haemolysis)']), tone: 'teal' }],
          ['<strong>Lameness / muscle pain</strong>', { text: bullets(['Rhabdomyolysis → myoglobinuria', 'ITP-related haemarthrosis']), tone: 'teal' }],
        ],
      }, '🩺'),

      { kind: 'step', text: '👋 STEP 2 — TARGETED PHYSICAL EXAM', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Abdominal palpation',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Kidneys</strong>', { text: bullets(['Size', 'Shape', 'Symmetry', 'Pain — pyelonephritis (painful, normal-sized)', 'Neoplasia (asymmetric, irregular mass)', 'Polycystic disease (Persian cat — irregular)']), tone: 'teal' }],
          ['<strong>Bladder</strong>', { text: bullets(['Distended + firm = obstructed (especially 🐱)', 'Thickened wall ± palpable mass = TCC', 'Polypoid cystitis']), tone: 'teal' }],
          ['<strong>Sublumbar lymph nodes</strong>', { text: bullets(['Prostatic adenocarcinoma', 'TCC metastasis', 'Anal sac adenocarcinoma']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Rectal, genital and systemic',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Digital rectal exam (DRE)</strong><br>mandatory in any male dog with LUTS or haematuria', { text: bullets(['Symmetric enlargement (BPH)', 'Asymmetric / firm / fixed (adenocarcinoma)', 'Painful + fluctuant (abscess)', 'Urethral mass at the pelvic urethra (trigonal TCC extending caudally)']), tone: 'teal' }],
          ['<strong>External genitalia — female</strong>', { text: bullets(['Vulvar discharge', 'Vaginal mass', 'TVT (cauliflower-like, friable, sexually transmitted)', 'Perineal hernia']), tone: 'teal' }],
          ['<strong>External genitalia — male</strong>', { text: bullets(['Preputial discharge', 'Penile / preputial mass', 'Urethral palpation along the os penis for stones', 'Testicular asymmetry (Sertoli or seminoma — can produce hyperestrogenism with thrombocytopenia → haematuria)']), tone: 'teal' }],
          ['<strong>Spinal palpation</strong>', { text: 'Rule out concurrent IVDD with urinary signs', tone: 'teal' }],
          ['<strong>Skin / mucosa for bleeding diathesis</strong>', { text: bullets(['Petechiae (thrombocytopenia)', 'Ecchymoses (clotting factor deficiency)', 'Epistaxis', 'Melaena', 'Gum bleeding']), tone: 'teal' }],
          ['<strong>Joint palpation</strong>', { text: bullets(['Haemarthrosis in factor deficiencies', 'Polyarthritis in vasculitis / SLE']), tone: 'teal' }],
        ],
      },

      ...stepPatterns(3, 'PATTERN RECOGNITION', {
        rows: [
          { section: 'Lower urinary tract — dog' },
          { cues: ['Female dog', 'pollakiuria + stranguria', 'culture-positive'], dx: 'Bacterial cystitis (E. coli)', tone: 'warning' },
          { cues: ['Female dog', 'persistent haematuria', 'refractory to antibiotic', 'trigonal mass on US'], dx: 'Bladder TCC (CADET BRAF)', tone: 'danger', emphasis: true },
          { section: 'Lower urinary tract — cat' },
          { cues: ['Cat &lt;10 yr', 'stress-related episodic LUTS', 'sterile urine'], dx: 'Feline idiopathic cystitis (FIC)', tone: 'green' },
          { cues: ['Male cat', 'stranguria', 'abdominal pain', 'collapse', 'firm bladder'], dx: 'Urethral obstruction (plug / urolith)', tone: 'danger', emphasis: true },
          { section: 'Prostate — intact male dog' },
          { cues: ['Intact male dog', 'tenesmus / dyschezia', 'asymmetric prostate'], dx: 'Prostatic adenocarcinoma', tone: 'danger' },
          { cues: ['Intact male dog', 'pyrexia + painful prostate', 'preputial reflux'], dx: 'Bacterial prostatitis / abscess', tone: 'danger' },
          { cues: ['Older intact male', 'symmetric mildly enlarged prostate', 'preputial blood'], dx: 'BPH', tone: 'warning' },
          { section: 'Reproductive tract — bitch' },
          { cues: ['Bitch', 'vulvar mucopurulent / sanguineous discharge', 'pyrexia', '4–8 wks post-oestrus'], dx: 'Pyometra', tone: 'danger', emphasis: true },
          { cues: ['Bitch in season', 'sanguineous vulvar discharge', 'clinically well'], dx: 'Oestrus (physiological)', tone: 'info' },
          { section: 'Kidney · systemic · pigmenturia' },
          { cues: ['Young dog with persistent unilateral renal haematuria'], dx: 'Idiopathic renal haematuria', tone: 'violet' },
          { cues: ['Pale gums', 'petechiae', 'haematuria'], dx: 'Thrombocytopenia / IMTP / DIC', tone: 'danger', emphasis: true },
          { cues: ['Pale gums', 'jaundice', 'haemoglobinuria'], dx: 'IMHA / Babesia / oxidative haemolysis', tone: 'danger' },
          { cues: ['Severe trauma', 'myalgia', 'dark urine', '↑↑ CK'], dx: 'Myoglobinuria (rhabdomyolysis)', tone: 'danger' },
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Haematuria — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Emergency', { text: 'Action', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Urethral obstruction</strong><br>cat plug · male dog urolith`, { text: bullets(['Firm bladder', 'Stranguria with no urine', 'Vomiting', 'Collapse → check serum K⁺, ECG (peaked T-waves, sine-wave), unblock urgently. 🐱 tail-pull-back + 24–26 G catheter (PRN sedation)', 'IV fluids', 'Treat hyperkalaemia (Ca-gluconate · insulin/dextrose)']), tone: 'danger' }],
          [`${numBadge(2)}<strong>Severe coagulopathy</strong>`, { text: bullets(['PT / aPTT', 'Platelet count', 'BMBT. Vitamin K1 for suspected rodenticide; fresh frozen plasma if bleeding']), tone: 'danger' }],
          [`${numBadge(3)}<strong>Septic pyelonephritis / pyometra</strong>`, { text: bullets(['Temperature', 'CBC', 'Biochemistry', 'Abdominal US → urgent IV antibiotics, and surgery for pyometra']), tone: 'danger' }],
          [`${numBadge(4)}<strong>Haemolytic crisis</strong><br>haemoglobinuria + severe anaemia`, { text: bullets(['CBC + smear', 'Agglutination', 'Coombs', 'Transfusion if required']), tone: 'danger' }],
          [`${numBadge(5)}<strong>Bladder rupture from trauma</strong>`, { text: 'Abdominal effusion creatinine &gt;2× serum creatinine → surgical exploration', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '🧪 STEP 2 — URINALYSIS (CYSTOCENTESIS WHEREVER POSSIBLE)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Component', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Sample choice</strong>', { text: bullets(['<strong>Cystocentesis</strong> is the gold standard for culture and avoids contamination from urethra / prepuce / vagina', 'Avoid only if the obstructed bladder is very distended (rupture risk in 🐱) or with coagulopathy']), tone: 'teal' }],
          ['<strong>Macroscopic</strong>', { text: bullets(['Red', 'Brown', 'Port-wine', 'Clear with red sediment']), tone: 'teal' }],
          ['<strong>USG</strong>', { text: bullets(['Hyposthenuria (CDI · NDI · PU/PD)', 'Isosthenuric (CKD · AKI)', 'Concentrated (normal hydrated)']), tone: 'teal' }],
          ['<strong>Dipstick</strong>', { text: bullets(['Blood (true haematuria <em>or</em> haemoglobin / myoglobin — discriminate by centrifuge)', 'Protein', 'Glucose', 'Ketones', 'pH']), tone: 'teal' }],
          ['<strong>Centrifuged supernatant</strong>', { text: bullets(['Clear with red sediment = true haematuria', 'Red supernatant = haemoglobinuria / myoglobinuria']), tone: 'teal' }],
          ['<strong>Sediment — cells</strong>', { text: bullets(['RBC per HPF', 'WBC + bacteria + epithelial cells → UTI', 'Bacteria: rods (Gram-negative — E. coli) vs cocci (Staph · Strep · Enterococcus)']), tone: 'teal' }],
          ['<strong>Sediment — crystals</strong>', { text: bullets(['Struvite (coffin lid)', 'Calcium oxalate monohydrate (picket fence / dumbbells)', 'Oxalate dihydrate (square envelope)', 'Urate (yellow-brown amorphous)', 'Cystine (hexagonal)']), tone: 'teal' }],
          ['<strong>Sediment — casts</strong>', { text: bullets(['Granular / cellular casts → renal tubular disease', 'RBC casts → glomerulonephritis or pyelonephritis']), tone: 'teal' }],
          ['<strong>Atypical epithelial cells</strong>', { text: 'TCC suspicion — cytology + CADET BRAF', tone: 'teal' }],
          ['<strong>UPC</strong>', { text: bullets(['After the sediment is bland — proteinuria interpretation requires an inactive sediment', 'Glomerular vs tubular protein loss']), tone: 'teal' }],
          ['<strong>Urine culture + sensitivity</strong>', { text: 'On <strong>every</strong> haematuria patient — submit even with clinically obvious cystitis (resistance is rising)', tone: 'teal' }],
        ],
      },

      ...stepTable(3, 'SYSTEMIC WORKUP', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'What it shows', tone: 'teal' }],
        rows: [
          ['<strong>CBC</strong>', { text: bullets(['Anaemia (chronic blood loss vs haemolysis)', 'Leucocytosis (UTI · prostatitis · pyelonephritis · pyometra)', 'Thrombocytopenia (IMTP · Ehrlichia · DIC)']), tone: 'teal' }],
          ['<strong>Biochemistry</strong>', { text: bullets(['Azotaemia (post-renal obstruction · pyelonephritis · AKI)', 'Hypercalcaemia (urolithiasis precipitator → check ionised Ca · PTHrp · AGASACA)', 'Hypoalbuminaemia (PLN · chronic UTI · hepatic)', 'Elevated CK / AST (myoglobinuria)', 'Elevated globulins (Ehrlichia · Leishmania · MM)']), tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: bullets(['PT', 'aPTT', 'BMBT', 'Platelet count if any bleeding suspected']), tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Hypertension can worsen renal haemorrhage and is a complication of CKD / endocrinopathy', tone: 'teal' }],
          ['<strong>Infectious workup</strong> (regional)', { text: bullets(['Leptospirosis MAT / PCR (<strong>zoonotic — PPE</strong>)', 'Ehrlichia / Anaplasma (4Dx test)', 'Babesia PCR', 'Leishmaniasis (Mediterranean / imported)']), tone: 'teal' }],
          ['<strong>Endocrine / metabolic</strong>', { text: bullets(['If PU/PD or recurrent UTI — HAC', 'DM', 'Hyperthyroidism (🐱)', 'Hypercalcaemia workup']), tone: 'teal' }],
          ['<strong>Faecal occult blood</strong>', { text: bullets(['If concurrent GI signs — HSA', 'GI ulcer (marked haemoglobin can give a false-positive urine dipstick)']), tone: 'teal' }],
        ],
      }, '🩸'),

      { kind: 'step', text: '📊 STEP 4 — IMAGING + ENDOSCOPY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Abdominal ultrasound — first-line imaging for haematuria',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Assess', tone: 'teal' }],
        rows: [
          ['<strong>Bladder</strong>', { text: bullets(['Wall thickness', 'Mass (location — trigonal TCC vs apical polyp)', 'Calculi (mobile vs adherent)', 'Debris']), tone: 'teal' }],
          ['<strong>Urethra</strong>', { text: 'The proximal urethra cannot be fully imaged by US — consider CT urethrogram or cystoscopy', tone: 'teal' }],
          ['<strong>Prostate</strong> (intact / neutered males)', { text: bullets(['Size', 'Symmetry', 'Cysts', 'Abscess', 'Neoplasia']), tone: 'teal' }],
          ['<strong>Kidneys</strong>', { text: bullets(['Size', 'Cortico-medullary definition', 'Pyelectasia (pyelonephritis or obstruction)', 'Mass', 'Calculi']), tone: 'teal' }],
          ['<strong>Ureters</strong>', { text: 'Dilated → obstruction', tone: 'teal' }],
          ['<strong>Sublumbar lymph nodes</strong>', { text: 'Metastasis', tone: 'teal' }],
          ['<strong>Abdominal effusion</strong>', { text: 'Bladder rupture — fluid creatinine vs serum', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Further imaging and endoscopy',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Test', { text: 'What it shows', tone: 'teal' }],
        rows: [
          ['<strong>Abdominal radiograph</strong>', { text: 'Radiopaque uroliths (calcium oxalate · calcium phosphate · struvite · silica) ± rectal contrast if indistinct', tone: 'teal' }],
          ['<strong>Contrast cystourethrogram</strong>', { text: bullets(['Filling defects', 'Urethral stricture', 'Ectopic ureter', 'Urachal anomalies', 'Fistulas']), tone: 'teal' }],
          ['<strong>CT</strong>', { text: bullets(['Staging neoplasia', 'Urethral disease', 'Retroperitoneal disease', 'Ureteric obstruction (CT urogram)']), tone: 'teal' }],
          ['<strong>Cystoscopy</strong>', { text: bullets(['Direct visualisation + biopsy of bladder / urethral mass — <strong>diagnostic gold standard for TCC</strong>. Female dogs and cats tolerate transurethral cystoscopy under sedation', 'Male dogs may require a percutaneous approach']), tone: 'teal' }],
          ['<strong>BRAF mutation testing</strong><br>CADET BRAF, voided urine PCR', { text: bullets(['Non-invasive screen for canine urothelial carcinoma — sensitivity ~80–85%, up to ~95% with the CADET BRAF-Plus reflex panel', 'Specificity &gt;99%. A positive test is highly confirmatory', 'A negative does <strong>not</strong> rule out TCC']), tone: 'teal' }],
          ['<strong>Vaginoscopy</strong>', { text: 'Persistent vaginal haematuria in an intact or spayed female with no other source', tone: 'teal' }],
        ],
      },

      ...stepTable(5, 'SPECIFIC TREATMENT POINTERS', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Diagnosis', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Bacterial cystitis</strong>', { text: 'Culture-driven antibiotic for 3–7 days (uncomplicated) or 4 weeks (complicated — pyelonephritis · prostatitis · structural anomaly). Subclinical bacteriuria often does not need treatment in dogs / cats per ISCAID 2019', tone: 'teal' }],
          ['<strong>FIC</strong>', { text: bullets(['Multimodal stress reduction', 'Environmental enrichment', 'Increase water intake', 'Wet diet', 'Urinary calming pheromones', 'Gabapentin / amitriptyline for refractory cases']), tone: 'teal' }],
          ['<strong>Urolithiasis</strong>', { text: bullets(['Medical dissolution (struvite — special diet ± antibiotic)', 'Surgical removal (calcium oxalate · refractory urate · urethral obstruction)', 'Urohydropropulsion for small bladder stones']), tone: 'teal' }],
          ['<strong>Urethral obstruction (🐱)</strong>', { text: bullets(['Unblock + IV fluids + Ca-gluconate + insulin / glucose for hyperkalaemia → urethral catheter 1–3 days', 'Long-term FIC management']), tone: 'teal' }],
          ['<strong>Urothelial carcinoma (TCC)</strong>', { text: bullets(['NSAID (piroxicam · deracoxib) + cytotoxic chemotherapy (mitoxantrone · carboplatin · vinblastine)', 'CADET BRAF for monitoring', 'Refer for stenting if urethral obstruction']), tone: 'teal' }],
          ['<strong>BPH</strong>', { text: 'Castration — resolves within weeks–months; medical (osaterone · finasteride) for non-castration candidates', tone: 'teal' }],
          ['<strong>Bacterial prostatitis</strong>', { text: bullets(['4–6 weeks fluoroquinolone or trimethoprim-sulpha (blood-prostate barrier penetration)', 'Abscess → drainage', 'Consider castration']), tone: 'teal' }],
          ['<strong>Pyometra</strong>', { text: bullets(['Stabilise + OHE (gold standard)', 'Medical management (aglepristone ± antibiotics) only for breeding bitches with open pyometra']), tone: 'teal' }],
          ['<strong>Idiopathic renal haematuria</strong>', { text: 'Medical management often unsuccessful — refer for sclerotherapy or ureteral occlusion / nephrectomy if uncontrolled', tone: 'teal' }],
          ['<strong>Anticoagulant rodenticide</strong>', { text: bullets(['Vitamin K1 5 mg/kg/day for 3–4 weeks', 'Fresh frozen plasma if active bleeding']), tone: 'teal' }],
          ['<strong>IMTP / IMHA</strong>', { text: bullets(['Prednisolone 2 mg/kg/day + adjunct (mycophenolate · cyclosporine · vincristine)', 'Avoid blood products without typing for IMHA']), tone: 'teal' }],
        ],
      }, '💉'),
    ],
    after: [
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Sample handling pearls:</strong><br>
  • Cystocentesis &gt; catheterised &gt; free catch for culture (contamination matters).<br>
  • Process urine within 30 minutes or refrigerate; old urine = false casts, lysed RBC, in-vitro crystallisation.<br>
  • Mild traumatic haematuria post-cystocentesis is expected — repeat sample in 24 h if confused.<br>
  • Always centrifuge: red supernatant rules in haemoglobinuria / myoglobinuria.<br>
  • Free-catch urine samples in entire females will often contain blood during oestrus — clinical correlation essential.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
