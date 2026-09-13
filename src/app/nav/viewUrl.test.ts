// The codec's contract is that it round-trips. These tests are what let the URL
// be trusted as the app's address: a reader bookmarks it, shares it, reloads on
// it, and must land on the screen they were looking at.
//
// The corpus is the real database, not fixtures — every flow page, every dx tab,
// every disease, protocol, lesion location, sub-type and differential the app
// can actually show. A hand-written sample would pass while some id spelling in
// the data quietly broke.

import { describe, it, expect } from 'vitest'
import { decodeHref, decodeView, encodeView, viewHref } from './viewUrl'
import { viewKey, type View, type Tab } from './view'
import { DB } from '../../data/db'
import { FLOWS } from '../../lib/signs/flows'
import { DX } from '../../lib/signs/dx'

/** Every View the app can reach, built from the shipped content. */
function everyView(): View[] {
  const out: View[] = []
  for (let t = 0; t <= 5; t++) out.push({ kind: 'tab', tab: t as Tab })
  for (const id of Object.keys(FLOWS)) out.push({ kind: 'flow', flowId: id })
  for (const [sign, ap] of Object.entries(DX)) {
    for (const tab of Object.keys(ap.tabs)) out.push({ kind: 'dx', sign, tab })
  }
  for (const d of DB.disease_page) out.push({ kind: 'disease', id: d.id })
  for (const p of DB.protocols) out.push({ kind: 'protocol', id: p.id })
  for (const l of DB.lesion_type) out.push({ kind: 'subTypeDetail', id: l.id })
  for (const d of DB.differentials) out.push({ kind: 'diff', id: d.id })
  const locs = new Map<string, string>()
  for (const l of DB.lesion_type) if (l.loc && !locs.has(l.loc)) locs.set(l.loc, l.loc_name || l.loc)
  for (const [loc, name] of locs) {
    out.push({ kind: 'lesionLoc', loc, name })
    out.push({ kind: 'lesionLoc', loc, name, filter: 'acute' })
    out.push({ kind: 'lesionLoc', loc, name, filter: 'chronic' })
  }
  return out
}

const VIEWS = everyView()

describe('view ⇄ url', () => {
  it('covers the whole shipped corpus', () => {
    // Guards the guard: if the content ever fails to load, the round-trip test
    // below would pass vacuously on an empty list.
    expect(VIEWS.length).toBeGreaterThan(1000)
  })

  it('round-trips every reachable view', () => {
    const broken: string[] = []
    for (const v of VIEWS) {
      const back = decodeHref(viewHref(v))
      if (JSON.stringify(back) !== JSON.stringify(v)) {
        broken.push(`${viewHref(v)} → ${JSON.stringify(back)} (wanted ${JSON.stringify(v)})`)
      }
    }
    expect(broken.slice(0, 10)).toEqual([])
  })

  it('round-trips a species-pinned disease page', () => {
    const id = DB.disease_page[0].id
    for (const sp of ['Dog', 'Cat'] as const) {
      const v: View = { kind: 'disease', id, sp }
      expect(viewHref(v)).toBe(`/app/disease/${id}?sp=${sp.toLowerCase()}`)
      expect(decodeHref(viewHref(v))).toEqual(v)
    }
  })

  it('keeps sp out of the screen identity', () => {
    // Species is a decoration, not a different screen: if it entered viewKey the
    // page would remount on every toggle and scroll the reader back to the top.
    const id = DB.disease_page[0].id
    expect(viewKey({ kind: 'disease', id, sp: 'Cat' }))
      .toBe(viewKey({ kind: 'disease', id }))
  })

  it('treats a lesion filter as identity, because the lists differ', () => {
    const l = DB.lesion_type.find(x => x.loc)!
    const base: View = { kind: 'lesionLoc', loc: l.loc, name: l.loc_name || l.loc }
    expect(viewKey({ ...base, filter: 'acute' })).not.toBe(viewKey(base))
  })

  it('gives every view kind a distinct, non-empty path', () => {
    const kinds = new Set(VIEWS.map(v => v.kind))
    expect(kinds.size).toBe(8)
    for (const v of VIEWS) expect(encodeView(v).path).not.toBe('')
  })

  it('produces no path needing url-escaping', () => {
    // Ids are machine keys (DIS-…, LOC-…, PROT-…) and should never need to be
    // percent-encoded; a space or a slash appearing in one is a data defect.
    const bad = VIEWS.map(v => encodeView(v).path)
      .filter(p => p !== p.split('/').map(encodeURIComponent).join('/'))
    expect(bad.slice(0, 5)).toEqual([])
  })

  describe('unresolvable urls return null, so the caller can fall back', () => {
    it.each([
      ['/app/disease/DIS-DOES-NOT-EXIST', 'a renamed or deleted disease'],
      ['/app/flow/not-a-flow', 'an unknown flow id'],
      ['/app/protocol/PROT-NOPE', 'an unknown protocol'],
      ['/app/lesion/LOC-NOWHERE', 'an unknown location'],
      ['/app/subtype/LES-NOPE', 'an unknown sub-type'],
      ['/app/diff/D-NOPE', 'an unknown differential'],
      ['/app/wat/anything', 'an unknown kind'],
    ])('%s — %s', href => {
      expect(decodeHref(href)).toBeNull()
    })
  })

  it('falls back to the first tab for the bare app url', () => {
    expect(decodeView('')).toEqual({ kind: 'tab', tab: 0 })
    expect(decodeHref('/app')).toEqual({ kind: 'tab', tab: 0 })
    expect(decodeHref('/app/')).toEqual({ kind: 'tab', tab: 0 })
  })

  it('repairs a dx url whose tab no longer exists, rather than 404ing', () => {
    const sign = Object.keys(DX)[0]
    expect(decodeHref(`/app/dx/${sign}/nosuchtab`)).toEqual({ kind: 'dx', sign, tab: 'history' })
  })

  it('ignores an unknown sp value instead of pinning a bogus species', () => {
    const id = DB.disease_page[0].id
    expect(decodeHref(`/app/disease/${id}?sp=ferret`)).toEqual({ kind: 'disease', id })
  })
})
