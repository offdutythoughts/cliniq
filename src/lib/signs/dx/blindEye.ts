// ── Blind Eye / Acute Vision Loss — diagnostic approach (data) ───────────────
// Migration of blindEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../blindEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const blindEyeDx: DxApproach = {
  title: 'Blind Eye / Vision Loss',
  tabs: {

  history: {
    title: 'History: Blind Eye',
    blocks: [
      { kind: 'branch', text: 'CONFIRM VISION LOSS — REAL OR PERCEIVED?' },
      {
        kind: 'check',
        html: `<strong>Owner-reported clues:</strong><br>
    • Bumping objects (especially in dim light → suggests rod loss → early PRA)<br>
    • Hesitancy on stairs, reluctance to jump, sudden onset disorientation<br>
    • Failure to track moving objects<br>
    • Pupils described as "always large" or unresponsive to light<br><br>
    <strong>Differentiate from non-ophthalmic causes that mimic blindness:</strong><br>
    • Vestibular ataxia · cerebellar disease · severe orthopaedic pain<br>
    • Behavioural changes from systemic illness · dementia (CDS in seniors)<br>
    • Deafness misinterpreted as blindness (cat: white cat + blue eyes)`,
      },
      { kind: 'step', text: '📋 ONSET + LATERALITY' },
      {
        kind: 'check',
        html: `<strong>Peracute (minutes–hours):</strong> acute glaucoma · CVA · head trauma · hyphaema (HT, coagulopathy) · acute retinal detachment · intracranial bleed.<br>
    <strong>Acute (1–7 days):</strong> SARDS · optic neuritis (MUA, infectious) · severe uveitis · retinal detachment from hypertension · hypertensive encephalopathy · hepatic encephalopathy · ivermectin / salt / lead toxicity.<br>
    <strong>Subacute (weeks):</strong> progressing optic nerve neoplasia · chronic uveitis with retinal complication · CNS neoplasia · enrofloxacin retinal toxicity (cats — typically within 1–7 days but progressive over weeks if continued).<br>
    <strong>Chronic / slowly progressive:</strong> PRA (rods first → night blindness → day blindness over months–years) · mature cataract · chronic glaucoma · gradual retinal dystrophy · Collie eye anomaly (congenital, slow).<br><br>
    <strong>Unilateral or bilateral?</strong><br>
    • Unilateral → local cause (trauma, FB, optic nerve neoplasia, single-eye glaucoma, single-side cortical lesion is rare and presents with contralateral menace deficit)<br>
    • Bilateral → systemic or central (SARDS, optic neuritis MUA, hypertension, hepatic encephalopathy, toxins, PRA, cortical disease)`,
      },
      { kind: 'step', alt: true, text: '💊 DRUG + TOXIN HISTORY' },
      {
        kind: 'check',
        html: `<strong>🐱 Enrofloxacin retinal toxicity (cat):</strong> classical at &gt;5 mg/kg/day but reported even at currently-recommended dose 5 mg/kg q24h. May cause acute bilateral blindness, mydriasis, neurological signs (seizures, mentation change). Marbofloxacin and pradofloxacin have a wider safety margin but are not 100% safe — STOP fluoroquinolone immediately and switch antibiotic.<br>
    <strong>Ivermectin / milbemycin overdose:</strong> ABCB1 (MDR1) mutant breeds (Collie, Australian Shepherd, Long-haired Whippet, GSD, Old English Sheepdog) → ataxia, mydriasis, blindness, seizures, coma at therapeutic doses of some products.<br>
    <strong>Salt (sodium-rich playdough, ice melt, seawater):</strong> bilateral cortical blindness + seizures + ataxia.<br>
    <strong>Lead toxicity:</strong> cortical blindness + seizures + GI signs + basophilic stippling.<br>
    <strong>Hyperosmolar contrast media / metronidazole / cyclosporine:</strong> rare reports of optic / cortical signs.<br>
    <strong>Atropine / opioids:</strong> drug-induced mydriasis can be mistaken for vision loss — reassess after wash-out.`,
      },
      { kind: 'step', alt: true, text: '🩺 SYSTEMIC / GENERAL HISTORY' },
      {
        kind: 'check',
        html: `<strong>SARDS phenotype (dog):</strong> sudden bilateral blindness + recent PU/PD + polyphagia + weight gain (Cushingoid look) → ACTH stim / LDDST.<br>
    <strong>Cat with acute blindness + bilateral mydriasis + hyphaema / bullous RD:</strong> systemic hypertension until proven otherwise — measure BP, then look for CKD, hyperthyroidism, HAC.<br>
    <strong>Diabetic dog with rapid cataract progression:</strong> lens-induced uveitis → posterior synechiae → mature cataract → vision loss.<br>
    <strong>Multi-cat household / unvaccinated / outdoor:</strong> consider FIV/FeLV uveitis · FIP · toxoplasmosis · cryptococcosis.<br>
    <strong>Travel history:</strong> Leishmania (Mediterranean), Ehrlichia / Rocky Mountain spotted fever / Anaplasma (endemic regions), Heartworm, fungal (Histo, Blasto, Cocci).<br>
    <strong>Concurrent neurological signs:</strong> seizures, behavioural change, circling, head pressing, propulsive walking, ataxia → cortical / forebrain or systemic encephalopathy.<br>
    <strong>Hepatic disease:</strong> jaundice, PU/PD, intermittent stupor post-prandially → hepatic encephalopathy can present as cortical blindness.<br>
    <strong>Cat on long-term taurine-deficient (vegetarian / homemade) diet:</strong> central retinal degeneration (TCRD) — bilateral retinal atrophy with central hyperreflective ellipse before peripheral involvement.`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:var(--tone-danger-fg);">Miniature Schnauzer, Brittany, Dachshund, Maltese</strong><br>→ SARDS (sudden bilateral blindness + Cushingoid phenotype)<br><br>
        <strong style="color:var(--tone-warning-fg);">Collie, Sheltie</strong><br>→ Collie eye anomaly (choroidal hypoplasia + ONH coloboma + RD) — genetic test available<br><br>
        <strong style="color:var(--tone-green-fg);">Many breeds (over 20): Labrador, Poodle, Cocker, Irish Setter, Tibetan Terrier, Mini Schnauzer</strong><br>→ PRA (genetic tests for prcd, rcd1 etc.)<br><br>
        <strong style="color:var(--tone-violet-fg);">CKCS, English Springer Spaniel</strong><br>→ Retinal dysplasia (congenital, bilateral)<br><br>
        <strong style="color:var(--tone-danger-fg);">ABCB1/MDR1 breeds</strong> (Collie, Aussie, Long-haired Whippet, Shetland)<br>→ ivermectin / milbemycin neurotoxicity → blindness + ataxia + coma<br><br>
        <strong style="color:var(--tone-warning-fg);">Older small breeds with rapidly progressive cataract</strong> → diabetic cataract<br><br>
        <strong style="color:var(--tone-info-fg);">Cocker, Basset, Springer, Chow, Akita</strong> → primary glaucoma → corneal oedema → vision loss
      </div>
      <div>
        <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:var(--tone-violet-fg);">Older cat with acute bilateral blindness</strong><br>→ systemic hypertension (CKD, hyperthyroid, HAC) — BP first<br><br>
        <strong style="color:var(--tone-warning-fg);">Any cat on enrofloxacin</strong><br>→ retinal toxicity — stop drug immediately<br><br>
        <strong style="color:var(--tone-green-fg);">FIV / FeLV positive</strong><br>→ chronic uveitis · intraocular lymphoma · optic neuritis<br><br>
        <strong style="color:var(--tone-danger-fg);">Outdoor / hunting cat</strong><br>→ toxoplasma chorioretinitis · trauma · fungal (Cryptococcus)<br><br>
        <strong style="color:var(--tone-info-fg);">Cat on vegetarian / homemade diet</strong><br>→ taurine-deficient retinal degeneration (central retinal atrophy)<br><br>
        <strong style="color:var(--tone-warning-fg);">Multi-cat / FCoV exposure</strong><br>→ FIP — pyogranulomatous uveitis + chorioretinitis<br><br>
        <strong style="color:var(--tone-danger-fg);">Kitten / young cat with adhesions</strong><br>→ FHV-1 symblepharon → corneal opacity → vision blocked
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        html: `Acute bilateral blindness + altered mentation = central emergency (MRI / CSF) · Cat on enrofloxacin = STOP DRUG · Older cat with bilateral mydriasis + blindness = check BP urgently · Bilateral acute blindness + dilated pupils + normal fundus = SARDS vs optic neuritis (chromatic PLR + MRI) · Head trauma + anisocoria + obtundation = rising ICP (mannitol + decompression)`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Blind Eye',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — QUANTIFY VISION + LATERALITY' },
      {
        kind: 'check',
        html: `Use multiple methods (no single test is perfect — sedation, fear, brachycephalic conformation, dementia can confound):<br>
    • <strong>Menace response</strong> (CN II → cortex → CN VII): present from 10–12 wks of age. Cover one eye at a time. Avoid air currents.<br>
    • <strong>Visual placing reaction</strong>: lift dog or cat to a table edge — sighted animal extends limbs before touching surface.<br>
    • <strong>Tracking</strong> (cotton ball or laser pointer): tests acuity and pursuit.<br>
    • <strong>Maze test</strong>: light + dark room (rod vs cone function — PRA loses rods first, so dark-room mazes flag early).<br>
    • <strong>Obstacle course</strong>: novel objects in clinic — quantifies real-world functional vision.<br>
    • <strong>Owner-reported behaviours</strong>: bumping, hesitancy, stair refusal — capture before exam.<br>
    Compare each eye separately by occluding the contralateral side.`,
      },
      { kind: 'step', alt: true, text: '🔦 STEP 2 — APPLY THE LOCALISATION TABLE' },
      {
        kind: 'check',
        html: `Once you have established blindness, the next priority is to localise the lesion using <strong>menace + dazzle + PLR</strong>:
    <div style="display:grid;grid-template-columns:1.4fr 0.7fr 0.7fr 0.9fr 1.3fr;gap:3px 5px;font-size:9.5px;margin:6px 0 4px 0;line-height:1.4;">
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Localisation</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Menace</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Dazzle</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">PLR</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Fundus</div>
      <div>Anterior segment opacity</div><div>Absent</div><div>Variable</div><div>Variable</div><div>Often obscured</div>
      <div>Retina (PRA, RD, hypertensive)</div><div>Absent</div><div>Absent</div><div>Absent / sluggish</div><div>Abnormal</div>
      <div style="color:var(--tone-warning-fg);">SARDS</div><div>Absent</div><div>Absent</div><div>Red ⊘ · Blue ✓</div><div style="color:var(--tone-green-fg);">NORMAL</div>
      <div>Optic neuritis</div><div>Absent</div><div>Absent</div><div>Red ⊘ · Blue ⊘</div><div>Swollen / haemorrhagic disc</div>
      <div>Optic nerve hypoplasia</div><div>Absent</div><div>Absent</div><div>Absent (1 or both)</div><div>Small / pale disc</div>
      <div>Chiasmal / optic tract</div><div>Variable</div><div>Variable</div><div>Pattern (see Abnormal Pupil)</div><div>Normal</div>
      <div style="color:var(--tone-violet-fg);">Cortex / forebrain</div><div>Absent</div><div style="color:var(--tone-green-fg);">PRESENT</div><div style="color:var(--tone-green-fg);">PRESENT</div><div>Normal</div>
    </div>
    <span style="font-size:9.5px;opacity:.85;">💡 Cortical blindness is the one pattern where <strong>both subcortical reflexes (dazzle + PLR) are preserved</strong>. SARDS uniquely preserves only <strong>blue chromatic PLR</strong> (melanopsin RGCs spared); optic neuritis abolishes both red and blue.</span>`,
      },
      { kind: 'step', alt: true, text: '👁️ STEP 3 — STRUCTURED OCULAR EXAM (outside → in)' },
      {
        kind: 'check',
        html: `<strong>1. Globe position + size:</strong> buphthalmos (chronic glaucoma — blind painful), microphthalmos (congenital), exophthalmos (orbital), enophthalmos (Horner / pain / dehydration).<br>
    <strong>2. Adnexa:</strong> blepharospasm, discharge, eyelid mass, symblepharon (kitten with FHV-1 — adhesions between conjunctiva and cornea, blocks vision).<br>
    <strong>3. Cornea:</strong> diffuse oedema (acute glaucoma · endothelial decompensation), deep scarring, pigmentary keratitis (pannus end-stage), descemetocele, perforation. Cornea opaque enough to obscure fundus = anterior pathway blockage.<br>
    <strong>4. Anterior chamber:</strong> hyphaema, hypopyon, fibrin, lens position (anterior lens luxation), aqueous flare (uveitis).<br>
    <strong>5. Iris + pupil:</strong> mid-fixed mydriasis (glaucoma), miosis + flare (uveitis), posterior synechiae (chronic uveitis sequela), iris rubeosis (chronic intraocular disease).<br>
    <strong>6. Lens:</strong> mature cataract (no fundus reflex), nuclear sclerosis (still allows reflex — does NOT cause blindness on its own), lens luxation.<br>
    <strong>7. Vitreous:</strong> haemorrhage, asteroid hyalosis, debris (uveitis), retinal detachment leaflets.<br>
    <strong>8. Fundus — by lesion pattern (see table below).</strong>`,
      },
      { kind: 'step', alt: true, text: '🔬 STEP 4 — FUNDIC PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<strong>Dilate with tropicamide 1% q15 min × 2 doses (after IOP, never if narrow ICA suspected).</strong>
    <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Fundus appearance</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Localisation</div>
      <div>Tapetal HYPERreflectivity + retinal vessel attenuation</div><div style="color:var(--tone-warning-fg);">PRA · end-stage retinal degeneration · TCRD (cat — central ellipse)</div>
      <div>Tapetal HYPOreflectivity + retinal vessels lifted close to lens · "veil" floating in vitreous</div><div style="color:var(--tone-danger-fg);">Retinal detachment — bullous (HT) or rhegmatogenous (post-surgical, trauma)</div>
      <div>Normal fundus + blind + dilated pupils</div><div style="color:var(--tone-warning-fg);">SARDS · cortical blindness · optic chiasm (early)</div>
      <div>Pink/haemorrhagic swollen optic disc · peripapillary oedema</div><div style="color:var(--tone-danger-title);">Optic neuritis (MUA, infectious)</div>
      <div>Small / pale optic disc</div><div style="color:var(--tone-info-fg);">Optic nerve hypoplasia (congenital)</div>
      <div>Multifocal grey-white retinal lesions ± haemorrhage</div><div style="color:var(--tone-danger-fg);">Chorioretinitis (toxoplasma, FIP, fungal, tick-borne)</div>
      <div>Tortuous retinal vessels + retinal haemorrhage + bullous RD</div><div style="color:var(--tone-danger-title);">Systemic hypertension (cat with CKD / hyperthyroidism)</div>
      <div>Choroidal hypoplasia + ONH coloboma + ± RD/haemorrhage</div><div style="color:var(--tone-violet-fg);">Collie eye anomaly</div>
      <div>Retinal folds / geographic dysplasia / RD (young dog, CKCS / Springer)</div><div style="color:var(--tone-green-fg);">Retinal dysplasia</div>
      <div>Acute bilateral retinopathy in a cat on fluoroquinolone</div><div style="color:var(--tone-danger-title);">Enrofloxacin retinal toxicity (STOP DRUG)</div>
    </div>`,
      },
      { kind: 'step', alt: true, text: '🧠 STEP 5 — NEUROLOGICAL EXAM (forebrain vs structural)' },
      {
        kind: 'check',
        html: `Always perform a neuro exam in any animal with bilateral vision loss and apparent forebrain signs:<br>
    • <strong>Mentation</strong>: obtunded / stuporous / hyperactive (HE, hypertensive encephalopathy, toxic).<br>
    • <strong>Behaviour</strong>: head pressing, propulsive walking, compulsive circling (forebrain — usually toward the lesion side).<br>
    • <strong>Postural reactions</strong> (proprioception, hopping) — abnormal in contralateral limbs with cortical / thalamic lesion.<br>
    • <strong>Cranial nerves</strong>: full battery — concurrent CN VII / VIII / V deficits localise to brainstem; concurrent CN III + anisocoria localises to midbrain.<br>
    • <strong>Postural / gait</strong> — UMN signs in opposite-side limbs from cortical lesion.<br>
    • <strong>Seizure history</strong> + focal twitching → forebrain (HE, neoplasia, MUA, toxin).<br>
    • <strong>Autonomic signs</strong> (megaoesophagus, urinary retention, dry mucosae, bilateral mydriasis) → dysautonomia.<br>
    Document objective findings — these direct the imaging plan (MRI brain ± CSF).`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Blind Eye — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES IN MINUTES' },
      {
        kind: 'check',
        html: `1. <strong>Tonometry</strong> on every blind eye — acute glaucoma can present with diffuse corneal oedema masking the fundus; IOP &gt;25 mmHg = sight-threatening.<br>
    2. <strong>Blood pressure</strong> (Doppler / oscillometric × 3 calm readings) on every older cat or dog with acute bilateral blindness — hypertensive retinopathy is reversible if treated within 24 h.<br>
    3. <strong>Mentation + neuro exam</strong> — anisocoria + altered mentation + blindness = central emergency (MRI + CSF as soon as stable).<br>
    4. <strong>Drug review</strong> — STOP enrofloxacin in any cat with acute blindness on a fluoroquinolone; reverse ivermectin / atropine / opioid exposure where possible.<br>
    5. <strong>Trauma / head injury</strong> — anisocoria + obtundation → mannitol 0.5–1 g/kg IV slow, emergent imaging, neurosurgery referral.<br>
    6. <strong>Glucose stick</strong> — severe hypoglycaemia in a small / young dog can mimic cortical blindness.`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — STANDARD OPHTHALMIC TESTS' },
      {
        kind: 'check',
        html: `<strong>Schirmer Tear Test</strong> (before any drops): low STT + bilateral mydriasis + dry mucous membranes + autonomic signs = dysautonomia → bilateral cortical-like blindness in advanced cases.<br>
    <strong>Fluorescein stain</strong>: rule out ulcer/perforation before steroids; severe melting ulcers can cause perforation and blindness in days.<br>
    <strong>Tonometry</strong>: see emergency step. Glaucoma vs uveitis distinction critical.<br>
    <strong>Slit-lamp / focal light</strong>: aqueous flare, KP, synechiae, lens position, iris detail.<br>
    <strong>Mydriatic challenge (tropicamide 1%)</strong>: complete failure to dilate suggests posterior synechiae, iris atrophy, or pharmacological mydriasis already present.<br>
    <strong>Direct + indirect ophthalmoscopy</strong>: indirect first for retinal overview, direct for optic disc detail. Green filter helps distinguish pigment from haemorrhage; blue filter for fluorescein.`,
      },
      { kind: 'step', alt: true, text: 'STEP 3 — CHROMATIC PLR + ERG (when fundus is normal but pupils are dilated and dazzle absent)' },
      {
        kind: 'check',
        html: `<strong>Chromatic PLR</strong> uses a handheld device or commercial torch with separate red and blue LEDs (e.g. Melan-100, BIOPAC chromatic):<br>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Condition</div><div style="font-weight:600;">Red PLR</div><div style="font-weight:600;">Blue PLR</div>
      <div>Normal</div><div style="color:var(--tone-green-fg);">Present</div><div style="color:var(--tone-green-fg);">Present</div>
      <div>SARDS</div><div style="color:var(--tone-danger-title);">Absent</div><div style="color:var(--tone-green-fg);">Present (melanopsin RGCs spared)</div>
      <div>Optic neuritis</div><div style="color:var(--tone-danger-title);">Absent</div><div style="color:var(--tone-danger-title);">Absent</div>
      <div>End-stage PRA / retinal degeneration</div><div style="color:var(--tone-danger-title);">Absent</div><div style="color:var(--tone-warning-fg);">Reduced / absent</div>
      <div>Cortical blindness</div><div style="color:var(--tone-green-fg);">Present</div><div style="color:var(--tone-green-fg);">Present</div>
    </div>
    <strong>Electroretinography (ERG)</strong> — gold-standard differentiator. Performed under sedation:<br>
    • Flat ERG + acute blindness + normal fundus + Cushingoid phenotype → <strong>SARDS</strong> (no treatment).<br>
    • Preserved ERG + normal fundus + absent menace + preserved dazzle/PLR → <strong>cortical blindness</strong> (MRI brain).<br>
    • Preserved ERG + abnormal optic disc + absent PLR → <strong>optic neuritis</strong> or optic nerve disease (MRI + CSF).<br>
    • Severely reduced ERG + tapetal hyperreflectivity → <strong>PRA / retinal degeneration</strong>.<br>
    Refer for ERG if non-fundoscopic causes need to be distinguished.`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — SYSTEMIC + INFECTIOUS WORKUP' },
      {
        kind: 'check',
        html: `<strong>Always:</strong> CBC, biochemistry, urinalysis, BP (≥3 calm readings). Faecal if indicated.<br><br>
    <strong>If hypertension confirmed (SBP &gt;160):</strong> renal panel + USG + UPC, T4 (cat &gt;7 yr), ACTH stim / LDDST (HAC in dog), serum aldosterone (Conn syndrome cat with hypokalaemia), urine catecholamines (pheochromocytoma — rare).<br><br>
    <strong>If SARDS suspected:</strong> full endocrine panel — ACTH stim and / or LDDST (40–60% have concurrent HAC-like biochemistry — "Cushingoid SARDS"), urine cortisol:creatinine.<br><br>
    <strong>Uveitis / chorioretinitis workup:</strong><br>
    • Cat: FeLV / FIV (PCR/Ag), <em>Toxoplasma gondii</em> IgG/IgM, FCoV titre (FIP), Bartonella, Cryptococcus LCAT, fungal serology (if endemic).<br>
    • Dog: Toxoplasma, Ehrlichia / Anaplasma / RMSF / Lyme (tick-borne panel), Leishmania (Mediterranean / imported), Blastomyces / Histoplasma / Coccidioides / Cryptococcus (regional fungal panel), Borrelia, Brucella canis.<br>
    • Both: thoracic + abdominal imaging in older patients (lymphoma, metastatic uveitis).<br><br>
    <strong>Hepatic encephalopathy workup:</strong> bile acids (pre + post-prandial), ammonia, abdominal ultrasound (PSS, microvascular dysplasia, hepatic mass).<br><br>
    <strong>Toxicology:</strong> blood lead, drug levels where applicable, owner-supplied product/dose.<br><br>
    <strong>Coagulation:</strong> PT/aPTT, platelet count, BMBT if hyphaema or vitreal haemorrhage.`,
      },
      { kind: 'step', alt: true, text: 'STEP 5 — ADVANCED IMAGING' },
      {
        kind: 'check',
        html: `<strong>Ocular ultrasound (10–20 MHz)</strong> — indispensable when fundus is not visible (corneal oedema, mature cataract, hyphaema):<br>
    • Retinal detachment (sea-gull / "V" shape attached at optic nerve)<br>
    • Vitreal haemorrhage / inflammatory debris<br>
    • Intraocular mass (ciliary body, choroidal, lymphoma)<br>
    • Lens position (luxation), capsule integrity<br>
    • Optic nerve thickening (optic neuritis)<br><br>
    <strong>MRI brain + CSF analysis</strong> — required for:<br>
    • Optic neuritis (differentiate MUA from infectious / neoplastic — affects treatment)<br>
    • Suspected forebrain / cortical disease (MUA, neoplasia, CVA, hydrocephalus)<br>
    • Chiasmal lesion (pituitary macroadenoma — bilateral blindness; see chiasm note below)<br>
    • CN III + altered mentation + blindness = brainstem / midbrain emergency<br><br>
    <strong>CT</strong>: orbital / retrobulbar mass with secondary blindness, skull trauma, dental disease causing optic neuropathy.<br><br>
    <strong>Visual evoked potentials</strong> — referral test for central versus post-retinal pathway differentiation when MRI is normal.<br><br>
    <strong>Chiasmal lesion — species note:</strong> dogs cross ~75% and cats ~65% of optic fibres at the chiasm, so chiasmal compression (e.g. pituitary macroadenoma) typically produces near-complete bilateral blindness rather than the discrete bitemporal hemianopia seen in humans (~50% crossover). Endocrine signs (HAC, diabetes insipidus) often accompany.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Therapy pearls while you investigate:</strong><br>
  • <strong>Hypertensive emergency:</strong> amlodipine 0.625–1.25 mg (cat) or 0.1–0.5 mg/kg (dog) PO ± telmisartan; target SBP &lt;160 mmHg; treat underlying cause concurrently. Retinal detachments often reattach if BP controlled within 24–48 h.<br>
  • <strong>Optic neuritis (suspected MUA, post-MRI/CSF):</strong> prednisolone 2 mg/kg/day + adjunct (cytarabine, lomustine, mycophenolate, cyclosporine); rule out infectious cause first.<br>
  • <strong>SARDS:</strong> no proven specific therapy — IVIg / steroids unsupported; treat concurrent HAC if present; counsel on adaptation.<br>
  • <strong>Enrofloxacin retinal toxicity (cat):</strong> stop drug immediately and substitute; some retinal recovery if early. Avoid &gt;5 mg/kg/day; consider marbofloxacin / pradofloxacin in cats requiring fluoroquinolone.<br>
  • <strong>Hepatic encephalopathy:</strong> lactulose + low-protein diet + antibiotic (metronidazole, amoxiclav) + treat hepatic cause.<br>
  • <strong>Toxin / drug-induced cortical blindness:</strong> activated charcoal if recent ingestion, specific antidote (vitamin K1 for rodenticide; pamidronate for vitamin D; sugar / dextrose for hypoglycaemia; intralipid for permethrin / ivermectin), supportive care.<br>
  • <strong>Severe corneal opacity:</strong> definitive treatment (graft, keratectomy, cataract surgery) — referral if vision is salvageable.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
