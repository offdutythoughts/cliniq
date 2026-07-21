'use client'
// Flowchart view — React port of renderFlow.ts (renderFlowPage + every block
// renderer). Same .flow-*/.fn-* classes and inline styles → pixel-identical.
// esc()'d text fields become plain text (React escapes); raw-HTML fields
// (choice labels, callout/banner/compareBox/table/decision html) go through the
// audited <RichText> boundary; links route via linkToView.

import { Fragment, useState, type ReactNode } from 'react'
import type {
  Block, Column, Endpoint, ChoiceItem, CardTile, CategoryColumn, CategoryTile, CatColumn, DecisionStep,
  DecisionOutcome, TableCell, TableRow, LabeledLink, Tone, InfoBoxBlock as InfoBoxBlockType,
  AlertItem,
} from '../../lib/signs/flowTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { FLOWS } from '../../lib/signs/flows'
import { DX } from '../../lib/signs/dx'
import { RichText } from '../../components/RichText'
import { useNav } from '../nav/NavContext'
import { linkToView } from '../nav/view'
import { styleStringToObject as s, toneBox, SCROLL_X, colTier } from './style'
import { NotFound } from './NotFound'
import { type Nav, Raw, ToneBox } from './flowHelpers'
import { NavCard } from './markup'

const DISCLAIMER = <div className="disclaimer">For qualified veterinary professionals only.</div>

// ── Shared static style constants ─────────────────────────────────────────────
const ST_SECTION_LABEL = s('grid-column:1/-1;padding:4px 0 2px;font-size:8px;font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),.08);margin-top:2px;')
const ST_ROW_DIVIDER   = s('grid-column:1/-1;height:1px;background:rgba(var(--slate-muted),.2);')
const ST_BLOCK_TITLE   = s('font-size:11px;font-weight:700;margin-bottom:6px;')
const ST_COL_FLEX      = s('display:flex;flex-direction:column;gap:4px;')
const ST_UNLINKED_TILE = 'background:var(--card);border:1.5px solid var(--border);color:var(--gray2);opacity:.72;filter:saturate(.2);cursor:default;'
const ST_TILE_BASE     = 'border-radius:8px;padding:6px 8px;font-size:10px;font-weight:600;text-align:center;line-height:1.3;word-break:break-word;'
// Muted (intentional leaf note): keeps the category hue but visibly de-emphasised
// — distinct from ST_UNLINKED_TILE (desaturated grey = authoring gap / lint error).
const ST_TILE_MUTED    = 'opacity:.6;cursor:default;'

// Shared hover-brighten handlers (spread onto any clickable tinted element).
const hoverBrighten = {
  onMouseOver: (ev: React.MouseEvent<HTMLElement>) => { ev.currentTarget.style.filter = 'brightness(1.2)' },
  onMouseOut:  (ev: React.MouseEvent<HTMLElement>) => { ev.currentTarget.style.filter = '' },
}

// ── Arrow / spine logic (joinBlocks) ─────────────────────────────────────────
const SPINE = new Set(['node', 'branch', 'endpoints', 'choices', 'callout', 'fnHeader', 'cardGrid', 'categoryGrid', 'categoryColumns', 'decisionTree', 'speciesChooser'])
const connectsAfter = (b: Block): boolean => b.connectAfter ?? SPINE.has(b.kind)
const connectsBefore = (b: Block): boolean => SPINE.has(b.kind)

function BlockList({ blocks, fn, onNav }: { blocks: Block[]; fn?: boolean; onNav: Nav }) {
  const Arrow = fn ? <div className="fn-arrow">↓</div> : <div className="flow-arrow-v">↓</div>
  return (
    <>
      {blocks.map((b, i) => (
        <Fragment key={i}>
          {i > 0 && connectsAfter(blocks[i - 1]) && connectsBefore(b) && Arrow}
          <BlockView b={b} onNav={onNav} />
        </Fragment>
      ))}
    </>
  )
}

// ToneBox is the shared tinted-panel abstraction (imported from flowHelpers).
const Box = ToneBox

// ── Node ──────────────────────────────────────────────────────────────────────
function NodeBlock({ b }: { b: Extract<Block, { kind: 'node' }> }) {
  if (b.variant === 'entry') {
    const tone = b.tone ? s(`background:rgba(${HUE[b.tone].rgb},var(--tile-bg-a));border-color:rgba(${HUE[b.tone].rgb},var(--tile-bd-a));color:${HUE[b.tone].color};`) : undefined
    return (
      <>
        <div className="flow-node entry" style={tone}>{b.text}</div>
        {b.sub && <div style={s('font-size:9.5px;color:var(--gray);text-align:center;margin:4px 0 6px 0;')}>{b.sub}</div>}
      </>
    )
  }
  if (b.variant === 'sub-step') return <div className="flow-node sub-step" style={s('width:100%;font-size:9.5px;')}>{b.text}</div>
  return (
    <div className="flow-node step">
      {b.text}
      {b.sub && <div className="fn-sub" style={s('font-weight:400;margin-top:3px;')}>{b.sub}</div>}
    </div>
  )
}

// ── Endpoints ─────────────────────────────────────────────────────────────────
function endpointStyle(tone: Tone): string {
  if (tone === 'neutral') return 'background:var(--card);border:1.5px solid var(--border2);color:var(--gray);'
  const h = HUE[tone]
  return `background:rgba(${h.rgb},var(--panel-bg-a));border:1.5px solid rgba(${h.rgb},var(--panel-bd-a));color:${h.color};`
}
function EndpointView({ e, onNav }: { e: Endpoint; onNav: Nav }) {
  const tone = e.tone ?? 'neutral'
  const clickable = !!e.link
  const cursor = clickable ? 'cursor:pointer;' : 'cursor:default;'
  return (
    <div
      className="flow-endpoint"
      style={s(`width:100%;${endpointStyle(tone)}font-size:9px;${cursor}text-align:center;`)}
      {...(clickable ? { role: 'button', onClick: () => onNav(linkToView(e.link!)) } : {})}
    >
      {e.icon ? `${e.icon} ` : ''}{e.label}
      {e.sublabel && (
        <>
          <br />
          <span style={s(`opacity:${clickable ? '.75' : '.7'};font-size:8px;`)}>{e.sublabel}{clickable ? ' ›' : ''}</span>
        </>
      )}
    </div>
  )
}

// ── Choices (label/sublabel are raw HTML) ────────────────────────────────────
function ChoicesBlock({ cols, size, items, onNav }: { cols: number; size: number; items: ChoiceItem[]; onNav: Nav }) {
  return (
    <div style={s(`display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;`)}>
      {items.map((it, i) => {
        const cls = it.variant ? ` ${it.variant}` : ''
        const toneStyle = it.tone ? `background:rgba(${HUE[it.tone].rgb},var(--tile-bg-a));border-color:rgba(${HUE[it.tone].rgb},var(--tile-bd-a));color:${HUE[it.tone].color};` : ''
        const cursor = it.link ? 'cursor:pointer;' : ''
        return (
          <div key={i} className={`flow-node${cls}`} style={s(`${toneStyle}${cursor}font-size:${size}px;font-weight:700;`)}
            {...(it.link ? { role: 'button', onClick: () => onNav(linkToView(it.link!)) } : {})}>
            <Raw html={it.label} onNav={onNav} />
            {it.sublabel && <><br /><span style={s(`font-size:${size - 2}px;font-weight:400;opacity:.8;`)}><Raw html={it.sublabel} onNav={onNav} /></span></>}
          </div>
        )
      })}
    </div>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────
function Cell({ c, header, onNav }: { c: TableCell; header?: boolean; onNav: Nav }) {
  const text = typeof c === 'string' ? c : c.text
  const tone = typeof c !== 'string' ? c.tone : undefined
  const color = tone ? `color:${HUE[tone].color};` : ''
  const head = header
    ? tone
      ? `font-weight:700;padding-bottom:4px;border-bottom:2px solid ${HUE[tone].color};white-space:nowrap;${color}`
      : 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(var(--slate-muted),.25);'
    : color
  return <div style={s(head)}><Raw html={text} onNav={onNav} /></div>
}
function TableBlock({ b, onNav }: { b: Extract<Block, { kind: 'table' }>; onNav: Nav }) {
  const lastIdx = b.rows.length - 1
  const grid = (
    <div style={s(`display:grid;grid-template-columns:${b.cols};gap:${b.dividers ? 9 : 3}px 6px;font-size:9.5px;line-height:1.4;${b.minWidth ? `min-width:${b.minWidth}px;` : ''}`)}>
      {b.headers.map((h, i) => <Cell key={`h${i}`} c={h} header onNav={onNav} />)}
      {b.rows.map((row, ri) =>
        Array.isArray(row)
          ? (
            <Fragment key={ri}>
              {row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} onNav={onNav} />)}
              {b.dividers && ri !== lastIdx && <div style={ST_ROW_DIVIDER} />}
            </Fragment>
          )
          : <div key={`s${ri}`} style={ST_SECTION_LABEL}>{row.section}</div>
      )}
    </div>
  )
  const wrapped = b.scroll ? <div style={s(SCROLL_X)}>{grid}</div> : grid
  const footColor = b.boxTone ? `color:${HUE[b.boxTone].color};opacity:.85;` : 'opacity:.9;'
  const foot = b.footnote ? <div style={s(`margin-top:7px;font-size:9.5px;line-height:1.55;${footColor}`)}><Raw html={b.footnote} onNav={onNav} /></div> : null
  if (!b.boxTone && !b.title) return b.gap ? <div style={s(`margin-top:${b.gap}px;width:100%;`)}>{wrapped}{foot}</div> : <>{wrapped}{foot}</>
  const tone = b.boxTone ?? 'neutral'
  return (
    <Box tone={tone} extra={`padding:10px 12px;${b.gap ? `margin-top:${b.gap}px;` : ''}`}>
      {b.title && <div style={s(`font-size:10px;font-weight:700;color:${TITLE[tone] ?? HUE[tone].color};text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;`)}><Raw html={b.title} onNav={onNav} /></div>}
      {wrapped}
      {foot}
    </Box>
  )
}

// ── Card section ──────────────────────────────────────────────────────────────
function CardSectionBlock({ b, onNav }: { b: Extract<Block, { kind: 'cardSection' }>; onNav: Nav }) {
  const h = HUE[b.tone]
  return (
    <Box tone={b.tone} extra={`padding:10px 12px;margin-top:${b.gap ?? 10}px;`}>
      <div style={{ ...ST_BLOCK_TITLE, color: TITLE[b.tone] ?? h.color }}><Raw html={b.title} onNav={onNav} /></div>
      <div style={s('display:flex;flex-direction:column;gap:5px;')}>
        {b.cards.map((c, i) => (
          <div key={i} style={s(`background:rgba(${h.rgb},0.08);border-radius:7px;padding:7px 10px;${c.link ? 'cursor:pointer;' : ST_UNLINKED_TILE}`)}
            {...(c.link ? { role: 'button', onClick: () => onNav(linkToView(c.link!)) } : { 'aria-disabled': true, title: 'No linked page available' })}>
            <div style={s(`font-size:10.5px;font-weight:700;color:${h.color};`)}><Raw html={c.title} onNav={onNav} />{c.tag && <>{' '}<span style={s('font-size:9px;font-weight:400;opacity:.8;')}><Raw html={c.tag} onNav={onNav} /></span></>}</div>
            <div style={s(`font-size:9px;color:${h.color};opacity:.8;line-height:1.4;`)}><Raw html={c.desc} onNav={onNav} /></div>
          </div>
        ))}
      </div>
    </Box>
  )
}

// ── Banner ──────────────────────────────────────────────────────────────────
function BannerBlock({ tone, html, onNav }: { tone: Tone; html: string; onNav: Nav }) {
  const h = HUE[tone]
  return <div style={s(`margin-top:10px;padding:9px 12px;background:rgba(${h.rgb},var(--panel-bg-a));border:1px solid rgba(${h.rgb},var(--panel-bd-a));border-radius:10px;font-size:11px;color:${h.color};text-align:center;width:100%;`)}><Raw html={html} onNav={onNav} /></div>
}

// ── Branch + columns ──────────────────────────────────────────────────────────
function ColumnView({ col, onNav }: { col: Column; onNav: Nav }) {
  const h = col.tone ? HUE[col.tone] : null
  return (
    <div style={s('display:flex;flex-direction:column;align-items:center;gap:4px;')}>
      {h ? (
        <div className="flow-node" style={s(`width:100%;background:rgba(${h.rgb},var(--tile-bg-a));border-color:rgba(${h.rgb},var(--tile-bd-a));font-size:10px;font-weight:700;color:${h.color};`)}>
          {col.header}
          {col.sub && <div style={s('font-size:8.5px;font-weight:400;opacity:.85;margin-top:2px;')}>{col.sub}</div>}
        </div>
      ) : (
        <div style={s('font-size:9px;font-weight:600;color:var(--gray2);text-align:center;width:100%;padding:2px 0;')}>
          {col.header}
        </div>
      )}
      {col.blocks.length > 0 && (
        <>
          <div className="flow-arrow-v">↓</div>
          <BlockList blocks={col.blocks} onNav={onNav} />
        </>
      )}
    </div>
  )
}
function BranchBlock({ columns, onNav }: { columns: Column[]; onNav: Nav }) {
  return <div style={s(`display:grid;grid-template-columns:repeat(${columns.length},1fr);gap:8px;width:100%;`)}>{columns.map((c, i) => <ColumnView key={i} col={c} onNav={onNav} />)}</div>
}

// ── fn header + card grid ─────────────────────────────────────────────────────
function FnHeaderBlock({ b }: { b: Extract<Block, { kind: 'fnHeader' }> }) {
  return <div className={`fn fn-${b.variant}`}>{b.text}</div>
}
function CardGridBlock({ perRow, tiles, onNav }: { perRow: number; tiles: CardTile[]; onNav: Nav }) {
  const rowStyle = perRow === 2 ? undefined : s(`grid-template-columns:repeat(${perRow},1fr);`)
  const rows: CardTile[][] = []
  for (let i = 0; i < tiles.length; i += perRow) rows.push(tiles.slice(i, i + perRow))
  return (
    <>
      {rows.map((group, ri) => (
        <div key={ri} className="fn-row" style={rowStyle}>
          {group.map((t, i) => (
            <div key={i} className={`fn-ep fn-ep-${t.anat}`}
              style={t.link ? undefined : s(ST_UNLINKED_TILE)}
              {...(t.link ? { role: 'button', onClick: () => onNav(linkToView(t.link!)) } : { 'aria-disabled': true, title: 'No linked page available' })}>
              {t.sys && <div className="ep-sys">{t.sys}</div>}
              <div className="ep-loc">{t.loc}</div>
              {t.badge && <div className="ep-badge">{t.badge}</div>}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

// ── Category grid (header row → arrow row → tile-column row) ───────────────────
// One tile inside a categoryGrid column. Four variants:
//  • `links` (plural) → in-tone header + clickable sub-bullets
//  • `link`  (single) → clickable in-tone tile
//  • `terminal`       → in-tone plain info leaf (no page to link to)
//  • otherwise        → greyed + aria-disabled = authoring gap (missing link)
function CategoryTileView({ tile, tone, onNav }: { tile: CategoryTile; tone: Tone; onNav: Nav }) {
  const h = HUE[tone]
  const tinted = toneBox(h.rgb, h.color).all
  if (tile.links && tile.links.length > 0) {
    return (
      <div style={s(`${ST_TILE_BASE}${tinted}cursor:default;`)}>
        {tile.label && <div style={s('margin-bottom:4px;')}>{tile.label}</div>}
        {tile.links.map((ll, k) => (
          <div key={k} role="button" onClick={() => onNav(linkToView(ll.link))}
            style={s('cursor:pointer;text-align:left;padding:2px 0;font-size:9.5px;')} {...hoverBrighten}>
            → {ll.label}
          </div>
        ))}
      </div>
    )
  }
  if (tile.link) {
    return (
      <div role="button" onClick={() => onNav(linkToView(tile.link!))} {...hoverBrighten}
        style={s(`${ST_TILE_BASE}${tinted}cursor:pointer;`)}>
        {tile.label}
      </div>
    )
  }
  if (tile.terminal) {
    return <div style={s(`${ST_TILE_BASE}${tinted}${ST_TILE_MUTED}`)}>{tile.label}</div>
  }
  return (
    <div aria-disabled title="No linked page available" style={s(`${ST_TILE_BASE}${ST_UNLINKED_TILE}`)}>
      {tile.label}
    </div>
  )
}

function CategoryGridBlock({ columns, onNav }: { columns: CategoryColumn[]; onNav: Nav }) {
  const n = columns.length
  const gridStyle = s(`display:grid;grid-template-columns:repeat(${n},1fr);gap:6px;width:100%;`)
  return (
    <>
      <div style={gridStyle}>
        {columns.map((c, i) => {
          const h = HUE[c.tone]
          const tb = toneBox(h.rgb, h.color)
          return <div key={i} className="flow-node" style={s(`${tb.bg}border-color:rgba(${h.rgb},0.4);${tb.col}font-size:11px;cursor:default;min-width:0;`)}>{c.cat}</div>
        })}
      </div>
      <div style={gridStyle}>{columns.map((_, i) => <div key={i} className="flow-arrow-v">↓</div>)}</div>
      <div style={gridStyle}>
        {columns.map((c, i) => (
          <div key={i} style={ST_COL_FLEX}>
            {c.tiles.map((t, j) => <CategoryTileView key={j} tile={t} tone={c.tone} onNav={onNav} />)}
          </div>
        ))}
      </div>
    </>
  )
}

// ── Category columns (CAT_STYLE) ──────────────────────────────────────────────
const catStyle = (v: string) => ({ bg: `rgba(var(--cat-${v}),var(--tile-bg-a))`, border: `rgba(var(--cat-${v}),var(--tile-bd-a))`, col: `var(--cat-${v}-fg)` })
const CAT_STYLE: Record<string, { bg: string; border: string; col: string }> = {
  'Vascular': catStyle('vascular'),
  'Inflammatory': catStyle('inflammatory'),
  'Mass': catStyle('mass'),
  'Immune-mediated': catStyle('immune'),
  'Degenerative': catStyle('degenerative'),
  'Metabolic / Endocrine': catStyle('metabolic'),
  'Toxic': catStyle('toxic'),
  'Trauma': catStyle('trauma'),
  'Anomalous': catStyle('anomalous'),
}
const FALLBACK_TONES: Tone[] = ['slate', 'indigo', 'violet', 'teal', 'orange', 'green']
function CategoryColumnsBlock({ cols, columns, onNav }: { cols: number; columns: CatColumn[]; onNav: Nav }) {
  // Crowded layouts (>=5 categories) borrow the lesion-location page's spill
  // handling: never let a `1fr` column crush its label below a legible floor —
  // clamp each column to a min width and let the row scroll horizontally
  // instead — plus step the type down a touch. <=4 columns are unchanged
  // (repeat(cols,1fr), full width, original type sizes).
  const t = colTier(cols)
  const wide = t >= 1
  const headerFs = [9.5, 9, 8.5][t]
  const chipFs = [9, 8.5, 8][t]
  const headerPad = ['7px 5px', '7px 4px', '7px 4px'][t]
  const chipPad = ['6px 4px', '6px 3px', '5px 3px'][t]
  const minCol = [70, 76, 70][t]
  const totalMin = cols * minCol + (cols - 1) * 6
  const gridStyle = wide
    ? s(`display:grid;grid-template-columns:repeat(${cols},minmax(${minCol}px,1fr));gap:6px;min-width:${totalMin}px;justify-content:center;`)
    : s(`display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;`)
  const grid = (
    <div style={gridStyle}>
      {columns.map((c, i) => {
        const h = c.tone ? HUE[c.tone] : null
        const fb = HUE[FALLBACK_TONES[i % FALLBACK_TONES.length]]
        const st = h
          ? { bg: `rgba(${h.rgb},var(--tile-bg-a))`, border: `rgba(${h.rgb},var(--tile-bd-a))`, col: h.color }
          : CAT_STYLE[c.cat] ?? { bg: `rgba(${fb.rgb},var(--tile-bg-a))`, border: `rgba(${fb.rgb},var(--tile-bd-a))`, col: fb.color }
        return (
          <div key={i} style={s('display:flex;flex-direction:column;align-items:stretch;gap:4px;')}>
            <div style={s(`background:${st.bg};border:1.5px solid ${st.border};border-radius:10px;padding:${headerPad};font-size:${headerFs}px;font-weight:700;color:${st.col};text-align:center;line-height:1.3;`)}>{c.cat}</div>
            <div style={s(`color:${st.col};text-align:center;font-size:11px;line-height:1;`)}>↓</div>
            {c.tiles.map((t, j) => {
              if (t.links && t.links.length > 0) {
                return (
                  <div key={j} style={s(`background:${st.bg};border:1.5px solid ${st.border};border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:${st.col};text-align:center;line-height:1.35;cursor:default;`)}>
                    {t.label && <div style={s('margin-bottom:3px;')}>{t.label}</div>}
                    {t.links.map((ll, k) => (
                      <div key={k} role="button" onClick={() => onNav(linkToView(ll.link))}
                        style={s('cursor:pointer;text-align:left;padding:1px 0;font-size:8.5px;')} {...hoverBrighten}>
                        → {ll.label}
                      </div>
                    ))}
                  </div>
                )
              }
              const tinted = `background:${st.bg};border:1.5px solid ${st.border};color:${st.col};`
              const chip = (extra: string) => s(`${extra}border-radius:8px;padding:${chipPad};font-size:${chipFs}px;font-weight:600;text-align:center;line-height:1.35;`)
              if (t.link) {
                return (
                  <div key={j} role="button" onClick={() => onNav(linkToView(t.link!))} {...hoverBrighten}
                    style={chip(`${tinted}cursor:pointer;`)}>{t.label}</div>
                )
              }
              if (t.terminal) {
                return <div key={j} style={chip(`${tinted}${ST_TILE_MUTED}`)}>{t.label}</div>
              }
              return (
                <div key={j} aria-disabled title="No linked page available" style={chip(ST_UNLINKED_TILE)}>
                  {t.label}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
  return wide ? <div style={s(SCROLL_X)}>{grid}</div> : grid
}

// ── Decision tree ─────────────────────────────────────────────────────────────
// Solid, darkened tone fills for the decision tree (bold "card" look): the tone
// triplet mixed toward near-black for the fill, a stronger mix for the border,
// and the triplet mixed toward white for readable light text. Tone triplets are
// mode-stable, so these boxes render identically in light and dark mode.
const solidFill   = (rgb: string) => `color-mix(in srgb, rgb(${rgb}) 58%, #121212)`
const solidBorder = (rgb: string) => `color-mix(in srgb, rgb(${rgb}) 64%, #000)`
const solidText   = (rgb: string) => `color-mix(in srgb, rgb(${rgb}) 24%, #fff)`

function DecBox({ question, sub }: { question: string; sub?: string }) {
  return (
    <div style={s(`background:${solidFill('var(--tone-warning)')};border:1px solid ${solidBorder('var(--tone-warning)')};border-radius:10px;padding:9px 14px;width:100%;text-align:center;`)}>
      <div style={s('font-size:11.5px;font-weight:700;color:#F8FAFC;line-height:1.4;')}>{question}</div>
      {sub && <div style={s(`font-size:9px;color:${solidText('var(--tone-warning)')};margin-top:3px;`)}>{sub}</div>}
    </div>
  )
}
function OutBox({ o, onNav }: { o: DecisionOutcome; onNav: Nav }) {
  const h = HUE[o.tone]
  return <div style={s(`background:${solidFill(h.rgb)};border:1px solid ${solidBorder(h.rgb)};color:${solidText(h.rgb)};border-radius:9px;padding:9px 11px;font-size:9px;line-height:1.6;`)}><Raw html={o.html} onNav={onNav} /></div>
}
function DecisionStepView({ step, onNav }: { step: DecisionStep; onNav: Nav }) {
  if (step.type === 'split') {
    return (
      <>
        <DecBox question={step.question} sub={step.sub} />
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;margin-top:4px;')}>
          <div><div style={s('font-size:9px;font-weight:700;color:var(--gray);margin-bottom:4px;')}>{step.noLabel}</div><OutBox o={step.no} onNav={onNav} /></div>
          <div><div style={s('font-size:9px;font-weight:700;color:var(--gray);margin-bottom:4px;')}>{step.yesLabel}</div><OutBox o={step.yes} onNav={onNav} /></div>
        </div>
      </>
    )
  }
  if (step.type === 'outcome') {
    return <div style={s('margin-bottom:8px;')}><div style={s('font-size:9px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;')}>{step.label}</div><OutBox o={step.box} onNav={onNav} /></div>
  }
  const down = step.continue === 'YES'
  const contColor = 'var(--gray)'
  const arrowColor = 'var(--gray)'
  const exitColor = 'var(--gray)'
  const exitLabel = down ? 'NO →' : 'YES →'
  return (
    <>
      <DecBox question={step.question} sub={step.sub} />
      <div style={s('display:flex;gap:5px;width:100%;margin:4px 0 10px;')}>
        <div style={s('width:28%;display:flex;flex-direction:column;align-items:center;padding-top:4px;')}>
          <div style={s(`font-size:9px;font-weight:700;color:${contColor};`)}>{step.continue}</div>
          <div style={s(`font-size:18px;color:${arrowColor};line-height:1.1;`)}>↓</div>
        </div>
        <div style={s('flex:1;')}>
          <div style={s(`font-size:9px;font-weight:700;color:${exitColor};margin-bottom:4px;`)}>{exitLabel}</div>
          <OutBox o={step.exit} onNav={onNav} />
        </div>
      </div>
    </>
  )
}

// ── Info box ─────────────────────────────────────────────────────────────────
/** Tinted panel with optional icon + title header. Not in SPINE — no arrow. */
function InfoBoxBlock({ b, onNav }: { b: InfoBoxBlockType; onNav: Nav }) {
  const h = HUE[b.tone]
  return (
    <div style={s(`margin-top:${b.gap ?? 10}px;padding:9px 12px;background:rgba(${h.rgb},var(--panel-bg-a));border:1px solid rgba(${h.rgb},var(--panel-bd-a));border-radius:10px;width:100%;`)}>
      {(b.icon || b.title) && (
        <div style={s(`font-size:10px;font-weight:700;color:${h.color};margin-bottom:4px;`)}>
          {b.icon}{b.icon && b.title ? ' ' : ''}{b.title ?? ''}
        </div>
      )}
      <div style={s('font-size:9.5px;line-height:1.65;color:var(--gray);')}>
        <Raw html={b.html} onNav={onNav} />
      </div>
    </div>
  )
}

// ── Compare box ───────────────────────────────────────────────────────────────
function CompareBoxBlock({ b, onNav }: { b: Extract<Block, { kind: 'compareBox' }>; onNav: Nav }) {
  const h = HUE[b.tone]
  const grid = Array(b.cols ?? 2).fill('1fr').join(' ')
  return (
    <div style={s(`margin-top:${b.gap ?? 14}px;padding:10px 12px;background:rgba(${h.rgb},var(--panel-bg-a));border:1px solid rgba(${h.rgb},var(--panel-bd-a));border-radius:10px;width:100%;`)}>
      {b.title && <div style={{ ...ST_BLOCK_TITLE, color: h.color, marginBottom: '8px' }}><Raw html={b.title} onNav={onNav} /></div>}
      <div style={s(`display:grid;grid-template-columns:${grid};gap:6px;`)}>
        {b.cards.map((c, i) => (
          <div key={i} style={s(`font-size:9.5px;line-height:1.5;background:rgba(${h.rgb},0.08);border-radius:7px;padding:7px 9px;`)}>
            <div style={s(`color:${h.color};font-weight:700;margin-bottom:3px;`)}><Raw html={c.header} onNav={onNav} /></div>
            <Raw html={c.html} onNav={onNav} />
          </div>
        ))}
      </div>
      {b.footnote && <div style={s(`margin-top:7px;font-size:9.5px;line-height:1.6;color:color-mix(in srgb, ${h.color}, transparent 20%);`)}><Raw html={b.footnote} onNav={onNav} /></div>}
    </div>
  )
}

// ── Species compare ───────────────────────────────────────────────────────────
/** 🐕 vs 🐱 paired-row grid. dog[i] pairs with cat[i]; both may contain inline HTML. */
function SpeciesCompareBlock({ b, onNav }: { b: Extract<Block, { kind: 'speciesCompare' }>; onNav: Nav }) {
  const h = HUE.indigo
  return (
    <div style={s(`margin-top:10px;padding:10px 12px;background:rgba(${h.rgb},var(--panel-bg-a));border:1px solid rgba(${h.rgb},var(--panel-bd-a));border-radius:10px;width:100%;`)}>
      <div style={s(`font-size:10px;font-weight:700;color:${h.color};margin-bottom:5px;`)}>🐕 vs 🐱 KEY SPECIES DIFFERENCES</div>
      <div style={s('font-size:9px;line-height:1.5;color:var(--gray);')}>
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;')}>
          <div><strong style={{ color: HUE.info.color }}>DOG</strong></div>
          <div><strong style={{ color: 'var(--hl-orange)' }}>CAT</strong></div>
          {b.dog.map((d, i) => (
            <Fragment key={i}>
              <div><Raw html={d} onNav={onNav} /></div>
              <div><Raw html={b.cat[i] ?? ''} onNav={onNav} /></div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Species chooser (interactive 🐕/🐈 toggle) ────────────────────────────────
/** A segmented 🐕/🐈 toggle: picking a species reveals only that species'
 *  phenotype note + VITAMIN-D cause columns. Dog = info (blue), cat = violet. */
function SpeciesChooserBlock({ b, onNav }: { b: Extract<Block, { kind: 'speciesChooser' }>; onNav: Nav }) {
  const [sp, setSp] = useState<'dog' | 'cat'>(b.default ?? 'dog')
  const panel = sp === 'dog' ? b.dog : b.cat
  const tone: Tone = sp === 'dog' ? 'info' : 'violet'
  const btn = (id: 'dog' | 'cat', label: string) => {
    const on = sp === id
    const h = HUE[id === 'dog' ? 'info' : 'violet']
    return (
      <button type="button" onClick={() => setSp(id)} aria-pressed={on}
        style={s(`flex:1;padding:8px 10px;border-radius:9px;font-size:11px;font-weight:700;cursor:pointer;line-height:1;border:1.5px solid ${on ? `rgba(${h.rgb},var(--tile-bd-a))` : 'var(--border)'};background:${on ? `rgba(${h.rgb},var(--tile-bg-a))` : 'transparent'};color:${on ? h.color : 'var(--gray2)'};`)}>
        {label}
      </button>
    )
  }
  return (
    <div style={s('width:100%;display:flex;flex-direction:column;gap:8px;')}>
      <div style={s('display:flex;gap:6px;width:100%;')}>
        {btn('dog', '🐕 Canine')}
        {btn('cat', '🐈 Feline')}
      </div>
      <Box tone={tone} extra={`padding:9px 12px;font-size:9.5px;line-height:1.5;color:${HUE[tone].color};`}>
        <Raw html={panel.note} onNav={onNav} />
      </Box>
      <CategoryColumnsBlock cols={panel.cols ?? 3} columns={panel.columns} onNav={onNav} />
    </div>
  )
}

// ── Callout / alert / diseaseGrid / dxRow ─────────────────────────────────────
function CalloutBlock({ b, onNav }: { b: Extract<Block, { kind: 'callout' }>; onNav: Nav }) {
  const extra = `padding:9px 12px;font-size:9.5px;color:${HUE[b.tone].color};line-height:1.5;${b.gap ? `margin-top:${b.gap}px;` : ''}${b.center ? 'text-align:center;' : ''}`
  return (
    <Box tone={b.tone} extra={extra}>
      {b.title && <div style={{ ...ST_BLOCK_TITLE, color: TITLE[b.tone] ?? HUE[b.tone].color }}><Raw html={b.title} onNav={onNav} /></div>}
      <Raw html={b.html} onNav={onNav} />
    </Box>
  )
}
function AlertItemView({ it, onNav }: { it: AlertItem; onNav: Nav }) {
  if (typeof it === 'string') return <Raw html={it} onNav={onNav} />
  return (
    <>
      <span
        role="button"
        style={{ fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => onNav(linkToView(it.link))}
      >{it.bold}</span>
      {it.html && <Raw html={it.html} onNav={onNav} />}
    </>
  )
}
function AlertBlock({ tone, title, items, onNav }: { tone: Tone; title: string; items: AlertItem[]; onNav: Nav }) {
  return (
    <Box tone={tone} extra="margin-top:12px;padding:10px 12px;">
      <div style={s(`font-size:10px;font-weight:700;color:${TITLE[tone] ?? HUE[tone].color};margin-bottom:5px;`)}>{title}</div>
      <div style={s(`font-size:9.5px;line-height:1.55;color:${HUE[tone].color};`)}>
        {items.map((it, i) => <Fragment key={i}>{i > 0 && <br />}{'• '}<AlertItemView it={it} onNav={onNav} /></Fragment>)}
      </div>
    </Box>
  )
}
function DiseaseGridBlock({ title, links, onNav }: { title: string; links: LabeledLink[]; onNav: Nav }) {
  return (
    <Box tone="teal" extra="margin-top:10px;padding:10px 12px;">
      <div style={{ ...ST_BLOCK_TITLE, color: 'var(--tone-teal-fg)' }}>{title}</div>
      <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;')}>
        {links.map((l, i) => <div key={i} role="button" onClick={() => onNav(linkToView(l.link))} style={s('cursor:pointer;color:var(--fg-teal-deep);')}>→ {l.label}</div>)}
      </div>
    </Box>
  )
}
function DxRowBlock({ items, onNav }: { items: LabeledLink[]; onNav: Nav }) {
  return (
    <div style={s('display:flex;flex-direction:column;gap:6px;width:100%;margin-top:10px;')}>
      {items.map((i2, i) => {
        const isProto = i2.link.to === 'protocol'
        if (isProto) {
          return (
            <div key={i} role="button" onClick={() => onNav(linkToView(i2.link))}
              style={s('cursor:pointer;background:rgba(var(--tone-danger),var(--panel-bg-a));border:1px solid rgba(var(--tone-danger),var(--panel-bd-a));border-radius:10px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;')}>
              <span style={s('font-size:11px;font-weight:700;color:var(--tone-danger-fg);')}>{i2.label}</span>
              <span style={s('color:var(--tone-danger-fg);font-size:14px;opacity:.7;')}>›</span>
            </div>
          )
        }
        return (
          <div key={i} className="card" role="button" onClick={() => onNav(linkToView(i2.link))}>
            <div className="card-row">
              <div style={{ flex: 1 }}>
                <div className="card-title">{i2.label}</div>
              </div>
              <div className="card-arrow">›</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Dispatch ──────────────────────────────────────────────────────────────────
function BlockView({ b, onNav }: { b: Block; onNav: Nav }): ReactNode {
  switch (b.kind) {
    case 'node': return <NodeBlock b={b} />
    case 'branch': return <BranchBlock columns={b.columns} onNav={onNav} />
    case 'endpoints': return <div style={s('display:flex;flex-direction:column;gap:4px;width:100%;')}>{b.items.map((e, i) => <EndpointView key={i} e={e} onNav={onNav} />)}</div>
    case 'fnHeader': return <FnHeaderBlock b={b} />
    case 'cardGrid': return <CardGridBlock perRow={b.perRow ?? 2} tiles={b.tiles} onNav={onNav} />
    case 'choices': return <ChoicesBlock cols={b.cols ?? b.items.length} size={b.size ?? 11} items={b.items} onNav={onNav} />
    case 'banner': return <BannerBlock tone={b.tone} html={b.html} onNav={onNav} />
    case 'callout': return <CalloutBlock b={b} onNav={onNav} />
    case 'alert': return <AlertBlock tone={b.tone} title={b.title} items={b.items} onNav={onNav} />
    case 'diseaseGrid': return <DiseaseGridBlock title={b.title} links={b.links} onNav={onNav} />
    case 'dxRow': return <DxRowBlock items={b.items} onNav={onNav} />
    case 'table': return <TableBlock b={b} onNav={onNav} />
    case 'cardSection': return <CardSectionBlock b={b} onNav={onNav} />
    case 'categoryGrid': return <CategoryGridBlock columns={b.columns} onNav={onNav} />
    case 'categoryColumns': return <CategoryColumnsBlock cols={b.cols ?? 3} columns={b.columns} onNav={onNav} />
    case 'decisionTree': return <>{b.steps.map((step, i) => <DecisionStepView key={i} step={step} onNav={onNav} />)}</>
    case 'compareBox': return <CompareBoxBlock b={b} onNav={onNav} />
    case 'speciesCompare': return <SpeciesCompareBlock b={b} onNav={onNav} />
    case 'speciesChooser': return <SpeciesChooserBlock b={b} onNav={onNav} />
    case 'infoBox': return <InfoBoxBlock b={b} onNav={onNav} />
    case 'disclaimer': return DISCLAIMER
    case 'html': return <Raw html={b.html} onNav={onNav} />
    default: throw new Error(`FlowPageView: block kind '${(b as Block).kind}' not implemented`)
  }
}

function hasOutboundFlowLinks(blocks: Block[]): boolean {
  for (const b of blocks) {
    if (b.kind === 'choices' && b.items.some(i => i.link?.to === 'flow')) return true
    if (b.kind === 'categoryGrid' && b.columns.some(col =>
      col.tiles.some(t => t.link?.to === 'flow' || t.links?.some(ll => ll.link.to === 'flow'))
    )) return true
    if (b.kind === 'branch') {
      for (const col of b.columns) {
        if (hasOutboundFlowLinks(col.blocks)) return true
      }
    }
  }
  return false
}

function getDxSign(page: { id: string; dxSign?: string }): string | undefined {
  if (page.dxSign) return page.dxSign
  let id = page.id
  while (id) {
    if (DX[id]) return id
    const next = id.replace(/-[^-]+$/, '')
    if (next === id) break
    id = next
  }
  return undefined
}

export function FlowPageView({ flowId }: { flowId: string }) {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const page = FLOWS[flowId]
  if (!page) return <NotFound what={`Flow "${flowId}"`} />
  if (page.layout === 'fn') return <BlockList blocks={page.blocks} fn onNav={onNav} />
  const blocks = page.blocks
  const lastIsDisc = blocks.length > 0 && blocks[blocks.length - 1].kind === 'disclaimer'
  const main = lastIsDisc ? blocks.slice(0, -1) : blocks
  const isLeaf = !hasOutboundFlowLinks(main)
  const dxSign = isLeaf && !page.noCard ? getDxSign(page) : undefined
  return (
    <>
      <div className="flow-wrap"><BlockList blocks={main} onNav={onNav} /></div>
      {dxSign && (
        <NavCard icon="🔬" title="Diagnostic Approach" sub="Stepwise clinical workup flowchart"
          onClick={() => onNav({ kind: 'dx', sign: dxSign, tab: 'history' })}
          style={{ marginTop: 10 }} />
      )}
      {lastIsDisc && DISCLAIMER}
    </>
  )
}
