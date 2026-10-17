// ── Hypotension flowchart ───────────────────────────────────────────────────
// Confirm the reading → classify the shock type → cause chips. Thresholds and
// shock classification: Ettinger 9th edn Ch 17, 119, 121 (ettinger9-notes.md).

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

export const hypotensionFlow: FlowPage = {
  id: 'hypotension',
  title: 'Hypotension',
  blocks: [
    {
      kind: 'node',
      variant: 'entry',
      text: '🔻 HYPOTENSION',
      sub: 'Systolic arterial pressure (SAP) <90 mmHg · severe: Doppler SAP <80 mmHg (dog) / <60 mmHg (cat)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRM IT IS REAL — THEN READ THE PERFUSION PICTURE',
      subItems: [
        'Repeat with the correct cuff (30–40% of limb circumference) — a cuff too wide reads falsely low',
        'Pale membranes, slow CRT, weak pulses, cool limbs = vasoconstrictive (hypovolaemic / cardiogenic)',
        'Brick-red membranes, fast CRT, bounding pulses = vasodilatory (sepsis, anaphylaxis)',
        'Dogs in shock are tachycardic · cats can be tachycardic OR bradycardic and hypothermic',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Hypovolaemic',
          tone: 'danger',
          tiles: [
            { label: 'Hypovolaemic shock', link: { to: 'disease', id: 'DIS-SHOCK-HYPOVOL' } },
            { label: 'Traumatic shock', link: { to: 'disease', id: 'DIS-SHOCK-TRAUMA' } },
            { label: `Haemangio${SHY}sarcoma`, link: { to: 'disease', id: 'DIS-NEO-HSA' } },
            { label: 'AHDS / HGE', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
          ],
        },
        {
          cat: 'Distributive',
          tone: 'orange',
          tiles: [
            { label: 'Septic shock', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
            { label: `Septic peri${SHY}tonitis`, link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
            { label: `Hypoadreno${SHY}corticism`, link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Anaphylaxis', terminal: true },
          ],
        },
        {
          cat: 'Cardiogenic',
          tone: 'violet',
          tiles: [
            { label: `Dilated cardio${SHY}myopathy`, link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: `Hypertrophic cardio${SHY}myopathy`, link: { to: 'disease', id: 'DIS-HCM' } },
            { label: `Myxo${SHY}matous mitral valve disease`, link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: 'Cardiac arrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
          ],
        },
        {
          cat: 'Obstructive',
          tone: 'info',
          tiles: [
            { label: 'Pericardial effusion', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: 'GDV', link: { to: 'disease', id: 'DIS-GI-GDV' } },
            { label: `Pulmonary thrombo${SHY}embolism`, link: { to: 'disease', id: 'DIS-RESP-PTE' } },
          ],
        },
        {
          cat: 'Drug-induced',
          tiles: [
            { label: 'Anaesthetics / sedatives', terminal: true },
            { label: 'Vasodilators', terminal: true },
          ],
        },
      ],
    },
    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Cavity haemorrhage</strong> — AFAST/TFAST every hypotensive patient; a normal PCV does not exclude acute bleeding',
        '<strong>Hypoadrenocorticism</strong> — hyponatraemia, hyperkalaemia, a "normal" lymphocyte count in a sick dog → ACTH stimulation test',
        '<strong>Tamponade</strong> — muffled heart sounds, jugular distension, pulsus paradoxus → pericardiocentesis, not fluids',
        '<strong>Lactate &gt;4 mmol/L</strong> carries a high mortality risk — reassess after every bolus (Ettinger Ch 119)',
      ],
    },
  ],
}
