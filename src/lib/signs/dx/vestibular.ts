// ── Vestibular — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxVestibular{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const vestibularDx: DxApproach = {
  title: 'Vestibular',
  tabs: {

  history: {
    title: 'History: Vestibular',
    blocks: [
      { kind: 'branch', text: 'CONFIRM IT IS VESTIBULAR, THEN AGE & ONSET' },
      {
        kind: 'check',
        html: `Owners report a "stroke" — head tilt, falling/rolling to one side, circling, nausea/inappetence, nystagmus. Confirm this is vestibular (loss of balance to one side) rather than generalised weakness or seizure.`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT & ONSET' },
      {
        kind: 'check',
        html: `<strong>Older dog, peracute, severe, then improving over days</strong> → idiopathic (geriatric) vestibular disease.<br>
      <strong>Cat, any age, peracute</strong> → idiopathic feline vestibular (often seasonal) — but exclude otitis/polyp.<br>
      <strong>Chronic head tilt + recurrent otitis externa</strong> → otitis media/interna.<br>
      <strong>Young cat with stertor / nasal signs</strong> → nasopharyngeal polyp.`,
      },
      { kind: 'step', alt: true, text: '💊 DRUGS, EARS & SYSTEMIC HISTORY' },
      {
        kind: 'check',
        html: `<strong>Ototoxic drugs:</strong> topical/systemic aminoglycosides, chlorhexidine flushed into a perforated bulla.<br>
      <strong>Ear disease history:</strong> chronic otitis, prior ear surgery/TECA, head shaking.<br>
      <strong>Hypothyroidism (dog)</strong> can cause peripheral vestibular / facial nerve signs.<br>
      <strong>Systemic illness, pyrexia, multifocal signs</strong> → favour central (encephalitis, neoplasia).`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Idiopathic vestibular disease is a diagnosis of exclusion — it should be non-progressive and start improving within 72 h. Re-examine if it does not.` },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Vestibular',
    blocks: [
      { kind: 'step', text: 'NEUROLOGICAL EXAMINATION' },
      { kind: 'check', html: `<strong>Assess:</strong> head tilt direction, nystagmus type, proprioception, mentation, cranial nerves (especially V and VII), and Horner syndrome. Also include otoscopy.` },
      { kind: 'branch', text: 'FOUR SIGNS THAT MEAN CENTRAL' },
      {
        kind: 'check',
        html: `Any one of these places the lesion centrally (brainstem/cerebellum):<br>
      1. <strong>Postural (proprioceptive) deficits</strong>, especially unilateral — the most reliable sign of central disease.<br>
      2. <strong>Vertical nystagmus, or nystagmus that changes direction with head position.</strong><br>
      3. <strong>Cranial nerve deficits other than CN VII / Horner</strong> (these two can occur with peripheral disease near the inner ear).<br>
      4. <strong>Decreased level of consciousness.</strong>`,
      },
      {
        kind: 'html',
        html: `<table style="width:100%;border-collapse:collapse;font-size:9px;margin-top:6px;">
  <thead>
    <tr>
      <th style="width:28%;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.15);text-align:left;color:#e2e8f0;font-weight:600;"></th>
      <th style="width:24%;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.15);text-align:left;color:#86efac;font-weight:600;">Peripheral</th>
      <th style="width:24%;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.15);text-align:left;color:#fca5a5;font-weight:600;">Central</th>
      <th style="width:24%;padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.15);text-align:left;color:#fcd34d;font-weight:600;">Bilateral</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">Mentation</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">Alert / normal</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">Often depressed / obtunded</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">Alert / normal</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">Nystagmus type</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">Horizontal or rotary only</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">Any type incl. vertical</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">Absent</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">Nystagmus direction</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">Fixed — does not change with head position</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">May be <strong>direction-changing</strong> or disconjugate</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">—</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">CP deficits</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">✗ ABSENT</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">✓ PRESENT</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">Variable</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">Head tilt</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">Present (toward lesion)</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">Present (toward lesion) OR paradoxical</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">✗ ABSENT</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">Other CN deficits</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">± Horner's · ± CN VII only</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">Multiple CN V–XII</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">Bilateral ventrolateral strabismus</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e8f0;">VOR</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#86efac;">Intact</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fca5a5;">May be impaired</td>
      <td style="padding:5px 6px;border-bottom:1px solid rgba(255,255,255,0.08);color:#fcd34d;">Absent bilaterally</td>
    </tr>
    <tr>
      <td style="padding:5px 6px;color:#e2e8f0;">Gait</td>
      <td style="padding:5px 6px;color:#86efac;">Rolling/falling toward lesion; ataxic</td>
      <td style="padding:5px 6px;color:#fca5a5;">Ataxia ± hemiparesis</td>
      <td style="padding:5px 6px;color:#fcd34d;">Wide-based; side-to-side sway; crouching</td>
    </tr>
  </tbody>
</table>`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Central can be <strong>ruled IN</strong> but <strong style="color:#FCA5A5;">not ruled OUT</strong> — a normal-looking peripheral exam does not exclude central disease. Paradoxical vestibular signs (head tilt away from the lesion) localise to the cerebellum/caudal peduncle.` },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Vestibular — Diagnostics',
    blocks: [
      { kind: 'step', text: 'VESTIBULAR — DIAGNOSTIC APPROACH' },
      { kind: 'step', alt: true, text: 'NEUROLOGICAL EXAMINATION' },
      { kind: 'check', html: `<strong>Assess:</strong> Head tilt direction, nystagmus type (horizontal/vertical/rotary/direction-changing), proprioception, mentation, cranial nerves (V, VII), Horner syndrome.` },
      { kind: 'branch', text: 'PERIPHERAL OR CENTRAL?' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;"><strong>Peripheral</strong><br><span style="font-size:9px;">Normal proprioception<br>Horizontal/rotary nystagmus<br>± CN VII / Horner</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Otoscopy</strong> + <strong>CT/MRI bullae</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Idiopathic (older dog)</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Otitis media/interna</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">NP polyp (young cat)</div>
      </div>
      <div class="dx-col">
        <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">Central<br><span style="font-weight:400;font-size:9px;">Proprioceptive deficits<br>↓ Mentation · Vertical nystagmus<br>Multiple CN deficits</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>MRI brain + CSF analysis</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">MUA / encephalitis</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Brain neoplasia</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Stroke (CVA)</div>
      </div>
    </div>`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Central can be <strong>ruled IN</strong> but <strong style="color:#FCA5A5;">not ruled OUT</strong> — ~1/3 with apparent peripheral have central disease.` },
      { kind: 'disclaimer' },
    ],
  },

  },
}
