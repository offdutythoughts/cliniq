// ── Clinical-sign registry ─────────────────────────────────────────────────
// Single source of truth for the clinical signs listed on the home / "Localise"
// screen. Each entry maps a sign to its entry FlowPage (`flowId`) in FLOWS.
// `renderLocalise()` in cliniqApp.ts builds the home cards from this array and
// taps route to renderFlowId(flowId), so adding a sign means: add an entry here
// + add its FlowPage to src/lib/signs/flows/. registry.test.ts enforces every
// flowId resolves to a real FLOWS page.

export type SignEntry = {
  /** Stable, kebab-case id for the sign (used for keys/links, not display). */
  id: string
  /** Emoji shown in the card icon slot. */
  icon: string
  /** Card title. */
  title: string
  /** Card subtitle / one-line summary. */
  sub: string
  /** Id of this sign's entry FlowPage in FLOWS; rendered via renderFlowId when
   *  the home card is tapped. Every sign is migrated. */
  flowId: string
}

export const SIGNS: SignEntry[] = [
  { id: 'encephalopathy', icon: '🧬', title: 'Acute Encephalopathy', sub: 'Encephalitis, neoplasia, CVA, metabolic', flowId: 'encephalopathy' },
  { id: 'myelopathy', icon: '🦴', title: 'Acute Myelopathy', sub: 'Spinal cord localisation', flowId: 'myelopathy' },
  { id: 'vestibular', icon: '🌀', title: 'Acute Vestibular', sub: 'Peripheral vs central', flowId: 'vestibular' },
  { id: 'abnormal-pupil', icon: '🔵', title: 'Anisocoria / Abnormal Pupil', sub: 'Dog + Cat · Ophthalmic vs neurological · light/dark room rule · PLR battery', flowId: 'abnormal-pupil' },
  { id: 'ataxia', icon: '🚶', title: 'Ataxia', sub: 'Dog + Cat · Cerebellar vs vestibular vs proprioceptive', flowId: 'ataxia' },
  { id: 'bleeding', icon: '🔴', title: 'Bleeding / Petechiae / Ecchymoses', sub: 'Dog + Cat · Primary vs secondary haemostasis · DIC · vasculopathy', flowId: 'bleeding' },
  { id: 'blind-eye', icon: '⚫', title: 'Blind Eye / Acute Vision Loss', sub: 'Dog + Cat · Visual pathway localisation · menace · dazzle · PLR · chromatic PLR · ERG', flowId: 'blind-eye' },
  { id: 'coughing', icon: '🫁', title: 'Coughing', sub: 'Dry vs wet/productive', flowId: 'coughing' },
  { id: 'diarrhoea', icon: '💩', title: 'Diarrhoea', sub: 'Dog + Cat · Small bowel vs large bowel diagnostic approach', flowId: 'diarrhoea' },
  { id: 'dyspnoea', icon: '🌬️', title: 'Dyspnoea', sub: 'Dog + Cat · Respiratory pattern → anatomical location', flowId: 'dyspnoea' },
  { id: 'epistaxis', icon: '👃', title: 'Epistaxis', sub: 'Dog + Cat · Local (intranasal) vs systemic disease', flowId: 'epistaxis' },
  { id: 'haematuria', icon: '🩸', title: 'Haematuria', sub: 'Dog + Cat · Upper tract · bladder · urethra · prostate · genital · systemic', flowId: 'haematuria' },
  { id: 'jaundice', icon: '🟡', title: 'Jaundice', sub: 'Dog + Cat · Pre-hepatic, hepatic, post-hepatic', flowId: 'jaundice' },
  { id: 'pale-mm', icon: '🩸', title: 'Pale Mucous Membranes', sub: 'Anaemia vs poor perfusion', flowId: 'pale-mm' },
  { id: 'pollakiuria', icon: '🚽', title: 'Pollakiuria / Stranguria', sub: 'Dog + Cat · Obstruction first → bladder vs urethra vs prostate · LUT', flowId: 'pollakiuria' },
  { id: 'pupd', icon: '💧', title: 'Polyuria / Polydipsia', sub: 'Dog + Cat · USG-guided stepwise approach', flowId: 'pupd' },
  { id: 'red-eye', icon: '👁️', title: 'Red Eye', sub: 'Dog + Cat · Where, what & how — ocular coats vs iris vs intraocular bleed vs orbit', flowId: 'red-eye' },
  { id: 'seizures', icon: '🧠', title: 'Seizures', sub: 'Idiopathic vs structural vs reactive', flowId: 'seizures' },
  { id: 'sneezing', icon: '🤧', title: 'Sneezing', sub: 'Unilateral vs bilateral', flowId: 'sneezing' },
  { id: 'vomiting', icon: '🤢', title: 'Vomiting', sub: 'Dog + Cat · True vomit vs regurgitation → primary or secondary GI', flowId: 'vomiting' },
  { id: 'weakness', icon: '⚡', title: 'Weakness / Collapse', sub: 'Dog + Cat · Episodic, persistent, syncope vs seizure', flowId: 'weakness' },
  { id: 'wet-eye', icon: '💧', title: 'Wet Eye / Epiphora', sub: 'Dog + Cat · Increased production vs reduced drainage · Jones test · NLS flush', flowId: 'wet-eye' },
  // Phase 3 — new sign screens (gap-analysis remediation)
  { id: 'syncope', icon: '😵', title: 'Syncope', sub: 'Dog + Cat · Cardiac (arrhythmia/structural) vs reflex vs seizure-mimic', flowId: 'syncope' },
  { id: 'heart-murmur', icon: '🫀', title: 'Heart Murmur', sub: 'Dog + Cat · Grade I–VI · PMI → lesion · acquired vs congenital vs functional', flowId: 'heart-murmur' },
  { id: 'fever', icon: '🌡️', title: 'Fever / FUO', sub: 'Dog + Cat · True fever vs hyperthermia · infectious / immune / neoplastic', flowId: 'fever' },
  { id: 'dysphagia', icon: '😮', title: 'Dysphagia / Gagging', sub: 'Dog + Cat · Oral · pharyngeal · oesophageal localisation', flowId: 'dysphagia' },
  { id: 'melena', icon: '🩸', title: 'Melena / Haematochezia', sub: 'Dog + Cat · Upper (digested) vs lower (fresh) GI bleeding', flowId: 'melena' },
  { id: 'constipation', icon: '💩', title: 'Constipation / Tenesmus', sub: 'Dog + Cat · Obstructive · pelvic · neuromuscular/metabolic · megacolon', flowId: 'constipation' },
  { id: 'oedema', icon: '🫧', title: 'Peripheral Oedema', sub: 'Dog + Cat · Hypoalbuminaemia vs hydrostatic/cardiac vs vasculitis', flowId: 'oedema' },
  { id: 'swollen-joints', icon: '🦵', title: 'Swollen Joints', sub: 'Dog + Cat · Arthrocentesis-led · septic vs immune-mediated vs degenerative', flowId: 'swollen-joints' },
]
