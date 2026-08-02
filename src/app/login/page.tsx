'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import Link from 'next/link'
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

export default function LoginPage() {
  // Without a Convex deployment, the middleware won't redirect here — just return null
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <LoginForm />
}

function LoginForm() {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  // An account whose email was never confirmed can't be signed into: Convex Auth
  // emails a fresh code instead of returning a session, so sign-in can land on
  // the same verification step as sign-up.
  const [needsCode, setNeedsCode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  async function submitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setSubmitting(true)
    track('login_started', { flow: 'signIn' })
    const normalised = email.trim().toLowerCase()
    try {
      const result = await signIn('password', { email: normalised, password, flow: 'signIn' })
      setEmail(normalised)
      if (result.signingIn) {
        track('login_succeeded', { flow: 'signIn' })
        router.replace('/app')
      } else {
        track('login_needs_verification')
        setNeedsCode(true)
        setNotice(`Confirm your email to continue — we’ve sent a code to ${normalised}.`)
        setSubmitting(false)
      }
    } catch (err) {
      const errorMsg = friendlyAuthError(err)
      track('login_failed', { flow: 'signIn', error: errorMsg })
      setError(errorMsg)
      setSubmitting(false)
    }
  }

  async function submitCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setSubmitting(true)
    try {
      await signIn('password', { email, code: code.trim(), flow: 'email-verification' })
      track('login_succeeded', { flow: 'email-verification' })
      router.replace('/app')
    } catch {
      setError('That code isn’t right, or it has expired. Try signing in again for a new one.')
      setSubmitting(false)
    }
  }

  if (needsCode) {
    return (
      <AuthShell
        title="Confirm your email"
        subtitle={
          <>
            Enter the 6-digit code we sent to <strong className="text-[var(--v-ink)]">{email}</strong>.
          </>
        }
      >
        <form onSubmit={submitCode} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="code">
              Verification code
            </label>
            <input
              id="code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className={`${fieldClass} text-center text-[22px] tracking-[.35em]`}
            />
          </div>

          {notice && <p className="text-[12px] text-[var(--v-navy)]">{notice}</p>}
          {error && <ErrorNote>{error}</ErrorNote>}

          <button
            type="submit"
            disabled={submitting || code.length < 6}
            className={primaryButtonClass}
          >
            {submitting ? 'Checking…' : 'Verify and sign in'}
          </button>

          <button
            type="button"
            onClick={() => {
              setNeedsCode(false)
              setCode('')
              setError(null)
              setNotice(null)
            }}
            className={linkButtonClass}
          >
            Back to sign in
          </button>
        </form>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Sign in to Vetic"
      subtitle="Welcome back."
      footer={
        <>
          New to Vetic?{' '}
          <Link href="/signup" className="font-semibold text-[var(--v-navy)] no-underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submitPassword} className="flex flex-col gap-4">
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
            autoComplete="current-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
          />
        </div>

        {notice && <p className="text-[12px] text-[var(--v-navy)]">{notice}</p>}
        {error && <ErrorNote>{error}</ErrorNote>}

        <button type="submit" disabled={submitting} className={primaryButtonClass}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  )
}

function friendlyAuthError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (/InvalidAccountId|InvalidSecret|Invalid credentials/i.test(raw)) {
    return 'Invalid email or password.'
  }
  return 'Something went wrong. Please try again.'
}
