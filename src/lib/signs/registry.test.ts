import { describe, it, expect } from 'vitest'
import { SIGNS, FLOW_SIGNS } from './registry'
import { FLOWS } from './flows'
import { DX } from './dx'

describe('SIGNS registry', () => {
  it('lists all 36 clinical signs', () => {
    expect(SIGNS).toHaveLength(36)
  })

  it('every entry has non-empty id, icon, title, sub', () => {
    for (const s of SIGNS) {
      expect(s.id, `id for ${JSON.stringify(s)}`).toBeTruthy()
      expect(s.icon, `icon for ${s.id}`).toBeTruthy()
      expect(s.title, `title for ${s.id}`).toBeTruthy()
      expect(s.sub, `sub for ${s.id}`).toBeTruthy()
    }
  })

  it('icons are unique — no two signs share an emoji', () => {
    const icons = SIGNS.map(s => s.icon)
    expect(new Set(icons).size).toBe(icons.length)
  })

  it('ids are unique and kebab-case', () => {
    const ids = SIGNS.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(id, `${id} should be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('flowIds are unique and kebab-case', () => {
    const flowIds = FLOW_SIGNS.map(s => s.flowId)
    expect(new Set(flowIds).size).toBe(flowIds.length)
    for (const id of flowIds) {
      expect(id, `${id} should be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('every flowId resolves to a real entry FlowPage in FLOWS', () => {
    for (const { flowId, id } of FLOW_SIGNS) {
      const page = FLOWS[flowId]
      expect(page, `flowId "${flowId}" (sign "${id}") not in FLOWS`).toBeTruthy()
      expect(page.id, `FLOWS["${flowId}"].id`).toBe(flowId)
    }
  })
})

// ── The three registries agree ──────────────────────────────────────────────
// Adding a sign means touching registry.ts, flows/index.ts and dx/index.ts.
// Three files that have to agree, and nothing used to check two of the three
// relationships — so a sign wired into the registry but forgotten in the dx
// barrel shipped as a tile on the Diagnostic tab that opened <NotFound>.
//
// These say which file to edit, by name, when they fail.
describe('registry ⇄ flows ⇄ dx', () => {
  const dxKeyOf = (s: { id: string; dxId?: string }) => s.dxId ?? s.id

  it('every sign has a diagnostic approach registered', () => {
    const missing = SIGNS.filter(s => !DX[dxKeyOf(s)]).map(s => `${s.id} (expects DX["${dxKeyOf(s)}"])`)
    expect(missing, 'add these to src/lib/signs/dx/index.ts').toEqual([])
  })

  it('every registered approach answers to a sign', () => {
    const known = new Set(SIGNS.map(dxKeyOf))
    const orphans = Object.keys(DX).filter(k => !known.has(k))
    expect(orphans, 'these are unreachable — add a SIGNS entry or delete them').toEqual([])
  })

  it('each approach is registered under its own `sign`', () => {
    // The barrel derives its keys from this field, so a mismatch means the field
    // was edited without the registry — which is what the derivation prevents.
    const wrong = Object.entries(DX).filter(([key, a]) => a.sign !== key).map(([key, a]) => `${key} → sign:'${a.sign}'`)
    expect(wrong).toEqual([])
  })

  it('no two approaches claim the same sign', () => {
    const signs = Object.values(DX).map(a => a.sign)
    expect(new Set(signs).size, 'duplicate `sign` — one would silently shadow the other').toBe(signs.length)
  })

})
