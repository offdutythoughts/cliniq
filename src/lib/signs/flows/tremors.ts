// ── Tremors flowchart ───────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { DONT_MISS_TITLE, IDENTIFY_CAUSE_STEP } from '../flowTypes'

const tremorsEntry: FlowPage = {
  id: 'tremors',
  title: 'Tremors',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' TREMORS' },
    {
      kind: 'callout',
      tone: 'danger',
      html: ' <strong>Is this a tremor or a seizure?</strong> A <strong>tremor</strong> is a rhythmic oscillation with consciousness preserved and no post-ictal phase; a <strong>seizure</strong> has impaired consciousness, increased tone and autonomic signs — if in doubt, work it up as a <strong>seizure</strong>. And remember: an <strong>acute whole-body tremor with hyperthermia</strong> (tremorgenic mycotoxin, metaldehyde, permethrin in a cat) is a <strong>toxic emergency</strong> — stabilise before you investigate. (Ettinger Ch 42)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'ACUTE & SICK, OR CHRONIC & WELL?',
      subItems: [
        'Acute generalised tremor ± hyperthermia / tachycardia / mydriasis = toxic or metabolic until proven otherwise',
        'Check glucose, ionised calcium and potassium and take a toxin history FIRST',
        'A slowly progressive tremor in an otherwise bright dog points cerebellar or idiopathic',
      ],
    },
    {
      kind: 'choices',
      cols: 3,
      connectAfter: false,
      items: [
        {
          tone: 'danger',
          label: ' TOXIC / METABOLIC',
          sublabel: 'Acute · generalised · whole-body tremor at rest · hyperthermia · tachycardia · mydriasis · GI signs · may progress to seizures',
          link: { to: 'flow', id: 'tremors-toxic' },
        },
        {
          tone: 'violet',
          label: ' CEREBELLAR',
          sublabel: 'INTENTION tremor — crescendos as the head/limb approaches a target · postural head tremor · truncal sway · NO weakness',
          link: { to: 'flow', id: 'tremors-cerebellar' },
        },
        {
          tone: 'teal',
          label: ' IDIOPATHIC / OTHER',
          sublabel: 'Whole-body fine tremor in a young dog with a normal neuro exam — worse with anxiety or excitement, absent when asleep',
          link: { to: 'flow', id: 'tremors-idiopathic' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: DONT_MISS_TITLE,
      items: [
        '<strong>Tremorgenic mycotoxin / metaldehyde toxicosis</strong> — acute generalised tremor with <strong>hyperthermia</strong> is an emergency; cool actively, decontaminate, and control tremors (methocarbamol 40–50 mg/kg slow IV; ILE for lipophilic toxins) BEFORE the work-up',
        '<strong>Permethrin in a cat</strong> — misapplied dog pyrethroid spot-on; tremors → seizures + hyperthermia; bathe, methocarbamol, ILE',
        '<strong>Hypocalcaemia</strong> — check <strong>ionised</strong> calcium (eclampsia in a lactating bitch, hypoparathyroidism); facial/whole-body tremor and twitching can tip into tetany',
        '<strong>Hypoglycaemia</strong> — measure glucose in EVERY tremoring/seizuring patient (insulinoma, sepsis, toy-breed/neonate, hepatic failure)',
        '<strong>It might be a seizure, not a tremor</strong> — impaired consciousness, increased tone or autonomic signs send you to the seizures flow',
      ],
    },

  ],
}

const tremorsToxic: FlowPage = {
  id: 'tremors-toxic',
  title: 'Tremors — Toxic / Metabolic',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' TOXIC / METABOLIC', sub: 'Acute · generalised · whole-body tremor at rest · hyperthermia · tachycardia · mydriasis · GI signs · may progress to seizures — the reversible, time-critical group' },
    { kind: 'node', variant: 'step', text: 'TOXIN vs ELECTROLYTE / GLUCOSE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Toxins — Acute / Hyperthermic',
          tone: 'danger',
          tiles: [
            { label: 'Tremorgenic mycotoxins', link: { to: 'protocol', id: 'PROT-TOX-MYCOTOX' } },
            { label: 'Metaldehyde', link: { to: 'protocol', id: 'PROT-TOX-METALD' } },
            { label: 'Permethrin (cats)', link: { to: 'protocol', id: 'PROT-TOX-PERM' } },
            { label: 'Organophosphate / carbamate', link: { to: 'protocol', id: 'PROT-TOX-OP' } },
            { label: 'Lead', link: { to: 'protocol', id: 'PROT-TOX-LEAD' } },
            { label: 'Methylxanthines / other', link: { to: 'disease', id: 'DIS-TOXIC-METHYL' } },
            { label: ' Ivermectin / macrocyclic lactones (MDR1 breeds)', terminal: true },
          ],
        },
        {
          cat: 'Metabolic — Check the Bloods',
          tone: 'warning',
          tiles: [
            { label: 'Hypocalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
            { label: 'Hypoglycaemia', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'Insulinoma', link: { to: 'disease', id: 'DIS-NEO-INSULINOMA' } },
            { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
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
    { kind: 'node', variant: 'entry', text: ' CEREBELLAR', sub: 'INTENTION tremor — crescendos as the head/limb approaches a target (eating, sniffing) + postural head tremor + truncal sway; NO weakness, NO proprioceptive deficits (Ettinger Ch 42)' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Developmental / Degenerative',
          tone: 'teal',
          tiles: [
            { label: 'Cerebellar hypoplasia', link: { to: 'disease', id: 'DIS-NEU-CEREHYPO' } },
            { label: 'Cerebellar abiotrophy', link: { to: 'disease', id: 'DIS-NEU-ABIOTROPHY' } },
          ],
        },
        {
          cat: 'Inflammatory / Infectious',
          tone: 'danger',
          tiles: [
            { label: 'MUO / meningoencephalitis', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
            { label: ' GME', link: { to: 'disease', id: 'DIS-GME' } },
            { label: ' CDV encephalitis', link: { to: 'disease', id: 'DIS-INFECT-CDV' } },
            { label: ' Toxoplasma / Neospora', link: { to: 'disease', id: 'DIS-INFECT-TOXO' } },
          ],
        },
        {
          cat: 'Drug-induced',
          tiles: [
            { label: 'Metronidazole toxicity', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
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
    { kind: 'node', variant: 'entry', text: ' IDIOPATHIC / OTHER', sub: 'Whole-body fine tremor in a young dog with a normal neuro exam — worse with anxiety; classic "white-shaker", but ANY breed (rare in dogs >20 kg) (Ettinger Ch 42)' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Idiopathic / Steroid-Responsive',
          tone: 'teal',
          tiles: [
            { label: 'Idiopathic generalised tremor (IGTS)', link: { to: 'disease', id: 'DIS-NEU-IGTS' } },
          ],
        },
        {
          cat: 'Breed-Related / Benign',
          tone: 'info',
          tiles: [
            { label: 'Idiopathic head tremor (IHTS)', link: { to: 'disease', id: 'DIS-NEU-IHTS' } },
            { label: 'Hypomyelination ("shaker pup")', link: { to: 'disease', id: 'DIS-NEU-HYPOMYEL' } },
            { label: ' Orthostatic tremor — limb/trunk tremor only when standing; Great Dane/Deerhound or senile', terminal: true },
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
