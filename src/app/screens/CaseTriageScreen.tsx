'use client'
// ── Case Triage: free-text case notes → ranked differentials + history/dx ────
// The NLP counterpart to Mix & Match (which takes the same signalment + sign/
// diagnostic keywords as structured chips). Here the reader pastes a case in
// plain English; the pipeline is:
//
//   1. extractSignals (Convex action, Gemini) — case text → the SearchInputs
//      shape Mix & Match's engine already takes.
//   2. searchDiseases (same deterministic engine, run locally) — ranks real
//      disease_page rows. The model never ranks differentials itself.
//   3. synthesizeCase (Convex action, Gemini) — case text + the top-ranked
//      rows' own authored fields → a rationale per match, discriminating
//      history questions, and a prioritized diagnostics list. Grounded in the
//      rows given, not invented.
//   4. buildCaseApproach assembles a DxApproach from the result, rendered by
//      the same DxTabBody every sign's diagnostic-approach page uses.

import { useState } from 'react'
import { useAction } from 'convex/react'
import { ConvexError } from 'convex/values'
import { api } from '../../../convex/_generated/api'
import { searchDiseases, topDifferentials, type SearchInputs } from '../../lib/search/diseaseSearch'
import { buildCaseApproach } from '../../lib/caseTriage/buildApproach'
import type { DxApproach, DxNavItem } from '../../lib/signs/dxTypes'
import { useNav } from '../nav/NavContext'
import { DxTabBody } from './DxApproachView'
import { type Nav } from './flowHelpers'
import { styleStringToObject as s } from './style'

const MAX_CANDIDATES = 8

type Stage = 'idle' | 'extracting' | 'synthesizing' | 'done' | 'error'

const STAGE_LABEL: Record<Stage, string> = {
  idle: '',
  extracting: 'Reading the case…',
  synthesizing: 'Matching and ranking differentials…',
  done: '',
  error: '',
}

/** Non-dev Convex deployments redact a thrown error's `.message` down to a
 *  generic "Server Error" — ConvexError's `.data` is the one thing that still
 *  reaches the client on every deployment type, so it's what the two actions'
 *  `throw new ConvexError('...')` calls actually need to be read through. */
function caseTriageErrorMessage(e: unknown): string {
  if (e instanceof ConvexError) {
    return typeof e.data === 'string' ? e.data : JSON.stringify(e.data)
  }
  if (e instanceof Error) return e.message
  return 'Something went wrong analyzing this case.'
}

const TEXTAREA_STYLE = s(
  'width:100%;box-sizing:border-box;min-height:140px;resize:vertical;padding:10px 12px;'
  + 'border-radius:10px;border:1px solid var(--border);background:var(--navy3);'
  + 'color:var(--white);font-size:13px;line-height:1.5;font-family:inherit;outline:none;',
)
const BUTTON_STYLE = (disabled: boolean) => s(
  `margin-top:10px;padding:9px 16px;border-radius:9px;border:none;font-size:12px;font-weight:700;`
  + `cursor:${disabled ? 'default' : 'pointer'};opacity:${disabled ? 0.5 : 1};`
  + `background:var(--teal);color:var(--navy);`,
)

function LocalTabs({ nav, active, onPick }: { nav: DxNavItem[]; active: string; onPick: (k: string) => void }) {
  return (
    <div className="dx-tabs">
      {nav.map(t => (
        <button
          key={t.key}
          type="button"
          className="dx-tab"
          aria-current={t.key === active ? 'page' : undefined}
          onClick={() => onPick(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function CaseTriageScreen() {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const extractSignals = useAction(api.caseAnalysis.extractSignals)
  const synthesizeCase = useAction(api.caseAnalysis.synthesizeCase)

  const [caseText, setCaseText] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState<string | null>(null)
  const [approach, setApproach] = useState<DxApproach | null>(null)
  const [caseSummary, setCaseSummary] = useState('')
  const [activeTab, setActiveTab] = useState('differentials')

  const busy = stage === 'extracting' || stage === 'synthesizing'

  async function analyze() {
    const text = caseText.trim()
    if (!text || busy) return
    setStage('extracting')
    setError(null)
    setApproach(null)
    try {
      const signals = await extractSignals({ caseText: text })
      const inputs: SearchInputs = {
        species: signals.species,
        breedQuery: signals.breedQuery,
        ageCategory: signals.ageCategory,
        sex: signals.sex,
        neuter: signals.neuter,
        signKeywords: signals.signKeywords,
        diagKeywords: signals.diagKeywords,
      }
      const categories = searchDiseases(inputs)
      const top = topDifferentials(categories, MAX_CANDIDATES)
      setCaseSummary(signals.caseSummary)

      if (top.length === 0) {
        setApproach(buildCaseApproach([], { rationales: [], historyQuestions: [], diagnostics: [] }))
        setActiveTab('differentials')
        setStage('done')
        return
      }

      setStage('synthesizing')
      const candidates = top.map(t => ({
        diseaseId: String(t.disease.id),
        name: String(t.disease.name),
        category: t.category,
        signs: String(t.disease.signs ?? ''),
        conf: String(t.disease.conf ?? ''),
        supp: String(t.disease.supp ?? ''),
        matchedTerms: [...t.matchedSignTerms, ...t.matchedDiagTerms],
        score: t.score,
      }))
      const synthesis = await synthesizeCase({ caseText: text, candidates })
      setApproach(buildCaseApproach(top, synthesis))
      setActiveTab('differentials')
      setStage('done')
    } catch (e) {
      setError(caseTriageErrorMessage(e))
      setStage('error')
    }
  }

  return (
    <div style={s('padding-bottom:24px;')}>
      <header style={s('margin-bottom:14px;')}>
        <h1 style={s('font-size:18px;font-weight:700;color:var(--white);margin:0 0 4px;')}>Case Triage</h1>
        <p style={s('font-size:12px;color:var(--gray2);line-height:1.5;margin:0;')}>
          Describe the patient and presentation in your own words. The same differential-matching engine as Mix &amp; Match ranks real disease pages against it, then the model explains the ranking and suggests history and diagnostics.
        </p>
      </header>

      <textarea
        style={TEXTAREA_STYLE}
        placeholder="e.g. 9-year-old male neutered Cavalier King Charles Spaniel, 3-week history of exercise intolerance and a soft cough worse at night, grade III/VI left apical systolic murmur on auscultation…"
        value={caseText}
        onChange={e => setCaseText(e.target.value)}
        disabled={busy}
      />
      <button type="button" style={BUTTON_STYLE(busy || !caseText.trim())} onClick={analyze} disabled={busy || !caseText.trim()}>
        {busy ? STAGE_LABEL[stage] : 'Analyze case'}
      </button>

      {error && (
        <div style={s('margin-top:12px;padding:10px 12px;border-radius:9px;background:rgba(var(--tone-danger),0.12);border:1px solid rgba(var(--tone-danger),0.4);color:var(--tone-danger-fg);font-size:12px;line-height:1.5;')}>
          {error}
        </div>
      )}

      {approach && (
        <div style={s('margin-top:18px;')}>
          {caseSummary && (
            <div style={s('margin-bottom:12px;padding:9px 12px;border-radius:9px;background:var(--card);border:1px solid var(--border);color:var(--gray2);font-size:11.5px;line-height:1.5;')}>
              <span style={s('font-weight:700;color:var(--gray);')}>Parsed as: </span>{caseSummary}
            </div>
          )}
          <LocalTabs nav={approach.nav ?? []} active={activeTab} onPick={setActiveTab} />
          <DxTabBody tab={approach.tabs[activeTab] ?? approach.tabs.differentials} onNav={onNav} />
        </div>
      )}
    </div>
  )
}
