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
      // The marketing site is public; the clinical app at /app is not. Sign-up
      // spans several steps (account → email code → subscription) and must stay
      // reachable while the user is only partly authenticated.
      const isPublicRoute = createRouteMatcher(['/', '/login', '/signup', '/pricing'])
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
