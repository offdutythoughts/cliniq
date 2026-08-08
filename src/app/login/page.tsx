'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useAction } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import {
  AuthShell,
  ErrorNote,
  fieldClass,
  labelClass,
  linkButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
} from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'
import {
  assertPasskey,
  biometricAuthenticatorAvailable,
  isPasskeyCancellation,
  passkeysSupported,
} from '../../lib/passkeys'

type Flow = 'signIn' | 'signUp'

export default function LoginPage() {
  // Without a Convex deployment, the middleware won't redirect here — just return null
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <LoginForm />
}

/**
 * Sign in and sign up on one page. Three ways through it:
 *
 *   * email + password — sign-up, and any sign-in on an address that hasn't
 *     been confirmed yet, does not return a session. Convex Auth emails a
 *     verification link instead (convex/emailVerification.ts) and this page
 *     shows "check your inbox" until the link is followed.
 *   * a passkey — Face ID, Touch ID, Windows Hello or a security key. Straight
 *     to a session, no password and no email round trip.
 *   * forgotten password — /forgot emails a reset link.
 */
function LoginForm() {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const passkeyOptions = useAction(api.passkeys.authenticationOptions)
  const [flow, setFlow] = useState<Flow>('signIn')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Set once the account exists but the address is unconfirmed — the whole form
  // is replaced by "we've emailed you a link".
  const [awaitingEmail, setAwaitingEmail] = useState<string | null>(null)
  const [passkeyLabel, setPasskeyLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!passkeysSupported()) return
    let cancelled = false
    void biometricAuthenticatorAvailable().then((biometric) => {
      if (!cancelled) setPasskeyLabel(biometric ? 'Sign in with Face ID or Touch ID' : 'Sign in with a passkey')
    })
    return () => {
      cancelled = true
    }
  }, [])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    track('login_started', { flow })
    // Emails are case-insensitive in practice; fold them so "Vet@x.com" and
    // "vet@x.com" reach the same account instead of creating two.
    const normalised = email.trim().toLowerCase()
    try {
      const result = await signIn('password', { email: normalised, password, flow })
      if (result.signingIn) {
        track('login_succeeded', { flow })
        router.replace('/app')
        return
      }
      // No session: the address needs confirming, and the link is already sent.
      track('verification_email_sent', { flow })
      setAwaitingEmail(normalised)
      setSubmitting(false)
    } catch (err) {
      const errorMsg = friendlyAuthError(err, flow)
      track('login_failed', { flow, error: errorMsg })
      setError(errorMsg)
      setSubmitting(false)
    }
  }

  async function signInWithPasskey() {
    setError(null)
    setSubmitting(true)
    track('passkey_login_started')
    try {
      const options = await passkeyOptions({})
      const response = await assertPasskey(options)
      const parsed = JSON.parse(options) as { challenge: string }
      await signIn('passkey', { challenge: parsed.challenge, response })
      track('passkey_login_succeeded')
      router.replace('/app')
    } catch (err) {
      if (!isPasskeyCancellation(err)) {
        track('passkey_login_failed')
        setError(
          'That passkey didn’t work. Sign in with your email and password, or add a passkey from your account page.',
        )
      }
      setSubmitting(false)
    }
  }

  if (awaitingEmail !== null) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle={
          <>
            We’ve emailed a confirmation link to{' '}
            <strong className="text-[var(--v-ink)]">{awaitingEmail}</strong>. Open it and you’ll be
            signed in — the link lasts 24 hours.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
            Nothing yet? Check spam, then sign in again below — every attempt sends a fresh link.
          </p>
          <button
            type="button"
            onClick={() => {
              setAwaitingEmail(null)
              setPassword('')
              setFlow('signIn')
            }}
            className={secondaryButtonClass}
          >
            Back to sign in
          </button>
        </div>
      </AuthShell>
    )
  }

  const isSignIn = flow === 'signIn'

  return (
    <AuthShell
      title={isSignIn ? 'Sign in to Vetic' : 'Create your Vetic account'}
      subtitle={
        isSignIn ? 'Welcome back.' : 'Email and password, then one click in your inbox to confirm.'
      }
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
          <div className="flex items-baseline justify-between gap-3">
            <label className={labelClass} htmlFor="password">
              Password
            </label>
            {isSignIn && (
              <Link href="/forgot" className={linkButtonClass}>
                Forgotten your password?
              </Link>
            )}
          </div>
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

        {isSignIn && passkeyLabel !== null && (
          <>
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[.1em] text-[var(--v-slate)] uppercase">
              <span className="h-px flex-1 bg-[var(--v-line)]" />
              or
              <span className="h-px flex-1 bg-[var(--v-line)]" />
            </div>
            <button
              type="button"
              onClick={signInWithPasskey}
              disabled={submitting}
              className={secondaryButtonClass}
            >
              {passkeyLabel}
            </button>
          </>
        )}

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
  if (/SITE_URL|Resend|send the email/i.test(raw)) {
    return 'We couldn’t send the confirmation email. Please try again in a moment.'
  }
  return 'Something went wrong. Please try again.'
}
