// ── Tremors flowchart ───────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const tremorsEntry: FlowPage = {
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
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'danger',
          label: '☠️ TOXIC / METABOLIC',
          sublabel: 'Acute · generalised · whole-body tremor at rest · hyperthermia · tachycardia · mydriasis · GI signs · may progress to seizures',
          link: { to: 'flow', id: 'tremors-toxic' },
        },
        {
          tone: 'violet',
          label: '🧠 CEREBELLAR',
          sublabel: 'INTENTION tremor — crescendos as the head/limb approaches a target · postural head tremor · truncal sway · NO weakness',
          link: { to: 'flow', id: 'tremors-cerebellar' },
        },
        {
          tone: 'teal',
          label: '⚪ IDIOPATHIC / OTHER',
          sublabel: 'Whole-body fine tremor in a young dog with a normal neuro exam — worse with anxiety; classic "white-shaker", but ANY breed',
          link: { to: 'flow', id: 'tremors-idiopathic' },
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

const tremorsToxic: FlowPage = {
  id: 'tremors-toxic',
  title: 'Tremors — Toxic / Metabolic',
  blocks: [
    { kind: 'node', variant: 'entry', text: '☠️ TOXIC / METABOLIC', sub: 'Acute · generalised · whole-body tremor at rest · hyperthermia · tachycardia · mydriasis · GI signs · may progress to seizures — the reversible, time-critical group' },
    { kind: 'node', variant: 'step', text: 'TOXIN vs ELECTROLYTE / GLUCOSE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Toxins — Acute / Hyperthermic',
          tone: 'danger',
          tiles: [
            { label: '🍄 TREMORGENIC MYCOTOXINS', link: { to: 'protocol', id: 'PROT-TOX-MYCOTOX' } },
            { label: '🐌 METALDEHYDE', link: { to: 'protocol', id: 'PROT-TOX-METALD' } },
            { label: '🐈 PERMETHRIN (CATS)', link: { to: 'protocol', id: 'PROT-TOX-PERM' } },
            { label: '🐛 ORGANOPHOSPHATE / CARBAMATE', link: { to: 'protocol', id: 'PROT-TOX-OP' } },
            { label: '🔩 LEAD', link: { to: 'protocol', id: 'PROT-TOX-LEAD' } },
            { label: '☕ Methylxanthines / other — caffeine · theobromine · xylitol · bromethalin · cannabis · macadamia' },
          ],
        },
        {
          cat: 'Metabolic — Check the Bloods',
          tone: 'warning',
          tiles: [
            { label: '🦴 HYPOCALCAEMIA', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
            { label: '🍬 HYPOGLYCAEMIA', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: '🧬 INSULINOMA', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: '🥄 HYPOKALAEMIA', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
          ],
        },
      ],
    },
  ],
}

const tremorsCerebellar: FlowPage = {
  id: 'tremors-cerebellar',
  title: 'Tremors — Cerebellar',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🧠 CEREBELLAR', sub: 'INTENTION tremor — crescendos as the head/limb approaches a target (eating, sniffing) + postural head tremor + truncal sway; NO weakness, NO proprioceptive deficits (Ettinger Ch 42)' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Developmental / Degenerative',
          tone: 'teal',
          tiles: [
            { label: '🐱 CEREBELLAR HYPOPLASIA', link: { to: 'disease', id: 'DIS-NEU-CEREHYPO' } },
            { label: '📉 CEREBELLAR ABIOTROPHY', link: { to: 'disease', id: 'DIS-NEU-ABIOTROPHY' } },
          ],
        },
        {
          cat: 'Inflammatory / Infectious',
          tone: 'danger',
          tiles: [
            { label: '🔥 MUO / MENINGOENCEPHALITIS', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
            { label: '🔥 GME', link: { to: 'disease', id: 'DIS-GME' } },
          ],
        },
        {
          cat: 'Drug-Induced',
          tone: 'warning',
          tiles: [
            { label: '💊 METRONIDAZOLE TOXICITY', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
          ],
        },
      ],
    },
  ],
}

const tremorsIdiopathic: FlowPage = {
  id: 'tremors-idiopathic',
  title: 'Tremors — Idiopathic / Other',
  blocks: [
    { kind: 'node', variant: 'entry', text: '⚪ IDIOPATHIC / OTHER', sub: 'Whole-body fine tremor in a young dog with a normal neuro exam — worse with anxiety; classic "white-shaker", but ANY breed (rare in dogs >20 kg) (Ettinger Ch 42)' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Idiopathic / Steroid-Responsive',
          tone: 'teal',
          tiles: [
            { label: '🐩 IDIOPATHIC GENERALISED TREMOR (IGTS) — "white-shaker"; steroid-responsive (pred 1–2 mg/kg q12–24h, improves 3–10 days)' },
          ],
        },
        {
          cat: 'Breed-Related / Benign',
          tone: 'neutral',
          tiles: [
            { label: '🐶 Idiopathic head tremor (IHTS) — "head-bobbing"; Bulldog/Boxer/Doberman/Labrador; benign, AED-unresponsive' },
            { label: '🍼 Hypomyelination ("shaker pup") — tremor from ~10 days of age when aroused; many recover by 5 months' },
            { label: '🐕‍🦺 Orthostatic tremor — limb/trunk tremor only when standing; Great Dane/Deerhound or senile' },
          ],
        },
      ],
    },
  ],
}

export const tremorsFlows: FlowPage[] = [
  tremorsEntry,
  tremorsToxic,
  tremorsCerebellar,
  tremorsIdiopathic,
]
