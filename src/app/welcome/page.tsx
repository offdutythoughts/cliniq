'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PasskeyPrompt from '../../components/PasskeyPrompt'
import { AuthShell, secondaryButtonClass } from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'
import { passkeysSupported } from '../../lib/passkeys'

/**
 * Where a brand-new account lands, straight after sign-up creates its session.
 *
 * The only job here is to offer a passkey at the one moment the user is
 * guaranteed to be thinking about how they get back in. /verify makes the same
 * offer after an emailed confirmation link, but email verification is off (see
 * convex/auth.ts), so nobody reaches it — without this page a new account is
 * never told passkeys exist, and the passkey button on /login has nothing to
 * find when they next return.
 *
 * Not a public route: the middleware in src/proxy.ts requires the session that
 * sign-up has just created, and PasskeyPrompt's registration actions require it
 * again on the server.
 */
export default function WelcomePage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <Welcome />
}

function Welcome() {
  const router = useRouter()

  // PasskeyPrompt renders nothing where WebAuthn is unavailable, which would
  // strand this page on a title and a "skip" button. Nothing to offer means
  // nothing to stop for, so move on. The check has to wait for the client —
  // `window` decides it — but it costs one frame, not a visible screen.
  useEffect(() => {
    if (!passkeysSupported()) router.replace('/app')
  }, [router])

  return (
    <AuthShell
      title="You’re in"
      subtitle="One last thing, and it takes a couple of seconds: set up a faster way back in next time."
      steps={[
        { label: 'Account', state: 'done' },
        { label: 'Sign-in', state: 'current' },
      ]}
      footer={
        <>
          You can add or remove passkeys later from{' '}
          <strong className="text-[var(--v-ink)]">Your account</strong>.
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <PasskeyPrompt
          onDone={() => {
            track('passkey_added_at_signup')
            router.replace('/app')
          }}
        />
        <button
          type="button"
          onClick={() => {
            track('passkey_signup_offer_skipped')
            router.replace('/app')
          }}
          className={secondaryButtonClass}
        >
          Skip for now
        </button>
      </div>
    </AuthShell>
  )
}
