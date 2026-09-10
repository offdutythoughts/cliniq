'use client'
import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from 'react'
import Topbar from '../../components/Topbar'
import BottomNav from '../../components/BottomNav'
import NotesPanel from '../../components/NotesPanel'
import AnnotationToolbar from '../../components/AnnotationToolbar'
import { useNotes } from '../../hooks/useNotes'
import { useNotesLocal } from '../../hooks/useNotesLocal'
import { useAnnotations, type AnnotationStore } from '../../hooks/useAnnotations'
import { useAnnotationsLocal } from '../../hooks/useAnnotationsLocal'
import { useAnnotationLayer } from '../../hooks/useAnnotationLayer'
import type { MarkColour, MarkKind } from '../../lib/annotations/marks'
import { NavProvider, useNav } from '../nav/NavContext'
import { noteKeyLabel, screenMeta, viewFromNoteKey, viewKey, type View } from '../nav/view'
import { Screen } from '../screens/Screen'
import { track } from '../../lib/analytics'
import type { Tab } from '../../types'
import { SearchProvider } from '../search/SearchContext'
import SearchBar from '../search/SearchBar'
import { useSearchHighlight } from '../search/useSearchHighlight'
import { OnboardingModal } from '../../components/OnboardingModal'
import { TutorialProvider } from '../tutorial/TutorialContext'
import { TutorialOverlay } from '../../components/TutorialOverlay'
import SilentBoundary from '../SilentBoundary'

// Use Convex-backed notes when a deployment URL is configured, otherwise localStorage
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
export default hasConvex ? PageWithConvex : PageWithLocal

// Access is decided by sign-in alone: the proxy (src/proxy.ts) sends anyone
// without a session to /login, and that is the whole gate. There is no
// entitlement check here — src/components/SubscriptionGate.tsx is written and
// unmounted, waiting on a subscription backend that is not deployed.
function PageWithConvex() {
  return (
    <NavProvider><TutorialProvider><SearchProvider><PageBase useNotesHook={useNotes} useAnnotationsHook={useAnnotations} /></SearchProvider></TutorialProvider></NavProvider>
  )
}

function PageWithLocal() {
  return <NavProvider><TutorialProvider><SearchProvider><PageBase useNotesHook={useNotesLocal} useAnnotationsHook={useAnnotationsLocal} /></SearchProvider></TutorialProvider></NavProvider>
}

type NotesHook = (key: string, title: string, open: boolean) => {
  editorRef: React.RefObject<HTMLDivElement | null>
  status: string
  noteList: { pageKey: string; pageTitle: string; updatedAt: number }[]
  onInput: () => void
  onCmd: (cmd: string, val?: string) => void
  onClear: () => void
  onExport: () => void
  isReady: boolean
}

type AnnotationsHook = (pageKey: string, pageTitle: string) => AnnotationStore

function PageBase({
  useNotesHook,
  useAnnotationsHook,
}: {
  useNotesHook: NotesHook
  useAnnotationsHook: AnnotationsHook
}) {
  const nav = useNav()
  const [notesOpen, setNotesOpen] = useState(false)
  const screenRef = useRef<HTMLDivElement>(null)

  const meta = screenMeta(nav.view)
  const vk = viewKey(nav.view)

  // The panel normally edits the note for the page on screen; picking another
  // note from its dropdown overrides that. The override carries the view key it
  // was made on, so navigating away drops it without an effect.
  const [picked, setPicked] = useState<{ vk: string; key: string; title: string } | null>(null)
  const active = picked?.vk === vk ? picked : { key: meta.noteKey, title: meta.noteTitle }
  const notes = useNotesHook(active.key, active.title, notesOpen)

  // Programmatic navigation entry point (deep links + the visual-test driver).
  useEffect(() => {
    ;(window as unknown as { __nav?: (v: View) => void }).__nav = (v: View) =>
      v.kind === 'tab' ? nav.navTo(v.tab) : nav.navigate(v)
  }, [nav])

  // Reset the scroll container to the top on every view change. useLayoutEffect
  // runs before paint so the browser never shows a stale scroll position.
  useLayoutEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0
  }, [vk])

  useSearchHighlight(screenRef)

  // Reader annotations. Keyed by the page's note key, so a page's marks and
  // its notes travel together. This must be called after useSearchHighlight:
  // both rewrap text nodes in `screenRef` after every render, and the mark
  // layer has to be the one that runs last (see useAnnotationLayer).
  const annotations = useAnnotationsHook(meta.noteKey, meta.noteTitle)
  const annotate = useAnnotationLayer(screenRef, annotations, meta.noteKey)
  const handleToggleMark = useCallback(
    (kind: MarkKind, colour: MarkColour) => {
      track('annotation_toggled', { kind, colour })
      annotate.toggle(kind, colour)
    },
    [annotate],
  )

  const slideClass = nav.slideDir === 'left' ? 'slide-in-left' : 'slide-in-right'
  const handleNavTo = useCallback((tab: Tab) => nav.navTo(tab), [nav])
  const handleToggleNotes = useCallback(() => {
    setPicked(null) // reopen on the page's own note, not the last one browsed
    setNotesOpen((v) => {
      track(v ? 'notes_closed' : 'notes_opened')
      return !v
    })
  }, [])

  // Dropdown options: every annotated page, labelled "Diagnostic · Abnormal
  // Pupil". The stored title is the fallback for keys whose page is gone.
  const noteOptions = useMemo(
    () => notes.noteList.map((n) => ({ pageKey: n.pageKey, label: noteKeyLabel(n.pageKey, n.pageTitle) })),
    [notes.noteList],
  )

  const handleSelectNote = useCallback((pageKey: string) => {
    const view = viewFromNoteKey(pageKey)
    setPicked({ vk, key: pageKey, title: view ? screenMeta(view).noteTitle : pageKey })
  }, [vk])

  // The page the note in view belongs to — shown next to the title so the
  // reader can jump there instead of hunting for it.
  const activeView = viewFromNoteKey(active.key)
  const handleOpenPage = useCallback(() => {
    if (!activeView) return
    setNotesOpen(false)
    setPicked(null)
    if (activeView.kind === 'tab') nav.navTo(activeView.tab)
    else nav.navigate(activeView)
  }, [activeView, nav])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Topbar
        title={meta.topbarTitle}
        showBack={nav.stack.length > 0}
        onBack={nav.goBack}
        onToggleNotes={handleToggleNotes}
      />

      <SearchBar />

      <div className="screen" ref={screenRef}>
        <div key={vk} className={`screen-inner ${slideClass}`}>
          <Screen view={nav.view} />
        </div>
      </div>

      <BottomNav activeTab={nav.tab} onNavTo={handleNavTo} />

      <NotesPanel
        isOpen={notesOpen}
        onClose={handleToggleNotes}
        noteTitle={active.title}
        options={noteOptions}
        activeKey={active.key}
        onSelectNote={handleSelectNote}
        pageLabel={activeView ? noteKeyLabel(active.key) : null}
        onOpenPage={handleOpenPage}
        status={notes.status}
        isReady={notes.isReady}
        editorRef={notes.editorRef}
        onInput={notes.onInput}
        onCmd={notes.onCmd}
        onClear={notes.onClear}
        onExport={notes.onExport}
      />

      {/* Floats over the selection, so it sits outside the scrolling screen. */}
      <AnnotationToolbar
        ui={annotate.ui}
        onToggle={handleToggleMark}
        onErase={annotate.eraseTarget}
        onClearPage={() => { track('annotations_cleared'); annotate.clearPage() }}
        onInteractStart={annotate.beginInteract}
        markCount={annotate.markCount}
      />

      {/* The welcome sheet runs a Convex query; isolate it so a query failure
          hides the popup instead of crashing the whole app. */}
      <SilentBoundary>
        <OnboardingModal />
      </SilentBoundary>
      <TutorialOverlay />
    </div>
  )
}
