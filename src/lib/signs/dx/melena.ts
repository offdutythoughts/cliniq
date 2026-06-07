// ── Melena / Haematochezia — diagnostic approach (data) ──────────────────────
// GI bleeding: confirm it really is blood (vs diet / bismuth / iron mimics),
// localise upper (melena → small intestine) vs lower (haematochezia → colon),
// exclude a systemic coagulopathy + an Addisonian cause, quantify blood loss,
// then stage with bloods + faecal + imaging + endoscopy/colonoscopy + biopsy.
// Links to the GI disease pages (DIS-GI-*) and the vomiting / diarrhoea views.
// (Ettinger Ch 50)

import type { DxApproach } from '../dxTypes'

export const melenaDx: DxApproach = {
  title: 'Melena / Haematochezia',
  tabs: {

    history: {
      title: 'History: Melena / Haematochezia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM BLOOD · LOCALISE UPPER vs LOWER · EXCLUDE COAGULOPATHY' },
        {
          kind: 'check',
          html: `<strong>Melena</strong> = black, tarry, digested blood → PROXIMAL / upper GI (stomach, small intestine, or swallowed blood); ≥50–100 mL blood must be ingested before the stool turns melanic. <strong>Haematochezia</strong> = bright-red fresh blood → distal colon, rectum or anus (occasionally small intestine with rapid transit). Surface blood only → anorectal lesion; red-maroon "raspberry-jam" stool throughout → proximal colonic / AHDS. (Ettinger Ch 50)`,
        },
        { kind: 'step', text: '🍽️ STEP 1 — IS IT REALLY BLOOD? (exclude mimics)' },
        {
          kind: 'check',
          html: `<strong>Melena mimics:</strong> activated charcoal, iron supplements, bismuth-containing medications, large amounts of blueberries.<br>
    <strong>Haematochezia mimics:</strong> red food colouring, beets; perineal bite wound; anal-sac abscess.<br>
    Confirm with a faecal occult-blood test if uncertain (avoid meat-containing diet 72 h to prevent false positives), and remember <strong>swallowed blood</strong> (epistaxis, oral/pharyngeal or pulmonary lesions, raw diet) can produce melena with no true GI bleed.`,
        },
        { kind: 'step', alt: true, text: '💊 STEP 2 — DRUGS & TOXIN EXPOSURE' },
        {
          kind: 'check',
          html: `<strong>Ulcerogenic drugs:</strong> NSAIDs and corticosteroids (highest risk when combined), anticoagulants, platelet inhibitors, thrombolytics — ask specifically and discontinue.<br>
    <strong>Anticoagulant rodenticide</strong> — assess potential access; treat empirically with Vitamin K1 if suspected.<br>
    Recent surgery (enterotomy, post-GDV, PEG-tube placement) can cause melena.`,
        },
        { kind: 'step', alt: true, text: '🐾 STEP 3 — SIGNALMENT, COURSE & ASSOCIATED SIGNS' },
        {
          kind: 'check',
          html: `<strong>Young / unvaccinated dog</strong> with fever, vomiting, fetid bloody diarrhoea → parvovirus. <strong>Small-breed dog, peracute "raspberry-jam" bloody diarrhoea ± shock</strong> → AHDS.<br>
    <strong>Boxer / French Bulldog, young, large-bowel diarrhoea + weight loss</strong> → granulomatous colitis.<br>
    <strong>Older dog, weight loss, tenesmus, large-bowel signs</strong> → colorectal neoplasia / polyp.<br>
    <strong>Episodic GI signs + waxing-waning lethargy / collapse</strong> → consider hypoadrenocorticism. Vomiting / haematemesis alongside melena points upper GI — see the <strong>Vomiting</strong> approach.`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: '⚠️ RED FLAGS IN THE HISTORY',
          html: `NSAID + steroid together = high ulcer/perforation risk · Possible rodenticide access = empirical Vitamin K1 now · Waxing-waning collapse + GI bleed = exclude Addison · Peracute bloody diarrhoea + collapse = AHDS, fluid-resuscitate · Melena can equal large-volume blood loss even when the patient looks stable.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Melena / Haematochezia',
      blocks: [
        { kind: 'step', tone: 'teal', text: '🩺 A complete PE is imperative — include ORAL, RECTAL + a coagulation-screen mindset' },
        { kind: 'step', text: '🩸 STEP 1 — PERFUSION & BLOOD-LOSS STATUS' },
        {
          kind: 'check',
          html: `Mucous-membrane colour (pallor), CRT, pulse quality, heart rate and mentation quantify the haemorrhage. <strong>Bradycardia + waterhammer collapse</strong> in a hypovolaemic patient is classic for an <strong>Addisonian crisis</strong> (a tachycardia would be expected with true hypovolaemia). Estimate acute blood loss and decide whether the patient needs stabilising before any work-up.`,
        },
        { kind: 'step', alt: true, text: '🦷 STEP 2 — ORAL / NASAL / RESPIRATORY EXAM (swallowed-blood sources)' },
        {
          kind: 'check',
          html: `Examine the mouth, pharynx, gingiva and nasal planum for bleeding lesions, and auscultate the chest — <strong>swallowed blood</strong> from sinonasal, oral/pharyngeal or pulmonary disease can produce melena without a primary GI bleed. Note any petechiae / ecchymoses / venepuncture bruising suggesting a <strong>primary haemostatic defect</strong>.`,
        },
        { kind: 'step', alt: true, text: '🫃 STEP 3 — ABDOMINAL PALPATION' },
        {
          kind: 'check',
          html: `Palpate for a mass (neoplasia, intussusception "sausage"), foreign body, thickened bowel loops, organomegaly, pain or fluid wave. <strong>Marked abdominal pain ± fever</strong> raises perforation / septic peritonitis. Assess hydration and any signs of effusion.`,
        },
        { kind: 'step', alt: true, text: '👆 STEP 4 — RECTAL EXAMINATION (essential)' },
        {
          kind: 'check',
          html: `A digital rectal exam directly confirms the stool character (melena vs frank blood vs mucus), and detects <strong>rectal / colorectal masses or polyps, strictures, anal-sac disease and pelvic-canal lesions</strong>. Express and palpate the <strong>anal sacs</strong> (abscess = haematochezia mimic; firm/fixed mass ± hypercalcaemia → apocrine anal-sac adenocarcinoma, AGASACA). Always inspect the gloved finger for blood colour.`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Melena / Haematochezia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '⚡ STEP 1 — STABILISE SIGNIFICANT HAEMORRHAGE FIRST' },
        {
          kind: 'check',
          html: `Check <strong>PCV/TS</strong>; transfuse (whole blood / pRBC) for symptomatic anaemia and fluid-resuscitate hypovolaemia before GA for endoscopy. <strong>Plasma / Vitamin K1</strong> if a coagulopathy or rodenticide is suspected. For ulcer-related bleeding start gastroprotection — <strong>omeprazole / esomeprazole PO q12h (NSAID ulcer: 3–4 weeks)</strong> and <strong>sucralfate slurry 0.25 g (cats) to 1 g (large dogs) q6–8h</strong>. Discontinue NSAIDs / steroids.`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — CONFIRM IT IS BLOOD' },
        {
          kind: 'check',
          html: `Faecal occult-blood test (off meat-containing diet 72 h) when the stool colour is equivocal — to separate true GI bleeding from <strong>melena mimics</strong> (charcoal, iron, bismuth, blueberries) and <strong>haematochezia mimics</strong> (red dye, beets). Re-confirm localisation: digested black/tarry → upper; bright-red fresh → lower.`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — CBC + SMEAR & COAGULATION PANEL (exclude bleeding disorder)' },
        {
          kind: 'check',
          html: `<strong>CBC + blood smear:</strong> degree/regenerativeness of anaemia (blood loss is expected to become regenerative; peracute loss may be pre-regenerative), <strong>platelet count</strong> (confirm thrombocytopenia on a fresh smear), and <strong>neutropenia</strong> (parvovirus hallmark — present by the time haemorrhagic diarrhoea appears).<br>
    <strong>Coagulation panel — PT / aPTT</strong> (rodenticide prolongs PT first), platelet count ± buccal-mucosal bleeding time, ± D-dimers/FDPs for <strong>DIC</strong>. Run this <em>before</em> any biopsy / endoscopy.`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — CHEMISTRY + ELECTROLYTES + FAECAL TESTS' },
        {
          kind: 'check',
          html: `<strong>Serum chemistry:</strong> a <strong>BUN:creatinine ratio &gt;30 (mg/dL)</strong> — or <strong>&gt;27:1</strong> in a well-hydrated dog not on a high-protein diet — supports upper-GI haemorrhage (low sensitivity). Screen liver (portal hypertension / PSS) and kidney (uraemic gastropathy) disease, and check calcium (hypercalcaemia → AGASACA / lymphoma).<br>
    <strong>Electrolytes — Na:K ratio</strong> (hyponatraemia + hyperkalaemia, Na:K &lt;27 → <strong>hypoadrenocorticism</strong>; confirm with a baseline cortisol / ACTH-stimulation test; whipworm can mimic this).<br>
    <strong>Faecal:</strong> flotation + centrifugation (hookworm, whipworm/<em>Trichuris</em>, coccidia), parvovirus antigen ELISA, and PCR/culture for <em>Clostridium</em> / <em>Campylobacter</em> / <em>Salmonella</em>.`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — IMAGING (localise mass / obstruction / effusion)' },
        {
          kind: 'check',
          html: `<strong>Abdominal radiographs / ultrasound</strong> for masses, bowel-wall thickening/layering loss, intussusception, foreign body, lymphadenopathy and <strong>free gas / effusion</strong> (perforation). Aspirate any abdominal effusion — septic / degenerate neutrophils with intracellular bacteria, or fluid:blood-glucose gradient, confirm <strong>septic peritonitis</strong> (surgical emergency). <strong>Thoracic radiographs</strong> for metastasis (colorectal / anal-sac carcinoma) and aspiration.`,
        },
        { kind: 'step', alt: true, text: 'STEP 6 — ENDOSCOPY / COLONOSCOPY + BIOPSY (the definitive step)' },
        {
          kind: 'check',
          html: `<strong>Upper GI endoscopy</strong> for melena — visualise and biopsy gastroduodenal ulcers/erosions, masses (adenocarcinoma, GIST, lymphoma, mast-cell tumour, gastrinoma), and sample for <em>Helicobacter</em>.<br>
    <strong>Colonoscopy</strong> for haematochezia — biopsy colitis, colorectal neoplasia/polyps, and <strong>granulomatous (histiocytic ulcerative) colitis</strong> (PAS-positive macrophages + FISH/culture for adherent-invasive <em>E. coli</em>; treat with <strong>enrofloxacin 5 mg/kg PO q12h × 6–8 weeks</strong>). Biopsy / histopathology is required for definitive diagnosis of infiltrative and neoplastic disease.`,
        },
      ],
      after: [
        {
          kind: 'diseaseGrid',
          title: '📋 LINKED DISEASE PAGES',
          links: [
            { label: 'Gastroduodenal ulceration / erosion', link: { to: 'disease', id: 'DIS-GI-ULC' } },
            { label: 'Acute haemorrhagic diarrhoea syndrome (AHDS)', link: { to: 'disease', id: 'DIS-GI-AHDS' } },
            { label: 'Parvoviral enteritis', link: { to: 'disease', id: 'DIS-GI-PARVO' } },
            { label: 'Helicobacter-associated gastritis', link: { to: 'disease', id: 'DIS-GI-HELICO' } },
            { label: 'Inflammatory bowel disease / chronic enteropathy', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'Alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Idiopathic / IBD colitis', link: { to: 'disease', id: 'DIS-GI-COLITIS' } },
            { label: 'Whipworm (Trichuris vulpis)', link: { to: 'disease', id: 'DIS-GI-WHIP' } },
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
          html: `<strong>⚠️ Practical pearls:</strong><br>
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
