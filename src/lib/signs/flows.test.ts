import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { FLOWS } from './flows'
import { DX } from './dx'
import { SIGNS } from './registry'
import type { Block, Column, Link } from './flowTypes'

// The clinical DB (src/data/db.ts) as text — used to verify that every
// disease/protocol/lesion id a flow Link (or a raw html-block onclick) targets
// actually exists. Records use mixed quoting, so accept either.
const dbSrc = readFileSync(fileURLToPath(new URL('../../data/db.ts', import.meta.url)), 'utf8')
const idInDb = (id: string) => dbSrc.includes(`'${id}'`) || dbSrc.includes(`"${id}"`)

// Recursively collect every typed Link in a flow page.
function collectLinks(blocks: Block[]): Link[] {
  const out: Link[] = []
  const walk = (bs: Block[]) => {
    for (const b of bs) {
      if (b.kind === 'branch') b.columns.forEach((c: Column) => walk(c.blocks))
      else if (b.kind === 'endpoints') b.items.forEach(e => { if (e.link) out.push(e.link) })
      else if (b.kind === 'choices') b.items.forEach(c => { if (c.link) out.push(c.link) })
      else if (b.kind === 'cardGrid') b.tiles.forEach(t => { if (t.link) out.push(t.link) })
      else if (b.kind === 'categoryGrid') b.columns.forEach(c => c.tiles.forEach(t => { if (t.link) out.push(t.link) }))
      else if (b.kind === 'categoryColumns') b.columns.forEach(c => c.tiles.forEach(t => { if (t.link) out.push(t.link) }))
      else if (b.kind === 'cardSection') b.cards.forEach(c => { if (c.link) out.push(c.link) })
      else if (b.kind === 'diseaseGrid') b.links.forEach(l => out.push(l.link))
      else if (b.kind === 'dxRow') b.items.forEach(l => out.push(l.link))
    }
  }
  walk(blocks)
  return out
}

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
  const NAV_FN = /\b(renderFlowId|renderDxId|renderDiseasePage|renderProtoDetail|renderLesionDetail|goLesionTab|renderDiffDetail|renderSubTypeDetail|renderExpFlow|renderRestFlow|renderMixedFlow)\('([^']*)'/g

  const problems: string[] = []
  for (const [pageId, page] of Object.entries(FLOWS)) {
    const json = JSON.stringify(page)
    let m: RegExpExecArray | null
    while ((m = NAV_FN.exec(json)) !== null) {
      const [, fn, arg] = m
      const note = `${pageId}: ${fn}('${arg}')`
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
