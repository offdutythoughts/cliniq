// ── Polyphagia — diagnostic approach (data) ──────────────────────────────────
// Excessive food intake: first confirm it is true polyphagia and exclude
// physiologic (growth/pregnancy/lactation/cold/exercise) and behavioural/dietary
// causes, then use the BODY-WEIGHT trend to split the differential (weight LOSS =
// ↑demand or malabsorption; weight GAIN = drug-induced/HAC/insulinoma/overfeeding).
// PU/PD frequently co-occurs (DM, HAC, hyperthyroid). Links to the endocrine /
// GI / metabolic disease pages. (Ettinger Ch 19)

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const polyphagiaDx: DxApproach = {
  title: 'Polyphagia',
  tabs: {

    history: {
      title: 'History: Polyphagia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM POLYPHAGIA & ESTABLISH THE WEIGHT TREND' },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Weight trend', { text: 'Differential', tone: 'teal' }],
          rows: [
            ['<strong>Weight GAIN</strong>', { text: 'Drug-induced · hyperadrenocorticism · insulinoma · overfeeding', tone: 'teal' }],
            ['<strong>Weight LOSS or stable</strong>', { text: 'Pathologically increased metabolism (hyperthyroid) <em>or</em> nutrient loss / malabsorption (DM · EPI · IBD · lymphoma · parasites)', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `<strong>Polyphagia</strong> = excessive food consumption — physiologic (growth · pregnancy · lactation · increased exercise · cold) or a sign of systemic disease. The single most useful question is the <strong>body-weight trend</strong>. <span style="opacity:.7">(Ettinger Ch 19)</span>` },

        { kind: 'step', tone: 'danger', text: '💊 STEP 1 — DRUG & DIET HISTORY FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Exclude first', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Appetite-driving drugs</strong>', { text: '<strong>Glucocorticoids</strong> · <strong>anticonvulsants</strong> (phenobarbital · potassium bromide) · <strong>benzodiazepines</strong> · antihistamines · cyproheptadine / mirtazapine · <strong>progestins</strong> — signs resolve on withdrawal', tone: 'danger' }],
            ['<strong>Dietary / behavioural</strong>', { text: 'New palatable food · food competition · simple overfeeding — the commonest "cause" once disease is excluded <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'BODY-WEIGHT TREND & PHYSIOLOGIC CAUSES', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Weigh the pet, establish the trend</strong>', { text: 'It directs everything that follows', tone: 'teal' }],
            ['<strong>Exclude physiologic polyphagia</strong>', { text: 'Growth · pregnancy · lactation · increased exercise · cold environment', tone: 'teal' }],
            ['<strong>Weight GAIN</strong>', { text: 'Caloric intake exceeds expenditure — psychogenic / behavioural · drug-induced · hyperadrenocorticism / insulinoma', tone: 'teal' }],
            ['<strong>Weight STABLE or LOSS despite eating well</strong>', { text: 'Pathologically ↑ metabolism (hyperthyroidism) <em>or</em> nutrient loss / malabsorption (DM · EPI · IBD / lymphoma · parasites) <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '⚖️'),

        ...stepTable(3, 'ASSOCIATED SIGNS & SIGNALMENT', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Associated sign', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>PU/PD</strong>', { text: 'DM · hyperadrenocorticism · hyperthyroidism — see the PU/PD approach', tone: 'teal' }],
            ['<strong>GI signs</strong>', { text: 'Large-volume malodorous soft stool → EPI · diarrhoea / melena → IBD · lymphoma · parasites — i.e. malassimilation', tone: 'teal' }],
            ['<strong>Senior cat · weight loss · hyperactivity ± palpable cervical mass</strong>', { text: '<strong>Hyperthyroidism</strong> — weight loss 92%, polyphagia 55%', tone: 'teal' }],
            ['<strong>Diabetic cat with insulin resistance + organomegaly / broad facial features</strong>', { text: '<strong>Acromegaly</strong>', tone: 'teal' }],
            ['<strong>Episodic weakness, collapse or seizures (especially fasted) in a middle-aged–older dog</strong>', { text: '<strong>Insulinoma</strong> — hypoglycaemia-driven <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '🔍'),
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
        ...stepTable(1, 'BODY CONDITION, MUSCLE MASS & HYDRATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Body condition score + muscle mass</strong>', { text: 'Assess against the weight trend', tone: 'teal' }],
            ['<strong>Muscle wasting with a good appetite</strong>', { text: 'Catabolic / malabsorptive process — hyperthyroid (77% muscle wasting) · DM · EPI · lymphoma', tone: 'teal' }],
            ['<strong>Dehydration</strong>', { text: 'DM / DKA', tone: 'teal' }],
            ['<strong>Pot-belly / pendulous abdomen</strong>', { text: 'Hyperadrenocorticism <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '⚖️'),

        ...stepTable(2, 'CERVICAL PALPATION & CARDIOVASCULAR (cat)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>🐱 Ventral cervical palpation</strong>', { text: 'Thyroid nodule — 98% palpable in hyperthyroid cats', tone: 'teal' }],
            ['<strong>🐱 Auscultation</strong>', { text: 'Tachycardia · murmur', tone: 'teal' }],
            ['<strong>Plantigrade stance</strong> — dropped hocks', { text: 'Diabetic neuropathy <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '🐱'),

        ...stepTable(3, 'SKIN, ABDOMEN & CONFORMATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Bilaterally symmetric alopecia / failure to regrow hair · thin fragile skin · panting · comedones</strong>', { text: '<strong>Hyperadrenocorticism</strong> — feline HAC adds skin fragility and spontaneous tearing', tone: 'teal' }],
            ['<strong>Broad facial features · prognathia inferior · clubbed paws · abdominal organomegaly · respiratory stertor / snoring</strong>', { text: '<strong>Acromegaly</strong> (🐱)', tone: 'teal' }],
            ['<strong>Abdominal palpation</strong>', { text: 'Hepatomegaly (HAC · lymphoma · DM) · thickened bowel or mass (lymphoma · IBD) <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '🩺'),

        ...stepTable(4, 'NEUROLOGIC SCREEN', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Circling · blindness · ataxia · proprioceptive deficits · altered mentation</strong>', { text: 'CNS lesion (infection · neoplasia · trauma) or hepatoencephalopathy (PSS)', tone: 'teal' }],
            ['<strong>A blind dog resembling Cushing\'s</strong>', { text: 'Consider <strong>SARDS</strong> <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        }, '🧠'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Polyphagia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '💊 STEP 1 — DRUG / DIET HISTORY + BODY WEIGHT', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do before any test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Reconcile the medication list</strong>', { text: 'Glucocorticoids · phenobarbital / KBr · benzodiazepines · antihistamines · progestins', tone: 'danger' }],
            ['<strong>Exclude dietary / behavioural cause and pregnancy</strong>', { text: 'The commonest explanation once disease is excluded', tone: 'teal' }],
            ['<strong>Document the body-weight trend</strong>', { text: 'It directs everything that follows', tone: 'teal' }],
            ['<strong>Young patient, unknown deworming, polyphagia + weight loss, otherwise healthy</strong>', { text: '<strong>Faecal exam + deworming trial</strong> <span style="opacity:.7">(Ettinger Ch 19)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'MINIMUM DATABASE + GLUCOSE / FRUCTOSAMINE + T4 (cat)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>CBC · serum chemistry · urinalysis</strong>', { text: 'Add <strong>TT4 in every senior cat</strong>', tone: 'teal' }],
            ['<strong>Blood glucose ± glucosuria</strong>', { text: '<strong>Diabetes:</strong> 🐕 random BG ≥200 mg/dL (≥11 mmol/L) with classic signs · 🐱 random BG ≥270 mg/dL (≥15 mmol/L) with signs + glucosuria on ≥2 home samples (stress hyperglycaemia caveat)', tone: 'teal' }],
            ['<strong>Fructosamine</strong>', { text: 'Confirms persistent hyperglycaemia (DM); when <em>low</em>, supports insulinoma — but it is reduced by hyperthyroidism and acromegaly', tone: 'teal' }],
            ['<strong>🐱 TT4</strong>', { text: 'Abnormal in 90–95% on a single sample (only 60–80% in mild disease — repeat if normal but suspected) <span style="opacity:.7">(Ettinger Ch 19, 280, 289, 291–292)</span>', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(3, 'IF WEIGHT LOSS: GI / MALABSORPTION PANEL', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Serum TLI (fasted)</strong> — test of choice for EPI', { text: 'Canine cutoff <strong>&lt;2.5 µg/L</strong> · feline cutoff <strong>&lt;8.0 µg/L</strong>', tone: 'teal' }],
            ['<strong>Cobalamin (B12) + folate</strong>', { text: 'Assess intestinal malabsorption — hypocobalaminaemia in 82% of dogs / 77% of cats with EPI, and common in IBD / lymphoma. Supplement if &lt;400 ng/L', tone: 'teal' }],
            ['<strong>Abdominal ultrasound ± endoscopy / biopsy</strong>', { text: 'Infiltrative bowel disease vs alimentary lymphoma; recheck a faecal for parasites <span style="opacity:.7">(Ettinger Ch 19, 279)</span>', tone: 'teal' }],
          ],
        }, '🦠'),

        ...stepTable(4, 'IF WEIGHT GAIN: HAC TESTING & IGF-1', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Hyperadrenocorticism</strong>', { text: 'Screen with the <strong>LDDS test</strong> (low-dose dexamethasone suppression) or <strong>ACTH-stimulation test</strong> once non-adrenal illness is controlled; ultrasound and urine cortisol:creatinine support', tone: 'teal' }],
            ['<strong>🐱 Acromegaly</strong>', { text: 'Serum <strong>IGF-1 ≥1000 ng/mL</strong> (≥131 nmol/L) has ≥95% positive predictive value in diabetic cats — screen every newly diagnosed diabetic cat; confirm with pituitary CT / MRI <span style="opacity:.7">(Ettinger Ch 19, 280, 293–294)</span>', tone: 'teal' }],
          ],
        }, '📈'),

        ...stepTable(5, 'IF HYPOGLYCAEMIC: INSULINOMA WORK-UP', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Step', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Confirm fasting hypoglycaemia</strong>', { text: 'Blood glucose <strong>&lt;60 mg/dL (&lt;3.3 mmol/L)</strong> with <strong>normo- or hyperinsulinaemia</strong> (serum insulin within or above reference despite the low glucose) is the biochemical hallmark. Most dogs become hypoglycaemic within 12 h of a meal under supervised fast', tone: 'teal' }],
            ['<strong>Do NOT use</strong>', { text: 'The amended insulin:glucose ratio is <strong>not sensitive and not recommended</strong>; tolerance / stimulation tests are dangerous', tone: 'danger' }],
            ['<strong>Localise / stage</strong>', { text: '<strong>Dual-phase CT</strong> (most sensitive, 71%) or abdominal ultrasound (56%) <span style="opacity:.7">(Ettinger Ch 289)</span>', tone: 'teal' }],
          ],
        }, '🍬'),
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
