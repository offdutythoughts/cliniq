// One recursive walk over the source tree.
//
// The block-tree twin of this problem is documented in lib/walk.ts. This is the
// smaller one: lint-alphas and lint-emoji each carried their own recursive
// readdir, and they already disagreed — one skipped `.test.tsx` files, the other
// did not. A lint that silently skips files is a lint that passes for the wrong
// reason, so the walk lives here once.

import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** Every .ts/.tsx file under `dir`, depth-first. Test files are excluded by
 *  default: they contain fixtures that deliberately violate the rules the
 *  content lints enforce. */
export function sourceFiles(dir: string, { includeTests = false } = {}): string[] {
  const out: string[] = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) { out.push(...sourceFiles(p, { includeTests })); continue }
    if (!/\.tsx?$/.test(name)) continue
    if (!includeTests && /\.test\.tsx?$/.test(name)) continue
    out.push(p)
  }
  return out
}
