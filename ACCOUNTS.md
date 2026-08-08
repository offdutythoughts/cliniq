# Accounts, email verification and subscriptions

What is live today, and what is written but switched off.

**Live: sign-in is the only gate.** An account is an email and a password, and
sign-up returns a session straight away. Once in, a user can add a passkey (Face
ID, Touch ID, Windows Hello, a security key) from `/account` and sign in with
that instead. There is no subscription and no paywall — anyone signed in has the
whole clinical library.

Two things are written, tested and deliberately switched off, because both need
a mail provider that does not exist yet: **email verification** (one commented
line in `convex/auth.ts`) and **password reset** (wired, but the link only
reaches the function log until a key is set). The sections below say exactly
what turning each on takes. The subscription code is unmounted for its own
reasons — see the last section.

## Routes

| Route | Public? | What it is |
|---|---|---|
| `/` | yes | Redirect to `/app` — the marketing homepage is not served. `src/app/page.tsx` |
| `/pricing` | yes | Plan comparison. Reachable by direct URL and from the site chrome; the prices in `src/lib/plans.ts` are **placeholders** and nothing charges for them. `src/app/pricing/page.tsx` |
| `/signup` | yes | Redirect to `/login`. `src/app/signup/page.tsx` |
| `/login` | yes | Sign in **and** create an account: email + password, or a passkey. `src/app/login/page.tsx` |
| `/verify` | yes | Where the confirmation link lands. Redeems `?email=&code=`, which verifies the address and signs the browser in, then offers to set up a passkey. Unreachable until email verification is switched on. `src/app/verify/page.tsx` |
| `/forgot` | yes | Request a password reset link. `src/app/forgot/page.tsx` |
| `/reset` | yes | Where the reset link lands. Sets a new password from `?email=&code=`. `src/app/reset/page.tsx` |
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

## Email verification — built, switched off

`convex/auth.ts` has `verify: EmailVerificationLink` **commented out**, next to
the import it needs. Uncomment both lines and it is live:

- `EmailVerificationLink` (`convex/emailVerification.ts`) — sign-up, and any
  sign-in on an address that hasn't been confirmed, returns **no session**.
  Convex Auth emails a link to `/verify?email=…&code=…` instead, valid 24 hours
  and single-use. Following it verifies the address *and* signs that browser in.
- The client side is already built: the "check your inbox" state in
  `/login` triggers off `signingIn === false`, and `/verify` redeems the link.
  Nothing there is behind a flag — it activates the moment the provider does.

**Do not uncomment before a mail key exists.** Without one the link is only
written to the function log, so the session is withheld pending a link nobody
received — a full lockout. And because existing accounts have no
`emailVerified`, every one of them gets sent a confirmation link at their next
sign-in. That is the intended migration, but it means the key must be live
first.

## Password reset — wired, waiting on mail

`reset: PasswordResetLink` (`convex/passwordReset.ts`) **is** passed to
`Password()`, so `/forgot` and `/reset` are live routes today. `/forgot` sends a
link to `/reset?email=…&code=…`, valid one hour; setting the new password signs
that browser in and invalidates every other session on the account.

Until a mail key is set the link goes to the function log instead of the user,
so the feature is effectively inert — but it costs nothing while unused, and it
starts working with no code change the moment a key exists.

Both link flows go through Resend's REST API with plain `fetch`
(`convex/emails.ts`, which also holds the shared template and the link builder).
Swapping provider is a rewrite of `sendEmail()` alone. To switch mail on:

```bash
npx convex env set SITE_URL https://app.example.com
npx convex env set AUTH_RESEND_KEY re_...
npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@yourdomain.com>"
```

`SITE_URL` is required for both — it is where the links point and the domain
passkeys are bound to — so it must be set on every deployment regardless of
mail. `/forgot` shows the same confirmation whether or not the address has an
account, so the page can't be used to enumerate who is registered.

## Passkeys — live

`convex/passkeys.ts` implements WebAuthn on top of `@simplewebauthn/server`,
exposed as a `passkey` Convex Auth provider alongside `password`. The private
key never leaves the authenticator; the biometric check (Face ID, Touch ID,
Windows Hello, an Android sensor) happens on the device and unlocks the key
locally, so no biometric data reaches Vetic. The `passkeys` table holds public
keys only.

- **Registering** requires a live session — `registerOptions` / `registerVerify`
  both check `getAuthUserId`, so a passkey can only ever be added to the account
  the caller is already signed in to. Offered on `/verify` right after the email
  is confirmed, and any time from `/account`.
- **Signing in** is `authenticationOptions()` then
  `signIn("passkey", { challenge, response })`. Keys are registered as
  discoverable with `userVerification: "required"`, so the browser can offer
  them without an email being typed, and `allowCredentials` is always empty —
  which also means this endpoint never reveals whether an address is registered.
- **Challenges** live in `webauthnChallenges`, are deleted as they are redeemed
  (single-use, five-minute TTL), and stale ones are swept opportunistically.

The relying party ID comes from `SITE_URL`'s hostname. A passkey registered
against `localhost` will not work against the production domain and vice versa —
that is WebAuthn working as designed, not a bug.

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
