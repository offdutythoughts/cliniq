// ── PU/PD — diagnostic approach (data) ──────────────────────────────────────
// Migration of renderDxPUPD{History,Exam,,Desmopressin}() (legacy inline render
// templates in ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach. Non-standard 4-tab nav (adds 💉 Desmopressin). See
// DATA_MIGRATION.md.

import type { DxApproach } from '../dxTypes'

export const pupdDx: DxApproach = {
  title: 'PU/PD',
  navVariant: 'pupd',
  nav: [
    { key: 'history', label: '📋 History' },
    { key: 'exam', label: '🩺 Exam' },
    { key: 'dx', label: '🔬 Diagnostics' },
    { key: 'desmopressin', label: '💉 Desmopressin' },
  ],
  tabs: {

  history: {
    title: 'History: PU/PD',
    blocks: [
      { kind: 'step', text: '📋 CONFIRM PU/PD — OWNER HISTORY' },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Is it truly PU/PD?</strong><br>
      • <strong>Pollakiuria</strong> — small frequent voids, urgency, straining → lower urinary tract disease (UTI, urolithiasis, FLUTD). Not polyuria.<br>
      • <strong>Urinary incontinence</strong> — involuntary leakage during sleep/rest → hormonal, neurological, anatomical. Not polydipsia.<br>
      • <strong>True PU/PD</strong> — large volume voiding, increased frequency with large volumes, owner reports drinking excessively<br>
      <div style="margin-top:8px;font-size:10px;opacity:.8;">📏 Thresholds (if owners measure): Dog &gt;100 ml/kg/day (urine) or &gt;100 ml/kg/day (water). Cat &gt;45 ml/kg/day urine output.</div>`,
      },
      { kind: 'step', alt: true, text: '📖 CHRONICITY + ONSET' },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Acute onset (&lt;1–2 weeks)</strong><br>
      • AKI (toxin, leptospirosis, lily, NSAID) — severe azotaemia possible<br>
      • Pyometra — intact female, post-oestrus; may present in shock<br>
      • DKA — diabetic ketoacidosis (existing or newly diagnosed DM)<br>
      • Hepatic toxin, acute pancreatitis<br>
      • Recent glucocorticoid or diuretic administration<br>
      <span style="font-size:10px;opacity:.75;">Acute severe PU/PD → check for emergency flags first.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Chronic / insidious onset</strong><br>
      • CKD — gradual progression; owners notice weight loss and water bowl refilling<br>
      • Hyperadrenocorticism — pot-belly, panting, polyphagia, hair loss — months-years<br>
      • DM — weight loss despite polyphagia; cataracts in dogs; hind-limb weakness in cats<br>
      • CDI / primary polydipsia — profound dilute urine, otherwise well<br>
      • Hyperthyroidism (cat) — weight loss, tachycardia, often concurrent CKD`,
      },
      { kind: 'step', alt: true, text: '📖 KEY SIGNALMENT CLUES' },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Age</strong><br>
      • Young (&lt;2 yr): CDI, primary NDI (rare), PSS, congenital DM — consider heritable cause<br>
      • Middle-aged dog: HAC (typical 7–12 yr), DM<br>
      • Older cat (&gt;8 yr): hyperthyroidism, CKD, DM — always check T4<br>
      <strong style="color:#FCD34D;">Breed</strong><br>
      • Poodle, Dachshund, Boxer, Beagle, Boston Terrier → HAC<br>
      • WHWT, Nova Scotia Duck Tolling Retriever, Gr. Dane → Addison's<br>
      • Young large breed dog → Primary polydipsia (psychogenic)<br>
      • Siamese, Burmese → DM (cat)<br>
      <strong style="color:#FCA5A5;">Sex / reproductive status</strong><br>
      • Intact female dog (mid-cycle or 4–8 wks post-oestrus) → <strong>Pyometra — emergency</strong><br>
      • Female dog 4–8 yr → HAC slightly overrepresented in females`,
      },
      { kind: 'step', alt: true, text: '📖 MEDICATION + EXPOSURE HISTORY' },
      {
        kind: 'check',
        html: `<strong style="color:#FCA5A5;">Iatrogenic causes — common and easily missed</strong><br>
      • <strong>Glucocorticoids</strong> (oral, injectable, topical, ear drops) → secondary NDI; most common iatrogenic cause<br>
      • <strong>Phenobarbitone / primidone</strong> (dogs) → hepatotoxicity + secondary PU/PD<br>
      • <strong>Diuretics</strong> (frusemide, spironolactone) → obligatory diuresis<br>
      • <strong>Lithium</strong> → primary NDI<br>
      • Recent megestrol acetate (cat) → DM induction<br>
      <strong style="color:#FCD34D;">Toxin / environmental</strong><br>
      • Ethylene glycol → AKI (acute, severe), crystalluria<br>
      • Lily ingestion (cats) → AKI<br>
      • Jerky treats, copper hepatopathy → Fanconi / glucosuria with normoglycaemia<br>
      • Grapes / raisins (dogs) → AKI<br>
      <strong style="color:#93C5FD;">Vaccination + outdoor access</strong><br>
      • Unvaccinated, outdoor, water access → <strong>Leptospirosis</strong> (zoonotic — PPE!)`,
      },
      { kind: 'step', alt: true, text: '📖 CONCURRENT SIGNS — NARROW THE DIFFERENTIAL' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 10px;font-size:10px;line-height:1.5;">
        <div><strong style="color:#FCA5A5;">Polyphagia + PU/PD</strong><br>HAC (dog) · DM · Hyperthyroidism (cat)</div>
        <div><strong style="color:#FCA5A5;">Weight loss + polyphagia</strong><br>DM · Hyperthyroidism (cat) · Acromegaly (cat)</div>
        <div><strong style="color:#FCD34D;">Pot-belly + panting</strong><br>HAC — high suspicion</div>
        <div><strong style="color:#FCD34D;">Waxing/waning illness</strong><br>Hypoadrenocorticism · CKD · PSS</div>
        <div><strong style="color:#6EE7B7;">Intact female + systemic signs</strong><br>Pyometra — rule out immediately</div>
        <div><strong style="color:#6EE7B7;">Young + stunted + neurological</strong><br>PSS (portosystemic shunt)</div>
        <div><strong style="color:#93C5FD;">Constipation + weakness</strong><br>Hypercalcaemia</div>
        <div><strong style="color:#93C5FD;">Hind-limb weakness (cat)</strong><br>Hypokalemia · Acromegaly (DM)</div>
        <div><strong style="color:#C4B5FD;">Profound PU/PD — otherwise well</strong><br>CDI · Primary polydipsia</div>
        <div><strong style="color:#C4B5FD;">Nocturia preference for cold water</strong><br>CDI — high suspicion</div>
      </div>`,
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  exam: {
    title: 'Exam: PU/PD',
    blocks: [
      { kind: 'step', text: '🩺 PHYSICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Hydration + Cardiovascular</strong><br>
      • Dehydration (skin tent, dry MM, sunken eyes) → obligate losses (DM, CKD, HAC)<br>
      • Tachycardia + weak pulses → septic shock (pyometra), haemorrhage, Addisonian crisis<br>
      • <strong>Bradycardia</strong> → hyperkalaemia → classical Addison's disease (Na:K &lt;27)<br>
      • Hypertension on indirect BP → CKD, HAC, DM, hyperthyroidism (cat) — check in all PU/PD patients`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Body Condition + Weight</strong><br>
      • <strong>Pot-belly + muscle wasting + overweight</strong> → HAC — classic presentation<br>
      • <strong>Weight loss + muscle wasting</strong> → DM, CKD, hyperthyroidism (cat), lymphoma, acromegaly<br>
      • <strong>Large body frame (cat)</strong> → Acromegaly — broad head, large paws, prognathia<br>
      • <strong>Young + stunted growth</strong> → PSS (portosystemic shunt)`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCA5A5;">Skin + Coat</strong><br>
      • <strong>Truncal alopecia (symmetrical, non-pruritic)</strong> → HAC<br>
      • <strong>Calcinosis cutis</strong> (white/yellow firm plaques, neck/groin) → HAC — specific but not sensitive<br>
      • <strong>Thin, inelastic skin</strong> → HAC (collagen loss from cortisol excess)<br>
      • <strong>Unkempt, poor coat quality</strong> → hyperthyroidism (cat), malnutrition (CKD, PSS)`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Abdominal Palpation</strong><br>
      • <strong>Hepatomegaly</strong> → HAC (vacuolar hepatopathy), DM, hyperthyroidism, PSS<br>
      • <strong>Renomegaly / irregular kidneys</strong> → CKD (end-stage: small kidneys), lymphoma, PKD (cats)<br>
      • <strong>Painful kidneys</strong> → AKI (toxin, leptospirosis), pyelonephritis<br>
      • <strong>Uterine distension</strong> (intact female) → Pyometra — may be subtle in closed pyometra<br>
      • <strong>Fluid wave</strong> → ascites (PSS, hepatic failure, hypoalbuminaemia)<br>
      • <strong>Microhepatica</strong> → PSS (portosystemic shunt), hepatic atrophy`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#93C5FD;">Eyes</strong><br>
      • <strong>Cataracts</strong> (dog) → DM — bilateral, rapidly progressive in dogs with poorly regulated DM<br>
      • <strong>Retinal haemorrhage / detachment</strong> → systemic hypertension (CKD, HAC, DM, hyperthyroidism)<br>
      • <strong>Uveitis</strong> → leptospirosis, lymphoma (paraneoplastic), hypertension, DM<br>
      • <strong>Dilated unresponsive pupils</strong> (cat) → hypertensive retinopathy — measure BP immediately`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Neck — Thyroid</strong><br>
      • <strong>Palpable thyroid nodule(s)</strong> (ventral neck, cat) → Hyperthyroidism — most cats &gt;8 yr<br>
      • Bilateral = toxic multinodular goitre (most common); unilateral = adenoma or carcinoma`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCA5A5;">Rectal Examination — mandatory in all PU/PD dogs</strong><br>
      • <strong>Anal sac mass</strong> → AGASACA — 27–53% cause paraneoplastic hypercalcaemia → secondary NDI<br>
      • Examine even without perineal swelling — small masses easily missed<br>
      • Peripheral lymphadenopathy → lymphoma (T-cell with hypercalcaemia most common)`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#C4B5FD;">Neurological</strong><br>
      • <strong>Altered mentation / hepatic encephalopathy signs</strong> → PSS, hepatic failure<br>
      • <strong>Generalised muscle weakness</strong> → hypokalaemia (cat: ventroflexion), hypoadrenocorticism<br>
      • Plantigrade stance (cat) → diabetic neuropathy<br>
      • Neurological signs + head trauma history → CDI (hypothalamic damage)`,
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  dx: {
    title: 'Dx: PU/PD',
    blocks: [
      { kind: 'step', text: '🔬 STEP 1 — URINALYSIS (first, before IV fluids)' },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Serial USG — 3–5 samples on different days/times</strong><br><br>
      <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:5px 8px;font-size:10px;line-height:1.4;">
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">USG</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">Interpretation</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">Consider</div>
        <div style="color:#6EE7B7;white-space:nowrap;">&gt;1.030 dog<br>&gt;1.035 cat</div>
        <div>Concentrated — not obligate PU/PD</div>
        <div style="font-size:9.5px;">Glucosuria? → DM can raise USG artificially. ≥1 concentrated sample → Primary polydipsia possible.</div>
        <div style="color:#FCD34D;">1.013–1.029</div>
        <div>Partially concentrated</div>
        <div style="font-size:9.5px;">HAC · early CKD · primary polydipsia</div>
        <div style="color:#FB923C;">1.008–1.012</div>
        <div>Isosthenuric</div>
        <div style="font-size:9.5px;">CKD · HAC · Addison's medullary washout · pyelonephritis</div>
        <div style="color:#F87171;">&lt;1.008</div>
        <div>Hyposthenuric</div>
        <div style="font-size:9.5px;">CDI · NDI · primary polydipsia · severe HAC</div>
      </div>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Dipstick + sediment</strong><br>
      • Glucosuria + <em>hyperglycaemia</em> → DM (osmotic diuresis; glucose &gt;180 mg/dL dog, &gt;270 cat)<br>
      • Glucosuria + <em>normoglycaemia</em> → renal glucosuria / Fanconi (jerky treats, copper hepatopathy)<br>
      • Active sediment (WBC casts, bacteriuria) → pyelonephritis — culture regardless<br>
      • Ammonium biurate crystals → PSS — young dog`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — MINIMUM DATABASE + IMAGING' },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Biochemistry:</strong> BUN · Cr · SDMA · phosphate · Ca²⁺ · K⁺ · Na⁺ · glucose · ALP · ALT · albumin · cholesterol<br>
      <strong style="color:#FCD34D;">Haematology:</strong> CBC — absent stress leukogram in sick dog → Addison's. Leucocytosis + left shift → infectious.<br>
      <strong style="color:#FCD34D;">T4:</strong> ALL cats &gt;7 yr. Free T4 by equilibrium dialysis if total T4 equivocal.<br>
      <strong style="color:#FCD34D;">BP:</strong> Indirect measurement — all PU/PD patients.<br>
      <strong style="color:#FCD34D;">Urine culture:</strong> All PU/PD patients (pyelonephritis often presents without localising signs).<br>
      <strong style="color:#FCD34D;">Abdominal US:</strong> Adrenal size · uterus (closed pyometra) · kidney architecture · hepatic pattern · lymph nodes`,
      },
      {
        kind: 'html',
        html: `<!-- CLASSIFY -->
    <div class="dx-step" style="background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.45);color:#C7D2FE;">CLASSIFY — PRIMARY POLYURIA vs PRIMARY POLYDIPSIA</div>`,
      },
      {
        kind: 'html',
        html: `<!-- Primary Polydipsia block -->
    <div style="border:1.5px solid rgba(16,185,129,0.4);border-radius:12px;padding:12px 14px;background:rgba(16,185,129,0.06);">
      <div style="font-size:12px;font-weight:700;color:#6EE7B7;margin-bottom:8px;">💧 PRIMARY POLYDIPSIA <span style="font-weight:400;font-size:10px;color:var(--gray);">— excessive drinking drives secondary polyuria</span></div>

      <div style="font-size:10px;color:var(--gray);margin-bottom:8px;line-height:1.5;">
        <strong style="color:var(--white);">USG clue:</strong> At least 1 sample concentrated (&gt;1.030 dog / &gt;1.035 cat) · Plasma Na⁺ low-normal or low (dilutional)
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
        <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-PRIM','Primary polydipsia')" style="font-size:10px;background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.35);cursor:pointer;">
          <strong>Psychogenic / behavioural</strong><br>
          <span style="font-weight:400;font-size:9.5px;">Young large-breed dog · variable USG · no systemic illness · dilutional hyponatraemia. Diagnosis of exclusion.</span>
        </div>
        <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:10px;background:rgba(16,185,129,0.12);border-color:rgba(16,185,129,0.35);cursor:pointer;">
          <strong>Hepatic encephalopathy</strong><br>
          <span style="font-weight:400;font-size:9.5px;">PSS / hepatic failure. Low BUN, ammonium biurate crystals, neurological signs. Bile acids confirm.</span>
        </div>
      </div>
    </div>`,
      },
      {
        kind: 'html',
        html: `<!-- Primary Polyuria block -->
    <div style="border:1.5px solid rgba(99,102,241,0.4);border-radius:12px;padding:12px 14px;background:rgba(99,102,241,0.06);">
      <div style="font-size:12px;font-weight:700;color:#C7D2FE;margin-bottom:8px;">🚰 PRIMARY POLYURIA <span style="font-weight:400;font-size:10px;color:var(--gray);">— kidney produces excess urine → compensatory thirst</span></div>

      <div style="font-size:10px;color:var(--gray);margin-bottom:10px;line-height:1.5;">
        <strong style="color:var(--white);">USG clue:</strong> Consistently dilute or isosthenuric · Plasma Na⁺ high-normal or elevated (free water loss)
      </div>

      <!-- Primary causes -->
      <div style="font-size:10.5px;font-weight:700;color:#C7D2FE;margin-bottom:6px;padding:4px 8px;background:rgba(99,102,241,0.15);border-radius:6px;">PRIMARY causes <span style="font-weight:400;font-size:9.5px;color:var(--gray);">— intrinsic ADH pathway failure</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px;">
        <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-CDI','Central DI')" style="font-size:10px;background:rgba(99,102,241,0.12);border-color:rgba(99,102,241,0.4);cursor:pointer;">
          <strong>Central DI (CDI)</strong><br>
          <span style="font-weight:400;font-size:9.5px;">ADH deficiency. Idiopathic (most common) · head trauma · neoplasia · cysts. USG &lt;1.007 consistently. Na⁺ high-normal. → MRI brain + desmopressin trial.</span>
        </div>
        <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-NDI','Nephrogenic DI')" style="font-size:10px;background:rgba(99,102,241,0.12);border-color:rgba(99,102,241,0.4);cursor:pointer;">
          <strong>Primary NDI</strong><br>
          <span style="font-weight:400;font-size:9.5px;">Congenital ADH receptor defect — extremely rare. Fails desmopressin trial completely. Diagnosis of exclusion after all secondary NDI causes excluded.</span>
        </div>
      </div>

      <!-- Secondary causes -->
      <div style="font-size:10.5px;font-weight:700;color:#FCD34D;margin-bottom:8px;padding:4px 8px;background:rgba(217,119,6,0.15);border-radius:6px;">SECONDARY causes <span style="font-weight:400;font-size:9.5px;color:var(--gray);">— underlying disease drives polyuria</span></div>

      <!-- Endocrine -->
      <div style="margin-bottom:6px;">
        <div style="font-size:10px;font-weight:700;color:#C4B5FD;margin-bottom:4px;">⚗️ Endocrine</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>HAC (Cushing's)</strong> <span style="font-size:8.5px;color:var(--gray);">Dog · most common secondary NDI</span><br>
            <span style="font-weight:400;">↑ ALP · polyphagia · pot-belly · USG &lt;1.015 → LDDST / UCCR. Rule out before desmopressin trial.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>Diabetes mellitus</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · osmotic diuresis</span><br>
            <span style="font-weight:400;">Glucosuria + hyperglycaemia. Cataracts (dog). Neuropathy (cat). → fructosamine.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>Hypoadrenocorticism</strong> <span style="font-size:8.5px;color:var(--gray);">Dog · medullary washout</span><br>
            <span style="font-weight:400;">Na:K &lt;27 (classical). No stress leukogram (atypical) → basal cortisol &lt;55 nmol/L → ACTH stim.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>Hypercalcaemia</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · secondary NDI</span><br>
            <span style="font-weight:400;">↑ Ca²⁺ &gt;3.0 mmol/L → iCa + PTH + PTHrP. Rectal exam (AGASACA 27–53% hypercalcaemic). Lymphoma.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>Hyperthyroidism</strong> <span style="font-size:8.5px;color:var(--gray);">Cat &gt;7 yr · primary polydipsia</span><br>
            <span style="font-weight:400;">↑ T4 · weight loss · tachycardia · thyroid nodule. Masks CKD → recheck renal after treatment.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-ENDO','Endocrine')" style="font-size:9.5px;background:rgba(139,92,246,0.1);border-color:rgba(139,92,246,0.35);cursor:pointer;">
            <strong>Acromegaly</strong> <span style="font-size:8.5px;color:var(--gray);">Cat · GH excess → insulin-resistant DM</span><br>
            <span style="font-weight:400;">Large frame · broad head · poorly regulated DM. → IGF-1.</span>
          </div>
        </div>
      </div>

      <!-- Renal -->
      <div style="margin-bottom:6px;">
        <div style="font-size:10px;font-weight:700;color:#93C5FD;margin-bottom:4px;">🫘 Renal</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-RENAL','Renal / Urinary')" style="font-size:9.5px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.35);cursor:pointer;">
            <strong>CKD</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · lost concentrating ability</span><br>
            <span style="font-weight:400;">Isosthenuria · azotaemia · ↑ SDMA (early). IRIS stage → UP/C + BP substage.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-RENAL','Renal / Urinary')" style="font-size:9.5px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.35);cursor:pointer;">
            <strong>AKI</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · acute / toxin</span><br>
            <span style="font-weight:400;">Acute onset · toxin (lily, EG, NSAIDs, leptospirosis). Painful kidneys. Oligo/anuria or paradoxical PU.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-RENAL','Renal / Urinary')" style="font-size:9.5px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.35);cursor:pointer;">
            <strong>Pyelonephritis</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · E. coli NDI</span><br>
            <span style="font-weight:400;">Fever · painful kidneys · active sediment · leucocytosis. → Urine C&amp;S (cystocentesis). Renal US.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-RENAL','Renal / Urinary')" style="font-size:9.5px;background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.35);cursor:pointer;">
            <strong>Renal glucosuria / Fanconi</strong> <span style="font-size:8.5px;color:var(--gray);">Dog · osmotic diuresis</span><br>
            <span style="font-weight:400;">Glucosuria + normal blood glucose. Jerky treats · copper hepatopathy. → Urine amino acids.</span>
          </div>
        </div>
      </div>

      <!-- Systemic -->
      <div>
        <div style="font-size:10px;font-weight:700;color:#FED7AA;margin-bottom:4px;">🏥 Systemic / Hepatic</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>Pyometra</strong> <span style="font-size:8.5px;color:#F87171;">⚠️ EMERGENCY · Intact ♀</span><br>
            <span style="font-weight:400;">E. coli endotoxin → secondary NDI. 4–8 wk post-oestrus. May lack discharge (closed). → US abdomen immediately.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>PSS / Hepatic failure</strong> <span style="font-size:8.5px;color:var(--gray);">Dog · medullary washout</span><br>
            <span style="font-weight:400;">Low BUN · low albumin · ammonium biurate. Young dog · stunted · HE signs. → Bile acids · US · CT angio.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>Leptospirosis</strong> <span style="font-size:8.5px;color:#F87171;">⚠️ ZOONOTIC — PPE</span><br>
            <span style="font-weight:400;">Unvaccinated outdoor dog. Acute AKI/hepatic injury · fever · jaundice · uveitis. → MAT titres + urine PCR.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>Hypokalemia</strong> <span style="font-size:8.5px;color:var(--gray);">Dog + Cat · secondary NDI</span><br>
            <span style="font-weight:400;">K⁺ &lt;3.5 mmol/L. Muscle weakness · ventroflexion (cat). Impairs aquaporin insertion. Correct underlying cause.</span>
          </div>
        </div>
      </div>
    </div>`,
      },
      { kind: 'step', alt: true, text: 'IF DATABASE NORMAL — SERIAL USG + PLASMA Na⁺ → DESMOPRESSIN' },
      {
        kind: 'check',
        html: `• ≥1 USG &gt;1.030 (dog) / &gt;1.035 (cat) + Na⁺ low-normal → <strong>Primary polydipsia</strong><br>
      • All USG &lt;1.007 + Na⁺ high-normal → <strong>CDI vs NDI</strong> → desmopressin trial<br>
      <div style="margin-top:8px;">
        <div class="dx-dx" onclick="renderDxPUPDDesmopressin()" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.45);cursor:pointer;">💉 → Desmopressin Trial protocol</div>
      </div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
    <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS</div>
    <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
      Intact female + systemic signs (pyometra) · Severe azotaemia + oliguria (AKI) · Addisonian crisis / DKA / sepsis · Hyponatraemia &lt;125 mEq/L · Acute blindness (hypertensive retinal detachment) · Leptospirosis (PPE + isolate)
    </div>
  </div>`,
      },
      {
        kind: 'html',
        html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px;">
    <div style="font-size:10px;color:var(--gray);line-height:1.6;">
      💡 <strong style="color:var(--white);">Rectal exam every PU/PD dog</strong> — AGASACA causes hypercalcaemia-induced NDI; easily missed without it.<br>
      💡 <strong style="color:var(--white);">Rule out HAC before desmopressin</strong> — partial response in HAC mimics partial CDI.<br>
      💡 <strong style="color:var(--white);">Absent stress leukogram</strong> in sick dog → atypical Addison's — basal cortisol first.<br>
      💡 <strong style="color:var(--white);">T4 every cat &gt;7 yr</strong> — hyperthyroidism masks CKD by raising GFR; always recheck renal after treatment.
    </div>
  </div>`,
      },
      { kind: 'html', html: `<div class="disclaimer">Lunn &amp; James 2007, Schmid 2023. For qualified veterinary professionals only.</div>` },
    ],
  },

  desmopressin: {
    title: 'Desmopressin Trial: PU/PD',
    blocks: [
      {
        kind: 'html',
        html: `<div class="dx-step" style="background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.45);color:#C7D2FE;">💉 DESMOPRESSIN (DDAVP) RESPONSE TRIAL</div>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCA5A5;">⚠️ BEFORE STARTING — absolute prerequisites</strong><br>
      • Minimum database complete (biochemistry, haematology, urinalysis)<br>
      • <strong>Hyperadrenocorticism excluded</strong> — some HAC dogs partially respond to DDAVP → false CDI diagnosis<br>
      • <strong>Pyometra excluded</strong> (ultrasound or confirmed spayed)<br>
      • <strong>Hypercalcaemia excluded</strong> (total Ca²⁺ checked)<br>
      • Patient is <strong>not hyponatraemic</strong> (Na &lt;145 mEq/L) → desmopressin in primary polydipsia → severe hyponatraemia → death<br>
      • Patient is <strong>not azotaemic</strong> without knowing cause<br>
      • Patient has <strong>free access to water at all times</strong> during the trial — NEVER restrict water`,
      },
      { kind: 'step', alt: true, text: 'BASELINE MEASUREMENTS (Day 0)' },
      {
        kind: 'check',
        html: `• <strong>Serial USG</strong> — minimum 3–5 samples (different days); confirm all are &lt;1.007 for CDI/NDI workup<br>
      • <strong>Plasma sodium</strong> — baseline (repeat at Day 5–7)<br>
      • <strong>Water intake</strong> — owner to measure daily (ml/kg/day)<br>
      • <strong>Bodyweight</strong> — monitor for water retention<br>
      <span style="font-size:10px;opacity:.75;">📝 Instruct owner to record water intake carefully — the most sensitive response indicator.</span>`,
      },
      { kind: 'step', alt: true, text: 'DESMOPRESSIN ADMINISTRATION' },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Dog:</strong><br>
      • <strong>Oral DDAVP tablets:</strong> 0.05–0.1 mg (50–100 µg) PO q8–12h<br>
      • <strong>Conjunctival drops (ophthalmic):</strong> 1–2 drops into conjunctival sac q12–24h (0.01% solution = 10 µg/drop)<br>
      • <strong>Intranasal solution used conjunctivally:</strong> 1–2 drops q12h (if ophthalmic not available)<br><br>
      <strong style="color:#FCD34D;">Cat:</strong><br>
      • <strong>Conjunctival drops:</strong> 1–2 drops q12–24h<br>
      • Oral DDAVP less predictable in cats — conjunctival route preferred<br><br>
      <span style="font-size:10px;opacity:.8;">Duration: <strong>5–7 days</strong> for full response assessment. USG checked Days 3–4 then Day 7.</span>`,
      },
      { kind: 'step', alt: true, text: 'INTERPRETING RESPONSE (Day 5–7)' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px 10px;font-size:10px;line-height:1.4;">
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">USG response</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">Water intake</div>
        <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.25);padding-bottom:3px;">Interpretation</div>
        <div style="color:#6EE7B7;">USG increases to &gt;1.015<br>(ideally &gt;1.025)</div>
        <div style="color:#6EE7B7;">↓ significantly (&gt;50%)</div>
        <div><strong>CDI confirmed</strong><br>ADH-responsive collecting duct → commence long-term DDAVP</div>
        <div style="color:#FCA5A5;">USG remains &lt;1.007<br>No change</div>
        <div style="color:#FCA5A5;">No change</div>
        <div><strong>Primary NDI</strong><br>Collecting duct unresponsive to ADH — treat underlying cause</div>
        <div style="color:#FCD34D;">USG already &gt;1.030 (dog)<br>/ &gt;1.035 (cat)</div>
        <div style="color:#FCD34D;">↓ or unchanged</div>
        <div><strong>Primary polydipsia</strong><br>Patient was concentrating urine all along — medullary washout may blur earlier readings</div>
        <div style="color:#C4B5FD;">Partial response<br>(USG 1.008–1.015)</div>
        <div style="color:#C4B5FD;">Mild ↓</div>
        <div><strong>Partial CDI</strong> or secondary NDI<br>Rule out HAC (most common secondary NDI) — treat underlying cause and retest</div>
      </div>`,
      },
      { kind: 'step', alt: true, text: 'MONITORING DURING TRIAL' },
      {
        kind: 'check',
        html: `• <strong>Bodyweight daily</strong> — weight gain &gt;5% → water retention → reduce dose or discontinue<br>
      • <strong>Plasma sodium Day 5–7</strong> — hyponatraemia developing → primary polydipsia (overdrinking + ADH effect) → stop immediately<br>
      • <strong>Oedema / ascites</strong> — rare with physiological DDAVP doses; more likely if primary polydipsia misclassified<br>
      <div style="margin-top:8px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-left:3px solid #F87171;border-radius:8px;padding:8px 10px;font-size:10.5px;">
        <span style="font-weight:700;color:#F87171;">⚠️ STOP IMMEDIATELY IF:</span> Plasma Na falls &lt;140 mEq/L · Bodyweight gain &gt;5% · Oedema develops · Owner stops measuring water and patient appears more depressed
      </div>`,
      },
      { kind: 'step', alt: true, text: 'CDI CONFIRMED — LONG-TERM MANAGEMENT' },
      {
        kind: 'check',
        html: `• Continue DDAVP at effective trial dose — titrate to lowest effective dose<br>
      • <strong>MRI brain</strong> — mandatory to identify structural cause (neoplasia, cysts, inflammation)<br>
      • <strong>Dog DDAVP dose:</strong> 0.05–0.1 mg PO q8–12h or 1–2 conjunctival drops q12–24h<br>
      • <strong>Cat:</strong> 1 conjunctival drop q12–24h; adjust based on USG monitoring<br>
      • Recheck USG + plasma Na + water intake every 4–6 weeks until stable, then every 3–6 months<br>
      • Ensure free access to water at ALL times — water restriction with DDAVP is dangerous`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:8px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:10px;">
    <div style="font-size:10px;color:var(--gray);line-height:1.6;">
      💡 <strong style="color:var(--white);">Rule out HAC first</strong> — most common pitfall. HAC dogs can partially respond to DDAVP and be misdiagnosed as partial CDI.<br>
      💡 <strong style="color:var(--white);">Hyponatraemia = STOP</strong> — it means primary polydipsia; continuing DDAVP risks life-threatening hyponatraemia.<br>
      💡 <strong style="color:var(--white);">Conjunctival drops</strong> — place in conjunctival sac; nasal solution used off-label this way is effective and less expensive than ophthalmic preparation.<br>
      💡 <strong style="color:var(--white);">MRI is essential in CDI</strong> — idiopathic CDI is a diagnosis of exclusion; structural causes (neoplasia, cysts) must be ruled out.
    </div>
  </div>`,
      },
      { kind: 'html', html: `<div class="disclaimer">Lunn &amp; James 2007, Schmid 2023, Nelson &amp; Couto 2024. For qualified veterinary professionals only.</div>` },
    ],
  },

  },
}
