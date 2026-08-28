# Veterinary Dentistry: A Team Approach, 4th edn — line index

Lemmons MS, Elsevier 2025 (Holmstrom lineage). Cited as AUTHOR, not editor — the title
page names Lemmons alone with no role label; Castejon-Gonzalez and Reiter appear under
CONTRIBUTORS. See references/CITATIONS.md, which is the source of truth for the string.
15 chapters, ~270 pp. Source file: `references/vetdent4.md` (23,889 lines, 789 KB —
local only, gitignored).

**How to read it.** Flat text, no markdown headings and no tables. Navigate by line:

```bash
sed -n '6935,7530p' references/vetdent4.md
```

Chapter openings carry a running header glued to the title (`107CHAPTER 7 Professional
Dental Cleaning`). Figure captions (`Fig. 9.3 (A) …`) are interleaved with body prose.
Tables are flattened — column association is lost.

## Chapters

| Ch | Line | Title | Book p. |
|---|---|---|---|
| 1 | 678 | Introduction to Veterinary Dentistry — anatomy, Triadan numbering, dental formulae, charting | 1 |
| 2 | 1947 | **The Oral Examination and Disease Recognition** | 20 |
| 3 | 3938 | Dental Instruments and Equipment | 51 |
| 4 | 5723 | Personal Safety and Ergonomics | 78 |
| 5 | 6380 | **Local Anesthesia** — regional nerve blocks | 90 |
| 6 | 6935 | **Pathogenesis of Periodontal Disease** | 98 |
| 7 | 7536 | **Professional Dental Cleaning** (COHAT) | 107 |
| 8 | 8410 | Homecare Instruction and Products (VOHC) | 120 |
| 9 | 8974 | Nonsurgical Periodontal Therapy | 130 |
| 10 | 9275 | **Feline Dentistry** — TR/FORL, FCGS | 135 |
| 11 | 9971 | **Intraoral Imaging** — dental radiography, CBCT | 147 |
| 12 | 11456 | **Exodontics (Extractions)** — technique and complications | 173 |
| 13 | 12061 | **Advanced Dental and Oral Surgery** — periodontal surgery, endodontics, restorations, orthodontics, maxillofacial | 199 |
| 14 | 14275 | **Lagomorph, Rodent, and Ferret Dentistry** | 215 |
| 15 | 16862 | Team Approach to Communication | 246 |

Front matter ends ~line 560 (contributors, preface, TOC at 160–500).
Body ends ~line 22,500; chapter worksheet answers 22,518–22,710; glossary/index after.

## Relevance to ClinIQ

Only six `DIS-DENT-*` entries exist today — `ORONASAL`, `PERIO`, `STOMAT`, `ORAFB`,
`JAWFX`, `RETRO`. This text is the reference for all of them, and it covers a good deal
this data set does not yet carry:

- **Feline tooth resorption (TR/FORL)** and its type 1/2/3 radiographic classification — ch 10
- **Periodontal staging** (PD 0–4) with attachment-loss and furcation criteria — ch 6
- **Malocclusion classification** (class 1–4) and interceptive orthodontics — ch 13
- **Endodontic disease** — complicated/uncomplicated crown fracture, discoloured tooth,
  vital pulp therapy vs root canal decision — ch 13
- **Regional nerve blocks** — infraorbital, maxillary, mental, inferior alveolar — ch 5
- **Rabbit/rodent/ferret dental disease** — elongated crowns, malocclusion, apical
  abscessation — ch 14 (ClinIQ has no exotic dental coverage)

Nomenclature follows current **AVDC** standards, with AVDC case-log abbreviations in bold
brackets in the source — worth preserving verbatim in any extraction, since that's the
vocabulary practices actually chart in.
