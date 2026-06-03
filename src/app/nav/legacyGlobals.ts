'use client'
// ── Migration bridge: legacy window globals → React navigation ───────────────
// TEMPORARY. While screens are still rendered from legacy HTML strings (see
// Screen.tsx / renderViewToString), the inline `onclick="renderX(...)"` handlers
// baked into that HTML call window globals. Here we re-point those globals at
// the React nav context so a tap inside legacy markup drives the real router.
// Deleted in Phase 5 once every screen is a component and no legacy HTML (and
// thus no inline onclick) remains.

import type { Nav } from './NavContext'
import { filterDiffs, filterDiseases, toggleSystemState } from '../../lib/cliniqApp'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function installBridgeGlobals(nav: Nav) {
  const w = window as any
  // Tabs + back
  w.navTo = (n: number) => nav.navTo(n as 0 | 1 | 2 | 3 | 4)
  w.goBack = () => nav.goBack()
  w.renderLocalise = () => nav.navTo(0)
  w.renderLesionHome = () => nav.navTo(1)
  w.renderDiseaseHome = () => nav.navTo(2)
  w.renderProtoList = () => nav.navTo(3)
  // Navigation into detail screens
  w.renderFlowId = (id: string) => nav.navigate({ kind: 'flow', flowId: id })
  w.renderDxId = (sign: string, tab?: string) => nav.navigate({ kind: 'dx', sign, tab: (tab as 'history' | 'exam' | 'dx') || 'history' })
  w.renderDiseasePage = (id: string) => nav.navigate({ kind: 'disease', id })
  w.renderProtoDetail = (id: string) => nav.navigate({ kind: 'protocol', id })
  w.goLesionTab = (loc: string, name: string) => nav.navigate({ kind: 'lesionLoc', loc, name })
  w.renderLesionDetail = (id: string) => nav.navigate({ kind: 'lesionDetail', id })
  w.renderSubTypeDetail = (id: string) => nav.navigate({ kind: 'subTypeDetail', id })
  w.renderDiffDetail = (id: string) => nav.navigate({ kind: 'diff', id })
  // In-place DOM mutations inside bridged html (legacy search) — keep as-is.
  w.filterDiffs = filterDiffs
  w.filterDiseases = filterDiseases
  // Expand/collapse a body system on the lesion home, then re-render the view.
  w.toggleSystem = (id: string) => { toggleSystemState(id); nav.refresh() }
  // Theme toggle from the (bridged) Settings screen.
  w.setTheme = (t: string) => {
    document.documentElement.setAttribute('data-theme', t)
    try { localStorage.setItem('cliniq-theme', t) } catch { /* private mode */ }
    nav.refresh()
  }
}
