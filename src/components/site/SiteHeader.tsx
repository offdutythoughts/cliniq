'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { href: '/#features', label: 'What it does' },
  { href: '/#how', label: 'How it works' },
  { href: '/#about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
]

/** Header for the public pages. Nav collapses into a disclosure panel on mobile. */
export function SiteHeader({ showNav = true }: { showNav?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--v-line)] bg-[var(--v-paper)]">
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center gap-8 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <Image src="/vetic-mark.png" alt="" width={30} height={30} priority className="h-[30px] w-auto" />
          <span className="text-[19px] leading-none font-semibold tracking-[-0.01em] text-[var(--v-ink)]">
            Vetic
          </span>
        </Link>

        {showNav && (
          <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] whitespace-nowrap text-[var(--v-slate)] no-underline transition-colors hover:text-[var(--v-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className={`hidden items-center gap-2 lg:flex ${showNav ? '' : 'ml-auto'}`}>
          <Link href="/login" className="v-btn v-btn-secondary border-transparent">
            Sign in
          </Link>
          <Link href="/login" className="v-btn v-btn-primary">
            Create account
          </Link>
        </div>

        {showNav ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="ml-auto grid h-11 w-11 place-items-center rounded-lg border border-[var(--v-line)] lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden className="flex w-4 flex-col gap-[3px]">
              <span className="h-[1.5px] w-full bg-[var(--v-ink)]" />
              <span className="h-[1.5px] w-full bg-[var(--v-ink)]" />
              <span className="h-[1.5px] w-full bg-[var(--v-ink)]" />
            </span>
          </button>
        ) : (
          <Link href="/login" className="v-btn v-btn-secondary ml-auto border-transparent lg:hidden">
            Sign in
          </Link>
        )}
      </div>

      {showNav && open && (
        <div id="site-menu" className="border-t border-[var(--v-line)] bg-[var(--v-paper)] lg:hidden">
          <nav className="mx-auto flex max-w-[1180px] flex-col px-5 py-2" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--v-line)] py-3.5 text-[15px] text-[var(--v-ink)] no-underline"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-4">
              <Link href="/login" onClick={() => setOpen(false)} className="v-btn v-btn-primary">
                Create account
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className="v-btn v-btn-secondary">
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
