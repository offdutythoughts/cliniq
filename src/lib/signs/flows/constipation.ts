// ── Constipation / Tenesmus flowchart ────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const constipationEntry: FlowPage = {
  id: 'constipation',
  title: 'Constipation / Tenesmus',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'CONSTIPATION / TENESMUS' },
    {
      kind: 'callout',
      tone: 'danger',
      html: '<strong>FIRST: straining to DEFECATE or URINATE?</strong> Tenesmus and <strong>stranguria</strong> look identical to an owner. Palpate the bladder — a blocked male cat straining unproductively is a <strong>hyperkalaemic emergency</strong>, not constipation. <strong>Obstipation</strong> = cannot defecate without intervention; recurrent → <strong>idiopathic megacolon</strong>. (Ettinger Ch 51)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRMED DEFECATION STRAINING — WHAT IS THE MECHANISM?',
      sub: 'Tenesmus precedes defecation in obstructive disease, follows it in inflammatory disease; rectal exam is key — pelvic canal, prostate, masses, stricture, anal sacs',
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'orange',
          label: 'OBSTRUCTIVE / INTRALUMINAL',
          sublabel: 'Impacted faeces · foreign material · intraluminal mass · stricture',
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
          sublabel: 'Failure of colonic propulsion: nerve disease, electrolyte/endocrine derangement, or dehydration',
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
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Impaction / Dietary',
          tone: 'orange',
          tiles: [
            { label: 'IMPACTED FAECES / DIETARY — pica (bones, hair, litter) · obstipation → feline megacolon', link: { to: 'disease', id: 'DIS-GI-MEGA' } },
          ],
        },
        {
          cat: 'Infectious / Inflammatory',
          tone: 'danger',
          tiles: [
            { label: 'PERIANAL FISTULA', link: { to: 'disease', id: 'DIS-GI-PERIANAL' } },
            { label: 'ANAL SACCULITIS', link: { to: 'disease', id: 'DIS-GI-ANALSAC' } },
          ],
        },
        {
          cat: 'Neoplastic / Mass',
          tone: 'violet',
          tiles: [
            { label: 'RECTAL / COLONIC MASS — neoplasia · stricture · diverticulum', link: { to: 'disease', id: 'DIS-GI-RECTAL' } },
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
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Structural / Mechanical',
          tone: 'neutral',
          tiles: [
            { label: 'HEALED PELVIC-FRACTURE NARROWING', link: { to: 'disease', id: 'DIS-NEU-SPFX' } },
            { label: 'PROSTATOMEGALY — BPH', link: { to: 'disease', id: 'DIS-URO-BPH' } },
          ],
        },
        {
          cat: 'Infectious',
          tone: 'danger',
          tiles: [
            { label: 'PROSTATITIS', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: 'PROSTATIC CARCINOMA', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
            { label: 'SUBLUMBAR / AGASACA', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
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
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Neurological',
          tone: 'violet',
          tiles: [
            { label: 'LUMBOSACRAL / CAUDA EQUINA', link: { to: 'disease', id: 'DIS-NEU-DLSS' } },
            { label: 'DYSAUTONOMIA', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
          ],
        },
        {
          cat: 'Endocrine / Metabolic',
          tone: 'warning',
          tiles: [
            { label: 'HYPOKALAEMIA', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
            { label: 'HYPOTHYROIDISM', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
            { label: 'HYPERCALCAEMIA', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
          ],
        },
        {
          cat: 'Renal / Systemic',
          tone: 'info',
          tiles: [
            { label: 'CKD / DEHYDRATION', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
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
