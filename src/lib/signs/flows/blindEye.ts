// ── Blind Eye / Acute Vision Loss flowchart (data) ──────────────────────────
// Migration of blindEyeFlowHtml + blindEyeAcuteHtml + blindEyeChronicHtml
// (src/lib/signs/blindEye.ts) to the FlowPage model.

import type { FlowPage } from '../flowTypes'

const blindEyeEntry: FlowPage = {
  id: 'blind-eye',
  title: 'Blind Eye / Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: '⚫ BLINDNESS / VISION LOSS' },
    { kind: 'node', variant: 'step', text: 'CHARACTERISE THE ONSET' },

    {
      kind: 'choices',
      cols: 2,
      size: 11,
      items: [
        { tone: 'danger', label: '⚡ ACUTE', sublabel: 'Onset mins → days<br>Emergency until proven otherwise', link: { to: 'flow', id: 'blind-eye-acute' } },
        { tone: 'info', label: '🕐 CHRONIC', sublabel: 'Onset weeks → months<br>Progressive vision decline', link: { to: 'flow', id: 'blind-eye-chronic' } },
      ],
    },

    {
      kind: 'table',
      boxTone: 'purple',
      gap: 14,
      title: '🔍 THE LOCALISATION TABLE — Menace · Dazzle · PLR',
      cols: '1.3fr 0.7fr 0.7fr 0.7fr 1.4fr',
      headers: ['Lesion site', 'Menace', 'Dazzle', 'PLR', 'Fundus'],
      rows: [
        ['Anterior opacity', 'Absent', 'Variable', 'Variable', 'Often not visible'],
        ['Retinal disease (RD, PRA)', 'Absent', 'Absent', 'Absent / sluggish', 'Abnormal'],
        [{ text: 'SARDS', tone: 'warning' }, 'Absent', 'Absent', 'Red absent · Blue present', { text: 'NORMAL (key clue)', tone: 'green' }],
        ['Optic nerve (neuritis)', 'Absent', 'Absent', 'Absent (red AND blue)', 'Swollen disc · haemorrhage'],
        ['Chiasm / tract', 'Absent (variable)', 'Absent / variable', 'Variable per pattern', 'Normal'],
        [{ text: 'Cortex / forebrain', tone: 'purple' }, 'Absent', { text: 'PRESENT', tone: 'green' }, { text: 'PRESENT', tone: 'green' }, 'Normal'],
      ],
      footnote: '💡 The single most discriminating finding: <strong>preserved dazzle + preserved PLR with absent menace = cortical blindness</strong>. Everything else lies upstream of the lateral geniculate nucleus.',
    },
  ],
}

const blindEyeAcute: FlowPage = {
  id: 'blind-eye-acute',
  title: 'Acute Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚡ ACUTE VISION LOSS', sub: 'Onset minutes → days · Treat as emergency until proven otherwise' },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE LESION ALONG THE VISUAL PATHWAY',
      sub: 'Cornea → aqueous → lens → vitreous → retina → optic n. → chiasm → optic tract → LGN → cortex',
    },

    {
      kind: 'choices',
      cols: 5,
      size: 10,
      items: [
        { variant: 'insp', label: '👁️ Anterior<br>opacity', sublabel: 'light cannot reach retina', link: { to: 'lesion', loc: 'LOC-BL-OPAQUE', name: 'Anterior segment opacity' } },
        { variant: 'exp', label: '🌑 Retina', sublabel: 'SARDS · RD · PRA · HT', link: { to: 'lesion', loc: 'LOC-BL-RETINA', name: 'Retinal disease' } },
        { variant: 'rest', label: '🧬 Optic<br>nerve', sublabel: 'neuritis · hypoplasia · neoplasia', link: { to: 'lesion', loc: 'LOC-BL-OPTIC', name: 'Optic nerve' } },
        { variant: 'mixed', label: '✨ Chiasm /<br>tract', sublabel: 'pituitary mass · rare', link: { to: 'lesion', loc: 'LOC-BL-CHIASM', name: 'Chiasm / optic tract' } },
        { variant: 'insp', tone: 'purple', label: '🧠 Cortex /<br>forebrain', sublabel: 'HE · HT · MUA · CVA · neoplasia', link: { to: 'lesion', loc: 'LOC-BL-CORTEX', name: 'Cortical / forebrain' } },
      ],
      connectAfter: false,
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ DO NOT MISS',
      items: [
        '<strong>Hypertensive retinopathy</strong> — older cat / dog with acute bilateral blindness, bullous retinal detachment, hyphaema, tortuous retinal vessels → measure BP first',
        '<strong>Optic neuritis (MUA)</strong> — acute bilateral blindness + dilated unresponsive pupils + swollen optic disc → urgent MRI/CSF + immunosuppression',
        '<strong>Acute glaucoma</strong> — corneal oedema + mid-fixed mydriasis + ↑ IOP → tonometry on every blind eye',
        '<strong>Head trauma + anisocoria + blindness</strong> — rising ICP / herniation → mannitol + emergent imaging',
        '<strong>Enrofloxacin in cats</strong> — drug-induced retinal toxicity (avoid &gt;5 mg/kg/day; even therapeutic doses reported)',
        '<strong>Salt / ivermectin / lead toxicity</strong> — bilateral cortical blindness with seizures and altered mentation',
      ],
    },

    {
      kind: 'cardSection',
      tone: 'danger',
      gap: 0,
      title: '👁️ ANTERIOR OPACITY — IOP + slit lamp · light cannot reach retina',
      cards: [
        { title: 'Acute Glaucoma', tag: 'Dog + Cat ›', desc: 'Fixed mid-dilated pupil · corneal oedema · IOP &gt;25 mmHg · pain · episcleral injection', link: { to: 'disease', id: 'DIS-OPH-GLAUCOMA' } },
        { title: 'Anterior Lens Luxation', tag: 'Dog ›', desc: 'Aphakic crescent · lens in AC · secondary glaucoma · Jack Russell / Tibetan Terrier / Border Collie', link: { to: 'disease', id: 'DIS-EYE-LENS-LUX' } },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'warning',
      gap: 8,
      title: '🌑 RETINA — Absent dazzle + PLR · abnormal or normal fundus',
      cards: [
        { title: 'SARDS — Sudden Acquired Retinal Degeneration Syndrome', tag: 'Dog ›', desc: 'Peracute bilateral blindness · dilated unresponsive pupils · <strong>normal fundus</strong> (key clue) · PU/PD + weight gain (Cushingoid phenotype) · Red PLR absent · Blue PLR <em>present</em> (melanopsin RGCs spared) · Flat ERG confirms · Mini Schnauzer / Brittany / Dachshund predisposed', link: { to: 'disease', id: 'DIS-EYE-SARDS' } },
        { title: 'Hypertensive Retinal Detachment', tag: 'Cat &gt;&gt; Dog ›', desc: 'Bilateral · bullous retinal detachment · tortuous vessels · hyphaema · SBP &gt;180 mmHg · <strong>Measure BP FIRST</strong> · older cat → CKD / hyperthyroid / HAC · Retina may reattach if BP controlled within 24–48 h', link: { to: 'disease', id: 'DIS-EYE-RD' } },
        { title: 'Exudative Retinal Detachment from Uveitis', tag: 'Dog + Cat ›', desc: 'Aqueous flare + ↓ IOP → uveitis driving RD · Infectious (toxo, FIP, tick-borne, fungal) or immune-mediated', link: { to: 'disease', id: 'DIS-EYE-UVEITIS-ANT' } },
        { title: 'Enrofloxacin Retinal Toxicity', tag: 'Cat — STOP DRUG', desc: 'Fluoroquinolone use (esp. &gt;5 mg/kg/day) · acute bilateral blindness · mydriasis · retinal degeneration on fundoscopy · <strong>stop drug immediately</strong> · switch antibiotic · some recovery if caught early' },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'purple',
      gap: 8,
      title: '🧬 OPTIC NERVE — Absent PLR (red + blue) · swollen / haemorrhagic disc',
      cards: [
        { title: 'Optic Neuritis — MUA / Infectious / Idiopathic', tag: 'Dog (&gt; Cat) ›', desc: 'Acute bilateral blindness · dilated unresponsive pupils · swollen / haemorrhagic optic disc · both Red AND Blue PLR absent (distinguishes from SARDS) · MRI + CSF mandatory · aggressive immunosuppression (prednisolone 2 mg/kg + cytarabine)', link: { to: 'disease', id: 'DIS-EYE-OPTNEUR' } },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'indigo',
      gap: 8,
      title: '🧠 CORTEX / FOREBRAIN — Dazzle + PLR intact · absent menace · normal fundus',
      cards: [
        { title: 'Hypertensive Encephalopathy', desc: 'Bilateral cortical blindness · ± seizures, mentation change · SBP usually &gt;200 mmHg · Check BP + renal / thyroid / adrenal panel' },
        { title: 'Hepatic Encephalopathy', desc: 'Post-prandial stupor · intermittent cortical blindness · bile acids elevated · PSS / hepatic mass on ultrasound · treat with lactulose + low-protein diet' },
        { title: 'Toxin-induced Cortical Blindness', desc: 'Salt / playdough · ivermectin / milbemycin (ABCB1 breeds) · lead · bilateral blindness ± seizures ± ataxia · activated charcoal if recent · intralipid for ivermectin/permethrin' },
        { title: 'Head Trauma / Rising ICP', desc: 'Anisocoria + obtundation + blindness · ipsilateral mydriasis = CN III herniation · mannitol 0.5–1 g/kg IV slow · emergent MRI / neurosurgery' },
        { title: 'CVA / Cerebrovascular Accident', desc: 'Peracute cortical blindness ± lateralising neuro signs · MRI (DWI) · treat underlying disease (HT, coagulopathy, neoplasia) · often incomplete recovery' },
      ],
    },

    {
      kind: 'table',
      boxTone: 'purple',
      gap: 14,
      title: '🔍 THE LOCALISATION TABLE — Menace · Dazzle · PLR',
      cols: '1.3fr 0.7fr 0.7fr 0.7fr 1.4fr',
      headers: ['Lesion site', 'Menace', 'Dazzle', 'PLR', 'Fundus'],
      rows: [
        ['Anterior opacity', 'Absent', 'Variable', 'Variable', 'Often not visible'],
        ['Retinal disease (RD, PRA)', 'Absent', 'Absent', 'Absent / sluggish', 'Abnormal'],
        [{ text: 'SARDS', tone: 'warning' }, 'Absent', 'Absent', 'Red absent · Blue present', { text: 'NORMAL (key clue)', tone: 'green' }],
        ['Optic nerve (neuritis)', 'Absent', 'Absent', 'Absent (red AND blue)', 'Swollen disc · haemorrhage'],
        ['Chiasm / tract', 'Absent (variable)', 'Absent / variable', 'Variable per pattern', 'Normal'],
        [{ text: 'Cortex / forebrain', tone: 'purple' }, 'Absent', { text: 'PRESENT', tone: 'green' }, { text: 'PRESENT', tone: 'green' }, 'Normal'],
      ],
      footnote: '💡 The single most discriminating finding: <strong>preserved dazzle + preserved PLR with absent menace = cortical blindness</strong>. Everything else lies upstream of the lateral geniculate nucleus.',
    },

    {
      kind: 'callout',
      tone: 'info',
      gap: 8,
      html: '💡 <strong>Key discriminator:</strong> Dazzle + PLR intact + absent menace = <strong>cortical</strong> · Absent dazzle + absent PLR + normal fundus = <strong>SARDS</strong> (red PLR absent, blue present) or <strong>optic neuritis</strong> (both absent) · Check BP on every acute bilateral blind animal.',
    },
  ],
}

const blindEyeChronic: FlowPage = {
  id: 'blind-eye-chronic',
  title: 'Chronic Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'info', text: '🕐 CHRONIC VISION LOSS', sub: 'Onset weeks → months → years · Progressive decline · Often bilateral' },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE LESION ALONG THE VISUAL PATHWAY',
      sub: 'Cornea → aqueous → lens → vitreous → retina → optic n. → chiasm → optic tract → LGN → cortex',
    },

    {
      kind: 'choices',
      cols: 5,
      size: 10,
      items: [
        { variant: 'insp', label: '👁️ Anterior<br>opacity', sublabel: 'light cannot reach retina', link: { to: 'lesion', loc: 'LOC-BL-OPAQUE', name: 'Anterior segment opacity' } },
        { variant: 'exp', label: '🌑 Retina', sublabel: 'SARDS · RD · PRA · HT', link: { to: 'lesion', loc: 'LOC-BL-RETINA', name: 'Retinal disease' } },
        { variant: 'rest', label: '🧬 Optic<br>nerve', sublabel: 'neuritis · hypoplasia · neoplasia', link: { to: 'lesion', loc: 'LOC-BL-OPTIC', name: 'Optic nerve' } },
        { variant: 'mixed', label: '✨ Chiasm /<br>tract', sublabel: 'pituitary mass · rare', link: { to: 'lesion', loc: 'LOC-BL-CHIASM', name: 'Chiasm / optic tract' } },
        { variant: 'insp', tone: 'purple', label: '🧠 Cortex /<br>forebrain', sublabel: 'HE · HT · MUA · CVA · neoplasia', link: { to: 'lesion', loc: 'LOC-BL-CORTEX', name: 'Cortical / forebrain' } },
      ],
      connectAfter: false,
    },

    {
      kind: 'cardSection',
      tone: 'green',
      gap: 0,
      title: '👁️ ANTERIOR OPACITY — Ocular media blocking visual pathway',
      cards: [
        { title: 'Mature / Hypermature Cataract', tag: 'Dog &gt;&gt; Cat ›', desc: 'No fundus reflex · white/grey lens opacity · DM is a major cause in dogs (rapid bilateral progression) · chronic uveitis is the main cause in cats · lens-induced uveitis common · phacoemulsification referral if patient is healthy and owner is motivated', link: { to: 'disease', id: 'DIS-EYE-CATARACT' } },
        { title: 'Chronic Glaucoma with Buphthalmos', tag: 'Dog + Cat ›', desc: "Globe enlargement · Haab's striae · corneal oedema · blind + painful · enucleation often the most humane option", link: { to: 'disease', id: 'DIS-OPH-GLAUCOMA' } },
        { title: 'Chronic Uveitis with Posterior Sequelae', tag: 'Dog + Cat ›', desc: '360° posterior synechiae → iris bombé → secondary glaucoma · cataract from nutritional lens deprivation · exudative RD · FIV / FeLV / tick-borne / immune-mediated in background', link: { to: 'disease', id: 'DIS-EYE-UVEITIS-ANT' } },
        { title: 'Feline Diffuse Iris Melanoma → Secondary Glaucoma', tag: 'Cat ›', desc: 'Progressive flat hyperpigmentation → dyscoria → ↑ IOP → blind painful eye · enucleate early at first stromal infiltration signs · metastatic risk 19–63%', link: { to: 'disease', id: 'DIS-EYE-IRIS-MEL' } },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'warning',
      gap: 8,
      title: '🌑 RETINA — Tapetal hyperreflectivity · vessel attenuation · absent ERG',
      cards: [
        { title: 'Progressive Retinal Atrophy (PRA)', tag: 'Dog &gt;&gt; Cat ›', desc: 'Rod loss first → night blindness → day blindness over months to years · Tapetal hyperreflectivity + vessel attenuation + disc pallor · Labrador, Poodle, Cocker, Irish Setter, Tibetan Terrier, Mini Schnauzer · Genetic testing (prcd, rcd1) available for many breeds · No treatment', link: { to: 'disease', id: 'DIS-EYE-PRA' } },
        { title: 'Taurine-deficient Central Retinal Degeneration (TCRD)', tag: 'Cat', desc: 'Vegetarian / homemade / taurine-deficient diet · bilateral central hyperreflective ellipse before peripheral involvement · early supplementation may halt progression · test diet history' },
        { title: 'Chorioretinitis (Infectious)', tag: 'Dog + Cat ›', desc: 'Multifocal grey-white retinal lesions ± haemorrhage · Cat: Toxoplasma, FIP, FeLV/FIV, Cryptococcus · Dog: Ehrlichia, RMSF, Leishmania, Blastomyces, Histoplasma · systemic infectious workup + titres', link: { to: 'disease', id: 'DIS-EYE-RD' } },
        { title: 'Collie Eye Anomaly (CEA)', tag: 'Collie / Sheltie', desc: 'Choroidal hypoplasia + ONH coloboma ± retinal detachment / haemorrhage · Fundoscopy: pale area lateral to disc · genetic test available (SLC4A7) · severity varies; many dogs retain vision' },
        { title: 'Retinal Dysplasia', tag: 'CKCS / English Springer', desc: 'Retinal folds / geographic dysplasia / complete RD (young dog) · congenital, bilateral · CKCS and English Springer Spaniel predisposed · no treatment' },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'purple',
      gap: 8,
      title: '🧬 OPTIC NERVE — Progressive disc pallor · optic atrophy · mass effect',
      cards: [
        { title: 'Optic Nerve / Orbital Meningioma', desc: 'Unilateral progressive vision loss ± exophthalmos · disc pallor on fundoscopy · CT/MRI shows orbital mass · debulking or stereotactic radiation · slow progression' },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'slate',
      gap: 8,
      title: '✨ CHIASM / TRACT — Bilateral field loss · endocrine signs · pituitary region',
      cards: [
        { title: 'Pituitary Macroadenoma', desc: 'Insidious bilateral vision loss + HAC / diabetes insipidus signs · bitemporal hemianopia pattern (variable per species) · MRI: sellar / suprasellar mass · transphenoidal surgery or radiation' },
      ],
    },

    {
      kind: 'cardSection',
      tone: 'indigo',
      gap: 8,
      title: '🧠 CORTEX / FOREBRAIN — Dazzle + PLR intact · absent menace · normal fundus',
      cards: [
        { title: 'MUA / GME / NME (Chronic Progression)', tag: 'Dog', desc: 'Inflammatory CNS disease progressing over weeks · optic neuritis component ± other neuro signs · MRI + CSF for diagnosis · immunosuppression (prednisolone + cytarabine / lomustine)' },
        { title: 'Intracranial Neoplasia', desc: 'Meningioma / glioma causing cortical blindness · progressive behavioural change ± seizures ± lateralising signs · MRI brain · surgery / radiation / palliative steroids' },
      ],
    },

    {
      kind: 'table',
      boxTone: 'purple',
      gap: 14,
      title: '🔍 THE LOCALISATION TABLE — Menace · Dazzle · PLR',
      cols: '1.3fr 0.7fr 0.7fr 0.7fr 1.4fr',
      headers: ['Lesion site', 'Menace', 'Dazzle', 'PLR', 'Fundus'],
      rows: [
        ['Anterior opacity', 'Absent', 'Variable', 'Variable', 'Often not visible'],
        ['Retinal disease (RD, PRA)', 'Absent', 'Absent', 'Absent / sluggish', 'Abnormal'],
        [{ text: 'SARDS', tone: 'warning' }, 'Absent', 'Absent', 'Red absent · Blue present', { text: 'NORMAL (key clue)', tone: 'green' }],
        ['Optic nerve (neuritis)', 'Absent', 'Absent', 'Absent (red AND blue)', 'Swollen disc · haemorrhage'],
        ['Chiasm / tract', 'Absent (variable)', 'Absent / variable', 'Variable per pattern', 'Normal'],
        [{ text: 'Cortex / forebrain', tone: 'purple' }, 'Absent', { text: 'PRESENT', tone: 'green' }, { text: 'PRESENT', tone: 'green' }, 'Normal'],
      ],
      footnote: '💡 The single most discriminating finding: <strong>preserved dazzle + preserved PLR with absent menace = cortical blindness</strong>. Everything else lies upstream of the lateral geniculate nucleus.',
    },

    {
      kind: 'callout',
      tone: 'info',
      gap: 8,
      html: '💡 <strong>Key discriminator:</strong> Night blindness first = PRA (rods before cones) · No fundus reflex = cataract · Tapetal hyperreflectivity + vessel attenuation = end-stage retinal disease · Buphthalmos = chronic glaucoma · Young dog with coloboma = CEA.',
    },
  ],
}

export const blindEyeFlows: FlowPage[] = [blindEyeEntry, blindEyeAcute, blindEyeChronic]
