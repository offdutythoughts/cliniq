'use client'
// ── Annotation marks: the DOM half ───────────────────────────────────────────
// Turns character offsets (src/lib/annotations/marks.ts) into real wrapped
// nodes inside the rendered screen, and turns a reader's text selection back
// into offsets.
//
// The offset space is deliberately the simplest one available: the raw
// concatenation of every descendant text node, in document order — which is
// exactly what `Element.textContent` and `Range.toString()` both produce. No
// tag is skipped and no whitespace is collapsed, so the offsets a selection
// yields and the offsets the renderer walks can never drift apart.
//
// Wrapping is safe to repeat: it inserts elements but never changes a single
// character of text, so offsets survive it — which is also why this can run
// alongside the search highlighter over the same nodes.

import type { Segment } from './marks'

/** Marks the wrapper elements this module owns, and carries the kind list. */
export const MARK_ATTR = 'data-annot'
/** Start offset of the wrapped run, so a tap can find the mark under it. */
export const MARK_START_ATTR = 'data-annot-start'
/** Colour token per kind, kept in its own attribute so the stylesheet can key
 *  off it without the kind list turning into a combinatorial mess. */
const COLOUR_ATTR: Record<string, string> = {
  highlight: 'data-annot-hl',
  underline: 'data-annot-ul',
}

/** The page text every offset in this module indexes into. */
export const pageText = (root: HTMLElement): string => root.textContent ?? ''

/** Character offset of a DOM point, or -1 when the point is outside `root`.
 *  Works for both text points and element/child-index points (which is what a
 *  triple-click or a select-all hands back). */
export function charOffset(root: HTMLElement, node: Node, nodeOffset: number): number {
  if (!root.contains(node)) return -1
  const range = document.createRange()
  range.selectNodeContents(root)
  try {
    range.setEnd(node, nodeOffset)
  } catch {
    return -1
  }
  return range.toString().length
}

export interface SelectionRange {
  start: number
  end: number
  /** Viewport box of the selection, for placing the toolbar. */
  rect: DOMRect
}

/** The reader's current selection as offsets, or null when there is nothing
 *  usable — collapsed, outside the content, or only whitespace. */
export function selectionRange(root: HTMLElement): SelectionRange | null {
  const sel = typeof window === 'undefined' ? null : window.getSelection()
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  let start = charOffset(root, range.startContainer, range.startOffset)
  let end = charOffset(root, range.endContainer, range.endOffset)
  if (start < 0 || end < 0) return null
  if (start > end) [start, end] = [end, start]
  // Trim the edges: a drag that overshoots by a space or a line break should
  // not leave a highlight hanging past the last word.
  const text = pageText(root)
  while (start < end && /\s/.test(text[start])) start++
  while (end > start && /\s/.test(text[end - 1])) end--
  if (end <= start) return null
  return { start, end, rect: range.getBoundingClientRect() }
}

/** Offset of an existing mark the reader tapped, or null. Reads the wrapper's
 *  recorded start rather than re-measuring, so it is exact. */
export function markOffsetFromEvent(root: HTMLElement, target: EventTarget | null): number | null {
  if (!(target instanceof Node) || !root.contains(target)) return null
  const el = target instanceof Element ? target : target.parentElement
  const wrapper = el?.closest(`[${MARK_START_ATTR}]`)
  if (!wrapper) return null
  const start = Number(wrapper.getAttribute(MARK_START_ATTR))
  return Number.isFinite(start) ? start : null
}

/** Every text node under `root` in document order, with its start offset. */
function indexTextNodes(root: HTMLElement): { node: Text; start: number }[] {
  const out: { node: Text; start: number }[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let pos = 0
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n as Text
    out.push({ node: text, start: pos })
    pos += text.data.length
  }
  return out
}

/** Unwrap every mark this module drew, leaving the text (and anything else
 *  nested inside, such as a search highlight) exactly where it was. */
export function clearMarks(root: HTMLElement): void {
  for (const el of root.querySelectorAll(`[${MARK_ATTR}]`)) {
    const parent = el.parentNode
    if (!parent) continue
    while (el.firstChild) parent.insertBefore(el.firstChild, el)
    parent.removeChild(el)
    parent.normalize()
  }
}

/** Wrap each segment's characters in one span carrying its kinds. Segments
 *  must be non-overlapping and sorted — `toSegments` guarantees both. */
export function applySegments(root: HTMLElement, segments: Segment[]): void {
  if (!segments.length) return
  // Index first: replacing a node mid-walk would invalidate the walker.
  for (const { node, start } of indexTextNodes(root)) {
    const end = start + node.data.length
    if (end === start) continue
    const hits = segments.filter(s => s.start < end && s.end > start)
    if (!hits.length) continue
    const data = node.data
    const frag = document.createDocumentFragment()
    let cursor = start
    for (const seg of hits) {
      const from = Math.max(seg.start, start)
      const to = Math.min(seg.end, end)
      if (from > cursor) frag.appendChild(document.createTextNode(data.slice(cursor - start, from - start)))
      const span = document.createElement('span')
      span.setAttribute(MARK_ATTR, seg.parts.map(p => p.kind).join(' '))
      span.setAttribute(MARK_START_ATTR, String(seg.start))
      for (const part of seg.parts) {
        const attr = COLOUR_ATTR[part.kind]
        if (attr) span.setAttribute(attr, part.colour)
      }
      span.textContent = data.slice(from - start, to - start)
      frag.appendChild(span)
      cursor = to
    }
    if (cursor < end) frag.appendChild(document.createTextNode(data.slice(cursor - start)))
    node.parentNode?.replaceChild(frag, node)
  }
}

/** Drop the reader's selection once a mark has been drawn from it, so the
 *  toolbar closes and the blue selection tint stops fighting the highlight. */
export function collapseSelection(): void {
  if (typeof window === 'undefined') return
  window.getSelection()?.removeAllRanges()
}
