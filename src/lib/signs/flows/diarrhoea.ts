// ── Diarrhoea flowchart (data) ──────────────────────────────────────────────
// Migration of renderDiarrhoeaFlow (inline in src/lib/cliniqApp.ts) to the
// FlowPage model. Self-contained: one entry page, no sub-flows (the only
// onclicks are goLesionTab lesion links). The Dx views (diarrhoea*Html /
// renderDxDiarrhoea*) are OUT of scope.
//
// The two-column ACUTE/CHRONIC branch and the bottom SB-vs-LB comparison box are
// bespoke layouts that the current typed blocks cannot reproduce byte-for-byte:
//   • the column headers use the `.flow-node.insp` / `.flow-node.exp` pattern
//     variant classes with a `.fn-sub` subtitle and inline font-size:11px — the
//     `branch` block instead colours its headers by `tone` (no insp/exp class),
//     renders a smaller (10px) header and esc()'s the text;
//   • the column bodies hold custom nested YES/NO grids with coloured caption
//     divs and `.flow-endpoint` cards in the anat colour classes pleural /
//     gi-upper / gi-primary / gi-secondary — the `endpoints` block only renders
//     a tone-coloured vertical stack;
//   • the comparison box is the same neutral 2-col compare layout the skill
//     already keeps as `html` (Red Eye coats discriminator).
// So the spine (entry + STEP 1) is typed `node` blocks and the bespoke branch +
// comparison box are escape-hatch `html` transcribed verbatim from the legacy.
//
// ⚠️ FLAG: the goLesionTab onclicks below live inside `html` blocks, so their
// lesion locs (LOC-DI-SI, LOC-DI-LB, LOC-DI-SI-SEC) are NOT validated by the
// link-integrity test. A future typed "branch with insp/exp headers + anat
// endpoints" block (or an extension to `branch`/`endpoints`) would let these
// become validated `{ to:'lesion', … }` links.

import { forkHtml, type FlowPage } from '../flowTypes'

export const diarrhoeaFlow: FlowPage = {
  id: 'diarrhoea',
  title: 'Diarrhoea',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💩 DIARRHOEA' },

    {
      kind: 'node',
      variant: 'step',
      text: 'STEP 1 — CLASSIFY THE DIARRHOEA',
      sub: 'Acute or chronic? Mild or severe? Primary or secondary GI?',
    },

    {
      // Bespoke two-column ACUTE/CHRONIC branch (insp/exp headers, nested YES/NO
      // grids, anat-class endpoints). Transcribed verbatim from the legacy.
      kind: 'html',
      connectAfter: false,
      // `html` is not a spine block, so the renderer draws no arrow before it —
      // the STEP 1 → branch connector is included here to match the legacy.
      html: `${forkHtml(2, 8)}
    <!-- Acute vs Chronic -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node insp" style="width:100%;font-size:11px;">ACUTE diarrhoea<div class="fn-sub" style="font-size:9px;opacity:.7">< 2 weeks</div></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Severe / haemorrhagic?</div>
        ${forkHtml(2, 4)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <div>
            <div style="font-size:9px;color:var(--tone-danger-fg);text-align:center;margin-bottom:2px;">YES — severe</div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div class="flow-endpoint pleural" onclick="renderDiseasePage('DIS-GI-PARVO')" style="font-size:9px;">
                Parvovirus
              </div>
              <div class="flow-endpoint pleural" onclick="renderDiseasePage('DIS-GI-AHDS')" style="font-size:9px;">
                HGE / AHDS
              </div>
              <div class="flow-endpoint pleural" onclick="renderDiseasePage('DIS-GI-FPV')" style="font-size:9px;">
                FPV (kitten) 🐱
              </div>
            </div>
          </div>
          <div>
            <div style="font-size:9px;color:var(--tone-green-fg);text-align:center;margin-bottom:2px;">NO — mild</div>
            <div class="flow-node sub-step" style="font-size:9px;padding:6px 8px;">Fast 24h + bland diet ± fenbendazole. Most resolve.</div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node exp" style="width:100%;font-size:11px;">CHRONIC diarrhoea<div class="fn-sub" style="font-size:9px;opacity:.7">> 2-3 weeks</div></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">STEP 2 — LOCALISE: Small bowel or large bowel?</div>
        ${forkHtml(2, 4)}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div class="flow-endpoint gi-upper" onclick="goLesionTab('LOC-DI-SI','Small intestine')" style="font-size:10px;">
              Small bowel
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div class="flow-endpoint gi-primary" onclick="goLesionTab('LOC-DI-LB','Large intestine / colon')" style="font-size:10px;">
              Large bowel
            </div>
          </div>
        </div>
        <div style="margin-top:4px;" onclick="goLesionTab('LOC-DI-SI-SEC','Small intestine — Secondary')">
          <div class="flow-endpoint gi-secondary" style="font-size:10px;margin:0;">Secondary / Systemic →</div>
        </div>
      </div>
    </div>`,
    },

    {
      // SB vs LB comparison — neutral 2-col compare box (same layout the skill
      // keeps as html for the Red Eye coats discriminator).
      kind: 'html',
      html: `<!-- SB vs LB comparison -->
    <div style="margin-top:12px;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:12px;padding:10px 12px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--white);margin-bottom:6px;">SMALL vs LARGE BOWEL — Key differentiators</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:10px;">
        <div>
          <div style="color:var(--tone-green-fg);font-weight:600;margin-bottom:3px;">Small bowel</div>
          <div style="color:var(--gray);line-height:1.6;">Large volume stool<br>Low frequency (3-5x/day)<br>Weight loss if chronic<br>Melaena if blood<br>Vomiting ± present<br>Borborygmus / flatulence</div>
        </div>
        <div>
          <div style="color:var(--fg-teal-deep);font-weight:600;margin-bottom:3px;">Large bowel</div>
          <div style="color:var(--gray);line-height:1.6;">Small volume frequent (>5x)<br>Tenesmus / urgency<br>Usually no weight loss<br>Fresh blood (haematochezia)<br>Mucus present<br>Appetite usually normal</div>
        </div>
      </div>
    </div>`,
    },
  ],
}
