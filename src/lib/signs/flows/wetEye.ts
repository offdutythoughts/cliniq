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
          label: '😣 Increased production',
          sublabel: 'CN V irritation — ulcer · FB · distichiasis · ectopic cilia · entropion · uveitis',
          link: { to: 'lesion', loc: 'LOC-WE-PROD', name: 'Increased tear production' },
        },
        {
          variant: 'exp',
          label: '🚫 Reduced drainage',
          sublabel: 'NLS atresia · puncta · NLS obstruction · eyelid conformation',
          link: { to: 'lesion', loc: 'LOC-WE-DRAIN', name: 'Reduced tear drainage' },
        },
      ],
    },

    {
      kind: 'callout',
      tone: 'violet',
      gap: 14,
      title: '🔍 JONES TEST — DRAINAGE PATENCY',
      html: 'Apply fluorescein stain to the conjunctival fornix, do <strong>NOT</strong> rinse, wait ≤ 4 min and observe the ipsilateral nostril (or oropharynx in brachycephalics).<br>' +
        '• <strong>Stain at nostril</strong> → patent nasolacrimal system → suspect <strong>increased production</strong> (CN V irritation: ulcer, FB, ectopic cilia, distichiasis, uveitis, KCS).<br>' +
        '• <strong>No stain at nostril after 4 min</strong> → not necessarily blocked — many normal dogs (esp. brachycephalics) fail Jones. Confirm with <strong>NLS flushing</strong>: cannulate the upper punctum with a 22–24 G blunt cannula + saline, expect outflow from nostril and / or lower punctum.<br>' +
        '• <strong>Confirmed obstruction</strong> → look for foreign body (grass awn, hair), dacryocystitis, congenital atresia / micropuncta (&lt;1 yr old), or neoplasia (older patient — orbital / nasal).',
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
