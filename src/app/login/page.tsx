'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const { signIn } = useAuthActions()
  const router = useRouter()
  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--navy)' }}>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setError(null)
          setSubmitting(true)
          const form = new FormData(e.currentTarget)
          form.set('flow', flow)
          try {
            await signIn('password', form)
            router.push('/')
          } catch (err) {
            setError(friendlyAuthError(err, flow))
            setSubmitting(false)
          }
        }}
        style={{
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          padding: 24,
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>
          {flow === 'signIn' ? 'Sign in to ClinIQ' : 'Create your ClinIQ account'}
        </div>

        <label style={{ fontSize: 12, color: 'var(--gray)' }}>Email</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
        />

        <label style={{ fontSize: 12, color: 'var(--gray)' }}>Password</label>
        <input
          name="password"
          type="password"
          required
          autoComplete={flow === 'signIn' ? 'current-password' : 'new-password'}
          minLength={8}
          style={inputStyle}
        />

        {error && (
          <div style={{ fontSize: 12, color: 'var(--red)', background: 'var(--em-bg)', padding: '6px 10px', borderRadius: 6 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: 8,
            padding: '10px 14px',
            background: 'var(--teal-light)',
            color: '#fff',
            border: 0,
            borderRadius: 8,
            fontWeight: 600,
            cursor: submitting ? 'default' : 'pointer',
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? '…' : flow === 'signIn' ? 'Sign in' : 'Create account'}
        </button>

        <button
          type="button"
          onClick={() => {
            setFlow(flow === 'signIn' ? 'signUp' : 'signIn')
            setError(null)
          }}
          style={{
            background: 'transparent',
            border: 0,
            color: 'var(--gray)',
            fontSize: 12,
            cursor: 'pointer',
            marginTop: 4,
          }}
        >
          {flow === 'signIn' ? "Need an account? Sign up" : 'Have an account? Sign in'}
        </button>
      </form>
    </div>
  )
}

function friendlyAuthError(err: unknown, flow: 'signIn' | 'signUp'): string {
  const raw = err instanceof Error ? err.message : String(err)
  if (/InvalidAccountId|InvalidSecret/i.test(raw)) {
    return flow === 'signIn'
      ? 'Invalid email or password.'
      : 'That email is already in use.'
  }
  if (/TooShort|password/i.test(raw) && flow === 'signUp') {
    return 'Password must be at least 8 characters.'
  }
  return 'Something went wrong. Please try again.'
}

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  background: 'var(--navy)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--white)',
  fontSize: 14,
  fontFamily: 'inherit',
}
