// ── Anisocoria / Abnormal Pupil — diagnostic approach (data) ────────────────
// Migration of abnormalPupilDx{History,Exam,Dx}Html (legacy HTML consts in
// ../abnormalPupil.ts) to the typed DxApproach model. Rendered by
// renderDxApproach. See DATA_MIGRATION.md.

import type { DxApproach } from '../dxTypes'

export const abnormalPupilDx: DxApproach = {
  title: 'Anisocoria / Abnormal Pupil',
  tabs: {

  history: {
    title: 'History: Abnormal Pupil',
    blocks: [
      { kind: 'branch', text: 'CHARACTERISE THE COMPLAINT' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">👁️ Visible pupil change</strong><br>
      Anisocoria · dyscoria<br>
      Persistent mydriasis or miosis<br>
      <span style="opacity:.75;">Owner notices asymmetry or fixed pupil</span>`,
          },
          {
            style: 'text-align:left;background:#0D7377;font-size:9px;',
            html: `<strong style="font-size:10px;">👀 Vision change</strong><br>
      Bumping objects · uncertainty<br>
      Sudden vs gradual onset<br>
      <span style="opacity:.75;">Often the chief complaint when retinal/optic</span>`,
          },
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">🧠 Systemic / neuro signs</strong><br>
      Mentation change · ataxia · CN deficits<br>
      Megaoesophagus · PU/PD · autonomic signs<br>
      <span style="opacity:.75;">Points to central or systemic cause</span>`,
          },
        ],
      },
      { kind: 'step', text: '📋 ONSET, DURATION, PROGRESSION' },
      {
        kind: 'check',
        html: `<strong>Peracute (min–hours):</strong> Acute glaucoma · anterior lens luxation · trauma · CVA · acute uveitis · pharmacological exposure.<br>
    <strong>Acute (days):</strong> Optic neuritis · MUA · retinal detachment · SARDS · infectious uveitis · Horner's idiopathic (Golden Retriever).<br>
    <strong>Subacute (weeks):</strong> Neoplasia (orbital, intracranial, mediastinal causing 2nd-order Horner's) · chronic uveitis · cataract + 2° glaucoma.<br>
    <strong>Chronic / progressive:</strong> Senile iris atrophy · PRA · degenerative cataract · uveal cysts (incidental) · chronic Horner's with concurrent OM.<br><br>
    <strong>Unilateral or bilateral?</strong><br>
    • Unilateral → local cause likely (Horner's, uveitis, glaucoma, trauma, lens luxation)<br>
    • Bilateral → systemic / central / drug cause (SARDS, optic neuritis, dysautonomia, central blindness, atropine, opioids, ketamine, sympathomimetics)`,
      },
      { kind: 'step', alt: true, text: '💊 DRUG + EXPOSURE HISTORY' },
      {
        kind: 'check',
        html: `<strong>Drugs causing mydriasis:</strong><br>
    • Topical atropine, tropicamide, phenylephrine, cyclopentolate<br>
    • Systemic atropine (premed), glycopyrrolate<br>
    • Opioids in cats (paradoxical mydriasis), ketamine, amphetamines, cocaine<br>
    • Tricyclic antidepressants, antihistamines (anticholinergic)<br><br>
    <strong>Drugs causing miosis:</strong><br>
    • Opioids in dogs (morphine, fentanyl)<br>
    • Topical pilocarpine, demecarium, latanoprost (also lowers IOP)<br>
    • Organophosphate toxicity (SLUDGE signs)<br><br>
    <strong>Toxin exposure:</strong> jimson weed (atropine — mydriasis), organophosphates / carbamates (miosis), strychnine. Lily ingestion in cats causes AKI rather than direct pupillary signs.<br><br>
    <strong>Trauma history:</strong> Head trauma → ipsilateral mydriasis (CN III compression, intracranial bleed) — neurosurgical emergency.`,
      },
      { kind: 'step', alt: true, text: '🩺 SYSTEMIC / GENERAL HISTORY' },
      {
        kind: 'check',
        html: `<strong>SARDS suspicion (dog):</strong> sudden bilateral blindness + weight gain + PU/PD + polyphagia ± HAC-like phenotype → "Cushingoid SARDS" cluster.<br>
    <strong>Diabetic dog with rapid cataract progression:</strong> lens-induced uveitis → posterior synechia → distorted pupil.<br>
    <strong>FIV/FeLV/FIP positive cat:</strong> chronic uveitis → posterior synechiae → dyscoria.<br>
    <strong>Vomiting, regurgitation, dry mucous membranes, urinary retention:</strong> dysautonomia — bilateral mydriasis + decreased tear production + multi-system autonomic failure.<br>
    <strong>Neurological signs</strong> (seizures, behavioural change, circling, hemiparesis) + anisocoria → intracranial mass / inflammatory CNS disease / CVA — MRI + CSF indicated.<br>
    <strong>Megaoesophagus + regurgitation + Horner's-like signs:</strong> dysautonomia in dog (rural / outdoor, midwest USA endemic).<br>
    <strong>Travel + tick exposure:</strong> tick-borne uveitis (Ehrlichia, RMSF).`,
      },
      { kind: 'step', alt: true, text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'html',
        noArrowAfter: true,
        html: `<div style="margin-bottom:8px;padding:10px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.2);border-radius:10px;width:100%;">
    <div style="font-size:10.5px;font-weight:700;color:#93C5FD;margin-bottom:7px;">🔑 CANINE vs FELINE — KEY SPECIES DIFFERENCES</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 10px;font-size:9px;line-height:1.5;">
      <div style="color:#93C5FD;font-weight:700;padding-bottom:2px;border-bottom:1px solid rgba(148,163,184,.15);">🐕 Dog</div>
      <div style="color:#FB923C;font-weight:700;padding-bottom:2px;border-bottom:1px solid rgba(148,163,184,.15);">🐱 Cat</div>
      <div>Normal pupil: <strong>round</strong></div>
      <div>Normal pupil: <strong>vertical ellipse / slit</strong> (can appear round in dim light)</div>
      <div>Iris atrophy: <strong>common</strong> (senile, small breeds) — most often <em>primary</em> degenerative</div>
      <div>Iris atrophy: <strong>uncommon</strong>; secondary (uveitis, glaucoma) &gt; primary in cats; blue irises predisposed (thinner stroma)</div>
      <div>Iris innervation: <strong>5–8 short ciliary nerves</strong> — denervated pupil = round, fully dilated</div>
      <div>Iris innervation: <strong>only 2 short ciliary nerves</strong> (malar lateral · nasal medial) — partial denervation = <strong>D-shaped or reverse-D pupil</strong> (hemi-dilation)</div>
      <div>Optic neuritis: <strong>immune-mediated forms well-documented</strong> (MUE/GME/NME) — empiric immunosuppression after ruling out infection is reasonable</div>
      <div>Optic neuritis: <strong>no immune-mediated form described</strong> — workup must aggressively pursue infection (FIP, toxo, crypto) or neoplasia; enrofloxacin/fluoroquinolone toxic retinopathy is a key DDx</div>
      <div>Lens luxation: typically <strong>↑ IOP (often &gt;40)</strong> with anterior luxation in dogs</div>
      <div>Lens luxation: <strong>many cats remain normotensive</strong> despite luxation — normal IOP does NOT exclude the diagnosis</div>
      <div>Cataract aetiology: <strong>diabetes mellitus is a major cause</strong> (rapid progression, lens-induced uveitis); many inherited breed forms</div>
      <div>Cataract aetiology: <strong>chronic uveitis is the most common cause</strong> (DM cataracts are rare in cats — Russian Blue, Bengal hereditary)</div>
      <div>Spastic pupil syndrome: <strong>not described</strong></div>
      <div>Spastic pupil syndrome: <strong>FeLV-associated</strong> — tonic anisocoria; viral neuritis of short ciliary nerves; D-shape characteristic</div>
      <div>PPMs: <strong>common</strong> (27% of dogs with congenital anomalies); many breeds</div>
      <div>PPMs: <strong>rare</strong> (~1.4–2.3% prevalence); often in eyes with other anomalies</div>
      <div>Uveal cysts: <strong>transilluminate</strong> — reliably distinguish from melanoma</div>
      <div>Uveal cysts: may be <strong>darkly pigmented, do NOT transilluminate</strong> — mimic melanoma; ultrasound needed</div>
      <div>Opioids → <strong>miosis</strong> (morphine, fentanyl)</div>
      <div>Opioids → <strong>mydriasis</strong> (paradoxical in cats)</div>
      <div>Pilocarpine test: safe at 0.05–2%; may cause conjunctival hyperaemia / blepharospasm</div>
      <div>Pilocarpine test: irritating; <strong>concentrations ≥1% can cause salivation, vomiting, anorexia, diarrhoea</strong> — use 0.05–0.5% only</div>
      <div>Glaucoma: usually <strong>primary closed-angle</strong> (goniodysgenesis, breed-specific); responds to latanoprost</div>
      <div>Glaucoma: usually <strong>secondary</strong> to chronic uveitis / lens luxation; <strong>latanoprost ineffective</strong> (no FP receptors in feline ciliary body)</div>
      <div>Horner's: idiopathic 3rd order most common (<strong>Golden Retriever</strong>, median resolution ~15 weeks)</div>
      <div>Horner's: <strong>middle ear disease</strong> most common cause; screen with otoscopy + CT bullae</div>
      <div>Lens luxation: primary (ADAMTS17 mutation) in <strong>terrier breeds</strong>; secondary to uveitis/glaucoma</div>
      <div>Lens luxation: primary is <strong>rare</strong>; secondary to chronic uveitis is most common cause in cats</div>
      <div>Optic nerve hypoplasia: <strong>SIX6 mutation in Golden Retriever</strong> (autosomal dominant CEM syndrome); reported in mini/toy poodle, shih tzu, beagle, borzoi, GSD</div>
      <div>Optic nerve hypoplasia: <strong>extremely rare</strong>; specifically linked to <strong>griseofulvin (teratogen)</strong> in queens and feline parvovirus</div>
    </div>
  </div>`,
      },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG — BREED-SPECIFIC CLUES</strong><br><br>
        <strong style="color:#FCD34D;">Golden Retriever</strong> → idiopathic Horner's (3rd order — most common breed); pigmentary uveitis (iris cysts → uveitis → 2° glaucoma)<br><br>
        <strong style="color:#FCA5A5;">Jack Russell, Tibetan Terrier, Border Collie, Sealyham, Manchester Terrier</strong> → primary anterior lens luxation (ADAMTS17 mutation)<br><br>
        <strong style="color:#6EE7B7;">Cocker, Basset, Springer, Bouvier, Chow, Akita</strong> → primary closed-angle glaucoma → mid-fixed mydriasis<br><br>
        <strong style="color:#C4B5FD;">Miniature Schnauzer, Toy Poodle, Cocker</strong> → cataract → lens-induced uveitis → posterior synechiae<br><br>
        <strong style="color:#FCA5A5;">Miniature Schnauzer (especially), Dachshund, Brittany</strong> → SARDS<br><br>
        <strong style="color:#FCD34D;">Toy and miniature breeds, senior small breeds</strong> → senile iris atrophy (most common in Poodle, Shih Tzu, Yorkshire Terrier — may appear as early as 4–5 yr)<br><br>
        <strong style="color:#6EE7B7;">Beagle, Norwegian Elkhound</strong> → PRA<br><br>
        <strong style="color:#C4B5FD;">Any large breed</strong> → mediastinal mass / brachial plexus tumour → 2nd-order Horner's<br><br>
        <strong style="color:#FCD34D;">Akita, Samoyed, Husky</strong> → uveodermatologic syndrome → bilateral granulomatous uveitis + periocular depigmentation
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT — BREED-SPECIFIC CLUES</strong><br><br>
        <strong style="color:#C4B5FD;">Older cat (any breed)</strong> → systemic hypertension → bilateral mydriasis + retinal detachment ± intraocular haemorrhage — <em>check BP FIRST</em><br><br>
        <strong style="color:#FCD34D;">FIV/FeLV positive</strong> → chronic uveitis → dyscoria; diffuse iris melanosis (age-related, progressive)<br><br>
        <strong style="color:#FCA5A5;">FeLV positive</strong> → spastic pupil syndrome — tonic anisocoria with impaired constriction; one or both eyes<br><br>
        <strong style="color:#6EE7B7;">Burmese</strong> → corneal sequestrum → reflex uveitis → miosis; uveal cysts (breed-associated); more susceptible to eyelid agenesis<br><br>
        <strong style="color:#FCA5A5;">Outdoor cat</strong> → trauma → 2nd / 3rd order Horner's; toxoplasma uveitis; proptosis<br><br>
        <strong style="color:#93C5FD;">Cat with otitis media</strong> → 3rd-order Horner's (postganglionic — middle ear via chorda tympani); ± CN VII deficit<br><br>
        <strong style="color:#C4B5FD;">Multi-cat household / FIP</strong> → pyogranulomatous uveitis → miosis · hypopyon · aqueous flare<br><br>
        <strong style="color:#6EE7B7;">Key-Gaskell cat (UK / Australia)</strong> → dysautonomia: bilateral fixed mydriasis + dry mucosae + megaoesophagus<br><br>
        <strong style="color:#FCD34D;">Bengal, Domestic Shorthair</strong> → PPMs (iris-to-cornea type) — rare but reported
      </div>
    </div>`,
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
        kind: 'html',
        noArrowAfter: true,
        html: `<div style="margin-bottom:10px;padding:9px 12px;background:rgba(251,146,60,0.07);border:1px solid rgba(251,146,60,0.25);border-radius:10px;width:100%;">
    <div style="font-size:10.5px;font-weight:700;color:#FB923C;margin-bottom:6px;">🐾 SPECIES — NORMAL PUPIL SHAPE (confirm before labelling as abnormal)</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 10px;font-size:9.5px;line-height:1.5;">
      <div><strong style="color:#60A5FA;">🐕 Dog:</strong> <strong>round</strong> at all light levels. Any deviation from round = abnormal.</div>
      <div><strong style="color:#FB923C;">🐱 Cat:</strong> <strong>vertical slit/ellipse in bright light → round/oval in dim light.</strong> A round pupil in a cat with bright ambient light is normal dilation — not mydriasis. Judge only in standardised lighting.</div>
      <div><strong style="color:#60A5FA;">Iris atrophy (dog):</strong> very common in senior small breeds — moth-eaten ragged pupil margin, transillumination defects. Can masquerade as neurological mydriasis.</div>
      <div><strong style="color:#FB923C;">Iris atrophy (cat):</strong> uncommon; usually secondary (chronic uveitis, glaucoma). Blue irises normally thinner and more prone. Always retroilluminate before ascribing to primary degenerative disease in a cat.</div>
    </div>
  </div>`,
      },
      { kind: 'step', text: '🩺 STEP 1 — CONFIRM ANISOCORIA + IDENTIFY THE ABNORMAL PUPIL' },
      {
        kind: 'check',
        html: `<strong>Compare in bright light AND in a dark room</strong> using a focal light at arm's length:<br>
    • <strong>Abnormally LARGE pupil</strong> → anisocoria LESS obvious in the dark (the normal pupil dilates and the gap narrows) — lesion preventing constriction (CN III · iris atrophy · pharmacological mydriasis · glaucoma · sympathetic discharge).<br>
    • <strong>Abnormally SMALL pupil</strong> → anisocoria MORE obvious in the dark (the normal pupil dilates while the abnormal stays small) — lesion preventing dilation (sympathetic denervation = Horner's · uveitis · pharmacological miotic · posterior synechiae).<br>
    • Always compare to baseline pupil size in normal light; bilateral fixed mydriasis or miosis is missed when you fail to compare to expected size.<br>
    • <strong>Cat-specific:</strong> assess in both bright and dim light — cat pupil normally transitions from slit to round; a "dilated" cat pupil in a dim exam room may be normal. Also note that the feline iris sphincter is more powerful than the dilator — miosis from uveitis or pilocarpine is more pronounced in cats than dogs at equivalent doses.`,
      },
      { kind: 'step', alt: true, text: '🔦 STEP 2 — PLR BATTERY (afferent vs efferent localisation)' },
      {
        kind: 'check',
        html: `<strong>Direct PLR</strong> = CN II afferent → CN III efferent in same eye.<br>
    <strong>Consensual (indirect) PLR</strong> = light into eye A causes constriction of pupil B; tests crossed optic fibres.<br>
    <strong>Swinging-light test</strong> = detects relative afferent pupillary defect (RAPD): light moves between eyes; an eye with optic-nerve / retinal disease shows paradoxical dilation when re-illuminated.<br><br>
    <strong>Localisation by the 5 classical PLR-lesion patterns:</strong>
    <div style="display:grid;grid-template-columns:1.3fr 0.9fr 0.9fr 0.9fr 0.9fr;gap:3px 6px;font-size:9px;margin:6px 0 4px 0;">
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Lesion site</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Pupil R at rest</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Pupil L at rest</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Direct PLR</div>
      <div style="font-weight:700;border-bottom:1px solid rgba(148,163,184,.2);">Indirect PLR</div>
      <div>1. Pre-chiasmal (R)</div><div>Dilated</div><div>Normal</div><div>R: absent</div><div>R→L: present · L→R: absent</div>
      <div>2. Focal optic tract (R)</div><div>Normal</div><div>Normal</div><div>Both present</div><div>Both present</div>
      <div>3. Chiasmal</div><div>Dilated</div><div>Dilated</div><div>Both absent</div><div>Both absent</div>
      <div>4. CN III (L)</div><div>Normal</div><div>Dilated</div><div>R: present · L: absent</div><div>R→L: absent · L→R: present</div>
      <div>5. Parasymp nucleus of CN III (R)</div><div>Dilated</div><div>Normal</div><div>R: absent · L: present</div><div>R→L: present · L→R: absent</div>
    </div>
    <span style="font-size:9.5px;opacity:.75;">Pre-chiasmal = retina/optic nerve · Optic tract → LGN · CN III lesion = ipsilateral mydriasis + ptosis + lateral strabismus + ophthalmoparesis.</span>`,
      },
      { kind: 'step', alt: true, text: '💡 STEP 3 — DAZZLE + MENACE (separate vision from PLR)' },
      {
        kind: 'check',
        html: `<strong>Dazzle reflex</strong>: subcortical (CN II → CN VII via colliculus). Present even when cortically blind. Absent = retina / optic nerve / midbrain.<br>
    <strong>Menace response</strong>: cortical (CN II → cortex → CN VII). Tests vision pathway. Develops at 10–12 wks of age.<br>
    <strong>Combinations:</strong><br>
    • Absent menace + intact dazzle + intact PLR → <strong>cortical blindness</strong> (forebrain — MUA, neoplasia, hepatic encephalopathy, hypertensive encephalopathy).<br>
    • Absent menace + intact dazzle + absent PLR in affected eye → <strong>optic nerve / chiasmal lesion</strong>.<br>
    • Absent menace + absent dazzle + absent PLR → <strong>retinal disease</strong> (SARDS, RD, end-stage PRA) or pre-geniculate lesion.<br>
    • Absent menace + absent dazzle + PLR present with BLUE light only → <strong>SARDS</strong> (intrinsically photosensitive RGCs preserved).`,
      },
      { kind: 'step', alt: true, text: '👁️ STEP 4 — SLIT-LAMP / FOCAL LIGHT — PUPIL SHAPE + IRIS' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Dyscoria (D-shape, irregular pupil)</div><div style="color:#FCD34D;">Posterior synechiae · iris atrophy · congenital · iris coloboma</div>
      <div>Ragged margin, transilluminates</div><div style="color:#93C5FD;">Senile iris atrophy (mistaken for true mydriasis)</div>
      <div>Iris-to-iris / iris-to-lens / iris-to-cornea strand</div><div style="color:#C4B5FD;">Persistent pupillary membranes (PPMs)</div>
      <div>Round, free-floating pigmented sphere in AC</div><div style="color:#6EE7B7;">Uveal cyst (transilluminates · benign · Golden Retriever)</div>
      <div>Solid pigmented iris mass</div><div style="color:#F87171;">Iris melanoma / diffuse iris melanoma (cat)</div>
      <div>Posterior synechiae adherent to lens</div><div style="color:#FCA5A5;">Chronic uveitis · 2° glaucoma risk if 360°</div>
      <div>Aqueous flare + miosis + ↓ IOP</div><div style="color:#FCA5A5;">Anterior uveitis</div>
      <div>Mid-fixed mydriasis + corneal oedema + ↑ IOP</div><div style="color:#F87171;">Acute glaucoma</div>
      <div>Lens visible in AC / aphakic crescent</div><div style="color:#F87171;">Anterior lens luxation</div>
      <div>Miosis + ptosis + enophthalmos + 3rd eyelid</div><div style="color:#FCD34D;">Horner's syndrome</div>
    </div>`,
      },
      { kind: 'step', alt: true, text: "🧠 STEP 5 — HORNER'S? LOCALISE 1st / 2nd / 3rd ORDER" },
      {
        kind: 'check',
        html: `<strong>1st order (central / brainstem / cervical cord T1):</strong> Rare. Concurrent neurological deficits — ataxia, paresis, hemineglect, vestibular signs. Lesions: cervical IVDD, fibrocartilaginous embolism, cerebrovascular accident, neoplasia. <strong>MRI</strong> + CSF.<br>
    <strong>2nd order (preganglionic, T1–T3 → cervical sympathetic chain):</strong> Look in the chest and neck — thoracic radiographs (mediastinal mass, thymoma, lymphoma), trauma (brachial plexus avulsion), cervical neoplasia, head/neck surgery history.<br>
    <strong>3rd order (postganglionic, after cranial cervical ganglion):</strong> Middle / inner ear disease, retrobulbar mass, idiopathic (most common — particularly <strong>Golden Retriever idiopathic Horner's</strong>, typically resolves spontaneously over weeks to months; published median ~15 weeks, range 11–20 weeks, up to 6 months). Otoscopy + CT/MRI bullae and orbit.<br>
    <strong style="color:#FB923C;">Cat-specific:</strong> middle ear disease is the most common 3rd-order cause in cats (otitis media, nasopharyngeal polyp extending to bulla). Check CN VII concurrently (facial nerve travels through petrous temporal bone — CN VII deficit + Horner's = middle ear). Also consider thoracic causes in outdoor or trauma-exposed cats (rib fracture, thoracic mass). FeLV screen in cats with unexplained anisocoria — spastic pupil syndrome can mimic Horner's.<br><br>
    <strong>Pharmacological localisation — two-step phenylephrine protocol:</strong>
    <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Step / Order</div><div style="font-weight:600;">Expected response</div>
      <div>Step 1 — 1% phenylephrine, both eyes</div><div>Time to dilation of the affected pupil</div>
      <div>3rd order (postganglionic — denervation hypersensitivity)</div><div style="color:#6EE7B7;">Dilates in ≤ 20 min with 1% (normal eye does not)</div>
      <div>Step 2 — if no 1% response → switch to 10% phenylephrine</div><div>Time to bilateral dilation</div>
      <div>2nd order (preganglionic)</div><div style="color:#FCD34D;">10% dilates both pupils in 20–40 min</div>
      <div>1st order (central)</div><div style="color:#FCA5A5;">10% &gt; 40 min (slow / minimal)</div>
    </div>
    <span style="font-size:9.5px;opacity:.75;">Apply identical drop to contralateral eye and time both — interpret only the time difference, not absolute values. Note: if Horner's has been present &gt;3 weeks, postganglionic axonal degeneration can still develop hypersensitivity in 2nd-order lesions, blurring the test. Always document concurrent neurological exam.</span>`,
      },
      { kind: 'step', alt: true, text: '🧠 STEP 6 — FULL CN BATTERY + GENERAL NEURO EXAM' },
      {
        kind: 'check',
        html: `Document at minimum:<br>
    • Mentation (forebrain) · postural reactions (any UMN) · gait<br>
    • CN II–VII palpebral / corneal / facial sensation · CN III/IV/VI eye movement (ophthalmoparesis suggests CN III lesion)<br>
    • CN VIII vestibular signs (head tilt, nystagmus) — if anisocoria + vestibular = central rostral brainstem lesion until proven otherwise<br>
    • Symmetry of facial muscles, ear and eyelid position (concurrent CN VII with 3rd-order Horner's points to middle ear)<br>
    • Autonomic signs: dry mucous membranes, decreased tear production, bradycardia, urinary retention, megaoesophagus → <strong>dysautonomia</strong><br>
    • Trauma signs: external wounds, scleral haemorrhage, fundus haemorrhage — head trauma with anisocoria = rising ICP until proven otherwise`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Abnormal Pupil — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — RULE OUT EMERGENCIES FIRST' },
      {
        kind: 'check',
        html: `1. <strong>Tonometry</strong> (rebound preferred) — any mid-fixed mydriasis with IOP &gt;25 mmHg = acute glaucoma → refer same-day.<br>
    2. <strong>Slit-lamp / focal light</strong> — anterior lens position; lens in AC = anterior lens luxation → emergency lensectomy referral.<br>
    3. <strong>Mentation + general neurological exam</strong> — anisocoria + obtundation, hemiparesis, ataxia, CN deficits = central emergency → MRI within hours if possible.<br>
    4. <strong>Trauma evaluation</strong> — head trauma + ipsilateral mydriasis = rising ICP / CN III herniation → mannitol 0.5–1 g/kg IV slow + emergent imaging.<br>
    5. <strong>Drug / toxin history</strong> — exclude pharmacological causes before lengthy workup.`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — TARGETED OPHTHALMIC TESTS' },
      {
        kind: 'check',
        html: `<strong>Schirmer Tear Test (BEFORE drops)</strong> — bilateral low STT + bilateral mydriasis + autonomic signs = <strong>dysautonomia</strong>. Unilateral low STT + ipsilateral dry nostril = <strong>neurogenic KCS</strong> (CN VII branch).<br>
    <strong>Fluorescein stain</strong> — corneal ulcer can cause reflex miosis (anterior uveitis component); rule out before topical steroids.<br>
    <strong>Tonometry</strong> — see emergency step above. ↓ IOP + miosis + flare = anterior uveitis · ↑ IOP + mid-mydriasis = glaucoma.<br>
    <strong>Slit-lamp</strong> — aqueous flare, KP, synechiae, lens position, iris detail, fibrin in AC.<br>
    <strong>Mydriatic challenge (tropicamide 1%)</strong> — used to dilate for fundus exam. Failure to dilate or only partial dilation in an otherwise normal eye → posterior synechiae (chronic uveitis sequela).`,
      },
      { kind: 'step', alt: true, text: 'STEP 3 — PHARMACOLOGICAL LOCALISATION' },
      {
        kind: 'check',
        html: `<strong>1% phenylephrine — Horner's localisation</strong> (as in Exam step 5): rapid response (≤20 min) = 3rd order; intermediate = 2nd order; slow = 1st order. Always run a contralateral control.<br><br>
    <strong>Dilute pilocarpine (0.05–0.1%) — dysautonomia / denervation hypersensitivity:</strong> dilute pilocarpine causes constriction within 30 min in a parasympathetically denervated pupil (dysautonomia, CN III parasympathetic nucleus lesion) but no constriction in a normal pupil.<br>
    <div style="margin:6px 0;padding:7px 10px;background:rgba(251,146,60,0.08);border:1px solid rgba(251,146,60,0.2);border-radius:7px;font-size:9px;line-height:1.55;">
      <strong style="color:#FB923C;">🐱 CAT — Pilocarpine Testing Cautions:</strong><br>
      • Pilocarpine is irritating to feline eyes — use 0.05–0.1% only for testing.<br>
      • Concentrations ≥1% may cause <strong>salivation, vomiting, anorexia, and diarrhoea</strong> from systemic absorption — do NOT use 1–2% pilocarpine in cats (unlike dogs).<br>
      • Pharmacological testing is <strong>rarely needed in cats</strong> — most iris atrophy is secondary and diagnosable by clinical examination under magnification. Reserve for cases where efferent CN III dysfunction cannot be excluded clinically.<br>
      • Iris atrophy in cats: uncommon (vs dogs); suspect if slit-lamp shows thinning, holes, or transillumination defects in the iris. Most cases are secondary to chronic uveitis or glaucoma.
    </div><br>
    <strong>Atropine response test:</strong> in dysautonomia, atropine 0.04 mg/kg SC produces no rise in heart rate (failed parasympathetic blockade) — supportive evidence.<br><br>
    <strong>Cocaine 10% or apraclonidine 0.5%</strong>: classical Horner's confirmation tests in humans — limited availability and not routinely used in veterinary practice; phenylephrine is the practical choice.`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — CHROMATIC PLR + ERG (when vision is lost)' },
      {
        kind: 'check',
        html: `<strong>Chromatic PLR</strong> (handheld melanopsin-targeted device): differentiates retinal vs optic nerve vs cortical blindness when both eyes are blind with dilated pupils.<br>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Condition</div><div style="font-weight:600;">Red PLR</div><div style="font-weight:600;">Blue PLR</div>
      <div>Normal</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
      <div>SARDS</div><div style="color:#F87171;">Absent</div><div style="color:#6EE7B7;">Present</div>
      <div>Optic neuritis</div><div style="color:#F87171;">Absent</div><div style="color:#F87171;">Absent</div>
      <div>End-stage retinal degeneration</div><div style="color:#F87171;">Absent</div><div style="color:#FCD34D;">Reduced / absent</div>
      <div>Cortical blindness</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
    </div>
    <strong>Electroretinography (ERG)</strong> — gold standard for SARDS (flat ERG) vs optic neuritis (preserved ERG, abnormal MRI). Referral.<br>
    <strong>Visual evoked potentials</strong> — central / cortical vs post-retinal. Referral.`,
      },
      { kind: 'step', alt: true, text: 'STEP 5 — IMAGING + SYSTEMIC WORKUP' },
      {
        kind: 'check',
        html: `<strong>2nd-order Horner's:</strong> Thoracic radiographs ± thoracic CT (mediastinal mass, lymphoma, thymoma, lung mass at thoracic inlet), cervical exam, brachial plexus palpation, ± CT/MRI neck for cervical neoplasia.<br>
    <strong>3rd-order Horner's:</strong> Otoscopy + CT/MRI of bullae and retrobulbar space for otitis media/interna, polyp (cat), retrobulbar mass.<br>
    <strong>Central anisocoria (1st-order Horner's / CN III lesion / parasympathetic nucleus / cortical blindness):</strong> MRI brain + CSF analysis — MUA, neoplasia, CVA, infectious encephalitis.<br>
    <strong>Cataract + posterior synechiae:</strong> ocular ultrasound for posterior segment integrity prior to phacoemulsification referral; check IOP repeatedly.<br>
    <strong>Hyphaema / retinal detachment + mydriasis:</strong> blood pressure (calm × 3), CBC, biochemistry, urinalysis, coagulation, FeLV/FIV (cat), endocrine workup (HAC, hyperthyroid).<br>
    <strong>SARDS workup:</strong> ACTH stim / LDDST (HAC look-alike phenotype common), urinalysis, full biochemistry; counsel on irreversibility but rule out treatable mimics first.<br>
    <strong>Dysautonomia workup:</strong> chest radiographs (megaoesophagus), abdominal radiographs (atonic bladder, megacolon), pilocarpine + atropine tests, Schirmer, full autonomic battery.<br>
    <strong>Infectious uveitis with posterior synechiae:</strong> Toxoplasma IgG/IgM, FeLV/FIV/FCoV titre, tick-borne panel (region-dependent), fungal serology, BP.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Therapy pearls while you investigate:</strong><br>
  • <strong>Acute glaucoma (dog):</strong> topical latanoprost 0.005% q6h + dorzolamide 2% + timolol 0.5%; mannitol 1 g/kg IV slow if vision-threatening — refer same day. <strong>Note: latanoprost is ineffective in cats</strong> (no functional FP prostanoid receptors in feline ciliary body) — use dorzolamide + timolol ± oral carbonic anhydrase inhibitor instead.<br>
  • <strong>Anterior uveitis with miosis:</strong> topical 1% atropine (only if IOP not elevated) + topical 1% prednisolone acetate q6–8h (no ulcer) — treat underlying cause aggressively.<br>
  • <strong>Optic neuritis (suspected MUA):</strong> aggressive immunosuppression (prednisolone 2 mg/kg/day + cytotoxic adjunct) — refer for MRI + CSF before chronic therapy.<br>
  • <strong>Idiopathic Horner's (Golden Retriever):</strong> reassure, phenylephrine 1% q6h can temporarily improve cosmesis; most resolve over weeks to months (median ~15 weeks, up to 6 months).<br>
  • <strong>Dysautonomia:</strong> supportive care, dilute pilocarpine drops to maintain pupil function, artificial tears; guarded prognosis.<br>
  • <strong>SARDS:</strong> no proven specific therapy; manage HAC-like phenotype if present; counsel on blindness and quality of life.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
