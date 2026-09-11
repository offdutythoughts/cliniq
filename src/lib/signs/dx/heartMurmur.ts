// ── Heart Murmur — diagnostic approach (data) ────────────────────────────────
// A murmur is a physical sign, not a diagnosis. History narrows pathologic vs
// functional; auscultation characterises grade / timing / PMI / radiation and
// pulse quality; diagnostics (echo definitive, radiographs/VHS, ECG, BP,
// NT-proBNP) define the lesion and decide whether an innocent murmur needs no
// further work-up. Links to the cardiac disease pages (DIS-CARD-*, DIS-HCM).

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const heartMurmurDx: DxApproach = {
  title: 'Heart Murmur',
  tabs: {

    history: {
      title: 'History: Heart Murmur',
      blocks: [
        { kind: 'branch', text: 'GOAL: PATHOLOGIC STRUCTURAL vs FUNCTIONAL / INNOCENT' },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Category', { text: 'Causes', tone: 'teal' }],
          rows: [
            ['<strong>Pathologic structural</strong>', { text: 'Acquired MMVD · HCM · DCM · congenital PDA · SAS · PS · VSD', tone: 'teal' }],
            ['<strong>Functional / innocent</strong>', { text: 'Puppy / kitten innocent murmur · anaemia · fever · hyperthyroidism · high-output states', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `A murmur is turbulent flow — it tells you something is moving fast, not <em>what</em>. <span style="opacity:.7">(Ettinger Ch 38)</span>` },

        ...stepTable(1, 'SIGNALMENT & AGE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Puppy / kitten, soft murmur</strong>', { text: 'Innocent murmur likely — but a <strong>loud</strong> or persisting (beyond ~16 weeks) murmur → congenital disease (PDA · SAS · PS · VSD)', tone: 'teal' }],
            ['<strong>Older small-breed dog</strong>', { text: '<strong>MMVD</strong> — the commonest acquired murmur; left apical systolic', tone: 'teal' }],
            ['<strong>Large / giant breed</strong><br>Doberman · Great Dane · Irish Wolfhound · Boxer', { text: '<strong>DCM</strong> — the murmur is often soft or absent', tone: 'teal' }],
            ['<strong>🐱 Cat of any age</strong>', { text: 'Cardiomyopathy (HCM / RCM), but many feline murmurs are dynamic / physiologic — and <strong>HCM may have no murmur</strong>', tone: 'danger' }],
          ],
        }, '🐾'),

        ...stepTable(2, 'CARDIAC SIGNS & FUNCTIONAL STATUS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Ask about', { text: 'Significance', tone: 'teal' }],
          rows: [
            ['<strong>Exercise intolerance · cough · tachypnoea / dyspnoea · syncope or collapse</strong>', { text: 'Cough in 🐕 reflects LA enlargement compressing the bronchus', tone: 'teal' }],
            ['<strong>Syncope on exertion in a young dog</strong>', { text: '<strong>SAS or PS</strong> until proven otherwise', tone: 'danger' }],
            ['<strong>🐱 Cats do NOT cough from cardiac disease</strong>', { text: 'Feline CHF presents as dyspnoea / tachypnoea, not cough', tone: 'teal' }],
            ['<strong>Resting / sleeping respiratory rate</strong>', { text: 'A rising RR is an early sign of decompensation', tone: 'teal' }],
          ],
        }, '🫀'),

        ...stepTable(3, 'IS THERE A NON-CARDIAC EXPLANATION?', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Screen for', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Anaemia</strong>', { text: 'Pallor · lethargy — HCT &lt;20% 🐕 / &lt;15% 🐱', tone: 'teal' }],
            ['<strong>Fever / sepsis · pregnancy · high sympathetic tone</strong>', { text: 'High-output / hyperdynamic states producing a functional murmur', tone: 'teal' }],
            ['<strong>Hyperthyroidism</strong>', { text: 'Older cat — weight loss · polyphagia · goitre', tone: 'teal' }],
            ['<strong>New or changing murmur + fever, lethargy or shifting lameness</strong>', { text: '<strong>Infective endocarditis</strong> — think <em>Bartonella</em>', tone: 'danger' }],
          ],
        }, '🔍'),
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

        ...stepTable(1, 'GRADE THE MURMUR (Levine I–VI/VI)', {
          cols: '0.5fr 1.6fr',
          dividers: true,
          headers: ['Grade', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>I/VI</strong>', { text: 'Very soft — heard only after intently listening ≥1 min', tone: 'teal' }],
            ['<strong>II/VI</strong>', { text: 'Soft but easily heard', tone: 'teal' }],
            ['<strong>III/VI</strong>', { text: 'Moderate', tone: 'teal' }],
            ['<strong>IV/VI</strong>', { text: 'Loud, NO thrill', tone: 'teal' }],
            ['<strong>V/VI</strong>', { text: 'Loud WITH a palpable precordial thrill', tone: 'teal' }],
            ['<strong>VI/VI</strong>', { text: 'Very loud, thrill, audible with the stethoscope lifted 1 cm off the chest', tone: 'teal' }],
          ],
        }, '📏'),
        { kind: 'note', html: `Grade tracks severity in congenital disease (PS · SAS) and MMVD, but <strong>not</strong> reliably in cats — palpate the precordium for a thrill (≥ grade V). <span style="opacity:.7">(Ettinger Ch 38)</span>` },

        ...stepTable(2, 'TIMING (systolic / diastolic / continuous)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Timing', { text: 'Causes', tone: 'teal' }],
          rows: [
            ['<strong>Systolic</strong><br>between S1 and S2', { text: 'By far the commonest — MMVD · HCM · SAS · PS · VSD · tricuspid insufficiency · functional murmurs', tone: 'teal' }],
            ['<strong>Diastolic</strong><br>after S2', { text: 'Uncommon — aortic insufficiency (endocarditis in adults; SAS / VSD in young dogs) · pulmonic insufficiency', tone: 'teal' }],
            ['<strong>Continuous "machinery"</strong><br>throughout the cycle, peaking near S2', { text: '<strong>PDA</strong> — the diastolic component disappears if pulmonary hypertension develops', tone: 'teal' }],
            ['<strong>Gallop sounds (S3 / S4) · systolic clicks</strong>', { text: 'A gallop in a cat strongly suggests cardiomyopathy', tone: 'teal' }],
          ],
        }, '⏱️'),

        ...stepTable(3, 'PMI & RADIATION (localise the lesion)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['PMI', { text: 'Lesion', tone: 'teal' }],
          rows: [
            ['<strong>Left apex (mitral area), systolic</strong>', { text: 'Mitral insufficiency (MMVD) — may radiate dorsally / to the right', tone: 'teal' }],
            ['<strong>Left base, systolic</strong>', { text: 'Aortic (SAS — <strong>radiates up the carotids / neck</strong>) or pulmonic (PS — does <strong>not</strong> radiate to carotids) outflow', tone: 'teal' }],
            ['<strong>Right cranial thorax, harsh holosystolic</strong>', { text: 'VSD', tone: 'teal' }],
            ['<strong>Right apex</strong>', { text: 'Tricuspid insufficiency', tone: 'teal' }],
            ['<strong>Left craniodorsal base, continuous</strong>', { text: 'PDA', tone: 'teal' }],
            ['<strong>🐱 Apical / sternal systolic</strong>', { text: 'Often dynamic RV / LV outflow obstruction and may be physiologic — PMI is a less reliable localiser <span style="opacity:.7">(Ettinger Ch 38)</span>', tone: 'teal' }],
          ],
        }, '📍'),

        ...stepTable(4, 'PULSE QUALITY & PRECORDIUM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Hyperkinetic / bounding ("waterhammer") pulse</strong>', { text: '<strong>PDA</strong> — diastolic runoff widens pulse pressure; also aortic insufficiency · anaemia · hyperthyroidism', tone: 'teal' }],
            ['<strong>Weak pulse, slow upstroke</strong> (pulsus parvus et tardus)', { text: 'Severe <strong>SAS</strong>', tone: 'teal' }],
            ['<strong>Weak pulse ± pulsus alternans</strong>', { text: 'Poor contractility — DCM', tone: 'teal' }],
            ['<strong>Pulse deficits</strong>', { text: 'Arrhythmia — auscultate while palpating the femoral pulse', tone: 'teal' }],
            ['<strong>Precordial thrill</strong>', { text: 'Grade ≥ V', tone: 'teal' }],
            ['<strong>Jugular distension / pulsation · ascites · oedema</strong>', { text: 'Right-sided CHF', tone: 'teal' }],
          ],
        }, '👋'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Heart Murmur — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'teal', text: '🫀 STEP 1 — ECHOCARDIOGRAPHY (the definitive test)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['What echo delivers', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Confirms the structural lesion</strong>', { text: 'MMVD prolapse / regurgitation · HCM wall thickness + SAM · DCM dilation + poor FS/EF · congenital defects', tone: 'teal' }],
            ['<strong>Quantifies severity</strong>', { text: 'Chamber size (LA:Ao) · estimated pulmonary artery pressure (TR / PI velocity)', tone: 'teal' }],
            ['<strong>Doppler</strong>', { text: 'Maps the regurgitant / stenotic jet to the murmur', tone: 'teal' }],
            ['<strong>Why it is definitive</strong>', { text: 'The only way to reliably separate a structural lesion from a functional murmur <span style="opacity:.7">(Ettinger Ch 38)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'THORACIC RADIOGRAPHS + VHS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Cardiac size (vertebral heart score, VHS)</strong>', { text: 'VHS above breed-specific cut-offs and a rising serial VHS support cardiomegaly', tone: 'teal' }],
            ['<strong>Chamber enlargement</strong>', { text: 'LA enlargement → bronchial compression / cough in dogs', tone: 'teal' }],
            ['<strong>Lungs</strong>', { text: 'Cardiogenic pulmonary oedema', tone: 'teal' }],
            ['<strong>Vessels</strong>', { text: 'Pulmonary over-circulation (L→R shunt) or under-circulation', tone: 'teal' }],
          ],
        }, '📊'),
        { kind: 'note', html: `Radiographs answer "is this murmur causing CHF <em>now</em>?" better than echo.` },

        ...stepTable(3, 'ECG', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['What it shows', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Rhythm and chamber-enlargement patterns</strong>', { text: 'Tall / wide P or R waves', tone: 'teal' }],
            ['<strong>Arrhythmias accompanying structural disease</strong>', { text: 'Atrial fibrillation in DCM / MMVD · VPCs in cardiomyopathy / Boxer ARVC', tone: 'teal' }],
            ['<strong>Limitation</strong>', { text: 'It does not size the heart — pair with imaging', tone: 'teal' }],
          ],
        }, '📈'),

        ...stepTable(4, 'BLOOD PRESSURE & NT-proBNP', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Blood pressure</strong> (Doppler, especially 🐱)', { text: 'Systemic hypertension can cause or exacerbate a murmur and drive LV changes — treat if confirmed', tone: 'teal' }],
            ['<strong>NT-proBNP</strong>', { text: 'Especially valuable in <strong>cats</strong> — a point-of-care assay (result &lt;10 min) helps decide whether a murmur reflects clinically relevant cardiac disease and whether echo is warranted', tone: 'teal' }],
            ['<strong>Low NT-proBNP</strong>', { text: 'Makes significant occult cardiomyopathy unlikely', tone: 'teal' }],
            ['<strong>Elevated NT-proBNP (± cTnI)</strong>', { text: 'Supports cardiac disease and differentiates cardiac from non-cardiac dyspnoea <span style="opacity:.7">(Ettinger Ch 38)</span>', tone: 'teal' }],
          ],
        }, '🩸'),

        ...stepTable(5, 'TARGETED / WORK-UP-FOR-FUNCTIONAL TESTS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Indication', tone: 'teal' }],
          rows: [
            ['<strong>CBC</strong>', { text: 'Anaemia', tone: 'teal' }],
            ['<strong>Total T4</strong>', { text: 'Older cat — hyperthyroidism', tone: 'teal' }],
            ['<strong>Temperature / inflammatory screen · pregnancy</strong>', { text: 'Fever · sepsis · pregnancy', tone: 'teal' }],
            ['<strong>New / changing murmur + fever</strong>', { text: 'Blood cultures + <em>Bartonella</em> serology / PCR + echo for endocarditis vegetations', tone: 'danger' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `Pursue the <strong>functional</strong> differentials when the murmur is soft, basilar and the patient is otherwise well.` },
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
