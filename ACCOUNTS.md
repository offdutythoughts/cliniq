# Accounts, email verification and subscriptions

How a visitor becomes a paying user, and what still needs wiring.

## Routes

| Route | Public? | What it is |
|---|---|---|
| `/` | yes | Marketing homepage — hero, who it's for, the three features, how it works, why it's different, About/Mission, plans, CTA. `src/app/page.tsx` |
| `/pricing` | yes | Plan comparison. `src/app/pricing/page.tsx` |
| `/signup` | yes | Three-step sign-up: account → email code → subscription. `src/app/signup/SignupFlow.tsx` |
| `/login` | yes | Sign in; falls through to the same code step if the email was never verified. `src/app/login/page.tsx` |
| `/app` | **no** | The clinical SPA (previously at `/`). `src/app/app/page.tsx` |

Gating lives in two places:

- **Authentication** — `src/proxy.ts` (Next.js middleware). Anything outside the
  public list redirects to `/login`. The middleware also serves `/api/auth`, the
  endpoint the Convex Auth client posts every sign-in/sign-up/OTP call to, so it
  stays mounted in dev; only the redirect is relaxed there.
- **Entitlement** — `src/components/SubscriptionGate.tsx` wraps the SPA and shows
  the paywall (rather than redirecting) when the signed-in user has no active
  subscription.

Both are no-ops when `NEXT_PUBLIC_CONVEX_URL` is unset, which is how the
no-auth local build and the Playwright visual suite run.

## Email verification

`convex/auth.ts` passes `verify: EmailVerificationCode` to the Password provider,
so Convex Auth withholds the session until a 6-digit code is confirmed. Sign-up
therefore returns `{ signingIn: false }`, and the client finishes with:

```ts
signIn('password', { email, code, flow: 'email-verification' })
```

Signing in to an account whose email was never verified re-sends the code — the
sign-in screen handles that case too.

The code is generated and emailed in `convex/emailVerification.ts` through
Resend's REST API (plain `fetch`, no extra dependency). Set these on every
deployment real users touch:

```bash
npx convex env set AUTH_RESEND_KEY re_...
npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@yourdomain.com>"
```

Without `AUTH_RESEND_KEY` the code is written to the Convex function log instead
of being emailed (`npx convex logs`), which is how the flow is testable locally
before a sending domain exists.

## Subscriptions

`convex/subscriptions.ts` owns the entitlement; `subscriptions` in
`convex/schema.ts` is one row per user. `status` is the query every gate reads,
and `isEntitled()` is the single definition of "has access":

- `trialing` — until `trialEndsAt`
- `active` — until `currentPeriodEnd` (open-ended when unset)
- `past_due` — still allowed, a grace period while Stripe retries the card
- `canceled` / `incomplete` — no access

Until Stripe is connected, `startTrial` is how sign-up completes: it grants a
14-day trial (`TRIAL_DAYS`) on the chosen plan and refuses a second trial on the
same account.

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
