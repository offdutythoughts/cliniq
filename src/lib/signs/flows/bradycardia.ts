// ── Bradycardia flowchart ───────────────────────────────────────────────────
// Species range → is the patient compromised? → ECG → cause chips.
// Ettinger 9th edn Ch 39, 40, 68, 96, 121, 130 (ettinger9-notes.md).

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

export const bradycardiaFlow: FlowPage = {
  id: 'bradycardia',
  title: 'Bradycardia',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      text: '🐢 BRADYCARDIA',
      sub: 'Below the species range — dog 70–160 bpm (giant 60–140 · toy 80–180) · cat 140–240 bpm in hospital (100–120 at home)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THE PATIENT COMPROMISED? — THEN RUN AN ECG',
      subItems: [
        'Weak pulses, pale membranes, collapse or syncope = haemodynamically significant',
        'A bradycardic sick cat is in decompensated shock or hyperkalaemic until proven otherwise',
        'Bright, athletic dog with respiratory sinus arrhythmia = usually physiological',
        'ECG: sinus rhythm vs sinus arrest vs AV block vs atrial standstill (absent P waves)',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Metabolic',
          tiles: [
            { label: `Urethral obstruc${SHY}tion`, link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
            { label: `Hypoadreno${SHY}corticism`, link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Acute kidney injury', link: { to: 'disease', id: 'DIS-SEC-AKI' } },
            { label: 'Hypothermia', link: { to: 'flow', id: 'hypothermia' } },
            { label: `Hypo${SHY}thyroidism`, link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
          ],
        },
        {
          cat: 'Vagal',
          tone: 'teal',
          tiles: [
            { label: `Brachy${SHY}cephalic airway syndrome`, link: { to: 'disease', id: 'DIS-RESP-BOAS' } },
            { label: 'Head trauma', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
            { label: `Intra${SHY}cranial neoplasia`, link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
            { label: 'Situational / reflex syncope', link: { to: 'flow', id: 'syncope' } },
          ],
        },
        {
          cat: 'Cardiac conduction',
          tone: 'violet',
          tiles: [
            { label: 'Cardiac arrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
          ],
        },
        {
          cat: 'Drug-induced',
          tiles: [
            { label: 'α2-agonists', terminal: true },
            { label: 'Opioids', terminal: true },
            { label: 'β-blockers / calcium-channel blockers', terminal: true },
            { label: 'Digoxin', terminal: true },
          ],
        },
        {
          cat: 'Physiological',
          tone: 'green',
          tiles: [
            { label: 'Athletic / high vagal tone', terminal: true },
          ],
        },
      ],
    },
    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Hyperkalaemia</strong> — tall T waves, small or absent P waves, wide QRS. Blocked cat, Addisonian dog, uroabdomen',
        '<strong>Raised intracranial pressure</strong> — bradycardia + hypertension (Cushing reflex) after head trauma',
        '<strong>Hypothermic bradycardia does not respond to atropine</strong> — rewarm (Ettinger Ch 130)',
      ],
    },
  ],
}
