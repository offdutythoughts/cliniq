// ── Syncope flowchart ────────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const syncopeEntry: FlowPage = {
  id: 'syncope',
  title: 'Syncope',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SYNCOPE — confirmed transient LOC' },
    {
      kind: 'callout',
      tone: 'info',
      html: '<strong>Syncope is confirmed.</strong> You\'ve already separated it from seizure (flaccid, no aura, instant recovery) using the <strong>Weakness / Collapse</strong> triage flow. Now localise the cause: <strong>Cardiogenic</strong> (arrhythmia / structural outflow / pulmonary hypertension) or <strong>Non-cardiogenic</strong> (reflex / metabolic mimic). Exclude cheap metabolic mimics — glucose, Na:K ± ACTH stim — before an expensive cardiac work-up. (Ettinger Ch 40)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE CAUSE — CARDIOGENIC vs NON-CARDIOGENIC',
      sub: 'Syncope = TLOC from cerebral hypoperfusion; BP must fall ~50% before unconsciousness; an arrhythmia must last ~10–30 s to trigger it. (Ettinger Ch 40)',
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
      title: ' ALWAYS RULE OUT / DON\'T MISS',
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
        { label: ' Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'syncope' } },
        { label: ' Weakness / collapse — localisation flowchart', link: { to: 'flow', id: 'weakness' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: ' DISEASE PAGES',
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
            { label: ' BRADYARRHYTHMIA — high-grade/3rd-degree AV block · sinus arrest · sick sinus', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: ' TACHYARRHYTHMIA — rapid ventricular tachycardia · SVT', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
          ],
        },
        {
          cat: 'Structural / Outflow',
          tone: 'violet',
          tiles: [
            { label: ' HYPERTROPHIC CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-HCM' } },
            { label: ' DILATED CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: ' RESTRICTIVE CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
            { label: ' PERICARDIAL EFFUSION / TAMPONADE', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: ' MYXOMATOUS MITRAL VALVE DISEASE', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
          ],
        },
        {
          cat: 'Pulmonary Hypertension / R-Sided',
          tone: 'orange',
          tiles: [
            { label: ' PULMONARY HYPERTENSION', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: ' HEARTWORM DISEASE', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: ' ARTERIAL THROMBOEMBOLISM', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
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
            { label: ' VASOVAGAL SYNCOPE', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: ' Tussive / situational syncope — cough, vomiting, micturition, defecation, swallowing' },
          ],
        },
        {
          cat: 'Metabolic Mimic',
          tone: 'warning',
          tiles: [
            { label: ' HYPOGLYCAEMIA', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: ' HYPOADRENOCORTICISM (ADDISON)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: ' Severe systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
          ],
        },
        {
          cat: 'Not Syncope — Seizure',
          tone: 'violet',
          tiles: [
            { label: ' EPILEPSY / SEIZURE', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
          ],
        },
      ],
    },
  ],
}

export const syncopeFlows: FlowPage[] = [syncopeEntry, syncopeCardiac, syncopeReflex]
