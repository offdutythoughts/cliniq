// ── Anorexia / Hyporexia — diagnostic approach (data) ────────────────────────
// Anorexia is a non-specific sign of almost any systemic illness (Ettinger Ch 17).
// The approach: (1) separate PSEUDO-anorexia (can't eat — oral/dental/pharyngeal/
// neuromuscular) from TRUE anorexia; (2) take a structured history (environment,
// diet, drugs, other signs); (3) full PE with oral/nasal/ocular/rectal exam;
// (4) minimum database → imaging → system-by-system targeted search; and run
// nutritional support / antiemetics / appetite stimulants alongside the work-up —
// crucial in the cat (hepatic lipidosis). Links to the DIS-* disease pages.

import type { DxApproach } from '../dxTypes'

export const anorexiaDx: DxApproach = {
  title: 'Anorexia / Hyporexia',
  tabs: {

    history: {
      title: 'History: Anorexia / Hyporexia',
      blocks: [
        { kind: 'branch', text: 'GOAL: CAN\'T EAT vs WON\'T EAT, THEN FIND THE CAUSE' },
        {
          kind: 'check',
          html: `• <strong>Hyporexia</strong> = consuming inadequate calories to maintain/reach ideal weight<br>• <strong>Anorexia</strong> = complete absence of voluntary intake<br>• <strong>Dysrexia</strong> = abnormal (cyclic/unpredictable) intake<br><span style="opacity:.7">(Ettinger Ch 17)</span><br>Anorexia is a <strong>non-specific sign of almost any systemic illness</strong>. The key first step is to separate an animal that <strong>cannot</strong> eat (pseudo-anorexia) from one that <strong>will not</strong> eat (true anorexia).`,
        },
        { kind: 'step', tone: 'danger', text: 'STEP 1 — IS THIS AN ANOREXIC CAT? (lipidosis clock)' },
        {
          kind: 'check',
          html: `Establish <strong>how long</strong> the patient has not been eating. In the cat, anorexia of <strong>≥2–14 days</strong> drives negative energy balance and <strong>hepatic lipidosis</strong> (especially the overweight cat) — this shortens the work-up timeline and makes <strong>early feeding</strong> a priority, not an afterthought (Ettinger Ch 17 / Ch 274). Quantify intake against <strong>RER</strong>: RER (kcal/day) = (30 × kg) + 70 for 3–25 kg, or 70 × kg^0.75 for any weight.`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — ENVIRONMENT, DIET & MEDICATIONS' },
        {
          kind: 'check',
          html: `<strong>Environmental stressors</strong> (new pet/person, moved house, changed routine, noise, lack of hiding/feeding resources in cats) and <strong>diet factors</strong> (spoiled/unbalanced food, change of texture/format, bowl, feeding location) commonly cause reduced intake or food aversion.<br>
    <strong>Medications</strong> that suppress appetite or cause nausea: <strong>chemotherapy, opioids, NSAIDs, antibiotics, antifungals</strong> — review the current drug list.<br>
    A genuinely well animal that simply won't eat a new food behaves very differently from one that is systemically ill.`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — OTHER CLINICAL SIGNS (localise the system)' },
        {
          kind: 'check',
          html: `Anchor the anorexia to any accompanying signs:<br>
    <strong>Vomiting / diarrhoea / abdominal pain</strong> → GI, pancreatic, hepatobiliary disease.<br>
    <strong>PU/PD ± weight loss</strong> → renal disease, DKA, hypercalcaemia, hepatic disease.<br>
    <strong>Jaundice</strong> → hepatobiliary disease / hepatic lipidosis (open the jaundice flow).<br>
    <strong>Waxing/waning lethargy, GI signs ± collapse</strong> → hypoadrenocorticism (the great pretender).<br>
    <strong>Fever</strong> → infectious/inflammatory disease, sepsis, FIP, neoplasia.<br>
    <strong>Lameness / reluctance to move / pain on handling</strong> → occult pain (OA, dental, FLUTD, otitis) — a commonly missed, treatable cause.`,
        },
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
        { kind: 'step', text: 'STEP 1 — ORAL / PHARYNGEAL EXAM (rule out pseudo-anorexia)' },
        {
          kind: 'check',
          html: `Examine the mouth carefully (often needs sedation): <strong>periodontal / periapical disease, fractured teeth, oral masses, ulceration, oronasal fistula, foreign body</strong> (e.g. linear FB under the tongue in cats), and the <strong>pharynx</strong>.<br>
    Assess the <strong>jaw and masticatory muscles</strong> (pain on opening, trismus, masseter/temporal atrophy → masticatory myositis; TMJ disease; mandibular fracture) and <strong>cranial nerves</strong> (trigeminal/facial). Also check the <strong>nose</strong> (fungal/neoplastic disease) and <strong>retrobulbar space</strong> (pain on opening the mouth / globe displacement).`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — GENERAL, OCULAR & MUCOUS MEMBRANES' },
        {
          kind: 'check',
          html: `Assess <strong>BCS and muscle condition score</strong> (drives the urgency of nutritional support), hydration, temperature (fever vs hypothermia), and mucous membranes for <strong>icterus</strong> (hepatobiliary / lipidosis), pallor or injection.<br>
    Ocular exam for <strong>uveitis / chorioretinitis</strong> (FIP, infectious, neoplastic disease). Palpate <strong>peripheral lymph nodes</strong> and the thyroid (cat).`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — ABDOMINAL PALPATION & RECTAL EXAM' },
        {
          kind: 'check',
          html: `Palpate for <strong>organomegaly, masses, intestinal foreign body, pain, effusion or thickened bowel loops</strong>. A painful cranial abdomen supports pancreatitis. <strong>Rectal exam</strong> assesses faecal character (melena), masses, and the sublumbar region.<br>
    Don't forget a <strong>musculoskeletal / orthopaedic and brief neuro exam</strong> — occult osteoarthritis and maladaptive pain are easily missed drivers of inappetence.`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Anorexia / Hyporexia — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: 'STEP 1 — CONFIRM/EXCLUDE PSEUDO-ANOREXIA' },
        {
          kind: 'check',
          html: `Before an extensive systemic work-up, settle whether the patient <strong>can</strong> eat. A thorough <strong>oral / dental exam under sedation</strong> (± dental radiographs) and assessment of the pharynx, jaw and oesophagus rules in/out a mechanical/painful "can't-eat" cause (oral/dental/oronasal disease, mass, masticatory myositis, megaoesophagus). If swallowing/regurgitation is the issue, divert to the <strong>vomiting vs regurgitation</strong> approach.`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — MINIMUM DATABASE (CBC · BIOCHEM · UA)' },
        {
          kind: 'check',
          html: `<strong>CBC</strong> (inflammatory/infectious leukogram, anaemia, cytopenias), <strong>serum biochemistry</strong> (azotaemia → uraemia; ↑ liver enzymes/bilirubin → hepatobiliary; glucose/ketones → DKA; <strong>hypercalcaemia</strong>; electrolytes — Na:K ratio for hypoadrenocorticism) and <strong>urinalysis</strong> (USG before fluids; glucose/ketones; sediment) are the cornerstone (Ettinger Ch 17).<br>
    <strong>Blood pressure:</strong> hypotensive SBP &lt;90 mmHg → ACTH stimulation test (hypoadrenocorticism); SBP ≥140 mmHg → add SDMA and UPC (Ettinger Ch 17).<br>
    Cat-specific add-ons: <strong>Spec fPL</strong> (pancreatitis), <strong>total T4</strong>, retroviral (FeLV/FIV) status.`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — IMAGING (localise the problem)' },
        {
          kind: 'check',
          html: `<strong>Abdominal ultrasound / radiographs</strong> for GI foreign body/obstruction, pancreatic, hepatobiliary, renal, intra-abdominal mass or effusion.<br>
    <strong>Thoracic radiographs</strong> for masses, metastasis, pleural effusion and aspiration. Reduced intake can also be driven by respiratory distress (pleural effusion, pneumonia) — don't overlook the chest.<br>
    <strong>CT / MRI</strong> for nasal, skull, retrobulbar or CNS disease and for staging neoplasia.`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — TARGETED / SYSTEM-BY-SYSTEM SEARCH' },
        {
          kind: 'check',
          html: `Driven by the database and imaging:<br>
    <strong>Endocrine:</strong> ACTH stimulation (hypoadrenocorticism), ionised calcium + PTH/PTHrP (hypercalcaemia), confirm DKA.<br>
    <strong>Infectious:</strong> serology/PCR (FeLV-FIV, Toxoplasma, Leishmania, Ehrlichia), <strong>effusion analysis</strong> (FIP, septic peritonitis — septic if intracellular bacteria / fluid:blood glucose gradient).<br>
    <strong>GI/hepatic:</strong> cobalamin/folate, bile acids, abdominocentesis; <strong>endoscopy / FNA / biopsy</strong> for IBD vs lymphoma and for hepatobiliary disease.<br>
    <strong>Pain work-up:</strong> orthopaedic/dental assessment for occult OA or oral pain.`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — TREAT WHILE YOU INVESTIGATE (support intake)' },
        {
          kind: 'check',
          html: `Run supportive care <em>alongside</em> the diagnostics — never wait:<br>
    <strong>Nutritional support is the priority, especially in cats.</strong> Provide <strong>assisted / tube feeding</strong> when intake is &lt;RER for &gt;3–5 days (sooner in the at-risk cat) — NG initially, then oesophagostomy/gastrostomy; build to full RER over a few days to avoid refeeding syndrome (Ettinger Ch 17 / Ch 274). Appetite stimulants do not replace tube feeding in lipidosis.<br>
    <strong>Antiemetics / anti-nausea:</strong> <strong>maropitant</strong> (1 mg/kg q24h) ± ondansetron; treat uraemic/drug-induced nausea and provide <strong>analgesia</strong> for pain-driven anorexia.<br>
    <strong>Appetite stimulants:</strong> <strong>mirtazapine</strong> (cats 1.88 mg/cat PO q24–48h, or transdermal Mirataz 2 mg/cat; also effective in dogs); <strong>capromorelin</strong> (Entyce, dogs 3 mg/kg PO — ghrelin-receptor agonist; use caution in cats, transient insulin suppression/glucose intolerance); cyproheptadine and gabapentin are alternatives.<br>
    <strong>Palatability measures:</strong> warm the food, increase moisture/aroma, change texture, remove environmental stressors and food aversions.`,
        },
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
