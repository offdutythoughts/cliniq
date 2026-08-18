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

### Do not add `vercel.json` back — the deploy key is not enough

The Convex backend is deployed **by hand** (`npx convex deploy`), not by the
Vercel build. A `vercel.json` that puts `npx convex deploy` in `buildCommand`
has been added and removed twice now, and the second time it broke production
for two days:

| | |
|---|---|
| `4f00195` | added it — production builds run `npx convex deploy --cmd 'npm run build'` |
| `e26eafb` | removed it on production only, creating a branch divergence |
| `cff91b1` | put it back on main |
| — | **every production deployment failed from 2026-08-16 to 2026-08-18**, eight in a row, while previews stayed green |

Previews were green throughout because the `else` branch of that
`buildCommand` is a plain `npm run build`; only the production branch runs
`convex deploy`, and that is the branch that failed. `npx convex deploy` needs
`CONVEX_DEPLOY_KEY` in the environment — without it the CLI cannot authenticate
non-interactively and exits non-zero, taking the build with it.

The obvious fix is `CONVEX_DEPLOY_KEY` — without it the CLI cannot
authenticate non-interactively and exits non-zero, taking the build with it.
**That was tried on 2026-08-18 and it did not work.** The key was set in
Vercel, `vercel.json` was restored (`bcab546`), and production was promoted
twice:

| deployment | SHA | when | result |
|---|---|---|---|
| `5965482446` | `832e133` | before the key was saved | failure |
| `5966045270` | `c57eaa4` | **after** the key was saved | failure |
| `5966095355` | `ece43e3` | `vercel.json` reverted again (`5f638f3`) | **success** |

Two failures with the file present, immediate success on removing it, and
previews green throughout. So the app build is fine and the deploy key alone
does not explain the failure.

**Before trying a third time, read the build log** — that is the one piece of
evidence nobody has yet, and every attempt so far has been diagnosis by
correlation:

```bash
npx vercel inspect <deployment-url-or-id> --logs   # needs Vercel auth
```

Unverified candidates: the key saved to the Preview/Development scope rather
than Production; a key minted for the wrong Convex deployment; or a failure
inside `npx convex deploy` that has nothing to do with auth.

Whatever you try, verify with a **Production** deployment reaching `success`.
A green preview proves nothing here — previews never run `convex deploy`. The
check needs no Vercel account, since the repo is public:

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
