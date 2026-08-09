// ── Abnormal Pupil / Anisocoria flowchart (data) ────────────────────────────
// Sources: abnormalPupilFlowHtml / abnormalPupilOphthalmicHtml /
// abnormalPupilNeuroBranchHtml (consts) + renderAnisocoria* inline functions in
// cliniqApp.ts. The cause pages use `categoryGrid`, the localise pages use
// `decisionTree`, ophthalmic uses `cardGrid`. The neurological branch page is a
// bespoke 2-col compare + arrow-branch layout with no typed block yet → html.

import type { FlowPage } from '../flowTypes'

/** A "DIFFERENTIALS" sub-box for a decision-tree exit. Sits on the exit's solid
 *  (darkened) tone fill, so it reads as a darker inset of the same tone with a
 *  lighter label. Colours are derived from the tone triplet via color-mix (no
 *  hardcoded per-tone hexes; triplets are mode-stable). `items` are • -separated. */
const DIFF = (tone: string, items: string) =>
  `<div style="margin-top:6px;padding:5px 8px;background:color-mix(in srgb, rgb(var(--tone-${tone})) 42%, #000);` +
  `border:1px solid color-mix(in srgb, rgb(var(--tone-${tone})) 60%, #000);border-radius:6px;">` +
  `<span style="display:block;font-size:7.5px;font-weight:700;letter-spacing:.06em;color:color-mix(in srgb, rgb(var(--tone-${tone})) 30%, #fff);margin-bottom:2px;">DIFFERENTIALS</span>` +
  `<span style="color:color-mix(in srgb, rgb(var(--tone-${tone})) 22%, #fff);">${items}</span></div>`

// ── 1. Entry ────────────────────────────────────────────────────────────────
const abnormalPupilEntry: FlowPage = {
  id: 'abnormal-pupil',
  title: 'Abnormal Pupil',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🔵 ABNORMAL PUPIL' },
    { kind: 'node', variant: 'step', text: 'OPHTHALMIC vs NEUROLOGICAL?' },
    {
      kind: 'choices',
      cols: 2,
      connectAfter: false,
      items: [
        { variant: 'insp', label: '👁️ Ophthalmic', sublabel: 'Visible ocular changes', link: { to: 'flow', id: 'abnormal-pupil-ophthalmic' } },
        { variant: 'mixed', label: '🧠 Neurological', sublabel: 'Only pupil/PLR abnormality', link: { to: 'flow', id: 'abnormal-pupil-neuro' } },
      ],
    },
    {
      kind: 'callout',
      tone: 'purple',
      gap: 10,
      connectAfter: false,
      title: '🔬 KEY EXAM CHECKS BEFORE LOCALISING',
      html:
        '1. <strong>Vision</strong> (menace, tracking, dazzle): if vision is impaired, prioritise retina / optic nerve / cortical workup over iris/Horner\'s.<br>' +
        '2. <strong>PLR direct, indirect, swinging-light</strong>: localises afferent (retina/CN II) vs efferent (CN III).<br>' +
        '3. <strong>IOP</strong>: rule out glaucoma (mid-fixed mydriasis + ↑ IOP) and uveitis (miosis + ↓ IOP).<br>' +
        '4. <strong>Slit-lamp / focal light</strong>: iris atrophy, synechiae, aqueous flare, lens position, dyscoria.<br>' +
        '5. <strong>Concurrent Horner\'s signs?</strong> Miosis + ptosis + enophthalmos + 3rd eyelid protrusion = sympathetic denervation.',
    },
    {
      kind: 'callout',
      tone: 'danger',
      gap: 10,
      title: '⚡ DO NOT MISS',
      html:
        '• <strong onclick="renderDiseasePage(\'DIS-OPH-GLAUCOMA\')" style="cursor:pointer;text-decoration:underline;">Acute glaucoma</strong> — fixed mid-dilated unresponsive pupil + ↑ IOP → sight-threatening (refer same day)<br>' +
        '• <strong onclick="renderDiseasePage(\'DIS-EYE-LENS-LUX\')" style="cursor:pointer;text-decoration:underline;">Anterior lens luxation</strong> — altered pupil shape + pain + ↑ IOP risk (Jack Russell, Tibetan Terrier) → emergency lensectomy<br>' +
        '• <strong onclick="renderDiseasePage(\'DIS-EYE-OPTNEUR\')" style="cursor:pointer;text-decoration:underline;">Optic neuritis (MUA, infectious, idiopathic)</strong> — bilateral mydriasis + acute blindness → MRI + CSF, aggressive immunosuppression<br>' +
        '• <strong>Brainstem / CN III lesion</strong> — anisocoria + altered mentation, hemiparesis, cranial nerve deficits → emergency neuro workup<br>' +
        '• <strong onclick="renderDiseasePage(\'DIS-EYE-SARDS\')" style="cursor:pointer;text-decoration:underline;">SARDS</strong> — acute bilateral blindness + dilated unresponsive pupils + normal fundus + PU/PD → chromatic PLR + ERG',
    },
    { kind: 'banner', tone: 'info', html: 'Tap a branch to drill down to specific lesion types' },
  ],
}

// ── 2. Ophthalmic branch (fn layout, cardGrid) ──────────────────────────────
const abnormalPupilOphthalmic: FlowPage = {
  id: 'abnormal-pupil-ophthalmic',
  title: 'Abnormal Pupil — Ophthalmic',
  layout: 'fn',
  blocks: [
    { kind: 'fnHeader', variant: 'insp', text: '👁️ OPHTHALMIC CAUSES' },
    {
      kind: 'cardGrid',
      perRow: 3,
      tiles: [
        { anat: 'nasal', loc: 'Iris', link: { to: 'lesion', loc: 'LOC-AP-IRIS', name: 'Iris causes' } },
        { anat: 'larynx', loc: 'Lens', link: { to: 'lesion', loc: 'LOC-AP-LENS', name: 'Lens causes' } },
        { anat: 'pleural', loc: 'Retina / Optic nerve', link: { to: 'lesion', loc: 'LOC-AP-RETINA', name: 'Retina / Optic nerve' } },
      ],
    },
  ],
}

// ── 3. Neurological branch (bespoke compare + arrow-branch layout → html) ────
const abnormalPupilNeuro: FlowPage = {
  id: 'abnormal-pupil-neuro',
  title: 'Abnormal Pupil — Neurological',
  blocks: [
    {
      kind: 'html',
      html: `<div class="flow-node entry" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.4);color:var(--tone-violet-fg);">🧠 NEUROLOGICAL ANISOCORIA</div>
  <div class="flow-node step" style="margin-top:6px;font-size:10.5px;">Identify the ABNORMAL pupil</div>

  <div style="margin-top:8px;padding:10px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:var(--tone-info-fg);margin-bottom:8px;">💡 WHICH PUPIL IS ABNORMAL? — LIGHT vs DARK ROOM RULE</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div style="font-size:9.5px;line-height:1.5;background:rgba(37,99,235,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:var(--tone-info-fg);font-weight:700;margin-bottom:3px;">Abnormally LARGE pupil</div>
        Anisocoria <strong>LESS obvious</strong> in the dark<br>
        (normal pupil also dilates, narrowing the gap)<br>
        <strong style="color:var(--tone-warning-fg);">⇒ Lesion preventing constriction</strong><br>
        → CN III · iris atrophy · pharmacological mydriasis · glaucoma
      </div>
      <div style="font-size:9.5px;line-height:1.5;background:rgba(37,99,235,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:var(--tone-info-fg);font-weight:700;margin-bottom:3px;">Abnormally SMALL pupil</div>
        Anisocoria <strong>MORE obvious</strong> in the dark<br>
        (normal pupil dilates; abnormal stays small)<br>
        <strong style="color:var(--tone-danger-title);">⇒ Lesion preventing dilation</strong><br>
        → Horner's · uveitis · pharmacological miotic · synechiae
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;margin-top:2px;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:18px;color:rgba(139,92,246,0.5);line-height:1;">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.4);color:var(--fg-violet-deep);font-size:11px;font-weight:700;text-align:center;cursor:pointer;" onclick="renderFlowId('anisocoria-mydriasis')">
        MYDRIASIS<br><span style="font-size:9px;color:var(--tone-violet-fg);margin-top:4px;display:block;">Tap to localise ›</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:18px;color:rgba(37,99,235,0.5);line-height:1;">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.4);color:var(--fg-blue-deep);font-size:11px;font-weight:700;text-align:center;cursor:pointer;" onclick="renderFlowId('anisocoria-horners')">
        MIOSIS<br><span style="font-size:9px;color:var(--tone-info-fg);margin-top:4px;display:block;">Tap to localise ›</span>
      </div>
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:10px;width:100%;">
    <div style="font-size:10px;font-weight:700;color:var(--tone-warning-fg);margin-bottom:4px;">💡 PEARLS</div>
    <div style="font-size:9.5px;line-height:1.6;color:var(--amber-text);">
      • Anisocoria + altered mentation = <strong>emergency</strong> — assume herniation until proven otherwise<br>
      • <strong>Absent direct PLR, consensual intact</strong> = pre-chiasmal (retina/optic nerve) — NOT CN III<br>
      • CN III peripheral: mydriasis <em>without</em> ptosis or lateral strabismus = parasympathetic fibres only<br>
      • Horner's: always exclude uveitis first (aqueous flare + IOP) before labelling as sympathetic denervation
    </div>
  </div>`,
    },
  ],
}

// ── 4. Mydriasis — Causes (categoryGrid) ────────────────────────────────────
const anisocoriaMydriasis: FlowPage = {
  id: 'anisocoria-mydriasis',
  title: 'Mydriasis — Causes',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🔵 MYDRIASIS — POSSIBLE CAUSES' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE' },
    {
      kind: 'categoryGrid',
      columns: [
        { cat: 'Neurological', tiles: [{ label: 'CN III / Brainstem', link: { to: 'flow', id: 'anisocoria-mydriasis-localise' } }] },
        { cat: 'Afferent', tone: 'info', tiles: [{ label: 'Retina / Optic nerve', link: { to: 'lesion', loc: 'LOC-AP-RETINA', name: 'Retina / Optic nerve' } }] },
        { cat: 'Drug-induced', tiles: [{ label: 'Pharmacological mydriasis', terminal: true }] },
        { cat: 'Iris / Ocular', tone: 'warning', tiles: [
          { label: 'Iris atrophy', link: { to: 'lesion', loc: 'LOC-AP-IRIS', name: 'Iris' } },
          { label: 'Glaucoma', link: { to: 'lesion', loc: 'LOC-RE-GLAUCOMA', name: 'Glaucoma' } },
        ] },
      ],
    },
  ],
}

// ── 5. Mydriasis — Localisation (decisionTree) ──────────────────────────────
const anisocoriaMydriasisLocalise: FlowPage = {
  id: 'anisocoria-mydriasis-localise',
  title: 'Mydriasis — Localisation',
  dxSign: 'abnormal-pupil',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'violet', text: '🔵 NEUROLOGICAL MYDRIASIS — Localisation', sub: 'The large pupil is the abnormal one — it fails to constrict to light; localise the efferent lesion before naming a cause' },
    {
      kind: 'html',
      html: '<div class="flow-node step" style="margin-top:6px;font-size:9.5px;text-align:left;"><strong>Exclude first:</strong> iris atrophy (retroilluminate) · pharmacological mydriasis (drug history) · fear/stress (re-examine calm)</div><div class="flow-arrow-v">↓</div>',
    },
    {
      kind: 'decisionTree',
      connectAfter: false,
      steps: [
        {
          type: 'step', continue: 'YES',
          question: 'Normal mentation, posture & gait?',
          sub: 'No altered consciousness · no hemiparesis · no vestibular or other CN deficits',
          exit: { tone: 'danger', html: `<strong>🚨 BRAINSTEM EMERGENCY</strong><br>Fixed dilated pupil + altered mentation<br>⚠️ Cushing's reflex: bradycardia + HTN + irregular breathing<br>→ Mannitol 0.5–1 g/kg IV over 15 min<br>→ Urgent MRI · neurosurgical referral${DIFF('danger', 'Transtentorial herniation (↑ ICP) • Brainstem neoplasia • Head trauma')}` },
        },
        {
          type: 'step', continue: 'YES',
          question: 'Visual tracking intact?',
          sub: 'Menace response + cotton ball tracking + dazzle reflex — all three present',
          exit: { tone: 'info', html: `<strong>Pre-chiasmal — Afferent lesion</strong><br>Retina or optic nerve (amaurotic mydriasis)<br>Absent direct PLR · consensual (indirect) PLR intact<br>→ Chromatic PLR + ERG + fundoscopy<br>→ MRI optic nerve/chiasm if ERG inconclusive${DIFF('info', 'SARDS • PRA • Optic neuritis • Retinal detachment')}` },
        },
        {
          type: 'step', continue: 'NO',
          question: 'Direct PLR present in the mydriatic eye?',
          exit: { tone: 'slate', html: `<strong>Not truly neurological / Cortical</strong><br>Cortical blindness: absent menace, intact PLR + dazzle<br>→ Drug history · repeat exam<br>→ MRI forebrain if cortical cause suspected${DIFF('slate', 'Physiological anisocoria (±1 mm) • Pharmacological • Iris atrophy (retroilluminate again!) • Cortical blindness')}` },
        },
        {
          type: 'split',
          question: 'Ptosis or lateral strabismus present?',
          sub: 'Somatic branch of CN III also affected?',
          noLabel: 'NO →',
          no: { tone: 'green', html: `<strong>CN III — Parasympathetic only</strong><br>Somatic CN III intact; PS fibres compressed<br>→ MRI fat-sat + contrast:<br>orbit + cavernous sinus${DIFF('green', 'Orbital mass • Retrobulbar disease • Cavernous sinus lesion • CN III NST')}` },
          yesLabel: 'YES →',
          yes: { tone: 'violet', html: `<strong>Full CN III Palsy</strong><br>Mydriasis + ptosis + lateral strabismus<br>→ MRI brain + post-contrast<br>→ Assess ICP${DIFF('violet', 'Pituitary/hypothalamic mass • Cavernous sinus syndrome • Transtentorial herniation (↑ ICP)')}` },
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 10,
      connectAfter: false,
      title: '💡 PEARLS',
      html:
        '• <strong>Absent direct PLR + consensual intact</strong> = pre-chiasmal — NOT efferent CN III<br>' +
        '• CN III parasympathetic only: mydriasis without ptosis or lateral strabismus → orbital/cavernous sinus<br>' +
        '• Cortical blindness: absent menace + intact PLR + intact dazzle = forebrain lesion → MRI<br>' +
        '• SARDS: PLR absent to red light, preserved to blue (melanopsin RGCs) — ERG flat',
    },
    { kind: 'disclaimer' },
  ],
}

// ── 6. Miosis — Causes (categoryGrid) ───────────────────────────────────────
const anisocoriaHorners: FlowPage = {
  id: 'anisocoria-horners',
  title: 'Miosis — Causes',
  dxSign: 'abnormal-pupil',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🔵 MIOSIS — POSSIBLE CAUSES' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE' },
    {
      kind: 'categoryGrid',
      columns: [
        { cat: 'Sympathetic', tone: 'info', tiles: [{ label: "Horner's syndrome", link: { to: 'disease', id: 'DIS-NEU-HORNERS' } }] },
        { cat: 'Uveal', tone: 'danger', tiles: [{ label: 'Anterior uveitis', link: { to: 'lesion', loc: 'LOC-RE-UVEA', name: 'Anterior uvea' } }] },
        { cat: 'Drug-induced', tiles: [{ label: 'Pharmacological miosis', terminal: true }] },
        { cat: 'Structural', tone: 'slate', tiles: [{ label: 'Iris sphincter damage', terminal: true }] },
      ],
    },
  ],
}

// ── 7. Horner's Syndrome — Localisation (decisionTree) ──────────────────────
const anisocoriaHornersLocalise: FlowPage = {
  id: 'anisocoria-horners-localise',
  title: "Horner's Syndrome — Localisation",
  dxSign: 'abnormal-pupil',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'info', text: "🔵 HORNER'S SYNDROME — Localisation", sub: 'Miosis + ptosis + enophthalmos + third-eyelid protrusion on one side; localise along the three-neuron sympathetic path' },
    {
      kind: 'html',
      html: '<div class="flow-node step" style="margin-top:6px;font-size:9.5px;text-align:left;">Confirm signs: miosis + ptosis + enophthalmos + 3rd eyelid elevation<br><strong>⚠️ Exclude uveitis first</strong> — aqueous flare + IOP; uveitic miosis requires very different management</div><div class="flow-arrow-v">↓</div>',
    },
    {
      kind: 'decisionTree',
      connectAfter: false,
      steps: [
        {
          type: 'step', continue: 'NO',
          question: 'Phenylephrine 1% — both eyes',
          sub: 'Does the miotic pupil dilate within 20 min? (denervation hypersensitivity of postganglionic axon)',
          exit: { tone: 'info', html: '<strong>3rd Order — Postganglionic</strong><br>After the cranial cervical ganglion<br>Middle ear (OM/OI) · retrobulbar mass<br>Nasopharyngeal polyp (🐱) · Idiopathic<br>🐕 Golden Retriever idiopathic: most common;<br>median resolution 15 wks; up to 6 months<br>± CN VII + CN VIII = middle ear → CT bullae<br>→ Otoscopy + CT/MRI bullae + retrobulbar space' },
        },
        {
          type: 'step', continue: 'NO',
          question: 'Phenylephrine 10% — both eyes',
          sub: 'Does the miotic pupil dilate within 20–40 min?',
          exit: { tone: 'warning', html: '<strong>2nd Order — Preganglionic</strong><br>C8–T3 roots → cervical sympathetic trunk → thorax<br>Mediastinal mass · Thymoma · Lymphoma<br>Brachial plexus avulsion · Thoracic surgery/trauma<br>± Ipsilateral LMN forelimb signs (brachial plexus)<br>→ Thoracic rads + CT thorax<br>→ CT/MRI cervical cord + brachial plexus' },
        },
        {
          type: 'outcome',
          label: 'NO RESPONSE →',
          box: { tone: 'danger', html: '<strong>1st Order — Central</strong><br>Brain or cervical spinal cord (C1–T3)<br>Cervical IVDD · FCE · CVA<br>GME · Brainstem neoplasia<br>Associated: neck pain · ataxia · paresis · vestibular signs · other CN deficits<br>→ MRI brain + cervical cord<br>→ CSF analysis' },
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 10,
      connectAfter: false,
      title: '💡 PEARLS',
      html:
        '• <strong>Golden Retriever idiopathic Horner\'s</strong>: 3rd order, self-limiting — phenylephrine 1% q6–8h for cosmesis; median resolution ~15 weeks<br>' +
        '• CN VII palsy + Horner\'s = petrous temporal bone / middle ear (3rd order) → CT bullae<br>' +
        '• Horner\'s + neck pain/paresis = 1st order cord lesion → MRI cervical cord urgently<br>' +
        '• Horner\'s &gt;3 weeks: 2nd-order lesions may develop denervation hypersensitivity — phenylephrine test less reliable',
    },
    { kind: 'disclaimer' },
  ],
}

export const abnormalPupilFlows: FlowPage[] = [
  abnormalPupilEntry,
  abnormalPupilOphthalmic,
  abnormalPupilNeuro,
  anisocoriaMydriasis,
  anisocoriaMydriasisLocalise,
  anisocoriaHorners,
  anisocoriaHornersLocalise,
]
