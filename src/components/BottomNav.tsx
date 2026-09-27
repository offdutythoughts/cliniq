'use client'
import { TABS, type Tab } from '../app/nav/view'
import { track } from '../lib/analytics'

interface Props {
  activeTab: Tab
  onNavTo: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onNavTo }: Props) {
  return (
    <div data-tutorial="bottom-nav" className="flex bg-(--color-surface-2) border-t border-(--color-line) shrink-0 pb-[env(safe-area-inset-bottom)]">
      {TABS.map((item, i) => (
        // A real <button>: this is chrome, so there is no clinical layout to
        // preserve. aria-current marks the selected tab for a screen reader —
        // colour alone was the only signal before.
        <button
          key={item.label}
          type="button"
          aria-current={activeTab === i ? 'page' : undefined}
          {...(item.label === 'Settings' ? { 'data-tutorial': 'settings-tab' } : {})}
          // flex-auto, not flex-1: a rigid 1/6 slice is 54.5px of content room
          // at 375px and "Mix & Match" needs 68.5px, so it broke at the space
          // and hung a second line under the icon. Sizing from the label and
          // sharing the slack keeps every tab on one centred line. Below 360px
          // nothing fits on one line, so wrapping comes back -- centred.
          className={`flex-auto flex flex-col items-center text-center whitespace-nowrap max-[359px]:whitespace-normal leading-tight pt-2 px-1 pb-1.5 cursor-pointer gap-[3px] transition-colors duration-150 text-[10px] font-medium tracking-[.01em] ${activeTab === i ? 'text-(--color-accent)' : 'text-[var(--gray2)] hover:text-(--color-muted)'}`}
          onClick={() => { track('tab_changed', { tab_name: item.label, tab_index: i }); onNavTo(i as Tab) }}
        >
          <div className="text-[18px] leading-none">{item.icon}</div>
          {item.label}
        </button>
      ))}
    </div>
  )
}
