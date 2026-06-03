import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { FLOWS } from './flows'
import { epistaxisFlow } from './flows/epistaxis'
import { renderFlowPage } from './renderFlow'
import { epistaxisFlowHtml } from './epistaxis'
import { SIGNS } from './registry'
import type { Block, Column, Link } from './flowTypes'

// cliniqApp.ts as text (browser-coupled, not imported) — used to verify that
// every Link target the data references actually exists in the app.
const appSrc = readFileSync(
  fileURLToPath(new URL('../cliniqApp.ts', import.meta.url)),
  'utf8',
)

const pascal = (s: string) => s.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase())

// Significant words (≥4 letters) for content-parity comparison.
const words = (html: string): Set<string> =>
  new Set(html.replace(/<[^>]+>/g, ' ').toLowerCase().match(/[a-z]{4,}/g) ?? [])

// Recursively collect every Link in a flow page.
function collectLinks(blocks: Block[]): Link[] {
  const out: Link[] = []
  const walk = (bs: Block[]) => {
    for (const b of bs) {
      if (b.kind === 'branch') b.columns.forEach((c: Column) => walk(c.blocks))
      else if (b.kind === 'endpoints') b.items.forEach(e => { if (e.link) out.push(e.link) })
      else if (b.kind === 'diseaseGrid') b.links.forEach(l => out.push(l.link))
      else if (b.kind === 'dxRow') b.items.forEach(l => out.push(l.link))
    }
  }
  walk(blocks)
  return out
}

describe('FLOWS registry', () => {
  it('epistaxis is registered and its key matches its id', () => {
    expect(FLOWS.epistaxis).toBe(epistaxisFlow)
    expect(epistaxisFlow.id).toBe('epistaxis')
  })

  it('the SIGNS entry with flowId points at a real FLOWS page', () => {
    for (const s of SIGNS) {
      if (s.flowId) expect(FLOWS[s.flowId], `flowId "${s.flowId}"`).toBeTruthy()
    }
    expect(SIGNS.find(s => s.id === 'epistaxis')?.flowId).toBe('epistaxis')
  })
})

describe('epistaxis flow data', () => {
  it('starts with an entry node and contains the local/systemic branch', () => {
    expect(epistaxisFlow.blocks[0]).toMatchObject({ kind: 'node', variant: 'entry' })
    const branch = epistaxisFlow.blocks.find(b => b.kind === 'branch')
    expect(branch?.kind).toBe('branch')
    if (branch?.kind === 'branch') expect(branch.columns).toHaveLength(2)
  })

  it('renders to non-empty HTML wrapped in .flow-wrap', () => {
    const html = renderFlowPage(epistaxisFlow)
    expect(html).toContain('class="flow-wrap"')
    expect(html.length).toBeGreaterThan(500)
  })
})

describe('epistaxis link integrity', () => {
  const links = collectLinks(epistaxisFlow.blocks)

  it('every disease/protocol id exists in cliniqApp.ts', () => {
    for (const l of links) {
      if (l.to === 'disease' || l.to === 'protocol') {
        expect(appSrc.includes(`'${l.id}'`), `${l.to} id ${l.id} not found in app`).toBe(true)
      }
    }
  })

  it('every flow link resolves (in FLOWS or a legacy fallback)', () => {
    for (const l of links) {
      if (l.to === 'flow') {
        const known = !!FLOWS[l.id] || new RegExp(`\\b${l.id}\\s*:\\s*\\(\\)\\s*=>`).test(appSrc)
        expect(known, `flow id ${l.id} neither migrated nor legacy-mapped`).toBe(true)
      }
    }
  })

  it('every dx link resolves to a renderDx<Id> function', () => {
    for (const l of links) {
      if (l.to === 'dx') {
        const fn = `renderDx${pascal(l.id)}`
        expect(new RegExp(`function\\s+${fn}\\s*\\(`).test(appSrc), `${fn} not defined`).toBe(true)
      }
    }
  })
})

describe('epistaxis content parity (data vs legacy HTML)', () => {
  it('the data render preserves every significant word from the legacy flowchart', () => {
    const legacy = words(epistaxisFlowHtml)
    const data = words(renderFlowPage(epistaxisFlow))
    const missing = [...legacy].filter(w => !data.has(w))
    expect(missing, `words present in legacy but missing from data: ${missing.join(', ')}`).toEqual([])
  })
})
