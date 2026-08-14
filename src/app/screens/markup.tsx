'use client'
// Shared pipe-/@-markup renderers — React ports of the disease-page helpers
// linkify() and bul() (cliniqApp.ts), reused by the disease / lesion / diff
// detail screens. `@DIS-…`/`@PROT-…` tokens become real React navigation.

import { type CSSProperties, type ReactNode } from 'react'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
import { Cite, hasCitation, splitCitations } from './diseaseReferences'
import { styleStringToObject as s } from './style'
import { parseBlocks } from './blocks'
import { BULLET, DOT } from './styles'

/** Coerce an unknown DB field (may be `undefined` via index signature) to string. */
export const str = (v: unknown): string => (typeof v === 'string' ? v : '')

const CARD_BOX = s('background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:10px;')
const CARD_TITLE_STYLE = s('font-size:var(--fs-label);font-weight:700;color:var(--teal-light);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;')

/** Primary content card — teal uppercase title + arbitrary children. */
export function Card({ title, children }: { title: string; children: ReactNode }) {
  return <div style={CARD_BOX}><div style={CARD_TITLE_STYLE}>{title}</div>{children}</div>
}

const LINK = s('color:var(--teal-light);text-decoration:underline;cursor:pointer;')
const UNAVAILABLE_LINK = s('color:var(--gray2);background:var(--card2);border:1px solid var(--border);border-radius:4px;padding:1px 4px;cursor:default;')

/** Inline form of a page name: drop any " — subtitle" tail, so a link reads
 *  "stabilise per Respiratory Crisis" rather than dragging the full page title
 *  ("Respiratory Crisis — Initial Stabilisation") into the middle of a sentence. */
const inlineName = (name: string): string => name.split(' — ')[0].trim()

function LinkSpan({ id, label }: { id: string; label?: string }) {
  const nav = useNav()
  const isProtocol = id.startsWith('PROT-')
  const target = isProtocol
    ? DB.protocols.find(protocol => protocol.id === id)
    : DB.disease_page.find(disease => disease.id === id)
  // An authored `@ID:label` always wins. A bare `@ID` resolves to the target's
  // own name, so a raw id like "PROT-RESP" never reaches the page — and the
  // link keeps tracking the name if the protocol is later retitled. Only an
  // unknown id falls back to showing the id itself.
  const text = label ?? (target ? inlineName(str(target.name)) : id)
  if (!target) {
    return <span style={UNAVAILABLE_LINK} aria-disabled="true" title="No linked page available">{text}</span>
  }
  function go(): void {
    nav.navigate(isProtocol ? { kind: 'protocol', id } : { kind: 'disease', id })
  }
  return <span style={LINK} role="button" onClick={go}>{text}</span>
}

/** Tappable navigation card — icon (optional) + title + subtitle + arrow. */
export function NavCard({ icon, title, sub, onClick, style }: {
  icon?: string
  title: ReactNode
  sub: string
  onClick: () => void
  style?: CSSProperties
}) {
  return (
    <div className="card" style={style} role="button" onClick={onClick}>
      <div className="card-row">
        {icon && <div className="card-icon">{icon}</div>}
        <div style={{ flex: 1 }}>
          <div className="card-title">{title}</div>
          <div className="card-sub">{sub}</div>
        </div>
        <div className="card-arrow">›</div>
      </div>
    </div>
  )
}

/** @TOKEN(:label) → clickable span(s) and "(Ettinger Ch N)" citations → numbered markers, interleaved with plain text. */
export function Linkify({ text }: { text: string }) {
  // Whole-string @token shortcut (its label may contain characters outside the
  // inline regex class) — only when there's no citation to interleave.
  if (text.startsWith('@') && !hasCitation(text)) {
    const ci = text.indexOf(':')
    const did = ci > 0 ? text.slice(1, ci) : text.slice(1)
    const lbl = ci > 0 ? text.slice(ci + 1) : undefined
    return <LinkSpan id={did} label={lbl} />
  }
  const re = /@([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)(?::([A-Za-z0-9 /\-.]+))?/g
  const parts: ReactNode[] = []
  let k = 0
  // Split off citations first, then resolve @-links within the plain segments.
  for (const seg of splitCitations(text)) {
    if (seg.citeIds) { parts.push(<Cite key={k++} ids={seg.citeIds} fallback={seg.raw} trail={seg.trail} />); continue }
    re.lastIndex = 0
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(seg.text)) !== null) {
      if (m.index > last) parts.push(seg.text.slice(last, m.index))
      parts.push(<LinkSpan key={k++} id={m[1]} label={m[2]?.trim()} />)
      last = m.index + m[0].length
    }
    parts.push(last < seg.text.length ? seg.text.slice(last) : '')
  }
  // One wrapper element, not a fragment: several callers render Linkify inside a
  // `display:flex` row (BULLET, SUB, the pearl items). A fragment's children each
  // become their own flex item, so a mid-sentence citation marker or @-link is
  // pushed away from the word it follows and the rest of the sentence wraps
  // around it. Wrapped, the whole run is a single flex item and flows inline.
  return <span>{parts}</span>
}

const HEADER = s('font-size:var(--fs-subhead);font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;')
const SUB = s('display:flex;align-items:baseline;gap:4px;font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);padding-left:14px;margin-bottom:1px;')
const DASH = s('flex-shrink:0;opacity:.5;')
const WARN = s('font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-title);margin:4px 0 2px;background:rgba(var(--tone-danger),0.12);padding:3px 7px;border-radius:4px;')

/** Indent applied to every block that sits UNDER a `#Header`, so the hierarchy
 *  is visible: the header's ▸ stays at the left edge and its bullets step in
 *  beneath it. Sub-bullets (`-`) keep their own 14px offset ON TOP of this, so
 *  a `-` under a header reads as a third level. */
const HEADER_INDENT = 12
const BULLET_UNDER = { ...BULLET, paddingLeft: `${HEADER_INDENT}px` }
const SUB_UNDER = { ...SUB, paddingLeft: `${HEADER_INDENT + 14}px` }

/** Pipe-markup with @-links: `#`→header, `-`→sub-bullet (when allowDash,
 *  default true), else bullet. Pass `warn` to also handle `!`→red warning
 *  box (used by protocol steps). Empty segments render an empty bullet,
 *  matching the legacy bul() (no filtering). */
export function Bul({ text, warn, allowDash = true }: { text: string; warn?: boolean; allowDash?: boolean }) {
  const blocks = parseBlocks(text, { warn, allowDash })

  // Once a header has been seen, everything after it belongs to that section
  // (a later header just opens a new section — the depth is unchanged).
  // Resolved up front rather than tracked inside the map: a variable reassigned
  // from a render callback is exactly what the compiler cannot reason about.
  const isUnderHeader: boolean[] = []
  let seenHeader = false
  for (const b of blocks) {
    isUnderHeader.push(seenHeader)
    if (b.kind === 'header') seenHeader = true
  }

  return (
    <>
      {blocks.map((b, i) => {
        const under = isUnderHeader[i]
        switch (b.kind) {
          // Headers linkify too — a `#Header` may carry an @-link (e.g.
          // "#Acute crisis (see @PROT-RESP)"), which otherwise rendered as
          // literal "@PROT-RESP" text instead of a tappable protocol link.
          case 'header':
            return <div key={i} style={HEADER}>▸ <Linkify text={b.text} /></div>
          case 'warn': return <div key={i} style={WARN}>⚠️ {b.text}</div>
          case 'sub': return <div key={i} style={under ? SUB_UNDER : SUB}><span style={DASH}>–</span><Linkify text={b.text} /></div>
          default: return <div key={i} style={under ? BULLET_UNDER : BULLET}><span style={DOT}>•</span><Linkify text={b.text} /></div>
        }
      })}
    </>
  )
}
