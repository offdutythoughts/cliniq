import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // No `verify` provider: email + password is the whole flow, and sign-in
      // returns a session immediately. Setting `verify` (EmailVerificationCode
      // in ./emailVerification.ts is written and unused) makes Convex Auth
      // withhold the session until an emailed OTP is confirmed — which needs
      // AUTH_RESEND_KEY set on the deployment, or nobody can sign in at all.
      // Emails are case-insensitive in practice — normalise so "Vet@x.com" and
      // "vet@x.com" are the same account rather than two.
      profile(params) {
        return { email: String(params.email ?? "").trim().toLowerCase() };
      },
    }),
  ],
});
