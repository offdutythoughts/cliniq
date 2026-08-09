'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import Link from 'next/link'
import { useState } from 'react'
import {
  AuthShell,
  ErrorNote,
  fieldClass,
  labelClass,
  primaryButtonClass,
} from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'

/**
 * Forgotten password, step one: ask Convex Auth to email a reset link
 * (convex/passwordReset.ts). The link lands on /reset.
 *
 * The confirmation is deliberately the same whether or not the address has an
 * account — otherwise this page answers "who is registered with Vetic?" for
 * anyone who asks. The underlying call does throw for an unknown address; that
 * is swallowed here on purpose.
 */
export default function ForgotPasswordPage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <ForgotPasswordForm />
}

function ForgotPasswordForm() {
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const normalised = email.trim().toLowerCase()
    track('password_reset_requested')
    try {
      await signIn('password', { email: normalised, flow: 'reset' })
    } catch (err) {
      // A misconfigured mail setup is a real failure worth showing; "no such
      // account" is not, and must not be distinguishable from success.
      const raw = err instanceof Error ? err.message : String(err)
      if (/SITE_URL|Resend|send the email/i.test(raw)) {
        setError('We couldn’t send the email just now. Please try again in a moment.')
        setSubmitting(false)
        return
      }
    }
    setSent(normalised)
    setSubmitting(false)
  }

  if (sent !== null) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle={
          <>
            If <strong className="text-[var(--v-ink)]">{sent}</strong> has a Vetic account, a reset
            link is on its way. It expires in an hour.
          </>
        }
        footer={
          <Link href="/login" className="font-semibold text-[var(--v-navy)] no-underline">
            Back to sign in
          </Link>
        }
      >
        <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
          Nothing after a few minutes? Check your spam folder, and make sure you used the address
          you signed up with.
        </p>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Tell us the address you signed up with and we’ll email you a link to set a new password."
      footer={
        <>
          Remembered it?{' '}
          <Link href="/login" className="font-semibold text-[var(--v-navy)] no-underline">
            Sign in
          </Link>
        </>
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

        {error && <ErrorNote>{error}</ErrorNote>}

        <button type="submit" disabled={submitting} className={primaryButtonClass}>
          {submitting ? 'Sending…' : 'Email me a reset link'}
        </button>
      </form>
    </AuthShell>
  )
}
