// ── Dysphagia / Gagging flowchart ────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const dysphagiaEntry: FlowPage = {
  id: 'dysphagia',
  title: 'Dysphagia / Gagging',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' DYSPHAGIA / GAGGING' },

    // Q1 — swallowing problem or vomiting? Asked as a fork over the FINDINGS
    // (Ettinger Table 48.1) rather than a paragraph: the reader ticks off what
    // they watched happen. The dysphagia leg continues down the spine.
    {
      kind: 'node',
      variant: 'step',
      text: 'SWALLOWING PROBLEM, OR TRUE VOMITING?',
      sub: 'Watch the patient eat before anything else (Ettinger Ch 47)',
    },
    {
      kind: 'fork',
      legs: [
        {
          label: 'DYSPHAGIA / REGURGITATION',
          tone: 'teal',
          subItems: [
            'Passive — head drops, food falls out',
            'No nausea, no retching',
            'No abdominal effort',
            'Bile rare · ± cervical bulge',
          ],
          continue: true,
        },
        {
          label: 'VOMITING',
          tone: 'orange',
          subItems: [
            'Active, centrally driven reflex',
            'Nausea · lip-smacking first',
            'Retching + abdominal contractions',
            'Bile = patent gastric outflow',
          ],
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { label: 'Vomiting', tone: 'orange', link: { to: 'flow', id: 'vomiting' } },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE ALONG THE SWALLOW',
      subItems: [
        'Prehension / mastication fails → ORAL',
        'Transfer through the upper sphincter fails → PHARYNGEAL / cricopharyngeal',
        'Transport down the oesophagus fails → OESOPHAGEAL (regurgitation)',
      ],
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'teal',
          label: ' ORAL (prehension / mastication)',
          link: { to: 'flow', id: 'dysphagia-oral' },
        },
        {
          tone: 'indigo',
          label: ' PHARYNGEAL / CRICOPHARYNGEAL',
          link: { to: 'flow', id: 'dysphagia-pharyngeal' },
        },
        {
          tone: 'orange',
          label: ' OESOPHAGEAL (regurgitation)',
          link: { to: 'flow', id: 'dysphagia-oesophageal' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        { bold: 'MG-associated megaoesophagus', link: { to: 'disease', id: 'DIS-WK-MG' }, html: ' — megaoesophagus in 84% of dogs / 40% of cats with generalised MG; aspiration pneumonia is the leading cause of death. Run an AChR antibody titre in any acquired megaoesophagus' },
        { bold: 'Rabies', link: { to: 'disease', id: 'DIS-INFECT-RABIES' }, html: ' — pharyngeal dysphagia / inability to swallow with hypersalivation in an unvaccinated or potentially exposed patient is a zoonotic emergency: isolate and handle as a notifiable disease' },
        { bold: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' }, html: ' — acute onset, retching, hypersalivation; needs prompt endoscopic removal before perforation, stricture or aspiration' },
        '<strong>Aspiration pneumonia</strong> — the major lethal complication; oesophageal (megaoesophagus = 71% of that group) and neurologic disease are the leading risks. Thoracic radiographs (min. 3 views) in EVERY dysphagic patient; withhold oral feeding in severe pharyngeal/oesophageal dysfunction',
      ],
    },

  ],
}

const dysphagiaOral: FlowPage = {
  id: 'dysphagia-oral',
  title: 'Dysphagia — Oral',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' ORAL (prehension / mastication)', sub: 'Drops food · drools · pain on opening mouth · pawing at face · head-tilting to chew · ptyalism · tongue/jaw weakness' },
    { kind: 'node', variant: 'step', text: 'MECHANICAL vs FUNCTIONAL (CN)?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Mechanical (Pain / Mass)',
          tone: 'orange',
          tiles: [
            { label: 'Dental / oronasal disease', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
            { label: 'Salivary mucocele / sialocele', link: { to: 'disease', id: 'DIS-GI-SIALOCELE' } },
            { label: 'Oral mass / FB / trauma', link: { to: 'disease', id: 'DIS-DENT-ORAFB' } },
          ],
        },
        {
          cat: 'Neuromuscular (CN / Muscle)',
          tone: 'violet',
          tiles: [
            { label: 'Masticatory myositis', link: { to: 'disease', id: 'DIS-NEU-MMM' } },
            { label: 'CN V / VII / XII dysfunction', link: { to: 'disease', id: 'DIS-NEU-TRIGEMINAL' } },
            { label: ' Lingual / polymyositis · trigeminal neuritis', link: { to: 'disease', id: 'DIS-NEU-POLYMYOSITIS' } },
          ],
        },
      ],
    },
  ],
}

const dysphagiaPhary: FlowPage = {
  id: 'dysphagia-pharyngeal',
  title: 'Dysphagia — Pharyngeal / Cricopharyngeal',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' PHARYNGEAL / CRICOPHARYNGEAL', sub: 'Repeated swallowing attempts · gagging · coughing/nasal reflux during eating · the bolus won\'t clear the throat · ↓ gag reflex (CN IX/X)' },
    { kind: 'node', variant: 'step', text: 'MECHANICAL vs FUNCTIONAL (CN IX/X / asynchrony)?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Mechanical (Mass / Obstruction)',
          tone: 'orange',
          tiles: [
            { label: 'Pharyngeal mass / neoplasia', link: { to: 'disease', id: 'DIS-NEO-ORAL-SCC' } },
            { label: 'Pharyngeal FB / trauma', link: { to: 'disease', id: 'DIS-DENT-ORAFB' } },
          ],
        },
        {
          cat: 'Neuromuscular',
          tone: 'teal',
          tiles: [
            { label: 'Cricopharyngeal achalasia / dyssynchrony', link: { to: 'disease', id: 'DIS-NEU-CRICOPHARYNGEAL' } },
            { label: 'Myasthenia gravis (focal)', link: { to: 'disease', id: 'DIS-WK-MG' } },
            { label: 'Polyradiculoneuritis', link: { to: 'disease', id: 'DIS-NEU-POLYRADIC' } },
            { label: ' Brainstem lesion (CN IX/X nucleus)', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
          ],
        },
      ],
    },
  ],
}

const dysphagiaOeso: FlowPage = {
  id: 'dysphagia-oesophageal',
  title: 'Dysphagia — Oesophageal',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' OESOPHAGEAL (regurgitation)', sub: 'Passive regurgitation of undigested food/saliva · cervical oesophageal distension · variable timing after eating · weight loss · high aspiration risk' },
    { kind: 'node', variant: 'step', text: 'MECHANICAL vs FUNCTIONAL (motility)?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Mechanical (Obstruction)',
          tone: 'orange',
          tiles: [
            { label: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
            { label: 'Stricture', link: { to: 'disease', id: 'DIS-OES-STRICT' } },
            { label: 'Vascular ring anomaly (PRAA)', link: { to: 'disease', id: 'DIS-OES-VRA' } },
          ],
        },
        {
          cat: 'Motility / Inflammatory',
          tone: 'teal',
          tiles: [
            { label: 'Megaoesophagus', link: { to: 'disease', id: 'DIS-OES-MEGA' } },
            { label: 'Oesophagitis', link: { to: 'disease', id: 'DIS-OES-ITIS' } },
            { label: 'Myasthenia gravis', link: { to: 'disease', id: 'DIS-WK-MG' } },
            { label: 'Dysautonomia', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
          ],
        },
      ],
    },
  ],
}

export const dysphagiaFlows: FlowPage[] = [
  dysphagiaEntry,
  dysphagiaOral,
  dysphagiaPhary,
  dysphagiaOeso,
]
