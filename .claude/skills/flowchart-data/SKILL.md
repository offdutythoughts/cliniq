---
name: flowchart-data
description: How ClinIQ's clinical-sign flowcharts are modelled as typed data (FlowPage/Block) and rendered to the UI, plus the workflow for migrating a sign. Use when adding or editing a clinical-sign flowchart, authoring src/lib/signs/flows/*.ts data files, touching the block model (flowTypes.ts) or renderer (renderFlow.ts), wiring a sign into the registry/dispatch, or continuing the DATA_MIGRATION.md effort.
---

# Flowchart data & rendering

ClinIQ's clinical-sign flowcharts are **declarative data** (`FlowPage` → `Block[]`) drawn by **one generic renderer**. This replaced ~63 pages of hand-authored, inline-styled HTML strings. The goal is structured, typed, validatable data — **not** HTML strings in a new location. See `DATA_MIGRATION.md` (repo root) for the overall plan, phases, and checklist.

## Where everything lives

| File | Role |
|---|---|
| `src/lib/signs/flowTypes.ts` | The data model — `FlowPage`, every `Block` kind, `Tone`, `Link`. **Only use blocks/fields defined here.** |
| `src/lib/signs/renderFlow.ts` | The pure renderer — `renderFlowPage(page): string`. The `HUE` tone→rgba map, the arrow/spine logic, and how each block becomes HTML/CSS all live here. Read it to author data that reproduces legacy markup. |
| `src/lib/signs/flows/<sign>.ts` | One data file per sign, exporting a `FlowPage` or `FlowPage[]`. |
| `src/lib/signs/flows/index.ts` | Aggregates every page into the `FLOWS` map (keyed by `FlowPage.id`). |
| `src/lib/signs/registry.ts` | The `SIGNS` home-screen registry. A sign gains `flowId` when migrated. |
| `src/lib/cliniqApp.ts` | `renderFlowId(flowId)` dispatch + `LEGACY_FLOWS` fallback; `renderLocalise` coexistence switch. Has `@ts-nocheck` — it does NOT type-check; the data files DO. |
| `src/lib/signs/flows.test.ts` | Integrity + content-parity tests (auto-covers every migrated page). |
| `src/lib/signs/<sign>.ts` | The **legacy** HTML-string consts being migrated (the source of truth to transcribe from). |

**Coexistence:** a `SIGNS` entry with `flowId` set renders from `FLOWS` data via `renderFlowId`; without it, the legacy `flow` function still runs. So migrated and unmigrated signs run side by side — never break the app mid-migration, and migrate one sign at a time.

## The model (current block kinds)

A `FlowPage` is `{ id, title, layout?, blocks: Block[] }`. `layout` is `'flow'` (default) or `'fn'` (see below).

| Block | Reproduces | Key fields |
|---|---|---|
| `node` | `.flow-node` entry/step/sub-step header | `variant`, `text`, `sub?`, `tone?` (entry only) |
| `branch` | N-column split with per-column header + body | `columns: { header, tone, sub?, blocks }[]` (recursive) |
| `endpoints` | vertical stack of `.flow-endpoint` leaf links | `items: { label, sublabel?, tone?, icon?, link? }[]` |
| `choices` | grid of clickable pattern-nodes | `cols?`, `size?`, `items: { variant?|tone?, label(html), sublabel?(html), link? }[]` |
| `cardGrid` | `.fn-row` grids of `.fn-ep` location cards | `perRow?`, `tiles: { anat, sys?, loc, badge?, link? }[]` |
| `fnHeader` | `.fn .fn-insp/.fn-exp/.fn-rest/.fn-mixed/.fn-step` header | `variant`, `text` |
| `banner` | centered info strip | `tone`, `html` |
| `callout` | tinted info/pearl box | `tone`, `title?`, `html`, `gap?`, `center?` |
| `alert` | "DON'T MISS" box (• bullets) | `tone`, `title`, `items: string[]` (html) |
| `diseaseGrid` | 2-col grid of disease-page links | `title`, `links: { label, link }[]` |
| `dxRow` | row of diagnostic-approach buttons | `items: { label, link, accent? }[]` |
| `table` | comparison grid + optional tinted box | `cols`, `headers`, `rows: (string\|{text,tone})[][]`, `boxTone?`, `title?`, `footnote?`, `gap?` |
| `cardSection` | tinted group of disease cards | `tone`, `title`, `cards: { title, tag?, desc, link? }[]`, `gap?` |
| `categoryGrid` | N-col category-tile grid (headers → arrows → tile columns) | `columns: { cat, tone, tiles: { label, link? }[] }[]` |
| `decisionTree` | YES/NO localisation tree | `steps: ({type:'step',continue,question,sub?,exit} \| {type:'split',question,…,no,yes} \| {type:'outcome',label,box})[]` |
| `disclaimer` | "For qualified veterinary professionals only." footer (renders outside `.flow-wrap`) | — |
| `html` | **escape hatch** — raw legacy HTML | `html` |

Typed but **not yet rendered** (build the renderer when first needed): `speciesCompare` (🐕/🐱 columns). A recurring **2-col compare box** (Red Eye coats discriminator, Abnormal Pupil neuro "light/dark room rule") is still `html` — a good candidate for the next typed block.

### Tones (closed enum → rgba in `HUE`)
`danger` (red 220,38,38) · `warning` (amber 245,158,11) · `info` (blue 37,99,235) · `teal` (13,148,136) · `green` (16,185,129) · `violet` (139,92,246) · `purple` (168,85,247) · `indigo` (99,102,241) · `orange` (249,115,22) · `slate` (100,116,139) · `neutral`. Match the legacy box's rgba to the closest hue; colour lives once in `HUE`, data only names the tone. Small shade differences (e.g. violet-200 vs violet-300) are imperceptible at the app's text size.

### Links (typed cross-references)
Map legacy `onclick` handlers to `Link` objects — never bury them in `html` blocks (then they aren't validated):

| Legacy onclick | Link |
|---|---|
| `renderDiseasePage('DIS-X')` | `{ to:'disease', id:'DIS-X' }` |
| `renderProtoDetail('PROT-X')` | `{ to:'protocol', id:'PROT-X' }` |
| `goLesionTab('LOC-X','Name')` | `{ to:'lesion', loc:'LOC-X', name:'Name' }` |
| a sub-flow `renderXFlow()` | `{ to:'flow', id:'<page-id>' }` |
| `renderDx<Sign>()` | `{ to:'dx', id:'<sign>' }` |

### Two layouts
- **`layout:'flow'` (default):** wraps in `.flow-wrap`, connectors are `.flow-arrow-v` (thin triangle). Used by entry pages and most flows.
- **`layout:'fn'`:** renders **bare** (no `.flow-wrap`), connectors are `.fn-arrow` (big ↓). Used by sub-flows the legacy authored in the `.fn` system (`fnHeader` + `cardGrid`). Do **not** approximate `.fn` pages with flow-node/endpoints — the headers and arrows differ visibly; use `fnHeader`/`cardGrid`/`layout:'fn'`.

### Arrows are implicit (the "spine")
The renderer inserts a connector between two consecutive blocks when both are "spine" kinds (`node`, `branch`, `endpoints`, `choices`, `callout`, `fnHeader`, `cardGrid`). Trailing reference boxes (`alert`, `diseaseGrid`, `dxRow`, `table`, `cardSection`, `banner`, `html`) get **no** preceding arrow — give them a `gap` (margin-top) instead. If a spine block should NOT connect to the next (e.g. a sub-step feeding straight into endpoints, or a `choices`/`cardGrid` followed by a trailing callout), set `connectAfter: false` on it.

## Migrating a sign — workflow

1. **Read the legacy source.** The HTML-string consts in `src/lib/signs/<sign>.ts` (entry + sub-flows). Some sub-flows are inline `render…()` functions in `cliniqApp.ts` — grep for them. Ignore the `…Dx*` consts (Dx views are a separate tranche; see D5 in the plan).
2. **Author `flows/<sign>.ts`.** One `FlowPage` per screen; entry `id` must equal the registry id; sub-flow ids like `'<sign>-coats'`. Export `export const <sign>Flows: FlowPage[] = [...]`. Follow existing exemplars: `flows/epistaxis.ts` (clean flow-layout), `flows/blindEye.ts` (table + cardSection + tone-choices), `flows/redEye.ts` (fn-layout + cardGrid).
3. **Wire it up (3 edits):** add to `flows/index.ts` `FLOWS`; set `flowId` on the `registry.ts` entry; add the legacy const(s) to `LEGACY_HTML` in `flows.test.ts` (skip for inline pages with no const — verify those in the browser).
4. **Verify** (see below). Then commit the sign as its own checkpoint.

## The parity bar & verification

**Parity = byte-identical visible text + visually indistinguishable, NOT byte-identical DOM.** This is safety-critical clinical content — never paraphrase, reorder, or drop a word, entity (`&gt;`/`&lt;`), unicode (`·→±×≤≈⊘`), or `<strong>`/`<em>`.

```bash
npx tsc --noEmit                       # data files type-check (cliniqApp.ts is @ts-nocheck)
npm test                               # content-parity + link integrity over ALL migrated pages
npm run build
NEXT_PUBLIC_CONVEX_URL= npm run dev    # auth-bypassed; then browser-verify
```

- **Content parity (automated):** `flows.test.ts` strips tags and asserts every ≥4-letter word in the legacy const is present in the data render. Add the legacy const to `LEGACY_HTML` and it's auto-covered.
- **Link integrity (automated):** asserts every `disease`/`protocol` id and `lesion` loc exists in `cliniqApp.ts`, every `flow` id is in `FLOWS` or `LEGACY_FLOWS`, every `dx` id resolves to a `renderDx<Id>` function.
- **Visual (browser):** render data vs legacy and compare. In the page console: `window.renderFlowId('<id>')` (data) vs `window.render<Legacy>Flow()` (legacy); compare `document.querySelector('.flow-wrap').innerText` (or the content container for `fn` pages). Screenshot both.

## Pitfalls (learned the hard way)

- **`*/` inside a block comment closes it.** Don't write `gi-*/oesoph` in a `/** … */` — it ends the comment early.
- **Don't approximate the `.fn` system in flow-layout.** Use `fnHeader`/`cardGrid`/`layout:'fn'` — flow-node headers and `.flow-arrow-v` look different from `.fn` headers and `.fn-arrow`.
- **`choices` sublabel size tracks the label** (`size - 2`). Set `size` per the legacy (11 for big choices, 10 for tight grids).
- **Trailing boxes:** set `connectAfter:false` on the preceding spine block and give the box a `gap` — otherwise you get an extra arrow.
- **Escape-hatch `html` is a last resort.** If a layout recurs across signs (fn-ep grids, category-tile grids, decision trees), build a typed block instead of repeating `html`. Links inside `html` blocks are NOT validated by the test.
- **Parallelising with sub-agents:** have each agent author ONLY its own `flows/<sign>.ts` (disjoint files, no conflict) and NOT touch shared files (`flowTypes.ts`, `renderFlow.ts`, `index.ts`, `registry.ts`, `flows.test.ts`). The parent does the wiring + verification. Tell them which blocks exist and to flag any new block they need rather than inventing one.
- **Commit one sign per checkpoint** with the verification results in the message.
