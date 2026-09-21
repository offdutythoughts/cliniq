'use client'
import { useRef, useMemo, useState } from 'react'
import React from 'react'
import { useSearch } from './SearchContext'
import { useNav } from '../nav/NavContext'
import { DB } from '../../data/db'
import { FLOW_SIGNS, DX_HOME_CARDS } from '../../lib/signs/registry'
import { TABS } from '../nav/view'
import type { View } from '../nav/view'

type Result = { label: string; sub: string; snippet?: string; icon?: string; view: View }
type Group = { key: FilterKey; results: Result[] }

/** Content categories the dropdown can be narrowed to. `all` is the default.
 *
 *  Each chip is named after the bottom-nav tab its results live under, and takes
 *  that name from TABS rather than repeating the string — view.ts warns that a
 *  second, hand-synced copy of these labels drifts without anything catching it.
 *  Mix & Match (3) and Settings (5) hold no searchable content, so no chip. */
type FilterKey = 'signs' | 'dx' | 'disease' | 'protocol'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'signs',    label: TABS[0].label },  // Clinical
  { key: 'dx',       label: TABS[1].label },  // Diagnostic
  { key: 'disease',  label: TABS[2].label },  // Disease
  { key: 'protocol', label: TABS[4].label },  // Protocols
]
/** One label per category, used for both the chip and the result-group header
 *  so the two can never disagree about what a section is called. */
const FILTER_LABEL = Object.fromEntries(FILTERS.map(f => [f.key, f.label])) as Record<FilterKey, string>

/** Render text with every occurrence of `term` wrapped in a yellow highlight mark. */
function Highlight({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>
  const lower = term.toLowerCase()
  const parts: React.ReactNode[] = []
  let cursor = 0
  let idx: number
  while ((idx = text.toLowerCase().indexOf(lower, cursor)) !== -1) {
    if (idx > cursor) parts.push(text.slice(cursor, idx))
    parts.push(<mark key={idx} className="search-highlight">{text.slice(idx, idx + term.length)}</mark>)
    cursor = idx + term.length
  }
  if (cursor < text.length) parts.push(text.slice(cursor))
  return <>{parts}</>
}

const SNIPPET_CTX = 30
const SNIPPET_LEN = 90

/** Extract a short excerpt around the first match in any string field, skipping a set of keys. */
function snippet(obj: Record<string, unknown>, lower: string, skip: Set<string>): string {
  for (const [k, v] of Object.entries(obj)) {
    if (skip.has(k) || typeof v !== 'string') continue
    const idx = v.toLowerCase().indexOf(lower)
    if (idx === -1) continue
    const start = Math.max(0, idx - SNIPPET_CTX)
    const end = Math.min(v.length, idx + SNIPPET_LEN)
    return (start > 0 ? '…' : '') + v.slice(start, end) + (end < v.length ? '…' : '')
  }
  return ''
}

/** True if any string value in obj contains lower. */
function matchesAny(obj: Record<string, unknown>, lower: string): boolean {
  return Object.values(obj).some(v => typeof v === 'string' && v.toLowerCase().includes(lower))
}

/** True if any of the sign's keyword synonyms contains lower. */
function kwHit(kws: readonly string[] | undefined, lower: string): boolean {
  return !!kws && kws.some(k => k.toLowerCase().includes(lower))
}

const DISEASE_SKIP = new Set(['id', 'sp', 'name', 'synonyms'])
const PROTO_SKIP   = new Set(['id', 'sp', 'name', 'priority'])
const LESION_SKIP  = new Set(['id', 'sp', 'sub', 'loc', 'loc_name', 'cat', 'urg', 'proto', 'filter', 'dis'])

function buildGroups(lower: string): Group[] {
  const groups: Group[] = []

  // ── Clinical sign flows ───────────────────────────────────────────────────
  const flows = FLOW_SIGNS
    .filter(s => s.title.toLowerCase().includes(lower) || s.sub.toLowerCase().includes(lower) || kwHit(s.keywords, lower))
    .map(s => ({ label: s.title, sub: s.sub, icon: s.icon, view: { kind: 'flow' as const, flowId: s.flowId } }))
  if (flows.length) groups.push({ key: 'signs', results: flows })

  // ── Diagnostic approaches ─────────────────────────────────────────────────
  const dx = DX_HOME_CARDS
    .filter(c => c.title.toLowerCase().includes(lower) || c.sub.toLowerCase().includes(lower) || kwHit(c.keywords, lower))
    .map(c => ({ label: c.title, sub: c.sub, icon: c.icon, view: { kind: 'dx' as const, sign: c.sign as string, tab: 'history' } }))
  if (dx.length) groups.push({ key: 'dx', results: dx })

  // ── Disease pages + lesion sub-types — full content search ────────────────
  // Both render as a disease-style reference page, so they share one group: a
  // vet searching a term does not care whether the page hangs off the disease
  // list or off a sign flow's localisation drill-down.
  const nameMatches: Result[] = []
  const contentMatches: Result[] = []

  for (const d of DB.disease_page) {
    const nameHit  = (d.name || '').toLowerCase().includes(lower) ||
                     (typeof d.synonyms === 'string' && d.synonyms.toLowerCase().includes(lower))
    const bodyHit  = !nameHit && matchesAny(d as Record<string, unknown>, lower)
    if (!nameHit && !bodyHit) continue

    const sp  = typeof d.sp       === 'string' ? d.sp       : ''
    const syn = typeof d.synonyms === 'string' ? d.synonyms : ''
    const sub = [sp, syn].filter(Boolean).join(' · ')
    const snip = nameHit ? '' : snippet(d as Record<string, unknown>, lower, DISEASE_SKIP)

    const result: Result = { label: d.name, sub, snippet: snip || undefined, view: { kind: 'disease' as const, id: d.id } }
    if (nameHit) nameMatches.push(result)
    else contentMatches.push(result)
  }

  // `directDis` sub-types render the disease page itself, which the loop above
  // already surfaced — listing them again would duplicate every hit.
  for (const l of DB.lesion_type) {
    if (l.directDis && l.dis) continue
    const nameHit = l.sub.toLowerCase().includes(lower) || l.loc_name.toLowerCase().includes(lower)
    const bodyHit = !nameHit && matchesAny(l as Record<string, unknown>, lower)
    if (!nameHit && !bodyHit) continue

    const sub  = [l.loc_name, l.sp].filter(Boolean).join(' · ')
    const snip = nameHit ? '' : snippet(l as Record<string, unknown>, lower, LESION_SKIP)

    const result: Result = { label: l.sub, sub, snippet: snip || undefined, view: { kind: 'subTypeDetail' as const, id: l.id } }
    if (nameHit) nameMatches.push(result)
    else contentMatches.push(result)
  }

  // Name/synonym matches first, then content matches — all matches surfaced
  // (the dropdown scrolls), so nothing relevant is hidden behind a cap.
  const allDiseases = [...nameMatches, ...contentMatches]
  if (allDiseases.length) groups.push({ key: 'disease', results: allDiseases })

  // ── Protocols — full content search (name + trigger + steps) ─────────────
  const protocols: Result[] = []
  for (const p of DB.protocols) {
    const nameHit = p.name.toLowerCase().includes(lower) ||
                    p.trigger.toLowerCase().includes(lower) ||
                    p.sp.toLowerCase().includes(lower)
    // Also search step text
    const stepHit = !nameHit && p.steps.some(s =>
      s.action.toLowerCase().includes(lower) ||
      (s.note  || '').toLowerCase().includes(lower) ||
      (s.branch|| '').toLowerCase().includes(lower)
    )
    if (!nameHit && !stepHit) continue

    let snip = ''
    if (stepHit) {
      const matchStep = p.steps.find(s =>
        s.action.toLowerCase().includes(lower) ||
        (s.note || '').toLowerCase().includes(lower) ||
        (s.branch || '').toLowerCase().includes(lower)
      )
      if (matchStep) {
        const text = [matchStep.action, matchStep.note, matchStep.branch].filter(Boolean).join(' ')
        const idx = text.toLowerCase().indexOf(lower)
        if (idx !== -1) {
          const start = Math.max(0, idx - SNIPPET_CTX)
          const end   = Math.min(text.length, idx + SNIPPET_LEN)
          snip = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
        }
      }
    }
    protocols.push({ label: p.name, sub: p.sp, snippet: snip || undefined, view: { kind: 'protocol' as const, id: p.id } })
  }
  if (protocols.length) groups.push({ key: 'protocol', results: protocols })

  return groups
}

export default function SearchBar() {
  const { query, setQuery } = useSearch()
  const nav = useNav()
  const inputRef = useRef<HTMLInputElement>(null)
  // `null` = no filter, every category shown. Kept across queries so a vet who
  // is only after protocols stays in protocols while trying several terms.
  const [filter, setFilter] = useState<FilterKey | null>(null)

  const lower = query.trim().toLowerCase()
  const groups = useMemo(() => (lower.length >= 2 ? buildGroups(lower) : []), [lower])
  const hasResults = groups.some(g => g.results.length > 0)
  const showDropdown = lower.length >= 2

  // Counts come from the unfiltered groups, so every chip keeps showing how
  // much it holds even while another chip is active.
  const counts = useMemo(() => {
    const c = {} as Record<FilterKey, number>
    for (const g of groups) c[g.key] = g.results.length
    return c
  }, [groups])
  const total = groups.reduce((n, g) => n + g.results.length, 0)

  const shown = filter ? groups.filter(g => g.key === filter) : groups
  const filteredOut = hasResults && shown.length === 0

  const handleSelect = (view: View) => {
    if (view.kind === 'tab') nav.navTo(view.tab)
    else nav.navigate(view)
    setQuery('')
    inputRef.current?.blur()
  }

  return (
    <div data-tutorial="search" className="global-search-wrap">
      <span className="search-icon">🔍</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search all pages…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search all pages"
        autoComplete="off"
      />
      {query && !hasResults && showDropdown && (
        <span className="global-search-count">No results</span>
      )}
      {query && (
        <button
          className="global-search-clear"
          onClick={() => { setQuery(''); inputRef.current?.focus() }}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      {showDropdown && hasResults && (
        <div className="global-search-dropdown">
          <div className="global-search-filters" role="group" aria-label="Filter results by section">
            <button
              className={'global-search-filter' + (filter === null ? ' is-active' : '')}
              onClick={() => setFilter(null)}
              aria-pressed={filter === null}
            >
              All <span className="global-search-filter-count">{total}</span>
            </button>
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={'global-search-filter' + (filter === f.key ? ' is-active' : '')}
                onClick={() => setFilter(filter === f.key ? null : f.key)}
                aria-pressed={filter === f.key}
                disabled={!counts[f.key]}
              >
                {f.label} <span className="global-search-filter-count">{counts[f.key] || 0}</span>
              </button>
            ))}
          </div>
          {filteredOut && (
            <div className="global-search-empty">
              No matches in this section.
              <button className="global-search-empty-reset" onClick={() => setFilter(null)}>
                Show all {total} results
              </button>
            </div>
          )}
          {shown.map(group => (
            <div key={group.key} className="global-search-group">
              <div className="global-search-group-title">{FILTER_LABEL[group.key]}</div>
              {group.results.map((r, i) => (
                <button key={i} className="global-search-result" onClick={() => handleSelect(r.view)}>
                  {r.icon && <span className="global-search-result-icon">{r.icon}</span>}
                  <span className="global-search-result-text">
                    <span className="global-search-result-label"><Highlight text={r.label} term={query.trim()} /></span>
                    {r.snippet
                      ? <span className="global-search-result-snippet"><Highlight text={r.snippet} term={query.trim()} /></span>
                      : r.sub && <span className="global-search-result-sub"><Highlight text={r.sub} term={query.trim()} /></span>
                    }
                  </span>
                  <span className="global-search-result-arrow">›</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
