// ── Vestibular — diagnostic approach (data) ─────────────────────────────────
// Migration of renderDxVestibular{History,Exam,Dx} (legacy inline render() HTML
// in ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepPair } from './shared/dxHelpers'

export const vestibularDx: DxApproach = {
  title: 'Vestibular',
  tabs: {

  history: {
    title: 'History: Vestibular',
    blocks: [
      { kind: 'branch', text: 'CONFIRM IT IS VESTIBULAR, THEN AGE & ONSET' },
      {
        kind: 'check',
        html: `Owners report a "stroke" — head tilt, falling/rolling to one side, circling, nausea/inappetence, nystagmus. Confirm this is vestibular (loss of balance to one side) rather than generalised weakness or seizure.`,
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
        kind: 'check',
        html: `<strong>Ototoxic drugs:</strong> topical/systemic aminoglycosides, chlorhexidine flushed into a perforated bulla.<br>
      <strong>Ear disease history:</strong> chronic otitis, prior ear surgery/TECA, head shaking.<br>
      <strong>Hypothyroidism (dog)</strong> can cause peripheral vestibular / facial nerve signs.<br>
      <strong>Systemic illness, pyrexia, multifocal signs</strong> → favour central (encephalitis, neoplasia).`,
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
        kind: 'check',
        html: `Observe before touching — anxiety and restraint can mask or exaggerate findings.<br>
      <strong>Gait:</strong> Rolling/falling direction; ataxia; circling. Note which side the animal falls toward — that is the side of the lesion in most cases.<br>
      <strong>Head tilt:</strong> Note direction. Head tilt toward lesion = peripheral or central; head tilt AWAY from lesion (paradoxical) = cerebellar / caudal peduncle lesion.<br>
      <strong>Nystagmus at rest:</strong> Horizontal, rotary, or vertical? Direction-changing with head position?`,
      },

      { kind: 'step', text: 'STEP 2 — FOUR SIGNS THAT MEAN CENTRAL' },
      {
        kind: 'check',
        html: `Any one of these places the lesion centrally (brainstem/cerebellum):<br>
      1. <strong>Postural (proprioceptive) deficits</strong>, especially unilateral — the most reliable sign of central disease.<br>
      2. <strong>Vertical nystagmus, or nystagmus that changes direction with head position.</strong><br>
      3. <strong>Cranial nerve deficits other than CN VII / Horner</strong> (these two can occur with peripheral disease near the inner ear).<br>
      4. <strong>Decreased level of consciousness.</strong>`,
      },

      { kind: 'step', text: 'STEP 3 — PERIPHERAL vs CENTRAL vs BILATERAL TABLE' },
      {
        kind: 'gridTable',
        cols: '1fr 1.4fr 1.4fr 1.4fr',
        headers: ['', { text: 'Peripheral', tone: 'green' }, { text: 'Central', tone: 'danger' }, { text: 'Bilateral', tone: 'warning' }],
        rows: [
          ['Mentation',           { text: 'Alert / normal', tone: 'green' },                              { text: 'Often depressed / obtunded', tone: 'danger' },                        { text: 'Alert / normal', tone: 'warning' }],
          ['Nystagmus type',      { text: 'Horizontal or rotary only', tone: 'green' },                   { text: 'Any type incl. vertical', tone: 'danger' },                           { text: 'Absent', tone: 'warning' }],
          ['Nystagmus direction', { text: 'Fixed — does not change with head position', tone: 'green' },   { text: 'May be <strong>direction-changing</strong> or disconjugate', tone: 'danger' }, { text: '—', tone: 'warning' }],
          ['CP deficits',         { text: '✗ ABSENT', tone: 'green' },                                    { text: '✓ PRESENT', tone: 'danger' },                                         { text: 'Variable', tone: 'warning' }],
          ['Head tilt',           { text: 'Present (toward lesion)', tone: 'green' },                      { text: 'Present (toward lesion) OR paradoxical', tone: 'danger' },             { text: '✗ ABSENT', tone: 'warning' }],
          ['Other CN deficits',   { text: "± Horner's · ± CN VII only", tone: 'green' },                   { text: 'Multiple CN V–XII', tone: 'danger' },                                 { text: 'Bilateral ventrolateral strabismus', tone: 'warning' }],
          ['VOR',                 { text: 'Intact', tone: 'green' },                                      { text: 'May be impaired', tone: 'danger' },                                   { text: 'Absent bilaterally', tone: 'warning' }],
          ['Gait',                { text: 'Rolling/falling toward lesion; ataxic', tone: 'green' },        { text: 'Ataxia ± hemiparesis', tone: 'danger' },                              { text: 'Wide-based; side-to-side sway; crouching', tone: 'warning' }],
        ],
      },

      { kind: 'step', text: 'STEP 4 — ADDITIONAL EXAM: OTOSCOPY' },
      {
        kind: 'check',
        html: `<strong>Otoscopy both ears:</strong> discharge, erythema, proliferative tissue, polyp in the external canal (young cat). Pain on palpation of the bulla or pinnae.<br>
      <strong>Horner syndrome ipsilateral</strong> (miosis · ptosis · enophthalmos · third eyelid protrusion) — suggests involvement of the postganglionic sympathetic fibres within the middle ear. Supports peripheral disease.<br>
      <strong>CN VII (facial nerve) deficit ipsilateral</strong> — drooping lip/ear, absent menace/palpebral, inability to blink. The facial nerve courses through the petrous temporal bone adjacent to the inner ear; ipsilateral CN VII deficit with vestibular signs = strong localisation to the middle/inner ear region.`,
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
      ...stepPair(1, 'MINIMUM DATABASE', `<strong>CBC + biochemistry + urinalysis.</strong> Screen for systemic or metabolic disease and establish anaesthetic safety if imaging is likely.<br>
      <strong>Blood pressure</strong> — hypertension can cause cerebrovascular accident (CVA / stroke).<br>
      <strong>T4 in cats &gt;7 yr</strong> — hyperthyroidism predisposes to hypertensive brain disease.`),
      ...stepPair(2, 'OTOSCOPY + NEUROLOGICAL LOCALISATION', `<strong>Otoscopy both ears</strong> — evidence of otitis media/interna (discharge, pain on bulla palpation, polyp in young cat).<br>
      <strong>Full neurological examination</strong> (see Exam tab): does this patient have any of the four central signs? This single question determines the imaging branch.`),
      ...stepPair(3, 'PERIPHERAL BRANCH — CT or MRI BULLAE', `<strong>Indicated when:</strong> otoscopy abnormal, chronic otitis history, Horner syndrome, or ipsilateral CN VII deficit.<br>
      <strong>CT of bullae</strong> — fluid density within the bulla, bony thickening or lysis, nasopharyngeal polyp (young cat with stertor). CT is faster and widely available for bony disease.<br>
      <strong>MRI bullae</strong> provides superior soft-tissue detail and is preferred when CT is non-diagnostic or soft-tissue extension is suspected.`),
      ...stepPair(4, 'CENTRAL BRANCH — MRI BRAIN + CSF', `<strong>Any central sign</strong> (CP deficits, vertical/positional nystagmus, multiple CN deficits, ↓ consciousness) → MRI brain + CSF analysis under GA.<br>
      <strong>MRI:</strong> identify neoplasia, infarct (stroke — T2/FLAIR wedge lesion), GME/MUO, FIP (periventricular contrast enhancement in cats), thiamine deficiency (symmetric brainstem T2 hyperintensity in cats).<br>
      <strong>CSF:</strong> cell count, differential, protein, cytology ± infectious PCR (Toxoplasma, Neospora, CDV; FIV/FeLV/FCoV in cats).`),
      ...stepPair(5, 'HYPOTHYROIDISM WORKUP (DOG)', `Hypothyroidism can cause peripheral vestibular and/or facial nerve disease in dogs.<br>
      Check <strong>total T4 + free T4 + cTSH</strong> in any dog with peripheral vestibular signs + ipsilateral CN VII deficit, especially middle-aged to older dogs of larger breeds.<br>
      Response to thyroxine supplementation may be slow (weeks to months).`),
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
        html: `<strong>💡 Clinical pearls:</strong> Idiopathic vestibular disease is a diagnosis of exclusion — the patient must be improving within 72 h. Paradoxical vestibular signs (head tilt <em>away</em> from the lesion) localise to the cerebellum or caudal cerebellar peduncle. Approximately one-third of patients with an apparent peripheral presentation are found to have central disease on advanced imaging — maintain a low threshold for MRI.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
