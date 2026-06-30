// ── Seizures — diagnostic approach (data) ───────────────────────────────────
// Migration of seizureDx{History,Exam,Dx}Html (legacy HTML consts in
// ../seizures.ts) to the typed DxApproach model. Rendered by renderDxApproach.
// The Dx tab carries a bespoke decision-tier tree (dx-connector / dx-col /
// dx-note grids) transcribed verbatim as { kind: 'html' } escape-hatch blocks.

import type { DxApproach } from '../dxTypes'

export const seizuresDx: DxApproach = {
  title: 'Seizures',
  tabs: {

  history: {
    title: 'History: Seizures',
    blocks: [
      { kind: 'step', text: '📋 CHARACTERISE THE SEIZURE EVENT' },
      {
        kind: 'check',
        html: `<strong>Ask owners to video future episodes.</strong> The description is the most important diagnostic tool — ask open questions, then clarify each phase:<br><br>
    <strong style="color:var(--tone-info-fg);">Prodrome</strong> (hours–days before): behaviour change? Restlessness, anxiety, hiding, attention-seeking, vocalisation. Not universal.<br><br>
    <strong style="color:var(--tone-warning-fg);">Ictal phase</strong> — characterise carefully:<br>
    • <strong>Focal:</strong> one body region or one side. Facial twitching, lip smacking, fly-catching, rhythmic blinking, one limb jerking. Consciousness may be preserved (simple focal) or impaired (complex focal). Focal → structural lesion until proven otherwise.<br>
    • <strong>Focal-to-bilateral:</strong> began focal then generalised → still favours structural.<br>
    • <strong>Generalised:</strong> both sides simultaneously. Tonic-clonic (rigid → paddling), tonic (rigid, no clonic), atonic (sudden drop). Loss of consciousness, autonomic signs (urination, defaecation, hypersalivation).<br><br>
    <strong style="color:var(--tone-green-fg);">Postictal phase</strong>: disorientation, transient blindness, ataxia, aggression, polyphagia, hypersalivation. Normal duration: minutes to several hours. <strong>Prolonged postictal (&gt;24h) = structural cause until proven otherwise.</strong>`,
      },
      { kind: 'step', alt: true, text: '⏱ DURATION, FREQUENCY AND PROGRESSION' },
      {
        kind: 'check',
        html: `<strong>Duration of each seizure:</strong> &lt;5 min (typical) or &gt;5 min (<strong>status epilepticus</strong> — treat immediately)<br>
    <strong>Cluster?</strong> ≥2 seizures in 24h — significant risk of SE; treat aggressively<br>
    <strong>First seizure vs recurrent:</strong> frequency trend — stable, increasing, or decreasing?<br>
    <strong>Age of onset:</strong><br>
    • &lt;6 months → structural (anomalous, storage disease) or reactive (hypoglycaemia, PSS, EL toxin)<br>
    • 6 months–6 years → idiopathic epilepsy most likely (if bloods and interictal neuro exam normal)<br>
    • &gt;6 years → structural (neoplasia, CVA, MUO) or reactive (metabolic) — idiopathic rare<br>
    <strong>Interictal behaviour:</strong> completely normal between episodes? Any head pressing, circling, personality change, vision change? Abnormal interictal = structural until proven otherwise.`,
      },
      { kind: 'step', alt: true, text: '💊 DRUG / TOXIN / MEDICATION HISTORY' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-danger-fg);">Seizurogenic toxins</strong><br>
        Organophosphates / carbamates — SLUDGE + tremors<br>
        Bromethalin rodenticide — delayed 12h–5 days<br>
        Metaldehyde (slug bait) — acute tremors + hyperthermia<br>
        Ethylene glycol (antifreeze) — inebriation then seizures at 12–24h<br>
        Mycotoxins (mouldy food, <em>Penitrem A</em>)<br>
        Lead — young dogs, pica, vomiting + seizures<br>
        Methylxanthines (chocolate, coffee, energy drinks)<br>
        Ivermectin/macrocyclic lactones in MDR1-affected breeds<br>
        Fluorouracil (5-FU cream) — trace amounts fatal in cats<br>
        Strychnine — severe muscle rigidity + opisthotonus
      </div>
      <div>
        <strong style="color:var(--tone-warning-fg);">Seizurogenic medications</strong><br>
        5-FU cream — any cat exposure = emergency<br>
        SSRIs / SNRIs — serotonin syndrome<br>
        Tramadol (cats) — lowers seizure threshold<br>
        Metronidazole (esp. cats) — vestibular + seizures<br>
        Fluoroquinolones (cats at high doses)<br>
        Lidocaine (cats — narrow therapeutic margin)<br>
        Amphetamines / stimulants<br>
        Pyrethrins / pyrethroids (cats especially)<br><br>
        <strong style="color:var(--tone-danger-fg);">⚠️ AED withdrawal</strong><br>
        Abrupt phenobarbitone or KBr cessation — major cause of breakthrough seizures and SE. Always ask about missed doses.
      </div>
    </div>`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT AND BREED PREDISPOSITIONS' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:var(--tone-info-fg);">Idiopathic epilepsy (genetic):</strong><br>
        Border Collie · Labrador · GSD · Golden Retriever · Belgian Shepherd (Tervuren, Malinois) · Beagle · Keeshond · Vizsla · Finnish Spitz<br><br>
        <strong style="color:var(--tone-warning-fg);">PSS → reactive seizures:</strong><br>
        Yorkshire Terrier · Maltese · Pomeranian · Miniature Schnauzer · Shih Tzu — onset &lt;1yr, post-prandial, small/toy breeds<br><br>
        <strong style="color:var(--tone-violet-fg);">MUO / meningoencephalitis:</strong><br>
        Pug · Yorkshire Terrier · Maltese · Chihuahua · French Bulldog<br><br>
        <strong style="color:var(--tone-danger-fg);">Glioma (brachycephalics):</strong><br>
        Boston Terrier · French Bulldog · Pug · Boxer — older dogs, progressive focal signs<br><br>
        <strong style="color:var(--tone-green-fg);">Meningioma (dolichocephalics):</strong><br>
        Golden Retriever · Greyhound · Collie — extra-axial, slow progression<br><br>
        <strong style="color:var(--tone-warning-fg);">MDR1 / ABCB1 mutation:</strong><br>
        Collie · Rough Collie · Shetland Sheepdog · Australian Shepherd · Border Collie — ivermectin / macrocyclic lactone toxicity risk<br><br>
        <strong style="color:var(--tone-danger-fg);">Storage diseases (NCL):</strong><br>
        Dalmatian · Poodle · Tibetan Terrier · English Setter — progressive, juvenile onset
      </div>
      <div>
        <strong style="color:var(--hl-orange);font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:var(--tone-info-fg);">Meningioma:</strong><br>
        Siamese · older domestic shorthair cats — slow focal signs, extra-axial on MRI<br><br>
        <strong style="color:var(--tone-danger-fg);">CNS lymphoma:</strong><br>
        FeLV-positive · older cats — multifocal signs, progressive<br><br>
        <strong style="color:var(--tone-violet-fg);">Infectious encephalitis:</strong><br>
        Outdoor / unvaccinated cats — FIP (coronavirus), Toxoplasma, Cryptococcus<br><br>
        <strong style="color:var(--tone-warning-fg);">Ischaemic encephalopathy:</strong><br>
        Older cats — peracute onset, focal signs, often resolves<br><br>
        <strong style="color:var(--tone-green-fg);">Idiopathic epilepsy:</strong><br>
        Less common than dogs; diagnosis of exclusion; any breed<br><br>
        <strong style="color:var(--tone-danger-fg);">Drug sensitivity:</strong><br>
        All cats — extreme sensitivity to 5-FU, permethrin, metronidazole, fluoroquinolones, lidocaine
      </div>
    </div>
    <div style="margin-top:8px;font-size:9.5px;">
      <strong style="color:var(--tone-danger-fg);">Vaccination + travel history:</strong> CDV (dogs) — polioencephalitis or old dog encephalitis; rabies (endemic areas); travel → Neospora, Toxoplasma, Cryptococcus, Coccidioides (North America), Blastomyces, Ehrlichia, Babesia, Leishmania (Europe/Asia)
    </div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:12px;">
  <div style="font-size:10px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;">⚠️ RED FLAGS — EMERGENCY</div>
  <div style="font-size:10px;color:var(--tone-danger-fg);line-height:1.6;">
    Seizure &gt;5 min = SE — treat immediately · Cluster ≥2/24h = emergency · Cat with any 5-FU cream exposure = immediate emergency · Metaldehyde/organophosphate exposure + tremors — decontaminate + treat now · Post-ictal obtundation not improving after 4–6h → structural disease / raised ICP
  </div>
</div>`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Seizures',
    blocks: [
      { kind: 'step', text: '🚨 EMERGENCY ASSESSMENT FIRST' },
      {
        kind: 'check',
        html: `<strong>Is the patient actively seizing or immediately post-ictal?</strong><br>
    1. Maintain airway — sternal recumbency, extend head, suction if needed<br>
    2. High-flow O₂ (5–10 L/min mask or flow-by)<br>
    3. Establish IV access (cephalic or saphenous)<br>
    4. Point-of-care BG immediately (see Protocol PROT-SEIZ for drug dosing)<br>
    5. Vital signs: HR, RR, SpO₂, T° (hyperthermia &gt;41°C after SE → active cooling)<br>
    6. Do NOT attempt full neurological exam during active seizure — risk of injury to patient and staff`,
      },
      { kind: 'step', alt: true, text: '🧠 POSTICTAL vs INTERICTAL' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-warning-fg);">Postictal</strong><br>
      Immediately after seizure<br>
      Disoriented, ataxic, transiently blind<br>
      Hypersalivating, polyphagic<br>
      May appear neurologically abnormal<br>
      But: should be <em>improving</em> over minutes–hours<br><br>
      <strong>If not improving → structural cause</strong>`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong style="color:var(--tone-green-fg);">Interictal</strong><br>
      Well between episodes<br>
      Should be neurologically normal<br>in idiopathic epilepsy<br>
      Any persistent deficit = structural<br>
      Any progressive deficit = structural<br><br>
      <strong>Always examine when patient is calm</strong>`,
          },
        ],
      },
      { kind: 'step', alt: true, text: '🩺 NEUROLOGICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-info-fg);">Mentation:</strong> Alert (normal) / Obtunded (dull, slow responses) / Stuporous (minimal response to strong stimuli) / Comatose (no response). Head pressing suggests increased ICP. Compulsive circling (ipsilateral to lesion).<br><br>
    <strong style="color:var(--tone-warning-fg);">Cranial nerves:</strong><br>
    • CN II: Menace response (hand gesture → blink; tests vision + CN VII), visual placing (paw placement on table edge)<br>
    • CN II + III: Direct and consensual PLR — fixed/dilated pupil = CN III compression or brainstem herniation (emergency)<br>
    • CN III/IV/VI: Physiological nystagmus (normal moving head = normal vestibulo-ocular reflex)<br>
    • CN V: Jaw tone, masticatory muscle bulk (atrophy → MMM or CN V lesion)<br>
    • CN VII: Facial symmetry, palpebral reflex, lip and nose deviation<br>
    • CN IX/X: Gag reflex, dysphagia<br><br>
    <strong style="color:var(--tone-green-fg);">Postural reactions (most sensitive for cortical lesions):</strong><br>
    • Conscious proprioception (CP) positioning — knuckle paw on floor; delayed/absent = UMN deficit<br>
    • Hopping (front and hindlimbs separately) — asymmetry localises lesion<br>
    • Hemi-walking — ipsilateral front + hindlimb together<br>
    • Wheelbarrowing (blindfolded) — cranial nerve lesion check<br><br>
    <strong style="color:var(--tone-violet-fg);">Gait + posture:</strong> Ataxia (cerebellar = hypermetric/intention tremor; vestibular = swaying/head tilt; proprioceptive = crossing limbs, stumbling). Paresis = UMN vs LMN? Circling?<br><br>
    <strong style="color:var(--tone-danger-fg);">Fundoscopy:</strong> Papilloedema (raised ICP — blurred disc margins, haemorrhage), chorioretinitis (infectious/immune-mediated → Toxoplasma, CDV, FIP), retinal detachment or haemorrhage (hypertension)`,
      },
      { kind: 'step', alt: true, text: '🔍 PHYSICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:var(--tone-info-fg);">Cardiovascular</strong><br>
        HR, rhythm, pulse quality<br>
        Murmurs, muffled sounds<br>
        Arrhythmia → syncope vs seizure<br>
        Weak pulses → cardiac output ↓<br><br>
        <strong style="color:var(--tone-warning-fg);">Lymph nodes</strong><br>
        Generalised lymphadenopathy<br>
        → infectious (Ehrlichia, Leishmania)<br>
        → neoplastic (lymphoma → CNS)<br><br>
        <strong style="color:var(--tone-green-fg);">Liver</strong><br>
        Hepatomegaly (HAC, neoplasia)<br>
        Jaundice (hepatic/haemolytic)<br>
        Small liver (PSS, chronic hepatopathy)
      </div>
      <div>
        <strong style="color:var(--tone-violet-fg);">Mucous membranes</strong><br>
        Pale → anaemia / blood loss<br>
        Icteric → liver disease / haemolysis<br>
        Congested/brick-red → polycythaemia, sepsis<br><br>
        <strong style="color:var(--tone-danger-fg);">Body condition + skin</strong><br>
        Cachexia → neoplasia, chronic disease<br>
        Pot belly + alopecia → HAC<br>
        (cortisol excess → hypertension)<br><br>
        <strong style="color:var(--tone-warning-fg);">Eyes</strong><br>
        Retinal haemorrhage / detachment<br>
        → hypertension (check BP)<br>
        Uveitis → systemic infection
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:12px;padding:10px 14px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.25);border-radius:12px;">
  <div style="font-size:10px;font-weight:700;color:var(--tone-info-fg);margin-bottom:4px;">💡 LATERALISING SIGNS — STRUCTURAL LESION</div>
  <div style="font-size:10px;color:var(--fg-blue-deep);line-height:1.6;">
    Unilateral CP deficits · Unilateral menace loss · Fixed / dilated pupil · Head turn / circling · Asymmetric hopping · Hemi-paresis — All indicate a focal lesion. Lesion is typically ipsilateral to the side of circling / CP deficits (forebrain) or contralateral (cerebellum). → Proceed to MRI.
  </div>
</div>`,
      },
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
      { kind: 'step', alt: true, text: 'TIER 1 — MINIMUM DATABASE (all seizure patients)' },
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
      { kind: 'branch', text: 'BLOODS ABNORMAL?' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
    <div class="dx-col">
      <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">YES → REACTIVE</div>
      <div class="dx-arrow">↓</div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">BG &lt;3.5 mmol/L → <strong>Hypoglycaemia</strong><br>→ Fasted insulin:glucose ratio (insulinoma)<br>→ PSS (toy breed, &lt;1yr)<br>→ Addison's, hepatic failure</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">↑ Bile acids / ↑ ammonia → <strong>Hepatic enceph.</strong><br>→ Abdominal US ± scintigraphy (PSS)<br>→ Liver biopsy if diffuse hepatopathy</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">iCa &lt;1.0 mmol/L → <strong>Hypocalcaemia</strong><br>→ Eclampsia (periparturient bitch)<br>→ Hypoparathyroidism · Ethylene glycol<br>→ Calcium gluconate IV (monitor ECG)</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">Na &lt;120 or &gt;170 mmol/L → <strong>Electrolyte</strong><br>→ Addison's (Na:K &lt;27) · DI · SIADH</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">↑ BUN/Cr markedly → <strong>Uraemic enceph.</strong><br>→ Fluids, phosphate binders, address cause</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">PCV &gt;60% → <strong>Polycythaemia</strong><br>→ Blood viscosity ↑ → phlebotomy<br>→ Check SpO₂, EPO</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;text-align:left;font-weight:400;">History of toxin/drug → <strong>Intoxication</strong><br>→ Decontaminate if recent (&lt;2h)<br>→ Toxicology screen (blood/urine)</div>
    </div>
    <div class="dx-col">
      <div class="dx-test" style="width:100%;text-align:center;font-weight:600;font-size:11px;">NO → TIER 2</div>
      <div class="dx-arrow">↓</div>
      <div class="dx-note" style="width:100%;font-size:9px;">Normal metabolic database → structural or idiopathic.<br>Proceed to advanced imaging.</div>
      <div style="height:6px;"></div>
      <div class="dx-note" style="width:100%;font-size:9px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.3);">
        <strong style="color:var(--tone-info-fg);">When to image (any of):</strong><br>
        • First seizure &lt;6mo or &gt;6yr<br>
        • Abnormal interictal neuro exam<br>
        • Cluster seizures / SE<br>
        • Focal onset or focal signs<br>
        • Progressive or increasing frequency<br>
        • Refractory to first AED<br>
        • Suspicion of structural cause
      </div>
    </div>
  </div>`,
      },
      { kind: 'step', alt: true, text: 'TIER 2 — ADVANCED IMAGING (structural vs idiopathic)' },
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
            html: `<strong>CSF analysis</strong><br>Collect under GA after MRI<br>TNCC (normal &lt;5 cells/μL)<br>Protein (normal &lt;0.25 g/L)<br>Cytology + culture if indicated`,
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
      <div class="dx-dx" style="width:100%;font-size:9px;">Extra-axial mass, enhancing → <strong>Meningioma</strong><br><em>(older cats; dolichocephalic dogs)</em></div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;">Intra-axial mass + peri-lesional oedema → <strong>Glioma</strong><br><em>(brachycephalics; older dogs)</em></div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;">↑ TNCC + protein → <strong>MUO / encephalitis</strong><br>→ Serology/PCR: Toxoplasma, Neospora, CDV,<br>Cryptococcus, FIP, Ehrlichia, Anaplasma</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;">Vascular territory, peracute → <strong>CVA (stroke)</strong><br>→ Check BP, thyroid (cats), cardiac (dogs)</div>
      <div style="height:3px;"></div>
      <div class="dx-dx" style="width:100%;font-size:9px;">Multifocal T2 lesions, eosinophilic CSF → <strong>Eosinophilic meningoencephalitis</strong><br>→ Parasitic / fungal / idiopathic</div>
    </div>
    <div class="dx-col">
      <div class="dx-test" style="width:100%;text-align:center;font-weight:600;font-size:10px;">NORMAL → IDIOPATHIC</div>
      <div class="dx-arrow">↓</div>
      <div class="dx-note" style="width:100%;font-size:9px;"><strong>Diagnosis of exclusion:</strong><br>Normal MRI + normal CSF +<br>normal metabolic database +<br>onset 6mo–6yr + normal interictal exam<br>= <strong>Idiopathic epilepsy</strong></div>
      <div class="dx-arrow">↓</div>
      <div class="dx-note" style="width:100%;font-size:9px;"><strong>Genetic testing (if available):</strong><br>DIRAS1 (Border Collie, Bernese Mountain Dog)<br>LGI2 (Lagotto Romagnolo)<br>ADAM23 (Irish Setter)<br>EPM2B (Miniature Wirehaired Dachshund)</div>
    </div>
  </div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:10px;padding:10px 14px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.25);border-radius:12px;">
  <div style="font-size:10px;font-weight:700;color:var(--tone-info-fg);margin-bottom:4px;">💡 MAINTENANCE AED — WHEN TO START</div>
  <div style="font-size:10px;color:var(--fg-blue-deep);line-height:1.6;">
    Start if ANY: cluster (≥2/24h) · SE has occurred · &gt;1 seizure/6 months · Increasing frequency or severity · Prolonged postictal (&gt;24h) · Structural disease confirmed<br>
    <strong>First-line:</strong> Phenobarbital 2–3 mg/kg q12h PO (dogs + cats) · KBr 30–40 mg/kg q24h PO (dogs ONLY — ⚠️ never cats) · Levetiracetam 20–30 mg/kg q8h PO (dogs + cats)<br>
    <strong>Monitor:</strong> Phenobarb serum level at 2–3 weeks; target 65–170 μmol/L (dogs), 65–130 μmol/L (cats); liver enzymes + fasted bile acids q6 months
  </div>
</div>`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ SE &gt;5min:</strong> Diazepam 0.5 mg/kg IV (×3) → Levetiracetam 20–60 mg/kg IV → Phenobarbital 2–5 mg/kg IV → Propofol CRI — see PROT-SEIZ`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
