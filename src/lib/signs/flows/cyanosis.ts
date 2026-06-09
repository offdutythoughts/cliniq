// ── Cyanosis flowchart ───────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

export const cyanosisFlow: FlowPage = {
  id: 'cyanosis',
  title: 'Cyanosis',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🫁 CYANOSIS' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>EMERGENCY — give oxygen first, localise second.</strong> Needs ≥5 g/dL deoxygenated Hb — severely anaemic patients may <em>not</em> look cyanotic even at critically low SaO2. Methaemoglobinaemia = <strong>chocolate-brown blood</strong>, normal PaO2, pulse-ox falsely ~85%. (Ettinger Ch 27)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'IS IT CENTRAL, PERIPHERAL OR DYSHAEMOGLOBINAEMIA?',
      sub: 'Central = blue mucosa throughout, low SaO2 · Peripheral = distal extremities only, normal SaO2 · MetHb = normal PaO2, brown blood, pulse-ox ~85%',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔵 CENTRAL — respiratory',
          tone: 'info',
          sub: 'Generalised cyanosis + respiratory distress · low SaO2 · responds (at least partly) to O2',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'WHERE IN THE RESPIRATORY TREE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  header: 'AIRWAY / PARENCHYMA',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🌬️', label: 'UPPER-AIRWAY OBSTRUCTION', sublabel: 'BOAS · laryngeal paralysis · tracheal collapse', tone: 'orange', link: { to: 'disease', id: 'DIS-RESP-BOAS' } },
                        { icon: '🗣️', label: 'LARYNGEAL PARALYSIS', sublabel: 'Inspiratory stridor · large-breed older dog', tone: 'orange', link: { to: 'disease', id: 'DIS-LP' } },
                        { icon: '🌀', label: 'TRACHEAL COLLAPSE', sublabel: 'Goose-honk · toy breed', tone: 'orange', link: { to: 'disease', id: 'DIS-RESP-TRACOLL' } },
                        { icon: '🐱', label: 'FELINE ASTHMA', sublabel: 'Expiratory wheeze · bronchoconstriction', tone: 'teal', link: { to: 'disease', id: 'DIS-RESP-ASTHMA' } },
                        { icon: '🦠', label: 'PNEUMONIA', sublabel: 'Bacterial / aspiration · oedema · ARDS', tone: 'warning', link: { to: 'disease', id: 'DIS-RESP-BACPNEU' } },
                        { icon: '🧬', label: 'PULMONARY NEOPLASIA', sublabel: 'Primary or metastatic', tone: 'violet', link: { to: 'disease', id: 'DIS-RESP-PULMNEO' } },
                      ],
                    },
                  ],
                },
                {
                  header: 'PLEURAL SPACE / VASCULAR',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🪡', label: 'PLEURAL EFFUSION / PYOTHORAX', sublabel: 'Muffled sounds — THORACOCENTESIS is Dx + Tx', tone: 'danger', link: { to: 'disease', id: 'DIS-PYOTHORAX' } },
                        { icon: '💨', label: 'PNEUMOTHORAX', sublabel: 'Tension form = collapse — tap to decompress', tone: 'danger', link: { to: 'disease', id: 'DIS-RESP-PNX' } },
                        { icon: '🕳️', label: 'DIAPHRAGMATIC HERNIA', sublabel: 'Trauma · viscera in thorax', tone: 'warning', link: { to: 'disease', id: 'DIS-RESP-DH' } },
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
          sub: 'Cyanosis does NOT improve with O2 · secondary erythrocytosis · differential cyanosis (caudal blue, cranial pink) = reverse PDA',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🔀', label: 'REVERSE (R→L) PDA', sublabel: 'Caudal blue, cranial pink; worse on exercise', tone: 'violet' },
                { icon: '🫀', label: 'TETRALOGY OF FALLOT', sublabel: 'VSD + pulmonic stenosis + overriding aorta + RVH', tone: 'violet' },
                { icon: '⚡', label: 'EISENMENGER / VSD-ASD + PHTN', sublabel: 'L→R shunt reverses as pulmonary resistance rises', tone: 'violet' },
                { icon: '🫀', label: 'Underlying heart failure', sublabel: 'MVD / DCM → pulmonary oedema', tone: 'neutral', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
              ],
            },
          ],
        },
        {
          header: '🟤 METHAEMOGLOBIN / PERIPHERAL',
          tone: 'warning',
          sub: 'MetHb: normal PaO2, brown blood, pulse-ox ~85% · Peripheral: normal SaO2, distal extremities only',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'BROWN BLOOD vs POOR PERFUSION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  header: 'METHAEMOGLOBINAEMIA',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🟤', label: 'OXIDANT TOXICOSIS', sublabel: 'Paracetamol · benzocaine · nitrate · skunk musk → brown blood', tone: 'warning', link: { to: 'protocol', id: 'PROT-TOX-METHB' } },
                        { icon: '🧬', label: 'Hereditary metHb', sublabel: 'Cytochrome-b5 reductase deficiency — mild, chronic', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  header: 'PERIPHERAL — poor perfusion',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🩻', label: 'AORTIC THROMBOEMBOLISM', sublabel: 'Cat · acute pain · pulseless cold cyanotic limbs', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
                        { icon: '🩸', label: 'SHOCK / HYPOTENSION', sublabel: 'Hypovolaemic / cardiogenic / distributive', tone: 'danger', link: { to: 'flow', id: 'pale-mm' } },
                        { icon: '🧊', label: 'Hypothermia / vasoconstriction', sublabel: 'Distal extremities · normal SaO2', tone: 'neutral' },
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
  ],
}
