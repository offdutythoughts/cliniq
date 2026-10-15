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
// Abbreviations: the notes are scanned live against a vet-abbreviation
// glossary (src/lib/caseTriage/vetAbbreviations.ts). Every abbreviation found
// is sent with all its senses as a key appended to the notes; any the glossary
// doesn't know — or the model reports it couldn't read — get a note under the
// textarea asking the reader to write the full form, which then joins the key.
//
// The screen unmounts when the reader opens a differential, so the last result
// (and scroll position) is kept in `lastResult` + sessionStorage and restored
// on mount — going back lands on the same flowchart, not an empty form.

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useAction } from 'convex/react'
import { ConvexError } from 'convex/values'
import { api } from '../../../convex/_generated/api'
import type { ProblemList } from '../../../convex/caseAnalysis'
import { searchDiseases, diverseDifferentials, type SearchInputs } from '../../lib/search/diseaseSearch'
import { buildCaseLanes, type LaneChart } from '../../lib/caseTriage/buildLanes'
import {
  abbreviationKey, abbreviationKeyBlock, abbreviationRanges, scanAbbreviations, suggestAbbreviations,
} from '../../lib/caseTriage/vetAbbreviations'
import { useNav } from '../nav/NavContext'
import { CaseLaneChart } from './CaseLaneChart'
import { DISCLAIMER } from './sharedBlocks'
import { type Nav } from './flowHelpers'
import { styleStringToObject as s } from './style'

// Keep in sync with convex/caseAnalysis.ts's own MAX_CANDIDATES (that one caps
// the request/model side; this one decides how many rows the chart actually
// shows — diverseDifferentials() reserves roughly half these slots for the
// strongest-scoring candidates and the rest for breadth across aetiology
// categories (plus near-tie companions within an already-represented
// category), so a higher cap buys breadth and depth, not just a longer
// top-N. 12 (not 10) gives the near-tie mechanism room without starving the
// single-category breadth pass of its own slots.
const MAX_CANDIDATES = 12

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

type SavedResult = {
  caseText: string; flow: LaneChart | null; caseSummary: string; scrollTop: number
  /** Abbreviations the model said it couldn't read on the last run. */
  modelUnknowns?: string[]
  /** The abbreviation key the last run was sent with — differs from the
   *  current one once the reader fills in a full form, which prompts a re-run. */
  lastKey?: string
  /** The problem list the last run's search was weighted by. */
  problemList?: ProblemList | null
}

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

// The reader's own full forms, remembered across cases on this device — a
// clinic's in-house shorthand recurs. Per-viewer convenience only.
const EXPANSIONS_KEY = 'cliniq.caseTriage.abbrev.v1'
function loadExpansions(): Record<string, string> {
  try {
    const raw = localStorage.getItem(EXPANSIONS_KEY)
    if (raw) return JSON.parse(raw) as Record<string, string>
  } catch { /* storage unavailable or corrupt */ }
  return {}
}
function saveExpansions(e: Record<string, string>) {
  try { localStorage.setItem(EXPANSIONS_KEY, JSON.stringify(e)) } catch { /* not remembered, still used this session */ }
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
// The highlight layer sits behind a transparent-backed textarea and mirrors its
// box exactly (padding, 1px border, font, wrapping) so each <mark> lands under
// its word. Its own text is transparent — only the marks show.
const BACKDROP_STYLE = s(
  'position:absolute;top:0;left:0;bottom:0;box-sizing:border-box;overflow:hidden;pointer-events:none;'
  + 'padding:10px 12px;border-radius:10px;border:1px solid transparent;background:var(--navy3);'
  + 'color:transparent;font-size:var(--fs-subhead);line-height:1.5;font-family:inherit;'
  + 'white-space:pre-wrap;overflow-wrap:break-word;',
)
// Amber tint + wavy underline — the same mark is used on the abbreviation in
// the note below, so the two read as one.
const UNKNOWN_MARK_STYLE = s(
  'color:inherit;background:rgba(var(--amber-rgb),var(--panel-bd-a));border-radius:3px;'
  + 'text-decoration:underline wavy var(--amber);text-decoration-skip-ink:none;text-underline-offset:3px;',
)
const SUGGEST_STYLE = s(
  'padding:1px 7px;border-radius:6px;border:1px solid rgba(var(--amber-rgb),var(--panel-bd-a));'
  + 'background:transparent;color:inherit;font-size:var(--fs-body);font-family:inherit;font-weight:700;cursor:pointer;',
)
const BUTTON_STYLE = (disabled: boolean) => s(
  `margin-top:10px;padding:9px 16px;border-radius:9px;border:none;font-size:var(--fs-subhead);font-weight:700;`
  + `cursor:${disabled ? 'default' : 'pointer'};opacity:${disabled ? 0.5 : 1};`
  + `background:var(--teal);color:var(--navy);`,
)
const ABBR_NOTE_STYLE = s(
  'margin-top:10px;padding:10px 12px;border-radius:9px;background:rgba(var(--amber-rgb),var(--panel-bg-a));'
  + 'border:1px solid rgba(var(--amber-rgb),var(--panel-bd-a));color:var(--amber-text);font-size:var(--fs-body);line-height:1.5;',
)
const ABBR_INPUT_STYLE = s(
  'flex:1;min-width:0;padding:5px 8px;border-radius:7px;border:1px solid var(--border);background:var(--navy3);'
  + 'color:var(--white);font-size:var(--fs-body);font-family:inherit;outline:none;',
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
  const [modelUnknowns, setModelUnknowns] = useState<string[]>(saved?.modelUnknowns ?? [])
  const [lastKey, setLastKey] = useState(saved?.lastKey ?? '')
  const [problemList, setProblemList] = useState<ProblemList | null>(saved?.problemList ?? null)
  const [expansions, setExpansions] = useState<Record<string, string>>(loadExpansions)
  const rootRef = useRef<HTMLDivElement>(null)

  // Persist on every change; capture the scroll position on unmount (i.e. when
  // a differential is opened) so back-nav returns to the same spot.
  useEffect(() => {
    save({ caseText, flow, caseSummary, modelUnknowns, lastKey, problemList, scrollTop: lastResult?.scrollTop ?? 0 })
  }, [caseText, flow, caseSummary, modelUnknowns, lastKey, problemList])

  // Glossary scan, plus whatever the model couldn't read last run (while it's
  // still in the notes and the glossary still doesn't know it).
  const scan = useMemo(() => {
    const base = scanAbbreviations(caseText)
    const seen = new Set([...base.known.map(k => abbreviationKey(k.abbr)), ...base.unknown.map(abbreviationKey)])
    const extra = modelUnknowns.filter(a => {
      const k = abbreviationKey(a)
      if (seen.has(k) || !caseText.includes(a)) return false
      seen.add(k)
      return true
    })
    return { known: base.known, unknown: [...base.unknown, ...extra] }
  }, [caseText, modelUnknowns])
  const keyBlock = abbreviationKeyBlock(scan, expansions)
  const keyChanged = flow !== null && keyBlock !== lastKey

  /** A suggested correction: swap every whole-token occurrence in the notes. */
  function replaceAbbreviation(from: string, to: string) {
    setCaseText(prev => {
      let out = prev
      for (const [a, b] of abbreviationRanges(prev, [from]).reverse()) out = out.slice(0, a) + to + out.slice(b)
      return out
    })
  }

  function setExpansion(abbr: string, full: string) {
    setExpansions(prev => {
      const next = { ...prev }
      if (full.trim()) next[abbreviationKey(abbr)] = full
      else delete next[abbreviationKey(abbr)]
      saveExpansions(next)
      return next
    })
  }
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
    if (!caseText.trim() || busy) return
    const text = caseText.trim() + keyBlock
    setLastKey(keyBlock)
    setStage('extracting')
    setError(null)
    setFlow(null)
    setCaseSummary('')
    setProblemList(null)
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
        termTiers: signals.problemList && {
          key: signals.problemList.key,
          secondary: signals.problemList.secondary.map(x => x.term),
          patterns: signals.problemList.patterns.map(p => p.terms),
        },
      }
      const categories = searchDiseases(inputs)
      const top = diverseDifferentials(categories, MAX_CANDIDATES)
      setCaseSummary(signals.caseSummary)
      setModelUnknowns(signals.unknownAbbreviations ?? [])
      setProblemList(signals.problemList ?? null)

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

      <HighlightedTextarea
        placeholder="e.g. 9-year-old male neutered Cavalier King Charles Spaniel, 3-week history of exercise intolerance and a soft cough worse at night, grade III/VI left apical systolic murmur on auscultation…"
        value={caseText}
        onChange={setCaseText}
        disabled={busy}
        marks={scan.unknown}
      />
      <button type="button" style={BUTTON_STYLE(busy || !caseText.trim())} onClick={analyze} disabled={busy || !caseText.trim()}>
        {busy ? STAGE_LABEL[stage] : keyChanged ? 'Re-analyze case' : 'Analyze case'}
      </button>

      {scan.unknown.length > 0 && (
        <div style={ABBR_NOTE_STYLE}>
          <div style={s('font-weight:700;margin-bottom:6px;')}>
            Unrecognised abbreviation{scan.unknown.length > 1 ? 's' : ''} — write the full form so the case is read correctly:
          </div>
          {scan.unknown.map(a => {
            const suggestions = suggestAbbreviations(a)
            return (
              <div key={a} style={s('margin-top:6px;')}>
                <label style={s('display:flex;align-items:center;gap:8px;')}>
                  <code style={s('min-width:56px;font-weight:700;')}><mark style={UNKNOWN_MARK_STYLE}>{a}</mark></code>
                  <input
                    style={ABBR_INPUT_STYLE}
                    placeholder="Full form"
                    value={expansions[abbreviationKey(a)] ?? ''}
                    onChange={e => setExpansion(a, e.target.value)}
                  />
                </label>
                {suggestions.length > 0 && (
                  <div style={s('display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0 0 64px;')}>
                    <span>Typo? Did you mean</span>
                    {suggestions.map(sug => (
                      <button
                        key={sug.abbr}
                        type="button"
                        style={SUGGEST_STYLE}
                        title={sug.senses.join(' / ')}
                        aria-label={`Replace ${a} with ${sug.abbr} (${sug.senses.join(' / ')})`}
                        onClick={() => replaceAbbreviation(a, sug.abbr)}
                        disabled={busy}
                      >
                        {sug.abbr} <span style={s('font-weight:400;')}>({sug.senses[0]})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <div style={s('margin-top:6px;color:var(--gray2);')}>
            Left blank, it&apos;s ignored rather than guessed.{keyChanged ? ' Re-analyze to use your full forms.' : ''}
          </div>
        </div>
      )}

      {scan.known.length > 0 && (
        <details style={s('margin-top:8px;font-size:var(--fs-body);color:var(--gray2);line-height:1.5;')}>
          <summary style={s('cursor:pointer;')}>Abbreviations read as ({scan.known.length})</summary>
          <ul style={s('margin:4px 0 0;padding-left:18px;')}>
            {scan.known.map(k => (
              <li key={k.abbr}><strong style={s('color:var(--gray);')}>{k.abbr}</strong> — {k.senses.join(' / ')}</li>
            ))}
          </ul>
        </details>
      )}

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
          {problemList && <ProblemListPanel list={problemList} />}
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

const PANEL_STYLE = s(
  'margin-bottom:12px;padding:9px 12px;border-radius:9px;background:var(--card);border:1px solid var(--border);'
  + 'color:var(--gray2);font-size:var(--fs-body);line-height:1.5;',
)

/** The case-notes textarea with the unrecognised abbreviations highlighted in
 *  place. A textarea can't style its own text, so a mirror layer behind it
 *  draws the marks; the textarea's background is transparent so they show
 *  through. The mirror tracks the textarea's scroll offset and its content
 *  width (which narrows when a scrollbar appears) so wrapping stays aligned. */
function HighlightedTextarea({ value, onChange, marks, placeholder, disabled }: {
  value: string; onChange: (v: string) => void; marks: string[]; placeholder: string; disabled: boolean
}) {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const ranges = useMemo(() => abbreviationRanges(value, marks), [value, marks])

  const sync = () => {
    const ta = taRef.current, back = backRef.current
    if (!ta || !back) return
    back.style.width = `${ta.clientWidth + ta.clientLeft * 2}px`
    back.scrollTop = ta.scrollTop
  }
  useLayoutEffect(sync)
  useEffect(() => {
    const ta = taRef.current
    if (!ta || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(sync)
    ro.observe(ta)
    return () => ro.disconnect()
  }, [])

  const parts: React.ReactNode[] = []
  let at = 0
  for (const [a, b] of ranges) {
    parts.push(value.slice(at, a), <mark key={a} style={UNKNOWN_MARK_STYLE}>{value.slice(a, b)}</mark>)
    at = b
  }
  // A trailing newline collapses in the mirror unless something follows it.
  parts.push(value.slice(at) + '​')

  return (
    <div style={s('position:relative;')}>
      <div ref={backRef} aria-hidden style={BACKDROP_STYLE}>{parts}</div>
      <textarea
        ref={taRef}
        style={{ ...TEXTAREA_STYLE, position: 'relative', display: 'block', background: 'transparent' }}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onScroll={sync}
        disabled={disabled}
      />
    </div>
  )
}

/** What the search was weighted by — shown so the reader can see (and
 *  disagree with) which findings were read as the problems and which as
 *  consequences of them. Supporting findings aren't listed: they are simply
 *  everything else that was extracted. */
function ProblemListPanel({ list }: { list: ProblemList }) {
  if (list.key.length + list.patterns.length + list.secondary.length === 0) return null
  const label = (t: string) => <span style={s('font-weight:700;color:var(--gray);')}>{t}: </span>
  return (
    <div style={PANEL_STYLE}>
      {list.key.length > 0 && <div>{label('Key problems')}{list.key.join(' · ')}</div>}
      {list.patterns.length > 0 && (
        <div>{label('Patterns')}{list.patterns.map(p => `${p.name} (${p.terms.join(' + ')})`).join(' · ')}</div>
      )}
      {list.secondary.length > 0 && (
        <div>
          {label('Likely secondary, weighted down')}
          {list.secondary.map(x => (x.explainedBy ? `${x.term} (← ${x.explainedBy})` : x.term)).join(' · ')}
        </div>
      )}
    </div>
  )
}
