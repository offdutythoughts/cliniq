'use client'
// The one tappable element in the clinical app.
//
// Every navigational box on these screens — a disease card, a flow chip, a
// category tile, a linkified @DIS- token — was a bare `<div onClick>` carrying
// `role="button"`. That announces correctly to a screen reader and is completely
// unreachable without a mouse: no element was focusable, nothing responded to
// Enter or Space, and the app had exactly one onKeyDown handler in it. WCAG
// 2.1.1 (Keyboard) and 2.4.7 (Focus Visible), on the primary way to move through
// the whole product.
//
// WHY NOT A REAL <button>. It is the better element and it is not worth it here.
// A <button> is `display:inline-block` where these are blocks and grid children,
// so swapping ~20 call sites would reflow boxes across 340 clinical pages to buy
// semantics the `role` already provides. What was actually missing is the
// focusability and the key handling, which is what this adds. Migrating to real
// buttons stays a sensible follow-up; it should be done behind this component,
// one surface at a time, against the visual guardrail.
//
// SPACE MUST preventDefault. Space on a focused non-button scrolls the page, so
// without it the reader would activate the tile AND jump a screenful.

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'

export interface TappableProps {
  /** What activation does — click, Enter, or Space all route here. */
  onTap: () => void
  /** Element to render. `span` for inline text links, `div` (default) otherwise. */
  as?: 'div' | 'span'
  className?: string
  style?: CSSProperties
  /** Accessible name, when the visible children don't read as one (e.g. "›"). */
  label?: string
  /** Hover/gesture handlers a call site already passes (hoverBrighten). */
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void
  onMouseOut?: (e: React.MouseEvent<HTMLElement>) => void
  /** Escape hatch for the data-* attributes the tutorial and search rely on. */
  rest?: Record<string, unknown>
  children: ReactNode
}

export function Tappable({
  onTap, as = 'div', className, style, label, onMouseOver, onMouseOut, rest, children,
}: TappableProps) {
  const Element = as
  const onKeyDown = (ev: KeyboardEvent<HTMLElement>) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') return
    // Only the element itself — never a keypress bubbling up from something
    // focusable inside it.
    if (ev.target !== ev.currentTarget) return
    ev.preventDefault()
    onTap()
  }
  return (
    <Element
      role="button"
      tabIndex={0}
      aria-label={label}
      className={className}
      style={style}
      onClick={onTap}
      onKeyDown={onKeyDown}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      {...rest}
    >
      {children}
    </Element>
  )
}

/** Conditionally tappable. Renders the SAME element either way, adding the
 *  button role, focusability and key handling only when `on` is true.
 *
 *  This exists because a flow chip with no linked page must stay inert AND keep
 *  looking inert: `.flow-endpoint[role="button"]:hover` in globals.css is scoped
 *  to the role, so attaching it unconditionally would give an unlinked chip a
 *  hover state and a focus stop that lead nowhere. */
export function TapIf({ on, children, ...props }: TappableProps & { on: boolean }) {
  if (on) return <Tappable {...props}>{children}</Tappable>
  const Element = props.as ?? 'div'
  return <Element className={props.className} style={props.style} {...props.rest}>{children}</Element>
}
