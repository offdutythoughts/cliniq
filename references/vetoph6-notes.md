# Veterinary Ophthalmology 6th Edition — Clinical Reference Notes

**Source:** Gelatt KN, Ben-Shlomo G, Gilger BC, Hendrix DVH, Kern TJ, Plummer CE (eds).
*Veterinary Ophthalmology*, 6th edn. Wiley-Blackwell, 2021. ISBN 9781119441830.

**PDF:** `references/vetoph6.pdf` (2,744 pages; gitignored — local only)

These notes extract the clinically actionable content most relevant to ClinIQ's ophthalmic signs
(`redEye`, `blindEye`, `wetEye`, `abnormalPupil`) and the disease/lesion entries in `src/data/db.ts`.
Page numbers refer to the book (not the PDF; PDF offset ≈ +22 pages for Vol 1 content,
+~75 pages for Vol 2 content).

---

## 1. Glaucoma (Chapter 20, pp. 1173–1255; Chapter 8.5, pp. 451–476)

### 1.1 Breed Predisposition — Table 20.1A (43 confirmed breeds)

> Primary glaucoma prevalence overall ~0.89% in North American dogs (Gelatt & MacKay 2004).
> Breeds below appeared consistently across four decades (1964–2002).

| Highest prevalence (Table 20.1B) | % affected |
|---|---|
| American Cocker Spaniel | 5.52% |
| Basset Hound | 5.44% |

Full breed list (Table 20.1A):
Akita · Alaskan Malamute · Basset Hound · Beagle · Border Collie · Boston Terrier ·
Bouvier des Flandres · Brittany Spaniel · Cairn Terrier · Cardigan Welsh Corgi · Chihuahua ·
American Cocker Spaniel · Dachshund · Dalmatian · Dandie Dinmont Terrier · English Cocker Spaniel ·
English Springer Spaniel · German Shepherd · Giant Schnauzer · Greyhound · Irish Setter ·
Italian Greyhound · Lakeland Terrier · Maltese · Miniature Pinscher · Miniature Schnauzer ·
Norfolk Terrier · Norwegian Elkhound · Norwich Terrier · Poodle (Toy/Miniature) · Samoyed ·
Scottish Terrier · Sealyham Terrier · Shih Tzu · Siberian Husky · Skye Terrier · Smooth Fox Terrier ·
Tibetan Terrier · Welsh Springer Spaniel · Welsh Terrier · West Highland White Terrier ·
Wirehaired Fox Terrier

> **Note:** Chow Chow and Shar-Pei are predisposed via different mechanisms and are not in
> Table 20.1A but are described clinically in the chapter.

### 1.2 Medical Management (Chapter 8.5)

#### Drug Classes and IOP Effects (Dogs unless noted)

| Drug class | Example | Mechanism | Dog IOP reduction | Cat notes |
|---|---|---|---|---|
| **Prostaglandin analogue** | Latanoprost 0.005% q12–24h | ↑ uveoscleral outflow via FP receptors | Highly effective; first-line for acute | **INEFFECTIVE in cats** — no functional FP receptors |
| **CAI (topical)** | Dorzolamide 2% q8h | ↓ AH formation (CA II inhibition) | ~18–43% reduction; 30% in glaucomatous dogs | Effective q8–12h; 46% reduction with q8h in primary feline glaucoma |
| **Beta-blocker** | Timolol 0.5% q12h | ↓ AH formation | Modest monotherapy; additive with others | Use 0.25% in cats + dogs <10 kg; contraindicated in asthma/heart failure |
| **Combination (Cosopt)** | Dorzolamide 2% + Timolol 0.5% q8h | Both above | Greater than either alone (synergistic effect; Plummer et al. 2006) | Additive in cats (dorzolamide effect) but combination may not add over dorzolamide alone |
| **Osmotic** | Mannitol 1–2 g/kg IV over 20 min | ↓ vitreous volume | Emergency; used when IOP >50 or no topical response | Same dose |
| **Systemic CAI** | Acetazolamide 4–8 mg/kg PO BID–TID | ↓ AH formation | IV form useful in acute (5–10 mg/kg IV) | 10–25 mg/kg; effect ~5 h |

> **Key combination note:** At least 5 minutes must elapse between two topical medications at the
> same dosing episode — coadministration reduces ocular bioavailability by 20–70% (Lee et al. 1991).

#### Prophylactic Treatment of Fellow Eye
- β-blockers (betaxolol 0.5% or timolol 0.25%) are used to delay onset in the normotensive fellow
  eye after primary glaucoma diagnosed in the first eye.
- Latanoprost is also used for fellow-eye prophylaxis in predisposed breeds.

#### Surgical Options
- **Anterior chamber shunts (Ahmed gonioimplant):** 60–76% IOP control at 6–12 months.
- **Cyclophotocoagulation (diode/Nd:YAG):** reduces ciliary body AH production.
- **Combined shunt + cycloablation:** superior long-term IOP control over either alone (Graham et al. 2018).
- **Enucleation/evisceration:** for blind painful eyes — provides immediate pain relief.

---

## 2. Anterior Uveitis (Chapter 21, pp. 1259–1315)

### 2.1 Species-Specific Cause Profiles

#### Canine
- **Uveodermatologic Syndrome (UDS/VKH-like):** Akita, Samoyed, Siberian Husky, Sheltie.
  Granulomatous panuveitis + dermal signs (vitiligo, poliosis). Requires **immunosuppressive** doses
  of prednisone + azathioprine / cyclosporine. Recurrence common on dose reduction.
- **Systemic mycoses with ocular disease:**
  - Blastomycosis: 30–43% of systemic cases have ocular disease; prognosis for vision guarded.
    Itraconazole 5 mg/kg PO q24h × 90 days is treatment of choice (Legendre 2012).
    Visual recovery: 76% posterior only, 18% anterior uveitis, 13% endophthalmitis.
  - Cryptococcosis, histoplasmosis, coccidioidomycosis: similar pattern.
- **Pigmentary uveitis (Golden Retriever):** breed-specific cystic/pigmented uveitis; secondary
  glaucoma common.

#### Feline (Chapter 28)
- **FIP:** pyogranulomatous uveitis; aqueous flare ± fibrin ± "mutton-fat" KP; usually bilateral.
- **FeLV/FIV:** lymphoma-associated uveitis common.
- **Idiopathic lymphoplasmacytic uveitis:** diagnosis of exclusion; treat with topical steroid +
  systemic immunosuppression; recurrence common.

### 2.2 Treatment Protocol (p. 1274–1276)
1. **Fluorescein FIRST** — no topical steroid if positive.
2. Topical 1% prednisolone acetate q4–6h (standard first-line anti-inflammatory).
3. Topical atropine 1% q12–24h if IOP ≤20 mmHg (mydriasis prevents synechiae, relieves ciliary spasm).
4. Systemic NSAID or steroid only after infectious cause excluded.
5. Monitor IOP every 24–72 h — secondary glaucoma in ~30% of uveitis cases.
6. UDS: oral prednisone + azathioprine / cyclosporine long-term.

---

## 3. KCS — Keratoconjunctivitis Sicca (Chapter 17, pp. 1008–1044)

### 3.1 Breed Predisposition — Table 17.3 (relative risk)

| Breed | Relative Risk (RR) |
|---|---|
| Cavalier King Charles Spaniel | 11.5 |
| English Bulldog | 10.8 |
| Lhasa Apso | 9.8 |
| Shih Tzu | 6.2 |
| West Highland White Terrier | 5.5 |
| Pug | 5.2 |
| Bloodhound | 4.5 |
| American Cocker Spaniel | 4.1 |
| Pekingese | 4.0 |
| Boston Terrier | 2.0 |
| Miniature Schnauzer | 1.8 |
| Samoyed | 1.7 |

> Female WHWT significantly overrepresented (Kaswan & Salisbury 1990).

### 3.2 Causes — Table 17.2

| Category | Specific causes |
|---|---|
| Immune-mediated | Lymphoplasmacytic lacrimal adenitis (most common; idiopathic) |
| Drug-induced | TMP/sulfonamide · sulfadiazine · sulfasalazine · 5-aminosalicylic acid · phenazopyridine · topical/systemic atropine · topical/general anaesthesia · etodolac |
| Neurogenic | CN VII (parasympathetic to lacrimal gland) → ipsilateral dry nose + KCS · CN V (sensory loss) |
| Congenital alacrima | CKCS, Yorkshire Terrier, Pug — present from <1 yr |
| Post-infectious | Canine distemper virus · leishmaniasis |
| Iatrogenic | TEL gland excision (nictitans gland contributes ~35% aqueous tear production) · post-evisceration/prosthesis · head irradiation |
| Endocrine/metabolic | Hypothyroidism · hyperadrenocorticism · diabetes mellitus |
| Chronic blepharoconjunctivitis | Local immune response |

### 3.3 STT Interpretation (p. 1019 — STT I, without topical anaesthetic)

| Value (mm/min) | Interpretation |
|---|---|
| ≥15 | Normal |
| 11–14 | Early / subclinical KCS |
| 6–10 | Moderate / mild KCS |
| ≤5 | Severe KCS |

> Use the **same brand** of strips for serial measurements (absorbency varies between manufacturers).
> **Phenol-red thread test** (15 seconds): normal range 30–38 mm wetting / 15 sec (Brown et al. 1996).

### 3.4 Medical Treatment

| Drug | Dose | Notes |
|---|---|---|
| **Cyclosporine (CsA) 0.2–2%** | BID (q12h) lifelong | Gold standard. 75–82% improvement in idiopathic KCS (Kaswan et al. 1989). Response more likely if initial STT >2 mm/min; neurogenic KCS unlikely to respond |
| Tacrolimus 0.02–0.03% | BID | Use when CsA fails; off-label; compounded |
| Topical lubricants | q4–6h or more | Sodium hyaluronate 0.1% preferred (prolongs tear film stability) |
| Topical antibiotic | As needed | For secondary bacterial conjunctivitis; antibiotic susceptibility testing if prolonged treatment |

> CsA reduces corneal vascularisation and pigmentation even in dogs whose tear production does
> not increase (Kaswan et al. 1989). Positive response may require 2–3 months of treatment.

### 3.5 Surgical Treatment (Parotid Duct Transposition — PDT)
- Indicated if KCS is absolute (STT 0 mm/min) and unresponsive to ≥8 weeks medical therapy.
- Prerequisite: confirm adequate salivary flow (test with bitter substance / atropine drop on tongue).
- Saliva is physiologically similar to tears (same pH 5.3–7.8, osmolarity, lysozyme).
- PDT incidence has declined dramatically since CsA introduction in 1987.

---

## 4. Progressive Retinal Atrophy (Chapter 25, pp. 1477–1574)

### 4.1 Breed-Specific Mutations

| Species/Breed | Gene | Inheritance | Onset |
|---|---|---|---|
| Irish Setter | rcd1 (PDE6B) | AR | 6 wk (early dysplasia) |
| Labrador / Poodle / Cocker | prcd (PRCD) | AR | 3–8 yr |
| Cardigan Welsh Corgi | rcd3 | AR | Early |
| Briard | RPE65 | AR | Early |
| Siberian Husky / Samoyed | RPGR | X-linked | Variable |
| English Mastiff / Bullmastiff | — | AD | Variable |
| Abyssinian / Somali | CEP290 (rdAc) | AR | 6 mo–5 yr |
| Bengal | KIF3B (b-PRA) | AR | ~7 wk |
| Persian | AIPL1 (pd-PRA) | AR | ~5 wk |
| Maine Coon / Ragdoll | CRX (rdy-PRA) | **AD** | Variable |

> ERG abnormalities **precede** fundoscopic changes by months in many forms — use ERG for early
> confirmation in at-risk breeds before fundus changes appear.

### 4.2 Key Clinical Points
- Rod loss first → **nyctalopia (night blindness)** earliest sign (owners notice hesitation in dim light).
- Bilateral, symmetrical, progressive.
- Secondary cataracts develop in late PRA — **phacoemulsification NOT recommended** (retina already
  non-functional; surgical uveitis risk outweighs benefit).
- Genetic testing: UC Davis VGL, Optigen, Embark, Wisdom, LABOKLIN, AnimaLabs, Orivet.

---

## 5. SARDS (see also Chapter 25)

### 5.1 Key Discriminating Tests
- **Chromatic PLR:**
  - Red light absent + Blue light present = SARDS (outer retinal photoreceptors lost;
    melanopsin ipRGCs in inner retina spared)
  - Red AND blue absent = **Optic neuritis** (differentiates)
- **ERG:** extinguished (gold standard) — abnormal even with normal fundus.
- **MRI + CSF:** NORMAL in SARDS; abnormal in optic neuritis.

### 5.2 Systemic Signs ("Cushingoid phenotype")
- 56–85% have: polyphagia, weight gain, PU/PD, panting.
- Most SARDS dogs do **NOT** have confirmed HAC on ACTH stim / LDDST.
- Do NOT initiate trilostane empirically — does not restore vision.

### 5.3 Predisposed Breeds
Miniature Schnauzer, Dachshund, Pug, Maltese, Cocker Spaniel, Bichon Frise, Brittany Spaniel.
~59% spayed females. Mean age 7–10 years.

---

## 6. Lens Luxation (Chapter 20, pp. 1213–1221; Chapter 22)

### 6.1 ADAMTS17 Mutation — Confirmed Breeds (26+)
Primary lens luxation is confirmed in the following breeds via ADAMTS17 autosomal recessive mutation
(Farias et al. 2010; Gould et al. 2011; Komáromy & Petersen-Jones 2015):

Australian Cattle Dog · Bull Terrier · Chinese Crested Dog · Fox Terrier (Wire/Smooth) ·
Jack Russell Terrier · Jagdterrier · Lancashire Heeler · Miniature Bull Terrier · Parson Russell Terrier ·
Patterdale Terrier · Rat Terrier · Sealyham Terrier · Tenterfield Terrier · Tibetan Terrier ·
Toy Fox Terrier · Volpino Italiano · Welsh Terrier · Wirehaired Fox Terrier · Yorkshire Terrier ·
Border Collie (separate mutation)

> Genetic testing for ADAMTS17 is available for ≥26 breeds.

### 6.2 Lens Zonule Pathology
- **Terrier breeds / clear lens:** Zonular fibre dysplasia → luxation mean age **5.2 years**.
- **Non-terrier breeds / cataractous lens:** Zonular fibre collagenisation → luxation mean age **8.9 years**.

### 6.3 Management Principles
- **DO NOT use miotics** (pilocarpine, demecarium, latanoprost) — worsens pupillary block.
- Medical temporising: Cosopt (dorzolamide + timolol) q8h ± mannitol.
- Emergency surgical referral: intracapsular lensectomy within 24–48 h.
- Contralateral eye: monitor ± prophylactic intracapsular lensectomy if subluxating at surgery time.

---

## 7. Horner's Syndrome (Chapter 36, pp. 2265–2275; Chapter 28 [feline])

### 7.1 Neuroanatomic Localization — Table 36.12

| Order | Location | Concurrent signs | Common causes |
|---|---|---|---|
| **1st order** | Brainstem / cervical spinal cord (C1–C5) | Altered mentation, tetraparesis/hemiparesis, other CN deficits, neck pain | Neoplasia, IVDD, FCE, CVA, GME, trauma |
| **2nd order** | T1–T3 spinal cord / ventral roots / sympathetic trunk | LMN signs ipsilateral forelimb, ±cutaneous trunci loss, dysphagia/cough (if trunk involved), thoracic back pain | Neoplasia, trauma, brachial plexus avulsion, mediastinal mass, IVDD |
| **3rd order** | Post-cranial cervical ganglion (ear, orbit, guttural pouch) | Concurrent CN VII (facial) deficit if middle ear involved; ipsilateral dry nose (neurogenic KCS) | Otitis media (dog + cat), idiopathic (Golden Retriever), retrobulbar mass, nasopharyngeal polyp (cat) |

### 7.2 Pharmacologic Localization (Phenylephrine Test)

| Test | Interpretation |
|---|---|
| **Phenylephrine 1%** — rapid dilation ≤20 min | **3rd order** (postganglionic denervation hypersensitivity) |
| Phenylephrine 1% — no response; **Phenylephrine 10%** — dilates at 20–40 min | **2nd order** (preganglionic) |
| Phenylephrine 10% — no response | **1st order** (central/presympathetic) |

### 7.3 Feline Horner's — Causes (Table 28.3, Chapter 28)

**Most common 3rd-order cause in cats: otitis media / middle ear disease** (and nasopharyngeal polyps).
Always check CN VII concurrently (passes through petrous temporal bone).

Other feline causes (Table 28.3 — partial):
- Traumatic: head, neck, brachial plexus
- Neoplastic: cranial mediastinum, orbital, thyroid, oral/pharyngeal, cervical spine
- Inflammatory: nasopharyngeal polyps, tick paralysis, orbital abscess
- Iatrogenic: bulla osteotomy, ear canal ablation, thyroidectomy, parathyroidectomy, ear cleaning
- Idiopathic: self-limiting; topical 2.5% phenylephrine q8–12h for cosmesis

### 7.4 Canine Idiopathic Horner's (3rd Order)
- **Golden Retriever** most commonly affected — idiopathic, self-limiting.
- Phenylephrine 1% confirms 3rd order (rapid response).
- No specific treatment; median resolution ~15 weeks (up to 6 months).
- Phenylephrine 1% q6–8h can be used for cosmesis.

---

## 8. Retinal Detachment (Chapter 25; Chapter 28 [feline])

### 8.1 Feline Hypertensive RD
- **Most common cause of RD in cats:** systemic hypertension (CKD, hyperthyroidism, primary).
- Measure BP **before** further workup — every older cat with acute blindness.
- Amlodipine 0.625–1.25 mg/cat PO q24h ± telmisartan.
- Target SBP <160 mmHg.
- Retina may **reattach if BP controlled within 24–48 h** — time to treatment is critical.

### 8.2 Canine Predisposed Breeds (rhegmatogenous)
Shih Tzu, Toy Poodle (giant retinal tears / vitreoretinopathy); post-phacoemulsification in Boston
Terrier, Bichon Frise, Cocker-Poodle crosses, Shih Tzu.

---

## 9. Feline Diffuse Iris Melanoma (Chapter 28, pp. 1756–1764)

### 9.1 Progression and Metastasis
- Flat multifocal pigmentation → confluent → stromal infiltration → trabecular invasion → glaucoma.
- Haematogenous metastasis to liver, lungs, spleen, regional LN.
- Metastatic rate 19–63% depending on grade and invasion depth.
- Median survival post-enucleation of iris-confined melanoma: >24 months.
- Ciliary body / scleral invasion: metastatic rate 35–63%; median survival months to <1 yr.

### 9.2 Enucleation Criteria
Enucleate at **first evidence of stromal infiltration** — do not wait for glaucoma.
Red flags: dyscoria · iris thickening on UBM >1.5 mm · elevated IOP · aqueous flare · progressive
architecture change on serial photography.

---

## 10. Quick Reference — IOP Thresholds

| IOP | Interpretation |
|---|---|
| 15–25 mmHg | Normal (dog + cat) |
| >25 mmHg | Suspicious — confirm clinically |
| >40 mmHg | Diagnostic of acute glaucoma in symptomatic eye |
| <10 mmHg | Supports active anterior uveitis |
| Elevated IOP + corneal oedema | Glaucoma |
| LOW IOP + corneal oedema | **Uveitis** (key differentiator — always tonometrise) |

---

## 11. Source Cross-Reference to ClinIQ Data

| ClinIQ entry | Textbook source |
|---|---|
| `DIS-OPH-GLAUCOMA` breed field | Table 20.1A + 20.1B (Ch 20) |
| `DIS-OPH-GLAUCOMA` tx1/tx2 | Chapter 8.5 (pharmacology) |
| `DIS-OPH-LENS-LUX` breed field | Farias et al. 2010; Gould et al. 2011 (Ch 20/22) |
| `LES-RE-CONJ-KCS` signs/etiology | Table 17.2 + 17.3 (Ch 17) |
| `LES-AP-MI-HORN` / `DIS-NEU-HORNERS` | Table 36.12; Table 28.3 (Ch 36/28) |
| `DIS-EYE-UVEITIS-ANT` etiology | Ch 21 pp. 1274–1315 |
| `DIS-EYE-PRA` breed field | Ch 25; multiple mutation papers |
| `DIS-EYE-SARDS` conf/pearl | Ch 25; chromatic PLR literature |
| `DIS-EYE-RD` severe / tx1 | Ch 28 pp. 1785–1790 (feline HT RD) |
| `DIS-EYE-IRIS-MEL` prog / pearl | Ch 28 pp. 1756–1764 |
