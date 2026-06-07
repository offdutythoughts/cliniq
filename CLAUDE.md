@AGENTS.md

## Clinical Reference PDFs

| File | Contents | Status |
|---|---|---|
| `references/vetoph6.pdf` | Veterinary Ophthalmology 6th edn, Gelatt et al. 2021 (2,744 pp) | Local only — gitignored |
| `references/vetoph6-notes.md` | Extracted clinical tables + protocols from the above | Committed to repo |
| `references/ettinger9.pdf` | Ettinger's Textbook of Veterinary Internal Medicine, 9th edn | Local only — gitignored |
| `references/ettinger9-notes.md` | Clinical extraction (differentials, criteria, staging, doses) — tagged inline with `> ClinIQ:` | Committed to repo |
| `references/ettinger9-gap-analysis.md` | Gap summary: ClinIQ vs Ettinger (covered / missing / enrich) | Committed to repo |

When working on ophthalmic signs (`redEye`, `blindEye`, `wetEye`, `abnormalPupil`) or any
entry in `src/data/db.ts` with id `DIS-OPH-*`, `DIS-EYE-*`, `LES-RE-*`, `LES-BL-*`,
`LES-WE-*`, or `LES-AP-*` — read `references/vetoph6-notes.md` first for breed tables,
STT thresholds, drug doses, and localization criteria.

When working on cardiac, renal, endocrine, GI, hepatobiliary, haematologic, infectious,
respiratory, neurologic, urinary, or oncology entries (`DIS-CARD-*`, `DIS-SEC-*`, `DIS-REN-*`,
`DIS-ENDO-*`, `DIS-GI-*`, `DIS-HEP-*`, `DIS-BD-*`, `DIS-INFECT-*`, `DIS-RESP-*`, `DIS-NEU-*`,
`DIS-URO-*`, `DIS-NEO-*`, and their sign flows/Dx views) — read `references/ettinger9-notes.md`
first for differential lists, diagnostic criteria, staging/grading, lab thresholds, and drug
doses. **Use SDMA in µg/dL** (the IRIS table in the notes has a unit typo printing ng/dL); keep
dog vs cat doses distinct and verify every dose against a current formulary before shipping.

To access the full PDF for deep dives:
```bash
cp references/vetoph6.pdf /tmp/vetoph.pdf
pdftotext -f <start_page> -l <end_page> -layout /tmp/vetoph.pdf -
```
PDF page = book page + 22 (Vol 1) or + ~75 (Vol 2, after index pages).

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
