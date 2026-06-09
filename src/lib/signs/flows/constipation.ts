// ── Constipation / Tenesmus flowchart ────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

export const constipationFlow: FlowPage = {
  id: 'constipation',
  title: 'Constipation / Tenesmus',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💩 CONSTIPATION / TENESMUS' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>FIRST: straining to DEFECATE or URINATE?</strong> Tenesmus and <strong>stranguria</strong> look identical to an owner. Palpate the bladder — a blocked male cat straining unproductively is a <strong>hyperkalaemic emergency</strong>, not constipation. <strong>Obstipation</strong> = cannot defecate without intervention; recurrent → <strong>idiopathic megacolon</strong>. (Ettinger Ch 51)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRMED DEFECATION STRAINING — WHAT IS THE MECHANISM?',
      sub: 'Tenesmus precedes defecation in obstructive disease, follows it in inflammatory disease; rectal exam is key — pelvic canal, prostate, masses, stricture, anal sacs',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔴 OBSTRUCTIVE / INTRALUMINAL',
          tone: 'orange',
          sub: 'Impacted faeces · foreign material · intraluminal mass · stricture',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🪨', label: 'IMPACTED FAECES / DIETARY', sublabel: 'Pica (bones, hair, litter) · obstipation → feline megacolon', tone: 'orange' },
                { icon: '🧬', label: 'RECTAL / COLONIC MASS', sublabel: 'Neoplasia · stricture · diverticulum', tone: 'violet' },
                { icon: '🔥', label: 'PERIANAL FISTULA', sublabel: 'GSDs · painful dyschezia + ribbon stool', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-PERIANAL' } },
                { icon: '💢', label: 'ANAL SACCULITIS', sublabel: 'Perianal tenesmus / scooting / dyschezia', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-ANALSAC' } },
              ],
            },
          ],
        },
        {
          header: '⚙️ PELVIC / EXTRALUMINAL',
          tone: 'violet',
          sub: 'Narrowed pelvic canal or compressive mass outside the bowel wall',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🦴', label: 'HEALED PELVIC-FRACTURE NARROWING', sublabel: 'Malunion → extraluminal obstruction', tone: 'neutral', link: { to: 'disease', id: 'DIS-NEU-SPFX' } },
                { icon: '⚙️', label: 'PROSTATOMEGALY — BPH', sublabel: 'Older entire male · thin tape-shaped faeces', tone: 'neutral', link: { to: 'disease', id: 'DIS-URO-BPH' } },
                { icon: '🔴', label: 'PROSTATITIS', sublabel: 'Febrile entire male · caudal abdominal pain', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
                { icon: '🧬', label: 'PROSTATIC CARCINOMA', sublabel: 'Intact OR castrated · colon invasion · sublumbar LN', tone: 'violet', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
                { icon: '🍑', label: 'SUBLUMBAR / AGASACA', sublabel: 'Anal-sac carcinoma · paraneoplastic hyperCa', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
              ],
            },
          ],
        },
        {
          header: '🧠 NEUROMUSCULAR / METABOLIC',
          tone: 'teal',
          sub: 'Failure of colonic propulsion: nerve disease, electrolyte/endocrine derangement, or dehydration',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🦴', label: 'LUMBOSACRAL / CAUDA EQUINA', sublabel: 'DLSS · IVDD — poor anal tone, dyschezia', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-DLSS' } },
                { icon: '🧠', label: 'DYSAUTONOMIA', sublabel: 'Rare · cats > dogs · autonomic failure', tone: 'purple', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
                { icon: '🔋', label: 'HYPOKALAEMIA', sublabel: 'K⁺ &lt;2.5–3.0 mEq/L → weakness + constipation', tone: 'warning', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
                { icon: '🦋', label: 'HYPOTHYROIDISM', sublabel: 'Slow colonic motility', tone: 'teal', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
                { icon: '💧', label: 'CKD / DEHYDRATION', sublabel: 'Prolonged dehydration → dry hard faeces', tone: 'slate', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
                { icon: '🦴', label: 'HYPERCALCAEMIA', sublabel: 'Reduces colonic motility — screen for AGASACA / lymphoma', tone: 'warning', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
