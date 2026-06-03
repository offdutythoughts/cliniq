// ── Generic flowchart renderer ──────────────────────────────────────────────
// Turns a FlowPage (data) into the same HTML/CSS the app already uses, so the
// output is visually equivalent to the legacy hand-authored flowcharts. Pure:
// returns an HTML string and serialises Links to the existing global onclick
// handlers (renderDiseasePage / renderProtoDetail / goLesionTab / renderFlowId
// / renderDx<Id>). No dependency on cliniqApp internals — unit-testable.

import type {
  FlowPage, Block, Column, Endpoint, ChoiceItem, CardTile, TableCell, Link, LabeledLink, Tone,
} from './flowTypes'

const esc = (s: string): string =>
  (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Single quote escape for ids placed inside onclick="x('...')".
const q = (s: string): string => (s || '').replace(/'/g, "\\'")

// ── Tone → colour. Defined ONCE here; flow data only names the tone. ──────────
// `rgb` is the hue; alpha is applied per context (endpoints vs boxes vs column
// headers use slightly different opacities, matching the legacy look).
const HUE: Record<Tone, { rgb: string; color: string }> = {
  danger:  { rgb: '220,38,38',   color: '#FCA5A5' },
  warning: { rgb: '245,158,11',  color: '#FCD34D' },
  info:    { rgb: '37,99,235',   color: '#93C5FD' },
  teal:    { rgb: '13,148,136',  color: '#5EEAD4' },
  green:   { rgb: '16,185,129',  color: '#A7F3D0' },
  violet:  { rgb: '139,92,246',  color: '#C4B5FD' },
  purple:  { rgb: '168,85,247',  color: '#C4B5FD' },
  indigo:  { rgb: '99,102,241',  color: '#A5B4FC' },
  orange:  { rgb: '249,115,22',  color: '#FED7AA' },
  neutral: { rgb: '255,255,255', color: 'var(--gray)' },
}
// Brighter title colour for box headers, where the legacy used a lighter shade.
const TITLE: Partial<Record<Tone, string>> = {
  danger: '#F87171', teal: '#5EEAD4', warning: 'var(--amber-text)',
}

// ── Link → onclick JS ─────────────────────────────────────────────────────────
const pascal = (s: string): string =>
  (s || '').replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase())

function onclick(link: Link): string {
  switch (link.to) {
    case 'disease':  return `renderDiseasePage('${q(link.id)}')`
    case 'protocol': return `renderProtoDetail('${q(link.id)}')`
    case 'lesion':   return `goLesionTab('${q(link.loc)}','${q(link.name)}')`
    case 'flow':     return `renderFlowId('${q(link.id)}')`
    case 'dx':       return `renderDx${pascal(link.id)}()`
  }
}

// ── Arrow logic ───────────────────────────────────────────────────────────────
// A connector ↓ is drawn between two consecutive blocks when the first connects
// "after" and the second connects "before". Defaults are kind-based; a block may
// set connectAfter to override (e.g. a sub-step that feeds straight into
// endpoints with no arrow).
const SPINE = new Set(['node', 'branch', 'endpoints', 'choices', 'callout', 'fnHeader', 'cardGrid'])
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
  let rows = ''
  for (let i = 0; i < tiles.length; i += perRow) {
    const group = tiles.slice(i, i + perRow)
    const cards = group.map(t => {
      const sys = t.sys ? `<div class="ep-sys">${esc(t.sys)}</div>` : ''
      const badge = t.badge ? `<div class="ep-badge">${esc(t.badge)}</div>` : ''
      const attr = t.link ? ` onclick="${onclick(t.link)}"` : ''
      return `<div class="fn-ep fn-ep-${t.anat}"${attr}>${sys}<div class="ep-loc">${esc(t.loc)}</div>${badge}</div>`
    }).join('')
    rows += `<div class="fn-row">${cards}</div>`
  }
  return rows
}

function renderBranch(columns: Column[]): string {
  const cols = columns.length
  return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:8px;width:100%;">${columns.map(renderColumn).join('')}</div>`
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
    case 'html':        return b.html
    default:
      // table / categoryGrid / speciesCompare — renderer support lands when a
      // migrated sign first needs them (see DATA_MIGRATION.md phases).
      throw new Error(`renderFlow: block kind '${(b as Block).kind}' not yet implemented`)
  }
}

/** Render a whole flow page to an HTML string. 'flow' layout wraps in
 *  `.flow-wrap` with `.flow-arrow-v` connectors; 'fn' renders bare with
 *  `.fn-arrow` connectors (matching legacy `.fn`-system sub-flows). */
export function renderFlowPage(page: FlowPage): string {
  if (page.layout === 'fn') return joinBlocks(page.blocks, FN_ARROW)
  return `<div class="flow-wrap">${joinBlocks(page.blocks)}</div>`
}
