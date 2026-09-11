// ── Constipation / Tenesmus — diagnostic approach (data) ─────────────────────
// Confirm it is DEFECATION straining (dyschezia/tenesmus), not URINARY straining
// (stranguria); define constipation vs obstipation vs feline megacolon; then
// localise the mechanism (obstructive/intraluminal · pelvic/extraluminal ·
// neuromuscular/metabolic) with the rectal exam as the key bedside test, plus
// imaging, bloods + electrolytes + calcium + T4, and a management ladder.
// (Ettinger Ch 51). Links to the relevant disease pages.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const constipationDx: DxApproach = {
  title: 'Constipation / Tenesmus',
  tabs: {

    history: {
      title: 'History: Constipation / Tenesmus',
      blocks: [
        { kind: 'branch', text: 'GOAL: DEFECATION vs URINARY STRAINING, THEN MECHANISM' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Constipation</strong>', { text: 'Reduced / absent defecation with retained hard dry faeces', tone: 'teal' }],
            ['<strong>Obstipation</strong>', { text: 'Cannot defecate without intervention — recurrent obstipation in cats → <strong>idiopathic megacolon</strong>', tone: 'teal' }],
            ['<strong>Tenesmus</strong>', { text: 'Repeated nonproductive straining — <em>precedes</em> defecation in obstructive disease, <em>follows</em> it in inflammatory disease', tone: 'teal' }],
            ['<strong>Dyschezia</strong>', { text: 'Painful defecation — usually anorectal, not colonic', tone: 'teal' }],
            ['<strong>Stranguria</strong>', { text: 'Urinary straining — see the Pollakiuria / Stranguria approach', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `<span style="opacity:.7">(Ettinger Ch 51)</span>` },

        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS IT DEFECATION OR URINATION?', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Owner report</strong>', { text: 'Owners cannot reliably tell tenesmus from stranguria — watch the patient and palpate the bladder', tone: 'teal' }],
            ['<strong>Large turgid painful bladder</strong> + unproductive straining', { text: '<strong>Urethral obstruction</strong> — a hyperkalaemic emergency (male cats, male dogs with os-penis calculus). Go straight to ECG + potassium', tone: 'danger' }],
            ['<strong>Faeces seen / colon packed with stool</strong>', { text: 'Confirms a defecation problem', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'SIGNALMENT & PATTERN', {
          cols: '0.9fr 1.25fr',
          dividers: true,
          headers: ['Signalment / history', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Cat with recurrent constipation → obstipation</strong>', { text: 'Feline idiopathic megacolon; congenital sacral cord anomaly in <strong>Manx</strong> cats', tone: 'teal' }],
            ['<strong>Entire male dog</strong> + tenesmus + thin tape-shaped faeces', { text: 'Prostatomegaly — BPH · prostatitis', tone: 'teal' }],
            ['<strong>Older dog, either sex</strong>, persistent tenesmus', { text: 'Prostatic carcinoma · rectal / colonic mass · sublumbar AGASACA', tone: 'teal' }],
            ['<strong>Prior pelvic / lumbosacral trauma</strong>', { text: 'Healed-fracture pelvic-canal narrowing', tone: 'teal' }],
            ['<strong>GSD with painful dyschezia</strong>', { text: 'Perianal fistula', tone: 'teal' }],
            ['<strong>PU/PD · weight loss · prior CKD</strong>', { text: 'Metabolic / dehydration causes — CKD · hypercalcaemia · hypokalaemia · hypothyroidism', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'DIET, ACCESS & STOOL CHARACTER', {
          cols: '0.9fr 1.25fr',
          dividers: true,
          headers: ['Ask / observe', { text: 'Significance', tone: 'teal' }],
          rows: [
            ['<strong>Low-insoluble-fibre diet</strong>', { text: 'Predisposes to impaction', tone: 'teal' }],
            ['<strong>Pica</strong> — bones · hair · wool · cat litter · plant material', { text: 'Predisposes to impaction', tone: 'teal' }],
            ['<strong>Thin / ribbon-like (tape-shaped) faeces</strong>', { text: 'Narrowed pelvic canal · extraluminal compression (prostate, mass)', tone: 'teal' }],
            ['<strong>Hard dry pellets</strong>', { text: 'Dehydration / colonic stasis', tone: 'teal' }],
            ['<strong>Also ask</strong>', { text: 'Water intake · activity level · obesity · drug history · haematochezia or mucus (large-bowel inflammation)', tone: 'teal' }],
          ],
        }, '🍽️'),
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

        ...stepTable(1, 'RECTAL EXAMINATION (the key bedside test)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Pelvic canal width</strong>`, { text: 'Healed-fracture narrowing', tone: 'teal' }],
            [`${numBadge(2)}<strong>Prostate</strong>`, { text: 'Symmetric non-painful → <strong>BPH</strong> · painful → <strong>prostatitis</strong> · asymmetric / fixed / firm → <strong>carcinoma</strong>', tone: 'teal' }],
            [`${numBadge(3)}<strong>Masses</strong>`, { text: 'Intraluminal or extraluminal', tone: 'teal' }],
            [`${numBadge(4)}<strong>Rectal wall</strong>`, { text: 'Stricture · diverticulum', tone: 'teal' }],
            [`${numBadge(5)}<strong>Perianal region</strong>`, { text: 'Fistulae', tone: 'teal' }],
            [`${numBadge(6)}<strong>Anal sacs</strong>`, { text: 'Sacculitis · AGASACA', tone: 'teal' }],
            [`${numBadge(7)}<strong>Stool</strong>`, { text: 'Character on the glove · faecal-pellet hardness', tone: 'teal' }],
          ],
        }, '👆'),

        ...stepTable(2, 'ABDOMINAL PALPATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Palpate', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Colon</strong>', { text: 'Packed with firm faeces (impaction / megacolon) — gauge its calibre', tone: 'teal' }],
            ['<strong>Caudal abdomen / sublumbar region</strong>', { text: 'Mass or organomegaly causing extraluminal obstruction', tone: 'teal' }],
            ['<strong>Bladder</strong>', { text: 'Always — exclude a urinary obstruction masquerading as tenesmus', tone: 'danger' }],
          ],
        }, '🤰'),

        ...stepTable(3, 'NEUROLOGIC / PERINEAL EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Anal tone · perineal reflex · tail / hindlimb function</strong>', { text: 'Reduced tone + dyschezia → lumbosacral disease (degenerative lumbosacral stenosis · IVDD · sacrocaudal "tail-pull")', tone: 'teal' }],
            ['<strong>Other autonomic signs</strong>', { text: '<strong>Dysautonomia</strong> — dry mucous membranes · mydriasis · bradycardia · megaoesophagus', tone: 'teal' }],
            ['<strong>Perineum</strong>', { text: 'Perineal hernia · pseudocoprostasis (matted perianal hair occluding the anus)', tone: 'teal' }],
          ],
        }, '🧠'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Constipation / Tenesmus — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — EXCLUDE URINARY OBSTRUCTION FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['If', { text: 'Then', tone: 'teal' }],
          rows: [
            ['<strong>Bladder large and turgid</strong> + unproductive straining', { text: 'This is a <strong>urethral obstruction, not constipation</strong> — ECG + serum potassium, treat hyperkalaemia, then decompress', tone: 'danger' }],
            ['<strong>Urinary emergency excluded</strong>', { text: 'Only then pursue the constipation work-up', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'RECTAL EXAM + ABDOMINAL RADIOGRAPHS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Digital rectal exam</strong>', { text: 'The single most useful first test — see the Exam tab', tone: 'teal' }],
            ['<strong>Abdominal radiographs</strong>', { text: '<strong>Faecal load</strong> and colonic calibre (megacolon = colon diameter &gt; ~1.48× the length of the L5 vertebral body in cats) · <strong>narrowed pelvic canal</strong> (healed fracture malunion) · <strong>sublumbar mass / lymphadenopathy</strong> · prostatomegaly and prostatic mineralisation · radiopaque ingested foreign material', tone: 'teal' }],
          ],
        }, '👆'),

        ...stepTable(3, 'BLOODS, ELECTROLYTES, CALCIUM & T4', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>CBC / serum chemistry</strong>`, { text: 'Systemic / metabolic disease and dehydration', tone: 'teal' }],
            [`${numBadge(2)}<strong>Electrolytes</strong>`, { text: '<strong>Hypokalaemia</strong> — K⁺ 2.5–3.0 mEq/L causes weakness + constipation · hypomagnesaemia', tone: 'teal' }],
            [`${numBadge(3)}<strong>Ionised calcium</strong>`, { text: '<strong>Hypercalcaemia</strong> reduces colonic motility — screen for AGASACA, lymphoma', tone: 'teal' }],
            [`${numBadge(4)}<strong>Renal values + USG</strong>`, { text: 'CKD-related dehydration', tone: 'teal' }],
            [`${numBadge(5)}<strong>Total T4</strong>`, { text: 'Hypothyroid dogs · congenital hypothyroid kittens', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(4, 'TARGETED IMAGING & BIOPSY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Indication', tone: 'teal' }],
          rows: [
            ['<strong>Ultrasound / CT</strong>', { text: 'Characterise a prostate · sublumbar or anal-sac mass (AGASACA) · colonic mass; stage regional lymph nodes', tone: 'teal' }],
            ['<strong>Colonoscopy + biopsy</strong>', { text: 'Intraluminal masses · strictures · large-bowel inflammatory / infectious causes of tenesmus (CIE · <em>Trichuris</em> · <em>Tritrichomonas foetus</em> in cats)', tone: 'teal' }],
            ['<strong>Cytology / histopathology</strong>', { text: 'Submit any anal-sac mass / regional node. Check ionised calcium pre- and post-resection (AGASACA paraneoplastic hypercalcaemia)', tone: 'teal' }],
          ],
        }, '🔍'),

        ...stepTable(5, 'MANAGEMENT LADDER', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Rung', { text: 'Detail', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Rehydrate</strong>`, { text: 'IV fluids first — deobstipation in a hypovolaemic patient is dangerous', tone: 'danger' }],
            [`${numBadge(2)}<strong>Deobstipation / enemas</strong>`, { text: 'Warm-water enemas 5–10 mL/kg ± manual evacuation under sedation / GA. <strong>AVOID phosphate-containing enemas in cats</strong> — fatal hyperphosphataemia / hypocalcaemia', tone: 'danger' }],
            [`${numBadge(3)}<strong>Lactulose</strong>`, { text: '0.5 mL/kg PO q8–12h, titrate to 2–3 soft stools/day', tone: 'teal' }],
            [`${numBadge(4)}<strong>Prokinetics</strong>`, { text: '<strong>Cisapride</strong> 2.5 mg/cat (not mg/kg) or 0.1–0.5 mg/kg PO q8–12h', tone: 'teal' }],
            [`${numBadge(5)}<strong>Dietary fibre ± water intake</strong>`, { text: 'Treat the underlying cause — correct K⁺ / Ca²⁺ · castrate or treat the prostate · address pelvic narrowing. Refractory feline megacolon → <strong>subtotal colectomy</strong>', tone: 'teal' }],
          ],
        }, '🪜'),
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
