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
// ── Email verification is built but switched off ─────────────────────────────
//
// Uncommenting the `verify` line below turns it on: sign-up, and any sign-in on
// an unconfirmed address, then return `{ signingIn: false }` instead of a
// session, the client shows "check your email", and the session appears when
// the emailed link is followed. Everything behind it is written and tested —
// ./emailVerification.ts, the /verify landing page, the "check your inbox"
// state in the login form.
//
// It is off because turning it on makes email delivery load-bearing: without
// AUTH_RESEND_KEY (see ./emails.ts) the link is only written to the function
// log, so nobody who signs up can ever get in. Set SITE_URL and a mail key on
// every deployment real users touch, THEN uncomment. Note that existing
// accounts have no `emailVerified`, so switching it on sends every one of them
// a confirmation link at their next sign-in.
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
      // verify: EmailVerificationLink,
      reset: PasswordResetLink,
    }),
    Passkey,
  ],
});
