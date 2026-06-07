// ── Polyphagia flowchart ─────────────────────────────────────────────────────
// Excessive food intake. The pivotal split is the BODY-WEIGHT trend:
// polyphagia WITH WEIGHT LOSS (pathologic — ↑metabolic demand or nutrient loss)
// vs polyphagia WITH WEIGHT GAIN (drug-induced, hyperadrenocorticism, insulinoma,
// or simple overfeeding/behavioural). Rule out drugs first. PU/PD frequently
// co-occurs (DM, HAC, hyperthyroid) — cross-links to the PU/PD flow.
// Links into the endocrine / GI / metabolic disease pages.

import type { FlowPage } from '../flowTypes'

export const polyphagiaFlow: FlowPage = {
  id: 'polyphagia',
  title: 'Polyphagia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🍽️ POLYPHAGIA' },

    {
      kind: 'callout',
      tone: 'info',
      html: '🔑 <strong>Body-weight trend is the pivot.</strong> Polyphagia <strong>+ weight LOSS</strong> = pathologic (↑demand or nutrient loss) — diabetes, hyperthyroid cat, EPI, IBD/lymphoma, acromegaly. Polyphagia <strong>+ weight GAIN</strong> = drug-induced, hyperadrenocorticism, insulinoma, or simple overfeeding. <strong>Rule out drugs first</strong> — glucocorticoids, anticonvulsants (phenobarbital, KBr), benzodiazepines, progestins all drive appetite. (Ettinger Ch 19)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'WEIGH THE PATIENT — IS BW RISING OR FALLING?',
      sub: 'After excluding pregnancy/lactation, growth, increased exercise/cold, and an obvious dietary/behavioural cause, the weight trend splits the differential (Ettinger Ch 19)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔻 POLYPHAGIA + WEIGHT LOSS — pathologic',
          tone: 'danger',
          sub: '↑metabolic demand OR nutrient loss/malabsorption · PU/PD often co-occurs (DM, hyperthyroid) · GI signs point to malassimilation',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: '↑METABOLIC DEMAND / ENERGY LOSS vs MALABSORPTION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'ENDOCRINE — ↑demand or glucose loss',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🍬', label: 'DIABETES MELLITUS', sublabel: 'PU/PD + polyphagia + weight loss · glucosuria', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
                        { icon: '🐈', label: 'FELINE HYPERTHYROIDISM', sublabel: 'Senior cat · weight loss 92% · polyphagia 55% · palpable nodule', tone: 'orange', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
                        { icon: '🐾', label: 'ACROMEGALY (cat)', sublabel: 'Insulin-resistant DM · IGF-1 ≥1000 ng/mL · organomegaly', tone: 'violet', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
                        { icon: '🚨', label: 'DIABETIC KETOACIDOSIS', sublabel: 'Decompensated DM — sick, dehydrated, ketotic', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'GI — malassimilation (± diarrhoea, soft stool)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '💩', label: 'EXOCRINE PANCREATIC INSUFFICIENCY', sublabel: 'Large-volume malodorous soft stool · TLI dog <2.5 / cat <8.0 µg/L', tone: 'green', link: { to: 'disease', id: 'DIS-GI-EPI' } },
                        { icon: '🦠', label: 'INFLAMMATORY BOWEL DISEASE', sublabel: 'Chronic enteropathy · ↓cobalamin/folate', tone: 'teal', link: { to: 'disease', id: 'DIS-GI-IBD' } },
                        { icon: '🧬', label: 'ALIMENTARY LYMPHOMA', sublabel: 'Infiltrative malabsorption · esp. older cat', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
                        { icon: '🪱', label: 'Intestinal parasites', sublabel: 'Young, unknown deworming → fecal + deworm trial', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🔺 POLYPHAGIA + WEIGHT GAIN — drug / endocrine / behavioural',
          tone: 'teal',
          sub: 'Caloric intake exceeds expenditure · rule out drugs FIRST · then hyperadrenocorticism, hypoglycaemia-driven, or simple overfeeding',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'IATROGENIC/DRUG vs ENDOCRINE vs BEHAVIOURAL?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'DRUG-INDUCED / ENDOCRINE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '💊', label: 'GLUCOCORTICOIDS / iatrogenic', sublabel: 'Steroids drive polyphagia/PU-PD/panting — resolve on withdrawal', tone: 'info', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
                        { icon: '⚡', label: 'ANTICONVULSANTS', sublabel: 'Phenobarbital, KBr — polyphagia + weight gain + PU/PD', tone: 'warning' },
                        { icon: '🐶', label: 'HYPERADRENOCORTICISM (dog)', sublabel: 'PU/PD · polyphagia 60% · pot-belly · LDDST/ACTH-stim', tone: 'violet', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
                        { icon: '🐈', label: 'FELINE HYPERADRENOCORTICISM', sublabel: 'Concurrent DM 79% · skin fragility · IDEX', tone: 'violet', link: { to: 'disease', id: 'DIS-ENDO-HAC-CAT' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'HYPOGLYCAEMIA-DRIVEN / BEHAVIOURAL',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🩸', label: 'INSULINOMA', sublabel: 'Whipple triad: BG <60 mg/dL + hyperinsulinaemia · seizures/collapse', tone: 'danger', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
                        { icon: '📉', label: 'HYPOGLYCAEMIA (other)', sublabel: 'Hepatic failure · hypoadrenocorticism · insulin overdose', tone: 'warning', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
                        { icon: '🍖', label: 'Overfeeding / palatable diet', sublabel: 'Most common — diagnosis once disease excluded', tone: 'neutral' },
                        { icon: '🧠', label: 'Psychogenic / behavioural', sublabel: 'Stress, food competition, learned begging', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong onclick="renderDiseasePage(\'DIS-ENDO-DKA\')" style="cursor:pointer;text-decoration:underline;">Undiagnosed diabetes / DKA</strong> — polyphagia + PU/PD + weight loss; check BG + glucosuria + ketones before it decompensates',
        '<strong onclick="renderDiseasePage(\'DIS-NEO-INSULINOMA\')" style="cursor:pointer;text-decoration:underline;">Insulinoma</strong> — fasting hypoglycaemia drives the appetite; seizures/collapse on fasting — never starve the patient for testing',
        '<strong>Feline hyperthyroidism</strong> — senior cat losing weight despite eating well; palpate the cervical region and run a TT4',
        '<strong>Rule out drugs first</strong> — glucocorticoids, phenobarbital/KBr, benzodiazepines, progestins all cause polyphagia; review every medication before working up',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'polyphagia' } },
        { label: '💧 PU/PD — frequently co-occurs (DM · HAC · hyperthyroid)', link: { to: 'flow', id: 'pupd' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
        { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
        { label: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
        { label: 'Acromegaly / feline hypersomatotropism', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
        { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
        { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
        { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
        { label: 'Hyperadrenocorticism (dog)', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
        { label: 'Feline hyperadrenocorticism', link: { to: 'disease', id: 'DIS-ENDO-HAC-CAT' } },
        { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
        { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
      ],
    },
  ],
}
