// ── PU/PD — diagnostic approach (data) ──────────────────────────────────────
// Migration of renderDxPUPD{History,Exam,,Desmopressin}() (legacy inline render
// templates in ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach. Non-standard 4-tab nav (adds 💉 Desmopressin).

import type { DxApproach } from '../dxTypes'
import { numBadge } from './shared/dxHelpers'

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
      { kind: 'step', text: '📋 STEP 1 — CONFIRM PU/PD (owner history)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Presentation', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Pollakiuria</strong>', { text: 'Small frequent voids · urgency · straining → lower urinary tract disease (UTI · urolithiasis · FLUTD). <strong>Not polyuria</strong>', tone: 'warning' }],
          ['<strong>Urinary incontinence</strong>', { text: 'Involuntary leakage during sleep or rest → hormonal · neurological · anatomical. <strong>Not polydipsia</strong>', tone: 'warning' }],
          ['<strong>True PU/PD</strong>', { text: 'Large-volume voiding · increased frequency <em>with</em> large volumes · owner reports drinking excessively', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: '📏 Thresholds (if owners measure)',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Definition', { text: 'Threshold', tone: 'teal' }],
        rows: [
          ['<strong>Polydipsia</strong>', { text: 'Water intake &gt;100 mL/kg/day (🐕; normal usually &lt;80) · &gt;50 mL/kg/day (🐱, ≈&gt;200 mL/cat/day)', tone: 'teal' }],
          ['<strong>Polyuria</strong>', { text: 'Urine output &gt;50 mL/kg/day (both species)', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📖 STEP 2 — CHRONICITY + ONSET', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Onset', { text: 'Differential', tone: 'teal' }],
        rows: [
          ['<strong>Acute (&lt;1–2 weeks)</strong>', { text: 'AKI (toxin · leptospirosis · lily · NSAID — severe azotaemia possible) · pyometra (intact female, post-oestrus; may present in shock) · DKA · hepatic toxin · acute pancreatitis · recent glucocorticoid or diuretic administration', tone: 'green' }],
          ['<strong>Acute severe PU/PD</strong>', { text: '<strong>Check for emergency flags first</strong>', tone: 'danger' }],
          ['<strong>Chronic / insidious</strong>', { text: 'CKD (gradual; owners notice weight loss and the water bowl refilling) · hyperadrenocorticism (pot-belly · panting · polyphagia · hair loss over months–years) · DM (weight loss despite polyphagia; cataracts in 🐕; hind-limb weakness in 🐱) · CDI / primary polydipsia (profound dilute urine, otherwise well) · hyperthyroidism (🐱 — weight loss · tachycardia · often concurrent CKD)', tone: 'warning' }],
        ],
      },

      { kind: 'step', text: '🐾 STEP 3 — KEY SIGNALMENT CLUES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Young (&lt;2 yr)</strong>', { text: 'CDI · primary NDI (rare) · PSS · congenital DM — consider a heritable cause', tone: 'green' }],
          ['<strong>Middle-aged dog</strong>', { text: 'HAC (typically 7–12 yr) · DM', tone: 'green' }],
          ['<strong>Older cat (&gt;8 yr)</strong>', { text: 'Hyperthyroidism · CKD · DM — <strong>always check T4</strong>', tone: 'green' }],
          ['<strong>Poodle · Dachshund · Boxer · Beagle · Boston Terrier</strong>', { text: 'HAC', tone: 'warning' }],
          ['<strong>WHWT · Nova Scotia Duck Tolling Retriever · Great Dane</strong>', { text: 'Addison\'s', tone: 'warning' }],
          ['<strong>Young large-breed dog</strong>', { text: 'Primary polydipsia (psychogenic)', tone: 'warning' }],
          ['<strong>Siamese · Burmese</strong>', { text: 'DM (🐱)', tone: 'warning' }],
          ['<strong>Intact female dog</strong> — mid-cycle or 4–8 wks post-oestrus', { text: '<strong>Pyometra — emergency</strong>', tone: 'danger' }],
          ['<strong>Female dog 4–8 yr</strong>', { text: 'HAC slightly overrepresented in females', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '💊 STEP 4 — MEDICATION + EXPOSURE HISTORY', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Iatrogenic causes — common and easily missed',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Agent', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>Glucocorticoids</strong> — oral · injectable · topical · ear drops', { text: 'Secondary NDI — <strong>the most common iatrogenic cause</strong>', tone: 'danger' }],
          ['<strong>Phenobarbitone / primidone</strong> (🐕)', { text: 'Hepatotoxicity + secondary PU/PD', tone: 'danger' }],
          ['<strong>Diuretics</strong> — frusemide · spironolactone', { text: 'Obligatory diuresis', tone: 'danger' }],
          ['<strong>Lithium</strong>', { text: 'Primary NDI', tone: 'danger' }],
          ['<strong>Recent megestrol acetate</strong> (🐱)', { text: 'DM induction', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Toxin / environmental · vaccination + outdoor access',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Exposure', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>Ethylene glycol</strong>', { text: 'AKI — acute, severe · crystalluria', tone: 'warning' }],
          ['<strong>Lily ingestion</strong> (🐱)', { text: 'AKI', tone: 'warning' }],
          ['<strong>Jerky treats · copper hepatopathy</strong>', { text: 'Fanconi / glucosuria with normoglycaemia', tone: 'warning' }],
          ['<strong>Grapes / raisins</strong> (🐕)', { text: 'AKI', tone: 'warning' }],
          ['<strong>Unvaccinated · outdoor · water access</strong>', { text: '<strong>Leptospirosis</strong> — zoonotic, PPE!', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '🔍 STEP 5 — CONCURRENT SIGNS: NARROW THE DIFFERENTIAL', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Concurrent sign', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Polyphagia + PU/PD</strong>', { text: 'HAC (🐕) · DM · hyperthyroidism (🐱)', tone: 'danger' }],
          ['<strong>Weight loss + polyphagia</strong>', { text: 'DM · hyperthyroidism (🐱) · acromegaly (🐱)', tone: 'danger' }],
          ['<strong>Pot-belly + panting</strong>', { text: 'HAC — high suspicion', tone: 'warning' }],
          ['<strong>Waxing/waning illness</strong>', { text: 'Hypoadrenocorticism · CKD · PSS', tone: 'warning' }],
          ['<strong>Intact female + systemic signs</strong>', { text: 'Pyometra — rule out immediately', tone: 'green' }],
          ['<strong>Young + stunted + neurological</strong>', { text: 'PSS (portosystemic shunt)', tone: 'green' }],
          ['<strong>Constipation + weakness</strong>', { text: 'Hypercalcaemia', tone: 'info' }],
          ['<strong>Hind-limb weakness</strong> (🐱)', { text: 'Hypokalaemia · acromegaly (DM)', tone: 'info' }],
          ['<strong>Profound PU/PD — otherwise well</strong>', { text: 'CDI · primary polydipsia', tone: 'violet' }],
          ['<strong>Nocturia · preference for cold water</strong>', { text: 'CDI — high suspicion', tone: 'violet' }],
        ],
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  exam: {
    title: 'Exam: PU/PD',
    blocks: [
      { kind: 'step', text: '🩺 PHYSICAL EXAMINATION', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Hydration + cardiovascular',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Dehydration</strong> — skin tent · dry MM · sunken eyes', { text: 'Obligate losses — DM · CKD · HAC', tone: 'green' }],
          ['<strong>Tachycardia + weak pulses</strong>', { text: 'Septic shock (pyometra) · haemorrhage · Addisonian crisis', tone: 'green' }],
          ['<strong>Bradycardia</strong>', { text: 'Hyperkalaemia → <strong>classical Addison\'s disease</strong> (Na:K &lt;27)', tone: 'danger' }],
          ['<strong>Hypertension on indirect BP</strong>', { text: 'CKD · HAC · DM · hyperthyroidism (🐱) — <strong>check in all PU/PD patients</strong>', tone: 'green' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Body condition + weight',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pot-belly + muscle wasting + overweight</strong>', { text: 'HAC — the classic presentation', tone: 'warning' }],
          ['<strong>Weight loss + muscle wasting</strong>', { text: 'DM · CKD · hyperthyroidism (🐱) · lymphoma · acromegaly', tone: 'warning' }],
          ['<strong>Large body frame</strong> (🐱)', { text: 'Acromegaly — broad head · large paws · prognathia', tone: 'warning' }],
          ['<strong>Young + stunted growth</strong>', { text: 'PSS (portosystemic shunt)', tone: 'warning' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Skin + coat',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Truncal alopecia</strong> — symmetrical, non-pruritic', { text: 'HAC', tone: 'danger' }],
          ['<strong>Calcinosis cutis</strong> — white/yellow firm plaques, neck / groin', { text: 'HAC — specific but not sensitive', tone: 'danger' }],
          ['<strong>Thin, inelastic skin</strong>', { text: 'HAC — collagen loss from cortisol excess', tone: 'danger' }],
          ['<strong>Unkempt, poor coat quality</strong>', { text: 'Hyperthyroidism (🐱) · malnutrition (CKD · PSS)', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Abdominal palpation',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Hepatomegaly</strong>', { text: 'HAC (vacuolar hepatopathy) · DM · hyperthyroidism · PSS', tone: 'warning' }],
          ['<strong>Renomegaly / irregular kidneys</strong>', { text: 'CKD (end-stage: small kidneys) · lymphoma · PKD (🐱)', tone: 'warning' }],
          ['<strong>Painful kidneys</strong>', { text: 'AKI (toxin · leptospirosis) · pyelonephritis', tone: 'warning' }],
          ['<strong>Uterine distension</strong> (intact female)', { text: '<strong>Pyometra</strong> — may be subtle in closed pyometra', tone: 'danger' }],
          ['<strong>Fluid wave</strong>', { text: 'Ascites — PSS · hepatic failure · hypoalbuminaemia', tone: 'warning' }],
          ['<strong>Microhepatica</strong>', { text: 'PSS · hepatic atrophy', tone: 'warning' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Eyes · neck · rectal · neurological',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Cataracts</strong> (🐕)', { text: 'DM — bilateral, rapidly progressive with poorly regulated DM', tone: 'info' }],
          ['<strong>Retinal haemorrhage / detachment</strong>', { text: 'Systemic hypertension — CKD · HAC · DM · hyperthyroidism', tone: 'info' }],
          ['<strong>Uveitis</strong>', { text: 'Leptospirosis · lymphoma (paraneoplastic) · hypertension · DM', tone: 'info' }],
          ['<strong>Dilated unresponsive pupils</strong> (🐱)', { text: 'Hypertensive retinopathy — <strong>measure BP immediately</strong>', tone: 'danger' }],
          ['<strong>Palpable thyroid nodule(s)</strong> — ventral neck, 🐱', { text: 'Hyperthyroidism — most cats &gt;8 yr. Bilateral = toxic multinodular goitre (most common) · unilateral = adenoma or carcinoma', tone: 'green' }],
          ['<strong>Rectal exam — mandatory in all PU/PD dogs:</strong> anal sac mass', { text: '<strong>AGASACA</strong> — 27–53% cause paraneoplastic hypercalcaemia → secondary NDI. <strong>Examine even without perineal swelling</strong> — small masses are easily missed', tone: 'danger' }],
          ['<strong>Peripheral lymphadenopathy</strong>', { text: 'Lymphoma — T-cell with hypercalcaemia most common', tone: 'danger' }],
          ['<strong>Altered mentation / hepatic encephalopathy signs</strong>', { text: 'PSS · hepatic failure', tone: 'violet' }],
          ['<strong>Generalised muscle weakness</strong>', { text: 'Hypokalaemia (🐱: ventroflexion) · hypoadrenocorticism', tone: 'violet' }],
          ['<strong>Plantigrade stance</strong> (🐱)', { text: 'Diabetic neuropathy', tone: 'violet' }],
          ['<strong>Neurological signs + head trauma history</strong>', { text: 'CDI — hypothalamic damage', tone: 'violet' }],
        ],
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  dx: {
    title: 'Dx: PU/PD',
    blocks: [
      { kind: 'step', text: '🔬 STEP 1 — URINALYSIS (first, before IV fluids)', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Serial USG — 3–5 samples on different days / times',
        cols: 'auto 1fr 1fr',
        dividers: true,
        headers: ['USG', 'Interpretation', { text: 'Consider', tone: 'teal' }],
        rows: [
          [{ text: '<strong>&gt;1.030 🐕<br>&gt;1.035 🐱</strong>', tone: 'green' }, 'Concentrated — not obligate PU/PD', { text: 'Glucosuria? DM can raise USG artificially. ≥1 concentrated sample → primary polydipsia possible', tone: 'teal' }],
          [{ text: '<strong>1.013–1.029</strong>', tone: 'warning' }, 'Partially concentrated', { text: 'HAC · early CKD · primary polydipsia', tone: 'teal' }],
          [{ text: '<strong>1.008–1.012</strong>', tone: 'warning' }, 'Isosthenuric', { text: 'CKD · HAC · Addison\'s medullary washout · pyelonephritis', tone: 'teal' }],
          [{ text: '<strong>&lt;1.008</strong>', tone: 'danger' }, 'Hyposthenuric', { text: 'CDI · NDI · primary polydipsia · severe HAC', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Dipstick + sediment',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Glucosuria + <em>hyperglycaemia</em></strong>', { text: 'DM — osmotic diuresis; glucose &gt;180 mg/dL 🐕 · &gt;270 mg/dL 🐱', tone: 'teal' }],
          ['<strong>Glucosuria + <em>normoglycaemia</em></strong>', { text: 'Renal glucosuria / Fanconi — jerky treats · copper hepatopathy', tone: 'teal' }],
          ['<strong>Active sediment</strong> — WBC casts · bacteriuria', { text: 'Pyelonephritis — <strong>culture regardless</strong>', tone: 'teal' }],
          ['<strong>Ammonium biurate crystals</strong>', { text: 'PSS — young dog', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🧪 STEP 2 — MINIMUM DATABASE + IMAGING', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Biochemistry</strong>`, { text: 'BUN · Cr · SDMA · phosphate · Ca²⁺ · K⁺ · Na⁺ · glucose · ALP · ALT · albumin · cholesterol', tone: 'warning' }],
          [`${numBadge(2)}<strong>Haematology</strong>`, { text: 'CBC — absent stress leukogram in a sick dog → Addison\'s · leucocytosis + left shift → infectious', tone: 'warning' }],
          [`${numBadge(3)}<strong>T4</strong>`, { text: '<strong>ALL cats &gt;7 yr.</strong> Free T4 by equilibrium dialysis if total T4 equivocal', tone: 'warning' }],
          [`${numBadge(4)}<strong>Blood pressure</strong>`, { text: 'Indirect measurement — all PU/PD patients', tone: 'warning' }],
          [`${numBadge(5)}<strong>Urine culture</strong>`, { text: 'All PU/PD patients — pyelonephritis often presents without localising signs', tone: 'warning' }],
          [`${numBadge(6)}<strong>Abdominal US</strong>`, { text: 'Adrenal size · uterus (closed pyometra) · kidney architecture · hepatic pattern · lymph nodes', tone: 'warning' }],
        ],
      },
      {
        kind: 'html',
        html: `<!-- CLASSIFY -->
    <div class="dx-step" style="background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.45);color:var(--fg-indigo-deep);">CLASSIFY — PRIMARY POLYURIA vs PRIMARY POLYDIPSIA</div>`,
      },
      {
        kind: 'html',
        html: `<!-- Primary Polydipsia block -->
    <div style="border:1.5px solid rgba(16,185,129,0.4);border-radius:12px;padding:12px 14px;background:rgba(16,185,129,0.06);">
      <div style="font-size:12px;font-weight:700;color:var(--tone-green-fg);margin-bottom:8px;">💧 PRIMARY POLYDIPSIA <span style="font-weight:400;font-size:10px;color:var(--gray);">— excessive drinking drives secondary polyuria</span></div>

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
      <div style="font-size:12px;font-weight:700;color:var(--fg-indigo-deep);margin-bottom:8px;">🚰 PRIMARY POLYURIA <span style="font-weight:400;font-size:10px;color:var(--gray);">— kidney produces excess urine → compensatory thirst</span></div>

      <div style="font-size:10px;color:var(--gray);margin-bottom:10px;line-height:1.5;">
        <strong style="color:var(--white);">USG clue:</strong> Consistently dilute or isosthenuric · Plasma Na⁺ high-normal or elevated (free water loss)
      </div>

      <!-- Primary causes -->
      <div style="font-size:10.5px;font-weight:700;color:var(--fg-indigo-deep);margin-bottom:6px;padding:4px 8px;background:rgba(99,102,241,0.15);border-radius:6px;">PRIMARY causes <span style="font-weight:400;font-size:9.5px;color:var(--gray);">— intrinsic ADH pathway failure</span></div>
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
      <div style="font-size:10.5px;font-weight:700;color:var(--tone-warning-fg);margin-bottom:8px;padding:4px 8px;background:rgba(217,119,6,0.15);border-radius:6px;">SECONDARY causes <span style="font-weight:400;font-size:9.5px;color:var(--gray);">— underlying disease drives polyuria</span></div>

      <!-- Endocrine -->
      <div style="margin-bottom:6px;">
        <div style="font-size:10px;font-weight:700;color:var(--tone-violet-fg);margin-bottom:4px;">⚗️ Endocrine</div>
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
        <div style="font-size:10px;font-weight:700;color:var(--tone-info-fg);margin-bottom:4px;">🫘 Renal</div>
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
        <div style="font-size:10px;font-weight:700;color:var(--tone-orange-fg);margin-bottom:4px;">🏥 Systemic / Hepatic</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>Pyometra</strong> <span style="font-size:8.5px;color:var(--tone-danger-title);">⚠️ EMERGENCY · Intact ♀</span><br>
            <span style="font-weight:400;">E. coli endotoxin → secondary NDI. 4–8 wk post-oestrus. May lack discharge (closed). → US abdomen immediately.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>PSS / Hepatic failure</strong> <span style="font-size:8.5px;color:var(--gray);">Dog · medullary washout</span><br>
            <span style="font-weight:400;">Low BUN · low albumin · ammonium biurate. Young dog · stunted · HE signs. → Bile acids · US · CT angio.</span>
          </div>
          <div class="dx-dx" onclick="goLesionTab('LOC-PUPD-MED','Systemic / Hepatic')" style="font-size:9.5px;background:rgba(249,115,22,0.1);border-color:rgba(249,115,22,0.35);cursor:pointer;">
            <strong>Leptospirosis</strong> <span style="font-size:8.5px;color:var(--tone-danger-title);">⚠️ ZOONOTIC — PPE</span><br>
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
      { kind: 'step', text: 'IF DATABASE NORMAL — SERIAL USG + PLASMA Na⁺ → DESMOPRESSIN', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Pattern', { text: 'Diagnosis', tone: 'teal' }],
        rows: [
          ['<strong>≥1 USG &gt;1.030 (🐕) / &gt;1.035 (🐱) + Na⁺ low-normal</strong>', { text: '<strong>Primary polydipsia</strong>', tone: 'teal' }],
          ['<strong>All USG &lt;1.007 + Na⁺ high-normal</strong>', { text: '<strong>CDI vs NDI</strong> → desmopressin trial', tone: 'teal' }],
        ],
      },
      {
        kind: 'html',
        html: `<div style="margin-top:8px;">
        <div class="dx-dx" onclick="renderDxId('pupd','desmopressin')" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.45);cursor:pointer;">💉 → Desmopressin Trial protocol</div>
      </div>`,
      },
    ],
    after: [
      {
        kind: 'html',
        html: `<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
    <div style="font-size:10px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;">⚠️ RED FLAGS</div>
    <div style="font-size:10px;color:var(--tone-danger-fg);line-height:1.6;">
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
        html: `<div class="dx-step" style="background:rgba(99,102,241,0.2);border-color:rgba(99,102,241,0.45);color:var(--fg-indigo-deep);">💉 DESMOPRESSIN (DDAVP) RESPONSE TRIAL</div>`,
      },
      {
        kind: 'gridTable',
        label: '⚠️ BEFORE STARTING — absolute prerequisites',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Prerequisite', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Minimum database complete</strong>', { text: 'Biochemistry · haematology · urinalysis', tone: 'danger' }],
          ['<strong>Hyperadrenocorticism excluded</strong>', { text: 'Some HAC dogs partially respond to DDAVP → <strong>false CDI diagnosis</strong>', tone: 'danger' }],
          ['<strong>Pyometra excluded</strong>', { text: 'Ultrasound, or confirmed spayed', tone: 'danger' }],
          ['<strong>Hypercalcaemia excluded</strong>', { text: 'Total Ca²⁺ checked', tone: 'danger' }],
          ['<strong>Not hyponatraemic</strong> (Na &lt;145 mEq/L)', { text: 'Desmopressin in primary polydipsia → severe hyponatraemia → <strong>death</strong>', tone: 'danger' }],
          ['<strong>Not azotaemic without a known cause</strong>', { text: 'Investigate the azotaemia first', tone: 'danger' }],
          ['<strong>Free access to water at all times</strong>', { text: '<strong>NEVER restrict water</strong> during the trial', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '📏 BASELINE MEASUREMENTS (Day 0)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.45fr',
        dividers: true,
        headers: ['Measure', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Serial USG</strong>', { text: 'Minimum 3–5 samples on different days — confirm all are &lt;1.007 for the CDI/NDI workup', tone: 'teal' }],
          ['<strong>Plasma sodium</strong>', { text: 'Baseline — repeat at Day 5–7', tone: 'teal' }],
          ['<strong>Water intake</strong>', { text: 'Owner to measure daily (mL/kg/day) — <strong>the most sensitive response indicator</strong>; instruct them to record it carefully', tone: 'teal' }],
          ['<strong>Bodyweight</strong>', { text: 'Monitor for water retention', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '💉 DESMOPRESSIN ADMINISTRATION', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Route', { text: 'Dose', tone: 'teal' }],
        rows: [
          ['<strong>🐕 Oral DDAVP tablets</strong>', { text: '0.05–0.1 mg (50–100 µg) PO q8–12h', tone: 'warning' }],
          ['<strong>🐕 Conjunctival drops (ophthalmic)</strong>', { text: '1–2 drops into the conjunctival sac q12–24h — 0.01% solution = 10 µg/drop', tone: 'warning' }],
          ['<strong>🐕 Intranasal solution used conjunctivally</strong>', { text: '1–2 drops q12h — if the ophthalmic preparation is not available', tone: 'warning' }],
          ['<strong>🐱 Conjunctival drops</strong>', { text: '1–2 drops q12–24h. Oral DDAVP is less predictable in cats — <strong>conjunctival route preferred</strong>', tone: 'warning' }],
          ['<strong>Duration</strong>', { text: '<strong>5–7 days</strong> for full response assessment. USG checked Days 3–4, then Day 7', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📊 INTERPRETING RESPONSE (Day 5–7)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '1fr 1fr 1fr',
        dividers: true,
        headers: ['USG response', 'Water intake', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          [{ text: 'USG increases to &gt;1.015<br>(ideally &gt;1.025)', tone: 'green' }, { text: '↓ significantly (&gt;50%)', tone: 'green' }, { text: '<strong>CDI confirmed</strong> — ADH-responsive collecting duct → commence long-term DDAVP', tone: 'teal' }],
          [{ text: 'USG remains &lt;1.007<br>No change', tone: 'danger' }, { text: 'No change', tone: 'danger' }, { text: '<strong>Primary NDI</strong> — collecting duct unresponsive to ADH; treat the underlying cause', tone: 'teal' }],
          [{ text: 'USG already &gt;1.030 (🐕)<br>/ &gt;1.035 (🐱)', tone: 'warning' }, { text: '↓ or unchanged', tone: 'warning' }, { text: '<strong>Primary polydipsia</strong> — the patient was concentrating urine all along; medullary washout may blur earlier readings', tone: 'teal' }],
          [{ text: 'Partial response<br>(USG 1.008–1.015)', tone: 'violet' }, { text: 'Mild ↓', tone: 'violet' }, { text: '<strong>Partial CDI</strong> or secondary NDI — rule out HAC (the most common secondary NDI); treat the underlying cause and retest', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📈 MONITORING DURING TRIAL', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Monitor', { text: 'Action', tone: 'teal' }],
        rows: [
          ['<strong>Bodyweight daily</strong>', { text: 'Weight gain &gt;5% → water retention → reduce dose or discontinue', tone: 'teal' }],
          ['<strong>Plasma sodium Day 5–7</strong>', { text: 'Developing hyponatraemia → primary polydipsia (overdrinking + ADH effect) → <strong>stop immediately</strong>', tone: 'danger' }],
          ['<strong>Oedema / ascites</strong>', { text: 'Rare with physiological DDAVP doses; more likely if primary polydipsia has been misclassified', tone: 'teal' }],
        ],
      },
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ STOP IMMEDIATELY IF',
        html: `Plasma Na falls &lt;140 mEq/L · Bodyweight gain &gt;5% · Oedema develops · Owner stops measuring water and the patient appears more depressed`,
      },

      { kind: 'step', text: '✅ CDI CONFIRMED — LONG-TERM MANAGEMENT', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Continue DDAVP</strong>', { text: 'At the effective trial dose — titrate to the lowest effective dose', tone: 'teal' }],
          ['<strong>MRI brain</strong>', { text: '<strong>Mandatory</strong> — identify a structural cause (neoplasia · cysts · inflammation)', tone: 'danger' }],
          ['<strong>🐕 DDAVP dose</strong>', { text: '0.05–0.1 mg PO q8–12h, or 1–2 conjunctival drops q12–24h', tone: 'teal' }],
          ['<strong>🐱 DDAVP dose</strong>', { text: '1 conjunctival drop q12–24h — adjust based on USG monitoring', tone: 'teal' }],
          ['<strong>Recheck</strong>', { text: 'USG + plasma Na + water intake every 4–6 weeks until stable, then every 3–6 months', tone: 'teal' }],
          ['<strong>Water access</strong>', { text: 'Free access at <strong>ALL</strong> times — water restriction with DDAVP is dangerous', tone: 'danger' }],
        ],
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
