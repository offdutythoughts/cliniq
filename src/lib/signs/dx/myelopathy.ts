// ── Myelopathy — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxMyelopathy{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { CN_EXAM_ACCORDION } from './shared/neuroExam'
import { stepPair } from './shared/dxHelpers'

export const myelopathyDx: DxApproach = {
  title: 'Myelopathy',
  tabs: {

  history: {
    title: 'History: Myelopathy',
    blocks: [
      { kind: 'branch', text: 'ONSET + PAIN = THE TWO KEY HISTORY AXES' },
      {
        kind: 'comparisonTable',
        cols: [
          { label: 'Onset', isLabel: true, width: '28%' },
          { label: 'Clinical pattern', color: '#94a3b8', width: '30%' },
          { label: 'Diagnosis → Next step' },
        ],
        rows: [
          { kind: 'row', cells: ['<strong>Peracute</strong> (seconds)', 'Lateralised · non-painful', '<strong>FCE or ANNPE</strong> → MRI (non-surgical)'] },
          { kind: 'row', cells: ['<strong>Acute</strong> (hours)', 'Progressive · spinal pain', '<strong>IVDD Type I</strong> → CT/MRI → Surgery?'] },
          { kind: 'row', cells: ['<strong>Trauma history</strong>', 'Spinal pain', '<strong>Fracture/luxation</strong> → Spinal rads, CT'] },
          { kind: 'row', cells: ['<strong>Chronic progressive</strong>', 'Weeks–months', 'Neoplasia · DM · CCSM → MRI'] },
        ],
        fontSize: '11px',
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
      { kind: 'branch', text: 'HEAD-TO-TAIL NEUROLOGICAL EXAMINATION' },

      { kind: 'step', text: 'STEP 1 — HANDS-OFF OBSERVATION' },
      {
        kind: 'check',
        html: `Observe before touching — many findings are lost once the patient is anxious or restrained.<br>
      <strong>Mentation:</strong> Alert / obtunded / stupor / coma. Altered mentation with spinal signs → suspect intracranial or foramen magnum involvement.<br>
      <strong>Posture:</strong> Head tilt · low head carriage · kyphosis · scoliosis · wide-based stance.<br>
      <strong>Gait:</strong> Ataxia (spinal vs vestibular vs cerebellar), paresis, asymmetry, scuffing of dorsal paw, toe-dragging.<br>
      <strong>Head &amp; face:</strong> Strabismus · nystagmus · circling · facial asymmetry (drooping lip, ear, nostril) · ptosis.<br>
      <strong>Muscle bulk:</strong> Temporal / masseter wasting · forelimb or hindlimb asymmetry visible at rest.`,
      },

      { kind: 'step', alt: true, text: 'STEP 2 — HANDS-ON: CRANIAL NERVES (tap to expand)' },
      CN_EXAM_ACCORDION,

      { kind: 'step', text: 'NECK — CERVICAL PAIN & MUSCLE ATROPHY' },
      {
        kind: 'check',
        html: `Palpate vertebral column from occiput to sacrum · note site(s) of pain, muscle guarding, or rigidity.<br>
      Assess <strong>supraspinatus and infraspinatus</strong> bulk (C6–T2 LMN atrophy in forelimb monoparesis).`,
      },

      { kind: 'step', text: 'TRUNK — CUTANEOUS TRUNCI REFLEX' },
      {
        kind: 'check',
        html: `Gently pinch the dorsal skin with haemostats bilaterally, moving from caudal to cranial.<br>
      The afferent runs locally into the spinal cord; the efferent exits via the lateral thoracic nerve (C8–T1) to cutaneus trunci muscle.<br>
      <strong>Loss of skin twitch caudal to a level</strong> → lesion is approximately <strong>1–2 segments cranial</strong> to the cutoff (most useful for T3–L3 lesions).`,
      },

      { kind: 'branch', text: 'LOCALISE SPINAL CORD SEGMENT' },
      {
        kind: 'comparisonTable',
        label: 'Neurological Localisation',
        scrollable: true,
        minWidth: '560px',
        fontSize: '8.5px',
        cols: [
          { label: 'Finding', isLabel: true, width: '100px' },
          { label: 'C1–C5',  color: 'var(--tone-green-fg)' },
          { label: 'C6–T2',  color: 'var(--tone-indigo-fg)' },
          { label: 'T3–L3',  color: 'var(--tone-warning-fg)' },
          { label: 'L4–S3',  color: '#C084FC' },
          { label: 'S2–Ca5', color: '#F472B6' },
        ],
        rows: [
          { kind: 'section', label: 'General & Gait' },
          { kind: 'row', cells: [
            'Pain location',
            'Cervical<br>low head · stiff neck',
            'Caudal cervical /<br>thoracic inlet',
            'Thoracolumbar<br>kyphosis',
            'Lumbosacral<br>pain',
            'Lumbosacral /<br>perineal pain',
          ]},
          { kind: 'row', cells: [
            'Gait',
            'Tetraparesis<br>(all 4 limbs)',
            'Tetraparesis<br>(FL worse)',
            'HL paraparesis',
            'Paraparesis /<br>monoparesis (HL)',
            'Paraparesis<br>(HL + tail)',
          ]},

          { kind: 'section', label: 'CP & Muscle Tone' },
          { kind: 'row', cells: [
            'Forelimb CP',
            'Deficient',
            'Deficient',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'Hindlimb CP',
            'Deficient',
            'Deficient',
            'Deficient',
            'Deficient',
            'Deficient',
          ]},
          { kind: 'row', cells: [
            'FL tone',
            'UMN<br>spastic / ↑',
            'LMN<br>flaccid · atrophy',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'HL tone',
            'UMN<br>spastic / ↑',
            'UMN<br>spastic / ↑',
            'UMN<br>spastic / ↑',
            'LMN<br>flaccid / ↓',
            'LMN<br>flaccid / ↓',
          ]},

          { kind: 'section', label: 'Spinal Reflexes' },
          { kind: 'row', cells: [
            'Biceps (C6–C8)',
            '↑ / Normal',
            '↓ / Absent',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'Triceps (C7–T1)',
            '↑ / Normal',
            '↓ / Absent',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'FL withdrawal',
            '↑ / Normal',
            '↓ / Absent',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'Patellar (L3–L4)',
            '↑ / Normal',
            '↑ / Normal',
            '↑ / Normal',
            '↓ / Absent',
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'HL withdrawal',
            '↑ / Normal',
            '↑ / Normal',
            '↑ / Normal',
            '↓ / Absent',
            'Absent',
          ]},
          { kind: 'row', cells: [
            'Perineal / anal',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            '↓ / Absent',
            'Absent',
          ]},

          { kind: 'section', label: 'Special Tests' },
          { kind: 'row', cells: [
            'Cutaneous trunci',
            'Present bilateral',
            '↓/absent if C8–T1',
            'Absent caudal<br>(cutoff ≈1–2 segs)',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            "Horner's",
            { html: 'Normal', dim: true },
            'Present<br>(T1–T3)',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'Schiff–Sherrington',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            '± FL ext · HL<br>paralysis (severe)',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
          ]},
          { kind: 'row', cells: [
            'Bladder',
            'UMN<br>spastic · large',
            'UMN<br>spastic',
            'UMN<br>spastic · reflexic',
            'LMN<br>flaccid · easy',
            'LMN<br>flaccid · easy',
          ]},
          { kind: 'row', cells: [
            'Tail tone',
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            { html: 'Normal', dim: true },
            '↓ reduced',
            'Flaccid',
          ]},
        ],
      },

      {
        kind: 'check',
        html: `<strong>UMN signs</strong> (normal–increased reflexes, no atrophy, hypertonia) → lesion <em>cranial</em> to the reflex arc segment.<br>
      <strong>LMN signs</strong> (reduced/absent reflexes, hypotonia, neurogenic atrophy) → lesion <em>within</em> that segment.<br>
      <strong>Schiff–Sherrington</strong> (extensor rigidity of forelimbs + flaccid hindlimbs) = severe T3–L3 lesion; not a forelimb lesion.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Deep pain absent:</strong> Apply firm haemostat pressure to digit — look for behavioural response (vocalisation, head turn), NOT withdrawal reflex alone. Absent DPP = guarded prognosis; IVDD surgery within 24 h = 50–60% good outcome.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Myelopathy — Diagnostics',
    blocks: [
      ...stepPair(1, 'MINIMUM DATABASE (IN-CLINIC)', `<strong>CBC + biochemistry panel + urinalysis</strong> — screen for metabolic / infectious contributors (e.g. hypocalcaemia, toxoplasmosis, distemper); establish anaesthetic safety if imaging is likely.<br>
      <strong>Blood pressure</strong> — hypertension can cause ischaemic myelopathy.<br>
      <strong>Thoracic radiographs</strong> — rule out primary pulmonary neoplasia before attributing spinal signs to metastatic disease.`),
      ...stepPair(2, 'SPINAL RADIOGRAPHS', `Survey <strong>lateral + VD radiographs</strong> of the localised spinal region under sedation.<br>
      Look for: <strong>disc-space narrowing</strong> (IVDD), <strong>mineralised disc material</strong> in the canal, vertebral fracture/luxation, lytic/proliferative bone lesions (neoplasia, discospondylitis), and congenital anomalies.<br>
      <em>Note:</em> Radiographs cannot visualise spinal cord compression directly — a normal study does NOT exclude significant IVDD.`),
      {
        kind: 'note',
        html: `<strong>Discospondylitis clue:</strong> if radiographs show end-plate lysis, add blood culture × 2, Brucella serology (canis), urine culture, and cardiac echo (endocarditis source).`,
      },
      ...stepPair(3, 'CT SCAN', `<strong>Indicated when:</strong> spinal radiographs are equivocal, trauma is suspected (superior bone detail), or pre-surgical planning is needed for thoracolumbar IVDD (identifies lateralisation of disc material).<br>
      CT is <strong>faster and more widely available</strong> than MRI and adequate for most acute IVDD decompression planning.<br>
      Limitations: poor soft-tissue contrast — does not reliably detect intraparenchymal cord lesions (FCE, ANNPE, neoplastic infiltration, DM).`),
      ...stepPair(4, 'MRI (REFERRAL)', `<strong>Gold standard for spinal cord assessment.</strong> Required for:<br>
      • <strong>FCE / ANNPE</strong> — hyperintense intraparenchymal lesion on T2; no compressive material.<br>
      • <strong>Degenerative myelopathy</strong> — diagnosis of exclusion after MRI rules out compression.<br>
      • <strong>Neoplasia / infiltrative disease</strong> — cord signal change, contrast enhancement.<br>
      • <strong>CCSM (Wobbler)</strong> — cervical cord compression mapping for surgical planning.<br>
      • Any case where CT is non-diagnostic but clinical signs demand an explanation.`),
      ...stepPair(5, 'CSF ANALYSIS (REFERRAL)', `Collect <strong>after MRI</strong> (imaging first to rule out obstructive hydrocephalus / herniation risk before tapping).<br>
      <strong>Indicated for:</strong> suspected infectious/inflammatory myelopathy (GME, meningomyelitis, distemper), neoplastic infiltration, or any non-compressive progressive myelopathy without a clear imaging diagnosis.<br>
      Interpret: cell count, differential, protein, cytology ± infectious PCR panel (Toxoplasma, Neospora, CDV, FIV/FeLV in cats).`),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'ESCALATION TRIGGERS',
        gap: 10,
        html: `<strong>Skip directly to CT/MRI if:</strong><br>
      • Deep pain <strong>absent</strong> — surgical emergency, do not delay with plain films.<br>
      • Rapid deterioration within hours.<br>
      • Trauma with suspected vertebral instability (handle with extreme care, rigid spinal support).`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>⚠️ Deep pain absent:</strong> IVDD surgery within 24 h = 50–60% good outcome. Each hour of delay worsens prognosis. Confirm true deep pain (conscious behavioural response to noxious stimulus), not withdrawal reflex.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
