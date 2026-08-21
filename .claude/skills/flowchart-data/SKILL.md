---
name: flowchart-data
description: How ClinIQ's clinical-sign CONTENT is modelled as typed data — the flowcharts (FlowPage/Block in FLOWS), the diagnostic-approach views (DxApproach/DxBlock in DX), and the reference DB (diseases/lesions/protocols/differentials in src/data/db.ts) the links point at. Use when adding or editing any clinical-sign flowchart or Dx view, touching the block models (flowTypes.ts / dxTypes.ts), wiring a sign into the registries, or adding/changing a disease/lesion/protocol/differential page. The data is RENDERED by React components — see the screen-components skill for those.
---

# ClinIQ clinical-sign data

ClinIQ's clinical content is **declarative typed data**. The data is drawn by **React components**
(`FlowPageView` / `DxApproachView` and the leaf-page views — see the **screen-components** skill); this
skill is about authoring the **data** they consume. The data lives in `src/lib/signs/` (flowcharts +
Dx views) plus `src/data/db.ts` (the reference DB). There are no HTML strings and no
`dangerouslySetInnerHTML` anywhere — that engine was deleted.

There are **two parallel data models** + the **content they link to**:

| Layer | What it is | Model | Renderer (React) | Registry | View |
|---|---|---|---|---|---|
| **Flowcharts** | the decision-tree screens (entry + sub-flows) | `FlowPage`/`Block` (`flowTypes.ts`) | `FlowPageView.tsx` | `FLOWS` (`flows/index.ts`) | `{ kind:'flow', flowId }` |
| **Dx views** | the History/Exam/Diagnostics tabs | `DxApproach`/`DxBlock` (`dxTypes.ts`) | `DxApproachView.tsx` | `DX` (`dx/index.ts`) | `{ kind:'dx', sign, tab }` |
| **Reference DB** | disease pages, lesion lists, protocols, differentials (the leaf pages links open) | typed arrays in `db.ts` (`LesionRow`/`DiffRow`/`DiseaseRow`/`ProtocolRow`) | `DiseasePageView` / `LesionLocView` / `ProtocolDetailView` / `DiffDetailView` / … | `DB.{disease_page,lesion_type,protocols,differentials}` | `{kind:'disease'/'protocol'/'lesionLoc'/'diff'/…}` |

> Everything type-checks (nothing is `@ts-nocheck`). The DB records use **mixed single/double quotes**.
> Authored HTML inside `html:`/`html`-block fields renders through the audited `RichText` allowlist
> (12 tags only — no `<a>/<img>/<script>`); `react/no-danger` is lint-banned. The category tone tables
> `HUE`/`TITLE` live in `src/lib/signs/tone.ts`.

## Where everything lives

| File | Role |
|---|---|
| `src/lib/signs/flowTypes.ts` | Flowchart model — `FlowPage`, every flow `Block`, `Tone`, `Link`. |
| `src/lib/signs/flows/<sign>.ts` | One flowchart data file per sign → a `FlowPage` or `FlowPage[]`. |
| `src/lib/signs/flows/index.ts` | Aggregates every page into `FLOWS` (keyed by `FlowPage.id`). |
| `src/lib/signs/dxTypes.ts` | Dx model — `DxApproach`, `DxTab`, `DxBlock`, `DxNavItem`. |
| `src/lib/signs/dx/<sign>.ts` | One Dx data file per sign → a `DxApproach`. |
| `src/lib/signs/dx/index.ts` | Aggregates into `DX` (keyed by sign id). |
| `src/lib/signs/registry.ts` | `SIGNS` — the tab-0 home list. Each entry `{ id, icon, title, sub, flowId }`; `flowId` **required**. |
| `src/data/db.ts` | The reference DB — `disease_page` (`DIS-*`), `lesion_type` (`LES-*`), `protocols` (`PROT-*`), `differentials` (`D-*`), typed loosely with index signatures. |
| `src/lib/signs/tone.ts` | `HUE` (tone→`var(--tone-*)`) + `TITLE` — the tone colour tables, consumed by the renderers. |
| `src/lib/signs/flows.test.ts` | Link-integrity tests over every flow + Dx page (typed links **and** raw onclicks inside `html` blocks resolve to a real `DB`/`FLOWS`/`DX` target). |
| `src/lib/signs/registry.test.ts` | Asserts every `SIGNS.flowId` resolves to a real `FLOWS` page. |
| `src/components/allowlist.test.ts` | Guards that no flow/dx `html` field uses a tag/attr outside the `RichText` allowlist. |

`FLOWS`/`DX`/`DB` are the single source of truth. The renderer components resolve a page from them, or
show a `NotFound`. (For *how* the data is rendered — block components, RichText, navigation, pixel
parity — read the **screen-components** skill. For colours/CSS classes, **styling-system**.)

---

## Model 1 — Flowcharts

A `FlowPage` is `{ id, title, layout?, blocks: Block[] }`. A sign has an **entry** page (its `id` = the
registry `flowId`) plus 0..n **sub-flow** pages (`id` like `'<sign>-coats'`). `layout` is `'flow'`
(default) or `'fn'`.

**Block catalog** (all in `flowTypes.ts`; rendered by `FlowPageView.tsx`):

| Block | Reproduces | Key fields |
|---|---|---|
| `node` | `.flow-node` entry/step/sub-step header | `variant`, `text`, `sub?`, `tone?` (entry only) |
| `branch` | N-column split with per-column header + body | `columns: { header, tone, sub?, blocks }[]` (recursive) |
| `endpoints` | vertical stack of `.flow-endpoint` leaf links | `items: { label, sublabel?, tone?, icon?, link? }[]` |
| `choices` | grid of clickable pattern-nodes — name-only separation boxes: no sublabel slot, no emoji in `label` (lint-choices) | `cols?`, `size?`, `items: { variant?\|tone?, label(html), link? }[]` |
| `cardGrid` | `.fn-row` grids of `.fn-ep` location cards | `perRow?`, `tiles: { anat, sys?, loc, badge?, link? }[]` |
| `fnHeader` | `.fn .fn-insp/.fn-exp/.fn-rest/.fn-mixed/.fn-step` header | `variant`, `text` |
| `banner` | centred info strip | `tone`, `html` |
| `callout` | tinted info/pearl box | `tone`, `title?`, `html`, `gap?`, `center?` |
| `alert` | "DON'T MISS" box (• bullets) | `tone`, `title`, `items: string[]` (html) |
| `compareBox` | tinted panel: title + wrapping grid of header+body sub-cards + footnote | `tone`, `title?`, `cols?` (default 2), `cards: { header, html }[]`, `footnote?`, `gap?` |
| `diseaseGrid` | 2-col grid of disease-page links | `title`, `links: { label, link }[]` |
| `dxRow` | row of diagnostic-approach buttons | `items: { label, link, accent? }[]` |
| `table` | comparison grid + optional tinted box | `cols`, `headers`, `rows: (string\|{text,tone})[][]`, `boxTone?`, `title?`, `footnote?`, `gap?` |
| `cardSection` | tinted group of disease cards | `tone`, `title`, `cards: { title, tag?, desc, link? }[]`, `gap?` |
| `categoryGrid` | N-col category-tile grid (headers → arrow row → tile columns); no wrap | `columns: { cat, tone, tiles: { label, link? }[] }[]` |
| `categoryColumns` | wrapping `cols`-col grid of units (header + coloured ↓ + chips); `cat` must be a CAT_STYLE label (Vascular/Inflammatory/Mass/Immune-mediated/Degenerative/Metabolic / Endocrine/Toxic/Trauma/Anomalous) | `cols?`, `columns: { cat, tiles: { label, link? }[] }[]` |
| `decisionTree` | YES/NO localisation tree | `steps: ({type:'step'} \| {type:'split'} \| {type:'outcome'})[]` |
| `speciesCompare` | indigo 🐕 vs 🐱 KEY SPECIES DIFFERENCES paired-row grid | `dog: string[]`, `cat: string[]` — `dog[i]` pairs with `cat[i]`; both may contain inline HTML |
| `disclaimer` | "For qualified veterinary professionals only." footer (outside `.flow-wrap`) | — |
| `html` | **escape hatch** — raw HTML (rendered via `RichText`); last resort for genuine one-offs | `html` |

`speciesCompare` renders an indigo 🐕 vs 🐱 KEY SPECIES DIFFERENCES panel. `dog[i]` pairs with
`cat[i]`; both may contain inline HTML (`<strong>`, `<em>`, `&gt;`, etc.) rendered via `RichText`.
First used in the bleeding entry page.

### Two layouts
- **`layout:'flow'` (default):** wraps in `.flow-wrap`; connectors are `.flow-arrow-v`. Entry pages + most flows.
- **`layout:'fn'`:** renders **bare** (no `.flow-wrap`); connectors are `.fn-arrow` (big ↓). Sub-flows
  authored in the `.fn` system (`fnHeader` + `cardGrid`). Don't approximate `.fn` with flow-node/endpoints.

### Arrows are implicit (the "spine")
`FlowPageView` draws a connector between two consecutive blocks when both are "spine" kinds (`node`,
`branch`, `endpoints`, `choices`, `callout`, `fnHeader`, `cardGrid`, `categoryGrid`, `categoryColumns`,
`decisionTree`). Trailing reference boxes (`alert`, `diseaseGrid`, `dxRow`, `table`, `cardSection`,
`banner`, `compareBox`, `html`) get **no** preceding arrow — give them a `gap` (margin-top) instead. To
stop a spine block connecting to the next, set `connectAfter: false`.

---

## Model 2 — Dx (diagnostic-approach) views

A `DxApproach` is `{ title, nav?, navVariant?, tabs: Record<key, DxTab> }`. A `DxTab` is `{ title,
blocks: DxBlock[], after? }` — `blocks` render inside `.dx-wrap` (uniform `.dx-arrow` spine), `after`
render after it (trailing red-flag/pearls/disclaimer boxes, no spine).

- **Tabs:** omit `nav` for the standard three (`history`/`exam`/`dx`). Declare `nav: [{key,label},…]`
  for signs that differ (diarrhoea adds `sec`; pupd adds `desmopressin`). `tabs` is keyed by nav `key`.
- **`navVariant`** matches the hand-authored nav styling byte-for-byte: `'std'` (default), `'alt'`
  (dyspnoea, diarrhoea), `'flex'` (vomiting, regurgitation), `'pupd'`.
- The nav buttons are **auto-generated** by `DxApproachView`'s `DxTabs`; a tap calls
  `nav.replace({kind:'dx', sign, tab})` (in-place swap). Don't hand-write the nav into a tab.

**DxBlock catalog** (in `dxTypes.ts`; rendered by `DxApproachView.tsx`). Every block carries an optional
`noArrowAfter` to suppress its trailing `.dx-arrow`:

| Block | Reproduces | Key fields |
|---|---|---|
| `branch` | `.dx-branch` goal/decision header | `text` |
| `step` | `.dx-step` step header | `text`, `alt?`, `tone?` |
| `check` | `.dx-check` explanation box | `html`, `style?` |
| `row` | `.dx-row c{n}` of `.dx-test` cards | `cols?`, `items: { html, style? }[]` |
| `alert` | `.dx-alert` pearls/warning box | `html`, `gap?` |
| `callout` | tinted titled box (e.g. "RED FLAGS") | `tone`, `title`, `html`, `gap?` |
| `diseaseGrid` | teal "LINKED DISEASE PAGES" 2-col link grid | `title`, `links: { label, link }[]` |
| `note` | `.dx-note` small inline note | `html`, `style?` |
| `html` | **escape hatch** (e.g. seizures tier tree) | `html` |
| `disclaimer` | the footer | — |

> The `disclaimer` block emits a fixed string. If a source disclaimer carries extra text, keep it as a
> verbatim `html` block — `disclaimer` would silently drop it.

---

## Tones & Links — shared by both models

### Tones (closed enum → `var(--tone-*)` in `HUE`, `tone.ts`)
`danger` · `warning` · `info` · `teal` · `green` · `violet` · `purple` · `indigo` · `orange` · `slate`
· `neutral`. Data only **names** the tone; the colour lives once in `HUE` (pointing at CSS vars). Only
use a `tone` when its colour matches the source exactly; otherwise keep the exact inline style in an
`html`/`check`-`style` block. (To recolour a tone, edit the `--tone-*` var — see styling-system.)

### Links (typed cross-references)
Express navigation as `Link` objects, never as raw onclick strings buried in `html` (those still work
via `RichText`/`parseLegacyOnclick`, but aren't typed and are only caught by the rendered-onclick scan):

| Link | Navigates to (`linkToView`) | Target lives in |
|---|---|---|
| `{ to:'disease', id:'DIS-X' }` | `{kind:'disease', id}` | `DB.disease_page` |
| `{ to:'protocol', id:'PROT-X' }` | `{kind:'protocol', id}` | `DB.protocols` |
| `{ to:'lesion', loc:'LOC-X', name:'Name' }` | `{kind:'lesionLoc', loc, name}` | `DB.lesion_type` (filtered by `loc`) |
| `{ to:'flow', id:'<page-id>' }` | `{kind:'flow', flowId}` | `FLOWS` |
| `{ to:'dx', id:'<sign>' }` | `{kind:'dx', sign, tab:'history'}` | `DX` |

`{to:'diff'}` / `{to:'lesion-detail'}` are **not** typed Link kinds yet — when one is needed inside a
typed block, add the kind to `Link` (`flowTypes.ts`), `linkToView`, and `parseLegacyOnclick` (`view.ts`).

---

## How to CHANGE existing data

1. **Find the data.** Flowchart → `src/lib/signs/flows/<sign>.ts`; Dx → `src/lib/signs/dx/<sign>.ts`;
   a disease/lesion/protocol/differential leaf → the matching array in `src/data/db.ts` (search the id,
   e.g. `DIS-HCM` — remember records use **mixed quotes**).
2. **Edit the block / entry.** Keep it typed — change fields, don't drop to `html` unless the layout is
   genuinely bespoke. Clinical text is safety-critical: never paraphrase, reorder, or drop a word,
   entity (`&gt;`/`&lt;`/`&amp;`), unicode (`·→±×≤≈⊘↑`), or `<strong>`/`<em>`.
3. **Verify** — `npx tsc --noEmit` · `npm test` · `npx playwright test` (must stay green) · browser.

## How to ADD new data

**A new sign's flowchart**
1. Author `flows/<sign>.ts` — one `FlowPage` per screen; entry `id` = registry id. Exemplars:
   `flows/epistaxis.ts` (clean flow), `flows/blindEye.ts` (table + cardSection + tones), `flows/redEye.ts`
   (fn layout + cardGrid + compareBox).
2. Add it to `FLOWS` in `flows/index.ts`. 3. Point the `registry.ts` entry's `flowId`. 4. Verify.

**A new sign's Dx view**
1. Author `dx/<sign>.ts` — a `DxApproach` with `tabs.{history,exam,dx}` (+ `nav`/`navVariant` if
   non-standard). Exemplars: `dx/epistaxis.ts` (clean 3-tab), `dx/pupd.ts` (4-tab + variant).
2. Add it to `DX` in `dx/index.ts`. The Diagnostic-home tile + flow `{to:'dx'}` links route to it automatically.

**A new disease / lesion / protocol / differential** (link targets)
Add a plain object to the matching array in `src/data/db.ts` — copy a neighbour's shape (e.g. `DIS-HCM`).
A `Link` can then point at it. The link-integrity test fails if a link references an id not in
`DB`/`FLOWS`/`DX`, so add the target first.

---

## THE PROTOCOL RULE — a protocol is reached through the page for the diagnosis it treats

```
lesion category  →  disease page  →  protocol
```

A tile, chip, endpoint or lesion sub-type that **names a diagnosis** ("Metaldehyde",
"Diabetic ketoacidosis", "Cardiac tamponade") links to that diagnosis's **disease page** —
never straight to a protocol. The disease page then shows its protocols as the **first cards
on the page**, above the clinical sections. Skipping the disease page hands the reader
treatment steps with no aetiology, signalment, confirmation or prognosis, and lets the same
condition behave differently depending on which flow reached it.

**To give a disease page a protocol — one edit:**

```ts
{id:'DIS-TOX-METALD',protos:'PROT-TOX-METALD',name:'Metaldehyde Toxicosis', …}
```

Pipe-separate several (`protos:'PROT-A|PROT-B'`). Nothing else needs touching — the card
stack renders itself. `protos` is the **only** place to declare this.

| Do | Don't |
|---|---|
| `{ to:'disease', id:'DIS-TOX-METALD' }` on a tile | `{ to:'protocol', id:'PROT-TOX-METALD' }` on a tile |
| `protos:'PROT-X'` on the disease row | `proto:'PROT-X'` on a lesion that has a `dis` |
| `@DIS-…` tokens in a `ddx` | `@PROT-…` tokens in a `ddx` |

**The three exceptions**, all narrow:
- A tile whose label *says* "protocol" ("SE emergency protocol", "Thoracocentesis protocol")
  is an explicit shortcut, not a diagnosis — allowed, and only in `dxRow`/`diseaseGrid`.
- A **lesion with no disease page** (a fluid class, an oedema type, a shock category) is the
  leaf: its own `proto:'PROT-…'` is the only route to the steps and is expected.
- A condition with a protocol but **no disease page yet** — a content gap. It needs an entry
  in `PROTOCOL_ONLY_TILES` (`scripts/lint-tiles.ts`) with the reason; write the page and
  remove the entry.

**Enforced by** (all in `npm run lint:content`):

| Lint | Catches |
|---|---|
| `lint-tiles` CHECK 6 | a category tile linking straight to a protocol |
| `lint-schema` | a `protos` id that doesn't resolve; an `@PROT-` token inside any `ddx` |
| `lint-lesions` | a lesion declaring `proto` when it has a `dis`; a `proto` that doesn't resolve |

The rendering side lives in one module — `src/app/screens/protocolCards.tsx`
(`protocolsForDisease` / `protocolsForLesion` / `<ProtocolCards>` / `<DiseasePageCard>`), used
by `DiseasePageView`, `SubTypeDetailView` and `LesionDetailView` so all three agree.

**A new block type** (only when a layout recurs — don't build one for a single one-off)
1. Add the typed block to `flowTypes.ts`/`dxTypes.ts` + the `Block`/`DxBlock` union.
2. Add a `case` to `BlockView` in `FlowPageView.tsx` / `DxBlockView` in `DxApproachView.tsx` that emits
   the **exact** markup (match source styles via `s('…')`; reuse `HUE`/`<RichText>`/`linkToView`).
3. If it's a flow spine block, add its kind to the `SPINE` set in `FlowPageView.tsx`.
4. Add a snapshot screen exercising it, then `--update-snapshots`.

---

## Verification

```bash
npx tsc --noEmit                       # data files (and components) type-check
npm test                               # link integrity over every flow + Dx page; registry; allowlist
npx playwright test                    # 29 screens × light/dark = 58 baselines — must stay green
NEXT_PUBLIC_CONVEX_URL= npm run dev    # auth-bypassed; then browser-verify
```

- **Link integrity (`flows.test.ts`):** asserts every typed Link **and** every raw onclick inside an
  `html` block resolves — `disease`/`protocol` ids and `lesion` locs exist in `db.ts`, `flow` ids ∈
  `FLOWS`, `dx` ids ∈ `DX`. Add data and it's auto-covered.
- **Visual parity:** the Playwright suite is the oracle. To verify a content edit, add (or rely on) a
  `SCREENS` entry that hits the changed screen and confirm an empty diff; capture a new baseline only
  for an intended change. To deep-link a screen in the browser console: `window.__nav({kind:'flow',
  flowId:'<id>'})` (or `{kind:'dx', sign, tab}`, `{kind:'disease', id}`, …).
- **Parity bar:** byte-identical visible text + visually indistinguishable. There's no legacy renderer
  to diff against — verify visually against the clinical source (and the snapshot for regressions).

## Pitfalls

- **`*/` inside a block comment closes it.** Don't write `gi-*/oesoph` inside `/** … */`.
- **Tone must match exactly** — a `tone` emits fixed rgba/opacity. If the source box uses a different
  alpha/colour, keep it as `html`/`check`-`style` instead of forcing a tone.
- **`.dx-arrow` spine isn't perfectly uniform** — a leading intro box often has an arrow before but none
  after; set `noArrowAfter:true`.
- **Trailing flow boxes:** set `connectAfter:false` on the preceding spine block + give the box a `gap`,
  or you get a double arrow.
- **Don't approximate the `.fn` system in flow layout** — use `fnHeader`/`cardGrid`/`layout:'fn'`.
- **`html` is a last resort.** ~3% of blocks are genuine one-offs. Don't build a single-use block type;
  DO build a typed block when a shape recurs across signs. Authored html renders through `RichText`'s
  allowlist (12 tags) — `allowlist.test.ts` fails if you introduce a disallowed tag/attr.
- **Parallelising with sub-agents:** each agent authors ONLY its own `flows/<sign>.ts` or `dx/<sign>.ts`
  (disjoint); never let them touch shared files (`flowTypes.ts`/`dxTypes.ts`/the renderers/`index.ts`/
  `registry.ts`). The parent wires + verifies.
