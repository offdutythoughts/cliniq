import Image from 'next/image'
import Link from 'next/link'

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Inside Vetic',
    links: [
      { href: '/#features', label: 'Clinical sign flows' },
      { href: '/#features', label: 'Diagnostic approaches' },
      { href: '/#features', label: 'Mix & Match' },
      { href: '/#features', label: 'Disease pages & protocols' },
    ],
  },
  {
    title: 'Account',
    links: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/login', label: 'Create an account' },
      { href: '/login', label: 'Sign in' },
    ],
  },
  {
    title: 'Vetic',
    links: [
      { href: '/#about', label: 'About us' },
      { href: '/#how', label: 'How it works' },
    ],
  },
]

/** Footer for the public pages, including the clinical-use disclaimer. */
export function SiteFooter() {
  return (
    <footer className="v-panel-mist mt-auto border-t border-[var(--v-line)]">
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Image
              src="/vetic-logo.png"
              alt="Vetic — clinical support tool"
              width={578}
              height={644}
              className="h-[92px] w-auto"
            />
            <p className="mt-5 text-[13px] leading-[1.65] text-[var(--v-slate)]">
              Vetic supports clinical reasoning. It does not replace your professional judgement,
              and every dose should be confirmed against a current formulary for the patient in
              front of you.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="v-eyebrow-plain">{col.title}</h2>
              <ul className="mt-4 list-none space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[var(--v-slate)] no-underline transition-colors hover:text-[var(--v-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="v-hairline my-10" />

        <div className="flex flex-col gap-2 text-[12px] text-[var(--v-slate)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vetic. For use by qualified veterinary professionals.</p>
          <p>Dog and cat content, referenced to current veterinary texts.</p>
        </div>
      </div>
    </footer>
  )
}
