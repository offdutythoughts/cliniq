import type { CSSProperties } from 'react'

// Horizontal-scroll wrapper fragment: keep a wide grid/table on its own scroll
// track so the page body never scrolls sideways. Shared by every "spill" site
// (flow table + category columns, dx table, lesion-location grid, grading
// tables) — compose with extra decls (e.g. `SCROLL_X + 'margin-bottom:4px;'`).
// `overscroll-behavior-x:contain` keeps a swipe that runs off the end of a wide
// table inside the table — without it the gesture chains to the page (and on
// iOS Safari to the browser's back-swipe), which is what made these sections
// awkward to read on a phone. Momentum scrolling + a thin scrollbar so the
// section reads as scrollable rather than as content that just stops.
export const SCROLL_X = 'overflow-x:auto;width:100%;overscroll-behavior-x:contain;-webkit-overflow-scrolling:touch;scrollbar-width:thin;'

// Column-density tier for the "header → ↓ → chips" category layouts, shared so
// the breakpoint policy lives once: 0 = roomy (≤4 columns), 1 = tight (5),
// 2 = crammed (≥6). Callers index their own size/padding scales by the tier —
// the concrete sizes legitimately differ per surface (lesion cards vs the
// smaller flow chips), only the thresholds are shared.
export const colTier = (cols: number): 0 | 1 | 2 => (cols <= 4 ? 0 : cols === 5 ? 1 : 2)

// Returns style string fragments for a tone-tinted element so the common
// bg/border/color triple can be composed without repeating rgba(rgb,α) twice.
// bgA = background alpha (default 0.12), bdA = border alpha (default 0.4).
export const toneBox = (rgb: string, color: string, bgA: string | number = 'var(--tile-bg-a)', bdA: string | number = 'var(--tile-bd-a)') => ({
  bg:  `background:rgba(${rgb},${bgA});`,
  bd:  `border:1.5px solid rgba(${rgb},${bdA});`,
  col: `color:${color};`,
  all: `background:rgba(${rgb},${bgA});border:1.5px solid rgba(${rgb},${bdA});color:${color};`,
})

// Convert a legacy inline-style string ("font-size:10px;color:var(--white)") to
// a React style object. camelCases standard kebab properties, leaves custom
// props (--x) and all values (var(...), rgba(...), repeat(...)) verbatim. The
// data never uses url()/semicolons-in-values, so a first-colon split is safe.
// Note: React re-serialises the object (adds spaces / trailing ';'), so the
// emitted style *string* differs textually from the legacy one but computes to
// the identical style — pixel-identical under the visual guardrail.
export function styleStringToObject(style: string): CSSProperties {
  const obj: Record<string, string> = {}
  for (const decl of style.split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    const val = decl.slice(i + 1).trim()
    if (!prop) continue
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    obj[key] = val
  }
  return obj as CSSProperties
}

// Even tracks that can always fit their container: `minmax(0,1fr)` (not `1fr`,
// whose implicit `auto` minimum lets a long word push the track — and the whole
// row — past the container). Paired with `overflow-wrap:anywhere` on the boxes,
// this is what keeps a row inside its container at any width or zoom level.
export const evenTracks = (n: number) => `repeat(${n},minmax(0,1fr))`

// Long clinical labels ("Benign prostatic hyperplasia") in a narrow track: wrap
// mid-word rather than overflow the box. Applied to every tile/header that sits
// in a fitted row.
// (`hyphens:auto` was tried here and dropped — it computes fine but Chrome's
// dictionary won't hyphenate the all-caps medical words this would be for
// ("METHAEMOGLOBIN"), so it changed nothing on any page. A label that long in a
// third of a phone is a content problem, not a CSS one.)
export const WRAP_ANY = 'overflow-wrap:anywhere;'
