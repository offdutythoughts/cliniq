// ── Anorexia / Hyporexia — diagnostic approach (data) ────────────────────────
// Anorexia is a non-specific sign of almost any systemic illness (Ettinger Ch 17).
// The approach: (1) separate PSEUDO-anorexia (can't eat — oral/dental/pharyngeal/
// neuromuscular) from TRUE anorexia; (2) take a structured history (environment,
// diet, drugs, other signs); (3) full PE with oral/nasal/ocular/rectal exam;
// (4) minimum database → imaging → system-by-system targeted search; and run
// nutritional support / antiemetics / appetite stimulants alongside the work-up —
// crucial in the cat (hepatic lipidosis). Links to the DIS-* disease pages.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge } from './shared/dxHelpers'

export const anorexiaDx: DxApproach = {
  title: 'Anorexia / Hyporexia',
  tabs: {

    history: {
      title: 'History: Anorexia / Hyporexia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CAN\'T EAT vs WON\'T EAT, THEN FIND THE CAUSE' },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.4fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Hyporexia</strong>', { text: 'Consuming inadequate calories to maintain / reach ideal weight', tone: 'teal' }],
            ['<strong>Anorexia</strong>', { text: 'Complete absence of voluntary intake', tone: 'teal' }],
            ['<strong>Dysrexia</strong>', { text: 'Abnormal (cyclic / unpredictable) intake', tone: 'teal' }],
          ],
        },
        {
          kind: 'note',
          html: `Anorexia is a <strong>non-specific sign of almost any systemic illness</strong>. First step: separate an animal that <strong>cannot</strong> eat (pseudo-anorexia) from one that <strong>will not</strong> eat (true anorexia). <span style="opacity:.7">(Ettinger Ch 17)</span>`,
        },

        { kind: 'step', tone: 'danger', text: '🐱 STEP 1 — IS THIS AN ANOREXIC CAT? (lipidosis clock)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.4fr',
          dividers: true,
          headers: ['Establish', { text: 'Why it matters', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>How long</strong> not eating`, { text: 'Cat <strong>≥2–14 days</strong> → negative energy balance → <strong>hepatic lipidosis</strong> (especially the overweight cat)', tone: 'danger' }],
            [`${numBadge(2)}<strong>Consequence</strong>`, { text: 'Shortens the work-up timeline — <strong>early feeding</strong> is a priority, not an afterthought <span style="opacity:.7">(Ettinger Ch 17 / Ch 274)</span>', tone: 'teal' }],
            [`${numBadge(3)}<strong>Quantify intake</strong> vs RER`, { text: 'RER (kcal/day) = (30 × kg) + 70 for 3–25 kg, or 70 × kg^0.75 for any weight', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'ENVIRONMENT, DIET & MEDICATIONS', {
          cols: '0.7fr 1.4fr',
          dividers: true,
          headers: ['Ask about', { text: 'Specifics', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Environmental stressors</strong>`, { text: 'New pet / person · moved house · changed routine · noise · lack of hiding or feeding resources in cats', tone: 'teal' }],
            [`${numBadge(2)}<strong>Diet factors</strong>`, { text: 'Spoiled / unbalanced food · change of texture or format · bowl · feeding location — cause reduced intake or food aversion', tone: 'teal' }],
            [`${numBadge(3)}<strong>Medications</strong>`, { text: 'Appetite suppression or nausea: <strong>chemotherapy · opioids · NSAIDs · antibiotics · antifungals</strong> — review the current drug list', tone: 'teal' }],
            [`${numBadge(4)}<strong>Interpret</strong>`, { text: 'A genuinely well animal that simply won\'t eat a new food behaves very differently from one that is systemically ill', tone: 'teal' }],
          ],
        }, '🏠'),

        ...stepTable(3, 'OTHER CLINICAL SIGNS (localise the system)', {
          cols: '0.9fr 1.25fr',
          dividers: true,
          headers: ['Accompanying sign', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Vomiting / diarrhoea / abdominal pain</strong>', { text: 'GI · pancreatic · hepatobiliary disease', tone: 'teal' }],
            ['<strong>PU/PD ± weight loss</strong>', { text: 'Renal disease · DKA · hypercalcaemia · hepatic disease', tone: 'teal' }],
            ['<strong>Jaundice</strong>', { text: 'Hepatobiliary disease / hepatic lipidosis — open the jaundice flow', tone: 'teal' }],
            ['<strong>Waxing/waning lethargy, GI signs ± collapse</strong>', { text: '<strong>Hypoadrenocorticism</strong> — the great pretender', tone: 'teal' }],
            ['<strong>Fever</strong>', { text: 'Infectious / inflammatory disease · sepsis · FIP · neoplasia', tone: 'teal' }],
            ['<strong>Lameness / reluctance to move / pain on handling</strong>', { text: 'Occult pain (OA · dental · FLUTD · otitis) — commonly missed, treatable', tone: 'teal' }],
          ],
        }, '🔍'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: 'RED FLAGS IN THE HISTORY',
          html: `An anorexic cat (especially overweight) = hepatic lipidosis risk — feed early · Waxing/waning anorexia ± GI signs / collapse = rule out hypoadrenocorticism · Acute febrile anorexia with rapid deterioration = sepsis/SIRS · Persistent anorexia + weight loss in an older patient = neoplasia until excluded.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Anorexia / Hyporexia',
      blocks: [
        { kind: 'step', tone: 'teal', text: 'A complete PE is imperative — include ORAL, NASAL, OCULAR + RECTAL exam' },

        ...stepTable(1, 'ORAL / PHARYNGEAL EXAM (rule out pseudo-anorexia)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Mouth</strong> (often needs sedation)`, { text: '<strong>Periodontal / periapical disease · fractured teeth · oral masses · ulceration · oronasal fistula · foreign body</strong> (linear FB under the tongue in cats) · the <strong>pharynx</strong>', tone: 'teal' }],
            [`${numBadge(2)}<strong>Jaw &amp; masticatory muscles</strong>`, { text: 'Pain on opening · trismus · masseter / temporal atrophy → masticatory myositis · TMJ disease · mandibular fracture', tone: 'teal' }],
            [`${numBadge(3)}<strong>Cranial nerves</strong>`, { text: 'Trigeminal · facial', tone: 'teal' }],
            [`${numBadge(4)}<strong>Nose</strong>`, { text: 'Fungal / neoplastic disease', tone: 'teal' }],
            [`${numBadge(5)}<strong>Retrobulbar space</strong>`, { text: 'Pain on opening the mouth · globe displacement', tone: 'teal' }],
          ],
        }, '👄'),

        ...stepTable(2, 'GENERAL, OCULAR & MUCOUS MEMBRANES', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'What to note', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>BCS + muscle condition score</strong>`, { text: 'Drives the urgency of nutritional support', tone: 'teal' }],
            [`${numBadge(2)}<strong>Hydration &amp; temperature</strong>`, { text: 'Fever vs hypothermia', tone: 'teal' }],
            [`${numBadge(3)}<strong>Mucous membranes</strong>`, { text: '<strong>Icterus</strong> (hepatobiliary / lipidosis) · pallor · injection', tone: 'teal' }],
            [`${numBadge(4)}<strong>Ocular exam</strong>`, { text: '<strong>Uveitis / chorioretinitis</strong> → FIP, infectious or neoplastic disease', tone: 'teal' }],
            [`${numBadge(5)}<strong>Palpate</strong>`, { text: 'Peripheral lymph nodes · thyroid (🐱)', tone: 'teal' }],
          ],
        }, '🩺'),

        ...stepTable(3, 'ABDOMINAL PALPATION & RECTAL EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Abdominal palpation</strong>`, { text: '<strong>Organomegaly · masses · intestinal foreign body · pain · effusion · thickened bowel loops</strong>; a painful cranial abdomen supports pancreatitis', tone: 'teal' }],
            [`${numBadge(2)}<strong>Rectal exam</strong>`, { text: 'Faecal character (melena) · masses · the sublumbar region', tone: 'teal' }],
            [`${numBadge(3)}<strong>Musculoskeletal + brief neuro exam</strong>`, { text: 'Occult osteoarthritis and maladaptive pain — easily missed drivers of inappetence', tone: 'teal' }],
          ],
        }, '🤲'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Anorexia / Hyporexia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '👄 STEP 1 — CONFIRM/EXCLUDE PSEUDO-ANOREXIA' },
        { kind: 'note', html: `Before an extensive systemic work-up, settle whether the patient <strong>can</strong> eat.`, noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Rules in / out', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Oral / dental exam under sedation</strong> ± dental radiographs`, { text: 'Mechanical or painful "can\'t-eat" cause — oral / dental / oronasal disease · mass', tone: 'teal' }],
            [`${numBadge(2)}<strong>Assess pharynx, jaw, oesophagus</strong>`, { text: 'Masticatory myositis · megaoesophagus', tone: 'teal' }],
            [`${numBadge(3)}<strong>If swallowing / regurgitation is the issue</strong>`, { text: 'Divert to the <strong>vomiting vs regurgitation</strong> approach', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'MINIMUM DATABASE (CBC · BIOCHEM · UA)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>CBC</strong>`, { text: 'Inflammatory / infectious leukogram · anaemia · cytopenias', tone: 'teal' }],
            [`${numBadge(2)}<strong>Serum biochemistry</strong>`, { text: 'Azotaemia → uraemia · ↑ liver enzymes / bilirubin → hepatobiliary · glucose + ketones → DKA · <strong>hypercalcaemia</strong> · electrolytes (Na:K ratio for hypoadrenocorticism)', tone: 'teal' }],
            [`${numBadge(3)}<strong>Urinalysis</strong>`, { text: 'USG <em>before</em> fluids · glucose / ketones · sediment', tone: 'teal' }],
            [`${numBadge(4)}<strong>Blood pressure</strong>`, { text: 'SBP &lt;90 mmHg → ACTH stimulation test (hypoadrenocorticism) · SBP ≥140 mmHg → add SDMA and UPC', tone: 'teal' }],
            [`${numBadge(5)}<strong>🐱 Cat add-ons</strong>`, { text: '<strong>Spec fPL</strong> (pancreatitis) · total T4 · retroviral (FeLV / FIV) status', tone: 'teal' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `The minimum database is the cornerstone of this work-up <span style="opacity:.7">(Ettinger Ch 17)</span>.` },

        ...stepTable(3, 'IMAGING (localise the problem)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Modality', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Abdominal ultrasound / radiographs</strong>`, { text: 'GI foreign body or obstruction · pancreatic · hepatobiliary · renal disease · intra-abdominal mass or effusion', tone: 'teal' }],
            [`${numBadge(2)}<strong>Thoracic radiographs</strong>`, { text: 'Masses · metastasis · pleural effusion · aspiration — reduced intake can also be driven by respiratory distress (pleural effusion, pneumonia); don\'t overlook the chest', tone: 'teal' }],
            [`${numBadge(3)}<strong>CT / MRI</strong>`, { text: 'Nasal · skull · retrobulbar or CNS disease · staging neoplasia', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(4, 'TARGETED / SYSTEM-BY-SYSTEM SEARCH', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['System', { text: 'Tests', tone: 'teal' }],
          rows: [
            ['<strong>Endocrine</strong>', { text: 'ACTH stimulation (hypoadrenocorticism) · ionised calcium + PTH / PTHrP (hypercalcaemia) · confirm DKA', tone: 'teal' }],
            ['<strong>Infectious</strong>', { text: 'Serology / PCR (FeLV-FIV · Toxoplasma · Leishmania · Ehrlichia) · <strong>effusion analysis</strong> (FIP · septic peritonitis — septic if intracellular bacteria or a fluid:blood glucose gradient)', tone: 'teal' }],
            ['<strong>GI / hepatic</strong>', { text: 'Cobalamin + folate · bile acids · abdominocentesis · <strong>endoscopy / FNA / biopsy</strong> for IBD vs lymphoma and for hepatobiliary disease', tone: 'teal' }],
            ['<strong>Pain work-up</strong>', { text: 'Orthopaedic / dental assessment for occult OA or oral pain', tone: 'teal' }],
          ],
        }, '🎯'),
        { kind: 'note', html: `Driven by the findings of the minimum database and imaging.` },

        ...stepTable(5, 'TREAT WHILE YOU INVESTIGATE (support intake)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Measure', { text: 'Detail', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Nutritional support</strong><br>the priority, especially in cats`, { text: '<strong>Assisted / tube feeding</strong> when intake &lt;RER for &gt;3–5 days (sooner in the at-risk cat) — NG initially, then oesophagostomy / gastrostomy; build to full RER over a few days to avoid <strong>refeeding syndrome</strong> <span style="opacity:.7">(Ettinger Ch 17 / Ch 274)</span>. Appetite stimulants do <strong>not</strong> replace tube feeding in lipidosis', tone: 'teal' }],
            [`${numBadge(2)}<strong>Antiemetics / anti-nausea</strong>`, { text: '<strong>Maropitant</strong> 1 mg/kg q24h ± ondansetron — treat uraemic and drug-induced nausea', tone: 'teal' }],
            [`${numBadge(3)}<strong>Analgesia</strong>`, { text: 'For pain-driven anorexia', tone: 'teal' }],
            [`${numBadge(4)}<strong>Appetite stimulants</strong>`, { text: '<strong>Mirtazapine</strong> (🐱 1.88 mg/cat PO q24–48h, or transdermal Mirataz 2 mg/cat; also effective in dogs) · <strong>capromorelin</strong> (Entyce, 🐕 3 mg/kg PO — ghrelin-receptor agonist; caution in cats, transient insulin suppression / glucose intolerance) · cyproheptadine · gabapentin', tone: 'teal' }],
            [`${numBadge(5)}<strong>Palatability measures</strong>`, { text: 'Warm the food · increase moisture and aroma · change texture · remove environmental stressors and food aversions', tone: 'teal' }],
          ],
        }, '🍽️'),
        { kind: 'note', html: `Run supportive care <em>alongside</em> the diagnostics — never wait.` },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Pancreatitis (cat)', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            { label: 'Pancreatitis (dog)', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
            { label: 'GI foreign body', link: { to: 'disease', id: 'DIS-GI-FB' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'Feline hepatic lipidosis', link: { to: 'disease', id: 'DIS-HEP-LIPIDOSIS' } },
            { label: 'Chronic hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Hypercalcaemia', link: { to: 'disease', id: 'DIS-ENDO-HCALC' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Paraneoplastic syndromes / cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: 'Feline infectious peritonitis (FIP)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: 'Septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong>Practical pearls:</strong><br>
  • Can't-eat vs won't-eat is the first decision — examine the mouth (under sedation) before chasing systemic disease.<br>
  • An anorexic cat is an emergency — feed early (tube feeding), don't just reach for an appetite stimulant.<br>
  • Pain and nausea are the most commonly missed, easily treated causes — give analgesia and an antiemetic.<br>
  • Anorexia is non-specific: a CBC/biochem/UA + blood pressure point you to the system; image to localise.<br>
  • Don't forget hypoadrenocorticism (the great pretender) and the chest (pleural effusion/pneumonia can suppress appetite).`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
