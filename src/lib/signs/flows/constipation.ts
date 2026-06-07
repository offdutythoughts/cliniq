// ── Constipation / Tenesmus flowchart ────────────────────────────────────────
// Reduced/absent defecation with hard dry faeces (constipation → obstipation →
// feline megacolon) and/or repeated nonproductive straining (tenesmus). FIRST
// confirm it is DEFECATION straining (dyschezia), not URINARY straining
// (stranguria — a blocked male is a hyperkalaemic emergency). Then sort by
// mechanism: obstructive/intraluminal · pelvic/extraluminal · neuromuscular/
// metabolic. Links into the relevant disease pages (Ettinger Ch 51).

import type { FlowPage } from '../flowTypes'

export const constipationFlow: FlowPage = {
  id: 'constipation',
  title: 'Constipation / Tenesmus',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💩 CONSTIPATION / TENESMUS' },

    {
      kind: 'callout',
      tone: 'danger',
      html: '🚨 <strong>FIRST: is the straining to DEFECATE or to URINATE?</strong> Tenesmus and <strong>stranguria</strong> look identical to an owner. Confirm it is <strong>dyschezia</strong> (painful defecation) by watching the patient and palpating the bladder — a blocked male cat straining unproductively is a <strong>hyperkalaemic emergency</strong>, not constipation. <strong>Obstipation</strong> = cannot defecate without intervention; recurrent obstipation in cats → <strong>idiopathic megacolon</strong>. (Ettinger Ch 51)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'CONFIRMED DEFECATION STRAINING — WHAT IS THE MECHANISM?',
      sub: 'Tenesmus precedes defecation in obstructive disease, follows it in inflammatory disease; rectal exam is the key bedside step — pelvic canal, prostate, masses, stricture, anal sacs',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🔴 OBSTRUCTIVE / INTRALUMINAL',
          tone: 'orange',
          sub: 'Impacted dry faeces · ingested bone / hair / litter · intraluminal mass · rectal stricture or diverticulum',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🪨', label: 'IMPACTED FAECES / DIETARY', sublabel: 'Low-insoluble-fibre diet · pica (bones, hair, litter) · obstipation → feline idiopathic megacolon (no page)', tone: 'orange' },
                { icon: '🧬', label: 'RECTAL / COLONIC MASS', sublabel: 'Intraluminal neoplasia, stricture or diverticulum narrowing the lumen', tone: 'violet' },
                { icon: '🔥', label: 'PERIANAL FISTULA', sublabel: 'GSDs overrepresented · painful dyschezia + ribbon stool', tone: 'danger', link: { to: 'disease', id: 'DIS-GI-PERIANAL' } },
                { icon: '💢', label: 'ANAL SACCULITIS', sublabel: 'Perianal cause of tenesmus / scooting / dyschezia', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-ANALSAC' } },
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
                { icon: '🦴', label: 'HEALED PELVIC-FRACTURE NARROWING', sublabel: 'Malunion of lumbar/sacral/pelvic-canal trauma → extraluminal obstruction', tone: 'neutral', link: { to: 'disease', id: 'DIS-NEU-SPFX' } },
                { icon: '⚙️', label: 'PROSTATOMEGALY — BPH', sublabel: 'Older entire male · tenesmus + thin tape-shaped faeces', tone: 'neutral', link: { to: 'disease', id: 'DIS-URO-BPH' } },
                { icon: '🔴', label: 'PROSTATITIS', sublabel: 'Febrile entire male · caudal abdominal pain · compressive tenesmus', tone: 'danger', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
                { icon: '🧬', label: 'PROSTATIC CARCINOMA', sublabel: 'Intact OR castrated · colon invasion · sublumbar LN', tone: 'violet', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
                { icon: '🍑', label: 'SUBLUMBAR / ANAL-SAC MASS — AGASACA', sublabel: 'Apocrine anal-sac carcinoma · sublumbar LN · paraneoplastic hyperCa', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
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
                { icon: '🦴', label: 'LUMBOSACRAL / CAUDA EQUINA', sublabel: 'Degenerative lumbosacral stenosis · IVDD — poor anal tone, dyschezia', tone: 'info', link: { to: 'disease', id: 'DIS-NEU-DLSS' } },
                { icon: '🧠', label: 'DYSAUTONOMIA', sublabel: 'Rare · cats > dogs · generalised autonomic failure (also pelvic-nerve injury)', tone: 'purple', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
                { icon: '🔋', label: 'HYPOKALAEMIA', sublabel: 'K⁺ 2.5–3.0 mEq/L → weakness + constipation; correct it', tone: 'warning', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
                { icon: '🦋', label: 'HYPOTHYROIDISM', sublabel: 'Esp. congenital kittens / hypothyroid dogs → slow colonic motility', tone: 'teal', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
                { icon: '💧', label: 'CKD DEHYDRATION', sublabel: 'Prolonged dehydration (CKD / PU-PD) → dry hard faeces', tone: 'slate', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
                { icon: '🦴', label: 'HYPERCALCAEMIA', sublabel: 'Reduces colonic motility — screen for AGASACA / lymphoma', tone: 'warning', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
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
        '<strong onclick="renderDiseasePage(\'DIS-URO-URETHRAL-OBS\')" style="cursor:pointer;text-decoration:underline;">Urethral obstruction MIMICS tenesmus</strong> — a blocked male cat straining at the tray is a hyperkalaemic emergency; palpate a large turgid bladder, do ECG + serum potassium FIRST',
        '<strong>Prostatic / sublumbar carcinoma (AGASACA)</strong> — older patient with persistent tenesmus + ribbon stool; do a rectal exam and feel the sublumbar lymph nodes',
        '<strong>Feline megacolon needing decompression</strong> — obstipated cat with a colon packed solid; rehydrate and deobstipate, do NOT force enemas in a hypovolaemic cat',
        '<strong>Hypokalaemia & hypercalcaemia</strong> — check electrolytes + ionised calcium; both reduce colonic motility and are reversible',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'constipation' } },
        { label: '🚽 Straining to URINATE? — Pollakiuria / Stranguria flowchart', link: { to: 'flow', id: 'pollakiuria' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Perianal fistula', link: { to: 'disease', id: 'DIS-GI-PERIANAL' } },
        { label: 'Anal sacculitis / anal-sac disease', link: { to: 'disease', id: 'DIS-GI-ANALSAC' } },
        { label: 'Apocrine anal-sac carcinoma (AGASACA)', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
        { label: 'Benign prostatic hyperplasia', link: { to: 'disease', id: 'DIS-URO-BPH' } },
        { label: 'Bacterial prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
        { label: 'Prostatic carcinoma', link: { to: 'disease', id: 'DIS-URO-PROST-NEO' } },
        { label: 'Healed pelvic / sacral fracture', link: { to: 'disease', id: 'DIS-NEU-SPFX' } },
        { label: 'Degenerative lumbosacral stenosis (cauda equina)', link: { to: 'disease', id: 'DIS-NEU-DLSS' } },
        { label: 'Intervertebral disc disease', link: { to: 'disease', id: 'DIS-NEU-IVDD' } },
        { label: 'Dysautonomia', link: { to: 'disease', id: 'DIS-NEU-DYSAUTO' } },
        { label: 'Hypokalaemia', link: { to: 'disease', id: 'DIS-MET-HYPOK' } },
        { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
        { label: 'Hypothyroidism', link: { to: 'disease', id: 'DIS-ENDO-HYPOTHY' } },
        { label: 'Chronic kidney disease (dehydration)', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
        { label: 'Urethral obstruction (mimics tenesmus)', link: { to: 'disease', id: 'DIS-URO-URETHRAL-OBS' } },
      ],
    },
  ],
}
