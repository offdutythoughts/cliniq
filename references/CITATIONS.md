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
