// ── Anisocoria / Abnormal Pupil — diagnostic approach (data) ────────────────
// Migration of abnormalPupilDx{History,Exam,Dx}Html (legacy HTML consts in
// ../abnormalPupil.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const abnormalPupilDx: DxApproach = {
  title: 'Anisocoria / Abnormal Pupil',
  tabs: {

  history: {
    title: 'History: Abnormal Pupil',
    blocks: [
      { kind: 'branch', text: 'CHARACTERISE THE COMPLAINT' },
      // Three complaint types, each with what the owner says and where it sends
      // you — a lookup, so a table rather than three cards the reader must
      // compare by eye.
      {
        kind: 'gridTable',
        cols: '0.8fr 1.25fr 1.15fr',
        dividers: true,
        headers: ['Complaint', 'What the owner describes', { text: 'Where it points', tone: 'teal' }],
        rows: [
          [
            '<strong>👁️ Visible pupil change</strong>',
            'Anisocoria · dyscoria · a persistently large or small pupil; owner notices asymmetry or a fixed pupil',
            { text: 'Iris / lens, or EFFERENT arm (CN III · sympathetic) — vision usually preserved', tone: 'teal' },
          ],
          [
            '<strong>👀 Vision change</strong>',
            'Bumping into objects · hesitant in new places · sudden vs gradual onset',
            { text: 'AFFERENT arm — retina, optic nerve or cortex; usually the chief complaint', tone: 'teal' },
          ],
          [
            '<strong>🧠 Systemic / neuro signs</strong>',
            'Mentation change · ataxia · CN deficits · megaoesophagus · PU/PD · autonomic signs',
            { text: 'Central or systemic — intracranial disease, dysautonomia, SARDS / HAC', tone: 'teal' },
          ],
        ],
      },
      { kind: 'step', text: '📋 ONSET, DURATION, PROGRESSION' },
      // Tempo is the single most discriminating history question here, and it
      // maps one-to-one onto a differential list + a first move — a table, not
      // four run-on sentences.
      {
        kind: 'gridTable',
        cols: '0.62fr 1.5fr 0.95fr',
        dividers: true,
        headers: ['Tempo', 'Differentials', { text: 'First move', tone: 'teal' }],
        rows: [
          [
            { text: '<strong>Peracute</strong><br>min–hours', tone: 'danger' },
            "Acute glaucoma · anterior lens luxation · trauma · CVA · acute uveitis · pharmacological exposure",
            { text: 'IOP + fundus <strong>today</strong> — sight-threatening', tone: 'danger' },
          ],
          [
            { text: '<strong>Acute</strong><br>days', tone: 'warning' },
            "Optic neuritis · MUA · retinal detachment · SARDS · infectious uveitis · idiopathic Horner's (Golden Retriever)",
            { text: 'BP + fundus + chromatic PLR; MRI/CSF if central', tone: 'warning' },
          ],
          [
            { text: '<strong>Subacute</strong><br>weeks', tone: 'violet' },
            "Neoplasia (orbital · intracranial · mediastinal → 2nd-order Horner's) · chronic uveitis · cataract + 2° glaucoma",
            { text: 'Thoracic radiographs + orbital / brain imaging', tone: 'violet' },
          ],
          [
            { text: '<strong>Chronic</strong><br>progressive', tone: 'green' },
            "Senile iris atrophy · PRA · degenerative cataract · uveal cysts (incidental) · chronic Horner's with concurrent OM",
            { text: 'Often benign — confirm vision, IOP and fundus are normal', tone: 'green' },
          ],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Unilateral or bilateral?',
        cols: '0.42fr 1fr 1fr',
        dividers: true,
        headers: ['', { text: '◐ Unilateral', tone: 'info' }, { text: '◉ Bilateral', tone: 'violet' }],
        rows: [
          [
            'Implies',
            { text: 'A <strong>local</strong> cause', tone: 'info' },
            { text: 'A <strong>systemic, central or drug</strong> cause', tone: 'violet' },
          ],
          [
            'Think',
            { text: "Horner's · uveitis · glaucoma · trauma · lens luxation · iris atrophy", tone: 'info' },
            { text: 'SARDS · optic neuritis · dysautonomia · central blindness', tone: 'violet' },
          ],
          [
            'Also ask',
            { text: 'Which eye is the abnormal one? (light vs dark room rule)', tone: 'info' },
            { text: 'Any drug? atropine · opioids · ketamine · sympathomimetics', tone: 'violet' },
          ],
        ],
      },
      { kind: 'step', text: '💊 DRUG + EXPOSURE HISTORY' },
      // Agent → pupil → the question that confirms it. Mydriasis is violet and
      // miosis blue throughout the sign (the neuro branch uses the same pair),
      // so the middle column is scannable on its own. The dog/cat opioid split
      // sits on adjacent rows because that is where it is misread.
      {
        kind: 'gridTable',
        cols: '1fr 0.62fr 1.15fr',
        dividers: true,
        headers: ['Agent', 'Pupil', { text: 'Clue / what to ask', tone: 'teal' }],
        rows: [
          { section: 'Drugs → mydriasis' },
          ['Topical <strong>atropine</strong> · tropicamide · phenylephrine · cyclopentolate', { text: 'Mydriasis', tone: 'violet' }, 'Any recent eye exam or drops? Tropicamide wears off in hours, atropine in days'],
          ['Systemic <strong>atropine</strong> (premed) · glycopyrrolate', { text: 'Mydriasis<br>bilateral', tone: 'violet' }, "Check today's anaesthetic record"],
          ['<strong>Opioids</strong> — 🐱 cat', { text: 'Mydriasis<br><em>paradoxical</em>', tone: 'violet' }, 'The opposite of the dog — see the miosis block below'],
          ['Ketamine · amphetamines · cocaine', { text: 'Mydriasis', tone: 'violet' }, 'Dissociative / sympathomimetic'],
          ['Tricyclic antidepressants · antihistamines', { text: 'Mydriasis', tone: 'violet' }, "Anticholinergic — ask what is in the owner's medicine cabinet"],
          { section: 'Drugs → miosis' },
          ['<strong>Opioids</strong> — 🐕 dog (morphine · fentanyl)', { text: 'Miosis', tone: 'info' }, 'Species-split: the same drugs dilate the cat'],
          ['Topical pilocarpine · demecarium', { text: 'Miosis', tone: 'info' }, 'Glaucoma / KCS therapy — ask before calling it Horner\'s'],
          ['Latanoprost', { text: 'Miosis<br>+ ↓ IOP', tone: 'info' }, 'Prostaglandin analogue — ineffective in cats (no FP receptors)'],
          { section: 'Toxins' },
          ['Jimson weed / <em>Datura</em> (atropine)', { text: 'Mydriasis', tone: 'violet' }, 'Outdoor or rural plant access'],
          ['Organophosphates · carbamates', { text: 'Miosis', tone: 'info' }, '<strong>SLUDGE</strong> — salivation · lacrimation · urination · defecation · GI upset · emesis'],
          ['Strychnine', { text: 'Mydriasis', tone: 'violet' }, 'Tonic convulsions · opisthotonus · hypersensitive to touch and sound'],
          ['Lilies — 🐱', { text: 'No pupil sign', dim: true }, 'Causes AKI, not pupillary change — do not pin anisocoria on it'],
          { section: 'Trauma' },
          ['Head trauma', { text: 'Ipsilateral mydriasis', tone: 'danger' }, 'CN III compression or intracranial bleed — <strong>neurosurgical emergency</strong>'],
        ],
      },
      { kind: 'step', text: '🩺 SYSTEMIC / GENERAL HISTORY' },
      // Each row is a cluster the owner reports, the diagnosis it names, and the
      // test that settles it. The two dysautonomia lines of the old prose block
      // are one row — they were the same disease described twice, which is what
      // made the block feel long without adding a finding.
      {
        kind: 'gridTable',
        cols: '1.1fr 1fr 0.8fr',
        dividers: true,
        headers: ['History cluster', { text: 'Points to', tone: 'teal' }, 'Confirm with'],
        rows: [
          [
            'Sudden bilateral blindness + weight gain + PU/PD + polyphagia ± HAC phenotype — 🐕',
            { text: '<strong>SARDS</strong> — the "Cushingoid SARDS" cluster', tone: 'teal' },
            'Chromatic PLR + ERG — fundus normal early',
          ],
          [
            'Diabetic dog, cataract progressing fast — 🐕',
            { text: 'Lens-induced uveitis → posterior synechia → distorted pupil', tone: 'teal' },
            'Slit-lamp: aqueous flare + synechiae · IOP',
          ],
          [
            'FIV / FeLV / FIP positive — 🐱',
            { text: 'Chronic uveitis → posterior synechiae → dyscoria', tone: 'teal' },
            'Retroviral status · full uveitis work-up',
          ],
          [
            'Vomiting · regurgitation · dry mucous membranes · urinary retention ± megaoesophagus',
            { text: "<strong>Dysautonomia</strong> — bilateral mydriasis · ↓ tear production · ± Horner's-like signs · multi-system autonomic failure", tone: 'teal' },
            'STT · thoracic radiographs. 🐕 rural / outdoor, midwest USA endemic',
          ],
          [
            'Seizures · behavioural change · circling · hemiparesis + anisocoria',
            { text: 'Intracranial mass · inflammatory CNS disease · CVA', tone: 'danger' },
            { text: '<strong>MRI + CSF</strong>', tone: 'danger' },
          ],
          [
            'Travel + tick exposure',
            { text: 'Tick-borne uveitis (Ehrlichia · RMSF)', tone: 'teal' },
            'Tick-borne serology / PCR',
          ],
        ],
      },
      { kind: 'step', text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'speciesDiff',
        noArrowAfter: true,
        rows: [
          { feature: 'Normal pupil', dog: '<strong>Round</strong> at every light level.', cat: '<strong>Vertical ellipse / slit</strong> — can appear round in dim light.' },
          { feature: 'Iris atrophy', dog: '<strong>Common</strong> (senile, small breeds) — most often <em>primary</em> degenerative.', cat: '<strong>Uncommon</strong>; secondary (uveitis, glaucoma) &gt; primary. Blue irises predisposed (thinner stroma).' },
          { feature: 'Iris innervation', dog: '<strong>5–8 short ciliary nerves</strong> — denervated pupil = round, fully dilated.', cat: '<strong>Only 2 short ciliary nerves</strong> (malar lateral · nasal medial) — partial denervation = <strong>D-shaped or reverse-D pupil</strong> (hemi-dilation).' },
          { feature: 'Optic neuritis', dog: '<strong>Immune-mediated forms well documented</strong> (MUE/GME/NME) — empiric immunosuppression after ruling out infection is reasonable.', cat: '<strong>No immune-mediated form described</strong> — pursue infection (FIP, toxo, crypto) or neoplasia aggressively; enrofloxacin/fluoroquinolone toxic retinopathy is a key DDx.' },
          { feature: 'Lens luxation — IOP', dog: 'Typically <strong>↑ IOP (often &gt;40)</strong> with anterior luxation.', cat: '<strong>Many cats stay normotensive</strong> despite luxation — a normal IOP does NOT exclude it.' },
          { feature: 'Lens luxation — cause', dog: '<strong>Primary</strong> (ADAMTS17) in terrier breeds; also secondary to uveitis / glaucoma.', cat: 'Primary is <strong>rare</strong>; secondary to chronic uveitis is the commonest cause.' },
          { feature: 'Cataract aetiology', dog: '<strong>Diabetes mellitus is a major cause</strong> (rapid progression, lens-induced uveitis); many inherited breed forms.', cat: '<strong>Chronic uveitis is the commonest cause</strong> — DM cataracts are rare (Russian Blue, Bengal hereditary).' },
          { feature: 'Spastic pupil syndrome', dog: '<strong>Not described.</strong>', cat: '<strong>FeLV-associated</strong> — tonic anisocoria; viral neuritis of short ciliary nerves; D-shape characteristic.' },
          { feature: 'PPMs', dog: '<strong>Common</strong> (27% of dogs with congenital anomalies); many breeds.', cat: '<strong>Rare</strong> (~1.4–2.3%); usually in eyes with other anomalies.' },
          { feature: 'Uveal cysts', dog: '<strong>Transilluminate</strong> — reliably distinguished from melanoma.', cat: 'May be <strong>darkly pigmented and NOT transilluminate</strong> — mimic melanoma; ultrasound needed.' },
          { feature: 'Opioids', dog: '→ <strong>Miosis</strong> (morphine, fentanyl).', cat: '→ <strong>Mydriasis</strong> (paradoxical).' },
          { feature: 'Pilocarpine test', dog: 'Safe at 0.05–2%; may cause conjunctival hyperaemia / blepharospasm.', cat: 'Irritating — <strong>≥1% can cause salivation, vomiting, anorexia, diarrhoea</strong>; use 0.05–0.5% only.' },
          { feature: 'Glaucoma', dog: 'Usually <strong>primary closed-angle</strong> (goniodysgenesis, breed-specific); responds to latanoprost.', cat: 'Usually <strong>secondary</strong> to chronic uveitis / lens luxation; <strong>latanoprost ineffective</strong> (no FP receptors in the feline ciliary body).' },
          { feature: "Horner's", dog: 'Idiopathic 3rd order commonest (<strong>Golden Retriever</strong>; median resolution ~15 weeks).', cat: '<strong>Middle ear disease</strong> commonest cause — screen with otoscopy + CT bullae.' },
          { feature: 'Optic nerve hypoplasia', dog: '<strong>SIX6 mutation in Golden Retriever</strong> (autosomal dominant CEM syndrome); also mini/toy poodle, shih tzu, beagle, borzoi, GSD.', cat: '<strong>Extremely rare</strong>; linked to <strong>griseofulvin (teratogen)</strong> in queens and to feline parvovirus.' },
        ],
      },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Golden Retriever'], tone: 'warning', html: "idiopathic Horner's (3rd order — the commonest breed); pigmentary uveitis (iris cysts → uveitis → 2° glaucoma)." },
          { breeds: ['Jack Russell', 'Tibetan Terrier', 'Border Collie', 'Sealyham', 'Manchester Terrier'], tone: 'danger', html: 'primary anterior lens luxation (ADAMTS17 mutation).' },
          { breeds: ['Cocker', 'Basset', 'Springer', 'Bouvier', 'Chow', 'Akita'], tone: 'green', html: 'primary closed-angle glaucoma → mid-fixed mydriasis.' },
          { breeds: ['Miniature Schnauzer', 'Toy Poodle', 'Cocker'], tone: 'violet', html: 'cataract → lens-induced uveitis → posterior synechiae.' },
          { breeds: ['Miniature Schnauzer', 'Dachshund', 'Brittany'], tone: 'danger', html: 'SARDS — Miniature Schnauzer especially.' },
          { breeds: ['Poodle', 'Shih Tzu', 'Yorkshire Terrier', 'Toy / miniature breeds'], tone: 'warning', html: 'senile iris atrophy — commonest in Poodle, Shih Tzu, Yorkshire Terrier; may appear as early as 4–5 yr.' },
          { breeds: ['Beagle', 'Norwegian Elkhound'], tone: 'green', html: 'PRA.' },
          { breeds: ['Akita', 'Samoyed', 'Husky'], tone: 'warning', html: 'uveodermatologic syndrome → bilateral granulomatous uveitis + periocular depigmentation.' },
          { breeds: ['Any large breed'], group: 'signalment', tone: 'violet', html: "mediastinal mass / brachial plexus tumour → 2nd-order Horner's." },
        ],
        cat: [
          { breeds: ['Burmese'], tone: 'green', html: 'corneal sequestrum → reflex uveitis → miosis; uveal cysts (breed-associated); more susceptible to eyelid agenesis.' },
          { breeds: ['Bengal', 'Domestic Shorthair'], tone: 'warning', html: 'PPMs (iris-to-cornea type) — rare but reported.' },
          { breeds: ['Older cat (any breed)'], group: 'signalment', tone: 'violet', html: 'systemic hypertension → bilateral mydriasis + retinal detachment ± intraocular haemorrhage — <em>check BP FIRST</em>.' },
          { breeds: ['FIV / FeLV positive'], group: 'signalment', tone: 'warning', html: 'chronic uveitis → dyscoria; diffuse iris melanosis (age-related, progressive).' },
          { breeds: ['FeLV positive'], group: 'signalment', tone: 'danger', html: 'spastic pupil syndrome — tonic anisocoria with impaired constriction; one or both eyes.' },
          { breeds: ['Outdoor cat'], group: 'signalment', tone: 'danger', html: "trauma → 2nd / 3rd order Horner's; toxoplasma uveitis; proptosis." },
          { breeds: ['Otitis media'], group: 'signalment', tone: 'info', html: "3rd-order Horner's (postganglionic — middle ear via chorda tympani); ± CN VII deficit." },
          { breeds: ['Multi-cat household / FIP'], group: 'signalment', tone: 'violet', html: 'pyogranulomatous uveitis → miosis · hypopyon · aqueous flare.' },
          { breeds: ['Key-Gaskell (UK / Australia)'], group: 'signalment', tone: 'green', html: 'dysautonomia: bilateral fixed mydriasis + dry mucosae + megaoesophagus.' },
        ],
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        html: `Head trauma + ipsilateral mydriasis = rising ICP / CN III herniation (emergency MRI/decompression) · acute bilateral mydriasis + blindness = optic neuritis or SARDS (urgent workup) · fixed mid-dilated unresponsive pupil = acute glaucoma (refer same day) · anisocoria + altered mentation / CN deficits / hemiparesis = central neurological emergency`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Abnormal Pupil',
    blocks: [
      {
        kind: 'note',
        noArrowAfter: true,
        html: '🐾 <strong>Confirm the species-normal pupil before calling one abnormal</strong> — light level, species and age account for most "abnormal" pupils.',
      },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '0.5fr 1fr 1.2fr',
        dividers: true,
        headers: ['', { text: '🐕 Dog', tone: 'info' }, { text: '🐱 Cat', tone: 'warning' }],
        rows: [
          [
            '<strong>Normal shape</strong>',
            { text: '<strong>Round</strong> at all light levels — any deviation from round is abnormal', tone: 'info' },
            { text: '<strong>Vertical slit / ellipse in bright light → round / oval in dim light.</strong> A round pupil under bright ambient light is normal dilation, not mydriasis — judge only in standardised lighting', tone: 'warning' },
          ],
          [
            '<strong>Iris atrophy</strong>',
            { text: 'Very common in senior small breeds — moth-eaten ragged margin, transillumination defects; masquerades as neurological mydriasis', tone: 'info' },
            { text: 'Uncommon and usually secondary (chronic uveitis, glaucoma); blue irises are thinner and more prone — always retroilluminate before calling it primary degenerative', tone: 'warning' },
          ],
        ],
      },

      { kind: 'step', text: '🩺 STEP 1 — CONFIRM ANISOCORIA + IDENTIFY THE ABNORMAL PUPIL' },
      // The light/dark rule is a two-way comparison, so it reads as two columns —
      // the same violet/blue pair the neurological branch uses for mydriasis and
      // miosis, so the reader carries one colour code across the whole sign.
      {
        kind: 'gridTable',
        label: 'Light vs dark room rule — focal light at arm’s length, both conditions',
        cols: '0.42fr 1fr 1fr',
        dividers: true,
        headers: ['', { text: 'Abnormally LARGE pupil', tone: 'violet' }, { text: 'Abnormally SMALL pupil', tone: 'info' }],
        rows: [
          [
            '<strong>In the dark</strong>',
            { text: 'Anisocoria <strong>LESS</strong> obvious — the normal pupil dilates and the gap narrows', tone: 'violet' },
            { text: 'Anisocoria <strong>MORE</strong> obvious — the normal pupil dilates while the abnormal one stays small', tone: 'info' },
          ],
          [
            '<strong>Lesion</strong>',
            { text: 'Prevents <strong>constriction</strong>', tone: 'violet' },
            { text: 'Prevents <strong>dilation</strong>', tone: 'info' },
          ],
          [
            '<strong>Causes</strong>',
            { text: 'CN III · iris atrophy · pharmacological mydriasis · glaucoma · sympathetic discharge', tone: 'violet' },
            { text: "Horner's (sympathetic denervation) · uveitis · pharmacological miotic · posterior synechiae", tone: 'info' },
          ],
        ],
      },
      {
        kind: 'note',
        html: '• Compare against the <strong>expected</strong> size in normal light too — bilateral fixed mydriasis or miosis is missed when you only compare one pupil with the other.<br>• 🐱 The feline iris sphincter outmuscles the dilator, so miosis from uveitis or pilocarpine is more pronounced than in the dog at equivalent doses.',
      },

      { kind: 'step', text: '🔦 STEP 2 — PLR BATTERY (afferent vs efferent localisation)' },
      {
        kind: 'gridTable',
        cols: '0.6fr 1fr 1fr',
        dividers: true,
        headers: ['Test', 'What you do', { text: 'What it detects', tone: 'teal' }],
        rows: [
          ['<strong>Direct PLR</strong>', 'Light into one eye, watch that same pupil', { text: 'CN II afferent → CN III efferent in that eye', tone: 'teal' }],
          ['<strong>Consensual</strong><br>(indirect) PLR', 'Light into eye A, watch pupil B', { text: 'The crossed optic fibres', tone: 'teal' }],
          ['<strong>Swinging-light</strong>', 'Move the light between the eyes', { text: 'Relative afferent pupillary defect (RAPD) — an eye with retinal / optic-nerve disease <strong>dilates paradoxically</strong> when re-illuminated', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'The 5 classical PLR-lesion patterns',
        scroll: true,
        minWidth: 540,
        cols: '1.25fr 0.7fr 0.7fr 0.95fr 1.25fr',
        dividers: true,
        headers: ['Lesion site', 'Pupil R at rest', 'Pupil L at rest', 'Direct PLR', 'Indirect PLR'],
        rows: [
          ['<strong>1.</strong> Pre-chiasmal (R)', { text: 'Dilated', tone: 'violet' }, 'Normal', 'R: absent', 'R→L: present · L→R: absent'],
          ['<strong>2.</strong> Focal optic tract (R)', 'Normal', 'Normal', { text: 'Both present', tone: 'green' }, { text: 'Both present', tone: 'green' }],
          ['<strong>3.</strong> Chiasmal', { text: 'Dilated', tone: 'violet' }, { text: 'Dilated', tone: 'violet' }, { text: 'Both absent', tone: 'danger' }, { text: 'Both absent', tone: 'danger' }],
          ['<strong>4.</strong> CN III (L)', 'Normal', { text: 'Dilated', tone: 'violet' }, 'R: present · L: absent', 'R→L: absent · L→R: present'],
          ['<strong>5.</strong> Parasympathetic nucleus of CN III (R)', { text: 'Dilated', tone: 'violet' }, 'Normal', 'R: absent · L: present', 'R→L: present · L→R: absent'],
        ],
      },
      {
        kind: 'note',
        html: 'Pre-chiasmal = retina / optic nerve · optic tract → LGN · a CN III lesion also gives ipsilateral <strong>ptosis, lateral strabismus and ophthalmoparesis</strong>, which is what separates it from pattern 5.',
      },

      { kind: 'step', text: '💡 STEP 3 — DAZZLE + MENACE (separate vision from PLR)' },
      {
        kind: 'gridTable',
        cols: '0.45fr 1fr 1.15fr',
        dividers: true,
        headers: ['Reflex', 'Pathway', { text: 'What it tells you', tone: 'teal' }],
        rows: [
          ['<strong>Dazzle</strong>', 'Subcortical — CN II → colliculus → CN VII', { text: 'Present even in a cortically blind animal. Absent = retina / optic nerve / midbrain', tone: 'teal' }],
          ['<strong>Menace</strong>', 'Cortical — CN II → cortex → CN VII', { text: 'Tests the vision pathway. Not developed until <strong>10–12 weeks</strong> of age', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Read menace, dazzle and PLR together',
        cols: '0.5fr 0.5fr 0.85fr 1.5fr',
        dividers: true,
        headers: ['Menace', 'Dazzle', 'PLR', { text: 'Localisation', tone: 'teal' }],
        rows: [
          [{ text: 'Absent', tone: 'danger' }, { text: 'Intact', tone: 'green' }, { text: 'Intact', tone: 'green' }, { text: '<strong>Cortical blindness</strong> — forebrain (MUA · neoplasia · hepatic or hypertensive encephalopathy)', tone: 'teal' }],
          [{ text: 'Absent', tone: 'danger' }, { text: 'Intact', tone: 'green' }, { text: 'Absent in the affected eye', tone: 'danger' }, { text: '<strong>Optic nerve / chiasmal lesion</strong>', tone: 'teal' }],
          [{ text: 'Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }, { text: '<strong>Retinal disease</strong> — SARDS · retinal detachment · end-stage PRA — or a pre-geniculate lesion', tone: 'teal' }],
          [{ text: 'Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }, { text: 'Present with <strong>BLUE light only</strong>', tone: 'warning' }, { text: '<strong>SARDS</strong> — intrinsically photosensitive retinal ganglion cells are preserved', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '👁️ STEP 4 — SLIT-LAMP / FOCAL LIGHT — PUPIL SHAPE + IRIS' },
      {
        kind: 'gridTable',
        cols: '1fr 1.15fr',
        dividers: true,
        headers: ['Finding', { text: 'Most likely', tone: 'teal' }],
        rows: [
          ['Dyscoria — D-shape or irregular pupil', { text: 'Posterior synechiae · iris atrophy · congenital · iris coloboma', tone: 'warning' }],
          ['Ragged margin that transilluminates', { text: 'Senile iris atrophy — mistaken for true mydriasis', tone: 'info' }],
          ['Iris-to-iris · iris-to-lens · iris-to-cornea strand', { text: 'Persistent pupillary membranes (PPMs)', tone: 'violet' }],
          ['Round free-floating pigmented sphere in the AC', { text: 'Uveal cyst — transilluminates · benign · Golden Retriever', tone: 'green' }],
          ['Solid pigmented iris mass', { text: 'Iris melanoma · diffuse iris melanoma (🐱)', tone: 'danger' }],
          ['Posterior synechiae adherent to the lens', { text: 'Chronic uveitis — 2° glaucoma risk if 360°', tone: 'danger' }],
          ['Aqueous flare + miosis + ↓ IOP', { text: 'Anterior uveitis', tone: 'danger' }],
          ['Mid-fixed mydriasis + corneal oedema + ↑ IOP', { text: 'Acute glaucoma', tone: 'danger' }],
          ['Lens visible in the AC / aphakic crescent', { text: 'Anterior lens luxation', tone: 'danger' }],
          ['Miosis + ptosis + enophthalmos + 3rd eyelid', { text: "Horner's syndrome", tone: 'warning' }],
        ],
      },

      { kind: 'step', text: "🧠 STEP 5 — HORNER'S? LOCALISE 1st / 2nd / 3rd ORDER" },
      // 3 columns, not 4 — the lesion site folds under the order label so the
      // "look for" column keeps its width at phone size instead of scrolling
      // the one thing the reader came for off the right edge.
      {
        kind: 'gridTable',
        cols: '0.62fr 1.4fr 0.85fr',
        dividers: true,
        headers: ['Order', { text: 'Look for', tone: 'teal' }, 'Work-up'],
        rows: [
          [
            { text: '<strong>1st</strong> central<br><em>brainstem · cervical cord to T1</em>', tone: 'danger' },
            { text: 'Rare. <strong>Concurrent neurological deficits</strong> — ataxia, paresis, hemineglect, vestibular signs. Cervical IVDD · fibrocartilaginous embolism · CVA · neoplasia', tone: 'teal' },
            { text: 'MRI + CSF', tone: 'danger' },
          ],
          [
            { text: '<strong>2nd</strong> preganglionic<br><em>T1–T3 → cervical sympathetic chain</em>', tone: 'warning' },
            { text: 'Look in the <strong>chest and neck</strong> — mediastinal mass, thymoma, lymphoma; brachial plexus avulsion; cervical neoplasia; recent head or neck surgery', tone: 'teal' },
            { text: 'Thoracic radiographs ± CT', tone: 'warning' },
          ],
          [
            { text: '<strong>3rd</strong> postganglionic<br><em>after the cranial cervical ganglion</em>', tone: 'green' },
            { text: 'Middle / inner ear disease · retrobulbar mass · <strong>idiopathic</strong> (most common — Golden Retriever; resolves spontaneously over weeks to months, median ~15 weeks, range 11–20, up to 6 months)', tone: 'teal' },
            { text: 'Otoscopy + CT/MRI bullae and orbit', tone: 'green' },
          ],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: "🐱 CAT — HORNER'S SPECIFICS",
        html: '• <strong>Middle ear disease is the most common 3rd-order cause</strong> — otitis media, nasopharyngeal polyp extending into the bulla<br>• Check <strong>CN VII at the same time</strong>: the facial nerve runs through the petrous temporal bone, so a CN VII deficit with Horner\'s localises to the middle ear<br>• Consider thoracic causes in outdoor or trauma-exposed cats — rib fracture, thoracic mass<br>• <strong>FeLV screen</strong> any cat with unexplained anisocoria — spastic pupil syndrome mimics Horner\'s',
      },
      {
        kind: 'gridTable',
        label: 'Two-step phenylephrine protocol',
        cols: '0.66fr 1fr 1fr',
        dividers: true,
        headers: ['Order', { text: 'Step 1 — 1% phenylephrine', tone: 'teal' }, { text: 'Step 2 — 10% if no 1% response', tone: 'teal' }],
        rows: [
          [
            { text: '<strong>3rd</strong> postganglionic', tone: 'green' },
            { text: '<strong>Dilates in ≤20 min</strong> — denervation hypersensitivity; the normal eye does not', tone: 'green' },
            { text: 'Not needed', dim: true },
          ],
          [
            { text: '<strong>2nd</strong> preganglionic', tone: 'warning' },
            { text: 'No response', dim: true },
            { text: 'Both pupils dilate in <strong>20–40 min</strong>', tone: 'warning' },
          ],
          [
            { text: '<strong>1st</strong> central', tone: 'danger' },
            { text: 'No response', dim: true },
            { text: '<strong>&gt;40 min</strong> — slow or minimal', tone: 'danger' },
          ],
        ],
      },
      {
        kind: 'note',
        html: 'Apply the identical drop to the contralateral eye and time both — interpret the <strong>time difference</strong>, never absolute values. Once Horner\'s has been present <strong>&gt;3 weeks</strong>, postganglionic axonal degeneration can give a 2nd-order lesion hypersensitivity too, blurring the test. Always document the concurrent neurological exam.',
      },

      { kind: 'step', text: '🧠 STEP 6 — FULL CN BATTERY + GENERAL NEURO EXAM' },
      {
        kind: 'gridTable',
        cols: '0.66fr 1fr 1.15fr',
        dividers: true,
        headers: ['Document', 'What to record', { text: 'Why it matters', tone: 'teal' }],
        rows: [
          ['<strong>Mentation · postural reactions · gait</strong>', 'Forebrain function, any UMN sign', { text: 'Places the lesion centrally', tone: 'teal' }],
          ['<strong>CN II–VII</strong>', 'Palpebral · corneal · facial sensation; CN III/IV/VI eye movement', { text: 'Ophthalmoparesis suggests a CN III lesion', tone: 'teal' }],
          ['<strong>CN VIII</strong>', 'Head tilt · nystagmus — name the fast phase', { text: 'Anisocoria + vestibular signs = central rostral brainstem until proven otherwise. Fast phase beats away from the lesion if peripheral, either way if central', tone: 'teal' }],
          ['<strong>Facial symmetry</strong>', 'Facial muscles, ear and eyelid position', { text: "A CN VII deficit alongside 3rd-order Horner's points to the middle ear", tone: 'teal' }],
          ['<strong>Autonomic signs</strong>', 'Dry mucous membranes · ↓ tear production · bradycardia · urinary retention · megaoesophagus', { text: '<strong>Dysautonomia</strong>', tone: 'teal' }],
          ['<strong>Trauma signs</strong>', 'External wounds · scleral haemorrhage · fundic haemorrhage', { text: 'Head trauma with anisocoria = <strong>rising ICP</strong> until proven otherwise', tone: 'danger' }],
        ],
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Abnormal Pupil — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES FIRST' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1fr 1.1fr',
        dividers: true,
        headers: ['Test', { text: 'Finding', tone: 'danger' }, 'Do now'],
        rows: [
          ['<strong>1. Tonometry</strong><br>rebound preferred', { text: 'Mid-fixed mydriasis + IOP <strong>&gt;25 mmHg</strong>', tone: 'danger' }, 'Acute glaucoma → refer <strong>same day</strong>'],
          ['<strong>2. Slit-lamp / focal light</strong>', { text: 'Lens sitting in the anterior chamber', tone: 'danger' }, 'Anterior lens luxation → emergency lensectomy referral'],
          ['<strong>3. Mentation + neuro exam</strong>', { text: 'Anisocoria + obtundation · hemiparesis · ataxia · CN deficits', tone: 'danger' }, 'Central emergency → MRI within hours if possible'],
          ['<strong>4. Trauma evaluation</strong>', { text: 'Head trauma + ipsilateral mydriasis', tone: 'danger' }, 'Rising ICP / CN III herniation → <strong>mannitol 0.5–1 g/kg IV slow</strong> + emergent imaging'],
          ['<strong>5. Drug / toxin history</strong>', { text: 'Any mydriatic or miotic exposure', tone: 'danger' }, 'Exclude pharmacological causes before a lengthy work-up'],
        ],
      },

      { kind: 'step', text: 'STEP 2 — TARGETED OPHTHALMIC TESTS' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1fr 1fr',
        dividers: true,
        headers: ['Test', 'Result', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Schirmer tear test</strong><br><em>before any drops</em>', 'Bilateral low STT + bilateral mydriasis + autonomic signs', { text: '<strong>Dysautonomia</strong>', tone: 'teal' }],
          ['<strong>Schirmer tear test</strong>', 'Unilateral low STT + ipsilateral dry nostril', { text: '<strong>Neurogenic KCS</strong> — CN VII branch', tone: 'teal' }],
          ['<strong>Fluorescein stain</strong>', 'Corneal ulcer', { text: 'Reflex miosis from its uveitis component — rule out before any topical steroid', tone: 'teal' }],
          ['<strong>Tonometry</strong>', '↓ IOP + miosis + aqueous flare', { text: 'Anterior uveitis', tone: 'teal' }],
          ['<strong>Tonometry</strong>', '↑ IOP + mid-mydriasis', { text: 'Glaucoma', tone: 'teal' }],
          ['<strong>Slit-lamp</strong>', 'Aqueous flare · KP · synechiae · lens position · iris detail · fibrin in the AC', { text: 'Localises within the anterior segment', tone: 'teal' }],
          ['<strong>Mydriatic challenge</strong><br>tropicamide 1%', 'Fails to dilate, or dilates only partially, in an otherwise normal eye', { text: 'Posterior synechiae — a chronic uveitis sequela', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: 'STEP 3 — PHARMACOLOGICAL LOCALISATION' },
      {
        kind: 'gridTable',
        cols: '0.72fr 1fr 1.2fr',
        dividers: true,
        headers: ['Test', 'Protocol', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ["<strong>1% phenylephrine</strong><br>Horner's localisation", 'Both eyes, time to dilation — always run the contralateral control (full protocol in Exam step 5)', { text: 'Rapid ≤20 min = <strong>3rd order</strong> · intermediate = <strong>2nd</strong> · slow = <strong>1st</strong>', tone: 'teal' }],
          ['<strong>Dilute pilocarpine</strong><br>0.05–0.1%', 'Watch for constriction within 30 min', { text: 'Constricts = <strong>parasympathetic denervation</strong> (dysautonomia, CN III parasympathetic nucleus lesion). A normal pupil does not constrict', tone: 'teal' }],
          ['<strong>Atropine response</strong>', '0.04 mg/kg SC, monitor heart rate', { text: '<strong>No rise in HR</strong> = failed parasympathetic blockade — supports dysautonomia', tone: 'teal' }],
          ['<strong>Cocaine 10%</strong> · <strong>apraclonidine 0.5%</strong>', "The classical human Horner's confirmation tests", { text: 'Limited availability and not routine in veterinary practice — phenylephrine is the practical choice', dim: true }],
        ],
      },
      {
        kind: 'callout',
        tone: 'warning',
        title: '🐱 CAT — PILOCARPINE TESTING CAUTIONS',
        html: '• Pilocarpine is irritating to feline eyes — use <strong>0.05–0.1% only</strong> for testing<br>• <strong>≥1% can cause salivation, vomiting, anorexia and diarrhoea</strong> from systemic absorption — do NOT use 1–2% in cats, unlike dogs<br>• Pharmacological testing is <strong>rarely needed in cats</strong> — most iris atrophy is secondary and diagnosable under magnification. Reserve it for cases where efferent CN III dysfunction cannot be excluded clinically<br>• Feline iris atrophy: uncommon vs dogs; suspect on slit-lamp thinning, holes or transillumination defects — most are secondary to chronic uveitis or glaucoma',
      },

      { kind: 'step', text: 'STEP 4 — CHROMATIC PLR + ERG (when vision is lost)' },
      {
        kind: 'note',
        noArrowAfter: true,
        html: 'Chromatic PLR (melanopsin-targeted handheld device) separates <strong>retinal vs optic nerve vs cortical</strong> blindness when both eyes are blind with dilated pupils.',
      },
      {
        kind: 'gridTable',
        gap: 6,
        cols: '1.2fr 0.7fr 0.85fr',
        dividers: true,
        headers: ['Condition', 'Red PLR', 'Blue PLR'],
        rows: [
          ['Normal', { text: 'Present', tone: 'green' }, { text: 'Present', tone: 'green' }],
          ['<strong>SARDS</strong>', { text: 'Absent', tone: 'danger' }, { text: 'Present', tone: 'green' }],
          ['Optic neuritis', { text: 'Absent', tone: 'danger' }, { text: 'Absent', tone: 'danger' }],
          ['End-stage retinal degeneration', { text: 'Absent', tone: 'danger' }, { text: 'Reduced / absent', tone: 'warning' }],
          ['Cortical blindness', { text: 'Present', tone: 'green' }, { text: 'Present', tone: 'green' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Referral electrodiagnostics',
        cols: '0.7fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'What it settles', tone: 'teal' }],
        rows: [
          ['<strong>ERG</strong>', { text: 'Gold standard for <strong>SARDS</strong> (flat ERG) vs <strong>optic neuritis</strong> (preserved ERG with an abnormal MRI)', tone: 'teal' }],
          ['<strong>Visual evoked potentials</strong>', { text: 'Central / cortical vs post-retinal', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: 'STEP 5 — IMAGING + SYSTEMIC WORKUP' },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.5fr',
        dividers: true,
        headers: ['Scenario', { text: 'Work-up', tone: 'teal' }],
        rows: [
          ["<strong>2nd-order Horner's</strong>", { text: 'Thoracic radiographs ± thoracic CT (mediastinal mass · lymphoma · thymoma · lung mass at the thoracic inlet) · cervical exam · brachial plexus palpation · ± CT/MRI neck for cervical neoplasia', tone: 'teal' }],
          ["<strong>3rd-order Horner's</strong>", { text: 'Otoscopy + CT/MRI of the bullae and retrobulbar space — otitis media/interna, polyp (🐱), retrobulbar mass', tone: 'teal' }],
          ["<strong>Central anisocoria</strong><br>1st-order Horner's · CN III lesion · parasympathetic nucleus · cortical blindness", { text: 'MRI brain + CSF analysis — MUA, neoplasia, CVA, infectious encephalitis', tone: 'teal' }],
          ['<strong>Cataract + posterior synechiae</strong>', { text: 'Ocular ultrasound for posterior segment integrity before phacoemulsification referral; recheck IOP repeatedly', tone: 'teal' }],
          ['<strong>Hyphaema / retinal detachment + mydriasis</strong>', { text: 'Blood pressure (calm, × 3) · CBC · biochemistry · urinalysis · coagulation · FeLV/FIV (🐱) · endocrine work-up (HAC, hyperthyroid)', tone: 'teal' }],
          ['<strong>SARDS</strong>', { text: 'ACTH stim / LDDST — the HAC look-alike phenotype is common · urinalysis · full biochemistry. Counsel on irreversibility, but rule out treatable mimics first', tone: 'teal' }],
          ['<strong>Dysautonomia</strong>', { text: 'Chest radiographs (megaoesophagus) · abdominal radiographs (atonic bladder, megacolon) · pilocarpine + atropine tests · Schirmer · full autonomic battery', tone: 'teal' }],
          ['<strong>Infectious uveitis + posterior synechiae</strong>', { text: 'Toxoplasma IgG/IgM · FeLV/FIV/FCoV titre · tick-borne panel (region-dependent) · fungal serology · BP', tone: 'teal' }],
        ],
      },
    ],
    after: [
      {
        kind: 'gridTable',
        gap: 10,
        label: '⚠️ Therapy pearls while you investigate',
        cols: '0.72fr 1.5fr',
        dividers: true,
        headers: ['Condition', { text: 'While you investigate', tone: 'warning' }],
        rows: [
          ['<strong>Acute glaucoma</strong> — 🐕', { text: 'Topical latanoprost 0.005% q6h + dorzolamide 2% + timolol 0.5%; mannitol 1 g/kg IV slow if vision-threatening — <strong>refer same day</strong>', tone: 'warning' }],
          ['<strong>Acute glaucoma</strong> — 🐱', { text: '<strong>Latanoprost is ineffective</strong> (no functional FP prostanoid receptors in the feline ciliary body) — use dorzolamide + timolol ± an oral carbonic anhydrase inhibitor', tone: 'warning' }],
          ['<strong>Anterior uveitis with miosis</strong>', { text: 'Topical 1% atropine (only if IOP is not elevated) + topical 1% prednisolone acetate q6–8h (no ulcer) — treat the underlying cause aggressively', tone: 'warning' }],
          ['<strong>Optic neuritis</strong><br>suspected MUA', { text: 'Aggressive immunosuppression — prednisolone 2 mg/kg/day + a cytotoxic adjunct. Refer for MRI + CSF before committing to chronic therapy', tone: 'warning' }],
          ["<strong>Idiopathic Horner's</strong><br>Golden Retriever", { text: 'Reassure; phenylephrine 1% q6h temporarily improves cosmesis. Most resolve over weeks to months (median ~15 weeks, up to 6 months)', tone: 'warning' }],
          ['<strong>Dysautonomia</strong>', { text: 'Supportive care · dilute pilocarpine drops to maintain pupil function · artificial tears. Guarded prognosis', tone: 'warning' }],
          ['<strong>SARDS</strong>', { text: 'No proven specific therapy; manage the HAC-like phenotype if present; counsel on blindness and quality of life', tone: 'warning' }],
        ],
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
