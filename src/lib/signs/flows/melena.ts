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
      subItems: [
        'Confirm it is blood — charcoal, iron, bismuth and blueberries mimic melena; beets and red dye mimic haematochezia',
        'Exclude swallowed blood and coagulopathy',
        'Then localise by the stool appearance',
      ],
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
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        { bold: 'Anticoagulant rodenticide / coagulopathy', link: { to: 'disease', id: 'DIS-BD-ROD' }, html: ' — thrombocytopenia, DIC, factor deficiency; run a coagulation panel before scoping/biopsy; give Vitamin K1 empirically if access suspected' },
        { bold: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' }, html: ' — GI bleed + bradycardia / waterhammer collapse + Na:K abnormalities; whipworm can mimic the same electrolyte picture' },
        { bold: 'GI perforation / septic peritonitis', link: { to: 'disease', id: 'DIS-SHOCK-SEPTIC' }, html: ' — perforated ulcer or tumour; abdominal pain, fever, septic abdominal effusion = surgical emergency' },
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
    { kind: 'node', variant: 'step', text: 'CATEGORISE THE UPPER-GI CAUSE' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Inflammatory',
          tiles: [
            { label: 'Gastric ulceration', link: { to: 'disease', id: 'DIS-GI-ULC' } },
            { label: 'Chronic enteropathy (IBD)', link: { to: 'disease', id: 'DIS-GI-IBD' } },
          ],
        },
        {
          cat: 'Metabolic',
          tiles: [
            { label: 'Hepatic disease (PSS / portal hypertension)', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
            { label: 'Renal disease (uraemic gastropathy)', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
          ],
        },
        {
          cat: 'Infectious / Parasitic',
          tone: 'danger',
          tiles: [
            { label: 'AHDS (raspberry-jam)', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
            { label: 'Parvovirus', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
            { label: ' Helicobacter gastritis', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
            { label: 'Parasites', link: { to: 'flow', id: 'gi-parasites' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Adenocarcinoma', link: { to: 'disease', id: 'DIS-GI-ADENO' } },
            { label: 'GIST / leiomyosarcoma', link: { to: 'disease', id: 'DIS-GI-GIST' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Mast cell tumour', link: { to: 'disease', id: 'DIS-NEO-MCT' } },
            { label: 'Gastrinoma', link: { to: 'disease', id: 'DIS-ENDO-GASTRINOMA' } },
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
          cat: 'Inflammatory',
          tiles: [
            { label: 'Idiopathic / IBD colitis', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
            { label: 'Granulomatous colitis', link: { to: 'disease', id: 'DIS-GI-GRANCOL' } },
          ],
        },
        {
          cat: 'Infectious / Parasitic',
          tone: 'danger',
          tiles: [
            { label: 'Clostridial / Campylobacter / Salmonella', link: { to: 'disease', id: 'DIS-INFECT-CAMPYLO' } },
            { label: 'Parasites', link: { to: 'flow', id: 'gi-parasites' } },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Colorectal neoplasia / polyp', link: { to: 'disease', id: 'DIS-GI-CRC' } },
            { label: 'Anal-sac disease / AGASACA', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
            { label: ' Perineal / anorectal lesion — surface blood only; bite wound · stricture', terminal: true },
          ],
        },
      ],
    },
  ],
}

export const melenaFlows: FlowPage[] = [melenaEntry, melenaUpper, melenaLower]
