'use client'
import React, { createContext, useContext, useState } from 'react'

interface SearchCtx {
  query: string
  setQuery: (q: string) => void
  matchCount: number
  setMatchCount: (n: number) => void
}

const Ctx = createContext<SearchCtx>({
  query: '',
  setQuery: () => {},
  matchCount: 0,
  setMatchCount: () => {},
})

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')
  const [matchCount, setMatchCount] = useState(0)
  return (
    <Ctx.Provider value={{ query, setQuery, matchCount, setMatchCount }}>
      {children}
    </Ctx.Provider>
  )
}

export function useSearch() {
  return useContext(Ctx)
}
