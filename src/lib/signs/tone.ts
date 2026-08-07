// ── Tone → colour tables ─────────────────────────────────────────────────────
// The single source mapping a semantic Tone to CSS-variable colours (shared with
// globals.css via the same --tone-* vars). Used by both the legacy string
// renderers (renderFlow/renderDx) and the React flow/dx components. Lives in its
// own module so it survives the Phase 5 deletion of the string renderers.

import type { Tone } from './flowTypes'

/** `rgb` is the triplet fed into rgba(var(--tone-x), α); `color` is the readable
 *  foreground (re-resolves per theme via the var() cascade). */
export const HUE: Record<Tone, { rgb: string; color: string }> = {
  danger:  { rgb: 'var(--tone-danger)',  color: 'var(--tone-danger-fg)' },
  warning: { rgb: 'var(--tone-warning)', color: 'var(--tone-warning-fg)' },
  info:    { rgb: 'var(--tone-info)',    color: 'var(--tone-info-fg)' },
  teal:    { rgb: 'var(--tone-teal)',    color: 'var(--tone-teal-fg)' },
  green:   { rgb: 'var(--tone-green)',   color: 'var(--tone-green-fg)' },
  violet:  { rgb: 'var(--tone-violet)',  color: 'var(--tone-violet-fg)' },
  purple:  { rgb: 'var(--tone-purple)',  color: 'var(--tone-purple-fg)' },
  indigo:  { rgb: 'var(--tone-indigo)',  color: 'var(--tone-indigo-fg)' },
  orange:  { rgb: 'var(--tone-orange)',  color: 'var(--tone-orange-fg)' },
  pink:    { rgb: 'var(--tone-pink)',    color: 'var(--tone-pink-fg)' },
  lime:    { rgb: 'var(--tone-lime)',    color: 'var(--tone-lime-fg)' },
  cyan:    { rgb: 'var(--tone-cyan)',    color: 'var(--tone-cyan-fg)' },
  slate:   { rgb: 'var(--tone-slate)',   color: 'var(--tone-slate-fg)' },
  neutral: { rgb: 'var(--tone-neutral)', color: 'var(--gray)' },
}

/** Brighter title colour for box headers, where the legacy used a lighter shade. */
export const TITLE: Partial<Record<Tone, string>> = {
  danger: 'var(--tone-danger-title)', teal: 'var(--tone-teal-fg)', warning: 'var(--tone-warning-title)',
}
