'use client'

import { Authenticated } from 'convex/react'
import AccountMenu from './AccountMenu'

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

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
        className={`${title ? 'hide' : ''} text-[9px] font-medium text-(--tone-danger-title) bg-[rgba(var(--tone-danger),0.15)] border border-[rgba(var(--tone-danger),0.2)] rounded-[20px] px-[7px] py-0.5 tracking-[.02em] whitespace-nowrap`}
      >
        Vet use only
      </div>
      <div className={`topbar-title${title ? ' show' : ''}`}>{title}</div>
      {hasConvex ? (
        <Authenticated>
          <button className="notes-topbar-btn" onClick={onToggleNotes}>📝 Notes</button>
        </Authenticated>
      ) : (
        <button className="notes-topbar-btn" onClick={onToggleNotes}>📝 Notes</button>
      )}
      <AccountMenu />
    </div>
  )
}
