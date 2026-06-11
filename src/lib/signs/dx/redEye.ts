// ── Red Eye — diagnostic approach (data) ────────────────────────────────────
// Migration of redEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../redEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const redEyeDx: DxApproach = {
  title: 'Red Eye',
  tabs: {

  history: {
    title: 'History: Red Eye',
    blocks: [
      { kind: 'branch', text: 'RED EYE vs PAINFUL EYE vs LOSS OF VISION' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">👁️ Red eye</strong><br>
      Ocular coat hyperaemia<br>
      Iris hyperaemia<br>
      Intraocular bleed<br>
      <span style="opacity:.75;">"WHERE is the redness?"</span>`,
          },
          {
            style: 'text-align:left;background:#0D7377;font-size:9px;',
            html: `<strong style="font-size:10px;">😣 Painful eye</strong><br>
      Blepharospasm · rubbing<br>
      Photophobia<br>
      Lacrimation · third eyelid protrusion<br>
      <span style="opacity:.75;">Corneal · uveal · glaucoma · orbital</span>`,
          },
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">👁️ Visual deficit</strong><br>
      Bumping into objects · uncertainty<br>
      Dazzle / menace / PLR changes<br>
      <span style="opacity:.75;">→ Always assess vision in any red eye</span>`,
          },
        ],
      },
      { kind: 'step', text: '📋 PRESENTING COMPLAINT — TARGETED HISTORY' },
      {
        kind: 'check',
        html: `<strong>Duration + onset:</strong><br>
    • Peracute (minutes–hours): trauma, foreign body, acute glaucoma (closed-angle), hyphaema with coagulopathy, corneal rupture<br>
    • Acute (1–3 days): ulcerative keratitis, anterior uveitis, conjunctivitis, orbital cellulitis<br>
    • Subacute (days–weeks): KCS, immune-mediated keratitis, episcleritis, chronic uveitis<br>
    • Chronic / progressive: pannus, eosinophilic keratitis (cats), corneal sequestrum, neoplasia, end-stage glaucoma<br><br>
    <strong>Ocular discharge:</strong><br>
    • Serous / clear → early viral, allergic, KCS (mild), reflex tearing (pain)<br>
    • Mucoid → KCS, allergy, chronic conjunctivitis<br>
    • Mucopurulent → bacterial conjunctivitis, KCS with secondary infection, deep ulcer<br>
    • Haemorrhagic → severe trauma, neoplasia, severe FHV-1 (cat), coagulopathy<br><br>
    <strong>Discomfort signs:</strong><br>
    • Rubbing/scratching · pawing at face · holding eye shut · photophobia<br>
    • Persistent third eyelid protrusion + miosis = classic uveitis triad with pain<br><br>
    <strong>Vision change:</strong><br>
    • Owner reports bumping objects, hesitancy in stairs, change in night vision<br>
    • Sudden onset blindness + red eye → uveitis, retinal detachment, optic neuritis, hyphaema, acute glaucoma<br><br>
    <strong>Unilateral vs bilateral:</strong><br>
    • Unilateral → local cause more likely (FB, ulcer, trauma, orbital, primary glaucoma in some breeds)<br>
    • Bilateral → systemic disease likely (hypertension, infectious uveitis, immune-mediated, allergic, KCS)`,
      },
      { kind: 'step', alt: true, text: '🩺 SYSTEMIC / GENERAL HISTORY' },
      {
        kind: 'check',
        html: `<strong>Concurrent illness:</strong><br>
    • PU/PD + red eye → check BP (hypertensive retinopathy → CKD/HAC/hyperthyroid)<br>
    • Weight loss + chronic uveitis → neoplastic (lymphoma) or infectious (FIV/FeLV/FIP, leishmaniasis, fungal)<br>
    • Bleeding elsewhere + hyphaema → coagulopathy (rodenticide, thrombocytopenia, DIC)<br>
    • Joint pain + uveitis → immune-mediated polyarthritis-uveitis (rare), Lyme<br>
    • Dermatitis + red eye → atopy, pemphigus, uveodermatologic (VKH-like)<br><br>
    <strong>Travel + exposure:</strong><br>
    • Endemic: leishmaniasis, ehrlichiosis, anaplasmosis, rickettsia, FIP (multi-cat), heartworm<br>
    • Tick exposure → tick-borne uveitis<br>
    • Hunting / outdoor → trauma, FB, infectious agents<br><br>
    <strong>Vaccination + parasiticide status:</strong><br>
    • Unvaccinated dog → CDV (uveitis), ICH adenovirus type 1 ("blue eye" — endothelial oedema after vaccination historically)<br>
    • FHV-1 / FCV outbreak history in cats<br><br>
    <strong>Drug history:</strong><br>
    • Systemic steroids → can mask uveitis, predispose to corneal infection<br>
    • Topical steroids on undiagnosed ulcer → catastrophic stromal melting<br>
    • Atropine in narrow ICA → triggers acute glaucoma<br>
    • Cytotoxic drugs → mucositis<br><br>
    <strong>Diet:</strong><br>
    • Taurine-deficient diet in cats → retinal degeneration (not red eye but vision)<br>
    • Raw diet → infectious risk (toxoplasma)`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:var(--tone-warning-fg);">Brachycephalic</strong> (Pug, Boston, French Bulldog, Pekingese, Shih Tzu)<br>→ Exposure keratopathy · ulcers · pigmentary keratitis · proptosis risk<br><br>
        <strong style="color:var(--tone-green-fg);">Cocker Spaniel · CKCS · Lhasa Apso · Bichon · Westie · Yorkie</strong><br>→ KCS (immune-mediated) · primary closed-angle glaucoma (Cocker, Basset, Springer)<br><br>
        <strong style="color:var(--tone-danger-fg);">German Shepherd</strong><br>→ Chronic superficial keratitis (pannus) · plasmoma · pigmentary uveitis<br><br>
        <strong style="color:var(--tone-violet-fg);">Golden Retriever</strong><br>→ Pigmentary uveitis · primary uveitic glaucoma · uveal cysts<br><br>
        <strong style="color:var(--tone-warning-fg);">Collie / Sheltie</strong><br>→ Nodular granulomatous episcleritis (NGE) · Collie eye anomaly<br><br>
        <strong style="color:var(--tone-danger-fg);">Boxer · Dane · Shar-Pei</strong><br>→ Entropion · ulcers · indolent erosion (Boxer ulcer)<br><br>
        <strong style="color:var(--tone-green-fg);">Akita · Samoyed · Husky</strong><br>→ Uveodermatologic syndrome (VKH-like)
      </div>
      <div>
        <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:var(--tone-violet-fg);">Young cat</strong><br>→ FHV-1 keratitis · eosinophilic keratitis · symblepharon · viral URTI conjunctivitis<br><br>
        <strong style="color:var(--tone-green-fg);">Persian / Himalayan / Exotic SH</strong><br>→ Brachycephalic ocular surface disease · corneal sequestrum · entropion<br><br>
        <strong style="color:var(--tone-warning-fg);">Middle-aged–older cat</strong><br>→ Uveitis (FIV/FeLV/FIP/toxoplasma) · iris melanoma · hypertensive retinopathy<br><br>
        <strong style="color:var(--tone-danger-fg);">Outdoor cat</strong><br>→ Trauma · proptosis · uveitis (FIV, toxoplasma)<br><br>
        <strong style="color:var(--tone-info-fg);">Burmese</strong><br>→ Corneal sequestrum predisposed<br><br>
        <strong style="color:var(--tone-warning-fg);">FIV/FeLV positive</strong><br>→ Anterior uveitis · lymphoma (orbital, intraocular)
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS — REFER OR SCREEN URGENTLY',
        html: `Acute vision loss · severe pain · proptosis · suspected globe rupture · marked corneal oedema (diffuse "blue eye") · hyphaema + neurological signs (intracranial bleed) · uveitis + bilateral retinal detachment (hypertension) · chemical burns`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Red Eye',
    blocks: [
      { kind: 'step', text: '🩺 HANDS-OFF — OBSERVE BEFORE YOU TOUCH' },
      {
        kind: 'check',
        html: `<strong>From a distance in ambient light:</strong><br>
    • <strong>Globe size + position:</strong> Buphthalmos (chronic glaucoma), microphthalmos (congenital), exophthalmos (orbital), enophthalmos (Horner, pain, dehydration, MMM atrophy)<br>
    • <strong>Eyelid conformation:</strong> Blepharospasm = pain; entropion / ectropion; ptosis (Horner CN III · CN VII)<br>
    • <strong>Third eyelid:</strong> Persistent protrusion → pain, sympathetic loss (Horner), dysautonomia, retrobulbar mass, microphthalmos, dehydration<br>
    • <strong>Symmetry:</strong> Compare eyes side-by-side — anisocoria, asymmetric exophthalmos, facial swelling<br>
    • <strong>Discharge character:</strong> Serous · mucoid · purulent · sanguineous<br>
    • <strong>Behaviour / vision:</strong> Bumping objects, head tilt, hesitancy → vision deficit`,
      },
      { kind: 'step', alt: true, text: '🩺 CRANIAL NERVE / VISION BATTERY' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Test</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Interprets</div>
      <div><strong>Menace response</strong></div><div>CN II → CN VII · cortical pathway · ≥10–12 wks for development</div>
      <div><strong>Dazzle reflex</strong></div><div>Subcortical (CN II → CN VII via colliculus) — present even when blind cortically</div>
      <div><strong>Direct PLR</strong></div><div>CN II afferent → CN III efferent — ipsilateral pupil constricts</div>
      <div><strong>Consensual PLR</strong></div><div>Light in eye A → pupil B constricts; tests crossed optic fibres</div>
      <div><strong>Swinging-light test</strong></div><div>Detects afferent pupillary defect (CN II / retinal disease)</div>
      <div><strong>Palpebral reflex</strong></div><div>CN V (sensory) → CN VII (motor) — blink response</div>
      <div><strong>Corneal reflex</strong></div><div>CN V (sensory) → CN VI/VII — corneal touch → blink + globe retraction</div>
      <div><strong>Vestibulo-ocular reflex</strong></div><div>CN VIII (vestibular) → III/IV/VI — physiological nystagmus on head rotation</div>
      <div><strong>Tracking / cotton ball</strong></div><div>Vision · binocular coordination</div>
    </div>
    <div style="margin-top:6px;font-size:9.5px;color:var(--gray);line-height:1.5;">
      💡 Absent menace + intact dazzle + intact PLR = cortical blindness · Absent menace + absent dazzle + absent PLR = pre-geniculate lesion (retina / optic nerve / chiasm).<br>
      💡 In any red eye, PLR is essential — miosis → uveitis · mydriasis → glaucoma or retinal/optic nerve disease.
    </div>`,
      },
      { kind: 'step', alt: true, text: '👀 OUTSIDE → IN: SYSTEMATIC OCULAR EXAM' },
      {
        kind: 'check',
        html: `<strong>1. Periocular skin + eyelids:</strong> dermatitis, swelling, alopecia, ulcers, masses, Meibomian gland eversion (chalazion, MGD, neoplasia). Evert lids — distichiasis, ectopic cilia, FB, ulcers.<br>
    <strong>2. Third eyelid (TEL):</strong> follicular hyperplasia (inner surface), gland prolapse ("cherry eye"), scrolled cartilage, neoplasia (lymphoma, SCC, hemangiosarcoma), plasmoma (chronic plasmacytic — GSD).<br>
    <strong>3. Conjunctiva:</strong> hyperaemia distribution (palpebral vs bulbar vs forniceal); chemosis; follicles; FB; subconjunctival haemorrhage.<br>
    <strong>4. Episclera / sclera:</strong> straight radial vessels close to limbus = deep injection → consider uveitis, glaucoma, scleritis. Nodules (NGE).<br>
    <strong>5. Cornea:</strong>
    <div style="margin-left:8px;">
      • Clarity: oedema (diffuse → endothelial; focal → epithelial/stromal), pigmentation, lipid/calcium, scar<br>
      • Vascularisation: superficial branching tree pattern vs deep straight brush at limbus<br>
      • Surface defect: fluorescein stain<br>
      • Foreign body, sequestrum (cat — black plaque), bulla, descemetocele
    </div>
    <strong>6. Anterior chamber:</strong>
    <div style="margin-left:8px;">
      • Depth (shallow with lens luxation forward, deep with posterior lens luxation)<br>
      • Aqueous flare (Tyndall — focal light beam visible in AC = protein leakage)<br>
      • Hypopyon (white) vs hyphaema (red) vs fibrin (clot)<br>
      • Keratic precipitates (KP — endothelial; chronic uveitis)
    </div>
    <strong>7. Iris:</strong> colour change, rubeosis, pigmented or vascular mass, iris cyst (transilluminates) vs neoplasia (does not), synechiae (PS = posterior, iris-to-lens · PAS = peripheral anterior, iris-to-cornea/angle).<br>
    <strong>8. Pupil:</strong> size, shape (dyscoria → synechiae, iris atrophy, congenital), symmetry (anisocoria), PLR.<br>
    <strong>9. Lens:</strong> position (subluxation = aphakic crescent · luxation), opacity (cataract vs nuclear sclerosis — retroillumination), lens capsule rupture.<br>
    <strong>10. Vitreous + fundus:</strong> haemorrhage, asteroid hyalosis, retinal detachment, optic disc oedema (papilloedema · papillitis), tapetal hyperreflectivity (retinal atrophy) vs dullness (oedema/infiltrate), retinal vessel attenuation, chorioretinitis foci.`,
      },
      { kind: 'step', alt: true, text: '🔍 KEY DISCRIMINATORS — PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Conjunctival redness · normal cornea/pupil · ↑ tearing</div><div style="color:var(--tone-green-fg);">Conjunctivitis (allergic · bacterial · viral)</div>
      <div>Conjunctival redness · mucoid discharge · dull cornea · low STT</div><div style="color:var(--tone-warning-fg);">Keratoconjunctivitis sicca (KCS)</div>
      <div>Fluorescein +ve corneal defect · pain · neovasc.</div><div style="color:var(--tone-danger-fg);">Ulcerative keratitis</div>
      <div>Fluorescein +ve + stromal melt / mucopurulent</div><div style="color:var(--tone-danger-title);">Infected / melting ulcer — emergency</div>
      <div>Episcleral injection · miosis · aqueous flare · ↓ IOP</div><div style="color:var(--tone-danger-fg);">Anterior uveitis</div>
      <div>Episcleral injection · mydriasis · diffuse oedema · ↑ IOP &gt;25</div><div style="color:var(--tone-danger-title);">Acute glaucoma — emergency</div>
      <div>Painful exophthalmos + pain on opening mouth</div><div style="color:var(--tone-danger-fg);">Orbital cellulitis / abscess</div>
      <div>Chronic non-painful exophthalmos</div><div style="color:var(--tone-warning-fg);">Orbital neoplasia until proven otherwise</div>
      <div>Hyphaema + bilateral · retinal detachment</div><div style="color:var(--tone-danger-title);">Systemic hypertension</div>
      <div>Pigmented iris lesion · ↑ IOP · raised + transilluminating?</div><div style="color:var(--tone-warning-fg);">Iris cyst (benign) vs melanoma (solid)</div>
      <div>Black corneal plaque · cat</div><div style="color:var(--tone-violet-fg);">Corneal sequestrum</div>
      <div>Conjunctival follicles + nasal/oral lesions + young cat</div><div style="color:var(--tone-green-fg);">FHV-1 / FCV viral conjunctivitis</div>
      <div>GSD + bilateral lateral pigmented corneal vasc.</div><div style="color:var(--tone-info-fg);">Pannus (chronic superficial keratitis)</div>
    </div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Red Eye — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — SAFETY CHECK BEFORE ANY TEST' },
      {
        kind: 'check',
        html: `<strong>Suspected globe / scleral rupture or deep ulcer:</strong> Minimise handling. <strong>DO NOT</strong> apply pressure, do <strong>NOT</strong> perform Schiotz/applanation tonometry, do not flush. Use rebound tonometry only if essential. Place Elizabethan collar. Refer same day if available. Cover with broad-spectrum systemic antibiotics (e.g. amoxicillin–clavulanate ± fluoroquinolone for Pseudomonas risk) and systemic NSAID/analgesia.<br><br>
    <strong>Order of tests is critical:</strong> Schirmer Tear Test FIRST (any drops alter the result) → ocular surface cytology/swab if indicated → fluorescein stain → tonometry → topical anaesthetic → mydriatic for fundoscopy LAST. Tonometry before mydriatics.`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — SCHIRMER TEAR TEST (STT-1)' },
      {
        kind: 'check',
        html: `<strong>Performed before any solutions, drops, or bright light.</strong><br>
    • Technique: fold strip in packaging → retract lower lid → place tip at lateral fornix → close lids for 60 s.<br>
    • <strong>Dog normal:</strong> ≥15 mm/min · 10–14 = early/borderline KCS · &lt;10 = clinical KCS · &lt;5 = severe<br>
    • <strong>Cat normal:</strong> wide reference (median ~14 mm/min, 95% PI ~8–22); a substantial proportion of clinically normal cats read &lt;10. Interpret with clinical signs (mucoid discharge, corneal scarring) — single low readings without clinical correlation are non-diagnostic.<br>
    • <strong>Pitfalls:</strong> Recent topicals · sedation · third eyelid disease · neurogenic KCS (CN VII) — often dry ipsilateral nostril; do contralateral STT for comparison.`,
      },
      { kind: 'step', alt: true, text: 'STEP 3 — OCULAR SURFACE SAMPLING (if indicated)' },
      {
        kind: 'check',
        html: `<strong>Indications:</strong> Deep, melting or non-healing ulcers · purulent conjunctivitis · suspected infectious cause · pre-surgical.<br>
    • <strong>Cytology:</strong> cytobrush or spatula after topical anaesthetic; Diff-Quik. Look for bacteria (intracellular = significant), eosinophils (FHV-1 / eosinophilic keratoconjunctivitis), neoplastic cells, fungal hyphae.<br>
    • <strong>Culture + sensitivity:</strong> swab BEFORE topicals; transport in Amies/charcoal. Empirical first-line antibiotics based on cytology while awaiting C&amp;S.<br>
    • <strong>PCR (cats):</strong> Conjunctival/corneal swab for FHV-1, FCV, <em>Chlamydia felis</em>, <em>Mycoplasma felis</em>. Interpret with care — FHV-1 PCR positive in many normal cats (latent infection).`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — FLUORESCEIN STAIN' },
      {
        kind: 'check',
        html: `• Wet single strip with saline; touch bulbar conjunctiva; flush excess; view with cobalt blue light.<br>
    • <strong>Positive uptake:</strong> Epithelial defect → ulcer. Depth and shape matter:<br>
    &nbsp;&nbsp;– Superficial uptake only → simple ulcer<br>
    &nbsp;&nbsp;– Crater with non-staining base + green halo → stromal ulcer<br>
    &nbsp;&nbsp;– Loose-edged epithelium → indolent / SCCED (Boxer ulcer)<br>
    &nbsp;&nbsp;– Central dark non-staining defect with surrounding green halo → descemetocele (urgent surgery)<br>
    &nbsp;&nbsp;– Pooling green stream = aqueous leak → <strong>Seidel-positive globe rupture</strong> (emergency)<br>
    • <strong>Jones test:</strong> Stain placed in eye should appear at nostril within 5 min → tests nasolacrimal patency.<br>
    • <strong>Pitfalls:</strong> Excess stain pools in pockets and false-positives; mucus retains stain; rose bengal more sensitive for FHV-1 dendritic ulcers (geographic/dendritic uptake).`,
      },
      { kind: 'step', alt: true, text: 'STEP 5 — TONOMETRY (IOP)' },
      {
        kind: 'check',
        html: `<strong>Methods:</strong> Rebound (TonoVet) preferred — no anaesthetic required, accurate; Applanation (Tono-Pen) — topical anaesthetic needed; Schiotz — indentation, weight calibration needed.<br>
    <strong>Normal IOP:</strong> 10–25 mmHg both species. Inter-eye difference of &gt;8 mmHg is generally considered clinically significant.<br>
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">IOP</div><div style="font-weight:600;">Interpretation</div>
      <div>&gt;25 mmHg + clinical signs</div><div style="color:var(--tone-danger-title);">Glaucoma (primary or secondary)</div>
      <div>&gt;40 mmHg</div><div style="color:#EF4444;font-weight:700;">Acute glaucoma — emergency · vision-threatening</div>
      <div>10–25</div><div style="color:var(--tone-green-fg);">Normal</div>
      <div>&lt;10 mmHg</div><div style="color:var(--tone-warning-fg);">Uveitis (most common) · phthisis bulbi · scleral rupture</div>
      <div>Inter-eye difference &gt;8 mmHg</div><div style="color:var(--tone-warning-fg);">Clinically significant — investigate the abnormal eye</div>
    </div>
    <strong>Pitfalls:</strong> Squeezing eyelids · jugular compression · head position · poor calibration → falsely high readings. Take 3+ readings and use the mean.`,
      },
      { kind: 'step', alt: true, text: 'STEP 6 — FOCAL LIGHT + SLIT-LAMP / OPHTHALMOSCOPY' },
      {
        kind: 'check',
        html: `<strong>Direct ophthalmoscope / pen torch / Finoff transilluminator:</strong> evaluate cornea, AC, iris, pupil, lens, retinal red reflex.<br>
    • <strong>Tyndall effect:</strong> Darken room → narrow slit of light tangentially through AC → visible beam = aqueous flare (protein) → anterior uveitis.<br>
    • <strong>Retroillumination:</strong> light into eye; tapetal reflection silhouettes opacities. Parallax (move head laterally): opacity moving with you = posterior to lens, against you = anterior.<br>
    • <strong>Direct ophthalmoscopy:</strong> 19.5× upright image, small field; examine optic disc, retinal vessels, tapetal/non-tapetal junction, periphery. Green filter helps distinguish pigment from haemorrhage.<br>
    • <strong>Indirect ophthalmoscopy</strong> (panoptic or condensing lens + light source): inverted larger field — pupil dilation needed; preferred for retinal detachment, optic nerve, chorioretinitis.<br>
    • <strong>Slit lamp</strong> (if available): biomicroscopic depth assessment — KP, flare, fibrin, lens capsule, vitreous strands.<br>
    • <strong>Pupil dilation:</strong> Tropicamide 1% topically (15–30 min onset, 2–4 h duration). Tonometry FIRST. Avoid in suspected narrow ICA (Cocker Spaniel) — may precipitate acute glaucoma.`,
      },
      { kind: 'step', alt: true, text: 'STEP 7 — TARGETED ADVANCED TESTS' },
      {
        kind: 'check',
        html: `<strong>Gonioscopy</strong> — direct visualisation of iridocorneal angle. Indicated in any primary glaucoma diagnosis + screen contralateral eye for narrow/closed angle.<br><br>
    <strong>Ocular ultrasound (10–20 MHz):</strong> indispensable when fundus cannot be visualised (corneal oedema, hyphaema, mature cataract).<br>
    • Retinal detachment (sea-gull / V-shape attached at optic disc)<br>
    • Vitreal haemorrhage / inflammatory debris<br>
    • Lens position (luxation, intumescence)<br>
    • Intraocular mass<br>
    • Posterior scleritis<br><br>
    <strong>Systemic workup for uveitis or hyphaema (BOTH species):</strong>
    <div style="margin-left:8px;">
      • Haematology (CBC + smear), serum biochemistry, urinalysis<br>
      • Coagulation: BMBT, PT, aPTT, platelet count<br>
      • Blood pressure (Doppler or oscillometric) — repeat ≥3 times calmly<br>
      • Thoracic + abdominal imaging in older patients (rule out neoplasia)<br>
      • Infectious panel: FIV/FeLV PCR/Ag (cat), Toxoplasma IgG/IgM, FCoV titre (FIP), Bartonella, leishmaniasis, ehrlichiosis/anaplasmosis (endemic), heartworm, Cryptococcus LCAT, fungal serology (region-dependent: Histoplasma, Blastomyces, Coccidioides)<br>
      • Anti-nuclear antibody / Coombs · IMHA / immune-mediated rule-out<br>
      • Lens-induced uveitis: cataract evaluation
    </div><br>
    <strong>Aqueocentesis</strong> — referral-only — for cytology/PCR when systemic workup is non-diagnostic.<br><br>
    <strong>CT / MRI orbit:</strong> Mandatory for any retrobulbar disease (cellulitis vs neoplasia · oral exam under GA), proptosis recovery planning, suspected optic chiasm lesion.<br><br>
    <strong>Electroretinography (ERG):</strong> referral test — sudden acquired retinal degeneration (SARDS — flat ERG, normal MRI), differentiates retinal vs optic nerve / central blindness.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Empirical treatment pearls while you investigate:</strong><br>
  • <strong>NEVER apply topical steroids</strong> without a negative fluorescein stain — masks/worsens ulcers and infectious keratitis.<br>
  • Suspected uveitis without ulcer: topical 1% prednisolone acetate q6–8h + topical atropine 1% (if IOP normal/low — do NOT use if mydriatic puts angle at risk) + systemic NSAID (or steroid if no ulcer + no infectious differential).<br>
  • Acute glaucoma (IOP &gt;40): topical timolol 0.5% + dorzolamide 2% + latanoprost 0.005% q6h; systemic mannitol 1 g/kg IV slow if vision-threatening — refer same day.<br>
  • Bacterial ulcer / melting: cytology-directed topical antibiotic q1–2h (fluoroquinolone + cefazolin if Gram +/- mixed); serum tears q1h; systemic doxycycline (anti-MMP); E-collar; recheck 24–48 h.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
