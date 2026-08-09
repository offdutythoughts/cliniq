// ── Polyuria / Polydipsia (PU/PD) flowchart (data) ──────────────────────────
// Sources: renderPUPDFlow / renderPUPDFlowPrimPD / renderPUPDFlowPrimPU /
// renderPUPDFlowSecPU — all inline render…() functions in cliniqApp.ts (no
// legacy const). The Dx views (renderDxPUPD*, renderDxPUPDDesmopressin) are a
// separate tranche and are NOT migrated here.
//
// Every split on these pages is now typed, so it is drawn with the shared
// connected fork connector: the entry's "true PU/PD?" question is a `fork` block
// (YES continues down the spine, NO exits to the pollakiuria flow), the three
// PU/PD classes are a comparison `table` (the acute-vestibular format) feeding
// three `choices` chips, and each sub-flow's causes are `categoryColumns` whose
// chips tap through to their disease pages. Only the pearls / desmopressin /
// safety reference boxes remain `html`.

import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

// ── 1. Entry ────────────────────────────────────────────────────────────────
const pupdEntry: FlowPage = {
  id: 'pupd',
  title: 'PU/PD',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💧 POLYURIA / POLYDIPSIA' },

    // Q1: Confirm PU/PD — a typed YES/NO fork. The YES leg is a `continue` leg:
    // its line runs the height of the fork and arrows into CLASSIFY, so the main
    // path stays unbroken; the NO leg ends on the pollakiuria flow (LUTD workup).
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS TRUE PU/PD?',
      subItems: [
        'Large-volume conscious voiding · nocturia · owner-witnessed increased drinking',
        'Pathological thresholds if measured: water >100 ml/kg/day (dog) or >50 ml/kg/day (cat)',
        'Urine >50 ml/kg/day in both species',
      ],
    },
    {
      kind: 'fork',
      legs: [
        { label: 'YES', sub: 'True PU/PD', continue: true },
        {
          label: 'NO',
          sub: 'Small frequent voids · dysuria · straining · passive leakage',
          blocks: [
            {
              kind: 'endpoints',
              items: [{ label: 'Pollakiuria', tone: 'slate', link: { to: 'flow', id: 'pollakiuria' } }],
            },
          ],
        },
      ],
    },

    // Q2: Classify PU/PD type
    {
      kind: 'node',
      variant: 'step',
      text: 'CLASSIFY — PRIMARY PD · PRIMARY PU · SECONDARY PU',
      subItems: [
        'Serial USG (3–5 samples) + plasma Na⁺ are the key tests',
        'Collect before IV fluids',
        'Check dipstick glucose — DM raises USG artificially',
      ],
    },

    // The three classes side by side as a comparison table (the acute-vestibular
    // peripheral/central/bilateral format): every data cell is coloured by its
    // column — Primary PD→green, Primary PU→indigo, Secondary PU→amber — and the
    // row-label column is plain text. `connectAfter` puts the fork connector
    // between the table and the three cause chips it explains.
    {
      kind: 'table',
      gap: 12,
      connectAfter: true,
      cols: '0.8fr 1.3fr 1.3fr 1.3fr',
      headers: [
        '',
        { text: 'PRIMARY PD', tone: 'green' },
        { text: 'PRIMARY PU', tone: 'indigo' },
        { text: 'SECONDARY PU', tone: 'warning' },
      ],
      rows: [
        [
          'Mechanism',
          { text: 'Brain drives drinking', tone: 'green' },
          { text: "Kidney can't concentrate", tone: 'indigo' },
          { text: 'Systemic disease → NDI', tone: 'warning' },
        ],
        [
          'USG',
          { text: '<strong>≥1 USG &gt;1.030</strong> documented', tone: 'green' },
          { text: 'Consistently <strong>dilute (&lt;1.030)</strong>', tone: 'indigo' },
          { text: 'Variable', tone: 'warning' },
        ],
        [
          'Plasma Na⁺',
          { text: '<strong>Low-normal</strong> (dilutional)', tone: 'green' },
          { text: '<strong>High-normal</strong> (free water loss)', tone: 'indigo' },
          { text: '—', tone: 'warning' },
        ],
        [
          'Systemic signs',
          { text: 'No systemic illness', tone: 'green' },
          { text: 'Often systemically well (CDI/NDI)', tone: 'indigo' },
          { text: 'Present + abnormal biochem', tone: 'warning' },
        ],
        [
          'Typical setting',
          { text: 'Young dog · anxious · hyperthyroid cat', tone: 'green' },
          { text: 'Osmotic diuresis (DM)', tone: 'indigo' },
          { text: 'HAC · Ca²⁺ · pyometra', tone: 'warning' },
        ],
      ],
      footnote: 'Secondary PU: treat the underlying disease → the PU/PD resolves.',
    },

    // The three classes as cause chips — one per table column, in the same order.
    {
      kind: 'choices',
      size: 10,
      items: [
        { tone: 'green', label: 'Primary PD', sublabel: 'Drinking is the primary event · systemically well · Na⁺ low-normal', link: { to: 'flow', id: 'pupd-prim-pd' } },
        { tone: 'indigo', label: 'Primary PU', sublabel: 'Urination is the primary event · thirst is compensatory · Na⁺ high-normal', link: { to: 'flow', id: 'pupd-prim-pu' } },
        { tone: 'warning', label: 'Secondary PU', sublabel: 'PU/PD alongside other systemic signs + abnormal biochemistry', link: { to: 'flow', id: 'pupd-sec-pu' } },
      ],
    },

    // Pearls
    {
      kind: 'infoBox',
      tone: 'indigo',
      icon: '🔬',
      title: 'CLINICAL PEARLS',
      html: `<strong style="color:var(--white);">Na⁺ high-normal</strong> → free water being lost → primary PU (kidney not retaining water)<br>
        <strong style="color:var(--white);">Na⁺ low-normal</strong> → excessive water intake diluting plasma → primary PD<br>
        <strong style="color:var(--white);">Absent stress leukogram</strong> in a sick dog → Addison's (cortisol abolishes stress response)<br>
        <strong style="color:var(--white);">↑ ALP + polyphagia + pot belly</strong> → HAC until proven otherwise (secondary PU via NDI)`,
    },

    // Safety
    {
      kind: 'infoBox',
      tone: 'danger',
      gap: 8,
      icon: '⚠️',
      title: 'SAFETY',
      html: 'NEVER restrict water · NEVER desmopressin if hyponatraemic (Na &lt;145) · Rule out HAC before desmopressin · Rectal exam mandatory (anal sac carcinoma → hypercalcaemia)',
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
    IDENTIFY_CAUSE_STEP,

    // Cause categories — typed `categoryColumns`, so the split gets the shared
    // fork connector and every cause chip taps through to its disease page (the
    // legacy hand-authored grid here was a dead end: no links at all).
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Anomalous',
          tiles: [{ label: 'Psychogenic / behavioural', link: { to: 'disease', id: 'DIS-PUPD-PRIM' } }],
        },
        {
          cat: 'Metabolic',
          tiles: [
            { label: 'Hepatic encephalopathy', link: { to: 'disease', id: 'DIS-HEP-HE' } },
            { label: 'Portosystemic shunt', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
          ],
        },
        {
          cat: 'Endocrine',
          tiles: [{ label: 'Hyperthyroidism (cat)', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } }],
        },
        {
          // No page for medullary washout — an intentional leaf, not a missing link.
          cat: 'Degenerative',
          tiles: [{ label: 'Medullary washout', terminal: true }],
        },
      ],
    },

    {
      kind: 'infoBox',
      tone: 'green',
      icon: '🔬',
      title: 'DIAGNOSTIC APPROACH — PRIMARY PD',
      html: `<strong style="color:var(--white);">All:</strong> CBC · biochemistry (low BUN suggests PSS) · urinalysis (dipstick glucose, sediment) · serial USG (3–5 samples) · plasma Na⁺ · BP<br>
        <strong style="color:var(--white);">Cat &gt;7 yr:</strong> T4 first — hyperthyroidism is most common cause in older cats<br>
        <strong style="color:var(--white);">Young dog + stunted:</strong> Pre/post-prandial bile acids · ammonia · abdominal US for PSS<br>
        <strong style="color:var(--white);">Psychogenic suspected:</strong> Document ≥1 USG &gt;1.030 · Na⁺ low-normal · all other causes excluded<br>
        <strong style="color:var(--white);">NEVER</strong> restrict water or perform WDT before full workup · NEVER desmopressin if hyponatraemic`,
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
    IDENTIFY_CAUSE_STEP,

    // Cause categories — typed `categoryColumns` (fork connector + working links).
    // The CDI chip now opens the Central DI disease page; the desmopressin trial
    // Dx view stays one tap away in the callout below.
    {
      kind: 'categoryColumns',
      columns: [
        {
          // Both causes here are endocrine — nothing metabolic to separate out.
          cat: 'Endocrine',
          tiles: [
            { label: 'Central DI (CDI)', link: { to: 'disease', id: 'DIS-PUPD-CDI' } },
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
          ],
        },
        {
          cat: 'Anomalous',
          tiles: [
            { label: 'Primary nephrogenic DI', link: { to: 'disease', id: 'DIS-PUPD-NDI' } },
            { label: 'Renal glucosuria / Fanconi', link: { to: 'disease', id: 'DIS-ENDO-RENGLUC' } },
          ],
        },
        {
          cat: 'Degenerative',
          tiles: [
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Acute kidney injury', link: { to: 'disease', id: 'DIS-SEC-AKI' } },
          ],
        },
      ],
    },

    {
      kind: 'infoBox',
      tone: 'indigo',
      icon: '💉',
      title: 'DESMOPRESSIN TRIAL — DISTINGUISHES CDI FROM NDI',
      html: `<strong style="color:var(--white);">Prerequisites:</strong> HAC excluded · pyometra excluded · Ca²⁺ normal · Na⁺ ≥145 · free water access always<br>
        <strong style="color:var(--white);">CDI response:</strong> USG increases to &gt;1.015 + water intake ↓ &gt;50% within 5–7 days<br>
        <strong style="color:var(--white);">NDI:</strong> No USG response to desmopressin<br>
        <strong style="color:var(--white);">Partial response:</strong> Partial CDI · or secondary NDI (review for missed underlying cause)
      <div style="margin-top:6px;font-size:9.5px;cursor:pointer;color:var(--tone-indigo-fg);text-decoration:underline;" onclick="renderDxId('pupd','desmopressin')">→ Full desmopressin trial protocol (diagnostics)</div>`,
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
      subItems: [
        'Concurrent systemic signs + abnormal biochemistry expected',
        'USG variable',
        'Treat the underlying disease → the PU/PD resolves',
      ],
    },
    IDENTIFY_CAUSE_STEP,

    // Cause categories — typed `categoryColumns` (fork connector + working links).
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Inflammatory',
          tiles: [
            { label: 'Pyometra ⚠️', link: { to: 'disease', id: 'DIS-REPRO-PYO' } },
            { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
            { label: 'Leptospirosis', link: { to: 'disease', id: 'DIS-INFECT-LEPTO' } },
          ],
        },
        // Metabolic and endocrine split into their own columns — the two are
        // worked up differently (electrolytes / hepatic function vs adrenal and
        // pituitary testing). `tone` overrides the palette because neither label
        // is one of the shared CAT_STYLE categories; teal keeps the metabolic
        // half its familiar colour.
        {
          cat: 'Metabolic',
          tiles: [
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
            { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
            { label: 'Portosystemic shunt', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
            { label: 'Hepatic failure', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
          ],
        },
        {
          cat: 'Endocrine',
          tiles: [
            { label: "HAC / Cushing's ⭐", link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
            { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Acromegaly (cat)', link: { to: 'disease', id: 'DIS-ENDO-ACRO' } },
          ],
        },
      ],
    },

    {
      kind: 'infoBox',
      tone: 'warning',
      icon: '🔬',
      title: 'DIAGNOSTIC APPROACH — SECONDARY PU',
      html: `<strong style="color:var(--white);">All cases:</strong> CBC · biochemistry (BUN · Cr · SDMA · ALP · ALT · Na · K · Ca²⁺ · glucose · albumin · cholesterol) · urinalysis + culture · BP<br>
        <strong style="color:var(--white);">Dog:</strong> UCCR (HAC screen — sensitive, run first) → LDDST or ACTH stim if elevated · rectal exam (anal sac)<br>
        <strong style="color:var(--white);">↑ Ca²⁺:</strong> Ionised Ca²⁺ + PTHrP + PTH → chest radiograph + lymph node palpation + abdominal US<br>
        <strong style="color:var(--white);">Intact ♀:</strong> Abdominal US (pyometra) before endocrine workup<br>
        <strong style="color:var(--white);">RULE OUT secondary causes</strong> before performing desmopressin trial — HAC and pyometra partially respond → false CDI`,
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
