'use client'
// Flowchart view — React port of renderFlow.ts (renderFlowPage + every block
// renderer). Same .flow-*/.fn-* classes and inline styles → pixel-identical.
// esc()'d text fields become plain text (React escapes); raw-HTML fields
// (choice labels, callout/banner/compareBox/table/decision html) go through the
// audited <RichText> boundary; links route via linkToView.

import { Fragment, type ReactNode } from 'react'
import type {
  Block, Column, Endpoint, ChoiceItem, CardTile, CategoryColumn, CatColumn, DecisionStep,
  DecisionOutcome, TableCell, TableRow, LabeledLink, Tone, InfoBoxBlock as InfoBoxBlockType,
  AlertItem,
} from '../../lib/signs/flowTypes'
import { HUE, TITLE } from '../../lib/signs/tone'
import { FLOWS } from '../../lib/signs/flows'
import { RichText } from '../../components/RichText'
import { useNav } from '../nav/NavContext'
import { linkToView, type View } from '../nav/view'
import { styleStringToObject as s } from './style'
import { NotFound } from './NotFound'

type Nav = (v: View) => void
const Raw = ({ html, onNav }: { html: string; onNav: Nav }) => <RichText html={html} onNavigate={onNav} />

const DISCLAIMER = <div className="disclaimer">For qualified veterinary professionals only.</div>

// ── Arrow / spine logic (joinBlocks) ─────────────────────────────────────────
const SPINE = new Set(['node', 'branch', 'endpoints', 'choices', 'callout', 'fnHeader', 'cardGrid', 'categoryGrid', 'categoryColumns', 'decisionTree'])
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

// ── Tinted box (boxOpen) ──────────────────────────────────────────────────────
function Box({ tone, bgA, bdA, extra = '', children }: { tone: Tone; bgA: number; bdA: number; extra?: string; children: ReactNode }) {
  const h = HUE[tone]
  return <div style={s(`background:rgba(${h.rgb},${bgA});border:1px solid rgba(${h.rgb},${bdA});border-radius:10px;width:100%;${extra}`)}>{children}</div>
}

// ── Node ──────────────────────────────────────────────────────────────────────
function NodeBlock({ b }: { b: Extract<Block, { kind: 'node' }> }) {
  if (b.variant === 'entry') {
    const tone = b.tone ? s(`background:rgba(${HUE[b.tone].rgb},0.15);border-color:rgba(${HUE[b.tone].rgb},0.4);color:${HUE[b.tone].color};`) : undefined
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
  if (tone === 'neutral') return 'background:rgba(255,255,255,0.04);border:1.5px solid var(--border2);color:var(--gray);'
  const h = HUE[tone]
  return `background:rgba(${h.rgb},0.09);border:1.5px solid rgba(${h.rgb},0.32);color:${h.color};`
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
        const toneStyle = it.tone ? `background:rgba(${HUE[it.tone].rgb},0.12);border-color:rgba(${HUE[it.tone].rgb},0.4);color:${HUE[it.tone].color};` : ''
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
      : 'font-weight:700;padding-bottom:4px;border-bottom:1px solid rgba(148,163,184,.25);'
    : color
  return <div style={s(head)}><Raw html={text} onNav={onNav} /></div>
}
function TableBlock({ b, onNav }: { b: Extract<Block, { kind: 'table' }>; onNav: Nav }) {
  const grid = (
    <div style={s(`display:grid;grid-template-columns:${b.cols};gap:3px 6px;font-size:9.5px;line-height:1.4;${b.minWidth ? `min-width:${b.minWidth}px;` : ''}`)}>
      {b.headers.map((h, i) => <Cell key={`h${i}`} c={h} header onNav={onNav} />)}
      {b.rows.map((row, ri) =>
        Array.isArray(row)
          ? row.map((c, ci) => <Cell key={`${ri}-${ci}`} c={c} onNav={onNav} />)
          : <div key={`s${ri}`} style={s('grid-column:1/-1;padding:4px 0 2px;font-size:8px;font-weight:700;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;border-bottom:1px solid rgba(148,163,184,.08);margin-top:2px;')}>{row.section}</div>
      )}
    </div>
  )
  const wrapped = b.scroll ? <div style={s('overflow-x:auto;width:100%;')}>{grid}</div> : grid
  const footColor = b.boxTone ? `color:${HUE[b.boxTone].color};opacity:.85;` : 'opacity:.9;'
  const foot = b.footnote ? <div style={s(`margin-top:7px;font-size:9.5px;line-height:1.55;${footColor}`)}><Raw html={b.footnote} onNav={onNav} /></div> : null
  if (!b.boxTone && !b.title) return b.gap ? <div style={s(`margin-top:${b.gap}px;width:100%;`)}>{wrapped}{foot}</div> : <>{wrapped}{foot}</>
  const tone = b.boxTone ?? 'neutral'
  return (
    <Box tone={tone} bgA={0.07} bdA={0.25} extra={`padding:10px 12px;${b.gap ? `margin-top:${b.gap}px;` : ''}`}>
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
    <Box tone={b.tone} bgA={0.08} bdA={0.28} extra={`padding:10px 12px;margin-top:${b.gap ?? 10}px;`}>
      <div style={s(`font-size:11px;font-weight:700;color:${TITLE[b.tone] ?? h.color};margin-bottom:6px;`)}><Raw html={b.title} onNav={onNav} /></div>
      <div style={s('display:flex;flex-direction:column;gap:5px;')}>
        {b.cards.map((c, i) => (
          <div key={i} style={s(`background:rgba(${h.rgb},0.08);border-radius:7px;padding:7px 10px;${c.link ? 'cursor:pointer;' : ''}`)}
            {...(c.link ? { role: 'button', onClick: () => onNav(linkToView(c.link!)) } : {})}>
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
  return <div style={s(`margin-top:10px;padding:9px 12px;background:rgba(${h.rgb},0.07);border:1px solid rgba(${h.rgb},0.15);border-radius:10px;font-size:11px;color:${h.color};text-align:center;width:100%;`)}><Raw html={html} onNav={onNav} /></div>
}

// ── Branch + columns ──────────────────────────────────────────────────────────
function ColumnView({ col, onNav }: { col: Column; onNav: Nav }) {
  const h = col.tone ? HUE[col.tone] : null
  return (
    <div style={s('display:flex;flex-direction:column;align-items:center;gap:4px;')}>
      {h ? (
        <div className="flow-node" style={s(`width:100%;background:rgba(${h.rgb},0.12);border-color:rgba(${h.rgb},0.4);font-size:10px;font-weight:700;color:${h.color};`)}>
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
            <div key={i} className={`fn-ep fn-ep-${t.anat}`} {...(t.link ? { role: 'button', onClick: () => onNav(linkToView(t.link!)) } : {})}>
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
function CategoryGridBlock({ columns, onNav }: { columns: CategoryColumn[]; onNav: Nav }) {
  const n = columns.length
  const gridStyle = s(`display:grid;grid-template-columns:repeat(${n},1fr);gap:6px;width:100%;`)
  return (
    <>
      <div style={gridStyle}>
        {columns.map((c, i) => {
          const h = HUE[c.tone]
          return <div key={i} className="flow-node" style={s(`background:rgba(${h.rgb},0.12);border-color:rgba(${h.rgb},0.4);color:${h.color};font-size:11px;cursor:default;min-width:0;`)}>{c.cat}</div>
        })}
      </div>
      <div style={gridStyle}>{columns.map((_, i) => <div key={i} className="flow-arrow-v">↓</div>)}</div>
      <div style={gridStyle}>
        {columns.map((c, i) => {
          const h = HUE[c.tone]
          return (
            <div key={i} style={s('display:flex;flex-direction:column;gap:4px;')}>
              {c.tiles.map((t, j) => (
                <div key={j} style={s(`border-radius:8px;padding:6px 8px;font-size:10px;font-weight:600;text-align:center;border:1.5px solid rgba(${h.rgb},0.4);background:rgba(${h.rgb},0.12);color:${h.color};${t.link ? 'cursor:pointer;' : 'cursor:default;'}line-height:1.3;word-break:break-word;`)}
                  {...(t.link ? { role: 'button', onClick: () => onNav(linkToView(t.link!)), onMouseOver: (ev: React.MouseEvent<HTMLDivElement>) => { ev.currentTarget.style.filter = 'brightness(1.2)' }, onMouseOut: (ev: React.MouseEvent<HTMLDivElement>) => { ev.currentTarget.style.filter = '' } } : {})}>
                  {t.label}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── Category columns (CAT_STYLE) ──────────────────────────────────────────────
const CAT_STYLE: Record<string, { bg: string; border: string; col: string }> = {
  'Vascular': { bg: 'rgba(var(--cat-vascular),0.15)', border: 'rgba(var(--cat-vascular),0.4)', col: 'var(--cat-vascular-fg)' },
  'Inflammatory': { bg: 'rgba(var(--cat-inflammatory),0.15)', border: 'rgba(var(--cat-inflammatory),0.4)', col: 'var(--cat-inflammatory-fg)' },
  'Mass': { bg: 'rgba(var(--cat-mass),0.15)', border: 'rgba(var(--cat-mass),0.4)', col: 'var(--cat-mass-fg)' },
  'Immune-mediated': { bg: 'rgba(var(--cat-immune),0.15)', border: 'rgba(var(--cat-immune),0.4)', col: 'var(--cat-immune-fg)' },
  'Degenerative': { bg: 'rgba(var(--cat-degenerative),0.15)', border: 'rgba(var(--cat-degenerative),0.4)', col: 'var(--cat-degenerative-fg)' },
  'Metabolic / Endocrine': { bg: 'rgba(var(--cat-metabolic),0.15)', border: 'rgba(var(--cat-metabolic),0.4)', col: 'var(--cat-metabolic-fg)' },
  'Toxic': { bg: 'rgba(var(--cat-toxic),0.15)', border: 'rgba(var(--cat-toxic),0.4)', col: 'var(--cat-toxic-fg)' },
  'Trauma': { bg: 'rgba(var(--cat-trauma),0.15)', border: 'rgba(var(--cat-trauma),0.4)', col: 'var(--cat-trauma-fg)' },
  'Anomalous': { bg: 'rgba(var(--cat-anomalous),0.15)', border: 'rgba(var(--cat-anomalous),0.4)', col: 'var(--cat-anomalous-fg)' },
}
function CategoryColumnsBlock({ cols, columns, onNav }: { cols: number; columns: CatColumn[]; onNav: Nav }) {
  return (
    <div style={s(`display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;width:100%;`)}>
      {columns.map((c, i) => {
        const h = c.tone ? HUE[c.tone] : null
        const st = h
          ? { bg: `rgba(${h.rgb},0.12)`, border: `rgba(${h.rgb},0.4)`, col: h.color }
          : CAT_STYLE[c.cat] ?? { bg: 'rgba(var(--tone-slate),0.12)', border: 'rgba(var(--tone-slate),0.35)', col: 'var(--tone-slate-fg)' }
        return (
          <div key={i} style={s('display:flex;flex-direction:column;align-items:stretch;gap:4px;')}>
            <div style={s(`background:${st.bg};border:1.5px solid ${st.border};border-radius:10px;padding:7px 5px;font-size:9.5px;font-weight:700;color:${st.col};text-align:center;line-height:1.3;`)}>{c.cat}</div>
            <div style={s(`color:${st.col};text-align:center;font-size:11px;line-height:1;`)}>↓</div>
            {c.tiles.map((t, j) => (
              <div key={j} style={s(`background:${st.bg};border:1.5px solid ${st.border};border-radius:8px;padding:6px 4px;font-size:9px;font-weight:600;color:${st.col};text-align:center;line-height:1.35;${t.link ? 'cursor:pointer;' : ''}`)}
                {...(t.link ? { role: 'button', onClick: () => onNav(linkToView(t.link!)) } : {})}>
                {t.label}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

// ── Decision tree ─────────────────────────────────────────────────────────────
function DecBox({ question, sub }: { question: string; sub?: string }) {
  return (
    <div style={s('background:rgba(245,158,11,0.13);border:1.5px solid rgba(245,158,11,0.55);border-radius:10px;padding:9px 14px;width:100%;text-align:center;')}>
      <div style={s('font-size:11.5px;font-weight:700;color:var(--tone-warning-fg);line-height:1.4;')}>{question}</div>
      {sub && <div style={s('font-size:9px;color:var(--amber-text);opacity:.8;margin-top:3px;')}>{sub}</div>}
    </div>
  )
}
function OutBox({ o, onNav }: { o: DecisionOutcome; onNav: Nav }) {
  const h = HUE[o.tone]
  return <div style={s(`background:rgba(${h.rgb},0.12);border:1.5px solid rgba(${h.rgb},0.5);border-radius:9px;padding:9px 10px;font-size:9px;line-height:1.55;color:${h.color};`)}><Raw html={o.html} onNav={onNav} /></div>
}
function DecisionStepView({ step, onNav }: { step: DecisionStep; onNav: Nav }) {
  if (step.type === 'split') {
    return (
      <>
        <DecBox question={step.question} sub={step.sub} />
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;margin-top:4px;')}>
          <div><div style={s('font-size:9px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;')}>{step.noLabel}</div><OutBox o={step.no} onNav={onNav} /></div>
          <div><div style={s('font-size:9px;font-weight:700;color:var(--hl-green);margin-bottom:4px;')}>{step.yesLabel}</div><OutBox o={step.yes} onNav={onNav} /></div>
        </div>
      </>
    )
  }
  if (step.type === 'outcome') {
    return <div style={s('margin-bottom:8px;')}><div style={s('font-size:9px;font-weight:700;color:var(--tone-danger-title);margin-bottom:4px;')}>{step.label}</div><OutBox o={step.box} onNav={onNav} /></div>
  }
  const down = step.continue === 'YES'
  const contColor = down ? 'var(--hl-green)' : 'var(--tone-danger-title)'
  const arrowColor = down ? 'rgba(52,211,153,0.5)' : 'rgba(248,113,113,0.5)'
  const exitColor = down ? 'var(--tone-danger-title)' : 'var(--hl-green)'
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
    <div style={s(`margin-top:${b.gap ?? 10}px;padding:9px 12px;background:rgba(${h.rgb},0.07);border:1px solid rgba(${h.rgb},0.2);border-radius:10px;width:100%;`)}>
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
    <div style={s(`margin-top:${b.gap ?? 14}px;padding:10px 12px;background:rgba(${h.rgb},0.07);border:1px solid rgba(${h.rgb},0.25);border-radius:10px;width:100%;`)}>
      {b.title && <div style={s(`font-size:11px;font-weight:700;color:${h.color};margin-bottom:8px;`)}><Raw html={b.title} onNav={onNav} /></div>}
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

// ── Callout / alert / diseaseGrid / dxRow ─────────────────────────────────────
function CalloutBlock({ b, onNav }: { b: Extract<Block, { kind: 'callout' }>; onNav: Nav }) {
  const extra = `padding:9px 12px;font-size:9.5px;color:${HUE[b.tone].color};line-height:1.5;${b.gap ? `margin-top:${b.gap}px;` : ''}${b.center ? 'text-align:center;' : ''}`
  return (
    <Box tone={b.tone} bgA={0.1} bdA={0.3} extra={extra}>
      {b.title && <div style={s(`font-size:11px;font-weight:700;color:${TITLE[b.tone] ?? HUE[b.tone].color};margin-bottom:6px;`)}><Raw html={b.title} onNav={onNav} /></div>}
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
    <Box tone={tone} bgA={0.08} bdA={0.25} extra="margin-top:12px;padding:10px 12px;">
      <div style={s(`font-size:10px;font-weight:700;color:${TITLE[tone] ?? HUE[tone].color};margin-bottom:5px;`)}>{title}</div>
      <div style={s(`font-size:9.5px;line-height:1.55;color:${HUE[tone].color};`)}>
        {items.map((it, i) => <Fragment key={i}>{i > 0 && <br />}{'• '}<AlertItemView it={it} onNav={onNav} /></Fragment>)}
      </div>
    </Box>
  )
}
function DiseaseGridBlock({ title, links, onNav }: { title: string; links: LabeledLink[]; onNav: Nav }) {
  return (
    <Box tone="teal" bgA={0.08} bdA={0.25} extra="margin-top:10px;padding:10px 12px;">
      <div style={s('font-size:11px;font-weight:700;color:var(--tone-teal-fg);margin-bottom:6px;')}>{title}</div>
      <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:9.5px;')}>
        {links.map((l, i) => <div key={i} role="button" onClick={() => onNav(linkToView(l.link))} style={s('cursor:pointer;color:var(--fg-teal-deep);')}>→ {l.label}</div>)}
      </div>
    </Box>
  )
}
function DxRowBlock({ items, onNav }: { items: LabeledLink[]; onNav: Nav }) {
  return (
    <div className="dx-row c2" style={s('margin-top:10px;')}>
      {items.map((i2, i) => <div key={i} className="dx-test" style={s(`cursor:pointer;font-size:9.5px;${i2.accent ? 'background:#0D7377;' : ''}`)} role="button" onClick={() => onNav(linkToView(i2.link))}>{i2.label} ›</div>)}
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
    case 'infoBox': return <InfoBoxBlock b={b} onNav={onNav} />
    case 'disclaimer': return DISCLAIMER
    case 'html': return <Raw html={b.html} onNav={onNav} />
    default: throw new Error(`FlowPageView: block kind '${(b as Block).kind}' not implemented`)
  }
}

export function FlowPageView({ flowId }: { flowId: string }) {
  const router = useNav()
  const onNav: Nav = v => router.navigate(v)
  const page = FLOWS[flowId]
  if (!page) return <NotFound what={`Flow “${flowId}”`} />
  if (page.layout === 'fn') return <BlockList blocks={page.blocks} fn onNav={onNav} />
  const blocks = page.blocks
  const lastIsDisc = blocks.length > 0 && blocks[blocks.length - 1].kind === 'disclaimer'
  const main = lastIsDisc ? blocks.slice(0, -1) : blocks
  return (
    <>
      <div className="flow-wrap"><BlockList blocks={main} onNav={onNav} /></div>
      {lastIsDisc && DISCLAIMER}
    </>
  )
}
