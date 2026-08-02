import { Email } from "@convex-dev/auth/providers/Email";

// ── Email verification OTP ───────────────────────────────────────────────────
//
// Convex Auth's Password provider takes a `verify` email provider (see auth.ts).
// When one is configured, sign-up (and any sign-in on an account whose email is
// still unverified) does NOT return a session — it sends a code and the client
// has to call signIn("password", { email, code, flow: "email-verification" }).
//
// Sending happens through Resend's REST API with plain `fetch`, so no extra
// dependency and no Node runtime is needed. Required Convex env vars in any
// deployment that real users touch:
//
//   npx convex env set AUTH_RESEND_KEY re_...
//   npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@yourdomain.com>"
//
// Without AUTH_RESEND_KEY the code is written to the Convex function log
// instead of being emailed, so local development works before a mail domain
// exists. That fallback is dev-only by design: it never runs when the key is
// set, and the log line is the only place the code appears.

const CODE_TTL_SECONDS = 15 * 60;

export const EmailVerificationCode = Email({
  id: "email-verification",
  maxAge: CODE_TTL_SECONDS,

  // A 6-digit numeric code — short enough to retype from a phone. Convex Auth
  // stores it hashed, single-use, and expiring after `maxAge`.
  async generateVerificationToken() {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    // Rejection-free modulo bias is irrelevant at this range/TTL, but keep the
    // full 6 digits so codes never render short.
    return String(buf[0] % 1_000_000).padStart(6, "0");
  },

  async sendVerificationRequest({ identifier: email, token, expires }) {
    const minutes = Math.max(1, Math.round((expires.getTime() - Date.now()) / 60_000));
    const apiKey = process.env.AUTH_RESEND_KEY ?? process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        "AUTH_RESEND_KEY is not set — printing the verification code to the log " +
          "instead of emailing it. Set it before letting real users sign up.",
      );
      console.info(`Vetic verification code for ${email}: ${token}`);
      return;
    }

    const from = process.env.AUTH_EMAIL_FROM ?? "Vetic <onboarding@resend.dev>";
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `${token} is your Vetic verification code`,
        text: verificationText(token, minutes),
        html: verificationHtml(token, minutes),
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Could not send the verification email (Resend ${response.status}): ${await response.text()}`,
      );
    }
  },
});

function verificationText(code: string, minutes: number) {
  return [
    "Confirm your email to finish setting up Vetic.",
    "",
    `Verification code: ${code}`,
    `This code expires in ${minutes} minutes.`,
    "",
    "If you didn't create a Vetic account, you can ignore this email.",
  ].join("\n");
}

function verificationHtml(code: string, minutes: number) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F172A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:14px;">
      <tr>
        <td style="padding:28px 28px 8px;">
          <div style="font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0D9488;">Vetic</div>
          <h1 style="margin:12px 0 8px;font-size:20px;font-weight:600;">Confirm your email</h1>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;">
            Enter this code in the Vetic sign-up screen to finish creating your account.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px;">
          <div style="font-size:32px;font-weight:600;letter-spacing:.18em;text-align:center;padding:16px;background:#F1F5F9;border-radius:12px;">${code}</div>
          <p style="margin:12px 0 0;font-size:12px;text-align:center;color:#94A3B8;">This code expires in ${minutes} minutes.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#94A3B8;">
            If you didn't create a Vetic account, you can safely ignore this email.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
