// ── Jaundice — diagnostic approach (data) ───────────────────────────────────
// Migration of renderDxJaundice{History,Exam,Dx} (legacy inline HTML in
// ../cliniqApp.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const jaundiceDx: DxApproach = {
  title: 'Jaundice',
  tabs: {

  history: {
    title: 'History: Jaundice',
    blocks: [
      { kind: 'branch', text: 'CONFIRM ICTERUS, THEN SIGNAL THE CATEGORY' },
      {
        kind: 'check',
        html: `<strong>Confirm it is true icterus</strong> — distinguish from lipaemic serum and carotenaemia. Owner often reports yellow gums/sclera, dark urine, or "off colour".<br>
      <strong>Three-bucket framing from the history:</strong> pre-hepatic (haemolysis) · hepatic · post-hepatic (biliary obstruction).`,
      },
      { kind: 'step', text: '🐾 SIGNALMENT & BREED CLUES' },
      {
        kind: 'check',
        html: `<strong>Young (cat):</strong> FIP (6 months–3 years), lymphocytic cholangitis (1–5 years).<br>
      <strong>Young–middle-aged (cat):</strong> pancreatitis, neutrophilic cholangitis, hepatic lipidosis.<br>
      <strong>Older (cat):</strong> neutrophilic cholangitis, hepatic lipidosis, pancreatitis, neoplasia.<br>
      <strong>Siamese / Oriental:</strong> FIP, amyloidosis. <strong>Persian:</strong> FIP, lymphocytic cholangitis. Any pedigree → FIP.`,
      },
      { kind: 'step', alt: true, text: '📋 HISTORY OF PRESENTING ILLNESS' },
      {
        kind: 'check',
        html: `<strong>Overweight cat with recent anorexia / weight loss:</strong> hepatic lipidosis.<br>
      <strong>Weight loss despite a good appetite:</strong> lymphocytic cholangitis.<br>
      <strong>Cranial abdominal pain:</strong> pancreatitis, acute neutrophilic cholangitis, cholecystitis.<br>
      <strong>Any current medications:</strong> consider hepatotoxicity (e.g. paracetamol, azoles, lomustine, phenobarbital).<br>
      <strong>Anorexia + vomiting + lethargy</strong> — non-specific but common to all three categories.`,
      },
      { kind: 'step', alt: true, text: '🩸 CLUES TO A PRE-HEPATIC (HAEMOLYTIC) CAUSE' },
      {
        kind: 'check',
        html: `Known/observed pallor or collapse, pigmenturia (red–brown urine = haemoglobinuria).<br>
      <strong>Toxin access:</strong> onion/garlic (Allium), zinc (coins, hardware), paracetamol (cat).<br>
      <strong>Tick exposure / travel:</strong> Babesia, Mycoplasma haemofelis.<br>
      Recent transfusion (neonatal isoerythrolysis in kittens), drugs, or a known immune-mediated history.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Mild anaemia rarely causes visible jaundice — haemolysis must be acute & severe (typically PCV &lt;13%). Do not over-attribute jaundice to a mild anaemia.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  exam: {
    title: 'Exam: Jaundice',
    blocks: [
      { kind: 'step', text: '🩺 STEP 1 — CONFIRM & GRADE THE ICTERUS' },
      {
        kind: 'check',
        html: `Check sclera, mucous membranes, soft palate, pinnae, ventral abdomen and non-pigmented skin.<br>
      Tissue jaundice is generally only visible once serum bilirubin exceeds ~50 µmol/L (reference 0–15). The higher the bilirubin, the more likely complete post-hepatic obstruction (often &gt;250 µmol/L → surgical emergency).`,
      },
      { kind: 'step', alt: true, text: '🔍 STEP 2 — TARGETED PHYSICAL FINDINGS' },
      {
        kind: 'check',
        html: `<div style="display:grid;grid-template-columns:1fr 1.2fr;gap:5px 8px;font-size:10px;line-height:1.45;">
        <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Finding</div>
        <div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.2);">Most likely</div>
        <div>Pallor + icterus (± tachycardia, weakness)</div><div style="color:var(--tone-danger-title);">Pre-hepatic haemolysis</div>
        <div>Pyrexia</div><div style="color:var(--tone-warning-fg);">FIP, neutrophilic cholangitis, sepsis</div>
        <div>Hepatomegaly</div><div style="color:var(--tone-green-fg);">Lipidosis, lymphocytic cholangitis, neoplasia</div>
        <div>Cranial abdominal pain</div><div style="color:var(--tone-danger-fg);">Pancreatitis, acute cholangitis, cholecystitis</div>
        <div>Ascites</div><div style="color:var(--tone-info-fg);">Lymphocytic cholangitis, FIP, neoplasia</div>
        <div>Respiratory compromise (pleural effusion)</div><div style="color:var(--tone-info-fg);">FIP, neoplasia</div>
      </div>`,
      },
      { kind: 'step', alt: true, text: '🧠 STEP 3 — DON\'T MISS' },
      {
        kind: 'check',
        html: `<strong>Pigmenturia:</strong> haemoglobinuria (pre-hepatic) vs bilirubinuria (hepatic/post-hepatic).<br>
      <strong>Hepatic encephalopathy</strong> (ptyalism in cats, obtundation, head-pressing) → severe hepatic dysfunction.<br>
      <strong>Spontaneous bleeding / prolonged venepuncture ooze</strong> → coagulopathy of hepatic failure or biliary obstruction (vitamin K malabsorption) — correct before any biopsy.`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Jaundice — Diagnostics',
    blocks: [
      { kind: 'step', text: 'JAUNDICE — DIAGNOSTIC APPROACH' },
      { kind: 'check', html: `<strong>First step:</strong> Check PCV + bilirubin. PCV tells you the category immediately.` },
      { kind: 'step', alt: true, text: 'CHECK PCV' },
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
      { kind: 'step', alt: true, text: 'LAB PATTERNS THAT POINT TO A DIAGNOSIS' },
      {
        kind: 'check',
        html: `<strong>ALT &gt; ALP:</strong> hepatotoxicity, amyloidosis, hepatic neoplasia.<br>
      <strong>ALP &gt; ALT:</strong> post-hepatic jaundice, cholangitis, hepatic lipidosis.<br>
      <strong>Markedly ↑ ALP with only mildly ↑ GGT:</strong> hepatic lipidosis.<br>
      <strong>Mild hyperbilirubinaemia with normal ALT & ALP:</strong> FIP, pancreatitis.<br>
      <strong>Marked hyperglobulinaemia:</strong> lymphocytic cholangitis, FIP. <strong>Hypocalcaemia:</strong> pancreatitis, sepsis.<br>
      Serum bilirubin &gt;100 µmol/L → abdominal ultrasound is critical to identify extrahepatic biliary obstruction.`,
      },
    ],
    after: [
      {
        kind: 'alert',
        gap: 10,
        html: `<strong>⚠️</strong> Dog PCV &lt;20% or Cat PCV &lt;15% with jaundice = haemolytic crisis. Consider transfusion. Bilirubin &gt;250 µmol/L with a distended gall bladder/common bile duct = possible surgical emergency.`,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
