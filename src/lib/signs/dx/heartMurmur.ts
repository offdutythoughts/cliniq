// ── Heart Murmur — diagnostic approach (data) ────────────────────────────────
// A murmur is a physical sign, not a diagnosis. History narrows pathologic vs
// functional; auscultation characterises grade / timing / PMI / radiation and
// pulse quality; diagnostics (echo definitive, radiographs/VHS, ECG, BP,
// NT-proBNP) define the lesion and decide whether an innocent murmur needs no
// further work-up. Links to the cardiac disease pages (DIS-CARD-*, DIS-HCM).

import type { DxApproach } from '../dxTypes'

export const heartMurmurDx: DxApproach = {
  title: 'Heart Murmur',
  tabs: {

    history: {
      title: 'History: Heart Murmur',
      blocks: [
        { kind: 'branch', text: 'GOAL: PATHOLOGIC STRUCTURAL vs FUNCTIONAL / INNOCENT' },
        {
          kind: 'check',
          html: `A murmur is turbulent flow — it tells you something is moving fast, not <em>what</em>. The first job of the history is to sort <strong>pathologic structural disease</strong> (acquired MMVD/HCM/DCM, congenital PDA/SAS/PS/VSD) from a <strong>functional / innocent</strong> murmur (puppy/kitten innocent, anaemia, fever, hyperthyroidism, high-output states). (Ettinger Ch 38)`,
        },
        { kind: 'step', tone: 'teal', text: ' STEP 1 — SIGNALMENT & AGE' },
        {
          kind: 'check',
          html: `<strong>Puppy / kitten with a soft murmur</strong> → innocent murmur is likely, but a LOUD or persisting (beyond ~16 weeks) murmur → congenital disease (PDA, SAS, PS, VSD).<br>
    <strong>Older small-breed dog</strong> → myxomatous mitral valve disease (MMVD) is the commonest acquired murmur — left apical systolic.<br>
    <strong>Large / giant breed</strong> (Doberman, Great Dane, Irish Wolfhound, Boxer) → DCM; the murmur is often soft or absent.<br>
    <strong>Cat of any age</strong> → cardiomyopathy (HCM/RCM), but many feline murmurs are dynamic / physiologic and HCM may have NO murmur.`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — CARDIAC SIGNS & FUNCTIONAL STATUS' },
        {
          kind: 'check',
          html: `Ask about <strong>exercise intolerance, cough (dogs — LA enlargement compressing the bronchus), tachypnoea / dyspnoea, syncope or collapse</strong>.<br>
    <strong>Syncope on exertion</strong> in a young dog → SAS or PS until proven otherwise.<br>
    Cats do NOT cough from cardiac disease — feline CHF presents as dyspnoea/tachypnoea, not cough.<br>
    Document the resting / sleeping respiratory rate (a rising RR is an early sign of decompensation).`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — IS THERE A NON-CARDIAC EXPLANATION?' },
        {
          kind: 'check',
          html: `Screen for <strong>high-output / hyperdynamic states</strong> that produce a functional murmur: <strong>anaemia</strong> (pallor, lethargy — HCT &lt;20% dog / &lt;15% cat), <strong>fever / sepsis, pregnancy, hyperthyroidism</strong> (older cat — weight loss, polyphagia, goitre), and high sympathetic tone.<br>
    Ask about a <strong>new or changing murmur</strong> with fever, lethargy or shifting lameness → infective endocarditis (think <em>Bartonella</em>).`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Syncope / collapse on exertion in a young dog = SAS or PS until disproven · New or changing murmur + fever + shifting lameness = endocarditis · Cat with a murmur AND tachypnoea / dyspnoea = treat as CHF until echo says otherwise · A cat with no murmur is NOT a cat with no heart disease.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Heart Murmur',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' Auscultate systematically in a QUIET room, both sides, apex to base' },
        { kind: 'step', text: ' STEP 1 — GRADE THE MURMUR (Levine I–VI/VI)' },
        {
          kind: 'check',
          html: `<strong>I/VI</strong> very soft, heard only after intently listening ≥1 min · <strong>II/VI</strong> soft but easily heard · <strong>III/VI</strong> moderate · <strong>IV/VI</strong> loud, NO thrill · <strong>V/VI</strong> loud WITH a palpable precordial thrill · <strong>VI/VI</strong> very loud, thrill, audible with the stethoscope lifted 1 cm off the chest.<br>
    Grade tracks severity in congenital disease (PS, SAS) and MMVD, but <strong>not</strong> reliably in cats — palpate the precordium for a thrill (≥ grade V). (Ettinger Ch 38)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — TIMING (systolic / diastolic / continuous)' },
        {
          kind: 'check',
          html: `<strong>Systolic</strong> (between S1 and S2) — by far the commonest: MMVD, HCM, SAS, PS, VSD, tricuspid insufficiency, functional murmurs.<br>
    <strong>Diastolic</strong> (after S2) — uncommon: aortic insufficiency (endocarditis in adults; SAS/VSD in young dogs), pulmonic insufficiency.<br>
    <strong>Continuous "machinery"</strong> (throughout the cycle, peaking near S2) — PDA. The diastolic component disappears if pulmonary hypertension develops.<br>
    Also note <strong>gallop sounds (S3/S4)</strong> and systolic clicks — a gallop in a cat strongly suggests cardiomyopathy.`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — PMI & RADIATION (localise the lesion)' },
        {
          kind: 'check',
          html: `<strong>Left apex (mitral area), systolic</strong> → mitral insufficiency (MMVD), may radiate dorsally / to the right.<br>
    <strong>Left base, systolic</strong> → aortic (SAS — <strong>radiates up the carotids / neck</strong>) or pulmonic (PS — does NOT radiate to carotids) outflow.<br>
    <strong>Right cranial thorax, harsh holosystolic</strong> → VSD; <strong>right apex</strong> → tricuspid insufficiency.<br>
    <strong>Left craniodorsal base, continuous</strong> → PDA.<br>
    <strong>Cats</strong> — apical / sternal systolic murmurs are often dynamic RV/LV outflow obstruction and may be physiologic; PMI is a less reliable localiser. (Ettinger Ch 38)`,
        },
        { kind: 'step', alt: true, text: ' STEP 4 — PULSE QUALITY & PRECORDIUM' },
        {
          kind: 'check',
          html: `<strong>Hyperkinetic / bounding ("waterhammer") pulse</strong> → PDA (diastolic runoff widens pulse pressure) — also aortic insufficiency, anaemia, hyperthyroidism.<br>
    <strong>Weak pulse, slow upstroke (pulsus parvus et tardus)</strong> → severe SAS.<br>
    <strong>Weak pulse ± pulsus alternans</strong> → poor contractility (DCM).<br>
    <strong>Pulse deficits</strong> → arrhythmia (auscultate while palpating the femoral pulse).<br>
    Palpate for a <strong>precordial thrill</strong> (grade ≥ V) and assess for jugular distension / pulsation, ascites and oedema (right-sided CHF).`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Heart Murmur — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' STEP 1 — ECHOCARDIOGRAPHY (the definitive test)' },
        {
          kind: 'check',
          html: `<strong>Echo is the gold standard</strong> — it confirms the structural lesion (MMVD prolapse/regurgitation, HCM wall thickness + SAM, DCM dilation + poor FS/EF, congenital defects), quantifies severity, measures chamber size (LA:Ao), and estimates pulmonary artery pressure (TR/PI velocity).<br>
    Doppler maps the regurgitant / stenotic jet to the murmur. Echo is the only way to reliably separate a structural lesion from a functional murmur. (Ettinger Ch 38)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — THORACIC RADIOGRAPHS + VHS' },
        {
          kind: 'check',
          html: `Radiographs assess <strong>cardiac size (vertebral heart score, VHS)</strong>, chamber enlargement (LA enlargement → bronchial compression / cough in dogs), and — crucially — the <strong>lungs</strong> for cardiogenic pulmonary oedema and the vessels for pulmonary over- (L→R shunt) or under-circulation.<br>
    They answer "is this murmur causing CHF <em>now</em>?" better than echo. VHS &gt; breed-specific cut-offs and a rising serial VHS support cardiomegaly.`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — ECG' },
        {
          kind: 'check',
          html: `ECG characterises <strong>rhythm and chamber-enlargement patterns</strong> (tall/wide P or R waves), and detects arrhythmias that accompany structural disease (atrial fibrillation in DCM/MMVD, VPCs in cardiomyopathy/Boxer ARVC). It does not size the heart — pair with imaging.`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — BLOOD PRESSURE & NT-proBNP' },
        {
          kind: 'check',
          html: `<strong>Blood pressure</strong> (Doppler, esp. cats) — systemic hypertension can cause/exacerbate a murmur and drive LV changes; treat if confirmed.<br>
    <strong>NT-proBNP</strong> — especially valuable in <strong>cats</strong>: a point-of-care assay (result &lt;10 min) helps decide whether a murmur reflects clinically relevant cardiac disease and whether echo is warranted; a LOW NT-proBNP makes significant occult cardiomyopathy unlikely, while an elevated value (± cTnI) supports cardiac disease and differentiates cardiac from non-cardiac dyspnoea. (Ettinger Ch 38)`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — TARGETED / WORK-UP-FOR-FUNCTIONAL TESTS' },
        {
          kind: 'check',
          html: `Pursue the <strong>functional</strong> differentials when the murmur is soft, basilar and the patient is otherwise well: <strong>CBC</strong> (anaemia), <strong>total T4</strong> (older cat — hyperthyroidism), <strong>temperature / inflammatory screen</strong> (fever, sepsis), pregnancy.<br>
    A <strong>new / changing murmur + fever</strong> → blood cultures + <em>Bartonella</em> serology/PCR + echo for endocarditis vegetations.`,
        },
        {
          kind: 'callout',
          tone: 'green',
          title: ' WHEN AN INNOCENT MURMUR NEEDS NO FURTHER WORK-UP',
          html: `A <strong>young puppy/kitten</strong> with a <strong>soft (grade ≤ II–III/VI), left-basilar, early-systolic</strong> murmur, normal pulses, normal growth and NO other signs may be reassessed at the next vaccination — innocent murmurs resolve by ~16 weeks. Likewise a soft murmur fully explained by a reversible high-output state (corrected anaemia, fever, hyperthyroidism) needs no cardiac imaging once the cause is treated. <strong>Echo any murmur that is loud (≥ IV/VI), has a thrill, diastolic/continuous timing, or any clinical sign.</strong> (Ettinger Ch 38)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Hypertrophic cardiomyopathy (HCM)', link: { to: 'disease', id: 'DIS-HCM' } },
            { label: 'Dilated cardiomyopathy (DCM)', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Restrictive cardiomyopathy (RCM)', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
            { label: 'Pericardial disease / effusion', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: 'Bartonellosis / infective endocarditis', link: { to: 'disease', id: 'DIS-INFECT-BART' } },
            { label: 'Systemic hypertension', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
            { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: 'Hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • A murmur is a sign, not a diagnosis — grade · timing · PMI narrow it, but echo defines the lesion.<br>
  • Grade does NOT track severity in cats — a quiet (or absent) murmur can hide severe HCM; lean on NT-proBNP + echo.<br>
  • Loud (≥ IV/VI), diastolic, or continuous murmurs are always pathologic — work them up.<br>
  • A bounding pulse points to PDA; pulsus parvus et tardus points to severe SAS.<br>
  • Always ask "is this murmur causing CHF now?" — radiographs (oedema, VHS) answer that better than echo.<br>
  • A genuinely innocent puppy/kitten murmur (soft, basilar, systolic, no other signs) can simply be re-checked — don't over-investigate.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
