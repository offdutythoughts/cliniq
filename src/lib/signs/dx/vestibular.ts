// ── Vestibular — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxVestibular{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { VEST_LOC_COLS, VEST_LOC_HEADERS, VEST_LOC_ROWS } from '../vestibularLocalisation'

export const vestibularDx: DxApproach = {
  title: 'Vestibular',
  tabs: {

  history: {
    title: 'History: Vestibular',
    blocks: [
      { kind: 'branch', text: 'CONFIRM IT IS VESTIBULAR, THEN AGE & ONSET' },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '0.55fr 1.5fr',
        dividers: true,
        headers: ['', { text: 'What to do with it', tone: 'teal' }],
        rows: [
          ['<strong>Owner says</strong><br><em>"he had a stroke"</em>', { text: 'Head tilt · falling or rolling to one side · tight circling · nausea, inappetence · nystagmus', tone: 'teal' }],
          ['<strong>Confirm first</strong>', { text: 'Loss of balance <strong>to one side</strong> — not generalised weakness, and not a seizure', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        cols: '0.3fr 0.3fr 0.4fr',
        dividers: true,
        headers: ['Onset / pattern', { text: 'Differential', tone: 'teal' }, 'Next step'],
        rows: [
          ['<strong>Peracute</strong> — older dog', { text: '<strong>Idiopathic / geriatric</strong> vestibular', tone: 'teal' }, 'Supportive care; re-examine if not improving at 72 h'],
          ['<strong>Peracute</strong> — young cat', { text: '<strong>Idiopathic feline</strong> vestibular', tone: 'teal' }, 'Exclude otitis media/interna + nasopharyngeal polyp'],
          ['<strong>Chronic</strong> + recurrent otitis', { text: '<strong>Otitis media / interna</strong>', tone: 'teal' }, 'Otoscopy → CT bullae'],
          ['<strong>Drug history</strong> (aminoglycosides, chlorhexidine)', { text: '<strong>Ototoxicity</strong>', tone: 'teal' }, 'Stop drug; supportive care'],
          ['<strong>Multifocal CNS signs</strong> · ↓ mentation', { text: '<strong>Central</strong> (neoplasia / encephalitis / stroke)', tone: 'teal' }, 'MRI brain + CSF analysis'],
        ],
      },
      { kind: 'step', text: '💊 DRUGS, EARS & SYSTEMIC HISTORY' },
      {
        kind: 'gridTable',
        cols: '0.6fr 1.15fr 0.75fr',
        dividers: true,
        headers: ['Ask about', 'Specifics', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Ototoxic drugs</strong>', 'Topical or systemic aminoglycosides · chlorhexidine flushed into a perforated bulla', { text: 'Peripheral — stop the drug', tone: 'green' }],
          ['<strong>Ear disease</strong>', 'Chronic otitis · prior ear surgery or TECA · head shaking', { text: 'Peripheral — middle / inner ear', tone: 'green' }],
          ['<strong>Hypothyroidism</strong> — 🐕', 'Middle-aged to older, larger breeds', { text: 'Peripheral vestibular ± CN VII', tone: 'green' }],
          ['<strong>Systemic illness</strong>', 'Pyrexia · multifocal signs', { text: '<strong>Central</strong> — encephalitis, neoplasia', tone: 'danger' }],
        ],
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Idiopathic vestibular disease is a diagnosis of exclusion — it should be non-progressive and start improving within 72 h. Re-examine if it does not.` },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Vestibular',
    blocks: [
      { kind: 'branch', text: 'STRUCTURED VESTIBULAR EXAMINATION' },

      { kind: 'step', text: 'STEP 1 — HANDS-OFF OBSERVATION' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: 'Observe before touching — anxiety and restraint mask or exaggerate every sign below.',
      },
      // What to look at / what to record / what it means. Prose made the reader
      // hold four rules in their head at once; the fast-phase rule in particular
      // only earns its place if it can be found in one glance.
      {
        kind: 'gridTable',
        gap: 6,
        cols: '0.62fr 0.85fr 1.25fr',
        dividers: true,
        headers: ['Observe', 'Record', { text: 'What it means', tone: 'teal' }],
        rows: [
          ['<strong>Gait</strong>', 'Rolling / falling direction · circling · ataxia', { text: 'Falls and rolls <strong>toward</strong> the lesion in most cases', tone: 'teal' }],
          ['<strong>Head tilt</strong>', 'Which ear is held lower', { text: '<strong>Toward lesion</strong> = peripheral <em>or</em> central<br><strong>Away</strong> = paradoxical → cerebellum / caudal peduncle', tone: 'teal' }],
          ['<strong>Nystagmus</strong><br>1 · is it pathological?', 'Watch the eyes with the head still, then with the head held up, then in dorsal recumbency', { text: 'Only while the head <em>moves</em> = physiological, normal<br>At rest = pathological — <strong>spontaneous</strong> (normal head position) or <strong>positional</strong> (only in certain positions)', tone: 'teal' }],
          ['<strong>Nystagmus</strong><br>2 · jerk or pendular?', '<strong>Jerk</strong> — slow drift, then a quick flick<br><strong>Pendular</strong> — continuous to-and-fro, no fast phase', { text: '<strong>Jerk</strong> = vestibular · characterise it in 3–5 below<br><strong>Pendular</strong> = congenital visual-pathway anomaly (Siamese · Birman · Himalayan · Belgian Shepherd); <strong>not</strong> vestibular', tone: 'teal' }],
          ['<strong>Jerk nystagmus</strong><br>3 · plane', 'Horizontal · rotary · vertical<br>Recheck in each head position — does the plane change?', { text: 'Horizontal or rotary, unchanging = peripheral <em>or</em> central<br>Vertical, or direction-changing with head position = <strong>central</strong>', tone: 'teal' }],
          ['<strong>Jerk nystagmus</strong><br>4 · fast phase', 'Name it by the <strong>flick</strong> — the direction the quick phase beats', { text: 'Slow phase is the pathological one — drifts <strong>toward</strong> the lesion, with the head tilt<br>Fast phase is corrective — beats <strong>away</strong><br>Sides the lesion if peripheral · <strong>unreliable if central</strong> (may beat either way)', tone: 'teal' }],
          ['<strong>Jerk nystagmus</strong><br>5 · rate', 'Beats per minute', { text: '&gt;66/min → peripheral (95% specific · 85% sensitive)', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: 'STEP 2 — FOUR SIGNS THAT MEAN CENTRAL' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: 'Any <strong>one</strong> of these four places the lesion centrally — brainstem or cerebellum.',
      },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '1fr 1fr',
        dividers: true,
        headers: ['Sign', { text: 'Why it counts', tone: 'danger' }],
        rows: [
          ['<strong>1. Postural (proprioceptive) deficits</strong> — especially unilateral', { text: 'The <strong>most reliable</strong> sign of central disease', tone: 'danger' }],
          ['<strong>2. Vertical nystagmus</strong>, or nystagmus that changes direction with head position', { text: 'Peripheral disease never does either', tone: 'danger' }],
          ["<strong>3. Cranial nerve deficits other than CN VII / Horner's</strong>", { text: 'Those two occur with peripheral disease near the inner ear — anything else is central', tone: 'danger' }],
          ['<strong>4. Decreased level of consciousness</strong>', { text: 'Reticular formation involvement in the brainstem', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: 'STEP 3 — PERIPHERAL vs CENTRAL vs BILATERAL TABLE' },
      {
        kind: 'gridTable',
        dividers: true,
        cols: VEST_LOC_COLS,
        headers: VEST_LOC_HEADERS,
        rows: VEST_LOC_ROWS,
      },

      { kind: 'step', text: 'STEP 4 — ADDITIONAL EXAM: OTOSCOPY' },
      {
        kind: 'gridTable',
        cols: '0.95fr 1.25fr',
        dividers: true,
        headers: ['Finding', { text: 'What it means', tone: 'teal' }],
        rows: [
          ['<strong>Otoscopy, both ears</strong><br>discharge · erythema · proliferative tissue · polyp in the canal (young 🐱) · pain on bulla or pinna palpation', { text: 'Middle / inner ear disease — <strong>peripheral</strong>', tone: 'green' }],
          ["<strong>Ipsilateral Horner's</strong><br>miosis · ptosis · enophthalmos · third eyelid protrusion", { text: 'Postganglionic sympathetic fibres running through the middle ear — supports <strong>peripheral</strong>', tone: 'green' }],
          ['<strong>Ipsilateral CN VII deficit</strong><br>drooping lip or ear · absent menace / palpebral · cannot blink', { text: 'The facial nerve runs through the petrous temporal bone beside the inner ear — with vestibular signs this is <strong>strong localisation to the middle / inner ear</strong>', tone: 'green' }],
        ],
      },
    ],
    after: [
      { kind: 'note', style: 'margin-top:10px;', html: `💡 Central can be <strong>ruled IN</strong> but <strong style="color:var(--tone-danger-fg);">not ruled OUT</strong> — a normal-looking peripheral exam does not exclude central disease. Paradoxical vestibular signs (head tilt away from the lesion) localise to the cerebellum/caudal peduncle.` },
      { kind: 'disclaimer' },
    ],
  },

  dx: {
    title: 'Dx: Vestibular — Diagnostics',
    blocks: [
      { kind: 'step', text: 'STEP 1 — MINIMUM DATABASE' },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>CBC + biochemistry + urinalysis</strong>', { text: 'Screen for systemic or metabolic disease, and establish anaesthetic safety if imaging is likely', tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'Hypertension causes cerebrovascular accident (CVA / stroke)', tone: 'teal' }],
          ['<strong>T4</strong> — 🐱 over 7 yr', { text: 'Hyperthyroidism predisposes to hypertensive brain disease', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: 'STEP 2 — OTOSCOPY + NEUROLOGICAL LOCALISATION' },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>Otoscopy, both ears</strong>', { text: 'Otitis media / interna — discharge, pain on bulla palpation, polyp in a young cat', tone: 'teal' }],
          ['<strong>Full neurological exam</strong><br><em>see the Exam tab</em>', { text: 'Any of the <strong>four central signs</strong> — this single question picks the imaging branch below', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: 'STEP 3 — PERIPHERAL BRANCH: CT or MRI BULLAE' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: '<strong>Indicated when:</strong> otoscopy is abnormal · chronic otitis history · Horner syndrome · ipsilateral CN VII deficit.',
      },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '0.5fr 1.25fr 1fr',
        dividers: true,
        headers: ['Modality', { text: 'Shows', tone: 'teal' }, 'Choose it when'],
        rows: [
          ['<strong>CT bullae</strong>', { text: 'Fluid density within the bulla · bony thickening or lysis · nasopharyngeal polyp (young cat with stertor)', tone: 'teal' }, 'Faster and widely available — first choice for bony disease'],
          ['<strong>MRI bullae</strong>', { text: 'Superior soft-tissue detail', tone: 'teal' }, 'CT is non-diagnostic, or soft-tissue extension is suspected'],
        ],
      },

      { kind: 'step', text: 'STEP 4 — CENTRAL BRANCH: MRI BRAIN + CSF' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: '<strong>Any</strong> central sign — CP deficits · vertical or positional nystagmus · multiple CN deficits · ↓ consciousness — sends the patient to MRI brain + CSF analysis under GA.',
      },
      // MRI finding → diagnosis, rather than a list of diseases the scan "may
      // identify": the reader is standing in front of the images, so the finding
      // is the thing they have and the diagnosis is the thing they want.
      {
        kind: 'gridTable',
        gap: 6,
        cols: '1.35fr 1fr',
        dividers: true,
        headers: ['MRI finding', { text: 'Diagnosis', tone: 'teal' }],
        rows: [
          ['T2 / FLAIR <strong>wedge-shaped</strong> lesion', { text: 'Infarct — stroke', tone: 'teal' }],
          ['Mass lesion with contrast enhancement', { text: 'Neoplasia', tone: 'teal' }],
          ['Multifocal / diffuse T2 + FLAIR hyperintensity, irregular margins, variable enhancement', { text: 'GME / MUO', tone: 'teal' }],
          ['<strong>Periventricular</strong> contrast enhancement — 🐱', { text: 'FIP', tone: 'teal' }],
          ['<strong>Symmetric brainstem</strong> T2 hyperintensity — 🐱', { text: 'Thiamine deficiency', tone: 'teal' }],
        ],
      },
      {
        kind: 'note',
        html: '<strong>CSF on every central case:</strong> cell count · differential · protein · cytology ± infectious PCR — Toxoplasma, Neospora, CDV; FIV / FeLV / FCoV in cats.',
      },

      { kind: 'step', text: 'STEP 5 — HYPOTHYROIDISM WORKUP (🐕)' },
      {
        kind: 'gridTable',
        cols: '0.5fr 1.6fr',
        dividers: true,
        headers: ['', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Who</strong>', { text: 'Any dog with peripheral vestibular signs + an ipsilateral CN VII deficit — especially middle-aged to older dogs of larger breeds', tone: 'teal' }],
          ['<strong>Run</strong>', { text: '<strong>Total T4 + free T4 + cTSH</strong>', tone: 'teal' }],
          ['<strong>Expect</strong>', { text: 'Response to thyroxine supplementation may be slow — weeks to months', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'ESCALATION TRIGGERS',
        gap: 10,
        html: `<strong>Skip straight to MRI brain if:</strong><br>
      • Any central sign is present — do not waste time with plain films or CT bullae.<br>
      • Signs are <strong>worsening after 72 h</strong> rather than improving (rules out idiopathic).<br>
      • <strong>Young animal</strong> with no otitis history and no ototoxic drug exposure.<br>
      • <strong>Bilateral vestibular signs</strong> — bilateral idiopathic is rare; central or metabolic cause must be excluded.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `<strong>💡 Clinical pearls:</strong><br>
      • Idiopathic vestibular disease is a <strong>diagnosis of exclusion</strong> — the patient must be improving within 72 h<br>
      • Paradoxical signs (head tilt <em>away</em> from the lesion) localise to the cerebellum or caudal cerebellar peduncle<br>
      • ~⅓ of apparently peripheral presentations have central disease on advanced imaging — keep a low threshold for MRI`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
