// ── Species prevalence prior ──────────────────────────────────────────────────
// How common a disease actually is *within a species*, used to rank Mix & Match
// differentials once the sign evidence has been scored.
//
// WHY THIS EXISTS. Word-boundary matching and IDF weighting rank by how well a
// disease's page matches the signs entered, and nothing else. On a classic
// feline diabetes history — PU/PD, weight loss, polyphagia — diabetes mellitus,
// feline hyperthyroidism and feline hyperadrenocorticism all match the same
// three terms and score identically, so the order among them was alphabetical.
// One of those three is a genuine rarity in cats and the list gave no hint of
// it. Text matching cannot know that; it is not in the page text. It has to be
// stated.
//
// WHY NOT A FIELD ON disease_page. The prevalence call is a clinical judgement
// that should be reviewed as a set, not discovered one row at a time inside a
// 2.1 MB content file. Keyed by disease id here, the whole table reads in one
// screen and `npm run lint:prevalence` checks every id and species against the
// content.
//
// ── SAFETY ───────────────────────────────────────────────────────────────────
// This prior REORDERS, it never EXCLUDES. Two properties enforce that:
//
//   1. It is multiplicative, and every factor is > 0. A rare disease that
//      matches the history well still outranks a common disease that matches it
//      badly — a rare disease matching four strong signs beats a common one
//      matching two weak signs, comfortably. Prevalence only ever decides
//      between diseases the evidence has already put close together.
//   2. Inclusion in the result list is decided on the evidence score, BEFORE
//      this factor is applied (see searchDiseases). Nothing can be penalised out
//      of the differential list. A zebra that fits stays on the list; it just
//      stops sitting above the horse.
//
// The factors are deliberately gentle for the same reason. Widening them past
// roughly 0.5–1.4 starts letting prevalence overrule evidence, which is the
// failure mode that matters clinically: missing the rare thing that fits.

export type PrevTier = 'common' | 'uncommon' | 'rare' | 'very-rare'

/** Ranking multiplier per tier. An absent entry is `uncommon` — neutral. */
export const PREV_FACTOR: Record<PrevTier, number> = {
  'common':    1.35,
  'uncommon':  1.0,  // also the default for anything not in the table
  'rare':      0.7,
  'very-rare': 0.5,
}

export type PrevSpecies = 'dog' | 'cat'

/**
 * Prevalence within each species, for diseases where it is clinically material
 * and not already expressed by the `sp` field on the disease page.
 *
 * Only outliers need an entry. Anything absent is treated as neutral, so an
 * unreviewed disease is never penalised — which is the safe default.
 *
 * `uncommon` is recorded explicitly where the middling call is itself worth
 * stating (it behaves identically to being absent).
 *
 * AUTHORED BY CLAUDE, PENDING CLINICAL REVIEW. These are textbook-level calls,
 * but they are ranking judgements on clinical content and should be read by a
 * vet before they are trusted in practice.
 */
export const PREVALENCE: Record<string, Partial<Record<PrevSpecies, PrevTier>>> = {
  // ── Endocrine ──────────────────────────────────────────────────────────────
  // The cluster that motivated the prior: these all present with PU/PD and
  // weight loss, and their prevalence differs by orders of magnitude.
  'DIS-ENDO-DM':            { dog: 'common',    cat: 'common' },
  'DIS-ENDO-HYPERTHY':      { cat: 'common' },      // older cats — very common
  'DIS-PUPD-HAC':           { dog: 'common' },      // canine Cushing's
  'DIS-ENDO-HAC-CAT':       { cat: 'very-rare' },   // feline Cushing's — the case in point
  // Canine hypothyroidism's page is scoped 'Dog (rarely Cat)', so it is reachable
  // from a cat search; without the cat tier it ranked neutral there.
  'DIS-ENDO-HYPOTHY':       { dog: 'common',    cat: 'very-rare' },
  'DIS-ENDO-HYPOTHY-CAT':   { cat: 'very-rare' },   // near-always iatrogenic post-radioiodine
  'DIS-ENDO-HYPERTHY-DOG':  { dog: 'rare' },        // thyroid carcinoma; rare vs the feline disease
  'DIS-ENDO-DKA':           { dog: 'uncommon',  cat: 'uncommon' },
  'DIS-ENDO-HHS':           { dog: 'rare',      cat: 'rare' },
  'DIS-ENDO-CONN':          { cat: 'rare' },
  'DIS-ENDO-PHEO':          { dog: 'rare',      cat: 'very-rare' },
  'DIS-ENDO-PHPT':          { dog: 'rare',      cat: 'rare' },
  'DIS-ENDO-HYPOPTH':       { dog: 'rare',      cat: 'rare' },
  'DIS-ENDO-GASTRINOMA':    { dog: 'very-rare', cat: 'very-rare' },
  'DIS-ENDO-RENGLUC':       { dog: 'rare' },        // Fanconi — breed-restricted outside Basenji
  'DIS-SEC-HYPO':           { dog: 'uncommon' },    // Addison's — uncommon but a classic mimic
  'DIS-NEO-INSULINOMA':     { dog: 'rare',      cat: 'very-rare' },
  'DIS-PUPD-CDI':           { dog: 'very-rare', cat: 'very-rare' },
  'DIS-PUPD-NDI':           { dog: 'rare',      cat: 'rare' },
  // Acromegaly is deliberately NOT penalised. It is uncommon overall but is now
  // recognised in a substantial minority of diabetic cats, so suppressing it on
  // a PU/PD + polyphagia history would reproduce the exact error this file fixes.
  'DIS-ENDO-ACRO':          { cat: 'uncommon' },

  // ── Renal / urinary ────────────────────────────────────────────────────────
  'DIS-SEC-CKD':            { dog: 'uncommon',  cat: 'common' },  // very common in older cats
  'DIS-URO-FIC':            { cat: 'common' },      // commonest cause of feline FLUTD
  'DIS-URO-UTI':            { dog: 'common',    cat: 'uncommon' }, // uncommon in young cats
  'DIS-REN-RTA':            { dog: 'very-rare', cat: 'very-rare' },
  'DIS-REN-AMYLOID':        { dog: 'rare',      cat: 'rare' },

  // ── Cardiac ────────────────────────────────────────────────────────────────
  'DIS-HCM':                { cat: 'common' },      // commonest feline cardiomyopathy
  'DIS-CARD-MVD':           { dog: 'common' },      // commonest canine cardiac disease
  'DIS-CARD-DCM':           { dog: 'uncommon',  cat: 'rare' },   // feline DCM rare post-taurine
  'DIS-CARD-ATE':           { cat: 'uncommon' },
  // Rare in cats, but a can't-miss diagnosis: at very-rare it fell from 4th to
  // 9th on a fever-plus-murmur history, which is not where endocarditis belongs.
  // Rarity is a reason to rank it below the common causes, not to bury it.
  'DIS-CARD-IE':            { dog: 'rare',      cat: 'rare' },
  'DIS-CARD-TOF':           { dog: 'very-rare', cat: 'very-rare' },
  'DIS-CARD-SAS':           { dog: 'uncommon' },
  'DIS-CARD-PDA':           { dog: 'uncommon',  cat: 'rare' },

  // ── Hepatic / GI ───────────────────────────────────────────────────────────
  'DIS-HEP-LIPIDOSIS':      { cat: 'common' },      // essentially a feline disease
  'DIS-HEP-CHOLANGITIS':    { cat: 'uncommon' },
  'DIS-GI-PANCAT':          { cat: 'common' },
  'DIS-SEC-PAN-DOG':        { dog: 'common' },
  'DIS-GI-GDV':             { dog: 'uncommon' },    // deep-chested breeds
  'DIS-GI-EPI':             { dog: 'uncommon',  cat: 'rare' },
  'DIS-GI-PLE':             { dog: 'uncommon' },

  // ── Neoplastic ─────────────────────────────────────────────────────────────
  'DIS-NEO-LSA':            { dog: 'common',    cat: 'common' },
  'DIS-NEO-MCT':            { dog: 'common',    cat: 'uncommon' },
  'DIS-NEO-ETC':            { dog: 'very-rare' },

  // ── Infectious ─────────────────────────────────────────────────────────────
  // Cats are relatively resistant and clinical disease is uncommon, but it is
  // under-recognised rather than absent, and exposure tracks lifestyle: an
  // outdoor hunting cat is not an indoor cat. The tier cannot express that, so
  // it is set for the cat that could plausibly have it. Zoonotic, which is a
  // second reason not to take the deepest demotion — a miss reaches the owner.
  'DIS-INFECT-LEPTO':       { dog: 'uncommon',  cat: 'rare' },
  'DIS-GI-PARVO':           { dog: 'common' },      // unvaccinated populations
  'DIS-GI-FPV':             { cat: 'uncommon' },

  // ── Haemostatic ────────────────────────────────────────────────────────────
  'DIS-BD-APS':             { dog: 'very-rare', cat: 'very-rare' },
}

/**
 * Ranking multiplier for a disease under the species being searched.
 *
 * When the search is not narrowed to one species, the most favourable tier the
 * entry names wins — an unnarrowed search should not apply a penalty the user
 * never asked for.
 */
export function prevalenceFactor(diseaseId: string, species: 'all' | PrevSpecies): number {
  const entry = PREVALENCE[diseaseId]
  if (!entry) return 1

  if (species !== 'all') return PREV_FACTOR[entry[species] ?? 'uncommon']

  const tiers = ([entry.dog, entry.cat].filter(Boolean) as PrevTier[]).map(t => PREV_FACTOR[t])
  return tiers.length ? Math.max(...tiers) : 1
}
