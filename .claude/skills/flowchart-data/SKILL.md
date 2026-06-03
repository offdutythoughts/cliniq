---
name: flowchart-data
description: How ClinIQ's clinical-sign content is modelled as typed data and rendered to the UI — the flowcharts (FlowPage/Block → renderFlow → FLOWS), the diagnostic-approach views (DxApproach/DxBlock → renderDx → DX), and the reference DB (diseases/lesions/protocols/differentials) the links point at. Use when adding or editing any clinical-sign flowchart or Dx view, touching the block models (flowTypes.ts / dxTypes.ts) or renderers (renderFlow.ts / renderDx.ts), wiring a sign into the registries/dispatch, or adding/changing a disease/lesion/protocol/differential page.
---

# ClinIQ clinical-sign data & rendering

ClinIQ's clinical content is **declarative typed data** drawn by **generic renderers** that emit HTML strings. There are no hand-authored HTML page-functions any more — they were all migrated out. The whole system lives in `src/lib/signs/` plus one reference-content object in `cliniqApp.ts`.

There are **two parallel data models** + the **content they link to**:

| Layer | What it is | Model | Renderer | Registry | Dispatch |
|---|---|---|---|---|---|
| **Flowcharts** | the decision-tree screens (entry + sub-flows) | `FlowPage`/`Block` (`flowTypes.ts`) | `renderFlow.ts` | `FLOWS` (`flows/index.ts`) | `renderFlowId(id)` |
| **Dx views** | the History/Exam/Diagnostics tabs | `DxApproach`/`DxBlock` (`dxTypes.ts`) | `renderDx.ts` | `DX` (`dx/index.ts`) | `renderDxId(sign, tab)` |
| **Reference DB** | disease pages, lesion lists, protocols, differentials (the leaf pages links open) | plain JS arrays in the `DB` object | functions in `cliniqApp.ts` | `DB.{disease_page,lesion_type,protocols,differentials}` | `renderDiseasePage` / `goLesionTab` / `renderProtoDetail` / `renderDiffDetail` |

> The renderers are **pure** (`data → HTML string`). `cliniqApp.ts` calls them and injects the string via React `dangerouslySetInnerHTML`; `onclick` handlers in the generated HTML call window globals registered in `mountGlobals()`. `cliniqApp.ts` has `@ts-nocheck` (it does **not** type-check) — the data files in `src/lib/signs/` DO, so keep logic typed and keep `cliniqApp.ts` as a thin bridge.

## Where everything lives

| File | Role |
|---|---|
| `src/lib/signs/flowTypes.ts` | Flowchart model — `FlowPage`, every flow `Block`, `Tone`, `Link`. |
| `src/lib/signs/renderFlow.ts` | Flowchart renderer — `renderFlowPage(page)`. Owns the `HUE` tone→rgba map (exported), `TITLE`, `esc`, `onclick`, the arrow/spine logic, and how each block becomes HTML. **Read it to author data that reproduces exact markup.** |
| `src/lib/signs/flows/<sign>.ts` | One flowchart data file per sign → a `FlowPage` or `FlowPage[]`. |
| `src/lib/signs/flows/index.ts` | Aggregates every page into `FLOWS` (keyed by `FlowPage.id`). |
| `src/lib/signs/dxTypes.ts` | Dx model — `DxApproach`, `DxTab`, `DxBlock`, `DxNavItem`. |
| `src/lib/signs/renderDx.ts` | Dx renderer — `renderDxApproach(sign, approach, tab)`. Reuses `renderFlow`'s exported `HUE`/`TITLE`/`esc`/`onclick`. |
| `src/lib/signs/dx/<sign>.ts` | One Dx data file per sign → a `DxApproach`. |
| `src/lib/signs/dx/index.ts` | Aggregates into `DX` (keyed by sign id). |
| `src/lib/signs/registry.ts` | `SIGNS` — the home-screen list. Each entry `{ id, icon, title, sub, flowId }`; `flowId` is **required**. |
| `src/lib/cliniqApp.ts` | The bridge: `renderFlowId` / `renderDxId` dispatch, `mountGlobals()`, the `DB` reference object, and the link-target resolvers. |
| `src/lib/signs/flows.test.ts` | Link-integrity tests over every flow + Dx page (typed links **and** raw onclicks inside `html` blocks). |
| `src/lib/signs/registry.test.ts` | Asserts every `SIGNS.flowId` resolves to a real `FLOWS` page. |

There is **no** legacy any more: the old `src/lib/signs/<sign>.ts` HTML consts, the `renderDx*` / `render*Flow` functions, `LEGACY_FLOWS`/`LEGACY_HTML`, and the content-parity test are all deleted. `FLOWS`/`DX` are the single source of truth — `renderFlowId`/`renderDxId` resolve a page from them (or show an empty state). (`renderDxId` still has a legacy-fallback branch, but it's inert now that every sign is migrated — safe to delete on the next cleanup.)

---

## Model 1 — Flowcharts

A `FlowPage` is `{ id, title, layout?, blocks: Block[] }`. A sign has an **entry** page (its `id` = the registry `flowId`) plus 0..n **sub-flow** pages (`id` like `'<sign>-coats'`). `layout` is `'flow'` (default) or `'fn'`.

**Block catalog** (all in `flowTypes.ts`; renderer in `renderFlow.ts`):

| Block | Reproduces | Key fields |
|---|---|---|
| `node` | `.flow-node` entry/step/sub-step header | `variant`, `text`, `sub?`, `tone?` (entry only) |
| `branch` | N-column split with per-column header + body | `columns: { header, tone, sub?, blocks }[]` (recursive) |
| `endpoints` | vertical stack of `.flow-endpoint` leaf links | `items: { label, sublabel?, tone?, icon?, link? }[]` |
| `choices` | grid of clickable pattern-nodes | `cols?`, `size?`, `items: { variant?\|tone?, label(html), sublabel?(html), link? }[]` |
| `cardGrid` | `.fn-row` grids of `.fn-ep` location cards | `perRow?`, `tiles: { anat, sys?, loc, badge?, link? }[]` |
| `fnHeader` | `.fn .fn-insp/.fn-exp/.fn-rest/.fn-mixed/.fn-step` header | `variant`, `text` |
| `banner` | centred info strip | `tone`, `html` |
| `callout` | tinted info/pearl box | `tone`, `title?`, `html`, `gap?`, `center?` |
| `alert` | "DON'T MISS" box (• bullets) | `tone`, `title`, `items: string[]` (html) |
| `compareBox` | tinted panel: title + wrapping grid of header+body sub-cards + footnote ("X vs Y — KEY DISCRIMINATOR", species-pattern boxes) | `tone`, `title?`, `cols?` (default 2), `cards: { header, html }[]`, `footnote?`, `gap?` |
| `diseaseGrid` | 2-col grid of disease-page links | `title`, `links: { label, link }[]` |
| `dxRow` | row of diagnostic-approach buttons | `items: { label, link, accent? }[]` |
| `table` | comparison grid + optional tinted box | `cols`, `headers`, `rows: (string\|{text,tone})[][]`, `boxTone?`, `title?`, `footnote?`, `gap?` |
| `cardSection` | tinted group of disease cards | `tone`, `title`, `cards: { title, tag?, desc, link? }[]`, `gap?` |
| `categoryGrid` | N-col category-tile grid (headers → arrow row → tile columns); no wrap | `columns: { cat, tone, tiles: { label, link? }[] }[]` |
| `categoryColumns` | wrapping `cols`-col grid of units (header + coloured ↓ + chips); `cat` must be a CAT_STYLE label (Vascular/Inflammatory/Mass/Immune-mediated/Degenerative/Metabolic / Endocrine/Toxic/Trauma/Anomalous) that carries its own exact colour | `cols?`, `columns: { cat, tiles: { label, link? }[] }[]` |
| `decisionTree` | YES/NO localisation tree | `steps: ({type:'step',…} \| {type:'split',…} \| {type:'outcome',…})[]` |
| `disclaimer` | "For qualified veterinary professionals only." footer (renders outside `.flow-wrap`) | — |
| `html` | **escape hatch** — raw HTML; last resort for genuine one-offs | `html` |

`speciesCompare` (🐕/🐱 columns) is typed in `flowTypes.ts` but **not yet rendered** — build its renderer the first time a sign actually needs it (and add the `case` to `renderBlock`).

### Two layouts
- **`layout:'flow'` (default):** wraps in `.flow-wrap`; connectors are `.flow-arrow-v`. Entry pages + most flows.
- **`layout:'fn'`:** renders **bare** (no `.flow-wrap`); connectors are `.fn-arrow` (big ↓). Sub-flows authored in the legacy `.fn` system (`fnHeader` + `cardGrid`). Don't approximate `.fn` with flow-node/endpoints — headers and arrows look different.

### Arrows are implicit (the "spine")
The renderer draws a connector between two consecutive blocks when both are "spine" kinds (`node`, `branch`, `endpoints`, `choices`, `callout`, `fnHeader`, `cardGrid`, `categoryGrid`, `categoryColumns`, `decisionTree`). Trailing reference boxes (`alert`, `diseaseGrid`, `dxRow`, `table`, `cardSection`, `banner`, `compareBox`, `html`) get **no** preceding arrow — give them a `gap` (margin-top) instead. To stop a spine block connecting to the next, set `connectAfter: false` on it.

---

## Model 2 — Dx (diagnostic-approach) views

A `DxApproach` is `{ title, nav?, navVariant?, tabs: Record<key, DxTab> }`. A `DxTab` is `{ title, blocks: DxBlock[], after? }` — `blocks` render inside `.dx-wrap` (uniform `.dx-arrow` spine), `after` render after it (no spine; trailing red-flag/pearls/disclaimer boxes).

- **Tabs:** omit `nav` for the standard three (`history` / `exam` / `dx`). Declare `nav: [{key,label},…]` for signs that differ (diarrhoea adds `sec`; pupd adds `desmopressin`; vomiting/regurgitation are 2-tab-ish). `tabs` is keyed by nav `key`.
- **`navVariant`** matches the hand-authored nav styling byte-for-byte: `'std'` (default, active tab loses the `alt` class), `'alt'` (classes alternate by position, active shown by opacity — dyspnoea, diarrhoea), `'flex'` (flex-wrap, larger cells, `opacity:.65` inactive — vomiting, regurgitation), `'pupd'` (active = explicit `opacity:1`).
- The nav buttons are **auto-generated** by `renderDxApproach`; their onclicks call `renderDxId('<sign>','<tab>')`. Don't hand-write the nav into a tab.

**DxBlock catalog** (in `dxTypes.ts`; renderer in `renderDx.ts`). Every block carries an optional `noArrowAfter` to suppress its trailing `.dx-arrow` (the legacy arrows are author-placed, not perfectly uniform):

| Block | Reproduces | Key fields |
|---|---|---|
| `branch` | `.dx-branch` goal/decision header | `text` |
| `step` | `.dx-step` step header | `text`, `alt?`, `tone?` (coloured intro step) |
| `check` | `.dx-check` explanation box | `html`, `style?` (a few carry inline `font-size`) |
| `row` | `.dx-row c{n}` of `.dx-test` cards | `cols?`, `items: { html, style? }[]` |
| `alert` | `.dx-alert` pearls/warning box | `html`, `gap?` |
| `callout` | tinted titled box (e.g. "RED FLAGS") | `tone`, `title`, `html`, `gap?` (default 12) |
| `diseaseGrid` | teal "LINKED DISEASE PAGES" 2-col link grid | `title`, `links: { label, link }[]` |
| `note` | `.dx-note` small inline note | `html`, `style?` |
| `html` | **escape hatch** (e.g. the seizures decision-tier tree) | `html` |
| `disclaimer` | the footer | — |

> The standard `disclaimer` block emits a fixed string. If a source disclaimer carries extra text (citations, "Not a substitute for clinical judgment"), keep it as a verbatim `html` block instead — the `disclaimer` block would silently drop it.

---

## Tones, Links — shared by both models

### Tones (closed enum → rgba once, in `HUE`)
`danger` (220,38,38) · `warning` (245,158,11) · `info` (37,99,235) · `teal` (13,148,136) · `green` (16,185,129) · `violet` (139,92,246) · `purple` (168,85,247) · `indigo` (99,102,241) · `orange` (249,115,22) · `slate` (100,116,139) · `neutral`. Data only names the tone; the colour lives once in `HUE` (`renderFlow.ts`). To match a coloured box, find the closest `rgb` — **only** use a `tone` when its rgb matches exactly; otherwise keep the exact inline style in an `html`/`check`-`style` block.

### Links (typed cross-references → onclick globals)
Express navigation as `Link` objects, never as raw onclick strings buried in `html` (those still work, but aren't typed and only get caught by the rendered-onclick scan):

| Link | Serialises to | Target lives in |
|---|---|---|
| `{ to:'disease', id:'DIS-X' }` | `renderDiseasePage('DIS-X')` | `DB.disease_page` |
| `{ to:'protocol', id:'PROT-X' }` | `renderProtoDetail('PROT-X')` | `DB.protocols` |
| `{ to:'lesion', loc:'LOC-X', name:'Name' }` | `goLesionTab('LOC-X','Name')` | `DB.lesion_type` (filtered by `loc`) |
| `{ to:'flow', id:'<page-id>' }` | `renderFlowId('<page-id>')` | `FLOWS` |
| `{ to:'dx', id:'<sign>' }` | `renderDxId('<sign>')` | `DX` |

`{ to:'diff' }`/`{ to:'lesion-detail' }` (renderDiffDetail / renderLesionDetail) are **not** typed Link kinds yet — when one is needed inside an otherwise-typed block, add the kind to `Link` + a `case` in `onclick()`.

---

## How to CHANGE existing data

1. **Find the data.** Flowchart → `src/lib/signs/flows/<sign>.ts`; Dx → `src/lib/signs/dx/<sign>.ts`; a disease/lesion/protocol/differential leaf → the matching array in the `DB` object in `cliniqApp.ts` (search the id, e.g. `DIS-HCM`).
2. **Edit the block / entry.** Keep it typed — change fields, don't drop to `html` unless the layout is genuinely bespoke. Clinical text is safety-critical: edit deliberately.
3. **Verify byte-faithfully** (the rest is unchanged). The cleanest A/B when you've edited one block:
   ```bash
   # capture the BEFORE render
   git stash push -- src/lib/signs/flows/<sign>.ts
   #   reload http://localhost:3000, in console: window.renderFlowId('<id>')  → grab the element's outerHTML
   git stash pop
   #   reload, render again → diff the normalised (whitespace-stripped) outerHTML
   ```
   Identical normalised outerHTML (modulo intended changes) = no accidental drift.
4. `npx tsc --noEmit` · `npm test` · then eyeball in the browser. Commit with the verification result.

## How to ADD new data

**A new sign's flowchart**
1. Author `flows/<sign>.ts` — one `FlowPage` per screen; entry `id` = registry id; export `export const <sign>Flow(s) = …`. Follow exemplars: `flows/epistaxis.ts` (clean flow layout), `flows/blindEye.ts` (table + cardSection + tone choices), `flows/redEye.ts` (fn layout + cardGrid + compareBox).
2. Add it to `FLOWS` in `flows/index.ts`.
3. Add/point the `registry.ts` entry's `flowId`.
4. Verify (browser + `npm test`); `registry.test.ts` enforces the `flowId` resolves.

**A new sign's Dx view**
1. Author `dx/<sign>.ts` — a `DxApproach` with `tabs.{history,exam,dx}` (+ `nav`/`navVariant` if non-standard). Follow `dx/epistaxis.ts` (clean 3-tab) and `dx/pupd.ts` (4-tab + variant).
2. Add it to `DX` in `dx/index.ts`. The Diagnostic-home tile + flow `{to:'dx'}` links already route through `renderDxId('<sign>')`, so it activates automatically.

**A new disease / lesion / protocol / differential page** (link targets)
Add a plain object to the matching `DB` array in `cliniqApp.ts` — `disease_page` (`DIS-*`), `lesion_type` (`LES-*`, with `loc` so it groups under a `goLesionTab` location), `protocols` (`PROT-*`), `differentials` (`D-*`). Copy the shape of a neighbouring entry (e.g. `DIS-HCM` for a disease). Then a `Link` from a flow/Dx page can point at it. The link-integrity test will fail if a link references an id that isn't in `DB`/`FLOWS`/`DX` — so add the target first.

**A new block type** (only when a layout recurs across signs — don't build one for a single one-off)
1. Add the typed block to `flowTypes.ts`/`dxTypes.ts` and to the `Block`/`DxBlock` union.
2. Add a `case` in `renderBlock`/`renderDxBlock` that emits the **exact** markup (match the source styles byte-for-byte; reuse `HUE`/`esc`/`onclick`).
3. If it's a spine block, add its kind to the `SPINE` set in `renderFlow.ts`.
4. Convert occurrences and A/B-verify each (git-stash method above).

---

## Verification

```bash
npx tsc --noEmit                       # data files type-check (cliniqApp.ts is @ts-nocheck — won't catch its errors)
npm test                               # link integrity over every flow + Dx page; registry resolves
npm run build                          # production build
NEXT_PUBLIC_CONVEX_URL= npm run dev    # auth-bypassed; then browser-verify
```

- **Link integrity (automated, `flows.test.ts`):** renders every flow + Dx page and asserts EVERY onclick (typed links + raw onclicks inside `html` blocks) resolves — `disease`/`protocol` ids and `lesion` locs exist in `cliniqApp.ts`, `flow` ids ∈ `FLOWS`, `dx` ids ∈ `DX`. Add data and it's auto-covered. (There is **no** content-parity test any more — it compared against frozen legacy HTML that no longer exists.)
- **Browser parity bar:** byte-identical visible text + visually indistinguishable. Never paraphrase, reorder, or drop a word, HTML entity (`&gt;`/`&lt;`/`&amp;`), unicode (`·→±×≤≈⊘↑`), or `<strong>`/`<em>`. For edits, use the **git-stash A/B** above (there's no legacy renderer to diff against). For a brand-new sign there is no "before" — verify visually against the clinical source.
- **Sub-agent A/B oracle** (when migrating in bulk): render the data version (`renderDxId`/`renderFlowId`) and the reference, normalise outerHTML with `.replace(/ onclick="[^"]*"/g,'').replace(/\s+/g,'')` (ignore onclick routing + whitespace), and compare for an exact structural match plus `innerText` equality.

## Pitfalls (learned the hard way)

- **`*/` inside a block comment closes it.** Don't write `gi-*/oesoph` inside `/** … */`.
- **Tone must match exactly.** A `tone` emits fixed rgba/opacity. If the source box uses a slightly different alpha/colour (e.g. `rgba(99,102,241,0.2)` vs the tone's `0.15`), it will NOT be byte-identical — keep that box as `html`/`check`-`style` instead of forcing a tone.
- **`.dx-arrow` spine isn't perfectly uniform.** A leading intro box often has an arrow *before* but none *after* — set `noArrowAfter:true` on it.
- **Trailing flow boxes:** set `connectAfter:false` on the preceding spine block and give the box a `gap`, or you get a double arrow.
- **Don't approximate the `.fn` system in flow layout** — use `fnHeader`/`cardGrid`/`layout:'fn'`.
- **Links inside `html` blocks are validated but not typed.** They survive the rendered-onclick scan, but prefer typed `Link`s in typed blocks so they're first-class.
- **`html`/escape-hatch is a last resort.** ~3% of flow blocks are genuine one-offs (asymmetric branch trees, the seizures tier tree) where html is the honest representation. Don't build a single-use block type to eliminate one — but DO build a typed block when a shape recurs across signs.
- **Parallelising with sub-agents:** each agent authors ONLY its own `flows/<sign>.ts` or `dx/<sign>.ts` (disjoint files); never let them touch shared files (`flowTypes.ts`/`dxTypes.ts`/`renderFlow.ts`/`renderDx.ts`/`index.ts`/`registry.ts`). The parent wires + verifies. Tell them which blocks exist and to flag (not invent) a missing one. If a Dx source `render()` template has a `${…}` interpolation other than the nav helper, it can't be transcribed statically — capture the resolved HTML from the browser and pass it in.
