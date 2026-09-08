'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CACHE_PREFIX, PENDING_PREFIX } from './noteSync'

const NOTE_PREFIX = 'cliniq-note-'
// Titles live under their own prefix so the note scan below can't mistake one
// for a note (`cliniq-notetitle-` does not start with `cliniq-note-`).
const TITLE_PREFIX = 'cliniq-notetitle-'

export interface NoteListEntry {
  pageKey: string
  pageTitle: string
  updatedAt: number
}

/** Every page with a non-empty local note, for the panel's note picker. */
function readList(): NoteListEntry[] {
  try {
    return Object.keys(localStorage)
      .filter(
        (k) =>
          k.startsWith(NOTE_PREFIX) &&
          !k.startsWith(PENDING_PREFIX) &&
          !k.startsWith(CACHE_PREFIX) &&
          (localStorage.getItem(k) || '').trim() !== '',
      )
      .map((k) => {
        const pageKey = k.slice(NOTE_PREFIX.length)
        return {
          pageKey,
          pageTitle: localStorage.getItem(TITLE_PREFIX + pageKey) || '',
          updatedAt: 0,
        }
      })
  } catch {
    return []
  }
}

export function useNotesLocal(pageKey: string, pageTitle: string, isOpen: boolean) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Saved locally')
  const [noteList, setNoteList] = useState<NoteListEntry[]>([])

  // Load from localStorage whenever the panel opens or the page key changes
  useEffect(() => {
    if (!isOpen) return
    const el = editorRef.current
    if (!el) return
    try {
      el.innerHTML = localStorage.getItem(NOTE_PREFIX + pageKey) || ''
    } catch {
      el.innerHTML = ''
    }
    setNoteList(readList())
  }, [isOpen, pageKey])

  const save = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    // Tell the user the truth when storage is unavailable (private mode,
    // quota, blocked cookies) — a false "Saved locally" loses their notes.
    try {
      localStorage.setItem(NOTE_PREFIX + pageKey, el.innerHTML)
      // Keep the title alongside so the picker can name notes for pages the
      // reader is not currently on.
      if (pageTitle) localStorage.setItem(TITLE_PREFIX + pageKey, pageTitle)
      setStatus('Saved locally')
    } catch {
      setStatus('Not saved — browser storage unavailable')
    }
  }, [pageKey, pageTitle])

  const onInput = useCallback(() => { save() }, [save])

  const onCmd = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val ?? undefined)
    editorRef.current?.focus()
    save()
  }, [save])

  const onClear = useCallback(async () => {
    if (!confirm('Clear notes for this page?')) return
    if (editorRef.current) editorRef.current.innerHTML = ''
    try {
      localStorage.removeItem(NOTE_PREFIX + pageKey)
      localStorage.removeItem(TITLE_PREFIX + pageKey)
    } catch {}
    setNoteList(readList())
    setStatus('Cleared')
    setTimeout(() => setStatus('Saved locally'), 1200)
  }, [pageKey])

  const onExport = useCallback(() => {
    const text = editorRef.current?.innerText ?? ''
    if (!text.trim()) { setStatus('Nothing to copy'); return }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => setStatus('Copied!')).catch(() => fallbackCopy(text, setStatus))
    } else {
      fallbackCopy(text, setStatus)
    }
  }, [])

  return { editorRef, status, onInput, onCmd, onClear, onExport, noteList, isReady: true as const }
}

function fallbackCopy(text: string, setStatus: (s: string) => void) {
  const ta = document.createElement('textarea')
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'
  document.body.appendChild(ta); ta.select()
  try { document.execCommand('copy'); setStatus('Copied!') } catch { setStatus('Copy failed') }
  document.body.removeChild(ta)
}
