// ── Ataxia — diagnostic approach (data) ─────────────────────────────────────
// Migration of renderDxAtaxia{History,Exam,Dx}() (legacy inline render() HTML in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepPair } from './shared/dxHelpers'

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
      {
        kind: 'check',
        html: `<strong>Drug history is critical and asked FIRST:</strong> metronidazole (🐕 >40 mg/kg/day, 🐱 lower threshold from slower clearance), phenytoin, aminoglycosides, and ivermectin (MDR1 breeds) cause reversible cerebellovestibular ataxia — always ask before imaging.<br>
      <strong>Onset:</strong> peracute non-progressive → vascular (cerebellar infarct) / FCE; acute progressive → inflammatory / compressive / toxic; chronic progressive → degenerative / neoplastic.<br>
      <strong>Diet history (🐱 essential):</strong> all-fish, homemade, sulphite-preserved canned food → THIAMINE deficiency (cervical ventroflexion + ataxia + dilated pupils).<br>
      <strong>Vaccination status (🐕 essential):</strong> unvaccinated dog with ataxia + oculonasal discharge + GI signs + hard pad → CDV until proven otherwise (isolate + RT-PCR).`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT & BREED — species-specific clues' },
      {
        kind: 'check',
        html: `<strong>Feline</strong><br>
      <strong>Kitten with non-progressive cerebellar signs from first ambulation</strong> → cerebellar hypoplasia (in utero FPV) — REASSURE.<br>
      <strong>Young cat from multi-cat household, multifocal CNS signs</strong> → neurological FIP — high globulins, low A:G, periventricular MRI lesions.<br>
      <strong>FIV/FeLV+ or immunosuppressed cat with multifocal disease</strong> → Toxoplasma reactivation.<br>
      <strong>Cat of any age, peracute non-progressive vestibular (often summer/outdoor)</strong> → idiopathic feline vestibular.<br><br>
      <strong>Canine</strong><br>
      <strong>Young purebred terrier (JRT/Parson/Fox), progressive cerebellar signs ± myokymia/skin rippling</strong> → spinocerebellar ataxia (SAM — KCNJ10/CAPN1) — breed-specific DNA test.<br>
      <strong>Belgian Malinois / Belgian Shepherd puppy with severe ataxia 4–8 weeks</strong> → SDCA1/SDCA2 (DNA test).<br>
      <strong>Young pup, rigid pelvic-limb hyperextension</strong> → congenital Neospora caninum.<br>
      <strong>Italian Spinone, Coton de Tulear, Norwegian Buhund, Australian Kelpie, Beagle puppy with progressive cerebellar signs</strong> → breed-specific abiotrophy/SCA.<br>
      <strong>Geriatric dog, peracute non-progressive vestibular</strong> → idiopathic vestibular or cerebellar infarct.<br>
      <strong>Chondrodystrophic or large breed, spinal pain</strong> → IVDD / compressive myelopathy.<br>
      <strong>CKCS / Greyhound with peracute ataxia</strong> → ischaemic stroke (predisposed).<br>
      <strong>Alaskan Husky puppy with episodic CNS signs</strong> → Alaskan Husky encephalopathy (SLC19A3 thiamine transporter mutation).`,
      },
      { kind: 'step', text: '📋 ASSOCIATED SIGNS POINT TO THE SYSTEM' },
      {
        kind: 'check',
        html: `<strong>Head tilt / nystagmus / rolling</strong> → vestibular. <strong>Intention tremor / hypermetria, no weakness</strong> → cerebellar.<br>
      <strong>Weakness + knuckling/scuffing</strong> → proprioceptive (spinal). <strong>Seizures / behaviour change / blindness</strong> → forebrain or multifocal disease.<br>
      <strong>🐕 Myoclonus (rhythmic chewing-gum twitch)</strong> → CDV (persists during sleep — pathognomonic).<br>
      <strong>🐕 Myokymia (rippling skin) / neuromyotonia</strong> → KCNJ10 SCA (terrier or Belgian Malinois).<br>
      <strong>🐱 Cervical ventroflexion</strong> → check K⁺, thiamine, myasthenia.<br>
      Ask about toxin access (chocolate, ivermectin, lead, ethylene glycol, pyrethroid in cats), trauma, and systemic illness (PU/PD, weight loss).`,
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
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Cerebellar</strong><br>Hypermetria (dysmetria)<br>Intention tremor · truncal sway<br>Wide-based stance<br><strong>No paresis</strong> · normal mentation`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Vestibular</strong><br>Head tilt · nystagmus<br>Falling / rolling / tight circling<br>± paresis (central)<br>± ↓ mentation (central)`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Proprioceptive</strong><br>Knuckling · crossing over<br>Scuffing toes · delayed CP<br><strong>Paresis present</strong><br>Spinal cord / brainstem`,
          },
        ],
      },
      { kind: 'step', text: '🔍 STEP 2 — KEY DISCRIMINATORS' },
      {
        kind: 'check',
        html: `<strong>Is there paresis?</strong> Cerebellar disease has NONE (it coordinates, not initiates). Proprioceptive ataxia ALWAYS has weakness.<br>
      <strong>Postural reactions</strong> (proprioceptive placing) — deficits localise to spinal cord/brainstem (or central vestibular).<br>
      <strong>Cranial nerves & mentation</strong> — abnormalities indicate brainstem/central disease.<br>
      <strong>Menace response</strong> can be reduced with cerebellar disease (with intact vision and PLR).<br>
      <strong>Cervical ventroflexion</strong> in a cat = neuromuscular weakness (hypokalaemia, thiamine, myasthenia) NOT cerebellar.`,
      },
      { kind: 'step', text: '🧠 STEP 3 — CENTRAL vs PERIPHERAL (if vestibular)' },
      {
        kind: 'check',
        html: `Proprioceptive deficits, vertical/positional nystagmus, multiple CN deficits, or ↓ consciousness = <strong>central</strong>. Otherwise peripheral. (See the Vestibular approach for the full battery.)<br>
    ⚠️ Vertical nystagmus in a patient on metronidazole = drug toxicity until proven otherwise — STOP the drug first.`,
      },
      { kind: 'step', text: '🔬 STEP 4 — MINIMUM HANDS-ON TESTS' },
      {
        kind: 'check',
        html: `<strong>Palpate vertebral column</strong> (occiput to sacrum) for spinal pain — pain differentiates spinal/compressive from central cerebellar or vestibular causes.<br>
      <strong>CK (creatine kinase)</strong> — elevated CK points to myopathy or polymyositis as a mimic for weakness/ataxia.<br>
      <strong>Blood pressure</strong> (all cats, geriatric dogs) — hypertensive encephalopathy and retinal detachment can present as acute CNS signs.<br>
      <strong>Fundoscopy</strong> (especially cats) — hypertensive retinopathy, uveitis/chorioretinitis (Toxoplasma, FIP, fungal), papilloedema.`,
      },
      { kind: 'step', text: 'SPECIES-SPECIFIC EXAM TIPS' },
      {
        kind: 'check',
        html: `<strong>Canine</strong><br>
      <strong>Look for myoclonus</strong> (rhythmic chewing-gum twitch persisting during sleep) — CDV pathognomonic.<br>
      <strong>Look for myokymia / neuromyotonia</strong> (rippling skin, episodes triggered by heat/excitement) — KCNJ10 SCA in terriers/Belgian Malinois.<br>
      <strong>Pup with stiff hyperextended pelvic limbs that cannot be flexed</strong> → congenital Neospora.<br>
      <strong>Hard pad + ocular discharge + cerebellar signs</strong> → CDV.<br><br>
      <strong>Feline</strong><br>
      <strong>Always ophthalmoscopy</strong> — uveitis/chorioretinitis suggests Toxoplasma, FIP, fungal, or hypertensive disease.<br>
      <strong>Always BP</strong> — older hypertensive cat (CKD, hyperthyroid) with acute CNS signs may have hypertensive encephalopathy or stroke.<br>
      <strong>Check menace + pupils + retina BEFORE manipulating</strong> — handling can deteriorate critically ill cats.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Ataxia — Diagnostics',
    blocks: [
      ...stepPair(1, 'MINIMUM DATABASE — ALL ATAXIA', `CBC (leukogram, PCV/TS, platelets). Biochemistry: glucose · iCa · K⁺ · Na⁺ · BUN/Cr · ALP/ALT · globulins/A:G (🐱 FIP screen) · CK (myopathy). Blood pressure — all cats, geriatric dogs. 🐱 FIV/FeLV + T4 (all cats).`),
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
          ['Next imaging', { text: 'MRI brain (cerebellum)', tone: 'teal' }, { text: 'Otoscopy + CT/MRI bullae (periph) / MRI brain + CSF (central)', tone: 'teal' }, { text: 'Spinal rads → CT/MRI spine', tone: 'teal' }],
          ['Key infectious tests', { text: 'CDV PCR (🐕) · FIP globulins (🐱) · Toxoplasma/Neospora', tone: 'teal' }, { text: 'Ear swab · Brucella if chronic', tone: 'teal' }, { text: 'CK · protozoal serology · CSF', tone: 'teal' }],
          ['Key metabolic', { text: 'Thiamine (🐱 fish diet); metronidazole → STOP', tone: 'teal' }, { text: 'Hypothyroid T4 (🐕 CN VII + vestibular)', tone: 'teal' }, { text: 'Spinal CSF protein (polyradiculo)', tone: 'teal' }],
          ['Key hereditary/breed', { text: 'Abiotrophy/SCA → DNA test (breed)', tone: 'teal' }, { text: 'Idiopathic (excl. by elimination)', tone: 'teal' }, { text: 'DM (GSD, older); CCSM (Dobermann)', tone: 'teal' }],
        ],
      },
      ...stepPair(2, 'CEREBELLAR BRANCH — MRI BRAIN + CSF', `MRI brain (focus on cerebellum, brainstem).<br>CSF patterns:<br>
• Mononuclear pleocytosis → MUO/cerebellitis (🐕)<br>
• Periventricular enhancement + high globulins → FIP (🐱)<br>
• Bilateral symmetric brainstem T2/FLAIR → thiamine deficiency<br>
• Cerebellar atrophy + young breed-predisposed animal → abiotrophy/SCA → DNA test<br>
• CDV PCR on CSF if myoclonus / unvaccinated dog`),
      ...stepPair(3, 'VESTIBULAR BRANCH — OTOSCOPY + CT/MRI BULLAE or MRI BRAIN', `• <strong>Peripheral signs</strong> (no CP deficits) → otoscopy + CT bullae (fluid, thickening, lysis, polyp)<br>
• <strong>Central signs</strong> (CP deficits / vertical nystagmus / ↓ mentation) → MRI brain + CSF<br>
• Hypothyroid T4 — dog with vestibular + CN VII palsy<br>
• 🐱 Retroflex pharynx for nasopharyngeal polyp under GA`),
      ...stepPair(4, 'PROPRIOCEPTIVE (SPINAL) BRANCH — SPINAL IMAGING', `• Localise spinal level by neurological exam (see Myelopathy approach for full localisation table)<br>
• Spinal radiographs first → CT for bony IVDD/fracture/lysis → MRI for soft-tissue cord lesions (FCE, ANNPE, neoplasia, DM)<br>
• CK — elevated = polymyositis/myopathy mimic<br>
• Protozoal serology (Toxoplasma/Neospora) — young dog with stiff hyperextended hindlimbs`),
    ],
    after: [
      {
        kind: 'callout',
        tone: 'warning',
        title: 'TREAT ON SUSPICION — WHEN DELAY IS DANGEROUS',
        gap: 10,
        html: `Parenteral thiamine (50–100 mg IV/IM then daily × 3 days) for any cat on fish/homemade diet with cervical ventroflexion + ataxia — do not wait for MRI. Stop metronidazole immediately on first vertical nystagmus presentation. Clindamycin + pyrimethamine started empirically for suspected Neospora in young pup with rigid pelvic limb hyperextension.`,
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
