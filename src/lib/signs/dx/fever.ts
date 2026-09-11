// ── Fever / FUO — diagnostic approach (data) ─────────────────────────────────
// Confirm TRUE fever (not hyperthermia), then run the staged fever work-up
// (minimum database → targeted Phase 2/3 tests) BEFORE any immunosuppression.
// Numbers transcribed from Ettinger Ch 16 (Fever). Links to the FUO disease
// pages across the infectious / immune-mediated / neoplastic categories.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const feverDx: DxApproach = {
  title: 'Fever / FUO',
  tabs: {

    history: {
      title: 'History: Fever / FUO',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM TRUE FEVER, THEN LOCALISE' },
        {
          kind: 'gridTable',
          cols: '0.6fr 1.5fr',
          dividers: true,
          headers: ['Term', { text: 'Definition', tone: 'teal' }],
          rows: [
            ['<strong>Fever (pyrexia)</strong>', { text: 'A <strong>regulated</strong>, pyrogen-mediated rise in the hypothalamic set point (exogenous pyrogens → IL-1 · IL-6 · TNF-α → prostaglandin E2 → ↑ set point) — the animal does <strong>NOT</strong> show cooling behaviour', tone: 'teal' }],
            ['<strong>Hyperthermia</strong>', { text: 'A rise in core temperature <strong>without</strong> a set-point change — panting · vasodilation · cold-seeking', tone: 'teal' }],
            ['<strong>FUO</strong>', { text: 'Temp &gt;39.2°C (102.5°F) for ≥3 weeks, no cause after ≥3 visits and/or 3 days hospitalisation (CBC · biochem · UA); often defined as persisting after a 5–10 day antibacterial trial', tone: 'teal' }],
            ['<strong>Normal rectal</strong>', { text: '38.0–39.2°C (100.5–102.5°F) — healthy dogs and cats reach 39.7°C (103.5°F) in the consulting room', tone: 'teal' }],
          ],
        },

        { kind: 'step', tone: 'danger', text: '🌡️ STEP 1 — FEVER vs HYPERTHERMIA', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['History / finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Recent heat exposure / exercise</strong>', { text: '<strong>Hyperthermia</strong> — Labradors reach 42.2°C (108°F); most dogs 41.1°C (106°F) after exercise', tone: 'teal' }],
            ['<strong>Active cooling behaviour</strong> — panting · inactivity · seeking cool areas', { text: '<strong>Hyperthermia</strong>', tone: 'teal' }],
            ['<strong>No cooling behaviour + lethargy / anorexia / stiffness / hyperpnoea</strong>', { text: '<strong>Fever</strong>', tone: 'teal' }],
            ['<strong>Stress suspected</strong> (clinic, handling)', { text: 'Rest the patient 20 min in a cool room — if the temperature normalises or is only mild (≤39.6°C / 103.3°F), further investigation may not be required', tone: 'teal' }],
            ['<strong>Drug history</strong>', { text: 'Opioids · ketamine / phenobarbital (🐱) · SSRIs (both species) cause <em>non-pyrogenic</em> hyperthermia. Sulfonamides and vaccines cause idiosyncratic <em>drug fever</em>', tone: 'teal' }],
          ],
        },

        ...stepTable(2, 'SIGNALMENT & EPIDEMIOLOGY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Signalment', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>🐱 Young cat</strong>', { text: '<strong>FIP</strong> — 20.8% of all feline FUO; FeLV / FIV testing essential. Bite abscess is the commonest feline cause', tone: 'teal' }],
            ['<strong>🐕 Young dog (&lt;18 months)</strong>', { text: 'Non-infectious inflammatory in 65% of cases, <strong>60% of which are SRMA</strong> — Beagle · Border Collie · Cocker Spaniel · Whippet predisposed', tone: 'teal' }],
            ['<strong>Older dog</strong>', { text: 'Neoplasia rises; Bernese Mountain Dog → histiocytic disease', tone: 'teal' }],
            ['<strong>Entire female</strong>', { text: 'Pyometra / stump pyometra', tone: 'teal' }],
            ['<strong>Entire male</strong>', { text: 'Prostatitis', tone: 'teal' }],
            ['<strong>Tick exposure, geography &amp; travel</strong>', { text: 'Vector-borne (ehrlichiosis · anaplasmosis · Lyme · RMSF · bartonellosis) and regional systemic fungal (blasto · cocci · histo) risk', tone: 'teal' }],
          ],
        }, '🐾'),

        ...stepTable(3, 'COURSE, PATTERN & PRIOR RESPONSE', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Course', { text: 'What to do', tone: 'teal' }],
          rows: [
            ['<strong>Acute (&lt;5 days), mild, no localising signs</strong>', { text: 'May monitor — can resolve spontaneously, and a mild acute fever may be better left untreated to allow localising signs to develop', tone: 'teal' }],
            ['<strong>Chronic (≥5 days) or severe signs</strong>', { text: 'Proceed to the minimum database (Phase 1)', tone: 'teal' }],
            ['<strong>Failure to respond to an appropriate antibacterial trial</strong>', { text: 'Reconsider an immune-mediated, neoplastic or non-bacterial infectious cause — do not escalate antibiotics blindly', tone: 'danger' }],
            ['<strong>Document</strong>', { text: 'Temperature trend · localising signs (lameness · neck or back pain · coughing · dysuria · GI signs) · travel and medication history', tone: 'teal' }],
          ],
        }, '📈'),
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

        ...stepTable(1, 'CONFIRM & MEASURE THE TEMPERATURE', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Method / threshold', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Rectal</strong>', { text: 'Most accurate, preferred method — good agreement with core', tone: 'teal' }],
            ['<strong>Second choice</strong>', { text: 'Tympanic membrane in 🐕 · axillary in 🐱 (rectal ≈ axillary + 0.9°C / 1.6°F in cats). A difference &gt;0.5°C (0.9°F) between methods is clinically unacceptable', tone: 'teal' }],
            ['<strong>Nose palpation</strong>', { text: '<strong>NOT reliable</strong> — sensitivity 29.4%, specificity 79.5%', tone: 'danger' }],
            ['<strong>&gt;41.1°C (106°F)</strong>', { text: 'Risks neurological damage · DIC · metabolic derangement, and is more likely with hyperthermia — <strong>active cooling required at this threshold</strong> (but not for a true fever below it)', tone: 'danger' }],
          ],
        }, '🌡️'),

        ...stepTable(2, 'SYSTEMATIC SEARCH FOR A LOCALISING FOCUS', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['System', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Skin / SC</strong>', { text: 'Abscesses (especially cat bite) · cellulitis · panniculitis · juvenile cellulitis · draining tracts', tone: 'teal' }],
            ['<strong>Oral cavity</strong>', { text: 'Tooth-root abscess · stomatitis · mass', tone: 'teal' }],
            ['<strong>Cardiac</strong>', { text: 'New or changing murmur — endocarditis (only 40–43% febrile)', tone: 'teal' }],
            ['<strong>Thorax</strong>', { text: 'Dyspnoea / dullness — pneumonia · pyothorax', tone: 'teal' }],
            ['<strong>Abdomen</strong>', { text: 'Organomegaly · pain · masses · painful kidneys (pyelonephritis); palpate for pyometra in entire females', tone: 'teal' }],
            ['<strong>Spine</strong>', { text: 'Palpate the whole vertebral column for focal pain (discospondylitis — radiographs lag 2–6 weeks) and assess for neck pain (SRMA)', tone: 'teal' }],
          ],
        }, '🔍'),

        ...stepTable(3, 'MUSCULOSKELETAL, RECTAL & LYMPHORETICULAR', {
          cols: '0.7fr 1.45fr',
          dividers: true,
          headers: ['Assess', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Joints</strong>', { text: 'Palpate <strong>ALL</strong> joints for effusion / pain; watch for a shifting or stiff gait — immune-mediated polyarthritis is the commonest non-infectious inflammatory cause in dogs and <strong>joints can look grossly normal</strong>', tone: 'danger' }],
            ['<strong>Rectal exam</strong>', { text: 'Prostate (prostatitis) · sublumbar nodes · rectal mucosa / melena', tone: 'teal' }],
            ['<strong>Lymph nodes &amp; spleen</strong>', { text: 'Generalised lymphadenopathy / splenomegaly → lymphoma · vector-borne disease — sample any enlarged node', tone: 'teal' }],
            ['<strong>Ophthalmic</strong>', { text: 'Uveitis / chorioretinitis — FIP · systemic fungal · vector-borne · lymphoma', tone: 'teal' }],
          ],
        }, '🦴'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Fever / FUO — Diagnostics',
      blocks: [
        { kind: 'step', tone: 'danger', text: '🌡️ STEP 1 — DON\'T TREAT THE NUMBER; COOL ONLY HYPERTHERMIA', noArrowAfter: true },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Rule', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Active cooling ONLY if &gt;41.1°C (106°F)</strong>', { text: 'Fans, cool water. Obese and upper-respiratory-compromised patients are higher risk. <strong>Do NOT actively cool a true fever</strong> — fever improves the host immune response', tone: 'danger' }],
            ['<strong>Hydration</strong>', { text: 'Fever increases insensible water losses — monitor; IV fluids may be required', tone: 'teal' }],
            ['<strong>Antipyretic NSAIDs</strong>', { text: 'Reserve for severe / prolonged fever with significant signs — risks: renal / hepatic impairment · GI ulceration · blood dyscrasias. A mild acute fever may be left untreated to allow localising signs to develop', tone: 'teal' }],
            ['<strong>Steroids</strong>', { text: '<strong>Withhold</strong> until an immune-mediated diagnosis is established and infection is excluded', tone: 'danger' }],
          ],
        },

        ...stepTable(2, 'MINIMUM DATABASE (Phase 1)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>CBC + blood smear</strong>', { text: 'Inflammatory leukogram · left shift · cytopenias · blood parasites (<em>Mycoplasma</em> · <em>Babesia</em> · morulae) · atypical cells', tone: 'teal' }],
            ['<strong>Serum biochemistry</strong>', { text: 'Organ involvement · hyperglobulinaemia (vector-borne · FIP · myeloma → protein electrophoresis)', tone: 'teal' }],
            ['<strong>Urinalysis (cystocentesis) + urine culture</strong>', { text: 'Pyelonephritis · occult UTI as a discospondylitis / bacteraemia source', tone: 'teal' }],
            ['<strong>🐱 FeLV / FIV testing</strong>', { text: 'In at-risk cats; also abdominal ultrasound + <strong>alpha-1 acid glycoprotein</strong> (FIP support)', tone: 'teal' }],
            ['<strong>± FNA of any mass / enlarged lymph node</strong>', { text: 'Cytology', tone: 'teal' }],
            ['<strong>± Thoracic &amp; abdominal radiographs</strong>', { text: 'Screening for an occult focus', tone: 'teal' }],
            ['<strong>Antibacterial trial (5 days)</strong>', { text: 'Clavulanate-potentiated amoxicillin first line · <strong>doxycycline</strong> in tick-endemic areas · GS-441524 for suspected FIP. Avoid fluoroquinolones, aminoglycosides and later cephalosporins as first-line empiric choices', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(3, 'TARGETED IMAGING & FLUID SAMPLING (Phase 2)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Abdominal ultrasound</strong>', { text: 'Focus · organomegaly · effusion → sample any effusion (cytology · glucose/lactate for septic peritonitis · culture)', tone: 'teal' }],
            ['<strong>Thoracic ± abdominal imaging</strong>', { text: 'Pyothorax · pneumonia · occult masses', tone: 'teal' }],
            ['<strong>Radiographs of vertebrae and limbs</strong>', { text: 'Discospondylitis (end-plate lysis — remember the <strong>2–6 week radiographic lag</strong>) · osteomyelitis · panosteitis · metaphyseal osteopathy', tone: 'teal' }],
            ['<strong>Specific serology / PCR</strong>', { text: 'By history and region — Ehrlichia · Anaplasma · Lyme · RMSF · Bartonella · Leptospira · Toxoplasma · Leishmania · Brucella · systemic fungal', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(4, 'ARTHROCENTESIS, BLOOD CULTURES & ECHO', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Arthrocentesis of multiple joints</strong><br>carpi · tarsi · stifles — <em>even normal-looking joints</em>', { text: 'Neutrophilic, non-septic effusion in several joints = <strong>immune-mediated polyarthritis</strong> · degenerate neutrophils + intracellular bacteria = <strong>septic arthritis</strong>', tone: 'teal' }],
            ['<strong>Blood cultures (aerobic + anaerobic) + echocardiography</strong>', { text: 'Endocarditis, especially with a new or changing murmur — endocarditis is only 40–43% febrile', tone: 'teal' }],
            ['<strong>CSF analysis</strong>', { text: 'MRI of brain / spine <strong>before</strong> the tap. For SRMA / meningoencephalitis — neutrophilic pleocytosis supports SRMA', tone: 'teal' }],
            ['<strong>Prostatic wash / ejaculate + Brucella serology</strong>', { text: 'Where relevant', tone: 'teal' }],
          ],
        }, '💉'),

        ...stepTable(5, 'MARROW / TISSUE & THE TREATMENT TRIAL SEQUENCE (Phase 3)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test / decision', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Bone-marrow aspirate &amp; biopsy · lymph-node aspirate</strong> (even if nodes feel normal)', { text: 'Occult lymphoproliferative / myeloproliferative disease · marrow infection', tone: 'teal' }],
            ['<strong>Tissue biopsies · bronchoscopy + BAL · blood and faecal cultures · advanced imaging</strong>', { text: 'CT thorax / head · MRI — as the picture directs', tone: 'teal' }],
            ['<strong>Treatment-trial logic</strong>', { text: 'An appropriately chosen <strong>antibacterial trial first</strong> (clavulanate-amoxicillin; doxycycline if tick-borne suspected). Only <em>after</em> infection has been reasonably excluded should you move to an <strong>immunosuppressive (glucocorticoid) trial</strong>', tone: 'danger' }],
            ['<strong>Exception</strong>', { text: 'Co-administer antibacterials + steroids when an immune-mediated cause cannot be distinguished from a treatable infectious one (e.g. some tick-borne + secondary immune-mediated disease)', tone: 'teal' }],
            ['<strong>Outcome</strong>', { text: 'Despite a full work-up, ~22% of referred dogs and ~15% of referred cats remain undiagnosed (true FUO)', tone: 'teal' }],
          ],
        }, '🦴'),
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
