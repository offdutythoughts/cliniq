'use client'
// ── Navigation context ──────────────────────────────────────────────────────
// The React replacement for the legacy imperative engine (history[] / push /
// replace / goBack / navTo / slideDir in the deleted cliniqApp.ts). The current screen is a
// `View` (data); the back stack is `View[]`; re-rendering a screen is just
// <Screen view={...}/>. No window globals, no HMR callback plumbing.
//
// ── The URL is the address of the current screen ────────────────────────────
// It did not used to be. Every navigation called `history.pushState(state, '')`
// with NO url, purely so a browser Back press had an entry to consume. The
// address bar therefore said `/app` on every screen in the product, which meant
// a vet could not bookmark a protocol, send a colleague a disease page, or press
// reload without being dropped back on tab 0 mid-consult.
//
// Now each navigation writes `viewHref(view)`, and the back stack rides along in
// `history.state`. That stack is what makes Back restore a real trail rather
// than a depth counter: a popstate hands us the exact stack that entry was
// pushed with, and history.state survives a reload, so even the trail behind a
// refreshed page is intact.
//
// Entries pushed before this change (or by a hard deep link) carry no stack; the
// URL alone is then authoritative and the trail starts fresh from it.

import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef, type ReactNode } from 'react'
import type { View, Tab } from './view'
import { decodeHref, viewHref } from './viewUrl'
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

/** Which bottom-nav tab a screen belongs under. A deep link arrives with no
 *  history behind it, so the tab has to be inferred or the reader lands with
 *  the wrong section highlighted. Mirrors KIND_SECTION in view.ts. */
const TAB_FOR_KIND: Record<Exclude<View['kind'], 'tab'>, Tab> = {
  flow: 0, dx: 1, disease: 2, protocol: 4,
  lesionLoc: 0, subTypeDetail: 0, diff: 0,
}

/** A tab root already names its own tab; only the other kinds have to be
 *  inferred. The table used to carry a `tab: 0` row and every caller looked the
 *  tab root up by kind, which pinned it to 0 — so popping back to a tab root
 *  from a dx or disease page dropped the reader on Clinical whatever tab they
 *  had actually come from. */
function tabForView(v: View): Tab {
  return v.kind === 'tab' ? v.tab : TAB_FOR_KIND[v.kind] ?? 0
}

/** What we keep on each history entry: the back trail as of that entry. */
interface HistoryState { cliniqStack?: View[] }

/** Write an entry, PRESERVING whatever else is on it.
 *
 *  Next.js keeps its own router bookkeeping in history.state (`__NA`, an
 *  internals tree). Passing a bare object to pushState/replaceState drops it,
 *  and a Next entry missing its router state gets corrected by the router —
 *  which showed up as the address bar stepping back a screen on its own after a
 *  reload. Spread first, then add ours. */
function writeHistory(mode: 'push' | 'replace', stack: View[], href: string): void {
  const next = { ...(history.state ?? {}), cliniqStack: stack } satisfies HistoryState
  if (mode === 'push') history.pushState(next, '', href)
  else history.replaceState(next, '', href)
}

export function NavProvider({ children, initialView }: { children: ReactNode; initialView?: View }) {
  const [st, setSt] = useState<NavState>(() => {
    const v = initialView ?? { kind: 'tab' as const, tab: 0 as Tab }
    return {
      tab: tabForView(v),
      // A deep link opens ON its screen, so it is the whole trail. Back from
      // there leaves for wherever the reader came from, which is correct — the
      // app never had that page's parent in this session.
      stack: v.kind === 'tab' ? [] : [v],
      slideDir: 'right',
      tick: 0,
    }
  })
  // The stack, mirrored outside React state.
  //
  // The history writes below used to happen INSIDE the setSt updater, which is a
  // side effect in a reducer: React is free to run an updater more than once (or
  // to discard and replay a render), and each run would have pushed another
  // entry. It also made the write asynchronous with the call that caused it — so
  // `navigate(v)` returned before the address bar had moved, and anything
  // reading the URL straight afterwards saw the previous screen.
  //
  // Computing the next stack from a ref lets the history write be synchronous
  // and happen exactly once, with setSt left as a pure state update.
  const stackRef = useRef<View[]>(st.stack)
  const tabRef = useRef<Tab>(st.tab)

  /** The one place stack/tab/history move together. */
  const commit = useCallback((mode: 'push' | 'replace' | 'none', stack: View[], tab: Tab, slideDir: 'left' | 'right') => {
    stackRef.current = stack
    tabRef.current = tab
    if (mode !== 'none') {
      const top = stack.length ? stack[stack.length - 1] : ({ kind: 'tab', tab } as View)
      writeHistory(mode, stack, viewHref(top))
    }
    setSt(s => ({ ...s, stack, tab, slideDir }))
  }, [])

  // Adopt the trail already on this history entry, or seed one if there isn't
  // one.
  //
  // A reload does NOT start a new entry — history.state survives it — so the
  // entry we mount on usually already knows the full trail behind it. Writing a
  // fresh single-item stack here instead truncated that trail to just the
  // current page on every refresh, and, if it landed after the reader had
  // already pressed Back, rewrote the entry they had just moved to with the
  // wrong URL. Read first, write only when there is nothing to read.
  //
  // The setState here is a sync FROM an external store (history.state), done
  // once on mount. It cannot move into render: this component server-renders,
  // where `history` does not exist, so reading it in the state initialiser would
  // make the client's first render disagree with the server's.
  useEffect(() => {
    const v = initialView ?? { kind: 'tab' as const, tab: 0 as Tab }
    const saved = (history.state as HistoryState | null)?.cliniqStack
    if (saved) {
      const top = saved.length ? saved[saved.length - 1] : undefined
      // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
      commit('none', saved, top ? tabForView(top) : st.tab, 'right')
      return
    }
    commit('replace', v.kind === 'tab' ? [] : [v], tabForView(v), 'right')
    // Once, for the entry we mounted on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Browser back/forward — registered in the capture phase so it runs before
  // Next.js's router listener and can stop propagation.
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      // Always intercept: prevent Next.js from treating this as a route change.
      e.stopImmediatePropagation()
      // The entry being restored knows its own trail. Where it doesn't (an entry
      // from before this shipped, or a hard deep link), the URL is authoritative
      // and the trail restarts from it.
      const saved = (e.state as HistoryState | null)?.cliniqStack
      const fromUrl = decodeHref(location.pathname + location.search)
      const stack = saved ?? (fromUrl && fromUrl.kind !== 'tab' ? [fromUrl] : [])
      const top = stack.length ? stack[stack.length - 1] : fromUrl
      // 'none': the browser has already moved the URL — writing it again here
      // would add an entry on top of the one we just went back to.
      commit('none', stack, top ? tabForView(top) : 0, 'left')
    }
    window.addEventListener('popstate', onPopState, { capture: true })
    return () => window.removeEventListener('popstate', onPopState, { capture: true })
  }, [commit])

  const navigate = useCallback((v: View) => {
    const props: Record<string, unknown> = { content_type: v.kind }
    if ('id' in v) props.content_id = v.id
    if ('flowId' in v) props.content_id = v.flowId
    if ('sign' in v) props.content_id = v.sign
    track('content_navigated', props)
    commit('push', [...stackRef.current, v], tabForView(v), 'right')
  }, [commit])
  const replace = useCallback((v: View) => {
    const cur = stackRef.current
    commit('replace', cur.length ? [...cur.slice(0, -1), v] : [v], tabForView(v), 'right')
  }, [commit])
  // Let the browser drive: history.back() fires the popstate handler above,
  // which restores that entry's trail and its URL together. Moving the state
  // here as well would advance them independently, which is how they drift
  // apart. Only ever called when the back control is shown (stack non-empty).
  const goBack = useCallback(() => { history.back() }, [])
  const navTo = useCallback((tab: Tab) => {
    // No-op guard: re-committing would change the memoized nav identity, which
    // can re-fire effects that depend on nav (render loop).
    if (stackRef.current.length === 0 && tabRef.current === tab) return
    // replace, not push: the bottom nav is a mode switch, not a step in a trail,
    // and stacking six tabs behind a Back press was never the intent.
    commit('replace', [], tab, 'right')
  }, [commit])
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
