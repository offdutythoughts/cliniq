// ── Diagnostic-approach authoring helpers ────────────────────────────────────
// Small utilities that reduce boilerplate when building DxTab block arrays.

import type { DxBlock } from '../../dxTypes'

/**
 * Returns a `[step, check]` pair for a numbered diagnostic step.
 *
 * Every step header carries the same teal — the old even/odd `alt` alternation
 * signalled nothing, so it was dropped. Use spread syntax in the blocks array:
 *
 * ```ts
 * blocks: [
 *   ...stepPair(1, 'MINIMUM DATABASE', `<strong>CBC…</strong>`),
 *   ...stepPair(2, 'SPINAL RADIOGRAPHS', `Survey <strong>lateral…`),
 * ]
 * ```
 */
export function stepPair(n: number, title: string, html: string): [DxBlock, DxBlock] {
  return [
    { kind: 'step', text: `STEP ${n} — ${title}` },
    { kind: 'check', html },
  ]
}

/**
 * A small teal numbered badge for the start of a card body — gives list-style
 * cards a scannable "1 / 2 / 3" spine without spending a whole line on it.
 *
 * ```ts
 * html: `${numBadge(1)}<strong>Chondrodystrophic</strong> → IVDD Type I`
 * ```
 */
export function numBadge(n: number): string {
  return `<span style="display:inline-block;width:15px;height:15px;border-radius:50%;background:rgba(var(--tone-teal),0.18);color:var(--tone-teal-fg);font-size:9px;font-weight:700;text-align:center;line-height:15px;margin-right:6px;">${n}</span>`
}
