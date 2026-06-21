import { describe, it, expect } from 'vitest'
import { SIGNS, FLOW_SIGNS } from './registry'
import { FLOWS } from './flows'

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
