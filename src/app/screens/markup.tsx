'use client'
// Shared pipe-/@-markup renderers — React ports of the disease-page helpers
// linkify() and bul() (cliniqApp.ts), reused by the disease / lesion / diff
// detail screens. `@DIS-…`/`@PROT-…` tokens become real React navigation.

import { type CSSProperties, type ReactNode } from 'react'
import { DB } from '../../data/db'
import { useNav } from '../nav/NavContext'
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

function LinkSpan({ id, label }: { id: string; label: string }) {
  const nav = useNav()
  const isProtocol = id.startsWith('PROT-')
  const exists = isProtocol
    ? DB.protocols.some(protocol => protocol.id === id)
    : DB.disease_page.some(disease => disease.id === id)
  if (!exists) {
    return <span style={UNAVAILABLE_LINK} aria-disabled="true" title="No linked page available">{label}</span>
  }
  function go(): void {
    nav.navigate(isProtocol ? { kind: 'protocol', id } : { kind: 'disease', id })
  }
  return <span style={LINK} role="button" onClick={go}>{label}</span>
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

/** @TOKEN(:label) → clickable span(s) interleaved with plain text. */
export function Linkify({ text }: { text: string }) {
  if (text.startsWith('@')) {
    const ci = text.indexOf(':')
    const did = ci > 0 ? text.slice(1, ci) : text.slice(1)
    const lbl = ci > 0 ? text.slice(ci + 1) : did
    return <LinkSpan id={did} label={lbl} />
  }
  const re = /@([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)(?::([A-Za-z0-9 /\-.]+))?/g
  const parts: ReactNode[] = []
  let last = 0
  let k = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const id = m[1]
    const lbl = (m[2] || id).trim()
    parts.push(<LinkSpan key={k++} id={id} label={lbl} />)
    last = m.index + m[0].length
  }
  if (last === 0) return <>{text}</>
  parts.push(text.slice(last))
  return <>{parts}</>
}

const HEADER = s('font-size:var(--fs-subhead);font-weight:700;color:var(--teal-light);margin-top:8px;margin-bottom:2px;')
const SUB = s('display:flex;align-items:baseline;gap:4px;font-size:var(--fs-body);color:var(--gray);line-height:var(--lh-body);padding-left:14px;margin-bottom:1px;')
const DASH = s('flex-shrink:0;opacity:.5;')
const WARN = s('font-size:var(--fs-body);font-weight:700;color:var(--tone-danger-title);margin:4px 0 2px;background:rgba(var(--tone-danger),0.12);padding:3px 7px;border-radius:4px;')

/** Pipe-markup with @-links: `#`→header, `-`→sub-bullet (when allowDash,
 *  default true), else bullet. Pass `warn` to also handle `!`→red warning
 *  box (used by protocol steps). Empty segments render an empty bullet,
 *  matching the legacy bul() (no filtering). */
export function Bul({ text, warn, allowDash = true }: { text: string; warn?: boolean; allowDash?: boolean }) {
  return (
    <>
      {parseBlocks(text, { warn, allowDash }).map((b, i) => {
        switch (b.kind) {
          case 'header': return <div key={i} style={HEADER}>▸ {b.text}</div>
          case 'warn': return <div key={i} style={WARN}>⚠️ {b.text}</div>
          case 'sub': return <div key={i} style={SUB}><span style={DASH}>–</span><Linkify text={b.text} /></div>
          default: return <div key={i} style={BULLET}><span style={DOT}>•</span><Linkify text={b.text} /></div>
        }
      })}
    </>
  )
}
