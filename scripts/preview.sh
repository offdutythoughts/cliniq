#!/usr/bin/env bash
# Rebuild and serve the no-auth preview build.
#
# The preview server runs `next start` against a prebuilt .next-pw directory, so it
# serves a SNAPSHOT — editing db.ts or a component changes nothing until that
# directory is rebuilt. Easy to forget, and the failure is silent: you look at the
# page, see the old content, and conclude your edit did not work. That cost four
# manual rebuild-and-restart cycles in one session.
#
# This does the whole cycle in one command: free the port, rebuild, serve.
#
#   ./scripts/preview.sh           # rebuild and serve on 3456
#   PORT=3999 ./scripts/preview.sh # ...on another port
#   ./scripts/preview.sh --serve   # skip the rebuild, just serve what is built
set -euo pipefail

cd "$(dirname "$0")/.."
PORT="${PORT:-3456}"
SKIP_BUILD=false
[[ "${1:-}" == "--serve" ]] && SKIP_BUILD=true

# The auth-free build: no Convex URL, its own dist dir so it never clobbers the
# .next used by `npm run dev`.
export NEXT_PUBLIC_CONVEX_URL=
export NEXT_DIST_DIR=.next-pw

if lsof -ti:"$PORT" >/dev/null 2>&1; then
  echo "→ port $PORT is busy; stopping the process holding it"
  lsof -ti:"$PORT" | xargs kill 2>/dev/null || true
  sleep 1
fi

if ! $SKIP_BUILD; then
  echo "→ building (.next-pw)"
  npx next build
fi

echo "→ serving http://localhost:$PORT"
exec npx next start -p "$PORT"
