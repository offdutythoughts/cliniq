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
