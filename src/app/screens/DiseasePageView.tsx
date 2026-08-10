'use client'
// Disease page — the banner/protocol/citation shell around the shared clinical
// section stack. Everything from Etiology down to the clinical-pearls box lives
// in diseaseSections.tsx and is rendered identically here and on a lesion
// sub-type leaf; this file owns only what is specific to a disease page:
// the species toggle, the zoonotic/emergency banners, linked protocols, and
// AMA-numbered references.

import { DB } from '../../data/db'
import type { DiseaseRow } from '../../data/db'
import { SPECIES_PAIRS } from '../../data/speciesPairs'
import { scopeToSpecies, speciesMode, speciesOf, type Species } from '../../lib/species'
import { useNav } from '../nav/NavContext'
import { rememberSpecies, resolveSpecies } from '../nav/speciesPref'
import { styleStringToObject as s } from './style'
import { SpeciesNote, SpeciesToggle, pageForSpecies } from './SpeciesToggle'
import { SpTag, ZOO_TITLE, ZOO_WORDS } from './tags'
import { Bul, Linkify, str } from './markup'
import { ProtocolCards, protocolsForDisease } from './protocolCards'
import { ClinicalBody, ClinicalSections } from './diseaseSections'
import { buildDiseaseCitations, CitationContext, type RefEntry } from './diseaseReferences'
import { NotFound } from './NotFound'
import { TAG_ROW, PAGE_TITLE, FIELD_LABEL } from './styles'

const TOP_ALERT = s('background:rgba(var(--tone-danger),0.18);border:1.5px solid rgba(var(--tone-danger),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-fg);letter-spacing:.01em;')
// Amber, not red — an infection-control instruction, deliberately distinct from
// the red emergency banner it sits above.
const ZOO_ALERT = s('background:var(--hi-bg);border:1.5px solid rgba(var(--amber-rgb),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--amber-text);letter-spacing:.01em;')
const SIG_VALUE = s('font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);margin-bottom:8px;')
const EM_ALERT_HEAD = s('font-weight:700;margin-bottom:6px;')
const REFERENCES = s('margin-top:18px;padding-top:12px;border-top:1px solid var(--border);color:var(--gray2);font-size:var(--fs-label);line-height:1.55;')
const REFERENCES_TITLE = s('font-size:var(--fs-label);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;')
const REFERENCE_ITEM = s('margin-left:18px;padding-left:2px;margin-bottom:4px;')

const pip = (v: unknown): boolean => typeof v === 'string' && v.includes('|')

function isEmergencyDisease(disease: DiseaseRow, topAlert: string): boolean {
  return /\bemergency\b/i.test(topAlert)
    || DB.lesion_type.some(lesion => lesion.dis === disease.id && lesion.urg.toUpperCase() === 'EMERGENCY')
}

function stripAlertPrefix(text: string): string {
  return text
    .replace(/^[⚠🚨]\uFE0F?\s*/u, '')
    // "." belongs in the separator class: DIS-CARD-ATE authors the prefix as
    // "⚠ Emergency. Five Ps…", which otherwise rendered as "🚨 Emergency: . Five Ps…".
    .replace(/^EMERGENCY\s*[:—.-]?\s*/i, '')
}

/** Pages citing more than this many sources collapse the footnote behind a toggle. */
const REF_COLLAPSE_THRESHOLD = 4

function References({ entries }: { entries: RefEntry[] }) {
  if (entries.length === 0) return null
  const list = (
    <ol>
      {entries.map(entry => <li key={entry.id} id={`ref-${entry.n}`} style={REFERENCE_ITEM}>{entry.text}</li>)}
    </ol>
  )
  if (entries.length > REF_COLLAPSE_THRESHOLD) {
    return (
      <details className="ref-fold" style={REFERENCES}>
        <summary style={REFERENCES_TITLE}>References ({entries.length})</summary>
        {list}
      </details>
    )
  }
  return (
    <section aria-label="References" style={REFERENCES}>
      <div style={REFERENCES_TITLE}>References</div>
      {list}
    </section>
  )
}

export function DiseasePageView({ id, sp }: { id: string; sp?: Species }) {
  const nav = useNav()
  const d = DB.disease_page.find(x => x.id === id)
  if (!d) return <NotFound what="Disease page" />

  const mode = speciesMode(d)
  const ownCovered = speciesOf(d.sp)
  const sibling = SPECIES_PAIRS[id]
  const siblingCovered = sibling ? speciesOf(DB.disease_page.find(x => x.id === sibling)?.sp) : []
  // A toggle appears only where picking changes what you read: the content
  // genuinely differs per species, or a sibling page covers the other species.
  const covered = [...new Set([...ownCovered, ...siblingCovered])]
  const showToggle = mode === 'split' || !!sibling
  const species = resolveSpecies(sp, d.sp)

  function pickSpecies(next: Species): void {
    rememberSpecies(next)
    const target = pageForSpecies(id, next, ownCovered)
    // Same page → replace, so the species choice doesn't stack up back-entries
    // between two halves of one page. A sibling page is a real navigation.
    if (target === id) nav.replace({ kind: 'disease', id, sp: next })
    else nav.navigate({ kind: 'disease', id: target, sp: next })
  }

  // Filter every field to the chosen species BEFORE anything else reads them,
  // so grouping, the bare-header guardrail and citation numbering all see
  // exactly the text on screen — reference [3] stays the third visible source.
  const f = (v: unknown): string => (mode === 'split' ? scopeToSpecies(str(v), species) : str(v))

  const breed = f(d.breed)
  const age = f(d.age)
  const topAlert = f(d.topAlert)
  const emergency = isEmergencyDisease(d, topAlert)
  // Most zoonoses author their own "ZOONOTIC — …" top alert. Where they do, that
  // wording moves into the amber banner rather than being repeated under it; the
  // red banner is then left to say only what is an emergency.
  const zooOwnsAlert = d.zoo === true && ZOO_WORDS.test(topAlert)
  const redAlert = zooOwnsAlert ? '' : topAlert
  const protocols = protocolsForDisease(d)

  // AMA numbering — collect citations in the order the fields render below.
  const { numberOf, entries } = buildDiseaseCitations([
    topAlert, f(d.severe), f(d.etiology),
    breed, age, f(d.sex), f(d.risk),
    f(d.path), f(d.signs), f(d.conf), f(d.supp),
    f(d.tx1), f(d.tx2), f(d.outpatient),
    f(d.monitor), f(d.prog), f(d.ddx), f(d.pearl),
  ])

  // Signalment is the one card a disease page composes itself: three labelled
  // sub-fields rather than a single run of prose. Built here and handed to the
  // shared stack so it keeps its slot in the section order.
  const sex = f(d.sex)
  const signalment = (breed || age || sex) ? (
    <>
      {breed && <>
        <div style={FIELD_LABEL}>Breed</div>
        <div style={SIG_VALUE}>{pip(breed) ? <Bul text={breed} /> : <Linkify text={breed} />}</div>
      </>}
      {age && <>
        <div style={FIELD_LABEL}>Age</div>
        <div style={SIG_VALUE}>{pip(age) ? <Bul text={age} /> : <Linkify text={age} />}</div>
      </>}
      {sex && <>
        <div style={FIELD_LABEL}>Sex</div>
        <ClinicalBody text={sex} />
      </>}
    </>
  ) : undefined

  return (
    <CitationContext.Provider value={numberOf}>
      <div style={PAGE_TITLE}>{d.name}</div>
      {showToggle ? (
        <>
          <SpeciesToggle current={species} covered={covered} onSelect={pickSpecies} />
          <SpeciesNote
            id={id}
            sp={species}
            pageSp={str(d.sp)}
            covered={covered}
            mode={mode}
          />
        </>
      ) : (
        <div style={TAG_ROW}><SpTag sp={d.sp} /></div>
      )}

      {/* ⚠️ means one thing only: this patient can infect people or other
          patients. It sits above the emergency banner because PPE and isolation
          are decided before anyone touches the animal. */}
      {d.zoo === true && (
        <div style={ZOO_ALERT}>⚠️ {zooOwnsAlert ? <Linkify text={stripAlertPrefix(topAlert)} /> : `${ZOO_TITLE}.`}</div>
      )}
      {redAlert && <div style={TOP_ALERT}>{emergency && '🚨 Emergency: '}<Linkify text={stripAlertPrefix(redAlert)} /></div>}
      {emergency && !redAlert && <div style={TOP_ALERT}>🚨 Emergency — initiate stabilisation before the full diagnostic workup.</div>}
      {f(d.severe) && (
        <div className="em-alert">
          {pip(f(d.severe))
            ? <><div style={EM_ALERT_HEAD}>Severe / life-threatening</div><Bul text={f(d.severe)} /></>
            : <Linkify text={f(d.severe)} />}
        </div>
      )}

      <ProtocolCards protocols={protocols} emergency={emergency} />

      <ClinicalSections content={{
        etiology: f(d.etiology),
        signalment,
        risk: f(d.risk),
        path: f(d.path),
        signs: f(d.signs),
        showGradingTable: d.showGradingTable === true,
        conf: f(d.conf),
        supp: f(d.supp),
        tx1: f(d.tx1),
        tx2: f(d.tx2),
        outpatient: f(d.outpatient),
        monitor: f(d.monitor),
        prog: f(d.prog),
        ddx: f(d.ddx),
        pearl: f(d.pearl),
      }} />

      <References entries={entries} />
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </CitationContext.Provider>
  )
}
