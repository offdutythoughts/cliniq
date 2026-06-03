// ── Coughing — diagnostic approach (data) ───────────────────────────────────
// Migration of the inline renderDxCoughing{History,Exam,Dx} HTML (in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const coughingDx: DxApproach = {
  title: 'Coughing',
  tabs: {

  history: {
    title: 'History: Coughing',
    blocks: [
      { kind: 'branch', text: 'SPECIES RULE FIRST' },
      {
        kind: 'check',
        html: `<strong>Cats do NOT cough from cardiac disease</strong> — a coughing cat almost always has airway/lung disease (feline asthma/bronchitis top of list). In dogs, both cardiac and respiratory causes are common.`,
      },
      { kind: 'step', text: '📋 CHARACTERISE THE COUGH' },
      {
        kind: 'check',
        html: `<strong>Dry/honking</strong> → tracheal collapse (toy breed), kennel cough, airway collapse.<br>
      <strong>Productive/moist</strong> → pneumonia, pulmonary oedema, bronchiectasis.<br>
      <strong>Nocturnal / on excitement, dog with murmur</strong> → consider left atrial enlargement.<br>
      <strong>Paroxysmal + terminal retch/wheeze (cat)</strong> → feline asthma/bronchitis.<br>
      <strong>Timing:</strong> acute (&lt;2 wk) → infectious (CIRD), FB, oedema; chronic (&gt;2 mo) → chronic bronchitis, collapse, neoplasia.`,
      },
      { kind: 'step', alt: true, text: '🌍 RISK / EXPOSURE / SIGNALMENT' },
      {
        kind: 'check',
        html: `<strong>Recent boarding/kennels/dog park, incomplete vaccination</strong> → CIRD (kennel cough).<br>
      <strong>Toy/small breed, chronic goose-honk</strong> → tracheal collapse.<br>
      <strong>Young, outdoor, slug/snail access</strong> → Angiostrongylus (lungworm).<br>
      <strong>Older dog, weight loss</strong> → pulmonary or mediastinal neoplasia.<br>
      <strong>Exercise intolerance, syncope with cough</strong> → cardiac disease / pulmonary hypertension.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> A coughing dog that becomes dyspnoeic at rest or has pink frothy fluid may be in pulmonary oedema — stabilise (O₂, furosemide) before stressful diagnostics.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Coughing',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — OBSERVE BEFORE TOUCHING' },
      {
        kind: 'check',
        html: `Respiratory rate & effort, pattern (inspiratory vs expiratory), posture, cyanosis. A distressed cyanotic patient is stabilised first.`,
      },
      { kind: 'step', alt: true, text: '👂 STEP 2 — AUSCULT & PALPATE' },
      {
        kind: 'check',
        html: `<strong>Tracheal pinch</strong>: easily induced cough → tracheobronchial irritation (CIRD, collapse, bronchitis).<br>
      <strong>Lung sounds</strong>: crackles → oedema/pneumonia/fibrosis; wheezes → bronchoconstriction (asthma, bronchitis); dull ventrally → pleural effusion/mass.<br>
      <strong>Heart</strong>: murmur, gallop, arrhythmia, pulse quality → cardiac contribution (dogs). A cough with a normal heart and no murmur makes cardiogenic cough unlikely.<br>
      <strong>Upper airway</strong>: stertor/stridor → nasopharyngeal/laryngeal disease.`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 3 — SUPPORTING SIGNS' },
      {
        kind: 'check',
        html: `Pyrexia → pneumonia/infectious. Weight loss/cachexia → neoplasia/chronic disease. Jugular distension/ascites → right heart failure. Sync with the murmur grade and femoral pulses to weigh cardiac vs respiratory.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Coughing — Diagnostics',
    blocks: [
      { kind: 'step', text: 'COUGHING — DIAGNOSTIC APPROACH' },
      {
        kind: 'check',
        html: `<strong>Key species rule:</strong> Cats do NOT cough from cardiac disease. If a cat is coughing → respiratory cause.`,
      },
      { kind: 'branch', text: 'CHARACTERISE COUGH' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;"><strong>Dry / Unproductive</strong><br><span style="font-size:9px;">Harsh, honking, hacking<br>No sputum</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Tracheal pinch + → Kennel cough</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Goose-honk, toy breed → Tracheal collapse</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Dog + murmur + night → Cardiogenic (LA enlargement)</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Cat + wheeze → Feline asthma</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Chronic &gt;2mo → Chronic bronchitis</div>
      </div>
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;background:#0D7377;"><strong>Wet / Productive</strong><br><span style="font-size:9px;">Moist, rattling<br>Sputum produced</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Pyrexia + crackles → Pneumonia</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Murmur + pink froth → Pulm oedema</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Young dog, outdoor → Lungworm</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Weight loss → Pulm neoplasia</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Recurrent pneumonia → Bronchiectasis</div>
      </div>
    </div>`,
      },
      { kind: 'step', alt: true, text: 'DIAGNOSTICS' },
      {
        kind: 'html',
        html: `<div class="dx-row c3">
      <div class="dx-note" style="font-size:9px;"><strong>CXR</strong> (3 views)<br>Bronchial? Alveolar? Mass?</div>
      <div class="dx-note" style="font-size:9px;"><strong>NT-proBNP</strong><br>Cardiac vs respiratory?</div>
      <div class="dx-note" style="font-size:9px;"><strong>BAL / Echo</strong><br>If CXR inconclusive</div>
    </div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  },
}
