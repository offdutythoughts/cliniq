// ── Encephalopathy — diagnostic approach (data) ─────────────────────────────
// Migration of the legacy renderDxEncephalopathy{History,Exam,Dx} inline render
// functions (in ../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const encephalopathyDx: DxApproach = {
  title: 'Encephalopathy',
  tabs: {

  history: {
    title: 'History: Encephalopathy',
    blocks: [
      { kind: 'branch', text: 'RULE OUT METABOLIC / TOXIC BEFORE STRUCTURAL' },
      {
        kind: 'check',
        html: `Acute "brain" signs (altered mentation, seizures, behaviour change, blindness) are commonly extracranial. The history should chase metabolic and toxic causes first — they are fast, cheap and often reversible.`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT & ONSET' },
      {
        kind: 'check',
        html: `<strong>Young animal, stunted, signs after meals</strong> → congenital portosystemic shunt (hepatic encephalopathy).<br>
      <strong>Young–middle-aged, progressive multifocal</strong> → MUA / encephalitis (esp. small breeds).<br>
      <strong>Older, progressive, focal</strong> → neoplasia.<br>
      <strong>Peracute, lateralised, non-progressive</strong> → cerebrovascular accident (stroke).`,
      },
      { kind: 'step', alt: true, text: '💊 TOXIN / DRUG / DIET / SYSTEMIC' },
      {
        kind: 'check',
        html: `<strong>Toxin access:</strong> ethylene glycol, metaldehyde, permethrin (cat), lead, xylitol, recreational drugs, ivermectin (MDR1 breeds).<br>
      <strong>Diet:</strong> cat on fish/all-meat or thiamine-deficient diet → thiamine deficiency.<br>
      <strong>Known disease:</strong> diabetes (hypo/hyperglycaemia, DKA), liver disease/PSS, renal failure (uraemic), Addison's (Na disorders).<br>
      <strong>Recent trauma</strong> → traumatic brain injury / haemorrhage.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Check blood glucose in EVERY altered-mentation or seizing patient — it takes seconds and hypoglycaemia is instantly correctable.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Encephalopathy',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STABILISE (ABC) BEFORE A FULL EXAM' },
      { kind: 'check', html: `Secure airway, oxygenate, support circulation, control active seizures, and check glucose. A crashing brain patient is resuscitated first.` },
      { kind: 'step', alt: true, text: '🧠 MENTATION & LOCALISATION' },
      {
        kind: 'check',
        html: `Grade mentation (alert → obtunded → stupor → coma; or modified Glasgow Coma Scale).<br>
      <strong>Forebrain</strong> signs: altered behaviour/mentation, circling toward the lesion, contralateral menace deficit with normal PLR, seizures, central blindness.<br>
      <strong>Brainstem</strong> signs: multiple cranial-nerve deficits, vestibular signs, abnormal respiratory pattern, severely depressed consciousness.`,
      },
      { kind: 'step', alt: true, text: '🔺 SIGNS OF RAISED INTRACRANIAL PRESSURE' },
      {
        kind: 'check',
        html: `Obtundation/coma, <strong>bilateral mydriasis with poor PLR</strong>, head pressing, and the <strong>Cushing reflex</strong> (hypertension + reflex bradycardia) signal life-threatening raised ICP — treat immediately.<br>
      Perform a <strong>fundic exam</strong> (papilloedema, chorioretinitis, retinal haemorrhage → hypertension/infectious) and check for pyrexia (infectious/inflammatory).`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Elevated ICP:</strong> Head pressing, obtundation, bilateral mydriasis → Mannitol 0.25–0.5g/kg over 15min; elevate head 30°; avoid jugular compression.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Encephalopathy — Diagnostics',
    blocks: [
      { kind: 'step', text: 'ACUTE ENCEPHALOPATHY — DIAGNOSTIC APPROACH' },
      { kind: 'check', html: `<strong>Stabilise (ABC)</strong> → Assess mentation (AVPU or mGCS), posture, cranial nerves, postural reactions.` },
      { kind: 'step', alt: true, text: 'MINIMUM DATABASE — BLOODS FIRST' },
      {
        kind: 'html',
        html: `<div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Glucose low → <strong>Hypoglycaemia</strong> → Dextrose bolus</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Na &gt;180 or &lt;120, or rapid change → <strong>Sodium disorder</strong> → Correct slowly</div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">↑ Ammonia / bile acids, ↓ BUN/albumin → <strong>Hepatic encephalopathy</strong></div>
    <div style="height:3px;"></div>
    <div class="dx-dx" style="text-align:left;font-weight:400;font-size:10px;line-height:1.6;width:100%;">Cat + raw fish/preserved meat diet → <strong>Thiamine deficiency</strong> → Supplement immediately</div>`,
      },
      { kind: 'branch', text: 'BLOODS NORMAL → MRI + CSF' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-dx" style="width:100%;font-size:9px;">Peracute, non-progressive, focal<br>→ <strong>CVA (stroke)</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Progressive multifocal, young<br>→ <strong>MUA / encephalitis</strong></div>
      </div>
      <div class="dx-col">
        <div class="dx-dx" style="width:100%;font-size:9px;">Older, progressive, mass on MRI<br>→ <strong>Neoplasia</strong></div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Pyrexia + systemic signs<br>→ <strong>Infectious encephalitis</strong></div>
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Elevated ICP:</strong> Head pressing, obtundation, bilateral mydriasis → Mannitol 0.25–0.5g/kg over 15min`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
