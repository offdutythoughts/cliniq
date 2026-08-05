'use client'
// Disease page — React port of renderDiseasePage (cliniqApp.ts). Same card
// stack, same inline styles, same conditional sections. Pipe fields render via
// the shared <Bul> (with @-link navigation); plain fields via <Txt>.

import { DB } from '../../data/db'
import type { DiseaseRow, ProtocolRow } from '../../data/db'
import { SPECIES_PAIRS } from '../../data/speciesPairs'
import { scopeToSpecies, speciesMode, speciesOf, type Species } from '../../lib/species'
import { useNav } from '../nav/NavContext'
import { rememberSpecies, resolveSpecies } from '../nav/speciesPref'
import { styleStringToObject as s } from './style'
import { SpeciesNote, SpeciesToggle, pageForSpecies } from './SpeciesToggle'
import { SpTag, ZOO_TITLE, ZOO_WORDS } from './tags'
import { Bul, Card, Linkify, NavCard, str } from './markup'
import { splitPearl } from './pearlSplit'
import { toGroupedMarkup, type GroupKind } from './clinicalGrouping'
import { buildDiseaseCitations, CitationContext, type RefEntry } from './diseaseReferences'
import { InjuryGradingTable } from './InjuryGradingTable'
import { PhenylephrineLocaliseTable } from './PhenylephrineLocaliseTable'
import { IrisCkdStagingTable } from './IrisCkdStagingTable'
import { IrisAkiGradingTable } from './IrisAkiGradingTable'
import { NotFound } from './NotFound'
import { TAG_ROW, BODY_TEXT, PAGE_TITLE, FIELD_LABEL, SUB_LABEL } from './styles'

const TOP_ALERT = s('background:rgba(var(--tone-danger),0.18);border:1.5px solid rgba(var(--tone-danger),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-fg);letter-spacing:.01em;')
// Amber, not red — an infection-control instruction, deliberately distinct from
// the red emergency banner it sits above.
const ZOO_ALERT = s('background:var(--hi-bg);border:1.5px solid rgba(var(--amber-rgb),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--amber-text);letter-spacing:.01em;')
const SIG_VALUE = s('font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);margin-bottom:8px;')
const EM_ALERT_HEAD = s('font-weight:700;margin-bottom:6px;')

const PEARL_LABEL = s('font-weight:700;margin-bottom:6px;')
const PEARL_ITEM = s('display:flex;align-items:baseline;gap:6px;margin-bottom:4px;')
const PEARL_DOT = s('flex-shrink:0;opacity:.7;')
const REFERENCES = s('margin-top:18px;padding-top:12px;border-top:1px solid var(--border);color:var(--gray2);font-size:var(--fs-label);line-height:1.55;')
const REFERENCES_TITLE = s('font-size:var(--fs-label);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;')
const REFERENCE_ITEM = s('margin-left:18px;padding-left:2px;margin-bottom:4px;')

const pip = (v: unknown): boolean => typeof v === 'string' && v.includes('|')
function Txt({ text }: { text: string }) {
  return <div style={BODY_TEXT}><Linkify text={text} /></div>
}
/** Clinical pearls box. Splits into bullets (per splitPearl — explicit `|`
 *  wins, else sentence boundaries), keeping the amber pearl colour via inherit.
 *  A single-sentence pearl stays an inline paragraph. */
function Pearl({ text }: { text: string }) {
  const items = splitPearl(text)
  if (items.length <= 1) return <div className="pearl">💡 Clinical pearls: <Linkify text={items[0] ?? ''} /></div>
  return (
    <div className="pearl">
      <div style={PEARL_LABEL}>💡 Clinical pearls</div>
      {items.map((t, i) => (
        <div key={i} style={PEARL_ITEM}><span style={PEARL_DOT}>•</span><Linkify text={t} /></div>
      ))}
    </div>
  )
}
/** pip → <Bul>, else <Txt> (the `pip(x)?bul:txt` cards).
 *
 *  Pass `group` to categorise the field first (signs by body system, supportive
 *  diagnostics by test modality). The grouper hands back pipe-markup with
 *  `#Header` sections, so grouped and hand-authored fields render identically —
 *  and returns null whenever the field is already authored with headers or the
 *  classification isn't confident, leaving the flat rendering untouched. */
function Body({ text, group }: { text: string; group?: GroupKind }) {
  const grouped = group ? toGroupedMarkup(text, group) : null
  if (grouped) return <Bul text={grouped} />
  return pip(text) ? <Bul text={text} /> : <Txt text={text} />
}

/** Markers in a `conf` field where a rich table is spliced in — content that
 *  can't be expressed in pipe-markup. Each disease uses at most one marker. */
const CONF_TABLES: { mark: string; Comp: () => React.ReactNode }[] = [
  { mark: '{{PHEN_LOCALISE_TABLE}}', Comp: PhenylephrineLocaliseTable },
  { mark: '{{IRIS_CKD_TABLE}}', Comp: IrisCkdStagingTable },
  { mark: '{{IRIS_AKI_TABLE}}', Comp: IrisAkiGradingTable },
]
/** Diagnostic-Investigation body: renders `conf`, replacing a table marker with
 *  its component in place. Falls back to plain <Body> when no marker present. */
function ConfBody({ text }: { text: string }) {
  const hit = CONF_TABLES.find(t => text.includes(t.mark))
  if (!hit) return <Body text={text} />
  const [before, after] = text.split(hit.mark)
  const Comp = hit.Comp
  return (
    <>
      {before.replace(/\|\s*$/, '').trim() && <Body text={before.replace(/\|\s*$/, '')} />}
      <Comp />
      {after.replace(/^\s*\|/, '').trim() && <Body text={after.replace(/^\s*\|/, '')} />}
    </>
  )
}

function diseaseProtocols(disease: DiseaseRow): ProtocolRow[] {
  const ids = new Set<string>()
  for (const lesion of DB.lesion_type) {
    if (lesion.dis === disease.id && typeof lesion.proto === 'string' && lesion.proto) ids.add(lesion.proto)
  }
  for (const value of Object.values(disease)) {
    if (typeof value !== 'string') continue
    for (const match of value.matchAll(/@(PROT-[A-Z0-9-]+)/g)) ids.add(match[1])
  }
  return DB.protocols.filter(protocol => ids.has(protocol.id))
}

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
  const protocols = diseaseProtocols(d)

  // AMA numbering — collect citations in the order the fields render below.
  const { numberOf, entries } = buildDiseaseCitations([
    topAlert, f(d.severe), f(d.etiology),
    breed, age, f(d.sex), f(d.risk),
    f(d.path), f(d.signs), f(d.conf), f(d.supp),
    f(d.tx1), f(d.tx2), f(d.outpatient),
    f(d.monitor), f(d.prog), f(d.ddx), f(d.pearl),
  ])

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

      {protocols.map(protocol => (
        <NavCard
          key={protocol.id}
          title={`${emergency ? '🚨 Emergency' : '⚡'} protocol: ${protocol.name}`}
          sub="Open step-by-step protocol"
          onClick={() => nav.navigate({ kind: 'protocol', id: protocol.id })}
          style={{ marginBottom: 14 }}
        />
      ))}

      {f(d.etiology) && <Card title="Etiology"><Bul text={f(d.etiology)} /></Card>}

      <Card title="Signalment">
        <div style={FIELD_LABEL}>Breed</div>
        <div style={SIG_VALUE}>{pip(breed) ? <Bul text={breed} /> : <Linkify text={breed} />}</div>
        <div style={FIELD_LABEL}>Age</div>
        <div style={SIG_VALUE}>{pip(age) ? <Bul text={age} /> : <Linkify text={age} />}</div>
        {f(d.sex) && (
          <>
            <div style={FIELD_LABEL}>Sex</div>
            <div style={BODY_TEXT}><Linkify text={f(d.sex)} /></div>
          </>
        )}
      </Card>

      {f(d.risk) && <Card title="Risk Factors"><Bul text={f(d.risk)} /></Card>}

      <Card title="Pathophysiology"><Body text={f(d.path)} /></Card>

      <Card title="Clinical Signs">
        <Body text={f(d.signs)} group="signs" />
        {d.showGradingTable === true && <InjuryGradingTable />}
      </Card>

      <Card title="Diagnostic Investigation">
        <ConfBody text={f(d.conf)} />
        {f(d.supp) && (
          <>
            <div style={SUB_LABEL}>Supportive Diagnostics</div>
            <Body text={f(d.supp)} group="diagnostics" />
          </>
        )}
      </Card>

      <Card title="Treatment">
        <div style={FIELD_LABEL}>First-line</div>
        <Body text={f(d.tx1)} />
        {f(d.tx2) && (
          <>
            <div style={SUB_LABEL}>Second-line / Alternatives</div>
            <Body text={f(d.tx2)} />
          </>
        )}
      </Card>

      {f(d.outpatient) && <Card title="Outpatient Protocol"><Body text={f(d.outpatient)} /></Card>}

      <Card title="Monitoring"><Body text={f(d.monitor)} /></Card>
      <Card title="Prognosis"><Body text={f(d.prog)} /></Card>

      {f(d.ddx) && <Card title="Differential Diagnosis"><Bul text={f(d.ddx)} /></Card>}

      <Pearl text={f(d.pearl)} />
      <References entries={entries} />
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </CitationContext.Provider>
  )
}
