// ── Generic flowchart renderer ──────────────────────────────────────────────
// Turns a FlowPage (data) into the same HTML/CSS the app already uses, so the
// output is visually equivalent to the legacy hand-authored flowcharts. Pure:
// returns an HTML string and serialises Links to the existing global onclick
// handlers (renderDiseasePage / renderProtoDetail / goLesionTab / renderFlowId
// / renderDx<Id>). No dependency on cliniqApp internals — unit-testable.

import type {
  FlowPage, Block, Column, Endpoint, ChoiceItem, CardTile, CategoryColumn,
  DecisionStep, DecisionOutcome, TableCell, Link, LabeledLink, Tone,
} from './flowTypes'

export const esc = (s: string): string =>
  (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Single quote escape for ids placed inside onclick="x('...')".
const q = (s: string): string => (s || '').replace(/'/g, "\\'")

// ── Tone → colour. Defined ONCE here; flow data only names the tone. ──────────
// `rgb` is the hue; alpha is applied per context (endpoints vs boxes vs column
// headers use slightly different opacities, matching the legacy look).
export const HUE: Record<Tone, { rgb: string; color: string }> = {
  danger:  { rgb: '220,38,38',   color: '#FCA5A5' },
  warning: { rgb: '245,158,11',  color: '#FCD34D' },
  info:    { rgb: '37,99,235',   color: '#93C5FD' },
  teal:    { rgb: '13,148,136',  color: '#5EEAD4' },
  green:   { rgb: '16,185,129',  color: '#A7F3D0' },
  violet:  { rgb: '139,92,246',  color: '#C4B5FD' },
  purple:  { rgb: '168,85,247',  color: '#C4B5FD' },
  indigo:  { rgb: '99,102,241',  color: '#A5B4FC' },
  orange:  { rgb: '249,115,22',  color: '#FED7AA' },
  slate:   { rgb: '100,116,139', color: '#CBD5E1' },
  neutral: { rgb: '255,255,255', color: 'var(--gray)' },
}
// Brighter title colour for box headers, where the legacy used a lighter shade.
export const TITLE: Partial<Record<Tone, string>> = {
  danger: '#F87171', teal: '#5EEAD4', warning: 'var(--amber-text)',
}

// ── Link → onclick JS ─────────────────────────────────────────────────────────
export function onclick(link: Link): string {
  switch (link.to) {
    case 'disease':  return `renderDiseasePage('${q(link.id)}')`
    case 'protocol': return `renderProtoDetail('${q(link.id)}')`
    case 'lesion':   return `goLesionTab('${q(link.loc)}','${q(link.name)}')`
    case 'flow':     return `renderFlowId('${q(link.id)}')`
    case 'dx':       return `renderDxId('${q(link.id)}')`
  }
}

// ── Arrow logic ───────────────────────────────────────────────────────────────
// A connector ↓ is drawn between two consecutive blocks when the first connects
// "after" and the second connects "before". Defaults are kind-based; a block may
// set connectAfter to override (e.g. a sub-step that feeds straight into
// endpoints with no arrow).
const SPINE = new Set(['node', 'branch', 'endpoints', 'choices', 'callout', 'fnHeader', 'cardGrid', 'categoryGrid', 'categoryColumns', 'decisionTree'])
const connectsAfter = (b: Block): boolean => b.connectAfter ?? SPINE.has(b.kind)
const connectsBefore = (b: Block): boolean => SPINE.has(b.kind)
const FLOW_ARROW = '<div class="flow-arrow-v">↓</div>'
const FN_ARROW = '<div class="fn-arrow">↓</div>'

function joinBlocks(blocks: Block[], arrow: string = FLOW_ARROW): string {
  let out = ''
  blocks.forEach((b, i) => {
    if (i > 0 && connectsAfter(blocks[i - 1]) && connectsBefore(b)) out += arrow
    out += renderBlock(b)
  })
  return out
}

// ── Endpoints ─────────────────────────────────────────────────────────────────
function endpointStyle(tone: Tone): string {
  if (tone === 'neutral')
    return `background:rgba(255,255,255,0.04);border:1.5px solid var(--border2);color:var(--gray);`
  const h = HUE[tone]
  return `background:rgba(${h.rgb},0.09);border:1.5px solid rgba(${h.rgb},0.32);color:${h.color};`
}

function renderEndpoint(e: Endpoint): string {
  const tone = e.tone ?? 'neutral'
  const clickable = !!e.link
  const cursor = clickable ? 'cursor:pointer;' : 'cursor:default;'
  const head = `${e.icon ? esc(e.icon) + ' ' : ''}${esc(e.label)}`
  const sub = e.sublabel
    ? `<br><span style="opacity:${clickable ? '.75' : '.7'};font-size:8px;">${esc(e.sublabel)}${clickable ? ' ›' : ''}</span>`
    : ''
  const attr = clickable ? ` onclick="${onclick(e.link!)}"` : ''
  return `<div class="flow-endpoint" style="width:100%;${endpointStyle(tone)}font-size:9px;${cursor}text-align:center;"${attr}>${head}${sub}</div>`
}

function renderEndpoints(items: Endpoint[]): string {
  return `<div style="display:flex;flex-direction:column;gap:4px;width:100%;">${items.map(renderEndpoint).join('')}</div>`
}

// ── Choices (grid of clickable pattern-nodes) ─────────────────────────────────
// Colour from a pattern `variant` (CSS class) or a `tone` (inline). label /
// sublabel are HTML (may contain <br>).
function renderChoices(cols: number, size: number, items: ChoiceItem[]): string {
  const cells = items.map(it => {
    const sub = it.sublabel ? `<br><span style="font-size:${size - 2}px;font-weight:400;opacity:.8;">${it.sublabel}</span>` : ''
    const cls = it.variant ? ` ${it.variant}` : ''
    const toneStyle = it.tone ? `background:rgba(${HUE[it.tone].rgb},0.12);border-color:rgba(${HUE[it.tone].rgb},0.4);color:${HUE[it.tone].color};` : ''
    const cursor = it.link ? 'cursor:pointer;' : ''
    const attr = it.link ? ` onclick="${onclick(it.link)}"` : ''
    return `<div class="flow-node${cls}" style="${toneStyle}${cursor}font-size:${size}px;font-weight:700;"${attr}>${it.label}${sub}</div>`
  }).join('')
  return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;">${cells}</div>`
}

// ── Table (comparison/reference grid, optional tinted box) ────────────────────
function renderTable(b: Extract<Block, { kind: 'table' }>): string {
  const cell = (c: TableCell, header = false): string => {
    const text = typeof c === 'string' ? c : c.text
    const color = !header && typeof c !== 'string' && c.tone ? `color:${HUE[c.tone].color};` : ''
    const head = header ? 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);' : ''
    return `<div style="${head}${color}">${text}</div>`
  }
  const grid = `<div style="display:grid;grid-template-columns:${b.cols};gap:3px 6px;font-size:9.5px;line-height:1.4;">${b.headers.map(h => cell(h, true)).join('')}${b.rows.map(r => r.map(c => cell(c)).join('')).join('')}</div>`
  const footColor = b.boxTone ? `color:${HUE[b.boxTone].color};opacity:.85;` : 'opacity:.9;'
  const foot = b.footnote ? `<div style="margin-top:7px;font-size:9.5px;line-height:1.55;${footColor}">${b.footnote}</div>` : ''
  if (!b.boxTone && !b.title) return grid
  const tone = b.boxTone ?? 'neutral'
  const title = b.title ? `<div style="font-size:11px;font-weight:700;color:${TITLE[tone] ?? HUE[tone].color};margin-bottom:8px;">${b.title}</div>` : ''
  return `${boxOpen(tone, 0.07, 0.25, `padding:10px 12px;${b.gap ? `margin-top:${b.gap}px;` : ''}`)}${title}${grid}${foot}</div>`
}

// ── Card section (tinted group of disease cards) ──────────────────────────────
function renderCardSection(b: Extract<Block, { kind: 'cardSection' }>): string {
  const h = HUE[b.tone]
  const cards = b.cards.map(c => {
    const tag = c.tag ? ` <span style="font-size:9px;font-weight:400;opacity:.8;">${c.tag}</span>` : ''
    const click = c.link ? `cursor:pointer;` : ''
    const attr = c.link ? ` onclick="${onclick(c.link)}"` : ''
    return `<div style="background:rgba(${h.rgb},0.08);border-radius:7px;padding:7px 10px;${click}"${attr}><div style="font-size:10.5px;font-weight:700;color:${h.color};">${c.title}${tag}</div><div style="font-size:9px;color:${h.color};opacity:.8;line-height:1.4;">${c.desc}</div></div>`
  }).join('')
  return `${boxOpen(b.tone, 0.08, 0.28, `padding:10px 12px;margin-top:${b.gap ?? 10}px;`)}<div style="font-size:11px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:6px;">${b.title}</div><div style="display:flex;flex-direction:column;gap:5px;">${cards}</div></div>`
}

// ── Banner (centered info strip) ──────────────────────────────────────────────
function renderBanner(tone: Tone, html: string): string {
  const h = HUE[tone]
  return `<div style="margin-top:10px;padding:9px 12px;background:rgba(${h.rgb},0.07);border:1px solid rgba(${h.rgb},0.15);border-radius:10px;font-size:11px;color:${h.color};text-align:center;width:100%;">${html}</div>`
}

// ── Branch + columns ──────────────────────────────────────────────────────────
function renderColumnHeader(col: Column): string {
  const h = HUE[col.tone]
  const sub = col.sub
    ? `<div style="font-size:8.5px;font-weight:400;opacity:.85;margin-top:2px;">${esc(col.sub)}</div>`
    : ''
  return `<div class="flow-node" style="width:100%;background:rgba(${h.rgb},0.12);border-color:rgba(${h.rgb},0.4);font-size:10px;font-weight:700;color:${h.color};">${esc(col.header)}${sub}</div>`
}

function renderColumn(col: Column): string {
  const body = col.blocks.length ? FLOW_ARROW + joinBlocks(col.blocks) : ''
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">${renderColumnHeader(col)}${body}</div>`
}

// ── fn-layout header + card grid ──────────────────────────────────────────────
function renderFnHeader(b: Extract<Block, { kind: 'fnHeader' }>): string {
  return `<div class="fn fn-${b.variant}">${esc(b.text)}</div>`
}

function renderCardGrid(perRow: number, tiles: CardTile[]): string {
  // .fn-row defaults to 2 columns; override the grid only when perRow differs.
  const rowStyle = perRow === 2 ? '' : ` style="grid-template-columns:repeat(${perRow},1fr);"`
  let rows = ''
  for (let i = 0; i < tiles.length; i += perRow) {
    const group = tiles.slice(i, i + perRow)
    const cards = group.map(t => {
      const sys = t.sys ? `<div class="ep-sys">${esc(t.sys)}</div>` : ''
      const badge = t.badge ? `<div class="ep-badge">${esc(t.badge)}</div>` : ''
      const attr = t.link ? ` onclick="${onclick(t.link)}"` : ''
      return `<div class="fn-ep fn-ep-${t.anat}"${attr}>${sys}<div class="ep-loc">${esc(t.loc)}</div>${badge}</div>`
    }).join('')
    rows += `<div class="fn-row"${rowStyle}>${cards}</div>`
  }
  return rows
}

// ── Category grid (header row → arrow row → tile-column row) ───────────────────
function renderCategoryGrid(columns: CategoryColumn[]): string {
  const n = columns.length
  const grid = (inner: string) => `<div style="display:grid;grid-template-columns:repeat(${n},1fr);gap:6px;width:100%;">${inner}</div>`
  const headers = columns.map(c => {
    const h = HUE[c.tone]
    return `<div class="flow-node" style="background:rgba(${h.rgb},0.12);border-color:rgba(${h.rgb},0.4);color:${h.color};font-size:11px;cursor:default;min-width:0;">${esc(c.cat)}</div>`
  }).join('')
  const arrows = columns.map(() => FLOW_ARROW).join('')
  const cols = columns.map(c => {
    const h = HUE[c.tone]
    const tiles = c.tiles.map(t => {
      const click = t.link ? 'cursor:pointer;' : 'cursor:default;'
      const attr = t.link ? ` onclick="${onclick(t.link)}" onmouseover="this.style.filter='brightness(1.2)'" onmouseout="this.style.filter=''"` : ''
      return `<div style="border-radius:8px;padding:6px 8px;font-size:10px;font-weight:600;text-align:center;border:1.5px solid rgba(${h.rgb},0.4);background:rgba(${h.rgb},0.12);color:${h.color};${click}line-height:1.3;word-break:break-word;"${attr}>${esc(t.label)}</div>`
    }).join('')
    return `<div style="display:flex;flex-direction:column;gap:4px;">${tiles}</div>`
  }).join('')
  return grid(headers) + grid(arrows) + grid(cols)
}

// ── Category columns (wrapping grid of header+↓+chips units, CAT_STYLE) ───────
// Matches the legacy col()/CAT_STYLE grids (jaundice / pale / pupd). Each column
// is keyed by its category label, which carries the exact legacy colour.
const CAT_STYLE: Record<string, { bg: string; border: string; col: string }> = {
  'Vascular':              { bg: 'rgba(220,38,38,0.15)',  border: 'rgba(220,38,38,0.4)',  col: '#FCA5A5' },
  'Inflammatory':          { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', col: '#FCD34D' },
  'Mass':                  { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)', col: '#C4B5FD' },
  'Immune-mediated':       { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', col: '#93C5FD' },
  'Degenerative':          { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.4)', col: '#94A3B8' },
  'Metabolic / Endocrine': { bg: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.4)', col: '#5EEAD4' },
  'Toxic':                 { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.4)', col: '#FB923C' },
  'Trauma':                { bg: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.4)', col: '#D1D5DB' },
  'Anomalous':             { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)', col: '#F9A8D4' },
}
function renderCategoryColumns(cols: number, columns: { cat: string; tiles: { label: string; link?: Link }[] }[]): string {
  const units = columns.map(c => {
    const s = CAT_STYLE[c.cat] ?? { bg: 'rgba(255,255,255,0.04)', border: 'var(--border2)', col: 'var(--gray)' }
    const chips = c.tiles.map(t => {
      const click = t.link ? 'cursor:pointer;' : ''
      const attr = t.link ? ` onclick="${onclick(t.link)}"` : ''
      return `<div style="background:${s.bg};border:1.5px solid ${s.border};border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:${s.col};text-align:center;line-height:1.35;${click}"${attr}>${esc(t.label)}</div>`
    }).join('')
    return `<div style="display:flex;flex-direction:column;align-items:stretch;gap:4px;"><div style="background:${s.bg};border:1.5px solid ${s.border};border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:${s.col};text-align:center;line-height:1.3;">${esc(c.cat)}</div><div style="color:${s.col};text-align:center;font-size:11px;line-height:1;">↓</div>${chips}</div>`
  }).join('')
  return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;">${units}</div>`
}

// ── Decision tree (YES/NO localisation) ───────────────────────────────────────
function decBox(question: string, sub?: string): string {
  const subDiv = sub ? `<div style="font-size:9px;color:#FDE68A;opacity:.8;margin-top:3px;">${esc(sub)}</div>` : ''
  return `<div style="background:rgba(245,158,11,0.13);border:1.5px solid rgba(245,158,11,0.55);border-radius:10px;padding:9px 14px;width:100%;text-align:center;"><div style="font-size:11.5px;font-weight:700;color:#FCD34D;line-height:1.4;">${esc(question)}</div>${subDiv}</div>`
}
function outBox(o: DecisionOutcome): string {
  const h = HUE[o.tone]
  return `<div style="background:rgba(${h.rgb},0.12);border:1.5px solid rgba(${h.rgb},0.5);border-radius:9px;padding:9px 10px;font-size:9px;line-height:1.55;color:${h.color};">${o.html}</div>`
}
function renderDecisionStep(s: DecisionStep): string {
  if (s.type === 'split') {
    return decBox(s.question, s.sub) +
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;margin-top:4px;"><div><div style="font-size:9px;font-weight:700;color:#F87171;margin-bottom:4px;">${esc(s.noLabel)}</div>${outBox(s.no)}</div><div><div style="font-size:9px;font-weight:700;color:#34D399;margin-bottom:4px;">${esc(s.yesLabel)}</div>${outBox(s.yes)}</div></div>`
  }
  if (s.type === 'outcome') {
    return `<div style="margin-bottom:8px;"><div style="font-size:9px;font-weight:700;color:#F87171;margin-bottom:4px;">${esc(s.label)}</div>${outBox(s.box)}</div>`
  }
  // type 'step': continue answer goes down, the other exits to the side
  const down = s.continue === 'YES'
  const contColor = down ? '#34D399' : '#F87171'
  const arrowColor = down ? 'rgba(52,211,153,0.5)' : 'rgba(248,113,113,0.5)'
  const exitColor = down ? '#F87171' : '#34D399'
  const exitLabel = down ? 'NO →' : 'YES →'
  return decBox(s.question, s.sub) +
    `<div style="display:flex;gap:5px;width:100%;margin:4px 0 10px;"><div style="width:28%;display:flex;flex-direction:column;align-items:center;padding-top:4px;"><div style="font-size:9px;font-weight:700;color:${contColor};">${s.continue}</div><div style="font-size:18px;color:${arrowColor};line-height:1.1;">↓</div></div><div style="flex:1;"><div style="font-size:9px;font-weight:700;color:${exitColor};margin-bottom:4px;">${exitLabel}</div>${outBox(s.exit)}</div></div>`
}

function renderBranch(columns: Column[]): string {
  const cols = columns.length
  return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px;width:100%;">${columns.map(renderColumn).join('')}</div>`
}

// ── Compare box (tinted panel: title + grid of header+body sub-cards + foot) ───
const hexToRgb = (hex: string): string => {
  const h = hex.replace('#', '')
  return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`
}
function renderCompareBox(b: Extract<Block, { kind: 'compareBox' }>): string {
  const h = HUE[b.tone]
  const grid = Array(b.cols ?? 2).fill('1fr').join(' ')
  const title = b.title ? `<div style="font-size:11px;font-weight:700;color:${h.color};margin-bottom:8px;">${b.title}</div>` : ''
  const cards = b.cards.map(c =>
    `<div style="font-size:9.5px;line-height:1.5;background:rgba(${h.rgb},0.08);border-radius:7px;padding:7px 9px;"><div style="color:${h.color};font-weight:700;margin-bottom:3px;">${c.header}</div>${c.html}</div>`,
  ).join('')
  const foot = b.footnote ? `<div style="margin-top:7px;font-size:9.5px;line-height:1.6;color:rgba(${hexToRgb(h.color)},.8);">${b.footnote}</div>` : ''
  return `<div style="margin-top:${b.gap ?? 14}px;padding:10px 12px;background:rgba(${h.rgb},0.07);border:1px solid rgba(${h.rgb},0.25);border-radius:10px;width:100%;">${title}<div style="display:grid;grid-template-columns:${grid};gap:6px;">${cards}</div>${foot}</div>`
}

// ── Boxes (callout / alert / diseaseGrid) ─────────────────────────────────────
function boxOpen(tone: Tone, bgA: number, bdA: number, extra = ''): string {
  const h = HUE[tone]
  return `<div style="background:rgba(${h.rgb},${bgA});border:1px solid rgba(${h.rgb},${bdA});border-radius:10px;width:100%;${extra}">`
}

function renderCallout(b: Extract<Block, { kind: 'callout' }>): string {
  const t = b.title ? `<div style="font-size:11px;font-weight:700;color:${TITLE[b.tone] ?? HUE[b.tone].color};margin-bottom:6px;">${b.title}</div>` : ''
  const extra = `padding:9px 12px;font-size:9.5px;color:${HUE[b.tone].color};line-height:1.5;${b.gap ? `margin-top:${b.gap}px;` : ''}${b.center ? 'text-align:center;' : ''}`
  return `${boxOpen(b.tone, 0.10, 0.3, extra)}${t}${b.html}</div>`
}

function renderAlert(tone: Tone, title: string, items: string[]): string {
  const body = items.map(i => `• ${i}`).join('<br>')
  return `${boxOpen(tone, 0.08, 0.25, 'margin-top:12px;padding:10px 12px;')}<div style="font-size:10px;font-weight:700;color:${TITLE[tone] ?? HUE[tone].color};margin-bottom:5px;">${title}</div><div style="font-size:9.5px;line-height:1.55;color:${HUE[tone].color};">${body}</div></div>`
}

function renderDiseaseGrid(title: string, links: LabeledLink[]): string {
  const cells = links.map(l =>
    `<div onclick="${onclick(l.link)}" style="cursor:pointer;color:#99F6E4;">→ ${esc(l.label)}</div>`,
  ).join('')
  return `${boxOpen('teal', 0.08, 0.25, 'margin-top:10px;padding:10px 12px;')}<div style="font-size:11px;font-weight:700;color:#5EEAD4;margin-bottom:6px;">${esc(title)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;">${cells}</div></div>`
}

function renderDxRow(items: LabeledLink[]): string {
  const cells = items.map(i =>
    `<div class="dx-test" style="cursor:pointer;font-size:9.5px;${i.accent ? 'background:#0D7377;' : ''}" onclick="${onclick(i.link)}">${esc(i.label)} ›</div>`,
  ).join('')
  return `<div class="dx-row c2" style="margin-top:10px;">${cells}</div>`
}

// ── Node ──────────────────────────────────────────────────────────────────────
function renderNode(b: Extract<Block, { kind: 'node' }>): string {
  if (b.variant === 'entry') {
    const tone = b.tone ? ` style="background:rgba(${HUE[b.tone].rgb},0.15);border-color:rgba(${HUE[b.tone].rgb},0.4);color:${HUE[b.tone].color};"` : ''
    const sub = b.sub ? `<div style="font-size:9.5px;color:var(--gray);text-align:center;margin:4px 0 6px 0;">${esc(b.sub)}</div>` : ''
    return `<div class="flow-node entry"${tone}>${esc(b.text)}</div>${sub}`
  }
  if (b.variant === 'sub-step')
    return `<div class="flow-node sub-step" style="width:100%;font-size:9.5px;">${esc(b.text)}</div>`
  const sub = b.sub ? `<div class="fn-sub" style="font-weight:400;margin-top:3px;">${esc(b.sub)}</div>` : ''
  return `<div class="flow-node step">${esc(b.text)}${sub}</div>`
}

// ── Dispatch ──────────────────────────────────────────────────────────────────
function renderBlock(b: Block): string {
  switch (b.kind) {
    case 'node':        return renderNode(b)
    case 'branch':      return renderBranch(b.columns)
    case 'endpoints':   return renderEndpoints(b.items)
    case 'fnHeader':    return renderFnHeader(b)
    case 'cardGrid':    return renderCardGrid(b.perRow ?? 2, b.tiles)
    case 'choices':     return renderChoices(b.cols ?? b.items.length, b.size ?? 11, b.items)
    case 'banner':      return renderBanner(b.tone, b.html)
    case 'callout':     return renderCallout(b)
    case 'alert':       return renderAlert(b.tone, b.title, b.items)
    case 'diseaseGrid': return renderDiseaseGrid(b.title, b.links)
    case 'dxRow':       return renderDxRow(b.items)
    case 'table':       return renderTable(b)
    case 'cardSection': return renderCardSection(b)
    case 'categoryGrid': return renderCategoryGrid(b.columns)
    case 'categoryColumns': return renderCategoryColumns(b.cols ?? 3, b.columns)
    case 'decisionTree': return b.steps.map(renderDecisionStep).join('')
    case 'compareBox':  return renderCompareBox(b)
    case 'disclaimer':  return '<div class="disclaimer">For qualified veterinary professionals only.</div>'
    case 'html':        return b.html
    default:
      // table / categoryGrid / speciesCompare — renderer support lands when a
      // migrated sign first needs them.
      throw new Error(`renderFlow: block kind '${(b as Block).kind}' not yet implemented`)
  }
}

/** Render a whole flow page to an HTML string. 'flow' layout wraps in
 *  `.flow-wrap` with `.flow-arrow-v` connectors; 'fn' renders bare with
 *  `.fn-arrow` connectors (matching legacy `.fn`-system sub-flows). */
export function renderFlowPage(page: FlowPage): string {
  if (page.layout === 'fn') return joinBlocks(page.blocks, FN_ARROW)
  // A trailing disclaimer renders OUTSIDE .flow-wrap (matches the legacy markup).
  const blocks = page.blocks
  const lastIsDisc = blocks.length > 0 && blocks[blocks.length - 1].kind === 'disclaimer'
  const main = lastIsDisc ? blocks.slice(0, -1) : blocks
  const disc = lastIsDisc ? '<div class="disclaimer">For qualified veterinary professionals only.</div>' : ''
  return `<div class="flow-wrap">${joinBlocks(main)}</div>${disc}`
}
