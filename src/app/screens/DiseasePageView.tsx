'use client'
// Disease page — React port of renderDiseasePage (cliniqApp.ts). Same card
// stack, same inline styles, same conditional sections. Pipe fields render via
// the shared <Bul> (with @-link navigation); plain fields via <Txt>.

import { DB } from '../../data/db'
import { styleStringToObject as s } from './style'
import { SpTag } from './tags'
import { Bul, NavCard, Card, str } from './markup'
import { InjuryGradingTable } from './InjuryGradingTable'
import { NotFound } from './NotFound'
import { TAG_ROW, BODY_TEXT } from './styles'

const TITLE = s('font-size:18px;font-weight:700;color:var(--white);margin-bottom:10px;line-height:1.3;')
const TOP_ALERT = s('background:rgba(var(--tone-danger),0.18);border:1.5px solid rgba(var(--tone-danger),0.5);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:13px;font-weight:700;color:var(--tone-danger-fg);letter-spacing:.01em;')
const SUB_LABEL = s('font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-top:10px;margin-bottom:4px;padding-top:8px;border-top:1px solid var(--border);')
const SIG_LABEL = s('font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px;')
const SIG_VALUE = s('font-size:12px;color:var(--gray);line-height:1.6;margin-bottom:8px;')
const TX_LABEL = s('font-size:10px;color:var(--gray2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;')
const LOC_WRAP = s('margin-top:10px;')
const LOC_CARD = s('cursor:pointer;padding:10px 14px;')

const pip = (v: unknown): boolean => typeof v === 'string' && v.includes('|')
function Txt({ text }: { text: string }) {
  return <div style={BODY_TEXT}>{text}</div>
}
/** pip → <Bul>, else <Txt> (the `pip(x)?bul:txt` cards). */
function Body({ text }: { text: string }) {
  return pip(text) ? <Bul text={text} /> : <Txt text={text} />
}

export function DiseasePageView({ id }: { id: string }) {
  const d = DB.disease_page.find(x => x.id === id)
  if (!d) return <NotFound what="Disease page" />

  const locFunc = str(d.locFunc)
  const breed = str(d.breed)
  const age = str(d.age)

  return (
    <>
      <div style={TITLE}>{d.name}</div>
      <div style={TAG_ROW}><SpTag sp={d.sp} /></div>

      {str(d.topAlert) && <div style={TOP_ALERT}>🚨 {str(d.topAlert)}</div>}
      {str(d.severe) && <div className="em-alert">⚠️ {str(d.severe)}</div>}

      {str(d.etiology) && <Card title="Etiology"><Bul text={str(d.etiology)} /></Card>}

      <Card title="Signalment">
        <div style={SIG_LABEL}>Breed</div>
        <div style={SIG_VALUE}>{pip(breed) ? <Bul text={breed} /> : breed}</div>
        <div style={SIG_LABEL}>Age</div>
        <div style={SIG_VALUE}>{pip(age) ? <Bul text={age} /> : age}</div>
        {str(d.sex) && (
          <>
            <div style={SIG_LABEL}>Sex</div>
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
        <Body text={str(d.conf)} />
        {str(d.supp) && (
          <>
            <div style={SUB_LABEL}>Supportive Diagnostics</div>
            <Body text={str(d.supp)} />
          </>
        )}
        {locFunc && (
          <div style={LOC_WRAP}>
            <NavCard
              icon="🔬"
              title="Localise lesion"
              sub="Phenylephrine test — interactive decision tree"
              onClick={() => {
                const fn = (window as unknown as Record<string, (() => void) | undefined>)[locFunc]
                if (typeof fn === 'function') fn()
              }}
              style={LOC_CARD}
            />
          </div>
        )}
      </Card>

      <Card title="Treatment">
        <div style={TX_LABEL}>First-line</div>
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

      <div className="pearl">💡 Clinical pearls: {str(d.pearl)}</div>
      <div className="disclaimer">For qualified veterinary professionals only.</div>
    </>
  )
}
