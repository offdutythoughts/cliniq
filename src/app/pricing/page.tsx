import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '../../components/site/SiteFooter'
import { SiteHeader } from '../../components/site/SiteHeader'
import { PLAN_FEATURES, PLANS, TRIAL_DAYS } from '../../lib/plans'

export const metadata: Metadata = {
  title: 'Pricing — Vetic',
  description: `One subscription, the whole clinical library. Every account starts with a ${TRIAL_DAYS}-day free trial.`,
}

export default function PricingPage() {
  return (
    <div className="site-page">
      <SiteHeader />

      <main>
        <section className="border-b border-[var(--v-line)]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
            <div>
              <p className="v-eyebrow-plain">Pricing</p>
              <h1 className="v-display mt-6 text-[38px] sm:text-[46px]">
                One subscription, the whole library.
              </h1>
              <p className="mt-5 max-w-md text-[16px] leading-[1.7] text-[var(--v-slate)]">
                Both plans carry exactly the same content — they differ only in how often you are
                billed. Every account starts with {TRIAL_DAYS} days free, no card required.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col rounded-[14px] border p-7 ${
                    plan.badge
                      ? 'v-panel-mist border-[var(--v-navy)]/35'
                      : 'border-[var(--v-line)] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">{plan.name}</h2>
                    {plan.badge && (
                      <span className="rounded-full bg-[var(--v-navy)] px-2 py-0.5 text-[10px] font-semibold tracking-[.04em] text-[#F7F9FC] uppercase">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-6">
                    <span className="v-display text-[42px] text-[var(--v-ink)]">{plan.price}</span>
                    <span className="ml-2 text-[13px] text-[var(--v-slate)]">{plan.cadence}</span>
                  </p>
                  <p className="mt-2 text-[13px] text-[var(--v-slate)]">{plan.note}</p>
                  <Link
                    href={`/signup?plan=${plan.id}`}
                    className={`v-btn mt-8 ${plan.badge ? 'v-btn-primary' : 'v-btn-secondary'}`}
                  >
                    Start {TRIAL_DAYS}-day free trial
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v-panel-clay border-b border-[var(--v-line)]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h2 className="v-display text-[28px] sm:text-[32px]">Included in both plans</h2>
            <ul className="grid list-none gap-x-10 gap-y-4 sm:grid-cols-2">
              {PLAN_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 border-b border-[var(--v-line)] pb-4 text-[14.5px] leading-[1.6] text-[var(--v-ink)]"
                >
                  <span aria-hidden className="mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--v-brick)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">Paying by card</h2>
                <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-[var(--v-slate)]">
                  Card payment runs through Stripe and is being connected now. Start the free trial
                  today and add a card when checkout goes live — prices exclude any applicable VAT.
                </p>
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--v-ink)]">Who can subscribe</h2>
                <p className="mt-2 max-w-md text-[14px] leading-[1.7] text-[var(--v-slate)]">
                  Vetic is written for qualified veterinary professionals and students in clinical
                  training. It supports your reasoning; it does not replace it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
