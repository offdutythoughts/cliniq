'use client'
// Blocks that mean the same thing on a flowchart and on a diagnostic approach,
// rendered by one component instead of two.
//
// The flow and dx renderers grew as separate ports of two separate legacy
// systems, so a handful of blocks ended up implemented twice — the same markup,
// the same classes, the same behaviour, in two files. `diseaseGrid` was the
// clearest: identical type, identical output, two components, and the only
// textual difference between them was that one spelled its title style as a
// constant and the other inlined the same four declarations.
//
// Duplicated rendering is not just repetition here. The two copies are what a
// change has to find: a citation marker added to the disease grid, or a tap
// target widened, lands on one surface and silently not the other.
//
// The TYPES for these live in flowTypes.ts as `…Payload` (the field set without
// the flow-only connector control), imported by dxTypes so a new field is added
// once. See DiseaseGridPayload there.

import type { ReactNode } from 'react'
import type { LabeledLink } from '../../lib/signs/flowTypes'
import { linkToView } from '../nav/view'
import { styleStringToObject as s } from './style'
import { type Nav, Raw, ToneBox } from './flowHelpers'
import { Tappable } from './Tappable'

/** Title line shared by the tinted boxes. */
const BLOCK_TITLE = s('font-size:11px;font-weight:700;margin-bottom:6px;')

/** The teal "LINKED DISEASE PAGES" grid — two columns of labelled links. */
export function DiseaseGrid({ title, links, onNav }: { title: string; links: LabeledLink[]; onNav: Nav }) {
  return (
    <ToneBox tone="teal" extra="margin-top:10px;padding:10px 12px;">
      <div style={{ ...BLOCK_TITLE, color: 'var(--tone-teal-fg)' }}>{title}</div>
      <div style={s('display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px;font-size:var(--fs-box);')}>
        {links.map((l, i) => (
          <Tappable key={i} style={s('cursor:pointer;color:var(--fg-teal-deep);')} onTap={() => onNav(linkToView(l.link))}>
            → {l.label}
          </Tappable>
        ))}
      </div>
    </ToneBox>
  )
}

/** The footer every clinical page ends on. */
export const DISCLAIMER: ReactNode = (
  <div className="disclaimer">For qualified veterinary professionals only.</div>
)

/** The `html:` escape hatch — authored markup through the audited RichText
 *  boundary, in a box that scrolls sideways rather than pushing the page wide. */
export function AuthoredHtml({ html, onNav }: { html: string; onNav: Nav }) {
  return <div className="flow-authored scroll-x"><Raw html={html} onNav={onNav} /></div>
}
