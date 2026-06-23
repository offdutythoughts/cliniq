// ── Disorientation / Altered Mentation flowchart (data) ─────────────────────
// Clinical decision flow for disorientation, obtundation, head pressing,
// circling, stupor, and coma. Primary sources: Ettinger Ch 24 (altered
// mentation) + Ch 44 (stupor and coma).
//
// Block strategy:
//   - Severity grading          → compareBox (cols:3)
//   - Metabolic/Toxin/Drug grid → compareBox (cols:3)
//   - Localise pattern          → choices (3 items, sublabel)
//   - Classify aetiology        → choices (3 items, sublabel, linked)
//   - Metabolic key patterns    → compareBox (cols:2)
//   - Structural VITAMIN D      → categoryColumns (7 CAT_STYLE entries)
//   - Trailing action cards     → dxRow
//   - ICP emergency             → callout (danger)
//
// Lesion links:
//   LOC-EN-INFLAM  Encephalitis
//   LOC-EN-NEO     Intracranial neoplasia
//   LOC-EN-CVA     CVA / Stroke
//   LOC-EN-METAB   Metabolic encephalopathy

import type { FlowPage } from '../flowTypes'

export const encephalopathyFlows: FlowPage[] = [
  {
    id: 'encephalopathy',
    title: 'Disorientation',
    blocks: [
      { kind: 'node', variant: 'entry', text: '🧠 DISORIENTATION / ALTERED MENTATION' },

      // Severity grading — 3 pattern-nodes (choices handles 3-col on mobile)
      {
        kind: 'choices',
        cols: 3,
        size: 11,
        connectAfter: false,
        items: [
          {
            variant: 'mixed',
            label: 'Obtunded',
            sublabel: `Dull · slow responses<br>
Responds to stimuli<br>
Head pressing · circling<br>
Behaviour change`,
          },
          {
            variant: 'rest',
            label: '⚠️ Stupor',
            sublabel: `Rousable by noxious stimulus<br>
Lapses back when removed<br>
ARAS / cortex lesion<br>
mGCS &lt;15`,
          },
          {
            variant: 'insp',
            label: '🚨 Coma',
            sublabel: `Unrousable — even noxious<br>
No behavioural response<br>
Limb withdrawal = spinal<br>
reflex, NOT consciousness`,
          },
        ],
      },

      // Stabilise step
      { kind: 'node', variant: 'step', text: '⚡ STABILISE (ABC) — THEN RULE OUT METABOLIC & TOXIC' },

      // 2-col causes grid (cols:3 clips on mobile — merge toxins + drugs)
      {
        kind: 'compareBox',
        tone: 'neutral',
        cols: 2,
        gap: 8,
        cards: [
          {
            header: '🟢 Metabolic',
            html: `Hypoglycaemia (insulinoma, PSS, Addison's, toy breed)<br>
Hepatic encephalopathy (PSS)<br>
Uraemic encephalopathy (CKD/AKI)<br>
Hypocalcaemia (eclampsia, HypoPTH)<br>
Hypo/hypernatraemia · Hypo/hyperthermia<br>
Hypertensive encephalopathy<br>
Sepsis / shock · Hyperthyroidism (cats)`,
          },
          {
            header: '🔴 Toxic / Drug / Nutritional',
            html: `CNS depressants: opioids, BZDs, cannabinoids<br>
Opioid toxidrome: miosis + depression → <strong>naloxone</strong><br>
Ethylene glycol · Bromethalin · Metaldehyde<br>
Heavy metals (lead, mercury) · Organophosphates<br>
Ivermectin (MDR1 breeds) · Permethrin (cats)<br>
Anticholinergics: mydriasis + disorientation<br>
Thiamine deficiency (cats on fish/sulphite diet)<br>
Metronidazole toxicity (esp. cats)`,
          },
        ],
      },

      // Localise
      { kind: 'node', variant: 'step', text: 'LOCALISE — FOREBRAIN vs BRAINSTEM vs DIFFUSE' },
      {
        kind: 'choices',
        cols: 3,
        size: 11,
        connectAfter: false,
        items: [
          {
            variant: 'insp',
            label: 'Forebrain',
            sublabel: `Circling toward lesion<br>
Contralateral menace loss<br>
with normal PLR<br>
Cortical blindness<br>
Behaviour change · Seizures<br>
<strong style="color:var(--tone-info-fg);">→ Unilateral cortical lesion</strong>`,
          },
          {
            variant: 'rest',
            label: 'Brainstem',
            sublabel: `Multiple CN deficits<br>
Abnormal respiratory pattern<br>
Vestibular signs<br>
Severely depressed consciousness<br>
Abnormal pupils<br>
<strong style="color:var(--tone-danger-fg);">→ Needs ICU</strong>`,
          },
          {
            variant: 'mixed',
            label: 'Diffuse / Bilateral',
            sublabel: `Symmetric, no lateralisation<br>
Small reactive pupils<br>
Normal PLR bilateral<br>
Waxing-waning signs<br>
Post-prandial worsening<br>
<strong style="color:var(--tone-green-fg);">→ Metabolic first</strong>`,
          },
        ],
      },

      // Classify aetiology
      { kind: 'node', variant: 'step', text: 'CLASSIFY AETIOLOGY' },
      {
        kind: 'choices',
        cols: 3,
        size: 11,
        connectAfter: false,
        items: [
          {
            variant: 'mixed',
            label: 'Metabolic / Systemic',
            sublabel: `Diffuse signs<br>
Normal interictal exam<br>
Waxing-waning course<br>
Bloods abnormal<br>
<strong style="color:var(--tone-green-fg);">→ Bloods + bile acids</strong>`,
            link: { to: 'lesion', loc: 'LOC-EN-METAB', name: 'Metabolic encephalopathy' },
          },
          {
            variant: 'rest',
            label: 'Structural',
            sublabel: `Focal / lateralising signs<br>
Progressive course<br>
Abnormal neuro exam<br>
MRI ± CSF required<br>
<strong style="color:var(--amber-text);">VITAMIN D →</strong>`,
          },
          {
            variant: 'insp',
            label: 'Toxic / Drug',
            sublabel: `Exposure history<br>
Acute / peracute onset<br>
Species-specific agents<br>
Rapid reversal possible<br>
<strong style="color:var(--tone-info-fg);">→ Decontaminate + antidote</strong>`,
          },
        ],
      },

      // Metabolic key patterns callout
      {
        kind: 'callout',
        tone: 'green',
        gap: 8,
        connectAfter: false,
        title: '💡 Metabolic — Key Signalment Patterns',
        html: `<strong>Young + stunted + post-prandial signs:</strong> Congenital PSS / hepatic encephalopathy — ↓BUN, ↓albumin, ↓glucose, ammonium biurate crystals; note chemistry may be normal until 7–12yr.<br>
<strong>Middle-aged dog with HAC + pituitary macroadenoma:</strong> Early (&lt;1.5cm) → obtundation, disorientation, pacing; severe (&gt;1.5cm) → circling, tetraparesis, seizures.<br>
<strong>Electrolyte extremes:</strong> Na &gt;170 or &lt;120 mmol/L (or rapid change) → ataxia, disorientation, seizures — correct SLOWLY (max 0.5 mmol/L/h; overcorrection → central pontine myelinolysis).<br>
<strong>Geriatric dog or cat, gradual onset, no other signs:</strong> Cognitive dysfunction syndrome (CDS) — diagnosis of exclusion after normal MRI + bloods.`,
      },

      // Structural VITAMIN D — categoryColumns (CAT_STYLE labels)
      { kind: 'node', variant: 'step', text: 'STRUCTURAL — VITAMIN D' },
      {
        kind: 'categoryColumns',
        cols: 3,
        columns: [
          {
            cat: 'Vascular',
            tiles: [
              { label: 'CVA / stroke', link: { to: 'lesion', loc: 'LOC-EN-CVA', name: 'CVA' } },
              { label: 'Peracute, non-progressive' },
              { label: 'Cats: ischaemic infarct' },
            ],
          },
          {
            cat: 'Inflammatory',
            tiles: [
              { label: 'MUO / GME', link: { to: 'lesion', loc: 'LOC-EN-INFLAM', name: 'Encephalitis' } },
              { label: 'Infectious encephalitis', link: { to: 'lesion', loc: 'LOC-EN-INFLAM', name: 'Encephalitis' } },
              { label: 'Multifocal, progressive' },
            ],
          },
          {
            cat: 'Trauma',
            tiles: [
              { label: 'TBI / head trauma' },
              { label: 'RTA · falls · bite wounds' },
              { label: 'History of injury' },
            ],
          },
          {
            cat: 'Anomalous',
            tiles: [
              { label: 'Hydrocephalus' },
              { label: 'Lissencephaly' },
              { label: '<1yr, toy/brachy breeds' },
            ],
          },
          {
            cat: 'Metabolic',
            tiles: [
              { label: 'Storage diseases (NCL)', link: { to: 'lesion', loc: 'LOC-EN-METAB', name: 'Metabolic encephalopathy' } },
              { label: 'Lysosomal storage' },
              { label: 'Breed-specific' },
            ],
          },
          {
            cat: 'Degenerative',
            tiles: [
              { label: 'Cognitive dysfunction (CDS)' },
              { label: 'Neuronal degeneration' },
              { label: 'Idiopathic — MRI + bloods normal' },
            ],
          },
          {
            cat: 'Mass',
            tiles: [
              { label: 'Meningioma', link: { to: 'lesion', loc: 'LOC-EN-NEO', name: 'Intracranial neoplasia' } },
              { label: 'Glioma (brachycephalics)', link: { to: 'lesion', loc: 'LOC-EN-NEO', name: 'Intracranial neoplasia' } },
              { label: 'Pituitary macroadenoma' },
            ],
          },
        ],
      },

      // Trailing action cards
      {
        kind: 'dxRow',
        items: [
          { label: 'Diagnostic Approach', link: { to: 'dx', id: 'encephalopathy' }, accent: true },
          { label: 'Metabolic Encephalopathy', link: { to: 'lesion', loc: 'LOC-EN-METAB', name: 'Metabolic encephalopathy' } },
        ],
      },

      // ICP emergency callout
      {
        kind: 'callout',
        tone: 'danger',
        gap: 8,
        connectAfter: false,
        title: '⚠️ Elevated ICP — treat immediately',
        html: `Head pressing · obtundation · bilateral mydriasis · Cushing reflex (hypertension + bradycardia)<br>
<strong>Mannitol</strong> 0.25–0.5 g/kg IV over 15 min · Head elevation 30° · Avoid jugular compression<br>
<strong>Hypertonic saline</strong> 7.2% NaCl 2–4 mL/kg IV (alternative — do NOT use both)<br>
Do NOT use corticosteroids in traumatic brain injury`,
      },

      { kind: 'disclaimer' },
    ],
  },
]
