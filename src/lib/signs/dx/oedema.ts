// ── Peripheral Oedema — diagnostic approach (data) ──────────────────────────
// First localise: generalised/ventral pitting oedema (systemic mechanism) vs a
// localised single-limb/regional swelling (obstruction, hypersensitivity,
// lymphatic). For generalised oedema SERUM ALBUMIN is the pivotal first test:
// if low → UPC + faecal α₁-PI + bile acids to localise PLN vs PLE vs hepatic;
// if normal → echocardiography/imaging for cardiac/pericardial disease, then
// assess for vasculitis (CBC, infectious panel) or venous/lymphatic obstruction
// (imaging). Numbers verbatim from Ettinger Ch 30 (Fig 30.1) and Ch 60.

import type { DxApproach } from '../dxTypes'

export const oedemaDx: DxApproach = {
  title: 'Peripheral Oedema',
  tabs: {

    history: {
      title: 'History: Peripheral Oedema',
      blocks: [
        { kind: 'branch', text: 'GOAL: LOCALISED vs GENERALISED — THEN MECHANISM' },
        {
          kind: 'check',
          html: `<strong>Peripheral oedema</strong> appears when interstitial-matrix tension and lymphatic uptake are overwhelmed (Starling equation, Ettinger Ch 30). The single most useful first distinction is <strong>generalised / ventral pitting oedema</strong> (a systemic mechanism — go straight to serum albumin) versus a <strong>localised single-limb or regional swelling</strong> (think venous/lymphatic obstruction, hypersensitivity or trauma).`,
        },
        { kind: 'step', tone: 'teal', text: ' STEP 1 — DISTRIBUTION & TIME COURSE' },
        {
          kind: 'check',
          html: `<strong>Generalised / ventral</strong> → hypoalbuminaemia, right-sided CHF, or increased vascular permeability (sepsis/vasculitis/myxedema).<br>
    <strong>Single forelimb + ventral cervical/thoracic</strong> → cranial vena cava obstruction (mediastinal mass, thrombus, pacing lead).<br>
    <strong>Single hindlimb + ventral caudal abdomen</strong> → caudal vena cava obstruction (caudal abdominal mass, thrombus).<br>
    <strong>Acute onset</strong> after a drug/vaccine/sting/snakebite → hypersensitivity / angioedema / envenomation; <strong>chronic single-limb</strong> → lymphoedema (Ettinger Ch 30).`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — SYSTEMIC SIGNS POINTING TO A MECHANISM' },
        {
          kind: 'check',
          html: `<strong>GI signs (diarrhoea, weight loss)</strong> → protein-losing enteropathy.<br>
    <strong>PU/PD, proteinuria history</strong> → protein-losing nephropathy.<br>
    <strong>Icterus, encephalopathy, stunting/young animal</strong> → hepatic failure / portosystemic shunt.<br>
    <strong>Cough, exercise intolerance, syncope, abdominal distension (ascites)</strong> → right-sided congestive heart failure.<br>
    <strong>Fever, lethargy, collapse</strong> → SIRS/sepsis or immune-mediated/vector-borne vasculitis.`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — EXPOSURE, BREED & PRIOR EVENTS' },
        {
          kind: 'check',
          html: `<strong>Envenomation / vaccination / drugs / toxins / burns / trauma</strong> in the recent history → hypersensitivity or permeability oedema (Ettinger Ch 30, Fig 30.1).<br>
    <strong>Tick exposure & travel</strong> → vector-borne vasculitis (e.g. ehrlichiosis — peripheral oedema in the acute phase).<br>
    <strong>Young animal, hindlimb swelling from the first weeks/months of life</strong> → congenital lymphoedema (lymph-node hypoplasia/aplasia).<br>
    <strong>Prior surgery, trauma, radiation or neoplasia</strong> → acquired (obstructive) lymphoedema.`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Acute facial/laryngeal swelling after a drug/vaccine/sting = anaphylaxis/angioedema — airway emergency · Generalised oedema + ascites + exercise intolerance = right-sided CHF · Fever/collapse with warm swelling = sepsis/vasculitis · Known proteinuria or GI loss = hypoalbuminaemia with thromboembolism risk.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Peripheral Oedema',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — characterise the swelling, then look for the cause' },
        { kind: 'step', text: ' STEP 1 — PITTING vs NON-PITTING & TEMPERATURE' },
        {
          kind: 'check',
          html: `<strong>Pitting</strong> (persistent depression after digital pressure) → fluid displaced within the interstitium — most mechanisms (hypoalbuminaemia, hydrostatic, early permeability).<br>
    <strong>Non-pitting</strong> → fluid within cells / clotted fibrinogen — angioedema (deeper subdermal), post-surgical/traumatic, lymphangiosarcoma, myxedema; <strong>chronic lymphoedema becomes non-pitting</strong> (collagen deposition, interstitial fibrosis).<br>
    <strong>Warm, erythematous swelling</strong> → increased vascular permeability / inflammation (vasculitis, cellulitis, AV fistula) — distinct from the cool, non-tender oedema of oncotic/hydrostatic causes (Ettinger Ch 30).`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — CARDIOVASCULAR / VENOUS EXAM' },
        {
          kind: 'check',
          html: `<strong>Jugular venous distension or positive hepatojugular reflux, a heart murmur, an arrhythmia, ± ascites</strong> → right-sided CHF — go to echocardiography.<br>
    <strong>Muffled heart sounds, weak pulses, pulsus paradoxus</strong> → pericardial effusion / tamponade.<br>
    Palpate for a <strong>warm focal swelling with a bruit</strong> → arteriovenous fistula (test: US, angiogram).`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — SIGNS OF PERMEABILITY / INFECTION / ENDOCRINE' },
        {
          kind: 'check',
          html: `<strong>Fever, petechiae/ecchymoses, skin necrosis or ulceration</strong> → vasculitis (early signs: petechiae, ecchymoses, oedema → necrosis, pain, systemic signs).<br>
    <strong>Localised non-pitting swelling with signs of infection</strong> → cellulitis (aspirate for organisms/inflammatory cells).<br>
    <strong>Non-pitting skin oedema, lethargy, bradycardia, dermatologic change</strong> → myxedema (hypothyroidism — combined ↑permeability + hypoproteinaemia + ↓lymphatic drainage).`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Peripheral Oedema — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — STABILISE / TRIAGE FIRST' },
        {
          kind: 'check',
          html: `Treat <strong>anaphylaxis / angioedema with airway compromise</strong> before any work-up (adrenaline, airway). Tap a <strong>tamponading pericardial effusion</strong>, and resuscitate <strong>SIRS/sepsis</strong>. Severe hypoalbuminaemia (&lt;1.5 g/dL / &lt;15 g/L) carries effusion + thromboembolism risk (Ettinger Ch 60).`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — SERUM ALBUMIN (the pivotal first test)' },
        {
          kind: 'check',
          html: `Albumin provides ~80% of colloid oncotic pressure. Overt oedema from hypoalbuminaemia alone requires <strong>albumin &lt;2.0 g/dL (&lt;20 g/L)</strong>; risk of effusions, oedema and thromboembolism appears once <strong>&lt;1.5 g/dL (&lt;15 g/L)</strong> (Ettinger Ch 30 · Ch 60).<br>
    <strong>Thresholds:</strong> mildly low 2.1–2.5 g/dL (21–25 g/L) · moderately low 1.5–2.0 g/dL (15–20 g/L) · severely low &lt;1.5 g/dL (&lt;15 g/L).<br>
    Run the baseline minimum database alongside it: <strong>CBC, chemistry, urinalysis</strong> (Ettinger Ch 30, Fig 30.1).`,
        },
        { kind: 'step', alt: true, text: 'STEP 3a — IF ALBUMIN LOW → LOCALISE THE PROTEIN LOSS' },
        {
          kind: 'check',
          html: `Distinguish protein-losing nephropathy vs enteropathy vs hepatic failure (Ettinger Ch 30, Fig 30.1):<br>
    <strong>UPC (urine protein:creatinine)</strong> ↑ → protein-losing nephropathy (glomerular loss; note concurrent antithrombin loss → thromboembolism).<br>
    <strong>Faecal α₁-proteinase inhibitor (α₁-PI)</strong> ↑ → protein-losing enteropathy (GI loss; typically panhypoproteinaemia).<br>
    <strong>Bile acids ± ammonia</strong> abnormal → hepatic failure / portosystemic shunt (reduced synthesis — needs &gt;80% hepatocyte loss).`,
        },
        { kind: 'step', alt: true, text: 'STEP 3b — IF ALBUMIN NORMAL → CARDIAC / PERICARDIAL FIRST' },
        {
          kind: 'check',
          html: `With normal albumin and <strong>jugular distension, a murmur or an arrhythmia</strong> → <strong>echocardiography</strong> for right-sided CHF or pericardial disease (R-CHF is rare in small animals and is almost always accompanied by cavitary effusions).<br>
    <strong>Thoracic radiographs / ultrasound / CT</strong> assess pericardial effusion, heartworm/caval disease and a cranial mediastinal mass causing cranial vena cava obstruction (Ettinger Ch 30, Fig 30.1).`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — VASCULITIS / SEPSIS vs VENOUS-LYMPHATIC OBSTRUCTION' },
        {
          kind: 'check',
          html: `<strong>Fever or circulatory shock</strong> (normal albumin, no cardiac cause) → SIRS/sepsis or vasculitis: <strong>CBC, chemistry, UA, thoracic/abdominal imaging, infectious-disease testing</strong>; consider an immune-mediated panel.<br>
    <strong>Hypothyroid (↓T4)</strong> → myxedema: thyroid panel + imaging.<br>
    <strong>Localised forelimb</strong> → thoracic rads/US/CT (cranial mediastinal mass / cranial vena cava); <strong>localised hindlimb</strong> → abdominal rads/US/CT (caudal abdominal mass / caudal vena cava).<br>
    <strong>Warm swelling with a bruit</strong> → AV fistula (US, angiogram).<br>
    <strong>Non-pitting single limb</strong> → lymphoedema or lymphangiosarcoma: aspirate/biopsy, CBC, chemistry, lymphatic imaging if needed; <strong>non-pitting with infection</strong> → cellulitis (aspirate the area).`,
        },
      ],
      after: [
        {
          kind: 'diseaseGrid',
          title: ' LINKED DISEASE PAGES',
          links: [
            { label: 'Protein-losing nephropathy / glomerulonephritis', link: { to: 'disease', id: 'DIS-REN-GN' } },
            { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
            { label: 'Chronic hepatitis / hepatic failure', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Portosystemic shunt', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
            { label: 'Myxomatous mitral valve disease', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Restrictive cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
            { label: 'Pericardial disease / tamponade', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: 'Heartworm disease / caval syndrome', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: 'Vasculitis', link: { to: 'disease', id: 'DIS-BD-VASC' } },
            { label: 'Systemic lupus erythematosus', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: 'Hypercoagulable / thromboembolic disease', link: { to: 'disease', id: 'DIS-BD-HYPERCOAG' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Localised vs generalised is the first decision; for generalised oedema, <strong>serum albumin is the pivot</strong>.<br>
  • Overt hypoalbuminaemic oedema needs albumin &lt;2.0 g/dL (&lt;20 g/L); effusion + thromboembolism risk appears &lt;1.5 g/dL (&lt;15 g/L).<br>
  • Low albumin → split PLN (↑UPC) vs PLE (↑faecal α₁-PI) vs hepatic (bile acids/ammonia).<br>
  • Normal albumin → echocardiography for R-CHF/pericardial disease (R-CHF is rare and almost always with cavitary effusions), then vasculitis/sepsis (CBC, infectious panel) or venous/lymphatic obstruction (imaging).<br>
  • Warm, erythematous swelling = permeability/inflammation, not oncotic/hydrostatic oedema; non-pitting single-limb swelling = lymphoedema/lymphangiosarcoma.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
