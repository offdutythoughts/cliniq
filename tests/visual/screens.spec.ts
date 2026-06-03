import { test, expect, type Page } from '@playwright/test'

/**
 * Phase 0 visual-regression baselines (STYLE_MIGRATION.md).
 *
 * Captures the representative screens in BOTH theme states. The set is chosen to
 * exercise every LIVE component-class family that sits near the dead CSS being
 * removed: the sign list, lesion/disease/protocol homes, settings, a flowchart
 * that uses the .fn-* / .flow-* families, a diagnostic-approach view (.dx-*),
 * a disease page, a protocol detail, and the slide-in NotesPanel.
 */

type Nav =
  | { fn: 'navTo'; args: [number] }
  | { fn: 'renderFlowId'; args: [string] }
  | { fn: 'renderDxId'; args: [string] | [string, string] }
  | { fn: 'renderDiseasePage'; args: [string] }
  | { fn: 'renderProtoDetail'; args: [string] }
  | { fn: 'goLesionTab'; args: [string, string] }

const SCREENS: { name: string; nav: Nav }[] = [
  { name: 'tab-0-clinical', nav: { fn: 'navTo', args: [0] } },
  { name: 'tab-1-diagnostic', nav: { fn: 'navTo', args: [1] } },
  { name: 'tab-2-disease', nav: { fn: 'navTo', args: [2] } },
  { name: 'tab-3-protocols', nav: { fn: 'navTo', args: [3] } },
  { name: 'tab-4-settings', nav: { fn: 'navTo', args: [4] } },
  // Flowcharts — chosen for block-type variety (endpoints, branch, choices,
  // categoryColumns, decisionTree, compareBox, table, cardSection).
  { name: 'flow-dyspnoea', nav: { fn: 'renderFlowId', args: ['dyspnoea'] } },
  { name: 'flow-jaundice', nav: { fn: 'renderFlowId', args: ['jaundice'] } },
  { name: 'flow-vomiting', nav: { fn: 'renderFlowId', args: ['vomiting'] } },
  { name: 'flow-seizures', nav: { fn: 'renderFlowId', args: ['seizures'] } },
  { name: 'flow-weakness', nav: { fn: 'renderFlowId', args: ['weakness'] } },
  { name: 'flow-pupd', nav: { fn: 'renderFlowId', args: ['pupd'] } },
  // Diagnostic-approach: all three tabs (different .dx-* block mixes).
  { name: 'dx-coughing-history', nav: { fn: 'renderDxId', args: ['coughing', 'history'] } },
  { name: 'dx-coughing-exam', nav: { fn: 'renderDxId', args: ['coughing', 'exam'] } },
  { name: 'dx-coughing-dx', nav: { fn: 'renderDxId', args: ['coughing', 'dx'] } },
  // Disease pages, protocols, and a lesion-location list (lesion-card + tag-*).
  { name: 'disease-hcm', nav: { fn: 'renderDiseasePage', args: ['DIS-HCM'] } },
  { name: 'disease-aa', nav: { fn: 'renderDiseasePage', args: ['DIS-AA'] } },
  { name: 'protocol-cpr', nav: { fn: 'renderProtoDetail', args: ['PROT-CPR'] } },
  { name: 'protocol-ataxia', nav: { fn: 'renderProtoDetail', args: ['PROT-ATAXIA'] } },
  { name: 'lesion-hepatic', nav: { fn: 'goLesionTab', args: ['LOC-JD-HEP', 'Hepatic'] } },
]

const THEMES = ['light', 'dark'] as const

// Neutralise the inner-scroll clip (.screen is the scroll container, body never
// scrolls) so a full-page screenshot captures the entire content height, and
// kill any residual motion for determinism.
const UNCLIP = `
  html, body { height: auto !important; min-height: 0 !important; overflow: visible !important; }
  .screen { overflow: visible !important; flex: none !important; }
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
`

async function boot(page: Page, theme: string) {
  await page.goto('/')
  // Wait for the SPA to mount and expose its globals + initial render.
  await page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).navTo === 'function' &&
      (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  )
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)
  await page.addStyleTag({ content: UNCLIP })
}

async function go(page: Page, nav: Nav) {
  await page.evaluate(({ fn, args }) => {
    const w = window as unknown as Record<string, (...a: unknown[]) => unknown>
    w[fn](...args)
  }, nav)
  await page.waitForFunction(
    () => (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  )
  await page.evaluate(() => document.fonts?.ready)
  // One rAF for React to flush + layout to settle.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
}

for (const theme of THEMES) {
  test.describe(`theme:${theme}`, () => {
    for (const screen of SCREENS) {
      test(`${screen.name}`, async ({ page }) => {
        await boot(page, theme)
        await go(page, screen.nav)
        // The closed NotesPanel sits off-screen via transform; once a wide screen
        // (e.g. the dyspnoea flow) widens the page, a full-page shot would reveal
        // it. Hide it here — the dedicated notes-panel test covers it on purpose.
        await page.addStyleTag({ content: '.notes-panel, .notes-overlay { display: none !important; }' })
        await expect(page).toHaveScreenshot(`${theme}--${screen.name}.png`, { fullPage: true })
      })
    }

    test('notes-panel', async ({ page }) => {
      await boot(page, theme)
      await go(page, { fn: 'navTo', args: [0] })
      await page.locator('.notes-topbar-btn').first().click()
      const panel = page.locator('.notes-panel')
      await expect(panel).toHaveClass(/open/)
      // Let the (disabled) slide settle and ensure it is fully on-screen.
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
      await expect(panel).toHaveScreenshot(`${theme}--notes-panel.png`)
    })
  })
}
