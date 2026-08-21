This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Two branches deploy: **`main`** builds Vercel previews, **`production`** builds prod.

To ship to production, use the script — do not merge into `production` by hand:

```bash
npm run promote              # verify, merge main into production, push
npm run promote -- --dry-run # show what would be promoted, change nothing
```

It resets local `production` to `origin/production` before merging, rather than
merging into whatever the local branch happened to hold. Doing that by hand once
left the repo mid-merge with conflict markers in the working tree, because local
`production` had quietly drifted nine commits from the remote. The script also
refuses to run on a dirty tree or when `main` has unpushed commits, and passes an
explicit `-m` so the merge message can never capture the editor's comment template.

### `vercel.json` was never the cause — `CONVEX_DEPLOY_KEY` is missing

Production builds failed eight times running between 2026-08-16 and 2026-08-18,
always within 6–11 seconds, against 36–51 seconds for a build that works. The
log says why (read 2026-08-19 with `vercel inspect --logs`):

```
Running "if [ "$VERCEL_ENV" = "production" ]; then npx convex deploy ..."
✖ Error fetching GET https://api.convex.dev/api/deployment/determined-hawk-630/team_and_project
  401 Unauthorized: MissingAccessToken: An access token is required for this command.
Error: Command "..." exited with 1
```

`npx convex deploy` cannot authenticate non-interactively without
`CONVEX_DEPLOY_KEY`, so it exits non-zero and takes the build with it.

**That variable does not exist in this Vercel project.** `vercel env ls` against
`offdutythoughts-projects/cliniq`:

| name | environments |
|---|---|
| `CONVEX_DEPLOYMENT` | Preview, Production |
| `NEXT_PUBLIC_CONVEX_URL` | Preview, Production |
| `NEXT_PUBLIC_POSTHOG_HOST` | Preview, Production |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Preview, Production |

No `CONVEX_DEPLOY_KEY`, in any scope. An earlier version of this section said
the key had been set, the build failed anyway, and the key was therefore not the
answer. It never reached this project — wrong project, wrong scope, or never
saved — so that attempt tested nothing, and the conclusion drawn from it was
wrong.

`vercel.json` looked guilty because it is the file that *invokes* `convex
deploy`. Removing it removed the call, not the cause, which is why removing it
"fixed" production every time. Previews stayed green for the same reason: the
`else` branch of that `buildCommand` is a plain `npm run build`, and only the
production branch ever runs `convex deploy`.

History of the file:

| | |
|---|---|
| `4f00195` | added — production builds run `npx convex deploy --cmd 'npm run build'` |
| `e26eafb` | removed on production only, creating a branch divergence |
| `cff91b1` | put back on main |
| `bcab546` | restored, alongside the deploy-key attempt that never landed |
| `5f638f3` | reverted again — the state today |

### Consequence today: production does not deploy the backend

With `vercel.json` absent from `main` and `production`, a production build falls
back to the project's default command. The successful build of `854946c` on
2026-08-19 logged:

```
Running "npm run build"      ← not the conditional command
```

**Convex functions do not ship with a production deploy.** They reach
`determined-hawk-630` only when someone runs `npx convex deploy` by hand, which
is how everything live there got there. Nothing is broken by this today, but a
frontend change that depends on a backend change will ship without it.

### A bare `npx convex deploy` does not reach `determined-hawk-630`

Deploying by hand is not as simple as the sentence above makes it sound. There
are three deployments, and the CLI's "prod" is not the live one:

| deployment | what it is |
|---|---|
| `determined-hawk-630` | **live** — what `vetic.app` talks to, where the real user data is |
| `clever-nightingale-958` | what a bare `npx convex deploy` targets, because the project calls it prod. Serves no traffic. |
| `modest-kingfisher-670` | personal dev, set in `.env.local` |

A bare `npx convex deploy` announces "Your prod deployment
clever-nightingale-958", pushes there, and prints `✔ Deployed`. Nothing errors.
On 2026-08-18 a full day of backend work — the email-verification rollback and
re-enable — went there while live users kept running the old code.

The browser bundle is the authority on which one is live:

```bash
curl -s -L https://vetic.app/login | grep -oE '/_next/static/[^"]+\.js' | head -1 \
  | xargs -I{} curl -s "https://vetic.app{}" | grep -oE 'https://[a-z-]+-[0-9]+\.convex\.cloud'
```

`convex deploy` has no `--deployment` flag, so target it with `--env-file`:

```bash
echo 'CONVEX_DEPLOYMENT=prod:determined-hawk-630' > /tmp/live.env
npx convex deploy --env-file /tmp/live.env
```

The same flag works for `env list`, `env get` and `function-spec`, which is how
to read the live backend's config instead of guessing at it.

This also matters for the deploy key below: it must be minted for
`determined-hawk-630`. A key for `clever-nightingale-958` would authenticate
fine and deploy the wrong backend on every production build — green, and wrong.

### Fixing it properly

Order matters, and so does step 3 — its absence is what produced the wrong
conclusion last time:

1. Mint a **production** deploy key for `determined-hawk-630` (Convex dashboard
   → Settings → Deploy Keys).
2. `vercel env add CONVEX_DEPLOY_KEY production`
3. **Confirm it is listed under Production** in `vercel env ls`.
4. Revert `5f638f3` to bring `vercel.json` back.
5. Promote, and confirm a **Production** deployment reaches `Ready`.

Reading a build log needs `vercel login` and `vercel link` first:

```bash
vercel ls --prod                        # Age / Status / Duration per deployment
vercel inspect --logs <deployment-url>  # the actual failure
```

Duration alone is a strong tell: a `convex deploy` auth failure dies in under
ten seconds, far short of a real build.

A green preview proves nothing here — previews never run `convex deploy`. The
repo is public, so production deployment status can also be read with no Vercel
account:

```bash
SHA=$(git rev-parse origin/production)
curl -s "https://api.github.com/repos/offdutythoughts/cliniq/deployments?sha=$SHA&environment=Production"
curl -s "https://api.github.com/repos/offdutythoughts/cliniq/deployments/<id>/statuses"
```

Check the HTTP status of those calls. Unauthenticated GitHub allows 60
requests/hour, and a rate-limited response is a JSON object that looks nothing
like a verdict — reading it as "no deployment yet" has already produced one
round of confident nonsense.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
