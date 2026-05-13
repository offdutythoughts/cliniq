'use client'
import { useState, useCallback } from 'react'
import type { Tab, PageDescriptor, HistoryEntry } from '../types'

const TAB_NAMES = ['Clinical', 'Diagnostic', 'Disease', 'Protocols', 'Settings']

function defaultNoteKey(tab: Tab) {
  return 'tab-' + tab
}
function defaultNoteTitle(tab: Tab) {
  return TAB_NAMES[tab] + ' — General'
}

export function useNavigation() {
  const [tab, setTab] = useState<Tab>(0)
  const [stack, setStack] = useState<HistoryEntry[]>([])
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right')
  const [noteKey, setNoteKey] = useState(defaultNoteKey(0))
  const [noteTitle, setNoteTitle] = useState(defaultNoteTitle(0))

  const currentPage: PageDescriptor | null = stack.length > 0 ? stack[stack.length - 1].page : null
  const topbarTitle = stack.length > 0 ? stack[stack.length - 1].title : ''
  const showBack = stack.length > 0

  const navTo = useCallback((n: Tab) => {
    setTab(n)
    setStack([])
    setSlideDir('right')
    setNoteKey(defaultNoteKey(n))
    setNoteTitle(defaultNoteTitle(n))
  }, [])

  const push = useCallback((page: PageDescriptor, title: string, customKey?: string, customTitle?: string) => {
    setSlideDir('right')
    setStack(prev => [...prev, { page, title }])
    if (customKey) setNoteKey(customKey)
    if (customTitle) setNoteTitle(customTitle)
  }, [])

  const goBack = useCallback(() => {
    setSlideDir('left')
    setStack(prev => {
      const next = prev.slice(0, -1)
      const restored = next[next.length - 1]
      if (!restored) {
        setNoteKey(k => k)
        setNoteTitle(t => t)
      }
      return next
    })
  }, [])

  return {
    tab,
    currentPage,
    topbarTitle,
    showBack,
    slideDir,
    noteKey,
    noteTitle,
    navTo,
    push,
    goBack,
  }
}
