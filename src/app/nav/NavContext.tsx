'use client'
// ── Navigation context ──────────────────────────────────────────────────────
// The React replacement for the legacy imperative engine (history[] / push /
// replace / goBack / navTo / slideDir in cliniqApp.ts). The current screen is a
// `View` (data); the back stack is `View[]`; re-rendering a screen is just
// <Screen view={...}/>. No window globals, no HMR callback plumbing.

import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef, type ReactNode } from 'react'
import type { View } from './view'
import type { Tab } from '../../types'
import { track } from '../../lib/analytics'

export interface Nav {
  /** The screen currently shown: top of the stack, or the tab root. */
  view: View
  stack: View[]
  tab: Tab
  slideDir: 'left' | 'right'
  /** Bumped by refresh() to force a re-render without changing the view. */
  tick: number
  /** Push a new screen (forward slide). */
  navigate: (v: View) => void
  /** Replace the current screen in place (e.g. dx tab switches). */
  replace: (v: View) => void
  /** Pop back one screen (reverse slide). */
  goBack: () => void
  /** Switch bottom-nav tab, clearing the back stack. */
  navTo: (tab: Tab) => void
  /** Re-render the current view (e.g. after a theme toggle / system expand). */
  refresh: () => void
}

interface NavState {
  tab: Tab
  stack: View[]
  slideDir: 'left' | 'right'
  tick: number
}

const NavCtx = createContext<Nav | null>(null)

export function NavProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState<NavState>({ tab: 0, stack: [], slideDir: 'right', tick: 0 })
  // Set when ClinIQ's own back button calls history.back(), so the resulting
  // popstate event doesn't trigger a second pop.
  const suppressPopRef = useRef(false)

  // Seed browser history with a depth-0 entry so there is always a ClinIQ
  // entry to absorb a browser back press before leaving the page.
  useEffect(() => {
    history.replaceState({ cliniqDepth: 0 }, '')
  }, [])

  // Browser back/forward button handler — registered in the capture phase so
  // it runs before Next.js's router listener and can stop propagation.
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      // Always intercept: prevent Next.js from treating this as a route change.
      e.stopImmediatePropagation()
      if (suppressPopRef.current) {
        suppressPopRef.current = false
        return
      }
      setSt(s => {
        if (s.stack.length === 0) {
          // Nothing left to pop — re-push so the browser can't navigate away.
          history.pushState({ cliniqDepth: 0 }, '')
          return s
        }
        return { ...s, stack: s.stack.slice(0, -1), slideDir: 'left' }
      })
    }
    window.addEventListener('popstate', onPopState, { capture: true })
    return () => window.removeEventListener('popstate', onPopState, { capture: true })
  }, [])

  const navigate = useCallback((v: View) => {
    const props: Record<string, unknown> = { content_type: v.kind }
    if ('id' in v) props.content_id = v.id
    if ('flowId' in v) props.content_id = v.flowId
    if ('sign' in v) props.content_id = v.sign
    track('content_navigated', props)
    setSt(s => {
      const newStack = [...s.stack, v]
      history.pushState({ cliniqDepth: newStack.length }, '')
      return { ...s, stack: newStack, slideDir: 'right' }
    })
  }, [])
  const replace = useCallback((v: View) => {
    setSt(s => {
      const newStack = s.stack.length ? [...s.stack.slice(0, -1), v] : [v]
      history.replaceState({ cliniqDepth: newStack.length }, '')
      return { ...s, stack: newStack, slideDir: 'right' }
    })
  }, [])
  const goBack = useCallback(() => {
    setSt(s => {
      if (s.stack.length === 0) return s
      suppressPopRef.current = true
      history.back()
      return { ...s, stack: s.stack.slice(0, -1), slideDir: 'left' }
    })
  }, [])
  const navTo = useCallback((tab: Tab) => {
    setSt(s => {
      history.replaceState({ cliniqDepth: 0 }, '')
      return { ...s, tab, stack: [], slideDir: 'right' }
    })
  }, [])
  const refresh = useCallback(() => {
    setSt(s => ({ ...s, tick: s.tick + 1 }))
  }, [])

  const nav = useMemo<Nav>(() => {
    const view: View = st.stack.length ? st.stack[st.stack.length - 1] : { kind: 'tab', tab: st.tab }
    return { view, stack: st.stack, tab: st.tab, slideDir: st.slideDir, tick: st.tick, navigate, replace, goBack, navTo, refresh }
  }, [st.stack, st.tab, st.slideDir, st.tick, navigate, replace, goBack, navTo, refresh])

  return <NavCtx.Provider value={nav}>{children}</NavCtx.Provider>
}

export function useNav(): Nav {
  const ctx = useContext(NavCtx)
  if (!ctx) throw new Error('useNav must be used within <NavProvider>')
  return ctx
}
