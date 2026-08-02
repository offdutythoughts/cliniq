// Regenerates the product screenshots used on the marketing homepage
// (public/screens/*.png) from a running build of the app itself — they are real
// captures, never mockups, so they must be refreshed when the screens change.
//
//   1. start the no-auth preview:  NEXT_PUBLIC_CONVEX_URL= npx next dev -p 3002
//   2. node scripts/capture-screens.mjs [baseUrl]
//
// Auth is deliberately out of the picture: with NEXT_PUBLIC_CONVEX_URL unset the
// app renders without a session, the same way the Playwright visual suite boots
// it. Navigation goes through window.__nav, the app's programmatic-nav hook.
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:3002'
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'screens')

const SHOTS = [
  { file: 'myelopathy-approach', view: { kind: 'dx', sign: 'myelopathy', tab: 'history' } },
  { file: 'ataxia-protocol', view: { kind: 'protocol', id: 'PROT-ATAXIA' } },
]

// The hero replays a real drill-down: the vestibular flow, the chip a vet would
// tap next, and where that tap lands. Each step records the tapped element's
// position so the marketing page can put its tap indicator in the right place.
const HERO_STEPS = [
  { file: 'vestibular-flow', tap: { selector: '.flow-endpoint', text: 'Peripheral' } },
  { file: 'vestibular-peripheral', tap: { selector: null, text: 'Idiopathic vestibular' } },
  { file: 'vestibular-idiopathic', tap: null },
]

const SCREEN = { width: 390, height: 844 }

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: SCREEN,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: 'reduce',
})
await ctx.addInitScript(() => {
  try { localStorage.setItem('cliniq-onboarding-seen', '1') } catch { /* private mode */ }
})

const page = await ctx.newPage()
await page.goto(`${BASE}/app`, { waitUntil: 'domcontentloaded' })
await page.waitForFunction(
  () => typeof window.__nav === 'function' &&
    (document.querySelector('.screen-inner')?.children.length ?? 0) > 0,
  null,
  { timeout: 60_000 },
)
await page.addStyleTag({
  content:
    '*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}' +
    // the Next dev-tools badge would otherwise sit over the bottom nav
    'nextjs-portal,#__next-build-watcher,[data-nextjs-toast]{display:none!important}',
})

for (const { file, view } of SHOTS) {
  await page.evaluate((v) => window.__nav(v), view)
  await page.waitForTimeout(500)
  await page.evaluate(() => document.fonts?.ready)
  await page.screenshot({ path: path.join(OUT, `${file}.png`) })
  console.log('captured', file)
}

// Mix & Match needs a real search behind it: three vestibular signs in a dog.
await page.evaluate(() => window.__nav({ kind: 'tab', tab: 3 }))
await page.waitForTimeout(400)
const signInput = page.locator('input[placeholder^="Type a sign"]').first()
await signInput.waitFor({ timeout: 15_000 })
await signInput.click({ force: true })
for (const sign of ['head tilt', 'nystagmus', 'ataxia']) {
  await page.keyboard.type(sign, { delay: 10 })
  await page.keyboard.press('Enter')
  await page.waitForTimeout(200)
}
await page.locator('button', { hasText: '🐕 Dog' }).first().click({ force: true })
await page.waitForTimeout(600)
// Scroll past the filters so the capture leads with the scored results.
await page.evaluate(() => { const s = document.querySelector('.screen'); if (s) s.scrollTop = 520 })
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(OUT, 'mix-match.png') })
console.log('captured mix-match')

// ── Hero sequence ───────────────────────────────────────────────────────────
await page.evaluate(() => window.__nav({ kind: 'flow', flowId: 'vestibular' }))
await page.waitForTimeout(600)

const heroFrames = []
for (const step of HERO_STEPS) {
  await page.evaluate(() => document.fonts?.ready)
  await page.screenshot({ path: path.join(OUT, `${step.file}.png`) })

  if (step.tap === null) {
    heroFrames.push({ file: step.file, tap: null })
    console.log('captured', step.file)
    break
  }

  // Chips rendered by the flow data have no stable class, so fall back to text.
  const target = step.tap.selector
    ? page.locator(step.tap.selector, { hasText: step.tap.text }).first()
    : page.getByText(step.tap.text, { exact: true }).first()
  const box = await target.boundingBox()
  if (box === null) throw new Error(`hero step "${step.file}": could not find ${step.tap.text}`)
  heroFrames.push({
    file: step.file,
    // Centre of the tapped element as a percentage of the screen, so the page
    // can position its indicator however it scales the image.
    tap: {
      x: +(((box.x + box.width / 2) / SCREEN.width) * 100).toFixed(2),
      y: +(((box.y + box.height / 2) / SCREEN.height) * 100).toFixed(2),
      w: +((box.width / SCREEN.width) * 100).toFixed(2),
      h: +((box.height / SCREEN.height) * 100).toFixed(2),
      label: step.tap.text,
    },
  })
  console.log('captured', step.file, '— tap', step.tap.text)
  await target.click()
  await page.waitForTimeout(700)
}

writeFileSync(
  path.join(OUT, '..', '..', 'src', 'lib', 'heroSequence.ts'),
  `// GENERATED by scripts/capture-screens.mjs — do not edit by hand.\n` +
    `// Frames of the hero drill-down and the on-screen position of each tap,\n` +
    `// as a percentage of the ${SCREEN.width}×${SCREEN.height} capture.\n` +
    `export const SCREEN = ${JSON.stringify(SCREEN)} as const\n\n` +
    `export interface HeroFrame {\n  file: string\n  tap: { x: number; y: number; w: number; h: number; label: string } | null\n}\n\n` +
    `export const HERO_FRAMES: HeroFrame[] = ${JSON.stringify(heroFrames, null, 2)}\n`,
)
console.log('wrote src/lib/heroSequence.ts')

await browser.close()
