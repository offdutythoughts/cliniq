import { describe, it, expect } from 'vitest'
import { FLOWS } from '../lib/signs/flows'
import { DX } from '../lib/signs/dx'

// Guard the RichText boundary: the authored HTML embedded in the flow/dx data
// must never use a tag or dangerous attribute outside RichText's closed
// allowlist. If a new sign introduces e.g. <a>/<img>/<script> or href=/src=,
// this fails — keeping "provably scoped" true as the content grows.

const ALLOWED_TAGS = new Set(['div', 'span', 'strong', 'b', 'em', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td'])

// Serialise the data so we scan only authored content strings, not TS source.
const blob = JSON.stringify(FLOWS) + JSON.stringify(DX)

describe('RichText allowlist guard (flow/dx data)', () => {
  it('uses no HTML tag outside the allowlist', () => {
    const tags = [...blob.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)/g)].map(m => m[1].toLowerCase())
    const offenders = [...new Set(tags)].filter(t => !ALLOWED_TAGS.has(t))
    expect(offenders, `disallowed tags: ${offenders.join(', ')}`).toEqual([])
  })

  it('contains no dangerous attribute or scheme', () => {
    for (const bad of ['href=', ' src=', 'javascript:', '<script', 'onerror=', 'onload=', '<iframe', '<svg']) {
      expect(blob.includes(bad), `data must not contain "${bad}"`).toBe(false)
    }
  })
})
