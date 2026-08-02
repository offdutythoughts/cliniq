// ── Plans ────────────────────────────────────────────────────────────────────
//
// PLACEHOLDER PRICING. These figures are stand-ins so the sign-up and pricing
// screens are complete and consistent — set the real numbers here (and the
// matching Stripe Price IDs in `stripePriceIdEnvVar`) before launch. Everything
// user-facing reads from this file, so there is one place to change.

export type PlanId = 'monthly' | 'annual'

export interface Plan {
  id: PlanId
  name: string
  /** Headline price, already formatted. */
  price: string
  /** What the price buys, e.g. "per month". */
  cadence: string
  /** Secondary line under the price — billing note or saving. */
  note: string
  badge?: string
}

export const TRIAL_DAYS = 14

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '£14',
    cadence: 'per month',
    note: 'Cancel any time.',
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '£140',
    cadence: 'per year',
    note: 'Two months free vs monthly.',
    badge: 'Best value',
  },
]

/** Everything is in every plan — the plans differ only in billing cadence. */
export const PLAN_FEATURES = [
  'Every clinical-sign flowchart and diagnostic approach',
  'Full disease library with Dx, Tx, monitoring and prognosis',
  'Mix & Match multi-sign differential search',
  'Emergency and procedure protocols with doses',
  'Per-page notes that sync across your devices',
  'New and updated content as it ships',
]

export function planById(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

/** The Convex env var a Stripe Price ID for this plan should live in. */
export function stripePriceIdEnvVar(id: PlanId): string {
  return `STRIPE_PRICE_${id.toUpperCase()}`
}
