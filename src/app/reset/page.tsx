'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import {
  AuthShell,
  ErrorNote,
  fieldClass,
  labelClass,
  primaryButtonClass,
} from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'
import { unpackCredential } from '../../lib/credentialLink'

/**
 * Forgotten password, step two: where the reset link lands
 * (convex/passwordReset.ts builds it) with the address and token packed into `t`.
 *
 * Submitting sets the new password, signs this browser in, and — because
 * Convex Auth invalidates the account's other sessions on reset — logs out
 * anyone else who was holding the old one.
 */
export default function ResetPasswordPage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  )
}

function ResetPasswordForm() {
  const params = useSearchParams()
  const router = useRouter()
  const { signIn } = useAuthActions()
  // One parameter, `t`, holding `address~token` — see convex/emailVerification.ts.
  const { email, code } = unpackCredential(params.get('t'))
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Those two passwords don’t match.')
      return
    }
    setSubmitting(true)
    track('password_reset_submitted')
    try {
      await signIn('password', { email, code, newPassword: password, flow: 'reset-verification' })
      track('password_reset_succeeded')
      router.replace('/app')
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err)
      setError(
        /TooShort|Invalid password/i.test(raw)
          ? 'Please choose a password of at least 8 characters.'
          : 'That link has expired or has already been used. Request a new one below.',
      )
      setSubmitting(false)
    }
  }

  if (email === '' || code === '') {
    return (
      <AuthShell title="That link didn’t work" subtitle="It looks incomplete.">
        <div className="flex flex-col gap-4">
          <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
            Some email clients cut long links in half. Request a new one and open it in a single
            click rather than copying it across.
          </p>
          <Link href="/forgot" className={primaryButtonClass}>
            Request a new link
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle={
        <>
          Setting a new password for <strong className="text-[var(--v-ink)]">{email}</strong>. Any
          other device signed in to this account will be signed out.
        </>
      }
      footer={
        <Link href="/forgot" className="font-semibold text-[var(--v-navy)] no-underline">
          Send me a new link
        </Link>
      }
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="password">
            New password
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
            Confirm new password
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

        <button type="submit" disabled={submitting} className={primaryButtonClass}>
          {submitting ? 'Saving…' : 'Set new password'}
        </button>
      </form>
    </AuthShell>
  )
}

function Loading() {
  return (
    <AuthShell title="Choose a new password">
      <p className="text-[13px] text-[var(--v-slate)]" role="status">
        Loading…
      </p>
    </AuthShell>
  )
}
