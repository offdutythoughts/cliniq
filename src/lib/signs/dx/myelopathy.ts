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
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>Peracute</strong> (seconds)</td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);color:#94a3b8;">Lateralised · non-painful</td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>FCE or ANNPE</strong> → MRI (non-surgical)</td>
    </tr>
    <tr>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>Acute</strong> (hours)</td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);color:#94a3b8;">Progressive · spinal pain</td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>IVDD Type I</strong> → CT/MRI → Surgery?</td>
    </tr>
    <tr>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>Trauma history</strong></td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);color:#94a3b8;">Spinal pain</td>
      <td style="padding:8px 8px;border-bottom:1px solid rgba(148,163,184,0.15);"><strong>Fracture/luxation</strong> → Spinal rads, CT</td>
    </tr>
    <tr>
      <td style="padding:8px 8px;"><strong>Chronic progressive</strong></td>
      <td style="padding:8px 8px;color:#94a3b8;">Weeks–months</td>
      <td style="padding:8px 8px;">Neoplasia · DM · CCSM → MRI</td>
    </tr>
  </tbody>
</table>`,
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
      {
        kind: 'accordion',
        cols: 2,
        items: [
          {
            title: 'CN I — Olfactory',
            html: `Not routinely tested in the spinal patient. Reduced interest in food odour combined with other forebrain signs (circling, behaviour change, seizures) suggests olfactory bulb or frontal lobe involvement.`,
          },
          {
            title: 'CN II — Optic · vision & pupils',
            html: `<strong>Menace response:</strong> Cover one eye; wave hand toward the other — expect blink (dog ≥8 wks, cat ≥10 wks). Afferent CN II; efferent CN VII.<br>
<strong>PLR — direct &amp; consensual:</strong> Shine light in one eye; ipsilateral pupil constricts (direct) and contralateral pupil constricts (consensual). Absent consensual = CN III or optic tract lesion.<br>
<strong>Visual tracking:</strong> Cotton ball dropped silently. <strong>Obstacle course</strong> in dim light tests peripheral vision.`,
          },
          {
            title: 'CN III / IV / VI — Eye movement',
            html: `Inspect eye position at rest for strabismus:<br>
• <strong>Ventrolateral strabismus</strong> → CN III (oculomotor) paresis — also mydriasis, ptosis.<br>
• <strong>Dorsomedial strabismus</strong> (cats &gt; dogs) → CN IV (trochlear).<br>
• <strong>Medial strabismus</strong> → CN VI (abducens) — also loss of globe retraction.<br>
<strong>Physiological nystagmus (doll's eye):</strong> Move head side to side; eyes should follow smoothly. Loss = CN III/IV/VI or MLF lesion.`,
          },
          {
            title: 'CN V — Trigeminal · sensation & jaw',
            html: `<strong>Facial sensation:</strong> Touch periocular skin, nasal planum, chin separately — assess blink/withdrawal (afferent limb of palpebral &amp; corneal reflexes).<br>
<strong>Jaw tone:</strong> Open mouth; resist passively. <strong>Bilateral CN V motor</strong> loss → dropped jaw, unable to close mouth.<br>
<strong>Masseter &amp; temporal muscle bulk:</strong> Palpate for atrophy — unilateral or bilateral wasting indicates chronic motor branch lesion.`,
          },
          {
            title: 'CN VII — Facial · motor symmetry',
            html: `<strong>At rest:</strong> Compare lip commissures, ear position, nostril width bilaterally. Facial paresis = dropped lip/ear on the affected side.<br>
<strong>Palpebral reflex:</strong> Touch medial canthus (afferent CN V) → blink (efferent CN VII). Absent blink with intact sensation = CN VII paresis.<br>
<strong>Lip pinch response:</strong> Stimulate lip — look for facial movement. <strong>Schirmer tear test</strong> if facial paresis suspected (parasympathetic fibres travel with CN VII to lacrimal gland).`,
          },
          {
            title: 'CN VIII — Vestibulocochlear',
            html: `<strong>Vestibular:</strong> Head tilt, spontaneous nystagmus (note direction &amp; plane — horizontal/rotary = peripheral; vertical or direction-changing = central), falling/rolling.<br>
<strong>Central vs peripheral:</strong> Vertical nystagmus, multiple CN deficits, cerebellar signs, or changing nystagmus direction = <strong>central</strong> (brainstem/cerebellum) — requires MRI, not spinal workup.<br>
<strong>Hearing:</strong> Cotton-ball test, hand clap out of sight. BAER testing for definitive assessment.`,
          },
          {
            title: 'CN IX / X — Gag & swallow',
            html: `<strong>Gag reflex:</strong> Depress tongue; touch pharyngeal wall — expect bilateral gag. Absent or weak = CN IX/X lesion.<br>
<strong>Soft palate symmetry:</strong> Observe during open-mouth exam — should elevate symmetrically on phonation.<br>
<strong>Dysphagia / regurgitation:</strong> History of drooling, repeated swallowing, or aspiration pneumonia suggests pharyngeal dysfunction.`,
          },
          {
            title: 'CN XI — Accessory · trapezius',
            html: `Palpate <strong>trapezius muscle bulk and tone</strong> bilaterally. Relevant in <strong>cervical myelopathy</strong>: C1–C5 lesions may affect the accessory nucleus (muscle atrophy); C6–T2 lesions typically spare it.<br>
Rarely tested in isolation but helps lateralise severe cervical disease.`,
          },
          {
            title: 'CN XII — Hypoglossal · tongue',
            html: `Inspect tongue at rest and during protrusion: <strong>deviation toward the affected side</strong>, asymmetric atrophy, or fasciculations indicate CN XII lesion or motor nucleus involvement.<br>
Assess licking ability and food manipulation — subtle deficits may only appear during eating.`,
          },
          {
            title: "Horner's syndrome — sympathetic pathway",
            html: `<strong>Signs:</strong> Miosis · ptosis (upper lid drooping) · enophthalmos · third-eyelid protrusion. All ipsilateral.<br>
<strong>Spinal localisation:</strong> Preganglionic fibres travel through T1–T3 spinal cord → Horner's with a C6–T2 lesion is a key localising sign.<br>
Always check both eyes — bilateral Horner's suggests a bilateral spinal or systemic cause.`,
          },
        ],
      },

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
        kind: 'html',
        html: `<div style="font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Neurological Localisation</div>
<div style="overflow-x:auto;width:100%;">
<table style="border-collapse:collapse;font-size:8.5px;min-width:560px;width:100%;">
  <thead>
    <tr>
      <th style="padding:7px 6px;font-size:8.5px;font-weight:700;color:var(--gray);border-bottom:2px solid rgba(148,163,184,0.3);text-align:left;min-width:100px;">Finding</th>
      <th style="padding:7px 6px;font-size:9px;font-weight:700;color:#6EE7B7;border-bottom:2px solid #6EE7B7;text-align:center;white-space:nowrap;">C1–C5</th>
      <th style="padding:7px 6px;font-size:9px;font-weight:700;color:#A5B4FC;border-bottom:2px solid #A5B4FC;text-align:center;white-space:nowrap;">C6–T2</th>
      <th style="padding:7px 6px;font-size:9px;font-weight:700;color:#FCD34D;border-bottom:2px solid #FCD34D;text-align:center;white-space:nowrap;">T3–L3</th>
      <th style="padding:7px 6px;font-size:9px;font-weight:700;color:#C084FC;border-bottom:2px solid #C084FC;text-align:center;white-space:nowrap;">L4–S3</th>
      <th style="padding:7px 6px;font-size:9px;font-weight:700;color:#F472B6;border-bottom:2px solid #F472B6;text-align:center;white-space:nowrap;">S2–Ca5</th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="6" style="padding:4px 6px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">General &amp; Gait</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Pain location</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Cervical<br>low head · stiff neck</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Caudal cervical /<br>thoracic inlet</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Thoracolumbar<br>kyphosis</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Lumbosacral<br>pain</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Lumbosacral /<br>perineal pain</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Gait</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Tetraparesis<br>(all 4 limbs)</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Tetraparesis<br>(FL worse)</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Paraparesis<br>(HL; FL normal)</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Paraparesis /<br>monoparesis (HL)</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);line-height:1.4;">Paraparesis<br>(HL + tail)</td></tr>

    <tr><td colspan="6" style="padding:4px 6px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">CP &amp; Muscle Tone</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Forelimb CP</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Hindlimb CP</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Deficient</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">FL tone</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic / ↑</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">LMN<br>flaccid · atrophy</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">HL tone</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic / ↑</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic / ↑</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic / ↑</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">LMN<br>flaccid / ↓</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">LMN<br>flaccid / ↓</td></tr>

    <tr><td colspan="6" style="padding:4px 6px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">Spinal Reflexes</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Biceps (C6–C8)</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Triceps (C7–T1)</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">FL withdrawal</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Patellar (L3–L4)</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">HL withdrawal</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↑ / Normal</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Absent</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Perineal / anal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓ / Absent</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Absent</td></tr>

    <tr><td colspan="6" style="padding:4px 6px 2px;font-size:8px;font-weight:700;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,0.08);">Special Tests</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Cutaneous trunci</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Present bilateral</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">↓/absent if C8–T1</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Absent caudal<br>(cutoff ≈1–2 segs)</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Horner's</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Present<br>(T1–T3)</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Schiff–Sherrington</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">± FL ext · HL<br>paralysis (severe)</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">Normal</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);border-bottom:1px solid rgba(148,163,184,0.1);white-space:nowrap;">Bladder</td><td style="padding:7px 6px;font-size:9px;color:#6EE7B7;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic · large</td><td style="padding:7px 6px;font-size:9px;color:#A5B4FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic</td><td style="padding:7px 6px;font-size:9px;color:#FCD34D;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">UMN<br>spastic · reflexic</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">LMN<br>flaccid · easy</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;border-bottom:1px solid rgba(148,163,184,0.1);">LMN<br>flaccid · easy</td></tr>
    <tr><td style="padding:7px 6px;font-size:9px;font-weight:600;color:var(--white);white-space:nowrap;">Tail tone</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;">Normal</td><td style="padding:7px 6px;font-size:9px;color:var(--gray);text-align:center;">Normal</td><td style="padding:7px 6px;font-size:9px;color:#C084FC;text-align:center;">↓ reduced</td><td style="padding:7px 6px;font-size:9px;color:#F472B6;text-align:center;">Flaccid</td></tr>
  </tbody>
</table>
</div>`,
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
      { kind: 'branch', text: 'STEP 1 — MINIMUM DATABASE (IN-CLINIC)' },
      {
        kind: 'check',
        html: `<strong>CBC + biochemistry panel + urinalysis</strong> — screen for metabolic / infectious contributors (e.g. hypocalcaemia, toxoplasmosis, distemper); establish anaesthetic safety if imaging is likely.<br>
      <strong>Blood pressure</strong> — hypertension can cause ischaemic myelopathy.<br>
      <strong>Thoracic radiographs</strong> — rule out primary pulmonary neoplasia before attributing spinal signs to metastatic disease.`,
      },
      { kind: 'step', text: 'STEP 2 — SPINAL RADIOGRAPHS' },
      {
        kind: 'check',
        html: `Survey <strong>lateral + VD radiographs</strong> of the localised spinal region under sedation.<br>
      Look for: <strong>disc-space narrowing</strong> (IVDD), <strong>mineralised disc material</strong> in the canal, vertebral fracture/luxation, lytic/proliferative bone lesions (neoplasia, discospondylitis), and congenital anomalies.<br>
      <em>Note:</em> Radiographs cannot visualise spinal cord compression directly — a normal study does NOT exclude significant IVDD.`,
      },
      {
        kind: 'note',
        html: `<strong>Discospondylitis clue:</strong> if radiographs show end-plate lysis, add blood culture × 2, Brucella serology (canis), urine culture, and cardiac echo (endocarditis source).`,
      },
      { kind: 'step', text: 'STEP 3 — CT SCAN' },
      {
        kind: 'check',
        html: `<strong>Indicated when:</strong> spinal radiographs are equivocal, trauma is suspected (superior bone detail), or pre-surgical planning is needed for thoracolumbar IVDD (identifies lateralisation of disc material).<br>
      CT is <strong>faster and more widely available</strong> than MRI and adequate for most acute IVDD decompression planning.<br>
      Limitations: poor soft-tissue contrast — does not reliably detect intraparenchymal cord lesions (FCE, ANNPE, neoplastic infiltration, DM).`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — MRI (REFERRAL)' },
      {
        kind: 'check',
        html: `<strong>Gold standard for spinal cord assessment.</strong> Required for:<br>
      • <strong>FCE / ANNPE</strong> — hyperintense intraparenchymal lesion on T2; no compressive material.<br>
      • <strong>Degenerative myelopathy</strong> — diagnosis of exclusion after MRI rules out compression.<br>
      • <strong>Neoplasia / infiltrative disease</strong> — cord signal change, contrast enhancement.<br>
      • <strong>CCSM (Wobbler)</strong> — cervical cord compression mapping for surgical planning.<br>
      • Any case where CT is non-diagnostic but clinical signs demand an explanation.`,
      },
      { kind: 'step', alt: true, text: 'STEP 5 — CSF ANALYSIS (REFERRAL)' },
      {
        kind: 'check',
        html: `Collect <strong>after MRI</strong> (imaging first to rule out obstructive hydrocephalus / herniation risk before tapping).<br>
      <strong>Indicated for:</strong> suspected infectious/inflammatory myelopathy (GME, meningomyelitis, distemper), neoplastic infiltration, or any non-compressive progressive myelopathy without a clear imaging diagnosis.<br>
      Interpret: cell count, differential, protein, cytology ± infectious PCR panel (Toxoplasma, Neospora, CDV, FIV/FeLV in cats).`,
      },
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
