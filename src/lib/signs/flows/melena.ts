// ── Melena / Haematochezia flowchart ─────────────────────────────────────────
// GI bleeding. First decision mirrors the source split (Ettinger Ch 50):
// MELENA (digested black/tarry blood — UPPER GI / small intestine) vs
// HAEMATOCHEZIA (fresh bright-red blood — LOWER GI / colon-rectum-anus).
// Before localising, exclude SWALLOWED blood (sinonasal/oral/pulmonary) and a
// systemic COAGULOPATHY. Links into the GI disease pages (DIS-GI-*) and the
// vomiting flow.

import type { FlowPage } from '../flowTypes'

export const melenaFlow: FlowPage = {
  id: 'melena',
  title: 'Melena / Haematochezia',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💩 MELENA / HAEMATOCHEZIA' },

    {
      kind: 'callout',
      tone: 'warning',
      html: '⚠️ <strong>Characterise the blood first.</strong> <strong>Melena</strong> = black, tarry, digested blood from the UPPER GI / small intestine (≥50–100 mL blood must be swallowed before stool turns melanic). <strong>Haematochezia</strong> = bright-red fresh blood from the LOWER GI / colon-rectum-anus. Always exclude <strong>swallowed blood</strong> (sinonasal, oral/pharyngeal, pulmonary lesions, raw diet) and a <strong>systemic coagulopathy</strong> before localising. (Ettinger Ch 50)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS BLOOD — AND FROM WHERE?',
      sub: 'Confirm it is blood (not charcoal / iron / bismuth / blueberries → melena mimic; or beets / red dye → haematochezia mimic), exclude swallowed blood + coagulopathy, then localise by the stool appearance',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '⚫ MELENA — UPPER GI / small intestine',
          tone: 'danger',
          sub: 'Black tarry digested stool · ± vomiting / haematemesis · BUN:Cr >30 (>27:1 well-hydrated) supports upper GI bleed',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'GASTRODUODENAL ULCER vs OTHER UPPER-GI CAUSE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'GASTRODUODENAL ULCERATION / EROSION',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '💊', label: 'NSAID / STEROID ULCER', sublabel: 'Drug-induced — commonest cause; NSAIDs, corticosteroids (esp. combined)', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-ULC' } },
                        { icon: '🧬', label: 'MAST-CELL TUMOUR / GASTRINOMA', sublabel: 'Paraneoplastic acid hypersecretion (histamine / gastrin) → ulcer', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-ULC' } },
                        { icon: '🩺', label: 'Hepatic / renal disease', sublabel: 'Portal hypertension / PSS · uraemic gastropathy — text only', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'OTHER SMALL-INTESTINAL / UPPER-GI',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🩸', label: 'AHDS (raspberry-jam)', sublabel: 'Acute haemorrhagic diarrhoea syndrome — sudden bloody stool ± shock', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
                        { icon: '🦠', label: 'PARVOVIRUS', sublabel: 'Young / unvaccinated · neutropenia · fetid bloody diarrhoea', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
                        { icon: '🪱', label: 'PARASITES', sublabel: 'Hookworm (Ancylostoma / Uncinaria), Spirocerca, Physaloptera', tone: 'green', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
                        { icon: '🧫', label: 'NEOPLASIA / IBD', sublabel: 'Adenocarcinoma · GIST · alimentary lymphoma · chronic enteropathy', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
                        { icon: '🦠', label: 'Helicobacter gastritis', sublabel: 'GHLO — pathogenic role debated', tone: 'teal', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🔴 HAEMATOCHEZIA — LOWER GI / colon-rectum-anus',
          tone: 'orange',
          sub: 'Bright-red fresh blood · ± mucus / tenesmus / frequent small-volume stools · normal appetite often preserved',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'COLITIS vs MASS / ANAL-SAC DISEASE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'COLITIS / INFLAMMATORY',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🔥', label: 'IDIOPATHIC / IBD COLITIS', sublabel: 'Large-bowel diarrhoea · mucus · tenesmus', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
                        { icon: '🪱', label: 'WHIPWORM (Trichuris)', sublabel: 'Weight loss + haematochezia; can mimic Addison (pseudo-Addison)', tone: 'green', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
                        { icon: '🐕', label: 'GRANULOMATOUS COLITIS', sublabel: 'Boxer / French Bulldog (AIEC) — enrofloxacin 5 mg/kg PO q12h × 6–8 wk', tone: 'teal', link: { to: 'disease', id: 'DIS-GI-GRANCOL' } },
                        { icon: '🦠', label: 'Clostridial / Campylobacter / Salmonella', sublabel: 'Infectious colitis — faecal PCR/culture', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'MASS / ANORECTAL',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🧬', label: 'COLORECTAL NEOPLASIA / POLYP', sublabel: 'Adenocarcinoma · polyp · lymphoma · plasmacytoma', tone: 'violet', link: { to: 'disease', id: 'DIS-GI-CRC' } },
                        { icon: '💢', label: 'ANAL-SAC DISEASE / AGASACA', sublabel: 'Anal-sac abscess (haematochezia mimic) · apocrine gland anal-sac adenocarcinoma ± hypercalcaemia', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
                        { icon: '🚽', label: 'Perineal / anorectal lesion', sublabel: 'Surface blood only → anorectal; bite wound · stricture — text only', tone: 'neutral' },
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
        '<strong onclick="renderDiseasePage(\'DIS-BD-ROD\')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide / coagulopathy</strong> — thrombocytopenia, DIC, factor deficiency; run a coagulation panel before scoping/biopsy; give Vitamin K1 empirically if access suspected',
        '<strong onclick="renderDiseasePage(\'DIS-SEC-HYPO\')" style="cursor:pointer;text-decoration:underline;">Hypoadrenocorticism (Addison)</strong> — GI bleed + bradycardia / waterhammer collapse + Na:K abnormalities; whipworm can mimic the same electrolyte picture',
        '<strong onclick="renderDiseasePage(\'DIS-GI-SEPTPERIT\')" style="cursor:pointer;text-decoration:underline;">GI perforation / septic peritonitis</strong> — perforated ulcer or tumour; abdominal pain, fever, septic abdominal effusion = surgical emergency',
        '<strong>Significant blood-loss anaemia</strong> — melena alone can equal major haemorrhage; quantify with PCV/TS and transfuse symptomatic patients before GA for endoscopy',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'melena' } },
        { label: '🤮 Vomiting / haematemesis flowchart', link: { to: 'flow', id: 'vomiting' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Gastroduodenal ulceration / erosion', link: { to: 'disease', id: 'DIS-GI-ULC' } },
        { label: 'Acute haemorrhagic diarrhoea syndrome (AHDS)', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
        { label: 'Parvoviral enteritis', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
        { label: 'Helicobacter-associated gastritis', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
        { label: 'Inflammatory bowel disease / chronic enteropathy', link: { to: 'disease', id: 'DIS-GI-IBD' } },
        { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
        { label: 'Idiopathic / IBD colitis', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
        { label: 'Whipworm (Trichuris vulpis)', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
        { label: 'Granulomatous (histiocytic ulcerative) colitis', link: { to: 'disease', id: 'DIS-GI-GRANCOL' } },
        { label: 'Colorectal neoplasia / polyp', link: { to: 'disease', id: 'DIS-GI-CRC' } },
        { label: 'Anal-sac adenocarcinoma (AGASACA)', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
        { label: 'Transitional cell carcinoma (TCC)', link: { to: 'disease', id: 'DIS-NEO-TCC' } },
        { label: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' } },
        { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
        { label: 'DIC', link: { to: 'disease', id: 'DIS-BD-DIC' } },
        { label: 'GI perforation / septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
      ],
    },
  ],
}
