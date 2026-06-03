'use client'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Topbar from '../components/Topbar'
import BottomNav from '../components/BottomNav'
import NotesPanel from '../components/NotesPanel'
import { useNotes } from '../hooks/useNotes'
import { useNotesLocal } from '../hooks/useNotesLocal'
import { NavProvider, useNav } from './nav/NavContext'
import { screenMeta, viewKey } from './nav/view'
import { installBridgeGlobals } from './nav/legacyGlobals'
import { Screen, isMigrated } from './screens/Screen'
import { renderViewToString } from '../lib/cliniqApp'
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

  // Migration bridge: render any not-yet-migrated View to its legacy HTML
  // string. Recomputed only when the view (or a refresh tick) changes, so the
  // string reference is stable across unrelated re-renders — preserving in-place
  // DOM mutations (legacy search) and avoiding needless re-injection.
  const vk = viewKey(nav.view)
  const migrated = isMigrated(nav.view)
  const legacyHtml = useMemo(
    () => (migrated ? '' : renderViewToString(nav.view)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vk, nav.tick, migrated],
  )

  // Re-point the legacy window globals (called by inline onclick handlers inside
  // bridged HTML) at the React router. Removed in Phase 5 with the bridge.
  useEffect(() => {
    installBridgeGlobals(nav)
  }, [nav])

  // Reset the scroll container to the top on every view change. (The slide
  // animation itself is driven by remounting .screen-inner via key={vk} below,
  // so the CSS animation replays — no setState/timer needed.)
  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [vk, nav.tick])

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
        {migrated ? (
          <div key={vk} className={`screen-inner ${slideClass}`}>
            <Screen view={nav.view} />
          </div>
        ) : (
          <div
            key={vk}
            className={`screen-inner ${slideClass}`}
            dangerouslySetInnerHTML={{ __html: legacyHtml }}
          />
        )}
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
