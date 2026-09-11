// ── Swollen Joints / Joint Pain — diagnostic approach (data) ─────────────────
// Polyarthropathy work-up (Ettinger Ch 32 / Ch 71 / Ch 87 / Ch 177): confirm it
// is joint disease, decide mono- vs polyarthropathy, then localise INFLAMMATORY
// vs NON-INFLAMMATORY on arthrocentesis (the cornerstone) and SEPTIC vs
// IMMUNE-MEDIATED on culture. Always sample several joints (carpi + tarsi).

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const swollenJointsDx: DxApproach = {
  title: 'Swollen Joints',
  tabs: {

    history: {
      title: 'History: Swollen Joints',
      blocks: [
        { kind: 'branch', text: 'GOAL: INFLAMMATORY vs NON-INFLAMMATORY · MONO- vs POLY-' },
        {
          kind: 'gridTable',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Presentation', { text: 'Features', tone: 'teal' }],
          rows: [
            ['<strong>Degenerative (DJD / OA)</strong>', { text: 'Intermittent or shifting lameness in an otherwise healthy animal · few joints · larger proximal joints', tone: 'teal' }],
            ['<strong>Inflammatory joint disease</strong>', { text: 'Often <strong>not obviously lame</strong> — lethargy · ↓ appetite · <strong>fever</strong>; many joints, with the <strong>distal joints (carpi · tarsi)</strong> favoured in immune-mediated disease', tone: 'teal' }],
          ],
        },
        { kind: 'note', html: `Always count the joints: <strong>monoarthropathy vs polyarthropathy</strong> drives the differential. <span style="opacity:.7">(Ettinger Ch 32)</span>` },

        { kind: 'step', tone: 'danger', text: '🚨 STEP 1 — IS A SINGLE HOT JOINT SEPTIC?', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Action', tone: 'teal' }],
          rows: [
            ['<strong>Single, swollen, very painful joint</strong> — especially after surgery, trauma or a penetrating wound (cat bite · foreign body)', { text: '<strong>Septic arthritis until proven otherwise.</strong> Prior surgery greatly increases the likelihood of a bacterial aetiology', tone: 'danger' }],
            ['<strong>This is an emergency</strong>', { text: 'Sample / lavage and start antimicrobials', tone: 'danger' }],
            ['<strong>Typical site</strong>', { text: 'A large proximal joint — stifle · elbow · shoulder · hip <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'SIGNALMENT & BREED CLUES', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Young–middle-aged dog</strong> (3–7 yr most common, no sex predilection) + fever + multiple distal joints', { text: '<strong>Idiopathic IMPA</strong> — the commonest inflammatory joint disease', tone: 'teal' }],
            ['<strong>Shar-Pei</strong>', { text: 'Familial Shar-Pei fever — 12–48 h bouts of fever + swollen hocks; colchicine to reduce amyloidosis risk', tone: 'teal' }],
            ['<strong>Akita</strong>', { text: 'Severe juvenile-onset polyarthropathy', tone: 'teal' }],
            ['<strong>Greyhound · Border Collie</strong>', { text: 'Erosive disease', tone: 'teal' }],
            ['<strong>🐱 Cats</strong>', { text: 'Infectious arthritis (Mycoplasma · calicivirus) is more common than immune-mediated; FeLV-implicated periosteal proliferative polyarthritis in male cats <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'DRUGS, VACCINES & A DISTANT FOCUS (reactive)', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Ask about', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Drugs</strong>', { text: 'Trimethoprim-sulfonamide (especially Doberman Pinschers) · penicillins · cephalosporins', tone: 'teal' }],
            ['<strong>Recent vaccination</strong>', { text: 'Canine distemper · Lyme — typically within 1–2 weeks', tone: 'teal' }],
            ['<strong>A distant inflammatory / infectious / neoplastic focus</strong>', { text: 'Chronic infection (deep mycoses · discospondylitis · endocarditis) · GI inflammation (enteropathic polyarthropathy) · distant neoplasia (particularly haemic) <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        }, '💊'),
        { kind: 'note', html: `Non-erosive IMPA is frequently <strong>reactive</strong> — driven by an antigenic stimulus elsewhere.` },

        ...stepTable(4, 'TRAVEL, TICKS & GEOGRAPHY', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Ask about', { text: 'Consider', tone: 'teal' }],
          rows: [
            ['<strong>Tick exposure · preventive history · geography · travel</strong>', { text: 'Vector-borne polyarthritis is common <em>and treatable</em>', tone: 'teal' }],
            ['<strong>Regional agents</strong>', { text: '<strong>Lyme (Borrelia)</strong> · Anaplasma · Ehrlichia · <strong>RMSF (Rickettsia)</strong> · Leishmania · systemic mycoses (coccidioidomycosis · blastomycosis) where endemic', tone: 'teal' }],
            ['<strong>Caveat</strong>', { text: '<strong>Negative serology in acute disease does not exclude infection</strong> <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'danger' }],
          ],
        }, '🌍'),
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

        ...stepTable(1, 'PALPATE EVERY JOINT (not just the swollen one)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Why', tone: 'teal' }],
          rows: [
            ['<strong>Systematically flex / extend and palpate ALL appendicular joints</strong>', { text: 'Swelling · effusion · heat · pain · crepitus · instability — <strong>a polyarthropathy can hide in joints that look and feel normal</strong>', tone: 'danger' }],
            ['<strong>"Walking on eggshells", stilted or shifting-leg lameness with reluctance to move</strong>', { text: 'Suggests <strong>polyarthritis</strong> rather than a single orthopaedic lesion <span style="opacity:.7">(Ettinger Ch 32)</span>', tone: 'teal' }],
          ],
        }, '🤲'),

        ...stepTable(2, 'SYSTEMIC SIGNS OF INFLAMMATORY DISEASE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Check for', { text: 'Significance', tone: 'teal' }],
          rows: [
            ['<strong>Fever · lethargy · inappetence</strong>', { text: 'Accompany inflammatory joint disease far more than degenerative disease', tone: 'teal' }],
            ['<strong>Presenting complaint</strong>', { text: 'Inflammatory joint disease patients are frequently presented for "weakness / won\'t move" rather than overt lameness <span style="opacity:.7">(Ettinger Ch 32)</span>', tone: 'teal' }],
          ],
        }, '🌡️'),

        ...stepTable(3, 'HUNT FOR A SOURCE / MULTISYSTEM DISEASE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Peripheral lymphadenopathy</strong>', { text: 'Aspirate if enlarged', tone: 'teal' }],
            ['<strong>Heart murmur</strong>', { text: 'Endocarditis as a haematogenous source', tone: 'teal' }],
            ['<strong>Spinal pain</strong>', { text: 'Discospondylitis', tone: 'teal' }],
            ['<strong>Skin / mucocutaneous lesions · oral ulcers</strong>', { text: 'SLE · leishmaniosis', tone: 'teal' }],
            ['<strong>Fundic exam</strong>', { text: 'Chorioretinitis / retinal change with systemic hypertension · fungal or vector-borne disease <span style="opacity:.7">(Ettinger Ch 32)</span>', tone: 'teal' }],
          ],
        }, '🔍'),

        ...stepTable(4, 'DON\'T MISTAKE BONE FOR JOINT', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Consider', tone: 'teal' }],
          rows: [
            ['<strong>Firm, painful swelling at a juxta-articular site</strong><br>distal radius · proximal humerus · distal femur · proximal tibia — "away from the elbow, toward the knee"', { text: '<strong>Osteosarcoma</strong>, not joint disease — localise the pain to bone vs joint and <strong>image early</strong>', tone: 'danger' }],
            ['<strong>Other masqueraders</strong>', { text: 'Prostatic disease and paw-pad disease can also present as orthopaedic signs <span style="opacity:.7">(Ettinger Ch 32)</span>', tone: 'teal' }],
          ],
        }, '🦴'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Swollen Joints — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'teal', text: '💉 STEP 1 — ARTHROCENTESIS + SYNOVIAL CYTOLOGY/CULTURE (the cornerstone)', noArrowAfter: true },
        {
          kind: 'gridTable',
          label: 'Technique',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Element', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Which joints</strong>', { text: 'Tap <strong>multiple distal joints — both carpi + both tarsi (≥4 joints)</strong>, under heavy sedation / anaesthesia, aseptically, <strong>even if only one looks swollen</strong>', tone: 'danger' }],
            ['<strong>Sample handling</strong>', { text: 'Individual slides for <strong>cytology per joint</strong>; <strong>pool the remainder for culture</strong> — place synovial fluid in blood-culture medium to boost sensitivity', tone: 'teal' }],
            ['<strong>Volume</strong>', { text: 'Small — &lt;0.2 mL is common; slides alone suffice', tone: 'teal' }],
          ],
        },
        {
          kind: 'gridTable',
          label: 'Interpretation',
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Category', { text: 'Findings', tone: 'teal' }],
          rows: [
            ['<strong>Normal</strong>', { text: 'TNCC &lt;3 ×10⁹/L · TP &lt;25 g/L · &gt;95% mononuclear · <strong>&lt;5–10% neutrophils</strong> · high viscosity (strings 3–5 cm)', tone: 'teal' }],
            ['<strong>DJD / non-inflammatory</strong>', { text: 'TNCC &lt;5 ×10⁹/L · mononuclear · &lt;10% neutrophils', tone: 'teal' }],
            ['<strong>Inflammatory (IJD)</strong>', { text: '<strong>TNCC &gt;5 ×10⁹/L</strong> (often 40,000–250,000/µL) · <strong>&gt;10% — usually &gt;60–90% — neutrophils</strong>', tone: 'teal' }],
            ['<strong>Septic</strong>', { text: 'Degenerate neutrophils ± intracellular bacteria · culture POSITIVE — but sensitive in only <strong>44–63%</strong>, so <strong>culture-negative does NOT exclude sepsis</strong>', tone: 'danger' }],
            ['<strong>Immune-mediated</strong>', { text: 'High neutrophil counts that are <strong>culture-negative</strong> and non-degenerate ± ragocytes · LE cells <span style="opacity:.7">(Ettinger Ch 32 / Ch 71 / Ch 87)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'RADIOGRAPHS (erosive vs non-erosive · OA · bone tumour)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Finding', { text: 'Means', tone: 'teal' }],
          rows: [
            ['<strong>Which views</strong>', { text: 'Radiograph affected <strong>and contralateral</strong> joints', tone: 'teal' }],
            ['<strong>Non-erosive</strong>', { text: 'Soft-tissue swelling only — immune-mediated disease', tone: 'teal' }],
            ['<strong>Erosive</strong>', { text: 'Subchondral bone lysis ± periosteal proliferation — rheumatoid arthritis · feline periosteal proliferative', tone: 'teal' }],
            ['<strong>Degenerative</strong>', { text: 'Osteophytes / joint-space change', tone: 'teal' }],
            ['<strong>Juxta-articular bone tumour</strong>', { text: 'Radiographs identify an <strong>osteosarcoma</strong> masquerading as joint disease <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'danger' }],
          ],
        }, '📊'),

        ...stepTable(3, 'CBC / CHEM / UA + HUNT THE FOCUS', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>CBC</strong>', { text: 'Mild non-regenerative anaemia and mild leukocytosis are common. <strong>Thrombocytopenia</strong> prompts testing for tick-borne organisms or concurrent ITP', tone: 'teal' }],
            ['<strong>Chemistry</strong>', { text: 'Marked liver-enzyme elevation may signal a distant inflammatory stimulus; hyperglobulinaemia suggests ehrlichiosis / leishmaniosis', tone: 'teal' }],
            ['<strong>Urinalysis with culture</strong>', { text: 'Occult UTI as a focus', tone: 'teal' }],
            ['<strong>Source-hunt</strong>', { text: 'Thoracic + abdominal imaging (occult neoplasia / infection) · blood + urine cultures · echocardiogram if bacteraemia or endocarditis suspected · vertebral radiographs for discospondylitis · CSF analysis if SRMA is concurrent', tone: 'teal' }],
            ['<strong>Serum CRP</strong>', { text: 'Usually elevated in uncontrolled IMPA — helps differentiate IMPA from DJD and monitor response', tone: 'teal' }],
            ['<strong>🐱 FIV / FeLV</strong>', { text: 'Test <strong>all</strong> cats with polyarthritis <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(4, 'VECTOR-BORNE SEROLOGY / PCR BY GEOGRAPHY', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Regionally relevant agents</strong>', { text: '<em>Ehrlichia canis</em> · <em>Borrelia burgdorferi</em> · <em>Anaplasma phagocytophilum</em> · RMSF (Rickettsia) · Leishmania · systemic mycoses — serology and/or PCR, guided by geography and travel', tone: 'teal' }],
            ['<strong>Acute-phase serology can be negative</strong>', { text: 'A pragmatic option is a <strong>doxycycline / minocycline trial</strong> — clinical response within <strong>72 h</strong> supports a rickettsial cause', tone: 'teal' }],
            ['<strong>Morulae in neutrophils</strong>', { text: 'On synovial / blood smears — Anaplasma · <em>E. ewingii</em>', tone: 'teal' }],
            ['<strong>🐱 Mycoplasma culture / PCR</strong>', { text: 'Hard to culture conventionally <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        }, '🦠'),

        ...stepTable(5, 'ANA / RF (interpret cautiously)', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>ANA</strong>', { text: 'Supports SLE (one of its diagnostic criteria) but is <strong>not on its own diagnostic</strong>', tone: 'teal' }],
            ['<strong>Rheumatoid factor (RF)</strong>', { text: 'Present in ~70% of clinically diagnosed canine RA but <strong>neither sensitive nor specific</strong> — it rises in many inflammatory diseases', tone: 'teal' }],
            ['<strong>Use them as</strong>', { text: 'Findings that <em>bolster</em> suspicion, never stand-alone confirmation. Idiopathic / primary IMPA remains a <strong>diagnosis of exclusion</strong> after ruling out infection, reactive causes and neoplasia <span style="opacity:.7">(Ettinger Ch 32 / Ch 177)</span>', tone: 'teal' }],
          ],
        }, '🔬'),

        ...stepTable(6, 'ANTIBIOTIC-THEN-IMMUNOSUPPRESSION DECISION', {
          cols: '0.75fr 1.4fr',
          dividers: true,
          headers: ['Step', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Screen for infection BEFORE immunosuppressing</strong>', { text: 'If septic or vector-borne disease is possible, treat the infection first — lavage + antimicrobials for septic arthritis · <strong>doxycycline trial</strong> for suspected vector-borne polyarthritis. Culture / serotest and treat empirically while awaiting results', tone: 'danger' }],
            ['<strong>Then immunosuppress</strong>', { text: '<strong>Prednisone 1–2 mg/kg PO q24h</strong> to remission, then taper ~50% every 4 weeks (minimum ~4 months)', tone: 'teal' }],
            ['<strong>Steroid-sparing agents</strong>', { text: '<strong>Mycophenolate 10 mg/kg PO q12h</strong> · leflunomide · ciclosporin — for relapse or to spare steroids', tone: 'teal' }],
            ['<strong>NSAID washout</strong>', { text: '~7 days before steroids — <strong>high GI-ulcer risk if overlapped</strong>', tone: 'danger' }],
            ['<strong>Prognosis</strong>', { text: '~90% of IMPA respond rapidly; many relapse and some need lifelong therapy <span style="opacity:.7">(Ettinger Ch 177)</span>', tone: 'teal' }],
          ],
        }, '💊'),
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
            { label: 'Cranial cruciate ligament disease', link: { to: 'disease', id: 'DIS-MSK-CCL' } },
            { label: 'Patellar luxation', link: { to: 'disease', id: 'DIS-MSK-PATLUX' } },
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
