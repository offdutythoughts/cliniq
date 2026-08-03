import { redirect } from 'next/navigation'

// Sign-up happens on /login, which creates the account from email + password in
// one step. The three-step flow in ./SignupFlow.tsx (account → emailed code →
// subscription) is left in the tree unmounted: it needs convex/subscriptions.ts
// and convex/emailVerification.ts deployed, and neither is live.
export default function SignupPage() {
  redirect('/login')
}
