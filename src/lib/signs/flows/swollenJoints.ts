// ── Swollen Joints / Joint Pain flowchart ────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const swollenJointsEntry: FlowPage = {
  id: 'swollen-joints',
  title: 'Swollen Joints',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SWOLLEN JOINTS / JOINT PAIN' },
    {
      kind: 'callout',
      tone: 'teal',
      html: ' <strong>Arthrocentesis of MULTIPLE joints is the pivotal test</strong> — sample both carpi + both tarsi (≥4 joints) even if only one looks swollen. A polyarthropathy can hide in joints that feel normal, and synovial cytology + culture is what separates inflammatory from non-inflammatory and septic from immune-mediated. (Ettinger Ch 32 / Ch 177)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'INFLAMMATORY vs NON-INFLAMMATORY?',
      sub: 'Synovial TNCC >5 ×10⁹/L with >10% neutrophils = inflammatory joint disease; mononuclear, <10% neutrophils = degenerative / non-inflammatory. Inflammatory cases are often NOT overtly "lame" — they show lethargy, ↓appetite and fever. (Ettinger Ch 32 / Ch 71)',
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'danger',
          label: ' SEPTIC / INFECTIOUS',
          sublabel: 'Degenerate neutrophils ± intracellular organisms · single proximal joint OR vector-borne polyarthritis',
          link: { to: 'flow', id: 'swollen-joints-septic' },
        },
        {
          tone: 'info',
          label: ' IMMUNE-MEDIATED',
          sublabel: 'Culture-negative neutrophilic inflammation · multiple DISTAL joints (carpi + tarsi) · young–middle-aged',
          link: { to: 'flow', id: 'swollen-joints-immune' },
        },
        {
          tone: 'neutral',
          label: ' NON-INFLAMMATORY / DEGENERATIVE',
          sublabel: 'Mononuclear synovial fluid · <10% neutrophils · intermittent / shifting lameness in an otherwise well animal',
          link: { to: 'flow', id: 'swollen-joints-noninflam' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: ' ALWAYS RULE OUT / DON\'T MISS',
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
        { label: ' Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'swollen-joints' } },
        { label: ' Fever / pyrexia of unknown origin workup', link: { to: 'dx', id: 'fever' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: ' DISEASE PAGES',
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

const swollenJointsSeptic: FlowPage = {
  id: 'swollen-joints-septic',
  title: 'Swollen Joints — Septic / Infectious',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SEPTIC / INFECTIOUS', sub: 'Degenerate neutrophils ± intracellular organisms · single proximal joint (penetrating wound / post-op / haematogenous) OR vector-borne polyarthritis · culture positive in only 44–63%' },
    { kind: 'node', variant: 'step', text: 'SINGLE JOINT vs VECTOR-BORNE POLY?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Single Joint — Bacterial',
          tone: 'danger',
          tiles: [
            { label: ' BACTERIAL SEPTIC ARTHRITIS — penetrating wound · post-op · cat bite; lavage' },
            { label: ' HAEMATOGENOUS SOURCE — endocarditis · pyelonephritis · prostatitis; blood + urine culture' },
            { label: ' DISCOSPONDYLITIS', link: { to: 'disease', id: 'DIS-DISCO' } },
          ],
        },
        {
          cat: 'Vector-Borne Polyarthritis',
          tone: 'violet',
          tiles: [
            { label: ' LYME (Borrelia)', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
            { label: ' ANAPLASMOSIS', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
            { label: ' EHRLICHIOSIS', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: ' RMSF (Rickettsia)', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
            { label: ' LEISHMANIOSIS', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
          ],
        },
      ],
    },
  ],
}

const swollenJointsImmune: FlowPage = {
  id: 'swollen-joints-immune',
  title: 'Swollen Joints — Immune-Mediated',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' IMMUNE-MEDIATED', sub: 'Culture-negative neutrophilic inflammation · multiple DISTAL joints (carpi + tarsi) · young–middle-aged · fever of unknown origin · CRP usually elevated' },
    { kind: 'node', variant: 'step', text: 'NON-EROSIVE vs EROSIVE?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Non-Erosive (Commonest)',
          tone: 'info',
          tiles: [
            { label: ' IDIOPATHIC IMPA', link: { to: 'disease', id: 'DIS-IMPA' } },
            { label: ' SLE', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: ' SRMA + IMPA', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: ' Reactive / drug-induced — TMS · penicillins · cephalosporins · post-vaccinal' },
          ],
        },
        {
          cat: 'Erosive',
          tone: 'orange',
          tiles: [
            { label: ' RHEUMATOID ARTHRITIS — rare · RF in ~70%; progressive bone/cartilage lysis' },
            { label: ' Feline periosteal proliferative — male cats · FeLV-implicated' },
          ],
        },
      ],
    },
  ],
}

const swollenJointsNoninflam: FlowPage = {
  id: 'swollen-joints-noninflam',
  title: 'Swollen Joints — Non-Inflammatory / Degenerative',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' NON-INFLAMMATORY / DEGENERATIVE', sub: 'Mononuclear synovial fluid · <10% neutrophils · intermittent / shifting lameness in an otherwise well animal · fewer, larger proximal joints' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Degenerative / Traumatic',
          tone: 'neutral',
          tiles: [
            { label: ' OSTEOARTHRITIS / DJD — conformational · CCL rupture · patellar luxation · secondary OA' },
            { label: ' TRAUMA / HAEMARTHROSIS — cruciate injury; haemarthrosis from a bleeding disorder' },
          ],
        },
        {
          cat: 'Neoplastic',
          tone: 'violet',
          tiles: [
            { label: ' JOINT / SYNOVIAL NEOPLASIA — synovial cell sarcoma · lymphoma · histiocytic sarcoma' },
            { label: ' OSTEOSARCOMA (juxta-articular)', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
          ],
        },
      ],
    },
  ],
}

export const swollenJointsFlows: FlowPage[] = [
  swollenJointsEntry,
  swollenJointsSeptic,
  swollenJointsImmune,
  swollenJointsNoninflam,
]
