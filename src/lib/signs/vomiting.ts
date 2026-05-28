// ── VOMITING — diagnostic approach
// Covers: vomiting vs regurgitation history, physical examination, diagnostic approach

// ── Tab nav helper (3-tab flex) ──────────────────────────────────────────────
const dxTabs = (active: 'history'|'exam'|'dx') =>
`<div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;"><div class="dx-step" style="flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;${active==='history'?'':'opacity:.65;'}" onclick="renderDxVomitingHistory()">📋 History</div><div class="dx-step alt" style="flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;${active==='exam'?'':'opacity:.65;'}" onclick="renderDxVomitingExam()">🩺 Exam</div><div class="dx-step" style="flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;${active==='dx'?'':'opacity:.65;'}" onclick="renderDxVomiting()">🔬 Diagnostics</div></div>`;

// ── Vomiting vs Regurgitation comparison table ───────────────────────────────
const VOM_REGURG_ROWS: {q:string,vom:string,reg:string}[] = [
  {q:'Retching?',           vom:'Usually present',                              reg:'Usually absent'},
  {q:'Abdominal effort?',   vom:'Active',                                       reg:'Passive — none'},
  {q:'Prodromal nausea?',   vom:'Lip licking, ptyalism',                        reg:'Absent'},
  {q:'Bile present?',       vom:'May be present',                               reg:'Usually absent'},
  {q:'Ingesta digested?',   vom:'May be digested',                              reg:'Typically undigested, tubular'},
  {q:'Timing after eating?',vom:'Variable',                                     reg:'Any time; soon after ↑ suspicion'},
  {q:'White/clear mucus?',  vom:'Less typical',                                 reg:'Frothy saliva common'},
  {q:'Frequency?',          vom:'Variable',                                     reg:'Many/day, no systemic signs'},
  {q:'Duration?',           vom:'Variable',                                     reg:'Weeks–months (megaoesoph.); acute if obstructive'},
];

export function vomRegurgTable(lead: 'vomiting'|'regurgitation'): string {
  const VOM='#FCA5A5', REG='#6EE7B7';
  const [c2col,c3col,c2lbl,c3lbl] = lead==='vomiting' ? [VOM,REG,'Vomiting','Regurgitation'] : [REG,VOM,'Regurgitation','Vomiting'];
  const rows = VOM_REGURG_ROWS.map(r=>{
    const c2 = lead==='vomiting' ? r.vom : r.reg;
    const c3 = lead==='vomiting' ? r.reg : r.vom;
    return `<div>${r.q}</div><div style="color:${c2col};">${c2}</div><div style="color:${c3col};">${c3}</div>`;
  }).join('');
  return `<div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:5px 8px;font-size:10.5px;line-height:1.4;"><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);">Feature</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:${c2col};">${c2lbl}</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:${c3col};">${c3lbl}</div>${rows}</div>`;
}

// ── Diagnostic approach — HISTORY ───────────────────────────────────────────
export const vomitingHistoryHtml = `
${dxTabs('history')}

<div class="dx-wrap">

  <div class="dx-step">📋 VOMITING vs REGURGITATION?</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    ${vomRegurgTable('vomiting')}
    <div style="margin-top:8px;font-size:10px;opacity:.75;">⚠️ If uncertain, work up as vomiting. If vomiting workup yields no diagnosis, pursue oesophageal investigation. Owner video is very helpful.</div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">📖 AETIOLOGICAL CLUES — CHRONICITY</div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Acute vomiting (&lt;7 days)</strong><br>
    • Dietary indiscretion — most common cause in dogs<br>
    • Toxin ingestion (ethylene glycol, chocolate, lilies, grapes, xylitol, lead)<br>
    • Drug-induced (NSAIDs, antibiotics, chemotherapy, opioids, xylazine in cats)<br>
    • Infectious gastroenteritis — parvovirus, panleukopenia (young unvaccinated)<br>
    • Foreign body — especially young animals + known pica<br>
    • GDV — emergency; acute distension + non-productive retching in large breed dog<br>
    • Intussusception — animals &lt;1 year; often concurrent diarrhoea + haematochezia<br>
    • Acute pancreatitis<br>
    <span style="font-size:10px;opacity:.75;">Many acute cases are self-limiting. Red flags require urgent workup.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCD34D;">Chronic vomiting (&gt;7 days)</strong><br>
    • Chronic enteropathy / IBD<br>
    • GI neoplasia (lymphoma, adenocarcinoma, mast cell tumour, gastrinoma)<br>
    • Food allergy or intolerance<br>
    • Motility disorder / delayed gastric emptying<br>
    • Helicobacter spp. (clinical significance variable)<br>
    • Systemic / metabolic: CKD, hepatic disease, hyperthyroidism (cat), hypoadrenocorticism<br>
    • Hiatal hernia, pyloric stenosis, gastric antral hypertrophy<br>
    • Pancreatitis (chronic/recurrent)<br>
    <span style="font-size:10px;opacity:.75;">Requires systematic minimum database + targeted second-tier diagnostics.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">📖 CHARACTER OF VOMITUS</div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCA5A5;">Blood (haematemesis)</strong><br>
    • Frank red blood → active upper GI haemorrhage (ulceration, neoplasia, coagulopathy)<br>
    • "Coffee grounds" → slow upper GI haemorrhage<br>
    • Swallowed blood from nasal/oral/pulmonary source can mimic haematemesis
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCD34D;">Bile</strong><br>
    • Suggests gastric outflow problem or intestinal dysmotility with duodenogastric reflux<br>
    • Pyloric outflow obstruction: bile usually absent (no communication with duodenum)<br>
    • Bilious vomiting syndrome: small amounts of bile after prolonged fasting → duodenogastric reflux (end of fasting window)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Undigested / partially digested food</strong><br>
    • Hours after eating → motility disorder or gastric outflow obstruction<br>
    • Immediately / soon after eating → anxiety, oesophageal disease, or obstructive lesion
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">📖 KEY SIGNALMENT + EXPOSURE CLUES</div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Age</strong><br>
    • Young (unvaccinated): parvovirus, panleukopenia, intussusception, FB, parasites<br>
    • Older: neoplasia (GI or extra-GI), hyperthyroidism (cat), CKD<br>
    <strong style="color:#FCD34D;">Breed</strong><br>
    • Brachycephalic: pyloric stenosis, hiatal hernia<br>
    • Shar Pei / German Shepherd / Rottweiler: IBD<br>
    • Large / giant breed: GDV — emergency if acute distension<br>
    • Miniature Schnauzer: dyslipidaemia → pancreatitis<br>
    • Nova Scotia Duck Tolling Retriever, Great Dane, WHWT: hypoadrenocorticism<br>
    • Siamese cat: GI adenocarcinoma, intussusception<br>
    <strong style="color:#FCA5A5;">Sex</strong><br>
    • Intact female: pyometra — always consider if not neutered
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#93C5FD;">Drug / toxin / vaccination history</strong><br>
    • NSAIDs → gastric erosion/ulceration; discontinue immediately if vomiting<br>
    • Antibiotics, chemotherapy, opioids, cyclosporine, mycophenolate, xylazine (cats)<br>
    • Toxins: ethylene glycol, ethanol, theobromine, lilies (cats), xylitol, grapes<br>
    • Incomplete vaccination → parvovirus / panleukopenia remain on differential<br>
    <strong style="color:#C4B5FD;">Travel / geography</strong><br>
    • Histoplasmosis — endemic area (concurrent diarrhoea, weight loss, lung signs)<br>
    • Pythium insidiosum — Gulf Coast/tropical region (GI mass, weight loss)<br>
    <strong style="color:#FCD34D;">Concurrent signs</strong><br>
    • Concurrent diarrhoea → ileal/jejunal/colonic involvement<br>
    • Weight loss + hyporexia → diffuse GI disease or systemic illness<br>
    • Neurological signs → CNS / vestibular cause (motion sickness, intracranial disease)<br>
    • Intact female + systemic illness → pyometra (even without PU/PD)
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
`;

// ── Diagnostic approach — EXAM ───────────────────────────────────────────────
export const vomitingExamHtml = `
${dxTabs('exam')}

<div class="dx-wrap">

  <div class="dx-step">🩺 PHYSICAL EXAMINATION</div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Temperature</strong><br>
    • Fever → infectious gastroenteritis, aspiration pneumonia, septic peritonitis, pyometra<br>
    • Hypothermia → shock, hypoadrenocorticism, severe systemic disease<br>
    <span style="font-size:10px;opacity:.75;">Absence of fever does not exclude serious disease.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Hydration + Cardiovascular</strong><br>
    • Assess skin turgor, mucous membrane moisture, capillary refill time<br>
    • Tachycardia + weak pulses + prolonged CRT → hypovolaemic shock (GDV, intussusception, peritonitis)<br>
    • Bradycardia → hypoadrenocorticism (hyperkalaemia), severe vagal response
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#6EE7B7;">Mucous Membranes</strong><br>
    • Pale → blood loss (haematemesis/melaena) or hypovolaemic shock<br>
    • Icteric → hepatic disease, haemolysis, biliary obstruction<br>
    • Hyperaemic "injected" → early shock, sepsis, SIRS
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCD34D;">Abdominal Palpation</strong><br>
    • Pain / guarding → pancreatitis, peritonitis, obstruction, GDV<br>
    • Tympanic distension → GDV, intestinal obstruction — large breed dog + non-productive retching = emergency<br>
    • Cranial abdominal mass → hepatomegaly, splenomegaly, gastric/pancreatic mass<br>
    • Mid-abdominal cylindrical mass → intussusception ("sausage loop")<br>
    • Fluid wave → ascites (hepatic disease, peritonitis, hypoalbuminaemia)<br>
    • Thickened intestinal loops → IBD, neoplasia, infectious enteritis<br>
    <span style="font-size:10px;opacity:.75;">⚠️ GDV: large breed dog + tympanic abdomen + non-productive retching → emergency — do not delay.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCA5A5;">Oral Cavity</strong><br>
    • Linear FB under tongue (especially cats) → intestinal obstruction<br>
    • Oral ulcers → uraemia (CKD), caustic toxin ingestion<br>
    • Ptyalism → nausea, oesophagitis, toxin, pharyngeal disease<br>
    • Halitosis → uraemia, hepatic encephalopathy, oral disease
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCD34D;">Neck + Thyroid</strong><br>
    • Cat: thyroid nodule (ventral neck) → hyperthyroidism — common cause of chronic vomiting in cats<br>
    • Submandibular lymphadenopathy → neoplasia, infection, lymphoma
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#C4B5FD;">Neurological Assessment</strong><br>
    • Head tilt + nystagmus + ataxia → vestibular disease (idiopathic, otitis interna)<br>
    • Altered mentation / seizures → intracranial disease, hepatic encephalopathy, severe uraemia, toxin<br>
    • Generalised weakness → hypoadrenocorticism, hypokalaemia, neuromuscular disease<br>
    <span style="font-size:10px;opacity:.75;">Primary CNS disease causing vomiting alone (without other neurological signs) is rare.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-check">
    <strong style="color:#FCA5A5;">Rectal Examination</strong><br>
    • Melaena → upper GI haemorrhage (ulceration, neoplasia)<br>
    • Haematochezia → large bowel involvement (colitis, intussusception)
  </div>

</div>
<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>
`;

// ── Diagnostic approach — DIAGNOSTICS ───────────────────────────────────────
export const vomitingDxHtml = `
${dxTabs('dx')}

<div class="dx-wrap">

  <div class="dx-step">🔬 FIRST-LINE DIAGNOSTICS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-row c2">
    <div class="dx-check" style="margin:0;">
      <strong>🧪 CBC · Serum Chemistry · UA</strong><br>
      <span style="font-size:10.5px;">All vomiting cases — first-line</span>
    </div>
    <div class="dx-check" style="margin:0;">
      <strong>📊 Abdominal Imaging</strong><br>
      <span style="font-size:10.5px;">Radiography + Ultrasound</span>
    </div>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🧪 CBC · SERUM CHEMISTRY · URINALYSIS</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Haematology:</strong><br>
    • Leucopenia → parvovirus / panleukopenia (young unvaccinated)<br>
    • Neutrophilia → infection, peritonitis, pyometra<br>
    • Eosinophilia + absence of stress leukogram → hypoadrenocorticism; also parasites, eosinophilic disease<br>
    • Anaemia (regenerative) → GI haemorrhage<br>
    • Thrombocytopenia → DIC, immune-mediated thrombocytopenia<br><br>
    <strong>Biochemistry:</strong><br>
    • ↑ BUN/Cr + low USG → CKD / AKI<br>
    • ↑ ALT/ALP/GGT → hepatobiliary disease<br>
    • Na:K ratio &lt;27 → hypoadrenocorticism (confirm with ACTH stimulation)<br>
    • Hyperglycaemia + ketonuria → DKA<br>
    • ↑ Total Ca²⁺ → neoplasia, hypoadrenocorticism, hypervitaminosis D<br>
    • Hypoalbuminaemia → protein-losing enteropathy, hepatic failure<br><br>
    <strong>Urinalysis:</strong><br>
    • USG &lt;1.030 in dehydrated dog → CKD, hypoadrenocorticism, diabetes insipidus, pyometra<br>
    • Glucosuria without hyperglycaemia → CKD (Fanconi)<br>
    • Bilirubinuria → hepatobiliary disease
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">📊 ABDOMINAL IMAGING</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>Survey radiograph (right lateral + VD):</strong><br>
    • Gas pattern: dilated loops proximal to obstruction ("stacked" appearance)<br>
    • Radiopaque FB<br>
    • Gastric compartmentalisation (double bubble, right lateral view) → GDV<br>
    • Free peritoneal gas → perforation<br>
    • Hepatomegaly, splenomegaly, abdominal mass<br>
    • Reduced serosal detail → peritoneal effusion or emaciation<br><br>
    <strong>Abdominal ultrasound:</strong><br>
    • Intestinal wall layering: loss → neoplasia; preserved but thickened → IBD/enteritis<br>
    • "Bullseye" / "target" sign → intussusception<br>
    • Pancreatic enlargement, altered echogenicity, peripancreatic fat saponification → pancreatitis<br>
    • Hepatic, splenic, adrenal lesions<br>
    • Mesenteric lymphadenopathy (IBD vs lymphoma)<br>
    • Free abdominal fluid → characterise (ascites, exudate, haemorrhage)
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step">🔍 FURTHER INVESTIGATION — SECONDARY / EXTRA-GI</div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    <strong>If bloods or imaging abnormal, pursue specific secondary cause:</strong><br><br>
    • ↑ BUN/Cr + low USG → <strong>Renal disease</strong> — urine culture, UPC ratio, renal imaging<br>
    • ↑ ALT/ALP/GGT → <strong>Hepatobiliary disease</strong> — bile acids, abdominal US, liver biopsy<br>
    • Na:K &lt;27, absent stress leukogram, or eosinophilia in sick dog → <strong>Hypoadrenocorticism</strong> — check basal cortisol; if low or suspicion remains → ACTH stimulation test<br>
    &nbsp;&nbsp;<span style="font-size:10px;opacity:.75;">Atypical Addison's: Na:K ratio normal — do not exclude on electrolytes alone</span><br>
    • Hyperglycaemia + ketonuria → <strong>DKA</strong> — blood gas, fluid therapy, insulin protocol<br>
    • ↑ Total Ca²⁺ → <strong>Hypercalcaemia workup</strong> — PTH, PTHrP, vitamin D metabolites, thoracic imaging<br>
    • Cat ↑ T4 → <strong>Hyperthyroidism</strong> — confirm, recheck in 3 weeks if equivocal<br>
    • ↑ cPLI / fPLI → <strong>Pancreatitis</strong> — imaging, supportive care<br>
    • ↓ Albumin + ↓ Globulin → <strong>PLE / hepatic failure</strong> — panhypoproteinaemia = PLE; investigate intestinal vs hepatic origin<br><br>
    <span style="font-size:10.5px;opacity:.8;">Secondary cause confirmed → investigate primary condition. Not all extra-GI vomiting requires GI workup.</span>
  </div>
  <div class="dx-arrow">↓</div>

  <div class="dx-step alt">🔍 FURTHER INVESTIGATION — IF PRIMARY GI SUSPECTED<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: first-line diagnostics normal or non-diagnostic · chronic or refractory</span></div>
  <div class="dx-arrow">↓</div>
  <div class="dx-check">
    • <strong>fPLI / cPLI</strong> — pancreatitis (especially if imaging equivocal)<br>
    • <strong>Serum T4</strong> — hyperthyroidism (cat, any age; atypical presentations possible)<br>
    • <strong>Resting cortisol ± ACTH stimulation</strong> — atypical Addison's (absent stress leukogram, eosinophilia in sick dog)<br>
    • <strong>Cobalamin + folate</strong> — SI disease indicator; cobalamin low in EPI, severe IBD, ileal disease<br>
    • <strong>Fasting gastrin</strong> — gastrinoma / Zollinger-Ellison (refractory ulcers, profound acid hypersecretion)<br>
    • <strong>Bile acids ± plasma ammonia</strong> — hepatic function / PSVA<br>
    • <strong>Dietary trial (4–8 weeks)</strong> — exclusive novel protein or hydrolysed diet; no treats, chews, flavoured medications<br>
    • <strong>Endoscopy + biopsy</strong> — mucosal assessment, chronic gastritis, IBD, early neoplasia; full-thickness preferred for deeper infiltrates
  </div>
  <div class="dx-arrow">↓</div>
  <div class="dx-dx" onclick="goLesionTab('LOC-GI-UPPER','Stomach')">Primary GI lesions →</div>
  <div style="height:4px;"></div>
  <div class="dx-dx" onclick="goLesionTab('LOC-GI-SECONDARY','Extra-GI vomiting')">Secondary / extra-GI causes →</div>

</div>

<div style="margin-top:12px;padding:10px 14px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);border-radius:10px;">
  <div style="font-size:10px;font-weight:700;color:#F87171;margin-bottom:4px;">⚠️ RED FLAGS — URGENT WORKUP</div>
  <div style="font-size:10px;color:#FCA5A5;line-height:1.6;">
    Haematemesis · Projectile vomiting · Acute abdomen + guarding · Tympanic distension + non-productive retching (GDV) · Young unvaccinated (parvo) · Intact female (pyometra) · Known toxin/FB ingestion · Collapse or hypoperfusion
  </div>
</div>
<div class="disclaimer">For qualified veterinary professionals only.</div>
`;
