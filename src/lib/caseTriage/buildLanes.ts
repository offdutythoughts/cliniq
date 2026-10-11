// ── Case Triage: assemble a swimlane workup chart ───────────────────────────
// Pure data builder — no React, no network. Modelled on the published
// "diagnostic approach" swimlane figures (e.g. the PU/PD algorithm): stages
// run left → right as lanes, and each differential is one row whose findings
// sit in the lane where they turn up and arrow across into the diagnosis:
//
//   History │ Physical exam │ Minimum database │ Confirmatory test │ Differential
//
// A lane cell holds only the finding that points to THAT differential and away
// from the others — a sign every candidate shares separates nothing, so it
// never appears. Rows are grouped by aetiology category (most-likely category
// first, same order the engine ranked them). Identical findings in adjacent
// rows of one lane merge into a single box spanning those rows, so a shared
// clue (fever → every infectious cause) reads as one fork, not repeated text.
//
// All text renders as plain React text — model output never reaches an HTML
// sink here, so nothing needs escaping. Disease names/ids come from `db.ts`.

import type { Tone } from '../signs/flowTypes'
import type { DiseaseResult } from '../search/diseaseSearch'
import type { CaseSynthesis, LaneRow } from '../../../convex/caseAnalysis'

// Approximate mapping from the disease-search `category` label (diseaseSearch's
// CAT_ORDER / inferCat vocabulary) to a flow Tone — good enough to colour each
// diagnosis box; not the canonical CatLabel→colour table (catPalette.ts), which
// keys on the flow taxonomy's slightly different label set.
const CATEGORY_TONE: Record<string, Tone> = {
  Vascular: 'danger',
  Trauma: 'danger',
  Inflammatory: 'orange',
  Infectious: 'warning',
  Neoplastic: 'purple',
  'Immune-mediated': 'violet',
  Degenerative: 'slate',
  Metabolic: 'teal',
  Endocrine: 'teal',
  'Metabolic / Endocrine': 'teal',
  Neurological: 'indigo',
  Neuromuscular: 'indigo',
  Toxic: 'pink',
  'Drug-induced': 'pink',
  Structural: 'info',
  'Congenital/Inherited': 'cyan',
  Anomalous: 'cyan',
  Other: 'neutral',
}
const toneFor = (cat: string): Tone => CATEGORY_TONE[cat] ?? 'neutral'

export const LANES = [
  { key: 'history', label: 'History' },
  { key: 'exam', label: 'Physical exam' },
  { key: 'minDb', label: 'Minimum database' },
  { key: 'confirm', label: 'Confirmatory test' },
] as const
export type LaneKey = (typeof LANES)[number]['key']

/** A finding box: `row` is the first differential row it covers, `span` how many. */
export type LaneCell = { text: string; row: number; span: number }

export type LaneChart = {
  rows: { id: string; name: string; category: string; tone: Tone }[]
  /** Per lane, its boxes in row order. Rows with no finding have no box. */
  cells: Record<LaneKey, LaneCell[]>
  /** Per row, the first lane (0-based) that holds a finding for it — where its
   *  arrow starts. null ⇒ no lane separates it; the diagnosis stands alone. */
  arrowFrom: (number | null)[]
}

const norm = (s: string) => s.trim().toLowerCase().replace(/[?.\s]+$/, '')

export function buildCaseLanes(top: DiseaseResult[], synthesis: CaseSynthesis): LaneChart {
  // Category groups, each in order of its best-ranked member.
  const order: string[] = []
  const byCategory = new Map<string, DiseaseResult[]>()
  for (const t of top) {
    if (!byCategory.has(t.category)) { byCategory.set(t.category, []); order.push(t.category) }
    byCategory.get(t.category)!.push(t)
  }
  const ranked = order.flatMap(c => byCategory.get(c)!)

  // A backend deployed before `lanes` existed still sends confirmatory
  // diagnostics tagged by diseaseId — enough to fill the last lane.
  const laneById = new Map<string, LaneRow>((synthesis.lanes ?? []).map(l => [l.diseaseId, l]))
  const legacyConfirm = (id: string) =>
    synthesis.diagnostics.filter(d => d.tier === 'confirmatory' && d.diseaseIds.includes(id)).map(d => d.label)[0] ?? ''

  const rows = ranked.map(t => ({
    id: String(t.disease.id),
    name: String(t.disease.name),
    category: t.category,
    tone: toneFor(t.category),
  }))
  const text = (rowIdx: number, lane: LaneKey): string => {
    const id = rows[rowIdx].id
    const l = laneById.get(id)
    if (l) return l[lane].trim()
    return lane === 'confirm' ? legacyConfirm(id) : ''
  }

  const cells = {} as Record<LaneKey, LaneCell[]>
  for (const { key } of LANES) {
    const out: LaneCell[] = []
    for (let r = 0; r < rows.length; r++) {
      const t = text(r, key)
      if (!t) continue
      const prev = out[out.length - 1]
      // Merge only within a category group: a box straddling two categories
      // would blur the grouping the rows exist to show.
      if (prev && prev.row + prev.span === r && norm(prev.text) === norm(t)
        && rows[prev.row].category === rows[r].category) prev.span++
      else out.push({ text: t, row: r, span: 1 })
    }
    cells[key] = out
  }

  const arrowFrom = rows.map((_, r) => {
    const i = LANES.findIndex(({ key }) => cells[key].some(c => r >= c.row && r < c.row + c.span))
    return i === -1 ? null : i
  })

  return { rows, cells, arrowFrom }
}
