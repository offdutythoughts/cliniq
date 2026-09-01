// ── Weakness — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxWeakness{History,Exam,Dx} (legacy inline render() HTML in
// ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepPair } from './shared/dxHelpers'

export const weaknessDx: DxApproach = {
  title: 'Weakness',
  tabs: {

  history: {
    title: 'History: Weakness',
    blocks: [
      { kind: 'branch', text: 'EPISODIC vs PERSISTENT? COLLAPSE vs WEAKNESS?' },
      {
        kind: 'check',
        html: `<strong>The single most useful history question:</strong> is it episodic (normal between events) or persistent/progressive?<br>
      <strong>Episodic + rapid full recovery</strong> → syncope, arrhythmia, myasthenia gravis (fatigable), episodic hypoglycaemia, narcolepsy.<br>
      <strong>Persistent / progressive</strong> → neuromuscular disease, metabolic, anaemia, cardiorespiratory.`,
      },
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
      { kind: 'step', text: '📋 CHARACTERISE THE EPISODE' },
      {
        kind: 'check',
        html: `<strong>Trigger:</strong> exercise/excitement → syncope or MG; fasting → hypoglycaemia; post-exercise collapse in a fit dog → EIC, cardiac.<br>
      <strong>Worse with exercise, better with rest</strong> → myasthenia gravis (fatigability) or cardiorespiratory.<br>
      <strong>Loss of consciousness?</strong> true LOC favours syncope/seizure over neuromuscular weakness.<br>
      <strong>Onset:</strong> peracute generalised LMN paralysis → tick paralysis, botulism, polyradiculoneuritis (coonhound).`,
      },
      { kind: 'step', text: '💊 SYSTEMIC / DRUG / SIGNALMENT CLUES' },
      {
        kind: 'check',
        html: `<strong>Cat with ventroflexion of the neck</strong> → hypokalaemia, thiamine deficiency, or MG.<br>
      <strong>Waxing/waning GI signs + weakness (dog)</strong> → hypoadrenocorticism (Addison's).<br>
      <strong>PU/PD + weakness</strong> → endocrine (DM, HAC, hypoadrenocorticism), electrolyte disturbance.<br>
      <strong>Tick exposure / raw-meat or carrion access</strong> → tick paralysis / botulism.<br>
      <strong>Drugs:</strong> recent anaesthesia/aminoglycosides (unmask MG), beta-blockers, insulin overdose.`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'check',
        html: `<strong>🐱 Cats — hypokalaemia:</strong> common in CKD and hyperaldosteronism (Conn's syndrome); cervical ventroflexion is the hallmark sign — ask if neck droops or touches sternum.<br>
      <strong>MDR1/ABCB1 breeds</strong> (Collie, Shetland Sheepdog, Australian Shepherd, Border Collie, Long-haired Whippet): ivermectin and other P-gp substrates → profound ataxia/weakness at standard doses.<br>
      <strong>Labrador Retriever:</strong> exercise-induced collapse (EIC) due to DYNAMIN1 (DNM1) mutation — episodic hindlimb collapse after intense exercise; DNA test available.<br>
      <strong>Young German Shepherd / Boxer with progressive LMN paralysis</strong> → hereditary motor/sensory neuropathy (HMSN) / inherited polyneuropathy.<br>
      <strong>🐕 Border Collie EIC:</strong> distinct from Lab EIC; avoid high-intensity exercise and hot conditions — mechanism involves SLC6A5 variant.<br>
      <strong>Intact females — always consider:</strong> pyometra (sepsis → weakness), hyperadrenocorticism (PDH), and hormonal fluctuations as systemic causes before pursuing neuromuscular workup.`,
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
      { kind: 'step', text: 'STEP 1 — IS THE PATIENT STABLE?' },
      {
        kind: 'check',
        html: `Assess perfusion (HR, pulse quality, CRT, MM colour), respiratory effort, and mentation first. Collapse can be a shock/anaemia/arrhythmia emergency, not a neurological problem.<br>
      <strong>Assess respiratory effort and tidal volume:</strong> intercostal weakness or diaphragm involvement → hypoventilation in tick paralysis, botulism, and polyradiculoneuritis — these patients may need oxygen supplementation or ventilatory support.<br>
      <strong>Rate of progression is critical:</strong> ascending paralysis developing overnight = emergency — perform full coat tick search immediately before any further workup.`,
      },
      { kind: 'step', text: 'STEP 2 — SYSTEMIC EXAM BEFORE NEUROLOGY' },
      {
        kind: 'check',
        html: `<strong>Cardiovascular:</strong> murmur, arrhythmia, pulse deficits, jugular distension, pale/cyanotic MM.<br>
      <strong>Respiratory:</strong> increased effort, cyanosis → hypoxaemia.<br>
      <strong>Metabolic clues:</strong> dehydration, bradycardia (hyperkalaemia of Addison's), hepatomegaly.<br>
      <strong>Anaemia:</strong> pale MM → weakness from poor oxygen delivery.<br>
      <strong>Blood pressure measurement:</strong> hypotension → hypoadrenocorticism or poor cardiac output; hypertension → HAC, CKD, or phaeochromocytoma.<br>
      <strong>Abdominal palpation:</strong> splenomegaly (neoplasia, EMH), hepatomegaly (HAC, hepatic disease), uterine distension (pyometra in intact females).<br>
      <strong>Lymphadenopathy:</strong> generalised lymphadenopathy → neoplasia or tick-borne disease.<br>
      <strong>Full tick search:</strong> systematically part all coat — between toes, inside ear canals, axillae, groin, and perianal region. A single attached tick can cause complete paralysis.`,
      },
      { kind: 'step', text: 'STEP 3 — NEUROMUSCULAR LOCALISATION' },
      {
        kind: 'check',
        html: `<strong>Key test:</strong> Weakness <strong>WITHOUT</strong> ataxia / proprioceptive deficits = neuromuscular. Weakness <strong>WITH</strong> ataxia = spinal cord. Support body weight to test proprioception (often intact despite marked paresis).`,
      },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Neuropathy</strong><br>↓/absent reflexes<br>Atrophy<br>± Ataxia (sensory)`,
          },
          {
            style: 'text-align:center;font-size:9px;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);',
            html: `<strong>Junctionopathy</strong><br>Normal reflexes<br>Fatigability<br>Normal at rest`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Myopathy</strong><br>Normal reflexes<br>Myalgia<br>Ventroflexion (cat)`,
          },
        ],
      },
      {
        kind: 'check',
        html: `<strong>Fatigability test:</strong> walk/exercise the patient — myasthenia gravis worsens dramatically and recovers with brief rest. Patellar reflex fatigues with rapid repetition.<br>
      <strong>SPINAL PAIN CHECK:</strong> palpate vertebral column — pain or guarding → myelopathy (see Myelopathy approach). Proprioception absent with weakness = spinal cord origin, not peripheral neuromuscular.`,
      },
      { kind: 'step', text: 'STEP 4 — SPECIES-SPECIFIC EXAM TIPS' },
      {
        kind: 'check',
        html: `<strong>🐱 CATS — cervical ventroflexion:</strong> check if neck droops and whether chin approaches sternum (severe). Generalised muscle pain on palpation + elevated CK = polymyositis. Plantigrade stance (hocks touching ground) = diabetic neuropathy — assess blood glucose. Palpate ventral neck for thyroid nodule (hyperthyroid myopathy can cause generalised weakness and muscle wasting).<br>
      <strong>🐕 DOGS — masticatory muscles:</strong> temporal and masseter atrophy → masticatory muscle myositis (MMM); anti-2M antibody titre; affected dogs may be unable to open mouth fully under sedation. Check eyes for Horner syndrome (oculo-sympathetic lesion → carotid plexus, anterior thorax mass, or cervical cord). Full tick search: every square centimetre of coat including between toes, inside pinnae canal, perianal, and axillae — remove tick with rocking motion (not twisting/crushing).`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Weakness — Diagnostics',
    blocks: [
      { kind: 'branch', text: 'EXCLUDE NON-NEUROLOGICAL CAUSES BEFORE NEUROMUSCULAR WORKUP' },
      {
        kind: 'check',
        html: `<strong>Cardiovascular first:</strong> ECG before any other workup in episodic collapse — arrhythmia (AV block, sick sinus syndrome, WPW) is frequently misdiagnosed as seizure or neuromuscular weakness, and treating with anti-epileptics is dangerous.<br>
      <strong>Metabolic screen:</strong> blood glucose, electrolytes (especially potassium), and cortisol — all cause weakness without any neurological deficit.<br>
      <strong>Respiratory:</strong> SpO₂ and respiratory effort — hypoxaemia from any cause produces generalised weakness.<br>
      <strong>Anaemia:</strong> PCV/TS — cerebral and muscle hypoxia from anaemia presents as generalised weakness or collapse.`,
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
      ...stepPair(1, 'MINIMUM DATABASE — URGENT IN-CLINIC', `<strong>Blood glucose:</strong> hypoglycaemia → insulinoma, PSS, Addison's, hepatic failure — all cause episodic or progressive weakness.<br>
      <strong>PCV/TS:</strong> anaemia → cerebral and muscle hypoxia; TS drop suggests protein-losing disease or haemorrhage.<br>
      <strong>ECG:</strong> arrhythmia — AV block, sick sinus syndrome, WPW → episodic collapse and weakness; must be excluded before any neurological diagnosis is assigned.<br>
      <strong>Blood pressure:</strong> hypotension = hypoadrenocorticism or poor cardiac output; hypertension = HAC, CKD, or phaeochromocytoma.<br>
      <strong>Potassium:</strong> hypokalaemia → 🐱 cervical ventroflexion and paralysis (CKD, hyperaldosteronism, loop diuretics); also seen in dogs with vomiting/diarrhoea.`),
      ...stepPair(2, 'TIER 1 LABORATORY — CBC + BIOCHEMISTRY + UA', `<strong>CBC:</strong> anaemia type (regenerative vs non-regenerative); eosinophilia (eosinophilic myositis or parasitic); absent stress leukogram in a systemically sick dog → atypical Addison's (electrolyte-normal hypoadrenocorticism).<br>
      <strong>Biochemistry:</strong> Na:K ratio &lt;27 → classical hypoadrenocorticism; CK elevated → myopathy (polymyositis, hypokalaemic myopathy, dystrophy — CK may exceed 10,000 IU/L); ALP and cholesterol elevated with normal T4 → hypothyroid neuropathy (🐕); T4 in all 🐱 &gt;7 years; fasted bile acids (hepatic encephalopathy).<br>
      <strong>UA:</strong> glucosuria (DM); specific gravity (hypoadrenocorticism → inability to concentrate urine; isosthenuria).`),
      ...stepPair(3, 'NEUROMUSCULAR-SPECIFIC TESTS', `<strong>AChR antibody titre (serum):</strong> &gt;0.6 nmol/L diagnostic for acquired MG; focal MG (oesophageal or facial) may have low or borderline serum titre — do not exclude on titre alone.<br>
      <strong>Anti-titin antibody:</strong> thymoma-associated MG — order if MG confirmed, especially in older cats.<br>
      <strong>CK (repeat at 24 h if normal initially):</strong> myonecrosis peaks hours after an episode; a single normal CK does not exclude myopathy.<br>
      <strong>Toxoplasma / Neospora IgG/IgM titres (or PCR on CSF):</strong> young dog with rigid hindlimb hyperextension → Neospora caninum polyradiculoneuritis.<br>
      <strong>Brucella serology (intact dog):</strong> discospondylitis → paraspinal muscle weakness and spinal pain.<br>
      <strong>ACTH stimulation test:</strong> basal cortisol &lt;55 nmol/L → perform stimulation test to confirm Addison's.`),
      ...stepPair(4, 'ELECTROPHYSIOLOGY — EMG + NERVE CONDUCTION (REFERRAL)', `Under general anaesthesia at referral centre.<br>
      <strong>EMG:</strong> fibrillation potentials and positive sharp waves → denervation (neuropathy); myotonic discharges → myotonia congenita; complex repetitive discharges → inflammatory myopathy or hypothyroid neuropathy.<br>
      <strong>Motor nerve conduction velocity:</strong> reduced velocity → demyelinating neuropathy (hypothyroid, inherited HMSN).<br>
      <strong>Repetitive nerve stimulation:</strong> &gt;10% decremental response → NMJ disease (botulism/tick = presynaptic defect; MG = postsynaptic defect).`),
      ...stepPair(5, 'MUSCLE / NERVE BIOPSY + ADVANCED IMAGING', `<strong>Muscle biopsy</strong> (biceps femoris or epaxial — avoid severely atrophied muscle): inflammatory infiltrate and fibre necrosis → polymyositis; type II fibre atrophy → glucocorticoid myopathy, disuse, or HAC; dystrophin immunostaining → muscular dystrophy.<br>
      <strong>MRI spine:</strong> if proprioceptive deficits or spinal pain coexist — use Myelopathy approach for full localisation and imaging pathway.<br>
      <strong>MRI thigh muscles:</strong> focal T2 hyperintensity in inflammatory myopathy, necrotic myositis, or masticatory muscle myositis (masseter and temporalis).`),
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
