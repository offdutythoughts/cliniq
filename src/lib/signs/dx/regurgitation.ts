// ── Regurgitation — diagnostic approach (data) ──────────────────────────────
// Migration of regurgitation{History,Exam,Dx}Html (legacy HTML consts in
// ../regurgitation.ts) to the typed DxApproach model. Rendered by
// renderDxApproach.

import type { DxApproach } from '../dxTypes'
import { stepTable } from './shared/dxHelpers'

export const regurgitationDx: DxApproach = {
  title: 'Regurgitation',
  navVariant: 'flex',
  tabs: {

  history: {
    title: 'History: Regurgitation',
    blocks: [
      { kind: 'step', text: '📋 STEP 1 — VOMITING vs REGURGITATION?', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '1.2fr 1fr 1fr',
        dividers: true,
        headers: ['Feature', { text: 'Regurgitation', tone: 'green' }, { text: 'Vomiting', tone: 'danger' }],
        rows: [
          ['Retching?', { text: 'Usually absent', tone: 'green' }, { text: 'Usually present', tone: 'danger' }],
          ['Abdominal effort?', { text: 'Passive — none', tone: 'green' }, { text: 'Active', tone: 'danger' }],
          ['Prodromal nausea?', { text: 'Absent', tone: 'green' }, { text: 'Lip licking, ptyalism', tone: 'danger' }],
          ['Bile present?', { text: 'Usually absent', tone: 'green' }, { text: 'May be present', tone: 'danger' }],
          ['Ingesta digested?', { text: 'Typically undigested, tubular', tone: 'green' }, { text: 'May be digested', tone: 'danger' }],
          ['Timing after eating?', { text: 'Any time; soon after ↑ suspicion', tone: 'green' }, { text: 'Variable', tone: 'danger' }],
          ['White/clear mucus?', { text: 'Frothy saliva common', tone: 'green' }, { text: 'Less typical', tone: 'danger' }],
          ['Frequency?', { text: 'Many/day, no systemic signs', tone: 'green' }, { text: 'Variable', tone: 'danger' }],
          ['Duration?', { text: 'Weeks–months (megaoesoph.); acute if obstructive', tone: 'green' }, { text: 'Variable', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '📖 STEP 2 — AETIOLOGICAL CLUES ONCE CONFIRMED', noArrowAfter: true },
      {
        kind: 'gridTable',
        label: 'Neuromuscular disease',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Difficulty prehension / swallowing</strong>', { text: 'Masticatory / pharyngeal muscle involvement', tone: 'green' }],
          ['<strong>Generalised weakness</strong>', { text: 'Myasthenia gravis or other neuromuscular disease', tone: 'green' }],
          ['<strong>Stridor</strong> (respiratory noise)', { text: 'Laryngeal paralysis · MG-related pharyngeal weakness. <em>Note: uncomplicated idiopathic megaoesophagus can itself raise respiratory noise from air mixing with oesophageal fluid</em>', tone: 'green' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Inflammation / oesophagitis',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Pain or discomfort during / after eating</strong>', { text: 'Oesophagitis · FB · mass', tone: 'warning' }],
          ['<strong>Gagging · retching · gulping · reverse sneezing</strong>', { text: 'Nausea component suggestive of oesophagitis', tone: 'warning' }],
          ['<strong>Regurgitated blood</strong>', { text: 'Oesophageal neoplasia · severe ulceration (oesophagitis / FB)', tone: 'danger' }],
          ['<strong>Medications</strong> — clindamycin · doxycycline', { text: 'Oesophagitis / stricture if a tablet is retained; small patients and cats are at higher risk', tone: 'warning' }],
          ['<strong>Recent anaesthesia / sedation</strong>', { text: 'Risk factor for GER → oesophagitis → regurgitation', tone: 'warning' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Obstructive lesion (FB / stricture)',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>History of FB ingestion</strong> — bones · rawhide (especially small dogs)', { text: 'Oesophageal FB', tone: 'danger' }],
          ['<strong>Unable to pass any food into the stomach</strong>', { text: 'Obstructive lesion more likely', tone: 'danger' }],
          ['<strong>Gags and regurgitates forcefully soon after eating</strong>', { text: 'Obstructive', tone: 'danger' }],
          ['<strong>Acute, progressive course</strong>', { text: 'Obstructive more likely than megaoesophagus. <em>Contrast: megaoesophagus is generally non-painful and some food may pass into the stomach</em>', tone: 'danger' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Systemic / metabolic · travel and exposure',
        cols: '0.85fr 1.3fr',
        dividers: true,
        headers: ['Clue', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Inappetence + lethargy</strong>', { text: 'Aspiration pneumonia · hypoadrenocorticism', tone: 'info' }],
          ['<strong>Weight gain + lethargy</strong>', { text: 'Hypothyroidism', tone: 'info' }],
          ['<strong>Dietary indiscretion</strong>', { text: 'Toxin ingestion (lead) · botulism · oesophageal FB', tone: 'info' }],
          ['<strong>Voice change</strong>', { text: 'Laryngeal paralysis / GOLPP', tone: 'info' }],
          ['<strong>Cough</strong>', { text: 'Aspiration pneumonia; also from fluid in the caudal pharynx with oesophageal disease', tone: 'info' }],
          ['<strong>Respiratory signs only</strong>', { text: 'May be the sole presenting complaint', tone: 'info' }],
          ['<strong>Travel to subtropical / tropical regions</strong>', { text: '<em>Spirocerca lupi</em>', tone: 'violet' }],
          ['<strong>Thorough medication history</strong>', { text: 'Drug-induced oesophagitis is underdiagnosed', tone: 'violet' }],
          ['<strong>Recent general anaesthesia</strong>', { text: 'Ask specifically — owners may not volunteer it', tone: 'violet' }],
        ],
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  exam: {
    title: 'Exam: Regurgitation',
    blocks: [
      { kind: 'step', text: '🩺 PHYSICAL EXAMINATION', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Temperature</strong>', { text: 'Fever → raises suspicion for aspiration pneumonia. ⚠️ <strong>Absence of fever does not preclude it</strong> — &lt;50% of affected dogs are febrile', tone: 'green' }],
          ['<strong>Body + muscle condition</strong>', { text: 'Compare current weight with historical records — assess for malnourishment. Poor muscle condition <em>without</em> general body condition loss → polymyositis or other polymyopathy', tone: 'green' }],
          ['<strong>Neck palpation</strong>', { text: 'A grossly dilated oesophagus is occasionally palpable in the left ventral neck (not always detected) · a firm structure there → oesophageal foreign material · discomfort or repeated swallowing attempts on palpation → oesophagitis or FB obstruction', tone: 'green' }],
          ['<strong>Oral examination</strong>', { text: 'Assess the oral cavity for FBs · swellings · masses. Ptyalism commonly noted', tone: 'green' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Upper airway noise',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Sound', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Subtle bubbling / fluid noise</strong>', { text: 'Megaoesophagus — oesophageal fluid', tone: 'warning' }],
          ['<strong>Stridor</strong>', { text: 'Laryngeal paralysis / GOLPP', tone: 'warning' }],
          ['<strong>Brachycephalic breeds</strong>', { text: 'Assess visible airway conformation + degree of stertor — severity of noise correlates with GI signs', tone: 'warning' }],
          ['<strong>Harsh / stertorous noise in a non-brachycephalic</strong>', { text: 'Pharyngeal saliva accumulation from weakness — consider generalised neuromuscular disease', tone: 'warning' }],
        ],
      },
      {
        kind: 'gridTable',
        label: 'Thoracic · neurological · musculoskeletal',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Assess', { text: 'Interpretation', tone: 'teal' }],
        rows: [
          ['<strong>Thoracic auscultation</strong>', { text: 'Crackles · ↑ respiratory rate or effort → aspiration pneumonia. ⚠️ <strong>Normal pulmonary auscultation does not exclude pneumonia</strong>; oesophageal fluid movement can mimic crackles', tone: 'warning' }],
          ['<strong>Neurological examination</strong>', { text: 'Assess for generalised neuromuscular disease · cranial nerve abnormalities (menace · pupillary light) → MG or dysautonomia · weak gag reflex + weak corneal reflex on repeated stimulation → <strong>myasthenia gravis</strong>', tone: 'violet' }],
          ['<strong>Musculoskeletal examination</strong>', { text: 'Fatigable muscle weakness → myasthenia gravis. <strong>Walk or jog the patient during the exam</strong> — weakness may only become apparent with activity', tone: 'violet' }],
        ],
      },
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  dx: {
    title: 'Dx: Regurgitation',
    blocks: [
      { kind: 'step', text: '📋 CONFIRM REGURGITATION', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Feature', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Regurgitation</strong>', { text: 'Passive, effortless expulsion · no prodromal nausea · undigested tubular food · no bile', tone: 'teal' }],
          ['<strong>Distinguish from vomiting</strong>', { text: 'Active abdominal effort · bile-stained · retching', tone: 'teal' }],
          ['<strong>Note</strong>', { text: 'The diagnostic approach is highly variable and depends on the differentials for the underlying aetiology', tone: 'teal' }],
        ],
      },

      { kind: 'step', text: '🔬 FIRST-LINE DIAGNOSTICS' },
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

      { kind: 'step', text: '📊 CERVICAL + THORACIC RADIOGRAPHY', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Technique</strong>', { text: 'The most valuable diagnostic tool for oesophageal disease — perform <strong>without sedation / anaesthesia</strong> where possible', tone: 'teal' }],
          ['<strong>Generalised gas, food or fluid dilation</strong>', { text: 'Megaoesophagus — significant hypomotility can exist <em>without</em> radiographic dilation', tone: 'teal' }],
          ['<strong>Radiopaque foreign body</strong>', { text: 'Sensitivity 90–100%; radiolucent FBs may be missed', tone: 'teal' }],
          ['<strong>Ventral lung consolidation</strong>', { text: 'Aspiration pneumonia', tone: 'teal' }],
          ['<strong>⚠️ Aspiration pneumonia caveat</strong>', { text: 'Radiographic changes <strong>lag behind</strong> aspiration (chemical injury precedes fluid accumulation) — the radiograph may be normal despite active aspiration. Changes persist for days after clinical improvement, with poor correlation to hypoxaemia and prognosis', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: '🧪 CBC · SERUM CHEMISTRY · URINALYSIS', noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Finding', { text: 'Points to', tone: 'teal' }],
        rows: [
          ['<strong>Neutrophilia</strong>', { text: 'Raises suspicion for secondary aspiration pneumonia', tone: 'teal' }],
          ['<strong>Absence of stress leukogram</strong>', { text: 'Raises suspicion for hypoadrenocorticism — especially with concurrent eosinophilia · hypoglycaemia · hypocholesterolaemia · hyperkalaemia · hyponatraemia', tone: 'teal' }],
          ['<strong>Creatine kinase (CK)</strong>', { text: 'Include to help rule out polymyositis / polymyopathy — normal: muscle disease unlikely · mild elevation: non-specific · <strong>significant elevation (&gt;1,000 U/L)</strong>: raises suspicion for polymyositis / polymyopathy', tone: 'teal' }],
        ],
      },
      { kind: 'note', html: `Assess for concurrent disease and complicating factors.` },

      { kind: 'step', text: '🔍 FURTHER DIAGNOSTICS' },
      { kind: 'step', text: `📊 POSITIVE-CONTRAST OESOPHAGRAM<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: normal non-contrast radiograph + oesophageal disease still suspected</span>`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Indications</strong>', { text: 'Non-contrast radiography normal but oesophageal disease still suspected — can reveal hypomotility · focal dilation (obstruction: VRA · stricture · mass · FB) · filling defects · diverticula. Abdominal inclusion helps confirm gastric position (hiatal hernia)', tone: 'teal' }],
          ['<strong>Luminal filling defect(s)</strong>', { text: 'Usually focal — dilation proximal to the defect suggests obstruction', tone: 'teal' }],
          ['<strong>Extra-luminal contrast</strong>', { text: 'Indicates perforation — wispy / feathery tracking into tissues', tone: 'danger' }],
          ['<strong>Focal luminal narrowing</strong>', { text: 'Only diagnose stricture / VRA if persistent on several projections — a single narrowing may be a normal peristaltic wave', tone: 'teal' }],
          ['<strong>Mucosal irregularities</strong>', { text: 'Only severe oesophagitis is detected; mild forms are often missed', tone: 'teal' }],
          ['<strong>⚠️ Not indicated</strong>', { text: 'If non-contrast radiography already shows overt oesophageal dilation. GER observed on a contrast study does not necessarily imply disease — it is seen in healthy dogs', tone: 'danger' }],
          ['<strong>Contraindicated</strong>', { text: 'Altered consciousness · neurological swallowing abnormalities', tone: 'danger' }],
          ['<strong>Extreme caution</strong>', { text: 'Active vomiting · frequent regurgitation · known or suspected perforation · dyspnoea (restraint + oral contrast → respiratory distress)', tone: 'danger' }],
          ['<strong>Aspiration risk</strong>', { text: 'Barium is caustic to pulmonary parenchyma → severe inflammatory response; high-osmolality iodinated contrast → severe pulmonary oedema if aspirated', tone: 'danger' }],
          ['<strong>Suspected perforation</strong>', { text: 'Barium contraindicated (mediastinitis risk) — iodinated contrast preferred, but barium has higher sensitivity for small leaks', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: `🔬 ENDOSCOPY (OESOPHAGOSCOPY)<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: suspected oesophagitis · mucosal assessment · FB retrieval</span>`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Mucosal assessment</strong>', { text: 'The most sensitive tool for a presumptive diagnosis of oesophagitis — hyperaemia · oedema · erosions · ulceration · friability · fibrosis · granular surface texture · increased vascularity · exudative pseudomembranes · submucosal gland proliferation (brown dots)', tone: 'teal' }],
          ['<strong>Additional benefits</strong>', { text: 'Direct visualisation of strictures · intraluminal masses · FBs · granulomas · biopsy / FNA · gastrostomy feeding tube placement · gastroscopy to exclude extra-oesophageal pathology (<strong>perform in every patient</strong>) · retroflexion to the nasopharynx for laryngopharyngeal reflux changes · bronchoscopy + BAL with cytology and culture if concurrent pneumonia', tone: 'teal' }],
          ['<strong>⚠️ Limitations</strong>', { text: 'Cannot assess oesophageal motility or diagnose megaoesophagus · the squamocolumnar junction (erythematous ring near the LOS) may mimic reflux oesophagitis — avoid over-insufflation · strictures are challenging to identify in large / giant breeds · anaesthesia and intubation affect gastro-oesophageal junction assessment · discrepancies between clinical signs and endoscopic findings are common (91% of GER-suspected dogs had unremarkable oesophagoscopy in one study) · non-erosive oesophagitis is not detectable endoscopically', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: `📡 ABDOMINAL RADIOGRAPHY + ULTRASONOGRAPHY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: concurrent vomiting, weight loss, or hyporexia</span>`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Yield</strong>', { text: 'Generally unhelpful for primary oesophageal disease — consider when vomiting, weight loss or hyporexia are concurrent', tone: 'teal' }],
          ['<strong>Rules out</strong>', { text: 'Reflux secondary to upper GI obstruction', tone: 'teal' }],
          ['<strong>Gastro-oesophageal junction</strong>', { text: 'May show mucosal thickening on ultrasound', tone: 'teal' }],
          ['<strong>Pyloric assessment</strong>', { text: 'Obstructive lesion or stenosis', tone: 'teal' }],
          ['<strong>Caveat</strong>', { text: 'A sliding hiatal hernia <strong>cannot</strong> be excluded by normal gastric positioning on ultrasound', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: `🎬 VIDEO FLUOROSCOPY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: motility assessment · dynamic GER · sliding hiatal hernia</span>`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Element', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Advantage</strong>', { text: 'Superior to static contrast radiography — assesses motility throughout the entire swallowing phase', tone: 'teal' }],
          ['<strong>Sensitivity</strong>', { text: 'More sensitive than static radiography for dynamic conditions — GER · sliding hiatal hernia', tone: 'teal' }],
          ['<strong>Also assesses</strong>', { text: 'Lower oesophageal sphincter dysfunction', tone: 'teal' }],
          ['<strong>Technique</strong>', { text: 'Perform with both liquid and dry contrast media to maximise stricture detection sensitivity', tone: 'teal' }],
          ['<strong>Not useful for</strong>', { text: 'Diagnosing oesophagitis — assesses function, not mucosa', tone: 'danger' }],
        ],
      },

      { kind: 'step', text: `🖥️ CT + ANGIOGRAPHY<br><span style="font-size:10px;font-weight:400;opacity:.85;">When: confirm vascular ring anomaly · neoplasia staging</span>`, noArrowAfter: true },
      {
        kind: 'gridTable',
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Indication', { text: 'Detail', tone: 'teal' }],
        rows: [
          ['<strong>Vascular ring anomaly (VRA)</strong>', { text: 'CT with angiography is the <strong>recommended diagnostic to confirm VRA</strong> — defines vascular anatomy and confirms oesophageal constriction', tone: 'teal' }],
          ['<strong>Also used for</strong>', { text: 'Neoplasia staging · complex mediastinal disease', tone: 'teal' }],
        ],
      },

      ...stepTable(1, 'FURTHER INVESTIGATION — MEGAOESOPHAGUS CONFIRMED', {
        cols: '0.8fr 1.35fr',
        dividers: true,
        headers: ['Test', { text: 'Rules in / out', tone: 'teal' }],
        rows: [
          ['<strong>Acetylcholine receptor antibody titre</strong>', { text: 'Myasthenia gravis', tone: 'teal' }],
          ['<strong>Neostigmine challenge</strong>', { text: 'Myasthenia gravis', tone: 'teal' }],
          ['<strong>ACTH stimulation test</strong>', { text: 'Hypoadrenocorticism', tone: 'teal' }],
          ['<strong>Thyroid hormone panel</strong>', { text: 'Hypothyroidism', tone: 'teal' }],
          ['<strong>Blood lead ± heavy metal panel</strong>', { text: 'Lead / heavy metal toxicity', tone: 'teal' }],
          ['<strong>Electrophysiology ± muscle biopsies</strong>', { text: 'Polyneuropathy / polymyopathy', tone: 'teal' }],
          ['<strong>Faecal flotation for <em>Spirocerca lupi</em> eggs</strong>', { text: 'Endemic regions — repeat if negative to maximise sensitivity', tone: 'teal' }],
        ],
      }, '🔍'),
    ],
    after: [
      { kind: 'html', html: `<div class="disclaimer">For qualified veterinary professionals only. Not a substitute for clinical judgment.</div>` },
    ],
  },

  },
}
