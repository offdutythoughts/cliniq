'use client'
import type { RefObject } from 'react'

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

export default function NotesPanel({
  isOpen, onClose, noteTitle, status, isReady, editorRef, onInput, onCmd, onClear, onExport
}: Props) {
  return (
    <>
      <div className={`notes-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
      <div className={`notes-panel${isOpen ? ' open' : ''}`}>
        <div className="notes-header">
          <div>
            <h3>📝 Notes</h3>
            <div style={{fontSize:'10px',color:'var(--gray)',marginTop:'2px',maxWidth:'240px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
              {noteTitle}
            </div>
          </div>
          <button className="notes-close" onClick={onClose}>&times;</button>
        </div>

        <div className="notes-toolbar">
          <button onClick={() => onCmd('bold')} title="Bold"><strong>B</strong></button>
          <button onClick={() => onCmd('italic')} title="Italic"><em>I</em></button>
          <button onClick={() => onCmd('underline')} title="Underline"><u>U</u></button>
          <button onClick={() => onCmd('strikeThrough')} title="Strikethrough"><s>S</s></button>
          <span style={{width:'1px',height:'18px',background:'var(--border)',margin:'0 2px'}} />
          <select
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
          <span style={{width:'1px',height:'18px',background:'var(--border)',margin:'0 2px'}} />
          <input type="color" defaultValue="#F8FAFC" onChange={e => onCmd('foreColor', e.target.value)} title="Text colour" />
          <input type="color" defaultValue="#0A1628" onChange={e => onCmd('hiliteColor', e.target.value)} title="Highlight" />
          <span style={{width:'1px',height:'18px',background:'var(--border)',margin:'0 2px'}} />
          <button onClick={() => onCmd('insertUnorderedList')} title="Bullet list">•</button>
          <button onClick={() => onCmd('insertOrderedList')} title="Numbered list">1.</button>
          <button onClick={() => onCmd('removeFormat')} title="Clear formatting">✕</button>
        </div>

        <div className="notes-body">
          {!isReady && (
            <div style={{padding:'16px',fontSize:'12px',color:'var(--gray)'}}>Loading…</div>
          )}
          <div
            className="notes-editor"
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
            style={isReady ? undefined : { display: 'none' }}
          />
        </div>

        <div className="notes-footer">
          <span className="notes-status">{status}</span>
          <div style={{display:'flex',gap:'6px'}}>
            <button onClick={onExport} title="Copy notes as text">📋 Copy</button>
            <button onClick={onClear} title="Clear all notes">🗑️ Clear</button>
          </div>
        </div>
      </div>
    </>
  )
}
