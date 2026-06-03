'use client'
// ── Screen dispatcher ────────────────────────────────────────────────────────
// Renders the component for a migrated View kind. During the migration the set
// of migrated kinds grows phase by phase; kinds not yet in MIGRATED are rendered
// from legacy HTML strings by the bridge in page.tsx (see isMigrated). When
// MIGRATED covers every kind (Phase 5) the bridge — and this comment — go away.

import type { ReactNode } from 'react'
import type { View, ViewKind } from '../nav/view'
import { ProtocolDetailView } from './ProtocolDetailView'
import { DiseasePageView } from './DiseasePageView'
import { DxApproachView } from './DxApproachView'
import { FlowPageView } from './FlowPageView'
import { LesionLocView } from './LesionLocView'
import { SubTypeDetailView } from './SubTypeDetailView'
import { LesionDetailView } from './LesionDetailView'
import { DiffDetailView } from './DiffDetailView'
import { TabHome } from './TabHome'

/** View kinds rendered by real React components. Now covers every kind — the
 *  legacy-html bridge in page.tsx is dead and removed in Phase 5. */
export const MIGRATED = new Set<ViewKind>([
  'tab',
  'protocol',
  'disease',
  'dx',
  'flow',
  'lesionLoc',
  'subTypeDetail',
  'lesionDetail',
  'diff',
])

export function isMigrated(view: View): boolean {
  return MIGRATED.has(view.kind)
}

export function Screen({ view }: { view: View }): ReactNode {
  switch (view.kind) {
    case 'tab': return <TabHome tab={view.tab} />
    case 'protocol': return <ProtocolDetailView id={view.id} />
    case 'disease': return <DiseasePageView id={view.id} />
    case 'dx': return <DxApproachView sign={view.sign} active={view.tab} />
    case 'flow': return <FlowPageView flowId={view.flowId} />
    case 'lesionLoc': return <LesionLocView loc={view.loc} name={view.name} />
    case 'subTypeDetail': return <SubTypeDetailView id={view.id} />
    case 'lesionDetail': return <LesionDetailView id={view.id} />
    case 'diff': return <DiffDetailView id={view.id} />
    default: {
      // Exhaustive: every View kind has a component.
      const _exhaustive: never = view
      throw new Error(`Screen: unhandled view ${JSON.stringify(_exhaustive)}`)
    }
  }
}
