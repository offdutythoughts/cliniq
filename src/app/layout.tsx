import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono, Fraunces, Inter_Tight } from 'next/font/google'
import { ConvexClientProvider } from './ConvexClientProvider'
import { PostHogIdentify } from './PostHogProvider'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

// The public site runs its own type pairing — an old-style serif for display
// (Fraunces, set crisp: no wonk, no softness) over a neutral grotesque body
// (Inter Tight). The clinical app keeps DM Sans; the two never mix on a page.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vetic — Clinical support tool for veterinarians',
  description:
    'Vetic is a clinical support tool for veterinarians: sign-led flowcharts, diagnostic approaches, disease pages and protocols for dogs and cats.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Pinch-zoom is the reading affordance on a flowchart page. Rows shrink to
  // fit the width and, at their legible floor, scroll rather than shrink
  // further — so on a phone the densest rows sit at that floor and enlarging
  // them is how the reader gets a closer look. Locking the scale takes that
  // away, and
  // `user-scalable=no` is a WCAG 2.1 1.4.4 failure besides. iOS honours
  // userScalable; Android honours maximumScale, so both are set.
  // NB: enabling this re-arms iOS Safari's focus auto-zoom for any field under
  // 16px — globals.css gives touch devices 16px fields to keep taps from
  // jumping the page.
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  // Mobile browser chrome follows the OS scheme (the in-app theme is attribute-
  // driven, but this is the closest the static viewport meta can get).
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
}

const htmlBody = (children: React.ReactNode) => (
  <html
    lang="en"
    className={`${dmSans.variable} ${dmMono.variable} ${fraunces.variable} ${interTight.variable}`}
    suppressHydrationWarning
  >
    <head>
      {/* Render-blocking pre-hydration theme init (public/theme-init.js): sets
          data-theme before paint so dark-mode users don't get a light flash.
          External (not inline) so no dangerouslySetInnerHTML anywhere. The
          synchronous load is intentional and required — it MUST run before the
          body paints, so the no-sync-scripts guidance doesn't apply here. */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="/theme-init.js" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </head>
    <body>{children}</body>
  </html>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Without a Convex URL (local dev), skip auth providers entirely
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return htmlBody(children)
  }

  // Dynamic import so the module is never loaded when Convex isn't configured
  const { ConvexAuthNextjsServerProvider } = await import('@convex-dev/auth/nextjs/server')

  return (
    <ConvexAuthNextjsServerProvider>
      {htmlBody(<ConvexClientProvider><PostHogIdentify />{children}</ConvexClientProvider>)}
    </ConvexAuthNextjsServerProvider>
  )
}
