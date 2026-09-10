// ── Annotation marks: the pure range algebra ─────────────────────────────────
// A mark is a half-open character range [start, end) into the concatenated
// visible text of one rendered content page, plus the kind of decoration drawn
// over it. Everything in this file is pure and DOM-free so it can be reasoned
// about (and tested) without a browser; src/lib/annotations/dom.ts is the half
// that touches real nodes.
//
// Two invariants hold for any list that has been through `addMark` / `eraseRange`:
//   1. no two marks of the same kind overlap or touch (they are merged), and
//   2. every mark's `text` equals the page text it covers.
// Different kinds *do* overlap freely — a passage can be highlighted and
// underlined at once, and `toSegments` is what flattens that for rendering.

export type MarkKind = 'highlight' | 'underline' | 'strike'

/** Render/toolbar order; also the order kinds appear in a segment. */
export const MARK_KINDS: readonly MarkKind[] = ['highlight', 'underline', 'strike']

/** Colour tokens, not colour values — every actual colour lives in one place,
 *  the `--annot-*` custom properties in globals.css, so the two themes can
 *  differ and the toolbar swatches and the marks cannot drift apart. */
export const HIGHLIGHT_COLOURS = ['yellow', 'green', 'blue', 'pink', 'orange'] as const
export const UNDERLINE_COLOURS = ['teal', 'red', 'purple'] as const
/** Strikethrough has no palette; this is the token its marks carry. */
export const PLAIN_COLOUR = 'plain'

export type HighlightColour = (typeof HIGHLIGHT_COLOURS)[number]
export type UnderlineColour = (typeof UNDERLINE_COLOURS)[number]
export type MarkColour = HighlightColour | UnderlineColour | typeof PLAIN_COLOUR

/** The palette a tool offers. Strikethrough applies straight away. */
export function coloursFor(kind: MarkKind): readonly MarkColour[] {
  if (kind === 'highlight') return HIGHLIGHT_COLOURS
  if (kind === 'underline') return UNDERLINE_COLOURS
  return [PLAIN_COLOUR]
}

/** The colour a tool starts on, and the fallback for a mark stored before
 *  colours existed. */
export const defaultColour = (kind: MarkKind): MarkColour => coloursFor(kind)[0]

/** Whether a token is one this kind actually offers — the guard against a
 *  stale client (or a stale localStorage row) asking for a colour that has no
 *  styling behind it. */
export const isColourFor = (kind: MarkKind, colour: string): colour is MarkColour =>
  (coloursFor(kind) as readonly string[]).includes(colour)

export interface Mark {
  /** Client-minted, stable for the life of the mark — the sync key. */
  id: string
  kind: MarkKind
  /** Which of the kind's colours this mark is drawn in. */
  colour: MarkColour
  start: number
  end: number
  /** The covered text, kept so the mark can be re-found if content shifts. */
  text: string
}

/** One kind drawn in one colour — what a segment is made of. */
export interface MarkPart {
  kind: MarkKind
  colour: MarkColour
}

export interface Segment {
  start: number
  end: number
  /** Every kind covering this run, in MARK_KINDS order, with its colour. */
  parts: MarkPart[]
}

export type IdFactory = () => string

const byStart = (a: Mark, b: Mark) => a.start - b.start || a.end - b.end

/** Merge every run of the same kind *and* colour that overlaps or abuts,
 *  keeping the earliest id. Abutting ranges merge too: highlighting "acute"
 *  then "renal" in "acute renal failure" should leave one mark, not two that
 *  meet at a seam. Two colours of one kind never merge — they are different
 *  marks, and `applyMark` is what stops them overlapping. */
function mergeVariant(list: Mark[], kind: MarkKind, colour: MarkColour, fullText: string): Mark[] {
  const others = list.filter(m => m.kind !== kind || m.colour !== colour)
  const same = list.filter(m => m.kind === kind && m.colour === colour).sort(byStart)
  const merged: Mark[] = []
  for (const m of same) {
    const prev = merged[merged.length - 1]
    if (prev && m.start <= prev.end) {
      if (m.end > prev.end) prev.end = m.end
    } else {
      merged.push({ ...m })
    }
  }
  for (const m of merged) m.text = fullText.slice(m.start, m.end)
  return [...others, ...merged]
}

/** Draw `kind` in `colour` over [start, end). A no-op for an empty or
 *  inverted range. Prefer `applyMark` from the UI — this one does not clear a
 *  different colour of the same kind first, so it can leave two overlapping. */
export function addMark(
  list: Mark[],
  kind: MarkKind,
  colour: MarkColour,
  start: number,
  end: number,
  fullText: string,
  newId: IdFactory,
): Mark[] {
  if (!(end > start)) return list
  const added: Mark = { id: newId(), kind, colour, start, end, text: fullText.slice(start, end) }
  return mergeVariant([...list, added], kind, colour, fullText)
}

/** What a toolbar press means. Pressing the colour a range already carries
 *  takes the mark off; pressing any other colour recolours the range rather
 *  than stacking a second mark of the same kind underneath the first. */
export function applyMark(
  list: Mark[],
  kind: MarkKind,
  colour: MarkColour,
  start: number,
  end: number,
  fullText: string,
  newId: IdFactory,
): Mark[] {
  if (!(end > start)) return list
  if (coversRange(list, kind, start, end, colour)) {
    return eraseRange(list, kind, start, end, fullText, newId)
  }
  // Clear whatever colour of this kind was here, so a recolour replaces
  // rather than overlaps.
  const cleared = eraseRange(list, kind, start, end, fullText, newId)
  return addMark(cleared, kind, colour, start, end, fullText, newId)
}

/** Erase [start, end) from marks of `kind` — or from every kind when `kind`
 *  is null (the toolbar's "remove formatting"). A mark straddling the erased
 *  range splits in two; the left piece keeps the original id so the common
 *  case of trimming one end does not churn a row on the server. */
export function eraseRange(
  list: Mark[],
  kind: MarkKind | null,
  start: number,
  end: number,
  fullText: string,
  newId: IdFactory,
): Mark[] {
  if (!(end > start)) return list
  const out: Mark[] = []
  for (const m of list) {
    if (kind !== null && m.kind !== kind) {
      out.push(m)
      continue
    }
    if (m.end <= start || m.start >= end) {
      out.push(m)
      continue
    }
    if (m.start < start) {
      out.push({ ...m, end: start, text: fullText.slice(m.start, start) })
    }
    if (m.end > end) {
      // The left piece (if any) already claimed the original id.
      const id = m.start < start ? newId() : m.id
      out.push({ ...m, id, start: end, text: fullText.slice(end, m.end) })
    }
  }
  return out.sort(byStart)
}

/** True when every character of [start, end) already carries `kind` — and,
 *  when `colour` is given, carries it in that colour. What decides whether a
 *  toolbar press adds the mark, recolours it, or takes it away. */
export function coversRange(
  list: Mark[],
  kind: MarkKind,
  start: number,
  end: number,
  colour?: MarkColour,
): boolean {
  if (!(end > start)) return false
  let at = start
  const relevant = list.filter(
    x => x.kind === kind && (colour === undefined || x.colour === colour),
  )
  for (const m of relevant.sort(byStart)) {
    if (m.start > at) return false
    if (m.end > at) at = m.end
    if (at >= end) return true
  }
  return at >= end
}

/** The kinds covering a single character position — for the button states
 *  shown when the reader taps an existing mark instead of selecting text. */
export function kindsAt(list: Mark[], offset: number): MarkKind[] {
  const found = new Set(list.filter(m => offset >= m.start && offset < m.end).map(m => m.kind))
  return MARK_KINDS.filter(k => found.has(k))
}

/** The kind+colour pairs covering a position, in MARK_KINDS order — what the
 *  toolbar shows pressed, including which swatch is the live one. */
export function variantsAt(list: Mark[], offset: number): MarkPart[] {
  const covering = list.filter(m => offset >= m.start && offset < m.end)
  return MARK_KINDS.flatMap(kind => {
    const hit = covering.find(m => m.kind === kind)
    return hit ? [{ kind, colour: hit.colour }] : []
  })
}

/** Flatten overlapping marks of different kinds into non-overlapping runs, so
 *  the DOM pass can wrap each run in exactly one element. */
export function toSegments(list: Mark[]): Segment[] {
  if (!list.length) return []
  const edges = [...new Set(list.flatMap(m => [m.start, m.end]))].sort((a, b) => a - b)
  const segments: Segment[] = []
  const key = (parts: MarkPart[]) => parts.map(p => `${p.kind}:${p.colour}`).join()
  for (let i = 0; i < edges.length - 1; i++) {
    const start = edges[i]
    const end = edges[i + 1]
    const covering = list.filter(m => m.start <= start && m.end >= end)
    if (!covering.length) continue
    const parts = MARK_KINDS.flatMap(kind => {
      const hit = covering.find(m => m.kind === kind)
      return hit ? [{ kind, colour: hit.colour }] : []
    })
    const prev = segments[segments.length - 1]
    // Coalesce neighbouring runs that ended up with the same decoration set.
    if (prev && prev.end === start && key(prev.parts) === key(parts)) prev.end = end
    else segments.push({ start, end, parts })
  }
  return segments
}

export interface Reanchored {
  /** Marks whose offsets are valid against the current page text. */
  resolved: Mark[]
  /** Marks whose text no longer appears — kept in storage, but not drawn.
   *  Clinical content is edited between releases; a reader's highlight of a
   *  sentence that was rewritten is parked here rather than silently deleted
   *  or, worse, redrawn over unrelated words. */
  quarantined: Mark[]
}

/** Re-find each mark in the current page text, correcting offsets that have
 *  shifted. When the same excerpt occurs several times the occurrence nearest
 *  the original offset wins. */
export function reanchor(list: Mark[], fullText: string): Reanchored {
  const resolved: Mark[] = []
  const quarantined: Mark[] = []
  for (const m of list) {
    if (!m.text) {
      quarantined.push(m)
      continue
    }
    if (fullText.slice(m.start, m.end) === m.text) {
      resolved.push(m)
      continue
    }
    let best = -1
    for (let i = fullText.indexOf(m.text); i !== -1; i = fullText.indexOf(m.text, i + 1)) {
      if (best === -1 || Math.abs(i - m.start) < Math.abs(best - m.start)) best = i
    }
    if (best === -1) quarantined.push(m)
    else resolved.push({ ...m, start: best, end: best + m.text.length })
  }
  return { resolved: resolved.sort(byStart), quarantined }
}

export interface MarkDiff {
  added: Mark[]
  removed: string[]
  changed: Mark[]
}

/** What changed between two mark lists — the unit of work sent to the server
 *  (and queued when it cannot be reached). */
export function diffMarks(before: Mark[], after: Mark[]): MarkDiff {
  const beforeById = new Map(before.map(m => [m.id, m]))
  const afterById = new Map(after.map(m => [m.id, m]))
  const added: Mark[] = []
  const changed: Mark[] = []
  for (const m of after) {
    const was = beforeById.get(m.id)
    if (!was) added.push(m)
    else if (
      was.start !== m.start ||
      was.end !== m.end ||
      was.kind !== m.kind ||
      was.colour !== m.colour
    ) {
      changed.push(m)
    }
  }
  const removed = before.filter(m => !afterById.has(m.id)).map(m => m.id)
  return { added, removed, changed }
}

let counter = 0
/** Collision-resistant without needing crypto: the id only has to be unique
 *  per user, and it is minted on the device that owns the mark. */
export const makeMarkId: IdFactory = () =>
  `${Date.now().toString(36)}-${(counter++).toString(36)}-${Math.random().toString(36).slice(2, 8)}`
