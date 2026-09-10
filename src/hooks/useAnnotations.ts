'use client'
import { useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { defaultColour, diffMarks, isColourFor, type Mark, type MarkKind } from '../lib/annotations/marks'
import {
  enqueue,
  hasQueuedFor,
  opsForDiff,
  readMarks,
  readQueue,
  writeMarks,
  writeQueue,
} from '../lib/annotations/storage'

/** What the annotation layer needs from whichever store is backing it. */
export interface AnnotationStore {
  marks: Mark[]
  /** Replace this page's marks. The diff against the previous list is what
   *  actually reaches the server. */
  commit: (next: Mark[]) => void
  /** Erase every mark on this page. */
  clearAll: () => void
}

/** Convex-backed marks with a localStorage mirror in front of them: the local
 *  copy paints immediately and keeps working offline, the server copy is the
 *  cross-device truth, and a replay queue reconciles the two. */
export function useAnnotations(pageKey: string, pageTitle: string): AnnotationStore {
  const server = useQuery(api.annotations.listByPage, pageKey ? { pageKey } : 'skip')
  // The server stores the colour as a plain string; narrow it here, falling
  // back for anything this build does not recognise, so one unknown token
  // cannot leave a mark undrawable.
  const serverMarks: Mark[] | null = useMemo(
    () =>
      server?.authenticated
        ? server.marks.map(m => ({
            ...m,
            kind: m.kind as MarkKind,
            colour: isColourFor(m.kind as MarkKind, m.colour)
              ? m.colour
              : defaultColour(m.kind as MarkKind),
          }))
        : null,
    [server],
  )
  const add = useMutation(api.annotations.add)
  const remove = useMutation(api.annotations.remove)
  const clearPage = useMutation(api.annotations.clearPage)

  const [state, setState] = useState<{ key: string; marks: Mark[] }>({ key: '', marks: [] })
  // Mirrors `state` for the commit path, which must diff against the current
  // list without re-running when it changes.
  const current = useRef(state)
  const publish = useCallback((key: string, marks: Mark[]) => {
    current.current = { key, marks }
    setState({ key, marks })
  }, [])

  // Drain the replay queue oldest-first, stopping at the first failure so the
  // remaining operations keep their order for the next attempt.
  const flushing = useRef(false)
  const flush = useCallback(async () => {
    if (flushing.current) return
    flushing.current = true
    try {
      while (readQueue().length) {
        const op = readQueue()[0]
        try {
          if (op.t === 'add') {
            await add({
              clientId: op.mark.id,
              pageKey: op.pageKey,
              pageTitle: op.pageTitle,
              kind: op.mark.kind,
              colour: op.mark.colour,
              start: op.mark.start,
              end: op.mark.end,
              text: op.mark.text,
            })
          } else if (op.t === 'del') {
            await remove({ clientId: op.id })
          } else {
            await clearPage({ pageKey: op.pageKey })
          }
        } catch {
          return // offline, or signed out — try again on the next trigger
        }
        // Re-read rather than reusing the snapshot: a commit may have appended
        // while this operation was in flight. Only index 0 has been consumed.
        writeQueue(readQueue().slice(1))
      }
    } finally {
      flushing.current = false
    }
  }, [add, remove, clearPage])

  // Paint the local mirror as soon as the page changes — before, and possibly
  // instead of, any answer from the server.
  useEffect(() => {
    // Reading localStorage is not something React can derive from props, and
    // the marks are drawn into the DOM by an effect rather than rendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    publish(pageKey, readMarks(pageKey))
  }, [pageKey, publish])

  // Adopt the server list, unless this page still has unsent local changes —
  // those are newer than anything the server can be reporting yet.
  useEffect(() => {
    if (!pageKey || !serverMarks) return
    if (hasQueuedFor(pageKey)) return
    writeMarks(pageKey, serverMarks)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    publish(pageKey, serverMarks)
  }, [serverMarks, pageKey, publish])

  // Push anything left over from an earlier offline session, and resume the
  // moment the connection is back.
  useEffect(() => {
    const onOnline = () => void flush()
    window.addEventListener('online', onOnline)
    void flush()
    return () => window.removeEventListener('online', onOnline)
  }, [flush])

  const commit = useCallback(
    (next: Mark[]) => {
      const before = current.current.key === pageKey ? current.current.marks : readMarks(pageKey)
      const diff = diffMarks(before, next)
      if (!diff.added.length && !diff.removed.length && !diff.changed.length) return
      writeMarks(pageKey, next)
      enqueue(opsForDiff(pageKey, pageTitle, diff))
      publish(pageKey, next)
      void flush()
    },
    [pageKey, pageTitle, publish, flush],
  )

  const clearAll = useCallback(() => {
    writeMarks(pageKey, [])
    // A page-wide clear makes every operation still queued for this page moot.
    writeQueue([...readQueue().filter(op => op.pageKey !== pageKey), { t: 'clear', pageKey }])
    publish(pageKey, [])
    void flush()
  }, [pageKey, publish, flush])

  return { marks: state.key === pageKey ? state.marks : [], commit, clearAll }
}
