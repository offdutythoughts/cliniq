import { Email } from "@convex-dev/auth/providers/Email";
import { emailHtml, emailText, linkTo, packCredential, randomToken, sendEmail } from "./emails";

// ── Password reset link ──────────────────────────────────────────────────────
//
// Passed to the Password provider as `reset` (see ./auth.ts), which unlocks two
// flows on the client:
//
//   signIn("password", { email, flow: "reset" })                  → sends this email
//   signIn("password", { email, code, newPassword, flow: "reset-verification" })
//
// The second one is what /reset submits, using the address and token unpacked
// from the link's single `?t=` parameter. On success Convex Auth changes the
// password, signs the browser in, and invalidates every other session on the
// account — so a stolen password stops working the moment its owner resets it.
//
// One parameter, and not called `code` — see the note in ./emailVerification.ts
// for both reasons. This flow was broken the same way and by the same causes.
//
// Shorter-lived than the verification link: a reset link is a live credential
// for an account that already exists.

const LINK_TTL_SECONDS = 60 * 60;

export const PasswordResetLink = Email({
  id: "password-reset",
  maxAge: LINK_TTL_SECONDS,

  async generateVerificationToken() {
    return randomToken();
  },

  async sendVerificationRequest({ identifier: email, token, expires }) {
    const link = linkTo("/reset", { t: packCredential(email, token) });
    const minutes = Math.max(1, Math.round((expires.getTime() - Date.now()) / 60_000));
    const expiry = `This link expires in ${minutes} minutes and can only be used once.`;
    const intro = "Choose a new password for your Vetic account.";
    const footnote =
      "If you didn't ask to reset your password, ignore this email — your current " +
      "password still works and nothing has changed.";

    await sendEmail({
      to: email,
      subject: "Reset your Vetic password",
      text: emailText({ intro, link, expiry, footnote }),
      html: emailHtml({
        heading: "Reset your password",
        intro,
        action: "Choose a new password",
        link,
        expiry,
        footnote,
      }),
      logLine: `Vetic password reset link for ${email}: ${link}`,
    });
  },
});
