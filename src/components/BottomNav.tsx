'use client'
import { TABS, TAB_ORDER, type Tab } from '../app/nav/view'
import { track } from '../lib/analytics'

interface Props {
  activeTab: Tab
  onNavTo: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onNavTo }: Props) {
  return (
    <div data-tutorial="bottom-nav" className="flex bg-(--color-surface-2) border-t border-(--color-line) shrink-0 pb-[env(safe-area-inset-bottom)]">
      {TAB_ORDER.map(i => ({ item: TABS[i], i })).map(({ item, i }) => (
        // A real <button>: this is chrome, so there is no clinical layout to
        // preserve. aria-current marks the selected tab for a screen reader —
        // colour alone was the only signal before.
        <button
          key={item.label}
          type="button"
          aria-current={activeTab === i ? 'page' : undefined}
          {...(item.label === 'Settings' ? { 'data-tutorial': 'settings-tab' } : {})}
          // flex-auto, not flex-1: a rigid 1/6 slice was 54.5px of content room
          // at 375px and "Mix & Match" needs 68.5px, so it broke at the space
          // and hung a second line under the icon. Sizing from the label and
          // sharing the slack keeps every tab on one centred line. Below 360px
          // nothing fits on one line, so wrapping comes back -- centred.
          // Seven tabs: the labels alone need ~335px, so the side padding is
          // 2px (px-0.5) and flex-auto hands out the rest -- at px-1 the bar
          // was 391px wide at 375 and dragged the whole page sideways. Below
          // 360 "Interpretation" (one word) may break mid-word rather than
          // overflow: min-w-0 + overflow-wrap:anywhere.
          className={`flex-auto min-w-0 flex flex-col items-center text-center whitespace-nowrap max-[359px]:whitespace-normal max-[359px]:[overflow-wrap:anywhere] leading-tight pt-2 px-0.5 pb-1.5 cursor-pointer gap-[3px] transition-colors duration-150 text-[10px] font-medium tracking-[.01em] ${activeTab === i ? 'text-(--color-accent)' : 'text-[var(--gray2)] hover:text-(--color-muted)'}`}
          onClick={() => { track('tab_changed', { tab_name: item.label, tab_index: i }); onNavTo(i) }}
        >
          <div className="text-[18px] leading-none">{item.icon}</div>
          {item.label}
        </button>
      ))}
    </div>
  )
}
