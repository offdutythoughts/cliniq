// ── Diagnostic-approach data model ──────────────────────────────────────────
// The "Diagnostic approach" views (History / Exam / Diagnostics tabs reachable
// from a sign's flowchart, or the Diagnostic tab) are described as data here and
// drawn by the generic renderer in ./renderDx — the Dx counterpart to the
// flowchart FlowPage / renderFlow system. See DATA_MIGRATION.md.
//
// Each sign is a DxApproach with three tabs (history / exam / dx); a tab is a
// vertical spine of DxBlocks inside `.dx-wrap` (uniform `.dx-arrow` connectors),
// plus optional trailing boxes rendered OUTSIDE the wrap (`after`).

import type { Tone, LabeledLink } from './flowTypes'

/** One `.dx-test` card inside a `row`. `style` is a raw inline-style string
 *  appended verbatim (the legacy cards carry bespoke align/size/accent styles);
 *  `html` is the card body (may contain <strong>/<br>/nested markup). */
export type DxCard = { html: string; style?: string }

export type DxBlock =
  /** `.dx-branch` — a goal / decision header box. */
  | { kind: 'branch'; text: string }
  /** `.dx-step` step header. `alt` selects the alternating colour; `tone` paints
   *  a coloured intro step (e.g. teal "complete PE", red "STABILISE FIRST"). */
  | { kind: 'step'; text: string; alt?: boolean; tone?: Tone }
  /** `.dx-check` — an explanation box (html body). */
  | { kind: 'check'; html: string }
  /** `.dx-row c{cols}` — a row of `.dx-test` cards. */
  | { kind: 'row'; cols?: number; items: DxCard[] }
  /** `.dx-alert` — a tinted pearls / warning box (html body). */
  | { kind: 'alert'; html: string; gap?: number }
  /** A tinted titled callout box (e.g. "⚠️ RED FLAGS IN THE HISTORY"). */
  | { kind: 'callout'; tone: Tone; title: string; html: string; gap?: number }
  /** The teal "LINKED DISEASE PAGES" grid (2-col labelled links). */
  | { kind: 'diseaseGrid'; title: string; links: LabeledLink[] }
  /** `.dx-note` — a small inline note box (html body + optional raw style). */
  | { kind: 'note'; html: string; style?: string }
  /** Escape hatch for genuinely bespoke markup (e.g. the seizures tier tree). */
  | { kind: 'html'; html: string }
  /** The "For qualified veterinary professionals only." footer. */
  | { kind: 'disclaimer' }

/** One tab of a sign's diagnostic approach. `blocks` render inside `.dx-wrap`
 *  (arrow-connected spine); `after` render after it, un-connected. */
export type DxTab = {
  /** Topbar title set when this tab is shown (e.g. "History: Epistaxis"). */
  title: string
  blocks: DxBlock[]
  after?: DxBlock[]
}

/** One tab button in the nav strip. */
export type DxNavItem = { key: string; label: string }

/** A sign's full diagnostic approach: a display title, the tab buttons, and the
 *  tab content keyed by nav key. Most signs use the standard 3 tabs (History /
 *  Exam / Diagnostics) — omit `nav` to get them. Signs that differ declare their
 *  own `nav` (e.g. vomiting = History + Exam only; diarrhoea adds 'sec'). `tabs`
 *  may also hold extra sub-views reached from within a tab (e.g. pupd
 *  'desmopressin') that aren't in the nav strip. */
export type DxApproach = {
  /** Sign display name used in the tab titles (e.g. "Epistaxis"). */
  title: string
  /** Tab buttons in order. Omit for the standard 3 (history / exam / dx). */
  nav?: DxNavItem[]
  /** Tab content keyed by nav key ('history' | 'exam' | 'dx' | extras). */
  tabs: Record<string, DxTab>
}

export type DxTabKey = 'history' | 'exam' | 'dx'
