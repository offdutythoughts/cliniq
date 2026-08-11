---
name: screen-components
description: How ClinIQ's UI is built — every screen is a React component, driven by a typed View router. Covers the View union + NavContext/useNav, the Screen dispatcher, the per-screen components in src/app/screens, the audited RichText leaf-HTML boundary, and the shared style/markup/tag helpers. Use when adding or editing any screen or component, adding a View kind or navigation link, rendering authored HTML via RichText, converting inline styles, or changing how a flow/dx block renders. Pair with flowchart-data (the typed CONTENT the screens render) and styling-system (CSS tokens/classes).
---

# ClinIQ screen & component architecture

ClinIQ is a **single-page React app**. There is **no HTML-string rendering**: every screen is a
React component selected by a typed router. The old engine (`cliniqApp.ts`, `renderFlow.ts`,
`renderDx.ts`, `dangerouslySetInnerHTML`, `window`-global `onclick` navigation, `mountGlobals`) was
deleted — **`react/no-danger` is an ESLint error**, so never reintroduce `dangerouslySetInnerHTML`.

The data flow is:

```
typed data (FLOWS / DX / DB)  →  a View (what screen to show)  →  <Screen view> dispatcher  →  the screen component  →  real DOM
                                       ▲ useNav() drives it                                   ▲ leaf authored-HTML goes through <RichText>
```

## Where everything lives

| File | Role |
|---|---|
| `src/app/nav/view.ts` | The **`View`** discriminated union (one variant per screen), `linkToView(link)` (typed flow `Link` → View), `screenMeta(view)` (topbar title + notes key/title, derived from data), `viewKey(view)` (stable id for React keys + animation), `parseLegacyOnclick(js)` (raw `onclick="fn('id')"` → View, used by RichText). |
| `src/app/nav/NavContext.tsx` | `NavProvider` + **`useNav()`** → `{ view, stack, tab, slideDir, navigate, replace, goBack, navTo, refresh }`. The React replacement for the old `history`/`navTo`/`slideDir` engine; the back stack is `View[]`. |
| `src/app/screens/Screen.tsx` | The **dispatcher**: `switch (view.kind)` → the screen component. Exhaustive (never-default). |
| `src/app/screens/*View.tsx` + `TabHome.tsx` | The **screen components** (one per View kind — see table below). |
| `src/components/RichText.tsx` | The **audited leaf-HTML boundary** — turns authored `html:` data into real elements via an allowlist (no `dangerouslySetInnerHTML`). |
| `src/app/screens/style.ts` | `styleStringToObject(str)` — converts a legacy inline-style string to a React style object. |
| `src/app/screens/markup.tsx` | `<Linkify>` (`@DIS-…`/`@PROT-…` tokens → nav) and `<Bul>` (pipe `#`/`-`/bullet markup) — the disease/lesion/diff bullet renderers. |
| `src/app/screens/tags.tsx` | `<SpTag>` / `<UrgTag>` / `urgClass()` — the `.tag tag-*` species/urgency chips. |
| `src/app/screens/protocolCards.tsx` | **The protocol rule**, in one place: `protocolsForDisease` / `protocolsForLesion` decide which protocols a page owns; `<ProtocolCards>` draws the card stack at the top of the page; `<DiseasePageCard>` is the lesion→diagnosis route. Used by `DiseasePageView`, `SubTypeDetailView`, `LesionDetailView` — never re-implement a protocol card in a screen. See the **flowchart-data** skill for the authoring rule. |
| `src/app/screens/NotFound.tsx`, `InjuryGradingTable.tsx`, `diagnosticHomeCards.ts` | Small shared/static pieces. |
| `src/app/page.tsx` | Host: `<NavProvider>` → `<Screen view={nav.view}>` inside `.screen-inner`; wires Topbar/BottomNav/NotesPanel and the slide animation; exposes `window.__nav(view)` (deep-link + test hook). |
| `src/lib/signs/tone.ts` | `HUE` / `TITLE` tone→CSS-var tables (shared by FlowPageView + DxApproachView). |

## The View union (`view.ts`) — 9 kinds

```ts
type View =
  | { kind: 'tab'; tab: 0|1|2|3|4 }            // the 5 bottom-nav homes
  | { kind: 'flow'; flowId: string }            // a clinical-sign flowchart (FLOWS[flowId])
  | { kind: 'dx'; sign: string; tab: string }   // a diagnostic-approach view (DX[sign], tab key)
  | { kind: 'disease'; id: string }             // a disease page (DB.disease_page)
  | { kind: 'protocol'; id: string }            // a protocol (DB.protocols)
  | { kind: 'lesionLoc'; loc: string; name: string }   // a lesion-location category grid
  | { kind: 'subTypeDetail'; id: string }       // a lesion sub-type detail (DB.lesion_type)
  | { kind: 'lesionDetail'; id: string }        // a lesion quick-detail
  | { kind: 'diff'; id: string }                // a differential detail (DB.differentials)
```

Add a variant here, then a `case` in `Screen.tsx`, `viewKey`, and `screenMeta` (TS makes all three
exhaustive — it won't compile until you do). `screenMeta` must reproduce the notes key scheme so saved
notes carry over (e.g. dx is `page:dx<Pascal><Tab>`).

## Navigation

- `const nav = useNav()` in any client component under `<NavProvider>`.
- **`nav.navigate(view)`** — push a screen (forward slide). **`nav.replace(view)`** — swap in place
  (dx tab switches). **`nav.goBack()`** — pop (back slide). **`nav.navTo(tab)`** — switch bottom-nav
  tab, clearing the stack. **`nav.refresh()`** — re-render without changing the view.
- From a typed flow/dx `Link`: `onClick={() => nav.navigate(linkToView(link))}`. From a `@DIS-`/`@PROT-`
  token or a raw-html `onclick`: handled inside `<Linkify>` / `<RichText>` (via `parseLegacyOnclick`).
- The topbar back-arrow shows when `nav.stack.length > 0`. Note key/title come from `screenMeta(view)`.

## The screen components (`Screen.tsx` dispatch)

| View kind | Component | Renders |
|---|---|---|
| `tab` | `TabHome` (`LocaliseHome`/`DiagnosticHome`/`DiseaseHome`/`ProtoList`/`SettingsHome`) | the 5 bottom-nav homes; DiseaseHome search is React state + `Array.filter()` |
| `flow` | `FlowPageView` | a `FlowPage` — one sub-component per `Block` kind, the arrow spine, `.flow-wrap`/`.fn` layouts |
| `dx` | `DxApproachView` | a `DxApproach` — `DxTabs` + the `.dx-wrap` block spine; tab clicks `nav.replace` |
| `disease` | `DiseasePageView` | the disease card stack (etiology/signalment/…/pearls); `<Bul>`/`<Linkify>`; `InjuryGradingTable` |
| `protocol` | `ProtocolDetailView` | `.em-alert` + `.proto-step` rows with pipe-markup |
| `lesionLoc` | `LesionLocView` | category-grouped grid (its own `CC` colour map) → tappable sub-types |
| `subTypeDetail` | `SubTypeDetailView` | the richest leaf (etiology @-links, patho/diag/treat/ddx sections); `directDis` → `DiseasePageView` |
| `lesionDetail` | `LesionDetailView` | tags + signs + differentials list |
| `diff` | `DiffDetailView` | a differential's feature/dx + disease-page card |

Each component is a faithful port of a legacy `render*` function and renders **byte-for-pixel
identical** output — same `className`s, same inline styles, same structure.

## RichText — the audited leaf-HTML boundary

The flow/dx **data** embeds authored HTML in `html:` fields (and `kind:'html'` blocks). `<RichText
html={…} onNavigate={nav.navigate} />` parses it into real React elements via **html-react-parser**
against a **closed allowlist**:

- **Tags:** `div span strong b em br table thead tbody tr th td`. Anything else is dropped (text kept).
- **Attrs:** `style` → object, `class` → `className`, `colspan` → `colSpan`. Every `on*` is dropped —
  except an inline `onclick="renderX('id')"` is recognised and turned into a **real React `onClick`**
  that navigates (via `parseLegacyOnclick` + `nav.navigate`); it is never a live DOM attribute.
- Use `<RichText>` for any raw authored-HTML field. Use **plain `{text}`** for fields the legacy
  `esc()`'d (React escapes too) — see parity rules. `richTextToNodes(html, onNav)` is the non-component form.
- The allowlist is enforced by **`src/components/allowlist.test.ts`** (fails if flow/dx data ever uses a
  tag/attr outside it — e.g. `<a>`, `<img>`, `<script>`, `href=`, `src=`). If new content genuinely
  needs a tag, add it to both the `ALLOWED` set in `RichText.tsx` and the guard.

## Pixel-parity rules (how the ports stay identical)

These three rules make a component reproduce a legacy string exactly:

1. **Inline style string → `styleStringToObject('…')`** (or a hand-written style object). React
   re-serialises the object (adds spaces, a trailing `;`) so the emitted style *attribute string*
   differs textually, but it **computes identically** → pixel-identical. (This is why the guardrail is a
   pixel screenshot, not a DOM diff.) Copy the legacy style string **verbatim** into `s('…')` to avoid
   transcription drift.
2. **`esc()`'d text → plain `{value}`** — React escapes `&<>` exactly like `esc` did. Simpler and identical.
3. **Raw/un-`esc`'d HTML field → `<RichText html={value} onNav={…}>`** — these "may contain `<br>`/
   `<strong>`/`onclick`". Using plain `{value}` here would render tags as visible text (wrong).

When porting, check the legacy source per field: did it `esc()` (→ rule 2) or insert raw (→ rule 3)?

## How to add or edit a screen component

1. **Find the component** for the View kind (table above). Edit JSX; keep `className`s and inline
   styles identical to the source unless you intend a visual change.
2. **Reuse the helpers** — `s()` for styles, `<Bul>`/`<Linkify>` for pipe/@-markup, `<SpTag>`/`<UrgTag>`
   for chips, `<RichText>` for raw html, `HUE`/`TITLE` from `tone.ts` for tones. Don't hand-roll markup
   that already has a helper.
3. **Navigation** uses `useNav()` + `linkToView`, never window globals or `<a href>`.
4. **A new screen kind:** add the `View` variant → `Screen.tsx` case → `viewKey` + `screenMeta` cases →
   the component file. If a flow/dx `Link` should reach it, extend the `Link` type (`flowTypes.ts`) +
   `linkToView` + `parseLegacyOnclick`.
5. **Verify** (below). Clinical text is safety-critical — never paraphrase, reorder, or drop a word,
   entity, unicode glyph, or `<strong>`/`<em>`.

> **Content vs components.** To add/edit clinical *content* (a flowchart, dx view, or disease/lesion/
> protocol/differential page), you edit **typed data**, not these components — see the **flowchart-data**
> skill. You only touch a `*View.tsx` to change how a screen is *laid out/rendered*, or to add a new
> block/View kind. For colours/tokens/CSS classes, see **styling-system**.

## Verification

```bash
npx tsc --noEmit                       # everything type-checks now (nothing is @ts-nocheck)
npm test                               # vitest: link integrity, RichText allowlist, screenMeta parity
npx playwright test                    # 29 screens × light/dark = 58 baselines — MUST stay 58/58 green
npx playwright test --update-snapshots # ONLY after reviewing an intended visual change
NEXT_PUBLIC_CONVEX_URL= npm run dev    # auth-bypassed; browser-verify
```

- **The Playwright suite is the parity oracle** (`tests/visual/screens.spec.ts`). It navigates by
  calling **`window.__nav(view)`** (the app's programmatic-nav hook) — to add coverage for a new screen,
  add a `SCREENS` entry and `--update-snapshots` (capturing the new component's output as the baseline).
- A pure refactor must produce an **empty diff**. On failure, open `test-results/**/*-diff.png`.
- Unit tests of pure pieces: `richText.test.ts` (allowlist, style/var parsing, onclick stripping,
  `parseLegacyOnclick`, `screenMeta`), `allowlist.test.ts` (data tag/attr guard), `flows.test.ts`
  (every typed Link + raw-html onclick resolves to a real `DB`/`FLOWS`/`DX` target).

## Pitfalls

- **Never `dangerouslySetInnerHTML`.** It's lint-banned. Authored HTML goes through `<RichText>`.
- **Don't use Tailwind utilities in the screen components** — they reproduce the data's semantic
  classes + inline styles (see styling-system); utilities would diverge from the tokens and risk drift.
- **Copy inline style strings verbatim** into `s('…')`. A hand-retyped style is the most common parity bug.
- **Match `esc` vs raw per field** (parity rule 2 vs 3). Wrong choice → tags shown as text, or text wrongly parsed.
- **Keep `screenMeta` note keys stable** — they key saved notes; changing one orphans a user's note.
- **dx `replace` vs `navigate`:** tab switches use `nav.replace` (in-place); navigating *to* a dx uses
  `nav.navigate` (so Back returns to the flow).
- **Emoji/variation-selectors:** when hard-coding card content (e.g. `diagnosticHomeCards.ts`), extract
  it byte-exact from the source — retyping `🌬️` etc. can drop the variation selector and shift a glyph.
