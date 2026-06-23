// ── Disorientation — diagnostic approach (data) ──────────────────────────────
// Ettinger Ch 24 (restlessness/altered mentation), Ch 44 (stupor and coma),
// and the neurological chapters (Ch 40–46) are the primary sources.
// Three-tab standard (history / exam / dx).

import type { DxApproach } from '../dxTypes'

export const encephalopathyDx: DxApproach = {
  title: 'Disorientation',
  tabs: {

  history: {
    title: 'History: Disorientation',
    blocks: [
      { kind: 'branch', text: 'RULE OUT METABOLIC / TOXIC BEFORE STRUCTURAL' },
      {
        kind: 'check',
        html: `Acute "brain" signs (altered mentation, behaviour change, head pressing, circling, blindness) are commonly extracranial. The history should chase metabolic and toxic causes first — they are fast, cheap, and often reversible. Most diffuse/symmetric encephalopathy = systemic cause until proven otherwise.`,
      },
      { kind: 'step', text: '📋 CHARACTERISE ONSET AND SEVERITY' },
      {
        kind: 'check',
        html: `<strong>Onset speed:</strong><br>
• <strong>Peracute (seconds–minutes):</strong> cerebrovascular accident (stroke), seizure, toxin, severe metabolic crisis (hypoglycaemia, hypocalcaemia)<br>
• <strong>Acute (hours–days):</strong> toxin, metabolic encephalopathy (hepatic, uraemic), TBI, acute encephalitis, hypertensive encephalopathy<br>
• <strong>Subacute–chronic (weeks–months):</strong> neoplasia, MUO/encephalitis, cognitive dysfunction, chronic metabolic disease (PSS, hypothyroidism)<br><br>
<strong>Course:</strong> Progressive (structural/neoplastic) or episodic/waxing-waning (metabolic — particularly post-prandial hepatic encephalopathy, hypoglycaemia)?<br><br>
<strong>Severity grading:</strong> Alert → Obtunded (dull, slow responses) → Stupor (rousable by noxious stimulus, lapses back) → Coma (unrousable even by noxious stimulus). Track progression over time.`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT AND BREED PATTERNS' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
  <div>
    <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG — Age/Signalment clues</strong><br><br>
    <strong style="color:var(--tone-green-fg);">Young + stunted + post-prandial signs:</strong><br>
    → Congenital PSS (toy breeds: Yorkie, Maltese, Pom, Schnauzer, Shih Tzu); large breeds intrahepatic<br>
    Clues: ↓BUN, ↓albumin, ↓glucose, ↓cholesterol; ammonium biurate crystals in urine<br>
    Note: chemistry/bile acids/ammonia may be normal in PSS until 7–12 years of age<br><br>
    <strong style="color:var(--tone-violet-fg);">Young–middle-aged small breed, progressive multifocal:</strong><br>
    → MUO (Pug, Maltese, Yorkie, Chihuahua, French Bulldog — NME/NLE/GME)<br><br>
    <strong style="color:var(--tone-warning-fg);">Middle-aged dog with HAC signs + pituitary macroadenoma:</strong><br>
    → Early signs (&lt;1.5cm): inappetence, mild obtundation, disorientation, pacing<br>
    → Severe (&gt;1.5cm): obtundation, circling, tetraparesis, ataxia, seizures<br><br>
    <strong style="color:var(--tone-danger-fg);">Older dog, progressive, focal:</strong><br>
    → Neoplasia (glioma — brachycephalics; meningioma — dolichocephalics)<br><br>
    <strong style="color:var(--tone-warning-fg);">MDR1/ABCB1 breeds (Collie, Australian Shepherd, Shetland Sheepdog):</strong><br>
    → Ivermectin / macrocyclic lactone CNS toxicity
  </div>
  <div>
    <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT — Age/Signalment clues</strong><br><br>
    <strong style="color:var(--tone-info-fg);">Older cat + hypertension + retinal changes:</strong><br>
    → Hypertensive encephalopathy (CKD, hyperthyroidism, HCM)<br><br>
    <strong style="color:var(--tone-danger-fg);">Cat on fish/sulphite-preserved diet + vestibular signs + seizures:</strong><br>
    → Thiamine (B1) deficiency — supplement immediately; signs resolve in weeks<br><br>
    <strong style="color:var(--tone-violet-fg);">Young cat + FIP-suspect (effusive or dry):</strong><br>
    → FIP encephalitis (pyogranulomatous vasculitis); CSF protein markedly elevated<br><br>
    <strong style="color:var(--tone-warning-fg);">Outdoor / unvaccinated cat:</strong><br>
    → Toxoplasma, Cryptococcus, FIP<br><br>
    <strong style="color:var(--tone-danger-fg);">Any cat exposed to permethrin spot-on:</strong><br>
    → Permethrin toxicity — tremors, seizures, hyperthermia; decontaminate + methocarbamol<br><br>
    <strong style="color:var(--tone-green-fg);">Geriatric dog or cat — gradual onset, no other signs:</strong><br>
    → Canine/Feline cognitive dysfunction syndrome (CDS)
  </div>
</div>`,
      },
      { kind: 'step', alt: true, text: '💊 TOXIN / DRUG / DIET / SYSTEMIC DISEASE' },
      {
        kind: 'check',
        html: `<strong>Toxin access:</strong> ethylene glycol (antifreeze — peracute inebriation then renal failure), metaldehyde (slug bait — acute tremors), organophosphates, bromethalin (rodenticide — cerebral oedema, delayed onset 12h–5d), lead (young dogs, pica + vomiting), cannabinoids (CNS depression, miosis, ataxia, urine incontinence).<br><br>
<strong>Drugs causing CNS depression/disorientation:</strong> opioids (depressed mentation + miosis → rapid reversal with naloxone), benzodiazepines, muscle relaxants, anticholinergics (disorientation + mydriasis + hyperthermia), macrocyclic lactones (MDR1 breeds), metronidazole (especially cats — vestibular + ataxia + seizures).<br><br>
<strong>Diet:</strong> cat on fish/thiaminase-containing food or sulphite-preserved meat → thiamine deficiency. Irradiated diet (cats) → leukoencephalomyelopathy (Wallerian degeneration).<br><br>
<strong>Known disease:</strong> liver disease/PSS, diabetes (hypoglycaemia/DKA/HONK), CKD/AKI (uraemic encephalopathy), HAC (pituitary macroadenoma), Addison's (hyponatraemia), hypothyroidism (myxoedema coma — rare).<br><br>
<strong>Recent trauma:</strong> traumatic brain injury (TBI) / intracranial haemorrhage.`,
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
      { kind: 'step', tone: 'danger', text: '⚡ STABILISE (ABC) BEFORE FULL NEUROLOGICAL EXAM' },
      {
        kind: 'check',
        html: `Secure airway (sternal recumbency, extend head, suction if needed) · High-flow O₂ · Establish IV access · Check blood glucose immediately · Vital signs (HR, RR, SpO₂, T°, blood pressure) · Control active seizures. A crashing brain patient is resuscitated before examination.`,
      },
      { kind: 'step', alt: true, text: '🧠 MENTATION GRADING (AVPU / mGCS)' },
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
      { kind: 'step', alt: true, text: '📍 LOCALISE — FOREBRAIN vs BRAINSTEM vs DIFFUSE' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-info-fg);">Forebrain (cortical/diencephalic):</strong> Altered behaviour/mentation, compulsive circling toward the lesion, contralateral menace deficit with normal PLR, focal seizures, central blindness. Consciousness variably affected.<br><br>
<strong style="color:var(--tone-danger-fg);">Brainstem (midbrain/pons/medulla):</strong> Multiple cranial nerve deficits, abnormal respiratory pattern, vestibular signs, severely depressed consciousness (stupor/coma). More ominous prognosis.<br><br>
<strong style="color:var(--tone-green-fg);">Diffuse/symmetric (metabolic):</strong> No lateralising signs, bilateral symmetric findings, small reactive pupils, waxing-waning course, post-prandial worsening — chase systemic causes first.`,
      },
      { kind: 'step', alt: true, text: '👁 PUPIL SIGNS BY LESION LOCATION' },
      {
        kind: 'html',
        html: `<div class="dx-row c2">
  <div class="dx-test" style="font-size:9px;"><strong>Bilateral small reactive pupils</strong><br>→ Metabolic encephalopathy<br>→ OR bilateral diencephalic injury<br><br><strong>Pinpoint pupils</strong><br>→ Pontine injury (descending sympathetic destruction)<br>→ Opioid toxidrome (miosis + depression)</div>
  <div class="dx-test" style="font-size:9px;"><strong>Fixed dilated bilateral (mydriasis)</strong><br>→ CN III / midbrain damage bilaterally<br>→ Severe ↑ICP with herniation ⚠️<br><br><strong>Unilateral fixed dilated</strong><br>→ Ipsilateral midbrain lesion<br>→ OR uncal herniation (CN III compression) ⚠️</div>
</div>`,
      },
      { kind: 'step', alt: true, text: '🔺 SIGNS OF RAISED INTRACRANIAL PRESSURE (ICP)' },
      {
        kind: 'check',
        html: `<strong>Cushing reflex</strong> = systemic hypertension + concurrent reflex bradycardia — triggered by severe acute ICP increase (cerebral ischaemic response) → indicates life-threatening intracranial hypertension with imminent herniation → treat immediately.<br><br>
Other ↑ICP signs: obtundation/stupor/coma, bilateral mydriasis with poor PLR, head pressing, opisthotonos.<br><br>
<strong>Respiratory patterns in brainstem compression:</strong><br>
• Cheyne-Stokes (cyclical apnea–hyperpnea) → diencephalon/bilateral cerebral<br>
• Central neurogenic hyperventilation → pons/medulla<br>
• Apneustic breathing (prolonged inspiration) → upper pons<br>
• Ataxic respiration (completely irregular) → medulla → intubate immediately<br>
• Agonal breathing (shallow gasps) → anoxic → rapidly progresses to apnea<br><br>
<strong>Posture:</strong> Decerebrate (extensor rigidity all 4 limbs) → midbrain/rostral pons or bilateral cerebral hemispheric dysfunction; stupor/coma present. Decerebellate (opisthotonos + forelimb extension + hindlimb flexion) → does NOT affect consciousness.`,
      },
      { kind: 'step', alt: true, text: '🔍 PHYSICAL EXAMINATION — SYSTEMIC CLUES' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
  <div>
    <strong style="color:var(--tone-info-fg);">Cardiovascular + perfusion</strong><br>
    HR · rhythm · pulse quality · CRT<br>
    Pale MM → anaemia / shock / hypovolaemia<br>
    Brick-red MM → polycythaemia / sepsis / CO<br>
    Core-extremity temperature difference → shock<br><br>
    <strong style="color:var(--tone-warning-fg);">Body condition + skin</strong><br>
    Pot belly + muscle wasting + alopecia → HAC<br>
    (pituitary macroadenoma compressing brain)<br>
    Cachexia → neoplasia / chronic disease<br>
    Non-pitting skin oedema + bradycardia + hypothermia → myxoedema coma (hypothyroid)
  </div>
  <div>
    <strong style="color:var(--tone-danger-fg);">Fundoscopy — perform in every case</strong><br>
    Papilloedema (blurred disc margins) → ↑ICP<br>
    Chorioretinitis → Toxoplasma / CDV / FIP<br>
    Retinal haemorrhage / detachment → hypertension → check BP immediately<br><br>
    <strong style="color:var(--tone-violet-fg);">Temperature</strong><br>
    T° &gt;41°C → heatstroke / post-SE hyperthermia / permethrin (cats) → active cooling<br>
    T° &lt;37°C + bradycardia + obtundation → myxoedema coma · hypothermia · severe shock<br><br>
    <strong style="color:var(--tone-green-fg);">Liver size</strong><br>
    Small liver → PSS / chronic hepatopathy<br>
    Jaundice → hepatic / haemolytic disease
  </div>
</div>`,
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
      { kind: 'step', alt: true, text: 'TIER 1 — MINIMUM DATABASE (all patients)' },
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
      { kind: 'step', alt: true, text: 'TIER 2 — ADVANCED IMAGING + CSF' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>MRI brain</strong> (1.5T or 3T)<br>FLAIR · T1 · T2 · DWI · T1+contrast<br>Gold standard for structural lesions<br>DWI: acute ischaemic infarct (stroke)<br>FLAIR: oedema, inflammation, lentiform nuclei (HE)<br>Contrast enhancement: neoplasia, inflammation`,
          },
          {
            style: 'font-size:9px;background:#0D7377;',
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
