// ── Fever / Fever of Unknown Origin (FUO) flowchart ──────────────────────────
import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

const feverEntry: FlowPage = {
  id: 'fever',
  title: 'Fever / FUO',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' FEVER / FUO' },
    // No "fever vs hyperthermia" paragraph above the split: the step's bullets
    // are the behaviour to observe and the two cards carry the mechanism, so a
    // box restating both would be read twice and age separately from them.
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS REGULATED FEVER OR HYPERTHERMIA?',
      subItems: [
        'No cooling behaviour + lethargy / anorexia / stiffness / hyperpnea = fever',
        'Recent heat or exercise + panting / cold-seeking = hyperthermia',
        'Stressed clinic patient: rest 20 min in a cool room — healthy dogs and cats reach 39.7°C / 103.5°F in consult',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' TRUE FEVER — find the cause',
          link: { to: 'flow', id: 'fever-true' },
        },
        {
          tone: 'warning',
          label: ' HYPERTHERMIA — non-pyrogenic',
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
        '<strong>Do NOT actively cool a true fever</strong> — the regulated rise aids the host immune response; reserve active cooling for temperature &gt;41.1°C (106°F), which is almost always hyperthermia (Ettinger Ch 16)',
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
          tiles: [
            { label: 'Vector-borne disease', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
            { label: 'Bacterial endocarditis', link: { to: 'disease', id: 'DIS-CARD-IE' } },
            { label: 'Septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
            { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
            { label: 'Prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
            { label: ' FIP (young cat)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: 'Systemic fungal', link: { to: 'disease', id: 'DIS-INFECT-BLASTO' } },
          ],
        },
        {
          cat: 'Immune-mediated',
          tiles: [
            { label: 'Immune-mediated polyarthritis', link: { to: 'disease', id: 'DIS-IMPA' } },
            { label: 'SRMA', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: ' SLE', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: 'IMHA / IMTP', link: { to: 'disease', id: 'DIS-BD-IMHA' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Lymphoma / leukaemia', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Paraneoplastic fever', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: 'Histiocytic disease', link: { to: 'disease', id: 'DIS-NEO-HSARC' } },
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
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Environmental / Exertional',
          tone: 'danger',
          tiles: [
            { label: 'Heatstroke', link: { to: 'disease', id: 'DIS-ENV-HEAT' } },
          ],
        },
        {
          cat: 'Neurological',
          tiles: [
            { label: 'Seizures', link: { to: 'flow', id: 'seizures' } },
            { label: 'Tremors', link: { to: 'flow', id: 'tremors' } },
          ],
        },
        {
          // No `tone` → picks up the shared CAT_STYLE "Metabolic / Endocrine" colour.
          cat: 'Metabolic / Endocrine',
          tiles: [
            { label: 'Hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
            { label: 'Hypocalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HYPOPTH' } },
          ],
        },
        {
          cat: 'Miscellaneous',
          tone: 'slate',
          tiles: [
            { label: 'Stress hyperthermia', terminal: true },
          ],
        },
      ],
    },
  ],
}

export const feverFlows: FlowPage[] = [feverEntry, feverTrue, feverHyperthermia]
