// Wording eval for Case Triage: does the same case, written different ways,
// give the same differentials?
//
//   npm run eval:wording            # every version once
//   npm run eval:wording -- --runs 3   # each version 3 times (model drift)
//
// Each version of each case in src/lib/caseTriage/wordingCases.ts goes through
// the LIVE extraction (the Convex dev deployment, so this calls the model and
// costs tokens), then through the local ranking — rankCase, exactly what the
// screen does. The extraction's problem list is re-cleaned locally with the
// lab values read from the notes, so the deterministic rules under test are
// this checkout's, even when the deployment is behind it. Prompt changes are
// only measured once deployed.
//
// Exits 1 if any run misses its expectation.

import { execFileSync } from 'node:child_process'
import type { ExtractedSignals } from '../convex/caseAnalysis'
import { cleanProblemList, INTERPRETATION_HEADING } from '../convex/problemList'
import { readLabs, withLabKeywords } from '../convex/labValues'
import { rankCase } from '../src/lib/caseTriage/rankCase'
import { WORDING_CASES } from '../src/lib/caseTriage/wordingCases'

const runsArg = process.argv.indexOf('--runs')
const RUNS = runsArg > -1 ? Math.max(1, Number(process.argv[runsArg + 1]) || 1) : 1

const sleep = (ms: number) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

function extract(caseText: string): ExtractedSignals {
  // The model's free tier allows 8,000 tokens a minute and one extraction
  // spends ~3,000, so a 429 is expected here: wait as long as it says, retry.
  for (let attempt = 0; ; attempt++) {
    try {
      // getAuthUserId only needs a "user|session" subject; nothing is looked up.
      const out = execFileSync('npx', [
        'convex', 'run', '--identity', JSON.stringify({ subject: 'eval|eval' }),
        'caseAnalysis:extractSignals', JSON.stringify({ caseText }),
      ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 22 })
      return JSON.parse(out) as ExtractedSignals
    } catch (e) {
      const err = String((e as { stderr?: string }).stderr ?? e)
      if (!/\(429\)/.test(err) || attempt >= 6) throw new Error(err.split('\n').find(l => /Error/.test(l)) ?? err.slice(0, 300))
      const wait = Number(err.match(/try again in ([\d.]+)s/)?.[1] ?? 20)
      sleep((wait + 2) * 1000)
    }
  }
}

let failures = 0
let total = 0
for (const c of WORDING_CASES) {
  console.log(`\n■ ${c.name}`)
  for (const v of c.versions) {
    const text = v.text + (v.interp ? `\n\n${INTERPRETATION_HEADING}\n${v.interp}` : '')
    for (let r = 0; r < RUNS; r++) {
      total++
      let line: string
      let ok: boolean
      try {
        const sig = extract(text)
        // Mirror extractSignals with this checkout's rules: grade the values,
        // backfill their keywords, re-clean the list.
        const labs = readLabs(text, sig.species)
        sig.diagKeywords = withLabKeywords(sig.diagKeywords, sig.signKeywords, labs)
        const kws = [...sig.signKeywords, ...sig.diagKeywords]
        const list = cleanProblemList(sig.problemList, kws, sig.signKeywords, labs)
        const ids = rankCase(sig, list).map(t => String(t.disease.id))
        const misses = [
          ids[0] !== c.expect.top && `top was ${ids[0] ?? 'nothing'}, ${c.expect.top} at #${ids.indexOf(c.expect.top) + 1 || '—'}`,
          ...(c.expect.present ?? []).filter(id => !ids.includes(id)).map(id => `${id} missing`),
          ...(c.expect.absent ?? []).filter(id => ids.includes(id)).map(id => `${id} at #${ids.indexOf(id) + 1}`),
        ].filter(Boolean)
        ok = misses.length === 0
        line = `${ids.slice(0, 3).join(' > ')}${ok ? '' : `   ✗ ${misses.join('; ')}`}\n      key: ${list.key.join(', ') || '—'}`
          + `\n      secondary: ${list.secondary.map(x => `${x.term} ← ${x.explainedBy}`).join(', ') || '—'}`
      } catch (e) {
        ok = false
        line = `✗ extraction failed: ${(e as Error).message.split('\n').slice(-3).join(' ')}`
      }
      if (!ok) failures++
      console.log(`  ${ok ? '✓' : '✗'} ${v.label}${RUNS > 1 ? ` (run ${r + 1})` : ''}: ${line}`)
    }
  }
}
console.log(`\n${total - failures}/${total} runs as expected`)
process.exit(failures > 0 ? 1 : 0)
