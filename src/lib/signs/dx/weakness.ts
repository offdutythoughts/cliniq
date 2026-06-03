// ── Weakness — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxWeakness{History,Exam,Dx} (legacy inline render() HTML in
// ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const weaknessDx: DxApproach = {
  title: 'Weakness',
  tabs: {

  history: {
    title: 'History: Weakness',
    blocks: [
      { kind: 'branch', text: 'EPISODIC vs PERSISTENT? COLLAPSE vs WEAKNESS?' },
      {
        kind: 'check',
        html: `<strong>The single most useful history question:</strong> is it episodic (normal between events) or persistent/progressive?<br>
      <strong>Episodic + rapid full recovery</strong> → syncope, arrhythmia, myasthenia gravis (fatigable), episodic hypoglycaemia, narcolepsy.<br>
      <strong>Persistent / progressive</strong> → neuromuscular disease, metabolic, anaemia, cardiorespiratory.`,
      },
      { kind: 'step', text: '📋 CHARACTERISE THE EPISODE' },
      {
        kind: 'check',
        html: `<strong>Trigger:</strong> exercise/excitement → syncope or MG; fasting → hypoglycaemia; post-exercise collapse in a fit dog → EIC, cardiac.<br>
      <strong>Worse with exercise, better with rest</strong> → myasthenia gravis (fatigability) or cardiorespiratory.<br>
      <strong>Loss of consciousness?</strong> true LOC favours syncope/seizure over neuromuscular weakness.<br>
      <strong>Onset:</strong> peracute generalised LMN paralysis → tick paralysis, botulism, polyradiculoneuritis (coonhound).`,
      },
      { kind: 'step', alt: true, text: '💊 SYSTEMIC / DRUG / SIGNALMENT CLUES' },
      {
        kind: 'check',
        html: `<strong>Cat with ventroflexion of the neck</strong> → hypokalaemia, thiamine deficiency, or MG.<br>
      <strong>Waxing/waning GI signs + weakness (dog)</strong> → hypoadrenocorticism (Addison's).<br>
      <strong>PU/PD + weakness</strong> → endocrine (DM, HAC, hypoadrenocorticism), electrolyte disturbance.<br>
      <strong>Tick exposure / raw-meat or carrion access</strong> → tick paralysis / botulism.<br>
      <strong>Drugs:</strong> recent anaesthesia/aminoglycosides (unmask MG), beta-blockers, insulin overdose.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Always get an ECG before starting anti-epileptics in a collapsing animal — antiepileptics can worsen syncope, and a missed arrhythmia is fatal.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Weakness',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — IS THE PATIENT STABLE?' },
      {
        kind: 'check',
        html: `Assess perfusion (HR, pulse quality, CRT, MM colour), respiratory effort, and mentation first. Collapse can be a shock/anaemia/arrhythmia emergency, not a neurological problem.`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 2 — NEURO vs NON-NEURO' },
      {
        kind: 'check',
        html: `<strong>Cardiovascular:</strong> murmur, arrhythmia, pulse deficits, jugular distension, pale/cyanotic MM.<br>
      <strong>Respiratory:</strong> increased effort, cyanosis → hypoxaemia.<br>
      <strong>Metabolic clues:</strong> dehydration, bradycardia (hyperkalaemia of Addison's), hepatomegaly.<br>
      <strong>Anaemia:</strong> pale MM → weakness from poor oxygen delivery.`,
      },
      { kind: 'step', alt: true, text: '⚡ STEP 3 — NEUROMUSCULAR LOCALISATION' },
      {
        kind: 'check',
        html: `<strong>Key test:</strong> Weakness <strong>WITHOUT</strong> ataxia / proprioceptive deficits = neuromuscular. Weakness <strong>WITH</strong> ataxia = spinal cord. Support body weight to test proprioception (often intact despite marked paresis).`,
      },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Neuropathy</strong><br>↓/absent reflexes<br>Atrophy<br>± Ataxia (sensory)`,
          },
          {
            style: 'text-align:center;font-size:9px;background:#0D7377;',
            html: `<strong>Junctionopathy</strong><br>Normal reflexes<br>Fatigability<br>Normal at rest`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Myopathy</strong><br>Normal reflexes<br>Myalgia<br>Ventroflexion (cat)`,
          },
        ],
      },
      {
        kind: 'check',
        html: `<strong>Fatigability test:</strong> walk/exercise the patient — myasthenia gravis worsens dramatically and recovers with brief rest. Palpebral reflex fatigues with rapid repetition.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Weakness — Diagnostics',
    blocks: [
      { kind: 'step', text: 'WEAKNESS — DIAGNOSTIC APPROACH' },
      {
        kind: 'check',
        html: `<strong>First:</strong> Exclude non-neurological causes — cardiovascular (syncope, arrhythmia), metabolic (hypoglycaemia, electrolytes), respiratory.`,
      },
      { kind: 'branch', text: 'IS IT NEUROMUSCULAR?' },
      {
        kind: 'check',
        html: `<strong>Key test:</strong> Weakness <strong>WITHOUT</strong> ataxia = neuromuscular. Weakness <strong>WITH</strong> ataxia = spinal cord.<br>Proprioception often intact despite marked paresis (support body weight to test).`,
      },
      { kind: 'step', alt: true, text: 'NEUROMUSCULAR LOCALISATION' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Neuropathy</strong><br>↓/absent reflexes<br>Atrophy<br>± Ataxia (sensory)`,
          },
          {
            style: 'text-align:center;font-size:9px;background:#0D7377;',
            html: `<strong>Junctionopathy</strong><br>Normal reflexes<br>Fatigability<br>Normal at rest`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Myopathy</strong><br>Normal reflexes<br>Myalgia<br>Ventroflexion (cat)`,
          },
        ],
      },
      { kind: 'step', text: 'MINIMUM DATABASE + TARGETED TESTS' },
      {
        kind: 'html',
        html: `<div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">CK elevated → <strong>Myopathy</strong> (polymyositis, hypokalaemia, dystrophy)</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Serum K+ low + cat → <strong>Hypokalaemic polymyopathy</strong></div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">AChR antibody titre positive → <strong>Myasthenia gravis</strong></div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Tick found → Remove → Rapid improvement → <strong>Tick paralysis</strong></div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Ascending LMN paralysis, CSF protein ↑ → <strong>Polyradiculoneuritis</strong></div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">EMG/NCS for definitive neuromuscular localisation if unclear</div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  },
}
