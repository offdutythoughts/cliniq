// ── THE WET EYE / EPIPHORA — clinical sign + diagnostic approach ───────────
// Source: resources/2. The wet eye.pdf + resources/1. Clinical examination of the eye.pdf

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const wetEyeFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">💧 WET EYE / EPIPHORA</div>
  <div class="flow-arrow-v">↓</div>
  <div class="flow-node step">INCREASED PRODUCTION vs REDUCED DRAINAGE<br><span style="font-size:10px;color:var(--gray);font-weight:400">Jones test + ocular pain assessment</span></div>
  <div class="flow-arrow-v">↓</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
    <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-WE-PROD','Increased tear production')">😣 Increased production<br><span style="font-size:9px;opacity:.7">CN V irritation — ulcer · FB · distichiasis · ectopic cilia · entropion · uveitis</span></div>
    <div class="flow-node exp" style="cursor:pointer;font-size:11px;" onclick="goLesionTab('LOC-WE-DRAIN','Reduced tear drainage')">🚫 Reduced drainage<br><span style="font-size:9px;opacity:.7">NLS atresia · puncta · NLS obstruction · eyelid conformation</span></div>
  </div>

  <div style="margin-top:14px;padding:10px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:6px;">🔍 JONES TEST — DRAINAGE PATENCY</div>
    <div style="font-size:10px;line-height:1.55;color:rgba(196,181,253,.9);">
      Apply fluorescein stain to the conjunctival fornix, do <strong>NOT</strong> rinse, wait ≤ 4 min and observe the ipsilateral nostril (or oropharynx in brachycephalics).<br>
      • <strong>Stain at nostril</strong> → patent nasolacrimal system → suspect <strong>increased production</strong> (CN V irritation: ulcer, FB, ectopic cilia, distichiasis, uveitis, KCS).<br>
      • <strong>No stain at nostril after 4 min</strong> → not necessarily blocked — many normal dogs (esp. brachycephalics) fail Jones. Confirm with <strong>NLS flushing</strong>: cannulate the upper punctum with a 22–24 G blunt cannula + saline, expect outflow from nostril and / or lower punctum.<br>
      • <strong>Confirmed obstruction</strong> → look for foreign body (grass awn, hair), dacryocystitis, congenital atresia / micropuncta (&lt;1 yr old), or neoplasia (older patient — orbital / nasal).
    </div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#F87171;margin-bottom:6px;">⚠️ DO NOT MISS — TREATABLE & SIGHT-RELEVANT</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Ectopic cilia</strong> — recurrent dorsal corneal ulcer in a young dog → must evert the eyelid under magnification<br>
      • <strong>Foreign body under the third eyelid</strong> — always evert the TEL under topical anaesthetic in any acute unilateral wet eye<br>
      • <strong>Subclinical KCS</strong> — early KCS can present with paradoxical reflex tearing (low STT but mucoid epiphora) before full lacrimal failure<br>
      • <strong>Dacryocystitis with mucopurulent discharge</strong> — often masquerades as bacterial conjunctivitis; antibiotics fail without flushing the NLS<br>
      • <strong>Older patient with unilateral chronic epiphora ± epistaxis ± facial deformity</strong> → orbital / nasal neoplasia obstructing the NLS<br>
      • <strong>Bilateral chronic wet eye in a young dog with no ocular discomfort</strong> → consider congenital puncta atresia or micropuncta
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:11px;color:#93C5FD;text-align:center;width:100%;">
    Tap a branch to drill down to specific causes
  </div>
</div>
`;

// ── Tab nav helper ─────────────────────────────────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxWetEyeHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxWetEyeExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxWetEyeDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const wetEyeDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">CHARACTERISE THE EPIPHORA</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c3">
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">😣 Painful?</strong><br>
      Blepharospasm · rubbing<br>
      Photophobia · lacrimation<br>
      <span style="opacity:.75;">→ Production: surface disease / CN V irritation</span>
    </div>
    <div class="dx-test" style="text-align:left;background:#0D7377;font-size:9px;">
      <strong style="font-size:10px;">😐 Non-painful?</strong><br>
      Wet face, tear staining only<br>
      No squint, no rubbing<br>
      <span style="opacity:.75;">→ Drainage: NLS / conformational</span>
    </div>
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">🧪 Discharge character</strong><br>
      Serous (clear) vs mucoid vs mucopurulent<br>
      Unilateral vs bilateral<br>
      <span style="opacity:.75;">Mucopurulent → bacterial / dacryocystitis</span>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 ONSET + DURATION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Acute (hours–days):</strong> ulcer, foreign body, conjunctivitis, acute uveitis (with concurrent miosis + flare), ectopic cilia (often acute presentation despite chronic anatomy).<br>
    <strong>Subacute (days–weeks):</strong> dacryocystitis, KCS-related reflex tearing, persistent FB (grass awn under TEL), early uveitis, viral / allergic conjunctivitis.<br>
    <strong>Chronic / lifelong (months–years):</strong> congenital NLS atresia / micropuncta (puppy / kitten), distichiasis (often well-tolerated), brachycephalic ocular surface disease, ectropion / euryblepharon with poor drainage, pannus / plasmoma, idiopathic dacryocystitis (intermittent).<br>
    <strong>Chronic with discharge change:</strong> dacryocystitis (mucopurulent waxing/waning), orbital / nasal neoplasia (unilateral, progressive ± epistaxis).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🐾 SIGNALMENT + BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:#FCD34D;">Brachycephalic</strong> (Pug, Bulldog, Pekingese, Shih Tzu, Persian-cross)<br>→ Multi-factorial: lower NLS opening into oropharynx, exposure keratopathy, macroblepharon, entropion, distichiasis. Tear staining classical.<br><br>
        <strong style="color:#6EE7B7;">Toy / Mini breeds</strong> (Maltese, Toy Poodle, Bichon, Yorkie)<br>→ Cosmetic tear-stain (chronic, non-painful) and chronic KCS or distichiasis.<br><br>
        <strong style="color:#FCA5A5;">Cocker Spaniel</strong> → ectropion + cherry eye + KCS + chronic dacryocystitis.<br><br>
        <strong style="color:#FCD34D;">Cavalier King Charles Spaniel, Westie, Yorkie, Bichon</strong> → KCS — paradoxical reflex tearing.<br><br>
        <strong style="color:#C4B5FD;">Young dog (&lt;1 yr) with bilateral lifelong wet eyes</strong> → puncta atresia / micropuncta — examine puncta under sedation.<br><br>
        <strong style="color:#FCA5A5;">German Shepherd, Greyhound, Husky</strong> → pannus / plasmoma.<br><br>
        <strong style="color:#93C5FD;">Older dog, unilateral epiphora ± epistaxis ± facial deformity</strong> → orbital or nasal neoplasia.
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:#C4B5FD;">Persian / Himalayan / Exotic SH</strong><br>→ Brachycephalic ocular surface disease, lower-punctum malposition, entropion, corneal sequestrum, KCS.<br><br>
        <strong style="color:#FCD34D;">Young cat with bilateral mucopurulent epiphora + sneezing</strong> → feline URTI (FHV-1, FCV, Chlamydia, Mycoplasma).<br><br>
        <strong style="color:#FCA5A5;">Outdoor / hunting cat</strong> → trauma, FB (grass awn), bite-wound dacryocystitis.<br><br>
        <strong style="color:#6EE7B7;">Senior cat with chronic unilateral epiphora ± facial swelling ± nasal discharge</strong> → nasal SCC, lymphoma, fungal rhinitis with NLS obstruction.<br><br>
        <strong style="color:#93C5FD;">Kitten with concurrent symblepharon</strong> → severe neonatal FHV-1 with destroyed NLS punctum or canaliculus.
      </div>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💊 OTHER HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Drugs / topicals:</strong> recent topical anaesthetic or NSAID (reflex tearing as confounder); sulfonamides, etodolac (drug-induced KCS — paradoxical tearing as KCS evolves); recent dental / nasal surgery (post-op NLS damage).<br>
    <strong>Trauma:</strong> facial or eyelid trauma can lacerate the canaliculi or puncta and cause persistent epiphora; corneal abrasion produces acute reflex tearing.<br>
    <strong>Concurrent dermatitis:</strong> atopy / food allergy → allergic conjunctivitis with bilateral serous tearing.<br>
    <strong>Recent grooming / scenting:</strong> chemical irritation or grass-seed exposure (often unilateral acute wet eye with blepharospasm).<br>
    <strong>Owner-perceived tear-staining vs true epiphora:</strong> cosmetic discoloration of fur without active disease is common — examine carefully before recommending treatment.
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Acute unilateral wet eye + severe blepharospasm = FB or ulcer until proven otherwise · Chronic unilateral epiphora + epistaxis = nasal neoplasia · Mucopurulent epiphora unresponsive to topicals = consider dacryocystitis · Young dog with bilateral epiphora + no discomfort = congenital NLS anomaly · Concurrent KCS + reflex tearing = STT before any drops
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const wetEyeDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 STEP 1 — OBSERVE BEFORE TOUCHING</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    • <strong>Tear track location:</strong> medial canthus (early epiphora — overflow), full face track (chronic / severe).<br>
    • <strong>Discharge character:</strong> serous, mucoid, mucopurulent, sanguineous.<br>
    • <strong>Blepharospasm / photophobia:</strong> pain → production cause.<br>
    • <strong>Eyelid conformation:</strong> entropion, ectropion, macroblepharon (visible sclera), eyelid coloboma, diamond eye (entropion + ectropion + macroblepharon).<br>
    • <strong>Globe position:</strong> exophthalmos (orbital mass / NLS compression), proptosis history.<br>
    • <strong>Facial symmetry:</strong> unilateral facial swelling → dacryocystitis, abscess, neoplasia.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👁️ STEP 2 — STRUCTURED OCULAR EXAM</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>1. Eyelids:</strong> evert upper + lower with magnification — look for distichiasis (extra hairs from Meibomian gland openings), ectopic cilia (through palpebral conjunctiva — usually dorsal cornea linear ulcer), trichiasis (normal-position hairs contacting cornea), entropion / ectropion, eyelid mass.<br>
    <strong>2. Third eyelid (TEL):</strong> evert under topical anaesthetic — FB classically hides here (grass awn, plant material), follicular hyperplasia, cherry eye, plasmoma.<br>
    <strong>3. Conjunctiva:</strong> hyperaemia distribution, chemosis, FB, neoplasia.<br>
    <strong>4. Cornea:</strong> ulceration (fluorescein), neovascularisation pattern (superficial branching vs deep brush), sequestrum (cat), pannus (GSD).<br>
    <strong>5. Lacrimal puncta:</strong> identify upper and lower puncta with magnification ± brief sedation — atresia, micropuncta, scarring, FB (a grass-awn fragment lodged in the punctum is easy to miss).<br>
    <strong>6. Iris / pupil / AC:</strong> miosis + flare = uveitis (reflex tearing common); rule out before steroids.<br>
    <strong>7. NLS region:</strong> palpate medial canthus and rostromedial maxilla for swelling (dacryocystitis), fluctuance (abscess), or firm mass (neoplasia). Expressing the lacrimal sac may produce purulent material from the upper punctum — diagnostic of dacryocystitis.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔍 STEP 3 — PATTERN RECOGNITION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Unilateral acute serous epiphora + blepharospasm + FB visible</div><div style="color:#FCA5A5;">Conjunctival / corneal FB · ectopic cilia</div>
      <div>Unilateral acute + fluorescein-positive defect + reflex miosis</div><div style="color:#FCA5A5;">Ulcerative keratitis (with reflex uveitis)</div>
      <div>Bilateral mucopurulent + lower STT + dull cornea</div><div style="color:#FCD34D;">Keratoconjunctivitis sicca (KCS)</div>
      <div>Bilateral serous + chemosis + atopic dermatitis</div><div style="color:#6EE7B7;">Allergic conjunctivitis</div>
      <div>Bilateral serous + sneezing + nasal discharge + young cat</div><div style="color:#6EE7B7;">Feline URTI (FHV-1, FCV, Chlamydia)</div>
      <div>Unilateral chronic mucopurulent + medial canthal swelling + reflux on lacrimal sac press</div><div style="color:#FCD34D;">Dacryocystitis</div>
      <div>Chronic bilateral wet eye in young dog + no discomfort + small/absent puncta</div><div style="color:#93C5FD;">Congenital puncta atresia / micropuncta</div>
      <div>Chronic unilateral wet eye + epistaxis ± facial deformity + older animal</div><div style="color:#F87171;">Nasal / orbital neoplasia</div>
      <div>Concurrent entropion + ectropion + macroblepharon (large eyelid opening)</div><div style="color:#FCD34D;">Diamond eye conformation</div>
      <div>Photophobia + blepharospasm but no surface lesion identified</div><div style="color:#FCA5A5;">Anterior uveitis (rule out flare + IOP)</div>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🧪 STEP 4 — PROXYMETACAINE / PROPARACAINE TEST FOR PAIN</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Apply one drop of topical anaesthetic and observe blepharospasm + tearing within 2–3 minutes:<br>
    • <strong>Spasm resolves</strong> → painful surface disease (ulcer, FB, ectopic cilia, distichiasis, KCS irritation) → re-examine for the source now that the eyelid is relaxed.<br>
    • <strong>Spasm persists</strong> → likely true entropion or deeper pain (uveitis, orbital, dental) → surgical correction or further workup needed.<br>
    • Useful in <strong>spastic vs true entropion</strong>: spastic entropion is secondary to surface pain and resolves with relief; true entropion persists and requires Hotz-Celsus or similar correction.
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const wetEyeDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step">STEP 1 — STANDARD OPHTHALMIC BATTERY (ORDER MATTERS)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    1. <strong>Schirmer Tear Test (STT-1) FIRST</strong> — before any drops; KCS with paradoxical mucoid epiphora is the classical pitfall.<br>
    2. <strong>Conjunctival cytology / swab</strong> if mucopurulent — Gram stain, culture + sensitivity, PCR (Chlamydia / Mycoplasma in cats).<br>
    3. <strong>Fluorescein stain</strong> — rule out ulcer + perform the <strong>Jones test</strong> simultaneously (no rinse; watch nostril ≤ 4 min).<br>
    4. <strong>Tonometry</strong> — exclude uveitis (↓ IOP) and glaucoma (↑ IOP) as occult drivers.<br>
    5. <strong>Topical anaesthetic + magnified eyelid exam</strong> — evert lids and TEL; look for distichiasis, ectopic cilia, conjunctival FB, puncta atresia.<br>
    6. <strong>Direct + indirect ophthalmoscopy</strong> after pupil dilation (tropicamide 1% — after IOP).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — JONES TEST + NASOLACRIMAL FLUSH</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Jones test:</strong> apply fluorescein into the lateral conjunctival fornix without rinsing; observe ipsilateral nostril (or oropharynx in brachycephalics) for ≤ 4 min.<br>
    • Stain at nostril → patent system (Jones positive) — focus on increased production differentials.<br>
    • No stain → does NOT confirm obstruction — many normal dogs (especially brachycephalics) are Jones-negative.<br><br>
    <strong>NLS flush (confirmatory):</strong> under topical anaesthetic (± sedation in cats / fractious dogs) cannulate the upper punctum with a 22–24 G blunt-ended cannula. Inject 3–5 mL warm sterile saline.<br>
    • Free flow out of the nostril and / or lower punctum → patent NLS.<br>
    • No flow or backflow → obstruction; submit fluid for cytology / culture if mucopurulent; consider grass-awn or other FB.<br>
    • Excessive resistance → consider dacryolith or stricture.<br><br>
    <strong>Dacryocystorhinography</strong> (contrast NLS imaging, if needed): inject iohexol into the upper punctum and image with x-ray / fluoroscopy. Identifies strictures, dacryoliths, fistulas, neoplasia compression.<br><br>
    <strong>Lacrimal sac expression:</strong> apply gentle pressure over the medial canthus / lacrimal sac and watch the upper punctum for purulent reflux — diagnostic of dacryocystitis. Submit material for cytology + C&amp;S.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3 — TARGETED ADVANCED IMAGING</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>CT of skull / orbit</strong> (gold standard for NLS / orbital pathology in adult / senior patients):<br>
    • Confirms patency or obstruction at any level along the NLS<br>
    • Defines neoplasia (orbital, nasal, paranasal sinus) compressing the NLS — "Bonny disease"<br>
    • Identifies dental disease causing maxillary / lacrimal sac involvement<br>
    • Identifies dacryolith / FB causing chronic dacryocystitis<br><br>
    <strong>MRI</strong> — better soft-tissue resolution for orbital / retrobulbar mass, optic nerve sheath disease.<br><br>
    <strong>Rhinoscopy + nasal biopsy</strong> — for chronic unilateral epiphora + nasal signs (epistaxis, sneezing, facial deformity).<br><br>
    <strong>Dental imaging</strong> — caudal maxillary tooth root disease can erode into the NLS or lacrimal sac and present as chronic epiphora ± dacryocystitis.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — TREATMENT OF SPECIFIC CAUSES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Increased production (CN V irritation):</strong>
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
    </div>
  </div>

</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Pearls:</strong><br>
  • STT before any drops — KCS with paradoxical reflex tearing is missed otherwise.<br>
  • Tear stain alone in a brachycephalic / toy breed without ocular pain or discharge is often cosmetic — do not over-treat.<br>
  • Foreign bodies under the TEL are a classic miss — always evert.<br>
  • Topical broad-spectrum antibiotics will not resolve dacryocystitis without addressing the obstruction.<br>
  • A persistent unilateral wet eye in an older patient should never be dismissed as "tear staining" — image to exclude orbital / nasal neoplasia.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
