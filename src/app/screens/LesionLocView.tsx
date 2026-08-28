'use client'
// Lesion-location category grid — React port of goLesionTab (cliniqApp.ts).
// Groups a location's lesions by category into a flow-wrap (category row →
// arrows → tappable sub-type columns), then an optional diagnostic-approach card.

import type { LesionRow } from '../../data/db'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s, colTier } from './style'
import { NavCard } from './markup'
import { ForkLines } from './flowHelpers'
import type { Tone } from '../../lib/signs/flowTypes'
import { HUE } from '../../lib/signs/tone'

// Category → Tone. Drives bg/border/text via the shared HUE table (CSS vars),
// so colours are automatically theme-aware instead of hardcoded pastel hex.
//
// The assignment is a graph colouring, not a free choice. Two constraints:
//
//  1. Any two categories that appear together on one location page must not
//     share a tone. The old table broke this badly — LOC-WE-PROD showed three
//     grey columns and two orange ones.
//  2. They must not merely differ by NAME. Tiles are rgba(tone, --lesion-bg-a)
//     over the page background, so near hues collapse together: at the old
//     --tile-bg-a, teal vs green measured ΔE 4 (and info vs indigo ΔE 1.5 in
//     dark mode) — different tone, same-looking tile. Hence --lesion-bg-a, and
//     hence `indigo` is absent below: it sits within ΔE 6 of BOTH info and
//     violet, so it can't coexist with Compressive or Mass. Its categories
//     (neuro) moved to violet, and Congenital took cyan.
//
// Within those constraints the table keeps its semantic reading — red =
// infectious/destructive, pink = vascular, orange = inflammatory, amber =
// metabolic, violet = neoplastic/neuro, teal = immune, slate = structural — and
// those anchors are fixed across every page. The rest take the nearest free hue
// in their family.
//
// Adding a new `cat` string, or adding a lesion to a page it didn't appear on
// before, can reintroduce a clash. Recheck the co-occurrence sets and the ΔE
// between the tones involved; don't eyeball this list.
const CT: Record<string, Tone> = {
  // ── danger: infectious / destructive / urgent ──
  'Infection': 'danger', 'Infectious': 'danger',
  'Traumatic': 'danger', 'Ulceration': 'danger',
  'Cardiovascular': 'danger', 'Chronic': 'danger',
  'Coagulopathy': 'danger', 'Consumptive': 'danger',
  'Haemolytic': 'danger', 'Haemorrhage': 'danger',
  'Non-regenerative': 'danger', 'Protein-losing': 'danger',
  'Renal tubular': 'danger', 'Seizure': 'danger',
  'Shock': 'danger', 'Central': 'danger',
  'Infection/Inflammation': 'danger', 'Obstruction/Dysmotility': 'danger',
  // ── pink: vascular / cardiac / obstructive (red is taken by infection) ──
  'Vascular': 'pink', 'Cardiac': 'pink',
  'Obstruction': 'pink', 'Cystic': 'pink',
  'Haemolysis': 'pink',
  // ── orange: inflammatory ──
  'Inflammation': 'orange', 'Inflammatory': 'orange',
  'Infiltrative': 'orange', 'Reactive': 'orange',
  'Acquired': 'orange', 'Calcium': 'orange',
  'Infection/Fungal': 'orange', 'Myopathy': 'orange',
  'Renal failure': 'orange', 'Secondary': 'orange',
  'Syncope': 'orange', 'Uterine': 'orange',
  'Secondary GI': 'orange',
  // ── warning: metabolic / hepatic / parasitic ──
  'Metabolic': 'warning', 'Parasitic': 'warning',
  'Trauma': 'warning', 'Hepatic': 'warning',
  'Hormonal': 'warning', 'Adrenal': 'warning',
  'Dental': 'warning', 'Endocrine/Metabolic': 'warning',
  'Gas': 'warning', 'Hepatobiliary': 'warning',
  'Hepatocellular': 'warning', 'Parasitic/Vascular': 'warning',
  'Pre-regenerative': 'warning', 'Bilateral': 'warning',
  // ── lime: degenerative / endocrine ──
  'Degenerative': 'lime', 'Endocrine': 'lime',
  'Inflammatory/Allergic': 'lime',
  // ── green: toxic / positional / physiological ──
  'Toxic': 'green', 'Prolapse': 'green',
  'Drug': 'green', 'Pharyngeal': 'green',
  'Physiological': 'green', 'Sympathetic': 'green',
  // ── teal: immune-mediated / responsive ──
  'Immune-mediated': 'teal', 'Idiopathic': 'teal',
  'Dietary': 'teal', 'Non-compressive': 'teal',
  'Biliary obstruction': 'teal', 'Fungal': 'teal',
  'GI Disease': 'teal', 'Pharmacological': 'teal',
  'Regenerative': 'teal', 'Thyroid': 'teal',
  'Peripheral': 'teal',
  // ── cyan: congenital ──
  'Congenital': 'cyan', 'Dynamic collapse': 'cyan',
  'Autonomic': 'cyan', 'Junctionopathy': 'cyan',
  'Pituitary': 'cyan',
  // ── info: mechanical / fluid / conformational ──
  'Compressive': 'info', 'Conformational': 'info',
  'Nutritional': 'info', 'Glaucoma': 'info',
  'Motility': 'info', 'Antibiotic-responsive': 'info',
  'Electrolyte': 'info', 'Fluid': 'info',
  'Fluid/Oedema': 'info', 'Hereditary': 'info',
  'Osmotic diuresis': 'info', 'Primary': 'info',
  'Dysmotility': 'info',
  // ── violet: neoplastic / proliferative / neuro ──
  'Mass': 'violet', 'Neoplastic': 'violet',
  'Inherited': 'violet', 'Neoplasia': 'violet',
  'Neurological': 'violet', 'Neuromuscular': 'violet',
  'Neuropathy': 'violet', 'Behavioural/Neurological': 'violet',
  'Maldigestion': 'violet', 'Mass/Neoplasia': 'violet',
  'Muscle': 'violet', 'Pancreatic': 'violet',
  'Sleep disorder': 'violet',
  // ── slate: structural / inert ──
  'Structural': 'slate', 'Foreign body': 'slate',
  'Stress': 'slate',
}
const DEF_TONE: Tone = 'slate'
const cHue = (cat: string) => HUE[CT[cat] ?? DEF_TONE]
const cBg  = (cat: string) => `rgba(${cHue(cat).rgb},var(--lesion-bg-a))`
const cBd  = (cat: string) => `rgba(${cHue(cat).rgb},var(--tile-bd-a))`
const cTx  = (cat: string) => cHue(cat).color
// A slashed category name ("Infection/Inflammation") should break AT the slash,
// not mid-word: a zero-width space after each "/" gives the wrapper a preferred
// break point while `overflow-wrap:anywhere` stays as the fallback for a single
// word too long for its track. The character is invisible and not copied as text.
const wrappable = (cat: string) => cat.replace(/\//g, '/\u200B')

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
  const cardPadX = [8, 6, 4][t]
  // .flow-node's stock 14px side padding is sized for a full-width box. In a
  // ~70px category column it ate 28 of the 70px, leaving 40px of text width —
  // which is why long labels spilled out of their border. Scale it with the tier.
  const catPadX = [12, 9, 7][t]
  // Columns are sized to their own label rather than all being equal, so "Mass"
  // doesn't get the same width as "Immune-mediated". Width is derived from the
  // longest UNBREAKABLE run of each label (text wraps at spaces, slashes and
  // after hyphens, so only the longest run has to fit on one line).
  //   CH = px of advance width per character per px of font-size. Being a fixed
  //   ratio (no canvas/DOM measurement) it renders identically on the server and
  //   the client — but it has to ERR HIGH, because the two directions fail very
  //   differently. Over-estimating spends slack the row already has; the tracks
  //   are centred and a four-category row uses ~330px of ~568px. Under-estimating
  //   breaks a word: "Glaucoma" measures 48px and a 0.58 estimate bought it 46,
  //   so it wrapped to "Glaucom / a" with 234px of the row standing empty.
  //   Measured against the real app font, the worst-case ratio is 0.623 (short
  //   words at the bold card weight — "Mass", "Glaucoma"); 0.63 clears every
  //   label in the DB with a little margin.
  const CH = 0.63
  const runPx = (label: string, fontPx: number) =>
    Math.max(...label.split(/[\s/]+|(?<=-)/).map(w => w.length)) * fontPx * CH
  // Floor keeps a too-short label (e.g. "Mass") from collapsing to a sliver; the
  // cap stops a few-category layout stretching boxes across a wide screen.
  const minColPx = 60
  const maxColPx = 240
  const colPx = cats.map(cat => {
    const head = runPx(cat, catFontSize) + catPadX * 2 + 2
    const card = Math.max(...groups.get(cat)!.map(l => runPx(l.sub, cardFontSize))) + cardPadX * 2 + 3
    return Math.round(Math.min(maxColPx, Math.max(minColPx, head, card)))
  })
  const totalMinPx = colPx.reduce((a, b) => a + b, 0) + (cols - 1) * 6
  // One explicit track list, shared by all four rows (fork legs, headers, arrows,
  // cards) so the columns stay aligned — they can't each size to their own
  // content independently or the arrows would drift off their headers.
  //
  // Every category stays on ONE line, next to its peers. Wrapping to a second
  // line doesn't work here: the columns hold sub-type STACKS of unequal height,
  // so a wrapped column sits far below the tallest stack above it and reads as
  // part of that column rather than as a category of its own. When the line is
  // wider than the page it scrolls sideways as one unit instead — `.scroll-x`
  // shades the overflowing edge so the reader can see there is more.
  const gridCols = colPx.map(w => `${w}px`).join(' ')
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
        <div className="scroll-x">
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
              <div key={cat} className="flow-node" style={s(`background:${cBg(cat)};border-color:${cBd(cat)};color:${cTx(cat)};font-size:${catFontSize}px;padding-left:${catPadX}px;padding-right:${catPadX}px;overflow-wrap:anywhere;cursor:default;`)}>{wrappable(cat)}</div>
            ))}
          </div>
          <div style={gridStyle}>
            {cats.map(cat => <div key={cat} className="flow-arrow-v">↓</div>)}
          </div>
          <div style={s(`display:grid;grid-template-columns:${gridCols};gap:6px;min-width:${totalMinPx}px;justify-content:center;align-items:start;`)}>
            {cats.map(cat => (
              <div key={cat} style={s('display:flex;flex-direction:column;gap:4px;')}>
                {groups.get(cat)!.map(le => (
                  <div key={le.id} role="button"
                    style={s(`border-radius:8px;padding:${cardPadding};font-size:${cardFontSize}px;font-weight:600;text-align:center;border:1.5px solid ${cBd(cat)};background:${cBg(cat)};color:${cTx(cat)};cursor:pointer;transition:all .2s;line-height:1.3;overflow-wrap:anywhere;`)}
                    onClick={() => nav.navigate({ kind: 'subTypeDetail', id: le.id })}
                    onMouseOver={e => { e.currentTarget.style.filter = 'brightness(1.2)' }}
                    onMouseOut={e => { e.currentTarget.style.filter = '' }}>
                    {le.sub}
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
