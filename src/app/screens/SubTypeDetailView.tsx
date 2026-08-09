'use client'
// Lesion sub-type detail — the leaf page for a *category* sub-type: fluid
// classes, oedema types, parasite umbrellas, broad symptom groups. Everything
// from Etiology down to the clinical-pearls box comes from the shared
// <ClinicalSections> stack (diseaseSections.tsx), so this page and a disease
// page render the same sections, in the same order, in the same bullet form.
// This file owns only the lesion-specific shell: tags, the EMERGENCY banner,
// a protocol card and the link out to a disease page.
//
// Sub-types that ARE a single disease set directDis + dis and redirect to the
// disease page instead of duplicating its content here — enforced by
// scripts/lint-lesions.ts, which also catches a sub-type whose name matches a
// differential carrying a `dis` but which never linked it (the defect that left
// "Feline URTI (FHV-1 / FCV)" showing a three-card stub with cryptococcal and
// FIV tests borrowed from its siblings).

import { DB } from '../../data/db'
import { spOf } from '../../lib/species'
import { useNav } from '../nav/NavContext'
import { UrgTag, SpTag, ZooTag } from './tags'
import { DiseasePageView } from './DiseasePageView'
import { ClinicalSections } from './diseaseSections'
import { NavCard, Bul, str } from './markup'
import { TAG_ROW, PAGE_TITLE } from './styles'

/** Fallback Etiology for a broad symptom sub-type with nothing authored: the
 *  sibling differentials ARE the aetiology list (e.g. "Syncope" → its causes).
 *  Only correct where the sub-type is a category; a sub-type that is one
 *  disease must redirect instead, or this lists its siblings as its own causes. */
function diffNames(filter: string): string {
  return DB.differentials
    .filter(d => d.filter === filter)
    .sort((a, b) => a.order - b.order)
    .map(d => d.name)
    .join('|')
}

/** Same shape for the diagnostics fallback: the union of every sibling
 *  differential's minimum + additional tests, de-duplicated case-insensitively
 *  ("Rhinoscopy + biopsy" and "rhinoscopy + biopsy" are one test). */
function diffTests(filter: string): string {
  const seen = new Map<string, string>()
  for (const d of DB.differentials.filter(x => x.filter === filter)) {
    for (const raw of [str(d.minDx), str(d.addDx)]) {
      for (const t of raw.split(',')) {
        const test = t.trim()
        if (test && !seen.has(test.toLowerCase())) seen.set(test.toLowerCase(), test)
      }
    }
  }
  return [...seen.values()].join('|')
}

export function SubTypeDetailView({ id }: { id: string }) {
  const nav = useNav()
  const l = DB.lesion_type.find(x => x.id === id)
  if (!l) return null
  if (l.directDis && l.dis) return <DiseasePageView id={str(l.dis)} {...spOf(l.sp)} />

  const isEM = l.urg === 'EMERGENCY'
  const proto = str(l.proto)
  const dis = str(l.dis)
  const filter = str(l.filter)
  const signalment = str(l.signalment)
  const diag = str(l.diag)

  return (
    <>
      <div style={PAGE_TITLE}>{l.sub}</div>
      <div style={TAG_ROW}><UrgTag urg={l.urg} /><ZooTag zoo={l.zoo === true} /><SpTag sp={l.sp} /><span className="tag tag-sp-all">{l.cat}</span></div>
      {isEM && <div className="em-alert">EMERGENCY — initiate stabilisation before full diagnostic workup</div>}

      {proto && (
        <NavCard title={`⚡ Protocol: ${proto}`} sub="Tap to open step-by-step protocol" onClick={() => nav.navigate({ kind: 'protocol', id: proto })} style={{ marginBottom: 14 }} />
      )}

      <ClinicalSections
        content={{
          etiology: str(l.etiology) || diffNames(filter),
          signalment: signalment ? <Bul text={signalment} /> : undefined,
          path: str(l.patho),
          signs: str(l.signs),
          conf: diag || diffTests(filter),
          // A lesion's `diag` may open with a hyphen that is prose, not a
          // sub-bullet marker — the one place the dash convention is off.
          confAllowDash: false,
          tx1: str(l.treat),
          labelFirstLine: false,
          monitor: str(l.monitor),
          prog: str(l.prog),
          ddx: str(l.ddx),
          pearl: str(l.pearl),
        }}
      />


      {dis && (
        <NavCard title="📋 Disease Page" sub="Tap to view full disease profile" onClick={() => nav.navigate({ kind: 'disease', id: dis })} style={{ marginBottom: 14 }} />
      )}
    </>
  )
}
