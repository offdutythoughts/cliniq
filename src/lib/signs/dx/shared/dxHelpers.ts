// ── Diagnostic-approach authoring helpers ────────────────────────────────────
// Small utilities that reduce boilerplate when building DxTab block arrays.

import type { DxBlock, DxGridTableBlock, DxPatternsBlock } from '../../dxTypes'

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
 * The pattern-list sibling of `stepTable` — returns a `[step, patterns]` pair.
 *
 * Use it where the second column is a *conclusion* rather than a comparable
 * value ("finding → most likely"): the cards read better than two columns at
 * phone width, and `section` rows fold a long list into a menu.
 *
 * ```ts
 * blocks: [
 *   ...stepPatterns(3, 'PATTERN RECOGNITION', {
 *     rows: [
 *       { section: 'Acute · unilateral' },
 *       { cues: ['Unilateral acute', 'fluorescein-positive defect'], dx: 'Ulcerative keratitis', tone: 'danger' },
 *     ],
 *   }, '🔍'),
 * ]
 * ```
 *
 * `icon` behaves exactly as it does in `stepPair`.
 */
export function stepPatterns(
  n: number,
  title: string,
  list: Omit<DxPatternsBlock, 'kind'>,
  icon?: string,
): [DxBlock, DxBlock] {
  return [
    { kind: 'step', text: `${icon ? `${icon} ` : ''}STEP ${n} — ${title}`, noArrowAfter: true },
    { kind: 'patterns', ...list },
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

/**
 * A bulleted list for a `gridTable` cell — one idea per line.
 *
 * The house style for these tables is ONE CONCEPT PER BULLET: a cell that packs
 * several distinct findings into a `·`-joined run ("azotaemia · ↑ liver enzymes ·
 * glucose + ketones") reads as a wall at phone width and hides the fact that
 * each item is a separate rule-in / rule-out. Give each its own line instead.
 *
 * ```ts
 * { text: bullets(['<strong>Azotaemia</strong> → uraemia', '<strong>Hypercalcaemia</strong>']), tone: 'teal' }
 * ```
 *
 * `lead` is a line above the list (the shared stem — "Appetite suppression or
 * nausea:"), `foot` a line below it (a qualifier that applies to the whole set).
 * Uses only RichText-allowed tags (div/span), so it renders inside any authored
 * `html:`/cell field.
 */
export function bullets(items: string[], opts?: { lead?: string; foot?: string }): string {
  const rows = items
    .map(i => `<div style="display:flex;gap:6px;align-items:flex-start;"><span style="opacity:.45;">•</span><span>${i}</span></div>`)
    .join('')
  const lead = opts?.lead ? `<div style="margin-bottom:4px;">${opts.lead}</div>` : ''
  const foot = opts?.foot ? `<div style="margin-top:4px;opacity:.85;">${opts.foot}</div>` : ''
  return `${lead}<div style="display:flex;flex-direction:column;gap:4px;">${rows}</div>${foot}`
}
