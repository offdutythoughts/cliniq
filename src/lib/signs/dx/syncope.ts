// ── Syncope — diagnostic approach (data) ─────────────────────────────────────
// Syncope = transient LOC from cerebral hypoperfusion (Ettinger Ch 40). The
// approach: (1) confirm it really IS syncope (not a seizure), (2) rule out the
// cheap metabolic mimics (hypoglycaemia, Addison), then (3) hunt the cardiac
// cause — ECG + ambulatory monitoring (the key test, since arrhythmias are
// intermittent) + echocardiography. Links to the cardiac / metabolic DIS-* pages.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const syncopeDx: DxApproach = {
  title: 'Syncope',
  tabs: {

    history: {
      title: 'History: Syncope',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM SYNCOPE IS CARDIAC OR NON-CARDIOGENIC?' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Syncope</strong>', { text: 'Transient loss of consciousness from cerebral hypoperfusion — BP must fall ~50% and an arrhythmia must last ~10–30 s before unconsciousness results', tone: 'teal' }],
            ['<strong>Pre-syncope</strong>', { text: 'Partial LOC with brief ataxia / stumbling', tone: 'teal' }],
          ],
        },
        {
          kind: 'note',
          html: `<strong>Syncope vs seizure triage:</strong> use the <em>Weakness / Collapse</em> flow first if still unsure — that screen has the full feature comparison table (tone · trigger · recovery · AEDs). This workup assumes syncope is confirmed and focuses on whether the cause is <strong>cardiogenic</strong> (arrhythmia / structural) or <strong>non-cardiogenic</strong> (reflex / metabolic mimic). <span style="opacity:.7">(Ettinger Ch 40)</span>`,
        },

        ...stepTable(1, 'TRIGGER, POSTURE & RECOVERY', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Trigger / feature', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Exertional / excitement-induced collapse</strong>', { text: 'Structural heart disease with limited output (HCM · DCM · pulmonary hypertension · heartworm) or a tachyarrhythmia', tone: 'teal' }],
            ['<strong>Reflex / situational triggers</strong>', { text: 'Vasovagal syncope (young Boxers, triggered by excitement — Bezold–Jarisch reflex) · tussive / situational syncope (coughing · vomiting · sneezing · micturition · defecation · swallowing · visceral pain)', tone: 'teal' }],
            ['<strong>Cough first, then collapse</strong>', { text: 'Tussive syncope — advanced airway / cardiac disease', tone: 'teal' }],
            ['<strong>Colour</strong>', { text: 'Note cyanosis vs pallor', tone: 'teal' }],
            ['<strong>Recovery</strong>', { text: 'Truly <strong>instant</strong> = syncope; slow post-ictal recovery = seizure <span style="opacity:.7">(Ettinger Ch 40)</span>', tone: 'teal' }],
          ],
        }, '⏱️'),

        ...stepTable(2, 'SIGNALMENT, MEDS & SYSTEMIC CLUES', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Clue', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young Boxer</strong>', { text: 'Vasovagal syncope · ARVC', tone: 'teal' }],
            ['<strong>Small-breed dog with a murmur</strong>', { text: 'MMVD ± pulmonary hypertension', tone: 'teal' }],
            ['<strong>Large-breed dog</strong>', { text: 'DCM', tone: 'teal' }],
            ['<strong>🐱 Cat</strong>', { text: 'HCM ± arterial thromboembolism', tone: 'teal' }],
            ['<strong>Episodic weakness with GI signs / waxing–waning illness</strong>', { text: 'Hypoadrenocorticism (Addison)', tone: 'teal' }],
            ['<strong>Fasting / post-exercise weakness · toy or juvenile · possible xylitol exposure</strong>', { text: 'Hypoglycaemia — insulinoma in older dogs', tone: 'teal' }],
            ['<strong>Medications</strong>', { text: 'Sedatives · negative chronotropes / inotropes · vasodilators · diuretics can all precipitate hypotension / bradycardia <span style="opacity:.7">(Ettinger Ch 40)</span>', tone: 'teal' }],
          ],
        }, '🐾'),
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

        ...stepTable(1, 'CARDIAC AUSCULTATION & PULSE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Murmur</strong>', { text: 'MMVD · dynamic LVOT obstruction in feline HCM · congenital outflow obstruction', tone: 'teal' }],
            ['<strong>Gallop</strong>', { text: 'Cardiomyopathy', tone: 'teal' }],
            ['<strong>Muffled heart sounds</strong>', { text: 'Pericardial effusion', tone: 'teal' }],
            ['<strong>Bradycardia</strong>', { text: 'AV block · sick sinus syndrome', tone: 'teal' }],
            ['<strong>Fast / irregular rhythm with pulse deficits</strong>', { text: 'Tachyarrhythmia · AF', tone: 'teal' }],
          ],
        }, '❤️'),
        { kind: 'note', html: `A single in-clinic exam can be entirely normal between episodes.` },

        ...stepTable(2, 'RIGHT-HEART & PERFUSION SIGNS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Jugular distension / pulsation · ascites · weak femoral pulses · pulsus paradoxus</strong>', { text: 'Pericardial effusion / tamponade · right-sided failure', tone: 'teal' }],
            ['<strong>Split or loud S2 · right-apical murmur · exertional cyanosis</strong>', { text: 'Pulmonary hypertension (64% present with syncope in one study) · heartworm disease', tone: 'teal' }],
            ['<strong>Mucous membrane colour + CRT</strong>', { text: 'Pallor (low output / anaemia) vs cyanosis (hypoxaemia) <span style="opacity:.7">(Ettinger Ch 40)</span>', tone: 'teal' }],
          ],
        }, '🫀'),

        ...stepTable(3, 'NEURO, RESP & METABOLIC SCREEN', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Brief neuro exam</strong>', { text: 'Interictal deficits favour a structural / neurological episodic cause rather than syncope', tone: 'teal' }],
            ['<strong>Upper-airway noise</strong><br>stertor / stridor · laryngeal paralysis · BUAS · tracheal collapse', { text: 'Hypoxaemic / tussive collapse rather than cardiogenic syncope', tone: 'teal' }],
            ['<strong>Metabolic mimic clues</strong>', { text: 'Weakness · weight loss · bradycardia · poor perfusion (Addison) · post-exertional disorientation that resolves with feeding (hypoglycaemia)', tone: 'teal' }],
          ],
        }, '🧠'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Syncope — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '🧪 STEP 1 — RULE OUT THE CHEAP METABOLIC MIMICS FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            ['<strong>Blood glucose</strong>', { text: 'Hypoglycaemia — insulinoma · xylitol · juvenile / toy · sepsis', tone: 'teal' }],
            ['<strong>Serum electrolytes</strong>', { text: 'Na⁺ / K⁺ — a low Na:K ratio suggests hypoadrenocorticism', tone: 'teal' }],
            ['<strong>CBC + serum biochemistry</strong>', { text: 'Anaemia · organ disease', tone: 'teal' }],
            ['<strong>Thyroid status</strong>', { text: 'Check in every case', tone: 'teal' }],
            ['<strong>ACTH stimulation test</strong>', { text: 'If Addison is suspected', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `These are quick, inexpensive and treatable — don't miss them. <span style="opacity:.7">(Ettinger Ch 40)</span>` },

        ...stepTable(2, 'ECG + AMBULATORY MONITORING (the key test)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Resting ECG</strong>', { text: '<strong>Always indicated</strong>, but a normal resting ECG does <strong>NOT</strong> exclude an intermittent arrhythmia — arrhythmias are paroxysmal, so the diagnostic yield of a snapshot is low', tone: 'danger' }],
            ['<strong>Holter</strong>', { text: 'Continuous recording for 24 or 48 h; quantifies rhythm but may miss infrequent events — syncope often needs 5–7 days of monitoring', tone: 'teal' }],
            ['<strong>External cardiac event recorder</strong>', { text: 'Owner-activated · battery life ~5–7 days · <strong>75.5%</strong> success rate in correlating rhythm with an episode', tone: 'teal' }],
            ['<strong>Implantable loop recorder (ILR)</strong>', { text: 'Diagnostic yield <strong>48–58%</strong> (up to 66%) in dogs with intermittent weakness / syncope — reserved for rare events', tone: 'teal' }],
          ],
        }, '📈'),
        { kind: 'note', html: `The goal is <strong>symptom–rhythm correlation</strong>: capture the heart rhythm <em>during</em> a spontaneous episode. <span style="opacity:.7">(Ettinger Ch 40)</span>` },

        ...stepTable(3, 'ECHOCARDIOGRAPHY + THORACIC IMAGING', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Echocardiography</strong> — nearly always indicated', { text: 'Structural disease (HCM · DCM · RCM · MMVD) · dynamic LVOT obstruction · pericardial effusion / tamponade · estimated pulmonary artery pressure (pulmonary hypertension)', tone: 'teal' }],
            ['<strong>Thoracic radiographs</strong>', { text: 'Cardiomegaly · congestion · pulmonary patterns · screening for heartworm and airway disease as a tussive-syncope substrate', tone: 'teal' }],
            ['<strong>Heartworm antigen / microfilaria testing</strong>', { text: 'Where endemic <span style="opacity:.7">(Ettinger Ch 40)</span>', tone: 'teal' }],
          ],
        }, '🫁'),

        ...stepTable(4, 'BP, BIOMARKERS & ADJUNCTS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Blood pressure</strong> (Doppler / oscillometric)', { text: 'Hypotension supports a haemodynamic mechanism; severe hypertension exacerbates rather than causes syncope', tone: 'teal' }],
            ['<strong>NT-proBNP</strong>', { text: 'Supports the presence of significant cardiac disease — helps decide whether to pursue echo', tone: 'teal' }],
            ['<strong>Cardiac troponin I (cTnI)</strong>', { text: 'Sensitivity 75% / specificity 80% for cardiogenic syncope vs epileptic seizures, but with significant overlap and <strong>low discriminatory value in the individual</strong> — supportive only', tone: 'teal' }],
            ['<strong>Still unexplained + neurological cause suspected</strong>', { text: 'Pursue the seizure work-up — see the Weakness / Collapse approach <span style="opacity:.7">(Ettinger Ch 40)</span>', tone: 'teal' }],
          ],
        }, '🩸'),
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
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
