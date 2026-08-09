'use client'

import { useAction } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { track } from '../lib/analytics'
import {
  biometricAuthenticatorAvailable,
  createPasskey,
  isPasskeyCancellation,
  passkeysSupported,
  suggestPasskeyLabel,
} from '../lib/passkeys'
import { ErrorNote, primaryButtonClass } from './site/AuthShell'

/**
 * The "add a passkey to this device" button, shared by the post-verification
 * screen and the account page. Requires a live session — registration is always
 * an act by a signed-in user.
 *
 * Renders nothing at all where WebAuthn isn't available, so the surrounding
 * page has to read fine without it.
 */
export default function PasskeyPrompt({
  onDone,
  label = 'Set up',
}: {
  /** Called after a passkey is successfully registered. */
  onDone?: () => void
  /** Verb for the button, e.g. "Set up" or "Add another". */
  label?: string
}) {
  const registerOptions = useAction(api.passkeys.registerOptions)
  const registerVerify = useAction(api.passkeys.registerVerify)
  const [available, setAvailable] = useState<'unknown' | 'no' | 'biometric' | 'generic'>('unknown')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      const supported = passkeysSupported()
      const biometric = supported && (await biometricAuthenticatorAvailable())
      if (cancelled) return
      setAvailable(!supported ? 'no' : biometric ? 'biometric' : 'generic')
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (available === 'unknown' || available === 'no') return null

  async function register() {
    setError(null)
    setBusy(true)
    track('passkey_registration_started')
    try {
      const options = await registerOptions({})
      const response = await createPasskey(options)
      const { challenge } = JSON.parse(options) as { challenge: string }
      await registerVerify({ challenge, response, label: suggestPasskeyLabel() })
      track('passkey_registration_succeeded')
      onDone?.()
    } catch (err) {
      if (isPasskeyCancellation(err)) {
        setError('No passkey was created — the prompt was dismissed.')
      } else if (err instanceof DOMException && err.name === 'InvalidStateError') {
        // The authenticator recognised itself in excludeCredentials.
        setError('This device already has a passkey for your account.')
      } else {
        track('passkey_registration_failed')
        setError('We couldn’t set up a passkey on this device. You can try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  const biometric = available === 'biometric'

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">
          {biometric ? 'Sign in with Face ID or Touch ID' : 'Sign in with a passkey'}
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--v-slate)]">
          {biometric
            ? 'Next time, unlock Vetic with your face or fingerprint instead of typing a password. The biometric check happens on this device — Vetic only ever sees a signature.'
            : 'Store a passkey on this device or security key and sign in without a password. Nothing secret leaves the device.'}
        </p>
      </div>

      {error && <ErrorNote>{error}</ErrorNote>}

      <button type="button" onClick={register} disabled={busy} className={primaryButtonClass}>
        {busy ? 'Waiting for your device…' : `${label} ${biometric ? 'Face ID / Touch ID' : 'a passkey'}`}
      </button>
    </div>
  )
}
