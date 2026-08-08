// ── Transactional email ──────────────────────────────────────────────────────
//
// One place for "send a link to this address", shared by email verification
// (./emailVerification.ts) and password reset (./passwordReset.ts). Sending goes
// through Resend's REST API with plain `fetch`, so no extra dependency and no
// Node runtime is needed.
//
// Required Convex env vars on any deployment real users touch:
//
//   npx convex env set SITE_URL https://app.example.com
//   npx convex env set AUTH_RESEND_KEY re_...
//   npx convex env set AUTH_EMAIL_FROM "Vetic <no-reply@yourdomain.com>"
//
// Without AUTH_RESEND_KEY the link is written to the Convex function log
// (`npx convex logs`) instead of being emailed, so local development works
// before a mail domain exists. That fallback is dev-only by design: it never
// runs when the key is set, and the log line is the only place the link appears.

/**
 * The public origin of the web app — where the links in our emails point, and
 * the WebAuthn relying party for passkeys (see ./passkeys.ts).
 *
 * Convex Auth already requires this for any flow that redirects; we read it
 * ourselves rather than trusting the `url` the client's `redirectTo` produced,
 * so a sign-up that forgot the param still emails a working link.
 */
export function siteUrl(): string {
  const raw = process.env.SITE_URL;
  if (!raw) {
    throw new Error(
      "SITE_URL is not set on this Convex deployment, so account emails have " +
        "nowhere to link to. Set it with: npx convex env set SITE_URL https://your-app-url",
    );
  }
  return raw.replace(/\/$/, "");
}

/** An absolute link into the app, e.g. `linkTo("/verify", { code, email })`. */
export function linkTo(path: string, params: Record<string, string>): string {
  const url = new URL(path, siteUrl() + "/");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * A URL-safe random token. Convex Auth treats tokens of 24+ characters as
 * secure on their own, which is what a one-click link needs — a 6-digit OTP
 * would not be.
 */
export function randomToken(length = 40): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let token = "";
  for (const byte of bytes) {
    // 62 doesn't divide 256, so the last few values are slightly favoured. At
    // 40 characters the bias is far below what matters for a short-lived token.
    token += alphabet[byte % alphabet.length];
  }
  return token;
}

/**
 * Send one email. Falls back to logging when no Resend key is configured —
 * `logLine` is what gets printed, so callers put the link itself there.
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  text: string;
  html: string;
  logLine: string;
}): Promise<void> {
  const apiKey = process.env.AUTH_RESEND_KEY ?? process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "AUTH_RESEND_KEY is not set — printing the link to the log instead of " +
        "emailing it. Set it before letting real users sign up.",
    );
    console.info(options.logLine);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.AUTH_EMAIL_FROM ?? "Vetic <onboarding@resend.dev>",
      to: [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Could not send the email (Resend ${response.status}): ${await response.text()}`,
    );
  }
}

/**
 * The one email template: a heading, a sentence, a button, and the same link
 * again as text for the clients that strip buttons.
 */
export function emailHtml(content: {
  heading: string;
  intro: string;
  action: string;
  link: string;
  expiry: string;
  footnote: string;
}): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F172A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(0,0,0,0.08);border-radius:14px;">
      <tr>
        <td style="padding:28px 28px 8px;">
          <div style="font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0D9488;">Vetic</div>
          <h1 style="margin:12px 0 8px;font-size:20px;font-weight:600;">${escapeHtml(content.heading)}</h1>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;">${escapeHtml(content.intro)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px;text-align:center;">
          <a href="${escapeHtml(content.link)}" style="display:inline-block;padding:13px 26px;border-radius:10px;background:#0F172A;color:#FFFFFF;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(content.action)}</a>
          <p style="margin:14px 0 0;font-size:12px;color:#94A3B8;">${escapeHtml(content.expiry)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 28px 28px;">
          <p style="margin:0 0 12px;font-size:12px;line-height:1.6;color:#94A3B8;">
            If the button doesn&rsquo;t work, paste this into your browser:<br />
            <span style="word-break:break-all;color:#475569;">${escapeHtml(content.link)}</span>
          </p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#94A3B8;">${escapeHtml(content.footnote)}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** The plain-text twin of {@link emailHtml}. */
export function emailText(content: {
  intro: string;
  link: string;
  expiry: string;
  footnote: string;
}): string {
  return [content.intro, "", content.link, "", content.expiry, "", content.footnote].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
