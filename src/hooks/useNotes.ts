'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

export function useNotes(noteKey: string, noteTitle: string) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('Saved locally')
  const editorRef = useRef<HTMLDivElement>(null)

  const loadNotes = useCallback(() => {
    if (!editorRef.current) return
    const html = localStorage.getItem('cliniq-note-' + noteKey)
    editorRef.current.innerHTML = html || ''
  }, [noteKey])

  useEffect(() => {
    if (isOpen) loadNotes()
  }, [isOpen, loadNotes])

  function saveNotes() {
    if (!editorRef.current) return
    try {
      localStorage.setItem('cliniq-note-' + noteKey, editorRef.current.innerHTML)
      setStatus('Saved')
      setTimeout(() => setStatus('Saved locally'), 1000)
    } catch {}
  }

  function noteCmd(cmd: string, val?: string) {
    document.execCommand(cmd, false, val ?? undefined)
    editorRef.current?.focus()
    saveNotes()
  }

  function clearNotes() {
    if (!confirm('Clear notes for this page?')) return
    if (editorRef.current) editorRef.current.innerHTML = ''
    try { localStorage.removeItem('cliniq-note-' + noteKey) } catch {}
    setStatus('Cleared')
  }

  function exportNotes() {
    const text = editorRef.current?.innerText ?? ''
    if (!text.trim()) { setStatus('Nothing to copy'); return }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => setStatus('Copied!'))
        .catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }
  }

  function fallbackCopy(text: string) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
      setStatus('Copied!')
    } catch {
      setStatus('Copy failed')
    }
    document.body.removeChild(ta)
  }

  function toggle() {
    setIsOpen(v => !v)
  }

  return { isOpen, toggle, editorRef, status, noteTitle, noteCmd, saveNotes, clearNotes, exportNotes }
}
