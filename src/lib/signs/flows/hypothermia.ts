// ── Hypothermia flowchart ───────────────────────────────────────────────────
// Primary (environmental) vs secondary → cause chips. Ettinger 9th edn Ch 119,
// 121, 130 (ettinger9-notes.md).

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

export const hypothermiaFlow: FlowPage = {
  id: 'hypothermia',
  title: 'Hypothermia',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      text: '🥶 HYPOTHERMIA',
      sub: 'Core (rectal) temperature <37.2 °C (99 °F)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'PRIMARY (COLD EXPOSURE) OR SECONDARY TO DISEASE?',
      subItems: [
        'Found outdoors, wet coat, neonate or very small patient = primary',
        'Recent anaesthesia or sedation = the commonest secondary cause',
        'Hypothermia with weak pulses, pale membranes, ± bradycardia (cat) = decompensated shock',
        'Rectal–interdigital temperature gradient >4 °C is a shock marker in dogs',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Environmental',
          tone: 'info',
          tiles: [
            { label: 'Cold exposure', terminal: true },
            { label: 'Neonatal hypothermia', terminal: true },
          ],
        },
        {
          cat: 'Shock / sepsis',
          tone: 'danger',
          tiles: [
            { label: 'Septic shock', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
            { label: 'Hypovolaemic shock', link: { to: 'disease', id: 'DIS-SHOCK-HYPOVOL' } },
            { label: `Feline arterial thrombo${SHY}embolism`, link: { to: 'disease', id: 'DIS-CARD-ATE' } },
          ],
        },
        {
          cat: 'Endocrine',
          tiles: [
            { label: `Hypo${SHY}thyroidism`, link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
            { label: `Hypoadreno${SHY}corticism`, link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
          ],
        },
        {
          cat: 'Neurological',
          tiles: [
            { label: 'Head trauma', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
            { label: `Intra${SHY}cranial neoplasia`, link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
          ],
        },
        {
          cat: 'Drug-induced',
          tiles: [
            { label: 'Anaesthetics / sedatives', terminal: true },
          ],
        },
      ],
    },
    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Hypothermic bradycardia is atropine-unresponsive</strong> — rewarm instead',
        '<strong>Cold diuresis</strong> causes hypovolaemia — rewarming vasodilates and can unmask it',
        '<strong>Coagulopathy</strong> is missed if the sample is warmed to 37 °C in the analyser',
        '<strong>Profound hypothermia</strong> — ventricular fibrillation in up to half of dogs below 23.3 °C (Ettinger Ch 130)',
      ],
    },
  ],
}
