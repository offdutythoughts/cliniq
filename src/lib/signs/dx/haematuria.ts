// ── Haematuria — diagnostic approach (data) ─────────────────────────────────
// Migration of haematuriaDx{History,Exam,Dx}Html (legacy HTML consts in
// ../haematuria.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const haematuriaDx: DxApproach = {
  title: 'Haematuria',
  tabs: {

  history: {
    title: 'History: Haematuria',
    blocks: [
      { kind: 'branch', text: 'TRUE HAEMATURIA vs HAEMOGLOBINURIA vs MYOGLOBINURIA vs PIGMENT' },
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
          ['<strong>Initial</strong> — first jet', { text: 'Urethra (distal) · prepuce · vulva / vagina · prostate', tone: 'teal' }],
          ['<strong>Terminal</strong> — final jet', { text: 'Bladder trigone / neck · proximal urethra · prostate', tone: 'teal' }],
          ['<strong>Total / throughout</strong>', { text: 'Bladder body <em>or</em> upper tract — uniform mixing', tone: 'teal' }],
          ['<strong>Independent of voiding</strong> — drips between voids', { text: 'Urethra · prostate (males) · vagina · vulva', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Concurrent LUTS?',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Pattern', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pollakiuria + stranguria + dysuria + small volumes</strong>', { text: 'Bladder / urethra — cystitis · urolith · TCC · FIC · prostatic disease', tone: 'teal' }],
          ['<strong>Normal volumes + non-painful</strong>', { text: 'Upper tract (renal haematuria · idiopathic renal haematuria · pyelonephritis is often painless) · genital · systemic / pseudo', tone: 'teal' }],
          ['<strong>PU/PD + haematuria</strong>', { text: 'Pyelonephritis · renal neoplasia · hypercalcaemia with urolithiasis · hyperadrenocorticism with UTI', tone: 'teal' }],
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
          ['<strong>NSAIDs / corticosteroids</strong>', { text: 'GI ulcer · renal papillary necrosis (rare)', tone: 'teal' }],
          ['<strong>Cyclophosphamide</strong>', { text: 'Sterile haemorrhagic cystitis — concurrent IMHA / lymphoma chemotherapy', tone: 'teal' }],
          ['<strong>Heparin · dabigatran · rivaroxaban</strong>', { text: 'Anticoagulation', tone: 'teal' }],
          ['<strong>Onion / garlic / zinc</strong>', { text: 'Heinz body haemolytic anaemia → haemoglobinuria (🐱 very sensitive)', tone: 'teal' }],
          ['<strong>Snake envenomation</strong>', { text: 'Coagulopathy + rhabdomyolysis', tone: 'teal' }],
          ['<strong>Vitamin D rodenticide</strong>', { text: 'Hypercalcaemia → urolithiasis', tone: 'teal' }],
          ['<strong>Trauma</strong> — RTA · falls · kicks', { text: 'Renal contusion / rupture · bladder rupture · urethral tear', tone: 'teal' }],
          ['<strong>Recent procedures</strong>', { text: 'Cystocentesis (mild traumatic haematuria expected ~24 h) · catheterisation · recent urinary surgery', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🩺 STEP 3 — SYSTEMIC HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Concurrent picture', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>PU/PD + haematuria</strong>', { text: 'Hypercalcaemia (lymphoma · anal sac adenocarcinoma · hyperparathyroidism — increases urolithiasis risk) · hyperadrenocorticism (calcium oxalate urolithiasis, UTI) · CKD with concurrent UTI', tone: 'teal' }],
          ['<strong>Weight loss + haematuria + older animal</strong>', { text: 'Urothelial / prostatic / renal neoplasia', tone: 'teal' }],
          ['<strong>Pyrexia + haematuria</strong>', { text: 'Pyelonephritis (often back / lumbar pain) · prostatitis (intact male — testicular swelling possible) · pyometra (intact bitch with vulvar discharge) · septic UTI · leptospirosis', tone: 'teal' }],
          ['<strong>Concurrent dermatitis / joint pain / mucosal bleeding</strong>', { text: 'Immune-mediated polysystemic disease — IMTP · vasculitis · SLE', tone: 'teal' }],
          ['<strong>Pale gums / collapse / haematuria</strong>', { text: 'Haemolysis vs blood loss + coagulopathy — CBC + smear + PT/aPTT', tone: 'teal' }],
          ['<strong>Recent travel / tick exposure</strong>', { text: 'Ehrlichia · Babesia · Leishmania → thrombocytopenia + haematuria', tone: 'teal' }],
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
        html: `Male cat with stranguria + collapse = urethral obstruction (urgent unblocking + electrolytes) · Persistent haematuria refractory to antibiotic in older bitch = TCC until proven otherwise · Haematuria + pale gums + petechiae = coagulopathy or thrombocytopenia · Intact bitch + vulvar discharge + anorexia = pyometra · Acute renal failure + haematuria + pyrexia in unvaccinated dog = leptospirosis (zoonotic — PPE)`,
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
          ['<strong>Hydration + perfusion</strong>', { text: 'Tachycardia · prolonged CRT · weak pulses → shock from obstruction, sepsis or blood loss', tone: 'danger' }],
          ['<strong>Posture</strong>', { text: 'Hunched, painful → cystitis · urolith · pyelonephritis. Sometimes recumbent in an obstructed cat with hyperkalaemia', tone: 'teal' }],
          ['<strong>Voiding behaviour</strong>', { text: 'Stranguria · pollakiuria · periuria · dribbling · no urine produced', tone: 'teal' }],
          ['<strong>Discharge</strong>', { text: 'Vulvar (pyometra · vaginitis · neoplasia) · preputial (BPH · prostatic disease) · urethral', tone: 'teal' }],
          ['<strong>Mucous membranes</strong>', { text: 'Pale (blood loss · haemolysis) · petechiae (thrombocytopenia · vasculitis) · icteric (haemolysis)', tone: 'teal' }],
          ['<strong>Lameness / muscle pain</strong>', { text: 'Rhabdomyolysis → myoglobinuria · ITP-related haemarthrosis', tone: 'teal' }],
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
          ['<strong>Kidneys</strong>', { text: 'Size · shape · symmetry · pain — pyelonephritis (painful, normal-sized) · neoplasia (asymmetric, irregular mass) · polycystic disease (Persian cat — irregular)', tone: 'teal' }],
          ['<strong>Bladder</strong>', { text: 'Distended + firm = obstructed (especially 🐱) · thickened wall ± palpable mass = TCC · polypoid cystitis', tone: 'teal' }],
          ['<strong>Sublumbar lymph nodes</strong>', { text: 'Prostatic adenocarcinoma · TCC metastasis · anal sac adenocarcinoma', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Rectal, genital and systemic',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Digital rectal exam (DRE)</strong><br>mandatory in any male dog with LUTS or haematuria', { text: 'Symmetric enlargement (BPH) · asymmetric / firm / fixed (adenocarcinoma) · painful + fluctuant (abscess) · urethral mass at the pelvic urethra (trigonal TCC extending caudally)', tone: 'teal' }],
          ['<strong>External genitalia — female</strong>', { text: 'Vulvar discharge · vaginal mass · TVT (cauliflower-like, friable, sexually transmitted) · perineal hernia', tone: 'teal' }],
          ['<strong>External genitalia — male</strong>', { text: 'Preputial discharge · penile / preputial mass · urethral palpation along the os penis for stones · testicular asymmetry (Sertoli or seminoma — can produce hyperestrogenism with thrombocytopenia → haematuria)', tone: 'teal' }],
          ['<strong>Spinal palpation</strong>', { text: 'Rule out concurrent IVDD with urinary signs', tone: 'teal' }],
          ['<strong>Skin / mucosa for bleeding diathesis</strong>', { text: 'Petechiae (thrombocytopenia) · ecchymoses (clotting factor deficiency) · epistaxis · melaena · gum bleeding', tone: 'teal' }],
          ['<strong>Joint palpation</strong>', { text: 'Haemarthrosis in factor deficiencies · polyarthritis in vasculitis / SLE', tone: 'teal' }],
        ],
      },

      ...stepTable(3, 'PATTERN RECOGNITION', {
        cols: '1fr 1.2fr',
        dividers: true,
        headers: ['Finding', { text: 'Most likely', tone: 'teal' }],
        rows: [
          ['Female dog · pollakiuria + stranguria · culture-positive', { text: 'Bacterial cystitis (E. coli)', tone: 'warning' }],
          ['Female dog · persistent haematuria · refractory to antibiotic · trigonal mass on US', { text: 'Bladder TCC (CADET BRAF)', tone: 'danger' }],
          ['Cat &lt;10 yr · stress-related episodic LUTS · sterile urine', { text: 'Feline idiopathic cystitis (FIC)', tone: 'green' }],
          ['Male cat · stranguria + abdominal pain + collapse + firm bladder', { text: 'Urethral obstruction (plug / urolith)', tone: 'danger' }],
          ['Intact male dog · tenesmus / dyschezia · asymmetric prostate', { text: 'Prostatic adenocarcinoma', tone: 'danger' }],
          ['Intact male dog · pyrexia + painful prostate + preputial reflux', { text: 'Bacterial prostatitis / abscess', tone: 'danger' }],
          ['Older intact male · symmetric mildly enlarged prostate · preputial blood', { text: 'BPH', tone: 'warning' }],
          ['Bitch · vulvar mucopurulent / sanguineous discharge · pyrexia · 4–8 wks post-oestrus', { text: 'Pyometra', tone: 'danger' }],
          ['Bitch in season · sanguineous vulvar discharge · clinically well', { text: 'Oestrus (physiological)', tone: 'info' }],
          ['Young dog with persistent unilateral renal haematuria', { text: 'Idiopathic renal haematuria', tone: 'violet' }],
          ['Pale gums + petechiae + haematuria', { text: 'Thrombocytopenia / IMTP / DIC', tone: 'danger' }],
          ['Pale gums + jaundice + haemoglobinuria', { text: 'IMHA / Babesia / oxidative haemolysis', tone: 'danger' }],
          ['Severe trauma + myalgia + dark urine + ↑↑ CK', { text: 'Myoglobinuria (rhabdomyolysis)', tone: 'danger' }],
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
          [`${numBadge(1)}<strong>Urethral obstruction</strong><br>cat plug · male dog urolith`, { text: 'Firm bladder · stranguria with no urine · vomiting · collapse → check serum K⁺, ECG (peaked T-waves, sine-wave), unblock urgently. 🐱 tail-pull-back + 24–26 G catheter (PRN sedation) · IV fluids · treat hyperkalaemia (Ca-gluconate · insulin/dextrose)', tone: 'danger' }],
          [`${numBadge(2)}<strong>Severe coagulopathy</strong>`, { text: 'PT / aPTT · platelet count · BMBT. Vitamin K1 for suspected rodenticide; fresh frozen plasma if bleeding', tone: 'danger' }],
          [`${numBadge(3)}<strong>Septic pyelonephritis / pyometra</strong>`, { text: 'Temperature · CBC · biochemistry · abdominal US → urgent IV antibiotics, and surgery for pyometra', tone: 'danger' }],
          [`${numBadge(4)}<strong>Haemolytic crisis</strong><br>haemoglobinuria + severe anaemia`, { text: 'CBC + smear · agglutination · Coombs · transfusion if required', tone: 'danger' }],
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
          ['<strong>Sample choice</strong>', { text: '<strong>Cystocentesis</strong> is the gold standard for culture and avoids contamination from urethra / prepuce / vagina. Avoid only if the obstructed bladder is very distended (rupture risk in 🐱) or with coagulopathy', tone: 'teal' }],
          ['<strong>Macroscopic</strong>', { text: 'Red · brown · port-wine · clear with red sediment', tone: 'teal' }],
          ['<strong>USG</strong>', { text: 'Hyposthenuria (CDI · NDI · PU/PD) · isosthenuric (CKD · AKI) · concentrated (normal hydrated)', tone: 'teal' }],
          ['<strong>Dipstick</strong>', { text: 'Blood (true haematuria <em>or</em> haemoglobin / myoglobin — discriminate by centrifuge) · protein · glucose · ketones · pH', tone: 'teal' }],
          ['<strong>Centrifuged supernatant</strong>', { text: 'Clear with red sediment = true haematuria · red supernatant = haemoglobinuria / myoglobinuria', tone: 'teal' }],
          ['<strong>Sediment — cells</strong>', { text: 'RBC per HPF · WBC + bacteria + epithelial cells → UTI · bacteria: rods (Gram-negative — E. coli) vs cocci (Staph · Strep · Enterococcus)', tone: 'teal' }],
          ['<strong>Sediment — crystals</strong>', { text: 'Struvite (coffin lid) · calcium oxalate monohydrate (picket fence / dumbbells) · oxalate dihydrate (square envelope) · urate (yellow-brown amorphous) · cystine (hexagonal)', tone: 'teal' }],
          ['<strong>Sediment — casts</strong>', { text: 'Granular / cellular casts → renal tubular disease · RBC casts → glomerulonephritis or pyelonephritis', tone: 'teal' }],
          ['<strong>Atypical epithelial cells</strong>', { text: 'TCC suspicion — cytology + CADET BRAF', tone: 'teal' }],
          ['<strong>UPC</strong>', { text: 'After the sediment is bland — proteinuria interpretation requires an inactive sediment. Glomerular vs tubular protein loss', tone: 'teal' }],
          ['<strong>Urine culture + sensitivity</strong>', { text: 'On <strong>every</strong> haematuria patient — submit even with clinically obvious cystitis (resistance is rising)', tone: 'teal' }],
        ],
      },

      ...stepTable(3, 'SYSTEMIC WORKUP', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'What it shows', tone: 'teal' }],
        rows: [
          ['<strong>CBC</strong>', { text: 'Anaemia (chronic blood loss vs haemolysis) · leucocytosis (UTI · prostatitis · pyelonephritis · pyometra) · thrombocytopenia (IMTP · Ehrlichia · DIC)', tone: 'teal' }],
          ['<strong>Biochemistry</strong>', { text: 'Azotaemia (post-renal obstruction · pyelonephritis · AKI) · hypercalcaemia (urolithiasis precipitator → check ionised Ca · PTHrp · AGASACA) · hypoalbuminaemia (PLN · chronic UTI · hepatic) · elevated CK / AST (myoglobinuria) · elevated globulins (Ehrlichia · Leishmania · MM)', tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: 'PT · aPTT · BMBT · platelet count if any bleeding suspected', tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Hypertension can worsen renal haemorrhage and is a complication of CKD / endocrinopathy', tone: 'teal' }],
          ['<strong>Infectious workup</strong> (regional)', { text: 'Leptospirosis MAT / PCR (<strong>zoonotic — PPE</strong>) · Ehrlichia / Anaplasma (4Dx test) · Babesia PCR · leishmaniasis (Mediterranean / imported)', tone: 'teal' }],
          ['<strong>Endocrine / metabolic</strong>', { text: 'If PU/PD or recurrent UTI — HAC · DM · hyperthyroidism (🐱) · hypercalcaemia workup', tone: 'teal' }],
          ['<strong>Faecal occult blood</strong>', { text: 'If concurrent GI signs — HSA · GI ulcer (marked haemoglobin can give a false-positive urine dipstick)', tone: 'teal' }],
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
          ['<strong>Bladder</strong>', { text: 'Wall thickness · mass (location — trigonal TCC vs apical polyp) · calculi (mobile vs adherent) · debris', tone: 'teal' }],
          ['<strong>Urethra</strong>', { text: 'The proximal urethra cannot be fully imaged by US — consider CT urethrogram or cystoscopy', tone: 'teal' }],
          ['<strong>Prostate</strong> (intact / neutered males)', { text: 'Size · symmetry · cysts · abscess · neoplasia', tone: 'teal' }],
          ['<strong>Kidneys</strong>', { text: 'Size · cortico-medullary definition · pyelectasia (pyelonephritis or obstruction) · mass · calculi', tone: 'teal' }],
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
          ['<strong>Contrast cystourethrogram</strong>', { text: 'Filling defects · urethral stricture · ectopic ureter · urachal anomalies · fistulas', tone: 'teal' }],
          ['<strong>CT</strong>', { text: 'Staging neoplasia · urethral disease · retroperitoneal disease · ureteric obstruction (CT urogram)', tone: 'teal' }],
          ['<strong>Cystoscopy</strong>', { text: 'Direct visualisation + biopsy of bladder / urethral mass — <strong>diagnostic gold standard for TCC</strong>. Female dogs and cats tolerate transurethral cystoscopy under sedation; male dogs may require a percutaneous approach', tone: 'teal' }],
          ['<strong>BRAF mutation testing</strong><br>CADET BRAF, voided urine PCR', { text: 'Non-invasive screen for canine urothelial carcinoma — sensitivity ~80–85%, up to ~95% with the CADET BRAF-Plus reflex panel; specificity &gt;99%. A positive test is highly confirmatory; a negative does <strong>not</strong> rule out TCC', tone: 'teal' }],
          ['<strong>Vaginoscopy</strong>', { text: 'Persistent vaginal haematuria in an intact or spayed female with no other source', tone: 'teal' }],
        ],
      },

      ...stepTable(5, 'SPECIFIC TREATMENT POINTERS', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Diagnosis', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Bacterial cystitis</strong>', { text: 'Culture-driven antibiotic for 3–7 days (uncomplicated) or 4 weeks (complicated — pyelonephritis · prostatitis · structural anomaly). Subclinical bacteriuria often does not need treatment in dogs / cats per ISCAID 2019', tone: 'teal' }],
          ['<strong>FIC</strong>', { text: 'Multimodal stress reduction · environmental enrichment · increase water intake · wet diet · urinary calming pheromones · gabapentin / amitriptyline for refractory cases', tone: 'teal' }],
          ['<strong>Urolithiasis</strong>', { text: 'Medical dissolution (struvite — special diet ± antibiotic) · surgical removal (calcium oxalate · refractory urate · urethral obstruction) · urohydropropulsion for small bladder stones', tone: 'teal' }],
          ['<strong>Urethral obstruction (🐱)</strong>', { text: 'Unblock + IV fluids + Ca-gluconate + insulin / glucose for hyperkalaemia → urethral catheter 1–3 days; long-term FIC management', tone: 'teal' }],
          ['<strong>Urothelial carcinoma (TCC)</strong>', { text: 'NSAID (piroxicam · deracoxib) + cytotoxic chemotherapy (mitoxantrone · carboplatin · vinblastine) · CADET BRAF for monitoring · refer for stenting if urethral obstruction', tone: 'teal' }],
          ['<strong>BPH</strong>', { text: 'Castration — resolves within weeks–months; medical (osaterone · finasteride) for non-castration candidates', tone: 'teal' }],
          ['<strong>Bacterial prostatitis</strong>', { text: '4–6 weeks fluoroquinolone or trimethoprim-sulpha (blood-prostate barrier penetration) · abscess → drainage · consider castration', tone: 'teal' }],
          ['<strong>Pyometra</strong>', { text: 'Stabilise + OHE (gold standard). Medical management (aglepristone ± antibiotics) only for breeding bitches with open pyometra', tone: 'teal' }],
          ['<strong>Idiopathic renal haematuria</strong>', { text: 'Medical management often unsuccessful — refer for sclerotherapy or ureteral occlusion / nephrectomy if uncontrolled', tone: 'teal' }],
          ['<strong>Anticoagulant rodenticide</strong>', { text: 'Vitamin K1 5 mg/kg/day for 3–4 weeks · fresh frozen plasma if active bleeding', tone: 'teal' }],
          ['<strong>IMTP / IMHA</strong>', { text: 'Prednisolone 2 mg/kg/day + adjunct (mycophenolate · cyclosporine · vincristine) · avoid blood products without typing for IMHA', tone: 'teal' }],
        ],
      }, '💉'),
    ],
    after: [
      {
        kind: 'alert',
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
