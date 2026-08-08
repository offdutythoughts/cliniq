// ── Constipation / Tenesmus flowchart ────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

const constipationEntry: FlowPage = {
  id: 'constipation',
  title: 'Constipation / Tenesmus',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'CONSTIPATION / TENESMUS' },
    {
      kind: 'callout',
      tone: 'danger',
      html: '<strong>FIRST: straining to DEFECATE or URINATE?</strong> Tenesmus and <strong>stranguria</strong> look identical to an owner. Palpate the bladder — a blocked male cat straining unproductively is a <strong>hyperkalaemic emergency</strong>, not constipation.<br>• <strong>Obstipation</strong> = cannot defecate without intervention<br>• Recurrent obstipation → <strong>idiopathic megacolon</strong><br>(Ettinger Ch 51)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRMED DEFECATION STRAINING — WHAT IS THE MECHANISM?',
      subItems: [
        'Tenesmus precedes defecation in obstructive disease',
        'Tenesmus follows defecation in inflammatory disease',
        'Rectal exam is key — pelvic canal, prostate, masses, stricture, anal sacs',
      ],
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'orange',
          label: 'OBSTRUCTIVE / INTRALUMINAL',
          sublabel: 'Hard faecal mass palpable in the colon · rectal exam finds a lesion or narrowing inside the lumen',
          link: { to: 'flow', id: 'constipation-obstructive' },
        },
        {
          tone: 'violet',
          label: 'PELVIC / EXTRALUMINAL',
          sublabel: 'Narrowed pelvic canal or compressive mass outside the bowel wall',
          link: { to: 'flow', id: 'constipation-pelvic' },
        },
        {
          tone: 'teal',
          label: 'NEUROMUSCULAR / METABOLIC',
          sublabel: 'Colon fills but does not propel — soft to doughy faeces and weak, ineffective straining',
          link: { to: 'flow', id: 'constipation-neuromet' },
        },
      ],
    },
  ],
}

const constipationObstructive: FlowPage = {
  id: 'constipation-obstructive',
  title: 'Constipation — Obstructive / Intraluminal',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'OBSTRUCTIVE / INTRALUMINAL', sub: 'Impacted faeces · foreign material · intraluminal mass · stricture' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Impaction / Dietary',
          tone: 'orange',
          tiles: [
            { label: 'Impacted faeces / dietary', link: { to: 'disease', id: 'DIS-GI-MEGA' } },
          ],
        },
        {
          cat: 'Infectious / Inflammatory',
          tone: 'danger',
          tiles: [
            { label: 'Perianal fistula', link: { to: 'disease', id: 'DIS-GI-PERIANAL' } },
            { label: 'Anal sacculitis', link: { to: 'disease', id: 'DIS-GI-ANALSAC' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Rectal / colonic neoplasia', link: { to: 'disease', id: 'DIS-GI-RECTAL' } },
            { label: 'Rectal / colonic stricture', link: { to: 'disease', id: 'DIS-GI-RECTALSTRICT' } },
            { label: 'Colonic diverticulum', link: { to: 'disease', id: 'DIS-GI-DIVERTICULUM' } },
          ],
        },
      ],
    },
  ],
}

const constipationPelvic: FlowPage = {
  id: 'constipation-pelvic',
  title: 'Constipation — Pelvic / Extraluminal',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'PELVIC / EXTRALUMINAL', sub: 'Narrowed pelvic canal or compressive mass outside the bowel wall' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Structural / Mechanical',
          tone: 'slate',
          tiles: [
            { label: 'Healed pelvic-fracture narrowing', link: { to: 'disease', id: 'DIS-NEU-SPFX' } },
            { label: 'Prostatomegaly — BPH', link: { to: 'disease', id: 'DIS-URO-BPH' } },
          ],
        },
        {
          cat: 'Infectious',
          tiles: [
            { label: 'Prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Prostatic carcinoma', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
            { label: 'Sublumbar / AGASACA', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
          ],
        },
      ],
    },
  ],
}

const constipationNeuromet: FlowPage = {
  id: 'constipation-neuromet',
  title: 'Constipation — Neuromuscular / Metabolic',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'NEUROMUSCULAR / METABOLIC', sub: 'Failure of colonic propulsion: nerve disease, electrolyte/endocrine derangement, or dehydration' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Neurological',
          tiles: [
            { label: 'Lumbosacral / cauda equina', link: { to: 'disease', id: 'DIS-NEU-DLSS' } },
            { label: 'Dysautonomia', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
          ],
        },
        {
          cat: 'Metabolic / Endocrine',
          tiles: [
            { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
            { label: 'Hypothyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
          ],
        },
        {
          cat: 'Renal / Systemic',
          tone: 'info',
          tiles: [
            { label: 'CKD / dehydration', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
          ],
        },
      ],
    },
  ],
}

export const constipationFlows: FlowPage[] = [
  constipationEntry,
  constipationObstructive,
  constipationPelvic,
  constipationNeuromet,
]
