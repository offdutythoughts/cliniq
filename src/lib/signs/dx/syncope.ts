// ── Syncope — diagnostic approach (data) ─────────────────────────────────────
// Syncope = transient LOC from cerebral hypoperfusion (Ettinger Ch 40). The
// approach: (1) confirm it really IS syncope (not a seizure), (2) rule out the
// cheap metabolic mimics (hypoglycaemia, Addison), then (3) hunt the cardiac
// cause — ECG + ambulatory monitoring (the key test, since arrhythmias are
// intermittent) + echocardiography. Links to the cardiac / metabolic DIS-* pages.

import type { DxApproach } from '../dxTypes'

export const syncopeDx: DxApproach = {
  title: 'Syncope',
  tabs: {

    history: {
      title: 'History: Syncope',
      blocks: [
        { kind: 'branch', text: 'GOAL: IS IT SYNCOPE — AND IS IT CARDIAC?' },
        {
          kind: 'check',
          html: `<strong>Syncope</strong> = transient loss of consciousness from cerebral hypoperfusion; the blood pressure must fall ~50% before unconsciousness, and an arrhythmia must last ~10–30 s to trigger it. <strong>Pre-syncope</strong> = partial LOC with brief ataxia/stumbling. The whole approach hinges on first separating syncope from a <strong>seizure</strong>, then deciding whether the cause is <strong>cardiac</strong> (arrhythmia or structural) or a <strong>reflex / non-cardiac mimic</strong>. (Ettinger Ch 40)`,
        },
        { kind: 'step', tone: 'warning', text: ' STEP 1 — SYNCOPE vs SEIZURE (the pivotal split)' },
        {
          kind: 'check',
          html: `<strong>Favours SYNCOPE:</strong> triggered by exercise/excitement (or none); initially motionless and <strong>flaccid</strong> ("sleep-like"); may have leg-flailing (not rhythmic paddling); eyes often open; <strong>no aura, no post-ictal phase</strong>; returns to normal within seconds to ~1 minute.<br>
    <strong>Favours SEIZURE:</strong> often at rest/from sleep; pre-ictal anxiety / odd behaviour (aura); jaw-chopping/chattering, salivation, repetitive <strong>paddling</strong>, increased tone; post-ictal confusion/disorientation/transient blindness lasting minutes to hours.<br>
    Get a witnessed description (or a phone video) — it is the single most useful piece of history. (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — TRIGGER, POSTURE & RECOVERY' },
        {
          kind: 'check',
          html: `<strong>Exertional / excitement-induced collapse</strong> → structural heart disease with limited output (HCM, DCM, pulmonary hypertension, heartworm) or a tachyarrhythmia.<br>
    <strong>Reflex / situational triggers</strong> → vasovagal syncope (young Boxers, triggered by excitement; Bezold–Jarisch reflex), or tussive / situational syncope (coughing, vomiting, sneezing, micturition, defecation, swallowing, visceral pain).<br>
    <strong>Cough first, then collapse</strong> → tussive syncope (advanced airway/cardiac disease).<br>
    Note <strong>colour</strong> (cyanosis/pallor) and whether recovery was truly <strong>instant</strong> (syncope) rather than a slow post-ictal recovery. (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — SIGNALMENT, MEDS & SYSTEMIC CLUES' },
        {
          kind: 'check',
          html: `<strong>Signalment:</strong> young Boxer → vasovagal/ARVC; small-breed dog with a murmur → MMVD ± pulmonary hypertension; large-breed dog → DCM; cat → HCM (± arterial thromboembolism).<br>
    <strong>Episodic weakness with GI signs / waxing-waning illness</strong> → consider hypoadrenocorticism (Addison).<br>
    <strong>Fasting / post-exercise weakness, toy/juvenile, or possible xylitol exposure</strong> → hypoglycaemia (insulinoma in older dogs).<br>
    <strong>Medications</strong> — sedatives, negative chronotropes/inotropes, vasodilators and diuretics can all precipitate hypotension/bradycardia. (Ettinger Ch 40)`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Exertional syncope + a murmur or known heart disease = cardiac until proven otherwise (sudden-death risk) · A clear post-ictal phase / aura points to seizure, not syncope · Episodic collapse with weakness + GI signs = rule out Addison · Recurrent syncope with a normal resting ECG still needs ambulatory monitoring — the arrhythmia is intermittent.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Syncope',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — auscult fully, take pulses & BP' },
        { kind: 'step', text: ' STEP 1 — CARDIAC AUSCULTATION & PULSE' },
        {
          kind: 'check',
          html: `Listen for a <strong>murmur</strong> (MMVD, dynamic LVOT obstruction in feline HCM, congenital outflow obstruction), a <strong>gallop</strong> (cardiomyopathy), and <strong>muffled heart sounds</strong> (pericardial effusion).<br>
    Assess <strong>rate & rhythm</strong> — bradycardia (AV block, sick sinus) or a fast/irregular rhythm with <strong>pulse deficits</strong> (tachyarrhythmia, AF). Note that a single in-clinic exam can be entirely normal between episodes.`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — RIGHT-HEART & PERFUSION SIGNS' },
        {
          kind: 'check',
          html: `<strong>Jugular distension / pulsation, ascites, weak femoral pulses, pulsus paradoxus</strong> → pericardial effusion / tamponade or right-sided failure.<br>
    <strong>Split/loud S2, right-apical murmur, exertional cyanosis</strong> → pulmonary hypertension (64% present with syncope in one study) or heartworm disease.<br>
    Assess mucous membrane colour and CRT — pallor (low output/anaemia) vs cyanosis (hypoxaemia). (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — NEURO, RESP & METABOLIC SCREEN' },
        {
          kind: 'check',
          html: `Brief <strong>neuro exam</strong> — interictal deficits favour a structural/neurological episodic cause rather than syncope.<br>
    <strong>Upper-airway noise</strong> (stertor/stridor, laryngeal paralysis, BUAS, tracheal collapse) → hypoxaemic / tussive collapse rather than cardiogenic syncope.<br>
    Look for clues to a metabolic mimic — weakness, weight loss, bradycardia or poor perfusion (Addison), or post-exertional disorientation that resolves with feeding (hypoglycaemia).`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Syncope — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — RULE OUT THE CHEAP METABOLIC MIMICS FIRST' },
        {
          kind: 'check',
          html: `Before chasing the heart, exclude the treatable mimics: <strong>blood glucose</strong> (hypoglycaemia — insulinoma, xylitol, juvenile/toy, sepsis) and <strong>serum electrolytes</strong> (Na⁺/K⁺ — a low Na:K ratio suggests hypoadrenocorticism).<br>
    Run a <strong>CBC + serum biochemistry</strong> (anaemia, organ disease) and check <strong>thyroid status</strong>.<br>
    If Addison is suspected → <strong>ACTH stimulation test</strong>. These are quick, inexpensive and treatable — don't miss them. (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — ECG + AMBULATORY MONITORING (the key test)' },
        {
          kind: 'check',
          html: `<strong>A resting ECG is always indicated</strong>, but a normal resting ECG does NOT exclude an intermittent arrhythmia — arrhythmias are paroxysmal, so the diagnostic yield of a snapshot is low.<br>
    <strong>Ambulatory monitoring is the cornerstone:</strong>
    <div style="margin-left:8px;">
      • <strong>Holter</strong> — continuous recording for 24 or 48 h; quantifies rhythm but may miss infrequent events (syncope often needs 5–7 days of monitoring).<br>
      • <strong>External cardiac event recorder</strong> — owner-activated, battery life ~5–7 days; <strong>75.5%</strong> success rate in correlating rhythm with an episode.<br>
      • <strong>Implantable loop recorder (ILR)</strong> — diagnostic yield <strong>48–58%</strong> (up to 66%) in dogs with intermittent weakness/syncope; reserved for rare events.
    </div>
    The goal is symptom–rhythm correlation: capture the heart rhythm <em>during</em> a spontaneous episode. (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — ECHOCARDIOGRAPHY + THORACIC IMAGING' },
        {
          kind: 'check',
          html: `<strong>Echocardiography is nearly always indicated</strong> — defines structural disease (HCM, DCM, RCM, MMVD), dynamic LVOT obstruction, pericardial effusion/tamponade, and estimates pulmonary artery pressure (pulmonary hypertension).<br>
    <strong>Thoracic radiographs</strong> — cardiomegaly, congestion, pulmonary patterns, and screening for heartworm/airway disease as a tussive-syncope substrate.<br>
    Heartworm antigen/microfilaria testing where endemic. (Ettinger Ch 40)`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — BP, BIOMARKERS & ADJUNCTS' },
        {
          kind: 'check',
          html: `<strong>Blood pressure</strong> (Doppler/oscillometric) — hypotension supports a haemodynamic mechanism; severe hypertension exacerbates rather than causes syncope.<br>
    <strong>NT-proBNP</strong> — supports the presence of significant cardiac disease (helps decide whether to pursue echo).<br>
    <strong>Cardiac troponin I (cTnI)</strong> — elevated cTnI has sensitivity 75% / specificity 80% for cardiogenic syncope vs epileptic seizures, but with significant overlap and <strong>low discriminatory value in the individual</strong> — supportive only.<br>
    If episodes remain unexplained and a neurological cause is suspected, pursue the seizure work-up (see the Weakness / Collapse approach). (Ettinger Ch 40)`,
        },
      ],
      after: [
        {
          kind: 'diseaseGrid',
          title: ' LINKED DISEASE PAGES',
          links: [
            { label: 'Cardiac arrhythmias (brady & tachy)', link: { to: 'disease', id: 'DIS-CARD-ARRHYTHMIA' } },
            { label: 'Myxomatous mitral valve disease', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: 'Hypertrophic cardiomyopathy', link: { to: 'disease', id: 'DIS-HCM' } },
            { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Pericardial effusion / tamponade', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'Idiopathic epilepsy / seizures', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
            { label: 'Weakness / collapse — diagnostic approach', link: { to: 'dx', id: 'weakness' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Decide syncope vs seizure first — flaccid + instant recovery + exertional trigger = syncope; aura + paddling + post-ictal confusion = seizure.<br>
  • A normal resting ECG does NOT exclude an intermittent arrhythmia — ambulatory monitoring (Holter / event recorder / ILR) is the key test.<br>
  • Aim for symptom–rhythm correlation: capture the heart rhythm <em>during</em> a real episode.<br>
  • Rule out the cheap, treatable metabolic mimics (glucose, Na⁺/K⁺ ± ACTH stim) before an expensive cardiac work-up.<br>
  • cTnI and NT-proBNP are supportive, not diagnostic — there is real overlap between cardiogenic syncope and seizures.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
