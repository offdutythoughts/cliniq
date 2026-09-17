// ── Peripheral Oedema — diagnostic approach (data) ──────────────────────────
// First localise: generalised/ventral pitting oedema (systemic mechanism) vs a
// localised single-limb/regional swelling (obstruction, hypersensitivity,
// lymphatic). For generalised oedema SERUM ALBUMIN is the pivotal first test:
// if low → UPC + faecal α₁-PI + bile acids to localise PLN vs PLE vs hepatic;
// if normal → echocardiography/imaging for cardiac/pericardial disease, then
// assess for vasculitis (CBC, infectious panel) or venous/lymphatic obstruction
// (imaging). Numbers verbatim from Ettinger Ch 30 (Fig 30.1) and Ch 60.

import type { DxApproach } from '../dxTypes'
import { stepTable, bullets } from './shared/dxHelpers'

export const oedemaDx: DxApproach = {
  sign: 'oedema',
  title: 'Peripheral Oedema',
  tabs: {

    history: {
      title: 'History: Peripheral Oedema',
      blocks: [
        { kind: 'goal', text: 'GOAL: LOCALISED vs GENERALISED — THEN MECHANISM' },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Distribution', { text: 'Mechanism', tone: 'teal' }],
          rows: [
            ['<strong>Generalised / ventral pitting oedema</strong>', { text: 'A systemic mechanism — go straight to <strong>serum albumin</strong>', tone: 'teal' }],
            ['<strong>Localised single-limb or regional swelling</strong>', { text: bullets(['Venous / lymphatic obstruction', 'Hypersensitivity', 'Trauma']), tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `Peripheral oedema appears when interstitial-matrix tension and lymphatic uptake are overwhelmed (Starling equation). <span style="opacity:.7">(Ettinger Ch 30)</span>` },

        ...stepTable(1, 'DISTRIBUTION & TIME COURSE', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Distribution / onset', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Generalised / ventral</strong>', { text: bullets(['Hypoalbuminaemia', 'Right-sided CHF', 'Increased vascular permeability (sepsis · vasculitis · myxedema)']), tone: 'teal' }],
            ['<strong>Single forelimb + ventral cervical / thoracic</strong>', { text: bullets(['Cranial vena cava obstruction — mediastinal mass', 'Thrombus', 'Pacing lead']), tone: 'teal' }],
            ['<strong>Single hindlimb + ventral caudal abdomen</strong>', { text: bullets(['Caudal vena cava obstruction — caudal abdominal mass', 'Thrombus']), tone: 'teal' }],
            ['<strong>Acute onset after a drug / vaccine / sting / snakebite</strong>', { text: bullets(['Hypersensitivity', 'Angioedema', 'Envenomation']), tone: 'teal' }],
            ['<strong>Chronic single-limb</strong>', { text: 'Lymphoedema <span style="opacity:.7">(Ettinger Ch 30)</span>', tone: 'teal' }],
          ],
        }, '📍'),

        ...stepTable(2, 'SYSTEMIC SIGNS POINTING TO A MECHANISM', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Systemic sign', { text: 'Points to', tone: 'teal' }],
          rows: [
            [bullets(['Diarrhoea', 'Weight loss'], { lead: '<strong>GI signs</strong>' }), { text: 'Protein-losing enteropathy', tone: 'teal' }],
            [bullets(['<strong>PU/PD</strong>', '<strong>Proteinuria history</strong>']), { text: 'Protein-losing nephropathy', tone: 'teal' }],
            [bullets(['<strong>Icterus</strong>', '<strong>Encephalopathy</strong>', '<strong>Stunting / young animal</strong>']), { text: bullets(['Hepatic failure', 'Portosystemic shunt']), tone: 'teal' }],
            [bullets(['<strong>Cough</strong>', '<strong>Exercise intolerance</strong>', '<strong>Syncope</strong>', '<strong>Abdominal distension (ascites)</strong>']), { text: 'Right-sided congestive heart failure', tone: 'teal' }],
            [bullets(['<strong>Fever</strong>', '<strong>Lethargy</strong>', '<strong>Collapse</strong>']), { text: bullets(['SIRS / sepsis', 'Immune-mediated or vector-borne vasculitis']), tone: 'teal' }],
          ],
        }, '🔍'),

        ...stepTable(3, 'EXPOSURE, BREED & PRIOR EVENTS', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['History', { text: 'Points to', tone: 'teal' }],
          rows: [
            [bullets(['<strong>Envenomation</strong>', '<strong>Vaccination</strong>', '<strong>Drugs</strong>', '<strong>Toxins</strong>', '<strong>Burns</strong>', '<strong>Trauma</strong>']), { text: 'Hypersensitivity or permeability oedema <span style="opacity:.7">(Ettinger Ch 30, Fig 30.1)</span>', tone: 'teal' }],
            ['<strong>Tick exposure &amp; travel</strong>', { text: 'Vector-borne vasculitis — e.g. ehrlichiosis, peripheral oedema in the acute phase', tone: 'teal' }],
            ['<strong>Young animal, hindlimb swelling from the first weeks / months of life</strong>', { text: 'Congenital lymphoedema — lymph-node hypoplasia / aplasia', tone: 'teal' }],
            [bullets(['<strong>Prior surgery</strong>', '<strong>Trauma</strong>', '<strong>Radiation</strong>', '<strong>Neoplasia</strong>']), { text: 'Acquired (obstructive) lymphoedema', tone: 'teal' }],
          ],
        }, '💊'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          items: [
            `Acute facial/laryngeal swelling after a drug/vaccine/sting = anaphylaxis/angioedema — airway emergency`,
            `Generalised oedema + ascites + exercise intolerance = right-sided CHF`,
            `Fever/collapse with warm swelling = sepsis/vasculitis`,
            `Known proteinuria or GI loss = hypoalbuminaemia with thromboembolism risk`,
          ],
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Peripheral Oedema',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — characterise the swelling, then look for the cause' },

        ...stepTable(1, 'PITTING vs NON-PITTING & TEMPERATURE', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Character', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Pitting</strong><br>persistent depression after digital pressure', { text: 'Fluid displaced within the interstitium — most mechanisms (hypoalbuminaemia · hydrostatic · early permeability)', tone: 'teal' }],
            ['<strong>Non-pitting</strong>', { text: bullets(['Fluid within cells / clotted fibrinogen — angioedema (deeper subdermal)', 'Post-surgical or traumatic', 'Lymphangiosarcoma', 'Myxedema. <strong>Chronic lymphoedema becomes non-pitting</strong> (collagen deposition, interstitial fibrosis)']), tone: 'teal' }],
            ['<strong>Warm, erythematous swelling</strong>', { text: 'Increased vascular permeability / inflammation (vasculitis · cellulitis · AV fistula) — distinct from the cool, non-tender oedema of oncotic / hydrostatic causes <span style="opacity:.7">(Ettinger Ch 30)</span>', tone: 'teal' }],
          ],
        }, '👆'),

        ...stepTable(2, 'CARDIOVASCULAR / VENOUS EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            [bullets(['<strong>Jugular venous distension or positive hepatojugular reflux</strong>', '<strong>Heart murmur</strong>', '<strong>Arrhythmia ± ascites</strong>']), { text: 'Right-sided CHF — go to echocardiography', tone: 'teal' }],
            [bullets(['<strong>Muffled heart sounds</strong>', '<strong>Weak pulses</strong>', '<strong>Pulsus paradoxus</strong>']), { text: 'Pericardial effusion / tamponade', tone: 'danger' }],
            ['<strong>Warm focal swelling with a bruit</strong>', { text: 'Arteriovenous fistula — test with US, angiogram', tone: 'teal' }],
          ],
        }, '❤️'),

        ...stepTable(3, 'SIGNS OF PERMEABILITY / INFECTION / ENDOCRINE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            [bullets(['<strong>Fever</strong>', '<strong>Petechiae / ecchymoses</strong>', '<strong>Skin necrosis or ulceration</strong>']), { text: 'Vasculitis — early signs petechiae, ecchymoses, oedema → then necrosis, pain, systemic signs', tone: 'teal' }],
            ['<strong>Localised non-pitting swelling with signs of infection</strong>', { text: 'Cellulitis — aspirate for organisms / inflammatory cells', tone: 'teal' }],
            [bullets(['<strong>Non-pitting skin oedema</strong>', '<strong>Lethargy</strong>', '<strong>Bradycardia</strong>', '<strong>Dermatologic change</strong>']), { text: 'Myxedema (hypothyroidism) — combined ↑ permeability + hypoproteinaemia + ↓ lymphatic drainage', tone: 'teal' }],
          ],
        }, '🌡️'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Peripheral Oedema — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE / TRIAGE FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Presentation', { text: 'Action', tone: 'teal' }],
          rows: [
            ['<strong>Anaphylaxis / angioedema with airway compromise</strong>', { text: 'Treat <em>before</em> any work-up — adrenaline, airway', tone: 'danger' }],
            ['<strong>Tamponading pericardial effusion</strong>', { text: 'Tap it', tone: 'danger' }],
            ['<strong>SIRS / sepsis</strong>', { text: 'Resuscitate', tone: 'danger' }],
            ['<strong>Severe hypoalbuminaemia</strong> &lt;1.5 g/dL (&lt;15 g/L)', { text: 'Carries effusion + thromboembolism risk <span style="opacity:.7">(Ettinger Ch 60)</span>', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'SERUM ALBUMIN (the pivotal first test)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Value', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Physiology</strong>', { text: 'Albumin provides ~80% of colloid oncotic pressure', tone: 'teal' }],
            ['<strong>&lt;2.0 g/dL (&lt;20 g/L)</strong>', { text: 'Threshold for overt oedema from hypoalbuminaemia alone', tone: 'teal' }],
            ['<strong>&lt;1.5 g/dL (&lt;15 g/L)</strong>', { text: 'Risk of effusions, oedema and thromboembolism <span style="opacity:.7">(Ettinger Ch 30 · Ch 60)</span>', tone: 'danger' }],
            ['<strong>Grading</strong>', { text: bullets(['Mildly low 2.1–2.5 g/dL (21–25 g/L)', 'Moderately low 1.5–2.0 g/dL (15–20 g/L)', 'Severely low &lt;1.5 g/dL (&lt;15 g/L)']), tone: 'teal' }],
            ['<strong>Run alongside</strong>', { text: bullets(['Baseline minimum database — <strong>CBC</strong>', '<strong>Chemistry</strong>', '<strong>Urinalysis</strong> <span style="opacity:.7">(Ettinger Ch 30, Fig 30.1)</span>']), tone: 'teal' }],
          ],
        }, '🧪'),

        { kind: 'step', text: '🔽 STEP 3a — IF ALBUMIN LOW → LOCALISE THE PROTEIN LOSS', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test result', { text: 'Diagnosis', tone: 'teal' }],
          rows: [
            ['<strong>UPC (urine protein:creatinine) ↑</strong>', { text: bullets(['Glomerular loss', 'Note concurrent antithrombin loss → thromboembolism'], { lead: '<strong>Protein-losing nephropathy</strong>' }), tone: 'teal' }],
            ['<strong>Faecal α₁-proteinase inhibitor (α₁-PI) ↑</strong>', { text: bullets(['GI loss', 'Typically panhypoproteinaemia'], { lead: '<strong>Protein-losing enteropathy</strong>' }), tone: 'teal' }],
            ['<strong>Bile acids ± ammonia abnormal</strong>', { text: bullets(['Reduced synthesis', 'Needs &gt;80% hepatocyte loss <span style="opacity:.7">(Ettinger Ch 30, Fig 30.1)</span>'], { lead: '<strong>Hepatic failure / portosystemic shunt</strong>' }), tone: 'teal' }],
          ],
        },

        { kind: 'step', text: '❤️ STEP 3b — IF ALBUMIN NORMAL → CARDIAC / PERICARDIAL FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding / test', { text: 'Detail', tone: 'teal' }],
          rows: [
            [bullets(['<strong>Jugular distension</strong>', '<strong>Murmur</strong>', '<strong>Arrhythmia</strong> with normal albumin']), { text: '<strong>Echocardiography</strong> for right-sided CHF or pericardial disease — R-CHF is rare in small animals and is almost always accompanied by cavitary effusions', tone: 'teal' }],
            ['<strong>Thoracic radiographs / ultrasound / CT</strong>', { text: bullets(['Pericardial effusion', 'Heartworm / caval disease', 'Cranial mediastinal mass causing cranial vena cava obstruction <span style="opacity:.7">(Ettinger Ch 30, Fig 30.1)</span>']), tone: 'teal' }],
          ],
        },

        ...stepTable(4, 'VASCULITIS / SEPSIS vs VENOUS-LYMPHATIC OBSTRUCTION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Scenario', { text: 'Work-up', tone: 'teal' }],
          rows: [
            ['<strong>Fever or circulatory shock</strong><br>normal albumin, no cardiac cause', { text: bullets(['SIRS / sepsis or vasculitis — <strong>CBC</strong>', '<strong>Chemistry</strong>', '<strong>UA</strong>', '<strong>Thoracic and abdominal imaging</strong>', '<strong>Infectious-disease testing</strong>; consider an immune-mediated panel']), tone: 'teal' }],
            ['<strong>Hypothyroid (↓T4)</strong>', { text: 'Myxedema — thyroid panel + imaging', tone: 'teal' }],
            ['<strong>Localised forelimb</strong>', { text: bullets(['Thoracic rads / US / CT — cranial mediastinal mass', 'Cranial vena cava']), tone: 'teal' }],
            ['<strong>Localised hindlimb</strong>', { text: bullets(['Abdominal rads / US / CT — caudal abdominal mass', 'Caudal vena cava']), tone: 'teal' }],
            ['<strong>Warm swelling with a bruit</strong>', { text: bullets(['AV fistula — US', 'Angiogram']), tone: 'teal' }],
            ['<strong>Non-pitting single limb</strong>', { text: bullets(['Lymphoedema or lymphangiosarcoma — aspirate / biopsy', 'CBC', 'Chemistry', 'Lymphatic imaging if needed']), tone: 'teal' }],
            ['<strong>Non-pitting with infection</strong>', { text: 'Cellulitis — aspirate the area', tone: 'teal' }],
          ],
        }, '🔬'),
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
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
          kind: 'pearls',
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
