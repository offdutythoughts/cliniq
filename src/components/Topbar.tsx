'use client'

interface Props {
  title: string
  showBack: boolean
  onBack: () => void
  onToggleNotes: () => void
}

export default function Topbar({ title, showBack, onBack, onToggleNotes }: Props) {
  return (
    <div className="topbar">
      <div className={`back-btn${showBack ? ' show' : ''}`} onClick={onBack}>←</div>
      <div className={`logo${title ? ' hide' : ''}`}>Clin<span>IQ</span></div>
      <div
        id="vet-badge"
        className={title ? 'hide' : ''}
        style={{fontSize:'9px',fontWeight:500,color:'#F87171',background:'rgba(220,38,38,0.15)',border:'1px solid rgba(220,38,38,0.2)',borderRadius:'20px',padding:'2px 7px',letterSpacing:'.02em',whiteSpace:'nowrap'}}
      >
        Vet use only
      </div>
      <div className={`topbar-title${title ? ' show' : ''}`}>{title}</div>
      <button className="notes-topbar-btn" onClick={onToggleNotes}>📝 Notes</button>
    </div>
  )
}
