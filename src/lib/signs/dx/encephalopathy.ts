// ── Disorientation — diagnostic approach (data) ──────────────────────────────
// Ettinger Ch 24 (restlessness/altered mentation), Ch 44 (stupor and coma),
// and the neurological chapters (Ch 40–46) are the primary sources.
// Three-tab standard (history / exam / dx).

import type { DxApproach } from '../dxTypes'
import { numBadge } from './shared/dxHelpers'

export const encephalopathyDx: DxApproach = {
  title: 'Disorientation',
  tabs: {

  history: {
    title: 'History: Disorientation',
    blocks: [
      { kind: 'branch', text: 'RULE OUT METABOLIC / TOXIC BEFORE STRUCTURAL' },
      {
        kind: 'note',
        html: `Acute "brain" signs (altered mentation · behaviour change · head pressing · circling · blindness) are commonly <strong>extracranial</strong>. Chase metabolic and toxic causes first — fast, cheap and often reversible. Most diffuse / symmetric encephalopathy = systemic cause until proven otherwise.`,
      },

      { kind: 'step', text: '📋 STEP 1 — CHARACTERISE ONSET AND SEVERITY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Onset speed', { text: 'Differential', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Peracute</strong><br>seconds–minutes`, { text: 'Cerebrovascular accident (stroke) · seizure · toxin · severe metabolic crisis (hypoglycaemia · hypocalcaemia)', tone: 'teal' }],
          [`${numBadge(2)}<strong>Acute</strong><br>hours–days`, { text: 'Toxin · metabolic encephalopathy (hepatic · uraemic) · TBI · acute encephalitis · hypertensive encephalopathy', tone: 'teal' }],
          [`${numBadge(3)}<strong>Subacute–chronic</strong><br>weeks–months`, { text: 'Neoplasia · MUO / encephalitis · cognitive dysfunction · chronic metabolic disease (PSS · hypothyroidism)', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Course',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Pattern', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['<strong>Progressive</strong>', { text: 'Structural / neoplastic', tone: 'teal' }],
          ['<strong>Episodic / waxing–waning</strong>', { text: 'Metabolic — particularly post-prandial hepatic encephalopathy, hypoglycaemia', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Severity grading — track progression over time',
        cols: '0.6fr 1.5fr',
        dividers: true,
        headers: ['Grade', { text: 'Definition', tone: 'teal' }],
        rows: [
          ['<strong>Alert</strong>', { text: 'Normal mentation', tone: 'teal' }],
          ['<strong>Obtunded</strong>', { text: 'Dull, slow responses', tone: 'teal' }],
          ['<strong>Stupor</strong>', { text: 'Rousable by noxious stimulus, lapses back', tone: 'teal' }],
          ['<strong>Coma</strong>', { text: 'Unrousable even by noxious stimulus', tone: 'danger' }],
        ],
      },
      { kind: 'step', text: '🐾 STEP 2 — SIGNALMENT AND BREED PATTERNS' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Yorkshire Terrier', 'Maltese', 'Pomeranian', 'Miniature Schnauzer', 'Shih Tzu'], tone: 'green', html: 'young + stunted + post-prandial signs → congenital PSS (large breeds get intrahepatic shunts). Clues: ↓BUN, ↓albumin, ↓glucose, ↓cholesterol; ammonium biurate crystals in urine. Chemistry, bile acids and ammonia may all stay normal until 7–12 yr.' },
          { breeds: ['Pug', 'Maltese', 'Yorkshire Terrier', 'Chihuahua', 'French Bulldog'], tone: 'violet', html: 'young–middle-aged small breed with progressive multifocal signs → MUO (NME / NLE / GME).' },
          { breeds: ['Collie', 'Australian Shepherd', 'Shetland Sheepdog'], tone: 'warning', html: 'MDR1 / ABCB1 — ivermectin / macrocyclic lactone CNS toxicity.' },
          { breeds: ['Middle-aged dog with HAC signs'], group: 'signalment', tone: 'warning', html: 'pituitary macroadenoma — early (&lt;1.5 cm): inappetence, mild obtundation, disorientation, pacing; severe (&gt;1.5 cm): obtundation, circling, tetraparesis, ataxia, seizures.' },
          { breeds: ['Older dog, progressive focal signs'], group: 'signalment', tone: 'danger', html: 'neoplasia — glioma in brachycephalics, meningioma in dolichocephalics.' },
        ],
        cat: [
          { breeds: ['Older cat + hypertension + retinal changes'], group: 'signalment', tone: 'info', html: 'hypertensive encephalopathy (CKD, hyperthyroidism, HCM).' },
          { breeds: ['Fish / sulphite-preserved diet'], group: 'signalment', tone: 'danger', html: 'thiamine (B1) deficiency with vestibular signs + seizures — supplement immediately; signs resolve within weeks.' },
          { breeds: ['Young cat, FIP-suspect'], group: 'signalment', tone: 'violet', html: 'FIP encephalitis (pyogranulomatous vasculitis); CSF protein markedly elevated.' },
          { breeds: ['Outdoor / unvaccinated cat'], group: 'signalment', tone: 'warning', html: 'Toxoplasma, Cryptococcus, FIP.' },
          { breeds: ['Permethrin spot-on exposure'], group: 'signalment', tone: 'danger', html: 'permethrin toxicity — tremors, seizures, hyperthermia; decontaminate + methocarbamol.' },
          { breeds: ['Geriatric, gradual onset, no other signs'], group: 'signalment', tone: 'green', html: 'cognitive dysfunction syndrome (CDS) — dog or cat.' },
        ],
      },
      { kind: 'step', text: '💊 STEP 3 — TOXIN / DRUG / DIET / SYSTEMIC DISEASE', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Toxin access',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Toxin', { text: 'Presentation', tone: 'teal' }],
        rows: [
          ['<strong>Ethylene glycol</strong> (antifreeze)', { text: 'Peracute inebriation, then renal failure', tone: 'teal' }],
          ['<strong>Metaldehyde</strong> (slug bait)', { text: 'Acute tremors', tone: 'teal' }],
          ['<strong>Organophosphates</strong>', { text: 'Cholinergic crisis', tone: 'teal' }],
          ['<strong>Bromethalin</strong> (rodenticide)', { text: 'Cerebral oedema — delayed onset 12 h–5 d', tone: 'teal' }],
          ['<strong>Lead</strong>', { text: 'Young dogs · pica + vomiting', tone: 'teal' }],
          ['<strong>Cannabinoids</strong>', { text: 'CNS depression · miosis · ataxia · urine incontinence', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Drugs causing CNS depression / disorientation',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Drug', { text: 'Signs', tone: 'teal' }],
        rows: [
          ['<strong>Opioids</strong>', { text: 'Depressed mentation + miosis → rapid reversal with naloxone', tone: 'teal' }],
          ['<strong>Benzodiazepines · muscle relaxants</strong>', { text: 'CNS depression', tone: 'teal' }],
          ['<strong>Anticholinergics</strong>', { text: 'Disorientation + mydriasis + hyperthermia', tone: 'teal' }],
          ['<strong>Macrocyclic lactones</strong>', { text: 'MDR1 breeds', tone: 'teal' }],
          ['<strong>Metronidazole</strong>', { text: 'Especially cats — vestibular signs + ataxia + seizures', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Diet, known disease & trauma',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>🐱 Fish / thiaminase-containing food or sulphite-preserved meat</strong>', { text: 'Thiamine deficiency', tone: 'teal' }],
          ['<strong>🐱 Irradiated diet</strong>', { text: 'Leukoencephalomyelopathy (Wallerian degeneration)', tone: 'teal' }],
          ['<strong>Liver disease / PSS</strong>', { text: 'Hepatic encephalopathy', tone: 'teal' }],
          ['<strong>Diabetes</strong>', { text: 'Hypoglycaemia · DKA · HONK', tone: 'teal' }],
          ['<strong>CKD / AKI</strong>', { text: 'Uraemic encephalopathy', tone: 'teal' }],
          ['<strong>HAC</strong>', { text: 'Pituitary macroadenoma', tone: 'teal' }],
          ['<strong>Addison\'s</strong>', { text: 'Hyponatraemia', tone: 'teal' }],
          ['<strong>Hypothyroidism</strong>', { text: 'Myxoedema coma — rare', tone: 'teal' }],
          ['<strong>Recent trauma</strong>', { text: 'Traumatic brain injury (TBI) · intracranial haemorrhage', tone: 'danger' }],
        ],
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Check blood glucose in EVERY altered-mentation patient — it takes seconds and hypoglycaemia is instantly correctable. Also check temperature: hyperthermia (heatstroke, post-SE, permethrin toxicity) and hypothyroidism myxoedema coma are both treatable emergencies.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Disorientation',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STABILISE (ABC) BEFORE FULL NEUROLOGICAL EXAM', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Secure airway</strong>`, { text: 'Sternal recumbency · extend head · suction if needed', tone: 'danger' }],
          [`${numBadge(2)}<strong>High-flow O₂</strong>`, { text: 'Immediately', tone: 'danger' }],
          [`${numBadge(3)}<strong>IV access</strong>`, { text: 'Establish early', tone: 'teal' }],
          [`${numBadge(4)}<strong>Blood glucose</strong>`, { text: 'Check immediately', tone: 'teal' }],
          [`${numBadge(5)}<strong>Vital signs</strong>`, { text: 'HR · RR · SpO₂ · T° · blood pressure', tone: 'teal' }],
          [`${numBadge(6)}<strong>Control active seizures</strong>`, { text: 'A crashing brain patient is resuscitated <em>before</em> examination', tone: 'danger' }],
        ],
      },
      { kind: 'step', text: '🧠 MENTATION GRADING (AVPU / mGCS)' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-info-fg);">AVPU scale</strong><br>
<strong>A</strong> — Alert: normal mentation<br>
<strong>V</strong> — responds to Voice<br>
<strong>P</strong> — responds to Pain only<br>
<strong>U</strong> — Unresponsive<br><br>
<strong>mGCS components:</strong><br>
Motor (1–6) · Brainstem reflexes (1–6) · Level of consciousness (1–6)<br>
Max 18 (normal); ≤8 = coma; use for serial tracking`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-warning-fg);">Key observation</strong><br>
Limb withdrawal from noxious stimulus = SPINAL REFLEX, not consciousness — limb withdrawal WITHOUT behavioural response (vocalisation, looking) = absent conscious pain perception = severe lesion → guarded to poor prognosis<br><br>
<strong>ARAS:</strong> ascending reticular activating system (pons/midbrain) modulates arousal. Consciousness requires both ARAS and cerebral cortex intact.`,
          },
        ],
      },
      { kind: 'step', text: '📍 LOCALISE — FOREBRAIN vs BRAINSTEM vs DIFFUSE', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Localisation', { text: 'Findings', tone: 'teal' }],
        rows: [
          ['<strong>Forebrain</strong><br>cortical / diencephalic', { text: 'Altered behaviour / mentation · compulsive circling <em>toward</em> the lesion · contralateral menace deficit with normal PLR · focal seizures · central blindness. Consciousness variably affected', tone: 'info' }],
          ['<strong>Brainstem</strong><br>midbrain / pons / medulla', { text: 'Multiple cranial nerve deficits · abnormal respiratory pattern · vestibular signs · severely depressed consciousness (stupor / coma). More ominous prognosis', tone: 'danger' }],
          ['<strong>Diffuse / symmetric</strong><br>metabolic', { text: 'No lateralising signs · bilateral symmetric findings · small reactive pupils · waxing–waning course · post-prandial worsening — chase systemic causes first', tone: 'green' }],
        ],
      },
      { kind: 'step', text: '👁 PUPIL SIGNS BY LESION LOCATION' },
      {
        kind: 'html',
        html: `<div class="dx-row c2">
  <div class="dx-test" style="font-size:9px;"><strong>Bilateral small reactive pupils</strong><br>→ Metabolic encephalopathy<br>→ OR bilateral diencephalic injury<br><br><strong>Pinpoint pupils</strong><br>→ Pontine injury (descending sympathetic destruction)<br>→ Opioid toxidrome (miosis + depression)</div>
  <div class="dx-test" style="font-size:9px;"><strong>Fixed dilated bilateral (mydriasis)</strong><br>→ CN III / midbrain damage bilaterally<br>→ Severe ↑ICP with herniation ⚠️<br><br><strong>Unilateral fixed dilated</strong><br>→ Ipsilateral midbrain lesion<br>→ OR uncal herniation (CN III compression) ⚠️</div>
</div>`,
      },
      { kind: 'step', text: '🔺 SIGNS OF RAISED INTRACRANIAL PRESSURE (ICP)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Sign', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Cushing reflex</strong><br>systemic hypertension + reflex bradycardia', { text: 'Cerebral ischaemic response to a severe acute ICP rise → <strong>life-threatening intracranial hypertension with imminent herniation — treat immediately</strong>', tone: 'danger' }],
          ['<strong>Other ↑ICP signs</strong>', { text: 'Obtundation / stupor / coma · bilateral mydriasis with poor PLR · head pressing · opisthotonos', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Respiratory patterns in brainstem compression',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Pattern', { text: 'Localises to', tone: 'teal' }],
        rows: [
          ['<strong>Cheyne-Stokes</strong> — cyclical apnoea–hyperpnoea', { text: 'Diencephalon / bilateral cerebral', tone: 'teal' }],
          ['<strong>Central neurogenic hyperventilation</strong>', { text: 'Pons / medulla', tone: 'teal' }],
          ['<strong>Apneustic</strong> — prolonged inspiration', { text: 'Upper pons', tone: 'teal' }],
          ['<strong>Ataxic</strong> — completely irregular', { text: 'Medulla → <strong>intubate immediately</strong>', tone: 'danger' }],
          ['<strong>Agonal</strong> — shallow gasps', { text: 'Anoxic → rapidly progresses to apnoea', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Posture',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Posture', { text: 'Localises to', tone: 'teal' }],
        rows: [
          ['<strong>Decerebrate</strong> — extensor rigidity all 4 limbs', { text: 'Midbrain / rostral pons or bilateral cerebral hemispheric dysfunction; stupor / coma present', tone: 'danger' }],
          ['<strong>Decerebellate</strong> — opisthotonos + forelimb extension + hindlimb flexion', { text: 'Does <strong>NOT</strong> affect consciousness', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🔍 PHYSICAL EXAMINATION — SYSTEMIC CLUES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>HR · rhythm · pulse quality · CRT</strong>', { text: 'Cardiovascular status and perfusion', tone: 'info' }],
          ['<strong>Pale MM</strong>', { text: 'Anaemia · shock · hypovolaemia', tone: 'info' }],
          ['<strong>Brick-red MM</strong>', { text: 'Polycythaemia · sepsis · CO', tone: 'info' }],
          ['<strong>Core–extremity temperature difference</strong>', { text: 'Shock', tone: 'info' }],
          ['<strong>Pot belly + muscle wasting + alopecia</strong>', { text: 'HAC — pituitary macroadenoma compressing the brain', tone: 'warning' }],
          ['<strong>Cachexia</strong>', { text: 'Neoplasia · chronic disease', tone: 'warning' }],
          ['<strong>Non-pitting skin oedema + bradycardia + hypothermia</strong>', { text: 'Myxoedema coma (hypothyroid)', tone: 'warning' }],
          ['<strong>Fundoscopy — perform in every case:</strong> papilloedema (blurred disc margins)', { text: '↑ICP', tone: 'danger' }],
          ['<strong>Chorioretinitis</strong>', { text: 'Toxoplasma · CDV · FIP', tone: 'danger' }],
          ['<strong>Retinal haemorrhage / detachment</strong>', { text: 'Hypertension → <strong>check BP immediately</strong>', tone: 'danger' }],
          ['<strong>T° &gt;41°C</strong>', { text: 'Heatstroke · post-SE hyperthermia · permethrin (🐱) → active cooling', tone: 'violet' }],
          ['<strong>T° &lt;37°C + bradycardia + obtundation</strong>', { text: 'Myxoedema coma · hypothermia · severe shock', tone: 'violet' }],
          ['<strong>Small liver</strong>', { text: 'PSS · chronic hepatopathy', tone: 'green' }],
          ['<strong>Jaundice</strong>', { text: 'Hepatic · haemolytic disease', tone: 'green' }],
        ],
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Elevated ICP:</strong> Head pressing · obtundation · bilateral mydriasis · Cushing reflex → Mannitol 0.25–0.5 g/kg IV over 15 min · Head elevation 30° · Avoid jugular compression. Hypertonic saline 7.2% NaCl 2–4 mL/kg IV alternative. Do NOT use corticosteroids in traumatic brain injury.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Disorientation — Diagnostics',
    blocks: [
      { kind: 'step', text: '⚡ IMMEDIATE POINT-OF-CARE (all altered-mentation patients)' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>Blood glucose</strong><br>Point-of-care first<br>&lt;3.5 mmol/L → dextrose IV<br>&lt;2.5 mmol/L → urgent bolus<br>→ insulinoma? PSS? Addison's?`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>Temperature + Blood pressure</strong><br>T° &gt;41°C → active cooling<br>T° &lt;37°C → warming + cause<br>BP &gt;160 mmHg → hypertensive encephalopathy<br>→ amlodipine / telmisartan`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>Opioid / toxidrome screen</strong><br>Miosis + depressed mentation<br>→ Naloxone 0.01–0.04 mg/kg IV<br>(titrate; may need repeat)<br>Anticholinergic: mydriasis + tachycardia`,
          },
        ],
      },
      { kind: 'step', text: 'TIER 1 — MINIMUM DATABASE (all patients)' },
      {
        kind: 'html',
        html: `<div class="dx-row c2">
  <div class="dx-test" style="font-size:9px;"><strong>Haematology</strong><br>CBC: PCV/HCT, leukogram, platelets<br>PCV &gt;60% → polycythaemia → hyperviscosity<br>PCV &lt;20% → cerebral hypoxia from anaemia<br>No stress leukogram + hyponatraemia → Addison's<br>Thrombocytopenia → tick-borne / IMTP</div>
  <div class="dx-test" style="font-size:9px;"><strong>Biochemistry (brain panel)</strong><br>Glucose · iCa · Na · K · Mg<br>BUN / Cr · ALT / ALP / GGT<br>Total protein / Albumin / Cholesterol<br>↓BUN + ↓albumin + ↓cholesterol → PSS/HE<br>↑Cr + ↑BUN → uraemic encephalopathy</div>
</div>
<div style="height:5px;"></div>
<div class="dx-row c3">
  <div class="dx-test" style="font-size:9px;"><strong>Bile acids + Ammonia</strong><br>Fasted + 2h post-prandial bile acids<br>↑ Post-prandial → PSS / hepatopathy<br>↑ Ammonia (&gt;120 µmol/L) → HE<br>Normal chemistry does NOT exclude PSS</div>
  <div class="dx-test" style="font-size:9px;"><strong>Urinalysis + sediment</strong><br>USG · Glucosuria (DKA/DM)<br>Ammonium biurate crystals → PSS<br>Bilirubinuria (cat = always pathological)<br>Culture if UTI suspected</div>
  <div class="dx-test" style="font-size:9px;"><strong>Blood pressure</strong><br>Assess all altered-mentation patients<br>Dog: ≥160 mmHg sustained = hypertensive<br>Cat: ≥160 mmHg → check T4, renal, cardiac<br>Fundoscopy: haemorrhage / detachment</div>
</div>`,
      },
      { kind: 'branch', text: 'BLOODS ABNORMAL?' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
  <div class="dx-col">
    <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">YES → REACTIVE / METABOLIC</div>
    <div class="dx-arrow">↓</div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">BG &lt;3.5 mmol/L → <strong>Hypoglycaemia</strong><br>→ Fasted insulin:glucose ratio (insulinoma)<br>→ PSS (toy breed, post-prandial)<br>→ Addison's (Na:K &lt;27), hepatic failure</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">↑ Bile acids / ↑ ammonia, ↓BUN, ↓albumin → <strong>Hepatic encephalopathy</strong><br>→ Abdominal US · CT angiography (PSS)<br>→ Liver biopsy if diffuse hepatopathy</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">↑ BUN / Cr markedly → <strong>Uraemic encephalopathy</strong><br>→ IV fluids, address underlying CKD/AKI<br>→ PTH excess / hypercalcaemia may contribute</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">Na &lt;120 or &gt;170 mmol/L (or rapid change) → <strong>Sodium disorder</strong><br>→ Correct SLOWLY (max 0.5 mmol/L/h dog;<br>overcorrection → central pontine myelinolysis)</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">iCa &lt;1.0 mmol/L → <strong>Hypocalcaemia</strong><br>→ Eclampsia (periparturient bitch)<br>→ Hypoparathyroidism · CKD · Ethylene glycol<br>→ Calcium gluconate IV (monitor ECG)</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">BP &gt;160 mmHg → <strong>Hypertensive encephalopathy</strong><br>→ Amlodipine (cats 0.625 mg q24h) / telmisartan<br>→ Identify underlying cause: CKD, HyperT4, HCM<br>→ Neurologic signs occur at ≥170 mmHg (rapid ↑)</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">History of toxin / drug → <strong>Intoxication</strong><br>→ Decontaminate if recent (&lt;2h)<br>→ Naloxone if opioid signs present<br>→ Toxicology screen (blood / urine)</div>
  </div>
  <div class="dx-col">
    <div class="dx-test" style="width:100%;text-align:center;font-weight:600;font-size:11px;">NO → TIER 2</div>
    <div class="dx-arrow">↓</div>
    <div class="dx-note" style="width:100%;font-size:9px;">Normal metabolic database → structural or primary CNS disease. Proceed to advanced imaging.<br><br>Also add if not yet checked:<br>• TT4 (dogs: hypothyroidism; cats: hyperthyroidism)<br>• ACTH stimulation test if Addison's possible<br>• Low-dose DST / ACTH if HAC pituitary macroadenoma suspected</div>
    <div style="height:6px;"></div>
    <div class="dx-note" style="width:100%;font-size:9px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">
      <strong style="color:var(--tone-info-fg);">When to image (any of):</strong><br>
      • Focal / lateralising neurological signs<br>
      • Abnormal interictal neuro exam<br>
      • Progressive course<br>
      • Peracute onset (rule out CVA, TBI)<br>
      • Normal metabolic database<br>
      • Signalment suggests structural (age &gt;7yr or MUO-breed &lt;5yr)<br>
      • Raised ICP signs (after stabilisation)
    </div>
  </div>
</div>`,
      },
      { kind: 'step', text: 'TIER 2 — ADVANCED IMAGING + CSF' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>MRI brain</strong> (1.5T or 3T)<br>FLAIR · T1 · T2 · DWI · T1+contrast<br>Gold standard for structural lesions<br>DWI: acute ischaemic infarct (stroke)<br>FLAIR: oedema, inflammation, lentiform nuclei (HE)<br>Contrast enhancement: neoplasia, inflammation`,
          },
          {
            style: 'font-size:9px;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);',
            html: `<strong>CSF analysis</strong> (after MRI, under GA)<br>TNCC (normal &lt;5 cells/µL)<br>Protein (normal &lt;0.25 g/L)<br>Cytology + culture if indicated<br>PCR: CDV, FIP, Toxoplasma, Neospora, Crypto<br>HE: ↑ ammonia, glutamine, tryptophan in CSF`,
          },
        ],
      },
      { kind: 'branch', text: 'MRI / CSF RESULTS' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
  <div class="dx-col">
    <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:10px;">ABNORMAL → STRUCTURAL</div>
    <div class="dx-arrow">↓</div>
    <div class="dx-dx" style="width:100%;font-size:9px;">Peracute, vascular territory, DWI bright → <strong>CVA (stroke)</strong><br>→ BP · T4 (cats) · cardiac echo · coag panel<br>→ Treat underlying cause; most dogs improve</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">Extra-axial enhancing mass → <strong>Meningioma</strong><br><em>(older cats; dolichocephalic dogs)</em><br>→ Surgery (cats do well) · SRS/radiation</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">Intra-axial mass + peri-lesional oedema → <strong>Glioma</strong><br><em>(brachycephalics &gt;5yr)</em> · Palliative radiation</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">Large pituitary mass → <strong>Pituitary macroadenoma</strong><br>→ Confirm HAC (LDDS / HDDS)<br>→ SRS / radiation; trilostane for HAC control</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">↑ TNCC + mononuclear pleocytosis → <strong>MUO / encephalitis</strong><br>→ Serology/PCR: Toxoplasma, Neospora, CDV, Crypto, FIP<br>→ Prednisolone ± cytarabine / lomustine</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">HE: lentiform nuclei T2 hyperintense, widened sulci → <strong>Hepatic encephalopathy</strong><br>→ Non-contrast-enhancing; treat underlying PSS</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="width:100%;font-size:9px;">T2/FLAIR symmetric brainstem/cerebellar → <strong>Thiamine deficiency</strong><br>→ Thiamine 25–50 mg IM/IV immediately; signs resolve</div>
  </div>
  <div class="dx-col">
    <div class="dx-test" style="width:100%;text-align:center;font-weight:600;font-size:10px;">NORMAL → PRIMARY POLYDIPSIA / CDS</div>
    <div class="dx-arrow">↓</div>
    <div class="dx-note" style="width:100%;font-size:9px;"><strong>Geriatric animal, normal MRI + bloods:</strong><br>Consider cognitive dysfunction syndrome (CDS)<br>Dogs &gt;11yr: up to 68% prevalence<br>Cats: disorientation, vocalisation, altered sleep cycle<br>Selegiline (dogs 0.5 mg/kg PO q24h AM)<br>Environmental enrichment · Dietary antioxidants</div>
    <div class="dx-arrow">↓</div>
    <div class="dx-note" style="width:100%;font-size:9px;"><strong>Hypothyroid myxoedema coma (rare):</strong><br>Brain oedema → mentation changes<br>Hypothermia without shivering<br>Non-pitting skin oedema · Bradycardia · Hyponatraemia<br>Hypoventilatory hypoxia<br>Thyroxine → improvement usually within 24h<br>but mortality high; intensive supportive care</div>
  </div>
</div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:10px;padding:10px 14px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:12px;">
  <div style="font-size:10px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;">⚠️ ELEVATED ICP — IMMEDIATE TREATMENT</div>
  <div style="font-size:10px;color:var(--tone-danger-fg);line-height:1.6;">
    Head pressing · bilateral mydriasis · Cushing reflex (hypertension + bradycardia) = life-threatening ↑ICP<br>
    <strong>Mannitol</strong> 0.25–0.5 g/kg IV over 15 min (may repeat q4–6h) · Head elevation 30° · Avoid jugular compression<br>
    <strong>Hypertonic saline</strong> 7.2% NaCl 2–4 mL/kg IV — alternative to mannitol; do NOT use both<br>
    <strong>NO corticosteroids in TBI</strong> — use only for inflammatory/vasogenic oedema (MUO, neoplasia)<br>
    Brief hyperventilation to PaCO₂ ~30 mmHg may transiently reduce ICP — limits cerebral blood flow; short-term only
  </div>
</div>`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
