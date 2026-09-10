'use client'
import type { RefObject } from 'react'
import { useState } from 'react'
import { MaterialIcon, MI_COLOUR_BAR } from './MaterialIcon'
import { track } from '../lib/analytics'

export interface NoteOption {
  pageKey: string
  label: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  noteTitle: string
  status: string
  isReady: boolean
  editorRef: RefObject<HTMLDivElement | null>
  onInput: () => void
  onCmd: (cmd: string, val?: string) => void
  onClear: () => void
  onExport: () => void
  /** Every annotated page, newest first — the note picker's options. */
  options: NoteOption[]
  /** Note key currently loaded in the editor. */
  activeKey: string
  onSelectNote: (pageKey: string) => void
  /** "Diagnostic · Abnormal Pupil" for the note in view; null when its page no
   *  longer exists (renamed or removed content), which hides the open button. */
  pageLabel: string | null
  onOpenPage: () => void
}

// Shared toolbar/footer control styling (was `.notes-toolbar button,select,input`).
const ctl = 'flex items-center justify-center gap-1 h-[26px] bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md px-[7px] text-[11px] cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
// The two dropdowns pair a Material glyph with a native select: the icon says
// which control it is at a glance, the select keeps the platform picker.
const selWrap = 'flex items-center gap-1 h-[26px] bg-(--color-card) border border-(--color-line) text-(--color-muted) rounded-md pl-1.5 pr-0.5 cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
const sel = 'bg-transparent border-0 text-(--color-fg) cursor-pointer text-[10px] max-w-[56px] outline-hidden'
const swatch = 'relative flex items-center justify-center w-8 h-[26px] bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
const swatchInput = 'absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none [-webkit-appearance:none] border-0 p-0 bg-transparent'
const footBtn = 'bg-transparent border border-(--color-line) text-(--color-muted) rounded-md py-[5px] px-3 text-[10px] cursor-pointer hover:bg-(--color-card)'
const divider = 'w-px h-[18px] bg-(--color-line) mx-0.5'

// Annotation defaults that read clearly on both the light and the dark theme —
// execCommand writes the literal colour into the saved html, so a theme
// variable can't be used here.
const DEFAULT_TEXT = '#DC2626'
const DEFAULT_HILITE = '#FDE68A'

export default function NotesPanel({
  isOpen, onClose, noteTitle, status, isReady, editorRef, onInput, onCmd, onClear, onExport,
  options, activeKey, onSelectNote, pageLabel, onOpenPage
}: Props) {
  const [textColor, setTextColor] = useState(DEFAULT_TEXT)
  const [hiliteColor, setHiliteColor] = useState(DEFAULT_HILITE)

  // The page being read is always offered, even before it has any notes.
  const opts = options.some(o => o.pageKey === activeKey)
    ? options
    : [{ pageKey: activeKey, label: noteTitle || 'This page' }, ...options]

  return (
    <>
      <div
        data-notes-overlay
        className={`fixed inset-0 bg-[rgba(0,0,0,.4)] z-[98] transition-opacity duration-[250ms] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        data-notes-panel
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-(--color-surface-2) z-[99] transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,.5)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="py-[14px] px-4 border-b border-(--color-line) shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h3 className="text-[15px] font-semibold text-(--color-fg) m-0 shrink-0">📝 Notes</h3>
              {pageLabel && (
                <button
                  data-notes-open-page
                  className="bg-(--color-card) border border-(--color-line) text-(--color-accent) rounded-full py-[3px] px-2 text-[10px] font-medium cursor-pointer max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap hover:bg-[var(--card2)]"
                  title={`Open ${pageLabel}`}
                  onClick={onOpenPage}
                >
                  ↗ {pageLabel}
                </button>
              )}
            </div>
            <button className="bg-transparent border-0 text-(--color-muted) text-[22px] cursor-pointer px-1 shrink-0" onClick={onClose} title="Close notes" aria-label="Close notes">&times;</button>
          </div>

          {/* Note picker — every page the reader has annotated, so notes taken
              elsewhere are reachable without navigating back to that page. */}
          <select
            data-notes-picker
            className="mt-2 w-full bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md py-[5px] px-2 text-[11px] cursor-pointer"
            value={activeKey}
            onChange={e => { track('notes_switched'); onSelectNote(e.target.value) }}
            title="Switch to another annotated page"
            aria-label="Choose a note"
          >
            {opts.map(o => (
              <option key={o.pageKey} value={o.pageKey}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1 py-2 px-3 border-b border-(--color-line) shrink-0 items-center">
          <button className={ctl} onClick={() => onCmd('bold')} title="Bold" aria-label="Bold"><MaterialIcon name="format_bold" /></button>
          <button className={ctl} onClick={() => onCmd('italic')} title="Italic" aria-label="Italic"><MaterialIcon name="format_italic" /></button>
          <button className={ctl} onClick={() => onCmd('underline')} title="Underline" aria-label="Underline"><MaterialIcon name="format_underlined" /></button>
          <button className={ctl} onClick={() => onCmd('strikeThrough')} title="Strikethrough" aria-label="Strikethrough"><MaterialIcon name="format_strikethrough" /></button>
          <span className={divider} />
          {/* Both colour pickers used to be bare `input[type=color]` swatches —
              indistinguishable from each other, and the white default was
              invisible on the light theme. Each is now the Material glyph for
              the job with its own colour bar repainted in the colour it will
              apply, the way Docs draws these two buttons. */}
          <label className={swatch} title="Text colour">
            <MaterialIcon name="format_color_text" size={18}>
              <path d={MI_COLOUR_BAR} fill={textColor} />
            </MaterialIcon>
            <input
              className={swatchInput}
              type="color"
              value={textColor}
              onChange={e => { setTextColor(e.target.value); onCmd('foreColor', e.target.value) }}
              aria-label="Text colour"
            />
          </label>
          <label className={swatch} title="Highlight colour">
            <MaterialIcon name="format_ink_highlighter" size={18}>
              <path d={MI_COLOUR_BAR} fill={hiliteColor} />
            </MaterialIcon>
            <input
              className={swatchInput}
              type="color"
              value={hiliteColor}
              onChange={e => { setHiliteColor(e.target.value); onCmd('hiliteColor', e.target.value) }}
              aria-label="Highlight colour"
            />
          </label>
          <span className={divider} />
          <button className={ctl} onClick={() => onCmd('insertUnorderedList')} title="Bullet list" aria-label="Bullet list"><MaterialIcon name="format_list_bulleted" /></button>
          <button className={ctl} onClick={() => onCmd('insertOrderedList')} title="Numbered list" aria-label="Numbered list"><MaterialIcon name="format_list_numbered" /></button>
          <label className={selWrap} title="Font size">
            <MaterialIcon name="format_size" size={14} className="shrink-0" />
            <select
              className={sel}
              defaultValue=""
              onChange={e => { onCmd('fontSize', e.target.value); e.target.value = '' }}
              aria-label="Font size"
            >
              <option value="" disabled>Size</option>
              <option value="1">Small</option>
              <option value="3">Normal</option>
              <option value="4">Medium</option>
              <option value="5">Large</option>
              <option value="6">XL</option>
            </select>
          </label>
          <label className={selWrap} title="Font">
            <MaterialIcon name="font_download" size={14} className="shrink-0" />
            <select
              className={sel}
              defaultValue=""
              onChange={e => { onCmd('fontName', e.target.value); e.target.value = '' }}
              aria-label="Font"
            >
              <option value="" disabled>Font</option>
              <option value="DM Sans">DM Sans</option>
              <option value="DM Mono">DM Mono</option>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier</option>
            </select>
          </label>
          {/* Was a bare ✕, which read as "delete" or "close" — the word stays
              alongside the glyph because this is the one destructive control. */}
          <button className={ctl} onClick={() => onCmd('removeFormat')} title="Strip bold/italic/colour from the selected text">
            <MaterialIcon name="format_clear" /> Format
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-[14px] [-webkit-overflow-scrolling:touch]">
          {!isReady && (
            <div className="p-4 text-[12px] text-(--color-muted)">Loading…</div>
          )}
          {/* `notes-editor` class retained only as the anchor for the :empty::before placeholder. */}
          <div
            className="notes-editor min-h-[200px] outline-none text-(--color-muted) text-[13px] leading-[1.7] [font-family:var(--font)]"
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
            style={isReady ? undefined : { display: 'none' }}
          />
        </div>

        <div className="py-2 px-3 border-t border-(--color-line) flex justify-between items-center shrink-0">
          <span className="text-[9px] text-[var(--gray2)]">{status}</span>
          <div className="flex gap-1.5">
            <button className={footBtn} onClick={() => { track('notes_exported'); onExport() }} title="Copy notes as text">📋 Copy</button>
            <button className={footBtn} onClick={() => { track('notes_cleared'); onClear() }} title="Clear all notes">🗑️ Clear</button>
          </div>
        </div>
      </div>
    </>
  )
}
