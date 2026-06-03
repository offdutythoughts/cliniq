import type { CSSProperties } from 'react'

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
