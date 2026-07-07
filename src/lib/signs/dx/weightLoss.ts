// ── Weight Loss — diagnostic approach (data) ────────────────────────────────
// Confirm TRUE weight loss (serial weights, >5% over <12 mo) and an ADEQUATE diet
// first; then frame by APPETITE (normal/↑ vs ↓). Minimum database + TT4 (cat),
// faecal/parasite, TLI/cobalamin/folate (EPI/malabsorption), retroviral test
// (cat), imaging, GI biopsy, and a search for occult neoplasia. Numbers from
// Ettinger Ch 18 (Weight Loss) / Ch 19 (Polyphagia). Links to disease pages.

import type { DxApproach } from '../dxTypes'

export const weightLossDx: DxApproach = {
  title: 'Weight Loss',
  tabs: {

    history: {
      title: 'History: Weight Loss',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM TRUE LOSS · CHECK DIET · SPLIT BY APPETITE' },
        {
          kind: 'check',
          html: `<strong>First confirm this is true weight loss</strong> — compare recorded serial weights rather than relying on owner impression or a single visit. <strong>~5% body weight over &lt;12 months</strong> is a reasonable threshold that warrants investigation. (Ettinger Ch 18)`,
        },
        { kind: 'step', tone: 'teal', text: ' STEP 1 — DIETARY HISTORY (adequate vs inadequate)' },
        {
          kind: 'check',
          html: `Quantify <strong>what and how much</strong> is actually eaten.<br>
    <strong>Inadequate diet</strong> → underfeeding, poor-quality food, starvation, or environmental factors (competition for food, limited access in a multi-pet household) — correct the diet and re-weigh before an extensive work-up.<br>
    <strong>Adequate diet</strong> with ongoing loss → proceed to a comprehensive diagnostic work-up. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — THE APPETITE (the pivot)' },
        {
          kind: 'check',
          html: `<strong>Normal / increased appetite + weight loss</strong> → calories are lost or cannot be used (maldigestion/malabsorption, glucosuria) OR metabolism is high (hyperthyroidism). Think EPI, IBD, GI lymphoma, PLE, parasites, diabetes mellitus, feline hyperthyroidism.<br>
    <strong>Reduced appetite + weight loss</strong> → overlaps anorexia: chronic organ disease (CKD, hepatic, cardiac cachexia), neoplasia / paraneoplastic cachexia, or chronic infection (FIV/FeLV, FIP). (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — SIGNALMENT & ASSOCIATED SIGNS' },
        {
          kind: 'check',
          html: `<strong>Older cat, good appetite, ± PU/PD / hyperactivity</strong> → feline hyperthyroidism.<br>
    <strong>PU/PD + polyphagia</strong> → diabetes mellitus (glucosuria = calorie loss).<br>
    <strong>Large-volume, malodorous, soft stools + polyphagia</strong> → EPI; <strong>chronic diarrhoea / melena</strong> → infiltrative bowel disease, lymphangiectasia, parasites.<br>
    <strong>Young, unknown deworming history, otherwise healthy</strong> → faecal exam + deworming trial. (Ettinger Ch 18/19)`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Older cat losing weight with a ravenous appetite = hyperthyroidism / DM until disproven · PU/PD + polyphagia + weight loss = diabetes — a sick inappetent diabetic may be in ketoacidosis · Marked weight + muscle loss with chronic inflammation or a known tumour = cachexia · Any cat with chronic wasting — check retroviral status (FIV/FeLV).`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Weight Loss',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' STEP 1 — OBJECTIVE BODY ASSESSMENT' },
        {
          kind: 'check',
          html: `<strong>Weigh on calibrated scales</strong> and record a <strong>body condition score (BCS)</strong> and a separate <strong>muscle condition score (MCS)</strong> — generalised muscle wasting out of proportion to fat loss points to <strong>cachexia</strong> (chronic inflammation, cancer, cardiac, end-stage renal disease). (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — ORAL / DENTAL & SWALLOWING' },
        {
          kind: 'check',
          html: `Examine the mouth for <strong>oral / dental disease</strong> (painful eating), masses, and ulceration; uraemic oral ulceration suggests CKD. A history of <strong>regurgitation</strong> points to megaesophagus; difficulty prehending/swallowing suggests a neuromuscular or oropharyngeal cause. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — TARGETED SYSTEM EXAM' },
        {
          kind: 'check',
          html: `<strong>Cervical palpation</strong> for a thyroid slip / nodule (older cat → hyperthyroidism).<br>
    <strong>Abdominal palpation</strong> for organomegaly, thickened bowel loops, mesenteric lymphadenopathy or a mass.<br>
    <strong>Cardiac auscultation</strong> (murmur / gallop / arrhythmia → cardiac cachexia) and <strong>peripheral lymph nodes</strong> (generalised lymphadenopathy → lymphoma). (Ettinger Ch 18)`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Weight Loss — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'teal', text: 'STEP 1 — CONFIRM THE TREND & DIET FIRST' },
        {
          kind: 'check',
          html: `Before testing, <strong>document the loss objectively</strong> (serial weights; &gt;5% over &lt;12 months) and <strong>confirm the diet is adequate</strong> in quality and quantity. Inadequate intake is corrected and re-weighed; adequate intake with ongoing loss earns the full work-up below. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — MINIMUM DATABASE (+ TT4 in cats)' },
        {
          kind: 'check',
          html: `<strong>CBC, serum biochemistry and urinalysis</strong> are the starting point — laboratory changes are non-specific and reflect the primary disease.<br>
    Screen for <strong>azotaemia</strong> (CKD), <strong>↑ liver enzymes / ↓ albumin</strong> (hepatic, PLE), <strong>hyperglycaemia + glucosuria ± ketones</strong> (DM/DKA), and cachexia markers (variable serum protein; ↑ fibrinogen, ↓ albumin).<br>
    <strong>Add a basal TT4 in every older cat</strong> (hyperthyroidism). (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — FAECAL / PARASITE SCREEN' },
        {
          kind: 'check',
          html: `<strong>Faecal flotation ± centrifugation</strong> for GI parasites, especially in young animals or those with an unknown deworming history; a pragmatic <strong>deworming trial</strong> is reasonable in an otherwise-healthy young patient with weight loss + polyphagia. (Ettinger Ch 18/19)`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — MALASSIMILATION PANEL (EPI / malabsorption)' },
        {
          kind: 'check',
          html: `If weight loss persists with a good appetite ± GI signs, run the malassimilation panel:<br>
    <strong>TLI</strong> — low TLI confirms <strong>exocrine pancreatic insufficiency</strong>.<br>
    <strong>Cobalamin (B12) and folate</strong> — low cobalamin / abnormal folate support distal small-intestinal malabsorption / dysbiosis and guide supplementation. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — RETROVIRAL TEST (cats)' },
        {
          kind: 'check',
          html: `Test <strong>every cat with chronic weight loss for FeLV antigen and FIV antibody</strong> — retroviral status reshapes the differential and prognosis and flags chronic infection / secondary neoplasia. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: 'STEP 6 — IMAGING & GI BIOPSY' },
        {
          kind: 'check',
          html: `<strong>Thoracic radiographs + abdominal ultrasound</strong> assess for organ disease, effusion, masses and infiltrative bowel disease; image the heart (echocardiography) where cardiac cachexia is suspected.<br>
    <strong>GI biopsy (endoscopic or surgical)</strong> is needed to separate <strong>IBD from alimentary lymphoma</strong> and to confirm PLE / lymphangiectasia — imaging alone cannot distinguish them. (Ettinger Ch 18)`,
        },
        { kind: 'step', alt: true, text: 'STEP 7 — SEARCH FOR OCCULT NEOPLASIA / CACHEXIA' },
        {
          kind: 'check',
          html: `When the minimum database is unrewarding, actively <strong>search for occult neoplasia</strong> — aspirate any node/mass, stage with imaging, and consider that marked weight loss with severe muscle loss in a chronic inflammatory or cancer setting represents <strong>cachexia</strong>.<br>
    If no diagnosis is found, <strong>periodic follow-up with serial monitoring</strong> is acceptable (up to ~30% of human cases never reach a diagnosis). (Ettinger Ch 18)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'GI / alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
            { label: 'Pancreatitis (cat)', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            { label: 'Pancreatitis (dog)', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Chronic hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: 'Lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Paraneoplastic cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: 'FIV', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
            { label: 'FeLV', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
            { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: 'PU/PD — diagnostic approach', link: { to: 'flow', id: 'pupd' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Confirm true loss (serial weights) and an adequate diet BEFORE an extensive work-up.<br>
  • Appetite is the pivot — normal/↑ appetite points to malassimilation or hypermetabolism; ↓ appetite overlaps the anorexia work-up.<br>
  • Always run a basal TT4 in an older cat, and test every chronically wasting cat for FeLV/FIV.<br>
  • Score muscle condition separately from BCS — disproportionate muscle loss flags cachexia.<br>
  • GI biopsy, not imaging, separates IBD from alimentary lymphoma.<br>
  • If no diagnosis emerges, serial monitoring with periodic re-evaluation is a legitimate strategy.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
