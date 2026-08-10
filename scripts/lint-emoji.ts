// Enforces what ⚠️ and 🚨 are allowed to mean on lesion pages and disease pages.
//
//   ⚠️  = zoonosis, or a disease needing isolation / barrier nursing. Nothing
//         else. It is rendered from `zoo: true` on the row (ZooTag / the disease
//         page banner), not hand-written into content.
//   🚨  = disease pages only, where an emergency protocol may need to be
//         started. It comes from the emergency banner and the protocol card, so
//         it is never authored into a db.ts field either.
//
// Before this rule the two were generic severity markers — ⚠️ meant "High
// urgency" and 🚨 meant "Emergency" — which made a genuinely infectious patient
// indistinguishable from a merely sick one at a glance.
//
// Scope: src/data/db.ts (lesion + disease + differential content) and
// src/app/screens (the components that render it). Sign flowcharts and protocol
// pages are a separate surface and are deliberately not covered.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DB = 'src/data/db.ts'
const SCREENS = 'src/app/screens'

const WARN = /⚠️?/u
const SIREN = /\u{1F6A8}️?/u
// A ⚠️ in authored content is only defensible if the same breath says why.
const ZOO_WORDS = /zoonot|isolat|barrier nurs|\bPPE\b|notifiable|quarantin/i
const NEAR = 90

// Components allowed to emit each glyph, and why.
// Not LesionLocView: category cards are name-only, no badges of any kind.
const WARN_OK = new Set([
  'tags.tsx',            // ZooTag — the zoonosis chip, on lesion detail pages
  'DiseasePageView.tsx', // the zoonosis banner
  'markup.tsx',          // `warn` blocks — the sign-flowchart surface, not covered here
])
const SIREN_OK = new Set([
  'DiseasePageView.tsx',    // the emergency banner
  // The emergency protocol card itself — extracted from DiseasePageView so the
  // disease page and the two lesion leaves render one identical card. Still the
  // disease-page emergency meaning; see protocolCards.tsx for the rule.
  'protocolCards.tsx',
  // A protocol IS the emergency response the disease page sends you to, so the
  // glyph carries the same meaning on its header and on its home-tab chip.
  'ProtocolDetailView.tsx',
  'TabHome.tsx',
])

let errors = 0
const fail = (where: string, msg: string) => { errors++; console.error(`${where} — ${msg}`) }

// ── db.ts content ──────────────────────────────────────────────────────────
readFileSync(DB, 'utf8').split('\n').forEach((line, i) => {
  const at = `${DB}:${i + 1}`
  for (const m of line.matchAll(new RegExp(SIREN.source, 'gu'))) {
    fail(at, `🚨 in authored content (…${line.slice(Math.max(0, m.index - 40), m.index + 40)}…). `
      + `🚨 is rendered by the disease page's emergency banner / protocol card — do not write it into a field.`)
  }
  for (const m of line.matchAll(new RegExp(WARN.source, 'gu'))) {
    const context = line.slice(Math.max(0, m.index - NEAR), m.index + NEAR)
    if (ZOO_WORDS.test(context)) continue
    fail(at, `⚠️ used as a severity marker (…${line.slice(Math.max(0, m.index - 40), m.index + 40)}…). `
      + `⚠️ means zoonotic / needs isolation — set \`zoo:true\` on the row instead, and drop the glyph.`)
  }
})

// ── screen components ──────────────────────────────────────────────────────
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(name) ? [p] : []
  })
}

/** Prose about the rule and regexes that *detect* the glyph are not uses of it. */
function isCommentary(line: string): boolean {
  const t = line.trim()
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')
    || /\[[^\]]*[⚠\u{1F6A8}]/u.test(line)
}

for (const file of walk(SCREENS)) {
  const name = file.split('/').pop()!
  if (/\.test\.tsx?$/.test(name)) continue
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const at = `${file}:${i + 1}`
    if (isCommentary(line)) return
    if (new RegExp(WARN.source, 'u').test(line) && !WARN_OK.has(name)) {
      fail(at, `⚠️ outside the zoonosis badge. Allowed in: ${[...WARN_OK].join(', ')}.`)
    }
    if (new RegExp(SIREN.source, 'u').test(line) && !SIREN_OK.has(name)) {
      fail(at, `🚨 outside the disease page. Allowed in: ${[...SIREN_OK].join(', ')}.`)
    }
  })
}

// ── the flag has to reach the screen ───────────────────────────────────────
const screensSrc = walk(SCREENS).map(f => readFileSync(f, 'utf8')).join('\n')
if (!/zoo\s*===\s*true|zoo=\{/.test(screensSrc)) {
  fail(SCREENS, 'no screen reads `zoo` — the zoonosis flag is set in db.ts but never rendered.')
}

if (errors > 0) {
  console.error(`\n${errors} emoji-rule violation(s). ⚠️ = zoonotic / isolation only; 🚨 = disease-page emergency only.`)
  process.exit(1)
}
console.log('lint:emoji — ok')
