// ── Cyanosis flowchart ───────────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

const cyanosisEntry: FlowPage = {
  id: 'cyanosis',
  title: 'Cyanosis',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' CYANOSIS' },
    {
      kind: 'callout',
      tone: 'danger',
      html: ' <strong>EMERGENCY — give oxygen first, localise second.</strong> Needs ≥5 g/dL deoxygenated Hb — severely anaemic patients may <em>not</em> look cyanotic even at critically low SaO2. Methaemoglobinaemia = <strong>chocolate-brown blood</strong>, normal PaO2, pulse-ox falsely ~85%. (Ettinger Ch 27)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS IT CENTRAL, PERIPHERAL OR DYSHAEMOGLOBINAEMIA?',
      subItems: [
        'Central = blue mucosa throughout, low SaO2',
        'Peripheral = distal extremities only, normal SaO2',
        'MetHb = normal PaO2, brown blood, pulse-ox ~85%',
      ],
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'info',
          label: ' CENTRAL — respiratory',
          sublabel: 'Generalised cyanosis + respiratory distress · low SaO2 · responds (at least partly) to O2',
          link: { to: 'flow', id: 'cyanosis-central' },
        },
        {
          tone: 'violet',
          label: ' CARDIAC R→L SHUNT',
          sublabel: 'Cyanosis does NOT improve with O2 · secondary erythrocytosis · differential cyanosis',
          link: { to: 'flow', id: 'cyanosis-cardiac' },
        },
        {
          tone: 'warning',
          label: ' METHAEMOGLOBIN / PERIPHERAL',
          sublabel: 'MetHb: normal PaO2, brown blood, pulse-ox ~85% · Peripheral: normal SaO2, distal extremities only',
          link: { to: 'flow', id: 'cyanosis-methb' },
        },
      ],
    },
  ],
}

const cyanosisCentral: FlowPage = {
  id: 'cyanosis-central',
  title: 'Cyanosis — Central Respiratory',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' CENTRAL — respiratory', sub: 'Generalised cyanosis + respiratory distress · low SaO2 · responds (at least partly) to O2' },
    { kind: 'node', variant: 'step', text: 'WHERE IN THE RESPIRATORY TREE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Airway Obstruction',
          tone: 'orange',
          tiles: [
            { label: 'Upper-airway obstruction', link: { to: 'disease', id: 'DIS-RESP-BOAS' } },
            { label: 'Laryngeal paralysis', link: { to: 'disease', id: 'DIS-LP' } },
            { label: 'Tracheal collapse', link: { to: 'disease', id: 'DIS-RESP-TRACOLL' } },
          ],
        },
        {
          cat: 'Parenchymal / Infectious',
          tone: 'danger',
          tiles: [
            { label: 'Feline asthma', link: { to: 'disease', id: 'DIS-RESP-ASTHMA' } },
            { label: 'Pneumonia', link: { to: 'disease', id: 'DIS-RESP-BACPNEU' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Pulmonary neoplasia', link: { to: 'disease', id: 'DIS-RESP-PULMNEO' } },
          ],
        },
        {
          cat: 'Pleural Space / Vascular',
          tone: 'danger',
          tiles: [
            { label: 'Pleural effusion / pyothorax', link: { to: 'disease', id: 'DIS-PYOTHORAX' } },
            { label: 'Pneumothorax', link: { to: 'disease', id: 'DIS-RESP-PNX' } },
            { label: 'Diaphragmatic hernia', link: { to: 'disease', id: 'DIS-RESP-DH' } },
            { label: 'Pulmonary hypertension', link: { to: 'disease', id: 'DIS-RESP-PHTN' } },
            { label: 'Pulmonary thromboembolism', link: { to: 'disease', id: 'DIS-RESP-PTE' } },
          ],
        },
      ],
    },
  ],
}

const cyanosisCardiac: FlowPage = {
  id: 'cyanosis-cardiac',
  title: 'Cyanosis — Cardiac R→L Shunt',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' CARDIAC R→L SHUNT', sub: 'Cyanosis does NOT improve with O2 · secondary erythrocytosis · differential cyanosis (caudal blue, cranial pink) = reverse PDA' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Congenital Shunt',
          tone: 'violet',
          tiles: [
            { label: 'Reverse (R→L) PDA', link: { to: 'disease', id: 'DIS-CARD-PDA' } },
            { label: 'Tetralogy of Fallot', link: { to: 'disease', id: 'DIS-CARD-TOF' } },
            { label: 'Eisenmenger / reverse VSD-ASD', link: { to: 'disease', id: 'DIS-CARD-VSD' } },
          ],
        },
        {
          cat: 'Underlying Heart Failure',
          tone: 'danger',
          tiles: [
            { label: 'MMVD', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: ' DCM', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
          ],
        },
      ],
    },
  ],
}

const cyanosisMethb: FlowPage = {
  id: 'cyanosis-methb',
  title: 'Cyanosis — Methaemoglobin / Peripheral',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' METHAEMOGLOBIN / PERIPHERAL', sub: 'MetHb: normal PaO2, brown blood, pulse-ox ~85% · Peripheral: normal SaO2, distal extremities only' },
    { kind: 'node', variant: 'step', text: 'BROWN BLOOD vs POOR PERFUSION?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Methaemoglobinaemia',
          tone: 'warning',
          tiles: [
            { label: 'Acquired — oxidant toxicosis (most common)', link: { to: 'disease', id: 'DIS-TOX-METHB' } },
            { label: 'Hereditary methaemoglobinaemia', link: { to: 'disease', id: 'DIS-RESP-METHAEM' } },
          ],
        },
        {
          cat: 'Peripheral — Poor Perfusion',
          tone: 'danger',
          tiles: [
            { label: 'Aortic thromboembolism', link: { to: 'disease', id: 'DIS-CARD-ATE' } },
            { label: 'Shock / hypotension', link: { to: 'flow', id: 'pale-mm' } },
            { label: ' Hypothermia / vasoconstriction — distal extremities, normal SaO2', terminal: true },
          ],
        },
      ],
    },
  ],
}

export const cyanosisFlows: FlowPage[] = [
  cyanosisEntry,
  cyanosisCentral,
  cyanosisCardiac,
  cyanosisMethb,
]
