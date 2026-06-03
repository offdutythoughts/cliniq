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
            sublabel: 'Harsh, honking, hacking<br>No sputum produced<br>Tracheal, cardiac, infectious',
            link: { to: 'lesion', loc: 'LOC-CO-DRY', name: 'Dry / Unproductive cough' },
          },
          {
            variant: 'rest',
            label: '🟡 Wet / Productive',
            sublabel: 'Moist, rattling<br>Sputum / discharge produced<br>Pneumonia, oedema, lungworm',
            link: { to: 'lesion', loc: 'LOC-CO-WET', name: 'Wet / Productive cough' },
          },
        ],
      },

      // Trailing "Key species difference" note card. The legacy uses a neutral
      // var(--card)/var(--border) card with a var(--gray2) uppercase header and
      // inline var(--white)/#FCA5A5 strongs — none of which the tone-based
      // `callout` block can reproduce — so this is an escape-hatch html block.
      // It carries no links. width:100% keeps it full-width inside .flow-wrap,
      // matching the legacy block (which sat just outside .flow-wrap).
      {
        kind: 'html',
        html: `<div style="margin-top:12px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:12px;width:100%;">
    <div style="font-size:11px;font-weight:600;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">💡 Key species difference</div>
    <div style="font-size:12px;color:var(--gray);line-height:1.65;">
      <strong style="color:var(--white);">Dogs</strong> cough from both cardiac and respiratory disease.<br>
      <strong style="color:var(--white);">Cats</strong> do <strong style="color:#FCA5A5;">NOT</strong> cough from cardiac disease — if a cat is coughing, it is respiratory.
    </div>
  </div>`,
      },

      { kind: 'disclaimer' },
    ],
  },
]
