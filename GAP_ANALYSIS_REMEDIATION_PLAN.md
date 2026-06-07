# ClinIQ — Gap-Analysis Remediation Plan

## Why this exists

We extracted *Ettinger's Textbook of Veterinary Internal Medicine, 9th edn* into committed
reference notes and produced a gap analysis comparing the textbook against ClinIQ's current
clinical data. This plan turns that gap analysis into an **actionable, checkable work list** for
expanding and enriching ClinIQ's content (`src/data/db.ts` + the sign flows/Dx views).

ClinIQ today holds **21 sign screens, ~206 disease pages, ~444 lesion rows, ~167 differentials,
36 protocols**. The gap analysis surfaced three buckets, each tackled by a phase below:
- **Enrich** existing pages with staging/criteria/doses they currently lack (fast, high value).
- **Add** missing disease pages — prioritising ones that link from *existing* sign screens.
- **Add** missing sign screens (larger builds: flowchart + Dx view + linked diseases).

> The "missing" items below were **verified absent** from `db.ts` (grep pass on 2026-06-07),
> not just inferred — though final IDs/scope are confirmed at authoring time.

## Source data to use (in priority order)

| Source | Use for |
|---|---|
| `references/ettinger9-notes.md` | The primary content source. Cite by chapter `(Ettinger Ch NN)`. Has differential lists, diagnostic criteria, staging/grading, lab thresholds, drug doses — already tagged inline with `> ClinIQ:`. |
| `references/ettinger9-gap-analysis.md` | The gap summary this plan operationalises (covered / missing / enrich tables). |
| `references/vetoph6-notes.md` | Ophthalmology source (already backs the eye signs) — use for any eye-adjacent entries. |
| `src/data/db.ts` | The target. Disease pages (`DIS-*`), lesions (`LES-*`), protocols (`PROT-*`), differentials (`D-*`). |
| `src/lib/signs/` | The sign flowcharts (`flows/`) + Dx views (`dx/`) + registry. |

> ⚠️ **Clinical safety:** verify every drug dose against a current formulary before shipping.
> Keep dog vs cat doses distinct. **Use SDMA in µg/dL** (the Ettinger IRIS table has a unit typo —
> it prints ng/dL). Values marked `[unclear in PDF]` in the notes must be re-checked at source.

---

## How to implement — best practices

### 1. Read the skills first (every time)
- **`flowchart-data`** — the data model: `FlowPage`/`Block` (flows), `DxApproach`/`DxBlock` (dx),
  and the `db.ts` record shapes (`DiseaseRow`/`LesionRow`/`ProtocolRow`/`DiffRow`). This is the
  authoritative "database skill" for ClinIQ content. **Start here for any disease/sign edit.**
- **`screen-components`** — how that data is rendered (the `View` router, per-screen React
  components, the audited `RichText` HTML boundary). Read before changing how anything *displays*.
- **`styling-system`** — the "design skill": Tailwind v4 tokens in `globals.css`, the `HUE`/`TITLE`
  tone tables, light/dark mode. Read before touching any colour/spacing/tone.
- **`frontend-design`** — only for genuinely net-new bespoke UI; ClinIQ's own system
  (screen-components + styling-system) governs the existing screens, so prefer those.

### 2. Data-model cheat-sheet (from `flowchart-data`)
- A **disease page** = a plain object in `DB.disease_page` (`src/data/db.ts`). Copy a flagship
  neighbour's shape — **`DIS-HCM`** is the depth bar; smaller pages can copy a leaner neighbour.
- A **new sign** = `flows/<sign>.ts` (entry `FlowPage`, `id` = registry id) **+** `dx/<sign>.ts`
  (`DxApproach` with `history`/`exam`/`dx` tabs) **+** an entry in `SIGNS` (`registry.ts`) **+**
  wiring into `FLOWS` (`flows/index.ts`) and `DX` (`dx/index.ts`). Exemplars: `flows/epistaxis.ts`
  (clean), `flows/blindEye.ts` (tables + tones), `flows/redEye.ts` (`fn` layout).
- **Links are typed objects**, never raw onclick: `{to:'disease', id:'DIS-X'}`, `{to:'protocol',…}`,
  `{to:'lesion', loc, name}`, `{to:'flow', id}`, `{to:'dx', id}`.

### 3. Build order — data-first (avoids red tests)
1. Add the **target** first (the `DIS-*`/`PROT-*` record, or the new `FLOWS`/`DX` page) — the
   link-integrity test fails if a link points at an id that doesn't exist yet.
2. Then add the **links** to it from flows/Dx/other pages.
3. Then wire registry/index for new signs.

### 4. Clinical-content fidelity (non-negotiable)
- Transcribe numbers/units/species **verbatim** from the Ettinger notes; cite the chapter.
- Never paraphrase, reorder, or drop a clinical list item, entity (`&gt;`/`&lt;`/`&amp;`),
  unicode (`· ± × ≤ ≥ ↑ →`), or `<strong>`/`<em>`.
- Authored HTML renders through `RichText`'s **12-tag allowlist** (no `<a>`/`<img>`/`<script>`);
  `react/no-danger` is lint-banned. `allowlist.test.ts` enforces this.

### 5. Design / styling
- Don't invent colours or spacing. Use the CSS-variable tokens in `globals.css` and the
  `HUE`/`TITLE`/`CAT_STYLE` tone tables (`tone.ts`). Only use a `tone` when its colour matches the
  source exactly; otherwise keep the exact inline style in an `html`/`check`-`style` block.
- Match the visual altitude of existing screens (comment density, naming, idiom).
- **Verify light *and* dark mode** with the Playwright guardrail — it's the visual oracle.

### 6. Verification gates (all must stay green before commit)
```bash
npx tsc --noEmit                       # types (nothing is @ts-nocheck)
npm test                               # link integrity + registry + RichText allowlist
npx playwright test                    # 29 screens × light/dark = 58 baselines
NEXT_PUBLIC_CONVEX_URL= npm run dev    # auth-bypassed; browser-verify the new screen
# in browser console: window.__nav({kind:'disease', id:'DIS-XXX'})  (or {kind:'flow',flowId}, {kind:'dx',sign,tab})
```
Capture a new Playwright baseline only for an *intended* visual change.

### 7. Parallelisation & commits
- **Per-sign files are disjoint** (`flows/<sign>.ts`, `dx/<sign>.ts`) → safe to fan out to
  subagents. **`db.ts` is shared** → batch disease-page additions through a single editor to avoid
  merge churn; the parent wires `index.ts`/`registry.ts` and runs the gates.
- Commit atomically per domain with conventional messages (e.g.
  `✨ feat(db): add lower-urinary-tract disease pages (Ettinger ch 306–315)`).
- Use `/code-review` (bugs) and `/simplify` (cleanup) on the diff before committing.

### Definition of Done (per item)
- [ ] Content transcribed verbatim from `ettinger9-notes.md` with chapter citation
- [ ] Typed record/blocks added (no `@ts-nocheck`, no raw onclick, allowlist-clean)
- [ ] All inbound/outbound links resolve (target added first)
- [ ] `tsc` + `npm test` + `playwright` green
- [ ] Browser-verified in light **and** dark mode
- [ ] Doses sanity-checked vs formulary; dog/cat distinct

---

## Phase 0 — Validate & housekeeping (do first)

- [x] **Confirm the worklist** — re-grep `db.ts` for any item below before building (catch
      near-matches under different IDs). *(Done — 208 DIS ids extracted; all dedup pairs confirmed present.)*
- [x] **SDMA units** — confirm `DIS-SEC-CKD` / `DIS-SEC-AKI` (and any SDMA mention) use **µg/dL**.
      *(Done — CKD describes SDMA qualitatively only; no incorrect ng/dL unit present. Phase-1 IRIS staging will use µg/dL.)*
- [x] **CLAUDE.md pointer** — add a row to the "Clinical Reference PDFs" table pointing future
      sessions at `references/ettinger9-notes.md` (mirror the `vetoph6` entry): "when working on
      cardiac / renal / endocrine / GI / heme / infectious / oncology entries, read this first."
- [x] **De-duplicate existing pages** — *(neuro/endo done; ophthalmic done separately below)*. Canonical
      chosen = richer content unified onto the conventional/integrated id:
      `DIS-NEU-IVDD` (←DIS-IVDD content), `DIS-AA` (test-pinned), `DIS-NEU-WOBBLER` (←DIS-CCSM),
      `DIS-NEU-BRAINTUM` (←DIS-BRAIN-NEO), `DIS-NEU-PNST`, `DIS-ENDO-HYPERTHY` (←DIS-SEC-HYPERT),
      `DIS-NEU-OTINTERNA` (←DIS-NEU-OMI). Deleted the 7 leaner dupes, repointed all refs, fixed the
      pre-existing `@DIS-NEU-EPILEPSY`→`DIS-WK-EPILEPSY` near-match. **Ophthalmic OPH/EYE done:** the
      live eye flows link to `DIS-EYE-*` (+ `DIS-OPH-GLAUCOMA`), so unified all 8 overlapping pairs onto
      `DIS-EYE-*` and the orphan `DIS-OPH-HORNER`→`DIS-NEU-HORNERS`; kept `DIS-OPH-GLAUCOMA` (no EYE
      equivalent, used live). 16 dup pages removed in total (206→190); only dangling ref left is
      `DIS-NEU-HYDRO` (Phase 2g).

---

## Phase 1 — Enrich existing pages (low effort, high value)

Each item: edit the existing page; fold in the staging/criteria/doses from the cited chapter.

- [x] `DIS-SEC-CKD` / `DIS-SEC-AKI` — **IRIS CKD staging** (creatinine + SDMA µg/dL + UPC + BP
      substaging) and **IRIS AKI grades I–V** *(Ettinger Ch 300–301)*
- [x] `DIS-CARD-MVD` — **ACVIM MMVD staging A/B1/B2/C/D** (LA:Ao ≥1.6, LVIDDN ≥1.7, VHS >10.5/11.5)
      + EPIC pimobendan criteria + HF drug doses *(Ch 232, 229)*
- [x] `DIS-VASC-HYPERT` — **ACVIM 2018 BP categories** (<140 / 140–159 / 160–179 / ≥180 mmHg + TOD)
      + amlodipine & telmisartan doses *(Ch 236)*
- [x] `DIS-HCM`, `DIS-CARD-RCM` — **ACVIM 2020 feline cardiomyopathy staging** + LA:Ao thresholds *(Ch 234)*
- [x] `DIS-CARD-DCM` — occult/preclinical Holter + echo criteria; preclinical pimobendan (PROTECT) *(Ch 233)*
- [x] `DIS-WK-EPILEPSY` — **IVETF classification** (idiopathic/structural/reactive + Tier I–III) + ASD dose tables *(Ch 247)*
- [x] `DIS-NEU-MUE` / `DIS-GME` — cytarabine (CARE) protocol: SC 50 mg/m² q12h ×2d q3–4wk, or 200 mg/m² CRI *(Ch 242)*
- [x] `DIS-NEU-HEADTRAUMA` — Modified Glasgow Coma Scale + prognosis; mannitol dog 0.5–1 vs cat 0.25–0.5 g/kg *(Ch 246)*
- [x] `DIS-IVDD` / `DIS-NEU-IVDD` — neurologic grading 0–5; deep-pain-perception prognosis (61% vs 22.4%) *(Ch 250)*
- [x] `DIS-WK-MG` — anti-AChR titer (98% sens dogs); remission 88% dogs / 0% cats *(Ch 253)*
- [x] `DIS-GI-IBD` — CCECAI / CIBDAI scoring; cobalamin weight-banded supplementation *(Ch 262)*
- [x] `DIS-HEP-*` (chronic hepatitis/lipidosis/PSS) — bile-acid cutoffs; copper >1000 µg/g chelation
      threshold; ursodiol 10–15 mg/kg, SAMe, D-penicillamine 10–15 mg/kg *(Ch 266–271)*
- [x] `DIS-PUPD-HAC` / `DIS-SEC-HYPO` — ACTH-stim & LDDST protocols + cutoffs; trilostane 0.5–1 mg/kg
      q12h; DOCP 1.5–2.2 mg/kg; Na:K <27 *(Ch 293, 296)*
- [x] `DIS-GI-PANCAT` / `DIS-SEC-PAN-DOG` — Spec cPL ≥400 µg/L; Spec fPL; DGGR lipase *(Ch 277–278)*
- [x] `DIS-GI-EPI` — serum TLI cutoffs: dog <2.5 µg/L, cat <8.0 µg/L *(Ch 279)*
- [x] `DIS-NEO-HSA` — "rule of two-thirds" (informal); TNM stages; site-based MST *(Ch 325)*
- [x] Tox protocol pages (`PROT-TOX-*`) — cross-check antidote doses vs Ettinger (NAC, vit K1
      1.5–2.5 mg/kg q12h, fomepizole, ILE 1.5 mL/kg → 0.25 mL/kg/min) *(Ch 132–138)*

---

## Phase 2 — New disease pages that link from EXISTING sign screens

Highest impact: these light up flows that already exist. *(IDs are provisional.)*

### 2a. Lower urinary tract — links from **Haematuria** (and future Pollakiuria/Stranguria) *(Ch 306–315)*
- [x] `DIS-URO-UROLITH-STRUV` — Struvite urolithiasis (dissolution diet, pH target)
- [x] `DIS-URO-UROLITH-OXAL` — Calcium oxalate urolithiasis
- [x] `DIS-URO-UROLITH-URATE` — Urate urolithiasis (allopurinol 15 mg/kg q12h dissolution)
- [x] `DIS-URO-UROLITH-CYST` — Cystine urolithiasis (tiopronin)
- [x] `DIS-URO-UTI` — Bacterial cystitis / UTI (ISCAID sporadic vs recurrent vs subclinical)
- [x] `DIS-URO-FIC` — Feline idiopathic/interstitial cystitis (MEMO, Pandora)
- [x] `DIS-URO-URETER-OBS` — Ureteral obstruction (SUB/stent, MET: prazosin/tamsulosin)
- [x] `DIS-URO-USMI` — Urethral sphincter mechanism incompetence (PPA 1–2 mg/kg q8–12h)
- [x] `DIS-URO-ECTOPIC` — Ectopic ureter
- [x] `DIS-URO-PROSTATITIS` — Bacterial prostatitis (FQ 4–6 wk)
- [x] `DIS-URO-BPH` — Benign prostatic hyperplasia (finasteride / castration)
- [x] `DIS-URO-PROST-NEO` — Prostatic carcinoma
- [x] `DIS-URO-URETHRAL-OBS` — Urethral obstruction / plug (link from Emergency too)

### 2b. Cardio-respiratory — links from **Weakness/Collapse, Dyspnoea, Pale-MM, Coughing** *(Ch 218–219, 237–238)*
- [x] `DIS-CARD-HW` — **Heartworm / Dirofilariasis** (melarsomine 3-dose AHS protocol; doxy 10 mg/kg
      q12h ×28d) ⚠ distinct from the existing *Angiostrongylus* "lungworm" page
- [x] `DIS-CARD-ATE` — Feline arterial thromboembolism / saddle thrombus (clopidogrel 18.75 mg/cat)
- [x] `DIS-RESP-PHTN` — Pulmonary hypertension (ACVIM echo probability; sildenafil 1–4 mg/kg q8h)
- [x] `DIS-RESP-PTE` — Pulmonary thromboembolism
- [x] `DIS-RESP-EBP` — Eosinophilic bronchopneumopathy / PIE
- [x] `DIS-RESP-DH` — Diaphragmatic hernia

### 2c. Oncology — links from many signs (masses, cytopenias, paraneoplastic) *(Ch 322–331)*
- [x] `DIS-NEO-LSA` — Multicentric lymphoma (WHO staging I–V + a/b; CHOP; B vs T prognosis)
- [x] `DIS-NEO-MM` — Multiple myeloma (≥2 of 4 diagnostic criteria)
- [x] `DIS-NEO-MCT` — Mast cell tumour (Patnaik + Kiupel grading; toceranib)
- [x] `DIS-NEO-OSA` — Osteosarcoma
- [x] `DIS-NEO-TCC` — Urothelial/transitional cell carcinoma (BRAF; links from Haematuria)
- [x] `DIS-NEO-AGASACA` — Anal sac adenocarcinoma (hypercalcaemia of malignancy)
- [x] `DIS-NEO-STS` — Soft-tissue sarcoma · `DIS-NEO-MGT` — Mammary tumours · `DIS-NEO-HISTIO` — Histiocytic
- [x] `DIS-NEO-PARANEO` — Paraneoplastic syndromes (cross-cutting reference table)

### 2d. Endocrine — links from **PU/PD, Weakness** *(Ch 280–298)*
- [x] `DIS-ENDO-HYPOPTH` — Hypoparathyroidism (calcitriol + Ca)
- [x] `DIS-ENDO-PHEO` — Phaeochromocytoma (normetanephrine; phenoxybenzamine pre-op)
- [x] `DIS-ENDO-HAC-CAT` — Feline hyperadrenocorticism
- [x] `DIS-ENDO-HYPOTHY-CAT` — Feline hypothyroidism (mostly iatrogenic)
- [x] `DIS-ENDO-HYPERTHY-DOG` — Canine hyperthyroidism / thyroid carcinoma
- [x] `DIS-ENDO-HHS` — Hyperosmolar hyperglycaemic state
- [x] `DIS-ENDO-GASTRINOMA` — Gastrinoma / glucagonoma

### 2e. Renal & hepatobiliary — links from **PU/PD, Jaundice, Vomiting** *(Ch 269–275, 302–305)*
- [x] `DIS-REN-GN` — Glomerular disease / protein-losing nephropathy
- [x] `DIS-REN-RTA` — Renal tubular acidosis · `DIS-REN-AMYLOID` — Renal amyloidosis
- [x] `DIS-HEP-COPPER` — Copper-associated hepatopathy *(folded into the enriched `DIS-HEP-CHRONHEP`, which is copper-associated chronic hepatitis — not duplicated)*
- [x] `DIS-HEP-TOXIC` — Acute toxic hepatopathy · `DIS-HEP-VACUOLAR` — Vacuolar/steroid hepatopathy
- [x] `DIS-HEP-CHOLELITH` — Cholelithiasis / extrahepatic biliary obstruction
- [x] `DIS-HEP-NEO` — Hepatic & biliary neoplasia · `DIS-HEP-HE` — Hepatic encephalopathy (managed)

### 2f. GI — links from **Vomiting, Diarrhoea, Dysphagia** *(Ch 258–265)*
- [x] `DIS-GI-ESOPHAGITIS` — Oesophagitis · `DIS-GI-STRICTURE` — Oesophageal stricture
- [x] `DIS-GI-PRAA` — Vascular ring anomaly (persistent right aortic arch)
- [x] `DIS-GI-SIALOCELE` — Salivary mucocele
- [x] `DIS-GI-PERIANAL` — Perianal fistula / anal furunculosis (ciclosporin + ketoconazole)
- [x] `DIS-GI-ANALSAC` — Anal sac disease
- [x] `DIS-GI-SEPTPERIT` — Septic peritonitis (BFG >20 mg/dL, BFL <−2 mmol/L)
- [x] `DIS-GI-COBAL` — Cobalamin deficiency

### 2g. Neuro — links from **Myelopathy, Vestibular, Ataxia** *(Ch 250–255)*
- [x] `DIS-NEU-DM` — Degenerative myelopathy (SOD1) · `DIS-NEU-DYSAUTO` — Dysautonomia
- [x] `DIS-NEU-HYDRO` — Hydrocephalus · `DIS-NEU-CHIARI` — Chiari-like malformation / syringomyelia

---

## Phase 3 — New sign screens (flow + Dx + linked diseases)

Each = `flows/<sign>.ts` + `dx/<sign>.ts` + `SIGNS` entry + `FLOWS`/`DX` wiring. Prioritised by
clinical frequency. *(Ettinger §II chapters in parens.)*
- [x] **Syncope** (Ch 40) — links to cardiac arrhythmia, structural heart, neurocardiogenic
- [x] **Heart murmur** (Ch 38) — grading I–VI; links to MMVD/HCM/congenital
- [x] **Fever / FUO** (Ch 16) — FUO definition; infectious/immune/neoplastic DDx
- [x] **Melena & haematochezia** (Ch 50) — links to ulceration/AHDS/colitis/neoplasia
- [x] **Dysphagia / gagging** (Ch 47) — oral/pharyngeal/oesophageal localisation
- [x] **Pollakiuria / stranguria** (Ch 54) — links to the new LUT pages (Phase 2a)
- [x] **Constipation / tenesmus** (Ch 51) · **Peripheral oedema** (Ch 30) · **Swollen joints** (Ch 32)
- [x] Lower priority: Anorexia (17), Weight loss (18), Polyphagia (19), Cyanosis (27), Tremors (42)

---

## Phase 4 — Infectious disease expansion *(Ch 183–211)*

Diagnostics + doses already in the notes. Link from Fever (Phase 3) and relevant systemic signs.
- [x] `DIS-INFECT-LYME` (Ch 187) · `DIS-INFECT-BART` (191) · `DIS-INFECT-ANAP` (193) · `DIS-INFECT-HMYCO` (194)
- [x] `DIS-INFECT-BRUC` (189) · `DIS-INFECT-TETANUS` / `-BOTULISM` (190)
- [x] `DIS-INFECT-FIV` (198) · `DIS-INFECT-PARVO` (201) · `DIS-INFECT-RABIES` (202)
- [x] `DIS-INFECT-COCCI` (208) · `DIS-INFECT-BLASTO` / `-HISTO` (209) · `DIS-INFECT-CYTAUX` (197)
- [x] Enteric bacterial (Salmonella/Campylobacter/Clostridia) — link from Diarrhoea (195)

---

## Phase 5 — Cross-cutting / lower priority

- [x] Heme/immune pages: `DIS-BD-NRA` (non-regen anaemia work-up), `DIS-BD-PV` (polycythaemia vera),
      `DIS-IMPA` (immune polyarthritis), `DIS-IM-SLE`, `DIS-IM-PEMPHIGUS`, `DIS-IM-IMMDEF`,
      `DIS-SPLEEN` (splenic disease/masses), `DIS-BD-HYPERCOAG` *(Ch 171–182)*
- [x] Emergency protocols: `PROT-ANAPHYLAXIS` (Ch 129), `PROT-SEPSIS` (SIRS criteria, Ch 128)
- [x] Toxicology additions: metaldehyde, tremorgenic mycotoxins, ibuprofen-specific, lead,
      methaemoglobinaemia agents *(Ch 132–138)*
- [x] Respiratory: `DIS-RESP-IPF` (idiopathic pulmonary fibrosis), `DIS-RESP-BOAS` *(Ch 217, 214)*

---

## Progress log

_(Append a line per completed chunk: date · phase/item · commit SHA · notes.)_

- _2026-06-07 — Plan created; gap list verified against db.ts._
- _2026-06-07 — Phase 0.1–0.3 · confirmed worklist (208 DIS ids), SDMA units (CKD qualitative, no ng/dL bug), added Ettinger pointer to CLAUDE.md._
- _2026-06-07 — Phase 0.4 (neuro/endo dedup) · merged 7 dup pairs onto canonical ids, repointed all refs, fixed @DIS-NEU-EPILEPSY near-match. 22 dup lines removed; tsc/test green. Only dangling ref left = DIS-NEU-HYDRO (Phase 2g). Ophthalmic OPH/EYE dedup still pending._
- _2026-06-07 — Phase 0.4 (ophthalmic dedup) · unified DIS-OPH-* dupes onto live DIS-EYE-* set (+DIS-NEU-HORNERS), kept DIS-OPH-GLAUCOMA. 9 dup pages removed (134 lines); tsc/test green._
- _2026-06-07 — Phase 1 COMPLETE (renal, cardiac, neuro, GI/pancreas, hepatobiliary, endocrine, onco, tox). 17 enrichment items across ~25 pages. Repaired the missing posthog-js dep (tsc 3→0). Notes: MG feline remission stated qualitatively (source has no literal 0%); serum bile-acid numeric cutoffs absent from source (kept qualitative); feline Spec fPL has no clean cutoff in source. disease-hcm Playwright baseline needs regeneration in canonical env (intended growth). tsc 0 + 79 tests green throughout._
- _2026-06-07 — Phase 2 COMPLETE (2a–2g). Added 62 new disease pages via verbatim subagent drafting + parent splice/verify: LUT (13), cardio-resp (6), oncology (9), endocrine (7), renal/hepatobiliary (8), GI (8), neuro (4). DIS-HEP-COPPER folded into enriched DIS-HEP-CHRONHEP. Wired haematuria lesion rows (cystitis/FIC/urethral-obstruction/BPH/prostatitis/prost-carcinoma/pyelo/TCC) → new pages. 190→245 disease pages; DIS-NEU-HYDRO dangling ref RESOLVED — dangling scan now empty. tsc 0 + 79 tests green throughout._
- _2026-06-07 — Phase 4 COMPLETE. Added 14 infectious-disease pages (Lyme, Bartonella, Anaplasma, haemotropic Mycoplasma, Brucella, Tetanus, Botulism, Cytauxzoon, enteric bacterial, FIV, Rabies, Cocci, Blasto, Histo). Skipped DIS-INFECT-PARVO (covered by existing DIS-GI-PARVO). 245→259 disease pages; dangling scan empty; tsc 0 + 79 tests green._
- _2026-06-07 — Phase 5 COMPLETE. Added 10 heme/immune/respiratory disease pages (NRA, polycythaemia, IMPA, SLE, pemphigus, immunodeficiency, splenic disease, hypercoagulability, IPF, BOAS) + 6 protocols (PROT-ANAPHYLAXIS, PROT-SEPSIS, PROT-TOX-METALD/-MYCOTOX/-LEAD/-METHB). 259→269 disease pages, 36→42 protocols; dangling scan empty; tsc 0 + 79 tests green._
- _2026-06-07 — Phase 3 COMPLETE. Added 14 new sign screens (flow + dx + registry/index wiring): pollakiuria, syncope, heart-murmur, fever/FUO, dysphagia, melena/haematochezia, constipation, peripheral-oedema, swollen-joints, anorexia, weight-loss, polyphagia, cyanosis, tremors. SIGNS 21→35; tsc 0 + 93 tests green; browser-verified flows + dx tabs render (incl. Levine/PMI table blocks). ALL PHASES COMPLETE._
