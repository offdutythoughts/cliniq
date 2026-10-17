// ── Systemic hypertension flowchart ─────────────────────────────────────────
// Confirm (ACVIM 2018 protocol) → look for target-organ damage → find the
// secondary cause. Ettinger 9th edn Ch 91, 236 (ettinger9-notes.md).

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

export const hypertensionFlow: FlowPage = {
  id: 'hypertension',
  title: 'Hypertension',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      text: '📈 SYSTEMIC HYPERTENSION',
      sub: 'ACVIM 2018: <140 normotensive · 140–159 prehypertensive · 160–179 hypertensive · ≥180 mmHg severely hypertensive',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRM — SITUATIONAL HYPERTENSION IS THE COMMONEST CONFOUNDER',
      subItems: [
        'Quiet room, owner present, 5–10 min acclimatisation',
        'Discard the first reading · average 5–7 consistent readings (<20% variation)',
        'Cuff width 30–40% of limb or tail circumference',
        'Without target-organ damage, repeat on ≥2 separate occasions before treating',
      ],
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'LOOK FOR TARGET-ORGAN DAMAGE (TOD)',
      subItems: [
        'Eye (commonest) — retinal haemorrhage, oedema, detachment, hyphaema',
        'Brain — seizures, altered mentation, vestibular signs, blindness',
        'Kidney — proteinuria, progressive azotaemia',
        'Heart — LV hypertrophy, gallop, murmur',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Renal',
          tone: 'info',
          tiles: [
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Acute kidney injury', link: { to: 'disease', id: 'DIS-SEC-AKI' } },
            { label: `Protein-losing nephro${SHY}pathy`, link: { to: 'disease', id: 'DIS-REN-GN' } },
          ],
        },
        {
          cat: 'Endocrine',
          tiles: [
            { label: `Hyper${SHY}thyroidism`, link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: `Hyperadreno${SHY}corticism`, link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: `Primary hyper${SHY}aldosteronism`, link: { to: 'disease', id: 'DIS-ENDO-CONN' } },
            { label: `Phaeochromo${SHY}cytoma`, link: { to: 'disease', id: 'DIS-ENDO-PHEO' } },
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: 'Acromegaly', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
          ],
        },
        {
          cat: 'Miscellaneous',
          tone: 'slate',
          tiles: [
            { label: 'Situational hypertension', terminal: true },
            { label: 'Polycythaemia', link: { to: 'disease', id: 'DIS-BD-PV' } },
            { label: 'Iatrogenic fluid overload', terminal: true },
            { label: 'Idiopathic hypertension', terminal: true },
          ],
        },
      ],
    },
    {
      kind: 'diseaseGrid',
      title: 'LINKED DISEASE PAGES',
      links: [
        { label: 'Systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
      ],
    },
    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Acute blindness + hypertension</strong> = hypertensive retinopathy — treat the same day',
        '<strong>Hypertensive encephalopathy</strong> — neurological signs can appear at ~170 mmHg when the rise is rapid (Ettinger Ch 14)',
        '<strong>Primary hyperaldosteronism (cat)</strong> — &gt;90% have SAP &gt;180 mmHg, often with hypokalaemia (Ettinger Ch 236)',
      ],
    },
  ],
}
