// ── Seizures — diagnostic approach (data) ───────────────────────────────────
// Consult-room scoped: a block earns its place only if it changes what you do
// next. Reference material that is read once (the toxin/medication catalogue,
// CN exam technique) lives where it is already tappable — the `seizures-reactive`
// flow page and the shared CN_EXAM_ACCORDION — and is linked from here rather
// than duplicated. Emergency dosing lives in PROT-SEIZ, not on a Dx page.

import type { DxApproach } from '../dxTypes'
import { CN_EXAM_ACCORDION } from './shared/neuroExam'

export const seizuresDx: DxApproach = {
  title: 'Seizures',
  tabs: {

  history: {
    title: 'History: Seizures',
    blocks: [
      { kind: 'step', text: '📋 CHARACTERISE THE EVENT' },
      {
        kind: 'check',
        html: `<strong>Ask owners to video future episodes.</strong> The description is the diagnostic tool — the two findings below redirect the whole workup.<br><br>
    <strong style="color:var(--tone-info-fg);">Focal onset?</strong> One body region or one side — facial twitching, lip smacking, fly-catching, one limb jerking. Consciousness may be preserved. Focal onset (including focal-to-bilateral) → <strong>structural until proven otherwise.</strong><br><br>
    <strong style="color:var(--tone-warning-fg);">Generalised?</strong> Both sides at once — tonic-clonic, tonic, atonic; consciousness lost; autonomic signs (urination, defaecation, hypersalivation). Any category still possible.<br><br>
    <strong style="color:var(--tone-green-fg);">Postictal recovery:</strong> disorientation, transient blindness, ataxia, polyphagia — normally minutes to a few hours. <strong>Prolonged (&gt;24h) or not improving = structural.</strong>`,
      },

      { kind: 'step', text: '⏱ DURATION · CLUSTERS · AGE OF ONSET' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-danger-fg);">&gt;5 min = status epilepticus</strong> — treat now, do not wait. <strong style="color:var(--tone-danger-fg);">≥2 seizures/24h = cluster</strong> — high SE risk, treat aggressively.<br><br>
    <strong>Age at first seizure:</strong><br>
    • <strong>&lt;6 months</strong> → structural (anomalous, storage) or reactive (hypoglycaemia, PSS, toxin)<br>
    • <strong>6 months–6 years</strong> → idiopathic epilepsy most likely, <em>if</em> bloods and interictal exam are normal<br>
    • <strong>&gt;6 years</strong> → structural (neoplasia, CVA, MUO) or reactive — idiopathic rare<br><br>
    <strong>Interictal behaviour:</strong> completely normal between episodes? Head pressing, circling, personality or vision change → structural. Frequency trend: stable, increasing, or decreasing?`,
      },

      { kind: 'step', text: '💊 TOXIN · MEDICATION · AED HISTORY' },
      {
        kind: 'check',
        html: `Three questions, every seizure patient:<br>
    <strong>1. Any possible toxin access?</strong> Slug bait, rodenticide, antifreeze, mouldy food, chocolate, lead, farm chemicals.<br>
    <strong>2. Any medication started or changed?</strong> — with cats, ask specifically about <strong style="color:var(--tone-danger-fg);">5-FU cream in the household</strong> (trace exposure is fatal), permethrin spot-ons, metronidazole.<br>
    <strong>3. Any missed AED doses?</strong> <strong style="color:var(--tone-danger-fg);">Abrupt phenobarbitone or KBr withdrawal is a major cause of breakthrough seizures and SE.</strong><br><br>
    A "yes" to any of these moves the patient into the reactive category — open the list below for the full toxin / medication catalogue with linked pages.`,
      },
      {
        kind: 'diseaseGrid',
        title: 'REACTIVE CAUSES — FULL LISTS',
        links: [
          { label: 'Toxins · medications · metabolic', link: { to: 'flow', id: 'seizures-reactive' } },
          { label: 'SE emergency protocol', link: { to: 'protocol', id: 'PROT-SEIZ' } },
        ],
      },

      { kind: 'step', text: '🐾 SIGNALMENT' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Border Collie', 'Labrador', 'German Shepherd', 'Golden Retriever', 'Belgian Shepherd (Tervuren, Malinois)', 'Beagle', 'Keeshond', 'Vizsla', 'Finnish Spitz'], tone: 'info', html: 'idiopathic epilepsy. Breed predisposition supports IE in a 6 mo–6 yr patient — it never replaces a normal metabolic database and a normal interictal exam.' },
          { breeds: ['Yorkshire Terrier', 'Maltese', 'Pomeranian', 'Miniature Schnauzer', 'Shih Tzu'], tone: 'green', html: 'PSS / hepatic encephalopathy — small and toy breeds, onset &lt;1 year, signs often post-prandial. Check fasted and 2 h post-prandial bile acids before committing to idiopathic epilepsy.' },
          { breeds: ['Boston Terrier', 'French Bulldog', 'Pug', 'Boxer'], tone: 'danger', html: 'glioma (brachycephalic skull) — older dogs, progressive focal signs, intra-axial with peri-lesional oedema.' },
          { breeds: ['Golden Retriever', 'Greyhound', 'Collie'], tone: 'warning', html: 'meningioma (dolichocephalic skull) — extra-axial, slow progression.' },
          { breeds: ['Pug', 'Yorkshire Terrier', 'Maltese', 'Chihuahua', 'French Bulldog'], tone: 'violet', html: 'MUO / meningoencephalitis.' },
          { breeds: ['Collie', 'Shetland Sheepdog', 'Australian Shepherd', 'Border Collie'], tone: 'warning', html: 'MDR1 / ABCB1 — macrocyclic lactone toxicity.' },
          { breeds: ['Dalmatian', 'Poodle', 'Tibetan Terrier', 'English Setter'], tone: 'info', html: 'storage disease (NCL) — juvenile onset, progressive.' },
          { breeds: ['Under-vaccinated or travelled dog'], group: 'signalment', tone: 'danger', html: 'CDV in the under-vaccinated dog; travel opens Neospora, Leishmania, Ehrlichia, Babesia, Coccidioides.' },
        ],
        cat: [
          { breeds: ['Siamese', 'Domestic Shorthair'], tone: 'warning', html: 'meningioma — the commonest feline brain tumour (older DSH, Siamese).' },
          { breeds: ['FeLV positive'], group: 'signalment', tone: 'danger', html: 'CNS lymphoma.' },
          { breeds: ['Outdoor / unvaccinated cat'], group: 'signalment', tone: 'violet', html: 'FIP, Toxoplasma, Cryptococcus.' },
          { breeds: ['Recurrent seizures, any breed'], group: 'signalment', tone: 'info', html: 'idiopathic epilepsy is less common than in the dog and carries no breed predisposition — it remains a diagnosis of exclusion.' },
        ],
      },
    ],
    after: [
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Seizures',
    blocks: [
      { kind: 'step', tone: 'danger', text: '🚨 SEIZING OR IMMEDIATELY POST-ICTAL?' },
      {
        kind: 'check',
        html: `1. Airway — sternal recumbency, head extended, suction if needed<br>
    2. High-flow O₂ (5–10 L/min mask or flow-by)<br>
    3. IV access (cephalic or saphenous)<br>
    4. Point-of-care BG immediately — dextrose if &lt;3.5 mmol/L<br>
    5. T° &gt;41°C after SE → active cooling; stop at 39.5°C<br>
    6. <strong>Do NOT attempt a full neuro exam during an active seizure</strong> — examine when calm.<br><br>
    Drug dosing → see <strong>PROT-SEIZ</strong>.`,
      },

      { kind: 'step', text: '🧠 POSTICTAL vs INTERICTAL' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-warning-fg);">Postictal</strong><br>
      Disoriented, ataxic, transiently blind<br>
      Hypersalivating, polyphagic<br>
      May look neurologically abnormal<br>
      But should be <em>improving</em> over minutes–hours<br><br>
      <strong>Not improving → structural</strong>`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-green-fg);">Interictal</strong><br>
      Should be neurologically <strong>normal</strong><br>
      in idiopathic epilepsy<br>
      Any persistent deficit = structural<br>
      Any progressive deficit = structural<br><br>
      <strong>This exam decides whether you image</strong>`,
          },
        ],
      },

      { kind: 'step', text: '🩺 NEURO FINDING → WHAT IT MEANS' },
      {
        kind: 'gridTable',
        cols: '0.34fr 0.38fr 0.28fr',
        dividers: true,
        headers: ['Finding', { text: 'Implication', tone: 'danger' }, { text: 'Action', tone: 'teal' }],
        rows: [
          { section: 'Lateralising — a focal lesion until proven otherwise' },
          ['<strong>Unilateral CP deficit</strong> · asymmetric hopping', { text: 'Forebrain lesion, <strong>ipsilateral</strong> to the deficit', tone: 'danger' }, { text: 'MRI brain', tone: 'teal' }],
          ['<strong>Unilateral menace loss</strong> (PLR intact)', { text: 'Forebrain lesion, <strong>contralateral</strong> to the loss', tone: 'danger' }, { text: 'MRI brain', tone: 'teal' }],
          ['<strong>Circling · head turn</strong>', { text: 'Forebrain, ipsilateral to the turn', tone: 'danger' }, { text: 'MRI brain', tone: 'teal' }],
          ['<strong>Hemiparesis</strong>', { text: 'Contralateral forebrain, or brainstem', tone: 'danger' }, { text: 'MRI brain', tone: 'teal' }],
          { section: 'Raised ICP / herniation — emergency' },
          ['<strong>Fixed dilated pupil</strong>', { text: 'CN III compression / brainstem herniation', tone: 'danger' }, { text: 'Mannitol or hypertonic saline — PROT-SEIZ', tone: 'teal' }],
          ['<strong>Head pressing</strong> · deteriorating mentation', { text: 'Raised ICP (or hepatic encephalopathy)', tone: 'danger' }, { text: 'Treat ICP; check ammonia / bile acids', tone: 'teal' }],
          ['<strong>Papilloedema</strong> on fundoscopy', { text: 'Raised ICP', tone: 'danger' }, { text: 'Treat before GA for imaging', tone: 'teal' }],
          { section: 'Points to the underlying cause' },
          ['<strong>Chorioretinitis</strong>', { text: 'Infectious / immune — Toxo, CDV, FIP, Crypto', tone: 'danger' }, { text: 'Serology / PCR + CSF', tone: 'teal' }],
          ['<strong>Retinal haemorrhage or detachment</strong>', { text: 'Systemic hypertension', tone: 'danger' }, { text: 'Measure BP; T4 in cats &gt;8 yr', tone: 'teal' }],
          ['<strong>Normal, symmetric exam</strong>', { text: 'Idiopathic or reactive still possible', tone: 'danger' }, { text: 'Metabolic database first', tone: 'teal' }],
        ],
      },
      {
        kind: 'note',
        html: `Mentation grading: alert → obtunded → stuporous → comatose. Record it at every recheck — the <em>trend</em> is what matters, not the single value.`,
      },

      { kind: 'step', text: '🔍 TARGETED PHYSICAL EXAM' },
      {
        kind: 'check',
        html: `Only four things on the general exam change the seizure workup:<br><br>
    <strong style="color:var(--tone-info-fg);">Cardiac auscultation + pulse quality</strong> — murmur, arrhythmia or weak pulses reopen <strong>syncope</strong> as the diagnosis. Collapse without a postictal phase is not a seizure.<br>
    <strong style="color:var(--tone-warning-fg);">Blood pressure</strong> — hypertensive encephalopathy is treatable and easily missed (older cat, CKD, hyperthyroid).<br>
    <strong style="color:var(--tone-violet-fg);">Fundus</strong> — the only place you see the CNS directly: papilloedema, chorioretinitis, retinal detachment.<br>
    <strong style="color:var(--tone-green-fg);">Liver + body size</strong> — small liver, poor growth, copper-coloured irises in a toy breed &lt;1yr → PSS.`,
      },

      { kind: 'step', text: '📖 CRANIAL NERVE EXAM — TECHNIQUE' },
      CN_EXAM_ACCORDION,
    ],
    after: [
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Seizures — Diagnostics',
    blocks: [
      { kind: 'step', text: '⚡ IMMEDIATE IN-HOUSE (acute / post-SE)' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>Blood glucose</strong><br>Point-of-care<br>&lt;3.5 mmol/L → dextrose IV<br>&lt;2.5 mmol/L → urgent<br>→ insulinoma? PSS? Addison's?`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>PCV / TS</strong><br>PCV &gt;60% → polycythaemia<br>PCV &lt;20% → cerebral hypoxia<br>TS ↑ → dehydration, protein`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>Temperature</strong><br>T° &gt;41°C → active cooling<br>(wet towels, fan, cold IV fluids)<br>Stop cooling at 39.5°C`,
          },
        ],
      },

      { kind: 'step', text: 'TIER 1 — MINIMUM DATABASE (all seizure patients)' },
      {
        kind: 'html',
        html: `<div class="dx-row c2">
    <div class="dx-test" style="font-size:9px;"><strong>Haematology</strong><br>CBC: PCV, leukogram, platelets<br>No stress leukogram → consider Addison's<br>Thrombocytopenia → tick-borne / IMTP<br>Polycythaemia → hyperviscosity</div>
    <div class="dx-test" style="font-size:9px;"><strong>Biochemistry</strong><br>Glucose · iCa · Na · K<br>BUN / Cr · ALT / ALP / GGT<br>Total protein · Albumin<br>Cholesterol · Total bilirubin</div>
  </div>
  <div style="height:5px;"></div>
  <div class="dx-row c3">
    <div class="dx-test" style="font-size:9px;"><strong>Urinalysis</strong><br>USG · Glucosuria?<br>Bilirubinuria?<br>Urine sediment · Culture if indicated</div>
    <div class="dx-test" style="font-size:9px;"><strong>Blood pressure</strong><br>Hypertensive encephalopathy<br>Retinal changes (haemorrhage, detachment)<br>→ check for underlying cause</div>
    <div class="dx-test" style="font-size:9px;"><strong>Bile acids + Ammonia</strong><br>Fasted + 2h post-prandial bile acids<br>→ hepatic encephalopathy, PSS<br>T4 in cats &gt;8yr (hypertension)</div>
  </div>`,
      },

      { kind: 'branch', text: 'TIER 1 ABNORMAL → REACTIVE' },
      {
        kind: 'gridTable',
        cols: '0.3fr 0.3fr 0.4fr',
        dividers: true,
        headers: ['Finding', { text: 'Diagnosis', tone: 'danger' }, { text: 'Next step', tone: 'teal' }],
        rows: [
          ['<strong>BG &lt;3.5 mmol/L</strong>', { text: 'Hypoglycaemia', tone: 'danger' }, { text: 'Dextrose now → fasted insulin:glucose (insulinoma) · PSS · Addison\'s · hepatic failure', tone: 'teal' }],
          ['<strong>↑ bile acids / ↑ ammonia</strong>', { text: 'Hepatic encephalopathy', tone: 'danger' }, { text: 'Abdominal US ± scintigraphy (PSS); liver biopsy if diffuse', tone: 'teal' }],
          ['<strong>iCa &lt;1.0 mmol/L</strong>', { text: 'Hypocalcaemia', tone: 'danger' }, { text: 'Ca gluconate IV with ECG · eclampsia? hypoparathyroidism? ethylene glycol?', tone: 'teal' }],
          ['<strong>Na &lt;120 or &gt;170 mmol/L</strong>', { text: 'Electrolyte encephalopathy', tone: 'danger' }, { text: "Na:K &lt;27 → Addison's · DI · SIADH — correct slowly", tone: 'teal' }],
          ['<strong>Marked ↑ BUN / creatinine</strong>', { text: 'Uraemic encephalopathy', tone: 'danger' }, { text: 'Fluids, phosphate binders, treat the renal cause', tone: 'teal' }],
          ['<strong>PCV &gt;60%</strong>', { text: 'Polycythaemia / hyperviscosity', tone: 'danger' }, { text: 'Phlebotomy · check SpO₂, EPO', tone: 'teal' }],
          ['<strong>Hypertension + retinal change</strong>', { text: 'Hypertensive encephalopathy', tone: 'danger' }, { text: 'Amlodipine · T4 in cats · investigate CKD', tone: 'teal' }],
          ['<strong>Toxin / drug history</strong>', { text: 'Intoxication', tone: 'danger' }, { text: 'Decontaminate if &lt;2 h · toxicology · specific antidote', tone: 'teal' }],
        ],
      },
      {
        kind: 'diseaseGrid',
        title: 'REACTIVE CAUSES — LINKED PAGES',
        links: [
          { label: 'Metabolic · toxic · drug list', link: { to: 'flow', id: 'seizures-reactive' } },
          { label: 'SE emergency protocol', link: { to: 'protocol', id: 'PROT-SEIZ' } },
        ],
      },

      { kind: 'branch', text: 'TIER 1 NORMAL → DO YOU IMAGE?' },
      {
        kind: 'callout',
        tone: 'info',
        title: '🧲 IMAGE THE BRAIN IF ANY ONE OF THESE',
        html: `• First seizure <strong>&lt;6 months or &gt;6 years</strong><br>
    • <strong>Abnormal interictal neuro exam</strong> — persistent or progressive deficit<br>
    • <strong>Focal onset</strong> or focal signs<br>
    • <strong>Cluster seizures or status epilepticus</strong><br>
    • Progressive course or increasing frequency<br>
    • Refractory to a first AED at therapeutic level<br><br>
    None of these, 6mo–6yr, normal exam and normal bloods → idiopathic epilepsy is reasonable without MRI, but re-examine at every recheck.`,
      },

      { kind: 'step', text: 'TIER 2 — MRI + CSF' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>MRI brain</strong> (1.5T or 3T)<br>FLAIR · T1 · T2 · T1+contrast<br>Gold standard for structural lesions<br>Mass? Infarct? Inflammation?<br>Periventricular → hydrocephalus`,
          },
          {
            style: 'font-size:9px;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);',
            html: `<strong>CSF analysis</strong><br>Collect under GA <strong>after</strong> MRI<br>TNCC (normal &lt;5 cells/μL)<br>Protein (normal &lt;0.25 g/L)<br>Cytology + culture if indicated<br><em>Do not tap if raised ICP</em>`,
          },
        ],
      },
      { kind: 'branch', text: 'MRI / CSF RESULTS' },
      {
        kind: 'gridTable',
        cols: '0.34fr 0.3fr 0.36fr',
        dividers: true,
        headers: ['Result', { text: 'Diagnosis', tone: 'danger' }, { text: 'Next step', tone: 'teal' }],
        rows: [
          ['<strong>Extra-axial, contrast-enhancing mass</strong>', { text: 'Meningioma', tone: 'danger' }, { text: 'Older cats · dolichocephalic dogs — surgical candidate', tone: 'teal' }],
          ['<strong>Intra-axial mass + peri-lesional oedema</strong>', { text: 'Glioma', tone: 'danger' }, { text: 'Brachycephalics · older dogs — RT / palliation', tone: 'teal' }],
          ['<strong>↑ TNCC + ↑ protein</strong>', { text: 'MUO or infectious encephalitis', tone: 'danger' }, { text: 'Serology / PCR: Toxo, Neospora, CDV, Crypto, FIP, Ehrlichia', tone: 'teal' }],
          ['<strong>Vascular-territory lesion, peracute</strong>', { text: 'CVA (stroke)', tone: 'danger' }, { text: 'Hunt the cause: BP, T4 (cats), cardiac, coagulation', tone: 'teal' }],
          ['<strong>Multifocal T2 lesions, eosinophilic CSF</strong>', { text: 'Eosinophilic meningoencephalitis', tone: 'danger' }, { text: 'Parasitic / fungal / idiopathic', tone: 'teal' }],
          ['<strong>MRI and CSF both normal</strong>', { text: '<strong>Idiopathic epilepsy</strong>', tone: 'danger' }, { text: 'Diagnosis of exclusion — 6 mo–6 yr onset + normal bloods + normal interictal exam', tone: 'teal' }],
        ],
      },
      {
        kind: 'note',
        html: `<strong>Genetic testing where available:</strong> DIRAS1 (Border Collie, Bernese Mountain Dog) · LGI2 (Lagotto Romagnolo) · ADAM23 (Irish Setter) · EPM2B (Miniature Wirehaired Dachshund).`,
      },
    ],
    after: [
      {
        kind: 'diseaseGrid',
        title: 'TREATMENT LIVES IN THE PROTOCOL',
        links: [
          { label: 'SE + maintenance AED dosing', link: { to: 'protocol', id: 'PROT-SEIZ' } },
          { label: 'Reactive causes', link: { to: 'flow', id: 'seizures-reactive' } },
        ],
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ Start a maintenance AED if ANY:</strong> cluster (≥2/24h) · SE has occurred · &gt;1 seizure/6 months · increasing frequency or severity · prolonged postictal · structural disease confirmed. Dosing and monitoring → PROT-SEIZ.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
