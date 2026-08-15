# Ettinger's Textbook of Veterinary Internal Medicine, 9th edn — line index

Côté E, Ettinger SJ, Feldman EC (eds.), Elsevier 2024. 2 volumes, ~2,320 printed pages,
331 chapters in 22 sections, 110+ contributors. Source file: `references/ettinger9.md`
(41,271 lines, 15 MB — local only, gitignored). The "2,801 pp" in `ettinger9-notes.md`
counts PDF pages, not printed ones; running headers in the text run to p 2319.

This replaces the PDF, which is not on this machine and is not being replaced (decision
2026-08-10, recorded in `CITATIONS.md`). Full text is now searchable again, so the
"second-hand" caveat that hung over the Ettinger citation is resolved — see
[`CITATIONS.md`](CITATIONS.md) for the corrected AMA string.

**How to read it.** Chapter and section openings *are* markdown headings, so navigation is
easier than in `vettox3.md` or `vetdent4.md`:

```bash
sed -n '37262,37482p' references/ettinger9.md      # ch 301, Chronic Kidney Disease
grep -n '^# CHAPTER 301$' references/ettinger9.md   # find any chapter directly
```

Headings are `# CHAPTER <n>` on its own line, followed by the title as one or more `## `
lines (long titles wrap across two). Sections are `# SECTION <roman>`. OCR occasionally
splits a number — chapters 71, 171 and 271 render as `# CHAPTER 7 1`, `# CHAPTER 17 1`,
`# CHAPTER 27 1` — so match on the line number in the table below rather than grepping for
the chapter number when it matters.

### ⚠ Two-column prose is interleaved

This is the conversion's serious defect and it is different in kind from the flattened
tables in the other reference `.md` files. In two-column body regions the converter
alternates between the columns **mid-sentence**, so a passage can read as fluent English
while actually splicing two unrelated arguments together:

> …temic illness.Further, the methodology and reference inter-specificity (Figure 287.1).
> Thyroid scintigraphy requires special vals used are important.

Two independent sentences, one from each column. **Never quote or extract a clinical
statement from running prose without reading enough either side to confirm the sentence
closes on itself.** The tell is a missing space at the splice (`illness.Further`) or a
hyphenated word that never completes (`inter-` … `vals`).

What *does* read cleanly, and is safe to use:

- **Tables** — mostly survive row by row, including the IRIS staging table (ch 301) and the
  hyperthyroid clinicopathology table (ch 287). Better than `vettox3.md` in this respect.
- **Figure and algorithm captions** — intact and often carry the decision criteria.
- **Chapter openings, headings, and reference lists** — intact.
- Drop caps merge into the first body line (`# Cthe consumer perception…`), which is
  cosmetic.

Every printed page also leaves a running-header line
(`2090SECTION XX • Renal DiseaseeBooks.Health.Elsevier.com`). Those 2,612 lines are the only
carrier of the **printed page number** in the file, so they are how to get a page for a
citation:

```bash
# printed page for a given line (nearest preceding running header)
awk 'NR<=37283 && /eBooks\.Health\.Elsevier\.com/{p=$0} END{print p}' references/ettinger9.md
# → 2090SECTION XX • Renal Disease…   i.e. printed p 2090
```

### Known error in the source

The IRIS CKD table (ch 301, line ~37283) prints **SDMA in ng/dL**. That is the book's own
typo — IRIS publishes SDMA in µg/dL. `ettinger9-notes.md` reproduced it faithfully, so the
error is upstream of the notes, not in them. Use **µg/dL**.

## This file vs `ettinger9-notes.md`

They do different jobs; both stay.

- `ettinger9-notes.md` (1.3 MB) is the **curated clinical extraction** — differential lists,
  diagnostic criteria, staging, lab thresholds, doses, with inline `> ClinIQ:` gap tags. It
  remains the first thing to read for the domains it covers, and it is the reference of
  record for content already written against it.
- `ettinger9.md` + this index is the **full text**, for everything the notes skipped or
  compressed: §I, §V interventional, §IX nutrition, the technique chapters, figure captions,
  reference lists, and verbatim wording when a claim needs checking at source.

## Chapters

### §I — Veterinary Medicine Worldwide

| Ch | Line | Title |
|---|---|---|
| 1 | 788 | Client Communication |
| 2 | 831 | The Medical History |
| 3 | 887 | The Physical Examination |
| 4 | 1065 | Evidence-Based Medicine |
| 5 | 1128 | Biomedical Statistics and Veterinary Literature |
| 6 | 1241 | Pain Medicine: Key Concepts |
| 7 | 1417 | Antimicrobial Stewardship |
| 8 | 1451 | International Travel |
| 9 | 1593 | Health Concerns of Imported Pets |

### §II — Differential Diagnosis

| Ch | Line | Title |
|---|---|---|
| 10 | 2208 | “Ain’t Doin’ Right”: The Nonspecific Chief Concern of Ill Thrift |
| 11 | 2241 | Distinguishing Behavioral Disorders From Medical Disorders |
| 12 | 2324 | Dermatologic Manifestations of Systemic Disease |
| 13 | 2452 | Ophthalmic Manifestations of Systemic Disease |
| 14 | 2553 | Neurologic Manifestations of Systemic Disease |
| 15 | 2656 | Intoxication Versus Acute Nontoxicologic Illness: Differentiating the Two |
| 16 | 2702 | Fever |
| 17 | 2949 | Anorexia |
| 18 | 3057 | Weight Loss |
| 19 | 3106 | Polyphagia |
| 20 | 3186 | Weight Gain |
| 21 | 3234 | Abdominal Enlargement |
| 22 | 3306 | Failure to Grow |
| 23 | 3399 | Weakness |
| 24 | 3471 | Restlessness |
| 25 | 3545 | Pallor |
| 26 | 3585 | Hyperemia |
| 27 | 3645 | Cyanosis |
| 28 | 3697 | Jaundice |
| 29 | 3789 | Petechiae and Ecchymoses |
| 30 | 3873 | Peripheral Edema |
| 31 | 3950 | Orthopedic Manifestations of Systemic Disease |
| 32 | 4020 | Swollen Joints and Joint Pain |
| 33 | 4091 | Body Odors |
| 34 | 4158 | Cough |
| 35 | 4291 | Sneezing and Nasal Discharge |
| 36 | 4388 | Epistaxis and Hemoptysis |
| 37 | 4437 | Tachypnea, Dyspnea and Respiratory Distress |
| 38 | 4502 | Abnormal Heart Sounds and Heart Murmurs |
| 39 | 4597 | Pulse Alterations |
| 40 | 4623 | Syncope |
| 41 | 4688 | Movement Disorders |
| 42 | 4778 | Tremors |
| 43 | 4945 | Ataxia, Paresis, and Paralysis |
| 44 | 5017 | Stupor and Coma |
| 45 | 5067 | Seizures |
| 46 | 5139 | Halitosis and Ptyalism |
| 47 | 5273 | Gagging and Dysphagia |
| 48 | 5369 | Regurgitation and Vomiting |
| 49 | 5525 | Diarrhea |
| 50 | 5616 | Melena and Hematochezia |
| 51 | 5826 | Constipation, Tenesmus, Dyschezia, and Fecal Incontinence |
| 52 | 5895 | Flatulence |
| 53 | 5937 | Polyuria and Polydipsia |
| 54 | 6013 | Pollakiuria, Stranguria, and Urinary Incontinence |
| 55 | 6093 | Hematuria and Other Conditions Causing Discolored Urine |
| 56 | 6162 | Vulvar and Preputial Discharge |

### §III — Differential Diagnosis for Clinicopathologic Abnormalities

| Ch | Line | Title |
|---|---|---|
| 57 | 6283 | Anemia and Erythrocytosis |
| 58 | 6493 | Leukopenia, Leukocytosis |
| 59 | 6632 | Thrombocytopenia, Thrombocytosis |
| 60 | 6751 | Hypoproteinemia and Hyperproteinemia |
| 61 | 6873 | Hypoglycemia and Hyperglycemia |
| 62 | 7027 | Blood Urea Nitrogen, Creatinine, and SDMA |
| 63 | 7120 | Cholesterol and Triglycerides |
| 64 | 7205 | Amylase and Lipase |
| 65 | 7235 | Liver Enzymes |
| 66 | 7382 | Creatine Kinase |
| 67 | 7423 | Sodium and Chloride |
| 68 | 7645 | Potassium, Magnesium |
| 69 | 7834 | Calcium and Phosphorus |
| 70 | 7894 | Urinalysis |
| 71 | 8016 | Fluid Analysis: Thoracic, Abdominal, Joint |

### §IV — Techniques

| Ch | Line | Title |
|---|---|---|
| 72 | 8202 | Body and Muscle Condition Scoring |
| 73 | 8236 | Point- of- Care Ultrasound Examination |
| 74 | 8339 | Venous and Arterial Puncture |
| 75 | 8394 | Jugular Catheterization and Central Venous Pressure Measurement |
| 76 | 8431 | Intraosseous Catheters |
| 77 | 8528 | Constant Rate Infusions |
| 78 | 8597 | Glucose Monitoring |
| 79 | 8752 | Buccal Mucosal Bleeding Time |
| 80 | 8813 | Fecal Examination |
| 81 | 8894 | Nasoesophageal, Esophagostomy, Gastrostomy, and Jejunostomy Tubes: Placement Techniques |
| 82 | 8991 | Otoscopy, Ear Flushing, and Myringotomy |
| 83 | 9072 | Scrapings, Fine-Needle Aspirations, and Biopsies of Skin and Subcutaneous Tissues |
| 84 | 9157 | Bone Marrow Aspiration and Biopsy |
| 85 | 9248 | Cytology of Internal Organs |
| 86 | 9407 | Abdominocentesis |
| 87 | 9445 | Arthrocentesis |
| 88 | 9517 | Lymph Node Aspiration and Biopsy |
| 89 | 9592 | Rhinoscopy, Nasal Flush, and Biopsy |
| 90 | 9644 | Respiratory and Inhalant Therapy |
| 91 | 9693 | Blood Pressure Measurement |
| 92 | 9744 | Thoracocentesis and Thoracostomy Tube Placement |
| 93 | 9792 | Transtracheal Wash and Bronchoscopy |
| 94 | 9857 | Temporary Tracheostomy Care |
| 95 | 9918 | Pericardiocentesis |
| 96 | 9964 | Electrocardiography |
| 97 | 10025 | Echocardiography |
| 98 | 10587 | Urine Collection and Urinary Catheter Management |
| 99 | 10672 | Unblocking the Urethra |
| 100 | 10771 | Cystoscopy and Urethroscopy |
| 101 | 10819 | Vaginoscopy and Vaginal Cytology |
| 102 | 10960 | Peritoneal Dialysis |
| 103 | 10990 | Hemodialysis/Continuous Renal Replacement Therapy |
| 104 | 11599 | Prostatic Diagnostic Techniques |
| 105 | 11732 | Gastric Intubation and Lavage |
| 106 | 11796 | Canine Fecal Microbiota Transplantation |
| 107 | 11866 | Gastrointestinal Endoscopy |
| 108 | 12004 | Enemas and Deobstipation |
| 109 | 12112 | Cerebrospinal Fluid Collection, Analysis, and Myelography |
| 110 | 12183 | Muscle and Nerve Biopsy |
| 111 | 12227 | Electromyography and Nerve Conduction Velocity |
| 112 | 12257 | Neuroimaging: Radiography, Myelography, Computed Tomography, and Magnetic Resonance Imaging |

### §V — Minimally Invasive Interventional Therapies

| Ch | Line | Title |
|---|---|---|
| 113 | 12388 | Overview of Interventional Medicine (Interventional Radiology/Interventional Endoscopy) |
| 114 | 12510 | Respiratory Interventional Therapies |
| 115 | 12595 | Cardiovascular Interventional Therapies |
| 116 | 12810 | Gastrointestinal and Hepatobiliary Interventional Therapies |
| 117 | 13018 | Urologic Interventional Therapies |
| 118 | 13410 | Neoplastic Interventional Therapies |

### §VI — Emergency Medicine

| Ch | Line | Title |
|---|---|---|
| 119 | 13556 | Triage and Initial Stabilization |
| 120 | 13619 | Fluid Therapy |
| 121 | 13730 | Circulatory Shock: Identification and Management |
| 122 | 13802 | Diagnostic Testing for the Emergency Patient |
| 123 | 13872 | Respiratory Crisis |
| 124 | 13918 | Bleeding Crisis |
| 125 | 14031 | Neurologic Crisis |
| 126 | 14170 | Abdominal Crisis |
| 127 | 14246 | Lower Urinary Tract Crisis |
| 128 | 14305 | Sepsis and the Systemic Inflammatory Response Syndrome |
| 129 | 14423 | Anaphylaxis |
| 130 | 14515 | Hyperthermia and Hypothermia |
| 131 | 14551 | Cardiopulmonary Arrest and Cardiopulmonary Resuscitation (CPR) |

### §VII — Toxicology

| Ch | Line | Title |
|---|---|---|
| 132 | 14628 | Toxin Exposure Therapy/Decontamination |
| 133 | 14675 | Neurotoxicoses |
| 134 | 14757 | Hepatotoxicoses |
| 135 | 14809 | Renal Toxicoses |
| 136 | 14894 | Gastrointestinal Toxicoses |
| 137 | 14958 | Cardiorespiratory Toxicoses |
| 138 | 15011 | Hematologic Toxicoses |

### §VIII — Clinical Pharmacology and Therapeutics

| Ch | Line | Title |
|---|---|---|
| 139 | 15061 | Principles of Drug Disposition and Pharmacokinetics |
| 140 | 15139 | Antibacterial Drug Therapy |
| 141 | 15195 | Antifungal and Antiviral Therapy |
| 142 | 15234 | Antiparasitic Drugs |
| 143 | 15284 | Anti-inflammatory Drugs |
| 144 | 15363 | Immunosuppressive Drugs |

### §IX — Nutrition and Dietary Therapy

| Ch | Line | Title |
|---|---|---|
| 145 | 15425 | Nutritional Assessment |
| 146 | 15460 | Neonatal and Pediatric Nutrition |
| 147 | 15493 | Nutrition for Healthy Adult Dogs |
| 148 | 15538 | Nutrition for Healthy Adult Cats |
| 149 | 15591 | Nutrition in Healthy Senior Cats and Dogs |
| 150 | 15633 | Obesity |
| 151 | 15705 | Cachexia and Sarcopenia |
| 152 | 15775 | Nutritional Management of Gastrointestinal Disease |
| 153 | 15872 | Nutritional Management of Exocrine Pancreatic Disease |
| 154 | 15917 | Nutritional Management of Hepatobiliary Diseases |
| 155 | 15951 | Nutritional Management of Endocrine and Metabolic Diseases |
| 156 | 15995 | Nutritional and Medical Considerations in Hyperlipidemia |
| 157 | 16101 | Nutritional Management of Heart Disease |
| 158 | 16256 | Nutritional Management of Renal Disease |
| 159 | 16305 | Nutritional Management of Lower Urinary Tract Disease |
| 160 | 16351 | Nutritional Management of Dermatologic Disease |
| 161 | 16417 | Nutrition for Neurologic Disease and Cognitive Disorders |
| 162 | 16462 | Nutrition- Related Skeletal Disorders |
| 163 | 16541 | Nutritional Management of Cancer |
| 164 | 16596 | Critical Care Nutrition |
| 165 | 16663 | Nutritional Uses of Fiber |
| 166 | 16762 | Adverse Reactions to Foods: Allergies Versus Intolerance |
| 167 | 16854 | Less Conventional Diets |
| 168 | 16950 | Immunology and Nutrition |

### §X — Hematologic and Immunologic Disease

| Ch | Line | Title |
|---|---|---|
| 169 | 17040 | Immunologic and Hematologic Disease: Introduction and Drug Therapy |
| 170 | 17083 | Coagulation Testing |
| 171 | 17219 | Hyper- and Hypocoagulable States |
| 172 | 17363 | Nonregenerative Anemia |
| 173 | 17518 | Erythrocytosis and Primary Polycythemia |
| 174 | 17601 | Immune- Mediated Hemolytic Anemia and Other Regenerative Anemias |
| 175 | 17738 | Immune Thrombocytopenia, von Willebrand Disease, and Other Platelet Disorders |
| 176 | 17952 | Nonneoplastic White Blood Cell Disorders and Pancytopenia |
| 177 | 18039 | Immune- Mediated Polyarthritis and Other Polyarthropathies |
| 178 | 18117 | Immune- Mediated Dermatologic Diseases |
| 179 | 18194 | Systemic Lupus Erythematosus |
| 180 | 18260 | Immunodeficiencies |
| 181 | 18354 | Vasculitides |
| 182 | 18396 | Diseases of the Spleen |

### §XI — Infectious Disease

| Ch | Line | Title |
|---|---|---|
| 183 | 18578 | Does This Dog or Cat Have an Infectious Disease? |
| 184 | 18669 | Laboratory Diagnosis of Infectious Disease |
| 185 | 18739 | Companion Animal Vaccinations |
| 186 | 18821 | Hospital- Associated (Nosocomial) Infections |
| 187 | 18876 | Lyme Disease |
| 188 | 18954 | Mycobacterial Infections, Actinomycosis, and Nocardiosis |
| 189 | 19061 | Brucellosis |
| 190 | 19124 | Tetanus and Botulism |
| 191 | 19194 | Bartonellosis |
| 192 | 19364 | Leptospirosis |
| 193 | 19485 | Ehrlichiosis, Anaplasmosis, Rocky Mountain Spotted Fever, and Neorickettsiosis |
| 194 | 19612 | Hemotropic Mycoplasmas |
| 195 | 19723 | Enteric Bacterial Diseases |
| 196 | 19833 | Enteric Protozoan Diseases |
| 197 | 19958 | Systemic Protozoal Diseases |
| 198 | 20063 | Feline Immunodeficiency Virus Infection |
| 199 | 20159 | Feline Leukemia Virus Infection |
| 200 | 20339 | Coronavirus Infection |
| 201 | 20566 | Canine and Feline Parvovirus Infection |
| 202 | 20622 | Rabies |
| 203 | 20714 | Canine Infectious Respiratory Disease Complex |
| 204 | 20761 | Canine Distemper |
| 205 | 20804 | Feline Upper Respiratory Infections |
| 206 | 20888 | Emerging Viral Infections of Cats |
| 207 | 20939 | Cryptococcosis |
| 208 | 21000 | Coccidioidomycosis |
| 209 | 21077 | Blastomycosis and Histoplasmosis |
| 210 | 21261 | Sinonasal and Sino-orbital Aspergillosis |
| 211 | 21329 | Disseminated Invasive Aspergillosis and Systemic Mold Infections |

### §XII — Respiratory Disease

| Ch | Line | Title |
|---|---|---|
| 212 | 22179 | Clinical Evaluation of the Respiratory Tract |
| 213 | 22282 | Diseases of the Nose, Sinuses, and Nasopharynx |
| 214 | 22674 | Laryngeal Diseases |
| 215 | 22771 | Large Airway Diseases |
| 216 | 22946 | Small Airway Diseases |
| 217 | 22982 | Pulmonary Parenchymal Diseases |
| 218 | 23246 | Pulmonary Hypertension |
| 219 | 23393 | Pulmonary Thromboembolism |
| 220 | 23474 | Pleural Space Diseases |
| 221 | 23593 | Aerodigestive Disorders |
| 222 | 23663 | Diseases of the Mediastinum, Chest Wall, and Diaphragm |

### §XIII — Comorbidities

| Ch | Line | Title |
|---|---|---|
| 223 | 23820 | Heart Disease and Kidney Disease |
| 224 | 23918 | Comorbidities: Diabetes Mellitus and Corticosteroid- Responsive Disease |
| 225 | 24040 | Feline Triaditis |
| 226 | 24179 | Obesity and Immobility |
| 227 | 24213 | Concurrent Infection and Immune Suppression |

### §XIV — Cardiovascular Disease

| Ch | Line | Title |
|---|---|---|
| 228 | 24306 | Pathophysiology of Heart Failure |
| 229 | 24419 | Heart Failure: Diagnosis and Management |
| 230 | 24657 | Cardiac Arrhythmias |
| 231 | 25064 | Congenital Heart Disease |
| 232 | 25622 | Valvular Heart Diseases of Adult Dogs and Cats |
| 233 | 25895 | Myocardial Diseases of Dogs |
| 234 | 26018 | Feline Myocardial Diseases |
| 235 | 26578 | Pericardial Diseases |
| 236 | 26755 | Systemic Hypertension |
| 237 | 26949 | Heartworm Disease in Dogs and Cats |
| 238 | 27422 | Arterial Thromboembolic Disease |
| 239 | 27532 | Venous and Lymphatic Disorders |

### §XV — Neurologic Disease

| Ch | Line | Title |
|---|---|---|
| 240 | 27776 | Neurophysiology |
| 241 | 27828 | Neurologic Examination and Neuroanatomic Diagnosis |
| 242 | 27941 | Inflammatory, Infectious, and Other Multifocal Brain Diseases |
| 243 | 28134 | Vascular Brain Diseases |
| 244 | 28213 | Developmental, Degenerative and Metabolic Brain Diseases and Sleep Disorders |
| 245 | 28474 | Neoplastic Brain Diseases |
| 246 | 28723 | Traumatic Brain Disease |
| 247 | 28796 | Epilepsy |
| 248 | 28902 | Vestibular Disease |
| 249 | 29009 | Cranial Neuropathies |
| 250 | 29102 | Spinal Cord Diseases: Congenital (Developmental), Inflammatory, and Degenerative Disorders |
| 251 | 29402 | Spinal Cord Diseases: Traumatic, Vascular, and Neoplastic |
| 252 | 29546 | Peripheral Neuropathies |
| 253 | 29609 | Neuromuscular Junction Disorders |
| 254 | 29670 | Autonomic Nervous System Disorders |
| 255 | 29764 | Unique Feline Neurologic Disorders |
| 256 | 29867 | Physical Therapy and Rehabilitation |

### §XVI — Gastrointestinal Disease

| Ch | Line | Title |
|---|---|---|
| 257 | 30086 | Laboratory Evaluation of the Gastrointestinal Tract |
| 258 | 30166 | Oral Cavity and Salivary Gland Disorders |
| 259 | 30267 | Pharyngeal and Esophageal Diseases |
| 260 | 30451 | Host-Microbial Interactions in Gastrointestinal Health |
| 261 | 30571 | Gastric Diseases |
| 262 | 30759 | Small Intestinal Diseases |
| 263 | 31512 | Diseases of the Large Intestine |
| 264 | 31906 | Rectoanal Diseases |
| 265 | 32077 | Peritoneal Diseases |

### §XVII — Hepatobiliary Disease

| Ch | Line | Title |
|---|---|---|
| 266 | 32185 | Pathophysiology of Liver Disease |
| 267 | 32328 | Congenital Vascular Liver Diseases |
| 268 | 32565 | Congenital Ductal Plate Abnormalities |
| 269 | 32683 | Acute Toxic and Other Parenchymal Liver Disease |
| 270 | 32901 | Chronic Hepatitis in Dogs |
| 271 | 33052 | Chronic Hepatic Diseases in Cats |
| 272 | 33176 | Infectious Biliary Tract and Gallbladder Disease |
| 273 | 33224 | Non-infectious Biliary Tract and Gallbladder Disease |
| 274 | 33333 | Vacuolar Hepatopathies |
| 275 | 33401 | Neoplasia of the Liver and Biliary Tree |

### §XVIII — Pancreatic Disease

| Ch | Line | Title |
|---|---|---|
| 276 | 33478 | Pancreatitis: Etiology, Pathogenesis, and Pathophysiologic Consequences |
| 277 | 33546 | Pancreatitis in Dogs: Diagnosis and Management |
| 278 | 33628 | Pancreatitis in Cats |
| 279 | 33737 | Exocrine Pancreatic Insufficiency and Rare Conditions of the Exocrine Pancreas |

### §XIX — Endocrine Disease

| Ch | Line | Title |
|---|---|---|
| 280 | 33828 | Growth Hormone Disorders in Cats |
| 281 | 33959 | Canine Growth Hormone Disorders |
| 282 | 34044 | Diabetes Insipidus |
| 283 | 34190 | Primary Hyperparathyroidism |
| 284 | 34441 | Hypoparathyroidism |
| 285 | 34511 | Hypothyroidism in Dogs |
| 286 | 34749 | Feline Hypothyroidism |
| 287 | 34833 | Hyperthyroidism in Cats |
| 288 | 35037 | Canine Hyperthyroidism |
| 289 | 35172 | Insulin-Secreting Tumors |
| 290 | 35279 | Diabetic Ketoacidosis and the Hyperosmolar Hyperglycemic State |
| 291 | 35433 | Diabetes Mellitus in Dogs |
| 292 | 35748 | Diabetes Mellitus in Cats |
| 293 | 35934 | Hyperadrenocorticism (Cushing’s Syndrome) in Dogs |
| 294 | 36198 | Feline Hyperadrenocorticism |
| 295 | 36380 | Non–Cortisol-Secreting Adrenocortical Tumors |
| 296 | 36506 | Hypoadrenocorticism |
| 297 | 36632 | Gastrointestinal Endocrinology |
| 298 | 36702 | Pheochromocytoma |

### §XX — Renal Disease

| Ch | Line | Title |
|---|---|---|
| 299 | 36797 | Clinical Approach and Laboratory Evaluation of Renal Disease |
| 300 | 37022 | Acute Kidney Injury |
| 301 | 37262 | Chronic Kidney Disease |
| 302 | 37482 | Glomerular Diseases |
| 303 | 37638 | Renal Tubular Diseases |
| 304 | 37743 | Pyelonephritis |
| 305 | 37792 | Familial and Congenital Renal Diseases of Cats and Dogs |

### §XXI — Lower Urinary Tract Disease

| Ch | Line | Title |
|---|---|---|
| 306 | 37925 | Ureteral Disorders |
| 307 | 38000 | Lower Urinary Tract Infections |
| 308 | 38059 | Lower Urinary Tract Urolithiasis in Dogs |
| 309 | 38282 | Lower Urinary Tract Urolithiasis—Feline |
| 310 | 38374 | Diseases of Abnormal Micturition |
| 311 | 38477 | Feline Idiopathic/Interstitial Cystitis |
| 312 | 38597 | Urethral Disorders |
| 313 | 38646 | Congenital Lower Urinary Tract Disorders |
| 314 | 38790 | Prostatic Diseases |
| 315 | 38956 | Reproductive Disorders in Neutered Male and Female Dogs and Cats |

### §XXII — Cancer

| Ch | Line | Title |
|---|---|---|
| 316 | 39054 | Tumor Biology |
| 317 | 39155 | Principles and Practice of Chemotherapy |
| 318 | 39207 | Principles and Practice of Radiation Oncology |
| 319 | 39326 | Cancer Immunotherapy |
| 320 | 39379 | Molecular Targeted Therapy |
| 321 | 39448 | Complications of Cancer Therapy |
| 322 | 39622 | Hematopoietic Tumors |
| 323 | 39793 | Tumors of the Skin |
| 324 | 39904 | Soft Tissue Sarcomas |
| 325 | 40002 | Hemangiosarcoma |
| 326 | 40174 | Primary Bone Tumors in Dogs |
| 327 | 40279 | Mast Cell Disease |
| 328 | 40416 | Canine and Feline Histiocytic Diseases |
| 329 | 40485 | Mammary Gland Tumors |
| 330 | 40557 | Urogenital Tumors |
| 331 | 40746 | Paraneoplastic Syndromes |

### Non-body regions, and the volume boundary

Both volumes were converted into this one file, so **front matter, index, and appendices each
appear twice**. A `grep` for anything bibliographic will hit the Vol 1 copy first.

| Lines | What |
|---|---|
| 1–43 | Elsevier eBooks+ access-code page (noise) |
| 43–101 | Vol 1 title page (53–75) and copyright page (77–95) |
| 103–435 | editors, editorial staff, section facilitators, contributors |
| 435–459 | preface |
| 459–760 | the book's own TOC — carries printed page numbers, but columns are interleaved and some entries are corrupted (`38. Abnormal Heart Sounds and Heart Murmurs, 1795` splices two entries) |
| 760–784 | client information sheet list |
| **784–21,376** | **Vol 1 body — ch 1–211** (§I–§XI) |
| 21,376–21,795 | Vol 1 index and appendices |
| 21,796–22,175 | **Vol 2 front matter — a near-verbatim repeat** of lines 43–784 |
| **22,175–40,816** | **Vol 2 body — ch 212–331** (§XII–§XXII) |
| 40,816–41,220 | Vol 2 index — mostly unusable (printed page numbers, no line anchors); use the chapter table above or `grep` |
| 41,220–41,271 | appendices: feline and canine vaccination schedules, SI ↔ common unit conversions, body weight → body surface area |

## Relevance to ClinIQ

Unlike the toxicology and dentistry texts, almost the whole of this book maps onto
`src/data/db.ts`. The useful signal is therefore the section → entry-prefix mapping, and
the short list of sections nothing in ClinIQ draws on.

| Section | Chapters | ClinIQ surface |
|---|---|---|
| §II Differential diagnosis by sign | 10–56 | the sign screens and their flows — one chapter per presenting sign, closest match in any reference to ClinIQ's own model |
| §III Clinicopathologic abnormalities | 57–71 | lab-threshold and DDx content across every `DIS-*` area; ch 71 (fluid analysis) backs the `LES-PL-*` / effusion rows |
| §IV Techniques | 72–112 | thresholds only (ch 73, 78, 79, 87, 91, 96, 97, 109) — the rest is procedure detail ClinIQ does not carry |
| §VI Emergency | 119–131 | `DIS-SHOCK-*`, protocols, urgency ratings |
| §VII Toxicology | 132–138 | `DIS-TOX-*` — but VETgirl/APCC still wins on any dose (see `CLAUDE.md`) |
| §VIII Pharmacology | 139–144 | drug-therapy fields across all areas |
| §X Haematologic/immunologic | 169–182 | `DIS-BD-*`, `DIS-IM-*` |
| §XI Infectious | 183–211 | `DIS-INFECT-*` |
| §XII Respiratory | 212–222 | `DIS-RESP-*`, `DIS-NASAL-*` |
| §XIII Comorbidities | 223–227 | cross-links between disease pages; no entries of its own |
| §XIV Cardiovascular | 228–239 | `DIS-CARD-*`, `DIS-VASC-*` |
| §XV Neurologic | 240–256 | `DIS-NEU-*` — ClinIQ's largest area (151 entries) |
| §XVI Gastrointestinal | 257–265 | `DIS-GI-*`, `DIS-OES-*`, `DIS-GAST-*`, `DIS-DENT-*` (ch 258 oral cavity) |
| §XVII–XVIII Hepatobiliary, pancreatic | 266–279 | `DIS-HEP-*` |
| §XIX Endocrine | 280–298 | `DIS-ENDO-*`, `DIS-MET-*`, `DIS-PUPD-*` |
| §XX Renal | 299–305 | `DIS-REN-*` — only 3 entries today against 7 chapters |
| §XXI Lower urinary tract | 306–315 | `DIS-URO-*`, `DIS-REPRO-*` |
| §XXII Cancer | 316–331 | `DIS-NEO-*` — 23 entries against 16 chapters |

**Sections ClinIQ does not draw on:** §I (worldwide medicine, ch 1–9), §V (interventional
therapies, ch 113–118), §IX (nutrition, ch 145–168). §IX is the largest of these at 24
chapters and is genuinely unused — ClinIQ has no dietary-management surface.

The gap list itself lives in [`ettinger9-gap-analysis.md`](ettinger9-gap-analysis.md) and is
unchanged by this file; what changes is that every entry on it can now be worked from full
text rather than from the extraction. The chapter for any gap item is in the table above.

## Citing

Use the AMA strings in [`CITATIONS.md`](CITATIONS.md). In entry prose the existing inline
convention is `(Ettinger Ch NN)`, which `scripts/report-refs.ts` and
`src/app/screens/diseaseReferences.tsx` already recognise — keep using it. Chapter numbers
are stable across printings; page numbers are recoverable from the running headers if an
external citation ever needs them.
