import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { ConvexClientProvider } from './ConvexClientProvider'
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
  title: 'ClinIQ — Portable Vet Guide',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F1F5F9',
}

const htmlBody = (children: React.ReactNode) => (
  <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
    <head>
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
      {htmlBody(<ConvexClientProvider>{children}</ConvexClientProvider>)}
    </ConvexAuthNextjsServerProvider>
  )
}
