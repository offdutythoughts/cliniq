// ── Melena / Haematochezia flowchart ─────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const melenaEntry: FlowPage = {
  id: 'melena',
  title: 'Melena / Haematochezia',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' MELENA / HAEMATOCHEZIA' },
    {
      kind: 'callout',
      tone: 'warning',
      html: ' <strong>Characterise the blood first.</strong> <strong>Melena</strong> = black, tarry, digested blood from the UPPER GI / small intestine (≥50–100 mL blood must be swallowed before stool turns melanic). <strong>Haematochezia</strong> = bright-red fresh blood from the LOWER GI / colon-rectum-anus. Always exclude <strong>swallowed blood</strong> (sinonasal, oral/pharyngeal, pulmonary lesions, raw diet) and a <strong>systemic coagulopathy</strong> before localising. (Ettinger Ch 50)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THIS BLOOD — AND FROM WHERE?',
      sub: 'Confirm it is blood (not charcoal / iron / bismuth / blueberries → melena mimic; or beets / red dye → haematochezia mimic), exclude swallowed blood + coagulopathy, then localise by the stool appearance',
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'danger',
          label: ' MELENA — UPPER GI / small intestine',
          sublabel: 'Black tarry digested stool · ± vomiting / haematemesis · BUN:Cr >30 supports upper GI bleed',
          link: { to: 'flow', id: 'melena-upper' },
        },
        {
          tone: 'orange',
          label: ' HAEMATOCHEZIA — LOWER GI / colon-rectum-anus',
          sublabel: 'Bright-red fresh blood · ± mucus / tenesmus · normal appetite often preserved',
          link: { to: 'flow', id: 'melena-lower' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: ' ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong onclick="renderDiseasePage(\'DIS-BD-ROD\')" style="cursor:pointer;text-decoration:underline;">Anticoagulant rodenticide / coagulopathy</strong> — thrombocytopenia, DIC, factor deficiency; run a coagulation panel before scoping/biopsy; give Vitamin K1 empirically if access suspected',
        '<strong onclick="renderDiseasePage(\'DIS-SEC-HYPO\')" style="cursor:pointer;text-decoration:underline;">Hypoadrenocorticism (Addison)</strong> — GI bleed + bradycardia / waterhammer collapse + Na:K abnormalities; whipworm can mimic the same electrolyte picture',
        '<strong onclick="renderDiseasePage(\'DIS-GI-SEPTPERIT\')" style="cursor:pointer;text-decoration:underline;">GI perforation / septic peritonitis</strong> — perforated ulcer or tumour; abdominal pain, fever, septic abdominal effusion = surgical emergency',
        '<strong>Significant blood-loss anaemia</strong> — melena alone can equal major haemorrhage; quantify with PCV/TS and transfuse symptomatic patients before GA for endoscopy',
      ],
    },

  ],
}

const melenaUpper: FlowPage = {
  id: 'melena-upper',
  title: 'Melena — Upper GI / Small Intestine',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' MELENA — UPPER GI / small intestine', sub: 'Black tarry digested stool · ± vomiting / haematemesis · BUN:Cr >30 (>27:1 well-hydrated) supports upper GI bleed' },
    { kind: 'node', variant: 'step', text: 'GASTRODUODENAL ULCER vs OTHER UPPER-GI CAUSE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Gastroduodenal Ulceration',
          tone: 'orange',
          tiles: [
            { label: ' NSAID / STEROID ULCER', link: { to: 'disease', id: 'DIS-GI-ULC' } },
            { label: ' MAST-CELL TUMOUR / GASTRINOMA', link: { to: 'disease', id: 'DIS-GI-ULC' } },
            { label: ' Hepatic / renal disease — portal hypertension / PSS · uraemic gastropathy', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
          ],
        },
        {
          cat: 'Infectious / Parasitic',
          tone: 'danger',
          tiles: [
            { label: ' AHDS (raspberry-jam)', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
            { label: ' PARVOVIRUS', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
            { label: ' PARASITES — hookworm, Spirocerca, Physaloptera', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
            { label: ' Helicobacter gastritis', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
          ],
        },
        {
          cat: 'Neoplastic / Inflammatory',
          tone: 'violet',
          tiles: [
            { label: ' NEOPLASIA / IBD — adenocarcinoma · GIST · alimentary lymphoma · chronic enteropathy', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
          ],
        },
      ],
    },
  ],
}

const melenaLower: FlowPage = {
  id: 'melena-lower',
  title: 'Haematochezia — Lower GI',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' HAEMATOCHEZIA — LOWER GI / colon-rectum-anus', sub: 'Bright-red fresh blood · ± mucus / tenesmus / frequent small-volume stools · normal appetite often preserved' },
    { kind: 'node', variant: 'step', text: 'COLITIS vs MASS / ANAL-SAC DISEASE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Infectious / Inflammatory',
          tone: 'danger',
          tiles: [
            { label: ' IDIOPATHIC / IBD COLITIS', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
            { label: ' WHIPWORM (Trichuris)', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
            { label: ' GRANULOMATOUS COLITIS', link: { to: 'disease', id: 'DIS-GI-GRANCOL' } },
            { label: ' Clostridial / Campylobacter / Salmonella — faecal PCR/culture', link: { to: 'disease', id: 'DIS-INFECT-CAMPYLO' } },
          ],
        },
        {
          cat: 'Neoplastic / Mass',
          tone: 'violet',
          tiles: [
            { label: ' COLORECTAL NEOPLASIA / POLYP', link: { to: 'disease', id: 'DIS-GI-CRC' } },
            { label: ' ANAL-SAC DISEASE / AGASACA', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
            { label: ' Perineal / anorectal lesion — surface blood only; bite wound · stricture' },
          ],
        },
      ],
    },
  ],
}

export const melenaFlows: FlowPage[] = [melenaEntry, melenaUpper, melenaLower]
