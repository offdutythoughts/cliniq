// ── Peripheral Oedema flowchart ──────────────────────────────────────────────
import type { FlowPage } from '../flowTypes'
import { IDENTIFY_CAUSE_STEP } from '../flowTypes'

const oedemaEntry: FlowPage = {
  id: 'oedema',
  title: 'Peripheral Oedema',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' PERIPHERAL OEDEMA' },
    {
      kind: 'callout',
      tone: 'info',
      html: ' <strong>First split: localised vs generalised.</strong> A single-limb or regional swelling points to local venous/lymphatic obstruction, hypersensitivity or trauma. <strong>Generalised / ventral pitting oedema</strong> reflects a systemic mechanism — <strong>check serum albumin first</strong>: hypoalbuminaemia needs albumin &lt;2.0 g/dL (&lt;20 g/L) to cause overt oedema alone, with effusion/thromboembolism risk once &lt;1.5 g/dL (&lt;15 g/L) (Ettinger Ch 30 · Ch 60).',
    },
    {
      kind: 'node',
      variant: 'step',
      text: 'GENERALISED / VENTRAL? → CHECK ALBUMIN. LOCALISED? → THINK OBSTRUCTION / PERMEABILITY',
      sub: 'Starling: oedema = imbalance of hydrostatic vs oncotic pressure, permeability, or lymphatic drainage — overwhelming interstitial tension + lymphatic uptake (Ettinger Ch 30)',
    },
    {
      kind: 'choices',
      cols: 3,
      items: [
        {
          tone: 'teal',
          label: ' HYPOALBUMINAEMIA (↓ oncotic)',
          sublabel: 'Generalised/ventral pitting oedema ± effusions · albumin <2.0 g/dL — check UPC, faecal α₁-PI, bile acids',
          link: { to: 'flow', id: 'oedema-hypoalbumin' },
        },
        {
          tone: 'danger',
          label: ' HYDROSTATIC / CARDIAC',
          sublabel: 'Albumin normal · ↑ intravascular hydrostatic pressure · jugular distension, murmur, arrhythmia',
          link: { to: 'flow', id: 'oedema-hydrostatic' },
        },
        {
          tone: 'orange',
          label: ' VASCULAR PERMEABILITY / VASCULITIS',
          sublabel: 'Albumin normal · ↑ permeability · oedematous swelling erythematous/warm · fever/shock',
          link: { to: 'flow', id: 'oedema-permeability' },
        },
      ],
    },

    {
      kind: 'alert',
      tone: 'danger',
      title: "ALWAYS RULE OUT / DON'T MISS",
      items: [
        '<strong>Anaphylaxis / angioedema</strong> — acute facial/laryngeal swelling can obstruct the airway; treat first (adrenaline), then investigate',
        '<strong>Right-sided CHF / pericardial tamponade</strong> — jugular distension + ascites/ventral oedema; echocardiography urgently, and tap a tamponading pericardial effusion',
        '<strong>Severe hypoalbuminaemia</strong> (albumin &lt;1.5 g/dL / &lt;15 g/L) — high risk of effusions and <strong>thromboembolism</strong> (PLN with concurrent antithrombin loss)',
        '<strong>Vasculitis / sepsis / SIRS</strong> — warm erythematous swelling with fever or shock can progress to skin necrosis and multi-organ failure',
      ],
    },

  ],
}

const oedemaHypoalbumin: FlowPage = {
  id: 'oedema-hypoalbumin',
  title: 'Oedema — Hypoalbuminaemia',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' HYPOALBUMINAEMIA (↓ oncotic)', sub: 'Generalised/ventral pitting oedema ± effusions · albumin <2.0 g/dL (overt at <1.5 g/dL) · check UPC, faecal α₁-PI, bile acids to localise PLN vs PLE vs hepatic (Ettinger Ch 30)' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Renal (Protein Loss)',
          tone: 'info',
          tiles: [
            { label: ' PROTEIN-LOSING NEPHROPATHY', link: { to: 'disease', id: 'DIS-REN-GN' } },
          ],
        },
        {
          cat: 'GI (Protein Loss)',
          tone: 'orange',
          tiles: [
            { label: ' PROTEIN-LOSING ENTEROPATHY', link: { to: 'disease', id: 'DIS-GI-PLE' } },
          ],
        },
        {
          cat: 'Hepatobiliary (↓ Synthesis)',
          tone: 'warning',
          tiles: [
            { label: ' HEPATIC FAILURE', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: ' PORTOSYSTEMIC SHUNT', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
          ],
        },
      ],
    },
  ],
}

const oedemaHydrostatic: FlowPage = {
  id: 'oedema-hydrostatic',
  title: 'Oedema — Hydrostatic / Cardiac',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' HYDROSTATIC / CARDIAC', sub: 'Albumin normal · ↑ intravascular hydrostatic pressure · jugular distension/pulses, murmur, arrhythmia, ascites · R-CHF rare in small animals (almost always with cavitary effusions) · venous/lymphatic obstruction → localised (Ettinger Ch 30)' },
    { kind: 'node', variant: 'step', text: 'RIGHT-SIDED / CONGESTIVE vs VENOUS-LYMPHATIC OBSTRUCTION?' },
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Right-Sided / Congestive',
          tone: 'danger',
          tiles: [
            { label: ' MYXOMATOUS MITRAL VALVE DISEASE', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
            { label: ' DILATED CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: ' RESTRICTIVE CARDIOMYOPATHY', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
            { label: ' PERICARDIAL DISEASE / TAMPONADE', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
            { label: ' HEARTWORM / CAVAL SYNDROME', link: { to: 'disease', id: 'DIS-CARD-HW' } },
          ],
        },
        {
          cat: 'Venous / Lymphatic (Localised)',
          tone: 'info',
          tiles: [
            { label: ' Cranial vena cava syndrome — mediastinal mass / thrombus / pacing lead', terminal: true },
            { label: ' Caudal vena cava / venous thrombosis', link: { to: 'disease', id: 'DIS-BD-HYPERCOAG' } },
            { label: ' Lymphoedema (congenital or acquired) — non-pitting single-limb swelling', terminal: true },
          ],
        },
      ],
    },
  ],
}

const oedemaPermeability: FlowPage = {
  id: 'oedema-permeability',
  title: 'Oedema — Vascular Permeability / Vasculitis',
  blocks: [
    { kind: 'node', variant: 'entry', text: ' VASCULAR PERMEABILITY / VASCULITIS', sub: 'Albumin normal · ↑ permeability · oedematous swelling is erythematous/warm (unlike oncotic oedema) · fever/shock → SIRS/sepsis or immune-mediated/vector-borne vasculitis (Ettinger Ch 30)' },
    IDENTIFY_CAUSE_STEP,
    {
      kind: 'categoryGrid',
      columns: [
        {
          cat: 'Infectious / Septic',
          tone: 'danger',
          tiles: [
            { label: ' VASCULITIS (immune / vector-borne / sepsis)', link: { to: 'disease', id: 'DIS-BD-VASC' } },
            { label: ' EHRLICHIOSIS / VECTOR-BORNE', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
          ],
        },
        {
          cat: 'Immune-Mediated',
          tone: 'violet',
          tiles: [
            { label: ' SLE / IMMUNE-MEDIATED', link: { to: 'disease', id: 'DIS-IM-SLE' } },
          ],
        },
        {
          cat: 'Acute / Allergic',
          tone: 'warning',
          tiles: [
            { label: 'Angioedema / anaphylaxis / envenomation', link: { to: 'protocol', id: 'PROT-ANAPHYLAXIS' } },
          ],
        },
      ],
    },
  ],
}

export const oedemaFlows: FlowPage[] = [
  oedemaEntry,
  oedemaHypoalbumin,
  oedemaHydrostatic,
  oedemaPermeability,
]
