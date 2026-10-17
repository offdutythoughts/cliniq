// ── Tachycardia / abnormal pulse — diagnostic approach ──────────────────────
// Ettinger 9th edn Ch 25, 39, 96, 121 (ettinger9-notes.md).

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const tachycardiaDx: DxApproach = {
  sign: 'tachycardia',
  title: 'Tachycardia / Abnormal Pulse',
  tabs: {

  history: {
    title: 'History: Tachycardia',
    blocks: [
      { kind: 'goal', text: 'GOAL: A RESPONSE TO SOMETHING — OR THE HEART ITSELF?' },
      ...stepTable(1, 'HISTORY CLUES', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Trauma · collapse · sudden weakness</strong>', { text: 'Haemorrhage / hypovolaemia', tone: 'danger' }],
          ['<strong>Weight loss despite a good appetite (older cat)</strong>', { text: 'Hyperthyroidism', tone: 'teal' }],
          ['<strong>Chocolate, caffeine, ADHD medication access</strong>', { text: 'Methylxanthine or amphetamine toxicosis', tone: 'teal' }],
          ['<strong>Episodic panting, weakness, collapse</strong>', { text: 'Phaeochromocytoma or paroxysmal arrhythmia', tone: 'teal' }],
          ['<strong>Cough · exercise intolerance · known murmur</strong>', { text: 'Heart failure', tone: 'teal' }],
          ['<strong>Recent GDV, splenectomy or trauma</strong>', { text: 'Ventricular arrhythmia', tone: 'teal' }],
        ],
      }, '📋'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Tachycardia',
    blocks: [
      ...stepTable(1, 'PULSE QUALITY (Ettinger Ch 39)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Pulse', { text: 'Causes', tone: 'teal' }],
        rows: [
          ['<strong>Weak — low preload</strong>', { text: bullets(['Haemorrhage', 'Volume depletion', 'Pericardial effusion', 'Very fast rates']), tone: 'teal' }],
          ['<strong>Weak — low contractility</strong>', { text: bullets(['DCM', 'Sepsis', 'Anaesthetics']), tone: 'teal' }],
          ['<strong>Bounding</strong>', { text: bullets(['Anaemia', 'Hyperthyroidism', 'Fever / early vasodilatory shock', 'PDA', 'Aortic insufficiency']), tone: 'teal' }],
          ['<strong>Pulse deficits</strong>', { text: 'Premature beats (ventricular more than atrial)', tone: 'danger' }],
          ['<strong>Pulsus paradoxus</strong>', { text: 'Cardiac tamponade', tone: 'danger' }],
          ['<strong>Pulsus alternans</strong>', { text: 'Myocardial failure (DCM)', tone: 'teal' }],
          ['<strong>Weak and late (parvus et tardus)</strong>', { text: 'Severe subaortic stenosis', tone: 'teal' }],
          ['<strong>Hard to feel</strong>', { text: 'Obesity, thick coat — not necessarily disease', tone: 'teal' }],
        ],
      }, '🫀'),
      ...stepTable(2, 'FIND WHAT DRIVES IT', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pale membranes, slow CRT</strong>', { text: 'Haemorrhage, hypovolaemia, cardiogenic shock', tone: 'danger' }],
          ['<strong>Fever</strong>', { text: 'Infection / inflammation', tone: 'teal' }],
          ['<strong>Palpable thyroid nodule (cat)</strong>', { text: 'Hyperthyroidism', tone: 'teal' }],
          ['<strong>Murmur, gallop, crackles</strong>', { text: 'Heart failure', tone: 'teal' }],
          ['<strong>Pain on handling</strong>', { text: 'Analgesia, then reassess the rate', tone: 'teal' }],
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Tachycardia — Diagnostics',
    blocks: [
      ...stepTable(1, 'ECG', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['ECG finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Sinus tachycardia</strong>', { text: 'A response — treat the driver, not the rate', tone: 'teal' }],
          ['<strong>Irregularly irregular, no P waves</strong>', { text: 'Atrial fibrillation — usually with structural heart disease', tone: 'teal' }],
          ['<strong>Narrow-complex, regular, very fast</strong>', { text: 'Supraventricular tachycardia', tone: 'teal' }],
          ['<strong>Wide, bizarre QRS</strong>', { text: 'Ventricular premature complexes / tachycardia', tone: 'danger' }],
        ],
      }, '📈'),
      ...stepTable(2, 'NEXT TESTS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>PCV / TS · lactate · BP</strong>', { text: 'Hypovolaemia, anaemia, shock', tone: 'teal' }],
          ['<strong>AFAST / TFAST</strong>', { text: 'Cavity bleeding, pericardial effusion', tone: 'teal' }],
          ['<strong>Total T4 (cat)</strong>', { text: 'Hyperthyroidism', tone: 'teal' }],
          ['<strong>Echocardiography · thoracic radiographs</strong>', { text: 'Structural heart disease, heart failure', tone: 'teal' }],
          ['<strong>Electrolytes · Holter</strong>', { text: 'Intermittent arrhythmia, K⁺ / Mg²⁺ disturbances', tone: 'teal' }],
        ],
      }, '🧪'),
      ...stepTable(3, 'TREATMENT POINTERS', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Cause', { text: 'Do', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Hypovolaemia / haemorrhage</strong>`, { text: 'Fluid resuscitation ± blood — see Hypotension', tone: 'teal' }],
          [`${numBadge(2)}<strong>Pain / fear</strong>`, { text: 'Analgesia, low-stress handling', tone: 'teal' }],
          [`${numBadge(3)}<strong>Pathological tachyarrhythmia</strong>`, { text: 'Antiarrhythmic by rhythm — see the Cardiac arrhythmia page for drugs and doses', tone: 'teal' }],
          [`${numBadge(4)}<strong>Toxicosis</strong>`, { text: 'Decontaminate and treat per the toxin page', tone: 'teal' }],
        ],
      }, '💉'),
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
        { label: 'Cardiac arrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
        { label: 'Hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
        { label: 'Pericardial effusion', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
        { label: 'Methylxanthine toxicosis', link: { to: 'disease', id: 'DIS-TOXIC-METHYL' } },
        { label: 'Hypotension work-up', link: { to: 'dx', id: 'hypotension' } },
      ] },
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Always palpate a pulse while you auscultate — a deficit is missed otherwise.<br>
  • Tachycardia is the expected shock response in dogs; do not slow it pharmacologically.<br>
  • Severe tachycardia or bradycardia can itself cause pallor (Ettinger Ch 25).`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
