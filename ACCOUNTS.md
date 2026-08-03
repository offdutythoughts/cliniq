# Accounts, email verification and subscriptions

What is live today, and what is written but switched off.

**Live: sign-in is the only gate.** An account is an email and a password. No
email confirmation, no subscription, no paywall — anyone signed in has the whole
clinical library. The email-verification and subscription code below is real and
tested, but deliberately unmounted; the last two sections say what turning each
one on would take.

## Routes

| Route | Public? | What it is |
|---|---|---|
| `/` | yes | Redirect to `/app` — the marketing homepage is not served. `src/app/page.tsx` |
| `/pricing` | yes | Plan comparison. Reachable by direct URL and from the site chrome; the prices in `src/lib/plans.ts` are **placeholders** and nothing charges for them. `src/app/pricing/page.tsx` |
| `/signup` | yes | Redirect to `/login`. `src/app/signup/page.tsx` |
| `/login` | yes | Sign in **and** create an account, one form, email + password. `src/app/login/page.tsx` |
| `/app` | **no** | The clinical SPA (previously at `/`). `src/app/app/page.tsx` |

Gating is **authentication only** — `src/proxy.ts` (Next.js middleware). Anything
outside the public list redirects to `/login`. The middleware also serves
`/api/auth`, the endpoint the Convex Auth client posts every sign-in and sign-up
call to, so it stays mounted in dev; only the redirect is relaxed there.

It is a no-op when `NEXT_PUBLIC_CONVEX_URL` is unset, which is how the no-auth
local build and the Playwright visual suite run.

## Email verification — written, switched off

`convex/emailVerification.ts` generates a 6-digit code and sends it through
Resend's REST API (plain `fetch`, no extra dependency). It is **not wired up**:
`convex/auth.ts` does not pass `verify` to the Password provider, so sign-in
returns a session straight away.

Turning it on means passing `verify: EmailVerificationCode` to `Password()` —
**and** setting the sending key on every deployment real users touch, first:

```bash
npx convex env set AUTH_RESEND_KEY re_...
npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@yourdomain.com>"
```

Without `AUTH_RESEND_KEY` the code is only written to the Convex function log
(`npx convex logs`) — fine for testing locally, a full lockout in production,
because the session is withheld until a code nobody received is entered. The
client side of that flow needs rebuilding too: the code step was removed from
`/login`, and the three-step version survives in `src/app/signup/SignupFlow.tsx`.

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
