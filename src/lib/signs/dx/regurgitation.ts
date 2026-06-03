// ── Regurgitation — diagnostic approach (data) ──────────────────────────────
// Migration of regurgitation{History,Exam,Dx}Html (legacy HTML consts in
// ../regurgitation.ts) to the typed DxApproach model. Rendered by
// renderDxApproach. See DATA_MIGRATION.md.

import type { DxApproach } from '../dxTypes'

export const regurgitationDx: DxApproach = {
  title: 'Regurgitation',
  navVariant: 'flex',
  tabs: {

  history: {
    title: 'History: Regurgitation',
    blocks: [
      { kind: 'step', text: '📋 VOMITING vs REGURGITATION?' },
      {
        kind: 'check',
        html: `
    <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:5px 8px;font-size:10.5px;line-height:1.4;"><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);">Feature</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:#6EE7B7;">Regurgitation</div><div style="font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);color:#FCA5A5;">Vomiting</div><div>Retching?</div><div style="color:#6EE7B7;">Usually absent</div><div style="color:#FCA5A5;">Usually present</div><div>Abdominal effort?</div><div style="color:#6EE7B7;">Passive — none</div><div style="color:#FCA5A5;">Active</div><div>Prodromal nausea?</div><div style="color:#6EE7B7;">Absent</div><div style="color:#FCA5A5;">Lip licking, ptyalism</div><div>Bile present?</div><div style="color:#6EE7B7;">Usually absent</div><div style="color:#FCA5A5;">May be present</div><div>Ingesta digested?</div><div style="color:#6EE7B7;">Typically undigested, tubular</div><div style="color:#FCA5A5;">May be digested</div><div>Timing after eating?</div><div style="color:#6EE7B7;">Any time; soon after ↑ suspicion</div><div style="color:#FCA5A5;">Variable</div><div>White/clear mucus?</div><div style="color:#6EE7B7;">Frothy saliva common</div><div style="color:#FCA5A5;">Less typical</div><div>Frequency?</div><div style="color:#6EE7B7;">Many/day, no systemic signs</div><div style="color:#FCA5A5;">Variable</div><div>Duration?</div><div style="color:#6EE7B7;">Weeks–months (megaoesoph.); acute if obstructive</div><div style="color:#FCA5A5;">Variable</div></div>
  `,
      },
      { kind: 'step', alt: true, text: '📖 AETIOLOGICAL CLUES — ONCE CONFIRMED' },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Neuromuscular disease</strong><br>
    • Difficulty prehension/swallowing → masticatory/pharyngeal muscle involvement<br>
    • Generalised weakness → myasthenia gravis or other neuromuscular disease<br>
    • Stridor (respiratory noise) → laryngeal paralysis or MG-related pharyngeal weakness<br>
    <span style="font-size:10px;opacity:.75;">Note: uncomplicated idiopathic megaoesophagus can cause ↑ respiratory noise from air mixing with oesophageal fluid.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Inflammation / Oesophagitis</strong><br>
    • Pain or discomfort during/after eating → oesophagitis, FB, or mass<br>
    • Gagging, retching, gulping, reverse sneezing → nausea component suggestive of oesophagitis<br>
    • Regurgitated blood → oesophageal neoplasia or severe ulceration (oesophagitis/FB)<br>
    • Medications (clindamycin, doxycycline) → oesophagitis/stricture if tablet retained; small patients/cats at higher risk<br>
    • Recent anaesthesia/sedation → risk factor for GER → oesophagitis → regurgitation`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCA5A5;">Obstructive lesion (FB / Stricture)</strong><br>
    • History of FB ingestion (bones, rawhide — especially small dogs) → oesophageal FB<br>
    • Unable to pass any food into stomach → obstructive lesion more likely<br>
    • Gags and regurgitates forcefully soon after eating → obstructive<br>
    • Acute, progressive course → obstructive more likely than megaoesophagus<br>
    <span style="font-size:10px;opacity:.75;">Contrast: megaoesophagus is generally non-painful; some food may pass into the stomach.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#93C5FD;">Systemic / Metabolic clues</strong><br>
    • Inappetence + lethargy → aspiration pneumonia or hypoadrenocorticism<br>
    • Weight gain + lethargy → hypothyroidism<br>
    • Dietary indiscretion → toxin ingestion (lead), botulism, or oesophageal FB<br>
    • Voice change → laryngeal paralysis / GOLPP<br>
    • Cough → aspiration pneumonia; also occurs from fluid in caudal pharynx with oesophageal disease<br>
    • Respiratory signs only → may be the sole presenting complaint`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#C4B5FD;">Travel + Exposure history</strong><br>
    • Travel to subtropical/tropical regions → <em>Spirocerca lupi</em><br>
    • Thorough medication history — drug-induced oesophagitis underdiagnosed<br>
    • Recent general anaesthesia — ask specifically; owners may not volunteer`,
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  exam: {
    title: 'Exam: Regurgitation',
    blocks: [
      { kind: 'step', text: '🩺 PHYSICAL EXAMINATION' },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Temperature</strong><br>
    • Fever → raises suspicion for aspiration pneumonia<br>
    <span style="font-size:10px;opacity:.75;">⚠️ Absence of fever does not preclude aspiration pneumonia — &lt;50% of affected dogs are febrile.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Body + Muscle Condition</strong><br>
    • Compare current weight with historical records — assess for malnourishment<br>
    • Poor muscle condition without general body condition loss → polymyositis or other polymyopathy`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Neck Palpation</strong><br>
    • Grossly dilated oesophagus occasionally palpable in left ventral neck (not always detected)<br>
    • Firm structure in left ventral neck → oesophageal foreign material<br>
    • Discomfort or repeated swallowing attempts on palpation → oesophagitis or FB obstruction`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#6EE7B7;">Oral Examination</strong><br>
    • Assess oral cavity for FBs, swellings, or masses<br>
    • Ptyalism commonly noted`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Upper Airway Noise</strong><br>
    • Megaoesophagus → subtle bubbling/fluid noise from oesophageal fluid<br>
    • <strong>Stridor</strong> → laryngeal paralysis / GOLPP<br>
    • Brachycephalic breeds: assess visible airway conformation + degree of stertor — severity of noise correlates with GI signs<br>
    • Harsh/stertorous noise in non-brachycephalic breeds → pharyngeal saliva accumulation from weakness — consider generalised neuromuscular disease`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#FCD34D;">Thoracic Auscultation</strong><br>
    • Auscultate for crackles, ↑ respiratory rate/effort → aspiration pneumonia<br>
    <span style="font-size:10px;opacity:.75;">⚠️ Normal pulmonary auscultation does not exclude pneumonia. Oesophageal fluid movement can mimic crackles.</span>`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#C4B5FD;">Neurological Examination</strong><br>
    • Assess for generalised neuromuscular disease<br>
    • Cranial nerve abnormalities (menace, pupillary light) → MG or dysautonomia<br>
    • Weak gag reflex + weak corneal reflex on repeated stimulation → myasthenia gravis`,
      },
      {
        kind: 'check',
        html: `<strong style="color:#C4B5FD;">Musculoskeletal Examination</strong><br>
    • Fatigable muscle weakness → myasthenia gravis<br>
    • Walk or jog the patient during exam — weakness may only become apparent with activity`,
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  dx: {
    title: 'Dx: Regurgitation',
    blocks: [
      { kind: 'step', text: '📋 CONFIRM REGURGITATION' },
      {
        kind: 'check',
        html: `Passive, effortless expulsion · No prodromal nausea · Undigested tubular food · No bile<br>
    <span style="font-size:10px;opacity:.8;">Distinguish from vomiting (active abdominal effort, bile-stained, retching). Diagnostic approach is highly variable and dependent on differentials for the underlying aetiology.</span>`,
      },
      { kind: 'step', alt: true, text: '🔬 FIRST-LINE DIAGNOSTICS' },
      {
        kind: 'html',
        html: `<div class="dx-row c2">
    <div class="dx-check" style="margin:0;">
      <strong>📊 Cervical + Thoracic Radiography</strong><br>
      <span style="font-size:10.5px;">± contrast · First-line in all cases</span>
    </div>
    <div class="dx-check" style="margin:0;">
      <strong>🧪 CBC · Serum Chemistry · UA</strong><br>
      <span style="font-size:10.5px;">Assess systemic health + complicating factors</span>
    </div>
  </div>`,
      },
      { kind: 'step', text: '📊 CERVICAL + THORACIC RADIOGRAPHY' },
      {
        kind: 'check',
        html: `Most valuable diagnostic tool for oesophageal disease. Perform <strong>without sedation/anaesthesia</strong> where possible.<br><br>
    <strong>What to look for:</strong><br>
    • Generalised gas, food or fluid dilation → megaoesophagus (significant hypomotility can exist without radiographic dilation)<br>
    • Radiopaque foreign body — sensitivity 90–100%; radiolucent FBs may be missed<br>
    • Ventral lung consolidation → aspiration pneumonia<br><br>
    <strong>⚠️ Aspiration pneumonia caveat:</strong> Radiographic changes lag behind aspiration (chemical injury precedes fluid accumulation) — radiograph may be normal despite active aspiration. Changes persist for days after clinical improvement with poor correlation to hypoxaemia and prognosis.`,
        noArrowAfter: true,
      },
      { kind: 'step', alt: true, text: '🧪 CBC · SERUM CHEMISTRY · URINALYSIS' },
      {
        kind: 'check',
        html: `Assess for concurrent disease and complicating factors.<br><br>
    • <strong>Neutrophilia</strong> → raises suspicion for secondary aspiration pneumonia<br>
    • <strong>Absence of stress leukogram</strong> → raises suspicion for hypoadrenocorticism, especially with concurrent eosinophilia, hypoglycaemia, hypocholesterolaemia, hyperkalaemia, hyponatraemia<br>
    • <strong>Creatine kinase (CK):</strong> include to help rule out polymyositis/polymyopathy<br>
      &nbsp;&nbsp;– Normal: muscle disease unlikely<br>
      &nbsp;&nbsp;– Mild elevation: non-specific<br>
      &nbsp;&nbsp;– Significant elevation (&gt;1,000 U/L): raises suspicion for polymyositis/polymyopathy`,
        noArrowAfter: true,
      },
      { kind: 'step', text: '🔍 FURTHER DIAGNOSTICS' },
      { kind: 'step', alt: true, text: `📊 POSITIVE-CONTRAST OESOPHAGRAM<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: normal non-contrast radiograph + oesophageal disease still suspected</span>` },
      {
        kind: 'check',
        html: `<strong>Indications:</strong> Use when non-contrast radiography is normal but oesophageal disease still suspected — can reveal hypomotility, focal dilation (obstruction: VRA, stricture, mass, FB), filling defects, or diverticula. Abdominal inclusion helps confirm gastric position (hiatal hernia).<br><br>
    <strong>What to evaluate:</strong><br>
    • Luminal filling defect(s) — usually focal; dilation proximal to defect suggests obstruction<br>
    • Extra-luminal contrast — indicates perforation (wispy/feathery tracking into tissues)<br>
    • Focal luminal narrowing — only diagnose stricture/VRA if persistent on several projections (single narrowing may be a normal peristaltic wave)<br>
    • Mucosal irregularities — only severe oesophagitis detected; mild forms often missed<br><br>
    <strong>⚠️ Not indicated</strong> if non-contrast radiography shows overt oesophageal dilation.<br>
    GER observed on contrast study does not necessarily imply disease (seen in healthy dogs).<br><br>
    <strong>Contraindications + risks:</strong><br>
    • Contraindicated: altered consciousness / neurological swallowing abnormalities<br>
    • Extreme caution: active vomiting, frequent regurgitation, known/suspected perforation, dyspnoea (restraint + oral contrast → respiratory distress)<br>
    • Aspiration risk: barium is caustic to pulmonary parenchyma → severe inflammatory response; high-osmolality iodinated contrast → severe pulmonary oedema if aspirated<br>
    • Barium contraindicated for suspected perforation (mediastinitis risk); iodinated contrast preferred — but barium has higher sensitivity for small leaks`,
      },
      { kind: 'step', text: `🔬 ENDOSCOPY (OESOPHAGOSCOPY)<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: suspected oesophagitis · mucosal assessment · FB retrieval</span>` },
      {
        kind: 'check',
        html: `Most sensitive tool for presumptive diagnosis of oesophagitis. Assess mucosa for: hyperaemia, oedema, erosions, ulceration, friability, fibrosis, granular surface texture, increased vascularity, exudative pseudomembranes, submucosal gland proliferation (brown dots).<br><br>
    <strong>Additional benefits:</strong><br>
    • Direct visualisation of strictures, intraluminal masses, FBs, granulomas<br>
    • Biopsy / fine-needle aspiration<br>
    • Gastrostomy feeding tube placement<br>
    • Gastroscopy to exclude extra-oesophageal pathology (perform in every patient)<br>
    • Retroflexion to nasopharynx — assess for laryngopharyngeal reflux changes<br>
    • Bronchoscopy + BAL — assess lower airways; cytology + culture if concurrent pneumonia<br><br>
    <strong>⚠️ Limitations:</strong><br>
    • Cannot assess oesophageal motility or diagnose megaoesophagus<br>
    • Squamocolumnar junction (erythematous ring near LOS) may mimic reflux oesophagitis — avoid over-insufflation<br>
    • Strictures challenging to identify in large/giant breeds<br>
    • Anaesthesia and intubation affect gastro-oesophageal junction assessment<br>
    • Discrepancies between clinical signs and endoscopic findings are common — 91% of GER-suspected dogs had unremarkable oesophagoscopy in one study<br>
    • Non-erosive oesophagitis not detectable endoscopically`,
      },
      { kind: 'step', alt: true, text: `📡 ABDOMINAL RADIOGRAPHY + ULTRASONOGRAPHY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: concurrent vomiting, weight loss, or hyporexia</span>` },
      {
        kind: 'check',
        html: `Generally unhelpful for primary oesophageal disease. Consider when vomiting, weight loss, or hyporexia are concurrent.<br><br>
    • Rules out reflux secondary to upper GI obstruction<br>
    • Gastro-oesophageal junction may show mucosal thickening on ultrasound<br>
    • Pyloric assessment — obstructive lesion or stenosis<br>
    • Sliding hiatal hernia cannot be excluded by normal gastric positioning on ultrasound`,
      },
      { kind: 'step', text: `🎬 VIDEO FLUOROSCOPY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: motility assessment · dynamic GER · sliding hiatal hernia</span>` },
      {
        kind: 'check',
        html: `Superior to static contrast radiography — assesses motility throughout the entire swallowing phase.<br><br>
    • More sensitive than static radiography for dynamic conditions (GER, sliding hiatal hernia)<br>
    • Allows assessment of lower oesophageal sphincter dysfunction<br>
    • Perform with both liquid and dry contrast media to maximise stricture detection sensitivity<br>
    • <strong>Not useful</strong> for diagnosing oesophagitis (assesses function, not mucosa)`,
      },
      { kind: 'step', alt: true, text: `🖥️ CT + ANGIOGRAPHY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: confirm vascular ring anomaly · neoplasia staging</span>` },
      {
        kind: 'check',
        html: `CT with angiography is the recommended diagnostic to confirm vascular ring anomaly (VRA) — defines vascular anatomy and confirms oesophageal constriction. Also used for neoplasia staging and complex mediastinal disease.`,
      },
      { kind: 'step', text: `🔍 FURTHER INVESTIGATION — MEGAOESOPHAGUS<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: megaoesophagus confirmed — identify underlying cause</span>` },
      {
        kind: 'check',
        html: `When megaoesophagus is confirmed, additional diagnostics to rule out underlying cause:<br><br>
    • Acetylcholine receptor antibody titre (myasthenia gravis)<br>
    • Neostigmine challenge (MG)<br>
    • ACTH stimulation test (hypoadrenocorticism)<br>
    • Thyroid hormone panel (hypothyroidism)<br>
    • Blood lead ± heavy metal panel<br>
    • Electrophysiology — polyneuropathy / polymyopathy ± muscle biopsies<br>
    • Fecal flotation for <em>Spirocerca lupi</em> eggs (endemic regions) — repeat if negative to maximise sensitivity`,
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  },
}
