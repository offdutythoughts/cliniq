import { Email } from "@convex-dev/auth/providers/Email";
import { emailHtml, emailText, linkTo, packCredential, randomToken, sendEmail } from "./emails";

// ── Email verification link ──────────────────────────────────────────────────
//
// Convex Auth's Password provider takes a `verify` email provider (see
// ./auth.ts). With one configured, sign-up — and any sign-in on an account
// whose email is still unverified — does NOT return a session. It sends this
// email instead, and the session only appears once the link is followed.
//
// The link lands on /verify, which unpacks `?t=` into the address and the token
// and calls
//
//   signIn("password", { email, code, flow: "email-verification" })
//
// The link carries ONE query parameter, and both reasons matter:
//
//   * An `&` never survived the trip. Every request that reached the server had
//     been truncated at it — address present, token gone — so the page reported a
//     dead link for a token it never received.
//   * The parameter must not be called `code`. ConvexAuthProvider auto-detects a
//     `code` param on mount, deletes it from the URL, and redeems it with no
//     provider, which cannot work here: `verify` and `reset` are registered as
//     EXTRA providers and the public `auth:signIn` action passes
//     `allowExtraProviders: false`.
//
// Do not split this back into two parameters, and do not name it `code`.
//
// The address travels in the link because that is what the Password provider
// looks the account up by, and what this provider's default `authorize` check
// compares against — a code alone can't be redeemed against a different
// account. The token is 40 random characters, well past the 24 that Convex Auth
// requires before a token is safe to act as the whole credential.

const LINK_TTL_SECONDS = 24 * 60 * 60;

export const EmailVerificationLink = Email({
  id: "email-verification",
  maxAge: LINK_TTL_SECONDS,

  async generateVerificationToken() {
    return randomToken();
  },

  async sendVerificationRequest({ identifier: email, token, expires }) {
    const link = linkTo("/verify", { t: packCredential(email, token) });
    const hours = Math.max(1, Math.round((expires.getTime() - Date.now()) / 3_600_000));
    const expiry = `This link expires in ${hours} hour${hours === 1 ? "" : "s"}.`;
    const intro = "Confirm your email address to finish setting up your Vetic account.";
    const footnote = "If you didn't create a Vetic account, you can safely ignore this email.";

    await sendEmail({
      to: email,
      subject: "Confirm your email for Vetic",
      text: emailText({ intro, link, expiry, footnote }),
      html: emailHtml({
        heading: "Confirm your email",
        intro,
        action: "Confirm my email",
        link,
        expiry,
        footnote,
      }),
      logLine: `Vetic verification link for ${email}: ${link}`,
    });
  },
});
