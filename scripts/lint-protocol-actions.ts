/**
 * lint-protocol-actions.ts
 *
 * Checks every protocol step action field against two rules:
 *  1. Plain-sentence actions must be ≤ MAX_CHARS characters.
 *     (#-prefixed actions are exempt — they use the headline|bullet format.)
 *  2. Note fields that are single long sentences (no pipe) and exceed
 *     NOTE_MAX_CHARS are flagged as candidates for pipe-delimiting.
 *
 * Run:  npx tsx scripts/lint-protocol-actions.ts
 * Exit: 0 = all clear, 1 = warnings only, 2 = errors
 */

import { protocols } from '../src/data/protocols'

const MAX_CHARS = 130
const NOTE_MAX_CHARS = 200

type Issue = { level: 'error' | 'warn'; proto: string; step: number; field: string; len: number; preview: string }
const issues: Issue[] = []

for (const proto of protocols) {
  for (const step of proto.steps) {
    // Rule 1: plain-sentence action too long
    if (!step.action.startsWith('#') && step.action.length > MAX_CHARS) {
      issues.push({
        level: 'error',
        proto: proto.id,
        step: step.n,
        field: 'action',
        len: step.action.length,
        preview: step.action.slice(0, 70) + '…',
      })
    }

    // Rule 2: note is a long run-on sentence (no pipe delimiter)
    if (step.note && !step.note.includes('|') && step.note.length > NOTE_MAX_CHARS) {
      issues.push({
        level: 'warn',
        proto: proto.id,
        step: step.n,
        field: 'note',
        len: step.note.length,
        preview: step.note.slice(0, 70) + '…',
      })
    }
  }
}

if (issues.length === 0) {
  console.log('✅  All protocol action and note fields pass lint checks.')
  process.exit(0)
}

const errors = issues.filter(i => i.level === 'error')
const warns  = issues.filter(i => i.level === 'warn')

if (errors.length) {
  console.error(`\n❌  ${errors.length} action field(s) exceed ${MAX_CHARS} chars (must be ≤${MAX_CHARS} or use #headline|bullet format):\n`)
  for (const e of errors) {
    console.error(`  ${e.proto} step ${e.step} [${e.len} chars]\n    "${e.preview}"\n`)
  }
}

if (warns.length) {
  console.warn(`\n⚠️   ${warns.length} note field(s) exceed ${NOTE_MAX_CHARS} chars without pipe delimiters (consider bulleting):\n`)
  for (const w of warns) {
    console.warn(`  ${w.proto} step ${w.step} [${w.len} chars]\n    "${w.preview}"\n`)
  }
}

console.log(`\nSummary: ${errors.length} error(s), ${warns.length} warning(s)`)
process.exit(errors.length > 0 ? 2 : 1)
