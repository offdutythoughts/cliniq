// ── RED EYE — clinical sign + diagnostic approach ───────────────────────────
// Source: resources/6. The red eye.pdf, resources/1. Clinical examination of the eye.pdf
//
// Module exports HTML constant strings consumed by render wrappers in cliniqApp.ts.
// onclick handlers reference global window functions exposed at the bottom of cliniqApp.ts.

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const redEyeFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">🔴 RED EYE</div>
  <div class="flow-arrow-v">↓</div>
  <div class="flow-node step">WHERE IS THE REDNESS?<br><span style="font-size:10px;color:var(--gray);font-weight:400">Ocular coats vs iris hyperaemia vs intraocular bleed vs retrobulbar</span></div>
  <div class="flow-arrow-v">↓</div>

  <!-- 4 pattern columns -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;width:100%;">
    <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="renderRedEyeCoats()">🩸 Ocular coats<br><span style="font-size:9px;opacity:.7">eyelid · TEL · conj · episcl · cornea</span></div>
    <div class="flow-node exp" style="cursor:pointer;font-size:11px;" onclick="renderRedEyeIris()">🟣 Iris hyperaemia<br><span style="font-size:9px;opacity:.7">rubeosis · PIFM · uveal mass</span></div>
    <div class="flow-node rest" style="cursor:pointer;font-size:11px;" onclick="renderRedEyeBleed()">🩸 Intraocular bleed<br><span style="font-size:9px;opacity:.7">hyphaema · vitreal · retinal</span></div>
    <div class="flow-node mixed" style="cursor:pointer;font-size:11px;" onclick="renderRedEyeOrbit()">🦴 Retrobulbar<br><span style="font-size:9px;opacity:.7">orbital cellulitis · neoplasia</span></div>
  </div>

  <div style="margin-top:14px;padding:10px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:8px;">🔍 CONJUNCTIVAL vs EPISCLERAL INJECTION — KEY DISCRIMINATOR</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">Conjunctival hyperaemia</div>
        • Dichotomous (tree-like) branching<br>
        • Superficial — MOVES with conjunctiva on cotton-tip<br>
        • Most evident in the <strong>fornixes</strong><br>
        • Blanches rapidly with topical phenylephrine 2.5%<br>
        <strong style="color:#FCD34D;">⇒ Ocular surface disease</strong>
      </div>
      <div style="font-size:9.5px;line-height:1.5;background:rgba(168,85,247,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:#C4B5FD;font-weight:700;margin-bottom:3px;">Episcleral hyperaemia</div>
        • No dichotomous division — straight radial vessels<br>
        • Deeper — does <strong>NOT move</strong> with the conjunctiva<br>
        • Most evident close to the <strong>limbus</strong><br>
        • Blanches with phenylephrine 2.5% (slower / less complete than conjunctival — scleritis vessels do NOT blanch)<br>
        <strong style="color:#F87171;">⇒ Deeper / intraocular disease (uveitis, glaucoma, scleritis)</strong>
      </div>
    </div>
    <div style="margin-top:7px;font-size:9.5px;line-height:1.6;color:rgba(196,181,253,.8);">
      💡 <strong style="color:#C4B5FD;">Superficial corneal vascularisation</strong> = long, branching ("trees") → surface disease.<br>
      💡 <strong style="color:#C4B5FD;">Deep corneal vascularisation</strong> = short, straight, deep red ("brush") → uveitis or glaucoma.
    </div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#F87171;margin-bottom:6px;">⚡ SIGHT-THREATENING RED EYE — DO NOT MISS</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Acute glaucoma</strong> — episcleral congestion + mydriasis + corneal oedema + IOP &gt;25 mmHg → sight loss within hours<br>
      • <strong>Anterior uveitis</strong> — miosis + aqueous flare + ↓ IOP → if untreated → secondary glaucoma, blindness<br>
      • <strong>Deep / melting ulcer</strong> — stromal loss + Seidel-positive → globe rupture<br>
      • <strong>Hyphaema with hypertension</strong> — measure BP; uncontrolled HT can blind quickly<br>
      • <strong>Globe rupture / corneal laceration</strong> — minimise handling, no tonometry, refer
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:11px;color:#93C5FD;text-align:center;width:100%;">
    Tap a region to see lesion types and urgency
  </div>
</div>
`;

// ── Sub-region flow → endpoint cards (route to existing goLesionTab) ─────
export const redEyeCoatsHtml = `
<div class="fn fn-insp">🩸 OCULAR COATS</div>
<div class="fn-arrow">↓</div>
<div class="fn fn-step">SUB-LOCALISE</div>
<div class="fn-arrow">↓</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-nasal" onclick="goLesionTab('LOC-RE-ADNEXA','Eyelids / Adnexa')">
    <div class="ep-sys">Periocular skin · Meibomian · Eyelid margin</div>
    <div class="ep-loc">Eyelids / Adnexa</div>
  </div>
  <div class="fn-ep fn-ep-larynx" onclick="goLesionTab('LOC-RE-TEL','Third eyelid')">
    <div class="ep-sys">TEL — cartilage · gland · lymphoid</div>
    <div class="ep-loc">Third eyelid</div>
  </div>
</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-RE-CONJ','Conjunctiva')">
    <div class="ep-sys">Dichotomous · moves with cotton-tip · fornixes</div>
    <div class="ep-loc">Conjunctiva</div>
  </div>
  <div class="fn-ep fn-ep-mechanic" onclick="goLesionTab('LOC-RE-EPISC','Episclera / Sclera')">
    <div class="ep-sys">Straight radial · no movement · limbal</div>
    <div class="ep-loc">Episclera / Sclera</div>
  </div>
</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-RE-CORNEA-SUP','Cornea — surface')">
    <div class="ep-sys">Superficial neovascularisation ("trees")</div>
    <div class="ep-loc">Cornea — surface disease</div>
  </div>
  <div class="fn-ep fn-ep-larynx" onclick="goLesionTab('LOC-RE-CORNEA-DEEP','Cornea — deep')">
    <div class="ep-sys">Deep neovascularisation ("brush") at limbus</div>
    <div class="ep-loc">Cornea — deep / intraocular signal</div>
  </div>
</div>
`;

export const redEyeIrisHtml = `
<div class="fn fn-exp">🟣 IRIS HYPERAEMIA</div>
<div class="fn-arrow">↓</div>
<div class="fn fn-step">DIFFERENTIATE MECHANISM</div>
<div class="fn-arrow">↓</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-nasal" onclick="goLesionTab('LOC-RE-UVEA','Anterior uvea — uveitis')">
    <div class="ep-sys">Engorgement of normal vasculature · most common cause</div>
    <div class="ep-loc">Anterior uveitis</div>
  </div>
  <div class="fn-ep fn-ep-larynx" onclick="goLesionTab('LOC-RE-UVEA','Anterior uvea — rubeosis / PIFM')">
    <div class="ep-sys">Pre-iridal fibrovascular membranes — chronic insult</div>
    <div class="ep-loc">Iris rubeosis / PIFM</div>
  </div>
</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-RE-UVEA','Iris mass / neoplasia')">
    <div class="ep-sys">Pigmented or vascular mass · iris cyst differential</div>
    <div class="ep-loc">Iris neoplasia</div>
  </div>
  <div class="fn-ep fn-ep-mechanic" onclick="goLesionTab('LOC-RE-AC','Hyphaema / iris bleed')">
    <div class="ep-sys">Bleed into anterior chamber</div>
    <div class="ep-loc">Anterior chamber bleed</div>
  </div>
</div>
<div style="margin-top:10px;padding:9px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;font-size:10px;line-height:1.55;color:#C4B5FD;width:100%;">
  💡 <strong>True iris rubeosis</strong> = new vessel growth across the iris surface (PIFM) — usually chronic uveitis, intraocular tumour, retinal detachment or glaucoma. Distinguish from simple <strong>uveitic hyperaemia</strong> (reversible engorgement) by chronicity, response to anti-inflammatories, and ultrasound for posterior segment disease.
</div>
`;

export const redEyeBleedHtml = `
<div class="fn fn-rest">🩸 INTRAOCULAR BLEED</div>
<div class="fn-arrow">↓</div>
<div class="fn fn-step">LOCALISE BLEED</div>
<div class="fn-arrow">↓</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-RE-AC','Anterior chamber — hyphaema')">
    <div class="ep-sys">Blood in AC ± hypopyon ± aqueous flare</div>
    <div class="ep-loc">Hyphaema</div>
    <div class="ep-badge">⚠️ CHECK BP + COAGS</div>
  </div>
  <div class="fn-ep fn-ep-mechanic" onclick="goLesionTab('LOC-RE-AC','Vitreal cavity bleed')">
    <div class="ep-sys">Posterior segment haemorrhage · obscures fundus</div>
    <div class="ep-loc">Vitreal haemorrhage</div>
  </div>
</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-nasal" onclick="goLesionTab('LOC-RE-RETINA','Retinal / choroidal bleed')">
    <div class="ep-sys">Retinal detachment · bullous lesions · hypertension</div>
    <div class="ep-loc">Retinal / choroidal haemorrhage</div>
  </div>
  <div class="fn-ep fn-ep-larynx" onclick="goLesionTab('LOC-RE-CORNEA-SUP','Intracorneal haemorrhage')">
    <div class="ep-sys">Uncommon · always with corneal neovascularisation</div>
    <div class="ep-loc">Intracorneal haemorrhage</div>
  </div>
</div>
<div style="margin-top:10px;padding:9px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;font-size:10px;line-height:1.55;color:#FCA5A5;width:100%;">
  ⚡ <strong>Any intraocular bleed → systemic workup:</strong> blood pressure, CBC + smear, platelet count, BMBT, PT/aPTT, retinal exam of opposite eye. Bilateral hyphaema with retinal detachment → systemic hypertension until proven otherwise (CKD, hyperthyroidism, HAC, primary HT). Unilateral with trauma history → trauma or intraocular neoplasia.
</div>
`;

export const redEyeOrbitHtml = `
<div class="fn fn-mixed">🦴 RETROBULBAR / ORBITAL DISEASE</div>
<div class="fn-arrow">↓</div>
<div class="fn fn-step">KEY EXAM CLUES</div>
<div class="fn-arrow">↓</div>
<div class="dx-check" style="font-size:10px;line-height:1.55;">
  • Exophthalmos · third eyelid protrusion · resistance on retropulsion<br>
  • Pain on opening mouth (zygomatic abscess/cellulitis) — typical of acute orbital inflammation<br>
  • Strabismus (extraocular muscle involvement)<br>
  • Exposure keratitis from incomplete blink<br>
  • Acute + painful + young/mid-age dog → orbital cellulitis / abscess (often dental)<br>
  • Chronic + non-painful + older patient → orbital neoplasia until proven otherwise<br>
  • Cat: zygomatic salivary mucocoele · retrobulbar lymphoma<br>
  • Masticatory muscle myositis (MMM) → bilateral exophthalmos + jaw pain + 2M antibodies
</div>
<div class="fn-arrow">↓</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-RE-ORBIT','Retrobulbar — inflammatory')">
    <div class="ep-sys">Acute · painful · pyrexia</div>
    <div class="ep-loc">Orbital cellulitis / abscess</div>
  </div>
  <div class="fn-ep fn-ep-mechanic" onclick="goLesionTab('LOC-RE-ORBIT','Retrobulbar — mass')">
    <div class="ep-sys">Chronic · non-painful · older patient</div>
    <div class="ep-loc">Orbital neoplasia</div>
  </div>
</div>
`;

// ── Tab nav helper (used inside the 3 Dx tabs) ─────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxRedEyeHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxRedEyeExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxRedEyeDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const redEyeDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">RED EYE vs PAINFUL EYE vs LOSS OF VISION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c3">
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">🔴 Red eye</strong><br>
      Ocular coat hyperaemia<br>
      Iris hyperaemia<br>
      Intraocular bleed<br>
      <span style="opacity:.75;">"WHERE is the redness?"</span>
    </div>
    <div class="dx-test" style="text-align:left;background:#0D7377;font-size:9px;">
      <strong style="font-size:10px;">😣 Painful eye</strong><br>
      Blepharospasm · rubbing<br>
      Photophobia<br>
      Lacrimation · third eyelid protrusion<br>
      <span style="opacity:.75;">Corneal · uveal · glaucoma · orbital</span>
    </div>
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">👁️ Visual deficit</strong><br>
      Bumping into objects · uncertainty<br>
      Dazzle / menace / PLR changes<br>
      <span style="opacity:.75;">→ Always assess vision in any red eye</span>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 PRESENTING COMPLAINT — TARGETED HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Duration + onset:</strong><br>
    • Peracute (minutes–hours): trauma, foreign body, acute glaucoma (closed-angle), hyphaema with coagulopathy, corneal rupture<br>
    • Acute (1–3 days): ulcerative keratitis, anterior uveitis, conjunctivitis, orbital cellulitis<br>
    • Subacute (days–weeks): KCS, immune-mediated keratitis, episcleritis, chronic uveitis<br>
    • Chronic / progressive: pannus, eosinophilic keratitis (cats), corneal sequestrum, neoplasia, end-stage glaucoma<br><br>
    <strong>Ocular discharge:</strong><br>
    • Serous / clear → early viral, allergic, KCS (mild), reflex tearing (pain)<br>
    • Mucoid → KCS, allergy, chronic conjunctivitis<br>
    • Mucopurulent → bacterial conjunctivitis, KCS with secondary infection, deep ulcer<br>
    • Haemorrhagic → severe trauma, neoplasia, severe FHV-1 (cat), coagulopathy<br><br>
    <strong>Discomfort signs:</strong><br>
    • Rubbing/scratching · pawing at face · holding eye shut · photophobia<br>
    • Persistent third eyelid protrusion + miosis = classic uveitis triad with pain<br><br>
    <strong>Vision change:</strong><br>
    • Owner reports bumping objects, hesitancy in stairs, change in night vision<br>
    • Sudden onset blindness + red eye → uveitis, retinal detachment, optic neuritis, hyphaema, acute glaucoma<br><br>
    <strong>Unilateral vs bilateral:</strong><br>
    • Unilateral → local cause more likely (FB, ulcer, trauma, orbital, primary glaucoma in some breeds)<br>
    • Bilateral → systemic disease likely (hypertension, infectious uveitis, immune-mediated, allergic, KCS)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 SYSTEMIC / GENERAL HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Concurrent illness:</strong><br>
    • PU/PD + red eye → check BP (hypertensive retinopathy → CKD/HAC/hyperthyroid)<br>
    • Weight loss + chronic uveitis → neoplastic (lymphoma) or infectious (FIV/FeLV/FIP, leishmaniasis, fungal)<br>
    • Bleeding elsewhere + hyphaema → coagulopathy (rodenticide, thrombocytopenia, DIC)<br>
    • Joint pain + uveitis → immune-mediated polyarthritis-uveitis (rare), Lyme<br>
    • Dermatitis + red eye → atopy, pemphigus, uveodermatologic (VKH-like)<br><br>
    <strong>Travel + exposure:</strong><br>
    • Endemic: leishmaniasis, ehrlichiosis, anaplasmosis, rickettsia, FIP (multi-cat), heartworm<br>
    • Tick exposure → tick-borne uveitis<br>
    • Hunting / outdoor → trauma, FB, infectious agents<br><br>
    <strong>Vaccination + parasiticide status:</strong><br>
    • Unvaccinated dog → CDV (uveitis), ICH adenovirus type 1 ("blue eye" — endothelial oedema after vaccination historically)<br>
    • FHV-1 / FCV outbreak history in cats<br><br>
    <strong>Drug history:</strong><br>
    • Systemic steroids → can mask uveitis, predispose to corneal infection<br>
    • Topical steroids on undiagnosed ulcer → catastrophic stromal melting<br>
    • Atropine in narrow ICA → triggers acute glaucoma<br>
    • Cytotoxic drugs → mucositis<br><br>
    <strong>Diet:</strong><br>
    • Taurine-deficient diet in cats → retinal degeneration (not red eye but vision)<br>
    • Raw diet → infectious risk (toxoplasma)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🐾 SIGNALMENT + BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:#FCD34D;">Brachycephalic</strong> (Pug, Boston, French Bulldog, Pekingese, Shih Tzu)<br>→ Exposure keratopathy · ulcers · pigmentary keratitis · proptosis risk<br><br>
        <strong style="color:#6EE7B7;">Cocker Spaniel · CKCS · Lhasa Apso · Bichon · Westie · Yorkie</strong><br>→ KCS (immune-mediated) · primary closed-angle glaucoma (Cocker, Basset, Springer)<br><br>
        <strong style="color:#FCA5A5;">German Shepherd</strong><br>→ Chronic superficial keratitis (pannus) · plasmoma · pigmentary uveitis<br><br>
        <strong style="color:#C4B5FD;">Golden Retriever</strong><br>→ Pigmentary uveitis · primary uveitic glaucoma · uveal cysts<br><br>
        <strong style="color:#FCD34D;">Collie / Sheltie</strong><br>→ Nodular granulomatous episcleritis (NGE) · Collie eye anomaly<br><br>
        <strong style="color:#FCA5A5;">Boxer · Dane · Shar-Pei</strong><br>→ Entropion · ulcers · indolent erosion (Boxer ulcer)<br><br>
        <strong style="color:#6EE7B7;">Akita · Samoyed · Husky</strong><br>→ Uveodermatologic syndrome (VKH-like)
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:#C4B5FD;">Young cat</strong><br>→ FHV-1 keratitis · eosinophilic keratitis · symblepharon · viral URTI conjunctivitis<br><br>
        <strong style="color:#6EE7B7;">Persian / Himalayan / Exotic SH</strong><br>→ Brachycephalic ocular surface disease · corneal sequestrum · entropion<br><br>
        <strong style="color:#FCD34D;">Middle-aged–older cat</strong><br>→ Uveitis (FIV/FeLV/FIP/toxoplasma) · iris melanoma · hypertensive retinopathy<br><br>
        <strong style="color:#FCA5A5;">Outdoor cat</strong><br>→ Trauma · proptosis · uveitis (FIV, toxoplasma)<br><br>
        <strong style="color:#93C5FD;">Burmese</strong><br>→ Corneal sequestrum predisposed<br><br>
        <strong style="color:#FCD34D;">FIV/FeLV positive</strong><br>→ Anterior uveitis · lymphoma (orbital, intraocular)
      </div>
    </div>
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS — REFER OR SCREEN URGENTLY</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Acute vision loss · severe pain · proptosis · suspected globe rupture · marked corneal oedema (diffuse "blue eye") · hyphaema + neurological signs (intracranial bleed) · uveitis + bilateral retinal detachment (hypertension) · chemical burns
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const redEyeDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 HANDS-OFF — OBSERVE BEFORE YOU TOUCH</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>From a distance in ambient light:</strong><br>
    • <strong>Globe size + position:</strong> Buphthalmos (chronic glaucoma), microphthalmos (congenital), exophthalmos (orbital), enophthalmos (Horner, pain, dehydration, MMM atrophy)<br>
    • <strong>Eyelid conformation:</strong> Blepharospasm = pain; entropion / ectropion; ptosis (Horner CN III · CN VII)<br>
    • <strong>Third eyelid:</strong> Persistent protrusion → pain, sympathetic loss (Horner), dysautonomia, retrobulbar mass, microphthalmos, dehydration<br>
    • <strong>Symmetry:</strong> Compare eyes side-by-side — anisocoria, asymmetric exophthalmos, facial swelling<br>
    • <strong>Discharge character:</strong> Serous · mucoid · purulent · sanguineous<br>
    • <strong>Behaviour / vision:</strong> Bumping objects, head tilt, hesitancy → vision deficit
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 CRANIAL NERVE / VISION BATTERY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Test</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Interprets</div>
      <div><strong>Menace response</strong></div><div>CN II → CN VII · cortical pathway · ≥10–12 wks for development</div>
      <div><strong>Dazzle reflex</strong></div><div>Subcortical (CN II → CN VII via colliculus) — present even when blind cortically</div>
      <div><strong>Direct PLR</strong></div><div>CN II afferent → CN III efferent — ipsilateral pupil constricts</div>
      <div><strong>Consensual PLR</strong></div><div>Light in eye A → pupil B constricts; tests crossed optic fibres</div>
      <div><strong>Swinging-light test</strong></div><div>Detects afferent pupillary defect (CN II / retinal disease)</div>
      <div><strong>Palpebral reflex</strong></div><div>CN V (sensory) → CN VII (motor) — blink response</div>
      <div><strong>Corneal reflex</strong></div><div>CN V (sensory) → CN VI/VII — corneal touch → blink + globe retraction</div>
      <div><strong>Vestibulo-ocular reflex</strong></div><div>CN VIII (vestibular) → III/IV/VI — physiological nystagmus on head rotation</div>
      <div><strong>Tracking / cotton ball</strong></div><div>Vision · binocular coordination</div>
    </div>
    <div style="margin-top:6px;font-size:9.5px;color:var(--gray);line-height:1.5;">
      💡 Absent menace + intact dazzle + intact PLR = cortical blindness · Absent menace + absent dazzle + absent PLR = pre-geniculate lesion (retina / optic nerve / chiasm).<br>
      💡 In any red eye, PLR is essential — miosis → uveitis · mydriasis → glaucoma or retinal/optic nerve disease.
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👀 OUTSIDE → IN: SYSTEMATIC OCULAR EXAM</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>1. Periocular skin + eyelids:</strong> dermatitis, swelling, alopecia, ulcers, masses, Meibomian gland eversion (chalazion, MGD, neoplasia). Evert lids — distichiasis, ectopic cilia, FB, ulcers.<br>
    <strong>2. Third eyelid (TEL):</strong> follicular hyperplasia (inner surface), gland prolapse ("cherry eye"), scrolled cartilage, neoplasia (lymphoma, SCC, hemangiosarcoma), plasmoma (chronic plasmacytic — GSD).<br>
    <strong>3. Conjunctiva:</strong> hyperaemia distribution (palpebral vs bulbar vs forniceal); chemosis; follicles; FB; subconjunctival haemorrhage.<br>
    <strong>4. Episclera / sclera:</strong> straight radial vessels close to limbus = deep injection → consider uveitis, glaucoma, scleritis. Nodules (NGE).<br>
    <strong>5. Cornea:</strong>
    <div style="margin-left:8px;">
      • Clarity: oedema (diffuse → endothelial; focal → epithelial/stromal), pigmentation, lipid/calcium, scar<br>
      • Vascularisation: superficial branching tree pattern vs deep straight brush at limbus<br>
      • Surface defect: fluorescein stain<br>
      • Foreign body, sequestrum (cat — black plaque), bulla, descemetocele
    </div>
    <strong>6. Anterior chamber:</strong>
    <div style="margin-left:8px;">
      • Depth (shallow with lens luxation forward, deep with posterior lens luxation)<br>
      • Aqueous flare (Tyndall — focal light beam visible in AC = protein leakage)<br>
      • Hypopyon (white) vs hyphaema (red) vs fibrin (clot)<br>
      • Keratic precipitates (KP — endothelial; chronic uveitis)
    </div>
    <strong>7. Iris:</strong> colour change, rubeosis, pigmented or vascular mass, iris cyst (transilluminates) vs neoplasia (does not), synechiae (PS = posterior, iris-to-lens · PAS = peripheral anterior, iris-to-cornea/angle).<br>
    <strong>8. Pupil:</strong> size, shape (dyscoria → synechiae, iris atrophy, congenital), symmetry (anisocoria), PLR.<br>
    <strong>9. Lens:</strong> position (subluxation = aphakic crescent · luxation), opacity (cataract vs nuclear sclerosis — retroillumination), lens capsule rupture.<br>
    <strong>10. Vitreous + fundus:</strong> haemorrhage, asteroid hyalosis, retinal detachment, optic disc oedema (papilloedema · papillitis), tapetal hyperreflectivity (retinal atrophy) vs dullness (oedema/infiltrate), retinal vessel attenuation, chorioretinitis foci.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔍 KEY DISCRIMINATORS — PATTERN RECOGNITION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Conjunctival redness · normal cornea/pupil · ↑ tearing</div><div style="color:#6EE7B7;">Conjunctivitis (allergic · bacterial · viral)</div>
      <div>Conjunctival redness · mucoid discharge · dull cornea · low STT</div><div style="color:#FCD34D;">Keratoconjunctivitis sicca (KCS)</div>
      <div>Fluorescein +ve corneal defect · pain · neovasc.</div><div style="color:#FCA5A5;">Ulcerative keratitis</div>
      <div>Fluorescein +ve + stromal melt / mucopurulent</div><div style="color:#F87171;">Infected / melting ulcer — emergency</div>
      <div>Episcleral injection · miosis · aqueous flare · ↓ IOP</div><div style="color:#FCA5A5;">Anterior uveitis</div>
      <div>Episcleral injection · mydriasis · diffuse oedema · ↑ IOP &gt;25</div><div style="color:#F87171;">Acute glaucoma — emergency</div>
      <div>Painful exophthalmos + pain on opening mouth</div><div style="color:#FCA5A5;">Orbital cellulitis / abscess</div>
      <div>Chronic non-painful exophthalmos</div><div style="color:#FCD34D;">Orbital neoplasia until proven otherwise</div>
      <div>Hyphaema + bilateral · retinal detachment</div><div style="color:#F87171;">Systemic hypertension</div>
      <div>Pigmented iris lesion · ↑ IOP · raised + transilluminating?</div><div style="color:#FCD34D;">Iris cyst (benign) vs melanoma (solid)</div>
      <div>Black corneal plaque · cat</div><div style="color:#C4B5FD;">Corneal sequestrum</div>
      <div>Conjunctival follicles + nasal/oral lesions + young cat</div><div style="color:#6EE7B7;">FHV-1 / FCV viral conjunctivitis</div>
      <div>GSD + bilateral lateral pigmented corneal vasc.</div><div style="color:#93C5FD;">Pannus (chronic superficial keratitis)</div>
    </div>
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const redEyeDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.4);color:#F87171;">⚡ STEP 1 — SAFETY CHECK BEFORE ANY TEST</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Suspected globe / scleral rupture or deep ulcer:</strong> Minimise handling. <strong>DO NOT</strong> apply pressure, do <strong>NOT</strong> perform Schiotz/applanation tonometry, do not flush. Use rebound tonometry only if essential. Place Elizabethan collar. Refer same day if available. Cover with broad-spectrum systemic antibiotics (e.g. amoxicillin–clavulanate ± fluoroquinolone for Pseudomonas risk) and systemic NSAID/analgesia.<br><br>
    <strong>Order of tests is critical:</strong> Schirmer Tear Test FIRST (any drops alter the result) → ocular surface cytology/swab if indicated → fluorescein stain → tonometry → topical anaesthetic → mydriatic for fundoscopy LAST. Tonometry before mydriatics.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — SCHIRMER TEAR TEST (STT-1)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Performed before any solutions, drops, or bright light.</strong><br>
    • Technique: fold strip in packaging → retract lower lid → place tip at lateral fornix → close lids for 60 s.<br>
    • <strong>Dog normal:</strong> ≥15 mm/min · 10–14 = early/borderline KCS · &lt;10 = clinical KCS · &lt;5 = severe<br>
    • <strong>Cat normal:</strong> wide reference (median ~14 mm/min, 95% PI ~8–22); a substantial proportion of clinically normal cats read &lt;10. Interpret with clinical signs (mucoid discharge, corneal scarring) — single low readings without clinical correlation are non-diagnostic.<br>
    • <strong>Pitfalls:</strong> Recent topicals · sedation · third eyelid disease · neurogenic KCS (CN VII) — often dry ipsilateral nostril; do contralateral STT for comparison.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3 — OCULAR SURFACE SAMPLING (if indicated)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Indications:</strong> Deep, melting or non-healing ulcers · purulent conjunctivitis · suspected infectious cause · pre-surgical.<br>
    • <strong>Cytology:</strong> cytobrush or spatula after topical anaesthetic; Diff-Quik. Look for bacteria (intracellular = significant), eosinophils (FHV-1 / eosinophilic keratoconjunctivitis), neoplastic cells, fungal hyphae.<br>
    • <strong>Culture + sensitivity:</strong> swab BEFORE topicals; transport in Amies/charcoal. Empirical first-line antibiotics based on cytology while awaiting C&amp;S.<br>
    • <strong>PCR (cats):</strong> Conjunctival/corneal swab for FHV-1, FCV, <em>Chlamydia felis</em>, <em>Mycoplasma felis</em>. Interpret with care — FHV-1 PCR positive in many normal cats (latent infection).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — FLUORESCEIN STAIN</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    • Wet single strip with saline; touch bulbar conjunctiva; flush excess; view with cobalt blue light.<br>
    • <strong>Positive uptake:</strong> Epithelial defect → ulcer. Depth and shape matter:<br>
    &nbsp;&nbsp;– Superficial uptake only → simple ulcer<br>
    &nbsp;&nbsp;– Crater with non-staining base + green halo → stromal ulcer<br>
    &nbsp;&nbsp;– Loose-edged epithelium → indolent / SCCED (Boxer ulcer)<br>
    &nbsp;&nbsp;– Central dark non-staining defect with surrounding green halo → descemetocele (urgent surgery)<br>
    &nbsp;&nbsp;– Pooling green stream = aqueous leak → <strong>Seidel-positive globe rupture</strong> (emergency)<br>
    • <strong>Jones test:</strong> Stain placed in eye should appear at nostril within 5 min → tests nasolacrimal patency.<br>
    • <strong>Pitfalls:</strong> Excess stain pools in pockets and false-positives; mucus retains stain; rose bengal more sensitive for FHV-1 dendritic ulcers (geographic/dendritic uptake).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 5 — TONOMETRY (IOP)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Methods:</strong> Rebound (TonoVet) preferred — no anaesthetic required, accurate; Applanation (Tono-Pen) — topical anaesthetic needed; Schiotz — indentation, weight calibration needed.<br>
    <strong>Normal IOP:</strong> 10–25 mmHg both species. Inter-eye difference of &gt;8 mmHg is generally considered clinically significant.<br>
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">IOP</div><div style="font-weight:600;">Interpretation</div>
      <div>&gt;25 mmHg + clinical signs</div><div style="color:#F87171;">Glaucoma (primary or secondary)</div>
      <div>&gt;40 mmHg</div><div style="color:#EF4444;font-weight:700;">Acute glaucoma — emergency · vision-threatening</div>
      <div>10–25</div><div style="color:#6EE7B7;">Normal</div>
      <div>&lt;10 mmHg</div><div style="color:#FCD34D;">Uveitis (most common) · phthisis bulbi · scleral rupture</div>
      <div>Inter-eye difference &gt;8 mmHg</div><div style="color:#FCD34D;">Clinically significant — investigate the abnormal eye</div>
    </div>
    <strong>Pitfalls:</strong> Squeezing eyelids · jugular compression · head position · poor calibration → falsely high readings. Take 3+ readings and use the mean.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 6 — FOCAL LIGHT + SLIT-LAMP / OPHTHALMOSCOPY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Direct ophthalmoscope / pen torch / Finoff transilluminator:</strong> evaluate cornea, AC, iris, pupil, lens, retinal red reflex.<br>
    • <strong>Tyndall effect:</strong> Darken room → narrow slit of light tangentially through AC → visible beam = aqueous flare (protein) → anterior uveitis.<br>
    • <strong>Retroillumination:</strong> light into eye; tapetal reflection silhouettes opacities. Parallax (move head laterally): opacity moving with you = posterior to lens, against you = anterior.<br>
    • <strong>Direct ophthalmoscopy:</strong> 19.5× upright image, small field; examine optic disc, retinal vessels, tapetal/non-tapetal junction, periphery. Green filter helps distinguish pigment from haemorrhage.<br>
    • <strong>Indirect ophthalmoscopy</strong> (panoptic or condensing lens + light source): inverted larger field — pupil dilation needed; preferred for retinal detachment, optic nerve, chorioretinitis.<br>
    • <strong>Slit lamp</strong> (if available): biomicroscopic depth assessment — KP, flare, fibrin, lens capsule, vitreous strands.<br>
    • <strong>Pupil dilation:</strong> Tropicamide 1% topically (15–30 min onset, 2–4 h duration). Tonometry FIRST. Avoid in suspected narrow ICA (Cocker Spaniel) — may precipitate acute glaucoma.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 7 — TARGETED ADVANCED TESTS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Gonioscopy</strong> — direct visualisation of iridocorneal angle. Indicated in any primary glaucoma diagnosis + screen contralateral eye for narrow/closed angle.<br><br>
    <strong>Ocular ultrasound (10–20 MHz):</strong> indispensable when fundus cannot be visualised (corneal oedema, hyphaema, mature cataract).<br>
    • Retinal detachment (sea-gull / V-shape attached at optic disc)<br>
    • Vitreal haemorrhage / inflammatory debris<br>
    • Lens position (luxation, intumescence)<br>
    • Intraocular mass<br>
    • Posterior scleritis<br><br>
    <strong>Systemic workup for uveitis or hyphaema (BOTH species):</strong>
    <div style="margin-left:8px;">
      • Haematology (CBC + smear), serum biochemistry, urinalysis<br>
      • Coagulation: BMBT, PT, aPTT, platelet count<br>
      • Blood pressure (Doppler or oscillometric) — repeat ≥3 times calmly<br>
      • Thoracic + abdominal imaging in older patients (rule out neoplasia)<br>
      • Infectious panel: FIV/FeLV PCR/Ag (cat), Toxoplasma IgG/IgM, FCoV titre (FIP), Bartonella, leishmaniasis, ehrlichiosis/anaplasmosis (endemic), heartworm, Cryptococcus LCAT, fungal serology (region-dependent: Histoplasma, Blastomyces, Coccidioides)<br>
      • Anti-nuclear antibody / Coombs · IMHA / immune-mediated rule-out<br>
      • Lens-induced uveitis: cataract evaluation
    </div><br>
    <strong>Aqueocentesis</strong> — referral-only — for cytology/PCR when systemic workup is non-diagnostic.<br><br>
    <strong>CT / MRI orbit:</strong> Mandatory for any retrobulbar disease (cellulitis vs neoplasia · oral exam under GA), proptosis recovery planning, suspected optic chiasm lesion.<br><br>
    <strong>Electroretinography (ERG):</strong> referral test — sudden acquired retinal degeneration (SARDS — flat ERG, normal MRI), differentiates retinal vs optic nerve / central blindness.
  </div>

</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Empirical treatment pearls while you investigate:</strong><br>
  • <strong>NEVER apply topical steroids</strong> without a negative fluorescein stain — masks/worsens ulcers and infectious keratitis.<br>
  • Suspected uveitis without ulcer: topical 1% prednisolone acetate q6–8h + topical atropine 1% (if IOP normal/low — do NOT use if mydriatic puts angle at risk) + systemic NSAID (or steroid if no ulcer + no infectious differential).<br>
  • Acute glaucoma (IOP &gt;40): topical timolol 0.5% + dorzolamide 2% + latanoprost 0.005% q6h; systemic mannitol 1 g/kg IV slow if vision-threatening — refer same day.<br>
  • Bacterial ulcer / melting: cytology-directed topical antibiotic q1–2h (fluoroquinolone + cefazolin if Gram +/- mixed); serum tears q1h; systemic doxycycline (anti-MMP); E-collar; recheck 24–48 h.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
