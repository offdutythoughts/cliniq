'use client'
// Flowchart view — React port of renderFlow.ts (renderFlowPage + every block
// renderer). Same .flow-*/.fn-* classes and inline styles → pixel-identical.
// esc()'d text fields become plain text (React escapes); raw-HTML fields
// (choice labels, callout/banner/compareBox/table/decision html) go through the
// audited <RichText> boundary; links route via linkToView.

import { Fragment, useState, type ReactNode } from 'react'
import type {
  Block, Column, Endpoint, ChoiceItem, CardTile, CategoryColumn, CategoryTile, CatColumn, DecisionStep, ForkLeg,
  DecisionOutcome, TableCell, TableRow, LabeledLink, Tone, InfoBoxBlock as InfoBoxBlockType,
  AlertItem,
} from '../../lib/signs/flowTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { FLOWS } from '../../lib/signs/flows'
import { DX } from '../../lib/signs/dx'
import { RichText } from '../../components/RichText'
import { useNav } from '../nav/NavContext'
import { linkToView } from '../nav/view'
import { styleStringToObject as s, toneBox, SCROLL_X, colTier, evenTracks, WRAP_ANY } from './style'
import { NotFound } from './NotFound'
import { ForkLines, type Nav, Raw, ToneBox } from './flowHelpers'
import { NavCard } from './markup'

const DISCLAIMER = <div className="disclaimer">For qualified veterinary professionals only.</div>

// ── Shared static style constants ─────────────────────────────────────────────
const ST_SECTION_LABEL = s('grid-column:1/-1;padding:4px 0 2px;font-size:8px;font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(var(--slate-muted),.08);margin-top:2px;')
const ST_ROW_DIVIDER   = s('grid-column:1/-1;height:1px;background:rgba(var(--slate-muted),.2);')
const ST_BLOCK_TITLE   = s('font-size:11px;font-weight:700;margin-bottom:6px;')
const ST_COL_FLEX      = s('display:flex;flex-direction:column;gap:4px;')
const ST_UNLINKED_TILE = 'background:var(--card);border:1.5px solid var(--border);color:var(--gray2);opacity:.72;filter:saturate(.2);cursor:default;'
const ST_TILE_BASE     = 'border-radius:8px;padding:6px 8px;font-size:10px;font-weight:600;text-align:center;line-height:1.3;word-break:break-word;overflow-wrap:anywhere;'
// Muted (intentional leaf note): keeps the category hue but visibly de-emphasised
// — distinct from ST_UNLINKED_TILE (desaturated grey = authoring gap / lint error).
const ST_TILE_MUTED    = 'opacity:.6;cursor:default;'

// Shared hover-brighten handlers (spread onto any clickable tinted element).
const hoverBrighten = {
  onMouseOver: (ev: React.MouseEvent<HTMLElement>) => { ev.currentTarget.style.filter = 'brightness(1.2)' },
  onMouseOut:  (ev: React.MouseEvent<HTMLElement>) => { ev.currentTarget.style.filter = '' },
}

// ── Arrow / spine logic (joinBlocks) ─────────────────────────────────────────
const SPINE = new Set(['node', 'branch', 'endpoints', 'choices', 'callout', 'fnHeader', 'cardGrid', 'categoryGrid', 'categoryColumns', 'decisionTree', 'fork', 'speciesChooser'])
// A fork with a `continue` leg already arrows into the next spine block down the
// continuing leg, so the spine must not add a second, centred arrow — that one
// would hang under the OTHER leg's terminal outcome and read as if the dead-end
// carried on into the next step.
const connectsAfter = (b: Block): boolean =>
  b.connectAfter ?? (b.kind === 'fork' ? !b.legs.some(l => l.continue) : SPINE.has(b.kind))
const connectsBefore = (b: Block): boolean => SPINE.has(b.kind)

// ── Fork connector — how EVERY split is drawn ─────────────────────────────────
// <ForkLines> (the shared component, in flowHelpers) is the ONE connector in
// front of a split, on every screen; see its comment there for the geometry.

// The fork that should precede a block which lays its content out as a row of
// columns: leg count, the split grid's gap, and (when the tracks aren't even 1fr)
// its grid-template-columns so the legs line up track-for-track. `null` = not a
// split, so the spine draws its usual single arrow. `'self'` = the block draws
// its own leading fork (see `lead` on BranchBlock/CategoryBlock).
//
// Every row that fits itself to the measured width draws its OWN fork, because
// only the block knows how many columns ended up on its first line: a four-
// category row that wraps to 2 + 2 on a phone needs a two-leg fork, and the
// spine — which renders before any measurement — would have drawn four.
type Fork = { n: number; gap: number; cols?: string; extra?: string; rootExtra?: string }
function splitCols(b: Block): Fork | 'self' | null {
  const fork = (n: number, gap: number, cols?: string) => (n >= 2 ? { n, gap, cols } : null)
  switch (b.kind) {
    case 'branch': return b.columns.length >= 2 ? 'self' : null
    case 'categoryGrid':
    case 'categoryColumns': return b.columns.length >= 2 ? 'self' : null
    case 'choices': return fork(b.cols ?? b.items.length, 6)
    default: return null
  }
}

function BlockList({ blocks, fn, onNav }: { blocks: Block[]; fn?: boolean; onNav: Nav }) {
  const connector = (b: Block) => {
    if (fn) return <div className="fn-arrow">↓</div>
    const split = splitCols(b)
    if (split === 'self') return null // drawn by the block, inside its scroll box
    return split ? <ForkLines {...split} /> : <div className="flow-arrow-v">↓</div>
  }
  return (
    <>
      {blocks.map((b, i) => {
        const joined = i > 0 && connectsAfter(blocks[i - 1]) && connectsBefore(b)
        return (
          <Fragment key={i}>
            {joined && connector(b)}
            <BlockView b={b} lead={joined && !fn && splitCols(b) === 'self'} onNav={onNav} />
          </Fragment>
        )
      })}
    </>
  )
}

// ── Fork block (explicit labelled split) ──────────────────────────────────────
// The same connector, plus a label per leg and each leg's own outcome below it.
// A `continue` leg draws no outcome: its line stretches to the bottom of the row
// and arrows into the next spine block, keeping the primary path unbroken.
function ForkLegHead({ l }: { l: ForkLeg }) {
  // Two looks, chosen by what the leg carries:
  //  • a plain caption — a bare YES/NO gate whose answer is one short phrase
  //    ("True PU/PD"). A box around two words is noise.
  //  • a tone-tinted card — a leg the reader has to MATCH against the patient:
  //    bulleted one finding per line, at the tile font size, coloured so the
  //    arms are told apart before a word is read. This is what replaces the
  //    grey 8.5px centred run-on that used to carry four criteria in a sentence.
  const hasCard = !!l.tone || (l.subItems?.length ?? 0) > 0
  if (!hasCard) {
    return (
      <div style={s('display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;text-align:center;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--gray2);letter-spacing:.04em;')}>{l.label}</div>
        {l.sub && <div style={s('font-size:8.5px;color:var(--gray2);line-height:1.35;')}>{l.sub}</div>}
      </div>
    )
  }
  const h = l.tone ? HUE[l.tone] : null
  const box = h
    ? `background:rgba(${h.rgb},var(--tile-bg-a));border:1.5px solid rgba(${h.rgb},var(--tile-bd-a));`
    : 'background:var(--card);border:1.5px solid var(--border2);'
  const color = h ? h.color : 'var(--gray)'
  return (
    <div style={s(`${box}border-radius:9px;padding:6px 8px;width:100%;min-width:0;`)}>
      <div style={s(`font-size:10px;font-weight:700;color:${color};letter-spacing:.04em;text-align:center;line-height:1.3;`)}>{l.label}</div>
      {l.sub && <div style={s(`font-size:9px;color:${color};opacity:.85;line-height:1.4;text-align:center;margin-top:2px;`)}>{l.sub}</div>}
      {l.subItems && l.subItems.length > 0 && (
        <div style={s(`font-size:9px;color:${color};opacity:.9;line-height:1.45;text-align:left;margin-top:4px;display:flex;flex-direction:column;gap:2px;`)}>
          {l.subItems.map((it, i) => (
            <div key={i} style={s('display:flex;gap:4px;align-items:flex-start;')}>
              <span aria-hidden="true">•</span><span style={s('min-width:0;')}>{it}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
function ForkBlockView({ legs, onNav }: { legs: ForkLeg[]; onNav: Nav }) {
  const n = legs.length
  const grid = s(`display:grid;grid-template-columns:${evenTracks(n)};gap:8px;width:100%;`)
  // One .flow-wrap child: the connector, the leg labels and the leg bodies are a
  // single unit with its own tight spacing (the wrap's 8px gap would otherwise
  // push the label off its own line).
  return (
    <div style={s('width:100%;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;')}>
      <ForkLines n={n} gap={8} arrow={false} />
      <div style={grid}>
        {legs.map((l, i) => (
          <div key={i} style={s('display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;')}>
            <ForkLegHead l={l} />
          </div>
        ))}
      </div>
      <div style={grid}>
        {legs.map((l, i) => (
          <div key={i} className="flow-col" style={s('display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;')}>
            <div className="flow-arrow-v" style={l.continue ? s('height:auto;flex:1;min-height:16px;') : undefined} />
            {l.blocks && l.blocks.length > 0 && (
              <div style={s('display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;')}>
                <BlockList blocks={l.blocks} onNav={onNav} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
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
      {b.subItems && (
        <div className="fn-sub" style={s('font-weight:400;margin-top:4px;text-align:left;line-height:1.55;')}>
          {b.subItems.map((it, i) => (
            <div key={i} style={s('display:flex;gap:5px;align-items:flex-start;')}>
              <span aria-hidden="true">•</span><span style={s('min-width:0;')}>{it}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Endpoints ─────────────────────────────────────────────────────────────────
function endpointStyle(tone: Tone): string {
  if (tone === 'neutral') return 'background:var(--card);border:1.5px solid var(--border2);color:var(--gray);'
  const h = HUE[tone]
  return `background:rgba(${h.rgb},var(--panel-bg-a));border:1.5px solid rgba(${h.rgb},var(--panel-bd-a));color:${h.color};`
}
// Rule 3 — a chip with no `link` has no disease page behind it, so it renders
// MUTED: same treatment as a `terminal` category tile (in-tone, dimmed, no
// pointer, no hover — `.flow-endpoint[role="button"]:hover` in globals.css is
// scoped to the clickable ones). Muting lives here, not in the data, so it
// applies to every unlinked chip already authored and every one added later.
function EndpointView({ e, onNav }: { e: Endpoint; onNav: Nav }) {
  const tone = e.tone ?? 'neutral'
  const clickable = !!e.link
  const cursor = clickable ? 'cursor:pointer;' : ST_TILE_MUTED
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

// ── Choices (name-only separation boxes; `label` is raw HTML) ────────────────
// `.flow-node`'s stock 14px side padding is sized for a full-width box. Packed
// five to a row on a phone that is 28 of the ~62px each box gets, leaving 34px
// of text width — not enough for "Anterior" or "forebrain", so they broke
// mid-word. Scale the padding with the column count, same tiering the lesion
// grid and the category rows use: the crowd is what costs the space, so the
// crowd is what pays it back.
const CHOICE_PAD = (cols: number) => (cols <= 3 ? '9px 14px' : cols === 4 ? '8px 8px' : '7px 4px')
function ChoicesBlock({ cols, size, items, onNav }: { cols: number; size: number; items: ChoiceItem[]; onNav: Nav }) {
  const pad = CHOICE_PAD(cols)
  return (
    // `minmax(0,1fr)` + `min-width:0`: a choice row carrying `step`/`entry`
    // nodes would otherwise hold their 200px/180px floors, and two of them run
    // a 375px phone off the page. The labels wrap instead.
    <div style={s(`display:grid;grid-template-columns:${evenTracks(cols)};gap:6px;width:100%;`)}>
      {items.map((it, i) => {
        const cls = it.variant ? ` ${it.variant}` : ''
        const toneStyle = it.tone ? `background:rgba(${HUE[it.tone].rgb},var(--tile-bg-a));border-color:rgba(${HUE[it.tone].rgb},var(--tile-bd-a));color:${HUE[it.tone].color};` : ''
        const cursor = it.link ? 'cursor:pointer;' : ''
        return (
          <div key={i} className={`flow-node${cls}`} style={s(`${toneStyle}${cursor}font-size:${size}px;font-weight:700;min-width:0;padding:${pad};${WRAP_ANY}`)}
            {...(it.link ? { role: 'button', onClick: () => onNav(linkToView(it.link!)) } : {})}>
            <Raw html={it.label} onNav={onNav} />
          </div>
        )
      })}
    </div>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────
// A pinned first column paints the page background behind itself AND across the
// 6px column gap (the box-shadow spread), so the scrolling columns slide under
// it cleanly; the second shadow layer is the divider that marks the seam.
const STICKY_COL = 'position:sticky;left:0;z-index:1;background:var(--navy);'
  + 'box-shadow:6px 0 0 var(--navy),7px 0 0 rgba(var(--slate-muted),.25);'
function Cell({ c, header, sticky, onNav }: { c: TableCell; header?: boolean; sticky?: boolean; onNav: Nav }) {
  const text = typeof c === 'string' ? c : c.text
  const tone = typeof c !== 'string' ? c.tone : undefined
  const color = tone ? `color:${HUE[tone].color};` : ''
  const head = header
    ? tone
      ? `font-weight:700;padding-bottom:4px;border-bottom:2px solid ${HUE[tone].color};white-space:nowrap;${color}`
      : 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(var(--slate-muted),.25);'
    : color
  return <div style={s(`${head}${sticky ? STICKY_COL : ''}`)}><Raw html={text} onNav={onNav} /></div>
}
function TableBlock({ b, onNav }: { b: Extract<Block, { kind: 'table' }>; onNav: Nav }) {
  const lastIdx = b.rows.length - 1
  const grid = (
    <div style={s(`display:grid;grid-template-columns:${b.cols};gap:${b.dividers ? 9 : 3}px 6px;font-size:9.5px;line-height:1.4;${b.minWidth ? `min-width:${b.minWidth}px;` : ''}`)}>
      {b.headers.map((h, i) => <Cell key={`h${i}`} c={h} header sticky={b.stickyFirstCol && i === 0} onNav={onNav} />)}
      {b.rows.map((row, ri) =>
        Array.isArray(row)
          ? (
            <Fragment key={ri}>
              {row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} sticky={b.stickyFirstCol && ci === 0} onNav={onNav} />)}
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
          <div key={i} style={s(`background:rgba(${h.rgb},var(--tile-bg-a));border-radius:7px;padding:7px 10px;${c.link ? 'cursor:pointer;' : ST_UNLINKED_TILE}`)}
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
    // `min-width:0` lets the column shrink below its content at phone widths;
    // `.flow-col` is what lets the content shrink WITH it (see globals.css) —
    // without it a 200px-min step node overflows onto the neighbouring arm.
    <div className="flow-col" style={s('display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;')}>
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
// Branch arms are STATIC: they share the width evenly and always fit it, at
// every nesting depth. No floor, no scroll box — `minmax(0,1fr)` tracks, and the
// arms absorb the squeeze internally (`.flow-col` lets their boxes shrink,
// `overflow-wrap:anywhere` lets the labels wrap). A split you can see all of is
// worth more than one whose arms hold a nominal width and hide half of
// themselves behind a scrollbar: an arm the reader can't see is an arm they
// don't know to consider.
//
// Nesting still costs width — three splits deep is a fraction of the column
// however it is shared out — but `armWeight` below spends what there is where
// the content actually is, rather than halving it evenly at every level.
const BRANCH_GAP = 8
// Does this arm have to fit a further split inside itself?
const splitsAgain = (blocks: Block[]): boolean =>
  blocks.some(b =>
    b.kind === 'branch' ? true
    : b.kind === 'fork' ? b.legs.some(l => splitsAgain(l.blocks ?? []))
    : false)
// Arms are weighted by what they have to hold, not counted off evenly. An arm
// that ends in a chip needs the width of a chip; an arm that splits again has to
// fit two of them, so it gets twice the share.
//
// This is what stops the deep side of a flow starving. Even shares compound:
// three splits down, each level halving, left the last boxes ~37px on a phone —
// one letter per line — while the shallow sibling arms sat half empty beside
// them. Weighting spends that idle space where the content actually is.
//
// Capped at 2:1 (not the arm's true leaf count) so it can't overcorrect: a
// shallow arm is often shallow *and* wordy — REGURGITATION ends in two long
// endpoint names — and starving it to a quarter of the row to widen its
// neighbour just trades one unreadable arm for another.
const armWeight = (col: Column) => (splitsAgain(col.blocks) ? 2 : 1)
function BranchBlock({ columns, lead, onNav }: { columns: Column[]; lead?: boolean; onNav: Nav }) {
  const cols = columns.map(c => `minmax(0,${armWeight(c)}fr)`).join(' ')
  // `gap:8px` reproduces the .flow-wrap spacing the fork had when the spine
  // drew it; the fork mirrors the arms' own tracks so its drops land on them.
  return (
    <div style={s('width:100%;display:flex;flex-direction:column;gap:8px;')}>
      {lead && <ForkLines n={columns.length} gap={BRANCH_GAP} cols={cols} />}
      <div style={s(`display:grid;grid-template-columns:${cols};gap:${BRANCH_GAP}px;width:100%;`)}>
        {columns.map((c, i) => <ColumnView key={i} col={c} onNav={onNav} />)}
      </div>
    </div>
  )
}

// ── fn header + card grid ─────────────────────────────────────────────────────
function FnHeaderBlock({ b }: { b: Extract<Block, { kind: 'fnHeader' }> }) {
  return <div className={`fn fn-${b.variant}`}>{b.text}</div>
}
function CardGridBlock({ perRow, tiles, onNav }: { perRow: number; tiles: CardTile[]; onNav: Nav }) {
  const rowStyle = perRow === 2 ? undefined : s(`grid-template-columns:${evenTracks(perRow)};`)
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

// ── Category tiles ────────────────────────────────────────────────────────────
// A category tile has four render variants, shared by BOTH category blocks
// (categoryGrid + categoryColumns) so their behaviour — variant dispatch, click,
// hover, aria — can never diverge. A change here (new variant, hover, a11y) lands
// on every category page at once:
//  • `links` (plural) → in-tone box + clickable sub-bullets — BANNED in data
//                       (lint:tiles); kept so the renderer stays total
//  • `link`  (single) → clickable in-tone chip
//  • `terminal`       → in-tone plain info leaf (no page to link to)
//  • otherwise        → greyed + aria-disabled = authoring gap (missing link)
// Only the size tokens differ per block; they live in a TileTheme preset so the
// markup/logic stays in one place.
type TileTheme = { chip: string; linksBox: string; linksLabelMb: string; subFs: string; subPad: string }
const TILE_GRID: TileTheme = { chip: ST_TILE_BASE, linksBox: ST_TILE_BASE, linksLabelMb: '4px', subFs: '9.5px', subPad: '2px 0' }
function CatTile({ tile, st, theme, onNav }: { tile: CategoryTile; st: { bg: string; border: string; col: string }; theme: TileTheme; onNav: Nav }) {
  const tint = `background:${st.bg};border:1.5px solid ${st.border};color:${st.col};`
  if (tile.links && tile.links.length > 0) {
    return (
      <div style={s(`${tint}${theme.linksBox}cursor:default;`)}>
        {tile.label && <div style={s(`margin-bottom:${theme.linksLabelMb};`)}>{tile.label}</div>}
        {tile.links.map((ll, k) => (
          <div key={k} role="button" onClick={() => onNav(linkToView(ll.link))}
            style={s(`cursor:pointer;text-align:left;padding:${theme.subPad};font-size:${theme.subFs};`)} {...hoverBrighten}>
            → {ll.label}
          </div>
        ))}
      </div>
    )
  }
  // Optional muted second line (e.g. "Most common canine cause") — mirrors the
  // endpoint sublabel styling so a tile reads the same in either block.
  const sub = tile.sublabel
    ? <div style={s('font-size:8px;font-weight:400;opacity:.75;margin-top:2px;')}>{tile.sublabel}</div>
    : null
  if (tile.link) {
    return (
      <div role="button" onClick={() => onNav(linkToView(tile.link!))} {...hoverBrighten}
        style={s(`${tint}${theme.chip}cursor:pointer;`)}>
        {tile.label}{sub}
      </div>
    )
  }
  if (tile.terminal) return <div style={s(`${tint}${theme.chip}${ST_TILE_MUTED}`)}>{tile.label}{sub}</div>
  return (
    <div aria-disabled title="No linked page available" style={s(`${ST_UNLINKED_TILE}${theme.chip}`)}>
      {tile.label}
    </div>
  )
}

// Legible floor per preset — the width a category column may not shrink below.
// Above it the tracks are even 1fr and the row simply fits; at it the row stops
// shrinking and SCROLLS instead.
//  • 'grid'  — 130px keeps four categories on one line in the app's ~568px flow
//              column (4×130 + gaps ≈ 538) and never breaks the longest single
//              word ("Adenocarcinoma") mid-label.
//  • 'dense' — the crowded lesion look, tiered by how many columns are packed in.
const CAT_MIN_COL = { grid: 130, dense: [70, 76, 70] } as const
const CAT_GAP = 6
type CatPreset = 'grid' | 'dense'
// The single category-layout renderer behind BOTH `categoryGrid` and
// `categoryColumns`. Every category stays on ONE line — three column-aligned
// sub-grids (headers → arrows → tile stacks) so a category and its diseases read
// as one vertical column, side by side with its peers. Two presets carry the
// only real differences:
//   • 'grid'  — roomy sign-flow look: flow-node headers, styled arrows, 10px
//               tiles, min-col 130, 8px row gap.
//   • 'dense' — crowded lesion look: tiered small headers/tiles, plain ↓ arrows,
//               tiered min-col, 4px row gap.
//
// The row never wraps onto a second line. Wrapping was tried and is wrong here:
// the columns carry tile STACKS of unequal height, so a wrapped column lands far
// below the tallest stack of the line above and reads as a continuation of it
// rather than as a peer category. Below the legible floor the row scrolls
// sideways as one unit instead — the columns stay adjacent and comparable, and
// the reader swipes. `.scroll-x` marks the edges so it's visible there is more.
//
// `lead` = this block follows a connected block AND is the split the spine left
// to it: draw the fork as the first child of the scroll box, on the row's own
// tracks, so connector and columns scroll together and stay aligned.
function CategoryBlock({ columns, cols, preset, lead, onNav }: { columns: CatColumn[]; cols: number; preset: CatPreset; lead?: boolean; onNav: Nav }) {
  const dense = preset === 'dense'
  const t = dense ? colTier(cols) : 0
  const minCol = dense ? CAT_MIN_COL.dense[t] : CAT_MIN_COL.grid
  // At or above the floor `minmax(FLOOR,1fr)` IS 1fr, so a row with room behaves
  // exactly as an even row; `minWidth` only bites once it doesn't fit, and then
  // it is what makes the wrapper scroll rather than the columns crush.
  const tracks = `repeat(${cols},minmax(${minCol}px,1fr))`
  const minWidth = cols * minCol + (cols - 1) * CAT_GAP
  const gridStyle = s(`display:grid;grid-template-columns:${tracks};gap:${CAT_GAP}px;min-width:${minWidth}px;`)
  const headerFs = dense ? [9.5, 9, 8.5][t] : 11
  const theme: TileTheme = dense
    ? {
        chip: `border-radius:8px;padding:${['6px 4px', '6px 3px', '5px 3px'][t]};font-size:${[9, 8.5, 8][t]}px;font-weight:600;text-align:center;line-height:1.35;${WRAP_ANY}`,
        linksBox: `border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;text-align:center;line-height:1.35;${WRAP_ANY}`,
        linksLabelMb: '3px', subFs: '8.5px', subPad: '1px 0',
      }
    : TILE_GRID
  const st = (i: number) => resolveCatStyle(columns[i].cat, columns[i].tone, i)
  const header = (c: CatColumn, i: number) => dense
    ? <div key={i} style={s(`background:${st(i).bg};border:1.5px solid ${st(i).border};border-radius:10px;padding:${['7px 5px', '7px 4px', '7px 4px'][t]};font-size:${headerFs}px;font-weight:700;color:${st(i).col};text-align:center;line-height:1.3;${WRAP_ANY}`)}>{c.cat}</div>
    : <div key={i} className="flow-node" style={s(`background:${st(i).bg};border-color:${st(i).border};color:${st(i).col};font-size:11px;cursor:default;min-width:0;${WRAP_ANY}`)}>{c.cat}</div>
  const arrow = (i: number) => dense
    ? <div key={i} style={s(`color:${st(i).col};text-align:center;font-size:11px;line-height:1;`)}>↓</div>
    : <div key={i} className="flow-arrow-v">↓</div>
  // One flow-wrap child: the fork and the three sub-grids share a single scroll
  // track, so they slide together and the drops stay on their headers. Spaced by
  // the preset's row gap (grid 8px / dense 4px).
  return (
    <div className="scroll-x" style={s(`width:100%;display:flex;flex-direction:column;gap:${dense ? 4 : 8}px;`)}>
      {lead && <ForkLines n={cols} gap={CAT_GAP} cols={tracks} extra={`min-width:${minWidth}px;`} rootExtra={`min-width:${minWidth}px;`} />}
      <div style={gridStyle}>{columns.map((c, i) => header(c, i))}</div>
      <div style={gridStyle}>{columns.map((_, i) => arrow(i))}</div>
      <div style={gridStyle}>
        {columns.map((c, i) => (
          <div key={i} style={ST_COL_FLEX}>
            {c.tiles.map((tile, j) => <CatTile key={j} tile={tile} st={st(i)} theme={theme} onNav={onNav} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Category columns (CAT_STYLE) ──────────────────────────────────────────────
const catStyle = (v: string) => ({ bg: `rgba(var(--cat-${v}),var(--tile-bg-a))`, border: `rgba(var(--cat-${v}),var(--tile-bd-a))`, col: `var(--cat-${v}-fg)` })
// One lesion category → one colour, everywhere. Keys are the `CatLabel` union in
// flowTypes; `lint:cats` fails any category column whose label is neither a key
// here nor a reviewed page-specific (anatomical / mechanism) column.
const CAT_STYLE: Record<string, { bg: string; border: string; col: string }> = {
  'Vascular': catStyle('vascular'),
  'Inflammatory': catStyle('inflammatory'),
  'Infectious': catStyle('infectious'),
  'Neoplastic': catStyle('neoplastic'),
  'Immune-mediated': catStyle('immune'),
  'Degenerative': catStyle('degenerative'),
  'Metabolic / Endocrine': catStyle('metabolic'),
  'Metabolic': catStyle('metabolic'),
  'Endocrine': catStyle('endocrine'),
  'Neurological': catStyle('neurological'),
  'Toxic': catStyle('toxic'),
  // Drug-induced disease is iatrogenic toxicity — same palette, distinct label.
  'Drug-induced': catStyle('toxic'),
  'Trauma': catStyle('trauma'),
  'Anomalous': catStyle('anomalous'),
}
const FALLBACK_TONES: Tone[] = ['slate', 'indigo', 'violet', 'teal', 'orange', 'green']
// Single source of truth for a category's tinted style triple, shared by both
// category blocks so headers/tiles can never diverge: an explicit `tone` (HUE)
// wins, else a CAT_STYLE label, else an index-cycled fallback tone. Alphas are
// always tokenised (--tile-bg-a / --tile-bd-a) so light mode stays legible.
function resolveCatStyle(cat: string, tone?: Tone, i = 0): { bg: string; border: string; col: string } {
  const h = tone ? HUE[tone] : null
  if (h) return { bg: `rgba(${h.rgb},var(--tile-bg-a))`, border: `rgba(${h.rgb},var(--tile-bd-a))`, col: h.color }
  if (CAT_STYLE[cat]) return CAT_STYLE[cat]
  const fb = HUE[FALLBACK_TONES[i % FALLBACK_TONES.length]]
  return { bg: `rgba(${fb.rgb},var(--tile-bg-a))`, border: `rgba(${fb.rgb},var(--tile-bd-a))`, col: fb.color }
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
        {/* Same fork as every other split — the tree's two outcomes are one. */}
        <ForkLines n={2} gap={6} />
        <div style={s('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px;width:100%;')}>
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
  const grid = Array(b.cols ?? 2).fill('minmax(0,1fr)').join(' ')
  return (
    <div style={s(`margin-top:${b.gap ?? 14}px;padding:10px 12px;background:rgba(${h.rgb},var(--panel-bg-a));border:1px solid rgba(${h.rgb},var(--panel-bd-a));border-radius:10px;width:100%;`)}>
      {b.title && <div style={{ ...ST_BLOCK_TITLE, color: h.color, marginBottom: '8px' }}><Raw html={b.title} onNav={onNav} /></div>}
      <div style={s(`display:grid;grid-template-columns:${grid};gap:6px;`)}>
        {b.cards.map((c, i) => (
          <div key={i} style={s(`font-size:9.5px;line-height:1.5;background:rgba(${h.rgb},var(--tile-bg-a));border-radius:7px;padding:7px 9px;`)}>
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
        <div style={s('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 10px;')}>
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
      <CategoryBlock cols={panel.columns.length} columns={panel.columns} preset="dense" onNav={onNav} />
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
      <div style={s('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px;font-size:9.5px;')}>
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
// `lead` — the spine left this block's leading fork to the block itself (see
// `splitCols` → 'self'); only the category blocks take it.
function BlockView({ b, lead, onNav }: { b: Block; lead?: boolean; onNav: Nav }): ReactNode {
  switch (b.kind) {
    case 'node': return <NodeBlock b={b} />
    case 'branch': return <BranchBlock columns={b.columns} lead={lead} onNav={onNav} />
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
    case 'categoryGrid': return <CategoryBlock columns={b.columns} cols={b.columns.length} preset="grid" lead={lead} onNav={onNav} />
    case 'categoryColumns': return <CategoryBlock columns={b.columns} cols={b.columns.length} preset="dense" lead={lead} onNav={onNav} />
    case 'decisionTree': return <>{b.steps.map((step, i) => <DecisionStepView key={i} step={step} onNav={onNav} />)}</>
    case 'fork': return <ForkBlockView legs={b.legs} onNav={onNav} />
    case 'compareBox': return <CompareBoxBlock b={b} onNav={onNav} />
    case 'speciesCompare': return <SpeciesCompareBlock b={b} onNav={onNav} />
    case 'speciesChooser': return <SpeciesChooserBlock b={b} onNav={onNav} />
    case 'infoBox': return <InfoBoxBlock b={b} onNav={onNav} />
    case 'disclaimer': return DISCLAIMER
    case 'html': return <div className="flow-authored scroll-x"><Raw html={b.html} onNav={onNav} /></div>
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
    if (b.kind === 'fork') {
      for (const leg of b.legs) {
        if (leg.blocks && hasOutboundFlowLinks(leg.blocks)) return true
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
