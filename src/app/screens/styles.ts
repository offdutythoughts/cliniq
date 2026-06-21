// Shared inline-style constants for the clinical screen components.
// These screens use inline style objects (not Tailwind) — this file is the
// single source of truth for values shared across two or more screens.

import { styleStringToObject as s } from './style'

/** Flex row of tags/chips with wrap, used at the top of Disease and SubType views. */
export const TAG_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')

/** Standard body text: 12 px gray, 1.6 line-height. */
export const BODY_TEXT = s('font-size:12px;color:var(--gray);line-height:1.6;')

/** Bullet dot in teal, non-shrinking. Used alongside BULLET rows. */
export const DOT = s('color:var(--teal-light);flex-shrink:0;')

/** Bullet row: flex baseline, standard body size, with bottom margin. */
export const BULLET = s('display:flex;align-items:baseline;gap:6px;font-size:11px;color:var(--gray);line-height:1.6;margin-bottom:2px;')
