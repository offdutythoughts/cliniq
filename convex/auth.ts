import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { EmailVerificationLink } from "./emailVerification";
import { Passkey } from "./passkeys";
import { PasswordResetLink } from "./passwordReset";

// Two ways into an account:
//
//   * Password — email and password. Sign-up returns a session straight away.
//   * Passkey — Face ID, Touch ID, Windows Hello or a security key, added from
//     an account that is already signed in. See ./passkeys.ts.
//
// ── Email verification is on ─────────────────────────────────────────────────
//
// Sign-up, and any sign-in on an unconfirmed address, return
// `{ signingIn: false }` instead of a session; the client shows "check your
// email", and the session appears when the emailed link is followed. See
// ./emailVerification.ts, the /verify landing page, and the "check your inbox"
// state in the login form.
//
// This makes email delivery load-bearing, and it has already failed once. It
// was switched on in f9d3688, reached prod on 2026-08-15, and blocked every
// sign-up: `vetic.app` was not a verified sending domain, Resend rejected each
// send, and sendEmail() in ./emails.ts throws on a non-2xx — so the throw
// surfaced as a failed sign-up rather than an unverified account. Rolled back
// the same day, and on again 2026-08-17 with the domain verified.
//
// So the precondition is not "a mail key exists". It is all three of SITE_URL,
// a mail key, and a VERIFIED sending domain for AUTH_EMAIL_FROM, on every
// deployment real users touch. Check the domain in DNS rather than a
// dashboard — these must all answer:
//
//   dig +short resend._domainkey.vetic.app TXT   # DKIM public key
//   dig +short send.vetic.app TXT                # v=spf1 include:amazonses.com
//   dig +short send.vetic.app MX                 # feedback-smtp…amazonses.com
//
// Comment the `verify` line back out before deploying anywhere that lacks
// them. Accounts predating this have no `emailVerified`, so each gets a
// confirmation link at its next sign-in.
//
// `reset` shares the same sender and the same fate: it breaks and recovers with
// `verify`. It stays wired either way, being opt-in rather than a gate on
// everyone.
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Emails are case-insensitive in practice — normalise so "Vet@x.com" and
      // "vet@x.com" are the same account rather than two.
      profile(params) {
        return { email: String(params.email ?? "").trim().toLowerCase() };
      },
      verify: EmailVerificationLink,
      reset: PasswordResetLink,
    }),
    Passkey,
  ],
});
