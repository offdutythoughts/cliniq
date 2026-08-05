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
    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRM EPILEPTIC SEIZURE',
      sub: 'Paroxysmal · stereotyped · abrupt start and stop · self-limiting (usually <2 min) · ± autonomic signs · followed by a postictal phase',
    },
    {
      kind: 'table',
      gap: 12,
      boxTone: 'slate',
      title: 'Rule out mimics',
      cols: '0.95fr 1.5fr 1.15fr',
      headers: ['', 'How it differs from a seizure', 'Trigger / signalment'],
      rows: [
        [
          { text: '<strong>Syncope</strong>', tone: 'danger' },
          { text: 'Sudden collapse · flaccid, no tonic-clonic · brief · rapid full recovery · no postictal phase', tone: 'danger' },
          { text: 'Exertion · cough · Valsalva · excitement — look for cardiac disease', tone: 'danger' },
        ],
        [
          { text: '<strong>Vestibular episode</strong>', tone: 'teal' },
          { text: 'Head tilt · rolling · nystagmus · consciousness preserved · no tonic-clonic', tone: 'teal' },
          { text: 'Otitis · geriatric onset (idiopathic)', tone: 'teal' },
        ],
        [
          { text: '<strong>Dyskinesia / paroxysmal movement disorder</strong>', tone: 'violet' },
          { text: 'Sustained dystonia · no LOC · no autonomic signs · normal between episodes', tone: 'violet' },
          { text: 'Cavalier KCS · Scottish Terrier · Border Terrier · Labrador', tone: 'violet' },
        ],
        [
          { text: '<strong>Narcolepsy / cataplexy</strong>', tone: 'warning' },
          { text: 'Sudden loss of muscle tone · rousable · instant full recovery · no postictal phase', tone: 'warning' },
          { text: 'Excitement · food · play — Dobermann · Labrador · young onset', tone: 'warning' },
        ],
        [
          { text: '<strong>REM sleep disorder</strong>', tone: 'info' },
          { text: 'Occurs only during sleep · stops when woken', tone: 'info' },
          { text: 'Often mistaken for seizures on owner video', tone: 'info' },
        ],
        [
          { text: '<strong>Neuromuscular collapse</strong>', tone: 'orange' },
          { text: 'Exercise-induced weakness / collapse · no LOC · no postictal phase', tone: 'orange' },
          { text: 'Labrador (EIC) · Border Collie (BCC) — after intense exercise', tone: 'orange' },
        ],
      ],
    },

    // Characterise
    {
      kind: 'node',
      variant: 'step',
      text: 'CHARACTERISE SEIZURE TYPE',
      sub: 'Focal → strongly favours structural · Generalised → any category possible',
    },
    {
      kind: 'table',
      gap: 12,
      cols: '0.85fr 1.25fr 1.25fr',
      headers: [
        '',
        { text: 'Focal', tone: 'info' },
        { text: 'Generalised', tone: 'orange' },
      ],
      rows: [
        [
          'Distribution',
          { text: 'One body region or one side', tone: 'info' },
          { text: 'Both sides simultaneously', tone: 'orange' },
        ],
        [
          'Motor signs',
          { text: 'Facial twitching · lip smacking<br>· fly-catching · limb jerking', tone: 'info' },
          { text: 'Tonic-clonic · tonic · clonic<br>· atonic · myoclonic', tone: 'orange' },
        ],
        [
          'Consciousness',
          { text: 'May be preserved (aware)<br>or impaired', tone: 'info' },
          { text: 'Always lost', tone: 'orange' },
        ],
        [
          'Autonomic signs',
          { text: 'Salivation · mydriasis · vomiting<br>— may be the only sign', tone: 'info' },
          { text: 'Urination · defaecation<br>· hypersalivation', tone: 'orange' },
        ],
        [
          'Course',
          { text: 'May secondarily generalise', tone: 'info' },
          { text: 'Generalised from onset', tone: 'orange' },
        ],
        [
          'Implication',
          { text: '<strong>Strongly favours structural</strong> — image the brain', tone: 'info' },
          { text: 'Any category possible — idiopathic · structural · reactive', tone: 'orange' },
        ],
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
            { label: 'Hypoglycaemia', tone: 'teal', link: { to: 'disease', id: 'DIS-MET-HYPOGLY' } },
            { label: 'Hepatic encephalopathy', tone: 'teal', link: { to: 'disease', id: 'DIS-HEP-HE' } },
            { label: 'Hypocalcaemia', tone: 'teal', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
            { label: 'Hyponatraemia / Hypernatraemia', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
            { label: 'Uraemic encephalopathy', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
            { label: 'Polycythaemia', tone: 'teal', link: { to: 'disease', id: 'DIS-BD-PV' } },
            { label: 'Hypertensive enceph.', tone: 'teal', link: { to: 'disease', id: 'DIS-NEU-METABENC' } },
            { label: 'Hyperthyroidism (cats)', tone: 'teal', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
          ]}],
        },
        {
          header: 'Toxins',
          tone: 'danger',
          blocks: [{ kind: 'endpoints', items: [
            { label: 'Organophosphates / carbamates', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-OP' } },
            { label: 'Metaldehyde', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-METALD' } },
            { label: 'Bromethalin', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-BROM' } },
            { label: 'Ethylene glycol', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-EG' } },
            { label: 'Mycotoxins', tone: 'danger', sublabel: 'Most common cause of acute generalised tremor', link: { to: 'disease', id: 'DIS-TOX-MYCO' } },
            { label: 'Lead', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-LEAD' } },
            { label: 'Methylxanthines', tone: 'danger', link: { to: 'disease', id: 'DIS-TOXIC-METHYL' } },
            { label: 'Strychnine', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-STRYCH' } },
            { label: 'Ivermectin', tone: 'danger', link: { to: 'disease', id: 'DIS-TOX-ML' } },
          ]}],
        },
        {
          header: 'Medications',
          tone: 'warning',
          blocks: [{ kind: 'endpoints', items: [
            { label: '5-FU cream (cats)', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-5FU' } },
            { label: 'SSRIs / SNRIs', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-SERO' } },
            { label: 'Metronidazole', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-METRO' } },
            { label: 'Tramadol (cats)', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-SERO' } },
            { label: 'Fluoroquinolones (cats)', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-FQ' } },
            { label: 'Lidocaine (cats)', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-LAST' } },
            { label: 'Pyrethrins / pyrethroids (cats)', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-PERM' } },
            { label: 'Amphetamines / stimulants', tone: 'warning', link: { to: 'disease', id: 'DIS-TOX-AMPHET' } },
            { label: 'AED withdrawal', tone: 'warning', link: { to: 'disease', id: 'DIS-NEU-AEDWD' } },
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
