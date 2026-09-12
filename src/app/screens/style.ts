import type { CSSProperties } from 'react'

// NOTE: the horizontal-scroll wrapper used to live here as a `SCROLL_X` string
// fragment. It is now the `.scroll-x` class in globals.css, which carries the
// same scroll mechanics PLUS the edge shading that tells a reader there is more
// off-screen — the point being that a phone's overlay scrollbar fades out, so
// without the shading a wide table just looks like content that stops. Use
// `className="scroll-x"` (compose extra decls, e.g. margins, as inline style),
// and override `--scroll-x-bg` when the box sits on anything but the page
// background.

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
