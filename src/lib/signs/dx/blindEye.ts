// ── Blind Eye / Acute Vision Loss — diagnostic approach (data) ───────────────
// Migration of blindEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../blindEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const blindEyeDx: DxApproach = {
  sign: 'blind-eye',
  title: 'Blind Eye / Vision Loss',
  tabs: {

  history: {
    title: 'History: Blind Eye',
    blocks: [
      { kind: 'goal', text: 'CONFIRM VISION LOSS — REAL OR PERCEIVED?' },
      {
        kind: 'gridTable',
        label: 'Owner-reported clues',
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Clue', { text: 'Significance', tone: 'teal' }],
        rows: [
          ['<strong>Bumping objects</strong>, especially in dim light', { text: 'Rod loss → early PRA', tone: 'teal' }],
          [bullets(['<strong>Hesitancy on stairs</strong>', '<strong>Reluctance to jump</strong>', '<strong>Sudden disorientation</strong>']), { text: 'Functional vision loss', tone: 'teal' }],
          ['<strong>Failure to track moving objects</strong>', { text: 'Functional vision loss', tone: 'teal' }],
          ['<strong>Pupils "always large" or unresponsive to light</strong>', { text: 'Pre-geniculate or autonomic pathway involvement', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Non-ophthalmic mimics of blindness',
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Mimic', { text: 'Detail', tone: 'teal' }],
        rows: [
          [bullets(['<strong>Vestibular ataxia</strong>', '<strong>Cerebellar disease</strong>', '<strong>Severe orthopaedic pain</strong>']), { text: 'Altered navigation without vision loss', tone: 'teal' }],
          [bullets(['<strong>Behavioural change from systemic illness</strong>', '<strong>Dementia (CDS in seniors)</strong>']), { text: 'Reduced engagement, not blindness', tone: 'teal' }],
          ['<strong>Deafness misinterpreted as blindness</strong>', { text: '🐱 white cat + blue eyes', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📋 STEP 1 — ONSET + LATERALITY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Peracute</strong><br>minutes–hours', { text: bullets(['Acute glaucoma', 'CVA', 'Head trauma', 'Hyphaema (hypertension · coagulopathy)', 'Acute retinal detachment', 'Intracranial bleed']), tone: 'teal' }],
          ['<strong>Acute</strong><br>1–7 days', { text: bullets(['SARDS', 'Optic neuritis (MUA · infectious)', 'Severe uveitis', 'Retinal detachment from hypertension', 'Hypertensive encephalopathy', 'Hepatic encephalopathy', 'Ivermectin / salt / lead toxicity']), tone: 'teal' }],
          ['<strong>Subacute</strong><br>weeks', { text: bullets(['Progressing optic nerve neoplasia', 'Chronic uveitis with retinal complication', 'CNS neoplasia', 'Enrofloxacin retinal toxicity (🐱 — typically within 1–7 days but progressive over weeks if continued)']), tone: 'teal' }],
          ['<strong>Chronic / slowly progressive</strong>', { text: bullets(['PRA (rods first → night blindness → day blindness over months–years)', 'Mature cataract', 'Chronic glaucoma', 'Gradual retinal dystrophy', 'Collie eye anomaly (congenital, slow)']), tone: 'teal' }],
          ['<strong>Unilateral</strong>', { text: bullets(['Local cause — trauma', 'FB', 'Optic nerve neoplasia', 'Single-eye glaucoma. A single-side cortical lesion is rare and presents with a contralateral menace deficit']), tone: 'teal' }],
          ['<strong>Bilateral</strong>', { text: bullets(['Systemic or central — SARDS', 'Optic neuritis (MUA)', 'Hypertension', 'Hepatic encephalopathy', 'Toxins', 'PRA', 'Cortical disease']), tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '💊 STEP 2 — DRUG + TOXIN HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Agent', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Enrofloxacin retinal toxicity</strong>', { text: bullets(['Classically at &gt;5 mg/kg/day but reported even at the recommended 5 mg/kg q24h. Acute bilateral blindness', 'Mydriasis', 'Neurological signs (seizures · mentation change). Marbofloxacin and pradofloxacin have a wider margin but are <strong>not</strong> 100% safe — <strong>STOP the fluoroquinolone immediately</strong> and switch antibiotic']), tone: 'danger' }],
          ['<strong>Ivermectin / milbemycin overdose</strong>', { text: bullets(['ABCB1 (MDR1) mutant breeds — Collie', 'Australian Shepherd', 'Long-haired Whippet', 'GSD', 'Old English Sheepdog → ataxia', 'Mydriasis', 'Blindness', 'Seizures', 'Coma at therapeutic doses of some products']), tone: 'danger' }],
          [bullets(['Sodium-rich playdough', 'Ice melt', 'Seawater'], { lead: '<strong>Salt</strong>' }), { text: 'Bilateral cortical blindness + seizures + ataxia', tone: 'teal' }],
          ['<strong>Lead</strong>', { text: 'Cortical blindness + seizures + GI signs + basophilic stippling', tone: 'teal' }],
          [bullets(['<strong>Hyperosmolar contrast media</strong>', '<strong>Metronidazole</strong>', '<strong>Cyclosporine</strong>']), { text: 'Rare reports of optic / cortical signs', tone: 'teal' }],
          ['<strong>Atropine / opioids</strong>', { text: 'Drug-induced mydriasis can be mistaken for vision loss — reassess after wash-out', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🩺 STEP 3 — SYSTEMIC / GENERAL HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Picture', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>🐕 SARDS phenotype</strong> — sudden bilateral blindness + recent PU/PD + polyphagia + weight gain (Cushingoid look)', { text: 'ACTH stim / LDDST', tone: 'teal' }],
          ['<strong>🐱 Acute blindness + bilateral mydriasis + hyphaema / bullous RD</strong>', { text: bullets(['<strong>Systemic hypertension</strong> until proven otherwise — measure BP, then look for CKD', 'Hyperthyroidism', 'HAC']), tone: 'danger' }],
          ['<strong>Diabetic dog with rapid cataract progression</strong>', { text: 'Lens-induced uveitis → posterior synechiae → mature cataract → vision loss', tone: 'teal' }],
          ['<strong>Multi-cat household / unvaccinated / outdoor</strong>', { text: bullets(['FIV / FeLV uveitis', 'FIP', 'Toxoplasmosis', 'Cryptococcosis']), tone: 'teal' }],
          ['<strong>Travel history</strong>', { text: bullets(['Leishmania (Mediterranean)', 'Ehrlichia / RMSF / Anaplasma (endemic regions)', 'Heartworm', 'Fungal (Histo · Blasto · Cocci)']), tone: 'teal' }],
          ['<strong>Concurrent neurological signs</strong>', { text: bullets(['Seizures', 'Behavioural change', 'Circling', 'Head pressing', 'Propulsive walking', 'Ataxia → cortical / forebrain or systemic encephalopathy']), tone: 'teal' }],
          ['<strong>Hepatic disease</strong>', { text: bullets(['Jaundice', 'PU/PD', 'Intermittent post-prandial stupor → hepatic encephalopathy can present as cortical blindness']), tone: 'teal' }],
          ['<strong>🐱 Long-term taurine-deficient (vegetarian / homemade) diet</strong>', { text: 'Central retinal degeneration (TCRD) — bilateral retinal atrophy with a central hyperreflective ellipse before peripheral involvement', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🐾 STEP 4 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Miniature Schnauzer', 'Brittany', 'Dachshund', 'Maltese'], tone: 'danger', html: 'SARDS â sudden bilateral blindness + Cushingoid phenotype.' },
          { breeds: ['Collie', 'Sheltie'], tone: 'warning', html: 'Collie eye anomaly â choroidal hypoplasia + ONH coloboma + retinal detachment; genetic test available.' },
          { breeds: ['Labrador', 'Poodle', 'Cocker', 'Irish Setter', 'Tibetan Terrier', 'Miniature Schnauzer'], tone: 'green', html: 'PRA â over 20 breeds affected; genetic tests for prcd, rcd1 and others.' },
          { breeds: ['Cavalier King Charles Spaniel', 'English Springer Spaniel'], tone: 'violet', html: 'retinal dysplasia (congenital, bilateral).' },
          { breeds: ['Collie', 'Australian Shepherd', 'Long-haired Whippet', 'Shetland'], tone: 'danger', html: 'ABCB1 / MDR1 â ivermectin / milbemycin neurotoxicity → blindness + ataxia + coma.' },
          { breeds: ['Cocker', 'Basset', 'Springer', 'Chow', 'Akita'], tone: 'info', html: 'primary glaucoma → corneal oedema → vision loss.' },
          { breeds: ['Older small breed, rapidly progressive cataract'], group: 'signalment', tone: 'warning', html: 'diabetic cataract.' },
        ],
        cat: [
          { breeds: ['Older cat, acute bilateral blindness'], group: 'signalment', tone: 'violet', html: 'systemic hypertension (CKD, hyperthyroidism, HAC) — measure BP first.' },
          { breeds: ['On enrofloxacin'], group: 'signalment', tone: 'warning', html: 'retinal toxicity — stop the drug immediately.' },
          { breeds: ['FIV / FeLV positive'], group: 'signalment', tone: 'green', html: 'chronic uveitis · intraocular lymphoma · optic neuritis.' },
          { breeds: ['Outdoor / hunting cat'], group: 'signalment', tone: 'danger', html: 'toxoplasma chorioretinitis · trauma · fungal (Cryptococcus).' },
          { breeds: ['Vegetarian / homemade diet'], group: 'signalment', tone: 'info', html: 'taurine-deficient retinal degeneration (central retinal atrophy).' },
          { breeds: ['Multi-cat / FCoV exposure'], group: 'signalment', tone: 'warning', html: 'FIP — pyogranulomatous uveitis + chorioretinitis.' },
          { breeds: ['Kitten / young cat with adhesions'], group: 'signalment', tone: 'danger', html: 'FHV-1 symblepharon → corneal opacity → vision blocked.' },
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        items: [
          `Acute bilateral blindness + altered mentation = central emergency (MRI / CSF)`,
          `Cat on enrofloxacin = STOP DRUG`,
          `Older cat with bilateral mydriasis + blindness = check BP urgently`,
          `Bilateral acute blindness + dilated pupils + normal fundus = SARDS vs optic neuritis (chromatic PLR + MRI)`,
          `Head trauma + anisocoria + obtundation = rising ICP (mannitol + decompression)`,
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Blind Eye',
    blocks: [
      ...stepTable(1, 'QUANTIFY VISION + LATERALITY', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Menace response</strong>', { text: bullets(['CN II → cortex → CN VII', 'Present from 10–12 wks of age. Cover one eye at a time. Avoid air currents']), tone: 'teal' }],
          ['<strong>Visual placing reaction</strong>', { text: 'Lift the animal to a table edge — a sighted animal extends its limbs before touching the surface', tone: 'teal' }],
          ['<strong>Tracking</strong>', { text: 'Cotton ball or laser pointer — tests acuity and pursuit', tone: 'teal' }],
          ['<strong>Maze test</strong>', { text: 'Light + dark room (rod vs cone function) — PRA loses rods first, so dark-room mazes flag it early', tone: 'teal' }],
          ['<strong>Obstacle course</strong>', { text: 'Novel objects in the clinic — quantifies real-world functional vision', tone: 'teal' }],
          ['<strong>Owner-reported behaviours</strong>', { text: bullets(['Bumping', 'Hesitancy', 'Stair refusal — capture before the exam']), tone: 'teal' }],
        ],
      }, '🩺'),
      { kind: 'note', html: `Use multiple methods — no single test is perfect (sedation · fear · brachycephalic conformation · dementia all confound). Compare each eye separately by occluding the contralateral side.` },

      { kind: 'step', text: '🔦 STEP 2 — APPLY THE LOCALISATION TABLE', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '1.4fr 0.7fr 0.7fr 0.9fr 1.3fr',
        dividers: true,
        scroll: true,
        minWidth: 520,
        headers: ['Localisation', 'Menace', 'Dazzle', 'PLR', { text: 'Fundus', tone: 'teal' }],
        rows: [
          ['Anterior segment opacity', 'Absent', 'Variable', 'Variable', { text: 'Often obscured', tone: 'teal' }],
          ['Retina (PRA · RD · hypertensive)', 'Absent', 'Absent', 'Absent / sluggish', { text: 'Abnormal', tone: 'teal' }],
          [{ text: 'SARDS', tone: 'warning' }, 'Absent', 'Absent', bullets(['Red ⊘', 'Blue ✓']), { text: 'NORMAL', tone: 'green' }],
          ['Optic neuritis', 'Absent', 'Absent', bullets(['Red ⊘', 'Blue ⊘']), { text: 'Swollen / haemorrhagic disc', tone: 'teal' }],
          ['Optic nerve hypoplasia', 'Absent', 'Absent', 'Absent (1 or both)', { text: 'Small / pale disc', tone: 'teal' }],
          ['Chiasmal / optic tract', 'Variable', 'Variable', 'Pattern (see Abnormal Pupil)', { text: 'Normal', tone: 'teal' }],
          [{ text: 'Cortex / forebrain', tone: 'violet' }, 'Absent', { text: 'PRESENT', tone: 'green' }, { text: 'PRESENT', tone: 'green' }, { text: 'Normal', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `💡 Cortical blindness is the one pattern where <strong>both subcortical reflexes (dazzle + PLR) are preserved</strong>. SARDS uniquely preserves only the <strong>blue chromatic PLR</strong> (melanopsin RGCs spared); optic neuritis abolishes both red and blue.` },

      { kind: 'step', text: '👁️ STEP 3 — STRUCTURED OCULAR EXAM (outside → in)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Structure', { text: 'Looking for', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Globe position + size</strong>`, { text: bullets(['Buphthalmos (chronic glaucoma — blind, painful)', 'Microphthalmos (congenital)', 'Exophthalmos (orbital)', 'Enophthalmos (Horner / pain / dehydration)']), tone: 'teal' }],
          [`${numBadge(2)}<strong>Adnexa</strong>`, { text: bullets(['Blepharospasm', 'Discharge', 'Eyelid mass', 'Symblepharon (kitten with FHV-1 — adhesions between conjunctiva and cornea, blocks vision)']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Cornea</strong>`, { text: bullets(['Diffuse oedema (acute glaucoma · endothelial decompensation)', 'Deep scarring', 'Pigmentary keratitis (end-stage pannus)', 'Descemetocele', 'Perforation. Cornea opaque enough to obscure the fundus = anterior pathway blockage']), tone: 'teal' }],
          [`${numBadge(4)}<strong>Anterior chamber</strong>`, { text: bullets(['Hyphaema', 'Hypopyon', 'Fibrin', 'Lens position (anterior lens luxation)', 'Aqueous flare (uveitis)']), tone: 'teal' }],
          [`${numBadge(5)}<strong>Iris + pupil</strong>`, { text: bullets(['Mid-fixed mydriasis (glaucoma)', 'Miosis + flare (uveitis)', 'Posterior synechiae (chronic uveitis sequela)', 'Iris rubeosis (chronic intraocular disease)']), tone: 'teal' }],
          [`${numBadge(6)}<strong>Lens</strong>`, { text: bullets(['Mature cataract (no fundus reflex)', 'Nuclear sclerosis (still allows reflex — does <strong>not</strong> cause blindness on its own)', 'Lens luxation']), tone: 'teal' }],
          [`${numBadge(7)}<strong>Vitreous</strong>`, { text: bullets(['Haemorrhage', 'Asteroid hyalosis', 'Debris (uveitis)', 'Retinal detachment leaflets']), tone: 'teal' }],
          [`${numBadge(8)}<strong>Fundus</strong>`, { text: 'By lesion pattern — see Step 4', tone: 'teal' }],
        ],
      },

      ...stepTable(4, 'FUNDIC PATTERN RECOGNITION', {
        cols: '1fr 1.4fr',
        dividers: true,
        headers: ['Fundus appearance', { text: 'Localisation', tone: 'teal' }],
        rows: [
          ['Tapetal <strong>HYPER</strong>reflectivity + retinal vessel attenuation', { text: bullets(['PRA', 'End-stage retinal degeneration', 'TCRD (🐱 — central ellipse)']), tone: 'warning' }],
          [bullets(['Tapetal <strong>HYPO</strong>reflectivity + retinal vessels lifted close to lens', '"Veil" floating in vitreous']), { text: 'Retinal detachment — bullous (hypertension) or rhegmatogenous (post-surgical, trauma)', tone: 'danger' }],
          ['Normal fundus + blind + dilated pupils', { text: bullets(['SARDS', 'Cortical blindness', 'Optic chiasm (early)']), tone: 'warning' }],
          [bullets(['Pink / haemorrhagic swollen optic disc', 'Peripapillary oedema']), { text: 'Optic neuritis (MUA · infectious)', tone: 'danger' }],
          ['Small / pale optic disc', { text: 'Optic nerve hypoplasia (congenital)', tone: 'info' }],
          ['Multifocal grey-white retinal lesions ± haemorrhage', { text: bullets(['Chorioretinitis — toxoplasma', 'FIP', 'Fungal', 'Tick-borne']), tone: 'danger' }],
          ['Tortuous retinal vessels + retinal haemorrhage + bullous RD', { text: 'Systemic hypertension (🐱 with CKD / hyperthyroidism)', tone: 'danger' }],
          ['Choroidal hypoplasia + ONH coloboma ± RD / haemorrhage', { text: 'Collie eye anomaly', tone: 'violet' }],
          ['Retinal folds / geographic dysplasia / RD (young dog, CKCS · Springer)', { text: 'Retinal dysplasia', tone: 'green' }],
          ['Acute bilateral retinopathy in a cat on a fluoroquinolone', { text: 'Enrofloxacin retinal toxicity — <strong>STOP DRUG</strong>', tone: 'danger' }],
        ],
      }, '🔬'),
      { kind: 'note', html: `<strong>Dilate with tropicamide 1% q15 min × 2 doses</strong> — after IOP, and never if a narrow ICA is suspected.` },

      ...stepTable(5, 'NEUROLOGICAL EXAM (forebrain vs structural)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Mentation</strong>', { text: bullets(['Obtunded / stuporous / hyperactive — HE', 'Hypertensive encephalopathy', 'Toxic']), tone: 'teal' }],
          ['<strong>Behaviour</strong>', { text: bullets(['Head pressing', 'Propulsive walking', 'Compulsive circling (forebrain — usually toward the lesion side)']), tone: 'teal' }],
          [bullets(['Proprioception', 'Hopping'], { lead: '<strong>Postural reactions</strong>' }), { text: 'Abnormal in contralateral limbs with a cortical / thalamic lesion', tone: 'teal' }],
          ['<strong>Cranial nerves</strong>', { text: bullets(['Full battery — concurrent CN VII / VIII / V deficits localise to the brainstem', 'Concurrent CN III + anisocoria localises to the midbrain']), tone: 'teal' }],
          ['<strong>Postural / gait</strong>', { text: 'UMN signs in opposite-side limbs from a cortical lesion', tone: 'teal' }],
          ['<strong>Seizure history + focal twitching</strong>', { text: bullets(['Forebrain — HE', 'Neoplasia', 'MUA', 'Toxin']), tone: 'teal' }],
          ['<strong>Autonomic signs</strong>', { text: bullets(['Megaoesophagus', 'Urinary retention', 'Dry mucosae', 'Bilateral mydriasis → <strong>dysautonomia</strong>']), tone: 'teal' }],
        ],
      }, '🧠'),
      { kind: 'note', html: `Always perform a neuro exam in any animal with bilateral vision loss and apparent forebrain signs. Document objective findings — these direct the imaging plan (MRI brain ± CSF).` },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Blind Eye — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES IN MINUTES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Tonometry on every blind eye</strong>`, { text: 'Acute glaucoma can present with diffuse corneal oedema masking the fundus — <strong>IOP &gt;25 mmHg = sight-threatening</strong>', tone: 'danger' }],
          [`${numBadge(2)}<strong>Blood pressure</strong>`, { text: 'Doppler / oscillometric × 3 calm readings on every older cat or dog with acute bilateral blindness — hypertensive retinopathy is <strong>reversible if treated within 24 h</strong>', tone: 'danger' }],
          [`${numBadge(3)}<strong>Mentation + neuro exam</strong>`, { text: 'Anisocoria + altered mentation + blindness = central emergency — MRI + CSF as soon as stable', tone: 'danger' }],
          [`${numBadge(4)}<strong>Drug review</strong>`, { text: bullets(['<strong>STOP enrofloxacin</strong> in any cat with acute blindness on a fluoroquinolone', 'Reverse ivermectin / atropine / opioid exposure where possible']), tone: 'danger' }],
          [`${numBadge(5)}<strong>Trauma / head injury</strong>`, { text: bullets(['Anisocoria + obtundation → mannitol 0.5–1 g/kg IV slow', 'Emergent imaging', 'Neurosurgery referral']), tone: 'danger' }],
          [`${numBadge(6)}<strong>Glucose stick</strong>`, { text: 'Severe hypoglycaemia in a small / young dog can mimic cortical blindness', tone: 'danger' }],
        ],
      },

      ...stepTable(2, 'STANDARD OPHTHALMIC TESTS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Schirmer Tear Test</strong> (before any drops)', { text: 'Low STT + bilateral mydriasis + dry mucous membranes + autonomic signs = <strong>dysautonomia</strong> → bilateral cortical-like blindness in advanced cases', tone: 'teal' }],
          ['<strong>Fluorescein stain</strong>', { text: 'Rule out ulcer / perforation before steroids — severe melting ulcers can cause perforation and blindness in days', tone: 'teal' }],
          ['<strong>Tonometry</strong>', { text: 'See the emergency step — the glaucoma vs uveitis distinction is critical', tone: 'teal' }],
          ['<strong>Slit-lamp / focal light</strong>', { text: bullets(['Aqueous flare', 'KP', 'Synechiae', 'Lens position', 'Iris detail']), tone: 'teal' }],
          ['<strong>Mydriatic challenge (tropicamide 1%)</strong>', { text: bullets(['Complete failure to dilate suggests posterior synechiae', 'Iris atrophy', 'Pharmacological mydriasis already present']), tone: 'teal' }],
          ['<strong>Direct + indirect ophthalmoscopy</strong>', { text: bullets(['Indirect first for retinal overview, direct for optic disc detail. Green filter distinguishes pigment from haemorrhage', 'Blue filter for fluorescein']), tone: 'teal' }],
        ],
      }, '👁️'),

      { kind: 'step', text: '🔴 STEP 3 — CHROMATIC PLR + ERG (normal fundus, dilated pupils, absent dazzle)', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Chromatic PLR — handheld device with separate red and blue LEDs (Melan-100, BIOPAC chromatic)',
        cols: '1fr 1fr 1fr',
        dividers: true,
        headers: ['Condition', 'Red PLR', { text: 'Blue PLR', tone: 'teal' }],
        rows: [
          ['Normal', { text: 'Present', tone: 'green' }, { text: 'Present', tone: 'green' }],
          ['SARDS', { text: 'Absent', tone: 'danger' }, { text: 'Present (melanopsin RGCs spared)', tone: 'green' }],
          ['Optic neuritis', { text: 'Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }],
          ['End-stage PRA / retinal degeneration', { text: 'Absent', tone: 'danger' }, { text: 'Reduced / absent', tone: 'warning' }],
          ['Cortical blindness', { text: 'Present', tone: 'green' }, { text: 'Present', tone: 'green' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Electroretinography (ERG) — gold-standard differentiator, performed under sedation',
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Result', { text: 'Diagnosis', tone: 'teal' }],
        rows: [
          ['<strong>Flat ERG</strong> + acute blindness + normal fundus + Cushingoid phenotype', { text: '<strong>SARDS</strong> — no treatment', tone: 'teal' }],
          ['<strong>Preserved ERG</strong> + normal fundus + absent menace + preserved dazzle / PLR', { text: '<strong>Cortical blindness</strong> — MRI brain', tone: 'teal' }],
          ['<strong>Preserved ERG</strong> + abnormal optic disc + absent PLR', { text: '<strong>Optic neuritis</strong> or optic nerve disease — MRI + CSF', tone: 'teal' }],
          ['<strong>Severely reduced ERG</strong> + tapetal hyperreflectivity', { text: '<strong>PRA / retinal degeneration</strong>', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `Refer for ERG if non-fundoscopic causes need to be distinguished.` },

      { kind: 'step', text: '🧪 STEP 4 — SYSTEMIC + INFECTIOUS WORKUP', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Scenario', { text: 'Tests', tone: 'teal' }],
        rows: [
          ['<strong>Always</strong>', { text: bullets(['CBC', 'Biochemistry', 'Urinalysis', 'BP (≥3 calm readings)', 'Faecal if indicated']), tone: 'teal' }],
          ['<strong>Hypertension confirmed (SBP &gt;160)</strong>', { text: bullets(['Renal panel + USG + UPC', 'T4 (🐱 &gt;7 yr)', 'ACTH stim / LDDST (HAC in 🐕)', 'Serum aldosterone (Conn syndrome — cat with hypokalaemia)', 'Urine catecholamines (phaeochromocytoma, rare)']), tone: 'teal' }],
          ['<strong>SARDS suspected</strong>', { text: bullets(['Full endocrine panel — ACTH stim and/or LDDST (40–60% have concurrent HAC-like biochemistry, "Cushingoid SARDS")', 'Urine cortisol:creatinine']), tone: 'teal' }],
          ['<strong>🐱 Uveitis / chorioretinitis</strong>', { text: bullets(['FeLV / FIV (PCR or Ag)', '<em>Toxoplasma gondii</em> IgG/IgM', 'FCoV titre (FIP)', 'Bartonella', 'Cryptococcus LCAT', 'Fungal serology if endemic']), tone: 'teal' }],
          ['<strong>🐕 Uveitis / chorioretinitis</strong>', { text: bullets(['Toxoplasma', 'Ehrlichia / Anaplasma / RMSF / Lyme (tick-borne panel)', 'Leishmania (Mediterranean / imported)', 'Blastomyces / Histoplasma / Coccidioides / Cryptococcus (regional fungal panel)', 'Borrelia', '<em>Brucella canis</em>']), tone: 'teal' }],
          ['<strong>Both species</strong>', { text: bullets(['Thoracic + abdominal imaging in older patients — lymphoma', 'Metastatic uveitis']), tone: 'teal' }],
          ['<strong>Hepatic encephalopathy</strong>', { text: bullets(['Bile acids (pre + post-prandial)', 'Ammonia', 'Abdominal ultrasound (PSS · microvascular dysplasia · hepatic mass)']), tone: 'teal' }],
          ['<strong>Toxicology</strong>', { text: bullets(['Blood lead', 'Drug levels where applicable', 'Owner-supplied product and dose']), tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: bullets(['PT / aPTT', 'Platelet count', 'BMBT if hyphaema or vitreal haemorrhage']), tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🧲 STEP 5 — ADVANCED IMAGING', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Modality', { text: 'What it shows / indication', tone: 'teal' }],
        rows: [
          ['<strong>Ocular ultrasound (10–20 MHz)</strong>', { text: bullets(['Indispensable when the fundus is not visible (corneal oedema · mature cataract · hyphaema) — retinal detachment (sea-gull / "V" attached at the optic nerve)', 'Vitreal haemorrhage or inflammatory debris', 'Intraocular mass (ciliary body · choroidal · lymphoma)', 'Lens position and capsule integrity', 'Optic nerve thickening (optic neuritis)']), tone: 'teal' }],
          ['<strong>MRI brain + CSF analysis</strong>', { text: bullets(['Optic neuritis (differentiate MUA from infectious / neoplastic — affects treatment)', 'Suspected forebrain or cortical disease (MUA · neoplasia · CVA · hydrocephalus)', 'Chiasmal lesion (pituitary macroadenoma)', 'CN III + altered mentation + blindness = brainstem / midbrain emergency']), tone: 'teal' }],
          ['<strong>CT</strong>', { text: bullets(['Orbital / retrobulbar mass with secondary blindness', 'Skull trauma', 'Dental disease causing optic neuropathy']), tone: 'teal' }],
          ['<strong>Visual evoked potentials</strong>', { text: 'Referral test — central vs post-retinal pathway differentiation when MRI is normal', tone: 'teal' }],
          ['<strong>Chiasmal lesion — species note</strong>', { text: 'Dogs cross ~75% and cats ~65% of optic fibres at the chiasm, so chiasmal compression (e.g. pituitary macroadenoma) typically produces near-complete bilateral blindness rather than the discrete bitemporal hemianopia seen in humans (~50% crossover). Endocrine signs (HAC · diabetes insipidus) often accompany', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'pearls',
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
