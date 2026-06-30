// ── Ataxia flowchart (data) ─────────────────────────────────────────────────
// Migration of renderAtaxiaFlow() (inline in cliniqApp.ts) to the FlowPage
// model. Single-page sign: a 3-column classification split (cerebellar /
// vestibular / proprioceptive) → `choices`; the two info boxes (Key
// distinctions, Species differences) and the two trailing action `.card` rows
// have no typed block that reproduces their exact markup → `html` (flagged).
// Dx views (renderDxAtaxia*) are a separate tranche and are NOT migrated here.

import type { FlowPage } from '../flowTypes'

const ataxiaEntry: FlowPage = {
  id: 'ataxia',
  title: 'Ataxia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🚶 ATAXIA' },

    // Legacy: flow-node step "Observe gait carefully" with a grey sub-line
    // "Which type of incoordination?". The typed node `sub` renders a .fn-sub
    // (10px grey) — same size/colour as the legacy inline span; reproduced as a
    // node so the spine arrows above and below are drawn automatically.
    { kind: 'node', variant: 'step', text: 'Observe gait carefully', sub: 'Which type of incoordination?' },

    { kind: 'node', variant: 'step', text: 'CLASSIFY ATAXIA TYPE' },

    {
      kind: 'choices',
      cols: 3,
      size: 11,
      connectAfter: false,
      items: [
        {
          variant: 'insp',
          label: 'Cerebellar',
          sublabel: 'Hypermetria (dysmetria)<br>Intention tremor<br>Truncal sway<br>Wide-based stance<br><strong style="color:var(--tone-info-fg);">No paresis</strong><br>Normal mentation',
          link: { to: 'lesion', loc: 'LOC-AT-CEREB', name: 'Cerebellar ataxia' },
        },
        {
          variant: 'rest',
          label: 'Vestibular',
          sublabel: 'Head tilt<br>Nystagmus<br>Falling / rolling<br>Tight circling<br><strong style="color:var(--amber-text);">± Paresis (central)</strong><br>± ↓ Mentation (central)',
          link: { to: 'flow', id: 'vestibular' },
        },
        {
          variant: 'mixed',
          label: 'Proprioceptive',
          sublabel: 'Knuckling<br>Crossing over<br>Scuffing toes<br>Delayed CP placing<br><strong style="color:var(--tone-danger-fg);">Paresis present</strong><br>Spinal cord / brainstem',
          link: { to: 'flow', id: 'myelopathy' },
        },
      ],
    },

    {
      kind: 'callout',
      tone: 'slate',
      gap: 12,
      connectAfter: false,
      title: '💡 Key distinctions',
      html: '<strong>Cerebellar:</strong> No paresis, no proprioceptive deficits — the cerebellum coordinates movement, doesn\'t initiate it. Hypermetria is the hallmark.<br><strong>Vestibular:</strong> Asymmetric — falls/leans to one side. Head tilt + nystagmus = vestibular until proven otherwise.<br><strong>Proprioceptive (GP):</strong> Always has paresis — weakness + incoordination together. Spinal cord lesion.',
    },
    {
      kind: 'callout',
      tone: 'teal',
      gap: 10,
      connectAfter: false,
      title: 'Species differences',
      html: '<strong>Feline</strong><br><strong>Kitten with non-progressive tremor from first ambulation:</strong> almost always FPV cerebellar hypoplasia — reassure owners.<br><strong>Cervical ventroflexion + ataxia + dilated pupils:</strong> think THIAMINE deficiency (fish/homemade diet) — treat on suspicion (IM thiamine, NOT IV).<br><strong>Young cat from multi-cat household with multifocal CNS signs:</strong> exclude neurological FIP — high globulins, low A:G, periventricular MRI lesions.<br><strong>Idiopathic vestibular:</strong> all ages, often seasonal (summer) in outdoor cats.<br><br><strong>Canine</strong><br><strong>Unvaccinated dog with myoclonus (chewing-gum fits) + multifocal CNS signs:</strong> CDV until proven otherwise — RT-PCR + isolate.<br><strong>Young purebred terrier with progressive cerebellar signs ± myokymia (skin rippling):</strong> spinocerebellar ataxia (SAM/SDCA) — breed-specific DNA test.<br><strong>Young pup with rigid pelvic-limb hyperextension:</strong> Neospora caninum — serology + clindamycin.<br><strong>Idiopathic vestibular:</strong> classic in geriatric dogs.<br><br><strong>Both</strong><br><strong>Currently on metronidazole:</strong> vertical/positional nystagmus = toxicity until proven otherwise — STOP the drug. Cats more susceptible.',
    },
    { kind: 'disclaimer' },
  ],
}

export const ataxiaFlows: FlowPage[] = [ataxiaEntry]
