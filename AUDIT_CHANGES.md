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

---

## 3. Blind Eye / Acute Vision Loss (commit 462ea78)

### `src/lib/signs/blindEye.ts`

- **Chiasmal lesion visual-field pattern**
  - **Before:** "Chiasmal lesion (pituitary macroadenoma — bitemporal hemianopia pattern)"
  - **After:** "Chiasmal lesion (pituitary macroadenoma — bilateral blindness)" with an added species note explaining that ~75% of canine and ~65% of feline optic fibres decussate at the chiasm, so chiasmal compression produces near-complete bilateral blindness rather than the discrete bitemporal hemianopia seen in humans (~50% crossover).
  - **Why:** Bitemporal hemianopia is the *human* chiasmal pattern, dependent on equal nasal/temporal fibre crossing. With three-quarters of fibres crossing in dogs, a chiasmal lesion blinds the whole field of both eyes rather than just the temporal halves. The previous wording implied an inappropriate clinical sign pattern.

### `src/data/lesions.ts`

- **Pituitary macroadenoma entry (LES-BL-CH-PIT)** — updated the signs description to reflect the same species-specific chiasmal anatomy (bilateral blindness, not bitemporal hemianopia).

- **Retinal dysplasia in utero infectious causes (LES-BL-RT-DYSPL)**
  - **Before:** "Acquired in utero (parvo, lymphocytic choriomeningitis virus)"
  - **After:** "Inherited (most common); acquired in utero (canine herpesvirus, parvovirus); radiation / drug / nutritional injury in utero"
  - **Why:** Lymphocytic choriomeningitis virus is a rodent zoonotic agent without documented role in canine fetal retinal dysplasia. Canine herpesvirus is the best-documented in-utero infectious cause; parvovirus also reported. Replaced LCMV with CHV.

---

## 4. Wet Eye / Epiphora (commit a81c800)

### `src/lib/signs/wetEye.ts` and `src/data/lesions.ts`

- **Removed all references to "Bonny disease"**
  - **Before:** Three places in `wetEye.ts` and the lesion subtype in `LES-WE-DR-NEO` referred to NLS-obstructing nasal / orbital neoplasia as "Bonny disease".
  - **After:** Eponym removed; the underlying clinical entity (chronic unilateral epiphora ± epistaxis ± facial deformity in an older patient → nasal / orbital neoplasia compressing the NLS) is unchanged.
  - **Why:** No such eponym appears in Merck, BSAVA, VetTimes, or PubMed sources. It is not a recognised veterinary or human ophthalmology term, and including a fabricated eponym would mislead readers into thinking it is a textbook diagnosis they should know.

---

## 5. Haematuria (commit e57a31c)

### `src/lib/signs/haematuria.ts`

- **Renal cystadenocarcinoma + nodular dermatofibrosis (RCND) breed**
  - **Before:** "Welsh Corgi, GSD → renal cystadenocarcinoma / nodular dermatofibrosis syndrome (GSD)"
  - **After:** "German Shepherd → renal cystadenocarcinoma + nodular dermatofibrosis (RCND, autosomal-dominant FLCN mutation)"
  - **Why:** RCND is a German Shepherd–specific syndrome with a documented FLCN (folliculin) mutation, autosomal dominant. Welsh Corgi is not a published RCND breed; including it implied a breed predisposition that does not exist.

- **CADET BRAF test performance characteristics**
  - **Before:** "CADET BRAF (~85% sensitive)" without specificity; "CADET BRAF positive in ~85%" of TCC.
  - **After:** "~80–85% sensitivity (CADET BRAF), up to ~95% with CADET BRAF-Plus reflex panel; specificity >99% — a positive test is highly confirmatory; a negative does not rule out TCC."
  - **Why:** Reported sensitivity is ~80% for the original CADET BRAF, ~95% with the CADET BRAF-Plus add-on. The >99% specificity is the clinically relevant figure to highlight, since a positive in a non-TCC case is extremely rare.

- **Bladder TCC breed list — spelling**
  - **Before:** "Shetland" (ambiguous)
  - **After:** "Shetland Sheepdog" (explicit, in both DO NOT MISS and signalment table)

### `src/data/lesions.ts`

- **LES-HU-BL-TCC diagnostic line** — CADET BRAF figures updated to match the signs file (sensitivity range, BRAF-Plus, >99% specificity).

---

## 6. Bleeding / Petechiae / Ecchymoses (commit c0c7b7e)

### `src/lib/signs/bleeding.ts`

- **Feline blood-type AB transfusion compatibility**
  - **Before:** "Type B and AB cats react severely to Type A blood."
  - **After:** "Type B cats carry strong naturally-occurring anti-A antibodies and react severely (potentially fatal) to Type A blood. Type A cats have weak anti-B (mild reaction). Type AB cats have no anti-A or anti-B antibodies and are universal recipients."
  - **Why:** AB cats *lack* anti-A and anti-B antibodies — they are universal recipients, not severe reactors. The original wording would have caused a clinician to withhold compatible Type A blood from an AB cat needing emergency transfusion. The pearls section was corrected to match.

- **Anticoagulant plant toxin — "sweet vernal hay"**
  - **Before:** "sweet vernal hay (anticoagulant)"
  - **After:** "moldy sweet clover hay (Melilotus — dicoumarol; primarily a livestock toxicity but anecdotally reported in dogs)"
  - **Why:** Sweet vernal grass (Anthoxanthum odoratum) is what gives hay its smell but is not the documented anticoagulant. Moldy *sweet clover* (Melilotus) is the source of dicoumarol — the original natural vitamin-K antagonist on which warfarin was modelled.

- **Fabricated "Lhasa Apso vasculopathy syndrome"**
  - **Before:** Signalment list said "Lhasa Apso → vasculopathy syndrome".
  - **After:** Replaced with the documented breed-predisposed vasculitis list (GSD, Jack Russell, Greyhound, Scottish Terrier, Saint Bernard, Shar-Pei).
  - **Why:** Lhasa Apso is not a published predisposed breed for cutaneous vasculitis or vasculopathy. The standard list of breeds with reported familial cutaneous vasculopathy / vasculitis comes from the WSAVA dermatology review and PubMed.

### `src/data/lesions.ts`

- **LES-BD-VS-LH → LES-BD-VS-FAM** — renamed and rewritten from the fabricated "Lhasa Apso vasculopathy syndrome" entry to a generic "Familial / breed-predisposed cutaneous vasculopathy" entry listing the actual published predisposed breeds.
