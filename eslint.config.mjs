import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // The clinical UI is rendered entirely as React components (the legacy
  // HTML-string engine was removed). Ban dangerouslySetInnerHTML so it can't
  // creep back in — authored HTML data must go through the audited <RichText>.
  {
    rules: { "react/no-danger": "error" },
  },
  // Passing globalIgnores REPLACES the defaults of eslint-config-next, so its
  // four have to be restated here — and anything else generated has to be added,
  // or `npx eslint` lints build output.
  //
  // Keep this in sync with .gitignore. It drifted once: .gitignore ignores
  // `/.next*/` as a GLOB, while this listed `.next/**` literally, so the
  // Playwright build dir `.next-pw/` was linted. It contributed 252 of the 270
  // errors a bare `npx eslint` reported — bundled vendor JS tripping
  // no-require-imports and no-this-alias — which drowned the handful of real
  // findings and made the command useless as a signal.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated, and gitignored — mirrors .gitignore. `.next*` is a glob so
    // .next-pw and any future .next-<variant> are covered by construction.
    ".next*/**",
    "coverage/**",
    "test-results/**",
    "playwright-report/**",
    "playwright/.cache/**",
    ".playwright-mcp/**",
    "scripts/tmp/**",
  ]),
]);

export default eslintConfig;
