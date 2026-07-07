// ── Anorexia / Hyporexia flowchart ───────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const anorexiaEntry: FlowPage = {
  id: 'anorexia',
  title: 'Anorexia / Hyporexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'ANOREXIA / HYPOREXIA' },
    {
      kind: 'callout',
      tone: 'danger',
      html: '<strong>Anorexic CAT = emergency.</strong> Hepatic lipidosis can develop in as few as <strong>2 days</strong> in obese cats (typically within 1–2 weeks). Don\'t rely on appetite stimulants — <strong>feed early</strong> (assisted/tube) once eating &lt;RER for &gt;3–5 days. RER (kcal/day) = (30 × kg) + 70 for 3–25 kg cats, or 70 × kg⁰·⁷⁵ for any weight.',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'CAN\'T EAT (pseudo-anorexia) vs WON\'T EAT (true anorexia)?',
      sub: 'Watch approach to food: interested but drops it / paws at mouth / gulps painfully = pseudo; ignores food = true anorexia',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'orange',
          label: 'PSEUDO-ANOREXIA — wants to but can\'t',
          sublabel: 'Drops food · drooling · pain on prehension · pawing at mouth · gags / regurgitates',
          link: { to: 'flow', id: 'anorexia-pseudo' },
        },
        {
          tone: 'info',
          label: 'TRUE ANOREXIA — won\'t eat (by system)',
          sublabel: 'Systemic illness, pain, or nausea — screen every system',
          link: { to: 'flow', id: 'anorexia-true' },
        },
      ],
    },
  ],
}

const anorexiaPseudo: FlowPage = {
  id: 'anorexia-pseudo',
  title: 'Pseudo-Anorexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'PSEUDO-ANOREXIA — wants to but can\'t', sub: 'Drops food · drooling · pain on prehension · pawing at mouth · gags / regurgitates' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY LESION CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Oral / Dental',
          tone: 'orange',
          tiles: [
            { label: 'Periodontal disease / tooth-root abscess', link: { to: 'disease', id: 'DIS-DENT-PERIO' } },
            { label: 'Oronasal fistula', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
            { label: 'Stomatitis / FCGS — cat', link: { to: 'disease', id: 'DIS-DENT-STOMAT' } },
            { label: 'Oral foreign body', link: { to: 'disease', id: 'DIS-DENT-ORAFB' } },
            { label: 'Jaw fracture / TMJ luxation', link: { to: 'disease', id: 'DIS-DENT-JAWFX' } },
            { label: 'Retrobulbar abscess / mass', link: { to: 'disease', id: 'DIS-DENT-RETRO' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: 'Oral melanoma — dog (#1)', link: { to: 'disease', id: 'DIS-NEO-ORAL-MEL' } },
            { label: 'Squamous cell carcinoma — cat (#1), dog (#2)', link: { to: 'disease', id: 'DIS-NEO-ORAL-SCC' } },
            { label: 'Fibrosarcoma — dog (#3)', link: { to: 'disease', id: 'DIS-NEO-ORAL-FSA' } },
            { label: 'Acanthomatous ameloblastoma — dog', link: { to: 'disease', id: 'DIS-NEO-ORAL-AME' } },
            { label: 'Oropharyngeal lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Nasal tumour (oral invasion)', link: { to: 'disease', id: 'DIS-NASAL-NEO' } },
          ],
        },
        {
          cat: 'Neuromuscular',
          tone: 'indigo',
          tiles: [
            { label: 'Masticatory muscle myositis (MMM)', link: { to: 'disease', id: 'DIS-NEU-MMM' } },
            { label: 'Trigeminal neuropathy / neuritis', link: { to: 'disease', id: 'DIS-NEU-TRIGEMINAL' } },
            { label: 'Craniomandibular osteopathy (CMO) — dog', link: { to: 'disease', id: 'DIS-NEU-CMO' } },
            { label: 'Polymyositis', link: { to: 'disease', id: 'DIS-NEU-POLYMYOSITIS' } },
            { label: 'Botulism — dog', link: { to: 'disease', id: 'DIS-NEU-BOTULISM' } },
            { label: 'Tetanus — dog', link: { to: 'disease', id: 'DIS-NEU-TETANUS' } },
            { label: 'Pharyngeal / cricopharyngeal dysphagia', link: { to: 'disease', id: 'DIS-NEU-CRICOPHARYNGEAL' } },
          ],
        },
        {
          cat: 'Oesophageal',
          tone: 'teal',
          tiles: [
            { label: 'Megaoesophagus', link: { to: 'disease', id: 'DIS-OES-MEGA' } },
            { label: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
            { label: 'Oesophageal stricture (post-GA / doxycycline)', link: { to: 'disease', id: 'DIS-OES-STRICT' } },
            { label: 'Oesophagitis (GA-induced GOR)', link: { to: 'disease', id: 'DIS-OES-ITIS' } },
            { label: 'Vascular ring anomaly / PRAA — dog', link: { to: 'disease', id: 'DIS-OES-VRA' } },
          ],
        },
      ],
    },
  ],
}

const anorexiaTrue: FlowPage = {
  id: 'anorexia-true',
  title: 'True Anorexia — by system',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'TRUE ANOREXIA — won\'t eat (by system)', sub: 'Systemic illness, pain, or nausea — screen every system' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'GI · Pancreas',
          tone: 'orange',
          tiles: [
            { label: 'Pancreatitis — cat', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            { label: 'Pancreatitis — dog', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
            { label: 'GI Foreign Body', link: { to: 'disease', id: 'DIS-GI-FB' } },
            { label: 'IBD / Chronic Enteropathy', link: { to: 'disease', id: 'DIS-GI-IBD' } },
          ],
        },
        {
          cat: 'Hepatobiliary',
          tone: 'warning',
          tiles: [
            { label: 'Feline Hepatic Lipidosis', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
            { label: 'Hepatobiliary disease', link: { to: 'flow', id: 'jaundice' } },
          ],
        },
        {
          cat: 'Renal · Metabolic',
          tone: 'info',
          tiles: [
            { label: 'Uraemia (CKD / AKI)', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Diabetic Ketoacidosis', link: { to: 'protocol', id: 'PROT-ENDO-DKA' } },
            { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
          ],
        },
        {
          cat: 'Infectious',
          tone: 'danger',
          tiles: [
            { label: 'Sepsis / Septic Peritonitis', link: { to: 'protocol', id: 'PROT-SEPSIS' } },
            { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: 'Neoplasia / Lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Paraneoplastic / Cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
          ],
        },
        {
          cat: 'Pain · CNS',
          tone: 'slate',
          tiles: [
            { label: 'Occult pain · nausea · CNS' },
          ],
        },
      ],
    },
  ],
}

export const anorexiaFlows: FlowPage[] = [anorexiaEntry, anorexiaPseudo, anorexiaTrue]
