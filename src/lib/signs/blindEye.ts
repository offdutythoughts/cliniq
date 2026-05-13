// ── THE BLIND EYE — clinical sign + diagnostic approach ────────────────────
// Source: resources/3. The blind eye.pdf + resources/1. Clinical examination of the eye.pdf
//
// onclick handlers reference window globals exposed at the bottom of cliniqApp.ts.

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const blindEyeFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">⚫ BLIND EYE</div>
  <div class="flow-arrow-v">↓</div>
  <div class="flow-node step">LOCALISE THE LESION ALONG THE VISUAL PATHWAY<br><span style="font-size:10px;color:var(--gray);font-weight:400">Cornea → aqueous → lens → vitreous → retina → optic n. → chiasm → optic tract → LGN → cortex</span></div>
  <div class="flow-arrow-v">↓</div>

  <!-- 5 anatomical branches -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px;width:100%;">
    <div class="flow-node insp" style="cursor:pointer;font-size:10px;" onclick="goLesionTab('LOC-BL-OPAQUE','Anterior segment opacity')">👁️ Anterior<br>opacity<br><span style="font-size:8px;opacity:.7">light cannot reach retina</span></div>
    <div class="flow-node exp" style="cursor:pointer;font-size:10px;" onclick="goLesionTab('LOC-BL-RETINA','Retinal disease')">🌑 Retina<br><span style="font-size:8px;opacity:.7">SARDS · RD · PRA · HT</span></div>
    <div class="flow-node rest" style="cursor:pointer;font-size:10px;" onclick="goLesionTab('LOC-BL-OPTIC','Optic nerve')">🧬 Optic<br>nerve<br><span style="font-size:8px;opacity:.7">neuritis · hypoplasia · neoplasia</span></div>
    <div class="flow-node mixed" style="cursor:pointer;font-size:10px;" onclick="goLesionTab('LOC-BL-CHIASM','Chiasm / optic tract')">✨ Chiasm /<br>tract<br><span style="font-size:8px;opacity:.7">pituitary mass · rare</span></div>
    <div class="flow-node insp" style="cursor:pointer;font-size:10px;background:rgba(168,85,247,0.12);border-color:rgba(168,85,247,0.4);color:#DDD6FE;" onclick="goLesionTab('LOC-BL-CORTEX','Cortical / forebrain')">🧠 Cortex /<br>forebrain<br><span style="font-size:8px;opacity:.7">HE · HT · MUA · CVA · neoplasia</span></div>
  </div>

  <div style="margin-top:14px;padding:10px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:8px;">🔍 THE LOCALISATION TABLE — Menace · Dazzle · PLR</div>
    <div style="display:grid;grid-template-columns:1.3fr 0.7fr 0.7fr 0.7fr 1.4fr;gap:3px 5px;font-size:9.5px;line-height:1.35;">
      <div style="font-weight:700;border-bottom:1px solid rgba(168,85,247,.3);">Lesion site</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(168,85,247,.3);">Menace</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(168,85,247,.3);">Dazzle</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(168,85,247,.3);">PLR</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(168,85,247,.3);">Fundus</div>

      <div>Anterior opacity</div><div>Absent</div><div>Variable</div><div>Variable</div><div>Often not visible</div>
      <div>Retinal disease (RD, PRA)</div><div>Absent</div><div>Absent</div><div>Absent / sluggish</div><div>Abnormal</div>
      <div style="color:#FCD34D;">SARDS</div><div>Absent</div><div>Absent</div><div>Red absent · Blue present</div><div style="color:#6EE7B7;">NORMAL (key clue)</div>
      <div>Optic nerve (neuritis)</div><div>Absent</div><div>Absent</div><div>Absent (red AND blue)</div><div>Swollen disc · haemorrhage</div>
      <div>Chiasm / tract</div><div>Absent (variable)</div><div>Absent / variable</div><div>Variable per pattern</div><div>Normal</div>
      <div style="color:#C4B5FD;">Cortex / forebrain</div><div>Absent</div><div style="color:#6EE7B7;">PRESENT</div><div style="color:#6EE7B7;">PRESENT</div><div>Normal</div>
    </div>
    <div style="margin-top:7px;font-size:9.5px;line-height:1.55;color:rgba(196,181,253,.85);">
      💡 The single most discriminating finding: <strong>preserved dazzle + preserved PLR with absent menace = cortical blindness</strong>. Everything else lies upstream of the lateral geniculate nucleus.
    </div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#F87171;margin-bottom:6px;">⚡ DO NOT MISS</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Hypertensive retinopathy</strong> — older cat / dog with acute bilateral blindness, bullous retinal detachment, hyphaema, tortuous retinal vessels → measure BP first<br>
      • <strong>Optic neuritis (MUA)</strong> — acute bilateral blindness + dilated unresponsive pupils + swollen optic disc → urgent MRI/CSF + immunosuppression<br>
      • <strong>Acute glaucoma</strong> — corneal oedema + mid-fixed mydriasis + ↑ IOP → tonometry on every blind eye<br>
      • <strong>Head trauma + anisocoria + blindness</strong> — rising ICP / herniation → mannitol + emergent imaging<br>
      • <strong>Enrofloxacin in cats</strong> — drug-induced retinal toxicity (avoid &gt;5 mg/kg/day; even therapeutic doses reported)<br>
      • <strong>Salt / ivermectin / lead toxicity</strong> — bilateral cortical blindness with seizures and altered mentation
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:11px;color:#93C5FD;text-align:center;width:100%;">
    Tap a pathway segment to see specific lesion types
  </div>
</div>
`;

// ── Tab nav helper ─────────────────────────────────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxBlindEyeHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxBlindEyeExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxBlindEyeDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const blindEyeDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">CONFIRM VISION LOSS — REAL OR PERCEIVED?</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Owner-reported clues:</strong><br>
    • Bumping objects (especially in dim light → suggests rod loss → early PRA)<br>
    • Hesitancy on stairs, reluctance to jump, sudden onset disorientation<br>
    • Failure to track moving objects<br>
    • Pupils described as "always large" or unresponsive to light<br><br>
    <strong>Differentiate from non-ophthalmic causes that mimic blindness:</strong><br>
    • Vestibular ataxia · cerebellar disease · severe orthopaedic pain<br>
    • Behavioural changes from systemic illness · dementia (CDS in seniors)<br>
    • Deafness misinterpreted as blindness (cat: white cat + blue eyes)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 ONSET + LATERALITY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Peracute (minutes–hours):</strong> acute glaucoma · CVA · head trauma · hyphaema (HT, coagulopathy) · acute retinal detachment · intracranial bleed.<br>
    <strong>Acute (1–7 days):</strong> SARDS · optic neuritis (MUA, infectious) · severe uveitis · retinal detachment from hypertension · hypertensive encephalopathy · hepatic encephalopathy · ivermectin / salt / lead toxicity.<br>
    <strong>Subacute (weeks):</strong> progressing optic nerve neoplasia · chronic uveitis with retinal complication · CNS neoplasia · enrofloxacin retinal toxicity (cats — typically within 1–7 days but progressive over weeks if continued).<br>
    <strong>Chronic / slowly progressive:</strong> PRA (rods first → night blindness → day blindness over months–years) · mature cataract · chronic glaucoma · gradual retinal dystrophy · Collie eye anomaly (congenital, slow).<br><br>
    <strong>Unilateral or bilateral?</strong><br>
    • Unilateral → local cause (trauma, FB, optic nerve neoplasia, single-eye glaucoma, single-side cortical lesion is rare and presents with contralateral menace deficit)<br>
    • Bilateral → systemic or central (SARDS, optic neuritis MUA, hypertension, hepatic encephalopathy, toxins, PRA, cortical disease)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💊 DRUG + TOXIN HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>🐱 Enrofloxacin retinal toxicity (cat):</strong> classical at &gt;5 mg/kg/day but reported even at currently-recommended dose 5 mg/kg q24h. May cause acute bilateral blindness, mydriasis, neurological signs (seizures, mentation change). Marbofloxacin and pradofloxacin have a wider safety margin but are not 100% safe — STOP fluoroquinolone immediately and switch antibiotic.<br>
    <strong>Ivermectin / milbemycin overdose:</strong> ABCB1 (MDR1) mutant breeds (Collie, Australian Shepherd, Long-haired Whippet, GSD, Old English Sheepdog) → ataxia, mydriasis, blindness, seizures, coma at therapeutic doses of some products.<br>
    <strong>Salt (sodium-rich playdough, ice melt, seawater):</strong> bilateral cortical blindness + seizures + ataxia.<br>
    <strong>Lead toxicity:</strong> cortical blindness + seizures + GI signs + basophilic stippling.<br>
    <strong>Hyperosmolar contrast media / metronidazole / cyclosporine:</strong> rare reports of optic / cortical signs.<br>
    <strong>Atropine / opioids:</strong> drug-induced mydriasis can be mistaken for vision loss — reassess after wash-out.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 SYSTEMIC / GENERAL HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>SARDS phenotype (dog):</strong> sudden bilateral blindness + recent PU/PD + polyphagia + weight gain (Cushingoid look) → ACTH stim / LDDST.<br>
    <strong>Cat with acute blindness + bilateral mydriasis + hyphaema / bullous RD:</strong> systemic hypertension until proven otherwise — measure BP, then look for CKD, hyperthyroidism, HAC.<br>
    <strong>Diabetic dog with rapid cataract progression:</strong> lens-induced uveitis → posterior synechiae → mature cataract → vision loss.<br>
    <strong>Multi-cat household / unvaccinated / outdoor:</strong> consider FIV/FeLV uveitis · FIP · toxoplasmosis · cryptococcosis.<br>
    <strong>Travel history:</strong> Leishmania (Mediterranean), Ehrlichia / Rocky Mountain spotted fever / Anaplasma (endemic regions), Heartworm, fungal (Histo, Blasto, Cocci).<br>
    <strong>Concurrent neurological signs:</strong> seizures, behavioural change, circling, head pressing, propulsive walking, ataxia → cortical / forebrain or systemic encephalopathy.<br>
    <strong>Hepatic disease:</strong> jaundice, PU/PD, intermittent stupor post-prandially → hepatic encephalopathy can present as cortical blindness.<br>
    <strong>Cat on long-term taurine-deficient (vegetarian / homemade) diet:</strong> central retinal degeneration (TCRD) — bilateral retinal atrophy with central hyperreflective ellipse before peripheral involvement.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🐾 SIGNALMENT + BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:#FCA5A5;">Miniature Schnauzer, Brittany, Dachshund, Maltese</strong><br>→ SARDS (sudden bilateral blindness + Cushingoid phenotype)<br><br>
        <strong style="color:#FCD34D;">Collie, Sheltie</strong><br>→ Collie eye anomaly (choroidal hypoplasia + ONH coloboma + RD) — genetic test available<br><br>
        <strong style="color:#6EE7B7;">Many breeds (over 20): Labrador, Poodle, Cocker, Irish Setter, Tibetan Terrier, Mini Schnauzer</strong><br>→ PRA (genetic tests for prcd, rcd1 etc.)<br><br>
        <strong style="color:#C4B5FD;">CKCS, English Springer Spaniel</strong><br>→ Retinal dysplasia (congenital, bilateral)<br><br>
        <strong style="color:#FCA5A5;">ABCB1/MDR1 breeds</strong> (Collie, Aussie, Long-haired Whippet, Shetland)<br>→ ivermectin / milbemycin neurotoxicity → blindness + ataxia + coma<br><br>
        <strong style="color:#FCD34D;">Older small breeds with rapidly progressive cataract</strong> → diabetic cataract<br><br>
        <strong style="color:#93C5FD;">Cocker, Basset, Springer, Chow, Akita</strong> → primary glaucoma → corneal oedema → vision loss
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:#C4B5FD;">Older cat with acute bilateral blindness</strong><br>→ systemic hypertension (CKD, hyperthyroid, HAC) — BP first<br><br>
        <strong style="color:#FCD34D;">Any cat on enrofloxacin</strong><br>→ retinal toxicity — stop drug immediately<br><br>
        <strong style="color:#6EE7B7;">FIV / FeLV positive</strong><br>→ chronic uveitis · intraocular lymphoma · optic neuritis<br><br>
        <strong style="color:#FCA5A5;">Outdoor / hunting cat</strong><br>→ toxoplasma chorioretinitis · trauma · fungal (Cryptococcus)<br><br>
        <strong style="color:#93C5FD;">Cat on vegetarian / homemade diet</strong><br>→ taurine-deficient retinal degeneration (central retinal atrophy)<br><br>
        <strong style="color:#FCD34D;">Multi-cat / FCoV exposure</strong><br>→ FIP — pyogranulomatous uveitis + chorioretinitis<br><br>
        <strong style="color:#FCA5A5;">Kitten / young cat with adhesions</strong><br>→ FHV-1 symblepharon → corneal opacity → vision blocked
      </div>
    </div>
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Acute bilateral blindness + altered mentation = central emergency (MRI / CSF) · Cat on enrofloxacin = STOP DRUG · Older cat with bilateral mydriasis + blindness = check BP urgently · Bilateral acute blindness + dilated pupils + normal fundus = SARDS vs optic neuritis (chromatic PLR + MRI) · Head trauma + anisocoria + obtundation = rising ICP (mannitol + decompression)
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const blindEyeDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 STEP 1 — QUANTIFY VISION + LATERALITY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Use multiple methods (no single test is perfect — sedation, fear, brachycephalic conformation, dementia can confound):<br>
    • <strong>Menace response</strong> (CN II → cortex → CN VII): present from 10–12 wks of age. Cover one eye at a time. Avoid air currents.<br>
    • <strong>Visual placing reaction</strong>: lift dog or cat to a table edge — sighted animal extends limbs before touching surface.<br>
    • <strong>Tracking</strong> (cotton ball or laser pointer): tests acuity and pursuit.<br>
    • <strong>Maze test</strong>: light + dark room (rod vs cone function — PRA loses rods first, so dark-room mazes flag early).<br>
    • <strong>Obstacle course</strong>: novel objects in clinic — quantifies real-world functional vision.<br>
    • <strong>Owner-reported behaviours</strong>: bumping, hesitancy, stair refusal — capture before exam.<br>
    Compare each eye separately by occluding the contralateral side.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔦 STEP 2 — APPLY THE LOCALISATION TABLE</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Once you have established blindness, the next priority is to localise the lesion using <strong>menace + dazzle + PLR</strong>:
    <div style="display:grid;grid-template-columns:1.4fr 0.7fr 0.7fr 0.9fr 1.3fr;gap:3px 5px;font-size:9.5px;margin:6px 0 4px 0;line-height:1.4;">
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Localisation</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Menace</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Dazzle</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">PLR</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Fundus</div>
      <div>Anterior segment opacity</div><div>Absent</div><div>Variable</div><div>Variable</div><div>Often obscured</div>
      <div>Retina (PRA, RD, hypertensive)</div><div>Absent</div><div>Absent</div><div>Absent / sluggish</div><div>Abnormal</div>
      <div style="color:#FCD34D;">SARDS</div><div>Absent</div><div>Absent</div><div>Red ⊘ · Blue ✓</div><div style="color:#6EE7B7;">NORMAL</div>
      <div>Optic neuritis</div><div>Absent</div><div>Absent</div><div>Red ⊘ · Blue ⊘</div><div>Swollen / haemorrhagic disc</div>
      <div>Optic nerve hypoplasia</div><div>Absent</div><div>Absent</div><div>Absent (1 or both)</div><div>Small / pale disc</div>
      <div>Chiasmal / optic tract</div><div>Variable</div><div>Variable</div><div>Pattern (see Abnormal Pupil)</div><div>Normal</div>
      <div style="color:#C4B5FD;">Cortex / forebrain</div><div>Absent</div><div style="color:#6EE7B7;">PRESENT</div><div style="color:#6EE7B7;">PRESENT</div><div>Normal</div>
    </div>
    <span style="font-size:9.5px;opacity:.85;">💡 Cortical blindness is the one pattern where <strong>both subcortical reflexes (dazzle + PLR) are preserved</strong>. SARDS uniquely preserves only <strong>blue chromatic PLR</strong> (melanopsin RGCs spared); optic neuritis abolishes both red and blue.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👁️ STEP 3 — STRUCTURED OCULAR EXAM (outside → in)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>1. Globe position + size:</strong> buphthalmos (chronic glaucoma — blind painful), microphthalmos (congenital), exophthalmos (orbital), enophthalmos (Horner / pain / dehydration).<br>
    <strong>2. Adnexa:</strong> blepharospasm, discharge, eyelid mass, symblepharon (kitten with FHV-1 — adhesions between conjunctiva and cornea, blocks vision).<br>
    <strong>3. Cornea:</strong> diffuse oedema (acute glaucoma · endothelial decompensation), deep scarring, pigmentary keratitis (pannus end-stage), descemetocele, perforation. Cornea opaque enough to obscure fundus = anterior pathway blockage.<br>
    <strong>4. Anterior chamber:</strong> hyphaema, hypopyon, fibrin, lens position (anterior lens luxation), aqueous flare (uveitis).<br>
    <strong>5. Iris + pupil:</strong> mid-fixed mydriasis (glaucoma), miosis + flare (uveitis), posterior synechiae (chronic uveitis sequela), iris rubeosis (chronic intraocular disease).<br>
    <strong>6. Lens:</strong> mature cataract (no fundus reflex), nuclear sclerosis (still allows reflex — does NOT cause blindness on its own), lens luxation.<br>
    <strong>7. Vitreous:</strong> haemorrhage, asteroid hyalosis, debris (uveitis), retinal detachment leaflets.<br>
    <strong>8. Fundus — by lesion pattern (see table below).</strong>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔬 STEP 4 — FUNDIC PATTERN RECOGNITION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Dilate with tropicamide 1% q15 min × 2 doses (after IOP, never if narrow ICA suspected).</strong>
    <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Fundus appearance</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Localisation</div>
      <div>Tapetal HYPERreflectivity + retinal vessel attenuation</div><div style="color:#FCD34D;">PRA · end-stage retinal degeneration · TCRD (cat — central ellipse)</div>
      <div>Tapetal HYPOreflectivity + retinal vessels lifted close to lens · "veil" floating in vitreous</div><div style="color:#FCA5A5;">Retinal detachment — bullous (HT) or rhegmatogenous (post-surgical, trauma)</div>
      <div>Normal fundus + blind + dilated pupils</div><div style="color:#FCD34D;">SARDS · cortical blindness · optic chiasm (early)</div>
      <div>Pink/haemorrhagic swollen optic disc · peripapillary oedema</div><div style="color:#F87171;">Optic neuritis (MUA, infectious)</div>
      <div>Small / pale optic disc</div><div style="color:#93C5FD;">Optic nerve hypoplasia (congenital)</div>
      <div>Multifocal grey-white retinal lesions ± haemorrhage</div><div style="color:#FCA5A5;">Chorioretinitis (toxoplasma, FIP, fungal, tick-borne)</div>
      <div>Tortuous retinal vessels + retinal haemorrhage + bullous RD</div><div style="color:#F87171;">Systemic hypertension (cat with CKD / hyperthyroidism)</div>
      <div>Choroidal hypoplasia + ONH coloboma + ± RD/haemorrhage</div><div style="color:#C4B5FD;">Collie eye anomaly</div>
      <div>Retinal folds / geographic dysplasia / RD (young dog, CKCS / Springer)</div><div style="color:#6EE7B7;">Retinal dysplasia</div>
      <div>Acute bilateral retinopathy in a cat on fluoroquinolone</div><div style="color:#F87171;">Enrofloxacin retinal toxicity (STOP DRUG)</div>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🧠 STEP 5 — NEUROLOGICAL EXAM (forebrain vs structural)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Always perform a neuro exam in any animal with bilateral vision loss and apparent forebrain signs:<br>
    • <strong>Mentation</strong>: obtunded / stuporous / hyperactive (HE, hypertensive encephalopathy, toxic).<br>
    • <strong>Behaviour</strong>: head pressing, propulsive walking, compulsive circling (forebrain — usually toward the lesion side).<br>
    • <strong>Postural reactions</strong> (proprioception, hopping) — abnormal in contralateral limbs with cortical / thalamic lesion.<br>
    • <strong>Cranial nerves</strong>: full battery — concurrent CN VII / VIII / V deficits localise to brainstem; concurrent CN III + anisocoria localises to midbrain.<br>
    • <strong>Postural / gait</strong> — UMN signs in opposite-side limbs from cortical lesion.<br>
    • <strong>Seizure history</strong> + focal twitching → forebrain (HE, neoplasia, MUA, toxin).<br>
    • <strong>Autonomic signs</strong> (megaoesophagus, urinary retention, dry mucosae, bilateral mydriasis) → dysautonomia.<br>
    Document objective findings — these direct the imaging plan (MRI brain ± CSF).
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const blindEyeDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.4);color:#F87171;">⚡ STEP 1 — RULE OUT EMERGENCIES IN MINUTES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    1. <strong>Tonometry</strong> on every blind eye — acute glaucoma can present with diffuse corneal oedema masking the fundus; IOP &gt;25 mmHg = sight-threatening.<br>
    2. <strong>Blood pressure</strong> (Doppler / oscillometric × 3 calm readings) on every older cat or dog with acute bilateral blindness — hypertensive retinopathy is reversible if treated within 24 h.<br>
    3. <strong>Mentation + neuro exam</strong> — anisocoria + altered mentation + blindness = central emergency (MRI + CSF as soon as stable).<br>
    4. <strong>Drug review</strong> — STOP enrofloxacin in any cat with acute blindness on a fluoroquinolone; reverse ivermectin / atropine / opioid exposure where possible.<br>
    5. <strong>Trauma / head injury</strong> — anisocoria + obtundation → mannitol 0.5–1 g/kg IV slow, emergent imaging, neurosurgery referral.<br>
    6. <strong>Glucose stick</strong> — severe hypoglycaemia in a small / young dog can mimic cortical blindness.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — STANDARD OPHTHALMIC TESTS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Schirmer Tear Test</strong> (before any drops): low STT + bilateral mydriasis + dry mucous membranes + autonomic signs = dysautonomia → bilateral cortical-like blindness in advanced cases.<br>
    <strong>Fluorescein stain</strong>: rule out ulcer/perforation before steroids; severe melting ulcers can cause perforation and blindness in days.<br>
    <strong>Tonometry</strong>: see emergency step. Glaucoma vs uveitis distinction critical.<br>
    <strong>Slit-lamp / focal light</strong>: aqueous flare, KP, synechiae, lens position, iris detail.<br>
    <strong>Mydriatic challenge (tropicamide 1%)</strong>: complete failure to dilate suggests posterior synechiae, iris atrophy, or pharmacological mydriasis already present.<br>
    <strong>Direct + indirect ophthalmoscopy</strong>: indirect first for retinal overview, direct for optic disc detail. Green filter helps distinguish pigment from haemorrhage; blue filter for fluorescein.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3 — CHROMATIC PLR + ERG (when fundus is normal but pupils are dilated and dazzle absent)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Chromatic PLR</strong> uses a handheld device or commercial torch with separate red and blue LEDs (e.g. Melan-100, BIOPAC chromatic):<br>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Condition</div><div style="font-weight:600;">Red PLR</div><div style="font-weight:600;">Blue PLR</div>
      <div>Normal</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
      <div>SARDS</div><div style="color:#F87171;">Absent</div><div style="color:#6EE7B7;">Present (melanopsin RGCs spared)</div>
      <div>Optic neuritis</div><div style="color:#F87171;">Absent</div><div style="color:#F87171;">Absent</div>
      <div>End-stage PRA / retinal degeneration</div><div style="color:#F87171;">Absent</div><div style="color:#FCD34D;">Reduced / absent</div>
      <div>Cortical blindness</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
    </div>
    <strong>Electroretinography (ERG)</strong> — gold-standard differentiator. Performed under sedation:<br>
    • Flat ERG + acute blindness + normal fundus + Cushingoid phenotype → <strong>SARDS</strong> (no treatment).<br>
    • Preserved ERG + normal fundus + absent menace + preserved dazzle/PLR → <strong>cortical blindness</strong> (MRI brain).<br>
    • Preserved ERG + abnormal optic disc + absent PLR → <strong>optic neuritis</strong> or optic nerve disease (MRI + CSF).<br>
    • Severely reduced ERG + tapetal hyperreflectivity → <strong>PRA / retinal degeneration</strong>.<br>
    Refer for ERG if non-fundoscopic causes need to be distinguished.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — SYSTEMIC + INFECTIOUS WORKUP</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Always:</strong> CBC, biochemistry, urinalysis, BP (≥3 calm readings). Faecal if indicated.<br><br>
    <strong>If hypertension confirmed (SBP &gt;160):</strong> renal panel + USG + UPC, T4 (cat &gt;7 yr), ACTH stim / LDDST (HAC in dog), serum aldosterone (Conn syndrome cat with hypokalaemia), urine catecholamines (pheochromocytoma — rare).<br><br>
    <strong>If SARDS suspected:</strong> full endocrine panel — ACTH stim and / or LDDST (40–60% have concurrent HAC-like biochemistry — "Cushingoid SARDS"), urine cortisol:creatinine.<br><br>
    <strong>Uveitis / chorioretinitis workup:</strong><br>
    • Cat: FeLV / FIV (PCR/Ag), <em>Toxoplasma gondii</em> IgG/IgM, FCoV titre (FIP), Bartonella, Cryptococcus LCAT, fungal serology (if endemic).<br>
    • Dog: Toxoplasma, Ehrlichia / Anaplasma / RMSF / Lyme (tick-borne panel), Leishmania (Mediterranean / imported), Blastomyces / Histoplasma / Coccidioides / Cryptococcus (regional fungal panel), Borrelia, Brucella canis.<br>
    • Both: thoracic + abdominal imaging in older patients (lymphoma, metastatic uveitis).<br><br>
    <strong>Hepatic encephalopathy workup:</strong> bile acids (pre + post-prandial), ammonia, abdominal ultrasound (PSS, microvascular dysplasia, hepatic mass).<br><br>
    <strong>Toxicology:</strong> blood lead, drug levels where applicable, owner-supplied product/dose.<br><br>
    <strong>Coagulation:</strong> PT/aPTT, platelet count, BMBT if hyphaema or vitreal haemorrhage.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 5 — ADVANCED IMAGING</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Ocular ultrasound (10–20 MHz)</strong> — indispensable when fundus is not visible (corneal oedema, mature cataract, hyphaema):<br>
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
    <strong>Chiasmal lesion — species note:</strong> dogs cross ~75% and cats ~65% of optic fibres at the chiasm, so chiasmal compression (e.g. pituitary macroadenoma) typically produces near-complete bilateral blindness rather than the discrete bitemporal hemianopia seen in humans (~50% crossover). Endocrine signs (HAC, diabetes insipidus) often accompany.
  </div>

</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Therapy pearls while you investigate:</strong><br>
  • <strong>Hypertensive emergency:</strong> amlodipine 0.625–1.25 mg (cat) or 0.1–0.5 mg/kg (dog) PO ± telmisartan; target SBP &lt;160 mmHg; treat underlying cause concurrently. Retinal detachments often reattach if BP controlled within 24–48 h.<br>
  • <strong>Optic neuritis (suspected MUA, post-MRI/CSF):</strong> prednisolone 2 mg/kg/day + adjunct (cytarabine, lomustine, mycophenolate, cyclosporine); rule out infectious cause first.<br>
  • <strong>SARDS:</strong> no proven specific therapy — IVIg / steroids unsupported; treat concurrent HAC if present; counsel on adaptation.<br>
  • <strong>Enrofloxacin retinal toxicity (cat):</strong> stop drug immediately and substitute; some retinal recovery if early. Avoid &gt;5 mg/kg/day; consider marbofloxacin / pradofloxacin in cats requiring fluoroquinolone.<br>
  • <strong>Hepatic encephalopathy:</strong> lactulose + low-protein diet + antibiotic (metronidazole, amoxiclav) + treat hepatic cause.<br>
  • <strong>Toxin / drug-induced cortical blindness:</strong> activated charcoal if recent ingestion, specific antidote (vitamin K1 for rodenticide; pamidronate for vitamin D; sugar / dextrose for hypoglycaemia; intralipid for permethrin / ivermectin), supportive care.<br>
  • <strong>Severe corneal opacity:</strong> definitive treatment (graft, keratectomy, cataract surgery) — referral if vision is salvageable.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
