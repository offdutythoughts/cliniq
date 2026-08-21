// ── Disorientation / Altered Mentation flowchart (data) ─────────────────────
// Primary sources: Ettinger Ch 24 (altered mentation) + Ch 44 (stupor and coma).
//
// Pages:
//   encephalopathy          Main page — severity table → ICP → localise table → 3 nav tiles
//   encephalopathy-forebrain   Forebrain causes by category
//   encephalopathy-brainstem   Brainstem causes by category
//   encephalopathy-diffuse     Diffuse / bilateral causes by category
//
// Lesion links:
//   LOC-EN-INFLAM  Encephalitis
//   LOC-EN-NEO     Intracranial neoplasia
//   LOC-EN-CVA     CVA / Stroke
//   LOC-EN-METAB   Metabolic encephalopathy

import type { FlowPage } from '../flowTypes'

// ── Main page ────────────────────────────────────────────────────────────────
const encephalopathyMain: FlowPage = {
  id: 'encephalopathy',
  title: 'Disorientation',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🧠 DISORIENTATION / ALTERED MENTATION' },

    // Severity comparison table
    {
      kind: 'table',
      gap: 12,
      cols: '1.1fr 1.2fr 1.2fr 1.2fr',
      headers: [
        '',
        'Obtunded',
        { text: '⚠️ Stupor', tone: 'warning' },
        { text: '🚨 Coma', tone: 'danger' },
      ],
      rows: [
        [
          'Consciousness',
          { text: 'Depressed but present', tone: 'green' },
          { text: 'Severely depressed', tone: 'warning' },
          { text: 'Absent', tone: 'danger' },
        ],
        [
          'Response to stimuli',
          { text: 'Responds to mild stimuli', tone: 'green' },
          { text: 'Only noxious stimuli', tone: 'warning' },
          { text: 'No response', tone: 'danger' },
        ],
        [
          'Spontaneous signs',
          { text: 'Head pressing · circling<br>· behaviour change', tone: 'green' },
          { text: 'Minimal — lapses back<br>when removed', tone: 'warning' },
          { text: 'None · limb withdrawal<br>= spinal reflex', tone: 'danger' },
        ],
        [
          'Action',
          'Investigate urgently',
          { text: 'Stabilise (ABC) first', tone: 'warning' },
          { text: 'Stabilise (ABC) first', tone: 'danger' },
        ],
      ],
    },

    // ICP callout
    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      connectAfter: false,
      title: '⚠️ Suspect elevated ICP if:',
      html: `Head pressing · rapidly worsening obtundation or stupor<br>
Bilateral fixed dilated pupils (mydriasis)<br>
Cushing reflex: systemic hypertension + bradycardia<br>
Progressive deterioration despite initial treatment`,
    },

    // Localisation table
    { kind: 'node', variant: 'step', text: 'LOCALISE — FOREBRAIN vs BRAINSTEM vs DIFFUSE' },
    {
      kind: 'table',
      gap: 12,
      cols: '1.1fr 1.2fr 1.2fr 1.2fr',
      headers: [
        '',
        { text: 'Forebrain', tone: 'info' },
        { text: 'Brainstem', tone: 'warning' },
        { text: 'Diffuse / Bilateral', tone: 'teal' },
      ],
      rows: [
        [
          'Mentation',
          { text: 'Obtunded · behaviour change', tone: 'info' },
          { text: 'Often severely depressed', tone: 'warning' },
          { text: 'Waxing-waning · variable', tone: 'teal' },
        ],
        [
          'Lateralisation',
          { text: 'Asymmetric — toward lesion', tone: 'info' },
          { text: 'Asymmetric ± paradoxical', tone: 'warning' },
          { text: 'Symmetric — no lateralisation', tone: 'teal' },
        ],
        [
          'Pupils / vision',
          { text: 'Contralateral menace loss<br>· PLR intact', tone: 'info' },
          { text: 'Abnormal pupils<br>· multiple CN deficits', tone: 'warning' },
          { text: 'Small reactive · normal<br>PLR bilateral', tone: 'teal' },
        ],
        [
          'CP deficits',
          { text: 'May be present', tone: 'info' },
          { text: '✓ Present', tone: 'warning' },
          { text: '✗ Absent', tone: 'teal' },
        ],
        [
          'Other signs',
          { text: 'Circling · seizures<br>· cortical blindness', tone: 'info' },
          { text: 'Abnormal resp. pattern<br>· vestibular signs', tone: 'warning' },
          { text: 'Post-prandial worsening<br>→ metabolic', tone: 'teal' },
        ],
      ],
    },

    // 3 nav tiles → sub-flow pages
    {
      kind: 'choices',
      cols: 3,
      size: 11,
      connectAfter: false,
      items: [
        {
          variant: 'insp',
          label: 'Forebrain',
          link: { to: 'flow', id: 'encephalopathy-forebrain' },
        },
        {
          variant: 'rest',
          label: 'Brainstem',
          link: { to: 'flow', id: 'encephalopathy-brainstem' },
        },
        {
          variant: 'mixed',
          label: 'Diffuse / Bilateral',
          link: { to: 'flow', id: 'encephalopathy-diffuse' },
        },
      ],
    },

    // Dementia callout
    {
      kind: 'callout',
      tone: 'info',
      gap: 8,
      connectAfter: false,
      title: '💭 Also consider: Cognitive Dysfunction Syndrome (Dementia)',
      html: `Geriatric dog or cat · gradual, progressive onset · no focal neurological signs<br>
Disorientation · night waking · altered social interactions · house soiling (DISHA)<br>
Normal neurological exam, bloodwork, and MRI — diagnosis of exclusion`,
    },

    { kind: 'disclaimer' },
  ],
}

// ── Forebrain sub-flow ────────────────────────────────────────────────────────
const encephalopathyForebrain: FlowPage = {
  id: 'encephalopathy-forebrain',
  title: 'Forebrain — causes',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'info', text: '🔵 FOREBRAIN LESIONS' , sub: 'Behaviour change, circling toward the lesion, contralateral menace and postural deficits, seizures — with normal gait strength' },

    {
      kind: 'branch',
      columns: [
        {
          header: 'Metabolic',
          tone: 'teal',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Hypertensive encephalopathy', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'HAC — pituitary macroadenoma', tone: 'teal', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
                { label: 'PSS / hepatic encephalopathy', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'Hypoglycaemia (severe)', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
              ],
            },
          ],
        },
        {
          header: 'Structural',
          tone: 'info',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'CVA / stroke', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-CVA' } },
                { label: 'MUO / GME / encephalitis', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
                { label: 'Meningioma · glioma · pituitary', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
                { label: 'TBI / head trauma', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
                { label: 'Hydrocephalus', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-HYDRO' } },
                { label: 'Lissencephaly', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-BRAINMAL' } },
              ],
            },
          ],
        },
        {
          header: 'Toxic / Drug',
          tone: 'warning',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Lead toxicity', tone: 'warning' },
                { label: 'Organophosphates', tone: 'warning' },
                { label: 'Bromethalin', tone: 'warning' },
                { label: 'Ethylene glycol', tone: 'warning' },
              ],
            },
          ],
        },
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── Brainstem sub-flow ────────────────────────────────────────────────────────
const encephalopathyBrainstem: FlowPage = {
  id: 'encephalopathy-brainstem',
  title: 'Brainstem — causes',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: '🟡 BRAINSTEM LESIONS' },

    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      connectAfter: false,
      title: '🚨 Brainstem involvement — consider ICU',
      html: `Multiple CN deficits · abnormal respiratory pattern · rapidly depressed mentation<br>
Vertical or direction-changing nystagmus · progression despite treatment`,
    },

    {
      kind: 'branch',
      columns: [
        {
          header: 'Metabolic',
          tone: 'teal',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Thiamine deficiency', tone: 'teal', sublabel: '🐱 Raw fish / sulphite diet', link: { to: 'disease', id: 'DIS-NEU-THIAMINE' } },
                { label: 'Hepatic encephalopathy (severe)', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'Hyperosmolar states', tone: 'teal' },
              ],
            },
          ],
        },
        {
          header: 'Structural',
          tone: 'warning',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'CVA / stroke', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-CVA' } },
                { label: 'MUO / GME / encephalitis', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
                { label: 'Intracranial neoplasia', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
                { label: 'TBI / head trauma', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
              ],
            },
          ],
        },
        {
          header: 'Toxic / Drug',
          tone: 'danger',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Metronidazole toxicity', tone: 'danger', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
                { label: 'Bromethalin', tone: 'danger' },
                { label: 'Ivermectin (MDR1 breeds)', tone: 'danger' },
                { label: 'Organophosphates', tone: 'danger' },
              ],
            },
          ],
        },
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── Diffuse / Bilateral sub-flow ─────────────────────────────────────────────
const encephalopathyDiffuse: FlowPage = {
  id: 'encephalopathy-diffuse',
  title: 'Diffuse / Bilateral — causes',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'teal', text: '🟢 DIFFUSE / BILATERAL — METABOLIC FIRST' , sub: 'Symmetrical signs with no lateralising deficit — screen glucose, electrolytes, ammonia and toxins before imaging' },

    {
      kind: 'branch',
      columns: [
        {
          header: 'Metabolic',
          tone: 'teal',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Hypoglycaemia', tone: 'teal', sublabel: 'Insulinoma · PSS · Addison\'s · toy breeds', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'Hepatic encephalopathy', tone: 'teal', sublabel: 'PSS · liver failure — post-prandial', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'Uraemic encephalopathy', tone: 'teal', sublabel: 'CKD / AKI', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'Electrolyte extremes', tone: 'teal', sublabel: 'Na >170 or <120 mmol/L — correct slowly' },
                { label: 'Hypocalcaemia', tone: 'teal', sublabel: 'Eclampsia · HypoPTH' },
                { label: 'Hypertensive encephalopathy', tone: 'teal' },
                { label: 'Sepsis / shock', tone: 'teal', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
                { label: 'Hyperthyroidism', tone: 'teal', sublabel: '🐱 Cats' },
              ],
            },
          ],
        },
        {
          header: 'Structural',
          tone: 'info',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Storage diseases (NCL)', tone: 'info', sublabel: 'Lysosomal storage — breed-specific', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
                { label: 'CDS / dementia', tone: 'info', sublabel: 'Geriatric · gradual · dx of exclusion' },
              ],
            },
          ],
        },
        {
          header: 'Toxic / Drug',
          tone: 'warning',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Opioids · BZDs · cannabinoids', tone: 'warning' },
                { label: 'Ethylene glycol', tone: 'warning' },
                { label: 'Bromethalin · metaldehyde', tone: 'warning' },
                { label: 'Ivermectin (MDR1 breeds)', tone: 'warning' },
                { label: 'Permethrin', tone: 'warning', sublabel: '🐱 Cats' },
                { label: 'Heavy metals (lead, mercury)', tone: 'warning' },
                { label: 'Thiamine deficiency', tone: 'warning', sublabel: '🐱 Raw fish / sulphite diet', link: { to: 'disease', id: 'DIS-NEU-THIAMINE' } },
                { label: 'Metronidazole toxicity', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
              ],
            },
          ],
        },
      ],
    },

    { kind: 'disclaimer' },
  ],
}

export const encephalopathyFlows: FlowPage[] = [
  encephalopathyMain,
  encephalopathyForebrain,
  encephalopathyBrainstem,
  encephalopathyDiffuse,
]
