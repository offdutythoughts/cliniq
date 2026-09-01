// ── Fever / FUO — diagnostic approach (data) ─────────────────────────────────
// Confirm TRUE fever (not hyperthermia), then run the staged fever work-up
// (minimum database → targeted Phase 2/3 tests) BEFORE any immunosuppression.
// Numbers transcribed from Ettinger Ch 16 (Fever). Links to the FUO disease
// pages across the infectious / immune-mediated / neoplastic categories.

import type { DxApproach } from '../dxTypes'

export const feverDx: DxApproach = {
  title: 'Fever / FUO',
  tabs: {

    history: {
      title: 'History: Fever / FUO',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM TRUE FEVER, THEN LOCALISE' },
        {
          kind: 'check',
          html: `• <strong>Fever (pyrexia)</strong> = a <strong>regulated</strong>, pyrogen-mediated rise in the hypothalamic set point (exogenous pyrogens → IL-1, IL-6, TNF-α → prostaglandin E2 → ↑set point) — the animal does NOT show cooling behaviour<br>• <strong>Hyperthermia</strong> = a rise in core temperature WITHOUT a set-point change (panting, vasodilation, cold-seeking)<br>• <strong>FUO</strong> = temp &gt;39.2°C (102.5°F) for ≥3 weeks, no cause after ≥3 visits and/or 3 days hospitalisation (CBC, biochem, UA), often defined as persisting after a 5–10 day antibacterial trial<br>• Normal rectal = 38.0–39.2°C (100.5–102.5°F) — healthy dogs/cats reach 39.7°C (103.5°F) in the consulting room`,
        },
        { kind: 'step', tone: 'danger', text: ' STEP 1 — FEVER vs HYPERTHERMIA' },
        {
          kind: 'check',
          html: `<strong>Recent heat exposure / exercise</strong> → hyperthermia (Labradors reach 42.2°C / 108°F; most dogs 41.1°C / 106°F after exercise).<br>
    <strong>Active cooling behaviour</strong> (panting, inactivity, seeking cool areas) → hyperthermia; <strong>no cooling behaviour + lethargy / anorexia / stiffness / hyperpnea</strong> → fever.<br>
    <strong>Stress suspected</strong> (clinic, handling) → rest the patient 20 min in a cool room; if temperature normalises or is only mild (≤39.6°C / 103.3°F), further investigation may not be required.<br>
    <strong>Drug history</strong> — opioids, ketamine/phenobarbital (cats), SSRIs (both species) cause non-pyrogenic hyperthermia; sulfonamides/vaccines cause idiosyncratic drug fever.`,
        },
        { kind: 'step', text: ' STEP 2 — SIGNALMENT & EPIDEMIOLOGY' },
        {
          kind: 'check',
          html: `<strong>Young cat</strong> → FIP (20.8% of all feline FUO) — FeLV/FIV testing essential; bite abscess is the commonest feline cause.<br>
    <strong>Young dog (&lt;18 months)</strong> → non-infectious inflammatory in 65% of cases, <strong>60% of which are SRMA</strong> (Beagle, Border Collie, Cocker Spaniel, Whippet predisposed).<br>
    <strong>Older dog</strong> → neoplasia rises; Bernese Mountain Dog → histiocytic disease.<br>
    <strong>Entire female</strong> → pyometra/stump pyometra; <strong>entire male</strong> → prostatitis.<br>
    <strong>Tick exposure, geography & travel</strong> → vector-borne (ehrlichiosis, anaplasmosis, Lyme, RMSF, bartonellosis) and regional systemic fungal (blasto, cocci, histo) risk.`,
        },
        { kind: 'step', text: ' STEP 3 — COURSE, PATTERN & PRIOR RESPONSE' },
        {
          kind: 'check',
          html: `<strong>Acute (&lt;5 days), mild, no localising signs</strong> → may monitor; can resolve spontaneously and a mild acute fever may be better left untreated to allow localising signs to develop.<br>
    <strong>Chronic (≥5 days) or severe signs</strong> → proceed to the minimum database (Phase 1).<br>
    <strong>Failure to respond to an appropriate antibacterial trial</strong> → reconsider an immune-mediated, neoplastic or non-bacterial infectious cause rather than escalating antibiotics blindly.<br>
    Document the temperature trend, any localising signs (lameness, neck/back pain, coughing, dysuria, GI signs) and travel/medication history.`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Spinal/neck pain + fever = discospondylitis or SRMA until excluded · New murmur + fever = endocarditis (blood cultures + echo) · Entire female + fever + vulvar discharge = pyometra · Failure to respond to antibiotics in an older dog = neoplasia or immune-mediated disease — never reach for steroids before the infectious work-up is complete.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Fever / FUO',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' A complete PE is imperative — measure temperature correctly, then search every system for a focus' },
        { kind: 'step', text: ' STEP 1 — CONFIRM & MEASURE THE TEMPERATURE' },
        {
          kind: 'check',
          html: `<strong>Rectal</strong> is the most accurate, preferred method (good agreement with core). Second choice: <strong>tympanic membrane in dogs</strong>, <strong>axillary in cats</strong> (rectal ≈ axillary + 0.9°C / 1.6°F in cats). A difference &gt;0.5°C (0.9°F) between methods is clinically unacceptable.<br>
    <strong>Nose palpation is NOT reliable</strong> (sensitivity 29.4%, specificity 79.5%).<br>
    <strong>&gt;41.1°C (106°F)</strong> risks neurological damage, DIC and metabolic derangement and is more likely with hyperthermia — active cooling is required at this threshold (but NOT for a true fever below it).`,
        },
        { kind: 'step', text: ' STEP 2 — SYSTEMATIC SEARCH FOR A LOCALISING FOCUS' },
        {
          kind: 'check',
          html: `<strong>Skin / SC:</strong> abscesses (esp. cat bite), cellulitis, panniculitis, juvenile cellulitis, draining tracts.<br>
    <strong>Oral cavity:</strong> tooth-root abscess, stomatitis, mass.<br>
    <strong>Cardiac:</strong> auscultate for a new/changing murmur (endocarditis — only 40–43% febrile).<br>
    <strong>Thorax:</strong> dyspnoea/dullness (pneumonia, pyothorax).<br>
    <strong>Abdomen:</strong> organomegaly, pain, masses, painful kidneys (pyelonephritis); palpate for pyometra in entire females.<br>
    <strong>Spine:</strong> palpate the whole vertebral column for focal pain (discospondylitis — radiographs lag 2–6 weeks) and assess for neck pain (SRMA).`,
        },
        { kind: 'step', text: ' STEP 3 — MUSCULOSKELETAL, RECTAL & LYMPHORETICULAR' },
        {
          kind: 'check',
          html: `<strong>Joints:</strong> palpate ALL joints for effusion/pain and watch for shifting/stiff gait — immune-mediated polyarthritis is the commonest non-infectious inflammatory cause in dogs and joints can look grossly normal.<br>
    <strong>Rectal exam:</strong> assess the prostate (prostatitis), sublumbar nodes, and rectal mucosa/melena.<br>
    <strong>Lymph nodes & spleen:</strong> generalised lymphadenopathy / splenomegaly → lymphoma, vector-borne disease — sample any enlarged node.<br>
    <strong>Ophthalmic:</strong> uveitis / chorioretinitis (FIP, systemic fungal, vector-borne, lymphoma).`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Fever / FUO — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: ' STEP 1 — DON\'T TREAT THE NUMBER; COOL ONLY HYPERTHERMIA' },
        {
          kind: 'check',
          html: `<strong>Active cooling (fans, cool water) ONLY if &gt;41.1°C (106°F)</strong> — obese and upper-respiratory-compromised patients are higher risk. <strong>Do NOT actively cool a true fever</strong> — fever improves the host immune response.<br>
    Fever increases insensible water losses → monitor hydration; IV fluids may be required.<br>
    <strong>Reserve antipyretic NSAIDs</strong> for severe/prolonged fever with significant signs (risks: renal/hepatic impairment, GI ulceration, blood dyscrasias). A mild acute fever may be left untreated to allow localising signs to develop.<br>
    <strong>Withhold steroids</strong> until an immune-mediated diagnosis is established and infection is excluded.`,
        },
        { kind: 'step', text: 'STEP 2 — MINIMUM DATABASE (Phase 1)' },
        {
          kind: 'check',
          html: `<strong>CBC + blood smear:</strong> inflammatory leukogram, left shift, cytopenias, blood parasites (e.g. <em>Mycoplasma</em>, <em>Babesia</em>, morulae), atypical cells.<br>
    <strong>Serum biochemistry:</strong> organ involvement, hyperglobulinaemia (vector-borne, FIP, myeloma → protein electrophoresis).<br>
    <strong>Urinalysis (cystocentesis) + urine culture:</strong> pyelonephritis, occult UTI as a discospondylitis/bacteraemia source.<br>
    <strong>FeLV / FIV testing</strong> in at-risk cats; in cats also <strong>abdominal ultrasound</strong> + <strong>alpha-1 acid glycoprotein</strong> (FIP support).<br>
    <strong>± FNA of any mass / enlarged lymph node</strong>; <strong>± thoracic & abdominal radiographs</strong>.<br>
    <strong>Antibacterial trial (5 days):</strong> clavulanate-potentiated amoxicillin first line; <strong>doxycycline</strong> in tick-endemic areas; GS-441524 for suspected FIP. (Avoid fluoroquinolones, aminoglycosides and later cephalosporins as first-line empiric choices.)`,
        },
        { kind: 'step', text: 'STEP 3 — TARGETED IMAGING & FLUID SAMPLING (Phase 2)' },
        {
          kind: 'check',
          html: `<strong>Abdominal ultrasound</strong> (focus, organomegaly, effusion → sample any effusion: cytology, glucose/lactate for septic peritonitis, culture).<br>
    <strong>Thoracic ± abdominal imaging</strong> for pyothorax/pneumonia and occult masses.<br>
    <strong>Radiographs of the vertebrae and limbs</strong> — discospondylitis (end-plate lysis; remember the 2–6 week radiographic lag), osteomyelitis, panosteitis, metaphyseal osteopathy.<br>
    <strong>Specific serology / PCR</strong> by history and region (Ehrlichia, Anaplasma, Lyme, RMSF, Bartonella, Leptospira, Toxoplasma, Leishmania, Brucella, systemic fungal).`,
        },
        { kind: 'step', text: 'STEP 4 — ARTHROCENTESIS, BLOOD CULTURES & ECHO' },
        {
          kind: 'check',
          html: `<strong>Arthrocentesis of multiple joints</strong> (carpi, tarsi, stifles — even normal-looking joints): neutrophilic, non-septic effusion in several joints = immune-mediated polyarthritis; degenerate neutrophils + intracellular bacteria = septic arthritis.<br>
    <strong>Blood cultures (aerobic + anaerobic)</strong> + <strong>echocardiography</strong> for endocarditis, especially with a new/changing murmur (endocarditis is only 40–43% febrile).<br>
    <strong>CSF analysis</strong> (MRI of brain/spine BEFORE the tap) for SRMA / meningoencephalitis — neutrophilic pleocytosis supports SRMA.<br>
    <strong>Prostatic wash / ejaculate</strong> and <strong>Brucella serology</strong> where relevant.`,
        },
        { kind: 'step', text: 'STEP 5 — MARROW / TISSUE & THE TREATMENT TRIAL SEQUENCE (Phase 3)' },
        {
          kind: 'check',
          html: `<strong>Bone-marrow aspirate & biopsy</strong> and <strong>lymph-node aspirate</strong> (even if nodes feel normal) — occult lymphoproliferative/myeloproliferative disease, marrow infection.<br>
    <strong>Tissue biopsies</strong>, <strong>bronchoscopy + BAL</strong>, blood & faecal cultures, advanced imaging (CT thorax/head, MRI) as the picture directs.<br>
    <strong>Treatment-trial logic:</strong> an appropriately chosen <strong>antibacterial trial first</strong> (clavulanate-amoxicillin; doxycycline if tick-borne suspected) — only AFTER infection has been reasonably excluded should you move to an <strong>immunosuppressive (glucocorticoid) trial</strong> for steroid-responsive disease. Exception: co-administer antibacterials + steroids when an immune-mediated cause cannot be distinguished from a treatable infectious one (e.g. some tick-borne + secondary immune-mediated disease).<br>
    Despite a full work-up, ~22% of referred dogs and ~15% of referred cats remain undiagnosed (true FUO).`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Anaplasmosis', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
            { label: 'Lyme disease / borreliosis', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
            { label: 'Rocky Mountain spotted fever', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
            { label: 'Bartonellosis', link: { to: 'disease', id: 'DIS-INFECT-BART' } },
            { label: 'Leptospirosis', link: { to: 'disease', id: 'DIS-INFECT-LEPTO' } },
            { label: 'Leishmaniosis', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
            { label: 'Toxoplasmosis', link: { to: 'disease', id: 'DIS-INFECT-TOXO' } },
            { label: 'Cytauxzoonosis', link: { to: 'disease', id: 'DIS-INFECT-CYTAUX' } },
            { label: 'Coccidioidomycosis', link: { to: 'disease', id: 'DIS-INFECT-COCCI' } },
            { label: 'Blastomycosis', link: { to: 'disease', id: 'DIS-INFECT-BLASTO' } },
            { label: 'Histoplasmosis', link: { to: 'disease', id: 'DIS-INFECT-HISTO' } },
            { label: 'Feline infectious peritonitis (FIP)', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: 'Feline leukaemia virus (FeLV)', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
            { label: 'Feline immunodeficiency virus (FIV)', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
            { label: 'Brucellosis', link: { to: 'disease', id: 'DIS-INFECT-BRUC' } },
            { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
            { label: 'Septic peritonitis', link: { to: 'disease', id: 'DIS-GI-SEPTPERIT' } },
            { label: 'Cholangitis / cholangiohepatitis', link: { to: 'disease', id: 'DIS-HEP-CHOLANGITIS' } },
            { label: 'Pyelonephritis', link: { to: 'disease', id: 'DIS-URO-PYELO' } },
            { label: 'Prostatitis', link: { to: 'disease', id: 'DIS-URO-PROSTATITIS' } },
            { label: 'Immune-mediated polyarthritis', link: { to: 'disease', id: 'DIS-IMPA' } },
            { label: 'SRMA', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: 'Systemic lupus erythematosus (SLE)', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: 'Lymphoma / leukaemia', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Paraneoplastic syndromes', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: 'Swollen joints — localisation', link: { to: 'dx', id: 'swollen-joints' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • First decide true fever vs hyperthermia — you actively cool hyperthermia, NOT a true fever (cool only if &gt;41.1°C / 106°F).<br>
  • Work the fever up systematically (minimum database → targeted Phase 2/3) and <strong>exclude infection before any immunosuppression</strong>.<br>
  • Palpate the whole spine and tap multiple joints — discospondylitis and immune-mediated polyarthritis are easily missed and joints can look normal.<br>
  • A new murmur + fever = blood cultures + echo (endocarditis is only 40–43% febrile); discospondylitis is only ~30% febrile and radiographs lag 2–6 weeks.<br>
  • In cats, test FeLV/FIV and think FIP (20.8% of feline FUO); in young dogs think SRMA (60% of juvenile inflammatory fevers).<br>
  • Antibacterial trial first (doxycycline if tick-borne suspected), then a steroid trial only once infection is reasonably excluded; ~22% of dogs / ~15% of cats stay undiagnosed.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
