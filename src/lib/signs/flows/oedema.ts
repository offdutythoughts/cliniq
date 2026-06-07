// ── Peripheral Oedema flowchart ──────────────────────────────────────────────
// Starling-equation thinking: oedema appears when interstitial-matrix tension and
// lymphatic uptake are overwhelmed (Ettinger Ch 30). First decisions: localised
// single-limb/regional swelling vs generalised/ventral pitting oedema — then,
// for generalised, CHECK SERUM ALBUMIN FIRST and branch by mechanism:
// hypoalbuminaemia (↓oncotic) · increased hydrostatic (R-CHF / venous) ·
// increased vascular permeability (vasculitis / sepsis / anaphylaxis).

import type { FlowPage } from '../flowTypes'

export const oedemaFlow: FlowPage = {
  id: 'oedema',
  title: 'Peripheral Oedema',
  blocks: [
    { kind: 'node', variant: 'entry', text: '💧 PERIPHERAL OEDEMA' },

    {
      kind: 'callout',
      tone: 'info',
      html: '🔍 <strong>First split: localised vs generalised.</strong> A single-limb or regional swelling points to local venous/lymphatic obstruction, hypersensitivity or trauma. <strong>Generalised / ventral pitting oedema</strong> reflects a systemic mechanism — <strong>check serum albumin first</strong>: hypoalbuminaemia needs albumin &lt;2.0 g/dL (&lt;20 g/L) to cause overt oedema alone, with effusion/thromboembolism risk once &lt;1.5 g/dL (&lt;15 g/L) (Ettinger Ch 30 · Ch 60).',
    },

    {
      kind: 'node',
      variant: 'step',
      text: 'GENERALISED / VENTRAL? → CHECK ALBUMIN. LOCALISED? → THINK OBSTRUCTION / PERMEABILITY',
      sub: 'Starling: oedema = imbalance of hydrostatic vs oncotic pressure, permeability, or lymphatic drainage — overwhelming interstitial tension + lymphatic uptake (Ettinger Ch 30)',
    },

    {
      kind: 'branch',
      columns: [
        {
          header: '💧 HYPOALBUMINAEMIA (↓ oncotic)',
          tone: 'teal',
          sub: 'Generalised/ventral pitting oedema ± effusions · albumin <2.0 g/dL (overt at <1.5 g/dL) · check UPC, faecal α₁-PI, bile acids to localise PLN vs PLE vs hepatic (Ettinger Ch 30)',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🫘', label: 'PROTEIN-LOSING NEPHROPATHY', sublabel: 'Glomerular protein loss → proteinuria, ↑UPC; thromboembolism risk (AT loss)', tone: 'danger', link: { to: 'disease', id: 'DIS-REN-GN' } },
                { icon: '🌀', label: 'PROTEIN-LOSING ENTEROPATHY', sublabel: 'GI albumin loss → ↑faecal α₁-PI; panhypoproteinaemia', tone: 'orange', link: { to: 'disease', id: 'DIS-GI-PLE' } },
                { icon: '🫀', label: 'HEPATIC FAILURE (↓ synthesis)', sublabel: 'Needs >80% hepatocyte loss; abnormal bile acids/ammonia', tone: 'violet', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
                { icon: '🔀', label: 'PORTOSYSTEMIC SHUNT', sublabel: 'Young, stunted; low albumin/BUN/cholesterol; HE signs', tone: 'info', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
              ],
            },
          ],
        },
        {
          header: '🫀 HYDROSTATIC / CARDIAC',
          tone: 'danger',
          sub: 'Albumin normal · ↑ intravascular hydrostatic pressure · jugular distension/pulses, murmur, arrhythmia, ascites · R-CHF rare in small animals (almost always with cavitary effusions) · venous/lymphatic obstruction → localised (Ettinger Ch 30)',
          blocks: [
            { kind: 'node', variant: 'sub-step', text: 'RIGHT-SIDED / CONGESTIVE vs VENOUS-LYMPHATIC OBSTRUCTION?', connectAfter: false },
            {
              kind: 'branch',
              columns: [
                {
                  // no tone → plain grey text label (no box)
                  header: 'RIGHT-SIDED / CONGESTIVE',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫀', label: 'MYXOMATOUS MITRAL VALVE DISEASE', sublabel: 'Advanced MMVD → PH → right-sided CHF', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
                        { icon: '🎈', label: 'DILATED CARDIOMYOPATHY', sublabel: 'Biventricular failure → ascites/effusions', tone: 'orange', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
                        { icon: '🧱', label: 'RESTRICTIVE CARDIOMYOPATHY', sublabel: 'Cat · diastolic failure → effusion', tone: 'violet', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
                        { icon: '🫧', label: 'PERICARDIAL DISEASE / TAMPONADE', sublabel: 'Effusion → ↑venous pressure → ascites/ventral oedema', tone: 'danger', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
                        { icon: '🪱', label: 'HEARTWORM / CAVAL SYNDROME', sublabel: 'Pulmonary hypertension / caval obstruction → R-CHF', tone: 'warning', link: { to: 'disease', id: 'DIS-CARD-HW' } },
                      ],
                    },
                  ],
                },
                {
                  // no tone → plain grey text label (no box)
                  header: 'VENOUS / LYMPHATIC OBSTRUCTION (localised)',
                  blocks: [
                    {
                      kind: 'endpoints',
                      items: [
                        { icon: '🫁', label: 'Cranial vena cava syndrome', sublabel: 'Forelimb + ventral cervical/thoracic oedema — mediastinal mass / thrombus / pacing lead (image: rads, US, CT)', tone: 'neutral' },
                        { icon: '🩸', label: 'Caudal vena cava / venous thrombosis', sublabel: 'Hindlimb + ventral caudal abdomen oedema; hypercoagulable states', tone: 'slate', link: { to: 'disease', id: 'DIS-BD-HYPERCOAG' } },
                        { icon: '🦵', label: 'Lymphoedema (congenital or acquired)', sublabel: 'Non-pitting single-limb swelling; congenital (hindlimb, first weeks/months) or obstructive (neoplasia, surgery, radiation)', tone: 'neutral' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          header: '🔥 VASCULAR PERMEABILITY / VASCULITIS',
          tone: 'orange',
          sub: 'Albumin normal · ↑ permeability · oedematous swelling is erythematous/warm (unlike oncotic oedema) · fever/shock → SIRS/sepsis or immune-mediated/vector-borne vasculitis (Ettinger Ch 30)',
          blocks: [
            {
              kind: 'endpoints',
              items: [
                { icon: '🩸', label: 'VASCULITIS (immune / vector-borne / sepsis)', sublabel: 'Petechiae/ecchymoses → oedema → skin necrosis; SIRS/sepsis', tone: 'danger', link: { to: 'disease', id: 'DIS-BD-VASC' } },
                { icon: '🦋', label: 'SLE / IMMUNE-MEDIATED', sublabel: 'Multisystem immune disease with vasculitis', tone: 'violet', link: { to: 'disease', id: 'DIS-IM-SLE' } },
                { icon: '🦟', label: 'EHRLICHIOSIS / VECTOR-BORNE', sublabel: 'Peripheral oedema in acute phase; tick exposure', tone: 'orange', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
                { icon: '🐝', label: 'Angioedema / anaphylaxis / envenomation', sublabel: 'Acute facial/limb swelling after drug/vaccine/sting/snakebite — non-pitting, deep subdermal', tone: 'warning' },
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
        '<strong>Anaphylaxis / angioedema</strong> — acute facial/laryngeal swelling can obstruct the airway; treat first (adrenaline), then investigate',
        '<strong>Right-sided CHF / pericardial tamponade</strong> — jugular distension + ascites/ventral oedema; echocardiography urgently, and tap a tamponading pericardial effusion',
        '<strong>Severe hypoalbuminaemia</strong> (albumin &lt;1.5 g/dL / &lt;15 g/L) — high risk of effusions and <strong>thromboembolism</strong> (PLN with concurrent antithrombin loss)',
        '<strong>Vasculitis / sepsis / SIRS</strong> — warm erythematous swelling with fever or shock can progress to skin necrosis and multi-organ failure',
      ],
    },

    {
      kind: 'dxRow',
      items: [
        { label: '📋 Full diagnostic approach — History · Exam · Diagnostics', link: { to: 'dx', id: 'oedema' } },
        { label: '🌬️ Dyspnoea / respiratory distress — is it CHF?', link: { to: 'flow', id: 'dyspnoea' }, accent: true },
      ],
    },

    {
      kind: 'diseaseGrid',
      title: '📋 DISEASE PAGES',
      links: [
        { label: 'Protein-losing nephropathy / glomerulonephritis', link: { to: 'disease', id: 'DIS-REN-GN' } },
        { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
        { label: 'Chronic hepatitis / hepatic failure', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
        { label: 'Portosystemic shunt', link: { to: 'disease', id: 'DIS-HEP-PSS' } },
        { label: 'Myxomatous mitral valve disease', link: { to: 'disease', id: 'DIS-CARD-MVD' } },
        { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
        { label: 'Restrictive cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-RCM' } },
        { label: 'Pericardial disease / tamponade', link: { to: 'disease', id: 'DIS-CARD-PERIC' } },
        { label: 'Heartworm disease / caval syndrome', link: { to: 'disease', id: 'DIS-CARD-HW' } },
        { label: 'Vasculitis', link: { to: 'disease', id: 'DIS-BD-VASC' } },
        { label: 'Systemic lupus erythematosus', link: { to: 'disease', id: 'DIS-IM-SLE' } },
        { label: 'Ehrlichiosis', link: { to: 'disease', id: 'DIS-INFECT-EHRLICH' } },
        { label: 'Hypercoagulable / thromboembolic disease', link: { to: 'disease', id: 'DIS-BD-HYPERCOAG' } },
      ],
    },
  ],
}
