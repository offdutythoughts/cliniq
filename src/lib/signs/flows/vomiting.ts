// ── Vomiting flowchart (data) ───────────────────────────────────────────────
// Source: the legacy "Vomiting" entry screen. It has no separate content
// sub-flows: the two regurgitation endpoints go straight to the lesion tabs via
// goLesionTab('LOC-OESOPH' / 'LOC-OESOPH-EXT', …) — they were one-line redirects
// in the legacy, now inlined as direct goLesionTab calls.
//
// The entry's middle section is a bespoke asymmetric 2-column branch (3fr 2fr)
// with nested YES/NO sub-grids and the .flow-endpoint.gi-upper / .gi-primary /
// .gi-secondary / .oesoph CSS colour classes. No typed block reproduces that
// asymmetric grid or those CSS classes, so it is an `html` block (same approach
// as abnormalPupilNeuro). The lesion links live inside that html via the legacy
// goLesionTab / renderOesophFlow / renderExtraOesophFlow onclicks (kept verbatim
// — still exposed on window) and so are NOT validated by the link-integrity
// test. The entry/step nodes and the trailing exception strip are typed.

import type { FlowPage } from '../flowTypes'

const vomitingEntry: FlowPage = {
  id: 'vomiting',
  title: 'Vomiting',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🤢 VOMITING' },
    {
      kind: 'node',
      variant: 'step',
      text: 'DIFFERENTIATE: TRUE VOMIT vs REGURGITATION',
      sub: 'Active effort + nausea vs passive no effort',
    },
    {
      kind: 'html',
      html: `<div class="flow-arrow-v">↓</div>
    <!-- Two main branches -->
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;width:100%;">

      <!-- True vomiting -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node insp" style="width:100%;font-size:11px;">TRUE VOMITING<br><span style="font-size:9px;opacity:.7">active abdominal effort, nausea, retching</span></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">IS VOMITING RELATED TO EATING?</div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <!-- Related to eating -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="font-size:9px;color:#A7F3D0;text-align:center;">YES — related to eating</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-endpoint gi-upper" onclick="goLesionTab('LOC-GI-UPPER','Stomach')">
              Stomach
            </div>
          </div>
          <!-- Unrelated -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="font-size:9px;color:var(--gray2);text-align:center;">NOT related to eating</div>
            <div class="flow-arrow-v">↓</div>
            <div class="flow-node sub-step" style="font-size:9px;">Other systemic signs?<br>PU/PD, jaundice, malaise</div>
            <div class="flow-arrow-v">↓</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;width:100%;">
              <div>
                <div style="font-size:8px;color:#99F6E4;text-align:center;margin-bottom:2px;">NO — bright alert</div>
                <div class="flow-endpoint gi-primary" onclick="goLesionTab('LOC-GI-PRIMARY','Primary GI')">
                  Primary GI
                </div>
              </div>
              <div>
                <div style="font-size:8px;color:var(--amber-text);text-align:center;margin-bottom:2px;">YES — systemic ill</div>
                <div class="flow-endpoint gi-secondary" onclick="goLesionTab('LOC-GI-SECONDARY','Secondary / Extra-GI')">
                  Secondary / Extra-GI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Regurgitation -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
        <div class="flow-node" style="width:100%;background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.3);color:#C7D2FE;font-size:11px;">REGURGITATION<br><span style="font-size:9px;opacity:.7">passive, no effort, no bile</span></div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-node sub-step" style="width:100%;font-size:10px;">Intrinsic vs extrinsic cause?</div>
        <div class="flow-arrow-v">↓</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;width:100%;">
          <div class="flow-endpoint oesoph" onclick="goLesionTab('LOC-OESOPH','Oesophageal Disease')" style="font-size:10px;">
            Oesophagus
          </div>
          <div class="flow-endpoint" style="background:rgba(217,119,6,0.12);border:1.5px solid rgba(217,119,6,0.4);color:var(--amber-text);font-size:10px;cursor:pointer;" onclick="goLesionTab('LOC-OESOPH-EXT','Extra-Oesophageal Disease')">
            Extra-Oesophageal
          </div>
        </div>
      </div>
    </div>`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      gap: 12,
      html: '⚠️ Exception rules: Dog pancreatitis behaves like PRIMARY GI. Cat pancreatitis behaves like SECONDARY GI. Feline hyperthyroidism = prolonged intermittent vomiting in apparently well cat.',
    },
  ],
}

export const vomitingFlows: FlowPage[] = [vomitingEntry]
