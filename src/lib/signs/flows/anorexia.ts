// ── Anorexia / Hyporexia flowchart ───────────────────────────────────────────
// Anorexia is a non-specific sign of almost ANY systemic illness (Ettinger Ch 17).
// First decision mirrors the chapter's key initial step: PSEUDO-anorexia (the
// patient WANTS to eat but physically can't — oral/dental/pharyngeal/neuromuscular)
// vs TRUE anorexia (reduced appetite from systemic disease, pain or nausea).
// TRUE anorexia is then sorted system-by-system. An anorexic CAT is an emergency
// (hepatic lipidosis after ≥2 days NEB) — feed early. Links into the GI/hepatic/
// renal/endocrine/neoplastic/infectious disease pages, plus vomiting + jaundice.

import type { FlowPage } from '../flowTypes'

export const anorexiaFlow: FlowPage = {
  id: 'anorexia',
  title: 'Anorexia / Hyporexia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🍽️ ANOREXIA / HYPOREXIA' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>FIRST: can\'t eat vs won\'t eat?</strong> Always rule out <strong>PSEUDO-anorexia</strong> (the animal is hungry but physically unable — oral/dental pain, mass, pharyngeal/oesophageal or jaw/neuromuscular disease) before chasing systemic causes. Hyporexia = inadequate calories; anorexia = complete absence of voluntary intake (Ettinger Ch 17).',
    },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🐈 <strong>An anorexic CAT is an emergency.</strong> Anorexia of ≥2–14 days drives negative energy balance → <strong>feline hepatic lipidosis</strong> (especially the overweight cat). Do not just prescribe an appetite stimulant — <strong>feed early</strong> (assisted/tube feeding) once an animal is eating &lt;RER for &gt;3–5 days (Ettinger Ch 17 / Ch 274).',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CAN\'T EAT (pseudo-anorexia) vs WON\'T EAT (true anorexia)?',
      sub: 'Watch the patient approach food: interested/prehends but drops it / paws at mouth / gulps painfully = pseudo-anorexia; ignores or turns away from food = true anorexia',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🦷 PSEUDO-ANOREXIA — wants to but can\'t',
          tone: 'orange',
          sub: 'Drops food · drooling / halitosis · pain on prehension or swallowing · pawing at mouth · jaw can\'t close · gags / regurgitates',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🦷', label: 'ORAL / DENTAL / ORONASAL DISEASE', sublabel: 'Periodontal / periapical disease · fractured tooth · oronasal fistula · oral mass', tone: 'orange', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
                { icon: '🧬', label: 'ORAL / PHARYNGEAL NEOPLASIA', sublabel: 'Oral / pharyngeal / oesophageal mass — mechanical', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
                { icon: '😬', label: 'Jaw / neuromuscular disease', sublabel: 'Masticatory myositis · TMJ disease · mandibular fracture · trigeminal neuritis · retrobulbar disease', tone: 'neutral' },
                { icon: '🤮', label: 'Oesophageal disease → regurgitation', sublabel: 'Megaoesophagus / obstruction — open the vomiting vs regurgitation flow', tone: 'teal', link: { to: 'flow', id: 'vomiting' } },
              ],
            },
          ],
        },
        {
          header: '🩺 TRUE ANOREXIA — won\'t eat (by system)',
          tone: 'info',
          sub: 'Reduced appetite from systemic illness, pain or nausea · screen every body system · pain & nausea are easily missed',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'SEARCH SYSTEM-BY-SYSTEM', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'GI · HEPATOBILIARY · PANCREAS',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🔥', label: 'PANCREATITIS', sublabel: 'Cat: anorexia/lethargy > vomiting · Dog: acute pain', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
                        { icon: '🌽', label: 'GI FOREIGN BODY', sublabel: 'Obstruction — vomiting, pain', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-FB' } },
                        { icon: '🔬', label: 'IBD / CHRONIC ENTEROPATHY', sublabel: 'Chronic GI signs · weight loss', tone: 'green', link: { to: 'disease', id: 'DIS-GI-IBD' } },
                        { icon: '🐈', label: 'FELINE HEPATIC LIPIDOSIS', sublabel: 'Anorexic icteric overweight cat — FEED EARLY', tone: 'danger', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
                        { icon: '🟡', label: 'Hepatobiliary disease', sublabel: 'Chronic hepatitis · cholestasis — open jaundice flow', tone: 'warning', link: { to: 'flow', id: 'jaundice' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'RENAL · ENDOCRINE · METABOLIC',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫘', label: 'URAEMIA (CKD / AKI)', sublabel: 'Uraemic nausea — commonest cause of feline anorexia', tone: 'info', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
                        { icon: '🍬', label: 'DIABETIC KETOACIDOSIS', sublabel: 'PU/PD → anorexia, vomiting, ketotic breath', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
                        { icon: '🧂', label: 'HYPOADRENOCORTICISM', sublabel: 'The great pretender — waxing/waning anorexia ± collapse', tone: 'danger', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
                        { icon: '🦴', label: 'HYPERCALCAEMIA', sublabel: 'Anorexia, PU/PD, weakness — hunt for the cause', tone: 'warning', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'INFECT / INFLAMM · NEOPLASTIC · PAIN / CNS',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦠', label: 'SEPSIS / SEPTIC PERITONITIS', sublabel: 'SIRS · acute febrile anorexia — find & drain the source', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
                        { icon: '🐱', label: 'FIP', sublabel: 'Young cat · fever · effusion · weight loss', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
                        { icon: '🧬', label: 'NEOPLASIA / LYMPHOMA', sublabel: 'GI / multicentric · weight loss', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
                        { icon: '📉', label: 'PARANEOPLASTIC / CACHEXIA', sublabel: 'Cytokine-driven appetite loss & muscle wasting', tone: 'purple', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
                        { icon: '😣', label: 'Occult pain · nausea · CNS / behavioural', sublabel: 'OA · chronic pain · drugs (opioids, NSAIDs, chemo) · stress / food aversion · cognitive dysfunction', tone: 'neutral' },
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
        '<strong onclick="renderDiseasePage(\'DIS-HEP-LIPIDOSIS\')" style="cursor:pointer;text-decoration:underline;">Feline hepatic lipidosis</strong> — an anorexic (especially overweight) cat is an emergency; provide assisted nutrition EARLY rather than relying on appetite stimulants alone',
        '<strong>Occult pain & nausea</strong> — osteoarthritis, dental disease, FLUTD, otitis, maladaptive pain — and uraemic/drug-induced nausea are commonly overlooked, treatable causes',
        '<strong onclick="renderDiseasePage(\'DIS-SEC-HYPO\')" style="cursor:pointer;text-decoration:underline;">Hypoadrenocorticism</strong> — the great pretender; vague waxing/waning anorexia ± GI signs, electrolytes may be the only clue (ACTH stimulation test)',
        '<strong>Sepsis / SIRS</strong> — acute febrile anorexia with a deteriorating patient demands a hunt for (and source control of) infection',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'anorexia' } },
        { label: '🤢 Vomiting — true vomit vs regurgitation', link: { to: 'flow', id: 'vomiting' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Oral / dental / oronasal disease', link: { to: 'disease', id: 'DIS-DENT-ORONASAL' } },
        { label: 'Pancreatitis (cat)', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
        { label: 'Pancreatitis (dog)', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
        { label: 'GI foreign body', link: { to: 'disease', id: 'DIS-GI-FB' } },
        { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
        { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
        { label: 'Feline hepatic lipidosis', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
        { label: 'Chronic hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
        { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
        { label: 'Acute kidney injury', link: { to: 'disease', id: 'DIS-SEC-AKI' } },
        { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
        { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
        { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
        { label: 'Lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
        { label: 'Paraneoplastic syndromes / cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
        { label: 'Feline infectious peritonitis (FIP)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
        { label: 'Septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
      ],
    },
  ],
}
