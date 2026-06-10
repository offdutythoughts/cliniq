'use client'
// Lesion-location category grid — React port of goLesionTab (cliniqApp.ts).
// Groups a location's lesions by category into a flow-wrap (category row →
// arrows → tappable sub-type columns), then an optional diagnostic-approach card.

import { Fragment } from 'react'
import type { LesionRow } from '../../data/db'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s } from './style'
import { NavCard } from './markup'

// Category → rgba colour prefix.
const CC: Record<string, string> = {
  'Mass': 'rgba(139,92,246,', 'Mass/Neoplasia': 'rgba(139,92,246,',
  'Fluid': 'rgba(37,99,235,', 'Fluid/Oedema': 'rgba(37,99,235,',
  'Gas': 'rgba(217,119,6,', 'Infection': 'rgba(220,38,38,',
  'Infection/Inflammation': 'rgba(220,38,38,', 'Inflammation': 'rgba(249,115,22,',
  'Structural': 'rgba(100,116,139,', 'Cardiac': 'rgba(220,38,38,',
  'Infectious': 'rgba(220,38,38,', 'Inflammatory': 'rgba(249,115,22,',
  'Neuromuscular': 'rgba(99,102,241,', 'Dynamic collapse': 'rgba(100,116,139,',
  'Obstruction': 'rgba(220,38,38,', 'Ulceration': 'rgba(220,38,38,',
  'Dysmotility': 'rgba(139,92,246,', 'Haemolytic': 'rgba(220,38,38,',
  'Hepatocellular': 'rgba(217,119,6,', 'Biliary obstruction': 'rgba(13,148,136,',
  'Compressive': 'rgba(37,99,235,', 'Vascular': 'rgba(220,38,38,',
  'Non-compressive': 'rgba(13,148,136,', 'Traumatic': 'rgba(220,38,38,',
  'Peripheral': 'rgba(13,148,136,', 'Central': 'rgba(220,38,38,',
  'Bilateral': 'rgba(217,119,6,', 'Neoplastic': 'rgba(139,92,246,',
  'Immune-mediated': 'rgba(249,115,22,', 'Metabolic': 'rgba(217,119,6,',
  'Idiopathic': 'rgba(37,99,235,', 'Reactive': 'rgba(220,38,38,',
  'Regenerative': 'rgba(13,148,136,', 'Non-regenerative': 'rgba(220,38,38,',
  'Pre-regenerative': 'rgba(217,119,6,', 'Shock': 'rgba(220,38,38,',
  'Foreign body': 'rgba(100,116,139,', 'Dental': 'rgba(217,119,6,',
  'Parasitic': 'rgba(217,119,6,', 'Toxic': 'rgba(220,38,38,',
  'Inherited': 'rgba(139,92,246,', 'Endocrine': 'rgba(217,119,6,',
  'Endocrine/Metabolic': 'rgba(217,119,6,',
  'Cardiovascular': 'rgba(220,38,38,', 'Junctionopathy': 'rgba(99,102,241,',
  'Neuropathy': 'rgba(139,92,246,', 'Myopathy': 'rgba(249,115,22,',
  'Syncope': 'rgba(220,38,38,', 'Seizure': 'rgba(220,38,38,',
  'Sleep disorder': 'rgba(99,102,241,', 'Stress': 'rgba(100,116,139,',
  'Dietary': 'rgba(13,148,136,', 'Antibiotic-responsive': 'rgba(37,99,235,',
  'Infiltrative': 'rgba(249,115,22,', 'Maldigestion': 'rgba(139,92,246,',
  'Protein-losing': 'rgba(220,38,38,', 'Secondary GI': 'rgba(217,119,6,',
  'Neoplasia': 'rgba(249,115,22,', 'Obstruction/Dysmotility': 'rgba(220,38,38,',
  'Behavioural/Neurological': 'rgba(99,102,241,',
  'Renal failure': 'rgba(220,38,38,', 'Osmotic diuresis': 'rgba(37,99,235,',
  'Adrenal': 'rgba(217,119,6,', 'Pancreatic': 'rgba(139,92,246,',
  'Thyroid': 'rgba(13,148,136,', 'Calcium': 'rgba(249,115,22,',
  'Pituitary': 'rgba(99,102,241,', 'Hepatic': 'rgba(217,119,6,',
  'Uterine': 'rgba(220,38,38,', 'Electrolyte': 'rgba(37,99,235,',
  'Neurological': 'rgba(139,92,246,', 'Renal tubular': 'rgba(220,38,38,',
}
const DEF = 'rgba(148,163,184,'
const TX: Record<string, string> = {
  'rgba(37,99,235,': '#93C5FD', 'rgba(139,92,246,': '#DDD6FE', 'rgba(220,38,38,': '#FCA5A5',
  'rgba(217,119,6,': 'var(--amber-text)', 'rgba(13,148,136,': '#99F6E4', 'rgba(249,115,22,': '#FED7AA',
  'rgba(99,102,241,': '#C7D2FE', 'rgba(100,116,139,': '#CBD5E1', 'rgba(148,163,184,': '#CBD5E1',
}
const cBg = (c: string) => (CC[c] || DEF) + '0.12)'
const cBd = (c: string) => (CC[c] || DEF) + '0.4)'
const cTx = (c: string) => TX[CC[c] || DEF] || '#CBD5E1'
const isEM = (u?: string) => !!u && u.toUpperCase() === 'EMERGENCY'

// Location → diagnostic-approach sign id (the bottom "Diagnostic Approach" card).
const DX_MAP: Record<string, string> = {
  'LOC-GI-UPPER': 'vomiting', 'LOC-GI-PRIMARY': 'vomiting', 'LOC-GI-SECONDARY': 'vomiting', 'LOC-OESOPH': 'vomiting',
  'LOC-DI-SI': 'diarrhoea', 'LOC-DI-SI-SEC': 'diarrhoea', 'LOC-DI-LB': 'diarrhoea',
  'LOC-LARYNX': 'dyspnoea', 'LOC-NASAL': 'dyspnoea', 'LOC-PARENCH': 'dyspnoea', 'LOC-PLEURAL': 'dyspnoea',
  'LOC-JD-PREHEP': 'jaundice', 'LOC-JD-HEP': 'jaundice', 'LOC-JD-POSTHEP': 'jaundice',
  'LOC-WK-EPISODIC': 'weakness', 'LOC-WK-PERSISTENT': 'weakness', 'LOC-WK-COLLAPSE': 'weakness',
  'LOC-NM-NEURO': 'weakness', 'LOC-NM-JUNC': 'weakness', 'LOC-NM-MYO': 'weakness',
  'LOC-PUPD-RENAL': 'pupd', 'LOC-PUPD-ENDO': 'pupd', 'LOC-PUPD-MED': 'pupd', 'LOC-PUPD-NDI': 'pupd', 'LOC-PUPD-CDI': 'pupd', 'LOC-PUPD-PRIM': 'pupd',
  'LOC-SZ-INTRACRANIAL': 'seizures', 'LOC-SZ-EXTRACRANIAL': 'seizures',
  'LOC-MY-TL': 'myelopathy', 'LOC-MY-CERV': 'myelopathy', 'LOC-MY-L4S3': 'myelopathy', 'LOC-MY-CONUS': 'myelopathy',
  'LOC-VE-PERIPH': 'vestibular', 'LOC-VE-CENTRAL': 'vestibular', 'LOC-VE-BILAT': 'vestibular',
  'LOC-EN-INFLAM': 'encephalopathy', 'LOC-EN-NEO': 'encephalopathy', 'LOC-EN-CVA': 'encephalopathy', 'LOC-EN-METAB': 'encephalopathy',
  'LOC-CO-DRY': 'coughing', 'LOC-CO-WET': 'coughing',
  'LOC-SN-UNI': 'sneezing', 'LOC-SN-BI': 'sneezing',
  'LOC-PM-ANAEMIA': 'pale-gums', 'LOC-PM-PERFUSION': 'pale-gums',
  'LOC-AT-CEREB': 'ataxia',
  'LOC-RE-ADNEXA': 'red-eye', 'LOC-RE-TEL': 'red-eye', 'LOC-RE-CONJ': 'red-eye', 'LOC-RE-EPISC': 'red-eye',
  'LOC-RE-CORNEA-SUP': 'red-eye', 'LOC-RE-CORNEA-DEEP': 'red-eye', 'LOC-RE-UVEA': 'red-eye', 'LOC-RE-AC': 'red-eye',
  'LOC-RE-GLAUCOMA': 'red-eye', 'LOC-RE-ORBIT': 'red-eye', 'LOC-RE-RETINA': 'red-eye',
  'LOC-AP-IRIS': 'abnormal-pupil', 'LOC-AP-LENS': 'abnormal-pupil', 'LOC-AP-RETINA': 'abnormal-pupil', 'LOC-AP-MIOSIS': 'abnormal-pupil', 'LOC-AP-MYDR': 'abnormal-pupil', 'LOC-AP-NEURO': 'abnormal-pupil',
  'LOC-BL-OPAQUE': 'blind-eye', 'LOC-BL-RETINA': 'blind-eye', 'LOC-BL-OPTIC': 'blind-eye', 'LOC-BL-CHIASM': 'blind-eye', 'LOC-BL-CORTEX': 'blind-eye',
  'LOC-WE-DRAIN': 'wet-eye', 'LOC-WE-PROD': 'wet-eye',
  'LOC-HU-UPPER': 'haematuria', 'LOC-HU-BLADDER': 'haematuria', 'LOC-HU-URETHRA': 'haematuria', 'LOC-HU-PROST': 'haematuria', 'LOC-HU-GENIT': 'haematuria', 'LOC-HU-SYS': 'haematuria',
  'LOC-BD-PRIM': 'bleeding', 'LOC-BD-SEC': 'bleeding', 'LOC-BD-MIX': 'bleeding', 'LOC-BD-VASC': 'bleeding',
}

const EM_BADGE = s('font-size:8px;padding:2px 5px;')

export function LesionLocView({ loc, name, filter }: { loc: string; name: string; filter?: 'acute' | 'chronic' }) {
  const nav = useNav()
  const allLesions = DB.lesion_type.filter(l => l.loc === loc)
  const lesions = filter === 'acute'
    ? allLesions.filter(l => l.onset === 'acute' || l.onset === 'both')
    : filter === 'chronic'
      ? allLesions.filter(l => l.onset === 'chronic' || l.onset === 'both')
      : allLesions
  if (!lesions.length) return <div className="empty"><p>No lesion types for this location yet.</p></div>

  const groups = new Map<string, LesionRow[]>()
  for (const l of lesions) {
    const cat = l.cat || 'Other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(l)
  }
  const cats = [...groups.keys()]
  const cols = cats.length
  const catFontSize = cols <= 4 ? 11 : cols === 5 ? 10 : 9
  const cardFontSize = cols <= 4 ? 10 : cols === 5 ? 9 : 8
  const cardPadding = cols <= 4 ? '6px 8px' : cols === 5 ? '5px 6px' : '3px 4px'
  // Minimum column width so text always fits; scroll horizontally when needed.
  const minColPx = cols <= 4 ? 80 : cols <= 6 ? 72 : 68
  const totalMinPx = cols * minColPx + (cols - 1) * 6
  const gridCols = `repeat(${cols},minmax(${minColPx}px,1fr))`
  const gridStyle = s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;`)
  const dxSign = DX_MAP[loc]

  return (
    <>
      <div className="flow-wrap">
        <div className="flow-node entry">{name}</div>
        <div className="flow-arrow-v">↓</div>
        <div className="flow-node step">IDENTIFY LESION CATEGORY</div>
        <div className="flow-arrow-v">↓</div>
        <div style={s('overflow-x:auto;width:100%;')}>
          <div style={gridStyle}>
            {cats.map(cat => (
              <div key={cat} className="flow-node" style={s(`background:${cBg(cat)};border-color:${cBd(cat)};color:${cTx(cat)};font-size:${catFontSize}px;cursor:default;`)}>{cat}</div>
            ))}
          </div>
          <div style={s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;`)}>
            {cats.map(cat => <div key={cat} className="flow-arrow-v">↓</div>)}
          </div>
          <div style={s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;align-items:start;`)}>
            {cats.map(cat => (
              <div key={cat} style={s('display:flex;flex-direction:column;gap:4px;')}>
                {groups.get(cat)!.map(l => (
                  <div key={l.id} role="button"
                    style={s(`border-radius:8px;padding:${cardPadding};font-size:${cardFontSize}px;font-weight:600;text-align:center;border:1.5px solid ${cBd(cat)};background:${cBg(cat)};color:${cTx(cat)};cursor:pointer;transition:all .2s;line-height:1.3;word-break:break-word;`)}
                    onClick={() => nav.navigate({ kind: 'subTypeDetail', id: l.id })}
                    onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.2)' }}
                    onMouseOut={e => { e.currentTarget.style.filter = '' }}>
                    {l.sub}{isEM(l.urg) && <>{' '}<span className="tag tag-em" style={EM_BADGE}>⚠️</span></>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {dxSign && (
        <NavCard icon="🔬" title="Diagnostic Approach" sub="Stepwise clinical workup flowchart" onClick={() => nav.navigate({ kind: 'dx', sign: dxSign, tab: 'history' })} style={{ marginTop: 12 }} />
      )}
      <div className="disclaimer">Tap a subtype to see differentials and causes.</div>
    </>
  )
}
