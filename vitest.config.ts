import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    // convex/ holds convex-test suites for the backend functions; src/ the rest.
    include: ['src/**/*.test.ts', 'convex/**/*.test.ts'],
  },
})
