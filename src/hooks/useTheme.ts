'use client'
import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const stored = (localStorage.getItem('cliniq-theme') as Theme) || 'light'
    setThemeState(stored)
    document.documentElement.setAttribute('data-theme', stored)
  }, [])

  function setTheme(t: Theme) {
    setThemeState(t)
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('cliniq-theme', t)
  }

  return { theme, setTheme }
}
