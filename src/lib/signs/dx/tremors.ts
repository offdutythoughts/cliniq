// ── Tremors — diagnostic approach (data) ─────────────────────────────────────
// Tremor = involuntary rhythmic oscillation (Ettinger Ch 42). The workup is a
// triage: (1) confirm it IS a tremor not a seizure; (2) toxin history + the
// reversible metabolic panel (ionised calcium, glucose, potassium) FIRST because
// they are time-critical and treatable; (3) a focused neuro exam to find the
// intention tremor that localises to the cerebellum; (4) MRI + CSF for
// cerebellar/inflammatory disease; (5) idiopathic generalised tremor (IGTS,
// "white-shaker") as a steroid-responsive diagnosis of exclusion.

import type { DxApproach } from '../dxTypes'

export const tremorsDx: DxApproach = {
  title: 'Tremors',
  tabs: {

    history: {
      title: 'History: Tremors',
      blocks: [
        { kind: 'branch', text: 'GOAL: TREMOR vs SEIZURE, THEN TRIAGE THE CAUSE' },
        {
          kind: 'check',
          html: `A <strong>tremor</strong> is an involuntary, rhythmic, oscillatory movement produced by alternating contractions of reciprocally innervated muscles, with <strong>consciousness preserved</strong> and no post-ictal phase. A <strong>seizure</strong> has impaired consciousness, increased tone and autonomic signs (salivation, incontinence) — if the description fits a seizure, switch to the <strong>seizures</strong> approach. Ask the owner to <strong>video</strong> an episode. (Ettinger Ch 42)`,
        },
        { kind: 'step', tone: 'danger', text: ' STEP 1 — TOXIN / EXPOSURE HISTORY (ask first)' },
        {
          kind: 'check',
          html: `An <strong>acute, generalised whole-body tremor</strong>, especially with <strong>hyperthermia</strong>, is toxic until proven otherwise. Ask specifically about:<br>
    <strong>Tremorgenic mycotoxins</strong> — access to mouldy food, compost, bins, fallen nuts (penitrem A / roquefortine — the commonest cause of acute generalised tremor).<br>
    <strong>Metaldehyde</strong> (slug/snail bait — "shake-and-bake"), <strong>organophosphate / carbamate</strong> insecticides, <strong>lead</strong> (old paint, linoleum, weights, toys), and <strong>methylxanthines</strong> (chocolate/caffeine), xylitol, bromethalin, cannabis, macadamia.<br>
    <strong>Permethrin in cats</strong> — a dog pyrethroid spot-on applied to (or groomed from) a cat is a classic, lethal mistake.<br>
    Recent <strong>drugs</strong> (metronidazole, 5-HT drugs/SSRIs, macrocyclic lactones) or drug <strong>withdrawal</strong>.`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — SIGNALMENT & ONSET PATTERN' },
        {
          kind: 'check',
          html: `<strong>Young adult small/white dog, fine whole-body tremor, otherwise well</strong> → idiopathic generalised tremor syndrome (IGTS, "white-shaker") — but it occurs in any breed and is rare in dogs &gt;20 kg.<br>
    <strong>Puppy/kitten tremoring from ~10 days of age when aroused</strong> → hypomyelination ("shaker pup"; Springer, Weimaraner, Chow, Samoyed; Siamese cats) — many recover by ~5 months.<br>
    <strong>Lactating bitch / late-pregnancy or post-whelping</strong> → eclampsia (hypocalcaemia).<br>
    <strong>Toy-breed puppy, juvenile, or older dog with fasting/exertional episodes</strong> → hypoglycaemia (incl. insulinoma in an older dog).<br>
    <strong>Tremor confined to standing, gone on walking/lying down</strong> → orthostatic tremor (Great Dane/Deerhound, or senile).`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — TRIGGERS, COURSE & WHAT MAKES IT WORSE' },
        {
          kind: 'check',
          html: `<strong>Worse with intention / movement toward a target</strong> (eating, sniffing) → cerebellar.<br>
    <strong>Worse with anxiety / excitement, better at rest/sleep</strong> → IGTS or idiopathic head tremor.<br>
    <strong>Acute & progressive in a sick patient</strong> → toxic/metabolic; <strong>slowly progressive in a bright patient</strong> → cerebellar degeneration.<br>
    <strong>Paroxysmal yes-yes / no-no head bobbing the owner can interrupt with food</strong> → idiopathic head tremor (benign, AED-unresponsive).`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Acute generalised tremor + hyperthermia = toxic emergency (mycotoxin, metaldehyde, permethrin in a cat) — stabilise before investigating · Lactating bitch tremoring/twitching = eclampsia (ionised calcium) · Fasting/exertional collapse with tremor = hypoglycaemia/insulinoma · Anything suggesting impaired consciousness or autonomic signs = treat as a seizure.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Tremors',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE first — TEMPERATURE, heart rate & mucous membranes' },
        {
          kind: 'check',
          html: `<strong>Hyperthermia</strong> (often non-febrile, from sustained muscle activity) + <strong>tachycardia</strong> + <strong>mydriasis</strong> point to an intoxication (mycotoxin, metaldehyde, permethrin) and are themselves treatment targets — active cooling and muscle relaxation. Note GI signs and hyperaesthesia.`,
        },
        { kind: 'step', alt: true, text: ' STEP 1 — CHARACTERISE THE TREMOR' },
        {
          kind: 'check',
          html: `<strong>Where & when?</strong> Whole-body vs head-only vs limb/trunk; at <strong>rest</strong> (uncommon — toxic/drug) vs <strong>action</strong>.<br>
    <strong>Action tremors:</strong> postural (holding against gravity), kinetic-simple (throughout movement), <strong>kinetic-intention (crescendos toward a target — cerebellar)</strong>, orthostatic (only when standing).<br>
    A <strong>fine whole-body tremor in a small white dog</strong> = idiopathic shaker; an <strong>intention tremor worsening toward a target</strong> = cerebellar.`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — FOCUSED NEUROLOGICAL EXAM (localise)' },
        {
          kind: 'check',
          html: `Look for the cerebellar triad: <strong>intention tremor</strong> (head/limb crescendo toward a target), <strong>postural head tremor + truncal sway</strong>, <strong>hypermetria/dysmetria</strong> and a wide-based stance — with <strong>NO weakness and NO proprioceptive-positioning deficits</strong>. (Ettinger Ch 42)<br>
    Add menace deficit with intact vision/PLR (cerebellar), and check for vestibular signs (paradoxical = caudal cerebellar). Multifocal/asymmetric signs, mentation change or cervical pain in a young small-breed dog raise <strong>MUO/GME</strong>. A normal neuro exam apart from the tremor fits IGTS.`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — SCREEN FOR METABOLIC CLUES' },
        {
          kind: 'check',
          html: `Weakness/cervical ventroflexion (hypokalaemia, hypocalcaemia), facial twitching → tetany (hypocalcaemia), obtundation/weakness that waxes and wanes (hypoglycaemia). These steer the first-line bloods on the Diagnostics tab.`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Tremors — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — IF ACUTE & HYPERTHERMIC, STABILISE FIRST' },
        {
          kind: 'check',
          html: `An acute generalised tremor with hyperthermia is an emergency. <strong>Cool actively</strong>, secure IV access and control the tremors: <strong>methocarbamol 40–50 mg/kg slow IV</strong> to effect (then 8.8–12.2 mg/kg/h CRI; do not exceed 330 mg/kg/day), with dexmedetomidine, phenobarbital/levetiracetam or ketamine as needed. <strong>Decontaminate</strong> (emesis only if conscious — apomorphine 20–40 µg/kg IV; activated charcoal 0.5–4 g/kg; <strong>bathe</strong> for dermal permethrin) and give <strong>intralipid 20%</strong> (1.5 mL/kg IV bolus then 0.25–0.5 mL/kg/min CRI) for lipophilic toxins. See the toxin protocols. (Ettinger Ch 42)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — METABOLIC PANEL (rule out the reversible causes)' },
        {
          kind: 'check',
          html: `Before chasing a neurological diagnosis, exclude metabolic tremor with blood work:<br>
    <strong>Ionised calcium</strong> (eclampsia, hypoparathyroidism — total calcium is unreliable; correct for albumin or, better, measure ionised).<br>
    <strong>Blood glucose</strong> (hypoglycaemia — insulinoma, sepsis, toy-breed/neonate, hepatic failure; if low, run paired insulin on the SAME sample).<br>
    <strong>Potassium</strong> (hypokalaemia — weakness/ventroflexion more than tremor) and the rest of the electrolytes.<br>
    Add CBC/biochemistry, and <strong>bile acids ± ammonia</strong> if hepatic encephalopathy is possible. (Ettinger Ch 42)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — TARGETED TOXICOLOGY' },
        {
          kind: 'check',
          html: `Pursue specific assays/treatments by history: <strong>blood lead</strong> (± basophilic stippling/nucleated RBCs on the smear) → chelation; <strong>cholinesterase</strong> activity for organophosphate/carbamate; stomach contents/urine/serum for tremorgenic mycotoxins where available; chocolate/xylitol/cannabis per exposure. Treatment is rarely delayed for confirmatory results — decontaminate and support empirically.`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — ADVANCED IMAGING (cerebellar / inflammatory disease)' },
        {
          kind: 'check',
          html: `If the tremor is an <strong>intention tremor</strong> or there are multifocal/progressive central signs and the metabolic/toxic screen is clean → <strong>MRI brain + CSF analysis</strong>.<br>
    <strong>Cerebellar abiotrophy / degeneration:</strong> cerebellar atrophy on MRI, normal-to-unremarkable CSF.<br>
    <strong>Cerebellar hypoplasia:</strong> small cerebellum, non-progressive history from first ambulation (FPV in kittens).<br>
    <strong>MUO / GME:</strong> multifocal T2/FLAIR hyperintensities ± enhancement; CSF mononuclear/mixed pleocytosis with raised protein — run an <strong>infectious panel</strong> to exclude infection BEFORE immunosuppressing.<br>
    Stop any <strong>metronidazole</strong> (drug-induced cerebellovestibular signs resolve on cessation). (Ettinger Ch 42)`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — IDIOPATHIC GENERALISED TREMOR (steroid-response test)' },
        {
          kind: 'check',
          html: `When toxic, metabolic, structural and inflammatory causes are excluded — young dog, fine whole-body tremor worse with anxiety, <strong>normal MRI</strong>, normal-to-mild mononuclear/lymphocytic CSF pleocytosis — the diagnosis is <strong>idiopathic generalised tremor syndrome (IGTS / "white-shaker")</strong>. It is presumed immune-mediated and <strong>steroid-responsive</strong>: prednisolone <strong>1–2 mg/kg PO q12–24h</strong>, tremor improves in <strong>3–10 days</strong>, then taper over <strong>≥6 months</strong>; add mycophenolate (10 mg/kg PO q24h, q12h for the first 7 days) if poorly responsive or relapsing. A clear response supports the diagnosis. (No dedicated disease page.) (Ettinger Ch 42)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
            { label: 'Cerebellar hypoplasia', link: { to: 'disease', id: 'DIS-NEU-CEREHYPO' } },
            { label: 'Cerebellar abiotrophy', link: { to: 'disease', id: 'DIS-NEU-ABIOTROPHY' } },
            { label: 'Meningoencephalitis of unknown origin (MUO)', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
            { label: 'Granulomatous meningoencephalitis (GME)', link: { to: 'disease', id: 'DIS-GME' } },
            { label: 'Metronidazole toxicity', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
            { label: 'Tremor or seizure? — Seizures approach', link: { to: 'dx', id: 'seizures' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Decide tremor vs seizure first — if consciousness is impaired or there are autonomic signs, work it up as a seizure.<br>
  • Acute generalised tremor + hyperthermia = toxic emergency: cool, methocarbamol, decontaminate, ILE — before the diagnostics.<br>
  • Measure <strong>ionised</strong> calcium and glucose in every tremoring patient; total calcium misleads.<br>
  • An intention tremor (crescendo toward a target) localises to the cerebellum → MRI + CSF (exclude infection before immunosuppressing MUO/GME).<br>
  • Young small/white dog, fine whole-body tremor, normal MRI = IGTS — confirm with a brisk response to prednisolone (improves 3–10 days), then taper over ≥6 months.<br>
  • Never apply permethrin spot-on to a cat — it causes tremors, hyperthermia and seizures.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
