// Shared parser for pipe-markup clinical text (`a|#Header|-sub|b`).
// SINGLE SOURCE OF TRUTH for what a segment means: consumed by the <Bul>
// renderer (markup.tsx) AND the lint guardrail (scripts/lint-disease-blocks.ts),
// so validation can never drift from how the text actually renders.

export type Block =
  | { kind: 'header'; text: string }
  | { kind: 'warn'; text: string }
  | { kind: 'sub'; text: string }
  | { kind: 'bullet'; text: string }

export interface ParseOpts {
  /** Treat `!` segments as red warning boxes (protocol steps). Default false. */
  warn?: boolean
  /** Treat `-` segments as indented sub-bullets. Default true. */
  allowDash?: boolean
}

/** Split pipe-markup into typed blocks. Mirrors the legacy bul() precedence:
 *  `#`→header, `!`→warn (when opts.warn), `-`→sub (when opts.allowDash), else
 *  bullet. Empty segments become empty bullets (no filtering), as before. */
export function parseBlocks(text: string, { warn = false, allowDash = true }: ParseOpts = {}): Block[] {
  return text.split('|').map((seg): Block => {
    const t = seg.trim()
    if (t.startsWith('#')) return { kind: 'header', text: t.slice(1).trim() }
    if (warn && t.startsWith('!')) return { kind: 'warn', text: t.slice(1).trim() }
    if (allowDash && t.startsWith('-')) return { kind: 'sub', text: t.slice(1).trim() }
    return { kind: 'bullet', text: t }
  })
}

/** Indices of "bare" headers — a `#` header with no content block (bullet or
 *  sub) immediately beneath it. These render as a stacked green line with no
 *  body: the "wall of green" anti-pattern (a section header used as a bullet).
 *  A header followed by another header, or ending the text, is bare. */
export function bareHeaderIndices(blocks: Block[]): number[] {
  const out: number[] = []
  blocks.forEach((b, i) => {
    if (b.kind !== 'header') return
    const next = blocks[i + 1]
    if (!next || next.kind === 'header') out.push(i)
  })
  return out
}

/** Convenience: does this pipe-markup string contain any bare header? */
export function hasBareHeader(text: string, opts?: ParseOpts): boolean {
  return bareHeaderIndices(parseBlocks(text, opts)).length > 0
}
