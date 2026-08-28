// ── Swollen Joints / Joint Pain flowchart ────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP, SHY } from '../flowTypes'

const swollenJointsEntry: FlowPage = {
  id: 'swollen-joints',
  title: 'Swollen Joints',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SWOLLEN JOINTS / JOINT PAIN' },
    {
      kind: 'node',
      variant: 'step',
      text: 'HOW MANY JOINTS? SINGLE vs MULTIPLE',
      subItems: [
        'Flex, extend and palpate EVERY appendicular joint before deciding — a polyarthropathy can hide in joints that look and feel normal',
        'SINGLE joint (monoarthropathy) = local joint disease — degenerative, traumatic, neoplastic, or a septic joint',
        'MULTIPLE joints (polyarthropathy) = systemic disease until proven otherwise — lethargy, ↓appetite and fever are commoner than overt lameness',
        'Localise pain to the joint, not the adjacent bone — a juxta-articular osteosarcoma mimics monoarthropathy (Ettinger Ch 32)',
      ],
    },
    {
      kind: 'choices',
      cols: 2,
      items: [
        {
          tone: 'slate',
          label: ' SINGLE JOINT (MONOARTHROPATHY)',
          link: { to: 'flow', id: 'swollen-joints-single' },
        },
        {
          tone: 'info',
          label: ' MULTIPLE JOINTS (POLYARTHROPATHY)',
          link: { to: 'flow', id: 'swollen-joints-poly' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        { bold: 'Septic arthritis', link: { to: 'disease', id: 'DIS-DISCO' }, html: ' — a hot, painful single joint is an emergency; sample/lavage and start antimicrobials; degenerate neutrophils + intracellular organisms confirm it (culture is only 44–63% sensitive)' },
        '<strong>Vector-borne polyarthritis BEFORE steroids</strong> — test (or empirically trial doxycycline; rickettsial cases respond within 72 h); immunosuppressing an undiagnosed infection is dangerous',
        { bold: 'Osteosarcoma at a juxta-articular site', link: { to: 'disease', id: 'DIS-NEO-OSA' }, html: ' — a bone tumour next to a joint can masquerade as joint disease; radiograph before committing to an arthropathy diagnosis' },
        '<strong>Discospondylitis & other haematogenous foci</strong> — spinal pain + fever, or endocarditis / pyelonephritis / prostatitis, can seed a joint; screen blood + urine cultures and image the spine',
      ],
    },

  ],
}

const swollenJointsSingle: FlowPage = {
  id: 'swollen-joints-single',
  title: 'Swollen Joints — Single Joint',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' SINGLE JOINT (MONOARTHROPATHY)', sub: 'One swollen / painful joint with every other joint normal on palpation · usually local joint disease rather than systemic illness' },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS IT HOT, ACUTE AND VERY PAINFUL?',
      subItems: [
        'YES + fever / recent surgery / bite or penetrating wound → tap the joint NOW: septic arthritis is an emergency',
        'NO, chronic and progressive with crepitus and reduced range of motion → degenerative',
        'Acute onset after a known event, ± instability on stress → traumatic',
        'Firm swelling that does not localise cleanly to the joint line → radiograph for bone tumour before calling it arthropathy (Ettinger Ch 32 / Ch 177)',
      ],
    },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryColumns',
      columns: [
        {
          cat: 'Degenerative',
          tiles: [
            { label: 'Osteoarthritis / DJD', link: { to: 'disease', id: 'DIS-MSK-OA' } },
            { label: 'Cranial cruciate ligament disease', link: { to: 'disease', id: 'DIS-MSK-CCL' } },
            { label: 'Patellar luxation', link: { to: 'disease', id: 'DIS-MSK-PATLUX' } },
            { label: 'Hip / elbow dysplasia · OCD — young large-breed dog, secondary OA', terminal: true },
          ],
        },
        {
          cat: 'Trauma',
          tiles: [
            { label: 'Acute trauma — sprain / strain, joint capsule or collateral ligament injury', terminal: true },
            { label: 'Luxation / subluxation — hip, elbow, shoulder, carpus/tarsus; radiograph both views', terminal: true },
            { label: 'Intra-articular fracture', terminal: true },
            { label: 'Haemarthrosis — bleeding disorder or anticoagulant rodenticide; check coagulation', terminal: true },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Joint / synovial neoplasia', link: { to: 'disease', id: 'DIS-NEO-SJOINT' } },
            { label: 'Osteosarcoma (juxta-articular)', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
          ],
        },
        {
          cat: 'Inflammatory',
          tiles: [
            { label: 'Bacterial septic arthritis', link: { to: 'disease', id: 'DIS-MSK-SA' } },
            { label: 'Haematogenous source (endocarditis)', link: { to: 'disease', id: 'DIS-CARD-IE' } },
            { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
          ],
        },
      ],
    },
  ],
}

const swollenJointsPoly: FlowPage = {
  id: 'swollen-joints-poly',
  title: 'Swollen Joints — Polyarthropathy',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' MULTIPLE JOINTS (POLYARTHROPATHY)', sub: 'Two or more joints involved · often presented as lethargy, ↓appetite and fever rather than lameness' },
    {
      kind: 'callout',
      tone: 'teal',
      html: ' <strong>Arthrocentesis of MULTIPLE joints is the pivotal test</strong> — sample both carpi + both tarsi (≥4 joints) even if only one looks swollen. Synovial cytology + culture is what separates inflammatory from non-inflammatory and septic from immune-mediated. (Ettinger Ch 32 / Ch 177)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'INFLAMMATORY vs NON-INFLAMMATORY?',
      subItems: [
        'Synovial TNCC >5 ×10⁹/L with >10% neutrophils = INFLAMMATORY',
        'Mononuclear fluid with <10% neutrophils = degenerative / NON-INFLAMMATORY',
        'Inflammatory cases often show lethargy, ↓appetite and fever — not always overt lameness',
        'Degenerate neutrophils ± intracellular organisms = septic; culture-negative non-degenerate neutrophils = immune-mediated (Ettinger Ch 32 / Ch 71)',
      ],
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'danger',
          label: ' SEPTIC / INFECTIOUS',
          link: { to: 'flow', id: 'swollen-joints-septic' },
        },
        {
          tone: 'info',
          label: ' IMMUNE-MEDIATED',
          link: { to: 'flow', id: 'swollen-joints-immune' },
        },
        {
          tone: 'slate',
          label: ` NON-INFLAMM${SHY}ATORY / DEGENERATIVE`,
          link: { to: 'flow', id: 'swollen-joints-noninflam' },
        },
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
            { label: 'Bacterial septic arthritis', link: { to: 'disease', id: 'DIS-MSK-SA' } },
            { label: 'Haematogenous source', link: { to: 'disease', id: 'DIS-CARD-IE' } },
            { label: 'Discospondylitis', link: { to: 'disease', id: 'DIS-DISCO' } },
          ],
        },
        {
          cat: 'Vector-Borne Polyarthritis',
          tone: 'violet',
          tiles: [
            { label: 'Lyme (Borrelia)', link: { to: 'disease', id: 'DIS-INFECT-LYME' } },
            { label: 'Anaplasmosis', link: { to: 'disease', id: 'DIS-INFECT-ANAP' } },
            { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
            { label: 'RMSF (Rickettsia)', link: { to: 'disease', id: 'DIS-INFECT-RMSF' } },
            { label: 'Leishmaniosis', link: { to: 'disease', id: 'DIS-INFECT-LEISHM' } },
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
            { label: 'Idiopathic IMPA', link: { to: 'disease', id: 'DIS-IMPA' } },
            { label: ' SLE', link: { to: 'disease', id: 'DIS-IM-SLE' } },
            { label: 'SRMA + IMPA', link: { to: 'disease', id: 'DIS-SRMA' } },
            { label: 'Reactive / drug-induced', link: { to: 'disease', id: 'DIS-IMPA' } },
          ],
        },
        {
          cat: 'Erosive',
          tone: 'orange',
          tiles: [
            { label: 'Rheumatoid arthritis', link: { to: 'disease', id: 'DIS-MSK-RA' } },
            { label: 'Feline periosteal proliferative', link: { to: 'disease', id: 'DIS-MSK-RA' } },
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
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Degenerative / Traumatic',
          tone: 'slate',
          tiles: [
            { label: 'Osteoarthritis / DJD', link: { to: 'disease', id: 'DIS-MSK-OA' } },
            { label: 'Cranial cruciate ligament disease', link: { to: 'disease', id: 'DIS-MSK-CCL' } },
            { label: 'Patellar luxation', link: { to: 'disease', id: 'DIS-MSK-PATLUX' } },
            { label: 'Haemarthrosis — bleeding disorder or anticoagulant rodenticide; check coagulation', terminal: true },
          ],
        },
        {
          cat: 'Neoplastic',
          tiles: [
            { label: 'Joint / synovial neoplasia', link: { to: 'disease', id: 'DIS-NEO-SJOINT' } },
            { label: 'Osteosarcoma (juxta-articular)', link: { to: 'disease', id: 'DIS-NEO-OSA' } },
          ],
        },
      ],
    },
  ],
}

export const swollenJointsFlows: FlowPage[] = [
  swollenJointsEntry,
  swollenJointsSingle,
  swollenJointsPoly,
  swollenJointsSeptic,
  swollenJointsImmune,
  swollenJointsNoninflam,
]
