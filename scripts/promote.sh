#!/usr/bin/env bash
# Promote main to production.
#
# Why this exists: the obvious sequence —
#
#     git checkout production && git merge origin/production && git merge main
#
# breaks when the local `production` branch has drifted from the remote, which it
# had. `git merge origin/production` hit a content conflict and stopped, leaving
# conflict markers in the working tree and the repo mid-merge on the wrong branch.
# Local `production` turned out to hold nine merge commits that existed nowhere
# else and contained nothing that was not already on main.
#
# The fix is to stop treating local `production` as a branch with history worth
# keeping. It is a pointer at the remote. `checkout -B` resets it to
# origin/production every time, so there is nothing to diverge.
#
#   ./scripts/promote.sh            # verify, promote, push
#   ./scripts/promote.sh --dry-run  # verify and show what would happen
set -euo pipefail

cd "$(dirname "$0")/.."
DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

fail() { printf '\n✗ %s\n' "$1" >&2; exit 1; }

# A promotion must start from a clean tree — a half-finished edit would otherwise
# be carried onto production by the checkout.
[[ -z "$(git status --porcelain --untracked-files=no)" ]] \
  || fail "working tree has uncommitted changes. Commit or stash them first."

echo "→ fetching"
git fetch --quiet origin

git rev-parse --verify --quiet main >/dev/null || fail "no local main branch"
[[ -z "$(git log --oneline origin/main..main)" ]] \
  || fail "local main is ahead of origin/main. Push it first: git push origin main"

AHEAD=$(git log --oneline origin/production..origin/main | wc -l | tr -d ' ')
if [[ "$AHEAD" == "0" ]]; then
  echo "✓ production already carries everything on main. Nothing to promote."
  exit 0
fi

echo "→ $AHEAD commit(s) to promote:"
git log --oneline --no-decorate origin/production..origin/main | sed 's/^/    /'

if $DRY_RUN; then
  echo -e "\n(dry run — nothing changed)"
  exit 0
fi

STARTED_ON=$(git rev-parse --abbrev-ref HEAD)
# Reset the local branch to the remote rather than merging into whatever it held.
git checkout --quiet -B production origin/production
# -m is explicit: an editor-driven merge once committed the comment template into
# the message, which then had to be amended and force-pushed to clean up.
git merge --no-edit -m "Merge main into production" main
git push origin production
git checkout --quiet "$STARTED_ON"

echo -e "\n✓ promoted. Vercel will deploy from origin/production."
