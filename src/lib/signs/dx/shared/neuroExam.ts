// ── Shared neuro-exam building blocks ────────────────────────────────────────
// Reusable DxBlock constants for the standard veterinary neurological
// examination. Import these into any sign that includes a full neuro exam
// (myelopathy, encephalopathy, vestibular, seizures, etc.) rather than
// copy-pasting the content into each file.

import type { DxBlock } from '../../dxTypes'

/** The 9-item cranial nerve accordion (CN I–XII + Horner's) used in any
 *  sign that includes a full neurological exam. Each item collapses/expands
 *  on tap. 2-column layout. */
export const CN_EXAM_ACCORDION: Extract<DxBlock, { kind: 'accordion' }> = {
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
}
