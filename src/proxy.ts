import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

// The one host this app is served from. `SITE_URL` on every deployment must
// agree with it: it is where emailed links point, and the origin passkeys are
// bound to. www and apex both resolving would mean a passkey registered on one
// silently failing on the other, and confirmation links leading users off the
// host they signed up on.
const CANONICAL_HOST = 'vetic.app'

// When Convex is not configured locally, skip auth middleware entirely
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
const isDev = process.env.NODE_ENV === 'development'

// Dynamically import the real middleware only when Convex is configured.
//
// It stays mounted in dev: `convexAuthNextjsMiddleware` is also what serves the
// /api/auth endpoint the Convex Auth client posts sign-in, sign-up and OTP
// verification to, so bypassing it locally used to 404 every auth action. Only
// the route gate below is relaxed in dev, so /app still opens without a session.
const convexMiddleware = hasConvex
  ? (() => {
      const {
        convexAuthNextjsMiddleware,
        createRouteMatcher,
        nextjsMiddlewareRedirect,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require('@convex-dev/auth/nextjs/server') as typeof import('@convex-dev/auth/nextjs/server')
      // The public routes; the clinical app at /app is not one of them. `/` and
      // /signup are redirects (to /app and /login) but must stay public, or the
      // middleware would bounce a signed-out visitor before the redirect runs.
      //
      // /verify, /forgot and /reset are the emailed-link landings. They are
      // reached with no session by definition — a signed-out person clicking a
      // link in their inbox — and each one is guarded by the single-use code in
      // its own query string, not by the middleware.
      const isPublicRoute = createRouteMatcher([
        '/',
        '/login',
        '/signup',
        '/pricing',
        '/verify',
        '/forgot',
        '/reset',
      ])
      return convexAuthNextjsMiddleware(async (request: NextRequest, { convexAuth }: { convexAuth: { isAuthenticated: () => Promise<boolean> } }) => {
        if (isDev || isPublicRoute(request)) return
        if (!(await convexAuth.isAuthenticated())) {
          return nextjsMiddlewareRedirect(request, '/login')
        }
      })
    })()
  : (_request: NextRequest, _event: NextFetchEvent) => NextResponse.next()

/**
 * Send www to the apex, before anything else runs.
 *
 * This has to live in middleware rather than `redirects` in next.config: for a
 * signed-out visitor to a private route the auth gate below returns a redirect
 * of its own, and middleware runs first — so a config-level rule would never be
 * reached, and the visitor would land on /login still on the wrong host.
 *
 * 308 keeps the method and tells browsers to stop asking. Only the exact www
 * host is matched, so localhost and preview deployments are untouched.
 */
export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.headers.get('host') === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone()
    url.host = CANONICAL_HOST
    url.port = ''
    // Pinned, not inherited: behind the proxy `nextUrl.protocol` can read as
    // http, which would send the browser to an insecure URL for one hop before
    // it gets upgraded. Anything arriving on this host is production traffic.
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }
  return convexMiddleware(request, event)
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
