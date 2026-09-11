// ── Epistaxis — diagnostic approach (data) ──────────────────────────────────
// Migration of epistaxisDx{History,Exam,Dx}Html (legacy HTML consts in
// ../epistaxis.ts) to the typed DxApproach model. Rendered by renderDxApproach.
// Pilot for the Dx-view migration.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

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
            style: 'text-align:left;background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));color:var(--tone-teal-fg);font-size:9px;',
            html: `<strong style="font-size:10px;">🩸 Points to SYSTEMIC</strong><br>
      Bleeding at extra-nasal sites<br>
      Lethargy · inappetence · weight loss<br>
      Historical bleeding tendency<br>
      Rodenticide / drug / tick exposure`,
          },
        ],
      },

      ...stepTable(1, 'ONSET, DURATION & TYPE OF NASAL SIGNS', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Chronic nasal signs</strong>', { text: 'Intranasal disease, particularly <strong>neoplasia</strong>', tone: 'teal' }],
          ['<strong>Acute onset</strong>', { text: 'Trauma. A foreign body can be acute (violent sneezing) then become chronic', tone: 'teal' }],
          ['<strong>Other nasal-tract signs</strong><br>sneezing · stertor · mucopurulent discharge · unilateral epiphora · nasal planum depigmentation · facial rubbing or pain', { text: 'More common with intranasal disease', tone: 'teal' }],
          ['<strong>Mucoid / mucopurulent discharge</strong>', { text: '<strong>Rare in systemic causes</strong> — its presence shifts you toward local disease', tone: 'teal' }],
        ],
      }, '📋'),

      ...stepTable(2, 'MEDICATION / TOXIN EXPOSURE', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Exposure', { text: 'Effect', tone: 'teal' }],
        rows: [
          ['<strong>Drugs increasing bleeding tendency</strong>', { text: 'Aspirin / other NSAIDs · clopidogrel · rivaroxaban — ask specifically and consider discontinuing', tone: 'teal' }],
          ['<strong>Topical nasal sprays / inhaled medications</strong>', { text: 'May locally irritate the nasal mucosa', tone: 'teal' }],
          ['<strong>Anticoagulant rodenticide</strong>', { text: 'Assess potential access in any patient with other signs of haemorrhage — treat empirically with Vitamin K1 if suspected', tone: 'danger' }],
          ['<strong>Chemotherapy / oestrogens</strong>', { text: 'Marrow suppression → thrombocytopenia', tone: 'teal' }],
        ],
      }, '💊'),

      ...stepTable(3, 'SYSTEMIC & BLEEDING HISTORY', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['History', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Systemic signs</strong> — lethargy · inappetence · weight loss', { text: 'More common with systemic causes', tone: 'teal' }],
          ['<strong>Bleeding at other (extra-nasal) sites</strong>', { text: 'Strongly favours systemic disease — most likely with severe thrombocytopenia', tone: 'teal' }],
          ['<strong>Historical bleeding tendency, especially in a young patient</strong><br>umbilical · deciduous-tooth · post-neuter or post-surgical bleeding', { text: 'Inherited coagulopathy / von Willebrand disease', tone: 'teal' }],
          ['<strong>Melena</strong>', { text: 'May simply be swallowed blood — do not over-interpret as a GI / systemic bleed', tone: 'teal' }],
        ],
      }, '🩺'),

      { kind: 'step', text: '🌍 STEP 4 — GEOGRAPHIC / LIFESTYLE / BREED CLUES', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Factor', { text: 'Risk', tone: 'teal' }],
        rows: [
          ['<strong>Tick exposure · preventive history · geography · travel</strong>', { text: 'Vector-borne disease — ehrlichiosis · leishmaniosis · anaplasmosis · babesiosis · RMSF', tone: 'teal' }],
          ['<strong>Geography</strong>', { text: 'Also drives fungal rhinitis risk — <em>Aspergillus</em> · <em>Cryptococcus</em>', tone: 'teal' }],
          ['<strong>Outdoor / free-roaming</strong>', { text: 'Higher chance of a traumatic or infectious cause', tone: 'teal' }],
          ['<strong>Concurrent dermatologic disease</strong>', { text: 'More common in dogs with idiopathic rhinitis', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Breed dispositions',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Breed', { text: 'Predisposition', tone: 'teal' }],
        rows: [
          ['Doberman · Pembroke Welsh Corgi · Scottish Terrier · Shetland Sheepdog · Chesapeake Bay Retriever · Pointer', { text: '<strong>von Willebrand disease</strong>', tone: 'teal' }],
          ['Greater Swiss Mountain Dog', { text: 'P2Y12 platelet-receptor mutation (thrombocytopathia)', tone: 'teal' }],
          ['Otterhound · Great Pyrenees', { text: 'Glanzmann thrombasthenia', tone: 'teal' }],
          ['Dolichocephalic breeds — Collie · GSD · Greyhound', { text: 'Predisposed to nasal neoplasia / aspergillosis', tone: 'teal' }],
        ],
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

      ...stepTable(1, 'CHARACTERISE THE EPISTAXIS', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Feature', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Unilateral or bilateral?</strong>', { text: 'Note it, but it does <strong>not</strong> reliably predict local vs systemic — 52% of systemic cases were unilateral', tone: 'teal' }],
          ['<strong>Decreased nasal airflow</strong>', { text: 'May indicate intranasal disease — but any epistaxis can occlude the nostril with clot, so interpret cautiously', tone: 'teal' }],
          ['<strong>Gross abnormalities of the nose, frontal sinus, or palate deformities</strong>', { text: 'Essentially limited to intranasal disease', tone: 'teal' }],
        ],
      }, '👃'),

      ...stepTable(2, 'LOCAL (INTRANASAL) SIGNS', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Nasal signs</strong>', { text: 'Sneezing · stertor · mucopurulent nasal discharge · unilateral epiphora · nasal planum depigmentation · facial pain or rubbing', tone: 'teal' }],
          ['<strong>Reduced ocular retropulsion</strong>', { text: 'Retrobulbar extension', tone: 'teal' }],
          ['<strong>Regional (submandibular) lymphadenopathy</strong>', { text: 'In one study seen <em>only</em> with intranasal disease', tone: 'teal' }],
          ['<strong>Dental disease</strong>', { text: 'Assess closely for periodontal disease · periapical infection · palate erosion / oronasal fistula', tone: 'teal' }],
        ],
      }, '🔵'),

      ...stepTable(3, 'SIGNS OF SYSTEMIC HAEMORRHAGE', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Pattern', { text: 'Findings', tone: 'teal' }],
        rows: [
          ['<strong>Primary haemostatic</strong> — mucosal / cutaneous', { text: 'Petechiae · ecchymoses · gingival haemorrhage · increased bruising at venepuncture sites · melena (caution — may be swallowed blood)', tone: 'teal' }],
          ['<strong>Secondary haemostatic</strong>', { text: 'Cavity bleeding (haemoperitoneum · haemothorax · haemarthrosis) · haematomas', tone: 'teal' }],
          ['<strong>Generalised lymphadenopathy</strong>', { text: 'Consider lymphoma · ehrlichiosis · leishmaniosis', tone: 'teal' }],
        ],
      }, '🩸'),

      ...stepTable(4, 'OPHTHALMIC & NEURO EXAM', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Uveitis</strong> (aqueous flare)', { text: 'Neoplastic / infectious disease — fungal · leishmaniosis', tone: 'teal' }],
          ['<strong>Focal retinal haemorrhage</strong>', { text: 'Vasculitis · vector-borne disease · fungal disease · systemic hypertension · any bleeding diathesis', tone: 'teal' }],
          ['<strong>Hyphaema</strong>', { text: 'Systemic bleeding disorder', tone: 'teal' }],
          ['<strong>Retinal detachment</strong>', { text: 'Exudative (ehrlichiosis) or serous (panuveitis: lymphoma · systemic fungal) — also classic for hypertension', tone: 'teal' }],
          ['<strong>Neurologic abnormalities</strong>', { text: 'Intracranial extension of nasal disease, or concurrent intracranial bleeding (more common with systemic causes)', tone: 'teal' }],
        ],
      }, '👁️'),

      ...stepTable(5, 'PATTERN RECOGNITION', {
        cols: '1fr 1.1fr',
        dividers: true,
        headers: ['Finding', { text: 'Most likely', tone: 'teal' }],
        rows: [
          ['Chronic unilateral signs + facial deformity + ↓ retropulsion + submandibular LN', { text: 'Nasal neoplasia', tone: 'violet' }],
          ['Nasal planum depigmentation / ulceration + marked nasal pain + fungal plaques', { text: 'Aspergillosis', tone: 'green' }],
          ['Peracute violent sneezing + pawing at nose, outdoor dog', { text: 'Nasal foreign body', tone: 'warning' }],
          ['Petechiae + ecchymoses + multiple-site mucosal bleeding', { text: 'Thrombocytopenia / IMTP', tone: 'danger' }],
          ['Mucosal bleeding + normal platelet count (predisposed breed)', { text: 'vWD / thrombocytopathia', tone: 'warning' }],
          ['Cavity bleed / haematoma + access to bait', { text: 'Anticoagulant rodenticide', tone: 'info' }],
          ['Hyperglobulinaemia + hyperviscosity signs (retinal · neuro)', { text: 'Myeloma / hyperviscosity', tone: 'violet' }],
          ['Retinal haemorrhage + thrombocytopenia + tick exposure', { text: 'Vector-borne disease', tone: 'violet' }],
        ],
      }, '🔍'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Epistaxis — Diagnostics',
    blocks: [
      { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE FIRST', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Triage</strong>`, { text: 'Epistaxis is <strong>rarely</strong> a true emergency — but severe haemorrhage can cause anaemia · hypovolaemia · upper-airway obstruction', tone: 'teal' }],
          [`${numBadge(2)}<strong>Transfuse / fluid resuscitate</strong>`, { text: 'Whole blood / pRBC for symptomatic anaemia; fluids for hypovolaemia — especially to stabilise <strong>before GA</strong> for CT / rhinoscopy', tone: 'danger' }],
          [`${numBadge(3)}<strong>Plasma transfusion</strong>`, { text: 'Severe haemorrhage with suspected factor deficiency or antagonism — haemophilia · rodenticide', tone: 'danger' }],
          [`${numBadge(4)}<strong>Protect the airway</strong>`, { text: 'Consider intubation if there is risk of obstruction or aspiration; interventional control is ideally performed on an anaesthetised, intubated patient', tone: 'danger' }],
          [`${numBadge(5)}<strong>Sampling technique</strong>`, { text: 'Minimise venepuncture sites · small-gauge needles · prolonged pressure if a coagulopathy is suspected', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🧪 STEP 2 — MINIMUM DATABASE (every significant case)', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Platelet count</strong>', { text: 'Clinical bleeding usually needs <strong>severe</strong> thrombocytopenia (&lt;30–50 ×10⁹/L). Confirm on a fresh smear — manual estimate = mean platelets/100× field × 15 ×10⁹/L. Check the feathered edge for clumping. <strong>Platelet count does NOT reliably separate local from systemic disease</strong>', tone: 'teal' }],
          ['<strong>Anaemia</strong>', { text: 'Blood loss is expected to be <strong>regenerative</strong> (reticulocytosis · polychromasia) — but peracute loss may be pre-regenerative', tone: 'teal' }],
          ['<strong>Serum chemistry</strong>', { text: 'Azotaemia · ↑ liver enzymes · hypercalcaemia. <strong>Hyperglobulinaemia</strong> is key — moderate–severe with ehrlichiosis · leishmaniosis · myeloma → follow with protein electrophoresis (mono- vs polyclonal). Rarely <em>cryoglobulinaemia</em>', tone: 'teal' }],
          ['<strong>Urinalysis</strong>', { text: 'Underlying renal disease + haematuria (wider mucosal haemorrhage)', tone: 'teal' }],
          ['<strong>Blood pressure</strong> (ideally Doppler)', { text: 'Hypertension exacerbates bleeding — measure especially with retinal haemorrhage or neuro signs', tone: 'teal' }],
        ],
      },

      ...stepTable(3, 'IF LOCAL DISEASE SUSPECTED → IMAGE', {
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Modality', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>CT — the modality of choice</strong>', { text: 'Cross-sectional · fine bony detail · faster than skull radiographs. Image <em>before</em> rhinoscopy / biopsy — blood obscures the scan', tone: 'teal' }],
          ['<strong>Rhinoscopy</strong>', { text: 'Complementary — direct mucosal assessment + biopsy, but cannot assess bony involvement', tone: 'teal' }],
          ['<strong>Radiography</strong>', { text: 'Limited by superimposition — largely superseded by CT', tone: 'teal' }],
          ['<strong>MRI</strong>', { text: 'Superior soft-tissue / intracranial-extension detail', tone: 'teal' }],
          [{ text: '⚠️ <strong>Imaging cannot distinguish tumour from benign disease</strong>', tone: 'danger' }, { text: 'Radiopacity, bony lysis and frontal-sinus involvement occur with <strong>both</strong> malignant and benign disease (fungal · FB · lymphoplasmacytic) — <strong>biopsy / histopathology is required</strong>', tone: 'danger' }],
          ['<strong>Fungal + parasite testing</strong>', { text: 'Cytology · fungal plaques on rhinoscopy · serology / PCR, as indicated', tone: 'teal' }],
        ],
      }, '📊'),

      { kind: 'step', text: '🩸 STEP 3b — IF SYSTEMIC DISEASE SUSPECTED → COAGULATION TIERS', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Primary haemostasis — epistaxis is classically a mucosal / primary-defect bleed',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Platelet count + smear estimate</strong>', { text: 'As above', tone: 'teal' }],
          ['<strong>Platelet function</strong>', { text: 'BMBT (point-of-care screen; normal dog &lt;3 min) · point-of-care analysers · aggregometry · flow cytometry', tone: 'teal' }],
          ['<strong>vWF:Ag</strong>', { text: 'If normal platelet count + mucosal bleeding, especially in predisposed breeds — &gt;70% normal · &lt;50% at risk · &lt;25% severely affected', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Secondary haemostasis — PT / aPTT',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Pattern', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Both prolonged</strong>', { text: 'Common pathway · vitamin K antagonism · liver disease · DIC', tone: 'teal' }],
          ['<strong>aPTT only</strong>', { text: 'Haemophilia A (VIII) · B (IX) · C (XI) · contact factors', tone: 'teal' }],
          ['<strong>PT only</strong>', { text: 'Factor VII deficiency or <em>early</em> vitamin K antagonism (shortest half-life)', tone: 'teal' }],
          ['<strong>Both normal</strong>', { text: 'PT/aPTT are normal in primary haemostatic disorders — and were normal in all 35 dogs in one epistaxis series', tone: 'teal' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Tertiary haemostasis & infectious testing',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Test', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>D-dimers / FDPs</strong>', { text: 'Sensitive, not specific', tone: 'teal' }],
          ['<strong>Viscoelastic testing (TEG / ROTEM)</strong>', { text: 'Hyperfibrinolysis — DIC · hepatic failure · <em>Angiostrongylus</em> · greyhound post-op bleeding', tone: 'teal' }],
          ['<strong>Infectious / vector-borne testing</strong>', { text: 'Ehrlichia · Anaplasma · Babesia · Leishmania · RMSF, per geography', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '💉 STEP 4 — TREATMENT POINTERS', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Emergent local control — stepwise, least → most invasive',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Step', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Compression</strong>`, { text: 'Firm compression of the soft nose for 5–15 min — use a timer', tone: 'teal' }],
          [`${numBadge(2)}<strong>Topical vasoconstrictor</strong>`, { text: 'Dilute epinephrine 1:10,000 or phenylephrine 1 mg/mL on packing — <strong>caution: systemic absorption; avoid in cardiac / hypertensive patients</strong>', tone: 'danger' }],
          [`${numBadge(3)}<strong>Cooling</strong>`, { text: 'Ice pack on the nasal bridge · chilled-saline flush (anaesthetised, packed)', tone: 'teal' }],
          [`${numBadge(4)}<strong>Cautery</strong>`, { text: 'Silver-nitrate or electrocautery under visualisation', tone: 'teal' }],
          [`${numBadge(5)}<strong>Nasal packing</strong>`, { text: 'Resorbable (Surgicel / Gelfoam) if a bleeding disorder, or non-resorbable', tone: 'teal' }],
          [`${numBadge(6)}<strong>Antifibrinolytics</strong>`, { text: 'Topical or oral tranexamic acid · aminocaproic acid ± Yunnan Baiyao (topical evidence stronger than oral)', tone: 'teal' }],
          [`${numBadge(7)}<strong>Refractory</strong>`, { text: 'Sphenopalatine artery ligation · endovascular maxillary-artery embolisation · Foley-balloon tamponade · (last resort) carotid ligation — <strong>refer</strong>', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Targeted by cause',
        cols: '0.75fr 1.4fr',
        dividers: true,
        headers: ['Cause', { text: 'Treatment', tone: 'teal' }],
        rows: [
          ['<strong>Nasal tumour</strong>', { text: 'Radiation', tone: 'teal' }],
          ['<strong>Aspergillosis</strong>', { text: 'Topical clotrimazole ± sinus trephination', tone: 'teal' }],
          ['<strong>Periapical disease</strong>', { text: 'Dental extraction / oronasal-fistula repair', tone: 'teal' }],
          ['<strong>Foreign body</strong>', { text: 'Endoscopic retrieval', tone: 'teal' }],
          ['<strong>Trauma</strong>', { text: 'Maxillofacial repair', tone: 'teal' }],
          ['<strong>Hyperviscosity</strong>', { text: 'Plasmapheresis', tone: 'teal' }],
          ['<strong>IMTP</strong>', { text: 'Immunosuppression', tone: 'teal' }],
          ['<strong>Rodenticide</strong>', { text: 'Vitamin K1 ± plasma', tone: 'teal' }],
          ['<strong>Vector-borne disease</strong>', { text: 'Antimicrobials', tone: 'teal' }],
          ['<strong>Hypertension</strong>', { text: 'Antihypertensives', tone: 'teal' }],
          ['<strong>Drug-induced</strong>', { text: 'Discontinue NSAIDs / clopidogrel / rivaroxaban', tone: 'teal' }],
        ],
      },
    ],
    after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
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
