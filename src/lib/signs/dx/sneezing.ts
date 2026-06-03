// ── Sneezing — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxSneezing{History,Exam,Dx} (legacy inline render() funcs
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const sneezingDx: DxApproach = {
  title: 'Sneezing',
  tabs: {

  history: {
    title: 'History: Sneezing',
    blocks: [
      { kind: 'branch', text: 'ACUTE vs CHRONIC, AND LATERALITY' },
      {
        kind: 'check',
        html: `<strong>Peracute violent sneezing + pawing at the nose</strong> → foreign body (grass seed), especially outdoor dogs.<br>
      <strong>Chronic, progressive</strong> → neoplasia, fungal rhinitis, chronic/lymphoplasmacytic rhinitis.<br>
      <strong>Distinguish a true sneeze from reverse sneezing</strong> (paroxysmal inspiratory snorting — usually benign).<br>
      <strong>Unilateral discharge points to structural disease</strong> until proven otherwise.`,
      },
      { kind: 'step', text: '📋 DISCHARGE & ASSOCIATED SIGNS' },
      {
        kind: 'check',
        html: `<strong>Serous</strong> → early viral/allergic. <strong>Mucopurulent</strong> → secondary bacterial, chronic disease. <strong>Haemorrhagic / epistaxis</strong> → neoplasia, fungal (aspergillosis), FB, coagulopathy → see Epistaxis.<br>
      <strong>Cat with conjunctivitis + ocular discharge + oral ulcers</strong> → FHV-1 / FCV (cat flu).<br>
      <strong>Signs worse with eating / dropped food into nose</strong> → oronasal fistula, cleft.`,
      },
      { kind: 'step', alt: true, text: '🌍 SIGNALMENT / ENVIRONMENT' },
      {
        kind: 'check',
        html: `<strong>Older dolichocephalic dog</strong> → nasal neoplasia / aspergillosis. <strong>Young multi-cat household / shelter</strong> → viral URTI.<br>
      <strong>Cat with "Roman nose"/facial swelling, endemic area</strong> → cryptococcosis.<br>
      <strong>Dental disease history</strong> → tooth-root abscess / oronasal fistula. <strong>Outdoor access</strong> → foreign body.`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Any haemorrhagic nasal discharge → cross over to the <strong>Epistaxis</strong> approach (local vs systemic).` },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Sneezing',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — EXTERNAL NOSE & FACE' },
      {
        kind: 'check',
        html: `Facial symmetry & bony contour (deformity → neoplasia/fungal), nasal planum depigmentation/ulceration (fungal), <strong>nasal airflow</strong> each nostril (glass slide / cotton wisp), and <strong>ocular retropulsion</strong> (reduced with retrobulbar/caudal nasal mass).`,
      },
      { kind: 'step', alt: true, text: '👄 STEP 2 — ORAL, DENTAL & OCULAR' },
      {
        kind: 'check',
        html: `Examine the hard palate and dental arcades (palate erosion, oronasal fistula, fractured/abscessed teeth). Check eyes for conjunctivitis (viral) and epiphora (nasolacrimal obstruction). Assess for stertor (nasopharyngeal disease/polyp).`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 3 — REGIONAL & SYSTEMIC' },
      {
        kind: 'check',
        html: `<strong>Submandibular lymphadenopathy</strong> (regional, often with intranasal disease) — sample it. Fundic exam (chorioretinitis with cryptococcosis/systemic fungal). General exam for signs of systemic disease if epistaxis is present.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Sneezing — Diagnostics',
    blocks: [
      { kind: 'step', text: 'SNEEZING — DIAGNOSTIC APPROACH' },
      { kind: 'check', html: `<strong>Key rule:</strong> Unilateral discharge = structural cause until proven otherwise. Always warrant advanced imaging.` },
      { kind: 'branch', text: 'LATERALITY OF DISCHARGE?' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">Unilateral<br><span style="font-weight:400;font-size:9px;">Think structural</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>CT + Rhinoscopy</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Acute onset → Foreign body</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Progressive + facial deformity → Neoplasia</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Dolichocephalic + haemorrhagic → Aspergillosis</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Worse after eating → Oronasal fistula</div>
      </div>
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;font-size:11px;"><strong>Bilateral</strong><br><span style="font-size:9px;">Infectious / inflammatory</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>PCR panel, CT if chronic</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Cat + conjunctivitis → FHV-1 / FCV</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Chronic post-URTI → Rhinosinusitis</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Young cat + stertor → NP polyp</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Cat + Roman nose → Cryptococcosis</div>
      </div>
    </div>`,
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Always biopsy chronic nasal disease to exclude neoplasia — even if CT looks inflammatory.` },
      { kind: 'disclaimer' },
    ],
  },

  },
}
