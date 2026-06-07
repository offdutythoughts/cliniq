// ── Syncope flowchart ────────────────────────────────────────────────────────
// Syncope = transient loss of consciousness (TLOC) from cerebral hypoperfusion;
// BP must fall ~50% before unconsciousness. Mirrors epistaxis logic: imperative
// step → branch → nested sub-question within each column → endpoints.
// First, separate syncope from a SEIZURE; then split CARDIAC (arrhythmia or
// structural/PHTN) vs NEUROCARDIOGENIC/REFLEX vs NON-CARDIAC metabolic mimics.
// (Ettinger Ch 40)

import type { FlowPage } from '../flowTypes'

export const syncopeFlow: FlowPage = {
  id: 'syncope',
  title: 'Syncope',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💤 SYNCOPE' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>Is it syncope or a SEIZURE?</strong> Syncope is triggered by exertion/excitement, the animal is <strong>flaccid</strong> ("sleep-like") with <strong>no aura and no post-ictal phase</strong>, and recovers within seconds to ~1 minute. A seizure usually starts at rest, has a prodrome, <strong>increased tone</strong> with rhythmic paddling/jaw-chopping, and a post-ictal period of confusion lasting minutes to hours. (Ettinger Ch 40)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRM TRUE SYNCOPE, THEN LOCALISE',
      sub: 'Syncope = TLOC from cerebral hypoperfusion; BP must fall ~50% before unconsciousness. An arrhythmia must last ~10–30 s to cause syncope. Exclude metabolic mimics (hypoglycaemia, Addisonian crisis) early. (Ettinger Ch 40)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🫀 CARDIAC',
          tone: 'danger',
          sub: 'Exertional collapse · murmur / gallop / arrhythmia · jugular distension · weak pulses · prior heart disease · sudden-death risk',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'ARRHYTHMIA vs STRUCTURAL / OUTFLOW vs PULMONARY HYPERTENSION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'ARRHYTHMIA (brady or tachy)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '📉', label: 'BRADYARRHYTHMIA', sublabel: 'High-grade/3rd-degree AV block · sinus arrest · sick sinus — ventricular standstill', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
                        { icon: '📈', label: 'TACHYARRHYTHMIA', sublabel: 'Rapid ventricular tachycardia · SVT — too fast to fill', tone: 'orange', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'STRUCTURAL / OUTFLOW OBSTRUCTION',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🐱', label: 'HYPERTROPHIC CARDIOMYOPATHY', sublabel: 'Cat · dynamic LVOT obstruction (HOCM)', tone: 'violet', link: { to: 'disease', id: 'DIS-HCM' } },
                        { icon: '🫀', label: 'DILATED CARDIOMYOPATHY', sublabel: 'Large-breed dog · ↓ output + VT', tone: 'violet', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
                        { icon: '🧱', label: 'RESTRICTIVE CARDIOMYOPATHY', sublabel: 'Cat · impaired filling', tone: 'indigo', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
                        { icon: '💧', label: 'PERICARDIAL EFFUSION / TAMPONADE', sublabel: 'Muffled HS · weak pulses · ascites', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
                        { icon: '🔉', label: 'MYXOMATOUS MITRAL VALVE DISEASE', sublabel: 'Small dog · syncope with exertion ± PHTN / cough', tone: 'teal', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'PULMONARY HYPERTENSION / R-SIDED',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫁', label: 'PULMONARY HYPERTENSION', sublabel: '64% present with syncope in one study — exertional', tone: 'orange', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
                        { icon: '🪱', label: 'HEARTWORM DISEASE', sublabel: 'Exercise intolerance · syncope · ascites', tone: 'green', link: { to: 'disease', id: 'DIS-CARD-HW' } },
                        { icon: '🩸', label: 'ARTERIAL THROMBOEMBOLISM', sublabel: 'Cat (often HCM) · acute collapse · pain', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🌿 REFLEX / NON-CARDIAC',
          tone: 'teal',
          sub: 'Clear trigger (cough · excitement · micturition) · structurally normal heart · metabolic clues (weakness, GI signs) · or an episode that is really a seizure',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'NEUROCARDIOGENIC / REFLEX vs METABOLIC MIMIC vs SEIZURE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'NEUROCARDIOGENIC / REFLEX',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🐶', label: 'VASOVAGAL SYNCOPE', sublabel: 'Young Boxers most common · Bezold–Jarisch · triggered by excitement', tone: 'teal', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
                        { icon: '😮‍💨', label: 'Tussive / situational syncope', sublabel: 'Cough, vomiting, micturition, defecation, swallowing, visceral pain', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'METABOLIC MIMIC (rule out early)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🍬', label: 'HYPOGLYCAEMIA', sublabel: 'Insulinoma · xylitol · juvenile/toy · sepsis — check glucose first', tone: 'warning', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
                        { icon: '🧂', label: 'HYPOADRENOCORTICISM (ADDISON)', sublabel: 'Episodic weakness/collapse · ↓Na⁺ ↑K⁺ · ACTH stim', tone: 'orange', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
                        { icon: '📈', label: 'Severe systemic hypertension', sublabel: 'Exacerbates rather than causes — assess if retinal/neuro signs', tone: 'info', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'NOT SYNCOPE — SEIZURE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '⚡', label: 'EPILEPSY / SEIZURE', sublabel: 'Aura + post-ictal + increased tone / paddling — see Weakness/Collapse', tone: 'violet', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong>Malignant arrhythmia</strong> — high-grade AV block, sinus arrest or sustained ventricular tachycardia carry a sudden-death risk; a normal resting ECG does NOT exclude an intermittent arrhythmia (Ettinger Ch 40)',
        '<strong onclick="renderDiseasePage(\'DIS-MET-HYPOGLY\')" style="cursor:pointer;text-decoration:underline;">Hypoglycaemia</strong> and <strong onclick="renderDiseasePage(\'DIS-SEC-HYPO\')" style="cursor:pointer;text-decoration:underline;">Addisonian collapse</strong> — cheap, treatable metabolic mimics; check glucose, Na⁺/K⁺ ± ACTH stim early',
        '<strong>Pericardial effusion / tamponade</strong> — muffled heart sounds + weak pulses + jugular distension; a syncopal patient may be one tap away from arrest',
        '<strong>Mistaking a seizure for syncope (or vice-versa)</strong> — exertional trigger + flaccid tone + instant recovery favours syncope; aura + paddling + post-ictal confusion favours seizure (Ettinger Ch 40)',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'syncope' } },
        { label: '🦴 Weakness / collapse — localisation flowchart', link: { to: 'flow', id: 'weakness' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Cardiac arrhythmias (brady & tachy)', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
        { label: 'Myxomatous mitral valve disease', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
        { label: 'Hypertrophic cardiomyopathy', link: { to: 'disease', id: 'DIS-HCM' } },
        { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
        { label: 'Restrictive cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
        { label: 'Pericardial effusion / tamponade', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
        { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
        { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
        { label: 'Arterial thromboembolism', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
        { label: 'Idiopathic epilepsy / seizures', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
        { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
        { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
        { label: 'Systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
      ],
    },
  ],
}
