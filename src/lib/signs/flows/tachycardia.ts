// ── Tachycardia / pulse abnormalities flowchart ─────────────────────────────
// Species range → pulse quality + deficits → sinus vs not (ECG) → cause chips.
// Ettinger 9th edn Ch 25, 39, 96, 121 (ettinger9-notes.md).

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

export const tachycardiaFlow: FlowPage = {
  id: 'tachycardia',
  title: 'Tachycardia / Abnormal Pulse',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      text: '💓 TACHYCARDIA / ABNORMAL PULSE',
      sub: 'Above the species range — dog 70–160 bpm (giant 60–140 · toy 80–180 · puppy up to 220) · cat 140–240 bpm in hospital',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'PALPATE THE PULSE WHILE YOU AUSCULTATE',
      subItems: [
        'Pulse deficits (heart rate > pulse rate) = premature beats → ECG',
        'Weak pulse = low preload (haemorrhage, dehydration, tamponade) or low contractility (DCM, sepsis)',
        'Bounding pulse = anaemia, hyperthyroidism, early sepsis, PDA, aortic insufficiency',
        'Pulsus paradoxus (weaker on inspiration) = cardiac tamponade',
      ],
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'ECG — SINUS TACHYCARDIA OR A TACHYARRHYTHMIA?',
      subItems: [
        'Sinus tachycardia = a response — find what drives it',
        'Irregular, no P waves = atrial fibrillation',
        'Wide, bizarre QRS = ventricular tachycardia',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Compensatory',
          tone: 'danger',
          tiles: [
            { label: 'Hypovolaemic shock', link: { to: 'disease', id: 'DIS-SHOCK-HYPOVOL' } },
            { label: 'Pale mucous membranes', link: { to: 'flow', id: 'pale-mm' } },
            { label: 'Fever', link: { to: 'flow', id: 'fever' } },
            { label: 'Dyspnoea', link: { to: 'flow', id: 'dyspnoea' } },
            { label: 'Pericardial effusion', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
          ],
        },
        {
          cat: 'Endocrine',
          tiles: [
            { label: `Hyper${SHY}thyroidism`, link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: `Phaeochromo${SHY}cytoma`, link: { to: 'disease', id: 'DIS-ENDO-PHEO' } },
          ],
        },
        {
          cat: 'Cardiac',
          tone: 'violet',
          tiles: [
            { label: 'Cardiac arrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: `Dilated cardio${SHY}myopathy`, link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: `Myxo${SHY}matous mitral valve disease`, link: { to: 'disease', id: 'DIS-CARD-MVD' } },
          ],
        },
        {
          cat: 'Toxic',
          tiles: [
            { label: `Methyl${SHY}xanthine toxicosis`, link: { to: 'disease', id: 'DIS-TOXIC-METHYL' } },
            { label: 'Amphetamine / stimulant toxicosis', link: { to: 'disease', id: 'DIS-TOX-AMPHET' } },
          ],
        },
        {
          cat: 'Physiological',
          tone: 'green',
          tiles: [
            { label: 'Pain', terminal: true },
            { label: 'Fear / excitement', terminal: true },
          ],
        },
      ],
    },
    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Occult haemorrhage</strong> — tachycardia is often the first sign; AFAST before calling it pain',
        '<strong>Ventricular tachycardia</strong> after GDV, trauma or splenic disease — monitor ECG for 48–72 h',
        '<strong>Very fast rates shorten filling time</strong> — the pulse weakens even when contractility is normal (Ettinger Ch 39)',
      ],
    },
  ],
}
