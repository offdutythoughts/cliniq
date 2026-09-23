@AGENTS.md

## Clinical Reference PDFs

| File | Contents | Status |
|---|---|---|
| `references/vetoph6.pdf` | Veterinary Ophthalmology 6th edn, Gelatt et al. 2021 (2,744 pp) | Local only — gitignored |
| `references/vetoph6-notes.md` | Extracted clinical tables + protocols from the above | Committed to repo |
| `references/ettinger9.md` | *Ettinger's Textbook of Veterinary Internal Medicine*, 9th edn, Côté et al. 2024 — full-text md conversion, both volumes, 331 chapters, 41k lines | Local only — gitignored |
| `references/ettinger9-index.md` | Chapter → line-number index for the above, plus its conversion defects and the ClinIQ section mapping | Committed to repo |
| `references/ettinger9-notes.md` | Clinical extraction (differentials, criteria, staging, doses) — tagged inline with `> ClinIQ:` | Committed to repo |
| `references/ettinger9-gap-analysis.md` | Gap summary: ClinIQ vs Ettinger (covered / missing / enrich) | Committed to repo |
| *(no local file)* | *The Ultimate Guide to Toxicology eBook*, VETgirl / ASPCA APCC 2023 (44 pp) — password-protected FlippingBook, not redistributable | Not in repo |
| `references/vetgirl-tox-notes.md` | Toxicology extraction from the above (toxic doses, decon decisions, antidote doses, nephro-/hepatotoxicant tables) — tagged inline with `> ClinIQ:` | Committed to repo |
| `references/vettox3.md` | *Veterinary Toxicology: Basic and Clinical Principles*, 3rd edn, Gupta 2018 — full-text md conversion, 82 chapters, 159k lines | Local only — gitignored |
| `references/vettox3-index.md` | Chapter → line-number index for the above, plus scope split vs the VETgirl notes | Committed to repo |
| `references/vetdent4.md` | *Veterinary Dentistry: A Team Approach*, 4th edn, Lemmons et al. 2025 — full-text md conversion, 15 chapters, 24k lines | Local only — gitignored |
| `references/vetdent4-index.md` | Chapter → line-number index for the above, plus ClinIQ dental gap list | Committed to repo |
| `references/saccm2.pdf` | *Small Animal Critical Care Medicine*, **2nd** edn, Silverstein & Hopper, Saunders 2015 — mislabelled "3rd edn 2023" by its filename | Local only — gitignored |
| `references/CITATIONS.md` | AMA 11th ed. citation strings for every reference above | Committed to repo |

When working on ophthalmic signs (`redEye`, `blindEye`, `wetEye`, `abnormalPupil`) or any
entry in `src/data/db.ts` with id `DIS-OPH-*`, `DIS-EYE-*`, `LES-RE-*`, `LES-BL-*`,
`LES-WE-*`, or `LES-AP-*` — read `references/vetoph6-notes.md` first for breed tables,
STT thresholds, drug doses, and localization criteria.

When working on cardiac, renal, endocrine, GI, hepatobiliary, haematologic, infectious,
respiratory, neurologic, urinary, or oncology entries (`DIS-CARD-*`, `DIS-SEC-*`, `DIS-REN-*`,
`DIS-ENDO-*`, `DIS-GI-*`, `DIS-HEP-*`, `DIS-BD-*`, `DIS-INFECT-*`, `DIS-RESP-*`, `DIS-NEU-*`,
`DIS-URO-*`, `DIS-NEO-*`, and their sign flows/Dx views) — read `references/ettinger9-notes.md`
first for differential lists, diagnostic criteria, staging/grading, lab thresholds, and drug
doses. **Use SDMA in µg/dL** (the IRIS table prints ng/dL — the typo is the textbook's own, and
the notes reproduce it faithfully); keep dog vs cat doses distinct and verify every dose against
a current formulary before shipping.

Where the notes are silent, thin, or need checking at source, the full text is now on disk:
open the chapter range from `references/ettinger9-index.md` into `references/ettinger9.md`.
The notes skip §I, §V interventional, §IX nutrition and most technique chapters entirely, so
those are full-text-only. **Read the index's conversion-defect section before quoting the full
text** — two-column body prose is interleaved mid-sentence there, which is a sharper hazard
than the flattened tables in the other `.md` conversions.

When working on any `DIS-TOX-*` entry, a poisoning/toxidrome sign flow, or a decontamination or
antidote protocol — read `references/vetgirl-tox-notes.md` first. It carries species-split toxic
dose thresholds, activated-charcoal indications and contraindications, antidote doses (fomepizole,
7% ethanol, NAC, Digibind, cholestyramine), and the ASPCA nephrotoxicant / hepatotoxicant tables.
It also lists the 14 toxicants with **no** `DIS-TOX-*` entry today (xylitol, NSAIDs, lilies,
grapes/raisins, sago palm, iron, and others) — see its **ClinIQ gap summary** section.
For mechanism, toxicokinetics, target-organ pathophysiology, or any toxicant VETgirl does not
cover (plants, mycotoxins, zootoxins, metals, industrial agents), fall back to
`references/vettox3.md` via `references/vettox3-index.md`. Where the two disagree on a dose,
**VETgirl/APCC wins** — it is small-animal specific and five years newer.

When working on any `DIS-DENT-*` entry, an oral/dental sign flow, or a dental procedure —
read `references/vetdent4-index.md` and open the relevant chapter range of
`references/vetdent4.md`. It carries AVDC nomenclature and case-log abbreviations,
periodontal staging PD 0–4, feline TR type 1/2/3, malocclusion classes, endodontic decision
criteria, and regional nerve blocks. Six `DIS-DENT-*` entries exist today; the index lists
the uncovered areas (TR, malocclusion, endodontics, exotic dental).

## Citing references

Any citation of these works — in docs, in app copy, or in entry text — uses the AMA 11th ed.
strings in `references/CITATIONS.md`. Do not compose a citation from a filename or from
memory; several filenames in `references/` carry wrong or unverifiable metadata. Entries in
that file marked **Unverified** must have their title page checked before the citation is
published anywhere.

### Rules for citing papers

These are hard rules, not preferences. They apply to every paper cited anywhere in this
repo — disease pages, sign flows, Dx views, docs.

**1. Every paper must clear three bars.**

- **(a) Peer-reviewed.** No preprints, no conference abstracts, no textbook claim dressed up
  as a paper. One legacy exception exists and is flagged where it appears (the Miceli
  ECVIM-CA presentation on the feline-HAC page); do not add more.
- **(b) Sample large enough for the specific claim being made.** A single case report cannot
  carry a general statement. A ten-animal pilot cannot carry an efficacy claim.
- **(c) As current as the literature allows.** Prefer the newest adequately powered study.
  Where a recent larger series disagrees with an older classic, **the recent one wins and the
  page says so** — as with Černá 2024 (60 cats) against the older FGESF case series, and
  Green 2011 against de Papp 1999 on the GDV lactate threshold.

**2. Hedge on the page when the sample cannot carry the claim.**

Write **"Some clinicians reported…"**, or state the sample size inline ("in a 21-dog series",
"a 10-dog pilot, underpowered for outcome", "all 9 cats of a small prospective series").
Never state an n=1 finding as established fact behind a bare superscript.

The reason is the superscript itself: it reads as authority. A confident sentence backed by
one animal misleads a clinician at the point of care *more* than no citation would, because
the number signals that somebody checked. State the sample size inline whenever it is small
and load-bearing — under roughly 30 animals.

**3. Read the abstract before you write the claim.**

Never cite from a bibliographic record alone. Two claims in this repo have been attributed to
papers that said something else, both because a plausible sentence got the nearest citation
attached rather than the one that supports it:

- `DIS-GI-PYL` had Bellenger 1990 recommending against pyloromyotomy; the paper concludes the
  opposite.
- `DIS-PUPD-NDI` credited the aquaporin-2 mechanism to Ku 2023, a case report that does not
  mention it; it is Li 2021, and that is a human variant in canine cells.

Both are written up in `references/CITATIONS.md`. Crossref records carry no abstract, which
is why **PubMed is the default discovery tool** — see that file's connector notes.

**4. Every disease page must cite at least one peer-reviewed paper.**

A textbook chapter is a citation but not a paper. A page whose only source is
`(Ettinger Ch 314)` rests entirely on one secondary source and does not satisfy this.
`npm run report:refs` reports coverage and ratchets it — the count of pages without a paper
can only go down. `npm run report:refs -- --papers` names them.

**5. Protocols have a higher bar: an ACVIM consensus statement or equivalent.**

A protocol tells someone what to do in an emergency, so its backing has to be a body's agreed
position rather than one group's case series. Acceptable sources, in order of preference:

- an **ACVIM consensus statement**;
- an equivalent society guideline — RECOVER (CPR), CURATIVE (antithrombotics), AAHA, AAFP,
  ISFM, ACVECC, AHS, IRIS, WSAVA;
- failing those, a **systematic review or meta-analysis** in a peer-reviewed journal.

A protocol backed only by a textbook, a single cohort or expert opinion is **not compliant**.
Where no consensus exists for a protocol, say so on the protocol itself rather than
substituting a weaker source silently — the clinician should know they are following practice,
not guidance.

**6. Verify against two registries** (PubMed + Crossref, or Crossref + Europe PMC), prefer
the fuller record and the **print** year, and record any disagreement in
`references/CITATIONS.md`. A bibliographic search's top hit is often the wrong record — a
congress abstract, an erratum, an abstract-only entry — so confirm the container title and
DOI point at the paper you mean.

## Reading the PDFs

The system Homebrew at `/usr/local` is owned by other user accounts and `vetic` is not an
admin, so it can never install anything — **never use it or suggest `sudo` fixes for it**. A
user-owned Homebrew lives at `~/homebrew` (on PATH via `~/.zshrc`); poppler 26.08 is installed
there. Note that its non-standard prefix means most formulae build from source, so new
installs are slow.

For text and tables, `pdftotext -layout` is the primary tool:

```bash
pdftotext -f <pdf_page> -l <pdf_page> -layout references/vettox3.pdf -
```

`-layout` is not optional — it is what keeps table columns aligned. PyMuPDF at
`~/.local/pdfenv/bin/python` is the scripting alternative (`page.find_tables()`,
`page.get_text()`), and is how to render a page to PNG for visual reading:

```bash
~/.local/pdfenv/bin/python -c "import fitz; fitz.open('references/vetdent4.pdf')[110].get_pixmap(dpi=150).save('/tmp/p.png')"
```

PDFs in `references/` (all gitignored), with printed-page → PDF-page offsets:

| File | Pages | Offset |
|---|---|---|
| `vettox3.pdf` | 1,239 | PDF page = printed page **+ 33** |
| `vetdent4.pdf` | 322 | PDF page = printed page **+ 14** |
| `saccm2.pdf` | 1,238 | PDF page = printed page **+ 23** (drifts to +24; approximate) |
| `vetoph6.pdf` | 2,744 | PDF page = printed page **+ 23** (Vol 1, measured twice; Vol 2 unmeasured) |

In `vettox3.md` and `vetdent4.md` the tables are flattened into unaligned fragments, so **any
dose or threshold read out of a table region must be re-checked against the PDF**; prose in
those two is reliable.

`ettinger9.md` fails the opposite way, and has no PDF to check against: its tables mostly
survive row by row, but two-column body prose interleaves **mid-sentence**, splicing unrelated
statements into fluent-looking English. Confirm any sentence you take from it closes on itself
before using it — details and the tells are in `references/ettinger9-index.md`.

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
