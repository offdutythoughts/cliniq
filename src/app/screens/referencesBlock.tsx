'use client'
// The numbered AMA reference list that closes a clinical page.
//
// Extracted from DiseasePageView so protocol pages can use the same block.
// Protocols carry a HIGHER evidential bar than disease pages — an ACVIM
// consensus statement or an equivalent society guideline, per the citation rules
// in CLAUDE.md — so it matters that a protocol's sources are visible on the page
// rather than named in passing inside a step note.

import { styleStringToObject as s } from './style'
import type { RefEntry } from './diseaseReferences'

const REFERENCES = s('margin-top:18px;padding-top:12px;border-top:1px solid var(--border);color:var(--gray2);font-size:var(--fs-label);line-height:1.55;')
const REFERENCES_TITLE = s('font-size:var(--fs-label);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;')
const REFERENCE_ITEM = s('margin-left:18px;padding-left:2px;margin-bottom:4px;')

/** Pages citing more than this many sources collapse the footnote behind a toggle. */
const REF_COLLAPSE_THRESHOLD = 4

export function References({ entries }: { entries: RefEntry[] }) {
  if (entries.length === 0) return null
  const list = (
    <ol>
      {entries.map(entry => <li key={entry.id} id={`ref-${entry.n}`} style={REFERENCE_ITEM}>{entry.text}</li>)}
    </ol>
  )
  if (entries.length > REF_COLLAPSE_THRESHOLD) {
    return (
      <details className="ref-fold" style={REFERENCES}>
        <summary style={REFERENCES_TITLE}>References ({entries.length})</summary>
        {list}
      </details>
    )
  }
  return (
    <section aria-label="References" style={REFERENCES}>
      <div style={REFERENCES_TITLE}>References</div>
      {list}
    </section>
  )
}
