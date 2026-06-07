// ── Myelopathy — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxMyelopathy{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const myelopathyDx: DxApproach = {
  title: 'Myelopathy',
  tabs: {

  history: {
    title: 'History: Myelopathy',
    blocks: [
      { kind: 'branch', text: 'ONSET + PAIN = THE TWO KEY HISTORY AXES' },
      {
        kind: 'check',
        html: `<strong>Onset</strong> separates the differentials more than anything else:<br>
      • <strong>Peracute (seconds–minutes), non-progressive, often during exercise, NON-painful</strong> → FCE or ANNPE.<br>
      • <strong>Acute (hours–days), progressive, PAINFUL</strong> → IVDD Type I (extrusion).<br>
      • <strong>Chronic progressive</strong> → degenerative myelopathy, neoplasia, CCSM (Wobbler), IVDD Type II.<br>
      • <strong>Trauma history</strong> → fracture/luxation.`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT & BREED CLUES' },
      {
        kind: 'check',
        html: `<strong>Chondrodystrophic breeds</strong> (Dachshund, French Bulldog, Beagle, Cocker) → IVDD Type I, often young–middle-aged.<br>
      <strong>Large-breed older dog, non-painful, slowly progressive</strong> (GSD) → degenerative myelopathy.<br>
      <strong>Large/giant breed, cervical</strong> (Dobermann, Great Dane) → CCSM / Wobbler.<br>
      <strong>Any breed, peracute after a jump/run</strong> → FCE (often large breeds, non-chondrodystrophic) / ANNPE.`,
      },
      { kind: 'step', alt: true, text: '📋 PROGRESSION & FUNCTION' },
      {
        kind: 'check',
        html: `Establish a timeline of <strong>ambulation, then proprioception, then deep pain</strong> loss — the order and speed guide urgency and prognosis.<br>
      Ask about <strong>urinary/faecal continence</strong> (bladder function), spinal pain (reluctance to jump, yelping), and any prior episodes.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Progressive loss of deep pain perception is a surgical emergency — time to decompression drives outcome.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Myelopathy',
    blocks: [
      { kind: 'step', text: 'NEUROLOGICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong>Assess:</strong> Gait, proprioception, spinal reflexes (patellar, withdrawal), spinal pain (palpation), <strong>deep pain perception</strong> (most important prognostic factor — test only if absent superficial sensation).`,
      },
      { kind: 'branch', text: 'LOCALISE SPINAL CORD SEGMENT' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'text-align:center;',
            html: `<strong>C1–C5:</strong> UMN all 4 limbs<br><strong>C6–T2:</strong> LMN thoracic, UMN pelvic`,
          },
          {
            style: 'text-align:center;background:#0D7377;',
            html: `<strong>T3–L3:</strong> UMN pelvic limbs<br><strong>L4–S3:</strong> LMN pelvic limbs`,
          },
        ],
      },
      {
        kind: 'check',
        html: `<strong>UMN signs</strong> (normal–increased reflexes, no atrophy, hypertonia) localise the lesion <em>cranial</em> to the reflex segment.<br>
      <strong>LMN signs</strong> (reduced/absent reflexes, hypotonia, neurogenic atrophy) localise <em>within</em> that reflex segment.<br>
      <strong>Schiff–Sherrington</strong> (rigid forelimbs + flaccid hindlimbs) indicates a severe T3–L3 lesion — not a forelimb lesion.<br>
      Check for a <strong>cutaneous trunci cut-off</strong> to help localise thoracolumbar lesions.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Deep pain absent:</strong> Guarded prognosis. IVDD surgery within 24h = 50–60% good outcome. Confirm true deep pain (conscious behavioural response), not withdrawal reflex.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Myelopathy — Diagnostics',
    blocks: [
      { kind: 'step', text: 'ACUTE MYELOPATHY — DIAGNOSTIC APPROACH' },
      { kind: 'step', alt: true, text: 'NEUROLOGICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong>Assess:</strong> Gait, proprioception, spinal reflexes (patellar, withdrawal), spinal pain (palpation), <strong>deep pain perception</strong> (most important prognostic factor).`,
      },
      { kind: 'branch', text: 'LOCALISE SPINAL CORD SEGMENT' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'text-align:center;',
            html: `<strong>C1–C5:</strong> UMN all 4 limbs<br><strong>C6–T2:</strong> LMN thoracic, UMN pelvic`,
          },
          {
            style: 'text-align:center;background:#0D7377;',
            html: `<strong>T3–L3:</strong> UMN pelvic limbs<br><strong>L4–S3:</strong> LMN pelvic limbs`,
          },
        ],
      },
      { kind: 'step', text: 'CHARACTERISE ONSET' },
      {
        kind: 'html',
        html: `<table style="width:100%;border-collapse:collapse;font-size:11px;line-height:1.5;">
  <thead>
    <tr>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #cbd5e1;color:#64748b;font-weight:600;width:28%;">Onset</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #cbd5e1;color:#64748b;font-weight:600;width:30%;">Clinical pattern</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #cbd5e1;color:#64748b;font-weight:600;">Diagnosis → Next step</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>Peracute</strong> (seconds)</td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;">Lateralised · non-painful</td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>FCE or ANNPE</strong> → MRI (non-surgical)</td>
    </tr>
    <tr>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>Acute</strong> (hours)</td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;">Progressive · spinal pain</td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>IVDD Type I</strong> → CT/MRI → Surgery?</td>
    </tr>
    <tr>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>Trauma history</strong></td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;">Spinal pain</td>
      <td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;"><strong>Fracture/luxation</strong> → Spinal rads, CT</td>
    </tr>
    <tr>
      <td style="padding:6px 8px;"><strong>Chronic progressive</strong></td>
      <td style="padding:6px 8px;">Weeks–months</td>
      <td style="padding:6px 8px;">Neoplasia · DM · CCSM → MRI</td>
    </tr>
  </tbody>
</table>`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Deep pain absent:</strong> Guarded prognosis. IVDD surgery within 24h = 50–60% good outcome.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
