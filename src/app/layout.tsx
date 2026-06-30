import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Vetic — Portable Vet Guide',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  // Mobile browser chrome follows the OS scheme (the in-app theme is attribute-
  // driven, but this is the closest the static viewport meta can get).
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
}

const htmlBody = (children: React.ReactNode) => (
  <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
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
