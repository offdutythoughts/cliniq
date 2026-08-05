// ── Species scoping ─────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for what species a row applies to and for how
// species-scoped clinical text is written. Consumed by the disease screen (to
// filter what the Dog/Cat toggle shows), by navigation (to pick the species a
// page opens on) and by the lint guardrail — so validation can never drift
// from how the text actually renders.
//
// Authoring convention (already used by 62 disease pages before this existed):
// a pipe-markup segment may be scoped to one species by a leading marker —
//
//   breed:'Dog: Labrador, Boxer|Cat: Siamese, DSH'
//   signs:'#Dog|Polyphagia with weight gain|#Cat|Weight loss'
//
// A `#Dog` / `#Cat` header scopes every block beneath it until the next header.
// Unmarked segments are shared and show under both species.

import { SPECIES_MODE_OVERRIDE } from '../data/speciesPairs'

export type Species = 'Dog' | 'Cat'

export const SPECIES: readonly Species[] = ['Cat', 'Dog'] as const

/** Which species a free-text `sp` field claims. Handles every spelling in the
 *  DB: 'Dog', 'Cat', 'Dog + Cat', 'Cat + Dog', 'Dog (rarely Cat)'. Parenthesised
 *  rarity still counts — the species does occur, which is exactly the Insulinoma
 *  case that motivated the toggle. */
export function speciesOf(sp: string | undefined): Species[] {
  const t = typeof sp === 'string' ? sp : ''
  const out: Species[] = []
  if (/\bcats?\b|\bfeline\b/i.test(t)) out.push('Cat')
  if (/\bdogs?\b|\bcanine\b/i.test(t)) out.push('Dog')
  return out
}

/** True when this row applies to exactly one species — the case where a species
 *  can be inferred without the user choosing (a `sp:'Cat'` differential opens
 *  its disease page on Cat). */
export function soleSpecies(sp: string | undefined): Species | null {
  const list = speciesOf(sp)
  return list.length === 1 ? list[0] : null
}

/** Spread into a `{ kind:'disease' }` View to pin the species when — and only
 *  when — the source row names exactly one. A `Dog + Cat` differential leaves
 *  the choice to the page, so `{}` rather than a guess. */
export function spOf(sp: string | undefined): { sp?: Species } {
  const sole = soleSpecies(sp)
  return sole ? { sp: sole } : {}
}

// One species word, optionally qualified in brackets, then a separator. The
// qualifier is what makes `Cats (iatrogenic): Good — …` a marker rather than
// prose. The separator is a colon (tight, so `Dog:` matches) or a SPACED dash
// (loose, so `Cats — iatrogenic form` matches but `Dog-appeasing pheromone`
// does not).
const TOKEN_WORD = String.raw`(dogs?|canine|cats?|feline)`
const TOKEN = String.raw`${TOKEN_WORD}(?:\s*\([^)]{0,40}\))?`
const SEP = String.raw`\s*(?::|\s[—–-]\s)\s*`

// A leading species marker.
const MARKER = new RegExp(`^${TOKEN}${SEP}`, 'i')

// The second authored convention: a species emoji, used on 166 bullets. It
// means exactly what a `Dog:` prefix means and is unambiguous — no prose risk —
// so it scopes on its own, with no separator needed.
const EMOJI = String.raw`(🐕|🐶|🐱|🐈)️?`

// Either marker, at the start of a segment or after a sentence break. Both
// species are frequently authored in ONE segment —
//   sex:'Dog: female overrepresented. Cat: no sex predilection.'
//   prog:'Reattachment improves with early intervention. 🐱 Hypertensive RD…'
// — so scoping has to split inside a segment, not just at its start.
const INLINE_MARKER = new RegExp(`(?:^|(?<=[.;])\\s+)(?:${EMOJI}\\s*|${TOKEN}${SEP})`, 'gui')

/** Break one segment into its species-marked runs. An unmarked segment comes
 *  back as a single unscoped run, so callers can treat every segment the same. */
export function markedRuns(text: string): { sp: Species | null; text: string }[] {
  const hits = [...text.matchAll(INLINE_MARKER)]
  if (hits.length === 0) return [{ sp: null, text }]
  const runs: { sp: Species | null; text: string }[] = []
  // Text before the first marker is shared preamble, not part of either run.
  const preamble = text.slice(0, hits[0].index).trim()
  if (preamble) runs.push({ sp: null, text: preamble })
  hits.forEach((h, i) => {
    const from = h.index + h[0].length
    const to = i + 1 < hits.length ? hits[i + 1].index : text.length
    // h[1] is the emoji form, h[2] the word form — exactly one matches.
    let sp: Species = h[1]
      ? (/🐱|🐈/u.test(h[1]) ? 'Cat' : 'Dog')
      : (/^(cats?|feline)$/i.test(h[2]) ? 'Cat' : 'Dog')
    let body = text.slice(from, to).trim()
    // "🐱 Cats: depression…" — emoji AND word. Strip the word marker too, so
    // the reader isn't left with a redundant "Cats:" after choosing Cat.
    const word = markerOf(body)
    if (word.sp) { sp = word.sp; body = word.text }
    body = leadCap(body)
    if (body) runs.push({ sp, text: body })
  })
  return runs
}

/** Strip a leading species marker off one segment. Returns the species it
 *  scoped to (null when unmarked) and the segment with the marker removed —
 *  once the reader has picked a species, re-printing "Dog:" on every line is
 *  noise. */
export function markerOf(text: string): { sp: Species | null; text: string } {
  const m = text.match(MARKER)
  if (!m) return { sp: null, text }
  const sp: Species = /^(cats?|feline)$/i.test(m[1]) ? 'Cat' : 'Dog'
  return { sp, text: leadCap(text.slice(m[0].length)) }
}

/** Restore sentence case after a marker is stripped.
 *
 *  These segments were authored as "Cat: amlodipine 0.625 mg/cat PO SID" back
 *  when the prefix always rendered, so removing it would otherwise leave a
 *  bullet starting mid-sentence. A first word carrying an internal capital
 *  (pH, mRNA, eGFR, mcg/kg) is intentionally cased and left alone. */
function leadCap(text: string): string {
  const t = text.trimStart()
  const first = t[0]
  if (!first || first !== first.toLowerCase() || first === first.toUpperCase()) return t
  const word = t.split(/\s/, 1)[0] ?? ''
  if (/[A-Z]/.test(word.slice(1))) return t
  return first.toUpperCase() + t.slice(1)
}

/** The species a `#Header` scopes its section to, if any.
 *
 *  A bare `#Cats` is obvious, but headers are just as often compound —
 *  `#Iatrogenic / Cats`, `#Congenital (dogs)`, `#Cats — post-treatment`. Those
 *  head a section that is entirely about one species, so the whole section
 *  belongs to it; treating them as ordinary headers leaked feline hypothyroidism
 *  into the Dog tab.
 *
 *  A header naming BOTH species heads shared content and scopes to neither. */
function headerSpecies(text: string): Species | null {
  // Authors prefix some section headers with a species emoji (`#🐱 Cats`) — and
  // on a few the emoji is the ONLY species signal (`#🐕 Most common`), so read
  // it before stripping decoration.
  const emoji = text.trim().match(/^(🐕|🐶|🐱|🐈)/u)
  if (emoji) return /🐱|🐈/u.test(emoji[1]) ? 'Cat' : 'Dog'
  const t = text.trim().replace(/^[^\p{L}(]+/u, '')
  // A header LEADING with the species is scoping however long it runs —
  // "#Cats: doxycycline 5 mg/kg PO q12h + pradofloxacin…" is a feline section
  // whose title happens to carry the regimen.
  const lead = t.match(new RegExp(`^${TOKEN}(?:${SEP}|\\b)`, 'i'))
  if (lead) return /^(cats?|feline)$/i.test(lead[1]) ? 'Cat' : 'Dog'
  // A bracketed PREVALENCE note is not a scope. "#Exudative (most common in
  // cats)" heads a block listing both feline and canine causes — reading it as
  // a cat section hid every dog cause from the Dog tab.
  //
  // But a bracketed QUALIFIER is: "#Hypertensive emergency (older cat)" heads a
  // block of feline doses. The difference is the frequency wording, not the
  // brackets, so drop only the brackets that carry it.
  const body = t.replace(/\([^)]*\)/g, group => (PREVALENCE.test(group) ? ' ' : group))
  // Otherwise the species has to be a qualifier on a short title
  // ("#Modified Duke Criteria for dogs", "#Iatrogenic / Cats"), not a word
  // buried in prose ("#Second agent … large/steroid-intolerant dogs", which
  // heads a section listing doses for BOTH species).
  if (body.length > HEADER_QUALIFIER_MAX) return null
  const cat = /\b(cats?|feline)\b/i.test(body)
  const dog = /\b(dogs?|canine)\b/i.test(body)
  if (cat === dog) return null
  return cat ? 'Cat' : 'Dog'
}

/** Longest header in which a trailing species word still reads as a scope
 *  rather than incidental prose. Calibrated against the authored headers — the
 *  real ones cluster under ~65 characters, the false positives run 70+. */
const HEADER_QUALIFIER_MAX = 70

/** Frequency wording that turns a bracketed species mention into a comparison
 *  ("most common in cats") rather than a scope ("older cat"). A proportion
 *  counts too — "(>90% of dogs)" is a statistic about a shared section. */
const PREVALENCE = /\b(most|more|less|commonly|common|esp\.?|especially|usually|typically|particularly|mainly|often|predominant\w*|rare\w*|primarily)\b|\d\s*%|[<>]\s*\d/i

/** A species-scoped heading with the species removed — what's left is the part
 *  that still means something once the reader has chosen a species.
 *  "Cats — small cell lymphoma" → "Small cell lymphoma"; a bare "Cats" → "". */
function stripSpecies(header: string): string {
  const out = header
    .replace(/^[\s🐕🐶🐱🐈️]+/u, '')
    .replace(new RegExp(`^${TOKEN_WORD}(?:${SEP}|\\s+)`, 'i'), '')
    .replace(new RegExp(`\\s*[—–/,-]?\\s*\\b${TOKEN_WORD}\\b`, 'i'), ' ')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s—–/,:-]+|[\s—–/,:-]+$/g, '')
    .trim()
  return leadCap(out)
}

// ── The segment model ───────────────────────────────────────────────────────
// One `|`-separated segment with its species scope resolved. This is the SINGLE
// SOURCE OF TRUTH for "which species does this line belong to" — rendering
// (scopeToSpecies), toggle calibration (speciesDivergence) and the lint
// guardrail (crossTalkOf) all read it, so none of the three can drift from the
// others about what a segment means.

export interface ScopedSegment {
  /** Verbatim segment as authored, markers and all. */
  raw: string
  kind: 'header' | 'body'
  /** Leading `-` of a sub-bullet, kept so rendering round-trips. */
  lead: string
  /** Species-marked runs inside the segment; one segment may carry both. */
  runs: { sp: Species | null; text: string }[]
  /** Scope inherited from the enclosing `#Dog` heading. */
  section: Species | null
  /** Header only: the species this heading scopes its section to. */
  headerSp: Species | null
  /** Header only: the heading with the species word removed. */
  headerText: string
}

export function scopedSegments(markup: string): ScopedSegment[] {
  const out: ScopedSegment[] = []
  let section: Species | null = null
  for (const raw of markup.split('|')) {
    const t = raw.trim()
    if (t.startsWith('#')) {
      const headerSp = headerSpecies(t.slice(1))
      section = headerSp
      out.push({
        raw, kind: 'header', lead: '', runs: [], section,
        headerSp, headerText: headerSp ? stripSpecies(t.slice(1)) : '',
      })
      continue
    }
    const lead = t.startsWith('-') ? '-' : ''
    out.push({
      raw, kind: 'body', lead,
      runs: markedRuns(lead ? t.slice(1) : t),
      section, headerSp: null, headerText: '',
    })
  }
  return out
}

/** Does this segment survive when reading `sp`? An explicit marker beats the
 *  enclosing `#Dog` section — a "Cats: …" bullet written under a "#Dogs"
 *  heading is about cats, not dogs. */
export function segmentApplies(seg: ScopedSegment, sp: Species): boolean {
  if (seg.kind === 'header') return seg.headerSp === null || seg.headerSp === sp
  if (seg.runs.some(r => r.sp !== null)) return seg.runs.some(r => r.sp === null || r.sp === sp)
  return !(seg.section && seg.section !== sp)
}

/** What this segment renders as when reading `sp` — '' when it renders nothing.
 *  A species heading keeps everything APART from the species: a bare "#Cats"
 *  carries nothing once you've chosen Cat, but "#Cats — small cell lymphoma"
 *  carries the distinction between two protocols. */
export function segmentText(seg: ScopedSegment, sp: Species): string {
  if (seg.kind === 'header') {
    if (!seg.headerSp) return seg.raw
    return seg.headerText ? '#' + seg.headerText : ''
  }
  if (!seg.runs.some(r => r.sp !== null)) return seg.raw
  const kept = seg.runs.filter(r => r.sp === null || r.sp === sp)
  return kept.length ? seg.lead + kept.map(r => r.text).join(' ') : ''
}

/** Filter pipe-markup down to one species, in pipe-markup form.
 *
 *  Runs BEFORE parseBlocks/grouping/citation numbering, so every downstream
 *  consumer sees exactly the text the reader sees — reference numbers stay in
 *  step with the visible body, and the bare-header guardrail still applies to
 *  the filtered result. */
export function scopeToSpecies(markup: string, sp: Species): string {
  const segs = scopedSegments(markup)
  // Single unmarked field (`age:'Middle-aged to older.'`) — nothing to scope.
  if (!markup.includes('|') && segs.every(s => s.runs.every(r => r.sp === null))) return markup

  const out: string[] = []
  for (const seg of segs) {
    if (!segmentApplies(seg, sp)) continue
    const text = segmentText(seg, sp)
    if (text) out.push(text)
  }

  // A normal `#Header` whose blocks were all species-scoped away would render
  // as a bare header (the "wall of green" anti-pattern) — drop it too.
  const scoped = dropBareHeaders(out).join('|')

  // Safety net. Where a whole field sits under one species' heading —
  // "#CHOP protocol — dogs" is the entirety of the lymphoma tx1 — scoping it
  // away leaves the other species an EMPTY Treatment card, which a clinician
  // reads as "no treatment" rather than "not written for cats". Falling back to
  // the unfiltered field keeps its heading visible, so the text stays labelled
  // as the species it belongs to. Never hide a section with nothing to replace
  // it: a wrong scope must degrade to showing more, not to showing nothing.
  if (!scoped.replace(/\|/g, '').trim() && markup.trim()) return markup
  return scoped
}

function dropBareHeaders(segs: string[]): string[] {
  return segs.filter((seg, i) => {
    if (!seg.trim().startsWith('#')) return true
    const next = segs[i + 1]
    return next !== undefined && !next.trim().startsWith('#')
  })
}

/** Does this markup say anything species-specific at all? Drives the lint
 *  report of Dog + Cat pages that still render identically under both tabs. */
export function hasSpeciesScope(markup: string): boolean {
  return scopedSegments(markup).some(s => s.headerSp !== null || s.runs.some(r => r.sp !== null))
}

/** The species a `sp` field flags as rare ('Dog (rarely Cat)' → 'Cat'). The
 *  disease does occur there, so the reader can still choose it — but the label
 *  says so, because "rare in cats" changes the index of suspicion. */
export function rareSpecies(sp: string | undefined): Species | null {
  const m = (typeof sp === 'string' ? sp : '').match(/\(\s*rare(?:ly)?\s+(dogs?|cats?)/i)
  if (!m) return null
  return /^c/i.test(m[1]) ? 'Cat' : 'Dog'
}

/** Fields whose content must differ before a page earns a Dog/Cat toggle.
 *
 *  Signalment (breed/age/sex) is deliberately NOT here. Nearly every page names
 *  different breeds per species, and that alone is not a reason to make the
 *  reader choose a species before reading — the breed line can simply show both.
 *  The toggle is for conditions that are genuinely a different disease per
 *  species: different cause, presentation, workup, treatment or outlook. */
export const SPLIT_FIELDS = [
  'etiology', 'path', 'signs', 'severe', 'conf', 'supp',
  'tx1', 'tx2', 'outpatient', 'monitor', 'prog',
] as const

/** How a page presents species. Derived from the content, so a page gains its
 *  toggle the moment species-specific clinical text is authored — there is no
 *  second flag to keep in step with the writing.
 *
 *   · 'single' — one species (static tag; a sibling page may cover the other)
 *   · 'split'  — both species, and the clinical content genuinely differs
 *   · 'shared' — both species, same workup (CKD): one 'Dog + Cat' tag, no toggle
 */
export type SpeciesMode = 'single' | 'split' | 'shared'

/** Share of clinical text that belongs to one species rather than both.
 *
 *  Counting FIELDS that contain a marker is the wrong measure: a field with one
 *  cat-specific line among ten shared ones renders near-identically under both
 *  tabs. Eosinophilic gastroenteritis tripped that bar with 8% of its content
 *  species-specific — a chooser in front of two pages that read the same. This
 *  measures characters, so the bar tracks what the reader actually sees differ. */
export function speciesDivergence(row: Record<string, unknown>): number {
  let total = 0
  let scoped = 0
  for (const field of SPLIT_FIELDS) {
    const value = row[field]
    if (typeof value !== 'string') continue
    for (const seg of scopedSegments(value)) {
      if (seg.kind === 'header') continue
      total += seg.raw.trim().length
      const marked = seg.runs.filter(r => r.sp !== null)
      if (marked.length > 0) scoped += marked.reduce((n, r) => n + r.text.length, 0)
      else if (seg.section) scoped += seg.raw.trim().length
    }
  }
  return total > 0 ? scoped / total : 0
}

/** How much of a page must be species-specific before the reader is asked to
 *  choose. Below the bar nothing is hidden — 'shared' mode does no filtering, so
 *  a "Cat: …" line still renders inline with its prefix. The bar only decides
 *  whether choosing is *required*, and a toggle over two near-identical tabs is
 *  worse than no toggle: it implies a difference that isn't there. */
const SPLIT_THRESHOLD = 0.2

/** The fields DiseasePageView actually renders, in render order.
 *
 *  `synonyms` is deliberately absent: it feeds search only, so cross-species
 *  wording there ("Cat scratch disease (in humans)") reaches no reader. */
export const RENDERED_FIELDS = [
  'topAlert', 'severe', 'etiology', 'breed', 'age', 'sex', 'risk', 'path',
  'signs', 'conf', 'supp', 'tx1', 'tx2', 'outpatient', 'monitor', 'prog',
  'ddx', 'pearl',
] as const

export interface CrossTalk { field: string; sp: Species; text: string }

/** Text that survives scoping but discusses ONLY the other species — shared by
 *  markup, not by meaning ("Exudative (most common in cats)" heading the Dog
 *  tab). Reported rather than enforced: some of it is a deliberate comparison
 *  ("similar to cats") that belongs where it is, so it needs an author's
 *  judgement. Only meaningful on pages that actually filter, i.e. mode
 *  'split'. */
export function crossTalkOf(row: Record<string, unknown>): CrossTalk[] {
  const out: CrossTalk[] = []
  if (speciesMode(row) !== 'split') return out
  for (const field of RENDERED_FIELDS) {
    const value = row[field]
    if (typeof value !== 'string' || !value.trim()) continue
    for (const sp of speciesOf(row.sp as string)) {
      for (const seg of scopeToSpecies(value, sp).split('|')) {
        const text = seg.replace(/^[#-]/, '').trim()
        if (!text) continue
        const other = sp === 'Dog' ? CAT_WORDS : DOG_WORDS
        const own = sp === 'Dog' ? DOG_WORDS : CAT_WORDS
        if (other.test(text) && !own.test(text)) out.push({ field, sp, text })
      }
    }
  }
  return out
}

const CAT_WORDS = /\b(cats?|feline|kittens?)\b/i
const DOG_WORDS = /\b(dogs?|canine|pupp(y|ies))\b/i

export function speciesMode(row: Record<string, unknown>): SpeciesMode {
  if (speciesOf(row.sp as string).length < 2) return 'single'
  // Clinical judgement beats the character-count proxy where someone has
  // actually read both tabs.
  const override = SPECIES_MODE_OVERRIDE[row.id as string]
  if (override) return override
  return speciesDivergence(row) >= SPLIT_THRESHOLD ? 'split' : 'shared'
}
