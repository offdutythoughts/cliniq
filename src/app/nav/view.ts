// ── Navigation view model ───────────────────────────────────────────────────
// The typed replacement for the legacy `window`-global navigation. Every screen
// the app can show is one `View` variant; `linkToView` maps a typed flow `Link`
// to a View (replacing renderFlow's onclick() string serializer); `screenMeta`
// derives the topbar title + notes key/title from data (preserving the legacy
// key scheme so saved notes carry over); `parseLegacyOnclick` maps a legacy
// inline `onclick="fn('a','b')"` string back to a View (used by the migration
// bridge and by RichText when raw html-block markup still carries onclick).

import type { Link } from '../../lib/signs/flowTypes'
import type { Tab } from '../../types'
import { FLOWS } from '../../lib/signs/flows'
import { DX } from '../../lib/signs/dx'
import { DB } from '../../data/db'

export type View =
  | { kind: 'tab'; tab: Tab }                                                    // navTo(0..4)
  | { kind: 'flow'; flowId: string }                                             // renderFlowId
  | { kind: 'dx'; sign: string; tab: string }                                    // renderDxId (tab: history|exam|dx|extras)
  | { kind: 'disease'; id: string }                                              // renderDiseasePage
  | { kind: 'protocol'; id: string }                                             // renderProtoDetail
  | { kind: 'lesionLoc'; loc: string; name: string }                             // goLesionTab
  | { kind: 'lesionEp'; loc: string; name: string; system: string; cls: string }// goLocEp
  | { kind: 'lesionCatFlow'; loc: string; name: string }                         // renderLesionFlow
  | { kind: 'subTypeFlow'; loc: string; name: string; cat: string }              // renderSubTypeFlow
  | { kind: 'subTypeDetail'; id: string }                                        // renderSubTypeDetail
  | { kind: 'lesionDetail'; id: string }                                         // renderLesionDetail
  | { kind: 'diff'; id: string }                                                 // renderDiffDetail

export type ViewKind = View['kind']

/** A stable string identity for a View — for React keys + animation triggers. */
export function viewKey(v: View): string {
  switch (v.kind) {
    case 'tab': return `tab:${v.tab}`
    case 'flow': return `flow:${v.flowId}`
    case 'dx': return `dx:${v.sign}:${v.tab}`
    case 'disease': return `disease:${v.id}`
    case 'protocol': return `protocol:${v.id}`
    case 'lesionLoc': return `lesionLoc:${v.loc}`
    case 'lesionEp': return `lesionEp:${v.loc}`
    case 'lesionCatFlow': return `lesionCatFlow:${v.loc}`
    case 'subTypeFlow': return `subTypeFlow:${v.loc}:${v.cat}`
    case 'subTypeDetail': return `subTypeDetail:${v.id}`
    case 'lesionDetail': return `lesionDetail:${v.id}`
    case 'diff': return `diff:${v.id}`
  }
}

/** Map a typed flow Link to the View it navigates to. Mirrors renderFlow.ts
 *  onclick(). The dx default tab is 'history' (matches legacy renderDxId(sign)). */
export function linkToView(link: Link): View {
  switch (link.to) {
    case 'disease': return { kind: 'disease', id: link.id }
    case 'protocol': return { kind: 'protocol', id: link.id }
    case 'lesion': return { kind: 'lesionLoc', loc: link.loc, name: link.name }
    case 'flow': return { kind: 'flow', flowId: link.id }
    case 'dx': return { kind: 'dx', sign: link.id, tab: 'history' }
  }
}

// ── Legacy onclick → View ─────────────────────────────────────────────────────
// Parses `fn('a','b',...)`. Single quotes inside ids were escaped as \' by the
// legacy q() serializer — unescape them back.
export function parseLegacyOnclick(js: string): View | null {
  const call = js.trim().match(/^([a-zA-Z]+)\((.*)\)$/)
  if (!call) return null
  const fn = call[1]
  const args = [...call[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(a => a[1].replace(/\\'/g, "'"))
  switch (fn) {
    case 'renderDiseasePage': return { kind: 'disease', id: args[0] }
    case 'renderProtoDetail': return { kind: 'protocol', id: args[0] }
    case 'renderFlowId': return { kind: 'flow', flowId: args[0] }
    case 'renderDxId': return { kind: 'dx', sign: args[0], tab: args[1] || 'history' }
    case 'goLesionTab': return { kind: 'lesionLoc', loc: args[0], name: args[1] }
    case 'goLocEp': return { kind: 'lesionEp', loc: args[0], name: args[1], system: args[2], cls: args[3] }
    case 'renderLesionDetail': return { kind: 'lesionDetail', id: args[0] }
    case 'renderLesionFlow': return { kind: 'lesionCatFlow', loc: args[0], name: args[1] }
    case 'renderSubTypeFlow': return { kind: 'subTypeFlow', loc: args[0], name: args[1], cat: args[2] }
    case 'renderSubTypeDetail': return { kind: 'subTypeDetail', id: args[0] }
    case 'renderDiffDetail': return { kind: 'diff', id: args[0] }
    default: return null // renderRestFlow/renderMixedFlow/renderExpFlow: known-broken legacy links
  }
}

// ── Screen metadata (topbar title + notes key/title) ──────────────────────────
// Derived from data, reproducing the exact legacy push()/replace() scheme so
// saved notes carry over. `showBack` is NOT here — it comes from nav stack depth.
const TAB_NAMES = ['Clinical', 'Diagnostic', 'Disease', 'Protocols', 'Settings']

const byId = <T extends { id: string }>(rows: T[]) => {
  const m = new Map<string, T>()
  for (const r of rows) m.set(r.id, r)
  return m
}
const diseaseById = byId(DB.disease_page)
const protocolById = byId(DB.protocols)
const lesionById = byId(DB.lesion_type)
const diffById = byId(DB.differentials)

/** Pascal stem for the dx note key, matching renderDxId (PUPD is all-caps). */
export function dxPascal(sign: string): string {
  return sign === 'pupd' ? 'PUPD' : sign.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase())
}

const trunc = (s: string, n: number) => s.slice(0, n) + (s.length > n ? '…' : '')

export interface ScreenMeta {
  topbarTitle: string
  noteKey: string
  noteTitle: string
}

export function screenMeta(v: View): ScreenMeta {
  switch (v.kind) {
    case 'tab':
      return { topbarTitle: '', noteKey: `tab-${v.tab}`, noteTitle: `${TAB_NAMES[v.tab]} — General` }
    case 'flow': {
      const title = FLOWS[v.flowId]?.title ?? ''
      return { topbarTitle: title, noteKey: `flow:${v.flowId}`, noteTitle: title }
    }
    case 'dx': {
      const ap = DX[v.sign]
      const title = ap ? (ap.tabs[v.tab]?.title ?? ap.tabs.history?.title ?? '') : ''
      const Tab = v.tab.charAt(0).toUpperCase() + v.tab.slice(1)
      return { topbarTitle: title, noteKey: `page:dx${dxPascal(v.sign)}${Tab}`, noteTitle: title }
    }
    case 'disease': {
      const name = diseaseById.get(v.id)?.name ?? ''
      return { topbarTitle: '', noteKey: `disease:${v.id}`, noteTitle: name }
    }
    case 'protocol': {
      const name = protocolById.get(v.id)?.name ?? ''
      return { topbarTitle: trunc(name, 28), noteKey: `proto:${v.id}`, noteTitle: name }
    }
    case 'lesionLoc':
    case 'lesionEp':
    case 'lesionCatFlow':
      return { topbarTitle: v.name, noteKey: `loc:${v.loc}`, noteTitle: v.name }
    case 'subTypeFlow':
      return { topbarTitle: v.cat, noteKey: `loc:${v.loc}:${v.cat}`, noteTitle: v.cat }
    case 'subTypeDetail': {
      const sub = lesionById.get(v.id)?.sub ?? ''
      return { topbarTitle: trunc(sub, 30), noteKey: `lesion:${v.id}`, noteTitle: sub }
    }
    case 'lesionDetail': {
      const sub = lesionById.get(v.id)?.sub ?? ''
      return { topbarTitle: sub, noteKey: `lesion:${v.id}`, noteTitle: sub }
    }
    case 'diff': {
      const name = diffById.get(v.id)?.name ?? ''
      return { topbarTitle: trunc(name, 30), noteKey: `diff:${v.id}`, noteTitle: name }
    }
  }
}
