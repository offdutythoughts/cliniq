'use client'
// ── RichText: the audited leaf-HTML boundary ─────────────────────────────────
// The single place the app turns authored HTML *data* (the ~509 `html:` fields
// and the kind:'html' escape-hatch blocks) into real React elements — replacing
// dangerouslySetInnerHTML. Parses via html-react-parser against a strict, closed
// allowlist (the complete tag/attr surface actually present in the data); any
// tag outside it is dropped (text kept), and inline `onclick="renderX(...)"`
// handlers become real React onClick navigation (never live DOM attributes).
//
// Allowlist — the complete observed surface of src/lib/signs/**:
//   tags:  div span strong b em br table thead tbody tr th td
//   attrs: style (→ object), class (→ className), colspan (→ colSpan)
// Forbidden (dropped): every on* string handler, href, id, src, and any other tag.

import { createElement, Fragment, useMemo, type ReactNode } from 'react'
import parse, { domToReact, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser'
import { styleStringToObject } from '../app/screens/style'
import { parseLegacyOnclick, type View } from '../app/nav/view'

const ALLOWED = new Set(['div', 'span', 'strong', 'b', 'em', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td'])
const VOID = new Set(['br'])

interface ElementNode { type: string; name: string; attribs: Record<string, string>; children: DOMNode[] }
const isTag = (n: DOMNode): n is DOMNode & ElementNode => (n as ElementNode).type === 'tag'

export function richTextToNodes(html: string, onNavigate?: (v: View) => void): ReactNode {
  let key = 0
  const options: HTMLReactParserOptions = {
    replace(node) {
      if (!isTag(node)) return undefined
      const tag = node.name.toLowerCase()
      // Disallowed tag: drop the element, keep its (re-filtered) text/children.
      if (!ALLOWED.has(tag)) {
        return <Fragment key={`x${key++}`}>{domToReact(node.children as DOMNode[], options)}</Fragment>
      }
      // Inert allowed tag with no onclick: let html-react-parser handle it
      // (its defaults already do class→className, style→object, and keys).
      const onclick = node.attribs.onclick
      if (!onclick) return undefined
      // Allowed tag carrying a legacy onclick → real React navigation.
      const view = parseLegacyOnclick(onclick)
      const props: Record<string, unknown> = { key: `c${key++}` }
      if (node.attribs.class) props.className = node.attribs.class
      if (node.attribs.style) props.style = styleStringToObject(node.attribs.style)
      if (node.attribs.colspan) props.colSpan = Number(node.attribs.colspan)
      if (view && onNavigate) {
        props.onClick = () => onNavigate(view)
        props.role = 'button'
      }
      return createElement(tag, props, VOID.has(tag) ? undefined : domToReact(node.children as DOMNode[], options))
    },
  }
  return parse(html, options)
}

export function RichText({ html, onNavigate }: { html: string; onNavigate?: (v: View) => void }) {
  const nodes = useMemo(() => richTextToNodes(html, onNavigate), [html, onNavigate])
  return <>{nodes}</>
}
