# Ettinger 9th — ClinIQ Gap Analysis

Companion to [`ettinger9-notes.md`](ettinger9-notes.md), the clinical extraction of *Ettinger's
Textbook of Veterinary Internal Medicine*, 9th edn. This is the standalone gap analysis comparing
ClinIQ's current reference data (`src/data/db.ts`) against the textbook: what's well-covered, what's
missing (candidate new entries), and which existing pages to enrich. Per-disease `> ClinIQ:` tags
also appear inline throughout `ettinger9-notes.md`.

---

ClinIQ currently holds (at time of extraction): **21 sign screens**, **206 disease pages**,
**444 lesion rows**, **167 differentials**, **36 protocols**. Cross-referencing Ettinger 9th surfaced
three categories below. (Per-disease tags `> ClinIQ: ✓ / ✗ MISSING` appear inline in each section.)

## A. Well-covered domains (ClinIQ ≈ Ettinger)

- **Neurology** — brain (MUO/GME/NME, CVA, neoplasia, head trauma) and spinal (IVDD, FCE, ANNPE, AAI,
  Wobbler, DLSS, diskospondylitis), vestibular, polyneuropathies, MG. Strongest domain.
- **Ophthalmology** — already backed by `vetoph6-notes.md` (red/blind/wet eye, abnormal pupil).
- **GI** — gastric, chronic enteropathy/IBD, PLE, infectious enteritis, colitis, GDV, FB.
- **Hematology/bleeding** — coagulopathies, factor deficiencies, IMHA, ITP, vector-borne anemias.
- **Core endocrine** — DM, DKA, Cushing (dog), Addison, hypothyroid, feline hyperthyroid, insulinoma.
- **Toxicology** — most common toxicoses have protocols (chocolate, xylitol, lily, EG, NSAID, rodenticide…).

## B. MISSING — high-value candidate new entries

| Domain | Missing entries worth adding (sign-linked) |
|---|---|
| **Cardiology** | **Heartworm / Dirofilariasis** ⚠ (ClinIQ's "lungworm" page is *Angiostrongylus*, a different parasite); **Feline Arterial Thromboembolism** (saddle thrombus — links from Weakness/Pale-MM/Dyspnoea); **Congenital HD** (PDA, pulmonic stenosis, SAS, VSD); Heart-failure management protocol |
| **Respiratory** | **Pulmonary Hypertension** (sildenafil-treated); **Pulmonary Thromboembolism**; Eosinophilic Bronchopneumopathy/PIE; Idiopathic Pulmonary Fibrosis; BOAS; Diaphragmatic hernia |
| **Lower urinary** | **Urolithiasis** (struvite/Ca-oxalate/urate/cystine); **Bacterial cystitis/UTI** (ISCAID); **Feline Idiopathic Cystitis/FLUTD**; **Ureteral obstruction** (SUB/stent); **USMI / urinary incontinence**; Ectopic ureter; **Prostatitis / BPH / prostatic carcinoma**; Urethral obstruction (links from Haematuria, Pollakiuria/Stranguria) |
| **Endocrine** | Hypoparathyroidism; Feline hypothyroidism; Canine hyperthyroidism / thyroid carcinoma; Pheochromocytoma; Feline HAC; Gastrinoma/Glucagonoma; HHS (hyperosmolar) |
| **Renal** | Glomerular disease / Protein-Losing Nephropathy; Renal Tubular Acidosis; Renal amyloidosis; Familial nephropathies |
| **Hepatobiliary** | Copper-associated hepatopathy; Acute toxic hepatopathy; Vacuolar/steroid hepatopathy; Cholelithiasis / EHBO; Hepatic & biliary neoplasia; Congenital hepatic fibrosis; Hepatic encephalopathy (managed entity) |
| **Infectious** | Lyme; Bartonellosis; Anaplasmosis; Hemotropic mycoplasma; Brucellosis; Tetanus/Botulism; FIV; Parvovirus; Rabies; Coccidioidomycosis; Blastomycosis; Histoplasmosis; Cytauxzoonosis; enteric bacterial (Salmonella/Campylobacter/Clostridia) |
| **Heme/Immune** | Non-regenerative anemia work-up; Primary polycythemia vera; **Immune-mediated polyarthritis (IMPA)**; Pemphigus/immune skin; SLE; Immunodeficiencies; **Splenic disease/masses**; Hypercoagulable states/PTE |
| **Oncology** | Multicentric Lymphoma (dog/cat); Multiple Myeloma; Leukemias; **Mast Cell Tumor**; **Osteosarcoma**; Soft-tissue sarcoma; Mammary tumors; **TCC/Urothelial carcinoma**; Anal-sac adenocarcinoma; Histiocytic diseases; **Paraneoplastic syndromes** (cross-cutting) |
| **GI** | Esophagitis / Esophageal stricture; Vascular ring anomaly (PRAA); Salivary mucocele; **Perianal fistula/anal furunculosis**; Anal sac disease; **Septic peritonitis**; Cobalamin deficiency |
| **Neuro** | Degenerative Myelopathy (SOD1); Dysautonomia; Hydrocephalus; Chiari-like malformation/syringomyelia; Cognitive Dysfunction Syndrome; Narcolepsy |
| **Tox** | Metaldehyde; tremorgenic mycotoxins; ibuprofen-specific; lead; methemoglobinemia agents |
| **Emergency** | Anaphylaxis; Sepsis/SIRS protocols |
| **New sign screens** | Fever/FUO, Anorexia, Weight loss, Syncope, Heart murmur, Dysphagia, Melena/Hematochezia, Constipation, Peripheral edema, Swollen joints, Cyanosis |

## C. ENRICHMENT — update existing ClinIQ pages with new criteria/staging/doses

| Existing ClinIQ page | Enrich with (from Ettinger 9th) |
|---|---|
| `DIS-VASC-HYPERT` | ACVIM 2018 BP categories (<140 / 140–159 / 160–179 / ≥180 mmHg + TOD risk); telmisartan & amlodipine doses |
| `DIS-HCM`, `DIS-CARD-RCM` | ACVIM 2020 feline cardiomyopathy staging A/B1/B2/C/D + LA:Ao thresholds |
| `DIS-CARD-DCM` | Occult/preclinical DCM Holter + echo criteria; preclinical pimobendan (PROTECT) |
| `DIS-CARD-MVD` | ACVIM MMVD staging A/B1/B2/C/D (LA:Ao ≥1.6, LVIDDN ≥1.7, VHS >10.5/11.5); EPIC pimobendan criteria; HF drug doses |
| `DIS-WK-EPILEPSY` | IVETF idiopathic/structural/reactive classification + Tier I–III confidence; ASD dose tables |
| `DIS-NEU-MUE`, `DIS-GME` | Cytarabine (CARE) protocol — SC 50 mg/m² q12h ×2d q3–4wk, or 200 mg/m² CRI |
| `DIS-NEU-HEADTRAUMA` | Modified Glasgow Coma Scale + prognosis; mannitol dog 0.5–1 vs cat 0.25–0.5 g/kg |
| `DIS-IVDD` / `DIS-NEU-IVDD` | Neurologic grading 0–5; deep-pain-perception prognosis (61% vs 22.4% surgical without DPP) |
| `DIS-WK-MG` | Anti-AChR antibody titer (98% sens dogs); remission 88% dogs / 0% cats |
| `DIS-SEC-CKD` / `DIS-SEC-AKI` | Full IRIS CKD staging (creatinine + SDMA + UPC + BP substaging) & IRIS AKI grades I–V |
| `DIS-GI-IBD` | CCECAI / CIBDAI scoring; cobalamin weight-banded supplementation protocol |
| Hepatobiliary pages | Bile-acid cutoffs; hepatic copper >1000 µg/g chelation threshold; ursodiol 10–15 mg/kg, SAMe, D-penicillamine 10–15 mg/kg |
| `DIS-PUPD-HAC`, `DIS-SEC-HYPO` | ACTH-stim & LDDST protocols + cutoffs; trilostane 0.5–1 mg/kg q12h; DOCP 1.5–2.2 mg/kg; Na:K <27 |
| `DIS-GI-PANCAT` / `DIS-SEC-PAN-DOG` | Spec cPL ≥400 µg/L cutoff; Spec fPL; DGGR lipase |
| `DIS-GI-EPI` | Serum TLI cutoffs — dog <2.5 µg/L, cat <8.0 µg/L |
| `DIS-NEO-HSA` | "Rule of two-thirds" (informal); TNM stages; site-based MST (dermal 780–987 d vs visceral 19–86 d) |
| Tox protocol pages | Cross-check antidote doses (NAC, vit K1 1.5–2.5 mg/kg q12h, fomepizole, ILE 1.5 mL/kg → 0.25 mL/kg/min) |
