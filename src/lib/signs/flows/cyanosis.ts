// ── Cyanosis flowchart ───────────────────────────────────────────────────────
// Blue/dark mucosa from ≥5 g/dL deoxygenated haemoglobin (≈3 g/dL arterial) —
// so a severely anaemic patient may be too anaemic to LOOK cyanotic, while a
// polycythaemic one shows it early. This is an emergency: oxygen first, then
// localise. First split: CENTRAL (low SaO2 — respiratory or R→L cardiac shunt)
// vs PERIPHERAL (normal SaO2, poor perfusion) vs DYSHAEMOGLOBINAEMIA
// (methaemoglobinaemia — normal PaO2, chocolate-brown blood, pulse-ox unreliable).
// Links into the respiratory / cardiac disease pages and the emergency protocols.
// (Ettinger Ch 27)

import type { FlowPage } from '../flowTypes'

export const cyanosisFlow: FlowPage = {
  id: 'cyanosis',
  title: 'Cyanosis',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🫁 CYANOSIS' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>EMERGENCY — give oxygen first, localise second.</strong> Cyanosis needs <strong>≥5 g/dL deoxygenated haemoglobin</strong> (≈3 g/dL arterial), so a <strong>severely anaemic patient may NOT look cyanotic</strong> even at a critically low SaO2, while a polycythaemic one shows it early. Methaemoglobinaemia gives <strong>chocolate-brown blood</strong> with a <em>normal</em> PaO2 — and pulse-ox is unreliable (reads stuck ~85%). (Ettinger Ch 27)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'IS IT CENTRAL, PERIPHERAL OR DYSHAEMOGLOBINAEMIA?',
      sub: 'Central = blue mucosa + skin throughout, low SaO2 (respiratory or R→L shunt) · Peripheral = distal extremities only, normal SaO2 (poor perfusion) · Methaemoglobinaemia = normal PaO2, brown blood, pulse-ox falsely ~85%',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔵 CENTRAL — respiratory',
          tone: 'info',
          sub: 'Generalised cyanosis + respiratory distress · low SaO2 · V/Q mismatch is the commonest mechanism · responds (at least partly) to O2',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'WHERE IN THE RESPIRATORY TREE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'AIRWAY / PARENCHYMA',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🌬️', label: 'UPPER-AIRWAY OBSTRUCTION', sublabel: 'BOAS · laryngeal paralysis · tracheal collapse', tone: 'orange', link: { to: 'disease', id: 'DIS-RESP-BOAS' } },
                        { icon: '🗣️', label: 'LARYNGEAL PARALYSIS', sublabel: 'Inspiratory stridor · large-breed older dog', tone: 'orange', link: { to: 'disease', id: 'DIS-LP' } },
                        { icon: '🌀', label: 'TRACHEAL COLLAPSE', sublabel: 'Goose-honk cough · toy breed', tone: 'orange', link: { to: 'disease', id: 'DIS-RESP-TRACOLL' } },
                        { icon: '🐱', label: 'FELINE ASTHMA', sublabel: 'Expiratory wheeze · bronchoconstriction', tone: 'teal', link: { to: 'disease', id: 'DIS-RESP-ASTHMA' } },
                        { icon: '🦠', label: 'PNEUMONIA', sublabel: 'Bacterial / aspiration · oedema · ARDS', tone: 'warning', link: { to: 'disease', id: 'DIS-RESP-BACPNEU' } },
                        { icon: '🧬', label: 'PULMONARY NEOPLASIA', sublabel: 'Primary or metastatic parenchymal mass', tone: 'violet', link: { to: 'disease', id: 'DIS-RESP-PULMNEO' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'PLEURAL SPACE / VASCULAR',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🪡', label: 'PLEURAL EFFUSION / PYOTHORAX', sublabel: 'Muffled lung sounds — THORACOCENTESIS is Dx + Tx', tone: 'danger', link: { to: 'disease', id: 'DIS-PYOTHORAX' } },
                        { icon: '💨', label: 'PNEUMOTHORAX', sublabel: 'Tension form = collapse — tap to decompress', tone: 'danger', link: { to: 'disease', id: 'DIS-RESP-PNX' } },
                        { icon: '🕳️', label: 'DIAPHRAGMATIC HERNIA', sublabel: 'Trauma · abdominal viscera in thorax', tone: 'warning', link: { to: 'disease', id: 'DIS-RESP-DH' } },
                        { icon: '📈', label: 'PULMONARY HYPERTENSION', sublabel: 'Heartworm · chronic respiratory · L-CHD', tone: 'violet', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
                        { icon: '🩸', label: 'PULMONARY THROMBOEMBOLISM', sublabel: 'Acute hypoxaemia, often clear radiographs', tone: 'danger', link: { to: 'disease', id: 'DIS-RESP-PTE' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🫀 CARDIAC R→L SHUNT',
          tone: 'violet',
          sub: 'Cyanotic congenital heart disease · cyanosis does NOT improve with O2 · secondary erythrocytosis · differential cyanosis (caudal blue, cranial pink) = reverse PDA',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🔀', label: 'REVERSE (R→L) PDA', sublabel: 'Differential cyanosis — caudal mucosae blue, cranial pink; worse on exercise', tone: 'violet' },
                { icon: '🫀', label: 'TETRALOGY OF FALLOT', sublabel: 'VSD + pulmonic stenosis + overriding aorta + RVH', tone: 'violet' },
                { icon: '⚡', label: 'EISENMENGER / VSD-ASD + PHTN', sublabel: 'L→R shunt reverses once pulmonary resistance rises', tone: 'violet' },
                { icon: '🫀', label: 'Underlying heart failure', sublabel: 'MVD / DCM driving pulmonary oedema (central, not a shunt)', tone: 'neutral', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
              ],
            },
          ],
        },
        {
          header: '🟤 METHAEMOGLOBIN / PERIPHERAL',
          tone: 'warning',
          sub: 'Methaemoglobinaemia: normal PaO2, brown blood, pulse-ox falsely ~85% · Peripheral: normal SaO2, distal extremities only, poor perfusion',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'BROWN BLOOD vs POOR PERFUSION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'METHAEMOGLOBINAEMIA',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🟤', label: 'OXIDANT TOXICOSIS', sublabel: 'Paracetamol · benzocaine / local anaesthetic · nitrate/nitrite · skunk musk → spot test = brown blood', tone: 'warning', link: { to: 'protocol', id: 'PROT-TOX-METHB' } },
                        { icon: '🧬', label: 'Hereditary metHb', sublabel: 'Cytochrome-b5 reductase deficiency — mild, chronic, erythrocytosis', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'PERIPHERAL — poor perfusion',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🩻', label: 'AORTIC THROMBOEMBOLISM', sublabel: 'Cat · acute pain · pulseless cold cyanotic limbs', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
                        { icon: '🩸', label: 'SHOCK / HYPOTENSION', sublabel: 'Hypovolaemic / cardiogenic / distributive — restore perfusion', tone: 'danger', link: { to: 'flow', id: 'pale-mm' } },
                        { icon: '🧊', label: 'Hypothermia / vasoconstriction', sublabel: 'Distal extremities only · normal SaO2', tone: 'neutral' },
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
        '<strong>Tension pneumothorax or pleural effusion</strong> — muffled lung sounds + distress = <strong onclick="renderProtoDetail(\'PROT-THOR\')" style="cursor:pointer;text-decoration:underline;">thoracocentesis</strong> is both diagnostic and life-saving; do NOT wait for radiographs in a crashing patient',
        '<strong>Methaemoglobinaemia</strong> — chocolate-brown blood, normal PaO2, pulse-ox falsely reads ~85%, and <strong>O2 alone does not help</strong> (metHb cannot carry O2); spot test + methylene blue — see the <strong onclick="renderProtoDetail(\'PROT-TOX-METHB\')" style="cursor:pointer;text-decoration:underline;">metHb protocol</strong>',
        '<strong>Right-to-left cardiac shunt</strong> (reverse PDA, tetralogy) — cyanosis that does NOT improve with oxygen + secondary erythrocytosis; differential cyanosis (caudal blue, cranial pink) is pathognomonic for reverse PDA',
        '<strong>Severe anaemia masks cyanosis</strong> — an anaemic, hypoxaemic patient can look pink yet be critically hypoxic; trust SaO2 / ABG, not mucous-membrane colour alone',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'cyanosis' } },
        { label: '🫁 Respiratory distress / dyspnoea — localisation flowchart', link: { to: 'flow', id: 'dyspnoea' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Brachycephalic obstructive airway syndrome (BOAS)', link: { to: 'disease', id: 'DIS-RESP-BOAS' } },
        { label: 'Laryngeal paralysis', link: { to: 'disease', id: 'DIS-LP' } },
        { label: 'Tracheal collapse', link: { to: 'disease', id: 'DIS-RESP-TRACOLL' } },
        { label: 'Feline asthma', link: { to: 'disease', id: 'DIS-RESP-ASTHMA' } },
        { label: 'Bacterial pneumonia', link: { to: 'disease', id: 'DIS-RESP-BACPNEU' } },
        { label: 'Aspiration pneumonia', link: { to: 'disease', id: 'DIS-RESP-ASPPNEU' } },
        { label: 'Pulmonary neoplasia', link: { to: 'disease', id: 'DIS-RESP-PULMNEO' } },
        { label: 'Pyothorax / pleural effusion', link: { to: 'disease', id: 'DIS-PYOTHORAX' } },
        { label: 'Pneumothorax', link: { to: 'disease', id: 'DIS-RESP-PNX' } },
        { label: 'Diaphragmatic hernia', link: { to: 'disease', id: 'DIS-RESP-DH' } },
        { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
        { label: 'Pulmonary thromboembolism', link: { to: 'disease', id: 'DIS-RESP-PTE' } },
        { label: 'Mitral valve disease (MVD)', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
        { label: 'Dilated cardiomyopathy (DCM)', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
        { label: 'Aortic thromboembolism (ATE)', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
        { label: 'Methaemoglobinaemia / oxidant toxicosis protocol', link: { to: 'protocol', id: 'PROT-TOX-METHB' } },
        { label: 'Thoracocentesis protocol', link: { to: 'protocol', id: 'PROT-THOR' } },
        { label: 'Respiratory-distress stabilisation protocol', link: { to: 'protocol', id: 'PROT-RESP' } },
      ],
    },
  ],
}
