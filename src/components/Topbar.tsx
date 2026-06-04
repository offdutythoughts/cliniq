'use client'

import { Authenticated } from 'convex/react'
import AccountMenu from './AccountMenu'
import { track } from '../lib/analytics'

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

interface Props {
  title: string
  showBack: boolean
  onBack: () => void
  onToggleNotes: () => void
}

export default function Topbar({ title, showBack, onBack, onToggleNotes }: Props) {
  const notesBtn = (
    <button
      data-notes-btn
      className="text-[11px] font-semibold py-[5px] px-2.5 bg-[var(--teal)] text-white border-0 rounded-lg cursor-pointer transition-[filter] duration-150 shrink-0 ml-auto hover:brightness-[1.15]"
      onClick={onToggleNotes}
    >
      📝 Notes
    </button>
  )
  return (
    <div className="flex items-center pt-[calc(14px+env(safe-area-inset-top))] px-[18px] pb-[10px] bg-(--color-surface) border-b border-(--color-line) shrink-0 gap-2.5">
      <div
        className={`${showBack ? 'flex' : 'hidden'} items-center justify-center w-8 h-8 rounded-lg bg-(--color-card) border border-(--color-line) cursor-pointer text-[16px] text-(--color-muted) transition-all duration-150 shrink-0 hover:bg-[var(--card2)] hover:text-(--color-fg)`}
        onClick={() => { track('back_button_clicked'); onBack() }}
      >
        ←
      </div>
      <div className={`${title ? 'hidden' : ''} text-[18px] font-semibold tracking-[-.02em] text-(--color-fg)`}>
        Clin<span className="text-(--color-accent)">IQ</span>
      </div>
      <div
        id="vet-badge"
        className={`${title ? 'hidden' : ''} text-[9px] font-medium text-(--tone-danger-title) bg-[rgba(var(--tone-danger),0.15)] border border-[rgba(var(--tone-danger),0.2)] rounded-[20px] px-[7px] py-0.5 tracking-[.02em] whitespace-nowrap`}
      >
        Vet use only
      </div>
      <div className={`${title ? 'block' : 'hidden'} text-[14px] font-medium flex-1 text-(--color-fg)`}>{title}</div>
      {hasConvex ? <Authenticated>{notesBtn}</Authenticated> : notesBtn}
      <AccountMenu />
    </div>
  )
}
