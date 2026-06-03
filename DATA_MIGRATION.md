# Flowchart Data Migration

**Refactor #1 — Convert hand-authored HTML flowcharts into a declarative data model rendered by a generic renderer.**

> Status: **Planning complete, implementation not started.**
> Owner: Chris. Last updated: 2026-06-03.
> This document is the single source of truth for the migration. Read the **Context** section before touching any flow code, then work the **Checklist**.

---

## 0. TL;DR

ClinIQ's clinical-sign flowcharts are currently ~63 pages of hand-written, inline-styled HTML strings (~10k lines across `src/lib/signs/*.ts` and `src/lib/cliniqApp.ts`). We're replacing them with:

1. A **typed data model** (`FlowPage` → `Block[]`) that describes each flowchart as structured data.
2. A **single generic renderer** that turns that data into the same HTML/CSS the app already uses.
3. A **typed `Link` system** so every cross-reference (disease page, protocol, lesion tab, sub-flow) is validatable — which also lets us shrink the `mountGlobals` window-wiring and add a link-integrity test.

The work is **incremental and low-risk**: a per-sign `flowId` switch lets migrated (data) and unmigrated (legacy function) flowcharts run side by side, so the app never breaks mid-migration and **each sign ships independently**. Natural stopping points are after every sign and after every phase.

---

## 1. Context — read this first

### 1.1 What ClinIQ is
A portable veterinary clinical-decision reference (Next.js 16 / React 19 app). The user picks a **clinical sign** (epistaxis, ataxia, jaundice, …) and is walked through a **diagnostic flowchart** that branches to disease pages, protocols, lesion lookups, and diagnostic-approach tabs. It is a clinical document — **content fidelity is a safety issue; never silently drop a line of clinical text.**

### 1.2 Where the data actually lives (important, non-obvious)
- The real data source of truth is the **inline `const DB = {…}` object inside `src/lib/cliniqApp.ts`** (`lesion_type`, `differentials`, `disease_page`, `protocols`). The parallel files in `src/data/*.ts` are **unused/legacy** — do not edit them.
- `cliniqApp.ts` carries `/* eslint-disable */` and `// @ts-nocheck`, so type errors there do **not** surface. Run `npx tsc --noEmit` to catch syntax errors. New files we add (the model, renderer, flow data) are **not** `@ts-nocheck` and so get full strict-mode type checking — keep them that way.
- Clinical-sign flowcharts + diagnostic-approach tabs live partly as exported HTML-string consts in `src/lib/signs/*.ts`, and partly as inline `render*Flow*()` template-literal functions in `cliniqApp.ts`. They are wrapped by `renderX()` functions and registered on `window` in `mountGlobals()` so the `onclick="renderX()"` strings inside the HTML can find them.
- Disease pages cross-link via `@DIS-ID:label` / `@PROT-ID:label` syntax in their text fields (handled by `linkify()` in `renderDiseasePage`).

### 1.3 How to run locally
```bash
# Auth/Convex bypass — falls back to localStorage notes, skips the login redirect:
NEXT_PUBLIC_CONVEX_URL= npm run dev
# App serves on http://localhost:3000
```

### 1.4 What refactor #2 already delivered (the seam we build on)
Already committed (`680bf7e`): the home screen is now generated from a **`SIGNS` registry** — `src/lib/signs/registry.ts`, one entry per clinical sign `{ id, icon, title, sub, flow }`, where `flow` is the global render-function name. `renderLocalise()` maps over it. A Vitest integrity test (`src/lib/signs/registry.test.ts`) statically verifies every `flow` is defined and registered in `mountGlobals`. **This registry is the entry point we extend for #1** (see §2.6, the `flowId` switch).

Test infra is in place: `npm test` runs Vitest; `npm run build`; `npm run lint`; `npx tsc --noEmit`.

---

## 2. The design (locked spec)

### 2.1 The problem we're solving
Each flowchart today is bespoke HTML with fully inlined styles (`style="background:rgba(16,185,129,0.08);border:1.5px solid …"`) repeated thousands of times, and `onclick="renderDiseasePage('DIS-…')"` string handlers. Consequences: massive style duplication, an unqueryable/unvalidatable link graph, ~175 hand-maintained `window` globals, and silent broken links (a typo'd `DIS-…` renders the "coming soon" fallback because `@ts-nocheck` hides it).

### 2.2 Survey findings (what the model must support)
| Metric | Value |
|---|---|
| Top-level sign flowcharts | 21 (the registry signs) |
| Sub-flow pages they branch into | ~42 |
| **Total flowchart pages in scope** | **~63** |
| Link clicks inside flows | `goLesionTab` ×131, `renderDiseasePage` ×112, `renderProtoDetail` ×11, `renderDiffDetail` ×7, flow→flow links ×~25 |
| Structural patterns | linear · 2-col branch · 3-col split · 4-col pattern grid · nested sub-branch · multi-page (endpoint opens another flow) |
| **Bespoke (non-tree) content** | alert/"DON'T MISS" boxes (~12), comparison tables (~8), species/breed callouts (~6), acronym/category grids (VITAMIN-D, `col()` generators), pearl/info banners (~15) |

**~70–80% of each flowchart is a regular tree; ~20–30% is bespoke.** The decision (below) is to model the bespoke content with **typed blocks**, not raw HTML, so it stays structured and validatable. A raw-HTML escape hatch exists for true one-offs only.

### 2.3 Existing CSS vocabulary (reuse, don't reinvent)
Defined in `src/app/globals.css`: `.flow-wrap`, `.flow-node` (+ `.entry/.step/.sub-step/.insp/.exp/.rest/.mixed`), `.flow-arrow-v`, `.flow-endpoint` (+ anatomy variants `.nasal/.larynx/.bronchi/.pleural/.mechanic/.parench/.gi-upper/.gi-primary/.gi-secondary/.oesoph`), the `.fn-*` family, and the `.dx-*` family (diagnostic-approach views). The renderer emits these classes so visual output is unchanged. A `CAT_STYLE` object already encodes the 9-key clinical category palette (V/I/M/Im/D/ME/Tx/Tr/A) used by the jaundice/pale/seizure grids — reuse it for the `categoryGrid` block.

### 2.4 Data model
File: `src/lib/signs/flowTypes.ts` (new, strict-typed).
```ts
type Tone = 'danger' | 'warning' | 'info' | 'teal' | 'violet' | 'neutral'

type FlowPage = { id: string; title: string; blocks: Block[] }

type Block =
  | { kind: 'node'; variant: 'entry' | 'step' | 'sub-step'; text: string; sub?: string }
  | { kind: 'branch'; columns: Column[] }                       // 2/3/4-col splits; nests via Column.blocks
  | { kind: 'endpoints'; cols?: number; items: Endpoint[] }     // grid of leaf links
  | { kind: 'alert'; tone: Tone; title: string; items: string[] }      // "DON'T MISS" boxes
  | { kind: 'callout'; tone: Tone; title?: string; html: string }      // pearls / info banners
  | { kind: 'table'; headers: string[]; rows: string[][]; tone?: Tone } // comparison tables
  | { kind: 'diseaseGrid'; title: string; links: Link[] }              // disease-page link grid
  | { kind: 'categoryGrid'; columns: { cat: string; items: string[] }[] } // V/I/M/… palette grids
  | { kind: 'speciesCompare'; dog: string[]; cat: string[] }           // 🐕 vs 🐱 callouts
  | { kind: 'html'; html: string }                                     // escape hatch — rare, last resort

type Column   = { header: string; tone: Tone; sub?: string; blocks: Block[] }   // recursive
type Endpoint = { label: string; sublabel?: string; tone?: Tone; anat?: string; icon?: string; link?: Link }

type Link =
  | { to: 'disease';  id: string }            // → renderDiseasePage(id)
  | { to: 'protocol'; id: string }            // → renderProtoDetail(id)
  | { to: 'lesion';   loc: string; name: string }  // → goLesionTab(loc, name)
  | { to: 'flow';     id: string }            // → another FlowPage (sub-flow)
  | { to: 'dx';       id: string }            // → diagnostic-approach view
```
Notes:
- **Arrows are implicit** — the renderer inserts `.flow-arrow-v` between consecutive vertical blocks. Data never specifies arrows.
- **`tone` is a closed enum** mapped to CSS classes; this is where we de-inline the rgba styles. Endpoints may also use an `anat` variant (existing anatomy classes). Truly unique colors → escape hatch.
- **Nesting is recursion** — a `Column` holds `blocks`, so a nested sub-branch is just a `branch` inside a column (covers bleeding 2×2, haematuria stream split).
- An `Endpoint` with no `link` is a non-clickable info node.

### 2.5 The generic renderer
File: `src/lib/signs/renderFlow.ts` (new). `renderFlowPage(page: FlowPage): string` walks `blocks`, emits the existing CSS classes, inserts connectors, and turns each `Link` into a click target. One function replaces ~63 bespoke render functions.

### 2.6 Link dispatch + coexistence switch
- `Link`s render as `data-link` attributes resolved by **one delegated click handler** (replaces N `onclick="renderX()"` strings). This is what eventually lets `mountGlobals` shrink. During migration we may keep an `onclick` shim for compatibility with not-yet-migrated flows.
- **Coexistence:** extend `SignEntry` with an optional `flowId?: string`. If set, the dispatcher renders from `FLOWS[flowId]` data; if not, it falls back to the legacy `flow` function name. Migrated and legacy signs coexist; the app never breaks mid-migration.
- All flow pages live in a `FLOWS: Record<string, FlowPage>` map, aggregated from per-sign files.

### 2.7 File layout
```
src/lib/signs/
  flowTypes.ts          # model (new)
  renderFlow.ts         # generic renderer + dispatch (new)
  registry.ts           # SIGNS (extend with flowId)
  flows/
    index.ts            # aggregates FLOWS map
    epistaxis.ts        # FlowPage[] for a sign + its sub-flows (new, one file per sign)
    redEye.ts
    …
  flowTypes.test.ts / flows.test.ts   # integrity tests (new)
```

### 2.8 Definition of "parity" (the acceptance gate per sign)
Swapping inline styles for tone classes **changes the DOM**, so parity is **NOT** byte-identical markup. Parity = **(a) visual match** (Playwright screenshot before/after) **+ (b) content match** (every clinical text string from the old HTML is present in the new render). A green screenshot with reshuffled `<div>`s and identical text **passes**.

---

## 3. Decisions log

| # | Decision | Status |
|---|---|---|
| D1 | Bespoke content uses **typed blocks** (alert/table/diseaseGrid/categoryGrid/speciesCompare), escape-hatch HTML only as last resort | ✅ Decided |
| D2 | Implicit arrows (+ `connectAfter` override); closed `tone` enum (8 tones after pilot); recursive `Column.blocks` nesting | ✅ Decided |
| D3 | `flowId` coexistence switch on `SignEntry`; `FLOWS` map; one file per sign | ✅ Decided |
| D4 | Parity = visual + content, not DOM-identical | ✅ Decided |
| D5 | **Dx views ARE IN scope for #1** (Chris's call, post-pilot) — migrated per sign, after that sign's flowchart; needs a Dx-block model extension for the `.dx-*` vocabulary (next increment) | ✅ Decided |
| D6 | **No parser — hand-migrate** (the pilot was clean; content-parity test is the safety net) | ✅ Decided |
| D7 | **Sequencing:** pilot → eye family → simple → GI/uro/metabolic families → bespoke-heavy last; migrate whole signs together. Within a sign: **flowchart first, then its Dx views** | ✅ Decided |

---

## 4. Migration phases & checklist

Each sign is a natural checkpoint (app is consistent and shippable). Each phase end is a larger checkpoint. **Per-sign "Done" = model written · parity verified (screenshot + content) · `flowId` set in registry · `npm test` + `npm run build` + `npx tsc --noEmit` green.**

### Phase 0 — Framework + pilot  ✅ *Checkpoint reached: model proven on epistaxis*
- [x] `flowTypes.ts` — the complete model (§2.4)
- [x] `renderFlow.ts` — generic renderer for `node` / `branch` / `endpoints`
- [x] Renderer support for the bespoke blocks epistaxis exercises: `alert`, `callout`, `diseaseGrid`, `dxRow`, `html`. `table` / `categoryGrid` / `speciesCompare` are typed in the model but deferred to first use (eye / bespoke phases) to avoid untested code
- [x] Link serialisation to existing global handlers + `renderFlowId` dispatcher with `LEGACY_FLOWS` fallback (delegated handler + `mountGlobals` shrink deferred to Phase 3)
- [x] Extend `SignEntry` with `flowId`; `renderLocalise` coexistence switch (data vs legacy)
- [x] `flows/epistaxis.ts` — epistaxis page as `FlowPage` data + `flows/index.ts` FLOWS map
- [x] Parity verified: rendered innerText **byte-identical** to legacy (2405 chars, 0 word diff); screenshots visually indistinguishable
- [x] Tests: `flows.test.ts` (8 tests) incl. node-level content-parity + link integrity; `npm test` 14/14 green
- [x] `npx tsc --noEmit`, `npm run build`, `npm run lint` green
- [ ] **STOP — review the model shape with Chris before scaling**  ← *we are here*

**Phase 0 outcome / refinements to the spec (surfaced by the pilot):**
- **Tone palette is now 8 tones** — added `green` + `orange` to faithfully reproduce epistaxis (fungal / foreign-body). Colours are defined once as a `HUE` map in `renderFlow.ts`; data only names the tone.
- **Added `dxRow` block + `LabeledLink` type** — for the "Full diagnostic approach" button row and the disease-grid link list (each is a labelled link).
- **Added a per-block `connectAfter` override** to the implicit-arrow rule — used exactly once in epistaxis (the SYSTEMIC sub-step feeds straight into endpoints with no connector).
- **Link dispatch for the pilot** serialises `Link`s to the existing global `onclick` handlers (`renderDiseasePage` / `renderProtoDetail` / `goLesionTab` / `renderFlowId` / `renderDx<Id>`) — faithful, zero new event wiring. The delegated handler stays a Phase-3 concern.
- **Parity gate met strongly:** identical visible text + indistinguishable screenshots; disease, cross-flow (→ legacy bleeding), and dx links all verified navigating in the browser with 0 console errors.

### Phase 1a — Eye family  ⏸️ *Checkpoint: block library matures on similar shapes*
Flowcharts first (below); each sign's **Dx views** follow once the Dx-block model
extension lands (D5). Flow blocks added so far: `choices` (clickable pattern-node
grid, tone or pattern-variant), `banner` (centered info strip), callout
`gap`/`center`, `table` (comparison grid w/ coloured cells + tinted box),
`cardSection` (tinted disease-card groups), entry-node `tone`; tones extended
with `purple`/`indigo`.
- [x] **Wet Eye** — entry (1 page) ✅ byte-identical text; indistinguishable screenshots; lesion links verified
- [x] **Blind Eye** — entry + `acute`, `chronic` (3 pages) ✅ all 3 byte-identical text (1972/3005/3201 chars); table + cardSection + tone-choices verified; entry→sub-flow + disease links work
- [x] **Red Eye** — entry + `coats`, `iris`, `bleed`, `orbit` (5 pages) ✅ all byte-identical; coats sub-flow **pixel-identical** to legacy. Added `cardGrid` (fn-ep card grid), `fnHeader`, and FlowPage `layout:'fn'` (bare + `.fn-arrow`) for the legacy `.fn` system
- [x] **Abnormal Pupil** — entry + 6 sub-flows (7 pages) ✅ all 7 byte-identical text; `categoryGrid` (cause pages) + `decisionTree` (localise pages) **pixel-identical** to legacy. Added `categoryGrid`, `decisionTree`, `disclaimer` blocks + `slate` tone. (The neurological-branch page stays `html` — a bespoke 2-col compare + arrow-branch layout; same pattern as the Red Eye coats discriminator → a future `compareBox` block.)
- [ ] Eye-family **Dx views** (History/Exam/Diagnostics × 4 signs) — after the Dx-block model extension
- [x] All four eye-family **flowcharts** migrated, parity-verified, committed; `flowId` set for each

### Phase 1b — Simple / regular signs  ✅ *Done*
- [x] **Coughing** — entry (1) ✅ byte-identical
- [x] **Sneezing** — entry (1) ✅ byte-identical
- [x] **Acute Encephalopathy** — entry (1) ✅ byte-identical
- [x] **Diarrhoea** — entry (1) ✅ byte-identical (bespoke branch + SB/LB compare kept as html)
- [x] **Dyspnoea** — entry + `insp`, `rest` (3) ✅ byte-identical. NB: the legacy entry's Expiratory/Restrictive/Mixed tiles call `renderExpFlow`/`renderRestFlow`/`renderMixedFlow`, which **do not exist** (pre-existing broken links) — faithfully preserved; only `insp`/`rest` sub-flows exist. Entry tile grid + 🐱 cat box kept as html.
- [x] Browser-verified byte-identical for all 7 pages; tests 94/94; `flowId` set. Migrated by parallel sub-agents using the flowchart-data skill.

### Phase 1c — GI / uro / metabolic families  ✅ *Done*
- [x] **Vomiting** — entry (1) ✅ byte-identical (oesoph/extra-oesoph are goLesionTab redirects, not pages; renderTrueVom is an orphan). Bespoke branch kept as html.
- [x] **Haematuria** — entry + 6 sub-flows (7) ✅ byte-identical (entry const-backed → content-parity test). Bespoke stream/chip grids kept as html (flagged: a typed `diff` link + pink/genital tones would let these become typed).
- [x] **Jaundice** — entry + `pre-hep`, `hep`, `post-hep` (4) ✅ byte-identical + **pixel-identical**. hep/post-hep use the new `categoryColumns` block.
- [x] **Pale Mucous Membranes** — entry + `regen`, `non-regen`, `pre-regen`, `shock`, `cardiac` (6) ✅ byte-identical. Sub-flow cause grids use `categoryColumns`.
- [x] **Polyuria / Polydipsia** — entry + `prim-pd`, `prim-pu`, `sec-pu` (4) ✅ byte-identical (bespoke grids kept as html).
- [x] **Weakness / Collapse** — entry + `episodic`, `persistent`, `collapse` (4) ✅ byte-identical (entry typed; sub-flow bodies html — need a `diff` link + anat-endpoint colours).
- [x] All 26 pages browser-verified byte-identical; tests 173/173; `flowId` set. **Added `categoryColumns` block** (wrapping 3-col grid of header+↓+chips units, CAT_STYLE palette incl. pink "Anomalous") — the legacy `col()` grids of jaundice/pale/pupd. (Migrated by parallel sub-agents; categoryColumns built + converted by parent.)

### Phase 2 — Bespoke-heavy signs  ✅ *Done*
- [x] **Seizures** — entry (1) ✅ byte-identical. VITAMIN-D acronym grid / breed grid / reactive lists kept as html (no typed equivalent).
- [x] **Myelopathy** — entry (1) ✅ byte-identical + **pixel-identical** (colour-coded localisation/grade/recovery tables, colspan section rows — kept as html; the `table` block can't yet do per-column header colours / colspan / pink).
- [x] **Vestibular** — entry (1) ✅ byte-identical. Comparison table uses the typed `table` block; nav tiles html.
- [x] **Ataxia** — entry (1) ✅ byte-identical. 3-col split typed (`choices`); flow links → vestibular/myelopathy; info panels + action cards html.
- [x] **Bleeding** — entry + `primary`, `secondary`, `dic`, `vasc` (5) ✅ byte-identical. Typed `alert`/`diseaseGrid`/`table`/`callout`; bespoke branches + dog/cat matrix html. (Fixed a dropped `↓` connector on the DIC page found in browser verify.)
- [x] All 9 pages browser-verified byte-identical; tests 201/201; `flowId` set.
- [x] **All 21 signs now data-driven** — every registry entry has a `flowId`. ✅🎉

**Structural backlog (flagged by agents; faithful as html for now, would replace escape hatches):**
- `speciesCompare` renderer (🐕/🐱 matrices — bleeding, dyspnoea cat box)
- `mnemonicGrid` (VITAMIN-D / DAMNIT-V acronym grids — seizures)
- richer `table` (per-column header colours, colspan section rows, pink/free cell colours — myelopathy, vestibular, bleeding)
- `navTiles`/`linkCard` (3-col `.flow-endpoint` / `.card` rows — vestibular, ataxia, many)
- `compareBox` (2-col compare — red-eye coats, abnormal-pupil neuro, bleeding DIC panels)
- new `Link` kinds: `{to:'lesion-detail',id}` (renderLesionDetail) and `{to:'diff',id}` (renderDiffDetail) — jaundice/haematuria/weakness/bleeding
- pink/rose + a couple of exact category shades in the tone palette

### Phase 3 — Cutover + validation  ⏸️ *Checkpoint: refactor complete*
- [ ] Remove now-dead legacy `render*Flow*()` functions + their `mountGlobals` registrations (only those fully replaced by data)
- [ ] Collapse remaining flow `onclick` shim into pure delegated dispatch
- [ ] **Link-integrity test** (extends `registry.test.ts`): every `Link` resolves — `disease`/`protocol` id exists in `DB`, `flow` id exists in `FLOWS`, `lesion` loc is valid (this folds in refactor #3's win)
- [ ] Full regression: visit all 21 signs + a sample of sub-flows in the browser; 0 console errors
- [ ] `npm test`, `npm run build`, `npx tsc --noEmit`, `npm run lint` green
- [ ] Update `registry.test.ts` count/assertions as needed
- [ ] (Optional) Revisit D6 — was a skeleton parser worth it in hindsight? Note outcome.

### Dx views — now IN scope (D5)
The ~70 Diagnostic-approach views (`renderDx*`, `.dx-*` vocabulary) are part of #1.
They share `node`/`callout`/`alert`/`table` ideas but need a Dx-block extension
(3-tab nav, `dxStep` → `dxCheck` sequences, comparison tables, red-flag boxes).
Migrated **per sign, after that sign's flowchart**. The Dx-block model is the next
design increment (proposed on the first eye sign's Dx views).

---

## 5. Verification procedure (run per sign and per phase)
```bash
npx tsc --noEmit          # syntax + strict types on new files
npm test                  # Vitest: registry + flow integrity
npm run build             # Next production build
npm run lint              # no new lint errors in migrated files
NEXT_PUBLIC_CONVEX_URL= npm run dev   # then browser-verify the migrated sign
```
Browser parity per sign: open the sign from the home screen, screenshot, compare against the pre-migration screenshot, and confirm every clinical text string is present (content-parity assertion in the flow test is the mechanical backstop; Chris eyeballs the clinical accuracy).

---

## 6. Risks & mitigations
| Risk | Mitigation |
|---|---|
| Visual regression from pixel-tuned inline styles | Reuse existing CSS classes; per-sign screenshot diff; `tone`/`anat` variants cover observed colors |
| Escape-hatch overuse defeats the purpose | Real typed block library (D1); track `{kind:'html'}` count — keep it near zero |
| **Clinical content dropped** (safety issue) | Content-parity assertion (every old text string present) + Chris's review; migrate by careful transcription |
| Cross-flow link breakage | `flowId` coexistence + `onclick` shim until all flows migrated; link-integrity test at Phase 3 |
| Scale / tedium of ~63 pages | Whole-sign checkpoints; optional skeleton parser (D6) decided after pilot |
| Line numbers in this doc drift | Reference symbols by name, not line; this doc cites functions/consts, not line numbers |

---

## 7. Glossary
- **Sign / clinical sign** — a presenting observation (epistaxis, ataxia, jaundice). The home-screen cards.
- **Flow / FlowPage** — one screen of a flowchart. A sign has an entry page + 0..n sub-flow pages.
- **Endpoint** — a leaf node; usually a `Link` to a disease/protocol/lesion/flow, sometimes a non-clickable info node.
- **Block** — one unit of vertical content on a page (node, branch, endpoints, alert, table, …).
- **Registry (`SIGNS`)** — the home-screen list from refactor #2; gains `flowId` here.
- **`FLOWS`** — the `Record<string, FlowPage>` map of all migrated flow pages.
- **Bespoke content** — non-tree elements (alert boxes, tables, grids); modeled as typed blocks.
- **Parity** — visual + content equivalence (not DOM-identical). The per-sign acceptance gate.

---

## 8. Open questions for Chris (resolve before/at Phase 0 review)
- [ ] D5 — confirm Dx views are out of scope for #1 (fast-follow), or fold them in?
- [ ] D6 — OK to defer the parser decision until after the epistaxis pilot?
- [ ] D7 — confirm sequencing (eye family second, bespoke last)?
- [ ] Any objection to implicit arrows, the closed `tone` enum, or the `flowId` coexistence switch (D2/D3)?
