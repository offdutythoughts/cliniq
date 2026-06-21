'use client'
import { useRef, useMemo } from 'react'
import React from 'react'
import { useSearch } from './SearchContext'
import { useNav } from '../nav/NavContext'
import { DB } from '../../data/db'
import { FLOW_SIGNS, DX_HOME_CARDS } from '../../lib/signs/registry'
import type { View } from '../nav/view'

type Result = { label: string; sub: string; snippet?: string; icon?: string; view: View }
type Group = { title: string; results: Result[] }

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

const DISEASE_SKIP = new Set(['id', 'sp', 'name', 'synonyms'])
const LESION_SKIP  = new Set(['id', 'loc', 'loc_name', 'sp', 'cat', 'sub', 'filter', 'urg'])
const PROTO_SKIP   = new Set(['id', 'sp', 'name', 'priority'])

function buildGroups(lower: string): Group[] {
  const groups: Group[] = []

  // ── Clinical sign flows ───────────────────────────────────────────────────
  const flows = FLOW_SIGNS
    .filter(s => s.title.toLowerCase().includes(lower) || s.sub.toLowerCase().includes(lower))
    .map(s => ({ label: s.title, sub: s.sub, icon: s.icon, view: { kind: 'flow' as const, flowId: s.flowId } }))
  if (flows.length) groups.push({ title: 'Clinical Signs', results: flows.slice(0, 5) })

  // ── Diagnostic approaches ─────────────────────────────────────────────────
  const dx = DX_HOME_CARDS
    .filter(c => c.title.toLowerCase().includes(lower) || c.sub.toLowerCase().includes(lower))
    .map(c => ({ label: c.title, sub: c.sub, icon: c.icon, view: { kind: 'dx' as const, sign: c.sign as string, tab: 'history' } }))
  if (dx.length) groups.push({ title: 'Diagnostic Approaches', results: dx.slice(0, 5) })

  // ── Disease pages — full content search ───────────────────────────────────
  const nameMatchDiseases: Result[] = []
  const contentMatchDiseases: Result[] = []

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
    if (nameHit) nameMatchDiseases.push(result)
    else contentMatchDiseases.push(result)
  }

  // Name/synonym matches first, then content matches; cap at 10 total
  const allDiseases = [...nameMatchDiseases, ...contentMatchDiseases].slice(0, 10)
  if (allDiseases.length) groups.push({ title: 'Disease Pages', results: allDiseases })

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
    if (protocols.length >= 6) break
  }
  if (protocols.length) groups.push({ title: 'Protocols', results: protocols })

  // ── Lesion types — full content search ───────────────────────────────────
  const lesions: Result[] = []
  for (const l of DB.lesion_type) {
    const headerHit = l.sub.toLowerCase().includes(lower) ||
                      l.loc_name.toLowerCase().includes(lower) ||
                      l.cat.toLowerCase().includes(lower)
    const bodyHit   = !headerHit && matchesAny(l as Record<string, unknown>, lower)
    if (!headerHit && !bodyHit) continue

    const snip = headerHit ? '' : snippet(l as Record<string, unknown>, lower, LESION_SKIP)
    lesions.push({ label: l.sub, sub: l.loc_name, snippet: snip || undefined, view: { kind: 'lesionDetail' as const, id: l.id } })
    if (lesions.length >= 8) break
  }
  if (lesions.length) groups.push({ title: 'Lesion Types', results: lesions })

  return groups
}

export default function SearchBar() {
  const { query, setQuery } = useSearch()
  const nav = useNav()
  const inputRef = useRef<HTMLInputElement>(null)

  const lower = query.trim().toLowerCase()
  const groups = useMemo(() => (lower.length >= 2 ? buildGroups(lower) : []), [lower])
  const hasResults = groups.some(g => g.results.length > 0)
  const showDropdown = lower.length >= 2

  const handleSelect = (view: View) => {
    if (view.kind === 'tab') nav.navTo(view.tab)
    else nav.navigate(view)
    setQuery('')
    inputRef.current?.blur()
  }

  return (
    <div className="global-search-wrap">
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
          {groups.map(group => (
            <div key={group.title} className="global-search-group">
              <div className="global-search-group-title">{group.title}</div>
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
