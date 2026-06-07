# Ettinger 9th — Clinical Reference Notes (per-section)

Modular, chapter-by-chapter extraction of **Ettinger's Textbook of Veterinary Internal
Medicine, 9th edition** (Ettinger, Feldman & Côté, eds; Elsevier 2024). One markdown file
per Ettinger section, distilling the clinically actionable content most relevant to ClinIQ:
**differential lists, diagnostic criteria, staging/grading schemes, lab thresholds, and drug doses**.

> **Same content, two views.** `references/ettinger9-notes.md` is the single assembled
> file (these sections concatenated, plus the master header). This folder is the modular
> split — easier to open one section at a time. Start with
> [`00-overview-and-gap-analysis.md`](00-overview-and-gap-analysis.md) for the source
> citation, scope, **clinical-use caveats**, and the full **ClinIQ gap analysis**.

## Source
Ettinger SJ, Feldman EC, Côté E (eds). *Ettinger's Textbook of Veterinary Internal Medicine:
Diseases of the Dog and the Cat*, 9th edn. Elsevier, 2024 (2 vols). The PDF is **not** in the
repo (local only). Citations are by **chapter number** `(Ch NN)`, stable across pagination.

## Files

| File | Ettinger section | Chapters |
|---|---|---|
| `00-overview-and-gap-analysis.md` | Master header + ClinIQ gap analysis | — |
| `02a-differential-dx-signs-ch10-33.md` | §II Differential Diagnosis (signs) | 10–33 |
| `02b-differential-dx-signs-ch34-56.md` | §II Differential Diagnosis (signs) | 34–56 |
| `03-clinicopathologic-thresholds-ch57-71.md` | §III Clinicopathologic abnormalities | 57–71 |
| `04-technique-reference-thresholds.md` | §IV Techniques (numeric thresholds only) | 73,78,79,87,91,96,97,109 |
| `06-emergency-medicine-ch119-131.md` | §VI Emergency Medicine | 119–131 |
| `07-toxicology-ch132-138.md` | §VII Toxicology | 132–138 |
| `08-pharmacology-ch139-144.md` | §VIII Clinical Pharmacology | 139–144 |
| `10-hematologic-immunologic-ch169-182.md` | §X Hematologic & Immunologic | 169–182 |
| `11a-infectious-disease-ch183-197.md` | §XI Infectious (vector-borne/bacterial/protozoal) | 183–197 |
| `11b-infectious-disease-ch198-211.md` | §XI Infectious (viral & fungal) | 198–211 |
| `12-respiratory-ch212-222.md` | §XII Respiratory | 212–222 |
| `13-comorbidities-ch223-227.md` | §XIII Comorbidities | 223–227 |
| `14a-cardiovascular-ch228-232.md` | §XIV Cardiovascular (HF/arrhythmia/congenital/valvular) | 228–232 |
| `14b-cardiovascular-ch233-239.md` | §XIV Cardiovascular (myocardial/pericardial/HTN/HW/ATE) | 233–239 |
| `15a-neurologic-brain-ch240-249.md` | §XV Neurologic (brain) | 240–249 |
| `15b-neurologic-spinal-pns-ch250-256.md` | §XV Neurologic (spinal/PNS/NMJ/feline) | 250–256 |
| `16-gastrointestinal-ch257-265.md` | §XVI Gastrointestinal | 257–265 |
| `17-hepatobiliary-pancreatic-ch266-279.md` | §XVII Hepatobiliary + §XVIII Pancreatic | 266–279 |
| `19a-endocrine-ch280-289.md` | §XIX Endocrine (GH/DI/PTH/thyroid/insulinoma) | 280–289 |
| `19b-endocrine-ch290-298.md` | §XIX Endocrine (DKA/DM/adrenal/pheo) | 290–298 |
| `20-renal-ch299-305.md` | §XX Renal (incl. IRIS staging) | 299–305 |
| `21-lower-urinary-tract-ch306-315.md` | §XXI Lower Urinary Tract | 306–315 |
| `22-cancer-ch316-331.md` | §XXII Cancer | 316–331 |

## Scope
Extracted: the clinically actionable sections (§II–IV, VI–VIII, X–XXII). Deliberately skipped
(not used by ClinIQ's sign-based model): §I Worldwide medicine, §V Interventional, §IX Nutrition,
and procedural how-to within §IV (numeric thresholds from §IV were kept).

## ⚠️ Before using any drug dose
Verify against a current formulary — values are transcribed verbatim from the 9th edition to feed
ClinIQ content authoring, not direct patient care. Dog vs cat doses are kept distinct. See the
caveats in `00-overview-and-gap-analysis.md` (incl. the known IRIS-SDMA unit typo in the source).

## How it was generated
Per-chapter text extraction (`pdftotext -layout`) → distillation with numbers/units/species copied
verbatim and cited by chapter. A sample of high-stakes values (doses, thresholds, staging) was
spot-verified directly against the source PDF.
