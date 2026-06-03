// ── Clinical-sign registry ─────────────────────────────────────────────────
// Single source of truth for the clinical signs listed on the home / "Localise"
// screen. Each entry maps a sign to the global render function that opens its
// flowchart. `renderLocalise()` in cliniqApp.ts builds the home cards from this
// array, so adding a sign here is the only edit needed to surface it on the home
// screen. The `flow` name must match a function defined AND registered on
// `window` in mountGlobals() — registry.test.ts enforces both.

export type SignEntry = {
  /** Stable, kebab-case id for the sign (used for keys/links, not display). */
  id: string
  /** Emoji shown in the card icon slot. */
  icon: string
  /** Card title. */
  title: string
  /** Card subtitle / one-line summary. */
  sub: string
  /** Name of the global render function invoked when the card is tapped. */
  flow: string
  /** If set, the sign is migrated: render from FLOWS data via renderFlowId
   *  instead of the legacy `flow` function. See DATA_MIGRATION.md. */
  flowId?: string
}

export const SIGNS: SignEntry[] = [
  { id: 'encephalopathy', icon: '🧬', title: 'Acute Encephalopathy', sub: 'Encephalitis, neoplasia, CVA, metabolic', flow: 'renderEncephalopathyFlow' },
  { id: 'myelopathy', icon: '🦴', title: 'Acute Myelopathy', sub: 'Spinal cord localisation', flow: 'renderMyelopathyFlow' },
  { id: 'vestibular', icon: '🌀', title: 'Acute Vestibular', sub: 'Peripheral vs central', flow: 'renderVestibularFlow' },
  { id: 'abnormal-pupil', icon: '🔵', title: 'Anisocoria / Abnormal Pupil', sub: 'Dog + Cat · Ophthalmic vs neurological · light/dark room rule · PLR battery', flow: 'renderAbnormalPupilFlow' },
  { id: 'ataxia', icon: '🚶', title: 'Ataxia', sub: 'Dog + Cat · Cerebellar vs vestibular vs proprioceptive', flow: 'renderAtaxiaFlow' },
  { id: 'bleeding', icon: '🔴', title: 'Bleeding / Petechiae / Ecchymoses', sub: 'Dog + Cat · Primary vs secondary haemostasis · DIC · vasculopathy', flow: 'renderBleedingFlow' },
  { id: 'blind-eye', icon: '⚫', title: 'Blind Eye / Acute Vision Loss', sub: 'Dog + Cat · Visual pathway localisation · menace · dazzle · PLR · chromatic PLR · ERG', flow: 'renderBlindEyeFlow', flowId: 'blind-eye' },
  { id: 'coughing', icon: '🫁', title: 'Coughing', sub: 'Dry vs wet/productive', flow: 'renderCoughFlow' },
  { id: 'diarrhoea', icon: '💩', title: 'Diarrhoea', sub: 'Dog + Cat · Small bowel vs large bowel diagnostic approach', flow: 'renderDiarrhoeaFlow' },
  { id: 'dyspnoea', icon: '🌬️', title: 'Dyspnoea', sub: 'Dog + Cat · Respiratory pattern → anatomical location', flow: 'renderDyspFlow' },
  { id: 'epistaxis', icon: '👃', title: 'Epistaxis', sub: 'Dog + Cat · Local (intranasal) vs systemic disease', flow: 'renderEpistaxisFlow', flowId: 'epistaxis' },
  { id: 'haematuria', icon: '🩸', title: 'Haematuria', sub: 'Dog + Cat · Upper tract · bladder · urethra · prostate · genital · systemic', flow: 'renderHaematuriaFlow' },
  { id: 'jaundice', icon: '🟡', title: 'Jaundice', sub: 'Dog + Cat · Pre-hepatic, hepatic, post-hepatic', flow: 'renderJaundiceFlow' },
  { id: 'pale-mm', icon: '🩸', title: 'Pale Mucous Membranes', sub: 'Anaemia vs poor perfusion', flow: 'renderPaleGumsFlow' },
  { id: 'pupd', icon: '💧', title: 'Polyuria / Polydipsia', sub: 'Dog + Cat · USG-guided stepwise approach', flow: 'renderPUPDFlow' },
  { id: 'red-eye', icon: '👁️', title: 'Red Eye', sub: 'Dog + Cat · Where, what & how — ocular coats vs iris vs intraocular bleed vs orbit', flow: 'renderRedEyeFlow', flowId: 'red-eye' },
  { id: 'seizures', icon: '🧠', title: 'Seizures', sub: 'Idiopathic vs structural vs reactive', flow: 'renderSeizureFlow' },
  { id: 'sneezing', icon: '🤧', title: 'Sneezing', sub: 'Unilateral vs bilateral', flow: 'renderSneezeFlow' },
  { id: 'vomiting', icon: '🤢', title: 'Vomiting', sub: 'Dog + Cat · True vomit vs regurgitation → primary or secondary GI', flow: 'renderVomFlow' },
  { id: 'weakness', icon: '⚡', title: 'Weakness / Collapse', sub: 'Dog + Cat · Episodic, persistent, syncope vs seizure', flow: 'renderWeaknessFlow' },
  { id: 'wet-eye', icon: '💧', title: 'Wet Eye / Epiphora', sub: 'Dog + Cat · Increased production vs reduced drainage · Jones test · NLS flush', flow: 'renderWetEyeFlow', flowId: 'wet-eye' },
]
