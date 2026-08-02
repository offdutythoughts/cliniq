'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import { Authenticated, Unauthenticated, useQuery } from 'convex/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { track } from '../lib/analytics'

const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function AccountMenu() {
  // Without Convex, skip auth UI entirely
  if (!hasConvex) return null

  return (
    <>
      <Authenticated>
        <SignedInMenu />
      </Authenticated>
      <Unauthenticated>
        <Link href="/login" style={signInLinkStyle}>
          Sign in
        </Link>
      </Unauthenticated>
    </>
  )
}

function SignedInMenu() {
  const { signOut } = useAuthActions()
  const router = useRouter()
  const me = useQuery(api.users.me)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const label = me?.email ?? 'Account'
  const initial = (me?.email?.[0] ?? 'A').toUpperCase()

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={triggerStyle}
        title={label}
      >
        <span style={avatarStyle}>{initial}</span>
      </button>
      {open && (
        <div role="menu" style={menuStyle}>
          <div style={{ padding: '8px 12px', fontSize: 12, color: 'var(--gray)', borderBottom: '1px solid var(--border)' }}>
            {label}
          </div>
          <button
            role="menuitem"
            onClick={async () => {
              setOpen(false)
              track('logged_out')
              await signOut()
              // Leave the gated app for the public homepage rather than sitting
              // on /app waiting for the middleware to bounce the next request.
              router.replace('/')
            }}
            style={menuItemStyle}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

const triggerStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  border: '1px solid var(--border)',
  background: 'var(--card)',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const avatarStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--white)',
}

const menuStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: 6,
  minWidth: 180,
  background: 'var(--navy2)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  zIndex: 50,
  overflow: 'hidden',
}

const menuItemStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '10px 12px',
  background: 'transparent',
  border: 0,
  color: 'var(--white)',
  cursor: 'pointer',
  fontSize: 13,
  fontFamily: 'inherit',
}

const signInLinkStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: 'var(--white)',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  padding: '4px 10px',
  textDecoration: 'none',
}
