// ── Disorientation flowchart (data) ─────────────────────────────────────────
// Migration of renderEncephalopathyFlow (inline in src/lib/cliniqApp.ts) to the
// FlowPage model. Self-contained: the four pattern-nodes link to lesion tabs;
// no sub-flows or dx links.

import type { FlowPage } from '../flowTypes'

export const encephalopathyFlows: FlowPage[] = [
  {
    id: 'encephalopathy',
    title: 'Encephalopathy',
    blocks: [
      { kind: 'node', variant: 'entry', text: '🧬 ACUTE ENCEPHALOPATHY' },

      // Legacy: two 2-column .flow-node grids (gap:6px) separated only by a 6px
      // spacer — reproduced as one cols:2 choices grid (row+column gap 6px),
      // reading order Encephalitis · Neoplasia · CVA · Metabolic.
      {
        kind: 'choices',
        cols: 2,
        size: 11,
        connectAfter: false,
        items: [
          { variant: 'mixed', label: 'Encephalitis', link: { to: 'lesion', loc: 'LOC-EN-INFLAM', name: 'Encephalitis' } },
          { variant: 'rest', label: 'Neoplasia', link: { to: 'lesion', loc: 'LOC-EN-NEO', name: 'Intracranial neoplasia' } },
          { variant: 'insp', label: 'CVA (Stroke)', link: { to: 'lesion', loc: 'LOC-EN-CVA', name: 'CVA' } },
          { variant: 'exp', label: 'Metabolic', link: { to: 'lesion', loc: 'LOC-EN-METAB', name: 'Metabolic encephalopathy' } },
        ],
      },

      // Legacy trailing danger box (single bold line, outside .flow-wrap). Closest
      // typed block: a title-only callout (title renders at 11px bold, matching).
      {
        kind: 'callout',
        tone: 'danger',
        gap: 12,
        title: '⚠️ Elevated ICP: Mannitol 0.25–0.5g/kg over 15min',
        html: '',
      },

      { kind: 'disclaimer' },
    ],
  },
]
