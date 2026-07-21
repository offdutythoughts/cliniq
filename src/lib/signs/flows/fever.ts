// ── Fever / Fever of Unknown Origin (FUO) flowchart ──────────────────────────
import type { FlowPage } from '../flowTypes'

const feverEntry: FlowPage = {
  id: 'fever',
  title: 'Fever / FUO',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' FEVER / FUO' },
    {
      kind: 'callout',
      tone: 'danger',
      html: ' <strong>TRUE FEVER vs HYPERTHERMIA — decide first.</strong> Fever (pyrexia) is a <strong>regulated</strong>, pyrogen-mediated rise in the hypothalamic set point — the animal does NOT seek to cool. Hyperthermia (heatstroke, exercise, seizures, stress, drugs) raises core temperature WITHOUT a set-point change — the animal pants, vasodilates and seeks cool. <strong>Do NOT actively cool a true fever</strong> — fever improves the host immune response. Reserve active cooling for temperature &gt;41.1°C (106°F), which is far more likely with hyperthermia (Ettinger Ch 16).',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS REGULATED FEVER OR HYPERTHERMIA?',
      sub: 'No cooling behaviour + lethargy / anorexia / stiffness / hyperpnea = fever · recent heat / exercise + panting / cold-seeking = hyperthermia · stressed clinic patient: rest 20 min in a cool room (healthy dogs/cats reach 39.7°C / 103.5°F in consult)',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' TRUE FEVER — find the cause',
          sublabel: 'FUO = temp >39.2°C for ≥3 weeks, no cause after ≥3 visits; screen INFECTIOUS · IMMUNE-MEDIATED · NEOPLASTIC',
          link: { to: 'flow', id: 'fever-true' },
        },
        {
          tone: 'warning',
          label: ' HYPERTHERMIA — non-pyrogenic',
          sublabel: 'Heatstroke · exercise · seizures · stress · drugs — ACTIVELY COOL if >41.1°C (106°F)',
          link: { to: 'flow', id: 'fever-hyperthermia' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Do NOT immunosuppress before excluding infection</strong> — steroids only once an immune-mediated diagnosis is established; complete the systematic fever work-up first (Ettinger Ch 16)',
        '<strong>Occult septic focus</strong> — abscess (subcutaneous, liver, prostate, lung, tooth root, CNS), pyometra/stump, pyothorax, septic peritonitis — search systematically before calling it FUO',
        { bold: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' }, html: ' — palpate the whole spine; only ~30% are febrile and radiographs lag 2–6 weeks behind clinical onset' },
        '<strong>Endocarditis</strong> — a new/changing murmur with fever needs blood cultures + echocardiography (only 40–43% are febrile)',
        '<strong>Do NOT actively cool a true fever</strong> — reserve cooling for temperature &gt;41.1°C (106°F), almost always hyperthermia',
      ],
    },

  ],
}

const feverTrue: FlowPage = {
  id: 'fever-true',
  title: 'Fever — Find the Cause',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' TRUE FEVER — find the cause', sub: 'FUO = temp >39.2°C (102.5°F) for ≥3 weeks, no cause after ≥3 visits and/or 3 days hospitalisation (CBC, biochem, UA) ± persisting after a 5–10 day antibacterial trial. Do the systematic work-up BEFORE steroids.' },
    { kind: 'node', variant: 'step', text: 'INFECTIOUS · IMMUNE-MEDIATED · NEOPLASTIC?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Infectious',
          tone: 'danger',
          tiles: [
            { label: ' VECTOR-BORNE DISEASE', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: ' DISCOSPONDYLITIS', link: { to: 'disease', id: 'DIS-DISCO' } },
            { label: ' Bacterial endocarditis — new murmur + fever; blood cultures + echo', link: { to: 'disease', id: 'DIS-CARD-IE' } },
            { label: ' SEPTIC PERITONITIS', link: { to: 'protocol', id: 'PROT-SEPSIS' } },
            { label: ' PYELONEPHRITIS', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
            { label: ' PROSTATITIS', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
            { label: ' FIP (young cat)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: ' SYSTEMIC FUNGAL', link: { to: 'disease', id: 'DIS-INFECT-BLASTO' } },
          ],
        },
        {
          cat: 'Immune-Mediated',
          tone: 'info',
          tiles: [
            { label: ' IMMUNE-MEDIATED POLYARTHRITIS', link: { to: 'disease', id: 'DIS-IMPA' } },
            { label: ' SRMA', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: ' SLE', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: ' IMHA / IMTP — immune-mediated cytopenias also cause fever', link: { to: 'disease', id: 'DIS-BD-IMHA' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: ' LYMPHOMA / LEUKAEMIA', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: ' PARANEOPLASTIC FEVER', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: ' Histiocytic disease — Bernese Mountain Dog predisposition', link: { to: 'disease', id: 'DIS-NEO-HSARC' } },
          ],
        },
      ],
    },
  ],
}

const feverHyperthermia: FlowPage = {
  id: 'fever-hyperthermia',
  title: 'Hyperthermia — non-pyrogenic',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' HYPERTHERMIA — non-pyrogenic', sub: 'Heatstroke · exercise (Labradors reach 42.2°C / 108°F) · seizures · hypermetabolic (hyperthyroid, hypocalcaemia) · drugs (opioids, ketamine/phenobarbital in cats, SSRIs) · stress. ACTIVELY COOL if >41.1°C (106°F).' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Environmental / Exertional',
          tone: 'danger',
          tiles: [
            { label: ' HEATSTROKE — cool to 39.4°C then stop', link: { to: 'protocol', id: 'PROT-HEATSTROKE' } },
            { label: ' EXERTIONAL / ENVIRONMENTAL — exercise in heat · overweight · upper-airway compromise', link: { to: 'protocol', id: 'PROT-HEATSTROKE' } },
          ],
        },
        {
          cat: 'Neurological / Metabolic',
          tone: 'warning',
          tiles: [
            {
              label: ' SEIZURES / TREMORS — sustained muscle activity → temperature rise',
              links: [
                { label: 'Seizures', link: { to: 'flow', id: 'seizures' } },
                { label: 'Tremors', link: { to: 'flow', id: 'tremors' } },
              ],
            },
            {
              label: ' HYPERMETABOLIC — hyperthyroid · hypocalcaemia',
              links: [
                { label: 'Hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
                { label: 'Hypocalcaemia (tremors)', link: { to: 'flow', id: 'tremors' } },
              ],
            },
          ],
        },
        {
          cat: 'Miscellaneous',
          tone: 'slate',
          tiles: [
            { label: ' STRESS HYPERTHERMIA — clinic/handling; rest 20 min, re-measure', terminal: true },
          ],
        },
      ],
    },
  ],
}

export const feverFlows: FlowPage[] = [feverEntry, feverTrue, feverHyperthermia]
