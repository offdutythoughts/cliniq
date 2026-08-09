// A ratchet: a lint that cannot fail today's build on yesterday's backlog, but
// refuses to let that backlog grow.
//
// Two findings in this repo are real but too large to fix in one pass — 120 rows
// with content stranded behind a redirect, and 166 disease pages with no citation.
// The usual options are both bad: fail the build (nothing can merge until a
// multi-day migration lands) or print a warning (which everyone learns to skip).
//
// A ratchet takes the current number as the high-water mark and fails only when it
// rises. Fixing things is rewarded — when the count drops the lint tells you to
// lower the mark, and the lower number is then enforced. The backlog can only
// shrink.
//
// Baselines live in scripts/baselines.json so the movement is visible in review:
// a PR that raises one has to say why in the diff.

import * as fs from 'fs'
import * as path from 'path'

const FILE = path.join(__dirname, '../baselines.json')

type Baselines = Record<string, number>

const read = (): Baselines =>
  fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : {}

/** Compare `count` against the recorded mark for `key`.
 *  Returns the message to print and whether the build should fail. */
export function ratchet(key: string, count: number, noun: string): { ok: boolean; message: string } {
  const baselines = read()
  const mark = baselines[key]

  if (mark === undefined) {
    return {
      ok: true,
      message:
        `no baseline recorded for "${key}" — writing ${count}.\n` +
        `  Commit scripts/baselines.json so this becomes the high-water mark.`,
    }
  }
  if (count > mark) {
    return {
      ok: false,
      message:
        `${count} ${noun} — up from the baseline of ${mark}.\n` +
        `  This change ADDS ${count - mark}. Fix them, or raise the mark in ` +
        `scripts/baselines.json and explain why in the commit.`,
    }
  }
  if (count < mark) {
    return {
      ok: true,
      message:
        `${count} ${noun} — down from ${mark}. ${mark - count} fixed.\n` +
        `  Lower "${key}" to ${count} in scripts/baselines.json to lock the gain in.`,
    }
  }
  return { ok: true, message: `${count} ${noun}, unchanged from the baseline.` }
}

/** Write a mark. Used by --write to seed or lower a baseline deliberately. */
export function setBaseline(key: string, count: number): void {
  const baselines = read()
  baselines[key] = count
  const sorted = Object.fromEntries(Object.entries(baselines).sort(([a], [b]) => a.localeCompare(b)))
  fs.writeFileSync(FILE, JSON.stringify(sorted, null, 2) + '\n')
}
