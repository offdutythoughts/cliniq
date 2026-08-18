// ── Wet Eye / Epiphora flowchart (data) ─────────────────────────────────────
// Migration of wetEyeFlowHtml (src/lib/signs/wetEye.ts) to the FlowPage model.
// Self-contained: branch choices link to lesion tabs; no sub-flows or dx links.

import type { FlowPage } from '../flowTypes'

export const wetEyeFlow: FlowPage = {
  id: 'wet-eye',
  title: 'Wet Eye / Epiphora',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💧 WET EYE / EPIPHORA' },

    {
      kind: 'node',
      variant: 'step',
      text: 'INCREASED PRODUCTION vs REDUCED DRAINAGE',
      sub: 'Jones test + ocular pain assessment',
    },

    {
      kind: 'choices',
      cols: 2,
      connectAfter: false,
      items: [
        {
          variant: 'insp',
          label: 'Increased production',
          link: { to: 'lesion', loc: 'LOC-WE-PROD', name: 'Increased tear production' },
        },
        {
          variant: 'exp',
          label: 'Reduced drainage',
          link: { to: 'lesion', loc: 'LOC-WE-DRAIN', name: 'Reduced tear drainage' },
        },
      ],
    },

    // The Jones test was one paragraph carrying a technique AND three result
    // interpretations. The technique stays prose (it is a sequence of actions);
    // the interpretations are a lookup, so they are a table the reader scans by
    // the result they are holding.
    {
      kind: 'callout',
      tone: 'violet',
      gap: 14,
      title: '🔍 JONES TEST — DRAINAGE PATENCY',
      html: 'Apply fluorescein to the conjunctival fornix, do <strong>NOT</strong> rinse, wait ≤ 4 min, then watch the ipsilateral nostril — or the oropharynx in a brachycephalic.',
    },
    {
      kind: 'table',
      boxTone: 'violet',
      gap: 8,
      dividers: true,
      cols: '26% 30% 1fr',
      headers: ['Result', 'What it means', 'Do next'],
      rows: [
        [{ text: 'Stain at the nostril', tone: 'green' }, 'Nasolacrimal system is patent', 'Work up INCREASED PRODUCTION — ulcer, FB, ectopic cilia, distichiasis, uveitis, KCS'],
        [{ text: 'No stain after 4 min', tone: 'warning' }, 'NOT proof of blockage — many normal dogs, especially brachycephalics, fail Jones', 'Flush the NLS: upper punctum, 22–24 G blunt cannula + saline; expect outflow at the nostril and/or lower punctum'],
        [{ text: 'Obstruction on flushing', tone: 'danger' }, 'The duct itself is the problem', 'Foreign body (grass awn, hair), dacryocystitis, congenital atresia / micropuncta (&lt;1 yr), or neoplasia in an older patient'],
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚠️ DO NOT MISS — TREATABLE & SIGHT-RELEVANT',
      items: [
        '<strong>Ectopic cilia</strong> — recurrent dorsal corneal ulcer in a young dog → must evert the eyelid under magnification',
        '<strong>Foreign body under the third eyelid</strong> — always evert the TEL under topical anaesthetic in any acute unilateral wet eye',
        '<strong>Subclinical KCS</strong> — early KCS can present with paradoxical reflex tearing (low STT but mucoid epiphora) before full lacrimal failure',
        '<strong>Dacryocystitis with mucopurulent discharge</strong> — often masquerades as bacterial conjunctivitis; antibiotics fail without flushing the NLS',
        '<strong>Older patient with unilateral chronic epiphora ± epistaxis ± facial deformity</strong> → orbital / nasal neoplasia obstructing the NLS',
        '<strong>Bilateral chronic wet eye in a young dog with no ocular discomfort</strong> → consider congenital puncta atresia or micropuncta',
      ],
    },

    {
      kind: 'banner',
      tone: 'info',
      html: 'Tap a branch to drill down to specific causes',
    },
  ],
}
