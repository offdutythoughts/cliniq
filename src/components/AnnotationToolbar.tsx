'use client'
// Floating toolbar for marking up clinical text. Three decorations only —
// highlight, underline, strikethrough — plus the inverse of whichever ones are
// already there. It appears over the reader's selection, and again when they
// tap a mark they made earlier so it can be taken off without re-selecting the
// exact words.
//
// The two colourable tools open a palette rather than showing every swatch at
// once: eight swatches and three tools in one row does not fit a phone, and
// this app is read on a phone. Strikethrough has no palette and applies on the
// first press.

import { useLayoutEffect, useRef, useState } from 'react'
import { MaterialIcon, type MaterialIconName } from './MaterialIcon'
import type { AnnotationUi } from '../hooks/useAnnotationLayer'
import { coloursFor, type MarkColour, type MarkKind } from '../lib/annotations/marks'

interface Props {
  ui: AnnotationUi
  onToggle: (kind: MarkKind, colour: MarkColour) => void
  onErase: () => void
  onClearPage: () => void
  /** Told that a press has started, so the layer does not close the toolbar
   *  when that press collapses the text selection. */
  onInteractStart: () => void
  /** Called when a palette opens, to detach the toolbar from the selection for
   *  good — the press that opened it has already collapsed the selection. */
  onPin: () => void
  /** Marks stored for this page — gates the "clear page" escape hatch. */
  markCount: number
}

const TOOLS: { kind: MarkKind; icon: MaterialIconName; label: string }[] = [
  { kind: 'highlight', icon: 'format_ink_highlighter', label: 'Highlight' },
  { kind: 'underline', icon: 'format_underlined', label: 'Underline' },
  { kind: 'strike', icon: 'format_strikethrough', label: 'Strikethrough' },
]

/** The custom property holding each token's colour (globals.css). */
const swatchVar = (kind: MarkKind, colour: MarkColour) =>
  `var(--annot-${kind === 'highlight' ? 'hl' : 'ul'}-${colour})`

const GAP = 8
const EDGE = 8

export default function AnnotationToolbar({
  ui, onToggle, onErase, onClearPage, onInteractStart, onPin, markCount,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  // iOS puts its own Copy / Look Up bar over the selection and there is no way
  // to suppress it, so on a touch screen the toolbar stops competing for that
  // space and sits above the bottom nav instead. Also the easier place to
  // reach one-handed. Measured, not assumed: the nav's height varies with the
  // safe-area inset.
  const [dock, setDock] = useState<number | null>(null)
  /** Which tool's palette is open; null is the tool row. */
  const [palette, setPalette] = useState<MarkKind | null>(null)

  // A new target means a new decision — never reopen onto the last palette.
  const targetKey = ui.target ? `${ui.target.start}:${ui.target.end}` : null
  const lastTarget = useRef(targetKey)
  if (lastTarget.current !== targetKey) {
    lastTarget.current = targetKey
    if (palette !== null) setPalette(null)
  }

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !ui.target) return
    const box = el.getBoundingClientRect()
    setSize(prev => (prev.w === box.width && prev.h === box.height ? prev : { w: box.width, h: box.height }))
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const nav = document.querySelector('[data-tutorial="bottom-nav"]')
    const next = coarse ? (nav?.getBoundingClientRect().height ?? 0) + GAP : null
    setDock(prev => (prev === next ? prev : next))
  }, [ui.target, ui.source, palette, markCount])

  if (!ui.target || !ui.rect) return null

  const vw = typeof window === 'undefined' ? 0 : window.innerWidth
  const docked = dock !== null
  // Docked: centred above the bottom nav, clear of iOS's own selection menu.
  // Floating: over the selection, above it unless there is no room up there.
  const centre = docked ? vw / 2 : ui.rect.left + ui.rect.width / 2
  const half = size.w / 2
  const left = size.w ? Math.min(Math.max(centre, half + EDGE), vw - half - EDGE) : centre
  const above = !docked && ui.rect.top - GAP - size.h > EDGE
  const top = docked ? undefined : above ? ui.rect.top - GAP : ui.rect.bottom + GAP

  // 44px is the smallest reliable finger target; this app is read one-handed
  // on a phone, so the tools are sized for that rather than for a cursor.
  const btn =
    'flex flex-col items-center justify-center gap-[3px] w-11 h-11 rounded-md border border-(--color-line) cursor-pointer transition-colors duration-150'
  const idle = 'bg-(--color-card) text-(--color-fg) hover:bg-[var(--card2)]'
  const on = 'bg-[var(--teal)] text-white border-transparent'
  const divider = <span className="w-px h-[18px] bg-(--color-line) mx-0.5" />

  const activeFor = (kind: MarkKind) => ui.active.find(p => p.kind === kind)
  // "Clear all 1 marks" read as a bug in itself.
  const clearLabel = `Clear ${markCount === 1 ? 'the 1 mark' : `all ${markCount} marks`} on this page`

  function press(kind: MarkKind) {
    // Strikethrough has nothing to choose; the others show their colours.
    if (kind === 'strike') {
      onToggle('strike', 'plain')
      return
    }
    // Pin before opening: this very press has already collapsed the selection
    // on a touch screen, and without pinning the palette closes before a
    // colour can be chosen.
    onPin()
    setPalette(kind)
  }

  return (
    <div
      ref={ref}
      data-annot-toolbar
      role="toolbar"
      aria-label="Annotate selected text"
      onPointerDown={e => {
        onInteractStart()
        // Suppressing the default is what stops a *mouse* press dropping the
        // selection the instant a button goes down. It must not be done for
        // touch: preventing a touch pointerdown swallows the whole gesture,
        // so no click is ever produced and every tool is inert on a phone.
        // The selection still collapses on touch — the layer's interaction
        // guard is what keeps the toolbar alive across that.
        if (e.pointerType === 'mouse') e.preventDefault()
      }}
      className="fixed z-[97] flex items-center gap-1 p-1 rounded-lg bg-(--color-surface-2) border border-(--color-line) shadow-[0_4px_16px_rgba(0,0,0,.35)]"
      style={{
        left,
        top,
        bottom: docked ? dock : undefined,
        transform: `translate(-50%, ${above ? '-100%' : '0'})`,
        visibility: size.w ? 'visible' : 'hidden',
      }}
    >
      {palette === null ? (
        <>
          {TOOLS.map(t => {
            const active = activeFor(t.kind)
            return (
              <button
                key={t.kind}
                className={`${btn} ${active ? on : idle}`}
                aria-pressed={active ? true : undefined}
                aria-expanded={t.kind === 'strike' ? undefined : false}
                aria-label={
                  t.kind === 'strike' && active
                    ? 'Remove strikethrough'
                    : t.kind === 'strike'
                      ? t.label
                      : `${t.label} colours`
                }
                title={t.label}
                onClick={() => press(t.kind)}
              >
                <MaterialIcon name={t.icon} size={19} />
                {/* The live colour, so the reader can see what a tool will do
                    (and what it already did) without opening the palette. */}
                {t.kind !== 'strike' && (
                  <span
                    aria-hidden="true"
                    className="w-[18px] h-[3px] rounded-full"
                    style={{
                      background: swatchVar(
                        t.kind,
                        active?.colour ?? coloursFor(t.kind)[0],
                      ),
                      // A tool with no mark yet shows its default faintly.
                      opacity: active ? 1 : 0.55,
                    }}
                  />
                )}
              </button>
            )
          })}

          {ui.hasMarks && (
            <>
              {divider}
              <button
                className={`${btn} ${idle}`}
                aria-label="Remove all marks here"
                title="Remove all marks here"
                onClick={onErase}
              >
                <MaterialIcon name="format_clear" size={19} />
              </button>
            </>
          )}

          {/* Reached by tapping an existing mark. It is also the only way to
              clear marks whose text has since been rewritten, which are stored
              but no longer drawn anywhere on the page. */}
          {ui.source === 'mark' && markCount > 0 && (
            <button
              className="h-11 px-2.5 rounded-md border border-(--color-line) bg-(--color-card) text-(--color-muted) text-[10px] cursor-pointer hover:bg-[var(--card2)]"
              aria-label={clearLabel}
              title={clearLabel}
              onClick={onClearPage}
            >
              Clear all
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className={`${btn} ${idle}`}
            aria-label="Back to the annotation tools"
            title="Back"
            onClick={() => setPalette(null)}
          >
            <span aria-hidden="true" className="text-[15px] leading-none">‹</span>
          </button>
          {divider}
          {coloursFor(palette).map(colour => {
            const active = activeFor(palette)?.colour === colour
            const isHighlight = palette === 'highlight'
            return (
              <button
                key={colour}
                className={`${btn} ${active ? 'border-[var(--teal)] border-2' : 'border-(--color-line)'} bg-(--color-card) hover:bg-[var(--card2)]`}
                aria-pressed={active}
                aria-label={`${active ? 'Remove' : 'Apply'} ${colour} ${isHighlight ? 'highlight' : 'underline'}`}
                title={colour}
                onClick={() => onToggle(palette, colour)}
              >
                {/* A highlight swatch is a filled block because the mark is a
                    fill; an underline swatch is a bar because the mark is a
                    line. The shape says which tool you are in. */}
                <span
                  aria-hidden="true"
                  className={isHighlight ? 'w-[22px] h-[16px] rounded-[3px]' : 'w-[22px] h-[3px] rounded-full'}
                  style={{ background: swatchVar(palette, colour) }}
                />
              </button>
            )
          })}
        </>
      )}
    </div>
  )
}