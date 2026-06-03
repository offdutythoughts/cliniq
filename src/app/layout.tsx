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
  // Mobile browser chrome follows the OS scheme (the in-app theme is attribute-
  // driven, but this is the closest the static viewport meta can get).
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
}

// Set data-theme from localStorage BEFORE paint so dark-mode users don't get a
// light flash. Runs in <head> ahead of hydration; <html> has suppressHydrationWarning.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('cliniq-theme')||'light'}catch(e){}`

const htmlBody = (children: React.ReactNode) => (
  <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
