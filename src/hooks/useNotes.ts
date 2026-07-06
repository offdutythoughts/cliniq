'use client'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'
import {
  clearCache,
  clearPending,
  listPendingPageKeys,
  readCache,
  readPending,
  resolveNoteContent,
  writeCache,
  writePending,
} from './noteSync'

const SAVE_DEBOUNCE_MS = 500
const RETRY_MS = 2000
const RETRY_MAX_MS = 30000
// If the server query hasn't answered after this long (offline, cold start),
// open the editor anyway with the locally cached copy.
const LOCAL_FALLBACK_MS = 1500

const isOffline = () => typeof navigator !== 'undefined' && !navigator.onLine

export function useNotes(pageKey: string, pageTitle: string, isOpen: boolean) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Saved')
  const note = useQuery(api.notes.get, isOpen && pageKey ? { pageKey } : 'skip')
  const upsert = useMutation(api.notes.upsert)
  const remove = useMutation(api.notes.remove)

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryDelay = useRef(RETRY_MS)
  const pendingHtml = useRef<string | null>(null)
  const pendingKey = useRef<{ pageKey: string; pageTitle: string; editedAt: number } | null>(null)

  const loading = note === undefined

  // Offline fallback: when the server query stays unanswered, open the editor
  // with local content anyway (keyed by page so it resets on navigation).
  const [fallbackPage, setFallbackPage] = useState<string | null>(null)
  const localFallback = fallbackPage === pageKey
  useEffect(() => {
    if (!isOpen || !loading || localFallback) return
    const t = setTimeout(() => setFallbackPage(pageKey), LOCAL_FALLBACK_MS)
    return () => clearTimeout(t)
  }, [isOpen, loading, pageKey, localFallback])

  // Apply the freshest known content into the editor when it is not the
  // focused element (avoids clobbering text the user is mid-typing).
  useEffect(() => {
    if (!isOpen) return
    const el = editorRef.current
    if (!el) return
    if (document.activeElement === el) return
    // An in-memory pending edit for this page is newer than anything the
    // server can echo back — never overwrite it.
    if (pendingHtml.current !== null && pendingKey.current?.pageKey === pageKey) return
    if (note === undefined && !localFallback) return
    const pending = readPending(pageKey)
    const cache = readCache(pageKey)
    const resolved = resolveNoteContent(note, pending, cache)
    el.innerHTML = resolved.html
    if (note?.authenticated) {
      // Server answered: refresh the offline cache, and drop an unsynced
      // local copy the server version has superseded.
      if (note.note) writeCache(pageKey, { html: note.note.html, updatedAt: note.note.updatedAt })
      else clearCache(pageKey)
      if (resolved.source !== 'pending') clearPending(pageKey)
    }
  }, [note, isOpen, pageKey, localFallback])

  // Flush any pending save when the pageKey changes or the panel closes.
  // On failure the pending content is kept (in memory and in localStorage)
  // and retried, so edits survive network or auth hiccups and offline spells.
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
      const result = await upsert({
        pageKey: target.pageKey,
        pageTitle: target.pageTitle,
        html,
        editedAt: target.editedAt,
      })
      // Only clear if no newer edit arrived while the save was in flight.
      if (pendingHtml.current === html && pendingKey.current?.pageKey === target.pageKey) {
        pendingHtml.current = null
        pendingKey.current = null
        clearPending(target.pageKey)
      }
      if (result.applied) writeCache(target.pageKey, { html, updatedAt: result.updatedAt })
      retryDelay.current = RETRY_MS
      setStatus('Saved')
    } catch {
      // The edit is already safe in localStorage. If offline, the 'online'
      // listener resumes the sync; otherwise retry with backoff.
      if (isOffline()) {
        setStatus('Saved offline — will sync')
      } else {
        setStatus('Save failed — retrying…')
        if (!saveTimer.current) {
          saveTimer.current = setTimeout(() => {
            saveTimer.current = null
            void flushRef.current()
          }, retryDelay.current)
          retryDelay.current = Math.min(retryDelay.current * 2, RETRY_MAX_MS)
        }
      }
    }
  }, [upsert])
  useEffect(() => {
    flushRef.current = flush
  }, [flush])

  // Push every unsynced local copy up to the server (edits made offline,
  // possibly in a previous session). Empty html means "delete this note".
  const sweeping = useRef(false)
  const syncPending = useCallback(async () => {
    if (sweeping.current) return
    sweeping.current = true
    try {
      for (const pk of listPendingPageKeys()) {
        if (pendingKey.current?.pageKey === pk) continue // flush owns the live page
        const pending = readPending(pk)
        if (!pending) {
          clearPending(pk)
          continue
        }
        try {
          if (pending.html === '') {
            await remove({ pageKey: pk })
          } else {
            await upsert({
              pageKey: pk,
              pageTitle: pending.pageTitle,
              html: pending.html,
              editedAt: pending.editedAt,
            })
          }
          clearPending(pk)
        } catch {
          break // still offline or signed out — keep the remaining copies
        }
      }
    } finally {
      sweeping.current = false
    }
  }, [upsert, remove])

  // Best-effort flush when the tab is hidden or unloaded; resume syncing
  // whenever the connection comes back.
  useEffect(() => {
    const flushNow = () => void flushRef.current()
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') void flushRef.current()
    }
    const onOnline = () => {
      void flushRef.current()
      void syncPending()
    }
    window.addEventListener('pagehide', flushNow)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('online', onOnline)
    void syncPending() // sync edits left over from a previous offline session
    return () => {
      window.removeEventListener('pagehide', flushNow)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('online', onOnline)
    }
  }, [syncPending])

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
      const editedAt = Date.now()
      pendingHtml.current = html
      pendingKey.current = { pageKey, pageTitle, editedAt }
      // Persist immediately so the edit survives a tab close even before the
      // debounced server save runs (and indefinitely while offline).
      writePending(pageKey, { html, pageTitle, editedAt })
      setStatus(isOffline() ? 'Saved offline — will sync' : 'Saving…')
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        saveTimer.current = null
        void flushRef.current()
      }, SAVE_DEBOUNCE_MS)
    },
    [pageKey, pageTitle],
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
    // Record the deletion locally first so it survives offline / tab close.
    writePending(pageKey, { html: '', pageTitle, editedAt: Date.now() })
    clearCache(pageKey)
    try {
      await remove({ pageKey })
      clearPending(pageKey)
      setStatus('Cleared')
    } catch {
      setStatus(isOffline() ? 'Cleared offline — will sync' : 'Clear failed — will retry')
    }
  }, [pageKey, pageTitle, remove])

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

  const isReady = !isOpen || note !== undefined || localFallback

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
