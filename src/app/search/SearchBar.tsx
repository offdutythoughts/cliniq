'use client'
import { useRef } from 'react'
import { useSearch } from './SearchContext'

export default function SearchBar() {
  const { query, setQuery, matchCount } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="global-search-wrap">
      <span className="search-icon">🔍</span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search this page…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label="Search page content"
      />
      {query && (
        <span className="global-search-count">
          {matchCount > 0 ? `${matchCount} match${matchCount === 1 ? '' : 'es'}` : 'No results'}
        </span>
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
    </div>
  )
}
