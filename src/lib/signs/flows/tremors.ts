// ── Tremors flowchart ───────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { DONT_MISS_TITLE, IDENTIFY_CAUSE_STEP } from '../flowTypes'

const tremorsEntry: FlowPage = {
  id: 'tremors',
  title: 'Tremors',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' TREMORS' },

    // Q1 — tremor or seizure? Asked as a fork over the FINDINGS the reader
    // watched, not as a paragraph they have to disassemble. The tremor leg
    // continues down the spine; the seizure leg exits to the seizures flow.
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS A TREMOR, OR A SEIZURE?',
      sub: 'Watch one episode before you commit (Ettinger Ch 42)',
    },
    {
      kind: 'fork',
      legs: [
        {
          label: 'TREMOR',
          tone: 'info',
          subItems: [
            'Rhythmic oscillation at a fixed rhythm',
            'Consciousness PRESERVED',
            'Tone normal · no autonomic signs',
            'No post-ictal phase',
          ],
          continue: true,
        },
        {
          label: 'SEIZURE',
          tone: 'violet',
          subItems: [
            'Consciousness impaired',
            'Tone increased — rigid or paddling',
            'Salivation · urination · defecation',
            'Post-ictal confusion or blindness',
          ],
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Seizures', tone: 'violet', link: { to: 'flow', id: 'seizures' } },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'ACUTE & SICK, OR CHRONIC & WELL?',
      subItems: [
        'Check glucose, ionised calcium and potassium before anything else',
        'Take a toxin history — mouldy food, snail bait, spot-on products',
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
          link: { to: 'flow', id: 'tremors-toxic' },
        },
        {
          tone: 'violet',
          label: ' CEREBELLAR',
          link: { to: 'flow', id: 'tremors-cerebellar' },
        },
        {
          tone: 'teal',
          label: ' IDIOPATHIC / OTHER',
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
            { label: 'Tremorgenic mycotoxins', link: { to: 'disease', id: 'DIS-TOX-MYCO' } },
            { label: 'Metaldehyde', link: { to: 'disease', id: 'DIS-TOX-METALD' } },
            { label: 'Permethrin (cats)', link: { to: 'disease', id: 'DIS-TOX-PERM' } },
            { label: 'Organophosphate / carbamate', link: { to: 'disease', id: 'DIS-TOX-OP' } },
            { label: 'Lead', link: { to: 'disease', id: 'DIS-TOX-LEAD' } },
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
