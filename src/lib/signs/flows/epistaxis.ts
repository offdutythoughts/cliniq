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
      sub: 'Intranasal disease ≈ 80% of canine cases — but a haemostatic defect changes everything; never perform invasive diagnostics (rhinoscopy, biopsy, CT under GA) without excluding it first',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔵 LOCAL / INTRANASAL',
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
                        { icon: '🤕', label: 'TRAUMA', sublabel: 'RTA · head strike', tone: 'danger', link: { to: 'disease', id: 'DIS-NASAL-TRAUMA' } },
                        { icon: '🌾', label: 'FOREIGN BODY', sublabel: 'Acute violent sneezing → chronic', tone: 'orange', link: { to: 'disease', id: 'DIS-NASAL-FB' } },
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
                        { icon: '🧬', label: 'NEOPLASIA', sublabel: 'Most common local cause (30–66%)', tone: 'violet', link: { to: 'disease', id: 'DIS-NASAL-NEO' } },
                        { icon: '🍄', label: 'FUNGAL RHINITIS', sublabel: 'Aspergillus — depigmentation + pain', tone: 'green', link: { to: 'disease', id: 'DIS-NASAL-ASP' } },
                        { icon: '🔥', label: 'IDIOPATHIC RHINITIS', sublabel: 'Lymphoplasmacytic — Dx of exclusion', tone: 'green', link: { to: 'disease', id: 'DIS-NASAL-LPR' } },
                        { icon: '🦷', label: 'Dental / oronasal disease', sublabel: 'periapical abscess · oronasal fistula', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🩸 SYSTEMIC DISEASE',
          tone: 'danger',
          sub: 'Bleeding at other sites · petechiae / ecchymoses · melena · gingival bleed · venepuncture bruising · lethargy · weight loss · hyphema / retinal haemorrhage',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'PRIMARY vs SECONDARY HAEMOSTASIS?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'PRIMARY — petechiae · mucosal bleed · low/normal platelets',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧱', label: 'THROMBOCYTOPENIA / IMTP', sublabel: 'Commonest systemic cause', tone: 'danger', link: { to: 'disease', id: 'DIS-BD-IMTP' } },
                        { icon: '🩹', label: 'THROMBOCYTOPATHIA / vWD', sublabel: 'Normal count, mucosal bleed', tone: 'warning', link: { to: 'disease', id: 'DIS-BD-TPATH' } },
                        { icon: '🦟', label: 'VECTOR-BORNE DISEASE', sublabel: 'Ehrlichia · Leishmania · Babesia', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'SECONDARY — cavity / deep bleed · PT prolongs first',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '☠️', label: 'ANTICOAGULANT RODENTICIDE', sublabel: 'PT prolongs first — give Vit K1', tone: 'info', link: { to: 'disease', id: 'DIS-BD-ROD' } },
                        { icon: '🩸', label: 'HYPERVISCOSITY', sublabel: 'Myeloma · hyperglobulinaemia', tone: 'violet', link: { to: 'disease', id: 'DIS-VASC-HYPERVSC' } },
                        { icon: '📈', label: 'HYPERTENSION', sublabel: 'Exacerbates rather than causes', tone: 'warning', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
                        { icon: '🔗', label: 'PRIMARY vs SECONDARY HAEMOSTASIS', sublabel: 'Open full bleeding flowchart', tone: 'danger', link: { to: 'flow', id: 'bleeding' } },
                      ],
                    },
                  ],
                },
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
        '<strong>Severe thrombocytopenia</strong> (platelet &lt;30–50 ×10⁹/L) — confirm on a fresh smear before anything invasive',
        '<strong onclick="renderDiseasePage(\'DIS-BD-ROD\')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide</strong> — give Vitamin K1 SC empirically; FFP for active bleeding',
        '<strong>Hypovolaemia / anaemia from severe haemorrhage</strong> — rare but needs transfusion + fluid resuscitation, especially before GA for CT/rhinoscopy',
        '<strong>Swallowed blood → melena</strong> can falsely suggest a GI/systemic bleed — interpret melena cautiously in epistaxis',
      ],
    },

  ],
}
