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

    // Both trailing boxes were paragraphs doing a table's job. The first is the
    // one axis that separates the three types (does the patient have paresis?);
    // the second is a pattern → diagnosis lookup, so it is read by scanning the
    // left column, not by reading sentences.
    {
      kind: 'table',
      boxTone: 'slate',
      gap: 12,
      dividers: true,
      title: ' KEY DISTINCTION — DOES THE PATIENT HAVE PARESIS?',
      cols: '22% 24% 1fr',
      headers: ['Type', 'Paresis / CP deficits', 'Hallmark'],
      rows: [
        [{ text: 'Cerebellar', tone: 'info' }, 'NONE', 'Hypermetria — the cerebellum coordinates movement, it does not initiate it'],
        [{ text: 'Vestibular', tone: 'warning' }, 'Only if CENTRAL', 'Asymmetric — falls or leans to one side; head tilt + nystagmus until proven otherwise'],
        [{ text: 'Proprioceptive', tone: 'danger' }, 'ALWAYS', 'Weakness AND incoordination together — a spinal cord lesion'],
      ],
    },
    {
      kind: 'table',
      boxTone: 'teal',
      gap: 10,
      dividers: true,
      title: ' SPECIES PATTERNS — WHAT THE SIGNALMENT ADDS',
      cols: '46% 1fr',
      headers: ['Pattern in front of you', 'Think'],
      rows: [
        { section: 'Feline' },
        ['Kitten, non-progressive tremor from first ambulation', 'FPV cerebellar hypoplasia — reassure the owner'],
        ['Cervical ventroflexion + ataxia + dilated pupils', 'Thiamine deficiency (fish / homemade diet) — treat on suspicion, IM thiamine NOT IV'],
        ['Young cat, multi-cat household, multifocal CNS signs', 'Neurological FIP — high globulins, low A:G, periventricular MRI lesions'],
        ['Any age, outdoor cat, often summer', 'Idiopathic vestibular disease'],
        { section: 'Canine' },
        ['Unvaccinated dog, myoclonus (chewing-gum fits) + multifocal CNS signs', 'CDV until proven otherwise — RT-PCR and isolate'],
        ['Young purebred terrier, progressive cerebellar signs ± myokymia (skin rippling)', 'Spinocerebellar ataxia (SAM / SDCA) — breed-specific DNA test'],
        ['Young pup, rigid pelvic-limb hyperextension', 'Neospora caninum — serology + clindamycin'],
        ['Geriatric dog, peracute head tilt', 'Idiopathic vestibular disease'],
        { section: 'Both species' },
        ['Currently on metronidazole, vertical or positional nystagmus', 'Metronidazole toxicity until proven otherwise — STOP the drug; cats are more susceptible'],
      ],
    },
    { kind: 'disclaimer' },
  ],
}

export const ataxiaFlows: FlowPage[] = [ataxiaEntry]
