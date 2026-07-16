'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { styleStringToObject as s } from './screens/style'

// App-level safety net: any uncaught render error in the route (e.g. a Convex
// query that throws because a backend function is missing) lands here instead
// of Next's bare default global-error screen — so users get a themed, in-brand
// "try again" rather than a locked-out black page.
//
// Note: Next 16 passes `unstable_retry` (not the stock `reset`) to re-render the
// segment. See node_modules/next/dist/docs/.../error-handling.md.
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error('App render error:', error)
  }, [error])

  return (
    <div style={s('height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;background:var(--navy);')}>
      <div style={s('font-size:40px;line-height:1;')}>⚠️</div>
      <div style={s('font-size:18px;font-weight:700;color:var(--white);')}>Something went wrong</div>
      <div style={s('font-size:13px;color:var(--gray);max-width:320px;line-height:1.5;')}>
        The app hit an unexpected error. Try again — if it keeps happening, reload the page.
      </div>
      <button
        onClick={() => unstable_retry()}
        style={s('margin-top:4px;padding:12px 24px;background:var(--teal);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;')}
      >
        Try again
      </button>
    </div>
  )
}
