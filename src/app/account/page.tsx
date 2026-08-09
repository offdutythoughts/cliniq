'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useMutation, useQuery } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'
import PasskeyPrompt from '../../components/PasskeyPrompt'
import { AuthShell, linkButtonClass, secondaryButtonClass } from '../../components/site/AuthShell'
import { track } from '../../lib/analytics'

/**
 * Account and sign-in settings: which passkeys can open this account, and the
 * way back to a password reset. Gated by the middleware like /app is.
 */
export default function AccountPage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <AccountSettings />
}

function AccountSettings() {
  const router = useRouter()
  const { signOut } = useAuthActions()
  const me = useQuery(api.users.me)
  const passkeys = useQuery(api.passkeys.list)
  const removePasskey = useMutation(api.passkeys.remove)
  const [pending, setPending] = useState<Id<'passkeys'> | null>(null)

  return (
    <AuthShell
      title="Your account"
      subtitle={me?.email ?? undefined}
      footer={
        <Link href="/app" className="font-semibold text-[var(--v-navy)] no-underline">
          Back to Vetic
        </Link>
      }
    >
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">Passkeys</h2>
          {passkeys === undefined ? (
            <p className="text-[13px] text-[var(--v-slate)]">Loading…</p>
          ) : passkeys.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
              No passkeys yet. Add one and this device can sign you in with Face ID, Touch ID,
              Windows Hello or a security key.
            </p>
          ) : (
            <ul className="flex list-none flex-col gap-2 p-0">
              {passkeys.map((passkey) => (
                <li
                  key={passkey._id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--v-line)] p-3.5"
                >
                  <span>
                    <span className="block text-[14px] font-semibold text-[var(--v-ink)]">
                      {passkey.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-[var(--v-slate)]">
                      Added {formatDate(passkey.createdAt)}
                      {passkey.lastUsedAt !== undefined
                        ? ` · last used ${formatDate(passkey.lastUsedAt)}`
                        : ' · not used yet'}
                      {passkey.backedUp ? ' · synced' : ''}
                    </span>
                  </span>
                  <button
                    type="button"
                    disabled={pending === passkey._id}
                    onClick={async () => {
                      setPending(passkey._id)
                      try {
                        await removePasskey({ id: passkey._id })
                        track('passkey_removed')
                      } finally {
                        setPending(null)
                      }
                    }}
                    className={linkButtonClass}
                  >
                    {pending === passkey._id ? 'Removing…' : 'Remove'}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <PasskeyPrompt label={passkeys && passkeys.length > 0 ? 'Add another' : 'Set up'} />
        </section>

        <section className="flex flex-col gap-3 border-t border-[var(--v-line)] pt-7">
          <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">Password</h2>
          <p className="text-[13px] leading-relaxed text-[var(--v-slate)]">
            Changing your password is the same route as forgetting it: we email a link, and setting
            a new password signs out every other device.
          </p>
          <Link href="/forgot" className={secondaryButtonClass}>
            Email me a password reset link
          </Link>
        </section>

        <section className="border-t border-[var(--v-line)] pt-7">
          <button
            type="button"
            onClick={async () => {
              track('logged_out')
              await signOut()
              router.replace('/')
            }}
            className={secondaryButtonClass}
          >
            Log out
          </button>
        </section>
      </div>
    </AuthShell>
  )
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
