// ── Diagnostic-approach authoring helpers ────────────────────────────────────
// Small utilities that reduce boilerplate when building DxTab block arrays.

import type { DxBlock, DxGridTableBlock } from '../../dxTypes'

/**
 * Returns a `[step, check]` pair for a numbered diagnostic step.
 *
 * Every step header carries the same teal — the old even/odd `alt` alternation
 * signalled nothing, so it was dropped. Use spread syntax in the blocks array:
 *
 * ```ts
 * blocks: [
 *   ...stepPair(1, 'MINIMUM DATABASE', `<strong>CBC…</strong>`, '🧪'),
 *   ...stepPair(2, 'SPINAL RADIOGRAPHS', `Survey <strong>lateral…`, '📊'),
 * ]
 * ```
 *
 * The optional `icon` sits ahead of the number (`🧪 STEP 1 — …`), matching the
 * hand-authored headers.
 */
export function stepPair(n: number, title: string, html: string, icon?: string): [DxBlock, DxBlock] {
  return [
    { kind: 'step', text: `${icon ? `${icon} ` : ''}STEP ${n} — ${title}` },
    { kind: 'check', html },
  ]
}

/**
 * The table-shaped sibling of `stepPair` — returns a `[step, gridTable]` pair.
 *
 * `stepPair` can only produce a `check`, so reaching for it is what turns a
 * numbered step into a paragraph. Use this whenever the step body is a lookup
 * (do → look for, finding → diagnosis, test → why), which is most of them:
 *
 * ```ts
 * blocks: [
 *   ...stepTable(3, 'CT SCAN', {
 *     cols: '1fr 1.2fr',
 *     dividers: true,
 *     headers: ['Choose CT when', { text: 'Why', tone: 'teal' }],
 *     rows: [...],
 *   }, '🔍'),
 * ]
 * ```
 *
 * `icon` behaves exactly as it does in `stepPair`.
 */
export function stepTable(
  n: number,
  title: string,
  table: Omit<DxGridTableBlock, 'kind'>,
  icon?: string,
): [DxBlock, DxBlock] {
  return [
    { kind: 'step', text: `${icon ? `${icon} ` : ''}STEP ${n} — ${title}`, noArrowAfter: true },
    { kind: 'gridTable', ...table },
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
