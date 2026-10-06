// ── Case Triage: assemble a DxApproach from search results + model synthesis ──
// Pure data builder — no React, no network. Takes the deterministic
// searchDiseases() ranking plus the model's grounded synthesis and produces a
// DxApproach object, rendered by the same DxTabBody/DxBlockView the rest of
// the app's diagnostic-approach pages use (src/app/screens/DxApproachView.tsx).
//
// Trust boundary: `caseText` is free-text user input, and the model's own
// output (rationales / history questions / diagnostic labels+notes) is
// untrusted in the same way — it flows into DxBlock `html` fields, which
// render through the audited RichText allowlist boundary. RichText already
// drops any tag outside a small allowlist and strips all attributes but
// style/class/colspan, so there is no script-execution path either way — but
// model text could still *contain* literal `<`/`>` that RichText would try to
// parse as markup it doesn't recognise. `escapeHtml` neutralises that before
// any model-derived string is interpolated into an `html:` field, so model
// output always renders as the text it is, never as structure it chose.
// Disease names/ids come from `db.ts` (authored, trusted) and are never
// escaped — same as every other disease-grid/pattern-list caller in the app.

import type { DxApproach, DxTab, PatternRow } from '../signs/dxTypes'
import type { Tone } from '../signs/flowTypes'
import type { DiseaseResult } from '../search/diseaseSearch'
import type { CaseSynthesis } from '../../../convex/caseAnalysis'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Approximate mapping from the disease-search `category` label (diseaseSearch's
// CAT_ORDER / inferCat vocabulary) to a flow Tone — good enough to colour the
// pattern-list rail; not the canonical CatLabel→colour table (catPalette.ts),
// which keys on the flow taxonomy's slightly different label set.
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

export function buildCaseApproach(
  top: DiseaseResult[],
  synthesis: CaseSynthesis,
): DxApproach {
  const rationaleById = new Map(synthesis.rationales.map(r => [r.diseaseId, r.rationale]))

  const patternRows: PatternRow[] = top.map((t, i) => {
    const id = String(t.disease.id)
    const rationale = rationaleById.get(id)
    return {
      cues: [...t.matchedSignTerms, ...t.matchedDiagTerms].slice(0, 4).map(escapeHtml),
      dx: String(t.disease.name),
      tone: toneFor(t.category),
      note: rationale ? escapeHtml(rationale) : undefined,
      emphasis: i === 0,
    }
  })

  const differentialsTab: DxTab = {
    title: 'Case Triage — Differentials',
    blocks: top.length
      ? [
          { kind: 'goal', text: 'Ranked differentials for this case' },
          { kind: 'patterns', rows: patternRows, caption: 'Ranked most → least likely by the matching engine' },
          {
            kind: 'diseaseGrid',
            title: 'LINKED DISEASE PAGES',
            links: top.map(t => ({ label: String(t.disease.name), link: { to: 'disease' as const, id: String(t.disease.id) } })),
          },
        ]
      : [
          { kind: 'goal', text: 'No matching differentials found' },
          { kind: 'check', html: 'Try adding more clinical detail — species, breed, age, and specific signs all sharpen the match.' },
        ],
  }

  const historyTab: DxTab = {
    title: 'Case Triage — History to take',
    blocks: [
      { kind: 'goal', text: 'Suggested history to clarify the case' },
      synthesis.historyQuestions.length
        ? {
            kind: 'row',
            itemKind: 'check',
            cols: 1,
            items: synthesis.historyQuestions.map(q => ({ html: escapeHtml(q) })),
          }
        : { kind: 'check', html: 'No additional history suggested — the case notes already cover the key discriminators.' },
    ],
  }

  const diagnosticsTab: DxTab = {
    title: 'Case Triage — Diagnostics',
    blocks: [
      { kind: 'goal', text: 'Suggested diagnostics' },
      synthesis.diagnostics.length
        ? {
            kind: 'row',
            itemKind: 'test',
            cols: 1,
            items: synthesis.diagnostics.map(d => ({
              html: `<strong>${escapeHtml(d.label)}</strong> <span style="opacity:.6">(${d.tier})</span>${d.note ? ' — ' + escapeHtml(d.note) : ''}`,
            })),
          }
        : { kind: 'check', html: 'No diagnostics suggested yet.' },
      { kind: 'disclaimer' },
    ],
  }

  return {
    sign: '__case_triage__',
    title: 'Case Triage',
    nav: [
      { key: 'differentials', label: '🧬 Differentials' },
      { key: 'history', label: '📋 History' },
      { key: 'diagnostics', label: '🔬 Diagnostics' },
    ],
    tabs: { differentials: differentialsTab, history: historyTab, diagnostics: diagnosticsTab },
  }
}
