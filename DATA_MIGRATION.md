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
| D2 | Implicit arrows; closed `tone` enum; recursive `Column.blocks` nesting | ✅ Decided |
| D3 | `flowId` coexistence switch on `SignEntry`; `FLOWS` map; one file per sign | ✅ Decided |
| D4 | Parity = visual + content, not DOM-identical | ✅ Decided |
| D5 | **Dx views (History/Exam/Diagnostics, ~70 views) are OUT of #1** — fast-follow using the same model; design blocks to cover them | 🔶 Proposed — default unless Chris says otherwise |
| D6 | **Parser-assist deferred** — hand-migrate epistaxis + 2–3 first; only then consider a narrow skeleton parser | 🔶 Proposed — revisit after pilot |
| D7 | **Sequencing:** pilot → eye family → simple → GI/uro/metabolic families → bespoke-heavy last; migrate whole signs (entry + sub-flows) together | 🔶 Proposed — default unless Chris says otherwise |

---

## 4. Migration phases & checklist

Each sign is a natural checkpoint (app is consistent and shippable). Each phase end is a larger checkpoint. **Per-sign "Done" = model written · parity verified (screenshot + content) · `flowId` set in registry · `npm test` + `npm run build` + `npx tsc --noEmit` green.**

### Phase 0 — Framework + pilot  ⏸️ *Checkpoint: model proven on one real sign*
- [ ] `flowTypes.ts` — the model (§2.4)
- [ ] `renderFlow.ts` — generic renderer for `node` / `branch` / `endpoints` blocks
- [ ] Renderer support for typed bespoke blocks: `alert`, `callout`, `table`, `diseaseGrid`, `categoryGrid`, `speciesCompare`, `html`
- [ ] Link dispatch (delegated handler) + `onclick` compatibility shim
- [ ] Extend `SignEntry` with `flowId`; wire dispatcher fallback (legacy vs data)
- [ ] `flows/epistaxis.ts` — epistaxis entry page as `FlowPage` data (2-col branch + alert + diseaseGrid + dx-row + cross-flow link to bleeding)
- [ ] Parity verified for epistaxis: screenshot match + all clinical text present
- [ ] Tests: flow-data integrity test scaffold; `npm test` green
- [ ] `npx tsc --noEmit`, `npm run build`, `npm run lint` green
- [ ] **STOP — review the model shape with Chris before scaling**

### Phase 1a — Eye family  ⏸️ *Checkpoint: block library matures on similar shapes*
- [ ] **Red Eye** — entry + `coats`, `iris`, `bleed`, `orbit` (5 pages)
- [ ] **Blind Eye** — entry + `acute`, `chronic` (3 pages)
- [ ] **Abnormal Pupil** — entry + `ophthalmic`, `neuro`, `mydriasis`, `mydriasis-localise`, `horners`, `horners-localise` (7 pages)
- [ ] **Wet Eye** — entry (1 page)
- [ ] Parity + tests + build green for each; `flowId` set for all four

### Phase 1b — Simple / regular signs  ⏸️ *Checkpoint*
- [ ] **Coughing** — entry (1)
- [ ] **Sneezing** — entry (1)
- [ ] **Acute Encephalopathy** — entry (1)
- [ ] **Diarrhoea** — entry (1)
- [ ] **Dyspnoea** — entry + `insp`, `rest`, `exp`, `mixed` (5); includes 🐱 cat-differentials box (`speciesCompare`/`callout`)
- [ ] Parity + tests + build green for each; `flowId` set

### Phase 1c — GI / uro / metabolic families  ⏸️ *Checkpoint*
- [ ] **Vomiting** — entry + `oesoph`, `extra-oesoph`, `true-vom` (4); vomit-vs-regurg comparison `table`
- [ ] **Haematuria** — entry + `pseudo`, `true-systemic`, `initial`, `terminal`, `uniform`, `indep` (7)
- [ ] **Jaundice** — entry + `pre-hep`, `hep`, `post-hep` (4); `categoryGrid`
- [ ] **Pale Mucous Membranes** — entry + `regen`, `non-regen`, `pre-regen`, `shock`, `cardiac` (6); `categoryGrid`; transfusion-threshold `callout`
- [ ] **Polyuria / Polydipsia** — entry + `prim-pd`, `prim-pu`, `sec-pu` (4)
- [ ] **Weakness / Collapse** — entry + `episodic`, `persistent`, `collapse` (4)
- [ ] Parity + tests + build green for each; `flowId` set

### Phase 2 — Bespoke-heavy signs  ⏸️ *Checkpoint: stress-tests table/categoryGrid/speciesCompare*
- [ ] **Seizures** — entry; VITAMIN-D acronym grid, breed/structural-mimic boxes, reactive-cause lists (`categoryGrid` + `speciesCompare` + `alert`)
- [ ] **Myelopathy** — entry; localisation table, injury-grade table, recovery-% table, deep-pain `alert`, 4 nav buttons (`table` ×3)
- [ ] **Vestibular** — entry; peripheral-vs-central comparison `table`
- [ ] **Ataxia** — entry; 3-col split + dense 🐕/🐱 species pearls (`speciesCompare`)
- [ ] **Bleeding** — entry + `primary`, `secondary`, `dic`, `vasc` (5); dog/cat matrix, PT/aPTT pattern table, platelet-mechanism sub-grid
- [ ] Parity + tests + build green for each; `flowId` set
- [ ] **All 21 signs now data-driven** — legacy `flow` fallback no longer exercised by the home screen

### Phase 3 — Cutover + validation  ⏸️ *Checkpoint: refactor complete*
- [ ] Remove now-dead legacy `render*Flow*()` functions + their `mountGlobals` registrations (only those fully replaced by data)
- [ ] Collapse remaining flow `onclick` shim into pure delegated dispatch
- [ ] **Link-integrity test** (extends `registry.test.ts`): every `Link` resolves — `disease`/`protocol` id exists in `DB`, `flow` id exists in `FLOWS`, `lesion` loc is valid (this folds in refactor #3's win)
- [ ] Full regression: visit all 21 signs + a sample of sub-flows in the browser; 0 console errors
- [ ] `npm test`, `npm run build`, `npx tsc --noEmit`, `npm run lint` green
- [ ] Update `registry.test.ts` count/assertions as needed
- [ ] (Optional) Revisit D6 — was a skeleton parser worth it in hindsight? Note outcome.

### Fast-follow (separate effort, not #1)
- [ ] Migrate the ~70 Diagnostic-approach views (`renderDx*`, `.dx-*` vocabulary) using the same model + a few Dx-specific blocks.

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
