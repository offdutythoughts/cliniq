// Warns when the deployed Convex backend has drifted from the local convex/ code.
//
// Why this exists: as of f2991e0, `vercel.json` builds the frontend only. Vercel
// does not deploy Convex, so the two halves ship separately and a `convex/`
// change merged to main reaches production only when someone runs
// `npx convex deploy` by hand. A green Vercel deploy says nothing about the
// backend, and nothing else says anything at all — this is the missing signal.
//
// READ-ONLY, BY CONSTRUCTION. It shells out to exactly one command,
// `npx convex function-spec --prod`, which lists deployed functions. It must
// never call `convex deploy`, `convex run`, or `convex env set`; deciding to
// deploy is a human's call (see the deploy-guard skill).
//
// TWO RULES LEARNED THE HARD WAY, both about capturing CLI output:
//
//   1. NEVER add `-v` to a `convex deploy --dry-run` and parse that instead.
//      The verbose flag prints the deployment's entire environmentVariables map
//      to stdout in plaintext — JWT_PRIVATE_KEY and AUTH_RESEND_KEY included.
//      Anywhere output is captured (CI logs, a pasted terminal dump) that is a
//      secret leak. `function-spec` returns only { url, functions } and is safe.
//
//   2. NEVER merge stderr into stdout. The CLI writes version-update and
//      "AI files are out of date" banners to stderr; folding them in with 2>&1
//      and then parsing from the first `{` silently yields a TRUNCATED object.
//      That exact mistake reported `accounts.js` as undeployed when it was
//      deployed, and nearly caused an unnecessary production push. stdio here
//      pipes stdout and ignores stderr, and the parse is strict.
//
// WHAT IT COMPARES, AND WHAT IT CANNOT SEE. Prod reports identifiers like
// `accounts.js:deleteAccount`. Locally we recover function names by regex over
// `export const NAME = query(...)` and friends. That is deliberately partial:
//
//   • Modules that declare NO function this way are SKIPPED, not flagged. Some
//     legitimately have none (`http.ts` exports an httpRouter; `emails.ts`
//     exports Email components), and `auth.ts` exports its functions by
//     destructuring `convexAuth()`, which no regex should try to follow.
//     Skipping costs coverage; guessing would cost false alarms, and a drift
//     warning nobody trusts is worse than no warning.
//   • It compares the SET OF NAMES, not their bodies. A changed implementation
//     inside an already-deployed function is invisible here. This catches
//     "you added or removed a function and never pushed", which is the failure
//     the Vercel split actually introduced.
//
// Exit codes: 0 in sync, 0 with a note when the check cannot run (no CLI, not
// logged in, no network — the same fail-open posture as promote.sh's deploy
// watch, because an unreadable verdict is not evidence of drift), 1 on drift.

import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import * as path from 'path'

const CONVEX_DIR = path.join(__dirname, '..', 'convex')

/** Files under convex/ that are never function modules. */
const NOT_A_MODULE = /^(schema|auth\.config|tsconfig|convex\.config)\.ts$|\.test\.ts$/

/** `export const name = query(` — and every other Convex function constructor. */
const EXPORTED_FN =
  /^export\s+const\s+([A-Za-z0-9_]+)\s*=\s*(?:query|mutation|action|internalQuery|internalMutation|internalAction|httpAction)\s*\(/gm

type Spec = { url?: string; functions?: { identifier?: string }[] }

/** Deployed function names, keyed by module ("accounts.js" → {deleteAccount…}). */
function deployed(): Map<string, Set<string>> | null {
  let raw: string
  try {
    // stdout only: stderr carries banners that corrupt the parse (see rule 2).
    raw = execFileSync('npx', ['convex', 'function-spec', '--prod'], {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return null
  }
  let spec: Spec
  try {
    spec = JSON.parse(raw) as Spec
  } catch {
    return null
  }
  const byModule = new Map<string, Set<string>>()
  for (const fn of spec.functions ?? []) {
    // HTTP routes have no identifier — they are routes, not named functions.
    if (!fn.identifier) continue
    const [mod, name] = fn.identifier.split(':')
    if (!mod || !name) continue
    if (!byModule.has(mod)) byModule.set(mod, new Set())
    byModule.get(mod)!.add(name)
  }
  return byModule
}

/** Locally declared function names, keyed by the module name prod would use. */
function local(): Map<string, Set<string>> {
  const byModule = new Map<string, Set<string>>()
  for (const file of readdirSync(CONVEX_DIR)) {
    if (!file.endsWith('.ts') || NOT_A_MODULE.test(file)) continue
    const src = readFileSync(path.join(CONVEX_DIR, file), 'utf8')
    const names = new Set([...src.matchAll(EXPORTED_FN)].map(m => m[1]))
    // No parseable functions ⇒ skipped entirely, never reported (see header).
    if (names.size > 0) byModule.set(file.replace(/\.ts$/, '.js'), names)
  }
  return byModule
}

const prod = deployed()
if (prod === null) {
  console.log('· convex drift check skipped — could not read the prod function spec.')
  console.log('  Needs the Convex CLI and a logged-in session: npx convex login')
  process.exit(0)
}

const mine = local()
const undeployed: string[] = []
const stale: string[] = []

for (const [mod, names] of mine) {
  const live = prod.get(mod)
  if (!live) {
    undeployed.push(`${mod} — whole module absent from prod (${[...names].sort().join(', ')})`)
    continue
  }
  for (const n of [...names].sort()) if (!live.has(n)) undeployed.push(`${mod}:${n}`)
  for (const n of [...live].sort()) if (!names.has(n)) stale.push(`${mod}:${n}`)
}

const checked = [...mine.keys()].sort()
if (undeployed.length === 0 && stale.length === 0) {
  console.log(`✓ Convex prod matches local convex/ (${checked.length} modules checked: ${checked.join(', ')})`)
  const skipped = readdirSync(CONVEX_DIR)
    .filter(f => f.endsWith('.ts') && !NOT_A_MODULE.test(f) && !mine.has(f.replace(/\.ts$/, '.js')))
  if (skipped.length) console.log(`  (no parseable functions, not checked: ${skipped.join(', ')})`)
  process.exit(0)
}

if (undeployed.length) {
  console.error('\n✗ local convex/ functions that are NOT on prod:')
  for (const d of undeployed) console.error(`    ${d}`)
  console.error('\n  Vercel does not deploy Convex. Push the backend yourself:  npx convex deploy')
}
if (stale.length) {
  console.error('\n✗ functions live on prod with no local definition:')
  for (const d of stale) console.error(`    ${d}`)
  console.error('\n  Deleted locally but still serving traffic — deploy to remove them.')
}
process.exit(1)
