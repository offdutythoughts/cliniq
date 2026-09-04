// ── Myelopathy — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxMyelopathy{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { CN_EXAM_ACCORDION } from './shared/neuroExam'
import { NEURO_LOC_COLS, NEURO_LOC_HEADERS, NEURO_LOC_MIN_WIDTH, NEURO_LOC_ROWS } from '../neuroLocalisation'
import { stepTable, numBadge } from './shared/dxHelpers'

export const myelopathyDx: DxApproach = {
  title: 'Myelopathy',
  tabs: {

  history: {
    title: 'History: Myelopathy',
    blocks: [
      { kind: 'branch', text: 'ONSET + PAIN = THE TWO KEY HISTORY AXES' },

      { kind: 'step', text: '⏱️ STEP 1 — ONSET & TEMPO', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.9fr 1fr 1.4fr',
        dividers: true,
        headers: ['Onset', 'Clinical pattern', { text: 'Differential & next step', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Peracute</strong><br>seconds`, 'Lateralised · non-painful', { text: '<strong>FCE / ANNPE</strong><br>MRI — non-surgical', tone: 'teal' }],
          [`${numBadge(2)}<strong>Acute</strong><br>hours`, 'Progressive · spinal pain', { text: '<strong>IVDD Type I</strong><br>CT/MRI → surgery?', tone: 'teal' }],
          [`${numBadge(3)}<strong>Trauma</strong><br>known event`, 'Spinal pain', { text: '<strong>Fracture / luxation</strong><br>Spinal rads, CT', tone: 'teal' }],
          [`${numBadge(4)}<strong>Chronic</strong><br>weeks–months`, 'Slowly progressive', { text: '<strong>Neoplasia · DM · CCSM</strong><br>MRI', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🐾 STEP 2 — SIGNALMENT & BREED CLUES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.95fr 1.05fr 1.15fr',
        dividers: true,
        headers: ['Signalment', 'Clues', { text: 'Differential diagnosis', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Chondrodystrophic</strong>`, 'Dachshund · French Bulldog · Beagle · Cocker; young–middle-aged', { text: '<strong>IVDD Type I</strong>', tone: 'teal' }],
          [`${numBadge(2)}<strong>Large breed, older</strong>`, 'GSD ≥8 yr; non-painful, slowly progressive', { text: '<strong>Degenerative myelopathy</strong>', tone: 'teal' }],
          [`${numBadge(3)}<strong>Large / giant breed</strong>`, 'Dobermann · Great Dane; cervical pain, tetraparesis', { text: '<strong>CCSM / Wobbler</strong>', tone: 'teal' }],
          [`${numBadge(4)}<strong>Large, non-chondrodystrophic</strong>`, 'Labrador · GSD · Border Collie; peracute during exercise, non-painful', { text: '<strong>FCE / ANNPE</strong>', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '📋 STEP 3 — PROGRESSION & FUNCTION' },
      { kind: 'note', html: `Establish the timeline — function is lost in this order, and the order + speed drive urgency and prognosis.`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.4fr',
        dividers: true,
        headers: ['Lost in this order', { text: 'What you see', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Ambulation</strong>`, { text: 'Ambulatory → ataxic → non-ambulatory', tone: 'teal' }],
          [`${numBadge(2)}<strong>Proprioception</strong>`, { text: 'Knuckling · scuffing · delayed placing', tone: 'teal' }],
          [`${numBadge(3)}<strong>Deep pain</strong>`, { text: 'Last to go — absent = surgical emergency', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.4fr',
        dividers: true,
        headers: ['Also ask', { text: 'Why it changes the plan', tone: 'teal' }],
        rows: [
          ['<strong>Urinary / faecal continence</strong>', { text: 'Sacral (S1–S3) involvement — changes nursing, bladder management and prognosis', tone: 'teal' }],
          ['<strong>Spinal pain</strong><br>reluctance to jump · yelping', { text: 'Painful → compressive or inflammatory · non-painful → FCE / ANNPE / DM', tone: 'teal' }],
          ['<strong>Prior episodes</strong>', { text: 'Recurrent IVDD, or a progressive degenerative course', tone: 'teal' }],
        ],
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

      { kind: 'step', text: '👀 STEP 1 — HANDS-OFF OBSERVATION' },
      { kind: 'note', html: `Observe before touching — many findings are lost once the patient is anxious or restrained.`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Observe', { text: 'What to note', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Mentation</strong>`, { text: 'Alert / obtunded / stupor / coma — altered mentation <em>with</em> spinal signs → intracranial or foramen magnum involvement', tone: 'teal' }],
          [`${numBadge(2)}<strong>Posture</strong>`, { text: 'Head tilt · low head carriage · kyphosis · scoliosis · wide-based stance', tone: 'teal' }],
          [`${numBadge(3)}<strong>Gait</strong>`, { text: 'Ataxia (spinal vs vestibular vs cerebellar) · paresis · asymmetry · dorsal paw scuffing · toe-dragging', tone: 'teal' }],
          [`${numBadge(4)}<strong>Head &amp; face</strong>`, { text: 'Strabismus · nystagmus · circling · facial asymmetry (lip, ear, nostril) · ptosis', tone: 'teal' }],
          [`${numBadge(5)}<strong>Muscle bulk</strong>`, { text: 'Temporal / masseter wasting · fore- or hindlimb asymmetry visible at rest', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🧠 STEP 2 — HANDS-ON: CRANIAL NERVES (tap to expand)' },
      CN_EXAM_ACCORDION,

      ...stepTable(3, 'NECK: CERVICAL PAIN & MUSCLE ATROPHY', {
        cols: '0.95fr 1.25fr',
        dividers: true,
        headers: ['Do', { text: 'Looking for', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Palpate</strong> the vertebral column, occiput → sacrum`, { text: 'Site(s) of pain · muscle guarding · rigidity', tone: 'teal' }],
          [`${numBadge(2)}<strong>Assess supraspinatus / infraspinatus bulk</strong>`, { text: 'C6–T2 LMN atrophy in forelimb monoparesis', tone: 'teal' }],
        ],
      }, '👋'),

      ...stepTable(4, 'TRUNK: CUTANEOUS TRUNCI REFLEX', {
        cols: '0.55fr 1.6fr',
        dividers: true,
        headers: ['', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Technique</strong>`, { text: 'Gently pinch the dorsal skin with haemostats, bilaterally, moving caudal → cranial', tone: 'teal' }],
          [`${numBadge(2)}<strong>Pathway</strong>`, { text: 'Afferent enters the cord locally; efferent exits via the lateral thoracic nerve (C8–T1) to the cutaneus trunci', tone: 'teal' }],
          [`${numBadge(3)}<strong>Interpret</strong>`, { text: 'Skin twitch lost caudal to a level → lesion ≈ <strong>1–2 segments cranial</strong> to the cutoff — most useful for T3–L3', tone: 'teal' }],
        ],
      }, '👆'),

      { kind: 'branch', text: 'LOCALISE SPINAL CORD SEGMENT' },
      {
        kind: 'gridTable',
        label: 'Neurological Localisation',
        scroll: true,
        minWidth: NEURO_LOC_MIN_WIDTH,
        cols: NEURO_LOC_COLS,
        headers: NEURO_LOC_HEADERS,
        rows: NEURO_LOC_ROWS,
      },
      {
        kind: 'gridTable',
        label: 'Reading the pattern',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Pattern', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>UMN signs</strong><br>normal–↑ reflexes · no atrophy · hypertonia', { text: 'Lesion <em>cranial</em> to the reflex-arc segment', tone: 'teal' }],
          ['<strong>LMN signs</strong><br>↓/absent reflexes · hypotonia · neurogenic atrophy', { text: 'Lesion <em>within</em> that segment', tone: 'teal' }],
          ['<strong>Schiff–Sherrington</strong><br>forelimb extensor rigidity + flaccid hindlimbs', { text: 'Severe <strong>T3–L3</strong> lesion — <em>not</em> a forelimb lesion', tone: 'teal' }],
        ],
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
      { kind: 'step', text: '🧪 STEP 1 — MINIMUM DATABASE (IN-CLINIC)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>CBC · biochemistry · UA</strong>`, { text: 'Metabolic / infectious contributors (hypocalcaemia, toxoplasmosis, distemper); anaesthetic safety before imaging', tone: 'teal' }],
          [`${numBadge(2)}<strong>Blood pressure</strong>`, { text: 'Hypertension → ischaemic myelopathy', tone: 'teal' }],
          [`${numBadge(3)}<strong>Thoracic radiographs</strong>`, { text: 'Primary pulmonary neoplasia — exclude before attributing spinal signs to metastasis', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '📊 STEP 2 — SPINAL RADIOGRAPHS' },
      { kind: 'note', html: `Survey <strong>lateral + VD</strong> of the localised spinal region, under sedation.`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '1fr 1fr',
        dividers: true,
        headers: ['Radiographic finding', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['Narrowed / wedged disc space', { text: '<strong>IVDD</strong>', tone: 'teal' }],
          ['Mineralised material in the canal', { text: '<strong>IVDD Type I</strong> extrusion', tone: 'teal' }],
          ['Vertebral fracture / luxation', { text: '<strong>Trauma</strong> — rigid support, minimal handling', tone: 'teal' }],
          ['Lytic / proliferative bone', { text: '<strong>Neoplasia</strong>', tone: 'teal' }],
          ['End-plate lysis', { text: '<strong>Discospondylitis</strong>', tone: 'teal' }],
          ['Malformed vertebrae', { text: '<strong>Congenital anomaly</strong>', tone: 'teal' }],
        ],
      },
      {
        kind: 'note',
        html: `<strong>Caveat:</strong> radiographs cannot visualise cord compression — a normal study does <strong>NOT</strong> exclude significant IVDD.`,
      },
      {
        kind: 'note',
        html: `<strong>End-plate lysis → discospondylitis work-up:</strong><br>
      ${numBadge(1)}Blood culture × 2 &nbsp; ${numBadge(2)}Brucella canis serology &nbsp; ${numBadge(3)}Urine culture &nbsp; ${numBadge(4)}Cardiac echo (endocarditis source)`,
      },
      ...stepTable(3, 'CT SCAN', {
        cols: '0.95fr 1.3fr',
        dividers: true,
        headers: ['Choose CT when', { text: 'Why', tone: 'teal' }],
        rows: [
          ['Spinal radiographs are <strong>equivocal</strong>', { text: 'Faster and more widely available than MRI', tone: 'teal' }],
          ['<strong>Trauma</strong> suspected', { text: 'Superior bone detail', tone: 'teal' }],
          ['<strong>Pre-surgical planning</strong> for thoracolumbar IVDD', { text: 'Shows lateralisation of disc material — adequate for most acute IVDD decompression planning', tone: 'teal' }],
          [{ text: '⚠️ <strong>Blind spot</strong>', tone: 'danger' }, { text: 'Poor soft-tissue contrast — does <strong>not</strong> reliably detect intraparenchymal cord lesions (FCE · ANNPE · neoplastic infiltration · DM)', tone: 'danger' }],
        ],
      }, '🔍'),
      { kind: 'step', text: '🧲 STEP 4 — MRI (REFERRAL)' },
      { kind: 'note', html: `<strong>Gold standard for spinal cord assessment.</strong> Required for:`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['Indication', { text: 'What you are looking for', tone: 'teal' }],
        rows: [
          ['<strong>FCE / ANNPE</strong>', { text: 'T2 hyperintense intraparenchymal lesion; no compressive material', tone: 'teal' }],
          ['<strong>Degenerative myelopathy</strong>', { text: 'Diagnosis of exclusion — MRI rules out compression', tone: 'teal' }],
          ['<strong>Neoplasia / infiltrative</strong>', { text: 'Cord signal change, contrast enhancement', tone: 'teal' }],
          ['<strong>CCSM (Wobbler)</strong>', { text: 'Cervical cord compression mapping for surgical planning', tone: 'teal' }],
          ['<strong>CT non-diagnostic</strong>', { text: 'Clinical signs still demand an explanation', tone: 'teal' }],
        ],
      },
      ...stepTable(5, 'CSF ANALYSIS (REFERRAL)', {
        cols: '0.6fr 1.6fr',
        dividers: true,
        headers: ['', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Timing</strong>`, { text: 'Collect <strong>after MRI</strong> — exclude obstructive hydrocephalus / herniation risk before tapping', tone: 'danger' }],
          [`${numBadge(2)}<strong>Indications</strong>`, { text: 'Infectious / inflammatory myelopathy (GME · meningomyelitis · distemper) · neoplastic infiltration · progressive non-compressive myelopathy with no imaging diagnosis', tone: 'teal' }],
          [`${numBadge(3)}<strong>Interpret</strong>`, { text: 'Cell count · differential · protein · cytology ± infectious PCR (Toxoplasma, Neospora, CDV; 🐱 FIV/FeLV)', tone: 'teal' }],
        ],
      }, '💧'),
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
