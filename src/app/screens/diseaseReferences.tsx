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

/** A numbered reference-list entry: `n` is its AMA number on this page. */
export interface RefEntry { n: number; id: string; text: string }

/** Matches an inline source-citation parenthetical whose content starts with a
 *  known source: "(Ettinger …)" / "(Gelatt …)". A leading space is consumed so
 *  the marker sits flush against the preceding punctuation. Non-source
 *  parentheticals (e.g. "(as for most cases)") are left untouched. */
const CITE = /\s?\(((?:Ettinger|Gelatt|AHS|ACVIM|Berent)[^)]*)\)/g

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
    // Journal sources are keyed by author/org marker. If a second ACVIM consensus
    // is ever cited, disambiguate on the year here (e.g. "ACVIM 2018").
    if (/^ACVIM/.test(part)) { out.push({ id: 'acvim-uroliths', text: ACVIM_UROLITHS }); continue }
    if (/^Berent/.test(part)) { out.push({ id: 'berent-sub', text: BERENT_SUB }); continue }
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
  return /\((?:Ettinger|Gelatt|AHS)/.test(text)
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
