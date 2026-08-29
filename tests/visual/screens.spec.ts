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
  | { fn: 'renderSubTypeDetail'; args: [string] }
  | { fn: 'renderDiffDetail'; args: [string] }

type Screen = {
  name: string
  nav: Nav
  /** Runs after navigation, before the shot — use to pin a data-dependent screen. */
  prep?: (page: Page) => Promise<void>
  /** Selectors painted over before comparison (Playwright `mask`). */
  mask?: string[]
}

const SCREENS: Screen[] = [
  { name: 'tab-0-clinical', nav: { fn: 'navTo', args: [0] } },
  { name: 'tab-1-diagnostic', nav: { fn: 'navTo', args: [1] } },
  // The disease home is data-dependent twice over: it prints a live
  // "N disease pages" count, and with no query it renders a card for EVERY
  // disease page, so a fullPage shot grows with the database. Adding clinical
  // content therefore reddened CI on three separate commits (b067e39, 1a6f51a,
  // d45b79e), each needing a baseline regen that had nothing to do with the
  // change under test. That is a tax on writing content, not a guardrail.
  //
  // So pin it: filter to a single row via a string that appears on exactly one
  // page, and mask the count. What the shot still covers is the disease-home
  // chrome and one DiseaseCard including its snippet path; what it no longer
  // covers is the LENGTH of a list, which was never what this baseline was for.
  //
  // The pin is a mutation string on DIS-HCM. If that page ever loses it the
  // filtered list renders empty and prep() fails loudly on the count assertion —
  // change the query here, do not delete the pin.
  {
    name: 'tab-2-disease',
    nav: { fn: 'navTo', args: [2] },
    prep: async (page) => {
      await page.fill('[aria-label="Search all pages"]', 'MyBPC3-A31P')
      await expect(page.locator('#dis-list > *')).toHaveCount(1)
    },
    mask: ['.stitle'],
  },
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
  // flow-myelopathy is the only flow page that exercises the `table` block
  // (<table>/colspan markup) — guard it before the renderer is migrated.
  { name: 'flow-myelopathy', nav: { fn: 'renderFlowId', args: ['myelopathy'] } },
  // Diagnostic-approach: all three tabs (different .dx-* block mixes).
  { name: 'dx-coughing-history', nav: { fn: 'renderDxId', args: ['coughing', 'history'] } },
  { name: 'dx-coughing-exam', nav: { fn: 'renderDxId', args: ['coughing', 'exam'] } },
  { name: 'dx-coughing-dx', nav: { fn: 'renderDxId', args: ['coughing', 'dx'] } },
  // dx-bleeding-dx is the only Dx view with an html-block <table>; pupd/diarrhoea
  // cover the 'pupd'/'alt' nav variants and the densest leaf-html tabs.
  { name: 'dx-bleeding-dx', nav: { fn: 'renderDxId', args: ['bleeding', 'dx'] } },
  { name: 'dx-pupd-dx', nav: { fn: 'renderDxId', args: ['pupd', 'dx'] } },
  { name: 'dx-diarrhoea-history', nav: { fn: 'renderDxId', args: ['diarrhoea', 'history'] } },
  // Disease pages, protocols, and a lesion-location list (lesion-card + tag-*).
  { name: 'disease-hcm', nav: { fn: 'renderDiseasePage', args: ['DIS-HCM'] } },
  { name: 'disease-aa', nav: { fn: 'renderDiseasePage', args: ['DIS-AA'] } },
  // disease-dic carries @DIS-/@PROT- link tokens — guards the linkify() path.
  { name: 'disease-dic', nav: { fn: 'renderDiseasePage', args: ['DIS-BD-DIC'] } },
  // disease-prostatitis exercises numbered citations — inline markers + footnote.
  { name: 'disease-prostatitis', nav: { fn: 'renderDiseasePage', args: ['DIS-URO-PROSTATITIS'] } },
  { name: 'protocol-cpr', nav: { fn: 'renderProtoDetail', args: ['PROT-CPR'] } },
  { name: 'protocol-ataxia', nav: { fn: 'renderProtoDetail', args: ['PROT-ATAXIA'] } },
  { name: 'lesion-hepatic', nav: { fn: 'goLesionTab', args: ['LOC-JD-HEP', 'Hepatic'] } },
  // Lesion drill-down detail leaves (reached from the lesion grid / flows).
  // subtype-gi-neo exercises the subTypeDetail etiology #/-/@ parser + diag +
  // treat; subtype-hepatic a simpler one; diff-d001 renderDiffDetail.
  { name: 'subtype-gi-neo', nav: { fn: 'renderSubTypeDetail', args: ['LES-GI-UP-NEO'] } },
  { name: 'subtype-hepatic', nav: { fn: 'renderSubTypeDetail', args: ['LES-JD-HEP'] } },
  // The two halves of the protocol rule (src/app/screens/protocolCards.tsx), one
  // screen each: subtype-pleural-exudate is a leaf with NO disease page, so it
  // carries its own <ProtocolCards>; subtype-pericardial HAS one, so it shows
  // <DiseasePageCard> at the top instead and the protocol lives on that page.
  { name: 'subtype-pleural-exudate', nav: { fn: 'renderSubTypeDetail', args: ['LES-PL-FL2'] } },
  { name: 'subtype-pericardial', nav: { fn: 'renderSubTypeDetail', args: ['LES-PM-CARD'] } },
  { name: 'diff-d001', nav: { fn: 'renderDiffDetail', args: ['D001'] } },
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

// Map the legacy {fn,args} screen descriptor to a typed View for window.__nav
// (the app's programmatic-navigation hook). Keeps the SCREENS table stable.
function toView(nav: Nav): unknown {
  switch (nav.fn) {
    case 'navTo': return { kind: 'tab', tab: nav.args[0] }
    case 'renderFlowId': return { kind: 'flow', flowId: nav.args[0] }
    case 'renderDxId': return { kind: 'dx', sign: nav.args[0], tab: nav.args[1] ?? 'history' }
    case 'renderDiseasePage': return { kind: 'disease', id: nav.args[0] }
    case 'renderProtoDetail': return { kind: 'protocol', id: nav.args[0] }
    case 'goLesionTab': return { kind: 'lesionLoc', loc: nav.args[0], name: nav.args[1] }
    case 'renderSubTypeDetail': return { kind: 'subTypeDetail', id: nav.args[0] }
    case 'renderDiffDetail': return { kind: 'diff', id: nav.args[0] }
  }
}

async function boot(page: Page, theme: string) {
  // Suppress the first-run onboarding welcome sheet — in the no-Convex build it
  // gates on this localStorage flag (OnboardingLocal), and would otherwise cover
  // every screen. Must be set before the app mounts.
  await page.addInitScript(() => {
    try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
  })
  // The clinical app lives at /app — `/` is the public marketing homepage.
  await page.goto('/app')
  // Wait for the SPA to mount, expose its nav hook, and render the initial view.
  await page.waitForFunction(
    () => typeof (window as unknown as Record<string, unknown>).__nav === 'function' &&
      (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  )
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)
  await page.addStyleTag({ content: UNCLIP })
}

async function go(page: Page, nav: Nav) {
  await page.evaluate((view) => {
    ;(window as unknown as { __nav: (v: unknown) => void }).__nav(view)
  }, toView(nav))
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
        await page.addStyleTag({ content: '[data-notes-panel], [data-notes-overlay] { display: none !important; }' })
        if (screen.prep) {
          await screen.prep(page)
          await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
        }
        await expect(page).toHaveScreenshot(`${theme}--${screen.name}.png`, {
          fullPage: true,
          ...(screen.mask ? { mask: screen.mask.map((sel) => page.locator(sel)) } : {}),
        })
      })
    }

    test('notes-panel', async ({ page }) => {
      await boot(page, theme)
      await go(page, { fn: 'navTo', args: [0] })
      await page.locator('[data-notes-btn]').first().click()
      const panel = page.locator('[data-notes-panel]')
      // Open = slid into the viewport (utility classes, so assert position not class).
      await expect.poll(async () => (await panel.boundingBox())?.x ?? 9999).toBeLessThan(200)
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))))
      await expect(panel).toHaveScreenshot(`${theme}--notes-panel.png`)
    })
  })
}
