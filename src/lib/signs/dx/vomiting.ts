// ── Vomiting — diagnostic approach (data) ───────────────────────────────────
// Migration of vomiting{History,Exam,Dx}Html (legacy HTML consts in
// ../vomiting.ts) to the typed DxApproach model. Rendered by renderDxApproach.

import type { DxApproach } from '../dxTypes'

export const vomitingDx: DxApproach = {
  title: 'Vomiting',
  navVariant: 'flex',
  tabs: {

  history: {
    title: 'History: Vomiting',
    blocks: [
      { kind: 'step', text: '📋 VOMITING vs REGURGITATION?' },
      {
        kind: 'html',
        html: `<div class="dx-check">
    <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:5px 8px;font-size:10.5px;line-height:1.4;"><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);">Feature</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:var(--tone-danger-fg);">Vomiting</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:var(--tone-green-fg);">Regurgitation</div><div>Retching?</div><div style="color:var(--tone-danger-fg);">Usually present</div><div style="color:var(--tone-green-fg);">Usually absent</div><div>Abdominal effort?</div><div style="color:var(--tone-danger-fg);">Active</div><div style="color:var(--tone-green-fg);">Passive — none</div><div>Prodromal nausea?</div><div style="color:var(--tone-danger-fg);">Lip licking, ptyalism</div><div style="color:var(--tone-green-fg);">Absent</div><div>Bile present?</div><div style="color:var(--tone-danger-fg);">May be present</div><div style="color:var(--tone-green-fg);">Usually absent</div><div>Ingesta digested?</div><div style="color:var(--tone-danger-fg);">May be digested</div><div style="color:var(--tone-green-fg);">Typically undigested, tubular</div><div>Timing after eating?</div><div style="color:var(--tone-danger-fg);">Variable</div><div style="color:var(--tone-green-fg);">Any time; soon after ↑ suspicion</div><div>White/clear mucus?</div><div style="color:var(--tone-danger-fg);">Less typical</div><div style="color:var(--tone-green-fg);">Frothy saliva common</div><div>Frequency?</div><div style="color:var(--tone-danger-fg);">Variable</div><div style="color:var(--tone-green-fg);">Many/day, no systemic signs</div><div>Duration?</div><div style="color:var(--tone-danger-fg);">Variable</div><div style="color:var(--tone-green-fg);">Weeks–months (megaoesoph.); acute if obstructive</div></div>
    <div style="margin-top:8px;font-size:10px;opacity:.75;">⚠️ If uncertain, work up as vomiting. If vomiting workup yields no diagnosis, pursue oesophageal investigation. Owner video is very helpful.</div>
  </div>`,
      },
      { kind: 'step', text: '📖 AETIOLOGICAL CLUES — CHRONICITY' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Acute vomiting (&lt;7 days)</strong><br>
    • Dietary indiscretion — most common cause in dogs<br>
    • Toxin ingestion (ethylene glycol, chocolate, lilies, grapes, xylitol, lead)<br>
    • Drug-induced (NSAIDs, antibiotics, chemotherapy, opioids, xylazine in cats)<br>
    • Infectious gastroenteritis — parvovirus, panleukopenia (young unvaccinated)<br>
    • Foreign body — especially young animals + known pica<br>
    • GDV — emergency; acute distension + non-productive retching in large breed dog<br>
    • Intussusception — animals &lt;1 year; often concurrent diarrhoea + haematochezia<br>
    • Acute pancreatitis<br>
    <span style="font-size:10px;opacity:.75;">Many acute cases are self-limiting. Red flags require urgent workup.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-warning-fg);">Chronic vomiting (&gt;7 days)</strong><br>
    • Chronic enteropathy / IBD<br>
    • GI neoplasia (lymphoma, adenocarcinoma, mast cell tumour, gastrinoma)<br>
    • Food allergy or intolerance<br>
    • Motility disorder / delayed gastric emptying<br>
    • Helicobacter spp. (clinical significance variable)<br>
    • Systemic / metabolic: CKD, hepatic disease, hyperthyroidism (cat), hypoadrenocorticism<br>
    • Hiatal hernia, pyloric stenosis, gastric antral hypertrophy<br>
    • Pancreatitis (chronic/recurrent)<br>
    <span style="font-size:10px;opacity:.75;">Requires systematic minimum database + targeted second-tier diagnostics.</span>`,
      },
      { kind: 'step', text: '📖 CHARACTER OF VOMITUS' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-danger-fg);">Blood (haematemesis)</strong><br>
    • Frank red blood → active upper GI haemorrhage (ulceration, neoplasia, coagulopathy)<br>
    • "Coffee grounds" → slow upper GI haemorrhage<br>
    • Swallowed blood from nasal/oral/pulmonary source can mimic haematemesis`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-warning-fg);">Bile</strong><br>
    • Suggests gastric outflow problem or intestinal dysmotility with duodenogastric reflux<br>
    • Pyloric outflow obstruction: bile usually absent (no communication with duodenum)<br>
    • Bilious vomiting syndrome: small amounts of bile after prolonged fasting → duodenogastric reflux (end of fasting window)`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Undigested / partially digested food</strong><br>
    • Hours after eating → motility disorder or gastric outflow obstruction<br>
    • Immediately / soon after eating → anxiety, oesophageal disease, or obstructive lesion`,
      },
      { kind: 'step', text: '📖 KEY SIGNALMENT + EXPOSURE CLUES' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Age</strong><br>
    • Young (unvaccinated): parvovirus, panleukopenia, intussusception, FB, parasites<br>
    • Older: neoplasia (GI or extra-GI), hyperthyroidism (cat), CKD<br>
    <strong style="color:var(--tone-warning-fg);">Breed</strong><br>
    • Brachycephalic: pyloric stenosis, hiatal hernia<br>
    • Shar Pei / German Shepherd / Rottweiler: IBD<br>
    • Large / giant breed: GDV — emergency if acute distension<br>
    • Miniature Schnauzer: dyslipidaemia → pancreatitis<br>
    • Nova Scotia Duck Tolling Retriever, Great Dane, WHWT: hypoadrenocorticism<br>
    • Siamese cat: GI adenocarcinoma, intussusception<br>
    <strong style="color:var(--tone-danger-fg);">Sex</strong><br>
    • Intact female: pyometra — always consider if not neutered`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-info-fg);">Drug / toxin / vaccination history</strong><br>
    • NSAIDs → gastric erosion/ulceration; discontinue immediately if vomiting<br>
    • Antibiotics, chemotherapy, opioids, cyclosporine, mycophenolate, xylazine (cats)<br>
    • Toxins: ethylene glycol, ethanol, theobromine, lilies (cats), xylitol, grapes<br>
    • Incomplete vaccination → parvovirus / panleukopenia remain on differential<br>
    <strong style="color:var(--tone-violet-fg);">Travel / geography</strong><br>
    • Histoplasmosis — endemic area (concurrent diarrhoea, weight loss, lung signs)<br>
    • Pythium insidiosum — Gulf Coast/tropical region (GI mass, weight loss)<br>
    <strong style="color:var(--tone-warning-fg);">Concurrent signs</strong><br>
    • Concurrent diarrhoea → ileal/jejunal/colonic involvement<br>
    • Weight loss + hyporexia → diffuse GI disease or systemic illness<br>
    • Neurological signs → CNS / vestibular cause (motion sickness, intracranial disease)<br>
    • Intact female + systemic illness → pyometra (even without PU/PD)`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  exam: {
    title: 'Exam: Vomiting',
    blocks: [
      { kind: 'step', text: '🩺 PHYSICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Temperature</strong><br>
    • Fever → infectious gastroenteritis, aspiration pneumonia, septic peritonitis, pyometra<br>
    • Hypothermia → shock, hypoadrenocorticism, severe systemic disease<br>
    <span style="font-size:10px;opacity:.75;">Absence of fever does not exclude serious disease.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Hydration + Cardiovascular</strong><br>
    • Assess skin turgor, mucous membrane moisture, capillary refill time<br>
    • Tachycardia + weak pulses + prolonged CRT → hypovolaemic shock (GDV, intussusception, peritonitis)<br>
    • Bradycardia → hypoadrenocorticism (hyperkalaemia), severe vagal response`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-green-fg);">Mucous Membranes</strong><br>
    • Pale → blood loss (haematemesis/melaena) or hypovolaemic shock<br>
    • Icteric → hepatic disease, haemolysis, biliary obstruction<br>
    • Hyperaemic "injected" → early shock, sepsis, SIRS`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-warning-fg);">Abdominal Palpation</strong><br>
    • Pain / guarding → pancreatitis, peritonitis, obstruction, GDV<br>
    • Tympanic distension → GDV, intestinal obstruction — large breed dog + non-productive retching = emergency<br>
    • Cranial abdominal mass → hepatomegaly, splenomegaly, gastric/pancreatic mass<br>
    • Mid-abdominal cylindrical mass → intussusception ("sausage loop")<br>
    • Fluid wave → ascites (hepatic disease, peritonitis, hypoalbuminaemia)<br>
    • Thickened intestinal loops → IBD, neoplasia, infectious enteritis<br>
    <span style="font-size:10px;opacity:.75;">⚠️ GDV: large breed dog + tympanic abdomen + non-productive retching → emergency — do not delay.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-danger-fg);">Oral Cavity</strong><br>
    • Linear FB under tongue (especially cats) → intestinal obstruction<br>
    • Oral ulcers → uraemia (CKD), caustic toxin ingestion<br>
    • Ptyalism → nausea, oesophagitis, toxin, pharyngeal disease<br>
    • Halitosis → uraemia, hepatic encephalopathy, oral disease`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-warning-fg);">Neck + Thyroid</strong><br>
    • Cat: thyroid nodule (ventral neck) → hyperthyroidism — common cause of chronic vomiting in cats<br>
    • Submandibular lymphadenopathy → neoplasia, infection, lymphoma`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-violet-fg);">Neurological Assessment</strong><br>
    • Head tilt + nystagmus + ataxia → vestibular disease (idiopathic, otitis interna)<br>
    • Altered mentation / seizures → intracranial disease, hepatic encephalopathy, severe uraemia, toxin<br>
    • Generalised weakness → hypoadrenocorticism, hypokalaemia, neuromuscular disease<br>
    <span style="font-size:10px;opacity:.75;">Primary CNS disease causing vomiting alone (without other neurological signs) is rare.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:var(--tone-danger-fg);">Rectal Examination</strong><br>
    • Melaena → upper GI haemorrhage (ulceration, neoplasia)<br>
    • Haematochezia → large bowel involvement (colitis, intussusception)`,
      },
    ],
    after: [{ kind: 'disclaimer' }],
  },

  dx: {
    title: 'Dx: Vomiting',
    blocks: [
      { kind: 'step', text: '🔬 FIRST-LINE DIAGNOSTICS' },
      { kind: 'row', cols: 2, itemKind: 'check', items: [
        { html: '<strong>🧪 CBC · Serum Chemistry · UA</strong><br><span style="font-size:10.5px;">All vomiting cases — first-line</span>' },
        { html: '<strong>📊 Abdominal Imaging</strong><br><span style="font-size:10.5px;">Radiography + Ultrasound</span>' },
      ] },
      { kind: 'step', text: '🧪 CBC · SERUM CHEMISTRY · URINALYSIS' },
      {
        kind: 'check',
        html: `<strong>Haematology:</strong><br>
    • Leucopenia → parvovirus / panleukopenia (young unvaccinated)<br>
    • Neutrophilia → infection, peritonitis, pyometra<br>
    • Eosinophilia + absence of stress leukogram → hypoadrenocorticism; also parasites, eosinophilic disease<br>
    • Anaemia (regenerative) → GI haemorrhage<br>
    • Thrombocytopenia → DIC, immune-mediated thrombocytopenia<br><br>
    <strong>Biochemistry:</strong><br>
    • ↑ BUN/Cr + low USG → CKD / AKI<br>
    • ↑ ALT/ALP/GGT → hepatobiliary disease<br>
    • Na:K ratio &lt;27 → hypoadrenocorticism (confirm with ACTH stimulation)<br>
    • Persistent hyperglycaemia + glucosuria (no ketones) → diabetes mellitus<br>
    • Hyperglycaemia + ketonuria → DKA<br>
    • ↑ Total Ca²⁺ → neoplasia, hypoadrenocorticism, hypervitaminosis D<br>
    • Hypoalbuminaemia → protein-losing enteropathy, hepatic failure<br><br>
    <strong>Urinalysis:</strong><br>
    • USG &lt;1.030 in dehydrated dog → CKD, hypoadrenocorticism, diabetes insipidus, pyometra<br>
    • Glucosuria without hyperglycaemia → CKD (Fanconi)<br>
    • Bilirubinuria → hepatobiliary disease`,
      },
      { kind: 'step', text: '📊 ABDOMINAL IMAGING' },
      {
        kind: 'check',
        html: `<strong>Survey radiograph (right lateral + VD):</strong><br>
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
    • Free abdominal fluid → characterise (ascites, exudate, haemorrhage)`,
      },
      { kind: 'step', text: '🔍 FURTHER INVESTIGATION — SECONDARY / EXTRA-GI' },
      {
        kind: 'check',
        html: `<strong>If bloods or imaging abnormal, pursue specific secondary cause:</strong><br><br>
    • ↑ BUN/Cr + low USG → <strong>Renal disease</strong> — urine culture, UPC ratio, renal imaging<br>
    • ↑ ALT/ALP/GGT → <strong>Hepatobiliary disease</strong> — bile acids, abdominal US, liver biopsy<br>
    • Na:K &lt;27, absent stress leukogram, or eosinophilia in sick dog → <strong>Hypoadrenocorticism</strong> — check basal cortisol; if low or suspicion remains → ACTH stimulation test<br>
    &nbsp;&nbsp;<span style="font-size:10px;opacity:.75;">Atypical Addison's: Na:K ratio normal — do not exclude on electrolytes alone</span><br>
    • Persistent hyperglycaemia + glucosuria (no ketones) → <strong>Diabetes mellitus</strong> — fructosamine, urinalysis + culture, start insulin + diet<br>
    • Hyperglycaemia + ketonuria → <strong>DKA</strong> — blood gas, fluid therapy, insulin protocol<br>
    • ↑ Total Ca²⁺ → <strong>Hypercalcaemia workup</strong> — PTH, PTHrP, vitamin D metabolites, thoracic imaging<br>
    • Cat ↑ T4 → <strong>Hyperthyroidism</strong> — confirm, recheck in 3 weeks if equivocal<br>
    • ↑ cPLI / fPLI → <strong>Pancreatitis</strong> — imaging, supportive care<br>
    • ↓ Albumin + ↓ Globulin → <strong>PLE / hepatic failure</strong> — panhypoproteinaemia = PLE; investigate intestinal vs hepatic origin<br><br>
    <span style="font-size:10.5px;opacity:.8;">Secondary cause confirmed → investigate primary condition. Not all extra-GI vomiting requires GI workup.</span>`,
      },
      { kind: 'step', text: '🔍 FURTHER INVESTIGATION — IF PRIMARY GI SUSPECTED<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: first-line diagnostics normal or non-diagnostic · chronic or refractory</span>' },
      {
        kind: 'check',
        html: `• <strong>fPLI / cPLI</strong> — pancreatitis (especially if imaging equivocal)<br>
    • <strong>Serum T4</strong> — hyperthyroidism (cat, any age; atypical presentations possible)<br>
    • <strong>Resting cortisol ± ACTH stimulation</strong> — atypical Addison's (absent stress leukogram, eosinophilia in sick dog)<br>
    • <strong>Cobalamin + folate</strong> — SI disease indicator; cobalamin low in EPI, severe IBD, ileal disease<br>
    • <strong>Fasting gastrin</strong> — gastrinoma / Zollinger-Ellison (refractory ulcers, profound acid hypersecretion)<br>
    • <strong>Bile acids ± plasma ammonia</strong> — hepatic function / PSVA<br>
    • <strong>Dietary trial (4–8 weeks)</strong> — exclusive novel protein or hydrolysed diet; no treats, chews, flavoured medications<br>
    • <strong>Endoscopy + biopsy</strong> — mucosal assessment, chronic gastritis, IBD, early neoplasia; full-thickness preferred for deeper infiltrates`,
      },
      { kind: 'lesionLink', loc: 'LOC-GI-UPPER', name: 'Primary GI lesions', noArrowAfter: true },
      { kind: 'lesionLink', loc: 'LOC-GI-SECONDARY', name: 'Secondary / extra-GI causes', tone: 'secondary' },
    ],
    after: [
      {
        kind: 'callout',
        tone: 'danger',
        title: '⚠️ RED FLAGS — URGENT WORKUP',
        html: `
    Haematemesis · Projectile vomiting · Acute abdomen + guarding · Tympanic distension + non-productive retching (GDV) · Young unvaccinated (parvo) · Intact female (pyometra) · Known toxin/FB ingestion · Collapse or hypoperfusion
  `,
      },
      { kind: 'disclaimer' },
    ],
  },

  },
}
