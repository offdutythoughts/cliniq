'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Topbar from '../components/Topbar'
import BottomNav from '../components/BottomNav'
import NotesPanel from '../components/NotesPanel'
import { initCliniqApp, mountGlobals, navTo, renderLocalise } from '../lib/cliniqApp'
import type { Tab } from '../types'

export default function Page() {
  const [html, setHtml] = useState('')
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right')
  const [topbarTitle, setTopbarTitle] = useState('')
  const [showBack, setShowBack] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>(0)
  const [notesOpen, setNotesOpen] = useState(false)
  const [notesStatus, setNotesStatus] = useState('Saved locally')
  const [noteKey, setNoteKey] = useState('tab-0')
  const [noteTitle, setNoteTitle] = useState('Clinical — General')
  const editorRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
        const tabNames = ['Clinical', 'Diagnostic', 'Disease', 'Protocols', 'Settings']
        setNoteKey('tab-' + tab)
        setNoteTitle(tabNames[tab] + ' — General')
      }
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

  // Notes
  const loadNotes = useCallback(() => {
    if (!editorRef.current) return
    const saved = localStorage.getItem('cliniq-note-' + noteKey)
    editorRef.current.innerHTML = saved || ''
  }, [noteKey])

  const saveNotes = useCallback(() => {
    if (!editorRef.current) return
    try {
      localStorage.setItem('cliniq-note-' + noteKey, editorRef.current.innerHTML)
      setNotesStatus('Saved')
      setTimeout(() => setNotesStatus('Saved locally'), 1000)
    } catch {}
  }, [noteKey])

  const handleToggleNotes = useCallback(() => {
    setNotesOpen(v => {
      const next = !v
      if (next) setTimeout(loadNotes, 0)
      return next
    })
  }, [loadNotes])

  const noteCmd = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val ?? undefined)
    editorRef.current?.focus()
    saveNotes()
  }, [saveNotes])

  const clearNotes = useCallback(() => {
    if (!confirm('Clear notes for this page?')) return
    if (editorRef.current) editorRef.current.innerHTML = ''
    try { localStorage.removeItem('cliniq-note-' + noteKey) } catch {}
    setNotesStatus('Cleared')
  }, [noteKey])

  const exportNotes = useCallback(() => {
    const text = editorRef.current?.innerText ?? ''
    if (!text.trim()) { setNotesStatus('Nothing to copy'); return }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => setNotesStatus('Copied!')).catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }
  }, [])

  function fallbackCopy(text: string) {
    const ta = document.createElement('textarea')
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'
    document.body.appendChild(ta); ta.select()
    try { document.execCommand('copy'); setNotesStatus('Copied!') } catch { setNotesStatus('Copy failed') }
    document.body.removeChild(ta)
  }

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
        noteTitle={noteTitle}
        status={notesStatus}
        editorRef={editorRef}
        onSave={saveNotes}
        onCmd={noteCmd}
        onClear={clearNotes}
        onExport={exportNotes}
      />
    </div>
  )
}
