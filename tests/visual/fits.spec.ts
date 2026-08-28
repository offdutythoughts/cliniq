import { test, expect, type Page } from '@playwright/test'
import { FLOWS } from '../../src/lib/signs/flows'
import { DX } from '../../src/lib/signs/dx'
import { DB } from '../../src/data/db'

/**
 * Rule 3 guardrail — no page lays out wider than the screen.
 *
 * A clinical flowchart that runs off the right edge does not degrade politely:
 * the reader sees the first arm of a split and has no way to know a second one
 * exists, because a phone scrollbar is an overlay that fades out. So the PAGE
 * never scrolls sideways. A row that can't shrink any further scrolls inside
 * its own `.scroll-x` box instead, which shades its overflowing edge so the
 * reader can see there is more — the overflow stops there and never reaches
 * the page.
 *
 * This walks every flow, every diagnostic-approach tab and every lesion-location
 * grid at the mobile viewport and fails on any page-level horizontal overflow.
 * It is a layout assertion, not a screenshot, so it costs no baselines and says
 * exactly which page broke.
 */

// A couple of px of slack for sub-pixel track rounding on fractional tracks.
const SLACK = 2

async function boot(page: Page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
  })
  await page.goto('/app')
  await page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).__nav === 'function',
    null,
    { timeout: 30_000 },
  )
  // Kill motion. The per-view slide-in starts at translateX(24px), so a page
  // sampled mid-animation reads as 24px of overflow on EVERY view — noise that
  // would drown the real thing. (The reduced-motion media query isn't enough:
  // it only disables the keyframes on the two slide classes.)
  await page.addStyleTag({
    content: '*,*::before,*::after{animation:none !important;transition:none !important;}',
  })
}

/** Navigate to a view and report how far past the screen its content reaches. */
async function overflowOf(page: Page, view: unknown): Promise<number> {
  await page.evaluate(v => (window as unknown as { __nav: (v: unknown) => void }).__nav(v), view)
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
  return page.evaluate(() => {
    const sc = document.querySelector('.screen')
    return sc ? sc.scrollWidth - sc.clientWidth : 0
  })
}

test('every flow page fits the screen width', async ({ page }) => {
  await boot(page)
  const wide: string[] = []
  for (const id of Object.keys(FLOWS)) {
    const over = await overflowOf(page, { kind: 'flow', flowId: id })
    if (over > SLACK) wide.push(`${id} (+${over}px)`)
  }
  expect(wide, 'flow pages wider than the screen').toEqual([])
})

/**
 * The same rule one level down: nothing inside a branch arm may paint outside
 * that arm. A flex item's `width:100%` loses to its own `auto` min-width, so a
 * nested split used to render at its natural width inside a narrower arm and
 * slide UNDER the neighbouring arm — overlapping boxes rather than a scrollbar.
 * Content that a scroll box clips doesn't count: that's the intended fallback.
 */
test('nothing paints outside its branch arm', async ({ page }) => {
  await boot(page)
  const bad: string[] = []
  for (const id of Object.keys(FLOWS)) {
    await page.evaluate(v => (window as unknown as { __nav: (v: unknown) => void }).__nav(v), { kind: 'flow', flowId: id })
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))
    const over = await page.evaluate(() => {
      const clipped = (el: Element, stop: Element) => {
        for (let p = el.parentElement; p && p !== stop; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX
          if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true
        }
        return false
      }
      let worst = 0
      for (const c of Array.from(document.querySelectorAll('.flow-col'))) {
        const r = c.getBoundingClientRect()
        for (const d of Array.from(c.querySelectorAll('*'))) {
          const dr = d.getBoundingClientRect()
          if (dr.width > 0 && !clipped(d, c)) worst = Math.max(worst, dr.right - r.right)
        }
      }
      return Math.round(worst)
    })
    if (over > SLACK) bad.push(`${id} (+${over}px)`)
  }
  expect(bad, 'content painting outside its branch arm').toEqual([])
})

test('every diagnostic-approach tab fits the screen width', async ({ page }) => {
  await boot(page)
  const wide: string[] = []
  for (const sign of Object.keys(DX)) {
    for (const tab of ['history', 'exam', 'dx', 'extras']) {
      const over = await overflowOf(page, { kind: 'dx', sign, tab })
      if (over > SLACK) wide.push(`${sign}/${tab} (+${over}px)`)
    }
  }
  expect(wide, 'dx tabs wider than the screen').toEqual([])
})

test('every lesion-location grid fits the screen width', async ({ page }) => {
  await boot(page)
  const locs = [...new Map(DB.lesion_type.map(l => [l.loc, l.loc_name ?? l.loc])).entries()]
  const wide: string[] = []
  for (const [loc, name] of locs) {
    const over = await overflowOf(page, { kind: 'lesionLoc', loc, name })
    if (over > SLACK) wide.push(`${loc} (+${over}px)`)
  }
  expect(wide, 'lesion grids wider than the screen').toEqual([])
})
