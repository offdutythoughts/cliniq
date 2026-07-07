'use client'
// Disease page — React port of renderDiseasePage (cliniqApp.ts). Same card
// stack, same inline styles, same conditional sections. Pipe fields render via
// the shared <Bul> (with @-link navigation); plain fields via <Txt>.

import { DB } from '../../data/db'
import { styleStringToObject as s } from './style'
import { SpTag } from './tags'
import { Bul, Card, Linkify, str } from './markup'
import { splitPearl } from './pearlSplit'
import { InjuryGradingTable } from './InjuryGradingTable'
import { PhenylephrineLocaliseTable } from './PhenylephrineLocaliseTable'
import { IrisCkdStagingTable } from './IrisCkdStagingTable'
import { IrisAkiGradingTable } from './IrisAkiGradingTable'
import { NotFound } from './NotFound'
import { TAG_ROW, BODY_TEXT, PAGE_TITLE, FIELD_LABEL, SUB_LABEL } from './styles'

const TOP_ALERT = s('background:rgba(var(--tone-danger),0.18);border:1.5px solid rgba(var(--tone-danger),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-fg);letter-spacing:.01em;')
const SIG_VALUE = s('font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);margin-bottom:8px;')

const PEARL_LABEL = s('font-weight:700;margin-bottom:6px;')
const PEARL_ITEM = s('display:flex;align-items:baseline;gap:6px;margin-bottom:4px;')
const PEARL_DOT = s('flex-shrink:0;opacity:.7;')

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

export function DiseasePageView({ id }: { id: string }) {
  const d = DB.disease_page.find(x => x.id === id)
  if (!d) return <NotFound what="Disease page" />

  const breed = str(d.breed)
  const age = str(d.age)

  return (
    <>
      <div style={PAGE_TITLE}>{d.name}</div>
      <div style={TAG_ROW}><SpTag sp={d.sp} /></div>

      {str(d.topAlert) && <div style={TOP_ALERT}>🚨 {str(d.topAlert)}</div>}
      {str(d.severe) && <div className="em-alert">⚠️ {str(d.severe)}</div>}

      {str(d.etiology) && <Card title="Etiology"><Bul text={str(d.etiology)} /></Card>}

      <Card title="Signalment">
        <div style={FIELD_LABEL}>Breed</div>
        <div style={SIG_VALUE}>{pip(breed) ? <Bul text={breed} /> : breed}</div>
        <div style={FIELD_LABEL}>Age</div>
        <div style={SIG_VALUE}>{pip(age) ? <Bul text={age} /> : age}</div>
        {str(d.sex) && (
          <>
            <div style={FIELD_LABEL}>Sex</div>
            <div style={BODY_TEXT}>{str(d.sex)}</div>
          </>
        )}
      </Card>

      {str(d.risk) && <Card title="Risk Factors"><Bul text={str(d.risk)} /></Card>}

      <Card title="Pathophysiology"><Body text={str(d.path)} /></Card>

      <Card title="Clinical Signs">
        <Body text={str(d.signs)} />
        {d.showGradingTable === true && <InjuryGradingTable />}
      </Card>

      <Card title="Diagnostic Investigation">
        <ConfBody text={str(d.conf)} />
        {str(d.supp) && (
          <>
            <div style={SUB_LABEL}>Supportive Diagnostics</div>
            <Body text={str(d.supp)} />
          </>
        )}
      </Card>

      <Card title="Treatment">
        <div style={FIELD_LABEL}>First-line</div>
        <Body text={str(d.tx1)} />
        {str(d.tx2) && (
          <>
            <div style={SUB_LABEL}>Second-line / Alternatives</div>
            <Body text={str(d.tx2)} />
          </>
        )}
      </Card>

      {str(d.outpatient) && <Card title="Outpatient Protocol"><Body text={str(d.outpatient)} /></Card>}

      <Card title="Monitoring"><Body text={str(d.monitor)} /></Card>
      <Card title="Prognosis"><Body text={str(d.prog)} /></Card>

      {str(d.ddx) && <Card title="Differential Diagnosis"><Bul text={str(d.ddx)} /></Card>}

      <Pearl text={str(d.pearl)} />
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </>
  )
}
