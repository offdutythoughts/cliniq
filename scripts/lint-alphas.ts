// Enforces the alpha-token rule for inline styles.
//
// A tinted element must never hardcode the alpha of a tone rgb — e.g.
// `rgba(${h.rgb},0.08)`. Fixed low alphas look fine in dark mode but wash out to
// near-invisible in light mode. The theme exposes tokens (--tile-bg-a /
// --tile-bd-a / --panel-bg-a / --panel-bd-a) that carry a higher alpha in light
// mode, so the tokenised form `rgba(${h.rgb},var(--tile-bg-a))` stays legible in
// both. This lint fails on any template-literal rgba() whose alpha is a numeric
// literal rather than a var(), so the wash-out class can never ship.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'src'
// rgba( ${...expr...} , <numeric-literal> )  — the tokenised var(--…) alpha form
// has no digit after the comma, so it never matches.
const BAD = /rgba\(\$\{[^}]*\},\s*\.?\d[\d.]*\s*\)/g

function walk(dir: string): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (/\.tsx?$/.test(name)) out.push(p)
  }
  return out
}

let errors = 0
for (const file of walk(ROOT)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(BAD)) {
      errors++
      console.error(`${file}:${i + 1} — hardcoded tone alpha \`${m[0]}\`; use a token, e.g. rgba(\${…},var(--tile-bg-a))`)
    }
  })
}

if (errors > 0) {
  console.error(`\n${errors} hardcoded tone-alpha(s) found. Replace the literal alpha with a --tile-bg-a / --tile-bd-a / --panel-bg-a token so light mode stays readable.`)
  process.exit(1)
} else {
  console.log('✓ No hardcoded tone-alphas in inline styles (alpha-token rule).')
}
