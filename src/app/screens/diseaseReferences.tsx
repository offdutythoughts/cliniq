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
const GELATT_BOOK =
  'Gelatt KN, Ben-Shlomo G, Gilger BC, Hendrix DVH, Kern TJ, Plummer CE, eds. Veterinary Ophthalmology. 6th ed. Wiley-Blackwell; 2021'
// Web-published clinical guideline — organisation-as-author AMA form with URL.
const AHS_GUIDELINES =
  'American Heartworm Society. Current Canine Guidelines for the Prevention, Diagnosis, and Management of Heartworm (Dirofilaria immitis) Infection in Dogs. American Heartworm Society; 2024. https://www.heartwormsociety.org/veterinary-resources/american-heartworm-society-guidelines'
// Peer-reviewed journal sources — AMA article form: Authors. Title. Journal. Year;Vol(Issue):Pages.
// The ACVIM uroliths consensus is the gold-standard urolith reference; Berent's
// SUB series is the definitive feline ureteral-obstruction outcomes paper.
const ACVIM_UROLITHS =
  'Lulich JP, Berent AC, Adams LG, Westropp JL, Bartges JW, Osborne CA. ACVIM small animal consensus recommendations on the treatment and prevention of uroliths in dogs and cats. J Vet Intern Med. 2016;30(5):1564-1574.'
const BERENT_SUB =
  'Berent AC, Weisse CW, Bagley DH, Lamb K. Use of a subcutaneous ureteral bypass device for treatment of benign ureteral obstruction in cats: 174 ureters in 134 cats (2009-2015). J Am Vet Med Assoc. 2018;253(10):1309-1327.'
// Myasthenia gravis / megaoesophagus evidence base. Shelton is the classic
// spontaneous-remission cohort; Forgash the modern outcome cohort (the two
// disagree on remission rate — both are cited so the page can show the range).
const SHELTON_REMISSION =
  'Shelton GD, Lindstrom JM. Spontaneous remission in canine myasthenia gravis: implications for assessing human MG therapies. Neurology. 2001;57(11):2139-2141.'
const FORGASH_MG =
  'Forgash JT, Chang YM, Mittelman NS, et al. Clinical features and outcome of acquired myasthenia gravis in 94 dogs. J Vet Intern Med. 2021;35(5):2315-2326.'
const CRIDGE_NEOSTIGMINE =
  'Cridge H, Little A, José-López R, et al. The clinical utility of neostigmine administration in the diagnosis of acquired myasthenia gravis. J Vet Emerg Crit Care. 2021;31(5):647-655.'
const DEWEY_MMF =
  'Dewey CW, Cerda-Gonzalez S, Fletcher DJ, et al. Mycophenolate mofetil treatment in dogs with serologically diagnosed acquired myasthenia gravis: 27 cases (1999-2008). J Am Vet Med Assoc. 2010;236(6):664-668.'
const QUINTAVALLA_SILDENAFIL =
  'Quintavalla F, Menozzi A, Pozzoli C, et al. Sildenafil improves clinical signs and radiographic features in dogs with congenital idiopathic megaoesophagus: a randomised controlled trial. Vet Rec. 2017;180(16):404.'
// Endocrine + urolith guideline sources. AAHA is the single 2023 guideline
// covering hypoadrenocorticism, hypercortisolism and hypothyroidism, so all
// three disease pages resolve to one numbered entry.
// Organisation-as-author public-health guidance, cited as "(CDC 2026)".
const CDC_BARTONELLA =
  'Centers for Disease Control and Prevention. Veterinary Guidance for Bartonellosis. Updated March 23, 2026. https://www.cdc.gov/bartonella/hcp/veterinary-guidance/index.html'
const AAHA_ENDOCRINE =
  'Bugbee A, Rucinsky R, Cazabon S, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135.'
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
  'Cook AK, Evans JB. Feline comorbidities: recognition, diagnosis and management of the cushingoid diabetic. J Feline Med Surg. 2021;23(1):4-16.'
const BOLAND_FHAC =
  'Boland LA, Barrs VR. Peculiarities of feline hyperadrenocorticism: update on diagnosis and treatment. J Feline Med Surg. 2017;19(9):933-947.'
const VALENTIN_FHAC =
  'Valentin SY, Cortright CC, Nelson RW, et al. Clinical findings, diagnostic test results, and treatment outcome in cats with spontaneous hyperadrenocorticism: 30 cases. J Vet Intern Med. 2014;28(2):481-487.'
const KEITH_TRILOSTANE =
  'Keith AM, Bruyette D, Stanley S. Trilostane therapy for treatment of spontaneous hyperadrenocorticism in cats: 15 cases (2004-2012). J Vet Intern Med. 2013;27(6):1471-1477.'
const NEIGER_TRILOSTANE =
  'Neiger R, Witt AL, Noble A, et al. Trilostane therapy for treatment of pituitary-dependent hyperadrenocorticism in 5 cats. J Vet Intern Med. 2004;18(2):160-164.'
const MICELI_TRILOSTANE =
  'Miceli D, Tavares F, Montoya MZ, et al. Trilostane treatment for feline hypercortisolism: Latin America multicenter study, 43 cases (2012-2022). Presented at: European College of Veterinary Internal Medicine — Companion Animals Congress; 2022.'
const DALEY_METYRAPONE =
  'Daley CA, Zerbe CA, Schich RO, et al. Use of metyrapone to treat pituitary-dependent hyperadrenocorticism in a cat with large cutaneous wounds. J Am Vet Med Assoc. 1993;202(6):956-960.'
const MOORE_METYRAPONE =
  'Moore LE, Biller DS, Olsen DE. Hyperadrenocorticism treated with metyrapone followed by bilateral adrenalectomy in a cat. J Am Vet Med Assoc. 2000;217(5):691-694.'
const DUESBERG_ADRENALECTOMY =
  'Duesberg CA, Nelson RW, Feldman EC, et al. Adrenalectomy for treatment of hyperadrenocorticism in cats: 10 cases (1988-1992). J Am Vet Med Assoc. 1995;207(8):1066-1070.'
const MEIJ_HYPOPHYSECTOMY =
  'Meij BP, Voorhout G, van den Ingh TS, et al. Transsphenoidal hypophysectomy for treatment of pituitary-dependent hyperadrenocorticism in 7 cats. Vet Surg. 2001;30(1):72-86.'
const BENCHEKROUN_ACTH =
  'Benchekroun G, de Fornel-Thibaud P, Dubord M, et al. Plasma ACTH precursors in cats with pituitary-dependent hyperadrenocorticism. J Vet Intern Med. 2012;26(3):575-581.'
const HARDY_SKIN =
  'Hardy L, Gil-Morales C, Maunder C, et al. Skin fragility in a cat presenting with pituitary-dependent hyperadrenocorticism. JFMS Open Rep. 2023;9(1):20551169231171245.'
const YAYOSHI_RADIATION =
  'Yayoshi N, Hamamoto Y, Oda H, et al. Successful treatment of feline hyperadrenocorticism with pituitary macroadenoma using radiation therapy: a case study. J Vet Med Sci. 2022;84(7):898-904.'
const MUSCHNER_REMISSION =
  'Muschner AC, Varela FV, Hazuchova K, et al. Diabetes mellitus remission in a cat with pituitary-dependent hyperadrenocorticism after trilostane treatment. JFMS Open Rep. 2018;4(1):2055116918767708.'
const LIEN_IATROGENIC =
  'Lien YH, Huang HP, Chang PH. Iatrogenic hyperadrenocorticism in 12 cats. J Am Anim Hosp Assoc. 2006;42(6):414-423.'
const CHIRAYATH_IATROGENIC =
  'Chirayath D, Shaheena S. Iatrogenic hypercortisolism in a Persian kitten after topical application of a skin lotion containing clobetasol. Vet Dermatol. 2020;31(6):486-488.'

// ACVIM consensus statements — the college's own evidence-based guidelines,
// published in JVIM. Cited in preference to a textbook chapter where one exists
// for the topic, because they are the profession's agreed position.
const ACVIM_ITP_DX =
  'LeVine DN, Goggs R, Kohn B, et al. ACVIM consensus statement on the diagnosis of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4):1958. doi:10.1111/jvim.16996'
const ACVIM_ITP_TX =
  'LeVine DN, Goggs R, Kohn B, et al. ACVIM consensus statement on the treatment of immune thrombocytopenia in dogs and cats. J Vet Intern Med. 2024;38(4). doi:10.1111/jvim.17079'
const ACVIM_SE =
  'Charalambous M, Fischer A, Potschka H, et al. ACVIM consensus statement on the management of status epilepticus and cluster seizures in dogs and cats. J Vet Intern Med. 2024;38(1):19. doi:10.1111/jvim.16928'
const ACVIM_FCE =
  'Marsilio S, Freiche V, Johnson E, et al. ACVIM consensus statement guidelines on diagnosing and distinguishing low-grade neoplastic from inflammatory lymphocytic chronic enteropathies in cats. J Vet Intern Med. 2023;37(3):794. doi:10.1111/jvim.16690'

// Toxicology eBook — organisation-as-author form. Password-protected FlippingBook,
// so no URL is given; page numbers refer to the eBook's own pagination.
const VETGIRL_TOX =
  'Lee J, ed. The Ultimate Guide to Toxicology. VETgirl / ASPCA Animal Poison Control Center; 2023'

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
  'Chirayath', 'LeVine', 'Charalambous', 'Marsilio', 'VETgirl',
] as const
const SOURCE_ALT = SOURCE_NAMES.join('|')

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
    if (/^Gelatt/.test(part)) { out.push({ id: 'gelatt', text: `${GELATT_BOOK}.` }); continue }
    if (/^AHS/.test(part)) { out.push({ id: 'ahs', text: AHS_GUIDELINES }); continue }
    if (/^AAHA/.test(part)) { out.push({ id: 'aaha-endocrine', text: AAHA_ENDOCRINE }); continue }
    if (/^CDC/.test(part)) { out.push({ id: 'cdc-bartonella', text: CDC_BARTONELLA }); continue }
    if (/^FECAVA/.test(part)) { out.push({ id: 'fecava-hypoadreno', text: FECAVA_HYPOADRENO }); continue }
    if (/^Minnesota/.test(part)) { out.push({ id: 'mn-urolith', text: MN_UROLITH }); continue }
    // Journal sources are keyed by author/org marker. If a second ACVIM consensus
    // is ever cited, disambiguate on the year here (e.g. "ACVIM 2018").
    if (/^ACVIM/.test(part)) { out.push({ id: 'acvim-uroliths', text: ACVIM_UROLITHS }); continue }
    if (/^Berent/.test(part)) { out.push({ id: 'berent-sub', text: BERENT_SUB }); continue }
    if (/^Shelton/.test(part)) { out.push({ id: 'shelton-remission', text: SHELTON_REMISSION }); continue }
    if (/^Forgash/.test(part)) { out.push({ id: 'forgash-mg', text: FORGASH_MG }); continue }
    if (/^Cridge/.test(part)) { out.push({ id: 'cridge-neostigmine', text: CRIDGE_NEOSTIGMINE }); continue }
    if (/^Dewey/.test(part)) { out.push({ id: 'dewey-mmf', text: DEWEY_MMF }); continue }
    if (/^Quintavalla/.test(part)) { out.push({ id: 'quintavalla-sildenafil', text: QUINTAVALLA_SILDENAFIL }); continue }
    if (/^Cook/.test(part)) { out.push({ id: 'cook-cushingoid', text: COOK_CUSHINGOID }); continue }
    if (/^Boland/.test(part)) { out.push({ id: 'boland-fhac', text: BOLAND_FHAC }); continue }
    if (/^Valentin/.test(part)) { out.push({ id: 'valentin-fhac', text: VALENTIN_FHAC }); continue }
    if (/^Keith/.test(part)) { out.push({ id: 'keith-trilostane', text: KEITH_TRILOSTANE }); continue }
    if (/^Neiger/.test(part)) { out.push({ id: 'neiger-trilostane', text: NEIGER_TRILOSTANE }); continue }
    if (/^Miceli/.test(part)) { out.push({ id: 'miceli-trilostane', text: MICELI_TRILOSTANE }); continue }
    if (/^Daley/.test(part)) { out.push({ id: 'daley-metyrapone', text: DALEY_METYRAPONE }); continue }
    if (/^Moore/.test(part)) { out.push({ id: 'moore-metyrapone', text: MOORE_METYRAPONE }); continue }
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
