# Reference citations — AMA 11th edition

Canonical citation strings for every clinical reference in this project. Cite from this
file rather than composing a citation from memory or from a filename.

**AMA book format:** `Author AA, Author BB, eds. *Title of Book*. 3rd ed. Publisher; Year.`
**AMA book chapter:** `Author AA. Title of chapter. In: Editor AA, ed. *Title of Book*. 3rd ed. Publisher; Year:pp-pp.`

AMA 11th ed. drops the publisher's city — use `Elsevier; 2025.`, not `St. Louis, MO: Elsevier; 2025.`
List up to 6 authors; with 7 or more, give the first 3 then `et al`. Initials take no
periods and no spaces (`Gupta RC`). Edition is omitted for a 1st edition. In text, cite
with a superscript arabic numeral in order of first appearance.

---

## Verified — bibliographic data checked against the publisher's own record

For books that means the copyright page. For journal sources it means the article's own
`Citation:` line, or the DOI metadata deposited by the publisher and confirmed in **two
independent registries** (Crossref and Europe PMC) — see the ACVIM note below for why one
registry is not enough.

### Veterinary Toxicology (`vettox3.*`)

> Gupta RC, ed. *Veterinary Toxicology: Basic and Clinical Principles*. 3rd ed. Academic Press; 2018.

ISBN 978-0-12-811410-0. Academic Press is an Elsevier imprint; the copyright page carries
both — cite the imprint. Chapter template:

> [Chapter author(s)]. [Chapter title]. In: Gupta RC, ed. *Veterinary Toxicology: Basic and Clinical Principles*. 3rd ed. Academic Press; 2018:[pp-pp].

Chapter authors are listed under each chapter title in `vettox3.md` (see `vettox3-index.md`
for line numbers). **Page ranges are not recoverable from the text conversion** — the
converter dropped page markers. Pull them from `vettox3.pdf` before citing at chapter level.

### Veterinary Dentistry (`vetdent4.*`)

> Lemmons MS. *Veterinary Dentistry: A Team Approach*. 4th ed. Elsevier; 2025.

ISBN 978-0-443-11710-7. Copyright © 2025 Elsevier Inc.

Cited as **author, not editor**: the title page (PDF p5) gives Matthew S. Lemmons alone with
no role label — compare the Gupta title page, which says "Edited by" explicitly. Three people
appear under CONTRIBUTORS (Castejon-Gonzalez, Lemmons, Reiter). No eponym on the title page:
the preface refers to *Holmstrom's Veterinary Dentistry* after original author Steven
Holmstrom, but the copyright page title is plain `VETERINARY DENTISTRY: A TEAM APPROACH`.

### Small Animal Critical Care Medicine (`saccm2.pdf`)

> Silverstein DC, Hopper K, eds. *Small Animal Critical Care Medicine*. 2nd ed. Saunders; 2015.

ISBN 978-1-4557-0306-7. Copyright © 2015, 2009 by Saunders, an Elsevier imprint.

⚠️ **This is the 2nd edition, not the 3rd.** The download filename claimed "Third edition,
2023, isbn13 9780323764698"; the book's own title page reads SECOND EDITION and its copyright
page reads 2015. The file has been renamed `saccm2.pdf` accordingly. A 3rd edition does exist
— this is not it. Treat the content as ten years old, which matters for a critical care text.

The companion file `saccm3-alt.pdf` was a 1-page fragment, not a book — deleted 2026-08-10.

### Veterinary Ophthalmology (`vetoph6.pdf`, `vetoph6-notes.md`)

> Gelatt KN, ed. *Veterinary Ophthalmology*. 6th ed. Wiley Blackwell; 2021.

2 volumes, 2,744 pp. Verified against the title page (PDF p6) and copyright page (p7):
"This edition first published 2021 © 2021 by John Wiley & Sons, Inc."; Wiley‐Blackwell is the
imprint formed after Wiley acquired Blackwell.

Note the title page distinguishes **Editor** Kirk N. Gelatt from five **Associate Editors**
(Ben‐Shlomo, Gilger, Hendrix, Kern, Plummer). `vetoph6-notes.md` lists all six as `eds.`,
which overstates the associates' role — prefer the single-editor form above. Cite associate
editors only if a house style requires the full list.

### Ettinger's Textbook of Veterinary Internal Medicine (`ettinger9.md`, `ettinger9-notes.md`)

> Côté E, Ettinger SJ, Feldman EC, eds. *Ettinger's Textbook of Veterinary Internal Medicine*. 9th ed. Elsevier; 2024.

2 volumes, ~2,320 pp. Two-volume set ISBN 978-0-323-77931-9; Vol 1 978-0-443-10785-6, Vol 2
978-0-443-10786-3. "Copyright © 2024 by Elsevier Inc."; previous editions 2017, 2010, 2005,
2000, 1995, 1989, 1983, 1975.

Promoted from second-hand to verified on 2026-08-15, when the full-text conversion
`references/ettinger9.md` arrived and made the front matter readable again (title page at
lines 53–75, copyright page 77–95). **Two corrections to the string previously carried
here:**

1. **Editor order is Côté, Ettinger, Feldman** — that is the title-page order in the 9th
   edn, where Côté is now lead editor. The old string led with Ettinger. (The photo caption
   on the Editors page, front matter line 103, runs Feldman/Ettinger/Côté; AMA follows the
   title page, so that ordering is not the one to use.)
2. **The 9th edn carries no subtitle.** Its title page and copyright page both read plain
   `ETTINGER'S TEXTBOOK OF VETERINARY INTERNAL MEDICINE`. *Diseases of the Dog and the Cat*
   was the subtitle of earlier editions and survives only inside the book's own citations of
   the 3rd and 7th edns. The old string appended it to the 9th.

Chapter template — 331 chapters, each singly or jointly authored, with the author line
immediately below the title in `ettinger9.md`:

> [Chapter author(s)]. [Chapter title]. In: Côté E, Ettinger SJ, Feldman EC, eds. *Ettinger's Textbook of Veterinary Internal Medicine*. 9th ed. Elsevier; 2024:[pp-pp].

Page ranges *are* recoverable from this conversion, unlike `vettox3.md` — the running-header
lines carry printed page numbers. See `ettinger9-index.md` for the lookup. The inline
`(Ettinger Ch NN)` shorthand used in app data remains chapter-only and needs no pages.

**`ettinger9.pdf` is still gone and is still not being replaced** (decision, 2026-08-10).
The full-text `.md` supersedes the need for it.

### Feline eosinophilic keratitis (journal source)

> Romaneck AK, Sebbag L. Case report: clinical remission in a cat with severe bilateral eosinophilic keratitis receiving combined immunosuppressive therapy (triamcinolone acetonide and tacrolimus). Front Vet Sci. 2021;8:580396. doi:10.3389/fvets.2021.580396

Verified against the article's own `Citation:` line (frontiersin.org, 30 Apr 2021).
Open access, so the full text is retrievable without a subscription.

Cited on `DIS-EYE-KERATITIS` for three things Gelatt ch 28 does not give: the
non-response and recurrence rates for topical megestrol (~12% and ~33%) and for
topical ciclosporin 1.5% (11.4% and 22.6%), and the combined triamcinolone +
tacrolimus protocol. **It is a single case report** — n=1 — so the protocol is
recorded as feasibility, not superiority, and the entry says so. The comparative
percentages come from its literature review rather than its own cohort.

### ACVIM consensus statements (`J Vet Intern Med`)

The American College of Veterinary Internal Medicine's own evidence-based guidelines — the
college convenes a panel, the statement is peer-reviewed and published in *JVIM*, and it is
revised on a named cycle. Same evidential tier as the AAHA/AHS/FECAVA guidelines already
cited here, and **JVIM is fully open access**, so every one of these is retrievable without
a subscription.

Verified 2026-09-10 against Crossref and Europe PMC independently; both registries returned
identical author lists, volume/issue and page ranges for all fourteen.

**Cardiovascular**

> Keene BW, Atkins CE, Bonagura JD, et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33(3):1127-1140. doi:10.1111/jvim.15488

> Acierno MJ, Brown S, Coleman AE, et al. ACVIM consensus statement: guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32(6):1803-1822. doi:10.1111/jvim.15331

**Haematology / immune-mediated**

> Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33(2):313-334. doi:10.1111/jvim.15441

> Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172. doi:10.1111/jvim.15463

> LeVine DN, Kidd L, Garden OA, et al. ACVIM consensus statement on the diagnosis of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1958-1981. doi:10.1111/jvim.16996

> LeVine DN, Goggs R, Kohn B, et al. ACVIM consensus statement on the treatment of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1982-2007. doi:10.1111/jvim.17079

The two IMHA statements and the two ITP statements are **separate papers with different
panels and different author orders** — diagnosis and treatment must never be collapsed into
one entry. Note that `LeVine DN` leads both ITP papers but the second and third authors
differ (`Kidd L, Garden OA` for diagnosis; `Goggs R, Kohn B` for treatment), which is exactly
the pair an `et al` truncation makes easy to swap.

**Infectious disease**

> Sykes JE, Francey T, Schuller S, Stoddard RA, Cowgill LD, Moore GE. Updated ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37(6):1966-1982. doi:10.1111/jvim.16903

> Littman MP, Gerber B, Goldstein RE, Labato MA, Lappin MR, Moore GE. ACVIM consensus update on Lyme borreliosis in dogs and cats. J Vet Intern Med. 2018;32(3):887-903. doi:10.1111/jvim.15085

`Updated` is part of the leptospirosis title, not an editorial note — it supersedes the 2010
statement (Sykes et al, *JVIM* 2011;25(1):1-13), which should not be cited alongside it.

**Gastrointestinal / hepatic / pancreatic**

> Forman MA, Steiner JM, Armstrong PJ, et al. ACVIM consensus statement on pancreatitis in cats. J Vet Intern Med. 2021;35(2):703-723. doi:10.1111/jvim.16053

> Webster CRL, Center SA, Cullen JM, et al. ACVIM consensus statement on the diagnosis and treatment of chronic hepatitis in dogs. J Vet Intern Med. 2019;33(3):1173-1200. doi:10.1111/jvim.15467

> Marsilio S, Freiche V, Johnson E, et al. ACVIM consensus statement guidelines on diagnosing and distinguishing low-grade neoplastic from inflammatory lymphocytic chronic enteropathies in cats. J Vet Intern Med. 2023;37(3):794-816. doi:10.1111/jvim.16690

The feline pancreatitis statement drew three published `Letter regarding…` responses in
*JVIM* 2021;35(4) and 2024;38(1). They are correspondence, not errata — the statement itself
has not been amended, so cite it unqualified.

**Neurology**

> Podell M, Volk H, Berendt M, et al. 2015 ACVIM small animal consensus statement on seizure management in dogs. J Vet Intern Med. 2016;30(2):477-490. doi:10.1111/jvim.13841

> Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. ACVIM consensus statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38(1):19-40. doi:10.1111/jvim.16928

`2015` is part of the Podell title even though the issue is dated 2016 — the panel year, as
in the AAHA house style. The two do not supersede one another: Podell covers **maintenance**
seizure management in dogs, Charalambous covers **emergency** status epilepticus and cluster
seizures in dogs *and* cats. A page on either topic should cite the matching one.

**Urology**

> Lulich JP, Berent AC, Adams LG, Westropp JL, Bartges JW, Osborne CA. ACVIM small animal consensus recommendations on the treatment and prevention of uroliths in dogs and cats. J Vet Intern Med. 2016;30(5):1564-1574. doi:10.1111/jvim.14559

Already cited in app data as `(ACVIM)` on the urolith pages; recorded here so this file
remains the single source of truth for the string.

#### Why two registries

Crossref's deposited record for the uroliths paper abbreviates the given names to a single
initial (`Lulich J, Berent A, …`). Europe PMC carries the full form (`Lulich JP, Berent AC,
…`), which is what the article itself prints and what AMA requires. Publisher-deposited
metadata is **not** authoritative on its own — it is a lead. Where the two registries
disagree, prefer the fuller record and, for anything load-bearing, the article PDF.

This matters directly for the planned OpenAlex/Crossref/Europe PMC integration: that pipeline
should be allowed to *add* DOIs, PMIDs and open-access links to the strings in this file, and
must never be allowed to regenerate the strings themselves.

#### Author-count rule applied here

Per the AMA rule at the head of this file: six or fewer authors are listed in full; seven or
more are truncated to the first three plus `et al`. The Sykes, Littman, Charalambous and
Lulich statements fall under the threshold and are listed complete — the `et al` on the
others is correct, not an abbreviation of convenience. Full author lists are recoverable from
the DOI at any time.


### Journal sources cited in app data

Every non-ACVIM journal citation carried in `src/app/screens/diseaseReferences.tsx`. Resolved
and verified 2026-09-10 against Crossref and Europe PMC, and every DOI below was confirmed to
resolve through `doi.org` content negotiation.

DOIs are recorded in the lower-case form both registries return. DOI names are
case-insensitive by specification, so this resolves identically to the mixed-case form some
publishers print (`10.1177/1098612x20979507` = `10.1177/1098612X20979507`).

**Myasthenia gravis and megaoesophagus**

> Shelton GD, Lindstrom JM. Spontaneous remission in canine myasthenia gravis: implications for assessing human MG therapies. Neurology. 2001;57(11):2139-2141. doi:10.1212/wnl.57.11.2139

> Forgash JT, Chang YM, Mittelman NS, et al. Clinical features and outcome of acquired myasthenia gravis in 94 dogs. J Vet Intern Med. 2021;35(5):2315-2326. doi:10.1111/jvim.16223

> Cridge H, Little A, José-López R, et al. The clinical utility of neostigmine administration in the diagnosis of acquired myasthenia gravis. J Vet Emerg Crit Care. 2021;31(5):647-655. doi:10.1111/vec.13097

> Dewey CW, Cerda-Gonzalez S, Fletcher DJ, et al. Mycophenolate mofetil treatment in dogs with serologically diagnosed acquired myasthenia gravis: 27 cases (1999-2008). J Am Vet Med Assoc. 2010;236(6):664-668. doi:10.2460/javma.236.6.664

> Quintavalla F, Menozzi A, Pozzoli C, et al. Sildenafil improves clinical signs and radiographic features in dogs with congenital idiopathic megaoesophagus: a randomised controlled trial. Vet Rec. 2017;180(16):404. doi:10.1136/vr.103832

**Feline hyperadrenocorticism**

> Cook AK, Evans JB. Feline comorbidities: recognition, diagnosis and management of the cushingoid diabetic. J Feline Med Surg. 2021;23(1):4-16. doi:10.1177/1098612x20979507

> Boland LA, Barrs VR. Peculiarities of feline hyperadrenocorticism: update on diagnosis and treatment. J Feline Med Surg. 2017;19(9):933-947. doi:10.1177/1098612x17723245

> Valentin SY, Cortright CC, Nelson RW, et al. Clinical findings, diagnostic test results, and treatment outcome in cats with spontaneous hyperadrenocorticism: 30 cases. J Vet Intern Med. 2014;28(2):481-487. doi:10.1111/jvim.12298

> Mellett Keith AM, Bruyette D, Stanley S. Trilostane therapy for treatment of spontaneous hyperadrenocorticism in cats: 15 cases (2004-2012). J Vet Intern Med. 2013;27(6):1471-1477. doi:10.1111/jvim.12178

> Neiger R, Witt AL, Noble A, German AJ. Trilostane therapy for treatment of pituitary-dependent hyperadrenocorticism in 5 cats. J Vet Intern Med. 2004;18(2):160-164. doi:10.1892/0891-6640(2004)18<160:ttftop>2.0.co;2

> Daley CA, Zerbe CA, Schick RO, Powers RD. Use of metyrapone to treat pituitary-dependent hyperadrenocorticism in a cat with large cutaneous wounds. J Am Vet Med Assoc. 1993;202(6):956-960. doi:10.2460/javma.1993.202.06.956

> Moore LE, Biller DS, Olsen DE. Hyperadrenocorticism treated with metyrapone followed by bilateral adrenalectomy in a cat. J Am Vet Med Assoc. 2000;217(5):691-694. doi:10.2460/javma.2000.217.691

> Duesberg CA, Nelson RW, Feldman EC, Vaden SL, Scott-Moncrieff CR. Adrenalectomy for treatment of hyperadrenocorticism in cats: 10 cases (1988-1992). J Am Vet Med Assoc. 1995;207(8):1066-1070. doi:10.2460/javma.1995.207.08.1066

> Meij BP, Voorhout G, van den Ingh TS, Rijnberk A. Transsphenoidal hypophysectomy for treatment of pituitary-dependent hyperadrenocorticism in 7 cats. Vet Surg. 2001;30(1):72-86. doi:10.1053/jvet.2001.17843

> Benchekroun G, de Fornel-Thibaud P, Dubord M, et al. Plasma ACTH precursors in cats with pituitary-dependent hyperadrenocorticism. J Vet Intern Med. 2012;26(3):575-581. doi:10.1111/j.1939-1676.2012.00924.x

> Hardy L, Gil-Morales C, Maunder C, Paran E. Skin fragility in a cat presenting with pituitary-dependent hyperadrenocorticism. JFMS Open Rep. 2023;9(1):20551169231171245. doi:10.1177/20551169231171245

> Yayoshi N, Hamamoto Y, Oda H, et al. Successful treatment of feline hyperadrenocorticism with pituitary macroadenoma using radiation therapy: a case study. J Vet Med Sci. 2022;84(7):898-904. doi:10.1292/jvms.22-0021

> Muschner AC, Varela FV, Hazuchova K, Niessen SJ, Pöppl ÁG. Diabetes mellitus remission in a cat with pituitary-dependent hyperadrenocorticism after trilostane treatment. JFMS Open Rep. 2018;4(1):2055116918767708. doi:10.1177/2055116918767708

> Lien YH, Huang HP, Chang PH. Iatrogenic hyperadrenocorticism in 12 cats. J Am Anim Hosp Assoc. 2006;42(6):414-423. doi:10.5326/0420414

> Chirayath D, Shaheena S. Iatrogenic hypercortisolism in a Persian kitten after topical application of a skin lotion containing clobetasol. Vet Dermatol. 2020;31(6):486-488. doi:10.1111/vde.12903

**Urology**

> Berent AC, Weisse CW, Bagley DH, Lamb K. Use of a subcutaneous ureteral bypass device for treatment of benign ureteral obstruction in cats: 174 ureters in 134 cats (2009-2015). J Am Vet Med Assoc. 2018;253(10):1309-1327. doi:10.2460/javma.253.10.1309

**Endocrine guideline**

> Bugbee A, Rucinsky R, Cazabon S, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135. doi:10.5326/jaaha-ms-7368

#### Corrections made when these were verified

Seven strings were wrong before this pass. Six truncated the author list to `et al` while
having **six or fewer authors**, which AMA lists in full — `Daley`, `Duesberg`, `Hardy`,
`Meij`, `Muschner` and `Neiger` are now complete. Two carried a name error:

- `Schich RO` → **`Schick RO`** in the Daley metyrapone citation (spelling).
- `Keith AM` → **`Mellett Keith AM`** in the 2013 feline trilostane citation. The first
  author's surname is the double-barrelled *Mellett Keith*; the earlier string had dropped
  half of it. Both registries agree. Note the inline marker in `db.ts` is still `(Keith …)`
  and the matcher in `parseSources` still keys on `/^Keith/` — the marker is shorthand and
  need not match the rendered surname, but do not "fix" one without the other.

Two apparent mismatches were checked and are **not** errors:

- Crossref reports the Quintavalla sildenafil paper as pages `404-404`. Europe PMC reports
  `404`. *Vet Rec* uses article numbers, so the single `404` is right.
- Crossref reports the Neiger trilostane paper as page `160` only. Europe PMC gives the full
  `160-164`. The registries disagree on start-page-only deposits often enough that a bare
  start page should always be treated as suspect, not copied.

`Daley 1993` has **no Europe PMC record** — it predates that index's JAVMA coverage — so it
is the one entry here verified against Crossref alone. Its DOI resolves.

The Miceli 2022 trilostane entry is a conference presentation (ECVIM-CA), not a journal
article, and has no DOI. It stays as-is.

---

## Second-hand — recorded in the notes files, source no longer on disk

Bibliographic data below was transcribed when the notes were written. It is good enough to
cite, but nobody has re-checked it against a title page since.

### VETgirl / ASPCA APCC toxicology ebook

> ASPCA Animal Poison Control Center. *The Ultimate Guide to Toxicology*. VETgirl; 2023.

A 44-page password-protected FlippingBook, not a formally published monograph — treat as a
corporate-author online document and add an access date and URL if it is ever cited
externally. Author attribution is provisional.

---

## Using citations inside app data

`src/data/db.ts` has no citation field; entries cite inline in prose instead —
`(Ettinger Ch 121)` for internal medicine, `(Gelatt 6th edn Ch 20)` or
`(Gelatt 6th edn Table 17.3)` for ophthalmology, `(VETgirl 2023 p. 27)` for toxicology.
This is now widespread, not a handful of entries. Ophthalmology is fully attributed as of
2026-08-28: all 26 `DIS-EYE-*` / `DIS-OPH-*` / ocular `DIS-NEU-*` disease pages **and** all 118
ophthalmic lesion rows (`LES-RE-*`, `LES-BL-*`, `LES-WE-*`, `LES-AP-*`) carry a chapter-level
cite. Chapter numbers were read off the `vetoph6.pdf` table of contents (PDF pp. 8–14), not
inferred: 1 embryology · 8.4 mydriatics · 8.5 glaucoma therapy · 14 orbit · 15 eyelid ·
16 nasolacrimal · 17 lacrimal secretory · 18 conjunctiva + nictitans · 19 cornea + sclera ·
20 glaucoma · 21 anterior uvea · 22 lens + cataract · 25 ocular fundus · 27 optic nerve ·
28 feline · 36 neuro-ophthalmology.

Note the routing exception: the cortical/forebrain blindness rows (`LES-BL-CX-*`) are internal
medicine, not ophthalmology, and cite Ettinger (or Gupta for the toxicoses) per the CLAUDE.md
source-routing rule — Gelatt Ch 36 covers central blindness and dysautonomia but not hepatic
encephalopathy, hypoglycaemia or toxicoses. `(Gupta 3rd edn Ch NN)` is a new shorthand
introduced for that one row; it follows the same pattern as the others.

Non-ophthalmic areas of `db.ts` have not been audited to this standard.

If citations need to surface in the UI, that shorthand is the existing convention — keep using
it for now, and reserve the full AMA strings above for external or printed output. Adding a
structured `refs` field to the entry type would be the clean fix, but it is a schema change
and hasn't been requested.
