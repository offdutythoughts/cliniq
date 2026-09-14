/**
 * Keyboard operability of the clinical app.
 *
 * Until this suite existed the repo had no test that could fail on an
 * interaction: vitest runs in `environment: 'node'`, so nothing rendered a
 * component, and the Playwright specs only compared pictures. A picture cannot
 * tell you that Enter on a disease card navigates — and for a long time it
 * didn't. Every navigational box was a `<div onClick>` with `role="button"`,
 * no `tabIndex` and no key handler: announced as a button, unreachable without
 * a mouse. These tests are what stop that returning.
 *
 * They assert behaviour, not pixels:
 *   1. the home tabs' cards are reachable by Tab and fire on Enter and Space,
 *   2. Space activates WITHOUT also scrolling the page (the default action has
 *      to be prevented, or a reader both opens the card and jumps a screenful),
 *   3. focus is visibly indicated,
 *   4. the diagnostic tab strip reports its selected tab to assistive tech.
 */
import { test, expect, type Page } from '@playwright/test'

/** Boot the app the way the visual specs do, then land on `tab`.
 *
 *  The onboarding sheet is suppressed before mount: in the no-Convex build it
 *  gates on this localStorage flag and otherwise covers the screen, swallowing
 *  every key and click these tests are here to send. */
async function boot(page: Page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
  })
  await page.goto('/app')
  await page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).__nav === 'function' &&
      (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  )
}

const nav = (page: Page, view: unknown) =>
  page.evaluate(v => (window as unknown as { __nav: (x: unknown) => void }).__nav(v), view)

async function gotoTab(page: Page, tab: number) {
  await boot(page)
  await nav(page, { kind: 'tab', tab })
}

/** Tab forward until a `.card` inside the content pane holds focus.
 *
 *  It must be a CARD, not merely something inside `.screen`: the search input is
 *  natively focusable, so "focus reached the content pane" is true even when
 *  every clinical tile is unreachable — which is exactly the bug. Asserting on
 *  the card is what makes these tests fail if Tappable loses its tabIndex. */
async function focusFirstCard(page: Page, max = 40): Promise<boolean> {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab')
    const onCard = await page.evaluate(() => document.activeElement?.classList.contains('card') ?? false)
    if (onCard) return true
  }
  return false
}

test.describe('keyboard operability', () => {
  test('a clinical-sign card is reachable by Tab and opens on Enter', async ({ page }) => {
    await gotoTab(page, 0)
    await expect(page.locator('.screen .card').first()).toBeVisible()

    expect(await focusFirstCard(page), 'no card could be reached with Tab').toBe(true)

    await page.keyboard.press('Enter')
    // Two independent signals that the activation really navigated: the topbar
    // back button only exists once the nav stack has depth, and a flowchart
    // page renders `.flow-wrap`, which the card list it replaced does not.
    await expect(page.locator('button[aria-label="Back"]')).toBeVisible()
    await expect(page.locator('.screen .flow-wrap')).toBeVisible()
  })

  test('Space activates a card without scrolling the page', async ({ page }) => {
    await gotoTab(page, 2) // Disease tab — a long, scrollable list
    expect(await focusFirstCard(page), 'no card could be reached with Tab').toBe(true)
    const before = await page.evaluate(() => document.querySelector('.screen')!.scrollTop)
    await page.keyboard.press(' ')
    await expect(page.locator('button[aria-label="Back"]')).toBeVisible()
    const after = await page.evaluate(() => document.querySelector('.screen')!.scrollTop)
    // preventDefault() on Space is what keeps these equal.
    expect(after, 'Space scrolled the pane as well as activating').toBe(before)
  })

  test('the focused element is visibly indicated', async ({ page }) => {
    await gotoTab(page, 0)
    expect(await focusFirstCard(page), 'no card could be reached with Tab').toBe(true)
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement
      const cs = getComputedStyle(el)
      return { width: cs.outlineWidth, style: cs.outlineStyle }
    })
    expect(outline.style, 'focused element has no outline style').not.toBe('none')
    expect(parseFloat(outline.width), 'focused element has a zero-width outline').toBeGreaterThan(0)
  })

  test('the diagnostic tab strip marks its selected tab', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'dx', sign: 'coughing', tab: 'history' })

    const tabs = page.locator('.dx-tab')
    await expect(tabs).toHaveCount(3)
    await expect(page.locator('.dx-tab[aria-current="page"]')).toHaveCount(1)
    await expect(page.locator('.dx-tab[aria-current="page"]')).toContainText('History')

    // Selected state must survive a switch, and move with it.
    await tabs.nth(1).click()
    await expect(page.locator('.dx-tab[aria-current="page"]')).toContainText('Exam')
  })
})
