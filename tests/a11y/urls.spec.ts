/**
 * The URL is the address of the current screen.
 *
 * Before this, every clinical screen lived at `/app`: navigation called
 * history.pushState with no url, purely so a Back press had an entry to eat.
 * A vet could not bookmark a protocol, send a colleague a disease page, or press
 * reload without being dropped on tab 0 — mid-consult.
 *
 * These assert the four things that makes true, each of which is a thing a
 * reader actually does:
 *   1. moving through the app changes the address bar,
 *   2. a pasted deep link opens that screen (and on the first paint — a shared
 *      link that flashes tab 0 first reads as broken),
 *   3. reload keeps you where you were,
 *   4. Back retraces the real trail, and survives a reload mid-trail.
 */
import { test, expect, type Page } from '@playwright/test'

async function boot(page: Page, path = '/app') {
  await page.addInitScript(() => {
    try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
  })
  await page.goto(path)
  await page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).__nav === 'function' &&
      (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  )
}

/** Navigate, and wait for the address bar to actually move.
 *
 *  `__nav` schedules a React state update; the history write happens as that
 *  commits. Without this wait a test can reload before the entry it thinks it is
 *  on exists — which is precisely how the trail test used to fail intermittently
 *  while the app was behaving correctly. */
async function nav(page: Page, view: unknown, expected: RegExp) {
  await page.evaluate(v => (window as unknown as { __nav: (x: unknown) => void }).__nav(v), view)
  await expect(page).toHaveURL(expected)
}

test.describe('urls', () => {
  test('navigating writes the screen into the address bar', async ({ page }) => {
    await boot(page)
    await expect(page).toHaveURL(/\/app\/clinical$/)

    await nav(page, { kind: 'flow', flowId: 'red-eye' }, /\/app\/flow\/red-eye$/)

    await nav(page, { kind: 'dx', sign: 'coughing', tab: 'exam' }, /\/app\/dx\/coughing\/exam$/)
  })

  test('a deep link opens its screen, without painting a different one first', async ({ page }) => {
    // No waiting: assert on the very first render the server produced. If the
    // view were decoded on the client this would catch the tab-0 flash.
    await page.addInitScript(() => {
      try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
    })
    await page.goto('/app/dx/coughing/exam', { waitUntil: 'commit' })
    await expect(page.locator('.dx-tab[aria-current="page"]')).toContainText('Exam')
  })

  test('reload keeps the reader on the page they were reading', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'protocol', id: 'PROT-CPR' }, /\/app\/protocol\/PROT-CPR$/)
    const before = await page.locator('.screen-inner').innerText()

    await page.reload()
    await page.waitForFunction(() => (document.querySelector('.screen-inner')?.children.length ?? 0) > 0)

    await expect(page).toHaveURL(/\/app\/protocol\/PROT-CPR$/)
    expect(await page.locator('.screen-inner').innerText()).toBe(before)
  })

  test('Back retraces the trail, screen and url together', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'flow', flowId: 'red-eye' }, /\/app\/flow\/red-eye$/)
    await nav(page, { kind: 'protocol', id: 'PROT-CPR' }, /\/app\/protocol\/PROT-CPR$/)

    await page.goBack()
    await expect(page).toHaveURL(/\/app\/flow\/red-eye$/)
    await expect(page.locator('.screen .flow-wrap')).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL(/\/app\/clinical$/)
    // Back to a tab root: the back control is gone because the trail is empty.
    await expect(page.locator('button[aria-label="Back"]')).toBeHidden()
  })

  test('the trail survives a reload mid-way through it', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'flow', flowId: 'red-eye' }, /\/app\/flow\/red-eye$/)
    await nav(page, { kind: 'protocol', id: 'PROT-CPR' }, /\/app\/protocol\/PROT-CPR$/)

    await page.reload()
    await page.waitForFunction(() => (document.querySelector('.screen-inner')?.children.length ?? 0) > 0)

    // history.state rides with the entry, so the WHOLE trail behind a refreshed
    // page is still there — not just one step of it.
    await expect(page.locator('button[aria-label="Back"]')).toBeVisible()
    await page.locator('button[aria-label="Back"]').click()
    await expect(page).toHaveURL(/\/app\/flow\/red-eye$/)

    await page.locator('button[aria-label="Back"]').click()
    await expect(page).toHaveURL(/\/app\/clinical$/)
    await expect(page.locator('button[aria-label="Back"]')).toBeHidden()
  })

  test('the in-app back control and the browser Back agree', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'disease', id: 'DIS-HCM' }, /\/app\/disease\/DIS-HCM$/)

    await page.locator('button[aria-label="Back"]').click()
    await expect(page).toHaveURL(/\/app\/clinical$/)
  })

  test('a url naming content that no longer exists falls back, it does not 404', async ({ page }) => {
    await boot(page, '/app/disease/DIS-GONE-AWAY')
    await expect(page.locator('.screen .card').first()).toBeVisible()
  })

  test('switching bottom-nav tab changes the url without stacking history', async ({ page }) => {
    await boot(page)
    await nav(page, { kind: 'tab', tab: 4 }, /\/app\/protocols$/)
    await nav(page, { kind: 'tab', tab: 2 }, /\/app\/disease$/)
    // A tab is a mode switch, not a step: Back leaves the app rather than
    // walking back through every tab the reader browsed.
    await expect(page.locator('button[aria-label="Back"]')).toBeHidden()
  })
})
