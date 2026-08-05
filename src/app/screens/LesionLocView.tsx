'use client'
// Lesion-location category grid — React port of goLesionTab (cliniqApp.ts).
// Groups a location's lesions by category into a flow-wrap (category row →
// arrows → tappable sub-type columns), then an optional diagnostic-approach card.

import { Fragment } from 'react'
import type { LesionRow } from '../../data/db'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s, SCROLL_X, colTier } from './style'
import { NavCard } from './markup'
import { ForkLines } from './flowHelpers'
import type { Tone } from '../../lib/signs/flowTypes'
import { HUE } from '../../lib/signs/tone'

// Category → Tone. Drives bg/border/text via the shared HUE table (CSS vars),
// so colours are automatically theme-aware instead of hardcoded pastel hex.
const CT: Record<string, Tone> = {
  'Mass': 'violet',         'Mass/Neoplasia': 'violet',
  'Fluid': 'info',          'Fluid/Oedema': 'info',
  'Gas': 'warning',         'Infection': 'danger',
  'Infection/Inflammation': 'danger',  'Inflammation': 'orange',
  'Structural': 'slate',    'Cardiac': 'danger',
  'Infectious': 'danger',   'Inflammatory': 'orange',
  'Neuromuscular': 'indigo','Dynamic collapse': 'slate',
  'Obstruction': 'danger',  'Ulceration': 'danger',
  'Dysmotility': 'violet',  'Haemolytic': 'danger',
  'Hepatocellular': 'warning', 'Biliary obstruction': 'teal',
  'Compressive': 'info',    'Vascular': 'danger',
  'Non-compressive': 'teal','Traumatic': 'danger',
  'Peripheral': 'teal',     'Central': 'danger',
  'Bilateral': 'warning',   'Neoplastic': 'violet',
  'Immune-mediated': 'orange', 'Metabolic': 'warning',
  'Idiopathic': 'info',     'Reactive': 'danger',
  'Regenerative': 'teal',   'Non-regenerative': 'danger',
  'Pre-regenerative': 'warning', 'Shock': 'danger',
  'Foreign body': 'slate',  'Dental': 'warning',
  'Parasitic': 'warning',   'Toxic': 'danger',
  'Fungal': 'teal',
  'Inherited': 'violet',    'Endocrine': 'warning',
  'Endocrine/Metabolic': 'warning',
  'Cardiovascular': 'danger','Junctionopathy': 'indigo',
  'Neuropathy': 'violet',   'Myopathy': 'orange',
  'Syncope': 'danger',      'Seizure': 'danger',
  'Sleep disorder': 'indigo','Stress': 'slate',
  'Dietary': 'teal',        'Antibiotic-responsive': 'info',
  'Infiltrative': 'orange', 'Maldigestion': 'violet',
  'Protein-losing': 'danger','Secondary GI': 'warning',
  'Neoplasia': 'orange',    'Obstruction/Dysmotility': 'danger',
  'Behavioural/Neurological': 'indigo',
  'Renal failure': 'danger','Osmotic diuresis': 'info',
  'Adrenal': 'warning',     'Pancreatic': 'violet',
  'Thyroid': 'teal',        'Calcium': 'orange',
  'Pituitary': 'indigo',    'Hepatic': 'warning',
  'Uterine': 'danger',      'Electrolyte': 'info',
  'Neurological': 'violet', 'Renal tubular': 'danger',
  'Nutritional': 'teal',
}
const DEF_TONE: Tone = 'slate'
const cHue = (cat: string) => HUE[CT[cat] ?? DEF_TONE]
const cBg  = (cat: string) => `rgba(${cHue(cat).rgb},var(--tile-bg-a))`
const cBd  = (cat: string) => `rgba(${cHue(cat).rgb},var(--tile-bd-a))`
const cTx  = (cat: string) => cHue(cat).color

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

// Category cards carry no badges at all — name only. 🚨 belongs to disease pages,
// where an emergency protocol can actually be started; ⚠️ (zoonosis / isolation)
// and the urgency chip both reappear once the lesion itself is open.

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
  const t = colTier(cols)
  const catFontSize = [11, 10, 9][t]
  const cardFontSize = [10, 9, 8][t]
  const cardPadding = ['6px 8px', '5px 6px', '3px 4px'][t]
  // Minimum column width so text always fits; scroll horizontally when needed.
  // (Its own breakpoint — the floor eases only past 6 cols, not at the tier
  // boundary — so it stays inline rather than keying off `t`.)
  const minColPx = cols <= 4 ? 80 : cols <= 6 ? 72 : 68
  // Cap each column so few-category layouts don't stretch boxes full-width on
  // wide screens; centre the (narrower-than-container) grid instead.
  const maxColPx = 240
  const totalMinPx = cols * minColPx + (cols - 1) * 6
  const gridCols = `repeat(${cols},minmax(${minColPx}px,${maxColPx}px))`
  const gridStyle = s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;justify-content:center;`)
  const dxSign = DX_MAP[loc]

  return (
    <>
      <div className="flow-wrap">
        <div className="flow-node entry">{name}</div>
        <div className="flow-arrow-v">↓</div>
        <div className="flow-node step">IDENTIFY LESION CATEGORY</div>
        {/* A single category isn't a split — it keeps the plain spine arrow. */}
        {cols < 2 && <div className="flow-arrow-v">↓</div>}
        <div style={s(SCROLL_X)}>
          {/* The category row is a split, so it gets the shared fork — inside the
              scroll box and on the row's own tracks, so the drops stay on their
              headers when a wide row scrolls. */}
          {cols >= 2 && (
            <ForkLines n={cols} gap={6} cols={gridCols}
              extra={`min-width:${totalMinPx}px;justify-content:center;`}
              rootExtra={`min-width:${totalMinPx}px;`} />
          )}
          <div style={gridStyle}>
            {cats.map(cat => (
              <div key={cat} className="flow-node" style={s(`background:${cBg(cat)};border-color:${cBd(cat)};color:${cTx(cat)};font-size:${catFontSize}px;cursor:default;`)}>{cat}</div>
            ))}
          </div>
          <div style={s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;justify-content:center;`)}>
            {cats.map(cat => <div key={cat} className="flow-arrow-v">↓</div>)}
          </div>
          <div style={s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;justify-content:center;align-items:start;`)}>
            {cats.map(cat => (
              <div key={cat} style={s('display:flex;flex-direction:column;gap:4px;')}>
                {groups.get(cat)!.map(l => {
                  return (
                    <div key={l.id} role="button"
                      style={s(`border-radius:8px;padding:${cardPadding};font-size:${cardFontSize}px;font-weight:600;text-align:center;border:1.5px solid ${cBd(cat)};background:${cBg(cat)};color:${cTx(cat)};cursor:pointer;transition:all .2s;line-height:1.3;word-break:break-word;`)}
                      onClick={() => nav.navigate({ kind: 'subTypeDetail', id: l.id })}
                      onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.2)' }}
                      onMouseOut={e => { e.currentTarget.style.filter = '' }}>
                      {l.sub}
                    </div>
                  )
                })}
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
