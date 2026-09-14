import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { FLOWS } from './flows'
import { eachBlock } from './blockWalk'
import { DX } from './dx'
import { SIGNS } from './registry'
import type { Block, Link } from './flowTypes'

// The clinical DB (src/data/db.ts) as text — used to verify that every
// disease/protocol/lesion id a flow Link (or a raw html-block onclick) targets
// actually exists. Records use mixed quoting, so accept either.
const dbSrc = readFileSync(fileURLToPath(new URL('../../data/db.ts', import.meta.url)), 'utf8')
// Protocols live in separate files under src/data/protocols/ — scan those too.
import { readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
const protocolsDir = fileURLToPath(new URL('../../data/protocols', import.meta.url))
const protocolsSrc = readdirSync(protocolsDir)
  .filter(f => f.endsWith('.ts'))
  .map(f => readFileSync(join(protocolsDir, f), 'utf8'))
  .join('\n')
const idInDb = (id: string) => {
  const single = `'${id}'`
  const double = `"${id}"`
  return dbSrc.includes(single) || dbSrc.includes(double) ||
    protocolsSrc.includes(single) || protocolsSrc.includes(double)
}

// Every typed Link on a flow page.
//
// This used to hand-roll the recursion and descended into `branch` columns only,
// so links inside `fork` legs and `speciesChooser` panels were invisible to it:
// 22 links across 5 pages — 18 on the DIC page's species panels — had never been
// checked against the database. Shared traversal, one place.
function collectLinks(blocks: Block[]): Link[] {
  const out: Link[] = []
  for (const b of eachBlock(blocks)) {
    if (b.kind === 'endpoints') b.items.forEach(e => { if (e.link) out.push(e.link) })
    else if (b.kind === 'choices') b.items.forEach(c => { if (c.link) out.push(c.link) })
    else if (b.kind === 'cardGrid') b.tiles.forEach(t => { if (t.link) out.push(t.link) })
    else if (b.kind === 'categoryGrid' || b.kind === 'categoryColumns') {
      b.columns.forEach(c => c.tiles.forEach(t => { if (t.link) out.push(t.link) }))
    }
    else if (b.kind === 'diseaseGrid') b.links.forEach(l => out.push(l.link))
    else if (b.kind === 'dxRow') b.items.forEach(l => out.push(l.link))
    else if (b.kind === 'alert') b.items.forEach(it => { if (typeof it !== 'string' && it.link) out.push(it.link) })
  }
  return out
}

// ── Reachability ────────────────────────────────────────────────────────────
// A flow page nobody links to is content that ships and cannot be opened. The
// entry pages are the ones in the registry; everything else has to be reached by
// following a link from one of them.
//
// Two kinds of edge count, and both have to be followed DURING the walk: typed
// `{ to: 'flow' }` links, and the `onclick="renderFlowId('…')"` in a raw `html:`
// block. Collecting the html ones afterwards instead reports pages as orphans
// whose only route in is an authored link — and worse, never follows what THEY
// link to.
function flowEdges(id: string): string[] {
  const page = FLOWS[id]
  if (!page) return []
  const out = collectLinks(page.blocks).filter(l => l.to === 'flow').map(l => l.id)
  for (const b of eachBlock(page.blocks)) {
    if (b.kind !== 'html') continue
    for (const m of b.html.matchAll(/renderFlowId\('([^']+)'\)/g)) out.push(m[1])
  }
  return out
}

// Pages known to be unreachable, with the reason. Do not add rows to silence a
// failure — a page here is content that ships and cannot be opened.
const KNOWN_ORPHANS = new Map<string, string>([
  // Documented in flows/dyspnoea.ts: the Restrictive tile's legacy onclick called
  // renderRestFlow, which never existed. Kept as a known-broken link.
  ['dyspnoea-rest', "the entry's Restrictive tile calls the non-existent renderRestFlow"],
  // Found by this test. Its sibling anisocoria-mydriasis links its Neurological
  // tile to anisocoria-mydriasis-localise; the miosis page's Sympathetic tile
  // links to the DIS-NEU-HORNERS disease page instead, so the Horner's
  // three-neuron localisation tree has no route in at all. Fixing it is an
  // authoring decision — whether that tile should open the localisation flow,
  // the disease page, or both.
  ['anisocoria-horners-localise', 'nothing links to it; the miosis tile goes to the disease page'],
])

describe('every flow page is reachable', () => {
  it('from an entry flow, by following flow links', () => {
    const seen = new Set<string>()
    const queue = SIGNS.map(s => s.flowId).filter(Boolean) as string[]
    while (queue.length) {
      const id = queue.shift()!
      if (seen.has(id)) continue
      seen.add(id)
      for (const next of flowEdges(id)) if (!seen.has(next)) queue.push(next)
    }
    const orphans = Object.keys(FLOWS).filter(id => !seen.has(id) && !KNOWN_ORPHANS.has(id))
    expect(orphans, 'unreachable flow pages — nothing links to these').toEqual([])
  })

  it('the known orphans are still orphans, and still exist', () => {
    // Both halves matter: a page that becomes reachable should leave the list
    // rather than sit there claiming to be broken, and a row naming a page that
    // no longer exists is a stale exemption.
    const seen = new Set<string>()
    const queue = SIGNS.map(sg => sg.flowId).filter(Boolean) as string[]
    while (queue.length) {
      const id = queue.shift()!
      if (seen.has(id)) continue
      seen.add(id)
      for (const next of flowEdges(id)) if (!seen.has(next)) queue.push(next)
    }
    for (const [id, why] of KNOWN_ORPHANS) {
      expect(FLOWS[id], `KNOWN_ORPHANS names "${id}", which is not a flow page`).toBeTruthy()
      expect(seen.has(id), `"${id}" is reachable now (${why}) — remove it from KNOWN_ORPHANS`).toBe(false)
    }
  })
})

describe('FLOWS registry', () => {
  it('every page key matches its own id', () => {
    for (const [key, page] of Object.entries(FLOWS)) expect(page.id).toBe(key)
  })

  it('every SIGNS flowId points at a real FLOWS page', () => {
    for (const s of SIGNS) {
      if (s.flowId) expect(FLOWS[s.flowId], `flowId "${s.flowId}"`).toBeTruthy()
    }
  })

  it('every page opens with the right entry block', () => {
    for (const page of Object.values(FLOWS)) {
      const first = page.blocks[0].kind
      if (page.layout === 'fn') {
        expect(first, page.id).toBe('fnHeader')
      } else {
        // flow pages open with an entry node, an html block for bespoke pages,
        // or a callout (pre-entry warning banner, e.g. weakness-collapse)
        expect(['node', 'html', 'callout'], page.id).toContain(first)
        if (first === 'node') expect(page.blocks[0], page.id).toMatchObject({ variant: 'entry' })
      }
      expect(page.blocks.length, page.id).toBeGreaterThan(0)
    }
  })
})

describe('typed-link integrity (every flow Link resolves)', () => {
  for (const [id, page] of Object.entries(FLOWS)) {
    const links = collectLinks(page.blocks)
    it(`${id}: disease / protocol / lesion / flow / dx targets exist`, () => {
      for (const l of links) {
        if (l.to === 'disease' || l.to === 'protocol') expect(idInDb(l.id), `${l.to} id ${l.id}`).toBe(true)
        else if (l.to === 'lesion') expect(idInDb(l.loc), `lesion loc ${l.loc}`).toBe(true)
        else if (l.to === 'flow') expect(FLOWS[l.id], `flow id ${l.id}`).toBeTruthy()
        else if (l.to === 'dx') expect(DX[l.id], `dx ${l.id}`).toBeTruthy()
      }
    })
  }
})

// Raw onclick handlers embedded in html-block / leaf-html fields aren't typed
// Links — scan the serialised page for them and validate their targets too.
describe('raw-html onclick integrity (every onclick target resolves)', () => {
  // Pre-existing broken legacy links faithfully preserved from the source: the
  // dyspnoea Expiratory/Restrictive/Mixed entry tiles call functions that never
  // existed. Documented + allow-listed, not introduced by us.
  const KNOWN_BROKEN = new Set(['renderExpFlow', 'renderRestFlow', 'renderMixedFlow'])
  // Handlers whose VIEW has been deleted. Distinct from KNOWN_BROKEN, which is a
  // legacy allow-list: these must never appear again, so they fail rather than
  // being skipped. parseLegacyOnclick returns null for them, which means an
  // authored call is a silently dead click — exactly the failure a test should
  // catch instead of a reader discovering it.
  const REMOVED_FN = new Map([
    ['renderLesionDetail', 'LesionDetailView was deleted as unreachable; link the disease page, or goLesionTab'],
  ])
  const NAV_FN = /\b(renderFlowId|renderDxId|renderDiseasePage|renderProtoDetail|renderLesionDetail|goLesionTab|renderDiffDetail|renderSubTypeDetail|renderExpFlow|renderRestFlow|renderMixedFlow)\('([^']*)'/g

  const problems: string[] = []
  for (const [pageId, page] of Object.entries(FLOWS)) {
    const json = JSON.stringify(page)
    let m: RegExpExecArray | null
    while ((m = NAV_FN.exec(json)) !== null) {
      const [, fn, arg] = m
      const note = `${pageId}: ${fn}('${arg}')`
      const removed = REMOVED_FN.get(fn)
      if (removed) { problems.push(`${note} → handler removed: ${removed}`); continue }
      if (KNOWN_BROKEN.has(fn)) continue
      if (fn === 'renderFlowId') { if (!FLOWS[arg]) problems.push(`${note} → flow id not in FLOWS`); continue }
      if (fn === 'renderDxId') { if (!DX[arg]) problems.push(`${note} → dx sign not in DX`); continue }
      // disease/protocol/lesion/diff/subtype id must exist in the DB
      if (!arg || !idInDb(arg)) problems.push(`${note} → id not found in DB`)
    }
  }

  it('every onclick target resolves', () => {
    expect(problems, '\n' + problems.join('\n')).toEqual([])
  })
})
