import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { EmailVerificationCode } from "./emailVerification";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      // Sign-up and sign-in both require a verified email: with `verify` set,
      // Convex Auth withholds the session until the emailed OTP is confirmed.
      verify: EmailVerificationCode,
      // Emails are case-insensitive in practice — normalise so "Vet@x.com" and
      // "vet@x.com" are the same account rather than two.
      profile(params) {
        return { email: String(params.email ?? "").trim().toLowerCase() };
      },
    }),
  ],
});
