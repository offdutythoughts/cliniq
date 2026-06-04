'use client'
import type { Tab } from '../types'
import { track } from '../lib/analytics'

const NAV_ITEMS: { icon: string; label: string }[] = [
  { icon: '🔍', label: 'Clinical' },
  { icon: '🌿', label: 'Diagnostic' },
  { icon: '📋', label: 'Disease' },
  { icon: '⚡', label: 'Protocols' },
  { icon: '⚙️', label: 'Settings' },
]

interface Props {
  activeTab: Tab
  onNavTo: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onNavTo }: Props) {
  return (
    <div className="flex bg-(--color-surface-2) border-t border-(--color-line) shrink-0 pb-[env(safe-area-inset-bottom)]">
      {NAV_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`flex-1 flex flex-col items-center pt-2 px-1 pb-1.5 cursor-pointer gap-[3px] transition-colors duration-150 text-[10px] font-medium tracking-[.01em] ${activeTab === i ? 'text-(--color-accent)' : 'text-[var(--gray2)] hover:text-(--color-muted)'}`}
          onClick={() => { track('tab_changed', { tab_name: item.label, tab_index: i }); onNavTo(i as Tab) }}
        >
          <div className="text-[18px] leading-none">{item.icon}</div>
          {item.label}
        </div>
      ))}
    </div>
  )
}
