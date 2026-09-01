// ── Polyphagia — diagnostic approach (data) ──────────────────────────────────
// Excessive food intake: first confirm it is true polyphagia and exclude
// physiologic (growth/pregnancy/lactation/cold/exercise) and behavioural/dietary
// causes, then use the BODY-WEIGHT trend to split the differential (weight LOSS =
// ↑demand or malabsorption; weight GAIN = drug-induced/HAC/insulinoma/overfeeding).
// PU/PD frequently co-occurs (DM, HAC, hyperthyroid). Links to the endocrine /
// GI / metabolic disease pages. (Ettinger Ch 19)

import type { DxApproach } from '../dxTypes'

export const polyphagiaDx: DxApproach = {
  title: 'Polyphagia',
  tabs: {

    history: {
      title: 'History: Polyphagia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM POLYPHAGIA & ESTABLISH THE WEIGHT TREND' },
        {
          kind: 'check',
          html: `<strong>Polyphagia</strong> = excessive food consumption — physiologic (growth, pregnancy, lactation, increased exercise, cold) OR a sign of systemic disease. The single most useful question is the <strong>body-weight trend</strong>: weight GAIN points to drug-induced / hyperadrenocorticism / insulinoma / overfeeding, while weight LOSS or stability points to pathologically increased metabolism (hyperthyroid) or nutrient loss/malabsorption (DM, EPI, IBD, lymphoma, parasites). (Ettinger Ch 19)`,
        },
        { kind: 'step', tone: 'danger', text: ' STEP 1 — DRUG & DIET HISTORY FIRST' },
        {
          kind: 'check',
          html: `<strong>Rule out drugs before any work-up</strong> — <strong>glucocorticoids</strong>, <strong>anticonvulsants</strong> (phenobarbital, potassium bromide), <strong>benzodiazepines</strong>, antihistamines, cyproheptadine/mirtazapine, and <strong>progestins</strong> all drive appetite (signs resolve on withdrawal). Then exclude a <strong>new palatable food</strong>, food competition, or simple overfeeding — the commonest "cause" once disease is excluded. (Ettinger Ch 19)`,
        },
        { kind: 'step', text: ' STEP 2 — BODY-WEIGHT TREND & PHYSIOLOGIC CAUSES' },
        {
          kind: 'check',
          html: `<strong>Weigh the pet and establish the trend.</strong> Exclude physiologic polyphagia: <strong>growth, pregnancy, lactation, increased exercise, cold environment</strong>.<br>
    <strong>Weight GAIN</strong> → caloric intake exceeds expenditure: psychogenic/behavioural, drug-induced, or hyperadrenocorticism/insulinoma.<br>
    <strong>Weight STABLE or LOSS despite eating well</strong> → pathologically ↑metabolism (hyperthyroidism) OR nutrient loss/malabsorption (DM, EPI, IBD/lymphoma, parasites). (Ettinger Ch 19)`,
        },
        { kind: 'step', text: ' STEP 3 — ASSOCIATED SIGNS & SIGNALMENT' },
        {
          kind: 'check',
          html: `<strong>PU/PD</strong> frequently co-occurs — think DM, hyperadrenocorticism, hyperthyroidism (see the PU/PD approach).<br>
    <strong>GI signs</strong> (large-volume malodorous soft stool → EPI; diarrhoea/melena → IBD, lymphoma, parasites) point to malassimilation.<br>
    <strong>Senior cat, weight loss, hyperactivity ± palpable cervical mass</strong> → hyperthyroidism (weight loss 92%, polyphagia 55%).<br>
    <strong>Diabetic cat with insulin resistance + organomegaly / broad facial features</strong> → acromegaly.<br>
    <strong>Episodic weakness, collapse or seizures (esp. when fasted)</strong> in a middle-aged–older dog → insulinoma (hypoglycaemia-driven). (Ettinger Ch 19)`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Polyphagia + PU/PD + weight loss = diabetes until disproven (check for ketones) · Episodic collapse/seizure relieved by feeding = insulinoma — never fast for testing without supervision · Senior cat losing weight while eating = hyperthyroidism · Always reconcile the medication list before working up.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Polyphagia',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' STEP 1 — BODY CONDITION, MUSCLE MASS & HYDRATION' },
        {
          kind: 'check',
          html: `Assign a <strong>body condition score</strong> and assess muscle mass against the weight trend. <strong>Muscle wasting with a good appetite</strong> supports a catabolic/malabsorptive process (hyperthyroid 77% muscle wasting, DM, EPI, lymphoma). Note dehydration (DM/DKA) and a <strong>pot-belly / pendulous abdomen</strong> (hyperadrenocorticism). (Ettinger Ch 19)`,
        },
        { kind: 'step', text: ' STEP 2 — CERVICAL PALPATION & CARDIOVASCULAR (cat)' },
        {
          kind: 'check',
          html: `In a senior cat, <strong>palpate the ventral cervical region</strong> for a thyroid nodule (98% palpable in hyperthyroid cats) and auscult for tachycardia/murmur. <strong>Plantigrade stance</strong> (dropped hocks) → diabetic neuropathy. (Ettinger Ch 19)`,
        },
        { kind: 'step', text: ' STEP 3 — SKIN, ABDOMEN & CONFORMATION' },
        {
          kind: 'check',
          html: `<strong>Hyperadrenocorticism:</strong> bilaterally symmetric alopecia / failure to regrow hair, thin/fragile skin, panting, comedones — feline HAC adds skin fragility/spontaneous tearing.<br>
    <strong>Acromegaly (cat):</strong> broad facial features, prognathia inferior, clubbed paws, abdominal organomegaly, respiratory stertor/snoring.<br>
    <strong>Abdominal palpation:</strong> hepatomegaly (HAC, lymphoma, DM), thickened bowel / mass (lymphoma, IBD). (Ettinger Ch 19)`,
        },
        { kind: 'step', text: ' STEP 4 — NEUROLOGIC SCREEN' },
        {
          kind: 'check',
          html: `Polyphagia with <strong>circling, blindness, ataxia, proprioceptive deficits or altered mentation</strong> raises a CNS lesion (infection, neoplasia, trauma) or hepatoencephalopathy (PSS). A blind dog resembling Cushing's = consider <strong>SARDS</strong>. (Ettinger Ch 19)`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Polyphagia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — DRUG / DIET HISTORY + BODY WEIGHT' },
        {
          kind: 'check',
          html: `Before any test, <strong>reconcile the medication list</strong> (glucocorticoids, phenobarbital/KBr, benzodiazepines, antihistamines, progestins) and exclude a dietary/behavioural cause and pregnancy. <strong>Document the body-weight trend</strong> — it directs everything that follows. In a young patient with unknown deworming, polyphagia + weight loss and otherwise healthy → <strong>fecal exam + deworming trial</strong>. (Ettinger Ch 19)`,
        },
        { kind: 'step', text: 'STEP 2 — MINIMUM DATABASE + GLUCOSE / FRUCTOSAMINE + T4 (cat)' },
        {
          kind: 'check',
          html: `<strong>CBC, serum chemistry, urinalysis</strong> — add <strong>TT4 in every senior cat</strong>.<br>
    <strong>Blood glucose ± glucosuria → diabetes:</strong> dogs — random BG ≥200 mg/dL (≥11 mmol/L) with classic signs; cats — random BG ≥270 mg/dL (≥15 mmol/L) with signs + glucosuria on ≥2 home samples (stress hyperglycaemia caveat).<br>
    <strong>Fructosamine</strong> confirms persistent hyperglycaemia (DM) and, when <em>low</em>, supports insulinoma — but it is reduced by hyperthyroidism and acromegaly.<br>
    <strong>Feline TT4:</strong> abnormal in 90–95% on a single sample (only 60–80% in mild disease — repeat if normal but suspected). (Ettinger Ch 19, 280, 289, 291–292)`,
        },
        { kind: 'step', text: 'STEP 3 — IF WEIGHT LOSS: GI / MALABSORPTION PANEL' },
        {
          kind: 'check',
          html: `<strong>Serum TLI (fasted) = test of choice for EPI:</strong> canine cutoff <strong>&lt;2.5 µg/L</strong>, feline cutoff <strong>&lt;8.0 µg/L</strong>.<br>
    <strong>Cobalamin (B12) + folate</strong> assess intestinal malabsorption — hypocobalaminaemia in 82% of dogs / 77% of cats with EPI, and is common in IBD/lymphoma (supplement if &lt;400 ng/L).<br>
    <strong>Abdominal ultrasound ± endoscopy/biopsy</strong> for infiltrative bowel disease vs alimentary lymphoma; recheck a fecal for parasites. (Ettinger Ch 19, 279)`,
        },
        { kind: 'step', text: 'STEP 4 — IF WEIGHT GAIN: HAC TESTING & IGF-1' },
        {
          kind: 'check',
          html: `<strong>Hyperadrenocorticism:</strong> screen with the <strong>LDDS test</strong> (low-dose dexamethasone suppression) or <strong>ACTH-stimulation test</strong> once non-adrenal illness is controlled; ultrasound/urine cortisol:creatinine support.<br>
    <strong>Acromegaly (cat):</strong> serum <strong>IGF-1 ≥1000 ng/mL</strong> (≥131 nmol/L) has ≥95% positive predictive value in diabetic cats — screen every newly diagnosed diabetic cat; confirm with pituitary CT/MRI. (Ettinger Ch 19, 280, 293–294)`,
        },
        { kind: 'step', text: 'STEP 5 — IF HYPOGLYCAEMIC: INSULINOMA WORK-UP' },
        {
          kind: 'check',
          html: `<strong>Confirm fasting hypoglycaemia:</strong> blood glucose <strong>&lt;60 mg/dL (&lt;3.3 mmol/L)</strong> with <strong>normo- or hyperinsulinaemia</strong> (serum insulin within/above reference despite the low glucose) is the biochemical hallmark of insulinoma; most dogs become hypoglycaemic within 12 h of a meal under supervised fast.<br>
    The <strong>amended insulin:glucose ratio is NOT sensitive and is not recommended</strong>; tolerance/stimulation tests are dangerous. Localise/stage with <strong>dual-phase CT</strong> (most sensitive, 71%) or abdominal ultrasound (56%). (Ettinger Ch 289)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: 'Acromegaly / hypersomatotropism', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
            { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Hyperadrenocorticism (dog)', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: 'Feline hyperadrenocorticism', link: { to: 'disease', id: 'DIS-ENDO-HAC-CAT' } },
            { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'PU/PD — diagnostic approach', link: { to: 'dx', id: 'pupd' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Weigh the patient — the body-weight trend splits the entire differential.<br>
  • Rule out drugs first — glucocorticoids, phenobarbital/KBr, benzodiazepines and progestins all cause polyphagia and resolve on withdrawal.<br>
  • Polyphagia + PU/PD + weight loss = diabetes until proven otherwise; check for ketones.<br>
  • Run TT4 on every senior cat with polyphagia + weight loss; repeat if normal but suspected.<br>
  • Never fast a suspected insulinoma without close monitoring; the amended insulin:glucose ratio is not recommended.<br>
  • Screen every newly diagnosed diabetic cat with IGF-1 for acromegaly.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
