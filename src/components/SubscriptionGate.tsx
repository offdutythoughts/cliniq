'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '../../convex/_generated/api'
import { AuthShell, primaryButtonClass, secondaryButtonClass } from './site/AuthShell'
import { track } from '../lib/analytics'

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

/**
 * Holds the clinical app back until the signed-in user has an active or trialing
 * subscription. Authentication itself is enforced by the middleware (src/proxy.ts);
 * this is the entitlement half, and it renders the paywall rather than redirecting
 * so the user keeps their place and can subscribe in one click.
 *
 * With no Convex deployment configured (local no-auth build, visual tests) it is
 * a passthrough.
 */
export function SubscriptionGate({ children }: { children: React.ReactNode }) {
  if (!hasConvex) return <>{children}</>
  return <Gate>{children}</Gate>
}

function Gate({ children }: { children: React.ReactNode }) {
  const status = useQuery(api.subscriptions.status)

  if (status === undefined) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--v-paper)]">
        <p className="text-[13px] text-[var(--v-slate)]">Loading your account…</p>
      </div>
    )
  }

  if (!status.signedIn) {
    return (
      <AuthShell
        title="Sign in to continue"
        subtitle="Vetic's clinical library is available to signed-in subscribers."
      >
        <Link href="/login" className={`${primaryButtonClass} block text-center no-underline`}>
          Sign in
        </Link>
        <Link
          href="/signup"
          className={`${secondaryButtonClass} mt-3 block text-center no-underline`}
        >
          Create an account
        </Link>
      </AuthShell>
    )
  }

  if (!status.entitled) return <Paywall lapsed={status.subscription !== null} />

  return <>{children}</>
}

function Paywall({ lapsed }: { lapsed: boolean }) {
  const { signOut } = useAuthActions()
  const router = useRouter()

  return (
    <AuthShell
      title={lapsed ? 'Your subscription has lapsed' : 'One step left'}
      subtitle={
        lapsed
          ? 'Renew to get back to the flowcharts, disease pages and protocols.'
          : 'Your account is ready — choose a plan to unlock the clinical library.'
      }
    >
      <Link
        href="/signup"
        onClick={() => track('paywall_cta_clicked', { lapsed })}
        className={`${primaryButtonClass} block text-center no-underline`}
      >
        {lapsed ? 'Renew my subscription' : 'Choose a plan'}
      </Link>
      <Link
        href="/pricing"
        className={`${secondaryButtonClass} mt-3 block text-center no-underline`}
      >
        Compare plans
      </Link>
      <button
        type="button"
        onClick={async () => {
          track('logged_out')
          await signOut()
          router.replace('/')
        }}
        className="mt-4 w-full text-[12px] font-medium text-[var(--v-slate)] hover:text-[var(--v-ink)]"
      >
        Log out
      </button>
    </AuthShell>
  )
}
