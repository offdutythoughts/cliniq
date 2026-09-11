// ── Melena / Haematochezia — diagnostic approach (data) ──────────────────────
// GI bleeding: confirm it really is blood (vs diet / bismuth / iron mimics),
// localise upper (melena → small intestine) vs lower (haematochezia → colon),
// exclude a systemic coagulopathy + an Addisonian cause, quantify blood loss,
// then stage with bloods + faecal + imaging + endoscopy/colonoscopy + biopsy.
// Links to the GI disease pages (DIS-GI-*) and the vomiting / diarrhoea views.
// (Ettinger Ch 50)

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const melenaDx: DxApproach = {
  title: 'Melena / Haematochezia',
  tabs: {

    history: {
      title: 'History: Melena / Haematochezia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM BLOOD · LOCALISE UPPER vs LOWER · EXCLUDE COAGULOPATHY' },
        {
          kind: 'gridTable',
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Sign', { text: 'Localises to', tone: 'teal' }],
          rows: [
            ['<strong>Melena</strong><br>black, tarry, digested blood', { text: '<strong>Proximal / upper GI</strong> — stomach · small intestine · swallowed blood. ≥50–100 mL blood must be ingested before stool turns melanic', tone: 'teal' }],
            ['<strong>Haematochezia</strong><br>bright-red fresh blood', { text: '<strong>Distal colon · rectum · anus</strong> — occasionally small intestine with rapid transit', tone: 'teal' }],
            ['<strong>Surface blood only</strong>', { text: 'Anorectal lesion', tone: 'teal' }],
            ['<strong>Red-maroon "raspberry-jam" stool throughout</strong>', { text: 'Proximal colonic / AHDS <span style="opacity:.7">(Ettinger Ch 50)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(1, 'IS IT REALLY BLOOD? (exclude mimics)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Mimic / test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Melena mimics</strong>', { text: 'Activated charcoal · iron supplements · bismuth-containing medications · large amounts of blueberries', tone: 'teal' }],
            ['<strong>Haematochezia mimics</strong>', { text: 'Red food colouring · beets · perineal bite wound · anal-sac abscess', tone: 'teal' }],
            ['<strong>Faecal occult-blood test</strong>', { text: 'If uncertain — avoid meat-containing diet for 72 h to prevent false positives', tone: 'teal' }],
            ['<strong>Swallowed blood</strong>', { text: 'Epistaxis · oral / pharyngeal or pulmonary lesions · raw diet — can produce melena with <strong>no true GI bleed</strong>', tone: 'teal' }],
          ],
        }, '🔍'),

        ...stepTable(2, 'DRUGS & TOXIN EXPOSURE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Exposure', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Ulcerogenic drugs</strong>', { text: 'NSAIDs and corticosteroids (<strong>highest risk when combined</strong>) · anticoagulants · platelet inhibitors · thrombolytics — ask specifically and discontinue', tone: 'danger' }],
            ['<strong>Anticoagulant rodenticide</strong>', { text: 'Assess potential access; treat empirically with Vitamin K1 if suspected', tone: 'danger' }],
            ['<strong>Recent surgery</strong>', { text: 'Enterotomy · post-GDV · PEG-tube placement can cause melena', tone: 'teal' }],
          ],
        }, '💊'),

        ...stepTable(3, 'SIGNALMENT, COURSE & ASSOCIATED SIGNS', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Picture', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young / unvaccinated dog</strong> + fever · vomiting · fetid bloody diarrhoea', { text: 'Parvovirus', tone: 'teal' }],
            ['<strong>Small-breed dog, peracute "raspberry-jam" bloody diarrhoea ± shock</strong>', { text: 'AHDS', tone: 'danger' }],
            ['<strong>Boxer / French Bulldog, young, large-bowel diarrhoea + weight loss</strong>', { text: 'Granulomatous colitis', tone: 'teal' }],
            ['<strong>Older dog · weight loss · tenesmus · large-bowel signs</strong>', { text: 'Colorectal neoplasia / polyp', tone: 'teal' }],
            ['<strong>Episodic GI signs + waxing–waning lethargy / collapse</strong>', { text: 'Consider hypoadrenocorticism', tone: 'teal' }],
            ['<strong>Vomiting / haematemesis alongside melena</strong>', { text: 'Upper GI — see the <strong>Vomiting</strong> approach', tone: 'teal' }],
          ],
        }, '🐾'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `NSAID + steroid together = high ulcer/perforation risk · Possible rodenticide access = empirical Vitamin K1 now · Waxing-waning collapse + GI bleed = exclude Addison · Peracute bloody diarrhoea + collapse = AHDS, fluid-resuscitate · Melena can equal large-volume blood loss even when the patient looks stable.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Melena / Haematochezia',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — include ORAL, RECTAL + a coagulation-screen mindset' },

        ...stepTable(1, 'PERFUSION & BLOOD-LOSS STATUS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>MM colour (pallor) · CRT · pulse quality · heart rate · mentation</strong>', { text: 'Quantify the haemorrhage', tone: 'teal' }],
            ['<strong>Bradycardia + waterhammer collapse in a hypovolaemic patient</strong>', { text: 'Classic for an <strong>Addisonian crisis</strong> — a tachycardia would be expected with true hypovolaemia', tone: 'danger' }],
            ['<strong>Estimate acute blood loss</strong>', { text: 'Decide whether the patient needs stabilising before any work-up', tone: 'teal' }],
          ],
        }, '🩺'),

        ...stepTable(2, 'ORAL / NASAL / RESPIRATORY EXAM (swallowed-blood sources)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Mouth · pharynx · gingiva · nasal planum</strong>', { text: 'Bleeding lesions', tone: 'teal' }],
            ['<strong>Chest auscultation</strong>', { text: '<strong>Swallowed blood</strong> from sinonasal, oral / pharyngeal or pulmonary disease can produce melena without a primary GI bleed', tone: 'teal' }],
            ['<strong>Petechiae / ecchymoses / venepuncture bruising</strong>', { text: 'A <strong>primary haemostatic defect</strong>', tone: 'danger' }],
          ],
        }, '👄'),

        ...stepTable(3, 'ABDOMINAL PALPATION', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Palpate for', { text: 'Significance', tone: 'teal' }],
          rows: [
            ['<strong>Mass</strong>', { text: 'Neoplasia · intussusception ("sausage")', tone: 'teal' }],
            ['<strong>Foreign body · thickened bowel loops · organomegaly</strong>', { text: 'Structural GI disease', tone: 'teal' }],
            ['<strong>Marked abdominal pain ± fever</strong>', { text: '<strong>Perforation / septic peritonitis</strong>', tone: 'danger' }],
            ['<strong>Hydration · fluid wave</strong>', { text: 'Effusion', tone: 'teal' }],
          ],
        }, '🤲'),

        ...stepTable(4, 'RECTAL EXAMINATION (essential)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Stool character</strong>', { text: 'Melena vs frank blood vs mucus — always inspect the gloved finger for blood colour', tone: 'teal' }],
            ['<strong>Rectal / colorectal lesions</strong>', { text: 'Masses · polyps · strictures · pelvic-canal lesions', tone: 'teal' }],
            ['<strong>Anal sacs</strong> — express and palpate', { text: 'Abscess = haematochezia mimic · firm / fixed mass ± hypercalcaemia → <strong>apocrine anal-sac adenocarcinoma (AGASACA)</strong>', tone: 'teal' }],
          ],
        }, '👆'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Melena / Haematochezia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE SIGNIFICANT HAEMORRHAGE FIRST', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Check PCV / TS</strong>', { text: 'Transfuse (whole blood / pRBC) for symptomatic anaemia and fluid-resuscitate hypovolaemia <strong>before GA for endoscopy</strong>', tone: 'danger' }],
            ['<strong>Plasma / Vitamin K1</strong>', { text: 'If a coagulopathy or rodenticide is suspected', tone: 'danger' }],
            ['<strong>Gastroprotection for ulcer-related bleeding</strong>', { text: '<strong>Omeprazole / esomeprazole PO q12h</strong> (NSAID ulcer: 3–4 weeks) + <strong>sucralfate slurry</strong> 0.25 g (🐱) to 1 g (large 🐕) q6–8h', tone: 'teal' }],
            ['<strong>Discontinue NSAIDs / steroids</strong>', { text: 'Remove the ulcerogenic driver', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'CONFIRM IT IS BLOOD', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Faecal occult-blood test</strong>', { text: 'Off meat-containing diet for 72 h — when the stool colour is equivocal', tone: 'teal' }],
            ['<strong>Separates true GI bleeding from</strong>', { text: '<strong>Melena mimics</strong> (charcoal · iron · bismuth · blueberries) and <strong>haematochezia mimics</strong> (red dye · beets)', tone: 'teal' }],
            ['<strong>Re-confirm localisation</strong>', { text: 'Digested black / tarry → upper · bright-red fresh → lower', tone: 'teal' }],
          ],
        }, '🔬'),

        ...stepTable(3, 'CBC + SMEAR & COAGULATION PANEL (exclude bleeding disorder)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>CBC + blood smear</strong>', { text: 'Degree and regenerativeness of anaemia (blood loss is expected to become regenerative; peracute loss may be pre-regenerative)', tone: 'teal' }],
            ['<strong>Platelet count</strong>', { text: 'Confirm thrombocytopenia on a fresh smear', tone: 'teal' }],
            ['<strong>Neutropenia</strong>', { text: 'Parvovirus hallmark — present by the time haemorrhagic diarrhoea appears', tone: 'teal' }],
            ['<strong>Coagulation panel — PT / aPTT</strong>', { text: 'Rodenticide prolongs <strong>PT first</strong>; ± buccal-mucosal bleeding time; ± D-dimers / FDPs for <strong>DIC</strong>', tone: 'teal' }],
            ['<strong>Timing</strong>', { text: 'Run this <strong>before</strong> any biopsy or endoscopy', tone: 'danger' }],
          ],
        }, '🩸'),

        ...stepTable(4, 'CHEMISTRY + ELECTROLYTES + FAECAL TESTS', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>BUN:creatinine ratio</strong>', { text: '<strong>&gt;30 (mg/dL)</strong> — or <strong>&gt;27:1</strong> in a well-hydrated dog not on a high-protein diet — supports upper-GI haemorrhage (low sensitivity)', tone: 'teal' }],
            ['<strong>Serum chemistry</strong>', { text: 'Liver (portal hypertension / PSS) · kidney (uraemic gastropathy) · calcium (hypercalcaemia → AGASACA / lymphoma)', tone: 'teal' }],
            ['<strong>Electrolytes — Na:K ratio</strong>', { text: 'Hyponatraemia + hyperkalaemia, Na:K &lt;27 → <strong>hypoadrenocorticism</strong>; confirm with baseline cortisol / ACTH-stimulation test. <strong>Whipworm can mimic this</strong>', tone: 'danger' }],
            ['<strong>Faecal</strong>', { text: 'Flotation + centrifugation (hookworm · whipworm / <em>Trichuris</em> · coccidia) · parvovirus antigen ELISA · PCR / culture for <em>Clostridium</em> · <em>Campylobacter</em> · <em>Salmonella</em>', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(5, 'IMAGING (localise mass / obstruction / effusion)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Modality', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Abdominal radiographs / ultrasound</strong>', { text: 'Masses · bowel-wall thickening or loss of layering · intussusception · foreign body · lymphadenopathy · <strong>free gas / effusion</strong> (perforation)', tone: 'teal' }],
            ['<strong>Aspirate any abdominal effusion</strong>', { text: 'Septic / degenerate neutrophils with intracellular bacteria, or a fluid:blood-glucose gradient, confirm <strong>septic peritonitis</strong> — surgical emergency', tone: 'danger' }],
            ['<strong>Thoracic radiographs</strong>', { text: 'Metastasis (colorectal / anal-sac carcinoma) · aspiration', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(6, 'ENDOSCOPY / COLONOSCOPY + BIOPSY (the definitive step)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Procedure', { text: 'What it shows / does', tone: 'teal' }],
          rows: [
            ['<strong>Upper GI endoscopy</strong> — for melena', { text: 'Visualise and biopsy gastroduodenal ulcers / erosions · masses (adenocarcinoma · GIST · lymphoma · mast-cell tumour · gastrinoma) · sample for <em>Helicobacter</em>', tone: 'teal' }],
            ['<strong>Colonoscopy</strong> — for haematochezia', { text: 'Biopsy colitis · colorectal neoplasia / polyps · <strong>granulomatous (histiocytic ulcerative) colitis</strong> — PAS-positive macrophages + FISH / culture for adherent-invasive <em>E. coli</em>; treat with <strong>enrofloxacin 5 mg/kg PO q12h × 6–8 weeks</strong>', tone: 'teal' }],
            ['<strong>Biopsy / histopathology</strong>', { text: 'Required for definitive diagnosis of infiltrative and neoplastic disease', tone: 'teal' }],
          ],
        }, '🔬'),
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Acute haemorrhagic diarrhoea syndrome (AHDS)', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
            { label: 'Parvoviral enteritis', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
            { label: 'Helicobacter-associated gastritis', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
            { label: 'Inflammatory bowel disease / chronic enteropathy', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Idiopathic / IBD colitis', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
            { label: 'GI parasites — by location', link: { to: 'flow', id: 'gi-parasites' } },
            { label: 'Granulomatous colitis', link: { to: 'disease', id: 'DIS-GI-GRANCOL' } },
            { label: 'Colorectal neoplasia / polyp', link: { to: 'disease', id: 'DIS-GI-CRC' } },
            { label: 'Anal-sac adenocarcinoma (AGASACA)', link: { to: 'disease', id: 'DIS-NEO-AGASACA' } },
            { label: 'Anticoagulant rodenticide', link: { to: 'disease', id: 'DIS-BD-ROD' } },
            { label: 'Hypoadrenocorticism (Addison)', link: { to: 'disease', id: 'DIS-SEC-HYPO' } },
            { label: 'GI perforation / septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
            { label: 'Vomiting — diagnostic approach', link: { to: 'dx', id: 'vomiting' } },
            { label: 'Diarrhoea — diagnostic approach', link: { to: 'dx', id: 'diarrhoea' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Characterise the stool first — melena = upper/digested, haematochezia = lower/fresh — then exclude diet/bismuth/iron mimics and swallowed blood.<br>
  • Run a coagulation panel BEFORE scoping or biopsy — never miss a rodenticide / thrombocytopenia / DIC bleed.<br>
  • GI bleed + bradycardia + Na:K &lt;27 = Addison until excluded; whipworm can copy the electrolyte picture.<br>
  • Marked abdominal pain + fever + free gas/septic effusion = perforation / septic peritonitis — surgical emergency.<br>
  • Melena alone can mean major blood loss — quantify with PCV/TS and stabilise before GA; start omeprazole + sucralfate for ulcer bleeding.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
