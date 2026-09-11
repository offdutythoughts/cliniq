// ── Weakness — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxWeakness{History,Exam,Dx} (legacy inline render() HTML in
// ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const weaknessDx: DxApproach = {
  title: 'Weakness',
  tabs: {

  history: {
    title: 'History: Weakness',
    blocks: [
      { kind: 'branch', text: 'EPISODIC vs PERSISTENT? COLLAPSE vs WEAKNESS?' },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Course', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Episodic + rapid full recovery</strong>', { text: 'Syncope · arrhythmia · myasthenia gravis (fatigable) · episodic hypoglycaemia · narcolepsy', tone: 'teal' }],
          ['<strong>Persistent / progressive</strong>', { text: 'Neuromuscular disease · metabolic · anaemia · cardiorespiratory', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `<strong>The single most useful history question:</strong> is it episodic (normal between events) or persistent / progressive?` },
      {
        kind: 'gridTable',
        cols: '0.28fr 0.3fr 0.42fr',
        dividers: true,
        headers: ['Pattern', 'Key history features', { text: 'Differential & next step', tone: 'teal' }],
        rows: [
          ['<strong>Episodic + rapid full recovery</strong>', 'Exercise/excitement trigger; normal between', { text: '<strong>Syncope (arrhythmia) · MG · hypoglycaemia</strong>', tone: 'teal' }],
          ['<strong>Episodic + post-exercise stiffness</strong>', 'Fit dog, hot conditions', { text: '<strong>EIC · heat stroke</strong>', tone: 'teal' }],
          ['<strong>Peracute generalised flaccid paralysis</strong>', 'Tick exposure; raw meat access; ascending LMN', { text: '<strong>Tick paralysis · Botulism · Polyradiculoneuritis</strong>', tone: 'teal' }],
          ['<strong>Progressive + exercise-worsening</strong>', 'Worsens over weeks; 🐱 ventroflexion', { text: '<strong>Myasthenia gravis · Hypothyroid neuropathy</strong>', tone: 'teal' }],
          ['<strong>Chronic progressive + waxing/waning GI</strong>', 'GI signs, stress episodes', { text: '<strong>Hypoadrenocorticism (Addison\'s)</strong>', tone: 'teal' }],
          ['<strong>Acute + systemic signs</strong>', 'PU/PD, polyphagia, or weight loss', { text: '<strong>Metabolic (DM, HAC, hypokalaemia)</strong>', tone: 'teal' }],
        ],
      },

      ...stepTable(1, 'CHARACTERISE THE EPISODE', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Feature', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Trigger — exercise / excitement</strong>', { text: 'Syncope or MG', tone: 'teal' }],
          ['<strong>Trigger — fasting</strong>', { text: 'Hypoglycaemia', tone: 'teal' }],
          ['<strong>Post-exercise collapse in a fit dog</strong>', { text: 'EIC · cardiac', tone: 'teal' }],
          ['<strong>Worse with exercise, better with rest</strong>', { text: 'Myasthenia gravis (fatigability) · cardiorespiratory', tone: 'teal' }],
          ['<strong>Loss of consciousness?</strong>', { text: 'True LOC favours syncope / seizure over neuromuscular weakness', tone: 'teal' }],
          ['<strong>Peracute generalised LMN paralysis</strong>', { text: 'Tick paralysis · botulism · polyradiculoneuritis (coonhound)', tone: 'teal' }],
        ],
      }, '📋'),

      ...stepTable(2, 'SYSTEMIC / DRUG / SIGNALMENT CLUES', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Ventroflexion of the neck</strong>', { text: 'Hypokalaemia · thiamine deficiency · MG', tone: 'teal' }],
          ['<strong>🐕 Waxing/waning GI signs + weakness</strong>', { text: 'Hypoadrenocorticism (Addison\'s)', tone: 'teal' }],
          ['<strong>PU/PD + weakness</strong>', { text: 'Endocrine (DM · HAC · hypoadrenocorticism) · electrolyte disturbance', tone: 'teal' }],
          ['<strong>Tick exposure / raw-meat or carrion access</strong>', { text: 'Tick paralysis · botulism', tone: 'teal' }],
          ['<strong>Drugs</strong>', { text: 'Recent anaesthesia / aminoglycosides (unmask MG) · beta-blockers · insulin overdose', tone: 'teal' }],
        ],
      }, '💊'),

      { kind: 'step', text: '🐾 STEP 3 — SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Collie', 'Shetland Sheepdog', 'Australian Shepherd', 'Border Collie', 'Long-haired Whippet'], tone: 'warning', html: 'MDR1 / ABCB1 — ivermectin and other P-gp substrates → profound ataxia / weakness at standard doses.' },
          { breeds: ['Labrador'], tone: 'danger', html: 'exercise-induced collapse (EIC), DYNAMIN1 (DNM1) mutation — episodic hindlimb collapse after intense exercise; DNA test available.' },
          { breeds: ['Border Collie'], tone: 'info', html: 'Border Collie EIC — distinct from the Labrador form; avoid high-intensity exercise and hot conditions. Mechanism involves an SLC6A5 variant.' },
          { breeds: ['German Shepherd', 'Boxer'], tone: 'violet', html: 'young dog with progressive LMN paralysis → hereditary motor / sensory neuropathy (HMSN) / inherited polyneuropathy.' },
          { breeds: ['Intact female'], group: 'signalment', tone: 'green', html: 'always consider pyometra (sepsis → weakness), hyperadrenocorticism (PDH) and hormonal fluctuation as systemic causes before pursuing a neuromuscular workup.' },
        ],
        cat: [
          { breeds: ['Cervical ventroflexion'], group: 'signalment', tone: 'warning', html: 'hypokalaemia — common in CKD and hyperaldosteronism (Conn\'s syndrome); ventroflexion is the hallmark sign. Ask whether the neck droops or touches the sternum.' },
          { breeds: ['Intact female'], group: 'signalment', tone: 'green', html: 'pyometra (sepsis → weakness) and hormonal causes before a neuromuscular workup.' },
        ],
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Always get an ECG before starting anti-epileptics in a collapsing animal — antiepileptics can worsen syncope, and a missed arrhythmia is fatal.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Weakness',
    blocks: [
      ...stepTable(1, 'IS THE PATIENT STABLE?', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Perfusion</strong> — HR · pulse quality · CRT · MM colour; respiratory effort; mentation', { text: 'Collapse can be a shock / anaemia / arrhythmia emergency, not a neurological problem', tone: 'danger' }],
          ['<strong>Respiratory effort and tidal volume</strong>', { text: 'Intercostal weakness or diaphragm involvement → hypoventilation in tick paralysis, botulism and polyradiculoneuritis — may need oxygen supplementation or ventilatory support', tone: 'danger' }],
          ['<strong>Rate of progression</strong>', { text: 'Ascending paralysis developing overnight = <strong>emergency</strong> — full coat tick search immediately, before any further workup', tone: 'danger' }],
        ],
      }, '🩺'),

      ...stepTable(2, 'SYSTEMIC EXAM BEFORE NEUROLOGY', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['System', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Cardiovascular</strong>', { text: 'Murmur · arrhythmia · pulse deficits · jugular distension · pale or cyanotic MM', tone: 'teal' }],
          ['<strong>Respiratory</strong>', { text: 'Increased effort · cyanosis → hypoxaemia', tone: 'teal' }],
          ['<strong>Metabolic clues</strong>', { text: 'Dehydration · bradycardia (hyperkalaemia of Addison\'s) · hepatomegaly', tone: 'teal' }],
          ['<strong>Anaemia</strong>', { text: 'Pale MM → weakness from poor oxygen delivery', tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Hypotension → hypoadrenocorticism or poor cardiac output · hypertension → HAC · CKD · phaeochromocytoma', tone: 'teal' }],
          ['<strong>Abdominal palpation</strong>', { text: 'Splenomegaly (neoplasia · EMH) · hepatomegaly (HAC · hepatic disease) · uterine distension (pyometra in intact females)', tone: 'teal' }],
          ['<strong>Lymphadenopathy</strong>', { text: 'Generalised → neoplasia or tick-borne disease', tone: 'teal' }],
          ['<strong>Full tick search</strong>', { text: 'Systematically part all coat — between toes · inside ear canals · axillae · groin · perianal region. <strong>A single attached tick can cause complete paralysis</strong>', tone: 'danger' }],
        ],
      }, '🔍'),

      ...stepTable(3, 'NEUROMUSCULAR LOCALISATION', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Key test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Weakness WITHOUT ataxia / proprioceptive deficits</strong>', { text: '<strong>Neuromuscular</strong>', tone: 'teal' }],
          ['<strong>Weakness WITH ataxia</strong>', { text: '<strong>Spinal cord</strong>', tone: 'teal' }],
          ['<strong>Technique</strong>', { text: 'Support body weight to test proprioception — often intact despite marked paresis', tone: 'teal' }],
        ],
      }, '🧠'),
      {
        kind: 'gridTable',
        label: 'Which part of the motor unit?',
        cols: '0.6fr 0.7fr 0.7fr',
        dividers: true,
        headers: [{ text: 'Neuropathy', tone: 'teal' }, { text: 'Junctionopathy', tone: 'teal' }, { text: 'Myopathy', tone: 'teal' }],
        rows: [
          ['↓ / absent reflexes', 'Normal reflexes', 'Normal reflexes'],
          ['Atrophy', 'Fatigability', 'Myalgia'],
          ['± Ataxia (sensory)', 'Normal at rest', 'Ventroflexion (🐱)'],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Bedside manoeuvres',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Fatigability test</strong>', { text: 'Walk / exercise the patient — myasthenia gravis worsens dramatically and recovers with brief rest. The patellar reflex fatigues with rapid repetition', tone: 'teal' }],
          ['<strong>Spinal pain check</strong>', { text: 'Palpate the vertebral column — pain or guarding → myelopathy (see the Myelopathy approach). Proprioception absent with weakness = spinal cord origin, not peripheral neuromuscular', tone: 'teal' }],
        ],
      },

      ...stepTable(4, 'SPECIES-SPECIFIC EXAM TIPS', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Cervical ventroflexion</strong>', { text: 'Check if the neck droops and whether the chin approaches the sternum (severe)', tone: 'teal' }],
          ['<strong>🐱 Generalised muscle pain on palpation + elevated CK</strong>', { text: 'Polymyositis', tone: 'teal' }],
          ['<strong>🐱 Plantigrade stance</strong> (hocks touching ground)', { text: 'Diabetic neuropathy — assess blood glucose', tone: 'teal' }],
          ['<strong>🐱 Ventral neck palpation</strong>', { text: 'Thyroid nodule — hyperthyroid myopathy can cause generalised weakness and muscle wasting', tone: 'teal' }],
          ['<strong>🐕 Masticatory muscles</strong>', { text: 'Temporal and masseter atrophy → masticatory muscle myositis (MMM); anti-2M antibody titre; affected dogs may be unable to open the mouth fully under sedation', tone: 'teal' }],
          ['<strong>🐕 Eyes</strong>', { text: 'Horner syndrome — oculo-sympathetic lesion → carotid plexus · anterior thorax mass · cervical cord', tone: 'teal' }],
          ['<strong>🐕 Full tick search</strong>', { text: 'Every square centimetre of coat including between toes, inside the pinnae canal, perianal and axillae — remove the tick with a rocking motion (not twisting / crushing)', tone: 'teal' }],
        ],
      }, '🐾'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Weakness — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'EXCLUDE NON-NEUROLOGICAL CAUSES BEFORE NEUROMUSCULAR WORKUP' },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Screen', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Cardiovascular first</strong>', { text: 'ECG before any other workup in episodic collapse — arrhythmia (AV block · sick sinus syndrome · WPW) is frequently misdiagnosed as seizure or neuromuscular weakness, and treating with anti-epileptics is dangerous', tone: 'danger' }],
          ['<strong>Metabolic screen</strong>', { text: 'Blood glucose · electrolytes (especially potassium) · cortisol — all cause weakness without any neurological deficit', tone: 'teal' }],
          ['<strong>Respiratory</strong>', { text: 'SpO₂ and respiratory effort — hypoxaemia from any cause produces generalised weakness', tone: 'teal' }],
          ['<strong>Anaemia</strong>', { text: 'PCV/TS — cerebral and muscle hypoxia from anaemia presents as generalised weakness or collapse', tone: 'teal' }],
        ],
      },
      { kind: 'step', tone: 'warning', text: 'IF COLLAPSE ± LOC — CARDIOGENIC vs NON-CARDIOGENIC SYNCOPE?' },
      {
        kind: 'gridTable',
        cols: '0.25fr 0.37fr 0.38fr',
        dividers: true,
        headers: ['Feature', { text: '⚡ Cardiogenic', tone: 'danger' }, { text: '🔄 Non-cardiogenic', tone: 'info' }],
        rows: [
          ['<strong>Trigger</strong>', { text: 'Exertion / excitement; ± no trigger', tone: 'danger' }, { text: 'Clear reflex trigger (cough, micturition, swallowing, pain) or fasting', tone: 'info' }],
          ['<strong>Cardiac exam</strong>', { text: 'Murmur, gallop, arrhythmia, pulse deficits, jugular distension', tone: 'danger' }, { text: 'Structurally normal heart on PE; normal rhythm in-clinic', tone: 'info' }],
          ['<strong>History clues</strong>', { text: 'Prior heart disease; sudden death in breed (Boxer ARVC, Dobermann DCM)', tone: 'danger' }, { text: 'GI signs or fasting (Addison / hypoglycaemia); young Boxer excitement syncope (vasovagal)', tone: 'info' }],
          ['<strong>Key tests</strong>', { text: 'ECG → Holter / event recorder → echo; NT-proBNP', tone: 'danger' }, { text: 'Blood glucose · Na:K ratio · ACTH stim; rule out airway disease (tussive syncope)', tone: 'info' }],
          ['<strong>Urgent risk</strong>', { text: 'Sudden cardiac death — treat as cardiac until proven otherwise if exertional + murmur', tone: 'danger' }, { text: 'Addisonian crisis · hypoglycaemia — both rapidly reversible if caught early', tone: 'info' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'info',
        title: 'Cardiogenic syncope workup',
        html: `If the comparison table points cardiogenic, follow the full <strong>Syncope</strong> diagnostic approach (linked below) — it covers ECG interpretation, ambulatory monitoring strategy (Holter vs event recorder vs ILR), echocardiography, and biomarkers in detail. A normal resting ECG does <em>not</em> exclude an intermittent arrhythmia.`,
      },

      ...stepTable(1, 'MINIMUM DATABASE — URGENT IN-CLINIC', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Blood glucose</strong>`, { text: 'Hypoglycaemia → insulinoma · PSS · Addison\'s · hepatic failure — all cause episodic or progressive weakness', tone: 'teal' }],
          [`${numBadge(2)}<strong>PCV / TS</strong>`, { text: 'Anaemia → cerebral and muscle hypoxia; a TS drop suggests protein-losing disease or haemorrhage', tone: 'teal' }],
          [`${numBadge(3)}<strong>ECG</strong>`, { text: 'Arrhythmia — AV block · sick sinus syndrome · WPW → episodic collapse and weakness. <strong>Must be excluded before any neurological diagnosis is assigned</strong>', tone: 'danger' }],
          [`${numBadge(4)}<strong>Blood pressure</strong>`, { text: 'Hypotension = hypoadrenocorticism or poor cardiac output · hypertension = HAC · CKD · phaeochromocytoma', tone: 'teal' }],
          [`${numBadge(5)}<strong>Potassium</strong>`, { text: 'Hypokalaemia → 🐱 cervical ventroflexion and paralysis (CKD · hyperaldosteronism · loop diuretics); also seen in dogs with vomiting / diarrhoea', tone: 'teal' }],
        ],
      }, '⚡'),

      ...stepTable(2, 'TIER 1 LABORATORY — CBC + BIOCHEMISTRY + UA', {
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>CBC</strong>', { text: 'Anaemia type (regenerative vs non-regenerative) · eosinophilia (eosinophilic myositis or parasitic) · absent stress leukogram in a systemically sick dog → <strong>atypical Addison\'s</strong> (electrolyte-normal hypoadrenocorticism)', tone: 'teal' }],
          ['<strong>Biochemistry</strong>', { text: 'Na:K ratio &lt;27 → classical hypoadrenocorticism · CK elevated → myopathy (polymyositis · hypokalaemic myopathy · dystrophy — CK may exceed 10,000 IU/L) · ALP and cholesterol elevated with normal T4 → hypothyroid neuropathy (🐕) · T4 in all 🐱 &gt;7 years · fasted bile acids (hepatic encephalopathy)', tone: 'teal' }],
          ['<strong>Urinalysis</strong>', { text: 'Glucosuria (DM) · specific gravity (hypoadrenocorticism → inability to concentrate urine; isosthenuria)', tone: 'teal' }],
        ],
      }, '🧪'),

      ...stepTable(3, 'NEUROMUSCULAR-SPECIFIC TESTS', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>AChR antibody titre (serum)</strong>', { text: '&gt;0.6 nmol/L diagnostic for acquired MG. Focal MG (oesophageal or facial) may have a low or borderline serum titre — <strong>do not exclude on titre alone</strong>', tone: 'teal' }],
          ['<strong>Anti-titin antibody</strong>', { text: 'Thymoma-associated MG — order if MG confirmed, especially in older cats', tone: 'teal' }],
          ['<strong>CK</strong> (repeat at 24 h if normal initially)', { text: 'Myonecrosis peaks hours after an episode — a single normal CK does not exclude myopathy', tone: 'teal' }],
          ['<strong>Toxoplasma / Neospora IgG-IgM titres</strong> (or PCR on CSF)', { text: 'Young dog with rigid hindlimb hyperextension → <em>Neospora caninum</em> polyradiculoneuritis', tone: 'teal' }],
          ['<strong>Brucella serology</strong> (intact dog)', { text: 'Discospondylitis → paraspinal muscle weakness and spinal pain', tone: 'teal' }],
          ['<strong>ACTH stimulation test</strong>', { text: 'Basal cortisol &lt;55 nmol/L → perform stimulation test to confirm Addison\'s', tone: 'teal' }],
        ],
      }, '🔬'),

      ...stepTable(4, 'ELECTROPHYSIOLOGY — EMG + NERVE CONDUCTION (REFERRAL)', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Finding → diagnosis', tone: 'teal' }],
        rows: [
          ['<strong>EMG</strong>', { text: 'Fibrillation potentials and positive sharp waves → denervation (neuropathy) · myotonic discharges → myotonia congenita · complex repetitive discharges → inflammatory myopathy or hypothyroid neuropathy', tone: 'teal' }],
          ['<strong>Motor nerve conduction velocity</strong>', { text: 'Reduced velocity → demyelinating neuropathy (hypothyroid · inherited HMSN)', tone: 'teal' }],
          ['<strong>Repetitive nerve stimulation</strong>', { text: '&gt;10% decremental response → NMJ disease (botulism / tick = presynaptic defect; MG = postsynaptic defect)', tone: 'teal' }],
        ],
      }, '⚡'),
      { kind: 'note', html: `Under general anaesthesia at a referral centre.` },

      ...stepTable(5, 'MUSCLE / NERVE BIOPSY + ADVANCED IMAGING', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Finding → diagnosis', tone: 'teal' }],
        rows: [
          ['<strong>Muscle biopsy</strong><br>biceps femoris or epaxial — avoid severely atrophied muscle', { text: 'Inflammatory infiltrate and fibre necrosis → polymyositis · type II fibre atrophy → glucocorticoid myopathy, disuse or HAC · dystrophin immunostaining → muscular dystrophy', tone: 'teal' }],
          ['<strong>MRI spine</strong>', { text: 'If proprioceptive deficits or spinal pain coexist — use the Myelopathy approach for full localisation and imaging pathway', tone: 'teal' }],
          ['<strong>MRI thigh muscles</strong>', { text: 'Focal T2 hyperintensity in inflammatory myopathy · necrotic myositis · masticatory muscle myositis (masseter and temporalis)', tone: 'teal' }],
        ],
      }, '🧬'),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: 'EMERGENCIES — DO NOT MISS',
        gap: 10,
        html: `<strong>Ascending LMN paralysis overnight →</strong> full coat tick search immediately (remove tick → most patients recover within 24–72 h). · <strong>Botulism</strong> (ventral recumbency, areflexia, no tick found, raw meat or carrion history) → supportive care only; recovery takes weeks.<br>
      <strong>Myasthenic crisis:</strong> acute respiratory failure combined with regurgitation (megaoesophagus aspiration) → ICU + pyridostigmine ± plasma exchange; aspiration pneumonia is the most common cause of death.<br>
      <strong>Addisonian crisis:</strong> bradycardia, hypotension, and hyperkalaemia → IV 0.9% NaCl bolus + dexamethasone sodium phosphate immediately; do not delay for ACTH stimulation results in a crashing patient.<br>
      <strong>ECG before ANY anti-epileptic treatment in episodic collapse</strong> — an arrhythmia treated with AEDs is dangerous and potentially fatal.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>CK</strong> is the single best screening test for primary muscle disease — if normal, myopathy is unlikely. <strong>AChR titre</strong> is the definitive test for MG — do not diagnose MG on clinical grounds alone. <strong>ECG first</strong> in every episodic collapsing animal — a missed arrhythmia treated as epilepsy worsens outcome. <strong>Tick search</strong> requires parting all coat — remove tick with a rocking motion (not twisting). <strong>Tensilon (edrophonium) test:</strong> 0.1–0.2 mg/kg IV slowly — have atropine 0.02–0.04 mg/kg drawn up and ready; transient improvement confirms MG.`,
      },
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
          { label: 'Seizures — diagnostic approach', link: { to: 'dx', id: 'seizures' } },
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
