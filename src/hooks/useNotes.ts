'use client'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'

const SAVE_DEBOUNCE_MS = 500

export function useNotes(pageKey: string, pageTitle: string, isOpen: boolean) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Saved')
  const note = useQuery(api.notes.get, isOpen && pageKey ? { pageKey } : 'skip')
  const upsert = useMutation(api.notes.upsert)
  const remove = useMutation(api.notes.remove)

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingHtml = useRef<string | null>(null)
  const pendingKey = useRef<{ pageKey: string; pageTitle: string } | null>(null)
  const lastSyncedHtml = useRef<string | null>(null)

  // Apply the server-fetched note into the editor when the editor is not the focused element
  // (avoids clobbering text the user is mid-typing). Also runs on pageKey change.
  useEffect(() => {
    if (!isOpen) return
    if (note === undefined) return // still loading
    const el = editorRef.current
    if (!el) return
    if (document.activeElement === el) return
    const html = note?.html ?? ''
    el.innerHTML = html
    lastSyncedHtml.current = html
  }, [note, isOpen, pageKey])

  // Flush any pending save when the pageKey changes or the panel closes.
  const flush = useCallback(async () => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current)
      saveTimer.current = null
    }
    const html = pendingHtml.current
    const target = pendingKey.current
    pendingHtml.current = null
    pendingKey.current = null
    if (html === null || !target) return
    try {
      await upsert({ pageKey: target.pageKey, pageTitle: target.pageTitle, html })
      lastSyncedHtml.current = html
      setStatus('Saved')
    } catch {
      setStatus('Save failed')
    }
  }, [upsert])

  useEffect(() => {
    return () => {
      void flush()
    }
  }, [flush, pageKey])

  useEffect(() => {
    if (!isOpen) void flush()
  }, [isOpen, flush])

  const scheduleSave = useCallback(
    (html: string) => {
      pendingHtml.current = html
      pendingKey.current = { pageKey, pageTitle }
      setStatus('Saving…')
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        saveTimer.current = null
        void flush()
      }, SAVE_DEBOUNCE_MS)
    },
    [pageKey, pageTitle, flush],
  )

  const onInput = useCallback(() => {
    const el = editorRef.current
    if (!el) return
    scheduleSave(el.innerHTML)
  }, [scheduleSave])

  const onCmd = useCallback(
    (cmd: string, val?: string) => {
      document.execCommand(cmd, false, val ?? undefined)
      editorRef.current?.focus()
      const el = editorRef.current
      if (el) scheduleSave(el.innerHTML)
    },
    [scheduleSave],
  )

  const onClear = useCallback(async () => {
    if (!confirm('Clear notes for this page?')) return
    if (editorRef.current) editorRef.current.innerHTML = ''
    pendingHtml.current = null
    pendingKey.current = null
    if (saveTimer.current) {
      clearTimeout(saveTimer.current)
      saveTimer.current = null
    }
    lastSyncedHtml.current = ''
    try {
      await remove({ pageKey })
      setStatus('Cleared')
    } catch {
      setStatus('Clear failed')
    }
  }, [pageKey, remove])

  const onExport = useCallback(() => {
    const text = editorRef.current?.innerText ?? ''
    if (!text.trim()) {
      setStatus('Nothing to copy')
      return
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => setStatus('Copied!'))
        .catch(() => fallbackCopy(text, setStatus))
    } else {
      fallbackCopy(text, setStatus)
    }
  }, [])

  const isReady = !isOpen || note !== undefined

  return { editorRef, status, onInput, onCmd, onClear, onExport, isReady }
}

function fallbackCopy(text: string, setStatus: (s: string) => void) {
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
