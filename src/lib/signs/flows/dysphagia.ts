// ── Dysphagia / Gagging flowchart ────────────────────────────────────────────
// Swallowing impairment is a clinical finding, not a diagnosis. First separate
// DYSPHAGIA / REGURGITATION (swallowing problem) from true VOMITING (active,
// centrally-mediated, with nausea + abdominal effort). Then localise along the
// swallow: ORAL (prehension/mastication) → PHARYNGEAL/cricopharyngeal → OESOPHAGEAL.
// Don't-miss: MG-associated megaoesophagus → aspiration; rabies in the dysphagic
// unvaccinated patient; oesophageal foreign body. (Ettinger Ch 47)

import type { FlowPage } from '../flowTypes'

export const dysphagiaFlow: FlowPage = {
  id: 'dysphagia',
  title: 'Dysphagia / Gagging',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🍽️ DYSPHAGIA / GAGGING' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>First: is this a swallowing problem or true vomiting?</strong> Dysphagia/regurgitation = <em>passive</em> expulsion of food from the pharynx/oesophagus — head down, material falls out, no nausea or abdominal effort. <strong>Vomiting</strong> is an <em>active</em> centrally-mediated reflex with prodromal nausea, retching and abdominal contractions; bile indicates a patent gastric outflow. Regurgitation is uncommon in cats — assume vomiting in a cat unless proven otherwise. <strong>Aspiration pneumonia is the major lethal complication</strong> — oesophageal disease (megaoesophagus 71% of that group) and neurologic disease are the leading risk factors. (Ettinger Ch 47)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE ALONG THE SWALLOW',
      sub: 'Where does it break down — prehension/mastication (ORAL) · transfer through the upper sphincter (PHARYNGEAL / cricopharyngeal) · or transport down the oesophagus (OESOPHAGEAL → regurgitation)? Watch the patient eat. (Ettinger Ch 47)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '👄 ORAL (prehension / mastication)',
          tone: 'teal',
          sub: 'Drops food · drools · pain on opening mouth · pawing at face · head-tilting to chew · ptyalism · tongue/jaw weakness',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'MECHANICAL vs FUNCTIONAL (CN)?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'MECHANICAL (pain / mass)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦷', label: 'DENTAL / ORONASAL DISEASE', sublabel: 'Periodontal disease · oral pain · oronasal fistula', tone: 'orange', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
                        { icon: '💧', label: 'SALIVARY MUCOCELE / SIALOCELE', sublabel: 'Sublingual/pharyngeal swelling · ptyalism', tone: 'info', link: { to: 'disease', id: 'DIS-GI-SIALOCELE' } },
                        { icon: '🧬', label: 'Oral mass / FB / trauma', sublabel: 'Tumour · stick FB · TMJ / retrobulbar abscess', tone: 'violet' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'FUNCTIONAL (cranial nerve / muscle)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '😬', label: 'MASTICATORY MYOSITIS', sublabel: 'Painful/swollen → atrophied jaw muscles · 2M antibody', tone: 'warning' },
                        { icon: '🧠', label: 'CN V / VII / XII DYSFUNCTION', sublabel: 'Dropped jaw · facial paresis · tongue paresis', tone: 'purple' },
                        { icon: '🧪', label: 'Lingual / polymyositis · trigeminal neuritis', sublabel: 'Glossitis · IMPA', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🗣️ PHARYNGEAL / CRICOPHARYNGEAL',
          tone: 'indigo',
          sub: 'Repeated swallowing attempts · gagging · coughing/nasal reflux during eating · the bolus won\'t clear the throat · ↓ gag reflex (CN IX/X)',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'MECHANICAL vs FUNCTIONAL (CN IX/X / asynchrony)?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'MECHANICAL (mass / obstruction)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧬', label: 'Pharyngeal mass / neoplasia', sublabel: 'Tonsillar swelling · retropharyngeal LN · abscess', tone: 'violet' },
                        { icon: '🌾', label: 'Pharyngeal FB / trauma', sublabel: 'Nasopharyngeal polyp · hyoid disruption · elongated soft palate', tone: 'orange' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'FUNCTIONAL (neuromuscular)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '👶', label: 'CRICOPHARYNGEAL ACHALASIA / DYSSYNCHRONY', sublabel: 'Young dog at weaning · Cocker / Golden · VFSS-defined · myotomy', tone: 'teal' },
                        { icon: '⚡', label: 'MYASTHENIA GRAVIS (focal)', sublabel: 'Pharyngeal/laryngeal weakness · ± megaoesophagus → aspiration', tone: 'danger', link: { to: 'disease', id: 'DIS-WK-MG' } },
                        { icon: '🦠', label: 'POLYRADICULONEURITIS', sublabel: 'LMN tetraparesis · ± dysphonia / dysphagia', tone: 'purple', link: { to: 'disease', id: 'DIS-NEU-POLYRADIC' } },
                        { icon: '🧠', label: 'Brainstem lesion (CN IX/X nucleus)', sublabel: 'Tumour · GOLPP · ± other CN deficits', tone: 'violet', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🌀 OESOPHAGEAL (regurgitation)',
          tone: 'orange',
          sub: 'Passive regurgitation of undigested food/saliva · cervical oesophageal distension · variable timing after eating · weight loss · high aspiration risk',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'MECHANICAL vs FUNCTIONAL (motility)?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'MECHANICAL (obstruction)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦴', label: 'OESOPHAGEAL FOREIGN BODY', sublabel: 'Acute · bone/chew · emergency endoscopic retrieval', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
                        { icon: '⛓️', label: 'STRICTURE', sublabel: 'Post-anaesthetic reflux · post-FB · balloon dilation', tone: 'warning', link: { to: 'disease', id: 'DIS-GI-STRICTURE' } },
                        { icon: '🫀', label: 'VASCULAR RING ANOMALY (PRAA)', sublabel: 'Young pup at weaning · regurg of solids · GSD / Irish Setter', tone: 'info', link: { to: 'disease', id: 'DIS-GI-PRAA' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'FUNCTIONAL (motility / inflammation)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🎈', label: 'MEGAOESOPHAGUS', sublabel: 'Primary (idiopathic/hereditary) OR secondary (MG, hypothyroid, hypoadreno, lead)', tone: 'danger', link: { to: 'disease', id: 'DIS-OES-MEGA' } },
                        { icon: '🔥', label: 'OESOPHAGITIS', sublabel: 'GERD · post-anaesthetic reflux · caustic — odynophagia', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-ESOPHAGITIS' } },
                        { icon: '⚡', label: 'MYASTHENIA GRAVIS', sublabel: 'Megaoesophagus in 84% of dogs / 40% of cats with generalised MG', tone: 'danger', link: { to: 'disease', id: 'DIS-WK-MG' } },
                        { icon: '🌡️', label: 'DYSAUTONOMIA', sublabel: 'Diffuse autonomic failure · ± mydriasis, dry MM, bradycardia', tone: 'purple', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong onclick="renderDiseasePage(\'DIS-WK-MG\')" style="cursor:pointer;text-decoration:underline;">MG-associated megaoesophagus</strong> — megaoesophagus in 84% of dogs / 40% of cats with generalised MG; aspiration pneumonia is the leading cause of death. Run an AChR antibody titre in any acquired megaoesophagus',
        '<strong onclick="renderDiseasePage(\'DIS-INFECT-RABIES\')" style="cursor:pointer;text-decoration:underline;">Rabies</strong> — pharyngeal dysphagia / inability to swallow with hypersalivation in an unvaccinated or potentially exposed patient is a zoonotic emergency: isolate and handle as a notifiable disease',
        '<strong onclick="renderDiseasePage(\'DIS-GI-OESFB\')" style="cursor:pointer;text-decoration:underline;">Oesophageal foreign body</strong> — acute onset, retching, hypersalivation; needs prompt endoscopic removal before perforation, stricture or aspiration',
        '<strong>Aspiration pneumonia</strong> — thoracic radiographs (minimum 3 views) in EVERY dysphagic patient to catch megaoesophagus and aspiration; protect the airway and withhold oral feeding in severe pharyngeal/oesophageal dysfunction',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'dysphagia' } },
        { label: '🤮 Vomiting — is it actually vomiting? localisation flowchart', link: { to: 'flow', id: 'vomiting' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Megaoesophagus', link: { to: 'disease', id: 'DIS-OES-MEGA' } },
        { label: 'Oesophageal foreign body', link: { to: 'disease', id: 'DIS-GI-OESFB' } },
        { label: 'Oesophagitis', link: { to: 'disease', id: 'DIS-GI-ESOPHAGITIS' } },
        { label: 'Oesophageal stricture', link: { to: 'disease', id: 'DIS-GI-STRICTURE' } },
        { label: 'Vascular ring anomaly (PRAA)', link: { to: 'disease', id: 'DIS-GI-PRAA' } },
        { label: 'Salivary mucocele / sialocele', link: { to: 'disease', id: 'DIS-GI-SIALOCELE' } },
        { label: 'Dental / oronasal disease', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
        { label: 'Myasthenia gravis', link: { to: 'disease', id: 'DIS-WK-MG' } },
        { label: 'Dysautonomia', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
        { label: 'Polyradiculoneuritis', link: { to: 'disease', id: 'DIS-NEU-POLYRADIC' } },
        { label: 'Brain tumour (brainstem CN nuclei)', link: { to: 'disease', id: 'DIS-NEU-BRAINTUM' } },
        { label: 'Rabies', link: { to: 'disease', id: 'DIS-INFECT-RABIES' } },
      ],
    },
  ],
}
