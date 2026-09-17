// ── Red Eye — diagnostic approach (data) ────────────────────────────────────
// Migration of redEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../redEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, stepPatterns, numBadge, bullets } from './shared/dxHelpers'

export const redEyeDx: DxApproach = {
  sign: 'red-eye',
  title: 'Red Eye',
  tabs: {

  history: {
    title: 'History: Red Eye',
    blocks: [
      { kind: 'goal', text: 'RED EYE vs PAINFUL EYE vs LOSS OF VISION' },
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
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
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

      { kind: 'step', text: '📋 STEP 1 — PRESENTING COMPLAINT: TARGETED HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Duration + onset',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Peracute</strong><br>minutes–hours', { text: bullets(['Trauma', 'Foreign body', 'Acute closed-angle glaucoma', 'Hyphaema with coagulopathy', 'Corneal rupture']), tone: 'teal' }],
          ['<strong>Acute</strong><br>1–3 days', { text: bullets(['Ulcerative keratitis', 'Anterior uveitis', 'Conjunctivitis', 'Orbital cellulitis']), tone: 'teal' }],
          ['<strong>Subacute</strong><br>days–weeks', { text: bullets(['KCS', 'Immune-mediated keratitis', 'Episcleritis', 'Chronic uveitis']), tone: 'teal' }],
          ['<strong>Chronic / progressive</strong>', { text: bullets(['Pannus', 'Eosinophilic keratitis (🐱)', 'Corneal sequestrum', 'Neoplasia', 'End-stage glaucoma']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Ocular discharge',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Character', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Serous / clear</strong>', { text: bullets(['Early viral', 'Allergic', 'Mild KCS', 'Reflex tearing (pain)']), tone: 'teal' }],
          ['<strong>Mucoid</strong>', { text: bullets(['KCS', 'Allergy', 'Chronic conjunctivitis']), tone: 'teal' }],
          ['<strong>Mucopurulent</strong>', { text: bullets(['Bacterial conjunctivitis', 'KCS with secondary infection', 'Deep ulcer']), tone: 'teal' }],
          ['<strong>Haemorrhagic</strong>', { text: bullets(['Severe trauma', 'Neoplasia', 'Severe FHV-1 (🐱)', 'Coagulopathy']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Discomfort, vision and laterality',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Feature', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Discomfort signs</strong>', { text: bullets(['Rubbing / scratching', 'Pawing at face', 'Holding the eye shut', 'Photophobia. <strong>Persistent third eyelid protrusion + miosis = the classic painful uveitis triad</strong>']), tone: 'teal' }],
          ['<strong>Vision change</strong>', { text: bullets(['Bumping objects', 'Hesitancy on stairs', 'Change in night vision']), tone: 'teal' }],
          ['<strong>Sudden blindness + red eye</strong>', { text: bullets(['Uveitis', 'Retinal detachment', 'Optic neuritis', 'Hyphaema', 'Acute glaucoma']), tone: 'danger' }],
          ['<strong>Unilateral</strong>', { text: bullets(['Local cause more likely — FB', 'Ulcer', 'Trauma', 'Orbital disease', 'Primary glaucoma in some breeds']), tone: 'teal' }],
          ['<strong>Bilateral</strong>', { text: bullets(['Systemic disease likely — hypertension', 'Infectious uveitis', 'Immune-mediated', 'Allergic', 'KCS']), tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🩺 STEP 2 — SYSTEMIC / GENERAL HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Concurrent illness',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Concurrent sign', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>PU/PD + red eye</strong>', { text: bullets(['Check BP — hypertensive retinopathy from CKD', 'HAC', 'Hyperthyroidism']), tone: 'teal' }],
          ['<strong>Weight loss + chronic uveitis</strong>', { text: 'Neoplastic (lymphoma) or infectious (FIV / FeLV / FIP · leishmaniasis · fungal)', tone: 'teal' }],
          ['<strong>Bleeding elsewhere + hyphaema</strong>', { text: bullets(['Coagulopathy — rodenticide', 'Thrombocytopenia', 'DIC']), tone: 'teal' }],
          ['<strong>Joint pain + uveitis</strong>', { text: bullets(['Immune-mediated polyarthritis-uveitis (rare)', 'Lyme']), tone: 'teal' }],
          ['<strong>Dermatitis + red eye</strong>', { text: bullets(['Atopy', 'Pemphigus', 'Uveodermatologic (VKH-like)']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Exposure, vaccination, drugs and diet',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['History', { text: 'Significance', tone: 'teal' }],
        rows: [
          ['<strong>Travel / endemic exposure</strong>', { text: bullets(['Leishmaniasis', 'Ehrlichiosis', 'Anaplasmosis', 'Rickettsia', 'FIP (multi-cat)', 'Heartworm']), tone: 'teal' }],
          ['<strong>Tick exposure</strong>', { text: 'Tick-borne uveitis', tone: 'teal' }],
          ['<strong>Hunting / outdoor</strong>', { text: bullets(['Trauma', 'FB', 'Infectious agents']), tone: 'teal' }],
          ['<strong>Unvaccinated dog</strong>', { text: bullets(['CDV (uveitis)', 'ICH adenovirus type 1 ("blue eye" — endothelial oedema after vaccination historically)']), tone: 'teal' }],
          ['<strong>🐱 FHV-1 / FCV outbreak history</strong>', { text: 'Viral keratoconjunctivitis', tone: 'teal' }],
          ['<strong>Systemic steroids</strong>', { text: 'Can mask uveitis and predispose to corneal infection', tone: 'teal' }],
          ['<strong>Topical steroids on an undiagnosed ulcer</strong>', { text: '<strong>Catastrophic stromal melting</strong>', tone: 'danger' }],
          ['<strong>Atropine in a narrow ICA</strong>', { text: 'Triggers acute glaucoma', tone: 'danger' }],
          ['<strong>Cytotoxic drugs</strong>', { text: 'Mucositis', tone: 'teal' }],
          ['<strong>🐱 Taurine-deficient diet</strong>', { text: 'Retinal degeneration — vision, not red eye', tone: 'teal' }],
          ['<strong>Raw diet</strong>', { text: 'Infectious risk — toxoplasma', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🐾 STEP 3 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Pug', 'Boston Terrier', 'French Bulldog', 'Pekingese', 'Shih Tzu'], tone: 'warning', html: 'brachycephalic — exposure keratopathy · ulcers · pigmentary keratitis · proptosis risk.' },
          { breeds: ['Cocker Spaniel', 'Cavalier King Charles Spaniel', 'Lhasa Apso', 'Bichon', 'West Highland White Terrier', 'Yorkshire Terrier'], tone: 'green', html: 'KCS (immune-mediated) · primary closed-angle glaucoma (Cocker, Basset, Springer).' },
          { breeds: ['German Shepherd'], tone: 'danger', html: 'chronic superficial keratitis (pannus) · plasmoma · pigmentary uveitis.' },
          { breeds: ['Golden Retriever'], tone: 'violet', html: 'pigmentary uveitis · primary uveitic glaucoma · uveal cysts.' },
          { breeds: ['Collie', 'Sheltie'], tone: 'warning', html: 'nodular granulomatous episcleritis (NGE) · Collie eye anomaly.' },
          { breeds: ['Boxer', 'Great Dane', 'Shar-Pei'], tone: 'danger', html: 'entropion · ulcers · indolent erosion (Boxer ulcer).' },
          { breeds: ['Akita', 'Samoyed', 'Husky'], tone: 'green', html: 'uveodermatologic syndrome (VKH-like).' },
        ],
        cat: [
          { breeds: ['Persian', 'Himalayan', 'Exotic Shorthair'], tone: 'green', html: 'brachycephalic ocular surface disease · corneal sequestrum · entropion.' },
          { breeds: ['Burmese'], tone: 'info', html: 'corneal sequestrum predisposed.' },
          { breeds: ['Young cat'], group: 'signalment', tone: 'violet', html: 'FHV-1 keratitis · eosinophilic keratitis · symblepharon · viral URTI conjunctivitis.' },
          { breeds: ['Middle-aged–older cat'], group: 'signalment', tone: 'warning', html: 'uveitis (FIV / FeLV / FIP / toxoplasma) · iris melanoma · hypertensive retinopathy.' },
          { breeds: ['Outdoor cat'], group: 'signalment', tone: 'danger', html: 'trauma · proptosis · uveitis (FIV, toxoplasma).' },
          { breeds: ['FIV / FeLV positive'], group: 'signalment', tone: 'warning', html: 'anterior uveitis · lymphoma (orbital, intraocular).' },
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS — REFER OR SCREEN URGENTLY',
        items: [
          `Acute vision loss`,
          `Severe pain`,
          `Proptosis`,
          `Suspected globe rupture`,
          `Marked corneal oedema (diffuse "blue eye")`,
          `Hyphaema + neurological signs (intracranial bleed)`,
          `Uveitis + bilateral retinal detachment (hypertension)`,
          `Chemical burns`,
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Red Eye',
    blocks: [
      ...stepTable(1, 'HANDS-OFF — OBSERVE BEFORE YOU TOUCH', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Observe', { text: 'What to note', tone: 'teal' }],
        rows: [
          ['<strong>Globe size + position</strong>', { text: bullets(['Buphthalmos (chronic glaucoma)', 'Microphthalmos (congenital)', 'Exophthalmos (orbital)', 'Enophthalmos (Horner · pain · dehydration · MMM atrophy)']), tone: 'teal' }],
          ['<strong>Eyelid conformation</strong>', { text: bullets(['Blepharospasm = pain', 'Entropion / ectropion', 'Ptosis (Horner · CN III · CN VII)']), tone: 'teal' }],
          ['<strong>Third eyelid</strong>', { text: bullets(['Persistent protrusion → pain', 'Sympathetic loss (Horner)', 'Dysautonomia', 'Retrobulbar mass', 'Microphthalmos', 'Dehydration']), tone: 'teal' }],
          ['<strong>Symmetry</strong>', { text: bullets(['Compare eyes side-by-side — anisocoria', 'Asymmetric exophthalmos', 'Facial swelling']), tone: 'teal' }],
          ['<strong>Discharge character</strong>', { text: bullets(['Serous', 'Mucoid', 'Purulent', 'Sanguineous']), tone: 'teal' }],
          ['<strong>Behaviour / vision</strong>', { text: bullets(['Bumping objects', 'Head tilt', 'Hesitancy → vision deficit']), tone: 'teal' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'CRANIAL NERVE / VISION BATTERY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Interprets', tone: 'teal' }],
        rows: [
          ['<strong>Menace response</strong>', { text: bullets(['CN II → CN VII', 'Cortical pathway', '≥10–12 wks for development']), tone: 'teal' }],
          ['<strong>Dazzle reflex</strong>', { text: 'Subcortical (CN II → CN VII via colliculus) — present even when cortically blind', tone: 'teal' }],
          ['<strong>Direct PLR</strong>', { text: 'CN II afferent → CN III efferent — ipsilateral pupil constricts', tone: 'teal' }],
          ['<strong>Consensual PLR</strong>', { text: bullets(['Light in eye A → pupil B constricts', 'Tests crossed optic fibres']), tone: 'teal' }],
          ['<strong>Swinging-light test</strong>', { text: 'Detects an afferent pupillary defect — CN II / retinal disease', tone: 'teal' }],
          ['<strong>Palpebral reflex</strong>', { text: 'CN V (sensory) → CN VII (motor) — blink response', tone: 'teal' }],
          ['<strong>Corneal reflex</strong>', { text: 'CN V (sensory) → CN VI/VII — corneal touch → blink + globe retraction', tone: 'teal' }],
          ['<strong>Vestibulo-ocular reflex</strong>', { text: 'CN VIII (vestibular) → III/IV/VI — physiological nystagmus on head rotation', tone: 'teal' }],
          ['<strong>Tracking / cotton ball</strong>', { text: bullets(['Vision', 'Binocular coordination']), tone: 'teal' }],
        ],
      }, '🩺'),
      {
        kind: 'note',
        html: `💡 Absent menace + intact dazzle + intact PLR = <strong>cortical blindness</strong> · Absent menace + absent dazzle + absent PLR = <strong>pre-geniculate lesion</strong> (retina / optic nerve / chiasm).<br>
      💡 In any red eye, PLR is essential — <strong>miosis → uveitis</strong> · <strong>mydriasis → glaucoma</strong> or retinal / optic nerve disease.`,
      },

      { kind: 'step', text: '👀 STEP 3 — OUTSIDE → IN: SYSTEMATIC OCULAR EXAM', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Looking for', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Periocular skin + eyelids</strong>`, { text: bullets(['Dermatitis', 'Swelling', 'Alopecia', 'Ulcers', 'Masses', 'Meibomian gland eversion (chalazion · MGD · neoplasia). <strong>Evert lids</strong> — distichiasis', 'Ectopic cilia', 'FB', 'Ulcers']), tone: 'teal' }],
          [`${numBadge(2)}<strong>Third eyelid (TEL)</strong>`, { text: bullets(['Follicular hyperplasia (inner surface)', 'Gland prolapse ("cherry eye")', 'Scrolled cartilage', 'Neoplasia (lymphoma · SCC · haemangiosarcoma)', 'Plasmoma (chronic plasmacytic — GSD)']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Conjunctiva</strong>`, { text: bullets(['Hyperaemia distribution (palpebral vs bulbar vs forniceal)', 'Chemosis', 'Follicles', 'FB', 'Subconjunctival haemorrhage']), tone: 'teal' }],
          [`${numBadge(4)}<strong>Episclera / sclera</strong>`, { text: bullets(['Straight radial vessels close to the limbus = deep injection → consider uveitis', 'Glaucoma', 'Scleritis. Nodules (NGE)']), tone: 'teal' }],
          [`${numBadge(5)}<strong>Cornea</strong>`, { text: bullets(['Clarity — oedema (diffuse → endothelial; focal → epithelial / stromal)', 'Pigmentation', 'Lipid / calcium', 'Scar. Vascularisation — superficial branching tree vs deep straight brush at limbus. Surface defect (fluorescein). Foreign body', 'Sequestrum (🐱 black plaque)', 'Bulla', 'Descemetocele']), tone: 'teal' }],
          [`${numBadge(6)}<strong>Anterior chamber</strong>`, { text: bullets(['Depth (shallow with forward lens luxation, deep with posterior luxation)', 'Aqueous flare (Tyndall — focal light beam visible in AC = protein leakage)', 'Hypopyon (white) vs hyphaema (red) vs fibrin (clot)', 'Keratic precipitates (endothelial; chronic uveitis)']), tone: 'teal' }],
          [`${numBadge(7)}<strong>Iris</strong>`, { text: bullets(['Colour change', 'Rubeosis', 'Pigmented or vascular mass', 'Iris cyst (transilluminates) vs neoplasia (does not)', 'Synechiae (PS = posterior, iris-to-lens · PAS = peripheral anterior, iris-to-cornea/angle)']), tone: 'teal' }],
          [`${numBadge(8)}<strong>Pupil</strong>`, { text: bullets(['Size', 'Shape (dyscoria → synechiae · iris atrophy · congenital)', 'Symmetry (anisocoria)', 'PLR']), tone: 'teal' }],
          [`${numBadge(9)}<strong>Lens</strong>`, { text: bullets(['Position (subluxation = aphakic crescent · luxation)', 'Opacity (cataract vs nuclear sclerosis — retroillumination)', 'Lens capsule rupture']), tone: 'teal' }],
          [`${numBadge(10)}<strong>Vitreous + fundus</strong>`, { text: bullets(['Haemorrhage', 'Asteroid hyalosis', 'Retinal detachment', 'Optic disc oedema (papilloedema · papillitis)', 'Tapetal hyperreflectivity (retinal atrophy) vs dullness (oedema / infiltrate)', 'Retinal vessel attenuation', 'Chorioretinitis foci']), tone: 'teal' }],
        ],
      },

      ...stepPatterns(4, 'KEY DISCRIMINATORS — PATTERN RECOGNITION', {
        rows: [
          { section: 'Conjunctiva · tear film' },
          { cues: ['Conjunctival redness', 'normal cornea/pupil', '↑ tearing'], dx: 'Conjunctivitis (allergic · bacterial · viral)', tone: 'green' },
          { cues: ['Conjunctival redness', 'mucoid discharge', 'dull cornea', 'low STT'], dx: 'Keratoconjunctivitis sicca (KCS)', tone: 'warning' },
          { section: 'Cornea' },
          { cues: ['Fluorescein +ve corneal defect', 'pain', 'neovascularisation'], dx: 'Ulcerative keratitis', tone: 'danger' },
          { cues: ['Fluorescein +ve', 'stromal melt / mucopurulent'], dx: 'Infected / melting ulcer — emergency', tone: 'danger', emphasis: true },
          { section: 'Intraocular' },
          { cues: ['Episcleral injection', 'miosis', 'aqueous flare', '↓ IOP'], dx: 'Anterior uveitis', tone: 'danger' },
          { cues: ['Episcleral injection', 'mydriasis', 'diffuse oedema', '↑ IOP &gt;25'], dx: 'Acute glaucoma — emergency', tone: 'danger', emphasis: true },
          { section: 'Orbit' },
          { cues: ['Painful exophthalmos', 'pain on opening mouth'], dx: 'Orbital cellulitis / abscess', tone: 'danger' },
          { cues: ['Chronic non-painful exophthalmos'], dx: 'Orbital neoplasia until proven otherwise', tone: 'warning' },
          { section: 'Other patterns' },
          { cues: ['Hyphaema + bilateral', 'retinal detachment'], dx: 'Systemic hypertension', tone: 'danger', emphasis: true },
          { cues: ['Pigmented iris lesion', '↑ IOP', 'raised + transilluminating?'], dx: 'Iris cyst (benign) vs melanoma (solid)', tone: 'warning' },
          { cues: ['Black corneal plaque', 'cat'], dx: 'Corneal sequestrum', tone: 'violet' },
          { cues: ['Conjunctival follicles', 'nasal/oral lesions', 'young cat'], dx: 'FHV-1 / FCV viral conjunctivitis', tone: 'green' },
          { cues: ['GSD', 'bilateral lateral pigmented corneal vascularisation'], dx: 'Pannus (chronic superficial keratitis)', tone: 'info' },
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Red Eye — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — SAFETY CHECK BEFORE ANY TEST', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Situation', { text: 'Action', tone: 'teal' }],
        rows: [
          ['<strong>Suspected globe / scleral rupture or deep ulcer</strong>', { text: 'Minimise handling. <strong>DO NOT</strong> apply pressure, do <strong>NOT</strong> perform Schiotz / applanation tonometry, do not flush. Use rebound tonometry only if essential. Place an Elizabethan collar. <strong>Refer same day</strong> if available', tone: 'danger' }],
          ['<strong>Cover</strong>', { text: 'Broad-spectrum systemic antibiotics (e.g. amoxicillin–clavulanate ± fluoroquinolone for <em>Pseudomonas</em> risk) + systemic NSAID / analgesia', tone: 'danger' }],
          ['<strong>Order of tests is critical</strong>', { text: '<strong>Schirmer Tear Test FIRST</strong> (any drops alter the result) → ocular surface cytology / swab if indicated → fluorescein stain → tonometry → topical anaesthetic → mydriatic for fundoscopy LAST. <strong>Tonometry before mydriatics</strong>', tone: 'danger' }],
        ],
      },

      ...stepTable(2, 'SCHIRMER TEAR TEST (STT-1)', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Timing</strong>', { text: 'Performed <strong>before</strong> any solutions, drops or bright light', tone: 'danger' }],
          ['<strong>Technique</strong>', { text: 'Fold strip in packaging → retract lower lid → place tip at the lateral fornix → close lids for 60 s', tone: 'teal' }],
          ['<strong>🐕 Dog normal</strong>', { text: bullets(['≥15 mm/min', '10–14 = early / borderline KCS', '&lt;10 = clinical KCS', '&lt;5 = severe']), tone: 'teal' }],
          ['<strong>🐱 Cat normal</strong>', { text: 'Wide reference (median ~14 mm/min, 95% PI ~8–22); a substantial proportion of clinically normal cats read &lt;10. Interpret with clinical signs (mucoid discharge · corneal scarring) — single low readings without clinical correlation are non-diagnostic', tone: 'teal' }],
          ['<strong>Pitfalls</strong>', { text: bullets(['Recent topicals', 'Sedation', 'Third eyelid disease', 'Neurogenic KCS (CN VII — often a dry ipsilateral nostril; do contralateral STT for comparison)']), tone: 'teal' }],
        ],
      }, '💧'),

      ...stepTable(3, 'OCULAR SURFACE SAMPLING (if indicated)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Indications</strong>', { text: bullets(['Deep, melting or non-healing ulcers', 'Purulent conjunctivitis', 'Suspected infectious cause', 'Pre-surgical']), tone: 'teal' }],
          ['<strong>Cytology</strong>', { text: bullets(['Cytobrush or spatula after topical anaesthetic; Diff-Quik. Bacteria (<strong>intracellular = significant</strong>)', 'Eosinophils (FHV-1 / eosinophilic keratoconjunctivitis)', 'Neoplastic cells', 'Fungal hyphae']), tone: 'teal' }],
          ['<strong>Culture + sensitivity</strong>', { text: bullets(['Swab <strong>before</strong> topicals', 'Transport in Amies / charcoal. Empirical first-line antibiotics based on cytology while awaiting C&amp;S']), tone: 'teal' }],
          ['<strong>🐱 PCR</strong>', { text: bullets(['Conjunctival / corneal swab for FHV-1', 'FCV', '<em>Chlamydia felis</em>', '<em>Mycoplasma felis</em>. <strong>Interpret with care</strong> — FHV-1 PCR is positive in many normal cats (latent infection)']), tone: 'teal' }],
        ],
      }, '🔬'),

      ...stepTable(4, 'FLUORESCEIN STAIN', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Technique</strong>', { text: bullets(['Wet a single strip with saline', 'Touch bulbar conjunctiva', 'Flush excess', 'View with cobalt blue light']), tone: 'teal' }],
          ['<strong>Superficial uptake only</strong>', { text: 'Simple ulcer', tone: 'teal' }],
          ['<strong>Crater with non-staining base + green halo</strong>', { text: 'Stromal ulcer', tone: 'teal' }],
          ['<strong>Loose-edged epithelium</strong>', { text: 'Indolent / SCCED (Boxer ulcer)', tone: 'teal' }],
          ['<strong>Central dark non-staining defect with surrounding green halo</strong>', { text: '<strong>Descemetocele</strong> — urgent surgery', tone: 'danger' }],
          ['<strong>Pooling green stream = aqueous leak</strong>', { text: '<strong>Seidel-positive globe rupture</strong> — emergency', tone: 'danger' }],
          ['<strong>Jones test</strong>', { text: 'Stain placed in the eye should appear at the nostril within 5 min → tests nasolacrimal patency', tone: 'teal' }],
          ['<strong>Pitfalls</strong>', { text: bullets(['Excess stain pools in pockets and false-positives', 'Mucus retains stain', 'Rose bengal is more sensitive for FHV-1 dendritic ulcers (geographic / dendritic uptake)']), tone: 'teal' }],
        ],
      }, '🟢'),

      { kind: 'step', text: '📟 STEP 5 — TONOMETRY (IOP)', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Methods',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Method', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Rebound (TonoVet)</strong>', { text: 'Preferred — no anaesthetic required, accurate', tone: 'teal' }],
          ['<strong>Applanation (Tono-Pen)</strong>', { text: 'Topical anaesthetic needed', tone: 'teal' }],
          ['<strong>Schiotz</strong>', { text: 'Indentation — weight calibration needed', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Interpretation — normal 10–25 mmHg in both species',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['IOP', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>&gt;25 mmHg + clinical signs</strong>', { text: 'Glaucoma — primary or secondary', tone: 'danger' }],
          ['<strong>&gt;40 mmHg</strong>', { text: bullets(['<strong>Acute glaucoma — emergency</strong>', '<strong>Vision-threatening</strong>']), tone: 'danger' }],
          ['<strong>10–25 mmHg</strong>', { text: 'Normal', tone: 'green' }],
          ['<strong>&lt;10 mmHg</strong>', { text: bullets(['Uveitis (most common)', 'Phthisis bulbi', 'Scleral rupture']), tone: 'warning' }],
          ['<strong>Inter-eye difference &gt;8 mmHg</strong>', { text: 'Clinically significant — investigate the abnormal eye', tone: 'warning' }],
        ],
      },
      { kind: 'note', html: `<strong>Pitfalls:</strong> squeezing eyelids · jugular compression · head position · poor calibration → falsely high readings. Take 3+ readings and use the mean.` },

      ...stepTable(6, 'FOCAL LIGHT + SLIT-LAMP / OPHTHALMOSCOPY', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Technique', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Direct ophthalmoscope / pen torch / Finoff transilluminator</strong>', { text: bullets(['Evaluate cornea', 'AC', 'Iris', 'Pupil', 'Lens', 'Retinal red reflex']), tone: 'teal' }],
          ['<strong>Tyndall effect</strong>', { text: 'Darken the room → narrow slit of light tangentially through the AC → a visible beam = aqueous flare (protein) → <strong>anterior uveitis</strong>', tone: 'teal' }],
          ['<strong>Retroillumination</strong>', { text: bullets(['Light into the eye', 'Tapetal reflection silhouettes opacities. Parallax (move head laterally): opacity moving <em>with</em> you = posterior to lens', '<em>Against</em> you = anterior']), tone: 'teal' }],
          ['<strong>Direct ophthalmoscopy</strong>', { text: bullets(['19.5× upright image, small field — optic disc', 'Retinal vessels', 'Tapetal / non-tapetal junction', 'Periphery. A green filter helps distinguish pigment from haemorrhage']), tone: 'teal' }],
          ['<strong>Indirect ophthalmoscopy</strong>', { text: bullets(['Panoptic or condensing lens + light source — inverted larger field; pupil dilation needed. Preferred for retinal detachment', 'Optic nerve', 'Chorioretinitis']), tone: 'teal' }],
          ['<strong>Slit lamp</strong> (if available)', { text: bullets(['Biomicroscopic depth assessment — KP', 'Flare', 'Fibrin', 'Lens capsule', 'Vitreous strands']), tone: 'teal' }],
          ['<strong>Pupil dilation</strong>', { text: 'Tropicamide 1% topically (15–30 min onset · 2–4 h duration). <strong>Tonometry FIRST.</strong> Avoid in a suspected narrow ICA (Cocker Spaniel) — may precipitate acute glaucoma', tone: 'danger' }],
        ],
      }, '🔦'),

      { kind: 'step', text: '🎯 STEP 7 — TARGETED ADVANCED TESTS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Indication / what it shows', tone: 'teal' }],
        rows: [
          ['<strong>Gonioscopy</strong>', { text: 'Direct visualisation of the iridocorneal angle — indicated in any primary glaucoma diagnosis, and to screen the contralateral eye for a narrow / closed angle', tone: 'teal' }],
          ['<strong>Ocular ultrasound (10–20 MHz)</strong>', { text: bullets(['Indispensable when the fundus cannot be visualised (corneal oedema · hyphaema · mature cataract) — retinal detachment (sea-gull / V-shape attached at the optic disc)', 'Vitreal haemorrhage or inflammatory debris', 'Lens position (luxation · intumescence)', 'Intraocular mass', 'Posterior scleritis']), tone: 'teal' }],
          ['<strong>Aqueocentesis</strong>', { text: '<strong>Referral only</strong> — cytology / PCR when the systemic workup is non-diagnostic', tone: 'teal' }],
          ['<strong>CT / MRI orbit</strong>', { text: bullets(['Mandatory for any retrobulbar disease (cellulitis vs neoplasia · oral exam under GA)', 'Proptosis recovery planning', 'Suspected optic chiasm lesion']), tone: 'teal' }],
          ['<strong>Electroretinography (ERG)</strong>', { text: bullets(['Referral test — SARDS (flat ERG, normal MRI)', 'Differentiates retinal from optic nerve / central blindness']), tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Systemic workup for uveitis or hyphaema (BOTH species)',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          [bullets(['<strong>Haematology</strong>', '<strong>Biochemistry</strong>', '<strong>Urinalysis</strong>']), { text: 'CBC + smear', tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: bullets(['BMBT', 'PT', 'aPTT', 'Platelet count']), tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Doppler or oscillometric — repeat ≥3 times calmly', tone: 'teal' }],
          ['<strong>Thoracic + abdominal imaging</strong>', { text: 'In older patients — rule out neoplasia', tone: 'teal' }],
          ['<strong>Infectious panel</strong>', { text: bullets(['FIV / FeLV PCR or Ag (🐱)', 'Toxoplasma IgG/IgM', 'FCoV titre (FIP)', 'Bartonella', 'Leishmaniasis', 'Ehrlichiosis / anaplasmosis (endemic)', 'Heartworm', 'Cryptococcus LCAT', 'Fungal serology (region-dependent: Histoplasma · Blastomyces · Coccidioides)']), tone: 'teal' }],
          ['<strong>ANA / Coombs</strong>', { text: 'IMHA / immune-mediated rule-out', tone: 'teal' }],
          ['<strong>Cataract evaluation</strong>', { text: 'Lens-induced uveitis', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'pearls',
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
