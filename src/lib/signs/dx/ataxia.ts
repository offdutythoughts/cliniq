// ── Ataxia — diagnostic approach (data) ─────────────────────────────────────
// Migration of renderDxAtaxia{History,Exam,Dx}() (legacy inline render() HTML in
// ../../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const ataxiaDx: DxApproach = {
  title: 'Ataxia',
  tabs: {

  history: {
    title: 'History: Ataxia',
    blocks: [
      { kind: 'branch', text: 'ONSET, PROGRESSION & DRUG HISTORY' },
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
        html: `<strong>🐱 Kitten with non-progressive cerebellar signs from first ambulation</strong> → cerebellar hypoplasia (in utero FPV) — REASSURE.<br>
      <strong>🐱 Young cat from multi-cat household, multifocal CNS signs</strong> → neurological FIP — high globulins, low A:G, periventricular MRI lesions.<br>
      <strong>🐱 FIV/FeLV+ or immunosuppressed cat with multifocal disease</strong> → Toxoplasma reactivation.<br>
      <strong>🐕 Young purebred terrier (JRT/Parson/Fox), progressive cerebellar signs ± myokymia/skin rippling</strong> → spinocerebellar ataxia (SAM — KCNJ10/CAPN1) — breed-specific DNA test.<br>
      <strong>🐕 Belgian Malinois / Belgian Shepherd puppy with severe ataxia 4–8 weeks</strong> → SDCA1/SDCA2 (DNA test).<br>
      <strong>🐕 Young pup, rigid pelvic-limb hyperextension</strong> → congenital Neospora caninum.<br>
      <strong>🐕 Italian Spinone, Coton de Tulear, Norwegian Buhund, Australian Kelpie, Beagle puppy with progressive cerebellar signs</strong> → breed-specific abiotrophy/SCA.<br>
      <strong>🐕 Geriatric dog, peracute non-progressive vestibular</strong> → idiopathic vestibular or cerebellar infarct.<br>
      <strong>🐱 Cat of any age, peracute non-progressive vestibular (often summer/outdoor)</strong> → idiopathic feline vestibular.<br>
      <strong>🐕 Chondrodystrophic or large breed, spinal pain</strong> → IVDD / compressive myelopathy.<br>
      <strong>🐕 CKCS / Greyhound with peracute ataxia</strong> → ischaemic stroke (predisposed).<br>
      <strong>🐕 Alaskan Husky puppy with episodic CNS signs</strong> → Alaskan Husky encephalopathy (SLC19A3 thiamine transporter mutation).`,
      },
      { kind: 'step', alt: true, text: '📋 ASSOCIATED SIGNS POINT TO THE SYSTEM' },
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
            style: 'text-align:center;font-size:9px;background:#0D7377;',
            html: `<strong>Vestibular</strong><br>Head tilt · nystagmus<br>Falling / rolling / tight circling<br>± paresis (central)<br>± ↓ mentation (central)`,
          },
          {
            style: 'text-align:center;font-size:9px;',
            html: `<strong>Proprioceptive</strong><br>Knuckling · crossing over<br>Scuffing toes · delayed CP<br><strong>Paresis present</strong><br>Spinal cord / brainstem`,
          },
        ],
      },
      { kind: 'step', alt: true, text: '🔍 STEP 2 — KEY DISCRIMINATORS' },
      {
        kind: 'check',
        html: `<strong>Is there paresis?</strong> Cerebellar disease has NONE (it coordinates, not initiates). Proprioceptive ataxia ALWAYS has weakness.<br>
      <strong>Postural reactions</strong> (proprioceptive placing) — deficits localise to spinal cord/brainstem (or central vestibular).<br>
      <strong>Cranial nerves & mentation</strong> — abnormalities indicate brainstem/central disease.<br>
      <strong>Menace response</strong> can be reduced with cerebellar disease (with intact vision and PLR).<br>
      <strong>Cervical ventroflexion</strong> in a cat = neuromuscular weakness (hypokalaemia, thiamine, myasthenia) NOT cerebellar.`,
      },
      { kind: 'step', alt: true, text: '🧠 STEP 3 — CENTRAL vs PERIPHERAL (if vestibular)' },
      {
        kind: 'check',
        html: `Proprioceptive deficits, vertical/positional nystagmus, multiple CN deficits, or ↓ consciousness = <strong>central</strong>. Otherwise peripheral. (See the Vestibular approach for the full battery.)<br>
    ⚠️ Vertical nystagmus in a patient on metronidazole = drug toxicity until proven otherwise — STOP the drug first.`,
      },
      { kind: 'step', alt: true, text: '🐱 vs 🐕 — SPECIES-SPECIFIC EXAM TIPS' },
      {
        kind: 'check',
        html: `<strong>🐕 Look for myoclonus</strong> (rhythmic chewing-gum twitch persisting during sleep) — CDV pathognomonic.<br>
      <strong>🐕 Look for myokymia / neuromyotonia</strong> (rippling skin, episodes triggered by heat/excitement) — KCNJ10 SCA in terriers/Belgian Malinois.<br>
      <strong>🐕 Pup with stiff hyperextended pelvic limbs that cannot be flexed</strong> → congenital Neospora.<br>
      <strong>🐕 Hard pad + ocular discharge + cerebellar signs</strong> → CDV.<br>
      <strong>🐱 Always ophthalmoscopy</strong> — uveitis/chorioretinitis suggests Toxoplasma, FIP, fungal, or hypertensive disease.<br>
      <strong>🐱 Always BP</strong> — older hypertensive cat (CKD, hyperthyroid) with acute CNS signs may have hypertensive encephalopathy or stroke.<br>
      <strong>🐱 Check menace + pupils + retina BEFORE manipulating</strong> — handling can deteriorate critically ill cats.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Ataxia — Diagnostics',
    blocks: [
      { kind: 'step', text: 'ATAXIA — DIAGNOSTIC APPROACH' },
      { kind: 'step', alt: true, text: 'TIER 1 — MINIMUM DATABASE' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'font-size:9px;',
            html: `<strong>Haematology</strong><br>PCV/TS<br>Leukogram<br>🐱 FIV/FeLV`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>Biochemistry</strong><br>Glucose · Electrolytes<br>BUN/Cr · Liver enzymes<br>CK · Globulins/A:G (🐱 FIP)<br>T4 (🐱)`,
          },
          {
            style: 'font-size:9px;',
            html: `<strong>Blood pressure</strong><br>Hypertension →<br>retinal/CNS damage?<br>🐱 always BP geriatrics`,
          },
        ],
      },
      { kind: 'branch', text: 'BY ATAXIA TYPE' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;"><strong>Cerebellar</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>MRI brain</strong> (cerebellum focus)<br>+ <strong>CSF analysis</strong><br>+ <strong>Infectious panel</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Mononuclear CSF pleocytosis → MUO / cerebellitis (🐕)</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐱 Periventricular enhancement, high globulins → FIP</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐕 Myoclonus + multifocal → CDV PCR</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Bilateral symmetric brainstem T2/FLAIR → THIAMINE deficiency</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Mass lesion → Neoplasia (🐱 meningioma — often resectable)</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Cerebellar atrophy + young breed → Abiotrophy / SCA → DNA test</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Drug history → Metronidazole / phenytoin toxicity</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Vascular territory (DWI) → Cerebellar infarct → hunt cause</div>
      </div>
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;background:#0D7377;"><strong>Vestibular</strong></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Otoscopy + CT/MRI bullae</strong> (peripheral)<br><strong>MRI brain + CSF</strong> (central)<br>🐱 retroflex pharynx (polyp)</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Bulla changes → Otitis media/interna</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐕 No lesion, older dog → Idiopathic</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐱 No lesion any age, often summer/outdoor → Idiopathic</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐱 Nasopharyngeal polyp → retroflex scope</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Brainstem lesion → Central (MUO / neo / CVA / FIP / thiamine)</div>
      </div>
      <div class="dx-col">
        <div style="background:#E8713A;color:#fff;border-radius:10px;padding:8px;text-align:center;width:100%;font-weight:600;font-size:11px;">Proprioceptive</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Spinal radiographs</strong><br><strong>CT / MRI spine</strong><br>(segment based on neuro exam)<br>+ CK + serology (protozoal)</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Compressive → IVDD / fracture / tumour</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Non-compressive → FCE / ANNPE</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">Chronic progressive → Neoplasia / DM</div>
        <div style="height:3px;"></div>
        <div class="dx-dx" style="width:100%;font-size:9px;">🐕 Young pup, stiff hyperextended hindlimbs → Neospora</div>
      </div>
    </div>`,
      },
    ],
    after: [
      {
        kind: 'note',
        style: 'margin-top:10px;',
        html: `💡 <strong>Drug, diet and vaccination history</strong> first — metronidazole, thiamine deficiency (🐱), CDV (🐕) are missed when imaging precedes the conversation.`,
      },
      {
        kind: 'note',
        style: 'margin-top:6px;',
        html: `🚨 <strong>Treat on suspicion when delay is dangerous:</strong> parenteral thiamine for cervical-ventroflexion cat on a fish/homemade diet; stop metronidazole on first vertical-nystagmus presentation; clindamycin started early for suspected Neospora in young pup with stiff pelvic limbs.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
