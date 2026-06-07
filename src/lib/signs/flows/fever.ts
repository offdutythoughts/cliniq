// ── Fever / Fever of Unknown Origin (FUO) flowchart ──────────────────────────
// First decision mirrors the source algorithm: is this a TRUE FEVER (regulated,
// pyrogen-mediated set-point rise) or HYPERTHERMIA (non-pyrogenic — heatstroke,
// exercise, seizures, stress)? You actively cool hyperthermia, NOT a true fever.
// Once fever is confirmed and first-line work-up is unrewarding → FUO; localise
// across the big categories: INFECTIOUS / IMMUNE-MEDIATED / NEOPLASTIC.
// Numbers transcribed from Ettinger Ch 16 (Fever).

import type { FlowPage } from '../flowTypes'

export const feverFlow: FlowPage = {
  id: 'fever',
  title: 'Fever / FUO',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🌡️ FEVER / FUO' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🌡️ <strong>TRUE FEVER vs HYPERTHERMIA — decide first.</strong> Fever (pyrexia) is a <strong>regulated</strong>, pyrogen-mediated rise in the hypothalamic set point — the animal does NOT seek to cool. Hyperthermia (heatstroke, exercise, seizures, stress, drugs) raises core temperature WITHOUT a set-point change — the animal pants, vasodilates and seeks cool. <strong>Do NOT actively cool a true fever</strong> — fever improves the host immune response. Reserve active cooling for temperature &gt;41.1°C (106°F), which is far more likely with hyperthermia (Ettinger Ch 16).',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS REGULATED FEVER OR HYPERTHERMIA?',
      sub: 'No cooling behaviour + lethargy / anorexia / stiffness / hyperpnea = fever · recent heat / exercise + panting / cold-seeking = hyperthermia · stressed clinic patient: rest 20 min in a cool room (healthy dogs/cats reach 39.7°C / 103.5°F in consult)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔥 TRUE FEVER — find the cause',
          tone: 'danger',
          sub: 'FUO = temp >39.2°C (102.5°F) for ≥3 weeks, no cause after ≥3 visits and/or 3 days hospitalisation (CBC, biochem, UA) ± persisting after a 5–10 day antibacterial trial. Do the systematic work-up BEFORE steroids.',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'INFECTIOUS · IMMUNE-MEDIATED · NEOPLASTIC?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'INFECTIOUS — vector-borne · bacterial focus · fungal · viral',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦟', label: 'VECTOR-BORNE DISEASE', sublabel: 'Ehrlichia · Anaplasma · Lyme · RMSF · Bartonella — test by geography', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
                        { icon: '🦴', label: 'DISCOSPONDYLITIS', sublabel: 'Spinal pain + fever — only ~30% febrile; UTI is commonest source; screen Brucella', tone: 'danger', link: { to: 'disease', id: 'DIS-DISCO' } },
                        { icon: '❤️‍🩹', label: 'Bacterial endocarditis', sublabel: 'New murmur + fever — only 40–43% febrile; blood cultures + echo', tone: 'danger' },
                        { icon: '💧', label: 'SEPTIC PERITONITIS', sublabel: 'Occult abdominal focus — abdominal effusion glucose/lactate', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
                        { icon: '🧫', label: 'PYELONEPHRITIS', sublabel: 'Painful kidneys + active sediment — culture urine', tone: 'orange', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
                        { icon: '🔴', label: 'PROSTATITIS', sublabel: 'Entire male · painful prostate · bacteriuria', tone: 'orange', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
                        { icon: '🐱', label: 'FIP (young cat)', sublabel: 'FCoV — 20.8% of all feline FUO; low A:G, hyperglobulinaemia', tone: 'teal', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
                        { icon: '🍄', label: 'SYSTEMIC FUNGAL', sublabel: 'Blasto · Cocci · Histo — by region', tone: 'green', link: { to: 'disease', id: 'DIS-INFECT-BLASTO' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'IMMUNE-MEDIATED — steroid-responsive (commonest dog category)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦴', label: 'IMMUNE-MEDIATED POLYARTHRITIS', sublabel: 'Shifting lameness · joint pain · stiff gait — arthrocentesis multiple joints', tone: 'indigo', link: { to: 'disease', id: 'DIS-IMPA' } },
                        { icon: '🧠', label: 'SRMA', sublabel: 'Young dog · severe neck pain · neutrophilic CSF — 60% of juvenile inflammatory fevers', tone: 'indigo', link: { to: 'disease', id: 'DIS-SRMA' } },
                        { icon: '🦋', label: 'SLE', sublabel: 'Polysystemic immune-mediated — multi-organ', tone: 'purple', link: { to: 'disease', id: 'DIS-IM-SLE' } },
                        { icon: '🩸', label: 'IMHA / IMTP', sublabel: 'Immune-mediated cytopenias also cause fever', tone: 'orange' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'NEOPLASTIC — paraneoplastic / necrotic tumour',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧬', label: 'LYMPHOMA / LEUKAEMIA', sublabel: 'Lymphoproliferative disease — node/marrow aspirate', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
                        { icon: '📈', label: 'PARANEOPLASTIC FEVER', sublabel: 'Cytokine-driven; any necrotic or infected tumour', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
                        { icon: '🐕', label: 'Histiocytic disease', sublabel: 'Bernese Mountain Dog predisposition', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '☀️ HYPERTHERMIA — non-pyrogenic',
          tone: 'warning',
          sub: 'Heatstroke · exercise (Labradors reach 42.2°C / 108°F) · seizures · hypermetabolic (hyperthyroid, hypocalcaemia) · drugs (opioids, ketamine/phenobarbital in cats, SSRIs) · stress. ACTIVELY COOL if >41.1°C (106°F).',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🥵', label: 'HEATSTROKE', sublabel: 'Core >40°C (104°F) + neuro impairment + multi-organ dysfunction — cool to 39.4°C then stop', tone: 'danger' },
                { icon: '🏃', label: 'EXERTIONAL / ENVIRONMENTAL', sublabel: 'Exercise in heat · overweight · upper-airway compromise', tone: 'warning' },
                { icon: '⚡', label: 'SEIZURES / TREMORS', sublabel: 'Sustained muscle activity → non-pyrogenic temperature rise', tone: 'warning' },
                { icon: '😾', label: 'STRESS HYPERTHERMIA', sublabel: 'Clinic/handling — rest 20 min in a cool room, re-measure', tone: 'neutral' },
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
        '<strong>Do NOT immunosuppress before excluding infection</strong> — steroids only once an immune-mediated diagnosis is established; complete the systematic fever work-up first (Ettinger Ch 16)',
        '<strong>Occult septic focus</strong> — abscess (subcutaneous, liver, prostate, lung, tooth root, CNS), pyometra/stump, pyothorax, septic peritonitis — search systematically before calling it FUO',
        '<strong onclick="renderDiseasePage(\'DIS-DISCO\')" style="cursor:pointer;text-decoration:underline;">Discospondylitis</strong> — palpate the whole spine; only ~30% are febrile and radiographs lag 2–6 weeks behind clinical onset',
        '<strong>Endocarditis</strong> — a new/changing murmur with fever needs blood cultures + echocardiography (only 40–43% are febrile)',
        '<strong>Do NOT actively cool a true fever</strong> — reserve cooling for temperature &gt;41.1°C (106°F), almost always hyperthermia',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'fever' } },
        { label: '🦴 Swollen joints — polyarthritis localisation', link: { to: 'dx', id: 'swollen-joints' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
        { label: 'Anaplasmosis', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
        { label: 'Lyme disease / borreliosis', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
        { label: 'Rocky Mountain spotted fever', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
        { label: 'Bartonellosis', link: { to: 'disease', id: 'DIS-INFECT-BART' } },
        { label: 'Leptospirosis', link: { to: 'disease', id: 'DIS-INFECT-LEPTO' } },
        { label: 'Toxoplasmosis', link: { to: 'disease', id: 'DIS-INFECT-TOXO' } },
        { label: 'Leishmaniosis', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
        { label: 'Brucellosis', link: { to: 'disease', id: 'DIS-INFECT-BRUC' } },
        { label: 'Coccidioidomycosis', link: { to: 'disease', id: 'DIS-INFECT-COCCI' } },
        { label: 'Blastomycosis', link: { to: 'disease', id: 'DIS-INFECT-BLASTO' } },
        { label: 'Histoplasmosis', link: { to: 'disease', id: 'DIS-INFECT-HISTO' } },
        { label: 'Feline infectious peritonitis (FIP)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
        { label: 'Feline leukaemia virus (FeLV)', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
        { label: 'Feline immunodeficiency virus (FIV)', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
        { label: 'Cytauxzoonosis', link: { to: 'disease', id: 'DIS-INFECT-CYTAUX' } },
        { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
        { label: 'Septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
        { label: 'Cholangitis / cholangiohepatitis', link: { to: 'disease', id: 'DIS-HEP-CHOLANGITIS' } },
        { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
        { label: 'Prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
        { label: 'Immune-mediated polyarthritis', link: { to: 'disease', id: 'DIS-IMPA' } },
        { label: 'Steroid-responsive meningitis-arteritis (SRMA)', link: { to: 'disease', id: 'DIS-SRMA' } },
        { label: 'Systemic lupus erythematosus (SLE)', link: { to: 'disease', id: 'DIS-IM-SLE' } },
        { label: 'Lymphoma / leukaemia', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
        { label: 'Paraneoplastic syndromes', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
      ],
    },
  ],
}
