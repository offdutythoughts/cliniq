// ── Polyphagia flowchart ─────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const polyphagiaEntry: FlowPage = {
  id: 'polyphagia',
  title: 'Polyphagia',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' POLYPHAGIA' },
    {
      kind: 'callout',
      tone: 'info',
      html: ' <strong>Body-weight trend is the pivot.</strong> Polyphagia <strong>+ weight LOSS</strong> = pathologic (↑demand or nutrient loss) — diabetes, hyperthyroid cat, EPI, IBD/lymphoma, acromegaly. Polyphagia <strong>+ weight GAIN</strong> = drug-induced, hyperadrenocorticism, insulinoma, or simple overfeeding. <strong>Rule out drugs first</strong> — glucocorticoids, anticonvulsants (phenobarbital, KBr), benzodiazepines, progestins all drive appetite. (Ettinger Ch 19)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'WEIGH THE PATIENT — IS BW RISING OR FALLING?',
      sub: 'After excluding pregnancy/lactation, growth, increased exercise/cold, and an obvious dietary/behavioural cause, the weight trend splits the differential (Ettinger Ch 19)',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' POLYPHAGIA + WEIGHT LOSS — pathologic',
          sublabel: '↑metabolic demand OR nutrient loss/malabsorption · PU/PD often co-occurs (DM, hyperthyroid) · GI signs point to malassimilation',
          link: { to: 'flow', id: 'polyphagia-weightloss' },
        },
        {
          tone: 'teal',
          label: ' POLYPHAGIA + WEIGHT GAIN — drug / endocrine / behavioural',
          sublabel: 'Caloric intake exceeds expenditure · rule out drugs FIRST · then hyperadrenocorticism, hypoglycaemia-driven, or simple overfeeding',
          link: { to: 'flow', id: 'polyphagia-weightgain' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: ' ALWAYS RULE OUT / DON\'T MISS',
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
        { label: ' Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'polyphagia' } },
        { label: ' PU/PD — frequently co-occurs (DM · HAC · hyperthyroid)', link: { to: 'flow', id: 'pupd' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: ' DISEASE PAGES',
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

const polyphagiaWeightLoss: FlowPage = {
  id: 'polyphagia-weightloss',
  title: 'Polyphagia + Weight Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' POLYPHAGIA + WEIGHT LOSS — pathologic', sub: '↑metabolic demand OR nutrient loss/malabsorption · PU/PD often co-occurs (DM, hyperthyroid) · GI signs point to malassimilation' },
    { kind: 'node', variant: 'step', text: '↑METABOLIC DEMAND / ENERGY LOSS vs MALABSORPTION?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Endocrine (↑ Demand / Glucose Loss)',
          tone: 'warning',
          tiles: [
            { label: ' DIABETES MELLITUS', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: ' FELINE HYPERTHYROIDISM', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: ' ACROMEGALY (cat)', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
            { label: ' DIABETIC KETOACIDOSIS', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
          ],
        },
        {
          cat: 'GI Malassimilation',
          tone: 'orange',
          tiles: [
            { label: ' EXOCRINE PANCREATIC INSUFFICIENCY', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: ' INFLAMMATORY BOWEL DISEASE', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: ' ALIMENTARY LYMPHOMA', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: ' Intestinal parasites — young / unknown deworming', link: { to: 'disease', id: 'DIS-GI-GIARDIA' } },
          ],
        },
      ],
    },
  ],
}

const polyphagiaWeightGain: FlowPage = {
  id: 'polyphagia-weightgain',
  title: 'Polyphagia + Weight Gain',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' POLYPHAGIA + WEIGHT GAIN — drug / endocrine / behavioural', sub: 'Caloric intake exceeds expenditure · rule out drugs FIRST · then hyperadrenocorticism, hypoglycaemia-driven, or simple overfeeding' },
    { kind: 'node', variant: 'step', text: 'IATROGENIC/DRUG vs ENDOCRINE vs BEHAVIOURAL?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Drug-Induced / Endocrine',
          tone: 'warning',
          tiles: [
            { label: ' GLUCOCORTICOIDS / iatrogenic', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: ' ANTICONVULSANTS — phenobarbital, KBr' },
            { label: ' HYPERADRENOCORTICISM (dog)', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: ' FELINE HYPERADRENOCORTICISM', link: { to: 'disease', id: 'DIS-ENDO-HAC-CAT' } },
          ],
        },
        {
          cat: 'Hypoglycaemia-Driven',
          tone: 'danger',
          tiles: [
            { label: ' INSULINOMA', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: ' HYPOGLYCAEMIA (other)', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
          ],
        },
        {
          cat: 'Behavioural',
          tone: 'neutral',
          tiles: [
            { label: ' Overfeeding / palatable diet — most common' },
            { label: ' Psychogenic / behavioural — stress, food competition, learned begging' },
          ],
        },
      ],
    },
  ],
}

export const polyphagiaFlows: FlowPage[] = [
  polyphagiaEntry,
  polyphagiaWeightLoss,
  polyphagiaWeightGain,
]
