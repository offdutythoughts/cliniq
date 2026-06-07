// ── Weight Loss flowchart ────────────────────────────────────────────────────
// First confirm TRUE weight loss (serial weights, >5% over <12 mo) and that the
// diet is adequate in quality and quantity (Ettinger Ch 18). Then the PIVOT is
// APPETITE: weight loss WITH normal/↑ appetite (calorie loss/malassimilation or
// hypermetabolism) vs weight loss WITH ↓ appetite (chronic organ disease,
// neoplasia/cachexia, chronic infection). Links into the relevant disease pages.

import type { FlowPage } from '../flowTypes'

export const weightLossFlow: FlowPage = {
  id: 'weight-loss',
  title: 'Weight Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: '⚖️ WEIGHT LOSS' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>FIRST confirm it is TRUE weight loss</strong> — compare recorded serial weights; <strong>~5% body weight over &lt;12 months</strong> warrants investigation. <strong>THEN confirm the diet is adequate</strong> in quality AND quantity (rule out underfeeding, poor-quality food, competition / limited access). Only then work the case up. (Ettinger Ch 18)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'WHAT IS THE APPETITE?',
      sub: 'The appetite is the pivot: weight loss DESPITE a normal/increased appetite (calories are lost or unusable, or metabolism is high) vs weight loss WITH a reduced appetite (overlaps anorexia — chronic organ disease, cancer, chronic infection). (Ettinger Ch 18)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🍽️ NORMAL / ↑ APPETITE',
          tone: 'teal',
          sub: 'Eating well (often ravenous) yet losing weight → calories lost or not utilised (maldigestion / malabsorption / glucosuria) OR hypermetabolism. (Ettinger Ch 18)',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'MALASSIMILATION vs HYPERMETABOLISM / GLUCOSE LOSS?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'MALDIGESTION / MALABSORPTION (± GI signs)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '💩', label: 'EXOCRINE PANCREATIC INSUFFICIENCY', sublabel: 'Large-volume malodorous soft stools · polyphagia · ↓TLI', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-EPI' } },
                        { icon: '🔥', label: 'INFLAMMATORY BOWEL DISEASE', sublabel: 'Chronic enteropathy — malabsorption', tone: 'green', link: { to: 'disease', id: 'DIS-GI-IBD' } },
                        { icon: '🧬', label: 'GI / ALIMENTARY LYMPHOMA', sublabel: 'Infiltrative — esp. older cat', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
                        { icon: '🟡', label: 'PROTEIN-LOSING ENTEROPATHY', sublabel: 'Lymphangiectasia — ↓albumin & globulin', tone: 'warning', link: { to: 'disease', id: 'DIS-GI-PLE' } },
                        { icon: '🪱', label: 'GI parasites', sublabel: 'Young / unknown deworming → faecal + deworming trial', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'HYPERMETABOLISM / GLUCOSE LOSS',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🐱', label: 'FELINE HYPERTHYROIDISM', sublabel: 'Older cat · ↑metabolic rate · palpable cervical mass · PU/PD', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
                        { icon: '🍬', label: 'DIABETES MELLITUS', sublabel: 'PU/PD + polyphagia · glucosuria = calorie loss', tone: 'info', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
                        { icon: '🚨', label: 'DIABETIC KETOACIDOSIS', sublabel: 'Decompensated DM — sick, often inappetent', tone: 'danger', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '😞 REDUCED APPETITE',
          tone: 'violet',
          sub: 'Eating poorly + losing weight → overlaps anorexia. Chronic organ disease, neoplasia / paraneoplastic cachexia, or chronic infection drives an inflammatory / cachectic state. (Ettinger Ch 18)',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'CHRONIC ORGAN DISEASE vs NEOPLASIA vs CHRONIC INFECTION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'CHRONIC ORGAN DISEASE / CACHEXIA',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫘', label: 'CHRONIC KIDNEY DISEASE', sublabel: 'Uraemia → nausea, ulceration, ↓appetite · PU/PD', tone: 'orange', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
                        { icon: '🟤', label: 'CHRONIC HEPATIC DISEASE', sublabel: 'Chronic hepatitis — gradual weight loss', tone: 'warning', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
                        { icon: '❤️', label: 'CARDIAC CACHEXIA (DCM)', sublabel: 'CHF from cardiomyopathy → muscle wasting (dogs)', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
                        { icon: '🪱', label: 'HEARTWORM DISEASE', sublabel: 'Chronic — exercise intolerance, wasting', tone: 'info', link: { to: 'disease', id: 'DIS-CARD-HW' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'NEOPLASIA / PARANEOPLASTIC',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧬', label: 'LYMPHOMA', sublabel: 'Commonest — generalised lymphadenopathy', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
                        { icon: '⚠️', label: 'PARANEOPLASTIC CACHEXIA', sublabel: 'IL-1/IL-6/TNF-α → muscle + adipose loss', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'CHRONIC INFECTION (esp. cat)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🐈', label: 'FIV', sublabel: 'Chronic — wasting, recurrent infection', tone: 'purple', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
                        { icon: '🐈‍⬛', label: 'FeLV', sublabel: 'Chronic — wasting, cytopenias, neoplasia', tone: 'purple', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
                        { icon: '💧', label: 'FIP', sublabel: 'Young cat · pyrexia · effusion · wasting', tone: 'indigo', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
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
        '<strong onclick="renderDiseasePage(\'DIS-ENDO-HYPERTHY\')" style="cursor:pointer;text-decoration:underline;">Feline hyperthyroidism</strong> — older cat losing weight WITH a good appetite; always run a basal TT4',
        '<strong>Diabetes mellitus / DKA</strong> — PU/PD + polyphagia + weight loss; a sick inappetent diabetic may be in ketoacidosis (emergency)',
        '<strong onclick="renderDiseasePage(\'DIS-GI-LYMP\')" style="cursor:pointer;text-decoration:underline;">GI / alimentary lymphoma</strong> — infiltrative weight loss, especially in the older cat with normal-to-poor appetite',
        '<strong>Cardiac cachexia</strong> — weight + muscle loss in a patient with underlying heart disease (DCM / CHF) is a marker of poor prognosis',
        '<strong>FIV / FeLV</strong> — retroviral status changes the differential and prognosis in any cat with chronic wasting',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'weight-loss' } },
        { label: '💧 PU/PD — overlapping endocrine approach', link: { to: 'flow', id: 'pupd' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Feline hyperthyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
        { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
        { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
        { label: 'Hyperadrenocorticism (Cushing\'s)', link: { to: 'disease', id: 'DIS-PUPD-HAC' } },
        { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
        { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
        { label: 'GI / alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
        { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
        { label: 'Pancreatitis (cat)', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
        { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
        { label: 'Chronic hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
        { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
        { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
        { label: 'Lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
        { label: 'Paraneoplastic cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
        { label: 'FIV', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
        { label: 'FeLV', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
        { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
      ],
    },
  ],
}
