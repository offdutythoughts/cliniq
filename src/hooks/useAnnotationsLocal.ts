'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Mark } from '../lib/annotations/marks'
import { readMarks, writeMarks } from '../lib/annotations/storage'
import type { AnnotationStore } from './useAnnotations'

/** localStorage-only marks, for builds with no Convex deployment configured —
 *  the same fallback shape `useNotesLocal` provides for notes. The page title
 *  is part of the shared hook signature but is only needed by the server path,
 *  which records it so a mark can be listed away from its page. */
export function useAnnotationsLocal(pageKey: string): AnnotationStore {
  const [state, setState] = useState<{ key: string; marks: Mark[] }>({ key: '', marks: [] })
  const current = useRef(state)
  const publish = useCallback((key: string, marks: Mark[]) => {
    current.current = { key, marks }
    setState({ key, marks })
  }, [])

  useEffect(() => {
    // localStorage is not derivable from props, and the marks are drawn into
    // the DOM by an effect rather than rendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    publish(pageKey, readMarks(pageKey))
  }, [pageKey, publish])

  const commit = useCallback(
    (next: Mark[]) => {
      writeMarks(pageKey, next)
      publish(pageKey, next)
    },
    [pageKey, publish],
  )

  const clearAll = useCallback(() => {
    writeMarks(pageKey, [])
    publish(pageKey, [])
  }, [pageKey, publish])

  return { marks: state.key === pageKey ? state.marks : [], commit, clearAll }
}
