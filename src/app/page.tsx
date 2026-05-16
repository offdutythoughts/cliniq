'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Topbar from '../components/Topbar'
import BottomNav from '../components/BottomNav'
import NotesPanel from '../components/NotesPanel'
import { useNotes } from '../hooks/useNotes'
import { useNotesLocal } from '../hooks/useNotesLocal'
import { initCliniqApp, mountGlobals, navTo, renderLocalise } from '../lib/cliniqApp'
import type { Tab } from '../types'

// Use Convex-backed notes when a deployment URL is configured, otherwise localStorage
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
export default hasConvex ? PageWithConvex : PageWithLocal

function PageWithConvex() {
  return <PageBase useNotesHook={useNotes} />
}

function PageWithLocal() {
  return <PageBase useNotesHook={useNotesLocal} />
}

type NotesHook = (key: string, title: string, open: boolean) => {
  editorRef: React.RefObject<HTMLDivElement | null>
  status: string
  onInput: () => void
  onCmd: (cmd: string, val?: string) => void
  onClear: () => void
  onExport: () => void
  isReady: boolean
}

function PageBase({ useNotesHook }: { useNotesHook: NotesHook }) {
  const [html, setHtml] = useState('')
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right')
  const [topbarTitle, setTopbarTitle] = useState('')
  const [showBack, setShowBack] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [pageKey, setPageKey] = useState('tab-0')
  const [pageTitle, setPageTitle] = useState('Clinical — General')
  const screenRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notes = useNotesHook(pageKey, pageTitle, notesOpen)

  useEffect(() => {
    // Apply theme before render to avoid flash
    const stored = localStorage.getItem('cliniq-theme') || 'light'
    document.documentElement.setAttribute('data-theme', stored)

    initCliniqApp(
      (newHtml, dir) => {
        setSlideDir(dir)
        setHtml(newHtml)
        if (screenRef.current) screenRef.current.scrollTop = 0
      },
      (title, back) => {
        setTopbarTitle(title)
        setShowBack(back)
      },
      (tab) => {
        setActiveTab(tab as Tab)
      },
      (key, title) => {
        setPageKey(key)
        setPageTitle(title)
      },
    )
    mountGlobals()
    renderLocalise()
  }, [])

  // Trigger slide animation on html change
  const [animClass, setAnimClass] = useState('')
  useEffect(() => {
    if (!html) return
    if (animTimer.current) clearTimeout(animTimer.current)
    setAnimClass(slideDir === 'left' ? 'slide-in-left' : 'slide-in-right')
    animTimer.current = setTimeout(() => setAnimClass(''), 300)
  }, [html, slideDir])

  const handleNavTo = useCallback((tab: Tab) => {
    navTo(tab, false)
  }, [])

  const handleToggleNotes = useCallback(() => {
    setNotesOpen((v) => !v)
  }, [])

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <Topbar
        title={topbarTitle}
        showBack={showBack}
        onBack={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof (window as any).goBack === 'function') (window as any).goBack()
        }}
        onToggleNotes={handleToggleNotes}
      />

      <div className="screen" ref={screenRef}>
        <div
          className={`screen-inner ${animClass}`}
          ref={innerRef}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <BottomNav activeTab={activeTab} onNavTo={handleNavTo} />

      <NotesPanel
        isOpen={notesOpen}
        onClose={handleToggleNotes}
        noteTitle={pageTitle}
        status={notes.status}
        isReady={notes.isReady}
        editorRef={notes.editorRef}
        onInput={notes.onInput}
        onCmd={notes.onCmd}
        onClear={notes.onClear}
        onExport={notes.onExport}
      />
    </div>
  )
}
