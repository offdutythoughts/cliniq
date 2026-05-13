# Audit Changes Log

This document tracks corrections made during a clinical-content audit of the six recent
clinical-sign additions (commits 17fb8c5 → c0c7b7e). Each topic was verified against
current veterinary references via web search; the changes below correct clinically
inaccurate or misleading wording. Each entry lists the file, the corrected fact, and a
short rationale with source.

---

## 1. Red Eye (commit 17fb8c5)

### `src/lib/signs/redEye.ts`

- **Phenylephrine 2.5% blanching test** (flow-chart discriminator)
  - **Before:** "Conjunctival hyperaemia: Blanches with topical phenylephrine. Episcleral hyperaemia: Does NOT blanch with phenylephrine."
  - **After:** Both conjunctival and episcleral vessels blanch with phenylephrine 2.5%; conjunctival vessels blanch more rapidly and completely. **Scleritis** vessels do NOT blanch — that is the true discriminator.
  - **Why:** This contradicted the lesion file's own LES-RE-EPISC-EPI entry, which correctly states episcleritis vessels blanch with phenylephrine (vs scleritis). Multiple veterinary and human ophthalmology sources confirm phenylephrine differentiates episcleritis (blanches) from scleritis (does not), not episcleritis from conjunctival hyperaemia.

- **Feline Schirmer Tear Test reference range**
  - **Before:** "highly variable (3–32 mm/min); cats stress-tear so a single low reading is less specific."
  - **After:** "median ~14 mm/min, 95% PI ~8–22; a substantial proportion of clinically normal cats read <10. Single low readings without clinical correlation are non-diagnostic."
  - **Why:** Recent published reference data give a median of ~14.3 mm/min (95% PI 8.2–22.3). The traditional "stress causes low STT" is no longer supported — a 2024 study showed STT-1 was *higher* during stress than during stress-free exams. The previous "3–32" range was excessively wide and based on outdated reasoning.

- **IOP inter-eye difference threshold**
  - **Before:** "Inter-eye difference <20%" / table: "Difference >20% between eyes"
  - **After:** ">8 mmHg" inter-eye difference is the standard quantitative threshold.
  - **Why:** Standard veterinary ophthalmology teaching (incl. BSAVA, Merck) uses an inter-eye absolute difference of >8 mmHg as the clinically significant threshold; percent thresholds are non-standard.

- **Synechiae abbreviation**
  - **Before:** "PIS = posterior · PAS = peripheral anterior"
  - **After:** "PS = posterior, iris-to-lens · PAS = peripheral anterior, iris-to-cornea/angle"
  - **Why:** Standard ophthalmology abbreviation for posterior synechiae is **PS**, not "PIS". Added anatomical context for clarity.

### `src/data/lesions.ts`

- **Latanoprost in cats (LES-RE-GL-PRIM)**
  - **Before:** "Topical latanoprost 0.005% q6h (most rapid; not in cat — paradoxical effect)"
  - **After:** "Topical latanoprost 0.005% q6h (most rapid in dogs; ineffective in cats — lack of FP receptors in ciliary body)"
  - **Why:** Prostaglandin analogues are *ineffective* (not paradoxical) in cats because the feline ciliary body lacks FP receptors and uveoscleral outflow contributes only ~3% of aqueous drainage. Cats do show transient acute IOP reduction but no sustained effect, and may show miosis rather than a true paradoxical IOP rise.

- **Feline diffuse iris melanoma metastasis rate (LES-RE-UVEA-MEL note)**
  - **Before:** "Feline diffuse iris melanoma: ~50–60% metastasise"
  - **After:** "reported metastasis rates 19–63% (worse with ciliary body / scleral invasion)"
  - **Why:** Published literature reports a range of 19–63% (some studies up to 70%) with prognosis heavily dependent on extent of local invasion. The previous narrow "50–60%" overstated lower-extent disease.

---

## 2. Anisocoria / Abnormal Pupil (commit e65bc43)

### `src/lib/signs/abnormalPupil.ts`

- **Two-step phenylephrine protocol for Horner's localisation**
  - **Before:** A single 1%-phenylephrine timing table (3rd order ≤20 min, 2nd order 20–40 min, 1st order >40 min).
  - **After:** Explicit two-step protocol — apply 1% first (rapid dilation <20 min ⇒ 3rd order / postganglionic). If 1% fails to dilate, switch to **10% phenylephrine**: 20–40 min ⇒ 2nd order (preganglionic); >40 min ⇒ 1st order (central). Added note that >3 weeks of Horner's allows postganglionic axonal degeneration which can blur the test in 2nd-order lesions.
  - **Why:** 1% phenylephrine is only reliable for identifying postganglionic lesions (denervation hypersensitivity). Differentiation of preganglionic vs central lesions in practice requires 10% phenylephrine, per the small-animal Horner's review (Simpson 2015 and standard veterinary neurology references).

- **Idiopathic Horner's resolution time (Golden Retriever)**
  - **Before:** "6–10 weeks" (in both the Exam tab and Therapy pearls).
  - **After:** "Weeks to months — median ~15 weeks, range 11–20 weeks, up to 6 months." Lesion-DB entry similarly updated.
  - **Why:** Published Golden Retriever cohort data show median resolution ~15 weeks; some cases take up to 6 months. The "6–10 weeks" wording was tighter than the evidence supports.

- **Lily toxicity (drug/toxin history)**
  - **Before:** "lily ingestion (cat — AKI then anisocoria possible)"
  - **After:** "Lily ingestion in cats causes AKI rather than direct pupillary signs."
  - **Why:** No published literature links lily toxicity in cats to anisocoria/mydriasis. Documented signs are GI then renal failure. Including anisocoria as a potential lily sign is misleading.

- **Burmese breed entry (signalment table)**
  - **Before:** "Burmese → key gene cardiomyopathy; corneal sequestrum"
  - **After:** "Burmese → corneal sequestrum (chronic corneal pain → reflex uveitis → miosis)"
  - **Why:** "Key gene cardiomyopathy" appears to be a typo / autocomplete artefact; HCM is unrelated to the anisocoria differential. Sequestrum is the relevant predisposition because it causes reflex uveitic miosis.

### `src/data/lesions.ts`

- **Horner's lesion entry (LES-AP-MI-HORN)** — updated phenylephrine test description to the two-step protocol and revised the idiopathic-Horner's resolution wording to match the literature (median ~15 weeks instead of "~75% resolve 6–10 wks").
