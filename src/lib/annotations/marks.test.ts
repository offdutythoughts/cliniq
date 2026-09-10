import { describe, it, expect } from 'vitest'
import {
  addMark,
  applyMark,
  coloursFor,
  coversRange,
  defaultColour,
  diffMarks,
  eraseRange,
  HIGHLIGHT_COLOURS,
  isColourFor,
  kindsAt,
  makeMarkId,
  reanchor,
  toSegments,
  UNDERLINE_COLOURS,
  variantsAt,
  type Mark,
  type MarkColour,
  type MarkKind,
} from './marks'

const TEXT = 'Acute renal failure needs fluids now'

// Deterministic ids keep the expectations readable.
let n = 0
const ids = () => `m${n++}`
const reset = () => { n = 0 }

const at = (s: string) => TEXT.indexOf(s)
const range = (s: string): [number, number] => [at(s), at(s) + s.length]

function mark(kind: MarkKind, s: string, id = 'x', colour: MarkColour = defaultColour(kind)): Mark {
  const [start, end] = range(s)
  return { id, kind, colour, start, end, text: s }
}

/** addMark with the kind's default colour — most cases do not care which. */
const add = (
  list: Mark[],
  kind: MarkKind,
  start: number,
  end: number,
  text = TEXT,
  ids2 = ids,
) => addMark(list, kind, defaultColour(kind), start, end, text, ids2)

const shape = (list: Mark[]) =>
  list.map(m => `${m.kind}:${m.text}`).sort()

describe('addMark', () => {
  it('ignores an empty or inverted range', () => {
    expect(add([], 'highlight', 5, 5)).toEqual([])
    expect(add([], 'highlight', 9, 4)).toEqual([])
  })

  it('records the covered text with the range', () => {
    reset()
    const [s, e] = range('renal')
    expect(add([], 'highlight', s, e)).toEqual([
      { id: 'm0', kind: 'highlight', colour: 'yellow', start: s, end: e, text: 'renal' },
    ])
  })

  it('merges same-kind marks that abut, leaving no seam', () => {
    reset()
    let list = add([], 'highlight', ...range('Acute '), TEXT, ids)
    list = add(list, 'highlight', ...range('renal'), TEXT, ids)
    expect(shape(list)).toEqual(['highlight:Acute renal'])
  })

  it('merges same-kind marks that overlap, keeping the earliest id', () => {
    reset()
    let list = add([], 'underline', ...range('Acute renal'), TEXT, ids)
    list = add(list, 'underline', ...range('renal failure'), TEXT, ids)
    expect(list).toEqual([
      {
        id: 'm0', kind: 'underline', colour: 'teal',
        start: 0, end: at('failure') + 7, text: 'Acute renal failure',
      },
    ])
  })

  it('keeps different kinds separate even when they cover the same words', () => {
    reset()
    let list = add([], 'highlight', ...range('renal'), TEXT, ids)
    list = add(list, 'strike', ...range('renal'), TEXT, ids)
    expect(shape(list)).toEqual(['highlight:renal', 'strike:renal'])
  })

  it('swallows a mark entirely contained in an existing one', () => {
    reset()
    let list = add([], 'highlight', ...range('Acute renal failure'), TEXT, ids)
    list = add(list, 'highlight', ...range('renal'), TEXT, ids)
    expect(shape(list)).toEqual(['highlight:Acute renal failure'])
  })
})

describe('eraseRange', () => {
  it('splits a mark erased through its middle', () => {
    reset()
    const list = [mark('highlight', 'Acute renal failure', 'a')]
    const out = eraseRange(list, 'highlight', ...range('renal'), TEXT, ids)
    expect(out.map(m => m.text)).toEqual(['Acute ', ' failure'])
    // The left piece keeps the id; only the new right piece costs a row.
    expect(out[0].id).toBe('a')
    expect(out[1].id).toBe('m0')
  })

  it('trims without minting a new id when only one end is erased', () => {
    reset()
    const list = [mark('highlight', 'Acute renal', 'a')]
    const out = eraseRange(list, 'highlight', ...range('renal'), TEXT, ids)
    expect(out).toEqual([
      { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: at('renal'), text: 'Acute ' },
    ])
    expect(n).toBe(0)
  })

  it('drops a mark erased entirely', () => {
    const list = [mark('strike', 'renal', 'a')]
    expect(eraseRange(list, 'strike', ...range('Acute renal failure'), TEXT, ids)).toEqual([])
  })

  it('leaves other kinds alone when a kind is named', () => {
    const list = [mark('highlight', 'renal', 'a'), mark('underline', 'renal', 'b')]
    const out = eraseRange(list, 'highlight', ...range('renal'), TEXT, ids)
    expect(shape(out)).toEqual(['underline:renal'])
  })

  it('erases every kind when the kind is null', () => {
    const list = [mark('highlight', 'renal', 'a'), mark('underline', 'renal', 'b')]
    expect(eraseRange(list, null, ...range('renal'), TEXT, ids)).toEqual([])
  })

  it('does not touch marks that only abut the erased range', () => {
    const list = [mark('highlight', 'Acute', 'a')]
    const out = eraseRange(list, 'highlight', at('Acute') + 5, at('renal') + 5, TEXT, ids)
    expect(shape(out)).toEqual(['highlight:Acute'])
  })
})

describe('coversRange', () => {
  it('is true only when the whole range carries the kind', () => {
    const list = [mark('highlight', 'Acute renal', 'a')]
    expect(coversRange(list, 'highlight', ...range('renal'))).toBe(true)
    expect(coversRange(list, 'highlight', ...range('renal failure'))).toBe(false)
    expect(coversRange(list, 'underline', ...range('renal'))).toBe(false)
  })

  it('accepts a range spanning two marks that meet exactly', () => {
    const list: Mark[] = [
      { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: 6, text: TEXT.slice(0, 6) },
      { id: 'b', kind: 'highlight', colour: 'yellow', start: 6, end: 11, text: TEXT.slice(6, 11) },
    ]
    expect(coversRange(list, 'highlight', 0, 11)).toBe(true)
  })

  it('rejects a range with a gap in the middle', () => {
    const list: Mark[] = [
      { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: 5, text: TEXT.slice(0, 5) },
      { id: 'b', kind: 'highlight', colour: 'yellow', start: 6, end: 11, text: TEXT.slice(6, 11) },
    ]
    expect(coversRange(list, 'highlight', 0, 11)).toBe(false)
  })

  it('is false for an empty range', () => {
    expect(coversRange([mark('highlight', 'renal', 'a')], 'highlight', 6, 6)).toBe(false)
  })
})

describe('kindsAt', () => {
  it('reports every kind covering the position, in toolbar order', () => {
    const list = [mark('strike', 'renal', 'a'), mark('highlight', 'renal', 'b')]
    expect(kindsAt(list, at('renal') + 1)).toEqual(['highlight', 'strike'])
  })

  it('treats the end offset as outside the mark', () => {
    const list = [mark('highlight', 'renal', 'a')]
    expect(kindsAt(list, at('renal') + 5)).toEqual([])
  })
})

describe('toSegments', () => {
  it('returns nothing for an empty list', () => {
    expect(toSegments([])).toEqual([])
  })

  it('splits overlapping kinds into non-overlapping runs', () => {
    // "Acute renal" highlighted, "renal failure" underlined.
    const list = [mark('highlight', 'Acute renal', 'a'), mark('underline', 'renal failure', 'b')]
    expect(toSegments(list)).toEqual([
      { start: 0, end: at('renal'), parts: [{ kind: 'highlight', colour: 'yellow' }] },
      {
        start: at('renal'), end: at('renal') + 5,
        parts: [{ kind: 'highlight', colour: 'yellow' }, { kind: 'underline', colour: 'teal' }],
      },
      { start: at('renal') + 5, end: at('failure') + 7, parts: [{ kind: 'underline', colour: 'teal' }] },
    ])
  })

  it('coalesces adjacent runs carrying the same kinds', () => {
    const list: Mark[] = [
      { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: 5, text: TEXT.slice(0, 5) },
      { id: 'b', kind: 'highlight', colour: 'yellow', start: 5, end: 11, text: TEXT.slice(5, 11) },
    ]
    expect(toSegments(list)).toEqual([
      { start: 0, end: 11, parts: [{ kind: 'highlight', colour: 'yellow' }] },
    ])
  })

  it('leaves a real gap between disjoint marks', () => {
    const list = [mark('highlight', 'Acute', 'a'), mark('highlight', 'failure', 'b')]
    expect(toSegments(list)).toEqual([
      { start: at('Acute'), end: at('Acute') + 5, parts: [{ kind: 'highlight', colour: 'yellow' }] },
      { start: at('failure'), end: at('failure') + 7, parts: [{ kind: 'highlight', colour: 'yellow' }] },
    ])
  })

  it('covers exactly the marked characters and no others', () => {
    const list = [mark('strike', 'fluids', 'a')]
    const [seg] = toSegments(list)
    expect(TEXT.slice(seg.start, seg.end)).toBe('fluids')
  })
})

describe('reanchor', () => {
  it('keeps marks whose offsets still match', () => {
    const list = [mark('highlight', 'renal', 'a')]
    expect(reanchor(list, TEXT).resolved).toEqual(list)
  })

  it('shifts a mark when text was inserted before it', () => {
    const shifted = `Dog. ${TEXT}`
    const { resolved, quarantined } = reanchor([mark('highlight', 'renal', 'a')], shifted)
    expect(quarantined).toEqual([])
    expect(shifted.slice(resolved[0].start, resolved[0].end)).toBe('renal')
  })

  it('quarantines a mark whose text is gone rather than redrawing it elsewhere', () => {
    const rewritten = 'Chronic kidney disease needs fluids now'
    const { resolved, quarantined } = reanchor([mark('highlight', 'Acute renal failure', 'a')], rewritten)
    expect(resolved).toEqual([])
    expect(quarantined.map(m => m.id)).toEqual(['a'])
  })

  it('picks the occurrence nearest the original offset when text repeats', () => {
    const doubled = `${TEXT} and ${TEXT}`
    const second = doubled.indexOf('renal', TEXT.length)
    const m: Mark = {
      id: 'a', kind: 'highlight', colour: 'yellow', start: second, end: second + 5, text: 'renal',
    }
    // Perturb the stored offsets slightly; the near copy must still win.
    const { resolved } = reanchor([{ ...m, start: second + 2, end: second + 7 }], doubled)
    expect(resolved[0].start).toBe(second)
  })

  it('quarantines a mark with no stored text', () => {
    const m: Mark = { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: 5, text: '' }
    expect(reanchor([m], TEXT).quarantined).toEqual([m])
  })
})

describe('diffMarks', () => {
  it('reports adds, removes and range changes by id', () => {
    const before = [mark('highlight', 'Acute', 'a'), mark('strike', 'renal', 'b')]
    const after = [
      { ...mark('highlight', 'Acute renal', 'a') },
      mark('underline', 'fluids', 'c'),
    ]
    const d = diffMarks(before, after)
    expect(d.added.map(m => m.id)).toEqual(['c'])
    expect(d.removed).toEqual(['b'])
    expect(d.changed.map(m => m.id)).toEqual(['a'])
  })

  it('reports nothing for an unchanged list', () => {
    const list = [mark('highlight', 'renal', 'a')]
    expect(diffMarks(list, [...list])).toEqual({ added: [], removed: [], changed: [] })
  })
})

describe('colours', () => {
  it('offers five highlights and three underlines', () => {
    expect(HIGHLIGHT_COLOURS).toHaveLength(5)
    expect(UNDERLINE_COLOURS).toHaveLength(3)
    expect(new Set(HIGHLIGHT_COLOURS).size).toBe(5)
    expect(new Set(UNDERLINE_COLOURS).size).toBe(3)
    // No token may be shared between the two palettes: the stylesheet keys on
    // `--annot-hl-<token>` / `--annot-ul-<token>`, so a shared name would be
    // two different colours under one label in the UI.
    expect(HIGHLIGHT_COLOURS.filter(c => (UNDERLINE_COLOURS as readonly string[]).includes(c))).toEqual([])
  })

  it('gives strikethrough a single, non-palette colour', () => {
    expect(coloursFor('strike')).toEqual(['plain'])
  })

  it('validates a token against the kind that offers it', () => {
    expect(isColourFor('highlight', 'yellow')).toBe(true)
    expect(isColourFor('highlight', 'teal')).toBe(false)
    expect(isColourFor('underline', 'teal')).toBe(true)
    expect(isColourFor('highlight', 'chartreuse')).toBe(false)
  })

  it('keeps two colours of one kind apart instead of merging them', () => {
    reset()
    let list = addMark([], 'highlight', 'yellow', ...range('Acute '), TEXT, ids)
    list = addMark(list, 'highlight', 'green', ...range('renal'), TEXT, ids)
    expect(list.map(m => `${m.colour}:${m.text}`).sort()).toEqual(['green:renal', 'yellow:Acute '])
  })

  it('merges two marks of the same kind and colour', () => {
    reset()
    let list = addMark([], 'highlight', 'blue', ...range('Acute '), TEXT, ids)
    list = addMark(list, 'highlight', 'blue', ...range('renal'), TEXT, ids)
    expect(list).toHaveLength(1)
    expect(list[0].text).toBe('Acute renal')
  })
})

describe('applyMark', () => {
  it('recolours rather than stacking a second mark of the same kind', () => {
    reset()
    let list = applyMark([], 'highlight', 'yellow', ...range('renal'), TEXT, ids)
    list = applyMark(list, 'highlight', 'pink', ...range('renal'), TEXT, ids)
    expect(list).toHaveLength(1)
    expect(list[0].colour).toBe('pink')
  })

  it('removes the mark when the colour already there is pressed again', () => {
    reset()
    let list = applyMark([], 'underline', 'red', ...range('renal'), TEXT, ids)
    list = applyMark(list, 'underline', 'red', ...range('renal'), TEXT, ids)
    expect(list).toEqual([])
  })

  it('recolours only the pressed range, leaving the rest of the mark alone', () => {
    reset()
    let list = applyMark([], 'highlight', 'yellow', ...range('Acute renal failure'), TEXT, ids)
    list = applyMark(list, 'highlight', 'green', ...range('renal'), TEXT, ids)
    expect(list.map(m => `${m.colour}:${m.text}`).sort()).toEqual([
      'green:renal',
      'yellow: failure',
      'yellow:Acute ',
    ])
  })

  it('leaves a different kind untouched when recolouring', () => {
    reset()
    let list = applyMark([], 'underline', 'teal', ...range('renal'), TEXT, ids)
    list = applyMark(list, 'highlight', 'blue', ...range('renal'), TEXT, ids)
    expect(list.map(m => `${m.kind}:${m.colour}`).sort()).toEqual([
      'highlight:blue',
      'underline:teal',
    ])
  })

  it('ignores an empty range', () => {
    expect(applyMark([], 'highlight', 'yellow', 5, 5, TEXT, ids)).toEqual([])
  })
})

describe('coversRange with a colour', () => {
  it('is true only for the colour actually there', () => {
    const list = [mark('highlight', 'renal', 'a', 'orange')]
    expect(coversRange(list, 'highlight', ...range('renal'), 'orange')).toBe(true)
    expect(coversRange(list, 'highlight', ...range('renal'), 'yellow')).toBe(false)
    // Colour omitted means "any colour of this kind".
    expect(coversRange(list, 'highlight', ...range('renal'))).toBe(true)
  })
})

describe('variantsAt', () => {
  it('reports the colour of each kind at the position, in toolbar order', () => {
    const list = [
      mark('underline', 'renal', 'a', 'purple'),
      mark('highlight', 'renal', 'b', 'pink'),
    ]
    expect(variantsAt(list, at('renal') + 1)).toEqual([
      { kind: 'highlight', colour: 'pink' },
      { kind: 'underline', colour: 'purple' },
    ])
  })

  it('reports nothing past the end of the mark', () => {
    expect(variantsAt([mark('highlight', 'renal', 'a')], at('renal') + 5)).toEqual([])
  })
})

describe('toSegments with colours', () => {
  it('does not coalesce neighbouring runs that differ only by colour', () => {
    const list: Mark[] = [
      { id: 'a', kind: 'highlight', colour: 'yellow', start: 0, end: 5, text: TEXT.slice(0, 5) },
      { id: 'b', kind: 'highlight', colour: 'green', start: 5, end: 11, text: TEXT.slice(5, 11) },
    ]
    expect(toSegments(list)).toEqual([
      { start: 0, end: 5, parts: [{ kind: 'highlight', colour: 'yellow' }] },
      { start: 5, end: 11, parts: [{ kind: 'highlight', colour: 'green' }] },
    ])
  })
})

describe('diffMarks with colours', () => {
  it('treats a recolour as a change, so it reaches the server', () => {
    const before = [mark('highlight', 'renal', 'a', 'yellow')]
    const after = [mark('highlight', 'renal', 'a', 'blue')]
    expect(diffMarks(before, after).changed.map(m => m.colour)).toEqual(['blue'])
  })
})

describe('makeMarkId', () => {
  it('does not repeat', () => {
    const seen = new Set(Array.from({ length: 500 }, () => makeMarkId()))
    expect(seen.size).toBe(500)
  })
})
