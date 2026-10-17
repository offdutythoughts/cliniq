// ── Bradycardia — diagnostic approach ───────────────────────────────────────
// Ettinger 9th edn Ch 39, 40, 68, 96, 129, 130, 300 (ettinger9-notes.md).
// Doses are the textbook's — verify against a current formulary.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const bradycardiaDx: DxApproach = {
  sign: 'bradycardia',
  title: 'Bradycardia',
  tabs: {

  history: {
    title: 'History: Bradycardia',
    blocks: [
      { kind: 'goal', text: 'GOAL: PHYSIOLOGICAL, METABOLIC, DRUG, OR CONDUCTION DISEASE?' },
      ...stepTable(1, 'HISTORY CLUES', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Male cat straining, no urine</strong>', { text: 'Urethral obstruction → hyperkalaemia', tone: 'danger' }],
          ['<strong>Waxing–waning GI signs, weakness</strong>', { text: 'Hypoadrenocorticism → hyperkalaemia', tone: 'teal' }],
          ['<strong>Sedation · opioids · β-blockers · digoxin</strong>', { text: 'Drug-induced', tone: 'teal' }],
          ['<strong>Collapse or syncope with exercise or excitement</strong>', { text: bullets(['High-grade AV block', 'Sick sinus syndrome', 'Vasovagal (young Boxers)']), tone: 'teal' }],
          ['<strong>Head trauma · neurological signs</strong>', { text: 'Raised ICP (Cushing reflex)', tone: 'danger' }],
          ['<strong>Weight gain · lethargy · cold-seeking</strong>', { text: 'Hypothyroidism', tone: 'teal' }],
        ],
      }, '📋'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Bradycardia',
    blocks: [
      ...stepTable(1, 'SPECIES RANGES (Ettinger Table 96.2)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Patient', { text: 'Normal heart rate', tone: 'teal' }],
        rows: [
          ['<strong>Adult dog</strong>', { text: '70–160 bpm · giant 60–140 · toy 80–180', tone: 'teal' }],
          ['<strong>Puppy</strong>', { text: 'Up to 220 bpm', tone: 'teal' }],
          ['<strong>Cat</strong>', { text: '140–240 bpm in hospital · 100–120 at home', tone: 'teal' }],
        ],
      }, '📏'),
      ...stepTable(2, 'IS IT HAEMODYNAMICALLY SIGNIFICANT?', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Bright, normal pulses, rate rises with excitement</strong>', { text: 'Likely physiological / high vagal tone', tone: 'green' }],
          ['<strong>Weak pulses, pale membranes, weakness</strong>', { text: 'Compromised — act now', tone: 'danger' }],
          ['<strong>Cold, bradycardic, hypotensive cat</strong>', { text: 'Decompensated shock or hyperkalaemia', tone: 'danger' }],
          ['<strong>Bradycardia + hypertension + neuro signs</strong>', { text: 'Cushing reflex — raised ICP', tone: 'danger' }],
          ['<strong>Large, painful bladder</strong>', { text: 'Urethral obstruction', tone: 'danger' }],
        ],
      }, '🩺'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Bradycardia — Diagnostics',
    blocks: [
      ...stepTable(1, 'ECG + POTASSIUM FIRST', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['ECG finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Sinus bradycardia ± sinus arrhythmia</strong>', { text: 'Vagal, drug, hypothermia, hypothyroidism, or physiological', tone: 'teal' }],
          ['<strong>Tall T · small / absent P · wide QRS</strong>', { text: 'Hyperkalaemia — check K⁺ now', tone: 'danger' }],
          ['<strong>Long pauses without P waves</strong>', { text: 'Sinus arrest / sick sinus syndrome', tone: 'teal' }],
          ['<strong>P waves not followed by QRS</strong>', { text: 'Second- or third-degree AV block', tone: 'teal' }],
          ['<strong>No P waves, normal K⁺</strong>', { text: 'Persistent atrial standstill', tone: 'teal' }],
        ],
      }, '📈'),
      ...stepTable(2, 'NEXT TESTS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Electrolytes · creatinine</strong>', { text: 'Hyperkalaemia source: obstruction, AKI, hypoadrenocorticism', tone: 'teal' }],
          ['<strong>Atropine response test</strong>', { text: 'Rate rises = vagal · no rise = intrinsic conduction disease (or hypothermia)', tone: 'teal' }],
          ['<strong>Rectal temperature</strong>', { text: 'Hypothermic bradycardia is atropine-unresponsive', tone: 'teal' }],
          ['<strong>Total T4 ± TSH</strong>', { text: 'Hypothyroidism (dog)', tone: 'teal' }],
          ['<strong>Holter</strong>', { text: 'Intermittent block or arrest in a syncopal dog', tone: 'teal' }],
        ],
      }, '🧪'),
      ...stepTable(3, 'TREATMENT POINTERS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Cause', { text: 'Do', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Hyperkalaemia</strong>`, { text: bullets(['10% calcium gluconate 0.5–1 mL/kg IV to effect, with ECG — protects the heart for ~20–30 min, does not lower K⁺', 'Regular insulin 0.5 U/kg IV + 1–2 g dextrose per unit', 'Then remove the cause — relieve obstruction, fluids (Ettinger Ch 300)']), tone: 'danger' }],
          [`${numBadge(2)}<strong>Severe symptomatic vagal / drug bradycardia</strong>`, { text: 'Atropine 0.02–0.04 mg/kg IV (Ettinger Ch 129) · reverse the sedative', tone: 'teal' }],
          [`${numBadge(3)}<strong>Hypothermia</strong>`, { text: 'Rewarm — atropine will not work', tone: 'teal' }],
          [`${numBadge(4)}<strong>Symptomatic high-grade AV block / sick sinus</strong>`, { text: 'Pacemaker — refer', tone: 'teal' }],
        ],
      }, '💉'),
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
        { label: 'Cardiac arrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
        { label: 'Urethral obstruction', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
        { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
        { label: 'Head trauma', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
      ] },
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Respiratory sinus arrhythmia is normal in dogs and fades with heart disease or high rates (Ettinger Ch 39).<br>
  • Any bradycardic cat gets a potassium and a bladder palpation.<br>
  • An arrhythmia has to last 10–30 seconds to cause syncope (Ettinger Ch 40).`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
