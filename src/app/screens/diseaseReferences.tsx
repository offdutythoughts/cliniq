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
const ETTINGER_BOOK =
  'Ettinger SJ, Feldman EC, Côté E, eds. Ettinger’s Textbook of Veterinary Internal Medicine. 9th ed. Elsevier; 2024'
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
const AAHA_ENDOCRINE =
  'Bugbee A, Rucinsky R, Cazabon S, et al. 2023 AAHA Selected Endocrinopathies of Dogs and Cats Guidelines. J Am Anim Hosp Assoc. 2023;59(3):113-135.'
// Organisation-as-author guideline form (as for AHS) — FECAVA does not publish
// per-guideline author/journal metadata on its resource page.
const FECAVA_HYPOADRENO =
  'Federation of European Companion Animal Veterinary Associations. FECAVA Endocrinology Guidelines: Canine Hypoadrenocorticism. FECAVA; 2023. https://www.fecava.org/fecava-endocrinology-guidelines'
const MN_UROLITH =
  'Minnesota Urolith Center. Annual Report: Canine and Feline Urolith Submissions. University of Minnesota College of Veterinary Medicine; 2020. https://vetmed.umn.edu/centers-programs/minnesota-urolith-center'

/** A numbered reference-list entry: `n` is its AMA number on this page. */
export interface RefEntry { n: number; id: string; text: string }

/** Matches an inline source-citation parenthetical whose content starts with a
 *  known source: "(Ettinger …)" / "(Gelatt …)". A leading space is consumed so
 *  the marker sits flush against the preceding punctuation. Non-source
 *  parentheticals (e.g. "(as for most cases)") are left untouched. */
const CITE = /\s?\(((?:Ettinger|Gelatt|AHS|AAHA|FECAVA|Minnesota|ACVIM|Berent|Shelton|Forgash|Cridge|Dewey|Quintavalla)[^)]*)\)/g

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
 *  <Cite> falls back to when no page numbering is in scope). */
export interface CiteSegment { text: string; citeIds?: string[]; raw?: string }
export function splitCitations(text: string): CiteSegment[] {
  const out: CiteSegment[] = []
  let last = 0
  for (const m of text.matchAll(CITE)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) })
    out.push({ text: '', citeIds: parseSources(m[1]).map(s => s.id), raw: m[0] })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

/** True if the text contains at least one inline source citation. */
export function hasCitation(text: string): boolean {
  return /\((?:Ettinger|Gelatt|AHS|AAHA|FECAVA|Minnesota|ACVIM|Berent|Shelton|Forgash|Cridge|Dewey|Quintavalla)/.test(text)
}

/** Map of source id → its AMA number on the current page. */
export const CitationContext = createContext<Map<string, number>>(new Map())

/** A superscript citation marker, resolving its source ids to page numbers. When
 *  no numbering is in scope (screens other than the disease page), it renders the
 *  raw citation text unchanged, so those pages look exactly as before. */
export function Cite({ ids, fallback }: { ids: string[]; fallback?: string }) {
  const numberOf = useContext(CitationContext)
  const nums = ids.map(id => numberOf.get(id)).filter((n): n is number => n != null)
  if (nums.length === 0) return <>{fallback ?? ''}</>
  return <sup className="cite-ref">{nums.sort((a, b) => a - b).join(',')}</sup>
}
