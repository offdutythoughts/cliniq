// Offline persistence layer for Convex-backed notes. Every edit is written
// to localStorage first (a `pending` copy), then synced to Convex; the last
// known server copy is mirrored locally (a `cache` copy) so notes stay
// readable and editable while offline. A pending copy with empty html means
// "delete this note on the next sync".

export const PENDING_PREFIX = 'cliniq-note-pending-'
export const CACHE_PREFIX = 'cliniq-note-cache-'

export type PendingNote = { html: string; pageTitle: string; editedAt: number }
export type CachedNote = { html: string; updatedAt: number }
export type ServerNoteState = {
  authenticated: boolean
  note: { html: string; updatedAt: number } | null
}

// Decide what the editor should show when the server note, an unsynced local
// edit and the offline cache disagree. An unsynced edit is only discarded
// when the server holds a strictly newer version (edited later elsewhere).
export function resolveNoteContent(
  server: ServerNoteState | undefined,
  pending: PendingNote | null,
  cache: CachedNote | null,
): { html: string; source: 'server' | 'pending' | 'cache' | 'empty' } {
  if (server === undefined || !server.authenticated) {
    // Query still loading, offline, or signed out: local copies are all we have.
    if (pending) return { html: pending.html, source: 'pending' }
    if (cache) return { html: cache.html, source: 'cache' }
    return { html: '', source: 'empty' }
  }
  if (pending && (!server.note || pending.editedAt >= server.note.updatedAt)) {
    return { html: pending.html, source: 'pending' }
  }
  if (server.note) return { html: server.note.html, source: 'server' }
  return { html: '', source: 'empty' }
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — the server save path still runs */
  }
}

function removeItem(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

export const readPending = (pageKey: string) => read<PendingNote>(PENDING_PREFIX + pageKey)
export const writePending = (pageKey: string, p: PendingNote) => write(PENDING_PREFIX + pageKey, p)
export const clearPending = (pageKey: string) => removeItem(PENDING_PREFIX + pageKey)
export const readCache = (pageKey: string) => read<CachedNote>(CACHE_PREFIX + pageKey)
export const writeCache = (pageKey: string, c: CachedNote) => write(CACHE_PREFIX + pageKey, c)
export const clearCache = (pageKey: string) => removeItem(CACHE_PREFIX + pageKey)

export function listPendingPageKeys(): string[] {
  try {
    return Object.keys(localStorage)
      .filter((k) => k.startsWith(PENDING_PREFIX))
      .map((k) => k.slice(PENDING_PREFIX.length))
  } catch {
    return []
  }
}
