// ── Weight Loss — diagnostic approach (data) ────────────────────────────────
// Confirm TRUE weight loss (serial weights, >5% over <12 mo) and an ADEQUATE diet
// first; then frame by APPETITE (normal/↑ vs ↓). Minimum database + TT4 (cat),
// faecal/parasite, TLI/cobalamin/folate (EPI/malabsorption), retroviral test
// (cat), imaging, GI biopsy, and a search for occult neoplasia. Numbers from
// Ettinger Ch 18 (Weight Loss) / Ch 19 (Polyphagia). Links to disease pages.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const weightLossDx: DxApproach = {
  title: 'Weight Loss',
  tabs: {

    history: {
      title: 'History: Weight Loss',
      blocks: [
        { kind: 'branch', text: 'GOAL: CONFIRM TRUE LOSS · CHECK DIET · SPLIT BY APPETITE' },
        {
          kind: 'gridTable',
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Step', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Confirm true weight loss</strong>', { text: 'Compare <strong>recorded serial weights</strong> — not owner impression or a single visit', tone: 'teal' }],
            ['<strong>Threshold worth investigating</strong>', { text: '<strong>~5% body weight over &lt;12 months</strong> <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        },

        ...stepTable(1, 'DIETARY HISTORY (adequate vs inadequate)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Finding', { text: 'Action', tone: 'teal' }],
          rows: [
            ['<strong>Quantify what and how much is actually eaten</strong>', { text: 'The first thing to establish', tone: 'teal' }],
            ['<strong>Inadequate diet</strong>', { text: 'Underfeeding · poor-quality food · starvation · environmental factors (competition for food, limited access in a multi-pet household) — <strong>correct the diet and re-weigh before an extensive work-up</strong>', tone: 'teal' }],
            ['<strong>Adequate diet with ongoing loss</strong>', { text: 'Proceed to a comprehensive diagnostic work-up <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🍽️'),

        ...stepTable(2, 'THE APPETITE (the pivot)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Appetite', { text: 'Differential', tone: 'teal' }],
          rows: [
            ['<strong>Normal / increased appetite + weight loss</strong>', { text: 'Calories lost or unusable (maldigestion / malabsorption · glucosuria) <em>or</em> high metabolism (hyperthyroidism) — EPI · IBD · GI lymphoma · PLE · parasites · diabetes mellitus · feline hyperthyroidism', tone: 'teal' }],
            ['<strong>Reduced appetite + weight loss</strong>', { text: 'Overlaps anorexia — chronic organ disease (CKD · hepatic · cardiac cachexia) · neoplasia / paraneoplastic cachexia · chronic infection (FIV / FeLV · FIP) <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🍖'),

        ...stepTable(3, 'SIGNALMENT & ASSOCIATED SIGNS', {
          cols: '0.85fr 1.3fr',
          dividers: true,
          headers: ['Picture', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Older cat · good appetite ± PU/PD or hyperactivity</strong>', { text: 'Feline hyperthyroidism', tone: 'teal' }],
            ['<strong>PU/PD + polyphagia</strong>', { text: 'Diabetes mellitus — glucosuria = calorie loss', tone: 'teal' }],
            ['<strong>Large-volume, malodorous, soft stools + polyphagia</strong>', { text: 'EPI', tone: 'teal' }],
            ['<strong>Chronic diarrhoea / melena</strong>', { text: 'Infiltrative bowel disease · lymphangiectasia · parasites', tone: 'teal' }],
            ['<strong>Young, unknown deworming history, otherwise healthy</strong>', { text: 'Faecal exam + deworming trial <span style="opacity:.7">(Ettinger Ch 18/19)</span>', tone: 'teal' }],
          ],
        }, '🐾'),
      ],
      after: [
        {
          kind: 'callout',
          tone: 'danger',
          title: ' RED FLAGS IN THE HISTORY',
          html: `Older cat losing weight with a ravenous appetite = hyperthyroidism / DM until disproven · PU/PD + polyphagia + weight loss = diabetes — a sick inappetent diabetic may be in ketoacidosis · Marked weight + muscle loss with chronic inflammation or a known tumour = cachexia · Any cat with chronic wasting — check retroviral status (FIV/FeLV).`,
        },
        { kind: 'disclaimer' },
      ],
    },

    exam: {
      title: 'Exam: Weight Loss',
      blocks: [
        ...stepTable(1, 'OBJECTIVE BODY ASSESSMENT', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>Weigh on calibrated scales</strong>', { text: 'Objective baseline for the trend', tone: 'teal' }],
            ['<strong>Body condition score (BCS)</strong>', { text: 'Fat stores', tone: 'teal' }],
            ['<strong>Muscle condition score (MCS)</strong> — score separately', { text: 'Generalised muscle wasting out of proportion to fat loss → <strong>cachexia</strong> (chronic inflammation · cancer · cardiac · end-stage renal disease) <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '⚖️'),

        ...stepTable(2, 'ORAL / DENTAL & SWALLOWING', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Examine', { text: 'Looking for', tone: 'teal' }],
          rows: [
            ['<strong>Mouth</strong>', { text: 'Oral / dental disease (painful eating) · masses · ulceration. Uraemic oral ulceration suggests CKD', tone: 'teal' }],
            ['<strong>History of regurgitation</strong>', { text: 'Megaoesophagus', tone: 'teal' }],
            ['<strong>Difficulty prehending / swallowing</strong>', { text: 'Neuromuscular or oropharyngeal cause <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '👄'),

        ...stepTable(3, 'TARGETED SYSTEM EXAM', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Assess', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>Cervical palpation</strong>', { text: 'Thyroid slip / nodule — older cat → hyperthyroidism', tone: 'teal' }],
            ['<strong>Abdominal palpation</strong>', { text: 'Organomegaly · thickened bowel loops · mesenteric lymphadenopathy · mass', tone: 'teal' }],
            ['<strong>Cardiac auscultation</strong>', { text: 'Murmur / gallop / arrhythmia → cardiac cachexia', tone: 'teal' }],
            ['<strong>Peripheral lymph nodes</strong>', { text: 'Generalised lymphadenopathy → lymphoma <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🩺'),
      ],
      after: [{ kind: 'disclaimer' }],
    },

    dx: {
      title: 'Dx: Weight Loss — Diagnostics',
      blocks: [
        ...stepTable(1, 'CONFIRM THE TREND & DIET FIRST', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Document the loss objectively</strong>', { text: 'Serial weights — &gt;5% over &lt;12 months', tone: 'teal' }],
            ['<strong>Confirm the diet is adequate</strong>', { text: 'In quality and quantity', tone: 'teal' }],
            ['<strong>Then</strong>', { text: 'Inadequate intake is corrected and re-weighed; adequate intake with ongoing loss earns the full work-up below <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '⚖️'),

        ...stepTable(2, 'MINIMUM DATABASE (+ TT4 in cats)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test / finding', { text: 'Points to', tone: 'teal' }],
          rows: [
            ['<strong>CBC · serum biochemistry · urinalysis</strong>', { text: 'The starting point — laboratory changes are non-specific and reflect the primary disease', tone: 'teal' }],
            ['<strong>Azotaemia</strong>', { text: 'CKD', tone: 'teal' }],
            ['<strong>↑ liver enzymes / ↓ albumin</strong>', { text: 'Hepatic disease · PLE', tone: 'teal' }],
            ['<strong>Hyperglycaemia + glucosuria ± ketones</strong>', { text: 'DM / DKA', tone: 'teal' }],
            ['<strong>Cachexia markers</strong>', { text: 'Variable serum protein · ↑ fibrinogen · ↓ albumin', tone: 'teal' }],
            ['<strong>🐱 Basal TT4</strong>', { text: 'In <strong>every</strong> older cat — hyperthyroidism <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🧪'),

        ...stepTable(3, 'FAECAL / PARASITE SCREEN', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Indication', tone: 'teal' }],
          rows: [
            ['<strong>Faecal flotation ± centrifugation</strong>', { text: 'GI parasites — especially in young animals or those with an unknown deworming history', tone: 'teal' }],
            ['<strong>Deworming trial</strong>', { text: 'Pragmatic in an otherwise-healthy young patient with weight loss + polyphagia <span style="opacity:.7">(Ettinger Ch 18/19)</span>', tone: 'teal' }],
          ],
        }, '🪱'),

        ...stepTable(4, 'MALASSIMILATION PANEL (EPI / malabsorption)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Interpretation', tone: 'teal' }],
          rows: [
            ['<strong>TLI</strong>', { text: 'Low TLI confirms <strong>exocrine pancreatic insufficiency</strong>', tone: 'teal' }],
            ['<strong>Cobalamin (B12) and folate</strong>', { text: 'Low cobalamin / abnormal folate support distal small-intestinal malabsorption or dysbiosis and guide supplementation <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🦠'),
        { kind: 'note', html: `Run this panel if weight loss persists with a good appetite ± GI signs.` },

        ...stepTable(5, 'RETROVIRAL TEST (cats)', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'Why', tone: 'teal' }],
          rows: [
            ['<strong>FeLV antigen + FIV antibody</strong> — every cat with chronic weight loss', { text: 'Retroviral status reshapes the differential and prognosis, and flags chronic infection / secondary neoplasia <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🐱'),

        ...stepTable(6, 'IMAGING & GI BIOPSY', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Test', { text: 'What it shows', tone: 'teal' }],
          rows: [
            ['<strong>Thoracic radiographs + abdominal ultrasound</strong>', { text: 'Organ disease · effusion · masses · infiltrative bowel disease', tone: 'teal' }],
            ['<strong>Echocardiography</strong>', { text: 'Where cardiac cachexia is suspected', tone: 'teal' }],
            ['<strong>GI biopsy</strong> — endoscopic or surgical', { text: 'Needed to separate <strong>IBD from alimentary lymphoma</strong> and to confirm PLE / lymphangiectasia — <strong>imaging alone cannot distinguish them</strong> <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '📊'),

        ...stepTable(7, 'SEARCH FOR OCCULT NEOPLASIA / CACHEXIA', {
          cols: '0.8fr 1.35fr',
          dividers: true,
          headers: ['Do', { text: 'Detail', tone: 'teal' }],
          rows: [
            ['<strong>Actively search for occult neoplasia</strong>', { text: 'Aspirate any node or mass · stage with imaging', tone: 'teal' }],
            ['<strong>Consider cachexia</strong>', { text: 'Marked weight loss with severe muscle loss in a chronic inflammatory or cancer setting', tone: 'teal' }],
            ['<strong>If no diagnosis is found</strong>', { text: '<strong>Periodic follow-up with serial monitoring</strong> is acceptable — up to ~30% of human cases never reach a diagnosis <span style="opacity:.7">(Ettinger Ch 18)</span>', tone: 'teal' }],
          ],
        }, '🔍'),
      ],
      after: [
      { kind: 'diseaseGrid', title: 'LINKED DISEASE PAGES', links: [
            { label: 'Diabetes mellitus', link: { to: 'disease', id: 'DIS-ENDO-DM' } },
            { label: 'Diabetic ketoacidosis', link: { to: 'disease', id: 'DIS-ENDO-DKA' } },
            { label: 'Exocrine pancreatic insufficiency', link: { to: 'disease', id: 'DIS-GI-EPI' } },
            { label: 'Inflammatory bowel disease', link: { to: 'disease', id: 'DIS-GI-IBD' } },
            { label: 'GI / alimentary lymphoma', link: { to: 'disease', id: 'DIS-GI-LYMP' } },
            { label: 'Protein-losing enteropathy', link: { to: 'disease', id: 'DIS-GI-PLE' } },
            { label: 'Pancreatitis (cat)', link: { to: 'disease', id: 'DIS-GI-PANCAT' } },
            { label: 'Pancreatitis (dog)', link: { to: 'disease', id: 'DIS-SEC-PAN-DOG' } },
            { label: 'Chronic kidney disease', link: { to: 'disease', id: 'DIS-SEC-CKD' } },
            { label: 'Chronic hepatitis', link: { to: 'disease', id: 'DIS-HEP-CHRONHEP' } },
            { label: 'Dilated cardiomyopathy', link: { to: 'disease', id: 'DIS-CARD-DCM' } },
            { label: 'Heartworm disease', link: { to: 'disease', id: 'DIS-CARD-HW' } },
            { label: 'Lymphoma', link: { to: 'disease', id: 'DIS-NEO-LSA' } },
            { label: 'Paraneoplastic cachexia', link: { to: 'disease', id: 'DIS-NEO-PARANEO' } },
            { label: 'FIV', link: { to: 'disease', id: 'DIS-INFECT-FIV' } },
            { label: 'FeLV', link: { to: 'disease', id: 'DIS-INFECT-FELV' } },
            { label: 'FIP', link: { to: 'disease', id: 'DIS-INFECT-FIP' } },
            { label: 'PU/PD — diagnostic approach', link: { to: 'flow', id: 'pupd' } },
          ],
        },
        {
          kind: 'alert',
          gap: 10,
          html: `<strong> Practical pearls:</strong><br>
  • Confirm true loss (serial weights) and an adequate diet BEFORE an extensive work-up.<br>
  • Appetite is the pivot — normal/↑ appetite points to malassimilation or hypermetabolism; ↓ appetite overlaps the anorexia work-up.<br>
  • Always run a basal TT4 in an older cat, and test every chronically wasting cat for FeLV/FIV.<br>
  • Score muscle condition separately from BCS — disproportionate muscle loss flags cachexia.<br>
  • GI biopsy, not imaging, separates IBD from alimentary lymphoma.<br>
  • If no diagnosis emerges, serial monitoring with periodic re-evaluation is a legitimate strategy.`,
        },
        { kind: 'disclaimer' },
      ],
    },

  },
}
