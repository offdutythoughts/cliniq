// Stops the two block models drifting back apart.
//
// Flowcharts and diagnostic approaches are described by two separate unions —
// `Block` in flowTypes.ts, `DxBlock` in dxTypes.ts — because they were ported
// from two separate legacy renderers. Most kinds are genuinely surface-specific.
// A few mean the same thing on both, and those were declared twice.
//
// Declared twice is how `alert` came to name two unrelated things: on a flow it
// is a structured DON'T-MISS list of `{ bold, link, html }` items with a title;
// on a dx tab it was a freeform "Practical pearls" html box. Someone authoring
// their first dx block and reaching for `alert` would have got neither the shape
// nor the rendering they had just seen on the flow side. (It is now `pearls`.)
//
// THE RULE — a kind that appears in both unions must come from ONE declaration:
// a `…Payload` type exported by flowTypes and imported by dxTypes. dxTypes may
// not re-declare `{ kind: 'x'; … }` for a kind flowTypes already defines. That
// way two surfaces can share a block, or not share it, but they can never
// disagree about what it is.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { lint } from './lib/lint'

const { fail, note, done } = lint('block-model')

/** Source with comments stripped — a `kind: 'table'` inside a doc-comment that
 *  merely CITES the other surface is not a declaration. */
const read = (p: string) =>
  readFileSync(join(__dirname, '..', p), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/.*$/gm, '')
const FLOW = read('src/lib/signs/flowTypes.ts')
const DX = read('src/lib/signs/dxTypes.ts')

/** Every `kind: 'x'` literal in a file. */
const kindsIn = (src: string) => new Set([...src.matchAll(/kind:\s*'([a-zA-Z]+)'/g)].map(m => m[1]))

/** The payload types dxTypes pulls from flowTypes — the sanctioned sharing. */
const sharedImports = (() => {
  const m = DX.match(/import type \{([^}]*)\} from '\.\/flowTypes'/)
  return new Set((m?.[1] ?? '').split(',').map(x => x.trim()).filter(x => x.endsWith('Payload')))
})()

/** Kinds flowTypes exports as a reusable payload: `export type XPayload = { kind: 'x' …`. */
const payloadKinds = new Map<string, string>()
for (const m of FLOW.matchAll(/export type (\w+Payload)\s*=\s*\{\s*kind:\s*'([a-zA-Z]+)'/g)) {
  payloadKinds.set(m[2], m[1])
}

const flowKinds = kindsIn(FLOW)
// Kinds dxTypes spells out itself, as opposed to taking from a payload. Sharing
// means the literal is GONE from dxTypes — importing the payload while still
// declaring `{ kind: 'callout'; … }` inline is the drift this lint exists to
// catch, and checking only the import misses it.
const dxLiteralKinds = kindsIn(DX)
const dxKinds = new Set(dxLiteralKinds)
for (const [kind, payload] of payloadKinds) if (sharedImports.has(payload)) dxKinds.add(kind)
const shared = [...dxKinds].filter(k => flowKinds.has(k)).sort()

for (const kind of shared) {
  const payload = payloadKinds.get(kind)
  if (!payload) {
    fail(`'${kind}' is declared in BOTH flowTypes and dxTypes, but flowTypes exports no `
      + `${kind[0].toUpperCase()}${kind.slice(1)}Payload for it. Either extract the shared field set as a `
      + `…Payload type and have dxTypes import it, or rename one of them — two kinds sharing a name `
      + `while sharing no shape is what made 'alert' mean two different things.`)
    continue
  }
  if (!sharedImports.has(payload)) {
    fail(`'${kind}' exists in both unions and flowTypes exports ${payload}, but dxTypes does not `
      + `import it — so dxTypes is re-declaring the shape. Import ${payload} instead.`)
    continue
  }
  if (dxLiteralKinds.has(kind)) {
    fail(`dxTypes imports ${payload} but ALSO declares \`kind: '${kind}'\` inline. The inline one `
      + `wins for whoever reads it and can drift from the shared field set — delete it and use `
      + `${payload} alone.`)
  }
}

// A payload that nobody shares is dead weight pretending to be shared.
for (const [kind, payload] of payloadKinds) {
  if (!dxKinds.has(kind)) {
    fail(`flowTypes exports ${payload}, but '${kind}' does not appear in dxTypes — `
      + `either share it or fold it back into its Block type.`)
  }
}

note(`  flow kinds: ${flowKinds.size}   dx kinds: ${dxKinds.size}   shared via a payload: ${shared.length} (${shared.join(', ')})`)

done(`The two block models agree on every kind they share (${shared.length} shared, ${flowKinds.size + dxKinds.size - shared.length} distinct).`,
  'A kind in both unions must come from one …Payload declaration in flowTypes.')
