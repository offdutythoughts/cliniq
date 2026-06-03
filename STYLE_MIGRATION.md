# Style Consolidation & Tailwind v4 Migration Plan

This document is the agreed plan for (1) consolidating ClinIQ's scattered, hardcoded
styles into a single centralized token source, and (2) adopting Tailwind CSS v4. It is
based on a deep audit of the codebase (Jun 2026) cross-checked against the Tailwind v4
docs and the bundled Next.js 16 docs in `node_modules/next/dist/docs/`.

**Status:** Planned — not yet started.

---

## 0. The core insight (why this is not a normal Tailwind migration)

The visible styling surface is misleading. There are only **18 inline `style={{}}`**
across 5 `.tsx` files and **8 React components** — but there are **~900 `class="…"`
occurrences inside template-literal HTML strings** in `renderFlow.ts`, `renderDx.ts`,
and `cliniqApp.ts`, injected via `dangerouslySetInnerHTML` (`src/app/page.tsx:108`).
Those strings also carry **computed** inline styles such as
`style="background:rgba(${h.rgb},0.12);border-color:rgba(${h.rgb},0.4);color:${h.color}"`
driven by the TypeScript `HUE` color table in `renderFlow.ts`.

Two facts follow, and they decide the strategy:

1. **Tailwind's scanner reads files as plain text** — it never sees interpolated
   fragments like `` `fn-ep-${t.anat}` `` or `` `dx-row c${cols}` ``. Utility-fying the
   HTML strings would silently break styles.
2. **The interpolated `rgba()` tones are computed/continuous** — they cannot be utilities
   and must not be force-safelisted.

**Therefore the win is consolidation + tokens, not "utilities everywhere."** We keep
semantic component classes (`.card`, `.flow-node`, `.dx-step`) as the reuse unit for the
HTML-string content, but make them — and the TS color tables, and the rogue literals —
all draw from **one** token source expressed via Tailwind v4's CSS-first `@theme`.
Utilities are applied only in the 8 real React components, where they pay off.

### Decisions taken
- **Scope of Tailwind adoption:** Tokens + components. Centralize all tokens; keep
  semantic CSS classes for HTML-string content; convert only the 8 React components to
  utilities.
- **Dark-mode bug:** Fix as part of this work (folded into the token phase).
- **Dark-mode mechanism:** Keep the existing `html[data-theme="dark"]` + `var()` cascade.
  Do **not** introduce `dark:` utilities (the `@theme` tokens are CSS variables, so
  `bg-surface` etc. auto-follow the theme when the var is redefined under
  `[data-theme="dark"]`).

---

## 1. Current state — what is actually hardcoded

### Four disconnected color systems that disagree with each other
1. `globals.css :root` — 21 CSS variables (12 overridden in the dark block).
2. **113 distinct rogue color literals** (`#93C5FD`, `rgba(37,99,235,0.12)`, …) used
   **220+ times** in CSS rules that bypass those variables entirely.
3. The TS `HUE` table (11 tones) + `TITLE` overrides + `CAT_STYLE` (9 disease categories)
   in `src/lib/signs/renderFlow.ts:22–38, 206–214` — a palette living in code.
4. Hardcoded colors in TSX (e.g. `Topbar.tsx:23` "Vet use only" badge).

**Misalignments between (1) and (3):** `warning` exists only in TS; `green` and `orange`
have *different RGB* in CSS vs TS; `violet`/`purple` are duplicate values. Colors are
named by hue (`--blue`, `--teal`), not by role — so changing an accent means editing many
places across both CSS and TS.

### Structural debt (worth fixing regardless of Tailwind)
- **~43% of `globals.css` is dead** — 55 unused classes (`.home-*`, `.lesion-*`,
  `.diff-*`, legacy `.fn-*`/`.dx-header`/`.dx-teal|blue|white` variants, `.empty`,
  `.branch-btn`). File can drop from 424 → ~250 lines.
- **Duplicate definitions** — `.dx-wrap` defined twice with **conflicting padding**
  (`0 4px 20px` vs `8px 0 20px`; cascade winner is the second); `.dx-row`/`.dx-note`
  redundantly redefined; `.notes-header` nested + standalone.
- **Dark mode partially broken (the bug we are fixing):**
  - Dynamically-rendered flowcharts use light-tuned `HUE` rgba backgrounds and only
    override *text* color under `[data-theme="dark"]` → low-contrast boxes on the dark
    navy background.
  - `Topbar.tsx:23` badge is hardcoded `#F87171` / `rgba(220,38,38,…)` and does not adapt.
  - ~40 CSS rules use hardcoded hex/rgba instead of `var()`, so they ignore dark mode.
- **Hydration flash** — theme is applied in a `useEffect` (`page.tsx:48`), so dark-mode
  users see a light flash on load.
- **Ad-hoc scales** — 10 font sizes (9–24px), 8 line-heights, 14 padding values (not
  4px-aligned), 8 radii, **15+ opacity values** (0.03–0.5, many non-standard).

### Environment (verified)
- `next@16.2.4`, `react@19.2.4`, TypeScript `^5`. **No Tailwind/PostCSS installed.**
- Turbopack is the default bundler in Next 16 and processes `postcss.config.*` natively
  (per `node_modules/next/dist/docs/.../08-turbopack.md`). No webpack fallback needed.
- `globals.css` imported once in `src/app/layout.tsx:4`. Path alias `@/*` → `./src/*`.
- Fonts via `next/font` exposed as `--font-dm-sans` / `--font-dm-mono`, consumed by
  `--font` / `--mono`.

---

## 2. Target architecture

- **Tailwind v4, CSS-first, zero JS config.** Install `tailwindcss` +
  `@tailwindcss/postcss` (+ `postcss`); a one-line `postcss.config.mjs`;
  `@import "tailwindcss"` at the top of `globals.css`. **No `tailwind.config.js`** and no
  `content` array (v4 auto-detects and does not auto-load JS config). Pin `^4.2`/`^4.3` —
  **avoid `4.1.18`** (crashes `next build` under Turbopack).
- **One token source via `@theme`.** Palette + scales live in `@theme`; the TS
  `HUE`/`CAT_STYLE`/`TITLE` tables become *consumers* of those tokens (see §3 for the
  CSS-variable bridge that also fixes dark mode).
- **Preflight OFF.** Import Tailwind's layers individually and omit `preflight.css` so it
  doesn't restyle headings/lists/borders/buttons over the existing deliberate reset
  (`*{margin:0;padding:0}`, custom `::-webkit-scrollbar`, `::placeholder`).
- **Cascade layers:** order `theme, base, legacy, components, utilities`. Legacy/semantic
  classes sit before `utilities` so a utility wins on conflict when wanted, while working
  classes stay untouched by default.
- **Dark mode** stays attribute-driven via the `var()` cascade; bridge tokens with
  `@theme inline` so the live `var()` resolves per theme (no `dark:` utilities).

### Setup snippets (for reference during implementation)

`postcss.config.mjs`:
```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

Top of `src/app/globals.css` — layered import with Preflight omitted:
```css
@layer theme, base, legacy, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
/* preflight.css intentionally omitted — we keep our own reset */
@import "tailwindcss/utilities.css" layer(utilities);

/* optional: only if a case can't be handled by the var() cascade */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

`@theme` + the dark-aware bridge (the existing `:root` / `[data-theme="dark"]` blocks stay):
```css
@theme inline {
  --color-surface: var(--navy);
  --color-card:    var(--card);
  --color-fg:      var(--white);
  --color-accent:  var(--teal-light);
  --color-line:    var(--border);
  --font-sans:     var(--font-dm-sans, "DM Sans", sans-serif);
  --font-mono:     var(--font-dm-mono, "DM Mono", monospace);
  --radius-card:   14px;
}
```
`inline` is required so utilities resolve to the live `var(--navy)` (which re-resolves
per theme) rather than snapshotting the light value.

---

## 3. The dark-mode fix (folded into the token work)

Root cause: the renderers interpolate **frozen** light-mode rgb values from `HUE`
(`renderFlow.ts:22–34`) straight into inline `style`, so dark mode can only patch text
color, never the backgrounds/borders.

Fix — route the tone palette through CSS custom properties so the cascade themes it:

1. Define tone tokens once in `:root`, override under `[data-theme="dark"]` where the dark
   surface needs a different value:
   ```css
   :root {
     --tone-danger: 220,38,38;
     --tone-teal:   13,148,136;
     /* …one per HUE tone… */
     --tone-danger-fg: #DC2626;   /* readable on light */
   }
   html[data-theme="dark"] {
     --tone-danger-fg: #FCA5A5;   /* readable on dark */
     /* adjust any rgb/fg that needs a distinct dark value */
   }
   ```
2. Change `HUE` so its values reference the vars instead of literals — e.g.
   `danger: { rgb: "var(--tone-danger)", color: "var(--tone-danger-fg)" }`. The renderers'
   existing `rgba(${h.rgb}, 0.12)` interpolation then emits
   `rgba(var(--tone-danger), 0.12)`, which re-resolves per theme automatically.
3. This simultaneously: (a) centralizes the palette, (b) fixes flowchart contrast in dark
   mode, and (c) eliminates the CSS↔TS palette disconnect (one source of truth).

The renderers' unit tests (`flows.test.ts`, `registry.test.ts`) should be checked — assert
on class names / structure, not on literal rgba strings, so this change stays green.

---

## 4. Phased plan (strangler-fig — each phase ships independently)

Every phase after the baseline must produce an **empty visual diff** (or an intentionally
reviewed one) against the Phase 0 baselines, in **both** `data-theme` states.

### Phase 0 — Cleanup + safety net (no Tailwind) — ✅ DONE
- [x] Delete the genuinely-dead classes from `globals.css` (424 → 356 lines).
- [x] Fix the `.dx-wrap` padding conflict; remove duplicate `.dx-row`/`.dx-note`;
      resolve the `.notes-header` nesting.
- [x] Stand up Playwright visual-regression baselines for every screen in light **and**
      dark (`toHaveScreenshot()`, small `maxDiffPixelRatio`). This is the guardrail for
      all later phases.

**Phase 0 outcome / corrections to the audit above:** a fresh class-usage census
(the flow/dx data model was refactored after the Jun-2026 audit) showed the "55 dead
classes" list was partly stale — `lesion-*`, `diff-*`, `.empty`, and the **entire `fn-*`
family** are *live* (emitted by `cliniqApp.ts` + the `fnHeader`/`cardGrid` blocks in
`renderFlow.ts`); deleting them would have broken the app. What was actually dead and
removed: the **old `.dx-*` view system** (`dx-header`/`-tab`/`dx-h-*`/`dx-box`/`dx-teal`/
`dx-blue`/`dx-white`/`dx-orange`/`dx-orange-outline`/`dx-gray`/`dx-finding`/`dx-result`
+ their dark overrides — superseded by the renderer's `dx-step`/`check`/`branch`/`test`/
`note`/`alert` and the html-block `dx-connector`/`dx-col`), the **old flow-connector
system** (`flow-connector`/`-branch-line`/`-h-line`/`-branch-grid`/`cols-2|4`/
`flow-divider`/`flow-label`/`endpoint-tip`), the **`home-*`/`hc-*` grid**, `.branch-btn`,
and the **inline `.notes-box`** family (distinct from the live NotesPanel `.notes-*`;
removing it also resolved the `.notes-header` nesting). `.dx-alert` was the lone live
class inside the old-dx block and was preserved.

**Test harness (the guardrail):** `npx playwright test` — `playwright.config.ts` +
`tests/visual/screens.spec.ts`, 22 baselines in `tests/visual/__screenshots__/` (11
screens × light/dark: the 5 tabs, a `fn-*`/`flow-*` flowchart, a `dx-*` view, a disease
page, a protocol detail, the NotesPanel). The webServer builds with
`NEXT_PUBLIC_CONVEX_URL=` (no auth) + `NEXT_DIST_DIR=.next-pw` (isolated build dir,
won't clobber a running `next dev`) on port 3456. Regenerate intentionally with
`npx playwright test --update-snapshots`. Verified: vitest 185✓, `tsc` clean, 22/22
visual ✓ (empty diff both themes) after the cleanup.

### Phase 1 — Tooling (zero visual change)
- [ ] Install `tailwindcss @tailwindcss/postcss postcss` (pin `^4.2`/`^4.3`, not 4.1.18).
- [ ] Add `postcss.config.mjs`; add the layered import (Preflight omitted) at the top of
      `globals.css`; add the `@custom-variant` line.
- [ ] Confirm `next dev`/`next build` pass and the visual diff is empty.

### Phase 2 — Tokens-first + dark-mode fix (the centralized style library)
- [ ] Lift colors/spacing/radii/type into `@theme`; reconcile the CSS↔TS misalignments
      into one canonical palette.
- [ ] Replace the 113 rogue literals + opacity ramps with tokens (+ v4 `--alpha()` /
      slash-modifiers for tints).
- [ ] Implement the tone-token CSS-variable bridge (§3) and repoint `HUE`/`CAT_STYLE`/
      `TITLE` at it; verify dark-mode contrast on the flowcharts.
- [ ] Visually inert except the intended dark-mode contrast improvements.

### Phase 3 — Semantic classes into `@layer components`
- [ ] Wrap the kept component classes (`.card`, `.tag*`, `.fn*`, `.flow-*`, `.dx-*`,
      `.notes-*`, `.proto-step`, …) in `@layer components`, reading tokens via `var()`.
- [ ] Do **not** `@apply`-rewrite them (avoids the `@apply` anti-pattern) and do not
      utility-fy the HTML strings.

### Phase 4 — Convert the 8 React components + pages to utilities (one PR each)
- [ ] `Topbar`, `BottomNav`, `NotesPanel`, `AccountMenu`, `layout.tsx`, `page.tsx`,
      `login/page.tsx`, `ConvexClientProvider`.
- [ ] Fold in hardcoded-color fixes: Topbar badge, login `#fff`, AccountMenu shadow,
      viewport `themeColor`.
- [ ] Add the pre-hydration inline `<script>` in `layout.tsx <head>` to set `data-theme`
      from `localStorage` before React hydrates (removes the flash).

### Phase 5 — (optional) retire computed inline styles in renderers
- [ ] Optionally move `rgba(var(--tone-x), …)` into a `--tone-bg`/`--tone-border` custom
      property + `bg-(--tone-bg)` so styling lives in classes. Defer-able or skip.

---

## 5. Risks & v4-specific gotchas
- **Preflight collisions** — mitigated by omitting `preflight.css` (Phase 1).
- **`4.1.18` build crash** under Turbopack — pin a current `^4.2`/`^4.3`; keep
  `tailwindcss` and `@tailwindcss/postcss` on the same version.
- **Default border color is now `currentColor`** — always pair a bare `border` with a
  color utility.
- **Renamed utilities** (`shadow`→`shadow-sm`, `rounded`→`rounded-sm`, `outline-none`→
  `outline-hidden`, `*-opacity-*`→`/` modifier, `flex-shrink`→`shrink`) — use v4 names.
- **Browser floor** — v4 targets Safari 16.4+ / Chrome 111+ / Firefox 128+. Confirm
  acceptable for the audience before committing.
- **`@tailwindcss/upgrade` is not applicable** (it's a v3→v4 upgrader; we have no v3).
  Useful only as a reference for the renamed-utility list.
- **Don't utility-fy interpolated class fragments** in the renderers — the scanner can't
  see them. Keep them as semantic classes (which is the chosen strategy anyway).

## 6. Definition of done
- Every screen renders pixel-identical to the Phase 0 baseline in light and dark, except
  the intended dark-mode contrast fix on flowcharts.
- A single token source of truth: no stray hardcoded hex that duplicates a token; CSS and
  TS palettes reconciled.
- Dead CSS removed; duplicate definitions resolved.
- The `@layer legacy` scaffolding has been promoted to `@layer components` (or converted),
  leaving a clean layered stylesheet.
