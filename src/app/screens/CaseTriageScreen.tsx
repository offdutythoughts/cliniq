'use client'
// ── Case Triage: free-text case notes → ranked-differential flowchart ───────
// The NLP counterpart to Mix & Match (which takes the same signalment + sign/
// diagnostic keywords as structured chips). Here the reader pastes a case in
// plain English; the pipeline is:
//
//   1. extractSignals (Convex action, Groq) — case text → the SearchInputs
//      shape Mix & Match's engine already takes.
//   2. searchDiseases (same deterministic engine, run locally) — ranks real
//      disease_page rows. The model never ranks differentials itself.
//   3. synthesizeCase (Convex action, Groq) — case text + the top-ranked
//      rows' own authored fields → a rationale per match, discriminating
//      history questions, and a diagnostics list grounded in and tagged back
//      to those rows.
//   4. buildCaseLanes lays the result out as a swimlane workup chart —
//      History → Physical exam → Minimum database → Confirmatory test →
//      Differential, one row per differential grouped by category, each lane
//      holding only the finding that separates it — rendered by CaseLaneChart.
//
// The screen unmounts when the reader opens a differential, so the last result
// (and scroll position) is kept in `lastResult` + sessionStorage and restored
// on mount — going back lands on the same flowchart, not an empty form.

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAction } from 'convex/react'
import { ConvexError } from 'convex/values'
import { api } from '../../../convex/_generated/api'
import { searchDiseases, topDifferentials, type SearchInputs } from '../../lib/search/diseaseSearch'
import { buildCaseLanes, type LaneChart } from '../../lib/caseTriage/buildLanes'
import { useNav } from '../nav/NavContext'
import { CaseLaneChart } from './CaseLaneChart'
import { DISCLAIMER } from './sharedBlocks'
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

type SavedResult = { caseText: string; flow: LaneChart | null; caseSummary: string; scrollTop: number }

// Bump the suffix whenever LaneChart's shape changes, so a stale saved result
// is dropped instead of rendered against the new component.
const STORAGE_KEY = 'cliniq.caseTriage.lanes.v1'
// In-memory copy first: sessionStorage can throw or be empty (private mode,
// blocked storage), and in-app back navigation never needs to touch it.
let lastResult: SavedResult | null = null

function loadSaved(): SavedResult | null {
  if (lastResult) return lastResult
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) lastResult = JSON.parse(raw) as SavedResult
  } catch { /* storage unavailable or corrupt — start empty */ }
  return lastResult
}

function save(r: SavedResult) {
  lastResult = r
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(r)) } catch { /* in-memory copy still serves back-nav */ }
}

const TEXTAREA_STYLE = s(
  'width:100%;box-sizing:border-box;min-height:140px;resize:vertical;padding:10px 12px;'
  + 'border-radius:10px;border:1px solid var(--border);background:var(--navy3);'
  + 'color:var(--white);font-size:var(--fs-subhead);line-height:1.5;font-family:inherit;outline:none;',
)
const BUTTON_STYLE = (disabled: boolean) => s(
  `margin-top:10px;padding:9px 16px;border-radius:9px;border:none;font-size:var(--fs-subhead);font-weight:700;`
  + `cursor:${disabled ? 'default' : 'pointer'};opacity:${disabled ? 0.5 : 1};`
  + `background:var(--teal);color:var(--navy);`,
)

export function CaseTriageScreen() {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const extractSignals = useAction(api.caseAnalysis.extractSignals)
  const synthesizeCase = useAction(api.caseAnalysis.synthesizeCase)

  const [saved] = useState(loadSaved)
  const [caseText, setCaseText] = useState(saved?.caseText ?? '')
  const [stage, setStage] = useState<Stage>(saved?.flow ? 'done' : 'idle')
  const [error, setError] = useState<string | null>(null)
  const [flow, setFlow] = useState<LaneChart | null>(saved?.flow ?? null)
  const [caseSummary, setCaseSummary] = useState(saved?.caseSummary ?? '')
  const rootRef = useRef<HTMLDivElement>(null)

  // Persist on every change; capture the scroll position on unmount (i.e. when
  // a differential is opened) so back-nav returns to the same spot.
  useEffect(() => {
    save({ caseText, flow, caseSummary, scrollTop: lastResult?.scrollTop ?? 0 })
  }, [caseText, flow, caseSummary])
  // Restore in a plain effect: it runs after AppShell's layout-effect reset to
  // the top. Capture in a LAYOUT cleanup: on navigation that runs before the
  // reset, so it still sees where the reader was.
  useEffect(() => {
    const scroller = rootRef.current?.closest('.screen')
    if (scroller && saved?.flow && saved.scrollTop) scroller.scrollTop = saved.scrollTop
  }, [saved])
  useLayoutEffect(() => {
    const scroller = rootRef.current?.closest('.screen')
    return () => { if (lastResult) save({ ...lastResult, scrollTop: scroller?.scrollTop ?? 0 }) }
  }, [])

  const busy = stage === 'extracting' || stage === 'synthesizing'

  async function analyze() {
    const text = caseText.trim()
    if (!text || busy) return
    setStage('extracting')
    setError(null)
    setFlow(null)
    setCaseSummary('')
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
        setFlow(buildCaseLanes([], { rationales: [], historyQuestions: [], diagnostics: [] }))
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
      setFlow(buildCaseLanes(top, synthesis))
      setStage('done')
    } catch (e) {
      setError(caseTriageErrorMessage(e))
      setStage('error')
    }
  }

  return (
    <div ref={rootRef} style={s('padding-bottom:24px;')}>
      <header style={s('margin-bottom:14px;')}>
        <h1 style={s('font-size:var(--fs-title);font-weight:700;color:var(--white);margin:0 0 4px;')}>Case Triage</h1>
        <p style={s('font-size:var(--fs-subhead);color:var(--gray2);line-height:1.5;margin:0;')}>
          Describe the patient and presentation in your own words. The same differential-matching engine as Mix &amp; Match ranks real disease pages against it, then lays out a workup chart: the history, exam, minimum-database and confirmatory findings that separate each differential.
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
        <div style={s('margin-top:12px;padding:10px 12px;border-radius:9px;background:rgba(var(--tone-danger),0.12);border:1px solid rgba(var(--tone-danger),0.4);color:var(--tone-danger-fg);font-size:var(--fs-subhead);line-height:1.5;')}>
          {error}
        </div>
      )}

      {flow && (
        <div style={s('margin-top:18px;')}>
          {caseSummary && (
            <div style={s('margin-bottom:12px;padding:9px 12px;border-radius:9px;background:var(--card);border:1px solid var(--border);color:var(--gray2);font-size:var(--fs-body);line-height:1.5;')}>
              <span style={s('font-weight:700;color:var(--gray);')}>Parsed as: </span>{caseSummary}
            </div>
          )}
          {flow.rows.length === 0 ? (
            <div style={s('padding:10px 12px;border-radius:9px;background:rgba(var(--tone-info),0.12);border:1px solid rgba(var(--tone-info),0.4);color:var(--tone-info-fg);font-size:var(--fs-subhead);line-height:1.5;')}>
              <strong>No matching differentials found.</strong> Try adding more clinical detail — species, breed, age, and specific signs all sharpen the match.
            </div>
          ) : (
            <>
              <CaseLaneChart chart={flow} onNav={onNav} />
              {DISCLAIMER}
            </>
          )}
        </div>
      )}
    </div>
  )
}
