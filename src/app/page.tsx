import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Vetic — Join the beta',
  description: 'Vetic is opening up to a small beta group of veterinarians. Request access to join.',
  openGraph: {
    title: 'Vetic — Join the beta',
    description: 'Vetic is opening up to a small beta group of veterinarians. Request access to join.',
    type: 'website',
  },
}

// The marketing homepage is OPT-IN. `/` redirects to the clinical app at /app
// (which the proxy gates behind sign-in) unless SERVE_MARKETING_HOME is exactly
// 'true'. Anything else — unset, empty, misspelled, or a deploy whose env vars
// failed to apply — falls through to the redirect.
//
// The default is deny on purpose. The two failure modes are not symmetric: a
// preview that redirects is a nuisance someone notices in a minute, while a
// production deploy that serves the marketing page puts the wrong thing in
// front of customers and may sit there unnoticed. An earlier version keyed on
// `VERCEL_ENV === 'production'`, which fails the wrong way — if that variable
// were ever absent the marketing page would be served.
//
// Production therefore needs no configuration at all; it is the default.
// SERVE_MARKETING_HOME=true must be set wherever the marketing page IS wanted:
// the Preview environment in Vercel, and .env.local for `next dev`.
//
// Server-side variable — do not rename it to the NEXT_PUBLIC_ form, which would
// inline the value into the client bundle and leak the switch to the browser.
//
// This replaces b00defb, where production carried its own copy of this file.
// That made every promotion touching the homepage a merge conflict (e675b78 was
// the first) with a wrong resolution putting marketing back in front of
// customers. The switch now lives in one file on main.
export default function HomePage() {
  if (process.env.SERVE_MARKETING_HOME !== 'true') redirect('/app')

  return (
    <div className="site-page flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <Image
          src="/vetic-mark.png"
          alt=""
          width={44}
          height={44}
          priority
          className="h-11 w-auto"
        />

        <p className="v-eyebrow-plain mt-6">Private beta</p>
        <h1 className="v-display mt-4 max-w-xl text-[36px] text-balance sm:text-[46px]">
          Welcome to the beta!
        </h1>
        <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-[var(--v-slate)]">
          Really glad to have you on board and thank you for participating. Your feedback is
          invaluable to us as we shape a tool that is most useful to you.
        </p>

        <Link href="/login" className="v-btn v-btn-primary mt-8">
          Sign in
        </Link>
      </main>

      <footer className="px-5 py-8 text-center text-[12px] text-[var(--v-slate)] sm:px-8">
        © {new Date().getFullYear()} Vetic.
      </footer>
    </div>
  )
}
