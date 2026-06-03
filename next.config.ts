import type { NextConfig } from "next";

// The Playwright visual-regression webServer builds with NEXT_DIST_DIR set so it
// never clobbers a running `next dev` .next cache. In that mode we also skip the
// type-check (screenshots don't need it) and point Next at an isolated, gitignored
// tsconfig so its auto-reconfigure never edits the app's tsconfig.json.
const isTestBuild = Boolean(process.env.NEXT_DIST_DIR);

const nextConfig: NextConfig = {
  ...(isTestBuild
    ? {
        distDir: process.env.NEXT_DIST_DIR,
        typescript: { ignoreBuildErrors: true, tsconfigPath: "tsconfig.pw.json" },
      }
    : {}),
};

export default nextConfig;
