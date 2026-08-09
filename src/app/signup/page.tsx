import { redirect } from 'next/navigation'

// Sign-up happens on /login: email + password, then the confirmation link we
// email lands on /verify. The three-step flow in ./SignupFlow.tsx (account →
// confirm email → subscription) is left in the tree unmounted — it is the first
// two steps plus a subscription step, and convex/subscriptions.ts is not
// deployed.
export default function SignupPage() {
  redirect('/login')
}
