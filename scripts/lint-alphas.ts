// Enforces the alpha-token rule for inline styles.
//
// A tinted element must never hardcode the alpha of a tone rgb — e.g.
// `rgba(${h.rgb},0.08)`. Fixed low alphas look fine in dark mode but wash out to
// near-invisible in light mode. The theme exposes tokens (--tile-bg-a /
// --tile-bd-a / --panel-bg-a / --panel-bd-a) that carry a higher alpha in light
// mode, so the tokenised form `rgba(${h.rgb},var(--tile-bg-a))` stays legible in
// both. This lint fails on any template-literal rgba() whose alpha is a numeric
// literal rather than a var(), so the wash-out class can never ship.
import { readFileSync } from 'node:fs'
import { sourceFiles } from './lib/sources'
import { lint } from './lib/lint'

const ROOT = 'src'
// rgba( ${...expr...} , <numeric-literal> )  — the tokenised var(--…) alpha form
// has no digit after the comma, so it never matches.
const BAD = /rgba\(\$\{[^}]*\},\s*\.?\d[\d.]*\s*\)/g

const { fail, done } = lint('hardcoded tone-alpha')

// Tests included: a fixture asserting the BAD pattern would be a real use of it.
for (const file of sourceFiles(ROOT, { includeTests: true })) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(BAD)) {
      fail(`${file}:${i + 1} — hardcoded tone alpha \`${m[0]}\`; use a token, e.g. rgba(\${…},var(--tile-bg-a))`)
    }
  })
}

done('No hardcoded tone-alphas in inline styles (alpha-token rule).',
  'Replace the literal alpha with a --tile-bg-a / --tile-bd-a / --panel-bg-a token so light mode stays readable.')
