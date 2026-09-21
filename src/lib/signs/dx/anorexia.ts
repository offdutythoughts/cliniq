// ── Anorexia / Hyporexia — diagnostic approach (data) ────────────────────────
// Anorexia is a non-specific sign of almost any systemic illness (Ettinger Ch 17).
// The approach: (1) separate PSEUDO-anorexia (can't eat — oral/dental/pharyngeal/
// neuromuscular) from TRUE anorexia; (2) take a structured history (environment,
// diet, drugs, other signs); (3) full PE with oral/nasal/ocular/rectal exam;
// (4) minimum database → imaging → system-by-system targeted search; and run
// nutritional support / antiemetics / appetite stimulants alongside the work-up —
// crucial in the cat (hepatic lipidosis). Links to the DIS-* disease pages.

import type { DxApproach } from '../dxTypes'
import { stepTable, numBadge, bullets } from './shared/dxHelpers'

export const anorexiaDx: DxApproach = {
  sign: 'anorexia',
  title: 'Anorexia / Hyporexia',
  tabs: {

    history: {
      title: 'History: Anorexia / Hyporexia',
      blocks: [
        { kind: 'goal', text: 'GOAL: CAN\'T EAT vs WON\'T EAT, THEN FIND THE CAUSE' },
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

        { kind: 'step', text: '👄 STEP 1 — CAN\'T EAT vs WON\'T EAT (the first discriminator)', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.85fr 1.1fr 1.1fr',
          dividers: true,
          headers: ['Ask / observe', { text: 'PSEUDO-anorexia — CAN\'T eat', tone: 'warning' }, { text: 'TRUE anorexia — WON\'T eat', tone: 'info' }],
          rows: [
            ['<strong>Interest in food</strong>', { text: '<strong>Wants it</strong> — comes to the bowl, begs, hovers over the food', tone: 'warning' }, { text: '<strong>Ignores it</strong> — turns away, no interest at all', tone: 'info' }],
            ['<strong>Prehension</strong>', { text: bullets(['<strong>Drops food</strong>', 'Picks it up and spits it out', 'Chews on one side', 'Tilts the head to eat']), tone: 'warning' }, { text: 'Normal on the rare occasion it does eat', tone: 'info' }],
            ['<strong>Mouth signs</strong>', { text: bullets(['<strong>Drooling</strong> (± blood)', 'Halitosis', '<strong>Pawing at the mouth</strong>', 'Face rubbing', 'Reluctance to have the mouth opened']), tone: 'warning' }, { text: 'Absent — though <strong>nausea also causes ptyalism / lip-licking</strong>', tone: 'info' }],
            ['<strong>Swallowing</strong>', { text: bullets(['<strong>Gags</strong>', '<strong>Gulps repeatedly</strong>', '<strong>Coughs</strong>', '<strong>Regurgitates</strong>'], { foot: 'During or after eating' }), tone: 'warning' }, { text: 'Normal swallow', tone: 'info' }],
            ['<strong>Pain on eating</strong>', { text: bullets(['Cries / flinches on prehension', 'Trismus', 'Pain on opening the jaw']), tone: 'warning' }, { text: 'No oral pain (may be painful elsewhere — OA, abdomen)', tone: 'info' }],
            ['<strong>Food format</strong>', { text: '<strong>Takes soft / liquid food but refuses kibble</strong> — a mechanical, not appetite, problem', tone: 'warning' }, { text: 'Refuses food of <strong>any</strong> texture', tone: 'info' }],
            ['<strong>Rest of the picture</strong>', { text: bullets(['Weight loss <em>despite</em> obvious hunger', 'Often otherwise bright']), tone: 'warning' }, { text: bullets(['Weight loss', 'Lethargy', 'Vomiting', 'PU/PD', 'Fever'], { foot: '= systemic illness' }), tone: 'info' }],
            ['<strong>Where it sends you</strong>', { text: bullets(['<strong>Sedated oral / pharyngeal exam</strong> ± dental radiographs', 'Oesophageal signs → vomiting vs regurgitation approach']), tone: 'warning' }, { text: '<strong>Minimum database → imaging</strong> → system-by-system search', tone: 'info' }],
          ],
        },
        {
          kind: 'note',
          html: `The most useful single question: <strong>does the animal go to the food?</strong> Trap: <strong>chronic oral pain becomes a learned food aversion</strong> — a long-standing pseudo-anorexic stops approaching food at all, and then reads as a true anorexia.`,
        },

        { kind: 'step', tone: 'danger', text: '🐱 STEP 2 — IS THIS AN ANOREXIC CAT? (lipidosis clock)', noArrowAfter: true },
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

        ...stepTable(3, 'ENVIRONMENT, DIET & MEDICATIONS', {
          cols: '0.7fr 1.4fr',
          dividers: true,
          headers: ['Ask about', { text: 'Specifics', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Environmental stressors</strong>`, { text: bullets(['New pet / person', 'Moved house', 'Changed routine', 'Noise', 'Lack of hiding or feeding resources in cats']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Diet factors</strong>`, { text: bullets(['Spoiled / unbalanced food', 'Change of texture or format', 'Bowl', 'Feeding location'], { foot: 'All cause reduced intake or food aversion' }), tone: 'teal' }],
            [`${numBadge(3)}<strong>Medications</strong>`, { text: bullets(['<strong>Chemotherapy</strong>', '<strong>Opioids</strong>', '<strong>NSAIDs</strong>', '<strong>Antibiotics</strong>', '<strong>Antifungals</strong>'], { lead: 'Appetite suppression or nausea:', foot: 'Review the current drug list' }), tone: 'teal' }],
            [`${numBadge(4)}<strong>Interpret</strong>`, { text: 'A genuinely well animal that simply won\'t eat a new food behaves very differently from one that is systemically ill', tone: 'teal' }],
          ],
        }, '🏠'),

        ...stepTable(4, 'OTHER CLINICAL SIGNS (localise the system)', {
          cols: '0.9fr 1.25fr',
          dividers: true,
          headers: ['Accompanying sign', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Vomiting / diarrhoea / abdominal pain</strong>', { text: bullets(['GI disease', 'Pancreatic disease', 'Hepatobiliary disease']), tone: 'teal' }],
            ['<strong>PU/PD ± weight loss</strong>', { text: bullets(['Renal disease', 'DKA', 'Hypercalcaemia', 'Hepatic disease']), tone: 'teal' }],
            ['<strong>Jaundice</strong>', { text: 'Hepatobiliary disease / hepatic lipidosis — open the jaundice flow', tone: 'teal' }],
            ['<strong>Waxing/waning lethargy, GI signs ± collapse</strong>', { text: '<strong>Hypoadrenocorticism</strong> — the great pretender', tone: 'teal' }],
            ['<strong>Fever</strong>', { text: bullets(['Infectious / inflammatory disease', 'Sepsis', 'FIP', 'Neoplasia']), tone: 'teal' }],
            ['<strong>Lameness / reluctance to move / pain on handling</strong>', { text: bullets(['OA', 'Dental disease', 'FLUTD', 'Otitis'], { lead: 'Occult pain:', foot: 'Commonly missed, treatable' }), tone: 'teal' }],
          ],
        }, '🔍'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: 'RED FLAGS IN THE HISTORY',
          items: [
            `Overweight anorexic cat = hepatic lipidosis — feed early`,
            `Wants to eat but can't = pseudo-anorexia — sedated oral exam`,
            `Waxing/waning anorexia ± GI signs / collapse = hypoadrenocorticism`,
            `Febrile anorexia, deteriorating fast = sepsis / SIRS`,
            `Persistent anorexia, weight loss, older patient = neoplasia`,
          ],
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Anorexia / Hyporexia',
      blocks: [
        { kind: 'step', tone: 'teal', text: 'A complete PE is imperative — include ORAL, NASAL, OCULAR + RECTAL exam' },
        {
          kind: 'note',
          html: `Start by <strong>offering food and watching</strong>. Approaches but fails — drops food · drools · gags = <strong>pseudo-anorexia</strong> (Step 1). Simply <strong>not interested</strong> = <strong>true anorexia</strong> — still examine the mouth, then work up systemically.`,
        },

        ...stepTable(1, 'ORAL / PHARYNGEAL EXAM (rule out pseudo-anorexia)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Mouth</strong> (often needs sedation)`, { text: bullets(['<strong>Periodontal / periapical disease</strong>', '<strong>Fractured teeth</strong>', '<strong>Oral masses</strong>', '<strong>Ulceration</strong>', '<strong>Oronasal fistula</strong>', '<strong>Foreign body</strong> — linear FB under the tongue in cats', 'The <strong>pharynx</strong>']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Jaw &amp; masticatory muscles</strong>`, { text: bullets(['Pain on opening', 'Trismus', 'Masseter / temporal atrophy → masticatory myositis', 'TMJ disease', 'Mandibular fracture']), tone: 'teal' }],
            [`${numBadge(3)}<strong>Cranial nerves</strong>`, { text: bullets(['Trigeminal', 'Facial']), tone: 'teal' }],
            [`${numBadge(4)}<strong>Nose</strong>`, { text: bullets(['Fungal disease', 'Neoplastic disease']), tone: 'teal' }],
            [`${numBadge(5)}<strong>Retrobulbar space</strong>`, { text: bullets(['Pain on opening the mouth', 'Globe displacement']), tone: 'teal' }],
          ],
        }, '👄'),

        ...stepTable(2, 'GENERAL, OCULAR & MUCOUS MEMBRANES', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'What to note', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>BCS + muscle condition score</strong>`, { text: 'Drives the urgency of nutritional support', tone: 'teal' }],
            [`${numBadge(2)}<strong>Hydration &amp; temperature</strong>`, { text: 'Fever vs hypothermia', tone: 'teal' }],
            [`${numBadge(3)}<strong>Mucous membranes</strong>`, { text: bullets(['<strong>Icterus</strong> — hepatobiliary / lipidosis', 'Pallor', 'Injection']), tone: 'teal' }],
            [`${numBadge(4)}<strong>Ocular exam</strong>`, { text: '<strong>Uveitis / chorioretinitis</strong> → FIP, infectious or neoplastic disease', tone: 'teal' }],
            [`${numBadge(5)}<strong>Palpate</strong>`, { text: bullets(['Peripheral lymph nodes', 'Thyroid (🐱)']), tone: 'teal' }],
          ],
        }, '🩺'),

        ...stepTable(3, 'ABDOMINAL PALPATION & RECTAL EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Abdominal palpation</strong>`, { text: bullets(['<strong>Organomegaly</strong>', '<strong>Masses</strong>', '<strong>Intestinal foreign body</strong>', '<strong>Pain</strong>', '<strong>Effusion</strong>', '<strong>Thickened bowel loops</strong>'], { foot: 'A painful cranial abdomen supports pancreatitis' }), tone: 'teal' }],
            [`${numBadge(2)}<strong>Rectal exam</strong>`, { text: bullets(['Faecal character (melena)', 'Masses', 'The sublumbar region']), tone: 'teal' }],
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
        { kind: 'note', html: `Before an extensive systemic work-up, settle whether the patient <strong>can</strong> eat. <strong>Wants food but can\'t manage it</strong> (drops food · drools · gags) = <strong>pseudo-anorexia</strong> → work up the mouth, pharynx and oesophagus. <strong>No interest at all</strong> = <strong>true anorexia</strong> → skip to Step 2.`, noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Rules in / out', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Watch the patient offered food</strong> (kibble <em>and</em> soft food)`, { text: bullets(['Approaches and tries but drops / gags / paws = <strong>can\'t eat</strong>', 'Takes soft food but not kibble = mechanical or painful oral disease', 'Turns away from both = <strong>won\'t eat</strong>']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Oral / dental exam under sedation</strong> ± dental radiographs`, { text: bullets(['Oral / dental / oronasal disease', 'Mass', 'Linear FB under the tongue (🐱)'], { lead: 'Mechanical or painful "can\'t-eat" cause:' }), tone: 'teal' }],
            [`${numBadge(3)}<strong>Assess pharynx, jaw, oesophagus</strong>`, { text: bullets(['Masticatory myositis', 'Megaoesophagus']), tone: 'teal' }],
            [`${numBadge(4)}<strong>If swallowing / regurgitation is the issue</strong>`, { text: 'Divert to the <span style="cursor:pointer;text-decoration:underline;text-underline-offset:2px;" onclick="renderDxId(\'vomiting\',\'history\')"><strong>vomiting vs regurgitation</strong></span> approach', tone: 'teal' }],
            [`${numBadge(5)}<strong>Normal mouth + normal swallow</strong>`, { text: 'Pseudo-anorexia excluded → proceed to the systemic work-up (minimum database)', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'MINIMUM DATABASE (CBC · BIOCHEM · UA)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it rules in / out', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>CBC</strong>`, { text: bullets(['Inflammatory / infectious leukogram', 'Anaemia', 'Cytopenias']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Serum biochemistry</strong>`, { text: bullets(['<strong>Azotaemia</strong> → uraemia', '<strong>↑ liver enzymes / bilirubin</strong> → hepatobiliary', '<strong>Glucose + ketones</strong> → DKA', '<strong>Hypercalcaemia</strong>', '<strong>Electrolytes</strong> — Na:K ratio for hypoadrenocorticism']), tone: 'teal' }],
            [`${numBadge(3)}<strong>Urinalysis</strong>`, { text: bullets(['USG <em>before</em> fluids', 'Glucose / ketones', 'Sediment']), tone: 'teal' }],
            [`${numBadge(4)}<strong>Blood pressure</strong>`, { text: bullets(['<strong>SBP &lt;90 mmHg</strong> → ACTH stimulation test (hypoadrenocorticism)', '<strong>SBP ≥140 mmHg</strong> → add SDMA and UPC']), tone: 'teal' }],
            [`${numBadge(5)}<strong>🐱 Cat add-ons</strong>`, { text: bullets(['<strong>Spec fPL</strong> — pancreatitis', '<strong>Total T4</strong>', '<strong>Retroviral status</strong> (FeLV / FIV)']), tone: 'teal' }],
          ],
        }, '🧪'),
        { kind: 'note', html: `The minimum database is the cornerstone of this work-up <span style="opacity:.7">(Ettinger Ch 17)</span>.` },

        ...stepTable(3, 'IMAGING (localise the problem)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Modality', { text: 'Looking for', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Abdominal ultrasound / radiographs</strong>`, { text: bullets(['GI foreign body or obstruction', 'Pancreatic disease', 'Hepatobiliary disease', 'Renal disease', 'Intra-abdominal mass or effusion']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Thoracic radiographs</strong>`, { text: bullets(['Masses', 'Metastasis', 'Pleural effusion', 'Aspiration'], { foot: 'Reduced intake can also be driven by respiratory distress (pleural effusion, pneumonia) — don\'t overlook the chest' }), tone: 'teal' }],
            [`${numBadge(3)}<strong>CT / MRI</strong>`, { text: bullets(['Nasal disease', 'Skull disease', 'Retrobulbar or CNS disease', 'Staging neoplasia']), tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(4, 'TARGETED / SYSTEM-BY-SYSTEM SEARCH', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['System', { text: 'Tests', tone: 'teal' }],
          rows: [
            ['<strong>Endocrine</strong>', { text: bullets(['ACTH stimulation — hypoadrenocorticism', 'Ionised calcium + PTH / PTHrP — hypercalcaemia', 'Confirm DKA']), tone: 'teal' }],
            ['<strong>Infectious</strong>', { text: bullets(['Serology / PCR — FeLV-FIV, Toxoplasma, Leishmania, Ehrlichia', '<strong>Effusion analysis</strong> — FIP', '<strong>Effusion analysis</strong> — septic peritonitis (septic if intracellular bacteria or a fluid:blood glucose gradient)']), tone: 'teal' }],
            ['<strong>GI / hepatic</strong>', { text: bullets(['Cobalamin + folate', 'Bile acids', 'Abdominocentesis', '<strong>Endoscopy / FNA / biopsy</strong> — IBD vs lymphoma, and hepatobiliary disease']), tone: 'teal' }],
            ['<strong>Pain work-up</strong>', { text: 'Orthopaedic / dental assessment for occult OA or oral pain', tone: 'teal' }],
          ],
        }, '🎯'),
        { kind: 'note', html: `Driven by the findings of the minimum database and imaging.` },

        ...stepTable(5, 'TREAT WHILE YOU INVESTIGATE (support intake)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Measure', { text: 'Detail', tone: 'teal' }],
          rows: [
            [`${numBadge(1)}<strong>Nutritional support</strong><br>the priority, especially in cats`, { text: bullets(['<strong>Assisted / tube feeding</strong> when intake &lt;RER for &gt;3–5 days (sooner in the at-risk cat)', 'NG initially, then oesophagostomy / gastrostomy', 'Build to full RER over a few days to avoid <strong>refeeding syndrome</strong> <span style="opacity:.7">(Ettinger Ch 17 / Ch 274)</span>', 'Appetite stimulants do <strong>not</strong> replace tube feeding in lipidosis']), tone: 'teal' }],
            [`${numBadge(2)}<strong>Antiemetics / anti-nausea</strong>`, { text: bullets(['<strong>Maropitant</strong> 1 mg/kg q24h ± ondansetron'], { foot: 'Treats uraemic and drug-induced nausea' }), tone: 'teal' }],
            [`${numBadge(3)}<strong>Analgesia</strong>`, { text: 'For pain-driven anorexia', tone: 'teal' }],
            [`${numBadge(4)}<strong>Appetite stimulants</strong>`, { text: bullets(['<strong>Mirtazapine</strong> — 🐱 1.88 mg/cat PO q24–48h, or transdermal Mirataz 2 mg/cat; also effective in dogs', '<strong>Capromorelin</strong> (Entyce) — 🐕 3 mg/kg PO, ghrelin-receptor agonist; caution in cats, transient insulin suppression / glucose intolerance', '<strong>Cyproheptadine</strong>', '<strong>Gabapentin</strong>']), tone: 'teal' }],
            [`${numBadge(5)}<strong>Palatability measures</strong>`, { text: bullets(['Warm the food', 'Increase moisture and aroma', 'Change texture', 'Remove environmental stressors and food aversions']), tone: 'teal' }],
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
          kind: 'pearls',
          gap: 10,
          html: `<strong>Practical pearls:</strong><br>
  • Can't-eat vs won't-eat is the first decision — <strong>interested in food but drops it, drools, paws at the mouth or gags = pseudo-anorexia</strong>; no interest at all = true anorexia. Examine the mouth (under sedation) before chasing systemic disease.<br>
  • Takes soft food but refuses kibble = mechanical/painful oral disease, not a poor appetite.<br>
  • Drooling cuts both ways — nausea causes ptyalism too, so pair it with the rest of the picture.<br>
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
