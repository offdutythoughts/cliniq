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
        { tone: 'green', label: 'Primary PD', link: { to: 'flow', id: 'pupd-prim-pd' } },
        { tone: 'indigo', label: 'Primary PU', link: { to: 'flow', id: 'pupd-prim-pu' } },
        { tone: 'warning', label: 'Secondary PU', link: { to: 'flow', id: 'pupd-sec-pu' } },
      ],
    },

    // Pearls
    {
      kind: 'infoBox',
      tone: 'indigo',
      icon: '🔬',
      // The two Na⁺ pearls are a row of the comparison table above, so they are
      // not repeated here; what is left are the two patterns the table cannot
      // hold — findings on a CBC/biochem that name a disease.
      title: 'CLINICAL PEARLS',
      html: `<strong style="color:var(--white);">Absent stress leukogram</strong> in a sick dog → Addison's — cortisol abolishes the stress response<br>
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
      // A test list keyed by the patient in front of you — read by finding your
      // row, not by reading five sentences.
      kind: 'table',
      boxTone: 'green',
      dividers: true,
      title: '🔬 DIAGNOSTIC APPROACH — PRIMARY PD',
      cols: '30% 1fr',
      headers: ['Patient', 'Run'],
      rows: [
        ['Every case', 'CBC · biochemistry (low BUN suggests PSS) · urinalysis (dipstick glucose, sediment) · serial USG ×3–5 · plasma Na⁺ · BP'],
        ['Cat >7 yr', 'T4 FIRST — hyperthyroidism is the commonest cause in an older cat'],
        ['Young dog, stunted', 'Pre/post-prandial bile acids · ammonia · abdominal US for a PSS'],
        ['Psychogenic suspected', 'Document ≥1 USG >1.030 · Na⁺ low-normal · every other cause excluded'],
      ],
      footnote: '<strong>NEVER</strong> restrict water or run a water-deprivation test before the work-up is complete, and <strong>never</strong> give desmopressin to a hyponatraemic patient.',
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
      // The trial is read by matching the response you got against a row; the
      // prerequisites are a pre-flight check, so they sit under it as a footnote.
      kind: 'table',
      boxTone: 'indigo',
      dividers: true,
      title: '💉 DESMOPRESSIN TRIAL — CDI vs NDI',
      cols: '46% 1fr',
      headers: ['Response over 5–7 days', 'Interpretation'],
      rows: [
        [{ text: 'USG rises >1.015 + water intake ↓ >50%', tone: 'green' }, 'Central DI (CDI)'],
        [{ text: 'No USG response at all', tone: 'warning' }, 'Nephrogenic DI (NDI)'],
        [{ text: 'Partial response', tone: 'slate' }, 'Partial CDI — or secondary NDI; go back and look for a missed underlying cause'],
      ],
      footnote: '<strong>Before you start:</strong> HAC excluded · pyometra excluded · Ca²⁺ normal · Na⁺ ≥145 · free water available throughout.<div style="margin-top:6px;font-size:9.5px;cursor:pointer;color:var(--tone-indigo-fg);text-decoration:underline;" onclick="renderDxId(\'pupd\',\'desmopressin\')">→ Full desmopressin trial protocol (diagnostics)</div>',
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
      kind: 'table',
      boxTone: 'warning',
      dividers: true,
      title: '🔬 DIAGNOSTIC APPROACH — SECONDARY PU',
      cols: '26% 1fr',
      headers: ['Patient / finding', 'Run'],
      rows: [
        ['Every case', 'CBC · biochemistry (BUN · Cr · SDMA · ALP · ALT · Na · K · Ca²⁺ · glucose · albumin · cholesterol) · urinalysis + culture · BP'],
        ['Dog', 'UCCR first (sensitive HAC screen) → LDDST or ACTH stim if raised · rectal exam for an anal sac mass'],
        ['↑ Ca²⁺', 'Ionised Ca²⁺ + PTHrP + PTH → chest radiographs + lymph node palpation + abdominal US'],
        ['Intact ♀', 'Abdominal US for pyometra BEFORE any endocrine work-up'],
      ],
      footnote: 'Exclude every secondary cause before a desmopressin trial — HAC and pyometra partially respond and read as a false CDI.',
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
