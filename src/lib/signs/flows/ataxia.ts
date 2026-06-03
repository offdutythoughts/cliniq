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
          sublabel: 'Hypermetria (dysmetria)<br>Intention tremor<br>Truncal sway<br>Wide-based stance<br><strong style="color:#93C5FD;">No paresis</strong><br>Normal mentation',
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
          sublabel: 'Knuckling<br>Crossing over<br>Scuffing toes<br>Delayed CP placing<br><strong style="color:#FCA5A5;">Paresis present</strong><br>Spinal cord / brainstem',
          link: { to: 'flow', id: 'myelopathy' },
        },
      ],
    },

    // "Key distinctions" box — neutral var(--card) panel with an uppercase
    // letter-spaced title and var(--white) inline strongs. No typed block
    // reproduces this exact structure (callout is tone-tinted, 9.5px) → html.
    {
      kind: 'html',
      html: `<div style="margin-top:12px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:12px;width:100%;">
    <div style="font-size:11px;font-weight:600;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">💡 Key distinctions</div>
    <div style="font-size:11px;color:var(--gray);line-height:1.65;">
      <strong style="color:var(--white);">Cerebellar:</strong> No paresis, no proprioceptive deficits — the cerebellum coordinates movement, doesn’t initiate it. Hypermetria is the hallmark.<br>
      <strong style="color:var(--white);">Vestibular:</strong> Asymmetric — falls/leans to one side. Head tilt + nystagmus = vestibular until proven otherwise.<br>
      <strong style="color:var(--white);">Proprioceptive (GP):</strong> Always has paresis — weakness + incoordination together. Spinal cord lesion.
    </div>
  </div>`,
    },

    // "🐱 vs 🐕 — Species differences" box — teal-tinted panel with dense
    // dog/cat pearls. SpeciesCompare is typed but unrendered; the legacy is a
    // single mixed list (not 🐕/🐱 columns) with var(--white) inline strongs →
    // html (FLAG: a typed species-pearl / titled-list block would help here).
    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:10px 14px;background:rgba(13,115,119,0.10);border:1px solid rgba(13,115,119,0.4);border-radius:12px;width:100%;">
    <div style="font-size:11px;font-weight:600;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">🐱 vs 🐕 — Species differences</div>
    <div style="font-size:11px;color:var(--gray);line-height:1.65;">
      <strong style="color:var(--white);">🐱 Kitten with non-progressive tremor from first ambulation:</strong> almost always FPV cerebellar hypoplasia — reassure owners.<br>
      <strong style="color:var(--white);">🐱 Cervical ventroflexion + ataxia + dilated pupils:</strong> think THIAMINE deficiency (fish/homemade diet) — treat on suspicion (IM thiamine, NOT IV).<br>
      <strong style="color:var(--white);">🐱 Young cat from multi-cat household with multifocal CNS signs:</strong> exclude neurological FIP — high globulins, low A:G, periventricular MRI lesions.<br>
      <strong style="color:var(--white);">🐕 Unvaccinated dog with myoclonus (chewing-gum fits) + multifocal CNS signs:</strong> CDV until proven otherwise — RT-PCR + isolate.<br>
      <strong style="color:var(--white);">🐕 Young purebred terrier with progressive cerebellar signs ± myokymia (skin rippling):</strong> spinocerebellar ataxia (SAM/SDCA) — breed-specific DNA test.<br>
      <strong style="color:var(--white);">🐕 Young pup with rigid pelvic-limb hyperextension:</strong> Neospora caninum — serology + clindamycin.<br>
      <strong style="color:var(--white);">🐱 + 🐕 Currently on metronidazole:</strong> vertical/positional nystagmus = toxicity until proven otherwise — STOP the drug. Cats more susceptible.<br>
      <strong style="color:var(--white);">🐕 Idiopathic vestibular:</strong> classic in geriatric dogs. <strong style="color:var(--white);">🐱 Idiopathic vestibular:</strong> all ages, often seasonal (summer) in outdoor cats.
    </div>
  </div>`,
    },

    // Two trailing action cards (.card rows). No typed block reproduces the
    // .card-icon/.card-title/.card-sub/.card-arrow layout (dxRow renders .dx-test
    // buttons, visually different) → html. Onclicks mapped: renderDxAtaxia() is a
    // dx view; renderProtoDetail('PROT-ATAXIA') a protocol. (FLAG: a typed
    // linkCard/cardRow block would let these be validated links.)
    {
      kind: 'html',
      html: `<div style="margin-top:8px;width:100%;"><div class="card" onclick="renderDxAtaxia()"><div class="card-row"><div class="card-icon">🔬</div><div style="flex:1"><div class="card-title">Diagnostic Approach</div><div class="card-sub">Imaging + targeted testing by ataxia type</div></div><div class="card-arrow">›</div></div></div></div>
  <div style="margin-top:6px;width:100%;"><div class="card" onclick="renderProtoDetail('PROT-ATAXIA')"><div class="card-row"><div class="card-icon">⚡</div><div style="flex:1"><div class="card-title">Emergency Ataxia Protocol</div><div class="card-sub">Stabilisation + workup for the acutely ataxic patient</div></div><div class="card-arrow">›</div></div></div></div>`,
    },

    { kind: 'disclaimer' },
  ],
}

export const ataxiaFlows: FlowPage[] = [ataxiaEntry]
