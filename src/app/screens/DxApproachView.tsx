'use client'
// Diagnostic-approach view — React port of renderDx.ts (renderDxApproach +
// renderDxTabs + the block renderers). Tab nav switches in place via
// nav.replace; block bodies are raw authored HTML rendered through the audited
// <RichText> boundary (with @-link / onclick navigation); diseaseGrid links use
// linkToView. Same .dx-* classes / inline styles → pixel-identical.

import { Fragment } from 'react'
import type { DxApproach, DxBlock, DxNavItem, CompTableCell } from '../../lib/signs/dxTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { DX } from '../../lib/signs/dx'
import { RichText } from '../../components/RichText'
import { useNav } from '../nav/NavContext'
import { linkToView } from '../nav/view'
import { styleStringToObject as s, toneBox, SCROLL_X } from './style'
import { NotFound } from './NotFound'
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

function DxComparisonTable({ b, onNav }: { b: Extract<DxBlock, { kind: 'comparisonTable' }>; onNav: Nav }) {
  const fs = b.fontSize ?? '10px'
  const cellPad = '10px 8px'
  const borderRow = '1px solid rgba(var(--slate-muted),0.1)'

  function cellColor(col: typeof b.cols[number], cell: CompTableCell): string {
    if (typeof cell !== 'string' && cell.dim) return 'rgba(var(--slate-muted),0.45)'
    if (col.isLabel) return 'var(--white)'
    return col.color ?? 'var(--white)'
  }
  function cellHtml(cell: CompTableCell): string {
    return typeof cell === 'string' ? cell : cell.html
  }

  const colCount = b.cols.length
  const table = (
    <table style={s(`border-collapse:collapse;font-size:${fs};${b.minWidth ? `min-width:${b.minWidth};` : ''}width:100%;`)}>
      <thead>
        <tr>
          {b.cols.map((col, ci) => {
            const headerColor = col.isLabel ? 'rgba(var(--slate-muted),0.8)' : (col.color ?? 'var(--white)')
            const borderB = col.isLabel
              ? '2px solid rgba(var(--slate-muted),0.3)'
              : col.color ? `2px solid ${col.color}` : '2px solid rgba(var(--slate-muted),0.3)'
            return (
              <th key={ci} style={s(`padding:${cellPad};font-size:${fs};font-weight:700;color:${headerColor};border-bottom:${borderB};text-align:${ci === 0 ? 'left' : 'center'};white-space:nowrap;${col.width ? `width:${col.width};` : ''}`)}>
                {col.label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {b.rows.map((row, ri) => {
          if (row.kind === 'section') {
            return (
              <tr key={ri}>
                <td colSpan={colCount} style={s(`padding:14px 8px 4px;font-size:8px;font-weight:700;color:rgba(var(--slate-muted),0.6);letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),0.15);`)}>
                  {row.label}
                </td>
              </tr>
            )
          }
          return (
            <tr key={ri}>
              {row.cells.map((cell, ci) => {
                const col = b.cols[ci]
                const color = cellColor(col, cell)
                const fw = col.isLabel ? '600' : undefined
                const align = ci === 0 ? 'left' : 'center'
                return (
                  <td key={ci} style={s(`padding:${cellPad};font-size:${fs};color:${color};${fw ? `font-weight:${fw};` : ''}text-align:${align};border-bottom:${borderRow};line-height:1.4;`)}>
                    <RichText html={cellHtml(cell)} onNavigate={onNav} />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  return (
    <div>
      {b.label && (
        <div style={s('font-size:10px;font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')}>
          {b.label}
        </div>
      )}
      {b.scrollable !== false ? (
        <div style={s(SCROLL_X)}>{table}</div>
      ) : table}
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
    case 'comparisonTable': return <DxComparisonTable b={b} onNav={onNav} />
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
