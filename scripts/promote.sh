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
#   ./scripts/promote.sh                # verify, promote, push, watch the deploy
#   ./scripts/promote.sh --dry-run      # verify and show what would happen
#   ./scripts/promote.sh --skip-ci      # promote without waiting for a green CI
#   ./scripts/promote.sh --skip-convex  # promote with the backend out of sync
#   ./scripts/promote.sh --no-watch     # push and exit without watching the deploy
set -euo pipefail

cd "$(dirname "$0")/.."

fail() { printf '\n✗ %s\n' "$1" >&2; exit 1; }

DRY_RUN=false
SKIP_CI=false
SKIP_CONVEX=false
WATCH=true
for arg in "$@"; do
  case "$arg" in
    --dry-run)     DRY_RUN=true ;;
    --skip-ci)     SKIP_CI=true ;;
    --skip-convex) SKIP_CONVEX=true ;;
    --no-watch)    WATCH=false ;;
    *) fail "unknown option: $arg (expected --dry-run, --skip-ci, --skip-convex or --no-watch)" ;;
  esac
done

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

# ── CI gate ──────────────────────────────────────────────────────────────────
#
# This script pushes on demand and Vercel deploys straight from that push, so
# nothing but the operator's memory stood between a red main and production. A
# visual regression shipped that way: promoted at 05:23, CI went red at 05:28.
#
# Fails CLOSED. An unreadable verdict blocks the promotion rather than waving it
# through, because a gate that silently skips itself is worse than no gate —
# --skip-ci is the deliberate override for a hotfix.
#
# The one exception is "no run at all", which is a real, benign case: the
# baseline bot pushes with GITHUB_TOKEN, and GitHub deliberately does not start
# workflows for those commits. Blocking there would strand a promotion behind a
# run that is never coming, so it warns loudly and continues.
if $SKIP_CI; then
  echo "→ CI check skipped (--skip-ci)"
else
  SLUG=$(git remote get-url origin | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')
  SHA=$(git rev-parse origin/main)

  # Read the verdict through `gh api`, not a bare curl. Unauthenticated
  # api.github.com allows 60 requests/hour per IP, and that bucket is shared
  # with every other tool on the machine — exhausting it made this gate fail
  # closed on a green main and blocked a promotion for no reason, while
  # `gh api rate_limit` still read 5000/5000 because it reports the
  # authenticated bucket. `gh` sends the stored token and gets 5000/hour.
  # curl stays as the fallback so a machine without gh can still read a
  # verdict rather than being forced onto --skip-ci.
  RUNS_PATH="repos/$SLUG/actions/runs?branch=main&per_page=20"
  RUNS=""
  if command -v gh >/dev/null 2>&1; then
    RUNS=$(gh api "$RUNS_PATH" 2>/dev/null) || RUNS=""
  fi
  if [[ -z "$RUNS" ]]; then
    RUNS=$(curl -fsS --max-time 15 "https://api.github.com/$RUNS_PATH" 2>/dev/null) \
      || fail "could not reach the GitHub API to read CI — gh is missing or unauthenticated
    and the unauthenticated curl fallback failed too, usually the 60/hour per-IP
    limit. Check with: curl -s https://api.github.com/rate_limit
    Fix by running 'gh auth login', or re-run with --skip-ci to promote regardless."
  fi

  VERDICT=$(jq -r --arg sha "$SHA" \
    '[.workflow_runs[] | select(.name == "CI" and .head_sha == $sha)][0]
     | if . == null then "none" else (.conclusion // .status) end' <<<"$RUNS")

  case "$VERDICT" in
    success)
      echo "→ CI green on ${SHA:0:7}" ;;
    none)
      echo "→ ⚠ no CI run for ${SHA:0:7} (bot pushes do not trigger workflows) — promoting unverified" ;;
    queued|in_progress|pending|waiting|requested)
      fail "CI is still $VERDICT on ${SHA:0:7}. Wait for it, or re-run with --skip-ci." ;;
    *)
      fail "CI is $VERDICT on ${SHA:0:7}. Fix main first, or re-run with --skip-ci.
    https://github.com/$SLUG/actions?query=branch%3Amain" ;;
  esac
fi

# ── Convex backend gate ──────────────────────────────────────────────────────
#
# This script promotes the FRONTEND. Since f2991e0 the backend ships separately —
# Vercel does not deploy Convex — so a promote can put a frontend into production
# that calls functions the live backend does not have. The CI gate cannot see
# that: CI never talks to the Convex deployment.
#
# Fails CLOSED on drift it can actually see, matching the CI gate; --skip-convex
# is the deliberate override for promoting a frontend while backend work is
# deliberately pending. It does NOT fail when the check cannot run — the checker
# exits 0 with a note when the Convex CLI is missing or not logged in, which is
# normal on a machine that only ever ships the frontend, and an unreadable
# verdict is not evidence of drift.
if $SKIP_CONVEX; then
  echo "→ Convex drift check skipped (--skip-convex)"
elif [[ ! -x node_modules/.bin/tsx ]]; then
  echo "→ ⚠ Convex drift check skipped: node_modules/.bin/tsx not found (npm install)"
else
  if CONVEX_OUT=$(node_modules/.bin/tsx scripts/check-convex-drift.ts 2>&1); then
    # Either "in sync" or the checker's own skip note; print its first line so the
    # promote log says which.
    echo "→ $(head -n1 <<<"$CONVEX_OUT")"
  else
    printf '%s\n' "$CONVEX_OUT" >&2
    fail "the Convex backend has drifted from convex/. Deploy it first (npx convex deploy),
    or re-run with --skip-convex if this frontend does not depend on the difference."
  fi
fi

if $DRY_RUN; then
  echo -e "\n(dry run — nothing changed)"
  exit 0
fi

# ── Deploy watch ─────────────────────────────────────────────────────────────
#
# The CI gate above proves main is good. It says NOTHING about whether the build
# Vercel runs off the push actually succeeds, because the two are independent:
# nothing in ci.yml gates the deploy, and the production build does work CI never
# performs — it runs `npx convex deploy` before `npm run build`. A promotion once
# went green on CI and then failed in Vercel on a missing CONVEX_DEPLOY_KEY, and
# the only reason it was noticed is that somebody went looking.
#
# REPORTS, DOES NOT PREVENT. This runs after the push, because the deploy does
# not exist until the push creates it. It cannot stop a bad deploy — it makes one
# impossible to miss, and tells you the alias did not move. Preventing would mean
# building a preview first and promoting that artifact, which is a different
# (and much larger) design.
#
# Degrades to a warning, never a false alarm: no token, no linked project, no
# jq, an unreachable API or a slow build all print a note and leave the exit
# status alone. The promotion itself already succeeded by then, so failing the
# script over an unreadable verdict would be a lie about what happened. Only a
# deployment Vercel positively reports as ERROR or CANCELED exits non-zero.
DEPLOY_POLL_SECONDS=10
DEPLOY_TIMEOUT_SECONDS=600

# The CLI stores its token per-platform; $VERCEL_TOKEN wins when set (CI, or an
# operator who would rather not have the script read the CLI's state at all).
vercel_token() {
  if [[ -n "${VERCEL_TOKEN:-}" ]]; then printf '%s' "$VERCEL_TOKEN"; return 0; fi
  local f
  for f in "$HOME/Library/Application Support/com.vercel.cli/auth.json" \
           "${XDG_DATA_HOME:-$HOME/.local/share}/com.vercel.cli/auth.json"; do
    [[ -r "$f" ]] || continue
    jq -re '.token // empty' "$f" 2>/dev/null && return 0
  done
  return 1
}

watch_deploy() {
  local sha="$1" short="${1:0:7}"
  local token project team

  command -v jq >/dev/null 2>&1 || { echo "→ ⚠ deploy watch skipped: jq not installed"; return 0; }
  token=$(vercel_token) || { echo "→ ⚠ deploy watch skipped: no Vercel token (set VERCEL_TOKEN, or run: vercel login)"; return 0; }
  [[ -r .vercel/project.json ]] || { echo "→ ⚠ deploy watch skipped: no .vercel/project.json (run: vercel link)"; return 0; }
  project=$(jq -re '.projectId // empty' .vercel/project.json) || { echo "→ ⚠ deploy watch skipped: no projectId in .vercel/project.json"; return 0; }
  team=$(jq -r '.orgId // empty' .vercel/project.json)

  local url="https://api.vercel.com/v6/deployments?projectId=$project&target=production&limit=20"
  [[ -n "$team" ]] && url="$url&teamId=$team"

  echo "→ watching the production deploy for $short …"
  local waited=0 body state="" uid=""
  while (( waited < DEPLOY_TIMEOUT_SECONDS )); do
    body=$(curl -fsS --max-time 15 -H "Authorization: Bearer $token" "$url" 2>/dev/null) || body=""
    if [[ -n "$body" ]]; then
      # Match on the commit, not on "newest": a concurrent promotion or a
      # redeploy of something else must not be mistaken for ours.
      state=$(jq -r --arg sha "$sha" '[.deployments[] | select(.meta.githubCommitSha == $sha)][0].readyState // ""' <<<"$body")
      uid=$(jq -r --arg sha "$sha"   '[.deployments[] | select(.meta.githubCommitSha == $sha)][0].uid // ""'        <<<"$body")
    fi
    case "$state" in
      READY)
        echo "✓ deploy READY — https://vetic.app is serving $short"
        return 0 ;;
      ERROR|CANCELED)
        printf '\n✗ the deploy for %s finished %s. The git promotion succeeded, but production is\n' "$short" "$state" >&2
        printf '  STILL SERVING THE PREVIOUS BUILD — a failed build never takes the alias.\n\n' >&2
        printf '  Build log:  vercel inspect %s --logs\n' "${uid:-<deployment>}" >&2
        printf '  Retry:      vercel redeploy %s\n' "${uid:-<deployment>}" >&2
        return 1 ;;
    esac
    sleep "$DEPLOY_POLL_SECONDS"
    waited=$(( waited + DEPLOY_POLL_SECONDS ))
  done

  echo "→ ⚠ deploy still ${state:-unreported} after ${DEPLOY_TIMEOUT_SECONDS}s. Not a failure —"
  echo "  a slow build outlives the watch. Check it with:  vercel ls --prod"
  return 0
}

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
    PROMOTED_SHA=$(git rev-parse origin/production)
    echo -e "\n✓ promoted. Vercel will deploy from origin/production."
    $WATCH || { echo "→ deploy watch skipped (--no-watch)"; exit 0; }
    # `if`, not a bare call: under `set -e` a non-zero return would abort here
    # before any line that reads $?, which happens to exit 1 anyway but reads as
    # if the exit code were being chosen deliberately somewhere. It is, here.
    if watch_deploy "$PROMOTED_SHA"; then exit 0; else exit 1; fi
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
