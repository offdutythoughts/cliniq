'use client'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'

const SAVE_DEBOUNCE_MS = 500
const RETRY_MS = 2000
const RETRY_MAX_MS = 30000

export function useNotes(pageKey: string, pageTitle: string, isOpen: boolean) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Saved')
  const note = useQuery(api.notes.get, isOpen && pageKey ? { pageKey } : 'skip')
  const upsert = useMutation(api.notes.upsert)
  const remove = useMutation(api.notes.remove)

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryDelay = useRef(RETRY_MS)
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
    // A pending (unsaved or failed) edit for this page is newer than anything
    // the server can echo back — never overwrite it.
    if (pendingHtml.current !== null && pendingKey.current?.pageKey === pageKey) return
    const html = note?.html ?? ''
    el.innerHTML = html
    lastSyncedHtml.current = html
  }, [note, isOpen, pageKey])

  // Flush any pending save when the pageKey changes or the panel closes.
  // On failure the pending content is kept and retried, so edits survive
  // transient network or auth hiccups.
  const flushRef = useRef<() => Promise<void>>(async () => {})
  const flush = useCallback(async () => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current)
      saveTimer.current = null
    }
    const html = pendingHtml.current
    const target = pendingKey.current
    if (html === null || !target) return
    try {
      await upsert({ pageKey: target.pageKey, pageTitle: target.pageTitle, html })
      // Only clear if no newer edit arrived while the save was in flight.
      if (pendingHtml.current === html && pendingKey.current?.pageKey === target.pageKey) {
        pendingHtml.current = null
        pendingKey.current = null
      }
      lastSyncedHtml.current = html
      retryDelay.current = RETRY_MS
      setStatus('Saved')
    } catch {
      setStatus('Save failed — retrying…')
      if (!saveTimer.current) {
        saveTimer.current = setTimeout(() => {
          saveTimer.current = null
          void flushRef.current()
        }, retryDelay.current)
        retryDelay.current = Math.min(retryDelay.current * 2, RETRY_MAX_MS)
      }
    }
  }, [upsert])
  useEffect(() => {
    flushRef.current = flush
  }, [flush])

  // Best-effort flush when the tab is hidden or being unloaded, so edits made
  // within the debounce window aren't lost on tab close / navigation.
  useEffect(() => {
    const flushNow = () => void flush()
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') void flush()
    }
    window.addEventListener('pagehide', flushNow)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('pagehide', flushNow)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [flush])

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
