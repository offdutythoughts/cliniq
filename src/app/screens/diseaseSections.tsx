'use client'
// Reusable clinical section stack — the SINGLE source of truth for what a
// clinical page shows, in what order, under what heading, and how its prose is
// rendered. Consumed by both leaf views that describe a disease:
//
//   • DiseasePageView   — a full disease page (DB.disease_page)
//   • SubTypeDetailView — a lesion sub-type that is a *category* rather than a
//                         single disease, so it has no disease page to redirect to
//
// The two tables spell the same clinical concepts with different column names
// (`path`/`patho`, `conf`+`supp`/`diag`, `tx1`+`tx2`/`treat`). Each view maps
// its row onto the ClinicalContent shape below and hands it over; from there
// the rendering is identical, so a sub-type page can never drift into looking
// like a different product from the disease page next to it.
//
// EVERYTHING RENDERS AS BULLETS. Authored `|` markup wins untouched; prose
// without it is split on sentence boundaries by splitSentences(), and text that
// won't split becomes a single bullet. That keeps one idea per line across all
// 340+ pages without re-authoring the ~170 fields written as flat prose.

import { type ReactNode } from 'react'
import { Bul, Card, Linkify } from './markup'
import { splitSentences } from './pearlSplit'
import { toGroupedMarkup, type GroupKind } from './clinicalGrouping'
import { PhenylephrineLocaliseTable } from './PhenylephrineLocaliseTable'
import { IrisCkdStagingTable } from './IrisCkdStagingTable'
import { IrisAkiGradingTable } from './IrisAkiGradingTable'
import { InjuryGradingTable } from './InjuryGradingTable'
import { styleStringToObject as s } from './style'
import { FIELD_LABEL, SUB_LABEL } from './styles'

/** One clinical page's content, normalised across the disease and lesion
 *  tables. Every field is optional — a section with no text is not rendered,
 *  so an empty card never appears (see scripts/lint-disease-sections.ts, which
 *  is what guarantees the required sections are actually populated). */
export interface ClinicalContent {
  etiology?: string
  /** Pre-composed node: the disease page renders structured Breed/Age/Sex,
   *  a lesion sub-type renders one pipe-markup field. */
  signalment?: ReactNode
  risk?: string
  path?: string
  signs?: string
  /** Injury-grading table spliced under Clinical Signs (DIS-* with showGradingTable). */
  showGradingTable?: boolean
  conf?: string
  /** Disable `-`→sub-bullet inside the diagnostics field only. The lesion
   *  `diag` column is the one place a leading hyphen is prose rather than a
   *  sub-bullet marker; every other field follows the usual convention. */
  confAllowDash?: boolean
  supp?: string
  tx1?: string
  tx2?: string
  /** Label `tx1` as "First-line". True on a disease page, where the column
   *  means exactly that; false for a lesion sub-type's single `treat` column,
   *  which is undifferentiated therapy and would be mislabelled. */
  labelFirstLine?: boolean
  outpatient?: string
  monitor?: string
  prog?: string
  ddx?: string
  pearl?: string
}

/** Universal clinical-prose renderer: always bullets.
 *
 *  `group` first asks the classifier to categorise the field (signs by body
 *  system, diagnostics by test modality); it hands back `#Header` pipe-markup,
 *  or null when the field is already authored with headers or the
 *  classification isn't confident — in which case we fall through to the
 *  ordinary bullet path. */
export function ClinicalBody({ text, group, allowDash = true }: {
  text: string
  group?: GroupKind
  allowDash?: boolean
}) {
  const trimmed = text.trim()
  if (!trimmed) return null
  const grouped = group ? toGroupedMarkup(trimmed, group) : null
  if (grouped) return <Bul text={grouped} allowDash={allowDash} />
  // splitSentences already honours authored `|`; re-joining with `|` lets the
  // one <Bul> renderer draw authored and derived bullets identically.
  return <Bul text={splitSentences(trimmed).join('|')} allowDash={allowDash} />
}

/** Markers in a diagnostics field where a rich table is spliced in — content
 *  that can't be expressed in pipe-markup. A page uses at most one marker. */
const CONF_TABLES: { mark: string; Comp: () => ReactNode }[] = [
  { mark: '{{PHEN_LOCALISE_TABLE}}', Comp: PhenylephrineLocaliseTable },
  { mark: '{{IRIS_CKD_TABLE}}', Comp: IrisCkdStagingTable },
  { mark: '{{IRIS_AKI_TABLE}}', Comp: IrisAkiGradingTable },
]

/** Diagnostics body: bullets, with any table marker replaced in place. */
function ConfBody({ text, allowDash }: { text: string; allowDash?: boolean }) {
  const hit = CONF_TABLES.find(t => text.includes(t.mark))
  if (!hit) return <ClinicalBody text={text} allowDash={allowDash} />
  const [before, after] = text.split(hit.mark)
  const head = before.replace(/\|\s*$/, '')
  const tail = after.replace(/^\s*\|/, '')
  const Comp = hit.Comp
  return (
    <>
      {head.trim() && <ClinicalBody text={head} allowDash={allowDash} />}
      <Comp />
      {tail.trim() && <ClinicalBody text={tail} allowDash={allowDash} />}
    </>
  )
}

/** A titled card that disappears when it has nothing to say. */
function Section({ title, text, group, allowDash, children }: {
  title: string
  text?: string
  group?: GroupKind
  allowDash?: boolean
  children?: ReactNode
}) {
  const body = (text ?? '').trim()
  if (!body && !children) return null
  return (
    <Card title={title}>
      {body && <ClinicalBody text={body} group={group} allowDash={allowDash} />}
      {children}
    </Card>
  )
}

/** The section stack, in the order a clinician works through a case:
 *  what causes it → who gets it → how it does harm → what you see →
 *  how you prove it → how you treat it → how you follow it → how it ends →
 *  what else it could be → the thing worth remembering.
 *
 *  `allowDash` is false where a field's prose legitimately opens with a hyphen
 *  and would otherwise be swallowed as a sub-bullet (the lesion `diag` column). */
export function ClinicalSections({ content, allowDash = true }: {
  content: ClinicalContent
  allowDash?: boolean
}) {
  const c = content
  return (
    <>
      <Section title="Etiology" text={c.etiology} allowDash={allowDash} />
      {c.signalment && <Card title="Signalment">{c.signalment}</Card>}
      <Section title="Risk Factors" text={c.risk} allowDash={allowDash} />
      <Section title="Pathophysiology" text={c.path} allowDash={allowDash} />
      <Section title="Clinical Signs" text={c.signs} group="signs" allowDash={allowDash}>
        {c.showGradingTable === true && <InjuryGradingTable />}
      </Section>

      {((c.conf ?? '').trim() || (c.supp ?? '').trim()) && (
        <Card title="Diagnostic Investigation">
          {(c.conf ?? '').trim() && <ConfBody text={c.conf!} allowDash={c.confAllowDash ?? allowDash} />}
          {(c.supp ?? '').trim() && (
            <>
              <div style={SUB_LABEL}>Supportive Diagnostics</div>
              <ClinicalBody text={c.supp!} group="diagnostics" allowDash={allowDash} />
            </>
          )}
        </Card>
      )}

      {((c.tx1 ?? '').trim() || (c.tx2 ?? '').trim()) && (
        <Card title="Treatment">
          {(c.tx1 ?? '').trim() && (
            <>
              {c.labelFirstLine !== false && <div style={FIELD_LABEL}>First-line</div>}
              <ClinicalBody text={c.tx1!} allowDash={allowDash} />
            </>
          )}
          {(c.tx2 ?? '').trim() && (
            <>
              <div style={SUB_LABEL}>Second-line / Alternatives</div>
              <ClinicalBody text={c.tx2!} allowDash={allowDash} />
            </>
          )}
        </Card>
      )}

      <Section title="Outpatient Protocol" text={c.outpatient} allowDash={allowDash} />
      <Section title="Monitoring" text={c.monitor} allowDash={allowDash} />
      <Section title="Prognosis" text={c.prog} allowDash={allowDash} />
      <Section title="Differential Diagnosis" text={c.ddx} allowDash={allowDash} />
      <PearlBox text={c.pearl ?? ''} />
    </>
  )
}

const PEARL_LABEL = s('font-weight:700;margin-bottom:6px;')
const PEARL_ITEM = s('display:flex;align-items:baseline;gap:6px;margin-bottom:4px;')
const PEARL_DOT = s('flex-shrink:0;opacity:.7;')

/** Clinical pearls — the amber box, not a card. A single-sentence pearl stays
 *  an inline paragraph; anything longer becomes bullets like every other
 *  section. Colour comes from `.pearl` in globals.css and is inherited. */
export function PearlBox({ text }: { text: string }) {
  const trimmed = text.trim()
  if (!trimmed) return null
  const items = splitSentences(trimmed)
  if (items.length <= 1) return <div className="pearl">💡 Clinical pearls: <Linkify text={items[0] ?? ''} /></div>
  return (
    <div className="pearl">
      <div style={PEARL_LABEL}>💡 Clinical pearls</div>
      {items.map((t, i) => (
        <div key={i} style={PEARL_ITEM}><span style={PEARL_DOT}>•</span><Linkify text={t} /></div>
      ))}
    </div>
  )
}
