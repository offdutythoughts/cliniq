// ── Syncope flowchart ────────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const syncopeEntry: FlowPage = {
  id: 'syncope',
  title: 'Syncope',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SYNCOPE — TRANSIENT LOSS OF CONSCIOUSNESS' },

    // Q1: Confirm it IS syncope. Drawn as a typed fork rather than prose so the
    // seizure / narcolepsy mimics sit ON the flowchart — the SYNCOPE leg is a
    // `continue` leg, so the main spine runs unbroken into the localisation step.
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS REALLY SYNCOPE?',
      // subItems are PLAIN TEXT (rendered as React children, not HTML) — no tags.
      subItems: [
        'Syncope = TLOC from cerebral hypoperfusion · BP must fall ~50%, or an arrhythmia last ~10–30 s, before consciousness is lost',
        'Pre-syncope = partial LOC with brief ataxia / stumbling — work it up the same way',
        'Getting this wrong is not neutral: anti-epileptic drugs can WORSEN syncope, and a missed malignant arrhythmia carries a sudden-death risk',
      ],
    },
    {
      kind: 'fork',
      legs: [
        {
          label: 'SEIZURE',
          sub: 'Aura / pre-ictal change · tonic-clonic or paddling · often at rest or from sleep · salivation, urination, defecation · post-ictal confusion, blindness, hunger for minutes–hours',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Collapse / LOC triage', sublabel: 'Full syncope vs seizure vs narcolepsy table', tone: 'orange', link: { to: 'flow', id: 'weakness-collapse' } },
                { label: 'Epilepsy / seizures', tone: 'violet', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
              ],
            },
          ],
        },
        {
          label: 'SYNCOPE',
          sub: 'Flaccid, limp tone · no aura · exertion / excitement / cough / micturition trigger · seconds long · INSTANT and complete recovery, normal immediately after',
          continue: true,
        },
        {
          label: 'NARCOLEPSY / CATAPLEXY',
          sub: 'Sudden loss of tone triggered by food or excitement, or a sleep attack · arousable during the episode · normal immediately after · AEDs have no effect',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Narcolepsy / cataplexy', sublabel: 'Provoke with a food-trigger test — not a hypoperfusion event', tone: 'slate' },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Syncope confirmed.</strong> Now localise the cause: <strong>Cardiogenic</strong> (arrhythmia / structural outflow / pulmonary hypertension) or <strong>Non-cardiogenic</strong> (reflex / metabolic mimic). Exclude the cheap metabolic mimics — glucose, Na:K ± ACTH stim — before an expensive cardiac work-up. (Ettinger Ch 40)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE CAUSE — CARDIOGENIC vs NON-CARDIOGENIC',
      subItems: [
        'Exertional trigger, murmur / gallop, arrhythmia or known heart disease pushes cardiac',
        'A clear situational trigger with a structurally normal heart pushes reflex (Ettinger Ch 40)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' CARDIAC',
          sublabel: 'Exertional collapse · murmur / gallop / arrhythmia · jugular distension · weak pulses · prior heart disease · sudden-death risk',
          link: { to: 'flow', id: 'syncope-cardiac' },
        },
        {
          tone: 'teal',
          label: ' REFLEX / NON-CARDIAC',
          sublabel: 'Clear trigger (cough · excitement · micturition) · structurally normal heart · metabolic clues (weakness, GI signs)',
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
        '<strong>Mistaking a seizure for syncope (or vice-versa)</strong> — exertional trigger + flaccid tone + instant recovery favours syncope; aura + paddling + post-ictal confusion favours seizure (Ettinger Ch 40)',
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
    { kind: 'node', variant: 'entry', text: ' REFLEX / NON-CARDIAC', sub: 'Clear trigger (cough · excitement · micturition) · structurally normal heart · metabolic clues (weakness, GI signs) · or an episode that is really a seizure' },
    { kind: 'node', variant: 'step', text: 'NEUROCARDIOGENIC / REFLEX vs METABOLIC MIMIC vs SEIZURE?' },
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
        {
          cat: 'Not Syncope — Seizure',
          tone: 'violet',
          tiles: [
            { label: 'Epilepsy / seizure', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
          ],
        },
      ],
    },
  ],
}

export const syncopeFlows: FlowPage[] = [syncopeEntry, syncopeCardiac, syncopeReflex]
