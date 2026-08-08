// ── Coughing flowchart (data) ───────────────────────────────────────────────
// Migration of renderCoughFlow (inline in cliniqApp.ts) to the FlowPage model.
// Single page: entry → character-of-cough step → dry/wet lesion choices, plus a
// trailing "Key species difference" note card. No sub-flows (the two branches
// open lesion tabs, not further render functions). The Dx view
// (renderDxCoughing) is out of scope.

import type { FlowPage } from '../flowTypes'

export const coughingFlows: FlowPage[] = [
  {
    id: 'coughing',
    title: 'Coughing',
    blocks: [
      { kind: 'node', variant: 'entry', text: '🫁 COUGHING' },

      {
        kind: 'node',
        variant: 'step',
        text: 'Observe character of cough',
        sub: 'Cats do NOT cough from cardiac disease',
      },

      {
        kind: 'choices',
        cols: 2,
        size: 11,
        items: [
          {
            variant: 'insp',
            label: '🔵 Dry / Unproductive',
            sublabel: 'Harsh, honking, hacking<br>No sputum produced<br>Ends in a retch or gag, not a swallow',
            link: { to: 'lesion', loc: 'LOC-CO-DRY', name: 'Dry / Unproductive cough' },
          },
          {
            variant: 'rest',
            label: '🟡 Wet / Productive',
            sublabel: 'Moist, rattling<br>Sputum / discharge produced<br>Swallows or licks the lips after coughing',
            link: { to: 'lesion', loc: 'LOC-CO-WET', name: 'Wet / Productive cough' },
          },
        ],
      },

      // Trailing "Key species difference" note card — a neutral-tone infoBox.
      {
        kind: 'infoBox',
        tone: 'neutral',
        gap: 12,
        icon: '💡',
        title: 'KEY SPECIES DIFFERENCE',
        html: `<strong style="color:var(--white);">Dogs</strong> cough from both cardiac and respiratory disease.<br>
      <strong style="color:var(--white);">Cats</strong> do <strong style="color:var(--tone-danger-fg);">NOT</strong> cough from cardiac disease — if a cat is coughing, it is respiratory.`,
      },

      { kind: 'disclaimer' },
    ],
  },
]
