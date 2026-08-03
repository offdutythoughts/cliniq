'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  AuthShell,
  ErrorNote,
  fieldClass,
  labelClass,
  linkButtonClass,
  primaryButtonClass,
} from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'

type Flow = 'signIn' | 'signUp'

export default function LoginPage() {
  // Without a Convex deployment, the middleware won't redirect here — just return null
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <LoginForm />
}

/**
 * Sign in and sign up on one page, against the plain Convex Auth password
 * provider: email + password is the whole flow. There is no email-confirmation
 * step — `convex/auth.ts` deliberately does not set `verify` — so a submitted
 * form either returns a session or an error, and nothing lands in between.
 */
function LoginForm() {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const [flow, setFlow] = useState<Flow>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    track('login_started', { flow })
    // Emails are case-insensitive in practice; fold them so "Vet@x.com" and
    // "vet@x.com" reach the same account instead of creating two.
    const normalised = email.trim().toLowerCase()
    try {
      await signIn('password', { email: normalised, password, flow })
      track('login_succeeded', { flow })
      router.replace('/app')
    } catch (err) {
      const errorMsg = friendlyAuthError(err, flow)
      track('login_failed', { flow, error: errorMsg })
      setError(errorMsg)
      setSubmitting(false)
    }
  }

  const isSignIn = flow === 'signIn'

  return (
    <AuthShell
      title={isSignIn ? 'Sign in to Vetic' : 'Create your Vetic account'}
      subtitle={isSignIn ? 'Welcome back.' : 'Email and password — that’s all it takes.'}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
          {!isSignIn && (
            <p className="text-[12px] text-[var(--v-slate)]">At least 8 characters.</p>
          )}
        </div>

        {error && <ErrorNote>{error}</ErrorNote>}

        <button type="submit" disabled={submitting} className={primaryButtonClass}>
          {submitting
            ? isSignIn
              ? 'Signing in…'
              : 'Creating your account…'
            : isSignIn
              ? 'Sign in'
              : 'Create account'}
        </button>

        <button
          type="button"
          onClick={() => {
            const next: Flow = isSignIn ? 'signUp' : 'signIn'
            track('login_flow_toggled', { from: flow, to: next })
            setFlow(next)
            setError(null)
          }}
          className={linkButtonClass}
        >
          {isSignIn ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </form>
    </AuthShell>
  )
}

function friendlyAuthError(err: unknown, flow: Flow): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (/InvalidAccountId|InvalidSecret|Invalid credentials/i.test(raw)) {
    return flow === 'signIn' ? 'Invalid email or password.' : 'That email is already in use.'
  }
  if (flow === 'signUp' && /TooShort|password/i.test(raw)) {
    return 'Password must be at least 8 characters.'
  }
  return 'Something went wrong. Please try again.'
}
