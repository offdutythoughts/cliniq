// ── Hypothermia — diagnostic approach ───────────────────────────────────────
// Ettinger 9th edn Ch 119, 121, 130 (ettinger9-notes.md).

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const hypothermiaDx: DxApproach = {
  sign: 'hypothermia',
  title: 'Hypothermia',
  tabs: {

  history: {
    title: 'History: Hypothermia',
    blocks: [
      { kind: 'goal', text: 'GOAL: COLD EXPOSURE, OR A SICK PATIENT WHO CANNOT HOLD TEMPERATURE?' },
      ...stepTable(1, 'HISTORY CLUES', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Found outdoors, wet, or immersed</strong>', { text: 'Primary (accidental) hypothermia', tone: 'teal' }],
          ['<strong>Recent anaesthesia or sedation</strong>', { text: 'The commonest secondary cause', tone: 'teal' }],
          ['<strong>Neonate · toy breed · very thin</strong>', { text: 'Poor heat conservation', tone: 'teal' }],
          ['<strong>Acute illness, vomiting, collapse</strong>', { text: 'Shock or sepsis', tone: 'danger' }],
          ['<strong>Weight gain, lethargy, coat changes</strong>', { text: 'Hypothyroidism', tone: 'teal' }],
          ['<strong>Cat with acute hindlimb paralysis</strong>', { text: 'Arterial thromboembolism', tone: 'danger' }],
        ],
      }, '📋'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Hypothermia',
    blocks: [
      ...stepTable(1, 'WHAT HYPOTHERMIA DOES (Ettinger Ch 130)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['System', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>Heart</strong>', { text: bullets(['Bradycardia unresponsive to atropine', 'VF or asystole when profound — up to half of dogs below 23.3 °C']), tone: 'danger' }],
          ['<strong>Vessels</strong>', { text: 'Reduced SVR — vasodilation on rewarming', tone: 'teal' }],
          ['<strong>Kidney</strong>', { text: 'Cold diuresis → hypovolaemia', tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: 'Hypocoagulable — missed if the analyser warms the sample', tone: 'teal' }],
        ],
      }, '🩺'),
      ...stepTable(2, 'IS IT SHOCK?', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Weak pulses, pale membranes, slow CRT</strong>', { text: 'Decompensated shock', tone: 'danger' }],
          ['<strong>Rectal–interdigital gradient &gt;4 °C (dog)</strong>', { text: 'Peripheral vasoconstriction — a shock marker', tone: 'danger' }],
          ['<strong>Cold, bradycardic cat</strong>', { text: 'Shock or hyperkalaemia', tone: 'danger' }],
          ['<strong>Cold, pulseless hindlimbs (cat)</strong>', { text: 'Arterial thromboembolism', tone: 'danger' }],
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Hypothermia — Diagnostics',
    blocks: [
      ...stepTable(1, 'MINIMUM DATABASE', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>BP · lactate · PCV / TS</strong>', { text: 'Shock and hypovolaemia', tone: 'teal' }],
          ['<strong>Glucose</strong>', { text: 'Hypoglycaemia (neonates, sepsis)', tone: 'teal' }],
          ['<strong>Electrolytes</strong>', { text: 'Hyperkalaemia (cats), hypoadrenocorticism', tone: 'teal' }],
          ['<strong>ECG</strong>', { text: 'Bradycardia, arrhythmia', tone: 'teal' }],
          ['<strong>Coagulation</strong>', { text: 'Interpret knowing the analyser warms the sample', tone: 'teal' }],
          ['<strong>Total T4 ± TSH</strong>', { text: 'Once stable, if no other cause', tone: 'teal' }],
        ],
      }, '🧪'),
      ...stepTable(2, 'REWARMING (Ettinger Ch 130)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Severity', { text: 'Do', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Mild, hydrated</strong>`, { text: 'Passive surface warming — dry the coat, blankets, towels, bubble wrap', tone: 'teal' }],
          [`${numBadge(2)}<strong>Moderate–severe or dehydrated</strong>`, { text: 'Active surface warming — forced-air blankets, warm water bottles, heating pads (protect the skin)', tone: 'teal' }],
          [`${numBadge(3)}<strong>With shock</strong>`, { text: 'Resuscitate and rewarm together — rewarming vasodilates and can unmask hypovolaemia', tone: 'danger' }],
        ],
      }, '🔥'),
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
        { label: 'Septic shock', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
        { label: 'Hypovolaemic shock', link: { to: 'disease', id: 'DIS-SHOCK-HYPOVOL' } },
        { label: 'Hypothyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
        { label: 'Feline arterial thromboembolism', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
      ] },
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Hypothermia is a sign, not a diagnosis — in a sick patient look for shock first.<br>
  • Do not chase a hypothermic bradycardia with atropine; warm the patient.<br>
  • Monitor temperature through recovery from every anaesthetic.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
