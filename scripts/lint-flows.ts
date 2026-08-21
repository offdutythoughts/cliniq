// Validates alert blocks on flow entry pages (sign-level pages registered in SIGNS)
// Checks: (1) entry page has an alert block, (2) title matches canonical, (3) no onclick= in alert items

import { FLOWS } from '../src/lib/signs/flows/index'
import { DONT_MISS_TITLE } from '../src/lib/signs/flowTypes'
import { SIGNS } from '../src/lib/signs/registry'

// Signs that legitimately have no DON'T MISS block yet
const EXEMPT_NO_ALERT = new Set<string>([
  'coughing', 'sneezing', 'encephalopathy', 'diarrhoea', 'dyspnoea',
  'vomiting', 'jaundice', 'pale-mm', 'pupd', 'weakness', 'seizures',
  'myelopathy', 'vestibular', 'ataxia', 'cyanosis',
  'constipation', 'blind-eye', 'abnormal-pupil',
])

// Entry pages whose alert title is intentionally non-canonical
const EXEMPT_TITLE = new Set<string>([
  'wet-eye',  // "⚠️ DO NOT MISS — TREATABLE & SIGHT-RELEVANT" is sight-relevant context
])

let errors = 0

function fail(msg: string) {
  console.error(`  ✗ ${msg}`)
  errors++
}

// Only check the top-level entry pages (registered sign flowIds)
const entryIds = new Set(SIGNS.map(s => s.flowId).filter((id): id is string => !!id))

for (const id of entryIds) {
  const page = FLOWS[id]
  if (!page) {
    fail(`[${id}] flowId not found in FLOWS`)
    continue
  }

  const alertBlocks = page.blocks.filter(b => b.kind === 'alert')

  if (alertBlocks.length === 0) {
    if (!EXEMPT_NO_ALERT.has(id)) {
      fail(`[${id}] entry page has no alert block`)
    }
    continue
  }

  for (const b of alertBlocks) {

    // Check title
    if (!EXEMPT_TITLE.has(id) && b.title !== DONT_MISS_TITLE) {
      fail(`[${id}] alert title "${b.title}" ≠ canonical "${DONT_MISS_TITLE}"`)
    }

    // Check items for raw onclick
    for (const item of b.items ?? []) {
      if (typeof item === 'string' && item.includes('onclick=')) {
        fail(`[${id}] alert item contains raw onclick= — migrate to typed AlertItem`)
      }
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} flow lint error(s) found.`)
  process.exit(1)
} else {
  console.log(`✓ All entry-page alert blocks pass lint (${Object.keys(FLOWS).length} pages checked).`)
}
