import { defineConfig } from '@playwright/test'

/**
 * Visual-regression guardrail for the STYLE_MIGRATION work (Phase 0).
 *
 * Every later phase must produce an empty visual diff against these baselines
 * in BOTH theme states. The webServer builds the app with NEXT_PUBLIC_CONVEX_URL
 * unset (no auth, localStorage notes) into an isolated .next-pw dir so it never
 * fights a running `next dev` server, then serves it with `next start`.
 *
 * These PNGs are pixel baselines tied to the machine/font environment that
 * produced them — there is no CI that owns them, and the filenames are
 * OS-agnostic. Font-metric differences between machines shift text height and
 * fail every page by a near-uniform amount: that is environment drift, not a
 * regression. After moving to a new machine or toolchain, regenerate on yours so
 * the guardrail compares like-for-like:
 *
 *   npx playwright test --update-snapshots
 */
const PORT = Number(process.env.PW_PORT ?? 3456)

export default defineConfig({
  testDir: './tests/visual',
  // Snapshots are the deliverable — keep them next to the spec, OS-agnostic name.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  // A little tolerance for sub-pixel font AA differences; styling regressions
  // move far more pixels than this.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  use: {
    baseURL: `http://localhost:${PORT}`,
    reducedMotion: 'reduce',
    colorScheme: 'no-preference',
  },
  projects: [
    {
      // Deterministic chromium at an iPhone-class mobile viewport. (Not the
      // bundled iPhone device descriptor, which forces the webkit engine.)
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: `NEXT_PUBLIC_CONVEX_URL= NEXT_DIST_DIR=.next-pw npx next build && NEXT_PUBLIC_CONVEX_URL= NEXT_DIST_DIR=.next-pw npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    timeout: 180_000,
    // Always launch our own ClinIQ server (a fresh build) — never reuse whatever
    // happens to be on the port, and never serve a stale build after edits.
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
