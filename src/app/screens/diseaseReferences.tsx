'use client'
// ── Disease-page references (AMA numbered) ───────────────────────────────────
// Disease content cites sources inline as "(Ettinger Ch 314)" / "(Ettinger Ch
// 127, 311)" / "(Ettinger 9e)" / "(Gelatt 6th edn Table 17.3)". We parse those
// in place — no DB changes — and render them as per-page AMA superscript numbers
// (each cited Ettinger chapter is its own numbered reference) pointing at the
// numbered list printed at the foot of the page (see <References> in
// DiseasePageView). Numbering is per page, in order of first appearance.

import { createContext, useContext } from 'react'

// AMA book form: Editors, eds. Title. Edition. Publisher; year(: chap N).
// Chapter authors/titles aren't tracked, so the editor-led chapter form is used.
// Verbatim from references/CITATIONS.md, which is the source of truth for these
// strings — do not retype one from memory or from a filename.
// Editor order is title-page order (Côté leads the 9th), and the 9th carries no
// subtitle — both verified against the book's own front matter, 2026-08-15.
const ETTINGER_BOOK =
  'Côté E, Ettinger SJ, Feldman EC, eds. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024'
// Verbatim from references/CITATIONS.md. The title page (PDF p6) names Gelatt as
// the sole Editor; Ben-Shlomo, Gilger, Hendrix, Kern and Plummer are Associate
// Editors, who AMA does not promote to 'eds.' — an earlier string listed all six.
const GELATT_BOOK =
  'Gelatt KN, ed. Veterinary Ophthalmology. 6th ed. Wiley Blackwell; 2021'
// Web-published clinical guideline — organisation-as-author AMA form with URL.
const AHS_GUIDELINES =
  'American Heartworm Society. Current Canine Guidelines for the Prevention, Diagnosis, and Management of Heartworm (Dirofilaria immitis) Infection in Dogs. American Heartworm Society; 2024. https://www.heartwormsociety.org/veterinary-resources/american-heartworm-society-guidelines'
// Peer-reviewed journal sources — AMA article form: Authors. Title. Journal. Year;Vol(Issue):Pages.
// The ACVIM uroliths consensus is the gold-standard urolith reference; Berent's
// SUB series is the definitive feline ureteral-obstruction outcomes paper.
const ACVIM_UROLITHS =
  'Lulich JP, Berent AC, Adams LG, Westropp JL, Bartges JW, Osborne CA. ACVIM small animal consensus recommendations on the treatment and prevention of uroliths in dogs and cats. J Vet Intern Med. 2016;30(5):1564-1574. doi:10.1111/jvim.14559'
const BERENT_SUB =
  'Berent AC, Weisse CW, Bagley DH, Lamb K. Use of a subcutaneous ureteral bypass device for treatment of benign ureteral obstruction in cats: 174 ureters in 134 cats (2009-2015). J Am Vet Med Assoc. 2018;253(10):1309-1327. doi:10.2460/javma.253.10.1309'
// Myasthenia gravis / megaoesophagus evidence base. Shelton is the classic
// spontaneous-remission cohort; Forgash the modern outcome cohort (the two
// disagree on remission rate — both are cited so the page can show the range).
const SHELTON_REMISSION =
  'Shelton GD, Lindstrom JM. Spontaneous remission in canine myasthenia gravis: implications for assessing human MG therapies. Neurology. 2001;57(11):2139-2141. doi:10.1212/wnl.57.11.2139'
const FORGASH_MG =
  'Forgash JT, Chang YM, Mittelman NS, et al. Clinical features and outcome of acquired myasthenia gravis in 94 dogs. J Vet Intern Med. 2021;35(5):2315-2326. doi:10.1111/jvim.16223'
const CRIDGE_NEOSTIGMINE =
  'Cridge H, Little A, José-López R, et al. The clinical utility of neostigmine administration in the diagnosis of acquired myasthenia gravis. J Vet Emerg Crit Care. 2021;31(5):647-655. doi:10.1111/vec.13097'
const DEWEY_MMF =
  'Dewey CW, Cerda-Gonzalez S, Fletcher DJ, et al. Mycophenolate mofetil treatment in dogs with serologically diagnosed acquired myasthenia gravis: 27 cases (1999-2008). J Am Vet Med Assoc. 2010;236(6):664-668. doi:10.2460/javma.236.6.664'
const QUINTAVALLA_SILDENAFIL =
  'Quintavalla F, Menozzi A, Pozzoli C, et al. Sildenafil improves clinical signs and radiographic features in dogs with congenital idiopathic megaoesophagus: a randomised controlled trial. Vet Rec. 2017;180(16):404. doi:10.1136/vr.103832'
// Endocrine + urolith guideline sources. AAHA is the single 2023 guideline
// covering hypoadrenocorticism, hypercortisolism and hypothyroidism, so all
// three disease pages resolve to one numbered entry.
// Organisation-as-author public-health guidance, cited as "(CDC 2026)".
const CDC_BARTONELLA =
  'Centers for Disease Control and Prevention. Veterinary Guidance for Bartonellosis. Updated March 23, 2026. https://www.cdc.gov/bartonella/hcp/veterinary-guidance/index.html'
const AAHA_ENDOCRINE =
  'Bugbee A, Rucinsky R, Cazabon S, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135. doi:10.5326/jaaha-ms-7368'
// Organisation-as-author guideline form (as for AHS) — FECAVA does not publish
// per-guideline author/journal metadata on its resource page.
const FECAVA_HYPOADRENO =
  'Federation of European Companion Animal Veterinary Associations. FECAVA Endocrinology Guidelines: Canine Hypoadrenocorticism. FECAVA; 2023. https://www.fecava.org/fecava-endocrinology-guidelines'
const MN_UROLITH =
  'Minnesota Urolith Center. Annual Report: Canine and Feline Urolith Submissions. University of Minnesota College of Veterinary Medicine; 2020. https://vetmed.umn.edu/centers-programs/minnesota-urolith-center'
// Feline hyperadrenocorticism evidence base. Ettinger Ch 294 (Ramsey & Herrtage)
// carries the general disease description; these are the primary sources behind
// the individual figures, cut-offs, doses and outcomes on that page.
const COOK_CUSHINGOID =
  'Cook AK, Evans JB. Feline comorbidities: recognition, diagnosis and management of the cushingoid diabetic. J Feline Med Surg. 2021;23(1):4-16. doi:10.1177/1098612x20979507'
const BOLAND_FHAC =
  'Boland LA, Barrs VR. Peculiarities of feline hyperadrenocorticism: update on diagnosis and treatment. J Feline Med Surg. 2017;19(9):933-947. doi:10.1177/1098612x17723245'
const VALENTIN_FHAC =
  'Valentin SY, Cortright CC, Nelson RW, et al. Clinical findings, diagnostic test results, and treatment outcome in cats with spontaneous hyperadrenocorticism: 30 cases. J Vet Intern Med. 2014;28(2):481-487. doi:10.1111/jvim.12298'
const KEITH_TRILOSTANE =
  'Mellett Keith AM, Bruyette D, Stanley S. Trilostane therapy for treatment of spontaneous hyperadrenocorticism in cats: 15 cases (2004-2012). J Vet Intern Med. 2013;27(6):1471-1477. doi:10.1111/jvim.12178'
const NEIGER_TRILOSTANE =
  'Neiger R, Witt AL, Noble A, German AJ. Trilostane therapy for treatment of pituitary-dependent hyperadrenocorticism in 5 cats. J Vet Intern Med. 2004;18(2):160-164. doi:10.1892/0891-6640(2004)18<160:ttftop>2.0.co;2'
const MICELI_TRILOSTANE =
  'Miceli D, Tavares F, Montoya MZ, et al. Trilostane treatment for feline hypercortisolism: Latin America multicenter study, 43 cases (2012-2022). Presented at: European College of Veterinary Internal Medicine — Companion Animals Congress; 2022.'
const DALEY_METYRAPONE =
  'Daley CA, Zerbe CA, Schick RO, Powers RD. Use of metyrapone to treat pituitary-dependent hyperadrenocorticism in a cat with large cutaneous wounds. J Am Vet Med Assoc. 1993;202(6):956-960. doi:10.2460/javma.1993.202.06.956'
const MOORE_METYRAPONE =
  'Moore LE, Biller DS, Olsen DE. Hyperadrenocorticism treated with metyrapone followed by bilateral adrenalectomy in a cat. J Am Vet Med Assoc. 2000;217(5):691-694. doi:10.2460/javma.2000.217.691'
const DUESBERG_ADRENALECTOMY =
  'Duesberg CA, Nelson RW, Feldman EC, Vaden SL, Scott-Moncrieff CR. Adrenalectomy for treatment of hyperadrenocorticism in cats: 10 cases (1988-1992). J Am Vet Med Assoc. 1995;207(8):1066-1070. doi:10.2460/javma.1995.207.08.1066'
const MEIJ_HYPOPHYSECTOMY =
  'Meij BP, Voorhout G, van den Ingh TS, Rijnberk A. Transsphenoidal hypophysectomy for treatment of pituitary-dependent hyperadrenocorticism in 7 cats. Vet Surg. 2001;30(1):72-86. doi:10.1053/jvet.2001.17843'
const BENCHEKROUN_ACTH =
  'Benchekroun G, de Fornel-Thibaud P, Dubord M, et al. Plasma ACTH precursors in cats with pituitary-dependent hyperadrenocorticism. J Vet Intern Med. 2012;26(3):575-581. doi:10.1111/j.1939-1676.2012.00924.x'
const HARDY_SKIN =
  'Hardy L, Gil-Morales C, Maunder C, Paran E. Skin fragility in a cat presenting with pituitary-dependent hyperadrenocorticism. JFMS Open Rep. 2023;9(1):20551169231171245. doi:10.1177/20551169231171245'
const YAYOSHI_RADIATION =
  'Yayoshi N, Hamamoto Y, Oda H, et al. Successful treatment of feline hyperadrenocorticism with pituitary macroadenoma using radiation therapy: a case study. J Vet Med Sci. 2022;84(7):898-904. doi:10.1292/jvms.22-0021'
const MUSCHNER_REMISSION =
  'Muschner AC, Varela FV, Hazuchova K, Niessen SJ, Pöppl ÁG. Diabetes mellitus remission in a cat with pituitary-dependent hyperadrenocorticism after trilostane treatment. JFMS Open Rep. 2018;4(1):2055116918767708. doi:10.1177/2055116918767708'
const LIEN_IATROGENIC =
  'Lien YH, Huang HP, Chang PH. Iatrogenic hyperadrenocorticism in 12 cats. J Am Anim Hosp Assoc. 2006;42(6):414-423. doi:10.5326/0420414'
const CHIRAYATH_IATROGENIC =
  'Chirayath D, Shaheena S. Iatrogenic hypercortisolism in a Persian kitten after topical application of a skin lotion containing clobetasol. Vet Dermatol. 2020;31(6):486-488. doi:10.1111/vde.12903'

// ACVIM consensus statements — the college's own evidence-based guidelines,
// published in JVIM. Cited in preference to a textbook chapter where one exists
// for the topic, because they are the profession's agreed position.
// Strings are verbatim from references/CITATIONS.md, which is the source of
// truth — do not retype one from memory. Note the two ITP statements share a
// lead author but diverge at the second: diagnosis is Kidd/Garden, treatment is
// Goggs/Kohn. They were transposed here until 2026-09-10, which an `et al`
// truncation hid; the status-epilepticus string had the wrong panel entirely.
const ACVIM_HYPERTENSION =
  'Acierno MJ, Brown S, Coleman AE, et al. ACVIM consensus statement: guidelines for the identification, evaluation, and management of systemic hypertension in dogs and cats. J Vet Intern Med. 2018;32(6):1803-1822. doi:10.1111/jvim.15331'
const ACVIM_FELINE_CM =
  'Luis Fuentes V, Abbott J, Chetboul V, et al. ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. J Vet Intern Med. 2020;34(3):1062-1077. doi:10.1111/jvim.15745'
const ACVIM_IMHA_TX =
  'Swann JW, Garden OA, Fellman CL, et al. ACVIM consensus statement on the treatment of immune-mediated hemolytic anemia in dogs. J Vet Intern Med. 2019;33(3):1141-1172. doi:10.1111/jvim.15463'
const ACVIM_ITP_DX =
  'LeVine DN, Kidd L, Garden OA, et al. ACVIM consensus statement on the diagnosis of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1958-1981. doi:10.1111/jvim.16996'
const ACVIM_ITP_TX =
  'LeVine DN, Goggs R, Kohn B, et al. ACVIM consensus statement on the treatment of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1982-2007. doi:10.1111/jvim.17079'
const ACVIM_SE =
  'Charalambous M, Muñana K, Patterson EE, Platt SR, Volk HA. ACVIM consensus statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38(1):19-40. doi:10.1111/jvim.16928'
const ACVIM_FCE =
  'Marsilio S, Freiche V, Johnson E, et al. ACVIM consensus statement guidelines on diagnosing and distinguishing low-grade neoplastic from inflammatory lymphocytic chronic enteropathies in cats. J Vet Intern Med. 2023;37(3):794-816. doi:10.1111/jvim.16690'

// Feline eosinophilic keratitis. A single case report, so it carries the weight
// of one animal — but it is the source for the comparative non-response and
// recurrence figures the textbook does not give, and for the combined
// triamcinolone/tacrolimus protocol.
// Primary lens luxation genetics. Both are named in the lens-luxation breed
// field; until they were registered here that part of the marker matched
// nothing and fell through to the Ettinger catch-all.
const FARIAS_PLL =
  'Farias FHG, Johnson GS, Taylor JF, et al. An ADAMTS17 splice donor site mutation in dogs with primary lens luxation. Invest Ophthalmol Vis Sci. 2010;51(9):4716-4721. doi:10.1167/iovs.09-5142'
const GOULD_PLL =
  'Gould D, Pettitt L, McLaughlin B, et al. ADAMTS17 mutation associated with primary lens luxation is widespread among breeds. Vet Ophthalmol. 2011;14(6):378-384. doi:10.1111/j.1463-5224.2011.00892.x'
const ROMANECK_EK =
  'Romaneck AK, Sebbag L. Case report: clinical remission in a cat with severe bilateral eosinophilic keratitis receiving combined immunosuppressive therapy (triamcinolone acetonide and tacrolimus). Front Vet Sci. 2021;8:580396. doi:10.3389/fvets.2021.580396'

// Verbatim from references/CITATIONS.md. Cited as AUTHOR, not editor: the title
// page (PDF p5) gives Lemmons alone with no role label, unlike the Gupta title
// page, which says "Edited by" explicitly.
const LEMMONS_BOOK =
  'Lemmons MS. Veterinary Dentistry: A Team Approach. 4th ed. Elsevier; 2025'
// Verbatim from references/CITATIONS.md. Academic Press is an Elsevier imprint;
// the copyright page carries both, and AMA cites the imprint.
const GUPTA_BOOK =
  'Gupta RC, ed. Veterinary Toxicology: Basic and Clinical Principles. 3rd ed. Academic Press; 2018'

// Toxicology eBook — organisation-as-author form. Password-protected FlippingBook,
// so no URL is given; page numbers refer to the eBook's own pagination.
const VETGIRL_TOX =
  'Lee J, ed. The Ultimate Guide to Toxicology. VETgirl / ASPCA Animal Poison Control Center; 2023'

// ── Primary literature behind the first five disease pages ───────────────────
// Sourced through the Consensus connector (2026-09-21) and verified against
// BOTH Crossref and Europe PMC, per the two-registry rule in
// references/CITATIONS.md. Where the registries disagreed, the fuller record
// won: Crossref carries the full page ranges Europe PMC truncates (S244-S257,
// not S244-57), Europe PMC carries the PRINT year where Crossref deposits the
// online-first one (Greci 2014 not 2013, Janssens 2017 not 2016, Lo 2022 not
// 2021, Langlois 2020 not 2019) and the full Hoppers page range (385-e102).
// The year in each inline marker is the print year, which is what the
// reference-block test asserts.

// Feline HCM — genetics, epidemiology, outcome and thromboprophylaxis. These
// are the primary sources behind the figures Ettinger Ch 234 only summarises.
const MEURS_MAINE_COON =
  'Meurs KM, Sanchez X, David RM, et al. A cardiac myosin binding protein C mutation in the Maine Coon cat with familial hypertrophic cardiomyopathy. Hum Mol Genet. 2005;14(23):3587-3593. doi:10.1093/hmg/ddi386'
const MEURS_RAGDOLL =
  'Meurs KM, Norgard MM, Ederer MM, Hendrix KP, Kittleson MD. A substitution mutation in the myosin binding protein C gene in ragdoll hypertrophic cardiomyopathy. Genomics. 2007;90(2):261-264. doi:10.1016/j.ygeno.2007.04.007'
const LONGERI_MYBPC3 =
  'Longeri M, Ferrari P, Knafelz P, et al. Myosin-binding protein C DNA variants in domestic cats (A31P, A74T, R820W) and their association with hypertrophic cardiomyopathy. J Vet Intern Med. 2013;27(2):275-285. doi:10.1111/jvim.12031'
const PAYNE_CATSCAN =
  'Payne JR, Brodbelt DC, Luis Fuentes V. Cardiomyopathy prevalence in 780 apparently healthy cats in rehoming centres (the CatScan study). J Vet Cardiol. 2015;17(suppl 1):S244-S257. doi:10.1016/j.jvc.2015.03.008'
const PAYNE_PROGNOSTIC =
  'Payne JR, Borgeat K, Connolly DJ, et al. Prognostic indicators in cats with hypertrophic cardiomyopathy. J Vet Intern Med. 2013;27(6):1427-1436. doi:10.1111/jvim.12215'
const PAYNE_POPULATION =
  'Payne J, Luis Fuentes V, Boswood A, Connolly D, Koffas H, Brodbelt D. Population characteristics and survival in 127 referred cats with hypertrophic cardiomyopathy (1997 to 2005). J Small Anim Pract. 2010;51(10):540-547. doi:10.1111/j.1748-5827.2010.00989.x'
const STEELE_IGF1 =
  'Steele MM, Borgeat K, Payne JR, et al. Increased insulin-like growth factor 1 concentrations in a retrospective population of non-diabetic cats diagnosed with hypertrophic cardiomyopathy. J Feline Med Surg. 2021;23(10):952-958. doi:10.1177/1098612x20987995'
const RUSH_HCM =
  'Rush JE, Freeman LM, Fenollosa NK, Brown DJ. Population and survival characteristics of cats with hypertrophic cardiomyopathy: 260 cases (1990-1999). J Am Vet Med Assoc. 2002;220(2):202-207. doi:10.2460/javma.2002.220.202'
const FOX_REVEAL =
  'Fox PR, Keene BW, Lamb K, et al. International collaborative study to assess cardiovascular risk and evaluate long-term health in cats with preclinical hypertrophic cardiomyopathy and apparently healthy cats: the REVEAL study. J Vet Intern Med. 2018;32(3):930-943. doi:10.1111/jvim.15122'
const HOGAN_FAT_CAT =
  'Hogan DF, Fox PR, Jacob K, et al. Secondary prevention of cardiogenic arterial thromboembolism in the cat: the double-blind, randomized, positive-controlled feline arterial thromboembolism; clopidogrel vs. aspirin trial (FAT CAT). J Vet Cardiol. 2015;17(suppl 1):S306-S317. doi:10.1016/j.jvc.2015.10.004'
const LO_DUAL_THERAPY =
  'Lo ST, Walker AL, Georges CJ, Li RH, Stern JA. Dual therapy with clopidogrel and rivaroxaban in cats with thromboembolic disease. J Feline Med Surg. 2022;24(4):277-283. doi:10.1177/1098612x211013736'

// Added with the content-enrichment pass. Two of these were misattributed by
// the search connector and corrected against both registries: the 2015
// genotype/phenotype cohort is GRANSTRÖM (Godiksen is second author) and the
// 90-case polyneuropathy study is BOOKBINDER (Flanders is second). Mary 2010
// turned out to be the actual source of the "RR 9.9" figure the breed field
// had been carrying uncited.
const MARY_A31P =
  'Mary J, Chetboul V, Sampedrano CC, et al. Prevalence of the MYBPC3-A31P mutation in a large European feline population and association with hypertrophic cardiomyopathy in the Maine Coon breed. J Vet Cardiol. 2010;12(3):155-161. doi:10.1016/j.jvc.2010.06.004'
const GRANSTROM_A31P =
  'Granström S, Godiksen MT, Christiansen M, et al. Genotype-phenotype correlation between the cardiac myosin binding protein C mutation A31P and hypertrophic cardiomyopathy in a cohort of Maine Coon cats: a longitudinal study. J Vet Cardiol. 2015;17(suppl 1):S268-S281. doi:10.1016/j.jvc.2015.10.005'
const BOEYKENS_ACMG =
  'Boeykens F, Abitbol M, Anderson H, et al. Classification of feline hypertrophic cardiomyopathy-associated gene variants according to the American College of Medical Genetics and Genomics guidelines. Front Vet Sci. 2024;11:1327081. doi:10.3389/fvets.2024.1327081'
const BRAINARD_SUPERCAT =
  'Brainard BM, Coleman AE, Kurosawa A, et al. Therapy with clopidogrel or rivaroxaban has equivalent impacts on recurrence of thromboembolism and survival in cats following cardiogenic thromboembolism: the SUPERCAT study. J Am Vet Med Assoc. 2025;263(4):1-10. doi:10.2460/javma.24.09.0584'
const BOOKBINDER_LP =
  'Bookbinder LC, Flanders J, Bookbinder PF, Harvey HJ, Barry JS, Cheetham J. Idiopathic canine laryngeal paralysis as one sign of a diffuse polyneuropathy: an observational study of 90 cases (2007-2013). Vet Surg. 2016;45(2):254-260. doi:10.1111/vsu.12444'
const MILOVANCEV_METOCLOPRAMIDE =
  'Milovancev M, Townsend K, Spina J, et al. Effect of metoclopramide on the incidence of early postoperative aspiration pneumonia in dogs with acquired idiopathic laryngeal paralysis. Vet Surg. 2016;45(5):577-581. doi:10.1111/vsu.12491'
const OGDEN_CISAPRIDE =
  'Ogden J, Ovbey D, Saile K. Effects of preoperative cisapride on postoperative aspiration pneumonia in dogs with laryngeal paralysis. J Small Anim Pract. 2019;60(3):183-190. doi:10.1111/jsap.12940'

// Laryngeal paralysis / GOLPP. Stanley is the controlled cohort that turned
// "idiopathic LP" into GOLPP; Tobias and Miller are the doxapram evidence
// behind the laryngoscopy protocol; Wilson and MacPhail are the surgical
// outcome cohorts.
const STANLEY_GOLPP =
  'Stanley BJ, Hauptman JG, Fritz MC, Rosenstein DS, Kinns J. Esophageal dysfunction in dogs with idiopathic laryngeal paralysis: a controlled cohort study. Vet Surg. 2010;39(2):139-149. doi:10.1111/j.1532-950x.2009.00626.x'
const TOBIAS_DOXAPRAM =
  'Tobias KM, Jackson AM, Harvey RC. Effects of doxapram HCl on laryngeal function of normal dogs and dogs with naturally occurring laryngeal paralysis. Vet Anaesth Analg. 2004;31(4):258-263. doi:10.1111/j.1467-2995.2004.00168.x'
const MILLER_DOXAPRAM =
  'Miller CJ, McKiernan BC, Pace J, Fettman MJ. The effects of doxapram hydrochloride (dopram-V) on laryngeal function in healthy dogs. J Vet Intern Med. 2002;16(5):524-528. doi:10.1111/j.1939-1676.2002.tb02381.x'
const WILSON_TIEBACK_AP =
  'Wilson D, Monnet E. Risk factors for the development of aspiration pneumonia after unilateral arytenoid lateralization in dogs with laryngeal paralysis: 232 cases (1987-2012). J Am Vet Med Assoc. 2016;248(2):188-194. doi:10.2460/javma.248.2.188'
const MACPHAIL_LP =
  'MacPhail CM, Monnet E. Outcome of and postoperative complications in dogs undergoing surgical treatment of laryngeal paralysis: 140 cases (1985-1998). J Am Vet Med Assoc. 2001;218(12):1949-1956. doi:10.2460/javma.2001.218.1949'
const JEFFERY_LP =
  'Jeffery ND, Talbot CE, Smith PM, Bacon NJ. Acquired idiopathic laryngeal paralysis as a prominent feature of generalised neuromuscular disease in 39 dogs. Vet Rec. 2006;158(1):17-21. doi:10.1136/vr.158.1.17'

// Feline inflammatory polyps. Anderson is the source for post-traction
// prednisolone; Wainberg is the 282-cat multicentre VBO series behind the
// staging rule; the rest are the per-technique recurrence figures.
// Anderson carries NO DOI in either registry (PMID 11132674) — it predates
// the Vet Rec DOI deposit, and 10.1136/vr.147.24.684 does not resolve. It is
// the one entry here cited without one; do not invent a DOI for it.
const ANDERSON_POLYPS =
  'Anderson DM, Robinson RK, White RA. Management of inflammatory polyps in 37 cats. Vet Rec. 2000;147(24):684-687'
const VEIR_POLYPS =
  'Veir JK, Lappin MR, Foley JE, Getzy DM. Feline inflammatory polyps: historical, clinical, and PCR findings for feline calici virus and feline herpes virus-1 in 28 cases. J Feline Med Surg. 2002;4(4):195-199. doi:10.1053/jfms.2002.0172'
const GRECI_PTT =
  'Greci V, Vernia E, Mortellaro CM. Per-endoscopic trans-tympanic traction for the management of feline aural inflammatory polyps: a case review of 37 cats. J Feline Med Surg. 2014;16(8):645-650. doi:10.1177/1098612x13516620'
const JANSSENS_TALA =
  'Janssens SD, Haagsman AN, Ter Haar G. Middle ear polyps: results of traction avulsion after a lateral approach to the ear canal in 62 cats (2004-2014). J Feline Med Surg. 2017;19(8):803-808. doi:10.1177/1098612x16660356'
const WAINBERG_VBO =
  'Wainberg SH, Selmic LE, Haagsman AN, et al. Comparison of complications and outcome following unilateral, staged bilateral, and single-stage bilateral ventral bulla osteotomy in cats. J Am Vet Med Assoc. 2019;255(7):828-836. doi:10.2460/javma.255.7.828'
const HOPPERS_BILATERAL =
  'Hoppers SE, May ER, Frank LA. Feline bilateral inflammatory aural polyps: a descriptive retrospective study. Vet Dermatol. 2020;31(5):385-e102. doi:10.1111/vde.12877'
const ANDERS_VBO_BAER =
  'Anders BB, Hoelzler MG, Scavelli TD, Fulcher RP, Bastian RP. Analysis of auditory and neurologic effects associated with ventral bulla osteotomy for removal of inflammatory polyps or nasopharyngeal masses in cats. J Am Vet Med Assoc. 2008;233(4):580-585. doi:10.2460/javma.233.4.580'
const BOHIN_COMPARTMENTS =
  'Bohin C, Garcia M, Bertinot C, Graille M, Bernardé A. Compartmental location of middle ear inflammatory polyps in cats: 9 cases (2021-2023). J Small Anim Pract. 2025;66(3):197-202. doi:10.1111/jsap.13811'

// Pyothorax. Barrs is the paper that overturned the bite-wound orthodoxy in
// cats; Rooney and Boothe are the canine medical-vs-surgical cohorts.
const BARRS_PYOTHORAX =
  'Barrs VR, Allan GS, Martin P, Beatty JA, Malik R. Feline pyothorax: a retrospective study of 27 cases in Australia. J Feline Med Surg. 2005;7(4):211-222. doi:10.1016/j.jfms.2004.12.004'
const DEMETRIOU_PYOTHORAX =
  'Demetriou JL, Foale RD, Ladlow J, McGrotty Y, Faulkner J, Kirby BM. Canine and feline pyothorax: a retrospective study of 50 cases in the UK and Ireland. J Small Anim Pract. 2002;43(9):388-394. doi:10.1111/j.1748-5827.2002.tb00089.x'
const STILLION_PYOTHORAX =
  'Stillion JR, Letendre J. A clinical review of the pathophysiology, diagnosis, and treatment of pyothorax in dogs and cats. J Vet Emerg Crit Care. 2015;25(1):113-129. doi:10.1111/vec.12274'
const ROONEY_PYOTHORAX =
  'Rooney MB, Monnet E. Medical and surgical treatment of pyothorax in dogs: 26 cases (1991-2001). J Am Vet Med Assoc. 2002;221(1):86-92. doi:10.2460/javma.2002.221.86'
const BOOTHE_PYOTHORAX =
  'Boothe HW, Howe LM, Boothe DM, Reynolds LA, Carpenter M. Evaluation of outcomes in dogs treated for pyothorax: 46 cases (1983-2001). J Am Vet Med Assoc. 2010;236(6):657-663. doi:10.2460/javma.236.6.657'
const EIRAS_DIAZ_CT =
  'Eiras-Diaz A, Frykfors von Hekkel A, Hanot E, et al. CT findings, management and short-term outcome of dogs with pyothorax: 101 cases (2010-2019). J Small Anim Pract. 2021;62(11):959-966. doi:10.1111/jsap.13374'
const JOHNSON_PYOTHORAX =
  'Johnson LR, Epstein SE, Reagan KL. Etiology and effusion characteristics in 29 cats and 60 dogs with pyothorax (2010-2020). J Vet Intern Med. 2023;37(3):1155-1165. doi:10.1111/jvim.16699'

// Acute vomiting and diarrhoea. Ramsey is the maropitant registration trial;
// Shmalberg, Rudinsky and Langlois are the metronidazole evidence base, which
// does NOT support routine use — see the qualifier bullet on DIS-GAST-DIET.
const RAMSEY_MAROPITANT =
  'Ramsey DS, Kincaid K, Watkins JA, et al. Safety and efficacy of injectable and oral maropitant, a selective neurokinin1 receptor antagonist, in a randomized clinical trial for treatment of vomiting in dogs. J Vet Pharmacol Ther. 2008;31(6):538-543. doi:10.1111/j.1365-2885.2008.00992.x'
const SHMALBERG_METRONIDAZOLE =
  'Shmalberg J, Montalbano C, Morelli G, Buckley GJ. A randomized double blinded placebo-controlled clinical trial of a probiotic or metronidazole for acute canine diarrhea. Front Vet Sci. 2019;6:163. doi:10.3389/fvets.2019.00163'
const RUDINSKY_COLITIS =
  'Rudinsky AJ, Parker VJ, Winston J, et al. Randomized controlled trial demonstrates nutritional management is superior to metronidazole for treatment of acute colitis in dogs. J Am Vet Med Assoc. 2022;260(S3):S23-S32. doi:10.2460/javma.22.08.0349'
const LANGLOIS_METRONIDAZOLE =
  'Langlois DK, Koenigshof AM, Mani R. Metronidazole treatment of acute diarrhea in dogs: a randomized double blinded placebo-controlled clinical trial. J Vet Intern Med. 2020;34(1):98-104. doi:10.1111/jvim.15664'

// ── Primary literature behind disease pages 6-10 ─────────────────────────────
// Consensus connector, 2026-09-21, verified against Crossref AND Europe PMC.
// Three first-author corrections the connector forced again: the four-assay cPL
// comparison is CRIDGE (MacLeod is second), the canine CKD survival study is
// Rudinsky 2018 (a different Rudinsky paper from the 2022 colitis trial already
// here), and Venn's print year is 2017 where Crossref deposited 2016.

// Canine parvovirus. Venn is the randomised inpatient-vs-outpatient trial the
// outpatient card is built on; Mohr and de Mari are the two interventions with
// real trial evidence behind them.
const VENN_OUTPATIENT =
  'Venn EC, Preisner K, Boscan PL, Twedt DC, Sullivan LA. Evaluation of an outpatient protocol in the treatment of canine parvoviral enteritis. J Vet Emerg Crit Care. 2017;27(1):52-65. doi:10.1111/vec.12561'
const SARPONG_OUTPATIENT =
  'Sarpong KJ, Lukowski JM, Knapp CG. Evaluation of mortality rate and predictors of outcome in dogs receiving outpatient treatment for parvoviral enteritis. J Am Vet Med Assoc. 2017;251(9):1035-1041. doi:10.2460/javma.251.9.1035'
const PERLEY_SHELTER =
  'Perley K, Burns CC, Maguire C, et al. Retrospective evaluation of outpatient canine parvovirus treatment in a shelter-based low-cost urban clinic. J Vet Emerg Crit Care. 2020;30(2):202-208. doi:10.1111/vec.12941'
const CHALIFOUX_PROGNOSTIC =
  'Chalifoux NV, Parker SE, Cosford KL. Prognostic indicators at presentation for canine parvoviral enteritis: 322 cases (2001-2018). J Vet Emerg Crit Care. 2021;31(3):402-413. doi:10.1111/vec.13052'
const PEREIRA_FMT =
  'Pereira GQ, Gomes LA, Santos IS, Alfieri AF, Weese JS, Costa MC. Fecal microbiota transplantation in puppies with canine parvovirus infection. J Vet Intern Med. 2018;32(2):707-711. doi:10.1111/jvim.15072'
const HOEL_ORAL_FMT =
  'Hoel ME, Gimenez AR, Elbe A, Horecka K, Alvarez E, Lashnits E. Oral fecal microbial transplant for parvovirus in the outpatient setting: a randomized controlled trial to evaluate a practical and low-cost intervention. J Am Vet Med Assoc. 2026;264(10):1301-1307. doi:10.2460/javma.26.01.0051'
const MOHR_EEN =
  'Mohr AJ, Leisewitz AL, Jacobson LS, Steiner JM, Ruaux CG, Williams DA. Effect of early enteral nutrition on intestinal permeability, intestinal protein loss, and outcome in dogs with severe parvoviral enteritis. J Vet Intern Med. 2003;17(6):791-798. doi:10.1111/j.1939-1676.2003.tb02516.x'
const DE_MARI_INTERFERON =
  'de Mari K, Maynard L, Eun HM, Lebreux B. Treatment of canine parvoviral enteritis with interferon-omega in a placebo-controlled field trial. Vet Rec. 2003;152(4):105-108. doi:10.1136/vr.152.4.105'
const ACCIACCA_PLASMA =
  'Acciacca RA, Sullivan LA, Webb TL, Johnson V, Dow SW. Clinical evaluation of hyperimmune plasma for treatment of dogs with naturally occurring parvoviral enteritis. J Vet Emerg Crit Care. 2020;30(5):525-533. doi:10.1111/vec.12987'

// Chronic kidney disease. Elliott is the diet-survival trial; Syme, King and
// Chakrabarti are the prognostic cohorts; Scobie is the systematic review that
// tempers the SDMA claim.
const HALL_SDMA =
  'Hall JA, Yerramilli M, Obare E, Yerramilli M, Jewell DE. Comparison of serum concentrations of symmetric dimethylarginine and creatinine as kidney function biomarkers in cats with chronic kidney disease. J Vet Intern Med. 2014;28(6):1676-1683. doi:10.1111/jvim.12445'
const NABITY_SDMA =
  'Nabity MB, Lees GE, Boggess MM, et al. Symmetric dimethylarginine assay validation, stability, and evaluation as a marker for the early detection of chronic kidney disease in dogs. J Vet Intern Med. 2015;29(4):1036-1044. doi:10.1111/jvim.12835'
const SCOBIE_SDMA_REVIEW =
  'Scobie C, Dean R, Stavisky J, Plüddemann A. Diagnostic accuracy of symmetric dimethylarginine for chronic kidney disease in cats and dogs: a systematic review. Vet Rec. 2026;198(7):e299-e314. doi:10.1002/vetr.70216'
const SYME_PROTEINURIA =
  'Syme HM, Markwell PJ, Pfeiffer D, Elliott J. Survival of cats with naturally occurring chronic renal failure is related to severity of proteinuria. J Vet Intern Med. 2006;20(3):528-535. doi:10.1111/j.1939-1676.2006.tb02892.x'
const KING_PROGNOSTIC =
  'King JN, Tasker S, Gunn-Moore DA, Strehlau G. Prognostic factors in cats with chronic kidney disease. J Vet Intern Med. 2007;21(5):906-916. doi:10.1111/j.1939-1676.2007.tb03042.x'
const CHAKRABARTI_PROGRESSION =
  'Chakrabarti S, Syme HM, Elliott J. Clinicopathological variables predicting progression of azotemia in cats with chronic kidney disease. J Vet Intern Med. 2012;26(2):275-281. doi:10.1111/j.1939-1676.2011.00874.x'
const ELLIOTT_RENAL_DIET =
  'Elliott J, Rawlings JM, Markwell PJ, Barber PJ. Survival of cats with naturally occurring chronic renal failure: effect of dietary management. J Small Anim Pract. 2000;41(6):235-242. doi:10.1111/j.1748-5827.2000.tb03932.x'
const QUIMBY_MIRTAZAPINE =
  'Quimby JM, Lunn KF. Mirtazapine as an appetite stimulant and anti-emetic in cats with chronic kidney disease: a masked placebo-controlled crossover clinical trial. Vet J. 2013;197(3):651-655. doi:10.1016/j.tvjl.2013.05.048'
const SPENCER_OMEPRAZOLE =
  'Spencer A, Quimby JM, Price JM, et al. Appetite-stimulating effects of once-daily omeprazole in cats with chronic kidney disease: double-blind, placebo-controlled, randomized, crossover trial. J Vet Intern Med. 2021;35(6):2705-2712. doi:10.1111/jvim.16268'
const RUDINSKY_CKD =
  'Rudinsky AJ, Harjes LM, Byron J, et al. Factors associated with survival in dogs with chronic kidney disease. J Vet Intern Med. 2018;32(6):1977-1982. doi:10.1111/jvim.15322'
const MORTIER_PROTEINURIA =
  'Mortier F, Daminet S, Marynissen S, Verbeke J, Paepe D. Clinical importance of borderline proteinuria in nonazotemic cats and evaluation of other risk factors for the development of chronic kidney disease. J Vet Intern Med. 2025;39(1):e17257. doi:10.1111/jvim.17257'

// Hypoadrenocorticism. Gold is the largest basal-cortisol cohort; Vincent is
// the randomised trial behind the sub-label DOCP dose the page recommends.
const GOLD_BASAL_CORTISOL =
  'Gold AJ, Langlois DK, Refsal KR. Evaluation of basal serum or plasma cortisol concentrations for the diagnosis of hypoadrenocorticism in dogs. J Vet Intern Med. 2016;30(6):1798-1805. doi:10.1111/jvim.14589'
const BOVENS_BASAL_CORTISOL =
  'Bovens C, Tennant K, Reeve J, Murphy KF. Basal serum cortisol concentration as a screening test for hypoadrenocorticism in dogs. J Vet Intern Med. 2014;28(5):1541-1545. doi:10.1111/jvim.12415'
const LENNON_BASAL_CORTISOL =
  'Lennon EM, Boyle TE, Hutchins RG, et al. Use of basal serum or plasma cortisol concentrations to rule out a diagnosis of hypoadrenocorticism in dogs: 123 cases (2000-2005). J Am Vet Med Assoc. 2007;231(3):413-416. doi:10.2460/javma.231.3.413'
const VINCENT_LOW_DOSE_DOCP =
  'Vincent AM, Okonkowski LK, Brudvig JM, et al. Low-dose desoxycorticosterone pivalate treatment of hypoadrenocorticism in dogs: a randomized controlled clinical trial. J Vet Intern Med. 2021;35(4):1720-1728. doi:10.1111/jvim.16195'

// Canine pancreatitis. Kook is the DGGR/cPL agreement study the >216 U/L cut-off
// comes from; Trivedi and Haworth are why no lipase assay stands alone.
const KOOK_DGGR =
  'Kook PH, Kohler N, Hartnack S, Riond B, Reusch CE. Agreement of serum Spec cPL with the 1,2-o-dilauryl-rac-glycero glutaric acid-(6′-methylresorufin) ester (DGGR) lipase assay and with pancreatic ultrasonography in dogs with suspected pancreatitis. J Vet Intern Med. 2014;28(3):863-870. doi:10.1111/jvim.12334'
const CRIDGE_CPL_ASSAYS =
  'Cridge H, MacLeod AG, Pachtinger GE, et al. Evaluation of SNAP cPL, Spec cPL, VetScan cPL Rapid Test, and Precision PSL assays for the diagnosis of clinical pancreatitis in dogs. J Vet Intern Med. 2018;32(2):658-664. doi:10.1111/jvim.15039'
const HAWORTH_CPL =
  'Haworth MD, Hosgood G, Swindells KL, Mansfield CS. Diagnostic accuracy of the SNAP and Spec canine pancreatic lipase tests for pancreatitis in dogs presenting with clinical signs of acute abdominal disease. J Vet Emerg Crit Care. 2014;24(2):135-143. doi:10.1111/vec.12158'
const TRIVEDI_CPL =
  'Trivedi S, Marks SL, Kass PH, et al. Sensitivity and specificity of canine pancreas-specific lipase (cPL) and other markers for pancreatitis in 70 dogs with and without histopathologic evidence of pancreatitis. J Vet Intern Med. 2011;25(6):1241-1247. doi:10.1111/j.1939-1676.2011.00793.x'
const HARRIS_EEN_PANCREATITIS =
  'Harris JP, Parnell NK, Griffith EH, Saker KE. Retrospective evaluation of the impact of early enteral nutrition on clinical outcomes in dogs with pancreatitis: 34 cases (2010-2013). J Vet Emerg Crit Care. 2017;27(4):425-433. doi:10.1111/vec.12612'
const MANSFIELD_EEN =
  'Mansfield CS, James FE, Steiner JM, Suchodolski JS, Robertson ID, Hosgood G. A pilot study to assess tolerability of early enteral nutrition via esophagostomy tube feeding in dogs with severe acute pancreatitis. J Vet Intern Med. 2011;25(3):419-425. doi:10.1111/j.1939-1676.2011.0703.x'

// Intussusception. Larose is the modern 153-dog series; Oakes and Applewhite
// are the two halves of the enteroplication argument and disagree, which is
// why the page now carries both rather than recommending it flatly.
const LAROSE_INTUSS =
  'Larose PC, Singh A, Giuffrida MA, et al. Clinical findings and outcomes of 153 dogs surgically treated for intestinal intussusceptions. Vet Surg. 2020;49(5):870-878. doi:10.1111/vsu.13442'
const APPLEWHITE_ENTEROPLICATION =
  'Applewhite AA, Hawthorne JC, Cornell KK. Complications of enteroplication for the prevention of intussusception recurrence in dogs: 35 cases (1989-1999). J Am Vet Med Assoc. 2001;219(10):1415-1418. doi:10.2460/javma.2001.219.1415'
const OAKES_ENTEROPLICATION =
  'Oakes MG, Lewis DD, Hosgood G, Beale BS. Enteroplication for the prevention of intussusception recurrence in dogs: 31 cases (1978-1992). J Am Vet Med Assoc. 1994;205(1):72-75. doi:10.2460/javma.1994.205.01.72'
const RALLIS_INTUSS =
  'Rallis TS, Papazoglou LG, Adamama-Moraitou KK, Prassinos NN. Acute enteritis or gastroenteritis in young dogs as a predisposing factor for intestinal intussusception: a retrospective study. J Vet Med A Physiol Pathol Clin Med. 2000;47(8):507-511. doi:10.1046/j.1439-0442.2000.00318.x'

// ── Primary literature behind disease pages 11-15 ────────────────────────────
// Consensus connector (its monthly search quota ran out partway through this
// pass — the last two pages were discovered through Crossref's bibliographic
// search instead, which is free). Everything verified against Crossref AND
// Europe PMC as usual, and the registries again disagreed with the connector:
// Watkins is J Small Anim Pract 2025;66(2):110-120 (Crossref's top hit was a
// BSAVA congress ABSTRACT under a different DOI, and the connector said 2024),
// and McCord's print year is 2026, not 2025.

// GDV. de Papp is the paper the ">6 mmol/L" rule comes from; Green is the study
// that failed to reproduce it, which is why the page now carries both.
const DE_PAPP_LACTATE =
  'de Papp E, Drobatz KJ, Hughes D. Plasma lactate concentration as a predictor of gastric necrosis and survival among dogs with gastric dilatation-volvulus: 102 cases (1995-1998). J Am Vet Med Assoc. 1999;215(1):49-52. doi:10.2460/javma.1999.215.01.49'
const ZACHER_LACTATE =
  'Zacher LA, Berg J, Shaw SP, Kudej RK. Association between outcome and changes in plasma lactate concentration during presurgical treatment in dogs with gastric dilatation-volvulus: 64 cases (2002-2008). J Am Vet Med Assoc. 2010;236(8):892-897. doi:10.2460/javma.236.8.892'
const GREEN_LACTATE =
  'Green TI, Tonozzi CC, Kirby R, Rudloff E. Evaluation of initial plasma lactate values as a predictor of gastric necrosis and initial and subsequent plasma lactate values as a predictor of survival in dogs with gastric dilatation-volvulus: 84 dogs (2003-2007). J Vet Emerg Crit Care. 2011;21(1):36-44. doi:10.1111/j.1476-4431.2010.00599.x'
const WARD_GASTROPEXY =
  'Ward MP, Patronek GJ, Glickman LT. Benefits of prophylactic gastropexy for dogs at risk of gastric dilatation-volvulus. Prev Vet Med. 2003;60(4):319-329. doi:10.1016/s0167-5877(03)00142-9'
const GLICKMAN_NONDIETARY =
  'Glickman LT, Glickman NW, Schellenberg DB, Raghavan M, Lee T. Non-dietary risk factors for gastric dilatation-volvulus in large and giant breed dogs. J Am Vet Med Assoc. 2000;217(10):1492-1499. doi:10.2460/javma.2000.217.1492'
const GLICKMAN_RISK_1994 =
  'Glickman LT, Glickman NW, Pérez CM, Schellenberg DB, Lantz GC. Analysis of risk factors for gastric dilatation and dilatation-volvulus in dogs. J Am Vet Med Assoc. 1994;204(9):1465-1471. doi:10.2460/javma.1994.204.09.1465'
const ONEILL_GDV =
  'O’Neill DG, Case J, Boag AK, et al. Gastric dilation-volvulus in dogs attending UK emergency-care veterinary practices: prevalence, risk factors and survival. J Small Anim Pract. 2017;58(11):629-638. doi:10.1111/jsap.12723'
const ALLEN_GASTROPEXY =
  'Allen P, Paul A. Gastropexy for prevention of gastric dilatation-volvulus in dogs: history and techniques. Top Companion Anim Med. 2014;29(3):77-80. doi:10.1053/j.tcam.2014.09.001'
const MCCORD_GDV =
  'McCord MA, O’Brien J, Ryave J, et al. Gastric dilatation-volvulus is associated with Poodle breeds, increased body size, and male sex, but not primary diet type or anxiety in the Dog Aging Project cohort. J Am Vet Med Assoc. 2026;264(4):1-9. doi:10.2460/javma.25.09.0609'

// Gastric ulceration. Marks is the ACVIM consensus and is keyed on the AUTHOR,
// not on "ACVIM <year>" — 2018 is already taken in ACVIM_BY_YEAR by the
// systemic-hypertension statement, so a "(ACVIM 2018)" marker here would have
// printed a blood-pressure guideline on the ulcer page.
const MARKS_GI_PROTECTANTS =
  'Marks SL, Kook PH, Papich MG, Tolbert MK, Willard MD. ACVIM consensus statement: support for rational administration of gastrointestinal protectants to dogs and cats. J Vet Intern Med. 2018;32(6):1823-1840. doi:10.1111/jvim.15337'
const SHAEVITZ_PIROXICAM =
  'Shaevitz MH, Moore GE, Fulkerson CM. A prospective, randomized, placebo-controlled, double-blinded clinical trial comparing the incidence and severity of gastrointestinal adverse events in dogs with cancer treated with piroxicam alone or in combination with omeprazole or famotidine. J Am Vet Med Assoc. 2021;259(4):385-391. doi:10.2460/javma.259.4.385'
const BAZELLE_CYTOPROTECTIVE =
  'Bazelle J, Threlfall A, Whitley N. Gastroprotectants in small animal veterinary practice — a review of the evidence. Part 1: cyto-protective drugs. J Small Anim Pract. 2018;59(10):587-602. doi:10.1111/jsap.12867'

// Hiatal hernia. Phillips is the 31-cat series every feline figure on the page
// comes from; Mayhew 2022 is the study that undercuts the assumption that
// fixing the airway fixes the hernia.
const PHILLIPS_FELINE_HH =
  'Phillips H, Corrie J, Engel DM, et al. Clinical findings, diagnostic test results, and treatment outcome in cats with hiatal hernia: 31 cases (1995-2018). J Vet Intern Med. 2019;33(5):1970-1976. doi:10.1111/jvim.15583'
const REEVE_BRACHY_HH =
  'Reeve EJ, Sutton D, Friend EJ, Warren-Smith CMR. Documenting the prevalence of hiatal hernia and oesophageal abnormalities in brachycephalic dogs using fluoroscopy. J Small Anim Pract. 2017;58(12):703-708. doi:10.1111/jsap.12734'
const MAYHEW_LAPAROSCOPIC =
  'Mayhew PD, Balsa IM, Marks SL, et al. Clinical and videofluoroscopic outcomes of laparoscopic treatment for sliding hiatal hernia and associated gastroesophageal reflux in brachycephalic dogs. Vet Surg. 2021;50(suppl 1):O67-O77. doi:10.1111/vsu.13622'
const MAYHEW_BOAS_SURGERY =
  'Mayhew PD, Marks SL, Pollard R, Balsa IM, Culp WTN, Giuffrida MA. Effect of conventional multilevel brachycephalic obstructive airway syndrome surgery on clinical and videofluoroscopic evidence of hiatal herniation and gastroesophageal reflux in dogs. Vet Surg. 2022;52(2):238-248. doi:10.1111/vsu.13906'
const WATKINS_HH_GASTROPEXY =
  'Watkins M, Shales C, Thomas G, Rossanese M, Sparks T, White R. Comparison of outcomes in dogs undergoing hiatal hernia repair with and without use of a gastropexy: 41 cases (2012-2022). J Small Anim Pract. 2025;66(2):110-120. doi:10.1111/jsap.13797'

// Chronic enteropathy and pyloric outflow obstruction.
const ALLENSPACH_RISK =
  'Allenspach K, Wieland B, Gröne A, Gaschen F. Chronic enteropathies in dogs: evaluation of risk factors for negative outcome. J Vet Intern Med. 2007;21(4):700-708. doi:10.1111/j.1939-1676.2007.tb03011.x'
const ALLENSPACH_LONGTERM =
  'Allenspach K, Culverwell C, Chan D. Long-term outcome in dogs with chronic enteropathies: 203 cases. Vet Rec. 2016;178(15):368. doi:10.1136/vr.103557'
const BELLENGER_PYLORIC =
  'Bellenger CR, Maddison JE, MacPherson GC, Ilkiw JE. Chronic hypertrophic pyloric gastropathy in 14 dogs. Aust Vet J. 1990;67(9):317-320. doi:10.1111/j.1751-0813.1990.tb07813.x'

// ── Primary literature behind disease pages 16-20 ────────────────────────────
// Discovered entirely through Crossref's bibliographic search — the Consensus
// connector's monthly quota was still exhausted. Verified against Crossref AND
// Europe PMC as usual. Europe PMC again carried the print year and the fuller
// initials where Crossref had the online-first date and truncated given names
// (Daniaux is 2014 not 2013; Behrend is Behrend EN, Arenas is Pérez-Alenza MD).

// Feline GI eosinophilic sclerosing fibroplasia. Craig is the paper that named
// the entity; Linton is the case series every figure on the page comes from.
const CRAIG_FGESF =
  'Craig LE, Hardam EE, Hertzke DM, Flatland B, Rohrbach BW, Moore RR. Feline gastrointestinal eosinophilic sclerosing fibroplasia. Vet Pathol. 2009;46(1):63-70. doi:10.1354/vp.46-1-63'
const LINTON_FGESF =
  'Linton M, Nimmo JS, Norris JM, et al. Feline gastrointestinal eosinophilic sclerosing fibroplasia: 13 cases and review of an emerging clinical entity. J Feline Med Surg. 2015;17(5):392-404. doi:10.1177/1098612x14568170'

// Alimentary lymphoma. Kiselow is the outcome series behind the ">2 years"
// figure; Sabattini and Daniaux are the two ways of separating low-grade
// lymphoma from IBD when histology alone will not.
const KISELOW_LOWGRADE =
  'Kiselow MA, Rassnick KM, McDonough SP, et al. Outcome of cats with low-grade lymphocytic lymphoma: 41 cases (1995-2005). J Am Vet Med Assoc. 2008;232(3):405-410. doi:10.2460/javma.232.3.405'
const SABATTINI_IBD_LSA =
  'Sabattini S, Bottero E, Turba ME, Vicchi F, Bo S, Bettini G. Differentiating feline inflammatory bowel disease from alimentary lymphoma in duodenal endoscopic biopsies. J Small Anim Pract. 2016;57(8):396-401. doi:10.1111/jsap.12494'
const DANIAUX_MUSCULARIS =
  'Daniaux LA, Laurenson MP, Marks SL, et al. Ultrasonographic thickening of the muscularis propria in feline small intestinal small cell T-cell lymphoma and inflammatory bowel disease. J Feline Med Surg. 2014;16(2):89-98. doi:10.1177/1098612x13498596'
const RUSSELL_LOWGRADE_FREQ =
  'Russell KJ, Beatty JA, Dhand N, et al. Feline low-grade alimentary lymphoma: how common is it? J Feline Med Surg. 2012;14(12):910-912. doi:10.1177/1098612x12454861'

// Canine hyperadrenocorticism. Behrend is the ACVIM diagnostic consensus and is
// keyed on the AUTHOR, not "ACVIM 2013" — keeping every ACVIM statement on one
// year-keyed map was becoming the thing most likely to mis-route a marker.
const BEHREND_HAC_DIAGNOSIS =
  'Behrend EN, Kooistra HS, Nelson R, Reusch CE, Scott-Moncrieff JC. Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM consensus statement (small animal). J Vet Intern Med. 2013;27(6):1292-1304. doi:10.1111/jvim.12192'
const ARENAS_TRILOSTANE_BID =
  'Arenas C, Melián C, Pérez-Alenza MD. Evaluation of 2 trilostane protocols for the treatment of canine pituitary-dependent hyperadrenocorticism: twice daily versus once daily. J Vet Intern Med. 2013;27(6):1478-1485. doi:10.1111/jvim.12207'
const ARENAS_ADH_SURVIVAL =
  'Arenas C, Melián C, Pérez-Alenza MD. Long-term survival of dogs with adrenal-dependent hyperadrenocorticism: a comparison between mitotane and twice daily trilostane treatment. J Vet Intern Med. 2014;28(2):473-480. doi:10.1111/jvim.12303'
// No Europe PMC record — it predates that index's JVIM coverage, so this is
// the second entry in this file (after Daley 1993) verified against Crossref
// alone. The DOI is registered and resolves; Wiley returns 403 to a bare
// content-negotiation request, which is a publisher block, not a bad DOI.
const BARKER_TRILOSTANE_SURVIVAL =
  'Barker E, Campbell S, Tebb A, et al. A comparison of the survival times of dogs treated with mitotane or trilostane for pituitary-dependent hyperadrenocorticism. J Vet Intern Med. 2005;19(6):810-815. doi:10.1111/j.1939-1676.2005.tb02769.x'
const NAGATA_PDH_SURVIVAL =
  'Nagata N, Kojima K, Yuki M. Comparison of survival times for dogs with pituitary-dependent hyperadrenocorticism in a primary-care hospital: treated with trilostane versus untreated. J Vet Intern Med. 2017;31(1):22-28. doi:10.1111/jvim.14617'

// Diabetes insipidus.
const HARB_CDI =
  'Harb MF, Nelson RW, Feldman EC, Scott-Moncrieff JC, Griffey SM. Central diabetes insipidus in dogs: 20 cases (1986-1995). J Am Vet Med Assoc. 1996;209(11):1884-1888. doi:10.2460/javma.1996.209.11.1884'
const MADDENS_PYOMETRA =
  'Maddens B, Daminet S, Smets P, Meyer E. Escherichia coli pyometra induces transient glomerular and tubular dysfunction in dogs. J Vet Intern Med. 2010;24(6):1263-1270. doi:10.1111/j.1939-1676.2010.0603.x'

// ── PubMed pass: strengthening the pages Crossref discovery left thin ────────
// Found through the PubMed connector (2026-09-22), which is what should have
// been used from the start — Crossref's bibliographic search only finds papers
// you already suspect exist, and PubMed's abstracts are what caught the
// Bellenger misreading below. Verified against PubMed AND Crossref.
// Where they disagree on the year, both agreed here after checking: Teshima is
// 2011 (PubMed's 2010 is the online date), Beaumier 2022, Tanaka 2022.

// FGESF. Černá is the 60-cat series — by far the largest, and it revises the
// prognosis and the surgery-versus-medical question the page had settled.
const CERNA_GESF =
  'Černá P, Lopez-Jimenez C, Fukushima K, et al. Clinicopathological findings, treatment, and outcome in 60 cats with gastrointestinal eosinophilic sclerosing fibroplasia. J Vet Intern Med. 2024;38(2):1005-1012. doi:10.1111/jvim.16992'
const THIEME_RETROPERITONEAL =
  'Thieme ME, Olsen AM, Woolcock AD, Miller MA, Simons MC. Diagnosis and management of a case of retroperitoneal eosinophilic sclerosing fibroplasia in a cat. JFMS Open Rep. 2019;5(2):2055116919867178. doi:10.1177/2055116919867178'
const DUCLOS_INTRATHORACIC =
  'Duclos AA, Wolfe A, Mooney CT. Intrathoracic eosinophilic sclerosing fibroplasia with intralesional bacteria in a cat. JFMS Open Rep. 2023;9(2):20551169231199447. doi:10.1177/20551169231199447'
const PORRAS_TGFB1 =
  'Porras N, Rebollada-Merino A, Rodríguez-Franco F, Calvo-Ibbitson A, Rodríguez-Bertos A. Feline gastrointestinal eosinophilic sclerosing fibroplasia — extracellular matrix proteins and TGF-β1 immunoexpression. Vet Sci. 2022;9(6):291. doi:10.3390/vetsci9060291'

// Eosinophilic gastrointestinal disease.
const SATTASATHUCHANA_EOSINOPHILIC =
  'Sattasathuchana P, Steiner JM. Canine eosinophilic gastrointestinal disorders. Anim Health Res Rev. 2014;15(1):76-86. doi:10.1017/s1466252314000012'
const BEAUMIER_HES_CARDIAC =
  'Beaumier A, Batista Linhares M, Rush JE, Piedra-Mora C. Hypereosinophilic syndrome with cardiac infiltration and congestive heart failure in a cat. J Vet Cardiol. 2022;41:11-17. doi:10.1016/j.jvc.2021.12.009'

// Pyloric lesions.
const TANAKA_PYLORIC_CT =
  'Tanaka T, Wada Y, Noguchi S, Nishida H, Akiyoshi H. Contrast-enhanced CT features of pyloric lesions in 17 dogs: case series. Vet Radiol Ultrasound. 2022;64(2):262-270. doi:10.1111/vru.13193'

// Diabetes insipidus — the two pages Crossref discovery could barely serve.
const TESHIMA_POSTOP_CDI =
  'Teshima T, Hara Y, Taoda T, Teramoto A, Tagawa M. Central diabetes insipidus after transsphenoidal surgery in dogs with Cushing’s disease. J Vet Med Sci. 2011;73(1):33-39. doi:10.1292/jvms.10-0129'
const CROTON_TRAUMA_CDI =
  'Croton C, Purcell S, Schoep A, Haworth M. Successful treatment of transient central diabetes insipidus following traumatic brain injury in a dog. Case Rep Vet Med. 2019;2019:3563675. doi:10.1155/2019/3563675'
const BELLIS_CPA_CDI =
  'Bellis T, Daly M, Davidson B. Central diabetes insipidus following cardiopulmonary arrest in a dog. J Vet Emerg Crit Care. 2015;25(6):745-750. doi:10.1111/vec.12398'
const EVENHUIS_PITUITARY_CYST =
  'Evenhuis J, Epstein SE, Della-Maggiore A, Reagan KL. Congenital pituitary cyst resulting in adipsic central diabetes insipidus and secondary hypernatremia in a cat. JFMS Open Rep. 2021;7(1):2055116921990294. doi:10.1177/2055116921990294'
const PAULIN_FELINE_PTHP =
  'Paulin MV, Gleasure S, Snead EC. Multiple pituitary hormone deficiencies in a kitten: hyposomatotropism, hypothyroidism, central diabetes insipidus and hypogonadism. Can Vet J. 2023;64(3):245-251'
const ETISH_LEPTO_NDI =
  'Etish JL, Chapman PS, Klag AR. Acquired nephrogenic diabetes insipidus in a dog with leptospirosis. Ir Vet J. 2014;67(1):7. doi:10.1186/2046-0481-67-7'
const KU_RTA_NDI =
  'Ku D, Lee D, Yun T, et al. Transient distal renal tubular acidosis with nephrogenic diabetes insipidus after general anaesthesia in a dog. Vet Med Sci. 2023;9(4):1483-1487. doi:10.1002/vms3.1165'

// Pythiosis — listed in the FGESF differential, and the modern review revises
// the "uniformly fatal" reputation it still carries in older sources.
const CRIDGE_PYTHIOSIS =
  'Cridge H. Pythiosis in dogs. Vet Clin North Am Small Anim Pract. 2025;55(2):225-236. doi:10.1016/j.cvsm.2024.11.008'

// Molecular mechanism of congenital NDI. NOTE: this is a HUMAN AQP2 variant
// (G215S, described in a boy) characterised in MDCK canine kidney CELLS — not
// a canine disease study. It supports the mechanism only, which is why the page
// says so inline. It was briefly miscredited to Ku's case report; see
// references/CITATIONS.md.
const LI_AQP2 =
  'Li Q, Lu B, Yang J, et al. Molecular characterization of an aquaporin-2 mutation causing nephrogenic diabetes insipidus. Front Endocrinol (Lausanne). 2021;12:665145. doi:10.3389/fendo.2021.665145'

// ── Primary literature behind disease pages 21-25 ────────────────────────────
// PubMed-first discovery, verified against Crossref (and Europe PMC where
// Crossref does not hold the record — Estrin's bracketed DOI is one of those).
// Two print-year corrections: Wiinberg's TEG/bleeding paper is 2009 not 2007,
// and the scoring-system paper is 2010 not 2009. PubMed carries the online
// dates; Crossref and Europe PMC agree on the print years used here.

// Megaoesophagus. Mignan is the classification the "focal MG" language rests
// on; Grobman reframes aspiration as one of a family of aerodigestive problems.
const MIGNAN_MG_CLASSIFICATION =
  'Mignan T, Targett M, Lowrie M. Classification of myasthenia gravis and congenital myasthenic syndromes in dogs and cats. J Vet Intern Med. 2020;34(5):1707-1717. doi:10.1111/jvim.15855'
const GROBMAN_AERODIGESTIVE =
  'Grobman M. Aerodigestive disease in dogs. Vet Clin North Am Small Anim Pract. 2021;51(1):17-32. doi:10.1016/j.cvsm.2020.09.003'

// DIC. Three Wiinberg papers — year-keyed. Note the years: 2008 is the TEG
// cohort, 2009 the TEG-versus-bleeding case-control, 2010 the scoring system.
const WIINBERG_TEG_DIC =
  'Wiinberg B, Jensen AL, Johansson PI, Rozanski E, Tranholm M, Kristensen AT. Thromboelastographic evaluation of hemostatic function in dogs with disseminated intravascular coagulation. J Vet Intern Med. 2008;22(2):357-365. doi:10.1111/j.1939-1676.2008.0058.x'
const WIINBERG_TEG_BLEEDING =
  'Wiinberg B, Jensen AL, Rozanski E, et al. Tissue factor activated thromboelastography correlates to clinical signs of bleeding in dogs. Vet J. 2009;179(1):121-129. doi:10.1016/j.tvjl.2007.08.022'
const WIINBERG_DIC_SCORE =
  'Wiinberg B, Jensen AL, Johansson PI, et al. Development of a model based scoring system for diagnosis of canine disseminated intravascular coagulation with independent assessment of sensitivity and specificity. Vet J. 2010;185(3):292-298. doi:10.1016/j.tvjl.2009.06.003'
// Crossref does not hold this DOI (the bracketed 1892/… form predates their
// coverage of that JVIM series); PubMed and Europe PMC both do and agree.
const ESTRIN_FELINE_DIC =
  'Estrin MA, Wehausen CE, Jessen CR, Lee JA. Disseminated intravascular coagulation in cats. J Vet Intern Med. 2006;20(6):1334-1339. doi:10.1892/0891-6640(2006)20[1334:dicic]2.0.co;2'

// Coagulation factor deficiencies. Callan is the causative F7 mutation; Clark
// is the negative study that limits how far the genetic test should be pushed.
const CALLAN_F7_MUTATION =
  'Callan MB, Aljamali MN, Margaritis P, et al. A novel missense mutation responsible for factor VII deficiency in research Beagle colonies. J Thromb Haemost. 2006;4(12):2616-2622. doi:10.1111/j.1538-7836.2006.02203.x'
const CLARK_F7_AUTOPSY =
  'Clark JA, Hooser SB, Dreger DL, Burcham GN, Ekenstedt KJ. Investigation of a common canine factor VII deficiency variant in dogs with unexplained bleeding on autopsy. J Vet Diagn Invest. 2022;34(5):806-812. doi:10.1177/10406387221118581'
const GOOKIN_FELINE_FX =
  'Gookin JL, Brooks MB, Catalfamo JL, Bunch SE, Muñana KR. Factor X deficiency in a cat. J Am Vet Med Assoc. 1997;211(5):576-579. doi:10.2460/javma.1997.211.05.576'

// ── Primary literature behind disease pages 26-30 ────────────────────────────
// PubMed-first, verified against Crossref. Garden is keyed on the AUTHOR, not
// "ACVIM 2019" — that year is already taken in ACVIM_BY_YEAR by Swann's IMHA
// TREATMENT statement, and the page cites both. Same decision as Marks and
// Behrend.

// IMHA. The diagnosis half of the ACVIM pair; the treatment half (Swann 2019)
// was already in this file and the page already cited it.
const GARDEN_IMHA_DX =
  'Garden OA, Kidd L, Mexas AM, et al. ACVIM consensus statement on the diagnosis of immune-mediated hemolytic anemia in dogs and cats. J Vet Intern Med. 2019;33(2):313-334. doi:10.1111/jvim.15441'

// Haemophilia A. Aslanian is the 39-dog series the prognosis field quotes —
// note it is a SURVEY of respondents, not a clinical cohort, which the page
// now states. The gene-therapy papers are colony model dogs, not patients.
const ASLANIAN_HEMA =
  'Aslanian ME, Sharp CR, Rozanski EA, de Laforcade AM, Rishniw M, Brooks MB. Clinical outcome after diagnosis of hemophilia A in dogs. J Am Vet Med Assoc. 2014;245(6):677-683. doi:10.2460/javma.245.6.677'
const NGUYEN_AAV_CLONAL =
  'Nguyen GN, Everett JK, Kafle S, et al. A long-term study of AAV gene therapy in dogs with hemophilia A identifies clonal expansions of transduced liver cells. Nat Biotechnol. 2020;39(1):47-55. doi:10.1038/s41587-020-0741-7'
const BATTY_AAV_INTEGRATION =
  'Batty P, Fong S, Franco M, et al. Vector integration and fate in the hemophilia dog liver multiple years after AAV-FVIII gene transfer. Blood. 2024;143(23):2373-2385. doi:10.1182/blood.2023022589'
const FOWLER_HEMA_SPINAL =
  'Fowler KM, Bolton TA, Rossmeisl JH, et al. Clinical, diagnostic, and imaging findings in three juvenile dogs with paraspinal hyperesthesia or myelopathy as a consequence of hemophilia A: a case report. Front Vet Sci. 2022;9:871029. doi:10.3389/fvets.2022.871029'

// Immune-mediated neutropenia. Devine is the only cohort of any size; Scott is
// the differential that can be indistinguishable on marrow.
const DEVINE_IMN =
  'Devine L, Armstrong PJ, Whittemore JC, et al. Presumed primary immune-mediated neutropenia in 35 dogs: a retrospective study. J Small Anim Pract. 2017;58(6):307-313. doi:10.1111/jsap.12636'
const SCOTT_PHENOBARB_MARROW =
  'Scott TN, Bailin HG, Jutkowitz LA, Scott MA, Lucidi CA. Bone marrow, blood, and clinical findings in dogs treated with phenobarbital. Vet Clin Pathol. 2021;50(1):122-131. doi:10.1111/vcp.13013'

// Leptospirosis. The 2023 ACVIM update is the current statement and supersedes
// the 2010 one the page was written against. Knöpfler is the largest single
// cohort (99 dogs) and is where the organ-involvement and outcome frequencies
// come from; Buser is 41 dogs, so its CRP finding is hedged on the page.
const SYKES_LEPTO =
  'Sykes JE, Francey T, Schuller S, Stoddard RA, Cowgill LD, Moore GE. Updated ACVIM consensus statement on leptospirosis in dogs. J Vet Intern Med. 2023;37(6):1966-1982. doi:10.1111/jvim.16903'
const KNOPFLER_LEPTO =
  'Knöpfler S, Mayer-Scholl A, Luge E, et al. Evaluation of clinical, laboratory, imaging findings and outcome in 99 dogs with leptospirosis. J Small Anim Pract. 2017;58(10):582-588. doi:10.1111/jsap.12718'
const BUSER_LEPTO_CRP =
  'Buser FC, Schweighauser A, Im Hof-Gut M, et al. Evaluation of C-reactive protein and its kinetics as a prognostic indicator in canine leptospirosis. J Small Anim Pract. 2019;60(8):477-485. doi:10.1111/jsap.13004'

// Ehrlichiosis. Chochlios is the large one (850 dogs) and carries the
// seroprevalence and clinicopathological-association data. Christodoulou is 35
// CME vs 29 ITP, so the discriminators it reports are hedged on the page.
// Mind the print year: PubMed dates it 2022 (epub), the volume is 2023.
// Mylonakis 2011 is 56 dogs and is the source of the pancytopenia odds ratio.
const CHOCHLIOS_ECANIS =
  'Chochlios TA, Angelidou E, Kritsepi-Konstantinou M, Koutinas CK, Mylonakis ME. Seroprevalence and risk factors associated with Ehrlichia canis in a hospital canine population. Vet Clin Pathol. 2019;48(2):305-309. doi:10.1111/vcp.12736'
const CHRISTODOULOU_CME_ITP =
  'Christodoulou V, Meletis E, Kostoulas P, et al. Clinical and clinicopathologic discriminators between canine acute monocytic ehrlichiosis and primary immune thrombocytopenia. Top Companion Anim Med. 2023;52:100750. doi:10.1016/j.tcam.2022.100750'
const MYLONAKIS_CME_APP =
  'Mylonakis ME, Ceron JJ, Leontides L, et al. Serum acute phase proteins as clinical phase indicators and outcome predictors in naturally occurring canine monocytic ehrlichiosis. J Vet Intern Med. 2011;25(4):811-817. doi:10.1111/j.1939-1676.2011.0728.x'

// FIP antivirals. Taylor is the big one (307 cats) and the only series on
// LEGALLY sourced, known-composition product, which is why it carries the
// survival and relapse figures the page quotes. Pedersen is the original
// field trial (31 cats) and is where the 12-week floor comes from. Lv is 46
// cats on the GS + GC376 combination; Dickinson is FOUR cats and is the only
// evidence for the higher neurological dose, so the page hedges it.
const TAYLOR_FIP_307 =
  'Taylor SS, Coggins S, Barker EN, et al. Retrospective study and outcome of 307 cats with feline infectious peritonitis treated with legally sourced veterinary compounded preparations of remdesivir and GS-441524 (2020-2022). J Feline Med Surg. 2023;25(9):1098612X231194460. doi:10.1177/1098612X231194460'
const PEDERSEN_GS441524 =
  'Pedersen NC, Perron M, Bannasch M, et al. Efficacy and safety of the nucleoside analog GS-441524 for treatment of cats with naturally occurring feline infectious peritonitis. J Feline Med Surg. 2019;21(4):271-281. doi:10.1177/1098612X19825701'
const LV_GS_GC376 =
  'Lv J, Bai Y, Wang Y, Yang L, Jin Y, Dong J. Effect of GS-441524 in combination with the 3C-like protease inhibitor GC376 on the treatment of naturally transmitted feline infectious peritonitis. Front Vet Sci. 2022;9:1002488. doi:10.3389/fvets.2022.1002488'
const DICKINSON_NEURO_FIP =
  'Dickinson PJ, Bannasch M, Thomasy SM, et al. Antiviral treatment using the adenosine nucleoside analogue GS-441524 in cats with clinically diagnosed neurological feline infectious peritonitis. J Vet Intern Med. 2020;34(4):1587-1593. doi:10.1111/jvim.15780'

// Rocky Mountain spotted fever. Levin is the only description of the natural
// tick-bite course in dogs from exposure to recovery, but it is a small
// experimental group, so its prognostic markers are hedged. Foley is a review,
// cited only for the epidemiology it aggregates.
const LEVIN_RMSF_COURSE =
  'Levin ML, Killmaster LF, Zemtsova GE, Ritter JM, Langham G. Clinical presentation, convalescence, and relapse of Rocky Mountain spotted fever in dogs experimentally infected via tick bite. PLoS One. 2014;9(12):e115105. doi:10.1371/journal.pone.0115105'
const FOLEY_RMSF_URBAN =
  'Foley J, Lopez-Perez AM, Alvarez-Hernandez G, et al. A wolf at the door: the ecology, epidemiology, and emergence of community- and urban-level Rocky Mountain spotted fever in the Americas. Am J Vet Res. 2025;86(3). doi:10.2460/ajvr.24.11.0368'

// Babesiosis. Goddard is 72 dogs with PCR-confirmed B. rossi and co-infections
// excluded, which is why its coagulation findings can be read as babesiosis
// rather than tick-borne disease in general. Mind the print year: PubMed dates
// it 2012, the volume is 2013.
const GODDARD_BABESIA_DIC =
  'Goddard A, Wiinberg B, Schoeman JP, Kristensen AT, Kjelgaard-Hansen M. Mortality in virulent canine babesiosis is associated with a consumptive coagulopathy. Vet J. 2013;196(2):213-217. doi:10.1016/j.tvjl.2012.09.009'

// Anticoagulant rodenticide. Agostini is 74 animals across two hospitals and
// is the only comparison of IV mixed-micelle vitamin K1 against plasma; the
// page hedges it on that sample size.
const AGOSTINI_MMP_VITK =
  'Agostini G, Mooney ET, Wilkie ELW, White JD. Comparison of intravenous mixed micelle phytomenadione (vitamin K1) and traditional therapies for the treatment of anticoagulant rodenticide toxicosis in dogs and cats: a retrospective study. Aust Vet J. 2025;103(12):906-915. doi:10.1111/avj.70004'

// Canine leishmaniosis. The 2011 LeishVet guideline is still the operative
// staging system and is cited as such in 2026 papers, so it stays despite its
// age. Miro 2024 is the modern randomised trial (97 dogs, two years of
// follow-up); Kasabalis is 40 dogs and the authors themselves call it
// underpowered, so the page hedges it.
const SOLANO_GALLEGO_LEISHVET =
  'Solano-Gallego L, Miro G, Koutinas A, et al. LeishVet guidelines for the practical management of canine leishmaniosis. Parasit Vectors. 2011;4:86. doi:10.1186/1756-3305-4-86'
const MIRO_LEISH_SUPPLEMENT =
  'Miro G, Segarra S, Ceron JJ, et al. New immunomodulatory treatment protocol for canine leishmaniosis reduces parasitemia and proteinuria. PLoS Negl Trop Dis. 2024;18(12):e0012712. doi:10.1371/journal.pntd.0012712'
// Three seronegative dogs with amastigotes demonstrated in tissue. Cited as an
// existence claim only — it establishes that the presentation happens, not how
// often, and the page says nothing about frequency.
const VILLANUEVA_SAZ_SERONEG =
  'Villanueva-Saz S, Marteles D, Ortunez A, et al. Absence of specific humoral response in three dogs with clinical leishmaniosis. Acta Vet Scand. 2025;67(1):31. doi:10.1186/s13028-025-00814-9'
const KASABALIS_AMINOSIDINE =
  'Kasabalis D, Chatzis MK, Apostolidis K, et al. A randomized, blinded, controlled clinical trial comparing the efficacy of aminosidine (paromomycin)-allopurinol combination with the efficacy of meglumine antimoniate-allopurinol combination for the treatment of canine leishmaniosis due to Leishmania infantum. Exp Parasitol. 2020;214:107903. doi:10.1016/j.exppara.2020.107903'

// von Willebrand disease. Both papers are about ACQUIRED loss of vWF activity,
// which is the trap the page needed covering: a low result in a sick dog is
// not automatically the inherited disease. McBride is 10 dogs, so it is hedged.
const MCBRIDE_AKI_VWF =
  'McBride D, Jepson RE, Cortellini S, Chan DL. Primary hemostatic function in dogs with acute kidney injury. J Vet Intern Med. 2019;33(5):2029-2036. doi:10.1111/jvim.15588'
const KRUGER_AV_VWF =
  'Kruger BT, Hamm Vinga C, Wennemuth J. Brain MRI findings and thoracic CT findings in a dog with hemiparesis and acutely diminished von Willebrand factor levels through Angiostrongylus vasorum infection. Vet Radiol Ultrasound. 2025;66(1):e13462. doi:10.1111/vru.13462'

// Angiostrongylus. Thomsen is 180 dogs and is where the bleeding frequency and
// the survival gap come from. Canonne is the BAL qPCR series; mind the print
// year, PubMed dates it 2015 and the volume is 2016.
const THOMSEN_AV_BLEEDING =
  'Thomsen AS, Petersen MP, Willesen JL, et al. Clinical bleeding diathesis, laboratory haemostatic aberrations and survival in dogs infected with Angiostrongylus vasorum: 180 cases (2005-2019). J Small Anim Pract. 2024;65(4):234-242. doi:10.1111/jsap.13701'
const CANONNE_AV_BAL =
  'Canonne AM, Roels E, Caron Y, et al. Detection of Angiostrongylus vasorum by quantitative PCR in bronchoalveolar lavage fluid in Belgian dogs. J Small Anim Pract. 2016;57(3):130-134. doi:10.1111/jsap.12419'

// Zinc. Henke is 55 dogs across six teaching hospitals and is the only series
// big enough to carry frequencies; its AKI figure is the finding that changes
// the workup, and the authors say so explicitly.
const HENKE_ZINC =
  'Henke CS, Beal MW, Walton RAL, et al. Retrospective evaluation of the clinical course and outcome of zinc toxicosis due to metallic foreign bodies in dogs (2005-2021): 55 cases. J Vet Emerg Crit Care. 2023;33(6):676-684. doi:10.1111/vec.13330'

// Allium. A single fatal case, cited for one thing only: the dog died on a
// dose well BELOW the published threshold, which is the argument for not
// reassuring an owner on the strength of a gram-per-kilo calculation.
const BIASIBETTI_GARLIC =
  'Biasibetti E, Maza V, Tagliati V, et al. Fatal garlic (Allium sativum) toxicosis in a dog: gross and histopathological findings in a rare case of systemic hemolytic injury. Animals (Basel). 2026;16(11):1712. doi:10.3390/ani16111712'

// Cholecalciferol. Both are single cases. They are the only published
// follow-up of 25(OH)D after the acute phase, and the page hedges them as
// such rather than turning one dog into a monitoring protocol.
const GERHARD_VITD_25OHD =
  'Gerhard C, Jaffey JA. Persistent increase in serum 25-hydroxyvitamin D concentration in a dog following cholecalciferol intoxication. Front Vet Sci. 2020;6:472. doi:10.3389/fvets.2019.00472'
const PERRY_VITD_LIPID =
  'Perry BH, McMichael M, Rick M, Jewell E. Reduction of serum 25-hydroxyvitamin D concentrations with intravenous lipid emulsion in a dog. Can Vet J. 2016;57(12):1284-1286.'

// Cardiology. The MMVD consensus is keyed on KEENE, not on "ACVIM 2019" — that
// year is already taken by Swann's IMHA treatment statement, and a second
// claim on it would silently print the wrong paper.
const KEENE_MMVD =
  'Keene BW, Atkins CE, Bonagura JD, et al. ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med. 2019;33(3):1127-1140. doi:10.1111/jvim.15488'
const BOSWOOD_EPIC =
  'Boswood A, Haggstrom J, Gordon SG, et al. Effect of pimobendan in dogs with preclinical myxomatous mitral valve disease and cardiomegaly: the EPIC study — a randomized clinical trial. J Vet Intern Med. 2016;30(6):1765-1779. doi:10.1111/jvim.14586'
const SUMMERFIELD_PROTECT =
  'Summerfield NJ, Boswood A, O\'Grady MR, et al. Efficacy of pimobendan in the prevention of congestive heart failure or sudden death in Doberman Pinschers with preclinical dilated cardiomyopathy (the PROTECT study). J Vet Intern Med. 2012;26(6):1337-1349. doi:10.1111/j.1939-1676.2012.01026.x'

// Pericardial effusion. Both are small surgical series (18 and 16 dogs) and
// both are hedged, but they carry the same message from two directions: an
// echocardiographically "idiopathic" effusion is not reliably benign.
const CARVAJAL_PERICARDIOSCOPY =
  'Carvajal JL, Case JB, Mayhew PD, et al. Outcome in dogs with presumptive idiopathic pericardial effusion after thoracoscopic pericardectomy and pericardioscopy. Vet Surg. 2019;48(S1):O105-O111. doi:10.1111/vsu.13129'
const MICHELOTTI_TSP =
  'Michelotti KP, Youk A, Payne JT, Anderson J. Outcomes of dogs with recurrent idiopathic pericardial effusion treated with a 3-port right-sided thoracoscopic subtotal pericardiectomy. Vet Surg. 2019;48(6):1032-1041. doi:10.1111/vsu.13223'

// Respiratory. Kogan is 88 dogs and carries the aspiration-pneumonia survival
// rate plus the two negatives worth knowing: radiographic severity and length
// of stay did NOT predict outcome. Riffe is 58 dogs and is the stewardship
// argument for starting on ampicillin-sulbactam alone.
const KOGAN_ASPIRATION =
  'Kogan DA, Johnson LR, Sturges BK, Jandrey KE, Pollard RE. Etiology and clinical outcome in dogs with aspiration pneumonia: 88 cases (2004-2006). J Am Vet Med Assoc. 2008;233(11):1748-1755. doi:10.2460/javma.233.11.1748'
const RIFFE_AP_ANTIBIOTICS =
  'Riffe CI, Heinz JA, Patterson CA, Cook AK, Yankin I. There is no significant difference in the treatment of aspiration pneumonia in dogs with ampicillin-sulbactam versus ampicillin-sulbactam and enrofloxacin. J Am Vet Med Assoc. 2025;263(8):1-9. doi:10.2460/javma.24.10.0673'

// Tracheal collapse. Weisse is 75 dogs and 119 stents, the largest endoluminal
// stenting series, and is the source of both the survival figure and the
// complication rate an owner has to be warned about. De Lorenzi is 12 dogs.
const WEISSE_TRACHEAL_STENT =
  'Weisse C, Berent A, Violette N, McDougall R, Lamb K. Short-, intermediate-, and long-term results for endoluminal stent placement in dogs with tracheal collapse. J Am Vet Med Assoc. 2019;254(3):380-392. doi:10.2460/javma.254.3.380'
const DE_LORENZI_SILICONE_STENT =
  'De Lorenzi D, Maggi G, Bertoncello D, Porciello F, Marchesi MC. Dumon silicone stents can improve respiratory function in dogs with grade IV tracheal collapse: 12 cases (2019-2023). J Am Vet Med Assoc. 2024;262(7):1-7. doi:10.2460/javma.23.12.0722'

// Feline lower airway disease. Gareis is 24 cats; its finding that radiographic
// and clinical improvement do NOT correlate is the reason the page tells you to
// track both rather than letting one stand in for the other.
const GAREIS_FLAD_RADIOGRAPHS =
  'Gareis H, Horner-Schmid L, Zablotski Y, Palic J, Hecht S, Schulz B. Correlation of clinical and radiographic variables in cats with lower airway disease. J Vet Intern Med. 2023;37(6):2443-2452. doi:10.1111/jvim.16874'

// Neurology. MOORE is now year-keyed — the metyrapone case report (2000) and
// this IVDE evidence review (2020) are unrelated works by different Moores,
// and a bare prefix match would have printed a feline adrenal case report on
// the disc page. Low is 162 deep-pain-negative dogs, the largest such cohort.
const MOORE_IVDE_REVIEW =
  'Moore SA, Tipold A, Olby NJ, Stein V, Granger N. Current approaches to the management of acute thoracolumbar disc extrusion in dogs. Front Vet Sci. 2020;7:610. doi:10.3389/fvets.2020.00610'
const LOW_IVDE_ML =
  'Low D, Stables S, Kondrotaite L, Garland B, Rutherford S. Machine-learning-based prediction of functional recovery in deep-pain-negative dogs after decompressive thoracolumbar hemilaminectomy for acute intervertebral disc extrusion. Vet Surg. 2025;54(4):665-674. doi:10.1111/vsu.14250'

// SRMA. Paterson is 124 dogs and carries the relapse rate. Gunther is 12 dogs
// on cytarabine for relapse — a small series in which EVERY dog had an adverse
// event, so the page states both halves of that.
const PATERSON_SRMA =
  'Paterson R, Brady S. Signalment, clinical characteristics and outcomes of an Australian population of dogs with steroid responsive meningitis-arteritis (SRMA) — 124 cases (2013-2023). Aust Vet J. 2024;102(12):630-632. doi:10.1111/avj.13371'
const GUNTHER_SRMA_CYTARABINE =
  'Gunther C, Steffen F, Alder DS, Beatrice L, Geigy C, Beckmann K. Evaluating the use of cytosine arabinoside for treatment for recurrent canine steroid-responsive meningitis-arteritis. Vet Rec. 2020;187(1):e7. doi:10.1136/vr.105683'

// Nasal disease. Stanton is FIVE dogs and is cited for one negative finding
// only — no dog developed neurological signs — which is not the same as
// showing the procedure to be safe. The page says so.
const STANTON_CRIBRIFORM =
  'Stanton JA, Miller ML, Johnson P, Davignon DL, Barr SC. Treatment of canine sinonasal aspergillosis with clotrimazole infusion in patients with cribriform plate lysis. J Small Anim Pract. 2018;59(7):411-414. doi:10.1111/jsap.12835'

// Nasal neoplasia. Sones is 86 intranasal sarcomas and separates the radiation
// protocols; Iseri is 123 dogs and is the argument for treating early rather
// than at the stage most dogs are presented.
const SONES_NASAL_SARCOMA =
  'Sones E, Smith A, Schleis S, et al. Survival times for canine intranasal sarcomas treated with radiation therapy: 86 cases (1996-2011). Vet Radiol Ultrasound. 2013;54(2):194-201. doi:10.1111/vru.12006'
const ISERI_MEGAVOLTAGE =
  'Iseri T, Horikirizono H, Abe M, et al. Outcomes of megavoltage radiotherapy for canine intranasal tumors and its relationship to clinical stages. Open Vet J. 2022;12(3):383-390. doi:10.5455/OVJ.2022.v12.i3.12'

// Acute haemorrhagic diarrhoea. Unterer is the randomised trial the page's
// "fluids, not antibiotics" line rests on; note the authors' own hedge, which
// the page mirrors — "in SOME dogs... may not change the outcome".
const UNTERER_AHDS_ANTIBIOTICS =
  'Unterer S, Strohmeyer K, Kruse BD, Sauter-Louis C, Hartmann K. Treatment of aseptic dogs with hemorrhagic gastroenteritis with amoxicillin/clavulanic acid: a prospective blinded study. J Vet Intern Med. 2011;25(5):973-979. doi:10.1111/j.1939-1676.2011.00765.x'
const ZIESE_AHDS_PROBIOTIC =
  'Ziese AL, Suchodolski JS, Hartmann K, et al. Effect of probiotic treatment on the clinical course, intestinal microbiome, and toxigenic Clostridium perfringens in dogs with acute hemorrhagic diarrhea. PLoS One. 2018;13(9):e0204691. doi:10.1371/journal.pone.0204691'

// GI foreign body. Schwartz is 333 dogs and is the only series large enough to
// give dehiscence RISK FACTORS rather than a bare rate — a linear foreign body
// and multiple incisions in one surgery, both of which the page can act on.
const SCHWARTZ_GI_STAPLES =
  'Schwartz Z, Coolman BR. Disposable skin staplers for closure of linear gastrointestinal incisions in dogs. Vet Surg. 2018;47(2):285-292. doi:10.1111/vsu.12759'
const COLA_LAER =
  'Cola V, Ferrari C, Del Magno S, et al. Laparotomy-assisted endoscopic removal of gastrointestinal foreign bodies: evaluation of this technique and postoperative recovery in dogs and cats. Vet Surg. 2024;53(7):1266-1276. doi:10.1111/vsu.14126'

// Airway disease and pneumothorax. Chan is a placebo-controlled cross-over
// trial of inhaled fluticasone in 36 dogs, so it covers BOTH the chronic
// bronchitis and tracheal collapse pages. Dickson is 110 dogs and is where
// the recurrence timing comes from; mind the confusable 'Dickinson' already
// in this file for neurological FIP.
const CHAN_INHALED_FLUTICASONE =
  'Chan JC, Johnson LR. Prospective evaluation of the efficacy of inhaled steroids administered via the AeroDawg spacing chamber in management of dogs with chronic cough. J Vet Intern Med. 2023;37(2):660-669. doi:10.1111/jvim.16673'
const DICKSON_PNEUMOTHORAX =
  'Dickson R, Scharf VF, Michael AE, et al. Surgical management and outcome of dogs with primary spontaneous pneumothorax: 110 cases (2009-2019). J Am Vet Med Assoc. 2021;258(11):1229-1235. doi:10.2460/javma.258.11.1229'
const SERIOT_MVFB_PNEUMOTHORAX =
  'Seriot P, Dunie-Merigot A, Trehiou CB, et al. Treatment and outcome of spontaneous pneumothorax secondary to suspected migrating vegetal foreign body in 37 dogs. Vet Rec. 2021;189(4):e22. doi:10.1002/vetr.22'

// The ISCAID respiratory antimicrobial guidelines cover pneumonia, CIRD,
// bronchitis, rhinitis and pyothorax, so this one reference serves several
// pages. It is a Working Group practice guideline in JVIM, not a textbook.
const LAPPIN_ISCAID_RESP =
  'Lappin MR, Blondeau J, Boothe D, et al. Antimicrobial use guidelines for treatment of respiratory tract disease in dogs and cats: Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases. J Vet Intern Med. 2017;31(2):279-294. doi:10.1111/jvim.14627'

// Chylothorax. A systematic review rather than a cohort — its value is the
// honest verdict on how thin the evidence is, which the page now states.
// Mind the print year: PubMed dates it 2019, the volume is 2020.
const REEVES_CHYLOTHORAX_SR =
  'Reeves LA, Anderson KM, Luther JK, Torres BT. Treatment of idiopathic chylothorax in dogs and cats: a systematic review. Vet Surg. 2020;49(1):70-79. doi:10.1111/vsu.13322'

// Thoracic surgery. Rossanese is 80 dogs, the largest lung-lobe-torsion series
// and the source of the pug over-representation. Bleakley compares the two
// lobectomy approaches in 134 dogs. Carroll is 49 thoracoscopic mediastinal
// resections; MacIver is 18 and is hedged, but it is where the poor outcome
// with concurrent myasthenia and megaoesophagus was first quantified.
const ROSSANESE_LLT =
  'Rossanese M, Wustefeld-Janssens B, Price C, et al. Long-term survival after treatment of idiopathic lung lobe torsion in 80 cases. Vet Surg. 2020;49(4):659-667. doi:10.1111/vsu.13406'
const BLEAKLEY_LOBECTOMY_APPROACH =
  'Bleakley S, Phipps K, Petrovsky B, Monnet E. Median sternotomy versus intercostal thoracotomy for lung lobectomy: a comparison of short-term outcome in 134 dogs. Vet Surg. 2018;47(1):104-113. doi:10.1111/vsu.12741'
const CARROLL_THORACOSCOPIC_MEDIASTINAL =
  'Carroll KA, Mayhew PD, Culp WTN, et al. Thoracoscopic removal of cranial mediastinal masses in dogs is associated with a low conversion rate, excellent survival to discharge, and good long-term outcome. J Am Vet Med Assoc. 2024;262(10):1-8. doi:10.2460/javma.23.12.0679'
const MACIVER_VATS_THYMOMA =
  'MacIver MA, Case JB, Monnet EL, et al. Video-assisted extirpation of cranial mediastinal masses in dogs: 18 cases (2009-2014). J Am Vet Med Assoc. 2017;250(11):1283-1290. doi:10.2460/javma.250.11.1283'

// Bronchiectasis and bronchomalacia. JOHNSON is now year-keyed: the same
// author (LR Johnson) has the 2023 pyothorax series already in this file and
// this 2016 bronchiectasis one. A bare prefix match would print pyothorax on
// the bronchiectasis page.
const JOHNSON_BRONCHIECTASIS =
  'Johnson LR, Johnson EG, Vernau W, Kass PH, Byrne BA. Bronchoscopy, imaging, and concurrent diseases in dogs with bronchiectasis: (2003-2014). J Vet Intern Med. 2016;30(1):247-254. doi:10.1111/jvim.13809'
const GAMRACY_BRONCHOMALACIA =
  'Gamracy J, Wiggen K, Vientos-Plotts A, Reinero C. Clinicopathologic features, comorbid diseases, and prevalence of pulmonary hypertension in dogs with bronchomalacia. J Vet Intern Med. 2022;36(2):417-428. doi:10.1111/jvim.16381'

// Ophthalmology. Kubo is 104 Shiba eyes — breed-specific, so the page says so
// — but it is the cleanest demonstration that time to presentation and having
// a shunt both decide whether the eye keeps sight. Graham compares the two
// surgical routes across 83 eyes. Edelmann is 182 phaco eyes and Boss is the
// pug-specific complication profile.
const KUBO_SHIBA_PACG =
  'Kubo A, Ito Y. Comparison of visual outcomes between medical treatment alone and Ahmed glaucoma valve implantation in Shiba dogs with primary angle closure glaucoma. Vet Ophthalmol. 2024;27(5):452-460. doi:10.1111/vop.13189'
const GRAHAM_TSCP_VS_GDD =
  'Graham KL, Hall EJS, Caraguel C, White A, Billson FA, Billson FM. Comparison of diode laser trans-scleral cyclophotocoagulation versus implantation of a 350-mm2 Baerveldt glaucoma drainage device for the treatment of glaucoma in dogs (a retrospective study: 2010-2016). Vet Ophthalmol. 2018;21(5):487-497. doi:10.1111/vop.12536'
const EDELMANN_PHACO_CDE =
  'Edelmann ML, Mohammed HO, Ledbetter EC. Retrospective evaluation of phacoemulsification and aspiration in 182 eyes: visual outcomes and CDE-predictive value. Vet Ophthalmol. 2022;25(5):316-325. doi:10.1111/vop.12978'
const BOSS_PUG_PHACO =
  'Boss C, La Croix N, Moore PA, et al. Preliminary report of postoperative complications of phacoemulsification in Pugs: a multicenter retrospective study of 32 cases. Vet Ophthalmol. 2020;23(3):442-449. doi:10.1111/vop.12739'

// SCCED. Hung is 341 eyes and is the outcome figure; the two randomised
// adjunct trials point in opposite directions and are both cited, because the
// negative one is the more useful of the pair. EDELMANN is year-keyed — the
// same author has the 2022 phacoemulsification paper above.
const HUNG_SCCED_DBD =
  'Hung JH, Leidreiter K, White JS, Bernays ME. Clinical characteristics and treatment of spontaneous chronic corneal epithelial defects (SCCEDs) with diamond burr debridement. Vet Ophthalmol. 2020;23(4):764-769. doi:10.1111/vop.12772'
const EDELMANN_SCCED_PRP =
  'Edelmann ML, Mohammed HO, Wakshlag JJ, Ledbetter EC. Clinical trial of adjunctive autologous platelet-rich plasma treatment following diamond-burr debridement for spontaneous chronic corneal epithelial defects in dogs. J Am Vet Med Assoc. 2018;253(8):1012-1021. doi:10.2460/javma.253.8.1012'
const DEES_SCCED_ADJUNCT =
  'Dees DD, Keys DA. Use of autologous serum or Vizoovet to improve healing rates of spontaneous chronic corneal epithelial defects after diamond burr debridement in dogs. Vet Ophthalmol. 2022;25(1):6-11. doi:10.1111/vop.12891'

// Ulcerative keratitis microbiology. Goss is 148 ulcers and Verdenius 163
// samples; between them they give the isolate list, the resistance pattern
// and the reason to swab BEFORE starting topicals.
const GOSS_ULCERATIVE_KERATITIS =
  'Goss R, Adams VJ, Heinrich C, et al. Progressive ulcerative keratitis in dogs in the United Kingdom: microbial isolates, antimicrobial sensitivity, and resistance patterns. Vet Ophthalmol. 2024;27(4):330-346. doi:10.1111/vop.13160'
const VERDENIUS_STROMAL_ULCER =
  'Verdenius CY, Broens EM, Slenter IJM, Djajadiningrat-Laanen SC. Corneal stromal ulcerations in a referral population of dogs and cats in the Netherlands (2012-2019): bacterial isolates and antibiotic resistance. Vet Ophthalmol. 2024;27(1):7-16. doi:10.1111/vop.13080'

/** A numbered reference-list entry: `n` is its AMA number on this page. */
export interface RefEntry { n: number; id: string; text: string }

/** Every recognised source marker. A parenthetical counts as a citation only
 *  when its content STARTS with one of these, so ordinary parentheticals
 *  ("(as for most cases)") are never swallowed. Single source of truth — both
 *  CITE and hasCitation are built from it, so they cannot drift apart. */
const SOURCE_NAMES = [
  'Ettinger', 'Gelatt', 'AHS', 'AAHA', 'CDC', 'FECAVA', 'Minnesota', 'ACVIM', 'Berent',
  'Shelton', 'Forgash', 'Cridge', 'Dewey', 'Quintavalla',
  'Cook', 'Boland', 'Valentin', 'Keith', 'Neiger', 'Miceli', 'Daley', 'Moore',
  'Duesberg', 'Meij', 'Benchekroun', 'Hardy', 'Yayoshi', 'Muschner', 'Lien',
  'Chirayath', 'LeVine', 'Charalambous', 'Marsilio', 'VETgirl', 'Lemmons', 'Gupta',
  'Romaneck',
  'Farias',
  'Gould',
  // Added 2026-09-21 with the first five disease pages' primary literature.
  // NOTE two prefix traps in this list, both handled by ordering in
  // parseSources, not here: 'Anderson' must be tested before 'Anders', and
  // 'Longeri' before 'Lo', or the shorter name swallows the longer one's
  // marker. The alternation below is only used to RECOGNISE a parenthetical
  // as a citation, so its own order is immaterial.
  'Meurs', 'Longeri', 'Payne', 'Steele', 'Rush', 'Fox', 'Hogan', 'Lo',
  'Mary', 'Granström', 'Boeykens', 'Brainard',
  'Stanley', 'Tobias', 'Miller', 'Wilson', 'MacPhail', 'Jeffery',
  'Bookbinder', 'Milovancev', 'Ogden',
  // Disease pages 6-10. Two MORE prefix pairs to keep apart, both handled by
  // ordering in parseSources: 'Anders' before 'Anderson' is already noted, and
  // now 'Hall' vs 'Hardy', 'Gold' vs 'Gould', 'Perley' vs 'Pereira' — none of
  // those is a prefix of the other, so order is free for them; the ones that
  // MATTER are still only Anderson/Anders and Longeri/Lo.
  'Venn', 'Sarpong', 'Perley', 'Chalifoux', 'Pereira', 'Hoel', 'Mohr',
  'de Mari', 'Acciacca',
  'Hall', 'Nabity', 'Scobie', 'Syme', 'King', 'Chakrabarti', 'Elliott',
  'Quimby', 'Spencer', 'Mortier',
  'Gold', 'Bovens', 'Lennon', 'Vincent',
  'Kook', 'Haworth', 'Trivedi', 'Harris', 'Mansfield',
  'Larose', 'Applewhite', 'Oakes', 'Rallis',
  // Disease pages 11-15. NEW PREFIX TRAP: 'Allen' is a prefix of
  // 'Allenspach', so parseSources must test Allenspach FIRST or the
  // chronic-enteropathy markers resolve to a GDV gastropexy review.
  'de Papp', 'Zacher', 'Green', 'Ward', 'Glickman', 'O\u2019Neill', 'Allen',
  'Allenspach', 'McCord',
  'Marks', 'Shaevitz', 'Bazelle',
  'Phillips', 'Reeve', 'Mayhew', 'Watkins',
  'Bellenger',
  // Disease pages 16-20.
  'Craig', 'Linton', 'Kiselow', 'Sabattini', 'Daniaux', 'Russell',
  'Behrend', 'Arenas', 'Barker', 'Nagata', 'Harb', 'Maddens',
  // PubMed pass. 'Bellis' and 'Bellenger' share four characters but neither is
  // a prefix of the other, so order is free for that pair.
  'Černá', 'Thieme', 'Duclos', 'Porras', 'Sattasathuchana', 'Beaumier',
  'Tanaka', 'Teshima', 'Croton', 'Bellis', 'Evenhuis', 'Paulin', 'Etish', 'Ku',
  // 'Li' is a prefix of Lien, Linton, Lemmons... — the \b in its branch is
  // what keeps them apart, so it is safe in any order, but it is by far the
  // most fragile marker in this file. Pinned by test.
  'Li',
  // Disease pages 21-25.
  'Mignan', 'Grobman', 'Wiinberg', 'Estrin', 'Callan', 'Clark', 'Gookin',
  // Disease pages 26-30. 'Scott' and 'Scobie' share three characters; neither
  // is a prefix of the other, but both are asserted in the tests.
  'Garden', 'Aslanian', 'Nguyen', 'Batty', 'Fowler', 'Devine', 'Scott',
  'Anderson', 'Veir', 'Greci', 'Janssens', 'Wainberg', 'Hoppers', 'Anders',
  'Bohin',
  'Barrs', 'Demetriou', 'Stillion', 'Rooney', 'Boothe', 'Eiras', 'Johnson',
  'Ramsey', 'Shmalberg', 'Rudinsky', 'Langlois',
  // Leptospirosis and ehrlichiosis. 'Chochlios' and 'Christodoulou' share a
  // two-letter head and neither is a prefix of the other; both are asserted
  // in the tests so a future rename cannot quietly collapse them.
  'Sykes', 'Knöpfler', 'Buser', 'Chochlios', 'Christodoulou', 'Mylonakis',
  // FIP. 'Taylor' sits beside the existing 'Tanaka' and 'Trivedi'; 'Lv' is
  // two letters and is a prefix of nothing here, but it is pinned in the
  // tests for the same reason 'Lo' is.
  'Taylor', 'Pedersen', 'Lv', 'Dickinson',
  // 'Levin' vs the existing 'LeVine': held apart only by the capital V, and
  // the resolver's /^Name/ match is case-sensitive. Both are pinned.
  'Levin', 'Foley', 'Goddard', 'Agostini',
  // Leishmaniosis, von Willebrand, Angiostrongylus. 'Miro' is four letters
  // and a prefix of nothing here; 'Canonne' sits beside 'Cook' and 'Cridge'.
  'Solano-Gallego', 'Miro', 'Villanueva-Saz', 'Kasabalis', 'McBride', 'Krüger', 'Thomsen', 'Canonne',
  // Toxicology. 'Perry' sits beside the existing 'Perley' — four shared
  // characters, neither a prefix of the other, so both are pinned.
  'Henke', 'Biasibetti', 'Gerhard', 'Perry',
  // Cardiology. 'Keene' sits beside the existing 'Keith'; 'Michelotti' beside
  // 'Miceli', 'Mignan' and the new 'Miro'. None is a prefix of another.
  'Keene', 'Boswood', 'Summerfield', 'Carvajal', 'Michelotti',
  // Respiratory. 'Weisse' sits beside 'Wainberg' and 'Ward'; 'Gareis' beside
  // 'Garden'; 'Riffe' is new. None is a prefix of another.
  'Kogan', 'Riffe', 'Weisse', 'De Lorenzi', 'Gareis',
  // 'Low' and the existing 'Lo': the Lo branch is written /^Lo\\b/, so the
  // word boundary already keeps them apart whatever the order here. Both are
  // pinned in the tests so that stays true if the branch is ever rewritten.
  'Low', 'Paterson', 'Günther',
  // Nasal. 'Stanton' sits beside the existing 'Stanley' — they share four
  // characters and neither is a prefix of the other. Both are pinned.
  'Stanton', 'Sones', 'Iseri',
  // GI. 'Cola' sits beside 'Cook'; 'Schwartz' beside 'Scott'/'Scobie'.
  'Unterer', 'Ziese', 'Schwartz', 'Cola',
  // 'Dickson' vs the existing 'Dickinson' — easily misread for each other,
  // though neither is a prefix of the other. Both are pinned in the tests.
  'Chan', 'Dickson', 'Sériot',
  // 'Lappin' beside 'Langlois'/'Larose'; 'Reeves' beside 'Reeve' — and that
  // one IS a prefix pair, so the branch order below matters. Reeves first.
  'Reeves', 'Lappin',
  // Thoracic surgery. 'MacIver' sits beside the existing 'MacPhail'.
  'Rossanese', 'Bleakley', 'Carroll', 'MacIver',
  'Gamracy',
  // Ophthalmology. 'Graham' sits beside 'Granström' and 'Greci'; 'Boss'
  // beside 'Boothe', 'Boland', 'Bohin', 'Boeykens' and 'Boswood'.
  'Kubo', 'Graham', 'Edelmann', 'Boss',
  'Hung', 'Dees',
  // 'Goss' sits beside 'Gould' and 'Gold'; 'Verdenius' beside 'Venn'.
  'Goss', 'Verdenius',
] as const
const SOURCE_ALT = SOURCE_NAMES.join('|')

/** "(ACVIM <year>)" → the statement that year identifies. Keyed by year because
 *  that is what the inline markers in db.ts carry. */
const ACVIM_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2016': { id: 'acvim-uroliths', text: ACVIM_UROLITHS },
  '2018': { id: 'acvim-hypertension', text: ACVIM_HYPERTENSION },
  '2019': { id: 'acvim-imha-tx', text: ACVIM_IMHA_TX },
  '2020': { id: 'acvim-feline-cm', text: ACVIM_FELINE_CM },
}

/** Two authors cited more than once across these pages, disambiguated on the
 *  year exactly as ACVIM is above: Meurs found a different MYBPC3 mutation in
 *  each breed, and Payne has three separate feline-HCM cohorts on DIS-HCM
 *  (prevalence 2015, prognosis 2013, population/breed survival 2010). An
 *  unmapped year yields no source, so the marker prints verbatim rather than
 *  being attributed to the wrong paper. */
const MEURS_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2005': { id: 'meurs-maine-coon', text: MEURS_MAINE_COON },
  '2007': { id: 'meurs-ragdoll', text: MEURS_RAGDOLL },
}
/** Cridge and Rudinsky each now cover two unrelated works — Cridge has the
 *  2021 neostigmine paper on the myasthenia page and the 2018 cPL assay
 *  comparison on the pancreatitis page; Rudinsky has the 2022 acute-colitis
 *  trial and the 2018 canine CKD survival study. Both are keyed on the year
 *  for exactly the reason ACVIM is: a bare prefix match would silently print
 *  the wrong paper on a page nobody thought to write a test for. */
const CRIDGE_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2018': { id: 'cridge-cpl-assays', text: CRIDGE_CPL_ASSAYS },
  '2021': { id: 'cridge-neostigmine', text: CRIDGE_NEOSTIGMINE },
  '2025': { id: 'cridge-pythiosis', text: CRIDGE_PYTHIOSIS },
}
const RUDINSKY_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2018': { id: 'rudinsky-ckd', text: RUDINSKY_CKD },
  '2022': { id: 'rudinsky-colitis', text: RUDINSKY_COLITIS },
}

/** Three more names covering two works each, keyed on the year for the same
 *  reason as ACVIM, Meurs, Payne, Cridge and Rudinsky. */
const GLICKMAN_BY_YEAR: Record<string, { id: string; text: string }> = {
  '1994': { id: 'glickman-risk-1994', text: GLICKMAN_RISK_1994 },
  '2000': { id: 'glickman-nondietary', text: GLICKMAN_NONDIETARY },
}
const MAYHEW_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2021': { id: 'mayhew-laparoscopic', text: MAYHEW_LAPAROSCOPIC },
  '2022': { id: 'mayhew-boas-surgery', text: MAYHEW_BOAS_SURGERY },
}
const ALLENSPACH_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2007': { id: 'allenspach-risk', text: ALLENSPACH_RISK },
  '2016': { id: 'allenspach-longterm', text: ALLENSPACH_LONGTERM },
}

/** Arenas published the trilostane-protocol trial and the adrenal-dependent
 *  survival study a year apart; keyed on the year like the rest. */
/** Three Wiinberg DIC papers. Mind the print years — PubMed carries the
 *  online dates, which are a year or two earlier for two of them. */
const WIINBERG_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2008': { id: 'wiinberg-teg-dic', text: WIINBERG_TEG_DIC },
  '2009': { id: 'wiinberg-teg-bleeding', text: WIINBERG_TEG_BLEEDING },
  '2010': { id: 'wiinberg-dic-score', text: WIINBERG_DIC_SCORE },
}

/** Two unrelated Moores: the 2000 feline metyrapone case report and the 2020
 *  thoracolumbar IVDE evidence review. Keyed on the year for the same reason
 *  as ACVIM — a bare prefix match printed the adrenal case on the disc page. */
const MOORE_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2000': { id: 'moore-metyrapone', text: MOORE_METYRAPONE },
  '2020': { id: 'moore-ivde-review', text: MOORE_IVDE_REVIEW },
}

/** Two LR Johnson papers a decade apart — the pyothorax series and the
 *  bronchiectasis one. Keyed on the year for the same reason as Moore. */
const JOHNSON_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2016': { id: 'johnson-bronchiectasis', text: JOHNSON_BRONCHIECTASIS },
  '2023': { id: 'johnson-pyothorax', text: JOHNSON_PYOTHORAX },
}

/** Edelmann has the SCCED platelet-rich-plasma trial and the
 *  phacoemulsification series. Keyed on the year, as Moore and Johnson are. */
const EDELMANN_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2018': { id: 'edelmann-scced-prp', text: EDELMANN_SCCED_PRP },
  '2022': { id: 'edelmann-phaco-cde', text: EDELMANN_PHACO_CDE },
}

const ARENAS_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2013': { id: 'arenas-trilostane-bid', text: ARENAS_TRILOSTANE_BID },
  '2014': { id: 'arenas-adh-survival', text: ARENAS_ADH_SURVIVAL },
}

const PAYNE_BY_YEAR: Record<string, { id: string; text: string }> = {
  '2010': { id: 'payne-population', text: PAYNE_POPULATION },
  '2013': { id: 'payne-prognostic', text: PAYNE_PROGNOSTIC },
  '2015': { id: 'payne-catscan', text: PAYNE_CATSCAN },
}

/** Matches an inline source-citation parenthetical whose content starts with a
 *  known source: "(Ettinger …)" / "(Gelatt …)". A leading space is consumed so
 *  the marker sits flush against the preceding punctuation. Non-source
 *  parentheticals (e.g. "(as for most cases)") are left untouched. */
const CITE = new RegExp(String.raw`\s?\(((?:${SOURCE_ALT})[^)]*)\)`, 'g')

/** Parse a citation's inner text into one source per cited chapter/work. A single
 *  parenthetical may carry several sources separated by ";" (e.g.
 *  "(Ettinger Ch 237; AHS 2024)"). An Ettinger citation with chapters yields one
 *  entry per chapter (per-chapter numbering); "Ettinger 9e" with no chapter,
 *  Gelatt, or AHS yields a single book/guideline-level entry. */
export function parseSources(inner: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = []
  for (const raw of inner.split(';')) {
    const part = raw.trim()
    // Gelatt is numbered per CHAPTER, exactly as Ettinger is below. Without this
    // every ophthalmology page collapsed to one book-level entry, so a citation
    // that had been traced to a specific chapter lost that chapter on the way to
    // the screen. Table/figure citations ("Gelatt 6th edn Table 17.3") carry no
    // chapter and still resolve to the book.
    const byChapter = (
      prefix: string,
      book: string,
    ): { id: string; text: string }[] => {
      // Every "Ch n" in the part, not just the first: a single parenthetical may
      // name several chapters ("Ch 15, Ch 28"), and each is its own AMA entry.
      const nums = [...part.matchAll(/Ch(?:apter|\.)?\s*(\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?)*)/g)]
        .flatMap(m => m[1].match(/\d+(?:\.\d+)?/g) ?? [])
      return nums.length
        ? nums.map(n => ({ id: `${prefix}-ch${n}`, text: `${book}: chap ${n}.` }))
        : [{ id: prefix, text: `${book}.` }]
    }
    // Gelatt, Lemmons and Gupta are all numbered per CHAPTER, exactly as Ettinger
    // is below. Without that, every ophthalmology page collapsed to one book-level
    // entry and a citation traced to a specific chapter lost it on the way to the
    // screen. Table/figure citations ("Gelatt 6th edn Table 17.3") carry no
    // chapter and still resolve to the book.
    if (/^Gelatt/.test(part)) { out.push(...byChapter('gelatt', GELATT_BOOK)); continue }
    if (/^Lemmons/.test(part)) { out.push(...byChapter('lemmons', LEMMONS_BOOK)); continue }
    if (/^Gupta/.test(part)) { out.push(...byChapter('gupta', GUPTA_BOOK)); continue }
    if (/^AHS/.test(part)) { out.push({ id: 'ahs', text: AHS_GUIDELINES }); continue }
    // Year-keyed for the same reason as ACVIM below: "(AAHA/AAFP)" on the
    // hyperthyroidism page and "(AAHA first-choice)" in the protocols are prose
    // qualifiers, not citations, but a bare /^AAHA/ matched them — attaching the
    // 2023 endocrinopathies reference AND swallowing the qualifier's own text,
    // since a matched parenthetical is replaced by its superscript. Requiring a
    // year leaves those printing verbatim.
    if (/^AAHA/.test(part)) {
      if (/\b2023\b/.test(part)) out.push({ id: 'aaha-endocrine', text: AAHA_ENDOCRINE })
      continue
    }
    if (/^CDC/.test(part)) { out.push({ id: 'cdc-bartonella', text: CDC_BARTONELLA }); continue }
    if (/^FECAVA/.test(part)) { out.push({ id: 'fecava-hypoadreno', text: FECAVA_HYPOADRENO }); continue }
    if (/^Minnesota/.test(part)) { out.push({ id: 'mn-urolith', text: MN_UROLITH }); continue }
    // Journal sources are keyed by author/org marker. ACVIM publishes many
    // consensus statements, so "(ACVIM <year>)" routes on the year. Until
    // 2026-09-13 this matched a bare /^ACVIM/ and sent every one of them to the
    // uroliths statement — which printed a urolith reference on the CKD,
    // systemic-hypertension and feline-cardiomyopathy pages, plausible enough
    // to survive review. The original comment here had predicted exactly this
    // ("if a second ACVIM consensus is ever cited, disambiguate on the year");
    // the markers were added and the disambiguation never was.
    //
    // A year with no entry yields no source, so <Cite> falls back to printing
    // the marker verbatim — visibly wrong on the page rather than quietly
    // attributed to the wrong paper. Add the year here when citing a new one.
    // The four statements keyed on first author (LeVine x2, Charalambous,
    // Marsilio) stay below; either form is fine for a new one.
    if (/^ACVIM/.test(part)) {
      const year = part.match(/\b(?:19|20)\d{2}\b/)?.[0]
      const hit = ACVIM_BY_YEAR[year ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Berent/.test(part)) { out.push({ id: 'berent-sub', text: BERENT_SUB }); continue }
    if (/^Shelton/.test(part)) { out.push({ id: 'shelton-remission', text: SHELTON_REMISSION }); continue }
    if (/^Forgash/.test(part)) { out.push({ id: 'forgash-mg', text: FORGASH_MG }); continue }
    if (/^Cridge/.test(part)) {
      const hit = CRIDGE_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Dewey/.test(part)) { out.push({ id: 'dewey-mmf', text: DEWEY_MMF }); continue }
    if (/^Quintavalla/.test(part)) { out.push({ id: 'quintavalla-sildenafil', text: QUINTAVALLA_SILDENAFIL }); continue }
    if (/^Cook/.test(part)) { out.push({ id: 'cook-cushingoid', text: COOK_CUSHINGOID }); continue }
    if (/^Boland/.test(part)) { out.push({ id: 'boland-fhac', text: BOLAND_FHAC }); continue }
    if (/^Valentin/.test(part)) { out.push({ id: 'valentin-fhac', text: VALENTIN_FHAC }); continue }
    if (/^Keith/.test(part)) { out.push({ id: 'keith-trilostane', text: KEITH_TRILOSTANE }); continue }
    if (/^Neiger/.test(part)) { out.push({ id: 'neiger-trilostane', text: NEIGER_TRILOSTANE }); continue }
    if (/^Miceli/.test(part)) { out.push({ id: 'miceli-trilostane', text: MICELI_TRILOSTANE }); continue }
    if (/^Daley/.test(part)) { out.push({ id: 'daley-metyrapone', text: DALEY_METYRAPONE }); continue }
    if (/^Moore/.test(part)) {
      const hit = MOORE_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Duesberg/.test(part)) { out.push({ id: 'duesberg-adrenalectomy', text: DUESBERG_ADRENALECTOMY }); continue }
    if (/^Meij/.test(part)) { out.push({ id: 'meij-hypophysectomy', text: MEIJ_HYPOPHYSECTOMY }); continue }
    if (/^Benchekroun/.test(part)) { out.push({ id: 'benchekroun-acth', text: BENCHEKROUN_ACTH }); continue }
    if (/^Hardy/.test(part)) { out.push({ id: 'hardy-skin', text: HARDY_SKIN }); continue }
    if (/^Yayoshi/.test(part)) { out.push({ id: 'yayoshi-radiation', text: YAYOSHI_RADIATION }); continue }
    if (/^Muschner/.test(part)) { out.push({ id: 'muschner-remission', text: MUSCHNER_REMISSION }); continue }
    if (/^Lien/.test(part)) { out.push({ id: 'lien-iatrogenic', text: LIEN_IATROGENIC }); continue }
    if (/^VETgirl/.test(part)) { out.push({ id: 'vetgirl-tox', text: VETGIRL_TOX + '.' }); continue }
    if (/^LeVine/.test(part)) { out.push({ id: part.includes('treatment') ? 'acvim-itp-tx' : 'acvim-itp-dx', text: part.includes('treatment') ? ACVIM_ITP_TX : ACVIM_ITP_DX }); continue }
    if (/^Charalambous/.test(part)) { out.push({ id: 'acvim-se', text: ACVIM_SE }); continue }
    if (/^Marsilio/.test(part)) { out.push({ id: 'acvim-fce', text: ACVIM_FCE }); continue }
    if (/^Chirayath/.test(part)) { out.push({ id: 'chirayath-iatrogenic', text: CHIRAYATH_IATROGENIC }); continue }
    if (/^Romaneck/.test(part)) { out.push({ id: 'romaneck-ek', text: ROMANECK_EK }); continue }
    if (/^Farias/.test(part)) { out.push({ id: 'farias-pll', text: FARIAS_PLL }); continue }
    if (/^Gould/.test(part)) { out.push({ id: 'gould-pll', text: GOULD_PLL }); continue }
    // ── First five disease pages' primary literature (added 2026-09-21) ──
    // Year-keyed where one author name covers several works, per ACVIM above.
    if (/^Meurs/.test(part)) {
      const hit = MEURS_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    // Longeri MUST be tested before Lo, and Anderson before Anders — the
    // shorter name is a prefix of the longer one, so the wrong order sends
    // "(Longeri 2013)" to the rivaroxaban paper and "(Anderson 2000)" to the
    // BAER study. Both would print a plausible-looking wrong reference, which
    // is exactly how the bare /^ACVIM/ match survived review for so long.
    if (/^Longeri/.test(part)) { out.push({ id: 'longeri-mybpc3', text: LONGERI_MYBPC3 }); continue }
    if (/^Payne/.test(part)) {
      const hit = PAYNE_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Mary/.test(part)) { out.push({ id: 'mary-a31p', text: MARY_A31P }); continue }
    if (/^Granström/.test(part)) { out.push({ id: 'granstrom-a31p', text: GRANSTROM_A31P }); continue }
    if (/^Boeykens/.test(part)) { out.push({ id: 'boeykens-acmg', text: BOEYKENS_ACMG }); continue }
    if (/^Brainard/.test(part)) { out.push({ id: 'brainard-supercat', text: BRAINARD_SUPERCAT }); continue }
    if (/^Bookbinder/.test(part)) { out.push({ id: 'bookbinder-lp', text: BOOKBINDER_LP }); continue }
    if (/^Milovancev/.test(part)) { out.push({ id: 'milovancev-metoclopramide', text: MILOVANCEV_METOCLOPRAMIDE }); continue }
    if (/^Ogden/.test(part)) { out.push({ id: 'ogden-cisapride', text: OGDEN_CISAPRIDE }); continue }
    if (/^Steele/.test(part)) { out.push({ id: 'steele-igf1', text: STEELE_IGF1 }); continue }
    if (/^Rush/.test(part)) { out.push({ id: 'rush-hcm', text: RUSH_HCM }); continue }
    if (/^Fox/.test(part)) { out.push({ id: 'fox-reveal', text: FOX_REVEAL }); continue }
    if (/^Hogan/.test(part)) { out.push({ id: 'hogan-fat-cat', text: HOGAN_FAT_CAT }); continue }
    if (/^Lo\b/.test(part)) { out.push({ id: 'lo-dual-therapy', text: LO_DUAL_THERAPY }); continue }
    if (/^Stanley/.test(part)) { out.push({ id: 'stanley-golpp', text: STANLEY_GOLPP }); continue }
    if (/^Tobias/.test(part)) { out.push({ id: 'tobias-doxapram', text: TOBIAS_DOXAPRAM }); continue }
    if (/^Miller/.test(part)) { out.push({ id: 'miller-doxapram', text: MILLER_DOXAPRAM }); continue }
    if (/^Wilson/.test(part)) { out.push({ id: 'wilson-tieback-ap', text: WILSON_TIEBACK_AP }); continue }
    if (/^MacPhail/.test(part)) { out.push({ id: 'macphail-lp', text: MACPHAIL_LP }); continue }
    if (/^Jeffery/.test(part)) { out.push({ id: 'jeffery-lp', text: JEFFERY_LP }); continue }
    if (/^Anderson/.test(part)) { out.push({ id: 'anderson-polyps', text: ANDERSON_POLYPS + '.' }); continue }
    if (/^Anders\b/.test(part)) { out.push({ id: 'anders-vbo-baer', text: ANDERS_VBO_BAER }); continue }
    if (/^Veir/.test(part)) { out.push({ id: 'veir-polyps', text: VEIR_POLYPS }); continue }
    if (/^Greci/.test(part)) { out.push({ id: 'greci-ptt', text: GRECI_PTT }); continue }
    if (/^Janssens/.test(part)) { out.push({ id: 'janssens-tala', text: JANSSENS_TALA }); continue }
    if (/^Wainberg/.test(part)) { out.push({ id: 'wainberg-vbo', text: WAINBERG_VBO }); continue }
    if (/^Hoppers/.test(part)) { out.push({ id: 'hoppers-bilateral', text: HOPPERS_BILATERAL }); continue }
    if (/^Bohin/.test(part)) { out.push({ id: 'bohin-compartments', text: BOHIN_COMPARTMENTS }); continue }
    if (/^Barrs/.test(part)) { out.push({ id: 'barrs-pyothorax', text: BARRS_PYOTHORAX }); continue }
    if (/^Demetriou/.test(part)) { out.push({ id: 'demetriou-pyothorax', text: DEMETRIOU_PYOTHORAX }); continue }
    if (/^Stillion/.test(part)) { out.push({ id: 'stillion-pyothorax', text: STILLION_PYOTHORAX }); continue }
    if (/^Rooney/.test(part)) { out.push({ id: 'rooney-pyothorax', text: ROONEY_PYOTHORAX }); continue }
    if (/^Boothe/.test(part)) { out.push({ id: 'boothe-pyothorax', text: BOOTHE_PYOTHORAX }); continue }
    if (/^Eiras/.test(part)) { out.push({ id: 'eiras-diaz-ct', text: EIRAS_DIAZ_CT }); continue }
    if (/^Johnson/.test(part)) {
      const hit = JOHNSON_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Ramsey/.test(part)) { out.push({ id: 'ramsey-maropitant', text: RAMSEY_MAROPITANT }); continue }
    if (/^Shmalberg/.test(part)) { out.push({ id: 'shmalberg-metronidazole', text: SHMALBERG_METRONIDAZOLE }); continue }
    if (/^Rudinsky/.test(part)) {
      const hit = RUDINSKY_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Langlois/.test(part)) { out.push({ id: 'langlois-metronidazole', text: LANGLOIS_METRONIDAZOLE }); continue }
    if (/^Sykes/.test(part)) { out.push({ id: 'sykes-lepto', text: SYKES_LEPTO }); continue }
    if (/^Knöpfler/.test(part)) { out.push({ id: 'knopfler-lepto', text: KNOPFLER_LEPTO }); continue }
    if (/^Buser/.test(part)) { out.push({ id: 'buser-lepto-crp', text: BUSER_LEPTO_CRP }); continue }
    if (/^Chochlios/.test(part)) { out.push({ id: 'chochlios-ecanis', text: CHOCHLIOS_ECANIS }); continue }
    if (/^Christodoulou/.test(part)) { out.push({ id: 'christodoulou-cme-itp', text: CHRISTODOULOU_CME_ITP }); continue }
    if (/^Mylonakis/.test(part)) { out.push({ id: 'mylonakis-cme-app', text: MYLONAKIS_CME_APP }); continue }
    if (/^Taylor/.test(part)) { out.push({ id: 'taylor-fip-307', text: TAYLOR_FIP_307 }); continue }
    if (/^Pedersen/.test(part)) { out.push({ id: 'pedersen-gs441524', text: PEDERSEN_GS441524 }); continue }
    if (/^Lv/.test(part)) { out.push({ id: 'lv-gs-gc376', text: LV_GS_GC376 }); continue }
    if (/^Dickinson/.test(part)) { out.push({ id: 'dickinson-neuro-fip', text: DICKINSON_NEURO_FIP }); continue }
    if (/^Levin\b/.test(part)) { out.push({ id: 'levin-rmsf-course', text: LEVIN_RMSF_COURSE }); continue }
    if (/^Foley/.test(part)) { out.push({ id: 'foley-rmsf-urban', text: FOLEY_RMSF_URBAN }); continue }
    if (/^Goddard/.test(part)) { out.push({ id: 'goddard-babesia-dic', text: GODDARD_BABESIA_DIC }); continue }
    if (/^Agostini/.test(part)) { out.push({ id: 'agostini-mmp-vitk', text: AGOSTINI_MMP_VITK }); continue }
    if (/^Solano-Gallego/.test(part)) { out.push({ id: 'solano-gallego-leishvet', text: SOLANO_GALLEGO_LEISHVET }); continue }
    if (/^Miro/.test(part)) { out.push({ id: 'miro-leish-supplement', text: MIRO_LEISH_SUPPLEMENT }); continue }
    if (/^Villanueva-Saz/.test(part)) { out.push({ id: 'villanueva-saz-seroneg', text: VILLANUEVA_SAZ_SERONEG }); continue }
    if (/^Kasabalis/.test(part)) { out.push({ id: 'kasabalis-aminosidine', text: KASABALIS_AMINOSIDINE }); continue }
    if (/^McBride/.test(part)) { out.push({ id: 'mcbride-aki-vwf', text: MCBRIDE_AKI_VWF }); continue }
    if (/^Krüger/.test(part)) { out.push({ id: 'kruger-av-vwf', text: KRUGER_AV_VWF }); continue }
    if (/^Thomsen/.test(part)) { out.push({ id: 'thomsen-av-bleeding', text: THOMSEN_AV_BLEEDING }); continue }
    if (/^Canonne/.test(part)) { out.push({ id: 'canonne-av-bal', text: CANONNE_AV_BAL }); continue }
    if (/^Henke/.test(part)) { out.push({ id: 'henke-zinc', text: HENKE_ZINC }); continue }
    if (/^Biasibetti/.test(part)) { out.push({ id: 'biasibetti-garlic', text: BIASIBETTI_GARLIC }); continue }
    if (/^Gerhard/.test(part)) { out.push({ id: 'gerhard-vitd-25ohd', text: GERHARD_VITD_25OHD }); continue }
    if (/^Perry/.test(part)) { out.push({ id: 'perry-vitd-lipid', text: PERRY_VITD_LIPID }); continue }
    if (/^Keene/.test(part)) { out.push({ id: 'keene-mmvd', text: KEENE_MMVD }); continue }
    if (/^Boswood/.test(part)) { out.push({ id: 'boswood-epic', text: BOSWOOD_EPIC }); continue }
    if (/^Summerfield/.test(part)) { out.push({ id: 'summerfield-protect', text: SUMMERFIELD_PROTECT }); continue }
    if (/^Carvajal/.test(part)) { out.push({ id: 'carvajal-pericardioscopy', text: CARVAJAL_PERICARDIOSCOPY }); continue }
    if (/^Michelotti/.test(part)) { out.push({ id: 'michelotti-tsp', text: MICHELOTTI_TSP }); continue }
    if (/^Kogan/.test(part)) { out.push({ id: 'kogan-aspiration', text: KOGAN_ASPIRATION }); continue }
    if (/^Riffe/.test(part)) { out.push({ id: 'riffe-ap-antibiotics', text: RIFFE_AP_ANTIBIOTICS }); continue }
    if (/^Weisse/.test(part)) { out.push({ id: 'weisse-tracheal-stent', text: WEISSE_TRACHEAL_STENT }); continue }
    if (/^De Lorenzi/.test(part)) { out.push({ id: 'de-lorenzi-silicone-stent', text: DE_LORENZI_SILICONE_STENT }); continue }
    if (/^Gareis/.test(part)) { out.push({ id: 'gareis-flad-radiographs', text: GAREIS_FLAD_RADIOGRAPHS }); continue }
    if (/^Gamracy/.test(part)) { out.push({ id: 'gamracy-bronchomalacia', text: GAMRACY_BRONCHOMALACIA }); continue }
    if (/^Kubo/.test(part)) { out.push({ id: 'kubo-shiba-pacg', text: KUBO_SHIBA_PACG }); continue }
    if (/^Graham/.test(part)) { out.push({ id: 'graham-tscp-vs-gdd', text: GRAHAM_TSCP_VS_GDD }); continue }
    if (/^Edelmann/.test(part)) {
      const hit = EDELMANN_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Boss/.test(part)) { out.push({ id: 'boss-pug-phaco', text: BOSS_PUG_PHACO }); continue }
    if (/^Hung/.test(part)) { out.push({ id: 'hung-scced-dbd', text: HUNG_SCCED_DBD }); continue }
    if (/^Dees/.test(part)) { out.push({ id: 'dees-scced-adjunct', text: DEES_SCCED_ADJUNCT }); continue }
    if (/^Goss/.test(part)) { out.push({ id: 'goss-ulcerative-keratitis', text: GOSS_ULCERATIVE_KERATITIS }); continue }
    if (/^Verdenius/.test(part)) { out.push({ id: 'verdenius-stromal-ulcer', text: VERDENIUS_STROMAL_ULCER }); continue }
    if (/^Low/.test(part)) { out.push({ id: 'low-ivde-ml', text: LOW_IVDE_ML }); continue }
    if (/^Paterson/.test(part)) { out.push({ id: 'paterson-srma', text: PATERSON_SRMA }); continue }
    if (/^Günther/.test(part)) { out.push({ id: 'gunther-srma-cytarabine', text: GUNTHER_SRMA_CYTARABINE }); continue }
    if (/^Stanton/.test(part)) { out.push({ id: 'stanton-cribriform', text: STANTON_CRIBRIFORM }); continue }
    if (/^Sones/.test(part)) { out.push({ id: 'sones-nasal-sarcoma', text: SONES_NASAL_SARCOMA }); continue }
    if (/^Iseri/.test(part)) { out.push({ id: 'iseri-megavoltage', text: ISERI_MEGAVOLTAGE }); continue }
    if (/^Unterer/.test(part)) { out.push({ id: 'unterer-ahds-antibiotics', text: UNTERER_AHDS_ANTIBIOTICS }); continue }
    if (/^Ziese/.test(part)) { out.push({ id: 'ziese-ahds-probiotic', text: ZIESE_AHDS_PROBIOTIC }); continue }
    if (/^Schwartz/.test(part)) { out.push({ id: 'schwartz-gi-staples', text: SCHWARTZ_GI_STAPLES }); continue }
    if (/^Cola/.test(part)) { out.push({ id: 'cola-laer', text: COLA_LAER }); continue }
    if (/^Chan/.test(part)) { out.push({ id: 'chan-inhaled-fluticasone', text: CHAN_INHALED_FLUTICASONE }); continue }
    if (/^Dickson/.test(part)) { out.push({ id: 'dickson-pneumothorax', text: DICKSON_PNEUMOTHORAX }); continue }
    if (/^Sériot/.test(part)) { out.push({ id: 'seriot-mvfb-pneumothorax', text: SERIOT_MVFB_PNEUMOTHORAX }); continue }
    // 'Reeve' is a prefix of 'Reeves', so this branch MUST precede the Reeve
    // one below or the brachycephalic hiatal hernia paper wins the marker.
    if (/^Reeves/.test(part)) { out.push({ id: 'reeves-chylothorax-sr', text: REEVES_CHYLOTHORAX_SR }); continue }
    if (/^Lappin/.test(part)) { out.push({ id: 'lappin-iscaid-resp', text: LAPPIN_ISCAID_RESP }); continue }
    if (/^Rossanese/.test(part)) { out.push({ id: 'rossanese-llt', text: ROSSANESE_LLT }); continue }
    if (/^Bleakley/.test(part)) { out.push({ id: 'bleakley-lobectomy-approach', text: BLEAKLEY_LOBECTOMY_APPROACH }); continue }
    if (/^Carroll/.test(part)) { out.push({ id: 'carroll-thoracoscopic-mediastinal', text: CARROLL_THORACOSCOPIC_MEDIASTINAL }); continue }
    if (/^MacIver/.test(part)) { out.push({ id: 'maciver-vats-thymoma', text: MACIVER_VATS_THYMOMA }); continue }
    // ── Disease pages 6-10 ──
    if (/^Venn/.test(part)) { out.push({ id: 'venn-outpatient', text: VENN_OUTPATIENT }); continue }
    if (/^Sarpong/.test(part)) { out.push({ id: 'sarpong-outpatient', text: SARPONG_OUTPATIENT }); continue }
    if (/^Perley/.test(part)) { out.push({ id: 'perley-shelter', text: PERLEY_SHELTER }); continue }
    if (/^Chalifoux/.test(part)) { out.push({ id: 'chalifoux-prognostic', text: CHALIFOUX_PROGNOSTIC }); continue }
    if (/^Pereira/.test(part)) { out.push({ id: 'pereira-fmt', text: PEREIRA_FMT }); continue }
    if (/^Hoel/.test(part)) { out.push({ id: 'hoel-oral-fmt', text: HOEL_ORAL_FMT }); continue }
    if (/^Mohr/.test(part)) { out.push({ id: 'mohr-een', text: MOHR_EEN }); continue }
    if (/^de Mari/.test(part)) { out.push({ id: 'de-mari-interferon', text: DE_MARI_INTERFERON }); continue }
    if (/^Acciacca/.test(part)) { out.push({ id: 'acciacca-plasma', text: ACCIACCA_PLASMA }); continue }
    if (/^Hall/.test(part)) { out.push({ id: 'hall-sdma', text: HALL_SDMA }); continue }
    if (/^Nabity/.test(part)) { out.push({ id: 'nabity-sdma', text: NABITY_SDMA }); continue }
    if (/^Scobie/.test(part)) { out.push({ id: 'scobie-sdma-review', text: SCOBIE_SDMA_REVIEW }); continue }
    if (/^Syme/.test(part)) { out.push({ id: 'syme-proteinuria', text: SYME_PROTEINURIA }); continue }
    if (/^King/.test(part)) { out.push({ id: 'king-prognostic', text: KING_PROGNOSTIC }); continue }
    if (/^Chakrabarti/.test(part)) { out.push({ id: 'chakrabarti-progression', text: CHAKRABARTI_PROGRESSION }); continue }
    if (/^Elliott/.test(part)) { out.push({ id: 'elliott-renal-diet', text: ELLIOTT_RENAL_DIET }); continue }
    if (/^Quimby/.test(part)) { out.push({ id: 'quimby-mirtazapine', text: QUIMBY_MIRTAZAPINE }); continue }
    if (/^Spencer/.test(part)) { out.push({ id: 'spencer-omeprazole', text: SPENCER_OMEPRAZOLE }); continue }
    if (/^Mortier/.test(part)) { out.push({ id: 'mortier-proteinuria', text: MORTIER_PROTEINURIA }); continue }
    if (/^Gold/.test(part)) { out.push({ id: 'gold-basal-cortisol', text: GOLD_BASAL_CORTISOL }); continue }
    if (/^Bovens/.test(part)) { out.push({ id: 'bovens-basal-cortisol', text: BOVENS_BASAL_CORTISOL }); continue }
    if (/^Lennon/.test(part)) { out.push({ id: 'lennon-basal-cortisol', text: LENNON_BASAL_CORTISOL }); continue }
    if (/^Vincent/.test(part)) { out.push({ id: 'vincent-low-dose-docp', text: VINCENT_LOW_DOSE_DOCP }); continue }
    if (/^Kook/.test(part)) { out.push({ id: 'kook-dggr', text: KOOK_DGGR }); continue }
    if (/^Haworth/.test(part)) { out.push({ id: 'haworth-cpl', text: HAWORTH_CPL }); continue }
    if (/^Trivedi/.test(part)) { out.push({ id: 'trivedi-cpl', text: TRIVEDI_CPL }); continue }
    if (/^Harris/.test(part)) { out.push({ id: 'harris-een-pancreatitis', text: HARRIS_EEN_PANCREATITIS }); continue }
    if (/^Mansfield/.test(part)) { out.push({ id: 'mansfield-een', text: MANSFIELD_EEN }); continue }
    if (/^Larose/.test(part)) { out.push({ id: 'larose-intuss', text: LAROSE_INTUSS }); continue }
    if (/^Applewhite/.test(part)) { out.push({ id: 'applewhite-enteroplication', text: APPLEWHITE_ENTEROPLICATION }); continue }
    if (/^Oakes/.test(part)) { out.push({ id: 'oakes-enteroplication', text: OAKES_ENTEROPLICATION }); continue }
    if (/^Rallis/.test(part)) { out.push({ id: 'rallis-intuss', text: RALLIS_INTUSS }); continue }
    // ── Disease pages 11-15 ──
    if (/^de Papp/.test(part)) { out.push({ id: 'de-papp-lactate', text: DE_PAPP_LACTATE }); continue }
    if (/^Zacher/.test(part)) { out.push({ id: 'zacher-lactate', text: ZACHER_LACTATE }); continue }
    if (/^Green/.test(part)) { out.push({ id: 'green-lactate', text: GREEN_LACTATE }); continue }
    if (/^Ward/.test(part)) { out.push({ id: 'ward-gastropexy', text: WARD_GASTROPEXY }); continue }
    if (/^Glickman/.test(part)) {
      const hit = GLICKMAN_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^O\u2019Neill/.test(part)) { out.push({ id: 'oneill-gdv', text: ONEILL_GDV }); continue }
    // Allenspach BEFORE Allen — 'Allen' is a prefix of 'Allenspach', so the
    // reverse order sends "(Allenspach 2007)" to the gastropexy review.
    if (/^Allenspach/.test(part)) {
      const hit = ALLENSPACH_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Allen\b/.test(part)) { out.push({ id: 'allen-gastropexy', text: ALLEN_GASTROPEXY }); continue }
    if (/^McCord/.test(part)) { out.push({ id: 'mccord-gdv', text: MCCORD_GDV }); continue }
    if (/^Marks/.test(part)) { out.push({ id: 'marks-gi-protectants', text: MARKS_GI_PROTECTANTS }); continue }
    if (/^Shaevitz/.test(part)) { out.push({ id: 'shaevitz-piroxicam', text: SHAEVITZ_PIROXICAM }); continue }
    if (/^Bazelle/.test(part)) { out.push({ id: 'bazelle-cytoprotective', text: BAZELLE_CYTOPROTECTIVE }); continue }
    if (/^Phillips/.test(part)) { out.push({ id: 'phillips-feline-hh', text: PHILLIPS_FELINE_HH }); continue }
    if (/^Reeve/.test(part)) { out.push({ id: 'reeve-brachy-hh', text: REEVE_BRACHY_HH }); continue }
    if (/^Mayhew/.test(part)) {
      const hit = MAYHEW_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Watkins/.test(part)) { out.push({ id: 'watkins-hh-gastropexy', text: WATKINS_HH_GASTROPEXY }); continue }
    if (/^Bellenger/.test(part)) { out.push({ id: 'bellenger-pyloric', text: BELLENGER_PYLORIC }); continue }
    // ── Disease pages 16-20 ──
    if (/^Craig/.test(part)) { out.push({ id: 'craig-fgesf', text: CRAIG_FGESF }); continue }
    if (/^Linton/.test(part)) { out.push({ id: 'linton-fgesf', text: LINTON_FGESF }); continue }
    if (/^Kiselow/.test(part)) { out.push({ id: 'kiselow-lowgrade', text: KISELOW_LOWGRADE }); continue }
    if (/^Sabattini/.test(part)) { out.push({ id: 'sabattini-ibd-lsa', text: SABATTINI_IBD_LSA }); continue }
    if (/^Daniaux/.test(part)) { out.push({ id: 'daniaux-muscularis', text: DANIAUX_MUSCULARIS }); continue }
    if (/^Russell/.test(part)) { out.push({ id: 'russell-lowgrade-freq', text: RUSSELL_LOWGRADE_FREQ }); continue }
    if (/^Behrend/.test(part)) { out.push({ id: 'behrend-hac-diagnosis', text: BEHREND_HAC_DIAGNOSIS }); continue }
    if (/^Arenas/.test(part)) {
      const hit = ARENAS_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Barker/.test(part)) { out.push({ id: 'barker-trilostane-survival', text: BARKER_TRILOSTANE_SURVIVAL }); continue }
    if (/^Nagata/.test(part)) { out.push({ id: 'nagata-pdh-survival', text: NAGATA_PDH_SURVIVAL }); continue }
    if (/^Harb/.test(part)) { out.push({ id: 'harb-cdi', text: HARB_CDI }); continue }
    if (/^Maddens/.test(part)) { out.push({ id: 'maddens-pyometra', text: MADDENS_PYOMETRA }); continue }
    // ── PubMed pass ──
    if (/^Černá/.test(part)) { out.push({ id: 'cerna-gesf', text: CERNA_GESF }); continue }
    if (/^Thieme/.test(part)) { out.push({ id: 'thieme-retroperitoneal', text: THIEME_RETROPERITONEAL }); continue }
    if (/^Duclos/.test(part)) { out.push({ id: 'duclos-intrathoracic', text: DUCLOS_INTRATHORACIC }); continue }
    if (/^Porras/.test(part)) { out.push({ id: 'porras-tgfb1', text: PORRAS_TGFB1 }); continue }
    if (/^Sattasathuchana/.test(part)) { out.push({ id: 'sattasathuchana-eosinophilic', text: SATTASATHUCHANA_EOSINOPHILIC }); continue }
    if (/^Beaumier/.test(part)) { out.push({ id: 'beaumier-hes-cardiac', text: BEAUMIER_HES_CARDIAC }); continue }
    if (/^Tanaka/.test(part)) { out.push({ id: 'tanaka-pyloric-ct', text: TANAKA_PYLORIC_CT }); continue }
    if (/^Teshima/.test(part)) { out.push({ id: 'teshima-postop-cdi', text: TESHIMA_POSTOP_CDI }); continue }
    if (/^Croton/.test(part)) { out.push({ id: 'croton-trauma-cdi', text: CROTON_TRAUMA_CDI }); continue }
    if (/^Bellis/.test(part)) { out.push({ id: 'bellis-cpa-cdi', text: BELLIS_CPA_CDI }); continue }
    if (/^Evenhuis/.test(part)) { out.push({ id: 'evenhuis-pituitary-cyst', text: EVENHUIS_PITUITARY_CYST }); continue }
    if (/^Paulin/.test(part)) { out.push({ id: 'paulin-feline-pthp', text: PAULIN_FELINE_PTHP + '.' }); continue }
    if (/^Etish/.test(part)) { out.push({ id: 'etish-lepto-ndi', text: ETISH_LEPTO_NDI }); continue }
    if (/^Ku\b/.test(part)) { out.push({ id: 'ku-rta-ndi', text: KU_RTA_NDI }); continue }
    // Deliberately last among the L-names: \b stops 'Li' matching Lien,
    // Linton, Lemmons, LeVine, Longeri, Langlois, Larose or Lennon.
    if (/^Li\b/.test(part)) { out.push({ id: 'li-aqp2', text: LI_AQP2 }); continue }
    // ── Disease pages 21-25 ──
    if (/^Mignan/.test(part)) { out.push({ id: 'mignan-mg-classification', text: MIGNAN_MG_CLASSIFICATION }); continue }
    if (/^Grobman/.test(part)) { out.push({ id: 'grobman-aerodigestive', text: GROBMAN_AERODIGESTIVE }); continue }
    if (/^Wiinberg/.test(part)) {
      const hit = WIINBERG_BY_YEAR[part.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? '']
      if (hit) out.push(hit)
      continue
    }
    if (/^Estrin/.test(part)) { out.push({ id: 'estrin-feline-dic', text: ESTRIN_FELINE_DIC }); continue }
    if (/^Callan/.test(part)) { out.push({ id: 'callan-f7-mutation', text: CALLAN_F7_MUTATION }); continue }
    if (/^Clark/.test(part)) { out.push({ id: 'clark-f7-autopsy', text: CLARK_F7_AUTOPSY }); continue }
    if (/^Gookin/.test(part)) { out.push({ id: 'gookin-feline-fx', text: GOOKIN_FELINE_FX }); continue }
    // ── Disease pages 26-30 ──
    if (/^Garden/.test(part)) { out.push({ id: 'garden-imha-dx', text: GARDEN_IMHA_DX }); continue }
    if (/^Aslanian/.test(part)) { out.push({ id: 'aslanian-hema', text: ASLANIAN_HEMA }); continue }
    if (/^Nguyen/.test(part)) { out.push({ id: 'nguyen-aav-clonal', text: NGUYEN_AAV_CLONAL }); continue }
    if (/^Batty/.test(part)) { out.push({ id: 'batty-aav-integration', text: BATTY_AAV_INTEGRATION }); continue }
    if (/^Fowler/.test(part)) { out.push({ id: 'fowler-hema-spinal', text: FOWLER_HEMA_SPINAL }); continue }
    if (/^Devine/.test(part)) { out.push({ id: 'devine-imn', text: DEVINE_IMN }); continue }
    if (/^Scott/.test(part)) { out.push({ id: 'scott-phenobarb-marrow', text: SCOTT_PHENOBARB_MARROW }); continue }
    // Only an Ettinger part reaches the Ettinger fallback. This used to be a
    // bare `else`, so ANY unrecognised part became a book-level Ettinger
    // reference — which credited Ettinger with "Farias et al. 2010, Gould et al.
    // 2011" on the lens-luxation page (a compound marker whose second half names
    // two ophthalmology papers) and deleted those names behind the superscript.
    // A bare "Ch 12" is allowed through as a continuation of an Ettinger marker.
    // Anything else yields no source and prints verbatim.
    if (!/^Ettinger/.test(part) && !/^Ch(?:apter|\.)?\s*\d/.test(part)) continue
    const chapters = part.match(/Ch(?:apter|\.)?\s*([\d,\s]+)/)
    if (!chapters) { out.push({ id: 'ettinger', text: `${ETTINGER_BOOK}.` }); continue }
    const nums = chapters[1].match(/\d+/g) ?? []
    for (const n of nums) out.push({ id: `ettinger-ch${n}`, text: `${ETTINGER_BOOK}: chap ${n}.` })
  }
  return out
}

/** Walk the page's fields (in render order), numbering each distinct cited
 *  source 1..n by first appearance. Returns the id→number map (for the inline markers) and the ordered reference entries (for the footnote). */
export function buildDiseaseCitations(fields: string[]): {
  numberOf: Map<string, number>
  entries: RefEntry[]
} {
  const numberOf = new Map<string, number>()
  const entries: RefEntry[] = []
  for (const field of fields) {
    for (const m of field.matchAll(CITE)) {
      for (const src of parseSources(m[1])) {
        if (!numberOf.has(src.id)) {
          const n = numberOf.size + 1
          numberOf.set(src.id, n)
          entries.push({ n, id: src.id, text: src.text })
        }
      }
    }
  }
  return { numberOf, entries }
}

/** Split a run of text on inline citations, returning plain-text segments
 *  interleaved with citation segments (source ids + the raw matched text, which
 *  <Cite> falls back to when no page numbering is in scope).
 *
 *  Content is authored with the citation before the sentence's full stop
 *  ("…generally poor (Ettinger Ch 238)."), but AMA places the superscript AFTER
 *  terminal punctuation ("…generally poor.²"). A period or comma trailing the
 *  parenthetical is therefore captured as `trail` so <Cite> can emit it ahead of
 *  the marker. Semicolons and colons are left alone — AMA keeps the marker
 *  before those. */
export interface CiteSegment { text: string; citeIds?: string[]; raw?: string; trail?: string }
export function splitCitations(text: string): CiteSegment[] {
  const out: CiteSegment[] = []
  let last = 0
  for (const m of text.matchAll(CITE)) {
    let end = m.index + m[0].length
    const next = text[end]
    const trail = next === '.' || next === ',' ? next : undefined
    if (trail) end += 1
    if (m.index > last) out.push({ text: text.slice(last, m.index) })
    out.push({ text: '', citeIds: parseSources(m[1]).map(s => s.id), raw: m[0], trail })
    last = end
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

/** True if the text contains at least one inline source citation. */
export function hasCitation(text: string): boolean {
  return new RegExp(String.raw`\((?:${SOURCE_ALT})`).test(text)
}

/** Map of source id → its AMA number on the current page. */
export const CitationContext = createContext<Map<string, number>>(new Map())

/** A superscript citation marker, resolving its source ids to page numbers. When
 *  no numbering is in scope (screens other than the disease page), it renders the
 *  raw citation text unchanged — trailing punctuation included, in its authored
 *  position — so those pages look exactly as before. When numbered, `trail` is
 *  emitted BEFORE the marker to give AMA order ("…poor.²"). */
export function Cite({ ids, fallback, trail }: { ids: string[]; fallback?: string; trail?: string }) {
  const numberOf = useContext(CitationContext)
  const nums = ids.map(id => numberOf.get(id)).filter((n): n is number => n != null)
  if (nums.length === 0) return <>{(fallback ?? '') + (trail ?? '')}</>
  return <>{trail}<sup className="cite-ref">{nums.sort((a, b) => a - b).join(',')}</sup></>
}
