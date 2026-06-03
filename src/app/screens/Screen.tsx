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

/** View kinds rendered by real React components (vs the legacy-html bridge). */
export const MIGRATED = new Set<ViewKind>([
  'protocol',
  'disease',
  // grows each phase: 'dx', 'flow', 'tab', ...
])

export function isMigrated(view: View): boolean {
  return MIGRATED.has(view.kind)
}

export function Screen({ view }: { view: View }): ReactNode {
  switch (view.kind) {
    case 'protocol': return <ProtocolDetailView id={view.id} />
    case 'disease': return <DiseasePageView id={view.id} />
    // more cases land here as each kind is migrated
    default:
      // Unreachable: page.tsx only mounts <Screen> for migrated kinds.
      throw new Error(`Screen: no component for migrated view kind '${view.kind}'`)
  }
}
