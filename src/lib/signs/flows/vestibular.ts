// ── Acute Vestibular flowchart (data) ───────────────────────────────────────
// Migration of renderVestibularFlow (inline in src/lib/cliniqApp.ts) to the
// FlowPage model. Single page: entry node → peripheral-vs-central comparison
// table → peripheral/central/bilateral cause nav tiles → pearls → emergency
// banner. The Dx views (renderDxVestibular) are out of scope.

import type { FlowPage } from '../flowTypes'

const vestibularEntry: FlowPage = {
  id: 'vestibular',
  title: 'Vestibular',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🌀 ACUTE VESTIBULAR — Peripheral vs Central' },

    // Peripheral vs Central vs Bilateral comparison table. The legacy colours
    // every data cell by its column (Peripheral→green, Central→red/danger,
    // Bilateral→amber/warning); the row-label column is plain text.
    {
      kind: 'table',
      cols: '1fr 1.4fr 1.4fr 1.4fr',
      headers: ['', 'Peripheral', 'Central', 'Bilateral'],
      rows: [
        [
          'Mentation',
          { text: 'Alert / normal', tone: 'green' },
          { text: 'Often depressed / obtunded', tone: 'danger' },
          { text: 'Alert / normal', tone: 'warning' },
        ],
        [
          'Nystagmus type',
          { text: 'Horizontal or rotary only', tone: 'green' },
          { text: 'Any type incl. vertical', tone: 'danger' },
          { text: 'Absent', tone: 'warning' },
        ],
        [
          'Nystagmus direction',
          { text: '<strong>Fixed</strong> — does not change with head position', tone: 'green' },
          { text: 'May be <strong>direction-changing</strong> or disconjugate', tone: 'danger' },
          { text: '—', tone: 'warning' },
        ],
        [
          'CP deficits',
          { text: '✗ ABSENT', tone: 'green' },
          { text: '✓ PRESENT', tone: 'danger' },
          { text: 'Variable', tone: 'warning' },
        ],
        [
          'Head tilt',
          { text: 'Present (toward lesion)', tone: 'green' },
          { text: 'Present (toward lesion) OR paradoxical', tone: 'danger' },
          { text: '✗ ABSENT', tone: 'warning' },
        ],
        [
          'Other CN deficits',
          { text: "± Horner's · ± CN VII only", tone: 'green' },
          { text: 'Multiple CN V–XII', tone: 'danger' },
          { text: 'Bilateral ventrolateral strabismus', tone: 'warning' },
        ],
        [
          'VOR',
          { text: 'Intact', tone: 'green' },
          { text: 'May be impaired', tone: 'danger' },
          { text: 'Absent bilaterally', tone: 'warning' },
        ],
        [
          'Gait',
          { text: 'Rollling/falling toward lesion; ataxic', tone: 'green' },
          { text: 'Ataxia ± hemiparesis', tone: 'danger' },
          { text: 'Wide-based; side-to-side sway; crouching', tone: 'warning' },
        ],
      ],
    },

    // Nav tiles — a 3-col grid of `.flow-endpoint` cause tiles, each with a
    // <br> line break and a trailing ' ›'. No typed block reproduces this
    // (endpoints renders a vertical stack and escapes <br>; choices renders
    // bolder .flow-node tiles), so this is an html escape hatch. FLAGGED: the
    // three goLesionTab links here are NOT validated by the link-integrity test.
    {
      kind: 'html',
      html: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;margin-top:10px;">
      <div class="flow-endpoint" style="background:rgba(16,185,129,0.1);border:1.5px solid rgba(16,185,129,0.4);color:#6EE7B7;font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-PERIPH','Peripheral vestibular')">
        Peripheral<br>causes ›
      </div>
      <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.4);color:#FCA5A5;font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-CENTRAL','Central vestibular')">
        Central<br>causes ›
      </div>
      <div class="flow-endpoint" style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.4);color:#FCD34D;font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-BILAT','Bilateral vestibular')">
        Bilateral<br>causes ›
      </div>
    </div>`,
    },

    // Pearls box (amber/warning). connectAfter:false suppresses the spine arrow
    // to the emergency callout below (legacy has none).
    {
      kind: 'callout',
      tone: 'warning',
      gap: 12,
      connectAfter: false,
      title: '💡 PEARLS',
      html: '• <strong>Vertical nystagmus</strong> = central until proven otherwise — no exceptions<br>• <strong>CP deficits absent in peripheral</strong> — their presence is the single most reliable central localiser<br>• <strong>Paradoxical head tilt</strong>: tilt/circle <em>away</em> from lesion = cerebellar (flocculonodular lobe)<br>• Horner\'s + CN VII palsy together = petrous temporal bone — peripheral, not central<br>• ~⅓ of clinically peripheral-appearing cases have a central lesion on MRI — low threshold for advanced imaging',
    },

    // Emergency banner (red/danger), no title.
    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      html: '<strong style="color:#F87171;">🚨 EMERGENCY signs → urgent MRI + stabilise:</strong> obtunded/stuporous · vertical or direction-changing nystagmus · CP deficits · multiple CN deficits · progressive deterioration',
    },

    { kind: 'disclaimer' },
  ],
}

export const vestibularFlows: FlowPage[] = [vestibularEntry]
