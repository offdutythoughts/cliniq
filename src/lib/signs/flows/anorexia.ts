// ── Anorexia / Hyporexia flowchart ───────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const anorexiaEntry: FlowPage = {
  id: 'anorexia',
  title: 'Anorexia / Hyporexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🍽️ ANOREXIA / HYPOREXIA' },
    {
      kind: 'callout',
      tone: 'danger',
      html: '🐈 <strong>Anorexic CAT = emergency.</strong> Hepatic lipidosis can develop in as few as <strong>2 days</strong> in obese cats (typically within 1–2 weeks). Don\'t rely on appetite stimulants — <strong>feed early</strong> (assisted/tube) once eating &lt;RER for &gt;3–5 days. RER (kcal/day) = (30 × kg) + 70 for 3–25 kg cats, or 70 × kg<sup>0.75</sup> for any weight.',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CAN\'T EAT (pseudo-anorexia) vs WON\'T EAT (true anorexia)?',
      sub: 'Watch approach to food: interested but drops it / paws at mouth / gulps painfully = pseudo; ignores food = true anorexia',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'orange',
          label: '🦷 PSEUDO-ANOREXIA — wants to but can\'t',
          sublabel: 'Drops food · drooling · pain on prehension · pawing at mouth · gags / regurgitates',
          link: { to: 'flow', id: 'anorexia-pseudo' },
        },
        {
          tone: 'info',
          label: '🩺 TRUE ANOREXIA — won\'t eat (by system)',
          sublabel: 'Systemic illness, pain, or nausea — screen every system',
          link: { to: 'flow', id: 'anorexia-true' },
        },
      ],
    },
  ],
}

const anorexiaPseudo: FlowPage = {
  id: 'anorexia-pseudo',
  title: 'Pseudo-Anorexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🦷 PSEUDO-ANOREXIA — wants to but can\'t', sub: 'Drops food · drooling · pain on prehension · pawing at mouth · gags / regurgitates' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY LESION CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Oral / Dental',
          tone: 'orange',
          tiles: [
            { label: 'Oral / Dental / Oronasal Disease', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: 'Oral / Pharyngeal Neoplasia', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
          ],
        },
        {
          cat: 'Neuromuscular',
          tone: 'neutral',
          tiles: [
            { label: 'Jaw / Neuromuscular Disease' },
          ],
        },
        {
          cat: 'Oesophageal',
          tone: 'teal',
          tiles: [
            { label: 'Oesophageal disease → regurgitation', link: { to: 'flow', id: 'vomiting' } },
          ],
        },
      ],
    },
  ],
}

const anorexiaTrue: FlowPage = {
  id: 'anorexia-true',
  title: 'True Anorexia — by system',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🩺 TRUE ANOREXIA — won\'t eat (by system)', sub: 'Systemic illness, pain, or nausea — screen every system' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'GI · Pancreas',
          tone: 'orange',
          tiles: [
            { label: 'Pancreatitis', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            { label: 'GI Foreign Body', link: { to: 'disease', id: 'DIS-GI-FB' } },
            { label: 'IBD / Chronic Enteropathy', link: { to: 'disease', id: 'DIS-GI-IBD' } },
          ],
        },
        {
          cat: 'Hepatobiliary',
          tone: 'warning',
          tiles: [
            { label: 'Feline Hepatic Lipidosis', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
            { label: 'Hepatobiliary disease', link: { to: 'flow', id: 'jaundice' } },
          ],
        },
        {
          cat: 'Renal · Metabolic',
          tone: 'info',
          tiles: [
            { label: 'Uraemia (CKD / AKI)', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Diabetic Ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
          ],
        },
        {
          cat: 'Infectious',
          tone: 'danger',
          tiles: [
            { label: 'Sepsis / Septic Peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
            { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: 'Neoplasia / Lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Paraneoplastic / Cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
          ],
        },
        {
          cat: 'Pain · CNS',
          tone: 'neutral',
          tiles: [
            { label: 'Occult pain · nausea · CNS' },
          ],
        },
      ],
    },
  ],
}

export const anorexiaFlows: FlowPage[] = [anorexiaEntry, anorexiaPseudo, anorexiaTrue]
