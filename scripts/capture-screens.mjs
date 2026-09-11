// Regenerates the product screens used on the marketing homepage
// (public/screens/*.png) from a running build of the app itself — they are real
// captures, never mockups, so they must be refreshed whenever the screens change.
//
//   1. start the no-auth preview — the `cliniq-dev` entry in .claude/launch.json,
//      i.e. `NEXT_PUBLIC_CONVEX_URL= npx next dev -p 3007`
//   2. node scripts/capture-screens.mjs [baseUrl]
//
// Next's dev-mode image optimiser caches by path, so a re-captured PNG keeps
// serving the old bytes until the dev server restarts. The files on disk are
// the truth; restart the preview before judging the homepage by eye.
//
// Auth is deliberately out of the picture: with NEXT_PUBLIC_CONVEX_URL unset the
// app renders without a session, the same way the Playwright visual suite boots
// it. Navigation goes through window.__nav, the app's programmatic-nav hook.
//
// Every homepage visual is a SEQUENCE, not a still: a short drill-down a vet
// would actually perform, captured frame by frame, with the on-screen position
// of each tap recorded alongside it. src/lib/screenSequences.ts is generated
// from what actually happened here, so the tap indicator on the site always
// lands on the element that was really clicked.
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:3007'
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'screens')

const SCREEN = { width: 390, height: 844 }
// The site frames each capture at 390×560 — the top of the screenshot. Anything
// below that line is cropped away, so a tap target has to be inside it or the
// indicator would point at nothing.
const VISIBLE_HEIGHT = 560

/** Scroll the app's scroll container (not the window — the app owns it). */
const scrollBy = (page, delta) =>
  page.evaluate((d) => {
    const s = document.querySelector('.screen')
    if (s) s.scrollTop = Math.max(0, s.scrollTop + d)
  }, delta)

const scrollTo = (page, top) => page.evaluate((y) => {
  const s = document.querySelector('.screen')
  if (s) s.scrollTop = y
}, top)

/** Put the element about to be tapped inside the framed band, scrolling the page
 *  if the content has grown since the last capture. This is what lets the
 *  sequences survive a format change: the script re-finds the element rather
 *  than trusting a remembered offset. Returns its final box. */
async function bringIntoFrame(page, target) {
  const margin = 12
  let box = await target.boundingBox()
  if (box === null) return null
  if (box.y >= margin && box.y + box.height <= VISIBLE_HEIGHT - margin) return box
  // Sit the target a little below the middle of the band, so the frame keeps
  // the context above it — which is what makes the tap read as a decision.
  await scrollBy(page, box.y + box.height / 2 - VISIBLE_HEIGHT * 0.55)
  await page.waitForTimeout(350)
  box = await target.boundingBox()
  return box
}

// ── The sequences ───────────────────────────────────────────────────────────
// `run` puts the app in the state to photograph; `tap` names the element to
// photograph the tap on, and is then clicked to reach the next frame. The last
// frame of a sequence has tap: null — it is the payoff, and the site dwells on
// it before replaying.
const SEQUENCES = [
  {
    name: 'vestibular',
    label:
      'Vetic on a phone: the Acute Vestibular flow, tapping through to the peripheral causes and then to the Idiopathic Vestibular Disease page.',
    steps: [
      {
        file: 'vestibular-flow',
        run: (page) => page.evaluate(() => window.__nav({ kind: 'flow', flowId: 'vestibular' })),
        tap: { selector: '.flow-endpoint', text: 'Peripheral' },
      },
      { file: 'vestibular-peripheral', tap: { text: 'Idiopathic vestibular' } },
      { file: 'vestibular-idiopathic', tap: null },
    ],
  },
  {
    name: 'dx-approach',
    label:
      'Vetic on a phone: the Acute Myelopathy diagnostic approach, moving from the History tab through Exam to Diagnostics.',
    steps: [
      {
        file: 'myelopathy-history',
        run: (page) => page.evaluate(() => window.__nav({ kind: 'dx', sign: 'myelopathy', tab: 'history' })),
        tap: { text: '🩺 Exam' },
      },
      { file: 'myelopathy-exam', tap: { text: '🔬 Diagnostics' } },
      { file: 'myelopathy-diagnostics', tap: null },
    ],
  },
  {
    name: 'mix-match',
    label:
      'Vetic on a phone: three vestibular signs entered into Mix & Match, narrowed to the dog, then one differential opened.',
    steps: [
      {
        file: 'mix-match-signs',
        run: async (page) => {
          await page.evaluate(() => window.__nav({ kind: 'tab', tab: 3 }))
          const signs = page.locator('input[placeholder^="Type a sign"]').first()
          await signs.waitFor({ timeout: 15_000 })
          await signs.click({ force: true })
          for (const sign of ['head tilt', 'nystagmus', 'ataxia']) {
            await page.keyboard.type(sign, { delay: 10 })
            await page.keyboard.press('Enter')
            await page.waitForTimeout(200)
          }
          await page.waitForTimeout(400)
        },
        tap: { selector: 'button', text: '🐕 Dog' },
      },
      {
        file: 'mix-match-results',
        // Past the filter block, so the frame leads with the scored results.
        run: (page) => scrollTo(page, 520),
        tap: { selector: '.card-title', nth: 0 },
      },
      { file: 'mix-match-disease', tap: null },
    ],
  },
  {
    name: 'protocol',
    label:
      'Vetic on a phone: the Diabetic Ketoacidosis disease page, opening its emergency protocol with the doses attached.',
    steps: [
      {
        file: 'dka-disease',
        run: (page) => page.evaluate(() => window.__nav({ kind: 'disease', id: 'DIS-ENDO-DKA' })),
        tap: { selector: '.card-title', text: 'protocol:' },
      },
      // No scroll: the protocol is worth seeing from its trigger banner down,
      // and the frame reaches the first two numbered steps anyway.
      { file: 'dka-protocol', tap: null },
    ],
  },
]

// ── Capture ─────────────────────────────────────────────────────────────────
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

/** Chips rendered from flow data carry no stable class, so text is the fallback. */
function locate(tap) {
  if (tap.selector && tap.text) return page.locator(tap.selector, { hasText: tap.text }).first()
  if (tap.selector) return page.locator(tap.selector).nth(tap.nth ?? 0)
  return page.getByText(tap.text, { exact: true }).first()
}

const sequences = {}

for (const sequence of SEQUENCES) {
  for (const step of sequence.steps) {
    if (step.run) await step.run(page)
    await page.waitForTimeout(500)
    await page.evaluate(() => document.fonts?.ready)

    if (step.tap == null) {
      await page.screenshot({ path: path.join(OUT, `${step.file}.png`) })
      ;(sequences[sequence.name] ??= { label: sequence.label, frames: [] })
        .frames.push({ file: step.file, tap: null })
      console.log('captured', step.file)
      break
    }

    // Find the target, frame it, and only then take the picture — the capture
    // and the tap position have to describe the same scroll position.
    const target = locate(step.tap)
    const box = await bringIntoFrame(page, target)
    if (box === null) throw new Error(`${sequence.name}/${step.file}: no element for ${JSON.stringify(step.tap)}`)
    if (box.y < 0 || box.y + box.height > VISIBLE_HEIGHT) {
      throw new Error(
        `${sequence.name}/${step.file}: could not fit "${step.tap.text ?? step.tap.selector}" ` +
          `(${Math.round(box.height)}px tall) into the ${VISIBLE_HEIGHT}px the homepage frames.`,
      )
    }
    await page.evaluate(() => document.fonts?.ready)
    await page.screenshot({ path: path.join(OUT, `${step.file}.png`) })
    const label = (await target.innerText()).trim().split('\n')[0]
    ;(sequences[sequence.name] ??= { label: sequence.label, frames: [] }).frames.push({
      file: step.file,
      // Centre of the tapped element as a percentage of the screen, so the page
      // can position its indicator however it scales the image.
      tap: {
        x: +(((box.x + box.width / 2) / SCREEN.width) * 100).toFixed(2),
        y: +(((box.y + box.height / 2) / SCREEN.height) * 100).toFixed(2),
        w: +((box.width / SCREEN.width) * 100).toFixed(2),
        h: +((box.height / SCREEN.height) * 100).toFixed(2),
        label,
      },
    })
    console.log('captured', step.file, '— tap', label)
    await target.click()
    await page.waitForTimeout(700)
  }
}

writeFileSync(
  path.join(ROOT, 'src', 'lib', 'screenSequences.ts'),
  `// GENERATED by scripts/capture-screens.mjs — do not edit by hand.\n` +
    `// Each sequence is a real drill-down captured from the app: the frames, and\n` +
    `// the on-screen position of the tap that led to the next one, as a\n` +
    `// percentage of the ${SCREEN.width}×${SCREEN.height} capture.\n` +
    `export const SCREEN = ${JSON.stringify(SCREEN)} as const\n\n` +
    `/** The part of each capture the homepage frames, in capture pixels. */\n` +
    `export const VISIBLE_HEIGHT = ${VISIBLE_HEIGHT}\n\n` +
    `export interface SequenceFrame {\n  file: string\n  tap: { x: number; y: number; w: number; h: number; label: string } | null\n}\n\n` +
    `export interface ScreenSequence {\n  /** Alt text: what a reader who cannot see the replay is told. */\n  label: string\n  frames: SequenceFrame[]\n}\n\n` +
    `export type SequenceName = ${Object.keys(sequences).map((n) => `'${n}'`).join(' | ')}\n\n` +
    `export const SEQUENCES: Record<SequenceName, ScreenSequence> = ${JSON.stringify(sequences, null, 2)}\n`,
)
console.log('wrote src/lib/screenSequences.ts')

await browser.close()
