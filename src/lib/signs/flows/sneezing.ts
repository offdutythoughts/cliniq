// ── Sneezing flowchart (data) ───────────────────────────────────────────────
// Migration of renderSneezeFlow (inline in cliniqApp.ts) to the FlowPage model.
// Self-contained: the two laterality branches link to lesion tabs; no sub-flows
// or dx links. The trailing "Key note" box is a neutral-tone `infoBox`.

import type { FlowPage } from '../flowTypes'

export const sneezingFlows: FlowPage[] = [
  {
    id: 'sneezing',
    title: 'Sneezing',
    blocks: [
      { kind: 'node', variant: 'entry', text: '🤧 SNEEZING' },

      {
        kind: 'node',
        variant: 'step',
        text: 'Assess laterality of nasal discharge',
        sub: 'Unilateral = structural until proven otherwise',
      },

      {
        kind: 'choices',
        cols: 2,
        size: 11,
        items: [
          {
            variant: 'mixed',
            label: 'Unilateral',
            link: { to: 'lesion', loc: 'LOC-SN-UNI', name: 'Unilateral sneezing' },
          },
          {
            variant: 'exp',
            label: 'Bilateral',
            link: { to: 'lesion', loc: 'LOC-SN-BI', name: 'Bilateral sneezing' },
          },
        ],
      },

      // Trailing "Key note" box — a neutral-tone infoBox.
      {
        kind: 'infoBox',
        tone: 'neutral',
        gap: 12,
        icon: '💡',
        title: 'KEY NOTE',
        html:
          '<strong style="color:var(--white);">Unilateral</strong> is more likely structural (foreign body, tumour, fungal) and warrants advanced imaging.<br>' +
          '<strong style="color:var(--white);">Bilateral</strong> is more likely infectious or inflammatory, but always exclude neoplasia in chronic cases.',
      },

      { kind: 'disclaimer' },
    ],
  },
]
