// ── Polyuria / Polydipsia (PU/PD) flowchart (data) ──────────────────────────
// Sources: renderPUPDFlow / renderPUPDFlowPrimPD / renderPUPDFlowPrimPU /
// renderPUPDFlowSecPU — all inline render…() functions in cliniqApp.ts (no
// legacy const). The Dx views (renderDxPUPD*, renderDxPUPDDesmopressin) are a
// separate tranche and are NOT migrated here.
//
// The entry uses two bespoke grids that have no typed-block equivalent: a 3fr/2fr
// "true PU/PD?" YES/NO grid and a 3-column classification grid whose columns are
// multi-line tinted info boxes (not header+body branches or pattern-choices),
// each feeding a clickable sub-flow endpoint. The 3 sub-flows use a per-column
// "category → ↓ → chips" stack (legacy `col()` helper) that differs from
// `categoryGrid`'s header-row→arrow-row→tile-row layout. To keep BYTE-IDENTICAL
// markup these bespoke parts are authored as `html` blocks (FLAGGED below);
// clean entry/step headers use typed `node` blocks. Sub-flow cross-links use
// typed `{to:'flow'}` Links. The CDI/desmopressin onclicks point at the Dx view
// renderDxId('pupd','desmopressin') and are preserved inline in html (Dx tranche).

import type { FlowPage } from '../flowTypes'

// ── 1. Entry ────────────────────────────────────────────────────────────────
const pupdEntry: FlowPage = {
  id: 'pupd',
  title: 'PU/PD',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💧 POLYURIA / POLYDIPSIA' },

    // Q1: Confirm PU/PD — bespoke 3fr/2fr YES/NO grid (no typed equivalent).
    // html breaks the renderer's auto-arrow spine, so the legacy `↓` connectors
    // that bracket this grid (entry→grid and grid→step) are inlined here.
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:8px;width:100%;">
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node step" style="width:100%;">IS THIS TRUE PU/PD?
          <div class="fn-sub">Large-volume conscious voiding · nocturia · owner-witnessed increased drinking</div>
        </div>
        <div style="font-size:10px;color:var(--gray);padding-left:4px;">YES ↓</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div style="font-size:9.5px;color:var(--gray);text-align:center;padding-top:8px;">NO →</div>
        <div class="flow-endpoint" style="background:rgba(100,116,139,0.12);border:1.5px solid rgba(100,116,139,0.35);color:var(--tone-slate-fg);font-size:9.5px;text-align:center;">
          <strong>Pollakiuria / Incontinence</strong><br>
          <span style="opacity:.8;">Small frequent voids · dysuria · straining · passive leakage → LUTD workup</span>
        </div>
      </div>
    </div>
    <div class="flow-arrow-v">↓</div>`,
    },

    // Q2: Classify PU/PD type
    {
      kind: 'node',
      variant: 'step',
      text: 'CLASSIFY — PRIMARY PD · PRIMARY PU · SECONDARY PU',
      sub: 'Serial USG (3–5 samples) + plasma Na⁺ are the key tests · collect before IV fluids · check dipstick glucose (DM raises USG artificially)',
    },

    // 3-column classification grid (bespoke tinted info boxes + arrow + endpoint).
    // Leading `↓` reproduces the legacy step→grid connector (html breaks the spine).
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;width:100%;">

      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="flex:1;background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.35);font-size:9.5px;text-align:center;">
          <div style="font-weight:700;color:var(--tone-green-fg);margin-bottom:4px;">PRIMARY PD<br><span style="font-size:8.5px;font-weight:400;opacity:.8;">Brain drives drinking</span></div>
          <div style="text-align:left;color:var(--gray);line-height:1.6;">
            • ≥1 USG &gt;1.030<br>
            &nbsp;&nbsp;documented<br>
            • Na⁺ low-normal<br>
            &nbsp;&nbsp;(dilutional)<br>
            • No systemic illness<br>
            • Young dog · anxious<br>
            • Hyperthyroid cat
          </div>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint" style="background:rgba(16,185,129,0.15);border:1.5px solid rgba(16,185,129,0.4);color:var(--tone-green-fg);font-size:9.5px;text-align:center;cursor:pointer;" onclick="renderFlowId('pupd-prim-pd')">Primary PD →<br><span style="font-size:8.5px;opacity:.8;">Psychogenic · hyperthyroid · HE</span></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="flex:1;background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.35);color:var(--fg-indigo-deep);font-size:9.5px;text-align:center;">
          <div style="font-weight:700;color:var(--tone-indigo-fg);margin-bottom:4px;">PRIMARY PU<br><span style="font-size:8.5px;font-weight:400;opacity:.8;">Kidney can't concentrate</span></div>
          <div style="text-align:left;color:var(--gray);line-height:1.6;">
            • USG consistently<br>
            &nbsp;&nbsp;dilute (&lt;1.030)<br>
            • Na⁺ high-normal<br>
            &nbsp;&nbsp;(free water loss)<br>
            • Often systemically<br>
            &nbsp;&nbsp;well (CDI/NDI)<br>
            • Osmotic diuresis (DM)
          </div>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint" style="background:rgba(99,102,241,0.15);border:1.5px solid rgba(99,102,241,0.4);color:var(--tone-indigo-fg);font-size:9.5px;text-align:center;cursor:pointer;" onclick="renderFlowId('pupd-prim-pu')">Primary PU →<br><span style="font-size:8.5px;opacity:.8;">CDI · NDI · DM · CKD</span></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:5px;">
        <div class="flow-node" style="flex:1;background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.4);font-size:9.5px;text-align:center;">
          <div style="font-weight:700;color:var(--tone-warning-fg);margin-bottom:4px;">SECONDARY PU<br><span style="font-size:8.5px;font-weight:400;opacity:.8;">Systemic disease → NDI</span></div>
          <div style="text-align:left;color:var(--gray);line-height:1.6;">
            • Systemic signs<br>
            &nbsp;&nbsp;present<br>
            • Abnormal biochem<br>
            • USG variable<br>
            • Treat cause →<br>
            &nbsp;&nbsp;PU/PD resolves<br>
            • HAC · Ca²⁺ · pyometra
          </div>
        </div>
        <div class="flow-arrow-v">↓</div>
        <div class="flow-endpoint" style="background:rgba(245,158,11,0.12);border:1.5px solid rgba(245,158,11,0.4);color:var(--tone-warning-fg);font-size:9.5px;text-align:center;cursor:pointer;" onclick="renderFlowId('pupd-sec-pu')">Secondary PU →<br><span style="font-size:8.5px;opacity:.8;">HAC · hypercalcaemia · more</span></div>
      </div>

    </div>`,
    },

    // Pearls
    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:9px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-indigo-fg);margin-bottom:4px;">🔬 CLINICAL PEARLS</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">Na⁺ high-normal</strong> → free water being lost → primary PU (kidney not retaining water)<br>
        <strong style="color:var(--white);">Na⁺ low-normal</strong> → excessive water intake diluting plasma → primary PD<br>
        <strong style="color:var(--white);">Absent stress leukogram</strong> in a sick dog → Addison's (cortisol abolishes stress response)<br>
        <strong style="color:var(--white);">↑ ALP + polyphagia + pot belly</strong> → HAC until proven otherwise (secondary PU via NDI)
      </div>
    </div>`,
    },

    // Safety
    {
      kind: 'html',
      html: `<div style="margin-top:8px;padding:9px 12px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.2);border-radius:10px;font-size:9.5px;width:100%;">
      <span style="color:var(--tone-danger-title);font-weight:700;">⚠️ SAFETY: </span>
      <span style="color:var(--tone-danger-fg);">NEVER restrict water · NEVER desmopressin if hyponatraemic (Na &lt;145) · Rule out HAC before desmopressin · Rectal exam mandatory (anal sac carcinoma → hypercalcaemia)</span>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── 2. Primary Polydipsia (PD) — Causes ─────────────────────────────────────
const pupdPrimPD: FlowPage = {
  id: 'pupd-prim-pd',
  title: 'PU/PD — Primary Polydipsia',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'green', text: '💧 PRIMARY POLYDIPSIA (PD) — CAUSES' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Brain drives excessive drinking → urine is secondarily dilute',
      sub: '≥1 USG >1.030 documented · Na⁺ low-normal (dilutional) · diagnose only after excluding all other causes',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },

    // Category grid (legacy `col()` per-column stacks → bespoke html).
    // Leading `↓` reproduces the legacy step→grid connector (html breaks the spine).
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--hl-pink);text-align:center;line-height:1.3;">Anomalous</div><div style="color:var(--hl-pink);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-pink);text-align:center;line-height:1.35;">Psychogenic / behavioural</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-teal-fg);text-align:center;line-height:1.3;">Metabolic / Endocrine</div><div style="color:var(--tone-teal-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Hyperthyroidism (cat)</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Hepatic encephalopathy / PSS</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(100,116,139,0.15);border:1.5px solid rgba(100,116,139,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:#94A3B8;text-align:center;line-height:1.3;">Degenerative</div><div style="color:#94A3B8;text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(100,116,139,0.15);border:1.5px solid rgba(100,116,139,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:#94A3B8;text-align:center;line-height:1.35;">Medullary washout</div></div>
    </div>`,
    },

    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:9px 12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-green-fg);margin-bottom:4px;">🔬 DIAGNOSTIC APPROACH — Primary PD</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">All:</strong> CBC · biochemistry (low BUN suggests PSS) · urinalysis (dipstick glucose, sediment) · serial USG (3–5 samples) · plasma Na⁺ · BP<br>
        <strong style="color:var(--white);">Cat &gt;7 yr:</strong> T4 first — hyperthyroidism is most common cause in older cats<br>
        <strong style="color:var(--white);">Young dog + stunted:</strong> Pre/post-prandial bile acids · ammonia · abdominal US for PSS<br>
        <strong style="color:var(--white);">Psychogenic suspected:</strong> Document ≥1 USG &gt;1.030 · Na⁺ low-normal · all other causes excluded<br>
        <strong style="color:var(--white);">NEVER</strong> restrict water or perform WDT before full workup · NEVER desmopressin if hyponatraemic
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── 3. Primary Polyuria (PU) — Causes ───────────────────────────────────────
const pupdPrimPU: FlowPage = {
  id: 'pupd-prim-pu',
  title: 'PU/PD — Primary Polyuria',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'indigo', text: '💧 PRIMARY POLYURIA (PU) — CAUSES' },
    {
      kind: 'node',
      variant: 'step',
      text: 'Kidney produces excess urine → drinking compensates',
      sub: 'USG consistently dilute (<1.030) · Na⁺ high-normal (free water loss drives thirst)',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },

    // Category grid (legacy `col()` per-column stacks → bespoke html; CDI chip
    // links to the desmopressin Dx view, preserved inline — Dx tranche).
    // Leading `↓` reproduces the legacy step→grid connector (html breaks the spine).
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-teal-fg);text-align:center;line-height:1.3;">Metabolic / Endocrine</div><div style="color:var(--tone-teal-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;cursor:pointer;" onclick="renderDxId('pupd','desmopressin')">Central DI (CDI)</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Diabetes mellitus</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--hl-pink);text-align:center;line-height:1.3;">Anomalous</div><div style="color:var(--hl-pink);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-pink);text-align:center;line-height:1.35;">Primary nephrogenic DI</div><div style="background:rgba(236,72,153,0.15);border:1.5px solid rgba(236,72,153,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--hl-pink);text-align:center;line-height:1.35;">Renal glucosuria / Fanconi</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(100,116,139,0.15);border:1.5px solid rgba(100,116,139,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:#94A3B8;text-align:center;line-height:1.3;">Degenerative</div><div style="color:#94A3B8;text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(100,116,139,0.15);border:1.5px solid rgba(100,116,139,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:#94A3B8;text-align:center;line-height:1.35;">CKD / AKI</div></div>
    </div>`,
    },

    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:9px 12px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.25);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-indigo-fg);margin-bottom:5px;">💉 DESMOPRESSIN TRIAL — distinguishes CDI from NDI</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">Prerequisites:</strong> HAC excluded · pyometra excluded · Ca²⁺ normal · Na⁺ ≥145 · free water access always<br>
        <strong style="color:var(--white);">CDI response:</strong> USG increases to &gt;1.015 + water intake ↓ &gt;50% within 5–7 days<br>
        <strong style="color:var(--white);">NDI:</strong> No USG response to desmopressin<br>
        <strong style="color:var(--white);">Partial response:</strong> Partial CDI · or secondary NDI (review for missed underlying cause)
      </div>
      <div style="margin-top:6px;font-size:9.5px;cursor:pointer;color:var(--tone-indigo-fg);text-decoration:underline;" onclick="renderDxId('pupd','desmopressin')">→ Full desmopressin trial protocol (diagnostics)</div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── 4. Secondary Polyuria (PU) — Causes ─────────────────────────────────────
const pupdSecPU: FlowPage = {
  id: 'pupd-sec-pu',
  title: 'PU/PD — Secondary Polyuria',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: '💧 SECONDARY POLYURIA (PU) — CAUSES' },
    {
      kind: 'node',
      variant: 'step',
      text: 'KEY: Systemic disease → secondary NDI or osmotic mechanism',
      sub: 'Concurrent systemic signs + abnormal biochemistry expected · USG variable · treat underlying disease → PU/PD resolves',
    },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },

    // 2-column category grid (legacy `col()` per-column stacks → bespoke html).
    // Leading `↓` reproduces the legacy step→grid connector (html breaks the spine).
    {
      kind: 'html',
      connectAfter: false,
      html: `<div class="flow-arrow-v">↓</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;width:100%;">
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-warning-fg);text-align:center;line-height:1.3;">Inflammatory</div><div style="color:var(--tone-warning-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-warning-fg);text-align:center;line-height:1.35;">Pyometra ⚠️</div><div style="background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-warning-fg);text-align:center;line-height:1.35;">Pyelonephritis / Leptospirosis</div></div>
      <div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:var(--tone-teal-fg);text-align:center;line-height:1.3;">Metabolic / Endocrine</div><div style="color:var(--tone-teal-fg);text-align:center;font-size:11px;line-height:1;">↓</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">HAC / Cushing's ⭐</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Hypercalcaemia</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Hypoadrenocorticism</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Hypokalemia</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">PSS / liver failure</div><div style="background:rgba(20,184,166,0.15);border:1.5px solid rgba(20,184,166,0.4);border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:var(--tone-teal-fg);text-align:center;line-height:1.35;">Acromegaly (cat)</div></div>
    </div>`,
    },

    {
      kind: 'html',
      html: `<div style="margin-top:10px;padding:9px 12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);border-radius:10px;width:100%;">
      <div style="font-size:10px;font-weight:700;color:var(--tone-warning-fg);margin-bottom:4px;">🔬 DIAGNOSTIC APPROACH — Secondary PU</div>
      <div style="font-size:9.5px;line-height:1.65;color:var(--gray);">
        <strong style="color:var(--white);">All cases:</strong> CBC · biochemistry (BUN · Cr · SDMA · ALP · ALT · Na · K · Ca²⁺ · glucose · albumin · cholesterol) · urinalysis + culture · BP<br>
        <strong style="color:var(--white);">Dog:</strong> UCCR (HAC screen — sensitive, run first) → LDDST or ACTH stim if elevated · rectal exam (anal sac)<br>
        <strong style="color:var(--white);">↑ Ca²⁺:</strong> Ionised Ca²⁺ + PTHrP + PTH → chest radiograph + lymph node palpation + abdominal US<br>
        <strong style="color:var(--white);">Intact ♀:</strong> Abdominal US (pyometra) before endocrine workup<br>
        <strong style="color:var(--white);">RULE OUT secondary causes</strong> before performing desmopressin trial — HAC and pyometra partially respond → false CDI
      </div>
    </div>`,
    },

    { kind: 'disclaimer' },
  ],
}

export const pupdFlows: FlowPage[] = [
  pupdEntry,
  pupdPrimPD,
  pupdPrimPU,
  pupdSecPU,
]
