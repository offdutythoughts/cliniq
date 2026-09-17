// ── Jaundice — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxJaundice{History,Exam,Dx} (legacy inline HTML in
// the deleted cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable, stepPatterns, numBadge, bullets } from './shared/dxHelpers'

export const jaundiceDx: DxApproach = {
  sign: 'jaundice',
  title: 'Jaundice',
  tabs: {

  history: {
    title: 'History: Jaundice',
    blocks: [
      { kind: 'goal', text: 'CONFIRM ICTERUS, THEN SIGNAL THE CATEGORY' },
      {
        kind: 'gridTable',
        cols: '0.7fr 1.4fr',
        dividers: true,
        headers: ['First', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Confirm true icterus</strong>', { text: bullets(['Distinguish from lipaemic serum and carotenaemia', 'Owner often reports yellow gums / sclera, dark urine, or "off colour"']), tone: 'teal' }],
          ['<strong>Three-bucket framing</strong>', { text: bullets(['<strong>Pre-hepatic</strong> (haemolysis)', '<strong>Hepatic</strong>', '<strong>Post-hepatic</strong> (biliary obstruction)']), tone: 'teal' }],
        ],
      },

      ...stepTable(1, 'SIGNALMENT & BREED CLUES', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Signalment', { text: 'Differential diagnosis', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Young 🐱</strong>`, { text: bullets(['<strong>FIP</strong> (6 months–3 years)', '<strong>Lymphocytic cholangitis</strong> (1–5 years)']), tone: 'teal' }],
          [`${numBadge(2)}<strong>Young–middle-aged 🐱</strong>`, { text: bullets(['Pancreatitis', 'Neutrophilic cholangitis', 'Hepatic lipidosis']), tone: 'teal' }],
          [`${numBadge(3)}<strong>Older 🐱</strong>`, { text: bullets(['Neutrophilic cholangitis', 'Hepatic lipidosis', 'Pancreatitis', 'Neoplasia']), tone: 'teal' }],
          [`${numBadge(4)}<strong>Siamese / Oriental</strong>`, { text: bullets(['FIP', 'Amyloidosis']), tone: 'teal' }],
          [`${numBadge(5)}<strong>Persian</strong>`, { text: bullets(['FIP', 'Lymphocytic cholangitis — any pedigree → consider FIP']), tone: 'teal' }],
        ],
      }, '🐾'),

      ...stepTable(2, 'HISTORY OF PRESENTING ILLNESS', {
        cols: '0.9fr 1.25fr',
        dividers: true,
        headers: ['History', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Overweight cat, recent anorexia / weight loss</strong>', { text: 'Hepatic lipidosis', tone: 'teal' }],
          ['<strong>Weight loss despite a good appetite</strong>', { text: 'Lymphocytic cholangitis', tone: 'teal' }],
          ['<strong>Cranial abdominal pain</strong>', { text: bullets(['Pancreatitis', 'Acute neutrophilic cholangitis', 'Cholecystitis']), tone: 'teal' }],
          ['<strong>Current medications</strong>', { text: bullets(['Hepatotoxicity — paracetamol', 'Azoles', 'Lomustine', 'Phenobarbital']), tone: 'teal' }],
          ['<strong>Anorexia + vomiting + lethargy</strong>', { text: 'Non-specific — common to all three categories', tone: 'teal' }],
        ],
      }, '📋'),

      ...stepTable(3, 'CLUES TO A PRE-HEPATIC (HAEMOLYTIC) CAUSE', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Pallor or collapse</strong>', { text: 'Known or observed', tone: 'teal' }],
          ['<strong>Pigmenturia</strong>', { text: 'Red–brown urine = haemoglobinuria', tone: 'teal' }],
          ['<strong>Toxin access</strong>', { text: bullets(['Onion / garlic (Allium)', 'Zinc (coins, hardware)', 'Paracetamol (🐱)']), tone: 'teal' }],
          ['<strong>Tick exposure / travel</strong>', { text: bullets(['Babesia', 'Mycoplasma haemofelis']), tone: 'teal' }],
          ['<strong>Other</strong>', { text: bullets(['Recent transfusion (neonatal isoerythrolysis in kittens)', 'Drugs', 'Known immune-mediated history']), tone: 'teal' }],
        ],
      }, '🩸'),
    ],
    after: [
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️</strong> Mild anaemia rarely causes visible jaundice — haemolysis must be acute & severe (typically PCV &lt;13%). Do not over-attribute jaundice to a mild anaemia.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Jaundice',
    blocks: [
      ...stepTable(1, 'CONFIRM & GRADE THE ICTERUS', {
        cols: '0.7fr 1.4fr',
        dividers: true,
        headers: ['Do', { text: 'Detail', tone: 'teal' }],
        rows: [
          [`${numBadge(1)}<strong>Where to look</strong>`, { text: bullets(['Sclera', 'Mucous membranes', 'Soft palate', 'Pinnae', 'Ventral abdomen', 'Non-pigmented skin']), tone: 'teal' }],
          [`${numBadge(2)}<strong>Threshold</strong>`, { text: 'Tissue jaundice is generally only visible once serum bilirubin exceeds <strong>~50 µmol/L</strong> (reference 0–15)', tone: 'teal' }],
          [`${numBadge(3)}<strong>Grade it</strong>`, { text: 'The higher the bilirubin, the more likely complete post-hepatic obstruction — often <strong>&gt;250 µmol/L → surgical emergency</strong>', tone: 'danger' }],
        ],
      }, '🩺'),

      ...stepPatterns(2, 'TARGETED PHYSICAL FINDINGS', {
        caption: 'Physical finding → most likely',
        rows: [
          { cues: ['Pallor + icterus (± tachycardia, weakness)'], dx: 'Pre-hepatic haemolysis', tone: 'danger', emphasis: true },
          { cues: ['Pyrexia'], dx: 'FIP · neutrophilic cholangitis · sepsis', tone: 'warning' },
          { cues: ['Hepatomegaly'], dx: 'Lipidosis · lymphocytic cholangitis · neoplasia', tone: 'green' },
          { cues: ['Cranial abdominal pain'], dx: 'Pancreatitis · acute cholangitis · cholecystitis', tone: 'danger' },
          { cues: ['Ascites'], dx: 'Lymphocytic cholangitis · FIP · neoplasia', tone: 'info' },
          { cues: ['Respiratory compromise (pleural effusion)'], dx: 'FIP · neoplasia', tone: 'info' },
        ],
      }, '🔍'),

      ...stepTable(3, 'DON\'T MISS', {
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Finding', { text: 'Means', tone: 'teal' }],
        rows: [
          ['<strong>Pigmenturia</strong>', { text: 'Haemoglobinuria (pre-hepatic) vs bilirubinuria (hepatic / post-hepatic)', tone: 'teal' }],
          ['<strong>Hepatic encephalopathy</strong><br>ptyalism in cats · obtundation · head-pressing', { text: 'Severe hepatic dysfunction', tone: 'teal' }],
          ['<strong>Spontaneous bleeding / prolonged venepuncture ooze</strong>', { text: 'Coagulopathy of hepatic failure or biliary obstruction (vitamin K malabsorption) — <strong>correct before any biopsy</strong>', tone: 'danger' }],
        ],
      }, '🧠'),
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Jaundice — Diagnostics',
    blocks: [
      { kind: 'step', text: 'JAUNDICE — DIAGNOSTIC APPROACH' },
      { kind: 'note', html: `<strong>First step:</strong> check PCV + bilirubin. PCV tells you the category immediately.` },
      { kind: 'step', text: 'CHECK PCV' },
      {
        kind: 'html',
        html: `<div class="dx-connector">
      <div class="dx-col">
        <div class="dx-dx" style="width:100%;">PCV LOW<br><span style="font-weight:400;font-size:9px;">Dog &lt;20% / Cat &lt;15%</span></div>
        <div class="dx-arrow">↓</div>
        <div class="dx-test" style="width:100%;text-align:center;font-weight:600;">PRE-HEPATIC</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Haemolysis workup:</strong><br>• Blood smear (spherocytes, parasites, Heinz bodies)<br>• Saline agglutination test<br>• Reticulocyte count<br>• Coombs test<br>• Babesia/Mycoplasma PCR</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-dx" style="width:100%;font-size:10px;" onclick="goLesionTab('LOC-JD-PREHEP','Pre-hepatic jaundice')">Pre-hepatic lesions →</div>
      </div>
      <div class="dx-col">
        <div class="dx-test" style="width:100%;text-align:center;font-weight:600;font-size:11px;">PCV NORMAL</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-branch" style="width:100%;font-size:10px;">HEPATIC OR POST-HEPATIC?</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-note" style="width:100%;font-size:9px;"><strong>Abdominal US:</strong><br>• Biliary dilation? → Post-hepatic<br>• Hepatic parenchymal changes? → Hepatic<br>• Gallbladder mucocoele?</div>
        <div class="dx-arrow">↓</div>
        <div class="dx-row c2">
          <div class="dx-dx" style="font-size:9px;" onclick="goLesionTab('LOC-JD-HEP','Hepatic jaundice')">Hepatic →</div>
          <div class="dx-dx" style="font-size:9px;" onclick="goLesionTab('LOC-JD-POSTHEP','Post-hepatic jaundice')">Post-hepatic →</div>
        </div>
      </div>
    </div>`,
      },
      { kind: 'step', text: 'LAB PATTERNS THAT POINT TO A DIAGNOSIS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.95fr 1.2fr',
        dividers: true,
        headers: ['Lab pattern', { text: 'Suggests', tone: 'teal' }],
        rows: [
          ['<strong>ALT &gt; ALP</strong>', { text: bullets(['Hepatotoxicity', 'Amyloidosis', 'Hepatic neoplasia']), tone: 'teal' }],
          ['<strong>ALP &gt; ALT</strong>', { text: bullets(['Post-hepatic jaundice', 'Cholangitis', 'Hepatic lipidosis']), tone: 'teal' }],
          ['<strong>Markedly ↑ ALP, only mildly ↑ GGT</strong>', { text: 'Hepatic lipidosis', tone: 'teal' }],
          ['<strong>Mild hyperbilirubinaemia, normal ALT &amp; ALP</strong>', { text: bullets(['FIP', 'Pancreatitis']), tone: 'teal' }],
          ['<strong>Marked hyperglobulinaemia</strong>', { text: bullets(['Lymphocytic cholangitis', 'FIP']), tone: 'teal' }],
          ['<strong>Hypocalcaemia</strong>', { text: bullets(['Pancreatitis', 'Sepsis']), tone: 'teal' }],
          ['<strong>Bilirubin &gt;100 µmol/L</strong>', { text: 'Abdominal ultrasound is critical — identify extrahepatic biliary obstruction', tone: 'danger' }],
        ],
      },
    ],
    after: [
      {
        kind: 'pearls',
        gap: 10,
        html: `<strong>⚠️</strong> Dog PCV &lt;20% or Cat PCV &lt;15% with jaundice = haemolytic crisis. Consider transfusion. Bilirubin &gt;250 µmol/L with a distended gall bladder/common bile duct = possible surgical emergency.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
