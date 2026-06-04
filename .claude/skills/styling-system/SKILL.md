---
name: styling-system
description: How ClinIQ is styled — Tailwind v4 (CSS-first, no JS config), the single CSS-variable token source in globals.css (semantic vars + tone/category/fg palettes + @theme utility tokens), attribute-driven light/dark mode, the cascade-layer order, and the two styling worlds (Tailwind utilities in the chrome components vs semantic @layer-components classes + inline style objects in the clinical screen components). Use when changing any colour/spacing/font, adding or editing CSS in globals.css, styling a React component, touching the HUE/TITLE/CAT_STYLE tone tables, fixing light/dark-mode appearance, or adding a new token. Always verify visual changes with the Playwright guardrail (see "Verifying").
---

# ClinIQ styling system

ClinIQ uses **Tailwind v4, CSS-first, with zero JS config**. There is no `tailwind.config.js`
and no `content` array (v4 auto-detects sources). Everything style-related lives in
**one file** — `src/app/globals.css` — plus classes/styles in the React components and the
tone tables in `src/lib/signs/tone.ts`. All colours flow from **one set of CSS variables**.

> History & rationale for every decision below is in **`STYLE_MIGRATION.md`** (the Phase 0–4 plan,
> with outcome notes). Read it if you need the "why".

## The two styling worlds

| World | What | How it's styled |
|---|---|---|
| **Chrome components** (`Topbar`, `BottomNav`, `NotesPanel`, `AccountMenu`, `layout`, `page`, `login`, `ConvexClientProvider`) | the app frame | **Tailwind utilities** referencing tokens (`text-(--color-fg)`, `bg-(--color-surface)`, …). |
| **Clinical screen components** (`src/app/screens/*View.tsx` + `TabHome`, `RichText`) | all clinical content (cards, flowcharts, dx views, disease/lesion pages) | **semantic classes** in `@layer components` (`.card`, `.tag*`, `.fn*`, `.flow-*`, `.dx-*`, `.proto-step`, …) via `className`, **plus inline style objects** for the tone tints / bespoke styles (built with `styleStringToObject` from `screens/style.ts`). |

**Critical rule:** **don't use Tailwind utilities in the clinical screen components.** They reproduce
the data's semantic classes + inline styles **byte-for-pixel**, and the tone tints are computed
`rgba(var(--tone-x), α)` style objects (e.g. `` `dx-row c${cols}` ``, `` `fn-ep-${anat}` ``). Utility-
fying them would diverge from the tokens and break pixel parity. Tailwind utilities are only for the
chrome components; the screen components use `className="…semantic…"` + `style={s('…')}`.

## Where everything lives

| File | Role |
|---|---|
| `src/app/globals.css` | **The whole stylesheet.** Tailwind import + cascade layers + all tokens (`:root`) + dark overrides + `@theme` + `@layer base` reset + `@layer components` semantic classes + a few retained pseudo-elements. |
| `postcss.config.mjs` | One line — the `@tailwindcss/postcss` plugin. Turbopack runs it natively. |
| `src/lib/signs/tone.ts` | `HUE` / `TITLE` tone tables — **reference the CSS vars** (`var(--tone-danger)` etc.), not literals. Consumed by `FlowPageView` + `DxApproachView`, which emit `rgba(var(--tone-x), α)` style objects. (The `CAT_STYLE` category-column table lives in `FlowPageView.tsx`; the lesion-grid `CC` colour map in `LesionLocView.tsx`.) |
| `src/app/layout.tsx` + `public/theme-init.js` | The pre-hydration theme init is now an **external render-blocking** `<script src="/theme-init.js">` (sets `data-theme` from `localStorage` before paint — anti-flash; no inline `dangerouslySetInnerHTML`). `viewport.themeColor` light/dark pair is in `layout.tsx`. |
| `tests/visual/screens.spec.ts` + `playwright.config.ts` | **The visual-regression guardrail** (see "Verifying"). |

## The token source (all in `globals.css :root`)

Everything draws from these CSS variables. Edit a value here and it changes everywhere — in CSS,
in the React utilities, and in the TS tone tables.

1. **Base semantic vars** — `--navy`/`--navy2`/`--navy3` (surfaces), `--white` (fg — yes, it's the
   text colour, dark on light / light on dark), `--gray`/`--gray2` (muted), `--border`/`--border2`,
   `--card`/`--card2`, `--teal`/`--teal-light` (accent), `--amber`/`--amber-rgb`/`--amber-text`,
   `--red`/`--em`/`--em-bg`/`--hi-bg`/`--mo-bg`/`--lo-bg`, `--blue`/`--green`, `--font`/`--mono`.
2. **Tone palette** — `--tone-{danger,warning,info,teal,green,violet,purple,indigo,orange,slate,neutral}`
   are **rgb triplets** (e.g. `220,38,38`) fed into `rgba(var(--tone-x), α)`; `--tone-*-fg` are the
   readable foregrounds; `--tone-{danger,warning}-title` are the brighter header shades. Consumed by
   `HUE`/`TITLE` in `src/lib/signs/tone.ts`.
3. **Category palette** — `--cat-{vascular,inflammatory,mass,immune,degenerative,metabolic,toxic,trauma,anomalous}`
   (+`-fg`). Consumed by the `CAT_STYLE` map in `FlowPageView.tsx` (the `categoryColumns` disease-category columns).
4. **Element-fg palette** — `--fg-{blue,teal,amber,red,indigo,violet,green,slate,orange}-deep`: a deep
   shade on light that **flips to a bright shade in the dark block**. Used by `.flow-node.*` /
   `.flow-endpoint.*`. The bright shades `--fg-{blue,teal,indigo,violet}-bright` are reused by the
   always-bright `.fn-*` / `.fn-ep-*` families.
5. **`@theme inline` utility tokens** — `--color-surface`/`-surface-2`/`-card`/`-fg`/`-muted`/`-accent`/`-line`,
   `--font-sans`/`-mono`, `--radius-card`. `inline` means a utility resolves to the **live `var()`**
   (re-resolving per theme), not a snapshot. These generate `bg-surface`, `text-fg`, `border-line`,
   `rounded-card`, `font-sans`, … and back the `(--color-x)` shorthands used in the components.

## Light / dark mode

- **Mechanism: attribute-driven, not `dark:` utilities.** `html[data-theme="dark"]` redefines the
  base vars (and `--amber-text`, `--em-bg` tints, and the `--fg-*-deep` flips). Because everything
  reads `var()` — including the `@theme inline` tokens — `bg-surface`, `.card`, `rgba(var(--tone-x),…)`
  etc. all re-resolve automatically. There is **no** `[data-theme=dark]` rule per component any more.
- **A `@custom-variant dark` exists** (so a `dark:` utility *could* be written) but we don't use it —
  prefer the var cascade.
- **Set the theme:** initial value is applied pre-hydration by `public/theme-init.js` (a render-blocking
  `<script src>` in `layout.tsx <head>` reading `localStorage['cliniq-theme']`); changes go through
  `setTheme()` in `SettingsHome` (`src/app/screens/TabHome.tsx`, the Settings tab), which sets the
  `data-theme` attribute + localStorage + local state.
- **To make something theme-aware:** point it at a var that has a dark override (or add one). Light value
  in `:root`, dark value in the `html[data-theme="dark"]` block. Don't hardcode a hex in a rule/utility.

## Cascade layers (why order matters)

Declared order (`globals.css:6`): **`theme, base, legacy, components, utilities`** — later wins.

- `@layer base` — the reset (`*{margin:0;padding:0}`, `html,body`, `body`). **Must stay layered**: an
  unlayered rule beats *every* layered rule regardless of specificity, so an unlayered `*{padding:0}`
  would clobber a layered `.card{padding}`.
- `@layer components` — all the semantic classes.
- `utilities` (last) — so a Tailwind utility **wins** when a component element has both a semantic
  class and a conflicting utility.
- **Unlayered** (highest priority): `:root`, `@theme`, the `html[data-theme="dark"]` block, the
  Tailwind `@import`s. These only declare custom properties / are layer-routed, so they don't clobber.

## Styling a React component (utilities)

Reference tokens, don't hardcode colours. Two equivalent forms:

```tsx
// Property-shorthand against a CSS var (what the components currently use):
<div className="bg-(--color-surface) text-(--color-fg) border border-(--color-line)" />
// `(--x)` resolves to the natural property: bg→background-color, text→color, border→border-color.

// Or the @theme-generated named utilities (identical result):
<div className="bg-surface text-fg border border-line rounded-card font-sans" />

// Raw vars without a --color-* alias, or tone tints → arbitrary values:
<div className="bg-[var(--card2)] text-[var(--gray2)]" />
<div className="bg-[rgba(var(--tone-danger),0.15)] border-[rgba(var(--tone-danger),0.2)]" />
```

- **Stateful styling → conditional utilities** (not `.active`/`.open` classes), using a ternary that
  picks ONE class to avoid utility conflicts: `${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
  `${active ? 'text-(--color-accent)' : 'text-[var(--gray2)] hover:text-(--color-muted)'}`.
- **Use exact `text-[14px]`** (not `text-sm`/`text-base`) when matching a legacy size — the named
  scale also sets line-height and can shift layout.
- **Pseudo-elements that utilities can't express stay as CSS** in `globals.css` (e.g.
  `input[type=color]::-webkit-color-swatch`, `.notes-editor:empty::before`). Anchor them on a retained
  class or attribute and `data-*`-hook the tests, not the styling classes.
- **`AccountMenu` + `/login` are Convex-gated** (render `null` without `NEXT_PUBLIC_CONVEX_URL`) — the
  visual guardrail can't see them, so changes there are unverified; touch with care.

## Styling clinical screen components (semantic classes + style objects)

The clinical content is React components (`src/app/screens/*`). They apply the existing semantic classes
via `className` (they live in `@layer components` and read tokens) and build bespoke/tone styles as
**inline style objects** with `s('…')` (`styleStringToObject`) — e.g. `style={s(\`background:rgba(\${HUE[tone].rgb},0.1)\`)}`.
To restyle a class, edit it in `globals.css`. To recolour a tone, **don't touch the component** — edit
the `--tone-*` / `--cat-*` var (one place, updates the CSS classes + the `tone.ts` tables together).
Authored-HTML leaf fields render through `<RichText>` (12-tag allowlist); `dangerouslySetInnerHTML` is
lint-banned (`react/no-danger`).

## Common changes (recipes)

- **Re-brand the accent / change a colour:** edit the var in `:root` (and its `html[data-theme="dark"]`
  override if it differs per theme). Done — propagates to CSS, utilities, and the TS tone tables.
- **Add a new tone:** add `--tone-x` (rgb triplet) + `--tone-x-fg` in `:root`; add `x` to the `Tone`
  type (`flowTypes.ts`) and the `HUE` map (`src/lib/signs/tone.ts`, pointing at the vars).
- **Fix dark contrast on something:** add/adjust the relevant override in the `html[data-theme="dark"]`
  block — a base var, a `--tone-*-fg`, or a `--fg-*-deep`. Light stays untouched.
- **Add a new semantic component class:** add it inside `@layer components`, colours via `var(--…)`.
- **Expose a new utility token** (for component utilities): add `--color-x` to `@theme inline` → gives
  `bg-x`/`text-x`/`border-x`.
- **Pin caution:** keep `tailwindcss` and `@tailwindcss/postcss` on the **same `^4.3`** version; never
  `4.1.18` (crashes `next build` under Turbopack).

## Verifying (do this for ANY visual change)

The guardrail is **29 screens × light/dark = 58 baselines** in `tests/visual/__screenshots__/`.

```bash
npx playwright test                      # compare against baselines — must stay 58/58 green
npx playwright test --update-snapshots   # ONLY after reviewing an *intended* visual change
```

- It builds the app with `NEXT_PUBLIC_CONVEX_URL=` (no auth) + `NEXT_DIST_DIR=.next-pw` (isolated build
  dir, won't clobber a running `next dev`) on port **3456**, so it's reproducible and standalone. It
  drives navigation via `window.__nav(view)`.
- **Any styling change that isn't meant to be visible must keep 58/58 green.** If a test fails,
  open `test-results/**/<name>-diff.png` — the red region tells you exactly what moved (e.g. a
  right-edge strip = the off-screen NotesPanel leaking in, not a real regression).
- A token refactor where the new value **equals** the old (e.g. literal → equal `var()`) is provably
  inert and stays green even on screens the 29 don't cover.
- Also run `npx tsc --noEmit` (everything type-checks — nothing is `@ts-nocheck`) and `npm test`
  (vitest — link/structure tests + the RichText allowlist guard, colour-agnostic).

## v4 gotchas

- **Preflight is omitted** — we import `tailwindcss/theme.css` + `tailwindcss/utilities.css` (not
  `preflight.css`) so our own reset stands. Don't add `@import "tailwindcss";` (that pulls Preflight).
- **Default border colour is `currentColor`** — always pair a bare `border` with a colour
  (`border border-(--color-line)`).
- **Use v4 utility names** — `shadow-sm`/`rounded-sm`/`outline-hidden`, the `/` opacity modifier, `shrink`.
- **Don't safelist or utility-fy the interpolated tone tints** — they're computed `rgba(var(--tone-x),α)`
  in the renderers; leave them as the var-based inline styles.
