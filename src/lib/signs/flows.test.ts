import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { FLOWS } from './flows'
import { renderFlowPage } from './renderFlow'
import { SIGNS } from './registry'
import { epistaxisFlowHtml } from './epistaxis'
import { wetEyeFlowHtml } from './wetEye'
import { blindEyeFlowHtml, blindEyeAcuteHtml, blindEyeChronicHtml } from './blindEye'
import { redEyeFlowHtml, redEyeCoatsHtml, redEyeIrisHtml, redEyeBleedHtml, redEyeOrbitHtml } from './redEye'
import { abnormalPupilFlowHtml, abnormalPupilOphthalmicHtml, abnormalPupilNeuroBranchHtml } from './abnormalPupil'
import { haematuriaFlowHtml } from './haematuria'
import { bleedingFlowHtml } from './bleeding'
import type { Block, Column, Link } from './flowTypes'

// cliniqApp.ts as text (browser-coupled, not imported) — used to verify that
// every Link target the data references actually exists in the app.
const appSrc = readFileSync(
  fileURLToPath(new URL('../cliniqApp.ts', import.meta.url)),
  'utf8',
)

// Migrated flow id → its legacy HTML const, for content-parity checks.
const LEGACY_HTML: Record<string, string> = {
  epistaxis: epistaxisFlowHtml,
  'wet-eye': wetEyeFlowHtml,
  'blind-eye': blindEyeFlowHtml,
  'blind-eye-acute': blindEyeAcuteHtml,
  'blind-eye-chronic': blindEyeChronicHtml,
  'red-eye': redEyeFlowHtml,
  'red-eye-coats': redEyeCoatsHtml,
  'red-eye-iris': redEyeIrisHtml,
  'red-eye-bleed': redEyeBleedHtml,
  'red-eye-orbit': redEyeOrbitHtml,
  'abnormal-pupil': abnormalPupilFlowHtml,
  'abnormal-pupil-ophthalmic': abnormalPupilOphthalmicHtml,
  'abnormal-pupil-neuro': abnormalPupilNeuroBranchHtml,
  'haematuria': haematuriaFlowHtml,
  'bleeding': bleedingFlowHtml,
}

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

  it('every page starts with an entry header and renders non-trivial HTML', () => {
    for (const page of Object.values(FLOWS)) {
      // 'flow' pages open with an entry node + .flow-wrap; 'fn' pages open with
      // an fnHeader and render bare (no .flow-wrap).
      const html = renderFlowPage(page)
      const first = page.blocks[0].kind
      if (page.layout === 'fn') {
        expect(first, page.id).toBe('fnHeader')
        expect(html, page.id).toContain('class="fn ')
      } else {
        // flow pages open with an entry node, or an html block for fully-bespoke pages
        expect(['node', 'html'], page.id).toContain(first)
        if (first === 'node') expect(page.blocks[0], page.id).toMatchObject({ variant: 'entry' })
        expect(html, page.id).toContain('class="flow-wrap"')
      }
      expect(html.length, page.id).toBeGreaterThan(300)
    }
  })
})

describe('link integrity (all migrated flows)', () => {
  for (const [id, page] of Object.entries(FLOWS)) {
    const links = collectLinks(page.blocks)

    it(`${id}: disease/protocol/lesion targets exist in cliniqApp.ts`, () => {
      for (const l of links) {
        if (l.to === 'disease' || l.to === 'protocol') {
          expect(appSrc.includes(`'${l.id}'`), `${l.to} id ${l.id}`).toBe(true)
        } else if (l.to === 'lesion') {
          expect(appSrc.includes(`'${l.loc}'`), `lesion loc ${l.loc}`).toBe(true)
        }
      }
    })

    it(`${id}: flow links resolve (migrated or legacy-mapped)`, () => {
      for (const l of links) {
        if (l.to === 'flow') {
          const known = !!FLOWS[l.id] || new RegExp(`\\b${l.id}\\s*:\\s*\\(\\)\\s*=>`).test(appSrc)
          expect(known, `flow id ${l.id}`).toBe(true)
        }
      }
    })

    it(`${id}: dx links resolve to a renderDx<Id> function`, () => {
      for (const l of links) {
        if (l.to === 'dx') {
          expect(new RegExp(`function\\s+renderDx${pascal(l.id)}\\s*\\(`).test(appSrc), `dx ${l.id}`).toBe(true)
        }
      }
    })
  }
})

describe('content parity (data render vs legacy HTML)', () => {
  for (const [id, legacyHtml] of Object.entries(LEGACY_HTML)) {
    it(`${id}: data render preserves every significant word from the legacy flowchart`, () => {
      const page = FLOWS[id]
      expect(page, `FLOWS[${id}]`).toBeTruthy()
      const legacy = words(legacyHtml)
      const data = words(renderFlowPage(page))
      const missing = [...legacy].filter(w => !data.has(w))
      expect(missing, `missing from data: ${missing.join(', ')}`).toEqual([])
    })
  }
})

// ── Comprehensive link-integrity (Phase 3 / refactor #3) ─────────────────────
// Render every flow page and validate EVERY onclick reference (typed links +
// raw onclicks inside html blocks): functions must be defined in cliniqApp.ts,
// ids must exist, flow ids must be in FLOWS.
describe('rendered link integrity (every onclick target resolves)', () => {
  // Pre-existing broken legacy links faithfully preserved from the source: the
  // dyspnoea Expiratory/Restrictive/Mixed entry tiles call functions that never
  // existed in the codebase. Documented + allow-listed here, not introduced by us.
  const KNOWN_BROKEN = new Set(['renderExpFlow', 'renderRestFlow', 'renderMixedFlow'])
  const fnDefined = (fn: string) => new RegExp(`function\\s+${fn}\\s*\\(`).test(appSrc)
  const idInSource = (id: string) => appSrc.includes(`'${id}'`)

  const problems: string[] = []
  for (const [pageId, page] of Object.entries(FLOWS)) {
    const html = renderFlowPage(page)
    const re = /onclick="([a-zA-Z]+)\(([^"]*)\)"/g
    let m: RegExpExecArray | null
    while ((m = re.exec(html)) !== null) {
      const fn = m[1]
      const firstArg = (m[2].match(/'([^']*)'/) || [])[1]
      const note = `${pageId}: ${fn}(${m[2]})`
      if (KNOWN_BROKEN.has(fn)) continue
      if (fn === 'renderFlowId') { if (!firstArg || !FLOWS[firstArg]) problems.push(`${note} → flow id not in FLOWS`); continue }
      if (fn === 'renderDiseasePage' || fn === 'renderProtoDetail' || fn === 'renderLesionDetail' || fn === 'goLesionTab' || fn === 'renderDiffDetail') {
        if (!firstArg || !idInSource(firstArg)) problems.push(`${note} → id not found in app`)
        continue
      }
      // every other called function (renderDx*, renderInsp, renderBleedingFlow*, ...) must be defined
      if (!fnDefined(fn)) problems.push(`${note} → function not defined`)
    }
  }

  it('every onclick target resolves', () => {
    expect(problems, '\n' + problems.join('\n')).toEqual([])
  })
})
