// ── Syncope flowchart ────────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { episodicTriageTable } from './episodicTriage'

const syncopeEntry: FlowPage = {
  id: 'syncope',
  title: 'Syncope',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SYNCOPE — TRANSIENT LOSS OF CONSCIOUSNESS' },

    // The BRANCHING still has one owner — the Collapse / LOC triage page, which
    // is how the reader reaches this page; re-drawing the three-arm fork here
    // made them answer the same question twice and put a card back to the page
    // they had just come from. What this page carries is the gate: the callout
    // that names what would send them back, and the shared comparison table so
    // the reader can confirm syncope without navigating away from the workup.
    {
      kind: 'callout',
      tone: 'warning',
      html: '<strong>Confirmed syncope only.</strong> An aura, rigid or paddling limbs, or confusion / blindness for minutes–hours afterwards means a seizure, not syncope — work it up from the collapse triage instead. Pre-syncope (brief ataxia or stumbling without full LOC) works up the same way as syncope.',
    },
    // Shared with the collapse triage and the seizures entry — see ./episodicTriage.
    episodicTriageTable,

    // The step asks the question and states the MECHANISM; it deliberately does
    // not preview the two cards' findings, which would then be read twice and
    // age separately. (The metabolic mimics — glucose, Na:K ± ACTH — are in the
    // DON'T MISS box below.)
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THE CAUSE CARDIAC?',
      // subItems are PLAIN TEXT (rendered as React children, not HTML) — no tags.
      subItems: [
        'Syncope is transient LOC from cerebral hypoperfusion',
        'BP must fall by about half before consciousness goes',
        'An arrhythmia must last 10–30 s to drop the patient (Ettinger Ch 40)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' CARDIAC',
          sublabel: 'Collapses on exertion · murmur, gallop or arrhythmia · weak pulses · jugular distension',
          link: { to: 'flow', id: 'syncope-cardiac' },
        },
        {
          tone: 'teal',
          label: ' REFLEX / NON-CARDIAC',
          sublabel: 'Clear trigger (cough · excitement · micturition) · normal heart · weak between episodes',
          link: { to: 'flow', id: 'syncope-reflex' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Malignant arrhythmia</strong> — high-grade AV block, sinus arrest or sustained ventricular tachycardia carry a sudden-death risk; a normal resting ECG does NOT exclude an intermittent arrhythmia (Ettinger Ch 40)',
        '<strong>Hypoglycaemia</strong> and <strong>Addisonian collapse</strong> — cheap, treatable metabolic mimics; check glucose, Na⁺/K⁺ ± ACTH stim early',
        '<strong>Pericardial effusion / tamponade</strong> — muffled heart sounds + weak pulses + jugular distension; a syncopal patient may be one tap away from arrest',
        { bold: 'Mistaking a seizure for syncope (or vice-versa)', link: { to: 'flow', id: 'weakness-collapse' }, html: ' — AEDs WORSEN syncope and a missed malignant arrhythmia kills, so get this split right; use the table above, and the collapse triage owns the branch to the other six episodic disorders (Ettinger Ch 40)' },
      ],
    },

  ],
}

const syncopeCardiac: FlowPage = {
  id: 'syncope-cardiac',
  title: 'Syncope — Cardiac',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' CARDIAC', sub: 'Exertional collapse · murmur / gallop / arrhythmia · jugular distension · weak pulses · prior heart disease · sudden-death risk' },
    { kind: 'node', variant: 'step', text: 'ARRHYTHMIA vs STRUCTURAL / OUTFLOW vs PULMONARY HYPERTENSION?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Arrhythmia (Brady or Tachy)',
          tone: 'danger',
          tiles: [
            { label: 'Bradyarrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: 'Tachyarrhythmia', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
          ],
        },
        {
          cat: 'Structural / Outflow',
          tone: 'violet',
          tiles: [
            { label: 'Hypertrophic cardiomyopathy', link: { to: 'disease', id: 'DIS-HCM' } },
            { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Restrictive cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
            { label: 'Pericardial effusion / tamponade', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: 'Myxomatous mitral valve disease', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
          ],
        },
        {
          cat: 'Pulmonary Hypertension / R-Sided',
          tone: 'orange',
          tiles: [
            { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: 'Arterial thromboembolism', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
          ],
        },
      ],
    },
  ],
}

const syncopeReflex: FlowPage = {
  id: 'syncope-reflex',
  title: 'Syncope — Reflex / Non-Cardiac',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' REFLEX / NON-CARDIAC', sub: 'Clear trigger (cough · excitement · micturition) · structurally normal heart · metabolic clues (weakness, GI signs)' },
    { kind: 'node', variant: 'step', text: 'NEUROCARDIOGENIC / REFLEX vs METABOLIC MIMIC?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Neurocardiogenic / Reflex',
          tone: 'teal',
          tiles: [
            { label: 'Vasovagal syncope', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: ' Tussive / situational syncope — cough, vomiting, micturition, defecation, swallowing', terminal: true },
          ],
        },
        {
          cat: 'Metabolic Mimic',
          tone: 'warning',
          tiles: [
            { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: ' Severe systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
          ],
        },
        // No "Not syncope — seizure" column: the seizure escape hatch is stated
        // once, on the syncope entry gate, and owned by the collapse triage.
      ],
    },
  ],
}

export const syncopeFlows: FlowPage[] = [syncopeEntry, syncopeCardiac, syncopeReflex]
