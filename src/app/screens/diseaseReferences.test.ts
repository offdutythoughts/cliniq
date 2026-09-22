import { describe, expect, it } from 'vitest'
import { DB } from '../../data/db'
import { parseSources, buildDiseaseCitations, splitCitations, hasCitation } from './diseaseReferences'

describe('splitCitations — AMA punctuation order', () => {
  it('captures a trailing full stop so the marker can follow it', () => {
    const segs = splitCitations('Prognosis is poor (Ettinger Ch 238).')
    expect(segs[0].text).toBe('Prognosis is poor')
    expect(segs[1].citeIds).toEqual(['ettinger-ch238'])
    expect(segs[1].trail).toBe('.')
    // The period is not left dangling in a later plain-text segment.
    expect(segs.slice(2).map(s => s.text).join('')).toBe('')
  })

  it('captures a trailing comma too', () => {
    expect(splitCitations('Poor (Ettinger Ch 238), but treatable')[1].trail).toBe(',')
  })

  it('leaves semicolons and colons alone (AMA keeps the marker before those)', () => {
    expect(splitCitations('Poor (Ettinger Ch 238); see below')[1].trail).toBeUndefined()
    expect(splitCitations('Poor (Ettinger Ch 238): see below')[1].trail).toBeUndefined()
  })

  it('handles a citation with no trailing punctuation', () => {
    expect(splitCitations('Poor (Ettinger Ch 238)')[1].trail).toBeUndefined()
  })

  it('loses no visible characters other than the moved punctuation', () => {
    const src = 'Alpha (Ettinger Ch 238). Beta (AAHA 2023), gamma; delta (Gelatt 6th edn)'
    const rebuilt = splitCitations(src)
      .map(s => (s.citeIds ? (s.raw ?? '') + (s.trail ?? '') : s.text))
      .join('')
    expect(rebuilt).toBe(src)
  })
})

describe('parseSources', () => {
  it('yields one per-chapter Ettinger entry, in order', () => {
    expect(parseSources('Ettinger Ch 127, 311').map(s => s.id))
      .toEqual(['ettinger-ch127', 'ettinger-ch311'])
    expect(parseSources('Ettinger Ch 314')[0].text).toContain(': chap 314.')
  })

  it('treats "Ettinger 9e" (no chapter) as the book-level source', () => {
    expect(parseSources('Ettinger 9e').map(s => s.id)).toEqual(['ettinger'])
  })

  it('treats Gelatt as a single ophthalmology source', () => {
    expect(parseSources('Gelatt 6th edn Table 17.3').map(s => s.id)).toEqual(['gelatt'])
  })

  it('numbers every chapter a single Gelatt parenthetical names, not just the first', () => {
    expect(parseSources('Gelatt 6th edn Ch 15, Ch 28').map(s => s.id))
      .toEqual(['gelatt-ch15', 'gelatt-ch28'])
    // Gelatt part-chapters are decimal and must survive intact.
    expect(parseSources('Gelatt 6th edn Ch 8.5, Ch 20').map(s => s.id))
      .toEqual(['gelatt-ch8.5', 'gelatt-ch20'])
    // Page ranges and table refs trailing a chapter must not be read as chapters.
    expect(parseSources('Gelatt 6th edn Ch 20 pp. 1213–1221, Ch 22').map(s => s.id))
      .toEqual(['gelatt-ch20', 'gelatt-ch22'])
  })

  it('resolves the dentistry and toxicology books per chapter', () => {
    expect(parseSources('Lemmons 4th edn Ch 6').map(s => s.id)).toEqual(['lemmons-ch6'])
    expect(parseSources('Lemmons 4th edn Ch 6')[0].text)
      .toContain('Lemmons MS. Veterinary Dentistry: A Team Approach. 4th ed. Elsevier; 2025')
    expect(parseSources('Gupta 3rd edn Ch 29 lead, Ch 34 salt').map(s => s.id))
      .toEqual(['gupta-ch29', 'gupta-ch34'])
    // No chapter named — fall back to a book-level entry.
    expect(parseSources('Lemmons 4th edn').map(s => s.id)).toEqual(['lemmons'])
  })

  it('treats ACVIM as the uroliths consensus source', () => {
    expect(parseSources('ACVIM 2016').map(s => s.id)).toEqual(['acvim-uroliths'])
    expect(parseSources('ACVIM 2016')[0].text).toContain('J Vet Intern Med. 2016;30(5):1564-1574')
  })

  it('treats Berent as the SUB journal source', () => {
    expect(parseSources('Berent 2018').map(s => s.id)).toEqual(['berent-sub'])
    expect(parseSources('Berent 2018')[0].text).toContain('J Am Vet Med Assoc. 2018;253(10):1309-1327')
  })

  it('splits a mixed Ettinger + journal parenthetical into separate entries', () => {
    expect(parseSources('Ettinger Ch 306; ACVIM 2016; Berent 2018').map(s => s.id))
      .toEqual(['ettinger-ch306', 'acvim-uroliths', 'berent-sub'])
  })

  // The prefix trap: 'Anders' is a prefix of 'Anderson', and 'Lo' of 'Longeri'.
  // Test order in parseSources is what keeps them apart, and nothing else does
  // — so if someone reorders those branches, this is the test that fails
  // rather than a wrong-but-plausible reference appearing on the polyp page.
  it('does not let a short author name swallow a longer one', () => {
    expect(parseSources('Anderson 2000').map(s => s.id)).toEqual(['anderson-polyps'])
    expect(parseSources('Anders 2008').map(s => s.id)).toEqual(['anders-vbo-baer'])
    expect(parseSources('Longeri 2013').map(s => s.id)).toEqual(['longeri-mybpc3'])
    expect(parseSources('Lo 2022').map(s => s.id)).toEqual(['lo-dual-therapy'])
    // Same family of trap, different pairs — these share a prefix but neither
    // is a prefix of the other, so they must stay distinct whatever the order.
    expect(parseSources('Miller 2002').map(s => s.id)).toEqual(['miller-doxapram'])
    expect(parseSources('Milovancev 2016').map(s => s.id)).toEqual(['milovancev-metoclopramide'])
    expect(parseSources('Mary 2010').map(s => s.id)).toEqual(['mary-a31p'])
    expect(parseSources('Marsilio 2023').map(s => s.id)).toEqual(['acvim-fce'])
    expect(parseSources('Greci 2014').map(s => s.id)).toEqual(['greci-ptt'])
    expect(parseSources('Granström 2015').map(s => s.id)).toEqual(['granstrom-a31p'])
    expect(parseSources('Boland 2017').map(s => s.id)).toEqual(['boland-fhac'])
    expect(parseSources('Boothe 2010').map(s => s.id)).toEqual(['boothe-pyothorax'])
    expect(parseSources('Bohin 2025').map(s => s.id)).toEqual(['bohin-compartments'])
    expect(parseSources('Boeykens 2024').map(s => s.id)).toEqual(['boeykens-acmg'])
    expect(parseSources('Bookbinder 2016').map(s => s.id)).toEqual(['bookbinder-lp'])
    // Cridge and Rudinsky became year-keyed when pages 6-10 added a second
    // work under each name. The markers already in db.ts must keep resolving
    // to what they resolved to before, which is what these two pin.
    expect(parseSources('Cridge 2021').map(s => s.id)).toEqual(['cridge-neostigmine'])
    expect(parseSources('Cridge 2018').map(s => s.id)).toEqual(['cridge-cpl-assays'])
    expect(parseSources('Rudinsky 2022').map(s => s.id)).toEqual(['rudinsky-colitis'])
    expect(parseSources('Rudinsky 2018').map(s => s.id)).toEqual(['rudinsky-ckd'])
    expect(parseSources('Cridge 2099')).toEqual([])
    expect(parseSources('Rudinsky 2099')).toEqual([])
    // Pages 11-15 added a THIRD prefix trap: 'Allen' is a prefix of
    // 'Allenspach'. Wrong order puts a GDV gastropexy review on the
    // eosinophilic-gastroenteritis page, which would read plausibly.
    expect(parseSources('Allen 2014').map(s => s.id)).toEqual(['allen-gastropexy'])
    expect(parseSources('Allenspach 2007').map(s => s.id)).toEqual(['allenspach-risk'])
    expect(parseSources('Allenspach 2016').map(s => s.id)).toEqual(['allenspach-longterm'])
    // The other three names that now cover two works each.
    expect(parseSources('Glickman 1994').map(s => s.id)).toEqual(['glickman-risk-1994'])
    expect(parseSources('Glickman 2000').map(s => s.id)).toEqual(['glickman-nondietary'])
    expect(parseSources('Mayhew 2021').map(s => s.id)).toEqual(['mayhew-laparoscopic'])
    expect(parseSources('Mayhew 2022').map(s => s.id)).toEqual(['mayhew-boas-surgery'])
    // Marks is keyed on the AUTHOR, not "ACVIM 2018" — that year is already
    // taken by the systemic-hypertension statement in ACVIM_BY_YEAR.
    expect(parseSources('Marks 2018').map(s => s.id)).toEqual(['marks-gi-protectants'])
    expect(parseSources('ACVIM 2018').map(s => s.id)).toEqual(['acvim-hypertension'])
    // Pages 16-20: Arenas covers two works, and Behrend is keyed on the author
    // rather than "ACVIM 2013" for the same reason Marks is.
    expect(parseSources('Arenas 2013').map(s => s.id)).toEqual(['arenas-trilostane-bid'])
    expect(parseSources('Arenas 2014').map(s => s.id)).toEqual(['arenas-adh-survival'])
    expect(parseSources('Arenas 2099')).toEqual([])
    expect(parseSources('Behrend 2013').map(s => s.id)).toEqual(['behrend-hac-diagnosis'])
    // Near-miss surnames that share a stem but must stay distinct.
    expect(parseSources('Harb 1996').map(s => s.id)).toEqual(['harb-cdi'])
    expect(parseSources('Hardy 2023').map(s => s.id)).toEqual(['hardy-skin'])
    expect(parseSources('Harris 2017').map(s => s.id)).toEqual(['harris-een-pancreatitis'])
    expect(parseSources('Russell 2012').map(s => s.id)).toEqual(['russell-lowgrade-freq'])
    expect(parseSources('Rush 2002').map(s => s.id)).toEqual(['rush-hcm'])
    expect(parseSources('Barker 2005').map(s => s.id)).toEqual(['barker-trilostane-survival'])
    expect(parseSources('Barrs 2005').map(s => s.id)).toEqual(['barrs-pyothorax'])
    // PubMed pass: Cridge now covers THREE works, and Bellis/Bellenger share
    // four leading characters without either being a prefix of the other.
    expect(parseSources('Cridge 2025').map(s => s.id)).toEqual(['cridge-pythiosis'])
    expect(parseSources('Bellis 2015').map(s => s.id)).toEqual(['bellis-cpa-cdi'])
    expect(parseSources('Bellenger 1990').map(s => s.id)).toEqual(['bellenger-pyloric'])
    // 'Ku' is only two characters — the word boundary is what stops it
    // matching a longer surname that happens to start Ku.
    expect(parseSources('Ku 2023').map(s => s.id)).toEqual(['ku-rta-ndi'])
    // Diacritic in the marker must round-trip.
    expect(parseSources('Černá 2024').map(s => s.id)).toEqual(['cerna-gesf'])
    // 'Li' is a prefix of EIGHT other surnames in this file. The word boundary
    // in its branch is the only thing keeping them apart, so every one of them
    // is asserted here — this is the most fragile marker in the file.
    expect(parseSources('Li 2021').map(s => s.id)).toEqual(['li-aqp2'])
    // Three Wiinberg DIC papers, year-keyed. The print years matter: PubMed
    // carries online dates a year or two earlier for two of the three.
    expect(parseSources('Wiinberg 2008').map(s => s.id)).toEqual(['wiinberg-teg-dic'])
    expect(parseSources('Wiinberg 2009').map(s => s.id)).toEqual(['wiinberg-teg-bleeding'])
    expect(parseSources('Wiinberg 2010').map(s => s.id)).toEqual(['wiinberg-dic-score'])
    expect(parseSources('Wiinberg 2099')).toEqual([])
    // Wainberg (feline VBO) and Wiinberg (canine DIC) are different authors.
    expect(parseSources('Wainberg 2019').map(s => s.id)).toEqual(['wainberg-vbo'])
    // Callan vs Clark, Gookin vs Gould/Gold.
    expect(parseSources('Callan 2006').map(s => s.id)).toEqual(['callan-f7-mutation'])
    expect(parseSources('Clark 2022').map(s => s.id)).toEqual(['clark-f7-autopsy'])
    expect(parseSources('Gookin 1997').map(s => s.id)).toEqual(['gookin-feline-fx'])
    expect(parseSources('Gould 2011').map(s => s.id)).toEqual(['gould-pll'])
    expect(parseSources('Gold 2016').map(s => s.id)).toEqual(['gold-basal-cortisol'])
    expect(parseSources('Lien 2006').map(s => s.id)).toEqual(['lien-iatrogenic'])
    expect(parseSources('Linton 2015').map(s => s.id)).toEqual(['linton-fgesf'])
    expect(parseSources('Lo 2022').map(s => s.id)).toEqual(['lo-dual-therapy'])
    expect(parseSources('Longeri 2013').map(s => s.id)).toEqual(['longeri-mybpc3'])
    expect(parseSources('Langlois 2020').map(s => s.id)).toEqual(['langlois-metronidazole'])
    expect(parseSources('Larose 2020').map(s => s.id)).toEqual(['larose-intuss'])
    expect(parseSources('Lennon 2007').map(s => s.id)).toEqual(['lennon-basal-cortisol'])
    expect(parseSources('LeVine 2024 diagnosis').map(s => s.id)).toEqual(['acvim-itp-dx'])
  })

  it('routes the year-keyed Meurs and Payne markers to the right cohort', () => {
    expect(parseSources('Meurs 2005')[0].text).toContain('Maine Coon cat')
    expect(parseSources('Meurs 2007')[0].text).toContain('ragdoll')
    expect(parseSources('Payne 2010')[0].text).toContain('127 referred cats')
    expect(parseSources('Payne 2013')[0].text).toContain('Prognostic indicators')
    expect(parseSources('Payne 2015')[0].text).toContain('CatScan study')
    // An unmapped year must yield nothing rather than borrowing a sibling.
    expect(parseSources('Meurs 2099')).toEqual([])
    expect(parseSources('Payne 2099')).toEqual([])
  })

  it('resolves each first-five-pages primary source to its own entry', () => {
    const cases: [string, string, string][] = [
      ['Steele 2021', 'steele-igf1', 'J Feline Med Surg. 2021;23(10):952-958'],
      ['Rush 2002', 'rush-hcm', 'J Am Vet Med Assoc. 2002;220(2):202-207'],
      ['Fox 2018', 'fox-reveal', 'J Vet Intern Med. 2018;32(3):930-943'],
      ['Hogan 2015', 'hogan-fat-cat', 'J Vet Cardiol. 2015;17(suppl 1):S306-S317'],
      ['Stanley 2010', 'stanley-golpp', 'Vet Surg. 2010;39(2):139-149'],
      ['Tobias 2004', 'tobias-doxapram', 'Vet Anaesth Analg. 2004;31(4):258-263'],
      ['Miller 2002', 'miller-doxapram', 'J Vet Intern Med. 2002;16(5):524-528'],
      ['Wilson 2016', 'wilson-tieback-ap', 'J Am Vet Med Assoc. 2016;248(2):188-194'],
      ['MacPhail 2001', 'macphail-lp', 'J Am Vet Med Assoc. 2001;218(12):1949-1956'],
      ['Jeffery 2006', 'jeffery-lp', 'Vet Rec. 2006;158(1):17-21'],
      ['Veir 2002', 'veir-polyps', 'J Feline Med Surg. 2002;4(4):195-199'],
      ['Greci 2014', 'greci-ptt', 'J Feline Med Surg. 2014;16(8):645-650'],
      ['Janssens 2017', 'janssens-tala', 'J Feline Med Surg. 2017;19(8):803-808'],
      ['Wainberg 2019', 'wainberg-vbo', 'J Am Vet Med Assoc. 2019;255(7):828-836'],
      ['Hoppers 2020', 'hoppers-bilateral', 'Vet Dermatol. 2020;31(5):385-e102'],
      ['Bohin 2025', 'bohin-compartments', 'J Small Anim Pract. 2025;66(3):197-202'],
      ['Barrs 2005', 'barrs-pyothorax', 'J Feline Med Surg. 2005;7(4):211-222'],
      ['Demetriou 2002', 'demetriou-pyothorax', 'J Small Anim Pract. 2002;43(9):388-394'],
      ['Stillion 2015', 'stillion-pyothorax', 'J Vet Emerg Crit Care. 2015;25(1):113-129'],
      ['Rooney 2002', 'rooney-pyothorax', 'J Am Vet Med Assoc. 2002;221(1):86-92'],
      ['Boothe 2010', 'boothe-pyothorax', 'J Am Vet Med Assoc. 2010;236(6):657-663'],
      ['Eiras 2021', 'eiras-diaz-ct', 'J Small Anim Pract. 2021;62(11):959-966'],
      ['Johnson 2023', 'johnson-pyothorax', 'J Vet Intern Med. 2023;37(3):1155-1165'],
      ['Ramsey 2008', 'ramsey-maropitant', 'J Vet Pharmacol Ther. 2008;31(6):538-543'],
      ['Shmalberg 2019', 'shmalberg-metronidazole', 'Front Vet Sci. 2019;6:163'],
      ['Rudinsky 2022', 'rudinsky-colitis', 'J Am Vet Med Assoc. 2022;260(S3):S23-S32'],
      ['Langlois 2020', 'langlois-metronidazole', 'J Vet Intern Med. 2020;34(1):98-104'],
      // Added with the content-enrichment pass. Note two first authors the
      // search connector got wrong and the registries corrected: the 2015
      // A31P cohort is Granström (not Godiksen) and the 90-case polyneuropathy
      // study is Bookbinder (not Flanders). Asserting on the surname is what
      // keeps a re-import from quietly reintroducing the wrong one.
      ['Mary 2010', 'mary-a31p', 'J Vet Cardiol. 2010;12(3):155-161'],
      ['Granström 2015', 'granstrom-a31p', 'Granström S, Godiksen MT'],
      ['Boeykens 2024', 'boeykens-acmg', 'Front Vet Sci. 2024;11:1327081'],
      ['Brainard 2025', 'brainard-supercat', 'J Am Vet Med Assoc. 2025;263(4):1-10'],
      ['Bookbinder 2016', 'bookbinder-lp', 'Bookbinder LC, Flanders J'],
      ['Milovancev 2016', 'milovancev-metoclopramide', 'Vet Surg. 2016;45(5):577-581'],
      ['Ogden 2019', 'ogden-cisapride', 'J Small Anim Pract. 2019;60(3):183-190'],
      // Pages 6-10. Note Cridge and Rudinsky are now year-keyed because each
      // covers two unrelated works; the older marker must still resolve.
      ['Venn 2017', 'venn-outpatient', 'J Vet Emerg Crit Care. 2017;27(1):52-65'],
      ['Sarpong 2017', 'sarpong-outpatient', 'J Am Vet Med Assoc. 2017;251(9):1035-1041'],
      ['Perley 2020', 'perley-shelter', 'J Vet Emerg Crit Care. 2020;30(2):202-208'],
      ['Chalifoux 2021', 'chalifoux-prognostic', 'J Vet Emerg Crit Care. 2021;31(3):402-413'],
      ['Pereira 2018', 'pereira-fmt', 'J Vet Intern Med. 2018;32(2):707-711'],
      ['Hoel 2026', 'hoel-oral-fmt', 'J Am Vet Med Assoc. 2026;264(10):1301-1307'],
      ['Mohr 2003', 'mohr-een', 'J Vet Intern Med. 2003;17(6):791-798'],
      ['de Mari 2003', 'de-mari-interferon', 'Vet Rec. 2003;152(4):105-108'],
      ['Acciacca 2020', 'acciacca-plasma', 'J Vet Emerg Crit Care. 2020;30(5):525-533'],
      ['Hall 2014', 'hall-sdma', 'J Vet Intern Med. 2014;28(6):1676-1683'],
      ['Nabity 2015', 'nabity-sdma', 'J Vet Intern Med. 2015;29(4):1036-1044'],
      ['Scobie 2026', 'scobie-sdma-review', 'Vet Rec. 2026;198(7):e299-e314'],
      ['Syme 2006', 'syme-proteinuria', 'J Vet Intern Med. 2006;20(3):528-535'],
      ['King 2007', 'king-prognostic', 'J Vet Intern Med. 2007;21(5):906-916'],
      ['Chakrabarti 2012', 'chakrabarti-progression', 'J Vet Intern Med. 2012;26(2):275-281'],
      ['Elliott 2000', 'elliott-renal-diet', 'J Small Anim Pract. 2000;41(6):235-242'],
      ['Quimby 2013', 'quimby-mirtazapine', 'Vet J. 2013;197(3):651-655'],
      ['Spencer 2021', 'spencer-omeprazole', 'J Vet Intern Med. 2021;35(6):2705-2712'],
      ['Mortier 2025', 'mortier-proteinuria', 'J Vet Intern Med. 2025;39(1):e17257'],
      ['Gold 2016', 'gold-basal-cortisol', 'J Vet Intern Med. 2016;30(6):1798-1805'],
      ['Bovens 2014', 'bovens-basal-cortisol', 'J Vet Intern Med. 2014;28(5):1541-1545'],
      ['Lennon 2007', 'lennon-basal-cortisol', 'J Am Vet Med Assoc. 2007;231(3):413-416'],
      ['Vincent 2021', 'vincent-low-dose-docp', 'J Vet Intern Med. 2021;35(4):1720-1728'],
      ['Kook 2014', 'kook-dggr', 'J Vet Intern Med. 2014;28(3):863-870'],
      ['Haworth 2014', 'haworth-cpl', 'J Vet Emerg Crit Care. 2014;24(2):135-143'],
      ['Trivedi 2011', 'trivedi-cpl', 'J Vet Intern Med. 2011;25(6):1241-1247'],
      ['Harris 2017', 'harris-een-pancreatitis', 'J Vet Emerg Crit Care. 2017;27(4):425-433'],
      ['Mansfield 2011', 'mansfield-een', 'J Vet Intern Med. 2011;25(3):419-425'],
      ['Larose 2020', 'larose-intuss', 'Vet Surg. 2020;49(5):870-878'],
      ['Applewhite 2001', 'applewhite-enteroplication', 'J Am Vet Med Assoc. 2001;219(10):1415-1418'],
      ['Oakes 1994', 'oakes-enteroplication', 'J Am Vet Med Assoc. 1994;205(1):72-75'],
      ['Rallis 2000', 'rallis-intuss', 'J Vet Med A Physiol Pathol Clin Med. 2000;47(8):507-511'],
      ['Rudinsky 2018', 'rudinsky-ckd', 'J Vet Intern Med. 2018;32(6):1977-1982'],
      ['Cridge 2018', 'cridge-cpl-assays', 'Cridge H, MacLeod AG'],
      // Pages 11-15.
      ['de Papp 1999', 'de-papp-lactate', 'J Am Vet Med Assoc. 1999;215(1):49-52'],
      ['Zacher 2010', 'zacher-lactate', 'J Am Vet Med Assoc. 2010;236(8):892-897'],
      ['Green 2011', 'green-lactate', 'J Vet Emerg Crit Care. 2011;21(1):36-44'],
      ['Ward 2003', 'ward-gastropexy', 'Prev Vet Med. 2003;60(4):319-329'],
      ['O\u2019Neill 2017', 'oneill-gdv', 'J Small Anim Pract. 2017;58(11):629-638'],
      ['Allen 2014', 'allen-gastropexy', 'Top Companion Anim Med. 2014;29(3):77-80'],
      ['McCord 2026', 'mccord-gdv', 'J Am Vet Med Assoc. 2026;264(4):1-9'],
      ['Marks 2018', 'marks-gi-protectants', 'J Vet Intern Med. 2018;32(6):1823-1840'],
      ['Shaevitz 2021', 'shaevitz-piroxicam', 'J Am Vet Med Assoc. 2021;259(4):385-391'],
      ['Bazelle 2018', 'bazelle-cytoprotective', 'J Small Anim Pract. 2018;59(10):587-602'],
      ['Phillips 2019', 'phillips-feline-hh', 'J Vet Intern Med. 2019;33(5):1970-1976'],
      ['Reeve 2017', 'reeve-brachy-hh', 'J Small Anim Pract. 2017;58(12):703-708'],
      ['Watkins 2025', 'watkins-hh-gastropexy', 'J Small Anim Pract. 2025;66(2):110-120'],
      ['Bellenger 1990', 'bellenger-pyloric', 'Aust Vet J. 1990;67(9):317-320'],
      // Pages 16-20.
      ['Craig 2009', 'craig-fgesf', 'Vet Pathol. 2009;46(1):63-70'],
      ['Linton 2015', 'linton-fgesf', 'J Feline Med Surg. 2015;17(5):392-404'],
      ['Kiselow 2008', 'kiselow-lowgrade', 'J Am Vet Med Assoc. 2008;232(3):405-410'],
      ['Sabattini 2016', 'sabattini-ibd-lsa', 'J Small Anim Pract. 2016;57(8):396-401'],
      ['Daniaux 2014', 'daniaux-muscularis', 'J Feline Med Surg. 2014;16(2):89-98'],
      ['Russell 2012', 'russell-lowgrade-freq', 'J Feline Med Surg. 2012;14(12):910-912'],
      ['Behrend 2013', 'behrend-hac-diagnosis', 'J Vet Intern Med. 2013;27(6):1292-1304'],
      ['Barker 2005', 'barker-trilostane-survival', 'J Vet Intern Med. 2005;19(6):810-815'],
      ['Nagata 2017', 'nagata-pdh-survival', 'J Vet Intern Med. 2017;31(1):22-28'],
      ['Harb 1996', 'harb-cdi', 'J Am Vet Med Assoc. 1996;209(11):1884-1888'],
      ['Maddens 2010', 'maddens-pyometra', 'J Vet Intern Med. 2010;24(6):1263-1270'],
      // PubMed pass.
      ['Černá 2024', 'cerna-gesf', 'J Vet Intern Med. 2024;38(2):1005-1012'],
      ['Thieme 2019', 'thieme-retroperitoneal', 'JFMS Open Rep. 2019;5(2)'],
      ['Duclos 2023', 'duclos-intrathoracic', 'JFMS Open Rep. 2023;9(2)'],
      ['Porras 2022', 'porras-tgfb1', 'Vet Sci. 2022;9(6):291'],
      ['Sattasathuchana 2014', 'sattasathuchana-eosinophilic', 'Anim Health Res Rev. 2014;15(1):76-86'],
      ['Beaumier 2022', 'beaumier-hes-cardiac', 'J Vet Cardiol. 2022;41:11-17'],
      ['Tanaka 2022', 'tanaka-pyloric-ct', 'Vet Radiol Ultrasound. 2022;64(2):262-270'],
      ['Teshima 2011', 'teshima-postop-cdi', 'J Vet Med Sci. 2011;73(1):33-39'],
      ['Croton 2019', 'croton-trauma-cdi', 'Case Rep Vet Med. 2019;2019:3563675'],
      ['Bellis 2015', 'bellis-cpa-cdi', 'J Vet Emerg Crit Care. 2015;25(6):745-750'],
      ['Evenhuis 2021', 'evenhuis-pituitary-cyst', 'JFMS Open Rep. 2021;7(1)'],
      ['Paulin 2023', 'paulin-feline-pthp', 'Can Vet J. 2023;64(3):245-251'],
      ['Etish 2014', 'etish-lepto-ndi', 'Ir Vet J. 2014;67(1):7'],
      ['Ku 2023', 'ku-rta-ndi', 'Vet Med Sci. 2023;9(4):1483-1487'],
      ['Cridge 2025', 'cridge-pythiosis', 'Vet Clin North Am Small Anim Pract. 2025;55(2):225-236'],
      ['Li 2021', 'li-aqp2', 'Front Endocrinol (Lausanne). 2021;12:665145'],
      // Pages 21-25.
      ['Mignan 2020', 'mignan-mg-classification', 'J Vet Intern Med. 2020;34(5):1707-1717'],
      ['Grobman 2021', 'grobman-aerodigestive', 'Vet Clin North Am Small Anim Pract. 2021;51(1):17-32'],
      ['Estrin 2006', 'estrin-feline-dic', 'J Vet Intern Med. 2006;20(6):1334-1339'],
      ['Callan 2006', 'callan-f7-mutation', 'J Thromb Haemost. 2006;4(12):2616-2622'],
      ['Clark 2022', 'clark-f7-autopsy', 'J Vet Diagn Invest. 2022;34(5):806-812'],
      ['Gookin 1997', 'gookin-feline-fx', 'J Am Vet Med Assoc. 1997;211(5):576-579'],
    ]
    for (const [marker, id, fragment] of cases) {
      const [source] = parseSources(marker)
      expect(source?.id, marker).toBe(id)
      expect(source.text, marker).toContain(fragment)
    }
  })

  it('resolves each feline-HAC primary source to its own entry', () => {
    const cases: [string, string, string][] = [
      ['Cook 2021', 'cook-cushingoid', 'J Feline Med Surg. 2021;23(1):4-16'],
      ['Boland 2017', 'boland-fhac', 'J Feline Med Surg. 2017;19(9):933-947'],
      ['Valentin 2014', 'valentin-fhac', 'J Vet Intern Med. 2014;28(2):481-487'],
      ['Keith 2013', 'keith-trilostane', 'J Vet Intern Med. 2013;27(6):1471-1477'],
      ['Neiger 2004', 'neiger-trilostane', 'J Vet Intern Med. 2004;18(2):160-164'],
      ['Miceli 2022', 'miceli-trilostane', '43 cases (2012-2022)'],
      ['Daley 1993', 'daley-metyrapone', 'J Am Vet Med Assoc. 1993;202(6):956-960'],
      ['Moore 2000', 'moore-metyrapone', 'J Am Vet Med Assoc. 2000;217(5):691-694'],
      ['Duesberg 1995', 'duesberg-adrenalectomy', 'J Am Vet Med Assoc. 1995;207(8):1066-1070'],
      ['Meij 2001', 'meij-hypophysectomy', 'Vet Surg. 2001;30(1):72-86'],
      ['Benchekroun 2012', 'benchekroun-acth', 'J Vet Intern Med. 2012;26(3):575-581'],
      ['Hardy 2023', 'hardy-skin', 'JFMS Open Rep. 2023;9(1)'],
      ['Yayoshi 2022', 'yayoshi-radiation', 'J Vet Med Sci. 2022;84(7):898-904'],
      ['Muschner 2018', 'muschner-remission', 'JFMS Open Rep. 2018;4(1)'],
      ['Lien 2006', 'lien-iatrogenic', 'J Am Anim Hosp Assoc. 2006;42(6):414-423'],
      ['Chirayath 2020', 'chirayath-iatrogenic', 'Vet Dermatol. 2020;31(6):486-488'],
    ]
    for (const [marker, id, fragment] of cases) {
      const [source] = parseSources(marker)
      expect(source.id, marker).toBe(id)
      expect(source.text, marker).toContain(fragment)
    }
  })
})

describe('buildDiseaseCitations', () => {
  it('numbers distinct chapters by first appearance across fields', () => {
    const { numberOf, entries } = buildDiseaseCitations([
      'Threshold (Ettinger Ch 127).',
      'More (Ettinger Ch 311, 127).',
      'Also (Ettinger Ch 300).',
    ])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch127', 'ettinger-ch311', 'ettinger-ch300'])
    expect(numberOf.get('ettinger-ch127')).toBe(1)
    expect(numberOf.get('ettinger-ch311')).toBe(2)
    expect(numberOf.get('ettinger-ch300')).toBe(3)
    expect(entries.map(e => e.n)).toEqual([1, 2, 3])
  })

  it('ignores non-source parentheticals', () => {
    const { entries } = buildDiseaseCitations(['Large breeds (as for most cases). (Ettinger Ch 314)'])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch314'])
  })

  it('numbers the real prostatitis page as a single Ettinger chapter', () => {
    const d = DB.disease_page.find(x => x.id === 'DIS-URO-PROSTATITIS')!
    const str = (v: unknown): string => (typeof v === 'string' ? v : '')
    const { entries } = buildDiseaseCitations([
      str(d.topAlert), str(d.severe), str(d.etiology), str(d.breed), str(d.age),
      str(d.sex), str(d.risk), str(d.path), str(d.signs), str(d.conf), str(d.supp),
      str(d.tx1), str(d.tx2), str(d.outpatient), str(d.monitor), str(d.prog), str(d.ddx), str(d.pearl),
    ])
    expect(entries.map(e => e.id)).toEqual(['ettinger-ch314'])
    expect(entries[0].text).toContain(': chap 314.')
  })

  it('numbers the feline HAC page across its many primary sources, in render order', () => {
    const d = DB.disease_page.find(x => x.id === 'DIS-ENDO-HAC-CAT')!
    const str = (v: unknown): string => (typeof v === 'string' ? v : '')
    const { entries } = buildDiseaseCitations([
      str(d.topAlert), str(d.severe), str(d.etiology), str(d.breed), str(d.age),
      str(d.sex), str(d.risk), str(d.path), str(d.signs), str(d.conf), str(d.supp),
      str(d.tx1), str(d.tx2), str(d.outpatient), str(d.monitor), str(d.prog), str(d.ddx), str(d.pearl),
    ])
    // topAlert cites Hardy first, so it takes number 1; numbering then follows
    // the card order down the page.
    expect(entries[0].id).toBe('hardy-skin')
    expect(entries.map(e => e.n)).toEqual(entries.map((_, i) => i + 1))
    // Every id is distinct — a source cited in several fields is numbered once.
    expect(new Set(entries.map(e => e.id)).size).toBe(entries.length)
    // The multi-source "(Ettinger Ch 294; Boland 2017)" parenthetical resolved both.
    expect(entries.map(e => e.id)).toEqual(expect.arrayContaining(['ettinger-ch294', 'boland-fhac']))
  })

  it('leaves no disease field citing a source that renders as literal text', () => {
    // A source name buried mid-parenthetical ("(CIBDAI / CCECAI, Ettinger Ch 262)")
    // never matches CITE, so it prints raw instead of becoming a superscript.
    const FIELDS = ['topAlert', 'severe', 'etiology', 'breed', 'age', 'sex', 'risk', 'path',
      'signs', 'conf', 'supp', 'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'ddx', 'pearl']
    const names = /Ettinger|Gelatt|AAHA|FECAVA|ACVIM|AHS \d/
    const offenders: string[] = []
    for (const d of DB.disease_page as Record<string, unknown>[]) {
      for (const f of FIELDS) {
        const text = d[f]
        if (typeof text !== 'string') continue
        for (const m of text.matchAll(/\(([^)]+)\)/g)) {
          if (names.test(m[1]) && !hasCitation(m[0])) offenders.push(`${String(d.id)} ${f}: ${m[0]}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})

// ── Reference-block assertions ───────────────────────────────────────────────
//
// The visual suite screenshots these pages, but `maxDiffPixelRatio` is 0.01 and
// a swapped reference line is a few hundred pixels on a page thousands tall, so
// a pixel compare cannot see a citation change. That is how a bare /^ACVIM/
// match printed the uroliths statement on the CKD, systemic-hypertension and
// feline-cardiomyopathy pages for as long as it did. These assert the rendered
// reference text directly.
describe('reference block', () => {
  const FIELDS = ['topAlert', 'severe', 'etiology', 'breed', 'age', 'sex', 'risk', 'path',
    'signs', 'conf', 'supp', 'tx1', 'tx2', 'outpatient', 'monitor', 'prog', 'ddx', 'pearl']

  const pageFields = (id: string): string[] => {
    const d = (DB.disease_page as Record<string, unknown>[]).find(x => x.id === id)
    if (!d) throw new Error(`no disease page ${id}`)
    return FIELDS.map(f => (typeof d[f] === 'string' ? (d[f] as string) : ''))
  }

  // The invariant that would have caught the mis-routing on day one: if a marker
  // names a year, the work it resolves to has to be from that year. A marker
  // sent to the wrong consensus statement fails here even on a page nobody
  // thought to write a test for.
  it('resolves every year-bearing marker to a source printing that year', () => {
    const offenders: string[] = []
    for (const d of DB.disease_page as Record<string, unknown>[]) {
      for (const f of FIELDS) {
        const text = d[f]
        if (typeof text !== 'string') continue
        for (const seg of splitCitations(text)) {
          if (!seg.raw) continue
          const inner = seg.raw.trim().replace(/^\(/, '').replace(/\)$/, '')
          for (const part of inner.split(';').map(x => x.trim())) {
            const year = part.match(/\b(?:19|20)\d{2}\b/)?.[0]
            if (!year) continue
            for (const src of parseSources(part)) {
              if (!src.text.includes(year)) {
                offenders.push(`${String(d.id)} ${f}: "(${part})" -> ${src.id} :: ${src.text.slice(0, 70)}`)
              }
            }
          }
        }
      }
    }
    expect(offenders).toEqual([])
  })

  // The three pages the bare-prefix match got wrong, pinned by the text a reader
  // actually sees rather than by id alone.
  it('prints the statement each ACVIM year names', () => {
    const cases: [string, string][] = [
      ['DIS-SEC-CKD', 'systemic hypertension in dogs and cats'],
      ['DIS-VASC-HYPERT', 'systemic hypertension in dogs and cats'],
      ['DIS-CARD-RCM', 'cardiomyopathies in cats'],
      ['DIS-BD-IMHA', 'treatment of immune-mediated hemolytic anemia in dogs'],
    ]
    for (const [id, phrase] of cases) {
      const { entries } = buildDiseaseCitations(pageFields(id))
      const texts = entries.map(e => e.text).join(' || ')
      expect(texts, `${id} should cite "${phrase}"`).toContain(phrase)
      // and must not have fallen back to the uroliths statement
      expect(texts, `${id} must not cite uroliths`).not.toContain('prevention of uroliths')
    }
  })

  // A year with no mapping must not silently borrow another statement's entry.
  it('drops an unmapped year rather than mis-attributing it', () => {
    expect(parseSources('ACVIM 2099')).toEqual([])
    expect(parseSources('AAHA 2099')).toEqual([])
  })

  // The five pages attributed to primary literature on 2026-09-21. A marker
  // that stops resolving silently loses its superscript and prints raw, so
  // each page is pinned by reference COUNT and by text a reader would see.
  it('numbers the first five disease pages against their primary literature', () => {
    const cases: [string, number, string[]][] = [
      ['DIS-HCM', 17, ['CatScan study', 'ragdoll hypertrophic cardiomyopathy', 'FAT CAT', 'REVEAL', 'SUPERCAT']],
      ['DIS-LP', 9, ['Esophageal dysfunction in dogs with idiopathic laryngeal paralysis', 'doxapram', 'cisapride']],
      ['DIS-POLYP', 8, ['Management of inflammatory polyps in 37 cats', 'ventral bulla osteotomy']],
      ['DIS-PYOTHORAX', 8, ['Feline pyothorax', 'Medical and surgical treatment of pyothorax in dogs']],
      ['DIS-GAST-DIET', 4, ['maropitant', 'metronidazole']],
      // Pages 6-10.
      ['DIS-GI-PARVO', 10, ['outpatient protocol', 'interferon-omega', 'Fecal microbiota transplantation']],
      ['DIS-SEC-CKD', 12, ['symmetric dimethylarginine', 'severity of proteinuria', 'effect of dietary management']],
      ['DIS-SEC-HYPO', 7, ['basal serum or plasma cortisol', 'desoxycorticosterone pivalate']],
      ['DIS-SEC-PAN-DOG', 7, ['DGGR', 'SNAP cPL', 'early enteral nutrition']],
      ['DIS-GI-INTUSS', 5, ['intestinal intussusceptions', 'Enteroplication', 'predisposing factor']],
      // Pages 11-15.
      ['DIS-GI-EOGAST', 4, ['Chronic enteropathies in dogs', 'eosinophilic gastrointestinal disorders', 'Hypereosinophilic syndrome']],
      ['DIS-GI-ULC', 4, ['gastrointestinal protectants', 'cyto-protective drugs', 'piroxicam']],
      ['DIS-GI-GDV', 10, ['prophylactic gastropexy', 'Plasma lactate concentration', 'Dog Aging Project']],
      ['DIS-GI-HH', 6, ['cats with hiatal hernia', 'brachycephalic dogs using fluoroscopy', 'without use of a gastropexy']],
      ['DIS-GI-PYL', 3, ['hypertrophic pyloric gastropathy', 'CT features of pyloric lesions']],
      // Pages 16-20.
      ['DIS-GI-FGESF', 7, ['eosinophilic sclerosing fibroplasia', '13 cases', '60 cats', 'Pythiosis']],
      ['DIS-GI-LYMP', 5, ['low-grade lymphocytic lymphoma', 'muscularis propria', 'duodenal endoscopic biopsies']],
      ['DIS-PUPD-HAC', 7, ['2012 ACVIM consensus statement', 'trilostane protocols', 'mitotane']],
      ['DIS-PUPD-CDI', 6, ['Central diabetes insipidus in dogs', 'transsphenoidal surgery', 'traumatic brain injury', 'pituitary cyst']],
      ['DIS-PUPD-NDI', 4, ['pyometra induces transient glomerular', 'leptospirosis', 'renal tubular acidosis', 'aquaporin-2 mutation']],
      // Pages 21-25. DIS-BD-FII is deliberately absent: nothing citable was
      // found for canine factor II deficiency, and the page was left uncited
      // rather than propped up on a paper that does not cover it.
      ['DIS-OES-MEGA', 7, ['myasthenia gravis and congenital myasthenic', 'Sildenafil', 'Aerodigestive', 'Spontaneous remission']],
      ['DIS-BD-DIC', 4, ['scoring system for diagnosis of canine disseminated', 'Thromboelastographic', 'coagulation in cats']],
      ['DIS-BD-FX', 1, ['Factor X deficiency in a cat']],
      ['DIS-BD-FVII', 2, ['missense mutation responsible for factor VII', 'unexplained bleeding on autopsy']],
    ]
    for (const [id, count, phrases] of cases) {
      const { entries } = buildDiseaseCitations(pageFields(id))
      expect(entries.length, `${id} reference count`).toBe(count)
      const texts = entries.map(e => e.text).join(' || ')
      for (const phrase of phrases) expect(texts, `${id} should cite "${phrase}"`).toContain(phrase)
    }
  })

  // Every marker on those pages has to RESOLVE. An unmapped one yields no id,
  // and <Cite> then falls back to printing the raw "(Author 2015)" text — the
  // exact failure this whole pass was meant to remove.
  it('leaves no unresolved citation marker on the first twenty-five disease pages', () => {
    const offenders: string[] = []
    for (const id of ['DIS-HCM', 'DIS-LP', 'DIS-POLYP', 'DIS-PYOTHORAX', 'DIS-GAST-DIET',
      'DIS-GI-PARVO', 'DIS-SEC-CKD', 'DIS-SEC-HYPO', 'DIS-SEC-PAN-DOG', 'DIS-GI-INTUSS',
      'DIS-GI-EOGAST', 'DIS-GI-ULC', 'DIS-GI-GDV', 'DIS-GI-HH', 'DIS-GI-PYL',
      'DIS-GI-FGESF', 'DIS-GI-LYMP', 'DIS-PUPD-HAC', 'DIS-PUPD-CDI', 'DIS-PUPD-NDI',
      'DIS-OES-MEGA', 'DIS-BD-DIC', 'DIS-BD-FX', 'DIS-BD-FII', 'DIS-BD-FVII']) {
      for (const field of pageFields(id)) {
        for (const seg of splitCitations(field)) {
          if (seg.raw && (seg.citeIds ?? []).length === 0) offenders.push(`${id}: ${seg.raw.trim()}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  // "(AAHA/AAFP)" and "(ACVIM-preferred)" are prose qualifiers. A matched
  // parenthetical is replaced by its superscript, so treating one as a citation
  // deleted the text behind it.
  it('leaves source-named prose qualifiers as text', () => {
    expect(parseSources('AAHA/AAFP')).toEqual([])
    expect(parseSources('AAHA first-choice')).toEqual([])
    // markup.tsx passes `raw` to <Cite fallback>, and Cite renders the fallback
    // whenever no id resolves to a number — so the qualifier reaches the page as
    // its own text. Asserting on `raw`, not `text`, is what matches that path.
    const seg = splitCitations('PPI if indicated (AAHA/AAFP) then review').find(x => x.citeIds)
    expect(seg?.citeIds).toEqual([])
    expect(seg?.raw?.trim()).toBe('(AAHA/AAFP)')
  })
})
