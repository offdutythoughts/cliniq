// ── Shared episodic-collapse triage table ───────────────────────────────────
// NOT a FlowPage module: this file exports ONE `table` block, imported by the
// three flows that all have to answer the same question — "which episodic
// disorder is this?" — so the answer is authored once and cannot drift between
// them:
//   • weakness-collapse  (Collapse / LOC triage — the owner of the split)
//   • seizures           (rule out the mimics before working up epilepsy)
//   • syncope            (confirm it is syncope before an ECG/echo workup)
//
// Seven columns is deliberately wider than the flow column, so the block sets
// `scroll` + `minWidth` and slides sideways as one unit rather than crushing
// the cells (the same spill policy the wide category rows use).
//
// Sources: Ettinger 9th edn Table 45.1 (seizures vs other episodic disorders,
// Ch 45), Ch 40 (syncope vs seizure features), Ch 41 (paroxysmal dyskinesias),
// Ch 244 (narcolepsy/cataplexy, REM sleep behaviour disorder).
import type { TableBlock, TableCell, Tone } from '../flowTypes'

/** Column tones, in column order. Reused so a reader who learns the colour on
 *  one page reads the same colour for the same disorder on the other two. */
const SYNCOPE: Tone = 'danger'
const SEIZURE: Tone = 'orange'
const VESTIB: Tone = 'teal'
const DYSK: Tone = 'violet'
const NARCO: Tone = 'warning'
const RBD: Tone = 'info'
const NMJ: Tone = 'lime'
const COLUMN_TONES = [SYNCOPE, SEIZURE, VESTIB, DYSK, NARCO, RBD, NMJ]

/** Build one data row: the feature label, then one cell per disorder, each
 *  toned to its column. */
const row = (feature: string, cells: [string, string, string, string, string, string, string]): TableCell[] =>
  [{ text: feature, tone: 'slate' as Tone }, ...cells.map((text, i) => ({ text, tone: COLUMN_TONES[i] }))]

export const episodicTriageTable: TableBlock = {
  kind: 'table',
  gap: 12,
  scroll: true,
  stickyFirstCol: true,
  // Feature column + 7 disorder columns. 112 + 7×132 + 8×6 gaps ≈ 1084.
  cols: '112px repeat(7, 132px)',
  minWidth: 1084,
  dividers: true,
  headers: [
    'Feature',
    { text: 'Syncope', tone: SYNCOPE },
    { text: 'Seizure', tone: SEIZURE },
    { text: 'Vestibular episode', tone: VESTIB },
    { text: 'Dyskinesia / PMD', tone: DYSK },
    { text: 'Narcolepsy / cataplexy', tone: NARCO },
    { text: 'REM sleep disorder', tone: RBD },
    { text: 'Neuromuscular collapse', tone: NMJ },
  ],
  rows: [
    row('Consciousness', [
      'Lost — brief and complete',
      'Impaired or lost • always lost if generalised',
      'Preserved throughout',
      'Preserved — the single best discriminator',
      'Asleep (narcolepsy) • retained in pure cataplexy',
      'Asleep — the episode only happens asleep',
      'Preserved — patient tries to keep going',
    ]),
    row('Tone during', [
      'Flaccid, limp • may flail or arch if prolonged',
      'Increased — tonic-clonic • or atonic / myoclonic',
      'Normal • leaning, falling or rolling to one side',
      'Increased — sustained dystonia, no rhythmic clonus',
      'Sudden loss of tone (cataplexy) • normal in a sleep attack',
      'Violent limb and facial movement • air chewing • vocalising',
      'Progressive weakness → collapses into sternal',
    ]),
    row('Trigger', [
      'Exercise • excitement • cough, micturition, vomiting (situational)',
      'Often at rest or out of sleep • prodrome hours–days before',
      'None — abrupt onset, often geriatric',
      'Sudden movement (PKD) • stress or excitement (PNKD) • prolonged exercise (PED)',
      'Food • play • excitement',
      'Sleep only',
      'Strenuous, excited exercise — collapses during it or just after (EIC)',
    ]),
    row('Duration', [
      'Seconds — under 1 min',
      'Usually under 2 min of ictus',
      'Seconds to hours',
      'Seconds to hours • minutes typical',
      'Up to 20 min of cataplexy',
      'Seconds to minutes',
      'Minutes — ataxia and pelvic-limb weakness, then down',
    ]),
    row('Recovery / post-episode', [
      'Normal immediately',
      'Post-ictal — confusion, blindness, ataxia, hunger • minutes to days',
      'Deficits PERSIST between episodes — head tilt, nystagmus, ataxia',
      'Abrupt stop, normal at once • no post-ictal phase',
      'Normal immediately',
      'Normal the moment it wakes',
      'Normal with rest inside 30 min — a severe episode can kill',
    ]),
    row('Autonomic signs', [
      'None • may have abnormal heart rate ± urination',
      'Often present — hypersalivation, urination, defaecation',
      'Nausea, drooling, vomiting from the vestibular upset',
      'ABSENT — no salivation, no incontinence',
      'Absent',
      'Absent',
      'Absent',
    ]),
    row('Rousable / interruptible', [
      'No — but unconscious only seconds',
      'No — cannot be interrupted',
      'Conscious throughout',
      'No — owner cannot interrupt (mild head tremor may distract)',
      'YES — rouses to touch or a loud noise',
      'YES — wakes quickly and completely',
      'Conscious throughout',
    ]),
    row('Response to AEDs', [
      'May WORSEN — a missed arrhythmia kills',
      'Help',
      'No effect',
      'Usually no benefit • clonazepam, acetazolamide or a gluten-free diet by breed',
      'No effect — tricyclics (imipramine, clomipramine) instead',
      'No effect — KBr 44 mg/kg PO q24h helps 78% of dogs',
      'No effect — avoid the trigger',
    ]),
    row('Signalment clue', [
      'Any dog with structural heart disease • Boxer (vasovagal)',
      'Idiopathic 6 mo–6 yr • over 6–7 yr favours structural • cats: 2/3 structural',
      'Otitis at any age • idiopathic in the geriatric dog and cat',
      'Cavalier KCS (BCAN) • Scottish Terrier • Border Terrier (gluten) • Chinook • Wheaten • Norwich • Maltese',
      'Dobermann • Labrador • Dachshund (HCRTR2) • onset from 4 weeks',
      'Any breed • sequel to tetanus • Nova Scotia Duck Tolling Retriever',
      'Labrador — EIC, DNM1 Arg256Leu, first episode under 2 yr • Border Collie • myasthenia gravis at any age',
    ]),
    row('First test', [
      'ECG now, then Holter and echo — a normal resting ECG does NOT exclude it',
      'Glucose, electrolytes, bile acids first → then MRI + CSF',
      'Otoscopy and bulla imaging → MRI if central signs',
      'Owner video • breed DNA test • gluten-free trial in the Border Terrier',
      'Food-elicited cataplexy test • physostigmine 0.025–0.1 mg/kg IV',
      'Owner video taken during sleep',
      'DNM1 genetic test (commercially available) • CK • ACh-receptor antibody if regurgitating',
    ]),
  ],
  footnote: 'Swipe the table sideways for the remaining columns. Ettinger 9th edn Table 45.1 (Ch 45); syncope features Ch 40; paroxysmal dyskinesias Ch 41; sleep disorders Ch 244.',
}
