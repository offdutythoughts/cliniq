// ── Tremors — diagnostic approach (data) ─────────────────────────────────────
// Tremor = involuntary rhythmic oscillation (Ettinger Ch 42). The workup is a
// triage: (1) confirm it IS a tremor not a seizure; (2) toxin history + the
// reversible metabolic panel (ionised calcium, glucose, potassium) FIRST because
// they are time-critical and treatable; (3) a focused neuro exam to find the
// intention tremor that localises to the cerebellum; (4) MRI + CSF for
// cerebellar/inflammatory disease; (5) idiopathic generalised tremor (IGTS,
// "white-shaker") as a steroid-responsive diagnosis of exclusion.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const tremorsDx: DxApproach = {
  title: 'Tremors',
  tabs: {

    history: {
      title: 'History: Tremors',
      blocks: [
        { kind: 'branch', text: 'GOAL: TREMOR vs SEIZURE, THEN TRIAGE THE CAUSE' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Event', { text: 'Features', tone: 'teal' }],
          rows: [
            ['<strong>Tremor</strong>', { text: 'Involuntary, rhythmic, oscillatory movement from alternating contractions of reciprocally innervated muscles — <strong>consciousness preserved</strong>, no post-ictal phase', tone: 'teal' }],
            ['<strong>Seizure</strong>', { text: 'Impaired consciousness · increased tone · autonomic signs (salivation · incontinence) → switch to the <strong>Seizures</strong> approach', tone: 'danger' }],
          ],
        },
        { kind: 'note', html: `Ask the owner to <strong>video</strong> an episode. <span style="opacity:.7">(Ettinger Ch 42)</span>` },

        { kind: 'step', tone: 'danger', text: '☠️ STEP 1 — TOXIN / EXPOSURE HISTORY (ask first)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Ask about', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Tremorgenic mycotoxins</strong>', { text: 'Access to mouldy food · compost · bins · fallen nuts (penitrem A / roquefortine) — the <strong>commonest cause of acute generalised tremor</strong>', tone: 'danger' }],
            ['<strong>Metaldehyde</strong>', { text: 'Slug / snail bait — "shake-and-bake"', tone: 'danger' }],
            ['<strong>Organophosphate / carbamate insecticides</strong>', { text: 'Cholinergic crisis', tone: 'danger' }],
            ['<strong>Lead</strong>', { text: 'Old paint · linoleum · weights · toys', tone: 'teal' }],
            ['<strong>Methylxanthines</strong>', { text: 'Chocolate / caffeine · also xylitol · bromethalin · cannabis · macadamia', tone: 'teal' }],
            ['<strong>🐱 Permethrin in cats</strong>', { text: 'A dog pyrethroid spot-on applied to (or groomed from) a cat — a classic, lethal mistake', tone: 'danger' }],
            ['<strong>Drugs / withdrawal</strong>', { text: 'Metronidazole · 5-HT drugs / SSRIs · macrocyclic lactones', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `An <strong>acute, generalised whole-body tremor</strong>, especially with <strong>hyperthermia</strong>, is toxic until proven otherwise.` },

        ...stepTable(2, 'SIGNALMENT & ONSET PATTERN', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Signalment / pattern', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young adult small / white dog · fine whole-body tremor · otherwise well</strong>', { text: '<strong>Idiopathic generalised tremor syndrome (IGTS, "white-shaker")</strong> — occurs in any breed but is rare in dogs &gt;20 kg', tone: 'teal' }],
            ['<strong>Puppy / kitten tremoring from ~10 days of age when aroused</strong>', { text: '<strong>Hypomyelination</strong> ("shaker pup") — Springer · Weimaraner · Chow · Samoyed · Siamese cats. Many recover by ~5 months', tone: 'teal' }],
            ['<strong>Lactating bitch / late-pregnancy or post-whelping</strong>', { text: '<strong>Eclampsia</strong> (hypocalcaemia)', tone: 'danger' }],
            ['<strong>Toy-breed puppy · juvenile · older dog with fasting or exertional episodes</strong>', { text: '<strong>Hypoglycaemia</strong> — including insulinoma in an older dog', tone: 'teal' }],
            ['<strong>Tremor confined to standing, gone on walking / lying down</strong>', { text: '<strong>Orthostatic tremor</strong> — Great Dane / Deerhound, or senile', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'TRIGGERS, COURSE & WHAT MAKES IT WORSE', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Trigger / course', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Worse with intention / movement toward a target</strong> (eating · sniffing)', { text: '<strong>Cerebellar</strong>', tone: 'teal' }],
            ['<strong>Worse with anxiety / excitement, better at rest or sleep</strong>', { text: 'IGTS · idiopathic head tremor', tone: 'teal' }],
            ['<strong>Acute &amp; progressive in a sick patient</strong>', { text: 'Toxic / metabolic', tone: 'teal' }],
            ['<strong>Slowly progressive in a bright patient</strong>', { text: 'Cerebellar degeneration', tone: 'teal' }],
            ['<strong>Paroxysmal yes-yes / no-no head bobbing the owner can interrupt with food</strong>', { text: '<strong>Idiopathic head tremor</strong> — benign, AED-unresponsive', tone: 'teal' }],
          ],
        }, '🔁'),
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
        { kind: 'step', tone: 'teal', text: ' A complete PE first — TEMPERATURE, heart rate & mucous membranes', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Hyperthermia</strong> — often non-febrile, from sustained muscle activity', { text: 'Points to intoxication (mycotoxin · metaldehyde · permethrin) and is itself a treatment target — <strong>active cooling</strong>', tone: 'danger' }],
            ['<strong>Tachycardia · mydriasis</strong>', { text: 'Intoxication — muscle relaxation is a treatment target', tone: 'danger' }],
            ['<strong>GI signs · hyperaesthesia</strong>', { text: 'Note and record', tone: 'teal' }],
          ],
        },

        ...stepTable(1, 'CHARACTERISE THE TREMOR', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Question', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Where &amp; when?</strong>', { text: 'Whole-body vs head-only vs limb / trunk; at <strong>rest</strong> (uncommon — toxic / drug) vs <strong>action</strong>', tone: 'teal' }],
            ['<strong>Action tremor subtypes</strong>', { text: 'Postural (holding against gravity) · kinetic-simple (throughout movement) · <strong>kinetic-intention</strong> (crescendos toward a target — cerebellar) · orthostatic (only when standing)', tone: 'teal' }],
            ['<strong>Fine whole-body tremor in a small white dog</strong>', { text: 'Idiopathic shaker (IGTS)', tone: 'teal' }],
            ['<strong>Intention tremor worsening toward a target</strong>', { text: '<strong>Cerebellar</strong>', tone: 'teal' }],
          ],
        }, '📋'),

        ...stepTable(2, 'FOCUSED NEUROLOGICAL EXAM (localise)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Localises to', tone: 'teal' }],
          rows: [
            ['<strong>Cerebellar triad</strong>', { text: '<strong>Intention tremor</strong> (head / limb crescendo toward a target) · <strong>postural head tremor + truncal sway</strong> · <strong>hypermetria / dysmetria</strong> and a wide-based stance — with <strong>no weakness and no proprioceptive-positioning deficits</strong> <span style="opacity:.7">(Ettinger Ch 42)</span>', tone: 'teal' }],
            ['<strong>Menace deficit with intact vision and PLR</strong>', { text: 'Cerebellar', tone: 'teal' }],
            ['<strong>Vestibular signs</strong>', { text: 'Paradoxical = caudal cerebellar', tone: 'teal' }],
            ['<strong>Multifocal / asymmetric signs · mentation change · cervical pain in a young small-breed dog</strong>', { text: '<strong>MUO / GME</strong>', tone: 'danger' }],
            ['<strong>Normal neuro exam apart from the tremor</strong>', { text: 'Fits IGTS', tone: 'teal' }],
          ],
        }, '🧠'),

        ...stepTable(3, 'SCREEN FOR METABOLIC CLUES', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Weakness / cervical ventroflexion</strong>', { text: 'Hypokalaemia · hypocalcaemia', tone: 'teal' }],
            ['<strong>Facial twitching → tetany</strong>', { text: 'Hypocalcaemia', tone: 'teal' }],
            ['<strong>Obtundation / weakness that waxes and wanes</strong>', { text: 'Hypoglycaemia', tone: 'teal' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `These steer the first-line bloods on the Diagnostics tab.` },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Tremors — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — IF ACUTE & HYPERTHERMIC, STABILISE FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Cool actively + secure IV access</strong>', { text: 'An acute generalised tremor with hyperthermia is an emergency', tone: 'danger' }],
            ['<strong>Control the tremors</strong>', { text: '<strong>Methocarbamol 40–50 mg/kg slow IV</strong> to effect, then 8.8–12.2 mg/kg/h CRI (<strong>do not exceed 330 mg/kg/day</strong>) · dexmedetomidine · phenobarbital / levetiracetam · ketamine as needed', tone: 'danger' }],
            ['<strong>Decontaminate</strong>', { text: 'Emesis only if conscious — apomorphine 20–40 µg/kg IV · activated charcoal 0.5–4 g/kg · <strong>bathe</strong> for dermal permethrin', tone: 'danger' }],
            ['<strong>Intralipid 20%</strong>', { text: '1.5 mL/kg IV bolus then 0.25–0.5 mL/kg/min CRI for lipophilic toxins — see the toxin protocols <span style="opacity:.7">(Ettinger Ch 42)</span>', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'METABOLIC PANEL (rule out the reversible causes)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            ['<strong>Ionised calcium</strong>', { text: 'Eclampsia · hypoparathyroidism — <strong>total calcium is unreliable</strong>; correct for albumin or, better, measure ionised', tone: 'teal' }],
            ['<strong>Blood glucose</strong>', { text: 'Hypoglycaemia — insulinoma · sepsis · toy-breed / neonate · hepatic failure. If low, run paired insulin on the <strong>same sample</strong>', tone: 'teal' }],
            ['<strong>Potassium + electrolytes</strong>', { text: 'Hypokalaemia — weakness / ventroflexion more than tremor', tone: 'teal' }],
            ['<strong>CBC / biochemistry</strong>', { text: 'Baseline', tone: 'teal' }],
            ['<strong>Bile acids ± ammonia</strong>', { text: 'If hepatic encephalopathy is possible <span style="opacity:.7">(Ettinger Ch 42)</span>', tone: 'teal' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `Exclude metabolic tremor before chasing a neurological diagnosis.` },

        ...stepTable(3, 'TARGETED TOXICOLOGY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assay', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Blood lead</strong>', { text: '± basophilic stippling / nucleated RBCs on the smear → chelation', tone: 'teal' }],
            ['<strong>Cholinesterase activity</strong>', { text: 'Organophosphate / carbamate', tone: 'teal' }],
            ['<strong>Stomach contents / urine / serum</strong>', { text: 'Tremorgenic mycotoxins, where available', tone: 'teal' }],
            ['<strong>Chocolate / xylitol / cannabis</strong>', { text: 'Per exposure', tone: 'teal' }],
          ],
        }, '☠️'),
        { kind: 'note', html: `Treatment is rarely delayed for confirmatory results — decontaminate and support empirically.` },

        ...stepTable(4, 'ADVANCED IMAGING (cerebellar / inflammatory disease)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Diagnosis', { text: 'Imaging / CSF findings', tone: 'teal' }],
          rows: [
            ['<strong>When to image</strong>', { text: 'An <strong>intention tremor</strong>, or multifocal / progressive central signs with a clean metabolic and toxic screen → <strong>MRI brain + CSF analysis</strong>', tone: 'teal' }],
            ['<strong>Cerebellar abiotrophy / degeneration</strong>', { text: 'Cerebellar atrophy on MRI · normal-to-unremarkable CSF', tone: 'teal' }],
            ['<strong>Cerebellar hypoplasia</strong>', { text: 'Small cerebellum · non-progressive history from first ambulation (FPV in kittens)', tone: 'teal' }],
            ['<strong>MUO / GME</strong>', { text: 'Multifocal T2 / FLAIR hyperintensities ± enhancement · CSF mononuclear or mixed pleocytosis with raised protein. Run an <strong>infectious panel to exclude infection BEFORE immunosuppressing</strong>', tone: 'danger' }],
            ['<strong>Metronidazole</strong>', { text: 'Stop it — drug-induced cerebellovestibular signs resolve on cessation <span style="opacity:.7">(Ettinger Ch 42)</span>', tone: 'teal' }],
          ],
        }, '🧲'),

        ...stepTable(5, 'IDIOPATHIC GENERALISED TREMOR (steroid-response test)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Element', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>When to diagnose</strong>', { text: 'Toxic, metabolic, structural and inflammatory causes excluded — young dog · fine whole-body tremor worse with anxiety · <strong>normal MRI</strong> · normal-to-mild mononuclear / lymphocytic CSF pleocytosis', tone: 'teal' }],
            ['<strong>Diagnosis</strong>', { text: '<strong>Idiopathic generalised tremor syndrome (IGTS / "white-shaker")</strong> — presumed immune-mediated', tone: 'teal' }],
            ['<strong>Treatment</strong>', { text: 'Prednisolone <strong>1–2 mg/kg PO q12–24h</strong> — tremor improves in <strong>3–10 days</strong>, then taper over <strong>≥6 months</strong>', tone: 'teal' }],
            ['<strong>If poorly responsive or relapsing</strong>', { text: 'Add mycophenolate 10 mg/kg PO q24h (q12h for the first 7 days)', tone: 'teal' }],
            ['<strong>Confirmation</strong>', { text: 'A clear response supports the diagnosis. (No dedicated disease page.) <span style="opacity:.7">(Ettinger Ch 42)</span>', tone: 'teal' }],
          ],
        }, '💊'),
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
