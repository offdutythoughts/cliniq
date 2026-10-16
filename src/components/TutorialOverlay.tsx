'use client'
import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { useTutorial, TUTORIAL_STEPS } from '../app/tutorial/TutorialContext'
import { useNav } from '../app/nav/NavContext'
import type { Tab } from '../app/nav/view'
import { styleStringToObject as s } from '../app/screens/style'
import { MaterialIcon, type MaterialIconName } from './MaterialIcon'

interface StepDef {
  selector: string | null   // null = centered card (no spotlight)
  title: string
  body: string
  navTab?: number           // switch to this tab before showing
  tipPos: 'above' | 'below' | 'center'
  demo?: ReactNode          // shown between the body and the buttons
}

// The mark-up tools only appear over a live text selection, so there is nothing
// on screen to spotlight. Instead the step shows a sample line marked with the
// real `data-annot*` attributes — globals.css draws them exactly as it draws a
// reader's own marks, in either theme — beside a replica of the toolbar.
const DEMO_TOOLS: { icon: MaterialIconName; label: string; swatch?: string }[] = [
  { icon: 'format_ink_highlighter', label: 'Highlight', swatch: 'var(--annot-hl-yellow)' },
  { icon: 'format_underlined', label: 'Underline', swatch: 'var(--annot-ul-red)' },
  { icon: 'format_strikethrough', label: 'Strike' },
]

const AnnotateDemo = (
  <div aria-hidden="true" style={s('margin-bottom:16px;padding:12px;border-radius:12px;background:var(--navy);border:1px solid var(--border2);')}>
    <div style={s('font-size:13px;color:var(--white);line-height:1.6;margin-bottom:12px;')}>
      Ionised Ca high with <span data-annot="highlight" data-annot-hl="yellow">PTH low</span> — check PTHrP for{' '}
      <span data-annot="underline" data-annot-ul="red">hypercalcaemia of malignancy</span>;{' '}
      <span data-annot="strike">primary hyperparathyroidism</span> unlikely.
    </div>
    <div style={s('display:flex;justify-content:center;gap:8px;')}>
      {DEMO_TOOLS.map(t => (
        <div key={t.label} style={s('display:flex;flex-direction:column;align-items:center;gap:4px;')}>
          <div style={s('width:40px;height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:8px;border:1px solid var(--border2);background:var(--navy2);color:var(--white);')}>
            <MaterialIcon name={t.icon} size={18} />
            {t.swatch && <span style={{ width: 16, height: 3, borderRadius: 2, background: t.swatch }} />}
          </div>
          <div style={s('font-size:10px;color:var(--gray2);')}>{t.label}</div>
        </div>
      ))}
    </div>
  </div>
)

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
const FEEDBACK_SELECTOR = '[data-tutorial="feedback-btn"]'

const STEPS: StepDef[] = [
  {
    selector: null,
    title: "Let's take a quick tour",
    body: "We'll walk you through the key features of Vetic, including the newest ones. Tap Next to begin, or Skip to dismiss.",
    tipPos: 'center',
  },
  {
    selector: '[data-tutorial="bottom-nav"]',
    title: 'Navigate between sections',
    body: 'These 7 tabs take you to Clinical signs, Diagnostic approaches, Diseases, Interpretation, Mix & Match, Protocols, and Settings.',
    tipPos: 'above',
  },
  {
    selector: '[data-tutorial="search"]',
    title: 'Search everything',
    body: 'Find any disease, clinical sign, or protocol instantly. Results filter in real time across all content.',
    navTab: 0,
    tipPos: 'below',
  },
  {
    selector: '.screen-inner .card',
    title: 'Clinical sign flowcharts',
    body: 'Tap any clinical sign to open a step-by-step diagnostic flow — from localisation through to differentials and treatment.',
    navTab: 0,
    tipPos: 'below',
  },
  {
    selector: null,
    title: 'New: mark up the text',
    body: 'Select any text on a page to highlight it (5 colours), underline it (3 colours) or strike it through. Tap a mark later to recolour or remove it. Marks stay with that page, and sync to your account when you are signed in.',
    tipPos: 'center',
    demo: AnnotateDemo,
  },
  {
    selector: '[data-tutorial="notes-btn"]',
    title: 'Per-page notes',
    body: 'The Notes button opens a scratchpad tied to the current page. Notes work offline, sync to your account when you are signed in, and the picker lets you jump between pages you have notes on.',
    tipPos: 'below',
  },
  // Convex builds only: the feedback button exists only for signed-in readers.
  ...(hasConvex ? [{
    selector: FEEDBACK_SELECTOR,
    title: 'New: tell us what is wrong',
    body: 'The 💬 Feedback button is how you report a problem on the page you are on — a wrong dose, a missing differential, a broken link. The page is attached for you; select some text first and it is quoted too. Drag the button anywhere if it is in the way.',
    tipPos: 'above' as const,
  }] : []),
  {
    selector: '[data-tutorial="case-triage"]',
    title: 'New: case triage',
    body: 'Mix & Match ranks differentials from the signalment and signs you enter. Or tap here to paste case notes in plain English — common vet abbreviations are read, and any it does not recognise are flagged with a suggested fix.',
    navTab: 3,
    tipPos: 'below',
  },
  {
    selector: '[data-tutorial="settings-tab"]',
    title: 'Settings & this guide',
    body: 'Adjust your theme, text size, or revisit the How to use guide any time from here.',
    tipPos: 'above',
  },
]

/** The tour step that explains the feedback button (-1 when there is none);
 *  reaching it retires the button's one-off tip. */
export const FEEDBACK_TOUR_STEP = STEPS.findIndex(st => st.selector === FEEDBACK_SELECTOR)

// The context owns the step count (next/back clamp to it); the two must agree
// or the tour ends early or walks off the end of this list.
if (STEPS.length !== TUTORIAL_STEPS) {
  console.error(`TutorialOverlay: ${STEPS.length} steps but TUTORIAL_STEPS is ${TUTORIAL_STEPS}`)
}

interface Rect { top: number; left: number; width: number; height: number }

const PAD = 10  // spotlight padding around target

export function TutorialOverlay() {
  const { step, next, back, skip, total } = useTutorial()
  const nav = useNav()
  const [rect, setRect] = useState<Rect | null>(null)
  const prevStepRef = useRef(-1)

  const measure = useCallback((sel: string | null) => {
    if (!sel) { setRect(null); return }
    const el = document.querySelector(sel)
    if (!el) { setRect(null); return }
    const r = el.getBoundingClientRect()
    setRect({ top: r.top - PAD, left: r.left - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 })
  }, [])

  useEffect(() => {
    // The spotlight rectangle is measured from the live DOM, so it can only be
    // derived in an effect — there is nothing to compute it from during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (step < 0) { setRect(null); prevStepRef.current = -1; return }
    const def = STEPS[step]
    const prevStep = prevStepRef.current
    prevStepRef.current = step

    const needsNavChange = def.navTab !== undefined && def.navTab !== nav.tab
    const prevNeedsNav = prevStep >= 0 && STEPS[prevStep]?.navTab !== undefined

    if (needsNavChange || prevNeedsNav) {
      if (needsNavChange) nav.navTo(def.navTab as Tab)
      // Wait for the tab switch + render
      const id = setTimeout(() => measure(def.selector), 200)
      return () => clearTimeout(id)
    }

    // Small delay for first render
    const id = setTimeout(() => measure(def.selector), 50)
    return () => clearTimeout(id)
  }, [step, measure, nav])

  if (step < 0) return null

  const def = STEPS[step]
  const isCenter = def.tipPos === 'center' || rect === null

  // ── Tooltip positioning ───────────────────────────────────────────────────
  const viewH = typeof window !== 'undefined' ? window.innerHeight : 812
  const viewW = typeof window !== 'undefined' ? window.innerWidth : 390

  let tipStyle: React.CSSProperties = {}
  if (isCenter) {
    tipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: Math.min(360, viewW - 32),
    }
  } else if (rect) {
    const spaceBelow = viewH - (rect.top + rect.height)
    const useAbove = def.tipPos === 'above' || spaceBelow < 200
    tipStyle = {
      position: 'fixed',
      left: Math.max(8, Math.min(rect.left, viewW - 336)),
      width: Math.min(320, viewW - 32),
      ...(useAbove
        ? { bottom: viewH - rect.top + 8 }
        : { top: rect.top + rect.height + 8 }),
    }
  }

  const progress = step + 1

  return (
    <>
      {/* Dim layer — full screen */}
      <div
        style={s('position:fixed;inset:0;z-index:9000;')}
        onClick={skip}
      />

      {/* Spotlight cutout (box-shadow trick) */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9001,
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            borderRadius: 10,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.72)',
            pointerEvents: 'none',
            outline: '2px solid var(--teal)',
          }}
        />
      )}

      {/* If no spotlight, draw a full scrim */}
      {!rect && (
        <div style={s('position:fixed;inset:0;z-index:9001;background:rgba(0,0,0,0.72);pointer-events:none;')} />
      )}

      {/* Tooltip card */}
      <div
        style={{
          ...tipStyle,
          zIndex: 9002,
          background: 'var(--navy2)',
          border: '1px solid var(--border2)',
          borderRadius: 16,
          padding: '18px 18px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress dots */}
        <div style={s('display:flex;align-items:center;gap:5px;margin-bottom:12px;')}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === step ? 'var(--teal)' : 'var(--border2)',
                transition: 'width .25s, background .25s',
                flexShrink: 0,
              }}
            />
          ))}
          <div style={s('margin-left:auto;font-size:11px;color:var(--gray2);font-weight:500;')}>{progress} / {total}</div>
        </div>

        <div style={s('font-size:15px;font-weight:700;color:var(--white);margin-bottom:6px;')}>{def.title}</div>
        <div style={s('font-size:13px;color:var(--gray);line-height:1.55;margin-bottom:16px;')}>{def.body}</div>
        {def.demo}

        <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px;')}>
          <button
            onClick={skip}
            style={s('font-size:12px;color:var(--gray2);background:transparent;border:none;cursor:pointer;padding:4px 0;')}
          >
            Skip tour
          </button>
          <div style={s('display:flex;align-items:center;gap:8px;')}>
            {step > 0 && (
              <button
                onClick={back}
                style={s('padding:9px 16px;background:transparent;color:var(--gray);border:1px solid var(--border2);border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;')}
              >
                ← Back
              </button>
            )}
            <button
              onClick={next}
              style={s('padding:9px 20px;background:var(--teal);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;')}
            >
              {step === total - 1 ? 'Done ✓' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
