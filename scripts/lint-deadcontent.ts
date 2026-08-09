// Catches clinical writing that no user can ever reach.
//
// A lesion sub-type with `directDis` + `dis` does not render its own leaf page —
// SubTypeDetailView returns <DiseasePageView> immediately (see its first lines).
// Any content authored on that row is therefore invisible, forever, with nothing
// to indicate it.
//
// This is not hypothetical. 161 of the 278 `note` fields retired from this DB sat
// on redirecting rows: real clinical writing — doses, decision rules, prognoses —
// that had never been seen. Each had to be checked against its destination page
// before deletion, and four carried facts the disease page genuinely lacked.
//
// The fix is to fail early: if a row redirects, its content belongs on the disease
// page it points at.

import { DB } from '../src/data/db'
import { lint } from './lib/lint'
import { ratchet, setBaseline } from './lib/ratchet'

const { fail, done } = lint('dead-content')
// 120 rows already strand content behind a redirect. Ratcheted rather than hard-
// failed: the backlog can shrink but never grow. See scripts/lib/ratchet.ts.
const WRITE = process.argv.includes('--write')
const findings: string[] = []
const note = (m: string) => findings.push(m)

// Fields SubTypeDetailView would render if the row were not redirecting, and
// that an author CHOSE to add.
//
// `signs` is deliberately excluded even though it is equally unrendered on a
// redirecting row: LesionRow declares it required, so every lesion must carry one
// and flagging it would blame authors for satisfying the type. If that field is
// ever made optional, add it here — 179 redirecting rows currently populate it.
const RENDERED = [
  'etiology', 'patho', 'diag', 'treat', 'monitor', 'prog', 'ddx', 'pearl', 'signalment',
] as const

// Fields still consumed while redirecting: routing, taxonomy and the tags the
// lesion-location grid draws before you ever tap through.
const STRUCTURAL = new Set([
  'id', 'loc', 'loc_name', 'sp', 'cat', 'sub', 'urg', 'dis', 'directDis', 'signs',
  'filter', 'proto', 'zoo', 'noDiffFlow', 'onset',
])

let redirecting = 0
for (const row of DB.lesion_type as unknown as Record<string, unknown>[]) {
  if (!(row.directDis && row.dis)) continue
  redirecting++
  const orphaned = RENDERED.filter(f => typeof row[f] === 'string' && (row[f] as string).trim())
  if (!orphaned.length) continue
  note(
    `${row.id} redirects to ${row.dis} but authors ${orphaned.join(', ')} — ` +
    `SubTypeDetailView never renders these. Move the content onto ${row.dis}, then delete the field(s).`,
  )
}

// Guard the guard: if the redirect mechanism is ever renamed, this lint would
// quietly pass on zero rows and stop protecting anything.
if (redirecting === 0) {
  fail('no redirecting rows found at all — has `directDis` been renamed? This lint is no longer checking anything.')
}
// Any field that is neither structural nor rendered is unclassified — the lint
// would silently ignore content in it.
const unknown = new Set<string>()
for (const row of DB.lesion_type as unknown as Record<string, unknown>[]) {
  for (const k of Object.keys(row)) {
    if (!STRUCTURAL.has(k) && !(RENDERED as readonly string[]).includes(k)) unknown.add(k)
  }
}
if (unknown.size) {
  fail(`lesion fields not classified as structural or rendered: ${[...unknown].join(', ')} — add them to one list in this file.`)
}

// The backlog is ratcheted; the structural guards above fail outright.
if (WRITE) {
  setBaseline('dead-content', findings.length)
  console.log(`baseline written: dead-content = ${findings.length}`)
} else {
  const r = ratchet('dead-content', findings.length, 'redirecting rows strand content')
  // Only name the offenders when the count has risen — otherwise 120 lines of
  // known backlog drown the real output on every run.
  if (!r.ok) for (const f of findings) fail(f)
  console.log(`${r.ok ? 'ℹ' : '✗'} ${r.message}`)
  if (!r.ok) process.exit(1)
}

done(`${redirecting} lesion rows redirect to a disease page; none has newly stranded content.`)
