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
}

export const SIGNS: SignEntry[] = [
  { id: 'encephalopathy', icon: '🧬', title: 'Acute Encephalopathy', sub: 'Encephalitis, neoplasia, CVA, metabolic', flowId: 'encephalopathy' },
  { id: 'myelopathy', icon: '🦴', title: 'Acute Myelopathy', sub: 'Spinal cord localisation', flowId: 'myelopathy' },
  { id: 'vestibular', icon: '🌀', title: 'Acute Vestibular', sub: 'Peripheral vs central', flowId: 'vestibular' },
  { id: 'abnormal-pupil', icon: '🔵', title: 'Anisocoria / Abnormal Pupil', sub: 'Dog + Cat · Ophthalmic vs neurological · light/dark room rule · PLR battery', flowId: 'abnormal-pupil' },
  { id: 'anorexia', icon: '🍽️', title: 'Anorexia / Hyporexia', sub: 'Dog + Cat · Pseudo- vs true · cat = lipidosis emergency', flowId: 'anorexia' },
  { id: 'ataxia', icon: '🚶', title: 'Ataxia', sub: 'Dog + Cat · Cerebellar vs vestibular vs proprioceptive', flowId: 'ataxia' },
  { id: 'bleeding', icon: '🔴', title: 'Bleeding / Petechiae / Ecchymoses', sub: 'Dog + Cat · Primary vs secondary haemostasis · DIC · vasculopathy', flowId: 'bleeding' },
  { id: 'blind-eye', icon: '⚫', title: 'Blind Eye / Acute Vision Loss', sub: 'Dog + Cat · Visual pathway localisation · menace · dazzle · PLR · chromatic PLR · ERG', flowId: 'blind-eye' },
  { id: 'constipation', icon: '💩', title: 'Constipation / Tenesmus', sub: 'Dog + Cat · Obstructive · pelvic · neuromuscular/metabolic · megacolon', flowId: 'constipation' },
  { id: 'coughing', icon: '🫁', title: 'Coughing', sub: 'Dry vs wet/productive', flowId: 'coughing' },
  { id: 'cyanosis', icon: '💙', title: 'Cyanosis', sub: 'Dog + Cat · Central/respiratory vs R→L shunt vs methaemoglobinaemia', flowId: 'cyanosis' },
  { id: 'diarrhoea', icon: '💦', title: 'Diarrhoea', sub: 'Dog + Cat · Small bowel vs large bowel diagnostic approach', flowId: 'diarrhoea' },
  { id: 'dysphagia', icon: '😮', title: 'Dysphagia / Gagging', sub: 'Dog + Cat · Oral · pharyngeal · oesophageal localisation', flowId: 'dysphagia' },
  { id: 'dyspnoea', icon: '🌬️', title: 'Dyspnoea', sub: 'Dog + Cat · Respiratory pattern → anatomical location', flowId: 'dyspnoea' },
  { id: 'epistaxis', icon: '👃', title: 'Epistaxis', sub: 'Dog + Cat · Local (intranasal) vs systemic disease', flowId: 'epistaxis' },
  { id: 'fever', icon: '🌡️', title: 'Fever / FUO', sub: 'Dog + Cat · True fever vs hyperthermia · infectious / immune / neoplastic', flowId: 'fever' },
  { id: 'haematuria', icon: '🩸', title: 'Haematuria', sub: 'Dog + Cat · Upper tract · bladder · urethra · prostate · genital · systemic', flowId: 'haematuria' },
  { id: 'heart-murmur', icon: '🫀', title: 'Heart Murmur', sub: 'Dog + Cat · Grade I–VI · PMI → lesion · acquired vs congenital vs functional', flowId: 'heart-murmur' },
  { id: 'hypotension', icon: '🩺', title: 'Hypotension', sub: "Dog + Cat · Shock · sepsis · Addison's · envenomation · spinal" },
  { id: 'hypothermia', icon: '🥶', title: 'Hypothermia', sub: 'Dog + Cat · Myxoedema · neonates · ATE · sepsis · toxins' },
  { id: 'jaundice', icon: '🟡', title: 'Jaundice', sub: 'Dog + Cat · Pre-hepatic, hepatic, post-hepatic', flowId: 'jaundice' },
  { id: 'melena', icon: '⬛', title: 'Melena / Haematochezia', sub: 'Dog + Cat · Upper (digested) vs lower (fresh) GI bleeding', flowId: 'melena' },
  { id: 'oedema', icon: '🫧', title: 'Peripheral Oedema', sub: 'Dog + Cat · Hypoalbuminaemia vs hydrostatic/cardiac vs vasculitis', flowId: 'oedema' },
  { id: 'pale-mm', icon: '🫥', title: 'Pale Mucous Membranes', sub: 'Anaemia vs poor perfusion', flowId: 'pale-mm', dxId: 'pale-gums' },
  { id: 'pollakiuria', icon: '🚽', title: 'Pollakiuria / Stranguria', sub: 'Dog + Cat · Obstruction first → bladder vs urethra vs prostate · LUT', flowId: 'pollakiuria' },
  { id: 'polyphagia', icon: '🍖', title: 'Polyphagia', sub: 'Dog + Cat · With weight loss vs weight gain/drug-induced', flowId: 'polyphagia' },
  { id: 'pupd', icon: '💧', title: 'Polyuria / Polydipsia', sub: 'Dog + Cat · USG-guided stepwise approach', flowId: 'pupd' },
  { id: 'red-eye', icon: '👁️', title: 'Red Eye', sub: 'Dog + Cat · Where, what & how — ocular coats vs iris vs intraocular bleed vs orbit', flowId: 'red-eye' },
  { id: 'regurgitation', icon: '🔄', title: 'Regurgitation', sub: 'Dog + Cat · Stepwise diagnostic workup' },
  { id: 'seizures', icon: '🧠', title: 'Seizures', sub: 'Idiopathic vs structural vs reactive', flowId: 'seizures' },
  { id: 'sneezing', icon: '🤧', title: 'Sneezing', sub: 'Unilateral vs bilateral', flowId: 'sneezing' },
  { id: 'swollen-joints', icon: '🦵', title: 'Swollen Joints', sub: 'Dog + Cat · Arthrocentesis-led · septic vs immune-mediated vs degenerative', flowId: 'swollen-joints' },
  { id: 'syncope', icon: '😵', title: 'Syncope', sub: 'Dog + Cat · Post-triage workup · Cardiogenic vs reflex/non-cardiogenic', flowId: 'syncope' },
  { id: 'tremors', icon: '〰️', title: 'Tremors', sub: 'Dog + Cat · Toxic/metabolic vs cerebellar vs idiopathic shaker', flowId: 'tremors' },
  { id: 'vomiting', icon: '🤢', title: 'Vomiting', sub: 'Dog + Cat · True vomit vs regurgitation → primary or secondary GI', flowId: 'vomiting' },
  { id: 'weakness', icon: '⚡', title: 'Weakness / Collapse', sub: 'Dog + Cat · Triage hub · Episodic · persistent · collapse ± LOC · cardiogenic vs non-cardiogenic', flowId: 'weakness' },
  { id: 'weight-loss', icon: '📉', title: 'Weight Loss', sub: 'Dog + Cat · Appetite pivot — malassimilation/hypermetabolism vs reduced intake', flowId: 'weight-loss' },
  { id: 'wet-eye', icon: '😢', title: 'Wet Eye / Epiphora', sub: 'Dog + Cat · Increased production vs reduced drainage · Jones test · NLS flush', flowId: 'wet-eye' },
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
