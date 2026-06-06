'use client'
// Diagnostic-approach view — React port of renderDx.ts (renderDxApproach +
// renderDxTabs + the block renderers). Tab nav switches in place via
// nav.replace; block bodies are raw authored HTML rendered through the audited
// <RichText> boundary (with @-link / onclick navigation); diseaseGrid links use
// linkToView. Same .dx-* classes / inline styles → pixel-identical.

import { Fragment } from 'react'
import type { DxApproach, DxBlock, DxNavItem } from '../../lib/signs/dxTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { DX } from '../../lib/signs/dx'
import { RichText } from '../../components/RichText'
import { useNav } from '../nav/NavContext'
import { linkToView, type View } from '../nav/view'
import { styleStringToObject as s } from './style'
import { NotFound } from './NotFound'

const STD_NAV: DxNavItem[] = [
  { key: 'history', label: '📋 History' },
  { key: 'exam', label: '🩺 Exam' },
  { key: 'dx', label: '🔬 Diagnostics' },
]

type Nav = (v: View) => void

// Raw authored-HTML field → audited React elements.
const Raw = ({ html, onNav }: { html: string; onNav: Nav }) => <RichText html={html} onNavigate={onNav} />

function DxTabs({ sign, nav, active, variant = 'std' }: { sign: string; nav: DxNavItem[]; active: string; variant?: string }) {
  const router = useNav()
  const flex = variant === 'flex'
  const cellBase = flex
    ? 'flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;'
    : 'padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;'
  const container = flex
    ? 'display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;'
    : `display:grid;grid-template-columns:repeat(${nav.length},1fr);gap:4px;margin-bottom:14px;`
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
      <div className="dx-step" style={s(`background:rgba(${h.rgb},0.15);border-color:rgba(${h.rgb},0.4);color:${TITLE[b.tone] ?? h.color};`)}>
        <Raw html={b.text} onNav={onNav} />
      </div>
    )
  }
  return <div className={`dx-step${b.alt ? ' alt' : ''}`}><Raw html={b.text} onNav={onNav} /></div>
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
    <div style={s(`margin-top:${b.gap ?? 12}px;padding:10px 14px;background:rgba(${h.rgb},0.1);border:1px solid rgba(${h.rgb},0.25);border-radius:10px;`)}>
      <div style={s(`font-size:10px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:4px;`)}>{b.title}</div>
      <div style={s(`font-size:10px;color:${h.color};line-height:1.6;`)}><Raw html={b.html} onNav={onNav} /></div>
    </div>
  )
}

function DxDiseaseGrid({ b, onNav }: { b: Extract<DxBlock, { kind: 'diseaseGrid' }>; onNav: Nav }) {
  return (
    <div style={s('margin-top:10px;padding:10px 12px;background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.25);border-radius:10px;')}>
      <div style={s('font-size:11px;font-weight:700;color:#5EEAD4;margin-bottom:6px;')}>{b.title}</div>
      <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;')}>
        {b.links.map((l, i) => (
          <div key={i} role="button" style={s('cursor:pointer;color:#99F6E4;')} onClick={() => onNav(linkToView(l.link))}>→ {l.label}</div>
        ))}
      </div>
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
    case 'lesionLink': {
      const bg = b.tone === 'secondary'
        ? 'background:rgba(13,148,136,0.2);border-color:rgba(13,148,136,0.5);'
        : ''
      return (
        <div className="dx-dx" role="button" style={bg ? s(bg) : undefined}
          onClick={() => onNav({ kind: 'lesionLoc', loc: b.loc, name: b.name })}>
          {b.name} →
        </div>
      )
    }
    case 'html': return <Raw html={b.html} onNav={onNav} />
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
