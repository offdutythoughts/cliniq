// ── Heart Murmur flowchart ───────────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'

const heartMurmurEntry: FlowPage = {
  id: 'heart-murmur',
  title: 'Heart Murmur',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' HEART MURMUR' },
    {
      kind: 'callout',
      tone: 'info',
      html: ' <strong>Characterise every murmur three ways: GRADE · TIMING · POINT OF MAXIMAL INTENSITY (PMI).</strong> Grade I–VI by intensity (Levine scale), timing as systolic / diastolic / continuous, and PMI localises the likely lesion. A murmur is a sign, not a diagnosis — echocardiography defines the lesion. (Ettinger Ch 38)',
    },
    {
      kind: 'table',
      boxTone: 'indigo',
      title: ' MURMUR GRADING — Levine scale I–VI/VI',
      cols: '20% 1fr',
      headers: ['Grade', 'Description'],
      rows: [
        [{ text: 'I/VI', tone: 'green' }, 'Very soft, localised; heard only in a quiet room after intently listening ≥1 minute'],
        [{ text: 'II/VI', tone: 'green' }, 'Soft but easily heard within a few seconds'],
        [{ text: 'III/VI', tone: 'warning' }, 'Moderate intensity'],
        [{ text: 'IV/VI', tone: 'orange' }, 'Loud but NO palpable thrill'],
        [{ text: 'V/VI', tone: 'danger' }, 'Loud WITH a palpable precordial thrill'],
        [{ text: 'VI/VI', tone: 'danger' }, 'Very loud, palpable thrill, still audible with the stethoscope lifted 1 cm off the chest wall'],
      ],
      footnote: ' Grade correlates with severity in congenital disease (PS, SAS) and MMVD, but NOT reliably in cats — a cat with severe HCM may have a quiet murmur or NO murmur at all. (Ettinger Ch 38)',
    },
    {
      kind: 'table',
      boxTone: 'teal',
      title: ' POINT OF MAXIMAL INTENSITY → LIKELY LESION',
      cols: '34% 1fr',
      headers: ['PMI · timing', 'Likely lesion'],
      rows: [
        ['Left apex · systolic', 'Mitral insufficiency — MMVD (older small breed), endocarditis, HOCM, DCM/annular dilation'],
        ['Left base · systolic', 'Aortic / pulmonic outflow — SAS (radiates to carotids / neck), pulmonic stenosis (does not radiate)'],
        ['Right apex · systolic', 'Tricuspid insufficiency · VSD (right cranial thorax, harsh holosystolic)'],
        ['Left base · continuous', 'PDA — "machinery" murmur peaking near S2 + bounding / waterhammer pulses'],
        ['Left base · soft systolic', 'Physiologic / functional — anaemia, fever, hyperthyroidism, high sympathetic tone, thin chest'],
        ['Apical / sternal · systolic (cat)', 'Often DYNAMIC RV / LV outflow obstruction — frequently physiologic; HCM may have no murmur'],
      ],
      footnote: 'PMI guides, but does not prove, the lesion — radiation and dynamic obstruction can mislead. (Ettinger Ch 38)',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'IS THE MURMUR PATHOLOGIC OR FUNCTIONAL?',
      sub: 'Pathologic = structural lesion (acquired or congenital). Functional / innocent = no structural disease. Signalment, grade, timing, PMI and pulse quality point the way — echocardiography decides.',
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'danger',
          label: ' ACQUIRED STRUCTURAL',
          sublabel: 'Older patient · grade often rises with severity · ± cough, exercise intolerance, dyspnoea, gallop, arrhythmia',
          link: { to: 'flow', id: 'heart-murmur-acquired' },
        },
        {
          tone: 'violet',
          label: ' CONGENITAL STRUCTURAL',
          sublabel: 'Young / puppy / kitten · loud murmur (often grade ≥III–IV) that PERSISTS beyond ~16 weeks · ± growth retardation, cyanosis',
          link: { to: 'flow', id: 'heart-murmur-congenital' },
        },
        {
          tone: 'green',
          label: ' FUNCTIONAL / INNOCENT',
          sublabel: 'Soft (grade I–III/VI) · proto-to-mesosystolic · loudest at left base · NO structural disease on echo',
          link: { to: 'flow', id: 'heart-murmur-functional' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: ' ALWAYS RULE OUT / DON\'T MISS',
      items: [
        '<strong>A cat with HCM and NO murmur</strong> — auscultation is insensitive in cats; a gallop, arrhythmia or normal exam does not exclude cardiomyopathy. Use <strong>NT-proBNP</strong> ± echo before anaesthesia.',
        '<strong onclick="renderDiseasePage(\'DIS-INFECT-BART\')" style="cursor:pointer;text-decoration:underline;">Infective endocarditis</strong> — a NEW or CHANGING murmur with fever, lethargy or shifting lameness; culture and echo, think <em>Bartonella</em>.',
        '<strong>Pulmonary hypertension</strong> — a continuous PDA murmur or VSD murmur that becomes softer/absent may signal Eisenmenger physiology with reversed shunting and cyanosis. (Ettinger Ch 38)',
        '<strong>Loud congenital murmur in a young animal</strong> (SAS, PS) — grade often tracks severity; pulsus parvus et tardus (SAS) or syncope warrants urgent referral before exercise / anaesthesia.',
      ],
    },

  ],
}

const heartMurmurAcquired: FlowPage = {
  id: 'heart-murmur-acquired',
  title: 'Heart Murmur — Acquired Structural',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' ACQUIRED STRUCTURAL', sub: 'Older patient · grade often rises with severity · ± cough, exercise intolerance, dyspnoea, gallop, arrhythmia' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Degenerative / Myocardial',
          tone: 'danger',
          tiles: [
            { label: ' MMVD / DEGENERATIVE MITRAL DISEASE', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: ' DILATED CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: ' RESTRICTIVE CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
          ],
        },
        {
          cat: 'Feline Cardiomyopathy',
          tone: 'violet',
          tiles: [
            { label: ' HYPERTROPHIC CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-HCM' } },
          ],
        },
        {
          cat: 'Infectious',
          tone: 'danger',
          tiles: [
            { label: ' INFECTIVE ENDOCARDITIS', link: { to: 'disease', id: 'DIS-INFECT-BART' } },
          ],
        },
        {
          cat: 'Pericardial / Miscellaneous',
          tone: 'neutral',
          tiles: [
            { label: ' PERICARDIAL DISEASE', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
          ],
        },
      ],
    },
  ],
}

const heartMurmurCongenital: FlowPage = {
  id: 'heart-murmur-congenital',
  title: 'Heart Murmur — Congenital Structural',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' CONGENITAL STRUCTURAL', sub: 'Young / puppy / kitten · loud murmur (often grade ≥III–IV) that PERSISTS beyond ~16 weeks · ± growth retardation, cyanosis' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY LESION' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Left-to-Right Shunt',
          tone: 'violet',
          tiles: [
            { label: ' PDA — continuous "machinery" murmur · bounding pulses', link: { to: 'disease', id: 'DIS-CARD-PDA' } },
            { label: ' VENTRICULAR SEPTAL DEFECT (VSD) — right cranial thorax · harsh holosystolic', link: { to: 'disease', id: 'DIS-CARD-VSD' } },
          ],
        },
        {
          cat: 'Outflow Obstruction',
          tone: 'indigo',
          tiles: [
            { label: ' SUBAORTIC STENOSIS (SAS) — left base systolic · radiates to carotids · parvus et tardus pulse', link: { to: 'disease', id: 'DIS-CARD-SAS' } },
            { label: ' PULMONIC STENOSIS (PS) — left base systolic · does NOT radiate to carotids', link: { to: 'disease', id: 'DIS-CARD-PS' } },
          ],
        },
      ],
    },
  ],
}

const heartMurmurFunctional: FlowPage = {
  id: 'heart-murmur-functional',
  title: 'Heart Murmur — Functional / Innocent',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' FUNCTIONAL / INNOCENT', sub: 'Soft (grade I–III/VI) · proto-to-mesosystolic · loudest at left base · NO structural disease on echo' },
    { kind: 'node', variant: 'step', text: 'IDENTIFY CAUSE CATEGORY' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Physiological / Developmental',
          tone: 'green',
          tiles: [
            { label: ' INNOCENT PUPPY / KITTEN MURMUR — soft left-base systolic · resolves by ~16 weeks' },
          ],
        },
        {
          cat: 'High-Output State',
          tone: 'warning',
          tiles: [
            { label: ' ANAEMIA', link: { to: 'flow', id: 'weakness' } },
            { label: ' FEVER / HIGH-OUTPUT STATE — sepsis · pregnancy · high sympathetic tone' },
            { label: ' HYPERTHYROIDISM', link: { to: 'disease', id: 'DIS-ENDO-HYPERTHY' } },
          ],
        },
        {
          cat: 'Systemic',
          tone: 'info',
          tiles: [
            { label: ' SYSTEMIC HYPERTENSION', link: { to: 'disease', id: 'DIS-VASC-HYPERT' } },
          ],
        },
      ],
    },
  ],
}

export const heartMurmurFlows: FlowPage[] = [
  heartMurmurEntry,
  heartMurmurAcquired,
  heartMurmurCongenital,
  heartMurmurFunctional,
]
