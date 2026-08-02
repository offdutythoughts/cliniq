'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { PLANS, TRIAL_DAYS, planById, type PlanId } from '../../lib/plans'

// Sign-up runs in three steps: create the login, confirm the email with a code,
// then take out a subscription — the app itself stays locked until that last
// step lands (see convex/subscriptions.ts and components/SubscriptionGate.tsx).
type Step = 'account' | 'verify' | 'subscribe'

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function SignupFlow() {
  if (!hasConvex) {
    return (
      <AuthShell
        title="Create your Vetic account"
        subtitle="Accounts need the Vetic backend, which isn't configured in this build."
      >
        <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
          Set <code className="font-[family-name:var(--font-dm-mono)]">NEXT_PUBLIC_CONVEX_URL</code> to run
          sign-up locally.
        </p>
      </AuthShell>
    )
  }
  return <Flow />
}

function Flow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuthActions()
  const startTrial = useMutation(api.subscriptions.startTrial)
  const status = useQuery(api.subscriptions.status)

  const [rawStep, setStep] = useState<Step>('account')
  const [plan, setPlan] = useState<PlanId>(planById(searchParams.get('plan'))?.id ?? 'annual')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const signedIn = status?.signedIn ?? false
  const entitled = status?.entitled ?? false

  // Someone who is already signed in doesn't need the first two steps: a live
  // session means the login exists and the email is verified, so the only thing
  // left is the subscription. Derived rather than pushed into state so the query
  // resolving mid-flow can't fight the user's own step transitions.
  const step: Step = signedIn ? 'subscribe' : rawStep

  useEffect(() => {
    if (signedIn && entitled) router.replace('/app')
  }, [signedIn, entitled, router])

  const steps = [
    { label: 'Account', state: stepState(step, 'account') },
    { label: 'Verify email', state: stepState(step, 'verify') },
    { label: 'Subscription', state: stepState(step, 'subscribe') },
  ] as const

  async function submitAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    if (password !== confirm) {
      setError('Those two passwords don’t match.')
      return
    }
    const normalised = email.trim().toLowerCase()
    setBusy(true)
    track('signup_account_submitted', { plan })
    try {
      const result = await signIn('password', { email: normalised, password, flow: 'signUp' })
      setEmail(normalised)
      // With email verification enabled, sign-up sends a code instead of
      // returning a session — `signingIn` is false until the code is confirmed.
      if (result.signingIn) {
        setStep('subscribe')
      } else {
        setStep('verify')
        setNotice(`We’ve emailed a 6-digit code to ${normalised}.`)
      }
    } catch (err) {
      setError(signUpError(err))
    } finally {
      setBusy(false)
    }
  }

  async function submitCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      await signIn('password', { email, code: code.trim(), flow: 'email-verification' })
      track('signup_email_verified')
      setStep('subscribe')
    } catch {
      setError('That code isn’t right, or it has expired. Request a new one below.')
    } finally {
      setBusy(false)
    }
  }

  async function resendCode() {
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      // Signing in with an unverified email re-triggers the verification email.
      await signIn('password', { email, password, flow: 'signIn' })
      track('signup_code_resent')
      setNotice('New code sent — it can take a minute to arrive.')
    } catch {
      setError('We couldn’t send another code. Check the address and try again.')
    } finally {
      setBusy(false)
    }
  }

  async function subscribe() {
    setError(null)
    setNotice(null)
    setBusy(true)
    track('subscription_trial_started', { plan })
    try {
      const result = await startTrial({ plan })
      if (result.ok) {
        router.replace('/app')
      } else {
        setError(
          'The free trial has already been used on this account. Card checkout is being connected — please get in touch and we’ll sort access out.',
        )
      }
    } catch {
      setError('Something went wrong setting up your subscription. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (step === 'account') {
    return (
      <AuthShell
        title="Create your Vetic account"
        subtitle="Two minutes: confirm your email, pick a plan, and the whole clinical library is yours."
        steps={[...steps]}
        footer={
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[var(--v-navy)] no-underline">
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={submitAccount} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="email">
              Work email
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
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
              aria-describedby="password-hint"
            />
            <p id="password-hint" className="text-[11px] text-[var(--v-slate)]">
              At least 8 characters.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="confirm">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error && <ErrorNote>{error}</ErrorNote>}

          <button type="submit" disabled={busy} className={primaryButtonClass}>
            {busy ? 'Creating account…' : 'Continue'}
          </button>
          <p className="text-[11px] leading-relaxed text-[var(--v-slate)]">
            Vetic is intended for qualified veterinary professionals. You&rsquo;ll confirm your email
            address on the next step.
          </p>
        </form>
      </AuthShell>
    )
  }

  if (step === 'verify') {
    return (
      <AuthShell
        title="Confirm your email"
        subtitle={
          <>
            Enter the 6-digit code we sent to <strong className="text-[var(--v-ink)]">{email}</strong>.
            It expires in 15 minutes.
          </>
        }
        steps={[...steps]}
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

          <button type="submit" disabled={busy || code.length < 6} className={primaryButtonClass}>
            {busy ? 'Checking…' : 'Verify email'}
          </button>

          <div className="flex items-center justify-between">
            <button type="button" onClick={resendCode} disabled={busy} className={linkButtonClass}>
              Send a new code
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('account')
                setCode('')
                setError(null)
                setNotice(null)
              }}
              className={linkButtonClass}
            >
              Use a different email
            </button>
          </div>
        </form>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Choose your plan"
      subtitle={`Your email is confirmed. Pick how you'd like to be billed — the first ${TRIAL_DAYS} days are free, and both plans include everything.`}
      steps={[...steps]}
    >
      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2.5">
          <legend className="sr-only">Billing plan</legend>
          {PLANS.map((p) => (
            <label
              key={p.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                plan === p.id
                  ? 'border-[var(--v-navy)] bg-[var(--v-mist)]'
                  : 'border-[var(--v-line)] bg-white'
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={p.id}
                checked={plan === p.id}
                onChange={() => setPlan(p.id)}
                className="accent-[var(--v-navy)]"
              />
              <span className="flex-1">
                <span className="flex items-center gap-2 text-[14px] font-semibold text-[var(--v-ink)]">
                  {p.name}
                  {p.badge && (
                    <span className="rounded-full bg-[var(--v-navy)] px-2 py-0.5 text-[10px] font-semibold tracking-[.04em] text-[#F7F9FC] uppercase">
                      {p.badge}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[12px] text-[var(--v-slate)]">{p.note}</span>
              </span>
              <span className="text-right">
                <span className="block text-[16px] font-semibold text-[var(--v-ink)]">{p.price}</span>
                <span className="block text-[11px] text-[var(--v-slate)]">{p.cadence}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {error && <ErrorNote>{error}</ErrorNote>}

        <button type="button" onClick={subscribe} disabled={busy} className={primaryButtonClass}>
          {busy ? 'Setting up…' : `Start my ${TRIAL_DAYS}-day free trial`}
        </button>

        {/* Stripe checkout replaces this button: create a Checkout Session for the
            selected plan's price, then let the webhook write the subscription row. */}
        <button type="button" disabled className={secondaryButtonClass} title="Coming soon">
          Pay by card — Stripe checkout coming soon
        </button>

        <p className="text-[11px] leading-relaxed text-[var(--v-slate)]">
          No card needed for the trial. We&rsquo;ll email you before it ends, and you can cancel any
          time.
        </p>
      </div>
    </AuthShell>
  )
}

function stepState(current: Step, target: Step): 'done' | 'current' | 'todo' {
  const order: Step[] = ['account', 'verify', 'subscribe']
  const a = order.indexOf(current)
  const b = order.indexOf(target)
  return a === b ? 'current' : a > b ? 'done' : 'todo'
}

function signUpError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (/already exists|InvalidAccountId/i.test(raw)) {
    return 'An account with that email already exists — sign in instead.'
  }
  if (/Invalid password|TooShort/i.test(raw)) {
    return 'Please choose a password of at least 8 characters.'
  }
  if (/send the verification email|Resend/i.test(raw)) {
    return 'Your account was created but we couldn’t send the verification email. Please try again in a moment.'
  }
  return 'Something went wrong creating your account. Please try again.'
}
