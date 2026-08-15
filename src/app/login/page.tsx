'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useAction } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  biometricName,
  conditionalMediationAvailable,
  isPasskeyAbort,
  passkeyErrorMessage,
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
  // The in-flight autofill request. It stays open for as long as this page is,
  // so anything that starts a second ceremony has to cancel it first — the
  // platform allows only one outstanding WebAuthn call at a time, and a second
  // one while it is pending fails outright.
  const autofillRequest = useRef<AbortController | null>(null)

  /** Trade a signed assertion for a session. Shared by autofill and the button. */
  const completePasskeySignIn = useCallback(
    async (optionsJSON: string, response: string) => {
      const { challenge } = JSON.parse(optionsJSON) as { challenge: string }
      const result = await signIn('passkey', { challenge, response })
      if (!result.signingIn) {
        // The provider throws on every rejection it knows about, so this only
        // fires if Convex Auth declined to open a session for another reason.
        throw new Error('Passkey sign-in did not start a session.')
      }
      track('passkey_login_succeeded')
      router.replace('/app')
    },
    [signIn, router],
  )

  // Offer any passkey this device holds from the email field's autofill
  // dropdown. On Apple devices that is iCloud Keychain and on Android it is
  // Google Password Manager; where the device holds no passkey for us, nothing
  // is shown and nothing fails. That is why this runs alongside the button
  // rather than replacing it — it is the path that cannot dead-end.
  useEffect(() => {
    if (!passkeysSupported()) return
    let cancelled = false
    const controller = new AbortController()

    void (async () => {
      const [biometric, conditional] = await Promise.all([
        biometricAuthenticatorAvailable(),
        conditionalMediationAvailable(),
      ])
      if (cancelled) return
      const unlock = biometric ? biometricName() : null
      setPasskeyLabel(unlock === null ? 'Sign in with a passkey' : `Sign in with ${unlock}`)
      if (!conditional) return

      autofillRequest.current = controller
      try {
        const options = await passkeyOptions({})
        if (cancelled) return
        const response = await assertPasskey(options, {
          conditional: true,
          signal: controller.signal,
        })
        track('passkey_autofill_used')
        await completePasskeySignIn(options, response)
      } catch (err) {
        // Nobody asked for this request, so a failure has no error to report:
        // either we cancelled it ourselves or the user simply never touched it.
        if (!cancelled && !isPasskeyAbort(err)) track('passkey_autofill_failed')
      } finally {
        if (autofillRequest.current === controller) autofillRequest.current = null
      }
    })()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [passkeyOptions, completePasskeySignIn])

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
        // Straight to the app. The passkey offer lives on /verify, which is
        // where a new account lands once it follows the confirmation link —
        // with email verification on (convex/auth.ts) sign-up never returns a
        // session, so there is no signed-in moment to intercept here.
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
    // The autofill request is still open; a modal one cannot start until it
    // closes, so cancel it rather than letting the button fail silently.
    autofillRequest.current?.abort()
    autofillRequest.current = null

    setError(null)
    setSubmitting(true)
    track('passkey_login_started')
    try {
      const options = await passkeyOptions({})
      const response = await assertPasskey(options)
      await completePasskeySignIn(options, response)
    } catch (err) {
      // Unlike autofill, the user pressed a button and is owed an answer. Even
      // the dismissal case gets one: `NotAllowedError` is also what a device
      // with no passkey for us returns, and reporting nothing made the button
      // look broken to exactly the people who had never set one up.
      track('passkey_login_failed')
      setError(passkeyErrorMessage(err, 'signIn'))
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
            // `webauthn` is what puts this device's passkeys in the autofill
            // dropdown for this field — without it the conditional request
            // above has nowhere to render, on Apple and Android alike.
            autoComplete={isSignIn ? 'username webauthn' : 'email'}
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
