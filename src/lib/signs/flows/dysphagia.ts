// ── Dysphagia / Gagging flowchart ────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const dysphagiaEntry: FlowPage = {
  id: 'dysphagia',
  title: 'Dysphagia / Gagging',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' DYSPHAGIA / GAGGING' },
    {
      kind: 'callout',
      tone: 'warning',
      html: ' <strong>First: is this a swallowing problem or true vomiting?</strong> Dysphagia/regurgitation = <em>passive</em> expulsion of food from the pharynx/oesophagus — head down, material falls out, no nausea or abdominal effort. <strong>Vomiting</strong> is an <em>active</em> centrally-mediated reflex with prodromal nausea, retching and abdominal contractions; bile indicates a patent gastric outflow. Regurgitation is uncommon in cats — assume vomiting in a cat unless proven otherwise. <strong>Aspiration pneumonia is the major lethal complication</strong> — oesophageal disease (megaoesophagus 71% of that group) and neurologic disease are the leading risk factors. (Ettinger Ch 47)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE ALONG THE SWALLOW',
      sub: 'Where does it break down — prehension/mastication (ORAL) · transfer through the upper sphincter (PHARYNGEAL / cricopharyngeal) · or transport down the oesophagus (OESOPHAGEAL → regurgitation)? Watch the patient eat. (Ettinger Ch 47)',
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'teal',
          label: ' ORAL (prehension / mastication)',
          sublabel: 'Drops food · drools · pain on opening mouth · pawing at face · tongue/jaw weakness',
          link: { to: 'flow', id: 'dysphagia-oral' },
        },
        {
          tone: 'indigo',
          label: ' PHARYNGEAL / CRICOPHARYNGEAL',
          sublabel: 'Repeated swallowing attempts · gagging · coughing/nasal reflux during eating',
          link: { to: 'flow', id: 'dysphagia-pharyngeal' },
        },
        {
          tone: 'orange',
          label: ' OESOPHAGEAL (regurgitation)',
          sublabel: 'Passive regurgitation of undigested food/saliva · weight loss · high aspiration risk',
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
        '<strong>Aspiration pneumonia</strong> — thoracic radiographs (minimum 3 views) in EVERY dysphagic patient to catch megaoesophagus and aspiration; protect the airway and withhold oral feeding in severe pharyngeal/oesophageal dysfunction',
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
            { label: ' DENTAL / ORONASAL DISEASE', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
            { label: ' SALIVARY MUCOCELE / SIALOCELE', link: { to: 'disease', id: 'DIS-GI-SIALOCELE' } },
            { label: ' Oral mass / FB / trauma — tumour · stick FB · TMJ / retrobulbar abscess', link: { to: 'disease', id: 'DIS-DENT-ORAFB' } },
          ],
        },
        {
          cat: 'Neuromuscular (CN / Muscle)',
          tone: 'violet',
          tiles: [
            { label: ' MASTICATORY MYOSITIS — jaw muscles, 2M antibody', link: { to: 'disease', id: 'DIS-NEU-MMM' } },
            { label: ' CN V / VII / XII DYSFUNCTION — dropped jaw · facial paresis · tongue paresis', link: { to: 'disease', id: 'DIS-NEU-TRIGEMINAL' } },
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
            { label: ' Pharyngeal mass / neoplasia — tonsillar swelling · retropharyngeal LN · abscess', link: { to: 'disease', id: 'DIS-NEO-ORAL-SCC' } },
            { label: ' Pharyngeal FB / trauma — nasopharyngeal polyp · hyoid disruption · elongated soft palate', link: { to: 'disease', id: 'DIS-DENT-ORAFB' } },
          ],
        },
        {
          cat: 'Neuromuscular',
          tone: 'teal',
          tiles: [
            { label: ' CRICOPHARYNGEAL ACHALASIA / DYSSYNCHRONY — young dog at weaning · VFSS-defined · myotomy', link: { to: 'disease', id: 'DIS-NEU-CRICOPHARYNGEAL' } },
            { label: ' MYASTHENIA GRAVIS (focal)', link: { to: 'disease', id: 'DIS-WK-MG' } },
            { label: ' POLYRADICULONEURITIS', link: { to: 'disease', id: 'DIS-NEU-POLYRADIC' } },
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
            { label: ' OESOPHAGEAL FOREIGN BODY', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
            { label: ' STRICTURE', link: { to: 'disease', id: 'DIS-OES-STRICT' } },
            { label: ' VASCULAR RING ANOMALY (PRAA)', link: { to: 'disease', id: 'DIS-OES-VRA' } },
          ],
        },
        {
          cat: 'Motility / Inflammatory',
          tone: 'teal',
          tiles: [
            { label: ' MEGAOESOPHAGUS', link: { to: 'disease', id: 'DIS-OES-MEGA' } },
            { label: ' OESOPHAGITIS', link: { to: 'disease', id: 'DIS-OES-ITIS' } },
            { label: ' MYASTHENIA GRAVIS', link: { to: 'disease', id: 'DIS-WK-MG' } },
            { label: ' DYSAUTONOMIA', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
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
