// ── Flowchart data model ────────────────────────────────────────────────────
// Refactor #1: clinical-sign flowcharts are described as data (a FlowPage of
// Blocks) and drawn by the generic renderer in ./renderFlow. See
// DATA_MIGRATION.md for the full plan. Types here are the COMPLETE model; the
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
  | 'orange'
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
  tone: Tone
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
}
export type BranchBlock = Connectable & { kind: 'branch'; columns: Column[] }
export type EndpointsBlock = Connectable & { kind: 'endpoints'; cols?: number; items: Endpoint[] }
export type AlertBlock = Connectable & { kind: 'alert'; tone: Tone; title: string; items: string[] }
export type CalloutBlock = Connectable & { kind: 'callout'; tone: Tone; title?: string; html: string }
export type DiseaseGridBlock = Connectable & { kind: 'diseaseGrid'; title: string; links: LabeledLink[] }
export type DxRowBlock = Connectable & { kind: 'dxRow'; items: LabeledLink[] }

// Typed now for model completeness; renderer support added when first used.
export type TableBlock = Connectable & { kind: 'table'; headers: string[]; rows: string[][]; tone?: Tone }
export type CategoryGridBlock = Connectable & { kind: 'categoryGrid'; columns: { cat: string; items: string[] }[] }
export type SpeciesCompareBlock = Connectable & { kind: 'speciesCompare'; dog: string[]; cat: string[] }
export type HtmlBlock = Connectable & { kind: 'html'; html: string } // escape hatch — last resort

export type Block =
  | NodeBlock
  | BranchBlock
  | EndpointsBlock
  | AlertBlock
  | CalloutBlock
  | DiseaseGridBlock
  | DxRowBlock
  | TableBlock
  | CategoryGridBlock
  | SpeciesCompareBlock
  | HtmlBlock

/** One screen of a flowchart. A sign has an entry page + 0..n sub-flow pages. */
export type FlowPage = {
  id: string
  title: string
  blocks: Block[]
}
