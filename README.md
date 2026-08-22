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

### How a production deploy works

`vercel.json` puts `npx convex deploy` in the production `buildCommand`, so one
promote ships frontend and backend together. Previews take the `else` branch —
plain `npm run build` — and never deploy Convex.

Confirm a promote actually landed. The build log names the Convex target:

```bash
vercel ls --prod                        # Age / Status / Duration
vercel inspect --logs <deployment-url>  # look for the [Production] line
```

```
▌ [Production] offdutythoughts:cliniq:production (prod) (dashboard: .../determined-hawk-630)
✔ Deployed Convex functions to [REDACTED]
```

Duration is a useful tell on its own: a `convex deploy` auth failure dies in
under ten seconds, a real build takes 35–50.

Status is also readable with no Vercel account, since the repo is public:

```bash
SHA=$(git rev-parse origin/production)
curl -s "https://api.github.com/repos/offdutythoughts/cliniq/deployments?sha=$SHA&environment=Production"
curl -s "https://api.github.com/repos/offdutythoughts/cliniq/deployments/<id>/statuses"
```

Check the HTTP status of those calls. Unauthenticated GitHub allows 60
requests/hour, and a rate-limited response is a JSON object that looks nothing
like a verdict — reading it as "no deployment yet" has already produced one
round of confident nonsense. A green **preview** proves nothing about any of
this; only a Production deployment reaching `success` does.

### Check which Convex project you are pointed at

There is one project, `cliniq`:

| | deployment |
|---|---|
| production | `determined-hawk-630` — what `vetic.app` talks to |
| dev | `original-raven-198` — set in `.env.local` |

There has been a second. Convex appends a suffix when a project name is already
taken, so `npx convex dev` in a fresh checkout created `cliniq-262bb` instead of
joining this one, and `.env.local` pointed at that duplicate for weeks. Deleting
it is a dashboard action; check whether it has actually happened rather than
assuming, because the deployments answer normally right up until they do not:

```bash
npx convex function-spec --deployment clever-nightingale-958   # duplicate's prod
```

A JSON response means `cliniq-262bb` is still there. Either way the mechanism
that created it is unchanged and will do the same again in a fresh checkout.

The consequence is quiet, which is what makes it dangerous: a bare `npx convex
deploy` announced "Your prod deployment clever-nightingale-958", pushed, and
printed `✔ Deployed`. Nothing errored. On 2026-08-18 a full day of backend work
— an email-verification rollback and re-enable — went to a deployment no user
touches, while live users kept running the old code.

Fixed on 2026-08-21 with

```bash
npx convex deployment select offdutythoughts:cliniq:dev
```

which rewrites `CONVEX_DEPLOYMENT` in `.env.local`. **Check that line before
trusting a deploy** — it carries the project name in a comment:

```
CONVEX_DEPLOYMENT=dev:original-raven-198 # team: offdutythoughts, project: cliniq
```

Anything other than `project: cliniq` means a duplicate has been created again.
Re-run the select rather than deploying.

The browser bundle is the independent authority on which backend is live, and
needs no Convex access at all:

```bash
curl -s -L https://vetic.app/login | grep -oE '/_next/static/[^"]+\.js' | sort -u \
  | while read -r b; do curl -s "https://vetic.app$b"; done \
  | grep -oE 'https://[a-z-]+-[0-9]+\.convex\.cloud' | sort -u \
  | grep -v happy-otter-123
```

Every bundle has to be checked, not just the first — the URL is not in the entry
chunk. And `happy-otter-123.convex.cloud` is filtered because it is a
placeholder compiled into `node_modules/convex/dist/react.bundle.js` (an example
in a client error message), so it ships in the bundle without being a
deployment. An earlier version of this command used `head -1` and printed
nothing at all.

### If a production build fails

`vercel.json` is the file that *invokes* `convex deploy`, so it looks guilty
whenever that call fails, and removing it "fixes" production every time by
removing the call rather than the cause. It has been added and removed four
times on that reasoning:

| | |
|---|---|
| `4f00195` | added |
| `e26eafb` | removed on production only, creating a branch divergence |
| `cff91b1` | put back on main |
| `5f638f3` | removed again, after two failed attempts with a deploy key that had never actually been set |
| `f068012` | restored — green, once `CONVEX_DEPLOY_KEY` genuinely existed |

Between 2026-08-16 and 2026-08-18 every production deployment failed, eight in a
row, while previews stayed green. The cause was `MissingAccessToken` from
`convex deploy`, visible in the build log the whole time and diagnosed only
after someone read it.

**Read the log before touching `vercel.json`.** If the key ever needs
re-creating, mint it for `determined-hawk-630` — a key for
`clever-nightingale-958` authenticates fine and deploys the wrong backend on
every build, green and wrong:

```bash
npx convex deployment token create vercel-production \
  --deployment determined-hawk-630 --save-env /tmp/key.env
vercel env add CONVEX_DEPLOY_KEY production   # then confirm in `vercel env ls`
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
