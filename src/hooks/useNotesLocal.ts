'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useNotesLocal(pageKey: string, _pageTitle: string, isOpen: boolean) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Saved locally')

  // Load from localStorage whenever the panel opens or the page key changes
  useEffect(() => {
    if (!isOpen) return
    const el = editorRef.current
    if (!el) return
    try {
      el.innerHTML = localStorage.getItem('cliniq-note-' + pageKey) || ''
    } catch {
      el.innerHTML = ''
    }
  }, [isOpen, pageKey])

  const save = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    // Tell the user the truth when storage is unavailable (private mode,
    // quota, blocked cookies) — a false "Saved locally" loses their notes.
    try {
      localStorage.setItem('cliniq-note-' + pageKey, el.innerHTML)
      setStatus('Saved locally')
    } catch {
      setStatus('Not saved — browser storage unavailable')
    }
  }, [pageKey])

  const onInput = useCallback(() => { save() }, [save])

  const onCmd = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val ?? undefined)
    editorRef.current?.focus()
    save()
  }, [save])

  const onClear = useCallback(async () => {
    if (!confirm('Clear notes for this page?')) return
    if (editorRef.current) editorRef.current.innerHTML = ''
    try { localStorage.removeItem('cliniq-note-' + pageKey) } catch {}
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

  return { editorRef, status, onInput, onCmd, onClear, onExport, isReady: true as const }
}

function fallbackCopy(text: string, setStatus: (s: string) => void) {
  const ta = document.createElement('textarea')
  ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'
  document.body.appendChild(ta); ta.select()
  try { document.execCommand('copy'); setStatus('Copied!') } catch { setStatus('Copy failed') }
  document.body.removeChild(ta)
}
