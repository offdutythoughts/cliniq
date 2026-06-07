// ── Diagnostic-approach authoring helpers ────────────────────────────────────
// Small utilities that reduce boilerplate when building DxTab block arrays.

import type { DxBlock } from '../../dxTypes'

/**
 * Returns a `[step, check]` pair for a numbered diagnostic step.
 *
 * Steps alternate the `alt` class (even-numbered steps get `alt: true`) to
 * produce the standard visual rhythm. Use spread syntax in the blocks array:
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
    { kind: 'step', text: `STEP ${n} — ${title}`, alt: n % 2 === 0 },
    { kind: 'check', html },
  ]
}
