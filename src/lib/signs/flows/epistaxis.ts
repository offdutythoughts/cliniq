// ── Epistaxis flowchart ──────────────────────────────────────────────────────
// Clinical logic mirrors vomiting: imperative step → branch → nested
// sub-question within each column → plain-label sub-split → endpoints.
// LOCAL column:    ACUTE ONSET vs CHRONIC PROGRESSIVE (no-tone → grey text labels)
// SYSTEMIC column: PRIMARY vs SECONDARY HAEMOSTASIS   (no-tone → grey text labels)

import type { FlowPage } from '../flowTypes'

export const epistaxisFlow: FlowPage = {
  id: 'epistaxis',
  title: 'Epistaxis',
  blocks: [
    { kind: 'node', variant: 'entry', text: '👃 EPISTAXIS' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>Unilateral vs bilateral does NOT reliably separate local from systemic disease</strong> — up to 52% of dogs with systemic disease present with unilateral epistaxis. Use it as a clue, never a rule.',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'RULE OUT SYSTEMIC BLEEDING FIRST',
      subItems: [
        'Intranasal disease accounts for ≈80% of canine cases — but a haemostatic defect changes everything',
        'Never perform invasive diagnostics (rhinoscopy, biopsy, CT under GA) without excluding a bleeding disorder first',
      ],
    },

    {
      kind: 'branch',
      columns: [
        {
          header: 'LOCAL / INTRANASAL',
          tone: 'teal',
          sub: 'Chronic nasal signs · sneezing · stertor · mucopurulent discharge · unilateral epiphora · facial pain / deformity · nasal planum depigmentation · ↓ retropulsion · submandibular LN',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'ACUTE ONSET vs CHRONIC PROGRESSIVE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'ACUTE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { label: 'Trauma', tone: 'danger', link: { to: 'disease', id: 'DIS-NASAL-TRAUMA' } },
                        { label: 'Foreign body', tone: 'orange', link: { to: 'disease', id: 'DIS-NASAL-FB' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'CHRONIC / PROGRESSIVE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { label: 'Neoplasia', sublabel: 'Most common local cause (30–66%)', tone: 'violet', link: { to: 'disease', id: 'DIS-NASAL-NEO' } },
                        { label: 'Fungal rhinitis', tone: 'green', link: { to: 'disease', id: 'DIS-NASAL-ASP' } },
                        { label: 'Idiopathic rhinitis', tone: 'green', link: { to: 'disease', id: 'DIS-NASAL-LPR' } },
                        { label: 'Dental / oronasal disease', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: 'SYSTEMIC DISEASE',
          tone: 'danger',
          sub: 'Bleeding at other sites · petechiae / ecchymoses · melena · gingival bleed · venepuncture bruising · lethargy · weight loss · hyphema / retinal haemorrhage',
          blocks: [
            // A haemostatic defect hands off to the full bleeding work-up — the
            // primary/secondary haemostasis split and every cause lives there.
            {
              kind: 'endpoints',
              items: [
                { label: 'Bleeding / petechiae / ecchymoses', tone: 'danger', link: { to: 'flow', id: 'bleeding' } },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Severe thrombocytopenia</strong> (platelet &lt;30–50 ×10⁹/L) — confirm on a fresh smear before anything invasive',
        { bold: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' }, html: ' — give Vitamin K1 SC empirically; FFP for active bleeding' },
        '<strong>Hypovolaemia / anaemia from severe haemorrhage</strong> — rare but needs transfusion + fluid resuscitation, especially before GA for CT/rhinoscopy',
        '<strong>Swallowed blood → melena</strong> can falsely suggest a GI/systemic bleed — interpret melena cautiously in epistaxis',
      ],
    },

  ],
}
