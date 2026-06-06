'use client'
import { useEffect, useRef } from 'react'
import { useSearch } from './SearchContext'

// Elements whose text should not be highlighted (inputs, scripts, the search bar itself)
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'BUTTON', 'NOSCRIPT'])
const HIGHLIGHT_MARK = 'search-highlight'

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Walk all text nodes under root, skipping SKIP_TAGS and .global-search-wrap */
function* textNodes(root: Node): Generator<Text> {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const parent = node.parentElement
    if (!parent) continue
    if (SKIP_TAGS.has(parent.tagName)) continue
    if (parent.closest('.global-search-wrap')) continue
    if ((node as Text).textContent?.trim()) yield node as Text
  }
}

/** Remove all existing highlight marks, restoring original text nodes */
function removeHighlights(root: HTMLElement) {
  const marks = root.querySelectorAll(`mark.${HIGHLIGHT_MARK}`)
  marks.forEach(mark => {
    const parent = mark.parentNode
    if (!parent) return
    parent.replaceChild(document.createTextNode(mark.textContent ?? ''), mark)
    parent.normalize()
  })
}

/** Unhide all previously hidden cards/sections */
function unhideAll(root: HTMLElement) {
  root.querySelectorAll('[data-search-hidden]').forEach(el => {
    ;(el as HTMLElement).style.display = ''
    el.removeAttribute('data-search-hidden')
  })
}

/** Apply highlights and return match count */
function applyHighlights(root: HTMLElement, query: string): number {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi')
  let count = 0

  // Collect text nodes first (can't modify DOM while walking)
  const nodes = Array.from(textNodes(root))

  for (const node of nodes) {
    const text = node.textContent ?? ''
    if (!regex.test(text)) continue
    regex.lastIndex = 0

    const frag = document.createDocumentFragment()
    let last = 0
    let m: RegExpExecArray | null
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)))
      const mark = document.createElement('mark')
      mark.className = HIGHLIGHT_MARK
      mark.textContent = m[1]
      frag.appendChild(mark)
      count++
      last = m.index + m[1].length
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)))
    node.parentNode?.replaceChild(frag, node)
  }

  return count
}

/** Hide .card elements (and .fn-ep rows) that contain no highlight marks.
 *  Skips elements with data-search-match (matched via data-level search, not DOM text). */
function hideEmptyCards(root: HTMLElement) {
  const selectors = ['.card', '.fn-ep', '.proto-section', '.dx-row']
  selectors.forEach(sel => {
    root.querySelectorAll(sel).forEach(el => {
      const htmlEl = el as HTMLElement
      if (htmlEl.dataset.searchMatch) return  // kept by data-level filter
      if (!el.querySelector(`mark.${HIGHLIGHT_MARK}`)) {
        htmlEl.dataset.searchHidden = '1'
        htmlEl.style.display = 'none'
      }
    })
  })
}

export function useSearchHighlight(screenRef: React.RefObject<HTMLElement | null>) {
  const { query, setMatchCount } = useSearch()
  // Stable ref to avoid stale closure issues
  const queryRef = useRef(query)
  queryRef.current = query

  useEffect(() => {
    const root = screenRef.current
    if (!root) return

    // Clean up previous state
    removeHighlights(root)
    unhideAll(root)

    if (!query.trim()) {
      setMatchCount(0)
      return
    }

    const count = applyHighlights(root, query.trim())
    setMatchCount(count)
    hideEmptyCards(root)
  })
  // Run after every render so newly mounted screen content gets highlighted.
  // removeHighlights + applyHighlights is cheap enough for the page sizes here.
}
