// Runs every content lint in one command.
//
// `lint:content` used to be seventeen chained `npm run` calls. Each one spawned a
// fresh npm, then a fresh npx, then a fresh tsx, then re-imported and re-parsed a
// 1.3 MB db.ts — seventeen times over, strictly one after another. It took 32
// seconds, and almost none of that was doing the actual checking.
//
// The lints are independent, so they run in parallel here, bounded by CPU count.
// Output is buffered per lint and printed in a stable order, so a parallel run
// still reads like a sequential one and CI logs stay diffable.
//
// Each lint keeps its own entry point (`npm run lint:tiles` still works while you
// iterate on one). This is the aggregate that CI and pre-commit use.
//
// THE LIST IS CHECKED AGAINST THE DIRECTORY, not trusted. `lint-disease-crams`
// was written, wired into package.json, and then left out of this array — so for
// its whole life it ran only when someone typed its name, and never once gated a
// commit. A hand-maintained list of the things that check us is exactly the list
// nobody re-reads. Now every `lint-*.ts` on disk must appear in LINTS or this
// command fails and tells you which one is missing.

import { execFile } from 'node:child_process'
import { cpus } from 'node:os'
import * as fs from 'node:fs'
import * as path from 'path'

// Order is the report order, not the execution order — group by what they check.
const LINTS = [
  'lint-walk', 'lint-schema', 'lint-deadcontent', 'report-refs',
  'lint-protocol-actions', 'lint-flows', 'lint-disease-blocks', 'lint-disease-sections', 'lint-conf-supp',
  'lint-lesions', 'lint-chips', 'lint-choices', 'lint-steps', 'lint-prose', 'lint-cats', 'lint-headers',
  'lint-tiles', 'lint-forks', 'lint-alphas', 'lint-species', 'lint-emoji', 'lint-disease-crams',
]

// Flags a lint needs when run as part of the aggregate. A worklist generator
// prints hundreds of known findings by default, which is the right thing when
// you invoke it directly and pure noise in a CI log — `--ci` switches it to a
// one-line ratchet (see lib/ratchet.ts).
const ARGS: Record<string, string[]> = {
  'lint-disease-crams': ['--ci'],
}

/** Every `lint-*.ts` in this directory must be listed above. `report-*.ts` are
 *  opt-in — some are reports we don't gate on (report-groups). */
function assertNoneMissing(): void {
  const onDisk = fs.readdirSync(__dirname)
    .filter(f => f.startsWith('lint-') && f.endsWith('.ts') && f !== 'lint-all.ts')
    .map(f => f.slice(0, -3))
  const listed = new Set(LINTS)
  const missing = onDisk.filter(n => !listed.has(n))
  if (missing.length) {
    console.error(`✗ lint-all: ${missing.length} lint(s) exist but are not in LINTS: ${missing.join(', ')}`)
    console.error('  Add them to scripts/lint-all.ts (with an ARGS entry if they need flags),')
    console.error('  or rename to report-*.ts if the script is a report rather than a gate.')
    process.exit(1)
  }
  const absent = LINTS.filter(n => !fs.existsSync(path.join(__dirname, `${n}.ts`)))
  if (absent.length) {
    console.error(`✗ lint-all: LINTS names a script that does not exist: ${absent.join(', ')}`)
    process.exit(1)
  }
}

interface Result { name: string; code: number; out: string }

const run = (name: string): Promise<Result> =>
  new Promise(resolve => {
    const script = path.join(__dirname, `${name}.ts`)
    // tsx is a declared devDependency, so its binary is in node_modules/.bin —
    // call it directly rather than paying npx's resolve on every lint.
    execFile(
      path.join(__dirname, '../node_modules/.bin/tsx'),
      [script, ...(ARGS[name] ?? [])],
      { cwd: path.join(__dirname, '..'), maxBuffer: 32 * 1024 * 1024 },
      (err, stdout, stderr) => {
        const code = err && typeof (err as { code?: number }).code === 'number' ? (err as { code: number }).code : err ? 1 : 0
        resolve({ name, code, out: (stdout + stderr).trimEnd() })
      },
    )
  })

async function main() {
  assertNoneMissing()
  const started = Date.now()
  const limit = Math.max(2, Math.min(cpus().length, 8))
  const queue = [...LINTS]
  const results = new Map<string, Result>()

  const worker = async () => {
    for (;;) {
      const name = queue.shift()
      if (!name) return
      results.set(name, await run(name))
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))

  let failed = 0
  for (const name of LINTS) {
    const r = results.get(name)
    if (!r) continue
    if (r.code !== 0) failed++
    if (r.out) console.log(r.out)
  }
  const secs = ((Date.now() - started) / 1000).toFixed(1)
  if (failed) {
    console.error(`\n✗ ${failed} of ${LINTS.length} content lints failed (${secs}s).`)
    process.exit(1)
  }
  console.log(`\n✓ All ${LINTS.length} content lints passed (${secs}s, ${limit}-way parallel).`)
}

main()
