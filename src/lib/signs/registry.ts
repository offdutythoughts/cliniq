// ── Clinical-sign registry ─────────────────────────────────────────────────
// Single source of truth for all clinical signs.
//
// Tab 0 (Localise / flowcharts): entries with flowId set.
// Tab 1 (Diagnostic approaches): all entries; dxId overrides the sign id when
//   the dx module uses a different key than the flow id (e.g. pale-mm → pale-gums).
//
// Adding a sign:
//   • Add an entry here with a unique icon, id, title, sub.
//   • Set flowId if there is a flowchart; set dxId if the dx module key differs.
//   • Add the FlowPage to src/lib/signs/flows/ (flowId) and/or a dx file (dxId).
//   • registry.test.ts enforces every flowId resolves to a real FLOWS page.

export type SignEntry = {
  /** Stable kebab-case id (used for keys/links, not display). */
  id: string
  /** Unique emoji for the card icon slot. No two signs share an icon. */
  icon: string
  /** Card title. */
  title: string
  /** Card subtitle / one-line summary. Used on both the flow and dx card. */
  sub: string
  /** Id of the entry FlowPage in FLOWS (Tab 0). Omit for dx-only signs. */
  flowId?: string
  /** Dx sign id when it differs from id (Tab 1). Defaults to id. */
  dxId?: string
  /** Clinical synonyms, lay terms, abbreviations — searched in sign picker. */
  keywords?: string[]
}

export const SIGNS: SignEntry[] = [
  { id: 'encephalopathy', icon: '🧬', title: 'Disorientation', sub: 'Encephalitis, neoplasia, CVA, metabolic', flowId: 'encephalopathy',
    keywords: ['brain', 'confusion', 'disorientation', 'altered consciousness', 'stupor', 'coma', 'stroke', 'CVA', 'cerebrovascular', 'encephalitis', 'hepatic encephalopathy', 'metabolic brain', 'head pressing', 'circling', 'mental dullness'] },
  { id: 'myelopathy', icon: '🦴', title: 'Acute Myelopathy', sub: 'Spinal cord localisation', flowId: 'myelopathy',
    keywords: ['spinal cord', 'spine', 'back pain', 'paralysis', 'paraplegia', 'paresis', 'IVDD', 'disc disease', 'intervertebral disc', 'hind limb weakness', 'hindlimb', 'proprioception', 'FCE', 'fibrocartilaginous embolism', 'degenerative myelopathy', 'DM'] },
  { id: 'vestibular', icon: '🌀', title: 'Acute Vestibular', sub: 'Peripheral vs central', flowId: 'vestibular',
    keywords: ['head tilt', 'rolling', 'nystagmus', 'dizzy', 'dizziness', 'balance', 'falling', 'otitis interna', 'ear', 'idiopathic vestibular', 'old dog vestibular', 'geriatric vestibular'] },
  { id: 'abnormal-pupil', icon: '🔵', title: 'Anisocoria / Abnormal Pupil', sub: 'Dog + Cat · Ophthalmic vs neurological · light/dark room rule · PLR battery', flowId: 'abnormal-pupil',
    keywords: ['anisocoria', 'unequal pupils', 'dilated pupil', 'constricted pupil', 'miosis', 'mydriasis', 'PLR', 'pupillary light reflex', 'Horner', 'iris', 'third nerve', 'CN3', 'sympathetic denervation'] },
  { id: 'anorexia', icon: '🍽️', title: 'Anorexia / Hyporexia', sub: 'Dog + Cat · Pseudo- vs true · cat = lipidosis emergency', flowId: 'anorexia',
    keywords: ['not eating', 'off food', 'inappetence', 'reduced appetite', 'no appetite', 'food refusal', 'hyporexia', 'hepatic lipidosis', 'feline lipidosis', 'pseudo-anorexia', 'nausea', 'pain on eating'] },
  { id: 'ataxia', icon: '🚶', title: 'Ataxia', sub: 'Dog + Cat · Cerebellar vs vestibular vs proprioceptive', flowId: 'ataxia',
    keywords: ['unsteady', 'wobbly', 'stumbling', 'incoordination', 'drunk walk', 'cerebellar', 'proprioceptive', 'spinal ataxia', 'knuckling', 'crossing legs', 'wide-based stance'] },
  { id: 'bleeding', icon: '🔴', title: 'Bleeding / Petechiae / Ecchymoses', sub: 'Dog + Cat · Primary vs secondary haemostasis · DIC · vasculopathy', flowId: 'bleeding',
    keywords: ['bruising', 'bruises', 'petechiae', 'ecchymoses', 'spontaneous bleeding', 'coagulopathy', 'DIC', 'thrombocytopenia', 'low platelets', 'haemorrhage', 'hemorrhage', 'clotting', 'coagulation', 'von Willebrand', 'rodenticide', 'rat poison', 'anticoagulant'] },
  { id: 'blind-eye', icon: '⚫', title: 'Blind Eye / Acute Vision Loss', sub: 'Dog + Cat · Visual pathway localisation · menace · dazzle · PLR · chromatic PLR · ERG', flowId: 'blind-eye',
    keywords: ['blind', 'blindness', 'vision loss', 'can\'t see', 'bumping into things', 'SARDS', 'retinal detachment', 'optic nerve', 'cortical blindness', 'glaucoma', 'sudden blindness', 'menace response', 'dazzle reflex'] },
  { id: 'constipation', icon: '💩', title: 'Constipation / Tenesmus', sub: 'Dog + Cat · Obstructive · pelvic · neuromuscular/metabolic · megacolon', flowId: 'constipation',
    keywords: ['can\'t poo', 'straining to defecate', 'no bowel movement', 'obstipation', 'megacolon', 'pelvic canal', 'perineal hernia', 'hard faeces', 'hard stools', 'tenesmus', 'dystocia', 'rectal'] },
  { id: 'coughing', icon: '🫁', title: 'Coughing', sub: 'Dry vs wet/productive', flowId: 'coughing',
    keywords: ['cough', 'honking', 'goose honk', 'tracheal', 'kennel cough', 'bronchitis', 'productive cough', 'moist cough', 'reverse sneeze', 'airway', 'bronchial', 'pulmonary', 'cardiac cough', 'heart cough'] },
  { id: 'cyanosis', icon: '💙', title: 'Cyanosis', sub: 'Dog + Cat · Central/respiratory vs R→L shunt vs methaemoglobinaemia', flowId: 'cyanosis',
    keywords: ['blue gums', 'blue mucous membranes', 'blue tongue', 'low oxygen', 'hypoxia', 'methaemoglobinaemia', 'methaemoglobin', 'shunt', 'right to left shunt', 'low SpO2', 'desaturation', 'purple gums'] },
  { id: 'diarrhoea', icon: '💦', title: 'Diarrhoea', sub: 'Dog + Cat · Small bowel vs large bowel diagnostic approach', flowId: 'diarrhoea',
    keywords: ['diarrhea', 'loose stool', 'watery stool', 'soft faeces', 'small bowel diarrhoea', 'large bowel diarrhoea', 'haemorrhagic gastroenteritis', 'HGE', 'AHDS', 'colitis', 'bloody diarrhoea', 'mucus in stool', 'frequent defecation'] },
  { id: 'dysphagia', icon: '😮', title: 'Dysphagia / Gagging', sub: 'Dog + Cat · Oral · pharyngeal · oesophageal localisation', flowId: 'dysphagia',
    keywords: ['difficulty swallowing', 'trouble swallowing', 'gagging', 'choking', 'oral pain', 'pharyngeal', 'oesophageal', 'esophageal', 'drooling', 'ptyalism', 'food dropping', 'cricopharyngeal', 'tongue'] },
  { id: 'dyspnoea', icon: '🌬️', title: 'Dyspnoea', sub: 'Dog + Cat · Respiratory pattern → anatomical location', flowId: 'dyspnoea',
    keywords: ['breathing difficulty', 'laboured breathing', 'respiratory distress', 'open mouth breathing', 'panting', 'orthopnoea', 'tachypnoea', 'increased respiratory rate', 'short of breath', 'pleural effusion', 'pulmonary oedema', 'pneumonia', 'pneumothorax', 'chest'] },
  { id: 'epistaxis', icon: '👃', title: 'Epistaxis', sub: 'Dog + Cat · Local (intranasal) vs systemic disease', flowId: 'epistaxis',
    keywords: ['nosebleed', 'nose bleed', 'nasal bleeding', 'nasal discharge blood', 'bloody nose', 'haemorrhage from nose', 'nasal tumour', 'nasal mass', 'aspergillosis', 'nasal foreign body'] },
  { id: 'fever', icon: '🌡️', title: 'Fever / FUO', sub: 'Dog + Cat · True fever vs hyperthermia · infectious / immune / neoplastic', flowId: 'fever',
    keywords: ['high temperature', 'pyrexia', 'FUO', 'fever of unknown origin', 'hyperthermia', 'overheating', 'heat stroke', 'hypothermia', 'low temperature', 'low body temperature', 'cold', 'subnormal temperature', 'temperature abnormality', 'thermoregulation'] },
  { id: 'haematuria', icon: '🩸', title: 'Haematuria', sub: 'Dog + Cat · Upper tract · bladder · urethra · prostate · genital · systemic', flowId: 'haematuria',
    keywords: ['blood in urine', 'bloody urine', 'red urine', 'pink urine', 'UTI', 'urinary tract infection', 'cystitis', 'bladder stones', 'urolithiasis', 'prostatic', 'kidney bleeding', 'haemoglobinuria', 'myoglobinuria'] },
  { id: 'heart-murmur', icon: '🫀', title: 'Heart Murmur', sub: 'Dog + Cat · Grade I–VI · PMI → lesion · acquired vs congenital vs functional', flowId: 'heart-murmur',
    keywords: ['murmur', 'cardiac murmur', 'MVD', 'mitral valve disease', 'DCM', 'dilated cardiomyopathy', 'HCM', 'hypertrophic cardiomyopathy', 'aortic stenosis', 'pulmonic stenosis', 'VSD', 'PDA', 'congenital heart', 'grade 1', 'grade 2', 'grade 3', 'grade 4', 'grade 5', 'grade 6', 'systolic', 'diastolic'] },
  { id: 'jaundice', icon: '🟡', title: 'Jaundice', sub: 'Dog + Cat · Pre-hepatic, hepatic, post-hepatic', flowId: 'jaundice',
    keywords: ['icterus', 'yellow', 'yellow skin', 'yellow gums', 'yellow eyes', 'scleral icterus', 'hyperbilirubinaemia', 'bilirubin', 'liver failure', 'biliary', 'bile duct obstruction', 'haemolytic anaemia', 'IMHA', 'cholestasis'] },
  { id: 'melena', icon: '⬛', title: 'Melena / Haematochezia', sub: 'Dog + Cat · Upper (digested) vs lower (fresh) GI bleeding', flowId: 'melena',
    keywords: ['black stool', 'tarry stool', 'blood in stool', 'GI bleeding', 'gastrointestinal bleeding', 'upper GI bleed', 'lower GI bleed', 'haematochezia', 'hematochezia', 'fresh blood in faeces', 'rectal bleeding', 'ulcer', 'gastric ulcer'] },
  { id: 'oedema', icon: '🫧', title: 'Peripheral Oedema', sub: 'Dog + Cat · Hypoalbuminaemia vs hydrostatic/cardiac vs vasculitis', flowId: 'oedema',
    keywords: ['swelling', 'swollen legs', 'pitting oedema', 'edema', 'fluid retention', 'hypoalbuminaemia', 'low albumin', 'ascites', 'pleural effusion', 'anasarca', 'lymphoedema', 'dependent oedema', 'paw swelling', 'limb swelling'] },
  { id: 'pale-mm', icon: '🫥', title: 'Pale Mucous Membranes', sub: 'Anaemia vs poor perfusion', flowId: 'pale-mm', dxId: 'pale-gums',
    keywords: ['pale gums', 'white gums', 'anaemia', 'anemia', 'poor perfusion', 'hypoperfusion', 'shock', 'low blood pressure', 'hypotension', 'haemorrhage', 'blood loss', 'low PCV', 'low haematocrit', 'IMHA', 'blood transfusion'] },
  { id: 'pollakiuria', icon: '🚽', title: 'Pollakiuria / Stranguria', sub: 'Dog + Cat · Obstruction first → bladder vs urethra vs prostate · LUT', flowId: 'pollakiuria',
    keywords: ['frequent urination', 'straining to urinate', 'can\'t urinate', 'urinary obstruction', 'blocked bladder', 'FLUTD', 'FIC', 'feline idiopathic cystitis', 'urethral obstruction', 'dysuria', 'LUT', 'lower urinary tract', 'bladder pain', 'urinary urgency'] },
  { id: 'polyphagia', icon: '🍖', title: 'Polyphagia', sub: 'Dog + Cat · With weight loss vs weight gain/drug-induced', flowId: 'polyphagia',
    keywords: ['increased appetite', 'always hungry', 'ravenous', 'overeating', 'excessive hunger', 'steroid', 'diabetes', 'hyperadrenocorticism', 'Cushing', 'hyperthyroidism', 'EPI', 'exocrine pancreatic insufficiency', 'malabsorption'] },
  { id: 'pupd', icon: '💧', title: 'Polyuria / Polydipsia', sub: 'Dog + Cat · USG-guided stepwise approach', flowId: 'pupd',
    keywords: ['PU/PD', 'excessive thirst', 'drinking a lot', 'urinating a lot', 'diabetes insipidus', 'diabetes mellitus', 'hyperadrenocorticism', 'Cushing', 'Addison', 'hypoadrenocorticism', 'renal failure', 'CKD', 'pyometra', 'hypercalcaemia', 'liver disease', 'pyelonephritis'] },
  { id: 'red-eye', icon: '👁️', title: 'Red Eye', sub: 'Dog + Cat · Where, what & how — ocular coats vs iris vs intraocular bleed vs orbit', flowId: 'red-eye',
    keywords: ['conjunctivitis', 'uveitis', 'glaucoma', 'scleral injection', 'episcleritis', 'scleritis', 'subconjunctival haemorrhage', 'hyphema', 'hyphaema', 'iritis', 'cherry eye', 'orbital', 'ocular pain', 'squinting', 'blepharospasm'] },
  { id: 'regurgitation', icon: '🔄', title: 'Regurgitation', sub: 'Dog + Cat · Stepwise diagnostic workup',
    keywords: ['passive vomiting', 'oesophageal', 'esophageal', 'megaoesophagus', 'megaesophagus', 'undigested food', 'tubular food', 'vascular ring anomaly', 'myasthenia gravis', 'aspiration pneumonia', 'PRAA', 'oesophagitis'] },
  { id: 'seizures', icon: '🧠', title: 'Seizures', sub: 'Idiopathic vs structural vs reactive', flowId: 'seizures',
    keywords: ['epilepsy', 'fitting', 'fits', 'convulsions', 'tonic clonic', 'grand mal', 'focal seizure', 'partial seizure', 'status epilepticus', 'postictal', 'idiopathic epilepsy', 'reactive seizure', 'toxin', 'hypoglycaemia', 'low glucose', 'electrolyte'] },
  { id: 'sneezing', icon: '🤧', title: 'Sneezing', sub: 'Unilateral vs bilateral', flowId: 'sneezing',
    keywords: ['nasal discharge', 'runny nose', 'nasal', 'rhinitis', 'sinusitis', 'sneezing fits', 'reverse sneeze', 'nasal foreign body', 'aspergillosis', 'crypto', 'cryptosporidiosis', 'nasal tumour', 'cat flu', 'herpesvirus', 'calicivirus', 'discharge'] },
  { id: 'swollen-joints', icon: '🦵', title: 'Swollen Joints', sub: 'Dog + Cat · Arthrocentesis-led · septic vs immune-mediated vs degenerative', flowId: 'swollen-joints',
    keywords: ['joint swelling', 'lameness', 'arthritis', 'polyarthritis', 'septic arthritis', 'IMPA', 'immune-mediated polyarthritis', 'joint pain', 'effusion', 'synovitis', 'hot joint', 'stiff joints', 'reluctant to walk', 'Lyme'] },
  { id: 'syncope', icon: '😵', title: 'Syncope', sub: 'Dog + Cat · Post-triage workup · Cardiogenic vs reflex/non-cardiogenic', flowId: 'syncope',
    keywords: ['fainting', 'collapse', 'passing out', 'loss of consciousness', 'LOC', 'vasovagal', 'cardiogenic syncope', 'arrhythmia', 'bradycardia', 'heart block', 'low blood pressure', 'hypotension', 'episodic collapse', 'exercise intolerance'] },
  { id: 'tremors', icon: '〰️', title: 'Tremors', sub: 'Dog + Cat · Toxic/metabolic vs cerebellar vs idiopathic shaker', flowId: 'tremors',
    keywords: ['shaking', 'shivering', 'trembling', 'myoclonus', 'intention tremor', 'idiopathic shaker syndrome', 'little white shaker', 'cerebellar tremor', 'toxic tremor', 'hypoglycaemia', 'hypocalcaemia', 'eclampsia', 'metronidazole toxicity'] },
  { id: 'vomiting', icon: '🤢', title: 'Vomiting', sub: 'Dog + Cat · True vomit vs regurgitation → primary or secondary GI', flowId: 'vomiting',
    keywords: ['throwing up', 'being sick', 'nausea', 'acute vomiting', 'chronic vomiting', 'projectile vomiting', 'bilious vomiting', 'gastritis', 'pancreatitis', 'foreign body', 'obstruction', 'GI obstruction', 'IBD', 'parvovirus', 'parvo', 'HGE', 'uraemia'] },
  { id: 'weakness', icon: '⚡', title: 'Weakness / Collapse', sub: 'Dog + Cat · Triage hub · Episodic · persistent · collapse ± LOC · cardiogenic vs non-cardiogenic', flowId: 'weakness',
    keywords: ['hypotension', 'low blood pressure', 'collapse', 'exercise intolerance', 'lethargy', 'exercise collapse', 'generalised weakness', 'flaccid', 'hypoglycaemia', 'low glucose', 'Addisonian crisis', 'hypoadrenocorticism', 'cardiogenic shock', 'shock', 'sepsis', 'hypovolaemia', 'hypovolemia', 'anaemia', 'myopathy', 'myasthenia'] },
  { id: 'weight-loss', icon: '📉', title: 'Weight Loss', sub: 'Dog + Cat · Appetite pivot — malassimilation/hypermetabolism vs reduced intake', flowId: 'weight-loss',
    keywords: ['losing weight', 'thin', 'cachexia', 'muscle wasting', 'malabsorption', 'malassimilation', 'EPI', 'exocrine pancreatic insufficiency', 'IBD', 'protein losing enteropathy', 'PLE', 'hyperthyroidism', 'diabetes', 'chronic disease', 'cancer cachexia'] },
  { id: 'wet-eye', icon: '😢', title: 'Wet Eye / Epiphora', sub: 'Dog + Cat · Increased production vs reduced drainage · Jones test · NLS flush', flowId: 'wet-eye',
    keywords: ['epiphora', 'tear overflow', 'watery eye', 'discharge eye', 'ocular discharge', 'nasolacrimal', 'NLS', 'blocked tear duct', 'Jones test', 'KCS', 'dry eye', 'conjunctivitis', 'entropion', 'ectropion', 'distichia', 'corneal ulcer', 'staining'] },
]

/** Signs that have a flowchart (Tab 0 — Localise). */
export const FLOW_SIGNS = SIGNS.filter((s): s is SignEntry & { flowId: string } => !!s.flowId)

/** Derived cards for Tab 1 (Diagnostic approaches). */
export const DX_HOME_CARDS = SIGNS.map(s => ({
  sign: s.dxId ?? s.id,
  icon: s.icon,
  title: s.title,
  sub: s.sub,
}))
