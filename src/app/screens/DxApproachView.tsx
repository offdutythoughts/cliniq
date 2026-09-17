'use client'
// Diagnostic-approach view — React port of renderDx.ts (renderDxApproach +
// renderDxTabs + the block renderers). Tab nav switches in place via
// nav.replace; block bodies are raw authored HTML rendered through the audited
// <RichText> boundary (with @-link / onclick navigation); diseaseGrid links use
// linkToView. Same .dx-* classes / inline styles → pixel-identical.

import { Fragment, useMemo, useState } from 'react'
import type { DxApproach, DxBlock, DxNavItem } from '../../lib/signs/dxTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { DX } from '../../lib/signs/dx'
import { useNav } from '../nav/NavContext'
import { styleStringToObject as s, toneBox } from './style'
import { NotFound } from './NotFound'
import { GridTable } from './gridTable'
import { PatternList } from './patternList'
import { type Nav, Raw, ToneBox } from './flowHelpers'
import { Tappable } from './Tappable'
import { AuthoredHtml, CalloutBody, DISCLAIMER, DiseaseGrid } from './sharedBlocks'

/** The quiet teal caption above a table or a row of cards. --fs-label is the
 *  scale's "uppercase section title" role; spelling it 10px inline, as both
 *  call sites used to, put it outside the type scale. */
const CAPTION = s('font-size:var(--fs-label);font-weight:700;color:var(--tone-teal-fg);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')

/** The tinted breed-clue line — one box per clue under "Show all", one box for
 *  the whole set under a picked breed. Both modes spelled the same seven
 *  declarations inline, including a hardcoded 10px; --fs-chip-sub is that size's
 *  role on the scale, so the two render identically and neither is a size chosen
 *  at a call site. */
const clueBox = (rgb: string) => s(`border-radius:8px;padding:7px 9px;font-size:var(--fs-chip-sub);line-height:1.55;`
  + `background:rgba(${rgb},var(--tile-bg-a));color:var(--gray);border-left:2px solid rgba(${rgb},var(--tile-bd-a));`)

const STD_NAV: DxNavItem[] = [
  { key: 'history', label: '📋 History' },
  { key: 'exam', label: '🩺 Exam' },
  { key: 'dx', label: '🔬 Diagnostics' },
]

/** One tab strip for every sign.
 *
 *  There were four (`navVariant`: std / alt / flex / pupd), kept to match
 *  hand-authored markup byte-for-byte, and between them they alternated colours
 *  by position, signalled the selected tab with three different opacities, and
 *  borrowed `.dx-step` — the class used by step headers inside the page — so the
 *  control was styled as content. Five of 37 signs opted into a variant; the
 *  reader met a differently-behaved strip on those five for no reason they could
 *  act on.
 *
 *  `aria-current` carries the state to assistive tech; `.dx-tab` tiers it
 *  visually — the selected tab solid teal, the rest the same teal held back. */
function DxTabs({ sign, nav, active }: { sign: string; nav: DxNavItem[]; active: string }) {
  const router = useNav()
  return (
    <div className="dx-tabs">
      {nav.map(t => (
        <button
          key={t.key}
          type="button"
          className="dx-tab"
          aria-current={t.key === active ? 'page' : undefined}
          onClick={() => router.replace({ kind: 'dx', sign, tab: t.key })}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function DxStep({ b, onNav }: { b: Extract<DxBlock, { kind: 'step' }>; onNav: Nav }) {
  if (b.tone) {
    const h = HUE[b.tone]
    return (
      <div className="dx-step" style={s(`${toneBox(h.rgb,h.color).bg}border-color:rgba(${h.rgb},var(--tile-bd-a));color:${TITLE[b.tone] ?? h.color};`)}>
        <Raw html={b.text} onNav={onNav} />
      </div>
    )
  }
  return <div className="dx-step"><Raw html={b.text} onNav={onNav} /></div>
}

function DxRow({ b, onNav }: { b: Extract<DxBlock, { kind: 'row' }>; onNav: Nav }) {
  const cols = b.cols ?? b.items.length
  const cls = b.itemKind === 'check' ? 'dx-check' : 'dx-test'
  const row = (
    <div className={`dx-row c${cols}`}>
      {b.items.map((c, i) => (
        <div key={i} className={cls} style={c.style ? s(c.style) : undefined}><Raw html={c.html} onNav={onNav} /></div>
      ))}
    </div>
  )
  // Same quiet teal caption `gridTable` uses. A characterisation band that asks
  // two independent questions needs to say so; without it, consecutive rows
  // read as one set of cards that happened to wrap.
  if (!b.label) return row
  return (
    <div style={s('width:100%;')}>
      <div style={CAPTION}>
        {b.label}
      </div>
      {row}
    </div>
  )
}

function DxCallout({ b, onNav }: { b: Extract<DxBlock, { kind: 'callout' }>; onNav: Nav }) {
  const h = HUE[b.tone]
  return (
    <ToneBox tone={b.tone} extra={`margin-top:${b.gap ?? 12}px;padding:10px 14px;`}>
      {/* title and center come from the shared CalloutPayload, so both surfaces
          have to honour them — a field the type advertises and this renderer
          dropped would be a silent no-op for whoever authored it. */}
      {b.title && <div style={s(`font-size:10px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:4px;`)}>{b.title}</div>}
      <div style={s(`font-size:10px;color:${h.color};line-height:1.6;${b.center ? 'text-align:center;' : ''}`)}>
        <CalloutBody html={b.html} items={b.items} onNav={onNav} />
      </div>
    </ToneBox>
  )
}

function DxAccordion({ b, onNav }: { b: Extract<DxBlock, { kind: 'accordion' }>; onNav: Nav }) {
  const grid = b.cols ? `display:grid;grid-template-columns:repeat(${b.cols},minmax(0,1fr));gap:6px;align-items:start;` : 'display:flex;flex-direction:column;gap:6px;'
  return (
    <div style={s(grid)}>
      {b.items.map((item, i) => (
        <ToneBox key={i} tone="teal" extra="overflow:hidden;">
          <details>
            <summary style={s('padding:10px 12px;font-size:11px;font-weight:700;color:var(--tone-teal-fg);cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;')}>
              {item.title}
              <span style={s('font-size:10px;opacity:.6;flex-shrink:0;margin-left:8px;')}>▸ tap to expand</span>
            </summary>
            <div style={s('padding:8px 12px 10px;font-size:10.5px;line-height:1.6;color:var(--gray);border-top:1px solid rgba(var(--tone-teal),0.15);')}>
              <Raw html={item.html} onNav={onNav} />
            </div>
          </details>
        </ToneBox>
      ))}
    </div>
  )
}

// ── Breed / signalment picker ────────────────────────────────────────────────
/** The breed sections used to be two columns of a dozen breed→clue paragraphs
 *  each — a wall you had to read end to end to find your patient. Here you pick
 *  a species and a breed and only the matching clues render.
 *
 *  A native <select> rather than a grid of chips: twenty-odd chips cost ~400px
 *  of scroll before the first clue appears, which is the wall again in a nicer
 *  font. The select is one row high, gets the OS picker on a phone, and takes
 *  type-ahead on a desktop keyboard for free. "Show all" keeps the whole list
 *  one tap away. */
function DxBreedClues({ b, onNav }: { b: Extract<DxBlock, { kind: 'breedClues' }>; onNav: Nav }) {
  const dog = b.dog ?? []
  const cat = b.cat ?? []
  const both = dog.length > 0 && cat.length > 0
  const [sp, setSp] = useState<'dog' | 'cat'>(dog.length ? 'dog' : 'cat')
  const [sel, setSel] = useState('')
  const [all, setAll] = useState(false)
  const clues = sp === 'dog' ? dog : cat
  const h = HUE[sp === 'dog' ? 'info' : 'orange']

  // Every breed named by any clue, deduped. Breeds sort alphabetically (you
  // scan for a name); the non-breed keys ("Older intact male") keep author
  // order in their own optgroup, so the breed list stays a breed list.
  const { breeds, other } = useMemo(() => {
    const seen = new Map<string, boolean>()
    for (const c of clues) for (const name of c.breeds) if (!seen.has(name)) seen.set(name, c.group === 'signalment')
    const entries = [...seen.entries()]
    return {
      breeds: entries.filter(([, sig]) => !sig).map(([n]) => n).sort((x, y) => x.localeCompare(y)),
      other: entries.filter(([, sig]) => sig).map(([n]) => n),
    }
  }, [clues])

  const shown = sel ? clues.filter(c => c.breeds.includes(sel)) : all ? clues : []

  const pickSpecies = (next: 'dog' | 'cat') => { setSp(next); setSel('') }
  const spBtn = (id: 'dog' | 'cat', label: string) => {
    const on = sp === id
    const hh = HUE[id === 'dog' ? 'info' : 'orange']
    return (
      <button type="button" aria-pressed={on} onClick={() => pickSpecies(id)}
        style={s(`flex:1;padding:6px 10px;border-radius:9px;font-size:11px;font-weight:700;line-height:1;cursor:pointer;border:1.5px solid ${on ? `rgba(${hh.rgb},var(--tile-bd-a))` : 'var(--border)'};background:${on ? `rgba(${hh.rgb},var(--tile-bg-a))` : 'transparent'};color:${on ? hh.color : 'var(--gray2)'};`)}>
        {label}
      </button>
    )
  }

  return (
    <ToneBox tone="teal" extra="padding:10px 12px;width:100%;">
      <div style={s('display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--tone-teal-fg);')}>
          {b.title ?? '🐾 Breed & signalment clues'}
        </div>
        <button type="button" aria-pressed={all} onClick={() => { setAll(v => !v); setSel('') }}
          style={s(`padding:3px 8px;border-radius:999px;font-size:var(--fs-chip);font-weight:700;cursor:pointer;border:1px solid ${all ? 'rgba(var(--tone-teal),var(--tile-bd-a))' : 'var(--border)'};background:${all ? 'rgba(var(--tone-teal),var(--tile-bg-a))' : 'transparent'};color:${all ? 'var(--tone-teal-fg)' : 'var(--gray2)'};flex-shrink:0;`)}>
          {all ? '✓ All' : 'Show all'}
        </button>
      </div>

      {both && <div style={s('display:flex;gap:6px;margin-bottom:6px;')}>{spBtn('dog', '🐕 Dog')}{spBtn('cat', '🐈 Cat')}</div>}

      <select value={sel} onChange={e => { setSel(e.target.value); setAll(false) }}
        aria-label={`Breed or signalment (${sp === 'dog' ? 'dog' : 'cat'})`}
        style={s(`width:100%;box-sizing:border-box;background:var(--navy3);border:1px solid ${sel ? `rgba(${h.rgb},var(--tile-bd-a))` : 'var(--border)'};border-radius:8px;padding:6px 9px;font-size:11px;color:${sel ? h.color : 'var(--gray)'};font-weight:${sel ? 700 : 400};outline:none;`)}>
        <option value="">{breeds.length ? 'Select a breed…' : 'Select an entry…'}</option>
        {breeds.length > 0 && (
          <optgroup label="Breeds">
            {breeds.map(n => <option key={n} value={n}>{n}</option>)}
          </optgroup>
        )}
        {other.length > 0 && (
          <optgroup label="Not breed-specific">
            {other.map(n => <option key={n} value={n}>{n}</option>)}
          </optgroup>
        )}
      </select>

      {/* With a breed picked, the breed is named once and its clues sit under it:
        * the other breeds sharing each clue are noise you did not ask for, and a
        * box per differential makes two diseases of one patient look unrelated.
        * "Show all" has no single subject, so there each clue keeps its breeds. */}
      {shown.length > 0 && (sel ? (
        <div style={{ ...clueBox(h.rgb), marginTop: '7px' }}>
          <span style={s(`font-weight:700;color:${h.color};`)}>{sel}</span>
          {shown.length === 1
            ? <>{' — '}<Raw html={shown[0].html} onNav={onNav} /></>
            : (
              <div style={s('display:flex;flex-direction:column;gap:3px;margin-top:4px;')}>
                {shown.map((c, i) => (
                  <div key={i} style={s('display:flex;gap:6px;')}>
                    <span style={s(`flex-shrink:0;color:${h.color};`)}>·</span>
                    <span style={s('flex:1;min-width:0;')}><Raw html={c.html} onNav={onNav} /></span>
                  </div>
                ))}
              </div>
            )}
        </div>
      ) : (
        <div style={s('display:flex;flex-direction:column;gap:5px;margin-top:7px;')}>
          {shown.map((c, i) => {
            const ch = HUE[c.tone ?? 'teal']
            return (
              <div key={i} style={clueBox(ch.rgb)}>
                <span style={s(`font-weight:700;color:${ch.color};`)}>{c.breeds.join(' · ')}</span>{' — '}
                <Raw html={c.html} onNav={onNav} />
              </div>
            )
          })}
        </div>
      ))}
    </ToneBox>
  )
}

// ── Canine vs feline ─────────────────────────────────────────────────────────
/** One card per feature: the feature is named once as a heading, then the dog
 *  and cat lines sit under it. The old paired-column grid repeated the feature
 *  name in both cells and forced the reader to align two columns by eye. */
function DxSpeciesDiff({ b, onNav }: { b: Extract<DxBlock, { kind: 'speciesDiff' }>; onNav: Nav }) {
  const dogH = HUE.info
  const catH = HUE.orange
  // A word, not an emoji: 🐕 and 🐈 are the same small brown shape at 9px, and
  // which species a line belongs to is the one thing that must never be guessed.
  // Lower case, not caps — the label is a quiet gutter marker beside the finding,
  // and the feature heading above is already the shouting row.
  const line = (label: string, hh: { rgb: string; color: string }, html: string) => (
    <div style={s('display:flex;gap:7px;align-items:baseline;')}>
      <span style={s(`flex-shrink:0;font-size:var(--fs-chip-sub);font-weight:700;letter-spacing:.06em;color:${hh.color};width:22px;`)}>{label}</span>
      <span style={s('flex:1;min-width:0;')}><Raw html={html} onNav={onNav} /></span>
    </div>
  )
  return (
    <div style={s(`margin-top:${b.gap ?? 10}px;width:100%;display:flex;flex-direction:column;gap:6px;`)}>
      <div style={s('font-size:10px;font-weight:700;color:var(--tone-indigo-fg);')}>
        {b.title ?? '🔑 Canine vs feline — key differences'}
      </div>
      {b.rows.map((r, i) => (
        <div key={i} style={s('border-radius:9px;padding:8px 10px;background:var(--card);border:1px solid var(--border);font-size:var(--fs-box);line-height:1.55;color:var(--gray);')}>
          <div style={s('font-size:var(--fs-chip);font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--tone-indigo-fg);margin-bottom:5px;')}>{r.feature}</div>
          <div style={s('display:flex;flex-direction:column;gap:4px;')}>
            {line('dog', dogH, r.dog)}
            {line('cat', catH, r.cat)}
          </div>
        </div>
      ))}
    </div>
  )
}

function DxBlockView({ b, onNav }: { b: DxBlock; onNav: Nav }) {
  switch (b.kind) {
    case 'goal': return <div className="dx-branch"><Raw html={b.text} onNav={onNav} /></div>
    case 'step': return <DxStep b={b} onNav={onNav} />
    case 'check': return <div className="dx-check" style={b.style ? s(b.style) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'row': return <DxRow b={b} onNav={onNav} />
    case 'pearls': return <div className="dx-alert" style={b.gap ? s(`margin-top:${b.gap}px;`) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'callout': return <DxCallout b={b} onNav={onNav} />
    case 'diseaseGrid': return <DiseaseGrid title={b.title} links={b.links} onNav={onNav} />
    case 'note': return <div className="dx-note" style={b.style ? s(b.style) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'accordion': return <DxAccordion b={b} onNav={onNav} />
    case 'breedClues': return <DxBreedClues b={b} onNav={onNav} />
    case 'speciesDiff': return <DxSpeciesDiff b={b} onNav={onNav} />
    case 'lesionLink': {
      const bg = b.tone === 'secondary'
        ? 'background:rgba(var(--tone-teal),0.2);border-color:rgba(var(--tone-teal),0.5);'
        : ''
      return (
        <Tappable className="dx-dx" style={bg ? s(bg) : undefined}
          onTap={() => onNav({ kind: 'lesionLoc', loc: b.loc, name: b.name })}>
          {b.name} →
        </Tappable>
      )
    }
    case 'patterns': return <PatternList rows={b.rows} label={b.label} caption={b.caption} gap={b.gap} onNav={onNav} />
    case 'gridTable': return (
      <div style={s(`margin-top:${b.gap ?? 10}px;width:100%;`)}>
        {b.label && (
          <div style={CAPTION}>
            {b.label}
          </div>
        )}
        <GridTable cols={b.cols} headers={b.headers} rows={b.rows} dividers={b.dividers}
          collapsibleSections={b.collapsibleSections}
          stickyFirstCol={b.stickyFirstCol} scroll={b.scroll} minWidth={b.minWidth} fontSize={b.fontSize} onNav={onNav} />
      </div>
    )
    case 'html': return <AuthoredHtml html={b.html} onNav={onNav} />
    case 'disclaimer': return DISCLAIMER
  }
}

export function DxApproachView({ sign, active }: { sign: string; active: string }) {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const approach: DxApproach | undefined = DX[sign]
  if (!approach) return <NotFound what="Diagnostic approach" />
  const nav = approach.nav ?? STD_NAV
  const tab = approach.tabs[active] ?? approach.tabs.history
  return (
    <>
      <DxTabs sign={sign} nav={nav} active={active} />
      <div className="dx-wrap">
        {tab.blocks.map((b, i) => (
          <Fragment key={i}>
            {i > 0 && !tab.blocks[i - 1].noArrowAfter && <div className="dx-arrow">↓</div>}
            <DxBlockView b={b} onNav={onNav} />
          </Fragment>
        ))}
      </div>
      {(tab.after ?? []).map((b, i) => <DxBlockView key={i} b={b} onNav={onNav} />)}
    </>
  )
}
