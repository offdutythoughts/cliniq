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

/** A numbered reference-list entry: `n` is its AMA number on this page. */
export interface RefEntry { n: number; id: string; text: string }

/** Matches an inline source-citation parenthetical whose content starts with a
 *  known source: "(Ettinger …)" / "(Gelatt …)". A leading space is consumed so
 *  the marker sits flush against the preceding punctuation. Non-source
 *  parentheticals (e.g. "(as for most cases)") are left untouched. */
const CITE = /\s?\((Ettinger[^)]*|Gelatt[^)]*)\)/g

/** Parse a citation's inner text into one source per cited chapter. An Ettinger
 *  citation with chapters yields one entry per chapter (per-chapter numbering);
 *  "Ettinger 9e" with no chapter, or Gelatt, yields a single book-level entry. */
export function parseSources(inner: string): { id: string; text: string }[] {
  if (/^Gelatt/.test(inner)) return [{ id: 'gelatt', text: `${GELATT_BOOK}.` }]
  const chapters = inner.match(/Ch(?:apter|\.)?\s*([\d,\s]+)/)
  if (!chapters) return [{ id: 'ettinger', text: `${ETTINGER_BOOK}.` }]
  const nums = chapters[1].match(/\d+/g) ?? []
  return nums.map(n => ({ id: `ettinger-ch${n}`, text: `${ETTINGER_BOOK}: chap ${n}.` }))
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
  return /\((?:Ettinger|Gelatt)/.test(text)
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
  return <sup className="cite-ref">{nums.join(',')}</sup>
}
