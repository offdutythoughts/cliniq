'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useTutorial, TUTORIAL_STEPS } from '../app/tutorial/TutorialContext'
import { useNav } from '../app/nav/NavContext'
import { styleStringToObject as s } from '../app/screens/style'

interface StepDef {
  selector: string | null   // null = centered card (no spotlight)
  title: string
  body: string
  navTab?: number           // switch to this tab before showing
  tipPos: 'above' | 'below' | 'center'
}

const STEPS: StepDef[] = [
  {
    selector: null,
    title: "Let's take a quick tour",
    body: "We'll walk you through the 5 key features of ClinIQ. Tap Next to begin, or Skip to dismiss.",
    tipPos: 'center',
  },
  {
    selector: '[data-tutorial="bottom-nav"]',
    title: 'Navigate between sections',
    body: 'These 6 tabs take you to Clinical signs, Diagnostic approaches, Diseases, Mix & Match, Protocols, and Settings.',
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
    selector: '[data-tutorial="notes-btn"]',
    title: 'Per-page notes',
    body: 'The Notes button opens a scratchpad tied to the current page. Notes are saved locally and persist across sessions.',
    tipPos: 'below',
  },
  {
    selector: '[data-tutorial="settings-tab"]',
    title: 'Settings & this guide',
    body: 'Adjust your theme, text size, or revisit the How to use guide any time from here.',
    tipPos: 'above',
  },
]

interface Rect { top: number; left: number; width: number; height: number }

const PAD = 10  // spotlight padding around target

export function TutorialOverlay() {
  const { step, next, skip, total } = useTutorial()
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
    if (step < 0) { setRect(null); prevStepRef.current = -1; return }
    const def = STEPS[step]
    const prevStep = prevStepRef.current
    prevStepRef.current = step

    const needsNavChange = def.navTab !== undefined && def.navTab !== nav.tab
    const prevNeedsNav = prevStep >= 0 && STEPS[prevStep]?.navTab !== undefined

    if (needsNavChange || prevNeedsNav) {
      if (def.navTab !== undefined) nav.navTo(def.navTab as 0|1|2|3|4|5)
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

        <div style={s('display:flex;align-items:center;justify-content:space-between;gap:10px;')}>
          <button
            onClick={skip}
            style={s('font-size:12px;color:var(--gray2);background:transparent;border:none;cursor:pointer;padding:4px 0;')}
          >
            Skip tour
          </button>
          <button
            onClick={next}
            style={s('padding:9px 20px;background:var(--teal);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;')}
          >
            {step === total - 1 ? 'Done ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </>
  )
}
