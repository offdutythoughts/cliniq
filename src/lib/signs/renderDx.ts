// ── Generic diagnostic-approach renderer ────────────────────────────────────
// Turns a DxApproach (data) into the same `.dx-*` HTML the app already uses, so
// the output is visually equivalent to the legacy hand-authored Dx views. Pure:
// returns an HTML string; serialises Links via the shared onclick() from
// renderFlow. The Dx counterpart to renderFlowPage.

import type { DxApproach, DxBlock, DxCard, DxNavItem, DxTab } from './dxTypes'
import { HUE, TITLE, esc, onclick } from './renderFlow'

const DX_ARROW = '<div class="dx-arrow">↓</div>'

// ── Tab nav. Standard signs get 📋 History · 🩺 Exam · 🔬 Diagnostics. ─────────
const STD_NAV: DxNavItem[] = [
  { key: 'history', label: '📋 History' },
  { key: 'exam', label: '🩺 Exam' },
  { key: 'dx', label: '🔬 Diagnostics' },
]
type NavVariant = 'std' | 'alt' | 'flex' | 'pupd'
function renderDxTabs(sign: string, nav: DxNavItem[], active: string, variant: NavVariant = 'std'): string {
  const flex = variant === 'flex'
  const cellBase = flex
    ? 'flex:1;min-width:0;padding:6px 10px;font-size:10px;cursor:pointer;text-align:center;'
    : 'padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;'
  const cells = nav.map((t, i) => {
    const on = t.key === active
    // 'std' encodes active in the class (active = no `alt`); the others alternate
    // the class by position and reflect active via opacity only.
    const cls = variant === 'std' ? `dx-step${on ? '' : ' alt'}` : (i % 2 === 1 ? 'dx-step alt' : 'dx-step')
    const op = on
      ? (variant === 'pupd' ? 'opacity:1;' : '')
      : (flex ? 'opacity:.65;' : 'opacity:.5;')
    return `<div class="${cls}" style="${cellBase}${op}" onclick="renderDxId('${sign}','${t.key}')">${t.label}</div>`
  }).join('')
  const container = flex
    ? 'display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;'
    : `display:grid;grid-template-columns:repeat(${nav.length},1fr);gap:4px;margin-bottom:14px;`
  return `<div style="${container}">${cells}</div>`
}

// ── Blocks ────────────────────────────────────────────────────────────────────
function renderStep(b: Extract<DxBlock, { kind: 'step' }>): string {
  if (b.tone) {
    const h = HUE[b.tone]
    return `<div class="dx-step" style="background:rgba(${h.rgb},0.15);border-color:rgba(${h.rgb},0.4);color:${TITLE[b.tone] ?? h.color};">${b.text}</div>`
  }
  return `<div class="dx-step${b.alt ? ' alt' : ''}">${b.text}</div>`
}

function renderRow(cols: number, items: DxCard[]): string {
  const cards = items
    .map(c => `<div class="dx-test"${c.style ? ` style="${c.style}"` : ''}>${c.html}</div>`)
    .join('')
  return `<div class="dx-row c${cols}">${cards}</div>`
}

function renderCallout(b: Extract<DxBlock, { kind: 'callout' }>): string {
  const h = HUE[b.tone]
  return `<div style="margin-top:${b.gap ?? 12}px;padding:10px 14px;background:rgba(${h.rgb},0.1);border:1px solid rgba(${h.rgb},0.25);border-radius:10px;"><div style="font-size:10px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:4px;">${b.title}</div><div style="font-size:10px;color:${h.color};line-height:1.6;">${b.html}</div></div>`
}

function renderDiseaseGrid(b: Extract<DxBlock, { kind: 'diseaseGrid' }>): string {
  const cells = b.links
    .map(l => `<div onclick="${onclick(l.link)}" style="cursor:pointer;color:#99F6E4;">→ ${esc(l.label)}</div>`)
    .join('')
  return `<div style="margin-top:10px;padding:10px 12px;background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.25);border-radius:10px;"><div style="font-size:11px;font-weight:700;color:#5EEAD4;margin-bottom:6px;">${esc(b.title)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;">${cells}</div></div>`
}

function renderDxBlock(b: DxBlock): string {
  switch (b.kind) {
    case 'branch':      return `<div class="dx-branch">${b.text}</div>`
    case 'step':        return renderStep(b)
    case 'check':       return `<div class="dx-check"${b.style ? ` style="${b.style}"` : ''}>${b.html}</div>`
    case 'row':         return renderRow(b.cols ?? b.items.length, b.items)
    case 'alert':       return `<div class="dx-alert"${b.gap ? ` style="margin-top:${b.gap}px;"` : ''}>${b.html}</div>`
    case 'callout':     return renderCallout(b)
    case 'diseaseGrid': return renderDiseaseGrid(b)
    case 'note':        return `<div class="dx-note"${b.style ? ` style="${b.style}"` : ''}>${b.html}</div>`
    case 'html':        return b.html
    case 'disclaimer':  return '<div class="disclaimer">For qualified veterinary professionals only.</div>'
  }
}

/** Render one tab of a sign's diagnostic approach to an HTML string: the 3-tab
 *  nav, the `.dx-wrap` spine (arrow-connected `blocks`), then any `after` boxes
 *  outside the wrap. */
export function renderDxApproach(sign: string, approach: DxApproach, active: string): string {
  const nav = approach.nav ?? STD_NAV
  const tab: DxTab = approach.tabs[active] ?? approach.tabs.history
  // Arrow spine: a .dx-arrow between consecutive blocks, unless the preceding
  // block sets noArrowAfter (legacy arrow placement is author-controlled).
  let spine = ''
  tab.blocks.forEach((b, i) => {
    if (i > 0 && !tab.blocks[i - 1].noArrowAfter) spine += DX_ARROW
    spine += renderDxBlock(b)
  })
  const wrap = `<div class="dx-wrap">${spine}</div>`
  const after = (tab.after ?? []).map(renderDxBlock).join('')
  return renderDxTabs(sign, nav, active, approach.navVariant) + wrap + after
}
