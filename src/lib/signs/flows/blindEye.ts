// ── Blind Eye / Acute Vision Loss flowchart (data) ──────────────────────────
// Migration of blindEyeFlowHtml + blindEyeAcuteHtml + blindEyeChronicHtml
// (src/lib/signs/blindEye.ts) to the FlowPage model.

import type { FlowPage } from '../flowTypes'

const blindEyeEntry: FlowPage = {
  id: 'blind-eye',
  title: 'Blind Eye / Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', text: '⚫ BLINDNESS / VISION LOSS' },
    { kind: 'node', variant: 'step', text: 'CHARACTERISE THE ONSET' },

    {
      kind: 'choices',
      cols: 2,
      size: 11,
      items: [
        { tone: 'danger', label: '⚡ ACUTE', sublabel: 'Onset mins → days<br>Emergency until proven otherwise', link: { to: 'flow', id: 'blind-eye-acute' } },
        { tone: 'info', label: '🕐 CHRONIC', sublabel: 'Onset weeks → months<br>Progressive vision decline', link: { to: 'flow', id: 'blind-eye-chronic' } },
      ],
    },

    {
      kind: 'table',
      boxTone: 'purple',
      gap: 14,
      title: '🔍 THE LOCALISATION TABLE — Menace · Dazzle · PLR',
      cols: '1.3fr 0.7fr 0.7fr 0.7fr 1.4fr',
      headers: ['Lesion site', 'Menace', 'Dazzle', 'PLR', 'Fundus'],
      rows: [
        ['Anterior opacity', 'Absent', 'Variable', 'Variable', 'Often not visible'],
        ['Retinal disease (RD, PRA)', 'Absent', 'Absent', 'Absent / sluggish', 'Abnormal'],
        [{ text: 'SARDS', tone: 'warning' }, 'Absent', 'Absent', 'Red absent · Blue present', { text: 'NORMAL (key clue)', tone: 'green' }],
        ['Optic nerve (neuritis)', 'Absent', 'Absent', 'Absent (red AND blue)', 'Swollen disc · haemorrhage'],
        ['Chiasm / tract', 'Absent (variable)', 'Absent / variable', 'Variable per pattern', 'Normal'],
        [{ text: 'Cortex / forebrain', tone: 'purple' }, 'Absent', { text: 'PRESENT', tone: 'green' }, { text: 'PRESENT', tone: 'green' }, 'Normal'],
      ],
      footnote: '💡 The single most discriminating finding: <strong>preserved dazzle + preserved PLR with absent menace = cortical blindness</strong>. Everything else lies upstream of the lateral geniculate nucleus.',
    },
  ],
}

const blindEyeAcute: FlowPage = {
  id: 'blind-eye-acute',
  title: 'Acute Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'danger', text: '⚡ ACUTE VISION LOSS', sub: 'Onset minutes → days · Treat as emergency until proven otherwise' },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE LESION ALONG THE VISUAL PATHWAY',
      sub: 'Cornea → aqueous → lens → vitreous → retina → optic n. → chiasm → optic tract → LGN → cortex',
    },

    {
      kind: 'choices',
      cols: 4,
      size: 10,
      items: [
        { variant: 'insp', label: 'Anterior<br>opacity', link: { to: 'lesion', loc: 'LOC-BL-OPAQUE', name: 'Anterior segment opacity', filter: 'acute' } },
        { variant: 'exp', label: 'Retina', link: { to: 'lesion', loc: 'LOC-BL-RETINA', name: 'Retinal disease', filter: 'acute' } },
        { variant: 'rest', label: 'Optic<br>nerve', link: { to: 'lesion', loc: 'LOC-BL-OPTIC', name: 'Optic nerve', filter: 'acute' } },
        { variant: 'insp', tone: 'purple', label: 'Cortex /<br>forebrain', link: { to: 'lesion', loc: 'LOC-BL-CORTEX', name: 'Cortical / forebrain', filter: 'acute' } },
      ],
      connectAfter: false,
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: '⚡ DO NOT MISS',
      items: [
        { bold: 'Hypertensive retinopathy', link: { to: 'disease', id: 'DIS-EYE-RD' }, html: ' — older cat / dog with acute bilateral blindness, bullous retinal detachment, hyphaema, tortuous retinal vessels → measure BP first' },
        { bold: 'Optic neuritis (MUA)', link: { to: 'disease', id: 'DIS-EYE-OPTNEUR' }, html: ' — acute bilateral blindness + dilated unresponsive pupils + swollen optic disc → urgent MRI/CSF + immunosuppression' },
        { bold: 'Acute glaucoma', link: { to: 'disease', id: 'DIS-OPH-GLAUCOMA' }, html: ' — corneal oedema + mid-fixed mydriasis + ↑ IOP → tonometry on every blind eye' },
        { bold: 'Head trauma + anisocoria + blindness', link: { to: 'disease', id: 'DIS-NEU-HEADTRAUMA' }, html: ' — rising ICP / herniation → mannitol + emergent imaging' },
        { bold: 'Enrofloxacin in cats', link: { to: 'disease', id: 'DIS-EYE-ENRO' }, html: ' — drug-induced retinal toxicity (avoid &gt;5 mg/kg/day; even therapeutic doses reported)' },
        { bold: 'Salt / ivermectin / lead toxicity', link: { to: 'disease', id: 'DIS-TOX-CORTBLIND' }, html: ' — bilateral cortical blindness with seizures and altered mentation' },
      ],
    },

    {
      kind: 'callout',
      tone: 'info',
      gap: 8,
      html:
        '💡 <strong>Key discriminator</strong><br>' +
        '• Dazzle + PLR intact + absent menace = <strong>cortical</strong><br>' +
        '• Absent dazzle + absent PLR + normal fundus = <strong>SARDS</strong> (red PLR absent, blue present) or <strong>optic neuritis</strong> (both absent)<br>' +
        '• Check BP on every acute bilateral blind animal',
    },
  ],
}

const blindEyeChronic: FlowPage = {
  id: 'blind-eye-chronic',
  title: 'Chronic Vision Loss',
  blocks: [
    { kind: 'node', variant: 'entry', tone: 'info', text: '🕐 CHRONIC VISION LOSS', sub: 'Onset weeks → months → years · Progressive decline · Often bilateral' },

    {
      kind: 'node',
      variant: 'step',
      text: 'LOCALISE THE LESION ALONG THE VISUAL PATHWAY',
      sub: 'Cornea → aqueous → lens → vitreous → retina → optic n. → chiasm → optic tract → LGN → cortex',
    },

    {
      kind: 'choices',
      cols: 5,
      size: 10,
      items: [
        { variant: 'insp', label: 'Anterior<br>opacity', link: { to: 'lesion', loc: 'LOC-BL-OPAQUE', name: 'Anterior segment opacity', filter: 'chronic' } },
        { variant: 'exp', label: 'Retina', link: { to: 'lesion', loc: 'LOC-BL-RETINA', name: 'Retinal disease', filter: 'chronic' } },
        { variant: 'rest', label: 'Optic<br>nerve', link: { to: 'lesion', loc: 'LOC-BL-OPTIC', name: 'Optic nerve', filter: 'chronic' } },
        { variant: 'mixed', label: 'Chiasm /<br>tract', link: { to: 'lesion', loc: 'LOC-BL-CHIASM', name: 'Chiasm / optic tract', filter: 'chronic' } },
        { variant: 'insp', tone: 'purple', label: 'Cortex /<br>forebrain', link: { to: 'lesion', loc: 'LOC-BL-CORTEX', name: 'Cortical / forebrain', filter: 'chronic' } },
      ],
      connectAfter: false,
    },

    {
      kind: 'callout',
      tone: 'info',
      gap: 8,
      html:
        '💡 <strong>Key discriminator</strong><br>' +
        '• Night blindness first = PRA (rods before cones)<br>' +
        '• No fundus reflex = cataract<br>' +
        '• Tapetal hyperreflectivity + vessel attenuation = end-stage retinal disease<br>' +
        '• Buphthalmos = chronic glaucoma<br>' +
        '• Young dog with coloboma = CEA',
    },
  ],
}

export const blindEyeFlows: FlowPage[] = [blindEyeEntry, blindEyeAcute, blindEyeChronic]
