import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { SIGNS } from './registry'

// Read cliniqApp.ts as source text (not imported — it depends on browser globals)
// so we can statically verify that every registry `flow` is wired up correctly.
const appSrc = readFileSync(
  fileURLToPath(new URL('../cliniqApp.ts', import.meta.url)),
  'utf8',
)

describe('SIGNS registry', () => {
  it('lists all 21 clinical signs', () => {
    expect(SIGNS).toHaveLength(21)
  })

  it('every entry has non-empty id, icon, title, sub and flow', () => {
    for (const s of SIGNS) {
      expect(s.id, `id for ${JSON.stringify(s)}`).toBeTruthy()
      expect(s.icon, `icon for ${s.id}`).toBeTruthy()
      expect(s.title, `title for ${s.id}`).toBeTruthy()
      expect(s.sub, `sub for ${s.id}`).toBeTruthy()
      expect(s.flow, `flow for ${s.id}`).toBeTruthy()
    }
  })

  it('ids are unique and kebab-case', () => {
    const ids = SIGNS.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(id, `${id} should be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('flow names are unique and follow the render*Flow naming', () => {
    const flows = SIGNS.map(s => s.flow)
    expect(new Set(flows).size).toBe(flows.length)
    for (const flow of flows) {
      expect(flow, `${flow} should match render*Flow`).toMatch(/^render[A-Za-z]+Flow$/)
    }
  })

  it('every flow is defined as a function in cliniqApp.ts', () => {
    for (const { flow, id } of SIGNS) {
      const defined = new RegExp(`function\\s+${flow}\\s*\\(`).test(appSrc)
      expect(defined, `${flow} (sign "${id}") is not defined in cliniqApp.ts`).toBe(true)
    }
  })

  it('every flow is registered on window in mountGlobals()', () => {
    for (const { flow, id } of SIGNS) {
      const registered = new RegExp(`w\\.${flow}\\s*=\\s*${flow}\\b`).test(appSrc)
      expect(registered, `${flow} (sign "${id}") is not registered in mountGlobals()`).toBe(true)
    }
  })
})
