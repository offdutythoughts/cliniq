// ── Ataxia — diagnostic approach (data) ─────────────────────────────────────
// Migration of renderDxAtaxia{History,Exam,Dx}() (legacy inline render() HTML in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { ATAXIA_COLS, ATAXIA_HEADERS, ATAXIA_ROWS } from '../ataxiaClassification'

export const ataxiaDx: DxApproach = {
  title: 'Ataxia',
  tabs: {

  history: {
    title: 'History: Ataxia',
    blocks: [
      { kind: 'branch', text: 'ONSET, PROGRESSION & DRUG HISTORY' },
      {
        kind: 'gridTable',
        cols: '0.22fr 0.42fr 0.36fr',
        dividers: true,
        headers: ['Ataxia type', 'Key clues in history', { text: 'First priority', tone: 'teal' }],
        rows: [
          ['<strong>Cerebellar</strong>', 'Intention tremor, hypermetria, no weakness; breed history', { text: 'Drug / diet first (metronidazole, thiamine)', tone: 'teal' }],
          ['<strong>Vestibular</strong>', 'Head tilt, nystagmus, rolling, onset in older dog', { text: 'Age, ear history, ototoxic drugs', tone: 'teal' }],
          ['<strong>Proprioceptive (spinal)</strong>', 'Knuckling, scuffing, paresis; chondrodystrophic breed', { text: 'Spinal pain? Onset speed?', tone: 'teal' }],
          ['<strong>Multifocal</strong>', 'Combines signs from multiple systems; systemic illness', { text: 'Vaccination status, travel (CDV, Toxoplasma)', tone: 'teal' }],
        ],
      },
      // Three questions that change the differential before any imaging, and
      // each is a reversible or treatable diagnosis if the answer is yes — so
      // they are a checklist, not a paragraph.
      {
        kind: 'gridTable',
        label: 'Ask these three FIRST — before any imaging',
        cols: '0.5fr 1.15fr 1.05fr',
        dividers: true,
        headers: ['Ask', 'Detail', { text: 'If yes', tone: 'danger' }],
        rows: [
          ['<strong>Drugs</strong>', 'Metronidazole (🐕 &gt;40 mg/kg/day · 🐱 lower threshold, slower clearance) · phenytoin · aminoglycosides · ivermectin (MDR1 breeds)', { text: '<strong>Reversible</strong> cerebellovestibular ataxia — stop the drug', tone: 'danger' }],
          ['<strong>Diet</strong> — 🐱', 'All-fish · homemade · sulphite-preserved canned food', { text: '<strong>Thiamine deficiency</strong> — cervical ventroflexion + ataxia + dilated pupils', tone: 'danger' }],
          ['<strong>Vaccination</strong> — 🐕', 'Unvaccinated + oculonasal discharge + GI signs + hard pad', { text: '<strong>CDV</strong> until proven otherwise — isolate + RT-PCR', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Onset tells you the mechanism',
        gap: 6,
        cols: '0.62fr 1.4fr',
        dividers: true,
        headers: ['Onset', { text: 'Mechanism', tone: 'teal' }],
        rows: [
          ['<strong>Peracute</strong>, non-progressive', { text: 'Vascular — cerebellar infarct · FCE', tone: 'teal' }],
          ['<strong>Acute</strong>, progressive', { text: 'Inflammatory · compressive · toxic', tone: 'teal' }],
          ['<strong>Chronic</strong>, progressive', { text: 'Degenerative · neoplastic', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '🐾 SIGNALMENT & BREED — species-specific clues' },
      // Signalment → diagnosis is a pure lookup: the reader arrives knowing the
      // patient in front of them and scans the left column for the match.
      {
        kind: 'gridTable',
        cols: '1.1fr 1fr',
        dividers: true,
        headers: ['Patient in front of you', { text: 'Think', tone: 'teal' }],
        rows: [
          { section: 'Feline' },
          ['Kitten, non-progressive cerebellar signs from first ambulation', { text: 'Cerebellar hypoplasia (in utero FPV) — <strong>reassure</strong>', tone: 'teal' }],
          ['Young cat, multi-cat household, multifocal CNS signs', { text: 'Neurological FIP — high globulins, low A:G, periventricular MRI lesions', tone: 'teal' }],
          ['FIV / FeLV+ or immunosuppressed, multifocal disease', { text: 'Toxoplasma reactivation', tone: 'teal' }],
          ['Any age, peracute non-progressive vestibular (often summer / outdoor)', { text: 'Idiopathic feline vestibular', tone: 'teal' }],
          { section: 'Canine' },
          ['Young purebred terrier (JRT / Parson / Fox), progressive cerebellar signs ± myokymia or skin rippling', { text: 'Spinocerebellar ataxia (SAM — KCNJ10 / CAPN1) — breed-specific DNA test', tone: 'teal' }],
          ['Belgian Malinois / Belgian Shepherd puppy, severe ataxia at 4–8 weeks', { text: 'SDCA1 / SDCA2 — DNA test', tone: 'teal' }],
          ['Young pup, rigid pelvic-limb hyperextension', { text: 'Congenital <em>Neospora caninum</em>', tone: 'teal' }],
          ['Italian Spinone · Coton de Tulear · Norwegian Buhund · Australian Kelpie · Beagle puppy, progressive cerebellar signs', { text: 'Breed-specific abiotrophy / SCA', tone: 'teal' }],
          ['Geriatric dog, peracute non-progressive vestibular', { text: 'Idiopathic vestibular or cerebellar infarct', tone: 'teal' }],
          ['Chondrodystrophic or large breed, spinal pain', { text: 'IVDD / compressive myelopathy', tone: 'teal' }],
          ['CKCS / Greyhound, peracute ataxia', { text: 'Ischaemic stroke — both breeds predisposed', tone: 'teal' }],
          ['Alaskan Husky puppy, episodic CNS signs', { text: 'Alaskan Husky encephalopathy (SLC19A3 thiamine transporter mutation)', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: '📋 ASSOCIATED SIGNS POINT TO THE SYSTEM' },
      {
        kind: 'gridTable',
        cols: '1.05fr 1fr',
        dividers: true,
        headers: ['Associated sign', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['Head tilt · nystagmus · rolling', { text: '<strong>Vestibular</strong>', tone: 'teal' }],
          ['Intention tremor · hypermetria, <strong>no weakness</strong>', { text: '<strong>Cerebellar</strong>', tone: 'teal' }],
          ['Weakness + knuckling / scuffing', { text: '<strong>Proprioceptive</strong> — spinal', tone: 'teal' }],
          ['Seizures · behaviour change · blindness', { text: '<strong>Forebrain</strong> or multifocal disease', tone: 'teal' }],
          ['🐕 Myoclonus — rhythmic chewing-gum twitch', { text: '<strong>CDV</strong> — persists during sleep, pathognomonic', tone: 'danger' }],
          ['🐕 Myokymia (rippling skin) / neuromyotonia', { text: 'KCNJ10 SCA — terrier or Belgian Malinois', tone: 'teal' }],
          ['🐱 Cervical ventroflexion', { text: 'Check K⁺, thiamine, myasthenia — <strong>not</strong> cerebellar', tone: 'danger' }],
        ],
      },
      {
        kind: 'note',
        html: 'Also ask about <strong>toxin access</strong> (chocolate · ivermectin · lead · ethylene glycol · pyrethroid in cats), <strong>trauma</strong>, and <strong>systemic illness</strong> (PU/PD, weight loss).',
      },
    ],
    after: [
      {
        kind: 'note',
        style: 'margin-top:10px;',
        html: `💡 Classify the ataxia type first (cerebellar vs vestibular vs proprioceptive) — it dictates which imaging and tests come next. Drug, diet, and vaccination history change the differential dramatically.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Ataxia',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — WATCH THE GAIT, CLASSIFY THE TYPE' },
      // The SAME rows the Clinical flow page renders, from
      // ../ataxiaClassification — one grid, two pages.
      {
        kind: 'gridTable',
        dividers: true,
        cols: ATAXIA_COLS,
        headers: ATAXIA_HEADERS,
        rows: ATAXIA_ROWS,
      },
      { kind: 'step', text: '🔍 STEP 2 — KEY DISCRIMINATORS' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1.4fr',
        dividers: true,
        headers: ['Ask', { text: 'What the answer tells you', tone: 'teal' }],
        rows: [
          ['<strong>Is there paresis?</strong>', { text: 'Cerebellar disease has <strong>NONE</strong> — it coordinates movement, it does not initiate it. Proprioceptive ataxia <strong>ALWAYS</strong> has weakness', tone: 'teal' }],
          ['<strong>Postural reactions</strong><br>proprioceptive placing', { text: 'Deficits localise to spinal cord / brainstem — or central vestibular', tone: 'teal' }],
          ['<strong>Cranial nerves &amp; mentation</strong>', { text: 'Any abnormality indicates brainstem / central disease', tone: 'teal' }],
          ['<strong>Menace response</strong>', { text: 'Can be reduced by cerebellar disease <em>with intact vision and PLR</em>', tone: 'teal' }],
          ['<strong>Cervical ventroflexion</strong> — 🐱', { text: 'Neuromuscular weakness (hypokalaemia · thiamine · myasthenia) — <strong>NOT</strong> cerebellar', tone: 'danger' }],
        ],
      },
      { kind: 'step', text: '🧠 STEP 3 — CENTRAL vs PERIPHERAL (if vestibular)' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1.4fr',
        dividers: true,
        headers: ['Question', { text: 'Answer', tone: 'teal' }],
        rows: [
          ['<strong>Central or peripheral?</strong>', { text: 'CP deficits · vertical or positional nystagmus · multiple CN deficits · ↓ consciousness = <strong>central</strong>. Otherwise peripheral — see the Vestibular approach for the full battery', tone: 'teal' }],
          ['<strong>Which side?</strong>', { text: 'Fast phase beats <strong>away</strong> from the lesion, slow phase drifts toward it with the head tilt — reliable only if peripheral', tone: 'teal' }],
          ['<strong>⚠️ On metronidazole?</strong>', { text: 'Vertical nystagmus in a patient on metronidazole is <strong>drug toxicity until proven otherwise</strong> — stop the drug first', tone: 'danger' }],
        ],
      },
      { kind: 'step', text: '🔬 STEP 4 — MINIMUM HANDS-ON TESTS' },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Why', tone: 'teal' }],
        rows: [
          ['<strong>Palpate the vertebral column</strong><br>occiput to sacrum', { text: 'Spinal pain separates spinal / compressive causes from central cerebellar or vestibular disease', tone: 'teal' }],
          ['<strong>CK</strong> — creatine kinase', { text: 'Elevated CK points to myopathy or polymyositis mimicking weakness / ataxia', tone: 'teal' }],
          ['<strong>Blood pressure</strong><br>all cats, geriatric dogs', { text: 'Hypertensive encephalopathy and retinal detachment present as acute CNS signs', tone: 'teal' }],
          ['<strong>Fundoscopy</strong><br>especially 🐱', { text: 'Hypertensive retinopathy · uveitis / chorioretinitis (Toxoplasma, FIP, fungal) · papilloedema', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: 'SPECIES-SPECIFIC EXAM TIPS' },
      {
        kind: 'gridTable',
        cols: '1fr 1.1fr',
        dividers: true,
        headers: ['Look for', { text: 'Think', tone: 'teal' }],
        rows: [
          { section: 'Canine' },
          ['<strong>Myoclonus</strong> — rhythmic chewing-gum twitch that <strong>persists during sleep</strong>', { text: 'CDV — pathognomonic', tone: 'teal' }],
          ['<strong>Myokymia / neuromyotonia</strong> — rippling skin, episodes triggered by heat or excitement', { text: 'KCNJ10 SCA — terriers, Belgian Malinois', tone: 'teal' }],
          ['Pup with stiff hyperextended pelvic limbs that cannot be flexed', { text: 'Congenital <em>Neospora</em>', tone: 'teal' }],
          ['Hard pad + ocular discharge + cerebellar signs', { text: 'CDV', tone: 'teal' }],
          { section: 'Feline' },
          ['<strong>Always ophthalmoscopy</strong> — uveitis / chorioretinitis', { text: 'Toxoplasma · FIP · fungal · hypertensive disease', tone: 'teal' }],
          ['<strong>Always BP</strong> — older hypertensive cat (CKD, hyperthyroid) with acute CNS signs', { text: 'Hypertensive encephalopathy or stroke', tone: 'teal' }],
          ['<strong>Check menace, pupils and retina BEFORE manipulating</strong>', { text: 'Handling can deteriorate a critically ill cat', tone: 'danger' }],
        ],
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Ataxia — Diagnostics',
    blocks: [
      { kind: 'step', text: 'STEP 1 — MINIMUM DATABASE — ALL ATAXIA' },
      {
        kind: 'gridTable',
        cols: '0.62fr 1.5fr',
        dividers: true,
        headers: ['Run', { text: 'Looking for', tone: 'teal' }],
        rows: [
          ['<strong>CBC</strong>', { text: 'Leukogram · PCV/TS · platelets', tone: 'teal' }],
          ['<strong>Biochemistry</strong>', { text: 'Glucose · iCa · K⁺ · Na⁺ · BUN/Cr · ALP/ALT · globulins and A:G (🐱 FIP screen) · CK (myopathy)', tone: 'teal' }],
          ['<strong>Blood pressure</strong>', { text: 'All cats and geriatric dogs', tone: 'teal' }],
          ['<strong>FIV / FeLV + T4</strong>', { text: 'All cats', tone: 'teal' }],
        ],
      },
      { kind: 'branch', text: 'CLASSIFY ATAXIA TYPE → DICTATES NEXT STEP' },
      {
        kind: 'gridTable',
        scroll: true,
        minWidth: 540,
        cols: '1.05fr 1fr 1fr 1fr',
        dividers: true,
        headers: [
          'Finding',
          { text: 'Cerebellar', tone: 'teal' },
          { text: 'Vestibular', tone: 'teal' },
          { text: 'Proprioceptive (spinal)', tone: 'teal' },
        ],
        rows: [
          ['Clinical signs', { text: 'Hypermetria / intention tremor / no paresis', tone: 'teal' }, { text: 'Head tilt / nystagmus / rolling', tone: 'teal' }, { text: 'Knuckling / scuffing / paresis', tone: 'teal' }],
          ['Nystagmus fast phase', { text: 'Usually absent (± positional)', tone: 'teal' }, { text: 'Beats <strong>away</strong> from the lesion if peripheral; either way if central', tone: 'teal' }, { text: 'Absent', tone: 'teal' }],
          ['Next imaging', { text: 'MRI brain (cerebellum)', tone: 'teal' }, { text: 'Otoscopy + CT/MRI bullae (periph) / MRI brain + CSF (central)', tone: 'teal' }, { text: 'Spinal rads → CT/MRI spine', tone: 'teal' }],
          ['Key infectious tests', { text: 'CDV PCR (🐕) · FIP globulins (🐱) · Toxoplasma/Neospora', tone: 'teal' }, { text: 'Ear swab · Brucella if chronic', tone: 'teal' }, { text: 'CK · protozoal serology · CSF', tone: 'teal' }],
          ['Key metabolic', { text: 'Thiamine (🐱 fish diet); metronidazole → STOP', tone: 'teal' }, { text: 'Hypothyroid T4 (🐕 CN VII + vestibular)', tone: 'teal' }, { text: 'Spinal CSF protein (polyradiculo)', tone: 'teal' }],
          ['Key hereditary/breed', { text: 'Abiotrophy/SCA → DNA test (breed)', tone: 'teal' }, { text: 'Idiopathic (excl. by elimination)', tone: 'teal' }, { text: 'DM (GSD, older); CCSM (Dobermann)', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: 'STEP 2 — CEREBELLAR BRANCH: MRI BRAIN + CSF' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: 'MRI brain focused on the <strong>cerebellum and brainstem</strong>, with CSF.',
      },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '1.25fr 1fr',
        dividers: true,
        headers: ['Pattern', { text: 'Diagnosis', tone: 'teal' }],
        rows: [
          ['Mononuclear pleocytosis on CSF', { text: 'MUO / cerebellitis — 🐕', tone: 'teal' }],
          ['Periventricular enhancement + high globulins', { text: 'FIP — 🐱', tone: 'teal' }],
          ['Bilateral symmetric brainstem T2 / FLAIR', { text: 'Thiamine deficiency', tone: 'teal' }],
          ['Cerebellar atrophy in a young breed-predisposed animal', { text: 'Abiotrophy / SCA → breed DNA test', tone: 'teal' }],
          ['Myoclonus, or an unvaccinated dog', { text: 'Run <strong>CDV PCR on CSF</strong>', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: 'STEP 3 — VESTIBULAR BRANCH: OTOSCOPY + CT/MRI BULLAE or MRI BRAIN' },
      {
        kind: 'gridTable',
        cols: '0.95fr 1.25fr',
        dividers: true,
        headers: ['If', { text: 'Do', tone: 'teal' }],
        rows: [
          ['<strong>Peripheral signs</strong> — no CP deficits', { text: 'Otoscopy + CT bullae — fluid, thickening, lysis, polyp', tone: 'green' }],
          ['<strong>Central signs</strong> — CP deficits · vertical nystagmus · ↓ mentation', { text: 'MRI brain + CSF', tone: 'danger' }],
          ['Dog with vestibular signs + CN VII palsy', { text: 'Hypothyroid T4', tone: 'teal' }],
          ['🐱 Young cat, stertor', { text: 'Retroflex the pharynx under GA for a nasopharyngeal polyp', tone: 'teal' }],
        ],
      },
      { kind: 'step', text: 'STEP 4 — PROPRIOCEPTIVE (SPINAL) BRANCH: SPINAL IMAGING' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1.4fr',
        dividers: true,
        headers: ['Step', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>1. Localise</strong>', { text: 'Spinal level by neurological exam — see the Myelopathy approach for the full localisation table', tone: 'teal' }],
          ['<strong>2. Image</strong>', { text: 'Spinal radiographs first → <strong>CT</strong> for bony IVDD, fracture, lysis → <strong>MRI</strong> for soft-tissue cord lesions (FCE, ANNPE, neoplasia, DM)', tone: 'teal' }],
          ['<strong>3. CK</strong>', { text: 'Elevated = polymyositis / myopathy mimic', tone: 'teal' }],
          ['<strong>4. Serology</strong>', { text: 'Protozoal (Toxoplasma / Neospora) in a young dog with stiff hyperextended hindlimbs', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'TREAT ON SUSPICION — WHEN DELAY IS DANGEROUS',
        gap: 10,
        html: `• <strong>Thiamine HCl</strong> — 🐱 50–100 mg/cat <strong>IM or SC</strong> q12h × 3–7 days (<strong>not IV</strong>), then PO — for any cat on a fish or homemade diet with cervical ventroflexion + ataxia. <strong>Do not wait for MRI.</strong><br>
      • <strong>Stop metronidazole</strong> immediately at the first vertical-nystagmus presentation.<br>
      • <strong>Clindamycin + pyrimethamine</strong> empirically for suspected <em>Neospora</em> in a young pup with rigid pelvic-limb hyperextension.`,
      },
      {
        kind: 'alert',
        gap: 8,
        html: `⚠️ <strong>Drug, diet and vaccination history first</strong> — metronidazole, thiamine deficiency (🐱), CDV (🐕) are missed when imaging precedes the conversation. Always classify the ataxia type before choosing imaging.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
