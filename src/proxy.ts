import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  : (_request: NextRequest) => NextResponse.next()

export default convexMiddleware

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
