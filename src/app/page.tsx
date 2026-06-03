'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Topbar from '../components/Topbar'
import BottomNav from '../components/BottomNav'
import NotesPanel from '../components/NotesPanel'
import { useNotes } from '../hooks/useNotes'
import { useNotesLocal } from '../hooks/useNotesLocal'
import { NavProvider, useNav } from './nav/NavContext'
import { screenMeta, viewKey, type View } from './nav/view'
import { Screen } from './screens/Screen'
import type { Tab } from '../types'

// Use Convex-backed notes when a deployment URL is configured, otherwise localStorage
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
export default hasConvex ? PageWithConvex : PageWithLocal

function PageWithConvex() {
  return <NavProvider><PageBase useNotesHook={useNotes} /></NavProvider>
}

function PageWithLocal() {
  return <NavProvider><PageBase useNotesHook={useNotesLocal} /></NavProvider>
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
  const nav = useNav()
  const [notesOpen, setNotesOpen] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)

  const meta = screenMeta(nav.view)
  const notes = useNotesHook(meta.noteKey, meta.noteTitle, notesOpen)
  const vk = viewKey(nav.view)

  // Programmatic navigation entry point (deep links + the visual-test driver).
  useEffect(() => {
    ;(window as unknown as { __nav?: (v: View) => void }).__nav = (v: View) =>
      v.kind === 'tab' ? nav.navTo(v.tab) : nav.navigate(v)
  }, [nav])

  // Reset the scroll container to the top on every view change. (The slide
  // animation replays because .screen-inner remounts via key={vk}.)
  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [vk])

  const slideClass = nav.slideDir === 'left' ? 'slide-in-left' : 'slide-in-right'
  const handleNavTo = useCallback((tab: Tab) => nav.navTo(tab), [nav])
  const handleToggleNotes = useCallback(() => setNotesOpen((v) => !v), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Topbar
        title={meta.topbarTitle}
        showBack={nav.stack.length > 0}
        onBack={nav.goBack}
        onToggleNotes={handleToggleNotes}
      />

      <div className="screen" ref={screenRef}>
        <div key={vk} className={`screen-inner ${slideClass}`}>
          <Screen view={nav.view} />
        </div>
      </div>

      <BottomNav activeTab={nav.tab} onNavTo={handleNavTo} />

      <NotesPanel
        isOpen={notesOpen}
        onClose={handleToggleNotes}
        noteTitle={meta.noteTitle}
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
