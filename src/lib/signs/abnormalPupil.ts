// ── ANISOCORIA / ABNORMAL PUPIL — clinical sign + diagnostic approach ─────
// Source: resources/8. The abnormal pupil.pdf, resources/1. Clinical examination of the eye.pdf
//
// onclick handlers reference window globals exposed at the bottom of cliniqApp.ts.

// ── Clinical-sign flowchart (Tab 0) ────────────────────────────────────────
export const abnormalPupilFlowHtml = `
<div class="flow-wrap">

  <div class="flow-node entry">🔵 ABNORMAL PUPIL</div>
  <div class="flow-arrow-v">↓</div>
  <div class="flow-node step">OPHTHALMIC vs NEUROLOGICAL?</div>
  <div class="flow-arrow-v">↓</div>

  <!-- Top-level branches -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;">
    <div class="flow-node insp" style="cursor:pointer;font-size:11px;" onclick="renderAbnormalPupilOphthalmic()">👁️ Ophthalmic<br><span style="font-size:9px;opacity:.7">Visible ocular changes</span></div>
    <div class="flow-node mixed" style="cursor:pointer;font-size:11px;" onclick="renderAbnormalPupilNeuro()">🧠 Neurological<br><span style="font-size:9px;opacity:.7">Only pupil/PLR abnormality</span></div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(168,85,247,0.07);border:1px solid rgba(168,85,247,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#C4B5FD;margin-bottom:6px;">🔬 KEY EXAM CHECKS BEFORE LOCALISING</div>
    <div style="font-size:9.5px;line-height:1.55;color:rgba(196,181,253,.85);">
      1. <strong>Vision</strong> (menace, tracking, dazzle): if vision is impaired, prioritise retina / optic nerve / cortical workup over iris/Horner's.<br>
      2. <strong>PLR direct, indirect, swinging-light</strong>: localises afferent (retina/CN II) vs efferent (CN III).<br>
      3. <strong>IOP</strong>: rule out glaucoma (mid-fixed mydriasis + ↑ IOP) and uveitis (miosis + ↓ IOP).<br>
      4. <strong>Slit-lamp / focal light</strong>: iris atrophy, synechiae, aqueous flare, lens position, dyscoria.<br>
      5. <strong>Concurrent Horner's signs?</strong> Miosis + ptosis + enophthalmos + 3rd eyelid protrusion = sympathetic denervation.
    </div>
  </div>

  <div style="margin-top:10px;padding:10px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#F87171;margin-bottom:6px;">⚡ DO NOT MISS</div>
    <div style="font-size:9.5px;line-height:1.55;color:#FCA5A5;">
      • <strong>Acute glaucoma</strong> — fixed mid-dilated unresponsive pupil + ↑ IOP → sight-threatening (refer same day)<br>
      • <strong>Anterior lens luxation</strong> — altered pupil shape + pain + ↑ IOP risk (Jack Russell, Tibetan Terrier) → emergency lensectomy<br>
      • <strong>Optic neuritis (MUA, infectious, idiopathic)</strong> — bilateral mydriasis + acute blindness → MRI + CSF, aggressive immunosuppression<br>
      • <strong>Brainstem / CN III lesion</strong> — anisocoria + altered mentation, hemiparesis, cranial nerve deficits → emergency neuro workup<br>
      • <strong>SARDS</strong> — acute bilateral blindness + dilated unresponsive pupils + normal fundus + PU/PD → chromatic PLR + ERG
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.15);border-radius:10px;font-size:11px;color:#93C5FD;text-align:center;width:100%;">
    Tap a branch to drill down to specific lesion types
  </div>
</div>
`;

// ── Ophthalmic branch — iris / lens / retina ──────────────────────────────
export const abnormalPupilOphthalmicHtml = `
<div class="fn fn-insp">👁️ OPHTHALMIC CAUSES</div>
<div class="fn-arrow">↓</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-nasal" onclick="goLesionTab('LOC-AP-IRIS','Iris causes')">
    <div class="ep-loc">Iris</div>
  </div>
  <div class="fn-ep fn-ep-larynx" onclick="goLesionTab('LOC-AP-LENS','Lens causes')">
    <div class="ep-loc">Lens</div>
  </div>
</div>
<div class="fn-row">
  <div class="fn-ep fn-ep-pleural" onclick="goLesionTab('LOC-AP-RETINA','Retina / Optic nerve')">
    <div class="ep-loc">Retina / Optic nerve</div>
  </div>
</div>
`;

// ── Neurological branch — top split ──────────────────────────────────────
export const abnormalPupilNeuroBranchHtml = `
<div class="flow-wrap">

  <div class="flow-node entry" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.4);color:#C4B5FD;">🧠 NEUROLOGICAL ANISOCORIA</div>
  <div class="flow-node step" style="margin-top:6px;font-size:10.5px;">Identify the ABNORMAL pupil</div>

  <div style="margin-top:8px;padding:10px 12px;background:rgba(37,99,235,0.07);border:1px solid rgba(37,99,235,0.25);border-radius:10px;width:100%;">
    <div style="font-size:11px;font-weight:700;color:#93C5FD;margin-bottom:8px;">💡 WHICH PUPIL IS ABNORMAL? — LIGHT vs DARK ROOM RULE</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div style="font-size:9.5px;line-height:1.5;background:rgba(37,99,235,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:#93C5FD;font-weight:700;margin-bottom:3px;">Abnormally LARGE pupil</div>
        Anisocoria <strong>LESS obvious</strong> in the dark<br>
        (normal pupil also dilates, narrowing the gap)<br>
        <strong style="color:#FCD34D;">⇒ Lesion preventing constriction</strong><br>
        → CN III · iris atrophy · pharmacological mydriasis · glaucoma
      </div>
      <div style="font-size:9.5px;line-height:1.5;background:rgba(37,99,235,0.08);border-radius:7px;padding:7px 9px;">
        <div style="color:#93C5FD;font-weight:700;margin-bottom:3px;">Abnormally SMALL pupil</div>
        Anisocoria <strong>MORE obvious</strong> in the dark<br>
        (normal pupil dilates; abnormal stays small)<br>
        <strong style="color:#F87171;">⇒ Lesion preventing dilation</strong><br>
        → Horner's · uveitis · pharmacological miotic · synechiae
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;margin-top:2px;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:18px;color:rgba(139,92,246,0.5);line-height:1;">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.4);color:#DDD6FE;font-size:11px;font-weight:700;text-align:center;cursor:pointer;" onclick="renderAnisocoriaMydriasis()">
        MYDRIASIS<br><span style="font-size:9px;color:#A78BFA;margin-top:4px;display:block;">Tap to localise ›</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="font-size:18px;color:rgba(37,99,235,0.5);line-height:1;">↓</div>
      <div class="flow-node" style="width:100%;background:rgba(37,99,235,0.12);border-color:rgba(37,99,235,0.4);color:#BFDBFE;font-size:11px;font-weight:700;text-align:center;cursor:pointer;" onclick="renderAnisocoriaHorners()">
        MIOSIS<br><span style="font-size:9px;color:#60A5FA;margin-top:4px;display:block;">Tap to localise ›</span>
      </div>
    </div>
  </div>

  <div style="margin-top:10px;padding:9px 12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:10px;width:100%;">
    <div style="font-size:10px;font-weight:700;color:#FCD34D;margin-bottom:4px;">💡 PEARLS</div>
    <div style="font-size:9.5px;line-height:1.6;color:#FDE68A;">
      • Anisocoria + altered mentation = <strong>emergency</strong> — assume herniation until proven otherwise<br>
      • <strong>Absent direct PLR, consensual intact</strong> = pre-chiasmal (retina/optic nerve) — NOT CN III<br>
      • CN III peripheral: mydriasis <em>without</em> ptosis or lateral strabismus = parasympathetic fibres only<br>
      • Horner's: always exclude uveitis first (aqueous flare + IOP) before labelling as sympathetic denervation
    </div>
  </div>

</div>
`;

// ── Tab nav helper ─────────────────────────────────────────────────────────
const dxTabs = (active: 'history' | 'exam' | 'dx') => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">
  <div class="dx-step${active==='history'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.5;'}" onclick="renderDxAbnormalPupilHistory()">📋 History</div>
  <div class="dx-step${active==='exam'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.5;'}" onclick="renderDxAbnormalPupilExam()">🩺 Exam</div>
  <div class="dx-step${active==='dx'?'':' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.5;'}" onclick="renderDxAbnormalPupilDx()">🔬 Diagnostics</div>
</div>
`;

// ── Diagnostic approach — HISTORY ──────────────────────────────────────────
export const abnormalPupilDxHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-branch">CHARACTERISE THE COMPLAINT</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c3">
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">👁️ Visible pupil change</strong><br>
      Anisocoria · dyscoria<br>
      Persistent mydriasis or miosis<br>
      <span style="opacity:.75;">Owner notices asymmetry or fixed pupil</span>
    </div>
    <div class="dx-test" style="text-align:left;background:#0D7377;font-size:9px;">
      <strong style="font-size:10px;">👀 Vision change</strong><br>
      Bumping objects · uncertainty<br>
      Sudden vs gradual onset<br>
      <span style="opacity:.75;">Often the chief complaint when retinal/optic</span>
    </div>
    <div class="dx-test" style="text-align:left;font-size:9px;">
      <strong style="font-size:10px;">🧠 Systemic / neuro signs</strong><br>
      Mentation change · ataxia · CN deficits<br>
      Megaoesophagus · PU/PD · autonomic signs<br>
      <span style="opacity:.75;">Points to central or systemic cause</span>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📋 ONSET, DURATION, PROGRESSION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Peracute (min–hours):</strong> Acute glaucoma · anterior lens luxation · trauma · CVA · acute uveitis · pharmacological exposure.<br>
    <strong>Acute (days):</strong> Optic neuritis · MUA · retinal detachment · SARDS · infectious uveitis · Horner's idiopathic (Golden Retriever).<br>
    <strong>Subacute (weeks):</strong> Neoplasia (orbital, intracranial, mediastinal causing 2nd-order Horner's) · chronic uveitis · cataract + 2° glaucoma.<br>
    <strong>Chronic / progressive:</strong> Senile iris atrophy · PRA · degenerative cataract · uveal cysts (incidental) · chronic Horner's with concurrent OM.<br><br>
    <strong>Unilateral or bilateral?</strong><br>
    • Unilateral → local cause likely (Horner's, uveitis, glaucoma, trauma, lens luxation)<br>
    • Bilateral → systemic / central / drug cause (SARDS, optic neuritis, dysautonomia, central blindness, atropine, opioids, ketamine, sympathomimetics)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💊 DRUG + EXPOSURE HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Drugs causing mydriasis:</strong><br>
    • Topical atropine, tropicamide, phenylephrine, cyclopentolate<br>
    • Systemic atropine (premed), glycopyrrolate<br>
    • Opioids in cats (paradoxical mydriasis), ketamine, amphetamines, cocaine<br>
    • Tricyclic antidepressants, antihistamines (anticholinergic)<br><br>
    <strong>Drugs causing miosis:</strong><br>
    • Opioids in dogs (morphine, fentanyl)<br>
    • Topical pilocarpine, demecarium, latanoprost (also lowers IOP)<br>
    • Organophosphate toxicity (SLUDGE signs)<br><br>
    <strong>Toxin exposure:</strong> jimson weed (atropine — mydriasis), organophosphates / carbamates (miosis), strychnine. Lily ingestion in cats causes AKI rather than direct pupillary signs.<br><br>
    <strong>Trauma history:</strong> Head trauma → ipsilateral mydriasis (CN III compression, intracranial bleed) — neurosurgical emergency.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🩺 SYSTEMIC / GENERAL HISTORY</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>SARDS suspicion (dog):</strong> sudden bilateral blindness + weight gain + PU/PD + polyphagia ± HAC-like phenotype → "Cushingoid SARDS" cluster.<br>
    <strong>Diabetic dog with rapid cataract progression:</strong> lens-induced uveitis → posterior synechia → distorted pupil.<br>
    <strong>FIV/FeLV/FIP positive cat:</strong> chronic uveitis → posterior synechiae → dyscoria.<br>
    <strong>Vomiting, regurgitation, dry mucous membranes, urinary retention:</strong> dysautonomia — bilateral mydriasis + decreased tear production + multi-system autonomic failure.<br>
    <strong>Neurological signs</strong> (seizures, behavioural change, circling, hemiparesis) + anisocoria → intracranial mass / inflammatory CNS disease / CVA — MRI + CSF indicated.<br>
    <strong>Megaoesophagus + regurgitation + Horner's-like signs:</strong> dysautonomia in dog (rural / outdoor, midwest USA endemic).<br>
    <strong>Travel + tick exposure:</strong> tick-borne uveitis (Ehrlichia, RMSF).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🐾 SIGNALMENT + BREED CLUES</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;font-size:9.5px;">
      <div>
        <strong style="color:#60A5FA;font-size:10px;">🐕 DOG</strong><br><br>
        <strong style="color:#FCD34D;">Golden Retriever</strong> → idiopathic Horner's (3rd order — most common breed); pigmentary uveitis (iris cysts → uveitis → 2° glaucoma)<br><br>
        <strong style="color:#FCA5A5;">Jack Russell, Tibetan Terrier, Border Collie, Sealyham</strong> → primary anterior lens luxation<br><br>
        <strong style="color:#6EE7B7;">Cocker, Basset, Springer, Bouvier, Chow, Akita</strong> → primary closed-angle glaucoma → mid-fixed mydriasis<br><br>
        <strong style="color:#C4B5FD;">Miniature Schnauzer, Toy Poodle, Cocker</strong> → cataract → lens-induced uveitis → posterior synechiae<br><br>
        <strong style="color:#FCA5A5;">Miniature Schnauzer (especially), Dachshund, Brittany</strong> → SARDS<br><br>
        <strong style="color:#FCD34D;">Toy and miniature breeds, senior</strong> → senile iris atrophy<br><br>
        <strong style="color:#6EE7B7;">Beagle, Norwegian Elkhound</strong> → PRA<br><br>
        <strong style="color:#C4B5FD;">Any large breed</strong> → mediastinal mass / brachial plexus tumour → 2nd-order Horner's
      </div>
      <div>
        <strong style="color:#FB923C;font-size:10px;">🐱 CAT</strong><br><br>
        <strong style="color:#C4B5FD;">Older cat</strong> → systemic hypertension → bilateral mydriasis + retinal detachment + intraocular bleed<br><br>
        <strong style="color:#FCD34D;">FIV/FeLV positive</strong> → chronic uveitis → dyscoria · iris melanoma (diffuse, age-related)<br><br>
        <strong style="color:#6EE7B7;">Burmese</strong> → corneal sequestrum (chronic corneal pain → reflex uveitis → miosis)<br><br>
        <strong style="color:#FCA5A5;">Outdoor cat</strong> → trauma → 2nd / 3rd order Horner's · toxoplasma uveitis · proptosis<br><br>
        <strong style="color:#93C5FD;">Cat with otitis</strong> → 3rd-order Horner's (postganglionic — middle ear)<br><br>
        <strong style="color:#FCD34D;">Cat: spastic pupil syndrome</strong> → FeLV-associated tonic anisocoria<br><br>
        <strong style="color:#C4B5FD;">Multi-cat household / FIP</strong> → pyogranulomatous uveitis → miosis · hypopyon<br><br>
        <strong style="color:#6EE7B7;">Key-Gaskell cat (UK)</strong> → dysautonomia: bilateral fixed mydriasis + dry mucosae + megaoesophagus
      </div>
    </div>
  </div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Head trauma + ipsilateral mydriasis = rising ICP / CN III herniation (emergency MRI/decompression) · acute bilateral mydriasis + blindness = optic neuritis or SARDS (urgent workup) · fixed mid-dilated unresponsive pupil = acute glaucoma (refer same day) · anisocoria + altered mentation / CN deficits / hemiparesis = central neurological emergency
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — EXAM ─────────────────────────────────────────────
export const abnormalPupilDxExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 STEP 1 — CONFIRM ANISOCORIA + IDENTIFY THE ABNORMAL PUPIL</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Compare in bright light AND in a dark room</strong> using a focal light at arm's length:<br>
    • <strong>Abnormally LARGE pupil</strong> → anisocoria LESS obvious in the dark (the normal pupil dilates and the gap narrows) — lesion preventing constriction (CN III · iris atrophy · pharmacological mydriasis · glaucoma · sympathetic discharge).<br>
    • <strong>Abnormally SMALL pupil</strong> → anisocoria MORE obvious in the dark (the normal pupil dilates while the abnormal stays small) — lesion preventing dilation (sympathetic denervation = Horner's · uveitis · pharmacological miotic · posterior synechiae).<br>
    • Always compare to baseline pupil size in normal light; bilateral fixed mydriasis or miosis is missed when you fail to compare to expected size.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔦 STEP 2 — PLR BATTERY (afferent vs efferent localisation)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Direct PLR</strong> = CN II afferent → CN III efferent in same eye.<br>
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
    <span style="font-size:9.5px;opacity:.75;">Pre-chiasmal = retina/optic nerve · Optic tract → LGN · CN III lesion = ipsilateral mydriasis + ptosis + lateral strabismus + ophthalmoparesis.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">💡 STEP 3 — DAZZLE + MENACE (separate vision from PLR)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Dazzle reflex</strong>: subcortical (CN II → CN VII via colliculus). Present even when cortically blind. Absent = retina / optic nerve / midbrain.<br>
    <strong>Menace response</strong>: cortical (CN II → cortex → CN VII). Tests vision pathway. Develops at 10–12 wks of age.<br>
    <strong>Combinations:</strong><br>
    • Absent menace + intact dazzle + intact PLR → <strong>cortical blindness</strong> (forebrain — MUA, neoplasia, hepatic encephalopathy, hypertensive encephalopathy).<br>
    • Absent menace + intact dazzle + absent PLR in affected eye → <strong>optic nerve / chiasmal lesion</strong>.<br>
    • Absent menace + absent dazzle + absent PLR → <strong>retinal disease</strong> (SARDS, RD, end-stage PRA) or pre-geniculate lesion.<br>
    • Absent menace + absent dazzle + PLR present with BLUE light only → <strong>SARDS</strong> (intrinsically photosensitive RGCs preserved).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">👁️ STEP 4 — SLIT-LAMP / FOCAL LIGHT — PUPIL SHAPE + IRIS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
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
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🧠 STEP 5 — HORNER'S? LOCALISE 1st / 2nd / 3rd ORDER</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>1st order (central / brainstem / cervical cord T1):</strong> Rare. Concurrent neurological deficits — ataxia, paresis, hemineglect, vestibular signs. Lesions: cervical IVDD, fibrocartilaginous embolism, cerebrovascular accident, neoplasia. <strong>MRI</strong> + CSF.<br>
    <strong>2nd order (preganglionic, T1–T3 → cervical sympathetic chain):</strong> Look in the chest and neck — thoracic radiographs (mediastinal mass, thymoma, lymphoma), trauma (brachial plexus avulsion), cervical neoplasia, head/neck surgery history.<br>
    <strong>3rd order (postganglionic, after cranial cervical ganglion):</strong> Middle / inner ear disease, retrobulbar mass, idiopathic (most common — particularly <strong>Golden Retriever idiopathic Horner's</strong>, typically resolves spontaneously over weeks to months; published median ~15 weeks, range 11–20 weeks, up to 6 months). Otoscopy + CT/MRI bullae and orbit.<br><br>
    <strong>Pharmacological localisation — two-step phenylephrine protocol:</strong>
    <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Step / Order</div><div style="font-weight:600;">Expected response</div>
      <div>Step 1 — 1% phenylephrine, both eyes</div><div>Time to dilation of the affected pupil</div>
      <div>3rd order (postganglionic — denervation hypersensitivity)</div><div style="color:#6EE7B7;">Dilates in ≤ 20 min with 1% (normal eye does not)</div>
      <div>Step 2 — if no 1% response → switch to 10% phenylephrine</div><div>Time to bilateral dilation</div>
      <div>2nd order (preganglionic)</div><div style="color:#FCD34D;">10% dilates both pupils in 20–40 min</div>
      <div>1st order (central)</div><div style="color:#FCA5A5;">10% &gt; 40 min (slow / minimal)</div>
    </div>
    <span style="font-size:9.5px;opacity:.75;">Apply identical drop to contralateral eye and time both — interpret only the time difference, not absolute values. Note: if Horner's has been present &gt;3 weeks, postganglionic axonal degeneration can still develop hypersensitivity in 2nd-order lesions, blurring the test. Always document concurrent neurological exam.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🧠 STEP 6 — FULL CN BATTERY + GENERAL NEURO EXAM</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    Document at minimum:<br>
    • Mentation (forebrain) · postural reactions (any UMN) · gait<br>
    • CN II–VII palpebral / corneal / facial sensation · CN III/IV/VI eye movement (ophthalmoparesis suggests CN III lesion)<br>
    • CN VIII vestibular signs (head tilt, nystagmus) — if anisocoria + vestibular = central rostral brainstem lesion until proven otherwise<br>
    • Symmetry of facial muscles, ear and eyelid position (concurrent CN VII with 3rd-order Horner's points to middle ear)<br>
    • Autonomic signs: dry mucous membranes, decreased tear production, bradycardia, urinary retention, megaoesophagus → <strong>dysautonomia</strong><br>
    • Trauma signs: external wounds, scleral haemorrhage, fundus haemorrhage — head trauma with anisocoria = rising ICP until proven otherwise
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ──────────────────────────────────────
export const abnormalPupilDxDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step" style="background:rgba(220,38,38,0.15);border-color:rgba(220,38,38,0.4);color:#F87171;">⚡ STEP 1 — RULE OUT EMERGENCIES FIRST</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    1. <strong>Tonometry</strong> (rebound preferred) — any mid-fixed mydriasis with IOP &gt;25 mmHg = acute glaucoma → refer same-day.<br>
    2. <strong>Slit-lamp / focal light</strong> — anterior lens position; lens in AC = anterior lens luxation → emergency lensectomy referral.<br>
    3. <strong>Mentation + general neurological exam</strong> — anisocoria + obtundation, hemiparesis, ataxia, CN deficits = central emergency → MRI within hours if possible.<br>
    4. <strong>Trauma evaluation</strong> — head trauma + ipsilateral mydriasis = rising ICP / CN III herniation → mannitol 0.5–1 g/kg IV slow + emergent imaging.<br>
    5. <strong>Drug / toxin history</strong> — exclude pharmacological causes before lengthy workup.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 2 — TARGETED OPHTHALMIC TESTS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Schirmer Tear Test (BEFORE drops)</strong> — bilateral low STT + bilateral mydriasis + autonomic signs = <strong>dysautonomia</strong>. Unilateral low STT + ipsilateral dry nostril = <strong>neurogenic KCS</strong> (CN VII branch).<br>
    <strong>Fluorescein stain</strong> — corneal ulcer can cause reflex miosis (anterior uveitis component); rule out before topical steroids.<br>
    <strong>Tonometry</strong> — see emergency step above. ↓ IOP + miosis + flare = anterior uveitis · ↑ IOP + mid-mydriasis = glaucoma.<br>
    <strong>Slit-lamp</strong> — aqueous flare, KP, synechiae, lens position, iris detail, fibrin in AC.<br>
    <strong>Mydriatic challenge (tropicamide 1%)</strong> — used to dilate for fundus exam. Failure to dilate or only partial dilation in an otherwise normal eye → posterior synechiae (chronic uveitis sequela).
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 3 — PHARMACOLOGICAL LOCALISATION</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>1% phenylephrine — Horner's localisation</strong> (as in Exam step 5): rapid response (≤20 min) = 3rd order; intermediate = 2nd order; slow = 1st order. Always run a contralateral control.<br><br>
    <strong>Dilute pilocarpine (0.05–0.1%) — dysautonomia / denervation hypersensitivity:</strong> dilute pilocarpine causes constriction within 30 min in a parasympathetically denervated pupil (dysautonomia, CN III parasympathetic nucleus lesion) but no constriction in a normal pupil.<br><br>
    <strong>Atropine response test:</strong> in dysautonomia, atropine 0.04 mg/kg SC produces no rise in heart rate (failed parasympathetic blockade) — supportive evidence.<br><br>
    <strong>Cocaine 10% or apraclonidine 0.5%</strong>: classical Horner's confirmation tests in humans — limited availability and not routinely used in veterinary practice; phenylephrine is the practical choice.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 4 — CHROMATIC PLR + ERG (when vision is lost)</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Chromatic PLR</strong> (handheld melanopsin-targeted device): differentiates retinal vs optic nerve vs cortical blindness when both eyes are blind with dilated pupils.<br>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 6px;font-size:9.5px;margin:4px 0;">
      <div style="font-weight:600;">Condition</div><div style="font-weight:600;">Red PLR</div><div style="font-weight:600;">Blue PLR</div>
      <div>Normal</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
      <div>SARDS</div><div style="color:#F87171;">Absent</div><div style="color:#6EE7B7;">Present</div>
      <div>Optic neuritis</div><div style="color:#F87171;">Absent</div><div style="color:#F87171;">Absent</div>
      <div>End-stage retinal degeneration</div><div style="color:#F87171;">Absent</div><div style="color:#FCD34D;">Reduced / absent</div>
      <div>Cortical blindness</div><div style="color:#6EE7B7;">Present</div><div style="color:#6EE7B7;">Present</div>
    </div>
    <strong>Electroretinography (ERG)</strong> — gold standard for SARDS (flat ERG) vs optic neuritis (preserved ERG, abnormal MRI). Referral.<br>
    <strong>Visual evoked potentials</strong> — central / cortical vs post-retinal. Referral.
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">STEP 5 — IMAGING + SYSTEMIC WORKUP</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>2nd-order Horner's:</strong> Thoracic radiographs ± thoracic CT (mediastinal mass, lymphoma, thymoma, lung mass at thoracic inlet), cervical exam, brachial plexus palpation, ± CT/MRI neck for cervical neoplasia.<br>
    <strong>3rd-order Horner's:</strong> Otoscopy + CT/MRI of bullae and retrobulbar space for otitis media/interna, polyp (cat), retrobulbar mass.<br>
    <strong>Central anisocoria (1st-order Horner's / CN III lesion / parasympathetic nucleus / cortical blindness):</strong> MRI brain + CSF analysis — MUA, neoplasia, CVA, infectious encephalitis.<br>
    <strong>Cataract + posterior synechiae:</strong> ocular ultrasound for posterior segment integrity prior to phacoemulsification referral; check IOP repeatedly.<br>
    <strong>Hyphaema / retinal detachment + mydriasis:</strong> blood pressure (calm × 3), CBC, biochemistry, urinalysis, coagulation, FeLV/FIV (cat), endocrine workup (HAC, hyperthyroid).<br>
    <strong>SARDS workup:</strong> ACTH stim / LDDST (HAC look-alike phenotype common), urinalysis, full biochemistry; counsel on irreversibility but rule out treatable mimics first.<br>
    <strong>Dysautonomia workup:</strong> chest radiographs (megaoesophagus), abdominal radiographs (atonic bladder, megacolon), pilocarpine + atropine tests, Schirmer, full autonomic battery.<br>
    <strong>Infectious uveitis with posterior synechiae:</strong> Toxoplasma IgG/IgM, FeLV/FIV/FCoV titre, tick-borne panel (region-dependent), fungal serology, BP.
  </div>

</div>

<div class="dx-alert" style="margin-top:10px;">
  <strong>⚠️ Therapy pearls while you investigate:</strong><br>
  • <strong>Acute glaucoma:</strong> topical latanoprost 0.005% + dorzolamide 2% + timolol 0.5%; mannitol 1 g/kg IV slow if vision-threatening — refer same day.<br>
  • <strong>Anterior uveitis with miosis:</strong> topical 1% atropine (only if IOP not elevated) + topical 1% prednisolone acetate q6–8h (no ulcer) — treat underlying cause aggressively.<br>
  • <strong>Optic neuritis (suspected MUA):</strong> aggressive immunosuppression (prednisolone 2 mg/kg/day + cytotoxic adjunct) — refer for MRI + CSF before chronic therapy.<br>
  • <strong>Idiopathic Horner's (Golden Retriever):</strong> reassure, phenylephrine 1% q6h can temporarily improve cosmesis; most resolve over weeks to months (median ~15 weeks, up to 6 months).<br>
  • <strong>Dysautonomia:</strong> supportive care, dilute pilocarpine drops to maintain pupil function, artificial tears; guarded prognosis.<br>
  • <strong>SARDS:</strong> no proven specific therapy; manage HAC-like phenotype if present; counsel on blindness and quality of life.
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
