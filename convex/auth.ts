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
// This makes email delivery load-bearing: without AUTH_RESEND_KEY (see
// ./emails.ts) the link is only written to the function log, so nobody who
// signs up can get in. SITE_URL and a mail key must be set on EVERY deployment
// real users touch — comment the `verify` line back out before deploying
// anywhere that lacks them. Accounts predating this have no `emailVerified`,
// so each gets a confirmation link at its next sign-in.
//
// `reset` stays wired: it costs nothing when unused, and the moment a mail key
// exists /forgot starts working with no further change.
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
