'use client'
import { createContext, useContext, useState, useCallback } from 'react'

interface TutorialCtx {
  step: number   // -1 = inactive
  start: () => void
  next: () => void
  back: () => void
  skip: () => void
  total: number
}

const Ctx = createContext<TutorialCtx | null>(null)

// Must equal STEPS.length in TutorialOverlay.tsx — which adds the feedback
// button step only when there is a Convex backend for it to send to.
export const TUTORIAL_STEPS = process.env.NEXT_PUBLIC_CONVEX_URL ? 9 : 8

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(-1)
  const start = useCallback(() => setStep(0), [])
  const next  = useCallback(() => setStep(s => (s + 1 >= TUTORIAL_STEPS ? -1 : s + 1)), [])
  const back  = useCallback(() => setStep(s => (s <= 0 ? s : s - 1)), [])
  const skip  = useCallback(() => setStep(-1), [])
  return (
    <Ctx.Provider value={{ step, start, next, back, skip, total: TUTORIAL_STEPS }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTutorial() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTutorial must be used inside TutorialProvider')
  return ctx
}
