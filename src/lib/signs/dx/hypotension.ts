// ── Hypotension — diagnostic approach ───────────────────────────────────────
// Ettinger 9th edn Ch 17, 119, 120, 121 (ettinger9-notes.md). Doses are the
// textbook's — verify against a current formulary before use.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const hypotensionDx: DxApproach = {
  sign: 'hypotension',
  title: 'Hypotension',
  tabs: {

  history: {
    title: 'History: Hypotension',
    blocks: [
      { kind: 'goal', text: 'GOAL: WHICH KIND OF SHOCK — AND IS IT STILL GOING ON?' },
      ...stepTable(1, 'LOSS OF VOLUME', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Ask about', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Trauma · collapse · sudden pallor</strong>', { text: bullets(['Haemorrhage — external or cavity', 'Splenic mass rupture in an older large-breed dog']), tone: 'teal' }],
          ['<strong>Vomiting · diarrhoea · polyuria</strong>', { text: 'Hypovolaemia from fluid loss', tone: 'teal' }],
          ['<strong>Waxing–waning GI signs · weakness</strong>', { text: 'Hypoadrenocorticism', tone: 'teal' }],
        ],
      }, '📋'),
      ...stepTable(2, 'VASODILATION · PUMP · OBSTRUCTION', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Ask about', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Sting, vaccine, drug minutes before</strong>', { text: 'Anaphylaxis', tone: 'teal' }],
          ['<strong>Fever · known infection · pyometra · recent GI surgery</strong>', { text: 'Sepsis / septic peritonitis', tone: 'teal' }],
          ['<strong>Cough · exercise intolerance · known murmur</strong>', { text: 'Cardiogenic', tone: 'teal' }],
          ['<strong>Unproductive retching · distension</strong>', { text: 'GDV', tone: 'teal' }],
          ['<strong>Sedation · anaesthesia · vasodilators</strong>', { text: 'Drug-induced', tone: 'teal' }],
        ],
      }, '🩺'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Hypotension',
    blocks: [
      { kind: 'step', tone: 'teal', text: '🩺 Read the perfusion parameters together, not one at a time' },
      {
        kind: 'gridTable',
        label: 'Shock phenotype (Ettinger Table 121.2)',
        cols: '0.7fr 1fr 1fr 1fr',
        dividers: true,
        headers: ['Sign', 'Compensated', 'Decompensated', { text: 'Vasodilatory', tone: 'teal' }],
        rows: [
          ['<strong>Mentation</strong>', 'Dull', 'Obtunded', { text: 'Variable', tone: 'teal' }],
          ['<strong>Membranes</strong>', 'Pale', 'Pale–white', { text: 'Hyperaemic, brick red', tone: 'teal' }],
          ['<strong>CRT</strong>', 'Normal–prolonged', 'Prolonged', { text: 'Rapid', tone: 'teal' }],
          ['<strong>Pulse</strong>', 'Adequate–weak', 'Weak–absent', { text: 'Bounding', tone: 'teal' }],
          ['<strong>Temperature</strong>', 'Hypothermic', 'Profoundly hypothermic', { text: 'Warm / febrile', tone: 'teal' }],
          ['<strong>Heart rate</strong>', bullets(['Dog: tachycardia', 'Cat: tachy- or bradycardia']), bullets(['Dog: tachycardia', 'Cat: tachy- or bradycardia']), { text: 'Tachycardia', tone: 'teal' }],
        ],
      },
      ...stepTable(1, 'LOOK FOR THE SOURCE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Muffled heart sounds · jugular distension · pulsus paradoxus</strong>', { text: 'Cardiac tamponade', tone: 'danger' }],
          ['<strong>Fluid wave · distended abdomen</strong>', { text: 'Haemoabdomen, septic peritonitis, GDV', tone: 'teal' }],
          ['<strong>Murmur · gallop · arrhythmia · crackles</strong>', { text: 'Cardiogenic shock', tone: 'teal' }],
          ['<strong>Urticaria · facial swelling · acute GI signs</strong>', { text: 'Anaphylaxis', tone: 'teal' }],
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Hypotension — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RESUSCITATE WHILE YOU INVESTIGATE', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail (Ettinger Ch 120–121)', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Oxygen</strong>`, { text: 'All shock patients initially · target SpO₂ &gt;94%', tone: 'teal' }],
          [`${numBadge(2)}<strong>Isotonic crystalloid bolus</strong>`, { text: bullets(['20–25% of one blood volume over 10–20 min: dog ~20–25 mL/kg · cat ~10–15 mL/kg', 'Reassess after every bolus', 'Sepsis: smaller boluses — dog 15–20 · cat 10–15 mL/kg']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Hypertonic saline 7–7.5%</strong>`, { text: '4–6 mL/kg IV over 10–20 min — hypovolaemia with head trauma · not for dehydrated or hypernatraemic patients', tone: 'teal' }],
          [`${numBadge(4)}<strong>Blood products</strong>`, { text: 'Whole blood, pRBC, FFP for significant haemorrhage', tone: 'teal' }],
          [`${numBadge(5)}<strong>Vasopressor / inotrope</strong>`, { text: bullets(['Only once the volume deficit is corrected', 'Norepinephrine 0.05–2 mcg/kg/min — vasodilatory shock', 'Dobutamine 5–20 mcg/kg/min — low contractility', 'Target MAP ≥65 mmHg in septic shock']), tone: 'danger' }],
        ],
      },
      ...stepTable(2, 'MINIMUM DATABASE', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>PCV / TS</strong>', { text: 'Low TS with normal PCV = early haemorrhage (splenic contraction holds the PCV)', tone: 'teal' }],
          ['<strong>Lactate</strong>', { text: '&gt;2 mmol/L = hypoperfusion · &gt;4 mmol/L = high mortality risk · trend it', tone: 'teal' }],
          ['<strong>Glucose · electrolytes</strong>', { text: bullets(['Hypoglycaemia (sepsis)', 'Hyponatraemia + hyperkalaemia (hypoadrenocorticism)']), tone: 'teal' }],
          ['<strong>AFAST / TFAST</strong>', { text: 'Free fluid, pericardial effusion, gastric gas cap (GDV)', tone: 'teal' }],
          ['<strong>ECG</strong>', { text: 'Brady- or tachyarrhythmia as the cause', tone: 'teal' }],
          ['<strong>Abdominocentesis</strong>', { text: 'Fluid PCV vs blood · fluid glucose / lactate for septic peritonitis', tone: 'teal' }],
        ],
      }, '🧪'),
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
        { label: 'Hypovolaemic shock', link: { to: 'disease', id: 'DIS-SHOCK-HYPOVOL' } },
        { label: 'Septic shock', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
        { label: 'Traumatic shock', link: { to: 'disease', id: 'DIS-SHOCK-TRAUMA' } },
        { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
        { label: 'Pericardial effusion', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
        { label: 'GDV', link: { to: 'disease', id: 'DIS-GI-GDV' } },
      ] },
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Confirm with the right cuff before acting on a single low reading.<br>
  • Avoid the full "shock dose" (dog 90, cat 50 mL/kg) in sepsis — over-hydration worsens outcome (Ettinger Ch 120).<br>
  • Tamponade needs pericardiocentesis, not more fluid.<br>
  • A cat that is cold, bradycardic and hypotensive is in decompensated shock — warm and resuscitate together.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
