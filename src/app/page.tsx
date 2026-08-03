import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiteFooter } from '../components/site/SiteFooter'
import { HeroSequence } from '../components/site/HeroSequence'
import { SiteHeader } from '../components/site/SiteHeader'

export const metadata: Metadata = {
  title: 'Vetic — Clinical support tool for veterinarians',
  description:
    'Vetic gives veterinarians sign-led clinical flowcharts, diagnostic approaches, disease pages and protocols for dogs and cats — so the decision at the consult table is an informed one.',
  openGraph: {
    title: 'Vetic — Empowering veterinarians with confidence',
    description:
      'Sign-led flowcharts, diagnostic approaches, disease pages and protocols, built for the consult room.',
    type: 'website',
  },
}

const CAPABILITIES = [
  { icon: <IconFlow />, title: 'Clinical signs', body: 'Sign-led flows that localise before they list.' },
  { icon: <IconStethoscope />, title: 'Diagnostic approaches', body: 'Workups by presenting complaint, in order.' },
  { icon: <IconMix />, title: 'Mix & Match', body: 'Several signs at once, one differential list.' },
  { icon: <IconProtocol />, title: 'Protocols & doses', body: 'Emergency steps with dog and cat dosing.' },
]

const PILLARS = [
  {
    tone: 'sage' as const,
    title: 'Reason from the sign',
    body: 'Every flow starts where you start — the presenting complaint — and narrows to a lesion category before it shows you a single differential.',
  },
  {
    tone: 'bone' as const,
    title: 'Detail where it matters',
    body: 'Differentials open into full disease pages: aetiology, signalment, diagnosis, treatment, monitoring and prognosis, with the doses kept species-specific.',
  },
  {
    tone: 'paper' as const,
    title: 'Yours to annotate',
    body: 'Keep your own protocol tweaks and clinic preferences on the page they belong to. Notes are tied to your account, on every device.',
  },
]

const AUDIENCES = [
  {
    title: 'In the consult room',
    body: 'Work through an unfamiliar presentation while the client is still in the room, without opening three textbooks.',
  },
  {
    title: 'On out-of-hours shifts',
    body: 'Reach the protocol, the dose and the next step when there is nobody to ask and no time to read a chapter.',
  },
  {
    title: 'New graduates and students',
    body: 'Build the habit — sign, localisation, differential, test — and check your reasoning against a structured approach.',
  },
]

const PRINCIPLES = [
  {
    label: 'Localisation first',
    body: 'A search box hands you articles. A flow hands you the next step: where the lesion is, then what fits, ranked by likelihood.',
  },
  {
    label: 'Species-specific throughout',
    body: 'Dog and cat are never averaged together. Differentials, thresholds and doses stay separate, because they are.',
  },
  {
    label: 'Referenced, not invented',
    body: 'Content is drawn from current veterinary internal medicine and ophthalmology texts and published guidelines, and cited on the page.',
  },
  {
    label: 'Made for one hand',
    body: 'Built mobile-first for the phone in your pocket during a consult — not for a desktop you will get back to later.',
  },
]

const STEPS = [
  { n: '01', title: 'Start from the sign', body: 'Pick the presenting complaint, or combine several in Mix & Match.' },
  { n: '02', title: 'Localise, then narrow', body: 'Follow the flow to a lesion category and open its ranked differentials.' },
  { n: '03', title: 'Act on the detail', body: 'Open the disease page or protocol for the workup, dose and monitoring plan.' },
]

export default function HomePage() {
  return (
    <div className="site-page">
      <SiteHeader />

      <main>
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="v-panel-mist pointer-events-none absolute top-0 right-0 hidden h-full w-[42%] lg:block"
          />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pt-24 lg:pb-28">
            <div>
              <p className="v-eyebrow-plain">Clinical support tool · dogs &amp; cats</p>
              <h1 className="v-display mt-6 text-[40px] text-balance sm:text-[54px] lg:text-[62px]">
                Empowering veterinarians with confidence.
              </h1>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.65] text-[var(--v-slate)]">
                Vetic is a clinical support tool that helps you make clinical decisions
                confidently: diagnostic and clinical flowcharts, detailed disease pages and
                protocols, built for the ten minutes you actually have.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/login" className="v-btn v-btn-primary">
                  Create your free account
                </Link>
                <Link href="#features" className="v-btn v-btn-secondary">
                  See what&rsquo;s inside
                </Link>
              </div>
              <p className="mt-4 text-[13px] text-[var(--v-slate)]">
                No card needed. An email and a password opens the whole library.
              </p>
            </div>

            <HeroSequence caption="Acute Vestibular, tapped through to the diagnosis — recorded from the app." />
          </div>
        </section>

        {/* ── What's in it ───────────────────────────────────────────────── */}
        <section className="border-y border-[var(--v-line)]">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className={`border-[var(--v-line)] px-1 py-8 sm:px-6 ${i % 2 === 1 ? 'border-l' : ''} ${
                  i < 2 ? 'border-b lg:border-b-0' : ''
                } lg:border-l lg:first:border-l-0 lg:px-7`}
              >
                <span className="text-[var(--v-navy)]">{c.icon}</span>
                <h2 className="mt-4 text-[15px] font-semibold text-[var(--v-ink)]">{c.title}</h2>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--v-slate)]">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sources strip ──────────────────────────────────────────────── */}
        <section className="border-b border-[var(--v-line)]">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
            <p className="v-eyebrow-plain shrink-0">Sources</p>
            <p className="text-[13px] leading-[1.6] text-[var(--v-slate)]">
              Differentials, criteria, staging and doses are drawn from Ettinger&rsquo;s Textbook of
              Veterinary Internal Medicine (9th edn), Veterinary Ophthalmology (Gelatt, 6th edn) and
              current AAHA guidelines — and cited on the page they appear.
            </p>
          </div>
        </section>

        {/* ── The platform, in three parts ───────────────────────────────── */}
        <section className="v-panel-clay">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="v-display-italic text-[30px] leading-[1.25] text-[var(--v-ink)] sm:text-[34px]">
                One tool for the whole consult,
                <br />
                not five tabs and a textbook.
              </p>
              <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-[var(--v-slate)]">
                Vetic holds the reasoning, the reference and your own notes in one place, so nothing
                has to be reconstructed from memory at 11pm.
              </p>
              <Link href="#about" className="v-btn v-btn-secondary mt-8">
                About us
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {PILLARS.map((p) => (
                <article
                  key={p.title}
                  className={`flex min-h-[260px] flex-col justify-between rounded-[14px] border border-[var(--v-line)] p-6 ${
                    p.tone === 'sage'
                      ? 'v-panel-mist'
                      : p.tone === 'bone'
                        ? 'bg-[#F7F3EA]'
                        : 'bg-white'
                  }`}
                >
                  <h3 className="v-display text-[21px] text-[var(--v-ink)]">{p.title}</h3>
                  <p className="mt-8 text-[13.5px] leading-[1.65] text-[var(--v-slate)]">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── The three tools, in detail ─────────────────────────────────── */}
        <section id="features" className="scroll-mt-20 border-b border-[var(--v-line)]">
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="v-eyebrow">What it does</p>
              <h2 className="v-display mt-6 text-[34px] sm:text-[42px]">
                Three tools, one clinical workflow.
              </h2>
            </div>

            <div className="mt-16 flex flex-col gap-16 lg:gap-24">
              <Feature
                label="Clinical & diagnostic flowcharts"
                title="Start from the sign in front of you."
                body="Dyspnoea, seizures, a red eye, PU/PD — each flow asks the questions you would ask, localises the lesion, then opens the differentials for that category, ranked and filtered by species. Diagnostic approaches sit alongside them, walking through history, exam and confirmatory tests in order."
                points={['Sign-led flows across every body system', 'Lesion localisation before differential lists', 'Dog and cat filters at every step']}
                visual={
                  <AppScreen
                    src="/screens/myelopathy-approach.png"
                    alt="The Acute Myelopathy diagnostic approach in Vetic: History, Exam and Diagnostics tabs over a table mapping onset and pain to the likely diagnosis and next step."
                  />
                }
              />
              <Feature
                reverse
                label="Mix & Match"
                title="For the patient with four signs and no tidy diagnosis."
                body="Select several clinical signs at once and Vetic returns the differentials that explain the combination, grouped by category so the pattern is visible. Narrow by species and signalment when the list gets long."
                points={['Combine any number of signs', 'Grouped, ranked, tappable results', 'Species and signalment filters']}
                visual={
                  <AppScreen
                    src="/screens/mix-match.png"
                    alt="Mix & Match results in Vetic for head tilt, nystagmus and ataxia in a dog, scored and grouped by category."
                  />
                }
              />
              <Feature
                label="Disease pages & protocols"
                title="The detail you need, in the order you need it."
                body="Every differential opens a full page — aetiology, signalment, pathophysiology, diagnosis, treatment, monitoring, prognosis — with citations. Emergency and procedure protocols are written as numbered steps with the doses attached, so nothing has to be looked up twice."
                points={['Dx, Tx, monitoring and prognosis together', 'Dog and cat doses kept distinct', 'Step-by-step emergency protocols']}
                visual={
                  <AppScreen
                    src="/screens/ataxia-protocol.png"
                    alt="The acute ataxia emergency protocol in Vetic: numbered steps with doses and a drug-toxicity warning."
                  />
                }
              />
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────── */}
        <section id="how" className="v-panel-mist scroll-mt-20 border-b border-[var(--v-line)]">
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
            <h2 className="v-display max-w-xl text-[32px] sm:text-[38px]">
              Three taps from a sign to a plan.
            </h2>
            <ol className="mt-12 grid list-none gap-8 md:grid-cols-3 md:gap-10">
              {STEPS.map((s) => (
                <li key={s.n} className="border-t border-[var(--v-navy)]/25 pt-5">
                  <span className="font-[family-name:var(--font-display)] text-[13px] text-[var(--v-brick)]">
                    {s.n}
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold text-[var(--v-ink)]">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[var(--v-slate)]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Who it's for ───────────────────────────────────────────────── */}
        <section className="border-b border-[var(--v-line)]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="v-eyebrow">Who it&rsquo;s for</p>
              <h2 className="v-display mt-6 text-[32px] sm:text-[38px]">
                Practising vets and the teams around them.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--v-line)] bg-[var(--v-line)]">
              {AUDIENCES.map((a) => (
                <div key={a.title} className="bg-white p-6">
                  <h3 className="text-[16px] font-semibold text-[var(--v-ink)]">{a.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[var(--v-slate)]">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it's built ─────────────────────────────────────────────── */}
        <section className="border-b border-[var(--v-line)]">
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8">
            <div className="max-w-xl">
              <p className="v-eyebrow">How Vetic is built</p>
              <h2 className="v-display mt-6 text-[32px] sm:text-[38px]">
                Four decisions that shape every page.
              </h2>
            </div>
            <dl className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.label} className="border-l-2 border-[var(--v-brick)] pl-6">
                  <dt className="text-[16px] font-semibold text-[var(--v-ink)]">{p.label}</dt>
                  <dd className="mt-2 text-[14.5px] leading-[1.7] text-[var(--v-slate)]">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── About / mission ────────────────────────────────────────────── */}
        <section id="about" className="v-panel-clay scroll-mt-20 border-b border-[var(--v-line)]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-24">
            <div>
              <p className="v-eyebrow-plain">About us</p>
              <h2 className="v-display mt-6 text-[32px] leading-[1.15] sm:text-[40px]">
                Our mission: supporting veterinary professionals.
              </h2>
            </div>
            <div className="max-w-2xl space-y-5 text-[16px] leading-[1.75] text-[var(--v-slate)]">
              <p>
                Vetic was founded with a passion for improving veterinary practices. Our tools are
                designed to enhance the quality of care veterinarians can provide, ensuring they
                have the right resources at their fingertips.
              </p>
              <p>
                Our commitment to the veterinary community drives us to create innovative solutions
                that simplify their workflow and boost confidence in every decision.
              </p>
              <p className="text-[14px] text-[var(--v-slate)]">
                Vetic supports clinical reasoning — it is not a substitute for professional
                judgement, and every dose should be confirmed against a current formulary for the
                patient in front of you.
              </p>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ────────────────────────────────────────────────── */}
        <section>
          <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="v-display text-[34px] sm:text-[42px]">Try it on your next tricky case.</h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-[var(--v-slate)]">
                The whole library — flowcharts, diagnostic approaches, disease pages, protocols and
                Mix &amp; Match — opens as soon as you sign in.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/login" className="v-btn v-btn-primary">
                  Create your free account
                </Link>
                <Link href="#features" className="v-btn v-btn-secondary">
                  See what&rsquo;s inside
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

/* ── Feature row ──────────────────────────────────────────────────────────── */

function Feature({
  label,
  title,
  body,
  points,
  visual,
  reverse = false,
}: {
  label: string
  title: string
  body: string
  points: string[]
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? 'lg:order-2' : ''}>
        <p className="v-eyebrow-plain">{label}</p>
        <h3 className="v-display mt-4 text-[27px] sm:text-[32px]">{title}</h3>
        <p className="mt-5 text-[15.5px] leading-[1.7] text-[var(--v-slate)]">{body}</p>
        <ul className="mt-6 list-none space-y-3 border-t border-[var(--v-line)] pt-6">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[14px] text-[var(--v-ink)]">
              <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--v-brick)]" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{visual}</div>
    </article>
  )
}

/* ── Product screens ─────────────────────────────────────────────────────────
   Real captures from the app (390×844 @2x), not illustrations: the Acute
   Vestibular flow, the Acute Myelopathy localisation table, a Mix & Match
   result set and the emergency ataxia protocol. Regenerate them by pointing the
   capture script at a running build rather than editing by hand. */

function AppScreen({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="mx-auto w-full max-w-[320px]">
      <div className="overflow-hidden rounded-[18px] border border-[var(--v-line)] bg-white p-1.5 shadow-[0_26px_60px_-34px_rgba(11,33,75,0.28)]">
        <div className="aspect-[390/560] overflow-hidden rounded-[13px]">
          <Image
            src={src}
            alt={alt}
            width={780}
            height={1688}
            sizes="(max-width: 640px) 86vw, 320px"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] text-[var(--v-slate)]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Icons ────────────────────────────────────────────────────────────────── */

const svg = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function IconFlow() {
  return (
    <svg {...svg}>
      <rect x="8.5" y="2.5" width="7" height="5" rx="1.2" />
      <rect x="2.5" y="16.5" width="7" height="5" rx="1.2" />
      <rect x="14.5" y="16.5" width="7" height="5" rx="1.2" />
      <path d="M12 7.5v4M6 16.5v-2.5h12v2.5" />
    </svg>
  )
}

function IconStethoscope() {
  return (
    <svg {...svg}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M6 3H4.5M14 3h1.5" />
      <path d="M10 16v-4" />
      <path d="M10 16a5 5 0 0 0 9 0v-1.5" />
      <circle cx="19" cy="12.5" r="2" />
    </svg>
  )
}

function IconMix() {
  return (
    <svg {...svg}>
      <path d="M3 7h4l4 10h6M3 17h4l2-5" />
      <path d="M17 4l4 3-4 3M17 14l4 3-4 3" />
    </svg>
  )
}

function IconProtocol() {
  return (
    <svg {...svg}>
      <rect x="4.5" y="3" width="15" height="18" rx="2" />
      <path d="M8.5 8.5h7M8.5 12.5h7M8.5 16.5h4" />
    </svg>
  )
}
