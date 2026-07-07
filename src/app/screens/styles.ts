// Shared inline-style constants for the clinical screen components.
// These screens use inline style objects (not Tailwind) — this file is the
// single source of truth for values shared across two or more screens.
// Font sizes/line-heights come from the typography scale in globals.css
// (--fs-title / --fs-subhead / --fs-body / --fs-label / --lh-body) so the
// text hierarchy is identical on every page — never hardcode a px size here.

import { styleStringToObject as s } from './style'

/** Page title: bold, top of a detail page. */
export const PAGE_TITLE = s('font-size:var(--fs-title);font-weight:700;color:var(--white);margin-bottom:10px;line-height:1.3;')

/** Flex row of tags/chips with wrap, used at the top of the detail views. */
export const TAG_ROW = s('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;')

/** Standard body text: gray, body size/line-height. */
export const BODY_TEXT = s('font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);')

/** Bullet dot in teal, non-shrinking. Used alongside BULLET rows. */
export const DOT = s('color:var(--teal-light);flex-shrink:0;')

/** Bullet row: flex baseline, standard body size, with bottom margin. */
export const BULLET = s('display:flex;align-items:baseline;gap:6px;font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);margin-bottom:2px;')

/** Uppercase field-label base (mirrors .detail-label in globals.css). */
const LABEL = 'font-size:var(--fs-label);font-weight:600;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;'

/** Field label directly above its value (e.g. Breed / Age / First-line). */
export const FIELD_LABEL = s(LABEL + 'margin-bottom:4px;')

/** Field label opening a follow-on section inside a card, with divider above. */
export const SUB_LABEL = s(LABEL + 'margin-top:10px;margin-bottom:4px;padding-top:8px;border-top:1px solid var(--border);')
