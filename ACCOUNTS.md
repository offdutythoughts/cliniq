# Accounts, email verification and subscriptions

What is live today, and what is written but switched off.

**Live: sign-in is the only gate.** An account is an email and a password, and
sign-up emails a confirmation link — the session arrives when it is followed.
Once in, a user can add a passkey (Face ID, Touch ID, Windows Hello, a security
key) from `/account` and sign in with that instead. There is no subscription and
no paywall — anyone signed in has the whole clinical library.

**Email verification is on** (again, since 2026-08-17), and **password reset
works**. Both send through Resend from `no-reply@vetic.app`, and that domain is
now verified — DKIM, SPF and the return-path MX all resolve, and both templates
have been observed delivered in prod. It was briefly on before, in `f9d3688`,
and had to be rolled back on 2026-08-15 because the domain was NOT verified then
and every send was rejected; see `convex/auth.ts` for what that cost and what to
check before touching the flag. The sections below cover how each behaves and
what the links look like. The subscription code is unmounted for its own
reasons — see the last section.

## Routes

| Route | Public? | What it is |
|---|---|---|
| `/` | yes | Redirect to `/app` — the marketing homepage is not served. `src/app/page.tsx` |
| `/pricing` | yes | Plan comparison. Reachable by direct URL and from the site chrome; the prices in `src/lib/plans.ts` are **placeholders** and nothing charges for them. `src/app/pricing/page.tsx` |
| `/signup` | yes | Redirect to `/login`. `src/app/signup/page.tsx` |
| `/login` | yes | Sign in **and** create an account: email + password, or a passkey — either from the button or from the email field's autofill dropdown. `src/app/login/page.tsx` |
| `/welcome` | **no** | Where sign-up lands while email verification is off — offers a passkey, then continues to `/app`. Skips straight through where WebAuthn is unavailable. `src/app/welcome/page.tsx` |
| `/verify` | yes | Where the confirmation link lands. Redeems `?t=`, which verifies the address and signs the browser in, then offers to set up a passkey. Only reachable while email verification is on. `src/app/verify/page.tsx` |
| `/forgot` | yes | Request a password reset link. `src/app/forgot/page.tsx` |
| `/reset` | yes | Where the reset link lands. Sets a new password from `?t=`. `src/app/reset/page.tsx` |
| `/account` | **no** | Passkeys (add, list, remove), password reset, log out. `src/app/account/page.tsx` |
| `/app` | **no** | The clinical SPA (previously at `/`). `src/app/app/page.tsx` |

The three link landings are public because they are reached with no session by
definition — someone signed out, clicking a link in their inbox. Each is guarded
by the single-use code in its own query string, not by the middleware.

Gating is **authentication only** — `src/proxy.ts` (Next.js middleware). Anything
outside the public list redirects to `/login`. The middleware also serves
`/api/auth`, the endpoint the Convex Auth client posts every sign-in and sign-up
call to, so it stays mounted in dev; only the redirect is relaxed there.

It is a no-op when `NEXT_PUBLIC_CONVEX_URL` is unset, which is how the no-auth
local build and the Playwright visual suite run.

## Email verification — on

`convex/auth.ts` passes `verify: EmailVerificationLink` to `Password()`.

- `EmailVerificationLink` (`convex/emailVerification.ts`) — sign-up, and any
  sign-in on an address that hasn't been confirmed, returns **no session**.
  Convex Auth emails a link to `/verify?t=…` instead, valid 24 hours and
  single-use. Following it verifies the address *and* signs that browser in.
- The "check your inbox" state in `/login` triggers off `signingIn === false`,
  and `/verify` redeems the link.

**Email delivery is load-bearing, and a key alone is not delivery.** Two ways it
locks everyone out:

- Without `AUTH_RESEND_KEY` the link is only written to the function log, so the
  session is withheld pending a link nobody received.
- With a key but an **unverified sending domain**, Resend rejects the send,
  `sendEmail()` throws, and sign-up fails outright. This is what happened in
  prod on 2026-08-15 and caused the rollback.

So `SITE_URL`, a mail key, **and** a verified `AUTH_EMAIL_FROM` domain must all
be in place on every deployment real users touch. Check the domain in DNS, not
in a dashboard: `dig +short resend._domainkey.vetic.app TXT` must return a key.
Accounts predating this have no `emailVerified`, so each gets a confirmation
link at its next sign-in; that migration is intended, but it means delivery must
genuinely work first.

## Password reset — on

`reset: PasswordResetLink` (`convex/passwordReset.ts`) is passed to
`Password()`. `/forgot` sends a link to `/reset?t=…`, valid one hour; setting
the new password signs that browser in and invalidates every other session on
the account.

## The link format — one parameter, and not called `code`

Both flows pack the address and the token into a **single** query parameter,
`?t=address~token` (`packCredential` in `convex/emails.ts`, unpacked by
`src/lib/credentialLink.ts`). Two separate parameters do not work, for two
independent reasons — both were found the hard way, and both produced the same
useless "that link didn't work" page:

- **The `&` did not survive the trip from the inbox.** Every request that
  reached the server had been truncated at it: address present, token gone.
- **A parameter named `code` gets eaten before any page reads it.**
  `ConvexAuthProvider` detects `code` on mount, deletes it from the URL, and
  redeems it with no provider named. That cannot work here — `verify` and
  `reset` are registered as EXTRA providers (`Password.ts`), and the public
  `auth:signIn` action passes `allowExtraProviders: false`, so it fails with
  `Provider "email-verification" is not configured`.

Do not split `t` back into two parameters, and do not rename it to `code`.

Both link flows go through Resend's REST API with plain `fetch`
(`convex/emails.ts`, which also holds the shared template and the link builder).
Swapping provider is a rewrite of `sendEmail()` alone. Mail is configured with:

```bash
npx convex env set SITE_URL https://vetic.app
npx convex env set AUTH_RESEND_KEY re_...
npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@vetic.app>"
```

`SITE_URL` is required for both — it is where the links point and the domain
passkeys are bound to — so it must be set on every deployment regardless of
mail. `/forgot` shows the same confirmation whether or not the address has an
account, so the page can't be used to enumerate who is registered.

## Deployments — which Convex project is which

vetic.app runs on project **`cliniq`**, production deployment
**`determined-hawk-630`**. That is where the real accounts and their notes live.

A second project, `cliniq-262bb`, exists with production
`clever-nightingale-958`. It is empty. The repo, its dev deployment and the
Vercel deploy key all pointed at *that* project until 2026-08-18, so
`npx convex deploy` succeeded while pushing to a deployment nothing serves —
production could not be updated at all, and the live site kept running an older
bundle pinned to `determined-hawk-630`. No data was lost, and users never saw a
fault, but four builds were spent before the split was visible.

What to keep from it:

- A deploy key from the wrong project does not error — it deploys, to the wrong
  database. Vercel no longer uses one (see the deploying section below), but the
  same trap applies to any CI that does.
- Do **not** set `CONVEX_DEPLOYMENT` in Vercel. The deploy key selects the
  target; a second selector is how this went unnoticed for so long.
- **`--prod` is not proof of anything.** It resolves through local project
  config, which disagreed with the live site for days and reported two different
  deployments in one session. Identify a deployment by what actually serves
  traffic — compare `JWKS`, or look at the users table — then address it by name:

```bash
npx convex env list --deployment determined-hawk-630
```

## Deploying — the backend is a separate, manual step

`vercel.json` builds the frontend only (`npm run build`). Vercel does **not**
deploy Convex functions. After changing anything under `convex/`, push it
yourself:

```bash
npx convex deploy          # targets project cliniq / determined-hawk-630
```

It used to be automatic — `npx convex deploy --cmd 'npm run build'` — but that
made every production build depend on `CONVEX_DEPLOY_KEY` reaching it, and it
repeatedly did not: builds failed with `CONVEX_DEPLOY_KEY is not set` even with
the variable present and scoped to Production, and Vercel's Redeploy reads the
environment as it stood when that deployment was first created, so retrying an
old deployment could never pick up a corrected value. Splitting the two removes
Vercel from the Convex path entirely.

The cost is that the two halves can drift: deploy `convex/` changes and the
frontend separately, and remember that a backend change alone will not appear
in a Vercel build. `NEXT_PUBLIC_CONVEX_URL` is set in Vercel's Production
environment and pins the bundle to `determined-hawk-630`; the build no longer
sets it, so do not remove it.

## Passkeys — live

`convex/passkeys.ts` implements WebAuthn on top of `@simplewebauthn/server`,
exposed as a `passkey` Convex Auth provider alongside `password`. The private
key never leaves the authenticator; the biometric check (Face ID, Touch ID,
Windows Hello, an Android sensor) happens on the device and unlocks the key
locally, so no biometric data reaches Vetic. The `passkeys` table holds public
keys only.

- **Registering** requires a live session — `registerOptions` / `registerVerify`
  both check `getAuthUserId`, so a passkey can only ever be added to the account
  the caller is already signed in to. Offered at the first moment a new account
  has a session, and any time afterwards from `/account`. Which screen that is
  depends on email verification: with it **off**, sign-up returns a session and
  `/welcome` catches it; with it **on**, sign-up returns none and `/verify`
  makes the offer once the emailed link is redeemed. The `/welcome` redirect is
  gated on `signingIn`, so exactly one of the two fires — never both, never
  neither.
- **Signing in** is `authenticationOptions()` then
  `signIn("passkey", { challenge, response })`. Keys are registered as
  discoverable with `userVerification: "required"`, so the browser can offer
  them without an email being typed, and `allowCredentials` is always omitted —
  which also means this endpoint never reveals whether an address is registered.
- **Two ways in from `/login`.** The button runs a modal ceremony. Alongside it,
  a *conditional* request runs for as long as the page is open and puts any
  passkey this device holds in the email field's autofill dropdown — iCloud
  Keychain on Apple, Google Password Manager on Android. The field must carry
  `autocomplete="username webauthn"` or there is nowhere for it to render. Only
  one WebAuthn ceremony may be outstanding at a time, so the button aborts the
  conditional request before starting its own.
- **Challenges** live in `webauthnChallenges`, are deleted as they are redeemed
  (single-use, five-minute TTL), and stale ones are swept opportunistically.
  Every login-page view starts one for the conditional request; abandoned rows
  are what the sweep is for.

`NotAllowedError` is the browser's answer both to "you dismissed the sheet" and
to "this device has no passkey for vetic" — deliberately, since distinguishing
them would tell any page which sites you hold keys for. So it can never be
treated as a plain cancellation: doing that made the button appear dead to
exactly the people who had never registered one. `passkeyErrorMessage` in
`src/lib/passkeys.ts` returns copy that is true of both readings. The
conditional request is the opposite case — nobody asked for it, so its failures
stay silent, and only a self-inflicted `AbortError` is filtered by name.

The relying party ID comes from `SITE_URL`'s hostname. A passkey registered
against `localhost` will not work against the production domain and vice versa —
that is WebAuthn working as designed, not a bug. `SITE_URL` must also match the
**port**: it is the expected origin at verification, so a dev server on 3001
against `SITE_URL=http://localhost:3000` fails every registration.

`package.json` pins `@simplewebauthn/server` v13 via `overrides`: `@auth/core`
declares an optional peer on v9 for an Auth.js WebAuthn provider this app never
loads, and v13 is the release that runs outside Node, which the Convex V8
runtime needs. The browser half is hand-written in `src/lib/passkeys.ts` rather
than pulling `@simplewebauthn/browser` into the same conflict.

## Subscriptions — written, switched off

`src/components/SubscriptionGate.tsx` (the paywall) is **not mounted** on
`/app`, and `convex/subscriptions.ts` is **not deployed** to the production
Convex deployment. Re-mounting the gate without deploying that module crashes
every signed-in page load, and deploying it without backfilling rows puts every
existing user behind the paywall.

The design below still holds:

`convex/subscriptions.ts` owns the entitlement; `subscriptions` in
`convex/schema.ts` is one row per user. `status` is the query every gate reads,
and `isEntitled()` is the single definition of "has access":

- `trialing` — until `trialEndsAt`
- `active` — until `currentPeriodEnd` (open-ended when unset)
- `past_due` — still allowed, a grace period while Stripe retries the card
- `canceled` / `incomplete` — no access

`startTrial` grants a 14-day trial (`TRIAL_DAYS`) on the chosen plan and refuses
a second trial on the same account — it was how sign-up completed before the
paywall was switched off, and it is what existing accounts would need called for
them if the gate is ever re-mounted.

### Wiring Stripe

1. Put the real prices in `src/lib/plans.ts` (currently **placeholder** figures)
   and create the matching Stripe Prices. `stripePriceIdEnvVar('monthly')` names
   the env var each Price ID is expected in (`STRIPE_PRICE_MONTHLY`,
   `STRIPE_PRICE_ANNUAL`).
2. Add a Convex action that creates a Checkout Session for the selected plan and
   returns its URL. Call it from the disabled "Pay by card" button in
   `SignupFlow.tsx`.
3. Add a Stripe webhook as an `httpAction` in `convex/http.ts` and have it
   upsert the user's `subscriptions` row: `status`, `currentPeriodEnd`,
   `cancelAtPeriodEnd`, `stripeCustomerId`, `stripeSubscriptionId`. The
   `by_stripe_subscription` index exists for exactly this lookup.

No gate or UI needs to change once the webhook writes those fields — everything
already reads `subscriptions.status`.
