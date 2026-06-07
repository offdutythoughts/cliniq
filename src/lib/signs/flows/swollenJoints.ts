// ── Swollen Joints / Joint Pain flowchart ────────────────────────────────────
// Polyarthropathy logic (Ettinger Ch 32): first split is INFLAMMATORY vs
// NON-INFLAMMATORY on arthrocentesis (>10% neutrophils = inflammatory). Within
// inflammatory: SEPTIC/infectious (single joint — penetrating wound / haematogenous;
// or vector-borne polyarthritis) vs IMMUNE-MEDIATED (non-erosive idiopathic IMPA,
// SLE, reactive, breed-associated; erosive rheumatoid). The pivotal test is
// arthrocentesis of MULTIPLE joints with synovial cytology + culture — always
// sample carpi + tarsi even when only one joint looks swollen.

import type { FlowPage } from '../flowTypes'

export const swollenJointsFlow: FlowPage = {
  id: 'swollen-joints',
  title: 'Swollen Joints',
  blocks: [
    { kind: 'node', variant: 'entry', text: '🦴 SWOLLEN JOINTS / JOINT PAIN' },

    {
      kind: 'callout',
      tone: 'teal',
      html: '🔑 <strong>Arthrocentesis of MULTIPLE joints is the pivotal test</strong> — sample both carpi + both tarsi (≥4 joints) even if only one looks swollen. A polyarthropathy can hide in joints that feel normal, and synovial cytology + culture is what separates inflammatory from non-inflammatory and septic from immune-mediated. (Ettinger Ch 32 / Ch 177)',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'INFLAMMATORY vs NON-INFLAMMATORY?',
      sub: 'Synovial TNCC >5 ×10⁹/L with >10% neutrophils = inflammatory joint disease; mononuclear, <10% neutrophils = degenerative / non-inflammatory. Inflammatory cases are often NOT overtly "lame" — they show lethargy, ↓appetite and fever. (Ettinger Ch 32 / Ch 71)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '🦠 SEPTIC / INFECTIOUS',
          tone: 'danger',
          sub: 'Degenerate neutrophils ± intracellular organisms · single proximal joint (penetrating wound / post-op / haematogenous) OR vector-borne polyarthritis · culture positive in only 44–63%',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'SINGLE JOINT vs VECTOR-BORNE POLY?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'SINGLE PROXIMAL JOINT — bacterial',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🩹', label: 'BACTERIAL SEPTIC ARTHRITIS', sublabel: 'Single large joint (stifle/elbow/shoulder/hip) · penetrating wound · post-op · cat bite — lavage', tone: 'danger' },
                        { icon: '🫀', label: 'HAEMATOGENOUS SOURCE', sublabel: 'Endocarditis (incl. Bartonella) · pyelonephritis · prostatitis — blood + urine culture', tone: 'orange' },
                        { icon: '🦴', label: 'DISCOSPONDYLITIS', sublabel: 'Spinal pain + fever — end-plate lysis; can mimic / accompany joint disease', tone: 'warning', link: { to: 'disease', id: 'DIS-DISCO' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'VECTOR-BORNE — polyarthritis',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🕷️', label: 'LYME (Borrelia)', sublabel: 'Shifting lameness · endemic areas — doxycycline', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
                        { icon: '🦟', label: 'ANAPLASMOSIS', sublabel: 'Morulae in neutrophils · thrombocytopenia', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
                        { icon: '🦠', label: 'EHRLICHIOSIS', sublabel: 'Hyperglobulinaemia · cytopenias', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
                        { icon: '🩸', label: 'RMSF (Rickettsia)', sublabel: 'Acute febrile · vasculitis · seasonal', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
                        { icon: '🌍', label: 'LEISHMANIOSIS', sublabel: 'Travel / endemic · skin · renal', tone: 'violet', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🛡️ IMMUNE-MEDIATED',
          tone: 'info',
          sub: 'Culture-negative neutrophilic inflammation · multiple DISTAL joints (carpi + tarsi) · young–middle-aged · fever of unknown origin · CRP usually elevated',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'NON-EROSIVE vs EROSIVE?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'NON-EROSIVE (commonest)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🔥', label: 'IDIOPATHIC IMPA', sublabel: 'Most common IJD · type III hypersensitivity · Dx of exclusion · 90% respond to IS', tone: 'info', link: { to: 'disease', id: 'DIS-IMPA' } },
                        { icon: '🦋', label: 'SLE', sublabel: 'Multisystem · positive ANA · ± IMHA / IMTP / glomerulonephritis', tone: 'purple', link: { to: 'disease', id: 'DIS-IM-SLE' } },
                        { icon: '🧠', label: 'SRMA + IMPA', sublabel: 'Large-breed dogs · neck pain + neutrophilic CSF', tone: 'indigo', link: { to: 'disease', id: 'DIS-SRMA' } },
                        { icon: '💊', label: 'Reactive / drug-induced', sublabel: 'TMS (esp. Dobermans) · penicillins · cephalosporins · post-vaccinal · distant focus', tone: 'neutral' },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'EROSIVE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🦴', label: 'RHEUMATOID ARTHRITIS', sublabel: 'Rare · RF in ~70% (not specific) · progressive bone/cartilage lysis on radiographs', tone: 'orange' },
                        { icon: '🐈', label: 'Feline periosteal proliferative', sublabel: 'Male cats · periosteal proliferation + subchondral lysis · FeLV-implicated', tone: 'slate' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🦵 NON-INFLAMMATORY / DEGENERATIVE',
          tone: 'neutral',
          sub: 'Mononuclear synovial fluid · <10% neutrophils · intermittent / shifting lameness in an otherwise well animal · fewer, larger proximal joints',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🦴', label: 'OSTEOARTHRITIS / DJD', sublabel: 'Conformational / ligamentous · CCL rupture · patellar luxation · secondary OA' },
                { icon: '🤕', label: 'TRAUMA / HAEMARTHROSIS', sublabel: 'Acute joint injury (cruciate); haemarthrosis from a bleeding disorder' },
                { icon: '🧬', label: 'JOINT / SYNOVIAL NEOPLASIA', sublabel: 'Synovial cell sarcoma · lymphoma · histiocytic sarcoma' },
                { icon: '☠️', label: 'OSTEOSARCOMA (juxta-articular)', sublabel: 'Bone tumour near a joint mimicking arthropathy — image before calling it joint disease', tone: 'violet', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
              ],
            },
          ],
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong onclick="renderDiseasePage(\'DIS-DISCO\')" style="cursor:pointer;text-decoration:underline;">Septic arthritis</strong> — a hot, painful single joint is an emergency; sample/lavage and start antimicrobials; degenerate neutrophils + intracellular organisms confirm it (culture is only 44–63% sensitive)',
        '<strong>Vector-borne polyarthritis BEFORE steroids</strong> — test (or empirically trial doxycycline; rickettsial cases respond within 72 h); immunosuppressing an undiagnosed infection is dangerous',
        '<strong onclick="renderDiseasePage(\'DIS-NEO-OSA\')" style="cursor:pointer;text-decoration:underline;">Osteosarcoma at a juxta-articular site</strong> — a bone tumour next to a joint can masquerade as joint disease; radiograph before committing to an arthropathy diagnosis',
        '<strong>Discospondylitis & other haematogenous foci</strong> — spinal pain + fever, or endocarditis / pyelonephritis / prostatitis, can seed a joint; screen blood + urine cultures and image the spine',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'swollen-joints' } },
        { label: '🌡️ Fever / pyrexia of unknown origin workup', link: { to: 'dx', id: 'fever' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Immune-mediated polyarthritis (IMPA)', link: { to: 'disease', id: 'DIS-IMPA' } },
        { label: 'Systemic lupus erythematosus (SLE)', link: { to: 'disease', id: 'DIS-IM-SLE' } },
        { label: 'Steroid-responsive meningitis-arteritis (SRMA)', link: { to: 'disease', id: 'DIS-SRMA' } },
        { label: 'Lyme disease (Borrelia)', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
        { label: 'Anaplasmosis', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
        { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
        { label: 'Rocky Mountain spotted fever (RMSF)', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
        { label: 'Leishmaniosis', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
        { label: 'Osteosarcoma', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
        { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
      ],
    },
  ],
}
