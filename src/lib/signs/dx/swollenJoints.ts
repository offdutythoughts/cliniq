// ── Swollen Joints / Joint Pain — diagnostic approach (data) ─────────────────
// Polyarthropathy work-up (Ettinger Ch 32 / Ch 71 / Ch 87 / Ch 177): confirm it
// is joint disease, decide mono- vs polyarthropathy, then localise INFLAMMATORY
// vs NON-INFLAMMATORY on arthrocentesis (the cornerstone) and SEPTIC vs
// IMMUNE-MEDIATED on culture. Always sample several joints (carpi + tarsi).

import type { DxApproach } from '../dxTypes'

export const swollenJointsDx: DxApproach = {
  title: 'Swollen Joints',
  tabs: {

    history: {
      title: 'History: Swollen Joints',
      blocks: [
        { kind: 'branch', text: 'GOAL: INFLAMMATORY vs NON-INFLAMMATORY · MONO- vs POLY-' },
        {
          kind: 'check',
          html: `Joint disease presents two ways:<br>
    • <strong>Degenerative (DJD/OA)</strong> = intermittent or shifting lameness in an otherwise healthy animal, few joints, larger proximal joints.<br>
    • <strong>Inflammatory joint disease</strong> is often NOT obviously "lame" — instead lethargy, ↓appetite and <strong>fever</strong>, affecting many joints, with the <strong>distal joints (carpi, tarsi)</strong> favoured in immune-mediated disease.<br>
    Always count the joints: <strong>monoarthropathy vs polyarthropathy</strong> drives the differential. (Ettinger Ch 32)`,
        },
        { kind: 'step', tone: 'danger', text: ' STEP 1 — IS A SINGLE HOT JOINT SEPTIC?' },
        {
          kind: 'check',
          html: `A single, swollen, very painful joint — especially after <strong>surgery, trauma or a penetrating wound (cat bite / foreign body)</strong> — is septic arthritis until proven otherwise. Prior surgery greatly increases the likelihood of a bacterial aetiology. This is an emergency: sample/lavage and start antimicrobials. Most common in a large proximal joint (stifle, elbow, shoulder, hip). (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — SIGNALMENT & BREED CLUES' },
        {
          kind: 'check',
          html: `<strong>Young–middle-aged dog (3–7 yr most common, no sex predilection)</strong> with fever + multiple distal joints → idiopathic IMPA (the commonest inflammatory joint disease).<br>
    <strong>Breed-associated syndromes:</strong> Shar-Pei (familial Shar-Pei fever — 12–48 h bouts of fever + swollen hocks; colchicine to reduce amyloidosis risk); Akita (severe juvenile-onset polyarthropathy); erosive disease in Greyhounds and Border Collies.<br>
    <strong>Cats:</strong> infectious arthritis (Mycoplasma, calicivirus) is more common than immune-mediated; FeLV-implicated periosteal proliferative polyarthritis in male cats. (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — DRUGS, VACCINES & A DISTANT FOCUS (reactive)' },
        {
          kind: 'check',
          html: `Non-erosive IMPA is frequently <strong>reactive</strong> — driven by an antigenic stimulus elsewhere. Ask about:<br>
    <strong>Drugs</strong> — trimethoprim-sulfonamide (especially Doberman Pinschers), penicillins, cephalosporins.<br>
    <strong>Recent vaccination</strong> — canine distemper, Lyme; typically within 1–2 weeks.<br>
    <strong>A distant inflammatory / infectious / neoplastic focus</strong> — chronic infection (deep mycoses, discospondylitis, endocarditis), GI inflammation (enteropathic polyarthropathy), or distant neoplasia (particularly haemic). (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: ' STEP 4 — TRAVEL, TICKS & GEOGRAPHY' },
        {
          kind: 'check',
          html: `Vector-borne polyarthritis is common and treatable — ask about <strong>tick exposure, preventive history, geographic location and travel</strong>. Consider <strong>Lyme (Borrelia), Anaplasma, Ehrlichia, RMSF (Rickettsia)</strong> and <strong>Leishmania</strong> by region, plus systemic mycoses (coccidioidomycosis, blastomycosis) where endemic. <strong>Negative serology in acute disease does not exclude infection.</strong> (Ettinger Ch 32 / Ch 177)`,
        },
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Single hot joint after surgery / a wound = septic arthritis (emergency) · Fever of unknown origin + stiff, "walking on eggshells" gait = polyarthritis until excluded · Tick / travel exposure = test (or trial doxycycline) BEFORE steroids · Recent TMS / penicillin / vaccine = consider drug-induced or post-vaccinal reactive IMPA.`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Swollen Joints',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' Watch the GAIT before you touch — then a full orthopaedic + neuro exam' },
        { kind: 'step', text: ' STEP 1 — PALPATE EVERY JOINT (not just the swollen one)' },
        {
          kind: 'check',
          html: `Systematically flex/extend and palpate <strong>all</strong> appendicular joints for swelling, effusion, heat, pain, crepitus and instability — a polyarthropathy can hide in joints that look and feel normal. A "walking on eggshells", stilted or shifting-leg lameness with reluctance to move suggests <strong>polyarthritis</strong> rather than a single orthopaedic lesion. (Ettinger Ch 32)`,
        },
        { kind: 'step', alt: true, text: ' STEP 2 — SYSTEMIC SIGNS OF INFLAMMATORY DISEASE' },
        {
          kind: 'check',
          html: `Check for <strong>fever, lethargy and inappetence</strong> — these accompany inflammatory joint disease far more than degenerative disease. Inflammatory joint disease patients are frequently presented for "weakness / won't move" rather than overt lameness. (Ettinger Ch 32)`,
        },
        { kind: 'step', alt: true, text: ' STEP 3 — HUNT FOR A SOURCE / MULTISYSTEM DISEASE' },
        {
          kind: 'check',
          html: `Look for the inciting focus or a systemic immune disease:<br>
    <strong>Peripheral lymphadenopathy</strong> (aspirate if enlarged); <strong>heart murmur</strong> (endocarditis as a haematogenous source); <strong>spinal pain</strong> (discospondylitis); <strong>skin / mucocutaneous lesions, oral ulcers</strong> (SLE, leishmaniosis).<br>
    <strong>Fundic exam</strong> — chorioretinitis / retinal change with systemic hypertension, fungal or vector-borne disease. (Ettinger Ch 32)`,
        },
        { kind: 'step', alt: true, text: ' STEP 4 — DON\'T MISTAKE BONE FOR JOINT' },
        {
          kind: 'check',
          html: `A firm, painful swelling at a <strong>juxta-articular site</strong> (distal radius, proximal humerus, distal femur, proximal tibia — "away from the elbow, toward the knee") may be <strong>osteosarcoma</strong>, not joint disease. Localise the pain to bone vs joint and image early. Prostatic disease and paw-pad disease can also masquerade as orthopaedic signs. (Ettinger Ch 32)`,
        },
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Swollen Joints — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'teal', text: ' STEP 1 — ARTHROCENTESIS + SYNOVIAL CYTOLOGY/CULTURE (the cornerstone)' },
        {
          kind: 'check',
          html: `<strong>The single most important diagnostic aid.</strong> Tap <strong>multiple distal joints — both carpi + both tarsi (≥4 joints)</strong> under heavy sedation/anaesthesia, aseptically, even if only one looks swollen. Submit <strong>individual slides for cytology per joint</strong> and <strong>pool the remainder for culture</strong> (place synovial fluid in blood-culture medium to boost sensitivity). Volume is small — &lt;0.2 mL is common; slides alone suffice.<br>
    <strong>Interpretation</strong> (Ettinger Ch 71 / Ch 87):
    <div style="margin-left:8px;">
      • Normal: TNCC &lt;3 ×10⁹/L, TP &lt;25 g/L, &gt;95% mononuclear, <strong>&lt;5–10% neutrophils</strong>, high viscosity (strings 3–5 cm).<br>
      • DJD / non-inflammatory: TNCC &lt;5 ×10⁹/L, mononuclear, &lt;10% neutrophils.<br>
      • <strong>Inflammatory (IJD): TNCC &gt;5 ×10⁹/L (often 40,000–250,000/µL), &gt;10% — usually &gt;60–90% — neutrophils.</strong><br>
      • <strong>Septic:</strong> degenerate neutrophils ± intracellular bacteria; culture POSITIVE — but sensitive in only <strong>44–63%</strong>, so culture-negative does NOT exclude sepsis.<br>
      • <strong>Immune-mediated:</strong> high neutrophil counts that are <strong>culture-negative</strong> and non-degenerate (± ragocytes, LE cells).
    </div> (Ettinger Ch 32 / Ch 71 / Ch 87)`,
        },
        { kind: 'step', alt: true, text: 'STEP 2 — RADIOGRAPHS (erosive vs non-erosive · OA · bone tumour)' },
        {
          kind: 'check',
          html: `Radiograph affected <strong>and contralateral</strong> joints. <strong>Non-erosive</strong> immune-mediated disease shows soft-tissue swelling only; <strong>erosive</strong> disease (rheumatoid arthritis; feline periosteal proliferative) shows subchondral bone lysis ± periosteal proliferation. Degenerative disease shows osteophytes / joint-space change. Crucially, radiographs also <strong>identify a juxta-articular bone tumour (osteosarcoma)</strong> masquerading as joint disease. (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: 'STEP 3 — CBC / CHEM / UA + HUNT THE FOCUS' },
        {
          kind: 'check',
          html: `<strong>CBC:</strong> mild nonregenerative anaemia and mild leukocytosis are common; <strong>thrombocytopenia</strong> prompts testing for tick-borne organisms or concurrent ITP. <strong>Chemistry:</strong> marked liver-enzyme elevation may signal a distant inflammatory stimulus; hyperglobulinaemia suggests ehrlichiosis / leishmaniosis. <strong>UA with culture.</strong><br>
    Stage and source-hunt: <strong>thoracic + abdominal imaging</strong> (occult neoplasia / infection), <strong>blood + urine cultures</strong> and <strong>echocardiogram</strong> if bacteraemia/endocarditis suspected, vertebral radiographs for discospondylitis, and CSF analysis if SRMA is concurrent.<br>
    <strong>Serum CRP</strong> is usually elevated in uncontrolled IMPA and helps differentiate IMPA from DJD and monitor response. <strong>FIV / FeLV testing in all cats with polyarthritis.</strong> (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: 'STEP 4 — VECTOR-BORNE SEROLOGY / PCR BY GEOGRAPHY' },
        {
          kind: 'check',
          html: `Test for the regionally relevant agents — <strong>Ehrlichia canis, Borrelia burgdorferi, Anaplasma phagocytophilum, RMSF (Rickettsia)</strong>, Leishmania and systemic mycoses — by serology and/or PCR, guided by geography and travel. <strong>Acute-phase serology can be negative</strong>; a pragmatic option is a <strong>doxycycline / minocycline trial</strong> — clinical response within 72 h supports a rickettsial cause. Look for <strong>morulae in neutrophils</strong> on synovial / blood smears (Anaplasma, E. ewingii). In cats add <strong>Mycoplasma culture/PCR</strong> (hard to culture conventionally). (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: 'STEP 5 — ANA / RF (interpret cautiously)' },
        {
          kind: 'check',
          html: `<strong>ANA</strong> supports SLE (one of its diagnostic criteria) but is not on its own diagnostic. <strong>Rheumatoid factor (RF)</strong> is present in ~70% of clinically diagnosed canine RA but is <strong>neither sensitive nor specific</strong> — it rises in many inflammatory diseases. Treat both as findings that <em>bolster</em> suspicion, never as stand-alone confirmation. Idiopathic/primary IMPA remains a <strong>diagnosis of exclusion</strong> after ruling out infection, reactive causes and neoplasia. (Ettinger Ch 32 / Ch 177)`,
        },
        { kind: 'step', alt: true, text: 'STEP 6 — ANTIBIOTIC-THEN-IMMUNOSUPPRESSION DECISION' },
        {
          kind: 'check',
          html: `<strong>Screen for infection BEFORE immunosuppressing.</strong> If septic / vector-borne disease is possible, treat the infection first (lavage + antimicrobials for septic arthritis; <strong>doxycycline trial</strong> for suspected vector-borne polyarthritis) — you can culture/serotest and treat empirically while awaiting results.<br>
    Only once infection is excluded/treated start immunosuppression: <strong>prednisone 1–2 mg/kg PO q24h</strong> to remission, then taper ~50% every 4 weeks (minimum ~4 months); add a steroid-sparing agent (<strong>mycophenolate 10 mg/kg PO q12h</strong>, leflunomide or ciclosporin) for relapse or to spare steroids. <strong>NSAID washout ~7 days before steroids</strong> (high GI-ulcer risk if overlapped). ~90% of IMPA respond rapidly; many relapse and some need lifelong therapy. (Ettinger Ch 177)`,
        },
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Systemic lupus erythematosus (SLE)', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: 'Steroid-responsive meningitis-arteritis (SRMA)', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: 'Lyme disease (Borrelia)', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
            { label: 'Anaplasmosis', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
            { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: 'Rocky Mountain spotted fever (RMSF)', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
            { label: 'Leishmaniosis', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
            { label: 'Osteosarcoma', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
            { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
            { label: 'Fever / PUO workup', link: { to: 'dx', id: 'fever' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Arthrocentesis of MULTIPLE joints (carpi + tarsi) is the test — sample even normal-looking joints; one or two taps can miss a polyarthropathy.<br>
  • &gt;10% neutrophils = inflammatory; culture-NEGATIVE neutrophilic inflammation = immune-mediated; degenerate neutrophils ± organisms = septic.<br>
  • Culture is positive in only 44–63% of septic cases — a negative culture does NOT rule out sepsis; use blood-culture medium for synovial fluid.<br>
  • Exclude / treat infection BEFORE steroids — trial doxycycline for vector-borne disease; rickettsial cases improve within 72 h.<br>
  • Radiograph a juxta-articular swelling — osteosarcoma can masquerade as joint disease.<br>
  • Idiopathic IMPA is a diagnosis of exclusion; CRP helps separate it from DJD and track response.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
