// ── Anorexia / Hyporexia flowchart ───────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

export const anorexiaFlow: FlowPage = {
  id: 'anorexia',
  title: 'Anorexia / Hyporexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🍽️ ANOREXIA / HYPOREXIA' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🐈 <strong>Anorexic CAT = emergency.</strong> ≥2–14 days NEB → <strong>feline hepatic lipidosis</strong>. Don\'t rely on appetite stimulants — <strong>feed early</strong> (assisted/tube) once eating &lt;RER for &gt;3–5 days.',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CAN\'T EAT (pseudo-anorexia) vs WON\'T EAT (true anorexia)?',
      sub: 'Watch approach to food: interested but drops it / paws at mouth / gulps painfully = pseudo; ignores food = true anorexia',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🦷 PSEUDO-ANOREXIA — wants to but can\'t',
          tone: 'orange',
          sub: 'Drops food · drooling · pain on prehension · pawing at mouth · gags / regurgitates',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🦷', label: 'ORAL / DENTAL / ORONASAL DISEASE', sublabel: 'Periodontal · fractured tooth · oronasal fistula · oral mass', tone: 'orange', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
                { icon: '🧬', label: 'ORAL / PHARYNGEAL NEOPLASIA', sublabel: 'Mechanical obstruction', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
                { icon: '😬', label: 'Jaw / neuromuscular disease', sublabel: 'Masticatory myositis · TMJ · trigeminal neuritis · retrobulbar', tone: 'neutral' },
                { icon: '🤮', label: 'Oesophageal disease → regurgitation', sublabel: 'Megaoesophagus / obstruction', tone: 'teal', link: { to: 'flow', id: 'vomiting' } },
              ],
            },
          ],
        },
        {
          header: '🩺 TRUE ANOREXIA — won\'t eat (by system)',
          tone: 'info',
          sub: 'Systemic illness, pain, or nausea — screen every system',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'SEARCH SYSTEM-BY-SYSTEM', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  header: 'GI · HEPATOBILIARY · PANCREAS',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🔥', label: 'PANCREATITIS', sublabel: 'Cat: anorexia/lethargy > vomiting · Dog: vomiting, pain', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
                        { icon: '🌽', label: 'GI FOREIGN BODY', sublabel: 'Obstruction — vomiting, pain', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-FB' } },
                        { icon: '🔬', label: 'IBD / CHRONIC ENTEROPATHY', sublabel: 'Chronic GI signs · weight loss', tone: 'green', link: { to: 'disease', id: 'DIS-GI-IBD' } },
                        { icon: '🐈', label: 'FELINE HEPATIC LIPIDOSIS', sublabel: 'Anorexic icteric overweight cat — FEED EARLY', tone: 'danger', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
                        { icon: '🟡', label: 'Hepatobiliary disease', sublabel: 'Chronic hepatitis · cholestasis', tone: 'warning', link: { to: 'flow', id: 'jaundice' } },
                      ],
                    },
                  ],
                },
                {
                  header: 'RENAL · ENDOCRINE · METABOLIC',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫘', label: 'URAEMIA (CKD / AKI)', sublabel: 'Commonest cause of feline anorexia', tone: 'info', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
                        { icon: '🍬', label: 'DIABETIC KETOACIDOSIS', sublabel: 'PU/PD → anorexia, vomiting, ketotic breath', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
                        { icon: '🧂', label: 'HYPOADRENOCORTICISM', sublabel: 'Waxing/waning anorexia ± collapse', tone: 'danger', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
                        { icon: '🦴', label: 'HYPERCALCAEMIA', sublabel: 'Anorexia, PU/PD, weakness', tone: 'warning', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
                      ],
                    },
                  ],
                },
                {
                  header: 'INFECTIOUS / INFLAMMATORY',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦠', label: 'SEPSIS / SEPTIC PERITONITIS', sublabel: 'SIRS · acute febrile anorexia — find & drain the source', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
                        { icon: '🐱', label: 'FIP', sublabel: 'Young cat · fever · effusion · weight loss', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
                      ],
                    },
                  ],
                },
                {
                  header: 'NEOPLASTIC · PAIN / CNS',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧬', label: 'NEOPLASIA / LYMPHOMA', sublabel: 'GI / multicentric · weight loss', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
                        { icon: '📉', label: 'PARANEOPLASTIC / CACHEXIA', sublabel: 'Cytokine-driven appetite loss & muscle wasting', tone: 'purple', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
                        { icon: '😣', label: 'Occult pain · nausea · CNS / behavioural', sublabel: 'OA · chronic pain · drugs (opioids, NSAIDs, chemo) · stress / food aversion · cognitive dysfunction', tone: 'neutral' },
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
  ],
}
