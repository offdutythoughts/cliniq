import { describe, expect, it } from 'vitest'
import { resolveNoteContent, type ServerNoteState } from './noteSync'

const pending = (html: string, editedAt: number) => ({ html, pageTitle: 'T', editedAt })
const cache = (html: string, updatedAt: number) => ({ html, updatedAt })
const server = (html: string, updatedAt: number): ServerNoteState => ({
  authenticated: true,
  note: { html, updatedAt },
})
const noNote: ServerNoteState = { authenticated: true, note: null }
const signedOut: ServerNoteState = { authenticated: false, note: null }

describe('resolveNoteContent', () => {
  it('prefers the unsynced local edit while the server query is loading', () => {
    expect(resolveNoteContent(undefined, pending('<b>offline</b>', 10), cache('old', 5))).toEqual({
      html: '<b>offline</b>',
      source: 'pending',
    })
  })

  it('falls back to the offline cache when loading with nothing pending', () => {
    expect(resolveNoteContent(undefined, null, cache('cached', 5))).toEqual({
      html: 'cached',
      source: 'cache',
    })
  })

  it('is empty when loading with no local copies', () => {
    expect(resolveNoteContent(undefined, null, null)).toEqual({ html: '', source: 'empty' })
  })

  it('uses local copies when signed out', () => {
    expect(resolveNoteContent(signedOut, null, cache('cached', 5))).toEqual({
      html: 'cached',
      source: 'cache',
    })
    expect(resolveNoteContent(signedOut, pending('typed', 9), cache('cached', 5))).toEqual({
      html: 'typed',
      source: 'pending',
    })
  })

  it('shows the server note when there is no local edit', () => {
    expect(resolveNoteContent(server('from server', 20), null, cache('stale', 5))).toEqual({
      html: 'from server',
      source: 'server',
    })
  })

  it('keeps an offline edit that is newer than the server copy', () => {
    expect(resolveNoteContent(server('older', 10), pending('newer offline', 20), null)).toEqual({
      html: 'newer offline',
      source: 'pending',
    })
  })

  it('keeps an offline edit when the server has no note at all', () => {
    expect(resolveNoteContent(noNote, pending('typed offline', 20), null)).toEqual({
      html: 'typed offline',
      source: 'pending',
    })
  })

  it('drops an offline edit superseded by a newer edit from another device', () => {
    expect(resolveNoteContent(server('newer remote', 30), pending('older offline', 20), null)).toEqual({
      html: 'newer remote',
      source: 'server',
    })
  })

  it('shows empty, not the stale cache, when the server confirms no note exists', () => {
    expect(resolveNoteContent(noNote, null, cache('deleted elsewhere', 5))).toEqual({
      html: '',
      source: 'empty',
    })
  })
})
