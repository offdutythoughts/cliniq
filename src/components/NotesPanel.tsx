'use client'
import type { RefObject } from 'react'
import { useState } from 'react'
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
const ctl = 'bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md py-1 px-2 text-[11px] cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
const sel = 'bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md cursor-pointer transition-all duration-150 py-[3px] px-1 text-[10px] max-w-[70px]'
const swatch = 'relative flex flex-col items-center justify-center w-9 h-[26px] bg-(--color-card) border border-(--color-line) rounded-md cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
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
          <button className={ctl} onClick={() => onCmd('bold')} title="Bold"><strong>B</strong></button>
          <button className={ctl} onClick={() => onCmd('italic')} title="Italic"><em>I</em></button>
          <button className={ctl} onClick={() => onCmd('underline')} title="Underline"><u>U</u></button>
          <button className={ctl} onClick={() => onCmd('strikeThrough')} title="Strikethrough"><s>S</s></button>
          <span className={divider} />
          <select
            className={sel}
            defaultValue=""
            onChange={e => { onCmd('fontSize', e.target.value); e.target.value = '' }}
            title="Font size"
          >
            <option value="" disabled>Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">XL</option>
          </select>
          <select
            className={sel}
            defaultValue=""
            onChange={e => { onCmd('fontName', e.target.value); e.target.value = '' }}
            title="Font"
          >
            <option value="" disabled>Font</option>
            <option value="DM Sans">DM Sans</option>
            <option value="DM Mono">DM Mono</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier</option>
          </select>
          <span className={divider} />
          {/* Both colour pickers used to be bare `input[type=color]` swatches —
              indistinguishable from each other, and the white default was
              invisible on the light theme. Each now shows what it does (a
              coloured A / a highlighted A) in the colour it will apply. */}
          <label className={swatch} title="Text colour">
            <span className="text-[11px] font-bold leading-none" style={{ color: textColor }}>A</span>
            <span className="mt-[2px] w-[14px] h-[3px] rounded-full" style={{ background: textColor }} />
            <input
              className={swatchInput}
              type="color"
              value={textColor}
              onChange={e => { setTextColor(e.target.value); onCmd('foreColor', e.target.value) }}
              aria-label="Text colour"
            />
          </label>
          <label className={swatch} title="Highlight colour">
            <span className="text-[11px] font-bold leading-none px-[3px] rounded-[2px] text-[#0F172A]" style={{ background: hiliteColor }}>A</span>
            <span className="mt-[2px] w-[14px] h-[3px] rounded-full" style={{ background: hiliteColor }} />
            <input
              className={swatchInput}
              type="color"
              value={hiliteColor}
              onChange={e => { setHiliteColor(e.target.value); onCmd('hiliteColor', e.target.value) }}
              aria-label="Highlight colour"
            />
          </label>
          <span className={divider} />
          <button className={ctl} onClick={() => onCmd('insertUnorderedList')} title="Bullet list">•</button>
          <button className={ctl} onClick={() => onCmd('insertOrderedList')} title="Numbered list">1.</button>
          {/* Was a bare ✕, which read as "delete" or "close". */}
          <button className={ctl} onClick={() => onCmd('removeFormat')} title="Strip bold/italic/colour from the selected text">✕ Format</button>
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
