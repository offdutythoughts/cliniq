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
//      Differential, one row per differential in rank order, each lane
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
import type { ExtractedSignals } from '../../../convex/caseAnalysis'
// The pure module, not caseAnalysis.ts: a value import from an action file
// pulls Convex functions into the browser bundle.
import { INTERPRETATION_HEADING, type ProblemList } from '../../../convex/problemList'
import type { LabReading } from '../../../convex/labValues'
import { rankCase } from '../../lib/caseTriage/rankCase'
import { buildCaseLanes, type LaneChart } from '../../lib/caseTriage/buildLanes'
import { signLinks } from '../../lib/caseTriage/signLinks'
import { moveTerm, NEXT_TIER, removePattern, sameList, tierOf, type Tier } from '../../lib/caseTriage/problemListEdit'
import {
  abbreviationKey, abbreviationKeyBlock, abbreviationRanges, scanAbbreviations, suggestAbbreviations,
} from '../../lib/caseTriage/vetAbbreviations'
import { useNav } from '../nav/NavContext'
import { CaseLaneChart } from './CaseLaneChart'
import { DISCLAIMER } from './sharedBlocks'
import { type Nav } from './flowHelpers'
import { styleStringToObject as s } from './style'

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
  /** The presenting problems that are clinical signs — each gets a link to
   *  its sign flowchart where one exists. */
  signProblems?: string[]
  /** The optional "Blood interpretation" box, and the one the last run used. */
  interp?: string
  lastInterp?: string
  /** What the last extraction returned — kept so an edited problem list can
   *  be re-ranked without reading the notes again. */
  signals?: ExtractedSignals | null
  /** The problem list as the model and the rules first sorted it, before any
   *  edit by the reader. */
  modelProblemList?: ProblemList | null
}

// Bump the suffix whenever LaneChart's shape changes, so a stale saved result
// is dropped instead of rendered against the new component. v2: rows ranked,
// not grouped by category — a v1 chart restored on mount still showed
// diabetes above hypoparathyroidism after the ranking had been fixed.
const STORAGE_KEY = 'cliniq.caseTriage.lanes.v2'
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
  const [signProblems, setSignProblems] = useState<string[]>(saved?.signProblems ?? [])
  const [interp, setInterp] = useState(saved?.interp ?? '')
  const [lastInterp, setLastInterp] = useState(saved?.lastInterp ?? '')
  const [signals, setSignals] = useState<ExtractedSignals | null>(saved?.signals ?? null)
  const [modelProblemList, setModelProblemList] = useState<ProblemList | null>(saved?.modelProblemList ?? null)
  /** The list the chart on screen was ranked by — differs from `problemList`
   *  once the reader edits it, which offers a re-rank. */
  const [rankedList, setRankedList] = useState<ProblemList | null>(saved?.problemList ?? null)
  const [expansions, setExpansions] = useState<Record<string, string>>(loadExpansions)
  const rootRef = useRef<HTMLDivElement>(null)

  // Persist on every change; capture the scroll position on unmount (i.e. when
  // a differential is opened) so back-nav returns to the same spot.
  useEffect(() => {
    save({
      caseText, flow, caseSummary, modelUnknowns, lastKey, problemList: rankedList, signProblems,
      interp, lastInterp, signals, modelProblemList, scrollTop: lastResult?.scrollTop ?? 0,
    })
  }, [caseText, flow, caseSummary, modelUnknowns, lastKey, rankedList, signProblems, interp, lastInterp, signals, modelProblemList])

  // Glossary scan, plus whatever the model couldn't read last run (while it's
  // still in the notes and the glossary still doesn't know it).
  const scan = useMemo(() => {
    const base = scanAbbreviations(caseText + '\n' + interp)
    const seen = new Set([...base.known.map(k => abbreviationKey(k.abbr)), ...base.unknown.map(abbreviationKey)])
    const extra = modelUnknowns.filter(a => {
      const k = abbreviationKey(a)
      if (seen.has(k) || !(caseText.includes(a) || interp.includes(a))) return false
      seen.add(k)
      return true
    })
    return { known: base.known, unknown: [...base.unknown, ...extra] }
  }, [caseText, interp, modelUnknowns])
  const keyBlock = abbreviationKeyBlock(scan, expansions)
  const keyChanged = flow !== null && (keyBlock !== lastKey || interp.trim() !== lastInterp)
  const listEdited = flow !== null && problemList !== null && !sameList(problemList, rankedList)

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

  /** The notes as the model reads them: the case, the reader's
   *  interpretation of the bloods as a labelled section, then the
   *  abbreviation key. */
  const fullText = () =>
    caseText.trim() + (interp.trim() ? `\n\n${INTERPRETATION_HEADING}\n${interp.trim()}` : '') + keyBlock

  async function analyze() {
    if (!caseText.trim() || busy) return
    setLastKey(keyBlock)
    setLastInterp(interp.trim())
    setStage('extracting')
    setError(null)
    setFlow(null)
    setCaseSummary('')
    setProblemList(null)
    setRankedList(null)
    setModelProblemList(null)
    setSignals(null)
    setSignProblems([])
    try {
      const extracted = await extractSignals({ caseText: fullText() })
      setSignals(extracted)
      setCaseSummary(extracted.caseSummary)
      setModelUnknowns(extracted.unknownAbbreviations ?? [])
      setModelProblemList(extracted.problemList ?? null)
      await rank(extracted, extracted.problemList ?? null)
    } catch (e) {
      setError(caseTriageErrorMessage(e))
      setStage('error')
    }
  }

  /** Search + synthesis for one problem list. Re-ranking an edited list runs
   *  only this: the notes are not read again, so the reader's edit is the only
   *  thing that changes. */
  async function rank(extracted: ExtractedSignals, list: ProblemList | null) {
    setProblemList(list)
    const top = rankCase(extracted, list)
    // The key problems that are signs (lab findings have no flowchart);
    // every sign when there are no key problems.
    const signs = new Set(extracted.signKeywords)
    const keySigns = (list?.key ?? []).filter(t => signs.has(t))
    setSignProblems(keySigns.length > 0 ? keySigns : extracted.signKeywords)

    if (top.length === 0) {
      setFlow(buildCaseLanes([], { rationales: [], historyQuestions: [], diagnostics: [] }))
      setRankedList(list)
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
    const synthesis = await synthesizeCase({ caseText: fullText(), candidates })
    setFlow(buildCaseLanes(top, synthesis))
    setRankedList(list)
    setStage('done')
  }

  async function rerank() {
    if (!signals || !problemList || busy) return
    setError(null)
    setStage('synthesizing')
    try {
      await rank(signals, problemList)
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
      <label style={s('display:block;margin-top:10px;')}>
        <span style={s('display:block;font-size:var(--fs-body);font-weight:700;color:var(--gray);margin-bottom:4px;')}>
          Blood interpretation <span style={s('font-weight:400;color:var(--gray2);')}>· optional — your reading wins over the model&apos;s</span>
        </span>
        <textarea
          style={{ ...TEXTAREA_STYLE, minHeight: 64 }}
          placeholder="e.g. Mild hyperglycaemia, likely stress. ALT/AST mild — CK suggests muscle origin. Hypocalcaemia with hyperphosphataemia is the main finding."
          value={interp}
          onChange={e => setInterp(e.target.value)}
          disabled={busy}
        />
      </label>
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
          {signProblems.length > 0 && <SignFlowRow terms={signProblems} onNav={onNav} />}
          {problemList && signals && (
            <ProblemListPanel
              list={problemList}
              keywords={[...new Set([...signals.signKeywords, ...signals.diagKeywords])]}
              labs={signals.labs ?? []}
              onChange={setProblemList}
              onReset={modelProblemList && !sameList(problemList, modelProblemList) ? () => setProblemList(modelProblemList) : undefined}
              onRerank={listEdited ? rerank : undefined}
              busy={busy}
            />
          )}
          {problemList && !signals && <ProblemListPanel list={problemList} keywords={[]} labs={[]} busy={busy} />}
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

const TIER_LABEL: Record<Tier, string> = {
  key: 'Key problems',
  supporting: 'Supporting',
  secondary: 'Likely secondary, weighted down',
}
const TIER_CHIP: Record<Tier, string> = {
  key: 'font-weight:700;color:var(--tone-teal-fg);background:rgba(var(--tone-teal),var(--tile-bg-a));'
    + 'border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));',
  supporting: 'color:var(--gray);background:transparent;border:1px solid var(--border);',
  secondary: 'color:var(--gray2);background:transparent;border:1px dashed var(--border);',
}

/** What the search was weighted by, as the reader can correct it. Each
 *  extracted finding sits in one tier; a tap moves it on (key → supporting →
 *  secondary), and "Re-rank" runs the search again on the edited list without
 *  re-reading the notes. Without the extraction (a result saved by an older
 *  build) the list is shown read-only. */
function ProblemListPanel({ list, keywords, labs, onChange, onReset, onRerank, busy }: {
  list: ProblemList
  keywords: string[]
  labs: LabReading[]
  onChange?: (l: ProblemList) => void
  onReset?: () => void
  onRerank?: () => void
  busy: boolean
}) {
  const editable = !!onChange && keywords.length > 0
  const all = editable ? keywords : [...list.key, ...list.secondary.map(x => x.term)]
  const byTier = (t: Tier) => all.filter(k => tierOf(list, k) === t)
  const why = new Map(list.secondary.map(x => [x.term, x.explainedBy]))
  if (all.length === 0) return null
  const label = (t: string) => <span style={s('font-weight:700;color:var(--gray);')}>{t}: </span>

  return (
    <div style={PANEL_STYLE}>
      <div style={s('font-weight:700;color:var(--gray);')}>Problem list — what the ranking is weighted by</div>
      {editable && (
        <div style={s('margin-top:2px;')}>Tap a finding to move it: key → supporting → secondary.</div>
      )}
      {(['key', 'supporting', 'secondary'] as const).map(tier => {
        const terms = byTier(tier)
        if (terms.length === 0 && !editable) return null
        return (
          <div key={tier} style={s('margin-top:8px;')}>
            <div style={s('font-size:var(--fs-chip-sub);font-weight:700;letter-spacing:.05em;text-transform:uppercase;opacity:.8;margin-bottom:4px;')}>
              {TIER_LABEL[tier]}
            </div>
            <div style={s('display:flex;flex-wrap:wrap;gap:6px;')}>
              {terms.length === 0 && <span style={s('opacity:.7;')}>none</span>}
              {terms.map(t => {
                const text = <>{t}{why.get(t) && <span style={s('font-weight:400;opacity:.85;')}> ← {why.get(t)}</span>}</>
                return editable ? (
                  <button
                    key={t}
                    type="button"
                    disabled={busy}
                    onClick={() => onChange!(moveTerm(list, t, NEXT_TIER[tier]))}
                    aria-label={`${t}: ${TIER_LABEL[tier]}. Move to ${TIER_LABEL[NEXT_TIER[tier]]}`}
                    style={s(SIGN_CHIP + TIER_CHIP[tier] + 'cursor:pointer;')}
                  >
                    {text}
                  </button>
                ) : (
                  <span key={t} style={s(SIGN_CHIP + TIER_CHIP[tier])}>{text}</span>
                )
              })}
            </div>
          </div>
        )
      })}
      {list.patterns.length > 0 && (
        <div style={s('margin-top:8px;')}>
          {label('Patterns')}
          {list.patterns.map((p, i) => (
            <span key={p.name}>
              {i > 0 && ' · '}
              {p.name} ({p.terms.join(' + ')})
              {editable && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onChange!(removePattern(list, p.name))}
                  aria-label={`Remove the pattern ${p.name}`}
                  style={s('margin-left:4px;padding:0 5px;border:none;background:transparent;color:inherit;cursor:pointer;font-family:inherit;font-size:var(--fs-body);')}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      {labs.length > 0 && (
        <div style={s('margin-top:8px;')}>
          {label('Read from the notes')}
          {labs.map(l => `${l.analyte} ${l.value} mmol/L — ${l.note}`).join(' · ')}
        </div>
      )}
      {(onRerank || onReset) && (
        <div style={s('display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:4px;')}>
          {onRerank && (
            <button type="button" style={BUTTON_STYLE(busy)} onClick={onRerank} disabled={busy}>
              {busy ? STAGE_LABEL.synthesizing : 'Re-rank with your changes'}
            </button>
          )}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={busy}
              style={s('margin-top:10px;padding:9px 12px;border-radius:9px;border:1px solid var(--border);background:transparent;'
                + 'color:var(--gray);font-size:var(--fs-subhead);font-family:inherit;cursor:pointer;')}
            >
              Undo my changes
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const SIGN_CHIP = 'display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;'
  + 'font-size:var(--fs-body);font-family:inherit;line-height:1.3;'

/** One chip per presenting problem: a link into its clinical-sign flowchart,
 *  or a muted chip saying none exists yet (see signLinks for why matching is
 *  strict). */
function SignFlowRow({ terms, onNav }: { terms: string[]; onNav: Nav }) {
  const links = signLinks(terms)
  return (
    <div style={PANEL_STYLE}>
      <div style={s('font-weight:700;color:var(--gray);margin-bottom:6px;')}>Work up by clinical sign</div>
      <div style={s('display:flex;flex-wrap:wrap;gap:6px;')}>
        {links.map(l => l.flowId ? (
          <button
            key={l.term}
            type="button"
            onClick={() => onNav({ kind: 'flow', flowId: l.flowId! })}
            title={`Open the ${l.title} flowchart`}
            style={s(SIGN_CHIP + 'cursor:pointer;font-weight:700;color:var(--tone-teal-fg);'
              + 'background:rgba(var(--tone-teal),var(--tile-bg-a));border:1px solid rgba(var(--tone-teal),var(--tile-bd-a));')}
          >
            {l.term} ›
          </button>
        ) : (
          <span
            key={l.term}
            style={s(SIGN_CHIP + 'color:var(--gray2);border:1px dashed var(--border);')}
          >
            {l.term} <span style={s('font-size:var(--fs-chip-sub);opacity:.8;')}>· no flowchart yet</span>
          </span>
        ))}
      </div>
    </div>
  )
}
