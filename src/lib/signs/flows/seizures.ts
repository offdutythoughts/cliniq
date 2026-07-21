// ── Seizures flowchart (data) ───────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

// ── Entry ────────────────────────────────────────────────────────────────────
const seizuresEntry: FlowPage = {
  id: 'seizures',
  title: 'Seizures',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🧠 SEIZURES' },

    // Phase comparison table
    {
      kind: 'table',
      gap: 12,
      cols: '0.7fr 1fr 1fr 1fr',
      headers: [
        '',
        { text: 'Prodrome', tone: 'violet' },
        { text: 'Ictal', tone: 'warning' },
        { text: 'Postictal', tone: 'green' },
      ],
      rows: [
        ['Timing', { text: 'Hours–days before', tone: 'violet' }, 'Active seizure', 'After seizure ends'],
        ['Signs', 'Restlessness · anxiety · hiding', 'Tonic-clonic · tonic · atonic · autonomic', 'Disorientation · blindness · ataxia · hypersalivation'],
        ['Note', { text: 'Not always present', tone: 'violet' }, 'Focal or generalised', 'Minutes to hours — prolonged &gt;24h = structural'],
      ],
    },

    // Confirm
    { kind: 'node', variant: 'step', text: 'CONFIRM EPILEPTIC SEIZURE' },
    {
      kind: 'callout',
      tone: 'slate',
      title: 'Rule out mimics',
      html: `<strong>Syncope</strong> — sudden onset, brief, rapid full recovery; triggered by exertion or Valsalva; no tonic-clonic, no postictal<br>
<strong>Vestibular episode</strong> — head tilt, rolling, nystagmus; consciousness preserved; no tonic-clonic<br>
<strong>Dyskinesia / paroxysmal movement disorder</strong> — dystonia, no LOC, breed-specific (Cavalier, Scottish Terrier, Labrador)<br>
<strong>Narcolepsy / cataplexy</strong> — sudden loss of muscle tone triggered by excitement; rapid recovery; Dobermann, Labrador<br>
<strong>REM sleep disorder</strong> — occurs during sleep, stops when woken; often mistaken for seizures<br>
<strong>Neuromuscular collapse</strong> — exercise-induced; Labrador, Border Collie; no LOC`,
    },

    // Characterise
    {
      kind: 'node',
      variant: 'step',
      text: 'CHARACTERISE SEIZURE TYPE',
      sub: 'Focal → strongly favours structural · Generalised → any category possible',
    },
    {
      kind: 'choices',
      cols: 2,
      size: 11,
      connectAfter: false,
      items: [
        {
          variant: 'insp',
          label: 'Focal',
          sublabel: 'One body region / side<br>Facial twitching · lip smacking<br>Fly-catching · limb jerking<br>Consciousness may be preserved<br>May secondarily generalise',
        },
        {
          variant: 'rest',
          label: 'Generalised',
          sublabel: 'Both sides simultaneously<br>Tonic-clonic · tonic · atonic<br>Loss of consciousness<br>Urination · defaecation',
        },
      ],
    },

    // Interictal exam (brief)
    {
      kind: 'node',
      variant: 'step',
      text: 'INTERICTAL NEUROLOGICAL EXAMINATION',
      sub: 'Normal exam → idiopathic epilepsy possible (if 6mo–6yr, normal bloods) · Abnormal exam → structural until proven otherwise — proceed to MRI',
    },

    // Classify aetiology → sub-pages
    {
      kind: 'node',
      variant: 'step',
      text: 'CLASSIFY AETIOLOGY',
      sub: 'Tap each category for cause details',
      connectAfter: false,
    },
    {
      kind: 'choices',
      cols: 3,
      size: 11,
      connectAfter: false,
      items: [
        {
          variant: 'insp',
          label: 'Idiopathic',
          sublabel: 'Onset 6mo–6yr<br>Normal bloods<br>Normal interictal exam<br>Breed predisposed',
          link: { to: 'lesion', loc: 'LOC-SZ-INTRACRANIAL', name: 'Intracranial' },
        },
        {
          variant: 'rest',
          label: 'Structural',
          sublabel: '&lt;6mo or &gt;6yr<br>Abnormal exam / focal signs<br>Progressive course<br>VITAMIN D →',
          link: { to: 'flow', id: 'seizures-structural' },
        },
        {
          variant: 'mixed',
          label: 'Reactive',
          sublabel: 'Abnormal bloods<br>Metabolic / toxic cause<br>Any age<br>⚠️ High SE risk',
          link: { to: 'flow', id: 'seizures-reactive' },
        },
      ],
    },

    // Actions
    {
      kind: 'dxRow',
      items: [
        { label: '🚨 SE Protocol', link: { to: 'protocol', id: 'PROT-SEIZ' } },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>SE (&gt;5 min):</strong> Diazepam 0.5 mg/kg IV (×3) → LEV 20–60 mg/kg IV → PB 2–5 mg/kg IV → Propofol CRI — check BG immediately, dextrose if &lt;3.5 mmol/L',
        '<strong>Reactive cause first:</strong> check BG · electrolytes · bile acids before committing to idiopathic — a treatable metabolic cause missed = preventable harm',
        '<strong>AED withdrawal</strong> → major cause of breakthrough seizures and SE; always ask about missed doses',
        '<strong>5-FU cream (cats)</strong> — any trace exposure = immediate emergency',
        '<strong>Cluster (≥2/24h)</strong> → treat aggressively; significant risk of SE',
      ],
    },

    { kind: 'disclaimer' },
  ],
}

// ── Structural sub-page ───────────────────────────────────────────────────────
const seizuresStructural: FlowPage = {
  id: 'seizures-structural',
  title: 'Structural Epilepsy — VITAMIN D',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'warning', text: '🏗 STRUCTURAL EPILEPSY — VITAMIN D' },

    {
      kind: 'callout',
      tone: 'warning',
      gap: 8,
      connectAfter: false,
      html: `<strong>Clues to structural cause:</strong> onset &lt;6mo or &gt;6yr · focal seizure type · abnormal interictal neuro exam · progressive course · MRI/CSF abnormal`,
    },

    {
      kind: 'categoryColumns',
      cols: 4,
      columns: [
        { cat: 'Vascular', tiles: [
          { label: 'CVA / stroke', link: { to: 'disease', id: 'DIS-NEU-CVA' } },
          { label: 'Hypertensive enceph.', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
        ]},
        { cat: 'Inflammatory', tiles: [
          { label: 'MUO / GME', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
          { label: 'CDV encephalitis (dog)', link: { to: 'disease', id: 'DIS-INFECT-CDV' } },
          { label: 'FIP (cat)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
          { label: 'Toxoplasma / Neospora', link: { to: 'disease', id: 'DIS-INFECT-TOXO' } },
          { label: 'Cryptococcus', link: { to: 'disease', id: 'DIS-RESP-CRYPTO' } },
        ]},
        { cat: 'Trauma', tiles: [
          { label: 'Head trauma', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' } },
        ]},
        { cat: 'Anomalous', tiles: [
          { label: 'Hydrocephalus', link: { to: 'disease', id: 'DIS-NEU-HYDRO' } },
          { label: 'Lissencephaly', link: { to: 'disease', id: 'DIS-NEU-BRAINMAL' } },
        ]},
        { cat: 'Mass', tiles: [
          { label: 'Meningioma', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
          { label: 'Glioma', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
          { label: 'CNS lymphoma', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
          { label: 'Metastatic', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
        ]},
        { cat: 'Metabolic / Endocrine', tiles: [
          { label: 'NCL / lysosomal storage', terminal: true },
        ]},
        { cat: 'Immune-mediated', tiles: [
          { label: 'MUO (NME / NLE / MUA)', link: { to: 'disease', id: 'DIS-NEU-MUE' } },
        ]},
        { cat: 'Degenerative', tiles: [
          { label: 'Neuronal degeneration', terminal: true },
          { label: 'Breed-specific degen.', terminal: true },
        ]},
      ],
    },


    { kind: 'disclaimer' },
  ],
}

// ── Reactive sub-page ─────────────────────────────────────────────────────────
const seizuresReactive: FlowPage = {
  id: 'seizures-reactive',
  title: 'Reactive Seizures',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'teal', text: '⚡ REACTIVE SEIZURES — METABOLIC & TOXIC' },

    {
      kind: 'callout',
      tone: 'danger',
      gap: 8,
      connectAfter: false,
      html: `<strong>⚠️ High SE risk</strong> — reactive causes carry a disproportionate risk of status epilepticus. Check BG immediately (dextrose if &lt;3.5 mmol/L). Identify and treat the underlying cause in parallel with seizure control. See SE Protocol.`,
    },

    {
      kind: 'branch',
      columns: [
        {
          header: 'Metabolic',
          tone: 'teal',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Hypoglycaemia', tone: 'teal', sublabel: 'Insulinoma · PSS · Addison\'s · toy breed pup' },
            { label: 'Hepatic encephalopathy', tone: 'teal', sublabel: 'PSS · acute liver failure' },
            { label: 'Hypocalcaemia', tone: 'teal', sublabel: 'Eclampsia · hypoparathyroidism' },
            { label: 'Hyponatraemia / Hypernatraemia', tone: 'teal' },
            { label: 'Uraemic encephalopathy', tone: 'teal' },
            { label: 'Polycythaemia', tone: 'teal', sublabel: '↑ blood viscosity' },
            { label: 'Hypertensive enceph.', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
            { label: 'Hyperthyroidism (cats)', tone: 'teal' },
          ]}],
        },
        {
          header: 'Toxins',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Organophosphates / carbamates', tone: 'danger', sublabel: 'SLUDGE + tremors' },
            { label: 'Metaldehyde', tone: 'danger', sublabel: 'Slug bait — acute tremors + hyperthermia' },
            { label: 'Bromethalin', tone: 'danger', sublabel: 'Rodenticide — delayed 12h–5 days' },
            { label: 'Ethylene glycol', tone: 'danger', sublabel: 'Antifreeze — seizures at 12–24h' },
            { label: 'Mycotoxins', tone: 'danger', sublabel: 'Mouldy food — Penitrem A' },
            { label: 'Lead', tone: 'danger', sublabel: 'Young dogs · pica · vomiting' },
            { label: 'Methylxanthines', tone: 'danger', sublabel: 'Chocolate · coffee · energy drinks' },
            { label: 'Strychnine', tone: 'danger', sublabel: 'Severe rigidity · opisthotonus' },
            { label: 'Ivermectin', tone: 'danger', sublabel: 'MDR1 / ABCB1-affected breeds' },
          ]}],
        },
        {
          header: 'Medications',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: '5-FU cream (cats)', tone: 'warning', sublabel: 'Any trace = immediate emergency' },
            { label: 'SSRIs / SNRIs', tone: 'warning', sublabel: 'Serotonin syndrome' },
            { label: 'Metronidazole', tone: 'warning', sublabel: 'Esp. cats — vestibular + seizures' },
            { label: 'Tramadol (cats)', tone: 'warning', sublabel: 'Lowers seizure threshold' },
            { label: 'Fluoroquinolones (cats)', tone: 'warning', sublabel: 'High doses' },
            { label: 'Lidocaine (cats)', tone: 'warning', sublabel: 'Narrow therapeutic margin' },
            { label: 'Pyrethrins / pyrethroids (cats)', tone: 'warning' },
            { label: 'Amphetamines / stimulants', tone: 'warning' },
            { label: 'AED withdrawal', tone: 'warning', sublabel: '→ Major cause of SE' },
          ]}],
        },
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '🚨 SE Protocol', link: { to: 'protocol', id: 'PROT-SEIZ' } },
      ],
    },

    { kind: 'disclaimer' },
  ],
}

export const seizuresFlows: FlowPage[] = [seizuresEntry, seizuresStructural, seizuresReactive]
