import { describe, it, expect } from 'vitest'
import { SIGNS } from './registry'
import { FLOWS } from './flows'

describe('SIGNS registry', () => {
  it('lists all 21 clinical signs', () => {
    expect(SIGNS).toHaveLength(21)
  })

  it('every entry has non-empty id, icon, title, sub and flowId', () => {
    for (const s of SIGNS) {
      expect(s.id, `id for ${JSON.stringify(s)}`).toBeTruthy()
      expect(s.icon, `icon for ${s.id}`).toBeTruthy()
      expect(s.title, `title for ${s.id}`).toBeTruthy()
      expect(s.sub, `sub for ${s.id}`).toBeTruthy()
      expect(s.flowId, `flowId for ${s.id}`).toBeTruthy()
    }
  })

  it('ids and flowIds are unique and kebab-case', () => {
    const ids = SIGNS.map(s => s.id)
    const flowIds = SIGNS.map(s => s.flowId)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(flowIds).size).toBe(flowIds.length)
    for (const id of [...ids, ...flowIds]) {
      expect(id, `${id} should be kebab-case`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  it('every flowId resolves to a real entry FlowPage in FLOWS', () => {
    for (const { flowId, id } of SIGNS) {
      const page = FLOWS[flowId]
      expect(page, `flowId "${flowId}" (sign "${id}") not in FLOWS`).toBeTruthy()
      expect(page.id, `FLOWS["${flowId}"].id`).toBe(flowId)
    }
  })
})
