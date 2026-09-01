// ── Flowchart data model ────────────────────────────────────────────────────
// Refactor #1: clinical-sign flowcharts are described as data (a FlowPage of
// Blocks) and drawn by the generic renderer in ./renderFlow. Types here are the COMPLETE model; the
// renderer implements block kinds as they are first exercised by a migrated
// sign (epistaxis exercises: node, callout, branch, endpoints, alert, dxRow,
// diseaseGrid). table / categoryGrid / speciesCompare land in later phases.

/** Semantic colour names. Mapped to concrete rgba once, in the renderer. */
export type Tone =
  | 'danger'   // red
  | 'warning'  // amber
  | 'info'     // blue
  | 'teal'
  | 'green'    // emerald
  | 'violet'
  | 'purple'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'lime'
  | 'cyan'
  | 'slate'
  | 'neutral'

/** Where an interactive element points. The renderer serialises these to the
 *  existing global handlers (and, later, a delegated dispatcher). */
export type Link =
  | { to: 'disease'; id: string }                 // → renderDiseasePage(id)
  | { to: 'protocol'; id: string }                // → renderProtoDetail(id)
  | { to: 'lesion'; loc: string; name: string; filter?: 'acute' | 'chronic' }   // → goLesionTab(loc, name)
  | { to: 'flow'; id: string }                    // → another FlowPage (renderFlowId)
  | { to: 'dx'; id: string }                      // → diagnostic-approach view (renderDx<Id>)

/** A link with display text, used by link grids and the dx row. */
export type LabeledLink = { label: string; link: Link; accent?: boolean }

/** A leaf in a branch/endpoints grid. No `link` ⇒ non-clickable info node. */
export type Endpoint = {
  label: string
  sublabel?: string
  tone?: Tone
  icon?: string
  link?: Link
}

/** One vertical column of a branch. Holds blocks, so branches nest. */
export type Column = {
  header: string
  /** Omit to render the header as a plain grey text label (no box). */
  tone?: Tone
  sub?: string
  blocks: Block[]
}

/** Common to every block: whether a connector arrow is drawn after it.
 *  Defaults are kind-based (see renderFlow); set explicitly to override. */
type Connectable = { connectAfter?: boolean }

export type NodeBlock = Connectable & {
  kind: 'node'
  variant: 'entry' | 'step' | 'sub-step'
  text: string
  sub?: string
  /** Discriminator detail as separate bullets — one idea per line. Use instead
   *  of `sub` when a step carries several distinct criteria (a run-on `sub` is
   *  hard to scan). Rendered left-aligned under `text`; `sub` still renders
   *  first if both are given. */
  subItems?: string[]
  /** Recolour an entry node (e.g. red acute / blue chronic pathway headers). */
  tone?: Tone
}
/** An N-way split into side-by-side arms. The arms always fit the page: they
 *  share the width evenly and absorb the squeeze internally (their boxes shrink,
 *  a nested category row wraps) rather than any arm sliding off-screen. */
export type BranchBlock = Connectable & { kind: 'branch'; columns: Column[] }
export type EndpointsBlock = Connectable & { kind: 'endpoints'; cols?: number; items: Endpoint[] }

/** An `.fn`-layout header box (the legacy `.fn .fn-insp/.fn-exp/.fn-rest/
 *  .fn-mixed/.fn-step` headers used by sub-flows authored in that system). */
export type FnHeaderBlock = Connectable & {
  kind: 'fnHeader'
  variant: 'insp' | 'exp' | 'rest' | 'mixed' | 'step' | 'entry'
  text: string
}

/** A grid of `.fn-ep` location cards (system line + bold location + optional
 *  badge), laid out `perRow` per `.fn-row`. `anat` selects the `.fn-ep-…`
 *  colour class (nasal, larynx, pleural, mechanic, bronchi, parench, gi-upper,
 *  gi-primary, gi-secondary, oesoph). */
export type CardTile = { anat: string; sys?: string; loc: string; badge?: string; link?: Link }
export type CardGridBlock = Connectable & { kind: 'cardGrid'; perRow?: number; tiles: CardTile[] }

/** A grid of clickable pattern-nodes used as branch choices — the boxes a sign
 *  page splits into. Colour comes from either a pattern `variant`
 *  (.flow-node.insp/.exp/.rest/.mixed) or a `tone`; `label` is HTML (may contain
 *  <br>).
 *
 *  NAME-ONLY: a separation box carries the differential's name and nothing else,
 *  so there is deliberately no `sublabel` slot and no `icon`. The detail these
 *  boxes used to carry — the discriminator that selects the arm — belongs in the
 *  step above the split (`NodeBlock.sub`/`subItems`), where the reader meets it
 *  once as a question instead of N times as competing paragraphs. */
export type ChoiceItem = {
  variant?: 'insp' | 'exp' | 'rest' | 'mixed' | 'step'
  tone?: Tone
  label: string
  link?: Link
}
export type ChoicesBlock = Connectable & { kind: 'choices'; cols?: number; size?: number; items: ChoiceItem[] }

/** A centered, full-width info strip (e.g. "Tap a branch to drill down"). */
export type BannerBlock = Connectable & { kind: 'banner'; tone: Tone; html: string }

/** A structured alert bullet: bold linked label + optional HTML tail (everything
 *  after the bold text, including any separator like ' — '). Use `string` for
 *  items with no link or with multiple links in one bullet. */
export type AlertItem = string | { bold: string; link: Link; html: string }
export const DONT_MISS_TITLE = "ALWAYS RULE OUT / DON'T MISS"
export type AlertBlock = Connectable & { kind: 'alert'; tone: Tone; title: string; items: AlertItem[] }
/** `gap` adds margin-top (px) when the callout is a trailing reference box
 *  rather than part of the arrow-connected spine. `center` centres the text. */
export type CalloutBlock = Connectable & { kind: 'callout'; tone: Tone; title?: string; html: string; gap?: number; center?: boolean }
export type DiseaseGridBlock = Connectable & { kind: 'diseaseGrid'; title: string; links: LabeledLink[] }
export type DxRowBlock = Connectable & { kind: 'dxRow'; items: LabeledLink[] }

/** A comparison/reference table, optionally wrapped in a tinted box with a
 *  title + footnote. Cells are plain text or `{ text, tone }` for a coloured
 *  value. `cols` is a CSS grid-template-columns string.
 *  Headers may carry a `tone` to colour the header text + bottom border;
 *  a cell may set `dim` to render muted (the "normal / not affected" cells in
 *  localisation grids) instead of taking its column's tone.
 *  Rows may be a `{ section: string }` to render a full-width section divider. */
export type TableCell = string | { text: string; tone?: Tone; dim?: boolean }
export type TableRow = TableCell[] | { section: string }
export type TableBlock = Connectable & {
  kind: 'table'
  cols: string
  headers: TableCell[]
  rows: TableRow[]
  boxTone?: Tone
  title?: string
  footnote?: string
  gap?: number
  scroll?: boolean
  minWidth?: number
  /** Pin the FIRST column while the rest of the table scrolls sideways. Only
   *  meaningful with `scroll`, and only on an UNBOXED table — the pinned cells
   *  paint `var(--navy)` behind themselves (and across the column gap) to hide
   *  the columns sliding under, which is the page background, not a box tint. */
  stickyFirstCol?: boolean
  /** Widen the row gap and draw a soft full-width divider between data rows —
   *  for reference tables (e.g. injury grading) that read better as spaced bands. */
  dividers?: boolean
}

/** A tinted section containing a title and a stack of disease cards (the
 *  category groups in the blind-eye acute/chronic pathways). */
export type DiseaseCard = { title: string; tag?: string; desc: string; link?: Link }
export type CardSectionBlock = Connectable & {
  kind: 'cardSection'
  tone: Tone
  title: string
  cards: DiseaseCard[]
  gap?: number
}

/** A 4-(or N-)column category grid: a row of category headers, a row of
 *  connector arrows, then a row of tile-columns (each column 1+ clickable
 *  tiles). The mydriasis/miosis cause pages; later jaundice/pale/seizures.
 *  Use `link` — ONE tile, ONE cause, ONE page. `links` (plural) renders nested
 *  sub-bullets inside a chip and is BANNED as a flowchart format (`npm run
 *  lint:tiles` fails on it): give each cause its own tile instead, so a reader
 *  scanning a column sees every differential at the same level. The field is
 *  kept only so the renderer stays total.
 *  Set `terminal:true` for an intentional leaf note that has no page to link
 *  to (renders in-tone as plain info, NOT greyed). A tile with neither a
 *  link nor `terminal` renders greyed + aria-disabled and is treated as an
 *  authoring gap (a forgotten link). */
export type CategoryTile = { label: string; sublabel?: string; link?: Link; links?: LabeledLink[]; terminal?: boolean }
/** `tone` is an OVERRIDE for page-specific (anatomical / mechanism) columns only.
 *  A column whose `cat` is a `CatLabel` leaves it unset and takes the shared
 *  category colour — see `CatLabel` and `lint:cats`. */
export type CategoryColumn = { cat: string; tone?: Tone; tiles: CategoryTile[] }
export type CategoryGridBlock = Connectable & { kind: 'categoryGrid'; columns: CategoryColumn[] }

/** Shared category labels used by `categoryColumns` and `categoryGrid`. Each maps
 *  to a dedicated `--cat-*` CSS variable in the renderer (`CAT_STYLE` in
 *  FlowPageView), so ONE lesion category is ONE colour on every flow. Use one of
 *  these strings and leave `tone` unset to get that colour automatically; set
 *  `tone` only for a page-specific column that is not a lesion category at all
 *  (an anatomical or mechanism split — "Cervical (C1–T2)", "Left-to-Right
 *  Shunt"). `lint:cats` enforces both halves of that rule.
 *
 *  Spelling is canonical, not free text: "Infectious" (never "Infection"),
 *  "Neoplastic" (never "Mass" / "Neoplastic / Mass"), "Immune-mediated" and
 *  "Drug-induced" (lowercase second word), "Metabolic / Endocrine" in that order
 *  when combined — `Metabolic` and `Endocrine` stay separate labels for the
 *  pages that split them. */
export type CatLabel =
  | 'Vascular'
  | 'Inflammatory'
  | 'Infectious'
  | 'Neoplastic'
  | 'Immune-mediated'
  | 'Degenerative'
  | 'Metabolic / Endocrine'
  | 'Metabolic'
  | 'Endocrine'
  | 'Neurological'
  | 'Toxic'
  | 'Drug-induced'
  | 'Trauma'
  | 'Anomalous'

/** A single row of self-contained category units (header + coloured ↓ + chips),
 *  one column per category — matching the lesion-location pages. Crowded rows
 *  (≥5 columns) clamp to a min width and scroll horizontally rather than crush.
 *  `cat` should be a `CatLabel` for automatic CSS-variable colouring; set `tone`
 *  to override for a custom column label. */
// `categoryColumns` tiles are structurally identical to `categoryGrid` tiles —
// same variants (link / links / terminal / authoring-gap). Keep ONE tile type so
// a new tile field (e.g. a future `sublabel`) is added once and both blocks + the
// shared renderer pick it up. Alias retained for call-site readability.
export type CatColumnTile = CategoryTile
/** `tone` overrides the CAT_STYLE palette lookup — use for custom-coloured columns
 *  that don't correspond to a shared category label (e.g. "Haemoglobinuria"). */
export type CatColumn = { cat: CatLabel | string; tone?: Tone; tiles: CatColumnTile[] }
/** Cause categories ALWAYS lay out LINEAR — ONE row, one column per category,
 *  never wrapped into a 2×2 (or N-per-row) grid. A reader scanning the row has to
 *  see every category at the same level; a stacked grid reads as two separate
 *  splits and buries the lower row. There is deliberately no `cols` override: a
 *  row that outgrows its width clamps to a minimum column and scrolls sideways as
 *  ONE unit (see `spillGrid` in FlowPageView) rather than wrapping. Split the
 *  differential into two pages if a row genuinely carries too many categories. */
export type CategoryColumnsBlock = Connectable & { kind: 'categoryColumns'; columns: CatColumn[] }

/** Reusable step block for "IDENTIFY CAUSE CATEGORY" — appears in 24+ flows. */
export const IDENTIFY_CAUSE_STEP = { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' } as const

/** One arm of a mechanism split: a coloured header + discriminator `sub` over a
 *  horizontal row of cause categories (`categoryColumns`), one column per
 *  category. */
export type MechanismArm = { header: string; tone: Tone; sub?: string; categories: CatColumn[] }

/** Build a `branch` that divides a differential by mechanism BEFORE the cause
 *  categories — the arms sit SIDE BY SIDE (one branch column each), and inside
 *  every arm the cause categories lay out horizontally: a uniform linear row of
 *  category headers with their disease chips beneath, matching the
 *  lesion-location pages. Both arms are always on the page — they share the
 *  width evenly, and each arm's category row re-fits (wrapping onto a second
 *  line when it has to) to whatever width the arm ends up with. Shared by the
 *  pale-MM regenerative (haemolysis vs haemorrhage) and non-regenerative
 *  (primary vs secondary) pages; reach for it whenever a page splits one
 *  differential two (or more) ways by mechanism. */
export function mechanismSplit(arms: MechanismArm[]): BranchBlock {
  return {
    kind: 'branch',
    connectAfter: false,
    columns: arms.map(a => ({
      header: a.header,
      tone: a.tone,
      sub: a.sub,
      blocks: [{ kind: 'categoryColumns', columns: a.categories }],
    })),
  }
}

/** SOFT HYPHEN (U+00AD) — an invisible "you may break the word here" mark.
 *
 *  A long clinical term in a narrow chip has to break somewhere. Left alone the
 *  browser breaks it wherever the box ends ("EXTRALUMINA / L", "Glaucom / a"),
 *  which orphans letters and reads as a bug. A soft hyphen offers a syllable
 *  boundary instead, and renders a real hyphen at the break — "EXTRA-" /
 *  "LUMINAL". It is invisible whenever the word fits, so a label carrying one
 *  looks identical on a wide screen and only differs where it used to break
 *  badly.
 *
 *  Use the constant, never a bare U+00AD or an `&shy;` entity: the character is
 *  invisible in a source file (the next person editing the label would delete
 *  it without seeing it), and `&shy;` only works in the fields that go through
 *  the HTML parser — `endpoints` labels are rendered as plain React text and
 *  would print the entity verbatim. `${SHY}` in a template literal works in
 *  both, and says what it is.
 *
 *  Place it at a syllable boundary a clinician would accept: NEURO-MUSCULAR,
 *  CRICO-PHARYNGEAL, ORGANO-PHOSPHATES. */
export const SHY = '\u00AD'

/** A YES/NO localisation decision tree. Each `step` is a decision box with a
 *  continue-arrow (down) for the `continue` answer and a side exit outcome for
 *  the other; `split` ends with two side-by-side outcomes; `outcome` is a
 *  standalone terminal box. */
export type DecisionOutcome = { tone: Tone; html: string }
export type DecisionStep =
  | { type: 'step'; continue: 'YES' | 'NO'; question: string; sub?: string; exit: DecisionOutcome }
  | { type: 'split'; question: string; sub?: string; noLabel: string; no: DecisionOutcome; yesLabel: string; yes: DecisionOutcome }
  | { type: 'outcome'; label: string; box: DecisionOutcome }
export type DecisionTreeBlock = Connectable & { kind: 'decisionTree'; steps: DecisionStep[] }

/** An explicit, labelled N-way split (YES/NO and friends) drawn with the same
 *  connected right-angle fork the renderer puts in front of every other split:
 *  one stem out of the preceding block, a horizontal bar, one labelled leg per
 *  branch. A leg marked `continue` carries no content — its line runs the full
 *  height of the fork and arrows into the NEXT spine block, so the main line of
 *  reasoning stays unbroken while the other legs end on their own outcomes.
 *
 *  A leg's criteria are the SIGNS THE READER CAN SEE — the findings that pick
 *  this arm. Give them as `subItems`, one finding per bullet, rendered as a
 *  tinted card the reader can tick off; `tone` colours that card so the arms are
 *  told apart at a glance. `sub` is the short form — ONE line for a leg whose
 *  criterion is a single phrase ("True PU/PD"). A run-on `sub` carrying four
 *  criteria in one grey sentence is what `subItems` exists to replace
 *  (`lint:prose` enforces the cut-off). */
export type ForkLeg = { label: string; tone?: Tone; sub?: string; subItems?: string[]; continue?: boolean; blocks?: Block[] }
export type ForkBlock = Connectable & { kind: 'fork'; legs: ForkLeg[] }

/** The split connector as an authored-HTML string — the exact twin of the
 *  renderer's `<ForkLines>` (same `.flow-fork*` markup, same CSS). Every `html:`
 *  escape hatch that lays out its OWN N-column split must feed that split with
 *  `${forkHtml(...)}` instead of a lone `<div class="flow-arrow-v">↓</div>`, so
 *  a split is drawn the same way on every page whether it is typed or authored.
 *
 *  `cols` is the split grid's own `grid-template-columns` — a count for even 1fr
 *  tracks (`forkHtml(2)`) or the template string for asymmetric ones
 *  (`forkHtml('3fr 2fr')`). `gap` MUST match the grid's gap (the legs bridge it).
 *  Set `arrow: false` when each column opens with its own label + arrow (the
 *  labelled-leg look of the `fork` block): the drops are then plain lines and the
 *  arrowheads stay on the per-column arrows below the labels. */
export function forkHtml(cols: number | string, gap = 8, arrow = true): string {
  const template = typeof cols === 'number' ? `repeat(${cols},1fr)` : cols
  const n = typeof cols === 'number' ? cols : cols.trim().split(/\s+/).length
  const drop = arrow ? '<div class="flow-arrow-v">↓</div>' : '<div class="flow-fork-drop"></div>'
  const legs = Array.from({ length: n }, () => `<div class="flow-fork-leg">${drop}</div>`).join('')
  return `<div class="flow-fork" style="--fork-gap:${gap}px;">`
    + '<div class="flow-fork-stem"></div>'
    + `<div class="flow-fork-legs" style="grid-template-columns:${template};">${legs}</div>`
    + '</div>'
}

/** The "For qualified veterinary professionals only." footer. */
export type DisclaimerBlock = Connectable & { kind: 'disclaimer' }

/** A tinted comparison box: a coloured panel with a title, a 2-(or N-)column
 *  wrapping grid of tinted sub-cards (each a bold `header` + html `body`), and an
 *  optional footnote. The "X vs Y — KEY DISCRIMINATOR" / species-pattern boxes. */
export type CompareCard = { header: string; html: string }
export type CompareBoxBlock = Connectable & {
  kind: 'compareBox'
  tone: Tone
  title?: string
  /** Grid columns (default 2; cards wrap). */
  cols?: number
  cards: CompareCard[]
  footnote?: string
  /** margin-top (px); default 14. */
  gap?: number
}

// Typed now for model completeness; renderer support added when first used.
export type SpeciesCompareBlock = Connectable & { kind: 'speciesCompare'; dog: string[]; cat: string[] }

/** An interactive 🐕/🐈 species toggle: the reader picks a species and only that
 *  species' phenotype note + VITAMIN-D cause categories (a `categoryColumns`
 *  grid) render. Used for pages whose differentials differ by species (DIC). */
export type SpeciesPanel = { note: string; columns: CatColumn[] }
export type SpeciesChooserBlock = Connectable & {
  kind: 'speciesChooser'
  dog: SpeciesPanel
  cat: SpeciesPanel
  /** Which panel is shown first (default 'dog'). */
  default?: 'dog' | 'cat'
}

/** A tinted info panel with an optional icon + title header and body text.
 *  Replaces the ~20 raw `html` blocks of the form:
 *    <div style="margin-top:Xpx;padding:9px 12px;background:rgba(…,0.07-0.12);…">
 *      <div style="font-size:10px;font-weight:700;color:…">🔬 TITLE</div>
 *      <div style="font-size:9.5px;…">content</div>
 *    </div>
 *  Not in the SPINE set — no connector arrow is drawn after it. */
export type InfoBoxBlock = Connectable & {
  kind: 'infoBox'
  tone: Tone
  icon?: string
  title?: string
  html: string
  gap?: number
}

export type HtmlBlock = Connectable & { kind: 'html'; html: string } // escape hatch — last resort

export type Block =
  | NodeBlock
  | BranchBlock
  | EndpointsBlock
  | FnHeaderBlock
  | CardGridBlock
  | ChoicesBlock
  | BannerBlock
  | AlertBlock
  | CalloutBlock
  | DiseaseGridBlock
  | DxRowBlock
  | TableBlock
  | CardSectionBlock
  | CategoryGridBlock
  | CategoryColumnsBlock
  | DecisionTreeBlock
  | ForkBlock
  | DisclaimerBlock
  | CompareBoxBlock
  | SpeciesCompareBlock
  | SpeciesChooserBlock
  | InfoBoxBlock
  | HtmlBlock

/** One screen of a flowchart. A sign has an entry page + 0..n sub-flow pages.
 *  `layout` selects the wrapper/connector system: 'flow' (default) wraps in
 *  `.flow-wrap` with `.flow-arrow-v` connectors; 'fn' renders bare with
 *  `.fn-arrow` connectors (for sub-flows authored in the legacy `.fn` system). */
export type FlowPage = {
  id: string
  title: string
  layout?: 'flow' | 'fn'
  /** Override the DX sign key for leaf pages whose id doesn't derive from the DX key by prefix-stripping. */
  dxSign?: string
  /** Explicitly suppress the auto-appended Diagnostic Approach card (e.g. routing/lesion-nav pages). */
  noCard?: boolean
  blocks: Block[]
}
