import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

/** Shared classes so sign-in, sign-up and the paywall look like one flow. */
export const fieldClass = 'v-field'

export const labelClass = 'text-[13px] font-medium text-[var(--v-ink)]'

export const primaryButtonClass = 'v-btn v-btn-primary w-full'

export const secondaryButtonClass = 'v-btn v-btn-secondary w-full'

export const linkButtonClass =
  'text-[13px] font-medium text-[var(--v-slate)] underline decoration-[var(--v-line)] underline-offset-[3px] transition-colors hover:text-[var(--v-ink)]'

/** Inline form error — announced to screen readers as it appears. */
export function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-[8px] border border-[var(--v-brick)]/25 bg-[rgba(156,56,53,0.07)] px-3.5 py-2.5 text-[13px] leading-[1.6] text-[var(--v-brick)]"
    >
      {children}
    </p>
  )
}

/** Centred card layout used by every account screen. */
export function AuthShell({
  title,
  subtitle,
  steps,
  children,
  footer,
}: {
  title: string
  subtitle?: React.ReactNode
  /** Optional step indicator, e.g. ['Account', 'Verify email', 'Subscription']. */
  steps?: { label: string; state: 'done' | 'current' | 'todo' }[]
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="site-page">
      <SiteHeader showNav={false} />
      <main className="mx-auto flex w-full max-w-[460px] flex-col px-5 py-14">
        {steps && steps.length > 0 && (
          <ol className="mb-8 flex list-none items-center gap-3" aria-label="Progress">
            {steps.map((step) => (
              <li
                key={step.label}
                aria-current={step.state === 'current' ? 'step' : undefined}
                className={`flex-1 border-t pt-2.5 text-[11px] font-semibold tracking-[.1em] uppercase ${
                  step.state === 'todo'
                    ? 'border-[var(--v-line)] text-[#A2A394]'
                    : 'border-[var(--v-brick)] text-[var(--v-brick)]'
                }`}
              >
                {step.label}
              </li>
            ))}
          </ol>
        )}

        <div className="rounded-[14px] border border-[var(--v-line)] bg-white p-7 sm:p-8">
          <h1 className="v-display text-[27px] text-[var(--v-ink)]">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-[14px] leading-[1.65] text-[var(--v-slate)]">{subtitle}</p>
          )}
          <div className="mt-7">{children}</div>
        </div>

        {/* No "back to home" link: `/` redirects to the app, which sends a
            signed-out visitor straight back here. */}
        {footer && (
          <div className="mt-6 text-center text-[14px] text-[var(--v-slate)]">{footer}</div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
