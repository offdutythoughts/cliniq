'use client'
import type { Tab } from '../types'

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
    <div className="bottom-nav">
      {NAV_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`nav-item${activeTab === i ? ' active' : ''}`}
          onClick={() => onNavTo(i as Tab)}
        >
          <div className="nav-icon">{item.icon}</div>
          {item.label}
        </div>
      ))}
    </div>
  )
}
