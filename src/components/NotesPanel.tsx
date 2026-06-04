'use client'
import type { RefObject } from 'react'
import { track } from '../lib/analytics'

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
}

// Shared toolbar/footer control styling (was `.notes-toolbar button,select,input`).
const ctl = 'bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md py-1 px-2 text-[11px] cursor-pointer transition-all duration-150 hover:bg-[var(--card2)]'
const sel = 'bg-(--color-card) border border-(--color-line) text-(--color-fg) rounded-md cursor-pointer transition-all duration-150 py-[3px] px-1 text-[10px] max-w-[70px]'
const colorInput = 'bg-(--color-card) border border-(--color-line) rounded-md cursor-pointer transition-all duration-150 w-7 h-[26px] p-px appearance-none [-webkit-appearance:none]'
const footBtn = 'bg-transparent border border-(--color-line) text-(--color-muted) rounded-md py-[5px] px-3 text-[10px] cursor-pointer hover:bg-(--color-card)'
const divider = 'w-px h-[18px] bg-(--color-line) mx-0.5'

export default function NotesPanel({
  isOpen, onClose, noteTitle, status, isReady, editorRef, onInput, onCmd, onClear, onExport
}: Props) {
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
        <div className="py-[14px] px-4 border-b border-(--color-line) flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-[15px] font-semibold text-(--color-fg) m-0">📝 Notes</h3>
            <div className="text-[10px] text-(--color-muted) mt-0.5 max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
              {noteTitle}
            </div>
          </div>
          <button className="bg-transparent border-0 text-(--color-muted) text-[22px] cursor-pointer px-1" onClick={onClose}>&times;</button>
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
          <input className={colorInput} type="color" defaultValue="#F8FAFC" onChange={e => onCmd('foreColor', e.target.value)} title="Text colour" />
          <input className={colorInput} type="color" defaultValue="#0A1628" onChange={e => onCmd('hiliteColor', e.target.value)} title="Highlight" />
          <span className={divider} />
          <button className={ctl} onClick={() => onCmd('insertUnorderedList')} title="Bullet list">•</button>
          <button className={ctl} onClick={() => onCmd('insertOrderedList')} title="Numbered list">1.</button>
          <button className={ctl} onClick={() => onCmd('removeFormat')} title="Clear formatting">✕</button>
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
