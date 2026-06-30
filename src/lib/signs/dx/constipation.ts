// ── Constipation / Tenesmus — diagnostic approach (data) ─────────────────────
// Confirm it is DEFECATION straining (dyschezia/tenesmus), not URINARY straining
// (stranguria); define constipation vs obstipation vs feline megacolon; then
// localise the mechanism (obstructive/intraluminal · pelvic/extraluminal ·
// neuromuscular/metabolic) with the rectal exam as the key bedside test, plus
// imaging, bloods + electrolytes + calcium + T4, and a management ladder.
// (Ettinger Ch 51). Links to the relevant disease pages.

import type { DxApproach } from '../dxTypes'

export const constipationDx: DxApproach = {
  title: 'Constipation / Tenesmus',
  tabs: {

    history: {
      title: 'History: Constipation / Tenesmus',
      blocks: [
        { kind: 'branch', text: 'GOAL: DEFECATION vs URINARY STRAINING, THEN MECHANISM' },
        {
          kind: 'check',
          html: `• <strong>Constipation</strong> = reduced/absent defecation with retained hard dry faeces<br>• <strong>Obstipation</strong> = cannot defecate without intervention — recurrent obstipation in cats → <strong>idiopathic megacolon</strong><br>• <strong>Tenesmus</strong> = repeated nonproductive straining (precedes defecation in obstructive disease, follows it in inflammatory disease)<br>• <strong>Dyschezia</strong> = painful defecation (usually anorectal, not colonic)<br>• <strong>Stranguria</strong> = urinary straining — see the Pollakiuria / Stranguria approach<br><span style="opacity:.7">(Ettinger Ch 51)</span>`,
        },
        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS IT DEFECATION OR URINATION?' },
        {
          kind: 'check',
          html: `Owners cannot reliably tell tenesmus from stranguria. Watch the patient and palpate the bladder: a <strong>large turgid painful bladder</strong> with unproductive straining = urethral obstruction, a <strong>hyperkalaemic emergency</strong> (male cats, male dogs with os-penis calculus) — go straight to ECG + potassium. Faeces seen / a colon packed with stool confirms a defecation problem.`,
        },
        { kind: 'step', alt: true, text: '🐾 STEP 2 — SIGNALMENT & PATTERN' },
        {
          kind: 'check',
          html: `<strong>Cat with recurrent constipation → obstipation</strong> → feline idiopathic megacolon; congenital sacral cord anomaly in <strong>Manx</strong> cats.<br>
    <strong>Entire male dog</strong> with tenesmus + thin tape-shaped faeces → prostatomegaly (BPH, prostatitis); <strong>older dog of either sex</strong> with persistent tenesmus → prostatic carcinoma, rectal/colonic mass, or sublumbar AGASACA.<br>
    <strong>Prior pelvic / lumbosacral trauma</strong> → healed-fracture pelvic-canal narrowing; <strong>GSD</strong> with painful dyschezia → perianal fistula.<br>
    <strong>PU/PD, weight loss, prior CKD</strong> → metabolic / dehydration causes (CKD, hypercalcaemia, hypokalaemia, hypothyroidism).`,
        },
        { kind: 'step', alt: true, text: '🍽️ STEP 3 — DIET, ACCESS & STOOL CHARACTER' },
        {
          kind: 'check',
          html: `<strong>Low-insoluble-fibre diet</strong> and <strong>pica</strong> (bones, hair, wool, cat litter, plant material) predispose to impaction.<br>
    <strong>Thin / ribbon-like (tape-shaped) faeces</strong> → a narrowed pelvic canal or extraluminal compression (prostate, mass).<br>
    <strong>Hard dry pellets</strong> → dehydration / colonic stasis.<br>
    Ask about water intake, activity level, obesity, drug history, and any haematochezia / mucus (large-bowel inflammation).`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS IN THE HISTORY',
          html: `A male cat straining unproductively = treat as obstructed (urinary) until disproven · Persistent tenesmus + ribbon stool in an older patient = prostatic / sublumbar carcinoma until excluded · An obstipated cat with a colon packed solid = megacolon needing rehydration + decompression · PU/PD + weight loss = check calcium, potassium and renal values.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Constipation / Tenesmus',
      blocks: [
        { kind: 'step', tone: 'teal', text: '🩺 A complete PE — assess hydration, body condition & pain' },
        { kind: 'step', text: '👆 STEP 1 — RECTAL EXAMINATION (the key bedside test)' },
        {
          kind: 'check',
          html: `Digital rectal exam answers most cases. Assess the <strong>pelvic canal width</strong> (healed-fracture narrowing), the <strong>prostate</strong> (symmetric non-painful → BPH; painful → prostatitis; asymmetric/fixed/firm → carcinoma), intraluminal or extraluminal <strong>masses</strong>, a <strong>rectal stricture or diverticulum</strong>, perianal <strong>fistulae</strong>, and the <strong>anal sacs</strong> (sacculitis, AGASACA). Note stool character on the glove and faecal-pellet hardness.`,
        },
        { kind: 'step', alt: true, text: '🤰 STEP 2 — ABDOMINAL PALPATION' },
        {
          kind: 'check',
          html: `Palpate a <strong>colon packed with firm faeces</strong> (impaction / megacolon) and gauge its calibre. Feel for a <strong>caudal abdominal / sublumbar mass</strong> or organomegaly causing extraluminal obstruction. Always palpate the <strong>bladder</strong> to exclude a urinary obstruction masquerading as tenesmus.`,
        },
        { kind: 'step', alt: true, text: '🧠 STEP 3 — NEUROLOGIC / PERINEAL EXAM' },
        {
          kind: 'check',
          html: `Assess <strong>anal tone, perineal reflex and tail / hindlimb function</strong> — reduced tone + dyschezia points to lumbosacral disease (degenerative lumbosacral stenosis, IVDD, sacrocaudal "tail-pull") or dysautonomia (look for other autonomic signs: dry mucous membranes, mydriasis, bradycardia, megaoesophagus). Check for perineal hernia and pseudocoprostasis (matted perianal hair occluding the anus).`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Constipation / Tenesmus — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — EXCLUDE URINARY OBSTRUCTION FIRST' },
        {
          kind: 'check',
          html: `If the bladder is large and turgid with unproductive straining, this is a urethral obstruction, not constipation — ECG + serum potassium, treat hyperkalaemia, then decompress. Only once a urinary emergency is excluded do you pursue the constipation work-up.`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — RECTAL EXAM + ABDOMINAL RADIOGRAPHS' },
        {
          kind: 'check',
          html: `The <strong>digital rectal exam</strong> (above) is the single most useful first test.<br>
    <strong>Abdominal radiographs</strong> show the <strong>faecal load</strong> and colonic calibre (megacolon = colon diameter > ~1.48× the length of the L5 vertebral body in cats), a <strong>narrowed pelvic canal</strong> (healed fracture malunion), <strong>sublumbar mass / lymphadenopathy</strong>, prostatomegaly and prostatic mineralisation, and any radiopaque ingested foreign material.`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — BLOODS, ELECTROLYTES, CALCIUM & T4' },
        {
          kind: 'check',
          html: `<strong>CBC / serum chemistry</strong> screen for systemic / metabolic disease and dehydration.<br>
    <strong>Electrolytes</strong> — <strong>hypokalaemia</strong> (K⁺ 2.5–3.0 mEq/L causes weakness + constipation), hypomagnesaemia.<br>
    <strong>Ionised calcium</strong> — <strong>hypercalcaemia</strong> reduces colonic motility (screen for AGASACA, lymphoma).<br>
    <strong>Renal values + USG</strong> for CKD-related dehydration; <strong>total T4</strong> (hypothyroid dogs; congenital hypothyroid kittens).`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — TARGETED IMAGING & BIOPSY' },
        {
          kind: 'check',
          html: `<strong>Ultrasound / CT</strong> to characterise a prostate, sublumbar / anal-sac mass (AGASACA) or colonic mass and to stage regional lymph nodes.<br>
    <strong>Colonoscopy + biopsy</strong> for intraluminal masses, strictures, or large-bowel inflammatory / infectious causes of tenesmus (CIE, <em>Trichuris</em>, <em>Tritrichomonas foetus</em> in cats).<br>
    Submit any <strong>anal-sac mass / regional node</strong> for cytology / histopathology; check ionised calcium pre- and post-resection (AGASACA paraneoplastic hypercalcaemia).`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — MANAGEMENT LADDER' },
        {
          kind: 'check',
          html: `<strong>1. Rehydrate</strong> — IV fluids first; deobstipation in a hypovolaemic patient is dangerous.<br>
    <strong>2. Deobstipation / enemas</strong> — warm-water enemas (5–10 mL/kg) ± manual evacuation under sedation/GA. <strong>AVOID phosphate-containing enemas in cats</strong> (fatal hyperphosphataemia / hypocalcaemia).<br>
    <strong>3. Lactulose</strong> — 0.5 mL/kg PO q8–12h, titrate to 2–3 soft stools/day.<br>
    <strong>4. Prokinetics</strong> — <strong>cisapride</strong> 2.5 mg/cat (not mg/kg) or 0.1–0.5 mg/kg PO q8–12h.<br>
    <strong>5. Dietary fibre</strong> ± increased water intake; treat the underlying cause (correct K⁺/Ca²⁺, castrate / treat prostate, address pelvic narrowing). Refractory feline megacolon → subtotal colectomy.`,
        },
      ],
      after: [
        {
          kind: 'alert',
          gap: 10,
          html: `<strong>⚠️ Practical pearls:</strong><br>
  • First decision is defecation vs urination — never miss a blocked male cat masquerading as constipation.<br>
  • The rectal exam answers most cases: pelvic canal, prostate, masses, stricture, anal sacs.<br>
  • Always check electrolytes + ionised calcium — hypokalaemia and hypercalcaemia are reversible motility killers.<br>
  • AVOID phosphate enemas in cats; rehydrate before you deobstipate.<br>
  • Persistent tenesmus + ribbon stool in an older patient → image and rule out prostatic / sublumbar AGASACA (check calcium).<br>
  • Recurrent feline obstipation = idiopathic megacolon — lactulose + cisapride + diet, subtotal colectomy if refractory.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
