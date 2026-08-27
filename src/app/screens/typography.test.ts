// Typography guardrail — the detail pages (disease / lesion sub-type / lesion
// quick-detail / differential / protocol) must draw every text size from the
// shared scale in globals.css (--fs-title / --fs-subhead / --fs-body /
// --fs-label / --lh-body). A hardcoded px font-size in these files is how the
// pages drifted apart before; this test fails the build instead of relying on
// a manual visual sweep. Flow/dx/home screens are excluded on purpose — their
// node/tile sizes are bespoke diagram styling, not the text hierarchy.

import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

/** Files that render the shared heading/subheading/body hierarchy. */
const SCALED_FILES = [
  'styles.ts',
  'markup.tsx',
  'DiseasePageView.tsx',
  'SubTypeDetailView.tsx',
  'DiffDetailView.tsx',
  'ProtocolDetailView.tsx',
  'ProtocolStep.tsx',
]

const PX_FONT_SIZE = /font-size\s*:\s*[\d.]+/g

describe('detail-page typography scale', () => {
  for (const file of SCALED_FILES) {
    it(`${file} has no hardcoded px font-size (use var(--fs-*))`, () => {
      const src = readFileSync(join(here, file), 'utf8')
      const hits = src.match(PX_FONT_SIZE) ?? []
      expect(hits, `${file} → ${hits.join(', ')}`).toEqual([])
    })
  }

  it('globals.css defines the full scale', () => {
    const css = readFileSync(join(here, '../globals.css'), 'utf8')
    for (const token of ['--fs-title:', '--fs-subhead:', '--fs-body:', '--fs-label:', '--lh-body:']) {
      expect(css, `missing ${token}`).toContain(token)
    }
  })

  it('detail-section CSS classes read the scale, not px literals', () => {
    const css = readFileSync(join(here, '../globals.css'), 'utf8')
    // Every rule for these classes must reference a scale var for font-size.
    for (const cls of ['.detail-label{', '.detail-val{', '.stitle{']) {
      const start = css.indexOf(cls)
      expect(start, `missing rule ${cls}`).toBeGreaterThan(-1)
      const rule = css.slice(start, css.indexOf('}', start))
      expect(rule).toMatch(/font-size:var\(--fs-/)
    }
    for (const cls of ['.pearl{', '.em-alert{', '.disclaimer{']) {
      const start = css.indexOf(cls)
      expect(start, `missing rule ${cls}`).toBeGreaterThan(-1)
      const rule = css.slice(start, css.indexOf('}', start))
      expect(rule).toMatch(/font-size:var\(--fs-/)
    }
  })
})
