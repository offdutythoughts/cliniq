// ── Systemic hypertension — diagnostic approach ─────────────────────────────
// ACVIM 2018 consensus as reproduced in Ettinger 9th edn Ch 91 and Ch 236
// (Table 236.1 doses). Verify every dose against a current formulary.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const hypertensionDx: DxApproach = {
  sign: 'hypertension',
  title: 'Hypertension',
  tabs: {

  history: {
    title: 'History: Hypertension',
    blocks: [
      { kind: 'goal', text: 'GOAL: REAL OR SITUATIONAL? — THEN FIND THE CAUSE' },
      ...stepTable(1, 'WHO SHOULD BE MEASURED', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Patient', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Every dog and cat ≥9 years</strong>', { text: 'Annual screening (Ettinger Ch 236)', tone: 'teal' }],
          ['<strong>CKD · hyperthyroidism · HAC · DM · phaeochromocytoma</strong>', { text: 'Conditions that cause secondary hypertension', tone: 'teal' }],
          ['<strong>Sudden blindness · seizures · retinal or nasal bleeding</strong>', { text: 'Possible target-organ damage', tone: 'danger' }],
        ],
      }, '📋'),
      ...stepTable(2, 'HISTORY CLUES TO THE CAUSE', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>PU/PD · weight loss</strong>', { text: bullets(['CKD', 'Hyperthyroidism (cat)', 'Diabetes mellitus', 'HAC']), tone: 'teal' }],
          ['<strong>Polyphagia · panting · pot belly</strong>', { text: 'Hyperadrenocorticism', tone: 'teal' }],
          ['<strong>Episodic weakness, panting, collapse</strong>', { text: 'Phaeochromocytoma', tone: 'teal' }],
          ['<strong>Cat with weakness or cervical ventroflexion</strong>', { text: 'Primary hyperaldosteronism (hypokalaemia)', tone: 'teal' }],
          ['<strong>Fluid therapy · steroids</strong>', { text: 'Iatrogenic', tone: 'teal' }],
        ],
      }, '🩺'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Hypertension',
    blocks: [
      ...stepTable(1, 'MEASURE IT PROPERLY (ACVIM 2018)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Step', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Environment</strong>`, { text: 'Quiet room, away from other animals, owner present · acclimatise 5–10 min', tone: 'teal' }],
          [`${numBadge(2)}<strong>Cuff</strong>`, { text: 'Width 30–40% of limb or tail circumference', tone: 'teal' }],
          [`${numBadge(3)}<strong>Readings</strong>`, { text: 'Discard the first · average 5–7 consistent readings (&lt;20% variation)', tone: 'teal' }],
          [`${numBadge(4)}<strong>Method</strong>`, { text: 'Doppler gives SAP only · classification is by SAP', tone: 'teal' }],
        ],
      }, '📏'),
      ...stepTable(2, 'TARGET-ORGAN DAMAGE', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Organ', { text: 'Look for', tone: 'teal' }],
        rows: [
          ['<strong>Eye</strong> (commonest)', { text: bullets(['Retinal haemorrhage, oedema, detachment', 'Arteriolar tortuosity', 'Hyphaema']), tone: 'danger' }],
          ['<strong>Brain</strong>', { text: bullets(['Seizures, altered mentation', 'Vestibular / cerebellar ataxia', 'Cervical myelopathy (cat)']), tone: 'teal' }],
          ['<strong>Heart</strong>', { text: 'Gallop, murmur, LV hypertrophy (74–85% of hypertensive cats)', tone: 'teal' }],
          ['<strong>Kidney</strong>', { text: 'Proteinuria, progressive azotaemia', tone: 'teal' }],
        ],
      }, '👁️'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Hypertension — Diagnostics',
    blocks: [
      ...stepTable(1, 'CLASSIFY (ACVIM 2018)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['SAP (mmHg)', { text: 'Category · TOD risk', tone: 'teal' }],
        rows: [
          ['<strong>&lt;140</strong>', { text: 'Normotensive · minimal', tone: 'green' }],
          ['<strong>140–159</strong>', { text: 'Prehypertensive · low', tone: 'teal' }],
          ['<strong>160–179</strong>', { text: 'Hypertensive · moderate', tone: 'warning' }],
          ['<strong>≥180</strong>', { text: 'Severely hypertensive · high', tone: 'danger' }],
        ],
      }, '📊'),
      ...stepTable(2, 'LOOK FOR THE SECONDARY CAUSE', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Creatinine · SDMA · USG · UPC</strong>', { text: 'Renal disease is the commonest cause — CKD in 20–65% of hypertensive cats', tone: 'teal' }],
          ['<strong>Total T4 (cat)</strong>', { text: 'Hyperthyroidism', tone: 'teal' }],
          ['<strong>Potassium · aldosterone (cat)</strong>', { text: 'Primary hyperaldosteronism', tone: 'teal' }],
          ['<strong>Glucose · fructosamine</strong>', { text: 'Diabetes mellitus', tone: 'teal' }],
          ['<strong>HAC testing · adrenal ultrasound</strong>', { text: bullets(['Hyperadrenocorticism (59–86% of HAC dogs are hypertensive)', 'Phaeochromocytoma (urine normetanephrine)']), tone: 'teal' }],
          ['<strong>Fundic exam</strong>', { text: 'Document TOD — it changes urgency', tone: 'teal' }],
        ],
      }, '🧪'),
      ...stepTable(3, 'TREATMENT POINTERS (Ettinger Table 236.1)', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Drug', { text: 'Dose · note', tone: 'teal' }],
        rows: [
          ['<strong>When to treat</strong>', { text: 'SAP &gt;160 mmHg on repeated measurement with situational hypertension unlikely, or any TOD · target &lt;140 (minimum ≤160)', tone: 'teal' }],
          ['<strong>Amlodipine</strong>', { text: bullets(['Cat 0.625–1.25 mg/cat PO q24h — first-line', 'Dog 0.2–0.4 mg/kg PO q24h — combine with an ACEi/ARB, not alone']), tone: 'teal' }],
          ['<strong>Telmisartan</strong>', { text: bullets(['Cat 1.5 mg/kg PO q12h × 14 days, then 2 mg/kg q24h (or 2 mg/kg q24h from the start)', 'Dog 1–2 mg/kg PO q24h · monitor renal function']), tone: 'teal' }],
          ['<strong>Benazepril / enalapril</strong>', { text: '0.5–2 mg/kg PO q24h · small direct BP effect — add amlodipine for moderate–severe', tone: 'teal' }],
          ['<strong>Hypertensive emergency</strong>', { text: bullets(['Lower SAP by 10% in the first hour, 15% over the next few hours', 'Nitroprusside 1–2 mcg/kg/min IV CRI (max 10)', 'Labetalol or esmolol CRI']), tone: 'danger' }],
          ['<strong>Phaeochromocytoma</strong>', { text: 'Phenoxybenzamine — α-blockade before any β-blocker', tone: 'danger' }],
        ],
      }, '💊'),
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
        { label: 'Systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
        { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
        { label: 'Hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
        { label: 'Primary hyperaldosteronism', link: { to: 'disease', id: 'DIS-ENDO-CONN' } },
        { label: 'Phaeochromocytoma', link: { to: 'disease', id: 'DIS-ENDO-PHEO' } },
      ] },
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • One high reading in a stressed patient is not a diagnosis — repeat on another day unless there is TOD.<br>
  • Acute blindness with hypertension is treated the same day.<br>
  • Diabetic dogs are often hypertensive but usually stay below 160 mmHg (Ettinger Ch 236).`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
