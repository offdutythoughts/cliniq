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
  | 'slate'
  | 'neutral'

/** Where an interactive element points. The renderer serialises these to the
 *  existing global handlers (and, later, a delegated dispatcher). */
export type Link =
  | { to: 'disease'; id: string }                 // → renderDiseasePage(id)
  | { to: 'protocol'; id: string }                // → renderProtoDetail(id)
  | { to: 'lesion'; loc: string; name: string }   // → goLesionTab(loc, name)
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
  /** Recolour an entry node (e.g. red acute / blue chronic pathway headers). */
  tone?: Tone
}
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

/** A grid of clickable pattern-nodes used as branch choices. Colour comes from
 *  either a pattern `variant` (.flow-node.insp/.exp/.rest/.mixed) or a `tone`.
 *  `label`/`sublabel` are HTML (may contain <br>). */
export type ChoiceItem = {
  variant?: 'insp' | 'exp' | 'rest' | 'mixed' | 'step'
  tone?: Tone
  label: string
  sublabel?: string
  link?: Link
}
export type ChoicesBlock = Connectable & { kind: 'choices'; cols?: number; size?: number; items: ChoiceItem[] }

/** A centered, full-width info strip (e.g. "Tap a branch to drill down"). */
export type BannerBlock = Connectable & { kind: 'banner'; tone: Tone; html: string }

export type AlertBlock = Connectable & { kind: 'alert'; tone: Tone; title: string; items: string[] }
/** `gap` adds margin-top (px) when the callout is a trailing reference box
 *  rather than part of the arrow-connected spine. `center` centres the text. */
export type CalloutBlock = Connectable & { kind: 'callout'; tone: Tone; title?: string; html: string; gap?: number; center?: boolean }
export type DiseaseGridBlock = Connectable & { kind: 'diseaseGrid'; title: string; links: LabeledLink[] }
export type DxRowBlock = Connectable & { kind: 'dxRow'; items: LabeledLink[] }

/** A comparison/reference table, optionally wrapped in a tinted box with a
 *  title + footnote. Cells are plain text or `{ text, tone }` for a coloured
 *  value. `cols` is a CSS grid-template-columns string.
 *  Headers may carry a `tone` to colour the header text + bottom border.
 *  Rows may be a `{ section: string }` to render a full-width section divider. */
export type TableCell = string | { text: string; tone?: Tone }
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
 *  tiles). The mydriasis/miosis cause pages; later jaundice/pale/seizures. */
export type CategoryTile = { label: string; link?: Link }
export type CategoryColumn = { cat: string; tone: Tone; tiles: CategoryTile[] }
export type CategoryGridBlock = Connectable & { kind: 'categoryGrid'; columns: CategoryColumn[] }

/** A wrapping `cols`-column grid of self-contained category units (header +
 *  coloured ↓ + chips). `cat` is one of the shared CAT_STYLE category labels
 *  (Vascular / Inflammatory / Mass / Immune-mediated / Degenerative /
 *  Metabolic / Endocrine / Toxic / Trauma / Anomalous), which carries its own
 *  exact colour. Used by the jaundice / pale / pupd `col()` grids. */
export type CatColumnTile = { label: string; link?: Link }
export type CatColumn = { cat: string; tiles: CatColumnTile[] }
export type CategoryColumnsBlock = Connectable & { kind: 'categoryColumns'; cols?: number; columns: CatColumn[] }

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
  | DisclaimerBlock
  | CompareBoxBlock
  | SpeciesCompareBlock
  | HtmlBlock

/** One screen of a flowchart. A sign has an entry page + 0..n sub-flow pages.
 *  `layout` selects the wrapper/connector system: 'flow' (default) wraps in
 *  `.flow-wrap` with `.flow-arrow-v` connectors; 'fn' renders bare with
 *  `.fn-arrow` connectors (for sub-flows authored in the legacy `.fn` system). */
export type FlowPage = {
  id: string
  title: string
  layout?: 'flow' | 'fn'
  blocks: Block[]
}
