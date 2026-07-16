'use client'
// Disease page — React port of renderDiseasePage (cliniqApp.ts). Same card
// stack, same inline styles, same conditional sections. Pipe fields render via
// the shared <Bul> (with @-link navigation); plain fields via <Txt>.

import { DB } from '../../data/db'
import type { DiseaseRow, ProtocolRow } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { SpTag } from './tags'
import { Bul, Card, Linkify, NavCard, str } from './markup'
import { splitPearl } from './pearlSplit'
import { formatHarvardCitations, referencesForDisease } from './diseaseReferences'
import { InjuryGradingTable } from './InjuryGradingTable'
import { PhenylephrineLocaliseTable } from './PhenylephrineLocaliseTable'
import { IrisCkdStagingTable } from './IrisCkdStagingTable'
import { IrisAkiGradingTable } from './IrisAkiGradingTable'
import { NotFound } from './NotFound'
import { TAG_ROW, BODY_TEXT, PAGE_TITLE, FIELD_LABEL, SUB_LABEL } from './styles'

const TOP_ALERT = s('background:rgba(var(--tone-danger),0.18);border:1.5px solid rgba(var(--tone-danger),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-fg);letter-spacing:.01em;')
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
  return <div style={BODY_TEXT}>{text}</div>
}
/** Clinical pearls box. Splits into bullets (per splitPearl — explicit `|`
 *  wins, else sentence boundaries), keeping the amber pearl colour via inherit.
 *  A single-sentence pearl stays an inline paragraph. */
function Pearl({ text }: { text: string }) {
  const items = splitPearl(text)
  if (items.length <= 1) return <div className="pearl">💡 Clinical pearls: {items[0] ?? ''}</div>
  return (
    <div className="pearl">
      <div style={PEARL_LABEL}>💡 Clinical pearls</div>
      {items.map((t, i) => (
        <div key={i} style={PEARL_ITEM}><span style={PEARL_DOT}>•</span><Linkify text={t} /></div>
      ))}
    </div>
  )
}
/** pip → <Bul>, else <Txt> (the `pip(x)?bul:txt` cards). */
function Body({ text }: { text: string }) {
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
    .replace(/^EMERGENCY\s*[:—-]?\s*/i, '')
}

function References({ disease }: { disease: DiseaseRow }) {
  const references = referencesForDisease({ disease, lesions: DB.lesion_type })
  return (
    <section aria-label="References" style={REFERENCES}>
      <div style={REFERENCES_TITLE}>References</div>
      <ol>
        {references.map(reference => <li key={reference.id} style={REFERENCE_ITEM}>{reference.text}</li>)}
      </ol>
    </section>
  )
}

export function DiseasePageView({ id }: { id: string }) {
  const nav = useNav()
  const d = DB.disease_page.find(x => x.id === id)
  if (!d) return <NotFound what="Disease page" />

  function cite(value: unknown): string {
    return formatHarvardCitations(str(value))
  }
  const breed = cite(d.breed)
  const age = cite(d.age)
  const topAlert = cite(d.topAlert)
  const emergency = isEmergencyDisease(d, topAlert)
  const protocols = diseaseProtocols(d)

  return (
    <>
      <div style={PAGE_TITLE}>{d.name}</div>
      <div style={TAG_ROW}><SpTag sp={d.sp} /></div>

      {topAlert && <div style={TOP_ALERT}>{emergency ? '🚨 Emergency: ' : '⚠️ '}{stripAlertPrefix(topAlert)}</div>}
      {emergency && !topAlert && <div style={TOP_ALERT}>🚨 Emergency — initiate stabilisation before the full diagnostic workup.</div>}
      {cite(d.severe) && (
        <div className="em-alert">
          {pip(cite(d.severe))
            ? <><div style={EM_ALERT_HEAD}>⚠️ Severe / life-threatening</div><Bul text={cite(d.severe)} /></>
            : <>⚠️ {cite(d.severe)}</>}
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

      {cite(d.etiology) && <Card title="Etiology"><Bul text={cite(d.etiology)} /></Card>}

      <Card title="Signalment">
        <div style={FIELD_LABEL}>Breed</div>
        <div style={SIG_VALUE}>{pip(breed) ? <Bul text={breed} /> : breed}</div>
        <div style={FIELD_LABEL}>Age</div>
        <div style={SIG_VALUE}>{pip(age) ? <Bul text={age} /> : age}</div>
        {cite(d.sex) && (
          <>
            <div style={FIELD_LABEL}>Sex</div>
            <div style={BODY_TEXT}>{cite(d.sex)}</div>
          </>
        )}
      </Card>

      {cite(d.risk) && <Card title="Risk Factors"><Bul text={cite(d.risk)} /></Card>}

      <Card title="Pathophysiology"><Body text={cite(d.path)} /></Card>

      <Card title="Clinical Signs">
        <Body text={cite(d.signs)} />
        {d.showGradingTable === true && <InjuryGradingTable />}
      </Card>

      <Card title="Diagnostic Investigation">
        <ConfBody text={cite(d.conf)} />
        {cite(d.supp) && (
          <>
            <div style={SUB_LABEL}>Supportive Diagnostics</div>
            <Body text={cite(d.supp)} />
          </>
        )}
      </Card>

      <Card title="Treatment">
        <div style={FIELD_LABEL}>First-line</div>
        <Body text={cite(d.tx1)} />
        {cite(d.tx2) && (
          <>
            <div style={SUB_LABEL}>Second-line / Alternatives</div>
            <Body text={cite(d.tx2)} />
          </>
        )}
      </Card>

      {cite(d.outpatient) && <Card title="Outpatient Protocol"><Body text={cite(d.outpatient)} /></Card>}

      <Card title="Monitoring"><Body text={cite(d.monitor)} /></Card>
      <Card title="Prognosis"><Body text={cite(d.prog)} /></Card>

      {cite(d.ddx) && <Card title="Differential Diagnosis"><Bul text={cite(d.ddx)} /></Card>}

      <Pearl text={cite(d.pearl)} />
      <References disease={d} />
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </>
  )
}
