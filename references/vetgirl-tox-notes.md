# The Ultimate Guide to Toxicology eBook (VETgirl / ASPCA APCC) — Clinical Reference Notes

**Source:** *The Ultimate Guide to Toxicology eBook*. VETgirl, in collaboration with the ASPCA
Animal Poison Control Center (APCC), 2023. 44 pp.

**Original:** password-protected FlippingBook publication —
`https://online.flippingbook.com/view/491066824/` (private link; passcode held by the repo owner).
Not redistributable and **not committed to the repo**. Citations below are by **printed page number**
`(p. NN)`, which matches the eBook's own pagination.

These notes distil the clinically actionable content relevant to ClinIQ's sign-based model and
reference DB (`src/data/db.ts`): **toxic doses, clinical-sign timelines, decontamination decisions,
antidote doses, and monitoring schedules**. Organised by the eBook's own sections.

## Why this source is here

`references/ettinger9-notes.md` (§VII Toxicology, ch 132–138) flags toxidromes as having
**no matching ClinIQ sign screen**. This eBook is narrower but far more actionable for the
specific toxicants it covers, and it fills concrete gaps: `src/data/db.ts` currently has 20
`DIS-TOX-*` entries but **none** for xylitol, NSAIDs, lilies, grapes/raisins, sago palm, or iron.

## ⚠️ Clinical-use caveats

1. **Verify every dose against a current formulary before shipping.** Transcribed from the eBook;
   these feed ClinIQ content authoring, not direct patient care. The eBook's own tables carry the
   same warning: *"When in doubt, all drug dosages and treatment advice should be confirmed and
   cross-referenced with a reference guide such as Plumb's Veterinary Drug Handbook"* (p. 37).
2. **Dog vs cat doses are kept distinct throughout** — several thresholds differ by an order of
   magnitude (NSAIDs, xylitol, fomepizole).
3. Cells marked *(blank in source)* are genuinely empty in the eBook's own tables — not extraction
   failures. See **Extraction gaps** at the end of this file for the one cell that is still missing.
4. ASPCA APCC hotline appears throughout as the escalation path: **(888) 426-4435**.

---

# Section 1 — Spring Plants (pp. 4–9)

*"When The Best Laid Plants Go Awry: Handling Common Spring Plant Exposures in Dogs and Cats."*
Renee Tourdot, DVM, DABT, DABVT — Consulting Veterinarian in Clinical Toxicology, ASPCA APCC,
Champaign, IL.

## General approach (p. 4)

- Toxic ≠ life-threatening. Take a thorough medical **and exposure** history, perform a physical
  exam, then determine actual patient risk before deciding on treatment.
- **Identify the plant by scientific name.** Many unrelated species share a common name (the
  author's example: "lily"). ID help: community garden centres, poison control hotlines, reputable
  social media groups.
- Establish whether the plant came from a home or **commercial** landscape — fertilisers or
  pesticides may have been applied alongside it.
- On exam, look for pollen or plant material on the haircoat, in the teeth, and in the vomitus.
- **"How much is too much?" has no standard answer** — confounded by time of year, plant part,
  plant health, soil quality, species involved, and gaps in the literature. If an accurate risk
  assessment can't be made, decontamination is reasonable *when the risk of doing so is minimal*,
  followed by close monitoring.

> ClinIQ: no matching sign screen. Candidate — plant-exposure triage flow keyed on scientific name.

## Plants that target the GI system (p. 5)

**Ornamental bulbs and rhizomes** — *Crocus* spp., *Iris* spp., *Hyacinthus* spp., *Tulipa* spp.,
*Narcissus* spp., *Clivia* spp., *Hippeastrum* spp., *Galanthus nivalis*.

| | |
|---|---|
| Toxic principle | Alkaloids irritant to GI tract; **highest concentration in the bulb** |
| Onset | Signs usually within a few hours |
| Signs | Mild–moderate vomiting, diarrhoea, lethargy. Large **bulb** ingestions → CNS signs (depression, ataxia, tremors); seizures rare. Densely fibrous bulbs → GI obstruction (FBO) |
| Foliage exposure | Usually **no decontamination needed** in healthy patients; antiemetics, fluids, bland diet |
| Bulb ingestion | Induce emesis. If most/all material recovered → antiemetic + monitoring. Activated charcoal generally **not needed**; consider only if emesis unsuccessful and bulk material ingested |
| Escalation | IV fluids, antacids, sucralfate; exploratory laparotomy for suspected FBO. Mild tremors/seizures → benzodiazepines; more severe tremoring → **methocarbamol** |

**Wisteria spp.** — lectin (glycoprotein) + wisterin (glycoside) in all parts, **concentrated in
seeds and pods**. Mild-to-severe gastroenteritis depending on quantity and plant part. Foliage or
flowers → monitor, treat symptomatically. **Seed pods → induce emesis, then antiemetic.** Rarely
needs hospitalisation with IV fluids, antacids, sucralfate, antidiarrhoeals, nutritional support.

> ClinIQ: no `DIS-TOX-*` entry for ornamental bulbs or Wisteria. Candidate additions.

## Plants that target the cardiovascular system (p. 6)

**Rhododendron spp. and Kalmia spp.** (rhododendron, azalea, rosebay, great laurel; mountain laurel)

| | |
|---|---|
| Toxic principle | **Grayanotoxins**, in all parts *including the nectar* — honey derived from these plants can also be toxic |
| Mechanism | Bind and slow the opening/closing of sodium channels → persistent depolarisation; myocytes and neurons most sensitive |
| Signs | Hypersalivation and/or vomiting within **30 minutes**. Bradycardia, hypotension, lethargy, weakness, ataxia, disorientation or agitation, tremors, dyspnoea within **6 hours**. Signs may last **24–72 hours** |
| Decon | Emesis and/or activated charcoal if **more than a mouthful** of plant material ingested |
| Treatment | Antiemetic; monitor closely. If CV signs develop → **non-calcium-containing IV fluids**; monitor serum potassium (hypokalaemia exacerbates signs). **Atropine** as needed for bradycardia. Benzodiazepines for tremors or (rare) seizures |

**Helleborus spp. and Convallaria spp.** (hellebore/Lenten rose; lily of the valley)

| | |
|---|---|
| Toxic principle | *Helleborus*: protoanemonin + saponins (GI irritant) **and bufadienolides** (digitalis-like glycosides). *Convallaria*: a vast array of **cardenolides** |
| Mechanism | Cardenolides inhibit the Na⁺/K⁺-ATPase pump → ↑ intracellular Na⁺ → excess Na⁺ exchanged for Ca²⁺ via the Na⁺/Ca²⁺ exchanger → ↑ intracellular Ca²⁺ → slowed conduction, ↑ contractility |
| Signs | Vomiting, diarrhoea, anorexia, colic common. Bradyarrhythmias and hypotension typical; **hyperkalaemia, tachyarrhythmias, ventricular fibrillation** also possible. Signs typically start **within 24 h**, may be delayed to **3 days**. GI signs usually seen first |
| Toxic parts | Both genera: all parts toxic, but **roots and rhizomes most toxic** |
| Decon | Emesis if patient ingested more than a mouthful. Antiemetic after. If emesis unsuccessful or only partially successful → **single dose of activated charcoal** |
| Monitoring | Minimum **24 hours** for development of cardiovascular signs. Large ingestions → **continuous ECG ideal** |
| Treatment | Non-calcium-containing IV fluids; atropine or glycopyrrolate for bradyarrhythmias. Ventricular arrhythmias → **lidocaine or phenytoin**. Severe hyperkalaemia → **insulin and dextrose**. Refractory arrhythmias → **digoxin immune Fab (Digibind®)**; works rapidly, can be life-saving in the most severe cases |

> ClinIQ: maps to Weakness/Collapse and cardiac (`DIS-CARD-*`) sign flows. No plant-cardiotoxin
> `DIS-TOX-*` entry exists — candidate, and cross-links to the Digibind dosing on p. 26.

## Plants that target the CNS (pp. 7–8)

**Brunfelsia spp.** (Yesterday, Today and Tomorrow plant; kiss-me-quick; Lady of the Night;
morning-noon-night) — common ornamental shrubs in the southern United States.

| | |
|---|---|
| Toxic principle | Several potent compounds, most notably **brunfelsamidine**, which causes tremors and seizures |
| Signs | Vomiting, diarrhoea, ataxia, tremors, seizures. **Cardiac arrhythmias also possible.** Patients may appear hyperaesthetic, disoriented or agitated. Severely affected: hyperthermia, DIC, rhabdomyolysis, death |
| Timeline | Signs within **12 hours** of exposure. Severe signs may last **several days**, with minor tremors potentially continuing for **several weeks** |
| Decon | Approach with caution — neurologic patients are at increased risk of aspiration pneumonia. If a large amount was ingested **and the patient is already neurologic**: intubate and give a single dose of activated charcoal with sorbitol via orogastric tube. Gastric lavage can be attempted but recovery of plant material may be limited. **Serial warm-water enemas every 6–8 hours** may hasten elimination |
| Treatment | Tremors → **methocarbamol**; seizures → benzodiazepines, **levetiracetam**, or **phenobarbital**. Place on IV balanced crystalloid; monitor closely for hyperthermia, rhabdomyolysis, acidosis, DIC |

> ClinIQ: maps to Acute Encephalopathy / seizure flows. No `DIS-TOX-BRUNF` entry — candidate.

## Plants that target the kidneys (p. 8)

**Lilium spp. and Hemerocallis spp.** — especially the **Easter lily, *Lilium longiflorum***, in
spring floral arrangements.

- Much of what makes these plants toxic **remains unknown**, although the toxin appears to be
  water-soluble.
- **Cats are the only species known to exhibit signs of toxicity.**
- Clinical signs manifest initially as **vomiting and lethargy**. Within **48 hours** signs can
  progress to anorexia, polyuria, polydipsia, acute kidney injury, oliguria or anuria, and death.
- **Any exposure — including dermal exposure to pollen — should be considered to put the patient
  at risk of AKI.**
- Large amount of plant material ingested → induce emesis. Dermal exposure → bathe with mild dish soap.
- Then place on a **diuretic rate of IV balanced crystalloid fluid for 48 hours**. Monitor renal
  function closely; treat signs symptomatically.
- **Prognosis: excellent with prompt fluid diuresis; poor if treatment is delayed.**

> ClinIQ: ✗ missing — no lily/`DIS-TOX-LILY` entry despite being a top-tier feline AKI differential.
> Should cross-link to `DIS-REN-*` acute kidney injury. **High-priority addition.**

## Toxic Spring Plants Chart (p. 9)

"Dangerous to animals if ingested" — 15 entries:

| Scientific name | Common name(s) |
|---|---|
| *Convallaria* spp. | Lily of the Valley |
| *Crocus vernus* | Spring Crocus |
| *Galanthus nivalis* | Snowdrop |
| *Helleborus* spp. | Hellebore, Lenten rose |
| *Hemerocallis* spp. | Day lily |
| *Hippeastrum* spp. | Fire lily |
| *Hyacinthus* spp. | Hyacinth |
| *Iris vernus* | Iris |
| *Kalmia latifolia* | Mountain laurel |
| *Tulipa* spp. | Tulip |
| *Narcissus* spp. | Daffodil, Paperwhite |
| *Rhododendron* spp. | Rhododendron, Azalea, Rosebay, Great laurel |
| *Brunfelsia* spp. | Yesterday Today and Tomorrow Plant, Kiss-me-quick, Lady of the Night, Morning-noon-night |
| *Lilium* spp. | Easter lily, Asiatic lily, Stargazer lily, Tiger lily, Casablanca lily |
| *Wisteria* spp. | Wisteria *(listed in the section text, p. 5)* |

### Section 1 source citations (p. 8)

1. Lieske CL. Spring blooming bulbs: A year-round problem. *In Veterinary Medicine* Aug 2002: pp 580–588
2. Burrows GE, Tyrl RJ. *Toxic Plants of North America* 2nd ed. 2013, John Wiley & Sons Inc, pp 629
3. Burrows GE, Tyrl RJ. *Toxic Plants of North America* 2nd ed. 2013, John Wiley & Sons Inc, 437
4. Manhart IO, DeClementi C, Guenther CL. Mountain laurel toxicosis in a dog. *J Vet Emerg Crit Care* 23(1) 2013, pp 77–81
5. Burrows GE, Tyrl RJ. *Toxic Plants of North America* 2nd ed. 2013, 1014, John Wiley & Sons Inc
6. Burrows GE, Tyrl RJ. *Toxic Plants of North America* 2nd ed. 2013, 763–764, John Wiley & Sons Inc
7. Galey FD. "Cardiac Glycosides" in *Clinical Veterinary Toxicology*, ed. Konnie H Plumlee, 386–387. Mosby Inc, 2004
8. Zoitani CK. "Cardiovascular Toxicity" in *Veterinary Toxicology* 3rd ed, ed. Ramesh C. Gupta, 229. Elsevier Inc 2018
9. Burrows GE, Tyrl RJ. *Toxic Plants of North America* 2nd ed. 2013, 1135, John Wiley & Sons Inc
10. Clipsham R. *Brunfelsia australis* (Yesterday, Today and Tomorrow Tree) and *Solanum* Poisoning in a Dog. *J Am Anim Hosp Assoc* 2012; 48:139–144
11. Rumbeiha WK, Francis JA et al. A comprehensive study of Easter lily poisoning in cats. *J Vet Diagn Invest* 2004; 16:527–541
12. Bennett AJ, Reineke EL. Outcome following gastrointestinal tract decontamination and intravenous fluid diuresis in cats with known lily ingestion: 25 cases (2001–2010). *J Am Vet Med Assoc* 2013; 242:1110–1116

---

# Section 2 — Activated Charcoal (pp. 10–15)

Justine Lee, DVM, DACVECC, DABT — Director of Medicine / Founder, VETgirl.

## Before you reach for it (p. 10)

Five steps before administering AC:

1. Get an appropriate history
2. Triage the patient
3. Perform a thorough physical exam
4. Ask yourself if **decontamination** is appropriate
5. Ask yourself if **giving AC** is appropriate

> *"For example, if the dog is already profusely vomiting, it's too late to induce emesis. If the
> product doesn't bind to charcoal, then it's not worth giving AC!"* (p. 10)

## Toxicants that do NOT reliably adsorb to AC (p. 10)

- Ethylene glycol
- Alcohols (e.g. methanol, ethanol) and **sugar alcohols (e.g. xylitol)**
- Heavy metals
- Hydrocarbons
- Corrosive/caustic substances
- "Things on the periodic table"

> ClinIQ: directly actionable — `DIS-TOX-EG`, `DIS-TOX-ZN`, `DIS-TOX-LEAD` treatment fields should
> state AC is **not** indicated.

## Contraindications to AC (pp. 10, 12)

Severe sedation, decreased gag reflex (↑ aspiration risk), or intestinal obstruction. Contraindications
for AC **with a cathartic** include hypernatraemia, dehydration, and salt toxicosis (e.g. salt, ice
melts, homemade play dough) — fluid loss through the intestinal tract can cause excessive free water
loss and severe secondary hypernatraemia.

Other contraindications for AC (p. 12):

- Endoscopy (would obscure visualisation)
- Abdominal surgery of the GI tract
- Gastric or intestinal obstruction
- GI haemorrhage or perforation (due to pathology, caustic injury, etc.)
- Recent surgery
- Late-stage presentation with clinical signs already present
- Dehydration
- Lack of borborygmi / ileus
- Hypernatraemia
- Hypovolaemic shock
- Compromised airway (risk for aspiration pneumonia)
- Unprotected airways at risk for aspiration pneumonia (e.g. depressed state of consciousness,
  excessive sedation) — *ideally, protect the airway with an inflated ETT if the patient is being gavaged*
- Ingestion of a caustic substance or hydrocarbon (increased risk for aspiration pneumonia)

## Timing and dosing (pp. 12, 15)

- **Ideal timing: within < 5 minutes of ingestion** to be most effective. In veterinary medicine this
  is almost impossible given driving time, lapsed time since ingestion, triage, and the time to
  physically deliver AC (syringe feeding, orogastric tube) — administration is often delayed **up to
  an hour or more**.
- Because time since ingestion is often unknown, decontamination (emesis + AC) is often a relatively
  **benign** procedure provided the patient is not already symptomatic.
- Administration of AC **with a cathartic** may still be beneficial **as long as 6 hours out** with
  certain types of toxicosis.

**Single-dose AC:** current recommended dosing is **1–5 g of AC/kg with a cathartic** (e.g. sorbitol)
to promote transit time through the GI tract. The author personally uses lower than this —
**starts with 2 g/kg of AC for the first dose**.

**Multi-dose AC:** drop to **1 g/kg of AC** for additional doses, and **avoid cathartics with the
additional doses** to minimise the risk of hypernatraemia. Typically **no more than 2–3 total doses**.

**Current recommended dosing for multiple doses: 1–2 g of AC/kg without a cathartic, PO q 6 hours
for 2–3 more doses.**

## When to reach for multi-dose AC (p. 15)

Human studies have found multi-dose AC significantly decreases the serum half-life of certain drugs
including **antidepressants, theophylline, digitoxin, and phenobarbital**. Veterinary studies are
lacking, but there is likely added benefit from multi-dose AC provided the patient is well hydrated
and monitored appropriately. Specific situations:

- Toxicities including drugs that undergo **enterohepatic recirculation**
- Drugs that diffuse from the systemic circulation back into the intestinal tract down the
  concentration gradient
- Ingestion of **SR, XR, or long-acting (LA) release products**
- If the product has **delayed release** (extended release [XR] or sustained release [SRI])
- If there are **financial limitations that prevent hospitalisation**

When administering multiple doses of AC, the additional doses ideally should **not contain a
cathartic** (e.g. sorbitol), due to increased risks for dehydration and secondary hypernatraemia.

## Does human medicine still give AC? (p. 15)

Human medicine has moved away from AC in poisoned patients, but **aggressive use of AC in veterinary
medicine is still warranted** — it is often the last line of defence when adequately decontaminating
patients. Certain modalities — antidotes (fomepizole, pralidoxime chloride [2-PAM], digoxin-specific
antibody fragments), plasmapheresis, haemodialysis, mechanical ventilation — along with financial
limitations of pet owners, limit the ability to treat poisoned pets aggressively compared to human
medicine. AC therefore remains a **first line of defence therapy** in veterinary patients.

## ASPCA "When should you use Activated Charcoal?" decision tree (p. 11)

```
Is the pet stable?  (seizure, coma, depression, loss of gag reflex, or at risk for aspiration?)
├─ NO  → Treat clinical signs.
└─ YES → Will charcoal bind the toxin?
         ├─ NO  → Treat clinical signs, consider treatment options, or antidote, if indicated.
         └─ YES → Are signs expected to be life-threatening?
                  ├─ NO  → Treat clinical signs, consider treatment options, or antidote, if indicated.
                  └─ YES → Is the exposure recent or is there enterohepatic recirculation?
                           ├─ NO  → Treat clinical signs, consider treatment options, or antidote, if indicated.
                           └─ YES → Check hydration & serum sodium.
                                    ├─ NORMAL   → Give charcoal.
                                    └─ ABNORMAL → Treat dehydration, lower sodium.
                                                  Once completed, reconsider if charcoal should be given.
```

> ClinIQ: **strong candidate for a decision-flow screen.** This maps cleanly onto the existing
> sign-flow component model and is the single most reusable asset in the eBook.

---

# Section 3 — Cholestyramine (pp. 16–17)

*"The Use of Cholestyramine for the Veterinary Poisoned Patient."*
Justine Lee, DVM, DACVECC, DABT — Director of Medicine / Founder, VETgirl.

**What it is:** a **bile acid sequestrant and anti-lipemic agent**. Works by combining with bile acids
in the intestines and forming an insoluble complex that is then excreted in the faeces. This results
in *"partial removal of the bile acids from the enterohepatic circulation by preventing their
absorption."*

**What to use it for** — cholestyramine is thought to help bind bile in the gut as an effective
decontaminant method for certain toxicants:

- Blue green algae (**microcystins**)
- Vitamin D (**cholecalciferol**)
- Anticoagulant rodenticides *(although rarely seen now, as they have been transitioned out by
  cholecalciferol and bromethalin in the United States)*
- Beta blockers
- Digitalis / digitoxin
- Certain NSAIDs (e.g. piroxicam, diclofenac, naproxen, ibuprofen)
- Phenobarbital
- Tetracyclines
- Methotrexate
- Phenytoin
- **Sago palm (Cycad palm)**

**Rationale (p. 17):** According to the ASPCA APCC, it is thought to *"decrease the body burden of
vitamin D₃"* as cholecalciferol undergoes enterohepatic recirculation with bile acids. **Note that
the efficacy has not been well documented in clinical practice, however.**

## Dose (p. 17)

| | |
|---|---|
| ASPCA APCC current recommendation | **0.3–0.5 g/kg**, dissolved in liquid and administered orally every **6–8 hours for 3–5 days**, depending on the initial dose of cholecalciferol ingested |
| Other resources (higher dose) | **0.3–1 g/kg TID × 4 days**, or **1–2 g/dog BID**, **1 g/cat BID** |
| Contraindications | Complete biliary obstruction; hypersensitivity to cholestyramine |
| With chronic administration | Supplement **vitamin K1** to prevent secondary depletion |
| Sourcing | Human pharmacies or veterinary supply companies. Not very expensive — the author recommends emergency/specialty clinics stock it, specifically for vitamin D₃ toxicosis |

> *"When in doubt, contact the ASPCA APCC to determine if cholestyramine is indicated for your
> poisoned patient."* (p. 17)

> ClinIQ: `DIS-TOX-CHOLE` treatment field should include cholestyramine at the APCC dose above.
> Currently 3 references to `DIS-TOX-CHOLE` exist in `src/data/db.ts` — check whether any name it.

---

# Section 4 — Learn All Things Toxicology with VETgirl (pp. 18–19)

Promotional / CE marketing spread (blogs, podcasts, webinars/videos, VETgirl U certification
programme). **No clinical content.** Not extracted.

---

# Section 5 — Xylitol (pp. 20–23)

*"Xylitol Toxicosis in Dogs."* Cristine L. Hayes, DVM, DABT, DABVT — Medical Director,
ASPCA Animal Poison Control Center, Champaign, IL.

## Sources and label pitfalls (p. 20)

- A sugar alcohol derived from hardwood plants and as a byproduct from ethanol production.
- Available as 100% xylitol powder for baking; frequently found in sugar-free baked goods, gum,
  chocolate, and other candy, weight-loss protein bars, peanut butter & nut butters, ice cream.
- Also common in **dietary supplements and human medications**. Because xylitol has topical
  antimicrobial properties and imparts a cooling sensation, it lurks in **toothpaste, mouthwash,
  dental floss, cosmetics, hair care products, and even clothing**.
- **Label pitfall:** xylitol is often not specifically called out in the nutritional facts. Because
  ingredient contents are listed by weight in descending order, the higher xylitol is on the
  ingredient list, the higher the xylitol content in the product. For some products, reporting
  sugar alcohols on the nutritional label is **voluntary**.
- Products claiming to have sugar alcohols note the sugar alcohol content (including erythritol,
  isomalt, maltitol, mannitol, sorbitol, and xylitol) but are **not required to list the xylitol
  content separately**. Example: a label may show 1 g of sugar alcohol per piece and list xylitol,
  sorbitol, gum base, and natural flavours in the ingredients — the 1 g is divided between xylitol
  and sorbitol, with more xylitol in the product compared to sorbitol. **Contact the manufacturer**
  for specific xylitol content.

## Species susceptibility (p. 20)

- **Dogs are the species most susceptible.** Other species (ruminants, rabbits) demonstrate increased
  insulin release when administered xylitol IV without significant clinical signs.
- In one small study, **cats did not develop hypoglycaemia or liver effects despite oral exposure up
  to 1000 mg xylitol/kg body weight**.
- **Xylitol does not cause significant insulin release in humans, rats, or horses.**

## Toxic doses — dogs (p. 20)

| Dose | Effect |
|---|---|
| **100 mg/kg** | Hypoglycaemia |
| **500 mg/kg** | Hepatic necrosis |

## Mechanism (p. 21)

- After ingestion, xylitol reaches **peak plasma concentrations in dogs within 30 minutes**.
- Metabolised primarily in the liver to D-xylulose, then via the **pentose-phosphate pathway** to
  glucose, glycogen and lactate, with glucose as the predominant metabolite.
- In dogs, xylitol stimulates a **greater insulin surge compared to an equal amount of glucose** →
  hypoglycaemia. The insulin surge increases in a **dose-dependent manner**.
- Hepatotoxicity mechanism not completely known — may be **cellular death from ATP depletion** (as
  xylitol is metabolised by the pentose-phosphate pathway rather than the citric acid cycle), or
  generation of **reactive oxygen species** during xylitol metabolism causing hepatocellular damage.

## Clinical signs (p. 21)

- Onset varies by product type. **Powdered xylitol, mints, fast-dissolve medications** and other
  rapidly disintegrating foods → hypoglycaemia in **as little as 30 minutes**. Products like **gum
  disintegrate slowly** when not chewed → hypoglycaemia **delayed up to 12 hours**.
- Most common signs: **vomiting, lethargy, weakness**. Depression and seizures also reported,
  typically due to hypoglycaemia.
- **Hypoglycaemia** is a frequent blood chemistry change, although **hyperglycaemia has also been
  reported** — thought to be due to the **Somogyi phenomenon** (rebound hyperglycaemia) from high
  insulin levels.
- Additional blood chemistry findings: **hypokalaemia, hypophosphataemia, hyperphosphataemia**, and
  elevated liver enzymes, particularly **elevated ALT**.
- Liver enzyme elevations may be seen within **4–24 hours** of large exposures **over 500 mg/kg**,
  and have been seen **even without changes in the blood glucose**.
- **Coagulopathies** (PT and PTT) have been reported with severe liver enzyme elevations.
  **Thrombocytopenia** has also been rarely reported.

## Treatment (pp. 22–23)

**Emesis decision** depends on amount and form ingested, how long ago, and presenting blood glucose
on arrival.

- Exposures to some forms of xylitol (e.g. 100% xylitol products, mints, fast-dissolve
  medications/supplements) **should not have emesis induced** — they are unlikely to be recovered in
  the vomit since they are rapidly absorbed.
- Certain varieties of gum may have a high xylitol content in the **outer coating**, which is
  absorbed faster than the gum base, lowering the effectiveness of emesis.
- **Ingestions of xylitol over 100 mg/kg**, or if the amount is unknown, **should have emesis
  considered** if the dog has not vomited prior to arriving at the hospital, has no
  contraindications for emesis, and the exposure was **recent (less than one hour)**.
- Keep in mind that signs of hypoglycaemia such as weakness can develop quickly and may lead to
  aspiration should they be seen while the patient is vomiting.

**Activated charcoal is NOT recommended for xylitol exposures.** AC is an adsorbent — it binds to
particles within the digested tract. In vitro studies have shown that **xylitol does not bind well
to activated charcoal**. Additionally, since xylitol is readily and rapidly absorbed from the
digested tract, AC is unlikely to be effective.

**Monitoring:**

- Dogs that have ingested a toxic amount → monitor closely for **at least 12–24 hours** after exposure.
- Baseline bloodwork on presentation: **blood glucose and electrolytes (potassium and phosphorus)**.
- Patients that ingest an unknown amount, or ingest **over 500 mg/kg body weight**, should also have
  initial **liver enzymes and a CBC including platelet count** evaluated.
- **Blood glucose q 2–3 hours**, potentially more frequently for severely affected dogs.
  Hypoglycaemia is expected within **12 hours** of ingestion; if it develops and persists,
  monitoring beyond 12 hours may be necessary.
- **Electrolytes reassessed in 8–12 hours** to determine if supplementation is necessary.
- After baseline liver values determined, monitor at **12, 24 and 48 hours post ingestion**. Longer
  monitoring may be needed if liver enzymes remain elevated.
- **PT and PTT** should also be monitored if liver values are substantially elevated.
- **CBC may be reassessed 24 hours** after exposure for evidence of thrombocytopenia, although this
  is rarely reported.

**Supportive care and doses:**

| Therapy | Dose |
|---|---|
| Dextrose bolus, then CRI | **2.5–5% dextrose** IV, continued until hypoglycaemia resolves |
| Dextrose fluids | May also support the liver; administer for **at least 12 hours** (or until hypoglycaemia resolves if present) if the patient is at risk for hepatotoxicity |
| **SAMe** | **20 mg/kg/day** |
| **Milk thistle** | **50 mg/kg/day** |
| **N-acetylcysteine (NAC)** | Initial **140 mg/kg** PO or IV through a bacteriostatic filter, followed by **70 mg/kg every 6 hours for up to 7 additional treatments** |
| **Vitamin K1** | **1.5–2.5 mg/kg** PO twice daily **with food** if evidence of hepatic damage and coagulopathy |
| Fresh frozen plasma | Consider if hepatic damage + coagulopathy |

- An IV catheter should be placed if the dog is at risk for hypoglycaemia.
- **Effectiveness of hepatoprotectants at preventing and treating liver damage from xylitol has not
  been determined.**
- Nutritional support and symptomatic care: patients exposed to a toxic dose should be **fed meals
  every 2–3 hours for 12 hours** or until hypoglycaemia resolves.
- Electrolyte disturbances (hypokalaemia, hypophosphataemia, hyperphosphataemia) are usually
  transient but may require supplementation if severe.

## Prognosis (p. 23)

- Hospitalisation may be needed for **1–3 days**, potentially longer depending on response.
- With prompt and effective treatment, prognosis after xylitol exposure in dogs is **generally good**.
  Early decontamination (when possible) and management of hypoglycaemia is key.
- Dogs with mild-to-moderate liver enzyme elevations and mild coagulopathies: prognosis can be
  **good as well if treated aggressively**.
- Severely elevated liver enzymes suggestive of hepatic necrosis, severe coagulopathies, and/or
  repeated episodes of hypoglycaemia → prognosis **more guarded**, although some of these more
  severely affected patients can recover successfully.

### Section 5 source citations (p. 23)

1. DuHadway MR, Sharp CR, Meyers KE, Koenigshof AM. Retrospective evaluation of xylitol ingestion in dogs: 192 cases (2007–2012). *JVECC* 2015; 25(5):646–654
2. Code of Federal Regulations, Title 21, Chapter I, Subchapter B, Part 101, Subpart A, Section 101.9 (accessed 2/23/2023)
3. Murphy LA, Dunayer EK. Xylitol Toxicosis in Dogs An Update. *Vet Clin Small Anim* 2018; 48(6):985–990
4. Jerzsele A, Karancsi Z, Pászti-Gere E, et al. Effects of p.o. administered xylitol in cats. *J Vet Pharmacol Ther* 2018; 41(3):409–414
5. Xia Z, He Y, Yu J. Experimental acute toxicity of xylitol in dogs. *J Vet Pharmacol Ther* 2009; 32:465–469
6. Piscitelli CM, Dunayer EK, Aumann M. Xylitol Toxicity in dogs. *Compendium* 2010, February; E1-E4
7. Dunayer EK, Gwaltney-Brant SM. Acute hepatic failure and coagulopathy associated with xylitol ingestion in eight dogs. *JAVMA* 2006; 229(7):1113–1117
8. Cope RB. A screening study of xylitol binding in vitro to activated charcoal. *Vet Hum Toxicol* 2004; 46:336–7

> ClinIQ: ✗ **missing entirely.** No `DIS-TOX-XYL` entry; xylitol appears only as free text in
> differentials (`src/data/db.ts` lines 93, 236, 494). **Highest-priority addition** — this is a
> common, dose-defined, time-critical toxicosis with a clean sign flow
> (hypoglycaemia → hepatic necrosis) and should cross-link to `DIS-HEP-*`.

---

# Section 6 — Antidotes (pp. 24–31)

*"Antidotes in Veterinary Medicine."* Justine A. Lee, DVM, DACVECC, DABT —
Director – Medicine / Co-Founder, VETgirl.

## Framing (p. 24)

> *"In the poisoned veterinary patient, treatment should be aimed at decontamination and symptomatic
> supportive care. If an antidote is available, it should be promptly initiated if available, safe,
> and financially feasible."*

An antidote is *"any compound that is used to counteract the effects of a toxicant."* The goal is to
**interfere with the ADME of a toxicant** (absorption, distribution, metabolism, excretion) and
eliminate or reduce the adverse effects.

Three board-recognised categories:

- **Chemical antidotes**
- **Functional antidotes**
- **Pharmacological or physiological antidotes**

**Economic reality (p. 24):** *"little economic incentive for pharmaceutical companies to seek
approval for antidotal medications with only a small projected market"* — hence a paucity of
antidotes available. Use of antidotes is generally **extra-label** in veterinary medicine
(AMDUCA 1994), and pet owners should be made aware of this.

## Chemical antidotes (p. 24)

Work **directly on the toxicant** — bind to the toxicant to *"yield an innocuous compound that is
excreted from the body."* They either *"decrease the toxicity of the agent or increase its
excretion"*, working by binding the toxicant to produce a non-harmful compound that is then later
excreted. Examples: **antivenins, chelating agents, and immunologic agents such as F(ab′) fragments
(e.g. digoxin-specific F(ab′) fragments)**.

### Antivenins (pp. 24–26)

Work by neutralising venom antigens via **passive immunisation** with venom antigen-specific
immunoglobulins (from horse, sheep) hyper-immunised with the venom(s) of a given species.

- Can be considered with **envenomation: snake and black widow spider bites** — to help prevent or
  treat coagulopathy, paralysis, and thrombocytopenia. **However they will not help with tissue
  necrosis.**
- Depending on the type, certain antivenins may be **difficult to secure or find**.
- The **National Animal Poison Control Center (888) 426-4435** or any **Regional Poison Control
  Center (800) 222-1222** may have additional resources that can enable the location of an
  appropriate antivenom.
- **IV antivenin should be considered early — ideally within 6 hours.**
- Depending on the type of antivenin used, **several vials may be necessary**, which can be
  cost-prohibitive.
- Monitor carefully during administration: **serum sickness, anaphylactic, or anaphylactoid
  reactions** can occur, particularly if the patient has received antivenin previously.
- Product landscape (p. 25): there are **three ASPCA-approved antivenins** available against North
  American pit vipers, and **two FDA-approved** products. *(Specific product/manufacturer names are
  set in a graphic that did not render legibly — see Extraction gaps.)*
- **Benefit of F(ab) products:** an antivenin containing F(ab) components of the immunoglobulin
  molecule has a **lower risk of allergic reaction** and allows for faster reconstitution and a
  **greater volume of distribution**. However, its use is off-label since it is for humans, and it
  is expensive — the risk and cost of administration may outweigh the potential benefits.

### Immunologic agents / Fab — Digibind, DigiFab (p. 26)

Used for **life-threatening cardiac glycoside toxicosis** (e.g. cardiac glycoside-containing plants,
digoxin, Bufo toad). Typically limited to life-threatening cardiac arrhythmias where traditional
antiarrhythmic therapy has failed. Works by *"binding free digitalis glycoside molecules in the
extracellular fluid as well as those already bound to sodium-potassium ATPase."* Reported to
successfully treat toxicosis.

Commercially available as **2 ds-Fab products**: **DigiFab** (Protherics, Inc., Nashville, TN, USA)
and **Digibind** (GlaxoSmithKline, Parma, Italy).

| | |
|---|---|
| Affinity | Antidigitoxin Fab fragments have a **higher affinity for digoxin** |
| Digibind | Each bottle contains **38 mg of Fab**, which will bind to **0.6 mg of digoxin or digitoxin** |
| DigiFab | Each vial contains **40 mg of Fab**, which will bind approximately **0.5 mg digoxin** |
| Cost | May be cost-prohibitive (**~$500/bottle**) and can be obtained from a human hospital |

**Dosing (p. 26):** little evidence or animal studies have been used to establish the veterinary
dose; however, published doses include:

- If the **serum digoxin level is available**, the number of vials should be based on the formula:
  **serum digoxin level (ng/mL) × body weight (kg) / 100**
- Unfortunately, in the veterinary patient it is rare to obtain a timely serum digoxin concentration.
  For this reason, the general recommendation is to **administer 1–2 vials (slowly over 30 minutes,
  using a 0.22-micron filter if possible)** and reassess the patient.

## Enzyme inhibitors (p. 26)

### Fomepizole (4-MP)

A **competitive inhibitor of alcohol dehydrogenase**.

- **Preferred over ethanol in dogs** as it does not result in CNS depression, diuresis, and
  hyperosmolality.
- **In cats, it is the antidote of choice if used within 3 hours**, as the survival with ethanol is
  much worse in comparison to fomepizole.
- While expensive, it is **lifesaving when administered to dogs within the first 8–12 hours** of
  ingestion; some sources say it can be effective **as late as 36 hours post exposure**.
- **In cats, the antidote must be administered within 3 hours of ingestion to be effective.**

| Species | Fomepizole (4-MP) dose |
|---|---|
| **Dogs** | **20 mg/kg IV** first dose (over 15–30 minutes); **15 mg/kg at 12 h**; **15 mg/kg at 24 h**; **5 mg/kg at 36 h**. 5 mg/kg IV can be given **every 12 hours until the EG test is negative** |
| **Cats** | **125 mg/kg IV** first dose; **31.25 mg/kg at 12 h**; **31.25 mg/kg at 24 h**; **31.25 mg/kg at 36 h** |

> ClinIQ: `DIS-TOX-EG` currently has only **1** reference in `src/data/db.ts`. These species-split
> doses and the 3-hour feline window are exactly the kind of detail the Dx view should carry.

## Pharmacological antidotes (pp. 27–29)

Work by **directly antagonising the toxicant** at the receptor site, by preventing formation of toxic
metabolites, by restoring normal physiological function, or by assisting with more rapid elimination
of the toxicant from the body. Examples include reversal agents (naloxone for opioids, atipamezole
for alpha-adrenergic agonists, flumazenil for benzodiazepines), n-acetylcysteine (e.g.
acetaminophen), pralidoxime for OP toxicosis, etc.

| Antidote | Notes and dosing |
|---|---|
| **Atipamezole** | Alpha-adrenergic antagonist that reverses **medetomidine and dexmedetomidine**. Can be used off-label to also reverse other drugs such as **xylazine, clonidine, brominidine, tizanidine, and amitraz**. Has a **very short half-life (2–3 hours)** and may need to be re-dosed if necessary |
| **Atropine** | Anticholinergic that competes with acetylcholine at the post-ganglionic parasympathetic sites (hence is called an antiparasympathetic or parasympatholytic drug). Also called an **antimuscarinic** as it antagonises the muscarine-like actions of ACh. Used for **SLUDGE signs from organophosphate or carbamate toxicity**. With OP toxicosis, atropine should be given **despite the tachycardia; higher doses are often necessary** |
| **Ethanol** | Antidote for ethylene glycol toxicosis **if fomepizole is not available**. Competes with alcohol dehydrogenase, preventing metabolism of EG into its more toxic metabolites. **Only clear ethanol should be used (e.g. grain alcohol, vodka).** A **7% ethanol solution** is made by removing 175 mL from a 1 L bag of saline and adding 175 mL of **80-proof vodka**; if 190-proof grain alcohol is available, a 7% solution can be made by removing 74 mL from a 1 L bag of saline and adding 74 mL of the grain alcohol. **Dose: loading dose of 8.6 mL/kg (600 mg/kg) 7% ethanol slow IV, then continue with a CRI of 1.43 mL/kg/hr (100 mg/kg/hour), IV as a CRI for 24–36 hours** |
| **Flumazenil (Romazicon™)** | Reversal agent for **benzodiazepine overdoses** — competitively antagonises the benzodiazepine receptor site. An imidazobenzodiazepine derivative that rapidly displaces benzodiazepines from the receptor, **reversing its effect within minutes**. Very **short-acting (1–2 hours)** and expensive. The author generally only uses it for **severe respiratory depression or marked CNS signs** |
| **N-acetylcysteine (NAC)** | Primary antidote for **acetaminophen/paracetamol toxicosis**. Provides an available source of intracellular glutathione, and is thought to have additional hepatoprotective effects including anti-inflammatory activity, enhanced mitochondrial energy metabolism, and improved oxygen delivery with liver injury. Specifically with acetaminophen, toxicosis occurs when glucuronidation and sulfation pathways are depleted → toxic metabolites build up and secondary oxidative injury occurs. NAC limits formation of the toxic metabolite **NAPQI** by providing additional glutathione substrate. **Can be safely used as a hepatoprotectant with hepatotoxicants**, though there is a paucity of veterinary literature on outcome. Considered **benign and safe**. The author recommends **parenteral administration** to allow for continued administration of activated charcoal (as some limited enterohepatic recirculation occurs with acetaminophen toxicosis). **When administering NAC by any route, it must be diluted, as it is corrosive or irritating.** If NAC is not available, **SAMe** can be given as a glutathione source with any hepatotoxicant |
| **Naloxone** | Pure opioid antagonist for reversal of **opioid overdose**. Rapid onset (**1–5 minutes**) but **short duration of action (1.5 hours)** — repeated doses are often necessary. **Will not reverse respiratory depression from buprenorphine**; much higher doses are often necessary to reverse buprenorphine |

## Functional antidotes (pp. 28–29)

**Lessen the severity of the clinical signs of the toxicant** — they do **not** directly interact
with the toxicant itself.

| Antidote | Use and notes |
|---|---|
| **Bisphosphonates** (e.g. pamidronate) | Antidote for **hypercalcaemia secondary to cholecalciferol toxicosis**. Lowers calcium by binding to hydroxyapatite crystals within the bone; impedes osteoclast activity and induces osteoclast apoptosis. Now generic, **much more cost effective and readily available**. **Monitor calcium every 12 hours**; if persistent hypercalcaemia is evident, additional dosing can be used **3–7 days after the initial dose** |
| **Calcitonin** | Also for hypercalcaemia secondary to cholecalciferol toxicosis. An osteoclast-inhibiting hormone that acts directly on bone by inhibiting osteoclastic bone resorption. Also reduces tubular reabsorption of calcium (along with phosphate, potassium, sodium, magnesium, and chloride) and promotes renal excretion. **Must be given parenterally, as it is destroyed in the gut after oral administration.** Used when a bisphosphonate is not readily available or in conjunction with treatment. **Bisphosphonates are preferred by some toxicologists over calcitonin as it has longer lasting effects** |
| **Cyproheptadine (Periactin™)** | A **serotonin antagonist and antihistamine (H1 blocker)** — competes with histamine for sites on H1-receptor sites. Formerly used as an appetite stimulant in cats; now used to treat **serotonin syndrome** (e.g. agitation, hyperesthesia, tremors, seizures) secondary to **SSRI antidepressant and amphetamine toxicosis** |
| **Intravenous lipid emulsion (ILE)** | For more information on ILE, the eBook defers to a veterinary reference book |
| **SAMe (S-adenosyl-methionine)** | Acts as a **methyl donor**, while also donating an aminopropyl group to be a source of polyamines. Generates sulfur-containing compounds necessary for conjugation reactions used in detoxification within the liver and as a **precursor for glutathione**. Exogenous SAMe increases liver and RBC glutathione levels and/or prevents its depletion. Also an **inhibitor of apoptosis within the hepatocyte**. Should be given **on an empty stomach**, as the presence of food can significantly reduce the amount absorbed. Commonly used as a benign, safe hepatoprotectant with toxicants such as ***Amanita* spp. poisoning, blue-green algae, xylitol, acetaminophen**, etc. |
| **Methocarbamol** | Listed as a functional antidote for toxicants resulting in tremors |

## Limitations of antidotes (p. 30)

- Some are **cost prohibitive** — including **4-MP (fomepizole)**, currently **several thousand per
  bottle** unless compounded. Likewise, **F(ab′) crotalid antivenin therapy can cost close to
  $1,000/bottle**.
- Certain antidotes have limited to **no availability**: the antidote for **botulism (antitoxin)** is
  only available through the **Centers for Disease Control and Prevention (CDC)**.
- Keep in mind the **cost versus benefit analysis** for the patient.
- Adverse effects can rarely be seen with antidotes and can result in rare but potentially deadly
  complications. The pet owner should be made aware of the **extra-label use** — along with the rare
  complications that can occur.

## Conclusion (p. 30)

> *"Knowledge of the underlying mechanism of action, the pharmacokinetics (including absorption,
> distribution, metabolism, and excretion), and the toxic dose of the toxicant are imperative in
> determining appropriate decontamination and therapy for the poisoned patient. Keep in mind that as
> very few toxicants have a readily available antidote, treatment should always be aimed at
> symptomatic supportive care."*

**Abbreviation (p. 31):** ADME = absorption, distribution, metabolism and excretion.

### Section 6 source citations (p. 31)

1. DeClementi C. Prevention and treatment of poisoning. In Gupta RC, ed. *Veterinary Toxicology: Basic and Clinical Principles*. New York: Academic Press, 2007:1139–1158
2. Gwaltney-Brant SM, Lee JA, Fernandez AF. Drugs used to treat toxicosis. Kirk & Bonagura's *Current Veterinary Therapy* XVI, 2019. Pending publication
3. Hovda LH. Antidotes and other useful drugs. In: Hovda L, Brutlag A, Poppenga R, Peterson K, eds. *Blackwell's Five-Minute Veterinary Consult Clinical Companion: Small Animal Toxicology*, 2nd ed. Iowa City: Wiley-Blackwell, 2016, pp 36–48
4. Gwaltney-Brandt S. Newer antidotal therapies. CVC, 2010 (veterinarycalendar.dvm360.com)
5. Bright SJ, Post LO. Veterinary antidotes and availability: an update. Center for Veterinary Medicine, US Food and Drug Administration (abvt.org, 2008; accessed Jan 15, 2018)
6. American Board of Veterinary Toxicology: Review of veterinary antidotes (abvt.org; accessed Jan 15, 2018)
7. Peterson M. Snake Envenomation in Small Animal Critical Care Medicine by Silverstein, D.C. and Hopper, K. Saunder Inc. 2009, pp 399–404
8. *Plumb's Veterinary Drug Handbook*, 7th edition. Wiley-Blackwell, 2011
9. Pao-Franco A, Hammond TN, Weatherton LK, et al. Successful use of digoxin-specific immune Fab in the treatment of severe *Nerium oleander* toxicosis in a dog. *J Vet Emerg Crit Care* 2017;27(5):596–604
10. FDA, DigiFab label (fda.gov)
11. Connally HE, Hamar DW, Thrall MA. Inhibition of canine and feline alcohol dehydrogenase activity by fomepizole. *Am J Vet Res* 2000;61:450–455
12. Connally HE, Thrall MA, Forney SD, et al. Safety and efficacy of 4-methylpyrazole for treatment of suspected or confirmed ethylene glycol intoxication in dogs: 107 cases (1983–1992). *J Am Vet Med Assoc* 1996;209(11):1880–18803
13. Grauer GF, Thrall MA, Henre BA, et al. Comparison of the effects of ethanol and 4-methylpyrazole on the pharmacokinetics and toxicity of ethylene glycol in the dog. *Toxicol Lett* 1987;35(2-3):307–314
14. Johnson SE. Updates on hepatoprotective therapies. Proceedings, CVC (veterinarycalendar.dvm360.com)
15. Batski GM, Koenig A. Acetaminophen. In: Osweiler G, Hovda L, Brutlag A, Lee JA, eds. *Blackwell's Five-Minute Veterinary Consult Clinical Companion: Small Animal Toxicology*, 1st ed. Iowa City: Wiley-Blackwell, 2010, pp. 687–695
16. Webb CB, Twedt DC, Fettman MJ, et al. S-adenosylmethionine (SAMe) in a feline acetaminophen model of oxidative injury. *J Feline Med Surg* 2003;5(2):69–75
17. Wallace KP, Center SA, Hickford FH, et al. S-adenosyl-L-methionine (SAMe) for the treatment of acetaminophen toxicity in a dog. *J Am Anim Hosp Assoc* 2002;38(3):246–54

**Footnotes (p. 31):**
a. Personal communication, the ASPCA Animal Poison Control Center
b. Loftin E. Toxicities in the ER (dovelewis.org/pdf/events/Erika_toxins.pdf)

---

# Nephrotoxicant Table (pp. 32–37)

VETgirl / ASPCA Animal Poison Control Center. Columns: **TOXIN · SOURCE · MECHANISM OF ACTION ·
CLINICAL SIGNS · CLIN PATH FINDINGS · TOX TEST · TREATMENT · PROGNOSIS**.

> **NOTE (p. 37):** *"When in doubt, all drug dosages and treatment advice should be confirmed and
> cross-referenced with a reference guide such as Plumb's Veterinary Drug Handbook or a veterinary
> toxicology resource. When in doubt, the ASPCA Animal Poison Control Center at (888) 426-4435
> should be consulted as needed."*
>
> **Abbreviations (p. 37):** AC: activated charcoal; AKI: acute kidney injury; BW: blood work;
> CNS: central nervous system; GI: gastrointestinal; OTC: over-the-counter; UOP: urine output.

## Cholecalciferol / Vitamin D₃ products (p. 32)

| Field | Content |
|---|---|
| Source | Rodenticides; OTC or prescription vitamin D₃; **psoriasis creams (calcipotriene)** e.g. Dovonex®, Calcitrene®, Sorilux® |
| Mechanism | Hypercalcaemia: vitamin D precursor of activated vitamin D₃ leading to **calcium reabsorption from kidneys, bone and GI tract** |
| Clinical signs | Depression, lethargy, weakness, anorexia, vomiting, malaise, hematemesis, PU/PD, **uremic halitosis**, constipation, melena, dehydration. **AKI usually 2–3 d post-exposure** due to soft tissue mineralisation of renal tubules |
| Clin path | Hypercalcaemia, hyperphosphataemia, azotaemia, metabolic acidosis |
| Tox test | Serum **PTH** — will be suppressed and low. Total Ca²⁺ and iCa²⁺ elevated. **25(OH)D₃ and 1,25(OH)₂D₃ levels elevated** |
| Treatment | If no hypercalcaemia, conservative treatment but **aggressive decontamination**: emesis, activated charcoal, **cholestyramine**. Limited fluid therapy. **Clin path monitoring q 24h × 2–3 d**: SDMA, BUN/creatinine, Ca/phosphorus, iCa²⁺. **If hypercalcaemia present, then calciuresis tx**: hospitalisation, IV fluids (0.9% NaCl), furosemide, prednisone, zoledronic acid, calcitonin (hard to find), pamidronate |
| Prognosis | **>0.1–0.5 mg/kg** can result in clinical signs and hypercalcaemia, respectively. **LD₅₀ 85 mg/kg (dog).** Minimum acute toxic dose in dogs of **calcipotriene is 37 µg/kg BW** |

> ClinIQ: `DIS-TOX-CHOLE` exists (3 refs). This table row is richer than most — **enrichment target**,
> especially the calcipotriene cream source and the PTH/25(OH)D₃ tox-test panel.

## Ethylene glycol (p. 33)

| Field | Content |
|---|---|
| Source | Antifreeze (**95% EG**), windshield de-icing agents, motor oils, hydraulic brake fluid, developer solutions, paints, some industrial solvents |
| Mechanism | **Alcohol dehydrogenase (ADH) converts EG to glycoaldehyde and organic acids (glycolic acid and oxalic acid) → calcium oxalate crystalluria → AKI** |
| Clinical signs | **Stage 1 (0.5–12 h):** signs similar to alcohol poisoning — ataxia, hypersalivation, nausea, vomiting, seizures, PU/PD, metabolic acidosis. **Stage 2 (12–24 h):** signs seem to "resolve" from Stage 1 but severe internal injury — dehydration, tachycardia and tachypnoea. **Stage 3 (12–24 h in CATS and 36–72 h in DOGS):** severe AKI, severe anorexia, lethargy, hypersalivation, uremic halitosis, coma, depression, vomiting and seizures |
| Clin path | **High osmolal gap** seen as early as 1 hour post ingestion. **High anion gap and normochloremic acidosis w/in 3 hours.** Chemistry changes: low iCa²⁺, hypoglycaemia, hyperphosphataemia, azotaemia. **Calcium monohydrate crystals in urine** may present as early as 3–6 hours from ingestion and is considered "diagnostic" |
| Tox test | EG or metabolites are only accurate **within 24 h of ingestion**. **Cats can have false negative results.** Rare false positives for EG with propylene glycol, sorbitol, mannitol, alcohol, etc. **Wood's lamp** on vomitus, paws, mouth as many products will fluoresce |
| Treatment | **Fomepizole (4-MP antidote)** is the therapy of choice in which EG ingestion is suggested, and data supports use of **higher doses of fomepizole in cats suspected of ingestion**. See dosing table below |
| Prognosis | **Excellent** — dogs treated by **5 hours** following ingestion. **Good** — cats treated by **3 hours** following ingestion. **Grave** without haemodialysis — azotaemic patients. Minimum lethal dose of undiluted EG is **4.2–6.6 mL/kg in the dog** and **1.5 mL/kg in the cat**. **DOGS: 4.4 mL/kg → AKI. CATS: 1.4 mL/kg → AKI** |

**Fomepizole dosing (p. 33 table, consistent with p. 26):**

| Species | Dose |
|---|---|
| **Dogs** | 4-MP **20 mg/kg IV** 1st dose; **15 mg/kg at 12 h**; **15 mg/kg at 24 h**; **5 mg/kg at 36 h** |
| **Cats** | 4-MP **125 mg/kg IV** 1st dose; **31.25 mg/kg at 12 h**; **31.25 mg/kg at 24 h**; **31.25 mg/kg at 36 h** |

**7% ethanol solution if 4-MP unavailable (p. 33):** remove 175 mL from 1 L bag of saline and add
175 mL of 80-proof vodka **OR** remove 74 mL from 1 L bag of saline and add 74 mL of 190-proof grain
alcohol — use only "clear" alcohols. **Loading dose 8.6 mL/kg (600 mg/kg) 7% ethanol slowly IV,
follow with CRI of 1.43 mL/kg/hr (100 mg/kg/hr) IV for 24–36 h.**

> ClinIQ: `DIS-TOX-EG` has only **1** reference in `src/data/db.ts`. The three-stage timeline, the
> species-split Stage 3 window (12–24 h cats vs 36–72 h dogs), and the osmolal/anion gap timing are
> all **high-value enrichment**.

## NSAIDs (pp. 34–35)

**Header note:** *"Cats and certain dog breeds (e.g. German Shepherds anecdotally) are more sensitive
and need to be treated aggressively. With cats, severe AKI is more commonly seen clinically and with
dogs, GI signs secondary to GI ulceration (vomiting, diarrhea, melena, hematemesis, etc.) is more
commonly seen initially, followed by secondary AKI."*

**Shared clinical signs:** anorexia, vomiting, hematemesis, diarrhoea, melena, abdominal pain,
lethargy, malaise, uremic halitosis, GI ulceration, dehydration, renal effects, CNS effects.
**Shared clin path:** anaemia, azotaemia; liver changes possible based on dose and type of NSAID.
**Tox test:** N/A.

| NSAID | Mechanism | Treatment | Dog doses | Cat doses |
|---|---|---|---|---|
| **Ibuprofen** (Advil®, Bufren®, certain types of Motrin®) | Competitive inhibition of prostaglandin (PG) synthesis → mostly GI and AKI | GI decontamination; **AC — multiple doses**; IV fluid therapy for diuresis; **GI protectants 7–10 days**. Chemistry — baseline, then as needed up to 48 h | **16–50 mg/kg** — GI signs; **50–100 mg/kg** — severe GI signs; **100–250 mg/kg** — GI and renal; **>300 mg/kg** — fatalities; **>400 mg/kg** — CNS signs (coma, ataxia, seizures) | **>5 mg/kg** — GI signs; **>20 mg/kg** — renal; **>200 mg/kg** — CNS signs |
| **Carprofen** (Rimadyl®) | Competitive inhibition of PG synthesis → mostly GI and renal effects; **reported liver effects as well** | GI decontamination; AC — multiple doses; IV fluid therapy for diuresis; GI protectants 7–10 days. Chemistry — baseline, then as needed up to 48 h | **Any dose** → vomiting; **>20 mg/kg** → GI signs; **>40 mg/kg** → renal | **>4.4 mg/kg** |
| **Deracoxib** (Deramaxx®) | Competitive inhibition of PG synthesis → mostly GI and renal effects | **Emesis and activated charcoal × 1** (binds well to charcoal); IV fluid therapy for diuresis; GI protectants 7–10 days. Chemistry — baseline, then as needed up to 48 h | **>15 mg/kg** → GI issues; **>30 mg/kg** → potential renal | — |
| **Firocoxib** (Previcox®) | Competitive inhibition of PG synthesis → mostly GI and renal effects | **Tablets rapidly dissolve, emesis may not be helpful unless ingestion was very recent.** Single dose of activated charcoal; IV fluid therapy for diuresis; GI protectants 7–10 days. Chemistry — baseline, then as needed up to 48 h | **>25 mg/kg** → vomiting, GI ulcers; **>50 mg/kg** → renal | — |
| **Naproxen sodium** (Aleve®, certain types of Motrin®, Buproxen®, Naprofex®) | Competitive inhibition of PG synthesis → mostly GI and renal effects | Decontaminate; **activated charcoal — multiple doses**. **T½ (dog) is 74 hours**, as the drug undergoes extensive enterohepatic recirculation — due to the prolonged half-life, **fluids need to be continued for at least 72 hours**. GI protectants for 7–14 days. **Recommend monitoring electrolytes, especially sodium** | **>5 mg/kg/day for 7 days** → ulcerative gastritis; **>10–25 mg/kg** → renal | — |

> ClinIQ: ✗ **missing entirely** — no `DIS-TOX-NSAID` entry. These are precise, species-split,
> dose-banded thresholds and are among the most commonly needed in practice. **High-priority addition.**

## Grapes and raisins (p. 36)

| Field | Content |
|---|---|
| Source | ***Vitis* spp. — NOT grapeseed extract** |
| Mechanism | Toxicant is **suspected to be due to tartaric acid**. Dogs are more sensitive as they do not excrete organic acids well |
| Clinical signs | Vomiting, inappetence, diarrhoea, lethargy, anorexia, abdominal pain, uremic breath, and **subsequent oliguria and anuria (48–72 h post-ingestion)** |
| Clin path | Changes consistent with AKI: **hypercalcaemia and hyperphosphataemia initially**; azotaemia may develop in 24 h |
| Tox test | N/A |
| Treatment | Aggressive GI decontamination: **emesis induction (even delayed several hours post-ingestion)**, single dose of activated charcoal. **Aggressive IV fluid therapy for up to 72 h post ingestion.** Anti-emetics. **BP and UOP monitoring.** Serial BW monitoring (q 12–24 h). Asymptomatic patients: monitor BW q 24 h, then **48–72 h post-ingestion**. **Haemodialysis or peritoneal dialysis in severe cases** |
| Prognosis | **Excellent** — no signs of AKI. **Fair to poor** — with AKI |

> ClinIQ: ✗ missing. Note the **tartaric acid** mechanism — this is the modern (2021+) understanding
> and supersedes "unknown toxin" phrasing found in older references. Cross-link to `DIS-REN-*`.

## True lilies (p. 36)

| Field | Content |
|---|---|
| Source | ***Lilium* spp.** (Easter lily, stargazer lily, tiger lily and other Asiatic hybrid lilies); ***Hemerocallis* spp.** (some species of day lilies). **Peace, Peruvian, Calla lilies, lily of the valley are NOT "true" lilies and are therefore not nephrotoxic** |
| Mechanism | **CATS only.** Ingestion of leaves, petals, pollen or **vase water** |
| Clinical signs | Vomiting, depression, anorexia. **Anuric AKI in 1–3 d** |
| Clin path | **Severe azotaemia.** Urinalysis: epithelial casts (**12–18 h post ingestion**), proteinuria, glucosuria |
| Tox test | N/A |
| Treatment | Aggressive decontamination: emesis, **activated charcoal × 1**. GI support: anti-emetics, **H₂ blockers or proton pump inhibitors if azotemic**. IV fluid therapy. **Clin path monitoring q 24 h × 2–3 d. UOP monitoring for 48 h. Haemodialysis if anuric.** Symptomatic & supportive care |
| Prognosis | **Fair to good, if tx is early and aggressive. Grave, if anuric or oliguric kidney injury** |

> ClinIQ: ✗ missing. The **"not a true lily"** exclusion list is the single most useful triage fact
> here and belongs in any lily entry. Cross-link to `DIS-REN-*` (feline AKI).

---

# Hepatotoxicant Table (pp. 38–43)

VETgirl / ASPCA Animal Poison Control Center. Same column structure as the nephrotoxicant table.

**Abbreviations (p. 43):** AKI: acute kidney injury; CNS: central nervous system;
DIC: disseminated intravascular coagulation; GI: gastrointestinal; LD: lethal dose;
LES: liver enzymes; NAC: N-acetylcysteine; PT: prothrombin; PTT: partial thromboplastin time.

## Mothballs (p. 38)

| Field | Content |
|---|---|
| Source | **Paradichlorobenzene (PDB)** — *NOTE: make sure to differentiate from naphthalene* |
| Mechanism | Organochlorine insecticide |
| Clinical signs | Vomiting, abdominal pain, tremors, seizures, and liver and kidney damage |
| Clin path | Haemolytic anaemia, haemolysis, **methemoglobinaemia (rare in dogs and cats; reported in humans)** |
| Treatment | Prompt GI decontamination; fluid administration to induce diuresis; symptomatic response to adverse signs; supportive care of vital functions; **seizure control with parenteral benzodiazepines** |
| Prognosis | Organochlorine insecticide with an **LD₅₀ of approximately 500 mg/kg** |

## NSAIDs — hepatic (p. 38)

| Field | Content |
|---|---|
| Source | Human NSAIDs; veterinary NSAIDs |
| Mechanism | Inhibit PG synthesis → mostly GI and renal effects; **reported liver effects as well (chronic)** |
| Clinical signs | **DOG DOSES: >20 mg/kg** — vomiting, GI ulcers; **>40 mg/kg** — renal toxicity. **Idiosyncratic liver toxicity (1.4 cases out of 10,000)** |
| Clin path | **↑↑ ALT.** GI and AKI related findings: anaemia, hypoproteinemia, azotaemia, hyperphosphataemia, etc. |
| Treatment | Immediate discontinuation; treatment for hepatic failure; **hepatoprotectants (SAMe or NAC)** |
| Prognosis | Hepatotoxicity, when observed, typically develops with **chronic dosing** (e.g. 5–30 days of chronic use; **median 19 days**) |

## Acetaminophen (APAP) (p. 38)

| Field | Content |
|---|---|
| Source | Analgesic and antipyretic derived from paracetamol. *(Note: Not an NSAID)* |
| Mechanism | **Metabolised to NAPQI**, binds to macromolecules and causes **lipid peroxidation of membranes**; induces direct cell injury and death leading to **hepatic necrosis**. **Oxidative damage in cats, resulting in metHb, Heinz body formation** |
| Clinical signs | **DOG:** GI signs, CNS depression, hepatotoxicity (icterus, coagulopathy); metHb can occur but not as common as cats at **higher doses** (cyanosis, dyspnoea). **CAT:** respiratory distress, hypoxemia, cyanosis, **oedema of face and paws** |
| Clin path | **↑↑ LES** (**AST thought to be most sensitive**). MetHb, Heinz bodies, **chocolate-brown appearance to blood** |
| Tox test | Plasma, urine or tissue |
| Treatment | **NAC** replenishes glutathione, provides sulfur and will directly bind NAPQI. Others: **vitamin C, SAMe, IV fluids**. **Methylene blue has been described, but not recommended, especially in the cat (due to Heinz body formation)** |
| Prognosis | **DOGS: 100 mg/kg** hepatotoxicity; **200 mg/kg** methemoglobinaemia. **CATS/FERRETS: 10 mg/kg** methemoglobinaemia. **KCS can occur in dogs after even therapeutic doses** |

> ClinIQ: `DIS-TOX-APAP` exists (4 refs). **Enrichment target** — the species-split dose thresholds
> (dog 100/200 mg/kg vs cat 10 mg/kg), the AST-most-sensitive note, and the **KCS-after-therapeutic-dose**
> pearl are all worth carrying. The methylene blue caution is a safety-relevant negative recommendation.

## Xylitol — hepatic (p. 39)

| Field | Content |
|---|---|
| Source | Sweetener in sugar-free products, such as chewing gum and baking products |
| Mechanism | **Induces hypoglycaemia by stimulating insulin secretion from the pancreas of dogs.** Hepatic necrosis thought to be from **decreased ATP production** (xylitol uses pentose phosphate pathway instead of TCA [Kreb's] cycle) |
| Clinical signs | Clinical signs develop in as short a time as **30 to 60 minutes**. Weakness, ataxia, collapse, and seizures from hypoglycaemia may last **12 to 24 hours**, perhaps caused by the slow xylitol release from the ingested formulations and its absorption. **Liver injury (within 24 hours)**, including signs of melena, hepatic encephalopathy, haemorrhage |
| Clin path | Hypoglycaemia; **↑↑ LES, DIC, coagulopathy** |
| Treatment | Stat BG and treatment for hypoglycaemia; **emesis if recent ingestion and asymptomatic and normoglycemic**. **Activated charcoal not indicated.** Fluid support and glucose support (dextrose can correct hypoglycaemia and is liver supportive by providing ATP) **even in the face of euglycemia**. Response from clinical effects is usually rapid and within **12 to 24 hrs**. **Recheck liver values at 24 and 48 hrs** to evaluate for liver involvement. **SAMe for 1–2 weeks if hepatotoxic dose ingested** |
| Prognosis | **>0.1 g/kg → hypoglycaemia; >0.5 g/kg → acute hepatic necrosis** |

> Note the unit change: the table expresses the thresholds as **0.1 g/kg and 0.5 g/kg**, identical to
> the **100 mg/kg and 500 mg/kg** given on p. 20. Keep one unit convention in ClinIQ (suggest mg/kg).

## Metaldehyde (p. 40)

| Field | Content |
|---|---|
| Source | Known as a **molluscicide**, used for the control of slugs and snails (although recently replaced by less toxic **iron phosphate**) |
| Mechanism | Results in the **disruption of the GABAergic system**. Monoamine oxidase, 5-hydroxytryptamine, and norepinephrine may also be involved in the toxic mechanism |
| Clinical signs | May be seen as soon as **30 minutes** after ingestion but typically occur within **3 to 5 hours**. GI (vomiting, diarrhoea) and CNS (hyperesthesia, incoordination, hyperthermia, seizures). **Liver damage and cirrhosis may occur 2–3 days after exposure.** Death from respiratory failure may occur within **4–24 hours** after exposure |
| Clin path | Acidosis, liver value abnormalities |
| Tox test | **Characteristic odor of formaldehyde** may be present in the stomach contents along with bait material. No consistent and pathognomonic gross or histological lesions occur in metaldehyde poisoned animals |
| Treatment | Decontamination, if appropriate. **Gastric lavage with inflated ETT** should be performed if the patient is symptomatic and evidence of pellets still in stomach on radiograph; administration of **1 dose of charcoal if gastric lavage performed**. Stabilization of vital signs, IV fluids, anti-emetics, acid-base monitoring, **methocarbamol/anticonvulsant therapy**, respiratory and CV system monitoring, supportive care |
| Prognosis | **Acute median LD values are 210–600 mg/kg for dogs and 207 mg/kg for cats.** Prognosis is good if **survival is > 24 hours** from ingestion with early treatment |

> ClinIQ: `DIS-TOX-METALD` is the **most-referenced** tox entry in `src/data/db.ts` (9 refs). The
> **delayed hepatic injury at 2–3 days** is a notable addition — existing entries focus on the acute
> tremorgenic picture.

## Copper (p. 40)

| Field | Content |
|---|---|
| Source | Coins, feeds, solutions, wire, jewellery, food |
| Mechanism | **Breeds that are homozygous for a recessive gene** (**Bedlington Terrier, Skye Terrier, West Highland White Terriers, Labrador Retrievers, Doberman Pinschers**) have **excessive copper storage in the liver** |
| Clinical signs | Lethargy, anorexia, vomiting, weight loss, jaundice |
| Clin path | *(blank in source)* |
| Tox test | **Quantitative hepatic copper values; genetic testing (some breeds)** |
| Treatment | **Chelation with penicillamine or trientine.** Supportive care for other derangements |
| Prognosis | **Increasing zinc in diet can aid in prevention** |

## Benzodiazepines (oral) (p. 40)

| Field | Content |
|---|---|
| Source | **Oral diazepam (Valium) and alprazolam in CATS** (not seen with parenteral administration); typically seen with **chronic oral dosing** |
| Mechanism | **Acute hepatic necrosis in 5–11 days of oral treatment** |
| Clinical signs | Sedation, malaise, ataxia, jaundice |
| Clin path | **Markedly increased ALT; increased T-bili, PT/PTT** |
| Tox test | *(blank in source)* |
| Treatment | *(blank in source)* |
| Prognosis | *(blank in source)* |

> ClinIQ: ✗ missing, and clinically important — this is an **iatrogenic** toxicity from a commonly
> prescribed drug, feline-specific, with a 5–11 day latency. Strong candidate.

## Amatoxin mushrooms (p. 40)

| Field | Content |
|---|---|
| Source | ***Amanita* spp., *Galerina* spp., *Conocybe* spp., *Lepiota* spp.** |
| Mechanism | **Inhibit DNA and RNA transcription and protein synthesis**; bind to actin filaments, deform cytoskeleton → hepatocyte death |
| Clinical signs | Develop **GI signs within 6–24 hours**. **"False" recovery period**, followed by **fulminant liver failure and AKI in 36–48 hours** |
| Clin path | **↑↑ liver enzymes within 48–72 h** |
| Tox test | Centrilobular haemorrhagic necrosis |
| Treatment | Decontamination (**emesis and AC if < 2 h post ingestion**). IV fluids; **sequester amatoxin bile in gallbladder with octreotide (CRI, NPO)**; **ultrasound-guided bile aspiration** |
| Prognosis | **Alpha amanitin LD₅₀ (human) = 0.1 mg/kg.** Easily found in one mushroom |

> ClinIQ: `DIS-TOX-MYCO` exists (8 refs) — confirm whether it covers **amatoxin mushrooms** or only
> tremorgenic mycotoxins (penitrem A/roquefortine). If the latter, amatoxin is a separate entry.
> The **biphasic "false recovery"** pattern is the key teaching point.

## Blue-green algae (p. 40)

| Field | Content |
|---|---|
| Source | **Cyanobacteria.** Hepatotoxins: ***Microcystis* spp., *Nodularia* spp., *Oscillatoria* spp.** most common; ***Anabaena* spp.** less often. **Can also contain neurotoxins** |
| Mechanism | **Microcystin binds to protein phosphatase in cytoskeleton**, disorganisation of actin filaments leads to cellular collapse, intrahepatic haemorrhage, death |
| Clinical signs | **Death in hours to days** with hepatotoxins. GI (vomiting/diarrhoea), CNS (weakness, ataxia, tremors, seizures), cardiac (collapse, pallor, tachycardia, respiratory failure), haemorrhagic and hypovolemic shock. **Very acute clinical signs with neurotoxins (death can occur in minutes to hours)** — CNS signs and **SLUDGE-like signs** |
| Clin path | **↑↑ liver enzymes within a few to 24 h**; elevated PT/PTT; anaemia |
| Tox test | Diffuse hepatic necrosis |
| Treatment | **Decontamination is often too late** — gastric lavage ± activated charcoal, **bathe (use protective gear)**; PCV/TS/BG; baseline chem, CBC, PT/PTT |
| Prognosis | **Toxic dose: 50–11,000 mcg/kg.** Prognosis often grave |

> ClinIQ: ✗ missing. Cross-links to **cholestyramine** (p. 16 lists microcystins as an indication)
> and **SAMe** (p. 29 lists blue-green algae as a use case).

## Sago palm (p. 42)

| Field | Content |
|---|---|
| Source | **Cycads (*Cycas* spp., *Macrozamia* spp.)** — SE, South central or tropical areas of US usually, but **can be found as a bonsai household plant** |
| Mechanism | **All parts of the plant are poisonous, but seeds contain the largest amount of toxin** |
| Clinical signs | **GI signs (vomiting, diarrhoea) within 15 minutes to several hours**; **CNS signs (lethargy, seizures) 48–72 hours**; **liver failure 24–72 hours** |
| Clin path | **↑↑ liver enzymes (24–72 h)** |
| Tox test | **Centrilobular and mid-zonal coagulative hepatic necrosis** |
| Treatment | Baseline bloodwork, PT/PTT; **PCV/TS/BG/liver panel q 24 hours × 2–3 days** |
| Prognosis | **1–2 seeds can lead to severe signs.** Grave prognosis once hepatotoxicity seen |

> ClinIQ: ✗ missing. Also referenced on p. 16 as a **cholestyramine** indication. Note the bonsai
> household-plant route — sago palm is not only a warm-climate outdoor exposure.

## Iron (p. 42)

| Field | Content |
|---|---|
| Source | **Multivitamins, iron supplements, fertilizers, snail/slug bait** |
| Mechanism | When **serum iron exceeds the binding capacity of transferrin and ferritin, free iron causes lipid peroxidation and damage to liver, heart and brain**. Iron is also **caustic to the GI mucosa** |
| Clinical signs | **GI signs (vomiting, hematemesis, melena, diarrhoea) within 0.5–6 hours; liver failure 12–24 hours later.** With large doses can see **hypovolemic shock, coagulopathy and acidosis** |
| Clin path | **↑↑ liver enzymes; elevated PT/PTT if liver necrosis** |
| Tox test | **Serum iron levels; chelation warranted if iron > 400 mcg/dL** |
| Treatment | **MgOH can be given while iron is still in the GI tract.** Emesis if appropriate; **activated charcoal does not bind and should not be used**. Other treatment includes antiemetics, GI protectants/antacids, hepatoprotectants, **deferoxamine (chelator)**, supportive care, blood work monitoring |
| Prognosis | **Toxicity dependent on amount of elemental iron: 20–50 mg/kg → GI signs; 50–80 mg/kg → GI ulcers; > 80 mg/kg → liver and other systemic effects** |

> ClinIQ: ✗ missing. Note the **"AC does not bind iron"** point — consistent with the heavy-metal
> exclusion on p. 10.

## Aflatoxins (p. 42)

| Field | Content |
|---|---|
| Source | **Mycotoxin (mould) found in corn, peanuts, cottonseed, rice and potatoes** |
| Mechanism | **Metabolised into reactive epoxide, binds to hepatocytes.** Large acute exposures = hepatic necrosis; smaller chronic exposures = **neoplasia** |
| Clinical signs | Vomiting, anorexia, lethargy, icterus, coagulopathy |
| Clin path | **↑↑ liver enzymes; elevated PT/PTT** |
| Tox test | Acute — diffuse hepatic necrosis. Chronic — fatty liver |
| Treatment | Fluid therapy, anti-emetics, **blood work monitoring**, hepatoprotectants, symptomatic and supportive care |
| Prognosis | *(blank in source)* |

## Aspirin (p. 42)

| Field | Content |
|---|---|
| Source | Pain medication |
| Mechanism | **Hepatotoxicity thought to be from inhibition of mitochondrial function** |
| Clinical signs | GI (e.g. anorexia, vomiting, melena, stomach ulcers), lethargy, icterus |
| Clin path | ↑↑ liver enzymes |
| Tox test | Centrilobular hepatic necrosis |
| Treatment | Fluids, anti-emetics, antacids, gastroprotectants, hepatoprotectants |
| Prognosis | **Dogs: > 400 mg/kg for liver effects** |

## Lectins (toxalbumins) (p. 42)

| Field | Content |
|---|---|
| Source | **Castor bean (*Ricinus communis*), Precatory bean (*Abrus precatorius*), Black locust (*Robinia* spp.), Mistletoe (*Phoradendron*)** |
| Mechanism | **Stops cellular protein synthesis in multiple organs** |
| Clinical signs | GI (e.g. anorexia, vomiting), lethargy, anorexia, icterus, weakness, tremors, death |
| Clin path | ↑↑ liver enzymes |
| Treatment | Fluids, anti-emetics, symptomatic and supportive, hepatoprotectants |
| Prognosis | **All parts of plants are toxic. Seeds are the most toxic part of *Ricinus* and *Abrus*. Seeds must be chewed to release the toxin** |

## Essential oils (p. 42)

| Field | Content |
|---|---|
| Source | **Pennyroyal oil, melaleuca (tea tree) oil** |
| Mechanism | Unknown |
| Clinical signs | Vomiting, lethargy, ataxia, hind limb weakness, icterus |
| Clin path | ↑↑ liver enzymes |
| Treatment | **Symptomatic and supportive** (fluids, hepatoprotectants) |
| Prognosis | **Usually associated with application of 100% oil to an open wound, ear canal, or oral ingestion** |

## Veterinary drugs associated with hepatotoxicity — albeit rare (p. 42)

**Listed agents:** **isoniazid, ketoconazole, lomustine, methimazole, melarsomine, mitotane,
sulfonamides, trazodone, zonisamide.**

**Treatment:** discontinuation of drug; hepatoprotectants; symptomatic supportive care.
*(Clin path, tox test and prognosis cells are blank in the source.)*

> ClinIQ: this row is a useful **iatrogenic hepatotoxicity** checklist. Several of these
> (azathioprine, methimazole) already appear in `references/ettinger9-notes.md` — cross-reference
> rather than duplicate.

---

# Extraction gaps

The source is a DRM-protected FlippingBook publication; page text is not selectable via script
(the text layer is lazily populated only on a real ⌘-hold), so this extraction was done by reading
the rendered pages. **All 44 pages were eventually read at full render resolution**, including the
nephrotoxicant and hepatotoxicant tables, which required a second pass.

**Remaining gap — one item:**

| Location | What is missing |
|---|---|
| p. 25 | Antivenin **product and manufacturer names**, set in graphic boxes that never rendered above thumbnail resolution. The surrounding prose is captured: there are **three ASPCA-approved** antivenins against North American pit vipers and **two FDA-approved** products |

**To close it:** open the flipbook, click **⬇ Download → Full Flipbook (52.2 MB PDF)**, then:

```bash
pdftotext -f 25 -l 25 -layout ~/Downloads/publication.pdf -
```

Note: the in-app browser cannot write that download to disk — it must be clicked from a normal
browser. `curl` on the download endpoint returns the SPA shell, not the PDF.

**Corrections applied on the second pass** (the first-pass readings were wrong — do not resurrect
them from git history):

| Field | First-pass (wrong) | Confirmed |
|---|---|---|
| Sago palm, prognosis | "5.2 seeds" | **1–2 seeds can lead to severe signs** |
| Iron, tox test | chelate if > 600 mcg/dL | **chelation warranted if iron > 400 mcg/dL** |
| Iron, prognosis | 20–60 / 60 / >180 mg/kg | **20–50 / 50–80 / > 80 mg/kg** |
| Blue-green algae, toxic dose | "50.5 (500) mg/kg" | **50–11,000 mcg/kg** |
| p. 42 row 5 | "Lantana" | **Lectins (toxalbumins)** — castor bean, precatory bean, black locust, mistletoe |
| Vet drug list | lomustine, carprofen, methimazole, ketoconazole, mitotane, azathioprine, sulfonamides, mebendazole | **isoniazid, ketoconazole, lomustine, methimazole, melarsomine, mitotane, sulfonamides, trazodone, zonisamide** |

---

# ClinIQ gap summary

## ✗ Missing — no `DIS-TOX-*` entry exists (ranked by clinical priority)

| Toxicant | Suggested id | Why it matters |
|---|---|---|
| **Xylitol** | `DIS-TOX-XYL` | Common, dose-defined (100 / 500 mg/kg), time-critical, clean two-phase sign flow. Appears only as free text today |
| **NSAIDs** | `DIS-TOX-NSAID` | Precise species-split dose bands for 5 agents; both GI and renal endpoints |
| **True lilies** | `DIS-TOX-LILY` | Top-tier feline AKI differential; the "not a true lily" exclusion list is high-value triage |
| **Grapes / raisins** | `DIS-TOX-GRAPE` | Tartaric acid mechanism supersedes older "unknown toxin" text |
| **Sago palm** | `DIS-TOX-SAGO` | Grave prognosis; bonsai household route often missed |
| **Iron** | `DIS-TOX-FE` | AC does not bind; deferoxamine chelation threshold (>600 mcg/dL) |
| **Amatoxin mushrooms** | `DIS-TOX-AMATOX` | Biphasic "false recovery" — a classic diagnostic trap. Check overlap with `DIS-TOX-MYCO` first |
| **Blue-green algae** | `DIS-TOX-BGA` | Minutes-to-hours death with neurotoxins; cholestyramine + SAMe indications |
| **Oral benzodiazepines (cats)** | `DIS-TOX-BZD` | Iatrogenic, feline-specific, 5–11 day latency |
| **Copper storage** | `DIS-TOX-CU` | Breed-linked (Bedlington, Skye, WHWT, Labrador, Doberman) |
| **Plant cardiotoxins** | `DIS-TOX-CARDGLY` | *Rhododendron/Kalmia*, *Helleborus*, *Convallaria*; links to Digibind dosing |
| **Brunfelsia** | `DIS-TOX-BRUNF` | Weeks-long tremor tail; regionally common |
| **Ornamental bulbs / Wisteria** | `DIS-TOX-BULB` | High-volume seasonal GI calls; FBO risk |
| **Mothballs (PDB)** | `DIS-TOX-PDB` | Naphthalene differentiation is the key point |

## ✓ Covered — enrichment targets

| Existing id | Refs | Enrichment from this source |
|---|---|---|
| `DIS-TOX-EG` | 1 | Three-stage timeline; species-split Stage 3 window; osmolal/anion gap timing; full fomepizole + 7% ethanol dosing (pp. 26, 33) |
| `DIS-TOX-CHOLE` | 3 | Calcipotriene cream source; PTH/25(OH)D₃ panel; cholestyramine dose; bisphosphonate/calcitonin ladder (pp. 17, 28, 32) |
| `DIS-TOX-APAP` | 4 | Dog 100/200 mg/kg vs cat 10 mg/kg; AST most sensitive; methylene blue caution; KCS after therapeutic dose (p. 38) |
| `DIS-TOX-METALD` | 9 | **Delayed hepatic injury / cirrhosis at 2–3 days** (p. 40) — not in the acute tremorgenic picture |
| `DIS-TOX-MYCO` | 8 | Confirm scope vs amatoxin mushrooms; aflatoxin acute-vs-chronic split (p. 42) |
| `DIS-TOX-ZN`, `DIS-TOX-LEAD` | 8, 3 | **AC does not bind heavy metals** (p. 10) — treatment fields should say so explicitly |

## Candidate new screens

1. **Activated charcoal decision flow** (p. 11) — maps directly onto the existing sign-flow component
   model; the single most reusable asset in this source.
2. **Antidote reference view** (pp. 24–30) — chemical / functional / pharmacological grouping with
   doses; complements `ettinger9-notes.md` §VIII Pharmacology.
3. **Nephrotoxicant / hepatotoxicant tables** (pp. 32–43) — already in a column structure close to
   ClinIQ's Dx view fields (signs / clin path / tox test / treatment / prognosis).
