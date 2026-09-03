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
import { linkToView } from '../nav/view'
import { styleStringToObject as s, toneBox } from './style'
import { NotFound } from './NotFound'
import { GridTable } from './gridTable'
import { type Nav, Raw, ToneBox } from './flowHelpers'

const STD_NAV: DxNavItem[] = [
  { key: 'history', label: '📋 History' },
  { key: 'exam', label: '🩺 Exam' },
  { key: 'dx', label: '🔬 Diagnostics' },
]

function DxTabs({ sign, nav, active, variant = 'std' }: { sign: string; nav: DxNavItem[]; active: string; variant?: string }) {
  const router = useNav()
  const flex = variant === 'flex'
  const cellBase = flex
    ? 'flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;'
    : 'padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;'
  const container = flex
    ? 'display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;'
    : `display:grid;grid-template-columns:repeat(${nav.length},minmax(0,1fr));gap:4px;margin-bottom:14px;`
  return (
    <div style={s(container)}>
      {nav.map((t, i) => {
        const on = t.key === active
        const cls = variant === 'std' ? `dx-step${on ? '' : ' alt'}` : i % 2 === 1 ? 'dx-step alt' : 'dx-step'
        const op = on ? (variant === 'pupd' ? 'opacity:1;' : '') : flex ? 'opacity:.65;' : 'opacity:.5;'
        return (
          <div key={t.key} className={cls} style={s(cellBase + op)} role="button"
            onClick={() => router.replace({ kind: 'dx', sign, tab: t.key })}>
            {t.label}
          </div>
        )
      })}
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
  return (
    <div className={`dx-row c${cols}`}>
      {b.items.map((c, i) => (
        <div key={i} className={cls} style={c.style ? s(c.style) : undefined}><Raw html={c.html} onNav={onNav} /></div>
      ))}
    </div>
  )
}

function DxCallout({ b, onNav }: { b: Extract<DxBlock, { kind: 'callout' }>; onNav: Nav }) {
  const h = HUE[b.tone]
  return (
    <ToneBox tone={b.tone} extra={`margin-top:${b.gap ?? 12}px;padding:10px 14px;`}>
      <div style={s(`font-size:10px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:4px;`)}>{b.title}</div>
      <div style={s(`font-size:10px;color:${h.color};line-height:1.6;`)}><Raw html={b.html} onNav={onNav} /></div>
    </ToneBox>
  )
}

function DxDiseaseGrid({ b, onNav }: { b: Extract<DxBlock, { kind: 'diseaseGrid' }>; onNav: Nav }) {
  return (
    <ToneBox tone="teal" extra="margin-top:10px;padding:10px 12px;">
      <div style={s('font-size:11px;font-weight:700;color:var(--tone-teal-fg);margin-bottom:6px;')}>{b.title}</div>
      <div style={s('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px;font-size:9.5px;')}>
        {b.links.map((l, i) => (
          <div key={i} role="button" style={s('cursor:pointer;color:var(--fg-teal-deep);')} onClick={() => onNav(linkToView(l.link))}>→ {l.label}</div>
        ))}
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
 *  a species and tap (or type) the breed, and only the matching clues render;
 *  "Show all" keeps the whole list one tap away. */
function DxBreedClues({ b, onNav }: { b: Extract<DxBlock, { kind: 'breedClues' }>; onNav: Nav }) {
  const dog = b.dog ?? []
  const cat = b.cat ?? []
  const both = dog.length > 0 && cat.length > 0
  const [sp, setSp] = useState<'dog' | 'cat'>(dog.length ? 'dog' : 'cat')
  const [sel, setSel] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [all, setAll] = useState(false)
  const clues = sp === 'dog' ? dog : cat
  const h = HUE[sp === 'dog' ? 'info' : 'orange']

  // Chips: every breed named by any clue, deduped. Breeds sort alphabetically
  // (you scan for a name); the non-breed keys ("Older intact male") keep author
  // order in their own row, so the breed list stays a breed list.
  const { breeds, other } = useMemo(() => {
    const seen = new Map<string, boolean>()
    for (const c of clues) for (const name of c.breeds) if (!seen.has(name)) seen.set(name, c.group === 'signalment')
    const entries = [...seen.entries()]
    return {
      breeds: entries.filter(([, sig]) => !sig).map(([n]) => n).sort((x, y) => x.localeCompare(y)),
      other: entries.filter(([, sig]) => sig).map(([n]) => n),
    }
  }, [clues])

  const needle = q.trim().toLowerCase()
  const hit = (n: string) => !needle || n.toLowerCase().includes(needle)
  const shown = sel ? clues.filter(c => c.breeds.includes(sel)) : all ? clues : []

  const pickSpecies = (next: 'dog' | 'cat') => { setSp(next); setSel(null); setQ('') }
  const pickBreed = (name: string) => { setSel(cur => (cur === name ? null : name)); setAll(false) }

  const chip = (name: string) => {
    const on = sel === name
    return (
      <button key={name} type="button" aria-pressed={on} onClick={() => pickBreed(name)}
        style={s(`padding:5px 9px;border-radius:999px;font-size:10px;line-height:1.2;cursor:pointer;text-align:left;border:1px solid ${on ? `rgba(${h.rgb},var(--tile-bd-a))` : 'var(--border)'};background:${on ? `rgba(${h.rgb},var(--tile-bg-a))` : 'transparent'};color:${on ? h.color : 'var(--gray)'};font-weight:${on ? 700 : 500};`)}>
        {name}
      </button>
    )
  }
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

  const visibleBreeds = breeds.filter(hit)
  const visibleOther = other.filter(hit)
  const total = breeds.length + other.length

  return (
    <ToneBox tone="teal" extra="padding:10px 12px;width:100%;">
      <div style={s('display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--tone-teal-fg);')}>
          {b.title ?? '🐾 Breed & signalment clues'}
        </div>
        <button type="button" aria-pressed={all} onClick={() => { setAll(v => !v); setSel(null) }}
          style={s(`padding:3px 8px;border-radius:999px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid ${all ? 'rgba(var(--tone-teal),var(--tile-bd-a))' : 'var(--border)'};background:${all ? 'rgba(var(--tone-teal),var(--tile-bg-a))' : 'transparent'};color:${all ? 'var(--tone-teal-fg)' : 'var(--gray2)'};flex-shrink:0;`)}>
          {all ? '✓ All' : 'Show all'}
        </button>
      </div>

      {both && <div style={s('display:flex;gap:6px;margin-bottom:7px;')}>{spBtn('dog', '🐕 Dog')}{spBtn('cat', '🐈 Cat')}</div>}

      {total > 8 && (
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={`Filter ${total} ${sp === 'dog' ? 'dog' : 'cat'} entries…`}
          style={s('width:100%;box-sizing:border-box;background:var(--navy3);border:1px solid var(--border);border-radius:8px;padding:5px 9px;font-size:11px;color:var(--white);outline:none;margin-bottom:7px;')} />
      )}

      <div style={s('display:flex;flex-wrap:wrap;gap:4px;')}>{visibleBreeds.map(chip)}</div>
      {visibleOther.length > 0 && (
        <>
          {breeds.length > 0 && (
            <div style={s('font-size:9px;color:var(--gray2);margin:7px 0 4px;text-transform:uppercase;letter-spacing:.06em;')}>Not breed-specific</div>
          )}
          <div style={s('display:flex;flex-wrap:wrap;gap:4px;')}>{visibleOther.map(chip)}</div>
        </>
      )}
      {visibleBreeds.length === 0 && visibleOther.length === 0 && (
        <div style={s('font-size:10px;color:var(--gray2);')}>No entry for “{q.trim()}” — this sign has no clue recorded for that breed.</div>
      )}

      {shown.length > 0 ? (
        <div style={s('display:flex;flex-direction:column;gap:5px;margin-top:8px;')}>
          {shown.map((c, i) => {
            const ch = HUE[c.tone ?? 'teal']
            return (
              <div key={i} style={s(`border-radius:8px;padding:7px 9px;font-size:10px;line-height:1.55;background:rgba(${ch.rgb},var(--tile-bg-a));color:var(--gray);border-left:2px solid rgba(${ch.rgb},var(--tile-bd-a));`)}>
                <span style={s(`font-weight:700;color:${ch.color};`)}>{c.breeds.join(' · ')}</span>{' — '}
                <Raw html={c.html} onNav={onNav} />
              </div>
            )
          })}
        </div>
      ) : (
        <div style={s('font-size:9.5px;color:var(--gray2);margin-top:8px;')}>Tap {breeds.length ? 'a breed' : 'an entry'} to see its clues.</div>
      )}
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
  const line = (label: string, hh: { rgb: string; color: string }, html: string) => (
    <div style={s('display:flex;gap:7px;align-items:baseline;')}>
      <span style={s(`flex-shrink:0;font-size:8.5px;font-weight:700;letter-spacing:.06em;color:${hh.color};width:22px;`)}>{label}</span>
      <span style={s('flex:1;min-width:0;')}><Raw html={html} onNav={onNav} /></span>
    </div>
  )
  return (
    <div style={s(`margin-top:${b.gap ?? 10}px;width:100%;display:flex;flex-direction:column;gap:6px;`)}>
      <div style={s('font-size:10px;font-weight:700;color:var(--tone-indigo-fg);')}>
        {b.title ?? '🔑 Canine vs feline — key differences'}
      </div>
      {b.rows.map((r, i) => (
        <div key={i} style={s('border-radius:9px;padding:8px 10px;background:var(--card);border:1px solid var(--border);font-size:9.5px;line-height:1.55;color:var(--gray);')}>
          <div style={s('font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--tone-indigo-fg);margin-bottom:5px;')}>{r.feature}</div>
          <div style={s('display:flex;flex-direction:column;gap:4px;')}>
            {line('DOG', dogH, r.dog)}
            {line('CAT', catH, r.cat)}
          </div>
        </div>
      ))}
    </div>
  )
}

function DxBlockView({ b, onNav }: { b: DxBlock; onNav: Nav }) {
  switch (b.kind) {
    case 'branch': return <div className="dx-branch"><Raw html={b.text} onNav={onNav} /></div>
    case 'step': return <DxStep b={b} onNav={onNav} />
    case 'check': return <div className="dx-check" style={b.style ? s(b.style) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'row': return <DxRow b={b} onNav={onNav} />
    case 'alert': return <div className="dx-alert" style={b.gap ? s(`margin-top:${b.gap}px;`) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'callout': return <DxCallout b={b} onNav={onNav} />
    case 'diseaseGrid': return <DxDiseaseGrid b={b} onNav={onNav} />
    case 'note': return <div className="dx-note" style={b.style ? s(b.style) : undefined}><Raw html={b.html} onNav={onNav} /></div>
    case 'accordion': return <DxAccordion b={b} onNav={onNav} />
    case 'breedClues': return <DxBreedClues b={b} onNav={onNav} />
    case 'speciesDiff': return <DxSpeciesDiff b={b} onNav={onNav} />
    case 'lesionLink': {
      const bg = b.tone === 'secondary'
        ? 'background:rgba(var(--tone-teal),0.2);border-color:rgba(var(--tone-teal),0.5);'
        : ''
      return (
        <div className="dx-dx" role="button" style={bg ? s(bg) : undefined}
          onClick={() => onNav({ kind: 'lesionLoc', loc: b.loc, name: b.name })}>
          {b.name} →
        </div>
      )
    }
    case 'gridTable': return (
      <div style={s(`margin-top:${b.gap ?? 10}px;width:100%;`)}>
        {b.label && (
          <div style={s('font-size:10px;font-weight:700;color:var(--tone-teal-fg);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')}>
            {b.label}
          </div>
        )}
        <GridTable cols={b.cols} headers={b.headers} rows={b.rows} dividers={b.dividers}
          scroll={b.scroll} minWidth={b.minWidth} fontSize={b.fontSize} onNav={onNav} />
      </div>
    )
    case 'html': return <div className="flow-authored scroll-x"><Raw html={b.html} onNav={onNav} /></div>
    case 'disclaimer': return <div className="disclaimer">For qualified veterinary professionals only.</div>
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
      <DxTabs sign={sign} nav={nav} active={active} variant={approach.navVariant} />
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
