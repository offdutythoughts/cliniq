'use client'
import { useRef, useMemo } from 'react'
import { useSearch } from './SearchContext'
import { useNav } from '../nav/NavContext'
import { DB } from '../../data/db'
import { SIGNS } from '../../lib/signs/registry'
import { DX_HOME_CARDS } from '../screens/diagnosticHomeCards'
import type { View } from '../nav/view'

type Result = { label: string; sub: string; icon?: string; view: View }
type Group = { title: string; results: Result[] }

function buildGroups(lower: string): Group[] {
  const groups: Group[] = []

  const flows = SIGNS
    .filter(s => s.title.toLowerCase().includes(lower) || s.sub.toLowerCase().includes(lower))
    .map(s => ({ label: s.title, sub: s.sub, icon: s.icon, view: { kind: 'flow' as const, flowId: s.flowId } }))
  if (flows.length) groups.push({ title: 'Clinical Signs', results: flows.slice(0, 5) })

  const dx = DX_HOME_CARDS
    .filter(c => c.title.toLowerCase().includes(lower) || c.sub.toLowerCase().includes(lower))
    .map(c => ({ label: c.title, sub: c.sub, icon: c.icon, view: { kind: 'dx' as const, sign: c.sign as string, tab: 'history' } }))
  if (dx.length) groups.push({ title: 'Diagnostic Approaches', results: dx.slice(0, 5) })

  const diseases = DB.disease_page
    .filter(d => {
      const name = (d.name || '').toLowerCase()
      const syn = (typeof d.synonyms === 'string' ? d.synonyms : '').toLowerCase()
      return name.includes(lower) || syn.includes(lower)
    })
    .slice(0, 8)
    .map(d => ({
      label: d.name,
      sub: [typeof d.sp === 'string' ? d.sp : '', typeof d.synonyms === 'string' ? d.synonyms : ''].filter(Boolean).join(' · '),
      view: { kind: 'disease' as const, id: d.id },
    }))
  if (diseases.length) groups.push({ title: 'Disease Pages', results: diseases })

  const protocols = DB.protocols
    .filter(p => p.name.toLowerCase().includes(lower) || p.trigger.toLowerCase().includes(lower) || p.sp.toLowerCase().includes(lower))
    .slice(0, 5)
    .map(p => ({ label: p.name, sub: p.sp, view: { kind: 'protocol' as const, id: p.id } }))
  if (protocols.length) groups.push({ title: 'Protocols', results: protocols })

  const lesions = DB.lesion_type
    .filter(l =>
      l.sub.toLowerCase().includes(lower) ||
      l.loc_name.toLowerCase().includes(lower) ||
      (typeof l.signs === 'string' && l.signs.toLowerCase().includes(lower)) ||
      l.cat.toLowerCase().includes(lower)
    )
    .slice(0, 6)
    .map(l => ({ label: l.sub, sub: l.loc_name, view: { kind: 'lesionDetail' as const, id: l.id } }))
  if (lesions.length) groups.push({ title: 'Lesion Types', results: lesions })

  return groups
}

export default function SearchBar() {
  const { query, setQuery } = useSearch()
  const nav = useNav()
  const inputRef = useRef<HTMLInputElement>(null)

  const lower = query.trim().toLowerCase()
  const groups = useMemo(() => (lower.length >= 1 ? buildGroups(lower) : []), [lower])
  const hasResults = groups.some(g => g.results.length > 0)
  const showDropdown = lower.length >= 1

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
                    <span className="global-search-result-label">{r.label}</span>
                    {r.sub && <span className="global-search-result-sub">{r.sub}</span>}
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
