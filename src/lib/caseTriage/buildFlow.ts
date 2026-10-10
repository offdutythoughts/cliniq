// ── Case Triage: assemble a flowchart from search results + model synthesis ──
// Pure data builder — no React, no network. Produces a `Block[]` rendered by
// the exact same spine/connector engine every authored sign flow uses
// (FlowPageView's exported `BlockList`), so a generated case reads as one
// more flowchart in this app, not a bespoke widget:
//
//   entry (case summary)
//     → suggested history, each question as a step + a YES/NO fork
//     → one branch arm per aetiology category present in the ranked
//       differentials (most-likely category first), each arm holding its
//       differentials as linked endpoint tiles (rationale in the sublabel)
//       followed by that category's own suggested-diagnostics panel
//     → disclaimer
//
// Trust boundary: `caseText` is free-text user input, and the model's own
// output (rationales / history questions / diagnostic labels) is untrusted in
// the same way — it flows into Block `html`/label fields that render through
// the audited RichText allowlist boundary (see sharedBlocks/flowHelpers). That
// boundary already drops any tag outside a small allowlist and strips every
// attribute but style/class/colspan, so there is no script-execution path —
// but model text could still contain literal `<`/`>` RichText would try to
// parse as markup it doesn't recognise. `escapeHtml` neutralises that before
// any model-derived string reaches such a field, so model output always
// renders as the text it is. Disease names/ids come from `db.ts` (authored,
// trusted) and are never escaped — same as every other caller of these blocks.

import type { Block, Tone } from '../signs/flowTypes'
import type { DiseaseResult } from '../search/diseaseSearch'
import type { CaseSynthesis } from '../../../convex/caseAnalysis'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Approximate mapping from the disease-search `category` label (diseaseSearch's
// CAT_ORDER / inferCat vocabulary) to a flow Tone — good enough to colour each
// branch arm; not the canonical CatLabel→colour table (catPalette.ts), which
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

type DiagnosticItem = CaseSynthesis['diagnostics'][number]

function diagnosticsHtml(items: DiagnosticItem[]): string {
  return items
    .map(d => `<div>${d.tier === 'confirmatory' ? '🔬' : '🧪'} <strong>${escapeHtml(d.label)}</strong></div>`)
    .join('')
}

export function buildCaseFlow(top: DiseaseResult[], synthesis: CaseSynthesis): Block[] {
  const rationaleById = new Map(synthesis.rationales.map(r => [r.diseaseId, r.rationale]))

  const historyBlocks: Block[] = synthesis.historyQuestions.flatMap((q): Block[] => [
    { kind: 'node', variant: 'sub-step', text: escapeHtml(q) },
    { kind: 'fork', legs: [{ label: 'YES' }, { label: 'NO' }] },
  ])

  if (top.length === 0) {
    return [
      { kind: 'node', variant: 'entry', text: 'Case Triage' },
      {
        kind: 'callout',
        tone: 'info',
        title: 'No matching differentials found',
        html: 'Try adding more clinical detail — species, breed, age, and specific signs all sharpen the match.',
      },
    ]
  }

  // Group differentials by category, in order of each category's best rank —
  // the branch reads most-likely-category-first, same principle as the ranked
  // list it replaces.
  const order: string[] = []
  const byCategory = new Map<string, DiseaseResult[]>()
  for (const t of top) {
    if (!byCategory.has(t.category)) { byCategory.set(t.category, []); order.push(t.category) }
    byCategory.get(t.category)!.push(t)
  }

  const categoryColumns = order.map(cat => {
    const diffs = byCategory.get(cat)!
    const tone = toneFor(cat)
    const idsInCat = new Set(diffs.map(d => String(d.disease.id)))
    const diagnostics = synthesis.diagnostics.filter(d => d.diseaseIds.some(id => idsInCat.has(id)))

    const blocks: Block[] = [
      {
        kind: 'endpoints',
        cols: 1,
        items: diffs.map(d => {
          const rationale = rationaleById.get(String(d.disease.id))
          return {
            label: String(d.disease.name),
            sublabel: rationale ? escapeHtml(rationale) : undefined,
            tone,
            link: { to: 'disease' as const, id: String(d.disease.id) },
          }
        }),
      },
    ]
    if (diagnostics.length > 0) {
      blocks.push({ kind: 'infoBox', tone, icon: '🔬', title: 'Suggested diagnostics', html: diagnosticsHtml(diagnostics) })
    }

    return { header: cat, tone, blocks }
  })

  return [
    { kind: 'node', variant: 'entry', text: 'Case Triage' },
    ...(historyBlocks.length > 0
      ? [{ kind: 'node', variant: 'step', text: 'Suggested history to clarify the case' } as Block, ...historyBlocks]
      : []),
    { kind: 'node', variant: 'step', text: 'Narrow by likely category' },
    { kind: 'branch', columns: categoryColumns },
    { kind: 'disclaimer' },
  ]
}
