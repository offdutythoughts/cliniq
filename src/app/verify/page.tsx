'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import PasskeyPrompt from '../../components/PasskeyPrompt'
import {
  AuthShell,
  ErrorNote,
  primaryButtonClass,
  secondaryButtonClass,
} from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'

/**
 * Where the confirmation link lands (convex/emailVerification.ts builds it).
 *
 * The link carries `email` and `code`; redeeming them is one call, and it both
 * marks the address verified and signs this browser in. Then we offer a passkey
 * straight away — the moment someone has just proved they own the address is
 * the best moment to ask, and it means their next sign-in is a fingerprint.
 */
export default function VerifyPage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return (
    <Suspense fallback={<Verifying />}>
      <VerifyFlow />
    </Suspense>
  )
}

type State = 'verifying' | 'verified' | 'failed'

function VerifyFlow() {
  const params = useSearchParams()
  const router = useRouter()
  const { signIn } = useAuthActions()
  const email = (params.get('email') ?? '').trim().toLowerCase()
  const code = params.get('code') ?? ''
  const [state, setState] = useState<State>('verifying')
  // React runs effects twice in development; a verification code is single-use,
  // so the second run would report a valid link as expired.
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    void (async () => {
      if (email === '' || code === '') {
        setState('failed')
        return
      }
      try {
        await signIn('password', { email, code, flow: 'email-verification' })
        track('email_verified')
        setState('verified')
      } catch {
        track('email_verification_failed')
        setState('failed')
      }
    })()
  }, [email, code, signIn])

  if (state === 'verifying') return <Verifying />

  if (state === 'failed') {
    return (
      <AuthShell
        title="That link didn’t work"
        subtitle="Confirmation links last 24 hours and can only be used once."
      >
        <div className="flex flex-col gap-4">
          <ErrorNote>
            This one has expired, has already been used, or was cut in half by your email client.
          </ErrorNote>
          <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
            Sign in with your email and password and we’ll send a fresh link. If you’ve already
            confirmed this address, signing in will just work.
          </p>
          <Link href="/login" className={primaryButtonClass}>
            Go to sign in
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Email confirmed"
      subtitle={
        <>
          <strong className="text-[var(--v-ink)]">{email}</strong> is verified and you’re signed in
          on this device.
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <PasskeyPrompt onDone={() => router.replace('/app')} />
        <button type="button" onClick={() => router.replace('/app')} className={secondaryButtonClass}>
          Skip for now
        </button>
      </div>
    </AuthShell>
  )
}

function Verifying() {
  return (
    <AuthShell title="Confirming your email" subtitle="One moment.">
      <p className="text-[13px] text-[var(--v-slate)]" role="status">
        Checking your link…
      </p>
    </AuthShell>
  )
}
