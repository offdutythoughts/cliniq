// Shared lint harness.
//
// Fourteen of the fifteen content lints declare their own `let errors = 0`, their
// own `fail()`, and their own `process.exit(1)` block. The duplication is mild on
// its own, but it means each lint prints a slightly different summary and there is
// no single place to add something every lint should have (a --json mode for CI
// annotations, a shared allow-list format, timing).

export interface Lint {
  fail(msg: string): void
  /** Call last. Prints the summary and exits non-zero if anything failed. */
  done(okMessage: string, remedy?: string): never
}

export function lint(name: string): Lint {
  let errors = 0
  return {
    fail(msg) {
      console.error(`  ✗ ${msg}`)
      errors++
    },
    done(okMessage, remedy) {
      if (errors > 0) {
        console.error(`\n${errors} ${name} issue(s) found.${remedy ? ' ' + remedy : ''}`)
        process.exit(1)
      }
      console.log(`✓ ${okMessage}`)
      process.exit(0)
    },
  }
}
