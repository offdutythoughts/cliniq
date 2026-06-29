// ── Vomiting flowchart (data) ───────────────────────────────────────────────
// Source: the legacy "Vomiting" entry screen. It has no separate content
// sub-flows: the two regurgitation endpoints go straight to the lesion tabs via
// goLesionTab('LOC-OESOPH' / 'LOC-OESOPH-EXT', …) — they were one-line redirects
// in the legacy, now inlined as direct goLesionTab calls.
//
// The entry's middle section is a bespoke asymmetric 2-column branch (3fr 2fr)
// with nested YES/NO sub-grids and the .flow-endpoint.gi-upper / .gi-primary /
// .gi-secondary / .oesoph CSS colour classes. No typed block reproduces that
// asymmetric grid or those CSS classes, so it is an `html` block (same approach
// as abnormalPupilNeuro). The lesion links live inside that html via the legacy
// goLesionTab / renderOesophFlow / renderExtraOesophFlow onclicks (kept verbatim
// — still exposed on window) and so are NOT validated by the link-integrity
// test. The entry/step nodes and the trailing exception strip are typed.

import type { FlowPage } from '../flowTypes'

const vomitingEntry: FlowPage = {
  id: 'vomiting',
  title: 'Vomiting',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🤢 VOMITING' },
    {
      kind: 'node',
      variant: 'step',
      text: 'DIFFERENTIATE: TRUE VOMIT vs REGURGITATION',
      sub: 'Active effort + nausea vs passive no effort',
    },
    {
      kind: 'branch',
      columns: [
        {
          header: 'TRUE VOMITING',
          tone: 'teal',
          sub: 'active abdominal effort, nausea, retching',
          blocks: [
            { kind: 'node', variant: 'step', text: 'IS VOMITING RELATED TO EATING?' },
            {
              kind: 'branch',
              columns: [
                {
                  header: 'YES — related to eating',
                  tone: 'green',
                  blocks: [
                    { kind: 'endpoints', items: [
                      { label: 'Stomach', tone: 'green', link: { to: 'lesion', loc: 'LOC-GI-UPPER', name: 'Stomach' } },
                    ]},
                  ],
                },
                {
                  header: 'NOT related to eating',
                  tone: 'slate',
                  blocks: [
                    { kind: 'node', variant: 'step', text: 'Other systemic signs?\nPU/PD, jaundice, malaise' },
                    {
                      kind: 'branch',
                      columns: [
                        {
                          header: 'NO — bright alert',
                          tone: 'teal',
                          blocks: [
                            { kind: 'endpoints', items: [
                              { label: 'Primary GI', tone: 'teal', link: { to: 'lesion', loc: 'LOC-GI-PRIMARY', name: 'Primary GI' } },
                            ]},
                          ],
                        },
                        {
                          header: 'YES — systemic ill',
                          tone: 'warning',
                          blocks: [
                            { kind: 'endpoints', items: [
                              { label: 'Secondary / Extra-GI', tone: 'warning', link: { to: 'lesion', loc: 'LOC-GI-SECONDARY', name: 'Secondary / Extra-GI' } },
                            ]},
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: 'REGURGITATION',
          tone: 'indigo',
          sub: 'passive, no effort, no bile',
          blocks: [
            { kind: 'node', variant: 'step', text: 'Intrinsic vs extrinsic cause?' },
            { kind: 'endpoints', items: [
              { label: 'Oesophagus', tone: 'teal', link: { to: 'lesion', loc: 'LOC-OESOPH', name: 'Oesophageal Disease' } },
              { label: 'Extra-Oesophageal', tone: 'orange', link: { to: 'lesion', loc: 'LOC-OESOPH-EXT', name: 'Extra-Oesophageal Disease' } },
            ]},
          ],
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 12,
      html: '⚠️ Exception rules: Dog pancreatitis behaves like PRIMARY GI. Cat pancreatitis behaves like SECONDARY GI. Feline hyperthyroidism = prolonged intermittent vomiting in apparently well cat.',
    },
  ],
}

export const vomitingFlows: FlowPage[] = [vomitingEntry]
