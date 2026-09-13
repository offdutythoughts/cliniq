// Shared lint harness.
//
// Fourteen of the fifteen content lints declared their own `let errors = 0`, their
// own `fail()`, and their own `process.exit(1)` block. The duplication is mild on
// its own, but it means each lint prints a slightly different summary and there is
// no single place to add something every lint should have (a --json mode for CI
// annotations, a shared allow-list format, timing).
//
// Three verbs, because that is what the lints actually needed to stop hand-rolling:
//
//   fail() — a violation. Any failure makes the run exit non-zero.
//   warn() — a smell worth printing that must not break the build. Counted and
//            reported alongside the verdict, so warnings stay visible instead of
//            scrolling past unnoticed.
//   note() — a detail line printed UNDER the ✓ verdict. Buffered rather than
//            printed inline, because `done()` exits: a lint with trailing
//            statistics (lint-species' toggle counts) could not otherwise adopt
//            this harness at all without reordering its own output.

export interface Lint {
  /** A violation. Exits non-zero at done(). */
  fail(msg: string): void
  /** A smell: printed and counted, but never fails the build. */
  warn(msg: string): void
  /** A detail line, printed under the ✓ verdict in the order added. */
  note(msg: string): void
  /** Call last. Prints the summary and exits non-zero if anything failed. */
  done(okMessage: string, remedy?: string): never
}

export function lint(name: string): Lint {
  let errors = 0
  let warnings = 0
  const notes: string[] = []
  return {
    fail(msg) {
      console.error(`  ✗ ${msg}`)
      errors++
    },
    warn(msg) {
      console.warn(`  ⚠ ${msg}`)
      warnings++
    },
    note(msg) {
      notes.push(msg)
    },
    done(okMessage, remedy) {
      const warnSuffix = warnings ? `, ${warnings} warning(s)` : ''
      if (errors > 0) {
        console.error(`\n${errors} ${name} issue(s) found${warnSuffix}.${remedy ? ' ' + remedy : ''}`)
        process.exit(1)
      }
      console.log(`✓ ${okMessage}${warnings ? ` (${warnings} warning(s))` : ''}`)
      for (const n of notes) console.log(n)
      process.exit(0)
    },
  }
}
