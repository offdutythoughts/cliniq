// ── Weight Loss flowchart ────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const weightLossEntry: FlowPage = {
  id: 'weight-loss',
  title: 'Weight Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' WEIGHT LOSS' },
    // The two pre-checks are things to DO before the case is worked up, so they
    // are the step's bullets; the appetite split itself is carried by the two
    // cards below and is not restated here.
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRM THE LOSS AND THE DIET — THEN ASK ABOUT APPETITE',
      subItems: [
        'Confirm TRUE loss against recorded serial weights — ~5% of body weight in <12 months warrants investigation',
        'Confirm the diet is adequate in quality AND quantity before working the case up',
        'Exclude underfeeding, poor-quality food, competition or limited access (Ettinger Ch 18)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'teal',
          label: ' NORMAL / ↑ APPETITE',
          link: { to: 'flow', id: 'weight-loss-appetite' },
        },
        {
          tone: 'violet',
          label: ' REDUCED APPETITE',
          link: { to: 'flow', id: 'weight-loss-reduced' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        { bold: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' }, html: ' — older cat losing weight WITH a good appetite; always run a basal TT4' },
        '<strong>Diabetes mellitus / DKA</strong> — PU/PD + polyphagia + weight loss; a sick inappetent diabetic may be in ketoacidosis (emergency)',
        { bold: 'GI / alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' }, html: ' — infiltrative weight loss, especially in the older cat with normal-to-poor appetite' },
        '<strong>Cardiac cachexia</strong> — weight + muscle loss in a patient with underlying heart disease (DCM / CHF) is a marker of poor prognosis',
        '<strong>FIV / FeLV</strong> — retroviral status changes the differential and prognosis in any cat with chronic wasting',
      ],
    },

  ],
}

const weightLossAppetite: FlowPage = {
  id: 'weight-loss-appetite',
  title: 'Weight Loss — Normal / Increased Appetite',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' NORMAL / ↑ APPETITE', sub: 'Eating well (often ravenous) yet losing weight → calories lost or not utilised (maldigestion / malabsorption / glucosuria) OR hypermetabolism. (Ettinger Ch 18)' },
    { kind: 'node', variant: 'step', text: 'MALASSIMILATION vs HYPERMETABOLISM / GLUCOSE LOSS?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'GI Malassimilation',
          tone: 'orange',
          tiles: [
            { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'GI / alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
            { label: 'GI parasites', link: { to: 'flow', id: 'gi-parasites' } },
          ],
        },
        {
          cat: 'Endocrine / Hypermetabolism',
          tone: 'warning',
          tiles: [
            { label: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
          ],
        },
      ],
    },
  ],
}

const weightLossReduced: FlowPage = {
  id: 'weight-loss-reduced',
  title: 'Weight Loss — Reduced Appetite',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' REDUCED APPETITE', sub: 'Eating poorly + losing weight → overlaps anorexia. Chronic organ disease, neoplasia / paraneoplastic cachexia, or chronic infection drives an inflammatory / cachectic state. (Ettinger Ch 18)' },
    { kind: 'node', variant: 'step', text: 'CHRONIC ORGAN DISEASE vs NEOPLASIA vs CHRONIC INFECTION?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Chronic Organ Disease',
          tone: 'info',
          tiles: [
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Chronic hepatic disease', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Cardiac cachexia (DCM)', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Paraneoplastic cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
          ],
        },
        {
          cat: 'Chronic Infection',
          tone: 'danger',
          tiles: [
            { label: ' FIV', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
            { label: ' FeLV', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
            { label: ' FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
          ],
        },
      ],
    },
  ],
}

export const weightLossFlows: FlowPage[] = [
  weightLossEntry,
  weightLossAppetite,
  weightLossReduced,
]
