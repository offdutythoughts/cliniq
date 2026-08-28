'use client'
// Shared helpers used by both FlowPageView and DxApproachView.
// Extracted here to avoid duplicating the Nav type and Raw wrapper.

import type { ReactNode } from 'react'
import type { Tone } from '../../lib/signs/flowTypes'
import { HUE } from '../../lib/signs/tone'
import { RichText } from '../../components/RichText'
import { styleStringToObject as s } from './style'
import type { View } from '../nav/view'

/** Callback type for navigating to a view. */
export type Nav = (v: View) => void

/** Renders an authored-HTML field through the audited RichText boundary. */
export function Raw({ html, onNav }: { html: string; onNav: Nav }) {
  return <RichText html={html} onNavigate={onNav} />
}

/**
 * The fork connector — how EVERY split is drawn, on every screen. A flowchart
 * that separates into N columns gets one connected right-angle tree (stem →
 * horizontal bar → a drop into each column), never a lone arrow pointing into
 * the gap between columns.
 *
 * Geometry: the legs are a grid that MIRRORS the split's own
 * grid-template-columns (`cols`) and `gap`, so every drop lands on its column's
 * centre for any track template — even an asymmetric 3fr:2fr or a scrolling
 * minmax() row. The bar is drawn per leg (a ::before overhanging half a gap on
 * each side, stopping on the centre of the first/last leg), so the corners can't
 * show a seam. `extra`/`rootExtra` carry the split's own min-width/centring when
 * it spills into a horizontal scroll box.
 *
 * `arrow: false` drops the arrowheads — for splits whose columns open with their
 * own YES/NO label + arrow (the `fork` block's labelled legs).
 *
 * The markup and CSS (`.flow-fork*` in globals.css) are shared with the string
 * twin `forkHtml()` in flowTypes, which the authored-`html:` blocks use — so a
 * split looks identical whether it is typed or authored.
 */
export function ForkLines({ n, gap, cols, extra = '', rootExtra = '', arrow = true }: {
  n: number; gap: number; cols?: string; extra?: string; rootExtra?: string; arrow?: boolean
}) {
  return (
    <div className="flow-fork" style={s(`--fork-gap:${gap}px;${rootExtra}`)}>
      <div className="flow-fork-stem" />
      <div className="flow-fork-legs" style={s(`grid-template-columns:${cols ?? `repeat(${n},minmax(0,1fr))`};${extra}`)}>
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="flow-fork-leg">
            <div className={arrow ? 'flow-arrow-v' : 'flow-fork-drop'} />
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Tinted panel with tone-derived bg/border — the single shared abstraction for
 * every coloured box in the flow/dx renderers. bgA = background alpha (default
 * 0.12), bdA = border alpha (default 0.4). Both renderers import this instead of
 * duplicating the rgba(...) construction inline.
 */
export function ToneBox({ tone, bgA = 'var(--panel-bg-a)', bdA = 'var(--panel-bd-a)', extra = '', children }: {
  tone: Tone; bgA?: string | number; bdA?: string | number; extra?: string; children: ReactNode
}) {
  const h = HUE[tone]
  return (
    <div style={s(`background:rgba(${h.rgb},${bgA});border:1px solid rgba(${h.rgb},${bdA});border-radius:10px;width:100%;${extra}`)}>
      {children}
    </div>
  )
}
