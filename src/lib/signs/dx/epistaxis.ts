// ── Epistaxis — diagnostic approach (data) ──────────────────────────────────
// Migration of epistaxisDx{History,Exam,Dx}Html (legacy HTML consts in
// ../epistaxis.ts) to the typed DxApproach model. Rendered by renderDxApproach.
// Pilot for the Dx-view migration — see DATA_MIGRATION.md.

import type { DxApproach } from '../dxTypes'

export const epistaxisDx: DxApproach = {
  title: 'Epistaxis',
  tabs: {

  history: {
    title: 'History: Epistaxis',
    blocks: [
      { kind: 'branch', text: 'GOAL: LOCALISE vs SYSTEMATISE' },
      {
        kind: 'row',
        cols: 2,
        items: [
          {
            style: 'text-align:left;font-size:9px;',
            html: `<strong style="font-size:10px;">🔵 Points to LOCAL (intranasal)</strong><br>
      Chronic nasal signs (esp. neoplasia)<br>
      Sneezing · stertor · mucopurulent discharge<br>
      Unilateral epiphora · facial rubbing / pain<br>
      No history of bleeding elsewhere`,
          },
          {
            style: 'text-align:left;background:#0D7377;font-size:9px;',
            html: `<strong style="font-size:10px;">🩸 Points to SYSTEMIC</strong><br>
      Bleeding at extra-nasal sites<br>
      Lethargy · inappetence · weight loss<br>
      Historical bleeding tendency<br>
      Rodenticide / drug / tick exposure`,
          },
        ],
      },
      { kind: 'step', text: '📋 ONSET, DURATION & TYPE OF NASAL SIGNS' },
      {
        kind: 'check',
        html: `<strong>Chronic nasal signs</strong> → favour intranasal disease, particularly <strong>neoplasia</strong>.<br>
    <strong>Acute onset</strong> → favours trauma; foreign body can be acute (violent sneezing) then become chronic.<br>
    <strong>Other nasal-tract signs</strong> (sneezing, stertor, mucopurulent discharge, unilateral epiphora, nasal planum depigmentation, facial rubbing/pain) are more common with intranasal disease.<br>
    <strong>Mucoid / mucopurulent discharge is rare in systemic causes</strong> — its presence shifts you toward local disease.`,
      },
      { kind: 'step', alt: true, text: '💊 MEDICATION / TOXIN EXPOSURE' },
      {
        kind: 'check',
        html: `<strong>Drugs that increase bleeding tendency:</strong> aspirin / other NSAIDs, clopidogrel, rivaroxaban — ask specifically and consider discontinuing.<br>
    <strong>Topical nasal sprays / inhaled medications</strong> may locally irritate the nasal mucosa.<br>
    <strong>Anticoagulant rodenticide</strong> — assess potential access in any patient with other signs of haemorrhage; treat empirically with Vitamin K1 if suspected.<br>
    <strong>Chemotherapy / oestrogens</strong> → marrow suppression / thrombocytopenia.`,
      },
      { kind: 'step', alt: true, text: '🩺 SYSTEMIC & BLEEDING HISTORY' },
      {
        kind: 'check',
        html: `<strong>Systemic signs</strong> (lethargy, inappetence, weight loss) → more common with systemic causes.<br>
    <strong>Bleeding at other (extra-nasal) sites</strong> → strongly favours systemic disease; most likely with severe thrombocytopenia.<br>
    <strong>Historical bleeding tendency, especially in a young patient</strong> (umbilical, deciduous-tooth, post-neuter or post-surgical bleeding) → inherited coagulopathy / von Willebrand disease.<br>
    <strong>Melena</strong> may simply be swallowed blood — do not over-interpret as a GI/systemic bleed.`,
      },
      { kind: 'step', alt: true, text: '🌍 GEOGRAPHIC / LIFESTYLE / BREED CLUES' },
      {
        kind: 'check',
        html: `<strong>Tick exposure, preventive history, geographic location & travel</strong> → vector-borne disease risk (ehrlichiosis, leishmaniosis, anaplasmosis, babesiosis, RMSF).<br>
    <strong>Geography</strong> also drives fungal rhinitis risk (e.g. <em>Aspergillus</em>, <em>Cryptococcus</em>).<br>
    <strong>Outdoor / free-roaming</strong> → higher chance of traumatic or infectious cause.<br>
    <strong>Breed dispositions:</strong>
    <div style="margin-left:8px;">
      • Doberman, Pembroke Welsh Corgi, Scottish Terrier, Shetland Sheepdog, Chesapeake Bay Retriever, Pointer → <strong>von Willebrand disease</strong><br>
      • Greater Swiss Mountain Dog → P2Y12 platelet-receptor mutation (thrombocytopathia)<br>
      • Otterhound, Great Pyrenees → Glanzmann thrombasthenia<br>
      • Dolichocephalic breeds (Collie, GSD, Greyhound) → predisposed to nasal neoplasia / aspergillosis
    </div>
    <strong>Concurrent dermatologic disease</strong> was more common in dogs with idiopathic rhinitis.`,
      },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS IN THE HISTORY',
        html: `Bleeding at multiple sites + lethargy / weight loss = systemic disease until proven otherwise · Young animal with lifelong/recurrent bleeding = inherited coagulopathy — test before any surgery · Possible rodenticide access = empirical Vitamin K1 now · Chronic unilateral nasal signs in an older dolichocephalic dog = neoplasia high on list.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Epistaxis',
    blocks: [
      { kind: 'step', tone: 'teal', text: '🩺 A complete PE is imperative — include FUNDIC + RECTAL exam' },
      { kind: 'step', text: '👃 STEP 1 — CHARACTERISE THE EPISTAXIS' },
      {
        kind: 'check',
        html: `<strong>Unilateral or bilateral?</strong> Note it, but it does <strong>not</strong> reliably predict local vs systemic (52% of systemic cases were unilateral).<br>
    <strong>Decreased nasal airflow</strong> may indicate intranasal disease — but any epistaxis can occlude the nostril with clot, so interpret cautiously.<br>
    <strong>Gross abnormalities</strong> of the nose, frontal sinus, or palate deformities are essentially limited to intranasal disease.`,
      },
      { kind: 'step', alt: true, text: '🔵 STEP 2 — LOCAL (INTRANASAL) SIGNS' },
      {
        kind: 'check',
        html: `Sneezing, stertor, mucopurulent nasal discharge, unilateral epiphora, nasal planum depigmentation, <strong>reduced ocular retropulsion</strong> (retrobulbar extension), facial pain / rubbing.<br>
    <strong>Regional (submandibular) lymphadenopathy</strong> — in one study was seen <em>only</em> with intranasal disease.<br>
    <strong>Dental disease</strong> — assess closely for periodontal disease, periapical infection, palate erosion / oronasal fistula.`,
      },
      { kind: 'step', alt: true, text: '🩸 STEP 3 — SIGNS OF SYSTEMIC HAEMORRHAGE' },
      {
        kind: 'check',
        html: `<strong>Primary haemostatic pattern (mucosal/cutaneous):</strong> petechiae, ecchymoses, gingival haemorrhage, increased bruising at venepuncture sites, melena (caution — may be swallowed blood).<br>
    <strong>Secondary haemostatic pattern:</strong> cavity bleeding (haemoperitoneum, haemothorax, haemarthrosis), haematomas.<br>
    <strong>Generalised lymphadenopathy</strong> → consider lymphoma, ehrlichiosis, leishmaniosis.`,
      },
      { kind: 'step', alt: true, text: '👁️ STEP 4 — OPHTHALMIC & NEURO EXAM' },
      {
        kind: 'check',
        html: `<strong>Uveitis</strong> (aqueous flare) → neoplastic / infectious disease (fungal, leishmaniosis).<br>
    <strong>Focal retinal haemorrhage</strong> → vasculitis, vector-borne disease, fungal disease, systemic hypertension, any bleeding diathesis.<br>
    <strong>Hyphema</strong> → systemic bleeding disorder.<br>
    <strong>Retinal detachment</strong> — exudative (ehrlichiosis) or serous (panuveitis: lymphoma, systemic fungal); also classic for hypertension.<br>
    <strong>Neurologic abnormalities</strong> → intracranial extension of nasal disease, or concurrent intracranial bleeding (more common with systemic causes).`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 5 — PATTERN RECOGNITION' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:5px 8px;font-size:10px;line-height:1.45;">
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
      <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
      <div>Chronic unilateral signs + facial deformity + ↓ retropulsion + submandibular LN</div><div style="color:#DDD6FE;">Nasal neoplasia</div>
      <div>Nasal planum depigmentation/ulceration + marked nasal pain + fungal plaques</div><div style="color:#A7F3D0;">Aspergillosis</div>
      <div>Peracute violent sneezing + pawing at nose, outdoor dog</div><div style="color:#FED7AA;">Nasal foreign body</div>
      <div>Petechiae + ecchymoses + multiple-site mucosal bleeding</div><div style="color:#F87171;">Thrombocytopenia / IMTP</div>
      <div>Mucosal bleeding + normal platelet count (predisposed breed)</div><div style="color:#FCD34D;">vWD / thrombocytopathia</div>
      <div>Cavity bleed / haematoma + access to bait</div><div style="color:#93C5FD;">Anticoagulant rodenticide</div>
      <div>Hyperglobulinaemia + hyperviscosity signs (retinal, neuro)</div><div style="color:#C4B5FD;">Myeloma / hyperviscosity</div>
      <div>Retinal haemorrhage + thrombocytopenia + tick exposure</div><div style="color:#C4B5FD;">Vector-borne disease</div>
    </div>`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Epistaxis — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST' },
      {
        kind: 'check',
        html: `1. Epistaxis <strong>rarely</strong> is a true emergency — but severe haemorrhage can cause anaemia, hypovolaemia or upper-airway obstruction.<br>
    2. <strong>Transfuse</strong> (whole blood / pRBC) for symptomatic anaemia; <strong>fluid resuscitate</strong> hypovolaemic patients — especially to stabilise before GA for CT / rhinoscopy.<br>
    3. <strong>Plasma transfusion</strong> for severe haemorrhage with suspected factor deficiency / antagonism (haemophilia, rodenticide).<br>
    4. <strong>Protect the airway</strong> — consider intubation if risk of obstruction or aspiration; interventional control is ideally performed on an anaesthetised, intubated patient.<br>
    5. Minimise venepuncture sites, use small-gauge needles and prolonged pressure if a coagulopathy is suspected.`,
      },
      { kind: 'step', alt: true, text: 'STEP 2 — MINIMUM DATABASE (every significant case)' },
      {
        kind: 'check',
        html: `<strong>CBC + blood smear:</strong>
    <div style="margin-left:8px;">
      • Platelet count — clinical bleeding usually needs <strong>severe</strong> thrombocytopenia (&lt;30–50 ×10⁹/L). Confirm on a fresh smear; manual estimate = mean platelets/100× field × 15 ×10⁹/L. Check the feathered edge for clumping.<br>
      • Anaemia from blood loss is expected to be <strong>regenerative</strong> (reticulocytosis, polychromasia) — but peracute loss may be pre-regenerative.<br>
      • Platelet count does NOT reliably separate local from systemic disease.
    </div>
    <strong>Serum chemistry:</strong> screen for systemic disease (azotaemia, ↑ liver enzymes, hypercalcaemia). <strong>Hyperglobulinaemia</strong> is key — moderate–severe with ehrlichiosis, leishmaniosis, myeloma → follow with protein electrophoresis (mono- vs polyclonal). Rarely <em>cryoglobulinaemia</em>.<br>
    <strong>Urinalysis:</strong> underlying renal disease + haematuria (wider mucosal haemorrhage).<br>
    <strong>Blood pressure (ideally Doppler):</strong> hypertension exacerbates bleeding — measure especially with retinal haemorrhage or neuro signs.`,
      },
      { kind: 'step', alt: true, text: 'STEP 3a — IF LOCAL DISEASE SUSPECTED → IMAGE' },
      {
        kind: 'check',
        html: `<strong>CT is the imaging modality of choice</strong> — cross-sectional, fine bony detail, faster than skull radiographs; image <em>before</em> rhinoscopy/biopsy (blood obscures the scan).<br>
    <strong>Rhinoscopy</strong> is complementary — direct mucosal assessment + biopsy, but cannot assess bony involvement.<br>
    <strong>Radiography</strong> — limited by superimposition; largely superseded by CT. <strong>MRI</strong> — superior soft-tissue / intracranial-extension detail.<br>
    ⚠️ Radiopacity, bony lysis and frontal-sinus involvement occur with BOTH malignant and benign disease (fungal, FB, lymphoplasmacytic) — imaging <strong>cannot</strong> distinguish them; <strong>biopsy / histopathology is required</strong>.<br>
    <strong>Fungal testing</strong> (cytology, fungal plaques on rhinoscopy, serology/PCR) and <strong>parasite testing</strong> as indicated.`,
      },
      { kind: 'step', alt: true, text: 'STEP 3b — IF SYSTEMIC DISEASE SUSPECTED → COAGULATION TIERS' },
      {
        kind: 'check',
        html: `<strong>Primary haemostasis</strong> (epistaxis is classically a mucosal/primary-defect bleed):
    <div style="margin-left:8px;">
      • Platelet count + smear estimate (above)<br>
      • Platelet function — BMBT (point-of-care screen; normal dog &lt;3 min), point-of-care analysers, aggregometry, flow cytometry<br>
      • <strong>vWF:Ag</strong> if normal platelet count + mucosal bleeding, esp. predisposed breeds (&gt;70% normal; &lt;50% at risk; &lt;25% severely affected)
    </div>
    <strong>Secondary haemostasis — PT / aPTT:</strong>
    <div style="margin-left:8px;">
      • Both prolonged → common pathway, vitamin K antagonism, liver disease, DIC<br>
      • aPTT only → haemophilia A (VIII), B (IX), C (XI), contact factors<br>
      • PT only → factor VII deficiency or <em>early</em> vitamin K antagonism (shortest half-life)<br>
      • PT/aPTT are normal in primary haemostatic disorders (and were normal in all 35 dogs in one epistaxis series)
    </div>
    <strong>Tertiary haemostasis (fibrinolysis):</strong> D-dimers / FDPs (sensitive, not specific) and <strong>viscoelastic testing (TEG/ROTEM)</strong> for hyperfibrinolysis (DIC, hepatic failure, <em>Angiostrongylus</em>, greyhound post-op bleeding).<br>
    <strong>Infectious / vector-borne testing</strong> (Ehrlichia, Anaplasma, Babesia, Leishmania, RMSF) per geography.`,
      },
      { kind: 'step', alt: true, text: 'STEP 4 — TREATMENT POINTERS' },
      {
        kind: 'check',
        html: `<strong>Emergent local control (stepwise, least → most invasive):</strong> firm compression of the soft nose 5–15 min (use a timer); topical vasoconstrictor — dilute epinephrine 1:10,000 or phenylephrine 1 mg/mL on packing (caution: systemic absorption; avoid in cardiac/hypertensive patients); ice pack on the nasal bridge / chilled-saline flush (anaesthetised, packed); silver-nitrate cautery or electrocautery under visualisation; nasal packing (resorbable e.g. Surgicel/Gelfoam if a bleeding disorder, or non-resorbable); topical/oral <strong>antifibrinolytics</strong> (tranexamic acid, aminocaproic acid); ± Yunnan Baiyao (topical evidence stronger than oral).<br>
    <strong>Refractory:</strong> sphenopalatine artery ligation, endovascular maxillary-artery embolisation, Foley-balloon tamponade, or (last resort) carotid ligation — refer.<br>
    <strong>Targeted by cause:</strong> radiation for nasal tumours; topical clotrimazole ± sinus trephination for aspergillosis; dental extraction / oronasal-fistula repair for periapical disease; endoscopic FB retrieval; maxillofacial repair for trauma; plasmapheresis for hyperviscosity.<br>
    <strong>Systemic disease:</strong> immunosuppression for IMTP; Vitamin K1 ± plasma for rodenticide; antimicrobials for vector-borne disease; antihypertensives for hypertension; discontinue NSAIDs / clopidogrel / rivaroxaban.`,
      },
    ],
    after: [
      {
        kind: 'diseaseGrid',
        title: '📋 LINKED DISEASE PAGES',
        links: [
          { label: 'Nasal / paranasal neoplasia', link: { to: 'disease', id: 'DIS-NASAL-NEO' } },
          { label: 'Sinonasal aspergillosis', link: { to: 'disease', id: 'DIS-NASAL-ASP' } },
          { label: 'Lymphoplasmacytic rhinitis', link: { to: 'disease', id: 'DIS-NASAL-LPR' } },
          { label: 'Nasal foreign body', link: { to: 'disease', id: 'DIS-NASAL-FB' } },
          { label: 'Nasal trauma', link: { to: 'disease', id: 'DIS-NASAL-TRAUMA' } },
          { label: 'Bleeding / haemostasis workup', link: { to: 'dx', id: 'bleeding' } },
          { label: 'Immune-mediated thrombocytopenia', link: { to: 'disease', id: 'DIS-BD-IMTP' } },
          { label: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' } },
        ],
      },
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️ Practical pearls:</strong><br>
  • Local vs systemic is the first decision — but unilateral vs bilateral won't make it for you.<br>
  • Always run a minimum database (CBC + smear, chemistry, UA, BP) even when disease looks obviously local.<br>
  • Confirm thrombocytopenia on a fresh smear before calling it — clumping falsely lowers analyser counts.<br>
  • Image with CT <em>before</em> rhinoscopy/biopsy, and remember imaging can't distinguish tumour from fungal/inflammatory disease — biopsy.<br>
  • Melena in an epistaxis patient is often swallowed blood, not a second bleed.<br>
  • Mild, single, self-limiting nosebleeds (e.g. after a sneeze or minor knock) may not need a full work-up — reserve that for severe or recurrent epistaxis.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
