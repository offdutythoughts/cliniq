// ── Generic diagnostic-approach renderer ────────────────────────────────────
// Turns a DxApproach (data) into the same `.dx-*` HTML the app already uses, so
// the output is visually equivalent to the legacy hand-authored Dx views. Pure:
// returns an HTML string; serialises Links via the shared onclick() from
// renderFlow. The Dx counterpart to renderFlowPage. See DATA_MIGRATION.md.

import type { DxApproach, DxBlock, DxCard, DxTab, DxTabKey } from './dxTypes'
import { HUE, TITLE, esc, onclick } from './renderFlow'

const DX_ARROW = '<div class="dx-arrow">↓</div>'

// ── 3-tab nav (📋 History · 🩺 Exam · 🔬 Diagnostics) ─────────────────────────
const TABS: { key: DxTabKey; label: string }[] = [
  { key: 'history', label: '📋 History' },
  { key: 'exam', label: '🩺 Exam' },
  { key: 'dx', label: '🔬 Diagnostics' },
]
function renderDxTabs(sign: string, active: DxTabKey): string {
  const cells = TABS.map(t => {
    const on = t.key === active
    return `<div class="dx-step${on ? '' : ' alt'}" style="padding:5px 4px;font-size:9px;cursor:pointer;text-align:center;${on ? '' : 'opacity:.5;'}" onclick="renderDxId('${sign}','${t.key}')">${t.label}</div>`
  }).join('')
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:14px;">${cells}</div>`
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
    case 'check':       return `<div class="dx-check">${b.html}</div>`
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
export function renderDxApproach(sign: string, approach: DxApproach, active: DxTabKey): string {
  const tab: DxTab = approach[active]
  const wrap = `<div class="dx-wrap">${tab.blocks.map(renderDxBlock).join(DX_ARROW)}</div>`
  const after = (tab.after ?? []).map(renderDxBlock).join('')
  return renderDxTabs(sign, active) + wrap + after
}
