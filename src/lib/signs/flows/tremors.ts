// ── Tremors flowchart ───────────────────────────────────────────────────────
// Tremor = involuntary, rhythmic, oscillatory movement of a body part produced
// by alternating contractions of reciprocally innervated muscles (Ettinger Ch 42).
// First job: separate a TREMOR (rhythmic oscillation, consciousness preserved)
// from a SEIZURE (link to the seizures flow) — and recognise that acute toxic
// tremors with hyperthermia are an emergency. Then triage: TOXIC/METABOLIC (the
// reversible, time-critical group) vs CEREBELLAR (intention tremor — worsens
// toward a target) vs IDIOPATHIC/OTHER (steroid-responsive "white-shaker").

import type { FlowPage } from '../flowTypes'

export const tremorsFlow: FlowPage = {
  id: 'tremors',
  title: 'Tremors',
  blocks: [
    { kind: 'node', variant: 'entry', text: '〰️ TREMORS' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>Is this a tremor or a seizure?</strong> A <strong>tremor</strong> is a rhythmic oscillation with consciousness preserved and no post-ictal phase; a <strong>seizure</strong> has impaired consciousness, increased tone and autonomic signs — if in doubt, work it up as a <strong>seizure</strong>. And remember: an <strong>acute whole-body tremor with hyperthermia</strong> (tremorgenic mycotoxin, metaldehyde, permethrin in a cat) is a <strong>toxic emergency</strong> — stabilise before you investigate. (Ettinger Ch 42)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'ACUTE & SICK, OR CHRONIC & WELL?',
      sub: 'Acute generalised tremor ± hyperthermia / tachycardia / mydriasis = toxic or metabolic until proven otherwise — check glucose, ionised calcium and potassium and take a toxin history FIRST. A slowly progressive tremor in an otherwise bright dog points cerebellar or idiopathic.',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '☠️ TOXIC / METABOLIC',
          tone: 'danger',
          sub: 'Acute · generalised · whole-body tremor at rest · hyperthermia · tachycardia · mydriasis · GI signs · may progress to seizures — the reversible, time-critical group',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'TOXIN vs ELECTROLYTE / GLUCOSE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'TOXINS — acute, hyperthermic',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🍄', label: 'TREMORGENIC MYCOTOXINS', sublabel: 'Penitrem A / roquefortine — commonest cause of acute generalised tremor; mouldy food/compost', tone: 'danger', link: { to: 'protocol', id: 'PROT-TOX-MYCOTOX' } },
                        { icon: '🐌', label: 'METALDEHYDE', sublabel: 'Slug bait — "shake-and-bake": tremors + non-febrile hyperthermia → seizures', tone: 'danger', link: { to: 'protocol', id: 'PROT-TOX-METALD' } },
                        { icon: '🐈', label: 'PERMETHRIN (CATS)', sublabel: 'Pyrethroid spot-on misapplied to a cat — tremors, hyperthermia, seizures', tone: 'orange', link: { to: 'protocol', id: 'PROT-TOX-PERM' } },
                        { icon: '🐛', label: 'ORGANOPHOSPHATE / CARBAMATE', sublabel: 'SLUDGE + muscle fasciculations/tremor; mydriasis', tone: 'warning', link: { to: 'protocol', id: 'PROT-TOX-OP' } },
                        { icon: '🔩', label: 'LEAD', sublabel: 'GI + neuro signs — tremor, behaviour change, seizures', tone: 'info', link: { to: 'protocol', id: 'PROT-TOX-LEAD' } },
                        { icon: '☕', label: 'Methylxanthines / other', sublabel: 'Caffeine · theobromine (chocolate) · xylitol · bromethalin · cannabis · macadamia', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'METABOLIC — check the bloods',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦴', label: 'HYPOCALCAEMIA', sublabel: 'Eclampsia · hypoparathyroidism · facial/whole-body tremor, twitching → tetany. Check IONISED calcium', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
                        { icon: '🍬', label: 'HYPOGLYCAEMIA', sublabel: 'Insulinoma · sepsis · toy-breed/neonate · hepatic failure — tremor, weakness, seizures', tone: 'warning', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
                        { icon: '🧬', label: 'INSULINOMA', sublabel: 'Older dog · fasting/exertional hypoglycaemia — insulin on the low-glucose sample', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
                        { icon: '🥄', label: 'HYPOKALAEMIA', sublabel: 'Weakness/ventroflexion more than tremor; correct K⁺ in every case', tone: 'info', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🧠 CEREBELLAR',
          tone: 'violet',
          sub: 'INTENTION tremor — crescendos as the head/limb approaches a target (eating, sniffing) + postural head tremor + truncal sway; NO weakness, NO proprioceptive deficits (Ettinger Ch 42)',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🐱', label: 'CEREBELLAR HYPOPLASIA', sublabel: 'Non-progressive from first ambulation; FPV in kittens', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-CEREHYPO' } },
                { icon: '📉', label: 'CEREBELLAR ABIOTROPHY', sublabel: 'Normal period then progressive Purkinje-cell degeneration (breed-related)', tone: 'violet', link: { to: 'disease', id: 'DIS-NEU-ABIOTROPHY' } },
                { icon: '🔥', label: 'MUO / MENINGOENCEPHALITIS', sublabel: 'Young small breed · progressive multifocal · CSF pleocytosis', tone: 'danger', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
                { icon: '🔥', label: 'GME', sublabel: 'Granulomatous variant — focal/multifocal inflammatory', tone: 'danger', link: { to: 'disease', id: 'DIS-GME' } },
                { icon: '💊', label: 'METRONIDAZOLE TOXICITY', sublabel: 'Drug history · central-vestibular/cerebellar signs · resolves on cessation', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
              ],
            },
          ],
        },
        {
          header: '⚪ IDIOPATHIC / OTHER',
          tone: 'teal',
          sub: 'Whole-body fine tremor in a young dog with a normal neuro exam — worse with anxiety; classic "white-shaker", but ANY breed (rare in dogs >20 kg) (Ettinger Ch 42)',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🐩', label: 'IDIOPATHIC GENERALISED TREMOR (IGTS)', sublabel: '"White-shaker" — young adult · whole-body fine tremor worsening with anxiety; MRI normal; STEROID-RESPONSIVE (pred 1–2 mg/kg q12–24h, improves 3–10 days). No dedicated page', tone: 'teal' },
                { icon: '🐶', label: 'Idiopathic head tremor (IHTS)', sublabel: '"Head-bobbing" yes-yes/no-no episodes; Bulldog/Boxer/Doberman/Labrador; benign, AED-unresponsive', tone: 'neutral' },
                { icon: '🍼', label: 'Hypomyelination ("shaker pup")', sublabel: 'Tremor from ~10 days of age when aroused; Springer/Weimaraner/Chow; many recover by 5 months', tone: 'slate' },
                { icon: '🐕‍🦺', label: 'Orthostatic tremor', sublabel: 'Limb/trunk tremor only when standing, gone when walking/recumbent; Great Dane/Deerhound or senile', tone: 'slate' },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong>Tremorgenic mycotoxin / metaldehyde toxicosis</strong> — acute generalised tremor with <strong>hyperthermia</strong> is an emergency; cool actively, decontaminate, and control tremors (methocarbamol 40–50 mg/kg slow IV; ILE for lipophilic toxins) BEFORE the work-up',
        '<strong>Permethrin in a cat</strong> — misapplied dog pyrethroid spot-on; tremors → seizures + hyperthermia; bathe, methocarbamol, ILE',
        '<strong>Hypocalcaemia</strong> — check <strong>ionised</strong> calcium (eclampsia in a lactating bitch, hypoparathyroidism); facial/whole-body tremor and twitching can tip into tetany',
        '<strong>Hypoglycaemia</strong> — measure glucose in EVERY tremoring/seizuring patient (insulinoma, sepsis, toy-breed/neonate, hepatic failure)',
        '<strong>It might be a seizure, not a tremor</strong> — impaired consciousness, increased tone or autonomic signs send you to the seizures flow',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'tremors' } },
        { label: '🧠 Tremor or seizure? — Seizures flowchart', link: { to: 'flow', id: 'seizures' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Hypoparathyroidism (hypocalcaemia)', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
        { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
        { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
        { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
        { label: 'Cerebellar hypoplasia', link: { to: 'disease', id: 'DIS-NEU-CEREHYPO' } },
        { label: 'Cerebellar abiotrophy', link: { to: 'disease', id: 'DIS-NEU-ABIOTROPHY' } },
        { label: 'Meningoencephalitis of unknown origin (MUO)', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
        { label: 'Granulomatous meningoencephalitis (GME)', link: { to: 'disease', id: 'DIS-GME' } },
        { label: 'Metronidazole toxicity', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
        { label: 'Idiopathic epilepsy', link: { to: 'disease', id: 'DIS-WK-EPILEPSY' } },
      ],
    },
  ],
}
