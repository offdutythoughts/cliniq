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
# Two people promoting at once is also handled. The fetch and the push are not
# atomic, so a promotion landing in that window rejects ours as non-fast-forward.
# That is not an error to force through — force-with-lease would delete theirs —
# so we re-read the remote: if their promotion already carries what ours would
# have, we are done; if not, we rebuild on the new tip and retry.
#
# Every exit path restores the branch you started on. Before, a rejected push or
# a merge conflict left you sitting on `production` mid-promotion.
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

# From here the repo is mid-promotion: checked out on `production` with a merge
# either in progress or made but unpushed. Every exit path has to undo that.
# Without this, a rejected push left the caller stranded on `production` holding
# an orphaned merge commit — `set -e` skipped the checkout that used to follow
# the push — and a merge conflict left them there with conflict markers too.
restore() {
  # Only true on the conflict path, and git's own output does not say that
  # nothing was pushed or where to fix it.
  if git rev-parse --quiet --verify MERGE_HEAD >/dev/null 2>&1; then
    echo "→ merge conflict: nothing was pushed. Resolve it on main, then re-run." >&2
  fi
  git merge --abort 2>/dev/null || true
  git checkout --quiet "$STARTED_ON" 2>/dev/null || true
  # Local `production` is a pointer at the remote, never history worth keeping
  # (see the note at the top), so drop whatever we built on it.
  if [[ "$STARTED_ON" != "production" ]]; then
    git fetch --quiet origin 2>/dev/null || true
    git branch -f production origin/production 2>/dev/null || true
  fi
}
trap restore EXIT

# The fetch above and the push below are not atomic. A second promotion landing
# in that window makes the push non-fast-forward, which is not an error to force
# through — force-with-lease here would delete their promotion. Re-read the
# remote instead and decide.
ATTEMPTS=3
for attempt in $(seq 1 $ATTEMPTS); do
  # Reset the local branch to the remote rather than merging into whatever it held.
  git checkout --quiet -B production origin/production
  # -m is explicit: an editor-driven merge once committed the comment template into
  # the message, which then had to be amended and force-pushed to clean up.
  git merge --no-edit -m "Merge main into production" main

  if git push origin production; then
    trap - EXIT
    git checkout --quiet "$STARTED_ON"
    echo -e "\n✓ promoted. Vercel will deploy from origin/production."
    exit 0
  fi

  echo "→ push rejected: origin/production moved (attempt $attempt/$ATTEMPTS)"
  git fetch --quiet origin

  # If their promotion already carries everything ours would have, we are done —
  # this is the common case, two people promoting the same commits at once.
  if git merge-base --is-ancestor origin/main origin/production; then
    trap - EXIT
    restore
    echo -e "\n✓ production already carries everything on main — promoted concurrently."
    exit 0
  fi

  # Otherwise they promoted something else. Rebuild on the new tip and retry.
done

fail "origin/production kept moving across $ATTEMPTS attempts. Re-run when it settles."
