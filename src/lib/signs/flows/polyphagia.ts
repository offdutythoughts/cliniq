// ── Polyphagia flowchart ─────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const polyphagiaEntry: FlowPage = {
  id: 'polyphagia',
  title: 'Polyphagia',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' POLYPHAGIA' },
    // No pivot callout: the two cards below ARE the pivot, and each carries the
    // mechanism + the findings that pick it. A paragraph above them would state
    // the same split a second time and age separately from the cards.
    {
      kind: 'node',
      variant: 'step',
      text: 'WEIGH THE PATIENT — IS BW RISING OR FALLING?',
      subItems: [
        'First exclude pregnancy / lactation, growth, increased exercise or cold, and an obvious dietary cause',
        'Then review the drug list — glucocorticoids, phenobarbital / KBr, benzodiazepines, progestins (Ettinger Ch 19)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' POLYPHAGIA + WEIGHT LOSS — pathologic',
          sublabel: '↑demand or nutrient loss · ravenous but thin · PU/PD often co-occurs · loose, bulky or greasy stools',
          link: { to: 'flow', id: 'polyphagia-weightloss' },
        },
        {
          tone: 'teal',
          label: ' POLYPHAGIA + WEIGHT GAIN — drug / endocrine / behavioural',
          sublabel: 'Intake exceeds expenditure · weight rising · body condition ≥6/9 · drug history first',
          link: { to: 'flow', id: 'polyphagia-weightgain' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        { bold: 'Undiagnosed diabetes / DKA', link: { to: 'disease', id: 'DIS-ENDO-DKA' }, html: ' — polyphagia + PU/PD + weight loss; check BG + glucosuria + ketones before it decompensates' },
        { bold: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' }, html: ' — fasting hypoglycaemia drives the appetite; seizures/collapse on fasting — never starve the patient for testing' },
        '<strong>Feline hyperthyroidism</strong> — senior cat losing weight despite eating well; palpate the cervical region and run a TT4',
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
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: 'Acromegaly (cat)', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
          ],
        },
        {
          cat: 'GI Malassimilation',
          tone: 'orange',
          tiles: [
            { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Intestinal parasites', link: { to: 'flow', id: 'gi-parasites' } },
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
            { label: 'Glucocorticoids / iatrogenic', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: 'Anticonvulsants — phenobarbital, KBr', terminal: true },
            { label: 'Hyperadrenocorticism (dog)', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: 'Feline hyperadrenocorticism', link: { to: 'disease', id: 'DIS-ENDO-HAC-CAT' } },
          ],
        },
        {
          cat: 'Hypoglycaemia-Driven',
          tone: 'danger',
          tiles: [
            { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: 'Hypoglycaemia (other)', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
          ],
        },
        {
          cat: 'Behavioural',
          tone: 'slate',
          tiles: [
            { label: ' Overfeeding / palatable diet — most common', terminal: true },
            { label: ' Psychogenic / behavioural — stress, food competition, learned begging', terminal: true },
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
