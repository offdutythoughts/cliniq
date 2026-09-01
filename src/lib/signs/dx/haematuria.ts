// ── Haematuria — diagnostic approach (data) ─────────────────────────────────
// Migration of haematuriaDx{History,Exam,Dx}Html (legacy HTML consts in
// ../haematuria.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const haematuriaDx: DxApproach = {
  title: 'Haematuria',
  tabs: {

  history: {
    title: 'History: Haematuria',
    blocks: [
      { kind: 'branch', text: 'TRUE HAEMATURIA vs HAEMOGLOBINURIA vs MYOGLOBINURIA vs PIGMENT' },
      {
        kind: 'check',
        html: `All three give positive dipstick blood. The key bedside discriminator is to <strong>centrifuge the urine</strong>:<br>
    • <strong>Red sediment + clear supernatant</strong> → true haematuria (RBCs intact).<br>
    • <strong>Red supernatant + minimal sediment</strong> → haemoglobinuria (intravascular haemolysis, recent intense exercise, in-vitro lysis if delayed processing) or myoglobinuria (rhabdomyolysis, severe trauma, heatstroke, snake envenomation, capture myopathy).<br>
    • <strong>Concurrent CBC anaemia + jaundice ± agglutination / spherocytes</strong> → IMHA / haemolytic process — see LOC-JD-PREHEP.<br>
    • <strong>Severely elevated CK + AST</strong> → myoglobinuria from muscle injury.<br>
    • <strong>Pigmenturia from dietary or drug source</strong> (beetroot, food dye, rifampin, phenazopyridine) — dipstick negative for blood.`,
      },
      { kind: 'step', text: '📋 STREAM-TIMING + VOIDING HISTORY' },
      {
        kind: 'check',
        html: `Always ask the owner exactly when blood appears in the stream:<br>
    • <strong>Initial haematuria</strong> (first jet) → urethra (distal), prepuce, vulva / vagina, prostate.<br>
    • <strong>Terminal haematuria</strong> (final jet) → bladder trigone / neck, proximal urethra, prostate.<br>
    • <strong>Total / throughout</strong> → bladder body OR upper tract (uniform mixing).<br>
    • <strong>Independent of voiding</strong> (drips between voids) → urethra, prostate (in males), vagina, vulva.<br><br>
    <strong>Concurrent LUTS?</strong><br>
    • Pollakiuria + stranguria + dysuria + small volumes → bladder / urethra (cystitis, urolith, TCC, FIC, prostatic disease).<br>
    • Normal volumes + non-painful → upper tract (renal haematuria, idiopathic renal haematuria, pyelonephritis often painless), genital, or systemic / pseudo.<br>
    • PU/PD + haematuria → pyelonephritis, renal neoplasia, hypercalcaemia with urolithiasis, hyperadrenocorticism with UTI.<br><br>
    <strong>Obstruction red flags:</strong> straining + no urine produced + abdominal pain + collapse / vomiting → urethral obstruction (cat plug; male dog urolith) — emergency.`,
      },
      { kind: 'step', text: '💊 DRUG / TOXIN / TRAUMA HISTORY' },
      {
        kind: 'check',
        html: `<strong>Bleeding-related:</strong><br>
    • Anticoagulant rodenticide (warfarin, brodifacoum, bromadiolone) — haematuria can be the first sign before generalised bleeding<br>
    • NSAIDs / corticosteroids → GI ulcer / renal papillary necrosis (rare)<br>
    • Cyclophosphamide → sterile haemorrhagic cystitis (concurrent IMHA / lymphoma chemotherapy)<br>
    • Heparin, dabigatran, rivaroxaban<br>
    <strong>Toxins:</strong><br>
    • Onion / garlic / zinc → Heinz body haemolytic anaemia → haemoglobinuria (cat very sensitive)<br>
    • Snake envenomation → coagulopathy + rhabdomyolysis<br>
    • Vitamin D rodenticide → hypercalcaemia → urolithiasis<br>
    <strong>Trauma:</strong> RTA, falls, kicks → renal contusion / rupture, bladder rupture, urethral tear<br>
    <strong>Recent procedures:</strong> cystocentesis (mild traumatic haematuria expected ~24 h), catheterisation, recent urinary surgery`,
      },
      { kind: 'step', text: '🩺 SYSTEMIC HISTORY' },
      {
        kind: 'check',
        html: `<strong>PU/PD + haematuria:</strong> hypercalcaemia (lymphoma, anal sac adenocarcinoma, hyperparathyroidism — increases urolithiasis risk), hyperadrenocorticism (calcium oxalate urolithiasis, UTI), CKD with concurrent UTI.<br>
    <strong>Weight loss + haematuria + older animal:</strong> urothelial / prostatic / renal neoplasia.<br>
    <strong>Pyrexia + haematuria:</strong> pyelonephritis (often back/lumbar pain), prostatitis (intact male — testicular swelling possible), pyometra (intact bitch with vulvar discharge), septic UTI, leptospirosis.<br>
    <strong>Concurrent dermatitis / joint pain / mucosal bleeding:</strong> immune-mediated polysystemic disease (IMTP, vasculitis, SLE).<br>
    <strong>Pale gums / collapse / haematuria:</strong> haemolysis vs blood loss + coagulopathy — CBC + smear + PT/aPTT.<br>
    <strong>Recent travel / tick exposure:</strong> Ehrlichia, Babesia, Leishmania → thrombocytopenia + haematuria.<br>
    <strong>Intact female with anorexia + vulvar discharge ± PU/PD ± vomiting:</strong> pyometra — urgent surgical / medical management.<br>
    <strong>Intact male with tenesmus + dysuria + dyschezia:</strong> prostatic disease — DRE + ultrasound.`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:var(--tone-danger-fg);">Older bitch (especially Scottie, WHWT, Beagle, Shetland Sheepdog)</strong><br>→ <strong>Urothelial carcinoma (TCC)</strong> — persistent haematuria refractory to antibiotic, trigonal location, CADET BRAF positive in ~80% (specificity &gt;99%).<br><br>
        <strong style="color:var(--tone-warning-fg);">Intact male middle-aged–older dog</strong><br>→ BPH · bacterial prostatitis · prostatic abscess · prostatic adenocarcinoma (also in neutered males).<br><br>
        <strong style="color:var(--tone-green-fg);">Bitches of any age</strong><br>→ Bacterial cystitis is the most common LUT cause (E. coli predominates). Recurrent → consider underlying disease (HAC, DM, structural anomaly).<br><br>
        <strong style="color:var(--tone-violet-fg);">Dalmatian, English Bulldog</strong> → urate uroliths (Dalmatian SLC2A9 mutation; uroliths can also be from PSS).<br><br>
        <strong style="color:var(--tone-danger-fg);">Miniature Schnauzer, Bichon, Yorkie, Lhasa Apso, Pug</strong> → calcium oxalate uroliths.<br><br>
        <strong style="color:var(--tone-warning-fg);">German Shepherd</strong> → renal cystadenocarcinoma + nodular dermatofibrosis (RCND, autosomal-dominant FLCN mutation).<br><br>
        <strong style="color:var(--tone-info-fg);">Boxer, GSD, Scottie</strong> → idiopathic renal haematuria reported.<br><br>
        <strong style="color:var(--tone-danger-fg);">Sighthounds, Greyhounds</strong> → idiopathic cutaneous and renal glomerular vasculopathy ("Alabama rot" / CRGV) — haematuria + skin lesions + AKI.
      </div>
      <div>
        <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:var(--tone-violet-fg);">Young–middle-aged cat with LUTS</strong><br>→ <strong>Feline idiopathic cystitis (FIC)</strong> — most common cause of LUTS in cats &lt;10 yr. Stress-related; recurrent episodes.<br><br>
        <strong style="color:var(--tone-warning-fg);">Cat with LUTS + urolithiasis</strong><br>→ Struvite (commercial diet — declining) or calcium oxalate (more common now in some populations).<br><br>
        <strong style="color:var(--tone-danger-fg);">Male cat with stranguria + collapse + abdominal pain</strong><br>→ Urethral obstruction (struvite plug, calcium oxalate, FIC-related) — life-threatening hyperkalaemia.<br><br>
        <strong style="color:var(--tone-green-fg);">Older cat with persistent haematuria</strong><br>→ Bladder TCC / lymphoma (rare in cats) — ultrasound + cytology + CADET BRAF (rare positivity in cats).<br><br>
        <strong style="color:var(--tone-info-fg);">Outdoor cat with anaemia + haemoglobinuria</strong><br>→ Mycoplasma haemofelis, FeLV, oxidative haemolytic anaemia (onion, garlic, paracetamol — DO NOT give to cats), zinc.<br><br>
        <strong style="color:var(--tone-warning-fg);">CKD cat with concurrent UTI</strong> — often subclinical, found on culture.
      </div>
    </div>`,
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
      { kind: 'step', text: '🩺 STEP 1 — OBSERVE FIRST' },
      {
        kind: 'check',
        html: `• <strong>Hydration + perfusion</strong>: tachycardia, prolonged CRT, weak pulses → shock from obstruction, sepsis, or blood loss.<br>
    • <strong>Posture</strong>: hunched, painful → cystitis / urolith / pyelonephritis. Sometimes recumbent in obstructed cat with hyperkalaemia.<br>
    • <strong>Voiding behaviour</strong>: stranguria, pollakiuria, periuria, dribbling, no urine produced.<br>
    • <strong>Discharge</strong>: vulvar (pyometra, vaginitis, neoplasia), preputial (BPH, prostatic disease), urethral.<br>
    • <strong>Mucous membranes</strong>: pale (blood loss, haemolysis), petechiae (thrombocytopenia, vasculitis), icteric (haemolysis).<br>
    • <strong>Lameness / muscle pain</strong>: rhabdomyolysis → myoglobinuria; ITP-related haemarthrosis.`,
      },
      { kind: 'step', text: '👋 STEP 2 — TARGETED PHYSICAL EXAM' },
      {
        kind: 'check',
        html: `<strong>Abdominal palpation:</strong>
    <div style="margin-left:8px;">
      • Kidney size, shape, symmetry, pain: pyelonephritis (painful, normal-sized), neoplasia (asymmetric mass, irregular), polycystic disease (Persian cat — irregular).<br>
      • Bladder: distended + firm = obstructed (especially cat); thickened wall ± palpable mass = TCC, polypoid cystitis.<br>
      • Sublumbar lymphadenopathy: prostatic adenocarcinoma, TCC metastasis, anal sac adenocarcinoma.
    </div>
    <strong>Digital rectal exam (DRE):</strong> mandatory in any male dog with LUTS or haematuria — symmetric enlargement (BPH), asymmetric / firm / fixed (adenocarcinoma), painful + fluctuant (abscess), urethral mass at pelvic urethra (TCC of trigone extending caudally).<br>
    <strong>External genitalia exam:</strong>
    <div style="margin-left:8px;">
      • Female: vulvar discharge, vaginal mass, TVT (caulifloweresque, easily friable, sexually transmitted), perineal hernia.<br>
      • Male: preputial discharge, penile / preputial mass, urethral palpation along os penis for stones, testicular asymmetry (Sertoli or seminoma — can produce hyperestrogenism with thrombocytopenia → haematuria).
    </div>
    <strong>Spinal palpation:</strong> rule out concurrent IVDD with urinary signs.<br>
    <strong>Skin / mucosa for bleeding diathesis:</strong> petechiae (thrombocytopenia), ecchymoses (clotting factor deficiency), epistaxis, melaena, gum bleeding.<br>
    <strong>Joint palpation:</strong> haemarthrosis in factor deficiencies; polyarthritis in vasculitis / SLE.`,
      },
      { kind: 'step', text: '🔍 STEP 3 — PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Female dog · pollakiuria + stranguria · culture-positive</div><div style="color:var(--tone-warning-fg);">Bacterial cystitis (E. coli)</div>
      <div>Female dog · persistent haematuria · refractory to antibiotic · trigonal mass on US</div><div style="color:var(--tone-danger-title);">Bladder TCC (CADET BRAF)</div>
      <div>Cat &lt;10 yr · stress-related episodic LUTS · sterile urine</div><div style="color:var(--tone-green-fg);">Feline idiopathic cystitis (FIC)</div>
      <div>Male cat · stranguria + abdominal pain + collapse + firm bladder</div><div style="color:var(--tone-danger-title);">Urethral obstruction (plug / urolith)</div>
      <div>Intact male dog · tenesmus / dyschezia · asymmetric prostate</div><div style="color:var(--tone-danger-fg);">Prostatic adenocarcinoma</div>
      <div>Intact male dog · pyrexia + painful prostate + reflux from preputial</div><div style="color:var(--tone-danger-fg);">Bacterial prostatitis / abscess</div>
      <div>Older intact male · symmetric mildly enlarged prostate · preputial blood</div><div style="color:var(--tone-warning-fg);">BPH</div>
      <div>Bitch · vulvar mucopurulent / sanguineous discharge · pyrexia · 4–8 wks post-oestrus</div><div style="color:var(--tone-danger-title);">Pyometra</div>
      <div>Bitch in season · sanguineous vulvar discharge · clinically well</div><div style="color:var(--tone-info-fg);">Oestrus (physiological)</div>
      <div>Young dog with persistent unilateral renal haematuria</div><div style="color:var(--tone-violet-fg);">Idiopathic renal haematuria</div>
      <div>Pale gums + petechiae + haematuria</div><div style="color:var(--tone-danger-title);">Thrombocytopenia / IMTP / DIC</div>
      <div>Pale gums + jaundice + haemoglobinuria</div><div style="color:var(--tone-danger-fg);">IMHA / Babesia / oxidative haemolysis</div>
      <div>Severe trauma + myalgia + dark urine + ↑↑ CK</div><div style="color:var(--tone-danger-fg);">Myoglobinuria (rhabdomyolysis)</div>
    </div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Haematuria — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES' },
      {
        kind: 'check',
        html: `1. <strong>Urethral obstruction</strong> (cat plug, male dog urolith): firm bladder, stranguria with no urine, vomiting, collapse → check serum K+, ECG (peaked T-waves, sine-wave), unblock urgently. Cat: tail-pull-back + 24–26 G catheter (PRN sedation), IV fluids, treat hyperkalaemia (Ca-gluconate, insulin/dextrose).<br>
    2. <strong>Severe coagulopathy</strong>: PT/aPTT, platelet count, BMBT. Vitamin K1 for suspected rodenticide; fresh frozen plasma if bleeding.<br>
    3. <strong>Septic pyelonephritis / pyometra</strong>: temperature, CBC, biochemistry, abdominal US, urgent IV antibiotics and surgery for pyometra.<br>
    4. <strong>Haemolytic crisis</strong> (haemoglobinuria + severe anaemia): CBC + smear, agglutination, Coombs, transfusion if required.<br>
    5. <strong>Bladder rupture from trauma</strong>: abdominal effusion creat &gt; 2× serum creat — surgical exploration.`,
      },
      { kind: 'step', text: 'STEP 2 — URINALYSIS (CYSTOCENTESIS WHEREVER POSSIBLE)' },
      {
        kind: 'check',
        html: `<strong>Cystocentesis</strong> is the gold-standard sample for culture and to avoid contamination from urethra / prepuce / vagina. Avoid only if obstructed bladder very distended (rupture risk in cat) or coagulopathy.<br><br>
    <strong>Macroscopic:</strong> red, brown, port-wine, clear with red sediment.<br>
    <strong>USG:</strong> hyposthenuria (CDI, NDI, PU/PD), isosthenuric (CKD, AKI), concentrated (normal hydrated).<br>
    <strong>Dipstick:</strong> blood (true haematuria OR haemoglobin/myoglobin — discriminate by centrifuge), protein, glucose, ketones, pH.<br>
    <strong>Centrifuged supernatant:</strong> clear with red sediment = true haematuria; red supernatant = haemoglobinuria / myoglobinuria.<br>
    <strong>Sediment:</strong>
    <div style="margin-left:8px;">
      • RBC (number per HPF)<br>
      • WBC + bacteria + epithelial cells → UTI<br>
      • Bacteria: rods (Gram-neg — E. coli) vs cocci (Staph, Strep, Enterococcus)<br>
      • Crystals: struvite (coffin lid), calcium oxalate monohydrate (picket fence / dumbbells), oxalate dihydrate (square envelope), urate (yellow-brown amorphous), cystine (hexagonal)<br>
      • Casts: granular / cellular casts → renal tubular disease; RBC casts → glomerulonephritis or pyelonephritis<br>
      • Atypical epithelial cells → TCC suspicion (cytology + CADET BRAF)
    </div>
    <strong>UPC</strong> (after sediment is bland — proteinuria interpretation requires inactive sediment): glomerular vs tubular protein loss.<br>
    <strong>Urine culture + sensitivity</strong> on every haematuria patient — submit even with clinically obvious cystitis (resistance is rising).`,
      },
      { kind: 'step', text: 'STEP 3 — SYSTEMIC WORKUP' },
      {
        kind: 'check',
        html: `<strong>CBC:</strong> anaemia (chronic blood loss vs haemolysis), leucocytosis (UTI, prostatitis, pyelonephritis, pyometra), thrombocytopenia (IMTP, ehrlichia, DIC).<br>
    <strong>Biochemistry:</strong> azotaemia (post-renal obstruction, pyelonephritis, AKI), hypercalcaemia (urolithiasis precipitator → check ionised Ca, PTHrp, AGASACA), hypoalbuminaemia (PLN, chronic UTI, hepatic), elevated CK / AST (myoglobinuria), elevated globulins (ehrlichia, leishmania, MM).<br>
    <strong>Coagulation:</strong> PT, aPTT, BMBT, platelet count if any bleeding suspected.<br>
    <strong>Blood pressure</strong>: hypertension can worsen renal haemorrhage and is a complication of CKD / endocrinopathy.<br>
    <strong>Infectious workup</strong> (regional): Leptospirosis MAT / PCR (zoonotic — PPE), Ehrlichia / Anaplasma (4Dx test), Babesia PCR, leishmaniasis (Mediterranean / imported).<br>
    <strong>Endocrine / metabolic:</strong> if PU/PD or recurrent UTI — HAC, DM, hyperthyroidism (cat), hypercalcaemia workup.<br>
    <strong>Faecal occult blood</strong> if concurrent GI signs (HSA, GI ulcer with haemoglobin → false-positive urine dipstick if marked).`,
      },
      { kind: 'step', text: 'STEP 4 — IMAGING + ENDOSCOPY' },
      {
        kind: 'check',
        html: `<strong>Abdominal ultrasound</strong> — first-line imaging for haematuria:
    <div style="margin-left:8px;">
      • Bladder: wall thickness, mass (location — trigonal TCC vs apical polyp), calculi (mobile vs adherent), debris<br>
      • Urethra: cannot fully image proximal urethra by US — consider CT urethrogram or cystoscopy<br>
      • Prostate (intact / neutered males): size, symmetry, cysts, abscess, neoplasia<br>
      • Kidneys: size, cortico-medullary definition, pyelectasia (pyelonephritis or obstruction), mass, calculi<br>
      • Ureters: dilated (obstruction)<br>
      • Sublumbar lymphadenopathy (metastasis)<br>
      • Abdominal effusion (bladder rupture — fluid creatinine vs serum)
    </div>
    <strong>Abdominal radiograph</strong>: radiopaque uroliths (calcium oxalate, calcium phosphate, struvite, silica) ± rectal contrast if indistinct.<br>
    <strong>Contrast cystourethrogram</strong>: filling defects, urethral stricture, ectopic ureter, urachal anomalies, fistulas.<br>
    <strong>CT</strong>: advanced imaging for staging neoplasia, urethral disease, retroperitoneal disease, ureteric obstruction (CT urogram).<br>
    <strong>Cystoscopy</strong>: direct visualisation + biopsy of bladder / urethral mass — diagnostic gold standard for TCC. Female dogs and cats tolerate transurethral cystoscopy under sedation; male dogs may require percutaneous approach.<br>
    <strong>BRAF mutation testing</strong> (CADET BRAF, voided urine PCR): non-invasive screen for canine urothelial carcinoma — sensitivity ~80–85% (CADET BRAF), up to ~95% with CADET BRAF-Plus reflex panel; specificity &gt;99% (a positive test is highly confirmatory; a negative does not rule out TCC).<br>
    <strong>Vaginoscopy</strong>: persistent vaginal haematuria in intact / spayed female with no other source.`,
      },
      { kind: 'step', text: 'STEP 5 — SPECIFIC TREATMENT POINTERS' },
      {
        kind: 'check',
        html: `• <strong>Bacterial cystitis</strong>: culture-driven antibiotic for 3–7 days (uncomplicated) or 4 wks (complicated — pyelonephritis, prostatitis, structural anomaly). Sub-clinical bacteriuria often does not need treatment in dogs / cats per ISCAID 2019.<br>
    • <strong>FIC</strong>: multimodal stress reduction, environmental enrichment, increase water intake, wet diet, urinary calming pheromones, gabapentin / amitriptyline for refractory cases.<br>
    • <strong>Urolithiasis</strong>: medical dissolution (struvite — special diet ± antibiotic), surgical removal (calcium oxalate, urate refractory, urethral obstruction), urohydropropulsion for small bladder stones.<br>
    • <strong>Urethral obstruction (cat)</strong>: unblock + IV fluids + Ca-gluconate + insulin / glucose for hyperkalaemia → urethral catheter 1–3 days; long-term FIC management.<br>
    • <strong>Urothelial carcinoma (TCC)</strong>: NSAID (piroxicam, deracoxib) + cytotoxic chemotherapy (mitoxantrone, carboplatin, vinblastine); CADET BRAF for monitoring; refer for stenting if urethral obstruction.<br>
    • <strong>BPH</strong>: castration (resolves within weeks–months); medical (osaterone, finasteride) for non-castration candidates.<br>
    • <strong>Bacterial prostatitis</strong>: 4–6 wks fluoroquinolone or trimethoprim-sulpha (blood-prostate barrier penetration); abscess → drainage; consider castration.<br>
    • <strong>Pyometra</strong>: stabilise + OHE (gold standard). Medical management (aglepristone ± antibiotics) only for breeding bitches with open pyometra.<br>
    • <strong>Idiopathic renal haematuria</strong>: medical management often unsuccessful; refer for sclerotherapy or ureteral occlusion / nephrectomy if uncontrolled.<br>
    • <strong>Anticoagulant rodenticide</strong>: vitamin K1 (5 mg/kg/day) for 3–4 wks; fresh frozen plasma if active bleeding.<br>
    • <strong>IMTP / IMHA</strong>: prednisolone 2 mg/kg/day + adjunct (mycophenolate, cyclosporine, vincristine); avoid blood products without typing for IMHA.`,
      },
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
