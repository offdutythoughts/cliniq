// ── Weight Loss flowchart ────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const weightLossEntry: FlowPage = {
  id: 'weight-loss',
  title: 'Weight Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' WEIGHT LOSS' },
    {
      kind: 'callout',
      tone: 'warning',
      html: ' <strong>FIRST confirm it is TRUE weight loss</strong> — compare recorded serial weights; <strong>~5% body weight over &lt;12 months</strong> warrants investigation. <strong>THEN confirm the diet is adequate</strong> in quality AND quantity (rule out underfeeding, poor-quality food, competition / limited access). Only then work the case up. (Ettinger Ch 18)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'WHAT IS THE APPETITE?',
      sub: 'The appetite is the pivot: weight loss DESPITE a normal/increased appetite (calories are lost or unusable, or metabolism is high) vs weight loss WITH a reduced appetite (overlaps anorexia — chronic organ disease, cancer, chronic infection). (Ettinger Ch 18)',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'teal',
          label: ' NORMAL / ↑ APPETITE',
          sublabel: 'Eating well (often ravenous) yet losing weight → calories lost or not utilised (maldigestion / malabsorption / glucosuria) OR hypermetabolism',
          link: { to: 'flow', id: 'weight-loss-appetite' },
        },
        {
          tone: 'violet',
          label: ' REDUCED APPETITE',
          sublabel: 'Eating poorly + losing weight → overlaps anorexia. Chronic organ disease, neoplasia / paraneoplastic cachexia, or chronic infection',
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
            { label: ' EXOCRINE PANCREATIC INSUFFICIENCY', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: ' INFLAMMATORY BOWEL DISEASE', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: ' GI / ALIMENTARY LYMPHOMA', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: ' PROTEIN-LOSING ENTEROPATHY', link: { to: 'disease', id: 'DIS-GI-PLE' } },
            { label: 'GI parasites', link: { to: 'flow', id: 'gi-parasites' } },
          ],
        },
        {
          cat: 'Endocrine / Hypermetabolism',
          tone: 'warning',
          tiles: [
            { label: ' FELINE HYPERTHYROIDISM', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: ' DIABETES MELLITUS', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: ' DIABETIC KETOACIDOSIS', link: { to: 'protocol', id: 'PROT-ENDO-DKA' } },
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
            { label: ' CHRONIC KIDNEY DISEASE', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: ' CHRONIC HEPATIC DISEASE', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: ' CARDIAC CACHEXIA (DCM)', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: ' HEARTWORM DISEASE', link: { to: 'disease', id: 'DIS-CARD-HW' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: ' LYMPHOMA', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: ' PARANEOPLASTIC CACHEXIA', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
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
