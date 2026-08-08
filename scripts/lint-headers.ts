// Validates the top of every flow page — the part the reader lands on.
//
// The house shape, taken from the swollen-joints flow:
//
//   ENTRY page (one per sign, listed in the registry)
//     entry node (the sign)  →  discriminator STEP  →  choices  →  DON'T MISS alert
//
//   SUB-page (everything a choice taps through to)
//     entry node + `sub` (a one-line recap of the finding that got the reader
//     here — usually the parent choice's discriminator)  →  the page's content
//
// CHECK 1 — a sub-page must carry that context directly under its header. It may
// arrive as the entry node's `sub` (preferred), a leading `callout` (used where
// the context is a warning or a pivotal test), or a leading statement-step — a
// step whose text is a sentence rather than a question, which several pages use
// to state the mechanism. What fails is a header with nothing under it: the
// reader arrives on a bare title with no restatement of why they are here.
//
// CHECK 2 — an entry page must contain a discriminator step. An entry page whose
// choices appear with no question above them asks the reader to pick an arm
// without telling them what they are deciding.
//
// LEGACY_LAYOUT lists the `layout: 'fn'` / fnHeader pages inherited from the
// pre-data renderer. Their header is an `fnHeader` block, which has no `sub`
// slot, so they cannot satisfy CHECK 1 until they are migrated to typed blocks.

import { FLOWS } from '../src/lib/signs/flows/index'
import { SIGNS } from '../src/lib/signs/registry'
import type { Block } from '../src/lib/signs/flowTypes'

let errors = 0
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++ }

const ENTRY_PAGES = new Set(SIGNS.map(s => s.flowId).filter(Boolean) as string[])

// Pages still on the legacy `.fn` header layout — exempt from CHECK 1 until the
// raw-html/fnHeader migration lands. Do not add rows: fix the page instead.
const LEGACY_LAYOUT = new Set<string>([
  'red-eye-coats', 'red-eye-iris', 'red-eye-bleed', 'red-eye-orbit',
  'abnormal-pupil-ophthalmic', 'abnormal-pupil-neuro',
  'dyspnoea-insp', 'dyspnoea-rest',
  'weakness-collapse',
])

const hasStep = (blocks: Block[]): boolean =>
  (blocks as any[]).some(b =>
    (b.kind === 'node' && b.variant === 'step') ||
    (b.kind === 'branch' && (b.columns ?? []).some((c: any) => hasStep(c.blocks ?? []))) ||
    (b.kind === 'fork' && (b.legs ?? []).some((l: any) => hasStep(l.blocks ?? []))))

for (const [id, page] of Object.entries(FLOWS)) {
  const blocks = page.blocks as any[]
  const [first, second] = blocks

  if (ENTRY_PAGES.has(id)) {
    if (!hasStep(blocks)) {
      fail(`[${id}] entry page has no discriminator step — the reader gets choices with no question above them.`)
    }
    continue
  }

  if (LEGACY_LAYOUT.has(id)) continue

  const headerIsEntry = first?.kind === 'node' && first.variant === 'entry'
  if (!headerIsEntry) {
    fail(`[${id}] sub-page does not open with an entry node (found ${first?.kind ?? 'nothing'}).`)
    continue
  }
  const statementStep = second?.kind === 'node' && second.variant === 'step' &&
    !String(second.text ?? '').trim().endsWith('?')
  const hasContext = Boolean(first.sub) || second?.kind === 'callout' || statementStep
  if (!hasContext) {
    fail(`[${id}] sub-page header has no context under it — give the entry node a one-line \`sub\` recapping the finding that led here.`)
  }
}

if (errors > 0) {
  console.error(`\n${errors} page-header issue(s) found. Entry pages ask a question; sub-pages restate the finding that got the reader there.`)
  process.exit(1)
} else {
  console.log(`✓ All flow pages open with the house header shape (${Object.keys(FLOWS).length} pages checked).`)
}
