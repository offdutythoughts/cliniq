// ── Wet Eye / Epiphora — diagnostic approach (data) ──────────────────────────
// Migration of wetEyeDx{History,Exam,Dx}Html (legacy HTML consts in
// ../wetEye.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const wetEyeDx: DxApproach = {
  title: 'Wet Eye / Epiphora',
  tabs: {

  history: {
    title: 'History: Wet Eye',
    blocks: [
      { kind: 'branch', text: 'CHARACTERISE THE EPIPHORA' },
      {
        kind: 'row',
        cols: 3,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">😣 Painful?</strong><br>
      Blepharospasm · rubbing<br>
      Photophobia · lacrimation<br>
      <span style="opacity:.75;">→ Production: surface disease / CN V irritation</span>`,
          },
          {
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">😐 Non-painful?</strong><br>
      Wet face, tear staining only<br>
      No squint, no rubbing<br>
      <span style="opacity:.75;">→ Drainage: NLS / conformational</span>`,
          },
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">🧪 Discharge character</strong><br>
      Serous (clear) vs mucoid vs mucopurulent<br>
      Unilateral vs bilateral<br>
      <span style="opacity:.75;">Mucopurulent → bacterial / dacryocystitis</span>`,
          },
        ],
      },
      { kind: 'step', text: '📋 ONSET + DURATION' },
      {
        kind: 'check',
        html: `<strong>Acute (hours–days):</strong> ulcer, foreign body, conjunctivitis, acute uveitis (with concurrent miosis + flare), ectopic cilia (often acute presentation despite chronic anatomy).<br>
    <strong>Subacute (days–weeks):</strong> dacryocystitis, KCS-related reflex tearing, persistent FB (grass awn under TEL), early uveitis, viral / allergic conjunctivitis.<br>
    <strong>Chronic / lifelong (months–years):</strong> congenital NLS atresia / micropuncta (puppy / kitten), distichiasis (often well-tolerated), brachycephalic ocular surface disease, ectropion / euryblepharon with poor drainage, pannus / plasmoma, idiopathic dacryocystitis (intermittent).<br>
    <strong>Chronic with discharge change:</strong> dacryocystitis (mucopurulent waxing/waning), orbital / nasal neoplasia (unilateral, progressive ± epistaxis).`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT + BREED CLUES' },
      {
        kind: 'breedClues',
        dog: [
          { breeds: ['Pug', 'Bulldog', 'Pekingese', 'Shih Tzu'], tone: 'warning', html: 'brachycephalic — multifactorial: lower NLS opening into the oropharynx, exposure keratopathy, macroblepharon, entropion, distichiasis. Tear staining classical.' },
          { breeds: ['Maltese', 'Toy Poodle', 'Bichon', 'Yorkshire Terrier'], tone: 'green', html: 'toy / miniature — cosmetic tear stain (chronic, non-painful), chronic KCS or distichiasis.' },
          { breeds: ['Cocker Spaniel'], tone: 'danger', html: 'ectropion + cherry eye + KCS + chronic dacryocystitis.' },
          { breeds: ['Cavalier King Charles Spaniel', 'West Highland White Terrier', 'Yorkshire Terrier', 'Bichon'], tone: 'warning', html: 'KCS — paradoxical reflex tearing.' },
          { breeds: ['German Shepherd', 'Greyhound', 'Husky'], tone: 'danger', html: 'pannus / plasmoma.' },
          { breeds: ['Young dog (&lt;1 yr), bilateral lifelong wet eyes'], group: 'signalment', tone: 'violet', html: 'puncta atresia / micropuncta — examine the puncta under sedation.' },
          { breeds: ['Older dog, unilateral epiphora ± epistaxis ± facial deformity'], group: 'signalment', tone: 'info', html: 'orbital or nasal neoplasia.' },
        ],
        cat: [
          { breeds: ['Persian', 'Himalayan', 'Exotic Shorthair'], tone: 'violet', html: 'brachycephalic ocular surface disease, lower-punctum malposition, entropion, corneal sequestrum, KCS.' },
          { breeds: ['Young cat, bilateral mucopurulent epiphora + sneezing'], group: 'signalment', tone: 'warning', html: 'feline URTI (FHV-1, FCV, Chlamydia, Mycoplasma).' },
          { breeds: ['Outdoor / hunting cat'], group: 'signalment', tone: 'danger', html: 'trauma, foreign body (grass awn), bite-wound dacryocystitis.' },
          { breeds: ['Senior cat, chronic unilateral epiphora ± facial swelling ± nasal discharge'], group: 'signalment', tone: 'green', html: 'nasal SCC, lymphoma, fungal rhinitis with NLS obstruction.' },
          { breeds: ['Kitten with symblepharon'], group: 'signalment', tone: 'info', html: 'severe neonatal FHV-1 with destroyed NLS punctum or canaliculus.' },
        ],
      },
      { kind: 'step', text: '💊 OTHER HISTORY' },
      {
        kind: 'check',
        html: `<strong>Drugs / topicals:</strong> recent topical anaesthetic or NSAID (reflex tearing as confounder); sulfonamides, etodolac (drug-induced KCS — paradoxical tearing as KCS evolves); recent dental / nasal surgery (post-op NLS damage).<br>
    <strong>Trauma:</strong> facial or eyelid trauma can lacerate the canaliculi or puncta and cause persistent epiphora; corneal abrasion produces acute reflex tearing.<br>
    <strong>Concurrent dermatitis:</strong> atopy / food allergy → allergic conjunctivitis with bilateral serous tearing.<br>
    <strong>Recent grooming / scenting:</strong> chemical irritation or grass-seed exposure (often unilateral acute wet eye with blepharospasm).<br>
    <strong>Owner-perceived tear-staining vs true epiphora:</strong> cosmetic discoloration of fur without active disease is common — examine carefully before recommending treatment.`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS',
        html: `Acute unilateral wet eye + severe blepharospasm = FB or ulcer until proven otherwise · Chronic unilateral epiphora + epistaxis = nasal neoplasia · Mucopurulent epiphora unresponsive to topicals = consider dacryocystitis · Young dog with bilateral epiphora + no discomfort = congenital NLS anomaly · Concurrent KCS + reflex tearing = STT before any drops`,
        gap: 12,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Wet Eye',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — OBSERVE BEFORE TOUCHING' },
      {
        kind: 'check',
        html: `• <strong>Tear track location:</strong> medial canthus (early epiphora — overflow), full face track (chronic / severe).<br>
    • <strong>Discharge character:</strong> serous, mucoid, mucopurulent, sanguineous.<br>
    • <strong>Blepharospasm / photophobia:</strong> pain → production cause.<br>
    • <strong>Eyelid conformation:</strong> entropion, ectropion, macroblepharon (visible sclera), eyelid coloboma, diamond eye (entropion + ectropion + macroblepharon).<br>
    • <strong>Globe position:</strong> exophthalmos (orbital mass / NLS compression), proptosis history.<br>
    • <strong>Facial symmetry:</strong> unilateral facial swelling → dacryocystitis, abscess, neoplasia.`,
      },
      { kind: 'step', text: '👁️ STEP 2 — STRUCTURED OCULAR EXAM' },
      {
        kind: 'check',
        html: `<strong>1. Eyelids:</strong> evert upper + lower with magnification — look for distichiasis (extra hairs from Meibomian gland openings), ectopic cilia (through palpebral conjunctiva — usually dorsal cornea linear ulcer), trichiasis (normal-position hairs contacting cornea), entropion / ectropion, eyelid mass.<br>
    <strong>2. Third eyelid (TEL):</strong> evert under topical anaesthetic — FB classically hides here (grass awn, plant material), follicular hyperplasia, cherry eye, plasmoma.<br>
    <strong>3. Conjunctiva:</strong> hyperaemia distribution, chemosis, FB, neoplasia.<br>
    <strong>4. Cornea:</strong> ulceration (fluorescein), neovascularisation pattern (superficial branching vs deep brush), sequestrum (cat), pannus (GSD).<br>
    <strong>5. Lacrimal puncta:</strong> identify upper and lower puncta with magnification ± brief sedation — atresia, micropuncta, scarring, FB (a grass-awn fragment lodged in the punctum is easy to miss).<br>
    <strong>6. Iris / pupil / AC:</strong> miosis + flare = uveitis (reflex tearing common); rule out before steroids.<br>
    <strong>7. NLS region:</strong> palpate medial canthus and rostromedial maxilla for swelling (dacryocystitis), fluctuance (abscess), or firm mass (neoplasia). Expressing the lacrimal sac may produce purulent material from the upper punctum — diagnostic of dacryocystitis.`,
      },
      { kind: 'step', text: '🔍 STEP 3 — PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Unilateral acute serous epiphora + blepharospasm + FB visible</div><div style="color:var(--tone-danger-fg);">Conjunctival / corneal FB · ectopic cilia</div>
      <div>Unilateral acute + fluorescein-positive defect + reflex miosis</div><div style="color:var(--tone-danger-fg);">Ulcerative keratitis (with reflex uveitis)</div>
      <div>Bilateral mucopurulent + lower STT + dull cornea</div><div style="color:var(--tone-warning-fg);">Keratoconjunctivitis sicca (KCS)</div>
      <div>Bilateral serous + chemosis + atopic dermatitis</div><div style="color:var(--tone-green-fg);">Allergic conjunctivitis</div>
      <div>Bilateral serous + sneezing + nasal discharge + young cat</div><div style="color:var(--tone-green-fg);">Feline URTI (FHV-1, FCV, Chlamydia)</div>
      <div>Unilateral chronic mucopurulent + medial canthal swelling + reflux on lacrimal sac press</div><div style="color:var(--tone-warning-fg);">Dacryocystitis</div>
      <div>Chronic bilateral wet eye in young dog + no discomfort + small/absent puncta</div><div style="color:var(--tone-info-fg);">Congenital puncta atresia / micropuncta</div>
      <div>Chronic unilateral wet eye + epistaxis ± facial deformity + older animal</div><div style="color:var(--tone-danger-title);">Nasal / orbital neoplasia</div>
      <div>Concurrent entropion + ectropion + macroblepharon (large eyelid opening)</div><div style="color:var(--tone-warning-fg);">Diamond eye conformation</div>
      <div>Photophobia + blepharospasm but no surface lesion identified</div><div style="color:var(--tone-danger-fg);">Anterior uveitis (rule out flare + IOP)</div>
    </div>`,
      },
      { kind: 'step', text: '🧪 STEP 4 — PROXYMETACAINE / PROPARACAINE TEST FOR PAIN' },
      {
        kind: 'check',
        html: `Apply one drop of topical anaesthetic and observe blepharospasm + tearing within 2–3 minutes:<br>
    • <strong>Spasm resolves</strong> → painful surface disease (ulcer, FB, ectopic cilia, distichiasis, KCS irritation) → re-examine for the source now that the eyelid is relaxed.<br>
    • <strong>Spasm persists</strong> → likely true entropion or deeper pain (uveitis, orbital, dental) → surgical correction or further workup needed.<br>
    • Useful in <strong>spastic vs true entropion</strong>: spastic entropion is secondary to surface pain and resolves with relief; true entropion persists and requires Hotz-Celsus or similar correction.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Wet Eye — Diagnostics',
    blocks: [
      { kind: 'step', text: 'STEP 1 — STANDARD OPHTHALMIC BATTERY (ORDER MATTERS)' },
      {
        kind: 'check',
        html: `1. <strong>Schirmer Tear Test (STT-1) FIRST</strong> — before any drops; KCS with paradoxical mucoid epiphora is the classical pitfall.<br>
    2. <strong>Conjunctival cytology / swab</strong> if mucopurulent — Gram stain, culture + sensitivity, PCR (Chlamydia / Mycoplasma in cats).<br>
    3. <strong>Fluorescein stain</strong> — rule out ulcer + perform the <strong>Jones test</strong> simultaneously (no rinse; watch nostril ≤ 4 min).<br>
    4. <strong>Tonometry</strong> — exclude uveitis (↓ IOP) and glaucoma (↑ IOP) as occult drivers.<br>
    5. <strong>Topical anaesthetic + magnified eyelid exam</strong> — evert lids and TEL; look for distichiasis, ectopic cilia, conjunctival FB, puncta atresia.<br>
    6. <strong>Direct + indirect ophthalmoscopy</strong> after pupil dilation (tropicamide 1% — after IOP).`,
      },
      { kind: 'step', text: 'STEP 2 — JONES TEST + NASOLACRIMAL FLUSH' },
      {
        kind: 'check',
        html: `<strong>Jones test:</strong> apply fluorescein into the lateral conjunctival fornix without rinsing; observe ipsilateral nostril (or oropharynx in brachycephalics) for ≤ 4 min.<br>
    • Stain at nostril → patent system (Jones positive) — focus on increased production differentials.<br>
    • No stain → does NOT confirm obstruction — many normal dogs (especially brachycephalics) are Jones-negative.<br><br>
    <strong>NLS flush (confirmatory):</strong> under topical anaesthetic (± sedation in cats / fractious dogs) cannulate the upper punctum with a 22–24 G blunt-ended cannula. Inject 3–5 mL warm sterile saline.<br>
    • Free flow out of the nostril and / or lower punctum → patent NLS.<br>
    • No flow or backflow → obstruction; submit fluid for cytology / culture if mucopurulent; consider grass-awn or other FB.<br>
    • Excessive resistance → consider dacryolith or stricture.<br><br>
    <strong>Dacryocystorhinography</strong> (contrast NLS imaging, if needed): inject iohexol into the upper punctum and image with x-ray / fluoroscopy. Identifies strictures, dacryoliths, fistulas, neoplasia compression.<br><br>
    <strong>Lacrimal sac expression:</strong> apply gentle pressure over the medial canthus / lacrimal sac and watch the upper punctum for purulent reflux — diagnostic of dacryocystitis. Submit material for cytology + C&amp;S.`,
      },
      { kind: 'step', text: 'STEP 3 — TARGETED ADVANCED IMAGING' },
      {
        kind: 'check',
        html: `<strong>CT of skull / orbit</strong> (gold standard for NLS / orbital pathology in adult / senior patients):<br>
    • Confirms patency or obstruction at any level along the NLS<br>
    • Defines neoplasia (orbital, nasal, paranasal sinus) compressing the NLS — "Bonny disease"<br>
    • Identifies dental disease causing maxillary / lacrimal sac involvement<br>
    • Identifies dacryolith / FB causing chronic dacryocystitis<br><br>
    <strong>MRI</strong> — better soft-tissue resolution for orbital / retrobulbar mass, optic nerve sheath disease.<br><br>
    <strong>Rhinoscopy + nasal biopsy</strong> — for chronic unilateral epiphora + nasal signs (epistaxis, sneezing, facial deformity).<br><br>
    <strong>Dental imaging</strong> — caudal maxillary tooth root disease can erode into the NLS or lacrimal sac and present as chronic epiphora ± dacryocystitis.`,
      },
      { kind: 'step', text: 'STEP 4 — TREATMENT OF SPECIFIC CAUSES' },
      {
        kind: 'check',
        html: `<strong>Increased production (CN V irritation):</strong>
    <div style="margin-left:8px;">
      • Ulcer / FB: remove FB · topical broad-spectrum antibiotic · topical atropine if reflex uveitis · E-collar (LOC-RE-CORNEA-SUP).<br>
      • Distichiasis: cryoepilation / electroepilation / surgical excision.<br>
      • Ectopic cilia: en-bloc surgical resection (recurrent dorsal ulcer in young dog).<br>
      • Entropion: Hotz-Celsus or breed-specific procedure; rule out spastic entropion with proxymetacaine first.<br>
      • Trichiasis: trim hairs (medial canthal trichiasis in brachycephalics); medial canthoplasty if structural.<br>
      • KCS: topical cyclosporine 0.2–2% BID lifelong; treat secondary bacterial infection (LOC-RE-CONJ-KCS).<br>
      • Conjunctivitis: cytology-guided topical antibiotic; doxycycline systemic for Chlamydia / Mycoplasma in cats.<br>
      • Anterior uveitis: topical steroid + atropine + treat underlying cause (LOC-RE-UVEA).
    </div>
    <strong>Reduced drainage:</strong>
    <div style="margin-left:8px;">
      • Lacrimal puncta atresia: surgical resection of the membrane covering the punctum.<br>
      • Micropuncta: surgical enlargement (snip / canthoplasty).<br>
      • Dacryocystitis: NLS flush + topical antibiotic; consider indwelling silicone NLS catheter for 2–4 wks; investigate for occult FB.<br>
      • Entropion / ectropion / euryblepharon / diamond eye: surgical correction (Hotz-Celsus, modified Kuhnt-Szymanowski, lateral canthoplasty).<br>
      • Orbital / nasal neoplasia: refer for staging + oncology (CT, biopsy, radiation / chemo / palliation).
    </div>`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Pearls:</strong><br>
  • STT before any drops — KCS with paradoxical reflex tearing is missed otherwise.<br>
  • Tear stain alone in a brachycephalic / toy breed without ocular pain or discharge is often cosmetic — do not over-treat.<br>
  • Foreign bodies under the TEL are a classic miss — always evert.<br>
  • Topical broad-spectrum antibiotics will not resolve dacryocystitis without addressing the obstruction.<br>
  • A persistent unilateral wet eye in an older patient should never be dismissed as "tear staining" — image to exclude orbital / nasal neoplasia.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
