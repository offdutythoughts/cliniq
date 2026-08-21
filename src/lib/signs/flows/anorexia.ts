// ── Anorexia / Hyporexia flowchart ───────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { DONT_MISS_TITLE, IDENTIFY_CAUSE_STEP } from '../flowTypes'

const anorexiaEntry: FlowPage = {
  id: 'anorexia',
  title: 'Anorexia / Hyporexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: 'ANOREXIA / HYPOREXIA' },
    {
      kind: 'node',
      variant: 'step',
      text: 'CAN\'T EAT (pseudo-anorexia) vs WON\'T EAT (true anorexia)?',
      subItems: [
        'Watch the approach to food',
        'Interested but drops it, paws at the mouth or gulps painfully = pseudo-anorexia',
        'Ignores food altogether = true anorexia',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'orange',
          label: 'PSEUDO-ANOREXIA — wants to but can\'t',
          link: { to: 'flow', id: 'anorexia-pseudo' },
        },
        {
          tone: 'info',
          label: 'TRUE ANOREXIA — won\'t eat (by system)',
          link: { to: 'flow', id: 'anorexia-true' },
        },
      ],
    },

    // The feeding warning is not a discriminator — it belongs in the house
    // DON'T MISS box, one instruction per bullet, not in a paragraph above the
    // split it has nothing to do with.
    {
      kind: 'alert',
      tone: 'danger',
      title: DONT_MISS_TITLE,
      items: [
        { bold: 'Hepatic lipidosis — an anorexic CAT is an emergency', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' }, html: ' — it can develop in as few as 2 days in an obese cat, typically within 1–2 weeks' },
        '<strong>Feed early — do not wait on appetite stimulants</strong>: assisted or tube feeding once the patient has eaten &lt;RER for &gt;3–5 days',
        '<strong>RER (kcal/day)</strong> = (30 × kg) + 70 for a 3–25 kg patient, or 70 × kg⁰·⁷⁵ at any weight',
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
    IDENTIFY_CAUSE_STEP,
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
            { label: 'Diabetic Ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Hypoadrenocorticism', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
          ],
        },
        {
          cat: 'Infectious',
          tiles: [
            { label: 'Sepsis / Septic Peritonitis', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' } },
            { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Neoplasia / Lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Paraneoplastic / Cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
          ],
        },
        {
          cat: 'Pain · CNS',
          tone: 'slate',
          tiles: [
            { label: 'Occult pain · nausea · CNS', terminal: true },
          ],
        },
      ],
    },
  ],
}

export const anorexiaFlows: FlowPage[] = [anorexiaEntry, anorexiaPseudo, anorexiaTrue]
