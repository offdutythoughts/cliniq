// ── Annotation marks: local mirror + offline replay queue ────────────────────
// Marks are written to localStorage before they are sent, so a highlight drawn
// in a tunnel is on screen immediately, survives a reload, and is pushed up
// when the connection returns. Every queued operation is keyed by the mark's
// client id and is idempotent server-side, so replaying a queue that partly
// succeeded cannot double-draw or resurrect a mark.

import { defaultColour, isColourFor, type Mark } from './marks'

const MARKS_PREFIX = 'cliniq-annot-'
const QUEUE_KEY = 'cliniq-annot-queue'
// A queue longer than this means the device has been offline for a very long
// time; the oldest operations are dropped rather than growing without bound.
const QUEUE_CAP = 2000

export type PendingOp =
  | { t: 'add'; pageKey: string; pageTitle: string; mark: Mark }
  | { t: 'del'; pageKey: string; id: string }
  | { t: 'clear'; pageKey: string }

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable — the server path still runs */
  }
}

/** Read the local mirror, repairing rows written before colours existed (or
 *  by a newer build offering a colour this one does not). A mark with an
 *  unknown colour would otherwise be sent to the server and rejected, and a
 *  rejected op stalls the whole replay queue behind it. */
export function readMarks(pageKey: string): Mark[] {
  return read<Mark[]>(MARKS_PREFIX + pageKey, []).map(m =>
    isColourFor(m.kind, m.colour) ? m : { ...m, colour: defaultColour(m.kind) },
  )
}

export function writeMarks(pageKey: string, marks: Mark[]): void {
  if (!marks.length) {
    try {
      localStorage.removeItem(MARKS_PREFIX + pageKey)
    } catch {
      /* ignore */
    }
    return
  }
  write(MARKS_PREFIX + pageKey, marks)
}

/** Every page with a local mark copy — the "annotated pages" list offline. */
export function listMarkedPageKeys(): string[] {
  try {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(MARKS_PREFIX))
      .map(k => k.slice(MARKS_PREFIX.length))
  } catch {
    return []
  }
}

export const readQueue = (): PendingOp[] => read<PendingOp[]>(QUEUE_KEY, [])

export function writeQueue(ops: PendingOp[]): void {
  if (!ops.length) {
    try {
      localStorage.removeItem(QUEUE_KEY)
    } catch {
      /* ignore */
    }
    return
  }
  write(QUEUE_KEY, ops.slice(-QUEUE_CAP))
}

export function enqueue(ops: PendingOp[]): void {
  if (!ops.length) return
  writeQueue([...readQueue(), ...ops])
}

/** True when the page has unsent operations — the signal that the local copy
 *  is newer than whatever the server is currently reporting for it. */
export function hasQueuedFor(pageKey: string): boolean {
  return readQueue().some(op => op.pageKey === pageKey)
}

/** Translate a change in the mark list into the operations that reproduce it.
 *  A mark whose range moved is sent as a delete followed by a re-add under the
 *  same id: `add` is idempotent by id, so it would otherwise ignore the move. */
export function opsForDiff(
  pageKey: string,
  pageTitle: string,
  diff: { added: Mark[]; removed: string[]; changed: Mark[] },
): PendingOp[] {
  const ops: PendingOp[] = []
  for (const id of diff.removed) ops.push({ t: 'del', pageKey, id })
  for (const mark of diff.changed) {
    ops.push({ t: 'del', pageKey, id: mark.id })
    ops.push({ t: 'add', pageKey, pageTitle, mark })
  }
  for (const mark of diff.added) ops.push({ t: 'add', pageKey, pageTitle, mark })
  return ops
}
