'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  applySegments,
  clearMarks,
  collapseSelection,
  MARK_ATTR,
  markOffsetFromEvent,
  pageText,
  selectionRange,
} from '../lib/annotations/dom'
import {
  applyMark,
  coversRange,
  defaultColour,
  eraseRange,
  makeMarkId,
  reanchor,
  toSegments,
  variantsAt,
  type Mark,
  type MarkColour,
  type MarkKind,
  type MarkPart,
} from '../lib/annotations/marks'
import type { AnnotationStore } from './useAnnotations'

/** What the floating toolbar renders. `target` is the range the buttons act
 *  on — either the reader's selection or the mark they tapped. */
export interface AnnotationUi {
  target: { start: number; end: number } | null
  rect: DOMRect | null
  /** Kind+colour pairs already covering the whole target, shown pressed —
   *  which is also how the palette knows which swatch is the live one. */
  active: MarkPart[]
  /** Whether the target carries anything to remove. */
  hasMarks: boolean
  /** Which gesture opened the toolbar. A selection toolbar closes when the
   *  selection goes; one opened by tapping a mark must not, because that tap
   *  clears the selection and would otherwise close it immediately. */
  source: 'selection' | 'mark' | null
}

const EMPTY_UI: AnnotationUi = { target: null, rect: null, active: [], hasMarks: false, source: null }

const signature = (marks: Mark[]) =>
  marks.map(m => `${m.id}:${m.kind}:${m.colour}:${m.start}:${m.end}`).sort().join('|')

/**
 * Draws the page's marks into the rendered screen and turns the reader's
 * selection into new ones.
 *
 * Must be called *after* `useSearchHighlight` on the same container: both
 * rewrap text nodes on every render, and whichever runs last owns the final
 * DOM. Running last means a search highlight nested inside a mark is rebuilt
 * around it rather than tearing it out.
 */
export function useAnnotationLayer(
  screenRef: React.RefObject<HTMLElement | null>,
  store: AnnotationStore,
  pageKey: string,
) {
  const { marks, commit, clearAll } = store
  const [ui, setUi] = useState<AnnotationUi>(EMPTY_UI)
  // Read by the redraw, which also runs from a MutationObserver and so cannot
  // close over one render's values.
  const marksRef = useRef(marks)

  // The marks as currently drawn (offsets valid against the text on screen)
  // and the ones parked because their text no longer appears. Operations run
  // against the first group and pass the second through untouched.
  const resolved = useRef<Mark[]>([])
  const quarantined = useRef<Mark[]>([])
  const correctedTo = useRef('')
  // How many wrapper elements the last draw left behind, so a draw that the
  // search highlighter has since torn out can be told from one still intact.
  const drawnCount = useRef(0)

  const commitRef = useRef(commit)
  useEffect(() => {
    commitRef.current = commit
  }, [commit])

  // Draw the marks into whatever is currently on screen. Safe to call at any
  // time: wrapping inserts elements but never alters text, so the offsets it
  // reads stay valid as it runs, and it no-ops when the picture already matches.
  const redraw = useCallback(() => {
    const root = screenRef.current
    if (!root) return
    const marks = marksRef.current
    const text = pageText(root)
    const next = reanchor(marks, text)
    resolved.current = next.resolved
    quarantined.current = next.quarantined

    // Rewrap only when the picture would actually change. This runs after
    // every render — including the ones caused by the reader dragging out a
    // selection — and rebuilding text nodes underneath a live selection
    // destroys it. The stamp lives on the keyed inner element, so navigating
    // to a new page (a fresh element) always redraws; the wrapper count
    // catches the other way a draw is lost, the search highlighter rebuilding
    // text nodes that had marks nested inside them.
    const sig = signature(next.resolved)
    const inner = root.firstElementChild as HTMLElement | null
    const intact =
      inner?.dataset.annotSig === sig &&
      root.querySelectorAll(`[${MARK_ATTR}]`).length === drawnCount.current
    if (!intact) {
      clearMarks(root)
      applySegments(root, toSegments(next.resolved))
      drawnCount.current = root.querySelectorAll(`[${MARK_ATTR}]`).length
      if (inner) inner.dataset.annotSig = sig
    }

    // Content edited between releases shifts every offset after the edit.
    // Persist the corrected anchors once, so the next edit diffs against what
    // is actually on screen. Converges: after the write the stored offsets
    // match, and the guard stops it repeating in the meantime.
    const shifted = next.resolved.some(m => {
      const stored = marks.find(s => s.id === m.id)
      return stored !== undefined && (stored.start !== m.start || stored.end !== m.end)
    })
    if (shifted && correctedTo.current !== sig) {
      correctedTo.current = sig
      commitRef.current([...next.quarantined, ...next.resolved])
    }
  }, [screenRef])

  // Redraw after every render of the host — navigation, and a change to the
  // mark list itself.
  useEffect(() => {
    marksRef.current = marks
    redraw()
  })

  // …and after every render the host did *not* take part in. A screen can
  // re-render on its own — a species toggle, a step expanding, a search
  // filter hiding cards — and those renders replace the very text nodes the
  // marks are wrapped around. Without this the marks would silently vanish
  // until the next navigation. Our own wrapping is re-entrant here only to
  // the extent of one extra no-op pass, because `redraw` bails out when what
  // is on screen already matches.
  useEffect(() => {
    const root = screenRef.current
    if (!root || typeof MutationObserver === 'undefined') return
    let frame = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(redraw)
    })
    observer.observe(root, { childList: true, subtree: true, characterData: true })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [screenRef, redraw])

  const hide = useCallback(() => setUi(EMPTY_UI), [])

  // Raised while a press on the toolbar is in flight. On a touch screen that
  // press collapses the text selection, and without this the resulting
  // `selectionchange` would unmount the toolbar before the tap became a click.
  const interacting = useRef(false)
  const beginInteract = useCallback(() => {
    interacting.current = true
  }, [])
  useEffect(() => {
    // Lowered a task after the pointer lifts: `click` fires before this runs,
    // so the button's handler is still covered, while a press that ends
    // without a click (a drag off the button) does not latch the flag on.
    const release = () => setTimeout(() => {
      interacting.current = false
    }, 0)
    document.addEventListener('pointerup', release)
    document.addEventListener('pointercancel', release)
    return () => {
      document.removeEventListener('pointerup', release)
      document.removeEventListener('pointercancel', release)
    }
  }, [])

  // A new page means a new offset space; anything the toolbar was pointing at
  // is meaningless now.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUi(EMPTY_UI)
    correctedTo.current = ''
  }, [pageKey])

  const showFor = useCallback(
    (start: number, end: number, rect: DOMRect | null, source: 'selection' | 'mark') => {
      const list = resolved.current
      const active = variantsAt(list, start).filter(p =>
        coversRange(list, p.kind, start, end, p.colour),
      )
      setUi({
        target: { start, end },
        rect,
        active,
        hasMarks: list.some(m => m.start < end && m.end > start),
        source,
      })
    },
    [],
  )

  // Watch the selection. `selectionchange` is the only event that fires for
  // every way a range can be made — drag, long-press handles, shift-arrow,
  // and the iOS selection loupe — so it is the single source here.
  useEffect(() => {
    const root = screenRef.current
    if (!root) return
    let frame = 0
    const check = () => {
      cancelAnimationFrame(frame)
      // One frame late: on iOS the range is not final until the touch settles.
      frame = requestAnimationFrame(() => {
        const range = selectionRange(root)
        if (!range) {
          if (interacting.current) return // a tap on the toolbar itself
          // Only a selection toolbar closes here — see AnnotationUi.source.
          setUi(prev => (prev.source === 'selection' ? EMPTY_UI : prev))
          return
        }
        showFor(range.start, range.end, range.rect, 'selection')
      })
    }
    document.addEventListener('selectionchange', check)
    return () => {
      document.removeEventListener('selectionchange', check)
      cancelAnimationFrame(frame)
    }
  }, [screenRef, showFor])

  // Tapping an existing mark opens the same toolbar, so a highlight can be
  // undone without re-selecting the exact words that made it.
  useEffect(() => {
    const root = screenRef.current
    if (!root) return
    const onClick = (e: MouseEvent) => {
      const offset = markOffsetFromEvent(root, e.target)
      if (offset === null) return
      // Ignore the click that ends a drag-selection; that path is handled by
      // `selectionchange` and already has the right range.
      if (selectionRange(root)) return
      const covering = resolved.current.filter(m => offset >= m.start && offset < m.end)
      if (!covering.length) return
      const start = Math.min(...covering.map(m => m.start))
      const end = Math.max(...covering.map(m => m.end))
      const el = e.target instanceof Element ? e.target : (e.target as Node).parentElement
      showFor(start, end, el?.getBoundingClientRect() ?? null, 'mark')
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [screenRef, showFor])

  // Scrolling or resizing moves the text out from under a fixed toolbar.
  useEffect(() => {
    if (!ui.target) return
    const root = screenRef.current
    window.addEventListener('resize', hide)
    root?.addEventListener('scroll', hide, { passive: true })
    return () => {
      window.removeEventListener('resize', hide)
      root?.removeEventListener('scroll', hide)
    }
  }, [ui.target, screenRef, hide])

  /** Apply one kind in one colour over the toolbar's target range. Pressing
   *  the colour already there removes the mark; pressing another recolours it
   *  — see `applyMark`. */
  const toggle = useCallback(
    (kind: MarkKind, colour: MarkColour = defaultColour(kind)) => {
      const root = screenRef.current
      if (!root || !ui.target) return
      const { start, end } = ui.target
      const next = applyMark(
        resolved.current,
        kind,
        colour,
        start,
        end,
        pageText(root),
        makeMarkId,
      )
      commit([...quarantined.current, ...next])
      collapseSelection()
      hide()
    },
    [screenRef, ui.target, commit, hide],
  )

  /** Strip every kind from the target range. */
  const eraseTarget = useCallback(() => {
    const root = screenRef.current
    if (!root || !ui.target) return
    const { start, end } = ui.target
    const next = eraseRange(resolved.current, null, start, end, pageText(root), makeMarkId)
    commit([...quarantined.current, ...next])
    collapseSelection()
    hide()
  }, [screenRef, ui.target, commit, hide])

  const clearPage = useCallback(() => {
    clearAll()
    collapseSelection()
    hide()
  }, [clearAll, hide])

  return { ui, toggle, eraseTarget, clearPage, hide, beginInteract, markCount: marks.length }
}
