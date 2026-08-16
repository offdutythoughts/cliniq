import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
// Uncomment together with the `verify` line below — see the note there.
// import { EmailVerificationLink } from "./emailVerification";
import { Passkey } from "./passkeys";
import { PasswordResetLink } from "./passwordReset";

// Two ways into an account:
//
//   * Password — email and password. Sign-up returns a session straight away.
//   * Passkey — Face ID, Touch ID, Windows Hello or a security key, added from
//     an account that is already signed in. See ./passkeys.ts.
//
// ── Email verification is built but switched OFF again ──────────────────────
//
// Uncommenting the `verify` line below turns it on: sign-up, and any sign-in on
// an unconfirmed address, then return `{ signingIn: false }` instead of a
// session, the client shows "check your email", and the session appears when
// the emailed link is followed. Everything behind it is written and tested —
// ./emailVerification.ts, the /verify landing page, the "check your inbox"
// state in the login form.
//
// It was on briefly (f9d3688, deployed to prod 2026-08-15) and is off again
// because it broke prod sign-up. A mail KEY is not sufficient: the sending
// domain in AUTH_EMAIL_FROM must be verified with the mail provider, and
// `vetic.app` is not — it publishes no DKIM, SPF or DMARC records at all, so
// Resend rejects every send from `no-reply@vetic.app`. sendEmail() in
// ./emails.ts throws on that rejection, and the throw surfaces as a failed
// sign-up rather than an unverified account.
//
// Before turning it on again, verify the domain with the provider and confirm
// the DNS records resolve — `dig +short resend._domainkey.vetic.app TXT`
// must return a key. A green tick in a dashboard is not the check; DNS is.
// Accounts predating this have no `emailVerified`, so each gets a confirmation
// link at its next sign-in once it is live.
//
// `reset` stays wired, but note it sends through the same unverified sender, so
// /forgot throws today too. It is left on because it is opt-in — one user who
// clicks "forgot password" hits it, whereas `verify` blocked EVERY sign-up.
// Verifying the domain fixes both at once, with no further change here.
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Emails are case-insensitive in practice — normalise so "Vet@x.com" and
      // "vet@x.com" are the same account rather than two.
      profile(params) {
        return { email: String(params.email ?? "").trim().toLowerCase() };
      },
      // verify: EmailVerificationLink,
      reset: PasswordResetLink,
    }),
    Passkey,
  ],
});
