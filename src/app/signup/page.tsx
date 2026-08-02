import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthShell } from '../../components/site/AuthShell'
import SignupFlow from './SignupFlow'

export const metadata: Metadata = {
  title: 'Create your account — Vetic',
  description: 'Create a Vetic account: confirm your email, choose a plan, and start your trial.',
}

export default function SignupPage() {
  // useSearchParams (for ?plan=) needs a Suspense boundary above it.
  return (
    <Suspense
      fallback={
        <AuthShell title="Create your Vetic account" subtitle="Loading…">
          <div />
        </AuthShell>
      }
    >
      <SignupFlow />
    </Suspense>
  )
}
