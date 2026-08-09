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
      subItems: [
        'First exclude pregnancy / lactation, growth, increased exercise or cold, and an obvious dietary or behavioural cause',
        'Then the weight trend splits the differential (Ettinger Ch 19)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' POLYPHAGIA + WEIGHT LOSS — pathologic',
          sublabel: 'Ravenous but thin · PU/PD often co-occurs · loose, bulky or greasy stools point to nutrient loss',
          link: { to: 'flow', id: 'polyphagia-weightloss' },
        },
        {
          tone: 'teal',
          label: ' POLYPHAGIA + WEIGHT GAIN — drug / endocrine / behavioural',
          sublabel: 'Weight rising with the intake · body condition ≥6/9 · take a drug history before anything else',
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
        '<strong>Rule out drugs first</strong> — glucocorticoids, phenobarbital/KBr, benzodiazepines, progestins all cause polyphagia; review every medication before working up',
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
            { label: 'Diabetic ketoacidosis', link: { to: 'protocol', id: 'PROT-ENDO-DKA' } },
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
