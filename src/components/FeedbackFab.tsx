'use client'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { api } from '../../convex/_generated/api'
import { useTutorial } from '../app/tutorial/TutorialContext'
import { track } from '../lib/analytics'
import { FEEDBACK_TOUR_STEP } from './TutorialOverlay'

// The floating 💬 Feedback button. It floats rather than living in the top bar
// so it is reachable from every screen, and it can be dragged anywhere because
// any fixed position will sooner or later sit on top of something a reader
// needs to see. The spot is remembered per device — it depends on that
// device's screen, so it has no business following the account around.
//
// The word "Feedback" stays on the button permanently: an emoji alone does not
// say what it does. The one-off tip below explains the rest.

const POS_KEY = 'cliniq-feedback-fab-pos'
/** A press that moves less than this is a tap, not a drag. */
const DRAG_SLOP = 6
const EDGE = 8
/** Nominal button size — h-9 and the width of "💬 Feedback". */
const FAB_W = 112
const FAB_H = 36

/** Position as fractions of the viewport, so a rotation or a resize keeps the
 *  button roughly where the reader put it instead of flinging it off-screen. */
interface Pos { x: number; y: number }

// The saved spot, read through useSyncExternalStore: localStorage does not
// exist during the server render, and reading it in a state initialiser would
// paint the button in a different place on the client than on the server.
const listeners = new Set<() => void>()
function readRaw(): string | null {
  try { return localStorage.getItem(POS_KEY) } catch { return null }
}
function parsePos(raw: string | null): Pos | null {
  if (!raw) return null
  try {
    const p = JSON.parse(raw) as Pos
    return Number.isFinite(p.x) && Number.isFinite(p.y) ? p : null
  } catch { return null }
}
function writePos(p: Pos | null) {
  try {
    if (p) localStorage.setItem(POS_KEY, JSON.stringify(p))
    else localStorage.removeItem(POS_KEY)
  } catch { /* private mode: the move still holds until reload */ }
  listeners.forEach((l) => l())
}
const subscribePos = (cb: () => void) => {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

const subscribeResize = (cb: () => void) => {
  window.addEventListener('resize', cb)
  return () => window.removeEventListener('resize', cb)
}
const viewportKey = () => `${window.innerWidth}x${window.innerHeight}`

interface Props {
  /** Opens the feedback sheet, with the selection as it stood when pressed. */
  onOpen: (selection: Selection | null) => void
}

export default function FeedbackFab({ onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const saved = parsePos(useSyncExternalStore(subscribePos, readRaw, () => null))
  const [drag, setDrag] = useState<{ left: number; top: number } | null>(null)
  const press = useRef<{ dx: number; dy: number; x0: number; y0: number; moved: boolean } | null>(null)
  // Re-render on resize so the clamp below re-runs against the new viewport.
  useSyncExternalStore(subscribeResize, viewportKey, () => '')

  // Render-time clamping uses the button's nominal size (refs cannot be read
  // while rendering); drags use the measured box.
  const measured = () => {
    const r = ref.current?.getBoundingClientRect()
    return { w: r?.width ?? FAB_W, h: r?.height ?? FAB_H }
  }
  const clamp = (left: number, top: number, { w, h } = { w: FAB_W, h: FAB_H }) => ({
    left: Math.min(Math.max(EDGE, left), window.innerWidth - w - EDGE),
    top: Math.min(Math.max(EDGE, top), window.innerHeight - h - EDGE),
  })

  // Where the button is drawn. Unplaced, it sits bottom-right above the
  // bottom nav; placed, at the reader's spot, clamped into the viewport.
  let style: React.CSSProperties
  if (drag) {
    style = { left: drag.left, top: drag.top }
  } else if (saved) {
    style = clamp(saved.x * window.innerWidth, saved.y * window.innerHeight)
  } else {
    style = { right: 14, bottom: 'calc(84px + env(safe-area-inset-bottom))' }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    // Keeps focus where it was, so the reader's text selection survives the
    // press and can be attached to the report.
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    press.current = {
      dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY,
      moved: false,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const p = press.current
    if (!p) return
    if (!p.moved && Math.hypot(e.clientX - p.x0, e.clientY - p.y0) < DRAG_SLOP) return
    p.moved = true
    setDrag(clamp(e.clientX - p.dx, e.clientY - p.dy, measured()))
  }
  const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const p = press.current
    press.current = null
    if (!p) return
    if (p.moved && drag) {
      const next = { x: drag.left / window.innerWidth, y: drag.top / window.innerHeight }
      writePos(next)
      setDrag(null)
      track('feedback_button_moved')
      return
    }
    setDrag(null)
    if (e.type === 'pointerup') onOpen(window.getSelection())
  }

  // Keyboard: Enter/Space open it (native button behaviour, via onClick with
  // detail 0); Alt+arrows nudge it, Alt+0 puts it back.
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!e.altKey) return
    const r = e.currentTarget.getBoundingClientRect()
    const step = 24
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
    }
    if (e.key === '0') { e.preventDefault(); writePos(null); return }
    const m = moves[e.key]
    if (!m) return
    e.preventDefault()
    const c = clamp(r.left + m[0], r.top + m[1], { w: r.width, h: r.height })
    const next = { x: c.left / window.innerWidth, y: c.top / window.innerHeight }
    writePos(next)
  }

  return (
    <>
      <button
        ref={ref}
        type="button"
        data-feedback-btn
        data-tutorial="feedback-btn"
        aria-label="Send feedback about this page. Drag to move."
        title="Send feedback about this page — drag to move"
        className={`fixed z-[90] flex items-center gap-1.5 h-9 pl-2.5 pr-3 rounded-full border border-(--color-line) bg-(--color-surface-2) text-(--color-fg) text-[12px] font-semibold shadow-[0_4px_14px_rgba(0,0,0,.35)] select-none touch-none ${drag ? 'cursor-grabbing scale-105' : 'cursor-grab'} transition-transform duration-150`}
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        // Pointer presses are handled above; this only fires for the keyboard.
        onClick={(e) => { if (e.detail === 0) onOpen(window.getSelection()) }}
        onKeyDown={onKeyDown}
      >
        <span aria-hidden="true" className="text-[15px] leading-none">💬</span>
        Feedback
      </button>
      <FeedbackHint anchor={ref} placed={style} />
    </>
  )
}

// ── One-off tip ─────────────────────────────────────────────────────────────
// Shown once per account, to existing users as well as new ones. It waits
// until the welcome sheet has been dealt with and no tour is running, so it
// never stacks on top of either; a reader who reaches the tour's feedback step
// has had the explanation already, and that step marks the tip seen.

function FeedbackHint({ anchor, placed }: { anchor: React.RefObject<HTMLButtonElement | null>; placed: React.CSSProperties }) {
  const onboarding = useQuery(api.onboarding.status)
  const status = useQuery(api.onboarding.hintStatus, { hint: 'feedbackButton' })
  const markSeen = useMutation(api.onboarding.markHintSeen)
  const { step } = useTutorial()
  const [dismissed, setDismissed] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const dismiss = useCallback(() => {
    setDismissed(true)
    void markSeen({ hint: 'feedbackButton' })
  }, [markSeen])

  useEffect(() => {
    if (step === FEEDBACK_TOUR_STEP && status?.authenticated && !status.seen) {
      void markSeen({ hint: 'feedbackButton' })
    }
  }, [step, status, markSeen])

  const visible =
    !dismissed &&
    step < 0 &&
    onboarding?.authenticated === true && onboarding.seen &&
    status?.authenticated === true && !status.seen

  // The tip is placed against the button's live box, which only exists in the
  // DOM — so it is measured after paint, and again whenever the button moves.
  const placedKey = JSON.stringify(placed)
  useEffect(() => {
    if (!visible) return
    const measure = () => setRect(anchor.current?.getBoundingClientRect() ?? null)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [visible, anchor, placedKey])

  if (!visible || !rect) return null

  const width = Math.min(280, window.innerWidth - 2 * EDGE)
  const left = Math.min(Math.max(EDGE, rect.right - width), window.innerWidth - width - EDGE)
  const above = rect.top > window.innerHeight / 2
  const pos: React.CSSProperties = above
    ? { left, bottom: window.innerHeight - rect.top + 10, width }
    : { left, top: rect.bottom + 10, width }

  return (
    <div
      role="dialog"
      aria-label="About the feedback button"
      data-feedback-hint
      className="fixed z-[91] rounded-xl border border-(--color-accent) bg-(--color-surface-2) py-3 px-3.5 shadow-[0_8px_28px_rgba(0,0,0,.45)]"
      style={pos}
    >
      <div className="text-[13px] font-semibold text-(--color-fg)">💬 This button is for feedback</div>
      <p className="mt-1 mb-0 text-[12px] leading-[1.5] text-(--color-muted)">
        Spotted a wrong dose, a missing differential or a broken page? Tap <b>Feedback</b> to tell us —
        the page you are on is attached automatically. Select some text first and it is quoted too.
      </p>
      <p className="mt-1.5 mb-0 text-[12px] leading-[1.5] text-(--color-muted)">
        In the way? <b>Drag it anywhere</b> on the screen.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-2.5 w-full h-8 rounded-lg border-0 bg-[var(--teal)] text-white text-[12px] font-semibold cursor-pointer hover:brightness-[1.15]"
      >
        Got it
      </button>
    </div>
  )
}
