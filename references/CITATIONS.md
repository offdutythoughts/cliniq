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

> Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. J Vet Intern Med. 2020;34(3):1062-1077. doi:10.1111/jvim.15745

Note the surname: the first author is **Luis Fuentes V** — `Luis Fuentes` is the
family name, not a given name followed by `Fuentes`. Both registries agree.

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

**Ophthalmology — primary lens luxation genetics**

> Farias FHG, Johnson GS, Taylor JF, et al. An ADAMTS17 splice donor site mutation in dogs with primary lens luxation. Invest Ophthalmol Vis Sci. 2010;51(9):4716-4721. doi:10.1167/iovs.09-5142

> Gould D, Pettitt L, McLaughlin B, et al. ADAMTS17 mutation associated with primary lens luxation is widespread among breeds. Vet Ophthalmol. 2011;14(6):378-384. doi:10.1111/j.1463-5224.2011.00892.x

Cited together on `DIS-EYE-LENS-LUX` for the ADAMTS17 mutation behind primary lens
luxation and the breadth of breeds carrying it. Each needed the fuller of the two
registry records, in opposite directions: Crossref has the complete `Farias FHG`
where Europe PMC truncates to `Farias FH`, and Europe PMC has the full page range
`4716-4721` where Crossref deposited only the start page. Between them they are a
tidy argument for checking both.

**Endocrine guideline**

> Bugbee A, Rucinsky R, Cazabon S, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135. doi:10.5326/jaaha-ms-7368

**First five disease pages — primary literature (added 2026-09-21)**

Found through the Consensus connector and verified against Crossref **and** Europe PMC,
then confirmed to resolve through `doi.org`. Where the registries disagreed the fuller
record won, in both directions as usual: Crossref carries the full page ranges Europe PMC
truncates (`S244-S257`, not `S244-57`), while Europe PMC carries the **print** year where
Crossref deposits the online-first one — Greci is 2014 not 2013, Janssens 2017 not 2016,
Lo 2022 not 2021, Langlois 2020 not 2019 — and the full Hoppers page range `385-e102`
where Crossref deposited only `385`. The inline marker in `db.ts` carries the print year,
which is what the year-bearing-marker test in `diseaseReferences.test.ts` asserts.

*Feline hypertrophic cardiomyopathy (`DIS-HCM`)*

> Meurs KM, Sanchez X, David RM, et al. A cardiac myosin binding protein C mutation in the Maine Coon cat with familial hypertrophic cardiomyopathy. Hum Mol Genet. 2005;14(23):3587-3593. doi:10.1093/hmg/ddi386

> Meurs KM, Norgard MM, Ederer MM, Hendrix KP, Kittleson MD. A substitution mutation in the myosin binding protein C gene in ragdoll hypertrophic cardiomyopathy. Genomics. 2007;90(2):261-264. doi:10.1016/j.ygeno.2007.04.007

> Longeri M, Ferrari P, Knafelz P, et al. Myosin-binding protein C DNA variants in domestic cats (A31P, A74T, R820W) and their association with hypertrophic cardiomyopathy. J Vet Intern Med. 2013;27(2):275-285. doi:10.1111/jvim.12031

> Payne JR, Brodbelt DC, Luis Fuentes V. Cardiomyopathy prevalence in 780 apparently healthy cats in rehoming centres (the CatScan study). J Vet Cardiol. 2015;17(suppl 1):S244-S257. doi:10.1016/j.jvc.2015.03.008

> Payne JR, Borgeat K, Connolly DJ, et al. Prognostic indicators in cats with hypertrophic cardiomyopathy. J Vet Intern Med. 2013;27(6):1427-1436. doi:10.1111/jvim.12215

> Payne J, Luis Fuentes V, Boswood A, Connolly D, Koffas H, Brodbelt D. Population characteristics and survival in 127 referred cats with hypertrophic cardiomyopathy (1997 to 2005). J Small Anim Pract. 2010;51(10):540-547. doi:10.1111/j.1748-5827.2010.00989.x

> Steele MM, Borgeat K, Payne JR, et al. Increased insulin-like growth factor 1 concentrations in a retrospective population of non-diabetic cats diagnosed with hypertrophic cardiomyopathy. J Feline Med Surg. 2021;23(10):952-958. doi:10.1177/1098612x20987995

> Rush JE, Freeman LM, Fenollosa NK, Brown DJ. Population and survival characteristics of cats with hypertrophic cardiomyopathy: 260 cases (1990-1999). J Am Vet Med Assoc. 2002;220(2):202-207. doi:10.2460/javma.2002.220.202

> Fox PR, Keene BW, Lamb K, et al. International collaborative study to assess cardiovascular risk and evaluate long-term health in cats with preclinical hypertrophic cardiomyopathy and apparently healthy cats: the REVEAL study. J Vet Intern Med. 2018;32(3):930-943. doi:10.1111/jvim.15122

> Hogan DF, Fox PR, Jacob K, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: the double-blind, randomized, positive-controlled feline arterial thromboembolism; clopidogrel vs. aspirin trial (FAT CAT). J Vet Cardiol. 2015;17(suppl 1):S306-S317. doi:10.1016/j.jvc.2015.10.004

> Lo ST, Walker AL, Georges CJ, Li RH, Stern JA. Dual therapy with clopidogrel and rivaroxaban in cats with thromboembolic disease. J Feline Med Surg. 2022;24(4):277-283. doi:10.1177/1098612x211013736

Meurs and Payne each appear more than once on `DIS-HCM`, so their markers are keyed on the
year in `parseSources`, exactly as ACVIM is. Crossref's top hit for the REVEAL study is its
**abstract** record (`10.1111/jvim.15285`, 32(6):2310) — the paper is `10.1111/jvim.15122`.
A bibliographic title search is a lead, not an answer; check what the DOI actually points at.

> Mary J, Chetboul V, Sampedrano CC, et al. Prevalence of the MYBPC3-A31P mutation in a large European feline population and association with hypertrophic cardiomyopathy in the Maine Coon breed. J Vet Cardiol. 2010;12(3):155-161. doi:10.1016/j.jvc.2010.06.004

> Granström S, Godiksen MT, Christiansen M, et al. Genotype-phenotype correlation between the cardiac myosin binding protein C mutation A31P and hypertrophic cardiomyopathy in a cohort of Maine Coon cats: a longitudinal study. J Vet Cardiol. 2015;17(suppl 1):S268-S281. doi:10.1016/j.jvc.2015.10.005

> Boeykens F, Abitbol M, Anderson H, et al. Classification of feline hypertrophic cardiomyopathy-associated gene variants according to the American College of Medical Genetics and Genomics guidelines. Front Vet Sci. 2024;11:1327081. doi:10.3389/fvets.2024.1327081

> Brainard BM, Coleman AE, Kurosawa A, et al. Therapy with clopidogrel or rivaroxaban has equivalent impacts on recurrence of thromboembolism and survival in cats following cardiogenic thromboembolism: the SUPERCAT study. J Am Vet Med Assoc. 2025;263(4):1-10. doi:10.2460/javma.24.09.0584

Mary 2010 is where the `RR 9.9` figure on the breed field actually comes from — it was
carried uncited until this pass. Boeykens uses **R818W** for the Ragdoll variant where the
page and Meurs 2007 use **R820W**; they are the same variant under two numbering
conventions, and the page now gives both.

⚠️ **Two first authors the search connector got wrong.** The 2015 A31P genotype/phenotype
cohort is **Granström** (Godiksen is second author), and the 90-case polyneuropathy study
below is **Bookbinder** (Flanders is second). Both registries agree, and both surnames are
now pinned by assertion in `diseaseReferences.test.ts`. A connector's author string is a
lead, like a Crossref title search — resolve the DOI before writing the citation.

The SUPERCAT page range `263(4):1-10` is what **both** registries deposited; it is not a
truncation on our side. Its print year is 2025, not the 2024 the connector reported.

*Laryngeal paralysis / GOLPP (`DIS-LP`)*

> Stanley BJ, Hauptman JG, Fritz MC, Rosenstein DS, Kinns J. Esophageal dysfunction in dogs with idiopathic laryngeal paralysis: a controlled cohort study. Vet Surg. 2010;39(2):139-149. doi:10.1111/j.1532-950x.2009.00626.x

> Tobias KM, Jackson AM, Harvey RC. Effects of doxapram HCl on laryngeal function of normal dogs and dogs with naturally occurring laryngeal paralysis. Vet Anaesth Analg. 2004;31(4):258-263. doi:10.1111/j.1467-2995.2004.00168.x

> Miller CJ, McKiernan BC, Pace J, Fettman MJ. The effects of doxapram hydrochloride (dopram-V) on laryngeal function in healthy dogs. J Vet Intern Med. 2002;16(5):524-528. doi:10.1111/j.1939-1676.2002.tb02381.x

> Wilson D, Monnet E. Risk factors for the development of aspiration pneumonia after unilateral arytenoid lateralization in dogs with laryngeal paralysis: 232 cases (1987-2012). J Am Vet Med Assoc. 2016;248(2):188-194. doi:10.2460/javma.248.2.188

> MacPhail CM, Monnet E. Outcome of and postoperative complications in dogs undergoing surgical treatment of laryngeal paralysis: 140 cases (1985-1998). J Am Vet Med Assoc. 2001;218(12):1949-1956. doi:10.2460/javma.2001.218.1949

> Jeffery ND, Talbot CE, Smith PM, Bacon NJ. Acquired idiopathic laryngeal paralysis as a prominent feature of generalised neuromuscular disease in 39 dogs. Vet Rec. 2006;158(1):17-21. doi:10.1136/vr.158.1.17

> Bookbinder LC, Flanders J, Bookbinder PF, Harvey HJ, Barry JS, Cheetham J. Idiopathic canine laryngeal paralysis as one sign of a diffuse polyneuropathy: an observational study of 90 cases (2007-2013). Vet Surg. 2016;45(2):254-260. doi:10.1111/vsu.12444

> Milovancev M, Townsend K, Spina J, et al. Effect of metoclopramide on the incidence of early postoperative aspiration pneumonia in dogs with acquired idiopathic laryngeal paralysis. Vet Surg. 2016;45(5):577-581. doi:10.1111/vsu.12491

> Ogden J, Ovbey D, Saile K. Effects of preoperative cisapride on postoperative aspiration pneumonia in dogs with laryngeal paralysis. J Small Anim Pract. 2019;60(3):183-190. doi:10.1111/jsap.12940

Ogden's print issue is 2019, not the 2018 the connector reported. Milovancev and Ogden are
cited for a **negative** and a **weak** result respectively — the page says so rather than
presenting prokinetic prophylaxis as established.

*Feline inflammatory polyps (`DIS-POLYP`)*

> Anderson DM, Robinson RK, White RA. Management of inflammatory polyps in 37 cats. Vet Rec. 2000;147(24):684-687.

> Veir JK, Lappin MR, Foley JE, Getzy DM. Feline inflammatory polyps: historical, clinical, and PCR findings for feline calici virus and feline herpes virus-1 in 28 cases. J Feline Med Surg. 2002;4(4):195-199. doi:10.1053/jfms.2002.0172

> Greci V, Vernia E, Mortellaro CM. Per-endoscopic trans-tympanic traction for the management of feline aural inflammatory polyps: a case review of 37 cats. J Feline Med Surg. 2014;16(8):645-650. doi:10.1177/1098612x13516620

> Janssens SD, Haagsman AN, Ter Haar G. Middle ear polyps: results of traction avulsion after a lateral approach to the ear canal in 62 cats (2004-2014). J Feline Med Surg. 2017;19(8):803-808. doi:10.1177/1098612x16660356

> Wainberg SH, Selmic LE, Haagsman AN, et al. Comparison of complications and outcome following unilateral, staged bilateral, and single-stage bilateral ventral bulla osteotomy in cats. J Am Vet Med Assoc. 2019;255(7):828-836. doi:10.2460/javma.255.7.828

> Hoppers SE, May ER, Frank LA. Feline bilateral inflammatory aural polyps: a descriptive retrospective study. Vet Dermatol. 2020;31(5):385-e102. doi:10.1111/vde.12877

> Anders BB, Hoelzler MG, Scavelli TD, Fulcher RP, Bastian RP. Analysis of auditory and neurologic effects associated with ventral bulla osteotomy for removal of inflammatory polyps or nasopharyngeal masses in cats. J Am Vet Med Assoc. 2008;233(4):580-585. doi:10.2460/javma.233.4.580

> Bohin C, Garcia M, Bertinot C, Graille M, Bernardé A. Compartmental location of middle ear inflammatory polyps in cats: 9 cases (2021-2023). J Small Anim Pract. 2025;66(3):197-202. doi:10.1111/jsap.13811

⚠️ **Anderson 2000 is the one entry here with no DOI.** Neither registry holds one, and the
plausible-looking `10.1136/vr.147.24.684` returns 404 — it does not exist. The PMID is
**11132674**. Do not "complete" this citation with a constructed DOI.

Note also the prefix collision in the marker set: `Anders` is a prefix of `Anderson`, so
`parseSources` must test **Anderson first**. The same applies to `Lo` and `Longeri` on the
HCM page. Both orderings are pinned by a test.

*Pyothorax (`DIS-PYOTHORAX`)*

> Barrs VR, Allan GS, Martin P, Beatty JA, Malik R. Feline pyothorax: a retrospective study of 27 cases in Australia. J Feline Med Surg. 2005;7(4):211-222. doi:10.1016/j.jfms.2004.12.004

> Demetriou JL, Foale RD, Ladlow J, McGrotty Y, Faulkner J, Kirby BM. Canine and feline pyothorax: a retrospective study of 50 cases in the UK and Ireland. J Small Anim Pract. 2002;43(9):388-394. doi:10.1111/j.1748-5827.2002.tb00089.x

> Stillion JR, Letendre J. A clinical review of the pathophysiology, diagnosis, and treatment of pyothorax in dogs and cats. J Vet Emerg Crit Care. 2015;25(1):113-129. doi:10.1111/vec.12274

> Rooney MB, Monnet E. Medical and surgical treatment of pyothorax in dogs: 26 cases (1991-2001). J Am Vet Med Assoc. 2002;221(1):86-92. doi:10.2460/javma.2002.221.86

> Boothe HW, Howe LM, Boothe DM, Reynolds LA, Carpenter M. Evaluation of outcomes in dogs treated for pyothorax: 46 cases (1983-2001). J Am Vet Med Assoc. 2010;236(6):657-663. doi:10.2460/javma.236.6.657

> Eiras-Diaz A, Frykfors von Hekkel A, Hanot E, et al. CT findings, management and short-term outcome of dogs with pyothorax: 101 cases (2010-2019). J Small Anim Pract. 2021;62(11):959-966. doi:10.1111/jsap.13374

> Johnson LR, Epstein SE, Reagan KL. Etiology and effusion characteristics in 29 cats and 60 dogs with pyothorax (2010-2020). J Vet Intern Med. 2023;37(3):1155-1165. doi:10.1111/jvim.16699

*Acute dietary gastritis (`DIS-GAST-DIET`)*

> Ramsey DS, Kincaid K, Watkins JA, et al. Safety and efficacy of injectable and oral maropitant, a selective neurokinin1 receptor antagonist, in a randomized clinical trial for treatment of vomiting in dogs. J Vet Pharmacol Ther. 2008;31(6):538-543. doi:10.1111/j.1365-2885.2008.00992.x

> Shmalberg J, Montalbano C, Morelli G, Buckley GJ. A randomized double blinded placebo-controlled clinical trial of a probiotic or metronidazole for acute canine diarrhea. Front Vet Sci. 2019;6:163. doi:10.3389/fvets.2019.00163

> Rudinsky AJ, Parker VJ, Winston J, et al. Randomized controlled trial demonstrates nutritional management is superior to metronidazole for treatment of acute colitis in dogs. J Am Vet Med Assoc. 2022;260(S3):S23-S32. doi:10.2460/javma.22.08.0349

> Langlois DK, Koenigshof AM, Mani R. Metronidazole treatment of acute diarrhea in dogs: a randomized double blinded placebo-controlled clinical trial. J Vet Intern Med. 2020;34(1):98-104. doi:10.1111/jvim.15664

⚠️ The last three are cited **against** a line of the page, not for it. `DIS-GAST-DIET` tx2
recommends metronidazole where diarrhoea suggests a bacterial component; Shmalberg found no
benefit over placebo, and Rudinsky found an easily digestible diet beat it outright while
metronidazole worsened the dysbiosis index. Langlois is the one trial showing a benefit
(1.5 days shorter), and its own conclusion is that most dogs resolve regardless. The page
carries a qualifier bullet rather than a silent rewrite — the clinical call is the author's.

**Disease pages 6-10 — primary literature (added 2026-09-21)**

Same two-registry rule. Three first-author corrections the Consensus connector forced this
round, all confirmed in Crossref *and* Europe PMC:

- the four-assay cPL comparison is **Cridge H**, not MacLeod (MacLeod is second author);
- the canine CKD survival study is **Rudinsky 2018** — a different paper from the Rudinsky
  2022 acute-colitis trial already in this file, by the same first author;
- **Venn**'s print year is 2017 where Crossref deposited the online-first 2016.

Because Cridge and Rudinsky now each cover two unrelated works, both markers are **keyed on
the year** in `parseSources`, exactly as ACVIM, Meurs and Payne are. The pre-existing
`(Cridge 2021)` and `(Rudinsky 2022)` markers in `db.ts` already carried years, so nothing
had to change in the data — but a year-less marker for either would now silently resolve to
nothing, which is the intended failure mode. Both directions are pinned by test.

Also corrected: **Mortier** is 2025;39(1):e17257, not the 2024 the connector reported, and
**Scobie** paginates as `e299-e314`.

*Canine parvovirus (`DIS-GI-PARVO`)*

> Venn EC, Preisner K, Boscan PL, Twedt DC, Sullivan LA. Evaluation of an outpatient protocol in the treatment of canine parvoviral enteritis. J Vet Emerg Crit Care. 2017;27(1):52-65. doi:10.1111/vec.12561

> Sarpong KJ, Lukowski JM, Knapp CG. Evaluation of mortality rate and predictors of outcome in dogs receiving outpatient treatment for parvoviral enteritis. J Am Vet Med Assoc. 2017;251(9):1035-1041. doi:10.2460/javma.251.9.1035

> Perley K, Burns CC, Maguire C, et al. Retrospective evaluation of outpatient canine parvovirus treatment in a shelter-based low-cost urban clinic. J Vet Emerg Crit Care. 2020;30(2):202-208. doi:10.1111/vec.12941

> Chalifoux NV, Parker SE, Cosford KL. Prognostic indicators at presentation for canine parvoviral enteritis: 322 cases (2001-2018). J Vet Emerg Crit Care. 2021;31(3):402-413. doi:10.1111/vec.13052

> Pereira GQ, Gomes LA, Santos IS, Alfieri AF, Weese JS, Costa MC. Fecal microbiota transplantation in puppies with canine parvovirus infection. J Vet Intern Med. 2018;32(2):707-711. doi:10.1111/jvim.15072

> Hoel ME, Gimenez AR, Elbe A, Horecka K, Alvarez E, Lashnits E. Oral fecal microbial transplant for parvovirus in the outpatient setting: a randomized controlled trial to evaluate a practical and low-cost intervention. J Am Vet Med Assoc. 2026;264(10):1301-1307. doi:10.2460/javma.26.01.0051

> Mohr AJ, Leisewitz AL, Jacobson LS, Steiner JM, Ruaux CG, Williams DA. Effect of early enteral nutrition on intestinal permeability, intestinal protein loss, and outcome in dogs with severe parvoviral enteritis. J Vet Intern Med. 2003;17(6):791-798. doi:10.1111/j.1939-1676.2003.tb02516.x

> de Mari K, Maynard L, Eun HM, Lebreux B. Treatment of canine parvoviral enteritis with interferon-omega in a placebo-controlled field trial. Vet Rec. 2003;152(4):105-108. doi:10.1136/vr.152.4.105

> Acciacca RA, Sullivan LA, Webb TL, Johnson V, Dow SW. Clinical evaluation of hyperimmune plasma for treatment of dogs with naturally occurring parvoviral enteritis. J Vet Emerg Crit Care. 2020;30(5):525-533. doi:10.1111/vec.12987

Pereira (**rectal**) and Hoel (**oral capsules**) are cited together deliberately: they are
different interventions with opposite results, and the page says so rather than letting
"FMT works" stand on the older trial alone.

*Chronic kidney disease (`DIS-SEC-CKD`)*

> Hall JA, Yerramilli M, Obare E, Yerramilli M, Jewell DE. Comparison of serum concentrations of symmetric dimethylarginine and creatinine as kidney function biomarkers in cats with chronic kidney disease. J Vet Intern Med. 2014;28(6):1676-1683. doi:10.1111/jvim.12445

> Nabity MB, Lees GE, Boggess MM, et al. Symmetric dimethylarginine assay validation, stability, and evaluation as a marker for the early detection of chronic kidney disease in dogs. J Vet Intern Med. 2015;29(4):1036-1044. doi:10.1111/jvim.12835

> Scobie C, Dean R, Stavisky J, Plüddemann A. Diagnostic accuracy of symmetric dimethylarginine for chronic kidney disease in cats and dogs: a systematic review. Vet Rec. 2026;198(7):e299-e314. doi:10.1002/vetr.70216

> Syme HM, Markwell PJ, Pfeiffer D, Elliott J. Survival of cats with naturally occurring chronic renal failure is related to severity of proteinuria. J Vet Intern Med. 2006;20(3):528-535. doi:10.1111/j.1939-1676.2006.tb02892.x

> King JN, Tasker S, Gunn-Moore DA, Strehlau G. Prognostic factors in cats with chronic kidney disease. J Vet Intern Med. 2007;21(5):906-916. doi:10.1111/j.1939-1676.2007.tb03042.x

> Chakrabarti S, Syme HM, Elliott J. Clinicopathological variables predicting progression of azotemia in cats with chronic kidney disease. J Vet Intern Med. 2012;26(2):275-281. doi:10.1111/j.1939-1676.2011.00874.x

> Elliott J, Rawlings JM, Markwell PJ, Barber PJ. Survival of cats with naturally occurring chronic renal failure: effect of dietary management. J Small Anim Pract. 2000;41(6):235-242. doi:10.1111/j.1748-5827.2000.tb03932.x

> Quimby JM, Lunn KF. Mirtazapine as an appetite stimulant and anti-emetic in cats with chronic kidney disease: a masked placebo-controlled crossover clinical trial. Vet J. 2013;197(3):651-655. doi:10.1016/j.tvjl.2013.05.048

> Spencer A, Quimby JM, Price JM, et al. Appetite-stimulating effects of once-daily omeprazole in cats with chronic kidney disease: double-blind, placebo-controlled, randomized, crossover trial. J Vet Intern Med. 2021;35(6):2705-2712. doi:10.1111/jvim.16268

> Rudinsky AJ, Harjes LM, Byron J, et al. Factors associated with survival in dogs with chronic kidney disease. J Vet Intern Med. 2018;32(6):1977-1982. doi:10.1111/jvim.15322

> Mortier F, Daminet S, Marynissen S, Verbeke J, Paepe D. Clinical importance of borderline proteinuria in nonazotemic cats and evaluation of other risk factors for the development of chronic kidney disease. J Vet Intern Med. 2025;39(1):e17257. doi:10.1111/jvim.17257

⚠️ The page's SDMA claim (`detects ~25–40% reduction in GFR`) is the assay maker's figure.
Hall and Nabity support *earlier than creatinine*; Nabity's own number is `<20%`. Scobie's
systematic review is cited **against** the claim — it found high risk of bias throughout and
warns of over-diagnosis. Both sides are on the page.

*Hypoadrenocorticism (`DIS-SEC-HYPO`)*

> Gold AJ, Langlois DK, Refsal KR. Evaluation of basal serum or plasma cortisol concentrations for the diagnosis of hypoadrenocorticism in dogs. J Vet Intern Med. 2016;30(6):1798-1805. doi:10.1111/jvim.14589

> Bovens C, Tennant K, Reeve J, Murphy KF. Basal serum cortisol concentration as a screening test for hypoadrenocorticism in dogs. J Vet Intern Med. 2014;28(5):1541-1545. doi:10.1111/jvim.12415

> Lennon EM, Boyle TE, Hutchins RG, et al. Use of basal serum or plasma cortisol concentrations to rule out a diagnosis of hypoadrenocorticism in dogs: 123 cases (2000-2005). J Am Vet Med Assoc. 2007;231(3):413-416. doi:10.2460/javma.231.3.413

> Vincent AM, Okonkowski LK, Brudvig JM, et al. Low-dose desoxycorticosterone pivalate treatment of hypoadrenocorticism in dogs: a randomized controlled clinical trial. J Vet Intern Med. 2021;35(4):1720-1728. doi:10.1111/jvim.16195

Vincent is the randomised evidence behind the sub-label DOCP dose the page already
recommended on FECAVA's authority; the trial used 1.1 mg/kg, the page says 1.5 mg/kg. That
is a real discrepancy and the page now carries the trial figure alongside.

*Acute pancreatitis, dog (`DIS-SEC-PAN-DOG`)*

> Kook PH, Kohler N, Hartnack S, Riond B, Reusch CE. Agreement of serum Spec cPL with the DGGR lipase assay and with pancreatic ultrasonography in dogs with suspected pancreatitis. J Vet Intern Med. 2014;28(3):863-870. doi:10.1111/jvim.12334

> Cridge H, MacLeod AG, Pachtinger GE, et al. Evaluation of SNAP cPL, Spec cPL, VetScan cPL Rapid Test, and Precision PSL assays for the diagnosis of clinical pancreatitis in dogs. J Vet Intern Med. 2018;32(2):658-664. doi:10.1111/jvim.15039

> Haworth MD, Hosgood G, Swindells KL, Mansfield CS. Diagnostic accuracy of the SNAP and Spec canine pancreatic lipase tests for pancreatitis in dogs presenting with clinical signs of acute abdominal disease. J Vet Emerg Crit Care. 2014;24(2):135-143. doi:10.1111/vec.12158

> Trivedi S, Marks SL, Kass PH, et al. Sensitivity and specificity of canine pancreas-specific lipase (cPL) and other markers for pancreatitis in 70 dogs with and without histopathologic evidence of pancreatitis. J Vet Intern Med. 2011;25(6):1241-1247. doi:10.1111/j.1939-1676.2011.00793.x

> Harris JP, Parnell NK, Griffith EH, Saker KE. Retrospective evaluation of the impact of early enteral nutrition on clinical outcomes in dogs with pancreatitis: 34 cases (2010-2013). J Vet Emerg Crit Care. 2017;27(4):425-433. doi:10.1111/vec.12612

> Mansfield CS, James FE, Steiner JM, Suchodolski JS, Robertson ID, Hosgood G. A pilot study to assess tolerability of early enteral nutrition via esophagostomy tube feeding in dogs with severe acute pancreatitis. J Vet Intern Med. 2011;25(3):419-425. doi:10.1111/j.1939-1676.2011.0703.x

Kook is where the page's `>216 U/L` DGGR cut-off and `κ 0.80` come from — both were on the
page uncited before this pass. Kook also found ultrasound agrees only *fairly* with either
lipase assay (κ 0.25–0.35), which is now on the page next to the ultrasound line.

*Intussusception (`DIS-GI-INTUSS`)*

> Larose PC, Singh A, Giuffrida MA, et al. Clinical findings and outcomes of 153 dogs surgically treated for intestinal intussusceptions. Vet Surg. 2020;49(5):870-878. doi:10.1111/vsu.13442

> Applewhite AA, Hawthorne JC, Cornell KK. Complications of enteroplication for the prevention of intussusception recurrence in dogs: 35 cases (1989-1999). J Am Vet Med Assoc. 2001;219(10):1415-1418. doi:10.2460/javma.2001.219.1415

> Oakes MG, Lewis DD, Hosgood G, Beale BS. Enteroplication for the prevention of intussusception recurrence in dogs: 31 cases (1978-1992). J Am Vet Med Assoc. 1994;205(1):72-75. doi:10.2460/javma.1994.205.01.72

> Rallis TS, Papazoglou LG, Adamama-Moraitou KK, Prassinos NN. Acute enteritis or gastroenteritis in young dogs as a predisposing factor for intestinal intussusception: a retrospective study. J Vet Med A Physiol Pathol Clin Med. 2000;47(8):507-511. doi:10.1046/j.1439-0442.2000.00318.x

Oakes and Applewhite **disagree** about enteroplication and are cited together for that
reason. The page previously recommended it flatly; it now states the split and gives
Larose's 3% baseline recurrence rate so the trade-off is visible.

**Disease pages 11-15 — primary literature (added 2026-09-21)**

The Consensus connector's monthly search quota ran out partway through this pass, so the
last two pages (`DIS-GI-EOGAST`, `DIS-GI-PYL`) were discovered through **Crossref's
bibliographic search** instead, which is free and needs no quota. Verification was
unchanged: Crossref *and* Europe PMC for everything.

Registry corrections this round:

- **Watkins** is J Small Anim Pract 2025;66(2):110-120, doi `10.1111/jsap.13797`. Crossref's
  top bibliographic hit was a **BSAVA congress abstract** under a different DOI
  (`10.22233/9781913859411.34.4`), and the connector reported 2024. Europe PMC had the
  journal article. A title search returning *something* is not the same as it returning the
  right thing — check the container title.
- **McCord**'s print year is 2026, not the 2025 the connector gave.
- **Mayhew 2021** paginates `O67-O77` in a supplement; Crossref deposited no pages at all.

Three more names now cover two works each and are year-keyed: **Glickman** (1994 risk
factors, 2000 non-dietary risk factors), **Mayhew** (2021 laparoscopic repair, 2022 BOAS
surgery) and **Allenspach** (2007 risk factors, 2016 long-term outcome).

⚠️ **A third prefix trap**: `Allen` is a prefix of `Allenspach`, so `parseSources` tests
Allenspach first. Wrong order puts a GDV gastropexy review on the eosinophilic
gastroenteritis page — plausible enough to survive review, which is the whole problem.
Pinned by test, as Anderson/Anders and Longeri/Lo are.

⚠️ **Marks is keyed on the author, not on `ACVIM 2018`.** The year 2018 is already taken in
`ACVIM_BY_YEAR` by the systemic-hypertension statement, so an `(ACVIM 2018)` marker on the
ulcer page would have printed a blood-pressure guideline. Both resolutions are pinned.

*Eosinophilic gastroenteritis (`DIS-GI-EOGAST`)*

> Allenspach K, Wieland B, Gröne A, Gaschen F. Chronic enteropathies in dogs: evaluation of risk factors for negative outcome. J Vet Intern Med. 2007;21(4):700-708. doi:10.1111/j.1939-1676.2007.tb03011.x

> Allenspach K, Culverwell C, Chan D. Long-term outcome in dogs with chronic enteropathies: 203 cases. Vet Rec. 2016;178(15):368. doi:10.1136/vr.103557

This page is the thinnest of the fifteen for primary evidence — eosinophilic gastroenteritis
as a named entity has very little of its own literature, and these two are cited for the
broader chronic-enteropathy claims (diet-responsive disease is the largest and best-outcome
group; relapse is common long term) rather than for anything eosinophil-specific.

*Gastric ulceration (`DIS-GI-ULC`)*

> Marks SL, Kook PH, Papich MG, Tolbert MK, Willard MD. ACVIM consensus statement: support for rational administration of gastrointestinal protectants to dogs and cats. J Vet Intern Med. 2018;32(6):1823-1840. doi:10.1111/jvim.15337

> Bazelle J, Threlfall A, Whitley N. Gastroprotectants in small animal veterinary practice — a review of the evidence. Part 1: cyto-protective drugs. J Small Anim Pract. 2018;59(10):587-602. doi:10.1111/jsap.12867

> Shaevitz MH, Moore GE, Fulkerson CM. A prospective, randomized, placebo-controlled, double-blinded clinical trial comparing the incidence and severity of gastrointestinal adverse events in dogs with cancer treated with piroxicam alone or in combination with omeprazole or famotidine. J Am Vet Med Assoc. 2021;259(4):385-391. doi:10.2460/javma.259.4.385

Shaevitz is cited for a **harm** result: adding omeprazole or famotidine to piroxicam made
GI adverse events more frequent and more severe than placebo. The page says so next to the
misoprostol line, because the obvious wrong inference from "PPI first-line for ulcers" is
"PPI prophylaxis alongside NSAIDs", and the trial says otherwise.

*GDV (`DIS-GI-GDV`)*

> de Papp E, Drobatz KJ, Hughes D. Plasma lactate concentration as a predictor of gastric necrosis and survival among dogs with gastric dilatation-volvulus: 102 cases (1995-1998). J Am Vet Med Assoc. 1999;215(1):49-52. doi:10.2460/javma.1999.215.01.49

> Zacher LA, Berg J, Shaw SP, Kudej RK. Association between outcome and changes in plasma lactate concentration during presurgical treatment in dogs with gastric dilatation-volvulus: 64 cases (2002-2008). J Am Vet Med Assoc. 2010;236(8):892-897. doi:10.2460/javma.236.8.892

> Green TI, Tonozzi CC, Kirby R, Rudloff E. Evaluation of initial plasma lactate values as a predictor of gastric necrosis and initial and subsequent plasma lactate values as a predictor of survival in dogs with gastric dilatation-volvulus: 84 dogs (2003-2007). J Vet Emerg Crit Care. 2011;21(1):36-44. doi:10.1111/j.1476-4431.2010.00599.x

> Ward MP, Patronek GJ, Glickman LT. Benefits of prophylactic gastropexy for dogs at risk of gastric dilatation-volvulus. Prev Vet Med. 2003;60(4):319-329. doi:10.1016/s0167-5877(03)00142-9

> Glickman LT, Glickman NW, Schellenberg DB, Raghavan M, Lee T. Non-dietary risk factors for gastric dilatation-volvulus in large and giant breed dogs. J Am Vet Med Assoc. 2000;217(10):1492-1499. doi:10.2460/javma.2000.217.1492

> Glickman LT, Glickman NW, Pérez CM, Schellenberg DB, Lantz GC. Analysis of risk factors for gastric dilatation and dilatation-volvulus in dogs. J Am Vet Med Assoc. 1994;204(9):1465-1471. doi:10.2460/javma.1994.204.09.1465

> O'Neill DG, Case J, Boag AK, et al. Gastric dilation-volvulus in dogs attending UK emergency-care veterinary practices: prevalence, risk factors and survival. J Small Anim Pract. 2017;58(11):629-638. doi:10.1111/jsap.12723

> Allen P, Paul A. Gastropexy for prevention of gastric dilatation-volvulus in dogs: history and techniques. Top Companion Anim Med. 2014;29(3):77-80. doi:10.1053/j.tcam.2014.09.001

> McCord MA, O'Brien J, Ryave J, et al. Gastric dilatation-volvulus is associated with Poodle breeds, increased body size, and male sex, but not primary diet type or anxiety in the Dog Aging Project cohort. J Am Vet Med Assoc. 2026;264(4):1-9. doi:10.2460/javma.25.09.0609

⚠️ **The `>6 mmol/L` lactate rule is not settled.** de Papp is where it comes from (99% vs
58% survival either side of the cut-off, but sensitivity for necrosis only 61%). Green then
found **no** significant relationship at that threshold in 84 dogs. Zacher shows the
*change* in lactate after resuscitation discriminates better than the initial value. All
three are on the page; the pearl's flat "lactate >6 = high risk" now has the contradiction
next to it.

Note also that Ward gives the Great Dane lifetime risk as **36.7%** (95% CI 25.2-44.6%)
where the breed field says "~42%". The page keeps its figure and cites Ward's alongside
rather than silently changing a number nobody can trace.

*Hiatal hernia (`DIS-GI-HH`)*

> Phillips H, Corrie J, Engel DM, et al. Clinical findings, diagnostic test results, and treatment outcome in cats with hiatal hernia: 31 cases (1995-2018). J Vet Intern Med. 2019;33(5):1970-1976. doi:10.1111/jvim.15583

> Reeve EJ, Sutton D, Friend EJ, Warren-Smith CMR. Documenting the prevalence of hiatal hernia and oesophageal abnormalities in brachycephalic dogs using fluoroscopy. J Small Anim Pract. 2017;58(12):703-708. doi:10.1111/jsap.12734

> Mayhew PD, Balsa IM, Marks SL, et al. Clinical and videofluoroscopic outcomes of laparoscopic treatment for sliding hiatal hernia and associated gastroesophageal reflux in brachycephalic dogs. Vet Surg. 2021;50(suppl 1):O67-O77. doi:10.1111/vsu.13622

> Mayhew PD, Marks SL, Pollard R, Balsa IM, Culp WTN, Giuffrida MA. Effect of conventional multilevel brachycephalic obstructive airway syndrome surgery on clinical and videofluoroscopic evidence of hiatal herniation and gastroesophageal reflux in dogs. Vet Surg. 2022;52(2):238-248. doi:10.1111/vsu.13906

> Watkins M, Shales C, Thomas G, Rossanese M, Sparks T, White R. Comparison of outcomes in dogs undergoing hiatal hernia repair with and without use of a gastropexy: 41 cases (2012-2022). J Small Anim Pract. 2025;66(2):110-120. doi:10.1111/jsap.13797

Phillips is the source of essentially every feline figure the page already carried —
`20/31 cats >3 years`, `29%` rhinitis/BOAS trigger, `77.4%` comorbidities, `2,559` vs `771`
days — all uncited until now. Mayhew 2022 is cited **against** the page's own pearl: after
multilevel BOAS surgery, owners reported less regurgitation but videofluoroscopy showed no
change in herniation or reflux.

*Pyloric stenosis (`DIS-GI-PYL`)*

> Bellenger CR, Maddison JE, MacPherson GC, Ilkiw JE. Chronic hypertrophic pyloric gastropathy in 14 dogs. Aust Vet J. 1990;67(9):317-320. doi:10.1111/j.1751-0813.1990.tb07813.x

Like the eosinophilic page, this one is thin on primary evidence. Bellenger is the classic
description of the acquired form and is the basis for the page's new warning that
pyloromyotomy alone does not address mucosal hypertrophy.

**Disease pages 16-20 — primary literature (added 2026-09-21)**

Discovered **entirely through Crossref's bibliographic search** — the Consensus connector's
monthly quota was still exhausted. Verification was unchanged: Crossref *and* Europe PMC.
This works, but it needs a title or author to aim at, so it finds papers you already suspect
exist rather than surfacing ones you did not know about. That shows in the thin reference
counts on the two diabetes-insipidus pages.

Europe PMC again carried the print year and the fuller initials where Crossref had the
online-first date and truncated given names: **Daniaux is 2014**, not the 2013 Crossref
deposited; **Behrend EN** not "Behrend E"; **Pérez-Alenza MD** not "Pérez-Alenza M".

*Feline GI eosinophilic sclerosing fibroplasia (`DIS-GI-FGESF`)*

> Craig LE, Hardam EE, Hertzke DM, Flatland B, Rohrbach BW, Moore RR. Feline gastrointestinal eosinophilic sclerosing fibroplasia. Vet Pathol. 2009;46(1):63-70. doi:10.1354/vp.46-1-63

> Linton M, Nimmo JS, Norris JM, et al. Feline gastrointestinal eosinophilic sclerosing fibroplasia: 13 cases and review of an emerging clinical entity. J Feline Med Surg. 2015;17(5):392-404. doi:10.1177/1098612x14568170

Craig is the paper that named the entity; Linton is the series the page's figures
(`7/13` Ragdoll, `>70%` male, median 7 years, `58%` eosinophilia) were already quoting
without attribution.

*Alimentary lymphoma (`DIS-GI-LYMP`)*

> Kiselow MA, Rassnick KM, McDonough SP, et al. Outcome of cats with low-grade lymphocytic lymphoma: 41 cases (1995-2005). J Am Vet Med Assoc. 2008;232(3):405-410. doi:10.2460/javma.232.3.405

> Sabattini S, Bottero E, Turba ME, Vicchi F, Bo S, Bettini G. Differentiating feline inflammatory bowel disease from alimentary lymphoma in duodenal endoscopic biopsies. J Small Anim Pract. 2016;57(8):396-401. doi:10.1111/jsap.12494

> Daniaux LA, Laurenson MP, Marks SL, et al. Ultrasonographic thickening of the muscularis propria in feline small intestinal small cell T-cell lymphoma and inflammatory bowel disease. J Feline Med Surg. 2014;16(2):89-98. doi:10.1177/1098612x13498596

> Russell KJ, Beatty JA, Dhand N, et al. Feline low-grade alimentary lymphoma: how common is it? J Feline Med Surg. 2012;14(12):910-912. doi:10.1177/1098612x12454861

Kiselow is the source of the page's `>2 years` claim. The page already cited Marsilio 2023
(the ACVIM chronic-enteropathy consensus) for FISH; Sabattini and Daniaux are the other two
halves of the IBD-vs-lymphoma problem.

*Canine hyperadrenocorticism (`DIS-PUPD-HAC`)*

> Behrend EN, Kooistra HS, Nelson R, Reusch CE, Scott-Moncrieff JC. Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM consensus statement (small animal). J Vet Intern Med. 2013;27(6):1292-1304. doi:10.1111/jvim.12192

> Arenas C, Melián C, Pérez-Alenza MD. Evaluation of 2 trilostane protocols for the treatment of canine pituitary-dependent hyperadrenocorticism: twice daily versus once daily. J Vet Intern Med. 2013;27(6):1478-1485. doi:10.1111/jvim.12207

> Arenas C, Melián C, Pérez-Alenza MD. Long-term survival of dogs with adrenal-dependent hyperadrenocorticism: a comparison between mitotane and twice daily trilostane treatment. J Vet Intern Med. 2014;28(2):473-480. doi:10.1111/jvim.12303

> Barker E, Campbell S, Tebb A, et al. A comparison of the survival times of dogs treated with mitotane or trilostane for pituitary-dependent hyperadrenocorticism. J Vet Intern Med. 2005;19(6):810-815. doi:10.1111/j.1939-1676.2005.tb02769.x

> Nagata N, Kojima K, Yuki M. Comparison of survival times for dogs with pituitary-dependent hyperadrenocorticism in a primary-care hospital: treated with trilostane versus untreated. J Vet Intern Med. 2017;31(1):22-28. doi:10.1111/jvim.14617

⚠️ **Barker has no Europe PMC record** — it predates that index's JVIM coverage, so it is the
second entry in this file (after Daley 1993) verified against Crossref alone. The DOI *is*
registered and the Crossref record is complete; a bare content-negotiation request to
`doi.org` returns **403**, which is Wiley blocking the request, not a bad DOI. Do not read
that 403 as a verification failure.

**Behrend is keyed on the author, not `ACVIM 2013`** — the same decision as Marks on the
ulcer page. Keeping every ACVIM statement on one year map was becoming the single thing most
likely to mis-route a marker, and author keying costs nothing.

*Diabetes insipidus (`DIS-PUPD-CDI`, `DIS-PUPD-NDI`)*

> Harb MF, Nelson RW, Feldman EC, Scott-Moncrieff JC, Griffey SM. Central diabetes insipidus in dogs: 20 cases (1986-1995). J Am Vet Med Assoc. 1996;209(11):1884-1888. doi:10.2460/javma.1996.209.11.1884

> Maddens B, Daminet S, Smets P, Meyer E. Escherichia coli pyometra induces transient glomerular and tubular dysfunction in dogs. J Vet Intern Med. 2010;24(6):1263-1270. doi:10.1111/j.1939-1676.2010.0603.x

One reference each. Both pages describe mechanisms rather than managed diseases with outcome
literature, and neither has much of its own evidence base — Harb remains the reference case
series for canine CDI thirty years on. The claims on those pages that go beyond these two
(the CDI pearl's "pituitary neoplasia most common in dogs, head trauma most common in cats",
the `1.001–1.007` USG range) are **still uncited** and were left that way rather than
attached to a paper that does not actually say them.

**PubMed pass — strengthening the thin pages (2026-09-22)**

Found through the **PubMed connector**, which is what should have been used from the start.
Crossref's bibliographic search only finds papers you already suspect exist; PubMed searches
the literature and returns abstracts. The abstracts are the point — they are what caught the
Bellenger misreading recorded below. Verified against PubMed **and** Crossref.

Reference counts on the five thinnest pages after this pass: FGESF 2→7, CDI 1→6, EOGAST 2→4,
NDI 1→3, pyloric stenosis 2→3.

⚠️⚠️ **A correction to this file's own previous entry.** When `DIS-GI-PYL` was written up from
Bellenger's *bibliographic record alone*, the page was given:

> "Pyloromyotomy alone is inadequate for ACQUIRED mucosal hypertrophy — the redundant mucosa
> must be resected, so pyloroplasty or antrectomy is required (Bellenger 1990)"

**Bellenger says close to the opposite.** The abstract concludes that "relatively minor
surgery (pyloromyotomy) may have a place in the treatment of a selected subgroup of cases":
1 of 7 pyloromyotomy dogs relapsed, and the one fatal complication in the series followed a
**pyloroplasty**. That sentence was general surgical knowledge attached to a citation that
did not support it — exactly the failure mode this whole file exists to prevent, and it got
through because a Crossref record has no abstract to check against. The page now carries
Bellenger's actual findings. **Do not cite from a bibliographic record alone.**

Bellenger also supplies detail the page was asserting uncited: 10/14 male, mean age 8.2 years,
mean weight 6.5 kg, Shih Tzu and Maltese commonest, hypokalaemia 11/12, hypochloraemia 10/11,
metabolic alkalosis 5/6, and a mean symptom-free survival of 20 months in the 11 survivors.

*FGESF (`DIS-GI-FGESF`)*

> Černá P, Lopez-Jimenez C, Fukushima K, et al. Clinicopathological findings, treatment, and outcome in 60 cats with gastrointestinal eosinophilic sclerosing fibroplasia. J Vet Intern Med. 2024;38(2):1005-1012. doi:10.1111/jvim.16992

> Thieme ME, Olsen AM, Woolcock AD, Miller MA, Simons MC. Diagnosis and management of a case of retroperitoneal eosinophilic sclerosing fibroplasia in a cat. JFMS Open Rep. 2019;5(2):2055116919867178. doi:10.1177/2055116919867178

> Duclos AA, Wolfe A, Mooney CT. Intrathoracic eosinophilic sclerosing fibroplasia with intralesional bacteria in a cat. JFMS Open Rep. 2023;9(2):20551169231199447. doi:10.1177/20551169231199447

> Porras N, Rebollada-Merino A, Rodríguez-Franco F, Calvo-Ibbitson A, Rodríguez-Bertos A. Feline gastrointestinal eosinophilic sclerosing fibroplasia — extracellular matrix proteins and TGF-β1 immunoexpression. Vet Sci. 2022;9(6):291. doi:10.3390/vetsci9060291

> Cridge H. Pythiosis in dogs. Vet Clin North Am Small Anim Pract. 2025;55(2):225-236. doi:10.1016/j.cvsm.2024.11.008

⚠️ **Černá revises two things the page had settled.** The page said the multimodal approach
was "most common and most effective"; in 60 cats survival did **not** differ significantly
between surgical resection and medical therapy alone, and only 37% were resected while 98%
got corticosteroids. It also said outcomes were "variable... poor with delayed management";
Černá reports **88% still alive** and states plainly that the prognosis is better than
previously reported. Both page lines were rewritten. Thieme is the `day 732` case the page
was already quoting; Porras is the source for the TGF-β1 claim.

Cridge 2025 is a **third** Cridge paper in this file (with the 2018 cPL comparison and the
2021 neostigmine study) — the year keying already in place absorbed it without change.

*Eosinophilic gastroenteritis (`DIS-GI-EOGAST`)*

> Sattasathuchana P, Steiner JM. Canine eosinophilic gastrointestinal disorders. Anim Health Res Rev. 2014;15(1):76-86. doi:10.1017/s1466252314000012

> Beaumier A, Batista Linhares M, Rush JE, Piedra-Mora C. Hypereosinophilic syndrome with cardiac infiltration and congestive heart failure in a cat. J Vet Cardiol. 2022;41:11-17. doi:10.1016/j.jvc.2021.12.009

Sattasathuchana is the authoritative review the page lacked, and supports the page's own
claim that response and prognosis are worse than for other chronic gastroenteritides — in
**dogs**, not only cats, which the page had implied was a feline-only problem.

*Pyloric lesions (`DIS-GI-PYL`)*

> Tanaka T, Wada Y, Noguchi S, Nishida H, Akiyoshi H. Contrast-enhanced CT features of pyloric lesions in 17 dogs: case series. Vet Radiol Ultrasound. 2022;64(2):262-270. doi:10.1111/vru.13193

Gives a usable benign-versus-malignant discriminator: hyperplasia, adenoma and polyposis
involve the mucosal layer; adenocarcinoma involves the outer layer with lymphomegaly.

*Central diabetes insipidus (`DIS-PUPD-CDI`)*

> Teshima T, Hara Y, Taoda T, Teramoto A, Tagawa M. Central diabetes insipidus after transsphenoidal surgery in dogs with Cushing’s disease. J Vet Med Sci. 2011;73(1):33-39. doi:10.1292/jvms.10-0129

> Croton C, Purcell S, Schoep A, Haworth M. Successful treatment of transient central diabetes insipidus following traumatic brain injury in a dog. Case Rep Vet Med. 2019;2019:3563675. doi:10.1155/2019/3563675

> Bellis T, Daly M, Davidson B. Central diabetes insipidus following cardiopulmonary arrest in a dog. J Vet Emerg Crit Care. 2015;25(6):745-750. doi:10.1111/vec.12398

> Evenhuis J, Epstein SE, Della-Maggiore A, Reagan KL. Congenital pituitary cyst resulting in adipsic central diabetes insipidus and secondary hypernatremia in a cat. JFMS Open Rep. 2021;7(1):2055116921990294. doi:10.1177/2055116921990294

> Paulin MV, Gleasure S, Snead EC. Multiple pituitary hormone deficiencies in a kitten: hyposomatotropism, hypothyroidism, central diabetes insipidus and hypogonadism. Can Vet J. 2023;64(3):245-251.

Paulin carries **no DOI** — *Can Vet J* is PMC-deposited without one (PMC9979728). It is the
third entry in this file without a DOI, after Anderson 2000 and the Miceli conference
abstract. Do not construct one.

These five are case reports and a small cohort, which is what the canine/feline CDI
literature consists of. They are cited for what each one actually shows — a mechanism, a
transient course, a species difference — not as evidence of frequency. The page's claim that
**post-traumatic and post-arrest CDI can be transient** is new and load-bearing: it argues
for trialling withdrawal of desmopressin rather than assuming lifelong treatment.

*Nephrogenic diabetes insipidus (`DIS-PUPD-NDI`)*

> Etish JL, Chapman PS, Klag AR. Acquired nephrogenic diabetes insipidus in a dog with leptospirosis. Ir Vet J. 2014;67(1):7. doi:10.1186/2046-0481-67-7

> Ku D, Lee D, Yun T, et al. Transient distal renal tubular acidosis with nephrogenic diabetes insipidus after general anaesthesia in a dog. Vet Med Sci. 2023;9(4):1483-1487. doi:10.1002/vms3.1165

Etish matters clinically beyond the citation: hyposthenuria was the **first** sign, weeks
before azotaemia, and the dog was a zoonotic risk the whole time.

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

## Journal articles cited in the sign flows and Dx views

Primary literature cited inline in the sign flows and diagnostic-approach views, where a
textbook alone could not settle a number. Distinct from **Journal sources cited in app data**
above, which covers `diseaseReferences.tsx` and is held to a two-registry standard: the
citations below were checked against the publisher's own record and PubMed, **not** against
both Crossref and Europe PMC. Treat the DOIs as publisher-confirmed rather than
registry-cross-verified, and promote an entry into the Verified section once it has been. **AMA journal format:** `Author AA, Author BB, Author CC. Title of article.
*Abbrev Journal*. Year;vol(issue):pages. doi:xx.xxxx/yyyy` — up to 6 authors, then `et al`.

The inline shorthand in app data is `(FirstAuthor Year Journal)`, matching the existing
`(Ettinger Ch NN)` convention. **App copy carries no hyperlinks** — `RichText` drops `<a>`
and `href` by design (`src/components/RichText.tsx`), so the DOIs live here only.

### Weight-loss thresholds (`src/lib/signs/dx/weightLoss.ts`, `src/lib/signs/flows/weightLoss.ts`)

> Ineson DL, Freeman LM, Rush JE. Clinical and laboratory findings and survival time associated with cardiac cachexia in dogs with congestive heart failure. *J Vet Intern Med*. 2019;33(5):1902-1908. doi:10.1111/jvim.15566

Defines cachexia as muscle loss **or** weight loss ≥5% in ≤12 months; cachexia so defined was
independently associated with shorter survival on multivariable analysis (P = .05). This is
the load-bearing citation for the ≥5%/≤12-month threshold.

> Freeman LM, Lachaud MP, Matthews S, Rhodes L, Zollers B. Evaluation of weight loss over time in cats with chronic kidney disease. *J Vet Intern Med*. 2016;30(5):1661-1666. doi:10.1111/jvim.14561

569 cats, 6 US centres. Median 8.9% of body weight lost in the 12 months before diagnosis;
growth-curve analysis put the onset up to 3 years before diagnosis; rate accelerated after.
Median body weight at diagnosis 4.2 kg, and cats <4.2 kg had shorter survival (P < .0001).

> Peterson ME, Castellano CA, Rishniw M. Evaluation of body weight, body condition, and muscle condition in cats with hyperthyroidism. *J Vet Intern Med*. 2016;30(6):1780-1789. doi:10.1111/jvim.14591

462 untreated hyperthyroid cats. Pretreatment weight median 4.36 kg vs premorbid 5.45 kg
recorded 1–2 years earlier (P < .0001); 92.0% had lost weight, but only 35.3% scored thin or
emaciated while 77.3% had muscle loss. The BCS-insensitivity point on the Exam tab.

> Freeman LM. Cachexia and sarcopenia: emerging syndromes of importance in dogs and cats. *J Vet Intern Med*. 2012;26(1):3-17. doi:10.1111/j.1939-1676.2011.00838.x

Review. Notes the human ≥5%/12-month cachexia criterion is criticised for **missing early
cachexia**, and argues for muscle condition scoring independent of total weight. Cites Michel
et al: of dogs with prediagnosis weights before a cancer diagnosis, 31% had lost <5%, 14%
5–10%, and 23% >10% of body weight over 12 months.

> White JV, Guenter P, Jensen G, Malone A, Schofield M; Academy of Nutrition and Dietetics Malnutrition Work Group; A.S.P.E.N. Board of Directors. Consensus statement: Academy of Nutrition and Dietetics and American Society for Parenteral and Enteral Nutrition: characteristics recommended for the identification and documentation of adult malnutrition (undernutrition). *JPEN J Parenter Enteral Nutr*. 2012;36(3):275-283. doi:10.1177/0148607112440285

Human. Source of the 10% figure and of its **time window**: in chronic illness, non-severe
malnutrition = 5%/1 mo, 7.5%/3 mo, 10%/6 mo, 20%/1 y; severe = the same figures exceeded.
10% is a **6-month** number, never a monthly one.

> Wallace JI, Schwartz RS, LaCroix AZ, Uhlmann RF, Pearlman RA. Involuntary weight loss in older outpatients: incidence and clinical significance. *J Am Geriatr Soc*. 1995;43(4):329-337. doi:10.1111/j.1532-5415.1995.tb05803.x

Human, 247 outpatients ≥65 y, 4-year prospective cohort. Involuntary loss of ≥4% of body
weight over a year carried a 2-year mortality of 28% vs 11% (RR 2.43, 95% CI 1.34–4.41) —
the origin of the low single-digit *annual* threshold Ettinger Ch 18 imports.

---

**Disease pages 21-25 — primary literature (added 2026-09-22)**

PubMed-first discovery under the evidence bar below. Verified against Crossref, and against
Europe PMC where Crossref does not hold the record.

Two **print-year corrections**, both because PubMed carries the online-first date:

- Wiinberg's TEG-versus-bleeding paper is **2009**;179(1):121-129, not 2007.
- Wiinberg's scoring-system paper is **2010**;185(3):292-298, not 2009.

Three Wiinberg papers now sit in the file, so the marker is year-keyed. Note also that
**Wainberg** (feline ventral bulla osteotomy, 2019) and **Wiinberg** (canine DIC) are
different authors whose names differ by two letters; both are asserted in the test suite.

*Megaoesophagus (`DIS-OES-MEGA`)*

> Mignan T, Targett M, Lowrie M. Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats. J Vet Intern Med. 2020;34(5):1707-1717. doi:10.1111/jvim.15855

> Grobman M. Aerodigestive disease in dogs. Vet Clin North Am Small Anim Pract. 2021;51(1):17-32. doi:10.1016/j.cvsm.2020.09.003

This page was carrying **no citations at all** while five directly relevant papers were
already in this file from the myasthenia/megaoesophagus work — Shelton 2001, Forgash 2021,
Cridge 2021, Dewey 2010 and Quintavalla 2017. All five are now wired in; the page went from
0 to 7 references, only two of which are new to the file.

Quintavalla is the sildenafil RCT and its numbers are now on the page with its **sample size
stated** — 21 puppies. Real randomised evidence, but small, and it acts on sphincter tone
rather than restoring peristalsis, which the page now says.

*DIC (`DIS-BD-DIC`)*

> Wiinberg B, Jensen AL, Johansson PI, Rozanski E, Tranholm M, Kristensen AT. Thromboelastographic evaluation of hemostatic function in dogs with disseminated intravascular coagulation. J Vet Intern Med. 2008;22(2):357-365. doi:10.1111/j.1939-1676.2008.0058.x

> Wiinberg B, Jensen AL, Rozanski E, et al. Tissue factor activated thromboelastography correlates to clinical signs of bleeding in dogs. Vet J. 2009;179(1):121-129. doi:10.1016/j.tvjl.2007.08.022

> Wiinberg B, Jensen AL, Johansson PI, et al. Development of a model based scoring system for diagnosis of canine disseminated intravascular coagulation with independent assessment of sensitivity and specificity. Vet J. 2010;185(3):292-298. doi:10.1016/j.tvjl.2009.06.003

> Estrin MA, Wehausen CE, Jessen CR, Lee JA. Disseminated intravascular coagulation in cats. J Vet Intern Med. 2006;20(6):1334-1339. doi:10.1892/0891-6640(2006)20[1334:dicic]2.0.co;2

⚠️ Estrin's bracketed DOI is **not in Crossref** — that DOI series predates their coverage of
it. PubMed and Europe PMC both hold it and agree, so the two-registry rule is met without
Crossref. Do not read its absence there as a bad DOI.

⚠️ **The page's `~91% sensitive, ~90% specific` is the DEVELOPMENT cohort.** On independent
prospective validation Wiinberg's model fell to 83% sensitive and 77% specific. The page now
carries both, because the first pair alone reads like a rule-in test.

⚠️ **The page's `~63% mortality overt versus ~13% nonovert` does not match Wiinberg 2008**,
which gives 64% fatality in hypocoagulable versus 32% in hypercoagulable dogs. The page keeps
its own figures and states Wiinberg's beside them, flagging that the percentages depend on how
the phase was defined. The source of the 63/13 pair is still untraced.

Estrin is the whole basis for the feline prognosis: **46 cats, 3 survived, 43 died**, and
prolonged PT was the only variable separating them. Haemorrhage in just 7 of 46 — the reason
"dogs bleed, cats clot" is on the page. Estrin also found **no** association between outcome
and either transfusion or heparin, which is now stated next to the heparin/ATIII line.

*Coagulation factor deficiencies (`DIS-BD-FX`, `DIS-BD-FII`, `DIS-BD-FVII`)*

> Callan MB, Aljamali MN, Margaritis P, et al. A novel missense mutation responsible for factor VII deficiency in research Beagle colonies. J Thromb Haemost. 2006;4(12):2616-2622. doi:10.1111/j.1538-7836.2006.02203.x

> Clark JA, Hooser SB, Dreger DL, Burcham GN, Ekenstedt KJ. Investigation of a common canine factor VII deficiency variant in dogs with unexplained bleeding on autopsy. J Vet Diagn Invest. 2022;34(5):806-812. doi:10.1177/10406387221118581

> Gookin JL, Brooks MB, Catalfamo JL, Bunch SE, Muñana KR. Factor X deficiency in a cat. J Am Vet Med Assoc. 1997;211(5):576-579. doi:10.2460/javma.1997.211.05.576

Callan confirms the page's `c.407G>A` as the G96E substitution, with activity ≤4% in affected
Beagles and a 31% mutant allele frequency in one research colony. Clark is cited for a
**negative** result that limits the test: in 67 autopsied dogs with unexplained haemorrhage,
every one was homozygous wild-type, so the variant explained none of them and screening for it
alone is low-yield post mortem.

Gookin is **n=1** and every claim drawn from it is hedged as "some clinicians reported" — the
seizure association in particular is anecdotal from a single cat.

⚠️ **`DIS-BD-FII` has no references and is deliberately left that way.** Nothing citable was
found for canine factor II deficiency — it is genuinely that rare. The page's claims about the
boxer dysfunctional-prothrombin form, the autosomal inheritance and the 3-day duration of
transfusion effect remain **uncited**, and were not propped up on a factor VII or factor X
paper that does not cover them. The reference-count test asserts zero for that page so the
gap stays visible rather than being quietly filled later.

**Disease pages 26-30 — primary literature (added 2026-09-23)**

*IMHA (`DIS-BD-IMHA`)*

> Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33(2):313-334. doi:10.1111/jvim.15441

The **diagnosis** half of the ACVIM pair. The treatment half (Swann 2019) was already in this
file and the page already cited it as `(ACVIM 2019)`; the diagnosis half was missing while the
page's entire `conf` section — the diagnostic triad, saline agglutination, DAT, baseline
testing before immunosuppression — and its graded comorbidity language ("B. gibsoni
intermediate-high evidence", "Mycoplasma haemofelis high evidence") came straight out of it.

⚠️ **Garden is keyed on the AUTHOR, not `ACVIM 2019`.** That year is taken in `ACVIM_BY_YEAR`
by the treatment statement, and this page cites both. Third instance of this decision, after
Marks and Behrend. Both resolutions are pinned by test.

*Haemophilia A (`DIS-BD-HEMA`)*

> Aslanian ME, Sharp CR, Rozanski EA, de Laforcade AM, Rishniw M, Brooks MB. Clinical outcome after diagnosis of hemophilia A in dogs. J Am Vet Med Assoc. 2014;245(6):677-683. doi:10.2460/javma.245.6.677

> Nguyen GN, Everett JK, Kafle S, et al. A long-term study of AAV gene therapy in dogs with hemophilia A identifies clonal expansions of transduced liver cells. Nat Biotechnol. 2020;39(1):47-55. doi:10.1038/s41587-020-0741-7

> Batty P, Fong S, Franco M, et al. Vector integration and fate in the hemophilia dog liver multiple years after AAV-FVIII gene transfer. Blood. 2024;143(23):2373-2385. doi:10.1182/blood.2023022589

> Fowler KM, Bolton TA, Rossmeisl JH, et al. Clinical, diagnostic, and imaging findings in three juvenile dogs with paraspinal hyperesthesia or myelopathy as a consequence of hemophilia A: a case report. Front Vet Sci. 2022;9:871029. doi:10.3389/fvets.2022.871029

Aslanian is the 39-dog series the prognosis field was already quoting. Its **design is now
stated on the page**: a survey of clinicians, not a clinical cohort, so ascertainment is
uneven. Fowler is **n=3** and hedged as "some clinicians reported".

⚠️ **The gene-therapy line was overstated and is rewritten.** The page said "investigational,
>90% reduction in bleeds in dogs" — a figure not found in either long-term study. Nguyen
followed 9 dogs up to 10 years and reports factor VIII corrected to **1.9-11.3% of normal**,
together with **clonal expansion of transduced liver cells** (44% of integration sites near
growth-related genes) and an explicit call for genotoxicity monitoring. Batty's decade-long
cohort found predominantly episomal vector and no tumours. Both are on the page, and it now
says plainly that these are **purpose-bred colony dogs, not patients**.

*Immune-mediated neutropenia (`DIS-IMNP`)*

> Devine L, Armstrong PJ, Whittemore JC, et al. Presumed primary immune-mediated neutropenia in 35 dogs: a retrospective study. J Small Anim Pract. 2017;58(6):307-313. doi:10.1111/jsap.12636

> Scott TN, Bailin HG, Jutkowitz LA, Scott MA, Lucidi CA. Bone marrow, blood, and clinical findings in dogs treated with phenobarbital. Vet Clin Pathol. 2021;50(1):122-131. doi:10.1111/vcp.13013

Devine is the only cohort of any size and is the source of the page's "all 33 resolved within
a month" and "~one third relapse". Scott is cited as a **differential warning**: the marrow
picture of phenobarbital-induced cytopenia can be indistinguishable from immune-mediated
neutropenia, so the drug history matters before treating.

⚠️ **`DIS-BD-HEMB` and `DIS-BD-HEMC` have no references and are deliberately left that way.**
Their breed-specific variant claims are precise — German wirehaired pointer 1.5-kb intron 5
insertion, Lhasa apso nt 772-777 deletion, Rhodesian ridgeback c.731G>A, Kerry blue terrier
90 bp exonic SINE, Maine Coon F11 c.1546G>A — and precise enough that a source must exist,
but nothing was found through PubMed or Crossref in this pass. They remain **uncited** rather
than attached to a haemophilia A paper that does not cover them. The reference-count test
asserts zero for both, as it does for `DIS-BD-FII`, so the gap stays visible. These three
pages are the obvious target for a dedicated search pass.

### Pages 31-34 — Evans syndrome, leptospirosis, ehrlichiosis (2026-09-23)

The first batch of the "every disease page cites at least one peer-reviewed paper" pass.

**`DIS-BD-EVANS`** needed no new verification: the ACVIM IMHA diagnosis (Garden 2019),
IMHA treatment (Swann 2019) and ITP diagnosis/treatment (LeVine 2024) statements were all
already in `diseaseReferences.tsx`, attached to other pages, and each covers one arm of the
Evans diagnosis. Both arms now have to be proven independently on the page, which is what the
consensus criteria actually require.

**`DIS-INFECT-LEPTO`** — three sources:

> Sykes JE, Francey T, Schuller S, Stoddard RA, Cowgill LD, Moore GE. Updated ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37(6):1966-1982. doi:10.1111/jvim.16903

> Knöpfler S, Mayer-Scholl A, Luge E, et al. Evaluation of clinical, laboratory, imaging findings and outcome in 99 dogs with leptospirosis. J Small Anim Pract. 2017;58(10):582-588. doi:10.1111/jsap.12718

> Buser FC, Schweighauser A, Im Hof-Gut M, et al. Evaluation of C-reactive protein and its kinetics as a prognostic indicator in canine leptospirosis. J Small Anim Pract. 2019;60(8):477-485. doi:10.1111/jsap.13004

The 2023 statement **supersedes the 2010 one the page was written against**, and two of its
changes contradicted the page as it stood: the "large outdoor working dog" risk picture is
retired (small urban dogs, puppies from 11 weeks and geriatric dogs are all affected, as are
dogs vaccinated with 2-serovar products), and vaccination is now recommended broadly in
endemic regions rather than by lifestyle risk. Both were written in. The statement also says
the MAT does not reliably identify the infecting serogroup — the page previously implied the
titre pattern was informative about serovar, which is now corrected.

Knöpfler is the largest single cohort and supplies the frequency data (renal 95%, hepatic 92%,
pulmonary 58%, multi-organ 98/99; lethargy 96%, anorexia 88%, vomiting 85%) and the outcome
figure (32/99 died). Buser is **41 dogs**, so its CRP-kinetics finding is hedged on the page as
"Some clinicians reported…" per the evidence bar below.

**`DIS-INFECT-EHRLICH`** and **`DIS-BD-EHRL`** share three sources:

> Chochlios TA, Angelidou E, Kritsepi-Konstantinou M, Koutinas CK, Mylonakis ME. Seroprevalence and risk factors associated with Ehrlichia canis in a hospital canine population. Vet Clin Pathol. 2019;48(2):305-309. doi:10.1111/vcp.12736

> Christodoulou V, Meletis E, Kostoulas P, et al. Clinical and clinicopathologic discriminators between canine acute monocytic ehrlichiosis and primary immune thrombocytopenia. Top Companion Anim Med. 2023;52:100750. doi:10.1016/j.tcam.2022.100750

> Mylonakis ME, Ceron JJ, Leontides L, et al. Serum acute phase proteins as clinical phase indicators and outcome predictors in naturally occurring canine monocytic ehrlichiosis. J Vet Intern Med. 2011;25(4):811-817. doi:10.1111/j.1939-1676.2011.0728.x

Registry disagreement on Christodoulou: **PubMed dates it 2022** (epub 28 Nov 2022), Crossref
gives the print volume as **2023;52**. The print year wins, so the marker is `Christodoulou 2023`.

Chochlios is the large one (850 dogs) and carries the finding that actually changes practice:
in-clinic kits disagree with each other on the same dogs (ImmunoComb vs SNAP 3Dx/4Dx), so a
clinically important negative needs a second method. It also gives the endemic-area base rates
(54.9% of sick dogs seropositive, 33.9% of healthy) — which is why a positive titre alone is
not a diagnosis there, a caveat the page did not previously carry.

Christodoulou is **35 CME vs 29 ITP**, small enough that its discriminator list is hedged as
"some clinicians reported". Mylonakis is 56 dogs; its pancytopenia odds ratio for death (22.7,
neutropenia alone 7.7) is quoted with the sample size inline. Mylonakis is also cited **against**
a natural assumption: the acute-phase proteins stage the disease but did **not** predict survival,
so the page says so rather than implying they are prognostic.

A note on the new source names: `Chochlios` and `Christodoulou` share a two-letter head and sit
alongside the existing `Chalifoux` and `Chirayath`. None is a prefix of another, but the resolver
matches on `/^Name/` with no word boundary, so all four are pinned in the prefix-trap test.

### Pages 35-41 — FIP, RMSF, babesiosis, rodenticide, leishmaniosis, vWD, lungworm (2026-09-23)

**`DIS-INFECT-FIP`** — Taylor 2023 is 307 cats on **legally sourced, known-composition**
product, which is what makes its numbers usable: 84.4% alive at last follow-up, 10.8% relapse
with roughly half of those relapsing *during* the initial course, injection pain in 47.8% of
cats given subcutaneous remdesivir, and a complete response within 30 days predicting survival
to the end of treatment. Pedersen 2019 supplies the 12-week floor. Dickinson is **four cats**
and Lv 2022 is uncontrolled, so both are hedged.

> Taylor SS, Coggins S, Barker EN, et al. J Feline Med Surg. 2023;25(9). doi:10.1177/1098612X231194460
> Pedersen NC, Perron M, Bannasch M, et al. J Feline Med Surg. 2019;21(4):271-281. doi:10.1177/1098612X19825701
> Lv J, Bai Y, Wang Y, Yang L, Jin Y, Dong J. Front Vet Sci. 2022;9:1002488. doi:10.3389/fvets.2022.1002488
> Dickinson PJ, Bannasch M, Thomasy SM, et al. J Vet Intern Med. 2020;34(4):1587-1593. doi:10.1111/jvim.15780

**`DIS-INFECT-RMSF`** — Levin 2014 is the only description of the natural tick-bite course from
exposure to recovery. Two of its findings are cited **against** what a clinician would assume:
neither fever height/duration nor a positive blood PCR predicts outcome, and the marker that
does is the apex and fall of the neutrophilia. It is an experimental group, so that is hedged.
Foley 2025 is a review, cited only for the urban-hyperendemic epidemiology it aggregates.

> Levin ML, Killmaster LF, Zemtsova GE, Ritter JM, Langham G. PLoS One. 2014;9(12):e115105. doi:10.1371/journal.pone.0115105
> Foley J, Lopez-Perez AM, Alvarez-Hernandez G, et al. Am J Vet Res. 2025;86(3). doi:10.2460/ajvr.24.11.0368

**`DIS-BD-BABS`** — Goddard, 72 dogs, PCR-confirmed *B. rossi* with *B. vogeli* and *E. canis*
co-infections **excluded**, which is what lets its coagulation findings be read as babesiosis
rather than tick-borne disease in general. Registry disagreement: PubMed dates it 2012, the
print volume is 2013; the print year wins.

> Goddard A, Wiinberg B, Schoeman JP, Kristensen AT, Kjelgaard-Hansen M. Vet J. 2013;196(2):213-217. doi:10.1016/j.tvjl.2012.09.009

**`DIS-BD-ROD`** — Agostini is 74 animals across two hospitals, the only comparison of IV
mixed-micelle phytomenadione against plasma-based therapy. Hedged on that sample size.

> Agostini G, Mooney ET, Wilkie ELW, White JD. Aust Vet J. 2025;103(12):906-915. doi:10.1111/avj.70004

**`DIS-INFECT-LEISHM`** — the 2011 LeishVet guideline is 14 years old but is **still the
operative staging system**, cited as such in 2026 survey papers, so it stays; Rule 1(c) asks for
as current as the literature allows, not for a recent paper at any cost. Miró 2024 is the modern
randomised trial (97 dogs, two years). Kasabalis is 40 dogs and the authors themselves call it
underpowered, so aminosidine is written as second line, not an equal alternative.
Villanueva-Saz is **three dogs** and is cited purely as an existence claim — that clinical
leishmaniosis occurs in seronegative dogs — with no frequency stated.

> Solano-Gallego L, Miro G, Koutinas A, et al. Parasit Vectors. 2011;4:86. doi:10.1186/1756-3305-4-86
> Miro G, Segarra S, Ceron JJ, et al. PLoS Negl Trop Dis. 2024;18(12):e0012712. doi:10.1371/journal.pntd.0012712
> Kasabalis D, Chatzis MK, Apostolidis K, et al. Exp Parasitol. 2020;214:107903. doi:10.1016/j.exppara.2020.107903
> Villanueva-Saz S, Marteles D, Ortunez A, et al. Acta Vet Scand. 2025;67(1):31. doi:10.1186/s13028-025-00814-9

**`DIS-BD-VWD`** — both papers are about **acquired** loss of vWF activity, which is the trap the
page needed covering: a low vWF in a sick dog is not automatically the inherited disease. AKI
produces a type-II-like phenotype (McBride, 10 dogs, hedged), and *Angiostrongylus* acutely
drops vWF and caused a reversible intracranial bleed (Krüger, one dog).

> McBride D, Jepson RE, Cortellini S, Chan DL. J Vet Intern Med. 2019;33(5):2029-2036. doi:10.1111/jvim.15588
> Kruger BT, Hamm Vinga C, Wennemuth J. Vet Radiol Ultrasound. 2025;66(1):e13462. doi:10.1111/vru.13462

**`DIS-RESP-LUNGWORM`** — Thomsen is 180 dogs and gives the bleeding frequency (36.1%), the
intracranial/intraspinal subset (20 dogs) and the survival gap that makes bleeding the
prognostic divide (76.9% vs 94.8% at discharge). Canonne supplies the BAL qPCR point, where
Baermann missed three of five dogs qPCR caught. Canonne's print year is 2016; PubMed says 2015.

> Thomsen AS, Petersen MP, Willesen JL, et al. J Small Anim Pract. 2024;65(4):234-242. doi:10.1111/jsap.13701
> Canonne AM, Roels E, Caron Y, et al. J Small Anim Pract. 2016;57(3):130-134. doi:10.1111/jsap.12419

New source-name prefix hazards pinned in the tests this batch: **`Levin` vs the existing
`LeVine`**, held apart only by the capital V and the trailing e — the resolver's `/^Name/` match
is case-sensitive, so both orders are asserted. Also `Chochlios`/`Christodoulou` alongside the
existing `Chalifoux`/`Chirayath`, and `Canonne` beside `Cook`/`Cridge`.

### Pages 42-44 — zinc, Allium, cholecalciferol (2026-09-23)

> Henke CS, Beal MW, Walton RAL, et al. J Vet Emerg Crit Care. 2023;33(6):676-684. doi:10.1111/vec.13330
> Biasibetti E, Maza V, Tagliati V, et al. Animals (Basel). 2026;16(11):1712. doi:10.3390/ani16111712
> Gerhard C, Jaffey JA. Front Vet Sci. 2020;6:472. doi:10.3389/fvets.2019.00472
> Perry BH, McMichael M, Rick M, Jewell E. Can Vet J. 2016;57(12):1284-1286.

**Henke** is the only zinc series big enough to carry frequencies (55 dogs, six teaching
hospitals). Its AKI figure — 26.9%, which the authors flag as commoner than previously
suspected — changed the page's workup advice from "check renal values if severely haemolysing"
to "check them in every case". It also supplies the two practical numbers: 83% of dogs reached a
stable PCV within a median 24 h of source removal, and two-thirds needed blood products, so
product should be available *before* anaesthetising.

**Biasibetti** is one dog and is cited for one thing only: it died on **16 g of raw garlic**,
below the published toxic threshold. The page now warns against using a gram-per-kilo
calculation to reassure an owner. No frequency is claimed from it.

**Cholecalciferol is the weakest evidence base in this batch.** Both sources are single cases
and both are hedged as such. There is no cohort study of 25(OH)D kinetics after the acute
phase, so the page says "some clinicians reported" and states the sample inline, rather than
turning one dog into a monitoring protocol. Perry is the only one of the papers cited so far
with **no DOI** — Can Vet J articles of that era are PMC-only — so the second-registry check
was done against Europe PMC rather than Crossref, per Rule 6's allowance.

`Perry` vs the existing `Perley` is a new prefix hazard: four shared characters, neither a
prefix of the other. Both are pinned in the resolver test.

### Pages 45-47 — MMVD, DCM, pericardial effusion (2026-09-23)

> Keene BW, Atkins CE, Bonagura JD, et al. J Vet Intern Med. 2019;33(3):1127-1140. doi:10.1111/jvim.15488
> Boswood A, Haggstrom J, Gordon SG, et al. J Vet Intern Med. 2016;30(6):1765-1779. doi:10.1111/jvim.14586
> Summerfield NJ, Boswood A, O'Grady MR, et al. J Vet Intern Med. 2012;26(6):1337-1349. doi:10.1111/j.1939-1676.2012.01026.x
> Carvajal JL, Case JB, Mayhew PD, et al. Vet Surg. 2019;48(S1):O105-O111. doi:10.1111/vsu.13129
> Michelotti KP, Youk A, Payne JT, Anderson J. Vet Surg. 2019;48(6):1032-1041. doi:10.1111/vsu.13223

These three pages already *named* EPIC and PROTECT in their prose while citing only Ettinger for
them. They now cite the trials themselves and quote the actual numbers.

⚠️ **The MMVD consensus is keyed on `Keene`, deliberately not on `ACVIM 2019`.** That year in
`ACVIM_BY_YEAR` already belongs to Swann's IMHA *treatment* statement. A second claim on it would
have printed the wrong paper on whichever page lost the race, with no error anywhere. Both
markers are asserted in the resolver test so the collision cannot be reintroduced.

**PROTECT is cited with its own caveat.** The page said pimobendan "delays CHF/sudden death",
which is true of the time-to-event result (718 vs 441 days; survival 623 vs 466). But the
**proportion** of dogs reaching the primary endpoint was not significantly different (P = .1).
The page now says the drug buys time rather than preventing the outcome — that distinction is in
the paper and was missing from the page.

**Both pericardial papers are small** (18 and 16 dogs) and both are hedged, but they converge on
one message the page needed: an echocardiographically "idiopathic" effusion is not reliably
benign. Carvajal found masses, nodules or adhesions at pericardioscopy in **9 of 18** dogs whose
preoperative echo showed no cause, and those dogs had a median survival of 66 days against
not-reached in the other nine. Michelotti found neoplasia on histopathology in **4 of 16**.
Michelotti also supplies the complication to warn owners about: recurrent *pleural* effusion
killed half the dogs after pericardiectomy.

### Pages 48-50 — feline asthma, tracheal collapse, aspiration pneumonia (2026-09-23)

> Gareis H, Horner-Schmid L, Zablotski Y, Palic J, Hecht S, Schulz B. J Vet Intern Med. 2023;37(6):2443-2452. doi:10.1111/jvim.16874
> Weisse C, Berent A, Violette N, McDougall R, Lamb K. J Am Vet Med Assoc. 2019;254(3):380-392. doi:10.2460/javma.254.3.380
> De Lorenzi D, Maggi G, Bertoncello D, Porciello F, Marchesi MC. J Am Vet Med Assoc. 2024;262(7):1-7. doi:10.2460/javma.23.12.0722
> Kogan DA, Johnson LR, Sturges BK, Jandrey KE, Pollard RE. J Am Vet Med Assoc. 2008;233(11):1748-1755. doi:10.2460/javma.233.11.1748
> Riffe CI, Heinz JA, Patterson CA, Cook AK, Yankin I. J Am Vet Med Assoc. 2025;263(8):1-9. doi:10.2460/javma.24.10.0673

**Kogan** is 88 dogs and contributes two *negative* findings that matter more than the survival
rate (77%): neither radiographic severity nor length of hospitalisation predicted outcome, and
having more than one predisposing disease did not worsen it. The page previously implied a
dramatic film was bad news. It also supplies the ranked causes — oesophageal disease 35, vomiting
34, neurological 24, laryngeal 16, post-anaesthetic 12 — which reorders how the page lists them.

**Riffe** is the stewardship point: in 58 dogs, adding enrofloxacin up front gave no advantage in
survival or severity indices over ampicillin-sulbactam alone. Hedged at that sample size, but the
page now says to reserve escalation for the critically ill rather than starting dual by default.

**Weisse** is 75 dogs and 119 stents, the largest endoluminal series. The page already said
"significant complications are reported" without a number; it now carries **47%** requiring a
further stent procedure, alongside the 93% discharge rate and 1,005-day median survival. Both
numbers belong in the same owner conversation. De Lorenzi (12 dogs) is hedged and is there only
to say grade IV collapse refractory to medical therapy is not automatically hopeless.

**Gareis** is 24 cats. Its useful finding is a *dissociation*: clinical and radiographic scores
both improved significantly on treatment but did **not** correlate with each other. The page now
tells you to judge response on both rather than letting one stand in for the other.

### Pages 51-52 — IVDD, SRMA (2026-09-23)

> Moore SA, Tipold A, Olby NJ, Stein V, Granger N. Front Vet Sci. 2020;7:610. doi:10.3389/fvets.2020.00610
> Low D, Stables S, Kondrotaite L, Garland B, Rutherford S. Vet Surg. 2025;54(4):665-674. doi:10.1111/vsu.14250
> Paterson R, Brady S. Aust Vet J. 2024;102(12):630-632. doi:10.1111/avj.13371
> Gunther C, Steffen F, Alder DS, Beatrice L, Geigy C, Beckmann K. Vet Rec. 2020;187(1):e7. doi:10.1136/vr.105683

⚠️ **`Moore` is now year-keyed**, like ACVIM, Cridge, Rudinsky and the rest. The existing
`moore-metyrapone` is a 2000 feline adrenal case report by a different Moore. A bare `/^Moore/`
match would have printed that case report on the disc page, with nothing to catch it. `Moore 2000`
and `Moore 2020` are both asserted, and an unmapped `Moore 2099` is asserted to yield nothing.

`Low` vs the existing `Lo` looked like the same trap but is not: the Lo branch is written
`/^Lo\b/`, and the word boundary already fails on "Low 2025". Both are pinned anyway so that
stays true if the branch is ever rewritten.

**Moore 2020 is cited against the page in one place and for it in three.** The page carried
"MPSS considered ONLY within 8h of acute trauma in some protocols — highly controversial"; the
review states flatly that high-dose MPSS and PEG are **not recommended** because randomised
controlled trials showed no treatment effect, and that is now on the page. The review also
supplies the 48-hour correction: there is **no evidence** that 48 h of deep-pain-negative status
is a cut-off beyond which locomotor recovery becomes impossible, only uncertainty about how much
timing matters past it. The page previously read as though 48 h closed the window.

**Low** is the number to give an owner in that conversation: **53.1% of 162** deep-pain-negative
dogs regained ambulation after decompressive surgery. (The paper's own subject is a machine-
learning prognostic model; the recovery rate is its cohort description, which is what is cited.)

**Paterson** makes the SRMA breed list geographical rather than universal — an Australian
124-dog series was led by Golden Retriever, Italian Greyhound, Boxer, Cavoodle and Corgi, so the
page now warns against discounting SRMA on an off-list breed. It also carries the relapse rate
(37.6% with at least 6 months of follow-up). Gunther is 12 dogs and is hedged: cytarabine
controlled 10 of 12 relapsing dogs, but **every dog had an adverse event** and three were severe,
so the page states both halves.

### Pages 53-54 — sinonasal aspergillosis, nasal neoplasia (2026-09-23)

> Stanton JA, Miller ML, Johnson P, Davignon DL, Barr SC. J Small Anim Pract. 2018;59(7):411-414. doi:10.1111/jsap.12835
> Sones E, Smith A, Schleis S, et al. Vet Radiol Ultrasound. 2013;54(2):194-201. doi:10.1111/vru.12006
> Iseri T, Horikirizono H, Abe M, et al. Open Vet J. 2022;12(3):383-390. doi:10.5455/OVJ.2022.v12.i3.12

**Stanton is five dogs and the page says so twice over.** Cribriform lysis has been treated as a
bar to topical azole infusion. This series found no dog developing neurological signs — but *no
event in five dogs* is not a demonstration of safety, and the page is written to say exactly
that: enough to discuss with a specialist rather than refuse outright, not enough to call safe.
This is the clearest case so far of Rule 2 mattering: the superscript would otherwise read as
authority for a procedure with a catastrophic failure mode.

**Iseri** (123 dogs) is cited for the stage gradient rather than the headline. Megavoltage beat
orthovoltage overall (median 488 vs 317–325 days), but the benefit was concentrated early:
stage 1 reached 931 days, stage 4 only 176. That is the argument for imaging and referring before
facial deformity, which is the point the page needed.

**Sones** separates the radiation protocols within 86 intranasal sarcomas: daily-fractionated
641 days, Monday/Wednesday/Friday 347, palliative 305. Print year 2013; PubMed dates it 2012.

### Pages 55-56 — AHDS, gastrointestinal foreign body (2026-09-23)

> Unterer S, Strohmeyer K, Kruse BD, Sauter-Louis C, Hartmann K. J Vet Intern Med. 2011;25(5):973-979. doi:10.1111/j.1939-1676.2011.00765.x
> Ziese AL, Suchodolski JS, Hartmann K, et al. PLoS One. 2018;13(9):e0204691. doi:10.1371/journal.pone.0204691
> Schwartz Z, Coolman BR. Vet Surg. 2018;47(2):285-292. doi:10.1111/vsu.12759
> Cola V, Ferrari C, Del Magno S, et al. Vet Surg. 2024;53(7):1266-1276. doi:10.1111/vsu.14126

The page already said "fluids, not antibiotics". **Unterer** is the randomised blinded trial that
claim rests on: 60 aseptic dogs, no difference in mortality, hospitalisation or severity on any
day. Note the authors' own hedge in the conclusion — "in **some** dogs ... antibiotics **may** not
change the case outcome" — and the page is written not to overclaim past it.

**Ziese** is cited for two things, and the smaller finding is deliberately subordinated to the
larger one. The probiotic bought a day (recovery day 3 vs 4 in 25 dogs), which is hedged. The
finding that matters is that **both** arms recovered rapidly on no antibiotics at all. It also
supplies the netF point: toxin genes were present in 57% at presentation and fell over the first
week regardless of treatment, so detecting them is not a reason to reach for antibiotics.

**Schwartz** is 333 dogs and is the only GI-surgery series here large enough to give dehiscence
*risk factors* rather than a bare rate: a linear foreign body, and more than one gastrointestinal
incision in the same surgery. It also times the risk — dehiscence presented at a mean of **44
hours**, which makes the second post-operative day the window to watch. Both are actionable in a
way a percentage is not.

**Cola** (81 animals) is hedged and is there to note that laparotomy-assisted endoscopic retrieval
removed foreign bodies without an enterotomy in 35 of 40, with intestinal wall damage being what
forced conversion.

### Pages 57-58 — pneumothorax, canine chronic bronchitis (2026-09-23)

> Chan JC, Johnson LR. J Vet Intern Med. 2023;37(2):660-669. doi:10.1111/jvim.16673
> Dickson R, Scharf VF, Michael AE, et al. J Am Vet Med Assoc. 2021;258(11):1229-1235. doi:10.2460/javma.258.11.1229
> Seriot P, Dunie-Merigot A, Trehiou CB, et al. Vet Rec. 2021;189(4):e22. doi:10.1002/vetr.22

⚠️ **`Dickson` vs the existing `Dickinson`** (neurological FIP). Neither is a prefix of the
other, so the resolver is safe, but they are trivially misread for one another by a human
editing this file. Both are pinned in the resolver test.

**Chan** is a placebo-controlled cross-over trial and deliberately enrolled dogs with **airway
collapse** as well as inflammatory airway disease, so it is cited on both `DIS-RESP-BRONCHITIS`
and `DIS-RESP-TRACOLL`. Beyond the efficacy result (cough frequency, duration and severity all
significantly reduced; quality-of-life score improved by a median 69%), it carries a practical
finding the pages needed: feasibility of the mask *improved* with continued use and only one dog
of 36 would not accept it, so a poor first week is not a reason to abandon the route.

**Dickson** (110 dogs) contributes recurrence *timing* rather than a bare rate. Recurrence was
13% of dogs followed beyond 30 days, clustered at a median of **9 days**, and later recurrence
was rare (3%). The authors read that as a lesion missed at the original exploration rather than a
new bulla forming — so the page now says to re-image rather than assume new disease.

**Seriot** (37 dogs) covers the migrating plant foreign body route. Two findings made the page:
CT agreed with surgery on 34 of 40 lobes, and where CT showed a foreign body that surgery failed
to find, **a third later developed a draining tract** — a follow-up plan, not a closed case.

### Pages 59-61 — bacterial pneumonia, CIRD, chylothorax (2026-09-23)

> Lappin MR, Blondeau J, Boothe D, et al. J Vet Intern Med. 2017;31(2):279-294. doi:10.1111/jvim.14627
> Reeves LA, Anderson KM, Luther JK, Torres BT. Vet Surg. 2020;49(1):70-79. doi:10.1111/vsu.13322

⚠️ **`Reeve` IS a prefix of `Reeves`** — the first genuine prefix pair since Anders/Anderson and
Lo/Longeri. `Reeve` is the brachycephalic hiatal hernia fluoroscopy paper on `DIS-GI-HH`. The
`/^Reeves/` branch is placed **before** `/^Reeve/` in `parseSources`, and both directions are
asserted in the resolver test. `DIS-GI-HH` is also still pinned at 6 references, which would
catch a silent swap.

**Lappin is the ISCAID respiratory working group guideline** and covers pneumonia, CIRD,
bronchitis, rhinitis and pyothorax, so one reference serves several pages. It is a Working Group
practice guideline published in JVIM — a peer-reviewed paper, not a textbook chapter. Two of its
positions were missing from the pages and are now on them: reserve fluoroquinolones for
culture-confirmed or genuinely severe disease rather than reaching for them first-line, and
**withhold antibiotics for the first 10 days of uncomplicated CIRD** unless the dog is febrile,
lethargic or inappetent. The CIRD page previously implied the choice was doxycycline-or-nothing
without saying that "nothing" is the default for a well dog.

**Reeves is cited for its verdict on the evidence, not for a result.** Of 313 papers screened,
11 met inclusion criteria, one canine study reached a higher level of evidence and **none in
cats** did. No surgical method can be declared superior, and there is **no evidence supporting
medical therapy as a primary treatment** — which is stronger than the page's previous "seldom
effective". Print year 2020; PubMed dates it 2019.

### Pages 62-65 — lung lobe torsion, pulmonary neoplasia, thymoma, idiopathic rhinitis (2026-09-23)

> Rossanese M, Wustefeld-Janssens B, Price C, et al. Vet Surg. 2020;49(4):659-667. doi:10.1111/vsu.13406
> Bleakley S, Phipps K, Petrovsky B, Monnet E. Vet Surg. 2018;47(1):104-113. doi:10.1111/vsu.12741
> Carroll KA, Mayhew PD, Culp WTN, et al. J Am Vet Med Assoc. 2024;262(10):1-8. doi:10.2460/javma.23.12.0679
> MacIver MA, Case JB, Monnet EL, et al. J Am Vet Med Assoc. 2017;250(11):1283-1290. doi:10.2460/javma.250.11.1283

`DIS-NASAL-LPR` reuses **Lappin** from the previous batch — chronic rhinitis is explicitly in the
ISCAID guideline's scope, and "treat documented infection, not the discharge" is the point the
page needed.

A registry disagreement worth recording even though it did not matter: Crossref lists
Rossanese's fifth author as **Woods**, PubMed as **Wood**. Seven authors means AMA truncates to
the first three plus *et al*, so the disputed name never appears in the reference.

**Rossanese** (80 dogs) supplies the pug figure the page asserted without one — 47.5%, with
sighthounds a further 16.2% — and separates primary from secondary torsion by survival (median
not reached vs 921 days). That distinction is what the owner conversation turns on.

**Carroll and MacIver both bear on the same question and disagree in emphasis**, which is why
both are cited. Carroll (49 dogs) found thymoma with pre-surgical myasthenia at a median 182 days
against 1,102 overall, but reports that the difference **did not reach significance** — and the
page says so rather than quoting the gap as established. MacIver is **18 dogs** and is hedged,
but it is where the poor outcome with myasthenia *and* megaoesophagus together was first
quantified (median 20 days). Presenting both, with their sizes, is more honest than picking one.

### Page 66 — bronchiectasis (2026-09-23)

> Johnson LR, Johnson EG, Vernau W, Kass PH, Byrne BA. J Vet Intern Med. 2016;30(1):247-254. doi:10.1111/jvim.13809
> Gamracy J, Wiggen K, Vientos-Plotts A, Reinero C. J Vet Intern Med. 2022;36(2):417-428. doi:10.1111/jvim.16381

⚠️ **`Johnson` is now year-keyed.** Both papers are by the same LR Johnson — the 2023 pyothorax
series already in this file and this 2016 bronchiectasis one. Same author, unrelated works, a
decade apart; a bare prefix match would have printed pyothorax on the bronchiectasis page.
`DIS-PYOTHORAX` is pinned at 8 references, which would catch a swap.

Two findings changed the page. **Radiographs miss bronchiectasis** — present on films in 60% of
affected dogs against 92% at bronchoscopy and 100% on CT, so a clean radiograph does not exclude
it. And **a negative culture does not mean the exacerbation is not infective**: bacteria were
isolated in only 28% of 86 dogs. The page also now lists the three diagnoses that actually
underlie it — pneumonia 52%, inflammatory airway disease 36%, eosinophilic bronchopneumopathy 12%
— rather than implying chronic bronchitis is the usual cause.

**Gamracy** serves bronchiectasis and tracheal collapse together: 41% of 210 dogs worked up for
respiratory signs had bronchomalacia, **every one had at least one comorbid cardiopulmonary
disorder**, and pulmonary hypertension was more prevalent among them. That is the argument for
scoping and echoing rather than treating the tracheal lesion alone.

### Pages 67-68 — acute glaucoma, cataract (2026-09-23)

> Kubo A, Ito Y. Vet Ophthalmol. 2024;27(5):452-460. doi:10.1111/vop.13189
> Graham KL, Hall EJS, Caraguel C, White A, Billson FA, Billson FM. Vet Ophthalmol. 2018;21(5):487-497. doi:10.1111/vop.12536
> Edelmann ML, Mohammed HO, Ledbetter EC. Vet Ophthalmol. 2022;25(5):316-325. doi:10.1111/vop.12978
> Boss C, La Croix N, Moore PA, et al. Vet Ophthalmol. 2020;23(3):442-449. doi:10.1111/vop.12739

**Ophthalmology is the largest remaining block** (58 pages), and these are the first two. Unlike
the other clinical areas, every eye page already carries a *chapter-level* Gelatt citation, so
the reference counts in the test table include both the book chapters and the new papers.

A note on the editing mechanics rather than the evidence: the ophthalmology rows in `db.ts` span
**many lines** with double-quoted fields, unlike the single-line rows everywhere else. The
one-line find-and-replace used for every previous batch silently matches nothing on them. Edits
here go through a row-range helper that walks the braces to find the row's true extent.

**Kubo** is 104 Shiba eyes — breed-specific, and the page says so — but it separates the two
things that decide whether a glaucomatous eye keeps sight, and both are actionable: presenting
**within 72 hours** (86.7% still sighted vs 44.1% later) and getting a shunt while still sighted
(69.2% visual retention at 12 months vs 7.7% on drops alone; median time to blindness 39.9 months
vs 1.7). The page previously said "refer same day" without saying what the referral buys.

**Graham** answers which surgery, across 83 eyes: a Baerveldt drainage device beat
cyclophotocoagulation-plus-suture-shunt on the composite that matters — pressure controlled
*without* losing sight, 60.7% vs 35.2% — and needed fewer adjunctive drops.

**Edelmann** replaces the page's unsourced "90%+ visual outcome" with 86% of 182 eyes at last
follow-up, and supplies the mechanism behind "refer early": eyes operated within a month needed
less phacoemulsification energy, and higher energy tracked with post-operative glaucoma and
blindness. **Boss** is the pug exception — corneal ulceration, not glaucoma, was their commonest
complication, and 75% had pre-existing pigmentary keratitis.

### Page 69 — superficial corneal ulcer / SCCED (2026-09-23)

> Hung JH, Leidreiter K, White JS, Bernays ME. Vet Ophthalmol. 2020;23(4):764-769. doi:10.1111/vop.12772
> Edelmann ML, Mohammed HO, Wakshlag JJ, Ledbetter EC. J Am Vet Med Assoc. 2018;253(8):1012-1021. doi:10.2460/javma.253.8.1012
> Dees DD, Keys DA. Vet Ophthalmol. 2022;25(1):6-11. doi:10.1111/vop.12891

⚠️ **`Edelmann` is now year-keyed** — the same author has the 2018 SCCED platelet-rich-plasma
trial and the 2022 phacoemulsification series added one batch earlier. Third author after Moore
and Johnson to need this. `DIS-EYE-CATARACT` stays pinned at 3 references.

**The two randomised adjunct trials disagree, and both are cited — the negative one first.**
Edelmann found platelet-rich plasma had *no* effect on re-epithelialisation, vascularisation or
fibrosis in 40 dogs. Dees found a propolis/aloe/chamomile drop healed marginally faster than
debridement alone (16 vs 20 days in 120 dogs), with autologous serum only marginal. Neither is
strong enough to recommend, so the page says adjuncts are not established rather than picking
the flattering result.

**Hung** (341 eyes) supplies the three numbers the page was missing: 73.9% healed after a single
diamond burr debridement, 17% needed another intervention, and complications occurred in 4.7% —
mostly keratomalacia, which is worth a recheck rather than an assumption. It also gives the
Boxer-specific warning: 2.3 times more likely than other breeds to develop a contralateral
SCCED, usually within 24 months.

### Page 70 — deep / melting corneal ulcer (2026-09-23)

> Goss R, Adams VJ, Heinrich C, et al. Vet Ophthalmol. 2024;27(4):330-346. doi:10.1111/vop.13160
> Verdenius CY, Broens EM, Slenter IJM, Djajadiningrat-Laanen SC. Vet Ophthalmol. 2024;27(1):7-16. doi:10.1111/vop.13080

This is the most directly prescriptive pair added so far. The page named a first-line
fluoroquinolone without saying what it was covering or what to avoid; it now carries the isolate
list (**S. canis, P. aeruginosa, S. pseudintermedius**), the fact that Pseudomonas was **10 times
more likely** once the ulcer was malacic, and the resistance pattern that rules three common
topicals out: neomycin 85%, fusidic acid 78%, tetracycline 68%. Gentamicin, ofloxacin,
ciprofloxacin and chloramphenicol held up. Goss's in vitro finding that **no single drug** reached
90% coverage but chloramphenicol-or-gentamicin *plus* a fluoroquinolone did is the basis for the
page's new "use two agents pending culture".

Two findings support "swab before you treat" from different directions. Verdenius: significantly
fewer cultures grew anything in animals already on topical antibiotics. Goss: only **54%** of 148
progressive ulcers grew an organism at all, so a negative culture is the expected result in half
of cases and should not be read as absence of infection.

Verdenius also dates the advice — multi-drug-resistant canine isolates rose from **9.4% to 38.6%**
between 2012-2015 and 2016-2019. An empirical choice that worked a decade ago cannot be assumed
to still work, which is a caveat worth carrying on a page that will be read for years.

### Pages 71-72 — SARDS, feline corneal sequestrum (2026-09-23)

> Komaromy AM, Abrams KL, Heckenlively JR, et al. Vet Ophthalmol. 2016;19(4):319-331. doi:10.1111/vop.12291
> Susanti L, Kwon D, Ahn J, Seo K, Kang S. Vet Ophthalmol. 2023;26(2):169-175. doi:10.1111/vop.13058
> Gomez AP, Mazzucchelli S, Smith K, de Lacerda RP. Vet Rec. 2023;193(3):e2783. doi:10.1002/vetr.2783
> Michel J, Vigan M, Douet JY. Vet Ophthalmol. 2021;24(5):491-502. doi:10.1111/vop.12930

⚠️ **`Michel` IS a prefix of the existing `Michelotti`** (thoracoscopic pericardiectomy) — the
second true prefix pair after Reeve/Reeves. The Michelotti branch sits above the Michel one in
`parseSources`, both directions are asserted, and `DIS-CARD-PERIC` stays pinned at 2 references.

**Komaromy is an ACVO Vision for Animals Foundation panel review**, and its value here is
negative: it states that the therapies proposed on neuroendocrine and autoimmune grounds are
**controversial** and that no pathogenesis is established. The page already said "no proven
therapy" — it can now say who concluded that.

**Susanti is five dogs and is hedged twice**, but it carries a caveat the page lacked: SARDS can
present unilaterally. All five had a flat ERG in the blind eye and a *reduced* one in the eye
that still saw, and those eyes went on to fail. A normal-looking fundus in the remaining eye is
not reassurance, and the page now says to recheck rather than discharge.

**Gomez** (79 eyes) replaces the page's "roughly 12-20%" with 19% recurrence at a median of 245
days, and adds the figure that changes follow-up: **27% developed a sequestrum in the other eye**,
at a median of 635 days. Neither surgical technique nor skull conformation altered recurrence,
which supports what the page already said about grafting not being a guarantee. Michel (35 eyes)
is hedged as a single-technique series, not a comparison.

### Pages 73-74 — feline herpesvirus ocular disease, entropion (2026-09-23)

> Thiry E, Addie D, Belak S, et al. J Feline Med Surg. 2009;11(7):547-555. doi:10.1016/j.jfms.2009.05.003
> Ledbetter EC, Badanes ZI, Chan RX, et al. J Ocul Pharmacol Ther. 2022;38(5):339-347. doi:10.1089/jop.2022.0001
> Asti M, Nardi S, Barsotti G. N Z Vet J. 2020;68(2):112-118. doi:10.1080/00480169.2019.1694457

**The ABCD guideline is from 2009** and that is the oldest source added in this whole pass. It
stays because it is still the operative European guidance, the same reasoning applied to LeishVet
2011. It earns its place on one practical point the page lacked: **do not sample a cat recently
given a modified-live vaccine**, because the vaccine virus is detectable and will read as a
positive PCR.

**Ledbetter is hedged on two counts at once** — 16 cats, and *experimental* rather than natural
infection, which the page states explicitly. Topical ganciclovir matched oral famciclovir on
clinical score and corneal inflammation and beat placebo on viral load, but a specific-pathogen-
free inoculation model is not a clinical cohort and the page does not let the superscript imply
otherwise.

**Asti** is 27 dogs of one breed and is written as such. Its interest is the reasoning rather
than the numbers: in Shar Pei with both lids rolled in, correcting the **upper lid alone** by
forced granulation resolved 50 of 54 eyes, on the argument that much of the lower entropion is
secondary blepharospasm that disappears once the pain does. That sits naturally beside the page's
existing "correct in stages rather than over-correct in one attempt".

### Pages 75-77 — conjunctivitis, symblepharon, ophthalmia neonatorum (2026-09-23)

No new references. All three reuse **Thiry 2009** (ABCD), because feline herpesvirus drives all
of them and the guideline's content maps onto each differently:

- `DIS-EYE-CONJ` and `DIS-EYE-SYMBL` gain the **PCR interpretation** caveat — latency is common
  in healthy cats, so a positive supports rather than confirms causation, and a cat recently
  given modified-live vaccine cannot be interpreted at all.
- `DIS-EYE-SYMBL` also gains the reactivation triggers, **stress and corticosteroids**, which are
  worth removing before reaching for another antiviral cycle.
- `DIS-EYE-NEONATAL` gains the reason litters rather than single kittens are affected: recovered
  cats are lifelong latent carriers shedding from oronasal and conjunctival secretions under
  stress, and the queen is the usual source.

This is the same free-win pattern that worked on `DIS-BD-EVANS` at the start of the pass — a
paper already verified in the file applying to pages nobody had wired it into. Worth looking for
before searching, since it costs one edit rather than a literature cycle.

### Pages 78-80 — cherry eye, anterior uveitis, lens-induced uveitis (2026-09-23)

> Guionnet A, Weverberg F. Vet Ophthalmol. 2026;29(1):e70031. doi:10.1111/vop.70031
> Violette NP, Ledbetter EC. Vet Ophthalmol. 2019;22(5):577-583. doi:10.1111/vop.12625
> Dowler KK, Middleton JR, Dufour S, Hood MA, Giuliano EA. Vet Ophthalmol. 2021;24(1):37-47. doi:10.1111/vop.12830

Registry disagreement on Guionnet: PubMed dates it **2025** (epub May), the print volume is
**2026;29(1)**. Print year wins, as everywhere else in this pass.

**Guionnet** (126 eyes, mean 1190 days of follow-up) is cited for what happens *after* the
technique works, not just that it works. 125 of 126 eyes held after one surgery — but lacrimal
cysts formed in 4% and needed drainage, and KCS or ulcerative keratoconjunctivitis appeared in
13.9% of dogs over long follow-up. The authors explicitly could not establish whether the surgery
contributed, so the page says to keep measuring Schirmer rather than treat the gland as safe once
repositioned. That is a more useful reading than the 99.2% headline alone.

**Violette** gives the uveitis page a differential it stated without a source: dense flare is not
always protein. Lipaemic flare can be opaque enough to **abolish the menace response**, and it
requires hyperlipidaemia *plus* uveitis — so the action is to check triglycerides and find the
systemic driver, not escalate the anti-inflammatory. Two-thirds of affected eyes were pseudophakic
and over half developed it within 30 days of intraocular surgery.

**Dowler** is cited on the lens-induced uveitis page alongside Edelmann from the cataract batch,
because the two converge: longer phacoemulsification time predicted **both** fibrin web (Dowler)
and post-operative glaucoma and blindness (Edelmann). Anything that shortens surgery, including
operating before the cataract matures, helps twice. Dowler also rules factors *out* — diabetes,
cataract stage and surgeon were not associated.

### Pages 81-84 — hyphaema, retinal detachment, envenomation, orbital trauma (2026-09-23)

> Jinks MR, Olea-Popelka F, Freeman KS. Vet Ophthalmol. 2018;21(2):160-166. doi:10.1111/vop.12491
> Hirashima S, Takiyama N, Umeda Y. Vet Ophthalmol. 2022;25(1):23-30. doi:10.1111/vop.12912
> Scott EM, Schlesener BN, Shaw GC, Teixeira LBC. Vet Ophthalmol. 2019;22(5):666-673. doi:10.1111/vop.12638

⚠️ **`Scott` is now year-keyed** — fourth author to need it, after Moore, Johnson and Edelmann.
The existing 2021 paper is phenobarbital marrow suppression by a different Scott entirely.
`DIS-IMNP` stays pinned at 2 references, which would catch a swap.

**Jinks is the most immediately usable paper in the ophthalmology block so far**, because its
prognostic factors are all free to check at the first examination: absent consensual PLR (odds
ratio **28.6**), absent dazzle (19.4), raised IOP (9.1), retinal detachment (7.6), *unilateral*
rather than bilateral hyphaema (5.8), complete hyphaema (3.9). It also corrects an implicit
assumption — trauma accounted for only 26.1% of 99 dogs, against 36.4% systemic and 32.9% local
ocular disease, so a systemic workup is warranted even when trauma looks obvious. And hyphaema
persisting 8-30 days raised glaucoma risk more than sixfold.

**Hirashima contradicts the page's pessimism about surgery.** Vitrectomy reattached all 78 eyes,
87.2% regained or kept vision, and 73.5% still had it at a mean 690 days. The detail that changes
management: **mean time to vision returning was 28.5 days**, so judging failure at two weeks is
premature. Glaucoma was the commonest complication (40.3%) and caused 88.9% of post-operative
vision loss.

**Scott serves two pages from one finding.** All 19 dogs with an ocular or periocular snakebite
lost vision and came to enucleation, with necrosis, keratomalacia, hyphaema, retinal detachment
and lens capsule rupture on histopathology. On `DIS-BD-ENV` that is a triage point — a periocular
bite is not cosmetic; on `DIS-EYE-ORBTRAUMA` it sets the expectation for that specific mechanism.
Hedged as 19 dogs on both.

### Pages 85-86 — progressive retinal atrophy, episcleritis / NGE (2026-09-23)

> Andrade LR, Caceres AM, Trecenti AS, et al. Animals (Basel). 2019;9(10):844. doi:10.3390/ani9100844
> Breaux CB, Sandmeyer LS, Grahn BH. Vet Ophthalmol. 2007;10(3):168-172. doi:10.1111/j.1463-5224.2007.00528.x

**Andrade** (220 genotyped English Cocker Spaniels) is cited for two things the PRA page could
not previously support. The breeding argument: the prcd allele frequency was **41% in unregistered
dogs against 14.9% in registered** ones. And a caveat about the test itself — 8 of 10 homozygotes
examined had visual impairment, so two did not *yet*, which is why genotyping is a breeding tool
as much as a diagnosis. Single-breed, single-country, and the page reads as such.

**Breaux is 24 cases and from 2007**, and it is cited anyway because it is the specific source
behind a claim the page was already making: B-lymphocyte-rich lesions need ongoing therapy to hold
remission. Attaching the source to an existing claim is different from adding a new one on thin
evidence. It also supplies the split the page lacked — about half of *unilateral* episcleritis
resolved without long-term therapy, while almost all bilateral disease and NGE needed continuous
treatment — hedged as "some clinicians reported" at that sample size.

### Pages 87-88 — iris melanocytic lesions, traumatic proptosis (2026-09-23)

> Dufour VL, Cohen JA, Assenmacher CA, et al. Vet Ophthalmol. 2025;28(2):371-385. doi:10.1111/vop.13258
> Gilger BC, Hamilton HL, Wilkie DA, van der Woerdt A, McLaughlin SA, Whitley RD. J Am Vet Med Assoc. 1995;206(8):1186-1190.

**Gilger has no DOI** — a 1995 JAVMA paper from before the practice was universal — so the
second-registry check went to **Europe PMC** rather than Crossref, as it did for Perry on the
cholecalciferol page. Second occasion in the pass; the `isPaper` classifier still recognises it
because `1995;206` matches the volume;page locator pattern.

**Dufour's population is unusual and the page says so** — 40 dogs aged 0.5 to 3.1 years in a
guide-dog colony, removed from training for a pigmented iris lesion. It supports the page's
"monitor with serial photography" advice with something concrete (25 dogs watched without surgery,
complication-free to 4.5 years) and it supplies what to tell an owner who does opt for surgery:
sector iridectomy kept every eye visual and comfortable to 6.2 years with no recurrence, **but
dyscoria followed in 13/13**, focal posterior synechia in 9/13 and non-progressive cataract in
8/13. The pupil will not look normal afterwards, which is worth saying in advance.

**Gilger** attaches sources to two figures the proptosis page already quoted (about 20% of globes
regaining vision — 18 of 66 dogs; no cat eye regaining vision in 18 cats) and adds a prognostic
indicator that runs against intuition: **brachycephalic conformation is favourable**, non-
brachycephalic unfavourable. That sits with the page's existing list of unfavourable signs.

### Pages 89-91 — Collie eye anomaly, optic nerve hypoplasia, corneal oedema (2026-09-23)

> Brown EA, Thomasy SM, Murphy CJ, Bannasch DL. Vet Ophthalmol. 2018;21(2):144-150. doi:10.1111/vop.12488
> Michau TM, Gilger BC, Maggio F, Davidson MG. J Am Vet Med Assoc. 2003;222(5):607-612. doi:10.2460/javma.2003.222.607

**Brown is cited against both pages, not for them.** `DIS-EYE-CEA` called the NHEJ1 genetic test
"definitive for breeding decisions" and said genetic testing was "the only effective control
measure". In Nova Scotia Duck Tolling Retrievers the deletion was **discordant** with optic nerve
head coloboma, and a genome-wide scan found no locus reaching significance once population
structure was controlled for. The authors' own conclusion is that **puppy eye examinations are a
better guide to breeding selection than the test** in that breed. Both pages now say the genotype
supports rather than settles the question, and `DIS-EYE-ONH` warns against using the CEA test to
identify coloboma outside the breeds it was validated in.

This is the strongest example so far of Rule 3 earning its place — the abstract does not merely
add detail, it reverses the page's confidence. A bibliographic record alone would have read as
"a CEA genetics paper" and been cited *in support*.

**Michau is 13 dogs and from 2003**, hedged as such. It is cited on the corneal oedema page for
the recurrent *ulcer* rather than the oedema, since that is what it treats: every eye healed in a
mean 2.2 weeks and needed less topical treatment afterwards than before referral. The authors'
practical caveat is on the page too — treat the **whole** cornea, because untreated areas
re-ulcerate.

### Page 92 — keratoconjunctivitis sicca (2026-09-23)

> O’Neill DG, Brodbelt DC, Keddy A, Church DB, Sanchez RF. J Small Anim Pract. 2021;62(8):636-645. doi:10.1111/jsap.13382

⚠️ **`O’Neill` is now year-keyed** — fifth author after Moore, Johnson, Edelmann and Scott. Same
D G O'Neill runs VetCompass, so there are two unrelated papers by him here: the 2017 GDV study and
this 2021 KCS one. Note the **curly apostrophe** (U+2019) that the marker, the source name and the
branch regex all use — an ASCII apostrophe will not match. `DIS-GI-GDV` stays pinned at 10
references.

**This is the largest denominator of any paper cited in the pass: 363,898 dogs.** The KCS page
carried relative risks from a Gelatt table; it now also carries VetCompass odds ratios, and the
two differ enough to be worth having both — American Cocker Spaniel at **52.3** against
crossbreds, English Bulldog 38.0, Pug 22.1, Lhasa Apso 21.6, where the table's figures run 4 to
11. Labrador (0.23) and Border Collie (0.30) are actively *protected*, which the table does not
show at all.

Two things went on the page that it could not previously assert. The prevalence — **0.40%**, with
a 0.12% one-year incidence risk — which makes it a screening target rather than a referral
curiosity. And the conformational gradient underneath the breed list: brachycephalic 3.63×
mesocephalic, spaniel 3.03× non-spaniel, at-or-above breed-sex mean bodyweight 1.25× lighter dogs.
The authors' recommendation to run a quantitative tear test at the **annual** examination in
predisposed breeds is now in the monitoring section.

### Pages 93-94 — enrofloxacin retinal toxicity, taurine-deficient retinal degeneration (2026-09-23)

> Wiebe V, Hamilton P. J Am Vet Med Assoc. 2002;221(11):1568-1571. doi:10.2460/javma.2002.221.1568
> Jacobson SG, Kemp CM, Borruat FX, Chaitin MH, Faulkner DJ. Exp Eye Res. 1987;45(4):481-490. doi:10.1016/s0014-4835(87)80059-3

**These are the two oldest sources in the pass (2002 and 1987) and the reason is the same for
both: the literature stops there.** Commercial diets solved feline taurine deficiency, and the
enrofloxacin dose question was settled by a label change. Rule 1(c) asks for *as current as the
literature allows*, not a recent paper at any cost — the alternative here is no paper at all.

**Wiebe** supplies what the enrofloxacin page could not: the four risk factors (large dose or high
plasma concentration, **rapid IV infusion**, prolonged course, advancing age), a concrete
mitigation protocol for when a fluoroquinolone is genuinely needed (exact-bodyweight dosing, split
to 2.5 mg/kg q12h, no rapid IV, reduce in geriatric or renally impaired cats), and the early sign
— **mydriasis precedes the blindness**, so a dilated pupil in a cat on a fluoroquinolone is a
reason to stop the drug rather than to observe.

**Jacobson** is an experimental study and the page treats it as one, but it gives two things a
clinician can use. The lesion spreads in a known order (focal central, then paracentral, then
nasal midperipheral, with the horizontal streak preferentially lost), so examining only the area
centralis will under-stage it. And the **rod b-wave was markedly reduced while peripheral
rhodopsin was only mildly depleted** — a modest-looking fundus does not mean modest functional
loss.

Also this batch: a **second O'Neill 2017 VetCompass paper** (corneal ulcerative disease) landed on
`DIS-EYE-SUP-ULC`, which broke the year key. Its marker carries a `cornea` qualifier and the
branch tests for it before falling through to `ONEILL_BY_YEAR` — the same mechanism LeVine's two
2024 statements use with `diagnosis` and `treatment`. It brings the conformation data (brachy-
cephalic **11.18×** crossbreds, Pug 5.42% of the breed affected) and an uncomfortable practice
finding: pain was recorded in 46.2% of cases but analgesia used in only 54.6%.

### Pages 95-96 — optic neuritis, orbital neoplasia (2026-09-23)

> Bedos L, Tetas R, Crespo V, Shea A. J Small Anim Pract. 2020;61(11):676-683. doi:10.1111/jsap.13233
> Patel K, de Lacerda RP, Mazzucchelli S, et al. Vet Rec. Published online January 5, 2026. doi:10.1002/vetr.70219

Patel is an **early-view article with no volume or page numbers yet**, so its AMA string carries
the online-publication date instead. First reference in the pass in that form; the `isPaper`
classifier still recognises it on the DOI rather than the volume;page locator.

**Bedos is cited for how often each test is negative**, which is the opposite of how a diagnostic
list usually reads and is what the optic neuritis page needed. Across 48 affected nerves the
fundus was abnormal in only **71%**, MRI showed enlargement in 67% and contrast enhancement in
58%; CSF was normal more often than not, with pleocytosis in 44% and raised protein in 44% of 25
dogs sampled. No single negative rules the diagnosis out, and the page now says so. It also
revises the prognosis upward — 64% of dogs responded to immunosuppression and vision returned in
24 of 48 eyes — against a page that implied treatment had to start within days to be worth trying.

**Patel** supports the surgical option on `DIS-EYE-ORBNEO` with the complication profile rather
than a survival figure: immediate complications in 60% of 35 dogs, but almost all surgical-site
swelling that resolved untreated, and long-term complications in only 5.7%. It also carries a
diagnostic caution — just over half of orbits taken to exenteration proved **neoplastic** (54.3%),
the rest inflammatory disease, cyst, foreign body or pseudotumour, which reinforces the page's
existing "biopsy rather than assume".

### Pages 97-100 — uveal cysts, conjunctival and eyelid neoplasia, nasolacrimal obstruction (2026-09-23)

> Holly VL, Sandmeyer LS, Bauer BS, Verges L, Grahn BH. Vet Ophthalmol. 2016;19(3):237-244. doi:10.1111/vop.12293
> Kaminsky M, Hoffman A, Ellis AE. Vet Ophthalmol. 2023;26(3):243-249. doi:10.1111/vop.13064
> Erjavec J. Can Vet J. 2020;61(10):1111-1114.

**Holly draws a distinction the uveal cyst page did not make**, and it changes what "monitor"
means. Across 830 Golden Retrievers, thin-walled cysts still **attached** to the iris or ciliary
body carried a 56.5% risk of pigmentary uveitis or pigmentary/cystic glaucoma on re-examination,
while **none** of the thick-walled free anterior chamber cysts progressed. The page now leads with
morphology rather than with "incidental cyst → monitor". It also supplies the progression rate to
glaucoma (44.9%), the age gradient (12.7% of dogs over four years against 5.9% overall) and the
inheritance pattern (autosomal dominant with partial penetrance).

**Kaminsky and Erjavec are both single case reports**, and both are cited for a **technique**
rather than for any frequency or prognosis claim — each page already carries the general picture
from Gelatt. Kaminsky names a reconstruction (mucocutaneous subdermal plexus flap) that achieved
complete margins on a mass straddling conjunctiva and lid margin, with its cost stated (mild
trichiasis and epiphora). Erjavec names an imaging approach (CT plus dacryocystogram) that
localised a stenosis a simple flush had only shown as non-patent, and a salvage
(conjunctivobuccostomy). Both say "one reported dog" on the page.

This is the pattern for the long tail of ophthalmology: many of these conditions have no cohort
literature at all, only case reports. Rule 4 requires a paper, and Rule 2 requires the reader to
know how thin it is — so the citation goes in and the sample size goes in with it.

Erjavec has **no DOI** (Can Vet J is PMC-only), so the second-registry check went to Europe PMC.
Third occasion in the pass, after Perry and Gilger.

### Pages 101-104 — PPM, distichiasis, retinal dysplasia, eyelid agenesis (2026-09-23)

> Goossens LT, Verbruggen AJ, Storms G, Broeckx B. Front Vet Sci. 2026;13:1841935. doi:10.3389/fvets.2026.1841935
> Gabor M, Candrak J, Miluchova M, Zubricky P, Balicka A, Trbolova A. Vet Sci. 2025;12(2):171. doi:10.3390/vetsci12020171
> Ng CH, Ervedosa TB, Soler JG, Climans ME, Gonzalez-Astudillo V. Vet Ophthalmol. 2026;29(2):e70164. doi:10.1111/vop.70164

⚠️ **PubMed's search endpoint went down mid-batch** (trivial two-word queries returned
`API_ERROR`; PMID fetch kept working). Discovery moved to the **Europe PMC REST API** via curl,
which is the same registry already used for second-registry verification of DOI-less papers. It
found all three of these, including the one that covers three pages at once. Worth knowing as a
fallback: the connector is not the only route to the literature.

⚠️ **`Ng` IS a prefix of the existing `Nguyen`** (haemophilia A gene therapy). Its branch is
written `/^Ng\b/`, so the word boundary keeps them apart regardless of branch order — the same
device used for `Lo` against `Longeri`, and a different fix from the ordering used for
`Reeve`/`Reeves` and `Michel`/`Michelotti`. `DIS-BD-HEMA` stays pinned at 4 references.

**Goossens is an ECVO screening cohort of 1,182 dogs and serves three pages** — iris-to-iris PPM
(4.7%, the commonest inherited finding), distichiasis (2.5%) and multifocal retinal dysplasia
(0.2%). Its useful twist is that **both PPM and distichiasis exceeded the progenitor breeds**,
which the authors attribute to breeding practice rather than chance. That is a better line for the
PPM page than "heritable in many breeds" alone.

**Gabor** is cited to keep the retinal dysplasia page's breed list open rather than to add to it:
a genome-wide scan in a breed *not previously implicated* (Czechoslovakian Wolfdog) found 5.13%
affected and a suggestive locus near CYP27A1. The page now says a negative genetic panel does not
exclude the diagnosis, because the causative variants are unknown in most affected breeds.

**Ng is one puppy** and is cited only for what histopathology showed — bilateral Peters anomaly
with a closed drainage angle, persistent pupillary membranes, retinal separation and aphakia
behind a lid defect, plus complete absence of goblet cells, tarsal plate and meibomian glands. The
first point warns that concurrent anomalies can sit deeper than the fundus exam reaches; the
second is why lubrication does not substitute for reconstruction. It also establishes that eyelid
agenesis is not exclusively feline.

### Pages 105-107 — ectropion/macroblepharon, zygomatic mucocoele, ocular dermoid (2026-09-23)

> Lemle C, Koch C, Meyer-Lindenberg A. Vet Ophthalmol. 2026;29(5):e70235. doi:10.1111/vop.70235
> Kecova H, Miller WW, Lindley DM. Vet Ophthalmol. 2025;28(2):341-352. doi:10.1111/vop.13239
> Enache AE, Maini S, Pivetta M, et al. J Small Anim Pract. 2025;66(6):396-411. doi:10.1111/jsap.13844

Discovery again through **Europe PMC** — PubMed search still returning `API_ERROR`.

⚠️ **`Lemle` sits one character from the existing `Lemmons`** (the ophthalmology textbook cited by
chapter). They diverge at position 4 so neither is a prefix of the other, but both are pinned.

**Kecova covers two pages from one paper** — the oversized-fissure page and the dermoid page,
because four of its 153 eyes were lateral canthal dermoids resected by the same technique. Its
strongest point is structural rather than cosmetic: operating **before** severe malformation
develops prevented the secondary "pagoda defect" in giant breeds, while late cases needed
concurrent pagoda resection. That is an argument for earlier referral that the page did not have.
It also softens the page's line about lateral canthoplasty giving "unpredictable results" —
canthal *reconstruction* achieved good-to-excellent function in all but 6 of 153 eyes.

**Enache separates two conditions the zygomatic page had partly conflated.** The page said "no
pain on opening the mouth, unlike orbital cellulitis" as a way of identifying zygomatic disease —
but pain on opening the mouth was present in **18 of 20** dogs with bilateral zygomatic
*sialadenitis*. The page now distinguishes the inflammatory form (painful, usually medical: 16/20
improved on antimicrobials and anti-inflammatories, and only 2 of 9 cultures grew anything) from a
simple mucocoele (leaking gland, surgical). It also flags that **15 of 20** had concurrent systemic
disease, which redirects the workup outward.

**Lemle** (294 pugs, European Eye Scheme) quantifies the brachycephalic adnexal burden: entropion
72.4%, pigmentary keratopathy 36.7%, macroblepharon 24.8%, distichiasis 20.1%, and **81.3% with at
least one adnexal disorder**.

### Pages 108-109 — plasmoma, crystalline corneal opacity (+ SARDS enrichment) (2026-09-23)

> Read RA. J Small Anim Pract. 1995;36(2):50-56. doi:10.1111/j.1748-5827.1995.tb02821.x
> Sung H, Park J, Kim J, Kang S, Shaw GC, Seo K. J Vet Sci. 2024;25(1):e16. doi:10.4142/jvs.23222
> Quantz KR, Jongnarangsin KK, Harman CD, et al. Cornea. 2024;43(12):1506-1515. doi:10.1097/ICO.0000000000003523
> Auten CR, Thomasy SM, Kass PH, Good KL, Hollingsworth SR, Maggs DJ. Vet Ophthalmol. 2018;21(3):264-272. doi:10.1111/vop.12504

**Quantz adds a cause the crystalline-opacity page did not list, and it is iatrogenic.** The page
separated three entities — dystrophy, lipid keratopathy, degeneration — and sent you to a systemic
workup. Topical **corticosteroids** are a fourth: axial stromal crystalline opacities appeared in
25 eyes of 14 dogs after a median 141 days of ophthalmic steroid, with onset ranging 35 to 396
days across dexamethasone, prednisolone acetate and difluprednate. So the first question is what
has been in the eye, over months rather than weeks. It is also the one crystalline opacity that may
**reverse** — 4 of 25 eyes cleared after stopping the drug, though it took a median over a year,
which is worth trying before calling the deposit permanent.

**Read 1995 is the only therapeutic trial on plasmoma** and stays for the same reason the taurine
and enrofloxacin sources do. It is biopsy-controlled, which is unusual: plasma cell counts fell on
repeat biopsy and Schirmer values *rose*. The detail worth carrying is negative — T-lymphocyte
numbers only trended down and did not reach significance, so the plasma cell is the cell the drug
demonstrably acts on. Sung is one dog, cited for a presentation that mimics neoplasia (a discrete
papillary mass rather than diffuse thickening), which supports the page's existing "biopsy anything
atypical".

**Auten** enriches `DIS-EYE-SARDS`, which already had two papers, because signalment narrows the
diagnosis before any test: Dachshund 21%, Schnauzer 11%, Pug 7%, Labrador *under*-represented, and
**spayed females 59% against intact females 1%**.

### Pages 110-113 — rubeosis iridis, Haws syndrome, efferent mydriasis, blepharitis (2026-09-23)

> Bedos L, Sandmeyer L, Campbell J, Grahn BH. Front Vet Sci. 2024;11:1289283. doi:10.3389/fvets.2024.1289283
> Fruchter B, Kuzi S, Pe'er O, Ofri R, Sebbag L. Vet Rec. 2024;195(10):e4646. doi:10.1002/vetr.4646
> Danciu CG, Fenn J, Beltran E. J Vet Intern Med. 2024;38(5):2669-2674. doi:10.1111/jvim.17176
> Baker J, Cox A, Udenberg T, Defalque VE, Leis M. Can Vet J. 2025;66(10):1104-1110.

⚠️ **`Bedos` is now year-keyed** — sixth author to need it, after Moore, Johnson, Edelmann, Scott
and O'Neill. Leila Bedos has both the 2020 optic neuritis series and this 2024 histopathology
study. `DIS-EYE-OPTNEUR` stays pinned at 2 references. Also new: **`Baker` vs the existing
`Barker`** (trilostane survival), diverging at position 3 — pinned both ways.

Baker has **no DOI** (Can Vet J again), so Europe PMC did the second-registry check. Fourth such
paper, after Perry, Gilger and Erjavec.

**Bedos 2024 tells the rubeosis page that clinical examination under-detects the thing it is
about.** Histopathology of 108 glaucomatous globes found fibrovascular membranes in 24 of 49
secondary, 9 of 40 primary and 3 of 19 congenital glaucoma eyes — and the far commoner
*monocellular* membranes cannot be seen on examination at all. That reframes a negative slit-lamp
finding. It also supports the page's existing framing: secondary glaucoma was the form most likely
to carry a fibrovascular membrane.

**Fruchter upgrades the Haws page from anecdote to evidence.** The page said deworming was
"advocated by some clinicians on the strength of the anecdotal parasite association". Giardia was
found in 4 of 9 cats tested, and — the striking part — a newly adopted kitten with haws and
diarrhoea was followed by the same condition in the other three cats of the household **within
4-11 days**, which is hard to explain without transmission. It also supplies numbers for the owner
conversation the page lacked: resolution in 9 of 10 cats at a mean 38 days, and **3 of those 9
relapsed** 5-6 months later.

**Danciu is two dogs** and is cited for one thing: an efferent mydriasis whose only lesion was a
*cerebellar* infarct. The page's differential was CN III, orbital and pharmacological — this adds a
localisation that would otherwise be missed, with the tell being concurrent cerebellar or
paradoxical vestibular signs.

**Baker** is cited on the blepharitis page for a finding that runs **both ways**: 21 of 47 atopic
dogs had an abnormal Schirmer, but 18 were *above* 25 mm/min and only 3 below 15. So the instruction
is to measure the tear film, not to assume dryness.

### Pages 114-115 — chalazion/meibomianitis, conjunctival cyst and mass (2026-09-23)

> Kim G, Kang S, Seo J, Seo K. Vet Ophthalmol. 2025;28(5):847-854. doi:10.1111/vop.13326
> Sypniewska A, Ziolkowska N. BMC Vet Res. 2026;22(1):96. doi:10.1186/s12917-026-05289-y
> Garcia JM, Rogerio GDS, Rossatto-Junior CA, et al. Front Vet Sci. 2026;12:1717392. doi:10.3389/fvets.2025.1717392

⚠️ **`Kim` sits beside the existing `King`** (CKD prognostic study) — they diverge at position 3.
Pinned both ways, and `DIS-SEC-CKD` stays at 12 references.

**Garcia serves both pages with the same argument**, and it is an argument for doing something the
pages did not ask for: **submit the tissue**. Across 375 archived ocular specimens, neoplasia
accounted for 80.5%, meibomian adenocarcinoma was unexpectedly frequent, and clinical suspicion
matched the histopathological diagnosis in only **84.1%** of cases — moderate agreement by Kappa.
On `DIS-EYE-CHALAZION` that becomes "submit the curetted tissue rather than discarding it", which
is a real change to a procedure the page described as routine and curative.

**Kim gives the chalazion page a measurement usable without meibography**: a lid margin thickness
of **1.20 mm or more** flagged loss of over a third of the meibomian gland area (sensitivity 0.645,
specificity 0.768, 59 dogs). The page states both operating characteristics, because a sensitivity
of 0.645 means this rules in rather than out. Thickness also rises with age independently — 1.25 mm
in dogs over 12 against 1.00 mm in normal eyes.

**Sypniewska is one dog** and adds an immune-mediated differential for a well-circumscribed
conjunctival nodule. The detail that makes it worth citing is a *failure*: the nodule did **not**
regress on corticosteroid even though the dog's skin lesions did, so excision was needed. That is
more useful than the diagnosis alone.

### Pages 116-118 — iris atrophy, synechia, infectious chorioretinitis (2026-09-23)

**No new references.** All three reuse papers already verified for other pages, which is the
cheapest remaining move and worth checking before every search:

- `DIS-EYE-IRIS-ATR` and `DIS-EYE-SYNECH` both take **Bedos 2024** (pre-iridal membranes), because
  that paper reports two associations neither page had a source for: uveal atrophy was commoner in
  globes with *monocellular* membranes, and peripheral anterior synechiae commoner in globes with
  *fibrovascular* membranes. The second is the mechanism linking chronic neovascularisation to
  angle closure.
- `DIS-EYE-SYNECH` also takes **Dufour 2025** for an *iatrogenic* cause the page omitted: focal
  posterior synechia followed sector iridectomy in 9 of 13 dogs, alongside dyscoria in all 13 —
  expected sequelae rather than complications.
- `DIS-EYE-CHORIO` takes **Solano-Gallego 2011** (stage the leishmaniosis, do not just diagnose
  it), **Chochlios 2019** (a positive tick-borne titre in an endemic area is not the answer — 33.9%
  of clinically healthy dogs were seropositive) and **Dickinson 2020** (ocular FIP resolved on
  GS-441524 on serial ocular imaging, at higher doses, in four cats).

⚠️ **An error caught in draft, recorded because the class of mistake matters.** The Chochlios line
was first written as a *Leishmania* seroprevalence point. Chochlios is the **Ehrlichia canis**
study — 54.9% of sick and 33.9% of healthy dogs seropositive. The figure was right, the organism
was wrong, and the page lists both organisms as causes of chorioretinitis, so it would have read
plausibly. It was corrected before commit. This is the same failure mode as the Bellenger and
Ku/Li errors at the start of the pass: a number attached to the nearest-looking citation. Reusing a
paper across pages raises that risk, because the abstract is no longer in front of you — so
re-read it, or at minimum re-read the reference string, before writing the marker.

### Pages 119-126 — the last eight eye pages: ophthalmology block COMPLETE (2026-09-23)

> Chmiel J, Pumphrey S, Rozanski E. J Am Anim Hosp Assoc. 2022;58(6):277-282. doi:10.5326/JAAHA-MS-7279
> Chan RX, Ledbetter EC. Vet Ophthalmol. 2022;25(5):338-342. doi:10.1111/vop.12987
> Diehl KA, Asif SK, Mowat F. Vet Clin North Am Small Anim Pract. 2023;53(5):965-983. doi:10.1016/j.cvsm.2023.04.003
> Beckwith-Cohen B, Petersen-Jones SM. Front Vet Sci. 2024;11:1337062. doi:10.3389/fvets.2024.1337062
> Castel A, Olby NJ, Breitschwerdt EB, Thomas B, Maggi RG, Shelton GD. Vet Q. 2019;39(1):168-173. doi:10.1080/01652176.2019.1697012

**All 58 ophthalmology pages now cite at least one peer-reviewed paper.**

⚠️ **`Chan` is year-keyed and the two papers are by DIFFERENT Chans** — Remington X Chan on
sports-ball ocular trauma (2022) and Jennifer C Chan on inhaled fluticasone (2023). Seventh
year-keyed author. `DIS-RESP-BRONCHITIS` stays pinned at 2 references.

⚠️ **Castel is the first record in this pass where PubMed returned NO abstract.** The metadata gave
title, journal, MeSH terms and keywords — including "spastic pupil syndrome" — which was enough to
make it look citable. Rule 3 says never cite from a bibliographic record alone, and keywords are a
bibliographic record. The full text was fetched from Europe PMC (PMC6913637) and read before
anything was written. That mattered, because the paper **contradicts the page twice**:

- The page says FeLV is "strongly linked — most affected cats test positive". This cat was **FeLV
  and FIV ELISA negative**, with Bartonella henselae plus Sarcocystis as the cause found.
- The page says SPS "is benign and does not affect vision or QoL", implying permanence. An
  anisocoria present since kittenhood — **six years** — resolved completely once the co-infection
  was treated.

Neither point is inferable from the title or keywords. Had it been cited from the record alone it
would have been attached in *support* of the FeLV framing it undercuts.

**Chmiel and Chan cover the three trauma pages between them.** Chmiel's setting is one the pages
did not mention at all: 161 ocular injuries noted within 24 hours of a grooming appointment —
corneal ulceration 71%, eyelid laceration 7%, subconjunctival haemorrhage 6%, skewed to small
breeds (71%) and Shih Tzu (34%), with reactive behaviour in a third and four enucleations. Chan
supplies the blunt-projectile picture, where the lid is the least of it: traumatic uveitis in 91%
of closed-globe injuries, hyphaema 45%, and 5 of 6 open-globe injuries enucleated, with small dense
balls worst.

**Diehl and Beckwith-Cohen are both reviews**, used deliberately for the two page types that had no
cohort literature: breed-screening certification (iris coloboma, PHTVL) and systemic disease
presenting in the fundus (immune-mediated retinopathy, cortical blindness). Cited for framing
rather than for figures.

### Pages 127-129 — MUO, Chiari-like malformation, degenerative myelopathy (2026-09-23)

First of the neurology block (45 pages).

> Anderson FE, De Decker S, Bentley RT, Goncalves R. J Vet Intern Med. 2026;40(3). doi:10.1093/jvimsj/aalag089
> Baka RD, Savvas I, Sarpekidou E, Kazakos G, Polizopoulou Z. Vet Sci. 2025;12(4):376. doi:10.3390/vetsci12040376
> Sebestyen P, Kowalska ME, Golini L. Front Vet Sci. 2025;12:1555889. doi:10.3389/fvets.2025.1555889

⚠️ **`Anderson` is now year-keyed AND is the longer half of the `Anders`/`Anderson` prefix pair**,
so two different fixes have to coexist on one name: the `/^Anderson/` branch must stay **above**
`/^Anders\b/`, and it now dispatches on the year inside. Eighth year-keyed author. `DIS-POLYP` is
pinned at 8 references and `Anders 2008` is asserted separately, which would catch either fix
breaking the other.

**Anderson answers a question the MUO page did not address: does age change the decision?** The
page was silent on older dogs, which invites treating a geriatric presentation as not worth
immunosuppressing. Median survival was **16 months in dogs 8 years or older against 24 months in
younger dogs, and the difference was not significant** on multivariate analysis; relapse rates also
did not differ (41.7% vs 65.0%). The page now says not to write the older dog off on age alone. It
also flags that older dogs presented differently — significantly more behaviour change, cranial
nerve deficits and comorbidities — which is how MUO gets mistaken for a geriatric or neoplastic
problem.

**Baka reframes the Chiari page around a distinction it did not draw.** Syringomyelia of *other*
aetiology behaved worse than the Chiari-associated form: more severe neurological dysfunction, and
9 of 15 died or were euthanased against 11 of 15 still alive in the Chiari group. Age at onset
separates them — mean 50.5 months for Chiari-associated against 97.6 months otherwise — so a young
brachycephalic fits the malformation and an older dog warrants a wider search.

**Sebestyén supplies the number owners actually ask for**, which the page did not have: median
survival **6 months from the point of diagnosis** (13 months from onset of deficits), against the
page's "~1.25 years from diagnosis" figure for Corgis. It also rules something out — SOD1
homozygotes with a concurrent T3-L3 disc protrusion had a hazard ratio of 1.20, not significant, so
a protrusion found on MRI should not be assumed to explain the deficits.

### Pages 130-132 — Wobbler, idiopathic vestibular disease, masticatory myositis (2026-09-23)

> de Albuquerque Bonelli M, da Costa RC. J Vet Intern Med. 2019;33(5):2160-2166. doi:10.1111/jvim.15602
> Nye C, Hostnik E, Parker E, et al. J Vet Intern Med. 2020;34(5):2012-2020. doi:10.1111/jvim.15866
> Monforte Monteiro SR, De Risio L, Alves L, Vanhaesebrouck AE. Front Vet Sci. 2025;12:1583988. doi:10.3389/fvets.2025.1583988
> Congiusta MC, Snyder C, Soukup JW, Apostolopoulos N. J Vet Dent. 2024;41(6):620-627. doi:10.1177/08987564231219925

The marker for the juvenile CSM paper is **`Bonelli`**, the short form the author is commonly
indexed under, while the reference string carries the full surname *de Albuquerque Bonelli*. First
time in the pass that the marker and the AMA surname differ deliberately; both are asserted.

**Nye is cited against an assumption the Wobbler page carried.** The page said medical management
means "many show progressive deterioration over time". On repeat MRI a median 30 months later, the
worst site had progressed in 4 of 9 medically managed dogs, **improved in 4** and was unchanged in
3, and all but 2 dogs were clinically unchanged or better. It also separates radiographic from
clinical worsening — 38.9% of stenotic sites worsened morphologically while most dogs stayed
clinically stable — so the page now warns against re-imaging a stable dog and escalating on the
pictures.

**Bonelli** widens the age range: mean 9.4 months in 20 affected dogs, 16 of them giant breeds. It
also argues for imaging the whole cervical spine rather than the worst site, since 12 of 20 had two
or more compressive levels.

**Monforte Monteiro is 593 animals and is the most broadly useful paper in this batch** — it lands
on `DIS-NEU-IDVEST` here but applies wherever a normal MRI precedes a decision about CSF. After an
unremarkable brain MRI, CSF changed the diagnosis or treatment in **0.8%** of cases, and every dog
it helped had an abnormal neurological examination. **No cat** in the cohort had abnormal CSF after
a normal MRI. That is a concrete reason not to tap a neurologically normal animal with clean
imaging, which the page did not say. Worth reusing on the other intracranial pages.

**Congiusta is three dogs, uncontrolled**, and its interest is a dissociation: gape angle improved
in all three on oclacitinib while 2M fibre antibody titres did **not** fall. The MMM page told the
reader to retest titres before each dose reduction and treat a rising titre as impending relapse —
it now also says to judge the response clinically, because the two can move independently.

## Evidence quality bar (set 2026-09-22)

Every citation added to app data must clear three bars:

1. **Peer-reviewed.** No preprints or conference abstracts. The one legacy exception, flagged
   where it appears, is the Miceli ECVIM-CA presentation on the feline-HAC page.
2. **Sample large enough for the specific claim.** A single case report cannot carry a general
   statement; a 10-dog pilot cannot carry an efficacy claim.
3. **As current as the literature allows.** Prefer the newest adequately powered study, and
   where a recent larger series disagrees with an older classic, the recent one wins *and the
   page says so* — as with Černá 2024 (60 cats) versus the older FGESF case series, and
   Green 2011 versus de Papp 1999 on the GDV lactate threshold.

**Where the sample does not support the strength of the claim, the page text must say so** —
"Some clinicians reported…", or the sample size stated inline ("in a 21-dog series…", "a
10-dog pilot, underpowered for outcome", "all 9 cats of a small prospective series"). A bare
superscript reads as authority; an n=1 finding written as established fact misleads a
clinician at the point of care *more* than no citation would, because the number signals that
someone checked. Sample sizes under roughly 30 animals are stated inline whenever the figure
is load-bearing.

Applied retroactively on 2026-09-22 to the claims resting on single case reports or pilots:
`DIS-PUPD-CDI` (Croton, Evenhuis, Bellis, Paulin), `DIS-PUPD-NDI` (Etish, Ku),
`DIS-GI-FGESF` (Thieme, Duclos, Porras), `DIS-GI-EOGAST` (Beaumier),
`DIS-SEC-PAN-DOG` (Mansfield), `DIS-GI-PYL` (Tanaka) and `DIS-POLYP` (Bohin).

### Second misattribution caught — Li 2021, not Ku 2023

> Li Q, Lu B, Yang J, et al. Molecular characterization of an aquaporin-2 mutation causing nephrogenic diabetes insipidus. Front Endocrinol (Lausanne). 2021;12:665145. doi:10.3389/fendo.2021.665145

`DIS-PUPD-NDI` carried "mutant aquaporin-2 is retained in the endoplasmic reticulum and never
reaches the apical membrane" credited to **Ku 2023** — a case report of transient NDI after
anaesthesia that says nothing about AQP2 mutations. The mechanism is Li 2021's, and Li comes
with a caveat the page now states inline: it is a **human** variant (G215S, described in a
boy) characterised in MDCK **canine kidney cells**, not a study of dogs. It supports the
mechanism only.

That is the second error of this shape after Bellenger, and both had the same cause — writing
a plausible sentence and attaching the nearest citation rather than the one that says it. The
marker `Li` is also the most fragile in the file: it is a prefix of Lien, Linton, Lemmons,
LeVine, Longeri, Langlois, Larose and Lennon, and is kept apart from all eight only by the
`\b` in its branch. Every one of those eight is asserted in the test suite.

## Hydrocephalus shunting and splenic haemangiosarcoma (2026-09-29)

**161 → 159.**

**Schmidt 2024** on DIS-NEU-HYDRO. The page gave the VP shunt success figure (72% improvement) and
listed first-6-month complications, which together read as a procedure with manageable risks. The
review's own emphasis is different: **shunt failure remains the major problem** and commonly leads
to repeat hospital admissions. The page now frames shunting as an ongoing commitment rather than a
single operation, which is what an owner needs to hear before consenting.

**Valenti 2026** on DIS-NEO-HSA — 66 dogs with splenic haemangiosarcoma, and the finding is one the
staging system actively conceals:

- **Not all stage III is equal.** Hepatic metastasis carried significantly shorter survival, while
  **muscular and pulmonary metastases did not correlate with a worse outcome at all**. Current
  staging lumps every metastatic site into stage III.
- Where there *is* liver metastasis, protocol choice matters most: anthracycline-based chemotherapy
  gave **255 days against 65** for metronomic therapy.
- Overall median tumour-specific survival 132 days, with 42% already stage III at diagnosis.

That first point is the kind a page can only get from the literature — a clinician reading "stage
III" off a staging table has no way to know the sites differ this much in what they predict.

## Lumbosacral stenosis and insulinoma — two papers worth citing for their limits (2026-09-29)

**163 → 161.** Both of these are more useful for what they *fail* to establish than for their
headline numbers, and both pages say so.

**Carballo 2024** on DIS-NEU-DLSS proposes a dynamic CT measure — lumbosacral articular process
displacement on dorsal-plane CT in flexion, cut-offs 1.2 mm or a 9% ratio, inter-observer
reliability excellent, **AUC 0.89**. Quoted there, it reads like a new diagnostic test.

But the association **did not survive adjustment for age and weight**, which the authors attribute
to sample size. So the page says the measure is reliable and promising and explicitly says *do not
yet rely on it*. A clinician who saw only "AUC 0.89" would reasonably start using a cut-off the
study does not support.

**Collgros 2023** on DIS-NEO-INSULINOMA (print year 2023, against PubMed's 2022) gives a practical
intraoperative endpoint: keep exploring and resecting until blood glucose rises, which it did in
all 11 dogs by a mean of 6.35 mmol/L. That technique is the citable contribution.

Its outcome figures are labelled **descriptive, not comparative** — 11 dogs, no control group,
median survival 762 days. The paper's own conclusion that the method "resulted in improved
outcomes in all cases" cannot be supported by an uncontrolled series of eleven, so the page reports
the numbers without the causal claim.

Two further findings from it that are useful regardless of sample size: tumour stage was **not**
associated with outcome in that cohort, and three dogs had a second surgery for recurrence with
further disease-free prolongation — so recurrence is not automatically the end of surgical options.

## Polyradiculoneuritis and copper-associated hepatitis (2026-09-29)

**165 → 163.** Back to per-page searching now the reuse seam is worked out.

**Halstead 2022** on DIS-NEU-POLYRADIC — 175 affected dogs against 112 with other nerve or
neuromuscular disease and 226 normals, which is a proper diagnostic-accuracy design rather than
cases-versus-healthy. Print year is **2022** (63(2):104-112) against PubMed's 2021 online date.

The page's work-up was electrodiagnostics, CSF and clinical pattern, with no serology. It now has
a biomarker, and the two caveats that make the number usable:

- anti-GM2 IgG at **65% sensitivity, 90% specificity** (anti-GalNAc-GD1a 62% / 89%, often
  concomitant);
- at 65% sensitivity roughly **a third of affected dogs test negative**, so it supports the
  diagnosis rather than excluding it;
- **anti-GA1 was found in affected and control dogs alike**, so that target does not discriminate
  despite an earlier pilot suggesting it would. A negative finding published against the authors'
  own prior work is worth carrying.

**Ullal 2025** on DIS-HEP-CHRONHEP, which contributes three things the page lacked:

- **Genetics may matter less than the bowl.** Unlike human Wilson disease, which arises from
  inherited ATP7B mutations, canine copper-associated hepatitis appears more driven by excess
  *dietary* copper, with ATP7B playing a lesser role. The page listed copper accumulation as
  "genetic, e.g. Bedlington/Labrador" first.
- Dogs accumulate copper **centrilobularly**; Wilson disease patients periportally at first — worth
  knowing when reading a report.
- Biopsy stays necessary because the non-invasive monitoring tools used in human Wilson disease
  **do not exist for dogs**.

### A search that returned the wrong species

"chronic hepatitis AND dogs AND survival" returned a **human hepatitis B** drug-development paper
as a top hit — dogs appeared only as a pharmacokinetic species. It took re-reading the abstract to
see it. Re-running with canine-specific terms found Ullal. A reminder that species filtering in
PubMed is weaker than it looks when the animal appears anywhere in the methods.

## Rhabdomyolysis and maxillofacial trauma — reuse only (2026-09-29)

**167 → 165**, with no new literature search. Both closed by references already in the file.

- **DIS-MUSC-RHAB → Pardo 2024.** The treatment cornerstone on that page *is* fluid therapy —
  aggressive diuresis at 2–3× maintenance targeting 3–5 mL/kg/h of urine. The AAHA guidelines cover
  resuscitation, rehydration and strategies for specific disorders, and their framing (fluids are
  drugs with their own capacity for harm) matters most exactly where volumes are large and
  sustained.
- **DIS-NASAL-TRAUMA → Sharma 2015 and Pardo 2024.** The page already names concussive head trauma
  among the causes, so the validated TBI tool belongs beside it: MGCS ≤11 predicted non-survival
  with 84% sensitivity and 73% specificity in 72 dogs, the strongest single predictor in that
  cohort. Fluid resuscitation takes the AAHA guidelines.

### Two candidates declined

The matcher also proposed the ACVIM status epilepticus consensus for **DIS-MUSC-RHAB** (status
epilepticus can cause rhabdomyolysis) and for **DIS-MET-HYPOGLY** (hypoglycaemia causes seizures).
Both were rejected. That consensus governs *how to manage status epilepticus*; it is not a source
for the sequelae of status epilepticus, nor for the management of a metabolic cause of seizures.
Citing it on either page would have been a plausible-looking association rather than support for
the sentence carrying it — the Bellenger failure mode, reached by keyword rather than by reading.

Both pages remain uncited until a paper that actually addresses them turns up. A near-miss
suggestion from a matcher is still a suggestion, not evidence.

## Epilepsy, vitamin K coagulopathy, GME — found by a reuse matcher (2026-09-29)

**170 → 167.** Three pages, two of them closed entirely by references already in the file.

### A reuse matcher, and its real signal-to-noise

With 170 pages left and 371 reference strings in the file, I wrote a one-off matcher scoring term
overlap between each uncited page and every existing reference. It proposed candidates for 169
pages, and most were spurious — *Thrombocytosis* matched a feline-diabetes-remission paper on the
words "diabetes, hyperadrenocorticism"; *GIST* matched a cardiomyopathy paper on "large, breed".

But four were real, and two of those I would not have thought of:

- **DIS-GME → the MUO papers.** GME is a subtype of MUO, so Gonçalves and Brewińska apply exactly
  as they already do on DIS-NEU-NME, the other subtype.
- **DIS-BD-VITK → Agostini 2025**, already cited on DIS-BD-ROD. Vitamin K deficiency coagulopathy
  and anticoagulant rodenticide toxicosis are the same therapy question from opposite sides.
- **DIS-WK-EPILEPSY → the ACVIM status epilepticus consensus.**
- DIS-TOX-METHB → the garlic toxicosis case report (declined — one dog).

The matcher is not worth committing as a lint at that noise level, but it paid for itself in one
run. Worth keeping the technique in mind for the remaining pages.

### The epilepsy page named IVETF throughout and cited a textbook

`DIS-WK-EPILEPSY` invokes "IVETF Tier I criterion" for its onset window and renders a block headed
"#IVETF confidence tiers for idiopathic epilepsy" — all against `(Ettinger Ch 247)`.

**There are two IVETF documents here and they are not interchangeable.** The confidence tiers come
from the **diagnostic** proposal (De Risio 2015); the drug choices from the **treatment** proposal
(Bhatti 2015). The best-known IVETF paper is Berendt 2015 on definition, classification and
terminology — which does **not** contain the tiers. Citing Berendt because it is the obvious IVETF
reference would have been a misattribution of precisely the kind Rule 3 exists to prevent, so each
document went to the field it actually governs, and the ACVIM status epilepticus consensus went to
the cluster-seizure sentence.

That page now carries three papers where it had none.

### A tooling bug found in passing

`dbedit.py` could not find `DIS-WK-EPILEPSY` at all. The row is written `{id:"DIS-WK-EPILEPSY"`
with **double** quotes while most rows use single quotes, and the helper matched only the
single-quoted form — so it raised "row not found" on a row that exists. Fixed to accept both. Any
page written in double-quoted style has been invisible to that helper for this whole pass, which is
worth knowing: it fails loudly rather than silently, but it fails for the wrong reason.

## GI: exocrine pancreatic insufficiency, septic peritonitis (2026-09-29)

**172 → 170.**

**Cridge 2024** on DIS-GI-EPI — a **fourth** Cridge paper, added to the existing year map. Its
Crossref print year is **2024** (262(2):246-255) while PubMed shows the 2023 online date, so the
map key is 2024; getting that wrong would have put a marker on a year the map does not know and
produced silence.

Two things it contributes:

- The page's pearl already said failure to respond to enzymes is "often unaddressed B12 deficiency
  or concurrent IBD". Cridge extends that: persistent signs despite correct enzyme replacement are
  increasingly attributed to **enteric microbiota dysbiosis or a concurrent chronic enteropathy**,
  so the instruction is now to look there before escalating the enzyme dose.
- Why cTLI/fTLI is diagnostic rather than merely suggestive — the concentration **directly reflects
  the mass of functioning acinar tissue**, which is also why a borderline value warrants a repeat
  rather than a different test. The page already said to repeat; now it says why.

**DIS-GI-SEPTPERIT — Goggs 2026 and Pardo 2024 reused.** Septic peritonitis is a cause of sepsis,
so the consensus definition of septic shock and the AAHA fluid guidelines both govern it. No new
search needed.

### A case report declined

`Hartmann 2025` describes retroperitoneal T-cell lymphoma causing megacolon in one FeLV-positive
cat. It is a legitimate differential-diagnosis curiosity but a single animal, and DIS-GI-MEGA is
about feline megacolon as a condition — mostly idiopathic. Citing it there would have put a
superscript from one cat behind statements about a common entity, so DIS-GI-MEGA stays uncited
until a proper series is found.

## Neurology: tick paralysis and aural polyps (2026-09-29)

**174 → 172.**

**Holland 2008 and 2023** on DIS-NEU-TICKPARAL, year-keyed. Both are Australian *Ixodes
holocyclus* cohorts and the page separates that from North American *Dermacentor* paralysis, which
has a different course — so these are attached to the *I. holocyclus* bullets only. Applying an
Australian cohort to the Dermacentor statements would have been a species-of-tick error of exactly
the kind the species-marker lint exists to catch for dogs and cats.

Three findings the page gains:

- Focal asymmetrical deficits occur alongside the generalised paralysis — 17 of 197 dogs and 10 of
  89 cats — most often unilateral facial paralysis or anisocoria.
- Where there was facial paralysis or anisocoria the tick was **invariably on the head or neck and
  always ipsilateral** to the facial paralysis. That is a place to search.
- **But a remote tick does not exclude it**: anisocoria occurred in about 10% of animals whose only
  tick was away from the head and neck, so the toxin acts systemically. Without that second point
  the first could be read as a rule-out.
- Facial paralysis resolves significantly more slowly than the generalised signs, so a persisting
  facial deficit after the limbs recover is expected rather than a new problem.

**Veir 2002 reused** on DIS-NEU-POLYP. It was already cited on DIS-POLYP for the same entity.

### Two pages cover the same disease

`DIS-POLYP` ("Nasopharyngeal Polyp", 9,135 chars) and `DIS-NEU-POLYP` ("Aural & Nasopharyngeal
Inflammatory Polyps", 10,387 chars) describe the same condition, with near-identical opening
etiology sentences. Veir legitimately applies to both, so citing it was not the problem — but the
duplication is worth a decision by someone who knows which is canonical, and it is **not** a
citation question, so nothing was merged here.

### A ratchet that fired for an instructive reason

Adding bullets to the tick paralysis `signs` field pushed `crammed-bullets` from 1031 to 1032. The
offending bullet was **pre-existing** — the generalised signs and the *I. holocyclus* signs were
one unbroken run joined by a semicolon. While the field had no pipes at all the lint treated it as
prose; adding pipes made it evaluate the bullets individually and the old semicolon became visible.

So the ratchet was right, and the fix was the one the content wanted anyway: split at the semicolon
so the generalised picture and the Australian-specific picture are separate bullets. Back to 1031.

## Oncology: lymphoma tumour lysis, urothelial carcinoma (2026-09-29)

**176 → 174.**

**Yamazaki 2026** on DIS-NEO-LSA. The CHOP protocol on that page opens with L-asparaginase in
week 1, and the page said nothing about tumour lysis. Among 24 dogs with high-grade B-cell
multicentric lymphoma, laboratory tumour lysis occurred in 5 (21%) and clinical tumour lysis in 2
(8%), associated with **the initial L-asparaginase dose**, pre-existing CKD, weight loss and
metabolic acidosis.

All four are checkable before week 1 begins, which is the practical value. With 24 dogs it
identifies whom to watch rather than providing a validated risk score, and the page says so.

**Maeda 2026** on DIS-NEO-TCC — sorafenib added to piroxicam in 43 dogs with muscle-invasive
disease: 62.8% response rate, median progression-free survival 175 days, overall survival 407 days.
The page notes the comparison was against **historical controls rather than a randomised arm**, so
the size of the gain is unconfirmed — the same caveat applied to the osteosarcoma vaccine trial
earlier, and for the same reason.

Tolerability is recorded too (three grade 3 events, no grade 4–5), because a survival figure
without a toxicity figure makes a treatment look easier to give than it is.

## Haematology: hypercoagulability, CRGV, feline ATE (2026-09-29)

**179 → 176.**

- **Sharp 2019 (CURATIVE Domain 4)** on DIS-BD-HYPERCOAG and DIS-CARD-ATE.
- **Stevens 2018** and **Pisco 2021** on DIS-BD-CRGV.

### A consensus that qualifies the page rather than confirming it

DIS-BD-HYPERCOAG advised "anti-Xa activity to individualise LMWH/DOAC dosing" on a textbook
citation. CURATIVE Domain 4 found evidence sufficient to **recommend** therapeutic monitoring only
for **warfarin and unfractionated heparin**, and **insufficient** to recommend it for aspirin or
LMWH — most of the underlying literature being experimental models or pharmacokinetics in healthy
animals. Anti-Xa monitoring of LMWH is now labelled reasonable practice rather than established.
The same qualification is on DIS-CARD-ATE, which lists dalteparin.

This is the more useful kind of citation: it changes what the page claims rather than decorating
what it already said.

### CRGV already contained its source, uncited

The etiology field read ">91% Nov–May; woodland walks; warmer wetter winters" — which is Stevens
2018's result, unattributed. Now cited, with the parts the page omitted: habitat was the strongest
single predictor (20.3% relative contribution), the number of reporting regions grew between 2012
and 2017, and two space-time clusters sat in and beside the New Forest with a weaker one near
Manchester.

### Two statements that looked contradictory, and were not

The page also said "No livestock / raw-feeding association in UK series", while Stevens found cases
clustering where **cattle and sheep density is lower**. Side by side those read as a contradiction.
They answer different questions — one is an individual dog's exposure, the other a landscape
covariate — and the page now says so explicitly rather than leaving a reader to reconcile them.

### Pisco is two dogs and says so

Cerebral microangiopathy in CRGV, with fibrinoid necrosis of brain arterioles resembling human
complement-mediated haemolytic uraemic syndrome. Useful because neurological signs in a CRGV dog
would otherwise be unexplained, and because it implicates the alternative complement pathway — but
it is **two reported dogs**, so the page frames it as a caution, not a frequency.

## Back to disease pages: shock, heat stroke, AKI (2026-09-29)

**185 → 179.** Six pages, and five of them came free from the protocol work: the guidelines found
for protocols govern the matching disease pages too.

| Page | Source | How |
|---|---|---|
| DIS-SHOCK-SEPTIC | Goggs 2026 | **reuse** — consensus definition of septic shock |
| DIS-SHOCK-HYPOVOL | Pardo 2024 | **reuse** — AAHA fluid therapy |
| DIS-SHOCK-TRAUMA | Pardo 2024 | **reuse** |
| DIS-ENV-HEAT | Thawley 2026 | **reuse** — RECOVER first aid covers heat stroke |
| DIS-SEC-AKI | IRIS 2026 + Lippi 2024 | reuse + new |
| DIS-BD-NRA | Lippi 2024 | new |

### The Rule 4 / Rule 5 split showed up in the numbers

Adding IRIS to DIS-SEC-AKI moved the **uncited** count but not the **without-a-paper** count: IRIS
is a URL-only society guideline, so `isPaper` is false. The page went from citing nothing to citing
the scheme it is built on, and still did not satisfy Rule 4.

That is the distinction working as designed rather than a defect — Rule 5 accepts guidelines, Rule
4 wants papers — but it means a guideline alone cannot close a disease page. Lippi 2024 was added
for that reason, and it is a good pairing anyway: the frequency of anaemia in AKI rises with IRIS
grade (72% of 120 dogs, 88% non-regenerative), so the paper and the grading scheme speak to each
other on the page.

**DIS-SEC-AKI never said whose grading scheme it rendered.** The page has always shown an
`{{IRIS_AKI_TABLE}}`; it now names IRIS, with the adoption history.

### DIS-BD-NRA gained a cause it was missing

Its non-regeneration differential listed marrow disease, iron deficiency and inflammation. AKI
belongs there — 72% of AKI dogs anaemic, 88% non-regeneratively — and CKD was the only renal
cause the page acknowledged.

## Protocols complete: all 56 Rule 5 compliant (2026-09-29)

**17 → 0.** Final state:

| | count |
|---|---|
| consensus or guideline cited | 17 |
| no consensus, and says so | 39 |
| cites only a weaker source | 0 |
| no citation at all | 0 |

### Three more guidelines that would have been disclosed away

The pattern held to the end. Searching before disclosing found three documents I had assumed did
not exist:

- **Pardo 2024** — AAHA fluid therapy guidelines, which explicitly cover fluid administration for
  **resuscitation**. That is the core of PROT-SHOCK, and of the fluid step on several others.
- **Odunayo 2021** — AVHTM TRACS Part 3, the transfusion-reaction consensus, defining 14 reaction
  types with diagnostic and treatment algorithms. Cited on PROT-BLEED-HEMABD.
- **IRIS grading of acute kidney injury**, 2026 revision. PROT-REN-AKI uses the I–V grading
  throughout, so disclosing "no consensus exists" there would have been false about a scheme the
  protocol is built on.

Counting from the start of the protocol work, **five** guidelines were found only because the
disclosure was checked rather than asserted: ACVIM IVDE, RECOVER first aid, RECOVER anaphylaxis,
AAHA fluids and IRIS. That is the single most useful thing learned here.

### Citing IRIS without composing it

IRIS is web-published with no DOI. Rather than write the citation from memory — which Rule 6
forbids and which is how wrong metadata enters a repo — the organisation's full name
("International Renal Interest Society"), the document title ("IRIS grading of acute kidney
injury"), the 2026 revision and the PDF path were read off the IRIS site. The page also records
that the scheme was provisionally adopted in 2012 and finally adopted in 2013, which is now on the
protocol.

Worth restating: **a URL-only society guideline is compliant for a protocol but would not count as
a paper for a disease page.** Rule 5 accepts guidelines; Rule 4 wants papers. `report-refs` and
`report-protocol-refs` disagree about IRIS on purpose.

### Partly guideline-backed protocols say so

PROT-GI-GDV, PROT-REPRO-PYO and PROT-URO-OBS have consensus backing for their **fluid
resuscitation** and none for the condition-specific management that follows. Both facts are on the
page. The report counts them as compliant because they do cite a guideline, so the page text is
what carries the distinction — a protocol that cited AAHA fluids and said nothing else would imply
the surgical decisions were guideline-backed too.

### What the disclosures rest on

39 protocols carry the disclosure, each preceded by a title-scoped search of the relevant cluster:

| Cluster | Searched for | Applicable result |
|---|---|---|
| toxicology (22) | consensus/guidelines + toxicosis, poisoning, intoxication, decontamination; recommendations + rodenticide, acetaminophen, organophosphate, lead | none |
| ophthalmology (7) | consensus/guidelines + glaucoma, uveitis, retinal detachment, ophthalmology | none — hits were human ISCEV standards and Korean veterinary education guidelines |
| emergency and neuro | consensus/guidelines + GDV, pyometra, intervertebral disc, snake envenomation, heat stroke, anaphylaxis; and + DIC, transfusion, haemoabdomen, spinal cord injury | ACVIM IVDE, RECOVER first aid, RECOVER anaphylaxis, TRACS — all now cited |
| shock | fluid therapy guidelines | AAHA fluid therapy — now cited |

Recording the queries is the point: the disclosure is a factual claim about the literature, and
this is what makes it auditable rather than merely asserted.

### Uniform caveat across the emergency literature

Every consensus cited on a protocol rates its own evidence as weak, and each page says so — the
RECOVER anaphylaxis guidelines have all 12 recommendations on low or very low evidence or expert
opinion; RECOVER first aid 15 of 38 low/very low and 18 expert opinion; RECOVER monitoring
predominantly very low; ACVIM IVDE mostly observational with the timing of decompression
unresolved; TRACS with significant self-identified knowledge gaps; ISFM diabetes with substantial
data lacking. A protocol read during an arrest should not imply more certainty than its source
claims.

## Protocols: eye, IVDD, heat stroke, anaphylaxis (2026-09-29)

**28 → 17** protocols short of a consensus-grade source. 11 now cite one, 28 disclose that none
exists, and *cites only a weaker source* stays at zero.

### The due-diligence search stopped two false statements

I expected the neurology and emergency protocols to need disclosures like the toxicology ones. A
title-scoped search for a consensus or guideline on GDV, pyometra, intervertebral disc, snake
envenomation, heat stroke or anaphylaxis returned **two documents that plainly govern protocols in
this app**:

- **Olby 2022** — ACVIM consensus statement on acute canine thoracolumbar intervertebral disc
  extrusion. Writing "no consensus exists" on PROT-NEU-IVDD would have been flatly false.
- **Thawley 2026** — RECOVER first-aid guidelines, which cover heat stroke among prehospital
  conditions, and whose abstract mentions that allergy and anaphylaxis are "reported elsewhere".
  Following that pointer found **Burkitt-Creedon 2026**, the RECOVER acute allergy and anaphylaxis
  guidelines, with a published Acute Hypersensitivity Reaction Algorithm.

This is the argument for searching before disclosing. The disclosure clause is a legitimate Rule 5
outcome, but it is a factual claim about the literature, and asserting it without looking would
have put a false statement on a protocol read during an emergency.

### The eye protocols

A title-scoped search for a veterinary consensus or guideline on glaucoma, uveitis, retinal
detachment or ophthalmology returned 27 records; sampling them found human-medicine documents
(ISCEV electrophysiology calibration standards) and veterinary **education** guidelines from
Korea — nothing on emergency ocular management. Seven eye protocols therefore carry the
disclosure.

**PROT-EYE-HTNRD is the exception, and did not need a search.** It is a hypertension protocol that
happens to present through the eye, so the ACVIM hypertension consensus governs it — already
verified in this file for the disease pages. Its SBP thresholds and target-organ framing now cite
it.

### A hazard created and then closed

Adding two more RECOVER documents made the existing `/^RECOVER/` branch dangerous: it ignored the
year, so a bare `(RECOVER 2026)` would have silently resolved to the **2024 monitoring**
guidelines. RECOVER is now year-keyed, the two 2026 documents are marked by surname, and a test
asserts that `(RECOVER 2026)` resolves to **nothing** rather than to the wrong paper.

That is the same failure this file has now defended against for Phillips, O'Neill (twice), Evans,
Scott and Gold. The pattern is consistent enough to state as a rule: **the moment a second
document shares a marker, the marker must dispatch on something, and the fallback must be silence
rather than the first document.**

### Every one of these guidelines rates its own evidence as weak

Worth recording because it is uniform across the emergency literature, and because a protocol
should not imply more confidence than its source:

- RECOVER monitoring — predominantly very low quality, some expert opinion
- RECOVER first aid — 15 of 38 recommendations low/very low, 18 expert opinion
- RECOVER anaphylaxis — all 12 recommendations low/very low (7) or expert opinion (5)
- ACVIM IVDE — mostly observational literature, low-to-moderate evidence, ideal timing of
  surgical decompression still unresolved
- ISFM diabetes — substantial data lacking in many areas

Each of those caveats is now on the corresponding protocol page.

## Protocols: sepsis, and the toxicology disclosures (2026-09-29)

**50 → 28** protocols short of a consensus-grade source. One real consensus added and 21
disclosures written under Rule 5's "say so" clause.

### Sepsis

**Goggs 2026** — a consensus statement *and* a systematic review, so it clears Rule 5 twice.
Two things now on PROT-SEPSIS:

- Septic shock is defined as the subset of sepsis with cardiovascular instability and metabolic
  evidence of impaired perfusion **persisting despite adequate fluid resuscitation** — clinically
  hyperlactataemia, persistent hypotension, progressive organ dysfunction.
- 🐱 The consensus reached **far fewer conclusions for cats**, because the data are thinner. Said
  plainly on the page, so a reader does not take the canine recommendations as equally supported
  in cats.

### The 21 toxicology disclosures, and the searches behind them

Rule 5 says that where no consensus exists the protocol must **say so** rather than quietly rest
on something weaker. That is the honest answer for veterinary toxicology, but "no consensus
exists" is itself a claim, so it was checked rather than assumed. Two title-scoped searches:

- consensus **or** guidelines in the title, with toxicosis / poisoning / intoxication /
  decontamination — **0 results**;
- recommendations **or** management guidelines in the title, with rodenticide / acetaminophen /
  organophosphate / lead poisoning — 3 results, none applicable.

Recording the queries matters more than the conclusion: it makes the claim auditable, and someone
finding a guideline later can see exactly what was searched and why it was missed.

Each of the 21 now carries two bullets — that no consensus or society guideline covers the
toxicosis, and that the protocol therefore follows poison-control reference data and published
case series, which is current practice rather than agreed guidance.

**PROT-TOX-METALD moved category rather than gaining a citation.** It cited the VETgirl eBook and
nothing else, which the report classified as *cites only a weaker source* — the one protocol in
that state. With the disclosure it is now correctly *no consensus, and says so*, while still
citing the reference data it actually uses. "Cites only a weaker source" is now zero.

### Two lints shaped the work rather than just checking it

- **`lint-protocol-actions` caps notes at 200 characters unless bulleted.** The disclosure came to
  232 characters and, on the six protocols whose last step had an empty note, became one
  unbroken run. It is naturally two statements, so it was split on a pipe into two bullets —
  better to read, and the lint was right to object.
- Earlier the same lint caps `action` at 130 characters, which is what stopped citations going
  into step headlines.

### Independent confirmation the block renders

Mid-batch, vetic's CI regenerated the **PROT-CPR** visual baselines; the screenshots grew by about
9 KB, which is the new References section appearing on a protocol page. A second regeneration
request covers the rest of this batch.

## Protocols: the machinery, and the first six (2026-09-29)

Rule 5 sets a higher bar than Rule 4 — an ACVIM consensus or equivalent society guideline, not a
textbook or a single cohort. Starting the protocols turned up something that had to be fixed
before any citing was worth doing.

### Protocols rendered no citations at all

`ProtocolDetailView` was 19 lines and had no reference machinery: no numbering context, no
References block. Yet protocols already named their guidelines in prose — `(RECOVER 2024)` three
times on CPR, `(AAHA 2023)` five times on the Addisonian crisis, `(IRIS …)` on AKI. Adding a
citation marker to a protocol would have produced exactly the defect this whole pass has been
correcting: a page that names its source without citing it.

So the References block was extracted from `DiseasePageView` into `referencesBlock.tsx` and wired
into `ProtocolDetailView`. Protocol steps already render superscripts, because `ProtocolStep` uses
the shared `Bul` markup renderer, which calls `splitCitations`. Only the numbering context and
the footnote were missing.

**Wiring it alone made PROT-ENDO-ADDISON compliant** — its two `(AAHA 2023)` / `(FECAVA 2023)`
parentheticals had been resolving to real references all along with nowhere to display them.

### A different compliance test from disease pages

`report-protocol-refs` is deliberately NOT a variant of `report-refs`, for two reasons:

- **`isPaper` is the wrong test here.** A society guideline published only on the web — IRIS
  grading, the AHS heartworm guidelines — has no DOI and no volume, so `report-refs` would not
  count it as a paper. For a protocol it is fully compliant: Rule 5 accepts guidelines, Rule 4
  wants papers.
- **A peer-reviewed paper can be non-compliant.** A single cohort is a paper but not a body's
  position. `PROT-TOX-METALD` is the worked example: it cites the VETgirl toxicology eBook and
  nothing else, and the report classifies it as *cites only a weaker source* rather than counting
  it as covered.

Rule 5's "where no consensus exists, say so" is a first-class outcome in the report, matched on a
fixed phrase so it cannot be satisfied by vague hedging.

Starting position: **6 of 56 compliant, 50 short**, ratcheted as `protocols-without-consensus`.

### Also extended: the integrity lint now scans protocols

`lint-refs-integrity` only ever walked `DB.disease_page`, so protocol markers had none of the
guarantees disease pages do. Extending it found **five unresolved protocol markers** immediately:
`(AAHA)`, `(AAHA first-choice)`, `(AAHA 2018 DM guidelines)` on the DKA protocol and
`(ACVIM/IVAPM)` on the hypertensive-crisis one.

### Two attributions corrected

- **`(ACVIM/IVAPM)` → `(ACVIM 2018)`.** The long-term BP targets (SBP <150 dog, <160 cat) come
  from the ACVIM hypertension consensus. IVAPM is a pain-management academy and does not publish
  blood-pressure targets, so that half of the attribution was wrong rather than merely unresolved.
- **`(AAHA 2018 DM guidelines)`.** Superseded. The 2026 AAHA diabetes guidelines cover diagnosing
  and treating ketoacidosis and explicitly retain what still holds from the 2018 edition — but
  they are written **for cats only**, which the protocol now states rather than letting a
  cat-specific document silently back a dog-and-cat protocol.

### `doses` was missing from every citable-field reader

The most citation-worthy text on a protocol is the drug regimen, and `ProtocolStep` has a
separate `doses` field that I omitted from the view, the integrity lint and the report. Fixed in
all three. It surfaced only because two citations landed in notes whose steps also had `doses`.

### A constraint worth recording: citations go in `note`, never `action`

`lint-protocol-actions` caps `action` at 130 characters because it renders as the step headline.
My first attempt appended citations there and failed the lint on two protocols. Citations belong
in the step's `note` — which is also the better place for them, since a headline should say what
to do, not where it came from.

### The first six

| Protocol | Source | Tier |
|---|---|---|
| PROT-CPR | Brainard 2024 RECOVER monitoring guidelines | society guideline |
| PROT-SEIZ | Charalambous 2024 ACVIM status epilepticus consensus | ACVIM consensus |
| PROT-BLEED-IMTP | LeVine 2024 ACVIM ITP diagnosis **and** treatment | ACVIM consensus ×2 |
| PROT-VASC-HYPERT | Acierno 2018 ACVIM hypertension consensus | ACVIM consensus |
| PROT-ENDO-DKA | AAHA 2023 endocrinopathies + AAHA 2026 diabetes (cats) | society guideline |
| PROT-ENDO-ADDISON | AAHA 2023 endocrinopathies + FECAVA hypoadrenocorticism | society guideline |

Five of these six needed **no new literature search** — the consensus statements were already
verified in the file for disease pages and simply were not reaching the protocols they govern.

On CPR the page now also carries what RECOVER says about itself: the monitoring recommendations
were graded **predominantly very low quality evidence**, some of it expert opinion. A protocol
followed in an arrest should not imply more certainty than its source claims.

## Feline cholangitis and primary hyperparathyroidism (2026-09-29)

Two pages, 187 → 185.

- **Watson 2025** on DIS-HEP-CHOLANGITIS. Establishes that cholangitis is the **commonest liver
  disease in cats**, and adds the point the page most needed: "lymphocytic cholangitis" may not be
  a single disease — histology, clinical picture and treatment response are all heterogeneous.
  That is the likeliest explanation when a case refuses to behave like the textbook, and a page
  that presents a clean neutrophilic/lymphocytic dichotomy actively obscures it. The chronic
  neutrophilic form overlapping both categories is now noted too.
- **Rosa-Padilla 2026** on DIS-ENDO-PHPT — 202 surgically treated dogs across three hospitals.

Three findings the hyperparathyroidism page gains:

- Only **68%** had hypercalcaemia-associated signs, so a third are found on biochemistry rather
  than because they look ill.
- Persistent hypercalcaemia after surgery in **12.4%** (25/202), mostly from removing the wrong
  tissue or multiglandular disease, with 15 dogs needing a second operation. The page previously
  said "usually curative" and named only transient hypocalcaemia as the risk.
- **Neither preoperative ionised calcium nor PTH distinguished** the dogs whose hypercalcaemia
  persisted from those it resolved in — so nothing measurable beforehand identifies who will need
  a second look, which is worth saying explicitly rather than leaving a clinician to assume a
  higher calcium means a harder case.

True recurrence was rare by contrast: 1 of 79 dogs followed past 6 months.

## Gingivostomatitis and hepatic lipidosis (2026-09-29)

Two pages, 189 → 187.

- **Rivas 2023** on DIS-DENT-STOMAT. Confirms full-mouth extraction as the standard of care, and
  adds what the page lacked about the refractory fifth: those cats may face lifelong medical
  management or euthanasia, and adipose-derived mesenchymal stromal cells are the most promising
  option for them — with the honest caveat that giving MSCs *immediately* after extraction rather
  than after failure has not been tested.
- **Xu 2026** on DIS-HEP-LIPIDOSIS, scoped tightly on purpose.

### A promising test that is not yet a test

Xu reports serum 3-hydroxybutyrate above 2.43 mmol/L separating affected cats from controls with
92% sensitivity and 88% specificity, AUC 0.86. Quoted bare, that reads as a usable diagnostic.
But the controls were **healthy** cats, and the authors themselves say future work must include
disease controls such as cholangitis and hepatitis to establish specificity. A cat being worked
up for lipidosis is precisely a cat that might have cholangitis instead, so the comparison that
matters has not been done. The page carries the numbers **and** that limitation in the same
bullet, and labels the metabolomic findings (7 cats) mechanistic rather than diagnostic.

This is the same failure shape as the D-dimer "high NPV" claim found earlier: an impressive
operating characteristic against the wrong comparator.

### Two papers rejected as too basic-science for a clinical page

`Soltero-Rivera 2026` (CD8+ T-cell exhaustion transcriptomics in FCGS) and
`Soltero-Rivera 2024` (transcriptomic biomarkers) are real peer-reviewed work but offer nothing a
clinician can act on, and citing them would have decorated the page rather than supporting a
claim. Rule 4 asks for a paper the page *rests* on, not merely a paper about the disease.

## Periodontal disease, feline diabetes, gallbladder mucocele (2026-09-29)

Three pages, 192 → 189, uncited 58 → 56.

- **O'Neill 2021 (periodontal)** on DIS-DENT-PERIO — 22,333 UK primary-care dogs. One-year
  period prevalence 12.52%; 18 breeds above crossbreds, highest Toy Poodle OR 3.97, King Charles
  Spaniel 2.63, Greyhound 2.58, CKCS 2.39. Brachycephalic 1.25× mesocephalic, spaniels 1.63×
  non-spaniels, and odds **fall** as adult bodyweight rises — so small size is the risk, which is
  the opposite of the intuition for most diseases.
- **Sparkes 2015 (ISFM consensus)** on DIS-ENDO-DM. Supports what the page already advised for
  cats, and the page now also carries the panel's own caveat: substantial data are lacking in
  many areas, so these are practical recommendations rather than trial results.
- **Pagani 2026** on DIS-HEP-MUCOCELE — 41 dogs, 30-day mortality after cholecystectomy 14.6%.
  Three predictors are identifiable **before** surgery (leukopenia, CRP >0.8 mg/dL, abdominal
  effusion on ultrasound); necrotising cholecystitis also predicted death but only from
  histopathology afterwards, which the page says so the reader does not look for it preoperatively.

### The fourth O'Neill paper, and the third collision

O'Neill now has four VetCompass papers across **two colliding years** — GDV and corneal
ulcerative disease both 2017, KCS and periodontal disease both 2021. A `*_BY_YEAR` map cannot
separate a same-year pair, so each collision is broken by a keyword in the marker (`cornea`,
`periodont`) tested before the year lookup. Without the new qualifier the periodontal page would
have cited the dry-eye paper — the Phillips failure mode, one year later.

A test now pins all four resolutions together, because the map alone looks complete and gives no
hint that two of its four papers are unreachable through it.

### Two records deliberately not cited

- **AAFP 2016 feline hyperthyroidism guidelines** (PMID 27562983) is indexed as a **Letter with
  no abstract** — it is the erratum/notice, not the guidelines paper. Rule 6 warns that a search's
  top hit is often the wrong record, and Rule 3 forbids writing from a record with no abstract.
  DIS-ENDO-HYPERTHY stays uncited until the actual guidelines paper is read.
- **Pagani's paired percentages** ("abdominal effusion 5/6 [83.3%] vs 26/35 [74.3%]") are
  ambiguous in the abstract — they read as the proportion carrying the factor rather than
  mortality within it. Only the unambiguous findings were used: the 14.6% mortality and the
  identity of the preoperative predictors.

## Coccidioidomycosis, heartworm, cytauxzoonosis, feline lower urinary (2026-09-28)

Five pages, 197 → 192. Four new papers plus one reuse.

- **Jaffey 2026 + Berlin 2024** on DIS-INFECT-COCCI. Jaffey (31 dogs): 84% reached remission at a
  mean 259 days, relapse in 4 of 26 (15%). Both clinical scores and IgG titres improve sharply by
  the first 3-month visit and then barely move — so the page now says a plateau is expected
  rather than treatment failure, which is the sort of thing that otherwise reads as a stalled
  case. Berlin (32 dogs) justifies the monthly liver check already on the page: 15 of 32 developed
  a raised liver enzyme on fluconazole, ALP 34% and ALT 25%, **all mild**, and none predicted by
  dose, duration, age, weight or concurrent prednisone.
- **Maerz 2026** (283 dogs) on DIS-CARD-HW. None of the 221 retested at 6 months remained antigen
  positive. Complications were mild and *eased* with successive injections — injection-site
  soreness 9.2% after the first dose against 2.1% after the third. Two dogs (0.7%) died, neither
  conclusively from melarsomine. The page now names the clinical use of this: fear of melarsomine
  complications is the usual reason owners are offered slow-kill instead, and this cohort finds
  that fear largely unsupported.
- **Reichard 2024** on DIS-INFECT-CYTAUX is **seven cats**, so it carries only what a case series
  can — the presentation list and documented range expansion into Indiana, plus that acaricides
  are the best protection available. Nothing about frequency or outcome, and the page states the
  number.
- **Weese 2019 reused** on DIS-URO-FIC and DIS-URO-URETHRAL-OBS. Both pages already said not to
  reflexively treat a positive culture; subclinical bacteriuria and urinary catheters are two of
  the things the ISCAID urinary guidelines explicitly cover, which is exactly the authority those
  statements were missing.

**Tooling note.** Europe PMC went down mid-batch (503) for the second time today, so discovery
switched to PubMed field-tagged queries. Its bracketed year-range syntax (`PUB_YEAR:[2015 TO
2026]`) is also what broke two Europe PMC queries earlier — worth avoiding.

## Retrovirus, blastomycosis, panleukopenia (2026-09-28)

Four pages, 201 → 197, uncited 59 → 58.

- **Little 2020** (2020 AAFP retrovirus guidelines) serves **both** DIS-INFECT-FELV and
  DIS-INFECT-FIV. Adds that one test at one moment may not settle status (repeat by a different
  method; test at acquisition, after exposure, before FeLV or FIV vaccination, and whenever
  illness occurs), and that the guidelines describe a **paucity of data** on antiretroviral and
  immunomodulatory drugs — which reframes the antiviral options already listed on the FIV page
  as poorly evidenced rather than established.
- **Reinhart 2026** (14 dogs) on DIS-INFECT-BLASTO. The page already said itraconazole needs
  therapeutic drug monitoring; this is why. There was **no correlation between dose and serum
  concentration**, 12 of 14 dogs needed at least one adjustment to reach the 2–7 µg/mL trough,
  and 9 needed further adjustment even after reaching it. The dose required also **falls** over
  treatment — median 2.8 mg/kg/day at remission against 4.9 initially over a median 7.9 months.
- **Naseri 2025** (30 cats) on DIS-GI-FPV.

### A recent cohort disagreeing with the page, kept rather than hidden

The panleukopenia page said "aggressive in-hospital care >90% survival". Naseri's 30 cats had
**63.3% survival and 36.7% mortality**. Rather than overwrite either figure, both are now on the
page with the reason they differ stated — outcome depends on the population and on what
intensive support is actually available. Overwriting the optimistic number would have been as
misleading as ignoring the pessimistic one.

Its glycocalyx biomarkers (syndecan-1, endothelin-1) did predict mortality, and the page says
plainly that these are **research assays rather than tests you can order** — otherwise the
superscript implies an available test.

### Two self-inflicted errors, caught by the gates

Inserting a bullet immediately **before** a `#Salvage:` header on the blastomycosis page left
that header with no content beneath it. `lint-blocks` and a `blocks.test.ts` case both failed,
naming the field. Moved below the header. The lesson is positional: on this schema a `#header`
bullet must be followed by its content, so new bullets go *after* the block they belong to, not
before the header that introduces it.

Also `tx2:'#Salvage:` is the **start** of a field, not preceded by `|`, so the first anchor
attempt missed. `dbedit.py` raising on a miss rather than silently doing nothing is what made
that obvious immediately.

## Parasitology batch: intestinal parasite prevalence (2026-09-28)

Six pages from two papers, 207 → 201, uncited 61 → 59. Both are Zoetis Reference Laboratories
datasets from the same 2023 US submissions — one canine, one feline, same first author, so
`Nagamori` is year-keyed (2025 dogs, 2026 cats).

| Parasite | Dogs (n=48,510) | Cats (n=15,395) | Page |
|---|---|---|---|
| *Giardia* | 5.27% | 4.82% | DIS-GI-GIARDIA |
| *Ancylostoma* | 3.14% | 0.61% | DIS-GI-HOOK |
| *Toxocara* | 2.07% (*T. canis*) | 4.75% (*T. cati*) | DIS-GI-ROUND |
| *Cystoisospora* | 1.95% | 3.40% | DIS-GI-COCCI |
| *Trichuris* | 0.88% | 0.01% | DIS-GI-WHIP |
| *Cryptosporidium* | — | 0.75% | DIS-GI-CRYPTO |

Overall, at least one parasite in 12.27% of canine and 13.52% of feline submissions.

The species contrasts are what make these worth citing rather than just the raw numbers:
*Giardia* outranks every helminth in **both** species; hookworm is five times commoner in dogs
than cats; roundworm runs the other way; and **whipworm is effectively canine-only** at 0.88%
against 0.01%. Also recorded on the whipworm page: regional differences were significant but,
unlike hookworm and roundworm, there was **no** significant region-by-season interaction, so
whipworm risk does not track the seasons the same way.

**Stated inline on every page**: these are US submissions for faecal examination in 2023, so
they are the odds of finding a parasite in an animal someone decided to test — not true
population prevalence. Without that, a superscript turns a selected denominator into an
epidemiological fact.

### A bug worth a lint: control characters from escape layering

The Nagamori branch resolved to nothing and the lint caught it, but the cause took two passes to
find. Generating the file through a shell heredoc into Python had written **0x08 backspace
bytes** where `\b` was intended, so the year regex read `/<BS>(?:19|20)\d{2}<BS>/` and could
never match. `tsc` accepts it, the regex is valid, the branch is reachable, and `grep` displayed
it as though it were correct — only dumping the raw bytes revealed it.

This is the second time: an earlier pass wrote a **NUL byte** in place of a space in
`lint-refs-integrity.ts` itself, which made `grep` treat the whole file as binary and silently
match nothing.

`lint-refs-integrity` gained **check 7**, which scans both source files for stray control
characters and says what the likely cause is (an escape consumed a layer too early).
Mutation-tested by reintroducing the backspace: check 1 reports the symptom (markers resolving
to nothing) and check 7 names the cause with a line number. A full sweep of both files found no
other control characters.

## Toxicology batch: intravenous lipid emulsion (2026-09-28)

Seven pages from two papers, 214 → 207, uncited 62 → 61. Nine pages recommended ILE with
nothing behind it; these are the two largest bodies of evidence on the modality.

- **Markert 2023** — 313 dogs and 100 cats. Positive effect 74%, no discernible effect 22%,
  worsening 4%, overall survival 96%. Median total dose 8.0 mL/kg in dogs and 15.8 mL/kg in
  cats, started a median of 6 h after exposure.
- **Kiwitz 2024** — 82 animals monitored hourly on a fixed protocol. Triglycerides rose about
  ten-fold by 3 h; bicarbonate, base excess, sodium, potassium and ionised calcium all fell
  significantly; animals whose consciousness worsened had the larger triglyceride and lactate
  rises.

### The two papers disagree, and that disagreement is the finding

Suspected adverse effects were **6%** in Markert and **54%** in Kiwitz. Same research group,
overlapping authors, different method: Markert reviewed records, Kiwitz examined patients every
hour and ran serial blood gases. The honest reading is not that one is wrong but that the rate
depends entirely on how hard you look — and all of Kiwitz's were reversible within 33 hours.
That is written onto the pages as a single bullet citing both, because either number alone
misleads: 6% reads as "safe enough not to monitor", 54% reads as "avoid".

### Where it was NOT added, deliberately

**DIS-TOX-STRYCH says ILE has no role** because strychnine is not appreciably lipophilic. That
page mentions lipid emulsion, so a blanket pass over every page mentioning it would have
attached an efficacy cohort to a statement that ILE does not work — the citation would have
argued against the sentence carrying it. It remains uncited, correctly.

DIS-TOX-CHOLE was also left alone: its ILE claim is already explicitly hedged to a single dog,
and a general cohort does not support that specific vitamin D claim.

### Both are mixed-toxicant cohorts, and the pages say so

Markert's toxicants were mostly unidentified (48%), then rodenticides (8%), recreational drugs
and nuts (7% each). Neither paper establishes efficacy for permethrin, ivermectin, bromethalin
or any other single poison. The bullet therefore states inline that it "supports ILE as a
modality rather than for this poison specifically" — without that, a superscript on a
permethrin page would imply evidence that does not exist.

## Oncology batch: MCT grading, osteosarcoma, anal sac carcinoma (2026-09-28)

Three pages, 217 → 214.

| Page | Paper | n | What it carries |
|---|---|---|---|
| DIS-NEO-MCT | Kiupel 2011 | 95 tumours, 28 pathologists | The 2-tier criteria, the concordance failure that motivated them, and the survival split |
| DIS-NEO-OSA | Marconato 2022 | 34 SOC, 20 vaccinated | Standard-of-care benchmark; vaccine effect reported but flagged as non-randomised |
| DIS-NEO-AGASACA | Martin 2025 | 25 dogs | Nodal SBRT outcomes, its late toxicity, and that the primary still needs treating |

**Kiupel was named on the page and credited to a textbook.** The MCT pearl already read "Grade
with both Patnaik (I–III) and Kiupel (low/high)" against `(Ettinger Ch 327)`. Kiupel 2011 is
where the second of those systems comes from. Its print year is **2011** (48(1):147-155) though
PubMed shows the 2010 online date — Rule 6 again.

Two things it contributes that the page did not have:

- The four high-grade criteria in full, any **one** of which suffices: ≥7 mitotic figures/10 hpf,
  ≥3 multinucleated cells/10 hpf, ≥3 bizarre nuclei/10 hpf, or karyomegaly with nuclear diameter
  varying ≥two-fold in 10% of cells.
- **Why the 2-tier system exists**: 28 pathologists across 16 institutions agreed on Patnaik
  grade 3 in 75% of cases but on grades 1 and 2 in **under 64%**. That is a reason to treat a
  grade I/II report as softer than it looks, and it is the kind of fact a grading table alone
  never conveys.

The page's separate claim that "MI <9 confers lower recurrence" was **left alone**. Kiupel's
mitotic threshold is ≥7 per 10 hpf, which is a different number from a different analysis, and
merging them would have manufactured a figure neither source states.

**Osteosarcoma — a vaccine trial used for its control arm.** Marconato's interest is a
peptide-based vaccine, but its 34-dog standard-of-care group (amputation plus adjuvant
carboplatin) is a clean contemporary benchmark: median time to metastasis 240 days,
tumour-specific survival 278 days. That sits a little below the page's textbook figure of
10–11 months, and both are now on the page.

The vaccine result (TTM 308 vs 240 days, survival 621 vs 278) is reported with the reason to
discount its magnitude stated inline: the control dogs were treated **before the vaccine
existed**, so this is a sequential comparison, not a randomised one, with 20 dogs in the treated
arm.

**AGASACA — the toxicity is the point.** Martin's 25 dogs given stereotactic radiation to
metastatic sublumbar nodes reached median survival 451 days, but **12 of 25 developed hind-limb
gait changes** in the late-effects period and hypercalcaemia resolution was inconsistent and
transient. A survival figure alone would have made this look like a straightforwardly good
option. Also recorded: stage did not affect survival in that cohort, and 8 of 25 (32%) recurred
at the untreated primary — irradiating nodes does not remove the need to treat the mass.

**Europe PMC was down (503) throughout this batch**, so discovery ran on PubMed alone. Its
query translation ANDs every term and buries specific papers, and the workaround that found
Kiupel was field-tagged search (`Kiupel M[Author] AND grading[Title] AND mast cell[Title]`)
rather than natural language. Worth remembering: when PubMed returns 0 results for a paper that
certainly exists, the query is over-constrained, not the index empty.

## Urinary batch: stones and urinary infection (2026-09-28)

Five pages, 222 → 217, uncited 63 → 62. **One new reference for five pages**, because two
consensus statements already in the file were not reaching pages they plainly cover.

| Page | Source | How |
|---|---|---|
| DIS-URO-UROLITH-URATE | Lulich 2016 (ACVIM) | **reuse** — Recs 1.2a, 3.4, 3.4.A |
| DIS-URO-UROLITH-CYST | Lulich 2016 (ACVIM) | **reuse** — Recs 1.2b, 3.5, 3.5.A |
| DIS-URO-UTI | Weese 2019 (ISCAID) | new — attribution corrected |
| DIS-URO-PYELO | Weese 2019 (ISCAID) | new |
| DIS-URO-PROSTATITIS | Weese 2019 (ISCAID) | new |

### The ISCAID guideline was named in prose and credited to a textbook

`DIS-URO-UTI` referenced "ISCAID 2019" **three times** — for the sporadic/recurrent/subclinical
classification, for the 3–5 day course, and in its pearl — while every one of those bullets
cited `(Ettinger Ch 307)`. The only ISCAID reference in the file was the **respiratory**
guideline. So the page knew its source, named it on screen, and cited a secondary summary of it.

Weese 2019 is **not open access**, so claims were held to what the abstract supports: what the
document covers (sporadic cystitis, recurrent cystitis, pyelonephritis, bacterial prostatitis,
subclinical bacteriuria) and that it revises the 2011 guidelines. That is enough to carry the
classification bullet and to tell a clinician which document governs on all three pages. **The
antibiotic durations keep their Ettinger citation** — moving them onto Weese would assert a
primary source I have not read, which is the Bellenger failure mode.

### Lulich covers urate and cystine, checked before reuse

Lulich's PubMed abstract is generic — it promises "recommendations for the treatment and
prevention of uroliths" without naming a stone type, and its MeSH terms list only calcium
oxalate and struvite. On the abstract alone, reusing it for urate and cystine would have been a
guess. The paper is open access (PMC5032870), and the full text carries named recommendations
for both:

- urate — **1.2a** dissolution before removal, **3.4** dilute urine, alkalinise, limit purine,
  **3.4.A** xanthine oxidase inhibitor reserved for homozygous hyperuricosuric dogs that have
  already failed a therapeutic diet;
- cystine — **1.2b** dissolution before removal, **3.5** dilute urine, limit animal protein,
  limit sodium, raise pH, neuter, **3.5.A** tiopronin added on top for recurrent formers.

Two of those sharpen what the pages said rather than merely backing it. The urate page listed
allopurinol among first-line prevention, where the consensus positions a xanthine oxidase
inhibitor as a **reserve** after diet failure in homozygous dogs. The cystine page omitted
**sodium restriction** from prevention altogether.

### A tripwire test that fired for the right reason

`numbers the real prostatitis page as a single Ettinger chapter` asserted that page cited
`ettinger-ch314` and nothing else — a deliberate guard that it was single-source. Adding the
ISCAID guideline broke it, which is the test doing its job. Rewritten as *collapses a repeated
Ettinger marker to one entry*, which is the behaviour actually worth pinning: that page repeats
the same marker on nearly every field, so it is the best check that duplicates dedup to one
numbered entry. The assertion now expects both sources.

## Rendered-text audit (2026-09-28)

A class not previously checked: defects a clinician sees on the page. The typechecker, 387
tests and 28 lints were all green with four of these live, because every one is valid
TypeScript and structurally well-formed content.

Scanned 22,168 bullets across 389 disease pages for stray backslashes, empty bullets,
whitespace-padded bullets and unbalanced parentheses. Eight hits, **four real**.

### The serious one: DIS-RESP-PTE rendered dog doses with no species label

The antithrombotic section used `" | "` as a **cat/dog column separator**. But `|` is the
bullet delimiter, so the table rendered as:

    • #Antithrombotic — Table 219.1 (cat
    •  dog) (Ettinger Ch 219)
    • Clopidogrel: 18.75 mg/cat PO q24h
    •  1–3 mg/kg PO q24h          ← unlabelled. This is the DOG dose.
    • Dalteparin: 150 U/kg SC q8–24h
    •  75–150 U/kg SC q12–24h     ← unlabelled. DOG.
    • Rivaroxaban: 2.5 mg/cat PO q24h
    •  1–2 mg/kg PO q24h          ← unlabelled. DOG.

Three drugs produced an orphan dose bullet carrying no species. A reader could take
clopidogrel "1–3 mg/kg q24h" for a cat, which gets a flat 18.75 mg — a mg/kg reading of that
bullet overdoses a 5 kg cat. Now written as one bullet per drug with both doses labelled in
words. **No number was changed**; the cat-then-dog order was stated by the header the page
already carried, and unfractionated heparin already spelled out "cat …, dog …", which
confirmed the order.

### The other three

- **DIS-BD-ENV** rendered `F(ab\'\\)₂` instead of `F(ab')₂` — an over-escaped source string
  leaking backslashes into clinical text.
- **DIS-NEU-TICKPARAL** had a `|` inside a parenthetical, breaking one sentence across two
  bullets, the first ending `"(esp"`.
- **DIS-NEU-POLYP** had a `#heading` bullet that had swallowed its first list item, with the
  remaining items carrying leading spaces.

### What was codified

`npm run lint:render` (in `lint:content`, so it gates — 29 lints now). Four checks, each
mutation-tested by reintroducing the real defect it was written for:

- a backslash in rendered text, which clinical copy never legitimately contains;
- a bullet padded with whitespace, which is the cheap and reliable tell that `|` was used to
  separate columns rather than items — it is what catches the PTE class;
- an empty, leading or trailing `|`;
- unbalanced parentheses, which would also make a citation marker print raw. `"1) Induction…"`
  enumeration legitimately carries a bare `)`, so a bullet opening with one is allowed its
  extra close paren — DIS-NEU-THIAMINE uses that style and is not a defect.

**A trap worth recording.** Fixing the antivenin string, I replaced it with a bare `F(ab')₂`.
That field is **single-quoted**, so the apostrophe closed the string and `tsc` failed — the
same mistake made an hour earlier on the Lyme page. Fields in `db.ts` use both quote styles,
and a repr of a matched field shows Python's choice of quote, not the file's. Check the
file, not the repr, before inserting an apostrophe.

## Infectious batch: cat flu and Lyme (2026-09-28)

Two pages, 224 → 222, and uncited pages 64 → 63.

**DIS-INFECT-URTI — Thiry 2009, reused.** The ABCD feline herpesvirus guideline was already
in the file, cited on four *eye* pages, and not on the page about FHV as an upper respiratory
disease, which is what the guideline is actually about. Added the shedding duration and
contact requirement, the mucolytic/antibiotic supportive detail, and the vaccination schedule
(9 and 12 weeks, booster at a year, then annual for at-risk and 3-yearly for indoor-only,
including cats that have already recovered).

**DIS-INFECT-LYME — Littman 2018, the ACVIM consensus.** Marked as `Littman` rather than
`ACVIM 2018` because `ACVIM_BY_YEAR` already maps 2018 to the hypertension statement; using
the surname avoids needing a keyword qualifier in the resolver.

Its **PubMed abstract is purely procedural** — it states that a consensus statement exists
and what it covers, with no findings. Citing it from that record would have meant attaching
the page's existing thresholds to a source I had not read, which is the Bellenger failure
mode. The paper is open access, so the claims were taken from the full text (PMC5980284)
instead. That turned a thin scope-level citation into real content, and it confirmed rather
than contradicted what the page already said:

- Most Bb-seropositive dogs **and cats** never become ill — unchanged across experimental
  tick-exposure models and field data. The page asserted this against a textbook.
- The 4-week course reflects the organism's protracted behaviour, and doxycycline is the
  panel's first choice for dosing ease, coinfection cover and anti-inflammatory effect.

And it added several things the page did not have:

- 4 weeks at 10 mg/kg q12h **did not clear the organism in every dog** — so treatment is not
  assumed curative.
- Quantitative C6 **magnitude does not predict illness**, and in a seropositive dog that is
  neither clinical nor proteinuric there is no evidence it helps the treatment decision. The
  page previously gave only a post-treatment decline target, which reads as though the number
  carries more weight than the consensus grants it.
- Whole-cell ELISA, IFA and Western blot are **not recommended** (spirochaete cross-reaction),
  nor IgM-versus-IgG testing, since dogs do not present acutely.
- Cefovecin, 2 injections 14 days apart, was as efficacious as 4 weeks of doxycycline or
  amoxicillin — an option for dogs intolerant of tetracyclines.
- Bb is generally not transmitted for at least 36–48 hours after attachment, year-round
  prevention is advised because ticks activate above about 4 °C, and **selamectin does not
  kill ticks** so it is not recommended for tick control.

**A syntax error I caused.** The inserted Lyme text contained "the organism's protracted
behaviour". `db.ts` fields are single-quoted TypeScript strings, so a bare apostrophe ends the
string — `tsc` failed on three counts at that line. Escaped to `\'`. Worth noting the tell:
the shell `&&` chain printed "tsc clean" after a `head` that had already consumed the error
output, so the pass looked green. Read the typecheck's own exit status, not the tail of a pipe.

## Error audit (2026-09-28)

Ran after the GI batch. Mechanical checks were clean — 387 tests, 28 lints, typecheck,
resolver integrity. Three substantive audits were then run over content rather than
structure, and two found real errors.

### Audit 1 — same analyte, two units (the cobalamin bug generalised)

Grouped every measurement in `db.ts` by nearby analyte name and flagged analytes carrying
more than one unit. Nine flagged, **one real**: `DIS-RESP-PTE` gave D-dimer thresholds in
**ng/dL** where `DIS-BD-VASC` and the literature use **ng/mL**.

The other eight were legitimate or artefacts of the audit: cortisol, glucose, albumin and
lactate are all written in both SI and conventional units in this file by design; the
cobalamin `µg/L` hit was a **dose** in µg, not a concentration; the creatinine `g/dL` hit was
the adjacent albumin figure caught by a 130-character context window.

**And the PTE bullet had a second, worse error.** It read "<100 ng/dL = PTE unlikely (high
NPV)". Epstein 2013 measured the NPV at **60%**, with specificity 30%, and concludes
explicitly that PE still occurs in dogs with a normal D-dimer. "High NPV" was the wrong
statistic pointing the wrong way — the 100% figure in that paper is *sensitivity*, below
about 100 ng/mL, in a series with only 10 confirmed cases. The bullet now gives the real
operating characteristics with the sample size, and that page has its first paper.

### Audit 2 — my own numeric claims against the abstracts

Re-checked all 21 numeric claims written in this session against the abstracts. Twenty were
accurate. **One was mine and wrong**: I wrote that cobalamin <200 ng/L and albumin <20 g/L
were "independent risk factors" in Allenspach 2007. The abstract says *univariate analysis*
identified them. "Independent" claims an adjusted model that the abstract does not report.
Corrected on DIS-GI-COBAL, DIS-GI-PLE and DIS-GI-IBD to say univariate.

Worth naming the failure mode: this is not a transcription slip but an upgrade in strength
while paraphrasing. It reads more authoritative and is harder to catch than a wrong number,
because nothing in the sentence looks copied.

### Audit 3 — pasted-wrong DOIs

A wrong DOI is the worst citation error available: the reference string reads perfectly and
resolves to a different paper. Cross-checked all 308 DOI-bearing references by publisher
prefix against journal. Fifteen flagged, **zero real** — every one was my rule being wrong,
not the data:

- Vet Surg and J Feline Med Surg carried Elsevier prefixes because both were Elsevier titles
  before moving to Wiley and SAGE; the older references are correct.
- `Vet J\b` matched **Ir** Vet J (BMC) and **N Z** Vet J (Taylor & Francis). Both confirmed
  correct against Crossref, including Asti 2020 at N Z Vet J 68(2):112-118.
- Nine "unknown prefix" flags were simply publishers absent from my table.

### What was codified

`npm run lint:units` (in `lint:content`, so it gates) asserts canonical units for analytes
where the unit is not a matter of taste — currently cobalamin (ng/L) and D-dimer (ng/mL).
Mutation-tested by reintroducing both real errors.

Glucose, lactate, albumin, calcium and cortisol are deliberately **excluded**: they are
legitimately written both ways here, and a lint that fires on them would be noise, which is
how a real failure gets scrolled past. The first version of the check also required a `<` or
`>` before the number and so missed "at a 250 ng/mL cut-off" — the exact phrasing of the
corrected bullet. It now matches any number carrying a concentration unit, which is safe
because doses are written "250 µg", never "250 µg/L".

## GI batch: chronic enteropathy, cobalamin, colitis, perianal fistulae (2026-09-28)

Nine pages closed, 234 → 225. Only four new papers were needed — three already in the
file covered five of the nine pages once someone looked at what they actually said.

| Page | Paper | n | What it carries |
|---|---|---|---|
| DIS-GI-IBD | Allenspach 2007 | 70 dogs | **reuse** — the paper that defined CCECAI; 18% euthanased over 3 years |
| DIS-GI-DRD | Allenspach 2007 | 70 dogs | **reuse** — diet-first-then-steroids was the tested sequence |
| DIS-GI-PLE | Allenspach 2007 | 70 dogs | **reuse** — albumin <20 g/L an independent risk factor |
| DIS-GI-COBAL | Allenspach 2007 | 70 dogs | **reuse** — cobalamin <200 ng/L predicts negative outcome |
| DIS-GI-COBAL | Toresson 2019 | 36 dogs | Randomised: oral matched parenteral on MMA at every timepoint |
| DIS-GI-ARD | Rudinsky 2022 | 59 dogs | **reuse** — metronidazole lengthened remission and worsened dysbiosis |
| DIS-GI-COLITIS | Rudinsky 2022 | 59 dogs | **reuse** — diet 5 d vs 8.5 d with metronidazole added |
| DIS-GI-GRANCOL | Manchester 2013 | 6 dogs | Invasive *E. coli* in all 6; fluoroquinolone remission 3–30 months |
| DIS-GI-PANCAT | Moser 2018 | 42 cats | 21% had NO sonographic change; sonographic severity did not predict survival |
| DIS-GI-PERIANAL | Bruet 2025 | 20 studies | SoRT-graded consensus: ciclosporin first-line, evidence weak throughout |

**Three registry disagreements, all resolved to the print year per Rule 6.** Toresson
(PubMed 2018 online, Crossref print **2019**), Manchester (PubMed 2012, print **2013**) and
Moser (PubMed 2019, print **2018** — here the print year is the *earlier* one, which is the
opposite of the usual direction and easy to get backwards).

### A units error found while citing, and fixed

Two pages gave the canine cobalamin threshold as **`<200 ng/mL`** — DIS-GI-COBAL and the
cobalamin block on DIS-GI-IBD. It is **ng/L**. DIS-GI-EPI already had it right (`<400 ng/L`),
so the app contradicted itself on the same analyte, and `200 ng/mL` is a thousandfold off:
the reference interval Toresson worked to is 244–959 ng/L and Allenspach's risk-factor
threshold is <200 ng/L. Both are now `ng/L`. Worth noting that the wrong unit had a textbook
citation behind it, so the superscript was no protection.

### Allenspach 2016 was left where it is, deliberately

`Allenspach 2016` (203 dogs, long-term outcome) has **no abstract** in either PubMed or
Europe PMC — the record is title, journal and pages only. It would have been the obvious
paper for the chronic-enteropathy pages, and Rule 3 forbids it: a claim cannot be written
from a bibliographic record. It stays on DIS-GI-EOGAST, where it already was, and
Allenspach 2007 — which has a full abstract and is the stronger paper for these pages
anyway, being the origin of CCECAI — carries the new claims instead. If the Vet Rec full
text becomes reachable, 203 dogs is worth coming back for.

### Claims deliberately not made

- **Allenspach 2007 PLE subgroup.** The abstract gives 70 dogs across three groups but no
  subgroup sizes, so the PLE page cites it for the whole-cohort albumin threshold and for
  how the PLE dogs were treated, not for any PLE-specific proportion.
- **Allenspach 2007 food-responsive proportion.** The trial escalated diet → steroids but
  the abstract never says what fraction responded to diet, so the DRD page says only that
  the sequence was tested, not that most dogs stopped at diet.
- **Moser 2018 and fPLI prognosis.** The abstract contradicts itself — it states there was
  no significant fPLI difference between survivors and non-survivors, then that fPLI
  correlated significantly with prognosis. The page therefore uses only the internally
  consistent findings (sonographic change absent in 21%, and severity not predicting
  30-day survival) and makes no fPLI prognostic claim.
- **Rudinsky 2022 is about ACUTE colitis.** DIS-GI-COLITIS is the chronic page, so the
  bullet says "acute, not chronic" on its face rather than letting the reader assume the
  trial transfers.
- **DIS-GI-TRICHO was skipped.** The only *Tritrichomonas foetus* papers surfacing are
  single case reports, which cannot carry that page's general claims. Left uncited pending a
  treatment or prevalence cohort.

## Neurology batch: intracranial, stroke, trauma, ANNPE/FCE, tetanus (2026-09-27)

Eleven pages closed, 244 → 234. Fifteen papers, all verified against Crossref as well as PubMed.

The arithmetic is worth stating plainly: eleven pages gained a paper, and one page
(DIS-NEU-HORNERS) *lost* the paper it appeared to have, because that citation turned out to
be the `Gold` / "Golden Retriever" collision described below. It was never really cited. Net
movement is therefore ten, and the ratchet in `scripts/baselines.json` should read 234.

| Page | Paper | n | What it carries |
|---|---|---|---|
| DIS-NEU-BRAINTUM | Ruessli 2026 | 106 dogs | 76% no/mild deficits at peak RT response; function did **not** track tumour shrinkage |
| DIS-NEU-BRAINTUM | Magalhães 2021 | 32 dogs | RT MST 524 d overall, 512 glioma, 536 meningioma; definitive ≈ palliative |
| DIS-NEU-CVA | Thomsen 2016 | 23 dogs | All survived to discharge in 1–10 d; CKCS 9/23 |
| DIS-NEU-CVA | Desbordes 2026 | 63 (47 dogs, 16 cats) | Complete territorial infarct + mass effect → early death; ASL hypoperfusion in all non-lacunar infarcts |
| DIS-NEU-METRO | Evans 2003 | 21 dogs | Diazepam: response 13.4 h vs 4.25 d, recovery 38.8 h vs 11 d |
| DIS-NEU-NME | Brewińska 2025 | 127 YST | Scales predict 7-day death only; unilateral MRI ~12×/3× better odds at 100/365 d |
| DIS-NEU-NME | Gonçalves 2024 | 138 dogs | Lower T2 lesion load → survival; higher post-contrast T1 → relapse |
| DIS-NEU-MENINGITIS, DIS-NEU-METABENC | Monforte Monteiro 2025 | 593 | CSF after normal MRI changed dx/tx in 0.8%; **reused**, abstract re-read first |
| DIS-NEU-TETANUS | Dussaux 2024 | 27 cats | 78% focal/multifocal; 23/25 ambulatory at median 25 d; 8/27 sequelae |
| DIS-NEU-ANNPE, DIS-NEU-FCE | Togawa 2024 | 31 dogs | DPP 9/14 (64%) vs DPN 1/12 (8%) regained ambulation |
| DIS-NEU-ANNPE, DIS-NEU-FCE | Phillips 2025 | 40 dogs | No relapse in 4 weeks whether rested or exercised |
| DIS-NEU-HEADTRAUMA | Sharma 2015 | 72 dogs | MGCS ≤11 → 84% sens / 73% spec for non-survival |
| DIS-NEU-HEADTRAUMA | Cameron 2022 | 212 (131 dogs, 81 cats) | MGCS separates survivors in both species; admission hyperglycaemia predicts death in dogs only |
| DIS-NEU-HEADTRAUMA | Levy 2026 | 38 dogs, 31 cats | TBICS ≈ slightly better than MGCS — not yet widely validated |
| DIS-NEU-HORNERS | Lockhart 2022 | 120 dogs | Causative lesion in 98% with additional signs vs 3% with isolated HS; phenylephrine localisation 79% accurate; GR 16/33 of idiopathic cases |
| DIS-NEU-HORNERS | Boydell 1995 | 62 GRs | Original prospective series; lesion localised to the preganglionic neuron |

Every sample under ~30 has its n written into the page text. Two effect sizes are
reported with very wide confidence intervals — Desbordes (OR 400, CI 14.5–11,039) and
Togawa (OR 47.4, CI 2.09–1,074) — so those pages state the direction as established and
the magnitude as uncertain rather than quoting the point estimate.

**Registry disagreements.** Two of the same kind, both resolved to the print year per Rule 6:
Cameron (PubMed 2021 online, Crossref print **2022**, 32(1):75-82) and Lockhart (PubMed 2021
online, Crossref print **2022**, 25(suppl 1):51-59).

**Lockhart is the repair, not just an addition.** The breed note it now supports —
Golden Retrievers over-represented among idiopathic cases — is exactly the sentence that had
a basal-cortisol paper wrongly hanging off it. The claim was right and the citation was
wrong, which is the hardest version of this to notice by reading.

**Deliberately old.** Evans 2003 is still the only controlled comparison of diazepam in
metronidazole toxicosis, and the page already asserted that diazepam shortens recovery —
the paper is what that claim rests on. Rule 1(c) asks for as current as the literature
allows, and here it stops in 2003.

**Reuse discipline.** Monforte Monteiro was reused on two further pages and its abstract
was re-read before either marker was written, per the lesson from the Chochlios
misattribution. Its conclusion is two-sided and both pages say so: CSF after a normal MRI
is low-yield *especially when the neurological examination is normal*, but remains worth
doing when the examination is abnormal or inflammatory disease is genuinely suspected.

### Three wrong citations found while wiring this batch

All three were the same shape — a parenthetical that is not a citation, resolving to a
paper — and none was visible on the page as anything other than a normal superscript.

- **`(Evans syndrome)` on DIS-BD-IMHA** → the metronidazole-diazepam paper. Evans
  syndrome is IMHA with immune thrombocytopenia. Caught by a reference-count test when
  the count went 2 → 3. Fixed by year-keying Evans. There is also a `DIS-BD-EVANS` page,
  so this surname is permanently hazardous here.
- **`(Phillips 2019)` on DIS-GI-HH** → the 2025 ANNPE exercise paper. I added a second
  Phillips without noticing the first, and `/^Phillips/` answered for both. Fixed with
  `PHILLIPS_BY_YEAR`. My own omission: I checked ten new surnames against the file for
  collisions and left five unchecked, including this one.
- **`(Golden Retriever most common)` on DIS-NEU-HORNERS** → a basal-cortisol paper,
  because `Gold` is a source name and matched the breed. **Pre-existing**, found by the
  new lint on its first run. Fixed with a `\b` guard.

The lint gained three checks as a direct result, each mutation-tested against the bug
that motivated it:

- **check 5** — a parenthetical with no year that resolves to a *journal paper* is almost
  certainly a disease name or a breed note colliding with a surname. Textbook markers are
  year-less too, so restricting this to papers is what keeps it quiet enough to gate on.
- **check 6** — one surname cited for two different years must resolve to two different
  ids. This is the Phillips case exactly.
- **check 0** — every `PROSE_QUALIFIERS` entry must still resolve to nothing. Without it
  the allowlist would hide the bug it was created for: un-year-keying Evans made the page
  cite a paper again while the lint stayed silent, because the phrase was simply skipped.

## Resolver integrity is now checked by a lint, not by hand (2026-09-27)

`npm run lint:refs-integrity` (in `lint:content`, so it gates commits) checks the four ways a
citation goes wrong *silently* — the page renders, the tests pass, and the superscript points
at the wrong paper:

1. **A marker resolves to nothing** and prints raw as "(Author 2015)".
2. **An author gains a second paper** and `db.ts` uses a year the `*_BY_YEAR` map does not
   know, so the marker yields no citation at all.
3. **One surname is a prefix of another** and the shorter branch answers for the longer one.
4. **The same paper sits under two reference ids**, so a page renders it twice.

Every one of those had already been found by hand at least once — Bellenger, Ku/Li,
Reeve/Reeves, Michel/Michelotti, Ng/Nguyen — which is why it is automated now. At the time of
writing it checks **10 prefix pairs** and **18 year-keyed authors**, and passes.

Check 3 is the one worth understanding, because the obvious version of it does not work. A
swallowed marker **still resolves** — it returns the shorter name's paper, confidently, under a
well-formed superscript. An empty-result check cannot see that. So the lint instead asserts that
the ids reachable from the short name and from the long name are **disjoint**: two surnames
landing on the same reference id is the signature of one eating the other. Each check was
mutation-tested by deliberately breaking it (dropping a `\b`, hoisting a branch, orphaning a
year, colliding two DOIs) and confirming it fails, then reverting.

### `(Scott)` on DIS-BD-TPATH is not a citation

Scott syndrome is a platelet membrane procoagulant defect — a **disease name**. While `Scott`
resolved by surname alone, `/^Scott/` matched it and hung the phenobarbital-marrow paper off
the words "membrane procoagulant (Scott)": a superscript on a condition, pointing at an
unrelated study. Year-keying `Scott` for a second paper fixed it as a side effect, before
anyone noticed it was broken.

Two tests now hold it there — `parseSources('Scott')` must return `[]` while `Scott 2021` still
resolves — because the natural-looking "fix" is to make a bare surname resolve again. The same
reasoning covers the other deliberate non-citations: `(AAHA/AAFP)` on DIS-ENDO-HYPERTHY and
`(Librela)` on DIS-MSK-OA are prose, and the lint keeps them on a named allowlist
(`PROSE_QUALIFIERS`) so a *new* unresolved marker is still a failure rather than noise.

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

## Batch — DIS-GI-HELICO, DIS-NEO-MM (161 → 157 after the previous batch's 2)

Counted 159 → 157.

### DIS-GI-HELICO — Helicobacter-associated Gastritis

**Sharman M, Bacci B, Simpson K, Mansfield C. Comparison of in vivo confocal
endomicroscopy with other diagnostic modalities to detect intracellular
helicobacters. Vet J. 2016;213:78-83. doi:10.1016/j.tvjl.2016.03.014**

- 14 **clinically healthy** dogs, standard gastroduodenoscopy then confocal
  endomicroscopy with topical acriflavine; biopsies for histopathology, PCR, FISH.
- Non-*H. pylori* helicobacters: 13/14 on confocal, 11/14 on histopathology.
  FISH placed organisms **intracellularly in 13/14**; confocal could not see
  intracellular organisms with the fluorophore protocol used.
- Distribution was diffuse and multifocal through the stomach.
- Rule 2: n=14, stated inline in all three bullets. The page's central claim is
  that colonisation is common in healthy animals, and 13 of 14 *healthy* dogs is
  a strong datum for exactly that claim even at n=14 — the hedging is about not
  reading the detection percentages as validated sensitivities.
- Rule 3 care point: "intracellular colonisation may serve as a protected niche
  where organisms evade effective treatment" is the authors' **framing in the
  introduction**, not a result of this study. Written as "the authors propose
  that intracellular niche as a shelter from treatment — a hypothesis, not a
  demonstrated mechanism". The page already said relapse is common; this gives a
  candidate reason without claiming it was shown.
- Rule 6: PubMed and Crossref agree. Crossref gives print 2016-07, no separate
  online date; PubMed's 2016-04-13 is the epub. Print year used.

**Declined for this page:** Heilmann RM et al, BMC Vet Res. 2017;13(1):321
(n=231 chronic-enteropathy dogs) reports that serum gastrin did **not** correlate
with the presence or numbers of spiral bacteria in gastric biopsies. Real,
adequately powered, and it does support "colonisation ≠ disease" — but it is a
secondary endpoint of a gastrin biological-variation study, and the Helicobacter
page says nothing about gastrin. Adding it would have put a gastrin bullet on a
page that has no gastrin context. Noted here in case the page ever gains one.

### DIS-NEO-MM — Multiple Myeloma

Page was Ettinger Ch 322 only, with no imaging guidance at all and nothing for
melphalan-refractory dogs.

**Wyatt S, De Risio L, Driver C, José-López R, Pivetta M, Beltran E. Neurological
signs and MRI findings in 12 dogs with multiple myeloma. Vet Radiol Ultrasound.
2019;60(4):409-415. doi:10.1111/vru.12759**

- Multicentre retrospective, 4 referral hospitals, 12 dogs with pathologically
  confirmed MM that presented with spinal pain or other neurological signs and
  had spinal MRI.
- Spinal pain in **all 12**; 8/12 chronic progressive; proprioceptive ataxia or
  paresis in 11/12.
- The discriminating feature: multiple expansile vertebral lesions **not**
  extending beyond the outer cortical limits of the affected vertebrae, with
  extradural material compressing the cord. Hyper- to isointense on T2 in 12/12,
  homogeneously contrast-enhancing in 12/12.
- Rule 2: n=12 stated inline, and the third bullet says explicitly this is "a
  pattern worth recognising, not a validated set of criteria" — 12 dogs with no
  control group cannot establish specificity against other vertebral lesions.
- Placed at the END of `conf`, after `Author preference:`, under a
  `#Dogs — spinal MRI pattern (Wyatt 2019)` header. First attempt inserted it
  mid-list after `Bence-Jones proteinuria`, which orphaned `Author preference:`
  under the new header. The `#Dogs —` form also gives the section a headerSp, so
  `scopeToSpecies` drops the whole dog-only block on the Cat tab and
  `dropBareHeaders` takes the header with it — without that the two bullets
  showed up as cross-talk on the Cat tab in lint-species.
- Rule 6: both registries agree; print 2019;60(4):409-415, epub 2019-05-06.
  Print year used. 6 authors → all listed (AMA truncates at 7+).

**Teddy L, Sylvester SR, O'Connor KS, Hume KR. Cyclical 10-day dosing of
melphalan for canine multiple myeloma. Vet Comp Oncol. 2023;21(3):533-540.
doi:10.1111/vco.12916**

- Retrospective case series, 17 dogs, Cornell. Repeated 10-day cyclical melphalan
  rather than the continuous low-dose schedule the page already gives.
- CR 10/17 (59%), PR 3/17 (18%), ORR 76%. Median OS 512 days (range 39-1065).
  Diarrhoea commonest AE (6/17).
- The authors' own conclusion is the point worth carrying: better tolerated than
  other reported protocols **but a lower response rate**, which they attribute to
  lower dose intensity. That trade-off is split into its own bullet rather than
  tail-ended onto the outcome bullet.
- Deliberately NOT written as a contradiction of the page's Ettinger figure
  (MST 1.5-2.5 years). 512 days is shorter, but this is a lower-intensity
  schedule in 17 dogs; stating the figure with its protocol attached is honest,
  rewriting `prog` off a 17-dog series would not be.
- Rule 2: n=17 inline. Multivariate associations the paper reports (retinal
  detachment, maximum response CR/PR) are NOT carried — two covariates on 17 dogs
  is not something to put on a clinical page.
- Rule 6: both registries agree; print 2023-09, 21(3):533-540, epub 2023-06-05.

**Ciccarelli S, Leo C, Perrone C, Franchini D, Bonazzi I, Finotello R.
Thalidomide as a rescue protocol for treatment of multiple myeloma in dogs:
preliminary data from a multicentre retrospective study. Front Vet Sci.
2026;12:1695122. doi:10.3389/fvets.2025.1695122**

- 7 dogs, three referral centres, all melphalan-exposed (4 also cyclophosphamide),
  refractory or intolerant. CR achieved or maintained in 5/7 (71%). Median PFS
  490 days on thalidomide vs 180 days during prior melphalan. AEs limited to
  grade II lethargy in 2; no haematologic, GI or urinary AEs.
- Rule 2: n=7 is small enough that it governs the wording. Written as
  "preliminary support as rescue" and closed with "7 dogs is reason to consider
  it when melphalan fails, not evidence to prefer it first-line". The PFS
  comparison is within-dog sequential, not randomised, and reads as such.
- Kept because the page's `tx2` offered nothing at all for a melphalan-refractory
  or -intolerant dog, so the alternative was silence rather than a better source.
- Rule 6 disagreement worth recording: the DOI slug reads `fvets.2025.1695122`
  but **both** PubMed and Crossref date it 2026-01-22 in volume 12, and Crossref
  has no print date (online-only journal). Cited as 2026 on the registries, not
  the slug.

### Resolver

New source names: Sharman, Wyatt, Teddy, Ciccarelli.

**Prefix trap caught before it shipped:** `Sharma` (head trauma, 2015) is a
strict prefix of `Sharman`, and the existing branch was an unguarded
`/^Sharma/`. Unfixed, `(Sharman 2016)` on the Helicobacter page would have
resolved to the head-trauma paper — a page citing something real and wrong,
which is worse than an unresolved marker because nothing visibly breaks. Fixed
with a `\b` guard on the Sharma branch (order-independent) plus the new Sharman
branch. Locked by a test asserting the two ids differ and that each text
contains its own subject; `lint-refs-integrity` check 3 now reports 16 prefix
pairs, up from 15.

## Batch — DIS-NEO-LEUK, DIS-NEU-BOTULISM (157 → 155)

### DIS-NEO-LEUK — Leukaemia (ALL / AML / CLL)

**Aalto M, Yoshimoto J, Nolan J, et al. Utility of cytochemical and flow
cytometry detection of alkaline phosphatase for differential diagnosis of CD34+
acute leukaemia in canines. Vet Comp Oncol. 2026;24(1):41-50.
doi:10.1111/vco.70024**

- Prospective arm: peripheral blood from **64 dogs with CD34+ acute leukaemia**,
  10 with B-cell CLL, 10 healthy controls, ALP by cytochemical staining (subset
  also by flow cytometry). Retrospective arm: 67 archived tissue/effusion
  specimens — 27 CD34+ AL, 22 T-cell lymphoma, 18 B-cell lymphoma.
- ALP positive (>3% ALP+ neoplastic cells, cut-off from ROC) in **61/64 (95.3%)**
  CD34+ AL; **all** B-cell CLL and all lymphoma specimens ALP-negative.
- No difference between AML, ALL and acute unclassifiable leukaemia (p > 0.05) —
  so ALP does **not** mark myeloid lineage in CD34+ disease, which is the point
  that contradicts the standing assumption.
- Flow-cytometry ALP showed poor concordance with cytochemistry and only weak
  correlation with %ALP+ neoplastic cells (Spearman ρ = 0.25) — written as
  "ask the laboratory for ALP by CYTOCHEMISTRY", because the distinction decides
  whether the result means anything.
- Rule 1(b): 64 + 10 + 10 prospectively and 67 archived specimens carries all
  four claims; no hedging needed beyond stating the numbers.
- **Scope limit written onto the page, not just recorded here:** the study
  enrolled only CD34+ leukaemias, so it says nothing about ALP in the
  CD34-negative quarter the page already warns about. Without that bullet the
  new ALP advice reads as a general rule and would be used exactly where it has
  not been tested.
- Precision fix during drafting: first draft said "all 40 nodal lymphomas". The
  specimens were tissue **or effusion**, not nodal by definition. Rewritten to
  "all 40 lymphoma specimens (22 T-cell, 18 B-cell, from tissue or effusion)".
- Rule 6: registries disagree on year — PubMed dates it 2025-10-25 (epub),
  Crossref gives print **2026-03**, vol 24(1):41-50. Print year used, per rule.
  8 authors → first 3 + et al.

**Declined:** Blockeel 2025 (CD94 immunophenotyping, Front Vet Sci) — 11 dogs
and 2 controls, and the authors themselves call for larger studies. Moreira 2025
(transient leukaemia in a Beagle with cutaneous T-cell lymphoma, Vet Clin Pathol)
— a single case, and its lesson (don't misclassify a leukaemic phase as acute
leukaemia) is already covered by the page's existing CD34/PARR guidance.

### DIS-NEU-BOTULISM — Botulism

The entire canine botulism literature is case reports and small outbreaks; there
is no cohort to cite. Both papers below are therefore used for claims that are
case-level by construction — "this has been documented", "the obstacle is X" —
and each bullet says how many dogs it rests on. This differs from DIS-GI-TRICHO
and DIS-GI-MEGA, where the only available case reports would have had to carry
*quantitative* or *prognostic* claims; those pages stay uncited.

**Silva ROS, Martins RA, Assis RA, Oliveira Junior CA, Lobato FCF. Type C
botulism in domestic chickens, dogs and black-pencilled marmoset (Callithrix
penicillata) in Minas Gerais, Brazil. Anaerobe. 2018;51:47-49.
doi:10.1016/j.anaerobe.2018.03.013**

- An outbreak that simultaneously affected domestic chickens, dogs and a
  marmoset — carried onto `etiology` to extend the page's existing
  "multiple animals in the same household" line across species. Sick birds on
  the property become part of the history.
- Describes the **successful use of C and D antitoxin in an affected dog**. The
  page's `tx2` said antitoxin is "generally NOT useful for dogs" because
  available products are type A/B. That statement is about product availability,
  not about the toxin, and the two new bullets say exactly that: a C+D antitoxin
  exists because bovine botulism is endemic in Brazil, it worked in this dog, and
  one dog means "find out what is stocked locally", not a change of standard
  care. The original claim is refined rather than reversed.
- Rule 6: Crossref print 2018-06, 51:47-49; PubMed epub 2018-04-03. Print used.
  5 authors → all listed.

**Viegas FM, Oliveira PF, Campos MCO, et al. Botulism in a dog fed a raw
meat-based diet: a case report. Microorganisms. 2026;14(1):192.
doi:10.3390/microorganisms14010192**

- 3-year-old, 37 kg female Labrador fed exclusively a raw meat-based diet; acute
  flaccid limb paralysis ~48h after probable ingestion of decomposing raw meat
  from household waste; **type C neurotoxin confirmed in serum** by mouse
  neutralisation. Died of progressive respiratory failure despite fluids,
  nutritional support and mechanical ventilation.
- Two uses. `etiology` gains RMBD explicitly — the page said "rancid meat" but
  not raw feeding, which is the version an owner will volunteer. `prog` gains the
  caveat that the page's "excellent with adequate supportive care" is not
  unconditional, with the second bullet stating plainly that one dog does not
  change the overall prognosis and giving the actual clinical consequence: have
  the ventilation conversation early.
- Rule 2: n=1, and both bullets say so in words rather than leaving the reader to
  infer it.
- Rule 6: online-only (MDPI). Crossref and PubMed both 2026-01-15, 14(1):192;
  Crossref has no print date. 8 authors → first 3 + et al.

### Resolver

New source names: Aalto, Silva, Viegas. No prefix collisions (checked against
`aal`, `sil`, `vie`, `al` — only the already-pinned Allen/Allenspach pair is
nearby, and it is unrelated). 'Silva' is a common surname and is now claimed by
the botulism outbreak paper; a second Silva will need a `SILVA_BY_YEAR` map,
which `lint-refs-integrity` check 6 will force.

## Batch — DIS-NEU-SCA, DIS-NEU-SPINEO (155 → 153)

### DIS-NEU-SCA — Hereditary Canine Spinocerebellar Ataxia

The page already listed exact variants (KCNJ10 c.627C>G, c.986T>C, CAPN1,
ITPR1, SCN8A, RALGAPA1, GRM1, PNPLA8, KCNIP4) with no primary source behind any
of them. These three papers anchor the KCNJ10 forms, which are the ones a
clinician actually meets.

**Gilliam D, O'Brien DP, Coates JR, et al. A homozygous KCNJ10 mutation in Jack
Russell Terriers and related breeds with spinocerebellar ataxia with myokymia,
seizures, or both. J Vet Intern Med. 2014;28(3):871-877. doi:10.1111/jvim.12355**

- Case-control: **16 affected Russell group terriers, 640 control RGTs, 383 dogs
  from 144 other breeds**; KCNJ10 c.627C>G associated at P < .001. Variant found
  by whole-genome sequencing of one affected RGT against 81 other canids.
- Two claims carried. Onset in that cohort spanned **2 to 12 months**, wider than
  the page's "2–6 months" figure, which is now stated alongside rather than
  replacing it (the page's narrower range may well come from a different series).
- The clinically important one: **every homozygote had ataxia, but myokymia and
  seizures occurred in varying combinations**. The page's `pearl` reads
  "ataxia + myokymia (skin rippling) ... = SAM or SDCA", which risks not testing
  the dog that has ataxia alone. The new `signs` bullet says explicitly not to
  require myokymia before testing.
- Rule 6: Crossref 871-877, PubMed abbreviates to "871-7". Crossref range used.
  9 authors → first 3 + et al.

**Rohdin C, Gilliam D, O'Leary CA, et al. A KCNJ10 mutation previously identified
in the Russell group of terriers also occurs in Smooth-Haired Fox Terriers with
hereditary ataxia and in related breeds. Acta Vet Scand. 2015;57:26.
doi:10.1186/s13028-015-0115-1**

- 3 Smooth-Haired Fox Terriers and 2 Toy Fox Terriers with the phenotype, all
  homozygous for the same c.627C>G variant; heterozygous in 5 clinically
  unaffected Tenterfield Terriers.
- Rule 2 is satisfied by what the claim IS: genotype identity in named dogs, not
  a prevalence or a response rate. Numbers stated inline anyway.
- **Precision gained, not just a citation:** the page listed Tenterfield Terrier
  alongside the fox terriers as though affected dogs were known. The only
  Tenterfield data are heterozygotes with no clinical signs, so a second bullet
  now says the breed carries the variant but an affected Tenterfield has not been
  confirmed. That distinction decides whether a Tenterfield with ataxia should be
  worked up for something else.
- Rule 6: Crossref print 2015-12, article 26, no page range; PubMed 57(1):26.
  Cited as 57:26. 7 authors → first 3 + et al.

**Stee K, Van Poucke M, Pumarola M, et al. Spinocerebellar ataxia in the Bouvier
des Ardennes breed is caused by a KCNJ10 missense variant. J Vet Intern Med.
2023;37(1):216-222. doi:10.1111/jvim.16594**

- 5 affected Bouvier des Ardennes puppies, 8 healthy relatives, 63 healthy
  unrelated dogs of the breed. All 5 homozygous for KCNJ10 c.986T>C
  (p.Leu329Pro) — the Belgian Malinois SDCA1 variant. All sampled parents
  heterozygous; no healthy dog homozygous. **Allele frequency 15% in the 63
  healthy unrelated dogs.**
- **Corrected a factual error on the page.** `prog` said "SDCA1 in Bouvier des
  Ardennes (heterozygous KCNJ10 with another variant): more variable". The
  affected dogs were HOMOZYGOUS for a single variant; the heterozygotes were the
  clinically normal parents. As written the page implied a heterozygote could be
  a mildly affected dog, which inverts the counselling advice for the breed.
  Rewritten so the variability sits where the paper puts it — in presentation and
  tempo (1 puppy severe from 6 weeks, euthanised by 8 weeks; 4 milder from 7–10
  weeks, reaching up to 11 months) — and the genotype statement is now correct.
- The 15% allele frequency went to `monitor`: in this breed, screening cannot
  stop at the litter and the breeding line.
- Rule 6: **registries disagree on year and it changes the citation.** PubMed
  dates it 2022-11-25 (epub); Crossref gives print 2023-01-01, 37(1):216-222.
  Cited as **Stee 2023** per the print-year rule. 8 authors → first 3 + et al.

### DIS-NEU-SPINEO — Spinal Meningioma

**Uno A, Iwasaki R, Mori T. Treatment outcomes and tolerability of postoperative
radiotherapy in 10 dogs with spinal meningiomas. J Am Anim Hosp Assoc.
2026;62(3):108-114. doi:10.5326/JAAHA-MS-7498**

- 10 dogs, all operated with histopathological confirmation; 9 received adjuvant
  fractionated RT (32–55 Gy in 12–21 fractions, 5×/week), the tenth at
  recurrence. 3 of the 4 cases with assessed margins were incomplete.
- Median survival **568 days** (165–1823). **Local recurrence in 6/10**, at 95,
  99, 153, 367, 433 and 1086 days. One suspected radiation complication
  (worsening limb paralysis) on day 1679; nothing else recorded.
- Rule 1(b) handled carefully. The page already asserted "RT adjunctive
  significantly extends survival" — an uncited claim that a 10-dog single-arm
  series cannot support. Rather than reinforce it, the new bullets give the
  absolute figures, state that recurrence happened in 6 of 10 **despite** adjuvant
  RT, and then say in plain terms that with 10 dogs and no untreated comparison
  group this describes the course after surgery plus RT and does not measure what
  the RT added. The pre-existing "significantly extends" wording is left as it
  was found and is flagged here as unsourced.
- The recurrence timings also validate an existing recommendation: two of the six
  recurrences were found at 95 and 99 days, which is exactly the page's 3-month
  post-op MRI. That went into `monitor`.
- Rule 6: both registries give 2026, 62(3):108-114 (Crossref print 2026-05-01).
  3 authors → all listed.

**Ward K, Morimoto C, Faissler D. Hypofractionated palliative-intent radiation
therapy for a postsurgical recurrent grade II cervical spinal meningioma in a
dog. Can Vet J. 2026;67(2):167-173.**

- Single case: 10-year-old Golden Retriever, C4–C5 IDEM mass, hemilaminectomy
  with marginal excision. **Initial histopathology read as metastatic carcinoma**;
  revised to grade II metaplastic meningioma on immunohistochemistry plus absence
  of a primary tumour on CT. Regrowth confirmed 54 days post-surgery; 5 Gy weekly
  × 4 did not control it; euthanised day 159. Necropsy showed increased mitotic
  activity after irradiation.
- Used for two things the page did not say. `conf` claimed meningiomas are
  "usually WHO grade I (benign) in both species" with nothing about the
  exceptions; the histopathology trap is now stated, with the reason it matters
  spelled out — the error runs in the direction that ends treatment, because an
  owner told "metastatic carcinoma" stops. `tx1` gains that a palliative
  hypofractionated protocol failed here and that the authors suggest higher-dose
  or stereotactic protocols, and earlier adjuvant therapy, for grade II–III.
- Rule 2: n=1 is stated in the text of the `conf` bullet ("one case, but the
  mistake runs in the direction that ends treatment").
- **No DOI** — Can Vet J does not mint them for all articles. Rule 6 satisfied via
  PubMed (PMID 41716511, PMC12915442) and **Europe PMC**, which both give
  Can Vet J 2026;67(2):167-173; Crossref has no record at all. Rule 4's `isPaper`
  test still passes on the `2026;67` volume pattern, so the page counts as having
  a paper without a DOI being present.
- `lint-render`'s balanced-parenthesis check and the escaped inner quotes in
  `"Usually grade I" is not always` both passed; the double quotes sit inside a
  single-quoted db.ts field so no escaping was needed.

### Resolver

New source names: Gilliam, Rohdin, Stee, Uno. Two traps, both caught before
shipping:

1. **'Stee' is a strict prefix of 'Steele'** (the feline HCM IGF-1 paper). An
   unguarded `/^Stee/` branch would have sent `(Steele 2021)` on DIS-CARD-HCM to
   the Bouvier des Ardennes ataxia paper. Guarded with `/^Stee\b/`, which is
   order-independent. 17 prefix pairs now checked, up from 16.
2. **'Ward' was already taken** by Ward 2003 (prophylactic gastropexy, cited
   twice on DIS-GI-GDV). Converted to `WARD_BY_YEAR` with 2003 and 2026, which is
   the rule for any surname gaining a second paper. Both existing markers already
   carried the year, so nothing broke; verified by rendering DIS-GI-GDV and
   confirming Ward 2003 still resolves to the gastropexy paper at reference 10.
   Year-keyed authors now 25.

Tests added for both, including `parseSources('Ward 2015')` and
`parseSources('Ward')` resolving to nothing — an unmapped year must fail safe
rather than pick a Ward.

## Batch — DIS-ENDO-DKA, DIS-REPRO-PYO (153 → 151, uncited 46 → 44)

Both pages were textbook-free as well as paper-free — DIS-ENDO-DKA and
DIS-REPRO-PYO carried no citation of any kind, so the `uncited-disease-pages`
ratchet moves too (47 → 44, the third being DIS-NEU-SCA from the previous
batch, which should have been lowered then).

### DIS-ENDO-DKA — Diabetic Ketoacidosis

Two **randomised trials**, which is the strongest evidence class anything on
this page has had.

**Zeugswetter FK, Luckschander-Zeller N, Karlovits S, Rand JS. Glargine versus
regular insulin protocol in feline diabetic ketoacidosis. J Vet Emerg Crit Care
(San Antonio). 2021;31(4):459-468. doi:10.1111/vec.13062**

- Prospective, block-randomised, 20 cats: regular-insulin CRI (n=10) vs
  basal-bolus SC + IM glargine (n=10). Primary endpoint time to
  β-hydroxybutyrate < 2.55 mmol/L.
- 17/20 (85%) survived to discharge, **no survival difference** (P = 1.0).
- **Primary endpoint not met**: 30h (glargine) vs 42h (CRI), P = 0.114.
  Significant only on secondaries — first improvement of hyperglycaemia 2h vs 6h
  (P = 0.018) and time to discharge 140h vs 174h (P = 0.033).
- Rule 1(b)/Rule 2 both bite here, and the page says so explicitly. The bullet
  order puts survival first, then states that the **primary** endpoint did not
  differ, then that with 10 cats per arm and several secondary comparisons those
  p-values near 0.02–0.03 are fragile. Conclusion written as "a simpler
  alternative that performed acceptably", not "better". Reporting only the two
  significant secondaries would have been the easy and misleading version.
- Rule 6: Crossref print 2021-07, 31(4):459-468; PubMed epub 2021-05-04. Print
  year used. 4 authors → all listed.

**Gant P, Barfield D, Florey J. Comparison of insulin infusion protocols for
management of canine and feline diabetic ketoacidosis. J Vet Emerg Crit Care
(San Antonio). 2024;34(1):23-30. doi:10.1111/vec.13354**

- Randomised, Jan 2019 – Jul 2020, 20 dogs and 16 cats. Fixed-rate IV neutral
  insulin at 0.01 IU/kg/h vs variable rate adjusted to glucose. Entry: venous
  pH < 7.3, glucose > 11 mmol/L (198 mg/dL), BHB > 3 mmol/L. Resolution defined
  as BHB < 0.6 mmol/L.
- Dogs: ketosis resolved in 19/20 (95%); **no difference in time to resolution**
  (P = 0.89) despite a 25% higher mean insulin rate on the fixed protocol
  (P = 0.04). Shorter hospitalisation on FRI (P = 0.01), survival unchanged.
  **6/20 dogs (30%) did not survive to discharge even though all had resolved
  ketosis.**
- Cats: ketosis resolved in only 9/16 (56.3%), too few to compare protocols. All
  5 cats that died did so within 78 hours, none with resolved ketosis.
- The 30%-mortality-with-resolved-ketosis finding is the one that changes
  bedside judgement, and it went on `prog` rather than being buried in `tx1`:
  the biochemical endpoint and the outcome come apart. The feline mirror image —
  deaths happened early and with ketosis unresolved — went beside it.
- `monitor` now says to track **blood** β-OHB if you want to compare against
  these numbers, and gives both trials' thresholds. Deliberately did NOT add the
  familiar "urine dipsticks measure acetoacetate and lag behind" explanation:
  true, standard, and **not in either abstract**, so under Rule 3 it is not
  something these citations can carry.
- The entry criteria went to `conf` labelled as trial entry criteria, not
  diagnostic cut-offs — the page's own definition is unchanged.
- Rule 6: **print year differs from epub and changes the citation.** PubMed
  2023-11-21; Crossref print 2024-01, 34(1):23-30. Cited as **Gant 2024**.
  3 authors → all listed.

### DIS-REPRO-PYO — Pyometra

**Jones AE, Rishniw M, Raux IL, et al. Sepsis and elevated creatinine predict
poor outcomes in uncomplicated canine pyometra, and empirically prescribed
antibiotics do not match bacterial susceptibility or improve survival.
J Am Vet Med Assoc. 2026:1-10. doi:10.2460/javma.26.05.0367**

- Retrospective, **625 dogs**, 8 tertiary referral centres, Dec 2008 – Dec 2023,
  all ovariohysterectomised. 604/625 (96.6%) survived to discharge; 40 (6.4%)
  major short-term complications.
- Elevated preoperative creatinine and sepsis increased risk of non-survival.
  Those two, plus the interaction of elevated creatinine with altered mentation,
  increased hospitalisation duration.
- **At least one inappropriate outpatient antibiotic in 34.4% (116/337), of which
  102/116 (87.9%) were amoxicillin-clavulanate.** In non-septic dogs, survival to
  discharge did not differ with or without pre-/intra-operative antibiotics.
- Rule 1(b): 625 dogs across 8 centres carries all of this comfortably. Two
  limits are written onto the page rather than left here. First, 96.6% is a
  **tertiary referral** figure over 2008–2023, so it is framed as the ceiling with
  specialist support rather than a general expectation. Second — the one that
  could do harm if left unqualified — the antibiotic comparison is observational,
  not randomised, so the bullet says it argues for culturing and for questioning
  the reflex, explicitly **not** for withholding antibiotics from a dog you
  believe is septic.
- Creatinine also went into `supp`: the page already listed biochemistry for
  azotaemia, but not that creatinine is one of only two preoperative variables
  that predicted death.
- Rule 6: JAVMA ahead-of-print. Crossref and PubMed agree on 2026 and pages
  1-10; **no volume or issue assigned yet**, so the AMA string is
  `2026:1-10`. 16 authors → first 3 + et al.

**Declined for this page:**
- *Hagman R. Pyometra in small animals 2.0. Vet Clin North Am Small Anim Pract.
  2022;52(3):631-657.* The authoritative review by the field's leading author,
  and `isPaper` would accept it — but it is a narrative review, not primary data,
  and under Rule 1 that is closer in character to the textbook chapter the rule
  excludes. Jones 2026 gives the same clinical territory with 625 dogs behind it.
- *Paudel M et al, Heliyon 2023;9(12):e22368* (45 bitches, Nepal): *E. coli*
  35.6%, *Proteus* 26.7%, multidrug resistance in 26 isolates. The *E. coli*
  share is well below the European figures the page's "E. coli most common"
  claim rests on, and the antibiogram is local. Importing it would have put a
  non-generalisable susceptibility pattern on a reference page; Jones 2026
  already carries the resistance message from 8 centres.
- *Rocha L et al, Animals 2025;15(24):3531* — 10 bitches, redox and acute-phase
  markers during aglepristone ± cloprostenol. Too small and too mechanistic for a
  clinical page, and its own conclusion is that the combination confounded
  efficacy assessment.

### Resolver — a collision the lint caught in the act

New source names: Zeugswetter, Gant, Jones. No prefix collisions (checked `jon`,
`gan`, `zeu`; 'Johnson' and 'Garcia'/'Garden'/'Gareis' are near but unrelated by
prefix).

**'Jones' is not only an author.** `lint-refs-integrity` check 5 failed
immediately on adding it:

```
• "(Jones)" on DIS-EYE-NLD carries no year but resolves to the paper
  jones-pyometra-outcome — almost certainly a disease name colliding with an
  author surname.
```

DIS-EYE-NLD writes **"Fluorescein dye passage (Jones) test"** — the Jones test
for nasolacrimal patency. Unfixed, an ophthalmology page would have carried a
superscript pointing at a canine pyometra paper, and the words "(Jones)" would
have been *replaced* by that superscript, so the test would have lost its name
on the page as well. Fixed by year-keying Jones (2026 only), adding `'Jones'` to
`PROSE_QUALIFIERS` in the lint, and adding it to the test's prose-qualifier list.
Locked by a test asserting `parseSources('Jones')` is empty and that
`splitCitations` leaves `(Jones)` as its raw text. Year-keyed authors now 26.

This is the fourth prose-collision of the same shape after Scott, Evans syndrome
and "Golden Retriever most common" — a parenthetical that reads like a citation
but is a test, eponym or disease name.

## Batch — DIS-ENDO-ACRO, DIS-MSK-PATLUX (151 → 149, uncited 44 → 42)

Both pages were entirely uncited despite carrying very specific numbers
("50–70% achieve diabetic remission", "roughly 8–48% reluxation",
"~25–35% of insulin-resistant diabetic cats"). None of those figures are
touched below — they stay as found, now sitting next to sourced ones.

### DIS-ENDO-ACRO — Acromegaly (Feline Hypersomatotropism)

**Kennedy A, White J, Lam A, Kenny P. Hypersomatotropism in diabetic cats in
Australia. J Feline Med Surg. 2025;27(11):1098612X251379726.
doi:10.1177/1098612X251379726**

- Residual serum from 87 diabetic cats, hypersomatotropism defined as
  IGF-1 ≥ 1000 ng/mL. 14 cats positive → **16% (95% CI 9.5–24.9%)**, in line with
  the 17.8–26% reported from the UK, Switzerland and the Netherlands.
- No difference between positive and negative cats by breed (pedigree vs
  domestic), sex, age, or metropolitan vs regional location. **Glucose
  (P = 0.9) and fructosamine (P = 0.57) did not differ either.** The authors'
  conclusion: clinical features cannot be used to distinguish them, so IGF-1
  screening is necessary.
- Rule 2 handled in two directions at once. The prevalence estimate is fine at
  n = 87 and is quoted with its CI. The **negative** findings are the fragile
  part — 14 affected cats cannot exclude modest differences — so the page says
  that explicitly and then states what does follow: the assay separates the
  groups, the history does not.
- **Denominator trap written onto the page.** This is 16% of *all* diabetic cats.
  The page's existing pearl says "~25–35% of insulin-resistant diabetic cats in
  referral populations" — a different and much more selected denominator. Left
  both figures standing with a bullet saying they are not measuring the same
  population. Also noted that these were residual laboratory submissions from
  cats already flagged by a raised glucose or fructosamine, which is its own
  selection.
- Rule 6: Crossref print 2025-11, 27(11), article 1098612X251379726; PubMed
  epub 2025-11-10. Agree. 4 authors → all listed.

**Shelton E, Jepson R, Church D, Fenn J, Scudder C. Owner points of view and
perceived quality of life of diabetic cats pre- and post-hypophysectomy for
hypersomatotropism. J Vet Intern Med. 2026;40(1):aalaf006.
doi:10.1093/jvimsj/aalaf006**

- 27 cats retrospectively + 13 prospectively, hypophysectomy 2012–2022 at the
  RVC. Adapted DIAQoL-Pet questionnaire.
- **22/24 retrospective and 10/10 prospective respondents would definitely
  request hypophysectomy again.** Paired prospective scores significantly less
  negative for worry (P = .02), pet unwell (P = .03), worry about hypoglycaemia
  (P = .01) and worry about vision (P = .04); median AWIS improved (P = .02).
- Rule 3 care point: the paper **opens** with "Hypophysectomy provides the most
  favorable long-term outcome for cats with HST and concurrent DM". That is the
  authors' background framing, not a result of this study, and it is NOT carried
  onto the page as evidence. What is carried is what they measured — owner view
  and owner-perceived QoL.
- Rule 2: owner-perceived, unblinded, no comparison group, and the paired
  analysis rests on 10 cats. The page says so in the same breath and places the
  finding where it actually belongs — the consent conversation, not a measure of
  surgical efficacy.
- Rule 6: Crossref and PubMed both 2026, 40(1), article aalaf006. 5 authors → all.

**Declined:** *Meij BP, van Stee LL. Transsphenoidal surgery for pituitary
tumors. Vet Clin North Am Small Anim Pract. 2024;55(1):95-118.* A review, and by
the same reasoning applied to Hagman on the pyometra page, a narrative review is
closer in character to the textbook chapter Rule 1 excludes.

### DIS-MSK-PATLUX — Patellar Luxation

**Engdahl K, Bergström A, Höglund O, Hanson J. The epidemiology of patellar
luxation in an insured Swedish dog population. Prev Vet Med. 2023;220:106034.
doi:10.1016/j.prevetmed.2023.106034**

- **Just over 600,000 insured dogs** (Agria, Sweden, 2011–2016); 2726 with
  patellar luxation. The largest denominator of anything cited in this work so
  far — Rule 1(b) is not in question.
- Direction: medial 90%, lateral 5.9%, bidirectional 2.4%, unspecified 1.6%.
- Median age at first diagnosis 2.8y (medial), 2.7y (lateral), 1.5y
  (bidirectional).
- **Cruciate ligament rupture in 168/2726 (6.2%).**
- Breeds at increased medial risk almost all small; several at increased lateral
  risk large — confirms the page's existing breed structure.
- **Females: increased risk of medial luxation (RR 1.2, 95% CI 1.1–1.3,
  p < 0.001) but DECREASED risk of lateral luxation (RR 0.72, 95% CI 0.51–1.0,
  p = 0.042).**
- 116 dogs euthanised because of patellar luxation, median age 2.2 years;
  highest-risk breeds Pyrenean Mountain Dog, Dogue de Bordeaux, German Pinscher.

Four places this sharpened rather than merely sourced the page:

1. `age` said "most affected animals are lame before 1 year of age". Median age
   at first *recorded diagnosis* was 2.8 years. These measure different things,
   so both now stand with a bullet saying so — and noting the practical
   implication, that most affected dogs are not being picked up in year one.
2. `path` called cruciate rupture "a common reason a stable, low-grade patient
   suddenly deteriorates". 6.2% is real but not "common"; the page now carries
   the number next to the claim.
3. `sex` said "females slightly over-represented in several reports". The effect
   is small **and reverses direction** between medial and lateral luxation, which
   the page did not say.
4. `prog` had nothing about euthanasia. 116 dogs died of this condition at a
   median of 2.2 years, concentrated in large breeds — the same place lateral
   luxation concentrates. The grading scale conveys none of that.

**Son Y, Keller MD, Williamson P, Taylor RM. Prevalence and grade of patellar
luxation in Cavalier King Charles Spaniels attending primary-care veterinary
practices in Australia. Vet Med Sci. 2026;12(4):e71026. doi:10.1002/vms3.71026**

- VetCompass Australia, 321,517 patient records. **10-year prevalence of patellar
  luxation in CKCS 12.5% (95% CI 12–13%).** Bilaterally affected dogs more likely
  to carry a higher grade than unilateral ones.
- Two figures from this paper were **deliberately left out**, and the reason is
  the point:
  - *Neutered dogs OR 3.00 (95% CI 1.97–4.71).* In a primary-care database
    neutered status tracks age, body weight and frequency of veterinary contact.
    Putting that odds ratio on a reference page invites the reading "neutering
    causes patellar luxation", which the design cannot support and which would
    change real advice to owners. Not included.
  - *Ruby-coloured dogs OR 2.04.* A coat-colour association within one breed in
    one country, with no mechanism offered. Low value, high noise.
  - Dogs ≥10 years had the *lowest* risk (OR 0.44) — almost certainly survival
    and ascertainment rather than protection, so also left out.
- Rule 6: Crossref print 2026-07, 12(4), article e71026; PubMed 2026 Jul. Agree.
  4 authors → all listed.

**Declined for this page:** *Nicetto T, Longo F. Trochlear ridge prostheses...
Vet Comp Orthop Traumatol. 2024;37(2):98-106* — 60 trochleae with good results,
but a custom 3D-planned implant with a mean radiographic follow-up of only 3.8
months, which is short for judging an implant and too niche for a general page.
*Carrera 2024* (5 juvenile dogs) and *Kimura 2026* (3 trochlear ridge fractures)
are both too small to carry anything this page needs.

### Resolver

New source names: Kennedy, Engdahl, Son. Two more of the now-familiar traps:

1. **'Son' is a strict prefix of 'Sones'** (already cited as "(Sones 2013)").
   Guarded with `/^Son\b/`. 18 prefix pairs now checked.
2. **'Shelton' was already taken** by Shelton 2001 (canine myasthenia gravis
   spontaneous remission, cited twice on DIS-WK-MG). Converted to
   `SHELTON_BY_YEAR`. Verified by rendering DIS-WK-MG and confirming Shelton 2001
   still resolves to the myasthenia paper at reference 9. Year-keyed authors
   now 27.

Also checked `(English` ×3 and `(Kennel` ×1 in db.ts as prose parentheticals —
neither is matched by `/^Engdahl/` or `/^Kennedy/`, so no new prose qualifier was
needed.

## Batch — DIS-NEO-ORAL-MEL, DIS-RESP-CRYPTO (149 → 147, uncited 42 → 40)

### DIS-NEO-ORAL-MEL — Oral Melanoma

**Teng KT, Ohta H, Deguchi T, et al. Survival of dogs with melanoma from a
referral veterinary hospital in Japan. J Vet Med Sci. 2026;88(4):624-631.
doi:10.1292/jvms.25-0209**

- 123 dogs with melanoma at any site, one Japanese teaching hospital,
  2004–2023. Kaplan-Meier plus a log-logistic parametric survival model.
- Overall MST 244 days. **Oral melanoma had 66% shorter survival than non-oral,
  median 191 vs 663 days (P = 0.019)** — the page asserted oral melanoma is
  biologically distinct and aggressive; this quantifies the site penalty.
- Surgery vs no surgery: 294 vs 93 days (P < 0.001).
- Stage, against stage I: time ratio 0.42 for stage IV (95% CI 0.22–0.77,
  P = 0.006) and **0.60 for stage III with a CI crossing 1 (0.33–1.07,
  P = 0.084)**.
- Breed: Miniature Schnauzer 3.36× and Toy Poodle 4.80× longer survival than
  Golden Retriever.

Three confounds written onto the page rather than only recorded here:

1. The surgery figure is observational — the tumours that get resected are the
   ones that were resectable. Quoting 294 vs 93 days without that reads as a
   treatment effect.
2. The stage gradient is supported but **not every step of it**. The page already
   carried stage-wise survival (511/163/83/36 days); this cohort's stage III
   estimate is not statistically distinguishable from stage I. Said plainly,
   because a reader comparing the two sources would otherwise assume both agree
   throughout.
3. The breed effects are large but plausibly stand in for tumour site and size.
   The page says not to prognosticate on breed alone.
- Rule 6: Crossref print 2026, 88(4):624-631 (no month); PubMed 2026-02-11.
  Agree on year. 8 authors → first 3 + et al.

**Gualtieri P, Lee BI, Beeney A, et al. Response of spontaneous oral tumors in
canine cancer patients treated with stereotactic body radiation therapy (SBRT).
Radiat Res. 2024;202(6):807-824. doi:10.1667/RADE-24-00079.1**

- Single-institution retrospective, 98 dogs: **oral malignant melanoma n = 37**,
  SCC n = 18, soft tissue sarcoma n = 43. SBRT 1–6 fractions, 12–40 Gy total.
- Local PFS 187 days for melanoma. Overall PFS 152 days, MST 270 days, no
  significant difference between tumour types.
- **Osteoradionecrosis or oronasal fistula in 23/81 (28.4%)**; severe acute
  toxicity to organs at risk in 10/85 (11.8%).
- Nodal metastasis and the **use of** elective nodal irradiation both associated
  with shorter PFS and MST.

Two readings this paper invites and the page blocks:

- **28.4% is not the melanoma figure.** The complication was significantly
  associated with SCC (P = 0.006) and the melanoma-specific rate was not
  reported. The page states the cohort figure, then says explicitly that it is
  not melanoma's rate. Attaching it to a melanoma page unqualified would
  misinform a consent conversation in the direction of refusing treatment.
- **ENI "causing" harm.** Elective nodal irradiation predicting worse survival
  almost certainly reflects which dogs were selected for it. Flagged as
  selection, not effect.
- Rule 6: Crossref print 2024-10-31, 202(6) but **no page range**; PubMed gives
  807-824. Took the fuller record per Rule 6. 7 authors → first 3 + et al.

### DIS-RESP-CRYPTO — Cryptococcosis

**Teh A, Pritchard E, Donahoe SL, Malik R, Krockenberger M. A case of
disseminated cryptococcosis ... and false-negative cryptococcal antigen lateral
flow tests due to the postzone phenomenon. Aust Vet J. 2024;102(6):306-312.
doi:10.1111/avj.13329**

- 13-year-old cat, disseminated *C. neoformans* with peritonitis and abdominal
  organ involvement, plus thoracic, sinonasal and CNS involvement at autopsy.
- **Serum and abdominal fluid tested FALSE-NEGATIVE on neat specimen by lateral
  flow, and positive only at 1:64 dilution — a postzone effect.**
- The page's `conf` described the latex antigen test as "sensitive & specific"
  with no failure mode. A single case normally would not earn a place, but this
  one is kept because the error runs in the dangerous direction: the animals
  with enough antigen to cause postzone are the sickest ones, so the test fails
  exactly where it matters most. The page says n=1 in words and gives the
  action — ask the laboratory to repeat on dilutions when the clinical picture
  is strong and the test is negative.
- Rule 6: Crossref print 2024-06, 102(6):306-312; PubMed epub 2024-04-03. Print
  year used. 5 authors → all listed.

**Treekhunrungruang S, Yurayart C, Thitiyanaporn C, Jaroensong T.
Clinicopathological features, treatment outcome, and the cryptococcal antigen
latex agglutination system titer in feline cryptococcosis treated with
amphotericin B and fluconazole. Vet Sci. 2025;12(12):1211.
doi:10.3390/vetsci12121211**

- 35 cats, single centre, 2014–2023. Amphotericin B + fluconazole ~3–4 months,
  then fluconazole maintenance. Monthly CALAS, a six-domain clinical score
  (0–18), haematology and biochemistry; mixed-effects models.
- Mean log CALAS fell 12.00 → 6.79; clinical score 3.83 → 0.68. Leukocytes
  16.85 → 10.90 ×10⁹/L. ALT stable.
- **7/35 cats became azotaemic on amphotericin B. The drug was stopped in all 7;
  renal values normalised in 3 and 4 were still azotaemic at last follow-up.**
- This fills a real gap: the page's `monitor` said to watch **liver** enzymes on
  azoles and said nothing about renal monitoring, despite recommending
  amphotericin B for severe disease in `tx2`. Now says to check kidneys too.
- Rule 2: the page states that 35 cats at one centre is enough to justify monthly
  creatinine but **not** enough to quote a nephrotoxicity rate — so 7/35 is given
  as what happened in this cohort, not as "20% of cats".
- Rule 6: Crossref online-only 2025-12-18, 12(12):1211; PubMed agrees. 4 authors
  → all listed.

### Resolver and tooling

New source names: Teng, Gualtieri, Treekhunrungruang, Teh. Four papers now share
a `Te` stem with the existing Teddy and Teshima; none is a prefix of another
(`Ted`/`Teh`/`Ten`/`Tes` diverge at the third character), so no new guard was
needed beyond a defensive `\b` on the three-letter `Teh`. Locked by a test that
resolves all four markers and asserts the ids are distinct.

**Tooling fix after a self-inflicted break.** The phrase "melanoma's share"
went into a single-quoted db.ts field and the bare ASCII apostrophe closed the
string, producing ~500 cascading `TS1005` errors starting at line 1281 col 3519
— none of them at the actual fault, and all of them in a 8000-character line.
This is the third time an apostrophe has done this (`organism's`, `F(ab')₂`).
Added a guard to the scratchpad row-editor that raises on any word-internal
unescaped `'` in replacement text before writing, so the failure now names the
phrase instead of burying it in parser noise.

## Batch — DIS-AA, DIS-DISCO (147 → 145, uncited 40 → 38)

### DIS-AA — Atlantoaxial Instability

**Planchamp B, Forterre F, Vidondo B, et al. Determination of cutoff values on
computed tomography and magnetic resonance images for the diagnosis of
atlantoaxial instability in small-breed dogs. Vet Surg. 2022;51(4):620-630.
doi:10.1111/vsu.13799**

- Retrospective multicentre, **123 client-owned dogs + 28 cadavers**, split into
  control, "potentially unstable" and AAI-affected groups. Nine measurements
  compared by ROC in flexed (≥25°) and extended (<25°) head positions.
- **Ventral compression index (ratio of ventral to dorsal atlantodental
  interval): ≥0.16 extended and ≥0.2 flexed, sensitivity 100%/100%, specificity
  94.54%/96.67%.** All other measurements reached only 75–96% sensitivity and
  70–97% specificity, and combining them did not improve on VCI alone.
- This **demotes the page's only objective criterion.** `conf` said
  "Atlas-to-axis angle >10° = diagnostic" and nothing else. The C1–C2 angle is
  one of the "other measurements" in this study's lower-performing group. The
  page now gives the VCI with its cut-offs and defines it, and says where the
  angle sits.
- Two caveats written onto the page:
  - **Incorporation bias.** Groups were assigned "according to imaging findings
    and clinical signs", so the reference standard was not independent of the
    imaging being evaluated. A sensitivity of 100% should be read in that light.
    The abstract does not hide this, but a page quoting "100% sensitive" without
    it would mislead.
  - The authors' own closing caution, carried verbatim in substance: the
    cut-offs make the *diagnosis* objective, but the decision to operate should
    still rest on clinical and imaging findings together.
- Rule 6: Crossref print 2022-05, 51(4):620-630; PubMed epub 2022-03-16. Print
  year used. 8 authors → first 3 + et al.

**Forterre F, Zorgevica-Pockevica L, Precht C, Haenssgen K, Stein V, Düver P.
Clinical evaluation of a new surgical augmentation technique for transarticular
atlantoaxial fixation for treatment of atlantoaxial instability. Animals (Basel).
2023;13(11):1780. doi:10.3390/ani13111780**

- 11 dogs, new augmentation of ventral fixation (wire/suture through a
  transverse hole in the axis, anchored by screws in the alae atlantis or plate
  ends). 10 improved and returned to normal life within 3–6 months. **1 developed
  aphonia and dysphagia and died of aspiration pneumonia 3 days after surgery.**
- Used **only** for the complication, not for efficacy. The page's `monitor`
  already listed "upper airway / respiratory problems, respiratory arrest" as
  things to watch; this names the actual sequence — voice change and swallowing
  failure leading to aspiration, in the first few days after a ventral approach.
  The page says one death in 11 dogs cannot give a mortality rate.
- The novel technique itself is deliberately not recommended on the page: n=11,
  single centre, and the page's existing text already describes ventral fixation
  generally.
- Rule 6: online-only (MDPI), Crossref 2023-05-26, 13(11):1780; PubMed agrees.
  6 authors → all listed.

### DIS-DISCO — Diskospondylitis

**Van Hoof C, Davis NA, Carrera-Justiz S, et al. Clinical features, comparative
imaging findings, treatment, and outcome in dogs with discospondylitis: a
multi-institutional retrospective study. J Vet Intern Med. 2023;37(4):1438-1446.
doi:10.1111/jvim.16785**

- **386 dogs**, multi-institutional. Males 236/386. L7-S1 commonest site
  (97/386). *Staphylococcus* spp in 23/38 positive blood cultures.
- **Imaging agreement on the PRESENCE of disease: fair between radiographs and
  CT (κ = 0.22), poor between radiographs and MRI (κ = 0.05).** Good agreement on
  location.
- Trauma → relapse (OR 9.0, 95% CI 2.2–37.0, P = .01). Prior steroid therapy →
  progressive neurological dysfunction (OR 4.7, 95% CI 1.2–18.6, P = .04).

Four uses, three of which sharpen existing claims:

1. `conf` said radiographs may be normal early and to repeat them. The κ values
   turn that into something much stronger — a normal radiograph carries very
   little weight against MRI. Added with the useful converse: agreement on
   *location* was good, so radiographs tell you where to look rather than
   whether disease is present.
2. `sex` said "2:1 ratio". 236/386 is about 61%, nearer 1.6:1. Both now stand,
   with the larger series' figure given.
3. `tx1` already said to avoid corticosteroids. The OR of 4.7 supports it — and
   the page immediately says the 95% CI of 1.2–18.6 rests on few events, so the
   *size* is uncertain even though the direction supports existing advice.
4. `prog` listed premature antimicrobial withdrawal as the relapse risk. Trauma
   is now added, again with the interval spelled out in words (a fourfold to
   nearly fortyfold increase) so it reads as "follow these cases longer", not as
   a usable risk multiple.
- *Staphylococcus* "most common overall" now carries 23/38 blood cultures.
- Rule 6: Crossref 2023-07-01, 37(4):1438-1446; PubMed epub 2023-06-08. Agree on
  year. 14 authors → first 3 + et al.

**Grapes N, Bertram S, Gonçalves R, De Decker S. Prevalence of discospondylitis
and association with congenital vertebral body malformations in English and
French bulldogs. J Vet Intern Med. 2024;38(6):3138-3143. doi:10.1111/jvim.17209**

- 108 dogs, multi-institutional, 2010–2020. Diskospondylitis **3.4× more common
  in French Bulldogs (95% CI 1.6–6.7) and 4.3× in English Bulldogs (1.7–9.8)**
  than the overall hospital cohort, both P < .001.
- Vertebral malformations in 12/13 French Bulldogs (92.3%) and 6/8 English
  Bulldogs (75.0%), vs 1/89 "other" breed dogs (1.1%). The infected disc was
  adjacent to a malformation in 80% of French Bulldog discs and 50% of English
  Bulldog discs.
- **Median age at presentation 1.1 years (French Bulldog) and 1.0 years (English
  Bulldog) vs 7.3 years in other breeds, both P < .001.**
- This is the batch's most consequential correction. The page's `age` field said
  "Middle-aged to older most commonly affected" with no exception. In the two
  breeds now at highest risk, presentation is at about one year old — so the page
  would have steered a clinician away from the diagnosis in exactly the dogs most
  likely to have it. `age` now carries the exception and the action: a young
  bulldog with spinal pain belongs on this page, particularly with a vertebral
  malformation on imaging.
- `breed` listed large-breed purebreds and the German Shepherd fungal
  association; the bulldogs and the structural reason are now there too.
- Rule 6: Crossref 2024-11-01, 38(6):3138-3143; PubMed epub 2024-10-03. Agree on
  year. 4 authors → all listed.

### Resolver

New source names: Planchamp, Forterre, Van Hoof, Grapes. No prefix collisions
(checked `pla`, `for`, `van`, `gra`; the existing 'Forgash' diverges from
'Forterre' at the fourth character and 'Graham' from 'Grapes' likewise). Checked
db.ts for `(Grape…` parentheticals — grape/raisin toxicity would have been a
prose collision of the Jones-test kind — and there are none.

**'Van Hoof' is the first two-word surname added in a while**, so the test
asserts it resolves, since `SOURCE_ALT` has to match the space. Also asserted
that Forterre 2023 and Planchamp 2022 resolve to different ids: Forterre is the
second author on Planchamp, and markers are first-author only.

## Batch — DIS-GI-OESFB, DIS-ENDO-HCALC (145 → 143, uncited 38 → 36)

### DIS-GI-OESFB — Oesophageal Foreign Body

**Hebert MK, Liu CC, Gaschen FP. Management of benign esophageal strictures in
dogs and cats: long-term follow-up of 32 cases (2006-2022). J Vet Intern Med.
2026;40(1):aalaf041. doi:10.1093/jvimsj/aalaf041**

- 28 dogs + 4 cats with benign oesophageal stricture treated by
  esophagoscopy-guided balloon dilation. Causes: peri-anaesthetic regurgitation
  (20 dogs, 3 cats), **oesophageal foreign body (6 dogs, 1 cat)**, vomiting
  (6 dogs). Median 2 dilation sessions. Submucosal triamcinolone in 22 dogs and
  3 cats at a median 0.45 mg/kg.
- **MST 2746 days in 25 dogs (95% CI 1860–3297).** Only **7 of 28 dogs and 1 of
  4 cats could eat kibble** at follow-up.
- Cited on the FB page because stricture is the complication the page tells you
  to watch for, and `monitor` previously said only "→ balloon dilation" with no
  sense of what that commits the owner to. Three things now stated: it is
  typically more than one session, survival afterwards is long, and the diet
  usually stays modified.
- **The authors' headline claim is flagged, not repeated.** They conclude dilation
  was "apparently associated with prolonged survival... with a MST 3.2-3.8 times
  longer than reported in previous studies". That comparison is against the
  historical literature, not a control group in this study, so the page says the
  figure is reached by comparison with earlier reports rather than against
  controls. Quoting "3.2–3.8× longer" as a treatment effect would be wrong.
- The shift in triamcinolone timing (before → after dilation over the study
  period) is a description of changing practice at one institution with no
  comparison, so it is not on the page.
- Rule 6: Crossref and PubMed both 2026, 40(1), article aalaf041. 3 authors → all.

**De Porte H, Van Goethem B. Diagnosis and surgical management of an acquired
cervical tracheoesophageal fistula in a Shih Tzu following foreign body removal.
Acta Vet Scand. 2025;67(1):56. doi:10.1186/s13028-025-00842-5**

- 6.5-year-old Shih Tzu, persistent hyporexia, vomiting and moist cough after
  endoscopic removal of a bone at the thoracic inlet. Managed as oesophagitis and
  aspiration pneumonia; deteriorated with recurrent pneumonia. Cervical
  tracheoesophageal fistula confirmed endoscopically, repaired via ventral
  midline with a bipedicle sternohyoid muscle flap. Asymptomatic at 12 months.
- Kept despite n=1 for the same reason as the cryptococcal postzone case: the
  default assumption is wrong in a way that costs time. `severe` listed
  perforation, mediastinitis, pyothorax, aspiration pneumonia and stricture —
  not fistula. A dog with repeated post-retrieval pneumonias gets treated as
  plain aspiration, which is exactly what happened here.
- Two actionable details carried: cough provoked by **drinking liquids and by
  tracheal palpation**, and that endoscopy confirmed the diagnosis while avoiding
  the aspiration risk of a contrast study. The page already preferred iohexol to
  barium when perforation is suspected; this adds the endoscopy-first point for
  suspected fistula.
- Rule 6: online-only; Crossref 2025-12-13, 67(1), article 56; PubMed agrees.
  2 authors → both listed. Crossref renders the surname "De porte"; PubMed and
  the paper itself use **De Porte**, which is what the citation uses.

### DIS-ENDO-HCALC — Hypercalcaemia

**Woerde DJ, Palm CA, Cosaro EC, Minor KM, Westropp JL, Furrow E. A novel
missense variant in the calcium-sensing receptor gene in a dog with
hypercalcemia. J Vet Intern Med. 2026;40(1):aalaf046.
doi:10.1093/jvimsj/aalaf046**

- 5-year-old spayed Border Collie cross, **3-year** history of hypercalcaemia,
  normal physical examination. PTH at the upper end of the reference interval,
  no enlarged or ectopic parathyroid tissue on imaging. **Urine calcium excretion
  inappropriately low** — the pattern of familial hypocalciuric hypercalcaemia in
  people. Homozygous for a CASR missense variant (Glu649Lys) with predicted
  pathogenicity, **absent from whole-genome variant calls on 2782 dogs including
  43 Border Collies**.
- Hypercalcaemia persisted through **unilateral parathyroidectomy, bisphosphonates
  and calcimimetics**.
- Three uses, all filling a specific hole in the page:
  - `conf` gains urine calcium. The page listed ionised calcium, PTH, PTHrP and
    25-OH vitamin D — a complete panel for every cause except this one, which is
    identified by what the urine is doing.
  - `tx1` gains the refractoriness warning next to bisphosphonates. The clinical
    value is avoiding a futile parathyroid exploration in a young dog whose
    imaging is already negative.
  - `etiology` reframes the **I** in HARDIONS: a refractory case may be genetic
    rather than truly idiopathic.
- Rule 2: n=1 and the variant's pathogenicity is **predicted, not functionally
  confirmed**. The page says so and frames it as a differential to test for
  rather than an established canine disease.
- **Edit error caught and reverted.** The first attempt inserted the new text
  inside the HARDIONS bullet, between "Idiopathic (cats)" and "Osteolysis",
  splitting the mnemonic across two bullets and leaving "Osteolysis, Neoplasia,
  Spurious/Granulomatous" orphaned as its own bullet. tsc and every lint passed —
  the mnemonic was simply broken. Reverted and appended after the whole
  mnemonic instead. Worth recording because no automated check covers it: a
  comma-separated list inside one bullet cannot take a mid-list insertion.
- Rule 6: Crossref and PubMed both 2026, 40(1), article aalaf046. 6 authors → all.

### Resolver

New source names: Hebert, De Porte, Woerde. No prefix collisions. **'De Porte'
is the second two-word surname**, and sits in the same `De ` space as the
existing 'De Risio' — neither is a prefix of the other, but the test asserts
they resolve to different ids, since a mistake there would put an IVETF
epilepsy document on an oesophageal page.

## Batch — DIS-NASAL-NPS, DIS-NEO-ORAL-AME (143 → 141, uncited 36 → 34)

### DIS-NASAL-NPS — Nasopharyngeal Stenosis

**Kang K, Brash R. CT features of confirmed nasopharyngeal stenosis in 12 cats.
J Feline Med Surg. 2025;27(2):1098612X241305932. doi:10.1177/1098612X241305932**

- 12 cats with NPS confirmed by retroflex nasopharyngoscopy, 2011–2023; CT
  reviewed retrospectively. One cat had two stenoses, so 13 lesions.
- **All 13 in the caudal third of the nasopharynx**, as focal abrupt narrowing by
  a homogeneous soft-tissue band. Concentric in 11/13, lateral-to-lateral in 2.
- Mild homogeneous contrast enhancement in 8/11 (73%). **Soft palate focally
  deviated dorsally at the stenosis site in 8/12 (67%), best seen on sagittal.**
- Concurrent: non-enhancing soft tissue in the nasal cavity 7/12, tympanic bullae
  4/12, mild medial retropharyngeal lymphadenomegaly 2/12.
- The page's `conf` said CT "defines the location, thickness and length" — true
  but useless at the scanner. It now says where in the nasopharynx to look, which
  plane shows the most useful secondary sign, and that **mild** enhancement is
  expected so a strongly enhancing or mass-like lesion should redirect you to
  polyp or neoplasia. The bullae/nasal findings are added because they are on the
  same study and change what else gets treated.
- Rule 2: the page states that 12 cats shows where to look but cannot give CT a
  sensitivity, and keeps the authors' requirement for nasopharyngoscopy to
  confirm.
- Rule 6: Crossref print 2025-02, 27(2), article 1098612X241305932; PubMed 2025
  Feb. Agree. 2 authors → both listed.

**Pollack SZ, Chapman PS, Klag A. Balloon dilation for the treatment of
nasopharyngeal stenosis in seven cats. JFMS Open Rep. 2017;3(2):2055116917729987.
doi:10.1177/2055116917729987**

- 7 cats, balloon dilation under endoscopic guidance. **All 7 had acceptable
  short-term control (median 14 days). Only 2 of 6 had successful long-term
  control after one dilation, with a further 2 of 6 after a second.** Recurrence
  of stenosis was the main complication.
- The page already said "expect to repeat the procedure; a single dilation rarely
  gives a durable result" — correct but unsourced and unquantified. Now carries
  the numbers.
- **The limitation that matters most is the follow-up window, not the sample
  size.** The study's "long-term" control has a median of **34 days**, so the
  4-of-6 figure describes weeks rather than years. Stated on the page in those
  words, because quoting "4 of 6 achieved long-term control" without it would
  substantially overstate what is known about durability.
- Rule 6: Crossref gives print 2017-07 with online 2017-09-19 — the print date
  precedes the online date, an artefact of how this journal dates volumes. Both
  registries agree on 2017. 3 authors → all listed.

**Declined for this page, both on species grounds:** *Ball E, Chase D, Coomer A.
N Z Vet J. 2022;70(5):279-286* (2 dogs, traumatic NPS treated by three balloon
dilations each at 5–9 day intervals) and *Saver A et al. J Am Vet Med Assoc.
2021;259(2):190-196* (one dog, osseous choanal atresia with NPS managed by
ventral rhinotomy and overlapping covered stents). Both are reasonable papers
and the "multiple dilations required" message agrees with Pollack — but
DIS-NASAL-NPS is `sp:'Cat'`, so dog data would render on a cat-only page with
no species marker available to scope it. Recorded here in case the page is ever
widened to dogs, where traumatic NPS is a distinct aetiology it does not
currently mention.

### DIS-NEO-ORAL-AME — Acanthomatous Ameloblastoma

**Feigin K, Bell C. Desmoplastic histological subtype of ameloblastoma in 16
dogs. Front Vet Sci. 2024;11:1362237. doi:10.3389/fvets.2024.1362237**

- First thorough case series of desmoplastic ameloblastoma in dogs, 16 cases.
  Presents as a mass or swelling of the rostral mandible or maxilla in
  middle-aged to older dogs. Radiolucent or mixed radiographic pattern with
  well-defined borders and variable loculation. **A solid, fibrous tumour with
  obscured odontogenic epithelium that is challenging to diagnose histologically
  and can mimic several other oral tumours, both benign and malignant.**
  Behaviour locally destructive but benign; prognosis favourable after excision.
- The page's `pearl` warned against one error — confusing an acanthomatous
  ameloblastoma with a fibrous epulis, which risks under-treatment. This paper
  supplies the **opposite** error, which is worse: a desmoplastic ameloblastoma
  read as a malignant fibrous tumour. That ends with an owner told their dog has
  a sarcoma, and either a disfiguring resection or euthanasia for a tumour that
  does not metastasise. `conf` now carries the subtype, why the histology is
  hard, and that the imaging pattern still looks benign rather than frankly
  destructive.
- Rule 2: 16 dogs, descriptive, **no comparative outcome data reported**. The
  page says the prognosis statement is a description rather than a prognosis, and
  no survival or recurrence figure is invented — the existing "<20% recurrence"
  on the page belongs to the acanthomatous form and is left attached to it.
- Rule 6: online-only; Crossref 2024-04-04, vol 11, article 1362237; PubMed
  agrees. 2 authors → both listed.

**Declined:** *Zobel A, Böttcher P. Tierarztl Prax Ausg K. 2024;52(5):300-307* —
one French Bulldog, template-guided segmental mandibulectomy with inferior
alveolar nerve preservation and a patient-specific PEEK bridging plate.
Genuinely interesting (orofacial sensation preserved, which traditional
mandibulectomy sacrifices) but a single case of a bespoke 3D-printed technique
available almost nowhere, and the page's surgical section is about margins
rather than reconstruction.

### Resolver

New source names: Kang, Pollack, Feigin. No prefix collisions — checked `kan`,
`bal`, `fei`, `pol`; the nearby existing names are 'Kaminsky'/'Kasabalis',
'Baka'/'Baker'/'Barker' and 'Porras', none of which is a prefix relation. Also
checked db.ts for `(Ball…`, `(Kang…` and `(Feig…` prose parentheticals: none.

## Batch — DIS-RESP-MEDLYM (141 → 140, uncited 34 → 33)

Single page this round. Two searches for feline/canine clinical toxoplasmosis
returned only zoo-animal and horse material (see declined, below), so
DIS-INFECT-TOXO stays uncited rather than taking a weaker source.

### DIS-RESP-MEDLYM — Mediastinal Lymphoma

**Horta RS, Souza LM, Sena BV, et al. LOPH: a novel chemotherapeutic protocol
for feline high-grade multicentric or mediastinal lymphoma, developed in an area
endemic for feline leukemia virus. J Feline Med Surg. 2021;23(2):86-97.
doi:10.1177/1098612X20926893**

- Prospective, 21 cats with cytologically diagnosed high-grade multicentric or
  mediastinal lymphoma. **19/21 (90.5%) FeLV-positive.** LOPH = lomustine,
  vincristine, prednisolone, doxorubicin.
- Complete response 17/21 (81%). **MST 214 days overall and 214 days for the 13
  mediastinal cats; not reached for the 8 multicentric cats (P = 0.9). MST 171
  days among cats with persistent FeLV antigenaemia.**
- Only 7 cats finished induction (20–31 weeks, median 20); all 7 went on to
  maintenance.
- **Haematologic toxicity in 100% at some point, mostly grade I–II:
  thrombocytopenia 21/21, neutropenia 16/21, anaemia 15/21.** Grade I anorexia
  and vomiting in 4/21.
- The page's `prog` said FeLV-positive cats do worse and to test early — correct
  but with no numbers. It now carries mediastinal-specific survival and the
  figure to quote when the FeLV test comes back positive.
- Three things stated rather than glossed:
  - **Response rate and completion rate are different conversations.** 81% CR
    against 7 of 21 finishing induction is the gap an owner needs to hear about.
  - The mediastinal-vs-multicentric comparison was not significant, but with 13
    and 8 cats the study had little power — so "no difference" is not evidence of
    equivalence.
  - The authors conclude LOPH "resulted in a better MST than similar studies with
    other protocols". That is a comparison **across published series**, not a
    controlled trial, and the page says so. They themselves call for controlled
    trials.
- The toxicity profile went to `monitor` next to the existing "haematology before
  each dose" line, framed as what to expect rather than what to react to —
  thrombocytopenia in every cat, mostly low grade.
- Rule 6: **registries disagree and it changes the citation.** PubMed epub
  2020-07-20; Crossref print **2021-02**, 23(2):86-97. Cited as **Horta 2021**.
  7 authors → first 3 + et al.

**Jaroensong T, Piamwaree J, Sattasathuchana P. Effects of chemotherapy on
hematological parameters and CD4+/CD8+ ratio in cats with mediastinal lymphoma
and seropositive to feline leukemia virus. Animals (Basel). 2022;12(3):223.
doi:10.3390/ani12030223**

- 18 client-owned FeLV-infected cats with mediastinal lymphoma on COP; CBC,
  creatinine, ALT and CD4/CD8 ratio measured before each of the first four
  inductions. WBC, neutrophils and PCV all fell significantly from week 1;
  CD4/CD8 ratio unchanged (P = 0.74). Authors conclude COP was safe.
- Used only to corroborate the myelosuppression pattern from a second protocol
  and a second population, which is all 18 cats can carry here.
- **Deliberately omitted:** the MST of 134 days for cats with a CD4/CD8 ratio
  below 1 after the first week. That is a subgroup of 18 with no stated
  comparator, and putting it on a reference page would imply the ratio is a usable
  prognostic test. The paper does not establish that.
- Rule 6: MDPI, online-only. Crossref 2022-01-18, 12(3):223; PubMed agrees. Note
  the title — PubMed renders it "CD4/CD8" (the superscript plus signs are lost in
  its text), Crossref and the paper itself have **CD4+/CD8+**. Corrected to the
  Crossref form after noticing the discrepancy. 3 authors → all listed.

**Declined — DIS-INFECT-TOXO found nothing usable:** searches for clinical
toxoplasmosis/neosporosis series in cats and dogs surfaced *Denk 2022* (126 zoo
animal cases across 31 species — ring-tailed lemurs, meerkats, Pallas' cats),
*Scuotto 2025* (an experimental intranasal vaccine in 784 captive wild animals
across 20 zoos) and *Shams 2024* (seroprevalence in 487 Iranian horses). All are
real papers and none is about the domestic cat or dog in front of a clinician.
The page stays uncited; it needs a dedicated search of the older canine
neosporosis literature, which these query shapes are not reaching.

**Process note from this batch.** The new Jaroensong test asserted
`toContain('Hematological Parameters')` in Title Case, while the AMA reference
string is sentence case. It failed — but the first run of the gate was
`npx tsc --noEmit && npx vitest run --silent 2>&1 | tail -3`, and `tail -3`
showed only the timing lines, so the failure was invisible until the full chain
was re-run reading exit status. This is the second time in this work that piping
test output through `head`/`tail` has hidden a real failure. Read the exit
status; do not read the tail of a pipe.

## Batch — DIS-INFECT-CAMPYLO (140 → 139, uncited 33 → 32)

### DIS-INFECT-CAMPYLO — Bacterial Enteritis (Campylobacter / Clostridial / Salmonella)

This page gets the **strongest evidence cited anywhere in this work so far**: a
GRADE-assessed systematic review and meta-analysis underpinning a European
antimicrobial-use guideline.

**Scahill K, Jessen LR, Prior C, et al. Efficacy of antimicrobial and
nutraceutical treatment for canine acute diarrhoea: a systematic review and
meta-analysis for European Network for Optimization of Antimicrobial Therapy
(ENOVAT) guidelines. Vet J. 2023;303:106054. doi:10.1016/j.tvjl.2023.106054**

- PICOs set by a multidisciplinary expert panel with general-practitioner and
  owner input; GRADE used to rate certainty. Six RCTs met criteria for
  antimicrobials and six for nutraceuticals. Severity categorised as mild,
  moderate or severe by systemic signs and fluid responsiveness. Outcomes:
  duration of diarrhoea, duration of hospitalisation, disease progression,
  mortality, adverse effects.
- **High-certainty evidence that antimicrobial treatment had no clinically
  relevant effect on any outcome in mild or moderate disease.** Certainty **low**
  for severe disease.
- **Nutraceuticals (prebiotics, probiotics, synbiotics) did not shorten the
  duration of diarrhoea** (very low to moderate certainty). No adverse effects
  reported in any of the twelve trials.
- Two corrections to the page, both to statements that would otherwise drive
  antibiotic and supplement use:
  - `tx1` opened with "most cases self-limiting — supportive care", then listed
    antibiotic protocols per organism with no threshold. The protocols are kept
    but now explicitly framed as being for symptomatic, severe or
    zoonotic-risk cases rather than routine acute diarrhoea, with the
    high-certainty no-benefit finding stated first.
  - `tx2` said probiotics "may reduce duration". The best available synthesis
    says they do not. Both now appear together, and the page says the argument
    against them is cost and false reassurance rather than harm — because the
    review found no adverse effects, and overstating harm would be its own error.
  - **Low certainty for severe disease is reported as unresolved, not as
    no-benefit.** "No evidence of effect" at the severe end would be a misreading
    of a low-certainty rating, and the severe cases are exactly the ones where a
    clinician reaches for the protocols on this page.
- Rule 5 note: this is a systematic review backing a society guideline (ENOVAT),
  which is the fallback class Rule 5 names for protocols. It is cited here on a
  **disease** page, where Rule 4 only requires a peer-reviewed paper — but it is
  recorded as a candidate should `PROT`-side acute diarrhoea guidance ever need
  a consensus-grade source.
- Rule 6: Crossref and PubMed agree, 2023;303:106054 (PubMed epub 2023-12-02).
  18 authors → first 3 + et al.

**O'Neill DG, Prisk LJ, Brodbelt DC, Church DB, Allerton F. Epidemiology and
clinical management of acute diarrhoea in dogs under primary veterinary care in
the UK. PLoS One. 2025;20(6):e0324203. doi:10.1371/journal.pone.0324203**

- VetCompass, study population **2,250,417 dogs**, random sample of 1,835
  confirmed incident acute diarrhoea cases in 2019.
- **One-year incidence risk 8.18% (95% CI 7.83–8.55)** — roughly 1 in 12 dogs a
  year. **80.27% had only one physical visit** for the episode.
- Haemorrhagic diarrhoea recorded in 29.32%. Comorbid signs: vomiting 44.25%,
  reduced appetite 27.68%, lethargy 24.20%.
- Management: **probiotics 59.62%, dietary management 43.98%, antibiosis 38.20%**,
  maropitant 24.03%.
- Used for scale and for the stewardship gap, which is what makes the Scahill
  finding matter: 38.2% still receive antibiotics, and probiotics are the single
  commonest intervention, for a condition where 80% need one visit.
- The haemorrhagic figure went on `signs` with the point that blood in the stool
  is common and does not by itself indicate a bacterial cause — the inference the
  page's own title invites.
- **Scope stated honestly:** this is acute diarrhoea of any cause, not
  Campylobacter-specific. It is cited here because this is the page a clinician
  lands on when the thought is "bacterial diarrhoea, so antibiotics", which is
  where the reflex lives. The breed odds ratios (Maltese and Miniature Poodle
  2.17, Cavapoo 2.07, GSD 1.69, Yorkshire Terrier 1.51, Cockapoo 1.36) are
  **not** carried: they are for acute diarrhoea of any cause and would read on
  this page as breed predispositions to bacterial enteritis, which the study does
  not show.

**Declined:** *Tomusiak-Plebanek 2022, BMC Vet Res 18(1):112* — in vitro
anti-*Campylobacter* activity of canine *Lactobacillus* isolates. No clinical
outcome, and the authors call for in vitro and in vivo work before application.

### Resolver — O'Neill now has five papers

`ONEILL_BY_YEAR` gains '2025'. O'Neill is the most heavily reused surname in the
resolver: five papers across four years, with **two years carrying two papers
each**, disambiguated by keyword rather than year (`cornea` for the 2017 corneal
ulcerative disease paper against the 2017 GDV paper, `periodont` for the 2021
periodontal paper against the 2021 KCS paper). Adding a fifth needed no new
machinery because 2025 is unshared.

Locked by a test that resolves all five markers and asserts five distinct ids,
and verified by rendering DIS-GI-GDV (O'Neill 2017 GDV still at reference 8) and
DIS-EYE-KCS (O'Neill 2021 KCS still at reference 2). Note the markers use the
**curly** apostrophe, matching `SOURCE_NAMES`.
