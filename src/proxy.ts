import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// When Convex is not configured locally, or in dev mode, skip auth middleware entirely
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
const isDev = process.env.NODE_ENV === 'development'

// Dynamically import the real middleware only when Convex is configured and not in dev mode
const convexMiddleware = hasConvex && !isDev
  ? (() => {
      const {
        convexAuthNextjsMiddleware,
        createRouteMatcher,
        nextjsMiddlewareRedirect,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require('@convex-dev/auth/nextjs/server') as typeof import('@convex-dev/auth/nextjs/server')
      const isPublicRoute = createRouteMatcher(['/login'])
      return convexAuthNextjsMiddleware(async (request: NextRequest, { convexAuth }: { convexAuth: { isAuthenticated: () => Promise<boolean> } }) => {
        if (isPublicRoute(request)) return
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
