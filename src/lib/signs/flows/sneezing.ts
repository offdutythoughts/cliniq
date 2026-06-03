// ── Sneezing flowchart (data) ───────────────────────────────────────────────
// Migration of renderSneezeFlow (inline in cliniqApp.ts) to the FlowPage model.
// Self-contained: the two laterality branches link to lesion tabs; no sub-flows
// or dx links. The legacy "Key note" box uses the neutral .card surface
// (var(--card)/var(--border)) with an uppercase label — not reproducible by the
// tinted `callout` block — so it stays an `html` escape-hatch box (FLAGGED).

import type { FlowPage } from '../flowTypes'

export const sneezingFlows: FlowPage[] = [
  {
    id: 'sneezing',
    title: 'Sneezing',
    blocks: [
      { kind: 'node', variant: 'entry', text: '🤧 SNEEZING' },

      {
        kind: 'node',
        variant: 'step',
        text: 'Assess laterality of nasal discharge',
        sub: 'Unilateral = structural until proven otherwise',
      },

      {
        kind: 'choices',
        cols: 2,
        size: 11,
        items: [
          {
            variant: 'mixed',
            label: '🔴 Unilateral',
            sublabel: 'Foreign body, neoplasia<br>Aspergillosis, oronasal fistula<br>Think structural cause',
            link: { to: 'lesion', loc: 'LOC-SN-UNI', name: 'Unilateral sneezing' },
          },
          {
            variant: 'exp',
            label: '🟢 Bilateral',
            sublabel: 'Viral URTI (cat)<br>Chronic rhinosinusitis<br>Allergic rhinitis, polyp',
            link: { to: 'lesion', loc: 'LOC-SN-BI', name: 'Bilateral sneezing' },
          },
        ],
      },

      // FLAG: neutral .card "Key note" box (var(--card)/var(--border), uppercase
      // label) — no typed block reproduces this surface; kept as raw HTML.
      {
        kind: 'html',
        html:
          '<div style="margin-top:12px;padding:10px 14px;background:var(--card);border:1px solid var(--border);border-radius:12px;">' +
          '<div style="font-size:11px;font-weight:600;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">💡 Key note</div>' +
          '<div style="font-size:12px;color:var(--gray);line-height:1.65;">' +
          '<strong style="color:var(--white);">Unilateral</strong> is more likely structural (foreign body, tumour, fungal) and warrants advanced imaging.<br>' +
          '<strong style="color:var(--white);">Bilateral</strong> is more likely infectious or inflammatory, but always exclude neoplasia in chronic cases.' +
          '</div></div>',
      },

      { kind: 'disclaimer' },
    ],
  },
]
