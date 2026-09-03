// ── Acute Vestibular flowchart (data) ───────────────────────────────────────
// Migration of renderVestibularFlow (inline in src/lib/cliniqApp.ts) to the
// FlowPage model. Single page: entry node → peripheral-vs-central comparison
// table → peripheral/central/bilateral cause nav tiles → pearls → emergency
// banner. The Dx views (renderDxVestibular) are out of scope.

import type { FlowPage } from '../flowTypes'
import { VEST_LOC_COLS, VEST_LOC_HEADERS, VEST_LOC_ROWS } from '../vestibularLocalisation'

const vestibularEntry: FlowPage = {
  id: 'vestibular',
  title: 'Vestibular',
  noCard: true,
  blocks: [
    { kind: 'node', variant: 'entry', text: '🌀 ACUTE VESTIBULAR — Peripheral vs Central' , sub: 'Head tilt, nystagmus, falling or rolling and tight circling — decide peripheral vs central before listing causes' },

    {
      kind: 'node',
      variant: 'step',
      text: 'PERIPHERAL vs CENTRAL?',
      subItems: [
        'Nystagmus that is horizontal or rotary and never changes direction with head position = peripheral',
        'Vertical or direction-changing nystagmus = central',
        'Name the nystagmus by its FAST phase: away from the lesion = peripheral, either way = central',
        'Postural-reaction deficits, ↓mentation or deficits in other cranial nerves (except VII) = central',
        'Horner syndrome or facial paresis with an otherwise normal exam = peripheral (middle/inner ear)',
      ],
    },

    // Peripheral vs Central vs Bilateral comparison table — the SAME rows the
    // Diagnostic exam tab renders, from ../vestibularLocalisation. Kept in one
    // place because the two copies had already drifted apart.
    {
      kind: 'table',
      gap: 12,
      dividers: true,
      cols: VEST_LOC_COLS,
      headers: VEST_LOC_HEADERS,
      rows: VEST_LOC_ROWS,
    },

    // Nav tiles — a 3-col grid of `.flow-endpoint` cause tiles, each with a
    // <br> line break and a trailing ' ›'. No typed block reproduces this
    // (endpoints renders a vertical stack and escapes <br>; choices renders
    // bolder .flow-node tiles), so this is an html escape hatch. FLAGGED: the
    // three goLesionTab links here are NOT validated by the link-integrity test.
    {
      kind: 'html',
      html: `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;width:100%;margin-top:10px;">
      <div class="flow-endpoint" style="background:rgba(16,185,129,0.1);border:1.5px solid rgba(16,185,129,0.4);color:var(--tone-green-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-PERIPH','Peripheral vestibular')">
        Peripheral<br>causes ›
      </div>
      <div class="flow-endpoint" style="background:rgba(220,38,38,0.1);border:1.5px solid rgba(220,38,38,0.4);color:var(--tone-danger-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-CENTRAL','Central vestibular')">
        Central<br>causes ›
      </div>
      <div class="flow-endpoint" style="background:rgba(245,158,11,0.08);border:1.5px solid rgba(245,158,11,0.4);color:var(--tone-warning-fg);font-size:9px;cursor:pointer;text-align:center;" onclick="goLesionTab('LOC-VE-BILAT','Bilateral vestibular')">
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
      // Only the pearls the table cannot hold: the nystagmus, CP-deficit and
      // paradoxical-tilt rules are rows in it, so repeating them here would give
      // the reader the same finding twice in two different formats.
      title: '💡 PEARLS',
      html: '• Horner\'s + CN VII palsy together = petrous temporal bone — peripheral, not central<br>• ~⅓ of clinically peripheral-appearing cases have a central lesion on MRI — low threshold for advanced imaging',
    },

    // Emergency banner (red/danger), no title.
    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      html: '<strong style="color:var(--tone-danger-title);">🚨 EMERGENCY signs → urgent MRI + stabilise:</strong> obtunded/stuporous · vertical or direction-changing nystagmus · CP deficits · multiple CN deficits · progressive deterioration',
    },

    { kind: 'disclaimer' },
  ],
}

export const vestibularFlows: FlowPage[] = [vestibularEntry]
